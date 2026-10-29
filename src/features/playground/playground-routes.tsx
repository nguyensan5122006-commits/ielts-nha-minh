/**
 * playground-routes.tsx — ĐƯỜNG DẪN CỦA KHU "TRÒ CHƠI CHỮ" (/play)
 * ----------------------------------------------------------------------------
 * App.tsx gọi {playgroundRoutes()} bên trong khung có menu (AppShellRoute).
 * Khai báo ở đây:
 *   /play                    sảnh "Trò chơi chữ" (5 trò + bảng kỷ lục gia đình)
 *   /games/picture-word      Nhìn ảnh đoán từ      (src/features/word-games/)
 *   /games/missing-letters   Điền chữ còn thiếu    (src/features/word-games/)
 *   /profile                 (không có id, mục "Hồ sơ" trên menu) -> chuyển sang /profile/<id của mình>
 * 3 trò cũ (/daily-word, /games/spelling, /games/word-chain) vẫn khai báo trong App.tsx.
 * Trang được tải lười (lazy) -> chỉ tải code khi người dùng mở tới.
 * ----------------------------------------------------------------------------
 */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const PlaygroundPage = lazy(() => import('./PlaygroundPage').then((module) => ({ default: module.PlaygroundPage })))
const ProfilePage = lazy(() => import('../../pages/ProfilePage').then((module) => ({ default: module.ProfilePage })))
const PictureWordPage = lazy(() => import('../word-games/PictureWordPage').then((module) => ({ default: module.PictureWordPage })))
const MissingLettersPage = lazy(() => import('../word-games/MissingLettersPage').then((module) => ({ default: module.MissingLettersPage })))

/** Gọi như hàm (không phải component) để React Router đọc được các <Route> bên trong. */
export function playgroundRoutes() {
  return (
    <>
      <Route path="/play" element={<PlaygroundPage />} />
      <Route path="/games/picture-word" element={<PictureWordPage />} />
      <Route path="/games/missing-letters" element={<MissingLettersPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </>
  )
}
