/**
 * answer-grading.ts
 * ----------------------------------------------------------------------------
 * CHẤM BÀI cho trình Listening / Reading (hàm thuần).
 *
 * Dùng lại isQuestionCorrect() của src/exam-engine/exam-scoring.ts (cùng luật chấm
 * với phòng thi: choice lưu số thứ tự, TFNG lưu chữ, gap-fill so "dễ tính" bỏ dấu câu).
 * Thêm:
 *   - "gần đúng": sai đúng 1 ký tự (VD Hartigen) -> vẫn tính SAI như IELTS thật,
 *     nhưng giao diện nhắc "kiểm tra chính tả" thay vì để người học nghĩ mình nghe sai.
 *   - thống kê % đúng theo DẠNG câu hỏi (TFNG, matching headings, form…).
 * ----------------------------------------------------------------------------
 */
import type { ExamQuestion } from '../../content/content-types'
import { isQuestionCorrect } from '../../exam-engine/exam-scoring'
import { normalizeAnswer } from '../../services/answer-checking'
import { classifyQuestionType, type QuestionGroup, type QuestionTypeId } from './question-grouping'

export type ExamAnswerMap = Record<string, string>

export interface QuestionResult {
  questionId: string
  number: number
  isCorrect: boolean
  isBlank: boolean
  /** sai 1 ký tự so với đáp án (chỉ câu điền từ) */
  nearMiss: boolean
  /** câu trả lời của người học, dạng chữ để hiển thị */
  userText: string
  /** đáp án đúng, dạng chữ */
  correctText: string
  typeId: QuestionTypeId
}

export interface TypeStat {
  typeId: QuestionTypeId
  correct: number
  total: number
}

export interface GradeSummary {
  results: Record<string, QuestionResult>
  correct: number
  total: number
  /** 0..1 */
  accuracy: number
  byType: TypeStat[]
}

/** Khoảng cách sửa chữ (Levenshtein) — chỉ cần biết có <= 1 hay không. */
function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const saved = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1))
      previous = saved
    }
  }
  return row[b.length]
}

/** Chữ hiển thị của câu trả lời (choice: lấy nguyên phương án, có sẵn nhãn "A. …"). */
export function answerText(question: ExamQuestion, answer: string | undefined): string {
  if (!answer) return ''
  if (question.kind === 'choice') return question.options[Number(answer)] ?? ''
  return answer
}

export function correctAnswerText(question: ExamQuestion): string {
  if (question.kind === 'choice') return question.options[question.correctIndex]
  if (question.kind === 'true-false-not-given') return question.answer
  return question.acceptedAnswers[0]
}

export function gradeQuestion(question: ExamQuestion, answer: string | undefined, typeId: QuestionTypeId): QuestionResult {
  const isBlank = answer === undefined || answer.trim() === ''
  const isCorrect = !isBlank && isQuestionCorrect(question, answer)
  let nearMiss = false
  if (!isCorrect && !isBlank && question.kind === 'gap-fill') {
    const typed = normalizeAnswer(answer!)
    nearMiss = typed.length >= 4 && question.acceptedAnswers.some((accepted) => editDistance(typed, normalizeAnswer(accepted)) === 1)
  }
  return {
    questionId: question.id,
    number: question.number,
    isCorrect,
    isBlank,
    nearMiss,
    userText: answerText(question, answer),
    correctText: correctAnswerText(question),
    typeId,
  }
}

/** Chấm cả bài: kết quả từng câu + tổng + % theo dạng câu hỏi (giữ thứ tự xuất hiện). */
export function gradeAll(groups: QuestionGroup[], answers: ExamAnswerMap): GradeSummary {
  const results: Record<string, QuestionResult> = {}
  const byType = new Map<QuestionTypeId, TypeStat>()
  for (const group of groups) {
    for (const question of group.questions) {
      const typeId = classifyQuestionType(question, group)
      const result = gradeQuestion(question, answers[question.id], typeId)
      results[question.id] = result
      const stat = byType.get(typeId) ?? { typeId, correct: 0, total: 0 }
      stat.total += 1
      if (result.isCorrect) stat.correct += 1
      byType.set(typeId, stat)
    }
  }
  const all = Object.values(results)
  const correct = all.filter((r) => r.isCorrect).length
  return { results, correct, total: all.length, accuracy: all.length ? correct / all.length : 0, byType: [...byType.values()] }
}

/** Câu đã có câu trả lời chưa (dùng cho thanh câu hỏi). */
export const isAnswered = (answers: ExamAnswerMap, questionId: string) => (answers[questionId] ?? '').trim() !== ''
