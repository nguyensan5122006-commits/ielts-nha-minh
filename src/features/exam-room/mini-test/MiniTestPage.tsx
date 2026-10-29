/**
 * MiniTestPage.tsx — /lesson/:lessonId/mini-test · MINI-TEST CÓ TIM CUỐI BÀI (bản v3)
 * ----------------------------------------------------------------------------
 * Theo quyết định v3: bài học KHÔNG có tim; tim chỉ còn ở mini-test.
 *   - Bài có `miniTest` (100 bài cũ của Level 1–2, mỗi bài 6 câu): làm ở đây.
 *   - Bài v3 có `miniTest: []` -> quay thẳng về trình học /lesson/:id (không ngõ cụt, không màn trống).
 *   - Bài không tồn tại -> về /learn.
 *
 * Luật (giữ như bản cũ src/_legacy-v2/MiniTestPage.tsx): 5 tim, sai 1 câu mất 1 tim, không làm lại câu đã qua.
 *   Còn tim tới câu cuối = qua: 5 tim = 3 sao · 3–4 tim = 2 sao · 1–2 tim = 1 sao.
 *   Hết tim: màn "Hết tim rồi" -> làm lại từ đầu hoặc ôn lại bài.
 *   "Máy chưa nghe rõ" (bài nói) không trừ tim.
 * Dạng bài vẽ bằng ExerciseView + chấm bằng checkExerciseAnswer của nhóm lesson-player (giống
 * parts/MistakeReplay.tsx) -> mini-test trông và chạy y như bài học.
 * Ghi tiến độ: recordAnswer từng câu (câu sai -> sổ lỗi + thẻ ôn "item:"), cuối lượt
 * recordMiniTestAttempt + addXp + markStudyDay (mini-test tính là có học hôm nay).
 * Mini-test ngắn (6 câu) nên không lưu giữa chừng — thoát là làm lại từ đầu (hộp thoại nói rõ).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { FocusLayout } from '../../../app/layout'
import type { Exercise, Lesson } from '../../../content/content-types'
import { findNextLesson, findUnitOfLesson } from '../../../content/path-selectors'
import { useLesson } from '../../../content/use-lesson'
import { Button, EmptyState, Icon, Kbd, Mascot, Modal, ProgressBar, Skeleton } from '../../../design-system'
import { playSound } from '../../../design-system/sound-kit'
import { useProgress } from '../../../learning-progress/progress-store'
import { stopSpeaking } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import { checkExerciseAnswer, isSelfSubmitting, type CheckOutcome } from '../../lesson-player/exercises/exercise-contract'
import { ExerciseView } from '../../lesson-player/exercises/ExerciseView'
import { replayCurrentAudio } from '../../lesson-player/exercises/ListenHero'
import '../../lesson-player/lesson-player.css'
import { BottomBar, CheckButton } from '../../lesson-player/parts/ActionBar'
import { FeedbackSheet } from '../../lesson-player/parts/FeedbackSheet'
import { passageOf, skillOfExercise } from '../../lesson-player/session/exercise-skill'
import { useExamRoomText } from '../exam-room-text'
import '../exam-room.css'
import './mini-test.css'

/** Số tim mỗi lượt. */
export const MINI_TEST_HEARTS = 5

export function starsFromHearts(hearts: number): 1 | 2 | 3 {
  if (hearts >= MINI_TEST_HEARTS) return 3
  if (hearts >= 3) return 2
  return 1
}

