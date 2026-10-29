/**
 * BalloonPopGame.tsx — TRÒ 4 "BÓNG BAY CHỮ" (balloon-pop)
 * ----------------------------------------------------------------------------
 * Nghe 1 từ tiếng Anh -> bấm đúng quả bóng mang chữ đó, trong 4–5 quả đang bay lên chậm.
 * Số bóng = số đáp án của mức khó + 1 (mức 1: 4 bóng · mức 2–3: 5 bóng). Mức càng cao bóng bay càng nhanh
 * (vẫn chậm: 12–20 giây cho 1 lần bay hết màn hình). Mức 3 có chữ "dễ nhầm" (cùng chữ cái đầu…).
 *
 * KHÔNG có đồng hồ, KHÔNG mất mạng: bóng bay qua đỉnh màn hình sẽ quay lại từ dưới đáy
 * (lần đầu bóng đúng bay mất, Ki nhắc "Bóng bay qua mất cũng không sao, bóng sẽ quay lại").
 * Rê chuột lên quả bóng nào thì quả đó đứng lại -> bé không phải "đuổi theo" bóng.
 *
 * Nhịp 1 câu:
 *   0 ms     bóng hiện ra ở nhiều độ cao khác nhau rồi bay lên; 380 ms sau tự đọc từ
 *   BẤM ĐÚNG: ngay lập tức bóng nổ "bụp" + bùng sao + "ting"; các bóng khác bay mất; thẻ từ hiện ra giữa
 *             màn (ảnh nếu có + chữ + nghĩa) và được đọc (từ -> nghĩa -> lời khen), rồi tự sang câu sau.
 *   BẤM SAI:  bóng lắc nhẹ, nhãn chuyển cam san hô rồi xẹp mờ (không bấm lại được). Thang gợi ý
 *             (game-engine/hint-ladder.ts): sai 1 đọc lại · sai 2 loại thêm + gợi ý (chữ cái đầu / nghĩa)
 *             + đọc chậm · sai 3 bóng đúng đứng yên phát sáng, bé bấm vào nó; từ quay lại cuối lượt.
 * Phím: 1–5 bấm bóng (đánh số từ trái sang phải) · R nghe lại · Enter / Space = Tiếp (khi đã đúng).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { pickAnswerOptions } from '../../game-engine/answer-options'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { KidsPicture, preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import { hintAfterCorrectPick, hintAfterWrongPick, initialHintState, type HintLadderState } from '../../game-engine/hint-ladder'
import { preloadWordAudio, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { hasPicture } from '../../kids-data/kids-word-bank'
import { useKidsText } from '../../kids-text'
import { useBalloonPopText } from './balloon-pop-text'
import './balloon-pop.css'

const TIMING = {
  firstAutoPlay: 380,
  replayAfterWrong: 420,
  minCorrectHold: 1300,
  afterSpeechPause: 400,
}

/** Thời gian (giây) 1 quả bóng bay từ đáy lên quá đỉnh màn hình, theo mức khó */
const RISE_SECONDS: Record<1 | 2 | 3, number> = { 1: 20, 2: 16, 3: 12.5 }

/** Màu bóng (theo thứ tự trái -> phải). Nhãn chữ luôn là nền trắng chữ mực -> đọc rõ trên mọi màu. */
const BALLOON_COLOURS = ['#ff6b6b', '#4dabf7', '#ffc53d', '#40c057', '#b197fc']

/** Chiều cao 1 quả bóng kể cả dây (px) — để tính quãng bay */
const BALLOON_TOTAL_HEIGHT = 270

