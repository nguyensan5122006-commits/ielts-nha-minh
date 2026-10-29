/**
 * FamilyLeaderboardCard.tsx — (d) BẢNG XẾP HẠNG GIA ĐÌNH TOP 5 TUẦN NÀY (trên trang chủ)
 * ----------------------------------------------------------------------------
 * Chủ nhà muốn có bảng này ngay trang chủ. Dữ liệu: kho thành viên gia đình (useFamily —
 * /api/users, tự làm mới mỗi phút), sắp theo XP tuần này.
 *  - Mỗi dòng: hạng (huy chương 3D cho top 3), avatar + khung, tên màu, thanh XP so với người
 *    đứng đầu, số XP. Dòng của bạn được tô nổi.
 *  - Bạn ngoài top 5 -> thêm 1 dòng của bạn ở dưới (sau dấu …).
 *  - Cuối thẻ: tổng XP cả nhà (tinh thần cùng nhau, psych-adult D7.32) + link /leaderboard.
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import type { FamilyMember } from '../../../services/api-client'
import { PlayerAvatar, PlayerName } from '../../../components/PlayerIdentity'
import { Card } from '../../../design-system/components/Card'
import { Icon } from '../../../design-system/components/Icon'
import { useFamily } from '../../../family-members/family-store'
import { useRealtime } from '../../../realtime/realtime-store'
import { useAuth } from '../../../services/auth-context'
import { useRightRailText } from '../right-rail-text'

const TOP_N = 5
const MEDALS = ['1st-place-medal', '2nd-place-medal', '3rd-place-medal']

export function FamilyLeaderboardCard() {
  const text = useRightRailText()
  const { user } = useAuth()
  const { members } = useFamily()
  const { online } = useRealtime()

  const ranked = [...members].sort((a, b) => b.weekXp - a.weekXp || a.displayName.localeCompare(b.displayName))
  const top = ranked.slice(0, TOP_N)
  const myIndex = ranked.findIndex((member) => member.id === user?.id)
  const showMeBelow = myIndex >= TOP_N
  const leaderXp = Math.max(1, ranked[0]?.weekXp ?? 1)
  const familyXp = ranked.reduce((sum, member) => sum + member.weekXp, 0)

  return (
    <Card padding="sm" className="rr-card rr-board" as="section" aria-labelledby="rr-board-title">
      <div className="rr-card__head">
        <h3 id="rr-board-title" className="rr-card__title">
          <img src="/word-images/trophy.webp" width={24} height={24} alt="" aria-hidden />
          {text.leaderboardTitle}
        </h3>
        <Link to="/leaderboard" className="rr-card__link">
          {text.leaderboardAll}
          <Icon name="chevron-right" size={14} />
        </Link>
      </div>

      {members.length === 0 ? (
        <p className="rr-muted">{text.leaderboardLoading}</p>
      ) : (
        <ol className="rr-board__list">
          {top.map((member, index) => (
            <BoardRow key={member.id} member={member} rank={index + 1} isMe={member.id === user?.id} online={online.includes(member.id)} leaderXp={leaderXp} />
          ))}
          {showMeBelow && (
            <>
              <li className="rr-board__gap" aria-hidden>
                ⋯
              </li>
              <BoardRow member={ranked[myIndex]} rank={myIndex + 1} isMe online={online.includes(ranked[myIndex].id)} leaderXp={leaderXp} />
            </>
          )}
        </ol>
      )}
      {members.length > 0 && familyXp === 0 && <p className="rr-muted rr-board__empty">{text.leaderboardEmpty}</p>}
      {familyXp > 0 && <div className="rr-board__family">👨‍👩‍👧‍👦 {text.leaderboardFamilyTotal(familyXp)}</div>}
    </Card>
  )
}

function BoardRow({ member, rank, isMe, online, leaderXp }: { member: FamilyMember; rank: number; isMe: boolean; online: boolean; leaderXp: number }) {
  const text = useRightRailText()
  const medal = member.weekXp > 0 ? MEDALS[rank - 1] : undefined
  return (
    <li className={`rr-board__row${isMe ? ' is-me' : ''}`}>
      <Link to={`/profile/${member.id}`} className="rr-board__link">
        <span className="rr-board__rank">{medal ? <img src={`/word-images/${medal}.webp`} width={26} height={26} alt={`#${rank}`} /> : rank}</span>
        <PlayerAvatar avatarItemId={member.avatar} frameItemId={member.frame} size={34} online={online} />
        <span className="rr-board__who">
          <span className="rr-board__name">
            <PlayerName name={member.displayName} nameColorItemId={member.nameColor} />
            {isMe && <span className="rr-board__you">{text.leaderboardYou}</span>}
          </span>
          <span className="rr-board__bar" aria-hidden>
            <span style={{ width: `${Math.max(member.weekXp > 0 ? 6 : 0, (member.weekXp / leaderXp) * 100)}%` }} />
          </span>
        </span>
        <span className="rr-board__xp ds-num">{text.leaderboardXp(member.weekXp)}</span>
      </Link>
    </li>
  )
}
