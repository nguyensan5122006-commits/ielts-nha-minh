/**
 * grammar-return.ts — BÀI NGỮ PHÁP XONG THÌ QUAY VỀ ĐÂU?
 * ----------------------------------------------------------------------------
 * Bài của khu "Ngữ pháp" (lesson.category === 'grammar', id "gr-…") KHÔNG nằm trên lộ trình,
 * nên "Học tiếp" bài kế của lộ trình là lạc chỗ. Người học mở bài từ /grammar/<topicId>
 * -> học xong / thoát thì quay về đúng điểm ngữ pháp đó (không tìm thấy -> /grammar).
 * Bản đồ điểm ngữ pháp -> bài: src/content/grammar/grammar-topics.ts (file nhẹ).
 * Bài thường (không phải grammar) -> null = giữ hành vi cũ (lộ trình /learn).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content/content-types'
import { GRAMMAR_TOPICS } from '../../../content/grammar/grammar-topics'

export function grammarReturnPath(lesson: Pick<Lesson, 'id' | 'category'>): string | null {
  if (lesson.category !== 'grammar') return null
  const topic = GRAMMAR_TOPICS.find((entry) => entry.lessonIds.includes(lesson.id))
  return topic ? `/grammar/${topic.id}` : '/grammar'
}
