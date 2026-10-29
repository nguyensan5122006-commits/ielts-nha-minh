/**
 * WordThumb.tsx — ẢNH NHỎ CỦA 1 TỪ: ảnh 3D nếu có, không thì ô chữ cái đầu
 * ----------------------------------------------------------------------------
 *   <WordThumb word="apple" size={56} />
 *
 * Tra ảnh bằng findWordImage (Fluent Emoji 3D). Từ không có ảnh (VD "according to",
 * "sort out") -> vẽ thẳng ô chữ cái đầu cùng kiểu với WordImage, KHÔNG gọi mạng
 * (truyền slug không tồn tại cho WordImage sẽ tốn 2 lần tải ảnh lỗi cho mỗi từ).
 * ----------------------------------------------------------------------------
 */
import { WordImage } from '../../../design-system/components/WordImage'
import { findWordImage } from '../../../content/word-image-catalog'

const TONES = ['primary', 'navy', 'olive', 'gold', 'success', 'red'] as const

/** Cùng từ -> cùng màu ô (giống cách WordImage chọn màu). */
function toneFor(word: string) {
  let hash = 0
  for (const char of word) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return TONES[hash % TONES.length]
}

export function WordThumb({ word, size = 56 }: { word: string; size?: number }) {
  const slug = findWordImage(word)
  if (slug) return <WordImage slug={slug} word={word} size={size} decorative />
  return (
    <span className={`ds-word-image is-fallback ds-word-image--${toneFor(word)}`} style={{ width: size, height: size }} aria-hidden>
      <span className="ds-word-image__letter" style={{ fontSize: size * 0.46 }}>
        {word.trim().charAt(0).toUpperCase() || '?'}
      </span>
    </span>
  )
}
