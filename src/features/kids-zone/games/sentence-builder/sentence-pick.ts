/**
 * sentence-pick.ts — CHỌN CÂU + CẮT THÀNH KHỐI CHỮ CHO TRÒ GHÉP CÂU (hàm thuần, không giao diện)
 * ----------------------------------------------------------------------------
 * Mỗi câu hỏi của lượt là 1 TỪ (động cơ chọn theo Leitner). Trò tìm 1 câu có chứa từ đó:
 *   1. Mẫu câu trong kids-sentences.ts (wordIds có từ này) — mẫu ngữ pháp Starters / Movers / Flyers
 *   2. Câu ví dụ của chính từ (word.example) — câu ngắn, dễ
 *   3. Không có cả 2 (8 từ: thứ trong tuần, vài môn thể thao, vài nơi chốn) -> câu dự phòng đơn giản
 *
 * Mức khó (adaptive-difficulty.ts):
 *   1 (dễ)  : chỉ mẫu Starters / câu ví dụ, câu ngắn nhất; gộp từ nhỏ vào khối ("the cat") -> ≤ 5 khối
 *   2 (vừa) : ưu tiên mẫu Starters–Movers, mỗi từ 1 khối
 *   3 (khó) : ưu tiên mẫu khó nhất (tới Flyers), mỗi từ 1 khối + 1 khối "bẫy" (VD is ↔ are)
 * Cùng 1 từ gặp 2 lần trong lượt -> cố chọn câu khác lần trước.
 * Dấu câu dính vào khối cuối (kids-sentences.ts quy ước như vậy).
 * ----------------------------------------------------------------------------
 */
import type { KidsWord, KidsWordLevel } from '../../../../content/content-types'
import { KIDS_SENTENCES } from '../../../../content/kids'
import { topicOfWord } from '../../kids-data/kids-word-bank'
import { bareWord, classOfChunk, tagSentence, type WordClass } from './word-class'

export interface SentenceChoice {
  /** id mẫu câu, hoặc "<wordId>#example" / "<wordId>#fallback" */
  id: string
  en: string
  vi: string
}

/** 1 khối chữ bé bấm được. */
export interface SentenceBlock {
  id: string
  text: string
  /** khối "bẫy" — không thuộc câu */
  isDistractor: boolean
}

/** 1 vị trí trong câu đúng (khối nào đặt vào đây là đúng — so chữ, không phân biệt hoa thường). */
export interface SentenceSlot {
  text: string
  wordClass: WordClass
}

export interface SentenceTask {
  choice: SentenceChoice
  slots: SentenceSlot[]
  /** các khối đã xáo trộn (có thể có 1 khối bẫy) */
  blocks: SentenceBlock[]
}

const LEVEL_RANK: Record<KidsWordLevel, number> = { starters: 1, movers: 2, flyers: 3 }
const MAX_RANK_BY_DIFFICULTY: Record<1 | 2 | 3, number> = { 1: 1, 2: 2, 3: 3 }

/** Câu dự phòng theo chủ đề cho các từ không có câu nào (xem đầu file). */
function fallbackSentence(word: KidsWord): SentenceChoice {
  const topic = topicOfWord(word.id)?.id
  if (topic === 'numbers') return { id: `${word.id}#fallback`, en: `Today is ${word.word}.`, vi: `Hôm nay là ${word.meaningVi}.` }
  if (topic === 'sports') return { id: `${word.id}#fallback`, en: `I like ${word.word}.`, vi: `Mình thích ${word.meaningVi}.` }
  return { id: `${word.id}#fallback`, en: `This is the ${word.word}.`, vi: `Đây là ${word.meaningVi}.` }
}

const tokenCount = (sentence: string) => sentence.trim().split(/\s+/).length

/** Chọn câu cho 1 từ theo mức khó, tránh câu đã dùng trong lượt. */
export function chooseSentence(word: KidsWord, difficulty: 1 | 2 | 3, usedIds: string[]): SentenceChoice {
  const maxRank = MAX_RANK_BY_DIFFICULTY[difficulty]
  type Candidate = SentenceChoice & { rank: number }
  const candidates: Candidate[] = KIDS_SENTENCES.filter((pattern) => pattern.wordIds.includes(word.id)).map((pattern) => ({
    id: pattern.id,
    en: pattern.sentence,
    vi: pattern.meaningVi,
    rank: LEVEL_RANK[pattern.level],
  }))
  if (word.example) candidates.push({ id: `${word.id}#example`, en: word.example.en, vi: word.example.vi, rank: 1 })

  const fitting = candidates.filter((c) => c.rank <= maxRank)
  const pool = (fitting.length ? fitting : candidates).filter((c) => !usedIds.includes(c.id))
  const usable = pool.length ? pool : fitting.length ? fitting : candidates
  if (!usable.length) return fallbackSentence(word)

  const sorted = [...usable].sort((a, b) =>
    difficulty === 1
      ? tokenCount(a.en) - tokenCount(b.en) // dễ: câu ngắn nhất
      : difficulty === 2
        ? b.rank - a.rank || tokenCount(a.en) - tokenCount(b.en) // vừa: mẫu ngữ pháp trước, câu gọn
        : b.rank - a.rank || tokenCount(b.en) - tokenCount(a.en), // khó: mẫu khó nhất, câu dài
  )
  const { id, en, vi } = sorted[0]
  return { id, en, vi }
}

