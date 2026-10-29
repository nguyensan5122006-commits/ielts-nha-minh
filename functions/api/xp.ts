/**
 * POST /api/xp — GHI NHẬN XP VỪA KIẾM ĐƯỢC
 * Body: { amount }. Mỗi lần ghi 1 dòng vào xp_events để tính bảng xếp hạng tuần.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../backend-helpers/read-logged-in-user'

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { amount } = (await request.json()) as { amount?: number }
  // Chặn số XP vô lý (1 lần nhận tối đa 200 XP)
  if (!Number.isInteger(amount) || amount! <= 0 || amount! > 200) return errorResponse('XP không hợp lệ')
  await env.DB.prepare('INSERT INTO xp_events (user_id, amount) VALUES (?, ?)').bind(user.id, amount).run()
  return jsonResponse({ ok: true })
}
