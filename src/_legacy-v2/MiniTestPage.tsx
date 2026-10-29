/**
 * MiniTestPage.tsx — MINI-TEST CUỐI BÀI (toàn màn hình)
 * ----------------------------------------------------------------------------
 *  'intro'  : giải thích luật 5 tim
 *  'test'   : ExercisePlayer chế độ mini-test (sai mất tim, không làm lại)
 *  'passed' : qua bài — số sao theo tim còn lại (5 tim = 3 sao, 3-4 = 2 sao, 1-2 = 1 sao)
 *  'failed' : hết tim — mời ôn lại bài
 * Chỉ làm được sau khi đã học xong phần luyện tập của bài.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import type { Exercise } from '../content/content-types'
import { findLesson } from '../content/content-lookup'
import { ExercisePlayer, STARTING_HEARTS, type ExerciseSessionSummary } from '../exercise-types/ExercisePlayer'
import type { AnswerCheckResult } from '../exercise-types/exercise-shared'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useLanguage } from '../translations/language-context'

function starsFromHearts(hearts: number): number {
  if (hearts >= STARTING_HEARTS) return 3
  if (hearts >= 3) return 2
  return 1
}

export function MiniTestPage() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const { t, pick } = useLanguage()
  const { progress, addXp, recordMiniTestAttempt, recordMistake } = useProgress()
  const { earnBananas, quantityOf, useItem } = useWallet()

  /** Hết tim: nếu còn "Hồi tim" trong túi đồ thì hỏi có muốn dùng không. */
  async function offerHeartRefill(): Promise<boolean> {
    const owned = quantityOf('study-heart-refill')
    if (owned === 0 || !window.confirm(t('useHeartRefill', { n: owned }))) return false
    return useItem('study-heart-refill')
  }
  const [phase, setPhase] = useState<'intro' | 'test' | 'passed' | 'failed'>('intro')
  const [result, setResult] = useState<{ stars: number; xp: number; hearts: number } | null>(null)
  const [attemptKey, setAttemptKey] = useState(0) // đổi key để làm lại từ đầu

  const location = findLesson(lessonId)
  if (!location) return <Navigate to="/roadmap" replace />
  const { lesson, level } = location
  if (!progress.lessons[lesson.id]) return <Navigate to={`/lesson/${lesson.id}`} replace />
  const levelUrl = `/level/${level.id}?skill=${lesson.skill}`

  function handleChecked(exercise: Exercise, check: AnswerCheckResult) {
    if (check.isCorrect) return
    recordMistake({
      source: 'mini-test',
      itemId: exercise.id,
      parentId: lesson.id,
      question: check.questionText,
      userAnswer: check.userAnswerText,
      correctAnswer: check.correctAnswerText,
      explanation: exercise.explanation?.vi,
    })
  }

  function handleFinish(session: ExerciseSessionSummary) {
    if (session.failed) {
      recordMiniTestAttempt(lesson.id, false, 0)
      setPhase('failed')
      return
    }
    const stars = starsFromHearts(session.heartsLeft)
    const isFirstPass = !progress.miniTests[lesson.id]
    const xp = (isFirstPass ? 15 : 5) + stars * 5
    recordMiniTestAttempt(lesson.id, true, stars)
    addXp(xp)
    void earnBananas(stars === 3 ? 'mini-test-3' : stars === 2 ? 'mini-test-2' : 'mini-test-1')
    setResult({ stars, xp, hearts: session.heartsLeft })
    setPhase('passed')
  }

  if (phase === 'test') {
    return (
      <ExercisePlayer
        key={attemptKey}
        exercises={lesson.miniTest}
        mode="mini-test"
        targetBand={level.bandRange}
        onExerciseChecked={handleChecked}
        onFinish={handleFinish}
        onQuit={() => navigate(levelUrl)}
        onOutOfHearts={offerHeartRefill}
      />
    )
  }

  return (
    <div className="lesson-shell">
      <div className="lesson-body celebration">
        {phase === 'intro' && (
          <>
            <div className="celebration__emoji">❤️</div>
            <h1>
              {t('miniTest')}: {pick(lesson.title)}
            </h1>
            <p className="muted">{t('miniTestIntro')}</p>
            <p className="hearts" style={{ fontSize: '2rem' }}>
              {'❤'.repeat(STARTING_HEARTS)}
            </p>
            <div className="row" style={{ justifyContent: 'center' }}>
              <Link to={levelUrl} className="button button--secondary button--large">
                {t('back')}
              </Link>
              <button type="button" className="button button--primary button--large" onClick={() => setPhase('test')}>
                {t('start')}
              </button>
            </div>
          </>
        )}

        {phase === 'passed' && result && (
          <>
            <div className="celebration__emoji">🏆</div>
            <h1>{t('miniTestPassed')}</h1>
            <p className="stars" style={{ fontSize: '2.4rem' }}>
              {'★'.repeat(result.stars) + '☆'.repeat(3 - result.stars)}
            </p>
            <p>
              <strong style={{ color: 'var(--color-primary)' }}>{t('xpEarned', { xp: result.xp })}</strong> · {t('heartsLeft')}: ❤ {result.hearts}
            </p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 20 }}>
              <Link to={levelUrl} className="button button--success button--large">
                {t('continue')}
              </Link>
            </div>
          </>
        )}

        {phase === 'failed' && (
          <>
            <div className="celebration__emoji">💔</div>
            <h1>{t('outOfHearts')}</h1>
            <p className="muted">{t('outOfHeartsText')}</p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 20 }}>
              <Link to={`/lesson/${lesson.id}`} className="button button--primary button--large">
                📘 {t('reviewLesson')}
              </Link>
              <button
                type="button"
                className="button button--secondary button--large"
                onClick={() => {
                  setAttemptKey((k) => k + 1)
                  setPhase('test')
                }}
              >
                {t('retry')}
              </button>
              <Link to="/mistakes" className="button button--ghost button--large">
                📕 {t('navMistakes')}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
