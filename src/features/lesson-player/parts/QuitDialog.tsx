/**
 * QuitDialog.tsx — HỘP THOẠI THOÁT BÌNH TĨNH "Đã lưu chỗ bạn đang học"
 * ----------------------------------------------------------------------------
 * Mở bằng phím Esc hoặc nút "Thoát" trên thanh trên.
 * Luật (spec 04 cuối file + psych-adult A10): KHÔNG mascot khóc, KHÔNG doạ mất
 * tiến độ, KHÔNG ép ở lại. 2 nút ngang hàng: "Lưu & thoát" · "Học tiếp".
 * Esc lần nữa (hoặc bấm ra ngoài) = đóng hộp thoại, học tiếp.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../../design-system/components/Button'
import { Modal } from '../../../design-system/components/Modal'
import { useLessonText } from '../lesson-player-text'
import { LessonGlyph } from './LessonGlyph'

interface QuitDialogProps {
  open: boolean
  /** số thứ tự câu đang làm (để nói "bạn sẽ học tiếp từ câu N"); null = đang ở thẻ dạy */
  questionNumber: number | null
  saving: boolean
  onStay: () => void
  onLeave: () => void
}

export function QuitDialog({ open, questionNumber, saving, onStay, onLeave }: QuitDialogProps) {
  const text = useLessonText()
  return (
    <Modal
      open={open}
      onClose={onStay}
      size="md"
      title={
        <span className="lp-quit__title">
          <span className="lp-quit__badge" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12.5 4.2 4.2L19 7" />
            </svg>
          </span>
          {text.quitTitle}
        </span>
      }
      footer={
        <>
          <Button variant="secondary" onClick={onLeave} loading={saving} iconLeft="exit">
            {text.saveAndExit}
          </Button>
          <Button onClick={onStay} data-autofocus>
            {text.keepLearning}
          </Button>
        </>
      }
    >
      <p className="lp-quit__text">
        <LessonGlyph name="replay" size={18} />
        <span>{questionNumber ? text.quitText(questionNumber) : text.quitTextCards}</span>
      </p>
    </Modal>
  )
}
