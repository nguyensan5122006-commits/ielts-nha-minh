/**
 * vocabulary-review-text.ts — CHỮ GIAO DIỆN CỦA /review (ôn thẻ) VÀ /words (sổ từ vựng)
 * ----------------------------------------------------------------------------
 *   const text = useReviewText()
 *   text.startReview              -> "Ôn ngay" / "Review now"
 *   text.sessionSize(12, 3)       -> "12 thẻ ≈ 3 phút"
 *
 * Theo nút VI/EN của web (useLanguage). Nội dung học (từ, câu ví dụ) luôn là tiếng Anh.
 * Luật viết (04-DESIGN-SYSTEM mục 11 + psych-adult D4/D7): xưng "bạn", câu ngắn ≤ 2 dòng,
 * tiêu đề ≤ 6 từ, không "thông minh / giỏi quá", không gây cảm giác tội lỗi khi nghỉ.
 * {mascot} = tên mascot — useReviewText tự thay.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'
import type { MemoryLevel } from './memory-levels'

const VI = {
  /* ---------- thanh điều hướng chung của khu "Ôn tập" ---------- */
  sectionNavLabel: 'Khu ôn tập',
  navReview: 'Ôn thẻ',
  navWords: 'Sổ từ vựng',
  navMistakes: 'Sổ câu sai',
  navProgress: 'Tiến độ',

  /* ---------- 5 cấp độ nhớ ---------- */
  memoryLevelName: { 1: 'Mới gặp', 2: 'Quen mặt', 3: 'Nhớ', 4: 'Thuộc', 5: 'Khắc sâu' } as Record<MemoryLevel, string>,
  memoryLevelHint: {
    1: 'Vừa học hoặc vừa quên',
    2: 'Nhớ được 1–4 ngày',
    3: 'Nhớ được 4–10 ngày',
    4: 'Nhớ được 10–21 ngày',
    5: 'Nhớ được hơn 3 tuần',
  } as Record<MemoryLevel, string>,
  memoryLevelAria: (level: number, name: string) => `Cấp độ nhớ ${level}/5: ${name}`,

  /* ---------- /review — màn tổng quan "Thời điểm vàng" ---------- */
  reviewEyebrow: 'Ôn tập',
  reviewTitle: 'Ôn đúng lúc sắp quên',
  reviewIntro: 'Mỗi từ có "thời điểm vàng" riêng. Ôn đúng lúc đó, từ ngấm sâu hơn mà tốn ít phút nhất.',
  dueNowTitle: (n: number) => `${n} thẻ đang chờ bạn`,
  sessionSize: (cards: number, minutes: number) => `${cards} thẻ ≈ ${minutes} phút`,
  breakdownReviews: (n: number) => `${n} ôn lại`,
  breakdownNew: (n: number) => `${n} từ mới`,
  breakdownItems: (n: number) => `${n} câu từng sai`,
  startReview: 'Ôn ngay',
  openWords: 'Xem sổ từ vựng',
  nothingDueTitle: 'Chưa tới giờ ôn',
  nothingDueText: 'Thẻ của bạn đang "ngấm". Ôn sớm quá thì phí công — {mascot} sẽ báo khi tới lượt.',
  nextReviewIn: 'Lượt ôn tiếp theo sau',
  nextReviewAt: (time: string) => `khoảng ${time}`,
  learnNew: 'Học bài mới',
  noCardsTitle: 'Sổ ôn còn trống',
  noCardsText: 'Học xong 1 bài là từ mới tự vào đây, {mascot} hẹn giờ ôn giúp bạn.',
  startFirstLesson: 'Học bài đầu tiên',
  memoryChartTitle: (n: number) => `Độ nhớ của ${n} từ`,
  memoryChartHint: 'Bấm 1 cột để xem các từ ở cấp đó',
  forecastTitle: 'Lịch ôn 7 ngày tới',
  forecastToday: 'Hôm nay',
  forecastCards: (n: number) => `${n} thẻ`,
  weekdayShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  backlogTitle: 'Tạm dừng từ mới',
  backlogText: (n: number) => `Bạn còn ${n} thẻ cũ cần ôn. Ôn hết thẻ cũ trước để không quên — từ mới sẽ mở lại sau.`,
  dailyCapTitle: 'Hôm nay ôn đủ rồi',
  dailyCapText: 'Bạn đã ôn 100 thẻ hôm nay. Nghỉ thôi — ngủ đủ giúp trí nhớ chắc hơn.',
  newLimitNote: (opened: number, limit: number) => `Từ mới hôm nay: ${opened}/${limit}`,
  buttonsSetting: 'Nút chấm thẻ',
  buttonsTwo: '2 nút',
  buttonsFour: '4 nút',
  buttonsSettingHint: '2 nút: Quên / Nhớ. 4 nút: thêm Khó và Dễ để hẹn giờ chính xác hơn.',
  howItWorksTitle: 'Vì sao ôn kiểu này?',
  howItWorksText:
    'Thuật toán FSRS đoán lúc bạn sắp quên từng từ và hẹn đúng lúc đó (giữ khả năng nhớ khoảng 90%). Càng nhớ lâu, khoảng cách càng giãn ra.',

  /* ---------- phiên ôn (toàn màn hình) ---------- */
  exitSession: 'Lưu & thoát',
  sessionProgress: 'Tiến độ phiên ôn',
  cardCounter: (done: number, total: number) => `${done}/${total}`,
  frontPromptMeaning: 'Từ tiếng Anh nào?',
  frontPromptListen: 'Nghe và nhớ lại từ này',
  frontPromptItem: 'Câu bạn từng làm sai',
  againLabel: 'Câu lúc nãy chưa nhớ',
  newBadge: 'Từ mới',
  flip: 'Lật thẻ',
  flipHint: 'để lật thẻ',
  rateHint: 'Bạn nhớ tới đâu?',
  rateKeysHint: (keys: string) => `Phím ${keys}`,
  knowIt: 'Mình đã biết từ này',
  knowItHint: 'Bỏ qua, hẹn ôn rất lâu sau',
  ratingName: { again: 'Quên', hard: 'Khó', good: 'Nhớ', easy: 'Dễ' } as Record<'again' | 'hard' | 'good' | 'easy', string>,
  nextInterval: (when: string) => `gặp lại sau ${when}`,
  exampleLabel: 'Ví dụ',
  usageLabel: 'Lưu ý',
  listenUk: 'Nghe giọng Anh',
  listenExample: 'Nghe câu ví dụ',
  memoryNow: 'Độ nhớ hiện tại',
  itemCheck: 'Kiểm tra',
  itemContinue: 'Tiếp tục',

  /* ---------- màn kết thúc phiên ---------- */
  doneTitle: 'Xong phiên ôn!',
  doneSubtitle: (n: number) => `Bạn vừa ôn ${n} thẻ. Từ nào nhớ được hôm nay sẽ được hẹn xa hơn.`,
  statCards: 'Thẻ đã ôn',
  statRemembered: 'Nhớ ngay',
  statMinutes: 'Thời gian',
  minutesShort: (m: number) => `${m} phút`,
  strengthTitle: 'Độ bền trí nhớ',
  strengthHelp: 'Điểm hôm nay khác độ nhớ lâu dài. Ôn đúng hẹn để từ lên nấc cao hơn.',
  comeBackIn: (when: string) => `Ôn lại sau ${when} để lên nấc tiếp theo.`,
  nextStepsTitle: '{mascot} gợi ý bước tiếp theo',
  stepMistakesTitle: (n: number) => `Ôn lại ${n} câu sai`,
  stepMistakesMeta: (minutes: number) => `Sửa lỗi cũ · khoảng ${minutes} phút`,
  stepLearnTitle: 'Học tiếp',
  stepLearnMeta: (title: string) => title,
  stepWordsTitle: 'Xem sổ từ vựng',
  stepWordsMeta: (n: number) => `${n} từ nhớ chắc`,
  stepDoneTitle: 'Xong hôm nay',
  stepDoneMeta: 'Nghỉ ngơi — mai gặp lại',
  sessionEmptyTitle: 'Không còn thẻ để ôn',

  /* ---------- /words — sổ từ vựng ---------- */
  wordsEyebrow: 'Sổ từ vựng',
  wordsTitle: 'Những từ bạn đã gặp',
  wordsIntro: (total: number, known: number) => `${total} từ · ${known} từ đã khắc sâu (nhớ hơn 3 tuần).`,
  allLevels: 'Tất cả',
  dueWordsCta: (n: number) => `Ôn ${n} từ đến hạn`,
  noDueWords: 'Không có từ nào đến hạn',
  searchPlaceholder: 'Tìm từ hoặc nghĩa…',
  searchLabel: 'Tìm trong sổ từ',
  filterSkill: 'Kỹ năng',
  filterUnit: 'Chặng',
  allUnits: 'Mọi chặng',
  sortLabel: 'Sắp xếp',
  sortDue: 'Đến hạn trước',
  sortRecent: 'Mới thêm',
  sortAlpha: 'A → Z',
  sortWeak: 'Yếu nhất',
  resultCount: (n: number) => `${n} từ`,
  dueBadge: 'Đến hạn',
  dueIn: (when: string) => `ôn sau ${when}`,
  newCardBadge: 'Chưa ôn',
  reviewThis: 'Ôn ngay',
  showMore: (n: number) => `Xem thêm ${n} từ`,
  emptyFilterTitle: 'Không có từ nào khớp',
  emptyFilterText: 'Thử bỏ bớt bộ lọc hoặc tìm từ khác.',
  clearFilters: 'Bỏ lọc',
  wordsEmptyTitle: 'Sổ từ còn trống',
  wordsEmptyText: 'Mỗi bài học có vài từ mới. Học xong là từ tự vào sổ, kèm ảnh và giọng đọc.',
  fromLesson: 'Học ở bài',
  lapses: (n: number) => `quên ${n} lần`,
  reps: (n: number) => `đã ôn ${n} lần`,
  closeDetail: 'Đóng',
  openLesson: 'Mở lại bài',
}