/** Hình thân bóng (khung vẽ 120 × 220): tròn phía trên, thon dần xuống nút thắt */
const BALLOON_BODY_PATH = 'M60 4 C 25 4 4 32 4 66 C 4 104 34 132 56 141 L 64 141 C 86 132 116 104 116 66 C 116 32 95 4 60 4 Z'

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function BalloonPopGame({ session, onExit }: KidsGameProps) {
  const kidsText = useKidsText()
  const { kids } = useKidsData()
  const mascot = useMascotReaction('listening')
  // câu "bóng bay mất cũng không sao" chỉ nói 1 lần mỗi lượt
  const calmLineSaid = useRef(false)

  useEffect(() => {
    preloadWordImages([...session.plan.items.map((item) => item.word.image)].filter(Boolean))
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  const { react } = mascot
  useEffect(() => {
    react('listening', voiceLine('kids-vl-instr-balloon-pop'), 3000)
  }, [react])

  const item = session.current
  return (
    <div className="kz-game-screen bp-screen">
      <GameTopBar doneCount={session.doneCount} totalCount={session.totalCount} firstTryStreak={session.firstTryStreak} onExit={onExit} />
      {item && session.stage === 'question' ? (
        <BalloonQuestion
          key={item.key}
          item={item}
          session={session}
          onReact={mascot.react}
          correctBubbles={kidsText.correctBubbles}
          calmLineSaid={calmLineSaid}
        />
      ) : (
        <main className="kz-game-stage" aria-hidden />
      )}
      <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
      {/* màu bóng bóng loáng: 2 dải chuyển màu dùng chung cho mọi quả bóng (id cố định, chỉ có 1 trò trên trang) */}
      <svg className="bp-defs" aria-hidden width="0" height="0">
        <defs>
          <radialGradient id="bp-shine" cx="34%" cy="26%" r="62%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="38%" stopColor="#fff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bp-shade" cx="50%" cy="40%" r="62%">
            <stop offset="70%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ============================ 1 câu ============================ */

type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface QuestionProps {
  item: RoundItem
  session: RoundSession
  onReact: MascotReact
  correctBubbles: string[]
  /** cờ chung cả lượt: đã nói câu "bóng bay mất cũng không sao" chưa */
  calmLineSaid: { current: boolean }
}

/** Vị trí + nhịp bay của 1 quả bóng (tính 1 lần mỗi câu) */
interface BalloonFlight {
  /** vị trí ngang (% bề rộng) */
  left: number
  /** thời gian bay hết 1 vòng (giây) */
  seconds: number
  /** đã bay được bao nhiêu phần vòng lúc câu hiện ra (0..1) -> bóng hiện ngay ở nhiều độ cao */
  startProgress: number
  /** lắc lư lệch nhịp nhau cho tự nhiên */
  swayDelay: number
  /** độ cao đứng yên khi giảm chuyển động (% chiều cao) */
  restTop: number
}

function planFlights(count: number, level: 1 | 2 | 3): BalloonFlight[] {
  const base = RISE_SECONDS[level]
  // các mức "đã bay được" khác nhau rồi xáo -> bóng cạnh nhau không cùng độ cao
  const progressSteps = Array.from({ length: count }, (_, i) => 0.2 + (i * 0.3) / Math.max(1, count - 1))
  for (let i = progressSteps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[progressSteps[i], progressSteps[j]] = [progressSteps[j], progressSteps[i]]
  }
  const span = 70 // bóng trải từ 15% tới 85% bề rộng
  return Array.from({ length: count }, (_, i) => ({
    left: 15 + (count === 1 ? span / 2 : (i * span) / (count - 1)) + (Math.random() * 3 - 1.5),
    seconds: base * (0.9 + Math.random() * 0.22),
    startProgress: progressSteps[i],
    swayDelay: -Math.random() * 3,
    restTop: 30 + (i % 2) * 14,
  }))
}

function BalloonQuestion({ item, session, onReact, correctBubbles, calmLineSaid }: QuestionProps) {
  const kidsText = useKidsText()
  const text = useBalloonPopText()
  const reduceMotion = useReducedMotion()
  const plan = session.plan
  const level = plan.difficulty.level
  const target: KidsWord = item.word

  // Đáp án: tính 1 lần khi câu hiện ra (bóng không đổi chữ khi vẽ lại)
  const [options] = useState<KidsWord[]>(() =>
    pickAnswerOptions({
      target,
      pool: plan.distractorPool,
      count: plan.difficulty.optionCount + 1,
      recentWordIds: session.recentWordIds,
      preferLookAlike: level === 3,
    }),
  )
  const [flights] = useState<BalloonFlight[]>(() => planFlights(options.length, level))
  const [hint, setHint] = useState<HintLadderState>(initialHintState)
  const [phase, setPhase] = useState<'asking' | 'correct'>('asking')
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)

  // Quãng bay = chiều cao bầu trời + chiều cao bóng (đo thật để vừa mọi màn hình)
  const skyRef = useRef<HTMLDivElement>(null)
  const [travel, setTravel] = useState(0)
  useLayoutEffect(() => {
    const sky = skyRef.current
    if (!sky) return
    const measure = () => setTravel(sky.clientHeight + BALLOON_TOTAL_HEIGHT)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(sky)
    return () => observer.disconnect()
  }, [])

  const shownAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  const playWord = (mode: 'normal' | 'slow' = 'normal') => {
    setPlaying(mode)
    void speakSequence([{ kind: 'word', word: target, slow: mode === 'slow' }]).then(() => setPlaying((current) => (current === mode ? null : current)))
  }
  const playWordRef = useRef(playWord)
  playWordRef.current = playWord
  useEffect(() => {
    const pending = timers.current
    pending.push(window.setTimeout(() => playWordRef.current(), reduceMotion ? 150 : TIMING.firstAutoPlay))
    return () => {
      pending.forEach(window.clearTimeout)
      stopVoice()
    }
  }, [reduceMotion])

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    stopVoice()
    session.advance()
  }

  const replay = (mode: 'normal' | 'slow') => {
    if (phase === 'asking') usedReplay.current = true
    playWord(mode)
  }

  /** Manh mối bậc 2: chữ cái đầu — trừ khi bóng còn lại cũng cùng chữ cái đầu thì dùng nghĩa tiếng Việt */
  const clueKindFor = (state: HintLadderState): 'letter' | 'meaning' => {
    const first = target.word[0].toLowerCase()
    const othersLeft = options.filter((o) => o.id !== target.id && !state.eliminated.includes(o.id))
    return othersLeft.some((o) => o.word[0].toLowerCase() === first) ? 'meaning' : 'letter'
  }

  const pop = (option: KidsWord) => {
    if (phase !== 'asking' || hint.eliminated.includes(option.id)) return

    /* ---------- ĐÚNG ---------- */
    if (option.id === target.id) {
      const solved = hintAfterCorrectPick(hint)
      setHint(solved)
      setPhase('correct')
      ;(document.activeElement as HTMLElement | null)?.blur?.()
      playSound('pop')
      playSound('correct')
      const result = session.completeItem({
        wrongCount: solved.wrongCount,
        revealed: solved.step === 'reveal',
        responseMs: performance.now() - shownAt.current,
        usedReplay: usedReplay.current,
      })
      if (result.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
      else if (result.praise) onReact('happy', result.praise.text, 4200)
      else onReact('happy', correctBubbles[Math.floor(Math.random() * correctBubbles.length)], 1600)

      const steps: SpeechStep[] = [
        { kind: 'word', word: target, pauseAfterMs: 150 },
        { kind: 'meaning', word: target },
      ]
      if (result.praise) steps.push({ kind: 'line', id: result.praise.id, text: result.praise.text })
      const startedAt = performance.now()
      void speakSequence(steps).then(() => {
        const waited = performance.now() - startedAt
        later(goNext, Math.max(TIMING.afterSpeechPause, TIMING.minCorrectHold - waited))
      })
      return
    }

    /* ---------- SAI ---------- */
    const next = hintAfterWrongPick(
      hint,
      option.id,
      options.map((o) => o.id),
      target.id,
    )
    setHint(next)
    setWrongId(option.id)
    playSound('oops')
    if (next.step === 'replay') {
      onReact('comfort', voiceLine('kids-vl-hint1-listen'), 2800)
      later(() => playWord(), TIMING.replayAfterWrong)
    } else if (next.step === 'clue') {
      onReact('thinking', voiceLine(clueKindFor(next) === 'letter' ? 'kids-vl-hint2-first-letter' : 'kids-vl-hint2-meaning'), 3200)
      later(() => playWord('slow'), TIMING.replayAfterWrong)
    } else {
      onReact('comfort', voiceLine('kids-vl-hint3-show'), 3600)
      later(() => void speakSequence([{ kind: 'word', word: target, pauseAfterMs: 150 }, { kind: 'meaning', word: target }]), TIMING.replayAfterWrong)
    }
  }

  /** Bóng đúng bay qua đỉnh màn hình lần đầu trong lượt -> Ki trấn an 1 lần */
  const onTargetLooped = () => {
    if (calmLineSaid.current || phase !== 'asking') return
    calmLineSaid.current = true
    onReact('comfort', voiceLine('kids-vl-instr-balloon-calm'), 3600)
  }

  /* ---------- bàn phím: 1–5 · R · Enter/Space ---------- */
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {})
  keyHandler.current = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
    const focused = event.target as HTMLElement | null
    if (focused && (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA' || focused.isContentEditable)) return
    if (/^[1-5]$/.test(event.key)) {
      const option = options[Number(event.key) - 1]
      if (option) {
        event.preventDefault()
        pop(option)
      }
    } else if (event.key === 'r' || event.key === 'R') {
      event.preventDefault()
      replay('normal')
    } else if ((event.key === 'Enter' || event.key === ' ') && phase === 'correct' && focused?.tagName !== 'BUTTON') {
      event.preventDefault()
      goNext()
    }
  }
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => keyHandler.current(event)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ---------- vẽ ---------- */
  const solved = phase === 'correct'
  const revealed = hint.step === 'reveal' && !solved
  const showClue = hint.step === 'clue' && !solved
  const clueKind = clueKindFor(hint)

  return (
    <main className={['bp-stage', solved && 'is-solved'].filter(Boolean).join(' ')}>
      {/* ---------- phần nghe (nổi trên bầu trời) ---------- */}
      <section className="bp-prompt kz-glass" aria-label={text.instruction}>
        <button
          type="button"
          className={['bp-listen', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={() => replay('normal')}
          aria-label={kidsText.listenAgain}
          title={`${kidsText.listenAgain} (R)`}
        >
          <span className="bp-listen__ring" aria-hidden />
          <Icon name="volume" size={40} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          className={['bp-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={() => replay('slow')}
          aria-label={kidsText.listenSlow}
          title={kidsText.listenSlow}
        >
          <Icon name="turtle" size={26} strokeWidth={2.2} />
        </button>
        <div className="bp-prompt__text" aria-live="polite">
          {showClue ? (
            <span className="bp-clue" key="clue">
              <Icon name="hint" size={20} />
              {clueKind === 'letter' ? (
                <>
                  {kidsText.hintFirstLetter}: <b>{target.word[0]}</b>
                </>
              ) : (
                <>
                  {kidsText.hintMeaning}: <b>{target.meaningVi}</b>
                </>
              )}
            </span>
          ) : (
            <>
              <span className="bp-instruction">{text.instruction}</span>
              {!reduceMotion && <span className="bp-hover-hint">{text.hoverHint}</span>}
            </>
          )}
        </div>
      </section>

      {/* ---------- bầu trời bóng bay ---------- */}
      <div ref={skyRef} className={['bp-sky', solved && 'is-solved'].filter(Boolean).join(' ')} style={{ '--travel': `${travel}px` } as CSSProperties} aria-label={text.skyLabel}>
        {travel > 0 &&
          options.map((option, index) => {
            const flight = flights[index]
            const isTarget = option.id === target.id
            const eliminated = hint.eliminated.includes(option.id) || (revealed && !isTarget)
            const classes = [
              'bp-balloon',
              eliminated && 'is-eliminated',
              wrongId === option.id && 'is-wrong',
              solved && isTarget && 'is-popped',
              solved && !isTarget && 'is-away',
              revealed && isTarget && 'is-revealed',
            ]
            return (
              <button
                key={option.id}
                type="button"
                className={classes.filter(Boolean).join(' ')}
                style={
                  {
                    '--left': `${flight.left}%`,
                    '--seconds': `${flight.seconds}s`,
                    '--delay': `${-flight.startProgress * flight.seconds}s`,
                    '--sway-delay': `${flight.swayDelay}s`,
                    '--rest-top': `${flight.restTop}%`,
                    '--balloon': BALLOON_COLOURS[index % BALLOON_COLOURS.length],
                    // độ dài phần chữ dài nhất ("police officer" -> 7): nhãn xuống dòng ở dấu cách nên cỡ chữ tính theo 1 dòng
                    '--len': Math.max(...option.word.split(' ').map((part) => part.length)),
                  } as CSSProperties
                }
                onClick={() => pop(option)}
                onAnimationIteration={isTarget ? (event) => event.target === event.currentTarget && onTargetLooped() : undefined}
                disabled={eliminated || solved}
                aria-label={text.balloonLabel(index + 1, option.word)}
                // chỉ khi npm run dev: đánh dấu bóng đúng cho script kiểm thử tự động (QA)
                data-answer={import.meta.env.DEV && isTarget ? 'true' : undefined}
              >
                <span className="bp-balloon__sway">
                  <svg className="bp-balloon__svg" viewBox="0 0 120 220" aria-hidden>
                    {/* dây bóng */}
                    <path className="bp-balloon__string" d="M60 146 C 48 162, 72 176, 60 192 S 54 212, 62 220" />
                    {/* nút thắt */}
                    <path className="bp-balloon__knot" d="M53 141 L67 141 L63 149 L57 149 Z" />
                    {/* thân bóng + bóng loáng + viền tối */}
                    <path className="bp-balloon__body" d={BALLOON_BODY_PATH} />
                    <path d={BALLOON_BODY_PATH} fill="url(#bp-shade)" />
                    <path d={BALLOON_BODY_PATH} fill="url(#bp-shine)" />
                    <ellipse cx="36" cy="36" rx="9" ry="16" fill="#fff" opacity="0.55" transform="rotate(-28 36 36)" />
                  </svg>
                  <Kbd className="bp-balloon__key">{index + 1}</Kbd>
                  <span className="bp-balloon__label">{option.word}</span>
                  {revealed && isTarget && (
                    <span className="bp-balloon__pointer" aria-hidden>
                      <KidsPicture slug="backhand-index-pointing-down" word="here" size={54} decorative />
                    </span>
                  )}
                </span>
                {solved && isTarget && <CorrectBurst spread={0.9} />}
              </button>
            )
          })}
      </div>

      {/* ---------- đúng: thẻ từ giữa màn ---------- */}
      {solved && (
        <section className="bp-reward" aria-live="polite">
          {/* tia nắng là 1 lớp riêng NẰM SAU thẻ (thẻ vẽ sau nên che tia nắng) */}
          <span className="bp-reward__rays" aria-hidden />
          <div className="bp-reward__card kz-card">
            {hasPicture(target) && (
              <span className="bp-reward__picture">
                <KidsPicture slug={target.image} word={target.word} size={132} decorative />
              </span>
            )}
            <span className="bp-reward__word">{target.word}</span>
            <span className="bp-reward__meaning">{target.meaningVi}</span>
          </div>
        </section>
      )}

      <div className="bp-next">
        {solved && (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="bp-next__btn">
            {kidsText.next}
          </Button>
        )}
      </div>
    </main>
  )
}
