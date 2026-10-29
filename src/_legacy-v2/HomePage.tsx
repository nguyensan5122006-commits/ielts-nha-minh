/**
 * HomePage.tsx — TRANG CHỦ (BẢNG ĐIỀU KHIỂN CÁ NHÂN)
 * Cột trái : lời chào, gợi ý xếp lớp (người mới), bài học tiếp theo, ôn tập / lỗi sai
 * Cột phải : streak, mục tiêu XP hôm nay, thống kê, top bảng xếp hạng
 */
import { Link } from 'react-router-dom'
import { ALL_LEVELS } from '../content/all-levels'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { accountLevelFromXp } from '../game-economy/account-level'
import { isDue } from '../learning-progress/spaced-repetition'
import { SKILL_COLORS, SKILL_ICONS, findNextLesson } from '../learning-progress/unlock-rules'
import { useFamily } from '../family-members/family-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'

const DAILY_GOAL_OPTIONS = [10, 30, 50, 80]

export function HomePage() {
  const { t, pick } = useLanguage()
  const { user } = useAuth()
  const { progress, visibleStreak, todayXp, setDailyGoal } = useProgress()
  const { bananas } = useWallet()
  const accountLevel = accountLevelFromXp(progress.xpTotal)
  const { members } = useFamily()
  // top 5 XP tuần này
  const leaders = [...members].sort((a, b) => b.weekXp - a.weekXp).slice(0, 5)

  const next = findNextLesson(progress)
  const dueCards = Object.values(progress.reviewCards).filter(isDue).length
  const openMistakes = progress.mistakes.filter((m) => !m.resolved).length
  const goalPercent = Math.min(100, (todayXp / progress.dailyGoalXp) * 100)
  const placementLevel = progress.placement ? ALL_LEVELS[progress.placement.recommendedLevelOrder - 1] : null

  return (
    <main className="page">
      <div className="page-header">
        <h1>{t('greeting', { name: user?.displayName ?? '' })}</h1>
        <p>{t('appTagline')}</p>
      </div>

      <div className="dashboard-grid">
        {/* ---------------- CỘT TRÁI ---------------- */}
        <div className="stack">
          {!progress.placement && (
            <div className="card card--highlight row row--between">
              <div>
                <h3>🧭 {t('placementPromptTitle')}</h3>
                <p className="muted" style={{ marginBottom: 0 }}>
                  {t('placementPromptText')}
                </p>
              </div>
              <Link to="/exam/placement-test" className="button button--primary">
                {t('start')}
              </Link>
            </div>
          )}

          {/* bài học tiếp theo */}
          <div className="card">
            <div className="small muted" style={{ marginBottom: 6 }}>
              {t('nextLessonIs')}
            </div>
            {next ? (
              <div className="row row--between">
                <div className="row" style={{ flexWrap: 'nowrap', flex: 1, minWidth: 0 }}>
                  <div
                    className="lesson-node__circle"
                    style={{ ['--node-color' as string]: SKILL_COLORS[next.skill], width: 60, height: 60, cursor: 'default' }}
                  >
                    {SKILL_ICONS[next.skill]}
                  </div>
                  <div>
                    <h3 style={{ marginBottom: 2 }}>{pick(next.lesson.title)}</h3>
                    <div className="small muted">
                      Level {next.level.order} · {t(`skill_${next.skill}`)} · {pick(next.lesson.description)}
                    </div>
                  </div>
                </div>
                <Link
                  to={next.needsMiniTestOnly ? `/lesson/${next.lesson.id}/mini-test` : `/lesson/${next.lesson.id}`}
                  className="button button--success button--large"
                >
                  {next.needsMiniTestOnly ? t('startMiniTest') : t('continueLearning')}
                </Link>
              </div>
            ) : (
              <p style={{ marginBottom: 0 }}>{t('allCaughtUp')}</p>
            )}
          </div>

          <div className="grid-2">
            <Link to="/review" className="card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <h3>🔁 {t('navReview')}</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                {dueCards > 0 ? t('reviewDueCount', { n: dueCards }) : t('nothingDue')}
              </p>
            </Link>
            <Link to="/mistakes" className="card" style={{ color: 'inherit', textDecoration: 'none' }}>
              <h3>📕 {t('navMistakes')}</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                {t('openMistakesCount', { n: openMistakes })}
              </p>
            </Link>
          </div>

          {placementLevel && (
            <div className="alert alert--info">
              🧭 {t('placementDone', { level: placementLevel.order, band: progress.placement!.estimatedBand })}
            </div>
          )}

          {/* lối tắt tới phần vui chơi & thi đua */}
          <div className="grid-3">
            <Link to="/fun" className="card game-card">
              <span className="game-card__icon">🌈</span>
              <strong>{t('funTitle')}</strong>
            </Link>
            <Link to="/arena" className="card game-card">
              <span className="game-card__icon">⚔️</span>
              <strong>{t('navArena')}</strong>
            </Link>
            <Link to="/daily-word" className="card game-card">
              <span className="game-card__icon">🔤</span>
              <strong>{t('dailyWordTitle')}</strong>
            </Link>
          </div>

          <Link to="/roadmap" className="card" style={{ color: 'inherit', textDecoration: 'none' }}>
            <h3>🗺️ {t('roadmapTitle')}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              {t('roadmapIntro')}
            </p>
          </Link>
        </div>

        {/* ---------------- CỘT PHẢI ---------------- */}
        <div className="stack">
          <div className="card">
            <div className="row row--between" style={{ marginBottom: 14 }}>
              <div className="stat">
                <span className="stat__value" style={{ color: 'var(--color-streak)' }}>
                  🔥 {visibleStreak}
                </span>
                <span className="stat__label">{t('streakDays', { n: visibleStreak })}</span>
              </div>
              <div className="stat" style={{ textAlign: 'right' }}>
                <span className="stat__value" style={{ color: 'var(--color-primary)' }}>
                  ⚡ {progress.xpTotal}
                </span>
                <span className="stat__label">{t('totalXp')}</span>
              </div>
            </div>
            <div className="row row--between small" style={{ marginBottom: 6 }}>
              <strong>{t('todayGoal')}</strong>
              <span>
                {todayXp}/{progress.dailyGoalXp} XP
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: `${goalPercent}%`, background: 'var(--color-streak)' }} />
            </div>
            {goalPercent >= 100 && <p className="small" style={{ marginTop: 8, marginBottom: 0 }}>{t('goalDone')}</p>}
            <div className="row small" style={{ marginTop: 14 }}>
              <span className="muted">{t('dailyGoalSetting')}:</span>
              {DAILY_GOAL_OPTIONS.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  className={`badge ${progress.dailyGoalXp === goal ? 'badge--primary' : ''}`}
                  style={{ border: 'none', cursor: 'pointer' }}
                  onClick={() => setDailyGoal(goal)}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* level tài khoản + chuối */}
          <Link to={`/profile/${user?.id}`} className="card" style={{ color: 'inherit', textDecoration: 'none' }}>
            <div className="row row--between">
              <div className="stat">
                <span className="stat__value">Lv.{accountLevel.level}</span>
                <span className="stat__label">{pick(accountLevel.title)}</span>
              </div>
              <div className="stat" style={{ textAlign: 'right' }}>
                <span className="stat__value" style={{ color: '#b58100' }}>
                  🍌 {bananas}
                </span>
                <span className="stat__label">{t('bananas')}</span>
              </div>
            </div>
            <div className="progress-bar" style={{ height: 8, marginTop: 10 }}>
              <div className="progress-bar__fill" style={{ width: `${(accountLevel.xpIntoLevel / accountLevel.xpNeeded) * 100}%`, background: 'var(--color-primary)' }} />
            </div>
            <div className="small muted" style={{ marginTop: 4 }}>
              {accountLevel.xpIntoLevel}/{accountLevel.xpNeeded} {t('toNextLevel')} · {Object.keys(progress.miniTests).length} {t('lessonsCompleted')}
            </div>
          </Link>

          <div className="card">
            <div className="row row--between" style={{ marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>🏆 {t('navLeaderboard')}</h3>
              <Link to="/leaderboard" className="small">
                →
              </Link>
            </div>
            {leaders.map((entry, index) => (
              <div key={entry.id} className="row row--between small" style={{ padding: '6px 0' }}>
                <span>
                  {['🥇', '🥈', '🥉'][index] ?? `${index + 1}.`} {entry.displayName} {entry.id === user?.id && <span className="muted">{t('you')}</span>}
                </span>
                <strong>{entry.weekXp} XP</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* chú thích nhỏ: các level hiện có */}
      <p className="small muted" style={{ marginTop: 28 }}>
        {ALL_LEVELS.filter((l) => l.available).map((l) => `Level ${l.order} (${l.bandRange}) — ${pick(l.title)}`).join(' · ')}
      </p>
    </main>
  )
}
