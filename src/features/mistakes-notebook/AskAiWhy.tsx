/**
 * AskAiWhy.tsx — NÚT "HỎI AI VÌ SAO" + KHUNG LỜI GIẢI THÍCH
 * ----------------------------------------------------------------------------
 *   <AskAiWhy question="She ___ to work." userAnswer="go" correctAnswer="goes" />
 *
 * Bấm -> gửi câu hỏi + câu trả lời + đáp án đúng cho AI (API cũ /api/ai/explain-mistake,
 * dùng Gemini ở máy chủ) -> hiện lời giải thích ngay bên dưới (không popup che chữ).
 * Lời giải thích được nhớ trong phiên (Map ở cấp module) để bấm lại không tốn lượt AI.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { Button } from '../../design-system/components/Button'
import { api, type AiExplanation } from '../../services/api-client'
import { useLanguage } from '../../translations/language-context'
import { useMistakesText } from './mistakes-notebook-text'
import './AskAiWhy.css'

export interface AskAiWhyProps {
  question: string
  userAnswer: string
  correctAnswer: string
  /** đoạn văn / lời thoại liên quan (giúp AI giải thích đúng ngữ cảnh) */
  context?: string
  size?: 'sm' | 'md'
}

/** Nhớ lời giải thích đã hỏi (theo câu + câu trả lời) trong lúc web đang mở. */
const explanationCache = new Map<string, AiExplanation>()

export function AskAiWhy({ question, userAnswer, correctAnswer, context, size = 'sm' }: AskAiWhyProps) {
  const text = useMistakesText()
  const { language } = useLanguage()
  const cacheKey = `${question}\u0000${userAnswer}\u0000${correctAnswer}`
  const [explanation, setExplanation] = useState<AiExplanation | null>(() => explanationCache.get(cacheKey) ?? null)
  const [isLoading, setIsLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  async function ask() {
    setIsLoading(true)
    setFailed(false)
    try {
      const { result } = await api.explainMistake({ question, userAnswer, correctAnswer, context: context?.slice(0, 4000) })
      explanationCache.set(cacheKey, result)
      setExplanation(result)
    } catch {
      setFailed(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (explanation) {
    return (
      <div className="mn-ai" role="note">
        <p className="mn-ai__text">{language === 'vi' ? explanation.explanationVi : explanation.explanationEn}</p>
        {explanation.examples?.length > 0 && (
          <ul className="mn-ai__examples">
            {explanation.examples.slice(0, 3).map((example, index) => (
              <li key={index}>
                <span lang="en">{example.en}</span>
                <span className="mn-ai__vi"> — {example.vi}</span>
              </li>
            ))}
          </ul>
        )}
        {explanation.memoryTipVi && (
          <p className="mn-ai__tip">
            <strong>{text.aiTip}:</strong> {explanation.memoryTipVi}
          </p>
        )}
      </div>
    )
  }

  return (
    <span className="mn-ai-trigger">
      <Button variant="ghost" size={size} iconLeft="sparkle" loading={isLoading} onClick={ask}>
        {isLoading ? text.askingAi : text.askAi}
      </Button>
      {failed && (
        <span className="mn-ai-trigger__error" role="alert">
          {text.aiError}
        </span>
      )}
    </span>
  )
}
