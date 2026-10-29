/**
 * streak-rules.ts
 * ----------------------------------------------------------------------------
 * LUẬT CHUỖI NGÀY HỌC (streak) — theo docs/research/notes/psych-adult.md mục A10 + D7.
 *
 *  1. Chuỗi +1 khi trong ngày có ≥ 1 bài học HOẶC 1 phiên ôn thẻ trọn vẹn (hoặc làm 1 bài thi).
 *     (Chơi game, xem thẻ Học vui KHÔNG tính — chúng vẫn có XP và nhiệm vụ riêng.)
 *  2. "Bảo vệ chuỗi" (freeze) tự trang bị: cứ mỗi 7 ngày chuỗi được 1 cái, tối đa 2 cái.
 *     Lỡ 1–2 ngày mà có đủ freeze -> tự dùng, chuỗi giữ nguyên (không cộng thêm).
 *  3. Chuỗi đứt (không đủ freeze) -> mở "cửa sổ sửa chuỗi" 48 giờ: học 2 bài trong
 *     48 giờ đó thì chuỗi cũ được trả lại (cộng với các ngày vừa học).
 *     Chỉ mở khi quay lại sớm (vắng ≤ 3 ngày không được bảo vệ) và chuỗi cũ ≥ 2 ngày.
 *  4. "Tuần này x/7" và "Tổng số ngày học" KHÔNG BAO GIỜ bị reset — giảm cảm giác mất mát.
 *
 * Mọi hàm ở đây là hàm "thuần": nhận trạng thái cũ, trả trạng thái mới.
 * ----------------------------------------------------------------------------
 */
import type { LearningProgress, StreakState } from './progress-types'
import { addDays, daysBetween, todayString, weekStartDay } from './study-calendar'

export const FREEZE_EVERY_STREAK_DAYS = 7
export const MAX_FREEZES = 2
export const REPAIR_WINDOW_HOURS = 48
export const REPAIR_LESSONS_NEEDED = 2
/** Vắng quá số ngày (không được bảo vệ) này thì không cho sửa chuỗi nữa — bắt đầu lại nhẹ nhàng. */
export const REPAIR_MAX_UNPROTECTED_DAYS = 3
/** Chuỗi ngắn hơn số này thì đứt là thôi (không cần sửa). */
export const REPAIR_MIN_STREAK = 2
/** Giữ tối đa bao nhiêu ngày trong studyDates */
export const STUDY_DATES_TO_KEEP = 400

/** Loại hoạt động được tính để giữ chuỗi. */
export type StudyKind = 'lesson' | 'review' | 'exam'

function clearRepair(streak: StreakState): StreakState {
  const { repairUntil: _until, repairStreak: _streak, repairLessonsDone: _done, ...rest } = streak
  return rest
}

/**
 * "Chốt sổ" chuỗi tới thời điểm hiện tại:
 *   - Lỡ ngày mà đủ freeze -> dùng freeze, coi như hôm qua đã học.
 *   - Lỡ ngày mà không đủ -> chuỗi về 0, có thể mở cửa sổ sửa 48 giờ.
 *   - Cửa sổ sửa đã hết hạn -> xoá.
 * Gọi lúc mở web và trước mỗi lần ghi nhận ngày học. Gọi nhiều lần cũng không sao.
 */
export function settleStreak(streak: StreakState, now = new Date()): StreakState {
  const today = todayString(now)
  let result = streak

  // cửa sổ sửa chuỗi đã hết hạn
  if (result.repairUntil && new Date(result.repairUntil).getTime() < now.getTime()) result = clearRepair(result)

  const { lastStudyDate } = result
  if (!lastStudyDate || result.current === 0) return result
  const missedDays = daysBetween(lastStudyDate, today) - 1 // số ngày bỏ trống giữa lần học cuối và hôm nay
  if (missedDays <= 0) return result

  if (missedDays <= result.freezes) {
    // đủ freeze: dùng đúng số ngày lỡ, chuỗi vẫn sống (như thể hôm qua đã học)
    return { ...result, freezes: result.freezes - missedDays, lastStudyDate: addDays(today, -1) }
  }

  // không đủ freeze: chuỗi đứt (freeze còn lại giữ nguyên cho chuỗi mới)
  const unprotectedDays = missedDays - result.freezes
  const canRepair = result.current >= REPAIR_MIN_STREAK && unprotectedDays <= REPAIR_MAX_UNPROTECTED_DAYS
  const broken: StreakState = { ...clearRepair(result), current: 0 }
  if (!canRepair) return broken
  return {
    ...broken,
    repairUntil: new Date(now.getTime() + REPAIR_WINDOW_HOURS * 3_600_000).toISOString(),
    repairStreak: result.current,
    repairLessonsDone: 0,
  }
}

