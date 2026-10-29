/**
 * /api/games/weekly-tournament — GIẢI ĐẤU TUẦN
 *   GET  : chủ đề tuần này, bảng điểm tuần này, nhà vô địch tuần trước
 *   POST { score } : gửi điểm 1 lượt chơi (giữ điểm cao nhất của tuần)
 * Trao giải tuần trước kiểu "lười": lần đầu có ai gọi GET trong tuần mới,
 * máy chủ trao chuối cho top 3 tuần trước (dedupe key đảm bảo chỉ trao 1 lần).
 */
import { WEEKLY_TOURNAMENT_PRIZES } from '../../../src/game-economy/banana-rewards'
import { TOURNAMENT_QUESTION_COUNT, tournamentTopicOfWeek } from '../../../src/game-economy/weekly-events'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { grantBananas } from '../../../backend-helpers/banana-ledger'
import { previousVietnamWeekId, vietnamWeekId, weekNumber } from '../../../backend-helpers/vietnam-time'

/** Mỗi câu tối đa 100 điểm. */
const MAX_SCORE = TOURNAMENT_QUESTION_COUNT * 100

async function leaderboard(db: D1Database, week: string) {
  const { results } = await db
    .prepare(
      `SELECT w.user_id AS userId, u.display_name AS displayName, w.best_score AS bestScore
         FROM weekly_scores w JOIN users u ON u.id = w.user_id WHERE w.week = ? ORDER BY w.best_score DESC`,
    )
    .bind(week)
    .all<{ userId: number; displayName: string; bestScore: number }>()
  return results
}

export const onRequestGet: ApiHandler = async ({ env }) => {
  const week = vietnamWeekId()
  const lastWeek = previousVietnamWeekId()
  const lastWeekBoard = await leaderboard(env.DB, lastWeek)

  // trao giải tuần trước (chỉ người có điểm > 0)
  for (const [index, entry] of lastWeekBoard.slice(0, 3).entries()) {
    if (entry.bestScore > 0) {
      await grantBananas(env.DB, entry.userId, WEEKLY_TOURNAMENT_PRIZES[index], `weekly-rank-${index + 1}:${lastWeek}`, `weekly:${lastWeek}:${entry.userId}`)
    }
  }

  return jsonResponse({
    week,
    topicId: tournamentTopicOfWeek(weekNumber(week)),
    leaderboard: await leaderboard(env.DB, week),
    lastWeek: { week: lastWeek, topicId: tournamentTopicOfWeek(weekNumber(lastWeek)), podium: lastWeekBoard.slice(0, 3) },
    prizes: WEEKLY_TOURNAMENT_PRIZES,
  })
}

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { score } = (await request.json()) as { score?: number }
  if (!Number.isFinite(score) || score! < 0 || score! > MAX_SCORE) return errorResponse('Điểm không hợp lệ')
  await env.DB.prepare(
    `INSERT INTO weekly_scores (week, user_id, best_score) VALUES (?, ?, ?)
     ON CONFLICT(week, user_id) DO UPDATE SET best_score = MAX(best_score, excluded.best_score)`,
  )
    .bind(vietnamWeekId(), user.id, Math.round(score!))
    .run()
  return jsonResponse({ leaderboard: await leaderboard(env.DB, vietnamWeekId()) })
}
