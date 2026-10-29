/**
 * POST /api/economy/earn — NHẬN CHUỐI KHI HỌC
 * Body: { reason }  (VD "lesson", "mini-test-3", "review"...)
 * Số chuối do máy chủ quyết định theo bảng BANANA_REWARDS, có giới hạn số lần / ngày.
 */
import { BANANA_REWARDS, type BananaReason } from '../../../src/game-economy/banana-rewards'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { countRewardsSince, getBananaBalance, grantBananas } from '../../../backend-helpers/banana-ledger'
import { startOfVietnamDaySql } from '../../../backend-helpers/vietnam-time'

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { reason } = (await request.json()) as { reason?: BananaReason }
  const rule = reason ? BANANA_REWARDS[reason] : undefined
  if (!reason || !rule) return errorResponse('Lý do nhận chuối không hợp lệ')

  // quá số lần trong ngày -> không thưởng thêm (không báo lỗi, chỉ trả 0)
  const timesToday = await countRewardsSince(env.DB, user.id, reason, startOfVietnamDaySql())
  if (timesToday >= rule.dailyLimit) {
    return jsonResponse({ granted: 0, balance: await getBananaBalance(env.DB, user.id), limitReached: true })
  }
  const { balance } = await grantBananas(env.DB, user.id, rule.amount, reason)
  return jsonResponse({ granted: rule.amount, balance })
}
