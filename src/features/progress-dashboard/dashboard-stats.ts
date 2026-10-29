/**
 * dashboard-stats.ts — CÁC CON SỐ CỦA BẢNG TIẾN ĐỘ (/progress) — hàm thuần, không React
 * ----------------------------------------------------------------------------
 * Luật hiển thị (psych-adult D6 luật 23–25, D7 luật 30):
 *   - Band LUÔN là khoảng + độ tin cậy, chỉ hiện khi đủ dữ liệu
 *     (≥ 20 câu mỗi kỹ năng, hoặc ≥ 2 bài viết cho Writing). Không bao giờ 1 con số lẻ.
 *   - Track tổng quát: hiện bậc CEFR + câu "bạn có thể…" thay cho band.
 *   - Kỳ vọng trung thực: "với nhịp X phút/ngày, mốc tiếp theo sau khoảng N tháng"
 *     dựa trên ~200 giờ học / 1 bậc CEFR (Cambridge "guided learning hours").
 *   - "Tuần này x/7", "Tổng số ngày học" không bao giờ giảm (lấy từ streak-rules).
 * ----------------------------------------------------------------------------
 */
import type { LevelId, SkillName, TrackId } from '../../content/content-types'
import { findLevelInfo } from '../../content/all-levels'
import { levelProgress } from '../../content/path-selectors'
import type { BandEstimate, LearningProgress, SkillStat } from '../../learning-progress/progress-types'
import { addDays, todayString } from '../../learning-progress/study-calendar'

/* ============================================================================
 * 1. ĐỘ CHÍNH XÁC THEO KỸ NĂNG
 * ========================================================================== */

/** Tỉ lệ đúng của tối đa 40 câu gần nhất (0..1). null = chưa có câu nào. */
export function recentAccuracy(stat: SkillStat | undefined): number | null {
  if (!stat || stat.recent.length === 0) return null
  return stat.recent.reduce((sum, value) => sum + value, 0) / stat.recent.length
}

/**
 * Đường xu hướng cho sparkline: trung bình trượt (cửa sổ `window` câu) dọc 40 câu gần nhất.
 * VD recent có 40 giá trị 0/1, window 10 -> 31 điểm, mỗi điểm = tỉ lệ đúng của 10 câu liền nhau.
 */
export function accuracyTrend(stat: SkillStat | undefined, window = 12): number[] {
  const recent = stat?.recent ?? []
  if (recent.length < window + 2) return []
  const points: number[] = []
  for (let end = window; end <= recent.length; end++) {
    const slice = recent.slice(end - window, end)
    points.push(slice.reduce((sum, value) => sum + value, 0) / window)
  }
  return points
}

/**
 * Thay đổi (điểm %) giữa nửa sau và nửa trước của 40 câu gần nhất. VD +6 = nửa sau đúng nhiều hơn 6 điểm %.
 * null = chưa đủ 16 câu để so.
 */
export function accuracyChange(stat: SkillStat | undefined): number | null {
  const recent = stat?.recent ?? []
  if (recent.length < 16) return null
  const half = Math.floor(recent.length / 2)
  const mean = (list: number[]) => list.reduce((sum, value) => sum + value, 0) / list.length
  return Math.round((mean(recent.slice(half)) - mean(recent.slice(0, half))) * 100)
}

/* ============================================================================
 * 2. BAND ƯỚC TÍNH (dạng khoảng)
 * ========================================================================== */

/** Ngưỡng dữ liệu tối thiểu để được ước tính band (D6 luật 23). */
export const MIN_ITEMS_FOR_BAND = 20
export const MIN_ESSAYS_FOR_BAND = 2
/** Mục tiêu mặc định của web (người học chưa đặt mục tiêu riêng). */
export const DEFAULT_TARGET_BAND = 6.5

/** Band mục tiêu. Hồ sơ chưa có trường này -> 6.5 (xem REQUESTS.md: đề xuất thêm profile.targetBand). */
export function targetBandOf(progress: LearningProgress): number {
  const custom = (progress.profile as { targetBand?: unknown }).targetBand
  return typeof custom === 'number' && custom >= 3 && custom <= 9 ? custom : DEFAULT_TARGET_BAND
}

