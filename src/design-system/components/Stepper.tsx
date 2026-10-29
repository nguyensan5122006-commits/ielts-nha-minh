/**
 * Stepper.tsx — CHỈ BÁO "ĐANG Ở BƯỚC MẤY"
 * ----------------------------------------------------------------------------
 *   <Stepper total={5} current={1} />                               // thanh chia đoạn (onboarding 1 câu/màn)
 *   <Stepper variant="numbered" current={0} steps={['Chọn mục tiêu', 'Làm bài xếp lớp', 'Tạo tài khoản']} />
 *   <Stepper variant="dots" total={4} current={2} />
 *
 * current đếm từ 0. Bước trước `current` = đã xong, bước `current` = đang làm.
 * ----------------------------------------------------------------------------
 */
import { useDsText } from '../design-system-text'
import { Icon } from './Icon'
import './Stepper.css'

export interface StepperProps {
  /** bước đang làm (đếm từ 0) */
  current: number
  /** tổng số bước (bỏ trống nếu đã truyền steps) */
  total?: number
  /** tên các bước (variant numbered hiện chữ này) */
  steps?: string[]
  /** segments = thanh chia đoạn (mặc định) · dots = chấm tròn · numbered = vòng số + tên bước */
  variant?: 'segments' | 'dots' | 'numbered'
  className?: string
}

export function Stepper({ current, total, steps, variant = 'segments', className }: StepperProps) {
  const dsText = useDsText()
  const count = steps?.length ?? total ?? 0
  const items = Array.from({ length: count }, (_, index) => ({
    index,
    label: steps?.[index],
    state: index < current ? 'done' : index === current ? 'current' : 'todo',
  }))

  return (
    <ol className={['ds-stepper', `ds-stepper--${variant}`, className].filter(Boolean).join(' ')} aria-label={dsText('stepOf', { current: Math.min(current + 1, count), total: count })}>
      {items.map((item) => (
        <li key={item.index} className={`ds-stepper__step is-${item.state}`} aria-current={item.state === 'current' ? 'step' : undefined}>
          {variant === 'numbered' && (
            <>
              <span className="ds-stepper__marker">{item.state === 'done' ? <Icon name="check" size={16} strokeWidth={3} /> : item.index + 1}</span>
              {item.label && <span className="ds-stepper__label">{item.label}</span>}
            </>
          )}
          {variant !== 'numbered' && item.label && <span className="ds-visually-hidden">{item.label}</span>}
        </li>
      ))}
    </ol>
  )
}
