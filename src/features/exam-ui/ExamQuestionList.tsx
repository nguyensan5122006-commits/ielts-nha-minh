/**
 * ExamQuestionList.tsx — VẼ CÁC NHÓM CÂU HỎI IELTS (Listening / Reading / phòng thi)
 * ----------------------------------------------------------------------------
 *   const { intro, groups } = buildQuestionGroups(task.instructions, task.questions)
 *   <ExamQuestionList groups={groups} intro={intro}
 *     answers={answers} onAnswer={(id, value) => …}
 *     flags={flags} onToggleFlag={toggle}
 *     currentId={currentId} onFocusQuestion={setCurrentId}
 *     review={results}                       // có -> chế độ xem lại (khoá, tô đúng/sai)
 *     renderAfterQuestion={(q) => <EvidenceStrip … />} />
 *
 * Mỗi nhóm: tiêu đề "Questions 1–5" + hướng dẫn (từ VIẾT HOA in đậm như đề thật,
 * xuống dòng "\n" giữ nguyên nhờ white-space: pre-line) + các câu. Cách vẽ theo `layout`:
 *   list     trắc nghiệm: mỗi phương án 1 hàng, chọn xong cả hàng tô nền (như máy thi)
 *   pills    TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, A–G: viên chọn nằm ngang
 *   matching danh sách chung hiện 1 lần trong khung; mỗi câu chỉ bấm nhãn (A–H, i–viii)
 *            — nhãn lấy từ nội dung, KHÔNG tự đánh lại, KHÔNG xáo
 *   gap      ô gõ nằm ngay trong câu, số câu làm chữ mờ trong ô
 * Dùng <input type="radio"> thật -> phím mũi tên chạy giữa các phương án, Tab sang câu sau.
 * ----------------------------------------------------------------------------
 */
import { Fragment, type ReactNode } from 'react'
import type { ExamQuestion } from '../../content/content-types'
import { Icon } from '../../design-system/components/Icon'
import type { QuestionResult } from './answer-grading'
import { useExamUiText } from './exam-ui-text'
import {
  answerValueFor,
  choicesOf,
  correctIndexOf,
  displayLabelForOption,
  exceedsWordLimit,
  optionLabel,
  optionsAreLabelled,
  promptWithoutSuffix,
  selectedIndexOf,
  type QuestionGroup,
  type WordLimit,
} from './question-grouping'
import './ExamQuestionList.css'

export interface ExamQuestionListProps {
  groups: QuestionGroup[]
  intro?: string
  answers: Record<string, string>
  onAnswer?: (questionId: string, value: string) => void
  flags?: ReadonlySet<string>
  onToggleFlag?: (questionId: string) => void
  currentId?: string | null
  onFocusQuestion?: (questionId: string) => void
  /** có -> chế độ xem lại: khoá đáp án, tô đúng/sai, hiện đáp án đúng */
  review?: Record<string, QuestionResult> | null
  /** luyện tập: hiện chip giới hạn số từ + cảnh báo khi gõ quá */
  practiceHints?: boolean
  /** hiện mẹo tắt Unikey ở nhóm điền từ đầu tiên */
  showTypingTip?: boolean
  /** thêm nút / chip vào đầu nhóm, bên phải hướng dẫn */
  renderGroupExtras?: (group: QuestionGroup) => ReactNode
  /** dòng chen TRƯỚC nhóm, rộng hết cột (VD vạch "Đoạn 2 · Câu 4–7 · Nghe lại đoạn này") */
  renderGroupLead?: (group: QuestionGroup) => ReactNode
  /** thêm nội dung dưới mỗi câu (VD dải "Tìm trong bài · Giải thích" khi xem lại) */
  renderAfterQuestion?: (question: ExamQuestion) => ReactNode
}

/* ------------------------------------------------------------------ hướng dẫn */

const CAPS_RUN = /\b[A-Z][A-Z/]+(?:[\s,]+(?:or\s+)?[A-Z][A-Z/]*)*\b/g