export type SkillBand =
  | { kind: 'range'; low: number; high: number; confidence: BandEstimate['confidence']; source: 'measured' | 'practice' }
  | { kind: 'insufficient'; needed: number; unit: 'items' | 'essays' }

/** Khoảng band của level hiện tại: level-1 0–2, level-2 2–4, level-3 4–6.5 (từ all-levels.ts). */
function levelBandRange(levelId: LevelId): [number, number] {
  const text = findLevelInfo(levelId)?.bandRange ?? '0 – 2.0'
  const [low, high] = text.split(/[–-]/).map((part) => Number.parseFloat(part.trim()))
  return [Number.isFinite(low) ? low : 0, Number.isFinite(high) ? high : 2]
}

const roundHalfDown = (value: number) => Math.floor(value * 2) / 2
const roundHalfUp = (value: number) => Math.ceil(value * 2) / 2

/**
 * Band ước tính của 1 kỹ năng:
 *   1. Có band đo được (bài thi / AI chấm — progress.bandEstimates) -> dùng luôn.
 *      Writing cần ≥ 2 bài viết trong nhật ký mới tin (luật 23).
 *   2. Không có, nhưng đã làm ≥ 20 câu -> ƯỚC từ bài luyện: vị trí trong khoảng band của level
 *      hiện tại, theo % chặng đã xong + độ chính xác gần đây. Độ tin cậy tối đa "vừa", khoảng rộng ±0.5.
 *   3. Chưa đủ -> báo còn thiếu bao nhiêu câu.
 */
export function skillBand(progress: LearningProgress, skill: SkillName): SkillBand {
  const stat = progress.skillStats[skill]
  const measured = progress.bandEstimates[skill]
  const essays = progress.writingLog.length
  if (measured && (skill !== 'writing' || essays >= MIN_ESSAYS_FOR_BAND)) {
    return { kind: 'range', low: measured.low, high: measured.high, confidence: measured.confidence, source: 'measured' }
  }

  const answered = stat?.answered ?? 0
  if (answered < MIN_ITEMS_FOR_BAND) return { kind: 'insufficient', needed: MIN_ITEMS_FOR_BAND - answered, unit: 'items' }

  const track = progress.profile.track
  const levelId = progress.currentLevel[track]
  const [levelLow, levelHigh] = levelBandRange(levelId)
  const done = levelProgress(track, levelId, progress).percent / 100
  const accuracy = recentAccuracy(stat) ?? 0.5
  // 0..1: nửa theo phần chặng đã xong, nửa theo độ chính xác (60% đúng = đầu khoảng, 95% = cuối khoảng)
  const position = Math.max(0, Math.min(1, 0.5 * done + 0.5 * Math.max(0, Math.min(1, (accuracy - 0.6) / 0.35))))
  const center = levelLow + (levelHigh - levelLow) * position
  const halfWidth = answered >= 80 ? 0.25 : 0.5
  let low = Math.max(0, roundHalfDown(center - halfWidth))
  let high = Math.min(9, roundHalfUp(center + halfWidth))
  if (high - low < 0.5) high = low + 0.5
  if (high > levelHigh + 0.5) {
    high = levelHigh + 0.5
    low = Math.min(low, high - 0.5)
  }
  return { kind: 'range', low, high, confidence: answered >= 80 ? 'medium' : 'low', source: 'practice' }
}

/** Còn bao nhiêu band tới mục tiêu: [ít nhất, nhiều nhất] (làm tròn 0.5). */
export function gapToTarget(band: { low: number; high: number }, target: number): [number, number] {
  return [Math.max(0, roundHalfUp(target - band.high)), Math.max(0, roundHalfUp(target - band.low))]
}

/* ============================================================================
 * 3. CEFR
 * ========================================================================== */

export type CefrLevel = 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2'
export const CEFR_ORDER: CefrLevel[] = ['Pre-A1', 'A1', 'A2', 'B1', 'B2']

