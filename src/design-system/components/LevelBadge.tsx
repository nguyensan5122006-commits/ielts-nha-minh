/**
 * LevelBadge.tsx — HUY HIỆU 3D CỦA 3 LEVEL (Khu phố · Thành phố · Toàn quốc)
 * ----------------------------------------------------------------------------
 *   <LevelBadge level={1} />
 *   <LevelBadge level={2} size={120} state="current" />   // đang học: phát sáng "thở"
 *   <LevelBadge level={3} state="locked" />               // chưa mở: xám + ổ khoá
 *
 * Ảnh: /art/badges/level-<N>-512.webp. Chưa có ảnh -> khiên SVG vẽ sẵn
 * (level 1 ô-liu, level 2 navy, level 3 vàng) có ngôi sao + số level.
 * ----------------------------------------------------------------------------
 */
import { useId, type CSSProperties } from 'react'
import { useDsText } from '../design-system-text'
import { useImageFallback } from '../use-image-fallback'
import { Icon } from './Icon'
import './LevelBadge.css'

export interface LevelBadgeProps {
  level: 1 | 2 | 3
  /** cỡ px, mặc định 96 */
  size?: number
  /** done = đã qua · current = đang học (phát sáng) · locked = chưa mở · default */
  state?: 'default' | 'done' | 'current' | 'locked'
  /** nhãn đọc màn hình; mặc định "Huy hiệu level N" */
  label?: string
  className?: string
}

export function LevelBadge({ level, size = 96, state = 'default', label, className }: LevelBadgeProps) {
  const dsText = useDsText()
  const gradientId = 'ds-lvl-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { src, onError, exhausted } = useImageFallback([`/art/badges/level-${level}-512.webp`])
  const accessibleLabel = label ?? dsText('levelBadgeAlt', { n: level })
  const classes = ['ds-level-badge', `ds-level-badge--${level}`, `is-${state}`, className].filter(Boolean).join(' ')
  const style = { width: size, height: size } as CSSProperties

  return (
    <span className={classes} style={style} role="img" aria-label={accessibleLabel}>
      {!exhausted && src ? (
        <img className="ds-level-badge__img" src={src} onError={onError} width={size} height={size} alt="" draggable={false} />
      ) : (
        <svg className="ds-level-badge__shield" viewBox="0 0 100 100" width={size} height={size} aria-hidden>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: 'var(--badge-light)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--badge-deep)' }} />
            </linearGradient>
          </defs>
          {/* khiên ngoài */}
          <path d="M50 4 88 17v29c0 25-16 42-38 51C28 88 12 71 12 46V17z" style={{ fill: `url(#${gradientId})` }} />
          {/* viền trong sáng */}
          <path d="M50 12 81 22.5v23.8c0 20.5-13 34.6-31 42.3-18-7.7-31-21.8-31-42.3V22.5z" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2.5" />
          {/* vệt bóng satin bên trái */}
          <path d="M22 26c0 14 2 26 9 36" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="4" strokeLinecap="round" />
          {/* ngôi sao vàng cầu vai */}
          <path d="m50 20 3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L50 37.4 43.2 41l1.3-7.6L39 28l7.6-1.1z" style={{ fill: 'var(--badge-star)' }} />
          <text x="50" y="74" textAnchor="middle" className="ds-level-badge__number">
            {level}
          </text>
        </svg>
      )}
      {state === 'locked' && (
        <span className="ds-level-badge__lock" aria-hidden>
          <Icon name="lock" size={Math.max(14, Math.round(size * 0.2))} strokeWidth={2.4} />
        </span>
      )}
      {state === 'done' && (
        <span className="ds-level-badge__done" aria-hidden>
          <Icon name="check" size={Math.max(14, Math.round(size * 0.2))} strokeWidth={3} />
        </span>
      )}
    </span>
  )
}
