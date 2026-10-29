/**
 * FamilyRecordsBoard.tsx — "BẢNG KỶ LỤC GIA ĐÌNH" TRÊN TRANG /play (cả 5 trò trong 1 bảng)
 * ----------------------------------------------------------------------------
 * Bảng ô kiểu "bảng điểm":
 *   - mỗi HÀNG = 1 thành viên (avatar + tên, dòng của mình tô nổi)
 *   - mỗi CỘT  = 1 trò; ô = điểm cao nhất TUẦN NÀY của người đó (Đoán từ: số ngày đoán ra)
 *   - người cao nhất mỗi cột: ô vàng + vương miện
 *   - hàng cuối: kỷ lục MỌI LÚC của cả nhà ở từng trò (bao nhiêu, ai giữ)
 * Chỉ hiện người ĐÃ CHƠI tuần này + chính mình (dòng cuối ghi "N người khác chưa chơi").
 * Thứ tự hàng: ai giữ nhiều vương miện tuần này nhất lên đầu, rồi tới ai chơi nhiều trò hơn.
 * Bảng rộng hơn màn hình thì cuộn ngang TRONG khung (trang không bị tràn).
 * ----------------------------------------------------------------------------
 */
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { PlayerAvatar } from '../../../components/PlayerIdentity'
import { Skeleton } from '../../../design-system'
import { useFamily } from '../../../family-members/family-store'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import type { BoardState } from '../../word-games/use-game-board'
import { useWordGamesText } from '../../word-games/word-games-text'
import { GameArt } from '../components/GameArt'
import { WORD_GAMES } from '../game-catalog'

export function FamilyRecordsBoard({ board }: { board: BoardState }) {
  const text = useWordGamesText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const { members } = useFamily()

  if (board === 'loading') return <Skeleton lines={5} />
  if (board === 'error') return <p className="wgh-board__note">{text('boardError')}</p>

  // điểm tuần của 1 người ở 1 trò (không chơi = null)
  const weekScore = (gameId: string, userId: number) => board.games[gameId as keyof typeof board.games]?.weekly.find((row) => row.userId === userId)?.score ?? null
  // điểm cao nhất tuần của mỗi trò (> 0 mới tính là "dẫn đầu")
  const topScore = Object.fromEntries(WORD_GAMES.map((game) => [game.id, Math.max(0, ...(board.games[game.id]?.weekly.map((row) => row.score) ?? []))]))

  const allRows = members
    .map((member) => {
      const scores = WORD_GAMES.map((game) => weekScore(game.id, member.id))
      const crowns = WORD_GAMES.filter((game, i) => scores[i] !== null && scores[i]! > 0 && scores[i] === topScore[game.id]).length
      const played = scores.filter((score) => score !== null).length
      return { member, scores, crowns, played }
    })
    .sort((a, b) => b.crowns - a.crowns || b.played - a.played || a.member.displayName.localeCompare(b.member.displayName))
  // chỉ hiện người đã chơi tuần này + chính mình (nhà đông người thì bảng không dài lê thê)
  const rows = allRows.filter((row) => row.played > 0 || row.member.id === user?.id)
  const idleCount = allRows.length - rows.length

  if (rows.length === 0) return <p className="wgh-board__note">{text('boardEmpty')}</p>

  return (
    <div className="wgh-board">
      <div className="wgh-board__scroll">
        <table className="wgh-table">
          <thead>
            <tr>
              <th scope="col" className="wgh-table__member">
                {text('boardMember')}
              </th>
              {WORD_GAMES.map((game) => (
                <th key={game.id} scope="col">
                  <Link to={game.path} className="wgh-table__game">
                    <GameArt slug={game.art} size={30} />
                    <span>{pick(game.title)}</span>
                    <small>{pick(game.unit)}</small>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ member, scores }) => {
              const isMe = member.id === user?.id
              return (
                <tr key={member.id} className={isMe ? 'is-me' : undefined}>
                  <th scope="row" className="wgh-table__member">
                    <Link to={`/profile/${member.id}`} className="wgh-table__who">
                      <PlayerAvatar avatarItemId={member.avatar} size={34} />
                      <span className="wgh-table__name">{member.displayName}</span>
                      {isMe && <span className="pg-rank__me">{text('panelMine')}</span>}
                    </Link>
                  </th>
                  {WORD_GAMES.map((game, i) => {
                    const score = scores[i]
                    const leads = score !== null && score > 0 && score === topScore[game.id]
                    return (
                      <td key={game.id} className={leads ? 'is-top' : score === null ? 'is-empty' : undefined}>
                        {score === null ? (
                          <span aria-label="—">—</span>
                        ) : (
                          <Fragment>
                            {leads && <GameArt slug="crown" size={18} className="wgh-table__crown" />}
                            <span className="ds-num">{score}</span>
                          </Fragment>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="wgh-table__member">
                <span className="wgh-table__alltime">
                  <GameArt slug="trophy" size={22} /> {text('boardAllTime')}
                </span>
              </th>
              {WORD_GAMES.map((game) => {
                const best = board.games[game.id]?.familyBest
                return (
                  <td key={game.id}>
                    {best ? (
                      <span className="wgh-table__record">
                        <strong className="ds-num">{best.score}</strong>
                        <small>{best.userId === user?.id ? text('panelMine') : best.displayName}</small>
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                )
              })}
            </tr>
          </tfoot>
        </table>
      </div>
      {idleCount > 0 && <p className="wgh-board__note">{text('boardIdle', { n: idleCount })}</p>}
      {!board.weeklyAvailable && <p className="wgh-board__note">{text('boardWeeklyOff')}</p>}
    </div>
  )
}
