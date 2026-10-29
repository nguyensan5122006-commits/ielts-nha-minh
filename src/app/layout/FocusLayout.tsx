/**
 * FocusLayout.tsx — KHUNG TOÀN MÀN HÌNH CHO BÀI HỌC / BÀI THI (không sidebar)
 * ----------------------------------------------------------------------------
 *   <FocusLayout
 *     onExit={saveAndLeave}                                  // nút "Lưu & thoát" (và phím Esc)
 *     progress={<ProgressBar value={step} max={total} valueText={`${step}/${total}`} label="Tiến độ bài" />}
 *     trailing={<Timer secondsLeft={left} />}                 // tuỳ chọn: đồng hồ, tim…
 *   >
 *     …câu hỏi…
 *   </FocusLayout>
 *
 * Spec mục 6: màn học/thi toàn màn, thanh trên CHỈ có nút thoát (tự lưu),
 * thanh tiến độ và nút âm thanh — để người học tập trung.
 * Nội dung đặt giữa, rộng tối đa 760px (width="wide" -> 1080px cho Reading 2 cột).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { Button } from '../../design-system/components/Button'
import { SoundToggle } from '../../design-system/components/SoundToggle'
import { useDsText } from '../../design-system/design-system-text'
import './FocusLayout.css'

export interface FocusLayoutProps {
  /** bấm "Lưu & thoát" (hoặc Esc). Trang tự lưu rồi điều hướng đi. */
  onExit: () => void
  /** chữ trên nút thoát (mặc định "Lưu & thoát") */
  exitLabel?: string
  /** ô tiến độ giữa thanh trên (thường là <ProgressBar/>) */
  progress?: ReactNode
  /** phần bên phải thanh trên, trước nút âm thanh (đồng hồ, tim…) */
  trailing?: ReactNode
  /** chiều rộng vùng nội dung: normal 760px · wide 1080px · full (tràn màn, VD phòng thi 2 cột) */
  width?: 'normal' | 'wide' | 'full'
  /** phím Esc = thoát (mặc định có). Tắt nếu trang tự xử lý Esc */
  exitOnEscape?: boolean
  /** thanh đáy cố định (nút Kiểm tra, Bỏ qua…) hoặc <Sheet/> phản hồi */
  footer?: ReactNode
  children: ReactNode
}

export function FocusLayout({ onExit, exitLabel, progress, trailing, width = 'normal', exitOnEscape = true, footer, children }: FocusLayoutProps) {
  const dsText = useDsText()
  const onExitRef = useRef(onExit)
  onExitRef.current = onExit

  useEffect(() => {
    if (!exitOnEscape) return
    const onKey = (event: KeyboardEvent) => {
      // Esc trong ô nhập chữ thì không thoát (người dùng có thể chỉ muốn bỏ chọn)
      const target = event.target as HTMLElement
      if (event.key !== 'Escape' || event.defaultPrevented || target.closest('input, textarea, [role="dialog"]')) return
      onExitRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [exitOnEscape])

  return (
    <div className={`focus-layout focus-layout--${width}`}>
      <header className="focus-layout__bar">
        <Button variant="ghost" size="sm" iconLeft="exit" onClick={onExit} className="focus-layout__exit">
          {exitLabel ?? dsText('saveAndExit')}
        </Button>
        <div className="focus-layout__progress">{progress}</div>
        <div className="focus-layout__trailing">
          {trailing}
          <SoundToggle />
        </div>
      </header>
      <main className="focus-layout__content" id="main-content">
        {children}
      </main>
      {footer && <div className="focus-layout__footer">{footer}</div>}
    </div>
  )
}
