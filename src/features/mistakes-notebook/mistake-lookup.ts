/**
 * mistake-lookup.ts — TRA THÔNG TIN ĐẦY ĐỦ CHO 1 MỤC TRONG SỔ CÂU SAI
 * ----------------------------------------------------------------------------
 * Sổ lỗi (progress.mistakes) chỉ lưu chữ: câu hỏi, câu trả lời, đáp án, id câu (itemId),
 * id bài/đề chứa nó (parentId). Để NHÓM theo kỹ năng + dạng câu và để LÀM LẠI được,
 * ta tra ngược về nội dung gốc:
 *   - nguồn 'lesson' / 'mini-test' / 'review' -> findExercise(itemId) (bài tập trong bài học)
 *   - nguồn 'exam'                            -> câu hỏi trong ALL_EXAMS (đề thi)
 *   - câu của task Nghe/Đọc (không phải Exercise) -> findQuestionInLesson (nhóm exam-ui)
 *   - không tìm thấy (bài đã đổi)              -> dùng chữ đã lưu, làm lại bằng "tự kiểm tra"
 *
 * File thuần (không React). Bảng tra câu thi được tạo 1 lần khi cần.
 * ----------------------------------------------------------------------------
 */
import { ALL_EXAMS } from '../../content/all-exams'
import type { BilingualText, ExamQuestion, Exercise, Lesson, SkillName } from '../../content/content-types'
import { findExercise, findLesson } from '../../content/content-lookup'
import type { MistakeEntry } from '../../learning-progress/progress-types'
import { findQuestionInLesson } from '../exam-ui/task-question-lookup'
import { retryQuestionFromExamQuestion, retryQuestionFromExercise, retryQuestionFromText, type RetryQuestion } from './exercise-retry/retry-question'

/** Dạng câu hỏi để nhóm trong sổ (10 dạng bài tập + 3 dạng câu thi + "khác"). */
export type QuestionTypeId = Exercise['type'] | 'exam-choice' | 'exam-tfng' | 'exam-gap-fill' | 'other'

export interface MistakeDetails {
  mistake: MistakeEntry
  skill: SkillName
  questionType: QuestionTypeId
  /** câu hỏi để HIỂN THỊ (đã bỏ tiền tố kỹ thuật "[mock-ielts-1 · reading · Q5]") */
  displayQuestion: string
  /** số câu trong đề (câu thi) */
  examQuestionNumber?: number
  /** tên bài học / đề thi chứa câu */
  sourceTitle?: BilingualText
  /** link mở lại bài học (câu trong bài học) */
  lessonId?: string
  /** câu làm lại */
  retry: RetryQuestion
}

/* ---------- bảng tra câu thi: id câu -> câu + kỹ năng + đề ---------- */
interface ExamQuestionLocation {
  question: ExamQuestion
  skill: SkillName
  examTitle: BilingualText
  passageText?: string
}
let examQuestionIndex: Map<string, ExamQuestionLocation> | null = null

function examIndex(): Map<string, ExamQuestionLocation> {
  if (examQuestionIndex) return examQuestionIndex
  examQuestionIndex = new Map()
  for (const exam of ALL_EXAMS) {
    for (const section of exam.sections) {
      for (const part of section.parts ?? []) {
        const passageText = part.passage ? `${part.passage.title}\n\n${part.passage.text}` : undefined
        for (const question of part.questions) {
          // khoá gồm cả id đề để không nhầm nếu 2 đề trùng id câu
          examQuestionIndex.set(`${exam.id}::${question.id}`, { question, skill: section.skill, examTitle: exam.title, passageText })
        }
      }
    }
  }
  return examQuestionIndex
}

/** Câu thi được lưu dạng "[mock-ielts-1 · reading · Q5] prompt" -> tách phần tiền tố. */
const EXAM_PREFIX = /^\[([^\]·]+)·\s*([a-z]+)\s*·\s*Q(\d+)\]\s*/i

const EXAM_KIND_TO_TYPE: Record<ExamQuestion['kind'], QuestionTypeId> = {
  choice: 'exam-choice',
  'true-false-not-given': 'exam-tfng',
  'gap-fill': 'exam-gap-fill',
}

