/**
 * skill-writing-routes.tsx — ĐƯỜNG DẪN CỦA NHÓM WRITING + SPEAKING
 * ----------------------------------------------------------------------------
 *   /skill-task/:lessonId   luyện riêng phần Viết hoặc Nói của 1 bài (toàn màn hình, SkillTaskPage)
 *
 * Trong bài học bình thường, trình Writing/Speaking do trình học (/lesson/:id) mở qua
 * skill-task-registry — không cần route riêng. Route này để luyện lại đề + kiểm thử.
 * App.tsx đặt {skillTaskRoutes()} trong khối route toàn màn hình (cần đăng nhập).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const SkillTaskPage = lazy(() => import('./SkillTaskPage'))

export const skillTaskRoutes = () => <Route path="/skill-task/:lessonId" element={<SkillTaskPage />} />
