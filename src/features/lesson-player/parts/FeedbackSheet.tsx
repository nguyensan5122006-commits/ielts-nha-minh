/**
 * FeedbackSheet.tsx — KHUNG PHẢN HỒI TRƯỢT LÊN TỪ ĐÁY SAU KHI "KIỂM TRA"
 * ----------------------------------------------------------------------------
 * Học ý tưởng Mochi (khung trượt + mascot ló đầu), làm theo phong cách riêng:
 *   - trượt lên 170ms (spec ≤ 180ms); 350ms sau đầu mascot mới ló lên mép khung
 *     (mắt đọc MÀU trước, CẢM XÚC sau) — pose happy khi đúng, comfort khi sai.
 *   - 3 MÀU: xanh ngọc = đúng · cam san hô = chưa đúng · vàng mật ong = máy chưa
 *     nghe rõ / đã xem lời giải (không phải lỗi kiến thức, không phạt).
 *   - Sai: "Chưa đúng — đáp án: …" + TÔ ĐÚNG TỪ KHÁC BIỆT + 1 dòng "vì sao".
 *   - Đúng cũng hiện "vì sao" (người đoán mò vẫn được củng cố lập luận).
 *   - Nút: cờ báo lỗi câu hỏi · "Hỏi AI vì sao" (khi sai) · "Tiếp tục" (Enter).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { Exercise } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon, type IconName } from '../../../design-system/components/Icon'
import { IconButton } from '../../../design-system/components/IconButton'
import { Kbd } from '../../../design-system/components/Kbd'
import { Mascot, type MascotPose } from '../../../design-system/components/Mascot'
import { useToast } from '../../../design-system/components/Toast'
import { api, type AiExplanation } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { AI_GRADED_TYPES, type CheckOutcome } from '../exercises/exercise-contract'
import { useLessonText } from '../lesson-player-text'
import { AnswerTokens } from './AnswerTokens'
import { LessonGlyph } from './LessonGlyph'

type SheetTone = 'correct' | 'wrong' | 'unclear' | 'solution'

const TONE_ICON: Record<SheetTone, IconName> = { correct: 'check', wrong: 'arrow-right', unclear: 'volume', solution: 'hint' }
const TONE_POSE: Record<SheetTone, MascotPose> = { correct: 'happy', wrong: 'comfort', unclear: 'thinking', solution: 'thinking' }

const REPORTS_KEY = 'ielts-lesson-reports'

/** Ghi báo lỗi câu hỏi vào máy (chưa có API riêng — xem REQUESTS.md). */
function saveReport(lessonId: string, itemId: string) {
  try {
    const list = JSON.parse(localStorage.getItem(REPORTS_KEY) ?? '[]') as unknown[]
    list.push({ lessonId, itemId, at: new Date().toISOString() })
    localStorage.setItem(REPORTS_KEY, JSON.stringify(list.slice(-200)))
  } catch {
    /* không lưu được thì thôi */
  }
}

interface FeedbackSheetProps {
  lessonId: string
  exercise: Exercise
  outcome: CheckOutcome
  /** câu sai này còn quay lại cuối bài không */
  willRetry: boolean
  /** đoạn văn liên quan (gửi kèm khi hỏi AI) */
  context?: string
  onContinue: () => void
  /** bài nói "máy chưa nghe rõ" -> cho nói lại */
  onSpeakAgain?: () => void
}

