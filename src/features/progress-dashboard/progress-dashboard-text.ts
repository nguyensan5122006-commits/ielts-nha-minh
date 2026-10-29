/**
 * progress-dashboard-text.ts — CHỮ GIAO DIỆN CỦA /progress (bảng tiến độ)
 * ----------------------------------------------------------------------------
 *   const text = useDashboardText()
 *   text.bandRange(4.5, 5.5)   -> "4.5–5.5"
 *   text.projection(14, 'B1', '9–11 tháng')
 *
 * Giọng văn (psych-adult D6 + D7): SO VỚI CHÍNH MÌNH, không xếp hạng; band luôn là KHOẢNG
 * kèm độ tin cậy; kỳ vọng trung thực (dựa trên ~200 giờ cho mỗi bậc CEFR); không đổ lỗi khi nghỉ.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import type { SkillName } from '../../content/content-types'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'
import type { CefrLevel } from './dashboard-stats'

type Confidence = 'low' | 'medium' | 'high'

const VI = {
  eyebrow: 'Tiến độ',
  title: 'Bạn đã đi được bao xa',
  intro: 'So với chính bạn — không so với ai khác. Số liệu cập nhật sau mỗi bài học và phiên ôn.',
  sectionNavLabel: 'Trang tiến độ',

  /* ô số liệu */
  streakTile: 'Chuỗi ngày học',
  streakDays: (n: number) => `${n} ngày`,
  thisWeek: (n: number) => `Tuần này ${n}/7`,
  totalDays: (n: number) => `Tổng ${n} ngày học`,
  freezesLeft: (n: number) => `${n} bảo vệ chuỗi`,
  studiedToday: 'Hôm nay đã học',
  notYetToday: 'Hôm nay chưa học',
  wordsTile: 'Từ nhớ chắc',
  wordsTileHint: 'Độ bền trí nhớ ≥ 21 ngày',
  wordsOf: (n: number) => `trong ${n} từ đã gặp`,
  fixedTile: 'Lỗi đã sửa',
  fixedTileHint: (open: number) => (open ? `${open} câu đang chờ sửa` : 'Không còn câu chờ sửa'),
  minutesTile: 'Phút học mỗi ngày',
  minutesTileHint: (goal: number) => `Trung bình 14 ngày · mục tiêu ${goal} phút`,
  minutesValue: (m: number) => `${m} phút`,

  /* band */
  bandTitle: 'Band ước tính theo kỹ năng',
  bandSubtitle: (target: number) => `Mỗi thanh là một khoảng (không phải 1 con số). Vạch dọc = mục tiêu ${target}.`,
  goalLabel: (target: number) => `Mục tiêu ${target}`,
  bandRange: (low: number, high: number) => `${low.toFixed(1)}–${high.toFixed(1)}`,
  confidenceName: { low: 'tin cậy thấp', medium: 'tin cậy vừa', high: 'tin cậy cao' } as Record<Confidence, string>,
  bandSourceMeasured: 'từ bài thi / AI chấm',
  bandSourcePractice: 'ước từ bài luyện',
  gapToGoal: (from: number, to: number) => (to <= 0 ? 'Đã chạm mục tiêu' : from === to ? `còn ~${to} band` : `còn ~${from}–${to} band`),
  needMoreItems: (n: number) => `Cần thêm ${n} câu để ước tính`,
  needMoreWriting: (n: number) => `Cần thêm ${n} bài viết để ước tính`,
  bandNoteHonest: 'Band chỉ hiện khi đủ dữ liệu (≥ 20 câu mỗi kỹ năng, hoặc ≥ 2 bài viết/nói). Khoảng càng hẹp = càng chắc.',
  bandTableCaption: 'Bảng band ước tính',

  /* CEFR (track tổng quát) */
  cefrTitle: 'Bạn làm được gì bằng tiếng Anh',
  cefrSubtitle: 'Theo khung CEFR của châu Âu — mỗi kỹ năng một câu "bạn có thể…".',
  cefrYouAreHere: 'Bạn ở đây',
  cefrNotEnough: 'Học thêm vài bài để biết',

  /* dự kiến */
  projectionTitle: 'Mốc tiếp theo',
  projectionNext: (cefr: string, band: string) => `${cefr} · khoảng band ${band}`,
  projectionLine: (minutes: number, when: string) => `Với nhịp hiện tại ${minutes} phút/ngày, mốc tiếp theo dự kiến sau khoảng ${when}.`,
  projectionFaster: (minutes: number, when: string) => `Nếu học ${minutes} phút/ngày: khoảng ${when}.`,
  projectionNoPace: 'Học vài ngày để có nhịp học — {mascot} sẽ ước lượng thời gian tới mốc tiếp theo.',
  projectionBasis: 'Ước tính trung thực dựa trên khoảng 200 giờ học cho mỗi bậc CEFR. Học đều mỗi ngày quan trọng hơn học dồn.',
  projectionDone: 'Bạn đã tới mốc cao nhất của lộ trình (B2 · band 6.5).',
  monthsRange: (low: number, high: number) => (low === high ? `${low} tháng` : `${low}–${high} tháng`),
  underAMonth: 'chưa tới 1 tháng',
  hoursLeft: (h: number) => `≈ ${h} giờ học`,
  hoursLeftLabel: 'còn lại tới mốc',
  lessonsLeft: (n: number) => `${n} bài`,
  lessonsLeftLabel: 'tới hết level này',
  wordsNote: 'Từ ở cấp "Khắc sâu" đã nhớ được hơn 3 tuần. Ôn đúng hẹn để từ lên cấp.',
  reviewDue: (n: number) => `Ôn ${n} thẻ đến hạn`,
  levelProgress: (percent: number) => `Đã xong ${percent}% chặng hiện tại`,

  /* kỹ năng */
  skillsTitle: 'Từng kỹ năng',
  skillName: { vocabulary: 'Từ vựng & ngữ pháp', listening: 'Nghe', reading: 'Đọc', speaking: 'Nói', writing: 'Viết' } as Record<SkillName, string>,
  recentAccuracy: 'Đúng · 40 câu gần nhất',
  trendHint: 'So nửa sau với nửa trước của 40 câu gần nhất',
  itemsDone: (n: number) => `${n} câu đã làm`,
  trendLabel: 'Độ chính xác qua 40 câu gần nhất',
  trendUp: (n: number) => `▲ ${n} điểm`,
  trendDown: (n: number) => `▼ ${n} điểm`,
  trendFlat: 'ổn định',
  noAnswersYet: 'Chưa làm câu nào',

  /* lịch học */
  calendarTitle: 'Lịch học',
  calendarSubtitle: (weeks: number) => `${weeks} tuần gần nhất · ô đậm = học nhiều phút hơn`,
  legendLess: 'Ít',
  legendMore: 'Nhiều',
  legendFreeze: 'Bảo vệ chuỗi',
  legendNone: 'Nghỉ',
  dayTooltip: (date: string, minutes: number) => (minutes > 0 ? `${date}: ${minutes} phút` : `${date}: có học`),
  dayRestTooltip: (date: string) => `${date}: nghỉ`,
  dayFreezeTooltip: (date: string) => `${date}: bảo vệ chuỗi đã giữ chuỗi cho bạn`,
  weekdayShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  monthShort: (month: number) => `Th${month}`,

  /* phút */
  minutesTitle: 'Phút học 14 ngày qua',
  minutesGoal: (n: number) => `Mục tiêu ${n} phút/ngày`,
  minutesBarTooltip: (date: string, minutes: number) => `${date}: ${minutes} phút`,
  today: 'Hôm nay',

  /* từ vựng */
  wordsTitle: 'Độ nhớ từ vựng',
  wordsLink: 'Mở sổ từ vựng',

  /* bài viết */
  writingTitle: 'Bài viết: bạn tự chấm vs AI chấm',
  writingSubtitle: 'Tự chấm sát với AI = bạn đã "nhìn" bài mình như giám khảo.',
  legendSelf: 'Bạn tự chấm',
  legendAi: 'AI chấm (khoảng)',
  writingGapSummary: (first: string, last: string) => `Độ lệch tự chấm: lúc đầu ${first} band, gần đây ${last} band.`,
  writingGapCloser: 'Mắt chấm của bạn đang chuẩn dần.',
  writingGapWider: 'Thử đối chiếu checklist 4 tiêu chí kỹ hơn trước khi tự chấm.',
  writingEntryTooltip: (index: number, self: string, ai: string) => `Bài ${index}: tự chấm ${self} · AI ${ai}`,
  writingEmpty: 'Viết 2 bài để thấy bạn tự chấm sát AI tới đâu.',
  writingEmptyAction: 'Luyện viết',
  essayLabel: (n: number) => `Bài ${n}`,

  /* trống */
  emptyTitle: 'Chưa có gì để đo',
  emptyText: 'Học bài đầu tiên — {mascot} sẽ vẽ tiến độ của bạn ở đây.',
  emptyAction: 'Học bài đầu tiên',
  continueLearning: 'Học tiếp',
  openReview: 'Ôn thẻ',
}

