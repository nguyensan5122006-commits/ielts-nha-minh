/**
 * LessonResults.tsx — MÀN KẾT QUẢ BÀI HỌC
 * ----------------------------------------------------------------------------
 * Thứ tự (04-DESIGN-SYSTEM mục 9 + psych-adult D5):
 *   1. Mascot "celebrate" + "Xong bài" + câu khen CỤ THỂ theo kết quả (can-do của bài)
 *   2. 3 ô chỉ số: độ chính xác (vòng) · thời gian · XP đếm lên
 *   3. "Câu cần ôn" (1–3 câu) + nút "Ôn lại câu sai" -> làm lại ngay tại chỗ (~1 phút)
 *   4. Tiến độ hôm nay (vòng mục tiêu phút + chuỗi ngày)
 *   5. 2 nút: "Học tiếp" (chính, bài kế từ lộ trình) + "Dừng ở đây" (phụ, KHÔNG mờ)
 *
 * Ăn mừng ≤ 1,5 giây (pháo giấy nhỏ + số đếm lên), Enter trong lúc đó = bỏ qua
 * hoạt cảnh; sau đó Enter = "Học tiếp". Ăn mừng LỚN chỉ ở mốc (MilestoneScreen).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lesson, LevelId, Unit } from '../../../content/content-types'
import { preloadLesson } from '../../../content/lesson-loader'
import { findNextLesson, unitProgress } from '../../../content/path-selectors'
import { Button } from '../../../design-system/components/Button'
import { fireConfetti } from '../../../design-system/components/Confetti'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import { Mascot } from '../../../design-system/components/Mascot'
import { ProgressRing } from '../../../design-system/components/ProgressRing'
import { StreakFlame } from '../../../design-system/components/StreakFlame'
import { XpCounter } from '../../../design-system/components/XpCounter'
import { playSound } from '../../../design-system/sound-kit'
import { useReducedMotion } from '../../../design-system/use-reduced-motion'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { questionTextOf } from '../exercises/exercise-contract'
import { useLessonText } from '../lesson-player-text'
import type { SessionSummary, ItemSummary } from '../session/lesson-session'
import type { SkillTaskResult } from '../skill-task-registry'
import { LessonGlyph } from './LessonGlyph'
import { MistakeReplay } from './MistakeReplay'

/** Ăn mừng tối đa 1,5 giây */
const CELEBRATION_MS = 1500

export interface CompletionInfo {
  summary: SessionSummary
  xp: number
  minutes: number
  isRepeat: boolean
  taskResult: SkillTaskResult | null
}

interface LessonResultsProps {
  lesson: Lesson
  unit: Unit | null
  levelId: LevelId | null
  targetBand?: string
  completion: CompletionInfo
}

