/**
 * TaskResultSummary.tsx — THẺ KẾT QUẢ ĐẦU MÀN XEM LẠI (Listening / Reading / phòng thi)
 * ----------------------------------------------------------------------------
 *   <TaskResultSummary summary={grade} bandLater
 *     typeName={(id) => …} wentWell="…" improve={['…']}
 *     primary={{ label: 'Tiếp tục', onClick }} secondary={{ label: 'Làm lại câu sai', onClick }} />
 *
 * Thứ tự (psych-adult D5 + research ui-vn-b ý 8): điểm + % câu đúng
 * -> % đúng theo DẠNG câu hỏi -> 1 điều làm tốt + 1–2 việc sửa được -> 2 nút (chính + phụ).
 *
 * KHÔNG hiện band sau 1 task (quyết định 29/10/2026, luật D6.23 trong _research/notes/psych-adult.md):
 * 1 task chỉ 5–13 câu — quá ít để nói band (sai số lớn, dễ làm nản hoặc ảo tưởng). Band chỉ hiện ở
 * /progress khi kỹ năng đã có ≥ 20 câu. `bandLater` = thêm dòng nhắc điều đó (bài track IELTS).
 * Không chữ chê bai; sai = "Chưa đúng" + bước tiếp theo.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../design-system/components/Button'
import { Icon, type IconName } from '../../design-system/components/Icon'
import { ProgressRing } from '../../design-system/components/ProgressRing'
import type { GradeSummary } from './answer-grading'
import { useExamUiText } from './exam-ui-text'
import type { QuestionTypeId } from './question-grouping'
import './TaskResultSummary.css'

export interface TaskResultSummaryProps {
  summary: GradeSummary
  /** Bài IELTS: hiện dòng "Band ước tính sẽ có ở trang Tiến độ khi đủ 20 câu" */
  bandLater?: boolean
  typeName: (typeId: QuestionTypeId) => string
  wentWell?: string | null
  improve?: string[]
  primary: { label: string; onClick: () => void; icon?: IconName }
  secondary?: { label: string; onClick: () => void; icon?: IconName } | null
}

export function TaskResultSummary({ summary, bandLater = false, typeName, wentWell, improve = [], primary, secondary }: TaskResultSummaryProps) {
  const text = useExamUiText()
  const ratio = summary.total ? summary.correct / summary.total : 0
  const percent = Math.round(ratio * 100)
  const ringColor = ratio >= 0.7 ? 'var(--c-success)' : ratio >= 0.4 ? 'var(--c-gold)' : 'var(--c-oops)'

  return (
    <section className="xresult" aria-label={text('resultTitle')}>
      <div className="xresult__top">
        <ProgressRing value={ratio} size={92} color={ringColor} label={text('correctCount', { correct: summary.correct, total: summary.total })}>
          <strong className="xresult__ring-number">{summary.correct}</strong>
          <span className="xresult__ring-total">/{summary.total}</span>
        </ProgressRing>
        <div className="xresult__headline">
          <h2 className="xresult__title">{text('correctCount', { correct: summary.correct, total: summary.total })}</h2>
          <p className="xresult__band">
            <span className="xresult__band-chip">{text('percentCorrect', { p: percent })}</span>
            {bandLater && <span className="xresult__band-note">{text('bandLaterNote')}</span>}
          </p>
        </div>
        <div className="xresult__actions">
          {secondary && (
            <Button variant="secondary" iconLeft={secondary.icon ?? 'review'} onClick={secondary.onClick}>
              {secondary.label}
            </Button>
          )}
          <Button iconRight={primary.icon ?? 'arrow-right'} onClick={primary.onClick}>
            {primary.label}
          </Button>
        </div>
      </div>

      {summary.byType.length > 0 && (
        <div className="xresult__types">
          <h3 className="xresult__subtitle">{text('byQuestionType')}</h3>
          <ul>
            {summary.byType.map((stat) => {
              const percent = Math.round((stat.correct / Math.max(1, stat.total)) * 100)
              return (
                <li key={stat.typeId} className="xresult__type">
                  <span className="xresult__type-name">{typeName(stat.typeId)}</span>
                  <span className="xresult__bar" aria-hidden>
                    <span className="xresult__bar-fill" style={{ width: `${percent}%` }} data-level={percent >= 70 ? 'good' : percent >= 40 ? 'mid' : 'low'} />
                  </span>
                  <span className="xresult__type-score">
                    {stat.correct}/{stat.total} · {percent}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {(wentWell || improve.length > 0) && (
        <div className="xresult__notes">
          {wentWell && (
            <p className="xresult__note xresult__note--good">
              <Icon name="star" size={16} />
              <span>
                <strong>{text('wentWell')}: </strong>
                {wentWell}
              </span>
            </p>
          )}
          {improve.map((item) => (
            <p key={item} className="xresult__note">
              <Icon name="hint" size={16} />
              <span>
                <strong>{text('toImprove')}: </strong>
                {item}
              </span>
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
