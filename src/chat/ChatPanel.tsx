/**
 * ChatPanel.tsx — KHUNG TIN NHẮN CỦA 1 KÊNH (gia đình hoặc chat riêng)
 * ----------------------------------------------------------------------------
 *  - Tải 40 tin gần nhất, cuộn lên đầu bấm "Xem tin cũ hơn" để tải thêm
 *  - Nghe tin mới realtime, hiện "X đang gõ...", "Đã xem"
 *  - Gửi: chữ, emoji, sticker (miễn phí + bộ đã mua), ảnh (tự nén), hiệu ứng (đã mua)
 * Dùng ở cả trang Chat (to) lẫn bong bóng chat góc màn hình (compact).
 * (v3) Giao diện làm lại: bong bóng tin bo tròn (của mình màu cam nhạt bên phải), gom tin
 *      liên tiếp cùng người, giờ chỉ hiện ở tin cuối nhóm, ô soạn tin dạng viên thuốc,
 *      chưa có tin -> mascot vẫy chào. Logic tải / gửi / đã xem giữ nguyên. CSS: chat.css
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { ChatMessage } from '../game-questions/realtime-protocol'
import { FREE_STICKERS, SHOP_ITEMS } from '../game-economy/shop-catalog'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { Button, EmptyState, Icon } from '../design-system'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useRealtime, useRealtimeEvent } from '../realtime/realtime-store'
import { api } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { compressImage } from './image-compression'
import '../features/playground/styles/chat.css'

const EMOJIS = '😀 😂 🥰 😎 🤔 😮 😢 😡 👍 👏 🙏 💪 🎉 ❤️ 🔥 ✅ 📚 ✍️ 🎧 🗣️ 🍌 🏆 ⭐ 💯'.split(' ')

interface ChatPanelProps {
  channel: string
  compact?: boolean
}

export function ChatPanel({ channel, compact = false }: ChatPanelProps) {
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const playText = usePlayText()
  const { memberById } = useFamily()
  const { send, setOpenChannel, markChannelRead, connected } = useRealtime()
  const { owns } = useWallet()

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [reads, setReads] = useState<Record<number, number>>({}) // userId -> id tin đã đọc tới
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [typingUsers, setTypingUsers] = useState<Record<number, number>>({}) // userId -> hết hạn lúc
  const [panel, setPanel] = useState<'none' | 'emoji' | 'sticker'>('none')
  const [effect, setEffect] = useState<string | null>(null)
  const [error, setError] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const lastTypingSent = useRef(0)

  const scrollToBottom = () => window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight }), 30)

  /* ---------- tải lịch sử khi đổi kênh ---------- */
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setMessages([])
    setOpenChannel(channel)
    api
      .getChatMessages(channel)
      .then((data) => {
        if (cancelled) return
        setMessages(data.messages)
        setReads(Object.fromEntries(data.reads.map((r) => [r.userId, r.lastReadId])))
        setHasMore(data.hasMore)
        scrollToBottom()
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
      setOpenChannel(null)
    }
  }, [channel, setOpenChannel])

  /* ---------- đánh dấu đã đọc tin mới nhất ---------- */
  const lastMessage = messages[messages.length - 1]
  useEffect(() => {
    if (lastMessage && lastMessage.senderId !== user?.id && document.visibilityState === 'visible') markChannelRead(channel, lastMessage.id)
  }, [lastMessage, channel, user, markChannelRead])

  /* ---------- nghe tin realtime ---------- */
  useRealtimeEvent((message) => {
    if (message.t === 'chat:message' && message.message.channel === channel) {
      setMessages((current) => (current.some((m) => m.id === message.message.id) ? current : [...current, message.message]))
      setTypingUsers((current) => ({ ...current, [message.message.senderId]: 0 }))
      scrollToBottom()
    } else if (message.t === 'chat:typing' && message.channel === channel) {
      setTypingUsers((current) => ({ ...current, [message.userId]: Date.now() + 3500 }))
    } else if (message.t === 'chat:read' && message.channel === channel) {
      setReads((current) => ({ ...current, [message.userId]: Math.max(current[message.userId] ?? 0, message.messageId) }))
    }
  })

  // làm mới dòng "đang gõ" mỗi giây
  const [, forceTick] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => forceTick((n) => n + 1), 1000)
    return () => window.clearInterval(timer)
  }, [])

  async function loadOlder() {
    if (!messages[0]) return
    const data = await api.getChatMessages(channel, messages[0].id)
    setMessages((current) => [...data.messages, ...current])
    setHasMore(data.hasMore)
  }

  const sendMessage = useCallback(
    (kind: 'text' | 'image' | 'sticker', body: string) => {
      if (!connected) {
        setError(t('chatOffline'))
        return
      }
      setError('')
      send({ t: 'chat:send', channel, kind, body, effect: effect ?? undefined })
      setEffect(null)
      setPanel('none')
    },
    [connected, send, channel, effect, t],
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!text.trim()) return
    sendMessage('text', text.trim())
    setText('')
  }

  function handleTyping(value: string) {
    setText(value)
    if (Date.now() - lastTypingSent.current > 2000) {
      lastTypingSent.current = Date.now()
      send({ t: 'chat:typing', channel })
    }
  }

  async function handleImage(file: File | undefined) {
    if (!file) return
    try {
      sendMessage('image', await compressImage(file))
    } catch {
      setError(t('imageError'))
    }
  }

  const ownedStickers = [FREE_STICKERS, ...SHOP_ITEMS.filter((i) => i.category === 'sticker-pack' && owns(i.id)).map((i) => i.value ?? '')]
    .join(' ')
    .split(' ')
    .filter(Boolean)
  const ownedEffects = SHOP_ITEMS.filter((i) => i.category === 'chat-effect' && owns(i.id))
  const typingNames = Object.entries(typingUsers)
    .filter(([id, until]) => until > Date.now() && Number(id) !== user?.id)
    .map(([id]) => memberById(Number(id))?.displayName ?? '...')

  // "Đã xem": tin cuối cùng của mình đã được những ai đọc
  const myLastMessage = [...messages].reverse().find((m) => m.senderId === user?.id && m.kind !== 'system')
  const seenBy = myLastMessage
    ? Object.entries(reads)
        .filter(([id, lastRead]) => Number(id) !== user?.id && lastRead >= myLastMessage.id)
        .map(([id]) => memberById(Number(id))?.displayName ?? '')
    : []

  const timeOf = (createdAt: string) =>
    new Date(createdAt.replace(' ', 'T') + 'Z').toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className={`chat-panel ${compact ? 'chat-panel--compact' : ''}`}>
      <div className="chat-msgs" ref={listRef} aria-live="polite">
        {hasMore && (
          <Button variant="ghost" size="sm" onClick={loadOlder} className="chat-msgs__older">
            ↑ {t('olderMessages')}
          </Button>
        )}
        {loading && <span className="chat-msgs__loading" role="status" aria-label="…" />}
        {!loading && messages.length === 0 && <EmptyState pose="wave" mascotSize={compact ? 88 : 140} title={playText('chatEmpty')} text={playText('chatEmptyText')} />}
        {messages.map((message, index) => {
          if (message.kind === 'system') {
            return (
              <div key={message.id} className="chat-system">
                {message.body}
              </div>
            )
          }
          const mine = message.senderId === user?.id
          const sender = memberById(message.senderId)
          const showHeader = !mine && messages[index - 1]?.senderId !== message.senderId
          const lastOfGroup = messages[index + 1]?.senderId !== message.senderId
          return (
            <div key={message.id} className={`chat-row ${mine ? 'is-mine' : ''} ${lastOfGroup ? 'is-last' : ''}`}>
              {!mine && (
                <div className="chat-row__avatar">
                  {showHeader && (
                    <Link to={`/profile/${message.senderId}`} aria-label={sender?.displayName}>
                      <PlayerAvatar avatarItemId={sender?.avatar} frameItemId={sender?.frame} size={32} />
                    </Link>
                  )}
                </div>
              )}
              <div className="chat-row__stack">
                {showHeader && <div className="chat-row__name">{sender?.displayName}</div>}
                <div className={`chat-bubble2 chat-bubble2--${message.kind} ${message.effect ? 'has-effect' : ''}`} title={timeOf(message.createdAt)}>
                  {message.kind === 'image' ? (
                    <a href={message.body} target="_blank" rel="noreferrer">
                      <img src={message.body} alt="" className="chat-bubble2__image" />
                    </a>
                  ) : (
                    message.body
                  )}
                  {message.effect && <span className="chat-bubble2__effect">{message.effect === 'fireworks' ? '🎆' : '💕'}</span>}
                </div>
                {lastOfGroup && <div className="chat-row__time">{timeOf(message.createdAt)}</div>}
              </div>
            </div>
          )
        })}
        {seenBy.length > 0 && <div className="chat-seen2">✓✓ {t('seenBy', { names: seenBy.join(', ') })}</div>}
      </div>

      {typingNames.length > 0 && (
        <div className="chat-typing2">
          <span className="chat-typing2__dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          {t('isTyping', { names: typingNames.join(', ') })}
        </div>
      )}
      {error && <div className="pg-note pg-note--oops chat-error">{error}</div>}

      {/* bảng emoji / sticker */}
      {panel !== 'none' && (
        <div className={`chat-picker2 ${panel === 'sticker' ? 'is-stickers' : ''}`}>
          {(panel === 'emoji' ? EMOJIS : ownedStickers).map((item, i) => (
            <button key={`${item}-${i}`} type="button" onClick={() => (panel === 'emoji' ? setText((current) => current + item) : sendMessage('sticker', item))}>
              {item}
            </button>
          ))}
          {panel === 'sticker' && (
            <Link to="/shop" className="chat-picker2__more">
              + {t('moreStickers')}
            </Link>
          )}
        </div>
      )}

      <form className="chat-composer" onSubmit={handleSubmit}>
        <div className="chat-composer__tools">
          <button type="button" className={`chat-tool2 ${panel === 'emoji' ? 'is-active' : ''}`} onClick={() => setPanel(panel === 'emoji' ? 'none' : 'emoji')} aria-label={playText('chatEmoji')} title={playText('chatEmoji')}>
            😀
          </button>
          <button type="button" className={`chat-tool2 ${panel === 'sticker' ? 'is-active' : ''}`} onClick={() => setPanel(panel === 'sticker' ? 'none' : 'sticker')} aria-label={playText('chatSticker')} title={playText('chatSticker')}>
            🧸
          </button>
          <button type="button" className="chat-tool2" onClick={() => fileInputRef.current?.click()} aria-label={playText('chatImage')} title={playText('chatImage')}>
            🖼️
          </button>
          {ownedEffects.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chat-tool2 ${effect === item.value ? 'is-active' : ''}`}
              onClick={() => setEffect(effect === item.value ? null : (item.value ?? null))}
              aria-pressed={effect === item.value}
              title={item.name[language]}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e) => void handleImage(e.target.files?.[0])} />
        <input className="chat-composer__input" value={text} onChange={(e) => handleTyping(e.target.value)} placeholder={t('typeMessage')} maxLength={2000} aria-label={t('typeMessage')} />
        <button type="submit" className="chat-composer__send" disabled={!text.trim()} aria-label={playText('chatSend')}>
          <Icon name="arrow-right" size={20} strokeWidth={2.5} />
        </button>
      </form>
    </div>
  )
}
