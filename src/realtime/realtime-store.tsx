/**
 * realtime-store.tsx — KẾT NỐI REALTIME PHÍA TRÌNH DUYỆT
 * ----------------------------------------------------------------------------
 * Mở 1 kết nối WebSocket tới /api/realtime khi đã đăng nhập, tự kết nối lại khi rớt mạng.
 * Cung cấp cho mọi trang:
 *   - online        : id những người đang online
 *   - unread        : số tin chat chưa đọc theo kênh
 *   - send(msg)     : gửi tin lên máy chủ (chat, "đang gõ", khoe thành tích…)
 *   - useRealtimeEvent(fn) : nghe mọi tin máy chủ gửi về (trang Chat dùng)
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ClientMessage, ServerMessage } from './realtime-protocol'
import { useToast } from '../components/ToastCenter'
import { api } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { playNotificationSound } from './notification-sound'

interface RealtimeContextValue {
  connected: boolean
  online: number[]
  unread: Record<string, number>
  /** kênh chat đang mở trên màn hình (để không đếm tin chưa đọc kênh đó) */
  setOpenChannel: (channel: string | null) => void
  markChannelRead: (channel: string, messageId: number) => void
  send: (message: ClientMessage) => void
  subscribe: (listener: (message: ServerMessage) => void) => () => void
}

const RealtimeContext = createContext<RealtimeContextValue | null>(null)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { showToast } = useToast()

  const socketRef = useRef<WebSocket | null>(null)
  const listeners = useRef(new Set<(message: ServerMessage) => void>())
  const openChannelRef = useRef<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [online, setOnline] = useState<number[]>([])
  const [unread, setUnread] = useState<Record<string, number>>({})

  const send = useCallback((message: ClientMessage) => {
    const socket = socketRef.current
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(message))
  }, [])

  /* ---------- xử lý từng loại tin máy chủ gửi về ---------- */
  const handleServerMessage = useCallback(
    (message: ServerMessage) => {
      switch (message.t) {
        case 'hello':
        case 'presence':
          setOnline(message.online)
          break
        case 'error':
          showToast({ icon: '⚠️', text: message.message })
          break
        case 'chat:message': {
          const { channel, senderId } = message.message
          if (senderId !== user?.id && openChannelRef.current !== channel) {
            setUnread((current) => ({ ...current, [channel]: (current[channel] ?? 0) + 1 }))
            if (message.message.kind !== 'system') playNotificationSound()
          }
          break
        }
      }
      for (const listener of listeners.current) listener(message)
    },
    [user, showToast],
  )

  // giữ hàm xử lý mới nhất trong ref để kết nối WebSocket không phải mở lại mỗi lần render
  const handlerRef = useRef(handleServerMessage)
  handlerRef.current = handleServerMessage

  /* ---------- mở kết nối + tự nối lại ---------- */
  useEffect(() => {
    if (!user) return
    let stopped = false
    let retryDelay = 1000
    let pingTimer: number | undefined
    let retryTimer: number | undefined

    function connect() {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
      const socket = new WebSocket(`${protocol}://${window.location.host}/api/realtime`)
      socketRef.current = socket
      socket.onopen = () => {
        setConnected(true)
        retryDelay = 1000
        pingTimer = window.setInterval(() => socket.readyState === WebSocket.OPEN && socket.send('{"t":"ping"}'), 25_000)
      }
      socket.onmessage = (event) => {
        try {
          handlerRef.current(JSON.parse(event.data) as ServerMessage)
        } catch {
          /* tin hỏng: bỏ qua */
        }
      }
      socket.onclose = () => {
        setConnected(false)
        window.clearInterval(pingTimer)
        if (stopped) return
        retryTimer = window.setTimeout(connect, retryDelay)
        retryDelay = Math.min(retryDelay * 2, 30_000) // chờ lâu dần: 1s, 2s, 4s... tối đa 30s
      }
    }
    connect()
    // số tin chưa đọc lúc mới vào
    api
      .getChatUnread()
      // kênh đang mở (VD vào thẳng /chat) thì giữ 0 — kết quả tải về muộn không được ghi đè lại số cũ
      .then((data) => setUnread(openChannelRef.current ? { ...data.unread, [openChannelRef.current]: 0 } : data.unread))
      .catch(() => {})

    return () => {
      stopped = true
      window.clearInterval(pingTimer)
      window.clearTimeout(retryTimer)
      socketRef.current?.close()
      socketRef.current = null
    }
  }, [user])

  const setOpenChannel = useCallback((channel: string | null) => {
    openChannelRef.current = channel
    if (channel) setUnread((current) => ({ ...current, [channel]: 0 }))
  }, [])

  const markChannelRead = useCallback(
    (channel: string, messageId: number) => {
      send({ t: 'chat:read', channel, messageId })
      setUnread((current) => ({ ...current, [channel]: 0 }))
    },
    [send],
  )

  const subscribe = useCallback((listener: (message: ServerMessage) => void) => {
    listeners.current.add(listener)
    return () => {
      listeners.current.delete(listener)
    }
  }, [])

  const value = useMemo<RealtimeContextValue>(
    () => ({ connected, online, unread, setOpenChannel, markChannelRead, send, subscribe }),
    [connected, online, unread, setOpenChannel, markChannelRead, send, subscribe],
  )
  return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>
}

export function useRealtime(): RealtimeContextValue {
  const context = useContext(RealtimeContext)
  if (!context) throw new Error('useRealtime phải dùng bên trong <RealtimeProvider>')
  return context
}

/** Nghe mọi tin realtime (VD trang chat nghe tin nhắn mới). */
export function useRealtimeEvent(listener: (message: ServerMessage) => void) {
  const { subscribe } = useRealtime()
  const listenerRef = useRef(listener)
  listenerRef.current = listener
  useEffect(() => subscribe((message) => listenerRef.current(message)), [subscribe])
}