/** In đậm cụm VIẾT HOA (TRUE, NOT GIVEN, ONE WORD AND/OR A NUMBER…) như đề thật — không tô đỏ. */
export function InstructionText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(CAPS_RUN)) {
    const index = match.index ?? 0
    // bỏ qua chữ cái đơn lẻ kiểu "A–H", "NB" vẫn in đậm
    if (match[0].length < 2) continue
    parts.push(text.slice(last, index), <strong key={index}>{match[0]}</strong>)
    last = index + match[0].length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}

/** Hướng dẫn nhóm: tách phần "MAP: …" (mô tả bản đồ bằng chữ) ra khung riêng cho dễ nhìn. */
function GroupInstructions({ body }: { body: string }) {
  const mapIndex = body.search(/\bMAP:/)
  if (mapIndex < 0) {
    return (
      <p className="xq-group__body">
        <InstructionText text={body} />
      </p>
    )
  }
  return (
    <>
      <p className="xq-group__body">
        <InstructionText text={body.slice(0, mapIndex).trim()} />
      </p>
      <div className="xq-map">
        <span className="xq-map__icon" aria-hidden>
          🗺️
        </span>
        <p>{body.slice(mapIndex + 4).trim()}</p>
      </div>
    </>
  )
}

function WordLimitChip({ limit }: { limit: WordLimit }) {
  const text = useExamUiText()
  const label =
    limit.maxWords === 0
      ? text('wordLimitOnlyNumber')
      : `${limit.maxWords === 1 ? text('wordLimitChipOne') : text('wordLimitChip', { n: limit.maxWords })}${limit.allowNumber ? ` ${text('wordLimitNumber')}` : ''}`
  return <span className="xq-chip">{label}</span>
}

/* ------------------------------------------------------------------ danh sách chính */

