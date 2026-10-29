/**
 * landing-routes.tsx — ĐƯỜNG DẪN CỦA KHU LANDING
 * ----------------------------------------------------------------------------
 *   "/"  -> LandingGate:
 *           - đang hỏi máy chủ "đã đăng nhập chưa?" -> nền trống (tránh nháy trang)
 *           - đã đăng nhập: bé (kid) -> /kids, người khác -> /learn
 *           - khách -> trang giới thiệu LandingPage
 *
 * App.tsx chỉ cần chèn {landingRoutes()} vào trong <Routes> (NGOÀI khối RequireLogin,
 * vì khách chưa đăng nhập cũng xem được).
 * ----------------------------------------------------------------------------
 */
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../../services/auth-context'
import { LandingPage } from './LandingPage'

export function LandingGate() {
  const { user, isCheckingLogin } = useAuth()
  if (isCheckingLogin) return <div className="ob-page" aria-busy="true" />
  if (user) return <Navigate to={user.ageGroup === 'kid' ? '/kids' : '/learn'} replace />
  return <LandingPage />
}

export const landingRoutes = () => <Route path="/" element={<LandingGate />} />
