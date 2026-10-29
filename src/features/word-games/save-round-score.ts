/**
 * save-round-score.ts — GỬI ĐIỂM 1 VÁN LÊN MÁY CHỦ + TÍNH "KỶ LỤC MỚI / ĐIỂM CAO NHẤT TUẦN"
 * ----------------------------------------------------------------------------
 *   const saved = await saveRoundScore('picture-word', 820)   // SavedScore hoặc null (mất mạng)
 *
 * Máy chủ (functions/api/games/records.ts) trả về kỷ lục cũ (mọi lúc + tuần). Từ đó:
 *   - isNewRecord : điểm > kỷ lục mọi lúc cũ (0 điểm không tính — tránh pháo giấy khi sai hết)
 *   - isWeekBest  : điểm > điểm cao nhất tuần cũ
 *   - myBest      : kỷ lục mọi lúc SAU ván này
 * ----------------------------------------------------------------------------
 */
import { callApi } from '../../services/api-client'
import type { MiniGameId } from '../playground/game-catalog'
import type { SavedScore } from './components/RoundResult'

interface RecordsResponse {
  isNewRecord: boolean
  previousBest: number | null
  /** chỉ có khi máy chủ đã chạy migration 0004 */
  previousWeekBest?: number | null
}

export async function saveRoundScore(game: MiniGameId, score: number): Promise<SavedScore | null> {
  try {
    const response = await callApi<RecordsResponse>('/api/games/records', { method: 'POST', body: { game, score } })
    const previousBest = response.previousBest
    return {
      isNewRecord: response.isNewRecord && score > 0,
      isWeekBest: score > 0 && score > (response.previousWeekBest ?? 0),
      myBest: Math.max(previousBest ?? 0, score) || (previousBest ?? score),
    }
  } catch {
    return null
  }
}
