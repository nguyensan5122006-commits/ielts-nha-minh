/**
 * realtime-protocol.ts
 * ----------------------------------------------------------------------------
 * "NGÔN NGỮ" GIỮA TRÌNH DUYỆT VÀ MÁY CHỦ REALTIME (qua WebSocket).
 * Mỗi tin nhắn là 1 object JSON có trường `t` (type) cho biết loại tin.
 * File này chỉ có KIỂU DỮ LIỆU, dùng chung cho cả 2 phía để không gõ sai tên.
 * Realtime chỉ lo: ai đang online, chat (gửi tin, "đang gõ…", "đã xem").
 *
 *   Trình duyệt -> máy chủ : ClientMessage
 *   Máy chủ -> trình duyệt : ServerMessage
 * ----------------------------------------------------------------------------
 */

export interface ChatMessage {
  id: number
  channel: string
  senderId: number
  kind: 'text' | 'image' | 'sticker' | 'system'
  body: string
  createdAt: string
}

/* ------------------------- trình duyệt -> máy chủ ------------------------ */
export type ClientMessage =
  | { t: 'ping' }
  | { t: 'chat:send'; channel: string; kind: 'text' | 'image' | 'sticker'; body: string }
  | { t: 'chat:typing'; channel: string }
  | { t: 'chat:read'; channel: string; messageId: number }
  | { t: 'chat:share'; text: string } // khoe thành tích vào kênh gia đình

/* ------------------------- máy chủ -> trình duyệt ------------------------ */
export type ServerMessage =
  | { t: 'hello'; userId: number; online: number[] }
  | { t: 'presence'; online: number[] }
  | { t: 'error'; message: string }
  | { t: 'chat:message'; message: ChatMessage }
  | { t: 'chat:typing'; channel: string; userId: number }
  | { t: 'chat:read'; channel: string; userId: number; messageId: number }
