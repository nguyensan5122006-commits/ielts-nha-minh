/**
 * KidsMascot.tsx — CHÚ CORGI "Ki" TRONG KHU TRẺ EM
 * ----------------------------------------------------------------------------
 *   <KidsMascot pose="wave" size={160} />
 *   <KidsMascot pose="happy" size={140} outfitId="chef" />   // tủ đồ: mặc trang phục
 *
 * 1. Có ảnh render Blender (/mascot/poses/<pose>-512.webp, hoặc ảnh trang phục
 *    /mascot/outfits/<id>-512.webp) -> hiện ảnh đó.
 * 2. Chưa có ảnh -> vẽ Ki bằng SVG ngay trong code: đầu Corgi cam-kem, mũ cảnh sát,
 *    mỗi pose 1 nét mặt (vui, an ủi, suy nghĩ, ăn mừng, buồn ngủ…) để bé vẫn đọc được
 *    "ngôn ngữ" của mascot (04-DESIGN-SYSTEM mục 5). Khung luôn đúng kích thước.
 *
 * (Component Mascot chung của hệ thiết kế có ảnh tạm là hình tròn + chữ "Ki"; khu trẻ em
 *  cần bản tạm sinh động hơn vì mascot xuất hiện liên tục — đã ghi chú ở REQUESTS.md.)
 * ----------------------------------------------------------------------------
 */
import { useId, type CSSProperties } from 'react'
import type { MascotPose } from '../../../../design-system/components/Mascot'
import { useImageFallback } from '../../../../design-system/use-image-fallback'
import { DEFAULT_OUTFIT_ID } from '../../../../content/kids'
import { OUTFIT_ACCESSORY, outfitImageUrl } from '../../kids-data/kids-rewards'
import { KidsPicture } from './KidsPicture'
import './KidsMascot.css'

export type { MascotPose }

export interface KidsMascotProps {
  pose: MascotPose
  /** cỡ khung vuông (px) */
  size?: number
  /** trang phục (tủ đồ). Bỏ trống = đồng phục mặc định */
  outfitId?: string
  /** mô tả cho trình đọc màn hình; bỏ trống = ảnh trang trí */
  label?: string
  className?: string
}

export function KidsMascot({ pose, size = 160, outfitId, label, className }: KidsMascotProps) {
  const wearsOutfit = !!outfitId && outfitId !== DEFAULT_OUTFIT_ID
  const { src, onError, exhausted } = useImageFallback(wearsOutfit ? [outfitImageUrl(outfitId)] : [`/mascot/poses/${pose}-512.webp`])
  const style = { '--kz-mascot-size': `${size}px` } as CSSProperties
  // Chưa có ảnh Ki mặc đồ -> vẽ Ki + món phụ kiện của bộ đồ ở góc (ảnh tạm)
  const accessory = wearsOutfit && exhausted ? OUTFIT_ACCESSORY[outfitId] : undefined
  return (
    <span
      className={['kz-mascot', `kz-mascot--${pose}`, className].filter(Boolean).join(' ')}
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      data-pose={pose}
    >
      {/* key={pose}: đổi pose -> phần tử mới -> hiệu ứng "nhún" chạy lại */}
      <span className="kz-mascot__inner" key={pose}>
        {!exhausted && src ? (
          <img className="kz-mascot__img" src={src} onError={onError} alt="" width={size} height={size} draggable={false} />
        ) : (
          <CorgiDrawing pose={pose} />
        )}
        {accessory && <KidsPicture slug={accessory} word={accessory} size={Math.round(size * 0.38)} className="kz-mascot__accessory" decorative />}
      </span>
    </span>
  )
}

/* ============================ Ki vẽ bằng SVG ============================ */

const INK = '#1E2347'

