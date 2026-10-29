/**
 * account-level.ts
 * ----------------------------------------------------------------------------
 * LEVEL TÀI KHOẢN (giống level trong game) — tính từ tổng XP.
 * Khác với "Level IELTS" (level 1-6 của khoá học).
 *
 * Muốn lên level L+1 cần thêm: 50 + 25 × (L - 1) XP
 *   Lv1 -> Lv2: 50 XP, Lv2 -> Lv3: 75 XP, Lv3 -> Lv4: 100 XP ...
 * Mỗi lần lên level được thưởng chuối; một số mốc có DANH HIỆU mới.
 * File này dùng chung cho cả trang web lẫn máy chủ.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content/content-types'

/** XP cần để đi từ level `level` lên level kế tiếp. */
export function xpToNextLevel(level: number): number {
  return 50 + 25 * (level - 1)
}

/** Tổng XP cần để ĐẠT level `level` (Lv1 = 0 XP). */
export function totalXpForLevel(level: number): number {
  let total = 0
  for (let l = 1; l < level; l++) total += xpToNextLevel(l)
  return total
}

export interface AccountLevelInfo {
  level: number
  xpIntoLevel: number // XP đã có trong level hiện tại
  xpNeeded: number // XP cần cho cả level hiện tại
  title: BilingualText
}

/** Danh hiệu theo mốc level (đạt level >= minLevel thì có danh hiệu đó). */
export const LEVEL_TITLES: { minLevel: number; title: BilingualText; emoji: string }[] = [
  { minLevel: 1, emoji: '🌱', title: { vi: 'Tân binh', en: 'Rookie' } },
  { minLevel: 3, emoji: '📗', title: { vi: 'Học trò chăm chỉ', en: 'Keen Learner' } },
  { minLevel: 6, emoji: '🧭', title: { vi: 'Nhà thám hiểm từ vựng', en: 'Word Explorer' } },
  { minLevel: 10, emoji: '⚔️', title: { vi: 'Chiến binh ngữ pháp', en: 'Grammar Warrior' } },
  { minLevel: 15, emoji: '🎓', title: { vi: 'Học giả', en: 'Scholar' } },
  { minLevel: 20, emoji: '🦉', title: { vi: 'Thông thái', en: 'Sage' } },
  { minLevel: 30, emoji: '🏆', title: { vi: 'Bậc thầy IELTS', en: 'IELTS Master' } },
  { minLevel: 40, emoji: '🐉', title: { vi: 'Huyền thoại', en: 'Legend' } },
]

export function titleForLevel(level: number) {
  return [...LEVEL_TITLES].reverse().find((t) => level >= t.minLevel)!
}

export function accountLevelFromXp(totalXp: number): AccountLevelInfo {
  let level = 1
  while (totalXp >= totalXpForLevel(level + 1)) level++
  return {
    level,
    xpIntoLevel: totalXp - totalXpForLevel(level),
    xpNeeded: xpToNextLevel(level),
    title: titleForLevel(level).title,
  }
}

/** Chuối thưởng khi vừa lên `newLevel`. Mốc có danh hiệu mới được thêm 50. */
export function bananasForLevelUp(newLevel: number): number {
  const isTitleMilestone = LEVEL_TITLES.some((t) => t.minLevel === newLevel)
  return 10 + newLevel * 2 + (isTitleMilestone ? 50 : 0)
}
