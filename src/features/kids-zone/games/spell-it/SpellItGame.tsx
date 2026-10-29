/**
 * SpellItGame.tsx — TRÒ 3 "XẾP CHỮ THÀNH TỪ" (spell-it)
 * ----------------------------------------------------------------------------
 * Bé nhìn ảnh 3D (từ không có ảnh thì nhìn nghĩa tiếng Việt) + nghe từ
 * -> bấm các ô chữ cái theo đúng thứ tự để lấp đầy "khuôn chữ".
 *
 * Nhịp 1 câu:
 *   0 ms     khuôn + khay chữ bay vào; câu đầu lượt Ki đọc hướng dẫn trước
 *   380 ms   tự đọc từ (nút loa to có sóng âm trong lúc đọc)
 *   BẤM ĐÚNG CHỮ: ngay lập tức chữ "bay" vào ô kế tiếp, ô chuyển xanh lá + 1 nốt nhạc
 *                 (chữ thứ i kêu nốt thứ i -> cả từ như 1 câu nhạc đi lên) + đọc tên chữ cái.
 *   ĐỦ CHỮ: khuôn sáng vàng lần lượt từng ô + bùng sao + "ting"; đọc từ + nghĩa (+ lời khen),
 *           rồi tự sang câu sau (Enter / "Tiếp" để đi nhanh).
 *   BẤM SAI CHỮ: ô chữ lắc nhẹ màu cam san hô (không buzzer, không X đỏ, chữ vẫn ở khay vì có thể
 *           cần cho ô sau). Thang gợi ý 3 bậc tính cho CẢ TỪ:
 *             Sai 1: đọc lại từ thật chậm
 *             Sai 2: chữ tiếp theo hiện mờ trong khuôn + ô chữ đó sáng lên
 *             Sai 3: hiện cả cách viết trong khuôn, bé bấm lại từng chữ; từ quay lại cuối lượt.
 *           Đang ở bậc 3 thì bấm nhầm không tính nữa -> KHÔNG BAO GIỜ có lần sai thứ 4.
 *
 * Phím: gõ chữ cái trên bàn phím = bấm ô chữ đó · Phím cách = nghe lại (khi đang làm) / Tiếp (khi xong)
 *       · Enter = Tiếp · Esc = thoát (vỏ lo).
 * Ngoại lệ có chủ ý: trò này KHÔNG dùng phím R để nghe lại như các trò khác, vì R là 1 chữ cái
 * bé cần gõ (VD "rabbit"). Nghe lại = phím cách hoặc nút loa / nút rùa.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { KidsPicture, preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import type { HintStep } from '../../game-engine/hint-ladder'
import { preloadWordAudio, sayWord, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playLetterNote, playSound } from '../../game-engine/kids-sounds'
import type { RoundItem } from '../../game-engine/engine-types'
import type { RoundSession } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { hasPicture } from '../../kids-data/kids-word-bank'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { useKidsText } from '../../kids-text'
import { buildMold, buildTiles, lettersToPlace, sameLetter, type LetterTile } from './spell-tiles'
import { useSpellItText } from './spell-it-text'
import './spell-it.css'

/** Thời điểm (ms) — gom 1 chỗ cho dễ chỉnh "nhịp" trò chơi (giống trò 1) */
const TIMING = {
  firstAutoPlay: 380, // chờ khuôn + khay chữ bay vào rồi mới đọc từ
  replayAfterWrong: 420, // sai -> chờ ô chữ lắc xong mới đọc lại
  minCorrectHold: 1300, // trạng thái "đúng" hiện ít nhất chừng này
  afterSpeechPause: 400, // đọc xong nghỉ chút rồi sang câu
}

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function SpellItGame({ session, onExit }: KidsGameProps) {
  const kidsText = useKidsText()
  const { kids } = useKidsData()
  const mascot = useMascotReaction('thinking')
  // Ki chỉ đọc hướng dẫn 1 lần mỗi lượt (ở câu đầu tiên)
  const instructionSaid = useRef(false)

  // Tải trước ảnh + tiếng của cả lượt -> câu nào hiện ra cũng có ảnh / tiếng ngay
  useEffect(() => {
    preloadWordImages(session.plan.items.map((item) => item.word.image).filter(Boolean))
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  const { react } = mascot
  useEffect(() => {
    react('thinking', voiceLine('kids-vl-instr-spell-it'), 3200)
  }, [react])

  const item = session.current
  return (
    <div className="kz-game-screen sp-screen">
      <GameTopBar doneCount={session.doneCount} totalCount={session.totalCount} firstTryStreak={session.firstTryStreak} onExit={onExit} />
      {item && session.stage === 'question' ? (
        <SpellQuestion
          key={item.key}
          item={item}
          session={session}
          level={session.plan.difficulty.level}
          withInstruction={!instructionSaid.current}
          onInstructionSaid={() => (instructionSaid.current = true)}
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

/* ============================ 1 câu: 1 từ cần xếp ============================ */

type MascotReact = ReturnType<typeof useMascotReaction>['react']

interface QuestionProps {
  item: RoundItem
  session: RoundSession
  level: 1 | 2 | 3
  /** câu đầu lượt: Ki đọc hướng dẫn trước khi đọc từ */
  withInstruction: boolean
  onInstructionSaid: () => void
  onReact: MascotReact
  correctBubbles: string[]
}

function SpellQuestion({ item, session, level, withInstruction, onInstructionSaid, onReact, correctBubbles }: QuestionProps) {
  const kidsText = useKidsText()
  const text = useSpellItText()
  const reduceMotion = useReducedMotion()
  const target: KidsWord = item.word

  // Khuôn + khay chữ: tính 1 lần khi câu hiện ra (không xáo lại khi vẽ lại)
  const mold = useMemo(() => buildMold(target.word), [target.word])
  const toPlace = useMemo(() => lettersToPlace(mold), [mold])
  const [tiles] = useState<LetterTile[]>(() => buildTiles(target.word, level))

  /** số chữ đã xếp đúng (= vị trí của chữ cần xếp tiếp theo trong toPlace) */
  const [placedCount, setPlacedCount] = useState(0)
  const [usedTileIds, setUsedTileIds] = useState<string[]>([])
  const [wrongCount, setWrongCount] = useState(0)
  const [step, setStep] = useState<HintStep>('none')
  /** bậc 2: chữ thứ mấy đang được gợi ý (hết gợi ý khi bé xếp xong chữ đó) */
  const [clueIndex, setClueIndex] = useState<number | null>(null)
  /** ô chữ vừa bấm nhầm -> lắc 1 lần (n tăng để lắc lại dù bấm nhầm đúng ô cũ) */
  const [wrongTap, setWrongTap] = useState<{ tileId: string; n: number; counted: boolean } | null>(null)
  const [phase, setPhase] = useState<'asking' | 'correct'>('asking')
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)

  const shownAt = useRef(performance.now())
  const usedReplay = useRef(false)
  const advanced = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))

  /** Đọc từ (bình thường / chậm); nút loa nhấp nháy trong lúc đọc */
  const playWord = (mode: 'normal' | 'slow' = 'normal', steps?: SpeechStep[]) => {
    setPlaying(mode)
    void speakSequence(steps ?? [{ kind: 'word', word: target, slow: mode === 'slow' }]).then(() =>
      setPlaying((current) => (current === mode ? null : current)),
    )
  }

  // Câu hiện ra -> tự đọc từ (câu đầu lượt: đọc hướng dẫn trước). Rời câu -> dừng hẹn giờ + giọng.
  const startRef = useRef(() => {
    if (withInstruction) {
      onInstructionSaid()
      playWord('normal', [
        { kind: 'line', id: 'kids-vl-instr-spell-it', text: voiceLine('kids-vl-instr-spell-it'), pauseAfterMs: 250 },
        { kind: 'word', word: target },
      ])
    } else playWord()
  })
  useEffect(() => {
    const pending = timers.current
    pending.push(window.setTimeout(() => startRef.current(), reduceMotion ? 150 : TIMING.firstAutoPlay))
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

  /** Ô chữ nên sáng lên cho chữ thứ `index` (ô chưa dùng, cùng chữ, ưu tiên ô không phải chữ nhiễu) */
  const tileForLetter = (index: number): LetterTile | undefined => {
    const wanted = toPlace[index]
    if (!wanted) return undefined
    const free = tiles.filter((tile) => !usedTileIds.includes(tile.id) && sameLetter(tile.letter, wanted.char))
    return free.find((tile) => !tile.isDistractor) ?? free[0]
  }

  /* ---------- bấm 1 ô chữ ---------- */
  const pickTile = (tile: LetterTile) => {
    if (phase !== 'asking' || usedTileIds.includes(tile.id)) return
    const wanted = toPlace[placedCount]
    if (!wanted) return

    /* ĐÚNG CHỮ: bay vào ô kế tiếp */
    if (sameLetter(tile.letter, wanted.char)) {
      const nextCount = placedCount + 1
      setUsedTileIds((ids) => [...ids, tile.id])
      setPlacedCount(nextCount)
      setWrongTap(null)
      playLetterNote(placedCount)
      if (nextCount < toPlace.length) {
        // tên chữ cái (VD "see" cho c) — phonics; đủ chữ thì để dành giọng cho cả từ
        void sayWord(tile.letter.toUpperCase())
        return
      }
      finishWord()
      return
    }

    /* SAI CHỮ */
    if (step === 'reveal') {
      // đang xem cách viết: bấm nhầm chỉ "khựng" nhẹ, không tính lỗi (không có lần sai thứ 4)
      setWrongTap((previous) => ({ tileId: tile.id, n: (previous?.n ?? 0) + 1, counted: false }))
      return
    }
    const nextWrong = wrongCount + 1
    const nextStep: HintStep = nextWrong >= 3 ? 'reveal' : nextWrong === 2 ? 'clue' : 'replay'
    setWrongCount(nextWrong)
    setStep(nextStep)
    setWrongTap((previous) => ({ tileId: tile.id, n: (previous?.n ?? 0) + 1, counted: true }))
    playSound('oops')
    if (nextStep === 'replay') {
      onReact('comfort', voiceLine('kids-vl-hint1-spell'), 2800)
      later(() => playWord('slow'), TIMING.replayAfterWrong)
    } else if (nextStep === 'clue') {
      setClueIndex(placedCount)
      onReact('thinking', voiceLine('kids-vl-hint2-spell'), 3200)
      later(() => playWord('slow'), TIMING.replayAfterWrong)
    } else {
      onReact('comfort', voiceLine('kids-vl-hint3-spell'), 3600)
      later(() => playWord('slow'), TIMING.replayAfterWrong)
    }
  }

  /* ---------- đủ chữ: báo động cơ, hiệu ứng đúng, đọc từ + nghĩa ---------- */
  const finishWord = () => {
    setPhase('correct')
    // bỏ focus khỏi ô vừa bấm -> phím Enter sau đó là "Tiếp"
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    playSound('correct')
    const result = session.completeItem({
      wrongCount,
      revealed: step === 'reveal',
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
    setPlaying('normal')
    void speakSequence(steps).then(() => {
      setPlaying(null)
      const waited = performance.now() - startedAt
      later(goNext, Math.max(TIMING.afterSpeechPause, TIMING.minCorrectHold - waited))
    })
  }

  /* ---------- bàn phím: gõ chữ cái · phím cách · Enter ---------- */
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {})
  keyHandler.current = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
    const focused = event.target as HTMLElement | null
    if (focused && (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA' || focused.isContentEditable)) return
    if (/^[a-z]$/i.test(event.key)) {
      if (phase !== 'asking') return
      // ưu tiên ô KHÔNG phải chữ nhiễu khi có 2 ô cùng chữ — bàn phím không phân biệt được
      const free = tiles.filter((tile) => !usedTileIds.includes(tile.id) && sameLetter(tile.letter, event.key))
      const tile = free.find((t) => !t.isDistractor) ?? free[0]
      if (tile) {
        event.preventDefault()
        pickTile(tile)
      }
      return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      // Enter / Space trên 1 nút đang focus -> để trình duyệt tự bấm nút đó
      if (focused?.tagName === 'BUTTON') return
      event.preventDefault()
      if (phase === 'correct') goNext()
      else if (event.key === ' ') replay('normal')
    }
  }
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => keyHandler.current(event)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ---------- vẽ ---------- */
  const solved = phase === 'correct'
  const revealed = step === 'reveal' && !solved
  const showClue = step === 'clue' && clueIndex !== null && clueIndex === placedCount && !solved
  // ô chữ đang được chỉ: bậc 2 (chữ tiếp theo) hoặc bậc 3 (luôn chỉ chữ tiếp theo)
  const glowTileId = !solved && (showClue || revealed) ? tileForLetter(placedCount)?.id : undefined
  // vị trí (trong mold) của ô cần điền tiếp theo
  const nextMoldIndex = toPlace[placedCount]?.index ?? -1
  const showPicture = hasPicture(target)
  const showMeaning = level < 3 || !showPicture || solved || revealed || step === 'clue'

  return (
    <main className={['kz-game-stage', 'sp-stage', solved && 'is-solved'].filter(Boolean).join(' ')}>
      {/* ---------- đề bài: ảnh (hoặc nghĩa) + nút nghe ---------- */}
      <section className="sp-prompt">
        <div className={['sp-picture', !showPicture && 'sp-picture--text', solved && 'is-solved'].filter(Boolean).join(' ')}>
          {showPicture ? (
            <KidsPicture slug={target.image} word={target.word} size={200} decorative />
          ) : (
            <span className="sp-picture__meaning">{target.meaningVi}</span>
          )}
          {solved && <CorrectBurst spread={0.8} />}
        </div>

        <div className="sp-prompt__side">
          <div className="sp-listen-row">
            <button
              type="button"
              className={['sp-listen', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
              onClick={() => replay('normal')}
              aria-label={kidsText.listenAgain}
              title={`${kidsText.listenAgain} (${text.listenKey})`}
            >
              <span className="sp-listen__ring" aria-hidden />
              <Icon name="volume" size={44} strokeWidth={2.4} />
            </button>
            <button
              type="button"
              className={['sp-slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
              onClick={() => replay('slow')}
              aria-label={kidsText.listenSlow}
              title={kidsText.listenSlow}
            >
              <Icon name="turtle" size={28} strokeWidth={2.2} />
            </button>
          </div>
          <div className="sp-subline" aria-live="polite">
            {showMeaning && showPicture ? (
              <span className={['sp-meaning', solved && 'is-solved'].filter(Boolean).join(' ')} key={solved ? 'solved' : 'asking'}>
                {target.meaningVi}
              </span>
            ) : (
              !showPicture && <span className="sp-instruction">{text.instruction}</span>
            )}
          </div>
          {showPicture && <p className={['sp-instruction', 'sp-instruction--small', solved && 'is-hidden'].filter(Boolean).join(' ')}>{text.instruction}</p>}
        </div>
      </section>

      {/* ---------- khuôn chữ ---------- */}
      <section
        className={['sp-mold', solved && 'is-solved', revealed && 'is-revealing'].filter(Boolean).join(' ')}
        style={{ '--count': mold.length } as CSSProperties}
        aria-label={text.moldLabel}
      >
        {mold.map((slot) => {
          if (slot.fixed) {
            return (
              <span key={slot.index} className={['sp-slot', 'sp-slot--fixed', slot.char === ' ' && 'sp-slot--space'].filter(Boolean).join(' ')} aria-hidden>
                {slot.char === ' ' ? '' : slot.char}
              </span>
            )
          }
          const order = toPlace.findIndex((s) => s.index === slot.index)
          const filled = order < placedCount
          const ghost = !filled && (revealed || (showClue && order === clueIndex))
          return (
            <span
              key={slot.index}
              className={[
                'sp-slot',
                filled && 'is-filled',
                !filled && slot.index === nextMoldIndex && !solved && 'is-next',
                ghost && 'is-ghost',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--i': order } as CSSProperties}
            >
              {filled || ghost ? slot.char : ''}
            </span>
          )
        })}
      </section>

      {/* ---------- khay chữ cái ---------- */}
      <section
        className={['sp-tiles', solved && 'is-solved'].filter(Boolean).join(' ')}
        // > 9 ô thì chia đều 2 hàng (VD 10 ô = 5 + 5), không để 1 ô lẻ loi ở hàng dưới
        style={{ '--cols': tiles.length <= 9 ? tiles.length : Math.ceil(tiles.length / 2) } as CSSProperties}
        aria-label={text.tilesLabel}
      >
        {tiles.map((tile, index) => {
          const used = usedTileIds.includes(tile.id)
          const isWrong = wrongTap?.tileId === tile.id
          return (
            <button
              key={tile.id}
              type="button"
              className={[
                'sp-tile',
                used && 'is-used',
                isWrong && (wrongTap!.counted ? 'is-wrong' : 'is-nudge'),
                glowTileId === tile.id && 'is-glow',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--i': index } as CSSProperties}
              onClick={() => pickTile(tile)}
              disabled={used || solved}
              aria-label={text.tileLabel(tile.letter)}
              // chỉ khi npm run dev: đánh dấu ô chữ cần bấm tiếp theo cho script kiểm thử tự động (QA)
              data-answer={import.meta.env.DEV && !used && tile.id === tileForLetter(placedCount)?.id ? 'true' : undefined}
            >
              {/* key đổi mỗi lần bấm nhầm -> mặt chữ được tạo lại -> hiệu ứng lắc chạy lại dù nhầm đúng ô cũ */}
              <span key={isWrong ? wrongTap!.n : 0} className="sp-tile__face">
                {tile.letter}
              </span>
            </button>
          )
        })}
      </section>
      {!solved && <p className="sp-type-hint">{text.typeHint}</p>}

      {/* ---------- sau khi đúng: nút Tiếp (tự sang câu sau khi đọc xong) ---------- */}
      <div className="sp-next">
        {solved && (
          <Button size="xl" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>} className="sp-next__btn">
            {kidsText.next}
          </Button>
        )}
      </div>
    </main>
  )
}