function CorgiDrawing({ pose }: { pose: MascotPose }) {
  // id gradient phải duy nhất trên trang (nhiều Ki cùng lúc)
  const uid = useId().replace(/:/g, '')
  const fur = `kz-fur-${uid}`
  const cap = `kz-cap-${uid}`
  const shirt = `kz-shirt-${uid}`

  const eyesClosedHappy = pose === 'celebrate' || pose === 'happy'
  const sleepy = pose === 'sleepy'
  const surprised = pose === 'surprised'
  const thinking = pose === 'thinking'
  const comfort = pose === 'comfort'
  const mouthOpen = pose === 'happy' || pose === 'celebrate' || pose === 'wave' || pose === 'thumbs-up'

  return (
    <svg className="kz-mascot__svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={fur} cx="42%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FFC27A" />
          <stop offset="0.55" stopColor="#FF9233" />
          <stop offset="1" stopColor="#E0680F" />
        </radialGradient>
        <linearGradient id={cap} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#97A862" />
          <stop offset="1" stopColor="#66773A" />
        </linearGradient>
        <linearGradient id={shirt} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A3B46C" />
          <stop offset="1" stopColor="#74853F" />
        </linearGradient>
      </defs>

      {/* thân áo đồng phục (phần dưới, bị mép khung che bớt) */}
      <path d="M58 240 C58 206 82 192 120 192 C158 192 182 206 182 240 Z" fill={`url(#${shirt})`} />
      <path d="M100 194 L120 222 L140 194 Z" fill="#FFF7EC" />
      <path d="M96 196 L112 214 L104 222 L88 204 Z" fill="#E2453C" />
      <path d="M144 196 L128 214 L136 222 L152 204 Z" fill="#E2453C" />

      {/* tai */}
      <path d="M50 118 C36 84 34 46 48 20 C54 10 66 12 74 22 C90 44 102 70 108 92 Z" fill={`url(#${fur})`} />
      <path d="M58 100 C52 76 52 50 60 32 C72 46 82 64 90 84 Z" fill="#FFC9A6" />
      <path d="M190 118 C204 84 206 46 192 20 C186 10 174 12 166 22 C150 44 138 70 132 92 Z" fill={`url(#${fur})`} />
      <path d="M182 100 C188 76 188 50 180 32 C168 46 158 64 150 84 Z" fill="#FFC9A6" />

      {/* đầu */}
      <ellipse cx="120" cy="138" rx="86" ry="72" fill={`url(#${fur})`} />
      {/* mảng lông trắng: sống mũi + mõm + má dưới */}
      <path
        d="M120 84 C113 98 112 110 107 120 C86 124 62 136 58 154 C55 176 84 202 120 204 C156 202 185 176 182 154 C178 136 154 124 133 120 C128 110 127 98 120 84 Z"
        fill="#FFF7EC"
      />
      {/* bóng satin vinyl trên trán */}
      <ellipse cx="88" cy="104" rx="26" ry="10" fill="#fff" opacity="0.28" transform="rotate(-18 88 104)" />

      {/* má hồng */}
      <ellipse cx="74" cy="168" rx="12" ry="7" fill="#FF8FA0" opacity={comfort ? 0.6 : 0.42} />
      <ellipse cx="166" cy="168" rx="12" ry="7" fill="#FF8FA0" opacity={comfort ? 0.6 : 0.42} />

      {/* mắt */}
      {sleepy ? (
        <g stroke={INK} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M80 146 Q91 153 102 146" />
          <path d="M138 146 Q149 153 160 146" />
        </g>
      ) : eyesClosedHappy && pose === 'celebrate' ? (
        <g stroke={INK} strokeWidth="5.5" strokeLinecap="round" fill="none">
          <path d="M80 148 Q91 134 102 148" />
          <path d="M138 148 Q149 134 160 148" />
        </g>
      ) : (
        <g>
          <ellipse cx="91" cy="144" rx={surprised ? 13 : 11} ry={surprised ? 15 : 13} fill={INK} />
          <ellipse cx="149" cy="144" rx={surprised ? 13 : 11} ry={surprised ? 15 : 13} fill={INK} />
          {/* ánh mắt: suy nghĩ thì nhìn lên */}
          <circle cx="95" cy={thinking ? 136 : 139} r="4.6" fill="#fff" />
          <circle cx="153" cy={thinking ? 136 : 139} r="4.6" fill="#fff" />
          <circle cx="87" cy="150" r="2" fill="#fff" opacity="0.8" />
          <circle cx="145" cy="150" r="2" fill="#fff" opacity="0.8" />
        </g>
      )}

      {/* lông mày: an ủi = nhướng lên ở giữa (dịu dàng); suy nghĩ = 1 bên nhướng */}
      {comfort && (
        <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M80 124 Q90 118 100 122" />
          <path d="M140 122 Q150 118 160 124" />
        </g>
      )}
      {thinking && (
        <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M80 124 Q90 120 100 124" />
          <path d="M140 118 Q150 112 160 116" />
        </g>
      )}

      {/* mũi */}
      <path d="M107 164 C107 157 133 157 133 164 C133 172 125 177 120 177 C115 177 107 172 107 164 Z" fill={INK} />
      <ellipse cx="115" cy="162" rx="5" ry="2.6" fill="#fff" opacity="0.5" />

      {/* miệng */}
      {surprised ? (
        <ellipse cx="120" cy="190" rx="7" ry="8" fill="#7A2E35" />
      ) : mouthOpen ? (
        <g>
          <path d="M103 182 Q120 208 137 182 Q120 190 103 182 Z" fill="#7A2E35" />
          <path d="M111 191 Q120 206 129 191 Q120 195 111 191 Z" fill="#FF7A8C" />
        </g>
      ) : thinking ? (
        <path d="M112 188 Q122 184 130 189" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M106 182 Q113 191 120 183 Q127 191 134 182" stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none" />
      )}

      {/* mũ cảnh sát: chóp ô-liu, băng đỏ, lưỡi trai navy, huy hiệu vàng */}
      <path d="M66 98 C64 64 88 44 120 44 C152 44 176 64 174 98 Z" fill={`url(#${cap})`} />
      <rect x="66" y="86" width="108" height="15" rx="6" fill="#E2453C" />
      <path d="M60 100 C88 112 152 112 180 100 C178 116 62 116 60 100 Z" fill="#232A5C" />
      <circle cx="120" cy="70" r="11" fill="#F5B82E" />
      <path d="M120 62 L122.6 67.6 L128.6 68.2 L124 72.2 L125.4 78 L120 75 L114.6 78 L116 72.2 L111.4 68.2 L117.4 67.6 Z" fill="#FFF4D6" />
      <ellipse cx="96" cy="60" rx="16" ry="6" fill="#fff" opacity="0.22" transform="rotate(-20 96 60)" />

      {/* chi tiết theo pose */}
      {pose === 'listening' && (
        <g>
          {/* tai nghe: quai vòng qua mũ + 2 chụp tai xanh "kỹ năng nghe" */}
          <path d="M40 150 C34 70 206 70 200 150" fill="none" stroke="#232A5C" strokeWidth="9" strokeLinecap="round" />
          <rect x="22" y="128" width="32" height="52" rx="14" fill="#2E9BF0" />
          <rect x="186" y="128" width="32" height="52" rx="14" fill="#2E9BF0" />
          <rect x="28" y="134" width="10" height="26" rx="5" fill="#fff" opacity="0.45" />
          <rect x="192" y="134" width="10" height="26" rx="5" fill="#fff" opacity="0.45" />
        </g>
      )}
      {(pose === 'wave' || pose === 'salute') && (
        <g className="kz-mascot__paw">
          <ellipse cx="206" cy={pose === 'salute' ? 104 : 170} rx="20" ry="18" fill={`url(#${fur})`} />
          <ellipse cx="206" cy={pose === 'salute' ? 108 : 175} rx="11" ry="8" fill="#FFF7EC" />
        </g>
      )}
      {pose === 'thumbs-up' && (
        <g>
          <rect x="190" y="160" width="34" height="30" rx="13" fill={`url(#${fur})`} />
          <rect x="198" y="138" width="13" height="30" rx="6.5" fill={`url(#${fur})`} />
        </g>
      )}
      {sleepy && (
        <g fill={INK} opacity="0.7" fontFamily="Baloo 2, sans-serif" fontWeight="800">
          <text x="182" y="62" fontSize="26">z</text>
          <text x="200" y="40" fontSize="18">z</text>
        </g>
      )}
      {thinking && (
        <g fill="#fff" stroke="#C9D2F0" strokeWidth="2">
          <circle cx="196" cy="74" r="6" />
          <circle cx="210" cy="54" r="9" />
        </g>
      )}
      {pose === 'celebrate' && (
        <g>
          <path d="M28 70 L32 80 L42 84 L32 88 L28 98 L24 88 L14 84 L24 80 Z" fill="#F5B82E" />
          <path d="M206 56 L209 63 L216 66 L209 69 L206 76 L203 69 L196 66 L203 63 Z" fill="#FF8A2A" />
          <circle cx="40" cy="128" r="4" fill="#2E9BF0" />
          <circle cx="204" cy="112" r="4" fill="#E2453C" />
        </g>
      )}
      {comfort && <path d="M196 150 C196 142 208 142 208 150 C208 158 196 164 196 168 C196 164 184 158 184 150 C184 142 196 142 196 150 Z" fill="#FF8FA0" opacity="0.85" />}
    </svg>
  )
}
