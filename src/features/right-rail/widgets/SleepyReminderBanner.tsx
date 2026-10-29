/**
 * SleepyReminderBanner.tsx — BANNER "MASCOT NGỦ GẬT" KHI HÔM NAY CHƯA HỌC
 * ----------------------------------------------------------------------------
 * Nhắc học CHỈ trong web (không thông báo đẩy). Giọng nhẹ nhàng, không đổ lỗi, không doạ
 * mất chuỗi (psych-adult D7.29–31). 3 kiểu câu:
 *   - chuỗi vừa đứt, còn sửa được  -> "Hôm qua bận à? Không sao. Học 2 bài trong 48 giờ…"
 *   - đang có chuỗi                 -> "Học 1 bài là ngọn lửa N ngày cháy tiếp."
 *   - chưa có chuỗi                 -> "{mascot} đang chờ bạn ở Trạm 3…"
 * Nút chính "Học N phút" + nút "Để sau" (ẩn tới hết hôm nay, nhớ trong localStorage).
 * Đã học hôm nay -> tự ẩn.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Mascot } from '../../../design-system/components/Mascot'
import { useProgress } from '../../../learning-progress/progress-store'
import { todayString } from '../../../learning-progress/study-calendar'
import { useRightRailText } from '../right-rail-text'

const DISMISS_KEY = 'ielts-sleepy-banner-dismissed'

function readDismissedDay(): string | null {
  try {
    return localStorage.getItem(DISMISS_KEY)
  } catch {
    return null
  }
}

export interface SleepyReminderBannerProps {
  /** trạm đang học (để nói "Ki đang chờ bạn ở Trạm 3"), null nếu không rõ */
  stationNumber: number | null
  /** số phút của bài kế tiếp */
  lessonMinutes: number
  onStart: () => void
}

export function SleepyReminderBanner({ stationNumber, lessonMinutes, onStart }: SleepyReminderBannerProps) {
  const text = useRightRailText()
  const { streak } = useProgress()
  const today = todayString()
  const [dismissedDay, setDismissedDay] = useState(readDismissedDay)

  if (streak.studiedToday || dismissedDay === today) return null

  function dismiss() {
    setDismissedDay(today)
    try {
      localStorage.setItem(DISMISS_KEY, today)
    } catch {
      /* chế độ riêng tư: chỉ ẩn trong lần mở này */
    }
  }

  const minutes = Math.max(3, Math.min(15, lessonMinutes))
  const repair = streak.repairAvailable
  const title = repair ? text.sleepyRepairTitle : text.sleepyTitle
  const body = repair
    ? text.sleepyRepairBody(streak.repairLessonsLeft, streak.repairStreak)
    : streak.current > 0
      ? text.sleepyStreak(streak.current)
      : text.sleepyBody(stationNumber, minutes)

  return (
    <aside className="rr-sleepy" aria-label={title}>
      <Mascot pose="sleepy" size={84} className="rr-sleepy__mascot" />
      <span className="rr-sleepy__zzz" aria-hidden>
        z<span>z</span>
        <span>z</span>
      </span>
      <div className="rr-sleepy__text">
        <strong className="rr-sleepy__title">{title}</strong>
        <span className="rr-sleepy__body">{body}</span>
      </div>
      <div className="rr-sleepy__actions">
        <Button variant="primary" size="md" iconRight="arrow-right" onClick={onStart}>
          {text.sleepyStart(minutes)}
        </Button>
        <Button variant="ghost" size="md" onClick={dismiss}>
          {text.sleepyLater}
        </Button>
      </div>
    </aside>
  )
}
