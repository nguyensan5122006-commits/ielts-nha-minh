/**
 * DailyWordCard.tsx — THẺ LỚN "THỬ THÁCH TỪ HÔM NAY" TRÊN TRANG /play (thẻ nổi bật nhất)
 * ----------------------------------------------------------------------------
 * Cho biết: hôm nay mình đã đoán chưa (ô màu kiểu Wordle + số lượt, hoặc "đang chờ bạn" kèm
 * số lượt đang đoán dở), cả nhà mấy người đã chơi, tuần này mình đoán ra mấy ngày.
 * Có đúng 1 nút hành động ở đáy (bước tiếp theo rõ ràng).
 * Đang tải -> khung xương; lỗi mạng -> 1 dòng nhắc + nút vẫn bấm được (trang con tự tải lại).
 * ----------------------------------------------------------------------------
 */
import { vietnamDay } from '../../../../backend-helpers/vietnam-time'
import { Button, Skeleton } from '../../../design-system'
import { useAuth } from '../../../services/auth-context'
import type { DailyWordState } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { useWordGamesText } from '../../word-games/word-games-text'
import { GameArt } from '../components/GameArt'
import { wordGameInfo } from '../game-catalog'
import { usePlayText } from '../playground-text'
import { isReady, type Loadable } from '../use-playground-data'

/** Đọc số lượt đang đoán dở hôm nay (trang Thử thách từ lưu trong máy) */
function localGuessCount(): number {
  try {
    const guesses = JSON.parse(localStorage.getItem(`ielts-daily-word-${vietnamDay()}`) ?? '[]') as unknown
    return Array.isArray(guesses) ? guesses.length : 0
  } catch {
    return 0
  }
}

/** Ô màu nhỏ của 1 kết quả Wordle ("🟩🟨⬜…" mỗi dòng 1 lượt) */
export function PatternMini({ pattern }: { pattern: string }) {
  const rows = pattern.split('\n').filter(Boolean)
  return (
    <span className="pg-wordle-mini" aria-hidden>
      {rows.map((row, rowIndex) => (
        <span key={rowIndex} className="pg-wordle-mini__row">
          {[...row].map((cell, cellIndex) => (
            <i key={cellIndex} className={cell === '🟩' ? 'is-correct' : cell === '🟨' ? 'is-present' : 'is-absent'} />
          ))}
        </span>
      ))}
    </span>
  )
}

/** Bảng 6 lượt × 5 ô còn trống (chưa chơi xong) — hàng đã đoán dở tô nhạt */
function BlankBoard({ guessed }: { guessed: number }) {
  return (
    <span className="wgh-daily__blank" aria-hidden>
      {Array.from({ length: 6 }, (_, row) => (
        <span key={row} className={row < guessed ? 'is-used' : row === guessed ? 'is-current' : undefined}>
          {Array.from({ length: 5 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
      ))}
    </span>
  )
}

export function DailyWordCard({ data, weekSolved }: { data: Loadable<DailyWordState>; /** số ngày mình đoán ra tuần này */ weekSolved?: number | null }) {
  const playText = usePlayText()
  const text = useWordGamesText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const info = wordGameInfo('daily-word')!
  const ready = isReady(data)
  const mine = ready ? data.mine : null
  const othersPlayed = ready ? data.results.filter((result) => result.userId !== user?.id).length : 0
  const inProgress = !mine ? localGuessCount() : 0

  return (
    <article className={`wgh-daily ${mine ? 'is-done' : ''}`}>
      <div className="wgh-daily__top">
        <GameArt slug={info.art} size={64} plate="gold" tilt={-6} />
        <div className="wgh-daily__heading">
          <span className={`wgh-daily__state ${mine ? 'is-done' : ''}`}>{mine ? text('dailyDone') : text('dailyWaiting')}</span>
          <h3 className="wgh-daily__title">{pick(info.title)}</h3>
        </div>
      </div>
      <p className="wgh-daily__desc">{pick(info.description)}</p>

      <div className="wgh-daily__status">
        {data === 'loading' ? (
          <Skeleton lines={2} />
        ) : mine ? (
          <>
            <PatternMini pattern={mine.pattern} />
            <p className="wgh-daily__line">{mine.solved ? playText('dailySolved', { n: mine.guesses }) : playText('dailyFailed')}</p>
          </>
        ) : (
          <>
            <BlankBoard guessed={inProgress} />
            <p className="wgh-daily__line">{inProgress > 0 ? `${playText('dailyNotPlayed')} · ${inProgress}/6` : playText('dailyNotPlayed')}</p>
          </>
        )}
      </div>

      <ul className="wgh-daily__facts">
        {ready && <li>{othersPlayed > 0 ? playText('dailyFamily', { n: othersPlayed }) : playText('dailyNobody')}</li>}
        {weekSolved != null && weekSolved > 0 && <li>{text('dailyWeekSolved', { n: weekSolved })}</li>}
        {data === 'error' && <li>{playText('couldNotLoad')}</li>}
      </ul>

      <div className="wgh-daily__action">
        {mine ? (
          <Button to="/daily-word" variant="secondary" fullWidth>
            {playText('dailySeeFamily')}
          </Button>
        ) : (
          <Button to="/daily-word" size="lg" fullWidth iconRight="arrow-right">
            {playText('dailyPlay')}
          </Button>
        )}
      </div>
    </article>
  )
}
