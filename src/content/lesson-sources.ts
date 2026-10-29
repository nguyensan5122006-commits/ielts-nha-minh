/**
 * lesson-sources.ts
 * ----------------------------------------------------------------------------
 * DANH SÁCH "NGUỒN" NỘI DUNG BÀI HỌC — TẢI KHI CẦN (lazy loading).
 *
 * Vì sao có file này?
 *   Toàn bộ nội dung bài học nặng ~2,3 MB. Nếu import thẳng (như lesson-registry.ts)
 *   thì trình duyệt phải tải hết trước khi vẽ trang đầu tiên -> web mở rất chậm.
 *   Ở đây mỗi file bài học là 1 "nguồn", chỉ được tải khi có người mở bài trong đó
 *   (dùng `import()` động — Vite tự cắt mỗi nguồn thành 1 file JS riêng).
 *
 *   key  = đường dẫn file bài học, tính từ src/content/levels/, bỏ đuôi .ts
 *   giá trị = hàm tải file đó và trả về mảng Lesson[]
 *
 * Ai dùng?
 *   - lesson-loader.ts : loadLesson(id) -> xem bài thuộc nguồn nào (lesson-index) -> tải nguồn đó
 *   - scripts/generate-lesson-index.ts : đọc mọi nguồn để tạo bảng mục lục nhẹ (generated/lesson-index.ts)
 *
 * THÊM FILE BÀI MỚI: thêm 1 dòng ở đây (cùng mẫu) + 1 dòng import ở lesson-registry.ts,
 * rồi chạy `npm run content:index`. `npm run validate` sẽ báo nếu quên.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from './content-types'

export const LESSON_SOURCES = {
  // Level 1 (0 – 2.0) — bài cũ
  'level-1-beginner/vocabulary-lessons': () => import('./levels/level-1-beginner/vocabulary-lessons').then((m) => m.level1VocabularyLessons),
  'level-1-beginner/vocabulary-lessons-part2': () => import('./levels/level-1-beginner/vocabulary-lessons-part2').then((m) => m.level1VocabularyLessonsPart2),
  'level-1-beginner/listening-lessons': () => import('./levels/level-1-beginner/listening-lessons').then((m) => m.level1ListeningLessons),
  'level-1-beginner/listening-lessons-part2': () => import('./levels/level-1-beginner/listening-lessons-part2').then((m) => m.level1ListeningLessonsPart2),
  'level-1-beginner/reading-lessons': () => import('./levels/level-1-beginner/reading-lessons').then((m) => m.level1ReadingLessons),
  'level-1-beginner/reading-lessons-part2': () => import('./levels/level-1-beginner/reading-lessons-part2').then((m) => m.level1ReadingLessonsPart2),
  'level-1-beginner/speaking-lessons': () => import('./levels/level-1-beginner/speaking-lessons').then((m) => m.level1SpeakingLessons),
  'level-1-beginner/speaking-lessons-part2': () => import('./levels/level-1-beginner/speaking-lessons-part2').then((m) => m.level1SpeakingLessonsPart2),
  'level-1-beginner/writing-lessons': () => import('./levels/level-1-beginner/writing-lessons').then((m) => m.level1WritingLessons),
  'level-1-beginner/writing-lessons-part2': () => import('./levels/level-1-beginner/writing-lessons-part2').then((m) => m.level1WritingLessonsPart2),

  // Level 2 phần 2.0 – 3.0 — bài cũ "Foundation"
  'level-2-foundation/vocabulary-lessons': () => import('./levels/level-2-foundation/vocabulary-lessons').then((m) => m.level2VocabularyLessons),
  'level-2-foundation/listening-lessons': () => import('./levels/level-2-foundation/listening-lessons').then((m) => m.level2ListeningLessons),
  'level-2-foundation/reading-lessons': () => import('./levels/level-2-foundation/reading-lessons').then((m) => m.level2ReadingLessons),
  'level-2-foundation/speaking-lessons': () => import('./levels/level-2-foundation/speaking-lessons').then((m) => m.level2SpeakingLessons),
  'level-2-foundation/writing-lessons': () => import('./levels/level-2-foundation/writing-lessons').then((m) => m.level2WritingLessons),

  // (v3) Level 2 phần 3.0 – 4.0 — track general
  'level-2-bridge/general/vocabulary-lessons': () => import('./levels/level-2-bridge/general/vocabulary-lessons').then((m) => m.level2BridgeGeneralVocabularyLessons),
  'level-2-bridge/general/listening-lessons': () => import('./levels/level-2-bridge/general/listening-lessons').then((m) => m.level2BridgeGeneralListeningLessons),
  'level-2-bridge/general/reading-lessons': () => import('./levels/level-2-bridge/general/reading-lessons').then((m) => m.level2BridgeGeneralReadingLessons),
  'level-2-bridge/general/speaking-lessons': () => import('./levels/level-2-bridge/general/speaking-lessons').then((m) => m.level2BridgeGeneralSpeakingLessons),
  'level-2-bridge/general/writing-lessons': () => import('./levels/level-2-bridge/general/writing-lessons').then((m) => m.level2BridgeGeneralWritingLessons),

  // (v3) Level 2 phần 3.0 – 4.0 — track ielts
  'level-2-bridge/ielts/listening-lessons': () => import('./levels/level-2-bridge/ielts/listening-lessons').then((m) => m.level2BridgeIeltsListeningLessons),
  'level-2-bridge/ielts/reading-lessons': () => import('./levels/level-2-bridge/ielts/reading-lessons').then((m) => m.level2BridgeIeltsReadingLessons),
  'level-2-bridge/ielts/writing-lessons': () => import('./levels/level-2-bridge/ielts/writing-lessons').then((m) => m.level2BridgeIeltsWritingLessons),
  'level-2-bridge/ielts/speaking-lessons': () => import('./levels/level-2-bridge/ielts/speaking-lessons').then((m) => m.level2BridgeIeltsSpeakingLessons),

  // (v3) Level 3 — track ielts
  'level-3-ielts/listening-reading/listening-lessons': () => import('./levels/level-3-ielts/listening-reading/listening-lessons').then((m) => m.level3IeltsListeningLessons),
  'level-3-ielts/listening-reading/reading-lessons': () => import('./levels/level-3-ielts/listening-reading/reading-lessons').then((m) => m.level3IeltsReadingLessons),
  'level-3-ielts/writing-speaking/writing-lessons': () => import('./levels/level-3-ielts/writing-speaking/writing-lessons').then((m) => m.level3IeltsWritingLessons),
  'level-3-ielts/writing-speaking/speaking-lessons': () => import('./levels/level-3-ielts/writing-speaking/speaking-lessons').then((m) => m.level3IeltsSpeakingLessons),

  // (v3) Level 3 — track general (B1–B2)
  'level-3-general/vocabulary-lessons': () => import('./levels/level-3-general/vocabulary-lessons').then((m) => m.level3GeneralVocabularyLessons),
  'level-3-general/listening-lessons': () => import('./levels/level-3-general/listening-lessons').then((m) => m.level3GeneralListeningLessons),
  'level-3-general/reading-lessons': () => import('./levels/level-3-general/reading-lessons').then((m) => m.level3GeneralReadingLessons),
  'level-3-general/speaking-lessons': () => import('./levels/level-3-general/speaking-lessons').then((m) => m.level3GeneralSpeakingLessons),
  'level-3-general/writing-lessons': () => import('./levels/level-3-general/writing-lessons').then((m) => m.level3GeneralWritingLessons),
} satisfies Record<string, () => Promise<Lesson[]>>

/** Tên 1 nguồn (VD 'level-1-beginner/vocabulary-lessons'). */
export type LessonSourceId = keyof typeof LESSON_SOURCES

export const LESSON_SOURCE_IDS = Object.keys(LESSON_SOURCES) as LessonSourceId[]

export function isLessonSourceId(value: string): value is LessonSourceId {
  return Object.prototype.hasOwnProperty.call(LESSON_SOURCES, value)
}
