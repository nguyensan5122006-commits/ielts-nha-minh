/**
 * PlayerIdentity.tsx — HIỂN THỊ "DANH TÍNH" NGƯỜI CHƠI
 *  - PlayerAvatar : avatar emoji trong vòng tròn, có khung (mua ở cửa hàng) và chấm xanh online
 *  - PlayerName   : tên có màu (mua ở cửa hàng) + danh hiệu nhỏ bên dưới
 *  - CardImage    : hình của thẻ Học vui (emoji hoặc cờ thật)
 */
import type { FunCardImage } from '../content/content-types'
import { findShopItem } from '../game-economy/shop-catalog'
import { useLanguage } from '../translations/language-context'

interface AvatarProps {
  avatarItemId?: string | null
  frameItemId?: string | null
  size?: number
  online?: boolean
}

export function PlayerAvatar({ avatarItemId, frameItemId, size = 40, online }: AvatarProps) {
  const emoji = findShopItem(avatarItemId ?? '')?.value ?? '🙂'
  const frame = frameItemId ? findShopItem(frameItemId)?.value : undefined
  return (
    <span
      className="player-avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        // có khung: viền dày tô gradient; không có: viền xám mảnh
        padding: frame ? Math.max(2, size * 0.07) : 1,
        background: frame ?? 'var(--color-border)',
      }}
    >
      <span className="player-avatar__inner">{emoji}</span>
      {online !== undefined && <span className={`player-avatar__dot ${online ? 'is-online' : ''}`} />}
    </span>
  )
}

interface NameProps {
  name: string
  nameColorItemId?: string | null
  titleItemId?: string | null
  /** danh hiệu theo level (khi không mua danh hiệu) */
  fallbackTitle?: string
  showTitle?: boolean
}

export function PlayerName({ name, nameColorItemId, titleItemId, fallbackTitle, showTitle = false }: NameProps) {
  const { language } = useLanguage()
  const color = nameColorItemId ? findShopItem(nameColorItemId)?.value : undefined
  // danh hiệu mua lưu dạng "Tiếng Việt|English"
  const boughtTitle = titleItemId ? findShopItem(titleItemId)?.value?.split('|')[language === 'vi' ? 0 : 1] : undefined
  const title = boughtTitle ?? fallbackTitle
  return (
    <span className="player-name">
      <span className={color === 'rainbow' ? 'rainbow-text' : undefined} style={color && color !== 'rainbow' ? { color, fontWeight: 700 } : { fontWeight: 600 }}>
        {name}
      </span>
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
