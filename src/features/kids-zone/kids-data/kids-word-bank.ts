/**
 * kids-word-bank.ts
 * ----------------------------------------------------------------------------
 * TRA CỨU NGÂN HÀNG TỪ CỦA KHU TRẺ EM (đọc từ src/content/kids — không sửa nội dung).
 *
 * Các câu hỏi hay gặp khi làm trò chơi:
 *   - Từ có id X là từ nào? Thuộc chủ đề nào?          -> findKidsWord, topicOfWord
 *   - Từ nào có ảnh (dùng được cho trò chọn hình)?      -> hasPicture
 *   - Bé đang học chủ đề nào?                           -> pickActiveTopic
 *   - Đường dẫn ảnh 3D của 1 từ?                        -> wordImageUrl
 * ----------------------------------------------------------------------------
 */
import type { KidsTopic, KidsWord } from '../../../content/content-types'
import { ALL_KIDS_WORDS, KIDS_TOPICS, KIDS_WORD_BY_ID } from '../../../content/kids'
import type { KidsProgress } from '../../../learning-progress/progress-types'

export { ALL_KIDS_WORDS, KIDS_TOPICS }

/** Bảng tra "id từ -> chủ đề chứa nó" (tính 1 lần khi nạp file). */
const TOPIC_BY_WORD_ID: Record<string, KidsTopic> = Object.fromEntries(
  KIDS_TOPICS.flatMap((topic) => topic.words.map((word) => [word.id, topic] as const)),
)

export function findKidsWord(wordId: string): KidsWord | undefined {
  return KIDS_WORD_BY_ID[wordId]
}

export function topicOfWord(wordId: string): KidsTopic | undefined {
  return TOPIC_BY_WORD_ID[wordId]
}

export function findKidsTopic(topicId: string): KidsTopic | undefined {
  return KIDS_TOPICS.find((topic) => topic.id === topicId)
}

/** Từ có ảnh 3D không? (image = '' nghĩa là từ chỉ dùng cho trò chữ) */
export const hasPicture = (word: KidsWord) => word.image !== ''

/** Ảnh Fluent Emoji 3D của từ / chủ đề: public/word-images/<slug>.webp */
export const wordImageUrl = (slug: string) => `/word-images/${slug}.webp`

/**
 * Chủ đề "đang học": chủ đề ĐẦU TIÊN (theo thứ tự bài) còn từ có ảnh mà bé chưa gặp.
 * Thứ tự chủ đề trong KIDS_TOPICS đã xếp từ quen -> lạ, nên đi lần lượt là hợp lý.
 * Bé học hết mọi chủ đề -> trả chủ đề cuối (chỉ còn ôn).
 */
export function pickActiveTopic(kids: KidsProgress, needsPicture = true): KidsTopic {
  const usable = (word: KidsWord) => !needsPicture || hasPicture(word)
  return (
    KIDS_TOPICS.find((topic) => topic.words.some((word) => usable(word) && !kids.words[word.id])) ??
    KIDS_TOPICS[KIDS_TOPICS.length - 1]
  )
}

/** Các chủ đề bé đã bắt đầu (gặp ít nhất 1 từ), theo thứ tự bài. */
export function startedTopics(kids: KidsProgress): KidsTopic[] {
  return KIDS_TOPICS.filter((topic) => topic.words.some((word) => kids.words[word.id]))
}
