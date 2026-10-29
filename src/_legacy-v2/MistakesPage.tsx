/**
 * MistakesPage.tsx — SỔ LỖI SAI CÁ NHÂN
 * Liệt kê mọi câu đã làm sai (bài học, mini-test, bài thi). Lọc: chưa hiểu / đã hiểu / tất cả.
 * Mỗi lỗi: câu hỏi, bạn trả lời gì, đáp án đúng, giải thích, nút hỏi AI, nút "Đã hiểu".
 */
import { useState } from 'react'
import { ExplainWithAiButton } from '../components/ExplainWithAiButton'
import { useProgress } from '../learning-progress/progress-store'
import { useLanguage } from '../translations/language-context'

type Filter = 'open' | 'resolved' | 'all'

export function MistakesPage() {
  const { t, language } = useLanguage()
  const { progress, setMistakeResolved } = useProgress()
  const [filter, setFilter] = useState<Filter>('open')

  const visible = progress.mistakes.filter((m) => (filter === 'all' ? true : filter === 'open' ? !m.resolved : m.resolved))

  return (
    <main className="page page--narrow">
      <div className="page-header">
        <h1>📕 {t('mistakesTitle')}</h1>
        <p>{t('mistakesIntro')}</p>
      </div>

      <div className="tab-switch" style={{ marginBottom: 20 }}>
        {(['open', 'resolved', 'all'] as Filter[]).map((value) => (
          <button key={value} type="button" className={filter === value ? 'is-active' : ''} onClick={() => setFilter(value)}>
            {value === 'open' ? t('filterOpen') : value === 'resolved' ? t('filterResolved') : t('filterAll')} (
            {value === 'all' ? progress.mistakes.length : progress.mistakes.filter((m) => (value === 'open' ? !m.resolved : m.resolved)).length})
          </button>
        ))}
      </div>

      {visible.length === 0 && <div className="card empty-state">{t('noMistakes')}</div>}

      <div className="stack">
        {visible.map((mistake) => (
          <article key={mistake.id} className="card" style={{ opacity: mistake.resolved ? 0.7 : 1 }}>
            <div className="row row--between small" style={{ marginBottom: 8 }}>
              <span className="row" style={{ gap: 6 }}>
                <span className="badge">{t(`source_${mistake.source}`)}</span>
                {mistake.timesWrong > 1 && <span className="badge badge--error">{t('timesWrong', { n: mistake.timesWrong })}</span>}
              </span>
              <span className="muted">{new Date(mistake.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-GB')}</span>
            </div>
            <p style={{ fontWeight: 600, whiteSpace: 'pre-line' }}>{mistake.question}</p>
            <p className="small" style={{ marginBottom: 4 }}>
              <span className="muted">{t('yourAnswer')}</span>{' '}
              <span style={{ color: 'var(--color-error)' }}>{mistake.userAnswer || t('noAnswer')}</span>
            </p>
            <p className="small">
              <span className="muted">{t('correctAnswerIs')}</span> <strong style={{ color: 'var(--color-success)' }}>{mistake.correctAnswer}</strong>
            </p>
            {mistake.explanation && <p className="small muted">💡 {mistake.explanation}</p>}
            <div className="row row--between">
              <ExplainWithAiButton question={mistake.question} userAnswer={mistake.userAnswer} correctAnswer={mistake.correctAnswer} context={mistake.context} />
              <button
                type="button"
                className={`button button--small ${mistake.resolved ? 'button--secondary' : 'button--success'}`}
                onClick={() => setMistakeResolved(mistake.id, !mistake.resolved)}
              >
                {mistake.resolved ? t('markOpen') : t('markUnderstood')}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
