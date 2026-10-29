/**
 * GoldenTimeCard.tsx — (e) Ô "THỜI ĐIỂM VÀNG" (ôn từ vựng FSRS, ý tưởng Mochi)
 * ----------------------------------------------------------------------------
 *  - 5 cột độ nhớ: Mới gặp → Quen mặt → Nhớ → Thuộc → Khắc sâu (memory-levels.ts).
 *  - "N thẻ đến hạn ôn" (đúng bằng phiên ôn ở /review) hoặc, khi chưa có thẻ nào đến hạn,
 *    đếm ngược "Lượt ôn tiếp theo sau 3 giờ 20 phút".
 *  - Đúng 1 nút "Ôn ngay" -> /review.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../../design-system/components/Button'
import { Card } from '../../../design-system/components/Card'
import { useProgress } from '../../../learning-progress/progress-store'
import { goldenTimeSummary } from '../memory-levels'
import { useRightRailText } from '../right-rail-text'
import { useNow } from '../use-now'

export function GoldenTimeCard() {
  const text = useRightRailText()
  const { progress } = useProgress()
  const now = useNow(30_000)
  const summary = goldenTimeSummary(progress, now)
  const tallest = Math.max(1, ...summary.levels)

  let countdown = ''
  if (summary.nextDueAt) {
    const totalMinutes = Math.max(0, Math.ceil((summary.nextDueAt.getTime() - now.getTime()) / 60_000))
    const days = Math.floor(totalMinutes / 1440)
    const hours = Math.floor((totalMinutes % 1440) / 60)
    const minutes = totalMinutes % 60
    countdown = totalMinutes < 1 ? text.lessThanMinute : days > 0 ? text.daysHours(days, hours) : text.hoursMinutes(hours, minutes)
  }

  return (
    <Card padding="sm" className="rr-card rr-golden" as="section" aria-labelledby="rr-golden-title">
      <div className="rr-card__head">
        <h3 id="rr-golden-title" className="rr-card__title">
          <img src="/word-images/alarm-clock.webp" width={24} height={24} alt="" aria-hidden />
          {text.goldenTitle}
        </h3>
      </div>

      <ol className="rr-golden__bars" aria-label={text.goldenLevelsLabel}>
        {summary.levels.map((count, level) => (
          <li key={level} className={`rr-golden__col level-${level}`}>
            <span className="rr-golden__count ds-num">{count}</span>
            <span className="rr-golden__track" aria-hidden>
              <span className="rr-golden__fill" style={{ height: `${count === 0 ? 0 : Math.max(10, (count / tallest) * 100)}%` }} />
            </span>
            <span className="rr-golden__name">{text.goldenLevels[level]}</span>
          </li>
        ))}
      </ol>

      <div className="rr-golden__status">
        {summary.totalWords === 0 && summary.dueNow === 0 ? (
          <p className="rr-muted">{text.goldenNoCards}</p>
        ) : summary.dueNow > 0 ? (
          <>
            <strong className="rr-golden__due">{text.goldenDue(summary.dueNow)}</strong>
            <span className="rr-muted">{summary.backlogPaused ? text.goldenPaused : text.goldenDueHint}</span>
          </>
        ) : (
          <>
            <strong className="rr-golden__due is-calm">{text.goldenDue(0)}</strong>
            {countdown && <span className="rr-muted">{text.goldenNext(countdown)}</span>}
          </>
        )}
      </div>

      <Button to="/review" variant={summary.dueNow > 0 ? 'primary' : 'secondary'} size="md" fullWidth iconRight="arrow-right">
        {text.goldenReview}
      </Button>
    </Card>
  )
}