/** Bảng chữ tiếng Anh phải có ĐỦ các khoá như bảng tiếng Việt (TypeScript kiểm tra giúp). */
type ReviewText = typeof VI

const EN: ReviewText = {
  sectionNavLabel: 'Review area',
  navReview: 'Review cards',
  navWords: 'Word book',
  navMistakes: 'Mistake book',
  navProgress: 'Progress',

  memoryLevelName: { 1: 'Just met', 2: 'Familiar', 3: 'Remembered', 4: 'Learned', 5: 'Locked in' },
  memoryLevelHint: {
    1: 'Just learned or just forgotten',
    2: 'Remembered for 1–4 days',
    3: 'Remembered for 4–10 days',
    4: 'Remembered for 10–21 days',
    5: 'Remembered for 3+ weeks',
  },
  memoryLevelAria: (level, name) => `Memory level ${level}/5: ${name}`,

  reviewEyebrow: 'Review',
  reviewTitle: 'Review just before you forget',
  reviewIntro: 'Every word has its own "golden time". Review then and it sticks deeper in the fewest minutes.',
  // (QA) tiếng Anh: 1 thì số ít (1 card / 1 mistake), từ 2 trở lên mới thêm -s
  dueNowTitle: (n) => (n === 1 ? '1 card is waiting' : `${n} cards are waiting`),
  sessionSize: (cards, minutes) => `${cards} cards ≈ ${minutes} min`,
  breakdownReviews: (n) => `${n} to review`,
  breakdownNew: (n) => `${n} new ${n === 1 ? 'word' : 'words'}`,
  breakdownItems: (n) => `${n} past ${n === 1 ? 'mistake' : 'mistakes'}`,
  startReview: 'Review now',
  openWords: 'Open word book',
  nothingDueTitle: 'Not time yet',
  nothingDueText: 'Your cards are sinking in. Reviewing too early wastes effort — {mascot} will tell you when.',
  nextReviewIn: 'Next review in',
  nextReviewAt: (time) => `around ${time}`,
  learnNew: 'Learn a new lesson',
  noCardsTitle: 'Nothing to review yet',
  noCardsText: 'Finish a lesson and its new words land here — {mascot} schedules the reviews.',
  startFirstLesson: 'Start your first lesson',
  memoryChartTitle: (n) => `Memory of ${n} words`,
  memoryChartHint: 'Click a column to see those words',
  forecastTitle: 'Next 7 days',
  forecastToday: 'Today',
  forecastCards: (n) => `${n} cards`,
  weekdayShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  backlogTitle: 'New words paused',
  backlogText: (n) => `You have ${n} older cards due. Clear them first so nothing slips — new words come back after.`,
  dailyCapTitle: 'Enough for today',
  dailyCapText: 'You reviewed 100 cards today. Take a break — sleep makes memories stronger.',
  newLimitNote: (opened, limit) => `New words today: ${opened}/${limit}`,
  buttonsSetting: 'Rating buttons',
  buttonsTwo: '2 buttons',
  buttonsFour: '4 buttons',
  buttonsSettingHint: '2 buttons: Forgot / Got it. 4 buttons add Hard and Easy for finer scheduling.',
  howItWorksTitle: 'Why review like this?',
  howItWorksText:
    'The FSRS algorithm predicts when you are about to forget each word and schedules it right then (about 90% recall). The better you know it, the longer the gap.',

  exitSession: 'Save & exit',
  sessionProgress: 'Session progress',
  cardCounter: (done, total) => `${done}/${total}`,
  frontPromptMeaning: 'Which English word?',
  frontPromptListen: 'Listen and recall this word',
  frontPromptItem: 'A question you missed before',
  againLabel: 'Missed a moment ago',
  newBadge: 'New word',
  flip: 'Flip card',
  flipHint: 'to flip',
  rateHint: 'How well did you remember?',
  rateKeysHint: (keys) => `Keys ${keys}`,
  knowIt: 'I already know this word',
  knowItHint: 'Skip it, see it much later',
  ratingName: { again: 'Forgot', hard: 'Hard', good: 'Got it', easy: 'Easy' },
  nextInterval: (when) => `again in ${when}`,
  exampleLabel: 'Example',
  usageLabel: 'Note',
  listenUk: 'Listen (UK)',
  listenExample: 'Listen to the example',
  memoryNow: 'Memory now',
  itemCheck: 'Check',
  itemContinue: 'Continue',

  doneTitle: 'Session complete!',
  doneSubtitle: (n) => `You reviewed ${n} ${n === 1 ? 'card' : 'cards'}. Words you recalled today are scheduled further out.`,
  statCards: 'Cards reviewed',
  statRemembered: 'Recalled first try',
  statMinutes: 'Time',
  minutesShort: (m) => `${m} min`,
  strengthTitle: 'Memory strength',
  strengthHelp: "Today's score is not long-term memory. Review on time to move words up a level.",
  comeBackIn: (when) => `Review again in ${when} to reach the next level.`,
  nextStepsTitle: '{mascot} suggests',
  stepMistakesTitle: (n) => `Retry ${n} ${n === 1 ? 'mistake' : 'mistakes'}`,
  stepMistakesMeta: (minutes) => `Fix old errors · about ${minutes} min`,
  stepLearnTitle: 'Keep learning',
  stepLearnMeta: (title) => title,
  stepWordsTitle: 'Open word book',
  stepWordsMeta: (n) => `${n} words locked in`,
  stepDoneTitle: 'Done for today',
  stepDoneMeta: 'Rest now — see you tomorrow',
  sessionEmptyTitle: 'No cards left',

  wordsEyebrow: 'Word book',
  wordsTitle: "Words you've met",
  wordsIntro: (total, known) => `${total} words · ${known} locked in (remembered 3+ weeks).`,
  allLevels: 'All',
  dueWordsCta: (n) => `Review ${n} due words`,
  noDueWords: 'No words due',
  searchPlaceholder: 'Search a word or meaning…',
  searchLabel: 'Search the word book',
  filterSkill: 'Skill',
  filterUnit: 'Unit',
  allUnits: 'All units',
  sortLabel: 'Sort',
  sortDue: 'Due first',
  sortRecent: 'Recently added',
  sortAlpha: 'A → Z',
  sortWeak: 'Weakest',
  resultCount: (n) => `${n} ${n === 1 ? 'word' : 'words'}`,
  dueBadge: 'Due',
  dueIn: (when) => `review in ${when}`,
  newCardBadge: 'Not reviewed',
  reviewThis: 'Review now',
  showMore: (n) => `Show ${n} more`,
  emptyFilterTitle: 'No matching words',
  emptyFilterText: 'Try removing a filter or searching another word.',
  clearFilters: 'Clear filters',
  wordsEmptyTitle: 'Your word book is empty',
  wordsEmptyText: 'Each lesson brings a few new words. Finish one and they land here with pictures and audio.',
  fromLesson: 'From lesson',
  lapses: (n) => `forgot ${n}×`,
  reps: (n) => `reviewed ${n}×`,
  closeDetail: 'Close',
  openLesson: 'Open lesson',
}

/** Thay {mascot} trong mọi chuỗi (kể cả chuỗi do hàm trả về). */
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

export function useReviewText(): ReviewText {
  const { language } = useLanguage()
  return useMemo(() => TEXT_BY_LANGUAGE[language], [language])
}
