/**
 * MistakeCard.tsx — 1 CÂU SAI TRONG SỔ
 * ----------------------------------------------------------------------------
 * Hiện: nguồn (bài học / đề thi) · số lần sai · câu hỏi · "Bạn trả lời" so với "Đáp án đúng"
 * · 1 dòng "Vì sao" · nút "Hỏi AI vì sao" · "Làm lại" (lượt 1 câu) · "Đã hiểu" (bật/tắt).
 * Câu sai KHÔNG tô đỏ toàn khung: chỉ phần câu trả lời dùng cam san hô (psych-adult D4 luật 17).
 * ----------------------------------------------------------------------------
 */
import { AudioButton } from '../../design-system/components/AudioButton'
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { useLanguage } from '../../translations/language-context'
import { AskAiWhy } from './AskAiWhy'
import type { MistakeDetails } from './mistake-lookup'
import { useMistakesText } from './mistakes-notebook-text'

export interface MistakeCardProps {
  details: MistakeDetails
  onRetry: () => void
  onToggleResolved: () => void
}

export function MistakeCard({ details, onRetry, onToggleResolved }: MistakeCardProps) {
  const text = useMistakesText()
  const { pick, language } = useLanguage()
  const { mistake } = details
  const sourceLabel = { lesson: text.sourceLesson, 'mini-test': text.sourceMiniTest, exam: text.sourceExam, review: text.sourceReview }[mistake.source]
  const date = new Date(mistake.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short' })
  const why = mistake.explanation ?? (typeof details.retry.explanation === 'string' ? details.retry.explanation : pick(details.retry.explanation))

  return (
    <article className={`mistake-card${mistake.resolved ? ' is-fixed' : ''}`}>
      <header className="mistake-card__meta">
        <span className="mistake-card__source">
          {sourceLabel}
          {details.sourceTitle && <> · {pick(details.sourceTitle)}</>}
          {details.examQuestionNumber && <> · Q{details.examQuestionNumber}</>}
        </span>
        <span className="mistake-card__badges">
          {mistake.resolved && (
            <Badge tone="success" icon="check" size="sm">
              {text.fixedBadge}
            </Badge>
          )}
          {mistake.timesWrong > 1 && (
            <Badge tone="oops" size="sm">
              {text.timesWrong(mistake.timesWrong)}
            </Badge>
          )}
          <span className="mistake-card__date">{date}</span>
        </span>
      </header>

      <div className="mistake-card__question">
        {details.retry.audioText && <AudioButton text={details.retry.audioText} size="sm" label={text.listenAudio} />}
        <p lang="en">{details.displayQuestion}</p>
      </div>

      <dl className="mistake-card__answers">
        <div className="mistake-card__answer is-yours">
          <dt>{text.yourAnswer}</dt>
          <dd lang="en">{mistake.userAnswer || text.noAnswer}</dd>
        </div>
        <div className="mistake-card__answer is-correct">
          <dt>{text.correctAnswer}</dt>
          <dd lang="en">{mistake.correctAnswer}</dd>
        </div>
      </dl>

      {why && (
        <p className="mistake-card__why">
          <strong>{text.why}:</strong> {why}
        </p>
      )}

      <footer className="mistake-card__actions">
        <AskAiWhy question={details.displayQuestion} userAnswer={mistake.userAnswer} correctAnswer={mistake.correctAnswer} context={mistake.context} />
        <span className="mistake-card__spacer" />
        {!mistake.resolved && (
          <Button variant="secondary" size="sm" iconLeft="review" onClick={onRetry}>
            {text.retryOne}
          </Button>
        )}
        <Button variant={mistake.resolved ? 'ghost' : 'secondary'} size="sm" iconLeft={mistake.resolved ? undefined : 'check'} onClick={onToggleResolved}>
          {mistake.resolved ? text.markOpen : text.markUnderstood}
        </Button>
      </footer>
    </article>
  )
}
