/**
 * LevelTestGate.tsx — "CỔNG" CUỐI LEVEL: bài kiểm tra level + lời mời sang level sau
 * ----------------------------------------------------------------------------
 *  - Chưa đủ 80% số bài: cổng xám, ghi "còn N bài" (vẫn thấy trước để có mục tiêu).
 *  - Đủ 80%: cổng sáng, nút "Làm bài kiểm tra" -> phòng thi /exam/<id>.
 *  - Đã qua: cổng vàng + điểm %, nút "Làm lại" (phụ).
 *  - Dưới cùng: thẻ "Tiếp theo: Level 2 · Nền tảng" -> xem trước level sau.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../../design-system/components/Button'
import { LevelBadge } from '../../../design-system/components/LevelBadge'
import { WordImage } from '../../../design-system/components/WordImage'
import { useLanguage } from '../../../translations/language-context'
import type { LevelId } from '../../../content/content-types'
import { useLearningPathText } from '../learning-path-text'
import type { PathLevelView } from '../path-view-model'

export function LevelTestGate({ view, onViewLevel }: { view: PathLevelView; onViewLevel: (levelId: LevelId) => void }) {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  const { levelTest, levelNumber, nextLevel } = view
  const passed = levelTest.passedPercent !== null
  const state = passed ? 'passed' : levelTest.unlocked ? 'ready' : 'locked'

  return (
    <div className="lp-gate-wrap">
      {levelTest.examId && (
        <section className={`lp-gate is-${state}`} aria-label={text.levelTestTitle(levelNumber)}>
          <div className="lp-gate__trophy" aria-hidden>
            <WordImage slug="trophy" word="trophy" size={64} decorative />
          </div>
          <div className="lp-gate__text">
            <h2 className="lp-gate__title">{text.levelTestTitle(levelNumber)}</h2>
            <p className="lp-gate__hint">
              {passed
                ? text.levelTestPassedHint(levelTest.passedPercent ?? 0)
                : levelTest.unlocked
                  ? text.levelTestReadyHint
                  : text.levelTestLockedHint(levelTest.lessonsToUnlock)}
            </p>
          </div>
          {state !== 'locked' && (
            <Button to={`/exam/${levelTest.examId}`} variant={passed ? 'secondary' : 'primary'} size="md" iconRight="arrow-right">
              {passed ? text.levelTestRetake : text.levelTestStart}
            </Button>
          )}
        </section>
      )}

      {nextLevel && (
        <button type="button" className="lp-next-level" onClick={() => onViewLevel(nextLevel.id)}>
          <LevelBadge level={nextLevel.order as 1 | 2 | 3} size={44} state={view.levelTest.passedPercent !== null ? 'default' : 'locked'} />
          <span className="lp-next-level__text">
            <span className="lp-next-level__title">{text.nextLevelTeaser(nextLevel.order, pick(nextLevel.title))}</span>
            <span className="lp-next-level__band">
              {nextLevel.bandRange} · {nextLevel.cefr}
            </span>
          </span>
          <span className="lp-next-level__cta">{text.viewNextLevel} →</span>
        </button>
      )}
    </div>
  )
}
