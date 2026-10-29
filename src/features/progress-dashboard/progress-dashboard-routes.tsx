/**
 * progress-dashboard-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA BẢNG TIẾN ĐỘ
 * ----------------------------------------------------------------------------
 *   /progress   bảng tiến độ "so với chính mình" (kỹ năng, band dạng khoảng, lịch học, dự kiến)
 * App.tsx đặt {progressDashboardRoutes()} trong khối route có thanh menu. Trang tải lười (lazy).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const ProgressPage = lazy(() => import('./ProgressPage').then((module) => ({ default: module.ProgressPage })))

export const progressDashboardRoutes = () => <Route path="/progress" element={<ProgressPage />} />
