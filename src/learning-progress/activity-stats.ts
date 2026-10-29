/**
 * activity-stats.ts — TÍNH CÁC CHỈ SỐ ĐỂ XÉT HUY HIỆU & NHIỆM VỤ
 * Một số chỉ số lấy thẳng từ bộ đếm (lifetimeStats), một số tính từ dữ liệu học
 * (VD số bài học khác nhau đã xong, số từ đã học, streak dài nhất).
 */
import { accountLevelFromXp } from '../game-economy/account-level'
import { ACHIEVEMENTS, type AchievementDefinition } from '../game-economy/quests-and-achievements'
import type { LearningProgress } from './progress-types'

/** Số từ vựng đã học = số thẻ ôn "word:..." (tạo khi học xong bài từ vựng). */
export function countWordsLearned(progress: LearningProgress): number {
  return Object.keys(progress.srs).filter((key) => key.startsWith('word:')).length
}

export function achievementMetricValue(progress: LearningProgress, metric: AchievementDefinition['metric']): number {
  switch (metric) {
    case 'lessons':
      return Object.keys(progress.lessons).length // số bài KHÁC NHAU đã học
    case 'longestStreak':
      return progress.streak.longest
    case 'wordsLearned':
      return countWordsLearned(progress)
    case 'levelTestsPassed':
      return Object.keys(progress.levelTests).length
    case 'accountLevel':
      return accountLevelFromXp(progress.xpTotal).level
    default:
      return progress.lifetimeStats[metric] ?? 0
  }
}

/** Huy hiệu vừa đủ điều kiện nhưng chưa mở khoá. */
export function newlyEarnedAchievements(progress: LearningProgress): AchievementDefinition[] {
  return ACHIEVEMENTS.filter(
    (achievement) => !progress.unlockedAchievements.includes(achievement.id) && achievementMetricValue(progress, achievement.metric) >= achievement.target,
  )
}
