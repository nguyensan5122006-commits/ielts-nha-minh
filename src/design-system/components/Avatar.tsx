/**
 * Avatar.tsx — ẢNH ĐẠI DIỆN TRÒN (chữ cái đầu / emoji / ảnh)
 * ----------------------------------------------------------------------------
 *   <Avatar name="Thiên Thảo" />                  // vòng tròn màu + "TT"
 *   <Avatar name="Bố" emoji="🦁" size={56} online />
 *   <Avatar name="Mẹ" src="/avatars/me.webp" ring="gold" />  // viền vàng (VD hạng 1)
 *
 * Avatar MUA Ở CỬA HÀNG (khung, emoji) vẫn dùng PlayerAvatar cũ trong
 * src/components/PlayerIdentity.tsx — đã được làm lại giao diện bằng CSS.
 * Component này dùng cho chỗ mới (bảng xếp hạng gia đình, chat, hồ sơ…).
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import './Avatar.css'

export interface AvatarProps {
  /** tên người (dùng làm chữ alt và lấy chữ cái đầu) */
  name: string
  /** emoji đại diện (ưu tiên hơn chữ cái) */
  emoji?: string
  /** ảnh đại diện (ưu tiên nhất; lỗi thì về emoji/chữ cái) */
  src?: string
  /** cỡ px, mặc định 40 */
  size?: number
  /** viền màu: none · primary · gold · navy · olive */
  ring?: 'none' | 'primary' | 'gold' | 'navy' | 'olive'
  /** có -> chấm trạng thái (xanh = đang online) */
  online?: boolean
  className?: string
}

const BACKGROUNDS = ['#ffe7cf', '#e6e9f8', '#eef2e1', '#fff4d6', '#ffe4e1', '#e2f8ee']
const INKS = ['#a34a06', '#2b3a8f', '#5e6b35', '#8a5a00', '#c0322a', '#0e7a50']

/** "Nguyễn Thiên Thảo" -> "TT" (2 chữ cái đầu của 2 từ cuối) */
function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[words.length - 2][0] + words[words.length - 1][0]).toUpperCase()
}

/** cùng tên -> luôn cùng màu */
function colorIndex(name: string) {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash % BACKGROUNDS.length
}

export function Avatar({ name, emoji, src, size = 40, ring = 'none', online, className }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const tone = colorIndex(name)
  const style = { width: size, height: size, fontSize: size * 0.4, '--avatar-bg': BACKGROUNDS[tone], '--avatar-ink': INKS[tone] } as CSSProperties

  let content
  if (src && !imageFailed) content = <img src={src} alt="" onError={() => setImageFailed(true)} draggable={false} />
  else if (emoji) content = <span className="ds-avatar__emoji">{emoji}</span>
  else content = <span className="ds-avatar__initials">{initialsOf(name)}</span>

  return (
    <span className={['ds-avatar', `ds-avatar--ring-${ring}`, className].filter(Boolean).join(' ')} style={style} role="img" aria-label={name}>
      <span className="ds-avatar__inner">{content}</span>
      {online !== undefined && <span className={online ? 'ds-avatar__dot is-online' : 'ds-avatar__dot'} />}
    </span>
  )
}
