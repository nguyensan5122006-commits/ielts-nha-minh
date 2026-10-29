/**
 * use-game-board.ts — TẢI BẢNG KỶ LỤC GIA ĐÌNH CỦA 5 TRÒ CHƠI CHỮ (/api/games/board)
 * ----------------------------------------------------------------------------
 *   const board = useGameBoard()           // 'loading' | 'error' | GameBoardData
 *   const board = useGameBoard(refreshKey) // đổi refreshKey (VD sau khi chơi xong 1 ván) -> tải lại
 *
 * Máy chủ trả kỷ lục mọi lúc + điểm cao nhất tuần này của từng người cho cả 5 trò
 * (xem đầu file functions/api/games/board.ts). Trò "daily-word" tính bằng số ngày đoán ra.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { callApi } from '../../services/api-client'
import type { WordGameId } from '../playground/game-catalog'

export interface BoardRow {
  userId: number
  displayName: string
  score: number
  /** số ván (trò tính điểm) / số ngày đã chơi (đoán từ hôm nay) trong tuần */
  rounds: number
}

export interface GameBoard {
  myBest: number | null
  myWeekBest: number | null
  familyBest: { userId: number; displayName: string; score: number } | null
  /** tuần này, đã sắp xếp cao -> thấp */
  weekly: BoardRow[]
}

export interface GameBoardData {
  week: string
  /** false = máy chủ chưa chạy migration 0004 -> phần "tuần này" trống */
  weeklyAvailable: boolean
  games: Partial<Record<WordGameId, GameBoard>>
}

export type BoardState = GameBoardData | 'loading' | 'error'

/** Tải bảng; trả về sai dạng (VD máy chủ cũ chưa có API này -> trả trang HTML) thì coi như lỗi. */
export async function fetchGameBoard(): Promise<GameBoardData> {
  const data = await callApi<GameBoardData>('/api/games/board')
  if (!data || typeof data.games !== 'object' || data.games === null) throw new Error('board: unexpected response')
  return data
}

export function useGameBoard(refreshKey: unknown = 0): BoardState {
  const [board, setBoard] = useState<BoardState>('loading')
  useEffect(() => {
    let cancelled = false
    fetchGameBoard().then(
      (data) => !cancelled && setBoard(data),
      () => !cancelled && setBoard((current) => (current === 'loading' ? 'error' : current)), // lỗi khi tải lại: giữ dữ liệu cũ
    )
    return () => {
      cancelled = true
    }
  }, [refreshKey])
  return board
}

/** Lấy bảng của 1 trò (an toàn khi đang tải / lỗi). */
export function boardFor(board: BoardState, game: WordGameId): GameBoard | null {
  return typeof board === 'object' ? (board.games[game] ?? null) : null
}
