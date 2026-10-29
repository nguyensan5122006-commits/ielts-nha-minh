/**
 * speak-unlock-text.ts — CHỮ TRÊN MÀN HÌNH CỦA TRÒ "NÓI ĐỂ MỞ KHOÁ" (2 ngôn ngữ)
 *   const text = useSpeakUnlockText()
 * Lời Ki NÓI (có giọng) lấy từ kho lời thoại content/kids/kids-voice-lines.ts (id kids-vl-speak-…).
 * Luật (psych-kids 31–33): KHÔNG BAO GIỜ có chữ "Sai"; luôn có "Bỏ qua"; hướng dẫn ≤ 12 từ.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  hideText: 'Ẩn chữ',
  sayToUnlock: 'Đọc to từ này để mở rương',
  listenModel: 'Nghe mẫu (R)',
  listenSlow: 'Nghe chậm',
  micIdle: 'Bấm rồi nói',
  micListening: 'Đang nghe… nói xong bấm lại',
  micChecking: 'Ki đang nghe lại…',
  micKey: 'Space',
  skip: 'Bỏ qua',
  next: 'Tiếp',
  hiddenWord: 'Nhìn hình rồi nói',
  // tự nghe và so sánh
  selfCheckTitle: 'Tự nghe và so sánh',
  selfCheckHint: 'Nghe mẫu, nghe giọng bạn, rồi chọn',
  honorHint: 'Nói to theo mẫu, rồi tự chọn nhé',
  recordYou: 'Ghi giọng bạn',
  recordAgain: 'Ghi lại',
  recording: 'Đang ghi… bấm để dừng',
  playModel: 'Nghe mẫu',
  playYou: 'Nghe giọng bạn',
  same: 'Giống',
  notYet: 'Chưa giống',
  // vì sao đang tự kiểm tra
  noteUnsupported: 'Trình duyệt này chưa nghe được giọng nói',
  noteMicOff: 'Micro đang tắt — vẫn chơi được',
  // phản ứng của Ki (bong bóng ngắn)
  /** máy nhận ra giọng bé */
  heardBubbles: ['Ki nghe rõ rồi', 'Rương mở rồi', 'Chuẩn rồi'],
  /** bé tự so sánh rồi bấm Giống (máy không nghe) — không nói "Ki nghe rõ" */
  selfBubbles: ['Rương mở rồi', 'Mở rồi'],
  skippedBubble: 'Mình qua từ khác nhé',
  silenceBubble: 'Ki chưa nghe thấy gì. Nói to hơn chút nhé',
}

export type SpeakUnlockText = typeof VI

const EN: SpeakUnlockText = {
  hideText: 'Hide word',
  sayToUnlock: 'Say this word to open the chest',
  listenModel: 'Hear it (R)',
  listenSlow: 'Hear it slowly',
  micIdle: 'Tap, then speak',
  micListening: 'Listening… tap when done',
  micChecking: 'Checking…',
  micKey: 'Space',
  skip: 'Skip',
  next: 'Next',
  hiddenWord: 'Look at the picture and say it',
  selfCheckTitle: 'Listen and compare',
  selfCheckHint: 'Hear the model, hear yourself, then choose',
  honorHint: 'Say it aloud like the model, then choose',
  recordYou: 'Record yourself',
  recordAgain: 'Record again',
  recording: 'Recording… tap to stop',
  playModel: 'Hear the model',
  playYou: 'Hear yourself',
  same: 'Same',
  notYet: 'Not yet',
  noteUnsupported: "This browser can't listen to speech",
  noteMicOff: 'The microphone is off — you can still play',
  heardBubbles: ['Ki heard you', 'The chest is open', 'That is it'],
  selfBubbles: ['The chest is open', 'Open'],
  skippedBubble: "Let's try another word",
  silenceBubble: "Ki didn't hear anything. Say it a bit louder",
}

export function useSpeakUnlockText(): SpeakUnlockText {
  const { language } = useLanguage()
  return useMemo(() => (language === 'en' ? EN : VI), [language])
}
