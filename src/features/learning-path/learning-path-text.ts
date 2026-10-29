/**
 * learning-path-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ HIỂN THỊ CỦA TRANG LỘ TRÌNH "TUYẾN TUẦN TRA" (/learn) — 2 ngôn ngữ.
 *   const text = useLearningPathText()
 *   text.continue                       -> "Học tiếp" / "Continue"
 *   text.statusLine(3, 2)               -> "Bạn ở Trạm 3 · còn 2 bài tới mốc"
 *
 * Luật viết (design system mục 11 + psych-adult D7):
 *   - xưng "bạn", mascot tự xưng tên ({mascot} tự được thay bằng tên mascot)
 *   - tiêu đề ≤ 6 từ, câu ≤ 2 dòng; không chữ IN HOA tiếng Việt; không gây tội lỗi khi nghỉ học
 *   - câu can-do của chặng đã là câu đầy đủ -> KHÔNG thêm "Sau chặng này…" phía trước
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import type { LessonMode, SkillName, TrackId } from '../../content/content-types'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

const VI = {
  pageTitle: 'Tuyến tuần tra',
  pageSubtitle: (levelTitle: string) => `Cùng {mascot} đi qua từng trạm · ${levelTitle}`,
  tracks: { general: 'Tiếng Anh tổng quát', ielts: 'Luyện thi IELTS' } as Record<TrackId, string>,
  trackLabel: 'Chọn lộ trình',
  switchToIelts: 'Sang Luyện thi IELTS',
  levelLabel: 'Chọn level',
  levelN: (n: number) => `Level ${n}`,
  levelProgress: (done: number, total: number) => `${done}/${total} bài`,
  levelLocked: 'Chưa mở',
  levelDoneBadge: 'Đã xong',
  /** tên khu vực của bản đồ (design system mục 7) */
  areaNames: ['Khu phố', 'Thành phố', 'Toàn quốc'],

  // dòng trạng thái đầu trang
  statusLine: (station: number, left: number) => `Bạn ở Trạm ${station} · còn ${left} bài tới mốc`,
  statusLineLevelEnd: (left: number, level: number) => `Còn ${left} bài là xong Level ${level}`,
  statusLevelDone: (level: number) => `Bạn đã đi hết Level ${level}`,
  statusNotStarted: 'Bắt đầu từ Trạm 1 nhé',
  statusSubUnit: (title: string) => `Mốc kế tiếp: xong trạm “${title}”`,
  statusSubLevelTest: 'Mốc kế tiếp: bài kiểm tra cuối level',
  statusSubDone: 'Làm bài kiểm tra cuối level để lên level tiếp theo',
  statusSubLocked: (prev: number) => `Level này mở khi bạn qua bài kiểm tra Level ${prev}. Bạn vẫn xem trước và học thử được.`,
  staircaseLabel: 'Bậc thang trình độ',
  youAreHere: 'Bạn ở đây',
  goal: 'Mục tiêu',

  // trạm (chặng)
  station: (n: number) => `Trạm ${n}`,
  stationLessons: (n: number) => `${n} bài`,
  stationProgress: (done: number, total: number) => `${done}/${total}`,
  stationDone: 'Đã xong trạm',
  stationExpand: 'Xem lại các bài',
  stationCollapse: 'Thu gọn',
  stationHere: 'Đang ở đây',
  doneStationsGroup: (from: number, to: number) => `Trạm ${from}–${to} đã xong`,
  doneStationsLessons: (n: number) => `${n} bài`,

  // nút bài học
  skills: { vocabulary: 'Từ vựng', listening: 'Nghe', reading: 'Đọc', speaking: 'Nói', writing: 'Viết' } as Record<SkillName, string>,
  modes: { practice: 'Luyện tập', listening: 'Bài nghe', reading: 'Bài đọc', writing: 'Bài viết', speaking: 'Bài nói' } as Record<LessonMode, string>,
  minutes: (n: number) => `${n} phút`,
  aboutMinutes: (n: number) => `≈ ${n} phút`,
  exercises: (n: number) => `${n} câu`,
  words: (n: number) => `${n} từ mới`,
  lessonN: (n: number) => `Bài ${n}`,
  lessonOf: (n: number, total: number) => `Bài ${n}/${total}`,
  stateDone: (percent: number) => `Đã xong · đúng ${percent}%`,
  stateResume: 'Đang học dở — mở lại là về đúng câu',
  stateNext: 'Bài tiếp theo của bạn',
  stateOpen: 'Học được ngay',
  stateLocked: (prev: number) => `Level này chưa mở (qua bài kiểm tra Level ${prev} để mở). Bạn vẫn học thử được.`,
  nodeLabel: (title: string, state: string) => `${title} — ${state}`,

  // nút hành động
  continue: 'Học tiếp',
  continueShort: 'Học tiếp',
  start: 'Bắt đầu',
  redo: 'Học lại',
  tryIt: 'Học thử',
  close: 'Đóng',
  scrollToCurrent: 'Về chỗ đang học',
  mascotBubble: 'Học tiếp',
  keyHint: 'Phím Enter',

  // bài kiểm tra cuối level
  levelTestTitle: (n: number) => `Bài kiểm tra Level ${n}`,
  levelTestLockedHint: (left: number) => `Mở khi bạn xong 80% số bài · còn ${left} bài`,
  levelTestReadyHint: 'Qua bài này là lên level mới',
  levelTestPassedHint: (percent: number) => `Đã qua · ${percent}%`,
  levelTestStart: 'Làm bài kiểm tra',
  levelTestRetake: 'Làm lại',
  nextLevelTeaser: (n: number, title: string) => `Tiếp theo: Level ${n} · ${title}`,
  viewNextLevel: 'Xem trước',
  allDone: 'Bạn đã học hết các bài đã mở. Ôn lại từ vựng hoặc thử phòng thi nhé!',

  // trạng thái tải
  emptyLevel: 'Level này đang được soạn bài. Quay lại sau nhé!',
}

