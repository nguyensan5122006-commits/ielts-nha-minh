/**
 * GET /api/chat/messages?channel=family&beforeId=123 — LỊCH SỬ TIN NHẮN
 * Trả 40 tin gần nhất (hoặc 40 tin trước beforeId khi cuộn lên xem tin cũ).
 * Gửi tin mới không qua API này mà qua kết nối realtime (WebSocket).
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { canAccessChannel } from '../../../backend-helpers/chat-queries'

const PAGE_SIZE = 40

export const onRequestGet: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const url = new URL(request.url)
  const channel = url.searchParams.get('channel') ?? 'family'
  const beforeId = Number(url.searchParams.get('beforeId') ?? 0) || Number.MAX_SAFE_INTEGER
  if (!canAccessChannel(channel, user.id)) return errorResponse('Không có quyền xem kênh này', 403)

  const { results } = await env.DB.prepare(
    `SELECT id, channel, sender_id AS senderId, kind, body, effect, created_at AS createdAt
       FROM chat_messages WHERE channel = ? AND id < ? ORDER BY id DESC LIMIT ?`,
  )
    .bind(channel, beforeId, PAGE_SIZE)
    .all()

  // người kia đã đọc tới tin nào (để hiện "đã xem")
  const { results: reads } = await env.DB.prepare('SELECT user_id AS userId, last_read_id AS lastReadId FROM chat_reads WHERE channel = ?')
    .bind(channel)
    .all()

  return jsonResponse({ messages: results.reverse(), reads, hasMore: results.length === PAGE_SIZE })
}
