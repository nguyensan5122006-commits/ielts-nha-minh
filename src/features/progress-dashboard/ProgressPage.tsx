/**
 * ProgressPage.tsx — TRANG /progress: BẢNG TIẾN ĐỘ "SO VỚI CHÍNH MÌNH"
 * ----------------------------------------------------------------------------
 * Bố cục (desktop 1440, cột nội dung ~1100px):
 *   1. Đầu trang + 2 nút: "Học tiếp" (chính) · "Ôn thẻ" (phụ)
 *   2. 4 ô số: chuỗi ngày (+ Tuần này x/7, Tổng ngày học, bảo vệ chuỗi) · từ nhớ chắc (độ bền ≥ 21 ngày)
 *      · lỗi đã sửa · phút học trung bình/ngày
 *   3. Band theo kỹ năng dạng KHOẢNG quanh vạch mục tiêu (IELTS) / câu "bạn có thể…" theo CEFR (tổng quát)
 *      + thẻ "Mốc tiếp theo" (kỳ vọng trung thực theo nhịp học thật)
 *   4. 5 thẻ kỹ năng: % đúng gần đây + đường xu hướng + số câu + band/CEFR
 *   5. Lịch học 18 tuần (có ngày bảo vệ chuỗi) · phút học 14 ngày (vạch mục tiêu)
 *   6. Độ nhớ từ vựng (5 cấp) · bài viết: tự chấm vs AI
 * Màu: chỉ màu kỹ năng (nhận diện) + 2 thang tuần tự (độ nhớ: chàm; lịch học: cam). Chữ luôn màu chữ.
 * Trống (chưa học gì): mascot + 1 câu + 1 nút.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SkillName } from '../../content/content-types'
import { findNextLesson } from '../../content/path-selectors'
import { SKILL_ORDER } from '../../content/skill-meta'
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { Card } from '../../design-system/components/Card'
import { EmptyState } from '../../design-system/components/EmptyState'
import { Icon } from '../../design-system/components/Icon'
import { ProgressBar } from '../../design-system/components/ProgressBar'
import { StreakFlame } from '../../design-system/components/StreakFlame'
import { countCardsByLabel, srsQueueInfo } from '../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../learning-progress/progress-store'
import { countByMemoryLevel } from '../vocabulary-review/memory-levels'
import { MemoryLevelColumns } from '../vocabulary-review/shared/MemoryLevelColumns'
import { BandRangeChart } from './charts/BandRangeChart'
import { MinutesChart } from './charts/MinutesChart'
import { StudyHeatmap } from './charts/StudyHeatmap'
import { WritingGapChart } from './charts/WritingGapChart'
import {
  averageMinutesPerDay,
  CEFR_ORDER,
  cefrForBand,
  cefrForProgress,
  minutesSeries,
  projectNextMilestone,
  selfScoreGap,
  skillBand,
  targetBandOf,
  writingPoints,
} from './dashboard-stats'
import { useDashboardText } from './progress-dashboard-text'
import { SkillProgressCard } from './SkillProgressCard'
import '../vocabulary-review/shared/review-shared.css'
import './progress-dashboard.css'

const IELTS_SKILLS: SkillName[] = ['listening', 'reading', 'writing', 'speaking']

export function ProgressPage() {
  const text = useDashboardText()
  const navigate = useNavigate()
  const { progress, streak } = useProgress()
  const isIelts = progress.profile.track === 'ielts'
  const goalMinutes = progress.profile.dailyGoalMinutes
  const target = targetBandOf(progress)

  const bands = useMemo(() => Object.fromEntries(SKILL_ORDER.map((skill) => [skill, skillBand(progress, skill)])) as Record<SkillName, ReturnType<typeof skillBand>>, [progress])
  const projection = useMemo(() => projectNextMilestone(progress), [progress])
  const series = useMemo(() => minutesSeries(progress, 14), [progress])
  const averageMinutes = useMemo(() => averageMinutesPerDay(progress, 14), [progress])
  const memoryCounts = useMemo(() => countByMemoryLevel(progress), [progress])
  const points = useMemo(() => writingPoints(progress), [progress])
  const gap = selfScoreGap(points)
  const wordLabels = countCardsByLabel(progress, 'word:')
  const totalWords = wordLabels.new + wordLabels.learning + wordLabels.reviewing + wordLabels.known
  const fixed = progress.mistakes.filter((mistake) => mistake.resolved).length
  const openMistakes = progress.mistakes.length - fixed
  const dueCards = srsQueueInfo(progress).sessionSize
  const next = findNextLesson(progress)
  const overallCefr = cefrForProgress(progress)
  const hasAnyData = progress.studyDates.length > 0 || Object.keys(progress.lessons).length > 0

  const header = (
    <header className="review-page__head">
      <div>
        <span className="review-page__eyebrow">{text.eyebrow}</span>
        <h1 className="review-page__title">{text.title}</h1>
        <p className="review-page__intro">{text.intro}</p>
      </div>
      {hasAnyData && (
        <div className="dash-head-actions">
          <Button variant="secondary" to="/review" iconLeft="review">
            {text.openReview}
            {dueCards > 0 && ` (${dueCards})`}
          </Button>
          <Button to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
            {text.continueLearning}
          </Button>
        </div>
      )}
    </header>
  )

  if (!hasAnyData) {
    return (
      <main className="review-page dash">
        {header}
        <Card className="dash-empty">
          <EmptyState
            pose="thumbs-up"
            title={text.emptyTitle}
            text={text.emptyText}
            action={
              <Button size="lg" to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
                {text.emptyAction}
              </Button>
            }
          />
        </Card>
      </main>
    )
  }

  return (
    <main className="review-page dash">
      {header}

      {/* ---------- 1. 4 ô số ---------- */}
      <section className="dash-tiles" aria-label={text.title}>
        <Card className="dash-tile dash-tile--streak">
          <span className="dash-tile__label">{text.streakTile}</span>
          <div className="dash-tile__row">
            <StreakFlame count={streak.current} active={streak.studiedToday} size="lg" showLabel />
          </div>
          <div className="dash-tile__chips">
            <Badge tone={streak.studiedToday ? 'success' : 'neutral'} size="sm" icon={streak.studiedToday ? 'check' : undefined}>
              {streak.studiedToday ? text.studiedToday : text.notYetToday}
            </Badge>
            <Badge tone="primary" size="sm">
              {text.thisWeek(streak.thisWeekDays)}
            </Badge>
            <Badge tone="neutral" size="sm">
              {text.totalDays(streak.totalStudyDays)}
            </Badge>
            {streak.freezes > 0 && (
              <Badge tone="navy" size="sm">
                {text.freezesLeft(streak.freezes)}
              </Badge>
            )}
          </div>
        </Card>
        <Card className="dash-tile" to="/words?level=5">
          <span className="dash-tile__label">{text.wordsTile}</span>
          <span className="dash-tile__value">{wordLabels.known}</span>
          <span className="dash-tile__hint">
            {text.wordsOf(totalWords)} · {text.wordsTileHint}
          </span>
        </Card>
        <Card className="dash-tile" to="/mistakes">
          <span className="dash-tile__label">{text.fixedTile}</span>
          <span className="dash-tile__value">{fixed}</span>
          <span className="dash-tile__hint">{text.fixedTileHint(openMistakes)}</span>
        </Card>
        <Card className="dash-tile">
          <span className="dash-tile__label">{text.minutesTile}</span>
          <span className="dash-tile__value">{text.minutesValue(averageMinutes)}</span>
          <span className="dash-tile__hint">{text.minutesTileHint(goalMinutes)}</span>
        </Card>
      </section>

      {/* ---------- 2. band / CEFR + mốc tiếp theo ---------- */}
      <section className="dash-grid dash-grid--wide">
        {isIelts ? (
          <Card className="dash-card">
            <div className="dash-card__head">
              <h2>{text.bandTitle}</h2>
              <p>{text.bandSubtitle(target)}</p>
            </div>
            <BandRangeChart rows={IELTS_SKILLS.map((skill) => ({ skill, band: bands[skill] }))} target={target} />
            <p className="dash-card__note">
              <Icon name="hint" size={16} /> {text.bandNoteHonest}
            </p>
          </Card>
        ) : (
          <Card className="dash-card">
            <div className="dash-card__head">
              <h2>{text.cefrTitle}</h2>
              <p>{text.cefrSubtitle}</p>
            </div>
            <ol className="cefr-ladder" aria-label="CEFR">
              {CEFR_ORDER.map((level) => (
                <li key={level} className={`cefr-ladder__step${level === overallCefr ? ' is-here' : ''}${CEFR_ORDER.indexOf(level) < CEFR_ORDER.indexOf(overallCefr) ? ' is-done' : ''}`}>
                  <span className="cefr-ladder__name">{level}</span>
                  {level === overallCefr && <span className="cefr-ladder__here">{text.cefrYouAreHere}</span>}
                </li>
              ))}
            </ol>
            <ul className="cefr-cando">
              {SKILL_ORDER.map((skill) => {
                const band = bands[skill]
                const level = band.kind === 'range' ? cefrForBand((band.low + band.high) / 2) : overallCefr
                return (
                  <li key={skill} className={band.kind === 'range' ? '' : 'is-tentative'}>
                    <span className="cefr-cando__skill">
                      {text.skillName[skill]} <Badge size="sm" tone="navy">{level}</Badge>
                    </span>
                    <span>{text.canDo[skill][level]}</span>
                    {band.kind !== 'range' && <span className="cefr-cando__note">{text.cefrNotEnough}</span>}
                  </li>
                )
              })}
            </ul>
          </Card>
        )}

        <Card className="dash-card dash-projection">
          <div className="dash-card__head">
            <h2>{text.projectionTitle}</h2>
          </div>
          {projection.done ? (
            <p className="dash-projection__line">{text.projectionDone}</p>
          ) : (
            <>
              <p className="dash-projection__milestone">{text.projectionNext(projection.milestone.cefr, projection.milestone.band)}</p>
              <ProgressBar value={projection.levelPercent} max={100} size="sm" label={text.levelProgress(projection.levelPercent)} color="var(--c-navy)" />
              <p className="dash-projection__percent">{text.levelProgress(projection.levelPercent)}</p>
              <dl className="dash-projection__facts">
                <div>
                  <dt>{text.hoursLeftLabel}</dt>
                  <dd>{text.hoursLeft(projection.remainingHours)}</dd>
                </div>
                <div>
                  <dt>{text.lessonsLeftLabel}</dt>
                  <dd>{text.lessonsLeft(projection.lessonsLeft)}</dd>
                </div>
              </dl>
              {projection.months ? (
                <>
                  <p className="dash-projection__line">
                    {text.projectionLine(projection.minutesPerDay, projection.months[1] < 1 ? text.underAMonth : text.monthsRange(...projection.months))}
                  </p>
                  {projection.faster && (
                    <p className="dash-projection__faster">
                      <Icon name="sparkle" size={16} />
                      {text.projectionFaster(projection.faster.minutesPerDay, projection.faster.months[1] < 1 ? text.underAMonth : text.monthsRange(...projection.faster.months))}
                    </p>
                  )}
                </>
              ) : (
                <p className="dash-projection__line">{text.projectionNoPace}</p>
              )}
            </>
          )}
          <p className="dash-card__note">{text.projectionBasis}</p>
        </Card>
      </section>

      {/* ---------- 3. 5 kỹ năng ---------- */}
      <section aria-label={text.skillsTitle}>
        <h2 className="dash-section-title">{text.skillsTitle}</h2>
        <div className="dash-skills">
          {SKILL_ORDER.map((skill) => (
            <SkillProgressCard key={skill} skill={skill} stat={progress.skillStats[skill]} band={bands[skill]} scale={isIelts ? 'band' : 'cefr'} />
          ))}
        </div>
      </section>

      {/* ---------- 4. lịch học + phút ---------- */}
      <section className="dash-grid dash-grid--calendar">
        <Card className="dash-card">
          <div className="dash-card__head">
            <h2>{text.calendarTitle}</h2>
            <p>{text.calendarSubtitle(18)}</p>
          </div>
          <StudyHeatmap progress={progress} weeks={18} />
        </Card>
        <Card className="dash-card">
          <div className="dash-card__head">
            <h2>{text.minutesTitle}</h2>
          </div>
          <MinutesChart series={series} goal={goalMinutes} />
        </Card>
      </section>

      {/* ---------- 5. từ vựng + bài viết ---------- */}
      <section className="dash-grid">
        <Card className="dash-card">
          <div className="dash-card__head dash-card__head--row">
            <h2>{text.wordsTitle}</h2>
            <Button variant="ghost" size="sm" to="/words" iconRight="arrow-right">
              {text.wordsLink}
            </Button>
          </div>
          <MemoryLevelColumns counts={memoryCounts} onSelect={(level) => navigate(`/words?level=${level}`)} height={104} />
          <div className="dash-words-foot">
            <p>{text.wordsNote}</p>
            {dueCards > 0 && (
              <Button size="sm" to="/review?start=1" iconLeft="review">
                {text.reviewDue(dueCards)}
              </Button>
            )}
          </div>
        </Card>
        <Card className="dash-card">
          <div className="dash-card__head">
            <h2>{text.writingTitle}</h2>
            <p>{text.writingSubtitle}</p>
          </div>
          {points.length >= 2 ? (
            <>
              <WritingGapChart points={points} />
              {gap && (
                <p className="dash-card__note">
                  {text.writingGapSummary(formatSigned(gap.first), formatSigned(gap.last))}{' '}
                  {Math.abs(gap.last) < Math.abs(gap.first) ? text.writingGapCloser : text.writingGapWider}
                </p>
              )}
            </>
          ) : (
            <div className="dash-writing-empty">
              <p>{text.writingEmpty}</p>
              <Button variant="secondary" size="sm" to="/learn">
                {text.writingEmptyAction}
              </Button>
            </div>
          )}
        </Card>
      </section>
    </main>
  )
}

/** +0.8 / −0.3 (luôn có dấu, 1 chữ số thập phân). */
function formatSigned(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return `${rounded > 0 ? '+' : rounded < 0 ? '−' : '±'}${Math.abs(rounded).toFixed(1)}`
}
