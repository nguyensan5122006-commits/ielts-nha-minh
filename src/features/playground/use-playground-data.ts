/**
 * use-playground-data.ts — TẢI DỮ LIỆU CHO TRANG /play (sự kiện + kỷ lục mini game)
 * ----------------------------------------------------------------------------
 * Gọi song song các API đã có sẵn (không đổi máy chủ):
 *   - /api/games/daily-word        : hôm nay mình đã đoán chưa, cả nhà ai đã chơi
 *   - /api/games/weekly-tournament : chủ đề tuần, bảng điểm tuần
 *   - /api/games/boss              : máu boss, mình còn đánh được bao nhiêu
 *   - /api/games/records?game=…    : kỷ lục cả nhà của 4 mini game
 * Mỗi phần lỗi riêng thì chỉ phần đó hiện "chưa tải được" — trang không vỡ.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { api, type BossState, type DailyWordState, type WeeklyTournamentState } from '../../services/api-client'
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
  tournament: Loadable<WeeklyTournamentState>
  boss: Loadable<BossState>
  /** gameId -> kỷ lục cả nhà (đã sắp xếp cao -> thấp) */
  records: Record<string, GameRecord[]>
}

export function isReady<T>(value: Loadable<T>): value is T {
  return value !== 'loading' && value !== 'error'
}

export function usePlaygroundData(): PlaygroundData {
  const [dailyWord, setDailyWord] = useState<Loadable<DailyWordState>>('loading')
  const [tournament, setTournament] = useState<Loadable<WeeklyTournamentState>>('loading')
  const [boss, setBoss] = useState<Loadable<BossState>>('loading')
  const [records, setRecords] = useState<Record<string, GameRecord[]>>({})

  useEffect(() => {
    let cancelled = false
    // mỗi lời gọi tự lo lỗi của mình (không dùng Promise.all để 1 cái hỏng không kéo cả trang)
    api.getDailyWord().then((data) => !cancelled && setDailyWord(data), () => !cancelled && setDailyWord('error'))
    api.getWeeklyTournament().then((data) => !cancelled && setTournament(data), () => !cancelled && setTournament('error'))
    api.getBoss().then((data) => !cancelled && setBoss(data), () => !cancelled && setBoss('error'))
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

  return { dailyWord, tournament, boss, records }
}

/** Số ngày còn lại tới hết tuần (tuần kết thúc tối Chủ nhật, giờ Việt Nam). 0 = hôm nay là Chủ nhật. */
export function daysLeftInWeek(now = new Date()): number {
  // đổi sang giờ Việt Nam (UTC+7) rồi lấy thứ trong tuần: 0 = CN, 1 = T2 … 6 = T7
  const vietnam = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const weekday = vietnam.getUTCDay()
  return weekday === 0 ? 0 : 7 - weekday
}
