/**
 * vocabulary-review-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA KHU ÔN TỪ VỰNG
 * ----------------------------------------------------------------------------
 *   /review   ôn thẻ FSRS ("Thời điểm vàng" + phiên ôn toàn màn hình)
 *   /words    sổ từ vựng (5 cấp độ nhớ, lọc, tìm, ôn ngay)
 *
 * App.tsx chỉ cần đặt {vocabularyReviewRoutes()} vào trong khối route có thanh menu.
 * Trang được tải lười (lazy) -> mở web không phải tải code của trang này.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const ReviewPage = lazy(() => import('./review-page/ReviewPage').then((module) => ({ default: module.ReviewPage })))
const WordsPage = lazy(() => import('./words-notebook/WordsPage').then((module) => ({ default: module.WordsPage })))

export const vocabularyReviewRoutes = () => (
  <>
    <Route path="/review" element={<ReviewPage />} />
    <Route path="/words" element={<WordsPage />} />
  </>
)
