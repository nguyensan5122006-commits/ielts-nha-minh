/**
 * WriteAnswerExercise.tsx — BÀI VIẾT TỰ DO (AI CHẤM)
 * Người học viết vào ô, đủ số từ tối thiểu mới gửi được, AI trả về band + lỗi + bản sửa.
 */
import { useState } from 'react'
import type { WriteAnswerExercise as WriteAnswerData } from '../content/content-types'
import { AiFeedbackCard } from '../components/AiFeedbackCard'
import { api, type AiGradingResult } from '../services/api-client'
import { countWords } from '../services/answer-checking'
import { useLanguage } from '../translations/language-context'
import { AI_DONE_PREFIX, AI_FAILED_ANSWER, type ExerciseComponentProps } from './exercise-shared'

export function WriteAnswerExercise({ exercise, onAnswerChange, targetBand }: ExerciseComponentProps<WriteAnswerData>) {
  const { t } = useLanguage()
  const [text, setText] = useState('')
  const [isGrading, setIsGrading] = useState(false)
  const [result, setResult] = useState<AiGradingResult | null>(null)
  const [error, setError] = useState('')
  const wordCount = countWords(text)

  async function sendToAi() {
    setIsGrading(true)
    setError('')
    try {
      const { result: grading } = await api.gradeWriting({ prompt: exercise.prompt, answer: text, taskKind: 'lesson', targetBand })
      setResult(grading)
      onAnswerChange(AI_DONE_PREFIX + grading.overallBand)
    } catch (e) {
      setError((e as Error).message)
      onAnswerChange(AI_FAILED_ANSWER)
    } finally {
      setIsGrading(false)
    }
  }

  return (
    <>
      <div className="exercise-instruction">{t('writeAnswer')}</div>
      <p className="exercise-prompt" style={{ fontWeight: 600, whiteSpace: 'pre-line' }}>
        {exercise.prompt}
      </p>
      <details style={{ marginBottom: 16 }}>
        <summary>💡 {t('tips')}</summary>
        <p style={{ marginTop: 8 }}>{exercise.tipsVi}</p>
      </details>

      <textarea className="text-area" value={text} onChange={(event) => setText(event.target.value)} disabled={isGrading || !!result} placeholder={t('typeAnswerHere')} />
      <div className="row row--between" style={{ marginTop: 10 }}>
        <span className={wordCount >= exercise.minWords ? 'badge badge--success' : 'badge'}>{t('wordCount', { n: wordCount, min: exercise.minWords })}</span>
        {!result && (
          <button type="button" className="button button--primary" disabled={wordCount < exercise.minWords || isGrading} onClick={sendToAi}>
            {isGrading ? (
              <>
                <span className="spinner" /> {t('aiGrading')}
              </>
            ) : (
              <>🤖 {t('sendToAi')}</>
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="alert" style={{ marginTop: 12 }}>
          {error} — {t('aiUnavailableContinue')}
        </div>
      )}
      {result && (
        <>
          <AiFeedbackCard result={result} />
          <details style={{ marginTop: 12 }}>
            <summary>{t('sampleAnswer')}</summary>
            <p style={{ marginTop: 8, whiteSpace: 'pre-line' }}>{exercise.sampleAnswer}</p>
          </details>
        </>
      )}
    </>
  )
}
