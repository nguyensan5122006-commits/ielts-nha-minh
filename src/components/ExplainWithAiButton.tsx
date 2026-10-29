/**
 * ExplainWithAiButton.tsx — NÚT "TẠI SAO SAI? (AI)"
 * Bấm -> gửi câu hỏi + đáp án của người học + đáp án đúng cho Gemini,
 * hiện lời giải thích ngay bên dưới.
 */
import { useState } from 'react'
import { api, type AiExplanation } from '../services/api-client'
import { useLanguage } from '../translations/language-context'

interface ExplainWithAiButtonProps {
  question: string
  userAnswer: string
  correctAnswer: string
  context?: string
}

export function ExplainWithAiButton(props: ExplainWithAiButtonProps) {
  const { t, language } = useLanguage()
  const [explanation, setExplanation] = useState<AiExplanation | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function askAi() {
    setIsLoading(true)
    setError('')
    try {
      const { result } = await api.explainMistake(props)
      setExplanation(result)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  if (explanation) {
    return (
      <div className="card card--soft small" style={{ marginTop: 8, padding: 14 }}>
        <p>{language === 'vi' ? explanation.explanationVi : explanation.explanationEn}</p>
        {explanation.examples?.map((example, index) => (
          <p key={index} style={{ marginBottom: 4 }}>
            • <strong>{example.en}</strong> <span className="muted">— {example.vi}</span>
          </p>
        ))}
        {explanation.memoryTipVi && <p style={{ marginTop: 8, marginBottom: 0 }}>💡 {explanation.memoryTipVi}</p>}
      </div>
    )
  }

  return (
    <div>
      <button type="button" className="button button--ghost button--small" onClick={askAi} disabled={isLoading}>
        {isLoading ? <span className="spinner" /> : '🤖'} {t('whyWrong')}
      </button>
      {error && <div className="alert small">{error}</div>}
    </div>
  )
}
