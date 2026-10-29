/**
 * IconButton.tsx — NÚT TRÒN CHỈ CÓ ICON (đóng, tắt tiếng, cờ báo lỗi…)
 * ----------------------------------------------------------------------------
 *   <IconButton icon="close" label="Đóng" onClick={...} />
 *   <IconButton icon="flag" label="Báo lỗi câu hỏi" variant="soft" />
 *
 * `label` BẮT BUỘC: nút không có chữ thì trình đọc màn hình cần nhãn này,
 * và nó cũng hiện thành chú thích nhỏ khi rê chuột (title).
 * ----------------------------------------------------------------------------
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'
import './IconButton.css'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** tên icon trong bộ Icon, hoặc phần tử bất kỳ (emoji…) */
  icon: IconName | ReactNode
  /** nhãn đọc cho người khiếm thị + chú thích khi rê chuột */
  label: string
  /** soft = nền kem (mặc định) · ghost = trong suốt · primary = cam · plain = trên nền màu (khung phản hồi) */
  variant?: 'soft' | 'ghost' | 'primary' | 'plain'
  /** sm 36px · md 44px · lg 52px */
  size?: 'sm' | 'md' | 'lg'
  /** nút bật/tắt: true = đang bật (aria-pressed) */
  pressed?: boolean
}

export function IconButton({ icon, label, variant = 'soft', size = 'md', pressed, className, type = 'button', ...rest }: IconButtonProps) {
  const iconPx = size === 'sm' ? 18 : size === 'md' ? 20 : 24
  return (
    <button
      type={type}
      className={['ds-icon-btn', `ds-icon-btn--${variant}`, `ds-icon-btn--${size}`, className].filter(Boolean).join(' ')}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      {...rest}
    >
      {typeof icon === 'string' ? <Icon name={icon as IconName} size={iconPx} /> : icon}
    </button>
  )
}
