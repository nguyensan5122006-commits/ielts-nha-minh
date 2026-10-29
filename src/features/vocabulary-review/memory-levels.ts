/**
 * memory-levels.ts — 5 "CẤP ĐỘ NHỚ" CỦA 1 THẺ ÔN (dựa trên độ bền FSRS)
 * ----------------------------------------------------------------------------
 * Thuật toán FSRS cho mỗi thẻ 1 con số "độ bền trí nhớ" (stability, tính bằng ngày):
 * ở mức nhớ mục tiêu 90%, độ bền ≈ khoảng cách tới lần ôn sau. Con số này khó hiểu với
 * người học, nên ta chia nó thành 5 nấc dễ nhìn (ý tưởng "Thời điểm vàng" của Mochi,
 * docs/research/notes/ui-vn-b.md ý 1; tên nấc theo 04-DESIGN-SYSTEM.md):
 *
 *   1 Mới gặp   — thẻ chưa ôn lần nào / vừa quên / độ bền < 1 ngày
 *   2 Quen mặt  — độ bền 1–4 ngày
 *   3 Nhớ       — 4–10 ngày
 *   4 Thuộc     — 10–21 ngày
 *   5 Khắc sâu  — ≥ 21 ngày  (= "nhớ chắc", KNOWN_STABILITY_DAYS trong fsrs-scheduler.ts)
 *
 * Màu 5 nấc là 1 thang "tuần tự" (cùng 1 màu, nhạt -> đậm) — khai báo trong
 * vocabulary-review.css (--memory-1 … --memory-5), có bản riêng cho chế độ tối.
 * File này KHÔNG dùng React: chỉ là hàm thuần, dùng chung cho /review, /words, /progress.
 * ----------------------------------------------------------------------------
 */
import { KNOWN_STABILITY_DAYS } from '../../learning-progress/fsrs-scheduler'
import type { LearningProgress, SerializedFsrsCard } from '../../learning-progress/progress-types'

export type MemoryLevel = 1 | 2 | 3 | 4 | 5
export const MEMORY_LEVELS: MemoryLevel[] = [1, 2, 3, 4, 5]

/** Ngưỡng độ bền (ngày) để LÊN nấc 2, 3, 4, 5. */
const LEVEL_THRESHOLDS_DAYS = [1, 4, 10, KNOWN_STABILITY_DAYS] as const

/** Nấc nhớ của 1 thẻ. */
export function memoryLevelOf(card: SerializedFsrsCard): MemoryLevel {
  if (card.state === 0) return 1 // chưa ôn lần nào
  let level: MemoryLevel = 1
  for (const threshold of LEVEL_THRESHOLDS_DAYS) if (card.stability >= threshold) level = (level + 1) as MemoryLevel
  // đang học lại sau khi quên: dù độ bền còn cao, trí nhớ đang "lung lay" -> tối đa nấc 2
  if (card.state === 1 || card.state === 3) return Math.min(level, 2) as MemoryLevel
  return level
}

/** Đếm số thẻ ở từng nấc. prefix 'word:' = chỉ từ vựng; '' = mọi thẻ. */
export function countByMemoryLevel(progress: LearningProgress, prefix = 'word:'): Record<MemoryLevel, number> {
  const counts: Record<MemoryLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const [key, card] of Object.entries(progress.srs)) if (key.startsWith(prefix)) counts[memoryLevelOf(card)]++
  return counts
}

/** Thời điểm đến hạn SỚM NHẤT trong tương lai (để đếm ngược "lượt ôn tiếp theo"). null = không có thẻ nào. */
export function nextDueAt(progress: LearningProgress, now = new Date()): Date | null {
  let soonest: number | null = null
  for (const card of Object.values(progress.srs)) {
    const due = new Date(card.due).getTime()
    if (due > now.getTime() && (soonest === null || due < soonest)) soonest = due
  }
  return soonest === null ? null : new Date(soonest)
}

/**
 * Số thẻ đến hạn trong từng ngày của `days` ngày tới (ngày 0 = hôm nay, gồm cả thẻ đã quá hạn).
 * Dùng vẽ "Lịch ôn 7 ngày tới" (ý tưởng RemNote forecast — tránh dồn bài).
 */
export function dueForecast(progress: LearningProgress, days = 7, now = new Date()): number[] {
  const counts = new Array<number>(days).fill(0)
  const startOfToday = new Date(now)
  startOfToday.setHours(0, 0, 0, 0)
  for (const card of Object.values(progress.srs)) {
    if (card.state === 0) continue // thẻ mới không "đến hạn" theo lịch — chúng mở dần theo giới hạn ngày
    const dayIndex = Math.floor((new Date(card.due).getTime() - startOfToday.getTime()) / 86_400_000)
    if (dayIndex < days) counts[Math.max(0, dayIndex)]++ // quá hạn (dayIndex âm) tính vào hôm nay
  }
  return counts
}
