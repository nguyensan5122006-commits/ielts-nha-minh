/**
 * AppShellRoute.tsx — KHUNG TRANG CHÍNH ĐÃ NỐI DỮ LIỆU THẬT (dùng trong App.tsx)
 * ----------------------------------------------------------------------------
 * Lấy dữ liệu từ các "kho" chung (đăng nhập, tiến độ, thành viên gia đình, realtime) rồi
 * đưa vào <AppShell> (chỉ vẽ). Các trang con hiện ở vị trí <Outlet />.
 *
 * Trong App.tsx:
 *   <Route element={<RequireLogin />}>
 *     <Route element={<AppShellRoute />}>
 *       <Route path="/learn" element={<LearnPage />} /> ...
 * Phải nằm BÊN TRONG RequireLogin (cần RealtimeProvider + đã đăng nhập).
 * ----------------------------------------------------------------------------
 */
import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { PlayerAvatar } from '../../components/PlayerIdentity'
import { accountLevelFromXp } from '../../gamification/account-level'
import { gamificationVisibleAt } from '../../gamification/gamification-scope'
import { useFamily } from '../../family-members/family-store'
import { useProgress } from '../../learning-progress/progress-store'
import { useRealtime } from '../../realtime/realtime-store'
import { useAuth } from '../../services/auth-context'
import { Skeleton } from '../../design-system/components/Skeleton'
import { AppShell } from './AppShell'

/** Chỗ chờ khi trang con đang tải (giữ nguyên khung, chỉ nội dung nhấp nháy) */
function PageLoading() {
  return (
    <div style={{ maxWidth: 720, display: 'grid', gap: 16 }}>
      <Skeleton variant="rect" height={44} width="45%" />
      <Skeleton variant="text" lines={3} />
      <Skeleton variant="rect" height={180} />
    </div>
  )
}

export function AppShellRoute() {
  const { user, logout } = useAuth()
  const { progress, visibleStreak, streak, saveStatus } = useProgress()
  const { memberById } = useFamily()
  const { unread, connected } = useRealtime()

  const { pathname } = useLocation()

  const totalUnread = Object.values(unread).reduce((sum, count) => sum + count, 0)
  // "Lv.N" (level tài khoản, tính từ XP) chỉ hiện ở track general / Sân chơi, không hiện trong phòng thi —
  // track IELTS chỉ thấy chuỗi ngày (src/gamification/gamification-scope.ts)
  const showLevel = gamificationVisibleAt(progress.profile.track, pathname)
  const level = showLevel ? accountLevelFromXp(progress.xpTotal).level : undefined

  return (
    <AppShell
      account={user ? { id: user.id, displayName: user.displayName } : undefined}
      avatar={<PlayerAvatar avatarItemId={user ? memberById(user.id)?.avatar : undefined} size={38} online={connected} />}
      stats={{ streak: visibleStreak, studiedToday: streak?.studiedToday, level }}
      unreadChat={totalUnread}
      saveStatus={saveStatus}
      onLogout={logout}
    >
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </AppShell>
  )
}
