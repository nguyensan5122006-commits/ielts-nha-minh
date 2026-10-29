/**
 * exam-room-routes.tsx — CÁC ĐƯỜNG DẪN (route) CỦA PHÒNG THI + MINI-TEST
 * ----------------------------------------------------------------------------
 * App.tsx gắn 2 nhóm:
 *   {examRoomShellRoutes()}  — trong khung có menu (AppShellRoute):
 *       /exams                      danh sách đề + lịch sử thi
 *       /exam-result/:resultId      kết quả 1 lần thi ('local' = kết quả tạm trong máy)
 *   {examRoomFocusRoutes()}  — toàn màn hình (không menu), trong RequireLogin:
 *       /exam/:examId               phòng thi kiểu máy thi IELTS
 *       /exam-result/:resultId/review  xem lại từng câu kèm bằng chứng trong bài
 *       /lesson/:lessonId/mini-test mini-test có tim cuối bài (bài không có mini-test -> quay về bài học)
 * Mọi trang tải lười (lazy) -> mở web không phải tải đề thi.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const ExamListPage = lazy(() => import('./exam-list/ExamListPage').then((module) => ({ default: module.ExamListPage })))
const ExamResultPage = lazy(() => import('./exam-result/ExamResultPage').then((module) => ({ default: module.ExamResultPage })))
const ExamRunnerPage = lazy(() => import('./exam-runner/ExamRunnerPage').then((module) => ({ default: module.ExamRunnerPage })))
const ExamReviewPage = lazy(() => import('./exam-result/ExamReviewPage').then((module) => ({ default: module.ExamReviewPage })))
const MiniTestPage = lazy(() => import('./mini-test/MiniTestPage').then((module) => ({ default: module.MiniTestPage })))

/** Đặt trong <Route element={<AppShellRoute />}> */
export const examRoomShellRoutes = () => (
  <>
    <Route path="/exams" element={<ExamListPage />} />
    <Route path="/exam-result/:resultId" element={<ExamResultPage />} />
  </>
)

/** Đặt trong <RequireLogin>, NGOÀI khung có menu */
export const examRoomFocusRoutes = () => (
  <>
    <Route path="/exam/:examId" element={<ExamRunnerPage />} />
    <Route path="/exam-result/:resultId/review" element={<ExamReviewPage />} />
    <Route path="/lesson/:lessonId/mini-test" element={<MiniTestPage />} />
  </>
)
