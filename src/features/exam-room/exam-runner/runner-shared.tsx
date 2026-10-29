/**
 * runner-shared.tsx — MẢNH NHỎ DÙNG CHUNG CỦA CÁC PHẦN THI (Nghe/Đọc, Viết, Nói)
 * ----------------------------------------------------------------------------
 *   <ExitDialog …/>          hộp thoại "Ra khỏi phòng thi?" (bình tĩnh, nói rõ đã lưu)
 *   <SaveStatus state />      chữ nhỏ "Đang lưu… / Đã lưu" trên header
 *   useSpentSeconds(...)     cộng dồn thời gian làm thật của 1 phần (chỉ khi tab đang hiện)
 *   focusQuestion(id)        cuộn tới câu + đặt con trỏ vào ô / phương án của câu đó
 *   useUnloadWarning(on)     hỏi lại khi lỡ tay đóng tab giữa giờ thi
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Modal } from '../../../design-system/components/Modal'
import { useExamRoomText } from '../exam-room-text'
import type { ExamSessionHandle, SaveState } from '../exam-session'

export function ExitDialog({ open, onStay, onLeave, timed, audio }: { open: boolean; onStay: () => void; onLeave: () => void; timed?: boolean; audio?: boolean }) {
  const text = useExamRoomText()
  return (
    <Modal
      open={open}
      onClose={onStay}
      size="sm"
      title={text('exitTitle')}
      footer={
        <>
          <Button variant="secondary" onClick={onLeave} iconLeft="exit">
            {text('leave')}
          </Button>
          <Button onClick={onStay}>{text('stay')}</Button>
        </>
      }
    >
      <p className="xr-dialog-text">{text('exitText')}</p>
      {(timed || audio) && (
        <ul className="xr-dialog-list">
          {timed && <li>{text('exitTimerNote')}</li>}
          {audio && <li>{text('exitAudioNote')}</li>}
        </ul>
      )}
    </Modal>
  )
}

export function SaveStatus({ state }: { state: SaveState }) {
  const text = useExamRoomText()
  if (state === 'local-error') {
    return (
      <span className="xr-save is-error">
        <Icon name="clock" size={13} /> {text('saveLocalError')}
      </span>
    )
  }
  return (
    <span className={state === 'saving' ? 'xr-save is-saving' : 'xr-save'}>
      <Icon name={state === 'saving' ? 'clock' : 'check'} size={13} strokeWidth={2.6} /> {text(state === 'saving' ? 'saving' : 'saved')}
    </span>
  )
}

/** Mỗi 5 giây (khi tab đang hiện) cộng 5 giây vào thời gian làm của phần `sectionIndex`. */
export function useSpentSeconds(handle: ExamSessionHandle, sectionIndex: number, running = true) {
  const { update } = handle
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      update((current) => ({ spentSeconds: { ...current.spentSeconds, [sectionIndex]: (current.spentSeconds[sectionIndex] ?? 0) + 5 } }), false, true)
    }, 5000)
    return () => window.clearInterval(id)
  }, [update, sectionIndex, running])
}

/** Cuộn tới câu hỏi (id phần tử "xq-<id>" do ExamQuestionList đặt) và đặt con trỏ vào đó. */
export function focusQuestion(questionId: string, behavior: 'smooth' | 'auto' = 'smooth') {
  // chờ 2 khung hình: màn Part mới có thể vừa được vẽ lại
  window.requestAnimationFrame(() =>
    window.requestAnimationFrame(() => {
      const element = document.getElementById(`xq-${questionId}`)
      if (!element) return
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      element.scrollIntoView({ behavior: reduceMotion ? 'auto' : behavior, block: 'center' })
      element.querySelector<HTMLElement>('input:checked, input:not([disabled]):not([readonly]), textarea, button')?.focus({ preventScroll: true })
    }),
  )
}

/** Hỏi lại khi đóng tab giữa giờ thi (câu trả lời vẫn đã lưu, nhưng đồng hồ / audio sẽ dừng). */
export function useUnloadWarning(active: boolean) {
  useEffect(() => {
    if (!active) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [active])
}
