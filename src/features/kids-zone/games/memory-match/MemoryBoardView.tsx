/**
 * MemoryBoardView.tsx — 1 BÀN LẬT THẺ (lưới thẻ + túi đồ bên phải)
 * ----------------------------------------------------------------------------
 * Nhận 1 bàn đã xếp sẵn (memory-board-plan.ts) và lo toàn bộ cách chơi trên bàn đó:
 *
 *   Lật thẻ 1  -> thẻ xoay ngửa (âm "flip"); thẻ CHỮ (mức 1–2) / thẻ LOA (mức 3) đọc từ lên.
 *   Lật thẻ 2  -> cùng cặp: ngay lập tức 2 thẻ viền vàng + "ting", đọc từ + nghĩa, rồi 2 thẻ BAY VÀO TÚI.
 *              -> khác cặp: giữ 1 giây cho bé nhìn rồi úp lại. Bấm thẻ thứ 3 thì úp ngay (chơi nhanh hơn).
 *
 * Thế nào là "sai" ở trò lật thẻ? Lật trúng 2 thẻ khác cặp lúc CHƯA BIẾT thẻ kia ở đâu là chuyện
 * bình thường của trò nhớ — không tính lỗi, không âm "oops". Chỉ tính lỗi khi bé lật thẻ X mà thẻ
 * cùng cặp với X ĐÃ TỪNG được lật trước đó (bé "lẽ ra nhận ra được") rồi lại chọn thẻ khác.
 * Lỗi tính riêng cho từng cặp, theo đúng thang gợi ý 3 bậc của động cơ:
 *   lỗi 1: Ki nhắc "thẻ cùng cặp bạn đã lật rồi" (2 thẻ loé cam san hô rồi úp lại)
 *   lỗi 2: thẻ cùng cặp sáng viền vàng (tới khi ghép xong)
 *   lỗi 3: cả 2 thẻ của cặp tự ngửa lên + phát sáng, bé bấm vào để ghép; từ đó quay lại cuối lượt
 *   -> không bao giờ có lỗi thứ 4 cho cùng 1 cặp.
 * Lật 6 lần liền không ghép được cặp nào -> Ki "lật hé" cả bàn 1,5 giây (1 lần / bàn), không tính gì.
 *
 * Phím: mũi tên = chọn thẻ · Enter / Space = lật thẻ đang chọn · R = nghe lại từ vừa lật · Enter = Tiếp (khi xong bàn).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useReducedMotion } from '../../../../design-system/use-reduced-motion'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { KidsPicture } from '../../game-engine/components/KidsPicture'
import type { useMascotReaction } from '../../game-engine/components/MascotCorner'
import { sayWord, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'
import { playSound } from '../../game-engine/kids-sounds'
import type { CompleteItemInput, ItemFeedback } from '../../game-engine/use-round-session'
import { useKidsText } from '../../kids-text'
import { partnerOf, type MemoryBoard, type MemoryCard, type MemoryPair } from './memory-board-plan'
import { useMemoryMatchText } from './memory-match-text'

/** Nhịp (ms) */
const TIMING = {
  holdMismatch: 1000, // 2 thẻ khác cặp ngửa bao lâu rồi úp
  matchGlow: 450, // 2 thẻ cùng cặp sáng vàng bao lâu rồi mới bay vào túi
  flyToBag: 520, // thời gian bay vào túi
  peek: 1500, // "lật hé" cả bàn
  boardDoneHold: 1700, // xong bàn: ăn mừng ít nhất chừng này rồi mới sang bàn sau
}
/** Lật bao nhiêu lần liền không ghép được thì Ki "lật hé" cả bàn */
const PEEK_AFTER_MISSES = 6

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

type MascotReact = ReturnType<typeof useMascotReaction>['react']

export interface MemoryBoardViewProps {
  board: MemoryBoard
  /** 1 cặp vừa ghép xong -> báo cho trò (trò báo động cơ). Cặp đệm thì không gọi. */
  onPairMatched: (pair: MemoryPair, outcome: CompleteItemInput) => ItemFeedback | null
  /** xong cả bàn (sau màn ăn mừng ngắn) */
  onBoardDone: () => void
  onReact: MascotReact
  correctBubbles: string[]
}

