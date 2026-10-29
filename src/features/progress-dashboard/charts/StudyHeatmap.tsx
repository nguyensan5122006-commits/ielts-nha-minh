/**
 * StudyHeatmap.tsx — LỊCH HỌC KIỂU "Ô VUÔNG THEO NGÀY" (18 tuần gần nhất)
 * ----------------------------------------------------------------------------
 *   <StudyHeatmap progress={progress} weeks={18} />
 *
 * Mỗi cột = 1 tuần (thứ Hai trên cùng), mỗi ô = 1 ngày. Màu ô = thang tuần tự 1 màu (cam
 * thương hiệu, --heat-1 … --heat-4, đã kiểm validate_palette.js --ordinal) theo số phút so với
 * mục tiêu ngày. Ngày "bảo vệ chuỗi" (freeze) có ô riêng màu xanh nhạt + dấu bông tuyết nhỏ.
 * Hôm nay có viền. Rê chuột / Tab tới ô -> chú thích ngày + số phút.
 * Không có ô đỏ cho ngày nghỉ (không đổ lỗi — psych-adult D7 luật 29).
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState } from 'react'
import type { LearningProgress } from '../../../learning-progress/progress-types'
import { addDays, todayString, weekStartDay } from '../../../learning-progress/study-calendar'
import { useLanguage } from '../../../translations/language-context'
import { inferFreezeDays } from '../dashboard-stats'
import { useDashboardText } from '../progress-dashboard-text'

/** Bậc màu theo phút học so với mục tiêu ngày. 0 = nghỉ. */
function heatStep(minutes: number, studied: boolean, goal: number): 0 | 1 | 2 | 3 | 4 {
  if (!studied && minutes <= 0) return 0
  if (minutes < goal * 0.5) return 1
  if (minutes < goal) return 2
  if (minutes < goal * 1.6) return 3
  return 4
}

interface Cell {
  day: string
  step: 0 | 1 | 2 | 3 | 4
  minutes: number
  isFreeze: boolean
  isToday: boolean
  isFuture: boolean
}

export function StudyHeatmap({ progress, weeks = 18 }: { progress: LearningProgress; weeks?: number }) {
  const text = useDashboardText()
  const { language } = useLanguage()
  const [hovered, setHovered] = useState<Cell | null>(null)
  const today = todayString()

  const columns = useMemo(() => {
    const studied = new Set(progress.studyDates)
    const freezes = inferFreezeDays(progress)
    const firstMonday = addDays(weekStartDay(today), -(weeks - 1) * 7)
    return Array.from({ length: weeks }, (_, week) =>
      Array.from({ length: 7 }, (_, weekday): Cell => {
        const day = addDays(firstMonday, week * 7 + weekday)
        const minutes = Math.round(progress.minutesByDay[day] ?? 0)
        return {
          day,
          minutes,
          step: heatStep(minutes, studied.has(day), progress.profile.dailyGoalMinutes),
          isFreeze: freezes.has(day),
          isToday: day === today,
          isFuture: day > today,
        }
      }),
    )
  }, [progress, weeks, today])

  const formatDay = (day: string) =>
    new Date(day + 'T12:00:00').toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'numeric' })
  const tooltipOf = (cell: Cell) =>
    cell.isFreeze ? text.dayFreezeTooltip(formatDay(cell.day)) : cell.step === 0 ? text.dayRestTooltip(formatDay(cell.day)) : text.dayTooltip(formatDay(cell.day), cell.minutes)

  // nhãn tháng: đặt ở cột (tuần) chứa ngày mùng 1 — mỗi tháng đúng 1 nhãn; cột đầu tiên luôn có nhãn
  const monthLabels = columns.map((column, week) => {
    const firstOfMonth = column.find((cell) => cell.day.endsWith('-01'))
    if (firstOfMonth) return text.monthShort(Number(firstOfMonth.day.slice(5, 7)))
    return week === 0 ? text.monthShort(Number(column[0].day.slice(5, 7))) : ''
  })

  return (
    <div className="heatmap">
      <div className="heatmap__grid" style={{ gridTemplateColumns: `28px repeat(${weeks}, 1fr)` }} onMouseLeave={() => setHovered(null)}>
        <span />
        {monthLabels.map((label, index) => (
          <span key={index} className="heatmap__month">
            {label}
          </span>
        ))}
        {Array.from({ length: 7 }, (_, weekday) => (
          <div key={weekday} className="heatmap__row">
            {/* nhãn thứ: chỉ T2, T4, T6 cho thoáng */}
            <span className="heatmap__weekday">{weekday % 2 === 0 ? text.weekdayShort[(weekday + 1) % 7] : ''}</span>
            {columns.map((column, week) => {
              const cell = column[weekday]
              if (cell.isFuture) return <span key={week} className="heatmap__cell is-future" aria-hidden />
              return (
                <span
                  key={week}
                  className={`heatmap__cell step-${cell.step}${cell.isFreeze ? ' is-freeze' : ''}${cell.isToday ? ' is-today' : ''}`}
                  title={tooltipOf(cell)}
                  aria-label={tooltipOf(cell)}
                  role="img"
                  tabIndex={cell.isToday ? 0 : -1}
                  onMouseEnter={() => setHovered(cell)}
                  onFocus={() => setHovered(cell)}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="heatmap__foot">
        <span className="heatmap__hover" aria-live="polite">
          {hovered ? tooltipOf(hovered) : ''}
        </span>
        <span className="heatmap__legend">
          <span className="heatmap__legend-item">
            <span className="heatmap__cell step-0" /> {text.legendNone}
          </span>
          <span className="heatmap__legend-item">
            <span className="heatmap__cell step-0 is-freeze" /> {text.legendFreeze}
          </span>
          <span className="heatmap__legend-item">
            {text.legendLess}
            {[1, 2, 3, 4].map((step) => (
              <span key={step} className={`heatmap__cell step-${step}`} />
            ))}
            {text.legendMore}
          </span>
        </span>
      </div>
    </div>
  )
}
