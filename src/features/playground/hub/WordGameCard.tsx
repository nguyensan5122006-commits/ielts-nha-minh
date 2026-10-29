/**
 * WordGameCard.tsx — 1 THẺ TRÒ CHƠI TRÊN TRANG /play (dùng cho 4 trò tính điểm)
 * ----------------------------------------------------------------------------
 *   <WordGameCard game={wordGameInfo('picture-word')} board={boardFor(board, 'picture-word')} isNew />
 *
 * Mỗi thẻ: ảnh 3D trên "đĩa" màu riêng · tên · 1 dòng cách chơi · chip "luyện gì"
 * · 2 con số: kỷ lục của bạn / ai dẫn đầu tuần này · nút "Chơi".
 * Cả thẻ là 1 link (bấm đâu cũng vào trò).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../../design-system'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import type { GameBoard } from '../../word-games/use-game-board'
import { useWordGamesText } from '../../word-games/word-games-text'
import { GameArt } from '../components/GameArt'
import type { WordGameInfo } from '../game-catalog'

export function WordGameCard({ game, board, isNew = false, tilt = 0 }: { game: WordGameInfo; board: GameBoard | null; isNew?: boolean; tilt?: number }) {
  const text = useWordGamesText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const leader = board?.weekly[0]
  const unit = pick(game.unit)

  return (
    <Link to={game.path} className="wgh-card" style={{ '--game-accent': game.accent } as CSSProperties}>
      <span className="wgh-card__top">
        <GameArt slug={game.art} size={60} plate={game.plate} tilt={tilt} className="wgh-card__art" />
      </span>
      <span className="wgh-card__name">
        {pick(game.title)}
        {isNew && <span className="wgh-card__new">{text('cardNew')}</span>}
      </span>
      <span className="wgh-card__desc">{pick(game.description)}</span>
      <span className="wgh-card__trains">{pick(game.trains)}</span>

      <span className="wgh-card__stats">
        <span className="wgh-card__stat">
          <span className="wgh-card__label">{text('cardBest')}</span>
          {board?.myBest != null ? (
            <strong className="ds-num">
              {board.myBest} <small>{unit}</small>
            </strong>
          ) : (
            <span className="wgh-card__muted">{text('cardNoBest')}</span>
          )}
        </span>
        <span className="wgh-card__stat">
          <span className="wgh-card__label">{text('cardWeekLeader')}</span>
          {leader ? (
            <span className="wgh-card__leader">
              <GameArt slug="crown" size={18} />
              <span className="wgh-card__leader-name">{leader.userId === user?.id ? text('panelMine') : leader.displayName}</span>
              <strong className="ds-num">{leader.score}</strong>
            </span>
          ) : (
            <span className="wgh-card__muted">{text('cardNobodyWeek')}</span>
          )}
        </span>
      </span>

      <span className="wgh-card__cta">
        {text('cardPlay')} <Icon name="arrow-right" size={16} />
      </span>
    </Link>
  )
}
