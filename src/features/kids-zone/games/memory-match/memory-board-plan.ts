/**
 * memory-board-plan.ts — XẾP "BÀN LẬT THẺ" CHO TRÒ LẬT THẺ GHÉP CẶP (hàm thuần, không giao diện)
 * ----------------------------------------------------------------------------
 * Động cơ chung đưa trò 1 HÀNG CÂU (mỗi câu = 1 từ). Trò lật thẻ thì 1 bàn có nhiều cặp cùng lúc,
 * nên trò gom vài câu LIỀN NHAU trong hàng thành 1 bàn:
 *
 *   hàng câu:  [cat] [dog] [cow] [duck] [dog*] [fish] [hen] ...      (* = gặp lại trong lượt)
 *   bàn 1:     cat, dog, cow, duck            <- dừng trước "dog*" vì 1 bàn không có 2 cặp cùng từ
 *   bàn 2:     dog*, fish, hen, ...
 *
 * Mỗi câu = 1 cặp thẻ:
 *   mức 1–2: thẻ ẢNH ↔ thẻ CHỮ           (nhận ra chữ của hình)
 *   mức 3  : thẻ LOA (lật là nghe) ↔ thẻ CHỮ (nghe rồi tìm chữ — khó hơn, không có hình)
 *
 * Số cặp mỗi bàn: mức 1 tối đa 5 · mức 2 tối đa 6 · mức 3 tối đa 8 (07-KIDS-ZONE: 6–8 cặp).
 * Hàng câu được chia đều (VD 10 câu ở mức 2 -> 2 bàn × 5 cặp, không phải 6 + 4).
 * Bàn ít hơn 4 cặp (cuối lượt, câu quay lại…) -> thêm cặp "đệm" lấy từ kho đáp án nhiễu cho đủ 4;
 * cặp đệm chỉ để chơi, KHÔNG tính vào tiến độ / Leitner.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../../content/content-types'
import type { RoundItem } from '../../game-engine/engine-types'

export type PairMode = 'picture' | 'sound'
export type CardFace = 'picture' | 'sound' | 'word'

/** 1 cặp trên bàn. queueIndex = vị trí câu trong hàng câu của lượt; null = cặp đệm. */
export interface MemoryPair {
  pairId: string
  word: KidsWord
  queueIndex: number | null
}

/** 1 thẻ trên bàn. */
export interface MemoryCard {
  cardId: string
  pairId: string
  face: CardFace
  word: KidsWord
}

export interface MemoryBoard {
  /** vị trí câu đầu tiên của bàn trong hàng câu */
  startIndex: number
  /** số câu THẬT của bàn (không tính cặp đệm) — các câu startIndex .. startIndex + itemCount - 1 */
  itemCount: number
  pairs: MemoryPair[]
  /** các thẻ đã xáo trộn, theo thứ tự hiện trên lưới (trái -> phải, trên -> dưới) */
  cards: MemoryCard[]
  columns: number
  rows: number
  mode: PairMode
}

export const MAX_PAIRS_BY_LEVEL: Record<1 | 2 | 3, number> = { 1: 5, 2: 6, 3: 8 }
export const MIN_PAIRS = 4

/** Số cột của lưới theo số thẻ — ưu tiên thẻ TO (ít cột khi có thể), vừa màn ngang. */
const COLUMNS_BY_CARD_COUNT: Record<number, number> = { 8: 4, 10: 5, 12: 4, 14: 5, 16: 4 }

export interface PlanBoardOptions {
  /** hàng câu hiện tại của lượt (đã gồm câu quay lại cuối lượt) */
  queue: RoundItem[]
  startIndex: number
  level: 1 | 2 | 3
  /** kho từ để lấy cặp đệm (plan.distractorPool) */
  fillerPool: KidsWord[]
  /** id các từ bé vừa gặp — ưu tiên làm cặp đệm (quen mặt, không phải từ lạ) */
  recentWordIds: string[]
  random?: () => number
}

export function planBoard({ queue, startIndex, level, fillerPool, recentWordIds, random = Math.random }: PlanBoardOptions): MemoryBoard {
  const maxPairs = MAX_PAIRS_BY_LEVEL[level]
  const remaining = queue.length - startIndex
  const boardCount = Math.max(1, Math.ceil(remaining / maxPairs))
  const target = Math.ceil(remaining / boardCount)

  /* 1. Lấy các câu liền nhau, dừng khi đủ số cặp hoặc gặp từ đã có trên bàn */
  const pairs: MemoryPair[] = []
  for (let index = startIndex; index < queue.length && pairs.length < target; index++) {
    const word = queue[index].word
    if (pairs.some((pair) => pair.word.id === word.id)) break
    pairs.push({ pairId: `p${index}`, word, queueIndex: index })
  }
  const itemCount = pairs.length

  /* 2. Thiếu thì thêm cặp đệm: từ vừa gặp trước, rồi tới từ khác trong kho (xáo) */
  if (pairs.length < MIN_PAIRS) {
    const taken = new Set(pairs.map((pair) => pair.word.id))
    const recent = [...recentWordIds].reverse()
    const candidates = [
      ...recent.map((id) => fillerPool.find((word) => word.id === id)).filter((word): word is KidsWord => !!word),
      ...shuffle(fillerPool, random),
    ]
    for (const word of candidates) {
      if (pairs.length >= MIN_PAIRS) break
      if (taken.has(word.id) || pairs.some((pair) => pair.word.image === word.image)) continue
      taken.add(word.id)
      pairs.push({ pairId: `f${word.id}`, word, queueIndex: null })
    }
  }

  /* 3. Mỗi cặp 2 thẻ, xáo trộn cả bàn */
  const mode: PairMode = level === 3 ? 'sound' : 'picture'
  const cards = shuffle(
    pairs.flatMap((pair): MemoryCard[] => [
      { cardId: `${pair.pairId}-a`, pairId: pair.pairId, face: mode, word: pair.word },
      { cardId: `${pair.pairId}-b`, pairId: pair.pairId, face: 'word', word: pair.word },
    ]),
    random,
  )

  const columns = COLUMNS_BY_CARD_COUNT[cards.length] ?? Math.min(cards.length, 4)
  return { startIndex, itemCount, pairs, cards, columns, rows: Math.ceil(cards.length / columns), mode }
}

/** Thẻ cùng cặp với 1 thẻ. */
export const partnerOf = (board: MemoryBoard, card: MemoryCard) => board.cards.find((other) => other.pairId === card.pairId && other.cardId !== card.cardId)!

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
