/**
 * ReviewPage.tsx — TRANG /review: "THỜI ĐIỂM VÀNG" + MỞ PHIÊN ÔN THẺ
 * ----------------------------------------------------------------------------
 * Màn tổng quan trước khi ôn (ý tưởng Mochi "Thời điểm vàng", ui-vn-b.md ý 1):
 *   - Thẻ chính: "12 thẻ đang chờ bạn · 12 thẻ ≈ 3 phút" + nút "Ôn ngay" (Enter)
 *     hoặc khi chưa tới giờ: đếm ngược tới lượt ôn tiếp theo + nút "Học bài mới".
 *   - Thông báo giới hạn ngày / nợ ôn (03-DATA-LAYER mục 7): > 150 thẻ quá hạn -> tạm dừng từ mới;
 *     ôn tối đa 100 thẻ/ngày.
 *   - Biểu đồ 5 cấp độ nhớ (bấm cột -> sổ từ lọc theo cấp) + lịch ôn 7 ngày tới.
 *   - Cài đặt nhanh 2 nút / 4 nút (profile.srsButtons).
 * Bấm "Ôn ngay" -> <ReviewSession> phủ toàn màn hình.
 *
 * Mở thẳng phiên ôn: /review?start=1, hoặc navigate('/review', { state: { onlyKeys: ['word:x'] } })
 * (nút "Ôn ngay" trên 1 thẻ ở sổ từ vựng).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Badge } from '../../../design-system/components/Badge'
import { Button } from '../../../design-system/components/Button'
import { Card } from '../../../design-system/components/Card'
import { EmptyState } from '../../../design-system/components/EmptyState'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import { Mascot } from '../../../design-system/components/Mascot'
import { SegmentedControl } from '../../../design-system/components/SegmentedControl'
import { findNextLesson } from '../../../content/path-selectors'
import { MAX_REVIEWS_PER_DAY, srsButtonModeFor, srsQueueInfo } from '../../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { countByMemoryLevel, dueForecast, nextDueAt, type MemoryLevel } from '../memory-levels'
import { buildReviewQueue, estimateSessionMinutes, type ReviewItem } from '../review-session/review-queue'
import { ReviewSession } from '../review-session/ReviewSession'
import { MemoryLevelColumns } from '../shared/MemoryLevelColumns'
import { ReviewSectionNav } from '../shared/ReviewSectionNav'
import { useReviewText } from '../vocabulary-review-text'
import { formatCountdown } from './format-countdown'
import '../shared/review-shared.css'
import './review-page.css'

export function ReviewPage() {
  const text = useReviewText()
  const { language } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { progress, setProfile } = useProgress()
  /** Hàng thẻ của phiên đang mở (null = đang ở màn tổng quan). Chốt lúc bấm "Ôn ngay". */
  const [session, setSession] = useState<ReviewItem[] | null>(null)
  /** đồng hồ để đếm ngược "lượt ôn tiếp theo sau …" (cập nhật mỗi 30 giây) */
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const info = useMemo(() => srsQueueInfo(progress, now), [progress, now])
  const queue = useMemo(() => buildReviewQueue(progress, now), [progress, now])
  const wordCount = Object.keys(progress.srs).filter((key) => key.startsWith('word:')).length
  const totalCards = Object.keys(progress.srs).length
  const counts = useMemo(() => countByMemoryLevel(progress), [progress])
  const forecast = useMemo(() => dueForecast(progress, 7, now), [progress, now])
  const nextDue = useMemo(() => nextDueAt(progress, now), [progress, now])
  const next = findNextLesson(progress)
  const minutes = estimateSessionMinutes(queue)
  const newInQueue = queue.filter((item) => item.isNew).length
  const itemsInQueue = queue.filter((item) => item.kind === 'item' && !item.isNew).length
  const reviewsInQueue = queue.length - newInQueue - itemsInQueue
  const buttonMode = srsButtonModeFor(progress)

  const startSession = useCallback(
    (onlyKeys?: string[]) => {
      const items = buildReviewQueue(progress, new Date(), onlyKeys)
      if (items.length) setSession(items)
    },
    [progress],
  )

  // mở thẳng phiên ôn khi được gọi từ trang khác (?start=1 hoặc state.onlyKeys)
  useEffect(() => {
    const onlyKeys = (location.state as { onlyKeys?: string[] } | null)?.onlyKeys
    if (onlyKeys?.length) {
      startSession(onlyKeys)
      navigate(location.pathname, { replace: true, state: null })
    } else if (searchParams.get('start') === '1') {
      startSession()
      setSearchParams({}, { replace: true })
    }
    // chỉ chạy khi vào trang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Enter = "Ôn ngay" ở màn tổng quan
  useEffect(() => {
    if (session || queue.length === 0) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement || event.target instanceof HTMLInputElement) return
      event.preventDefault()
      startSession()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [session, queue.length, startSession])

  const openLevel = (level: MemoryLevel) => navigate(`/words?level=${level}`)
  const weekdays = text.weekdayShort
  const forecastMax = Math.max(1, ...forecast)
  const peakIndex = forecast.indexOf(Math.max(...forecast))

  return (
    <main className="review-page">
      <header className="review-page__head">
        <div>
          <span className="review-page__eyebrow">{text.reviewEyebrow}</span>
          <h1 className="review-page__title">{text.reviewTitle}</h1>
          <p className="review-page__intro">{text.reviewIntro}</p>
        </div>
        <ReviewSectionNav />
      </header>

      {totalCards === 0 ? (
        <Card className="review-empty">
          <EmptyState
            pose="thumbs-up"
            title={text.noCardsTitle}
            text={text.noCardsText}
            action={
              <Button size="lg" to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
                {text.startFirstLesson}
              </Button>
            }
          />
        </Card>
      ) : (
        <>
          {/* ---------- thẻ chính ---------- */}
          <section className={`golden-hero${queue.length ? ' is-due' : ''}`}>
            <div className="golden-hero__body">
              {queue.length > 0 ? (
                <>
                  <h2 className="golden-hero__title">{text.dueNowTitle(queue.length)}</h2>
                  <p className="golden-hero__size">
                    <Icon name="clock" size={20} /> {text.sessionSize(queue.length, minutes)}
                  </p>
                  <div className="golden-hero__chips">
                    {reviewsInQueue > 0 && <Badge tone="navy">{text.breakdownReviews(reviewsInQueue)}</Badge>}
                    {newInQueue > 0 && <Badge tone="gold">{text.breakdownNew(newInQueue)}</Badge>}
                    {itemsInQueue > 0 && <Badge tone="oops">{text.breakdownItems(itemsInQueue)}</Badge>}
                  </div>
                  <div className="golden-hero__actions">
                    <Button size="lg" onClick={() => startSession()} iconRight={<Kbd onColor>Enter</Kbd>}>
                      {text.startReview}
                    </Button>
                    <Button variant="secondary" size="lg" to="/words">
                      {text.openWords}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="golden-hero__title">{text.nothingDueTitle}</h2>
                  <p className="golden-hero__text">{text.nothingDueText}</p>
                  {nextDue && (
                    <p className="golden-hero__countdown">
                      <span>{text.nextReviewIn}</span>
                      <strong>{formatCountdown(nextDue.getTime() - now.getTime(), language)}</strong>
                    </p>
                  )}
                  <div className="golden-hero__actions">
                    <Button size="lg" to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
                      {text.learnNew}
                    </Button>
                    <Button variant="secondary" size="lg" to="/words">
                      {text.openWords}
                    </Button>
                  </div>
                </>
              )}
            </div>
            <div className="golden-hero__art" aria-hidden>
              <Mascot pose={queue.length ? 'thumbs-up' : 'happy'} size={196} />
            </div>
          </section>

          {/* ---------- thông báo giới hạn ---------- */}
          {info.backlogPaused && (
            <div className="review-notice" role="status">
              <Icon name="hint" size={22} />
              <div>
                <strong>{text.backlogTitle}</strong>
                <p>{text.backlogText(info.dueReviews)}</p>
              </div>
            </div>
          )}
          {info.reviewsLeftToday === 0 && (
            <div className="review-notice" role="status">
              <Icon name="moon" size={22} />
              <div>
                <strong>{text.dailyCapTitle}</strong>
                <p>{text.dailyCapText.replace('100', String(MAX_REVIEWS_PER_DAY))}</p>
              </div>
            </div>
          )}

          {/* ---------- biểu đồ ---------- */}
          <div className="review-grid">
            <Card className="review-card">
              <div className="review-card__head">
                <h2>{text.memoryChartTitle(wordCount)}</h2>
                <span className="review-card__hint">{text.memoryChartHint}</span>
              </div>
              <MemoryLevelColumns counts={counts} onSelect={openLevel} height={128} />
            </Card>

            <Card className="review-card">
              <div className="review-card__head">
                <h2>{text.forecastTitle}</h2>
                <span className="review-card__hint">{text.newLimitNote(info.newOpenedToday, info.newLimitToday)}</span>
              </div>
              <div className="forecast" role="img" aria-label={forecast.map((n, i) => `${i === 0 ? text.forecastToday : weekdays[(now.getDay() + i) % 7]}: ${n}`).join(', ')}>
                {forecast.map((count, dayIndex) => {
                  const label = dayIndex === 0 ? text.forecastToday : weekdays[(now.getDay() + dayIndex) % 7]
                  const showValue = dayIndex === 0 || dayIndex === peakIndex
                  return (
                    <div key={dayIndex} className={`forecast__day${dayIndex === 0 ? ' is-today' : ''}`} title={`${label}: ${text.forecastCards(count)}`}>
                      <span className="forecast__plot">
                        <span className="forecast__value">{showValue ? count : ''}</span>
                        <span className="forecast__bar" style={{ height: count ? Math.max(4, Math.round((count / forecastMax) * 96)) : 0 }} />
                      </span>
                      <span className="forecast__label">{label}</span>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* ---------- cài đặt + giải thích ---------- */}
          <Card variant="soft" className="review-settings">
            <div className="review-settings__control">
              <SegmentedControl
                label={text.buttonsSetting}
                options={[
                  { value: 2, label: text.buttonsTwo },
                  { value: 4, label: text.buttonsFour },
                ]}
                value={buttonMode}
                onChange={(value) => setProfile({ srsButtons: value as 2 | 4 })}
                size="sm"
              />
              <p>
                <strong>{text.buttonsSetting}.</strong> {text.buttonsSettingHint}
              </p>
            </div>
            <div className="review-settings__why">
              <strong>{text.howItWorksTitle}</strong>
              <p>{text.howItWorksText}</p>
            </div>
          </Card>
        </>
      )}

      {session && <ReviewSession items={session} onClose={() => setSession(null)} />}
    </main>
  )
}
