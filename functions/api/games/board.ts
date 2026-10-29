/**
 * /api/games/board — BẢNG KỶ LỤC GIA ĐÌNH CỦA 5 TRÒ CHƠI CHỮ (trang /play + cột phải mỗi trò)
 * ----------------------------------------------------------------------------
 * GET (không tham số) trả về:
 *   {
 *     week: "2026-W44",
 *     weeklyAvailable: true,            // false = Cloudflare chưa chạy migration 0004 (phần "tuần này" trống)
 *     games: {
 *       "spelling": {
 *         myBest:     420 | null,       // kỷ lục MỌI LÚC của mình (bảng game_records)
 *         myWeekBest: 300 | null,       // điểm cao nhất TUẦN NÀY của mình
 *         familyBest: { userId, displayName, score } | null,  // kỷ lục mọi lúc của cả nhà
 *         weekly: [{ userId, displayName, score, rounds }]    // tuần này, cao -> thấp
 *       },
 *       ... "word-chain", "picture-word", "missing-letters",
 *       "daily-word": {                 // Thử thách từ mỗi ngày: "điểm" = SỐ NGÀY ĐOÁN RA
 *         myBest: tổng số ngày mình đoán ra (mọi lúc),
 *         myWeekBest: số ngày đoán ra tuần này,
 *         familyBest: người đoán ra nhiều ngày nhất (mọi lúc),
 *         weekly: [{ userId, displayName, score: số ngày đoán ra tuần này, rounds: số ngày đã chơi }]
 *       }
 *     }
 *   }
 * Chỉ đọc, không ghi. Điểm được ghi ở /api/games/records (POST) và /api/games/daily-word (POST).
 * ----------------------------------------------------------------------------
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { vietnamDay, vietnamWeekId } from '../../../backend-helpers/vietnam-time'
import { SCORE_GAMES } from '../../../backend-helpers/word-game-names'

interface BoardRow {
  userId: number
  displayName: string
  score: number
  rounds: number
}

interface GameBoard {
  myBest: number | null
  myWeekBest: number | null
  familyBest: { userId: number; displayName: string; score: number } | null
  weekly: BoardRow[]
}

/** Ngày thứ Hai của tuần hiện tại (giờ VN), dạng "YYYY-MM-DD" — để lọc daily_word_results.day */
function mondayOfThisWeek(): string {
  const today = new Date(`${vietnamDay()}T00:00:00Z`)
  const daysSinceMonday = (today.getUTCDay() + 6) % 7 // thứ Hai = 0 … Chủ nhật = 6
  today.setUTCDate(today.getUTCDate() - daysSinceMonday)
  return today.toISOString().slice(0, 10)
}

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const week = vietnamWeekId()
  const games: Record<string, GameBoard> = {}

  // ---- 1. Kỷ lục mọi lúc (bảng cũ game_records): 1 câu truy vấn cho cả 4 trò ----
  const { results: allTime } = await env.DB.prepare(
    `SELECT r.game AS game, r.user_id AS userId, u.display_name AS displayName, r.best_score AS score
       FROM game_records r JOIN users u ON u.id = r.user_id
      ORDER BY r.best_score DESC`,
  ).all<{ game: string; userId: number; displayName: string; score: number }>()

  for (const game of SCORE_GAMES) {
    const rows = allTime.filter((row) => row.game === game) // đã sắp xếp cao -> thấp
    const top = rows[0]
    games[game] = {
      myBest: rows.find((row) => row.userId === user.id)?.score ?? null,
      myWeekBest: null,
      familyBest: top ? { userId: top.userId, displayName: top.displayName, score: top.score } : null,
      weekly: [],
    }
  }

  // ---- 2. Tuần này (bảng mới game_weekly_best, migration 0004) ----
  let weeklyAvailable = true
  try {
    const { results: weekly } = await env.DB.prepare(
      `SELECT w.game AS game, w.user_id AS userId, u.display_name AS displayName, w.best_score AS score, w.rounds AS rounds
         FROM game_weekly_best w JOIN users u ON u.id = w.user_id
        WHERE w.week = ?
        ORDER BY w.best_score DESC, w.updated_at ASC`,
    )
      .bind(week)
      .all<BoardRow & { game: string }>()
    for (const row of weekly) {
      const board = games[row.game]
      if (!board) continue
      board.weekly.push({ userId: row.userId, displayName: row.displayName, score: row.score, rounds: row.rounds })
      if (row.userId === user.id) board.myWeekBest = row.score
    }
  } catch {
    weeklyAvailable = false // chưa có bảng -> để trống phần "tuần này"
  }

  // ---- 3. Thử thách từ mỗi ngày: đếm số ngày đoán ra (bảng daily_word_results) ----
  const { results: dailyWeek } = await env.DB.prepare(
    `SELECT d.user_id AS userId, u.display_name AS displayName, SUM(d.solved) AS score, COUNT(*) AS rounds
       FROM daily_word_results d JOIN users u ON u.id = d.user_id
      WHERE d.day >= ?
      GROUP BY d.user_id
      ORDER BY score DESC, rounds DESC`,
  )
    .bind(mondayOfThisWeek())
    .all<BoardRow>()
  const { results: dailyAll } = await env.DB.prepare(
    `SELECT d.user_id AS userId, u.display_name AS displayName, SUM(d.solved) AS score
       FROM daily_word_results d JOIN users u ON u.id = d.user_id
      GROUP BY d.user_id
      ORDER BY score DESC`,
  ).all<{ userId: number; displayName: string; score: number }>()
  const dailyTop = dailyAll.find((row) => row.score > 0)
  games['daily-word'] = {
    myBest: dailyAll.find((row) => row.userId === user.id)?.score ?? null,
    myWeekBest: dailyWeek.find((row) => row.userId === user.id)?.score ?? null,
    familyBest: dailyTop ? { userId: dailyTop.userId, displayName: dailyTop.displayName, score: dailyTop.score } : null,
    weekly: dailyWeek,
  }

  return jsonResponse({ week, weeklyAvailable, games })
}
