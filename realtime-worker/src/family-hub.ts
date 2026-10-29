/**
 * family-hub.ts — "PHÒNG SINH HOẠT CHUNG" REALTIME CỦA CẢ NHÀ (Durable Object)
 * ----------------------------------------------------------------------------
 * Durable Object = 1 "máy chủ nhỏ" luôn duy nhất trên Cloudflare, giữ kết nối
 * WebSocket của mọi thành viên đang mở web. Nhờ vậy:
 *   - biết ai đang online
 *   - chat: nhận tin -> lưu vào D1 -> đẩy ngay cho người nhận
 *   - thi đấu trực tiếp: giữ trạng thái các phòng đấu (BattleRoom)
 *
 * Dùng "WebSocket Hibernation": khi không ai làm gì, Object được "ngủ" để
 * không tốn tài nguyên (gói miễn phí); có tin mới thì tự thức dậy.
 * Khi đang có phòng đấu, giữ 1 bộ hẹn giờ nhỏ để Object không ngủ (phòng nằm trong bộ nhớ).
 *
 * Kết nối đến từ API Pages /api/realtime, đã kiểm tra đăng nhập và gắn sẵn
 * header x-user-id / x-user-name / x-user-age-group (worker này không mở ra Internet trực tiếp).
 *
 * (v3) Bé (age_group 'kid') không được cược chuối: tạo phòng thì cược = 0, vào phòng có
 * cược thì tiền cược của bé = 0; thắng thì nhận thưởng cố định (xem battle-room.ts).
 * ----------------------------------------------------------------------------
 */
import { DurableObject } from 'cloudflare:workers'
import { findGameTopic } from '../../src/game-questions/question-bank'
import type { ChatMessage, ClientMessage, PlayerResult, PowerId, RoomSettings, ServerMessage } from '../../src/game-questions/realtime-protocol'
import { consumeInventoryItem, countRewardsSince, getBananaBalance, grantBananas, spendBananas } from '../../backend-helpers/banana-ledger'
import { normalizeAgeGroup, type AgeGroup } from '../../backend-helpers/age-groups'
import { startOfVietnamDaySql } from '../../backend-helpers/vietnam-time'
import { KID_BATTLE_WIN_DAILY_LIMIT } from '../../src/game-economy/banana-rewards'
import { FAMILY_CHANNEL, canAccessChannel } from '../../backend-helpers/chat-queries'
import { BattleRoom, type RoomIO } from './battle-room'

export interface WorkerEnvironment {
  DB: D1Database
  FAMILY_HUB: DurableObjectNamespace
}

interface SocketInfo {
  userId: number
  name: string
  /** (v3) nhóm tuổi; kết nối cũ chưa có trường này -> coi như 'adult' */
  ageGroup?: AgeGroup
}

const isKid = (user: SocketInfo) => normalizeAgeGroup(user.ageGroup) === 'kid'

const MAX_TEXT_LENGTH = 2000
const MAX_IMAGE_BASE64 = 400_000 // ~300KB ảnh sau khi nén
const GAME_NAMES: Record<string, string> = { quiz: 'Đố vui', spelling: 'Spelling Bee', sentence: 'Đua xếp câu', 'word-chain': 'Nối từ' }

export class FamilyHub extends DurableObject<WorkerEnvironment> {
  private rooms = new Map<string, BattleRoom>()
  private roomOfUser = new Map<number, string>()
  private keepAwakeTimer: ReturnType<typeof setInterval> | null = null

  /* ============================ KẾT NỐI ============================ */

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') return new Response('Expected WebSocket', { status: 426 })
    const userId = Number(request.headers.get('x-user-id'))
    const name = decodeURIComponent(request.headers.get('x-user-name') ?? 'Người%20dùng')
    const ageGroup = normalizeAgeGroup(request.headers.get('x-user-age-group'))
    if (!userId) return new Response('Unauthorized', { status: 401 })

    const pair = new WebSocketPair()
    const [client, server] = Object.values(pair)
    // tag "user:<id>" giúp tìm nhanh mọi kết nối của 1 người (1 người có thể mở nhiều tab)
    this.ctx.acceptWebSocket(server, [`user:${userId}`])
    server.serializeAttachment({ userId, name, ageGroup } satisfies SocketInfo)

