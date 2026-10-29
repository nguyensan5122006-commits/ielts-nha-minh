/**
 * grammar-progress.ts — TÍNH TIẾN ĐỘ CỦA TỪNG ĐIỂM NGỮ PHÁP (hàm thuần, không lưu gì)
 * ----------------------------------------------------------------------------
 * Không có kho tiến độ riêng cho khu Ngữ pháp: một bài đã xong khi `progress.lessons[id]`
 * có mục (do trình học ghi bằng completeLessonV3 — xem 03-DATA-LAYER.md). File này chỉ ĐỌC.
 *
 *   topicProgress(topic, progress)     -> { done, total, status, lessons[] }
 *   nextTopicToStudy(topics, progress) -> điểm đầu tiên chưa học xong (hoặc undefined)
 *
 * Chỉ tính các bài có thật trong mục lục nhẹ (lesson-index) — id gõ nhầm sẽ bị bỏ qua
 * thay vì làm hỏng trang.
 * ----------------------------------------------------------------------------
 */
import type { GrammarTopic } from '../../content/grammar/grammar-topics'
import { findLessonSummary, type LessonSummary } from '../../content/lesson-index'
import type { LearningProgress } from '../../learning-progress/progress-types'

export type TopicStatus = 'new' | 'started' | 'done'

export interface TopicLessonState {
  summary: LessonSummary
  done: boolean
  /** độ chính xác tốt nhất 0..1 (chỉ có khi đã làm xong ít nhất 1 lần) */
  bestAccuracy: number | null
}

export interface TopicProgress {
  done: number
  total: number
  status: TopicStatus
  lessons: TopicLessonState[]
}

/** Tiến độ 1 điểm ngữ pháp: bao nhiêu bài đã xong trong các bài dạy điểm đó. */
export function topicProgress(topic: GrammarTopic, progress: LearningProgress): TopicProgress {
  const lessons: TopicLessonState[] = []
  for (const lessonId of topic.lessonIds) {
    const summary = findLessonSummary(lessonId)
    if (!summary) continue
    const record = progress.lessons[lessonId]
    lessons.push({ summary, done: !!record, bestAccuracy: record ? record.bestAccuracy : null })
  }
  const done = lessons.filter((lesson) => lesson.done).length
  const total = lessons.length
  const status: TopicStatus = total > 0 && done === total ? 'done' : done > 0 ? 'started' : 'new'
  return { done, total, status, lessons }
}

/**
 * Điểm nên học tiếp: điểm đầu tiên (theo thứ tự danh sách) chưa xong hết.
 * Ưu tiên điểm đang học dở trước điểm chưa bắt đầu — học tiếp chỗ dở dễ hơn bắt đầu cái mới.
 */
export function nextTopicToStudy(topics: GrammarTopic[], progress: LearningProgress): GrammarTopic | undefined {
  const states = topics.map((topic) => ({ topic, status: topicProgress(topic, progress).status }))
  return states.find((state) => state.status === 'started')?.topic ?? states.find((state) => state.status === 'new')?.topic
}

/** Bài nên mở khi bấm "Học" ở 1 điểm: bài đầu tiên chưa xong, xong hết thì bài đầu tiên. */
export function firstLessonToOpen(state: TopicProgress): string | undefined {
  return (state.lessons.find((lesson) => !lesson.done) ?? state.lessons[0])?.summary.id
}
