/**
 * StoryScene.tsx — 1 CẢNH TRUYỆN: khung truyện tranh + lời kể có giọng + 1 câu hỏi để đi tiếp
 * ----------------------------------------------------------------------------
 * Nhịp 1 cảnh:
 *   1. Khung truyện bay vào; 0,45 giây sau Ki đọc lời kể tiếng Anh, chữ tô đậm dần theo giọng.
 *      Lời kể ≤ 15 giây, LUÔN có "Bỏ qua" (luật 27). Nút "Dịch" hiện + đọc bản tiếng Việt.
 *   2. Đọc xong (hoặc bấm Bỏ qua) -> câu hỏi trượt lên, đọc câu hỏi. 3 đáp án (đã xáo), phím 1–3,
 *      mỗi đáp án có loa nhỏ để nghe. Lời kể vẫn nằm trong khung để bé đọc lại.
 *   3. Đúng -> đáp án sáng vàng ✓ + bùng sao, đọc đáp án + nghĩa từ; nút "Đi tiếp".
 *      Sai -> thang gợi ý của động cơ (hint-ladder.ts): sai 1 = đáp án mờ đi + đọc lại truyện;
 *      sai 2 (chỉ còn 1 đáp án) = chỉ vào đáp án đúng + hiện tiếng Việt; câu quay lại cuối chương ("Nhớ lại").
 * Cảnh "Nhớ lại" (quay lại cuối chương): không đọc lại lời kể, vào câu hỏi luôn.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { KidsStoryChapter } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { KidsMascot } from '../../game-engine/components/KidsMascot'
import { KidsPicture } from '../../game-engine/components/KidsPicture'
import type { MascotReaction } from '../../game-engine/components/MascotCorner'
import { useMascotReaction } from '../../game-engine/components/MascotCorner'
import { hintAfterCorrectPick, hintAfterWrongPick, initialHintState, type HintLadderState } from '../../game-engine/hint-ladder'
import { speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import { shuffle } from '../../game-engine/round-builder'
import { useGameKeys } from '../../game-engine/use-game-keys'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { usePatrolText } from './patrol-text'
import type { StoryScene as StorySceneData } from './story-plan'
import { useStoryNarration } from './use-story-narration'

const TIMING = {
  narrationStart: 450, // khung truyện bay vào xong mới đọc
  replayAfterWrong: 420,
  // QA: Enter 2 lần liền ở "Đi tiếp" -> lần 2 rơi vào cảnh mới và bỏ qua luôn lời kể.
  // Trong chừng này ms đầu cảnh, Enter không bỏ qua lời kể.
  enterGuard: 700,
}

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export interface StorySceneProps {
  chapter: KidsStoryChapter
  scene: StorySceneData
  sceneIndex: number
  item: RoundItem
  session: RoundSession
  /** câu quay lại cuối chương (bé đã phải xem đáp án lần trước) */
  isRecap: boolean
  /** độ khó 1: hiện sẵn bản dịch tiếng Việt */
  showTranslationByDefault: boolean
  reaction: MascotReaction
  onReact: MascotReact
  outfitId?: string
  /** câu cuối cùng của chương đã xong -> sang màn huy hiệu (thay cho session.advance) */
  onChapterComplete: () => void
}

