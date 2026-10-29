/**
 * ColourCommandGame.tsx — TRÒ 6 "NGHE LỆNH TÔ MÀU" (colour-command)
 * ----------------------------------------------------------------------------
 * Bé nghe lệnh tiếng Anh ("Colour the ball under the table blue.") -> chọn lọ sơn đúng màu
 * trên khay -> bấm vào đúng đồ vật trong tranh để tô. Luyện: nghe lệnh, tên màu, giới từ,
 * so sánh, mệnh đề "who / that is …" (bài kiểu Cambridge Starters / Movers).
 *
 * Mỗi câu của lượt = 1 từ do động cơ chọn (Leitner). colour-question.ts biến từ đó thành
 * 1 lệnh + 1 bức tranh (lệnh soạn sẵn nếu có, không thì ghép từ mẫu).
 *
 * Nhịp 1 câu:
 *   0 ms     tranh + khay màu hiện ra
 *   380 ms   tự đọc lệnh (câu đầu lượt: Ki đọc hướng dẫn tiếng Việt trước)
 *   CHỌN MÀU: lọ sơn nhô lên + đọc tên màu tiếng Anh; con trỏ thành cọ màu đó
 *   BẤM ĐỒ VẬT:
 *     - chưa chọn màu   -> khay màu nảy nhẹ + "Chọn màu trước nhé" (không tính là sai)
 *     - đúng vật + đúng màu -> sơn loang ra từ chỗ bấm (≤ 0,5 giây) + "pop"; tô hết vật cần tô
 *                          ("both / all") thì "ting" + bùng sao, đọc từ + nghĩa, rồi sang câu
 *     - sai vật         -> vật đó lắc nhẹ viền cam san hô rồi mờ đi (bị loại)
 *     - đúng vật, sai màu -> lọ sơn đó lắc rồi mờ đi, bỏ màu đang cầm
 *   Thang gợi ý (giống mọi trò, không có lần sai thứ 4):
 *     sai 1 -> đọc lại lệnh · sai 2 -> loại bớt vật + màu, hiện lệnh tiếng Việt, đọc chậm
 *     sai 3 -> vật cần tô sáng lên + bàn tay chỉ, lọ sơn đúng sáng lên; câu quay lại cuối lượt
 *
 * Phím: 1–8 chọn màu · Tab tới đồ vật, Enter/Space để tô · R nghe lại · Enter = Tiếp (khi xong).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import type { HintStep } from '../../game-engine/hint-ladder'
import { preloadWordAudio, sayWord, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import { useGameKeys } from '../../game-engine/use-game-keys'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { useColourCommandText } from './colour-command-text'
import type { PaintColour } from './colour-palette'
import { buildColourQuestion, devForcedQuestion, type ColourQuestion, type SceneThing } from './colour-question'
import { ColourScene, type PaintedThing } from './ColourScene'
import './colour-command.css'

/** Thời điểm (ms) — gom 1 chỗ để chỉnh "nhịp" trò chơi */
const TIMING = {
  firstAutoPlay: 380, // chờ tranh hiện xong mới đọc lệnh
  replayAfterWrong: 420, // sai -> chờ vật / lọ sơn lắc xong mới đọc lại
  minCorrectHold: 1300, // tranh vừa tô xong hiện ít nhất chừng này
  afterSpeechPause: 450,
}

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function ColourCommandGame({ session, onExit }: KidsGameProps) {
  const text = useColourCommandText()
  const { kids } = useKidsData()
  const [hideText, setHideText] = useState(session.plan.difficulty.hideTextByDefault)
  const mascot = useMascotReaction('listening')
  // Lệnh soạn sẵn đã dùng trong lượt (câu gặp lại không lặp y hệt lệnh cũ) + đã đọc hướng dẫn chưa
  const usedCommands = useRef(new Set<string>())
  const instructionSaid = useRef(false)

  // Tải trước ảnh + tiếng các từ của lượt (tranh dùng ảnh của từ đang ôn + từ cùng chủ đề)
  useEffect(() => {
    preloadWordImages([...session.plan.items.map((item) => item.word.image), ...session.plan.distractorPool.map((word) => word.image)])
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  const item = session.current
  return (
    <div className="kz-game-screen cc-screen">
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
        <ColourQuestionView
          key={item.key}
          item={item}
          session={session}
          hideText={hideText}
          usedCommands={usedCommands.current}
          instructionSaid={instructionSaid}
          onReact={mascot.react}
        />
      ) : (
        <main className="cc-stage" aria-hidden />
      )}
      <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
    </div>
  )
}

