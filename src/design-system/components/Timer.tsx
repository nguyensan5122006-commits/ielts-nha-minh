/**
 * Timer.tsx — ĐỒNG HỒ ĐẾM NGƯỢC (phòng thi, Writing, Speaking part 2)
 * ----------------------------------------------------------------------------
 *   const secondsLeft = useCountdown(60 * 60, { running: true, onExpire: submit })
 *   <Timer secondsLeft={secondsLeft} />
 *
 * Tâm lý (psych-adult): đồng hồ gây áp lực, nên:
 *   - ẨN ĐƯỢC (bấm con mắt) — vẫn chạy ngầm, chỉ không nhìn thấy.
 *   - Khi còn <= 5 phút: đổi sang màu cam san hô nhẹ + báo 1 lần cho trình đọc
 *     màn hình. KHÔNG nhấp nháy, không rung, không đỏ chói.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { useDsText } from '../design-system-text'
import { Icon } from './Icon'
import './Timer.css'

export interface TimerProps {
  /** số giây còn lại (component cha tự đếm, VD bằng useCountdown) */
  secondsLeft: number
  /** từ mốc này (giây) trở xuống thì cảnh báo nhẹ. Mặc định 300 = 5 phút */
  warnAtSeconds?: number
  /** cho phép ẩn/hiện (mặc định có) */
  hideable?: boolean
  /** bắt đầu ở trạng thái ẩn */
  defaultHidden?: boolean
  /** nền tối (header phòng thi navy) */
  onDark?: boolean
  className?: string
}

/** 3725 -> "1:02:05" ; 299 -> "4:59" */
export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.ceil(totalSeconds))
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

export function Timer({ secondsLeft, warnAtSeconds = 300, hideable = true, defaultHidden = false, onDark = false, className }: TimerProps) {
  const dsText = useDsText()
  const [hidden, setHidden] = useState(defaultHidden)
  const warning = secondsLeft <= warnAtSeconds
  const clock = formatClock(secondsLeft)

  // Báo cho trình đọc màn hình đúng 1 lần khi vừa vào mốc cảnh báo
  const [announcement, setAnnouncement] = useState('')
  const wasWarning = useRef(warning)
  useEffect(() => {
    if (warning && !wasWarning.current) setAnnouncement(`${dsText('timerLeft', { time: clock })}. ${dsText('timerWarning')}`)
    wasWarning.current = warning
  }, [warning, clock, dsText])

  return (
    <div className={['ds-timer', warning && 'is-warning', hidden && 'is-hidden', onDark && 'is-on-dark', className].filter(Boolean).join(' ')}>
      <Icon name="clock" size={18} />
      {hidden ? (
        <span className="ds-timer__hidden-text">{dsText('timerHidden')}</span>
      ) : (
        <span className="ds-timer__clock ds-num" role="timer" aria-label={dsText('timerLeft', { time: clock })}>
          {clock}
        </span>
      )}
      {hideable && (
        <button type="button" className="ds-timer__toggle" onClick={() => setHidden((value) => !value)} aria-label={hidden ? dsText('timerShow') : dsText('timerHide')} title={hidden ? dsText('timerShow') : dsText('timerHide')}>
          <Icon name={hidden ? 'eye' : 'eye-off'} size={16} />
        </button>
      )}
      <span className="ds-visually-hidden" aria-live="polite">
        {announcement}
      </span>
    </div>
  )
}

/**
 * Hook đếm ngược chính xác theo đồng hồ máy (không bị lệch khi tab bị ẩn).
 * Trả về số giây còn lại; hết giờ gọi onExpire đúng 1 lần.
 */
export function useCountdown(totalSeconds: number, { running = true, onExpire }: { running?: boolean; onExpire?: () => void } = {}): number {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const remainingRef = useRef(totalSeconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (!running) return
    // tính theo "mốc kết thúc" chứ không trừ 1 mỗi giây -> chính xác kể cả khi máy chậm
    const endsAt = Date.now() + remainingRef.current * 1000
    const id = window.setInterval(() => {
      const left = Math.max(0, (endsAt - Date.now()) / 1000)
      remainingRef.current = left
      setSecondsLeft(Math.ceil(left))
      if (left <= 0) {
        window.clearInterval(id)
        onExpireRef.current?.()
      }
    }, 250)
    return () => window.clearInterval(id)
  }, [running])

  return secondsLeft
}
