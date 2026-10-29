/**
 * kids-routes.tsx — CÁC ĐƯỜNG DẪN CỦA KHU TRẺ EM
 * ----------------------------------------------------------------------------
 * App.tsx chỉ cần gọi 2 hàm này bên trong <Routes>:
 *   {kidsRoutes()}         -> trong vùng ĐÃ ĐĂNG NHẬP (toàn màn hình, không thanh menu người lớn)
 *   {kidsPreviewRoutes()}  -> ngoài vùng đăng nhập; CHỈ có khi "npm run dev" (bản build thật trả null)
 *
 *   /kids                     sảnh
 *   /kids/play/:gameId        1 lượt chơi (?topic=animals để chọn chủ đề)
 *   /kids/album               sổ sticker
 *   /kids/wardrobe            tủ đồ của Ki
 *   /kids/learn               -> chuyển sang lộ trình /learn
 *   /kids-preview/...         giống hệt nhưng dữ liệu giả (?scenario=default|fresh|tired|outfit)
 *
 * Các trang được tải lười (lazy) -> người lớn không phải tải code khu trẻ em.
 * ----------------------------------------------------------------------------
 */
import { lazy, Suspense } from 'react'
import { Navigate, Route } from 'react-router-dom'

const KidsZoneLayout = lazy(() => import('./KidsZoneLayout').then((m) => ({ default: m.KidsZoneLayout })))
const KidsHubPage = lazy(() => import('./hub/KidsHubPage').then((m) => ({ default: m.KidsHubPage })))
const KidsPlayPage = lazy(() => import('./KidsPlayPage').then((m) => ({ default: m.KidsPlayPage })))
const StickerAlbumPage = lazy(() => import('./album/StickerAlbumPage').then((m) => ({ default: m.StickerAlbumPage })))
const WardrobePage = lazy(() => import('./wardrobe/WardrobePage').then((m) => ({ default: m.WardrobePage })))

/** Các trang con dùng chung cho /kids và /kids-preview */
function kidsChildRoutes() {
  return (
    <>
      <Route index element={<KidsHubPage />} />
      <Route path="play/:gameId" element={<KidsPlayPage />} />
      <Route path="album" element={<StickerAlbumPage />} />
      <Route path="wardrobe" element={<WardrobePage />} />
      <Route path="learn" element={<Navigate to="/learn" replace />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </>
  )
}

/** Khu trẻ em thật — đặt bên trong vùng đã đăng nhập của App.tsx. */
export function kidsRoutes() {
  return (
    <Route path="/kids" element={<KidsZoneLayout mode="live" />}>
      {kidsChildRoutes()}
    </Route>
  )
}

/** Trang xem thử với dữ liệu giả — chỉ khi phát triển (npm run dev). */
export function kidsPreviewRoutes() {
  if (!import.meta.env.DEV) return null
  return (
    <Route
      path="/kids-preview"
      element={
        <Suspense fallback={null}>
          <KidsZoneLayout mode="preview" />
        </Suspense>
      }
    >
      {kidsChildRoutes()}
    </Route>
  )
}
