/**
 * settings-routes.tsx — ĐƯỜNG DẪN TRANG CÀI ĐẶT (/settings)
 * ----------------------------------------------------------------------------
 * App.tsx gọi {settingsRoutes()} bên trong khung có menu (LayoutWithNavigation).
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const SettingsPage = lazy(() => import('./SettingsPage').then((module) => ({ default: module.SettingsPage })))

/** Gọi như hàm (không phải component) để React Router đọc được <Route> bên trong. */
export function settingsRoutes() {
  return <Route path="/settings" element={<SettingsPage />} />
}
