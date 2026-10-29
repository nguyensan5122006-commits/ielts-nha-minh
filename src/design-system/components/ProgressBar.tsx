/**
 * ProgressBar.tsx — THANH TIẾN ĐỘ có "đầu thanh" là huy hiệu ngôi sao nhỏ
 * ----------------------------------------------------------------------------
 *   <ProgressBar value={3} max={10} label="Tiến độ bài" />
 *   <ProgressBar value={60} color="var(--skill-reading)" size="sm" showHead={false} />
 *   <ProgressBar value={step} max={total} valueText={`${step}/${total}`} streakText="3 câu đúng liền!" />
 *
 * Chuyển động (spec mục 4): tăng thì chạy mượt 400ms; khi vượt mốc 50% và 100%
 * có vài ngôi sao lấp lánh quanh đầu thanh (không pháo giấy toàn màn).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Icon } from './Icon'
import './ProgressBar.css'

export interface ProgressBarProps {
  /** giá trị hiện tại (0..max) */
  value: number
  /** giá trị tối đa, mặc định 100 */
  max?: number
  /** màu phần đã đầy (mặc định gradient cam). VD 'var(--skill-listening)' */
  color?: string
  /** sm 8px · md 14px (mặc định) · lg 18px */
  size?: 'sm' | 'md' | 'lg'
  /** hiện huy hiệu ngôi sao ở đầu thanh (mặc định: có, trừ size sm) */
  showHead?: boolean
  /** nhãn cho trình đọc màn hình, VD "Tiến độ bài" */
  label?: string
  /** chữ nhỏ bên phải thanh, VD "3/10" */
  valueText?: string
  /** nhãn nhỏ nảy lên trên đầu thanh, VD "3 câu đúng liền!" (để trống = ẩn) */
  streakText?: string
  className?: string
}

const MILESTONES = [0.5, 1]

export function ProgressBar({ value, max = 100, color, size = 'md', showHead, label, valueText, streakText, className }: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0
  const withHead = showHead ?? size !== 'sm'

  // Phát hiện "vừa vượt mốc" 50% / 100% để bật lấp lánh 1 lần
  const previousRatio = useRef(ratio)
  const [sparkleKey, setSparkleKey] = useState(0)
  useEffect(() => {
    const crossed = MILESTONES.some((mark) => previousRatio.current < mark && ratio >= mark)
    previousRatio.current = ratio
    if (crossed) setSparkleKey((key) => key + 1)
  }, [ratio])

  const style = {
    '--pb-pct': `${ratio * 100}%`,
    ...(color ? { '--pb-color': color } : {}),
  } as CSSProperties

  return (
    <div className={['ds-progress', `ds-progress--${size}`, withHead && 'has-head', className].filter(Boolean).join(' ')} style={style}>
      <div
        className="ds-progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.round(value * 100) / 100}
        aria-valuetext={valueText}
      >
        <div className="ds-progress__fill" />
        {withHead && (
          <div className="ds-progress__head" aria-hidden>
            <Icon name="star" size={size === 'lg' ? 15 : 13} />
            {sparkleKey > 0 && (
              <span className="ds-progress__sparkles" key={sparkleKey}>
                <i />
                <i />
                <i />
              </span>
            )}
            {streakText && (
              <span className="ds-progress__streak" key={streakText}>
                {streakText}
              </span>
            )}
          </div>
        )}
      </div>
      {valueText && <span className="ds-progress__value ds-num">{valueText}</span>}
    </div>
  )
}
