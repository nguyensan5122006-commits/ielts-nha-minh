/**
 * ListenTapGame.tsx — TRÒ 1 "NGHE VÀ CHẠM" (listen-tap)
 * ----------------------------------------------------------------------------
 * Nghe 1 từ tiếng Anh -> bấm đúng 1 trong 3–4 ảnh 3D.
 *
 * Nhịp 1 câu (thời gian là "cảm giác game" — đừng đổi tuỳ tiện):
 *   0 ms     thẻ ảnh bay lên lần lượt (mỗi thẻ trễ 70 ms)
 *   380 ms   tự đọc từ (nút loa to nhấp nháy sóng âm trong lúc đọc)
 *   BẤM ĐÚNG: ngay lập tức (≤ 50 ms) thẻ sáng viền vàng + dấu ✓ + "ting" + bùng sao;
 *             các thẻ khác thu nhỏ biến mất (240 ms); hiệu ứng đúng xong trong 0,8 giây.
 *             Giọng đọc lại từ + nghĩa tiếng Việt (+ lời khen cụ thể mỗi 4 câu đúng),
 *             đọc xong 0,4 giây thì sang câu sau. Bấm Enter / "Tiếp" để đi nhanh hơn.
 *   BẤM SAI: thang gợi ý (game-engine/hint-ladder.ts) — thẻ sai lắc nhẹ, màu cam san hô,
 *             rồi mờ đi; không buzzer, không X đỏ, không trừ điểm.
 *             Sai 1: đọc lại từ · Sai 2: + gợi ý (chữ cái đầu / nghĩa) và đọc chậm
 *             Sai 3 (hoặc chỉ còn 1 thẻ): chỉ vào đáp án, bé bấm lại; câu quay lại cuối lượt.
 *
 * Nút "Ẩn chữ": giấu chữ của từ, chỉ còn nghe -> luyện tai (mức khó 3 tự bật).
 * Phím: 1–4 chọn thẻ · R nghe lại · Enter sang câu sau (khi đã đúng) · Esc thoát.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
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
import { firstLetterPattern, hintAfterCorrectPick, hintAfterWrongPick, initialHintState, type HintLadderState } from '../../game-engine/hint-ladder'
import { preloadWordAudio, sayWord, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import { useGameKeys } from '../../game-engine/use-game-keys'
import type { RoundItem, RoundPlan } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { useKidsText } from '../../kids-text'
import './listen-tap.css'

/** Thời điểm (ms) — gom 1 chỗ cho dễ chỉnh "nhịp" trò chơi */
const TIMING = {
  firstAutoPlay: 380, // chờ thẻ bay vào xong mới đọc
  replayAfterWrong: 420, // sai -> chờ thẻ lắc xong mới đọc lại
  minCorrectHold: 1100, // trạng thái "đúng" hiện ít nhất chừng này (không lướt qua)
  afterSpeechPause: 400, // đọc xong nghỉ chút rồi sang câu
}

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function ListenTapGame({ session, onExit }: KidsGameProps) {
  const text = useKidsText()
  const { kids } = useKidsData()
  const [hideText, setHideText] = useState(session.plan.difficulty.hideTextByDefault)
  const mascot = useMascotReaction('listening')

  // Tải trước mọi ảnh có thể xuất hiện trong lượt + tiếng các từ -> thẻ bay vào là có ảnh, bấm loa là kêu
  useEffect(() => {
    preloadWordImages([...session.plan.items, ...session.plan.distractorPool.map((word) => ({ word }))].map((x) => x.word.image))
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  // Vào lượt: Ki nhắc "Nghe kĩ nhé" (mascot.react ổn định -> chạy 1 lần)
  const { react } = mascot
  useEffect(() => {
    react('listening', text.readyBubble, 2200)
  }, [react, text.readyBubble])

  const item = session.current
  return (
    <div className="lt-screen">
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
        <ListenTapQuestion key={item.key} item={item} plan={session.plan} session={session} hideText={hideText} onReact={mascot.react} />
      ) : (
        <div className="lt-stage" aria-hidden />
      )}
      <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
    </div>
  )
}

/* ============================ 1 câu hỏi ============================ */

type Phase = 'asking' | 'correct'
type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface QuestionProps {
  item: RoundItem
  plan: RoundPlan
  session: RoundSession
  hideText: boolean
  onReact: MascotReact
}