export function ExamQuestionList({
  groups,
  intro,
  answers,
  onAnswer,
  flags,
  onToggleFlag,
  currentId,
  onFocusQuestion,
  review,
  practiceHints = false,
  showTypingTip = false,
  renderGroupExtras,
  renderGroupLead,
  renderAfterQuestion,
}: ExamQuestionListProps) {
  const text = useExamUiText()
  const firstGapGroupId = groups.find((group) => group.layout === 'gap')?.id

  return (
    <div className={review ? 'xq-list is-review' : 'xq-list'}>
      {intro && (
        <p className="xq-intro">
          <InstructionText text={intro} />
        </p>
      )}
      {groups.map((group) => (
        <section key={group.id} className={`xq-group xq-group--${group.layout}`} aria-label={group.heading || undefined}>
          {renderGroupLead?.(group)}
          {(group.heading || group.body || (practiceHints && group.wordLimit) || renderGroupExtras?.(group)) && (
            <div className="xq-group__top">
              <div className="xq-group__text">
                {group.heading && <h3 className="xq-group__heading">{group.heading}</h3>}
                {group.body && <GroupInstructions body={group.body} />}
              </div>
              <div className="xq-group__extras">
                {practiceHints && group.wordLimit && <WordLimitChip limit={group.wordLimit} />}
                {renderGroupExtras?.(group)}
              </div>
            </div>
          )}
          {showTypingTip && !review && group.id === firstGapGroupId && (
            <p className="xq-tip">
              <Icon name="hint" size={16} /> {text('unikeyTip')}
            </p>
          )}
          {group.layout === 'matching' && group.sharedOptions && (
            <div className="xq-options-box" aria-label={text('sharedOptions')}>
              {group.sharedPromptSuffix && <p className="xq-options-box__note">{group.sharedPromptSuffix}</p>}
              <dl className={group.sharedOptions.some((option) => option.length > 46) ? 'xq-options-box__list is-long' : 'xq-options-box__list'}>
                {group.sharedOptions.map((option) => {
                  const { label, text: optionText } = optionLabel(option)
                  return (
                    <div key={option} className="xq-options-box__row">
                      <dt>{label}</dt>
                      <dd>{optionText}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          )}
          <ol className="xq-items">
            {group.questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                group={group}
                answer={answers[question.id]}
                onAnswer={onAnswer}
                flagged={flags?.has(question.id) ?? false}
                onToggleFlag={onToggleFlag}
                isCurrent={question.id === currentId}
                onFocusQuestion={onFocusQuestion}
                result={review?.[question.id] ?? null}
                practiceHints={practiceHints}
                after={renderAfterQuestion?.(question)}
              />
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ 1 câu */

interface QuestionItemProps {
  question: ExamQuestion
  group: QuestionGroup
  answer: string | undefined
  onAnswer?: (questionId: string, value: string) => void
  flagged: boolean
  onToggleFlag?: (questionId: string) => void
  isCurrent: boolean
  onFocusQuestion?: (questionId: string) => void
  result: QuestionResult | null
  practiceHints: boolean
  after?: ReactNode
}

function QuestionItem({ question, group, answer, onAnswer, flagged, onToggleFlag, isCurrent, onFocusQuestion, result, practiceHints, after }: QuestionItemProps) {
  const text = useExamUiText()
  const reviewing = !!result
  const layout = group.layout
  const prompt = promptWithoutSuffix(question.prompt, group.sharedPromptSuffix)
  const classes = [
    'xq-item',
    `xq-item--${layout}`,
    isCurrent && 'is-current',
    flagged && 'is-flagged',
    result && (result.isCorrect ? 'is-correct' : 'is-incorrect'),
  ]
    .filter(Boolean)
    .join(' ')

  const flagButton = onToggleFlag && !reviewing && (
    <button
      type="button"
      className={flagged ? 'xq-flag is-on' : 'xq-flag'}
      aria-pressed={flagged}
      aria-label={`${flagged ? text('unflag') : text('flagForReview')} (Alt+F)`}
      title={`${flagged ? text('unflag') : text('flagForReview')} (Alt+F)`}
      // ngoài vòng Tab: Tab đi thẳng từ ô trả lời này sang ô kế tiếp (như máy thi); gắn cờ bằng Alt+F
      tabIndex={-1}
      onClick={() => onToggleFlag(question.id)}
    >
      <Icon name="flag" size={18} />
    </button>
  )

  const resultIcon = result && (
    <span className={result.isCorrect ? 'xq-result-icon is-correct' : 'xq-result-icon is-incorrect'} aria-label={text(result.isCorrect ? 'correct' : 'incorrect')}>
      <Icon name={result.isCorrect ? 'check' : 'close'} size={14} strokeWidth={3} />
    </span>
  )

  return (
    <li
      id={`xq-${question.id}`}
      data-question-id={question.id}
      className={classes}
      onFocusCapture={() => onFocusQuestion?.(question.id)}
      onPointerDown={() => onFocusQuestion?.(question.id)}
    >
      {layout === 'gap' ? (
        <GapQuestion question={question} answer={answer} onAnswer={onAnswer} result={result} practiceHints={practiceHints} wordLimit={group.wordLimit} flagButton={flagButton} resultIcon={resultIcon} />
      ) : (
        <>
          <div className="xq-item__head">
            <span className="xq-num" aria-hidden>
              {question.number}
            </span>
            <p className="xq-prompt" id={`xq-prompt-${question.id}`}>
              <span className="ds-visually-hidden">{text('questionStatus', { n: question.number })}. </span>
              {prompt}
            </p>
            {resultIcon}
            {layout !== 'matching' && flagButton}
          </div>
          <ChoiceOptions question={question} layout={layout} answer={answer} onAnswer={onAnswer} result={result} />
          {/* matching: câu và nhãn chung 1 hàng -> cờ đặt cuối hàng */}
          {layout === 'matching' && flagButton && (
            <span className="xq-item__tail">
              {flagButton}
            </span>
          )}
        </>
      )}
      {after}
    </li>
  )
}

/* ------------------------------------------------------------------ chọn đáp án */

function ChoiceOptions({ question, layout, answer, onAnswer, result }: { question: ExamQuestion; layout: QuestionGroup['layout']; answer: string | undefined; onAnswer?: (id: string, value: string) => void; result: QuestionResult | null }) {
  const text = useExamUiText()
  const options = choicesOf(question)
  const selected = selectedIndexOf(question, answer)
  const correct = correctIndexOf(question)
  const reviewing = !!result
  const labelled = optionsAreLabelled(options)
  const compact = layout === 'pills' || layout === 'matching'

  return (
    <div className={compact ? 'xq-pills' : 'xq-options'} role="radiogroup" aria-labelledby={`xq-prompt-${question.id}`}>
      {options.map((option, index) => {
        const isSelected = index === selected
        const isCorrectOption = reviewing && index === correct
        const isWrongPick = reviewing && isSelected && index !== correct
        const { label, text: optionText } = optionLabel(option)
        const classes = [
          compact ? 'xq-pill' : 'xq-option',
          isSelected && 'is-selected',
          isCorrectOption && 'is-answer',
          isWrongPick && 'is-wrong',
        ]
          .filter(Boolean)
          .join(' ')
        // matching: chỉ hiện nhãn (A / iv); viên chọn thường: hiện nguyên chữ ngắn
        const pillText = layout === 'matching' ? (label ?? option) : option
        return (
          <label key={index} className={classes} title={layout === 'matching' ? option : undefined}>
            <input
              type="radio"
              className="xq-radio"
              name={`xq-radio-${question.id}`}
              value={index}
              checked={isSelected}
              disabled={reviewing || !onAnswer}
              onChange={() => onAnswer?.(question.id, answerValueFor(question, index))}
              aria-label={layout === 'matching' ? text('chooseLabel', { label: option }) : undefined}
            />
            {compact ? (
              <span className="xq-pill__text">{pillText}</span>
            ) : (
              <>
                <span className="xq-option__dot" aria-hidden />
                <span className="xq-option__label" aria-hidden>
                  {labelled ? label : displayLabelForOption(options, index)}
                </span>
                <span className="xq-option__text">{labelled ? optionText : option}</span>
              </>
            )}
            {isCorrectOption && <Icon name="check" size={16} strokeWidth={3} className="xq-mark-icon" />}
            {isWrongPick && <Icon name="close" size={16} strokeWidth={3} className="xq-mark-icon" />}
          </label>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ điền từ */

function GapQuestion({
  question,
  answer,
  onAnswer,
  result,
  practiceHints,
  wordLimit,
  flagButton,
  resultIcon,
}: {
  question: ExamQuestion
  answer: string | undefined
  onAnswer?: (id: string, value: string) => void
  result: QuestionResult | null
  practiceHints: boolean
  wordLimit?: WordLimit | null
  flagButton: ReactNode
  resultIcon: ReactNode
}) {
  const text = useExamUiText()
  const value = answer ?? ''
  const reviewing = !!result
  const pieces = question.prompt.split(/_{3,}/)
  const tooLong = practiceHints && !reviewing && exceedsWordLimit(value, wordLimit)
  const width = `${Math.min(26, Math.max(8, value.length + 3))}ch`

  const input = (
    <span className="xq-gap">
      <input
        className={['xq-gap__input', reviewing && (result!.isCorrect ? 'is-correct' : 'is-incorrect'), tooLong && 'is-over'].filter(Boolean).join(' ')}
        style={{ width }}
        value={value}
        placeholder={String(question.number)}
        readOnly={reviewing || !onAnswer}
        onChange={(event) => onAnswer?.(question.id, event.target.value)}
        aria-label={text('answerFor', { n: question.number })}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      {reviewing && !result!.isCorrect && (
        <span className="xq-gap__answer">
          <Icon name="arrow-right" size={14} /> {result!.correctText}
        </span>
      )}
    </span>
  )

  return (
    <>
      <div className="xq-item__head">
        <span className="xq-num" aria-hidden>
          {question.number}
        </span>
        <p className="xq-prompt xq-prompt--gap">
          {pieces.length > 1 ? (
            pieces.map((piece, index) => (
              <Fragment key={index}>
                {piece}
                {index < pieces.length - 1 && (index === 0 ? input : <span className="xq-gap__blank">____</span>)}
              </Fragment>
            ))
          ) : (
            <>
              {question.prompt} {input}
            </>
          )}
        </p>
        {resultIcon}
        {flagButton}
      </div>
      {tooLong && <p className="xq-warn">{text('overWordLimit')}</p>}
      {reviewing && result!.nearMiss && <p className="xq-warn xq-warn--soft">{text('nearMiss')}</p>}
    </>
  )
}
