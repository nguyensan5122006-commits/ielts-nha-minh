/**
 * ExamResultPage.tsx — KẾT QUẢ BÀI THI
 * ----------------------------------------------------------------------------
 *  1. Tổng quan: band tổng (thi thử) / % và đạt-chưa đạt (test level) / level gợi ý (xếp lớp)
 *  2. Điểm từng kỹ năng
 *  3. "Những điểm cần lưu ý" — tự rút ra từ lỗi sai + nhận xét AI
 *  4. Nhận xét AI chi tiết cho từng task Writing / part Speaking
 *  5. Xem lại từng câu: bạn chọn gì, đáp án đúng, giải thích, hỏi AI
 * /exam-result/local = kết quả lưu tạm trong máy khi không gửi được lên máy chủ.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findExam } from '../content/all-exams'
import { findLevelInfo } from '../content/all-levels'
import { levelIdFromLegacyOrder } from '../content/legacy-levels'
import { AiFeedbackCard } from '../components/AiFeedbackCard'
import { ExplainWithAiButton } from '../components/ExplainWithAiButton'
import type { ExamResult } from '../exam-engine/exam-scoring'
import { api } from '../services/api-client'
import { useLanguage } from '../translations/language-context'
import { LOCAL_RESULT_KEY } from './ExamRunnerPage'

export function ExamResultPage() {
  const { resultId = '' } = useParams()
  const { t, pick } = useLanguage()
  const [result, setResult] = useState<ExamResult | null>(null)
  const [error, setError] = useState('')
  const [onlyWrong, setOnlyWrong] = useState(true)

  useEffect(() => {
    if (resultId === 'local') {
      try {
        const saved = sessionStorage.getItem(LOCAL_RESULT_KEY)
        if (saved) setResult(JSON.parse(saved))
        else setError('Không tìm thấy kết quả')
      } catch {
        setError('Không tìm thấy kết quả')
      }
      return
    }
    api
      .getExamResult(Number(resultId))
      .then((data) => setResult(data.result as ExamResult))
      .catch((e: Error) => setError(e.message))
  }, [resultId])

  if (error) return <main className="page page--narrow"><div className="alert">{error}</div></main>
  if (!result) return <main className="page page--narrow"><span className="spinner" /></main>

  const exam = findExam(result.examId)
  const reviews = result.questionReviews.filter((r) => (onlyWrong ? !r.isCorrect : true))
  // bài xếp lớp cũ chấm theo 6 level cũ -> đổi sang level v3 để hiển thị (dải band giữ theo kết quả chấm)
  const recommendedLevel = result.placement ? findLevelInfo(levelIdFromLegacyOrder(result.placement.recommendedLevelOrder)) : undefined

  return (
    <main className="page">
      <Link to="/exams" className="small">
        ← {t('navExams')}
      </Link>
      <h1 style={{ marginTop: 8 }}>
        {t('resultTitle')}: {exam ? pick(exam.title) : result.examId}
      </h1>

      {/* ---------- 1. tổng quan ---------- */}
      <div className="card card--highlight row" style={{ marginBottom: 20, gap: 28 }}>
        {result.overallBand !== null && (
          <div className="stat">
            <span className="stat__value" style={{ fontSize: '2.6rem', color: 'var(--color-primary)' }}>
              {result.overallBand.toFixed(1)}
            </span>
            <span className="stat__label">Overall band</span>
          </div>
        )}
        {result.percent !== null && (
          <div className="stat">
            <span className="stat__value" style={{ fontSize: '2.6rem' }}>{result.percent}%</span>
            <span className="stat__label">{t('score')}</span>
          </div>
        )}
        <div style={{ flex: 1 }}>
          {result.levelTest && (
            <p style={{ fontWeight: 700, color: result.levelTest.passed ? 'var(--color-success)' : 'var(--color-error)', marginBottom: 6 }}>
              {result.levelTest.passed ? t('levelTestPassed') : t('levelTestFailed', { pass: result.levelTest.passPercent })}
            </p>
          )}
          {recommendedLevel && (
            <>
              <p style={{ fontWeight: 700, marginBottom: 6 }}>
                🧭 {t('placementResultText', { level: recommendedLevel.order, range: result.placement!.estimatedBand })}
              </p>
              <p className="small muted">
                {Object.entries(result.placement!.correctByLevel)
                  .map(([level, correct]) => `${level}: ${correct}/5`)
                  .join(' · ')}
              </p>
              <Link to="/learn" className="button button--primary">
                {t('goToLevel', { level: recommendedLevel.order })}
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ---------- 2. điểm từng kỹ năng ---------- */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        {result.sections.map((section) => (
          <div key={section.skill + section.title} className="card">
            <div className="small muted">{section.title}</div>
            <div className="stat__value">
              {section.band !== undefined && section.band !== null ? `Band ${section.band.toFixed(1)}` : section.band === null ? t('notGraded') : ''}
            </div>
            {section.total !== undefined && (
              <div className="muted">
                {section.correct}/{section.total} {t('correct').replace('!', '')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---------- 3. lưu ý ---------- */}
      {result.notes.length > 0 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <h2>📌 {t('notesToFix')}</h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {result.notes.map((note, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                {pick(note)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- 4. nhận xét AI ---------- */}
      {result.sections
        .filter((s) => s.aiResults?.length)
        .map((section) => (
          <div key={section.skill} style={{ marginBottom: 20 }}>
            <h2>{section.skill === 'writing' ? '✍️' : '🗣️'} {section.title}</h2>
            {section.aiResults!.map((item) => (
              <div key={item.label} className="card" style={{ marginBottom: 12 }}>
                <h3>{item.label}</h3>
                <details>
                  <summary className="small">{section.skill === 'writing' ? 'Đề bài & bài làm / Prompt & answer' : 'Câu hỏi / Questions'}</summary>
                  <p className="small" style={{ whiteSpace: 'pre-line', marginTop: 8 }}>{item.prompt}</p>
                  {item.userText && <p style={{ whiteSpace: 'pre-line', background: 'var(--color-surface-soft)', padding: 12, borderRadius: 8 }}>{item.userText}</p>}
                </details>
                {item.result ? <AiFeedbackCard result={item.result} title={item.label} /> : <div className="alert" style={{ marginTop: 10 }}>{t('notGraded')}: {item.error}</div>}
              </div>
            ))}
          </div>
        ))}

      {/* ---------- 5. xem lại đáp án ---------- */}
      {result.questionReviews.length > 0 && (
        <div className="card">
          <div className="row row--between">
            <h2 style={{ margin: 0 }}>🔍 {t('answerReview')}</h2>
            <div className="tab-switch">
              <button type="button" className={onlyWrong ? 'is-active' : ''} onClick={() => setOnlyWrong(true)}>
                ✗ {result.questionReviews.filter((r) => !r.isCorrect).length}
              </button>
              <button type="button" className={!onlyWrong ? 'is-active' : ''} onClick={() => setOnlyWrong(false)}>
                {t('filterAll')} {result.questionReviews.length}
              </button>
            </div>
          </div>
          {reviews.map((review) => (
            <div key={review.questionId} className="result-question">
              <span className={`result-mark ${review.isCorrect ? 'is-correct' : 'is-wrong'}`}>{review.isCorrect ? '✓' : '✗'}</span>
              <div>
                <div className="small muted">
                  {review.skill} · {t('question')} {review.number}
                </div>
                <p style={{ marginBottom: 4, whiteSpace: 'pre-line' }}>{review.prompt}</p>
                <p className="small" style={{ marginBottom: 2 }}>
                  <span className="muted">{t('yourAnswer')}</span>{' '}
                  <span style={{ color: review.isCorrect ? 'var(--color-success)' : 'var(--color-error)' }}>{review.userAnswer || t('noAnswer')}</span>
                  {!review.isCorrect && (
                    <>
                      {' · '}
                      <span className="muted">{t('correctAnswerIs')}</span> <strong>{review.correctAnswer}</strong>
                    </>
                  )}
                </p>
                {review.explanation && <p className="small muted" style={{ marginBottom: 4 }}>💡 {pick(review.explanation)}</p>}
                {!review.isCorrect && (
                  <ExplainWithAiButton question={review.prompt} userAnswer={review.userAnswer} correctAnswer={review.correctAnswer} context={review.context} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
