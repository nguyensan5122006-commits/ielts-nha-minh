/**
 * GET /api/users — DANH SÁCH THÀNH VIÊN GIA ĐÌNH
 * Dùng cho chat, bảng xếp hạng, mời thi đấu: tên, avatar, khung, màu tên,
 * danh hiệu, tổng XP, XP tuần, lần cuối online.
 */
import { jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { startOfVietnamWeekSql } from '../../backend-helpers/vietnam-time'

export interface FamilyMember {
  id: number
  displayName: string
  avatar: string
  frame: string | null
  nameColor: string | null
  title: string | null
  totalXp: number
  weekXp: number
  lastActiveAt: string | null
}

export const onRequestGet: ApiHandler = async ({ env }) => {
  const { results } = await env.DB.prepare(
    `SELECT u.id, u.display_name AS displayName, u.avatar, u.frame, u.name_color AS nameColor, u.title,
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
