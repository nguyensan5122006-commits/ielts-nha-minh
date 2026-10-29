/**
 * XpCounter.tsx — SỐ XP "ĐẾM LÊN" (màn kết quả bài, hoàn thành nhiệm vụ)
 * ----------------------------------------------------------------------------
 *   <XpCounter value={35} />               // đếm 0 -> 35, hiện "+35 XP"
 *   <XpCounter value={1240} from={1205} showPlus={false} />  // tổng XP tăng từ 1205
 *
 * Đếm bằng requestAnimationFrame (mỗi khung hình vẽ lại 1 lần), chậm dần ở cuối
 * cho "đã mắt". Người dùng bật giảm chuyển động -> hiện ngay số cuối.
 * Trình đọc màn hình luôn đọc số CUỐI (aria-label), không đọc từng số nhảy.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../use-reduced-motion'
import { Icon } from './Icon'
import './XpCounter.css'

export interface XpCounterProps {
  /** số XP cuối cùng */
  value: number
  /** bắt đầu đếm từ số này (mặc định 0) */
  from?: number
  /** thời gian đếm (ms), mặc định 900 */
  durationMs?: number
  /** chờ bao lâu rồi mới đếm (ms) — để khớp nhịp với hoạt cảnh khác */
  delayMs?: number
  /** hiện dấu "+" phía trước (mặc định có) */
  showPlus?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/** Chậm dần ở cuối: nhanh lúc đầu, êm khi gần tới số cuối. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function XpCounter({ value, from = 0, durationMs = 900, delayMs = 0, showPlus = true, size = 'md', className }: XpCounterProps) {
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(reduceMotion ? value : from)

  useEffect(() => {
    if (reduceMotion) {
      setShown(value)
      return
    }
    let frame = 0
    let startTime: number | null = null
    const step = (now: number) => {
      if (startTime === null) startTime = now + delayMs
      const elapsed = now - startTime
      if (elapsed < 0) {
        frame = requestAnimationFrame(step)
        return
      }
      const progress = Math.min(1, elapsed / durationMs)
      setShown(Math.round(from + (value - from) * easeOutCubic(progress)))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame) // rời trang giữa chừng -> dừng đếm
  }, [value, from, durationMs, delayMs, reduceMotion])

  const done = shown === value
  return (
    <span className={['ds-xp', `ds-xp--${size}`, done && 'is-done', className].filter(Boolean).join(' ')} aria-label={`${showPlus ? '+' : ''}${value} XP`}>
      <span className="ds-xp__star" aria-hidden>
        <Icon name="star" size={size === 'lg' ? 26 : size === 'md' ? 18 : 14} />
      </span>
      <span className="ds-xp__number ds-num" aria-hidden>
        {showPlus ? '+' : ''}
        {shown.toLocaleString('vi-VN')}
      </span>
      <span className="ds-xp__unit" aria-hidden>
        XP
      </span>
    </span>
  )
}