/** Từ nhỏ hay "dính" vào từ phía sau khi gộp khối ở mức dễ: "the cat", "to school", "a red kite"… */
const LEADING_SMALL_WORDS = new Set(['a', 'an', 'the', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'these', 'to', 'some'])

/**
 * Cắt câu thành các khối: mỗi từ 1 khối; mức dễ thì gộp từ nhỏ vào từ phía sau,
 * nếu vẫn > 5 khối thì gộp tiếp các cặp từ cuối câu.
 */
export function splitIntoChunks(sentence: string, difficulty: 1 | 2 | 3): string[][] {
  const tokens = sentence.trim().split(/\s+/)
  let chunks = tokens.map((token) => [token])
  if (difficulty !== 1 || tokens.length <= 4) return chunks

  // 1. gộp từ nhỏ với từ đứng sau
  const merged: string[][] = []
  for (let i = 0; i < chunks.length; i++) {
    const word = bareWord(chunks[i][0]).toLowerCase()
    if (LEADING_SMALL_WORDS.has(word) && i + 1 < chunks.length) {
      merged.push([...chunks[i], ...chunks[i + 1]])
      i++
    } else merged.push(chunks[i])
  }
  chunks = merged
  // 2. còn > 5 khối: gộp 2 khối ngắn nhất kề nhau cho tới khi còn 5
  while (chunks.length > 5) {
    let best = 0
    for (let i = 1; i < chunks.length - 1; i++) if (chunks[i].length + chunks[i + 1].length < chunks[best].length + chunks[best + 1].length) best = i
    chunks.splice(best, 2, [...chunks[best], ...chunks[best + 1]])
  }
  return chunks
}

/** Cặp "bẫy" ngữ pháp cho mức khó: câu có "is" thì thêm khối "are"… */
const GRAMMAR_TRAPS: Record<string, string> = {
  is: 'are',
  are: 'is',
  was: 'were',
  were: 'was',
  has: 'have',
  have: 'has',
  a: 'an',
  an: 'a',
  in: 'on',
  on: 'in',
  under: 'on',
  can: "can't",
  "can't": 'can',
  this: 'these',
  these: 'this',
  do: 'does',
  does: 'do',
  went: 'go',
  bigger: 'biggest',
  taller: 'tallest',
}

function pickTrap(tokens: string[], random: () => number): string | null {
  const lowered = tokens.map((t) => bareWord(t).toLowerCase())
  const options = lowered.map((word) => GRAMMAR_TRAPS[word]).filter((trap): trap is string => !!trap && !lowered.includes(trap))
  if (!options.length) return null
  return options[Math.floor(random() * options.length)]
}

/** Tạo bài ghép câu hoàn chỉnh: các vị trí đúng + các khối đã xáo (không bao giờ xáo ra đúng thứ tự). */
export function buildSentenceTask(choice: SentenceChoice, difficulty: 1 | 2 | 3, random: () => number = Math.random): SentenceTask {
  const chunks = splitIntoChunks(choice.en, difficulty)
  const classes = tagSentence(chunks.flat())
  let cursor = 0
  const slots: SentenceSlot[] = chunks.map((chunk) => {
    const chunkClasses = classes.slice(cursor, cursor + chunk.length)
    cursor += chunk.length
    return { text: chunk.join(' '), wordClass: classOfChunk(chunkClasses) }
  })

  const blocks: SentenceBlock[] = slots.map((slot, index) => ({ id: `b${index}`, text: slot.text, isDistractor: false }))
  if (difficulty === 3) {
    const trap = pickTrap(chunks.flat(), random)
    if (trap) blocks.push({ id: 'trap', text: trap, isDistractor: true })
  }

  let shuffled = shuffle(blocks, random)
  for (let attempt = 0; attempt < 6 && slots.length > 1 && slots.every((slot, i) => sameBlockText(shuffled[i]?.text ?? '', slot.text)); attempt++) {
    shuffled = shuffle(blocks, random)
  }
  return { choice, slots, blocks: shuffled }
}

/** Hai khối cùng chữ (không phân biệt hoa thường: "The" đặt vào chỗ "the" vẫn đúng). */
export const sameBlockText = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
