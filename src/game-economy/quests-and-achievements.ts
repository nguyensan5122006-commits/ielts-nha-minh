/**
 * quests-and-achievements.ts
 * ----------------------------------------------------------------------------
 * NHIỆM VỤ & HUY HIỆU
 *
 * 1) NHIỆM VỤ (quest): làm đủ số lần 1 "chỉ số" trong ngày / tuần -> nhận chuối.
 *    - Mỗi ngày mỗi người có 3 nhiệm vụ ngày (chọn ngẫu nhiên cố định theo ngày + người).
 *    - Mỗi tuần có 4 nhiệm vụ tuần (giống nhau cho mọi người).
 *    - Nhiệm vụ gia đình: cả nhà cùng góp XP trong tuần (máy chủ tính).
 * 2) HUY HIỆU (achievement): mốc thành tích trọn đời, mở khoá 1 lần, thưởng chuối.
 *
 * "Chỉ số" (metric) được đếm trong tiến độ học (learning-progress) mỗi khi
 * người học làm việc tương ứng.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content/content-types'

/** Các việc được đếm. */
export type ActivityMetric =
  | 'lessons' // hoàn thành bài học
  | 'miniTests' // qua mini-test
  | 'perfectMiniTests' // qua mini-test 3 sao
  | 'reviews' // số thẻ đã ôn
  | 'xp' // XP kiếm được
  | 'battlesPlayed' // trận thi đấu trực tiếp
  | 'battlesWon'
  | 'miniGames' // mini game chơi xong
  | 'funCards' // thẻ Học vui đã xem
  | 'dailyWords' // giải xong Thử thách từ
  | 'bossHits' // số đòn đánh Boss
  | 'examsTaken' // bài thi đã làm
  | 'chatMessages'
  | 'studyDays' // số ngày có học

export interface QuestDefinition {
  id: string
  metric: ActivityMetric
  target: number
  bananas: number
  title: BilingualText
}

/** Kho nhiệm vụ ngày — mỗi ngày bốc 3 cái. */
export const DAILY_QUEST_POOL: QuestDefinition[] = [
  { id: 'd-lessons-2', metric: 'lessons', target: 2, bananas: 15, title: { vi: 'Hoàn thành 2 bài học', en: 'Finish 2 lessons' } },
  { id: 'd-minitest-1', metric: 'miniTests', target: 1, bananas: 15, title: { vi: 'Qua 1 mini-test', en: 'Pass 1 mini-test' } },
  { id: 'd-review-15', metric: 'reviews', target: 15, bananas: 10, title: { vi: 'Ôn 15 thẻ', en: 'Review 15 cards' } },
  { id: 'd-xp-50', metric: 'xp', target: 50, bananas: 15, title: { vi: 'Kiếm 50 XP', en: 'Earn 50 XP' } },
  { id: 'd-battle-1', metric: 'battlesPlayed', target: 1, bananas: 15, title: { vi: 'Chơi 1 trận thi đấu', en: 'Play 1 battle' } },
  { id: 'd-minigame-1', metric: 'miniGames', target: 1, bananas: 10, title: { vi: 'Chơi 1 mini game', en: 'Play 1 mini game' } },
  { id: 'd-funcards-20', metric: 'funCards', target: 20, bananas: 10, title: { vi: 'Xem 20 thẻ Học vui', en: 'View 20 fun cards' } },
  { id: 'd-dailyword-1', metric: 'dailyWords', target: 1, bananas: 10, title: { vi: 'Giải Thử thách từ hôm nay', en: "Solve today's word" } },
  { id: 'd-boss-10', metric: 'bossHits', target: 10, bananas: 10, title: { vi: 'Đánh Boss 10 đòn', en: 'Hit the boss 10 times' } },
]

export const WEEKLY_QUESTS: QuestDefinition[] = [
  { id: 'w-lessons-10', metric: 'lessons', target: 10, bananas: 50, title: { vi: 'Hoàn thành 10 bài học', en: 'Finish 10 lessons' } },
  { id: 'w-battlewin-3', metric: 'battlesWon', target: 3, bananas: 40, title: { vi: 'Thắng 3 trận thi đấu', en: 'Win 3 battles' } },
  { id: 'w-xp-400', metric: 'xp', target: 400, bananas: 50, title: { vi: 'Kiếm 400 XP', en: 'Earn 400 XP' } },
  { id: 'w-studydays-5', metric: 'studyDays', target: 5, bananas: 50, title: { vi: 'Học 5 ngày trong tuần', en: 'Study 5 days this week' } },
]

/** Nhiệm vụ chung cả nhà: tổng XP cả nhà trong tuần đạt mốc -> mỗi người góp sức nhận thưởng. */
export const FAMILY_WEEKLY_QUEST = {
  id: 'family-xp',
  targetXp: 1500,
  bananas: 30,
  title: { vi: 'Cả nhà cùng kiếm 1500 XP trong tuần', en: 'Family earns 1500 XP this week' },
}

