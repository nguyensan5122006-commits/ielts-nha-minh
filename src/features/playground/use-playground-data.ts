/**
 * use-playground-data.ts — TẢI DỮ LIỆU CHO TRANG /play (Thử thách từ + kỷ lục trò chơi chữ)
 * ----------------------------------------------------------------------------
 * Gọi song song các API:
 *   - /api/games/daily-word        : hôm nay mình đã đoán chưa, cả nhà ai đã chơi
 *   - /api/games/records?game=…    : kỷ lục cả nhà của từng trò trong MINI_GAMES
 * Mỗi phần lỗi riêng thì chỉ phần đó hiện "chưa tải được" — trang không vỡ.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { api, type DailyWordState } from '../../services/api-client'
import { MINI_GAMES } from './game-catalog'

/** 'loading' = đang tải · 'error' = lỗi · còn lại là dữ liệu */
export type Loadable<T> = T | 'loading' | 'error'

export interface GameRecord {
  userId: number
  displayName: string
  bestScore: number
}

export interface PlaygroundData {
  dailyWord: Loadable<DailyWordState>
  /** gameId -> kỷ lục cả nhà (đã sắp xếp cao -> thấp) */
  records: Record<string, GameRecord[]>
}

export function isReady<T>(value: Loadable<T>): value is T {
  return value !== 'loading' && value !== 'error'
}

export function usePlaygroundData(): PlaygroundData {
  const [dailyWord, setDailyWord] = useState<Loadable<DailyWordState>>('loading')
  const [records, setRecords] = useState<Record<string, GameRecord[]>>({})

  useEffect(() => {
    let cancelled = false
    // mỗi lời gọi tự lo lỗi của mình (không dùng Promise.all để 1 cái hỏng không kéo cả trang)
    api.getDailyWord().then((data) => !cancelled && setDailyWord(data), () => !cancelled && setDailyWord('error'))
    for (const game of MINI_GAMES) {
      api
        .getGameRecords(game.id)
        .then((data) => !cancelled && setRecords((current) => ({ ...current, [game.id]: data.records })))
        .catch(() => {})
    }
    return () => {
      cancelled = true
    }
  }, [])

  return { dailyWord, records }
}
