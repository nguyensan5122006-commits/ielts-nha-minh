/**
 * TreasureChest.tsx — CHIẾC RƯƠNG BỊ KHOÁ (vẽ bằng SVG, hiệu ứng bằng CSS)
 * ----------------------------------------------------------------------------
 *   <TreasureChest state="locked" />                 // rương đóng, ổ khoá vàng ở giữa
 *   <TreasureChest state="locked" nudgeKey={n} />    // máy chưa nghe rõ: ổ khoá lúc lắc nhẹ 1 cái
 *   <TreasureChest state="listening" />              // đang nghe: ổ khoá phát sáng nhịp nhàng
 *   <TreasureChest state="open" />                   // bé nói đúng: khoá bật, nắp mở, ánh vàng + đá quý bay lên
 *
 * Không có gì "phạt": máy chưa nghe rõ thì ổ khoá chỉ lúc lắc như "thử lại nào".
 * Nắp rương quay quanh bản lề bên trái (transform-origin) — xem speak-unlock.css mục 3.
 * ----------------------------------------------------------------------------
 */
import { useId } from 'react'
import { CorrectBurst } from '../../game-engine/components/CorrectBurst'
import { KidsPicture } from '../../game-engine/components/KidsPicture'

export interface TreasureChestProps {
  state: 'locked' | 'listening' | 'open'
  /** đổi số này -> ổ khoá lúc lắc lại (máy chưa nghe rõ) */
  nudgeKey?: number
}

export function TreasureChest({ state, nudgeKey = 0 }: TreasureChestProps) {
  // id gradient phải duy nhất trên trang
  const uid = useId().replace(/:/g, '')
  const wood = `su-wood-${uid}`
  const woodLid = `su-wood-lid-${uid}`
  const gold = `su-gold-${uid}`
  const glow = `su-glow-${uid}`
  const lidShape = `su-lid-shape-${uid}`

  return (
    <div className={`su-chest su-chest--${state}`} aria-hidden>
      {state === 'open' && <span className="su-chest__rays" />}
      <svg className="su-chest__svg" viewBox="0 0 260 220">
        <defs>
          <linearGradient id={wood} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9813f" />
            <stop offset="1" stopColor="#8a4d22" />
          </linearGradient>
          <linearGradient id={woodLid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dc9550" />
            <stop offset="1" stopColor="#a8622d" />
          </linearGradient>
          <linearGradient id={gold} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe08a" />
            <stop offset="0.5" stopColor="#f5b82e" />
            <stop offset="1" stopColor="#c98a12" />
          </linearGradient>
          <radialGradient id={glow} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff6c8" />
            <stop offset="0.6" stopColor="#ffd65a" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffd65a" stopOpacity="0" />
          </radialGradient>
          <clipPath id={lidShape}>
            <path d="M25 100 L25 72 Q25 30 130 30 Q235 30 235 72 L235 100 Z" />
          </clipPath>
        </defs>

        {/* bóng dưới đáy */}
        <ellipse cx="130" cy="206" rx="108" ry="11" className="su-chest__shadow" />

        {/* ánh vàng trong lòng rương (chỉ thấy khi mở) */}
        <ellipse cx="130" cy="100" rx="98" ry="26" fill={`url(#${glow})`} className="su-chest__inner-glow" />

        {/* thân rương */}
        <rect x="25" y="100" width="210" height="98" rx="14" fill={`url(#${wood})`} />
        <path d="M25 132 H235 M25 164 H235" className="su-chest__planks" />
        <rect x="55" y="100" width="18" height="98" fill={`url(#${gold})`} />
        <rect x="187" y="100" width="18" height="98" fill={`url(#${gold})`} />
        <rect x="20" y="96" width="220" height="13" rx="6.5" fill={`url(#${gold})`} />

        {/* nắp rương (quay quanh bản lề trái khi mở) */}
        <g className="su-chest__lid">
          <path d="M25 100 L25 72 Q25 30 130 30 Q235 30 235 72 L235 100 Z" fill={`url(#${woodLid})`} />
          <g clipPath={`url(#${lidShape})`}>
            <rect x="55" y="20" width="18" height="90" fill={`url(#${gold})`} />
            <rect x="187" y="20" width="18" height="90" fill={`url(#${gold})`} />
            <path d="M25 66 Q130 40 235 66" className="su-chest__planks" />
          </g>
          <rect x="20" y="90" width="220" height="12" rx="6" fill={`url(#${gold})`} />
        </g>

        {/* ổ khoá */}
        <g className="su-chest__lock" key={nudgeKey}>
          <path className="su-chest__shackle" d="M115 98 V84 A15 15 0 0 1 145 84 V98" />
          <rect x="107" y="92" width="46" height="40" rx="10" fill={`url(#${gold})`} className="su-chest__lock-body" />
          <circle cx="130" cy="108" r="5.5" className="su-chest__keyhole" />
          <rect x="127.5" y="110" width="5" height="12" rx="2.5" className="su-chest__keyhole" />
        </g>
      </svg>

      {/* kho báu bay lên khi mở */}
      {state === 'open' && (
        <>
          <span className="su-chest__treasure su-chest__treasure--gem">
            <KidsPicture slug="gem-stone" word="gem" size={84} decorative />
          </span>
          <span className="su-chest__treasure su-chest__treasure--coin-a">
            <KidsPicture slug="coin" word="coin" size={56} decorative />
          </span>
          <span className="su-chest__treasure su-chest__treasure--coin-b">
            <KidsPicture slug="coin" word="coin" size={46} decorative />
          </span>
          <span className="su-chest__burst">
            <CorrectBurst spread={0.9} />
          </span>
        </>
      )}
    </div>
  )
}