/** Bốc 3 nhiệm vụ ngày, cố định theo (ngày + người dùng). */
export function pickDailyQuests(day: string, userId: number): QuestDefinition[] {
  let seed = userId * 7919
  for (const char of day) seed = (seed * 31 + char.charCodeAt(0)) >>> 0
  const pool = [...DAILY_QUEST_POOL]
  const picked: QuestDefinition[] = []
  while (picked.length < 3 && pool.length) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    picked.push(pool.splice(seed % pool.length, 1)[0])
  }
  return picked
}

/* ============================== HUY HIỆU ============================== */

export interface AchievementDefinition {
  id: string
  icon: string
  metric: ActivityMetric | 'accountLevel' | 'longestStreak' | 'wordsLearned' | 'levelTestsPassed'
  target: number
  bananas: number
  title: BilingualText
  description: BilingualText
}

/** Tạo nhanh 1 chuỗi huy hiệu nhiều cấp cho cùng 1 chỉ số. */
function tiered(
  metric: AchievementDefinition['metric'],
  icon: string,
  tiers: [number, number][], // [mốc, chuối]
  vi: (n: number) => string,
  en: (n: number) => string,
  titleVi: string,
  titleEn: string,
): AchievementDefinition[] {
  const ranks = ['I', 'II', 'III', 'IV', 'V']
  return tiers.map(([target, bananas], index) => ({
    id: `${metric}-${target}`,
    icon,
    metric,
    target,
    bananas,
    title: { vi: `${titleVi} ${ranks[index]}`, en: `${titleEn} ${ranks[index]}` },
    description: { vi: vi(target), en: en(target) },
  }))
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  ...tiered('lessons', '📘', [[1, 10], [10, 20], [30, 40], [60, 60], [100, 100]], (n) => `Hoàn thành ${n} bài học`, (n) => `Finish ${n} lessons`, 'Chăm học', 'Studious'),
  ...tiered('perfectMiniTests', '⭐', [[1, 10], [10, 30], [30, 60]], (n) => `${n} mini-test đạt 3 sao`, (n) => `${n} three-star mini-tests`, 'Hoàn hảo', 'Perfectionist'),
  ...tiered('longestStreak', '🔥', [[3, 10], [7, 30], [30, 80], [100, 200]], (n) => `Học liên tục ${n} ngày`, (n) => `${n}-day streak`, 'Bền bỉ', 'On fire'),
  ...tiered('wordsLearned', '🧠', [[20, 10], [100, 30], [300, 60], [600, 100]], (n) => `Học ${n} từ vựng`, (n) => `Learn ${n} words`, 'Kho từ vựng', 'Word bank'),
  ...tiered('reviews', '🔁', [[50, 10], [300, 30], [1000, 80]], (n) => `Ôn tập ${n} thẻ`, (n) => `Review ${n} cards`, 'Trí nhớ thép', 'Iron memory'),
  ...tiered('battlesWon', '⚔️', [[1, 10], [10, 30], [50, 80]], (n) => `Thắng ${n} trận thi đấu`, (n) => `Win ${n} battles`, 'Đấu sĩ', 'Gladiator'),
  ...tiered('battlesPlayed', '🎮', [[5, 10], [30, 30]], (n) => `Chơi ${n} trận thi đấu`, (n) => `Play ${n} battles`, 'Ham vui', 'Player'),
  ...tiered('funCards', '🌍', [[50, 10], [300, 30], [800, 60]], (n) => `Xem ${n} thẻ Học vui`, (n) => `View ${n} fun cards`, 'Nhà thám hiểm', 'Explorer'),
  ...tiered('dailyWords', '🔤', [[1, 10], [7, 20], [30, 60]], (n) => `Giải ${n} Thử thách từ`, (n) => `Solve ${n} daily words`, 'Thám tử chữ', 'Word detective'),
  ...tiered('miniGames', '🕹️', [[5, 10], [30, 30]], (n) => `Chơi ${n} mini game`, (n) => `Play ${n} mini games`, 'Game thủ', 'Gamer'),
  ...tiered('bossHits', '🐲', [[50, 10], [300, 40]], (n) => `Đánh Boss ${n} đòn`, (n) => `Hit the boss ${n} times`, 'Diệt rồng', 'Dragon slayer'),
  ...tiered('examsTaken', '📝', [[1, 10], [5, 30]], (n) => `Làm ${n} bài thi`, (n) => `Take ${n} exams`, 'Sĩ tử', 'Test taker'),
  ...tiered('levelTestsPassed', '🏁', [[1, 30], [2, 50], [3, 80]], (n) => `Qua ${n} bài test cuối level`, (n) => `Pass ${n} level tests`, 'Vượt cấp', 'Level up'),
  ...tiered('accountLevel', '🎖️', [[5, 20], [10, 40], [20, 80]], (n) => `Đạt Lv.${n}`, (n) => `Reach Lv.${n}`, 'Thăng hạng', 'Rising'),
  ...tiered('chatMessages', '💬', [[10, 5], [100, 20]], (n) => `Gửi ${n} tin nhắn`, (n) => `Send ${n} messages`, 'Hoạt ngôn', 'Chatty'),
]