export function StoryScene({
  chapter,
  scene,
  sceneIndex,
  item,
  session,
  isRecap,
  showTranslationByDefault,
  reaction,
  onReact,
  outfitId,
  onChapterComplete,
}: StorySceneProps) {
  const text = usePatrolText()
  const reduceMotion = useReducedMotion()
  const narration = useStoryNarration()

  const narrationEn = fillMascotName(scene.narrationEn)
  const narrationVi = fillMascotName(scene.narrationVi)
  const promptEn = fillMascotName(scene.question.promptEn)
  const promptVi = fillMascotName(scene.question.promptVi)
  const narrationLineId = `${chapter.id}.scenes.${sceneIndex}.narration`

  // Đáp án: xáo 1 lần khi cảnh hiện ra (nội dung đặt đáp án đúng ở nhiều vị trí, vẫn xáo thêm)
  const [options] = useState<Option[]>(() =>
    shuffle(
      scene.question.options.map((option, index) => ({ id: `o${index}`, text: fillMascotName(option), isCorrect: index === scene.question.correctIndex })),
    ),
  )
  const correctOption = options.find((option) => option.isCorrect)!
  const [phase, setPhase] = useState<'story' | 'question' | 'correct'>(isRecap ? 'question' : 'story')
  const [hint, setHint] = useState<HintLadderState>(initialHintState)
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [showTranslation, setShowTranslation] = useState(showTranslationByDefault)
  const [isLast, setIsLast] = useState(false)

  const shownAt = useRef(performance.now())
  /** lúc cảnh hiện ra (khác shownAt: shownAt đặt lại khi sang câu hỏi) — dùng chặn Enter đúp */
  const mountedAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  /** Đọc câu hỏi (sau lời kể). */
  const readPrompt = () => void speakSequence([{ kind: 'sentence', text: promptEn }])

  /** Hết lời kể (đọc xong / Bỏ qua) -> hiện câu hỏi. */
  const toQuestion = () => {
    setPhase((current) => (current === 'story' ? 'question' : current))
    shownAt.current = performance.now()
  }

  // Cảnh hiện ra: đọc lời kể (cảnh "Nhớ lại": đọc câu hỏi luôn). Rời cảnh: dừng hết.
  const startRef = useRef(() => {
    if (isRecap) {
      readPrompt()
      return
    }
    void narration.play({ text: narrationEn, lang: 'en' }).then(() => {
      if (advanced.current) return
      setPhase((current) => {
        if (current === 'story') {
          readPrompt()
          return 'question'
        }
        return current
      })
    })
  })
  useEffect(() => {
    const pending = timers.current
    pending.push(window.setTimeout(() => startRef.current(), reduceMotion ? 150 : TIMING.narrationStart))
    return () => {
      pending.forEach(window.clearTimeout)
      stopVoice()
    }
  }, [reduceMotion])

  const skipNarration = () => {
    if (phase !== 'story') return
    narration.stop()
    toQuestion()
    readPrompt()
  }

  const replayStory = (slow = false) => {
    if (phase === 'question') usedReplay.current = true
    void narration.play({ text: narrationEn, lang: 'en', slow })
  }

  const toggleTranslation = () => {
    const next = !showTranslation
    setShowTranslation(next)
    if (next) void narration.play({ text: narrationVi, lang: 'vi', lineId: narrationLineId })
  }

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    stopVoice()
    if (isLast) onChapterComplete()
    else session.advance()
  }

  const choose = (option: Option) => {
    if (phase !== 'question' || hint.eliminated.includes(option.id)) return
    narration.stop()

    /* ---------- ĐÚNG ---------- */
    if (option.isCorrect) {
      const solved = hintAfterCorrectPick(hint)
      setHint(solved)
      setPhase('correct')
      ;(document.activeElement as HTMLElement | null)?.blur?.()
      playSound('correct')
      const feedback = session.completeItem({
        wrongCount: solved.wrongCount,
        revealed: solved.step === 'reveal',
        responseMs: performance.now() - shownAt.current,
        usedReplay: usedReplay.current,
      })
      // câu cuối của chương (và không phải quay lại) -> "Đi tiếp" sẽ mở màn huy hiệu
      setIsLast(!feedback.comesBack && session.doneCount + 1 >= session.totalCount)
      if (feedback.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
      else if (feedback.praise) onReact('happy', feedback.praise.text, 4200)
      else onReact('happy', text.correctBubbles[Math.floor(Math.random() * text.correctBubbles.length)], 1800)

      const steps: SpeechStep[] = [{ kind: 'word', word: option.text, pauseAfterMs: 150 }]
      if (item.word.meaningVi) steps.push({ kind: 'meaning', word: item.word })
      if (feedback.praise) steps.push({ kind: 'line', id: feedback.praise.id, text: feedback.praise.text })
      void speakSequence(steps)
      return
    }

    /* ---------- SAI: lên 1 bậc thang gợi ý ---------- */
    const next = hintAfterWrongPick(
      hint,
      option.id,
      options.map((o) => o.id),
      correctOption.id,
    )
    setHint(next)
    setWrongId(option.id)
    later(() => setWrongId(null), 450) // lắc xong thì bỏ màu cam (đáp án vẫn mờ vì đã bị loại)
    playSound('oops')
    if (next.step === 'replay') {
      onReact('comfort', voiceLine('kids-vl-hint1-story'), 3000)
      later(() => replayStory(), TIMING.replayAfterWrong)
    } else {
      // 3 đáp án: sai lần 2 là chỉ còn 1 -> hiện đáp án + bản dịch; bé tự bấm lại
      setShowTranslation(true)
      onReact('comfort', voiceLine('kids-vl-hint3-show'), 3600)
      later(() => void speakSequence([{ kind: 'word', word: correctOption.text }]), TIMING.replayAfterWrong)
    }
  }

  useGameKeys({
    onChoice: (index) => options[index] && choose(options[index]),
    onReplay: () => (phase === 'story' ? replayStory() : readPrompt()),
    onEnter: () =>
      phase === 'story' ? (performance.now() - mountedAt.current >= TIMING.enterGuard ? skipNarration() : undefined) : phase === 'correct' ? goNext() : undefined,
  })

  const revealed = hint.step === 'reveal'
  const narrationWords = narrationEn.split(/\s+/)
  const viWords = narrationVi.split(/\s+/)
  const playingLang = narration.playing?.lang ?? null
  // QA: "mọi chữ tiếng Anh bấm vào nghe được" — hết lời kể (đang hỏi / đã đúng) thì bấm 1 từ trong truyện
  // là nghe từ đó. Trong lúc đang kể thì không (bấm sẽ cắt ngang lời kể).
  const canTapWords = phase !== 'story' && !narration.playing
  const sayTappedWord = (raw: string) => {
    const clean = raw.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '')
    if (clean) void speakSequence([{ kind: 'word', word: clean }])
  }

  return (
    <main className="pa-stage">
      <div className="pa-scene">
        {/* ---------- khung truyện tranh ---------- */}
        <article className={['pa-panel', isRecap && 'is-recap'].filter(Boolean).join(' ')}>
          <header className="pa-panel__head">
            <span className="pa-panel__tag">{isRecap ? text.recapLabel : text.sceneLabel(sceneIndex + 1, chapter.scenes.length)}</span>
            <span className="pa-panel__title">{fillMascotName(chapter.title.en)}</span>
          </header>
          <div className="pa-panel__art">
            <span className="pa-panel__burst" aria-hidden />
            <span className="pa-panel__picture">
              <KidsPicture slug={scene.image} word={correctOption.text} size={220} decorative />
            </span>
            <div className="pa-ki">
              <KidsMascot pose={reaction.pose} size={128} outfitId={outfitId} />
              {reaction.text && (
                <p className="kz-bubble pa-ki__bubble" key={reaction.id} aria-live="polite">
                  {reaction.text}
                </p>
              )}
            </div>
          </div>
          <div className={['pa-caption', hint.step === 'replay' && phase === 'question' && 'is-hinted'].filter(Boolean).join(' ')}>
            <p className="pa-caption__en" lang="en">
              {narrationWords.map((word, index) => (
                <span
                  key={index}
                  className={[(playingLang !== 'en' || index < narration.spokenWords) && 'is-spoken', canTapWords && 'kz-say-text'].filter(Boolean).join(' ') || undefined}
                  onClick={canTapWords ? () => sayTappedWord(word) : undefined}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
            {showTranslation && (
              <p className="pa-caption__vi">
                {viWords.map((word, index) => (
                  <span key={index} className={playingLang !== 'vi' || index < narration.spokenWords ? 'is-spoken' : undefined}>
                    {word}{' '}
                  </span>
                ))}
              </p>
            )}
            <div className="pa-caption__tools">
              <button
                type="button"
                className={['pa-tool', playingLang === 'en' && !narration.playing?.slow && 'is-playing'].filter(Boolean).join(' ')}
                onClick={() => replayStory()}
                aria-label={text.listenStory}
                title={text.listenStory}
              >
                <Icon name="volume" size={24} />
              </button>
              <button
                type="button"
                className={['pa-tool', narration.playing?.slow && 'is-playing'].filter(Boolean).join(' ')}
                onClick={() => replayStory(true)}
                aria-label={text.listenSlow}
                title={text.listenSlow}
              >
                <Icon name="turtle" size={24} />
              </button>
              <button type="button" className="kz-toggle pa-translate" aria-pressed={showTranslation} onClick={toggleTranslation}>
                {text.translate}
              </button>
            </div>
          </div>
        </article>

        {/* ---------- câu hỏi ---------- */}
        <section className="pa-quiz" aria-label={text.questionLabel}>
          {phase === 'story' ? (
            <div className="pa-wait kz-glass">
              <span className="pa-wait__dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <p className="pa-wait__text">{text.listeningStory}</p>
              <Button size="lg" variant="secondary" className="pa-skip" onClick={skipNarration} iconRight={<Kbd>Enter</Kbd>}>
                {text.skip}
              </Button>
              <p className="pa-wait__hint">{text.skipHint}</p>
            </div>
          ) : (
            <div className="pa-question kz-card">
              <div className="pa-question__prompt">
                <button type="button" className="pa-tool pa-tool--blue" onClick={readPrompt} aria-label={text.listenStory}>
                  <Icon name="volume" size={24} />
                </button>
                <div>
                  <p className="pa-question__en" lang="en">
                    {promptEn}
                  </p>
                  {(showTranslation || revealed) && <p className="pa-question__vi">{promptVi}</p>}
                </div>
              </div>
              <div className="pa-options">
                {options.map((option, index) => {
                  const eliminated = hint.eliminated.includes(option.id) || (revealed && !option.isCorrect)
                  const classes = [
                    'pa-option',
                    eliminated && 'is-eliminated',
                    wrongId === option.id && 'is-wrong',
                    phase === 'correct' && option.isCorrect && 'is-correct',
                    phase === 'correct' && !option.isCorrect && 'is-dismissed',
                    revealed && option.isCorrect && phase === 'question' && 'is-revealed',
                  ]
                  return (
                    <div key={option.id} className="pa-option-row" style={{ '--i': index } as CSSProperties}>
                      <button
                        type="button"
                        className={classes.filter(Boolean).join(' ')}
                        onClick={() => choose(option)}
                        disabled={eliminated || phase === 'correct'}
                        data-answer={import.meta.env.DEV && option.isCorrect ? 'true' : undefined}
                      >
                        <Kbd className="pa-option__key">{index + 1}</Kbd>
                        <span className="pa-option__text" lang="en">
                          {option.text}
                        </span>
                        {phase === 'correct' && option.isCorrect && (
                          <>
                            <span className="pa-option__check" aria-hidden>
                              <Icon name="check" size={22} strokeWidth={3.2} />
                            </span>
                            <CorrectBurst spread={0.6} />
                          </>
                        )}
                        {revealed && option.isCorrect && phase === 'question' && (
                          <span className="pa-option__pointer" aria-hidden>
                            <KidsPicture slug="backhand-index-pointing-down" word="here" size={44} decorative />
                          </span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="pa-option__hear"
                        onClick={() => void speakSequence([{ kind: 'word', word: option.text }])}
                        aria-label={text.hearOption(option.text)}
                        title={text.hearOption(option.text)}
                      >
                        <Icon name="volume" size={20} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      </div>

      <div className="pa-next">
        {phase === 'correct' && (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="pa-next__btn">
            {text.next}
          </Button>
        )}
      </div>
    </main>
  )
}
