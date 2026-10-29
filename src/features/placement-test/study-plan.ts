/**
 * study-plan.ts
 * ----------------------------------------------------------------------------
 * "KẾ HOẠCH TRUNG THỰC" SAU BÀI XẾP LỚP — các con số trên màn kết quả.
 * (Hàm thuần: không React, không localStorage — đọc 1 chỗ là hiểu cách tính.)
 *
 * Luật gốc: _research/notes/psych-adult.md
 *   - D6 luật 25 "Kỳ vọng trung thực": hiện "với X phút/ngày, mốc CEFR tiếp theo
 *     dự kiến sau khoảng N tháng", dựa trên ~200 giờ luyện tập cho mỗi bậc CEFR.
 *   - A18: giờ học có hướng dẫn cộng dồn từ con số 0 (Cambridge):
 *       A1 ~ 90–100 giờ · A2 ~ 180–200 · B1 ~ 350–400 · B2 ~ 500–600.
 *   - D1: mục tiêu phút/ngày mặc định theo band (người mới ít, người giỏi nhiều hơn).
 *   - D6 luật 23: không bao giờ hiện 1 con số band lẻ — chỉ khoảng band.
 *
 * Cách tính số tháng (dễ hiểu):
 *   1. Đổi band -> "số giờ luyện tập cộng dồn" bằng bảng mốc HOURS_AT_BAND
 *      (giữa 2 mốc thì nội suy đường thẳng).
 *   2. Giờ còn thiếu = giờ của mốc tiếp theo − giờ của band hiện tại.
 *   3. Số tháng = giờ còn thiếu ÷ (phút mỗi ngày × 30 ngày ÷ 60).
 *   Đây là ước tính THẬT (không tô hồng) — học thêm ngoài app (phim, nhạc, đọc báo)
 *   sẽ nhanh hơn; giao diện nói rõ điều đó.
 * ----------------------------------------------------------------------------
 */
import type { LevelId, TrackId } from '../../content/content-types'
import type { CefrLabel } from '../../content/exams/index-v3'
import { findLessonSummary } from '../../content/lesson-index'
import { pathLessonIds, unitsFor } from '../../content/path-selectors'
import type { AgeGroup } from '../../../backend-helpers/age-groups'

/** Mục tiêu đạt được của cả lộ trình (đỉnh Level 3). */
export const GOAL_BAND = 6.5

/** Các lựa chọn "phút mỗi ngày" trên màn kết quả. */
export const DAILY_MINUTE_OPTIONS = [10, 15, 20, 30] as const

/**
 * Mốc: band IELTS -> số giờ luyện tập cộng dồn (từ con số 0).
 * Neo theo bảng Cambridge ở trên + bảng IELTS↔CEFR (IDP) trong placement-v3.ts:
 *   band 2.0 ≈ đạt A1 · 3.0 ≈ đạt A2 · 4.0 ≈ đạt B1 · 5.5 ≈ đạt B2 · 6.5 ≈ B2 vững.
 */
const HOURS_AT_BAND: [band: number, hours: number][] = [
  [0, 0],
  [2.0, 95],
  [3.0, 190],
  [4.0, 375],
  [5.5, 550],
  [6.5, 650],
  [7.5, 750],
]

/** Các mốc tiếp theo người học nhìn thấy (bậc CEFR, cuối cùng là mục tiêu 6.5). */
const MILESTONES: { band: number; label: string }[] = [
  { band: 2.0, label: 'A1' },
  { band: 3.0, label: 'A2' },
  { band: 4.0, label: 'B1' },
  { band: 5.5, label: 'B2' },
  { band: GOAL_BAND, label: 'IELTS 6.5' },
]

/** Số giờ luyện tập cộng dồn ứng với 1 band (nội suy giữa 2 mốc gần nhất). */
export function hoursAtBand(band: number): number {
  const points = HOURS_AT_BAND
  if (band <= points[0][0]) return 0
  for (let i = 1; i < points.length; i++) {
    const [b1, h1] = points[i]
    const [b0, h0] = points[i - 1]
    if (band <= b1) return h0 + ((band - b0) / (b1 - b0)) * (h1 - h0)
  }
  return points[points.length - 1][1]
}

export interface NextMilestoneEstimate {
  /** Nhãn mốc: 'A1' | 'A2' | 'B1' | 'B2' | 'IELTS 6.5' */
  label: string
  /** Số giờ luyện tập còn thiếu (làm tròn) */
  hours: number
  /** Số tháng ước tính với nhịp phút/ngày đã chọn (≥ 1) */
  months: number
}

