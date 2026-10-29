/**
 * PlayPageHeader.tsx — ĐẦU TRANG CHUNG CỦA CÁC TRANG TRONG SÂN CHƠI
 * ----------------------------------------------------------------------------
 *   <PlayPageHeader
 *     art="trophy"                          // ảnh 3D lớn bên trái (slug Fluent Emoji)
 *     title="Giải đấu tuần"
 *     intro="1 chủ đề mỗi tuần…"
 *     back                                  // hiện nút "← Sân chơi" (về /play)
 *     actions={<BananaPill amount={120} />} // bên phải: số chuối, nút phụ…
 *   />
 * Mọi trang con (đấu trường, cửa hàng, sự kiện…) dùng cùng 1 đầu trang -> người dùng
 * luôn biết mình đang ở đâu và đường quay về Sân chơi (không ngõ cụt).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../../design-system'
import { usePlayText } from '../playground-text'
import { GameArt, type ArtPlate } from './GameArt'

export interface PlayPageHeaderProps {
  /** slug ảnh 3D (public/word-images) */
  art?: string
  /** màu đĩa sau ảnh */
  artPlate?: ArtPlate
  title: ReactNode
  intro?: ReactNode
  /** true = về /play; hoặc { to, label } để về chỗ khác (VD "← Học vui") */
  back?: boolean | { to: string; label: string }
  /** phần bên phải (số chuối, nút) */
  actions?: ReactNode
  className?: string
}

export function PlayPageHeader({ art, artPlate = 'primary', title, intro, back, actions, className }: PlayPageHeaderProps) {
  const playText = usePlayText()
  const backLink = back === true ? { to: '/play', label: playText('backToPlay') } : back || null

  return (
    <header className={['pg-header', className].filter(Boolean).join(' ')}>
      {backLink && (
        <Link to={backLink.to} className="pg-back">
          <span className="pg-back__arrow" aria-hidden>
            <Icon name="arrow-right" size={16} />
          </span>
          {backLink.label}
        </Link>
      )}
      <div className="pg-header__row">
        {art && <GameArt slug={art} size={64} plate={artPlate} tilt={-6} className="pg-header__art" />}
        <div className="pg-header__text">
          <h1 className="pg-header__title">{title}</h1>
          {intro && <p className="pg-header__intro">{intro}</p>}
        </div>
        {actions && <div className="pg-header__actions">{actions}</div>}
      </div>
    </header>
  )
}
