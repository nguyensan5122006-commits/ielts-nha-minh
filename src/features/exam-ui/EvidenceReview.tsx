/**
 * EvidenceReview.tsx — DẢI "SOI BẰNG CHỨNG" DƯỚI MỖI CÂU KHI XEM LẠI
 * ----------------------------------------------------------------------------
 *   <EvidenceStrip
 *     result={results[q.id]}
 *     explanation={pick(q.explanation)}
 *     questionText={q.prompt}
 *     evidenceText="…câu trong bài chứa đáp án…"   (null = bài không nói tới)
 *     actions={[{ icon: 'eye', label: 'Tìm trong bài', onClick: locate }]}
 *     expanded={open} onToggle={() => setOpen(!open)} />
 *
 * Ý tưởng IELTS Online Tests (Locate / Explain) + Magoosh, làm lại nhẹ nhàng hơn:
 *   - 1 dòng "vì sao" (lời giải) luôn hiện
 *   - nút "Tìm trong bài" / "Nghe từ đoạn này" (do trình kỹ năng truyền vào)
 *   - "Giải thích" mở bảng 2 cột: Câu hỏi nói ↔ Trong bài, kèm từ khoá chung để dò (scan)
 *     và các cặp diễn đạt lại (paraphrase) rút từ lời giải (dấu "=").
 * Chỉ tô bằng chứng của câu đang xem (không tô hết một lúc như IOT — rối mắt).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon, type IconName } from '../../design-system/components/Icon'
import type { QuestionResult } from './answer-grading'
import { useExamUiText } from './exam-ui-text'
import { paraphrasePairsFromExplanation, sharedKeywords } from './evidence-finder'
import './EvidenceReview.css'

export interface EvidenceAction {
  icon: IconName | ReactNode
  label: string
  onClick: () => void
  /** đang bật (VD đang phát từ đoạn này) */
  active?: boolean
}

export interface EvidenceStripProps {
  result: QuestionResult
  explanation?: string
  /** lời giải bản tiếng Anh (để rút cặp paraphrase "X = Y") */
  explanationEn?: string
  questionText: string
  evidenceText?: string | null
  /** VD "Đoạn B" / "Đoạn nghe 2" */
  evidenceWhere?: string
  actions?: EvidenceAction[]
  expanded?: boolean
  onToggle?: () => void
}

/** Tô đậm các từ khoá chung trong 1 câu. */
function withKeywords(sentence: string, keywords: string[]): ReactNode {
  if (!keywords.length) return sentence
  const pattern = new RegExp(`\\b(${keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi')
  const parts: ReactNode[] = []
  let last = 0
  for (const match of sentence.matchAll(pattern)) {
    const index = match.index ?? 0
    parts.push(sentence.slice(last, index), <mark key={index} className="xev-keyword">{match[0]}</mark>)
    last = index + match[0].length
  }
  parts.push(sentence.slice(last))
  return parts
}

export function EvidenceStrip({ result, explanation, explanationEn, questionText, evidenceText, evidenceWhere, actions = [], expanded = false, onToggle }: EvidenceStripProps) {
  const text = useExamUiText()
  const keywords = evidenceText ? sharedKeywords(questionText, evidenceText) : []
  const pairs = [...paraphrasePairsFromExplanation(explanationEn), ...(explanation !== explanationEn ? paraphrasePairsFromExplanation(explanation) : [])]
  const cleanQuestion = questionText.replace(/_{3,}/g, '____')

  return (
    <div className={result.isCorrect ? 'xev is-correct' : 'xev is-incorrect'}>
      <div className="xev__line">
        <span className="xev__verdict">
          {result.isCorrect ? text('correct') : result.isBlank ? text('noAnswer') : text('incorrect')}
          {!result.isCorrect && (
            <>
              {' · '}
              {text('correctAnswer')}: <strong>{result.correctText}</strong>
            </>
          )}
        </span>
        {explanation && <span className="xev__why">{explanation}</span>}
      </div>
      <div className="xev__actions">
        {actions.map((action) => (
          <button key={action.label} type="button" className={action.active ? 'xev__btn is-active' : 'xev__btn'} aria-pressed={action.active} onClick={action.onClick}>
            {typeof action.icon === 'string' ? <Icon name={action.icon as IconName} size={16} /> : action.icon}
            {action.label}
          </button>
        ))}
        {onToggle && (
          <button type="button" className={expanded ? 'xev__btn is-active' : 'xev__btn'} aria-expanded={expanded} onClick={onToggle}>
            <Icon name="hint" size={16} />
            {expanded ? text('hideExplain') : text('explain')}
          </button>
        )}
      </div>
      {expanded && (
        <div className="xev__panel">
          <div className="xev__compare">
            <div className="xev__side">
              <span className="xev__side-label">{text('questionSays')}</span>
              <p>{withKeywords(cleanQuestion, keywords)}</p>
            </div>
            <span className="xev__arrow" aria-hidden>
              ↔
            </span>
            <div className="xev__side">
              <span className="xev__side-label">
                {text('textSays')}
                {evidenceWhere && ` · ${evidenceWhere}`}
              </span>
              {evidenceText ? <p className="xev__quote">{withKeywords(evidenceText, keywords)}</p> : <p className="xev__none">{text('noEvidenceFound')}</p>}
            </div>
          </div>
          {keywords.length > 0 && (
            <p className="xev__keywords">
              <span>{text('sameWords')}:</span>
              {keywords.map((keyword) => (
                <span key={keyword} className="xev__keyword-chip">
                  {keyword}
                </span>
              ))}
            </p>
          )}
          {pairs.length > 0 && (
            <div className="xev__pairs">
              <span className="xev__side-label">{text('paraphrase')}</span>
              <ul>
                {pairs.map((pair, index) => (
                  <li key={index}>
                    <span className="xev__pair-chip">{pair.left}</span>
                    <span aria-hidden>↔</span>
                    <span className="xev__pair-chip xev__pair-chip--text">{pair.right}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