export function MemoryBoardView({ board, onPairMatched, onBoardDone, onReact, correctBubbles }: MemoryBoardViewProps) {
  const kidsText = useKidsText()
  const text = useMemoryMatchText()
  const reduceMotion = useReducedMotion()

  /** thẻ đang ngửa nhưng chưa ghép (0, 1 hoặc 2 thẻ) */
  const [openIds, setOpenIds] = useState<string[]>([])
  /** cặp đã ghép (đang sáng vàng / đang bay / đã vào túi) */
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([])
  /** cặp đã nằm trong túi (ô trong túi hiện thẻ nhỏ) */
  const [collectedPairIds, setCollectedPairIds] = useState<string[]>([])
  /** thẻ đang bay vào túi: id thẻ -> quãng bay (px) */
  const [flying, setFlying] = useState<Record<string, { x: number; y: number }>>({})
  /** 2 thẻ vừa lật sai (loại "lẽ ra nhận ra được") -> loé cam san hô */
  const [missIds, setMissIds] = useState<string[]>([])
  /** gợi ý bậc 2: thẻ cùng cặp sáng viền vàng */
  const [glowCardId, setGlowCardId] = useState<string | null>(null)
  /** gợi ý bậc 3: cặp đang được ngửa sẵn cho bé bấm */
  const [revealPairId, setRevealPairId] = useState<string | null>(null)
  const [peeking, setPeeking] = useState(false)
  const [flips, setFlips] = useState(0)
  const [done, setDone] = useState(false)

  // Những thứ không cần vẽ lại -> để trong ref
  const seen = useRef(new Set<string>()) // thẻ đã từng ngửa ít nhất 1 lần
  const firstSeenAt = useRef(new Map<string, number>()) // cặp -> lúc thấy thẻ đầu tiên của cặp
  const misses = useRef(new Map<string, number>()) // cặp -> số lỗi "lẽ ra nhận ra được"
  const missStreak = useRef(0)
  const peekUsed = useRef(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const lastSpoken = useRef<KidsWord | null>(null)
  const finished = useRef(false)
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms))
  const cardRefs = useRef(new Map<string, HTMLButtonElement>())
  const slotRefs = useRef(new Map<string, HTMLElement>())

  // Rời bàn -> dừng mọi hẹn giờ + giọng
  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(window.clearTimeout)
      window.clearTimeout(closeTimer.current)
      stopVoice()
    }
  }, [])

  /** Thẻ "biết nói": mức 1–2 là thẻ chữ (đọc để nối chữ với âm), mức 3 là thẻ loa. Thẻ hình không đọc. */
  const speaks = (card: MemoryCard) => (board.mode === 'picture' ? card.face === 'word' : card.face === 'sound')
  const speak = (card: MemoryCard) => {
    if (!speaks(card)) return
    lastSpoken.current = card.word
    void sayWord(card.word)
  }

  const finishBoard = () => {
    if (finished.current) return
    finished.current = true
    stopVoice()
    onBoardDone()
  }

  /* ---------- ghép đúng 1 cặp ---------- */
  const completeMatch = (pairId: string, revealed: boolean) => {
    window.clearTimeout(closeTimer.current)
    const pair = board.pairs.find((p) => p.pairId === pairId)!
    const pairCards = board.cards.filter((card) => card.pairId === pairId)
    const nowMatched = [...matchedPairIds, pairId]
    setOpenIds([])
    setMissIds([])
    setRevealPairId(null)
    setGlowCardId((current) => (current && pairCards.some((card) => card.cardId === current) ? null : current))
    setMatchedPairIds(nowMatched)
    missStreak.current = 0
    ;(document.activeElement as HTMLElement | null)?.blur?.()
    playSound('correct')

    // Bay vào túi: đo vị trí thẻ và ô trong túi -> quãng bay của từng thẻ
    later(() => {
      const slot = slotRefs.current.get(pairId)?.getBoundingClientRect()
      const deltas: Record<string, { x: number; y: number }> = {}
      for (const card of pairCards) {
        const from = cardRefs.current.get(card.cardId)?.getBoundingClientRect()
        if (from && slot) deltas[card.cardId] = { x: slot.left + slot.width / 2 - (from.left + from.width / 2), y: slot.top + slot.height / 2 - (from.top + from.height / 2) }
      }
      setFlying((current) => ({ ...current, ...deltas }))
    }, TIMING.matchGlow)
    later(() => setCollectedPairIds((current) => [...current, pairId]), TIMING.matchGlow + (reduceMotion ? 0 : TIMING.flyToBag))

    // Báo động cơ (qua trò) — cặp đệm thì không
    const feedback =
      pair.queueIndex === null
        ? null
        : onPairMatched(pair, {
            wrongCount: Math.min(misses.current.get(pairId) ?? 0, 3),
            revealed,
            responseMs: performance.now() - (firstSeenAt.current.get(pairId) ?? performance.now()),
          })
    if (feedback?.comesBack) onReact('comfort', voiceLine('kids-vl-hint3-later'), 3200)
    else if (feedback?.praise) onReact('happy', feedback.praise.text, 4200)
    else onReact('happy', correctBubbles[Math.floor(Math.random() * correctBubbles.length)], 1600)

    // Giọng: từ -> nghĩa (-> lời khen)
    const steps: SpeechStep[] = [
      { kind: 'word', word: pair.word, pauseAfterMs: 120 },
      { kind: 'meaning', word: pair.word },
    ]
    if (feedback?.praise) steps.push({ kind: 'line', id: feedback.praise.id, text: feedback.praise.text })
    lastSpoken.current = pair.word
    const speech = speakSequence(steps)

    // Xong cả bàn: ăn mừng, chờ đọc xong (ít nhất boardDoneHold) rồi sang bàn sau
    if (nowMatched.length === board.pairs.length) {
      const startedAt = performance.now()
      later(() => {
        setDone(true)
        playSound('complete')
      }, TIMING.matchGlow + TIMING.flyToBag)
      void speech.then(() => later(finishBoard, Math.max(500, TIMING.boardDoneHold - (performance.now() - startedAt))))
    }
  }

  /* ---------- lật 1 thẻ ---------- */
  const flipCard = (card: MemoryCard) => {
    if (done || peeking || matchedPairIds.includes(card.pairId)) return

    // Bậc 3: chỉ nhận bấm vào cặp đang được chỉ (không có lỗi thứ 4)
    if (revealPairId) {
      if (card.pairId === revealPairId) completeMatch(revealPairId, true)
      return
    }
    // Thẻ đang ngửa: bấm lại = nghe lại
    if (openIds.includes(card.cardId)) {
      speak(card)
      return
    }

    let open = openIds
    if (open.length === 2) {
      // đang chờ úp 2 thẻ khác cặp -> úp ngay, thẻ vừa bấm thành thẻ thứ nhất
      window.clearTimeout(closeTimer.current)
      setMissIds([])
      open = []
    }
    const seenBefore = new Set(seen.current)
    seen.current.add(card.cardId)
    if (!firstSeenAt.current.has(card.pairId)) firstSeenAt.current.set(card.pairId, performance.now())
    open = [...open, card.cardId]
    setOpenIds(open)
    setFlips((n) => n + 1)
    playSound('flip')
    speak(card)
    if (open.length === 1) return

    /* đã ngửa 2 thẻ */
    const first = board.cards.find((c) => c.cardId === open[0])!
    if (first.pairId === card.pairId) {
      completeMatch(card.pairId, false)
      return
    }

    // Khác cặp
    missStreak.current += 1
    const partner = partnerOf(board, first)
    let revealNext: string[] | null = null
    if (seenBefore.has(partner.cardId)) {
      // "lẽ ra nhận ra được": thẻ cùng cặp với thẻ thứ nhất đã từng được lật
      const count = (misses.current.get(first.pairId) ?? 0) + 1
      misses.current.set(first.pairId, count)
      setMissIds(open)
      playSound('oops')
      if (count === 1) {
        onReact('comfort', text.hintSeenPartner, 3000)
      } else if (count === 2) {
        setGlowCardId(partner.cardId)
        onReact('thinking', text.hintPartnerGlow, 3200)
      } else {
        revealNext = [first.cardId, partner.cardId]
        onReact('comfort', voiceLine('kids-vl-hint3-show'), 3600)
      }
    }

    const wantsPeek = !revealNext && missStreak.current >= PEEK_AFTER_MISSES && !peekUsed.current
    closeTimer.current = window.setTimeout(() => {
      setMissIds([])
      if (revealNext) {
        // bậc 3: ngửa sẵn cả 2 thẻ của cặp, đọc từ; bé bấm vào để ghép
        setOpenIds(revealNext)
        setRevealPairId(first.pairId)
        setGlowCardId(null)
        lastSpoken.current = first.word
        void speakSequence([{ kind: 'word', word: first.word, pauseAfterMs: 120 }, { kind: 'meaning', word: first.word }])
        return
      }
      setOpenIds([])
      if (wantsPeek) {
        peekUsed.current = true
        onReact('thinking', text.peek, 2600)
        setPeeking(true)
        later(() => setPeeking(false), TIMING.peek)
      }
    }, TIMING.holdMismatch)
  }

  /* ---------- bàn phím: mũi tên chọn thẻ, R nghe lại, Enter = Tiếp khi xong ---------- */
  const onGridKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -board.columns, ArrowDown: board.columns }
    const move = moves[event.key]
    if (move === undefined) return
    event.preventDefault()
    const focusedIndex = board.cards.findIndex((card) => cardRefs.current.get(card.cardId) === document.activeElement)
    const start = focusedIndex < 0 ? 0 : focusedIndex
    // nhảy qua các thẻ đã vào túi
    for (let index = start + move; index >= 0 && index < board.cards.length; index += move) {
      const target = board.cards[index]
      if (!matchedPairIds.includes(target.pairId)) {
        cardRefs.current.get(target.cardId)?.focus()
        return
      }
    }
  }
  const keyHandler = useRef<(event: KeyboardEvent) => void>(() => {})
  keyHandler.current = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
    const focused = event.target as HTMLElement | null
    if ((event.key === 'r' || event.key === 'R') && lastSpoken.current) {
      event.preventDefault()
      void sayWord(lastSpoken.current)
    } else if ((event.key === 'Enter' || event.key === ' ') && done && focused?.tagName !== 'BUTTON') {
      event.preventDefault()
      finishBoard()
    } else if (event.key.startsWith('Arrow') && focused?.tagName !== 'BUTTON' && !done) {
      // chưa chọn thẻ nào -> mũi tên đầu tiên chọn thẻ đầu
      const firstCard = board.cards.find((card) => !matchedPairIds.includes(card.pairId))
      if (firstCard) {
        event.preventDefault()
        cardRefs.current.get(firstCard.cardId)?.focus()
      }
    }
  }
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => keyHandler.current(event)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  /* ---------- vẽ ---------- */
  // cặp QA nên bấm (chỉ khi npm run dev): cặp đang được chỉ, hoặc cặp đầu tiên chưa ghép
  const qaPairId = import.meta.env.DEV ? (revealPairId ?? board.pairs.find((pair) => !matchedPairIds.includes(pair.pairId))?.pairId) : undefined
  const realPairs = board.pairs.length

  return (
    <div className={['mm-board', `mm-board--${board.mode}`, done && 'is-done'].filter(Boolean).join(' ')}>
      <div className="mm-board__main">
        <p className="mm-instruction">
          {board.mode === 'picture' ? text.instructionPicture : text.instructionSound}
          <span className="mm-instruction__keys">{text.keysHint}</span>
        </p>

        <div
          className="mm-grid"
          role="group"
          aria-label={text.boardLabel}
          style={{ '--cols': board.columns, '--rows': board.rows } as CSSProperties}
          onKeyDown={onGridKeyDown}
        >
          {board.cards.map((card, index) => {
            const matched = matchedPairIds.includes(card.pairId)
            const faceUp = matched || openIds.includes(card.cardId) || peeking
            const fly = flying[card.cardId]
            const classes = [
              'mm-card',
              `mm-card--${card.face}`,
              faceUp && 'is-face-up',
              matched && 'is-matched',
              fly && 'is-flying',
              missIds.includes(card.cardId) && 'is-miss',
              glowCardId === card.cardId && !faceUp && 'is-glow',
              revealPairId === card.pairId && 'is-revealed',
            ]
            const label = !faceUp
              ? text.cardBack(index + 1)
              : card.face === 'word'
                ? text.cardWord(index + 1, card.word.word)
                : card.face === 'sound'
                  ? text.cardSound(index + 1)
                  : text.cardPicture(index + 1)
            const isQaTarget = qaPairId === card.pairId && (revealPairId === card.pairId || !openIds.includes(card.cardId))
            return (
              <div key={card.cardId} className="mm-cell" style={{ '--i': index } as CSSProperties}>
                <button
                  ref={(element) => {
                    if (element) cardRefs.current.set(card.cardId, element)
                    else cardRefs.current.delete(card.cardId)
                  }}
                  type="button"
                  className={classes.filter(Boolean).join(' ')}
                  style={fly ? ({ '--fly-x': `${fly.x}px`, '--fly-y': `${fly.y}px` } as CSSProperties) : undefined}
                  onClick={() => flipCard(card)}
                  disabled={matched || done}
                  aria-label={label}
                  // chỉ khi npm run dev: thẻ của 1 cặp cần lật cho script kiểm thử tự động (QA)
                  data-answer={isQaTarget ? 'true' : undefined}
                >
                  <span className="mm-card__inner">
                    {/* mặt úp: hoạ tiết dấu chân Corgi */}
                    <span className="mm-card__back" aria-hidden>
                      <span className="mm-card__emblem">
                        <KidsPicture slug="paw-prints" word="paw" size={56} decorative />
                      </span>
                    </span>
                    {/* mặt ngửa */}
                    <span className="mm-card__front" aria-hidden>
                      {card.face === 'picture' && <KidsPicture slug={card.word.image} word={card.word.word} size={120} decorative />}
                      {card.face === 'sound' && (
                        <span className="mm-card__speaker">
                          <Icon name="volume" size={40} strokeWidth={2.4} />
                        </span>
                      )}
                      {card.face === 'word' && (
                        <span className="mm-card__word" style={{ '--len': Math.max(...card.word.word.split(' ').map((part) => part.length)) } as CSSProperties}>
                          {card.word.word}
                        </span>
                      )}
                      {speaks(card) && card.face === 'word' && <Icon name="volume" size={16} className="mm-card__tiny-speaker" />}
                      {matched && (
                        <span className="mm-card__check">
                          <Icon name="check" size={20} strokeWidth={3.2} />
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              </div>
            )
          })}
          {done && <CorrectBurst spread={1.6} />}
        </div>
      </div>

      {/* ---------- túi đồ: mỗi cặp ghép xong bay vào 1 ô ---------- */}
      <aside className="mm-bag kz-glass" aria-label={text.bagTitle}>
        <div className="mm-bag__head">
          <KidsPicture slug="backpack" word="bag" size={40} decorative />
          <div>
            <h2 className="mm-bag__title">{text.bagTitle}</h2>
            <span className="mm-bag__count">{text.bagCount(collectedPairIds.length, realPairs)}</span>
          </div>
        </div>
        <ul className="mm-bag__slots">
          {board.pairs.map((pair) => {
            const collected = collectedPairIds.includes(pair.pairId)
            return (
              <li
                key={pair.pairId}
                ref={(element) => {
                  if (element) slotRefs.current.set(pair.pairId, element)
                  else slotRefs.current.delete(pair.pairId)
                }}
                className={['mm-slot', collected && 'is-filled'].filter(Boolean).join(' ')}
              >
                {collected && (
                  <button type="button" className="mm-slot__card" onClick={() => void sayWord(pair.word)} title={kidsText.listenAgain}>
                    <KidsPicture slug={pair.word.image} word={pair.word.word} size={34} decorative />
                    <span className="mm-slot__word">{pair.word.word}</span>
                    <Icon name="volume" size={15} className="mm-slot__speaker" />
                  </button>
                )}
              </li>
            )
          })}
        </ul>
        <span className="mm-bag__flips">
          <Icon name="retry" size={16} /> {text.flips(flips)}
        </span>
      </aside>

      <div className="mm-next">
        {done && (
          <Button size="xl" onClick={finishBoard} iconRight={<Kbd onColor>Enter</Kbd>} className="mm-next__btn">
            {kidsText.next}
          </Button>
        )}
      </div>
    </div>
  )
}
