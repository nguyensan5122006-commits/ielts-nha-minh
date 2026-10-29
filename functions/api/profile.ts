/**
 * GET /api/profile?id=<userId> — TRANG CÁ NHÂN CỦA 1 THÀNH VIÊN
 * Gom: thông tin + avatar, tổng XP, thống kê học (đọc từ tiến độ JSON),
 * kỷ lục mini game, huy hiệu đã mở.
 * Tiến độ có thể là bản cũ (version 1: reviewCards, placement.estimatedBand) hoặc bản mới
 * (version 2: srs, placement.bandLow/bandHigh) — đọc được cả 2.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'

interface StoredProgress {
  lessons?: Record<string, unknown>
  miniTests?: Record<string, { stars: number }>
  levelTests?: Record<string, unknown>
  reviewCards?: Record<string, unknown> // v1
  srs?: Record<string, unknown> // v2
  streak?: { current: number; longest: number }
  unlockedAchievements?: string[]
  lifetimeStats?: Record<string, number>
  placement?: { estimatedBand?: string; bandLow?: number; bandHigh?: number } | null
}

export const onRequestGet: ApiHandler = async ({ request, env }) => {
  const id = Number(new URL(request.url).searchParams.get('id'))
  const user = await env.DB.prepare(
    'SELECT id, display_name AS displayName, avatar, created_at AS createdAt, last_active_at AS lastActiveAt FROM users WHERE id = ?',
  )
    .bind(id)
    .first()
  if (!user) return errorResponse('Không tìm thấy thành viên', 404)

  const [xp, progressRow, records] = await Promise.all([
    env.DB.prepare('SELECT COALESCE(SUM(amount), 0) AS total FROM xp_events WHERE user_id = ?').bind(id).first<{ total: number }>(),
    env.DB.prepare('SELECT data_json FROM learning_progress WHERE user_id = ?').bind(id).first<{ data_json: string }>(),
    env.DB.prepare('SELECT game, best_score AS bestScore FROM game_records WHERE user_id = ?').bind(id).all(),
  ])

  const progress: StoredProgress = progressRow ? JSON.parse(progressRow.data_json) : {}
  const cards = progress.srs ?? progress.reviewCards ?? {}
  const placement = progress.placement
  const placementBand =
    placement?.estimatedBand ??
    (typeof placement?.bandLow === 'number' && typeof placement?.bandHigh === 'number' ? `${placement.bandLow.toFixed(1)} – ${placement.bandHigh.toFixed(1)}` : null)
  return jsonResponse({
    user,
    totalXp: xp?.total ?? 0,
    stats: {
      lessons: Object.keys(progress.lessons ?? {}).length,
      miniTests: Object.keys(progress.miniTests ?? {}).length,
      perfectMiniTests: Object.values(progress.miniTests ?? {}).filter((m) => m.stars === 3).length,
      levelTests: Object.keys(progress.levelTests ?? {}).length,
      wordsLearned: Object.keys(cards).filter((key) => key.startsWith('word:')).length,
      currentStreak: progress.streak?.current ?? 0,
      longestStreak: progress.streak?.longest ?? 0,
      placementBand,
      ...(progress.lifetimeStats ?? {}),
    },
    records: records.results,
    achievements: progress.unlockedAchievements ?? [],
  })
}
