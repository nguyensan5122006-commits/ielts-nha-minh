/**
 * ShieldNode.tsx — NÚT BÀI HỌC HÌNH "HUY HIỆU KHIÊN TRÒN" TRÊN ĐƯỜNG TUẦN TRA
 * ----------------------------------------------------------------------------
 * 4 trạng thái (design system mục 7):
 *   done   : khiên vàng + dấu tích xanh
 *   next   : khiên cam, to hơn, phát sáng "thở" chậm (bài Học tiếp)
 *   open   : khiên trắng viền màu kỹ năng (học được bất cứ lúc nào)
 *   locked : khiên xám mờ + ổ khoá (level chưa mở — vẫn bấm xem trước được)
 * Bên trong là icon 3D của kỹ năng: ảnh /art/skills/<skill>-256.webp (nhóm 3D làm),
 * chưa có thì dùng ảnh emoji 3D trong /word-images, cuối cùng mới là emoji chữ.
 * ----------------------------------------------------------------------------
 */
import { useId, type CSSProperties } from 'react'
import type { SkillName } from '../../../content/content-types'
import { Icon } from '../../../design-system/components/Icon'
import { useImageFallback } from '../../../design-system/use-image-fallback'
import type { PathNodeState } from '../path-view-model'

/** Ảnh emoji 3D thay thế khi chưa có icon kỹ năng 3D riêng */
const SKILL_FALLBACK_IMAGE: Record<SkillName, string> = {
  vocabulary: 'books',
  listening: 'headphone',
  reading: 'open-book',
  speaking: 'microphone',
  writing: 'memo',
}
const SKILL_EMOJI: Record<SkillName, string> = { vocabulary: '📚', listening: '🎧', reading: '📖', speaking: '🗣️', writing: '✍️' }

/** Hình khiên (khung 100 × 108): vai tròn, đáy nhọn mềm */
export const SHIELD_PATH =
  'M50 5 C64 5 79 9 89 15 Q94 18 94 24 V52 C94 78 74 96 50 104 C26 96 6 78 6 52 V24 Q6 18 11 15 C21 9 36 5 50 5 Z'

export function SkillPicture({ skill, size }: { skill: SkillName; size: number }) {
  const { src, onError, exhausted } = useImageFallback([`/art/skills/${skill}-256.webp`, `/word-images/${SKILL_FALLBACK_IMAGE[skill]}.webp`])
  if (exhausted || !src) {
    return (
      <span className="lp-shield__emoji" style={{ fontSize: size * 0.72 }} aria-hidden>
        {SKILL_EMOJI[skill]}
      </span>
    )
  }
  return <img className="lp-shield__img" src={src} onError={onError} width={size} height={size} alt="" draggable={false} loading="lazy" decoding="async" />
}

export function ShieldNode({ state, skill, size }: { state: PathNodeState; skill: SkillName; size: number }) {
  const gradientId = 'lp-shield-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const style = { width: size, height: size * 1.08, '--skill-color': `var(--skill-${skill})` } as CSSProperties
  return (
    <span className={`lp-shield is-${state}`} style={style} aria-hidden>
      <svg className="lp-shield__svg" viewBox="0 0 100 108" width={size} height={size * 1.08}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="lp-shield__stop-top" />
            <stop offset="100%" className="lp-shield__stop-bottom" />
          </linearGradient>
        </defs>
        {/* bóng đổ mềm dưới khiên (như đồ chơi vinyl đặt trên đường) */}
        <ellipse cx="50" cy="104" rx="30" ry="4" className="lp-shield__floor" />
        <path d={SHIELD_PATH} className="lp-shield__body" style={{ fill: `url(#${gradientId})` }} />
        {/* viền trong sáng */}
        <path d={SHIELD_PATH} className="lp-shield__inner" transform="translate(50 54) scale(0.82) translate(-50 -54)" />
        {/* vệt bóng satin phía trên-trái */}
        <path d="M24 22 C32 16 42 13 50 13" className="lp-shield__gloss" />
      </svg>
      <span className="lp-shield__icon">
        <SkillPicture skill={skill} size={Math.round(size * 0.5)} />
      </span>
      {state === 'done' && (
        <span className="lp-shield__badge lp-shield__badge--done">
          <Icon name="check" size={Math.round(size * 0.2)} strokeWidth={3.2} />
        </span>
      )}
      {state === 'locked' && (
        <span className="lp-shield__badge lp-shield__badge--locked">
          <Icon name="lock" size={Math.round(size * 0.18)} strokeWidth={2.6} />
        </span>
      )}
    </span>
  )
}
