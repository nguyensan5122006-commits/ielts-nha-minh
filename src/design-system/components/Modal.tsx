/**
 * Modal.tsx — HỘP THOẠI NỔI GIỮA MÀN HÌNH (có chỗ cho mascot ló đầu)
 * ----------------------------------------------------------------------------
 *   <Modal
 *     open={askSubmit}
 *     onClose={() => setAskSubmit(false)}
 *     title="Còn 2 câu bỏ trống"
 *     mascotPose="surprised"
 *     footer={<>
 *       <Button variant="secondary" onClick={submit}>Vẫn nộp</Button>
 *       <Button onClick={() => setAskSubmit(false)}>Ở lại làm tiếp</Button>
 *     </>}
 *   >
 *     Bạn có chắc muốn nộp bài không?
 *   </Modal>
 *
 * Trợ năng (người dùng bàn phím / trình đọc màn hình):
 *   - Esc để đóng · Tab chỉ chạy vòng trong hộp thoại (không lọt ra trang phía sau)
 *   - Mở ra: con trỏ vào phần tử đầu tiên bấm được; đóng: trả con trỏ về chỗ cũ
 *   - Trang phía sau không cuộn được khi hộp thoại đang mở
 * ----------------------------------------------------------------------------
 */
import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDsText } from '../design-system-text'
import { IconButton } from './IconButton'
import { Mascot, type MascotPose } from './Mascot'
import './Modal.css'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  children?: ReactNode
  /** hàng nút ở đáy (nút chính đặt CUỐI để nằm bên phải) */
  footer?: ReactNode
  /** pose mascot ló đầu trên mép hộp thoại (bỏ trống = không có mascot) */
  mascotPose?: MascotPose
  /** sm 400px · md 520px (mặc định) · lg 720px */
  size?: 'sm' | 'md' | 'lg'
  /** bấm ra ngoài để đóng (mặc định có) */
  closeOnBackdrop?: boolean
  /** ẩn nút X góc trên */
  hideCloseButton?: boolean
}

/** Các phần tử có thể nhận con trỏ bàn phím */
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, title, children, footer, mascotPose, size = 'md', closeOnBackdrop = true, hideCloseButton = false }: ModalProps) {
  const dsText = useDsText()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    // đưa con trỏ vào hộp thoại (ưu tiên phần tử có data-autofocus)
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE)
    ;(first ?? panel)?.focus()

    // khoá cuộn trang phía sau
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panel) return
      // "Bẫy" phím Tab: tới cuối thì quay về đầu và ngược lại
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
      if (items.length === 0) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="ds-modal-backdrop" onMouseDown={(event) => closeOnBackdrop && event.target === event.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={['ds-modal', `ds-modal--${size}`, mascotPose && 'has-mascot'].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        {mascotPose && <Mascot pose={mascotPose} placement="peek-top" size={124} peekDelayMs={180} style={{ '--mascot-x': '32px' } as CSSProperties} />}
        <div className="ds-modal__header">
          <h2 id={titleId} className="ds-modal__title">
            {title}
          </h2>
          {!hideCloseButton && <IconButton icon="close" label={dsText('close')} variant="ghost" size="sm" onClick={onClose} />}
        </div>
        {children !== undefined && <div className="ds-modal__body">{children}</div>}
        {footer && <div className="ds-modal__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
