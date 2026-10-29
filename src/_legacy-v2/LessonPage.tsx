/**
 * LessonPage.tsx — HỌC 1 BÀI (toàn màn hình)
 * ----------------------------------------------------------------------------
 * 3 giai đoạn:
 *   'teach'    : đọc thẻ lý thuyết (+ danh sách từ mới nếu là bài từ vựng)
 *   'practice' : làm chuỗi bài tập bằng ExercisePlayer (câu sai làm lại đến khi đúng)
 *   'done'     : màn hình chúc mừng, cộng XP, mời làm mini-test
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import type { Exercise, Lesson } from '../content/content-types'
import { findLesson } from '../content/content-lookup'
import { RichText } from '../components/RichText'
import { SpeakerButton } from '../components/SpeakerButton'
import { ExercisePlayer, type ExerciseSessionSummary } from '../exercise-types/ExercisePlayer'
import type { AnswerCheckResult } from '../exercise-types/exercise-shared'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { isLessonUnlocked, SKILL_ICONS } from '../learning-progress/unlock-rules'
import { useLanguage } from '../translations/language-context'

/** XP thưởng: học lần đầu 10 XP, học lại 5 XP; chính xác >= 90% thưởng thêm 5. */
function calculateLessonXp(isFirstTime: boolean, accuracy: number): number {
  return (isFirstTime ? 10 : 5) + (accuracy >= 90 ? 5 : 0)
}

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const { progress, addXp, completeLesson, recordMistake } = useProgress()
  const { earnBananas } = useWallet()
  const [phase, setPhase] = useState<'teach' | 'practice' | 'done'>('teach')
  const [summary, setSummary] = useState<{ accuracy: number; xp: number } | null>(null)

  const location = findLesson(lessonId)
  if (!location) return <Navigate to="/roadmap" replace />
  const { lesson, level } = location
  const track = level.skillTracks.find((tr) => tr.skill === lesson.skill)!
  if (!isLessonUnlocked(track.lessons, location.indexInTrack, progress)) return <Navigate to={`/level/${level.id}`} replace />

  const backToLevel = () => navigate(`/level/${level.id}?skill=${lesson.skill}`)

  /** Ghi câu sai (lần đầu) vào sổ lỗi sai. */
  function handleChecked(exercise: Exercise, result: AnswerCheckResult, isFirstTry: boolean) {
    if (result.isCorrect || !isFirstTry) return
    recordMistake({
      source: 'lesson',
      itemId: exercise.id,
      parentId: lesson.id,
      question: result.questionText,
      userAnswer: result.userAnswerText,
      correctAnswer: result.correctAnswerText,
      explanation: exercise.explanation?.vi,
    })
  }

  function handleFinish(session: ExerciseSessionSummary) {
    const accuracy = Math.round((session.firstTryCorrect / session.totalExercises) * 100)
    const xp = calculateLessonXp(!progress.lessons[lesson.id], accuracy)
    completeLesson(lesson.id, accuracy, (lesson.words ?? []).map((w) => w.id))
    addXp(xp)
    void earnBananas('lesson')
    setSummary({ accuracy, xp })
    setPhase('done')
  }

  if (phase === 'teach') return <TeachingPhase lesson={lesson} onStart={() => setPhase('practice')} onBack={backToLevel} />

  if (phase === 'practice') {
    return (
      <ExercisePlayer
        exercises={lesson.exercises}
        mode="practice"
        targetBand={level.bandRange}
        onExerciseChecked={handleChecked}
        onFinish={handleFinish}
        onQuit={backToLevel}
      />
    )
  }

  return <LessonCompleteScreen lesson={lesson} levelId={level.id} accuracy={summary!.accuracy} xp={summary!.xp} />
}

/* ======================= GIAI ĐOẠN 1: LÝ THUYẾT ======================= */

