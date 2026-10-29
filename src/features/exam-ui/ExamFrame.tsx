/**
 * ExamFrame.tsx — KHUNG TOÀN MÀN HÌNH CỦA 1 BÀI THI / TASK KỸ NĂNG
 * ----------------------------------------------------------------------------
 *   <ExamFrame
 *     display={display}                       // từ useExamDisplay() — tương phản + cỡ chữ
 *     title="Section 1: Form completion" skill="listening"
 *     badge={<ModeBadge mode="exam" />}
 *     timer={<CalmExamTimer … />} tone={tone}  // header đổi màu nhẹ ở 5 phút / 1 phút cuối
 *     tools={<NotesToggle … />}
 *     onExit={saveAndExit}
 *     aside={notesOpen ? <NotesPanel … /> : null}
 *     footer={<QuestionNavigator … />}>
 *     …nội dung (thường là <SplitPane>)…
 *   </ExamFrame>
 *
 * Bố cục (04-DESIGN-SYSTEM mục 6 + 13): header tối giản 60px (thoát · tên bài · đồng hồ · công cụ),
 * thân chiếm hết phần còn lại, thanh câu hỏi dưới đáy, cột ghi chú bên phải đẩy nội dung.
 * KHÔNG có mascot trong phòng thi. Chiều cao = 100dvh (đổi bằng biến CSS --exam-frame-height).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../design-system/components/Icon'
import type { TimerTone } from './CalmExamTimer'
import { ExamDisplaySettings, type ExamDisplay } from './ExamDisplaySettings'
import { useExamUiText } from './exam-ui-text'
import './ExamFrame.css'

export interface ExamFrameProps {
  display: ExamDisplay
  /**
   * 'standalone' (mặc định): khung tự có header + nút thoát (phòng thi).
   * 'embedded': nằm TRONG FocusLayout của trình học (đã có thanh trên + nút thoát) ->
   *   header thành "dải task" mảnh (tên bài · đồng hồ · công cụ), không có nút thoát thứ 2,
   *   và khung tự giãn vừa phần màn hình còn lại dưới thanh trên.
   */
  variant?: 'standalone' | 'embedded'
  title: string
  /** màu nhấn theo kỹ năng */
  skill?: 'listening' | 'reading' | 'writing' | 'speaking'
  /** nhãn chế độ (Luyện tập / Thi thật) */
  badge?: ReactNode
  timer?: ReactNode
  tone?: TimerTone
  /** nút công cụ thêm trên header (VD Ghi chú) — nút "Aa Hiển thị" luôn có sẵn */
  tools?: ReactNode
  /** chữ trạng thái nhỏ (VD "Đã lưu", "Đang phát đoạn 2") */
  status?: ReactNode
  /** chỉ dùng ở 'standalone' */
  onExit?: () => void
  exitLabel?: string
  aside?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
}

export function ExamFrame({ display, variant = 'standalone', title, skill, badge, timer, tone = 'calm', tools, status, onExit, exitLabel, aside, footer, children, className }: ExamFrameProps) {
  const text = useExamUiText()
  const embedded = variant === 'embedded'
  return (
    <div className={['xf', `xf--${variant}`, skill && `xf--${skill}`, className].filter(Boolean).join(' ')} {...display.rootProps}>
      <header className={`xf-header xf-header--${tone}`}>
        <div className="xf-header__start">
          {!embedded && onExit && (
            <>
              <button type="button" className="xf-tool xf-tool--exit" onClick={onExit}>
                <Icon name="exit" size={18} />
                <span className="xf-tool__label">{exitLabel ?? text('saveAndExit')}</span>
              </button>
              <span className="xf-header__divider" aria-hidden />
            </>
          )}
          <span className="xf-header__skill-dot" aria-hidden />
          <h1 className="xf-header__title" title={title}>
            {title}
          </h1>
          {badge}
        </div>
        <div className="xf-header__center">{timer}</div>
        <div className="xf-header__end">
          {status && <span className="xf-header__status">{status}</span>}
          {tools}
          <ExamDisplaySettings display={display} />
        </div>
      </header>
      <div className={aside ? 'xf-body has-aside' : 'xf-body'}>
        <main className="xf-main">{children}</main>
        {aside}
      </div>
      {footer}
    </div>
  )
}

/** Icon bút ghi chú (bộ Icon chung chưa có) */
export function NoteIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" />
      <path d="m13.5 6.5 4 4" />
    </svg>
  )
}

/** Nút công cụ dạng viên trên header (icon + nhãn ngắn). */
export function FrameTool({ icon, label, onClick, pressed, count }: { icon: IconName | ReactNode; label: string; onClick: () => void; pressed?: boolean; count?: number }) {
  return (
    <button type="button" className="xf-tool" aria-pressed={pressed} aria-label={count ? `${label} (${count})` : label} title={label} onClick={onClick}>
      {typeof icon === 'string' ? <Icon name={icon as IconName} size={18} /> : icon}
      <span className="xf-tool__label">{label}</span>
      {count !== undefined && count > 0 && <span className="xf-tool__count">{count}</span>}
    </button>
  )
}

/**
 * Nhãn chế độ: Luyện tập (kem) / Thi thật (navy) / Kiểm tra (navy — bài test cuối level:
 * nghiêm túc nhưng KHÔNG phải "thi thật" IELTS, chữ "Thi thật" chỉ dành cho đề thi thử bấm giờ).
 */
export function ModeBadge({ mode }: { mode: 'practice' | 'exam' | 'test' }) {
  const text = useExamUiText()
  const label = mode === 'exam' ? 'examMode' : mode === 'test' ? 'testMode' : 'practiceMode'
  return <span className={`xf-mode xf-mode--${mode === 'practice' ? 'practice' : 'exam'}`}>{text(label)}</span>
}