export function LessonResults({ lesson, unit, levelId, targetBand, completion }: LessonResultsProps) {
  const text = useLessonText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { progress, todayMinutes, streak } = useProgress()
  const { summary, xp, minutes, taskResult } = completion

  const [celebrating, setCelebrating] = useState(!reduceMotion)
  const [replaying, setReplaying] = useState(false)
  const [reviewedCount, setReviewedCount] = useState<number | null>(null)
  const [gridOpen, setGridOpen] = useState(false)

  // bài kế tiếp: tính lúc VẼ (sau khi completeLessonV3 đã cập nhật tiến độ — 03-DATA-LAYER mục 5.4)
  const next = useMemo(() => findNextLesson(progress), [progress])
  useEffect(() => {
    if (next) preloadLesson(next.lesson.id)
  }, [next])

  // ăn mừng ngắn: âm "complete" + pháo giấy nhỏ, tự tắt sau 1,5 giây
  useEffect(() => {
    playSound('complete')
    if (!reduceMotion) fireConfetti({ origin: { x: 0.5, y: 0.22 }, particleCount: 70, durationMs: 1200 })
    const timer = window.setTimeout(() => setCelebrating(false), CELEBRATION_MS)
    return () => window.clearTimeout(timer)
  }, [reduceMotion])

  const goNext = () => (next ? navigate(`/lesson/${next.lesson.id}`) : navigate('/learn'))

  // Enter: đang ăn mừng -> bỏ qua; sau đó -> Học tiếp
  useEffect(() => {
    if (replaying) return
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (event.key !== 'Enter' || target.closest('[role="dialog"]') || target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'SUMMARY') return
      event.preventDefault()
      if (celebrating) setCelebrating(false)
      else goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const toReview = summary.toReview.slice(0, 3)
  const accuracyPercent = Math.round(summary.accuracy * 100)
  const goal = progress.profile.dailyGoalMinutes || 10
  const goalRatio = Math.min(1, todayMinutes / goal)
  const unitStats = unit ? unitProgress(unit, progress) : null
  const praise = buildPraise(summary, taskResult, text, pick, pick(lesson.title))

  if (replaying) {
    return (
      <div className="lp-results lp-results--replay">
        <MistakeReplay
          lesson={lesson}
          exercises={toReview.map((item) => item.exercise)}
          levelId={levelId ?? undefined}
          targetBand={targetBand}
          onCancel={() => setReplaying(false)}
          onDone={() => {
            setReviewedCount(toReview.length)
            setReplaying(false)
          }}
        />
      </div>
    )
  }

  return (
    <div className={['lp-results', celebrating && 'is-celebrating'].filter(Boolean).join(' ')}>
      <div className="lp-results__column">
        {/* 1. ăn mừng + làm được gì */}
        <header className="lp-results__hero">
          <Mascot pose="celebrate" size={132} placement="inline" className="lp-results__mascot" />
          <div className="lp-results__headline">
            <p className="lp-results__eyebrow">
              <Icon name="check" size={15} strokeWidth={3} /> {text.resultsCanDoTitle}
            </p>
            <h1 className="lp-results__title">{pick(lesson.title)}</h1>
            <p className="lp-results__praise">{praise}</p>
            {unit && unitStats && (
              <p className="lp-results__unit">
                <span className="lp-results__unit-bar" aria-hidden>
                  <span style={{ width: `${unitStats.percent}%` }} />
                </span>
                <span>
                  {pick(unit.title)} · {unitStats.done}/{unitStats.total}
                </span>
              </p>
            )}
          </div>
          {celebrating && (
            <button type="button" className="lp-results__skip" onClick={() => setCelebrating(false)}>
              <Kbd>Enter</Kbd> {text.skipCelebration}
            </button>
          )}
        </header>

        {/* 2. 3 ô chỉ số */}
        <section className="lp-stats" aria-label={text.accuracy}>
          <div className="lp-stat">
            <ProgressRing value={summary.accuracy} size={84} color={accuracyPercent >= 80 ? 'var(--c-success)' : undefined} label={text.accuracy}>
              <strong className="ds-num">{accuracyPercent}%</strong>
            </ProgressRing>
            <div className="lp-stat__text">
              <span className="lp-stat__label">{text.accuracy}</span>
              <span className="lp-stat__hint">{summary.graded > 0 ? text.firstTryLine(summary.firstTryCorrect, summary.graded) : '—'}</span>
            </div>
          </div>
          <div className="lp-stat">
            <span className="lp-stat__icon lp-stat__icon--time" aria-hidden>
              <LessonGlyph name="timer" size={30} />
            </span>
            <div className="lp-stat__text">
              <span className="lp-stat__label">{text.time}</span>
              <strong className="lp-stat__value ds-num">{text.minutesShort(minutes)}</strong>
            </div>
          </div>
          <div className="lp-stat">
            <span className="lp-stat__icon lp-stat__icon--xp" aria-hidden>
              <Icon name="star" size={28} />
            </span>
            <div className="lp-stat__text">
              <span className="lp-stat__label">{text.xp}</span>
              <XpCounter value={xp} from={celebrating ? 0 : xp} durationMs={1100} delayMs={250} size="md" />
            </div>
          </div>
        </section>
        {completion.isRepeat && <p className="lp-results__note">{text.xpRepeatNote}</p>}

        {/* 3. câu cần ôn */}
        <section className="lp-review">
          <div className="lp-review__head">
            <h2>{text.reviewTitle}</h2>
            {toReview.length > 0 && reviewedCount === null && <span className="lp-review__about">{text.reviewAbout(toReview.length)}</span>}
          </div>
          {reviewedCount !== null ? (
            <div className="lp-review__done">
              <span className="lp-review__done-icon" aria-hidden>
                <Icon name="check" size={18} strokeWidth={3} />
              </span>
              <div>
                <strong>{text.reviewDone(reviewedCount)}</strong>
                <p>{text.reviewDoneText}</p>
              </div>
            </div>
          ) : toReview.length === 0 && !(taskResult?.mistakes?.length) ? (
            <p className="lp-review__none">{text.reviewNone}</p>
          ) : (
            <>
              <ul className="lp-review__list">
                {toReview.map((item) => (
                  <ReviewRow key={item.exercise.id} item={item} />
                ))}
                {taskResult?.mistakes?.slice(0, Math.max(0, 3 - toReview.length)).map((mistake) => (
                  <li key={mistake.itemId} className="lp-review__item">
                    <span className="lp-review__q">{mistake.question}</span>
                    <span className="lp-review__a">
                      <s>{mistake.userAnswer}</s> <Icon name="arrow-right" size={14} /> <strong>{mistake.correctAnswer}</strong>
                    </span>
                  </li>
                ))}
              </ul>
              {toReview.length > 0 && (
                <Button variant="navy" iconLeft={<LessonGlyph name="replay" size={18} />} onClick={() => setReplaying(true)}>
                  {text.reviewButton}
                </Button>
              )}
            </>
          )}
          {summary.items.length > 0 && (
            <div className="lp-grid">
              <button type="button" className="lp-grid__toggle" aria-expanded={gridOpen} onClick={() => setGridOpen((open) => !open)}>
                {text.answerGrid}
                <Icon name="chevron-down" size={16} />
              </button>
              {gridOpen && <AnswerGrid items={summary.items} />}
            </div>
          )}
        </section>

        {/* 4. tiến độ hôm nay */}
        <section className="lp-today">
          <ProgressRing value={goalRatio} size={64} color={goalRatio >= 1 ? 'var(--c-success)' : undefined} label={text.goalTitle}>
            <LessonGlyph name="target" size={22} />
          </ProgressRing>
          <div className="lp-today__text">
            <span className="lp-today__title">{text.goalTitle}</span>
            <strong className="ds-num">{text.goalLine(Math.round(todayMinutes), goal)}</strong>
            <span className="lp-today__hint">{goalRatio >= 1 ? text.goalReached : text.goalLeft(Math.max(1, Math.ceil(goal - todayMinutes)))}</span>
          </div>
          <div className="lp-today__streak">
            <StreakFlame count={streak.current} active={streak.studiedToday} size="md" />
            <span>{text.streakToday(streak.current)}</span>
          </div>
        </section>
        {todayMinutes >= 25 && <p className="lp-results__note">{text.breakSuggestion}</p>}

        {/* 5. bước tiếp theo */}
        <footer className="lp-results__actions">
          <Button variant="secondary" size="lg" to="/learn">
            {text.stopHere}
          </Button>
          <div className="lp-results__next">
            {next ? <span className="lp-results__next-title">{text.nextLessonIs(pick(next.lesson.title))}</span> : <span className="lp-results__next-title">{text.allDone}</span>}
            <Button size="lg" onClick={goNext} iconRight={<Kbd onColor>Enter</Kbd>}>
              {next ? text.nextLesson : text.backToPath}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

/** Câu khen cụ thể theo kết quả (không "giỏi quá / thông minh"). */
function buildPraise(
  summary: SessionSummary,
  taskResult: SkillTaskResult | null,
  text: ReturnType<typeof useLessonText>,
  pick: (value: { vi: string; en: string } | undefined) => string,
  lessonTitle: string,
): string {
  if (taskResult?.summary) return pick(taskResult.summary)
  if (summary.graded === 0) return text.resultsDefaultCanDo(lessonTitle)
  return text.firstTryLine(summary.firstTryCorrect, summary.graded)
}

function ReviewRow({ item }: { item: ItemSummary }) {
  const { record, exercise } = item
  const question = record.question ?? questionTextOf(exercise)
  // nối cặp: "câu trả lời" chỉ là số lần nhầm -> không hiện
  const showUser = !!record.userAnswer && exercise.type !== 'match-pairs'
  return (
    <li className="lp-review__item" title={`${question} → ${record.correctAnswer ?? ''}`}>
      <span className="lp-review__q">{question}</span>
      <span className="lp-review__a">
        {showUser && (
          <>
            <s>{record.userAnswer}</s> <Icon name="arrow-right" size={14} />{' '}
          </>
        )}
        <strong>{record.correctAnswer}</strong>
      </span>
    </li>
  )
}

/** Lưới xem lại từng câu: mỗi ô 1 câu, màu theo trạng thái, bấm để xem chi tiết. */
function AnswerGrid({ items }: { items: ItemSummary[] }) {
  const text = useLessonText()
  const { pick } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(null)
  const label = { 'first-try': text.gridCorrect, later: text.gridRetry, review: text.gridWrong, unscored: text.gridUnclear }
  const open = items.find((item) => item.exercise.id === openId)
  return (
    <div className="lp-grid__body">
      <ol className="lp-grid__cells">
        {items.map((item, index) => (
          <li key={item.exercise.id}>
            <button
              type="button"
              className={`lp-grid__cell is-${item.status}`}
              aria-pressed={openId === item.exercise.id}
              title={label[item.status]}
              onClick={() => setOpenId(openId === item.exercise.id ? null : item.exercise.id)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ol>
      <ul className="lp-grid__legend">
        {(['first-try', 'later', 'review', 'unscored'] as const).map((status) => (
          <li key={status} className={`is-${status}`}>
            {label[status]}
          </li>
        ))}
      </ul>
      {open && (
        <div className="lp-grid__detail">
          <p className="lp-grid__q">{questionTextOf(open.exercise)}</p>
          {open.record.correctAnswer && <p>{open.record.correctAnswer}</p>}
          {open.exercise.explanation && <p className="lp-grid__why">{pick(open.exercise.explanation)}</p>}
        </div>
      )}
    </div>
  )
}
