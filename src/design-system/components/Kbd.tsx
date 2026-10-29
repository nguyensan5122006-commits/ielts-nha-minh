/**
 * Kbd.tsx — GỢI Ý PHÍM TẮT (phím bấm nhỏ như nút bàn phím)
 * ----------------------------------------------------------------------------
 *   <Kbd>Enter</Kbd>   <Kbd>1</Kbd>   <Kbd>Esc</Kbd>
 * Desktop-first: hiện cạnh đáp án (1–4) và nút chính (Enter) để người học
 * biết có thể dùng bàn phím. Màn nhỏ (< 1024px, thường là cảm ứng) tự ẩn.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import './Kbd.css'

export interface KbdProps {
  children: ReactNode
  /** trên nền tối/màu (VD trong nút cam) -> nền trong mờ */
  onColor?: boolean
  /** vẫn hiện trên màn nhỏ */
  alwaysVisible?: boolean
  className?: string
}

export function Kbd({ children, onColor = false, alwaysVisible = false, className }: KbdProps) {
  return <kbd className={['ds-kbd', onColor && 'ds-kbd--on-color', alwaysVisible && 'ds-kbd--always', className].filter(Boolean).join(' ')}>{children}</kbd>
}
