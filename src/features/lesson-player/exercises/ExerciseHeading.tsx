/**
 * ExerciseHeading.tsx — DÒNG HƯỚNG DẪN NHỎ + CÂU HỎI LỚN ĐẦU MỖI BÀI TẬP
 * ----------------------------------------------------------------------------
 *   <ExerciseHeading icon="volume">Nghe rồi chọn đáp án</ExerciseHeading>
 *   <PromptText text={exercise.question} />
 *
 * Câu hỏi 24px Baloo 2 (spec 04 mục 8). Câu hỏi dài (> 90 ký tự) tự nhỏ lại
 * một bậc để không chiếm cả màn hình. Giữ xuống dòng của nội dung (pre-line).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../../design-system/components/Icon'

export function ExerciseHeading({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <p className="lp-instruction">
      <span className="lp-instruction__icon" aria-hidden>
        <Icon name={icon} size={15} strokeWidth={2.4} />
      </span>
      {children}
    </p>
  )
}

export function PromptText({ text, compact = false }: { text: string; compact?: boolean }) {
  const isLong = text.length > 90
  return <h2 className={['lp-prompt', isLong && 'lp-prompt--long', compact && 'lp-prompt--compact'].filter(Boolean).join(' ')}>{text}</h2>
}
