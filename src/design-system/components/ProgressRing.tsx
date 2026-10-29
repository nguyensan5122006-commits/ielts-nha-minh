/**
 * ProgressRing.tsx — VÒNG TIẾN ĐỘ (mục tiêu ngày, độ chính xác, % kỹ năng)
 * ----------------------------------------------------------------------------
 *   <ProgressRing value={0.7} label="Mục tiêu hôm nay">
 *     <strong>14</strong><span>/20 phút</span>
 *   </ProgressRing>
 *
 * Vẽ bằng SVG: 1 vòng nền + 1 vòng màu. Độ dài vòng màu điều khiển bằng
 * stroke-dashoffset (kỹ thuật "nét đứt dài bằng chu vi" để vẽ 1 phần vòng tròn).
 * ----------------------------------------------------------------------------
 */
import { useId, type CSSProperties, type ReactNode } from 'react'
import './ProgressRing.css'

export interface ProgressRingProps {
  /** tỉ lệ 0..1 */
  value: number
  /** đường kính px, mặc định 96 */
  size?: number
  /** độ dày vòng px, mặc định size/9 */
  thickness?: number
  /** màu vòng (mặc định cam). VD 'var(--c-success)' hoặc 'var(--skill-speaking)' */
  color?: string
  /** nhãn cho trình đọc màn hình */
  label?: string
  /** nội dung ở giữa vòng (số, chữ, icon) */
  children?: ReactNode
  className?: string
}

export function ProgressRing({ value, size = 96, thickness, color, label, children, className }: ProgressRingProps) {
  // id cho gradient SVG: bỏ ký tự đặc biệt của useId để dùng được trong url(#...)
  const gradientId = 'ds-ring-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ratio = Math.min(1, Math.max(0, value))
  const stroke = thickness ?? Math.max(6, Math.round(size / 9))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - ratio)

  return (
    <div
      className={['ds-ring', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...(color ? { '--ring-color': color } : {}) } as CSSProperties}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(ratio * 100)}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          {/* gradient cam mặc định: sáng ở trên -> đậm ở dưới (giống nút vinyl) */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: 'var(--c-primary)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--c-primary-deep)' }} />
          </linearGradient>
        </defs>
        <circle className="ds-ring__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
        <circle
          className="ds-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          style={{ stroke: color ? 'var(--ring-color)' : `url(#${gradientId})` }}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          // bắt đầu từ "12 giờ" thay vì "3 giờ"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {children !== undefined && <div className="ds-ring__center">{children}</div>}
    </div>
  )
}
