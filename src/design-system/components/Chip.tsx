/**
 * Chip.tsx — VIÊN CHỌN NHỎ (lọc, chọn chủ đề, chọn đáp án dạng từ)
 * ----------------------------------------------------------------------------
 *   <Chip selected={topic === 'food'} onClick={() => setTopic('food')} icon="🍜">Food</Chip>
 *   <Chip color="var(--skill-listening)">Listening</Chip>   // chỉ hiển thị, không bấm
 *
 * Có onClick -> là nút bật/tắt (aria-pressed) dùng được bằng bàn phím.
 * Không có onClick -> chỉ là nhãn tĩnh (span).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, ReactNode } from 'react'
import './Chip.css'

export interface ChipProps {
  children: ReactNode
  /** đang được chọn */
  selected?: boolean
  onClick?: () => void
  /** icon/emoji bên trái */
  icon?: ReactNode
  /** màu nhấn khi được chọn (mặc định cam). VD 'var(--skill-reading)' */
  color?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  className?: string
}

export function Chip({ children, selected = false, onClick, icon, color, size = 'md', disabled, className }: ChipProps) {
  const classes = ['ds-chip', `ds-chip--${size}`, selected && 'is-selected', onClick && 'is-clickable', className].filter(Boolean).join(' ')
  const style = color ? ({ '--chip-color': color } as CSSProperties) : undefined
  const content = (
    <>
      {icon && <span className="ds-chip__icon">{icon}</span>}
      <span>{children}</span>
    </>
  )
  if (onClick) {
    return (
      <button type="button" className={classes} style={style} aria-pressed={selected} onClick={onClick} disabled={disabled}>
        {content}
      </button>
    )
  }
  return (
    <span className={classes} style={style}>
      {content}
    </span>
  )
}
