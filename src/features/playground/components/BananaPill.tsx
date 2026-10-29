/**
 * BananaPill.tsx — VIÊN HIỂN THỊ SỐ CHUỐI (🍌 ảnh 3D + con số)
 * ----------------------------------------------------------------------------
 *   <BananaPill amount={bananas} />                 // chỉ hiển thị
 *   <BananaPill amount={bananas} to="/shop" />      // bấm để vào cửa hàng
 *   <BananaPill amount={-10} signed />              // "+10" / "−10" (kết quả trận)
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import { usePlayText } from '../playground-text'
import { GameArt } from './GameArt'

export interface BananaPillProps {
  amount: number
  /** có -> cả viên là link */
  to?: string
  /** hiện dấu +/− (dùng cho số chuối thắng/thua) */
  signed?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BananaPill({ amount, to, signed = false, size = 'md', className }: BananaPillProps) {
  const playText = usePlayText()
  const artSize = size === 'lg' ? 34 : size === 'sm' ? 18 : 24
  const tone = signed ? (amount > 0 ? 'is-gain' : amount < 0 ? 'is-loss' : '') : ''
  const text = signed ? `${amount > 0 ? '+' : amount < 0 ? '−' : ''}${Math.abs(amount)}` : amount.toLocaleString('vi-VN')
  const classes = ['pg-banana', `pg-banana--${size}`, tone, to && 'is-link', className].filter(Boolean).join(' ')
  const content = (
    <>
      <GameArt slug="banana" size={artSize} />
      <span className="pg-banana__value ds-num" aria-hidden>
        {text}
      </span>
      <span className="ds-visually-hidden">{signed ? text : playText('bananaCount', { n: amount })}</span>
    </>
  )
  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  )
}
