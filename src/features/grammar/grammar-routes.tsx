/**
 * grammar-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA KHU "NGỮ PHÁP"
 * ----------------------------------------------------------------------------
 *   /grammar            danh sách mọi điểm ngữ pháp, chia 3 trình độ (Level 1/2/3)
 *   /grammar/:topicId   1 điểm ngữ pháp: công thức, xem nhanh lý thuyết, các bài học (/lesson/:id)
 *
 * App.tsx chỉ cần đặt {grammarRoutes()} vào khối route có thanh menu (AppShellRoute).
 * Trang được tải lười (lazy) -> mở web không phải tải code của khu này.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const GrammarPage = lazy(() => import('./GrammarPage').then((module) => ({ default: module.GrammarPage })))
const GrammarTopicPage = lazy(() => import('./GrammarTopicPage').then((module) => ({ default: module.GrammarTopicPage })))

export const grammarRoutes = () => (
  <>
    <Route path="/grammar" element={<GrammarPage />} />
    <Route path="/grammar/:topicId" element={<GrammarTopicPage />} />
  </>
)
