/**
 * game-catalog.ts — DANH SÁCH TRÒ CHƠI & SỰ KIỆN CỦA SÂN CHƠI (1 chỗ duy nhất)
 * ----------------------------------------------------------------------------
 * Trang /play, trang Đấu trường và phòng đấu đều đọc từ đây để tên, ảnh 3D, màu
 * và đường dẫn luôn khớp nhau. Chữ (tên, mô tả) vẫn lấy từ ui-text.ts cũ:
 *   t(`game_${id}`) / t(`gameDesc_${id}`)
 * ----------------------------------------------------------------------------
 */
import type { LiveGameType } from '../../game-questions/realtime-protocol'
import type { ArtPlate } from './components/GameArt'

export interface MiniGameInfo {
  id: LiveGameType
  /** trang chơi một mình */
  soloPath: string
  /** ảnh 3D (public/word-images/<art>.webp) */
  art: string
  /** màu đĩa sau ảnh + màu nhấn thẻ */
  plate: ArtPlate
  accent: string
}

export const MINI_GAMES: MiniGameInfo[] = [
  { id: 'quiz', soloPath: '/games/quiz', art: 'red-question-mark', plate: 'navy', accent: 'var(--c-navy)' },
  { id: 'spelling', soloPath: '/games/spelling', art: 'honeybee', plate: 'gold', accent: 'var(--c-gold)' },
  { id: 'sentence', soloPath: '/games/sentence', art: 'puzzle-piece', plate: 'success', accent: 'var(--c-success)' },
  { id: 'word-chain', soloPath: '/games/word-chain', art: 'link', plate: 'primary', accent: 'var(--c-primary)' },
]

export function miniGameInfo(id: string): MiniGameInfo | undefined {
  return MINI_GAMES.find((game) => game.id === id)
}

/** Ảnh 3D của 3 sự kiện + đấu trường + các khu khác trong sân chơi */
export const PLAY_ART = {
  arena: 'crossed-swords',
  dailyWord: 'input-latin-letters',
  tournament: 'trophy',
  boss: 'dragon',
  shop: 'shopping-bags',
  quests: 'bullseye',
  badges: 'sports-medal',
  leaderboard: 'crown',
  fun: 'rainbow',
  chat: 'speech-balloon',
  powers: 'high-voltage',
  gift: 'wrapped-gift',
  exams: 'memo',
} as const
