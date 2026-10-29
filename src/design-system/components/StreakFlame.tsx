/**
 * StreakFlame.tsx — NGỌN LỬA CHUỖI NGÀY + con số
 * ----------------------------------------------------------------------------
 *   <StreakFlame count={12} />                 // đã học hôm nay: lửa đỏ-cam
 *   <StreakFlame count={12} active={false} />  // chưa học hôm nay: lửa xám, nhắc nhẹ
 *
 * Khi `count` TĂNG (vừa giữ chuỗi), ngọn lửa tự "bùng" 1 lần và con số lật lên
 * (spec mục 4). Muốn ép hiệu ứng: đổi `celebrateKey` sang giá trị mới.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useRef, useState } from 'react'
import { useDsText } from '../design-system-text'
import './StreakFlame.css'

export interface StreakFlameProps {
  count: number
  /** đã học hôm nay chưa (chưa -> lửa xám) */
  active?: boolean
  /** sm 20px · md 28px · lg 44px (cỡ ngọn lửa) */
  size?: 'sm' | 'md' | 'lg'
  /** hiện chữ "ngày" sau số */
  showLabel?: boolean
  /** đổi giá trị này để ép chạy hiệu ứng bùng */
  celebrateKey?: string | number
  className?: string
}

const FLAME_PX = { sm: 20, md: 28, lg: 44 }

export function StreakFlame({ count, active = true, size = 'md', showLabel = false, celebrateKey, className }: StreakFlameProps) {
  const dsText = useDsText()
  const gradientId = 'ds-flame-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const previousCount = useRef(count)
  const [burstKey, setBurstKey] = useState(0)

  // Số tăng -> bùng 1 lần
  useEffect(() => {
    if (count > previousCount.current) setBurstKey((key) => key + 1)
    previousCount.current = count
  }, [count])
  useEffect(() => {
    if (celebrateKey !== undefined) setBurstKey((key) => key + 1)
  }, [celebrateKey])

  const px = FLAME_PX[size]
  return (
    <span
      className={['ds-streak', `ds-streak--${size}`, active ? 'is-active' : 'is-idle', className].filter(Boolean).join(' ')}
      role="img"
      aria-label={dsText('streakLabel', { n: count })}
    >
      <svg key={`flame-${burstKey}`} className={burstKey ? 'ds-streak__flame is-burst' : 'ds-streak__flame'} width={px} height={px} viewBox="0 0 24 24" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--flame-top)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--flame-bottom)' }} />
          </linearGradient>
        </defs>
        {/* thân lửa */}
        <path
          d="M12.2 2.2c.5 3-1.3 4.6-2.9 6.3C7.6 10.3 5.5 12.4 5.5 15.6A6.5 6.5 0 0 0 12 22a6.5 6.5 0 0 0 6.5-6.4c0-2.6-1.2-4.4-2.4-5.9-.2 1.2-.8 2.2-1.8 2.7.4-3.9-.8-7.6-2.1-10.2z"
          style={{ fill: `url(#${gradientId})` }}
        />
        {/* lõi lửa sáng */}
        <path d="M12.3 12.2c-.3 1.6-2.6 2.4-2.6 4.8a2.4 2.4 0 0 0 4.8.1c0-1.9-1.4-3-2.2-4.9z" style={{ fill: 'var(--flame-core)' }} />
        {/* vệt bóng vinyl */}
        <path d="M8.4 13.4c.3-1.3 1.1-2.3 2-3.2" stroke="rgba(255,255,255,.55)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
      <span key={`n-${count}`} className={burstKey ? 'ds-streak__count ds-num is-flip' : 'ds-streak__count ds-num'}>
        {count}
      </span>
      {showLabel && <span className="ds-streak__label">{dsText('streakDaysShort')}</span>}
    </span>
  )
}
