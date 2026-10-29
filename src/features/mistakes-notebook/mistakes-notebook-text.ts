/**
 * mistakes-notebook-text.ts — CHỮ GIAO DIỆN CỦA /mistakes (sổ câu sai + "Ôn lại câu sai")
 * ----------------------------------------------------------------------------
 *   const text = useMistakesText()
 *   text.practiceCta               -> "Ôn lại câu sai"
 *   text.questionTypeName('fill-blank') -> "Điền vào chỗ trống"
 *
 * Giọng văn (psych-adult D4 luật 16): lỗi gọi là "chưa đúng", luôn kèm bước tiếp theo;
 * câu sai là "việc cần sửa", không phải thất bại. "Lỗi đã sửa" được đếm như tiến bộ (D8 luật 35).
 * Chữ dùng chung cho phần làm lại câu hỏi (exercise-retry/) cũng nằm ở đây.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import type { SkillName } from '../../content/content-types'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'
import type { QuestionTypeId } from './mistake-lookup'

const VI = {
  eyebrow: 'Sổ câu sai',
  title: 'Biến câu sai thành câu đúng',
  intro: 'Mỗi câu bạn làm chưa đúng được giữ lại đây. Làm lại đúng 1 lần là tính 1 lỗi đã sửa.',

  /* thẻ lớn "Ôn lại câu sai" */
  heroOpen: (n: number) => `${n} câu đang chờ sửa`,
  heroMinutes: (m: number) => `khoảng ${m} phút`,
  heroRoundNote: (n: number) => `Mỗi lượt tối đa ${n} câu, câu sai lâu nhất trước.`,
  practiceCta: 'Ôn lại câu sai',
  fixedCount: (n: number) => `${n} lỗi đã sửa`,
  fixedRingLabel: (fixed: number, total: number) => `Đã sửa ${fixed} trên ${total} lỗi`,
  allFixedTitle: 'Đã sửa hết câu sai',
  allFixedText: 'Không còn câu nào chờ sửa. Học tiếp để gặp thử thách mới.',

  /* lọc */
  tabOpen: 'Chưa sửa',
  tabFixed: 'Đã sửa',
  tabAll: 'Tất cả',
  statusTabsLabel: 'Lọc theo trạng thái',
  skillFilterLabel: 'Lọc theo kỹ năng',
  allSkills: 'Mọi kỹ năng',
  typeFilterLabel: 'Dạng câu hỏi',

  /* thẻ câu sai */
  yourAnswer: 'Bạn trả lời',
  correctAnswer: 'Đáp án đúng',
  noAnswer: '(bỏ trống)',
  why: 'Vì sao',
  askAi: 'Hỏi AI vì sao',
  askingAi: 'AI đang giải thích…',
  aiError: 'Chưa hỏi được AI. Thử lại sau nhé.',
  aiTip: 'Mẹo nhớ',
  markUnderstood: 'Đã hiểu',
  markOpen: 'Ôn lại câu này',
  retryOne: 'Làm lại',
  timesWrong: (n: number) => `Sai ${n} lần`,
  fixedBadge: 'Đã sửa',
  sourceLesson: 'Bài học',
  sourceMiniTest: 'Kiểm tra nhanh',
  sourceExam: 'Đề thi',
  sourceReview: 'Ôn tập',
  questionsCount: (n: number) => `${n} câu`,
  showMore: (n: number) => `Xem thêm ${n} câu`,
  showLess: 'Thu gọn',
  listenAudio: 'Nghe đoạn audio',
  showPassage: 'Xem đoạn văn',
  hidePassage: 'Ẩn đoạn văn',

  /* trống */
  emptyTitle: 'Chưa có câu sai nào',
  emptyText: '{mascot} sẽ gom các câu bạn làm chưa đúng vào đây để ôn lại.',
  emptyAction: 'Học tiếp',
  emptyFilterTitle: 'Không có câu nào ở mục này',
  emptyFilterText: 'Thử chọn kỹ năng hoặc trạng thái khác.',
  clearFilters: 'Bỏ lọc',

  /* 5 kỹ năng + dạng câu */
  skillName: { vocabulary: 'Từ vựng & ngữ pháp', listening: 'Nghe', reading: 'Đọc', speaking: 'Nói', writing: 'Viết' } as Record<SkillName, string>,
  questionTypeName: {
    'multiple-choice': 'Trắc nghiệm',
    'fill-blank': 'Điền vào chỗ trống',
    'arrange-words': 'Sắp xếp câu',
    'match-pairs': 'Nối cặp',
    'true-false': 'Đúng / Sai',
    'listen-choose': 'Nghe rồi chọn',
    'listen-type': 'Nghe chép chính tả',
    'speak-sentence': 'Đọc to câu',
    'speak-answer': 'Trả lời nói',
    'write-answer': 'Viết câu trả lời',
    'exam-choice': 'Trắc nghiệm / nối (đề thi)',
    'exam-tfng': 'True / False / Not Given',
    'exam-gap-fill': 'Điền từ (đề thi)',
    other: 'Câu khác',
  } as Record<QuestionTypeId, string>,

  /* ---------- làm lại câu hỏi (dùng chung với phiên ôn thẻ) ---------- */
  check: 'Kiểm tra',
  continue: 'Tiếp tục',
  typeHere: 'Gõ câu trả lời…',
  unikeyTip: 'Mẹo: tắt bộ gõ tiếng Việt (Unikey) trước khi gõ tiếng Anh.',
  arrangeHint: 'Bấm các thẻ theo đúng thứ tự',
  clearArrange: 'Xếp lại',
  selfCheckSay: 'Đọc to câu này, rồi xem gợi ý.',
  selfCheckRecall: 'Nhớ lại đáp án trong đầu, rồi bấm xem.',
  selfCheckWrite: 'Nghĩ câu trả lời của bạn, rồi so với bài mẫu.',
  revealAnswer: 'Xem đáp án',
  selfGotIt: 'Mình đã đúng',
  selfMissed: 'Chưa đúng',
  correctTitle: 'Chính xác!',
  correctFixedTitle: 'Chính xác — đã sửa 1 lỗi!',
  wrongTitle: 'Chưa đúng',
  wrongAnswerIs: (answer: string) => `Đáp án: ${answer}`,
  nearMiss: (answer: string) => `Gần đúng rồi — viết chuẩn là "${answer}".`,
  sampleAnswer: 'Bài mẫu / đáp án',
  missedBeforeLabel: 'Câu sai lúc nãy',
  chooseKeys: 'Phím 1–4 để chọn, Enter để kiểm tra',
  enterToContinue: 'Enter để tiếp tục',
  replayAudio: 'Nghe lại',

  /* ---------- lượt "Ôn lại câu sai" (toàn màn hình) ---------- */
  exit: 'Lưu & thoát',
  practiceProgress: 'Tiến độ lượt sửa lỗi',
  fixedSoFar: (n: number) => `Đã sửa ${n}`,
  practiceDoneTitle: (fixed: number, total: number) => (fixed === total ? `Sửa xong cả ${total} lỗi!` : `Bạn đã sửa ${fixed}/${total} lỗi`),
  practiceDoneText: (left: number) =>
    left === 0 ? 'Các câu này đã được hẹn ôn lại sau để nhớ lâu.' : `${left} câu còn chưa đúng vẫn nằm trong sổ — lượt sau sẽ dễ hơn.`,
  fixedTotal: (n: number) => `Tổng cộng ${n} lỗi đã sửa`,
  stepRetryLeft: (n: number) => `Làm lại ${n} câu còn sai`,
  stepRetryLeftMeta: 'Ngay bây giờ, khi còn nhớ',
  stepMoreMistakes: (n: number) => `Sửa tiếp ${n} câu`,
  stepMoreMistakesMeta: (m: number) => `Lượt mới · khoảng ${m} phút`,
  stepReviewCards: (n: number) => `Ôn ${n} thẻ từ vựng`,
  stepReviewCardsMeta: (m: number) => `Đến hạn hôm nay · khoảng ${m} phút`,
  stepLearn: 'Học tiếp',
  stepDone: 'Xong hôm nay',
  stepDoneMeta: 'Nghỉ ngơi — mai gặp lại',
  backToNotebook: 'Về sổ câu sai',
  nextStepsTitle: '{mascot} gợi ý bước tiếp theo',
}

