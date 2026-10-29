/**
 * WordImage.tsx — ẢNH MINH HOẠ TỪ VỰNG (Fluent Emoji 3D)
 * ----------------------------------------------------------------------------
 *   <WordImage slug="red-apple" word="apple" />          // 96px
 *   <WordImage slug="🍎" word="apple" size={64} />      // trường icon là emoji -> hiện emoji luôn
 *
 * Thứ tự thử ảnh:
 *   /word-images/<slug>-128.webp  (quy ước của nhóm nội dung, xem content-types.ts)
 *   /word-images/<slug>.webp
 *   -> không có: ô vuông mềm màu ấm + chữ cái đầu của từ (VD "A" cho apple).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { useImageFallback } from '../use-image-fallback'
import './WordImage.css'

export interface WordImageProps {
  /** tên ảnh (slug Fluent Emoji, VD 'red-apple') hoặc 1 emoji */
  slug: string
  /** từ tiếng Anh — dùng làm chữ alt và lấy chữ cái đầu cho ô tạm */
  word: string
  /** cỡ px, mặc định 96 */
  size?: number
  /** ảnh chỉ để trang trí (từ đã được viết ngay bên cạnh) */
  decorative?: boolean
  className?: string
}

// 6 màu nền nhẹ xoay vòng cho ô tạm -> lưới từ vựng không bị đơn điệu
const TILE_TONES = ['primary', 'navy', 'olive', 'gold', 'success', 'red'] as const

/** slug là emoji (không phải chữ a-z, số, gạch ngang) */
function isEmoji(slug: string) {
  return !/^[a-z0-9-]+$/i.test(slug)
}

/** Băm đơn giản tên từ -> chọn màu ổn định (cùng từ luôn cùng màu). */
function toneFor(word: string) {
  let hash = 0
  for (const char of word) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return TILE_TONES[hash % TILE_TONES.length]
}

export function WordImage({ slug, word, size = 96, decorative = false, className }: WordImageProps) {
  const emoji = isEmoji(slug)
  const { src, onError, exhausted } = useImageFallback(emoji ? [] : [`/word-images/${slug}-128.webp`, `/word-images/${slug}.webp`])
  const style = { width: size, height: size } as CSSProperties
  const alt = decorative ? '' : word

  if (emoji) {
    return (
      <span className={['ds-word-image', 'is-emoji', className].filter(Boolean).join(' ')} style={style} role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : word} aria-hidden={decorative || undefined}>
        <span style={{ fontSize: size * 0.62, lineHeight: 1 }}>{slug}</span>
      </span>
    )
  }
  if (exhausted || !src) {
    return (
      <span
        className={['ds-word-image', 'is-fallback', `ds-word-image--${toneFor(word)}`, className].filter(Boolean).join(' ')}
        style={style}
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : word}
        aria-hidden={decorative || undefined}
      >
        <span className="ds-word-image__letter" style={{ fontSize: size * 0.46 }}>
          {word.trim().charAt(0).toUpperCase() || '?'}
        </span>
      </span>
    )
  }
  return <img className={['ds-word-image', className].filter(Boolean).join(' ')} style={style} src={src} onError={onError} width={size} height={size} alt={alt} loading="lazy" decoding="async" draggable={false} />
}
