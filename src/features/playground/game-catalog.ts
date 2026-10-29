/**
 * game-catalog.ts — DANH SÁCH TRÒ CHƠI CỦA SÂN CHƠI (1 chỗ duy nhất)
 * ----------------------------------------------------------------------------
 * Trang /play, trang hồ sơ (kỷ lục) và trang chơi đều đọc từ đây để tên, ảnh 3D, màu
 * và đường dẫn luôn khớp nhau. Chữ (tên, mô tả) vẫn lấy từ ui-text.ts cũ:
 *   t(`game_${id}`) / t(`gameDesc_${id}`)
 * Trò chơi chữ hiện có: Spelling Bee, Nối từ (2 trò dưới đây, có kỷ lục cả nhà)
 * + Thử thách từ mỗi ngày (/daily-word, kiểu Wordle — thẻ riêng trên trang /play).
 * Thêm trò mới: thêm 1 dòng vào MINI_GAMES + tên vào GAMES của functions/api/games/records.ts.
 * ----------------------------------------------------------------------------
 */
import type { ArtPlate } from './components/GameArt'

export type MiniGameId = 'spelling' | 'word-chain'

export interface MiniGameInfo {
  id: MiniGameId
  /** trang chơi */
  soloPath: string
  /** ảnh 3D (public/word-images/<art>.webp) */
  art: string
  /** màu đĩa sau ảnh + màu nhấn thẻ */
  plate: ArtPlate
  accent: string
}

export const MINI_GAMES: MiniGameInfo[] = [
  { id: 'spelling', soloPath: '/games/spelling', art: 'honeybee', plate: 'gold', accent: 'var(--c-gold)' },
  { id: 'word-chain', soloPath: '/games/word-chain', art: 'link', plate: 'primary', accent: 'var(--c-primary)' },
]

export function miniGameInfo(id: string): MiniGameInfo | undefined {
  return MINI_GAMES.find((game) => game.id === id)
}

/** Ảnh 3D của các khu trong sân chơi */
export const PLAY_ART = {
  dailyWord: 'input-latin-letters',
  quests: 'bullseye',
  badges: 'sports-medal',
  leaderboard: 'crown',
  fun: 'rainbow',
  gift: 'wrapped-gift',
} as const
