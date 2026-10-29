/**
 * format-countdown.ts — ĐẾM NGƯỢC TỚI LƯỢT ÔN TIẾP THEO ("2 giờ 15 phút", "1 ngày 3 giờ")
 * ----------------------------------------------------------------------------
 * Chỉ giữ 2 đơn vị lớn nhất cho dễ đọc. Dưới 1 phút -> "dưới 1 phút".
 * ----------------------------------------------------------------------------
 */

export function formatCountdown(ms: number, language: 'vi' | 'en'): string {
  const vi = language === 'vi'
  const totalMinutes = Math.max(0, Math.round(ms / 60_000))
  if (totalMinutes < 1) return vi ? 'dưới 1 phút' : 'under a minute'
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60
  const part = (value: number, viWord: string, enWord: string) => (vi ? `${value} ${viWord}` : `${value} ${enWord}${value === 1 ? '' : 's'}`)
  const parts: string[] = []
  if (days) parts.push(part(days, 'ngày', 'day'))
  if (hours) parts.push(part(hours, 'giờ', 'hour'))
  if (!days && minutes) parts.push(part(minutes, 'phút', 'minute'))
  return parts.slice(0, 2).join(' ')
}
