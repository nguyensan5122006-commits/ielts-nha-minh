/**
 * SpeakUnlockGame.tsx — TRÒ 7 "NÓI ĐỂ MỞ KHOÁ" (speak-unlock; đặc tả 07 gọi là say-it)
 * ----------------------------------------------------------------------------
 * Ki đưa ra 1 chiếc rương bị khoá. Bé nghe mẫu, bấm nút micro rồi đọc to từ -> máy nhận diện
 * giọng nói (Web Speech API) chấm LỎNG (speech-matching.ts) -> đúng thì ổ khoá bật, rương mở.
 *
 * Luật phần nói (psych-kids 31–34) — bắt buộc:
 *   - Phần nói KHÔNG BAO GIỜ chặn đường: luôn có nút "Bỏ qua" (bỏ qua không bị trừ gì,
 *     từ đó không đổi hộp Leitner — xem skipItem() bên dưới).
 *   - Giao diện không bao giờ hiện chữ "Sai". Máy chưa nghe rõ -> "Ki chưa nghe rõ…", ổ khoá lúc lắc nhẹ.
 *   - Máy không nhận ra 2 lần -> chuyển sang "TỰ NGHE VÀ SO SÁNH": nghe mẫu, ghi + nghe giọng mình,
 *     rồi tự bấm "Giống" / "Chưa giống".
 *   - Trình duyệt không nghe được giọng nói (Firefox…) hoặc micro bị chặn -> TỰ ĐỘNG vào chế độ tự so sánh
 *     ngay từ đầu (micro chặn: không ghi âm được thì "nói to theo mẫu rồi tự chọn").
 *   - Chỉ xin quyền micro khi bé BẤM nút. Bản ghi giọng chỉ nằm trong bộ nhớ, rời câu là xoá.
 *
 * Ghi kết quả cho động cơ (session.completeItem):
 *   máy nhận ra ở lần nói 1 -> wrongCount 0 (có sao) · lần 2 -> 1
 *   tự so sánh "Giống" -> wrongCount = số lần trước đó chưa được (máy chưa nhận + bấm "Chưa giống"), tối đa 2
 *   Bỏ qua -> KHÔNG gọi completeItem (không sao, không đổi hộp) — chỉ session.advance().
 *
 * Phím: Space / Enter = bấm micro (khi xong câu: Tiếp) · R nghe mẫu · 1 = Giống · 2 = Chưa giống.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { KidsPicture, preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import { preloadWordAudio, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import { useGameKeys } from '../../game-engine/use-game-keys'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { useSpeakUnlockText } from './speak-unlock-text'
import { matchSpokenWord } from './speech-matching'
import { isSpeechRecognitionAvailable, listenForWord, type ListeningHandle, type ListenOutcome } from './speech-recognizer'
import { TreasureChest } from './TreasureChest'
import { canRecordVoice, playRecording, startVoiceRecording } from './voice-recorder'
import './speak-unlock.css'

const TIMING = {
  firstAutoPlay: 420, // rương hiện xong mới đọc mẫu
  replayAfterMiss: 650, // máy chưa nghe rõ -> đọc mẫu lại
  minUnlockHold: 1700, // rương mở hiện ít nhất chừng này
  afterSpeechPause: 450,
}

/** Số lần máy không nhận ra thì chuyển sang tự nghe và so sánh (luật 33). */
const MISSES_BEFORE_SELF_CHECK = 2

/**
 * Micro đã bị chặn trong lần mở trang này -> các câu sau vào thẳng chế độ tự so sánh,
 * không làm phiền bé bằng hộp xin quyền nữa. (Tải lại trang thì thử lại.)
 */
let micBlockedThisVisit = false

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

type SelfCheckReason = 'unsupported' | 'mic-off' | 'after-misses'

