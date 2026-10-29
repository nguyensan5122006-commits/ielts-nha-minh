/**
 * today-choices.ts
 * ----------------------------------------------------------------------------
 * SẢNH: "CHƠI TIẾP" GỢI Ý GÌ, VÀ 3 LỰA CHỌN HÔM NAY LÀ GÌ (07-KIDS-ZONE mục 2, luật 25).
 *
 *   - "Chơi tiếp": trò chơi được (xoay theo ngày) + chủ đề tự chọn (từ đến hạn + từ mới).
 *   - "Chọn 1 trong 3": 3 thẻ (trò × chủ đề). Chủ đề ưu tiên: có từ đến hạn ôn nhiều nhất,
 *     rồi chủ đề đang học (có từ mới), rồi chủ đề kế tiếp. Trò xoay vòng theo ngày
 *     để mỗi ngày khác nhau một chút. Khi mới có 1 trò, 3 thẻ là 3 chủ đề khác nhau.
 * Hàm thuần — cùng ngày, cùng tiến độ thì ra cùng kết quả (không nhảy lung tung khi vẽ lại).
 * ----------------------------------------------------------------------------
 */
import type { KidsTopic } from '../../../content/content-types'
import { kidsWordsDueToday } from '../../../learning-progress/kids-word-boxes'
import type { KidsProgress } from '../../../learning-progress/progress-types'
import type { KidsGameId } from '../game-engine/engine-types'
import { KIDS_TOPICS, hasPicture, pickActiveTopic, topicOfWord } from '../kids-data/kids-word-bank'

export interface GameChoice {
  gameId: KidsGameId
  /** null = để động cơ tự chọn (từ đến hạn + chủ đề đang học) */
  topic: KidsTopic | null
  /** số từ đến hạn ôn trong lựa chọn này */
  dueCount: number
  /** chủ đề còn từ mới chưa gặp */
  hasNewWords: boolean
}

/** Số thứ tự ngày (để xoay vòng trò theo ngày). */
const dayNumber = (today: string) => Math.floor(new Date(today + 'T12:00:00').getTime() / 86_400_000)

function dueByTopic(kids: KidsProgress, today: string): Map<string, number> {
  const counts = new Map<string, number>()
  for (const wordId of kidsWordsDueToday(kids, today)) {
    const topicId = topicOfWord(wordId)?.id
    if (topicId) counts.set(topicId, (counts.get(topicId) ?? 0) + 1)
  }
  return counts
}

const topicHasNewWords = (kids: KidsProgress, topic: KidsTopic) => topic.words.some((word) => hasPicture(word) && !kids.words[word.id])

/** Nút "Chơi tiếp": trò xoay theo ngày, chủ đề để động cơ tự chọn. */
export function pickContinueChoice(kids: KidsProgress, today: string, readyGames: KidsGameId[]): GameChoice | null {
  if (!readyGames.length) return null
  const dueCount = kidsWordsDueToday(kids, today).length
  return { gameId: readyGames[dayNumber(today) % readyGames.length], topic: null, dueCount, hasNewWords: true }
}

/**
 * 3 lựa chọn hôm nay.
 * @param fits trò này có từ nào hợp với chủ đề không (VD trò Tô màu chỉ tô được đồ vật / con vật,
 *             chủ đề "Gia đình" không có từ nào) — bỏ trống = mọi trò hợp mọi chủ đề.
 */
export function pickTodayChoices(
  kids: KidsProgress,
  today: string,
  readyGames: KidsGameId[],
  fits: (gameId: KidsGameId, topic: KidsTopic) => boolean = () => true,
): GameChoice[] {
  if (!readyGames.length) return []
  const due = dueByTopic(kids, today)
  const active = pickActiveTopic(kids)

  // Xếp chủ đề: nhiều từ đến hạn trước -> chủ đề đang học -> chủ đề kế tiếp có từ mới
  const ordered: KidsTopic[] = []
  const add = (topic: KidsTopic | undefined) => topic && !ordered.includes(topic) && ordered.push(topic)
  ;[...due.entries()].sort((a, b) => b[1] - a[1]).forEach(([topicId]) => add(KIDS_TOPICS.find((t) => t.id === topicId)))
  add(active)
  KIDS_TOPICS.slice(KIDS_TOPICS.indexOf(active) + 1).forEach((topic) => topicHasNewWords(kids, topic) && add(topic))

  const start = dayNumber(today)
  const used = new Set<KidsGameId>()
  return ordered.slice(0, 3).map((topic, index) => {
    // Trò xoay theo ngày; nhưng nếu trò đó không có từ hợp với chủ đề thì lấy trò kế tiếp hợp và chưa dùng.
    // (QA: trước đây thẻ ghi "Nghe lệnh tô màu · Gia đình" với ảnh người, bấm vào lại ra lượt con vật.)
    let gameId = readyGames[(start + index) % readyGames.length]
    for (let step = 0; step < readyGames.length; step++) {
      const candidate = readyGames[(start + index + step) % readyGames.length]
      if (!used.has(candidate) && fits(candidate, topic)) {
        gameId = candidate
        break
      }
    }
    used.add(gameId)
    return { gameId, topic, dueCount: due.get(topic.id) ?? 0, hasNewWords: topicHasNewWords(kids, topic) }
  })
}
