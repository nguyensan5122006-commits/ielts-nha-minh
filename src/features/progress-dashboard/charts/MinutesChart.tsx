/**
 * MinutesChart.tsx — CỘT "PHÚT HỌC MỖI NGÀY" (14 ngày) + VẠCH MỤC TIÊU
 * ----------------------------------------------------------------------------
 *   <MinutesChart series={minutesSeries(progress)} goal={15} />
 *
 * 1 chuỗi số liệu -> 1 màu; hôm nay đậm hơn (nhấn "kỳ hiện tại" — dataviz). Cột ≤ 20px, bo 4px
 * ở đầu, vuông ở chân. Vạch mục tiêu là đường mảnh liền (không nét đứt), có nhãn ở đầu.
 * Chỉ ghi số trên cột hôm nay và cột cao nhất; rê chuột cột nào -> chú thích cột đó.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { useLanguage } from '../../../translations/language-context'
import { useDashboardText } from '../progress-dashboard-text'

export interface MinutesChartProps {
  series: { day: string; minutes: number }[]
  goal: number
  height?: number
}

export function MinutesChart({ series, goal, height = 190 }: MinutesChartProps) {
  const text = useDashboardText()
  const { language } = useLanguage()
  const [hovered, setHovered] = useState<number | null>(null)
  // chừa 15% khoảng trống phía trên cột cao nhất cho nhãn số (không đè chú giải)
  const max = Math.max(goal * 1.25, ...series.map((entry) => entry.minutes * 1.15), 1)
  const peak = series.reduce((best, entry, index) => (entry.minutes > series[best].minutes ? index : best), 0)
  const last = series.length - 1
  const goalBottom = (goal / max) * height
  const label = (day: string) => new Date(day + 'T12:00:00').toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'numeric' })

  return (
    <div className="minutes-chart">
      {/* chú giải: vạch mục tiêu + cột hôm nay (1 chuỗi số liệu nên không cần hộp chú giải màu) */}
      <div className="minutes-chart__legend">
        <span className="minutes-chart__key">
          <span className="minutes-chart__key-line" /> {text.minutesGoal(goal)}
        </span>
        <span className="minutes-chart__key">
          <span className="minutes-chart__key-bar" /> {text.today}
        </span>
      </div>
      <div className="minutes-chart__plot" style={{ height }} role="img" aria-label={series.map((entry) => text.minutesBarTooltip(label(entry.day), entry.minutes)).join('; ')}>
        <span className="minutes-chart__goal" style={{ bottom: goalBottom }} />
        {series.map((entry, index) => {
          const showValue = (index === last || index === peak || index === hovered) && entry.minutes > 0
          return (
            <span
              key={entry.day}
              className={`minutes-chart__col${index === last ? ' is-today' : ''}${entry.minutes >= goal ? ' is-goal' : ''}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              title={text.minutesBarTooltip(label(entry.day), entry.minutes)}
            >
              {showValue && (
                <span className="minutes-chart__value" style={{ bottom: (entry.minutes / max) * height + 4 }}>
                  {entry.minutes}
                </span>
              )}
              <span className="minutes-chart__bar" style={{ height: entry.minutes ? Math.max(3, (entry.minutes / max) * height) : 0 }} />
            </span>
          )
        })}
      </div>
      <div className="minutes-chart__axis" aria-hidden>
        {series.map((entry, index) => (
          <span key={entry.day} className={index === last ? 'is-today' : ''}>
            {index === last ? text.today : index % 2 === (last % 2) ? label(entry.day) : ''}
          </span>
        ))}
      </div>
    </div>
  )
}
