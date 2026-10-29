/**
 * DailyWordCard.tsx — THẺ "THỬ THÁCH TỪ HÔM NAY" TRÊN TRANG /play
 * ----------------------------------------------------------------------------
 * Mình đã đoán chưa (ô màu kiểu Wordle + số lượt), cả nhà ai đã chơi.
 * Có đúng 1 nút hành động ở đáy (bước tiếp theo rõ ràng).
 * Đang tải -> khung xương; lỗi mạng -> 1 dòng nhắc + nút vẫn bấm được (trang con tự tải lại).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { vietnamDay } from '../../../../backend-helpers/vietnam-time'
import { Button, Skeleton } from '../../../design-system'
import { useAuth } from '../../../services/auth-context'
import type { DailyWordState } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { GameArt, type ArtPlate } from '../components/GameArt'
import { PLAY_ART } from '../game-catalog'
import { usePlayText } from '../playground-text'
import { isReady, type Loadable } from '../use-playground-data'

/** Khung chung của 1 thẻ sự kiện: ảnh 3D + nhãn nhỏ + tiêu đề + nội dung + nút ở đáy */
function EventShell({ art, plate, eyebrow, title, tone, children, action }: { art: string; plate: ArtPlate; eyebrow: ReactNode; title: ReactNode; tone: string; children: ReactNode; action: ReactNode }) {
  return (
    <article className={`pg-event pg-event--${tone}`}>
      <div className="pg-event__top">
        <GameArt slug={art} size={56} plate={plate} tilt={-6} />
        <div className="pg-event__heading">
          <span className="pg-event__eyebrow">{eyebrow}</span>
          <h3 className="pg-event__title">{title}</h3>
        </div>
      </div>
      <div className="pg-event__body">{children}</div>
      <div className="pg-event__action">{action}</div>
    </article>
  )
}

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
function PatternMini({ pattern }: { pattern: string }) {
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

export function DailyWordCard({ data }: { data: Loadable<DailyWordState> }) {
  const playText = usePlayText()
  const { t } = useLanguage()
  const { user } = useAuth()
  const ready = isReady(data)
  const mine = ready ? data.mine : null
  const othersPlayed = ready ? data.results.filter((result) => result.userId !== user?.id).length : 0
  const inProgress = !mine ? localGuessCount() : 0

  let status: ReactNode
  if (data === 'loading') status = <Skeleton lines={2} />
  else if (mine) {
    status = (
      <div className="pg-event__split">
        <PatternMini pattern={mine.pattern} />
        <p className="pg-event__status">{mine.solved ? playText('dailySolved', { n: mine.guesses }) : playText('dailyFailed')}</p>
      </div>
    )
  } else
    status = (
      <p className="pg-event__status">
        {inProgress > 0 ? `${playText('dailyNotPlayed')} · ${inProgress}/6` : playText('dailyNotPlayed')}
      </p>
    )

  return (
    <EventShell
      art={PLAY_ART.dailyWord}
      plate="gold"
      tone="gold"
      eyebrow={playText('eventToday')}
      title={t('dailyWordTitle')}
      action={
        mine ? (
          <Button to="/daily-word" variant="secondary" fullWidth>
            {playText('dailySeeFamily')}
          </Button>
        ) : (
          <Button to="/daily-word" fullWidth iconRight="arrow-right">
            {playText('dailyPlay')}
          </Button>
        )
      }
    >
      {status}
      {ready && <p className="pg-event__meta">{othersPlayed > 0 ? playText('dailyFamily', { n: othersPlayed }) : playText('dailyNobody')}</p>}
      {data === 'error' && <p className="pg-event__meta">{playText('couldNotLoad')}</p>}
    </EventShell>
  )
}
