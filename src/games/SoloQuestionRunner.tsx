/**
 * SoloQuestionRunner.tsx — CHẠY 1 LƯỢT CÂU HỎI KHI CHƠI MỘT MÌNH
 * ----------------------------------------------------------------------------
 * Dùng cho: Đố vui / Spelling Bee / Đua xếp câu (chơi 1 mình), Giải đấu tuần, Đánh Boss.
 * Mỗi câu có đồng hồ riêng. Trả lời (hoặc hết giờ) -> hiện đúng/sai 1,2 giây -> câu sau.
 * Điểm: đúng 50 + thưởng tốc độ tới 50 (giống đấu trực tiếp).
 * onAnswered: gọi sau mỗi câu (trang Boss dùng để tính đòn đánh).
 * (v3) Giao diện: thanh trên (câu n/N · chuỗi đúng liền · điểm), khung phản hồi trượt lên
 *      dưới câu hỏi (xanh "Đúng rồi! +85" / cam san hô "Chưa đúng — đáp án: …"),
 *      âm thanh nhẹ correct / oops (tắt được trong Cài đặt).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { correctAnswerText, isGameAnswerCorrect, pointsForAnswer, type GameQuestion } from '../game-questions/question-bank'
import { Icon, playSound, ProgressBar } from '../design-system'
import { usePlayText } from '../features/playground/playground-text'
import { useLanguage } from '../translations/language-context'
import { GameQuestionView, TimerBar, TimerBarIdle } from './GameQuestionView'

const REVEAL_MS = 1200

export interface SoloRunResult {
  score: number
  correct: number
  total: number
  bestCombo: number
}

interface SoloQuestionRunnerProps {
  questions: GameQuestion[]
  secondsPerQuestion: number
  onFinish: (result: SoloRunResult) => void
  onAnswered?: (isCorrect: boolean, combo: number) => void
  /** phần hiển thị thêm phía trên (VD thanh máu Boss) */
  header?: ReactNode
}

export function SoloQuestionRunner({ questions, secondsPerQuestion, onFinish, onAnswered, header }: SoloQuestionRunnerProps) {
  const { t } = useLanguage()
  const playText = usePlayText()
  const [index, setIndex] = useState(0)
  const [startedAt, setStartedAt] = useState(Date.now())
  const [myAnswer, setMyAnswer] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [combo, setCombo] = useState(0)
  const [bestCombo, setBestCombo] = useState(0)
  const [lastPoints, setLastPoints] = useState<number | null>(null)
  const finished = useRef(false)

  const question = questions[index]
  const timeLimitMs = secondsPerQuestion * 1000

  const handleAnswer = useCallback(
    (answer: string) => {
      if (revealed || !question) return
      const isCorrect = answer !== '' && isGameAnswerCorrect(question, answer)
      const points = pointsForAnswer(isCorrect, Date.now() - startedAt, timeLimitMs)
      const newCombo = isCorrect ? combo + 1 : 0
      setMyAnswer(answer)
      setRevealed(true)
      setLastPoints(points)
      setScore((s) => s + points)
      if (isCorrect) setCorrect((c) => c + 1)
      setCombo(newCombo)
      setBestCombo((b) => Math.max(b, newCombo))
      playSound(isCorrect ? 'correct' : 'oops')
      onAnswered?.(isCorrect, newCombo)
    },
    [revealed, question, startedAt, timeLimitMs, combo, onAnswered],
  )

  // hết giờ = trả lời trống
  useEffect(() => {
    if (revealed) return
    const timer = window.setTimeout(() => handleAnswer(''), Math.max(0, startedAt + timeLimitMs - Date.now()))
    return () => window.clearTimeout(timer)
  }, [revealed, startedAt, timeLimitMs, handleAnswer])

  // sau khi lật đáp án: sang câu tiếp hoặc kết thúc
  useEffect(() => {
    if (!revealed) return
    const timer = window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        if (!finished.current) {
          finished.current = true
          onFinish({ score, correct, total: questions.length, bestCombo })
        }
        return
      }
      setIndex(index + 1)
      setMyAnswer(null)
      setRevealed(false)
      setLastPoints(null)
      setStartedAt(Date.now())
    }, REVEAL_MS)
    return () => window.clearTimeout(timer)
  }, [revealed, index, questions.length, onFinish, score, correct, bestCombo])

  if (!question) return null
  const wasCorrect = revealed && (lastPoints ?? 0) > 0
  const timedOut = revealed && myAnswer === ''

  return (
    <div className="gq-stage">
      {header}
      <div className="gq-stage__bar">
        <span className="gq-chip ds-num">
          {t('question')} {index + 1}/{questions.length}
        </span>
        <ProgressBar value={index + (revealed ? 1 : 0)} max={questions.length} size="sm" showHead={false} label={t('question')} className="gq-stage__progress" />
        {combo >= 3 && (
          <span className="gq-chip gq-chip--streak" key={`combo-${combo}`}>
            <Icon name="sparkle" size={14} /> {playText('soloCombo', { n: combo })}
          </span>
        )}
        <span className="gq-score">
          <span className="gq-score__label">{playText('soloScore')}</span>
          <strong className="ds-num" key={`score-${score}`}>
            {score}
          </strong>
        </span>
      </div>
      <div className="gq-card">
        {!revealed ? <TimerBar key={index} startedAt={startedAt} durationMs={timeLimitMs} /> : <TimerBarIdle />}
        <GameQuestionView
          question={question}
          onAnswer={handleAnswer}
          locked={revealed}
          myAnswer={myAnswer}
          reveal={revealed ? { correctIndex: question.correctIndex, correctAnswer: correctAnswerText(question) } : null}
        />
        {revealed && (
          <div className={`gq-feedback ${wasCorrect ? 'is-good' : 'is-oops'}`} role="status">
            <span className="gq-feedback__icon" aria-hidden>
              <Icon name={wasCorrect ? 'check' : timedOut ? 'clock' : 'close'} size={18} strokeWidth={3} />
            </span>
            <strong>{wasCorrect ? playText('roomCorrect') : timedOut ? playText('roomTimeout') : playText('roomWrong')}</strong>
            {wasCorrect ? (
              <span className="gq-feedback__points ds-num">+{lastPoints}</span>
            ) : (
              question.kind === 'choice' && <span className="gq-feedback__answer">{playText('roomAnswerWas', { answer: correctAnswerText(question) })}</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
