/**
 * placement-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ GIAO DIỆN CỦA /start (chọn mục tiêu + bài xếp lớp) VÀ /start/result — 2 ngôn ngữ.
 *   const text = usePlacementText()
 *   text.startTitle                 -> "Bạn học để làm gì?"
 *   text.questionNumber(3)          -> "Câu 3"
 *
 * Luật viết (04-DESIGN-SYSTEM mục 11 + psych-adult A14/A15):
 *   - xưng "bạn", mascot tự xưng tên ({mascot} được tự thay bằng tên trong mascot-name.ts)
 *   - tiêu đề ≤ 6 từ, câu ≤ 2 dòng; không "thông minh / giỏi quá / thiên tài"
 *   - trong lúc làm bài KHÔNG nói đúng/sai — chỉ động viên nhẹ
 *   - không viết HOA toàn bộ tiếng Việt
 * Câu hỏi bài xếp lớp luôn là tiếng Anh (nội dung học); chỉ hướng dẫn đổi theo VI/EN.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system'
import { useLanguage } from '../../translations/language-context'

const VI = {
  /* ---------- bước 1: chọn mục tiêu ---------- */
  stepNames: ['Mục tiêu', 'Bài xếp lớp', 'Lộ trình'],
  mascotHello: 'Chào bạn! Mình là {mascot}. Chọn mục tiêu dưới đây, rồi mình làm bài xếp lớp nhé.',
  goalQuestion: 'Bạn học để làm gì?',
  trackGeneral: 'Tiếng Anh tổng quát',
  trackGeneralHint: 'Giao tiếp, đọc hiểu, dùng hằng ngày',
  trackIelts: 'Luyện thi IELTS',
  trackIeltsHint: 'Lộ trình rõ ràng tới band 6.5',
  startTest: 'Bắt đầu bài xếp lớp',
  testFacts: 'Khoảng 5 phút · không tính giờ · xem kết quả ngay',
  beginnerLink: 'Tôi mới bắt đầu từ con số 0',
  beginnerLinkHint: 'Bỏ qua bài xếp lớp, vào thẳng Level 1',
  chooseGoalFirst: 'Chọn mục tiêu phía trên trước nhé.',
  login: 'Đăng nhập',

  /* ---------- bước 2: bài xếp lớp ---------- */
  testTitle: 'Bài xếp lớp',
  questionNumber: (n: number) => `Câu ${n}`,
  aboutMax: 'tối đa 12 câu',
  dontKnow: 'Mình chưa biết câu này',
  next: 'Tiếp',
  listenTimes: (left: number) => (left > 0 ? `Bạn được nghe 2 lần · còn ${left} lần` : 'Đã nghe đủ 2 lần — chọn đáp án bạn nghĩ là đúng'),
  listenPrompt: 'Bấm loa để nghe',
  passageLabel: 'Đọc đoạn ngắn',
  saveAndExit: 'Lưu & thoát',
  encouragements: [
    'Không tính giờ đâu, cứ thong thả nhé.',
    'Câu nào chưa biết, bấm "Mình chưa biết" — kết quả sẽ chính xác hơn đoán bừa.',
    '{mascot} đang chỉnh độ khó cho vừa sức bạn.',
    'Bạn đang làm rất đều tay.',
    'Sắp xong rồi, thêm vài câu nữa thôi.',
  ],
  exitTitle: 'Dừng bài xếp lớp?',
  exitBody: '{mascot} đã lưu chỗ bạn đang làm. Lúc nào quay lại cũng làm tiếp được.',
  exitKeepGoing: 'Làm tiếp',
  exitSeeResult: 'Xem kết quả luôn',
  exitLeave: 'Thoát',
  levelOneOfferTitle: 'Phần này hơi lạ với bạn?',
  levelOneOfferBody: 'Không sao cả. Bạn có thể bắt đầu ngay từ Level 1 — lộ trình dạy từ con số 0.',
  levelOneOfferStart: 'Bắt đầu Level 1',
  levelOneOfferContinue: 'Làm tiếp',
  finishTitle: 'Xong rồi!',
  finishBody: '{mascot} đang vẽ lộ trình cho bạn…',

  /* ---------- màn kết quả ---------- */
  resultEyebrow: 'Kết quả xếp lớp',
  resultTitle: (level: number) => `Bạn bắt đầu ở Level ${level}`,
  bandChip: (range: string) => `khoảng band ${range}`,
  lowConfidence: 'Ước lượng sơ bộ — sẽ chính xác hơn sau vài bài học.',
  stretchHint: (next: number, current: number) => `Bạn đã sát Level ${next}. Sau khi lưu, làm bài kiểm tra Level ${current} để lên thẳng.`,
  selfReported: 'Bạn chọn bắt đầu từ con số 0 — Level 1 dạy từ chào hỏi, số đếm. Muốn đo trình độ thì làm bài xếp lớp bất cứ lúc nào.',
  bySkillTitle: 'Bạn đã làm',
  skillNames: { vocabulary: 'Từ vựng', grammar: 'Ngữ pháp', listening: 'Nghe', reading: 'Đọc' },
  routeTitle: 'Lộ trình của bạn',
  routeSub: 'Mỗi level gồm nhiều chặng ngắn 5–7 bài. Xong chặng nào, thấy tiến bộ ngay chặng đó.',
  youAreHere: 'Bạn ở đây',
  goal: 'Mục tiêu 6.5',
  endowedDone: 'Bài xếp lớp',
  endowedDoneHint: 'đã xong',
  firstUnitLabel: 'Chặng 1',
  planTitle: 'Kế hoạch',
  planLessons: (n: number) => `${n} bài`,
  planLessonsSub: (units: number, minutes: number) => `${units} chặng · mỗi bài ~${minutes} phút`,
  planPace: 'phút mỗi ngày',
  planPaceLabel: 'Số phút học mỗi ngày',
  planMonths: (months: number) => `~${months} tháng`,
  planMonthsSub: (label: string) => `tới mốc ${label}`,
  planGoalReached: 'Đã chạm 6.5',
  planGoalReachedSub: 'giữ phong độ + luyện đề',
  planHonest: (hours: number) =>
    `Ước tính thật: lên 1 bậc trình độ thường cần ~200 giờ luyện tập (mốc này còn ~${hours} giờ). Nghe nhạc, xem phim tiếng Anh thêm sẽ nhanh hơn.`,
  intentionLabel: 'Hẹn giờ học (không bắt buộc)',
  intentionPrefix: 'Tôi sẽ học',
  intentionAt: 'lúc',
  intentionCues: ['sau bữa tối', 'trước khi ngủ', 'giờ nghỉ trưa', 'sau giờ học', 'sáng sớm'],
  intentionCueNone: 'chọn lúc…',
  reviewToggle: (n: number) => `Xem lại ${n} câu đã làm`,
  reviewCorrect: 'Đúng',
  reviewWrong: 'Chưa đúng',
  reviewAnswer: 'Đáp án:',
  retake: 'Làm lại bài xếp lớp',
  noResultTitle: 'Chưa có kết quả',
  noResultBody: 'Làm bài xếp lớp 5 phút để {mascot} vẽ lộ trình cho bạn nhé.',
  noResultCta: 'Làm bài xếp lớp',

  /* ---------- lưu (đăng ký) ---------- */
  saveTitle: 'Lưu lộ trình của bạn',
  saveSub: 'Tạo tài khoản gia đình — 30 giây, rồi vào học luôn.',
  saveButton: 'Lưu lộ trình & học ngay',
  loggedInTitle: (name: string) => `Chào ${name}!`,
  loggedInSub: 'Lưu kết quả này vào lộ trình của bạn? Tiến độ cũ vẫn giữ nguyên.',
  loggedInButton: 'Lưu & học ngay',
  haveAccountLogin: 'Đã có tài khoản? Đăng nhập',
  applying: 'Đang lưu lộ trình…',
}

