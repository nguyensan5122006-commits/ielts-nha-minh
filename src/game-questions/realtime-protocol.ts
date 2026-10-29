/**
 * realtime-protocol.ts
 * ----------------------------------------------------------------------------
 * "NGÔN NGỮ" GIỮA TRÌNH DUYỆT VÀ MÁY CHỦ REALTIME (qua WebSocket).
 * Mỗi tin nhắn là 1 object JSON có trường `t` (type) cho biết loại tin.
 * File này chỉ có KIỂU DỮ LIỆU, dùng chung cho cả 2 phía để không gõ sai tên.
 *
 *   Trình duyệt -> máy chủ : ClientMessage
 *   Máy chủ -> trình duyệt : ServerMessage
 * ----------------------------------------------------------------------------
 */
import type { GameQuestion } from './question-bank'

export type LiveGameType = 'quiz' | 'spelling' | 'sentence' | 'word-chain'
export type PowerId = 'power-freeze' | 'power-shield' | 'power-fifty' | 'power-double' | 'power-time'

export interface RoomSettings {
  gameType: LiveGameType
  topicId: string // chủ đề câu hỏi (word-chain không cần)
  questionCount: 5 | 10 | 20
  secondsPerQuestion: 5 | 10 | 15
  bet: number // số chuối mỗi người cược (0 = chơi vui). Bé (tài khoản kid) luôn cược 0.
}

export interface ChatMessage {
  id: number
  channel: string
  senderId: number
  kind: 'text' | 'image' | 'sticker' | 'system'
  body: string
  effect: string | null
  createdAt: string
}

/** Thông tin phòng gửi cho mọi người (không có đáp án). */
export interface RoomSummary {
  id: string
  hostId: number
  settings: RoomSettings
  status: 'lobby' | 'playing' | 'finished'
  /** isKid: tài khoản bé — không cược chuối (v3) */
  players: { id: number; name: string; score: number; left: boolean; isKid?: boolean }[]
  invited: number[]
}

export interface PlayerResult {
  id: number
  name: string
  score: number
  correctCount: number
  /** Chuối nhận / mất sau trận (bé thắng: phần thưởng cố định KID_BATTLE_WIN_REWARD, không lấy từ hũ) */
  bananaChange: number
  isKid?: boolean
}

/* ------------------------- trình duyệt -> máy chủ ------------------------ */
export type ClientMessage =
  | { t: 'ping' }
  | { t: 'chat:send'; channel: string; kind: 'text' | 'image' | 'sticker'; body: string; effect?: string }
  | { t: 'chat:typing'; channel: string }
  | { t: 'chat:read'; channel: string; messageId: number }
  | { t: 'chat:share'; text: string } // khoe thành tích vào kênh gia đình
  | { t: 'room:create'; settings: RoomSettings; invite: number[] }
  | { t: 'room:join'; roomId: string }
  | { t: 'room:leave' }
  | { t: 'room:start' }
  | { t: 'game:answer'; questionIndex: number; answer: string }
  | { t: 'game:power'; power: PowerId; targetId?: number }
  | { t: 'game:word'; word: string } // Nối từ

/* ------------------------- máy chủ -> trình duyệt ------------------------ */
export type ServerMessage =
  | { t: 'hello'; userId: number; online: number[]; rooms: RoomSummary[] }
  | { t: 'presence'; online: number[] }
  | { t: 'error'; message: string }
  | { t: 'bananas'; balance: number }
  | { t: 'chat:message'; message: ChatMessage }
  | { t: 'chat:typing'; channel: string; userId: number }
  | { t: 'chat:read'; channel: string; userId: number; messageId: number }
  | { t: 'rooms'; rooms: RoomSummary[] } // danh sách phòng đang chờ
  | { t: 'room:update'; room: RoomSummary }
  | { t: 'room:invite'; room: RoomSummary; fromName: string }
  | { t: 'room:closed'; roomId: string; reason: string }
  | { t: 'game:countdown'; startsAt: number }
  | { t: 'game:question'; index: number; total: number; question: GameQuestion; startedAt: number; timeLimitMs: number }
  | {
      t: 'game:reveal'
      index: number
      correctAnswer: string
      correctIndex?: number
      results: Record<number, { correct: boolean; points: number; answer: string }>
      scores: Record<number, number>
    }
  | { t: 'game:power-used'; fromId: number; power: PowerId; targetId?: number; blocked?: boolean }
  | { t: 'game:frozen'; until: number }
  | { t: 'game:fifty'; questionIndex: number; removeIndexes: number[] }
  | { t: 'game:extra-time'; questionIndex: number; extraMs: number }
  | {
      t: 'game:chain-turn'
      playerId: number
      requiredLetter: string
      lastWord: string
      deadline: number
      alive: number[]
      scores: Record<number, number>
      history: { playerId: number; word: string }[]
    }
  | { t: 'game:chain-rejected'; word: string; reason: string }
  | { t: 'game:chain-out'; playerId: number; reason: string }
  | { t: 'game:over'; roomId: string; ranking: PlayerResult[]; pot: number; winnerIds: number[] }
