/**
 * skill-reading-routes.tsx — ĐƯỜNG DẪN CỦA NHÓM NGHE + ĐỌC (skill-listening-reading)
 * ----------------------------------------------------------------------------
 *   /listening/:lessonId   luyện riêng phần Nghe của 1 bài (toàn màn hình)
 *   /reading/:lessonId     luyện riêng phần Đọc của 1 bài (toàn màn hình)
 *
 * Trong bài học bình thường, trình Nghe/Đọc do trình học (/lesson/:id) mở qua
 * skill-task-registry — không cần route riêng. 2 route này để luyện lại + kiểm thử.
 * App.tsx đặt {listeningReadingRoutes()} trong khối route toàn màn hình (cần đăng nhập).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const ListeningReadingTaskPage = lazy(() => import('./ListeningReadingTaskPage'))

export const listeningReadingRoutes = () => [
  <Route key="listening-task" path="/listening/:lessonId" element={<ListeningReadingTaskPage />} />,
  <Route key="reading-task" path="/reading/:lessonId" element={<ListeningReadingTaskPage />} />,
]