const SKILLS: SkillName[] = ['vocabulary', 'listening', 'reading', 'speaking', 'writing']
const asSkill = (value: string | undefined): SkillName => (SKILLS.includes(value as SkillName) ? (value as SkillName) : 'vocabulary')

/** Tra đầy đủ 1 mục lỗi. Không bao giờ trả về rỗng (luôn làm lại được ít nhất bằng tự kiểm tra). */
export function describeMistake(mistake: MistakeEntry): MistakeDetails {
  // 1) câu thi
  if (mistake.source === 'exam') {
    const prefix = mistake.question.match(EXAM_PREFIX)
    const displayQuestion = prefix ? mistake.question.slice(prefix[0].length) : mistake.question
    const location = examIndex().get(`${mistake.parentId}::${mistake.itemId}`)
    if (location) {
      return {
        mistake,
        skill: location.skill,
        questionType: EXAM_KIND_TO_TYPE[location.question.kind],
        displayQuestion,
        examQuestionNumber: location.question.number,
        sourceTitle: location.examTitle,
        retry: retryQuestionFromExamQuestion(location.question, location.passageText ?? mistake.context),
      }
    }
    return {
      mistake,
      skill: asSkill(prefix?.[2]?.trim()),
      questionType: 'other',
      displayQuestion,
      examQuestionNumber: prefix ? Number(prefix[3]) : undefined,
      retry: retryQuestionFromText(mistake.itemId, displayQuestion, mistake.correctAnswer, mistake.explanation),
    }
  }

  // 2) bài tập trong bài học
  const found = findExercise(mistake.itemId)
  const lesson: Lesson | undefined = found?.lesson ?? findLesson(mistake.parentId)?.lesson
  if (found) {
    return {
      mistake,
      skill: found.lesson.skill,
      questionType: found.exercise.type,
      displayQuestion: mistake.question,
      sourceTitle: found.lesson.title,
      lessonId: found.lesson.id,
      retry: retryQuestionFromExercise(found.exercise),
    }
  }

  // 3) câu của task Nghe/Đọc (trình kỹ năng ghi itemId = id câu hỏi task, parentId = id bài)
  //    -> tra bằng hàm của nhóm exam-ui (REQUESTS.md mục "Gửi nhóm Sổ câu sai / Ôn tập")
  const taskQuestion = lesson ? findQuestionInLesson(lesson, mistake.itemId) : null
  if (taskQuestion) {
    const retry = retryQuestionFromExamQuestion(taskQuestion.question, taskQuestion.skill === 'reading' ? taskQuestion.context : undefined)
    // câu nghe: cho nghe lại đúng đoạn hội thoại (speak() tự đọc nhiều giọng theo "Tên: lời")
    if (taskQuestion.skill === 'listening' && taskQuestion.context) retry.audioText = taskQuestion.context
    return {
      mistake,
      skill: taskQuestion.skill,
      questionType: EXAM_KIND_TO_TYPE[taskQuestion.question.kind],
      displayQuestion: mistake.question,
      sourceTitle: taskQuestion.lesson.title,
      lessonId: taskQuestion.lesson.id,
      retry,
    }
  }

  // 4) không còn bài gốc -> giữ chữ
  return {
    mistake,
    skill: lesson?.skill ?? 'vocabulary',
    questionType: 'other',
    displayQuestion: mistake.question,
    sourceTitle: lesson?.title,
    lessonId: lesson?.id,
    retry: retryQuestionFromText(mistake.itemId, mistake.question, mistake.correctAnswer, mistake.explanation),
  }
}

/** Giây ước tính để làm lại 1 câu (để hiện "khoảng N phút"). */
export function estimateRetryMinutes(count: number): number {
  return Math.max(1, Math.round((count * 35) / 60))
}

/** Thứ tự ưu tiên khi làm lại: câu sai nhiều lần trước, rồi câu cũ nhất (sắp quên nhất). */
export function practiceOrder(a: MistakeDetails, b: MistakeDetails): number {
  return b.mistake.timesWrong - a.mistake.timesWrong || a.mistake.createdAt.localeCompare(b.mistake.createdAt)
}
