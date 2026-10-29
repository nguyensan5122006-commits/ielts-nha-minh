/**
 * game-catalog.ts — DANH SÁCH 5 TRÒ CHƠI CHỮ (1 chỗ duy nhất)
 * ----------------------------------------------------------------------------
 * Trang /play, bảng kỷ lục gia đình, trang hồ sơ (kỷ lục) và từng trang chơi đều đọc từ đây
 * để tên, ảnh 3D, màu và đường dẫn luôn khớp nhau.
 *
 *   daily-word       Thử thách từ mỗi ngày (kiểu Wordle)   /daily-word        — không tính điểm, đếm "ngày đoán ra"
 *   picture-word     Nhìn ảnh đoán từ                       /games/picture-word
 *   missing-letters  Điền chữ còn thiếu                     /games/missing-letters
 *   spelling         Spelling Bee (nghe rồi gõ)             /games/spelling
 *   word-chain       Nối từ với máy                         /games/word-chain
 *
 * Thêm trò mới: thêm 1 dòng vào WORD_GAMES + tên vào backend-helpers/word-game-names.ts (máy chủ).
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../../content/content-types'
import type { ArtPlate } from './components/GameArt'

/** Mọi trò chơi chữ */
export type WordGameId = 'daily-word' | 'picture-word' | 'missing-letters' | 'spelling' | 'word-chain'
/** Các trò tính điểm (có kỷ lục điểm) = mọi trò trừ Thử thách từ mỗi ngày */
export type MiniGameId = Exclude<WordGameId, 'daily-word'>

export interface WordGameInfo {
  id: WordGameId
  /** trang chơi */
  path: string
  /** ảnh 3D (public/word-images/<art>.webp) */
  art: string
  /** màu đĩa sau ảnh + màu nhấn thẻ */
  plate: ArtPlate
  accent: string
  title: BilingualText
  /** 1 dòng: chơi thế nào */
  description: BilingualText
  /** luyện kỹ năng gì (chip nhỏ trên thẻ) */
  trains: BilingualText
  /** đơn vị của "điểm" trên bảng kỷ lục */
  unit: BilingualText
}

export const WORD_GAMES: WordGameInfo[] = [
  {
    id: 'daily-word',
    path: '/daily-word',
    art: 'input-latin-letters',
    plate: 'gold',
    accent: 'var(--c-gold)',
    title: { vi: 'Thử thách từ hôm nay', en: "Today's word" },
    description: { vi: 'Cả nhà cùng đoán 1 từ 5 chữ cái, tối đa 6 lượt.', en: 'The whole family guesses one 5-letter word in 6 tries.' },
    trains: { vi: 'Suy luận · chính tả', en: 'Logic · spelling' },
    unit: { vi: 'ngày', en: 'days' },
  },
  {
    id: 'picture-word',
    path: '/games/picture-word',
    art: 'framed-picture',
    plate: 'reading',
    accent: 'var(--skill-reading)',
    title: { vi: 'Nhìn ảnh đoán từ', en: 'Picture to word' },
    description: { vi: 'Nhìn ảnh 3D, ghép chữ cái thành từ tiếng Anh.', en: 'Look at the picture and build the English word.' },
    trains: { vi: 'Nhớ từ · chính tả', en: 'Recall · spelling' },
    unit: { vi: 'điểm', en: 'pts' },
  },
  {
    id: 'missing-letters',
    path: '/games/missing-letters',
    art: 'puzzle-piece',
    plate: 'speaking',
    accent: 'var(--skill-speaking)',
    title: { vi: 'Điền chữ còn thiếu', en: 'Missing letters' },
    description: { vi: 'Từ bị che vài chữ — điền vào cho đủ.', en: 'Some letters are hidden — fill them in.' },
    trains: { vi: 'Chính tả · mặt chữ', en: 'Spelling · word shape' },
    unit: { vi: 'điểm', en: 'pts' },
  },
  {
    id: 'spelling',
    path: '/games/spelling',
    art: 'honeybee',
    plate: 'gold',
    accent: 'var(--c-gold)',
    title: { vi: 'Spelling Bee', en: 'Spelling Bee' },
    description: { vi: 'Nghe máy đọc từ, gõ đúng chính tả.', en: 'Listen to a word and spell it.' },
    trains: { vi: 'Nghe · chính tả', en: 'Listening · spelling' },
    unit: { vi: 'điểm', en: 'pts' },
  },
  {
    id: 'word-chain',
    path: '/games/word-chain',
    art: 'link',
    plate: 'primary',
    accent: 'var(--c-primary)',
    title: { vi: 'Nối từ', en: 'Word chain' },
    description: { vi: 'Từ sau bắt đầu bằng chữ cuối của từ trước.', en: 'Each word starts with the last letter of the one before.' },
    trains: { vi: 'Vốn từ · phản xạ', en: 'Vocabulary · speed' },
    unit: { vi: 'điểm', en: 'pts' },
  },
]

export function wordGameInfo(id: string): WordGameInfo | undefined {
  return WORD_GAMES.find((game) => game.id === id)
}

/* ---------- tên cũ (trang hồ sơ, trang Spelling Bee cũ vẫn gọi) ---------- */

export type MiniGameInfo = WordGameInfo & { id: MiniGameId; soloPath: string }

/** Các trò tính điểm (bỏ Thử thách từ mỗi ngày). `soloPath` = `path` (giữ tên cũ). */
export const MINI_GAMES: MiniGameInfo[] = WORD_GAMES.filter((game): game is WordGameInfo & { id: MiniGameId } => game.id !== 'daily-word').map((game) => ({
  ...game,
  soloPath: game.path,
}))

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
  records: 'trophy',
} as const