type PlacementText = typeof VI

const EN: PlacementText = {
  stepNames: ['Goal', 'Placement', 'Your path'],
  mascotHello: "Hi! I'm {mascot}. Pick your goal below, then we'll do a quick placement check.",
  goalQuestion: 'Why are you learning?',
  trackGeneral: 'General English',
  trackGeneralHint: 'Conversation, reading, everyday use',
  trackIelts: 'IELTS preparation',
  trackIeltsHint: 'A clear path to band 6.5',
  startTest: 'Start the placement test',
  testFacts: 'About 5 minutes · no timer · instant result',
  beginnerLink: "I'm starting from zero",
  beginnerLinkHint: 'Skip the test and go straight to Level 1',
  chooseGoalFirst: 'Choose your goal above first.',
  login: 'Log in',

  testTitle: 'Placement test',
  questionNumber: (n: number) => `Question ${n}`,
  aboutMax: 'up to 12 questions',
  dontKnow: "I don't know this one",
  next: 'Next',
  listenTimes: (left: number) => (left > 0 ? `You can listen twice · ${left} left` : "You've listened twice — pick your best answer"),
  listenPrompt: 'Press the speaker to listen',
  passageLabel: 'Read the short text',
  saveAndExit: 'Save & exit',
  encouragements: [
    'No timer — take your time.',
    'Not sure? Press "I don\'t know" — it makes your result more accurate than guessing.',
    '{mascot} is adjusting the difficulty to suit you.',
    "You're working steadily.",
    'Almost done, just a few more.',
  ],
  exitTitle: 'Pause the placement test?',
  exitBody: '{mascot} saved your place. Come back any time to continue.',
  exitKeepGoing: 'Keep going',
  exitSeeResult: 'See my result now',
  exitLeave: 'Leave',
  levelOneOfferTitle: 'Does this feel unfamiliar?',
  levelOneOfferBody: 'No problem. You can start right at Level 1 — it teaches English from zero.',
  levelOneOfferStart: 'Start Level 1',
  levelOneOfferContinue: 'Keep going',
  finishTitle: 'All done!',
  finishBody: '{mascot} is drawing your learning path…',

  resultEyebrow: 'Placement result',
  resultTitle: (level: number) => `You start at Level ${level}`,
  bandChip: (range: string) => `about band ${range}`,
  lowConfidence: 'A first estimate — it gets more accurate after a few lessons.',
  stretchHint: (next: number, current: number) => `You're close to Level ${next}. After saving, take the Level ${current} test to move straight up.`,
  selfReported: 'You chose to start from zero — Level 1 begins with greetings and numbers. Take the placement test any time to measure your level.',
  bySkillTitle: 'You answered',
  skillNames: { vocabulary: 'Vocabulary', grammar: 'Grammar', listening: 'Listening', reading: 'Reading' },
  routeTitle: 'Your path',
  routeSub: 'Each level is made of short units of 5–7 lessons. Finish a unit, see the progress right away.',
  youAreHere: "You're here",
  goal: 'Goal 6.5',
  endowedDone: 'Placement test',
  endowedDoneHint: 'done',
  firstUnitLabel: 'Unit 1',
  planTitle: 'Plan',
  planLessons: (n: number) => `${n} lessons`,
  planLessonsSub: (units: number, minutes: number) => `${units} units · ~${minutes} min each`,
  planPace: 'minutes a day',
  planPaceLabel: 'Minutes of study per day',
  planMonths: (months: number) => `~${months} months`,
  planMonthsSub: (label: string) => `to reach ${label}`,
  planGoalReached: 'At 6.5',
  planGoalReachedSub: 'keep it up + practise tests',
  planHonest: (hours: number) =>
    `Honest estimate: one level up usually takes ~200 hours of practice (~${hours} hours to this milestone). Extra English films and music make it faster.`,
  intentionLabel: 'Plan a study time (optional)',
  intentionPrefix: "I'll study",
  intentionAt: 'at',
  intentionCues: ['after dinner', 'before bed', 'at lunch break', 'after school', 'early morning'],
  intentionCueNone: 'pick a moment…',
  reviewToggle: (n: number) => `Review the ${n} questions`,
  reviewCorrect: 'Correct',
  reviewWrong: 'Not quite',
  reviewAnswer: 'Answer:',
  retake: 'Retake the placement test',
  noResultTitle: 'No result yet',
  noResultBody: 'Take the 5-minute placement test so {mascot} can draw your path.',
  noResultCta: 'Take the placement test',

  saveTitle: 'Save your path',
  saveSub: 'Create a family account — 30 seconds, then start learning.',
  saveButton: 'Save my path & start',
  loggedInTitle: (name: string) => `Hi ${name}!`,
  loggedInSub: 'Save this result to your path? Your existing progress stays.',
  loggedInButton: 'Save & start learning',
  haveAccountLogin: 'Have an account? Log in',
  applying: 'Saving your path…',
}

/** Thay {mascot} trong mọi chuỗi (kể cả trong mảng) — chạy 1 lần khi tạo bộ chữ. */
function withMascotName(text: PlacementText): PlacementText {
  const fill = (value: unknown): unknown =>
    typeof value === 'string' ? fillMascotName(value) : Array.isArray(value) ? value.map(fill) : value
  return Object.fromEntries(Object.entries(text).map(([key, value]) => [key, fill(value)])) as PlacementText
}

const BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

/** Chữ /start + /start/result theo ngôn ngữ đang chọn. */
export function usePlacementText(): PlacementText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
