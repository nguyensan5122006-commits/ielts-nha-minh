/**
 * KidsPicture.tsx — ẢNH 3D CỦA 1 TỪ (Fluent Emoji) DÙNG TRONG TRÒ CHƠI
 * ----------------------------------------------------------------------------
 *   <KidsPicture slug="cat" word="cat" size={140} />
 *   preloadWordImages(['cat', 'dog'])   // tải trước ảnh câu sau -> thẻ bay vào là có ảnh ngay
 *
 * Khác WordImage của hệ thiết kế ở 2 điểm (quan trọng cho cảm giác game):
 *   - Gọi thẳng /word-images/<slug>.webp (tên file thật, xem word-image-report.md),
 *     không thử tên "-128" trước -> không có lần tải hỏng nào làm ảnh hiện chậm.
 *   - Có hàm tải trước ảnh.
 * Ảnh lỗi -> ô màu ấm + chữ cái đầu (không vỡ bố cục).
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import { wordImageUrl } from '../../kids-data/kids-word-bank'
import './KidsPicture.css'

const failed = new Set<string>()
const preloaded = new Set<string>()

/** Tải trước ảnh (trình duyệt giữ trong bộ nhớ đệm). */
export function preloadWordImages(slugs: string[]): void {
  for (const slug of slugs) {
    if (!slug || preloaded.has(slug)) continue
    preloaded.add(slug)
    const image = new Image()
    image.decoding = 'async'
    image.src = wordImageUrl(slug)
  }
}

export interface KidsPictureProps {
  slug: string
  /** từ tiếng Anh (chữ alt + chữ cái đầu khi không có ảnh) */
  word: string
  size?: number
  /** ảnh chỉ để trang trí (chữ đã viết bên cạnh) */
  decorative?: boolean
  className?: string
}

export function KidsPicture({ slug, word, size = 96, decorative = false, className }: KidsPictureProps) {
  // ảnh lỗi được nhớ chung cả trang; đổi slug thì tự tính lại (không giữ trạng thái cũ)
  const [, rerender] = useState(0)
  const broken = !slug || failed.has(slug)
  const style = { width: size, height: size } as CSSProperties
  if (broken) {
    return (
      <span className={['kz-picture', 'is-fallback', className].filter(Boolean).join(' ')} style={style} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : word} aria-hidden={decorative || undefined}>
        <span style={{ fontSize: size * 0.48 }}>{word.trim().charAt(0).toUpperCase()}</span>
      </span>
    )
  }
  return (
    <img
      className={['kz-picture', className].filter(Boolean).join(' ')}
      style={style}
      src={wordImageUrl(slug)}
      width={size}
      height={size}
      alt={decorative ? '' : word}
      draggable={false}
      decoding="async"
      onError={() => {
        failed.add(slug)
        rerender((n) => n + 1)
      }}
    />
  )
}
