/**
 * POST /api/economy/daily-login — QUÀ ĐĂNG NHẬP HẰNG NGÀY
 * Gọi mỗi khi mở web. Hôm nay chưa nhận -> tính chuỗi ngày đăng nhập và tặng chuối.
 * Trả về: { reward (0 nếu đã nhận), loginStreak, balance, isFirstLogin }
 */
import { dailyLoginReward } from '../../../src/game-economy/banana-rewards'
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { getBananaBalance, grantBananas } from '../../../backend-helpers/banana-ledger'
import { vietnamDay, vietnamYesterday } from '../../../backend-helpers/vietnam-time'

export const onRequestPost: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const today = vietnamDay()
  const row = await env.DB.prepare('SELECT login_streak, last_login_day FROM users WHERE id = ?')
    .bind(user.id)
    .first<{ login_streak: number; last_login_day: string | null }>()

  await env.DB.prepare("UPDATE users SET last_active_at = datetime('now') WHERE id = ?").bind(user.id).run()

  if (row?.last_login_day === today) {
    return jsonResponse({ reward: 0, loginStreak: row.login_streak, balance: await getBananaBalance(env.DB, user.id), isFirstLogin: false })
  }

  const loginStreak = row?.last_login_day === vietnamYesterday() ? row.login_streak + 1 : 1
  const reward = dailyLoginReward(loginStreak)
  await env.DB.prepare('UPDATE users SET login_streak = ?, last_login_day = ? WHERE id = ?').bind(loginStreak, today, user.id).run()
  const { granted, balance } = await grantBananas(env.DB, user.id, reward, 'daily-login', `login:${today}:${user.id}`)

  return jsonResponse({ reward: granted ? reward : 0, loginStreak, balance, isFirstLogin: !row?.last_login_day })
}
