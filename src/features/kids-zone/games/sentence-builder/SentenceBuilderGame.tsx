/**
 * SentenceBuilderGame.tsx — TRÒ 5 "GHÉP CÂU" (sentence-builder)
 * ----------------------------------------------------------------------------
 * Bé đọc câu tiếng Việt (+ tranh) -> bấm các khối chữ tiếng Anh theo đúng thứ tự để ghép thành câu.
 * Câu lấy từ mẫu câu Starters / Movers / Flyers (kids-sentences.ts) có chứa từ đang ôn
 * (xem sentence-pick.ts) — nên ghép câu cũng là 1 lần "gặp lại" từ cho Leitner.
 *
 * Nhịp 1 câu:
 *   0 ms     tranh + câu tiếng Việt hiện ra, các khối chữ bay vào lần lượt
 *   BẤM ĐÚNG KHỐI: ngay lập tức khối bay vào chỗ trống kế tiếp và chuyển CAM (màu Corgi)
 *                  + 1 nốt nhạc (khối sau cao hơn khối trước).
 *   ĐỦ KHỐI: cả câu sáng lên, tô màu theo loại từ (danh từ / động từ / tính từ — word-class.ts),
 *            giọng đọc cả câu (+ lời khen), rồi tự sang câu sau (Enter / "Tiếp" để đi nhanh).
 *            Bấm vào từng khối trong câu để nghe từ đó.
 *   BẤM SAI KHỐI: khối lắc nhẹ màu cam san hô rồi nằm lại khay (không buzzer, không X đỏ).
 *            Thang gợi ý 3 bậc tính cho CẢ CÂU:
 *              Sai 1: thẻ câu tiếng Việt nhấp nháy — "Đọc lại nghĩa tiếng Việt nhé"
 *              Sai 2: khối đúng tiếp theo tự bay vào chỗ
 *              Sai 3: hiện cả câu mờ trong các chỗ trống + đọc câu; bé ghép lại theo; câu quay lại cuối lượt.
 *            Đang ở bậc 3 thì bấm nhầm không tính -> KHÔNG BAO GIỜ có lần sai thứ 4.
 *
 * Vì sao lúc đang ghép không có nút "nghe cả câu": nghe câu là lộ đáp án (thứ tự từ).
 * Nút nghe (+ 🐢) và phím R có ngay khi xong câu hoặc khi được xem đáp án (bậc 3).
 * Phím: 1–9 (0 = khối thứ 10) chọn khối trong khay · Enter / Space = Tiếp (khi xong) · R = nghe lại câu.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { kidsSentenceKey } from '../../../../services/audio-clip-keys'
import { preloadClips } from '../../../../services/text-to-speech'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { KidsPicture, preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import type { HintStep } from '../../game-engine/hint-ladder'
import { sayWord, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playLetterNote, playSound } from '../../game-engine/kids-sounds'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { hasPicture, topicOfWord } from '../../kids-data/kids-word-bank'
import { useKidsText } from '../../kids-text'
import { buildSentenceTask, chooseSentence, sameBlockText, type SentenceBlock, type SentenceTask } from './sentence-pick'
import { useSentenceBuilderText } from './sentence-builder-text'
import type { WordClass } from './word-class'
import './sentence-builder.css'

/** Thời điểm (ms) — gom 1 chỗ cho dễ chỉnh nhịp */
const TIMING = {
  autoPlaceAfterWrong: 420, // bậc 2: chờ khối sai lắc xong mới cho khối đúng bay vào
  readAfterReveal: 420, // bậc 3: chờ chút rồi đọc câu
  minCorrectHold: 2600, // câu tô màu hiện ít nhất chừng này (để bé kịp nhìn màu loại từ)
  afterSpeechPause: 1100,
}

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function SentenceBuilderGame({ session, onExit }: KidsGameProps) {
  const kidsText = useKidsText()
  const { kids } = useKidsData()
  const mascot = useMascotReaction('reading')
  // các câu đã dùng trong lượt -> từ gặp lại thì chọn câu khác
  const usedSentenceIds = useRef<string[]>([])

  useEffect(() => {
    preloadWordImages(session.plan.items.map((item) => item.word.image).filter(Boolean))
  }, [session.plan])

  const { react } = mascot
  useEffect(() => {
    react('reading', voiceLine('kids-vl-instr-sentence-meaning'), 3400)
  }, [react])

  const item = session.current
  return (
    <div className="kz-game-screen sb-screen">
      <GameTopBar doneCount={session.doneCount} totalCount={session.totalCount} firstTryStreak={session.firstTryStreak} onExit={onExit} />
      {item && session.stage === 'question' ? (
        <SentenceQuestion
          key={item.key}
          item={item}
          session={session}
          level={session.plan.difficulty.level}
          usedSentenceIds={usedSentenceIds.current}
          onSentenceChosen={(id) => {
            if (!usedSentenceIds.current.includes(id)) usedSentenceIds.current.push(id)
          }}
          onReact={mascot.react}
          correctBubbles={kidsText.correctBubbles}
        />
      ) : (
        <main className="kz-game-stage" aria-hidden />
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
  level: 1 | 2 | 3
  usedSentenceIds: string[]
  onSentenceChosen: (id: string) => void
  onReact: MascotReact
  correctBubbles: string[]
}

const WORD_CLASS_ORDER: WordClass[] = ['noun', 'verb', 'adjective']

function SentenceQuestion({ item, session, level, usedSentenceIds, onSentenceChosen, onReact, correctBubbles }: QuestionProps) {
  const kidsText = useKidsText()
  const text = useSentenceBuilderText()
  const target: KidsWord = item.word

  // Chọn câu + cắt khối: 1 lần khi câu hiện ra
  const [task] = useState<SentenceTask>(() => buildSentenceTask(chooseSentence(target, level, usedSentenceIds), level))
  const slots = task.slots

  /** id các khối đã đặt đúng, theo thứ tự trong câu */
  const [placedIds, setPlacedIds] = useState<string[]>([])
  const [wrongCount, setWrongCount] = useState(0)
  const [step, setStep] = useState<HintStep>('none')
  const [wrongTap, setWrongTap] = useState<{ blockId: string; n: number; counted: boolean } | null>(null)
  /** khối do gợi ý bậc 2 tự đặt (viền vàng) */
  const [autoPlacedId, setAutoPlacedId] = useState<string | null>(null)
  /** bậc 1: thẻ tiếng Việt nhấp nháy (đổi số -> chạy lại hiệu ứng) */
  const [meaningPulse, setMeaningPulse] = useState(0)
  const [phase, setPhase] = useState<'asking' | 'correct'>('asking')
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)

  const shownAt = useRef(performance.now())
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  /** bậc 2: đang chờ khối gợi ý tự bay vào -> tạm không nhận bấm (tránh 2 khối vào cùng 1 chỗ) */
  const autoPlacing = useRef(false)

  // Báo câu đã chọn cho lượt (để lần sau tránh) + tải trước file đọc câu
  useEffect(() => {
    onSentenceChosen(task.choice.id)
    void preloadClips([kidsSentenceKey(task.choice.en)])
    const pending = timers.current
    return () => {
      pending.forEach(window.clearTimeout)
      stopVoice()
    }
    // [] = chạy 1 lần khi câu hiện ra (task cố định suốt câu)
  }, [])

  const goNext = () => {
    if (advanced.current) return
    advanced.current = true
    stopVoice()
    session.advance()
  }

  const playSentence = (mode: 'normal' | 'slow' = 'normal', extra: SpeechStep[] = []) => {
    setPlaying(mode)
    return speakSequence([{ kind: 'sentence', text: task.choice.en, slow: mode === 'slow', pauseAfterMs: extra.length ? 250 : 0 }, ...extra]).then(() =>
      setPlaying((current) => (current === mode ? null : current)),
    )
  }

  /** Khối còn trong khay khớp với chỗ trống thứ `index` (ưu tiên khối viết y hệt, VD "The" cho chỗ "The") */
  const freeBlockFor = (index: number, placed: string[] = placedIds): SentenceBlock | undefined => {
    const slot = slots[index]
    if (!slot) return undefined
    const free = task.blocks.filter((block) => !block.isDistractor && !placed.includes(block.id) && sameBlockText(block.text, slot.text))
    return free.find((block) => block.text === slot.text) ?? free[0]
  }

  /** Đặt 1 khối đúng vào chỗ kế tiếp; đủ câu thì kết thúc */
  const placeBlock = (block: SentenceBlock, placed: string[], counts: { wrongCount: number; step: HintStep }) => {
    const next = [...placed, block.id]
    setPlacedIds(next)
    setWrongTap(null)
    playLetterNote(placed.length + 2)
    if (next.length === slots.length) finishSentence(counts)
  }

  /* ---------- bấm 1 khối trong khay ---------- */
  const pickBlock = (block: SentenceBlock) => {
    if (phase !== 'asking' || placedIds.includes(block.id) || autoPlacing.current) return
    const slot = slots[placedIds.length]
    if (!slot) return

    if (!block.isDistractor && sameBlockText(block.text, slot.text)) {
      placeBlock(block, placedIds, { wrongCount, step })
      return
    }

    /* SAI */
    if (step === 'reveal') {
      setWrongTap((previous) => ({ blockId: block.id, n: (previous?.n ?? 0) + 1, counted: false }))
      return
    }
    const nextWrong = wrongCount + 1
    const nextStep: HintStep = nextWrong >= 3 ? 'reveal' : nextWrong === 2 ? 'clue' : 'replay'
    setWrongCount(nextWrong)
    setStep(nextStep)
    setWrongTap((previous) => ({ blockId: block.id, n: (previous?.n ?? 0) + 1, counted: true }))
    playSound('oops')

    if (nextStep === 'replay') {
      setMeaningPulse((n) => n + 1)
      onReact('comfort', voiceLine('kids-vl-hint1-sentence'), 3000)
    } else if (nextStep === 'clue') {
      // khối đúng tiếp theo tự bay vào chỗ
      const placedNow = placedIds
      onReact('thinking', placedNow.length === 0 ? voiceLine('kids-vl-hint2-sentence') : text.hintNextBlock, 3200)
      autoPlacing.current = true
      later(() => {
        autoPlacing.current = false
        const helper = freeBlockFor(placedNow.length, placedNow)
        if (!helper) return
        setAutoPlacedId(helper.id)
        placeBlock(helper, placedNow, { wrongCount: nextWrong, step: nextStep })
      }, TIMING.autoPlaceAfterWrong)
    } else {
      onReact('comfort', voiceLine('kids-vl-hint3-sentence'), 3600)
      later(() => void playSentence('slow'), TIMING.readAfterReveal)
    }
  }

  /* ---------- đủ câu: báo động cơ, tô màu loại từ, đọc câu ---------- */
  const finishSentence = (counts: { wrongCount: number; step: HintStep }) => {
    setPhase('correct')
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    playSound('correct')
    const result = session.completeItem({
      wrongCount: counts.wrongCount,
      revealed: counts.step === 'reveal',
      responseMs: performance.now() - shownAt.current,
    })
    if (result.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
    else if (result.praise) onReact('happy', result.praise.text, 4200)
    else onReact('happy', correctBubbles[Math.floor(Math.random() * correctBubbles.length)], 1600)

    const extra: SpeechStep[] = result.praise ? [{ kind: 'line', id: result.praise.id, text: result.praise.text }] : []
    const startedAt = performance.now()
    void playSentence('normal', extra).then(() => {
      const waited = performance.now() - startedAt
      later(goNext, Math.max(TIMING.afterSpeechPause, TIMING.minCorrectHold - waited))
    })
  }

  /* ---------- bàn phím ---------- */
  const solved = phase === 'correct'
  const revealed = step === 'reveal' && !solved
  const canListen = solved || revealed
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {})
  keyHandler.current = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
    const focused = event.target as HTMLElement | null
    if (focused && (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA' || focused.isContentEditable)) return
    if (/^[0-9]$/.test(event.key)) {
      const index = event.key === '0' ? 9 : Number(event.key) - 1
      const block = task.blocks[index]
      if (block) {
        event.preventDefault()
        pickBlock(block)
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      if (focused?.tagName === 'BUTTON') return
      if (solved) {
        event.preventDefault()
        goNext()
      }
    } else if ((event.key === 'r' || event.key === 'R') && canListen) {
      event.preventDefault()
      void playSentence('normal')
    }
  }
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => keyHandler.current(event)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ---------- vẽ ---------- */
  const nextBlockId = !solved ? freeBlockFor(placedIds.length)?.id : undefined
  const classesInSentence = useMemo(() => WORD_CLASS_ORDER.filter((wc) => slots.some((slot) => slot.wordClass === wc)), [slots])
  // tranh: ảnh của từ; từ không có ảnh thì dùng ảnh đại diện chủ đề
  const pictureSlug = hasPicture(target) ? target.image : (topicOfWord(target.id)?.image ?? '')

  return (
    <main className={['kz-game-stage', 'sb-stage', solved && 'is-solved'].filter(Boolean).join(' ')}>
      {/* ---------- đề bài: tranh + câu tiếng Việt ---------- */}
      <section className="sb-prompt">
        <div className="sb-picture">{pictureSlug && <KidsPicture slug={pictureSlug} word={target.word} size={150} decorative />}</div>
        <div key={meaningPulse} className={['sb-meaning', meaningPulse > 0 && !solved && 'is-pulsing'].filter(Boolean).join(' ')}>
          <span className="sb-meaning__label">{text.promptLabel}</span>
          <p className="sb-meaning__text">{task.choice.vi}</p>
        </div>
      </section>

      {/* ---------- câu đang ghép ---------- */}
      <section className={['sb-answer', solved && 'is-solved'].filter(Boolean).join(' ')} aria-label={text.answerLabel} aria-live="polite">
        {slots.map((slot, index) => {
          const placedId = placedIds[index]
          const placedBlock = placedId ? task.blocks.find((b) => b.id === placedId) : undefined
          const isNext = index === placedIds.length && !solved
          if (placedBlock) {
            return (
              <button
                key={index}
                type="button"
                className={[
                  'sb-word',
                  solved && `sb-word--${slot.wordClass}`,
                  autoPlacedId === placedBlock.id && !solved && 'is-helped',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--i': index } as CSSProperties}
                onClick={() => void sayWord(slot.text)}
                title={text.tapToHear}
              >
                {/* hiện đúng chữ của câu (VD đặt khối "the" vào đầu câu thì hiện "The") */}
                {slot.text}
              </button>
            )
          }
          return (
            <span
              key={index}
              className={['sb-gap', isNext && 'is-next', revealed && 'is-ghost'].filter(Boolean).join(' ')}
              style={{ '--len': slot.text.length } as CSSProperties}
            >
              {revealed ? slot.text : ''}
            </span>
          )
        })}
        {solved && <CorrectBurst spread={1.1} />}
      </section>

      {/* ---------- sau khi xong: loại từ + nút nghe ---------- */}
      <div className="sb-after">
        {canListen && (
          <div className="sb-listen-row">
            <button
              type="button"
              className={['sb-listen', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
              onClick={() => void playSentence('normal')}
              aria-label={text.listenSentence}
              title={`${text.listenSentence} (R)`}
            >
              <Icon name="volume" size={30} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              className={['sb-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
              onClick={() => void playSentence('slow')}
              aria-label={text.listenSlow}
              title={text.listenSlow}
            >
              <Icon name="turtle" size={24} strokeWidth={2.2} />
            </button>
          </div>
        )}
        {solved && classesInSentence.length > 0 && (
          <ul className="sb-legend" aria-label={text.wordClassHint}>
            {classesInSentence.map((wordClass) => (
              <li key={wordClass} className={`sb-legend__item sb-legend__item--${wordClass}`}>
                {text.wordClass[wordClass]}
              </li>
            ))}
          </ul>
        )}
        {!canListen && <p className="sb-instruction">{text.instruction}</p>}
      </div>

      {/* ---------- khay khối chữ ---------- */}
      <section className={['sb-pool', solved && 'is-solved'].filter(Boolean).join(' ')} aria-label={text.poolLabel}>
        {task.blocks.map((block, index) => {
          const used = placedIds.includes(block.id)
          const isWrong = wrongTap?.blockId === block.id
          return (
            <button
              key={block.id}
              type="button"
              className={[
                'sb-block',
                used && 'is-used',
                isWrong && (wrongTap!.counted ? 'is-wrong' : 'is-nudge'),
                revealed && block.id === nextBlockId && 'is-glow',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--i': index, '--len': block.text.length } as CSSProperties}
              onClick={() => pickBlock(block)}
              disabled={used || solved}
              aria-label={text.blockLabel(index + 1, block.text)}
              // chỉ khi npm run dev: đánh dấu khối cần bấm tiếp theo cho script kiểm thử tự động (QA)
              data-answer={import.meta.env.DEV && block.id === nextBlockId ? 'true' : undefined}
            >
              {/* key đổi mỗi lần bấm nhầm -> mặt khối được tạo lại -> hiệu ứng lắc chạy lại */}
              <span key={isWrong ? wrongTap!.n : 0} className="sb-block__face">
                {index < 10 && <Kbd className="sb-block__key">{index === 9 ? 0 : index + 1}</Kbd>}
                <span className="sb-block__text">{used ? '' : block.text}</span>
              </span>
            </button>
          )
        })}
      </section>

      <div className="sb-next">
        {solved && (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="sb-next__btn">
            {kidsText.next}
          </Button>
        )}
      </div>
    </main>
  )
}
