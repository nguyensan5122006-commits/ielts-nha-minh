/**
 * /api/games/records — KỶ LỤC MINI GAME CHƠI 1 MÌNH
 *   GET  ?game=spelling : bảng kỷ lục (mọi lúc) cả nhà của game đó
 *   POST { game, score } : gửi điểm vừa chơi
 *        - cao hơn kỷ lục mọi lúc cũ  -> lưu vào game_records (bảng cũ, 0002)
 *        - đồng thời ghi kỷ lục TUẦN  -> game_weekly_best (bảng mới, 0004)
 * Game hợp lệ: SCORE_GAMES trong backend-helpers/word-game-names.ts.
 * Bảng xem tổng hợp cả 5 trò (mọi lúc + tuần này): /api/games/board.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { vietnamWeekId } from '../../../backend-helpers/vietnam-time'
import { isScoreGame } from '../../../backend-helpers/word-game-names'

const MAX_SCORE = 100_000

export const onRequestGet: ApiHandler = async ({ request, env }) => {
  const game = new URL(request.url).searchParams.get('game') ?? ''
  const { results } = await env.DB.prepare(
    `SELECT r.user_id AS userId, u.display_name AS displayName, r.best_score AS bestScore, r.updated_at AS updatedAt
       FROM game_records r JOIN users u ON u.id = r.user_id WHERE r.game = ? ORDER BY r.best_score DESC LIMIT 20`,
  )
    .bind(game)
    .all()
  return jsonResponse({ records: results })
}

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { game, score } = (await request.json()) as { game?: string; score?: number }
  if (!isScoreGame(game) || !Number.isFinite(score) || score! < 0 || score! > MAX_SCORE) return errorResponse('Dữ liệu không hợp lệ')
  const points = Math.round(score!)

  const previous = await env.DB.prepare('SELECT best_score FROM game_records WHERE user_id = ? AND game = ?').bind(user.id, game).first<{ best_score: number }>()
  const isNewRecord = !previous || points > previous.best_score
  if (isNewRecord) {
    await env.DB.prepare(
      `INSERT INTO game_records (user_id, game, best_score, updated_at) VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, game) DO UPDATE SET best_score = excluded.best_score, updated_at = excluded.updated_at`,
    )
      .bind(user.id, game, points)
      .run()
  }

  // Kỷ lục tuần: giữ điểm cao nhất (MAX) + đếm số ván. Bọc try/catch: nếu Cloudflare chưa chạy
  // migration 0004 (chưa có bảng) thì vẫn lưu kỷ lục mọi lúc bình thường, chỉ bỏ qua phần tuần.
  let previousWeekBest: number | null = null
  try {
    const week = vietnamWeekId()
    const weekRow = await env.DB.prepare('SELECT best_score FROM game_weekly_best WHERE week = ? AND game = ? AND user_id = ?')
      .bind(week, game, user.id)
      .first<{ best_score: number }>()
    previousWeekBest = weekRow?.best_score ?? null
    await env.DB.prepare(
      `INSERT INTO game_weekly_best (week, game, user_id, best_score, rounds, updated_at) VALUES (?, ?, ?, ?, 1, datetime('now'))
       ON CONFLICT(week, game, user_id) DO UPDATE SET
         best_score = MAX(best_score, excluded.best_score),
         rounds     = rounds + 1,
         updated_at = excluded.updated_at`,
    )
      .bind(week, game, user.id, points)
      .run()
  } catch {
    /* chưa có bảng game_weekly_best -> bỏ qua */
  }

  return jsonResponse({ isNewRecord, previousBest: previous?.best_score ?? null, previousWeekBest })
}
