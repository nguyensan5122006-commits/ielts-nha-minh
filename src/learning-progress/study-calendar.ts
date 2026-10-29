/**
 * study-calendar.ts — CÁC HÀM NGÀY THÁNG DÙNG CHO TIẾN ĐỘ HỌC
 * ----------------------------------------------------------------------------
 * Tiến độ lưu ngày dạng chuỗi "YYYY-MM-DD" theo GIỜ CỦA MÁY người học
 * (gia đình ở Việt Nam nên trùng giờ VN). So sánh 2 chuỗi dạng này bằng < > là
 * đúng thứ tự thời gian, nên code rất gọn.
 *
 * Tuần bắt đầu từ thứ Hai (giống lịch Việt Nam và nhiệm vụ tuần).
 * ----------------------------------------------------------------------------
 */

const DAY_MS = 86_400_000

/** Ngày của 1 thời điểm (mặc định: hôm nay), dạng "YYYY-MM-DD" theo giờ máy. */
export function todayString(date = new Date()): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

/** Cộng / trừ số ngày vào 1 chuỗi ngày. VD addDays("2026-10-31", 1) = "2026-11-01". */
export function addDays(day: string, days: number): string {
  const date = new Date(day + 'T12:00:00') // 12h trưa để tránh lệch do giờ mùa hè
  date.setDate(date.getDate() + days)
  return todayString(date)
}

/** Số ngày từ `fromDay` tới `toDay` (toDay sau thì dương). */
export function daysBetween(fromDay: string, toDay: string): number {
  const from = new Date(fromDay + 'T12:00:00').getTime()
  const to = new Date(toDay + 'T12:00:00').getTime()
  return Math.round((to - from) / DAY_MS)
}

/** Ngày thứ Hai của tuần chứa `day`. */
export function weekStartDay(day: string): string {
  const weekday = new Date(day + 'T12:00:00').getDay() // 0 = Chủ nhật
  const daysSinceMonday = (weekday + 6) % 7
  return addDays(day, -daysSinceMonday)
}

/** Mã tuần đơn giản = ngày thứ Hai đầu tuần, VD "2026-10-26". Dùng làm khoá cho thẻ tem tuần. */
export function weekIdOf(day: string): string {
  return weekStartDay(day)
}

/** Chỉ giữ `keep` ngày gần nhất trong 1 bảng "ngày -> số" (cho JSON gọn). */
export function keepRecentDays<T>(byDay: Record<string, T>, keep: number): Record<string, T> {
  const days = Object.keys(byDay).sort()
  if (days.length <= keep) return byDay
  const result: Record<string, T> = {}
  for (const day of days.slice(-keep)) result[day] = byDay[day]
  return result
}
