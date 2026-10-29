/**
 * SkyWorld.tsx — KHUNG "THẾ GIỚI" CỦA KHU TRẺ EM
 * ----------------------------------------------------------------------------
 *   <SkyWorld>…nội dung trang…</SkyWorld>
 *
 * Vẽ nền trời gradient, quầng nắng, 3 đám mây trôi chậm, 3 lớp đồi cỏ ở đáy
 * (ban đêm: trời sao, đồi thẫm — theo chế độ tối). Tất cả chỉ để trang trí
 * (aria-hidden, không bắt chuột). Style ở kids-zone.css.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import '../../kids-zone.css'

/** 1 đám mây vẽ bằng 4 hình tròn chồng nhau */
function Cloud({ className }: { className: string }) {
  return (
    <svg className={`kz-cloud ${className}`} viewBox="0 0 200 90" aria-hidden>
      <circle cx="58" cy="56" r="30" />
      <circle cx="98" cy="40" r="38" />
      <circle cx="142" cy="56" r="28" />
      <rect x="40" y="52" width="122" height="34" rx="17" />
    </svg>
  )
}

export function SkyWorld({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={['kz-world', className].filter(Boolean).join(' ')}>
      <div className="kz-sky" aria-hidden>
        <div className="kz-sky__sun" />
        <div className="kz-sky__stars" />
        <Cloud className="kz-cloud--1" />
        <Cloud className="kz-cloud--2" />
        <Cloud className="kz-cloud--3" />
        {/* đồi cỏ: 3 lớp xa -> gần, lớp gần nhất có vệt sáng như bề mặt đồ chơi */}
        <svg className="kz-hills" viewBox="0 0 1440 230" preserveAspectRatio="none">
          <path className="kz-hills__back" d="M0 120 C180 60 360 70 540 110 C720 150 900 60 1080 70 C1260 80 1360 110 1440 100 L1440 230 L0 230 Z" />
          <path className="kz-hills__mid" d="M0 160 C220 110 420 120 620 150 C820 180 1000 110 1200 120 C1320 126 1400 140 1440 146 L1440 230 L0 230 Z" />
          <path className="kz-hills__front" d="M0 196 C260 168 520 176 760 192 C1000 208 1240 176 1440 184 L1440 230 L0 230 Z" />
          <path className="kz-hills__shine" d="M120 184 C260 172 380 172 470 178 C380 180 260 182 120 190 Z" />
        </svg>
      </div>
      {children}
    </div>
  )
}