/** Band IELTS -> bậc CEFR (bảng tương đương của Cambridge/IELTS, làm tròn cho gọn). */
export function cefrForBand(band: number): CefrLevel {
  if (band < 2) return 'Pre-A1'
  if (band < 3) return 'A1'
  if (band < 4) return 'A2'
  if (band < 5.5) return 'B1'
  return 'B2'
}

/** Bậc CEFR "đang đứng" theo level + phần trăm chặng (dùng cho track tổng quát). */
export function cefrForProgress(progress: LearningProgress, track: TrackId = progress.profile.track): CefrLevel {
  const levelId = progress.currentLevel[track]
  const percent = levelProgress(track, levelId, progress).percent
  if (levelId === 'level-1') return percent < 50 ? 'Pre-A1' : 'A1'
  if (levelId === 'level-2') return percent < 50 ? 'A1' : 'A2'
  return percent < 50 ? 'B1' : 'B2'
}

/* ============================================================================
 * 4. PHÚT HỌC, LỊCH HỌC
 * ========================================================================== */

/** Phút học từng ngày của `days` ngày gần nhất (cũ -> mới, gồm hôm nay). */
export function minutesSeries(progress: LearningProgress, days = 14, now = new Date()): { day: string; minutes: number }[] {
  const today = todayString(now)
  return Array.from({ length: days }, (_, index) => {
    const day = addDays(today, index - (days - 1))
    return { day, minutes: Math.round(progress.minutesByDay[day] ?? 0) }
  })
}

/** Phút trung bình mỗi ngày (tính cả ngày nghỉ = 0 phút — nhịp thật, không tô hồng). */
export function averageMinutesPerDay(progress: LearningProgress, days = 14, now = new Date()): number {
  const series = minutesSeries(progress, days, now)
  // người mới học chưa đủ `days` ngày: chỉ chia cho số ngày kể từ ngày học đầu tiên
  const firstStudy = progress.studyDates[0]
  const activeDays = firstStudy ? series.filter((entry) => entry.day >= firstStudy).length : days
  const total = series.reduce((sum, entry) => sum + entry.minutes, 0)
  return activeDays ? Math.round(total / activeDays) : 0
}

/**
 * Những ngày "bảo vệ chuỗi" đã giữ chuỗi cho người học (để tô riêng trên lịch).
 * Dữ liệu không lưu ngày dùng freeze, nên SUY RA: đi lùi từ ngày học cuối của chuỗi hiện tại,
 * đếm đủ `streak.current` ngày có học; các ngày trống ≤ 2 ngày liền nằm giữa = freeze
 * (mỗi người giữ tối đa 2 freeze). Khoảng trống dài hơn là đứt chuỗi đã được "sửa" -> coi như nghỉ.
 */
export function inferFreezeDays(progress: LearningProgress): Set<string> {
  const freezeDays = new Set<string>()
  const studied = new Set(progress.studyDates)
  const { current, lastStudyDate } = progress.streak
  if (!lastStudyDate || current <= 1) return freezeDays
  let counted = 0
  let day = lastStudyDate
  let gap: string[] = []
  for (let guard = 0; guard < 400 && counted < current; guard++) {
    if (studied.has(day)) {
      // freeze chỉ có khi chuỗi TRƯỚC khoảng trống đã ≥ 7 ngày (freeze kiếm được mỗi 7 ngày chuỗi);
      // chuỗi ngắn hơn mà vẫn nối được = đã "sửa chuỗi" bằng 2 bài -> không tô là freeze
      const olderStreakDays = current - counted
      if (gap.length > 0 && gap.length <= 2 && olderStreakDays >= 7) gap.forEach((gapDay) => freezeDays.add(gapDay))
      gap = []
      counted++
    } else {
      gap.push(day)
      if (gap.length > 4) break
    }
    day = addDays(day, -1)
  }
  return freezeDays
}

/* ============================================================================
 * 5. KỲ VỌNG TRUNG THỰC: bao lâu tới mốc tiếp theo?
 * ========================================================================== */

/** ~200 giờ học có hướng dẫn cho mỗi bậc CEFR (Cambridge English, psych-adult D6 luật 25). */
export const HOURS_PER_CEFR_STEP = 200

