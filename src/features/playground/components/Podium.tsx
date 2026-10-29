/**
 * Podium.tsx — BỤC NHẬN GIẢI TOP 3 (kết thúc trận đấu, giải tuần trước)
 * ----------------------------------------------------------------------------
 *   <Podium
 *     entries={[{ id: 1, name: 'Bố', score: 820, avatarItemId, frameItemId, extra: <BananaPill … /> }, …]}
 *     meId={user.id}
 *   />
 * Xếp kiểu bục thật: hạng 2 bên trái, hạng 1 ở giữa (cao nhất), hạng 3 bên phải.
 * Bục mọc lên lần lượt (3 → 2 → 1) cho có không khí trao giải; giảm chuyển động thì đứng yên.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, ReactNode } from 'react'
import { PlayerAvatar } from '../../../components/PlayerIdentity'
import { usePlayText } from '../playground-text'
import { GameArt } from './GameArt'

export interface PodiumEntry {
  id: number
  name: string
  score: number
  avatarItemId?: string | null
  frameItemId?: string | null
  /** dòng nhỏ dưới điểm (VD số chuối thắng/thua) */
  extra?: ReactNode
}

const MEDALS = ['1st-place-medal', '2nd-place-medal', '3rd-place-medal']
/** thứ tự hiển thị trái -> phải: hạng 2, hạng 1, hạng 3 */
const VISUAL_ORDER = [1, 0, 2]

export function Podium({ entries, meId, unit }: { entries: PodiumEntry[]; meId?: number; unit?: string }) {
  const playText = usePlayText()
  const top = entries.slice(0, 3)
  return (
    <ol className={`pg-podium pg-podium--${top.length}`}>
      {VISUAL_ORDER.filter((index) => top[index]).map((index) => {
        const entry = top[index]
        const rank = index + 1
        return (
          <li
            key={entry.id}
            className={['pg-podium__place', `is-rank-${rank}`, entry.id === meId && 'is-me'].filter(Boolean).join(' ')}
            style={{ '--rise-delay': `${(3 - rank) * 160}ms` } as CSSProperties}
          >
            <div className="pg-podium__player">
              <PlayerAvatar avatarItemId={entry.avatarItemId} frameItemId={entry.frameItemId} size={rank === 1 ? 72 : 56} />
              <strong className="pg-podium__name">
                {entry.name}
                {entry.id === meId && <span className="pg-rank__me">{playText('you')}</span>}
              </strong>
              <span className="pg-podium__score ds-num">
                {entry.score}
                {unit && <small> {unit}</small>}
              </span>
              {entry.extra}
            </div>
            <div className="pg-podium__block">
              <GameArt slug={MEDALS[index]} size={rank === 1 ? 44 : 36} />
              <span className="pg-podium__rank ds-num" aria-label={`#${rank}`}>
                {rank}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
