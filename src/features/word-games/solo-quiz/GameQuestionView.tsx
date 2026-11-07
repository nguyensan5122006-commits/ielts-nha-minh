/**
 * GameQuestionView.tsx — HIỂN THỊ 1 CÂU SPELLING BEE (nghe từ rồi gõ đúng chính tả)
 * ----------------------------------------------------------------------------
 *   hình (nếu có) + gợi ý nghĩa + nút nghe lại + ô gõ to (Enter để gửi)
 * Sau khi lật đáp án (reveal): ô gõ tô xanh (đúng) hoặc cam san hô (sai — không đỏ chói,
 * 04-DESIGN-SYSTEM mục 1) + dòng "Đáp án đúng: …".
 * Cũng chứa thanh thời gian TimerBar / TimerBarIdle (trang Nối từ dùng lại).
 * Lớp CSS: gq-* trong src/features/playground/styles/game.css
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { GameQuestion } from './question-bank'
import { CardImage } from '../../../components/PlayerIdentity'
import { Button, IconButton } from '../../../design-system'
import { speak } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import '../../playground/styles/game.css'

interface GameQuestionViewProps {
  question: GameQuestion
  onAnswer: (answer: string) => void
  /** đã trả lời / hết giờ -> khoá */
  locked: boolean
  myAnswer: string | null
  /** sau khi lật: đáp án đúng */
  reveal?: { correctAnswer: string } | null
}

export function GameQuestionView({ question, onAnswer, locked, myAnswer, reveal }: GameQuestionViewProps) {
  const { t } = useLanguage()
  const [typed, setTyped] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // câu mới: xoá ô gõ, tự đọc từ cần đánh vần
  useEffect(() => {
    setTyped('')
    void speak(question.audioText)
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }, [question])

  function submitTyped(event: FormEvent) {
    event.preventDefault()
    if (!locked && typed.trim()) onAnswer(typed.trim())
  }

  const isRight = !!myAnswer && !!reveal && myAnswer.trim().toLowerCase() === reveal.correctAnswer.trim().toLowerCase()

  return (
    <div className={`gq ${reveal ? 'is-revealed' : ''}`}>
      {question.image && (
        <div className="gq__image">
          <CardImage image={question.image} size={110} />
        </div>
      )}
      <div className="gq__prompt-row">
        <div className="gq__prompt">{question.prompt}</div>
        <IconButton icon="volume" label={t('listenNormal')} variant="primary" size="lg" className="gq__speaker" onClick={() => speak(question.audioText)} />
      </div>

      <form onSubmit={submitTyped} className="gq-type">
        <input
          ref={inputRef}
          className={`pg-input pg-input--big gq-type__input ${reveal ? (isRight ? 'is-correct' : 'is-wrong') : ''}`}
          value={locked ? (myAnswer ?? typed) : typed}
          onChange={(e) => setTyped(e.target.value)}
          disabled={locked}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={t('typeTheWord')}
          aria-label={t('typeTheWord')}
        />
        <Button type="submit" size="lg" disabled={locked || !typed.trim()}>
          {t('submit')}
        </Button>
      </form>

      {reveal && (
        <p className="gq-answer">
          {t('correctAnswerIs')} <strong>{reveal.correctAnswer}</strong>
        </p>
      )}
    </div>
  )
}

/** Thanh thời gian chạy lùi (cam -> cam san hô khi còn < 30%; không nhấp nháy). */
export function TimerBar({ startedAt, durationMs }: { startedAt: number; durationMs: number }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 100)
    return () => window.clearInterval(timer)
  }, [])
  const remaining = Math.max(0, startedAt + durationMs - now)
  const percent = (remaining / durationMs) * 100
  return (
    <div className={`gq-timer ${percent < 30 ? 'is-low' : ''}`} role="timer" aria-label={`${Math.ceil(remaining / 1000)}s`}>
      <div className="gq-timer__fill" style={{ width: `${percent}%` }} />
      <span className="gq-timer__label ds-num">{Math.ceil(remaining / 1000)}s</span>
    </div>
  )
}

/** Thanh thời gian "đứng yên" (lúc đang lật đáp án) — giữ chỗ để bố cục không nhảy. */
export function TimerBarIdle() {
  return (
    <div className="gq-timer is-idle" aria-hidden>
      <div className="gq-timer__fill" style={{ width: '0%' }} />
    </div>
  )
}
