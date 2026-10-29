/**
 * Tooltip.tsx — CHÚ THÍCH NHỎ KHI RÊ CHUỘT / DÙNG PHÍM TAB TỚI
 * ----------------------------------------------------------------------------
 *   <Tooltip text="Chuỗi ngày học liên tục">
 *     <button>🔥 12</button>
 *   </Tooltip>
 *
 * - Hiện sau 300ms rê chuột (không bật lung tung khi lướt qua), hiện ngay khi focus.
 * - Esc để ẩn. Phần tử con được gắn aria-describedby -> trình đọc màn hình đọc kèm.
 * - Con phải là 1 phần tử nhận được focus (button, a…) để người dùng bàn phím thấy.
 * ----------------------------------------------------------------------------
 */
import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react'
import './Tooltip.css'

export interface TooltipProps {
  /** nội dung chú thích (ngắn, 1 dòng) */
  text: ReactNode
  /** vị trí so với phần tử: trên (mặc định) / dưới / trái / phải */
  side?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactElement<{ 'aria-describedby'?: string }>
}

export function Tooltip({ text, side = 'top', children }: TooltipProps) {
  const tooltipId = useId()
  const [visible, setVisible] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const show = (delay: number) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    setVisible(false)
  }

  useEffect(() => {
    if (!visible) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && hide()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [visible])
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const trigger = isValidElement(children) ? cloneElement(children, { 'aria-describedby': visible ? tooltipId : undefined }) : children

  return (
    <span className="ds-tooltip-anchor" onMouseEnter={() => show(300)} onMouseLeave={hide} onFocus={() => show(0)} onBlur={hide}>
      {trigger}
      {visible && (
        <span id={tooltipId} role="tooltip" className={`ds-tooltip ds-tooltip--${side}`}>
          {text}
        </span>
      )}
    </span>
  )
}