    this.sendSocket(server, { t: 'hello', userId, online: this.onlineUserIds(), rooms: this.lobbyRooms() })
    this.broadcastAll({ t: 'presence', online: this.onlineUserIds() })
    await this.touchLastActive(userId)
    return new Response(null, { status: 101, webSocket: client })
  }

  async webSocketMessage(socket: WebSocket, raw: string | ArrayBuffer) {
    if (typeof raw !== 'string' || raw.length > MAX_IMAGE_BASE64 + 10_000) return
    const info = socket.deserializeAttachment() as SocketInfo
    let message: ClientMessage
    try {
      message = JSON.parse(raw)
    } catch {
      return
    }
    try {
      await this.handleMessage(info, message)
    } catch (error) {
      this.sendTo(info.userId, { t: 'error', message: 'Lỗi máy chủ: ' + (error as Error).message })
    }
  }

  async webSocketClose(socket: WebSocket) {
    await this.handleDisconnect(socket)
  }

  async webSocketError(socket: WebSocket) {
    await this.handleDisconnect(socket)
  }

  private async handleDisconnect(socket: WebSocket) {
    const info = socket.deserializeAttachment() as SocketInfo | null
    if (!info) return
    const stillConnected = this.ctx.getWebSockets(`user:${info.userId}`).some((ws) => ws !== socket && ws.readyState === WebSocket.OPEN)
    if (!stillConnected) {
      this.leaveRoom(info.userId)
      await this.touchLastActive(info.userId)
    }
    this.broadcastAll({ t: 'presence', online: this.onlineUserIds(socket) })
  }

  /** Ghi lần cuối online. Lỗi ở đây (VD database bận) không được làm hỏng kết nối. */
  private async touchLastActive(userId: number) {
    try {
      await this.env.DB.prepare("UPDATE users SET last_active_at = datetime('now') WHERE id = ?").bind(userId).run()
    } catch {
      /* bỏ qua */
    }
  }

  /* ============================ GỬI TIN ============================ */

  private sendSocket(socket: WebSocket, message: ServerMessage) {
    try {
      socket.send(JSON.stringify(message))
    } catch {
      /* kết nối đã đóng */
    }
  }

  private sendTo(userId: number, message: ServerMessage) {
    for (const socket of this.ctx.getWebSockets(`user:${userId}`)) this.sendSocket(socket, message)
  }

  private broadcastAll(message: ServerMessage) {
    for (const socket of this.ctx.getWebSockets()) this.sendSocket(socket, message)
  }

  /** Danh sách id người đang online (bỏ qua 1 socket đang đóng nếu có). */
  private onlineUserIds(excluding?: WebSocket): number[] {
    const ids = new Set<number>()
    for (const socket of this.ctx.getWebSockets()) {
      if (socket === excluding || socket.readyState !== WebSocket.OPEN) continue
      const info = socket.deserializeAttachment() as SocketInfo | null
      if (info) ids.add(info.userId)
    }
    return [...ids]
  }

  /* ============================ XỬ LÝ TIN ============================ */

  private async handleMessage(user: SocketInfo, message: ClientMessage) {
    switch (message.t) {
      case 'ping':
        return
      case 'chat:send':
        return this.handleChatSend(user, message.channel, message.kind, message.body, message.effect)
      case 'chat:typing':
        if (canAccessChannel(message.channel, user.userId)) {
          this.sendToChannel(message.channel, { t: 'chat:typing', channel: message.channel, userId: user.userId }, user.userId)
        }
        return
      case 'chat:read':
        return this.handleChatRead(user, message.channel, message.messageId)
      case 'chat:share':
        return this.postSystemMessage(user.userId, message.text.slice(0, 200))
      case 'room:create':
        return this.createRoom(user, message.settings, message.invite)
      case 'room:join':
        return this.joinRoom(user, message.roomId)
      case 'room:leave':
        return this.leaveRoom(user.userId)
      case 'room:start': {
        const room = this.currentRoom(user.userId)
        const error = room ? await room.start(user.userId) : 'Bạn không ở trong phòng nào'
        if (error) this.sendTo(user.userId, { t: 'error', message: error })
        return
      }
      case 'game:answer': {
        const error = this.currentRoom(user.userId)?.answer(user.userId, message.questionIndex, message.answer)
        if (error) this.sendTo(user.userId, { t: 'error', message: error })
        return
      }
      case 'game:power': {
        const room = this.currentRoom(user.userId)
        const error = room ? await room.usePower(user.userId, message.power, message.targetId) : 'Bạn không ở trong trận nào'
        if (error) this.sendTo(user.userId, { t: 'error', message: error })
        else this.sendTo(user.userId, { t: 'bananas', balance: await getBananaBalance(this.env.DB, user.userId) })
        return
      }
      case 'game:word':
        this.currentRoom(user.userId)?.submitChainWord(user.userId, message.word)
        return
    }
  }

  /* ------------------------------- CHAT ------------------------------- */

  /** Gửi tin cho những người thuộc kênh (gia đình = tất cả; riêng = 2 người). */
  private sendToChannel(channel: string, message: ServerMessage, exceptUserId?: number) {
    if (channel === FAMILY_CHANNEL) {
      for (const socket of this.ctx.getWebSockets()) {
        const info = socket.deserializeAttachment() as SocketInfo | null
        if (info && info.userId !== exceptUserId) this.sendSocket(socket, message)
      }
      return
    }
    const [, a, b] = channel.split(':').map(Number)
    for (const id of [a, b]) if (id !== exceptUserId) this.sendTo(id, message)
  }

  private async handleChatSend(user: SocketInfo, channel: string, kind: string, body: string, effect?: string) {
    if (!canAccessChannel(channel, user.userId)) return this.sendTo(user.userId, { t: 'error', message: 'Không gửi được vào kênh này' })
    if (!['text', 'image', 'sticker'].includes(kind) || typeof body !== 'string' || !body.trim()) return
    if (kind === 'text' && body.length > MAX_TEXT_LENGTH) return this.sendTo(user.userId, { t: 'error', message: 'Tin nhắn quá dài' })
    if (kind === 'image' && (body.length > MAX_IMAGE_BASE64 || !body.startsWith('data:image/'))) {
      return this.sendTo(user.userId, { t: 'error', message: 'Ảnh quá lớn hoặc không hợp lệ' })
    }
    if (kind === 'sticker' && body.length > 16) return

    // hiệu ứng chat phải mua mới dùng được
    let allowedEffect: string | null = null
    if (effect) {
      const owned = await this.env.DB.prepare('SELECT quantity FROM inventory WHERE user_id = ? AND item_id = ?')
        .bind(user.userId, `effect-${effect}`)
        .first<{ quantity: number }>()
      if (owned?.quantity) allowedEffect = effect
    }

    const row = await this.env.DB.prepare(
      `INSERT INTO chat_messages (channel, sender_id, kind, body, effect) VALUES (?, ?, ?, ?, ?)
       RETURNING id, created_at AS createdAt`,
    )
      .bind(channel, user.userId, kind, body, allowedEffect)
      .first<{ id: number; createdAt: string }>()
    if (!row) return
    const chatMessage: ChatMessage = { id: row.id, channel, senderId: user.userId, kind: kind as ChatMessage['kind'], body, effect: allowedEffect, createdAt: row.createdAt }
    this.sendToChannel(channel, { t: 'chat:message', message: chatMessage })
    // người gửi coi như đã đọc tin của chính mình
    await this.markRead(user.userId, channel, row.id)
  }

  private async markRead(userId: number, channel: string, messageId: number) {
    await this.env.DB.prepare(
      `INSERT INTO chat_reads (user_id, channel, last_read_id) VALUES (?, ?, ?)
       ON CONFLICT(user_id, channel) DO UPDATE SET last_read_id = MAX(last_read_id, excluded.last_read_id)`,
    )
      .bind(userId, channel, messageId)
      .run()
  }

  private async handleChatRead(user: SocketInfo, channel: string, messageId: number) {
    if (!canAccessChannel(channel, user.userId) || !Number.isInteger(messageId)) return
    await this.markRead(user.userId, channel, messageId)
    this.sendToChannel(channel, { t: 'chat:read', channel, userId: user.userId, messageId })
  }

  /** Tin hệ thống trong kênh gia đình (khoe thành tích, kết quả trận...). */
  private async postSystemMessage(userId: number, text: string) {
    if (!text.trim()) return
    const row = await this.env.DB.prepare(
      `INSERT INTO chat_messages (channel, sender_id, kind, body) VALUES (?, ?, 'system', ?) RETURNING id, created_at AS createdAt`,
    )
      .bind(FAMILY_CHANNEL, userId, text)
      .first<{ id: number; createdAt: string }>()
    if (row) {
      this.sendToChannel(FAMILY_CHANNEL, {
        t: 'chat:message',
        message: { id: row.id, channel: FAMILY_CHANNEL, senderId: userId, kind: 'system', body: text, effect: null, createdAt: row.createdAt },
      })
    }
  }

  /* --------------------------- PHÒNG THI ĐẤU --------------------------- */

  private lobbyRooms() {
    return [...this.rooms.values()].filter((room) => room.status === 'lobby').map((room) => room.summary())
  }

  private currentRoom(userId: number): BattleRoom | undefined {
    const roomId = this.roomOfUser.get(userId)
    return roomId ? this.rooms.get(roomId) : undefined
  }

  /** Có phòng thì giữ Object thức (phòng nằm trong bộ nhớ); hết phòng thì cho ngủ. */
  private updateKeepAwake() {
    if (this.rooms.size > 0 && !this.keepAwakeTimer) {
      this.keepAwakeTimer = setInterval(() => {}, 10_000)
    } else if (this.rooms.size === 0 && this.keepAwakeTimer) {
      clearInterval(this.keepAwakeTimer)
      this.keepAwakeTimer = null
    }
  }

  private roomIO(): RoomIO {
    return {
      sendTo: (userId, message) => this.sendTo(userId, message),
      takeBet: async (userId, amount) => {
        const { ok, balance } = await spendBananas(this.env.DB, userId, amount, 'battle-bet')
        this.sendTo(userId, { t: 'bananas', balance })
        return ok
      },
      refundBet: async (userId, amount) => {
        const { balance } = await grantBananas(this.env.DB, userId, amount, 'battle-refund')
        this.sendTo(userId, { t: 'bananas', balance })
      },
      consumePower: (userId, power: PowerId) => consumeInventoryItem(this.env.DB, userId, power),
      finish: (room, ranking, winnerIds) => this.finishBattle(room, ranking, winnerIds),
      roomsChanged: () => this.broadcastAll({ t: 'rooms', rooms: this.lobbyRooms() }),
    }
  }

  private async createRoom(user: SocketInfo, settings: RoomSettings, invite: number[]) {
    this.leaveRoom(user.userId)
    // bé tạo phòng: luôn là phòng chơi vui (cược = 0)
    const bet = isKid(user) ? 0 : Math.max(0, Math.min(500, Math.floor(settings.bet || 0)))
    const balance = await getBananaBalance(this.env.DB, user.userId)
    if (bet > balance) return this.sendTo(user.userId, { t: 'error', message: `Bạn chỉ có ${balance} 🍌, không cược ${bet} được` })
    if (settings.gameType !== 'word-chain' && !findGameTopic(settings.topicId)) return this.sendTo(user.userId, { t: 'error', message: 'Chủ đề không hợp lệ' })

    const safeSettings: RoomSettings = {
      gameType: settings.gameType,
      topicId: settings.topicId,
      questionCount: [5, 10, 20].includes(settings.questionCount) ? settings.questionCount : 10,
      secondsPerQuestion: [5, 10, 15].includes(settings.secondsPerQuestion) ? settings.secondsPerQuestion : 10,
      bet,
    }
    const roomId = crypto.randomUUID().slice(0, 8)
    const room = new BattleRoom(roomId, { id: user.userId, name: user.name, isKid: isKid(user) }, safeSettings, this.roomIO())
    this.rooms.set(roomId, room)
    this.roomOfUser.set(user.userId, roomId)
    this.updateKeepAwake()

    // mời: ai online thì báo ngay, ai offline thì lưu lời thách đấu để báo khi họ vào web
    const online = this.onlineUserIds()
    for (const targetId of [...new Set(invite)].filter((id) => id !== user.userId)) {
      room.invited.add(targetId)
      if (online.includes(targetId)) {
        this.sendTo(targetId, { t: 'room:invite', room: room.summary(), fromName: user.name })
      } else {
        await this.env.DB.prepare('INSERT INTO challenges (from_user, to_user, game_type, topic_id, bet) VALUES (?, ?, ?, ?, ?)')
          .bind(user.userId, targetId, safeSettings.gameType, safeSettings.topicId, bet)
          .run()
      }
    }
    this.sendTo(user.userId, { t: 'room:update', room: room.summary() })
    this.broadcastAll({ t: 'rooms', rooms: this.lobbyRooms() })
  }

  private async joinRoom(user: SocketInfo, roomId: string) {
    const room = this.rooms.get(roomId)
    if (!room) return this.sendTo(user.userId, { t: 'room:closed', roomId, reason: 'Phòng không còn tồn tại' })
    const balance = await getBananaBalance(this.env.DB, user.userId)
    // bé vào phòng có cược vẫn được (tiền cược của bé = 0), người lớn phải đủ chuối
    if (!isKid(user) && room.settings.bet > balance) return this.sendTo(user.userId, { t: 'error', message: `Cần ${room.settings.bet} 🍌 để vào phòng này (bạn có ${balance})` })
    if (this.roomOfUser.get(user.userId) !== roomId) this.leaveRoom(user.userId)
    const error = room.addPlayer(user.userId, user.name, isKid(user))
    if (error) return this.sendTo(user.userId, { t: 'error', message: error })
    this.roomOfUser.set(user.userId, roomId)
  }

  private leaveRoom(userId: number) {
    const room = this.currentRoom(userId)
    this.roomOfUser.delete(userId)
    if (!room) return
    const shouldClose = room.removePlayer(userId)
    if (shouldClose) this.closeRoom(room, 'Chủ phòng đã rời phòng')
  }

  private closeRoom(room: BattleRoom, reason: string) {
    room.dispose()
    for (const player of room.players.values()) {
      this.sendTo(player.id, { t: 'room:closed', roomId: room.id, reason })
      if (this.roomOfUser.get(player.id) === room.id) this.roomOfUser.delete(player.id)
    }
    this.rooms.delete(room.id)
    this.updateKeepAwake()
    this.broadcastAll({ t: 'rooms', rooms: this.lobbyRooms() })
  }

  /** Trận kết thúc: chia chuối, lưu lịch sử, khoe kết quả vào kênh gia đình. */
  private async finishBattle(room: BattleRoom, ranking: PlayerResult[], winnerIds: number[]) {
    for (const result of ranking) {
      if (result.isKid) {
        // bé thắng: thưởng cố định, tối đa KID_BATTLE_WIN_DAILY_LIMIT lần / ngày (hết lượt thì thôi)
        if (result.bananaChange > 0) {
          const usedToday = await countRewardsSince(this.env.DB, result.id, 'kid-battle-win', startOfVietnamDaySql())
          if (usedToday < KID_BATTLE_WIN_DAILY_LIMIT) await grantBananas(this.env.DB, result.id, result.bananaChange, 'kid-battle-win')
          else result.bananaChange = 0
        }
      } else {
        // số chuối nhận lại = phần thắng + tiền cược đã trừ lúc bắt đầu
        const payout = result.bananaChange + room.stakeOf(result.id)
        if (payout > 0) await grantBananas(this.env.DB, result.id, payout, room.potRefunded ? 'battle-refund' : 'battle-win')
      }
      this.sendTo(result.id, { t: 'bananas', balance: await getBananaBalance(this.env.DB, result.id) })
    }
    await this.env.DB.prepare('INSERT INTO battles (game_type, topic_id, bet, result_json, winner_ids, player_ids) VALUES (?, ?, ?, ?, ?, ?)')
      .bind(
        room.settings.gameType,
        room.settings.topicId,
        room.settings.bet,
        JSON.stringify(ranking),
        `,${winnerIds.join(',')},`,
        `,${ranking.map((r) => r.id).join(',')},`,
      )
      .run()

    const winners = ranking.filter((r) => winnerIds.includes(r.id)).map((r) => r.name).join(', ')
    const topic = room.settings.gameType === 'word-chain' ? '' : ` — ${findGameTopic(room.settings.topicId)?.title.vi ?? ''}`
    const prize = room.pot > 0 && !room.potRefunded ? `, ẵm ${room.pot} 🍌` : ''
    await this.postSystemMessage(winnerIds[0] ?? room.hostId, `🏆 ${winners} thắng trận ${GAME_NAMES[room.settings.gameType]}${topic} (${ranking.length} người)${prize}!`)

    // dọn phòng sau 1 phút
    setTimeout(() => {
      if (this.rooms.get(room.id) === room) {
        for (const player of room.players.values()) if (this.roomOfUser.get(player.id) === room.id) this.roomOfUser.delete(player.id)
        this.rooms.delete(room.id)
        this.updateKeepAwake()
      }
    }, 60_000)
  }
}
