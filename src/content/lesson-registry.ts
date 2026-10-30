/**
 * lesson-registry.ts
 * ----------------------------------------------------------------------------
 * "SỔ ĐĂNG KÝ" TẤT CẢ BÀI HỌC — tra 1 bài theo id.
 *
 * Lộ trình (all-levels.ts) chỉ lưu DANH SÁCH ID bài trong từng chặng (unit).
 * Muốn lấy nội dung bài -> findLessonById(id). Nhờ vậy 1 bài có thể nằm trong
 * chặng dùng chung cho cả 2 track mà không bị chép 2 lần.
 *
 * Nguồn bài:
 *   - levels/level-1-beginner   : 50 bài cũ Level 1 (id giữ nguyên để tiến độ cũ khớp)
 *   - levels/level-2-foundation : 50 bài cũ Level 2
 *   - (v3) levels/level-2-bridge/{general,ielts} : Level 2 phần 3.0 – 4.0
 *   - (v3) levels/level-3-ielts/{listening-reading,writing-speaking} : Level 3 track IELTS
 *   - (v3) levels/level-3-general : Level 3 track tổng quát (B1–B2)
 *   - (v3) grammar/ : khu "Ngữ pháp" (/grammar) — bài category 'grammar', không nằm trong chặng nào
 *   - (v3) chủ đề từ vựng còn thiếu + cụm động từ / thành ngữ (topic-vocabulary, phrasal-verb, idiom)
 * Thêm thư mục bài mới: import mảng bài ở đây + import chặng (units) ở all-levels.ts.
 * ----------------------------------------------------------------------------
 */
import type { Lesson, VocabularyWord } from './content-types'
// Level 1 (0 – 2.0)
import { level1VocabularyLessons } from './levels/level-1-beginner/vocabulary-lessons'
import { level1ListeningLessons } from './levels/level-1-beginner/listening-lessons'
import { level1ReadingLessons } from './levels/level-1-beginner/reading-lessons'
import { level1SpeakingLessons } from './levels/level-1-beginner/speaking-lessons'
import { level1WritingLessons } from './levels/level-1-beginner/writing-lessons'
import { level1VocabularyLessonsPart2 } from './levels/level-1-beginner/vocabulary-lessons-part2'
import { level1ListeningLessonsPart2 } from './levels/level-1-beginner/listening-lessons-part2'
import { level1ReadingLessonsPart2 } from './levels/level-1-beginner/reading-lessons-part2'
import { level1SpeakingLessonsPart2 } from './levels/level-1-beginner/speaking-lessons-part2'
import { level1WritingLessonsPart2 } from './levels/level-1-beginner/writing-lessons-part2'
// Level 2 phần 2.0 – 3.0 (bài cũ "Foundation")
import { level2VocabularyLessons } from './levels/level-2-foundation/vocabulary-lessons'
import { level2ListeningLessons } from './levels/level-2-foundation/listening-lessons'
import { level2ReadingLessons } from './levels/level-2-foundation/reading-lessons'
import { level2SpeakingLessons } from './levels/level-2-foundation/speaking-lessons'
import { level2WritingLessons } from './levels/level-2-foundation/writing-lessons'
// (v3) Level 2 phần 3.0 – 4.0 — track general
import { level2BridgeGeneralVocabularyLessons } from './levels/level-2-bridge/general/vocabulary-lessons'
import { level2BridgeGeneralListeningLessons } from './levels/level-2-bridge/general/listening-lessons'
import { level2BridgeGeneralReadingLessons } from './levels/level-2-bridge/general/reading-lessons'
import { level2BridgeGeneralSpeakingLessons } from './levels/level-2-bridge/general/speaking-lessons'
import { level2BridgeGeneralWritingLessons } from './levels/level-2-bridge/general/writing-lessons'
// (v3) Level 2 phần 3.0 – 4.0 — track ielts (làm quen dạng đề)
import { level2BridgeIeltsListeningLessons } from './levels/level-2-bridge/ielts/listening-lessons'
import { level2BridgeIeltsReadingLessons } from './levels/level-2-bridge/ielts/reading-lessons'
import { level2BridgeIeltsWritingLessons } from './levels/level-2-bridge/ielts/writing-lessons'
import { level2BridgeIeltsSpeakingLessons } from './levels/level-2-bridge/ielts/speaking-lessons'
// (v3) Level 3 — track ielts
import { level3IeltsListeningLessons } from './levels/level-3-ielts/listening-reading/listening-lessons'
import { level3IeltsReadingLessons } from './levels/level-3-ielts/listening-reading/reading-lessons'
import { level3IeltsWritingLessons } from './levels/level-3-ielts/writing-speaking/writing-lessons'
import { level3IeltsSpeakingLessons } from './levels/level-3-ielts/writing-speaking/speaking-lessons'
// (v3) Level 3 — track general (B1–B2)
import { level3GeneralVocabularyLessons } from './levels/level-3-general/vocabulary-lessons'
import { level3GeneralListeningLessons } from './levels/level-3-general/listening-lessons'
import { level3GeneralReadingLessons } from './levels/level-3-general/reading-lessons'
import { level3GeneralSpeakingLessons } from './levels/level-3-general/speaking-lessons'
import { level3GeneralWritingLessons } from './levels/level-3-general/writing-lessons'
// (v3) Chủ đề từ vựng IELTS còn thiếu + cụm động từ / thành ngữ (track general)
import { level2BridgeGeneralTopicVocabularyLessons } from './levels/level-2-bridge/general/topic-vocabulary-lessons'
import { level2BridgeGeneralPhrasalVerbLessons } from './levels/level-2-bridge/general/phrasal-verb-lessons'
import { level3GeneralTopicVocabularyLessons } from './levels/level-3-general/topic-vocabulary-lessons'
import { level3GeneralIdiomLessons } from './levels/level-3-general/idiom-lessons'
// (v3) Khu "Ngữ pháp" (/grammar) — xem src/content/grammar/grammar-topics.ts
import { level1GrammarLessons } from './grammar/level-1-grammar-lessons'
import { level2GrammarLessons } from './grammar/level-2-grammar-lessons'
import { level2GrammarLessonsPart2 } from './grammar/level-2-grammar-lessons-part2'
import { level3GrammarLessons } from './grammar/level-3-grammar-lessons'
import { level3GrammarLessonsPart2 } from './grammar/level-3-grammar-lessons-part2'
import { level1GrammarLessonsPart2 } from './grammar/level-1-grammar-lessons-part2'
import { level1GrammarLessonsPart3 } from './grammar/level-1-grammar-lessons-part3'
import { level2GrammarLessonsPart3 } from './grammar/level-2-grammar-lessons-part3'
import { level3GrammarLessonsPart3 } from './grammar/level-3-grammar-lessons-part3'
import { grammarLevelTests } from './grammar/grammar-level-tests'