/** Mốc cuối mỗi level (bậc CEFR + band) — mỗi level ≈ 1 bậc CEFR. */
const LEVEL_MILESTONE: Record<LevelId, { cefr: CefrLevel; band: string }> = {
  'level-1': { cefr: 'A1', band: '2.0' },
  'level-2': { cefr: 'B1', band: '4.0' },
  'level-3': { cefr: 'B2', band: '6.5' },
}

export interface Projection {
  milestone: { cefr: CefrLevel; band: string }
  /** % level hiện tại đã xong */
  levelPercent: number
  minutesPerDay: number
  /** số giờ học còn lại tới mốc (ước tính) */
  remainingHours: number
  /** số bài còn lại tới hết level */
  lessonsLeft: number
  /** [ít nhất, nhiều nhất] tháng ở nhịp hiện tại; null = chưa có nhịp */
  months: [number, number] | null
  /** gợi ý nhịp cao hơn (mục tiêu ngày hoặc +10 phút) và số tháng tương ứng */
  faster: { minutesPerDay: number; months: [number, number] } | null
  done: boolean
}

function monthsFor(hours: number, minutesPerDay: number): [number, number] {
  const months = (hours * 60) / (minutesPerDay * 30.4)
  // ±15% vì nhịp học mỗi người dao động — hiện khoảng, không hiện 1 con số "chắc nịch"
  return [Math.max(0, Math.round(months * 0.85)), Math.max(1, Math.round(months * 1.15))]
}

export function projectNextMilestone(progress: LearningProgress, now = new Date()): Projection {
  const track = progress.profile.track
  const levelId = progress.currentLevel[track]
  const level = levelProgress(track, levelId, progress)
  const remainingHours = HOURS_PER_CEFR_STEP * (1 - level.percent / 100)
  const minutesPerDay = averageMinutesPerDay(progress, 14, now)
  const done = levelId === 'level-3' && level.isComplete
  const goal = Math.max(progress.profile.dailyGoalMinutes, minutesPerDay + 10)
  return {
    milestone: LEVEL_MILESTONE[levelId],
    levelPercent: level.percent,
    minutesPerDay,
    remainingHours: Math.round(remainingHours),
    lessonsLeft: Math.max(0, level.total - level.done),
    months: minutesPerDay > 0 ? monthsFor(remainingHours, minutesPerDay) : null,
    // chỉ gợi ý nhịp cao hơn khi đang học ít (dưới mục tiêu ngày hoặc dưới 20 phút) — không ép người đã học nhiều
    faster: minutesPerDay > 0 && minutesPerDay < Math.max(progress.profile.dailyGoalMinutes, 20) ? { minutesPerDay: goal, months: monthsFor(remainingHours, goal) } : null,
    done,
  }
}

/* ============================================================================
 * 6. NHẬT KÝ BÀI VIẾT: tự chấm vs AI
 * ========================================================================== */

export interface WritingPoint {
  index: number
  self: number
  aiLow: number
  aiHigh: number
  at: string
}

/** Các bài có ĐỦ tự chấm + AI chấm (tối đa `limit` bài gần nhất). */
export function writingPoints(progress: LearningProgress, limit = 10): WritingPoint[] {
  return progress.writingLog
    .filter((entry) => entry.selfBand !== undefined && entry.aiLow !== undefined && entry.aiHigh !== undefined)
    .slice(-limit)
    .map((entry, index) => ({ index: index + 1, self: entry.selfBand!, aiLow: entry.aiLow!, aiHigh: entry.aiHigh!, at: entry.at }))
}

/** Độ lệch tự chấm (tự chấm − giữa khoảng AI): trung bình 2 bài đầu và 2 bài gần nhất. */
export function selfScoreGap(points: WritingPoint[]): { first: number; last: number } | null {
  if (points.length < 2) return null
  const gapOf = (point: WritingPoint) => point.self - (point.aiLow + point.aiHigh) / 2
  const average = (list: WritingPoint[]) => list.reduce((sum, point) => sum + gapOf(point), 0) / list.length
  return { first: average(points.slice(0, 2)), last: average(points.slice(-2)) }
}
