/**
 * Sheet.tsx — KHUNG TRƯỢT LÊN TỪ ĐÁY (khung phản hồi sau khi "Kiểm tra")
 * ----------------------------------------------------------------------------
 *   <Sheet
 *     open={checked}
 *     tone={isRight ? 'success' : 'oops'}
 *     title={isRight ? 'Chính xác!' : 'Chưa đúng — đáp án: reads'}
 *     mascotPose={isRight ? 'happy' : 'comfort'}
 *     primaryAction={{ label: 'Tiếp tục', onClick: next }}
 *     secondaryActions={<Button variant="ghost" size="sm" iconLeft="hint">Hỏi AI vì sao</Button>}
 *     onReport={() => openReport()}
 *   >
 *     "every morning" là dấu hiệu thì hiện tại đơn.
 *   </Sheet>
 *
 * Nhịp chuyển động (spec mục 4, học từ Mochi): khung trượt lên 180ms → 350ms sau
 * đầu mascot mới ló lên mép khung (mắt đọc màu trước, cảm xúc sau).
 * Khi mở, con trỏ bàn phím nhảy vào nút chính -> bấm Enter là "Tiếp tục".
 * Sai không tô đỏ chói: dùng màu cam san hô --c-oops.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useRef, type ReactNode } from 'react'
import { useDsText } from '../design-system-text'
import { Button } from './Button'
import { Icon, type IconName } from './Icon'
import { IconButton } from './IconButton'
import { Kbd } from './Kbd'
import { Mascot, type MascotPose } from './Mascot'
import './Sheet.css'

export type SheetTone = 'neutral' | 'success' | 'oops' | 'hint'

export interface SheetProps {
  open: boolean
  /** màu khung: success (đúng) · oops (chưa đúng) · hint (gợi ý) · neutral */
  tone?: SheetTone
  title: ReactNode
  /** phần giải thích "vì sao" (1–3 dòng) */
  children?: ReactNode
  /** nút chính bên phải (có gợi ý phím Enter) */
  primaryAction?: { label: string; onClick: () => void }
  /** các nút phụ (đặt trước nút chính) */
  secondaryActions?: ReactNode
  /** có -> hiện nút cờ "Báo lỗi câu hỏi" */
  onReport?: () => void
  /** nhãn nút cờ (mặc định "Báo lỗi câu hỏi") */
  reportLabel?: string
  /** pose mascot ló đầu (bỏ trống = không có mascot) */
  mascotPose?: MascotPose
  /** fixed = dính đáy màn hình (mặc định) · static = nằm trong luồng trang (trang /design) */
  position?: 'fixed' | 'static'
}

const TONE_ICON: Record<SheetTone, IconName> = {
  success: 'check',
  oops: 'retry',
  hint: 'hint',
  neutral: 'sparkle',
}

export function Sheet({ open, tone = 'neutral', title, children, primaryAction, secondaryActions, onReport, reportLabel, mascotPose, position = 'fixed' }: SheetProps) {
  const dsText = useDsText()
  const titleId = useId()
  const primaryRef = useRef<HTMLDivElement>(null)

  // Mở khung -> đưa con trỏ vào nút chính, để Enter = Tiếp tục
  useEffect(() => {
    if (!open || position === 'static') return
    const button = primaryRef.current?.querySelector('button')
    // đợi khung trượt lên xong một nhịp rồi mới focus (tránh cuộn giật)
    const timer = window.setTimeout(() => button?.focus({ preventScroll: true }), 60)
    return () => window.clearTimeout(timer)
  }, [open, position])

  if (!open) return null

  return (
    <section className={['ds-sheet', `ds-sheet--${tone}`, `ds-sheet--${position}`].join(' ')} role="region" aria-labelledby={titleId} aria-live="polite">
      <div className="ds-sheet__inner">
        {mascotPose && <Mascot pose={mascotPose} placement="peek-top" size={112} peekDelayMs={350} />}
        <div className="ds-sheet__content">
          <div className="ds-sheet__heading">
            <span className="ds-sheet__tone-icon" aria-hidden>
              <Icon name={TONE_ICON[tone]} size={18} strokeWidth={3} />
            </span>
            <h2 id={titleId} className="ds-sheet__title">
              {title}
            </h2>
          </div>
          {children !== undefined && <div className="ds-sheet__body">{children}</div>}
        </div>
        <div className="ds-sheet__actions">
          {onReport && <IconButton icon="flag" label={reportLabel ?? dsText('reportProblem')} variant="plain" size="sm" onClick={onReport} />}
          {secondaryActions}
          {primaryAction && (
            <div ref={primaryRef}>
              <Button size="lg" onClick={primaryAction.onClick} iconRight={<Kbd onColor>Enter</Kbd>}>
                {primaryAction.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
