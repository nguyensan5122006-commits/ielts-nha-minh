/**
 * spell-it-text.ts — CHỮ GIAO DIỆN CỦA TRÒ "XẾP CHỮ THÀNH TỪ" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const text = useSpellItText()
 *   text.instruction        -> "Nghe từ, rồi bấm chữ cái theo đúng thứ tự"
 *
 * Chữ chung của khu trẻ em (Tiếp, Nghe lại, Nghe chậm…) lấy ở kids-text.ts (useKidsText).
 * File này chỉ chứa chữ RIÊNG của trò Xếp chữ. Lời Ki NÓI (có giọng) nằm trong
 * src/content/kids/kids-voice-lines.ts (VD 'kids-vl-instr-spell-it').
 * Luật viết: hướng dẫn ≤ 12 từ, không "giỏi quá / thông minh", không IN HOA.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  instruction: 'Nghe từ, rồi bấm chữ cái theo đúng thứ tự',
  /** nhãn đọc màn hình cho khuôn chữ */
  moldLabel: 'Khuôn chữ',
  tilesLabel: 'Các chữ cái',
  tileLabel: (letter: string) => `Chữ ${letter}`,
  /** gợi ý phím: gõ chữ trên bàn phím cũng được */
  typeHint: 'Gõ phím chữ cái cũng được',
  /** nút loa: phím tắt là phím cách (phím R dùng để gõ chữ r) */
  listenKey: 'Phím cách',
  hintNextLetter: 'Chữ tiếp theo',
  meaningLabel: 'Nghĩa',
}

export type SpellItText = typeof VI

const EN: SpellItText = {
  instruction: 'Listen, then tap the letters in order',
  moldLabel: 'Word mold',
  tilesLabel: 'Letters',
  tileLabel: (letter) => `Letter ${letter}`,
  typeHint: 'You can type the letters too',
  listenKey: 'Space',
  hintNextLetter: 'Next letter',
  meaningLabel: 'Meaning',
}

const BY_LANGUAGE = { vi: VI, en: EN }

export function useSpellItText(): SpellItText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
