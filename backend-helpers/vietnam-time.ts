/**
 * vietnam-time.ts — NGÀY / TUẦN THEO GIỜ VIỆT NAM (UTC+7)
 * Máy chủ Cloudflare chạy giờ UTC, nên phải cộng 7 tiếng để "hôm nay" đúng giờ VN.
 * (File này không phụ thuộc Cloudflare nên trang web cũng dùng được.)
 */
const VN_OFFSET_MS = 7 * 3_600_000

/** "YYYY-MM-DD" theo giờ Việt Nam. */
export function vietnamDay(date = new Date()): string {
  return new Date(date.getTime() + VN_OFFSET_MS).toISOString().slice(0, 10)
}

/** Ngày hôm qua theo giờ VN. */
export function vietnamYesterday(): string {
  return vietnamDay(new Date(Date.now() - 86_400_000))
}

/** Mã tuần ISO theo giờ VN, VD "2026-W41" (tuần bắt đầu thứ Hai). */
export function vietnamWeekId(date = new Date()): string {
  const local = new Date(date.getTime() + VN_OFFSET_MS)
  const day = new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()))
  const weekday = day.getUTCDay() || 7 // CN = 7
  day.setUTCDate(day.getUTCDate() + 4 - weekday) // về thứ Năm cùng tuần (quy tắc ISO)
  const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((day.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
  return `${day.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

/** Mã tuần trước. */
export function previousVietnamWeekId(): string {
  return vietnamWeekId(new Date(Date.now() - 7 * 86_400_000))
}

/** Số thứ tự tuần (dùng để xoay vòng chủ đề / boss mỗi tuần). */
export function weekNumber(weekId: string): number {
  const [year, week] = weekId.split('-W').map(Number)
  return year * 53 + week
}

/** 0h thứ Hai tuần này (giờ VN), đổi về UTC dạng "YYYY-MM-DD HH:MM:SS" giống SQLite. */
export function startOfVietnamWeekSql(): string {
  const nowVietnam = new Date(Date.now() + VN_OFFSET_MS)
  const daysSinceMonday = (nowVietnam.getUTCDay() + 6) % 7
  const mondayVietnam = Date.UTC(nowVietnam.getUTCFullYear(), nowVietnam.getUTCMonth(), nowVietnam.getUTCDate() - daysSinceMonday)
  return new Date(mondayVietnam - VN_OFFSET_MS).toISOString().slice(0, 19).replace('T', ' ')
}

/** 0h hôm nay (giờ VN) dạng SQLite UTC. */
export function startOfVietnamDaySql(): string {
  const nowVietnam = new Date(Date.now() + VN_OFFSET_MS)
  const midnight = Date.UTC(nowVietnam.getUTCFullYear(), nowVietnam.getUTCMonth(), nowVietnam.getUTCDate())
  return new Date(midnight - VN_OFFSET_MS).toISOString().slice(0, 19).replace('T', ' ')
}
