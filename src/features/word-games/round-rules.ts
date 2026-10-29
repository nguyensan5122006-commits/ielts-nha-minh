/**
 * round-rules.ts — LUẬT CHƠI CHUNG CỦA "NHÌN ẢNH ĐOÁN TỪ" VÀ "ĐIỀN CHỮ CÒN THIẾU"
 * ----------------------------------------------------------------------------
 * Hàm thuần (không React, không trình duyệt) -> dễ đọc, dễ thử.
 *
 * 1 ván = ROUND_SIZE từ. Mỗi từ là 1 "câu đố" (Puzzle):
 *   - answer       : từ đúng, VD "cat"
 *   - givenMask    : ô nào đã cho sẵn chữ (true) / ô nào người chơi phải điền (false)
 *                    Nhìn ảnh đoán từ: mọi ô đều phải điền. Điền chữ còn thiếu: che 1 phần.
 *   - tiles        : các viên chữ cái để bấm (chữ cần điền + vài chữ "mồi" cho khó hơn), đã xáo
 *
 * 3 độ khó (DIFFICULTY_RULES):
 *   easy   : từ 3–5 chữ, ít chữ mồi, che ~1/3 số chữ
 *   medium : từ 4–7 chữ, thêm chữ mồi, che ~1/2
 *   hard   : từ 6–12 chữ, nhiều chữ mồi, che ~2/3 (có thể che cả chữ đầu)
 *
 * ĐIỂM 1 TỪ (scoreWord):
 *   100 điểm gốc
 *   − 25 mỗi gợi ý đã dùng (tối thiểu còn 25)
 *   ÷ 2 nếu đúng ở lần thử thứ 2
 *   + thưởng chuỗi: 10 × (số từ đúng liền trước đó), tối đa +50
 *   + (chế độ tính giờ) thưởng nhanh: tối đa +50
 *   × hệ số độ khó (dễ 1 · vừa 1.5 · khó 2)
 * Sai cả 2 lần / bỏ qua / hết giờ = 0 điểm, chuỗi về 0.
 * ----------------------------------------------------------------------------
 */
import { createRandom } from '../../game-questions/question-bank'

export type Difficulty = 'easy' | 'medium' | 'hard'

export const ROUND_SIZE = 10
/** Thời gian mỗi từ ở chế độ tính giờ (tuỳ chọn, mặc định tắt) */
export const TIMED_SECONDS = 30
/** Số lần thử mỗi từ (sai lần 1 được thử lại) */
export const MAX_TRIES = 2

export interface DifficultyRule {
  minLength: number
  maxLength: number
  /** số viên chữ "mồi" thêm vào bàn chữ */
  decoyTiles: number
  /** tỉ lệ số chữ bị che (trò Điền chữ còn thiếu) */
  hiddenRatio: number
  /** luôn cho sẵn chữ cái đầu (trò Điền chữ còn thiếu) */
  keepFirstLetter: boolean
  /** hệ số nhân điểm */
  multiplier: number
}

export const DIFFICULTY_RULES: Record<Difficulty, DifficultyRule> = {
  easy: { minLength: 3, maxLength: 5, decoyTiles: 2, hiddenRatio: 0.34, keepFirstLetter: true, multiplier: 1 },
  medium: { minLength: 4, maxLength: 7, decoyTiles: 4, hiddenRatio: 0.5, keepFirstLetter: true, multiplier: 1.5 },
  hard: { minLength: 6, maxLength: 12, decoyTiles: 6, hiddenRatio: 0.67, keepFirstLetter: false, multiplier: 2 },
}

export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

export type PuzzleMode = 'picture' | 'missing'

export interface Puzzle {
  answer: string
  /** true = chữ ở vị trí này đã hiện sẵn */
  givenMask: boolean[]
  /** viên chữ cái để bấm (đã xáo) */
  tiles: string[]
}

/** Chữ hay gặp trong tiếng Anh — dùng làm chữ mồi để trông "thật" hơn chữ hiếm như q, z */
const COMMON_LETTERS = 'eeeaaaooiiinnrrttsslcdmuhpbgfwykv'

/**
 * Chọn vị trí bị che cho trò Điền chữ còn thiếu.
 * - số chữ che = làm tròn(độ dài × tỉ lệ), ít nhất 1, và luôn chừa lại ít nhất 1 chữ hiện
 * - keepFirstLetter: không che chữ đầu
 */
export function chooseHiddenPositions(word: string, rule: DifficultyRule, random: () => number): boolean[] {
  const positions = [...word].map((_, index) => index).filter((index) => !(rule.keepFirstLetter && index === 0))
  const hideCount = Math.min(positions.length, Math.max(1, Math.round(word.length * rule.hiddenRatio)), word.length - 1)
  // xáo vị trí rồi lấy hideCount vị trí đầu
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }
  const hidden = new Set(positions.slice(0, hideCount))
  return [...word].map((_, index) => !hidden.has(index)) // true = cho sẵn
}

/** Tạo 1 câu đố từ 1 từ. Cùng seed -> cùng câu đố. */
export function buildPuzzle(word: string, mode: PuzzleMode, difficulty: Difficulty, seed: number): Puzzle {
  const random = createRandom(seed)
  const rule = DIFFICULTY_RULES[difficulty]
  const givenMask = mode === 'picture' ? [...word].map(() => false) : chooseHiddenPositions(word, rule, random)
  const needed = [...word].filter((_, index) => !givenMask[index])
  const decoys = Array.from({ length: rule.decoyTiles }, () => COMMON_LETTERS[Math.floor(random() * COMMON_LETTERS.length)])
  const tiles = [...needed, ...decoys]
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[tiles[i], tiles[j]] = [tiles[j], tiles[i]]
  }
  return { answer: word, givenMask, tiles }
}

export interface WordScoreInput {
  difficulty: Difficulty
  hintsUsed: number
  /** 1 = đúng ngay, 2 = đúng ở lần thử lại */
  tryNumber: number
  /** số từ đúng liền TRƯỚC từ này */
  streakBefore: number
  /** chế độ tính giờ: phần thời gian còn lại 0..1 (không tính giờ = undefined) */
  timeLeftRatio?: number
}

/** Điểm của 1 từ trả lời ĐÚNG (công thức ở đầu file). */
export function scoreWord(input: WordScoreInput): number {
  let points = Math.max(25, 100 - 25 * input.hintsUsed)
  if (input.tryNumber > 1) points = Math.round(points / 2)
  points += Math.min(50, 10 * input.streakBefore)
  if (input.timeLeftRatio !== undefined) points += Math.round(50 * Math.max(0, Math.min(1, input.timeLeftRatio)))
  return Math.round(points * DIFFICULTY_RULES[input.difficulty].multiplier)
}

/** Kết quả 1 từ trong ván (để màn kết quả liệt kê "từ cần ôn") */
export interface WordOutcome {
  word: string
  meaningVi: string
  imageSlug?: string
  correct: boolean
  points: number
}

/** Tổng kết 1 ván (dùng chung cho mọi trò, kể cả Spelling Bee) */
export interface RoundSummary {
  score: number
  correct: number
  total: number
  bestStreak: number
  words: WordOutcome[]
}
