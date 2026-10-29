/**
 * GET /api/welcome-news — "TIN MỚI TRONG LÚC VẮNG" cho bảng Mừng quay lại
 *  - số tin nhắn chưa đọc (kênh gia đình + chat riêng)
 *  - lời thách đấu đang chờ (người khác mời lúc mình offline)
 * Gọi xong thì đánh dấu các lời thách đấu là đã xem.
 */
import { jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../backend-helpers/read-logged-in-user'
import { countUnreadMessages } from '../../backend-helpers/chat-queries'

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const unread = await countUnreadMessages(env.DB, user.id)
  const { results: challenges } = await env.DB.prepare(
    `SELECT c.id, c.game_type AS gameType, c.topic_id AS topicId, c.bet, c.created_at AS createdAt,
            c.from_user AS fromUserId, u.display_name AS fromName
       FROM challenges c JOIN users u ON u.id = c.from_user
      WHERE c.to_user = ? AND c.seen = 0 ORDER BY c.id DESC LIMIT 10`,
  )
    .bind(user.id)
    .all()
  await env.DB.prepare('UPDATE challenges SET seen = 1 WHERE to_user = ?').bind(user.id).run()
  return jsonResponse({ unread, challenges })
}
