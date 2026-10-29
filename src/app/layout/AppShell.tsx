/**
 * AppShell.tsx — KHUNG TRANG CHÍNH (người học đã đăng nhập)
 * ----------------------------------------------------------------------------
 *  ≥ 1280px : [sidebar trái 240px] [nội dung] [cột phải 340px]
 *  1024–1279: [sidebar] [nội dung + cột phải xếp xuống dưới]
 *  < 1024px : thanh trên gọn (logo + công tắc) · nội dung · THANH TAB DƯỚI
 *
 * Sidebar: logo đầu mascot + "IELTS Nhà Mình" · Học · Ôn tập · Luyện thi · Sân chơi
 * · Chat · Hồ sơ · dưới cùng: chuỗi ngày + level tài khoản, tài khoản, VI/EN, sáng/tối, tắt tiếng.
 *
 * Component này CHỈ VẼ (nhận dữ liệu qua props) để dùng được cả ở trang /design.
 * Bản nối dữ liệu thật (đăng nhập, chat, tiến độ) là AppShellRoute.tsx.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from '../../design-system/components/Icon'
import { LanguageToggle } from '../../design-system/components/LanguageToggle'
import { Mascot } from '../../design-system/components/Mascot'
import { SoundToggle } from '../../design-system/components/SoundToggle'
import { StreakFlame } from '../../design-system/components/StreakFlame'
import { ThemeToggle } from '../../design-system/components/ThemeToggle'
import { useDsText } from '../../design-system/design-system-text'
import { isNavItemActive, NAV_ITEMS, type NavItem } from './nav-items'
import { RightRailSlotContext } from './RightRail'
import './AppShell.css'

export interface AppShellAccount {
  id: string | number
  displayName: string
}

export interface AppShellProps {
  /** người đang đăng nhập (bỏ trống = ẩn khối tài khoản) */
  account?: AppShellAccount
  /** avatar hiển thị (VD <PlayerAvatar …/>) */
  avatar?: ReactNode
  /** số liệu nhỏ ở cuối sidebar */
  stats?: { streak?: number; studiedToday?: boolean; level?: number }
  /** số tin nhắn chưa đọc (hiện chấm đỏ cạnh mục Chat) */
  unreadChat?: number
  /** trạng thái lưu tiến độ */
  saveStatus?: 'saved' | 'saving' | 'error'
  onLogout?: () => void
  /** ép mục menu nào đang sáng (chỉ dùng cho trang xem trước /design/shell) */
  activePath?: string
  children: ReactNode
}

