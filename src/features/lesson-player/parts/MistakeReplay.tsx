/**
 * MistakeReplay.tsx — "ÔN LẠI CÂU SAI" NGAY TRÊN MÀN KẾT QUẢ (khoảng 1 phút)
 * ----------------------------------------------------------------------------
 * Làm lại 1–3 câu vừa sai, ngay lập tức (lúc trí nhớ còn "nóng" — spaced retrieval
 * sớm). Mỗi câu: trả lời -> Enter kiểm tra -> khung phản hồi gọn -> Enter tiếp.
 * Kết quả được ghi vào tiến độ (recordAnswer -> thẻ ôn "item:<id>" cập nhật).
 * Xong -> quay về màn kết quả, mục "Câu cần ôn" chuyển thành "Đã ôn lại N câu".
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Exercise, Lesson, LevelId } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { ProgressBar } from '../../../design-system/components/ProgressBar'
import { playSound } from '../../../design-system/sound-kit'
import { useProgress } from '../../../learning-progress/progress-store'
import { stopSpeaking } from '../../../services/text-to-speech'
import { checkExerciseAnswer, isSelfSubmitting, type CheckOutcome } from '../exercises/exercise-contract'
import { ExerciseView } from '../exercises/ExerciseView'
import { replayCurrentAudio } from '../exercises/ListenHero'
import { useLessonText } from '../lesson-player-text'
import { passageOf, skillOfExercise } from '../session/exercise-skill'
import { BottomBar, CheckButton } from './ActionBar'
import { FeedbackSheet } from './FeedbackSheet'

interface MistakeReplayProps {
  /** quay về màn kết quả giữa chừng */
  onCancel: () => void
  lesson: Lesson
  exercises: Exercise[]
  levelId?: LevelId
  targetBand?: string
  onDone: (correctCount: number) => void
}

export function MistakeReplay({ lesson, exercises, levelId, targetBand, onDone, onCancel }: MistakeReplayProps) {
  const text = useLessonText()
  const { recordAnswer } = useProgress()
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<CheckOutcome | null>(null)
  const correctCount = useRef(0)
  const checkedAt = useRef(0)
  const exercise = exercises[index]

  const check = useCallback(
    (value: string | null = answer) => {
      if (value === null || outcome) return
      const result = checkExerciseAnswer(exercise, value)
      setOutcome(result)
      checkedAt.current = Date.now()
      if (result.verdict === 'correct') {
        correctCount.current++
        playSound('correct')
      } else if (result.verdict === 'wrong') playSound('oops')
      if (result.verdict !== 'unclear') {
        recordAnswer(
          skillOfExercise(exercise, lesson),
          result.verdict === 'correct',
          exercise.id,
          result.verdict === 'wrong'
            ? { source: 'review', itemId: exercise.id, parentId: lesson.id, question: result.questionText, userAnswer: result.userAnswerText, correctAnswer: result.correctAnswerText, explanation: exercise.explanation?.vi }
            : undefined,
        )
      }
    },
    [answer, outcome, exercise, lesson, recordAnswer],
  )

  const next = useCallback(() => {
    if (!outcome || Date.now() - checkedAt.current < 300) return
    stopSpeaking()
    if (index + 1 >= exercises.length) {
      onDone(correctCount.current)
      return
    }
    setIndex(index + 1)
    setAnswer(null)
    setOutcome(null)
  }, [outcome, index, exercises.length, onDone])

  // Enter = kiểm tra / tiếp ; Space, R = nghe lại
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      const inText = !!target.closest('input, textarea')
      if (target.closest('[role="dialog"]')) return
      if (event.key === 'Enter' && !event.shiftKey && target.tagName !== 'BUTTON' && target.tagName !== 'A' && target.tagName !== 'TEXTAREA') {
        event.preventDefault()
        if (outcome) next()
        else if (!isSelfSubmitting(exercise)) check()
      } else if ((event.key === ' ' || event.key.toLowerCase() === 'r') && !inText && !event.ctrlKey) {
        if (replayCurrentAudio()) event.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [outcome, next, check, exercise])

  return (
    <div className="lp-replay">
      <div className="lp-replay__top">
        <Button variant="ghost" size="sm" iconLeft={<Icon name="chevron-right" size={16} className="lp-flip" />} onClick={onCancel}>
          {text.backToResults}
        </Button>
        <span className="lp-replay__label">{text.reviewOf(index + 1, exercises.length)}</span>
        <ProgressBar value={index + (outcome ? 1 : 0)} max={exercises.length} size="sm" />
      </div>
      <div className="lp-stage lp-stage--replay" key={exercise.id}>
        <ExerciseView
          exercise={exercise}
          outcome={outcome}
          hintLevel={0}
          attempt={3 /* thứ tự đáp án khác lần trước -> không nhớ vị trí */}
          onAnswerChange={setAnswer}
          onSubmit={(value) => check(value)}
          showTypingTip={false}
          onDismissTypingTip={() => {}}
          levelId={levelId}
          targetBand={targetBand}
        />
      </div>
      <div className="lp-fixed-footer">
      {outcome ? (
        <FeedbackSheet
          lessonId={lesson.id}
          exercise={exercise}
          outcome={outcome}
          willRetry={false}
          context={passageOf(lesson, exercise)?.text}
          onContinue={next}
        />
      ) : (
        <BottomBar right={!isSelfSubmitting(exercise) && <CheckButton disabled={answer === null} onClick={() => check()} />} />
      )}
      </div>
    </div>
  )
}
