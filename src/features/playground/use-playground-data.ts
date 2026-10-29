/**
 * use-playground-data.ts — TẢI DỮ LIỆU CHO TRANG /play "TRÒ CHƠI CHỮ"
 * ----------------------------------------------------------------------------
 * Gọi song song 2 API:
 *   - /api/games/daily-word : hôm nay mình đã đoán chưa, cả nhà ai đã chơi
 *   - /api/games/board      : kỷ lục mọi lúc + điểm cao nhất tuần này của cả nhà, cho cả 5 trò
 *                             (xem src/features/word-games/use-game-board.ts)
 * Mỗi phần lỗi riêng thì chỉ phần đó hiện "chưa tải được" — trang không vỡ.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { api, type DailyWordState } from '../../services/api-client'
import { useGameBoard, type BoardState } from '../word-games/use-game-board'

/** 'loading' = đang tải · 'error' = lỗi · còn lại là dữ liệu */
export type Loadable<T> = T | 'loading' | 'error'

export interface PlaygroundData {
  dailyWord: Loadable<DailyWordState>
  board: BoardState
}

export function isReady<T>(value: Loadable<T>): value is T {
  return value !== 'loading' && value !== 'error'
}

export function usePlaygroundData(): PlaygroundData {
  const [dailyWord, setDailyWord] = useState<Loadable<DailyWordState>>('loading')
  const board = useGameBoard()

  useEffect(() => {
    let cancelled = false
    api.getDailyWord().then((data) => !cancelled && setDailyWord(data), () => !cancelled && setDailyWord('error'))
    return () => {
      cancelled = true
    }
  }, [])

  return { dailyWord, board }
}
