/**
 * GET /api/users — DANH SÁCH THÀNH VIÊN GIA ĐÌNH
 * Dùng cho chat, bảng xếp hạng, nhiệm vụ cả nhà: tên, avatar, tổng XP, XP tuần, lần cuối online.
 */
import { jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { startOfVietnamWeekSql } from '../../backend-helpers/vietnam-time'

export interface FamilyMember {
  id: number
  displayName: string
  avatar: string
  totalXp: number
  weekXp: number
  lastActiveAt: string | null
}

export const onRequestGet: ApiHandler = async ({ env }) => {
  const { results } = await env.DB.prepare(
    `SELECT u.id, u.display_name AS displayName, u.avatar,
            u.last_active_at AS lastActiveAt,
            COALESCE(SUM(x.amount), 0) AS totalXp,
            COALESCE(SUM(CASE WHEN x.created_at >= ? THEN x.amount END), 0) AS weekXp
       FROM users u LEFT JOIN xp_events x ON x.user_id = u.id
      GROUP BY u.id ORDER BY u.id`,
  )
    .bind(startOfVietnamWeekSql())
    .all<FamilyMember>()
  return jsonResponse({ users: results })
}