/**
 * Ghi nhận "hôm nay có học". Trả về chuỗi mới + cờ isNewStudyDay (lần đầu trong ngày).
 * kind 'lesson' còn được đếm vào phiên sửa chuỗi.
 */
export function registerStudy(streak: StreakState, kind: StudyKind, now = new Date()): { streak: StreakState; isNewStudyDay: boolean } {
  const today = todayString(now)
  let result = settleStreak(streak, now)
  const isNewStudyDay = result.lastStudyDate !== today

  if (isNewStudyDay) {
    const continues = result.lastStudyDate === addDays(today, -1) && result.current > 0
    const current = continues ? result.current + 1 : 1
    // kiếm freeze: mỗi khi chuỗi chạm bội số của 7
    const earnsFreeze = current % FREEZE_EVERY_STREAK_DAYS === 0 && result.freezes < MAX_FREEZES
    result = {
      ...result,
      current,
      longest: Math.max(result.longest, current),
      lastStudyDate: today,
      freezes: result.freezes + (earnsFreeze ? 1 : 0),
    }
  }

  // phiên sửa chuỗi: đủ 2 bài trong 48 giờ -> trả lại chuỗi cũ
  if (kind === 'lesson' && result.repairUntil && result.repairStreak) {
    const done = (result.repairLessonsDone ?? 0) + 1
    if (done >= REPAIR_LESSONS_NEEDED) {
      const restored = result.repairStreak + result.current
      result = { ...clearRepair(result), current: restored, longest: Math.max(result.longest, restored) }
    } else {
      result = { ...result, repairLessonsDone: done }
    }
  }
  return { streak: result, isNewStudyDay }
}

/** Thêm 1 ngày vào danh sách ngày học (không trùng, giữ thứ tự, giới hạn độ dài). */
export function addStudyDate(studyDates: string[], day: string): string[] {
  if (studyDates.includes(day)) return studyDates
  return [...studyDates, day].sort().slice(-STUDY_DATES_TO_KEEP)
}

/* ============================================================================
 * SỐ LIỆU HIỂN THỊ
 * ========================================================================== */

export interface StreakSummary {
  /** Chuỗi hiện tại (đã chốt sổ tới hôm nay) */
  current: number
  longest: number
  freezes: number
  studiedToday: boolean
  /** Có thể sửa chuỗi không, còn bao nhiêu bài, hạn chót */
  repairAvailable: boolean
  repairLessonsLeft: number
  repairUntil: string | null
  /** Chuỗi sẽ được trả lại nếu sửa thành công */
  repairStreak: number
  /** "Tuần này x/7" (tuần bắt đầu thứ Hai) */
  thisWeekDays: number
  /** "Tổng số ngày học" — không bao giờ giảm */
  totalStudyDays: number
}

/** Số ngày có học trong tuần (thứ Hai -> Chủ nhật) chứa `now`. */
export function studyDaysThisWeek(progress: LearningProgress, now = new Date()): number {
  const monday = weekStartDay(todayString(now))
  return progress.studyDates.filter((day) => day >= monday && day <= addDays(monday, 6)).length
}

/** Tổng số ngày học trọn đời (bộ đếm 'studyDays' — giữ cả số liệu từ bản cũ). */
export function totalStudyDays(progress: LearningProgress): number {
  return Math.max(progress.lifetimeStats.studyDays ?? 0, progress.studyDates.length)
}

export function streakSummary(progress: LearningProgress, now = new Date()): StreakSummary {
  const streak = settleStreak(progress.streak, now)
  const repairAvailable = !!streak.repairUntil && !!streak.repairStreak
  return {
    current: streak.current,
    longest: streak.longest,
    freezes: streak.freezes,
    studiedToday: streak.lastStudyDate === todayString(now),
    repairAvailable,
    repairLessonsLeft: repairAvailable ? Math.max(0, REPAIR_LESSONS_NEEDED - (streak.repairLessonsDone ?? 0)) : 0,
    repairUntil: repairAvailable ? streak.repairUntil! : null,
    repairStreak: repairAvailable ? streak.repairStreak! : 0,
    thisWeekDays: studyDaysThisWeek(progress, now),
    totalStudyDays: totalStudyDays(progress),
  }
}
