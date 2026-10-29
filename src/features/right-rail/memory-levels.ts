/**
 * memory-levels.ts
 * ----------------------------------------------------------------------------
 * 5 MỨC "ĐỘ NHỚ" CHO Ô "THỜI ĐIỂM VÀNG" (ý tưởng Mochi, design system mục 13):
 *   0 Mới gặp  : thẻ chưa ôn lần nào
 *   1 Quen mặt : đang học / vừa quên phải học lại, hoặc độ bền < 3 ngày
 *   2 Nhớ      : độ bền 3–9 ngày
 *   3 Thuộc    : độ bền 10–20 ngày
 *   4 Khắc sâu : độ bền ≥ 21 ngày (= "nhớ chắc" của sổ từ vựng, KNOWN_STABILITY_DAYS)
 * "Độ bền" (stability) của FSRS ≈ số ngày tới khi khả năng còn nhớ tụt xuống 90%.
 * Hàm thuần — không React.
 * ----------------------------------------------------------------------------
 */
import { dueCards, isCardDue, KNOWN_STABILITY_DAYS, srsQueueInfo } from '../../learning-progress/fsrs-scheduler'
import type { LearningProgress, SerializedFsrsCard } from '../../learning-progress/progress-types'

export type MemoryLevel = 0 | 1 | 2 | 3 | 4

export function memoryLevelOf(card: SerializedFsrsCard): MemoryLevel {
  if (card.state === 0) return 0
  if (card.state === 1 || card.state === 3 || card.stability < 3) return 1
  if (card.stability < 10) return 2
  if (card.stability < KNOWN_STABILITY_DAYS) return 3
  return 4
}

export interface GoldenTimeSummary {
  /** số từ (thẻ word:) ở mỗi mức 0..4 */
  levels: [number, number, number, number, number]
  totalWords: number
  /** số thẻ ôn được ngay bây giờ (đúng bằng phiên ôn ở /review) */
  dueNow: number
  /** thời điểm thẻ sớm nhất đến hạn (khi chưa có thẻ nào đến hạn) */
  nextDueAt: Date | null
  /** nợ ôn quá nhiều -> tạm dừng thẻ mới */
  backlogPaused: boolean
}

export function goldenTimeSummary(progress: LearningProgress, now = new Date()): GoldenTimeSummary {
  const levels: GoldenTimeSummary['levels'] = [0, 0, 0, 0, 0]
  let totalWords = 0
  let nextDue: number | null = null
  for (const [key, card] of Object.entries(progress.srs)) {
    if (key.startsWith('word:')) {
      levels[memoryLevelOf(card)]++
      totalWords++
    }
    if (!isCardDue(card, now)) {
      const due = new Date(card.due).getTime()
      if (nextDue === null || due < nextDue) nextDue = due
    }
  }
  const dueNow = dueCards(progress, now).length
  return {
    levels,
    totalWords,
    dueNow,
    nextDueAt: dueNow === 0 && nextDue !== null ? new Date(nextDue) : null,
    backlogPaused: srsQueueInfo(progress, now).backlogPaused,
  }
}
