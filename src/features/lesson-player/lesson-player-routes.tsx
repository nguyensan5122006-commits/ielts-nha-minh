/**
 * lesson-player-routes.tsx — CÁC ĐƯỜNG DẪN (route) CỦA TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * App.tsx gắn 2 route này vào nhánh "toàn màn hình" (không sidebar), bên trong
 * <RequireLogin>:
 *     /lesson/:lessonId   -> LessonPlayerPage (trình học, có FocusLayout riêng)
 *     /dev/lessons        -> danh sách mọi bài + link nhảy tới câu bất kỳ (CHỈ khi npm run dev)
 * Trang tải lười (lazy) để gói JS trang chủ nhẹ.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { DEV_TOOLS_ENABLED } from './session/dev-flags'

const LessonPlayerPage = lazy(() => import('./LessonPlayerPage').then((module) => ({ default: module.LessonPlayerPage })))
const DevLessonIndexPage = lazy(() => import('./DevLessonIndexPage').then((module) => ({ default: module.DevLessonIndexPage })))

/** Dùng trong App.tsx:  {lessonPlayerRoutes()}  (đặt trong RequireLogin, NGOÀI layout có menu) */
export function lessonPlayerRoutes() {
  return [
    <Route key="lesson" path="/lesson/:lessonId" element={<LessonPlayerPage />} />,
    ...(DEV_TOOLS_ENABLED ? [<Route key="dev-lessons" path="/dev/lessons" element={<DevLessonIndexPage />} />] : []),
  ]
}
