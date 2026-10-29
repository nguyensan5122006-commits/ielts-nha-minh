/**
 * RetryQuestionView.tsx — VẼ 1 "CÂU LÀM LẠI" + KHUNG PHẢN HỒI
 * ----------------------------------------------------------------------------
 * Dùng ở 2 nơi: lượt "Ôn lại câu sai" (/mistakes) và thẻ "câu từng sai" trong phiên ôn (/review).
 *
 *   <RetryQuestionView
 *     key={question.id + attempt}          // đổi key = vẽ lại từ đầu cho câu mới
 *     question={question}
 *     onChecked={(result) => save(result)} // lưu tiến độ NGAY khi chấm
 *     onContinue={next}                    // bấm "Tiếp tục" (Enter)
 *   />
 *
 * Bố cục: phần thân (câu hỏi) + thanh đáy. Trước khi kiểm tra, thanh đáy có nút "Kiểm tra";
 * sau khi kiểm tra, thanh đáy đổi thành khung phản hồi xanh (đúng) / cam san hô (chưa đúng)
 * với đáp án + 1 dòng "vì sao" + "Hỏi AI vì sao" (04-DESIGN-SYSTEM mục 8; psych-adult D4).
 *
 * Phím tắt (desktop): 1–4 chọn đáp án · Enter kiểm tra / tiếp tục · R nghe lại ·
 * câu tự kiểm tra: Space xem đáp án, rồi 1 = chưa đúng, 2 = đã đúng.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AudioButton } from '../../../design-system/components/AudioButton'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import { playSound } from '../../../design-system/sound-kit'
import { speak } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import { AskAiWhy } from '../AskAiWhy'
import { useMistakesText } from '../mistakes-notebook-text'
import { gradeRetryAnswer, type RetryGrade, type RetryQuestion } from './retry-question'
import './exercise-retry.css'

export interface RetryResult extends RetryGrade {
  /** câu trả lời dạng chữ (ghi vào sổ lỗi nếu vẫn sai) */
  userAnswerText: string
  /** số giây từ lúc hiện câu tới lúc chấm (để tự chấm Khó/Nhớ) */
  seconds: number
}

export interface RetryQuestionViewProps {
  question: RetryQuestion
  /** nhãn nhỏ phía trên câu (VD "Câu sai lúc nãy", kỹ năng) */
  eyebrow?: ReactNode
  /** gọi NGAY khi chấm xong (trước khi người học bấm Tiếp tục) */
  onChecked: (result: RetryResult) => void
  onContinue: () => void
  /** tiêu đề khung phản hồi khi đúng (mặc định "Chính xác!") */
  correctTitle?: string
}

/** Đang gõ trong ô nhập? -> không bắt phím số / R / Space. */
function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
}

