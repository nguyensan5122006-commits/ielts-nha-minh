/**
 * /api/games/records — KỶ LỤC MINI GAME CHƠI 1 MÌNH
 *   GET  ?game=spelling : bảng kỷ lục cả nhà của game đó
 *   POST { game, score } : gửi điểm vừa chơi; cao hơn kỷ lục cũ thì lưu, thưởng chuối
 */
import { BANANA_REWARDS } from '../../../src/game-economy/banana-rewards'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { countRewardsSince, grantBananas } from '../../../backend-helpers/banana-ledger'
import { startOfVietnamDaySql } from '../../../backend-helpers/vietnam-time'

const GAMES = ['spelling', 'word-chain', 'sentence', 'quiz']
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
  if (!game || !GAMES.includes(game) || !Number.isFinite(score) || score! < 0 || score! > MAX_SCORE) return errorResponse('Dữ liệu không hợp lệ')

  const previous = await env.DB.prepare('SELECT best_score FROM game_records WHERE user_id = ? AND game = ?').bind(user.id, game).first<{ best_score: number }>()
  const isNewRecord = !previous || score! > previous.best_score
  if (isNewRecord) {
    await env.DB.prepare(
      `INSERT INTO game_records (user_id, game, best_score, updated_at) VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(user_id, game) DO UPDATE SET best_score = excluded.best_score, updated_at = excluded.updated_at`,
    )
      .bind(user.id, game, Math.round(score!))
      .run()
  }

  // thưởng: chơi xong +2, phá kỷ lục (từ lần thứ 2 trở đi, và điểm > 0) +10 — có giới hạn / ngày
  let bananas = 0
  const since = startOfVietnamDaySql()
  if ((await countRewardsSince(env.DB, user.id, 'game-played', since)) < BANANA_REWARDS['game-played'].dailyLimit) {
    await grantBananas(env.DB, user.id, BANANA_REWARDS['game-played'].amount, 'game-played')
    bananas += BANANA_REWARDS['game-played'].amount
  }
  if (isNewRecord && previous && score! > 0 && (await countRewardsSince(env.DB, user.id, 'game-record', since)) < BANANA_REWARDS['game-record'].dailyLimit) {
    await grantBananas(env.DB, user.id, BANANA_REWARDS['game-record'].amount, 'game-record')
    bananas += BANANA_REWARDS['game-record'].amount
  }
  return jsonResponse({ isNewRecord, previousBest: previous?.best_score ?? null, bananas })
}
