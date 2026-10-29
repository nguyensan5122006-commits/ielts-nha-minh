/**
 * legacy-levels.ts — BẢNG ĐỔI "6 LEVEL CŨ" SANG "3 LEVEL MỚI"
 * ----------------------------------------------------------------------------
 * Bản cũ chia khoá học thành 6 level (1..6). Dữ liệu cũ vẫn còn số này ở:
 *   - tiến độ v1: placement.recommendedLevelOrder, unlockedLevelOrder
 *   - kết quả bài xếp lớp cũ đã lưu (exam_results) và bài xếp lớp cũ (placement-test)
 *
 * Quy tắc (docs/redesign-v3/01-ARCHITECTURE.md mục 3):
 *   level cũ 1      -> level-1
 *   level cũ 2      -> level-2
 *   level cũ ≥ 3    -> level-2 (là level hiện tại); riêng ≥ 4 thì MỞ KHOÁ thêm level-3
 *                      để người giỏi có thể nhảy lên nếu muốn.
 * ----------------------------------------------------------------------------
 */
import type { LevelId } from './content-types'

/** Dải band của 6 level cũ (để hiển thị kết quả xếp lớp cũ). */
export const LEGACY_LEVEL_BAND_RANGES = ['0 – 2.0', '2.0 – 3.0', '3.0 – 4.0', '4.0 – 5.0', '5.0 – 6.0', '6.0 – 6.5'] as const

/** Level cũ 1..6 -> level mới đang học. */
export function levelIdFromLegacyOrder(order: number): LevelId {
  return order <= 1 ? 'level-1' : 'level-2'
}

/** Level cũ 1..6 -> các level mới được mở khoá. */
export function unlockedLevelsFromLegacyOrder(order: number): LevelId[] {
  if (order <= 1) return ['level-1']
  if (order <= 3) return ['level-1', 'level-2']
  return ['level-1', 'level-2', 'level-3']
}

/** Dải band của 1 level cũ, VD 3 -> "3.0 – 4.0". */
export function legacyBandRange(order: number): string {
  return LEGACY_LEVEL_BAND_RANGES[Math.max(1, Math.min(6, Math.round(order))) - 1]
}

/** Tách chuỗi "2.0 – 3.0" -> { low: 2, high: 3 }. Chuỗi lạ -> null. */
export function parseBandRange(text: string | undefined | null): { low: number; high: number } | null {
  const numbers = (text ?? '').match(/\d+(\.\d+)?/g)?.map(Number) ?? []
  if (numbers.length === 0) return null
  return { low: Math.min(...numbers), high: Math.max(...numbers) }
}
