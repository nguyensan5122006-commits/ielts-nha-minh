/**
 * POST /api/economy/use-item — DÙNG ĐỒ HỌC TẬP
 * Body: { itemId }
 *   study-streak-freeze : trang web gọi khi phát hiện vừa lỡ 1 ngày -> giữ streak
 *   study-heart-refill  : hết tim trong mini-test -> hồi 5 tim
 *   study-ai-extra      : +5 lượt AI hôm nay (giảm bộ đếm ai_usage đi 5)
 * (Sức mạnh thi đấu được dùng trong trận qua máy chủ realtime, không qua API này.)
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { consumeInventoryItem, getInventory } from '../../../backend-helpers/banana-ledger'
import { vietnamDay } from '../../../backend-helpers/vietnam-time'

const USABLE_HERE = ['study-streak-freeze', 'study-heart-refill', 'study-ai-extra']

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { itemId } = (await request.json()) as { itemId?: string }
  if (!itemId || !USABLE_HERE.includes(itemId)) return errorResponse('Không dùng được món này ở đây')
  if (!(await consumeInventoryItem(env.DB, user.id, itemId))) return errorResponse('Bạn không còn món này', 402)

  if (itemId === 'study-ai-extra') {
    await env.DB.prepare(
      `INSERT INTO ai_usage (user_id, day, count) VALUES (?, ?, -5)
       ON CONFLICT(user_id, day) DO UPDATE SET count = count - 5`,
    )
      .bind(user.id, vietnamDay())
      .run()
  }
  return jsonResponse({ ok: true, inventory: await getInventory(env.DB, user.id) })
}
