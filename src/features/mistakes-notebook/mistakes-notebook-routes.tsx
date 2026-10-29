/**
 * mistakes-notebook-routes.tsx — KHAI BÁO ĐƯỜNG DẪN CỦA SỔ CÂU SAI
 * ----------------------------------------------------------------------------
 *   /mistakes              sổ câu sai (nhóm theo kỹ năng + dạng câu)
 *   /mistakes?practice=1   mở thẳng lượt "Ôn lại câu sai"
 * App.tsx đặt {mistakesNotebookRoutes()} trong khối route có thanh menu. Trang tải lười (lazy).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const MistakesPage = lazy(() => import('./MistakesPage').then((module) => ({ default: module.MistakesPage })))

export const mistakesNotebookRoutes = () => <Route path="/mistakes" element={<MistakesPage />} />
