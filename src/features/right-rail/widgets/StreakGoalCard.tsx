/**
 * StreakGoalCard.tsx — Ô "HÔM NAY": (a) chuỗi ngày + (b) vòng mục tiêu phút
 * ----------------------------------------------------------------------------
 *  - Vòng mục tiêu: phút học hôm nay / mục tiêu ngày (progress.profile.dailyGoalMinutes).
 *  - Ngọn lửa chuỗi (xám nếu hôm nay chưa học) + "N ngày liên tiếp".
 *  - Hàng 7 ngày của tuần (T2 → CN): ngày đã học tô lửa, hôm nay viền, ngày tới nét đứt.
 *  - Luôn hiện "Tuần này x/7" + "Tổng N ngày học" (không bao giờ giảm) + số lá chắn chuỗi.
 *  - Chuỗi vừa đứt (≤ 48 giờ): lời mời sửa chuỗi nhẹ nhàng, không đổ lỗi (psych-adult D7.29).
 * ----------------------------------------------------------------------------
 */
import { Card } from '../../../design-system/components/Card'
import { ProgressRing } from '../../../design-system/components/ProgressRing'
import { StreakFlame } from '../../../design-system/components/StreakFlame'
import { Tooltip } from '../../../design-system/components/Tooltip'
import { useProgress } from '../../../learning-progress/progress-store'
import { addDays, todayString, weekStartDay } from '../../../learning-progress/study-calendar'
import { useRightRailText } from '../right-rail-text'

export function StreakGoalCard() {
  const text = useRightRailText()
  const { progress, streak, todayMinutes } = useProgress()
  const goal = Math.max(1, progress.profile.dailyGoalMinutes || 10)
  const minutes = Math.round(todayMinutes)
  const reached = minutes >= goal

  const today = todayString()
  const monday = weekStartDay(today)
  const studied = new Set(progress.studyDates)
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(monday, i)
    return { day, studied: studied.has(day), isToday: day === today, isFuture: day > today }
  })

  return (
    <Card padding="sm" className="rr-card rr-today" as="section" aria-label={text.todayTitle} id="rr-today">
      <div className="rr-today__top">
        <ProgressRing value={Math.min(1, minutes / goal)} size={92} thickness={9} color={reached ? 'var(--c-success)' : 'var(--c-primary)'} label={`${text.goalTitle}: ${text.goalMinutes(minutes, goal)}`}>
          <strong className="rr-today__minutes ds-num">{minutes}</strong>
          <span className="rr-today__goal">{text.goalOf(goal)}</span>
        </ProgressRing>
        <div className="rr-today__streak">
          <StreakFlame count={streak.current} active={streak.studiedToday} size="lg" />
          <span className="rr-today__streak-days">{text.streakDaysLabel(streak.current)}</span>
          <span className={`rr-today__streak-sub${reached ? ' is-kept' : ''}`}>
            {reached ? text.goalReached : streak.studiedToday ? text.goalLeft(goal - minutes) : streak.current === 0 ? text.streakStartHint : text.streakNotYetLeft(goal - minutes)}
          </span>
        </div>
      </div>

      <ol className="rr-week" aria-label={text.thisWeek(streak.thisWeekDays)}>
        {week.map((entry, index) => (
          <li key={entry.day} className={`rr-week__day${entry.studied ? ' is-studied' : ''}${entry.isToday ? ' is-today' : ''}${entry.isFuture ? ' is-future' : ''}`}>
            <span className="rr-week__dot" aria-hidden>
              {entry.studied ? '🔥' : ''}
            </span>
            <span className="rr-week__name">{text.weekdays[index]}</span>
          </li>
        ))}
      </ol>

      <div className="rr-today__facts">
        <span className="rr-fact">{text.thisWeek(streak.thisWeekDays)}</span>
        <span className="rr-fact">{text.totalDays(streak.totalStudyDays)}</span>
        <Tooltip text={text.freezesHint}>
          <span className="rr-fact rr-fact--shield" tabIndex={0}>
            🛡️ {text.freezes(streak.freezes)}
          </span>
        </Tooltip>
      </div>

      {streak.repairAvailable && (
        <div className="rr-repair" role="note">
          <strong>{text.repairTitle(streak.repairStreak)}</strong>
          <span>{text.repairBody(streak.repairLessonsLeft)}</span>
        </div>
      )}
    </Card>
  )
}
