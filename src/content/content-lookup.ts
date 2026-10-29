/**
 * content-lookup.ts
 * ----------------------------------------------------------------------------
 * TRA CỨU NHANH nội dung theo id: bài học, bài tập, từ vựng, đoạn đọc.
 * Ví dụ: thẻ ôn tập chỉ lưu "item:l1-vocab-01-ex03" -> cần tìm lại bài tập
 * và bài học chứa nó. Tạo sẵn các "bảng tra" (Map) 1 lần lúc mở app.
 *
 * Nguồn dữ liệu: lesson-registry.ts (mọi bài học) + path-selectors.ts (bài nằm ở chặng nào).
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson, LevelId, ReadingPassage, Unit, VocabularyWord } from './content-types'
import { allLessons, findLessonById } from './lesson-registry'
import { findUnitOfLesson } from './path-selectors'

interface LessonLocation {
  lesson: Lesson
  /** Chặng chứa bài (undefined nếu bài chưa được gắn vào lộ trình) */
  unit?: Unit
  levelId?: LevelId
}

const exercisesById = new Map<string, { exercise: Exercise; lesson: Lesson }>()
const wordsById = new Map<string, { word: VocabularyWord; lesson: Lesson }>()
const passagesById = new Map<string, ReadingPassage>()

for (const lesson of allLessons()) {
  for (const exercise of [...lesson.exercises, ...lesson.miniTest]) exercisesById.set(exercise.id, { exercise, lesson })
  for (const word of lesson.words ?? []) wordsById.set(word.id, { word, lesson })
  for (const passage of lesson.readingPassages ?? []) passagesById.set(passage.id, passage)
}

/** Tìm bài học + chặng/level chứa nó. */
export function findLesson(lessonId: string): LessonLocation | undefined {
  const lesson = findLessonById(lessonId)
  if (!lesson) return undefined
  const location = findUnitOfLesson(lessonId)
  return { lesson, unit: location?.unit, levelId: location?.level.id }
}

export const findExercise = (exerciseId: string) => exercisesById.get(exerciseId)
export const findWord = (wordId: string) => wordsById.get(wordId)
export const findPassage = (passageId: string | undefined) => (passageId ? passagesById.get(passageId) : undefined)

/** Toàn bộ từ vựng (dùng tạo đáp án nhiễu khi ôn tập). */
export const allWords = (): VocabularyWord[] => [...wordsById.values()].map((entry) => entry.word)