function TeachingPhase({ lesson, onStart, onBack }: { lesson: Lesson; onStart: () => void; onBack: () => void }) {
  const { t, pick } = useLanguage()
  // các "trang" lý thuyết: từng thẻ lý thuyết, cuối cùng là trang từ mới (nếu có)
  const pageCount = lesson.teachingCards.length + (lesson.words?.length ? 1 : 0)
  const [page, setPage] = useState(0)
  const isWordsPage = page === lesson.teachingCards.length
  const card = lesson.teachingCards[page]

  return (
    <div className="lesson-shell">
      <div className="lesson-topbar">
        <button type="button" className="button button--ghost" onClick={onBack} aria-label={t('back')}>
          ✕
        </button>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${((page + 1) / (pageCount + 1)) * 100}%`, background: 'var(--color-primary)' }} />
        </div>
      </div>

      <div className={`lesson-body ${isWordsPage ? 'lesson-body--wide' : ''}`}>
        <div className="small muted" style={{ marginBottom: 8 }}>
          {SKILL_ICONS[lesson.skill]} {pick(lesson.title)} · {isWordsPage ? t('newWords') : t('theory')} {page + 1}/{pageCount}
        </div>

        {!isWordsPage && card && (
          <div className="teaching-card">
            <h2>{pick(card.title)}</h2>
            <RichText className="teaching-card__body" text={pick(card.body)} />
            {card.examples && (
              <ul className="example-list">
                {card.examples.map((example, i) => (
                  <li key={i}>
                    <div className="example-en">
                      <SpeakerButton text={example.en} variant="inline" /> {example.en}
                    </div>
                    <div className="example-vi">{example.vi}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {isWordsPage && (
          <div className="flashcard-grid">
            {lesson.words!.map((word) => (
              <div key={word.id} className="word-card">
                <div className="row row--between">
                  <span className="word-card__word">{word.word}</span>
                  <SpeakerButton text={word.word} variant="inline" />
                </div>
                <div className="word-card__ipa">
                  {word.ipa} · <em>{word.partOfSpeech}</em>
                </div>
                <div style={{ fontWeight: 600, margin: '6px 0 2px' }}>{word.meaningVi}</div>
                <div className="small muted">{word.definitionEn}</div>
                <ul className="example-list" style={{ marginTop: 10 }}>
                  {word.examples.map((example, i) => (
                    <li key={i} className="small">
                      <div className="example-en">
                        <SpeakerButton text={example.en} variant="inline" /> {example.en}
                      </div>
                      <div className="example-vi">{example.vi}</div>
                    </li>
                  ))}
                </ul>
                {word.usageNote && <p className="small" style={{ marginTop: 8, marginBottom: 0 }}>💡 {pick(word.usageNote)}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="feedback-footer">
        <div className="feedback-footer__inner">
          <button type="button" className="button button--secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>
            ← {t('previous')}
          </button>
          {page + 1 < pageCount ? (
            <button type="button" className="button button--primary button--large" onClick={() => setPage(page + 1)}>
              {t('next')} →
            </button>
          ) : (
            <button type="button" className="button button--success button--large" onClick={onStart}>
              {t('startPractice')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ======================= GIAI ĐOẠN 3: HOÀN THÀNH ======================= */

function LessonCompleteScreen({ lesson, levelId, accuracy, xp }: { lesson: Lesson; levelId: string; accuracy: number; xp: number }) {
  const { t, pick } = useLanguage()
  return (
    <div className="lesson-shell">
      <div className="lesson-body celebration">
        <div className="celebration__emoji">🎉</div>
        <h1>{t('lessonComplete')}</h1>
        <p className="muted">{pick(lesson.title)}</p>
        <div className="row" style={{ justifyContent: 'center', gap: 16, margin: '28px 0' }}>
          <div className="card stat" style={{ minWidth: 150 }}>
            <span className="stat__value" style={{ color: 'var(--color-primary)' }}>
              {t('xpEarned', { xp })}
            </span>
            <span className="stat__label">XP</span>
          </div>
          <div className="card stat" style={{ minWidth: 150 }}>
            <span className="stat__value" style={{ color: 'var(--color-success)' }}>
              {accuracy}%
            </span>
            <span className="stat__label">{t('accuracy')}</span>
          </div>
        </div>
        <p className="muted">{t('miniTestIntro')}</p>
        <div className="row" style={{ justifyContent: 'center' }}>
          <Link to={`/level/${levelId}?skill=${lesson.skill}`} className="button button--secondary button--large">
            {t('backToLevel')}
          </Link>
          <Link to={`/lesson/${lesson.id}/mini-test`} className="button button--success button--large">
            ❤ {t('startMiniTest')}
          </Link>
        </div>
      </div>
    </div>
  )
}
