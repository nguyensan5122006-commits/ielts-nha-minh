/**
 * SelfCheckPanel.tsx — TỰ CHẤM THEO 4 TIÊU CHÍ (dùng chung Writing + Speaking)
 * ----------------------------------------------------------------------------
 * psych-adult D9 luật 37: "tự chấm trước, AI chấm sau". Mỗi câu hỏi checklist có 3 lựa chọn
 * Có / Một phần / Chưa (ý 3 trong docs/research/notes/ui-ielts-ai.md). Band từng tiêu chí và band chung
 * tính bằng công thức minh bạch trong band-scale.selfBandFromChecklist — công thức in ngay dưới kết quả.
 * Track general: hiện nhãn "Cơ bản / Tốt / Rất tốt" thay số.
 * ----------------------------------------------------------------------------
 */
import { useLanguage } from '../../../translations/language-context'
import {
  CRITERIA,
  LEVEL_LABELS,
  formatBand,
  levelIndexForBand,
  selfBandFromChecklist,
  selfCheckKey,
  type BandDisplay,
  type CriterionCode,
  type SelfCheckAnswer,
} from '../band-scale'
import { useWritingText } from '../skill-writing-text'
import './feedback.css'

export interface ChecklistGroup {
  criterion: CriterionCode
  questionsVi: string[]
}

interface SelfCheckPanelProps {
  checklist: ChecklistGroup[]
  answers: Record<string, SelfCheckAnswer>
  onAnswer: (key: string, answer: SelfCheckAnswer) => void
  /** mốc band bài mẫu, thấp -> cao */
  bands: number[]
  display: BandDisplay
}

const ANSWER_ORDER: SelfCheckAnswer[] = ['yes', 'partly', 'no']

export function SelfCheckPanel({ checklist, answers, onAnswer, bands, display }: SelfCheckPanelProps) {
  const text = useWritingText()
  const { language } = useLanguage()
  const score = selfBandFromChecklist(checklist, answers, bands)
  const answerLabel: Record<SelfCheckAnswer, string> = { yes: text.answerYes, partly: text.answerPartly, no: text.answerNo }

  const showBand = (band: number) =>
    display === 'numbers' ? formatBand(band) : LEVEL_LABELS[levelIndexForBand(band, bands)][language]

  return (
    <div className="self-check">
      {checklist.map((group) => {
        const criterionScore = score.perCriterion.find((c) => c.criterion === group.criterion)
        const meta = CRITERIA[group.criterion]
        return (
          <section key={group.criterion} className="self-check__group" aria-label={meta.name.en}>
            <header className="self-check__group-head">
              <span className="criterion-tag criterion-tag--lg">{meta.short}</span>
              <div className="self-check__group-name">
                <strong>{meta.name.en}</strong>
                <span>{language === 'vi' ? meta.plainVi : meta.plainEn}</span>
              </div>
              <span className={`self-check__group-band${criterionScore?.band == null ? ' is-empty' : ''}`}>
                {criterionScore?.band == null ? '–' : showBand(criterionScore.band)}
              </span>
            </header>
            <ol className="self-check__questions">
              {group.questionsVi.map((question, index) => {
                const key = selfCheckKey(group.criterion, index)
                const current = answers[key]
                return (
                  <li key={key} className="self-check__question">
                    <span className="self-check__question-text">{question}</span>
                    <div className="self-check__choices" role="radiogroup" aria-label={question}>
                      {ANSWER_ORDER.map((answer) => (
                        <button
                          key={answer}
                          type="button"
                          role="radio"
                          aria-checked={current === answer}
                          className={`self-check__choice self-check__choice--${answer}${current === answer ? ' is-selected' : ''}`}
                          onClick={() => onAnswer(key, answer)}
                        >
                          {answerLabel[answer]}
                        </button>
                      ))}
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        )
      })}

      <div className="self-check__summary" aria-live="polite">
        <div>
          <span className="self-check__summary-label">{display === 'numbers' ? text.selfBandTitle : text.selfLevelTitle}</span>
          <span className="self-check__summary-value">{score.overall === null ? '…' : showBand(score.overall)}</span>
        </div>
        <span className="self-check__summary-progress">
          {score.answered < score.total ? text.questionsLeft(score.total - score.answered) : text.allAnswered}
        </span>
        <p className="self-check__formula">
          {display === 'numbers'
            ? text.selfFormula(formatBand(bands[0]), formatBand(bands[bands.length - 1] - bands[0]))
            : text.selfFormulaLabels}
        </p>
      </div>
    </div>
  )
}

/** Checklist mặc định khi nội dung không có (Speaking cũ) — 4 tiêu chí, câu hỏi đời thường. */
export const DEFAULT_SPEAKING_CHECKLIST: ChecklistGroup[] = [
  { criterion: 'FC', questionsVi: ['Bạn nói liền mạch, ít dừng lâu giữa câu không?', 'Mỗi câu trả lời có lý do hoặc ví dụ đi kèm không?'] },
  { criterion: 'LR', questionsVi: ['Có dùng vài từ cụ thể thay cho "good / nice / very" không?', 'Có dùng ít nhất 1 cụm từ hữu ích của bài không?'] },
  { criterion: 'GRA', questionsVi: ['Thì của động từ có đúng (quá khứ khi kể chuyện) không?', 'Có ít nhất 1–2 câu phức (because, when, which…) không?'] },
  { criterion: 'P', questionsVi: ['Nghe lại: âm cuối và đuôi -s / -ed có rõ không?', 'Từ quan trọng trong câu có được nhấn không?'] },
]

export const DEFAULT_WRITING_CHECKLIST: ChecklistGroup[] = [
  { criterion: 'TR', questionsVi: ['Bài trả lời đúng và đủ mọi phần của đề không?', 'Bài đủ số từ tối thiểu không?'] },
  { criterion: 'CC', questionsVi: ['Mỗi đoạn có 1 ý chính rõ ràng không?', 'Có từ nối giữa các ý (however, as a result…) không?'] },
  { criterion: 'LR', questionsVi: ['Có tránh lặp một từ quá nhiều lần không?', 'Chính tả các từ dài có đúng không?'] },
  { criterion: 'GRA', questionsVi: ['Thì của động từ có đúng không?', 'Có vài câu phức (which, although, while…) không?'] },
]