type DashboardText = typeof VI

const EN: DashboardText = {
  eyebrow: 'Progress',
  title: "How far you've come",
  intro: 'Compared with yourself — never with anyone else. Updated after every lesson and review.',
  sectionNavLabel: 'Progress page',

  streakTile: 'Study streak',
  streakDays: (n) => `${n} day${n === 1 ? '' : 's'}`,
  thisWeek: (n) => `This week ${n}/7`,
  totalDays: (n) => `${n} study days in total`,
  freezesLeft: (n) => `${n} streak freeze${n === 1 ? '' : 's'}`,
  studiedToday: 'Studied today',
  notYetToday: 'Not yet today',
  wordsTile: 'Words locked in',
  wordsTileHint: 'Memory stability ≥ 21 days',
  wordsOf: (n) => `of ${n} words met`,
  fixedTile: 'Mistakes fixed',
  fixedTileHint: (open) => (open ? `${open} still to fix` : 'Nothing left to fix'),
  minutesTile: 'Minutes per day',
  minutesTileHint: (goal) => `14-day average · goal ${goal} min`,
  minutesValue: (m) => `${m} min`,

  bandTitle: 'Estimated band by skill',
  bandSubtitle: (target) => `Each bar is a range (never a single number). Vertical line = goal ${target}.`,
  goalLabel: (target) => `Goal ${target}`,
  bandRange: (low, high) => `${low.toFixed(1)}–${high.toFixed(1)}`,
  confidenceName: { low: 'low confidence', medium: 'medium confidence', high: 'high confidence' },
  bandSourceMeasured: 'from tests / AI grading',
  bandSourcePractice: 'estimated from practice',
  gapToGoal: (from, to) => (to <= 0 ? 'Goal reached' : from === to ? `~${to} band to go` : `~${from}–${to} bands to go`),
  needMoreItems: (n) => `${n} more answers to estimate`,
  needMoreWriting: (n) => `${n} more essays to estimate`,
  bandNoteHonest: 'Bands appear only with enough data (≥ 20 answers per skill, or ≥ 2 essays/recordings). Narrower = more certain.',
  bandTableCaption: 'Estimated band table',

  cefrTitle: 'What you can do in English',
  cefrSubtitle: 'Based on the European CEFR scale — one "you can…" per skill.',
  cefrYouAreHere: 'You are here',
  cefrNotEnough: 'A few more lessons to tell',

  projectionTitle: 'Next milestone',
  projectionNext: (cefr, band) => `${cefr} · around band ${band}`,
  projectionLine: (minutes, when) => `At your current pace of ${minutes} min/day, the next milestone is about ${when} away.`,
  projectionFaster: (minutes, when) => `At ${minutes} min/day: about ${when}.`,
  projectionNoPace: 'Study for a few days to set a pace — {mascot} will estimate the time to your next milestone.',
  projectionBasis: 'An honest estimate based on about 200 study hours per CEFR level. Studying a little every day beats cramming.',
  projectionDone: "You've reached the top milestone of the path (B2 · band 6.5).",
  monthsRange: (low, high) => (low === high ? `${low} month${low === 1 ? '' : 's'}` : `${low}–${high} months`),
  underAMonth: 'less than a month',
  hoursLeft: (h) => `≈ ${h} study hours`,
  hoursLeftLabel: 'left to the milestone',
  lessonsLeft: (n) => `${n} lessons`,
  lessonsLeftLabel: 'to finish this level',
  wordsNote: 'Words at "Locked in" have stayed for 3+ weeks. Review on time to move words up.',
  reviewDue: (n) => `Review ${n} due cards`,
  levelProgress: (percent) => `${percent}% of the current level done`,

  skillsTitle: 'Skill by skill',
  skillName: { vocabulary: 'Vocabulary & grammar', listening: 'Listening', reading: 'Reading', speaking: 'Speaking', writing: 'Writing' },
  recentAccuracy: 'Correct · last 40 answers',
  trendHint: 'Latest 20 answers compared with the 20 before',
  itemsDone: (n) => `${n} answers`,
  trendLabel: 'Accuracy over the last 40 answers',
  trendUp: (n) => `▲ ${n} pts`,
  trendDown: (n) => `▼ ${n} pts`,
  trendFlat: 'steady',
  noAnswersYet: 'No answers yet',

  calendarTitle: 'Study calendar',
  calendarSubtitle: (weeks) => `Last ${weeks} weeks · darker = more minutes`,
  legendLess: 'Less',
  legendMore: 'More',
  legendFreeze: 'Streak freeze',
  legendNone: 'Rest',
  dayTooltip: (date, minutes) => (minutes > 0 ? `${date}: ${minutes} min` : `${date}: studied`),
  dayRestTooltip: (date) => `${date}: rest`,
  dayFreezeTooltip: (date) => `${date}: a streak freeze kept your streak`,
  weekdayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  monthShort: (month) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1],

  minutesTitle: 'Minutes, last 14 days',
  minutesGoal: (n) => `Goal ${n} min/day`,
  minutesBarTooltip: (date, minutes) => `${date}: ${minutes} min`,
  today: 'Today',

  wordsTitle: 'Word memory',
  wordsLink: 'Open word book',

  writingTitle: 'Writing: your score vs AI',
  writingSubtitle: 'When your own score matches the AI, you are reading your essay like an examiner.',
  legendSelf: 'Your self-score',
  legendAi: 'AI score (range)',
  writingGapSummary: (first, last) => `Self-score gap: ${first} band at first, ${last} band recently.`,
  writingGapCloser: 'Your marking eye is getting sharper.',
  writingGapWider: 'Check the 4-criteria checklist more carefully before scoring yourself.',
  writingEntryTooltip: (index, self, ai) => `Essay ${index}: you ${self} · AI ${ai}`,
  writingEmpty: 'Write 2 essays to see how close your self-score is to the AI.',
  writingEmptyAction: 'Practise writing',
  essayLabel: (n) => `#${n}`,

  emptyTitle: 'Nothing to measure yet',
  emptyText: 'Take your first lesson — {mascot} will chart your progress here.',
  emptyAction: 'Start your first lesson',
  continueLearning: 'Keep learning',
  openReview: 'Review cards',
}

