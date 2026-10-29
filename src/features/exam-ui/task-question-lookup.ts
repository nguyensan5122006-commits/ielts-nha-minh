/**
 * task-question-lookup.ts
 * ----------------------------------------------------------------------------
 * TRA NGƯỢC 1 CÂU HỎI CỦA TASK NGHE/ĐỌC từ sổ câu sai.
 *
 * Trình Nghe/Đọc ghi lỗi vào sổ với: source 'lesson', itemId = id câu hỏi (VD 'l3-i-read-12-01-q03'),
 * parentId = id bài học. Câu task KHÔNG phải bài tập (Exercise) nên findExercise() không thấy.
 * Nhóm Sổ câu sai / Ôn tập dùng hàm này để lấy lại câu gốc + đoạn văn/lời thoại bằng chứng:
 *
 *   const found = await loadSkillTaskQuestion(mistake.parentId, mistake.itemId)
 *   if (found) { found.question  // ExamQuestion (choice / TFNG / gap-fill)
 *                found.context   // đoạn văn (Reading) hoặc lời thoại của đoạn nghe (Listening)
 *                found.openUrl } // '/reading/<id>' hoặc '/listening/<id>' — mở lại đúng task
 *
 * Tải bài bằng lesson-loader (không kéo toàn bộ nội dung vào gói JS).
 * ----------------------------------------------------------------------------
 */
import type { ExamQuestion, Lesson } from '../../content/content-types'
import { loadLesson } from '../../content/lesson-loader'

export interface SkillTaskQuestionLocation {
  lesson: Lesson
  skill: 'listening' | 'reading'
  question: ExamQuestion
  /** đoạn văn chứa đáp án (Reading) hoặc lời thoại của đoạn nghe (Listening) */
  context: string
  /** đường dẫn mở lại task */
  openUrl: string
}

/** Tìm câu trong 1 bài đã có (đồng bộ). */
export function findQuestionInLesson(lesson: Lesson, questionId: string): SkillTaskQuestionLocation | null {
  if (lesson.readingTask) {
    const question = lesson.readingTask.questions.find((q) => q.id === questionId)
    if (!question) return null
    const paragraph = lesson.readingTask.passage.paragraphs.find((p) => p.label && p.label === question.paragraphLabel)
    return { lesson, skill: 'reading', question, context: paragraph ? `[${paragraph.label}] ${paragraph.text}` : '', openUrl: `/reading/${lesson.id}` }
  }
  if (lesson.listeningTask) {
    const question = lesson.listeningTask.questions.find((q) => q.id === questionId)
    if (!question) return null
    const segment = lesson.listeningTask.segments.find((s) => s.id === question.segmentId)
    const context = segment?.lines.map((line) => (line.speaker ? `${line.speaker}: ${line.text}` : line.text)).join('\n') ?? ''
    return { lesson, skill: 'listening', question, context, openUrl: `/listening/${lesson.id}` }
  }
  return null
}

/** Tải bài (nếu chưa) rồi tìm câu. null = không có (bài đổi / id sai). */
export async function loadSkillTaskQuestion(lessonId: string, questionId: string): Promise<SkillTaskQuestionLocation | null> {
  const lesson = await loadLesson(lessonId).catch(() => undefined)
  return lesson ? findQuestionInLesson(lesson, questionId) : null
}