export function SpeakUnlockGame({ session, onExit }: KidsGameProps) {
  const text = useSpeakUnlockText()
  const { kids } = useKidsData()
  const [hideText, setHideText] = useState(session.plan.difficulty.hideTextByDefault)
  const mascot = useMascotReaction('listening')
  const instructionSaid = useRef(false)

  useEffect(() => {
    preloadWordImages(session.plan.items.map((item) => item.word.image))
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  const item = session.current
  return (
    <div className="kz-game-screen su-screen">
      <GameTopBar
        doneCount={session.doneCount}
        totalCount={session.totalCount}
        firstTryStreak={session.firstTryStreak}
        onExit={onExit}
        extra={
          <button type="button" className="kz-toggle" aria-pressed={hideText} onClick={() => setHideText((hidden) => !hidden)} title={text.hideText}>
            <Icon name={hideText ? 'eye-off' : 'eye'} size={22} />
            {text.hideText}
          </button>
        }
      />
      {item && session.stage === 'question' ? (
        <SpeakQuestion key={item.key} item={item} session={session} hideText={hideText} instructionSaid={instructionSaid} onReact={mascot.react} />
      ) : (
        <main className="su-stage" aria-hidden />
      )}
      <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
    </div>
  )
}

/* ============================ 1 câu ============================ */

type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface QuestionProps {
  item: RoundItem
  session: RoundSession
  hideText: boolean
  instructionSaid: { current: boolean }
  onReact: MascotReact
}

function SpeakQuestion({ item, session, hideText, instructionSaid, onReact }: QuestionProps) {
  const text = useSpeakUnlockText()
  const reduceMotion = useReducedMotion()
  const word = item.word

  // Vào câu: trình duyệt không nghe được / micro đã bị chặn -> tự so sánh ngay từ đầu
  const [startReason] = useState<SelfCheckReason | null>(() => (!isSpeechRecognitionAvailable() ? 'unsupported' : micBlockedThisVisit ? 'mic-off' : null))
  const [selfReason, setSelfReason] = useState<SelfCheckReason | null>(startReason)
  const selfCheck = selfReason !== null
  const [listen, setListen] = useState<'idle' | 'listening'>('idle')
  const [misses, setMisses] = useState(0)
  const [notYetCount, setNotYetCount] = useState(0)
  const [phase, setPhase] = useState<'asking' | 'unlocked'>('asking')
  const [nudgeKey, setNudgeKey] = useState(0)
  const [playing, setPlaying] = useState<'model' | 'slow' | 'you' | null>(null)
  const [recording, setRecording] = useState(false)
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  /** đã thử ghi âm mà không được bản ghi (máy lỗi) -> vẫn cho bấm Giống / Chưa giống */
  const [recordFailed, setRecordFailed] = useState(false)

  const shownAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const alive = useRef(true)
  const listening = useRef<ListeningHandle | null>(null)
  const stopRecorder = useRef<(() => Promise<string | null>) | null>(null)
  const recordingUrlRef = useRef<string | null>(null)
  recordingUrlRef.current = recordingUrl
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  // Ghi âm được không: cần MediaRecorder + micro chưa bị chặn
  const canRecord = canRecordVoice() && selfReason !== 'mic-off'
  const canChoose = phase === 'asking' && (!canRecord || !!recordingUrl || recordFailed)

  /** Đọc mẫu (thường / chậm). */
  const playModel = (mode: 'model' | 'slow' = 'model', before: SpeechStep[] = []) => {
    setPlaying(mode)
    void speakSequence([...before, { kind: 'word', word, slow: mode === 'slow' }]).then(() => {
      if (alive.current) setPlaying((current) => (current === mode ? null : current))
    })
  }

  // Câu hiện ra -> đọc mẫu (câu đầu lượt: Ki nói hướng dẫn trước). Rời câu -> dừng mọi thứ + xoá bản ghi.
  const playModelRef = useRef(playModel)
  playModelRef.current = playModel
  useEffect(() => {
    alive.current = true
    const pending = timers.current
    const firstOfRound = !instructionSaid.current
    instructionSaid.current = true
    const introId = startReason === 'unsupported' ? 'kids-vl-speak-03' : startReason === 'mic-off' ? 'kids-vl-speak-04' : 'kids-vl-instr-speak-unlock'
    const intro: SpeechStep[] = firstOfRound ? [{ kind: 'line', id: introId, text: voiceLine(introId), pauseAfterMs: 250 }] : []
    pending.push(window.setTimeout(() => playModelRef.current('model', intro), reduceMotion ? 150 : TIMING.firstAutoPlay))
    return () => {
      alive.current = false
      pending.forEach(window.clearTimeout)
      stopVoice()
      listening.current?.stop()
      void stopRecorder.current?.()
      if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current) // luật 34: rời câu là xoá bản ghi
    }
  }, [reduceMotion, instructionSaid, startReason])

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    stopVoice()
    session.advance()
  }

  /** Mở rương: ghi kết quả cho động cơ, Ki phản ứng, đọc từ + nghĩa rồi sang câu. */
  const unlock = (wrongCount: number) => {
    if (phase !== 'asking') return
    setPhase('unlocked')
    setListen('idle')
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    playSound('correct')
    const result = session.completeItem({ wrongCount, revealed: false, responseMs: performance.now() - shownAt.current, usedReplay: usedReplay.current })
    if (result.praise) onReact('happy', result.praise.text, 4200)
    else {
      const bubbles = selfCheck ? text.selfBubbles : text.heardBubbles
      onReact('happy', bubbles[Math.floor(Math.random() * bubbles.length)], 1800)
    }
    const steps: SpeechStep[] = [
      { kind: 'word', word, pauseAfterMs: 150 },
      { kind: 'meaning', word },
    ]
    if (result.praise) steps.push({ kind: 'line', id: result.praise.id, text: result.praise.text })
    const startedAt = performance.now()
    void speakSequence(steps).then(() => {
      const waited = performance.now() - startedAt
      later(goNext, Math.max(TIMING.afterSpeechPause, TIMING.minUnlockHold - waited))
    })
  }

  /** Bỏ qua: không gọi completeItem -> không sao, không đổi hộp Leitner, không bị trừ gì (luật 31). */
  const skipItem = () => {
    if (phase !== 'asking' || advanced.current) return
    listening.current?.stop()
    void stopRecorder.current?.()
    onReact('wave', text.skippedBubble, 1600)
    goNext()
  }

  /** Chuyển sang tự nghe và so sánh (Ki nói lí do bằng giọng). */
  const enterSelfCheck = (reason: SelfCheckReason) => {
    setSelfReason(reason)
    setListen('idle')
    const lineId = reason === 'mic-off' ? 'kids-vl-speak-04' : 'kids-vl-speak-03'
    onReact(reason === 'mic-off' ? 'comfort' : 'thinking', voiceLine(lineId), 4200)
    void speakSequence([
      { kind: 'line', id: lineId, text: voiceLine(lineId), pauseAfterMs: 200 },
      { kind: 'word', word },
    ])
  }

  /* ---------- nút micro (chế độ máy nghe) ---------- */
  const tapMic = () => {
    if (phase !== 'asking' || selfCheck) return
    if (listen === 'listening') {
      listening.current?.stop() // bé bấm lại = nói xong
      return
    }
    stopVoice() // đừng để micro thu cả giọng mẫu
    setPlaying(null)
    setListen('listening')
    playSound('tap')
    const handle = listenForWord({ devTranscript: word.word })
    listening.current = handle
    void handle.result.then((outcome) => {
      if (!alive.current) return
      listening.current = null
      handleOutcome(outcome)
    })
  }

  const handleOutcome = (outcome: ListenOutcome) => {
    if (outcome.kind === 'mic-blocked') {
      micBlockedThisVisit = true
      enterSelfCheck('mic-off')
      return
    }
    if (outcome.kind === 'failed') {
      enterSelfCheck('unsupported')
      return
    }
    if (outcome.kind === 'heard' && matchSpokenWord(word.word, outcome.alternatives).matched) {
      unlock(misses)
      return
    }
    // máy chưa nhận ra (im lặng hoặc nghe ra từ khác) — KHÔNG nói "Sai"
    const nextMisses = misses + 1
    setMisses(nextMisses)
    setListen('idle')
    setNudgeKey((n) => n + 1)
    if (nextMisses >= MISSES_BEFORE_SELF_CHECK) {
      enterSelfCheck('after-misses')
      return
    }
    onReact('comfort', outcome.kind === 'silence' ? text.silenceBubble : voiceLine('kids-vl-speak-01'), 3200)
    later(() => playModel('model'), TIMING.replayAfterMiss)
  }

  /* ---------- tự nghe và so sánh ---------- */
  const toggleRecording = async () => {
    if (phase !== 'asking') return
    if (recording) {
      const url = await stopRecorder.current?.()
      stopRecorder.current = null
      finishRecording(url ?? null)
      return
    }
    stopVoice()
    setPlaying(null)
    const take = await startVoiceRecording((url) => {
      // tự dừng sau vài giây
      stopRecorder.current = null
      finishRecording(url)
    })
    if (!alive.current) {
      if (take.kind === 'recording') void take.stop()
      return
    }
    if (take.kind === 'recording') {
      stopRecorder.current = take.stop
      setRecording(true)
      playSound('tap')
    } else if (take.kind === 'mic-blocked') {
      micBlockedThisVisit = true
      setSelfReason('mic-off')
      onReact('comfort', voiceLine('kids-vl-speak-04'), 4000)
    } else setRecordFailed(true)
  }

  const finishRecording = (url: string | null) => {
    if (!alive.current) {
      if (url) URL.revokeObjectURL(url)
      return
    }
    setRecording(false)
    if (!url) {
      setRecordFailed(true)
      return
    }
    setRecordingUrl((old) => {
      if (old) URL.revokeObjectURL(old)
      return url
    })
    // ghi xong: tự phát lại giọng bé để so với mẫu
    setPlaying('you')
    void playRecording(url).then(() => alive.current && setPlaying((current) => (current === 'you' ? null : current)))
  }

  const playYou = () => {
    if (!recordingUrl) return
    stopVoice()
    setPlaying('you')
    void playRecording(recordingUrl).then(() => alive.current && setPlaying((current) => (current === 'you' ? null : current)))
  }

  const chooseSame = () => {
    if (!canChoose) return
    unlock(Math.min(2, misses + notYetCount))
  }
  const chooseNotYet = () => {
    if (!canChoose) return
    setNotYetCount((n) => n + 1)
    setNudgeKey((n) => n + 1)
    onReact('comfort', voiceLine('kids-vl-speak-02'), 3200)
    later(() => playModel('slow'), 500)
  }

  const replayModel = (mode: 'model' | 'slow') => {
    if (phase === 'asking') usedReplay.current = true
    playModel(mode)
  }

  useGameKeys({
    onEnter: () => (phase === 'unlocked' ? goNext() : selfCheck ? undefined : tapMic()),
    onReplay: () => replayModel('model'),
    onChoice: (index) => {
      if (!selfCheck) return
      if (index === 0) chooseSame()
      if (index === 1) chooseNotYet()
    },
  })

  const showWord = !hideText || phase === 'unlocked'
  const chestState = phase === 'unlocked' ? 'open' : listen === 'listening' || recording ? 'listening' : 'locked'
  const note = selfReason === 'unsupported' ? text.noteUnsupported : selfReason === 'mic-off' ? text.noteMicOff : null

  return (
    <main className="su-stage">
      <div className="su-board">
        {/* ---------- rương ---------- */}
        <section className="su-chest-area">
          <TreasureChest state={chestState} nudgeKey={nudgeKey} />
          <p className="su-goal" aria-hidden={phase === 'unlocked'}>
            {phase === 'asking' ? text.sayToUnlock : ' '}
          </p>
        </section>

        {/* ---------- từ cần nói + micro / tự so sánh ---------- */}
        <section className={['su-panel', 'kz-card', phase === 'unlocked' && 'is-unlocked'].filter(Boolean).join(' ')}>
          <div className="su-word">
            <span className="su-word__picture">
              <KidsPicture slug={word.image} word={word.word} size={150} decorative={showWord} />
            </span>
            <div className="su-word__body">
              {showWord ? (
                <p className="su-word__text" key="word">
                  {word.word}
                </p>
              ) : (
                <p className="su-word__hidden">{text.hiddenWord}</p>
              )}
              {phase === 'unlocked' && <p className="su-word__meaning">{word.meaningVi}</p>}
              <div className="su-word__listen">
                <button
                  type="button"
                  className={['su-listen', playing === 'model' && 'is-playing'].filter(Boolean).join(' ')}
                  onClick={() => replayModel('model')}
                  aria-label={text.listenModel}
                  title={text.listenModel}
                >
                  <Icon name="volume" size={30} strokeWidth={2.4} />
                </button>
                <button
                  type="button"
                  className={['su-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
                  onClick={() => replayModel('slow')}
                  aria-label={text.listenSlow}
                  title={text.listenSlow}
                >
                  <Icon name="turtle" size={26} strokeWidth={2.2} />
                </button>
              </div>
            </div>
          </div>

          {phase === 'unlocked' ? null : !selfCheck ? (
            /* ----- máy nghe ----- */
            <div className="su-mic-area">
              <button
                type="button"
                className={['su-mic', listen === 'listening' && 'is-listening'].filter(Boolean).join(' ')}
                onClick={tapMic}
                aria-label={listen === 'listening' ? text.micListening : text.micIdle}
              >
                <span className="su-mic__ring" aria-hidden />
                <span className="su-mic__ring su-mic__ring--2" aria-hidden />
                <MicGlyph size={50} />
              </button>
              <p className="su-mic__label" aria-live="polite">
                {listen === 'listening' ? text.micListening : text.micIdle}
                {listen === 'idle' && <Kbd className="su-mic__key">{text.micKey}</Kbd>}
              </p>
            </div>
          ) : (
            /* ----- tự nghe và so sánh ----- */
            <div className="su-self">
              <p className="su-self__title">
                <Icon name="hint" size={20} /> {text.selfCheckTitle}
              </p>
              {note && <p className="su-self__note">{note}</p>}
              <div className="su-self__row">
                <button
                  type="button"
                  className={['su-self__btn', playing === 'model' && 'is-playing'].filter(Boolean).join(' ')}
                  onClick={() => replayModel('model')}
                >
                  <Icon name="volume" size={24} /> {text.playModel}
                </button>
                {canRecord && (
                  <button
                    type="button"
                    className={['su-self__btn', 'su-self__btn--record', recording && 'is-recording'].filter(Boolean).join(' ')}
                    onClick={() => void toggleRecording()}
                  >
                    <MicGlyph size={22} /> {recording ? text.recording : recordingUrl ? text.recordAgain : text.recordYou}
                  </button>
                )}
                {canRecord && (
                  <button
                    type="button"
                    className={['su-self__btn', playing === 'you' && 'is-playing'].filter(Boolean).join(' ')}
                    onClick={playYou}
                    disabled={!recordingUrl}
                  >
                    <Icon name="play-fill" size={20} /> {text.playYou}
                  </button>
                )}
              </div>
              <p className="su-self__hint">{canRecord ? text.selfCheckHint : text.honorHint}</p>
              <div className="kz-choice-row su-self__choices">
                <button
                  type="button"
                  className="kz-choice"
                  onClick={chooseSame}
                  disabled={!canChoose}
                  // chỉ khi dev: script kiểm thử tự động bấm được "Giống"
                  data-answer={import.meta.env.DEV ? 'true' : undefined}
                >
                  <Icon name="check" size={26} /> {text.same} <Kbd>1</Kbd>
                </button>
                <button type="button" className="kz-choice" onClick={chooseNotYet} disabled={!canChoose}>
                  <Icon name="retry" size={24} /> {text.notYet} <Kbd>2</Kbd>
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ---------- góc phải dưới: Bỏ qua (luôn có) / Tiếp (khi rương đã mở) ---------- */}
      <div className="su-next">
        {phase === 'unlocked' ? (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="su-next__btn">
            {text.next}
          </Button>
        ) : (
          <Button size="lg" variant="secondary" onClick={skipItem} className="su-skip">
            {text.skip}
          </Button>
        )}
      </div>
    </main>
  )
}

/** Hình micro (bộ Icon chung chưa có icon micro — đã ghi trong REQUESTS.md). */
function MicGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="8.5" y="2.8" width="7" height="12" rx="3.5" fill="currentColor" stroke="none" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3.2M8.8 21.2h6.4" />
    </svg>
  )
}