/* ---------- câu "bạn có thể…" theo CEFR (track tổng quát hiện thay cho band) ---------- */
type CanDoTable = Record<SkillName, Record<CefrLevel, string>>
const CAN_DO_VI: CanDoTable = {
  vocabulary: {
    'Pre-A1': 'Bạn biết các từ quen thuộc nhất: chào hỏi, số đếm, màu sắc, gia đình.',
    A1: 'Bạn dùng được từ và câu đơn giản về bản thân và những thứ quanh mình.',
    A2: 'Bạn đủ từ cho việc hằng ngày: mua sắm, đi lại, công việc đơn giản.',
    B1: 'Bạn diễn đạt được hầu hết chủ đề quen thuộc, đôi khi phải nói vòng.',
    B2: 'Bạn có vốn từ rộng, chọn từ khá chính xác cho nhiều chủ đề.',
  },
  listening: {
    'Pre-A1': 'Bạn nghe ra vài từ và số khi người nói chậm, rõ.',
    A1: 'Bạn hiểu câu hỏi đơn giản về tên, tuổi, giờ giấc khi nói chậm.',
    A2: 'Bạn hiểu ý chính của thông báo, tin nhắn ngắn và rõ ràng.',
    B1: 'Bạn hiểu ý chính khi người ta nói chuẩn về chủ đề quen thuộc.',
    B2: 'Bạn theo được bài nói dài và lập luận khá phức tạp.',
  },
  reading: {
    'Pre-A1': 'Bạn đọc được biển báo và từ quen thuộc kèm hình.',
    A1: 'Bạn đọc hiểu tin nhắn, thiệp, bảng biểu rất ngắn.',
    A2: 'Bạn tìm được thông tin cụ thể trong quảng cáo, thực đơn, lịch trình.',
    B1: 'Bạn hiểu bài viết về chủ đề quen thuộc và thư cá nhân.',
    B2: 'Bạn đọc được bài báo và nhận ra quan điểm của người viết.',
  },
  speaking: {
    'Pre-A1': 'Bạn chào hỏi và nói tên mình bằng tiếng Anh.',
    A1: 'Bạn giới thiệu bản thân và hỏi đáp những câu rất đơn giản.',
    A2: 'Bạn nói chuyện ngắn về gia đình, công việc, sở thích.',
    B1: 'Bạn kể lại trải nghiệm và nêu lý do cho ý kiến của mình.',
    B2: 'Bạn trò chuyện khá trôi chảy và bảo vệ được quan điểm.',
  },
  writing: {
    'Pre-A1': 'Bạn viết được tên, tuổi và vài từ quen thuộc.',
    A1: 'Bạn viết được câu đơn giản và điền form thông tin cá nhân.',
    A2: 'Bạn viết được tin nhắn, ghi chú ngắn về việc hằng ngày.',
    B1: 'Bạn viết được đoạn văn liền mạch về chủ đề quen thuộc.',
    B2: 'Bạn viết được bài luận rõ ràng, có lập luận ủng hộ và phản bác.',
  },
}
const CAN_DO_EN: CanDoTable = {
  vocabulary: {
    'Pre-A1': 'You know the most common words: greetings, numbers, colours, family.',
    A1: 'You can use simple words and sentences about yourself and your surroundings.',
    A2: 'You have enough words for daily tasks: shopping, travel, simple work.',
    B1: 'You can talk about most familiar topics, sometimes by paraphrasing.',
    B2: 'You have a wide vocabulary and choose words fairly precisely.',
  },
  listening: {
    'Pre-A1': 'You catch some words and numbers when people speak slowly and clearly.',
    A1: 'You understand simple questions about name, age and time when spoken slowly.',
    A2: 'You get the main point of short, clear messages and announcements.',
    B1: 'You understand the main points of clear standard speech on familiar topics.',
    B2: 'You can follow extended speech and fairly complex arguments.',
  },
  reading: {
    'Pre-A1': 'You can read signs and familiar words with pictures.',
    A1: 'You understand very short messages, cards and forms.',
    A2: 'You can find specific information in ads, menus and timetables.',
    B1: 'You understand texts on familiar topics and personal letters.',
    B2: "You can read articles and recognise the writer's point of view.",
  },
  speaking: {
    'Pre-A1': 'You can greet people and say your name in English.',
    A1: 'You can introduce yourself and ask and answer very simple questions.',
    A2: 'You can have short conversations about family, work and hobbies.',
    B1: 'You can describe experiences and give reasons for your opinions.',
    B2: 'You can talk fairly fluently and defend a point of view.',
  },
  writing: {
    'Pre-A1': 'You can write your name, age and a few familiar words.',
    A1: 'You can write simple sentences and fill in a personal form.',
    A2: 'You can write short notes and messages about everyday matters.',
    B1: 'You can write connected paragraphs on familiar topics.',
    B2: 'You can write clear essays with arguments for and against.',
  },
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

const TEXT_BY_LANGUAGE = { vi: { ...withMascotName(VI), canDo: CAN_DO_VI }, en: { ...withMascotName(EN), canDo: CAN_DO_EN } }

export function useDashboardText() {
  const { language } = useLanguage()
  return useMemo(() => TEXT_BY_LANGUAGE[language], [language])
}
