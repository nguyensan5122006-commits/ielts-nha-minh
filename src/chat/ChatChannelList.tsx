/**
 * ChatChannelList.tsx — DANH SÁCH KÊNH CHAT
 * "Gia đình" ở đầu, sau đó từng thành viên (chat riêng), người online lên trước,
 * chấm xanh = đang online, số đỏ = tin chưa đọc.
 * (v3) Giao diện làm lại: kênh gia đình có ảnh 3D ngôi nhà, mục đang mở tô cam nhạt,
 *      tách nhóm "Đang online" / còn lại. Lớp CSS: chat-ch-* (features/playground/styles/chat.css).
 */
import { directChannel, FAMILY_CHANNEL } from './chat-channels'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { GameArt } from '../features/playground/components/GameArt'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/chat.css'

export function ChatChannelList({ active, onSelect }: { active: string; onSelect: (channel: string) => void }) {
  const { user } = useAuth()
  const { members } = useFamily()
  const { online, unread } = useRealtime()
  const { t } = useLanguage()
  const playText = usePlayText()
  if (!user) return null

  const others = members
    .filter((m) => m.id !== user.id)
    .sort((a, b) => Number(online.includes(b.id)) - Number(online.includes(a.id)) || a.displayName.localeCompare(b.displayName))
  const onlineCount = online.filter((id) => id !== user.id).length

  return (
    <nav className="chat-ch" aria-label={playText('chatChannels')}>
      <button type="button" className={`chat-ch__item chat-ch__item--family ${active === FAMILY_CHANNEL ? 'is-active' : ''}`} onClick={() => onSelect(FAMILY_CHANNEL)} aria-current={active === FAMILY_CHANNEL || undefined}>
        <span className="chat-ch__family-art">
          <GameArt slug="house-with-garden" size={28} />
        </span>
        <span className="chat-ch__text">
          <span className="chat-ch__name">{t('familyChannel')}</span>
          <span className="chat-ch__sub">{playText('chatFamilyHint')}</span>
        </span>
        {(unread[FAMILY_CHANNEL] ?? 0) > 0 && <span className="chat-ch__unread">{unread[FAMILY_CHANNEL]}</span>}
      </button>
      <div className="chat-ch__group">
        <span className="chat-ch__dot" aria-hidden /> {t('onlineCount', { n: onlineCount })}
      </div>
      <ul className="chat-ch__list">
        {others.map((member) => {
          const channel = directChannel(user.id, member.id)
          const isOnline = online.includes(member.id)
          return (
            <li key={member.id}>
              <button type="button" className={`chat-ch__item ${active === channel ? 'is-active' : ''} ${isOnline ? 'is-online' : ''}`} onClick={() => onSelect(channel)} aria-current={active === channel || undefined}>
                <PlayerAvatar avatarItemId={member.avatar} size={34} online={isOnline} />
                <span className="chat-ch__text">
                  <span className="chat-ch__name">{member.displayName}</span>
                </span>
                {(unread[channel] ?? 0) > 0 && <span className="chat-ch__unread">{unread[channel]}</span>}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
