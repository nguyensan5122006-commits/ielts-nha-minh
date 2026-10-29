/**
 * auth-routes.tsx — ĐƯỜNG DẪN ĐĂNG NHẬP / ĐĂNG KÝ
 * ----------------------------------------------------------------------------
 *   /login    LoginPage (giao diện mới, cùng API useAuth().login) — thay src/pages/LoginPage.tsx cũ
 *   /signup   SignupPage — tạo tài khoản trực tiếp (nhận kết quả xếp lớp nếu máy này có)
 *
 * /login tải ngay (RequireLogin chuyển khách về đây); /signup tải khi mở tới.
 * App.tsx chèn {authRoutes()} vào <Routes>, NGOÀI khối RequireLogin.
 * ----------------------------------------------------------------------------
 */
import { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { LoginPage } from './LoginPage'

const SignupPage = lazy(() => import('./SignupPage').then((module) => ({ default: module.SignupPage })))

export const authRoutes = () => (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/signup"
      element={
        <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--c-bg)' }} aria-busy="true" />}>
          <SignupPage />
        </Suspense>
      }
    />
  </>
)
