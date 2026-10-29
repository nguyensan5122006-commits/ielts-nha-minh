/**
 * PublicHeader.tsx — THANH ĐẦU TRANG CHO KHÁCH (landing, /start, kết quả, đăng nhập, đăng ký)
 * ----------------------------------------------------------------------------
 *   <PublicHeader />                                   // logo + VI/EN + sáng/tối
 *   <PublicHeader action={<Button …>Đăng nhập</Button>} />   // thêm 1 nút bên phải
 *
 * Khách chưa có sidebar (sidebar chỉ có khi đã đăng nhập), nên thanh này gọn:
 * logo đầu cún + tên web (bấm về "/"), công tắc ngôn ngữ, công tắc sáng/tối.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { LanguageToggle, Mascot, ThemeToggle, useDsText } from '../../design-system'
import './public-shell.css'

export interface PublicHeaderProps {
  /** nút thêm ở bên phải (VD "Đăng nhập") */
  action?: ReactNode
  /** nền trong suốt (đặt trên hero) */
  transparent?: boolean
}

export function PublicHeader({ action, transparent = false }: PublicHeaderProps) {
  const dsText = useDsText()
  // (QA) Thanh đầu trang dính trên cùng (sticky). Nếu luôn trong suốt thì khi cuộn, chữ của trang
  // chạy chồng lên logo. Nên chỉ trong suốt khi đang ở đỉnh trang; cuộn xuống thì hiện nền mờ.
  const [isAtTop, setIsAtTop] = useState(true)
  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setIsAtTop(window.scrollY < 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])
  return (
    <header className={['ob-header', transparent && isAtTop && 'ob-header--transparent'].filter(Boolean).join(' ')}>
      <Link to="/" className="ob-brand" aria-label={dsText('brandName')}>
        <Mascot pose="salute" size={40} />
        <span className="ob-brand__name">{dsText('brandName')}</span>
      </Link>
      <div className="ob-header__tools">
        <LanguageToggle variant="compact" />
        <ThemeToggle variant="compact" />
        {action}
      </div>
    </header>
  )
}
