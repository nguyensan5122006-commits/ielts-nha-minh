/**
 * SkillIcon.tsx — ICON 3D CỦA 5 KỸ NĂNG (nghe, đọc, viết, nói, từ vựng)
 * ----------------------------------------------------------------------------
 *   <SkillIcon skill="listening" />            // 48px
 *   <SkillIcon skill="reading" size={72} label="Đọc hiểu" />
 *
 * Ảnh: /art/skills/<skill>-256.webp (nhóm 3D làm). Chưa có ảnh -> vòng tròn
 * nhuộm màu kỹ năng + emoji, cùng kích thước nên không vỡ bố cục.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import type { SkillName } from '../../content/content-types'
import { useImageFallback } from '../use-image-fallback'
import './SkillIcon.css'

export type { SkillName }

/** emoji tạm khi chưa có ảnh 3D */
const SKILL_EMOJI: Record<SkillName, string> = {
  listening: '🎧',
  reading: '📖',
  writing: '✍️',
  speaking: '🎤',
  vocabulary: '🔤',
}

export interface SkillIconProps {
  skill: SkillName
  /** cỡ px, mặc định 48 */
  size?: number
  /** nhãn cho trình đọc màn hình. Bỏ trống = trang trí */
  label?: string
  className?: string
}

export function SkillIcon({ skill, size = 48, label, className }: SkillIconProps) {
  const { src, onError, exhausted } = useImageFallback([`/art/skills/${skill}-256.webp`])
  const style = { width: size, height: size, '--skill-color': `var(--skill-${skill})` } as CSSProperties
  const classes = ['ds-skill-icon', exhausted && 'is-fallback', className].filter(Boolean).join(' ')

  if (exhausted || !src) {
    return (
      <span className={classes} style={style} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
        <span className="ds-skill-icon__emoji" style={{ fontSize: size * 0.48 }}>
          {SKILL_EMOJI[skill]}
        </span>
      </span>
    )
  }
  return <img className={classes} style={style} src={src} onError={onError} width={size} height={size} alt={label ?? ''} loading="lazy" decoding="async" draggable={false} />
}
