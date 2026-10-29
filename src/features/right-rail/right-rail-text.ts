/**
 * right-rail-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ HIỂN THỊ CỦA CỘT PHẢI (chuỗi ngày, mục tiêu ngày, Học tiếp, bảng xếp hạng gia đình,
 * "Thời điểm vàng", nhiệm vụ ngày, banner mascot ngủ gật) — 2 ngôn ngữ.
 *   const text = useRightRailText()
 *   text.thisWeek(3)           -> "Tuần này 3/7"
 *
 * Luật viết (psych-adult D7 + design system mục 11): không đổ lỗi khi nghỉ học
 * ("Hôm qua bận à? Không sao"), không doạ mất chuỗi, khen cụ thể, câu ≤ 2 dòng.
 * {mascot} tự được thay bằng tên mascot.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

const VI = {
  // (a) chuỗi ngày + (b) mục tiêu ngày
  todayTitle: 'Hôm nay',
  streakDays: (n: number) => (n === 0 ? 'Chưa có chuỗi' : `${n} ngày liên tiếp`),
  streakStartHint: 'Học 1 bài để thắp lửa',
  streakKeptToday: 'Đã giữ lửa hôm nay',
  streakNotYet: 'Chưa học hôm nay',
  streakNotYetLeft: (left: number) => `Hôm nay chưa học · cần ${left} phút`,
  streakDaysLabel: (n: number): string => (n === 0 ? 'chưa có chuỗi' : 'ngày liên tiếp'),
  goalOf: (goal: number) => `/${goal} phút`,
  thisWeek: (n: number) => `Tuần này ${n}/7`,
  totalDays: (n: number) => `Tổng ${n} ngày học`,
  freezes: (n: number) => `${n} lá chắn chuỗi`,
  freezesHint: 'Tự dùng khi bạn lỡ 1 ngày. Cứ 7 ngày liên tiếp được thêm 1 (tối đa 2).',
  weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  goalTitle: 'Mục tiêu ngày',
  goalMinutes: (done: number, goal: number) => `${done}/${goal} phút`,
  goalReached: 'Đạt mục tiêu rồi',
  goalLeft: (left: number) => `Còn ${left} phút là đạt mục tiêu hôm nay`,
  repairTitle: (n: number) => `Lấy lại chuỗi ${n} ngày`,
  repairBody: (lessons: number) => `Hôm qua bận à? Không sao. Học thêm ${lessons} bài trong 48 giờ là chuỗi cũ quay lại.`,

  // (c) Học tiếp
  continueEyebrow: 'Học tiếp',
  resumeEyebrow: 'Đang học dở',
  continueButton: 'Học tiếp',
  continueMeta: (skill: string, minutes: number) => `${skill} · ${minutes} phút`,
  continueStation: (n: number, title: string) => `Trạm ${n} · ${title}`,
  allDoneTitle: 'Bạn đã học hết bài đã mở',
  allDoneBody: 'Ôn từ vựng hoặc thử phòng thi nhé.',
  allDoneButton: 'Vào phòng thi',

  // (d) bảng xếp hạng gia đình
  leaderboardTitle: 'Cả nhà tuần này',
  leaderboardAll: 'Tất cả',
  leaderboardEmpty: 'Chưa ai học tuần này — bạn mở hàng nhé!',
  leaderboardYou: 'Bạn',
  leaderboardXp: (n: number) => `${n} XP`,
  leaderboardFamilyTotal: (n: number) => `Cả nhà: ${n} XP`,
  leaderboardLoading: 'Đang tải…',
  stripRank: (rank: number, xp: number) => `Bạn hạng ${rank} · ${xp} XP`,

  // (e) Thời điểm vàng (ôn từ FSRS)
  goldenTitle: 'Thời điểm vàng',
  goldenDue: (n: number) => (n === 0 ? 'Chưa có thẻ đến hạn' : `${n} thẻ đến hạn ôn`),
  goldenDueHint: 'Ôn đúng lúc sắp quên là nhớ lâu nhất',
  goldenNext: (time: string) => `Lượt ôn tiếp theo sau ${time}`,
  goldenNoCards: 'Học xong 1 bài từ vựng là có từ để ôn.',
  goldenReview: 'Ôn ngay',
  goldenLevels: ['Mới gặp', 'Quen mặt', 'Nhớ', 'Thuộc', 'Khắc sâu'],
  goldenLevelsLabel: 'Số từ theo mức độ nhớ',
  goldenPaused: 'Ôn hết thẻ cũ trước để không quên',
  hoursMinutes: (h: number, m: number) => (h > 0 ? `${h} giờ ${m} phút` : `${m} phút`),
  daysHours: (d: number, h: number) => (h > 0 ? `${d} ngày ${h} giờ` : `${d} ngày`),
  lessThanMinute: 'chưa tới 1 phút',

  // (f) nhiệm vụ ngày
  questsTitle: 'Nhiệm vụ hôm nay',
  questsAll: 'Tất cả',
  questClaim: (n: number) => `Nhận ${n}`,
  questClaimed: 'Đã nhận',
  questProgress: (value: number, target: number) => `${value}/${target}`,

  // banner mascot ngủ gật
  sleepyTitle: 'Hôm nay mình học chút nhé?',
  sleepyBody: (station: number | null, minutes: number) =>
    station ? `{mascot} đang chờ bạn ở Trạm ${station}. Một bài chỉ khoảng ${minutes} phút thôi.` : `Một bài chỉ khoảng ${minutes} phút thôi — {mascot} đi cùng bạn.`,
  sleepyStreak: (n: number) => `Học 1 bài là ngọn lửa ${n} ngày cháy tiếp.`,
  sleepyStart: (minutes: number) => `Học ${minutes} phút`,
  sleepyLater: 'Để sau',
  sleepyRepairTitle: 'Hôm qua bận à? Không sao.',
  sleepyRepairBody: (lessons: number, streak: number) => `Học ${lessons} bài trong 48 giờ là chuỗi ${streak} ngày quay lại.`,
}

type RightRailText = typeof VI

const EN: RightRailText = {
  todayTitle: 'Today',
  streakDays: (n) => (n === 0 ? 'No streak yet' : `${n}-day streak`),
  streakStartHint: 'Finish a lesson to light it',
  streakKeptToday: 'Streak kept today',
  streakNotYet: 'Not studied yet today',
  streakNotYetLeft: (left) => `Not studied yet · ${left} min to go`,
  streakDaysLabel: (n) => (n === 0 ? 'no streak yet' : n === 1 ? 'day in a row' : 'days in a row'),
  goalOf: (goal) => `/${goal} min`,
  thisWeek: (n) => `This week ${n}/7`,
  totalDays: (n) => `${n} study days in total`,
  freezes: (n) => `${n} streak ${n === 1 ? 'shield' : 'shields'}`,
  freezesHint: 'Used automatically if you miss a day. Earn 1 every 7 days in a row (max 2).',
  weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  goalTitle: 'Daily goal',
  goalMinutes: (done, goal) => `${done}/${goal} min`,
  goalReached: 'Goal reached',
  goalLeft: (left) => `${left} min left to hit today's goal`,
  repairTitle: (n) => `Win back your ${n}-day streak`,
  repairBody: (lessons) => `Busy yesterday? No problem. Finish ${lessons} more ${lessons === 1 ? 'lesson' : 'lessons'} within 48 hours to restore it.`,

  continueEyebrow: 'Continue',
  resumeEyebrow: 'In progress',
  continueButton: 'Continue',
  continueMeta: (skill, minutes) => `${skill} · ${minutes} min`,
  continueStation: (n, title) => `Station ${n} · ${title}`,
  allDoneTitle: "You've finished every open lesson",
  allDoneBody: 'Review your words or try a practice test.',
  allDoneButton: 'Practice tests',

  leaderboardTitle: 'Family this week',
  leaderboardAll: 'See all',
  leaderboardEmpty: 'Nobody has studied this week yet — go first!',
  leaderboardYou: 'You',
  leaderboardXp: (n) => `${n} XP`,
  leaderboardFamilyTotal: (n) => `Family: ${n} XP`,
  leaderboardLoading: 'Loading…',
  stripRank: (rank, xp) => `You're #${rank} · ${xp} XP`,

  goldenTitle: 'Golden time',
  goldenDue: (n) => (n === 0 ? 'Nothing due yet' : `${n} ${n === 1 ? 'card' : 'cards'} due`),
  goldenDueHint: 'Reviewing just before you forget makes it stick',
  goldenNext: (time) => `Next review in ${time}`,
  goldenNoCards: 'Finish a vocabulary lesson to get words to review.',
  goldenReview: 'Review now',
  goldenLevels: ['New', 'Familiar', 'Remembered', 'Known', 'Mastered'],
  goldenLevelsLabel: 'Words by memory level',
  goldenPaused: 'Clear older cards first so nothing slips',
  hoursMinutes: (h, m) => (h > 0 ? `${h}h ${m}m` : `${m} min`),
  daysHours: (d, h) => (h > 0 ? `${d}d ${h}h` : `${d} ${d === 1 ? 'day' : 'days'}`),
  lessThanMinute: 'under a minute',

  questsTitle: "Today's quests",
  questsAll: 'All',
  questClaim: (n) => `Claim ${n}`,
  questClaimed: 'Claimed',
  questProgress: (value, target) => `${value}/${target}`,

  sleepyTitle: 'Fancy a quick lesson today?',
  sleepyBody: (station, minutes) =>
    station ? `{mascot} is waiting for you at Station ${station}. One lesson takes about ${minutes} minutes.` : `One lesson takes about ${minutes} minutes — {mascot} will walk with you.`,
  sleepyStreak: (n) => `One lesson keeps your ${n}-day flame going.`,
  sleepyStart: (minutes) => `Study ${minutes} min`,
  sleepyLater: 'Later',
  sleepyRepairTitle: 'Busy yesterday? No problem.',
  sleepyRepairBody: (lessons, streak) => `Finish ${lessons} ${lessons === 1 ? 'lesson' : 'lessons'} within 48 hours to bring back your ${streak}-day streak.`,
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

/** Chữ cột phải theo ngôn ngữ đang chọn. */
export function useRightRailText(): RightRailText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
