/**
 * ChatWidget.tsx — BONG BÓNG CHAT GÓC PHẢI MÀN HÌNH (kiểu Messenger)
 * ----------------------------------------------------------------------------
 * Bấm để mở khung chat nhỏ: chọn kênh (gia đình / người online) + tin nhắn.
 * Ẩn khi đang học bài, làm bài thi, đang chơi trò chơi chữ (cần bàn phím) hoặc đang ở trang Chat to.
 * (v3) Giao diện làm lại: nút tròn cam "vinyl" có ảnh 3D bong bóng thoại + số tin chưa đọc;
 *      khung nhỏ có đầu khung (tên kênh, mở trang chat, đóng), phím Esc để đóng.
 *      Ẩn thêm ở trang bắt đầu (/start) vì trang đó có bố cục riêng.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FAMILY_CHANNEL } from './chat-channels'
import { IconButton } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { ChatChannelList } from './ChatChannelList'
import { ChatPanel } from './ChatPanel'
import '../features/playground/styles/chat.css'

const HIDDEN_ON = ['/lesson/', '/exam/', '/games/', '/chat', '/start', '/review/session']

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

  if (hidden) return null
  return (
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
  )
}
