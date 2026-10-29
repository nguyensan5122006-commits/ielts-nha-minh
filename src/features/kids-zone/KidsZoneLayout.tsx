/**
 * KidsZoneLayout.tsx — KHUNG BỌC MỌI TRANG KHU TRẺ EM
 * ----------------------------------------------------------------------------
 * Đặt "ổ cắm dữ liệu" + bộ đếm giờ chơi ở MỘT chỗ cho cả khu:
 *   mode="live"    -> dữ liệu thật của bé đăng nhập          (/kids/...)
 *   mode="preview" -> dữ liệu giả, chỉ khi "npm run dev"       (/kids-preview/...?scenario=...)
 * Bộ đếm giờ (PlayTimeProvider) nằm ở đây nên chuyển qua lại sảnh <-> trò chơi
 * vẫn đếm liên tục.
 * ----------------------------------------------------------------------------
 */
import { Suspense, useState, type ReactNode } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import { SkyWorld } from './game-engine/components/SkyWorld'
import { PlayTimeProvider } from './game-engine/play-time'
import { LiveKidsDataProvider, PreviewKidsDataProvider } from './kids-data/kids-data-context'
import { parseMockScenario } from './kids-data/mock-kid-progress'

function KidsLoading() {
  return (
    <SkyWorld>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
        <span className="spinner" />
      </div>
    </SkyWorld>
  )
}

export function KidsZoneLayout({ mode }: { mode: 'live' | 'preview' }) {
  const content = (
    <PlayTimeProvider>
      <Suspense fallback={<KidsLoading />}>
        <Outlet />
      </Suspense>
    </PlayTimeProvider>
  )
  return mode === 'preview' ? <PreviewData>{content}</PreviewData> : <LiveKidsDataProvider>{content}</LiveKidsDataProvider>
}

/** Xem thử: đọc ?scenario=default|fresh|tired|outfit 1 lần khi mở. */
function PreviewData({ children }: { children: ReactNode }) {
  const [searchParams] = useSearchParams()
  const [scenario] = useState(() => parseMockScenario(searchParams.get('scenario')))
  return <PreviewKidsDataProvider scenario={scenario}>{children}</PreviewKidsDataProvider>
}
