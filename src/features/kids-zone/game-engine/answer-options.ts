/**
 * answer-options.ts
 * ----------------------------------------------------------------------------
 * CHỌN ĐÁP ÁN NHIỄU cho câu trắc nghiệm (3–4 đáp án, luật 11: không quá 4).
 *
 * Thứ tự ưu tiên khi chọn đáp án sai:
 *   1. Tối đa 1 từ VỪA GẶP trong lượt này ("từ vừa học thành đáp án nhiễu ở câu sau")
 *      -> bé phải phân biệt từ mới với từ cũ, không chỉ nhận ra hình quen.
 *   2. Từ CÙNG CHỦ ĐỀ với đáp án đúng (khó hơn chút: con vật với con vật).
 *   3. Từ khác trong kho.
 * Mức khó 3: thêm ưu tiên từ "dễ nhầm" (cùng chữ cái đầu / dài gần bằng).
 * Không bao giờ có 2 đáp án cùng ảnh hoặc cùng chữ.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../content/content-types'
import { topicOfWord } from '../kids-data/kids-word-bank'
import { shuffle } from './round-builder'

export interface PickOptionsInput {
  target: KidsWord
  pool: KidsWord[]
  /** 3 hoặc 4 (tính cả đáp án đúng) */
  count: number
  /** Id các từ bé vừa gặp trong lượt (mới nhất ở cuối) */
  recentWordIds: string[]
  /** true = ưu tiên từ dễ nhầm (mức khó 3) */
  preferLookAlike?: boolean
  random?: () => number
}

/** Hai từ "dễ nhầm" khi nghe: cùng chữ cái đầu, hoặc độ dài chênh ≤ 1. */
const looksAlike = (a: KidsWord, b: KidsWord) =>
  a.word[0]?.toLowerCase() === b.word[0]?.toLowerCase() || Math.abs(a.word.length - b.word.length) <= 1

/** Trả về các đáp án (đã xáo, có đáp án đúng ở vị trí ngẫu nhiên). */
export function pickAnswerOptions({ target, pool, count, recentWordIds, preferLookAlike = false, random = Math.random }: PickOptionsInput): KidsWord[] {
  const targetTopic = topicOfWord(target.id)?.id
  const candidates = pool.filter(
    (word) => word.id !== target.id && word.image !== target.image && word.word.toLowerCase() !== target.word.toLowerCase(),
  )

  const chosen: KidsWord[] = []
  const take = (word: KidsWord | undefined) => {
    if (word && chosen.length < count - 1 && !chosen.some((c) => c.id === word.id || c.image === word.image)) chosen.push(word)
  }

  // 1. Một từ vừa gặp gần nhất trong lượt (không phải chính đáp án)
  const recent = [...recentWordIds].reverse().find((id) => id !== target.id && candidates.some((c) => c.id === id))
  take(candidates.find((c) => c.id === recent))

  // 2 + 3. Cùng chủ đề trước, rồi phần còn lại; mỗi nhóm xáo ngẫu nhiên
  const sameTopic = shuffle(
    candidates.filter((c) => topicOfWord(c.id)?.id === targetTopic),
    random,
  )
  const otherTopics = shuffle(
    candidates.filter((c) => topicOfWord(c.id)?.id !== targetTopic),
    random,
  )
  const ordered = [...sameTopic, ...otherTopics]
  if (preferLookAlike) ordered.sort((a, b) => Number(looksAlike(b, target)) - Number(looksAlike(a, target)))
  ordered.forEach(take)

  return shuffle([target, ...chosen], random)
}
