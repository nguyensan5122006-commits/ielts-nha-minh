/**
 * POST /api/economy/claim — NHẬN THƯỞNG NHIỆM VỤ / HUY HIỆU / LÊN LEVEL
 * Body: { kind: 'daily-quest' | 'weekly-quest' | 'family-quest' | 'achievement' | 'level-up', id }
 * Mỗi phần thưởng có "dedupe key" riêng -> chỉ nhận được 1 lần.
 */
import { ACHIEVEMENTS, FAMILY_WEEKLY_QUEST, WEEKLY_QUESTS, pickDailyQuests } from '../../../src/game-economy/quests-and-achievements'
import { accountLevelFromXp, bananasForLevelUp } from '../../../src/game-economy/account-level'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { grantBananas } from '../../../backend-helpers/banana-ledger'
import { startOfVietnamWeekSql, vietnamDay, vietnamWeekId } from '../../../backend-helpers/vietnam-time'

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { kind, id } = (await request.json()) as { kind?: string; id?: string }
  let amount = 0
  let dedupeKey = ''

  switch (kind) {
    case 'daily-quest': {
      const quest = pickDailyQuests(vietnamDay(), user.id).find((q) => q.id === id)
      if (!quest) return errorResponse('Nhiệm vụ không có trong ngày hôm nay')
      amount = quest.bananas
      dedupeKey = `quest:${vietnamDay()}:${quest.id}:${user.id}`
      break
    }
    case 'weekly-quest': {
      const quest = WEEKLY_QUESTS.find((q) => q.id === id)
      if (!quest) return errorResponse('Nhiệm vụ không tồn tại')
      amount = quest.bananas
      dedupeKey = `quest:${vietnamWeekId()}:${quest.id}:${user.id}`
      break
    }
    case 'family-quest': {
      // máy chủ tự kiểm tra tổng XP cả nhà tuần này
      const row = await env.DB.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM xp_events WHERE created_at >= ?')
        .bind(startOfVietnamWeekSql())
        .first<{ total: number }>()
      if ((row?.total ?? 0) < FAMILY_WEEKLY_QUEST.targetXp) return errorResponse('Cả nhà chưa đủ XP')
      amount = FAMILY_WEEKLY_QUEST.bananas
      dedupeKey = `family:${vietnamWeekId()}:${user.id}`
      break
    }
    case 'achievement': {
      const achievement = ACHIEVEMENTS.find((a) => a.id === id)
      if (!achievement) return errorResponse('Huy hiệu không tồn tại')
      amount = achievement.bananas
      dedupeKey = `achievement:${achievement.id}:${user.id}`
      break
    }
    case 'level-up': {
      const level = Number(id)
      const xp = await env.DB.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM xp_events WHERE user_id = ?').bind(user.id).first<{ total: number }>()
      if (!Number.isInteger(level) || level < 2 || accountLevelFromXp(xp?.total ?? 0).level < level) return errorResponse('Chưa đạt level này')
      amount = bananasForLevelUp(level)
      dedupeKey = `level-up:${level}:${user.id}`
      break
    }
    default:
      return errorResponse('Loại phần thưởng không hợp lệ')
  }

  const { granted, balance } = await grantBananas(env.DB, user.id, amount, `${kind}:${id}`, dedupeKey)
  return jsonResponse({ granted: granted ? amount : 0, alreadyClaimed: !granted, balance })
}
