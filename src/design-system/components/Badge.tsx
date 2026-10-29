/**
 * Badge.tsx — NHÃN TRẠNG THÁI NHỎ ("Mới", "Đã xong", "+10 XP", "Level 2"…)
 * ----------------------------------------------------------------------------
 *   <Badge tone="red" variant="solid">Mới</Badge>
 *   <Badge tone="success" icon="check">Đã xong</Badge>
 *   <Badge tone="gold" icon="star">+10 XP</Badge>
 *
 * Mỗi "tone" có cặp màu nền + chữ đã kiểm tra tương phản >= 4.5:1 ở cả 2 theme.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import './Badge.css'

export type BadgeTone = 'neutral' | 'primary' | 'navy' | 'olive' | 'red' | 'gold' | 'success' | 'oops'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  /** soft = nền nhạt (mặc định) · solid = nền đậm, nổi hơn */
  variant?: 'soft' | 'solid'
  /** icon bên trái: tên trong bộ Icon hoặc phần tử bất kỳ */
  icon?: IconName | ReactNode
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, tone = 'neutral', variant = 'soft', icon, size = 'md', className }: BadgeProps) {
  return (
    <span className={['ds-badge', `ds-badge--${tone}`, `ds-badge--${variant}`, `ds-badge--${size}`, className].filter(Boolean).join(' ')}>
      {icon && (typeof icon === 'string' ? <Icon name={icon as IconName} size={size === 'sm' ? 12 : 14} strokeWidth={2.5} /> : icon)}
      {children}
    </span>
  )
}
