/**
 * Button.tsx — NÚT BẤM "VINYL" (bóng satin, bo tròn kiểu viên kẹo)
 * ----------------------------------------------------------------------------
 *   <Button>Học tiếp</Button>                                  // nút chính (cam)
 *   <Button variant="secondary" size="sm">Bỏ qua</Button>
 *   <Button variant="ghost" iconLeft="hint">Gợi ý</Button>
 *   <Button to="/learn" size="lg" iconRight="arrow-right">Bắt đầu</Button>  // là link
 *
 * Kiểu dáng (spec mục 3): pill, gradient sáng trên -> đậm dưới, viền sáng 1px
 * ở mép trên như đồ chơi vinyl phản chiếu đèn, bóng màu cùng tông phía dưới.
 * Bấm: thu nhỏ 0.97 trong 80ms. KHÔNG dùng kiểu "đế dày" border-bottom.
 * ----------------------------------------------------------------------------
 */
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'navy'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonOwnProps {
  /** primary = cam (hành động chính) · secondary = kem · ghost = chỉ chữ · danger = đỏ · navy = xanh đậm */
  variant?: ButtonVariant
  /** sm 36px · md 44px · lg 56px (CTA chính) · xl 64px (khu trẻ em) */
  size?: ButtonSize
  /** icon bên trái chữ: tên trong bộ Icon hoặc 1 phần tử bất kỳ (VD emoji) */
  iconLeft?: IconName | ReactNode
  /** icon bên phải chữ */
  iconRight?: IconName | ReactNode
  /** đang xử lý -> hiện vòng xoay, khoá nút */
  loading?: boolean
  /** rộng hết khung chứa */
  fullWidth?: boolean
  /** có `to` -> thành link nội bộ (react-router) */
  to?: string
  /** có `href` -> thành link thường <a> */
  href?: string
  children?: ReactNode
}

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>

/** Icon có thể là tên (chuỗi) hoặc phần tử React. */
function renderIcon(icon: IconName | ReactNode, size: ButtonSize) {
  if (icon === undefined || icon === null || icon === false) return null
  const px = size === 'sm' ? 16 : size === 'md' ? 18 : 22
  return typeof icon === 'string' ? <Icon name={icon as IconName} size={px} /> : <span className="ds-btn__icon">{icon}</span>
}

export function buttonClassName({ variant = 'primary', size = 'md', fullWidth = false, extra }: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; extra?: string }) {
  return ['ds-btn', `ds-btn--${variant}`, `ds-btn--${size}`, fullWidth && 'ds-btn--full', extra].filter(Boolean).join(' ')
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading = false,
  fullWidth = false,
  to,
  href,
  target,
  rel,
  className,
  children,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = buttonClassName({ variant, size, fullWidth, extra: [loading && 'is-loading', className].filter(Boolean).join(' ') })
  const content = (
    <>
      {loading ? <span className="ds-btn__spinner" aria-hidden /> : renderIcon(iconLeft, size)}
      {children !== undefined && <span className="ds-btn__label">{children}</span>}
      {!loading && renderIcon(iconRight, size)}
    </>
  )

  // Link chỉ dùng khi không bị khoá (link "khoá" không có nghĩa -> dùng nút disabled)
  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={classes}
        aria-label={rest['aria-label']}
        // onClick khai báo cho <button>; link <a> nhận cùng kiểu sự kiện chuột
        onClick={rest.onClick as unknown as MouseEventHandler<HTMLAnchorElement>}
        target={target}
        rel={rel}
      >
        {content}
      </Link>
    )
  }
  if (href && !disabled) {
    return (
      <a href={href} className={classes} aria-label={rest['aria-label']} target={target} rel={rel ?? (target === '_blank' ? 'noreferrer' : undefined)}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {content}
    </button>
  )
}
