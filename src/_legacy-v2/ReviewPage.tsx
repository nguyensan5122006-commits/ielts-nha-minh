/**
 * ReviewPage.tsx — ÔN TẬP THÔNG MINH (SRS)
 * ----------------------------------------------------------------------------
 * Lấy các thẻ đến hạn ôn hôm nay (tối đa 20 thẻ / lượt):
 *   - thẻ "word:..."     -> tạo câu hỏi trắc nghiệm "từ này nghĩa là gì?" (đáp án nhiễu
 *                           lấy ngẫu nhiên từ các từ khác)
 *   - thẻ "exercise:..." -> làm lại đúng bài tập đã sai
 * Đúng -> thẻ lên hộp cao hơn (lâu sau mới gặp lại); sai -> về hộp 0.
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Exercise, MultipleChoiceExercise } from '../content/content-types'
import { allWords, findExercise, findWord } from '../content/content-lookup'
import { ExercisePlayer } from '../exercise-types/ExercisePlayer'
import { AI_GRADED_TYPES, shuffle } from '../exercise-types/exercise-shared'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { HIGHEST_BOX, isDue } from '../learning-progress/spaced-repetition'
import { useLanguage } from '../translations/language-context'

const MAX_CARDS_PER_SESSION = 20
const WORD_EXERCISE_PREFIX = 'review-word:'

/** Biến 1 từ vựng thành câu trắc nghiệm chọn nghĩa. */
function buildWordQuestion(wordId: string, questionText: string): MultipleChoiceExercise | null {
  const entry = findWord(wordId)
  if (!entry) return null
  const { word } = entry
  const distractors = shuffle(allWords().filter((w) => w.id !== word.id && w.meaningVi !== word.meaningVi))
    .slice(0, 3)
    .map((w) => w.meaningVi)
  const options = shuffle([word.meaningVi, ...distractors])
  return {
    id: WORD_EXERCISE_PREFIX + word.id,
    type: 'multiple-choice',
    question: `${questionText}  "${word.word}"  ${word.ipa}`,
    options,
    correctIndex: options.indexOf(word.meaningVi),
    explanation: { vi: `${word.word} = ${word.meaningVi}. VD: ${word.examples[0]?.en ?? ''}`, en: `${word.word}: ${word.definitionEn}. e.g. ${word.examples[0]?.en ?? ''}` },
  }
}

export function ReviewPage() {
  const { t } = useLanguage()
  const { progress, answerReviewCard, addXp } = useProgress()
  const { earnBananas } = useWallet()
  const [phase, setPhase] = useState<'overview' | 'session' | 'done'>('overview')
  const [correctCount, setCorrectCount] = useState(0)

  const allCards = Object.entries(progress.reviewCards)
  const dueKeys = allCards.filter(([, card]) => isDue(card)).map(([key]) => key)
  const masteredCount = allCards.filter(([, card]) => card.box >= HIGHEST_BOX - 1).length

  // tạo danh sách câu hỏi cho lượt ôn (chỉ tạo lại khi bấm bắt đầu)
  const [sessionSeed, setSessionSeed] = useState(0)
  const sessionExercises = useMemo(() => {
    const exercises: { key: string; exercise: Exercise }[] = []
    for (const key of shuffle(dueKeys)) {
      if (exercises.length >= MAX_CARDS_PER_SESSION) break
      const [kind, id] = [key.slice(0, key.indexOf(':')), key.slice(key.indexOf(':') + 1)]
      if (kind === 'word') {
        const question = buildWordQuestion(id, t('whatDoesItMean'))
        if (question) exercises.push({ key, exercise: question })
      } else {
        const found = findExercise(id)
        // bỏ qua bài AI chấm (tốn lượt AI) khi ôn tập
        if (found && !AI_GRADED_TYPES.includes(found.exercise.type)) exercises.push({ key, exercise: found.exercise })
      }
    }
    return exercises
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionSeed])

  if (phase === 'session' && sessionExercises.length > 0) {
    const keyByExerciseId = new Map(sessionExercises.map((item) => [item.exercise.id, item.key]))
    return (
      <ExercisePlayer
        exercises={sessionExercises.map((item) => item.exercise)}
        mode="review"
        onExerciseChecked={(exercise, result) => {
          answerReviewCard(keyByExerciseId.get(exercise.id)!, result.isCorrect)
          if (result.isCorrect) setCorrectCount((n) => n + 1)
        }}
        onFinish={(summary) => {
          addXp(Math.max(1, summary.firstTryCorrect))
          void earnBananas('review')
          setPhase('done')
        }}
        onQuit={() => setPhase('overview')}
      />
    )
  }

  return (
    <main className="page page--narrow">
      <div className="page-header">
        <h1>🔁 {t('reviewTitle')}</h1>
        <p>{t('reviewIntro')}</p>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="card stat">
          <span className="stat__value">{dueKeys.length}</span>
          <span className="stat__label">{t('dueToday')}</span>
        </div>
        <div className="card stat">
          <span className="stat__value">{allCards.length}</span>
          <span className="stat__label">{t('totalCards')}</span>
        </div>
        <div className="card stat">
          <span className="stat__value">{masteredCount}</span>
          <span className="stat__label">{t('mastered')}</span>
        </div>
      </div>

      {phase === 'done' && (
        <div className="card celebration" style={{ marginBottom: 20, padding: 28 }}>
          <div className="celebration__emoji">✅</div>
          <h2>{t('reviewDone')}</h2>
          <p className="muted">
            {correctCount}/{sessionExercises.length} · {t('xpEarned', { xp: Math.max(1, correctCount) })}
          </p>
        </div>
      )}

      {dueKeys.length === 0 ? (
        <div className="card empty-state">
          <p>{t('nothingDue')}</p>
          <Link to="/" className="button button--secondary">
            {t('navHome')}
          </Link>
        </div>
      ) : (
        <button
          type="button"
          className="button button--primary button--large button--wide"
          onClick={() => {
            setCorrectCount(0)
            setSessionSeed((s) => s + 1)
            setPhase('session')
          }}
        >
          {t('startReview', { n: Math.min(dueKeys.length, MAX_CARDS_PER_SESSION) })}
        </button>
      )}
    </main>
  )
}
