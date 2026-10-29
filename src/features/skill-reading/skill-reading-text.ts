/**
 * skill-reading-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ GIAO DIỆN CỦA TRÌNH ĐỌC (Reading task) — 2 ngôn ngữ theo nút VI/EN.
 *   const text = useReadingText()
 *   text('paragraph', { label: 'B' })   -> "Đoạn B"
 * Bài đọc + câu hỏi luôn là tiếng Anh — không nằm ở đây.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { useLanguage } from '../../translations/language-context'

const READING_TEXT = {
  eyebrow: { vi: 'Luyện đọc IELTS', en: 'IELTS Reading' },
  eyebrowGeneral: { vi: 'Luyện đọc', en: 'Reading practice' },
  questionsCount: { vi: '{n} câu hỏi', en: '{n} questions' },
  wordsCount: { vi: '{n} từ', en: '{n} words' },
  minutes: { vi: '{n} phút', en: '{n} min' },
  modeGroup: { vi: 'Chọn cách làm bài', en: 'Choose how to practise' },
  practiceTitle: { vi: 'Luyện thoải mái', en: 'Relaxed practice' },
  practicePoint1: { vi: 'Không bấm giờ', en: 'No timer' },
  practicePoint2: { vi: 'Bấm 1 từ để xem nghĩa tiếng Việt', en: 'Tap a word to see its meaning' },
  practicePoint3: { vi: 'Tô vàng, ghi chú, gắn cờ câu khó', en: 'Highlight, take notes, flag questions' },
  examTitle: { vi: 'Thi thật · {n} phút', en: 'Exam mode · {n} min' },
  examPoint1: { vi: 'Đồng hồ đếm ngược, hết giờ tự nộp', en: 'Countdown, auto-submit when time is up' },
  examPoint2: { vi: 'Không tra từ, không gợi ý', en: 'No dictionary, no hints' },
  examPoint3: { vi: 'Vẫn tô vàng + ghi chú như máy thi', en: 'Highlight + notes like the real test' },
  examLocked: { vi: 'Bài này chưa có chế độ thi thật', en: 'No exam mode for this passage' },
  strategy: { vi: 'Mẹo làm bài', en: 'Strategy' },
  start: { vi: 'Bắt đầu đọc', en: 'Start reading' },
  later: { vi: 'Để sau', en: 'Later' },

  passagePane: { vi: 'Bài đọc', en: 'Passage' },
  questionsPane: { vi: 'Câu hỏi', en: 'Questions' },
  paragraph: { vi: 'Đoạn {label}', en: 'Paragraph {label}' },
  tapHint: { vi: 'Bấm 1 từ để xem nghĩa · bôi đen để tô vàng hoặc ghi chú', en: 'Tap a word for its meaning · select text to highlight or note' },
  selectHint: { vi: 'Bôi đen chữ để tô vàng hoặc ghi chú', en: 'Select text to highlight or add a note' },
  lookupSave: { vi: 'Lưu vào sổ từ', en: 'Save to word list' },
  lookupSaved: { vi: 'Đã lưu', en: 'Saved' },
  lookupUnknown: { vi: 'Chưa có nghĩa — lưu để tra sau', en: 'No meaning yet — save to look up later' },
  lookupClose: { vi: 'Đóng', en: 'Close' },
  lookupListen: { vi: 'Nghe phát âm', en: 'Listen' },

  submitCheck: { vi: 'Kiểm tra & nộp', en: 'Review & submit' },
  continue: { vi: 'Tiếp tục', en: 'Continue' },
  retryWrong: { vi: 'Làm lại câu sai', en: 'Retry wrong answers' },
  retrying: { vi: 'Đang làm lại {n} câu sai — đọc lại đoạn có bằng chứng rồi sửa.', en: 'Retrying {n} questions — reread the evidence, then fix them.' },
  timeUpTitle: { vi: 'Hết giờ', en: "Time's up" },
  wentWellAll: { vi: 'Bạn tìm đúng cả {n} bằng chứng trong bài.', en: 'You found the evidence for all {n} questions.' },
  wentWellType: { vi: 'Dạng "{type}" làm rất chắc ({c}/{t}).', en: 'Solid on "{type}" ({c}/{t}).' },
  wentWellSome: { vi: 'Bạn đã tìm đúng {c} câu — cách dò từ khoá đang có hiệu quả.', en: 'You got {c} right — your keyword scanning is working.' },
  improveBlank: { vi: 'Còn {n} câu bỏ trống — cứ đoán, IELTS không trừ điểm câu sai.', en: '{n} blanks — always guess, there is no penalty.' },
  improveSpelling: { vi: '{n} câu gần đúng: chép đúng chính tả từ trong bài.', en: '{n} near misses: copy the spelling exactly from the text.' },
  improveTfng: { vi: 'TFNG: FALSE = bài nói NGƯỢC lại; NOT GIVEN = bài KHÔNG nhắc tới.', en: 'TFNG: FALSE = the text says the opposite; NOT GIVEN = it is not mentioned.' },
  improveLocate: { vi: 'Bấm "Tìm trong bài" ở câu sai để xem cách bài diễn đạt lại ý của câu hỏi.', en: 'Use "Find in text" on wrong answers to see how the passage paraphrases the question.' },
  summaryLine: { vi: 'Bạn trả lời đúng {c}/{t} câu đọc hiểu', en: 'You answered {c}/{t} reading questions correctly' },
} satisfies Record<string, { vi: string; en: string }>

export type ReadingTextKey = keyof typeof READING_TEXT

export function useReadingText(): (key: ReadingTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = READING_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return text
    },
    [language],
  )
}

/** Câu tóm tắt song ngữ cho màn kết quả của trình học. */
export function readingSummary(correct: number, total: number) {
  return {
    vi: READING_TEXT.summaryLine.vi.replace('{c}', String(correct)).replace('{t}', String(total)),
    en: READING_TEXT.summaryLine.en.replace('{c}', String(correct)).replace('{t}', String(total)),
  }
}
