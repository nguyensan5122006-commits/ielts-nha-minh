/**
 * word-pool.ts — KHO TỪ CHO 2 TRÒ "NHÌN ẢNH ĐOÁN TỪ" VÀ "ĐIỀN CHỮ CÒN THIẾU"
 * ----------------------------------------------------------------------------
 * Nguyên tắc: ƯU TIÊN TỪ NGƯỜI HỌC ĐÃ GẶP, rồi mới tới từ hợp level.
 *
 *   1. "Đã gặp" (met = true):
 *        - thẻ ôn từ vựng trong tiến độ: progress.srs có key "word:<id>"  -> tra từ bằng findWord(id)
 *        - từ vựng của các bài học đã xong: progress.lessons
 *        - thẻ Học vui đã lật xem (localStorage, readSeenCards)
 *   2. "Hợp level" (met = false):
 *        - từ vựng mọi bài của level đang học (theo track)
 *        - thẻ Học vui (chủ đề có ảnh emoji; bỏ chủ đề quốc gia vì tên nước viết hoa)
 *
 * Mỗi từ có thể có ảnh 3D (public/word-images/<slug>.webp):
 *   - thẻ Học vui: lấy đúng ảnh của emoji trên thẻ (tra catalog.json), không có thì tra theo chữ
 *   - từ trong bài học: tra theo chữ (findWordImage: số ít/số nhiều, từ đồng nghĩa)
 *
 * File này KHÔNG dùng React. Nặng vì import lesson-registry (mọi bài học) -> chỉ dùng
 * trong trang trò chơi (tải lười), đừng import từ trang /play.
 * ----------------------------------------------------------------------------
 */
import { ALL_FUN_TOPICS } from '../../content/all-fun-topics'
import { findWord } from '../../content/content-lookup'
import { findLessonById } from '../../content/lesson-registry'
import { findWordImage, type WordImageCatalog } from '../../content/word-image-catalog'
import { createRandom, levelWordEntries } from './solo-quiz/question-bank'
import type { LearningProgress } from '../../learning-progress/progress-types'
import { readSeenCards } from '../fun-topics/FunFlashcardsPage'
import { DIFFICULTY_RULES, type Difficulty } from './round-rules'

export interface PoolWord {
  /** id gốc của từ (id từ vựng bài học "l1-…" hoặc id thẻ Học vui "fun-…") */
  id: string
  /** chữ thường, chỉ a–z */
  word: string
  meaningVi: string
  /** slug ảnh 3D (đã chắc chắn có file), không có = undefined */
  imageSlug?: string
  /** true = người học đã gặp từ này (bài học / thẻ ôn / Học vui đã xem) */
  met: boolean
  /** key thẻ ôn FSRS nếu từ này đang có thẻ ôn ("word:<id>") — để đưa từ đoán sai vào ôn lại */
  srsKey?: string
}

/** Từ đơn, toàn chữ thường a–z, 3–12 chữ (tên riêng viết hoa như "Vietnam" bị loại) */
const isGameWord = (word: string) => /^[a-z]{3,12}$/.test(word)

/**
 * Gom mọi từ dùng được, không trùng (cùng 1 chữ thì giữ bản "đã gặp" và bản có ảnh).
 * @param catalog  catalog.json của ảnh (để đổi emoji của thẻ Học vui sang ảnh 3D) — không có vẫn chạy
 */
