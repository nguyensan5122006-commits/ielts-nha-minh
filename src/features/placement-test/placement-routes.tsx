/**
 * placement-routes.tsx — ĐƯỜNG DẪN CỦA BÀI XẾP LỚP (khách làm được, không cần đăng nhập)
 * ----------------------------------------------------------------------------
 *   /start          chọn mục tiêu -> bài xếp lớp thích ứng (tự lưu, tải lại làm tiếp)
 *   /start/result   kết quả + lộ trình + form tạo tài khoản ngay trên trang
 *
 * 2 trang chỉ tải khi mở tới (lazy) -> trang landing mở nhanh hơn.
 * App.tsx chèn {placementRoutes()} vào <Routes>, NGOÀI khối RequireLogin.
 * ----------------------------------------------------------------------------
 */
import { lazy, Suspense, type ReactNode } from 'react'
import { Route } from 'react-router-dom'

const StartPage = lazy(() => import('./StartPage').then((module) => ({ default: module.StartPage })))
const ResultPage = lazy(() => import('./ResultPage').then((module) => ({ default: module.ResultPage })))

/** Trong lúc tải code của trang: nền kem trống (không nháy vòng xoay cho 1 khoảnh khắc ngắn). */
function Loading({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--c-bg)' }} aria-busy="true" />}>{children}</Suspense>
}

export const placementRoutes = () => (
  <>
    <Route
      path="/start"
      element={
        <Loading>
          <StartPage />
        </Loading>
      }
    />
    <Route
      path="/start/result"
      element={
        <Loading>
          <ResultPage />
        </Loading>
      }
    />
  </>
)
