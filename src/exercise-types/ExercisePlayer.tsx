/**
 * ExercisePlayer.tsx
 * (BẢN CŨ v2 — trình học v3 nằm ở src/features/lesson-player/. Giữ thư mục này vì phòng thi,
 *  bài xếp lớp và vài công cụ còn dùng exercise-shared.ts.)
 * ----------------------------------------------------------------------------
 * "MÁY CHẠY BÀI TẬP" KIỂU DUOLINGO — dùng chung cho 3 chế độ:
 *
 *   mode = 'practice'  : luyện tập. Câu sai được đưa xuống cuối hàng đợi để làm lại
 *                        đến khi đúng (giống Duolingo). Không có tim.
 *   mode = 'mini-test' : kiểm tra. 5 tim ❤, mỗi câu sai mất 1 tim, không làm lại.
 *                        Hết tim -> kết thúc, trượt.
 *   mode = 'review'    : ôn tập SRS. Mỗi câu làm 1 lần, báo kết quả để cập nhật thẻ.
 *
 * Màn hình: thanh tiến độ ở trên -> bài tập ở giữa -> thanh "Kiểm tra / Tiếp tục" ở đáy.
 * Phím Enter = Kiểm tra / Tiếp tục.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import type { Exercise } from '../content/content-types'
import { findPassage } from '../content/content-lookup'
import { ExplainWithAiButton } from '../components/ExplainWithAiButton'
import { RichText } from '../components/RichText'
import { stopSpeaking } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import { MultipleChoiceExercise, ListenChooseExercise, TrueFalseExercise } from './ChoiceExercises'
import { FillBlankExercise, ListenTypeExercise } from './TypingExercises'
import { ArrangeWordsExercise, MatchPairsExercise } from './WordTileExercises'
import { SpeakAnswerExercise, SpeakSentenceExercise } from './SpeakingExercises'
import { WriteAnswerExercise } from './WriteAnswerExercise'
import { AI_GRADED_TYPES, checkExerciseAnswer, type AnswerCheckResult, type ExerciseComponentProps } from './exercise-shared'

export const STARTING_HEARTS = 5

export interface ExerciseSessionSummary {
  firstTryCorrect: number // số câu đúng ngay lần đầu
  totalExercises: number
  heartsLeft: number
  failed: boolean // mini-test hết tim
}

interface ExercisePlayerProps {
  exercises: Exercise[]
  mode: 'practice' | 'mini-test' | 'review'
  targetBand?: string
  /** gọi sau mỗi lần kiểm tra (để ghi sổ lỗi sai, cập nhật thẻ ôn tập) */
  onExerciseChecked?: (exercise: Exercise, result: AnswerCheckResult, isFirstTry: boolean) => void
  onFinish: (summary: ExerciseSessionSummary) => void
  onQuit: () => void
  /** mini-test hết tim: trả về true nếu người học dùng "Hồi tim" để làm tiếp */
  onOutOfHearts?: () => Promise<boolean>
}

/** Chọn đúng component theo dạng bài. */
function renderExercise(props: ExerciseComponentProps): ReactNode {
  const { exercise } = props
  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoiceExercise {...props} exercise={exercise} />
    case 'listen-choose':
      return <ListenChooseExercise {...props} exercise={exercise} />
    case 'true-false':
      return <TrueFalseExercise {...props} exercise={exercise} />
    case 'fill-blank':
      return <FillBlankExercise {...props} exercise={exercise} />
    case 'listen-type':
      return <ListenTypeExercise {...props} exercise={exercise} />
    case 'arrange-words':
      return <ArrangeWordsExercise {...props} exercise={exercise} />
    case 'match-pairs':
      return <MatchPairsExercise {...props} exercise={exercise} />
    case 'speak-sentence':
      return <SpeakSentenceExercise {...props} exercise={exercise} />
    case 'speak-answer':
      return <SpeakAnswerExercise {...props} exercise={exercise} />
    case 'write-answer':
      return <WriteAnswerExercise {...props} exercise={exercise} />
  }
}