export function FeedbackSheet({ lessonId, exercise, outcome, willRetry, context, onContinue, onSpeakAgain }: FeedbackSheetProps) {
  const text = useLessonText()
  const { pick, language } = useLanguage()
  const { showToast } = useToast()
  const primaryRef = useRef<HTMLDivElement>(null)
  const [reported, setReported] = useState(false)
  const [ai, setAi] = useState<{ state: 'idle' | 'loading' | 'done' | 'error'; result?: AiExplanation }>({ state: 'idle' })

  const tone: SheetTone = outcome.sawSolution ? 'solution' : outcome.verdict
  const isAi = AI_GRADED_TYPES.includes(exercise.type)
  const why = pick(exercise.explanation)

  // mở khung -> con trỏ vào nút "Tiếp tục" (Enter = tiếp). Chờ 1 nhịp cho khung trượt xong.
  useEffect(() => {
    const timer = window.setTimeout(() => primaryRef.current?.querySelector('button')?.focus({ preventScroll: true }), 90)
    return () => window.clearTimeout(timer)
  }, [])

  async function askAi() {
    setAi({ state: 'loading' })
    try {
      const { result } = await api.explainMistake({
        question: outcome.questionText,
        userAnswer: outcome.userAnswerText,
        correctAnswer: outcome.correctAnswerText,
        context,
      })
      setAi({ state: 'done', result })
    } catch {
      setAi({ state: 'error' })
    }
  }

  /* ---------- tiêu đề + phần thân theo từng trường hợp ---------- */
  let title: string
  let lead: ReactNode = null
  if (tone === 'correct') {
    title = isAi ? text.continue : outcome.typo ? text.correctTypo : exercise.type === 'listen-choose' || exercise.type === 'listen-type' ? `${text.correctTitle} ${text.praiseListen}` : exercise.type === 'speak-sentence' ? `${text.correctTitle} ${text.praiseSpeak}` : text.correctTitle
    if (outcome.typo) lead = <p className="lp-sheet__note">{text.typoFix(outcome.typo.typed, outcome.typo.fixed)}</p>
    // nối cặp: khen cụ thể theo quá trình (không có dòng "vì sao")
    else if (exercise.type === 'match-pairs') lead = <p className="lp-sheet__note">{text.matchPraise(exercise.pairs.length, parseInt(outcome.userAnswerText) || 0)}</p>
  } else if (tone === 'wrong') {
    title = outcome.skipped ? text.skippedAnswerTitle : text.wrongTitle
  } else if (tone === 'solution') {
    title = text.hintSolutionLabel
  } else {
    title = outcome.skipped ? text.skippedTitle : text.unclearTitle
    lead = <p className="lp-sheet__note">{outcome.skipped ? text.skippedText : outcome.noMic || isAi ? text.unclearNoMic : text.unclearText}</p>
  }
  if (isAi && tone === 'correct') title = language === 'vi' ? 'Đã nhận xét xong' : 'Feedback ready'

  const showAnswer = (tone === 'wrong' || tone === 'solution') && !isAi
  const showAskAi = tone === 'wrong' && !isAi && exercise.type !== 'speak-sentence'

  return (
    <section className={`lp-sheet lp-sheet--${tone}`} role="region" aria-live="polite" aria-label={title}>
      <div className="lp-sheet__inner">
        <Mascot pose={TONE_POSE[tone]} placement="peek-top" size={104} peekDelayMs={350} peekRatio={0.74} className="lp-sheet__mascot" />
        <div className="lp-sheet__content">
          <div className="lp-sheet__heading">
            <span className="lp-sheet__icon" aria-hidden>
              <Icon name={TONE_ICON[tone]} size={18} strokeWidth={3} />
            </span>
            <h2 className="lp-sheet__title">{title}</h2>
          </div>

          <div className="lp-sheet__body">
            {showAnswer && (outcome.correctTokens ? <AnswerTokens tokens={outcome.correctTokens} /> : <p className="lp-sheet__answer">{outcome.correctAnswerText}</p>)}
            {tone === 'wrong' && outcome.userAnswerText && exercise.type !== 'match-pairs' && (
              <p className="lp-sheet__yours">
                {text.yourAnswer}: <s>{outcome.userAnswerText}</s>
              </p>
            )}
            {lead}
            {/* "Nghĩa là" không nhắc lại ở ghép câu: đề bài đã là câu tiếng Việt */}
            {why && !isAi && (
              <p className="lp-sheet__why">
                <span className="lp-sheet__why-tag">{text.whyLabel}</span>
                {why}
              </p>
            )}
            {tone === 'solution' && <p className="lp-sheet__note">{text.solutionShownText}</p>}
            {tone === 'wrong' && willRetry && (
              <p className="lp-sheet__retry">
                <LessonGlyph name="replay" size={15} /> {text.retryLater}
              </p>
            )}

            {ai.state !== 'idle' && (
              <div className={`lp-ai-explain is-${ai.state}`}>
                {ai.state === 'loading' && (
                  <p>
                    <span className="lp-dots" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>{' '}
                    {text.askingAi}
                  </p>
                )}
                {ai.state === 'error' && (
                  <p className="lp-ai-explain__error">
                    {text.aiFailed}{' '}
                    <button type="button" className="lp-link-btn" onClick={() => void askAi()}>
                      {text.tryAgain}
                    </button>
                  </p>
                )}
                {ai.state === 'done' && ai.result && (
                  <>
                    <p>{language === 'vi' ? ai.result.explanationVi : ai.result.explanationEn}</p>
                    {ai.result.examples?.slice(0, 2).map((example, index) => (
                      <p key={index} className="lp-ai-explain__example">
                        <strong lang="en">{example.en}</strong> — {example.vi}
                      </p>
                    ))}
                    {ai.result.memoryTipVi && (
                      <p className="lp-ai-explain__tip">
                        <LessonGlyph name="lightbulb" size={15} /> <span>{ai.result.memoryTipVi}</span>
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lp-sheet__actions">
          <IconButton
            icon="flag"
            label={reported ? text.reported : text.reportProblem}
            variant="plain"
            size="sm"
            pressed={reported}
            disabled={reported}
            onClick={() => {
              saveReport(lessonId, exercise.id)
              setReported(true)
              showToast({ icon: '🚩', text: text.reported })
            }}
          />
          {showAskAi && ai.state === 'idle' && (
            <Button variant="ghost" size="md" iconLeft={<LessonGlyph name="robot" size={18} />} onClick={() => void askAi()}>
              {text.askAiWhy}
            </Button>
          )}
          {onSpeakAgain && (
            <Button variant="secondary" size="md" iconLeft={<LessonGlyph name="mic" size={18} />} onClick={onSpeakAgain}>
              {text.tryAgainSpeak}
            </Button>
          )}
          <div ref={primaryRef}>
            <Button size="lg" onClick={onContinue} iconRight={<Kbd onColor>Enter</Kbd>} className="lp-sheet__continue">
              {text.continue}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
