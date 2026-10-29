/**
 * ChatWidget.tsx — BONG BÓNG CHAT GÓC PHẢI MÀN HÌNH (kiểu Messenger)
 * ----------------------------------------------------------------------------
 * Bấm để mở khung chat nhỏ: chọn kênh (gia đình / người online) + tin nhắn.
 * Ẩn khi đang học bài, làm bài thi, đang thi đấu hoặc đang ở trang Chat to.
 * Kèm lớp hiệu ứng toàn màn hình (pháo hoa, tim bay) khi có tin nhắn kèm hiệu ứng.
 * (v3) Giao diện làm lại: nút tròn cam "vinyl" có ảnh 3D bong bóng thoại + số tin chưa đọc;
 *      khung nhỏ có đầu khung (tên kênh, mở trang chat, đóng), phím Esc để đóng.
 *      Ẩn thêm ở khu trẻ em (/kids) và trang bắt đầu (/start) vì các khu đó có bố cục riêng.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FAMILY_CHANNEL } from './chat-channels'
import { IconButton } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useRealtime, useRealtimeEvent } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { ChatChannelList } from './ChatChannelList'
import { ChatPanel } from './ChatPanel'
import '../features/playground/styles/chat.css'

const HIDDEN_ON = ['/lesson/', '/exam/', '/arena/room', '/games/', '/chat', '/kids', '/start', '/review/session']

export function ChatWidget() {
  const { t } = useLanguage()
  const playText = usePlayText()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const { unread } = useRealtime()
  const [open, setOpen] = useState(false)
  const [channel, setChannel] = useState(FAMILY_CHANNEL)
  const [showList, setShowList] = useState(false)
  const totalUnread = Object.values(unread).reduce((sum, n) => sum + n, 0)

  // Esc đóng khung chat nhỏ
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const otherId = channel.startsWith('dm:') ? channel.split(':').map(Number).find((id) => id && id !== user?.id) : undefined
  const channelName = otherId ? (memberById(otherId)?.displayName ?? '…') : t('familyChannel')
  const hidden = HIDDEN_ON.some((path) => location.pathname.startsWith(path))

  return (
    <>
      <ChatEffectsOverlay />
      {!hidden && (
        <div className="chat-fab">
          {open && (
            <div className="chat-fab__window" role="dialog" aria-label={playText('chatTitle')}>
              <div className="chat-fab__head">
                <button type="button" className="chat-fab__channel" onClick={() => setShowList(!showList)} aria-expanded={showList}>
                  {otherId ? '💬' : <GameArt slug="house-with-garden" size={22} />}
                  <span>{showList ? playText('chatChannels') : channelName}</span>
                  <span className={`chat-fab__chev ${showList ? 'is-open' : ''}`} aria-hidden>
                    ▾
                  </span>
                </button>
                <IconButton
                  icon="arrow-right"
                  label={playText('chatOpenFull')}
                  variant="ghost"
                  size="sm"
                  className="chat-fab__full"
                  onClick={() => {
                    setOpen(false)
                    navigate(otherId ? `/chat?dm=${otherId}` : '/chat')
                  }}
                />
                <IconButton icon="close" label={playText('chatClose')} variant="ghost" size="sm" onClick={() => setOpen(false)} />
              </div>
              {showList ? (
                <div className="chat-fab__list">
                  <ChatChannelList
                    active={channel}
                    onSelect={(next) => {
                      setChannel(next)
                      setShowList(false)
                    }}
                  />
                </div>
              ) : (
                <ChatPanel channel={channel} compact />
              )}
            </div>
          )}
          <button type="button" className={`chat-fab__button ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? playText('chatClose') : playText('chatTitle')} aria-expanded={open}>
            <GameArt slug="speech-balloon" size={34} />
            {totalUnread > 0 && <span className="chat-fab__badge ds-num">{totalUnread > 99 ? '99+' : totalUnread}</span>}
          </button>
        </div>
      )}
    </>
  )
}

/** Hiệu ứng toàn màn hình khi có tin nhắn kèm pháo hoa / tim bay. */
function ChatEffectsOverlay() {
  const [particles, setParticles] = useState<{ id: number; emoji: string; left: number; delay: number }[]>([])

  useRealtimeEvent((message) => {
    if (message.t !== 'chat:message' || !message.message.effect) return
    const emojis = message.message.effect === 'fireworks' ? ['🎆', '🎇', '✨', '🎉'] : ['💕', '❤️', '💖', '💗']
    const batch = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
    }))
    setParticles((current) => [...current, ...batch])
    window.setTimeout(() => setParticles((current) => current.filter((p) => !batch.includes(p))), 3500)
  })

  if (particles.length === 0) return null
  return (
    <div className="effects-overlay" aria-hidden>
      {particles.map((particle) => (
        <span key={particle.id} className="effect-particle" style={{ left: `${particle.left}%`, animationDelay: `${particle.delay}s` }}>
          {particle.emoji}
        </span>
      ))}
    </div>
  )
}
