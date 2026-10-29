/**
 * ChatPage.tsx — TRANG CHAT TO: danh sách kênh bên trái, tin nhắn bên phải.
 * /chat?dm=5 -> mở thẳng chat riêng với người id 5.
 * (v3) Giao diện làm lại: khung 2 cột cao vừa màn hình, đầu khung có avatar + trạng thái online;
 *      chat riêng có nút xem hồ sơ (bước tiếp theo).
 */
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { directChannel, FAMILY_CHANNEL } from '../chat/chat-channels'
import { ChatChannelList } from '../chat/ChatChannelList'
import { ChatPanel } from '../chat/ChatPanel'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { Badge, Button } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/chat.css'

export function ChatPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const playText = usePlayText()
  const { memberById, members } = useFamily()
  const { connected, online } = useRealtime()
  const [searchParams] = useSearchParams()
  const dmTarget = Number(searchParams.get('dm'))
  const [channel, setChannel] = useState(user && dmTarget ? directChannel(user.id, dmTarget) : FAMILY_CHANNEL)

  // tên kênh đang mở
  const otherId = channel.startsWith('dm:') ? channel.split(':').map(Number).find((id) => id && id !== user?.id) : undefined
  const other = otherId ? memberById(otherId) : undefined
  const isOnline = !!otherId && online.includes(otherId)
  const familyOnline = members.filter((m) => m.id !== user?.id && online.includes(m.id)).length

  return (
    <main className="page pg-page chat-page">
      <div className="chat-shell">
        <aside className="chat-shell__side">
          <h1 className="chat-shell__title">
            <GameArt slug="speech-balloon" size={30} /> {playText('chatTitle')}
          </h1>
          <ChatChannelList active={channel} onSelect={setChannel} />
        </aside>
        <section className="chat-shell__main" aria-label={other?.displayName ?? t('familyChannel')}>
          <header className="chat-shell__head">
            {other ? (
              <PlayerAvatar avatarItemId={other.avatar} size={42} online={isOnline} />
            ) : (
              <span className="chat-ch__family-art chat-ch__family-art--lg">
                <GameArt slug="house-with-garden" size={32} />
              </span>
            )}
            <div className="chat-shell__who">
              <strong>{other?.displayName ?? t('familyChannel')}</strong>
              <span>{other ? (isOnline ? playText('chatOnlineNow') : playText('chatDirectHint')) : `${playText('chatFamilyHint')} · ${t('onlineCount', { n: familyOnline })}`}</span>
            </div>
            {!connected && <Badge tone="gold">{t('reconnecting')}</Badge>}
            {other && (
              <div className="chat-shell__actions">
                <Button to={`/profile/${other.id}`} variant="ghost" size="sm" iconLeft="profile">
                  {playText('chatProfile')}
                </Button>
              </div>
            )}
          </header>
          <ChatPanel channel={channel} />
        </section>
      </div>
    </main>
  )
}
