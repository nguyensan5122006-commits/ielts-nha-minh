/**
 * Card.tsx — THẺ (khung chứa nội dung) + CardHeader (đầu thẻ)
 * ----------------------------------------------------------------------------
 *   <Card>
 *     <CardHeader icon={<SkillIcon skill="reading" size={40} />} title="Đọc hiểu" subtitle="3/6 bài" />
 *     ...nội dung...
 *   </Card>
 *
 *   <Card variant="feature" to="/lesson/abc">  // thẻ CTA "Học tiếp": nền cam, bấm được
 *     <Mascot pose="thumbs-up" placement="corner" size={120} />
 *     ...
 *   </Card>
 *
 * Biến thể:
 *   default = nền trắng, viền mảnh, bóng mềm 2 lớp (spec mục 3)
 *   soft    = nền kem, không bóng (khối phụ bên trong trang)
 *   feature = gradient cam, chữ navy, để ảnh mascot tràn ra ngoài mép
 *   outline = chỉ viền (ô trống, "thêm mới")
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'soft' | 'feature' | 'outline'
  /** khoảng đệm trong: none 0 · sm 16px · md 24px (mặc định) · lg 32px */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** rê chuột thì nổi lên (thẻ bấm được). Tự bật khi có `to` */
  interactive?: boolean
  /** có `to` -> cả thẻ là 1 link nội bộ */
  to?: string
  /** màu nhấn: 1 vạch màu mềm ở mép trái (VD màu kỹ năng 'var(--skill-reading)') */
  accentColor?: string
  /** thẻ HTML dùng để bọc (mặc định div) — chọn section/article/li cho đúng ngữ nghĩa */
  as?: 'div' | 'section' | 'article' | 'li' | 'aside'
  children?: ReactNode
}

export function Card({ variant = 'default', padding = 'md', interactive, to, accentColor, as = 'div', className, style, children, ...rest }: CardProps) {
  const classes = [
    'ds-card',
    `ds-card--${variant}`,
    `ds-card--pad-${padding}`,
    (interactive || to) && 'ds-card--interactive',
    accentColor && 'ds-card--accent',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const mergedStyle = accentColor ? ({ ...style, '--card-accent': accentColor } as CSSProperties) : style

  if (to) {
    return (
      <Link to={to} className={classes} style={mergedStyle} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }
  const Tag = as
  return (
    <Tag className={classes} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
}

export interface CardHeaderProps {
  /** icon/ảnh bên trái (SkillIcon, emoji, Icon…) */
  icon?: ReactNode
  /** dòng chữ nhỏ in hoa phía trên tiêu đề */
  eyebrow?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  /** nút/link bên phải (VD "Xem tất cả") */
  action?: ReactNode
  /** cấp thẻ tiêu đề cho đúng cấu trúc trang (mặc định h3) */
  level?: 2 | 3 | 4
}

export function CardHeader({ icon, eyebrow, title, subtitle, action, level = 3 }: CardHeaderProps) {
  const Heading = `h${level}` as 'h2' | 'h3' | 'h4'
  return (
    <div className="ds-card-header">
      {icon && <div className="ds-card-header__icon">{icon}</div>}
      <div className="ds-card-header__text">
        {eyebrow && <div className="ds-eyebrow">{eyebrow}</div>}
        <Heading className="ds-card-header__title">{title}</Heading>
        {subtitle && <div className="ds-card-header__subtitle">{subtitle}</div>}
      </div>
      {action && <div className="ds-card-header__action">{action}</div>}
    </div>
  )
}
