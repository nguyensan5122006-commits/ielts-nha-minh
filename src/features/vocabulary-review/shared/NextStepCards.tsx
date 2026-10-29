/**
 * NextStepCards.tsx — 3 THẺ "BƯỚC TIẾP THEO" Ở CUỐI PHIÊN (ý tưởng Seneca "Amelia recommends")
 * ----------------------------------------------------------------------------
 *   <NextStepCards
 *     title="Ki gợi ý bước tiếp theo"
 *     steps={[
 *       { id: 'mistakes', icon: <Icon name="review" />, title: 'Ôn lại 3 câu sai', meta: 'khoảng 2 phút', onClick: … },
 *       { id: 'learn',    icon: …, title: 'Học tiếp', meta: 'Bài 4: …', to: '/lesson/…' },
 *       { id: 'done',     icon: …, title: 'Xong hôm nay', meta: 'Nghỉ ngơi', to: '/learn' },
 *     ]}
 *   />
 *
 * Không có ngõ cụt: thẻ ĐẦU là hành động chính (viền cam, phím Enter), 2 thẻ sau là lựa chọn
 * khác — "Xong hôm nay" luôn có mặt và KHÔNG bị làm mờ (psych-adult D5 luật 21).
 * ----------------------------------------------------------------------------
 */
import { useEffect, type CSSProperties, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'

export interface NextStep {
  id: string
  icon: ReactNode
  title: string
  meta: string
  /** link nội bộ */
  to?: string
  /** hoặc hành động */
  onClick?: () => void
  /** màu nhấn của thẻ (mặc định: thẻ đầu cam, còn lại navy) */
  accent?: string
}

export interface NextStepCardsProps {
  title: string
  steps: NextStep[]
  /** Enter = bấm thẻ đầu (mặc định có) */
  enterForFirst?: boolean
}

export function NextStepCards({ title, steps, enterForFirst = true }: NextStepCardsProps) {
  const navigate = useNavigate()
  const run = (step: NextStep) => (step.onClick ? step.onClick() : step.to ? navigate(step.to) : undefined)

  useEffect(() => {
    if (!enterForFirst || !steps[0]) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement) return
      event.preventDefault()
      run(steps[0])
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps, enterForFirst])

  return (
    <section className="next-steps" aria-label={title}>
      <h2 className="next-steps__title">{title}</h2>
      <div className="next-steps__grid">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            className={`next-step${index === 0 ? ' is-primary' : ''}`}
            style={step.accent ? ({ '--step-accent': step.accent } as CSSProperties) : undefined}
            onClick={() => run(step)}
          >
            <span className="next-step__icon" aria-hidden>
              {step.icon}
            </span>
            <span className="next-step__text">
              <span className="next-step__title">{step.title}</span>
              <span className="next-step__meta">{step.meta}</span>
            </span>
            <span className="next-step__go" aria-hidden>
              {index === 0 && enterForFirst ? <Kbd>Enter</Kbd> : <Icon name="arrow-right" size={20} />}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
