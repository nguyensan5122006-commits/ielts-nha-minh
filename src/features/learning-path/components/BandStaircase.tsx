/**
 * BandStaircase.tsx — "BẬC THANG" TRÌNH ĐỘ MINI: Bạn ở đây → Mục tiêu 6.5
 * ----------------------------------------------------------------------------
 * 3 bậc = 3 level, bậc sau cao hơn bậc trước. Ghim xanh "Bạn ở đây" đứng trên bậc đang học,
 * lệch theo % đã học của level đó; lá cờ đỏ trên đỉnh bậc cuối là mục tiêu.
 *   - Track IELTS: mốc band 0 · 2.0 · 4.0 · 6.5
 *   - Track tổng quát: mốc CEFR Pre-A1 · A1 · A2 · B2 — không nói "band"
 * Không bao giờ hiện 1 con số band lẻ cho người học (psych-adult D6.23) — chỉ vị trí trên thang.
 * Ý tưởng: _research/notes/ui-ielts-b.md ý 9 (band hiện tại vs mục tiêu), ui-vn-a.md ý 2.
 * ----------------------------------------------------------------------------
 */
import type { LevelId, TrackId } from '../../../content/content-types'
import { useLearningPathText } from '../learning-path-text'

const STEP_W = 66
const STEP_GAP = 5
const BASE_Y = 74
const STEP_HEIGHTS = [16, 30, 44]
const WIDTH = STEP_W * 3 + STEP_GAP * 2

const MARKS: Record<TrackId, string[]> = {
  ielts: ['0', '2.0', '4.0', '6.5'],
  general: ['Pre-A1', 'A1', 'A2', 'B2'],
}

export function BandStaircase({ track, currentLevel, percentInLevel }: { track: TrackId; currentLevel: LevelId; percentInLevel: number }) {
  const text = useLearningPathText()
  const currentIndex = currentLevel === 'level-1' ? 0 : currentLevel === 'level-2' ? 1 : 2
  const marks = MARKS[track]
  const stepX = (i: number) => i * (STEP_W + STEP_GAP)
  const markerX = stepX(currentIndex) + 9 + Math.min(1, Math.max(0, percentInLevel)) * (STEP_W - 18)
  const stepTop = (i: number) => BASE_Y - STEP_HEIGHTS[i]
  const flagX = WIDTH - 10

  return (
    <figure className="lp-stairs" aria-label={`${text.staircaseLabel}: ${text.youAreHere} Level ${currentIndex + 1} · ${text.goal} ${marks[3]}`}>
      <svg viewBox={`-2 0 ${WIDTH + 4} 92`} width={WIDTH + 4} height={92} aria-hidden>
        {STEP_HEIGHTS.map((height, i) => (
          <rect
            key={i}
            x={stepX(i)}
            y={stepTop(i)}
            width={STEP_W}
            height={height}
            rx={8}
            className={`lp-stairs__step ${i < currentIndex ? 'is-done' : i === currentIndex ? 'is-current' : 'is-future'}`}
          />
        ))}
        {/* phần đã đi của bậc đang học */}
        <rect x={stepX(currentIndex)} y={stepTop(currentIndex)} width={Math.max(14, markerX - stepX(currentIndex) + 4)} height={STEP_HEIGHTS[currentIndex]} rx={8} className="lp-stairs__fill" />
        {/* mốc dưới chân bậc */}
        {marks.map((mark, i) => (
          <text key={mark} x={i === 0 ? 0 : i === 3 ? WIDTH : stepX(i) - STEP_GAP / 2} y={BASE_Y + 14} textAnchor={i === 0 ? 'start' : i === 3 ? 'end' : 'middle'} className={`lp-stairs__mark${i === 3 ? ' is-goal' : ''}`}>
            {mark}
          </text>
        ))}
        {/* lá cờ mục tiêu trên đỉnh bậc cuối */}
        <g transform={`translate(${flagX} ${stepTop(2) - 24})`} className="lp-stairs__flag">
          <line x1="0" y1="0" x2="0" y2="24" />
          <path d="M0 1 L-15 6 L0 11 Z" />
        </g>
        {/* ghim "Bạn ở đây" */}
        <g transform={`translate(${markerX} ${stepTop(currentIndex) - 2})`} className="lp-stairs__marker">
          <path d="M0 0 C-3 -5 -9 -9 -9 -15 A9 9 0 1 1 9 -15 C9 -9 3 -5 0 0 Z" />
          <circle cx="0" cy="-15" r="3.6" className="lp-stairs__marker-dot" />
        </g>
      </svg>
      <figcaption className="lp-stairs__legend">
        <span className="lp-stairs__here">
          <span className="lp-stairs__pin" aria-hidden /> {text.youAreHere}
        </span>
        <span className="lp-stairs__goal-text">
          <span className="lp-stairs__flag-dot" aria-hidden /> {text.goal} {marks[3]}
        </span>
      </figcaption>
    </figure>
  )
}