export function RetryQuestionView({ question, eyebrow, onChecked, onContinue, correctTitle }: RetryQuestionViewProps) {
  const text = useMistakesText()
  const { pick } = useLanguage()
  const startedAt = useRef(Date.now())
  const inputRef = useRef<HTMLInputElement>(null)

  const [chosenIndex, setChosenIndex] = useState<number | null>(null)
  const [typed, setTyped] = useState('')
  /** arrange: vị trí các thẻ đã bấm (theo thứ tự) */
  const [arranged, setArranged] = useState<number[]>([])
  const [revealed, setRevealed] = useState(false)
  const [passageOpen, setPassageOpen] = useState(false)
  const [result, setResult] = useState<RetryResult | null>(null)

  const explanation = typeof question.explanation === 'string' ? question.explanation : pick(question.explanation)

  // bài nghe: tự đọc 1 lần khi hiện câu
  useEffect(() => {
    if (question.audioText && question.kind !== 'self-check') void speak(question.audioText)
    if (question.kind === 'type') inputRef.current?.focus()
  }, [question])

  /** Câu trả lời hiện tại dạng chữ (null = chưa trả lời đủ để kiểm tra). */
  const currentAnswer = useMemo((): string | null => {
    if (question.kind === 'choice') return chosenIndex === null ? null : String(chosenIndex)
    if (question.kind === 'type') return typed.trim() ? typed : null
    if (question.kind === 'arrange') return arranged.length ? arranged.map((index) => question.tiles[index]).join(' ') : null
    return null
  }, [question, chosenIndex, typed, arranged])

  const finish = useCallback(
    (answer: string, userAnswerText: string) => {
      const grade = gradeRetryAnswer(question, answer)
      const checked: RetryResult = { ...grade, userAnswerText, seconds: Math.round((Date.now() - startedAt.current) / 1000) }
      playSound(grade.correct ? 'correct' : 'oops')
      setResult(checked)
      onChecked(checked)
      return checked
    },
    [question, onChecked],
  )

  const check = useCallback(() => {
    if (result || currentAnswer === null) return
    const userAnswerText = question.kind === 'choice' ? question.options[Number(currentAnswer)] : currentAnswer
    finish(currentAnswer, userAnswerText)
  }, [result, currentAnswer, question, finish])

  /** Tự kiểm tra: người học tự nhận đúng / chưa đúng -> lưu và đi tiếp luôn. */
  const selfGrade = useCallback(
    (gotIt: boolean) => {
      if (result) return
      finish(gotIt ? 'yes' : 'no', gotIt ? question.answerText : '')
      onContinue()
    },
    [result, finish, question, onContinue],
  )

  /* ---------- phím tắt ---------- */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const typing = isTypingTarget(event.target)
      if (event.key === 'Enter') {
        // nút đang focus tự xử lý Enter của nó -> tránh chấm 2 lần
        if (event.target instanceof HTMLButtonElement) return
        event.preventDefault()
        if (result) onContinue()
        else if (question.kind === 'self-check') {
          if (!revealed) setRevealed(true)
        } else check()
        return
      }
      if (typing) return
      if ((event.key === 'r' || event.key === 'R') && question.audioText) {
        event.preventDefault()
        void speak(question.audioText)
        return
      }
      if (question.kind === 'self-check' && !result) {
        if (event.key === ' ' && !revealed) {
          event.preventDefault()
          setRevealed(true)
        } else if (revealed && (event.key === '1' || event.key === '2')) {
          event.preventDefault()
          selfGrade(event.key === '2')
        }
        return
      }
      if (question.kind === 'choice' && !result && /^[1-9]$/.test(event.key)) {
        const index = Number(event.key) - 1
        if (index < question.options.length) {
          event.preventDefault()
          setChosenIndex(index)
          playSound('tap')
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [question, result, revealed, check, selfGrade, onContinue])

  /* ---------- phần thân theo dạng câu ---------- */
  function renderBody() {
    switch (question.kind) {
      case 'choice':
        return (
          <ol className="rq-options" aria-label={question.prompt}>
            {question.options.map((option, index) => {
              const isChosen = chosenIndex === index
              const state = !result ? (isChosen ? 'is-chosen' : '') : index === question.correctIndex ? 'is-correct' : isChosen ? 'is-wrong' : 'is-dim'
              return (
                <li key={index}>
                  <button
                    type="button"
                    className={`rq-option ${state}`}
                    aria-pressed={isChosen}
                    disabled={!!result}
                    onClick={() => {
                      setChosenIndex(index)
                      playSound('tap')
                    }}
                  >
                    <Kbd>{index + 1}</Kbd>
                    <span className="rq-option__text" lang="en">
                      {option}
                    </span>
                    {result && index === question.correctIndex && <Icon name="check" size={20} strokeWidth={2.6} className="rq-option__mark" />}
                  </button>
                </li>
              )
            })}
          </ol>
        )
      case 'type': {
        const input = (
          <input
            ref={inputRef}
            className={`rq-input ${result ? (result.correct ? 'is-correct' : 'is-wrong') : ''} ${question.sentence ? 'rq-input--inline' : ''}`}
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={question.sentence ? '…' : text.typeHere}
            aria-label={text.typeHere}
            disabled={!!result}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            lang="en"
            size={question.sentence ? Math.max(8, (question.acceptedAnswers[0]?.length ?? 6) + 2) : undefined}
          />
        )
        if (question.sentence) {
          const [before, ...rest] = question.sentence.split('___')
          return (
            <>
              <p className="rq-sentence" lang="en">
                {before}
                {input}
                {rest.join('___')}
              </p>
              {question.hint && <p className="rq-hint">{question.hint}</p>}
              <p className="rq-tip">{text.unikeyTip}</p>
            </>
          )
        }
        return (
          <>
            {input}
            {question.hint && <p className="rq-hint">{question.hint}</p>}
            <p className="rq-tip">{text.unikeyTip}</p>
          </>
        )
      }
      case 'arrange': {
        const used = new Set(arranged)
        return (
          <div className="rq-arrange">
            <div className={`rq-arrange__line ${result ? (result.correct ? 'is-correct' : 'is-wrong') : ''}`} aria-live="polite">
              {arranged.length === 0 && <span className="rq-arrange__placeholder">{text.arrangeHint}</span>}
              {arranged.map((tileIndex, position) => (
                <button
                  key={`${tileIndex}-${position}`}
                  type="button"
                  className="rq-tile is-placed"
                  disabled={!!result}
                  onClick={() => setArranged((current) => current.filter((_, i) => i !== position))}
                  lang="en"
                >
                  {question.tiles[tileIndex]}
                </button>
              ))}
            </div>
            <div className="rq-arrange__pool">
              {question.tiles.map((tile, tileIndex) => (
                <button
                  key={tileIndex}
                  type="button"
                  className="rq-tile"
                  disabled={!!result || used.has(tileIndex)}
                  onClick={() => {
                    setArranged((current) => [...current, tileIndex])
                    playSound('tap')
                  }}
                  lang="en"
                >
                  {tile}
                </button>
              ))}
            </div>
            {arranged.length > 0 && !result && (
              <Button variant="ghost" size="sm" onClick={() => setArranged([])}>
                {text.clearArrange}
              </Button>
            )}
          </div>
        )
      }
      case 'self-check':
        return (
          <div className="rq-self">
            <p className="rq-self__instruction">
              {question.instruction === 'say' ? text.selfCheckSay : question.instruction === 'write' ? text.selfCheckWrite : text.selfCheckRecall}
            </p>
            {revealed && (
              <div className="rq-self__answer">
                <span className="rq-label">{text.sampleAnswer}</span>
                <p lang="en">{question.answerText}</p>
                {explanation && <p className="rq-self__why">{explanation}</p>}
              </div>
            )}
          </div>
        )
    }
  }

  const footerTone = result ? (result.correct ? 'is-success' : 'is-oops') : ''

  return (
    <div className="rq">
      <div className="rq-body">
        {eyebrow && <div className="rq-eyebrow">{eyebrow}</div>}
        {question.audioText && question.kind !== 'type' && question.kind !== 'self-check' && (
          <div className="rq-audio">
            <AudioButton text={question.audioText} size="lg" label={text.replayAudio} />
            <span className="rq-audio__hint">
              {text.replayAudio} <Kbd>R</Kbd>
            </span>
          </div>
        )}
        {question.audioText && question.kind === 'type' && (
          <div className="rq-audio">
            <AudioButton text={question.audioText} size="lg" label={text.replayAudio} />
            <span className="rq-audio__hint">
              {text.replayAudio} <Kbd>R</Kbd>
            </span>
          </div>
        )}
        {question.prompt && !(question.kind === 'type' && question.sentence) && (
          <h2 className={`rq-prompt ${question.prompt.length > 140 ? 'is-long' : ''}`} lang={question.kind === 'arrange' ? 'vi' : 'en'}>
            {question.prompt}
          </h2>
        )}
        {question.kind === 'self-check' && question.audioText && (
          <div className="rq-audio rq-audio--inline">
            <AudioButton text={question.audioText} size="md" label={text.replayAudio} />
          </div>
        )}
        {question.passageText && (
          <div className="rq-passage">
            <button type="button" className="rq-passage__toggle" aria-expanded={passageOpen} onClick={() => setPassageOpen((open) => !open)}>
              <Icon name={passageOpen ? 'chevron-down' : 'chevron-right'} size={16} />
              {passageOpen ? text.hidePassage : text.showPassage}
            </button>
            {passageOpen && (
              <div className="rq-passage__text ds-reading" lang="en">
                {question.passageText}
              </div>
            )}
          </div>
        )}
        {renderBody()}
      </div>

      <div className={`rq-footer ${footerTone}`} aria-live="polite">
        {!result && question.kind !== 'self-check' && (
          <div className="rq-footer__row">
            <span className="rq-footer__hint">{question.kind === 'choice' ? text.chooseKeys : ''}</span>
            <Button size="lg" onClick={check} disabled={currentAnswer === null} iconRight={<Kbd onColor>Enter</Kbd>}>
              {text.check}
            </Button>
          </div>
        )}
        {!result && question.kind === 'self-check' && !revealed && (
          <div className="rq-footer__row">
            <span className="rq-footer__hint" />
            <Button size="lg" variant="navy" onClick={() => setRevealed(true)} iconRight={<Kbd onColor>Space</Kbd>}>
              {text.revealAnswer}
            </Button>
          </div>
        )}
        {!result && question.kind === 'self-check' && revealed && (
          <div className="rq-footer__row">
            <span className="rq-footer__hint" />
            <div className="rq-footer__pair">
              <Button size="lg" variant="secondary" onClick={() => selfGrade(false)} iconRight={<Kbd>1</Kbd>}>
                {text.selfMissed}
              </Button>
              <Button size="lg" onClick={() => selfGrade(true)} iconRight={<Kbd onColor>2</Kbd>}>
                {text.selfGotIt}
              </Button>
            </div>
          </div>
        )}
        {result && (
          <div className="rq-footer__row rq-feedback">
            <div className="rq-feedback__main">
              <p className="rq-feedback__title">
                <span className="rq-feedback__icon" aria-hidden>
                  <Icon name={result.correct ? 'check' : 'close'} size={18} strokeWidth={3} />
                </span>
                {result.correct ? (correctTitle ?? text.correctTitle) : text.wrongTitle}
              </p>
              {!result.correct && (
                <p className="rq-feedback__answer" lang="en">
                  {text.wrongAnswerIs(question.answerText)}
                </p>
              )}
              {result.nearMiss && <p className="rq-feedback__answer">{text.nearMiss(result.nearMiss)}</p>}
              {explanation && <p className="rq-feedback__why">{explanation}</p>}
              {!result.correct && (
                <AskAiWhy question={question.prompt || question.audioText || ''} userAnswer={result.userAnswerText} correctAnswer={question.answerText} context={question.passageText} />
              )}
            </div>
            <Button size="lg" variant={result.correct ? 'primary' : 'navy'} onClick={onContinue} iconRight={<Kbd onColor>Enter</Kbd>} autoFocus>
              {text.continue}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
