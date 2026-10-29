/**
 * chat-queries.ts — CÁC TRUY VẤN CHAT DÙNG CHUNG
 * (Quy ước tên kênh: xem src/chat/chat-channels.ts)
 */

import { FAMILY_CHANNEL, canAccessChannel } from '../src/chat/chat-channels'

// tên kênh và quyền truy cập định nghĩa ở file dùng chung với trang web
export { FAMILY_CHANNEL, canAccessChannel, directChannel } from '../src/chat/chat-channels'

/** Danh sách kênh mà người dùng tham gia (gia đình + các kênh riêng đã có tin). */
export async function listUserChannels(db: D1Database, userId: number): Promise<string[]> {
  const { results } = await db
    .prepare("SELECT DISTINCT channel FROM chat_messages WHERE channel LIKE ? OR channel LIKE ?")
    .bind(`dm:${userId}:%`, `dm:%:${userId}`)
    .all<{ channel: string }>()
  return [FAMILY_CHANNEL, ...results.map((r) => r.channel).filter((c) => canAccessChannel(c, userId))]
}

/** Số tin chưa đọc theo từng kênh: { family: 3, "dm:1:2": 1 } (không tính tin của chính mình). */
export async function countUnreadMessages(db: D1Database, userId: number): Promise<Record<string, number>> {
  const channels = await listUserChannels(db, userId)
  const unread: Record<string, number> = {}
  for (const channel of channels) {
    const row = await db
      .prepare(
        `SELECT COUNT(*) AS n FROM chat_messages
          WHERE channel = ? AND sender_id != ?
            AND id > COALESCE((SELECT last_read_id FROM chat_reads WHERE user_id = ? AND channel = ?), 0)`,
      )
      .bind(channel, userId, userId, channel)
      .first<{ n: number }>()
    if (row?.n) unread[channel] = row.n
  }
  return unread
}
