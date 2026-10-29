/**
 * RankRow.tsx — 1 DÒNG TRONG BẢNG XẾP HẠNG (dùng chung cho: xếp hạng gia đình,
 * kỷ lục trò chơi chữ)
 * ----------------------------------------------------------------------------
 *   <ol className="pg-rank-list">
 *     <RankRow rank={1} name="Mẹ Lan" avatar={{ avatarItemId }} value="420" unit="XP" isMe={false} to="/profile/3" />
 *   </ol>
 * - Hạng 1–3: huy chương 3D vàng / bạc / đồng; từ hạng 4: số.
 * - isMe: dòng của chính người đang xem được tô nổi (nền cam nhạt + viền) và có nhãn "Bạn".
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PlayerAvatar } from '../../../components/PlayerIdentity'
import { usePlayText } from '../playground-text'
import { GameArt } from './GameArt'

const MEDALS = ['1st-place-medal', '2nd-place-medal', '3rd-place-medal']

export interface RankRowProps {
  rank: number
  /** tên (chuỗi hoặc <PlayerName/> có màu + danh hiệu) */
  name: ReactNode
  /** avatar (id trong users.avatar); bỏ trống = không hiện avatar */
  avatar?: { avatarItemId?: string | null; online?: boolean }
  /** con số chính bên phải (XP, điểm…) */
  value: ReactNode
  /** đơn vị nhỏ sau số (XP, điểm) */
  unit?: string
  /** dòng chữ nhỏ dưới tên */
  meta?: ReactNode
  /** phần thêm bên phải con số (VD "+20") */
  extra?: ReactNode
  isMe?: boolean
  /** cả dòng là link (VD tới hồ sơ) */
  to?: string
  /** dòng mờ (VD người đã rời phòng) */
  dimmed?: boolean
}

export function RankRow({ rank, name, avatar, value, unit, meta, extra, isMe = false, to, dimmed = false }: RankRowProps) {
  const playText = usePlayText()
  const body = (
    <>
      <span className="pg-rank__place">{rank <= 3 ? <GameArt slug={MEDALS[rank - 1]} size={30} /> : <span className="ds-num">{rank}</span>}</span>
      {avatar && <PlayerAvatar avatarItemId={avatar.avatarItemId} size={40} online={avatar.online} />}
      <span className="pg-rank__who">
        <span className="pg-rank__name">
          {name}
          {isMe && <span className="pg-rank__me">{playText('you')}</span>}
        </span>
        {meta && <span className="pg-rank__meta">{meta}</span>}
      </span>
      <span className="pg-rank__value">
        <strong className="ds-num">{value}</strong>
        {unit && <span className="pg-rank__unit">{unit}</span>}
      </span>
      {extra && <span className="pg-rank__extra">{extra}</span>}
    </>
  )
  const classes = ['pg-rank', isMe && 'is-me', dimmed && 'is-dimmed', rank <= 3 && `is-top is-top-${rank}`].filter(Boolean).join(' ')
  return <li className={classes}>{to ? <Link to={to} className="pg-rank__link">{body}</Link> : <div className="pg-rank__link">{body}</div>}</li>
}
