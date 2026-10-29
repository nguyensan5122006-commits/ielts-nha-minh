/**
 * realtime-store.tsx — KẾT NỐI REALTIME PHÍA TRÌNH DUYỆT
 * ----------------------------------------------------------------------------
 * Mở 1 kết nối WebSocket tới /api/realtime khi đã đăng nhập, tự kết nối lại khi rớt mạng.
 * Cung cấp cho mọi trang:
 *   - online        : id những người đang online
 *   - rooms         : các phòng thi đấu đang chờ người
 *   - myRoom, game  : phòng mình đang ở + trạng thái trận đấu (câu hỏi, điểm, sức mạnh...)
 *   - unread        : số tin chat chưa đọc theo kênh
 *   - send(msg)     : gửi tin lên máy chủ
 *   - useRealtimeEvent(fn) : nghe mọi tin máy chủ gửi về (trang Chat dùng)
 * Tin "bananas" (số dư mới) được chuyển cho ví chuối.
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { GameQuestion } from '../game-questions/question-bank'
import type { ClientMessage, PlayerResult, PowerId, RoomSummary, ServerMessage } from '../game-questions/realtime-protocol'
import { useToast } from '../components/ToastCenter'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { playNotificationSound } from './notification-sound'

/** Trạng thái trận đấu đang diễn ra (phía người chơi). */
export interface LiveGameState {
  countdownStartsAt: number | null
  question: GameQuestion | null
  questionIndex: number
  totalQuestions: number
  questionStartedAt: number
  timeLimitMs: number
  extraMs: number
  myAnswer: string | null
  removedIndexes: number[]
  frozenUntil: number
  reveal: Extract<ServerMessage, { t: 'game:reveal' }> | null
  scores: Record<number, number>
  chain: Extract<ServerMessage, { t: 'game:chain-turn' }> | null
  chainRejected: string | null
  eliminated: number[]
  powerLog: { fromId: number; power: PowerId; targetId?: number; blocked?: boolean; at: number }[]
  powersUsed: number
  over: { ranking: PlayerResult[]; pot: number; winnerIds: number[] } | null
}

const EMPTY_GAME: LiveGameState = {
  countdownStartsAt: null,
  question: null,
  questionIndex: -1,
  totalQuestions: 0,
  questionStartedAt: 0,
  timeLimitMs: 0,
  extraMs: 0,
  myAnswer: null,
  removedIndexes: [],
  frozenUntil: 0,
  reveal: null,
  scores: {},
  chain: null,
  chainRejected: null,
  eliminated: [],
  powerLog: [],
  powersUsed: 0,
  over: null,
}

interface RealtimeContextValue {
  connected: boolean
  online: number[]
  rooms: RoomSummary[]
  myRoom: RoomSummary | null
  game: LiveGameState
  unread: Record<string, number>
  /** kênh chat đang mở trên màn hình (để không đếm tin chưa đọc kênh đó) */
  setOpenChannel: (channel: string | null) => void
  markChannelRead: (channel: string, messageId: number) => void
  send: (message: ClientMessage) => void
  answer: (answer: string) => void
  usePower: (power: PowerId, targetId?: number) => void
  leaveRoom: () => void
  subscribe: (listener: (message: ServerMessage) => void) => () => void
}