/* ============================ thang gợi ý của trò tô màu ============================ */

/**
 * Giống hint-ladder.ts của động cơ (3 bậc, không có lần sai thứ 4) nhưng có 2 loại đáp án bị loại:
 * đồ vật (bấm sai vật) và lọ sơn (đúng vật nhưng sai màu).
 */
interface PaintHintState {
  wrongCount: number
  step: HintStep
  eliminatedThings: string[]
  eliminatedColours: string[]
}

const initialPaintHint: PaintHintState = { wrongCount: 0, step: 'none', eliminatedThings: [], eliminatedColours: [] }

function paintHintAfterWrong(state: PaintHintState, question: ColourQuestion, wrong: { thingKey?: string; colourId?: string }): PaintHintState {
  const wrongCount = state.wrongCount + 1
  const step: HintStep = wrongCount >= 3 ? 'reveal' : wrongCount === 2 ? 'clue' : 'replay'
  let eliminatedThings = wrong.thingKey ? [...state.eliminatedThings, wrong.thingKey] : state.eliminatedThings
  let eliminatedColours = wrong.colourId ? [...state.eliminatedColours, wrong.colourId] : state.eliminatedColours

  if (step === 'clue') {
    // bậc 2: loại thêm 1 vật sai + 2 lọ sơn sai (luật 15: "loại 1–2 đáp án")
    const extraThing = question.things.find((t) => t.role === 'other' && !eliminatedThings.includes(t.key))
    if (extraThing) eliminatedThings = [...eliminatedThings, extraThing.key]
    const extraColours = question.palette
      .filter((p) => p.wordId !== question.colour.wordId && !eliminatedColours.includes(p.wordId))
      .slice(0, 2)
      .map((p) => p.wordId)
    eliminatedColours = [...eliminatedColours, ...extraColours]
  }
  return { wrongCount, step, eliminatedThings, eliminatedColours }
}

/* ============================ 1 câu ============================ */

type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface QuestionProps {
  item: RoundItem
  session: RoundSession
  hideText: boolean
  usedCommands: Set<string>
  instructionSaid: { current: boolean }
  onReact: MascotReact
}

