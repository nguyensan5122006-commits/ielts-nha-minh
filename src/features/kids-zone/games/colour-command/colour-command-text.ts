/**
 * colour-command-text.ts — CHỮ TRÊN MÀN HÌNH CỦA TRÒ "NGHE LỆNH TÔ MÀU" (2 ngôn ngữ)
 *   const text = useColourCommandText()
 * Lời Ki NÓI (có giọng) lấy từ kho lời thoại content/kids/kids-voice-lines.ts (id kids-vl-…).
 * Luật viết: hướng dẫn ≤ 12 từ, không "Sai", không "giỏi quá / thông minh".
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  hideText: 'Ẩn chữ',
  listenCommand: 'Nghe lệnh',
  listenAgain: 'Nghe lại lệnh (R)',
  listenSlow: 'Nghe chậm',
  hiddenPrompt: 'Nghe lệnh rồi tô màu',
  instruction: 'Chọn màu, rồi bấm vào đồ vật để tô',
  trayLabel: 'Khay màu',
  pickColourFirst: 'Chọn màu trước nhé',
  colourPicked: (colour: string) => `Đã lấy màu ${colour}`,
  hintVietnamese: 'Tiếng Việt',
  sceneLabel: 'Bức tranh để tô màu',
  thingLabel: (word: string) => `Tô ${word}`,
  paintedLabel: (word: string, colour: string) => `${word}: đã tô ${colour}`,
  next: 'Tiếp',
  correctBubbles: ['Đúng rồi', 'Chuẩn luôn', 'Chính nó', 'Tô xong'],
  moreToPaint: (left: number) => `Còn ${left} cái nữa`,
}

export type ColourCommandText = typeof VI

const EN: ColourCommandText = {
  hideText: 'Hide text',
  listenCommand: 'Listen',
  listenAgain: 'Hear it again (R)',
  listenSlow: 'Listen slowly',
  hiddenPrompt: 'Listen, then colour',
  instruction: 'Pick a colour, then tap the thing to colour it',
  trayLabel: 'Paint tray',
  pickColourFirst: 'Pick a colour first',
  colourPicked: (colour) => `Picked ${colour}`,
  hintVietnamese: 'Vietnamese',
  sceneLabel: 'Picture to colour',
  thingLabel: (word) => `Colour the ${word}`,
  paintedLabel: (word, colour) => `${word}: coloured ${colour}`,
  next: 'Next',
  correctBubbles: ['Yes', 'That is it', 'Right one', 'Done'],
  moreToPaint: (left) => `${left} more to colour`,
}

export function useColourCommandText(): ColourCommandText {
  const { language } = useLanguage()
  return useMemo(() => (language === 'en' ? EN : VI), [language])
}
