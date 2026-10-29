/**
 * sentence-builder-text.ts — CHỮ GIAO DIỆN CỦA TRÒ "GHÉP CÂU" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const text = useSentenceBuilderText()
 *   text.wordClass.noun    -> "danh từ"
 *
 * Chữ chung (Tiếp, Nghe lại…) ở kids-text.ts; lời Ki nói ở content/kids/kids-voice-lines.ts.
 * Luật viết: hướng dẫn ≤ 12 từ, không "giỏi quá / thông minh", không IN HOA.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'
import type { WordClass } from './word-class'

const VI = {
  promptLabel: 'Ghép câu tiếng Anh có nghĩa là',
  instruction: 'Bấm các khối chữ theo đúng thứ tự',
  answerLabel: 'Câu bạn đang ghép',
  poolLabel: 'Các khối chữ',
  blockLabel: (n: number, text: string) => `Khối ${n}: ${text}`,
  listenSentence: 'Nghe cả câu',
  listenSlow: 'Nghe chậm',
  /** gợi ý bậc 2 khi đã có vài khối đúng (câu thoại có sẵn chỉ nói "khối đầu tiên") */
  hintNextBlock: 'Gợi ý: khối chữ tiếp theo đã vào chỗ.',
  wordClass: { noun: 'danh từ', verb: 'động từ', adjective: 'tính từ', other: 'từ khác' } satisfies Record<WordClass, string>,
  wordClassHint: 'Màu cho biết loại từ',
  tapToHear: 'Bấm vào khối để nghe',
}

export type SentenceBuilderText = typeof VI

const EN: SentenceBuilderText = {
  promptLabel: 'Build the English sentence for',
  instruction: 'Tap the word blocks in the right order',
  answerLabel: 'Your sentence',
  poolLabel: 'Word blocks',
  blockLabel: (n, text) => `Block ${n}: ${text}`,
  listenSentence: 'Hear the sentence',
  listenSlow: 'Hear it slowly',
  hintNextBlock: 'Hint: the next block is in place now.',
  wordClass: { noun: 'noun', verb: 'verb', adjective: 'adjective', other: 'other' },
  wordClassHint: 'Colours show the word type',
  tapToHear: 'Tap a block to hear it',
}

const BY_LANGUAGE = { vi: VI, en: EN }

export function useSentenceBuilderText(): SentenceBuilderText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
