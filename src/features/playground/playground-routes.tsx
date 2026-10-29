/**
 * playground-routes.tsx — ĐƯỜNG DẪN CỦA KHU "SÂN CHƠI GIA ĐÌNH"
 * ----------------------------------------------------------------------------
 * App.tsx gọi {playgroundRoutes()} bên trong khung có menu (AppShellRoute).
 * Khai báo ở đây:
 *   /play     trang sảnh Sân chơi (mới)
 *   /profile  (không có id, mục "Hồ sơ" trên menu) -> chuyển sang /profile/<id của mình>
 * Các trang trò chơi chữ (/daily-word, /games/spelling, /games/word-chain) khai báo trong App.tsx.
 * Trang được tải lười (lazy) -> chỉ tải code khi người dùng mở tới.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const PlaygroundPage = lazy(() => import('./PlaygroundPage').then((module) => ({ default: module.PlaygroundPage })))
const ProfilePage = lazy(() => import('../../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })))

/** Gọi như hàm (không phải component) để React Router đọc được các <Route> bên trong. */
export function playgroundRoutes() {
  return (
    <>
      <Route path="/play" element={<PlaygroundPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </>
  )
}
