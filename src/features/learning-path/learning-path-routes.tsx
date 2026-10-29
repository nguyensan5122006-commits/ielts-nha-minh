/**
 * learning-path-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA TRANG LỘ TRÌNH
 * ----------------------------------------------------------------------------
 *   ("/" do nhóm landing lo: khách -> landing; đã đăng nhập -> /learn)
 *   /learn            lộ trình "Tuyến tuần tra" (?level=level-2 để mở sẵn 1 level)
 *   /roadmap          (link cũ) -> lộ trình
 *   /level/:levelId   (link cũ) -> lộ trình mở sẵn level đó
 *
 * App.tsx chỉ cần đặt {learningPathRoutes()} vào trong khối route CÓ khung trang
 * (sidebar + cột phải). Trang được tải lười (lazy).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'

const LearnPage = lazy(() => import('./LearnPage').then((module) => ({ default: module.LearnPage })))

export const learningPathRoutes = () => (
  <>
    <Route path="/learn" element={<LearnPage />} />
    <Route path="/roadmap" element={<Navigate to="/learn" replace />} />
    <Route path="/level/:levelId" element={<LearnPage />} />
  </>
)
