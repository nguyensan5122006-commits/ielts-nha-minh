/**
 * GameRecordsPanel.tsx — CỘT "KỶ LỤC" BÊN PHẢI MỖI TRANG TRÒ CHƠI CHỮ (dùng chung cho cả 5 trò)
 * ----------------------------------------------------------------------------
 *   <GameRecordsPanel game="picture-word" board={board} />
 *
 * Gồm 3 phần:
 *   1. "Của bạn": 2 ô số — kỷ lục mọi lúc · điểm cao nhất tuần này
 *   2. "Cả nhà tuần này": danh sách xếp hạng tuần (dòng của mình tô nổi)
 *   3. Dòng cuối: kỷ lục mọi lúc của cả nhà (ai giữ, bao nhiêu điểm)
 * Trò "daily-word" (Thử thách từ hôm nay): điểm = số NGÀY đoán ra.
 * Dữ liệu: useGameBoard() (trang chơi tự tải lại sau mỗi ván).
 * ----------------------------------------------------------------------------
 */
import { Skeleton } from '../../../design-system'
import { useFamily } from '../../../family-members/family-store'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import { GameArt } from '../../playground/components/GameArt'
import { RankRow } from '../../playground/components/RankRow'
import { wordGameInfo, type WordGameId } from '../../playground/game-catalog'
import { boardFor, type BoardState } from '../use-game-board'
import { useWordGamesText } from '../word-games-text'

export function GameRecordsPanel({ game, board }: { game: WordGameId; board: BoardState }) {
  const text = useWordGamesText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const info = wordGameInfo(game)
  const unit = info ? pick(info.unit) : ''
  const data = boardFor(board, game)
  const weeklyOff = typeof board === 'object' && !board.weeklyAvailable && game !== 'daily-word'

  return (
    <aside className="pg-panel pg-panel--tight wk-records" aria-labelledby={`records-${game}`}>
      <h2 id={`records-${game}`} className="pg-panel__title">
        <GameArt slug="trophy" size={28} /> {text('panelTitle')}
      </h2>

      {board === 'loading' ? (
        <Skeleton lines={4} />
      ) : board === 'error' ? (
        <p className="wk-records__empty">{text('boardError')}</p>
      ) : (
        <>
          <div className="wk-records__mine" aria-label={text('panelMine')}>
            <div className="wk-stat">
              <span className="wk-stat__label">{text('panelMineAll')}</span>
              <strong className="wk-stat__value ds-num">{data?.myBest ?? '—'}</strong>
              <span className="wk-stat__unit">{unit}</span>
            </div>
            <div className="wk-stat wk-stat--week">
              <span className="wk-stat__label">{text('panelMineWeek')}</span>
              <strong className="wk-stat__value ds-num">{data?.myWeekBest ?? '—'}</strong>
              <span className="wk-stat__unit">{unit}</span>
            </div>
          </div>

          <h3 className="wk-records__sub">{text('panelWeek')}</h3>
          {weeklyOff ? (
            <p className="wk-records__empty">{text('boardWeeklyOff')}</p>
          ) : !data || data.weekly.length === 0 ? (
            <p className="wk-records__empty">{text('panelNobody')}</p>
          ) : (
            <ol className="pg-rank-list pg-rank-list--compact">
              {data.weekly.slice(0, 6).map((row, index) => (
                <RankRow
                  key={row.userId}
                  // đồng điểm = đồng hạng
                  rank={1 + data.weekly.filter((other) => other.score > row.score).length}
                  name={row.displayName}
                  avatar={{ avatarItemId: memberById(row.userId)?.avatar }}
                  meta={game === 'daily-word' ? text('panelDays', { n: row.rounds }) : text('panelRounds', { n: row.rounds })}
                  value={row.score}
                  unit={index === 0 ? unit : undefined}
                  isMe={row.userId === user?.id}
                />
              ))}
            </ol>
          )}

          {data?.familyBest && (
            <p className="wk-records__family">
              <GameArt slug="crown" size={22} />
              <span>{text('panelFamilyBest', { n: `${data.familyBest.score} ${unit}`, name: data.familyBest.displayName })}</span>
            </p>
          )}
        </>
      )}
    </aside>
  )
}
