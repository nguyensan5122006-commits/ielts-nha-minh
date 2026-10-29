/**
 * LevelPage.tsx — TRANG 1 LEVEL
 * ----------------------------------------------------------------------------
 * Trên cùng: tên level, mục tiêu, tiến độ.
 * Thanh tab 5 kỹ năng (Từ vựng / Nghe / Đọc / Nói / Viết).
 * Giữa: "con đường bài học" kiểu Duolingo — các vòng tròn lượn zig-zag.
 *   Mỗi bài có 2 nút: Học bài (luyện tập) và Mini-test (mở sau khi học xong bài).
 * Cuối: bài test cuối level.
 * Tab đang chọn lưu trên URL (?skill=listening) để bấm Quay lại vẫn đúng tab.
 * ----------------------------------------------------------------------------
 */
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { findLevel } from '../content/all-levels'
import type { SkillName } from '../content/content-types'
import { useProgress } from '../learning-progress/progress-store'
import {
  SKILL_COLORS,
  SKILL_ICONS,
  SKILL_ORDER,
  countPassedLessons,
  isLessonUnlocked,
  isLevelTestUnlocked,
  isLevelUnlocked,
} from '../learning-progress/unlock-rules'
import { useLanguage } from '../translations/language-context'

export function LevelPage() {
  const { levelId = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t, pick } = useLanguage()
  const { progress } = useProgress()

  const level = findLevel(levelId)
  if (!level) return <Navigate to="/roadmap" replace />
  if (!isLevelUnlocked(level, progress)) {
    return (
      <main className="page page--narrow">
        <div className="empty-state">
          <h2>🔒 {t('levelLocked')}</h2>
          <Link to="/roadmap" className="button button--secondary">
            {t('back')}
          </Link>
        </div>
      </main>
    )
  }

  const activeSkill = (searchParams.get('skill') as SkillName) || 'vocabulary'
  const track = level.skillTracks.find((tr) => tr.skill === activeSkill) ?? level.skillTracks[0]
  const { passed, total } = countPassedLessons(level, progress)
  const levelTestOpen = isLevelTestUnlocked(level, progress)
  const levelTestResult = progress.levelTests[level.id]
  // bài "hiện tại" = bài mở đầu tiên chưa qua mini-test (được làm nổi bật)
  const currentIndex = track.lessons.findIndex((lesson) => !progress.miniTests[lesson.id])

  return (
    <main className="page">
      {/* ---------- đầu trang ---------- */}
      <div className="card card--highlight" style={{ marginBottom: 24 }}>
        <div className="row row--between">
          <div>
            <Link to="/roadmap" className="small">
              ← {t('navRoadmap')}
            </Link>
            <h1 style={{ margin: '6px 0 4px' }}>
              Level {level.order}: {pick(level.title)} <span className="muted">({level.bandRange})</span>
            </h1>
            <p className="muted" style={{ maxWidth: 680, marginBottom: 0 }}>
              {pick(level.goals)}
            </p>
          </div>
          <div style={{ minWidth: 200 }}>
            <div className="small muted" style={{ marginBottom: 6 }}>
              {t('lessonsProgress', { done: passed, total })}
            </div>
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${total ? (passed / total) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- tab kỹ năng ---------- */}
      <div className="skill-tabs">
        {SKILL_ORDER.filter((skill) => level.skillTracks.some((tr) => tr.skill === skill)).map((skill) => (
          <button
            key={skill}
            type="button"
            className={`skill-tab ${skill === track.skill ? 'is-active' : ''}`}
            style={{ ['--tab-color' as string]: SKILL_COLORS[skill] }}
            onClick={() => setSearchParams({ skill }, { replace: true })}
          >
            {SKILL_ICONS[skill]} {t(`skill_${skill}`)}
          </button>
        ))}
      </div>

      {/* ---------- con đường bài học ---------- */}
      <div className="lesson-path">
        {track.lessons.map((lesson, index) => {
          const unlocked = isLessonUnlocked(track.lessons, index, progress)
          const practiced = !!progress.lessons[lesson.id]
          const miniTest = progress.miniTests[lesson.id]
          return (
            <div key={lesson.id} className="lesson-node">
{/* vòng tròn bài học: bấm để vào học (nếu đã mở khoá) */}
              {unlocked ? (
                <Link
                  to={`/lesson/${lesson.id}`}
                  className={`lesson-node__circle ${index === currentIndex ? 'is-current' : ''}`}
                  style={{ ['--node-color' as string]: SKILL_COLORS[track.skill], textDecoration: 'none' }}
                >
                  {miniTest ? '★' : SKILL_ICONS[track.skill]}
                </Link>
              ) : (
                <span className="lesson-node__circle is-locked">🔒</span>
              )}
              <div className="lesson-node__info">
                <div className="row row--between">
                  <h4>
                    {index + 1}. {pick(lesson.title)}
                  </h4>
                  {miniTest && <span className="stars">{'★'.repeat(miniTest.stars) + '☆'.repeat(3 - miniTest.stars)}</span>}
                </div>
                <div className="small muted" style={{ marginBottom: 8 }}>
                  {unlocked ? pick(lesson.description) : t('lessonLockedHint')}
                </div>
                {unlocked && (
                  <div className="row" style={{ gap: 8 }}>
                    <Link to={`/lesson/${lesson.id}`} className={`button button--small ${practiced ? 'button--secondary' : 'button--primary'}`}>
                      📘 {t('practice')}
                    </Link>
                    <Link
                      to={`/lesson/${lesson.id}/mini-test`}
                      className={`button button--small ${practiced && !miniTest ? 'button--success' : 'button--secondary'}`}
                      aria-disabled={!practiced}
                      onClick={(event) => !practiced && event.preventDefault()}
                      style={!practiced ? { opacity: 0.45, cursor: 'not-allowed' } : undefined}
                    >
                      ❤ {t('miniTest')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------- bài test cuối level ---------- */}
      {level.levelTestId && (
        <div className="card row row--between" style={{ marginTop: 24 }}>
          <div>
            <h3>🏁 {t('levelTest')}</h3>
            <p className="muted small" style={{ marginBottom: 0 }}>
              {t('levelTestHint', { pass: 70 })}
            </p>
            {levelTestResult && <span className="badge badge--success">{t('passed')} · {levelTestResult.percent}%</span>}
          </div>
          {levelTestOpen ? (
            <Link to={`/exam/${level.levelTestId}`} className="button button--primary button--large">
              {t('start')}
            </Link>
          ) : (
            <button type="button" className="button button--secondary" disabled>
              🔒 {t('lessonsProgress', { done: passed, total })}
            </button>
          )}
        </div>
      )}
    </main>
  )
}
