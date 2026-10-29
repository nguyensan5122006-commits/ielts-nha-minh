/**
 * LevelStaircase.tsx — BẬC THANG 3 LEVEL "BẠN Ở ĐÂY → MỤC TIÊU 6.5"
 * ----------------------------------------------------------------------------
 *   <LevelStaircase currentLevel={null} … />                       // landing: "Bạn ở đây?" (chưa biết)
 *   <LevelStaircase currentLevel="level-2" band={{ low: 2.5, high: 3.5 }} … />   // màn kết quả
 *
 * Ý tưởng từ Mochi IELTS (bậc thang "You are here → Your goal") + DataCamp (thước band),
 * làm lại theo phong cách "vinyl" của mình (ui-vn-b ý 5, ui-edtech-a ý 6):
 *   - 3 khối cao dần = 3 level (Khởi động 0–2.0 · Nền tảng 2.0–4.0 · Bứt phá 6.5 4.0–6.5)
 *   - cún đứng trên bậc của người học, cờ "Mục tiêu 6.5" trên bậc cao nhất
 *   - dưới chân là "thước band" 0 → 6.5: tô KHOẢNG band của người học (không bao giờ 1 số lẻ),
 *     nét đứt từ đó tới mục tiêu
 * Thước chia 3 đoạn bằng nhau đúng bằng 3 cột, nên band 3.0 nằm giữa cột Level 2 (dễ đọc).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import type { LevelId } from '../../../content/content-types'
import { ALL_LEVELS_V3 } from '../../../content/all-levels'
import { LevelBadge, Mascot, type MascotPose, WordImage } from '../../../design-system'
import { useLanguage } from '../../../translations/language-context'
import { GOAL_BAND } from '../study-plan'
import './route-map.css'

export interface LevelStaircaseProps {
  /** level của người học; null = chưa biết (hiện "Bạn ở đây?" cạnh bậc đầu) */
  currentLevel: LevelId | null
  /** khoảng band để tô trên thước (bỏ trống = chỉ hiện vạch chia) */
  band?: { low: number; high: number }
  youAreHereLabel: string
  goalLabel: string
  /** dòng nhỏ dưới tên level hiện tại (VD "75 bài · 13 chặng") */
  currentNote?: string
  /** pose của cún "Bạn ở đây" (mặc định salute) */
  pose?: MascotPose
  /** ẩn số band trên khối + thước (bé không dùng band — psych-adult D1 cột Y) */
  hideBands?: boolean
  className?: string
}

/** Vị trí (0..1) của 1 band trên thước 3 đoạn bằng nhau: [0–2] [2–4] [4–6.5]. */
export function bandToRulerPosition(band: number): number {
  const b = Math.max(0, Math.min(GOAL_BAND, band))
  if (b <= 2) return (b / 2) / 3
  if (b <= 4) return 1 / 3 + ((b - 2) / 2) / 3
  return 2 / 3 + ((b - 4) / (GOAL_BAND - 4)) / 3
}

const LEVEL_TONE: Record<LevelId, string> = { 'level-1': 'olive', 'level-2': 'navy', 'level-3': 'gold' }

export function LevelStaircase({ currentLevel, band, youAreHereLabel, goalLabel, currentNote, pose = 'salute', hideBands = false, className }: LevelStaircaseProps) {
  const { pick } = useLanguage()
  const currentIndex = currentLevel ? ALL_LEVELS_V3.findIndex((level) => level.id === currentLevel) : -1
  const rulerStyle = band
    ? ({ '--range-start': bandToRulerPosition(band.low), '--range-end': bandToRulerPosition(band.high) } as CSSProperties)
    : undefined

  return (
    <div className={['rm-stairs', currentIndex < 0 && 'is-unknown', className].filter(Boolean).join(' ')}>
      <ol className="rm-stairs__steps">
        {ALL_LEVELS_V3.map((level, index) => {
          const state = currentIndex < 0 ? 'ahead' : index < currentIndex ? 'passed' : index === currentIndex ? 'current' : 'ahead'
          const isGoalStep = index === ALL_LEVELS_V3.length - 1
          return (
            <li
              key={level.id}
              className={`rm-step rm-step--${LEVEL_TONE[level.id]} is-${state}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {/* phía trên khối: cún "Bạn ở đây" và/hoặc cờ mục tiêu */}
              <div className="rm-step__marker">
                {state === 'current' && (
                  <div className="rm-here">
                    <span className="rm-pill rm-pill--here">{youAreHereLabel}</span>
                    <Mascot pose={pose} size={84} />
                  </div>
                )}
                {currentIndex < 0 && index === 0 && (
                  <div className="rm-here rm-here--unknown">
                    <span className="rm-pill rm-pill--here">{youAreHereLabel}</span>
                    <Mascot pose="thinking" size={84} />
                  </div>
                )}
                {isGoalStep && state !== 'current' && (
                  <div className="rm-goal">
                    <WordImage slug="bullseye" word="goal" size={56} decorative />
                    <span className="rm-pill rm-pill--goal">{goalLabel}</span>
                  </div>
                )}
              </div>

              <div className="rm-step__block">
                <div className="rm-step__head">
                  <LevelBadge level={level.order} size={44} state={state === 'passed' ? 'done' : state === 'current' ? 'current' : 'default'} />
                  <span className="rm-step__level">Level {level.order}</span>
                </div>
                <div className="rm-step__text">
                  <strong className="rm-step__title">{pick(level.title)}</strong>
                  {!hideBands && (
                    <>
                      <span className="rm-step__band">Band {level.bandRange}</span>
                      <span className="rm-step__band">{level.cefr}</span>
                    </>
                  )}
                  {state === 'current' && currentNote && <span className="rm-step__note">{currentNote}</span>}
                </div>
                {/* người học đã ở Level 3: cờ mục tiêu nằm TRONG khối (phía trên đã có cún) */}
                {isGoalStep && state === 'current' && (
                  <span className="rm-pill rm-pill--goal rm-goal--inside">
                    <WordImage slug="bullseye" word="goal" size={22} decorative />
                    {goalLabel}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      {!hideBands && (
        <div className={['rm-ruler', band && 'has-range'].filter(Boolean).join(' ')} style={rulerStyle} aria-hidden>
          <div className="rm-ruler__track">
            {band && <div className="rm-ruler__range" />}
            {band && <div className="rm-ruler__dash" />}
          </div>
          <div className="rm-ruler__ticks">
            {[0, 2, 4, GOAL_BAND].map((tick) => (
              <span key={tick} className="rm-ruler__tick" style={{ left: `${bandToRulerPosition(tick) * 100}%` }}>
                {tick.toFixed(1)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