type MistakesText = typeof VI

const EN: MistakesText = {
  eyebrow: 'Mistake book',
  title: 'Turn mistakes into right answers',
  intro: 'Every question you missed is kept here. Get it right once and it counts as a mistake fixed.',

  heroOpen: (n) => `${n} questions to fix`,
  heroMinutes: (m) => `about ${m} min`,
  heroRoundNote: (n) => `Up to ${n} per round, oldest mistakes first.`,
  practiceCta: 'Retry mistakes',
  fixedCount: (n) => `${n} mistakes fixed`,
  fixedRingLabel: (fixed, total) => `Fixed ${fixed} of ${total} mistakes`,
  allFixedTitle: 'Every mistake is fixed',
  allFixedText: 'Nothing left to fix. Keep learning to meet new challenges.',

  tabOpen: 'To fix',
  tabFixed: 'Fixed',
  tabAll: 'All',
  statusTabsLabel: 'Filter by status',
  skillFilterLabel: 'Filter by skill',
  allSkills: 'All skills',
  typeFilterLabel: 'Question type',

  yourAnswer: 'Your answer',
  correctAnswer: 'Correct answer',
  noAnswer: '(left blank)',
  why: 'Why',
  askAi: 'Ask AI why',
  askingAi: 'AI is explaining…',
  aiError: "Couldn't reach the AI. Please try again later.",
  aiTip: 'Memory tip',
  markUnderstood: 'Got it',
  markOpen: 'Review again',
  retryOne: 'Retry',
  timesWrong: (n) => `Missed ${n}×`,
  fixedBadge: 'Fixed',
  sourceLesson: 'Lesson',
  sourceMiniTest: 'Quick check',
  sourceExam: 'Test',
  sourceReview: 'Review',
  questionsCount: (n) => `${n} questions`,
  showMore: (n) => `Show ${n} more`,
  showLess: 'Show less',
  listenAudio: 'Play the audio',
  showPassage: 'Show passage',
  hidePassage: 'Hide passage',

  emptyTitle: 'No mistakes yet',
  emptyText: '{mascot} collects every question you miss here so you can retry it.',
  emptyAction: 'Keep learning',
  emptyFilterTitle: 'Nothing here',
  emptyFilterText: 'Try another skill or status.',
  clearFilters: 'Clear filters',

  skillName: { vocabulary: 'Vocabulary & grammar', listening: 'Listening', reading: 'Reading', speaking: 'Speaking', writing: 'Writing' },
  questionTypeName: {
    'multiple-choice': 'Multiple choice',
    'fill-blank': 'Fill in the blank',
    'arrange-words': 'Build the sentence',
    'match-pairs': 'Match pairs',
    'true-false': 'True / False',
    'listen-choose': 'Listen and choose',
    'listen-type': 'Dictation',
    'speak-sentence': 'Read aloud',
    'speak-answer': 'Spoken answer',
    'write-answer': 'Written answer',
    'exam-choice': 'Choice / matching (test)',
    'exam-tfng': 'True / False / Not Given',
    'exam-gap-fill': 'Gap fill (test)',
    other: 'Other',
  },

  check: 'Check',
  continue: 'Continue',
  typeHere: 'Type your answer…',
  unikeyTip: 'Tip: turn off your Vietnamese keyboard (Unikey) before typing English.',
  arrangeHint: 'Tap the tiles in the right order',
  clearArrange: 'Reset',
  selfCheckSay: 'Say it out loud, then check.',
  selfCheckRecall: 'Recall the answer in your head, then reveal it.',
  selfCheckWrite: 'Think of your answer, then compare with the model.',
  revealAnswer: 'Show answer',
  selfGotIt: 'I got it right',
  selfMissed: 'Not yet',
  correctTitle: 'Correct!',
  correctFixedTitle: 'Correct — one mistake fixed!',
  wrongTitle: 'Not quite',
  wrongAnswerIs: (answer) => `Answer: ${answer}`,
  nearMiss: (answer) => `Almost — it's spelled "${answer}".`,
  sampleAnswer: 'Model answer',
  missedBeforeLabel: 'Missed a moment ago',
  chooseKeys: 'Keys 1–4 to choose, Enter to check',
  enterToContinue: 'Enter to continue',
  replayAudio: 'Play again',

  exit: 'Save & exit',
  practiceProgress: 'Retry round progress',
  fixedSoFar: (n) => `Fixed ${n}`,
  practiceDoneTitle: (fixed, total) => (fixed === total ? `All ${total} mistakes fixed!` : `You fixed ${fixed}/${total} mistakes`),
  practiceDoneText: (left) =>
    left === 0 ? "They're scheduled for a later review so they stick." : `${left} still need work and stay in the book — next round will be easier.`,
  fixedTotal: (n) => `${n} mistakes fixed in total`,
  stepRetryLeft: (n) => `Retry the ${n} left`,
  stepRetryLeftMeta: 'Right now, while it is fresh',
  stepMoreMistakes: (n) => `Fix ${n} more`,
  stepMoreMistakesMeta: (m) => `New round · about ${m} min`,
  stepReviewCards: (n) => `Review ${n} word cards`,
  stepReviewCardsMeta: (m) => `Due today · about ${m} min`,
  stepLearn: 'Keep learning',
  stepDone: 'Done for today',
  stepDoneMeta: 'Rest now — see you tomorrow',
  backToNotebook: 'Back to mistake book',
  nextStepsTitle: '{mascot} suggests',
}

function withMascotName<T extends object>(table: T): T {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(table)) {
    if (typeof value === 'string') result[key] = fillMascotName(value)
    else if (typeof value === 'function') result[key] = (...args: unknown[]) => fillMascotName((value as (...a: unknown[]) => string)(...args))
    else result[key] = value
  }
  return result as T
}

const TEXT_BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

export function useMistakesText(): MistakesText {
  const { language } = useLanguage()
  return useMemo(() => TEXT_BY_LANGUAGE[language], [language])
}
