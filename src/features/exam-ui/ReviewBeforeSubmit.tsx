/**
 * ReviewBeforeSubmit.tsx — MÀN "KIỂM TRA TRƯỚC KHI NỘP" (ý tưởng Magoosh "Review Section")
 * ----------------------------------------------------------------------------
 *   <ReviewBeforeSubmit open={open} onClose={close} onSubmit={submit}
 *     onJump={(id) => { close(); goTo(id) }} parts={navigatorParts} examMode />
 *
 * Liệt kê tất cả số câu (đã làm / bỏ trống / gắn cờ), nói rõ câu nào còn trống,
 * nhắc "IELTS không trừ điểm câu sai — cứ đoán". 2 nút: "Làm tiếp" (phụ) + "Nộp bài" (chính).
 * Bấm 1 số câu -> đóng hộp và nhảy tới câu đó.
 * ----------------------------------------------------------------------------
 */
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { Modal } from '../../design-system/components/Modal'
import { useExamUiText } from './exam-ui-text'
import type { NavigatorPart } from './QuestionNavigator'
import './ReviewBeforeSubmit.css'

export interface ReviewBeforeSubmitProps {
  open: boolean
  onClose: () => void
  onSubmit: () => void
  onJump: (questionId: string) => void
  parts: NavigatorPart[]
  /** thi thật: nhắc "nộp rồi không sửa được" */
  examMode?: boolean
}

export function ReviewBeforeSubmit({ open, onClose, onSubmit, onJump, parts, examMode = false }: ReviewBeforeSubmitProps) {
  const text = useExamUiText()
  const all = parts.flatMap((part) => part.questions)
  const blank = all.filter((q) => !q.answered)
  const flagged = all.filter((q) => q.flagged)

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={text('reviewTitle')}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {text('keepWorking')}
          </Button>
          <Button variant="primary" iconLeft="check" onClick={onSubmit}>
            {text('submit')}
          </Button>
        </>
      }
    >
      <div className="xreview">
        <div className="xreview__badges">
          <Badge tone="success" icon="check">
            {text('reviewAnswered', { done: all.length - blank.length, total: all.length })}
          </Badge>
          {blank.length > 0 && <Badge tone="oops">{text('reviewBlank', { n: blank.length })}</Badge>}
          {flagged.length > 0 && (
            <Badge tone="red" icon="flag">
              {text('reviewFlagged', { n: flagged.length })}
            </Badge>
          )}
        </div>

        {parts.map((part) => (
          <div key={part.id} className="xreview__part">
            {parts.length > 1 && <p className="xreview__part-label">{part.label}</p>}
            <ol className="xreview__grid">
              {part.questions.map((question) => (
                <li key={question.id}>
                  <button
                    type="button"
                    className={['xreview__num', question.answered ? 'is-answered' : 'is-blank', question.flagged && 'is-flagged'].filter(Boolean).join(' ')}
                    onClick={() => onJump(question.id)}
                    aria-label={`${text('questionStatus', { n: question.number })}: ${text(question.answered ? 'statusAnswered' : 'statusBlank')}${question.flagged ? `, ${text('statusFlagged')}` : ''}`}
                  >
                    {question.number}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}

        <ul className="xreview__notes">
          {blank.length > 0 ? (
            <>
              <li>{text('reviewBlankList', { list: blank.map((q) => q.number).join(', ') })}</li>
              <li>{text('reviewNoPenalty')}</li>
            </>
          ) : (
            <li>{text('reviewAllDone')}</li>
          )}
          {flagged.length > 0 && <li>{text('reviewFlaggedList', { list: flagged.map((q) => q.number).join(', ') })}</li>}
          {examMode && <li>{text('reviewFinal')}</li>}
        </ul>
      </div>
    </Modal>
  )
}
