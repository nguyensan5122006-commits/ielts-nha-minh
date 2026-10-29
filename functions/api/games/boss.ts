/**
 * /api/games/boss — BOSS CẢ NHÀ
 *   GET  : boss tuần này, máu, ai đã góp bao nhiêu sát thương, đã hạ chưa, mình nhận thưởng chưa
 *   POST { action: 'attack', hits, damage } : ghi sát thương sau 1 lượt đánh (có giới hạn / ngày)
 *   POST { action: 'claim' } : boss đã bị hạ -> người có góp sức nhận chuối (1 lần / tuần)
 */
import { BOSS_DEFEAT_REWARD } from '../../../src/game-economy/banana-rewards'
import { BOSS_DAILY_DAMAGE_LIMIT, bossMaxHp, bossOfWeek } from '../../../src/game-economy/weekly-events'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { grantBananas } from '../../../backend-helpers/banana-ledger'
import { vietnamDay, vietnamWeekId, weekNumber } from '../../../backend-helpers/vietnam-time'

async function bossState(db: D1Database, userId: number) {
  const week = vietnamWeekId()
  const members = await db.prepare('SELECT COUNT(*) AS n FROM users').first<{ n: number }>()
  const { results: contributors } = await db
    .prepare(
      `SELECT b.user_id AS userId, u.display_name AS displayName, b.damage, b.hits
         FROM boss_damage b JOIN users u ON u.id = b.user_id WHERE b.week = ? ORDER BY b.damage DESC`,
    )
    .bind(week)
    .all<{ userId: number; damage: number }>()
  const totalDamage = contributors.reduce((sum, c) => sum + c.damage, 0)
  const maxHp = bossMaxHp(members?.n ?? 1)
  const claimed = await db.prepare('SELECT 1 AS yes FROM banana_events WHERE dedupe_key = ?').bind(`boss:${week}:${userId}`).first()
  const today = await db.prepare('SELECT damage FROM boss_daily_damage WHERE day = ? AND user_id = ?').bind(vietnamDay(), userId).first<{ damage: number }>()
  return {
    week,
    boss: bossOfWeek(weekNumber(week)),
    maxHp,
    hp: Math.max(0, maxHp - totalDamage),
    defeated: totalDamage >= maxHp,
    contributors,
    claimed: !!claimed,
    myDamageToday: today?.damage ?? 0,
    dailyDamageLimit: BOSS_DAILY_DAMAGE_LIMIT,
  }
}

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  return jsonResponse(await bossState(env.DB, user.id))
}

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as { action?: string; hits?: number; damage?: number }
  const state = await bossState(env.DB, user.id)

  if (body.action === 'claim') {
    if (!state.defeated) return errorResponse('Boss chưa bị hạ')
    if (!state.contributors.some((c) => c.userId === user.id)) return errorResponse('Bạn chưa góp sức đánh boss tuần này')
    const { granted, balance } = await grantBananas(env.DB, user.id, BOSS_DEFEAT_REWARD, 'boss-defeat', `boss:${state.week}:${user.id}`)
    return jsonResponse({ granted: granted ? BOSS_DEFEAT_REWARD : 0, balance })
  }

  // attack: mỗi đòn tối đa 20 sát thương, mỗi lượt gửi tối đa 30 đòn, mỗi ngày tối đa BOSS_DAILY_DAMAGE_LIMIT
  const hits = Math.max(0, Math.min(30, Math.floor(body.hits ?? 0)))
  let damage = Math.max(0, Math.min(hits * 20, Math.floor(body.damage ?? 0)))
  if (state.defeated || damage === 0) return jsonResponse(state)

  damage = Math.min(damage, Math.max(0, BOSS_DAILY_DAMAGE_LIMIT - state.myDamageToday))
  if (damage === 0) return jsonResponse({ ...state, dailyLimitReached: true })

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO boss_damage (week, user_id, damage, hits) VALUES (?, ?, ?, ?)
       ON CONFLICT(week, user_id) DO UPDATE SET damage = damage + excluded.damage, hits = hits + excluded.hits`,
    ).bind(state.week, user.id, damage, hits),
    env.DB.prepare(
      `INSERT INTO boss_daily_damage (day, user_id, damage) VALUES (?, ?, ?)
       ON CONFLICT(day, user_id) DO UPDATE SET damage = damage + excluded.damage`,
    ).bind(vietnamDay(), user.id, damage),
  ])
  return jsonResponse(await bossState(env.DB, user.id))
}
