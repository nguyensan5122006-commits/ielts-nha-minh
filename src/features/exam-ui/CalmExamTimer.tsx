/**
 * CalmExamTimer.tsx — ĐỒNG HỒ "ÊM" CHO PHÒNG THI
 * ----------------------------------------------------------------------------
 *   const { secondsLeft, tone } = useExamCountdown(20 * 60, { running, onExpire: autoSubmit })
 *   <CalmExamTimer secondsLeft={secondsLeft} tone={tone} />
 *   <header className={`... xf-header--${tone}`}>     // đổi màu header theo tone
 *
 * Theo máy thi IELTS (research ui-ielts-a ý 4): hiện CHỮ "Còn 17 phút", KHÔNG nhảy từng giây.
 *   - tone 'calm'  : > 5 phút — chữ xám nhỏ
 *   - tone 'soon'  : <= 5 phút — header chuyển cam nhạt (không nhấp nháy)
 *   - tone 'final' : <= 60 giây — đếm theo giây "Còn 42 giây", header cam san hô
 * Ẩn/hiện được (vẫn chạy ngầm). Báo trình đọc màn hình đúng 1 lần khi đổi tone.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../design-system/components/Icon'
import { useCountdown } from '../../design-system/components/Timer'
import { useExamUiText } from './exam-ui-text'
import './CalmExamTimer.css'

export type TimerTone = 'calm' | 'soon' | 'final'

export function toneFor(secondsLeft: number): TimerTone {
  if (secondsLeft <= 60) return 'final'
  if (secondsLeft <= 5 * 60) return 'soon'
  return 'calm'
}

/** Đếm ngược theo đồng hồ máy (không lệch khi tab bị ẩn). `startAt` = số giây còn lại lúc mở (học tiếp bài dở). */
export function useExamCountdown(startAt: number, options: { running: boolean; onExpire?: () => void }) {
  const secondsLeft = useCountdown(startAt, options)
  return { secondsLeft, tone: toneFor(secondsLeft) }
}

export interface CalmExamTimerProps {
  secondsLeft: number
  tone?: TimerTone
  hideable?: boolean
}

export function CalmExamTimer({ secondsLeft, tone = toneFor(secondsLeft), hideable = true }: CalmExamTimerProps) {
  const text = useExamUiText()
  const [hidden, setHidden] = useState(false)
  const minutes = Math.ceil(secondsLeft / 60)
  const label =
    tone === 'final' ? text('secondsLeft', { n: Math.max(0, Math.ceil(secondsLeft)) }) : minutes === 1 ? text('oneMinuteLeft') : text('minutesLeft', { n: minutes })

  // báo 1 lần khi sang mốc mới (5 phút, 1 phút)
  const [announcement, setAnnouncement] = useState('')
  const previousTone = useRef(tone)
  useEffect(() => {
    if (tone !== previousTone.current) setAnnouncement(label)
    previousTone.current = tone
  }, [tone, label])

  // phút cuối luôn hiện (cần hành động), kể cả khi đã ẩn
  const showClock = !hidden || tone === 'final'

  return (
    <div className={`xtimer xtimer--${tone}`}>
      <Icon name="clock" size={18} />
      <span className="xtimer__label" role="timer" aria-live="off">
        {showClock ? label : text('timerHidden')}
      </span>
      {hideable && tone !== 'final' && (
        <button type="button" className="xtimer__toggle" onClick={() => setHidden((value) => !value)} aria-label={hidden ? text('showTimer') : text('hideTimer')} title={hidden ? text('showTimer') : text('hideTimer')}>
          <Icon name={hidden ? 'eye' : 'eye-off'} size={16} />
        </button>
      )}
      <span className="ds-visually-hidden" aria-live="polite">
        {announcement}
      </span>
    </div>
  )
}
