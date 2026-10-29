/**
 * LevelSelector.tsx — CHỌN LEVEL DẠNG 3 HUY HIỆU (Level 1 · 2 · 3)
 * ----------------------------------------------------------------------------
 * Mỗi ô: huy hiệu 3D level + tên + band + CEFR + tiến độ "12/50 bài".
 * Chỉ đổi level ĐANG XEM (không đổi level đang học). Level chưa mở vẫn bấm xem trước.
 * Bàn phím: mũi tên trái/phải chuyển level (giống nhóm tab).
 * ----------------------------------------------------------------------------
 */
import type { KeyboardEvent } from 'react'
import { ALL_LEVELS_V3, LEVEL_ORDER } from '../../../content/all-levels'
import type { LevelId, TrackId } from '../../../content/content-types'
import { isLevelUnlocked, levelProgress } from '../../../content/path-selectors'
import { LevelBadge } from '../../../design-system/components/LevelBadge'
import type { LearningProgress } from '../../../learning-progress/progress-types'
import { useLanguage } from '../../../translations/language-context'
import { useLearningPathText } from '../learning-path-text'

export interface LevelSelectorProps {
  track: TrackId
  value: LevelId
  /** level người học đang học (theo track) — sáng "đang học" */
  currentLevel: LevelId
  progress: LearningProgress
  onChange: (levelId: LevelId) => void
}

export function LevelSelector({ track, value, currentLevel, progress, onChange }: LevelSelectorProps) {
  const text = useLearningPathText()
  const { pick } = useLanguage()

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const index = LEVEL_ORDER.indexOf(value)
    const nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + LEVEL_ORDER.length) % LEVEL_ORDER.length
    onChange(LEVEL_ORDER[nextIndex])
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    buttons[nextIndex]?.focus()
  }

  return (
    <div className="lp-levels" role="tablist" aria-label={text.levelLabel} onKeyDown={onKeyDown}>
      {ALL_LEVELS_V3.map((level) => {
        const order = level.order as 1 | 2 | 3
        const unlocked = isLevelUnlocked(track, level.id, progress)
        const stats = levelProgress(track, level.id, progress)
        const passed = !!progress.levelTests[level.id] || stats.isComplete
        const selected = level.id === value
        const badgeState = !unlocked ? 'locked' : passed ? 'done' : level.id === currentLevel ? 'current' : 'default'
        return (
          <button
            key={level.id}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={`lp-level${selected ? ' is-selected' : ''}${unlocked ? '' : ' is-locked'}`}
            onClick={() => onChange(level.id)}
          >
            <LevelBadge level={order} size={52} state={badgeState} />
            <span className="lp-level__text">
              <span className="lp-level__eyebrow">
                {text.levelN(order)}
                {passed && unlocked && <span className="lp-level__done">✓ {text.levelDoneBadge}</span>}
              </span>
              <span className="lp-level__name">{pick(level.title)}</span>
              <span className="lp-level__band">
                <span>{level.bandRange}</span>
                <span className="lp-level__cefr">{level.cefr}</span>
              </span>
              <span className="lp-level__progress">
                {unlocked ? (
                  <>
                    <span className="lp-level__bar" aria-hidden>
                      <span style={{ width: `${stats.percent}%` }} />
                    </span>
                    {text.levelProgress(stats.done, stats.total)}
                  </>
                ) : (
                  text.levelLocked
                )}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