/**
 * Mốc tiếp theo + số tháng ước tính.
 * `bandPoint` = điểm ước lượng nội bộ của bài xếp lớp (KHÔNG hiện ra màn hình).
 * Đã chạm mục tiêu 6.5 -> null (giao diện nói "giữ phong độ + luyện đề").
 */
export function estimateNextMilestone(bandPoint: number, minutesPerDay: number): NextMilestoneEstimate | null {
  const next = MILESTONES.find((milestone) => milestone.band > bandPoint + 0.05)
  if (!next) return null
  const hours = Math.max(1, hoursAtBand(next.band) - hoursAtBand(bandPoint))
  const hoursPerMonth = (Math.max(5, minutesPerDay) * 30) / 60
  return { label: next.label, hours: Math.round(hours), months: Math.max(1, Math.round(hours / hoursPerMonth)) }
}

/** Phút/ngày gợi ý sẵn (D1): người mới ít phút để dễ giữ thói quen; bé 15 phút (giới hạn chơi 30). */
export function defaultDailyMinutes(level: LevelId, ageGroup: AgeGroup): number {
  if (ageGroup === 'kid') return 15
  if (level === 'level-1') return 10
  if (level === 'level-2') return 15
  return 20
}

export interface LevelPlanNumbers {
  /** Số bài trên đường đi của level (theo track) */
  lessons: number
  /** Số chặng */
  units: number
  /** Phút trung bình / bài (từ estimatedMinutes của bài; thiếu thì ~6) */
  minutesPerLesson: number
  /** Tên + id bài đầu tiên của level (để nói "Bài đầu tiên: …") */
  firstUnitTitle: { vi: string; en: string } | null
}

/** Số liệu cụ thể của 1 level theo track — kiểu "2 chặng · 12 khoá · 6 giờ/tuần" của Prep. */
export function levelPlanNumbers(track: TrackId, level: LevelId): LevelPlanNumbers {
  const ids = pathLessonIds(track, level)
  // đọc "mục lục nhẹ" (lesson-index) — KHÔNG tải nội dung bài. Mục lục đã tự ước lượng số phút
  // cho bài không ghi; thiếu hẳn thì tính ~6 phút (bài luyện tập 6–8 câu, psych-adult D1)
  const minutes = ids.map((id) => {
    const value = findLessonSummary(id)?.estimatedMinutes
    return typeof value === 'number' && value > 0 ? value : 6
  })
  const average = minutes.length ? minutes.reduce((sum, m) => sum + m, 0) / minutes.length : 6
  const units = unitsFor(track, level)
  return {
    lessons: ids.length,
    units: units.length,
    minutesPerLesson: Math.max(3, Math.round(average)),
    firstUnitTitle: units[0]?.title ?? null,
  }
}

/**
 * Câu "can-do" theo CEFR — người học ĐANG làm được gì (thang CEFR chính thức, viết lại cho dễ hiểu).
 * Hiện dưới dòng "Bạn ở Level X" để kết quả có nghĩa, không chỉ là con số.
 */
export const CAN_DO_BY_CEFR: Record<CefrLabel, { vi: string; en: string }> = {
  'Pre-A1': {
    vi: 'Bạn nhận ra một số từ và câu chào quen thuộc. Level 1 sẽ giúp bạn tự giới thiệu, nghe hiểu số và giờ.',
    en: 'You recognise some familiar words and greetings. Level 1 helps you introduce yourself and catch numbers and times.',
  },
  A1: {
    vi: 'Bạn hiểu và dùng được câu đơn giản về bản thân, gia đình, số và giờ giấc.',
    en: 'You can understand and use simple sentences about yourself, your family, numbers and times.',
  },
  A2: {
    vi: 'Bạn hiểu câu thường gặp về chủ đề quen thuộc và kể được việc hằng ngày bằng câu ngắn.',
    en: 'You understand everyday sentences on familiar topics and can describe your routine in short sentences.',
  },
  B1: {
    vi: 'Bạn nắm được ý chính khi nghe, đọc về chủ đề quen thuộc và nói được về trải nghiệm, kế hoạch của mình.',
    en: 'You get the main points of familiar topics and can talk about your experiences and plans.',
  },
  B2: {
    vi: 'Bạn hiểu ý chính của bài khá phức tạp và trao đổi khá trôi chảy về nhiều chủ đề.',
    en: 'You understand the main ideas of fairly complex texts and can discuss many topics quite fluently.',
  },
}

/** Hiển thị band dạng "2.5–3.5" (luôn là khoảng, không bao giờ 1 số lẻ). */
export function formatBandRange(low: number, high: number): string {
  const fmt = (band: number) => (Number.isInteger(band) ? band.toFixed(1) : String(band))
  return `${fmt(low)}–${fmt(high)}`
}
