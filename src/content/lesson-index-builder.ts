/**
 * lesson-index-builder.ts
 * ----------------------------------------------------------------------------
 * TẠO "MỤC LỤC NHẸ" (generated/lesson-index-data.ts) TỪ NỘI DUNG ĐẦY ĐỦ.
 * Chỉ các script dùng (scripts/generate-lesson-index.ts, scripts/validate-content.ts) —
 * trình duyệt không cần file này. Giải thích mục lục: lesson-index.ts.
 * ----------------------------------------------------------------------------
 */
import type { Lesson, Unit } from './content-types'
import type { LessonSummary } from './lesson-index'
import type { LessonSourceId } from './lesson-sources'

/**
 * Ước lượng số phút khi bài không ghi `estimatedMinutes` (bài cũ Level 1–2):
 * mỗi thẻ dạy ~0,5 phút, mỗi bài tập ~0,45 phút; tối thiểu 3 phút.
 */
export function estimateLessonMinutes(lesson: Lesson): number {
  if (lesson.estimatedMinutes) return lesson.estimatedMinutes
  const minutes = lesson.teachingCards.length * 0.5 + lesson.exercises.length * 0.45
  return Math.max(3, Math.round(minutes))
}

/** Tạo 1 dòng mục lục từ nội dung đầy đủ của bài. */
export function summarizeLesson(lesson: Lesson, source: LessonSourceId, unitId: string | null): LessonSummary {
  return {
    id: lesson.id,
    source,
    unitId,
    skill: lesson.skill,
    mode: lesson.mode ?? 'practice',
    title: { vi: lesson.title.vi, en: lesson.title.en },
    estimatedMinutes: estimateLessonMinutes(lesson),
    exerciseCount: lesson.exercises.length,
    wordCount: lesson.words?.length ?? 0,
  }
}

/**
 * Tạo cả mục lục: duyệt từng nguồn (đã tải sẵn) theo đúng thứ tự, gắn chặng chứa bài.
 * `lessonsBySource` = { 'level-1-beginner/vocabulary-lessons': Lesson[], ... }.
 */
export function buildLessonIndex(lessonsBySource: [LessonSourceId, Lesson[]][], units: Unit[]): LessonSummary[] {
  const unitOfLesson = new Map<string, string>()
  for (const unit of units) for (const id of unit.lessonIds) if (!unitOfLesson.has(id)) unitOfLesson.set(id, unit.id)
  const seen = new Set<string>()
  const index: LessonSummary[] = []
  for (const [source, lessons] of lessonsBySource) {
    for (const lesson of lessons) {
      if (seen.has(lesson.id)) continue // id trùng: validate-content báo lỗi riêng
      seen.add(lesson.id)
      index.push(summarizeLesson(lesson, source, unitOfLesson.get(lesson.id) ?? null))
    }
  }
  return index
}

/** Viết mục lục thành mã TypeScript (mỗi bài 1 dòng — dễ xem khác biệt khi đổi). */
export function renderLessonIndexFile(index: LessonSummary[]): string {
  const lines = index.map((summary) => `  ${JSON.stringify(summary)},`)
  return [
    '/**',
    ' * lesson-index-data.ts — FILE TỰ ĐỘNG TẠO, KHÔNG SỬA TAY.',
    ' * Tạo lại bằng: npm run content:index   (scripts/generate-lesson-index.ts)',
    ' * Giải thích: src/content/lesson-index.ts',
    ' */',
    "import type { LessonSummary } from '../lesson-index'",
    '',
    `/** ${index.length} bài */`,
    'export const LESSON_INDEX_DATA: LessonSummary[] = [',
    ...lines,
    ']',
    '',
  ].join('\n')
}