/** Bài cũ của Level 1 + Level 2 (100 bài). */
export const LEGACY_LESSONS: Lesson[] = [
  ...level1VocabularyLessons,
  ...level1VocabularyLessonsPart2,
  ...level1ListeningLessons,
  ...level1ListeningLessonsPart2,
  ...level1ReadingLessons,
  ...level1ReadingLessonsPart2,
  ...level1SpeakingLessons,
  ...level1SpeakingLessonsPart2,
  ...level1WritingLessons,
  ...level1WritingLessonsPart2,
  ...level2VocabularyLessons,
  ...level2ListeningLessons,
  ...level2ReadingLessons,
  ...level2SpeakingLessons,
  ...level2WritingLessons,
]

/** Bài mới của các nhóm nội dung v3. */
export const NEW_CONTENT_LESSONS: Lesson[] = [
  ...level2BridgeGeneralVocabularyLessons,
  ...level2BridgeGeneralListeningLessons,
  ...level2BridgeGeneralReadingLessons,
  ...level2BridgeGeneralSpeakingLessons,
  ...level2BridgeGeneralWritingLessons,
  ...level2BridgeIeltsListeningLessons,
  ...level2BridgeIeltsReadingLessons,
  ...level2BridgeIeltsWritingLessons,
  ...level2BridgeIeltsSpeakingLessons,
  ...level3IeltsListeningLessons,
  ...level3IeltsReadingLessons,
  ...level3IeltsWritingLessons,
  ...level3IeltsSpeakingLessons,
  ...level3GeneralVocabularyLessons,
  ...level3GeneralListeningLessons,
  ...level3GeneralReadingLessons,
  ...level3GeneralSpeakingLessons,
  ...level3GeneralWritingLessons,
  ...level2BridgeGeneralTopicVocabularyLessons,
  ...level2BridgeGeneralPhrasalVerbLessons,
  ...level3GeneralTopicVocabularyLessons,
  ...level3GeneralIdiomLessons,
]

/** (v3) Bài của khu "Ngữ pháp" (/grammar). Mỗi bài có category: 'grammar', track: 'general'. */
export const GRAMMAR_LESSONS: Lesson[] = [
  ...level1GrammarLessons,
  ...level1GrammarLessonsPart2,
  ...level1GrammarLessonsPart3,
  ...level2GrammarLessons,
  ...level2GrammarLessonsPart2,
  ...level2GrammarLessonsPart3,
  ...level3GrammarLessons,
  ...level3GrammarLessonsPart2,
  ...level3GrammarLessonsPart3,
  ...grammarLevelTests,
]

/** Toàn bộ bài học của web. */
export const ALL_LESSONS: Lesson[] = [...LEGACY_LESSONS, ...NEW_CONTENT_LESSONS, ...GRAMMAR_LESSONS]

/* ------------------------- bảng tra (tạo 1 lần) ------------------------- */

const lessonsById = new Map<string, Lesson>()
for (const lesson of ALL_LESSONS) {
  // id trùng: giữ bài đầu tiên (scripts/validate-content.ts sẽ báo lỗi trùng)
  if (!lessonsById.has(lesson.id)) lessonsById.set(lesson.id, lesson)
}

/** Tìm 1 bài theo id. Không có -> undefined. */
export function findLessonById(lessonId: string): Lesson | undefined {
  return lessonsById.get(lessonId)
}

/** Mọi bài học (theo thứ tự trong ALL_LESSONS). */
export function allLessons(): Lesson[] {
  return ALL_LESSONS
}

/** Mọi từ vựng trong mọi bài (dùng cho trò chơi, đáp án nhiễu). */
export function allLessonWords(): VocabularyWord[] {
  return ALL_LESSONS.flatMap((lesson) => lesson.words ?? [])
}
