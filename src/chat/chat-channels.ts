/**
 * chat-channels.ts — QUY ƯỚC TÊN KÊNH CHAT (dùng chung trang web + máy chủ)
 *   "family"      : kênh cả nhà
 *   "dm:<a>:<b>"  : chat riêng giữa người id a và b (a < b, để 2 người luôn ra cùng 1 tên kênh)
 */
export const FAMILY_CHANNEL = 'family'

/** Tên kênh chat riêng giữa 2 người. */
export function directChannel(userA: number, userB: number): string {
  return `dm:${Math.min(userA, userB)}:${Math.max(userA, userB)}`
}

/** Người dùng có được vào kênh này không? */
export function canAccessChannel(channel: string, userId: number): boolean {
  if (channel === FAMILY_CHANNEL) return true
  const match = channel.match(/^dm:(\d+):(\d+)$/)
  return !!match && (Number(match[1]) === userId || Number(match[2]) === userId)
}
