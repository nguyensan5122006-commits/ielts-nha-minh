/**
 * GET /api/economy — "VÍ" CỦA NGƯỜI ĐANG ĐĂNG NHẬP
 * Trả về: số chuối, túi đồ, các món đang dùng (avatar, khung...), lượt AI hôm nay,
 * tổng XP (tính trên máy chủ) để biết level tài khoản.
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { getInventory } from '../../../backend-helpers/banana-ledger'
import { vietnamDay } from '../../../backend-helpers/vietnam-time'

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const row = await env.DB.prepare('SELECT bananas, avatar, frame, name_color, title FROM users WHERE id = ?')
    .bind(user.id)
    .first<{ bananas: number; avatar: string; frame: string | null; name_color: string | null; title: string | null }>()
  const xp = await env.DB.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM xp_events WHERE user_id = ?').bind(user.id).first<{ total: number }>()
  const ai = await env.DB.prepare('SELECT count FROM ai_usage WHERE user_id = ? AND day = ?').bind(user.id, vietnamDay()).first<{ count: number }>()

  return jsonResponse({
    bananas: row?.bananas ?? 0,
    inventory: await getInventory(env.DB, user.id),
    equipped: { avatar: row?.avatar ?? 'avatar-smile', frame: row?.frame, 'name-color': row?.name_color, title: row?.title },
    serverXp: xp?.total ?? 0,
    aiUsedToday: ai?.count ?? 0,
    aiDailyLimit: Number(env.AI_DAILY_LIMIT || 40),
  })
}
