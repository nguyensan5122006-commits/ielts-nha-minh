/**
 * family-hub.ts — "PHÒNG SINH HOẠT CHUNG" REALTIME CỦA CẢ NHÀ (Durable Object)
 * ----------------------------------------------------------------------------
 * Durable Object = 1 "máy chủ nhỏ" luôn duy nhất trên Cloudflare, giữ kết nối
 * WebSocket của mọi thành viên đang mở web. Nhờ vậy:
 *   - biết ai đang online
 *   - chat: nhận tin -> lưu vào D1 -> đẩy ngay cho người nhận ("đang gõ…", "đã xem" cũng đi qua đây)
 *
 * Dùng "WebSocket Hibernation": khi không ai làm gì, Object được "ngủ" để
 * không tốn tài nguyên (gói miễn phí); có tin mới thì tự thức dậy.
 *
 * Kết nối đến từ API Pages /api/realtime, đã kiểm tra đăng nhập và gắn sẵn
 * header x-user-id / x-user-name (worker này không mở ra Internet trực tiếp).
 * ----------------------------------------------------------------------------
 */
import { DurableObject } from 'cloudflare:workers'
import type { ChatMessage, ClientMessage, ServerMessage } from '../../src/realtime/realtime-protocol'
import { FAMILY_CHANNEL, canAccessChannel } from '../../backend-helpers/chat-queries'

export interface WorkerEnvironment {
  DB: D1Database
  FAMILY_HUB: DurableObjectNamespace
}

interface SocketInfo {
  userId: number
  name: string
}

const MAX_TEXT_LENGTH = 2000
const MAX_IMAGE_BASE64 = 400_000 // ~300KB ảnh sau khi nén

export class FamilyHub extends DurableObject<WorkerEnvironment> {
  /* ============================ KẾT NỐI ============================ */

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade') !== 'websocket') return new Response('Expected WebSocket', { status: 426 })
    const userId = Number(request.headers.get('x-user-id'))
    const name = decodeURIComponent(request.headers.get('x-user-name') ?? 'Người%20dùng')
    if (!userId) return new Response('Unauthorized', { status: 401 })

    const pair = new WebSocketPair()
    const [client, server] = Object.values(pair)
    // tag "user:<id>" giúp tìm nhanh mọi kết nối của 1 người (1 người có thể mở nhiều tab)
    this.ctx.acceptWebSocket(server, [`user:${userId}`])
    server.serializeAttachment({ userId, name } satisfies SocketInfo)

    this.sendSocket(server, { t: 'hello', userId, online: this.onlineUserIds() })
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
    if (!stillConnected) await this.touchLastActive(info.userId)
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
        return this.handleChatSend(user, message.channel, message.kind, message.body)
      case 'chat:typing':
        if (canAccessChannel(message.channel, user.userId)) {
          this.sendToChannel(message.channel, { t: 'chat:typing', channel: message.channel, userId: user.userId }, user.userId)
        }
        return
      case 'chat:read':
        return this.handleChatRead(user, message.channel, message.messageId)
      case 'chat:share':
        return this.postSystemMessage(user.userId, message.text.slice(0, 200))
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

  private async handleChatSend(user: SocketInfo, channel: string, kind: string, body: string) {
    if (!canAccessChannel(channel, user.userId)) return this.sendTo(user.userId, { t: 'error', message: 'Không gửi được vào kênh này' })
    if (!['text', 'image', 'sticker'].includes(kind) || typeof body !== 'string' || !body.trim()) return
    if (kind === 'text' && body.length > MAX_TEXT_LENGTH) return this.sendTo(user.userId, { t: 'error', message: 'Tin nhắn quá dài' })
    if (kind === 'image' && (body.length > MAX_IMAGE_BASE64 || !body.startsWith('data:image/'))) {
      return this.sendTo(user.userId, { t: 'error', message: 'Ảnh quá lớn hoặc không hợp lệ' })
    }
    if (kind === 'sticker' && body.length > 16) return

    const row = await this.env.DB.prepare(
      `INSERT INTO chat_messages (channel, sender_id, kind, body) VALUES (?, ?, ?, ?)
       RETURNING id, created_at AS createdAt`,
    )
      .bind(channel, user.userId, kind, body)
      .first<{ id: number; createdAt: string }>()
    if (!row) return
    const chatMessage: ChatMessage = { id: row.id, channel, senderId: user.userId, kind: kind as ChatMessage['kind'], body, createdAt: row.createdAt }
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

  /** Tin hệ thống trong kênh gia đình (khoe lên level, huy hiệu mới...). */
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
        message: { id: row.id, channel: FAMILY_CHANNEL, senderId: userId, kind: 'system', body: text, createdAt: row.createdAt },
      })
    }
  }
}
