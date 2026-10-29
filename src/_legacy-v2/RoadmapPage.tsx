/**
 * RoadmapPage.tsx — SƠ ĐỒ TƯ DUY LỘ TRÌNH
 * ----------------------------------------------------------------------------
 * Phần trên : 4 bước cho người mới (xếp lớp -> học level -> ôn tập -> thi thử).
 * Phần dưới : "xương sống" dọc gồm 6 level; mỗi level toả ra 5 nhánh kỹ năng
 *             kèm số bài đã qua. Màu sắc cho biết trạng thái:
 *               xanh lá = đã qua | xanh dương = đang học | xám = chưa mở / sắp có
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import { ALL_LEVELS } from '../content/all-levels'
import { useProgress } from '../learning-progress/progress-store'
import { SKILL_COLORS, SKILL_ICONS, SKILL_ORDER, countPassedLessons, isLevelUnlocked } from '../learning-progress/unlock-rules'
import { useLanguage } from '../translations/language-context'

export function RoadmapPage() {
  const { t, pick } = useLanguage()
  const { progress } = useProgress()

  // level "đang học" = level mở cao nhất chưa qua bài test
  const currentLevel = ALL_LEVELS.filter((level) => isLevelUnlocked(level, progress) && !progress.levelTests[level.id]).sort(
    (a, b) => a.order - b.order,
  )[0]

  const startSteps = [
    { label: t('roadmapStep1'), to: '/exam/placement-test', done: !!progress.placement },
    { label: t('roadmapStep2'), to: currentLevel ? `/level/${currentLevel.id}` : '/roadmap', done: false },
    { label: t('roadmapStep3'), to: '/review', done: false },
    { label: t('roadmapStep4'), to: '/exams', done: false },
  ]

  return (
    <main className="page">
      <div className="page-header">
        <h1>🗺️ {t('roadmapTitle')}</h1>
        <p>{t('roadmapIntro')}</p>
      </div>

      {/* 4 bước bắt đầu */}
      <div className="mind-map__start">
        {startSteps.map((step, index) => (
          <Link key={index} to={step.to} className="mind-map__step" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className="mind-map__step-number" style={step.done ? { background: 'var(--color-success)' } : undefined}>
              {step.done ? '✓' : index + 1}
            </span>
            {step.label}
          </Link>
        ))}
      </div>

      {/* sơ đồ 6 level */}
      <div className="mind-map">
        {ALL_LEVELS.map((level) => {
          const unlocked = isLevelUnlocked(level, progress)
          const passed = !!progress.levelTests[level.id]
          const isCurrent = currentLevel?.id === level.id
          const stateClass = passed ? 'is-done' : isCurrent ? 'is-current' : unlocked ? '' : 'is-locked'
          const { passed: lessonsPassed, total } = countPassedLessons(level, progress)

          return (
            <section key={level.id} className={`mind-map__level ${stateClass}`}>
              {/* nút level trên trục dọc */}
              <div className="mind-map__spine">
                <div className="mind-map__node">
                  <div className="mind-map__circle">{passed ? '✓' : level.order}</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>
                      Level {level.order} · {level.bandRange}
                    </div>
                    <div style={{ fontWeight: 600 }}>{pick(level.title)}</div>
                    <div className="row" style={{ gap: 6, marginTop: 6 }}>
                      {isCurrent && <span className="badge badge--primary">📍 {t('youAreHere')}</span>}
                      {passed && <span className="badge badge--success">{t('passed')}</span>}
                      {!level.available && <span className="badge">{t('comingSoon')}</span>}
                      {level.available && !unlocked && <span className="badge">🔒 {t('locked')}</span>}
                    </div>
                    {unlocked && (
                      <Link to={`/level/${level.id}`} className="button button--primary button--small" style={{ marginTop: 10 }}>
                        {t('openLevel')} →
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* 5 nhánh kỹ năng */}
              <div>
                <p className="small muted" style={{ margin: '14px 0 0' }}>
                  {pick(level.goals)}
                  {total > 0 && ` — ${t('lessonsProgress', { done: lessonsPassed, total })}`}
                </p>
                <div className="mind-map__branches">
                  {SKILL_ORDER.map((skill) => {
                    const track = level.skillTracks.find((tr) => tr.skill === skill)
                    const done = track?.lessons.filter((lesson) => progress.miniTests[lesson.id]).length ?? 0
                    const content = (
                      <>
                        <strong>
                          {SKILL_ICONS[skill]} {t(`skill_${skill}`)}
                        </strong>
                        <span className="muted">{track ? t('lessonsProgress', { done, total: track.lessons.length }) : t('comingSoon')}</span>
                      </>
                    )
                    return unlocked && track ? (
                      <Link
                        key={skill}
                        to={`/level/${level.id}?skill=${skill}`}
                        className="mind-map__branch"
                        style={{ ['--branch-color' as string]: SKILL_COLORS[skill], color: 'inherit', textDecoration: 'none' }}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div key={skill} className="mind-map__branch" style={{ ['--branch-color' as string]: SKILL_COLORS[skill] }}>
                        {content}
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}
