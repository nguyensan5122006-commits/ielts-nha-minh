/**
 * exam-ui-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ GIAO DIỆN (2 ngôn ngữ) cho bộ khung thi dùng chung `exam-ui/`
 * (split pane, thanh câu hỏi, tô vàng + ghi chú, đồng hồ, màn kiểm tra trước khi nộp,
 * xem lại bằng chứng). Nhóm Listening/Reading và nhóm Phòng thi cùng dùng.
 *
 *   const text = useExamUiText()
 *   text('submit')                       -> "Nộp bài" / "Submit"
 *   text('minutesLeft', { n: 17 })       -> "Còn 17 phút"
 *
 * Luật viết (04-DESIGN-SYSTEM mục 11): câu ngắn, không VIẾT HOA tiếng Việt,
 * không đổ lỗi; sai = "Chưa đúng" + bước tiếp theo.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { useLanguage } from '../../translations/language-context'

export const EXAM_UI_TEXT = {
  /* ---------- khung chung ---------- */
  saveAndExit: { vi: 'Lưu & thoát', en: 'Save & exit' },
  practiceMode: { vi: 'Luyện tập', en: 'Practice' },
  examMode: { vi: 'Thi thật', en: 'Exam mode' },
  testMode: { vi: 'Kiểm tra', en: 'Test' },
  notes: { vi: 'Ghi chú', en: 'Notes' },
  notesCount: { vi: 'Ghi chú ({n})', en: 'Notes ({n})' },
  display: { vi: 'Hiển thị', en: 'Display' },
  shortcuts: { vi: 'Phím tắt', en: 'Shortcuts' },
  saved: { vi: 'Đã lưu', en: 'Saved' },

  /* ---------- split pane ---------- */
  resizePanes: { vi: 'Kéo để đổi độ rộng 2 cột (phím ← →)', en: 'Drag to resize the columns (← → keys)' },

  /* ---------- thanh câu hỏi ---------- */
  questionNavigator: { vi: 'Danh sách câu hỏi', en: 'Question list' },
  previousQuestion: { vi: 'Câu trước', en: 'Previous question' },
  nextQuestion: { vi: 'Câu sau', en: 'Next question' },
  partProgress: { vi: '{done}/{total}', en: '{done} of {total}' },
  answeredOf: { vi: 'Đã làm {done}/{total}', en: '{done}/{total} answered' },
  questionStatus: { vi: 'Câu {n}', en: 'Question {n}' },
  statusAnswered: { vi: 'đã làm', en: 'answered' },
  statusBlank: { vi: 'chưa làm', en: 'not answered' },
  statusFlagged: { vi: 'đã gắn cờ', en: 'flagged' },
  statusCurrent: { vi: 'đang xem', en: 'current' },
  statusCorrect: { vi: 'đúng', en: 'correct' },
  statusIncorrect: { vi: 'chưa đúng', en: 'incorrect' },

  /* ---------- câu hỏi ---------- */
  flagForReview: { vi: 'Gắn cờ xem lại sau', en: 'Flag for review' },
  unflag: { vi: 'Bỏ cờ', en: 'Remove flag' },
  answerFor: { vi: 'Đáp án câu {n}', en: 'Answer for question {n}' },
  typeHere: { vi: 'Gõ đáp án', en: 'Type your answer' },
  wordLimitChip: { vi: 'Tối đa {n} từ', en: 'Max {n} words' },
  wordLimitChipOne: { vi: 'Tối đa 1 từ', en: 'One word only' },
  wordLimitNumber: { vi: 'và/hoặc 1 số', en: 'and/or a number' },
  wordLimitOnlyNumber: { vi: 'Chỉ 1 con số', en: 'A number only' },
  overWordLimit: { vi: 'Quá số từ cho phép', en: 'Over the word limit' },
  unikeyTip: { vi: 'Mẹo: tắt bộ gõ tiếng Việt (Unikey) trước khi gõ tiếng Anh.', en: 'Tip: turn off Vietnamese typing (Unikey) before typing English.' },
  sharedOptions: { vi: 'Danh sách lựa chọn', en: 'List of options' },
  chooseLabel: { vi: 'Chọn {label}', en: 'Choose {label}' },
  yourAnswer: { vi: 'Bạn chọn', en: 'Your answer' },
  yourAnswerTyped: { vi: 'Bạn viết', en: 'You wrote' },
  noAnswer: { vi: 'Bỏ trống', en: 'No answer' },
  correctAnswer: { vi: 'Đáp án', en: 'Answer' },
  correct: { vi: 'Đúng', en: 'Correct' },
  incorrect: { vi: 'Chưa đúng', en: 'Not quite' },
  nearMiss: { vi: 'Gần đúng — kiểm tra chính tả', en: 'Almost — check the spelling' },

  /* ---------- tô vàng + ghi chú ---------- */
  highlight: { vi: 'Tô vàng', en: 'Highlight' },
  addNote: { vi: 'Ghi chú', en: 'Note' },
  removeHighlight: { vi: 'Xoá tô', en: 'Remove' },
  notesTitle: { vi: 'Ghi chú của bạn', en: 'Your notes' },
  notesEmpty: { vi: 'Bôi đen chữ trong bài rồi chọn "Ghi chú". Ghi chú tự lưu.', en: 'Select text in the passage and choose "Note". Notes save automatically.' },
  notePlaceholder: { vi: 'Gõ ghi chú…', en: 'Type your note…' },
  deleteNote: { vi: 'Xoá', en: 'Delete' },
  closeNotes: { vi: 'Đóng ghi chú', en: 'Close notes' },
  goToText: { vi: 'Xem trong bài', en: 'Show in text' },

  /* ---------- hiển thị ---------- */
  contrast: { vi: 'Độ tương phản', en: 'Contrast' },
  contrastDefault: { vi: 'Theo giao diện', en: 'App theme' },
  contrastBlackOnWhite: { vi: 'Đen trên trắng', en: 'Black on white' },
  contrastWhiteOnBlack: { vi: 'Trắng trên đen', en: 'White on black' },
  contrastYellowOnBlack: { vi: 'Vàng trên đen', en: 'Yellow on black' },
  textSize: { vi: 'Cỡ chữ', en: 'Text size' },
  textRegular: { vi: 'Vừa', en: 'Regular' },
  textLarge: { vi: 'Lớn', en: 'Large' },
  textExtraLarge: { vi: 'Rất lớn', en: 'Extra large' },

  /* ---------- đồng hồ ---------- */
  minutesLeft: { vi: 'Còn {n} phút', en: '{n} minutes left' },
  oneMinuteLeft: { vi: 'Còn 1 phút', en: '1 minute left' },
  secondsLeft: { vi: 'Còn {n} giây', en: '{n} seconds left' },
  timerHidden: { vi: 'Đồng hồ đang ẩn', en: 'Timer hidden' },
  hideTimer: { vi: 'Ẩn đồng hồ', en: 'Hide timer' },
  showTimer: { vi: 'Hiện đồng hồ', en: 'Show timer' },
  timeUp: { vi: 'Hết giờ — bài đã được nộp tự động.', en: "Time's up — your answers were submitted." },

  /* ---------- kiểm tra trước khi nộp ---------- */
  reviewTitle: { vi: 'Kiểm tra trước khi nộp', en: 'Check before you submit' },
  reviewAnswered: { vi: 'Đã làm {done}/{total}', en: '{done}/{total} answered' },
  reviewBlank: { vi: '{n} câu bỏ trống', en: '{n} blank' },
  reviewFlagged: { vi: '{n} câu gắn cờ', en: '{n} flagged' },
  reviewBlankList: { vi: 'Còn trống: câu {list}', en: 'Still blank: {list}' },
  reviewFlaggedList: { vi: 'Đã gắn cờ: câu {list}', en: 'Flagged: {list}' },
  reviewAllDone: { vi: 'Bạn đã làm hết các câu. Bấm vào số câu để xem lại.', en: 'Every question is answered. Click a number to check it.' },
  reviewNoPenalty: { vi: 'IELTS không trừ điểm câu sai — câu nào còn trống, cứ đoán.', en: 'IELTS has no penalty for wrong answers — guess any blanks.' },
  reviewFinal: { vi: 'Sau khi nộp sẽ không sửa được đáp án.', en: "You can't change answers after submitting." },
  // bản dành cho bài viết (Writing): đếm "bài", không khuyên "cứ đoán"
  reviewBlankTasks: { vi: '{n} bài chưa viết', en: '{n} not written' },
  reviewBlankListTasks: { vi: 'Chưa viết: Task {list}', en: 'Not written yet: Task {list}' },
  reviewNoPenaltyTasks: { vi: 'Bài để trống không được chấm — viết vài câu vẫn hơn bỏ trống.', en: 'A blank task gets no score — a few sentences beat nothing.' },
  reviewAllDoneTasks: { vi: 'Bạn đã viết đủ các bài. Bấm vào số bài để đọc lại.', en: 'Every task has an answer. Click a number to reread it.' },
  keepWorking: { vi: 'Làm tiếp', en: 'Keep working' },
  submit: { vi: 'Nộp bài', en: 'Submit' },
  checkAndSubmit: { vi: 'Kiểm tra & nộp', en: 'Review & submit' },

  /* ---------- xem lại bằng chứng ---------- */
  locate: { vi: 'Tìm trong bài', en: 'Find in text' },
  locateInTranscript: { vi: 'Xem lời thoại', en: 'Show in transcript' },
  explain: { vi: 'Giải thích', en: 'Explain' },
  hideExplain: { vi: 'Thu gọn', en: 'Hide' },
  listenFromHere: { vi: 'Nghe từ đoạn này', en: 'Listen from here' },
  questionSays: { vi: 'Câu hỏi nói', en: 'The question says' },
  textSays: { vi: 'Trong bài', en: 'The text says' },
  sameWords: { vi: 'Từ khoá để dò', en: 'Keywords to scan for' },
  paraphrase: { vi: 'Cách nói khác (paraphrase)', en: 'Paraphrase' },
  evidenceInParagraph: { vi: 'Bằng chứng ở đoạn {label}', en: 'Evidence in paragraph {label}' },
  noEvidenceFound: { vi: 'Bài không nói tới ý này — thường là NOT GIVEN.', en: 'The text does not cover this — often NOT GIVEN.' },

  /* ---------- kết quả ---------- */
  resultTitle: { vi: 'Kết quả', en: 'Results' },
  correctCount: { vi: '{correct}/{total} câu đúng', en: '{correct}/{total} correct' },
  percentCorrect: { vi: '{p}% câu đúng', en: '{p}% correct' },
  // band không hiện sau 1 task (luật D6.23) — chỉ ở trang Tiến độ khi đủ 20 câu
  bandLaterNote: {
    vi: 'Band ước tính sẽ hiện ở trang Tiến độ khi kỹ năng này có đủ 20 câu.',
    en: 'Your estimated band appears on the Progress page once this skill has 20 answered questions.',
  },
  byQuestionType: { vi: 'Theo dạng câu hỏi', en: 'By question type' },
  wentWell: { vi: 'Làm tốt', en: 'Went well' },
  toImprove: { vi: 'Để làm tốt hơn', en: 'To improve' },
  retryWrong: { vi: 'Làm lại câu sai', en: 'Retry wrong answers' },
  continue: { vi: 'Tiếp tục', en: 'Continue' },
  reviewAnswers: { vi: 'Xem lại từng câu', en: 'Review each question' },
} satisfies Record<string, { vi: string; en: string }>