function ListenTapQuestion({ item, plan, session, hideText, onReact }: QuestionProps) {
  const text = useKidsText()
  const reduceMotion = useReducedMotion()
  const target = item.word

  // Đáp án: tính 1 lần khi câu hiện ra (không xáo lại khi vẽ lại)
  const [options] = useState<KidsWord[]>(() =>
    pickAnswerOptions({
      target,
      pool: plan.distractorPool,
      count: plan.difficulty.optionCount,
      recentWordIds: session.recentWordIds,
      preferLookAlike: plan.difficulty.level === 3,
    }),
  )
  const [hint, setHint] = useState<HintLadderState>(initialHintState)
  const [phase, setPhase] = useState<Phase>('asking')
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  /** thẻ vừa bấm sai (lắc nhẹ 1 lần rồi mờ đi — đã mờ thì không bấm lại được) */
  const [wrongId, setWrongId] = useState<string | null>(null)

  const shownAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  /** Đọc từ (bình thường / chậm); nút loa nhấp nháy trong lúc đọc */
  const playWord = (mode: 'normal' | 'slow' = 'normal') => {
    setPlaying(mode)
    void sayWord(target, { slow: mode === 'slow' }).then(() => setPlaying((current) => (current === mode ? null : current)))
  }

  // Câu hiện ra -> tự đọc từ. Rời câu -> dừng mọi hẹn giờ + giọng đọc.
  // (playWord để trong ref: effect chỉ chạy 1 lần lúc câu hiện ra)
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

  /**
   * Manh mối bậc 2: chữ cái đầu (khi đang ẩn chữ) — nhưng nếu đáp án còn lại cũng bắt đầu
   * bằng chữ đó (VD sheep / shark) thì chữ cái đầu vô dụng -> dùng nghĩa tiếng Việt.
   */
  const clueKindFor = (state: HintLadderState): 'letter' | 'meaning' => {
    if (!hideText) return 'meaning'
    const first = target.word[0].toLowerCase()
    const othersLeft = options.filter((o) => o.id !== target.id && !state.eliminated.includes(o.id))
    return othersLeft.some((o) => o.word[0].toLowerCase() === first) ? 'meaning' : 'letter'
  }

  const choose = (option: KidsWord) => {
    if (phase !== 'asking' || hint.eliminated.includes(option.id)) return

    /* ---------- ĐÚNG ---------- */
    if (option.id === target.id) {
      const solved = hintAfterCorrectPick(hint)
      setHint(solved)
      setPhase('correct')
      // bỏ focus khỏi thẻ vừa bấm -> phím Enter sau đó là "Tiếp", không phải "bấm lại thẻ"
      ;(document.activeElement as HTMLElement | null)?.blur?.()
      playSound('correct')
      const result = session.completeItem({
        wrongCount: solved.wrongCount,
        revealed: solved.step === 'reveal',
        responseMs: performance.now() - shownAt.current,
        usedReplay: usedReplay.current,
        textHidden: hideText,
      })

      // Ki phản ứng: lời khen cụ thể (mỗi 4 câu đúng) hoặc 1 chữ ngắn
      if (result.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
      else if (result.praise) onReact('happy', result.praise.text, 4200)
      else onReact('happy', text.correctBubbles[Math.floor(Math.random() * text.correctBubbles.length)], 1600)

      // Giọng: từ -> nghĩa tiếng Việt -> (lời khen) ; xong thì sang câu sau
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

    /* ---------- SAI: lên 1 bậc thang gợi ý ---------- */
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
      // reveal: chỉ vào đáp án đúng, đọc từ + nghĩa; bé tự bấm lại
      onReact('comfort', voiceLine('kids-vl-hint3-show'), 3600)
      later(() => void speakSequence([{ kind: 'word', word: target, pauseAfterMs: 150 }, { kind: 'meaning', word: target }]), TIMING.replayAfterWrong)
    }
  }

  useGameKeys({
    onChoice: (index) => options[index] && choose(options[index]),
    onReplay: () => replay('normal'),
    onEnter: () => phase === 'correct' && goNext(),
  })

  const revealed = hint.step === 'reveal'
  const showWord = !hideText || phase === 'correct' || revealed
  const showClue = hint.step === 'clue' && phase === 'asking'
  const clueKind = clueKindFor(hint)

  return (
    <main className="lt-stage">
      {/* ---------- phần nghe ---------- */}
      <section className="lt-prompt" aria-label={text.listenPrompt}>
        <div className="lt-listen-row">
          <button
            type="button"
            className={['lt-listen', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
            onClick={() => replay('normal')}
            aria-label={text.listenAgain}
            title={`${text.listenAgain} (R)`}
          >
            <span className="lt-listen__ring" aria-hidden />
            <span className="lt-listen__ring lt-listen__ring--2" aria-hidden />
            <Icon name="volume" size={52} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            className={['lt-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
            onClick={() => replay('slow')}
            aria-label={text.listenSlow}
            title={text.listenSlow}
          >
            {/* icon nét (không dùng ảnh 3D con rùa: "tortoise" có thể là 1 thẻ đáp án -> dễ nhầm) */}
            <Icon name="turtle" size={30} strokeWidth={2.2} />
          </button>
        </div>

        <div className={['lt-word', phase === 'correct' && 'is-solved'].filter(Boolean).join(' ')} aria-live="polite">
          {showWord ? (
            <span className="lt-word__text" key={phase}>
              {target.word}
            </span>
          ) : (
            <span className="lt-word__hidden" aria-label={text.listenPrompt}>
              {/* chữ bị ẩn: mỗi chữ cái 1 ô trống; bậc gợi ý 2 thì lộ chữ cái đầu */}
              {firstLetterPattern(target.word)
                .split(' ')
                .filter((char) => char !== '')
                .map((char, index) => (
                  <span key={index} className={['lt-word__blank', index === 0 && showClue && clueKind === 'letter' && 'is-clue'].filter(Boolean).join(' ')}>
                    {index === 0 && showClue && clueKind === 'letter' ? char : ''}
                  </span>
                ))}
            </span>
          )}
        </div>

        <div className="lt-subline">
          {phase === 'correct' || revealed ? (
            <span className="lt-meaning" key="meaning">
              {target.meaningVi}
            </span>
          ) : showClue && clueKind === 'meaning' ? (
            <span className="lt-clue" key="clue">
              <Icon name="hint" size={20} /> {text.hintMeaning}: <b>{target.meaningVi}</b>
            </span>
          ) : showClue ? (
            <span className="lt-clue" key="clue-letter">
              <Icon name="hint" size={20} /> {text.hintFirstLetter}: <b>{target.word[0]}</b>
            </span>
          ) : (
            <span className="lt-instruction">{text.listenPrompt}</span>
          )}
        </div>
      </section>

      {/* ---------- các thẻ ảnh ---------- */}
      <section className={['lt-cards', `lt-cards--${options.length}`, phase === 'correct' && 'is-solved', revealed && 'is-revealing'].filter(Boolean).join(' ')}>
        {options.map((option, index) => {
          const isTarget = option.id === target.id
          const eliminated = hint.eliminated.includes(option.id) || (revealed && !isTarget)
          const classes = [
            'lt-card',
            eliminated && 'is-eliminated',
            wrongId === option.id && 'is-wrong',
            phase === 'correct' && isTarget && 'is-correct',
            phase === 'correct' && !isTarget && 'is-dismissed',
            revealed && isTarget && phase === 'asking' && 'is-revealed',
          ]
          return (
            <button
              key={option.id}
              type="button"
              className={classes.filter(Boolean).join(' ')}
              style={{ '--i': index } as CSSProperties}
              onClick={() => choose(option)}
              // chỉ khi npm run dev: đánh dấu đáp án đúng cho script kiểm thử tự động (QA)
              data-answer={import.meta.env.DEV && isTarget ? 'true' : undefined}
              disabled={eliminated || phase === 'correct'}
              aria-label={text.pictureLabel(index + 1)}
            >
              <Kbd className="lt-card__key">{index + 1}</Kbd>
              <span className="lt-card__picture">
                <KidsPicture slug={option.image} word={option.word} size={150} decorative />
              </span>
              {phase === 'correct' && isTarget && (
                <>
                  <span className="lt-card__check" aria-hidden>
                    <Icon name="check" size={28} strokeWidth={3.2} />
                  </span>
                  <span className="lt-card__label">{option.word}</span>
                  <CorrectBurst />
                </>
              )}
              {revealed && isTarget && phase === 'asking' && (
                <span className="lt-card__pointer" aria-hidden>
                  <KidsPicture slug="backhand-index-pointing-down" word="here" size={58} decorative />
                </span>
              )}
            </button>
          )
        })}
      </section>

      {/* ---------- sau khi đúng: nút Tiếp (tự sang câu sau khi đọc xong) ---------- */}
      <div className="lt-next">
        {phase === 'correct' && (
          <>
            <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="lt-next__btn">
              {text.next}
            </Button>
          </>
        )}
      </div>
    </main>
  )
}
