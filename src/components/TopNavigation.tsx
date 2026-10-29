/**
 * TopNavigation.tsx — THANH MENU TRÊN CÙNG
 * Logo | Trang chủ | Học ▾ (Lộ trình, Học vui, Ôn tập, Sổ lỗi sai, Phòng thi) | Đấu trường |
 * Nhiệm vụ | Cửa hàng | Xếp hạng | Chat     ...     🔥 streak | 🍌 chuối | Lv | VI/EN | avatar ▾
 */
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { accountLevelFromXp } from '../game-economy/account-level'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { PlayerAvatar } from './PlayerIdentity'

export function TopNavigation() {
  const { t, language, toggleLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const { progress, visibleStreak, saveStatus } = useProgress()
  const { bananas, economy } = useWallet()
  const { unread, connected } = useRealtime()
  const location = useLocation()
  const [openMenu, setOpenMenu] = useState<'learn' | 'account' | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // đóng menu thả khi chuyển trang hoặc bấm ra ngoài
  useEffect(() => setOpenMenu(null), [location.pathname])
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const learnLinks = [
    { to: '/roadmap', label: `🗺️ ${t('navRoadmap')}` },
    { to: '/fun', label: `🌈 ${t('funTitle')}` },
    { to: '/review', label: `🔁 ${t('navReview')}` },
    { to: '/mistakes', label: `📕 ${t('navMistakes')}` },
    { to: '/exams', label: `📝 ${t('navExams')}` },
  ]
  const learnActive = learnLinks.some((link) => location.pathname.startsWith(link.to)) || /^\/(level|lesson)/.test(location.pathname)
  const totalUnread = Object.values(unread).reduce((sum, n) => sum + n, 0)
  const level = accountLevelFromXp(progress.xpTotal)
  const saveLabel = saveStatus === 'saving' ? t('saveSaving') : saveStatus === 'error' ? t('saveError') : t('saveSaved')

  return (
    <header className="top-navigation" ref={navRef}>
      <div className="top-navigation__inner">
        <Link to="/" className="brand">
          <span className="brand__logo">6.5</span>
          <span className="brand__name">{t('appName')}</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            {t('navHome')}
          </NavLink>
          <div className="nav-dropdown">
            <button type="button" className={`nav-dropdown__toggle ${learnActive ? 'active' : ''}`} onClick={() => setOpenMenu(openMenu === 'learn' ? null : 'learn')}>
              {t('navLearn')} ▾
            </button>
            {openMenu === 'learn' && (
              <div className="nav-dropdown__menu">
                {learnLinks.map((link) => (
                  <NavLink key={link.to} to={link.to}>
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/arena">{t('navArena')}</NavLink>
          <NavLink to="/quests">{t('navQuests')}</NavLink>
          <NavLink to="/shop">{t('navShop')}</NavLink>
          <NavLink to="/leaderboard">{t('navLeaderboard')}</NavLink>
          <NavLink to="/chat" className="nav-chat">
            {t('navChat')}
            {totalUnread > 0 && <span className="unread-badge">{totalUnread}</span>}
          </NavLink>
        </nav>
        <div className="nav-status">
          <span className="nav-status__streak" title={t('streakTooltip')}>
            🔥 {visibleStreak}
          </span>
          <Link to="/shop" className="nav-status__bananas" title={t('bananas')}>
            🍌 {bananas}
          </Link>
          <span className="badge badge--primary" title={`${level.xpIntoLevel}/${level.xpNeeded} XP`}>
            Lv.{level.level}
          </span>
          <span className={`small ${saveStatus === 'error' ? '' : 'muted'}`} style={saveStatus === 'error' ? { color: 'var(--color-error)' } : undefined} title={saveLabel}>
            {saveStatus === 'saving' ? '⟳' : saveStatus === 'error' ? '⚠' : '✓'}
          </span>
          <button type="button" className="language-toggle" onClick={toggleLanguage} title="Tiếng Việt / English">
            {language === 'vi' ? 'VI' : 'EN'}
          </button>
          <div className="nav-dropdown">
            <button type="button" className="avatar-button" onClick={() => setOpenMenu(openMenu === 'account' ? null : 'account')} title={user?.displayName}>
              <PlayerAvatar avatarItemId={economy?.equipped.avatar} frameItemId={economy?.equipped.frame} size={34} online={connected} />
            </button>
            {openMenu === 'account' && (
              <div className="nav-dropdown__menu nav-dropdown__menu--right">
                <div className="small muted" style={{ padding: '6px 12px' }}>
                  {user?.displayName}
                </div>
                <NavLink to={`/profile/${user?.id}`}>👤 {t('myProfile')}</NavLink>
                <NavLink to="/shop">🎨 {t('customize')}</NavLink>
                <button type="button" onClick={logout}>
                  🚪 {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