export function ExercisePlayer({ exercises, mode, targetBand, onExerciseChecked, onFinish, onQuit, onOutOfHearts }: ExercisePlayerProps) {
  const { t, pick } = useLanguage()

  // hàng đợi bài tập (chế độ luyện tập sẽ thêm câu sai vào cuối)
  const [queue, setQueue] = useState<Exercise[]>(exercises)
  const [position, setPosition] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [checkResult, setCheckResult] = useState<AnswerCheckResult | null>(null)
  const [hearts, setHearts] = useState(STARTING_HEARTS)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [firstTryCorrect, setFirstTryCorrect] = useState(0)
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set())

  const exercise = queue[position]
  const isAiGraded = AI_GRADED_TYPES.includes(exercise.type)
  const passage = findPassage(exercise.passageId)

  /** Bấm "Kiểm tra" */
  const check = useCallback((overrideAnswer?: string) => {
    const value = overrideAnswer ?? answer
    if (value === null || checkResult) return
    const result = checkExerciseAnswer(exercise, value)
    const isFirstTry = !attemptedIds.has(exercise.id)
    setCheckResult(result)
    setAttemptedIds((ids) => new Set(ids).add(exercise.id))
    onExerciseChecked?.(exercise, result, isFirstTry)

    if (result.isCorrect) {
      if (isFirstTry) setFirstTryCorrect((n) => n + 1)
      setCompletedIds((ids) => new Set(ids).add(exercise.id))
    } else if (mode === 'practice') {
      setQueue((current) => [...current, exercise]) // làm lại sau
    } else {
      if (mode === 'mini-test') setHearts((h) => h - 1)
      setCompletedIds((ids) => new Set(ids).add(exercise.id)) // review/mini-test: không làm lại
    }
  }, [answer, checkResult, exercise, attemptedIds, mode, onExerciseChecked])

  /** Bấm "Tiếp tục" */
  const goNext = useCallback(async () => {
    stopSpeaking()
    let currentHearts = hearts
    // hết tim: hỏi trang cha có muốn dùng "Hồi tim" (mua ở cửa hàng) không
    if (mode === 'mini-test' && currentHearts <= 0 && onOutOfHearts && (await onOutOfHearts())) {
      currentHearts = STARTING_HEARTS
      setHearts(STARTING_HEARTS)
    }
    const outOfHearts = mode === 'mini-test' && currentHearts <= 0
    const isLast = position + 1 >= queue.length
    if (outOfHearts || isLast) {
      onFinish({ firstTryCorrect, totalExercises: exercises.length, heartsLeft: currentHearts, failed: outOfHearts })
      return
    }
    setPosition((p) => p + 1)
    setAnswer(null)
    setCheckResult(null)
  }, [mode, hearts, position, queue.length, onFinish, firstTryCorrect, exercises.length, onOutOfHearts])

  // Bài AI chấm xong -> tự động coi như đã "kiểm tra"
  useEffect(() => {
    if (isAiGraded && answer !== null && !checkResult) check()
  }, [isAiGraded, answer, checkResult, check])

  // Phím Enter
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.shiftKey || isAiGraded) return
      event.preventDefault()
      if (checkResult) void goNext()
      else check()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [check, goNext, checkResult, isAiGraded])

  const progressPercent = (completedIds.size / exercises.length) * 100

  // màu thanh đáy: xanh (đúng), đỏ (sai), trung tính (chưa kiểm tra / bài AI)
  const footerState = !checkResult || isAiGraded ? '' : checkResult.isCorrect ? 'is-correct' : 'is-wrong'

  return (
    <div className="lesson-shell">
      {/* ---------- thanh trên cùng ---------- */}
      <div className="lesson-topbar">
        <button
          type="button"
          className="button button--ghost"
          aria-label={t('close')}
          onClick={() => {
            if (window.confirm(t('quitConfirm'))) onQuit()
          }}
        >
          ✕
        </button>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${progressPercent}%` }} />
        </div>
        {mode === 'mini-test' && (
          <div className="hearts" title={t('heartsLeft')}>
            ❤ {hearts}
          </div>
        )}
      </div>

      {/* ---------- nội dung bài tập ---------- */}
      <div className={`lesson-body ${passage ? 'lesson-body--wide' : ''}`}>
        <div style={passage ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 } : undefined}>
          {passage && (
            <div className="passage-box" style={{ maxHeight: '62vh' }}>
              <h4>{passage.title}</h4>
              <RichText text={passage.text} />
            </div>
          )}
          <div key={`${position}-${exercise.id}`}>
            {renderExercise({ exercise, isLocked: !!checkResult, onAnswerChange: setAnswer, targetBand })}
          </div>
        </div>
      </div>

      {/* ---------- thanh đáy: Kiểm tra / kết quả / Tiếp tục ---------- */}
      <div className={`feedback-footer ${footerState}`}>
        <div className="feedback-footer__inner">
          <div className="feedback-footer__detail">
            {checkResult && !isAiGraded && (
              <>
                <div className="feedback-footer__title">{checkResult.isCorrect ? `✓ ${t('correct')}` : `✗ ${t('incorrect')}`}</div>
                {!checkResult.isCorrect && (
                  <p>
                    <strong>{t('correctAnswerIs')}</strong> {checkResult.correctAnswerText}
                  </p>
                )}
                {exercise.explanation && <p>{pick(exercise.explanation)}</p>}
                {!checkResult.isCorrect && mode === 'practice' && <p className="small muted">↻ {t('retryLater')}</p>}
                {!checkResult.isCorrect && (
                  <ExplainWithAiButton
                    question={checkResult.questionText}
                    userAnswer={checkResult.userAnswerText}
                    correctAnswer={checkResult.correctAnswerText}
                    context={passage?.text}
                  />
                )}
              </>
            )}
          </div>
          <div className="row" style={{ flexWrap: 'nowrap' }}>
            {!checkResult && !isAiGraded && (
              <>
                <button type="button" className="button button--secondary" onClick={() => check('') /* bỏ qua = trả lời trống, tính là sai */}>
                  {t('skip')}
                </button>
                <button type="button" className="button button--primary button--large" disabled={answer === null} onClick={() => check()}>
                  {t('check')}
                </button>
              </>
            )}
            {(checkResult || (isAiGraded && answer !== null)) && (
              <button
                type="button"
                className={`button button--large ${checkResult && !checkResult.isCorrect && !isAiGraded ? 'button--danger' : 'button--success'}`}
                onClick={() => void goNext()}
                autoFocus
              >
                {t('continue')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
