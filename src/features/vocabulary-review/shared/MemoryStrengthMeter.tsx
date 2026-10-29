/**
 * MemoryStrengthMeter.tsx — ĐỒNG HỒ "ĐỘ BỀN TRÍ NHỚ" 5 NẤC (ý tưởng Seneca)
 * ----------------------------------------------------------------------------
 *   <MemoryStrengthMeter level={2.6} />          // 5 khúc, sáng tới khúc thứ 3
 *   <MemoryStrengthMeter level={4} size="sm" />  // bản nhỏ trên thẻ từ
 *
 * Tách "điểm hôm nay" khỏi "trí nhớ lâu dài": làm đúng 100% hôm nay chưa có nghĩa là
 * đã nhớ lâu. Mỗi khúc mang màu của nấc nhớ tương ứng; khúc chưa tới là nền nhạt.
 * `level` có thể lẻ (trung bình nhiều thẻ) -> làm tròn để tô khúc.
 * ----------------------------------------------------------------------------
 */
import { MEMORY_LEVELS, type MemoryLevel } from '../memory-levels'
import { useReviewText } from '../vocabulary-review-text'

export interface MemoryStrengthMeterProps {
  /** 1..5 (có thể lẻ) */
  level: number
  size?: 'sm' | 'md' | 'lg'
  /** hiện tên nấc bên cạnh (mặc định có, trừ size sm) */
  showLabel?: boolean
}

export function MemoryStrengthMeter({ level, size = 'md', showLabel }: MemoryStrengthMeterProps) {
  const text = useReviewText()
  const rounded = Math.max(1, Math.min(5, Math.round(level))) as MemoryLevel
  const withLabel = showLabel ?? size !== 'sm'
  const name = text.memoryLevelName[rounded]
  return (
    <span className={`strength-meter strength-meter--${size}`} role="img" aria-label={text.memoryLevelAria(rounded, name)}>
      <span className="strength-meter__segments" aria-hidden>
        {MEMORY_LEVELS.map((step) => (
          <span key={step} className={`strength-meter__segment${step <= rounded ? ' is-on' : ''}`} style={step <= rounded ? { background: `var(--memory-${step})` } : undefined} />
        ))}
      </span>
      {withLabel && (
        <span className="strength-meter__label" aria-hidden>
          <strong>{rounded}/5</strong> · {name}
        </span>
      )}
    </span>
  )
}
