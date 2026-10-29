/**
 * /api/games/daily-word — THỬ THÁCH TỪ MỖI NGÀY (kiểu Wordle)
 *   GET  : kết quả hôm nay của cả nhà (chỉ hiện ô màu, không lộ chữ) + kết quả của mình
 *   POST { guesses, solved, pattern } : lưu kết quả (mỗi ngày 1 lần)
 * Từ bí ẩn được chọn ở trang web theo ngày (giống nhau cho cả nhà).
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { vietnamDay } from '../../../backend-helpers/vietnam-time'

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const { results } = await env.DB.prepare(
    `SELECT d.user_id AS userId, u.display_name AS displayName, d.guesses, d.solved, d.pattern
       FROM daily_word_results d JOIN users u ON u.id = d.user_id WHERE d.day = ? ORDER BY d.solved DESC, d.guesses ASC`,
  )
    .bind(vietnamDay())
    .all<{ userId: number }>()
  return jsonResponse({ day: vietnamDay(), results, mine: results.find((r) => r.userId === user.id) ?? null })
}

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { guesses, solved, pattern } = (await request.json()) as { guesses?: number; solved?: boolean; pattern?: string }
  if (!Number.isInteger(guesses) || guesses! < 1 || guesses! > 6 || typeof pattern !== 'string' || pattern.length > 400) {
    return errorResponse('Dữ liệu không hợp lệ')
  }
  const day = vietnamDay()
  try {
    await env.DB.prepare('INSERT INTO daily_word_results (user_id, day, guesses, solved, pattern) VALUES (?, ?, ?, ?, ?)')
      .bind(user.id, day, guesses, solved ? 1 : 0, pattern)
      .run()
  } catch {
    return errorResponse('Hôm nay bạn đã chơi rồi / Already played today', 409)
  }
  return jsonResponse({ ok: true })
}
