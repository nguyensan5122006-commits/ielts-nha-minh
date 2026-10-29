/**
 * FocusOverlay.tsx — MÀN TẬP TRUNG TOÀN MÀN HÌNH (phiên ôn thẻ, lượt sửa câu sai)
 * ----------------------------------------------------------------------------
 *   <FocusOverlay
 *     exitLabel="Lưu & thoát" onExit={close}
 *     progress={{ value: 3, max: 12, label: 'Tiến độ phiên ôn', text: '3/12' }}
 *   >
 *     …nội dung (tự cuộn nếu dài)…
 *   </FocusOverlay>
 *
 * Spec 04-DESIGN-SYSTEM mục 6: "Màn học/thi: toàn màn, không sidebar; thanh trên chỉ có
 * nút thoát (tự lưu), thanh tiến độ, và nút âm thanh". Mọi thao tác đã được lưu ngay
 * nên thoát lúc nào cũng an toàn. Phím Esc = thoát.
 * Khoá cuộn trang phía sau trong lúc mở; trả con trỏ bàn phím về chỗ cũ khi đóng.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Kbd } from '../../../design-system/components/Kbd'
import { ProgressBar } from '../../../design-system/components/ProgressBar'
import { SoundToggle } from '../../../design-system/components/SoundToggle'
import './focus-overlay.css'

export interface FocusOverlayProps {
  exitLabel: string
  onExit: () => void
  /** thanh tiến độ ở giữa thanh trên (bỏ trống = không có, VD màn kết thúc) */
  progress?: { value: number; max: number; label: string; text?: string }
  /** nội dung thêm bên phải thanh trên (VD "Đã sửa 3") */
  topRight?: ReactNode
  /** nhãn cho trình đọc màn hình (VD "Phiên ôn thẻ") */
  ariaLabel: string
  children: ReactNode
}

export function FocusOverlay({ exitLabel, onExit, progress, topRight, ariaLabel, children }: FocusOverlayProps) {
  const previousFocus = useRef<Element | null>(null)

  useEffect(() => {
    previousFocus.current = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      if (previousFocus.current instanceof HTMLElement) previousFocus.current.focus()
    }
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onExit()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onExit])

  return (
    <div className="focus-overlay" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <header className="focus-overlay__bar">
        <Button variant="ghost" size="sm" iconLeft="exit" onClick={onExit} className="focus-overlay__exit">
          {exitLabel}
          <Kbd>Esc</Kbd>
        </Button>
        <div className="focus-overlay__progress">
          {progress && <ProgressBar value={progress.value} max={progress.max} label={progress.label} valueText={progress.text} />}
        </div>
        <div className="focus-overlay__right">
          {topRight}
          <SoundToggle />
        </div>
      </header>
      <div className="focus-overlay__content">{children}</div>
    </div>
  )
}
