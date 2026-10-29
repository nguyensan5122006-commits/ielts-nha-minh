/**
 * PlayerIdentity.tsx — HIỂN THỊ "DANH TÍNH" NGƯỜI CHƠI
 *  - PlayerAvatar : avatar emoji trong vòng tròn + chấm xanh online
 *  - PlayerName   : tên + danh hiệu nhỏ bên dưới (danh hiệu theo level tài khoản)
 *  - CardImage    : hình của thẻ Học vui (emoji hoặc cờ thật)
 *
 * Avatar lưu ở cột users.avatar dạng id (VD 'avatar-cat'). Chỉ còn 4 avatar miễn phí dưới đây;
 * id khác (đồ cũ từng mua bằng chuối — tính năng đã xoá) hiện avatar mặc định 🙂.
 */
import type { FunCardImage } from '../content/content-types'

/** id avatar -> emoji. 'avatar-smile' là mặc định của tài khoản mới (cột users.avatar). */
const AVATAR_EMOJI: Record<string, string> = {
  'avatar-smile': '🙂',
  'avatar-cool': '😎',
  'avatar-cat': '🐱',
  'avatar-dog': '🐶',
}

interface AvatarProps {
  avatarItemId?: string | null
  size?: number
  online?: boolean
}

export function PlayerAvatar({ avatarItemId, size = 40, online }: AvatarProps) {
  const emoji = AVATAR_EMOJI[avatarItemId ?? ''] ?? AVATAR_EMOJI['avatar-smile']
  return (
    <span className="player-avatar" style={{ width: size, height: size, fontSize: size * 0.55, padding: 1, background: 'var(--color-border)' }}>
      <span className="player-avatar__inner">{emoji}</span>
      {online !== undefined && <span className={`player-avatar__dot ${online ? 'is-online' : ''}`} />}
    </span>
  )
}

interface NameProps {
  name: string
  /** danh hiệu theo level tài khoản */
  title?: string
  showTitle?: boolean
}

export function PlayerName({ name, title, showTitle = false }: NameProps) {
  return (
    <span className="player-name">
      <span style={{ fontWeight: 600 }}>{name}</span>
      {showTitle && title && <span className="player-name__title">{title}</span>}
    </span>
  )
}

export function CardImage({ image, size = 96 }: { image: FunCardImage; size?: number }) {
  if (image.kind === 'flag') {
    return <img className="flag-image" src={`/flags/${image.countryCode}.svg`} alt="" width={size * 1.33} height={size} loading="lazy" />
  }
  return (
    <span className="emoji-image" style={{ fontSize: size * 0.8, lineHeight: 1 }}>
      {image.value}
    </span>
  )
}
