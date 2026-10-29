/**
 * GameArt.tsx — ẢNH 3D CỦA TRÒ CHƠI / MÓN ĐỒ / HUY HIỆU (Fluent Emoji 3D)
 * ----------------------------------------------------------------------------
 *   <GameArt slug="honeybee" size={64} />                 // ảnh 3D theo tên
 *   <GameArt emoji="🐝" size={48} />                      // đổi emoji -> ảnh 3D (emoji-art.ts)
 *   <GameArt slug="trophy" size={72} plate="gold" />      // có "đĩa vinyl" màu phía sau
 *
 * Ảnh nằm ở public/word-images/<slug>.webp (160px, nền trong suốt).
 * Không có ảnh (hoặc ảnh lỗi) -> hiện chính emoji, khung giữ nguyên cỡ -> không vỡ bố cục.
 * Ảnh luôn là trang trí (chữ bên cạnh đã nói nó là gì), nên trình đọc màn hình bỏ qua.
 * (Không dùng <WordImage> vì nó thử file "-128.webp" trước -> mỗi ảnh tốn 1 lần tải hỏng.)
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import { emojiArtSlug } from '../emoji-art'

/** Màu "đĩa" phía sau ảnh — mỗi tone lấy màu đã có trong tokens.css */
export type ArtPlate = 'none' | 'primary' | 'gold' | 'navy' | 'olive' | 'red' | 'success' | 'listening' | 'reading' | 'speaking' | 'writing'

export interface GameArtProps {
  /** tên ảnh trong public/word-images (VD 'crossed-swords') */
  slug?: string
  /** hoặc 1 emoji — tự đổi sang ảnh 3D nếu có */
  emoji?: string
  /** cỡ ảnh (px). Có plate thì đĩa to hơn ảnh ~40% */
  size?: number
  plate?: ArtPlate
  /** nghiêng nhẹ cho vui mắt (độ) */
  tilt?: number
  className?: string
}

export function GameArt({ slug, emoji, size = 56, plate = 'none', tilt = 0, className }: GameArtProps) {
  const resolvedSlug = slug ?? emojiArtSlug(emoji)
  const [failedSlug, setFailedSlug] = useState<string | null>(null)
  const showImage = !!resolvedSlug && failedSlug !== resolvedSlug
  const style = { '--art-size': `${size}px`, '--art-tilt': `${tilt}deg` } as CSSProperties

  return (
    <span className={['pg-art', plate !== 'none' && `pg-art--plate pg-art--${plate}`, className].filter(Boolean).join(' ')} style={style} aria-hidden>
      {showImage ? (
        <img
          className="pg-art__img"
          src={`/word-images/${resolvedSlug}.webp`}
          width={size}
          height={size}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailedSlug(resolvedSlug)}
        />
      ) : (
        <span className="pg-art__emoji">{emoji ?? '🎲'}</span>
      )}
    </span>
  )
}