export type ExamUiTextKey = keyof typeof EXAM_UI_TEXT

/** Hook trả về hàm lấy chữ theo ngôn ngữ đang chọn; `{tên}` trong câu được thay bằng giá trị. */
export function useExamUiText(): (key: ExamUiTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = EXAM_UI_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return text
    },
    [language],
  )
}

/** Tên DẠNG câu hỏi (hiện ở "% theo dạng"). Giữ tên tiếng Anh của IELTS kèm tiếng Việt cho dễ hiểu. */
export const QUESTION_TYPE_NAMES: Record<string, { vi: string; en: string }> = {
  tfng: { vi: 'True / False / Not Given', en: 'True / False / Not Given' },
  ynng: { vi: 'Yes / No / Not Given', en: 'Yes / No / Not Given' },
  'matching-headings': { vi: 'Chọn tiêu đề đoạn', en: 'Matching headings' },
  'matching-information': { vi: 'Tìm đoạn chứa thông tin', en: 'Matching information' },
  map: { vi: 'Bản đồ / sơ đồ', en: 'Map / plan labelling' },
  matching: { vi: 'Nối thông tin', en: 'Matching' },
  mcq: { vi: 'Trắc nghiệm', en: 'Multiple choice' },
  form: { vi: 'Điền form', en: 'Form completion' },
  table: { vi: 'Điền bảng', en: 'Table completion' },
  note: { vi: 'Điền ghi chú', en: 'Note completion' },
  'flow-chart': { vi: 'Điền sơ đồ', en: 'Flow-chart completion' },
  summary: { vi: 'Điền tóm tắt', en: 'Summary completion' },
  sentence: { vi: 'Hoàn thành câu', en: 'Sentence completion' },
  'short-answer': { vi: 'Trả lời ngắn', en: 'Short answer' },
  'word-meaning': { vi: 'Tìm từ theo nghĩa', en: 'Word meaning' },
  gap: { vi: 'Điền từ', en: 'Gap fill' },
}