function ColourQuestionView({ item, session, hideText, usedCommands, instructionSaid, onReact }: QuestionProps) {
  const text = useColourCommandText()
  const reduceMotion = useReducedMotion()

  // Lệnh + tranh: tính 1 lần khi câu hiện ra
  const [question] = useState<ColourQuestion>(
    () => devForcedQuestion(session.doneCount, session.plan.difficulty.level) ?? buildColourQuestion({ item, plan: session.plan, usedInRound: usedCommands }),
  )
  const [brush, setBrush] = useState<PaintColour | null>(null)
  const [painted, setPainted] = useState<Record<string, PaintedThing>>({})
  const [hint, setHint] = useState<PaintHintState>(initialPaintHint)
  const [phase, setPhase] = useState<'asking' | 'correct'>('asking')
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  const [wrongThing, setWrongThing] = useState<string | null>(null)
  const [wrongColour, setWrongColour] = useState<string | null>(null)
  const [burstKey, setBurstKey] = useState<string | null>(null)
  /** khay màu — nảy nhẹ khi bé bấm đồ vật mà chưa cầm màu */
  const trayRef = useRef<HTMLElement>(null)

  const shownAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  const targets = question.things.filter((thing) => thing.role === 'target')
  const revealed = hint.step === 'reveal'

  /** Đọc lệnh (thường / chậm); nút loa nhấp nháy trong lúc đọc. withInstruction: câu đầu lượt. */
  const playCommand = (mode: 'normal' | 'slow' = 'normal', withInstruction = false) => {
    setPlaying(mode)
    const steps: SpeechStep[] = []
    if (withInstruction) steps.push({ kind: 'line', id: 'kids-vl-instr-colour-command', text: voiceLine('kids-vl-instr-colour-command'), pauseAfterMs: 250 })
    steps.push({ kind: 'sentence', text: question.commandEn, slow: mode === 'slow' })
    void speakSequence(steps).then(() => setPlaying((current) => (current === mode ? null : current)))
  }

  // Câu hiện ra -> tự đọc lệnh. Rời câu -> dừng hẹn giờ + giọng đọc.
  const playCommandRef = useRef(playCommand)
  playCommandRef.current = playCommand
  useEffect(() => {
    const pending = timers.current
    const firstOfRound = !instructionSaid.current
    instructionSaid.current = true
    pending.push(window.setTimeout(() => playCommandRef.current('normal', firstOfRound), reduceMotion ? 150 : TIMING.firstAutoPlay))
    return () => {
      pending.forEach(window.clearTimeout)
      stopVoice()
    }
  }, [reduceMotion, instructionSaid])

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    stopVoice()
    session.advance()
  }

  const replay = (mode: 'normal' | 'slow') => {
    if (phase === 'asking') usedReplay.current = true
    playCommand(mode)
  }

  /* ---------- chọn lọ sơn ---------- */
  const pickColour = (paint: PaintColour) => {
    if (phase !== 'asking' || hint.eliminatedColours.includes(paint.wordId)) return
    if (revealed && paint.wordId !== question.colour.wordId) return
    setBrush(paint)
    playSound('tap')
    void sayWord(paint.word) // mọi chữ tiếng Anh đều nghe được: lấy màu nào thì nghe tên màu đó
  }

  /* ---------- bấm 1 đồ vật trong tranh ---------- */
  const tapThing = (thing: SceneThing, originX: number, originY: number) => {
    if (phase !== 'asking' || painted[thing.key] || hint.eliminatedThings.includes(thing.key)) return

    if (!brush) {
      // chưa cầm màu: nhắc nhẹ, KHÔNG tính là sai
      nudgeTray()
      playSound('tap')
      onReact('thinking', text.pickColourFirst, 1800)
      return
    }

    const isTarget = thing.role === 'target'
    const rightColour = brush.wordId === question.colour.wordId

    /* ---------- ĐÚNG vật + ĐÚNG màu: tô ---------- */
    if (isTarget && rightColour) {
      const nextPainted = { ...painted, [thing.key]: { colour: brush, originX, originY } }
      setPainted(nextPainted)
      const left = targets.filter((t) => !nextPainted[t.key]).length
      if (left > 0) {
        // lệnh "both / all": còn vật cần tô
        playSound('pop')
        onReact('happy', text.moreToPaint(left), 1600)
        return
      }
      finishCorrect(thing.key)
      return
    }

    /* ---------- SAI: lên 1 bậc thang gợi ý ---------- */
    const next = paintHintAfterWrong(hint, question, isTarget ? { colourId: brush.wordId } : { thingKey: thing.key })
    setHint(next)
    playSound('oops')
    // màu đang cầm vừa bị loại (bậc 2 loại thêm lọ sơn) -> bỏ màu đó khỏi cọ
    if (next.eliminatedColours.includes(brush.wordId)) setBrush(null)
    if (isTarget) {
      // đúng vật, sai màu -> lọ sơn đó lắc rồi mờ đi; bỏ màu đang cầm
      setWrongColour(brush.wordId)
      setWrongThing(null)
      setBrush(null)
    } else {
      setWrongThing(thing.key)
      setWrongColour(null)
    }
    // lắc xong (≈ 0,4 giây) thì tắt viền cam — vật / lọ sơn đã bị loại vẫn mờ
    later(() => {
      setWrongThing(null)
      setWrongColour(null)
    }, 450)
    if (next.step === 'replay') {
      onReact('comfort', voiceLine('kids-vl-hint1-colour'), 2800)
      later(() => playCommand('normal'), TIMING.replayAfterWrong)
    } else if (next.step === 'clue') {
      onReact('thinking', voiceLine('kids-vl-hint2-meaning'), 3200)
      later(() => playCommand('slow'), TIMING.replayAfterWrong)
    } else {
      // bậc 3: chỉ vào vật cần tô + lọ sơn đúng; bé tự chọn màu và tô
      if (brush.wordId !== question.colour.wordId) setBrush(null)
      onReact('comfort', voiceLine('kids-vl-hint3-colour'), 3800)
      later(() => playCommand('normal'), TIMING.replayAfterWrong)
    }
  }

  /** Khay màu nảy lên 1 cái (giảm chuyển động: chỉ loé viền) — nhắc "chọn màu trước". */
  const nudgeTray = () => {
    const tray = trayRef.current
    if (!tray?.animate) return
    tray.animate(
      reduceMotion
        ? [{ boxShadow: '0 0 0 0 transparent' }, { boxShadow: '0 0 0 6px var(--c-gold)' }, { boxShadow: '0 0 0 0 transparent' }]
        : [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-14px)' },
            { transform: 'translateY(0)' },
            { transform: 'translateY(-6px)' },
            { transform: 'translateY(0)' },
          ],
      { duration: 520, easing: 'ease-out' },
    )
  }

  const finishCorrect = (lastKey: string) => {
    setPhase('correct')
    setBurstKey(lastKey)
    // bỏ focus khỏi vật vừa bấm -> phím Enter sau đó là "Tiếp"
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    playSound('correct')
    const result = session.completeItem({
      wrongCount: hint.wrongCount,
      revealed,
      responseMs: performance.now() - shownAt.current,
      usedReplay: usedReplay.current,
      textHidden: hideText,
    })
    if (result.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
    else if (result.praise) onReact('happy', result.praise.text, 4200)
    else onReact('happy', text.correctBubbles[Math.floor(Math.random() * text.correctBubbles.length)], 1600)

    // Giọng: từ đang ôn -> nghĩa tiếng Việt -> (lời khen); xong thì sang câu sau
    const steps: SpeechStep[] = [
      { kind: 'word', word: item.word, pauseAfterMs: 150 },
      { kind: 'meaning', word: item.word },
    ]
    if (result.praise) steps.push({ kind: 'line', id: result.praise.id, text: result.praise.text })
    const startedAt = performance.now()
    void speakSequence(steps).then(() => {
      const waited = performance.now() - startedAt
      later(goNext, Math.max(TIMING.afterSpeechPause, TIMING.minCorrectHold - waited))
    })
  }

  // Phím 1–8 chọn lọ sơn (use-game-keys chỉ lo 1–4 nên phần số tự làm ở đây)
  const pickColourRef = useRef(pickColour)
  pickColourRef.current = pickColour
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      if (!/^[1-9]$/.test(event.key)) return
      const paint = question.palette[Number(event.key) - 1]
      if (!paint) return
      event.preventDefault()
      pickColourRef.current(paint)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [question.palette])

  useGameKeys({
    onReplay: () => replay('normal'),
    onEnter: () => phase === 'correct' && goNext(),
  })

  const showCommand = !hideText || phase === 'correct' || hint.step === 'clue' || revealed
  const showVietnamese = (hint.step === 'clue' || revealed) && phase === 'asking'

  return (
    <main className="cc-stage">
      {/* ---------- lệnh ---------- */}
      <section className="cc-command" aria-label={text.listenCommand}>
        <button
          type="button"
          className={['cc-listen', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={() => replay('normal')}
          aria-label={text.listenAgain}
          title={text.listenAgain}
        >
          <span className="cc-listen__ring" aria-hidden />
          <Icon name="volume" size={38} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          className={['cc-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={() => replay('slow')}
          aria-label={text.listenSlow}
          title={text.listenSlow}
        >
          <Icon name="turtle" size={26} strokeWidth={2.2} />
        </button>
        <div className="cc-command__text" aria-live="polite">
          {showCommand ? (
            // bấm vào câu lệnh = nghe lại (giống nút loa)
            <p className={['cc-command__en', 'kz-say-text', phase === 'correct' && 'is-solved'].filter(Boolean).join(' ')} onClick={() => replay('normal')} title={text.listenAgain}>
              {question.commandEn}
            </p>
          ) : (
            <p className="cc-command__hidden">
              <span className="cc-command__dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              {text.hiddenPrompt}
            </p>
          )}
          {showVietnamese ? (
            <p className="cc-command__vi" key="vi">
              <Icon name="hint" size={18} /> {question.commandVi}
            </p>
          ) : phase === 'correct' ? (
            <p className="cc-command__meaning" key="meaning">
              <b>{item.word.word}</b> · {item.word.meaningVi}
            </p>
          ) : (
            <p className="cc-command__instruction">{text.instruction}</p>
          )}
        </div>
      </section>

      <div className="cc-board">
        {/* ---------- tranh ---------- */}
        <section className="cc-scene-frame" aria-label={text.sceneLabel}>
          <ColourScene
            question={question}
            painted={painted}
            eliminated={hint.eliminatedThings}
            wrongKey={wrongThing}
            revealTargets={revealed && phase === 'asking'}
            locked={phase === 'correct'}
            brush={phase === 'asking' ? brush : null}
            burstKey={burstKey}
            labelFor={(thing) => text.thingLabel(thing.label)}
            onTapThing={tapThing}
          />
        </section>

        {/* ---------- khay màu ---------- */}
        <section className={['cc-tray', revealed && phase === 'asking' && 'is-revealing'].filter(Boolean).join(' ')} aria-label={text.trayLabel} ref={trayRef}>
          {question.palette.map((paint, index) => {
            const isEliminated = hint.eliminatedColours.includes(paint.wordId)
            const isRight = paint.wordId === question.colour.wordId
            const classes = [
              'cc-pot',
              brush?.wordId === paint.wordId && 'is-picked',
              isEliminated && 'is-eliminated',
              wrongColour === paint.wordId && 'is-wrong',
              revealed && isRight && phase === 'asking' && 'is-revealed',
              paint.blend === 'screen' && 'is-light',
            ]
            return (
              <button
                key={paint.wordId}
                type="button"
                className={classes.filter(Boolean).join(' ')}
                style={{ '--cc-swatch': paint.swatch, '--i': index } as CSSProperties}
                onClick={() => pickColour(paint)}
                disabled={phase !== 'asking' || isEliminated || (revealed && !isRight)}
                aria-pressed={brush?.wordId === paint.wordId}
                aria-label={paint.word.word}
                data-answer={import.meta.env.DEV && isRight ? 'true' : undefined}
              >
                <span className="cc-pot__blob" aria-hidden>
                  {brush?.wordId === paint.wordId && <Icon name="check" size={24} strokeWidth={3.2} />}
                </span>
                <span className="cc-pot__name">{paint.word.word}</span>
                <Kbd className="cc-pot__key">{index + 1}</Kbd>
              </button>
            )
          })}
        </section>
      </div>

      {/* ---------- sau khi đúng: nút Tiếp (tự sang câu sau khi đọc xong) ---------- */}
      <div className="cc-next">
        {phase === 'correct' && (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="cc-next__btn">
            {text.next}
          </Button>
        )}
      </div>
    </main>
  )
}