export function AppShell({ account, avatar, stats, unreadChat = 0, saveStatus, onLogout, activePath, children }: AppShellProps) {
  const dsText = useDsText()
  const location = useLocation()
  const currentPath = activePath ?? location.pathname
  // ô cột phải: lưu phần tử DOM vào state để <RightRail> biết chỗ mà "dịch chuyển" nội dung tới
  const [railElement, setRailElement] = useState<HTMLElement | null>(null)
  const items = NAV_ITEMS

  /** link thật của 1 mục (Hồ sơ cần id người dùng) */
  const hrefOf = (item: NavItem) => (item.id === 'profile' && account ? `/profile/${account.id}` : item.to)
  const badgeOf = (item: NavItem) => (item.id === 'chat' && unreadChat > 0 ? unreadChat : 0)

  return (
    <RightRailSlotContext.Provider value={railElement}>
      <div className="app-shell">
        {/* Người dùng bàn phím: phím Tab đầu tiên cho nhảy thẳng vào nội dung */}
        <a className="app-shell__skip" href="#main-content">
          {dsText('skipToContent')}
        </a>

        {/* ---------------- SIDEBAR (≥ 1024px) ---------------- */}
        <aside className="app-sidebar" aria-label={dsText('mainNavigation')}>
          <Link to="/" className="app-brand">
            <Mascot pose="salute" size={46} headOnly />
            <span className="app-brand__name">{dsText('brandName')}</span>
          </Link>

          <nav className="app-nav">
            <ul>
              {items.map((item) => {
                const active = isNavItemActive(item, currentPath)
                const badge = badgeOf(item)
                return (
                  <li key={item.id}>
                    <NavLink to={hrefOf(item)} className={active ? 'app-nav__link is-active' : 'app-nav__link'} aria-current={active ? 'page' : undefined}>
                      <span className="app-nav__icon">
                        <Icon name={item.icon} size={20} />
                      </span>
                      <span className="app-nav__label">{dsText(item.labelKey)}</span>
                      {badge > 0 && (
                        <span className="app-nav__badge" aria-label={dsText('unreadMessages', { n: badge })}>
                          {badge > 99 ? '99+' : badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="app-sidebar__bottom">
            {stats && <SidebarStats stats={stats} />}
            {account && <AccountMenu account={account} avatar={avatar} saveStatus={saveStatus} onLogout={onLogout} />}
            <div className="app-sidebar__toggles">
              <LanguageToggle />
              <ThemeToggle variant="compact" />
              <SoundToggle />
            </div>
          </div>
        </aside>

        {/* ---------------- THANH TRÊN GỌN (< 1024px) ---------------- */}
        <header className="app-topbar">
          <Link to="/" className="app-brand app-brand--compact">
            <Mascot pose="salute" size={36} headOnly />
            <span className="app-brand__name">{dsText('brandName')}</span>
          </Link>
          <div className="app-topbar__actions">
            {stats?.streak !== undefined && <StreakFlame count={stats.streak} active={stats.studiedToday ?? true} size="sm" />}
            <LanguageToggle variant="compact" />
            <ThemeToggle variant="compact" />
            <SoundToggle />
          </div>
        </header>

        {/* ---------------- NỘI DUNG + CỘT PHẢI ---------------- */}
        <main id="main-content" className="app-shell__main" tabIndex={-1}>
          {children}
        </main>
        <aside ref={setRailElement} className="app-shell__rail" aria-label={dsText('sideWidgets')} />

        {/* ---------------- THANH TAB DƯỚI (< 1024px) ---------------- */}
        <nav className="app-tabbar" aria-label={dsText('mainNavigation')}>
          {items.map((item) => {
            const active = isNavItemActive(item, currentPath)
            const badge = badgeOf(item)
            return (
              <NavLink key={item.id} to={hrefOf(item)} className={active ? 'app-tabbar__link is-active' : 'app-tabbar__link'} aria-current={active ? 'page' : undefined}>
                <span className="app-tabbar__icon">
                  <Icon name={item.icon} size={22} />
                  {badge > 0 && <span className="app-tabbar__dot" aria-label={dsText('unreadMessages', { n: badge })} />}
                </span>
                <span className="app-tabbar__label">{dsText(item.labelKey)}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </RightRailSlotContext.Provider>
  )
}

/** Hàng số liệu nhỏ: chuỗi ngày · cấp */
function SidebarStats({ stats }: { stats: NonNullable<AppShellProps['stats']> }) {
  const dsText = useDsText()
  return (
    <div className="app-stats">
      {stats.streak !== undefined && (
        <span className="app-stats__item" title={dsText('streakLabel', { n: stats.streak })}>
          <StreakFlame count={stats.streak} active={stats.studiedToday ?? true} size="sm" />
        </span>
      )}
      {stats.level !== undefined && (
        <span className="app-stats__item app-stats__item--level" title={dsText('levelLabel', { n: stats.level })}>
          Lv.{stats.level}
        </span>
      )}
    </div>
  )
}

/** Khối tài khoản: avatar + tên; bấm mở menu nhỏ (Hồ sơ · Đăng xuất) */
function AccountMenu({
  account,
  avatar,
  saveStatus,
  onLogout,
}: {
  account: AppShellAccount
  avatar?: ReactNode
  saveStatus?: AppShellProps['saveStatus']
  onLogout?: () => void
}) {
  const dsText = useDsText()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  // đóng menu khi chuyển trang / bấm ra ngoài / bấm Esc
  useEffect(() => setOpen(false), [location.pathname])
  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => !wrapperRef.current?.contains(event.target as Node) && setOpen(false)
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const saveText = saveStatus === 'saving' ? dsText('saveSaving') : saveStatus === 'error' ? dsText('saveError') : dsText('saveSaved')
  return (
    <div className="app-account" ref={wrapperRef}>
      <button type="button" className="app-account__button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((value) => !value)}>
        <span className="app-account__avatar">{avatar}</span>
        <span className="app-account__text">
          <span className="app-account__name">{account.displayName}</span>
          {saveStatus && <span className={`app-account__save is-${saveStatus}`}>{saveText}</span>}
        </span>
        <Icon name="chevron-down" size={16} className="app-account__chevron" />
      </button>
      {open && (
        <div className="app-account__menu" role="menu" aria-label={dsText('accountMenu')}>
          <Link role="menuitem" to={`/profile/${account.id}`}>
            <Icon name="profile" size={18} /> {dsText('myProfile')}
          </Link>
          {onLogout && (
            <button type="button" role="menuitem" onClick={onLogout}>
              <Icon name="exit" size={18} /> {dsText('logout')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
