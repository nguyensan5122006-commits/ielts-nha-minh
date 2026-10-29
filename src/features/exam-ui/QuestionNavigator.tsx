/**
 * QuestionNavigator.tsx — THANH CÂU HỎI DƯỚI ĐÁY (giống máy thi IELTS)
 * ----------------------------------------------------------------------------
 *   <QuestionNavigator
 *     parts={[{ id: 'p1', label: 'Đoạn 1', questions: [{ id, number: 1, answered: true, flagged: false }] }]}
 *     currentId={currentId}
 *     onSelect={goTo}
 *     onPrev={prev} onNext={next}
 *     primaryAction={{ label: 'Kiểm tra & nộp', onClick: openReview }} />
 *
 * Mỗi số câu cho biết 3 điều trong 1 ô nhỏ:
 *   - vạch 3px phía trên: xám = chưa làm, xanh = đã làm
 *   - viền navy = câu đang xem
 *   - cờ đỏ nhỏ góc phải = đã gắn cờ "xem lại sau"
 * Khi xem kết quả (result): ô tô xanh ✓ / cam san hô ✗.
 * Part đang xem mở ra các số câu; part khác thu gọn thành "Đoạn 2 · 1/3".
 * Nút Trước/Sau nằm TRONG thanh (không đè lên câu hỏi như máy thi thật).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Button } from '../../design-system/components/Button'
import { Icon, type IconName } from '../../design-system/components/Icon'
import { IconButton } from '../../design-system/components/IconButton'
import { useExamUiText } from './exam-ui-text'
import './QuestionNavigator.css'

export interface NavigatorQuestion {
  id: string
  number: number
  answered: boolean
  flagged?: boolean
  /** chỉ có ở màn kết quả */
  result?: 'correct' | 'incorrect'
}

export interface NavigatorPart {
  id: string
  label: string
  questions: NavigatorQuestion[]
}

export interface QuestionNavigatorProps {
  parts: NavigatorPart[]
  currentId: string | null
  onSelect: (questionId: string) => void
  onPrev?: () => void
  onNext?: () => void
  /** nút chính bên phải (VD "Kiểm tra & nộp", "Tiếp tục") */
  primaryAction?: { label: string; onClick: () => void; icon?: IconName; disabled?: boolean }
  /** nội dung phụ bên trái nút chính (VD "Đã làm 7/12") */
  extra?: ReactNode
}

export function QuestionNavigator({ parts, currentId, onSelect, onPrev, onNext, primaryAction, extra }: QuestionNavigatorProps) {
  const text = useExamUiText()
  const currentPartId = parts.find((part) => part.questions.some((q) => q.id === currentId))?.id ?? parts[0]?.id

  const describe = (question: NavigatorQuestion) =>
    [
      text('questionStatus', { n: question.number }),
      question.result ? text(question.result === 'correct' ? 'statusCorrect' : 'statusIncorrect') : text(question.answered ? 'statusAnswered' : 'statusBlank'),
      question.flagged && text('statusFlagged'),
      question.id === currentId && text('statusCurrent'),
    ]
      .filter(Boolean)
      .join(', ')

  return (
    <nav className="xnav" aria-label={text('questionNavigator')}>
      <div className="xnav__parts">
        {parts.map((part) => {
          const done = part.questions.filter((q) => (q.result ? q.result === 'correct' : q.answered)).length
          const isCurrent = part.id === currentPartId
          const complete = !part.questions.some((q) => q.result) && done === part.questions.length
          if (!isCurrent) {
            return (
              <button key={part.id} type="button" className="xnav__part xnav__part--collapsed" onClick={() => part.questions[0] && onSelect(part.questions[0].id)}>
                {complete && <Icon name="check" size={14} strokeWidth={3} className="xnav__part-check" />}
                <span className="xnav__part-label">{part.label}</span>
                <span className="xnav__part-count">{text('partProgress', { done, total: part.questions.length })}</span>
              </button>
            )
          }
          return (
            <div key={part.id} className="xnav__part xnav__part--open">
              {parts.length > 1 && <span className="xnav__part-label">{part.label}</span>}
              <ol className="xnav__numbers">
                {part.questions.map((question) => {
                  const classes = [
                    'xnav__num',
                    question.answered && 'is-answered',
                    question.id === currentId && 'is-current',
                    question.flagged && 'is-flagged',
                    question.result && `is-${question.result}`,
                  ]
                    .filter(Boolean)
                    .join(' ')
                  return (
                    <li key={question.id}>
                      <button type="button" className={classes} aria-label={describe(question)} aria-current={question.id === currentId ? 'step' : undefined} onClick={() => onSelect(question.id)}>
                        {question.number}
                        {question.flagged && <span className="xnav__flag" aria-hidden />}
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        })}
      </div>
      <div className="xnav__actions">
        {extra && <span className="xnav__extra">{extra}</span>}
        {onPrev && <IconButton icon={<Icon name="chevron-right" size={20} className="xnav__prev-icon" />} label={text('previousQuestion')} size="sm" onClick={onPrev} />}
        {onNext && <IconButton icon="chevron-right" label={text('nextQuestion')} size="sm" onClick={onNext} />}
        {primaryAction && (
          <Button size="sm" variant="navy" iconLeft={primaryAction.icon ?? 'check'} onClick={primaryAction.onClick} disabled={primaryAction.disabled}>
            {primaryAction.label}
          </Button>
        )}
      </div>
    </nav>
  )
}