const RealtimeContext = createContext<RealtimeContextValue | null>(null)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { setBalance } = useWallet()
  const { recordActivity } = useProgress()
  const { showToast } = useToast()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const socketRef = useRef<WebSocket | null>(null)
  const listeners = useRef(new Set<(message: ServerMessage) => void>())
  const openChannelRef = useRef<string | null>(null)
  const [connected, setConnected] = useState(false)
  const [online, setOnline] = useState<number[]>([])
  const [rooms, setRooms] = useState<RoomSummary[]>([])
  const [myRoom, setMyRoom] = useState<RoomSummary | null>(null)
  const [game, setGame] = useState<LiveGameState>(EMPTY_GAME)
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
          setOnline(message.online)
          setRooms(message.rooms)
          break
        case 'presence':
          setOnline(message.online)
          break
        case 'rooms':
          setRooms(message.rooms)
          break
        case 'bananas':
          setBalance(message.balance)
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
        case 'room:update':
          setMyRoom(message.room)
          if (message.room.status === 'lobby') setGame(EMPTY_GAME)
          break
        case 'room:invite':
          playNotificationSound()
          showToast({
            icon: '⚔️',
            text: t('inviteToast', { name: message.fromName }),
            durationMs: 15_000,
            action: {
              label: t('joinRoom'),
              onClick: () => {
                send({ t: 'room:join', roomId: message.room.id })
                navigate('/arena/room')
              },
            },
          })
          break
        case 'room:closed':
          setMyRoom((current) => (current?.id === message.roomId ? null : current))
          setGame(EMPTY_GAME)
          showToast({ icon: 'ℹ️', text: message.reason })
          break
        case 'game:countdown':
          setGame({ ...EMPTY_GAME, countdownStartsAt: message.startsAt })
          break
        case 'game:question':
          setGame((current) => ({
            ...current,
            countdownStartsAt: null,
            question: message.question,
            questionIndex: message.index,
            totalQuestions: message.total,
            questionStartedAt: message.startedAt,
            timeLimitMs: message.timeLimitMs,
            extraMs: 0,
            myAnswer: null,
            removedIndexes: [],
            reveal: null,
          }))
          break
        case 'game:reveal':
          setGame((current) => ({ ...current, reveal: message, scores: message.scores }))
          break
        case 'game:frozen':
          setGame((current) => ({ ...current, frozenUntil: message.until }))
          break
        case 'game:fifty':
          setGame((current) => (current.questionIndex === message.questionIndex ? { ...current, removedIndexes: message.removeIndexes } : current))
          break
        case 'game:extra-time':
          setGame((current) => (current.questionIndex === message.questionIndex ? { ...current, extraMs: message.extraMs } : current))
          break
        case 'game:power-used':
          setGame((current) => ({ ...current, powerLog: [...current.powerLog.slice(-5), { ...message, at: Date.now() }] }))
          break
        case 'game:chain-turn':
          setGame((current) => ({ ...current, countdownStartsAt: null, chain: message, chainRejected: null, scores: message.scores }))
          break
        case 'game:chain-rejected':
          setGame((current) => ({ ...current, chainRejected: `${message.word}: ${message.reason}` }))
          break
        case 'game:chain-out':
          setGame((current) => ({ ...current, eliminated: [...new Set([...current.eliminated, message.playerId])] }))
          break
        case 'game:over': {
          setGame((current) => ({ ...current, over: { ranking: message.ranking, pot: message.pot, winnerIds: message.winnerIds } }))
          // ghi nhận cho nhiệm vụ / huy hiệu
          recordActivity('battlesPlayed')
          if (user && message.winnerIds.includes(user.id)) recordActivity('battlesWon')
          break
        }
      }
      for (const listener of listeners.current) listener(message)
    },
    [user, setBalance, showToast, t, send, navigate, recordActivity],
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
      .then((data) => setUnread(data.unread))
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

  // bản sao trạng thái trận mới nhất (đọc trong hàm mà không cần đưa vào danh sách phụ thuộc)
  const gameRef = useRef(game)
  gameRef.current = game

  const answer = useCallback(
    (value: string) => {
      const current = gameRef.current
      if (current.myAnswer !== null || !current.question) return
      send({ t: 'game:answer', questionIndex: current.questionIndex, answer: value })
      setGame((latest) => ({ ...latest, myAnswer: value }))
    },
    [send],
  )

  const usePower = useCallback(
    (power: PowerId, targetId?: number) => {
      send({ t: 'game:power', power, targetId })
      setGame((current) => ({ ...current, powersUsed: current.powersUsed + 1 }))
    },
    [send],
  )

  const leaveRoom = useCallback(() => {
    send({ t: 'room:leave' })
    setMyRoom(null)
    setGame(EMPTY_GAME)
  }, [send])

  const subscribe = useCallback((listener: (message: ServerMessage) => void) => {
    listeners.current.add(listener)
    return () => {
      listeners.current.delete(listener)
    }
  }, [])

  const value = useMemo<RealtimeContextValue>(
    () => ({ connected, online, rooms, myRoom, game, unread, setOpenChannel, markChannelRead, send, answer, usePower, leaveRoom, subscribe }),
    [connected, online, rooms, myRoom, game, unread, setOpenChannel, markChannelRead, send, answer, usePower, leaveRoom, subscribe],
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
