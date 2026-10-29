/**
 * exercise-skill.ts — 1 BÀI TẬP LUYỆN KỸ NĂNG NÀO? + ĐOẠN ĐỌC ĐI KÈM
 * ----------------------------------------------------------------------------
 * Thống kê kỹ năng (progress.skillStats) nên ghi theo DẠNG câu chứ không chỉ theo
 * bài: câu "đọc to" trong bài Từ vựng vẫn là luyện NÓI, câu "nghe chọn" là luyện NGHE.
 * ----------------------------------------------------------------------------
 */
import type { Exercise, Lesson, ReadingPassage, SkillName } from '../../../content/content-types'

export function skillOfExercise(exercise: Exercise, lesson: Lesson): SkillName {
  switch (exercise.type) {
    case 'speak-sentence':
    case 'speak-answer':
      return 'speaking'
    case 'write-answer':
      return 'writing'
    case 'listen-choose':
    case 'listen-type':
      return 'listening'
    default:
      return lesson.skill
  }
}

/** Đoạn đọc mà bài tập dựa vào (lesson.readingPassages, theo passageId). */
export function passageOf(lesson: Lesson, exercise: Exercise | undefined): ReadingPassage | undefined {
  if (!exercise?.passageId) return undefined
  return lesson.readingPassages?.find((passage) => passage.id === exercise.passageId)
}
