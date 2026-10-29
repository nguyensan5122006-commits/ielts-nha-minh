/**
 * AnswerOption.tsx — THẺ ĐÁP ÁN DÙNG CHUNG (trắc nghiệm, đúng/sai, nghe chọn…)
 * ----------------------------------------------------------------------------
 *   <AnswerOption keyLabel="1" state="idle" onClick={...}>Hello</AnswerOption>
 *   <AnswerOption keyLabel="2" state="correct">Hello</AnswerOption>       // sau kiểm tra: xanh + dấu ✓
 *   <AnswerOption keyLabel="3" state="oops">Good night</AnswerOption>     // đã chọn sai: cam san hô
 *   <AnswerOption keyLabel="T" state="selected" sublabel="Đúng" layout="tile">TRUE</AnswerOption>
 *
 * Làm thành component từ mẫu `.sg-answer` của hệ thiết kế (trang /design, /design/focus):
 * viền 1.5px, bo 16px, phím số (Kbd) ở đầu, đang chọn = viền cam + nền cam nhạt + vòng sáng,
 * đúng = xanh ngọc + ✓ bên phải, sai = cam san hô (không đỏ chói), còn lại mờ đi.
 * Thêm cho trình học: trạng thái "eliminated" (gợi ý đã loại — gạch ngang, không bấm được),
 * kiểu "tile" (ô vuông to cho TRUE / FALSE / NOT GIVEN), xuất hiện so le nhẹ.
 *
 * Nhóm khác (sổ lỗi sai, ôn tập, phòng thi…) có thể import component này.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import './AnswerOption.css'

export type AnswerOptionState = 'idle' | 'selected' | 'correct' | 'oops' | 'dim' | 'eliminated'

export interface AnswerOptionProps {
  children: ReactNode
  /** chữ trên phím tắt ở đầu thẻ (VD "1"); bỏ trống = không hiện */
  keyLabel?: string
  state?: AnswerOptionState
  /** dòng phụ nhỏ dưới nhãn (VD "Đúng" dưới TRUE) */
  sublabel?: ReactNode
  /** row = thẻ ngang (mặc định) · tile = ô to căn giữa (TRUE / FALSE) */
  layout?: 'row' | 'tile'
  /** khoá bấm (sau khi kiểm tra) */
  disabled?: boolean
  /** thứ tự xuất hiện (so le 40ms mỗi thẻ) */
  order?: number
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export function AnswerOption({ children, keyLabel, state = 'idle', sublabel, layout = 'row', disabled = false, order = 0, onClick, className }: AnswerOptionProps) {
  const isEliminated = state === 'eliminated'
  return (
    <button
      type="button"
      role="radio"
      aria-checked={state === 'selected' || state === 'oops' || undefined}
      className={['lp-answer', `lp-answer--${layout}`, state !== 'idle' && `is-${state}`, className].filter(Boolean).join(' ')}
      disabled={disabled || isEliminated}
      onClick={onClick}
      style={{ '--answer-delay': `${order * 40}ms` } as CSSProperties}
    >
      {keyLabel && (
        <Kbd className="lp-answer__key" alwaysVisible>
          {keyLabel}
        </Kbd>
      )}
      <span className="lp-answer__text">
        <span className="lp-answer__label">{children}</span>
        {sublabel && <span className="lp-answer__sub">{sublabel}</span>}
      </span>
      {state === 'correct' && <Icon name="check" size={20} strokeWidth={3} className="lp-answer__mark" />}
      {state === 'oops' && <Icon name="close" size={18} strokeWidth={3} className="lp-answer__mark" />}
    </button>
  )
}
