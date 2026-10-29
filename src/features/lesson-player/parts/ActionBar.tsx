/**
 * ActionBar.tsx — THANH HÀNH ĐỘNG CỐ ĐỊNH Ở ĐÁY (trước khi kiểm tra)
 * ----------------------------------------------------------------------------
 *   trái : "Gợi ý" (thang 3 nấc: Gợi ý → Gợi ý tiếp → Xem lời giải) · "Bỏ qua"
 *   phải : nút chính "Kiểm tra" (Enter) — mờ cho tới khi có câu trả lời
 * Sau khi kiểm tra, thanh này được thay bằng FeedbackSheet (cùng vị trí).
 * Thẻ dạy dùng biến thể "cards": Quay lại · Bỏ qua lý thuyết · Tiếp (Enter).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Kbd } from '../../../design-system/components/Kbd'
import { useLessonText } from '../lesson-player-text'
import { LessonGlyph } from './LessonGlyph'

/** Khung chung của thanh đáy */
export function BottomBar({ left, right, note }: { left?: ReactNode; right?: ReactNode; note?: ReactNode }) {
  return (
    <div className="lp-bar">
      <div className="lp-bar__inner">
        <div className="lp-bar__left">{left}</div>
        {note && <div className="lp-bar__note">{note}</div>}
        <div className="lp-bar__right">{right}</div>
      </div>
    </div>
  )
}

interface HintButtonProps {
  /** nấc đang mở (0..3) */
  level: number
  /** số nấc gợi ý trước lời giải (1 hoặc 2) */
  steps: number
  /** gợi ý nhẹ nhàng "nhấp nháy" khi người học đang bí (sai 2 câu liền) */
  nudge?: boolean
  onClick: () => void
}

export function HintButton({ level, steps, nudge = false, onClick }: HintButtonProps) {
  const text = useLessonText()
  const label = level === 0 ? text.hint : level < steps ? text.hintNext : text.showSolution
  return (
    <Button variant="ghost" size="md" className={['lp-hint-btn', nudge && level === 0 && 'is-nudging'].filter(Boolean).join(' ')} onClick={onClick} iconLeft={<LessonGlyph name="lightbulb" size={19} />}>
      {label}
      <span className="lp-hint-dots" aria-hidden>
        {Array.from({ length: steps + 1 }, (_, i) => (
          <i key={i} className={i < level ? 'is-on' : i === steps ? 'is-solution' : ''} />
        ))}
      </span>
    </Button>
  )
}

export function CheckButton({ disabled, onClick, label }: { disabled: boolean; onClick: () => void; label?: string }) {
  const text = useLessonText()
  return (
    <Button size="lg" disabled={disabled} onClick={onClick} iconRight={!disabled ? <Kbd onColor>Enter</Kbd> : undefined} className="lp-check-btn">
      {label ?? text.check}
    </Button>
  )
}
