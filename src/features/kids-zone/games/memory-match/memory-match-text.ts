/**
 * memory-match-text.ts — CHỮ GIAO DIỆN CỦA TRÒ "LẬT THẺ GHÉP CẶP" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const text = useMemoryMatchText()
 *   text.flips(12)   -> "12 lần lật"
 * Chữ chung (Tiếp, Nghe lại…) ở kids-text.ts; lời Ki nói ở content/kids/kids-voice-lines.ts.
 * Luật viết: hướng dẫn ≤ 12 từ, không "giỏi quá / thông minh", không IN HOA.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  instructionPicture: 'Lật 2 thẻ: tìm hình và chữ đi cùng nhau',
  instructionSound: 'Lật thẻ loa để nghe, tìm chữ đúng',
  bagTitle: 'Túi đồ',
  bagCount: (done: number, total: number) => `${done}/${total} cặp`,
  flips: (n: number) => `${n} lần lật`,
  boardLabel: 'Bàn lật thẻ',
  cardBack: (n: number) => `Thẻ ${n}, đang úp`,
  cardPicture: (n: number) => `Thẻ ${n}: hình`,
  cardSound: (n: number) => `Thẻ ${n}: thẻ loa`,
  cardWord: (n: number, word: string) => `Thẻ ${n}: ${word}`,
  /** gợi ý bậc 1 (lời riêng của trò lật thẻ — chưa có file giọng, máy đọc) */
  hintSeenPartner: 'Thẻ cùng cặp bạn đã lật rồi đấy, nhớ lại xem.',
  hintPartnerGlow: 'Gợi ý: thẻ cùng cặp đang sáng lên.',
  peek: 'Mình lật hé cho bạn xem nhé.',
  boardDone: 'Đủ cặp rồi',
  keysHint: 'Phím mũi tên để chọn thẻ, Enter để lật',
}

export type MemoryMatchText = typeof VI

const EN: MemoryMatchText = {
  instructionPicture: 'Flip 2 cards: find a picture and its word',
  instructionSound: 'Flip a speaker card to hear it, find the word',
  bagTitle: 'Bag',
  bagCount: (done, total) => `${done}/${total} pairs`,
  flips: (n) => `${n} ${n === 1 ? 'flip' : 'flips'}`,
  boardLabel: 'Memory board',
  cardBack: (n) => `Card ${n}, face down`,
  cardPicture: (n) => `Card ${n}: picture`,
  cardSound: (n) => `Card ${n}: speaker card`,
  cardWord: (n, word) => `Card ${n}: ${word}`,
  hintSeenPartner: 'You already flipped its partner. Try to remember.',
  hintPartnerGlow: 'Hint: its partner is glowing.',
  peek: "Let's take a quick peek.",
  boardDone: 'All pairs found',
  keysHint: 'Arrow keys to choose, Enter to flip',
}

const BY_LANGUAGE = { vi: VI, en: EN }

export function useMemoryMatchText(): MemoryMatchText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
