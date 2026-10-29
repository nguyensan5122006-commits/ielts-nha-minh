/**
 * review-queue.ts — DỰNG HÀNG THẺ CHO 1 PHIÊN ÔN + XEM TRƯỚC KHOẢNG ÔN
 * ----------------------------------------------------------------------------
 * Tầng dữ liệu (fsrs-scheduler.ts → dueCards) chỉ trả về "key + thẻ FSRS". File này
 * "gắn nội dung" vào từng thẻ để giao diện vẽ được:
 *   - thẻ 'word:<id>'  -> từ vựng (findWord) => flashcard lật mặt
 *   - thẻ 'item:<id>'  -> bài tập từng làm sai (findExercise) => làm lại như bài tập
 * Thẻ không còn nội dung (bài bị xoá) thì bỏ qua.
 *
 * Thêm vài hàm thuần:
 *   - estimateSessionMinutes(): "12 thẻ ≈ 3 phút" (RemNote: quy số thẻ ra phút)
 *   - previewIntervals(): mỗi nút chấm sẽ hẹn ôn lại sau bao lâu ("10 phút", "3 ngày")
 *   - formatInterval(): đổi mili-giây -> chữ dễ đọc theo ngôn ngữ
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson, SkillName, VocabularyWord } from '../../../content/content-types'
import { findExercise, findWord } from '../../../content/content-lookup'
import { dueCards, reviewCard, type SrsRating } from '../../../learning-progress/fsrs-scheduler'
import type { LearningProgress, SerializedFsrsCard } from '../../../learning-progress/progress-types'

export interface ReviewItem {
  /** key của thẻ trong progress.srs */
  key: string
  card: SerializedFsrsCard
  isNew: boolean
  kind: 'word' | 'item'
  /** thẻ 'word:' */
  word?: VocabularyWord
  /** thẻ 'item:' */
  exercise?: Exercise
  /** bài học chứa từ / bài tập (để biết kỹ năng, mở lại bài) */
  lesson: Lesson
  skill: SkillName
}

/** Gắn nội dung cho 1 key thẻ. undefined = không tìm thấy nội dung. */
export function resolveReviewItem(key: string, card: SerializedFsrsCard, isNew: boolean): ReviewItem | undefined {
  const separator = key.indexOf(':')
  const prefix = key.slice(0, separator)
  const id = key.slice(separator + 1)
  if (prefix === 'word') {
    const found = findWord(id)
    if (!found) return undefined
    return { key, card, isNew, kind: 'word', word: found.word, lesson: found.lesson, skill: 'vocabulary' }
  }
  if (prefix === 'item') {
    const found = findExercise(id)
    if (!found) return undefined
    return { key, card, isNew, kind: 'item', exercise: found.exercise, lesson: found.lesson, skill: found.lesson.skill }
  }
  return undefined
}

/**
 * Hàng thẻ của phiên ôn BÂY GIỜ (đã áp giới hạn ngày + nợ ôn của tầng dữ liệu).
 * @param onlyKeys chỉ ôn các thẻ này (VD bấm "Ôn ngay" trên 1 thẻ ở Sổ từ vựng)
 */
export function buildReviewQueue(progress: LearningProgress, now = new Date(), onlyKeys?: string[]): ReviewItem[] {
  if (onlyKeys?.length) {
    return onlyKeys
      .map((key) => (progress.srs[key] ? resolveReviewItem(key, progress.srs[key], progress.srs[key].state === 0) : undefined))
      .filter((item): item is ReviewItem => !!item)
  }
  const items = dueCards(progress, now)
    .map((entry) => resolveReviewItem(entry.key, entry.card, entry.isNew))
    .filter((item): item is ReviewItem => !!item)
  return interleaveKinds(items)
}

/**
 * Trộn thẻ từ và câu từng sai: cứ 2 thẻ từ thì 1 câu (giữ nguyên thứ tự ưu tiên trong từng loại).
 * Phiên ôn "trộn" giúp nhớ tốt hơn và đỡ chán (psych-adult D3 luật 12), và không dồn hết bài tập lên đầu.
 */
function interleaveKinds(items: ReviewItem[]): ReviewItem[] {
  const words = items.filter((item) => item.kind === 'word')
  const exercises = items.filter((item) => item.kind === 'item')
  const mixed: ReviewItem[] = []
  while (words.length || exercises.length) {
    mixed.push(...words.splice(0, 2))
    mixed.push(...exercises.splice(0, 1))
  }
  return mixed
}

/* ============================================================================
 * THỜI LƯỢNG PHIÊN — số thẻ quy ra phút
 * ========================================================================== */

/** Giây trung bình cho 1 thẻ (đo nhẩm: lật + nhớ + chấm). Thẻ bài tập lâu hơn vì phải làm lại. */
const SECONDS_PER_WORD_CARD = 12
const SECONDS_PER_ITEM_CARD = 30

export function estimateSessionMinutes(items: Pick<ReviewItem, 'kind'>[]): number {
  const seconds = items.reduce((total, item) => total + (item.kind === 'word' ? SECONDS_PER_WORD_CARD : SECONDS_PER_ITEM_CARD), 0)
  return Math.max(1, Math.round(seconds / 60))
}

/* ============================================================================
 * XEM TRƯỚC: bấm nút này thì bao lâu nữa gặp lại?
 * ========================================================================== */

/**
 * Chạy thử thuật toán (không lưu gì) cho từng mức chấm -> số mili-giây tới lần ôn sau.
 * reviewCard() là hàm thuần nên gọi thử thoải mái.
 */
export function previewIntervals(card: SerializedFsrsCard, key: string, ratings: SrsRating[], now = new Date()): Record<SrsRating, number> {
  const result = { again: 0, hard: 0, good: 0, easy: 0 } as Record<SrsRating, number>
  for (const rating of ratings) {
    const next = reviewCard(card, rating, key, now)
    result[rating] = Math.max(0, new Date(next.due).getTime() - now.getTime())
  }
  return result
}

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

/** Đổi khoảng thời gian thành chữ ngắn: "1 phút", "10 phút", "5 giờ", "3 ngày", "2 tháng", "1 năm". */
export function formatInterval(ms: number, language: 'vi' | 'en'): string {
  const vi = language === 'vi'
  const unit = (value: number, viWord: string, enWord: string) => (vi ? `${value} ${viWord}` : `${value} ${enWord}${value === 1 ? '' : 's'}`)
  if (ms < HOUR) return unit(Math.max(1, Math.round(ms / MINUTE)), 'phút', 'min')
  if (ms < DAY) return unit(Math.round(ms / HOUR), 'giờ', 'hour')
  const days = Math.round(ms / DAY)
  if (days < 31) return unit(days, 'ngày', 'day')
  if (days < 365) return unit(Math.round(days / 30), 'tháng', 'month')
  return unit(Math.round((days / 365) * 10) / 10, 'năm', 'year')
}

/** "khoảng 24 giờ", "khoảng 3 ngày" — dùng ở màn kết thúc phiên (Seneca). */
export function formatApproxInterval(ms: number, language: 'vi' | 'en'): string {
  return (language === 'vi' ? 'khoảng ' : 'about ') + formatInterval(ms, language)
}