type LearningPathText = typeof VI

const EN: LearningPathText = {
  pageTitle: 'Patrol route',
  pageSubtitle: (levelTitle) => `Walk station by station with {mascot} · ${levelTitle}`,
  tracks: { general: 'General English', ielts: 'IELTS prep' },
  trackLabel: 'Choose a track',
  switchToIelts: 'Switch to IELTS prep',
  levelLabel: 'Choose a level',
  levelN: (n) => `Level ${n}`,
  levelProgress: (done, total) => `${done}/${total} lessons`,
  levelLocked: 'Locked',
  levelDoneBadge: 'Done',
  areaNames: ['Neighbourhood', 'City', 'Nationwide'],

  statusLine: (station, left) => `You're at Station ${station} · ${left} ${left === 1 ? 'lesson' : 'lessons'} to the next milestone`,
  statusLineLevelEnd: (left, level) => `${left} ${left === 1 ? 'lesson' : 'lessons'} left to finish Level ${level}`,
  statusLevelDone: (level) => `You've finished Level ${level}`,
  statusNotStarted: "Let's start at Station 1",
  statusSubUnit: (title) => `Next milestone: finish “${title}”`,
  statusSubLevelTest: 'Next milestone: the end-of-level test',
  statusSubDone: 'Take the end-of-level test to move up',
  statusSubLocked: (prev) => `This level opens after the Level ${prev} test. You can still preview and try lessons.`,
  staircaseLabel: 'Level staircase',
  youAreHere: 'You are here',
  goal: 'Goal',

  station: (n) => `Station ${n}`,
  // (QA) tiếng Anh: 1 thì số ít (1 card / 1 mistake), từ 2 trở lên mới thêm -s
  stationLessons: (n) => `${n} ${n === 1 ? 'lesson' : 'lessons'}`,
  stationProgress: (done, total) => `${done}/${total}`,
  stationDone: 'Station complete',
  stationExpand: 'Show lessons',
  stationCollapse: 'Collapse',
  stationHere: "You're here",
  doneStationsGroup: (from, to) => `Stations ${from}–${to} complete`,
  doneStationsLessons: (n) => `${n} lessons`,

  skills: { vocabulary: 'Vocabulary', listening: 'Listening', reading: 'Reading', speaking: 'Speaking', writing: 'Writing' },
  modes: { practice: 'Practice', listening: 'Listening task', reading: 'Reading task', writing: 'Writing task', speaking: 'Speaking task' },
  minutes: (n) => `${n} min`,
  aboutMinutes: (n) => `≈ ${n} min`,
  exercises: (n) => `${n} questions`,
  words: (n) => `${n} new ${n === 1 ? 'word' : 'words'}`,
  lessonN: (n) => `Lesson ${n}`,
  lessonOf: (n, total) => `Lesson ${n} of ${total}`,
  stateDone: (percent) => `Done · ${percent}% correct`,
  stateResume: 'In progress — reopen to pick up where you left off',
  stateNext: 'Your next lesson',
  stateOpen: 'Ready to start',
  stateLocked: (prev) => `This level is locked (pass the Level ${prev} test to open it). You can still try it.`,
  nodeLabel: (title, state) => `${title} — ${state}`,

  continue: 'Continue',
  continueShort: 'Continue',
  start: 'Start',
  redo: 'Redo',
  tryIt: 'Try it',
  close: 'Close',
  scrollToCurrent: 'Jump to my lesson',
  mascotBubble: 'Continue',
  keyHint: 'Enter key',

  levelTestTitle: (n) => `Level ${n} test`,
  levelTestLockedHint: (left) => `Opens at 80% of lessons · ${left} to go`,
  levelTestReadyHint: 'Pass it to move up a level',
  levelTestPassedHint: (percent) => `Passed · ${percent}%`,
  levelTestStart: 'Take the test',
  levelTestRetake: 'Retake',
  nextLevelTeaser: (n, title) => `Next: Level ${n} · ${title}`,
  viewNextLevel: 'Preview',
  allDone: "You've finished every open lesson. Review your words or try a practice test!",

  emptyLevel: 'Lessons for this level are being written. Check back soon!',
}

/** Thay {mascot} trong mọi chuỗi (kể cả chuỗi do hàm trả về). */
function withMascotName<T>(value: T): T {
  if (typeof value === 'string') return fillMascotName(value) as T
  if (typeof value === 'function') return ((...args: unknown[]) => withMascotName((value as (...a: unknown[]) => unknown)(...args))) as T
  if (Array.isArray(value)) return value.map(withMascotName) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withMascotName(v)])) as T
  return value
}

const BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

/** Chữ trang lộ trình theo ngôn ngữ đang chọn. */
export function useLearningPathText(): LearningPathText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