export function MiniTestPage() {
  const { lessonId = '' } = useParams()
  const text = useExamRoomText()
  const navigate = useNavigate()
  const { lesson, status, retry } = useLesson(lessonId)

  if (status === 'not-found') return <Navigate to="/learn" replace />
  if (status === 'ready' && lesson && lesson.miniTest.length === 0) return <Navigate to={`/lesson/${lesson.id}`} replace />
  if (status !== 'ready' || !lesson) {
    return (
      <FocusLayout onExit={() => navigate('/learn')} exitLabel={text('miniExit')} progress={<ProgressBar value={0} max={1} label={text('miniLoading')} />}>
        {status === 'error' ? (
          <EmptyState pose="thinking" title={text('miniLoadError')} action={<Button onClick={retry}>{text('retry')}</Button>} />
        ) : (
          <div className="lp-loading" aria-busy="true" aria-label={text('miniLoading')}>
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rect" height={240} />
          </div>
        )}
      </FocusLayout>
    )
  }
  return <MiniTestRun key={lesson.id} lesson={lesson} />
}

type Phase = 'intro' | 'test' | 'passed' | 'failed'

function MiniTestRun({ lesson }: { lesson: Lesson }) {
  const text = useExamRoomText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const { progress, recordAnswer, recordMiniTestAttempt, addXp, markStudyDay } = useProgress()
  const exercises = lesson.miniTest
  const location = findUnitOfLesson(lesson.id)
  const levelId = location?.level.id
  const targetBand = location?.level.bandRange

  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<CheckOutcome | null>(null)
  const [hearts, setHearts] = useState(MINI_TEST_HEARTS)
  const [heartBump, setHeartBump] = useState(0)
  const [exitOpen, setExitOpen] = useState(false)
  const [reward, setReward] = useState<{ stars: number; xp: number } | null>(null)
  const correctCount = useRef(0)
  const checkedAt = useRef(0)
  const exercise: Exercise | undefined = exercises[index]
  const previous = progress.miniTests[lesson.id]
  const lessonDone = !!progress.lessons[lesson.id]

  const restart = () => {
    stopSpeaking()
    correctCount.current = 0
    setIndex(0)
    setAnswer(null)
    setOutcome(null)
    setHearts(MINI_TEST_HEARTS)
    setReward(null)
    setPhase('test')
  }

  /* ---------- chấm 1 câu ---------- */
  const check = useCallback(
    (value: string | null = answer) => {
      if (value === null || outcome || !exercise) return
      const result = checkExerciseAnswer(exercise, value)
      setOutcome(result)
      checkedAt.current = Date.now()
      if (result.verdict === 'correct') {
        correctCount.current++
        playSound('correct')
      } else if (result.verdict === 'wrong') {
        playSound('oops')
        setHearts((current) => current - 1)
        setHeartBump((current) => current + 1)
      }
      if (result.verdict !== 'unclear') {
        recordAnswer(
          skillOfExercise(exercise, lesson),
          result.verdict === 'correct',
          exercise.id,
          result.verdict === 'wrong'
            ? { source: 'mini-test', itemId: exercise.id, parentId: lesson.id, question: result.questionText, userAnswer: result.userAnswerText, correctAnswer: result.correctAnswerText, explanation: exercise.explanation?.vi }
            : undefined,
        )
      }
    },
    [answer, outcome, exercise, lesson, recordAnswer],
  )

  /* ---------- kết thúc lượt ---------- */
  const finish = useCallback(
    (passed: boolean, heartsLeft: number) => {
      stopSpeaking()
      markStudyDay()
      if (!passed) {
        recordMiniTestAttempt(lesson.id, false, 0)
        setPhase('failed')
        return
      }
      const stars = starsFromHearts(heartsLeft)
      const xp = (previous ? 5 : 15) + stars * 5
      recordMiniTestAttempt(lesson.id, true, stars)
      addXp(xp)
      setReward({ stars, xp })
      playSound('complete')
      setPhase('passed')
    },
    [lesson.id, previous, recordMiniTestAttempt, addXp, markStudyDay],
  )

  const next = useCallback(() => {
    if (!outcome || Date.now() - checkedAt.current < 300) return
    stopSpeaking()
    if (hearts <= 0) {
      finish(false, 0)
      return
    }
    if (index + 1 >= exercises.length) {
      finish(true, hearts)
      return
    }
    setIndex(index + 1)
    setAnswer(null)
    setOutcome(null)
  }, [outcome, hearts, index, exercises.length, finish])

  /* ---------- phím: Enter kiểm tra / tiếp · Space, R nghe lại ---------- */
  useEffect(() => {
    if (phase !== 'test' || exitOpen) return
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      if (target.closest('[role="dialog"]')) return
      const inText = !!target.closest('input, textarea')
      if (event.key === 'Enter' && !event.shiftKey && target.tagName !== 'BUTTON' && target.tagName !== 'A' && target.tagName !== 'TEXTAREA') {
        event.preventDefault()
        if (outcome) next()
        else if (exercise && !isSelfSubmitting(exercise)) check()
      } else if ((event.key === ' ' || event.key.toLowerCase() === 'r') && !inText && !event.ctrlKey) {
        if (replayCurrentAudio()) event.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, exitOpen, outcome, next, check, exercise])

  // màn mở đầu: Enter = bắt đầu
  useEffect(() => {
    if (phase !== 'intro') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || (event.target as HTMLElement).closest('button, a, [role="dialog"]')) return
      event.preventDefault()
      restart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const leave = () => {
    stopSpeaking()
    navigate('/learn')
  }
  const onExit = () => (phase === 'test' && (index > 0 || outcome) ? setExitOpen(true) : leave())

  /* ---------- trên thanh trên: tim ---------- */
  const heartsBadge = (
    <span className="xr-hearts" key={heartBump} aria-label={text('miniHeartsLeft', { n: Math.max(0, hearts) })}>
      <span className={heartBump > 0 ? 'xr-hearts__icon is-bumped' : 'xr-hearts__icon'} aria-hidden>
        ❤
      </span>
      <span className="xr-hearts__count ds-num">{Math.max(0, hearts)}</span>
    </span>
  )

  /* ======================= màn mở đầu / kết quả ======================= */
  if (phase !== 'test' || !exercise) {
    const nextLesson = phase === 'passed' ? findNextLesson(progress) : null
    return (
      <FocusLayout onExit={leave} exitLabel={text('miniExit')} progress={<ProgressBar value={phase === 'intro' ? 0 : exercises.length} max={exercises.length} label={text('miniProgress')} />} trailing={phase === 'intro' ? undefined : heartsBadge}>
        <div className="xr-mini-screen">
          {phase === 'intro' && (
            <>
              <Mascot pose="thumbs-up" size={150} />
              <span className="xr-eyebrow">{text('miniEyebrow')}</span>
              <h1 className="xr-mini-screen__title">{pick(lesson.title)}</h1>
              <p className="xr-mini-screen__text">{text('miniIntroText', { n: exercises.length })}</p>
              <p className="xr-mini-hearts" aria-hidden>
                {'❤'.repeat(MINI_TEST_HEARTS)}
              </p>
              <p className="xr-mini-screen__rule">{text('miniStarsRule')}</p>
              {!lessonDone && (
                <p className="xr-notice">
                  <Icon name="hint" size={18} /> {text('miniLessonFirst')}
                </p>
              )}
              {previous && (
                <p className="xr-notice xr-notice--info">
                  <Icon name="star" size={18} /> {text('miniAlreadyPassed', { stars: previous.stars })}
                </p>
              )}
              <div className="xr-mini-screen__actions">
                <Button variant="secondary" size="lg" to={`/lesson/${lesson.id}`}>
                  {lessonDone ? text('miniBackToLesson') : text('miniLearnFirst')}
                </Button>
                <Button size="lg" onClick={restart} iconRight={<Kbd onColor>Enter</Kbd>}>
                  {text('miniStart')}
                </Button>
              </div>
            </>
          )}

          {phase === 'passed' && reward && (
            <>
              <Mascot pose="celebrate" size={170} />
              <h1 className="xr-mini-screen__title">{text('miniPassedTitle')}</h1>
              <p className="xr-mini-stars" aria-label={`${reward.stars}/3`}>
                {[1, 2, 3].map((star) => (
                  <span key={star} className={star <= reward.stars ? 'is-on' : ''} aria-hidden>
                    ★
                  </span>
                ))}
              </p>
              <p className="xr-mini-screen__text">
                {text('miniPassedText', { h: hearts, c: correctCount.current, t: exercises.length })} · <strong className="xr-mini-xp">{text('miniXp', { n: reward.xp })}</strong>
              </p>
              <div className="xr-mini-screen__actions">
                <Button variant="secondary" size="lg" to="/learn">
                  {text('miniBackToPath')}
                </Button>
                {nextLesson ? (
                  <Button size="lg" to={`/lesson/${nextLesson.lesson.id}`} iconRight="arrow-right">
                    {text('miniNextLesson')}
                  </Button>
                ) : (
                  <Button size="lg" onClick={restart} iconLeft="retry">
                    {text('miniRetry')}
                  </Button>
                )}
              </div>
            </>
          )}

          {phase === 'failed' && (
            <>
              <Mascot pose="comfort" size={160} />
              <h1 className="xr-mini-screen__title">{text('miniFailedTitle')}</h1>
              <p className="xr-mini-screen__text">{text('miniFailedText')}</p>
              <div className="xr-mini-screen__actions">
                <Button variant="secondary" size="lg" onClick={restart} iconLeft="retry">
                  {text('miniRetry')}
                </Button>
                <Button size="lg" to={`/lesson/${lesson.id}`} iconRight="arrow-right">
                  {text('miniReviewLesson')}
                </Button>
              </div>
            </>
          )}
        </div>
      </FocusLayout>
    )
  }

  /* ======================= đang làm ======================= */
  const passage = passageOf(lesson, exercise)
  return (
    <FocusLayout
      onExit={onExit}
      exitLabel={text('miniExit')}
      exitOnEscape={!exitOpen}
      width={passage ? 'wide' : 'normal'}
      progress={<ProgressBar value={index + (outcome ? 1 : 0)} max={exercises.length} label={text('miniProgress')} valueText={`${index + 1}/${exercises.length}`} />}
      trailing={heartsBadge}
      footer={
        outcome ? (
          <FeedbackSheet lessonId={lesson.id} exercise={exercise} outcome={outcome} willRetry={false} context={passage?.text} onContinue={next} />
        ) : (
          <BottomBar
            right={!isSelfSubmitting(exercise) && <CheckButton disabled={answer === null} onClick={() => check()} />}
          />
        )
      }
    >
      <div className={['lp-content', outcome && 'has-sheet'].filter(Boolean).join(' ')}>
        <div className={['lp-stage', passage && 'lp-stage--split'].filter(Boolean).join(' ')} key={exercise.id}>
          {passage && (
            <aside className="lp-passage">
              <h3 className="lp-passage__title">{passage.title}</h3>
              <div className="lp-passage__text ds-reading">{passage.text}</div>
            </aside>
          )}
          <div className="lp-stage__main">
            <ExerciseView
              exercise={exercise}
              outcome={outcome}
              hintLevel={0}
              attempt={0}
              onAnswerChange={setAnswer}
              onSubmit={(value) => check(value)}
              showTypingTip={false}
              onDismissTypingTip={() => {}}
              levelId={levelId}
              targetBand={targetBand}
            />
          </div>
        </div>
      </div>

      <Modal
        open={exitOpen}
        onClose={() => setExitOpen(false)}
        size="sm"
        title={text('miniExitTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={leave} iconLeft="exit">
              {text('miniExit')}
            </Button>
            <Button onClick={() => setExitOpen(false)}>{text('stay')}</Button>
          </>
        }
      >
        <p className="xr-dialog-text">{text('miniExitText')}</p>
      </Modal>
    </FocusLayout>
  )
}
