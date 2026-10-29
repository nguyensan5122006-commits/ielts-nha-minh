/**
 * question-bank.ts
 * ----------------------------------------------------------------------------
 * NGÂN HÀNG CÂU HỎI CHO TRÒ CHƠI CHỮ (hiện có: Spelling Bee).
 * Không dùng thứ gì của trình duyệt (window, document...) -> script kiểm tra
 * nội dung (scripts/validate-content.ts) cũng gọi được.
 *
 * 1. Chủ đề (GameTopic): mỗi chủ đề Học vui + từ vựng của từng level + "Tổng hợp".
 * 2. Từ 1 chủ đề, lấy danh sách từ (topicWords) rồi tạo câu hỏi:
 *      Spelling Bee: nghe từ (kèm gợi ý nghĩa tiếng Việt / hình) rồi gõ đúng chính tả.
 * 3. Dùng "seed" (hạt giống ngẫu nhiên): cùng seed -> cùng bộ câu hỏi
 *    (trang chơi dùng seed ngẫu nhiên; kiểm tra "đủ câu chưa" dùng seed cố định).
 * ----------------------------------------------------------------------------
 */
import { ALL_FUN_TOPICS, findFunTopic } from '../content/all-fun-topics'
import { ALL_LEVELS_V3 } from '../content/all-levels'
import type { BilingualText, FunCardImage, Lesson } from '../content/content-types'
import { findLessonById } from '../content/lesson-registry'

export interface GameTopic {
  id: string
  title: BilingualText
  icon: string
  group: 'fun' | 'lessons' | 'mixed'
}

/** 1 câu Spelling Bee: máy đọc `audioText`, người chơi gõ `answer`. */
export interface GameQuestion {
  id: string
  /** câu hỏi hiển thị (gợi ý nghĩa tiếng Việt) */
  prompt: string
  image?: FunCardImage
  /** chữ máy đọc to */
  audioText: string
  /** đáp án đúng (chữ thường) */
  answer: string
}

/** Một "mục từ" chung cho mọi nguồn (thẻ Học vui hoặc từ vựng bài học). */
interface WordEntry {
  id: string
  word: string
  meaningVi: string
  image?: FunCardImage
}

/* ---------------------- số ngẫu nhiên có hạt giống ---------------------- */

/** Thuật toán mulberry32: cùng seed -> cùng dãy số. */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleWith<T>(items: T[], random: () => number): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/* ------------------------------- chủ đề -------------------------------- */

/** Mọi bài học của 1 level v3 (gom từ các chặng của cả 2 track, không trùng). */
function lessonsOfLevel(levelId: string): Lesson[] {
  const level = ALL_LEVELS_V3.find((l) => l.id === levelId)
  const ids = [...new Set((level?.units ?? []).flatMap((unit) => unit.lessonIds))]
  return ids.map(findLessonById).filter((lesson): lesson is Lesson => !!lesson)
}

/** Level đã có bài học (level chưa có nội dung thì không thành chủ đề). */
const levelsWithLessons = () => ALL_LEVELS_V3.filter((level) => lessonsOfLevel(level.id).length > 0)

export function listGameTopics(): GameTopic[] {
  const topics: GameTopic[] = ALL_FUN_TOPICS.map((topic) => ({ id: `fun:${topic.id}`, title: topic.title, icon: topic.icon, group: 'fun' }))
  for (const level of levelsWithLessons()) {
    topics.push({
      id: `level-words:${level.id}`,
      title: { vi: `Từ vựng Level ${level.order}`, en: `Level ${level.order} words` },
      icon: '📚',
      group: 'lessons',
    })
  }
  topics.push({ id: 'mix:all', title: { vi: 'Tổng hợp tất cả', en: 'Everything mixed' }, icon: '🎲', group: 'mixed' })
  return topics
}

function levelWords(levelId: string): WordEntry[] {
  return lessonsOfLevel(levelId).flatMap((lesson) => (lesson.words ?? []).map((w) => ({ id: w.id, word: w.word, meaningVi: w.meaningVi })))
}

/** Danh sách từ của 1 chủ đề ("fun:animals", "level-words:level-1", "mix:all"). */
function topicWords(topicId: string): WordEntry[] {
  const [source, key] = topicId.split(':')
  if (source === 'fun') return findFunTopic(key)?.cards ?? []
  if (source === 'level-words') return levelWords(key)
  // tổng hợp: mọi thẻ Học vui + từ vựng mọi level
  return [...ALL_FUN_TOPICS.flatMap((t) => t.cards), ...ALL_LEVELS_V3.flatMap((l) => levelWords(l.id))]
}

/* --------------------------- tạo câu hỏi --------------------------- */

/** Từ đơn, chỉ chữ cái, 3-12 ký tự — dùng cho Spelling Bee. */
const isSpellableWord = (word: string) => /^[a-zA-Z]{3,12}$/.test(word)

/**
 * TẠO BỘ CÂU SPELLING BEE.
 * @param seed  cùng seed + cùng tham số -> cùng bộ câu hỏi
 */
export function generateSpellingQuestions(topicId: string, count: number, seed: number): GameQuestion[] {
  const random = createRandom(seed)
  const spellable = shuffleWith(
    topicWords(topicId).filter((w) => isSpellableWord(w.word)),
    random,
  ).slice(0, count)
  return spellable.map((entry, index) => ({
    id: `s${index}-${entry.id}`,
    prompt: `Gõ từ bạn nghe được — gợi ý: "${entry.meaningVi}"`,
    audioText: entry.word,
    image: entry.image,
    answer: entry.word.toLowerCase(),
  }))
}

/** Chuẩn hoá để so đáp án gõ: chữ thường, bỏ dấu câu và khoảng trắng thừa. */
export function normalizeTypedAnswer(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Kiểm tra câu trả lời gõ vào. */
export function isGameAnswerCorrect(question: GameQuestion, answer: string): boolean {
  return normalizeTypedAnswer(answer) === normalizeTypedAnswer(question.answer)
}

/**
 * Điểm 1 câu: đúng được 50 điểm + tối đa 50 điểm thưởng tốc độ
 * (trả lời ngay = 100, sát giờ = 50). Sai = 0.
 */
export function pointsForAnswer(isCorrect: boolean, timeUsedMs: number, timeLimitMs: number): number {
  if (!isCorrect) return 0
  const speedRatio = Math.max(0, 1 - timeUsedMs / timeLimitMs)
  return Math.round(50 + 50 * speedRatio)
}
