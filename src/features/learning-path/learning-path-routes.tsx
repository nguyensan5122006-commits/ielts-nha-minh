/**
 * learning-path-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA TRANG LỘ TRÌNH
 * ----------------------------------------------------------------------------
 *   ("/" do nhóm landing lo: khách -> landing; đã đăng nhập -> /learn)
 *   /english          (29/10) khu "Tiếng Anh tổng quát": lộ trình "Tuyến tuần tra"
 *                     (?level=level-2 để mở sẵn 1 level). Vào đây = track 'general'.
 *   /learn            đưa về trang chủ của track đang học: /english hoặc /ielts
 *                     (link cũ, nút "Dừng ở đây" sau bài học… vẫn về đúng khu)
 *   /roadmap          (link cũ) -> /learn
 *   /level/:levelId   (link cũ) -> lộ trình Tiếng Anh tổng quát mở sẵn level đó
 *
 * 2 khu học tách hẳn nhau (chủ nhà yêu cầu 29/10): Tiếng Anh tổng quát (/english, vui nhộn,
 * mascot, XP) và Luyện thi IELTS (/ielts — src/features/ielts-home, kế hoạch dạng bảng, màu xanh).
 * TrackEntry tự đổi track cho khớp khu đang mở.
 *
 * App.tsx chỉ cần đặt {learningPathRoutes()} vào trong khối route CÓ khung trang
 * (sidebar + cột phải). Trang được tải lười (lazy).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'
import { SmartLearnRedirect, TrackEntry } from '../ielts-home/TrackEntry'

const LearnPage = lazy(() => import('./LearnPage').then((module) => ({ default: module.LearnPage })))

const generalPath = (
  <TrackEntry track="general">
    <LearnPage />
  </TrackEntry>
)

export const learningPathRoutes = () => (
  <>
    <Route path="/english" element={generalPath} />
    <Route path="/learn" element={<SmartLearnRedirect />} />
    <Route path="/roadmap" element={<Navigate to="/learn" replace />} />
    <Route path="/level/:levelId" element={generalPath} />
  </>
)
