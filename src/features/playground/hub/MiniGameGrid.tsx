/**
 * MiniGameGrid.tsx — CÁC Ô TRÒ CHƠI CHỮ CHƠI MỘT MÌNH (danh sách MINI_GAMES trong game-catalog.ts)
 * ----------------------------------------------------------------------------
 * Mỗi ô: ảnh 3D trên "đĩa" màu riêng, tên + 1 dòng mô tả, kỷ lục của cả nhà,
 * cả ô là 1 link vào trò chơi (bước tiếp theo = "Chơi").
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../../design-system'
import { useLanguage } from '../../../translations/language-context'
import { GameArt } from '../components/GameArt'
import { MINI_GAMES } from '../game-catalog'
import { usePlayText } from '../playground-text'
import type { GameRecord } from '../use-playground-data'

/** records bỏ trống = không hiện dòng kỷ lục */
export function MiniGameGrid({ records }: { records?: Record<string, GameRecord[]> }) {
  const playText = usePlayText()
  const { t } = useLanguage()
  return (
    <ul className="pg-games">
      {MINI_GAMES.map((game, index) => {
        const best = records?.[game.id]?.[0]
        return (
          <li key={game.id}>
            <Link to={game.soloPath} className="pg-game" style={{ '--game-accent': game.accent } as CSSProperties}>
              <GameArt slug={game.art} size={64} plate={game.plate} tilt={index % 2 === 0 ? -6 : 6} className="pg-game__art" />
              <span className="pg-game__name">{t(`game_${game.id}`)}</span>
              <span className="pg-game__desc">{t(`gameDesc_${game.id}`)}</span>
              {records && <span className="pg-game__record">{best ? playText('gameRecord', { n: best.bestScore, name: best.displayName }) : playText('gameNoRecord')}</span>}
              <span className="pg-game__cta">
                {playText('play')} <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