export function buildWordPool(progress: LearningProgress, catalog?: WordImageCatalog): PoolWord[] {
  const byWord = new Map<string, PoolWord>()

  function add(entry: Omit<PoolWord, 'imageSlug'> & { emoji?: string }) {
    if (!isGameWord(entry.word)) return
    const imageSlug = (entry.emoji && catalog ? findWordImage(entry.emoji, catalog) : undefined) ?? findWordImage(entry.word, catalog)
    const existing = byWord.get(entry.word)
    if (!existing) {
      byWord.set(entry.word, { id: entry.id, word: entry.word, meaningVi: entry.meaningVi, imageSlug, met: entry.met, srsKey: entry.srsKey })
      return
    }
    // gộp: "đã gặp" thắng "chưa gặp"; giữ ảnh / thẻ ôn nếu bản kia có
    existing.met ||= entry.met
    existing.imageSlug ??= imageSlug
    existing.srsKey ??= entry.srsKey
  }

  // ---- 1a. thẻ ôn từ vựng (đã học trong bài) ----
  for (const key of Object.keys(progress.srs)) {
    if (!key.startsWith('word:')) continue
    const found = findWord(key.slice('word:'.length))
    if (found) add({ id: found.word.id, word: found.word.word.toLowerCase(), meaningVi: found.word.meaningVi, met: true, srsKey: key })
  }
  // ---- 1b. từ của các bài đã xong ----
  for (const lessonId of Object.keys(progress.lessons)) {
    for (const word of findLessonById(lessonId)?.words ?? []) {
      const srsKey = progress.srs[`word:${word.id}`] ? `word:${word.id}` : undefined
      add({ id: word.id, word: word.word.toLowerCase(), meaningVi: word.meaningVi, met: true, srsKey })
    }
  }
  // ---- 1c + 2b. thẻ Học vui (đã xem = đã gặp) ----
  for (const topic of ALL_FUN_TOPICS) {
    const seen = readSeenCards(topic.id)
    for (const card of topic.cards) {
      if (card.image.kind !== 'emoji') continue // cờ quốc gia: tên nước, không hợp trò này
      add({ id: card.id, word: card.word, meaningVi: card.meaningVi, met: seen.has(card.id), emoji: card.image.value })
    }
  }
  // ---- 2a. từ vựng level đang học ----
  const track = progress.profile.track
  const level = progress.currentLevel[track] ?? 'level-1'
  for (const word of levelWordEntries(level)) {
    add({ id: word.id, word: word.word.toLowerCase(), meaningVi: word.meaningVi, met: false })
  }

  return [...byWord.values()]
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export interface PickOptions {
  difficulty: Difficulty
  /** true = chỉ lấy từ có ảnh 3D (trò Nhìn ảnh đoán từ) */
  needImage: boolean
  count: number
  seed: number
}

/**
 * Chọn từ cho 1 ván:
 *   - lọc theo độ dài hợp độ khó (DIFFICULTY_RULES) (+ phải có ảnh nếu needImage)
 *   - "đã gặp" xếp trước (xáo trộn trong nhóm), rồi tới "hợp level"
 *   - không đủ từ đúng độ dài -> nới ra mọi độ dài (vẫn ưu tiên gần độ dài mong muốn)
 */
export function pickRoundWords(pool: PoolWord[], options: PickOptions): PoolWord[] {
  const random = createRandom(options.seed)
  const rule = DIFFICULTY_RULES[options.difficulty]
  const usable = pool.filter((entry) => !options.needImage || entry.imageSlug)
  const fits = (entry: PoolWord) => entry.word.length >= rule.minLength && entry.word.length <= rule.maxLength

  const ordered = [
    ...shuffle(usable.filter((e) => fits(e) && e.met), random),
    ...shuffle(usable.filter((e) => fits(e) && !e.met), random),
  ]
  if (ordered.length < options.count) {
    // nới: thêm từ khác độ dài, gần khoảng mong muốn trước
    const middle = (rule.minLength + rule.maxLength) / 2
    const extra = shuffle(usable.filter((e) => !fits(e)), random).sort((a, b) => Math.abs(a.word.length - middle) - Math.abs(b.word.length - middle))
    ordered.push(...extra)
  }
  return ordered.slice(0, options.count)
}

/** Đếm từ "đã gặp" dùng được (để màn chọn ván nói "7 từ trong bài học của bạn") */
export function countMetWords(pool: PoolWord[], options: Pick<PickOptions, 'difficulty' | 'needImage'>): number {
  const rule = DIFFICULTY_RULES[options.difficulty]
  return pool.filter((e) => e.met && (!options.needImage || e.imageSlug) && e.word.length >= rule.minLength && e.word.length <= rule.maxLength).length
}
