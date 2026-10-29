/**
 * exam-result-model.ts — ĐỌC 1 KẾT QUẢ ĐÃ LƯU (cũ hay mới) THÀNH DỮ LIỆU ĐỂ VẼ (hàm thuần)
 * ----------------------------------------------------------------------------
 * Kết quả lưu ở /api/exam-results có 2 "đời":
 *   - kết quả CŨ (trang thi v2): chỉ có chữ câu trả lời trong questionReviews, có thể có
 *     cả đề cũ ('level-1-test', 'placement-test'…) — vẫn phải mở được.
 *   - kết quả MỚI (phòng thi v3): thêm answers (giá trị gốc), mode, sectionsTaken…
 * buildResultView() đưa cả 2 về 1 dạng: mỗi phần có band / số câu đúng, mỗi Part có các nhóm câu
 * (buildQuestionGroups) + chấm lại bằng gradeAll để có "% theo dạng câu hỏi" và tô đúng/sai.
 * Kết quả cũ không có answers -> dựng lại từ chữ câu trả lời (choice: tìm lại số thứ tự phương án).
 * ----------------------------------------------------------------------------
 */
import { findExam } from '../../content/all-exams'
import type { Exam, ExamPart, ExamSection } from '../../content/content-types'
import type { ExamAnswers, QuestionReview, SectionResult } from '../../exam-engine/exam-scoring'
import { gradeAll, type GradeSummary, type TypeStat } from '../exam-ui/answer-grading'
import { buildQuestionGroups, type QuestionGroup } from '../exam-ui/question-grouping'
import { isObjectiveSection, partKey } from './exam-catalog'
import type { StoredExamResult } from './exam-grading'
import { cleanInstructions } from './exam-part-content'

export interface ResultPartView {
  key: string
  partIndex: number
  part: ExamPart
  intro: string
  groups: QuestionGroup[]
  grade: GradeSummary
}

export interface ResultSectionView {
  /** chỉ số phần trong đề (-1 nếu đề không còn) */
  index: number
  skill: ExamSection['skill']
  title: string
  band: number | null | undefined
  correct?: number
  total?: number
  aiResults?: SectionResult['aiResults']
  /** chỉ phần tự chấm + đề còn tồn tại */
  parts: ResultPartView[]
}

export interface ResultView {
  exam: Exam | undefined
  result: StoredExamResult
  answers: ExamAnswers
  sections: ResultSectionView[]
  /** % theo dạng câu hỏi gộp các phần Nghe + Đọc (+ Từ vựng) */
  byType: TypeStat[]
  /** kỹ năng nên ưu tiên (band thấp nhất, hoặc % thấp nhất) */
  weakestSkill: ExamSection['skill'] | null
  /** band kế tiếp nên nhắm (chỉ khi có band tổng) */
  nextBand: number | null
}

/** Dựng lại đáp án gốc từ chữ câu trả lời (kết quả cũ). */
export function reconstructAnswers(exam: Exam, reviews: QuestionReview[]): ExamAnswers {
  const answers: ExamAnswers = {}
  const byId = new Map(reviews.map((review) => [review.questionId, review]))
  for (const section of exam.sections) {
    for (const part of section.parts ?? []) {
      for (const question of part.questions) {
        const review = byId.get(question.id)
        if (!review?.userAnswer) continue
        if (question.kind === 'choice') {
          const index = question.options.indexOf(review.userAnswer)
          if (index >= 0) answers[question.id] = String(index)
        } else answers[question.id] = review.userAnswer
      }
    }
  }
  return answers
}

/** Tìm chỉ số phần trong đề cho 1 SectionResult (theo kỹ năng + tên phần). */
function sectionIndexOf(exam: Exam, section: SectionResult, fallback: number): number {
  const exact = exam.sections.findIndex((candidate) => candidate.skill === section.skill && candidate.title === section.title)
  if (exact >= 0) return exact
  const bySkill = exam.sections.findIndex((candidate) => candidate.skill === section.skill)
  return bySkill >= 0 ? bySkill : fallback
}

export function buildResultView(result: StoredExamResult): ResultView {
  const exam = findExam(result.examId)
  const answers = result.answers ?? (exam ? reconstructAnswers(exam, result.questionReviews) : {})
  const typeTotals = new Map<string, TypeStat>()

  const sections: ResultSectionView[] = result.sections.map((section, position) => {
    const index = exam ? sectionIndexOf(exam, section, position) : -1
    const examSection = exam?.sections[index]
    const parts: ResultPartView[] =
      examSection && isObjectiveSection(examSection)
        ? (examSection.parts ?? []).map((part, partIndex) => {
            const { intro, groups } = buildQuestionGroups(cleanInstructions(part.instructions), part.questions)
            const grade = gradeAll(groups, answers)
            for (const stat of grade.byType) {
              const total = typeTotals.get(stat.typeId) ?? { typeId: stat.typeId, correct: 0, total: 0 }
              total.correct += stat.correct
              total.total += stat.total
              typeTotals.set(stat.typeId, total)
            }
            return { key: partKey(index, partIndex), partIndex, part, intro, groups, grade }
          })
        : []
    return { index, skill: section.skill, title: section.title, band: section.band, correct: section.correct, total: section.total, aiResults: section.aiResults, parts }
  })

  // kỹ năng yếu nhất: theo band (thi thử) hoặc theo % đúng (đề ngắn)
  let weakestSkill: ExamSection['skill'] | null = null
  const banded = sections.filter((section) => typeof section.band === 'number')
  if (banded.length > 0) weakestSkill = banded.reduce((low, section) => ((section.band as number) < (low.band as number) ? section : low)).skill
  else {
    const scored = sections.filter((section) => section.total)
    if (scored.length > 0) weakestSkill = scored.reduce((low, section) => ((section.correct ?? 0) / section.total! < (low.correct ?? 0) / low.total! ? section : low)).skill
  }

  const nextBand = typeof result.overallBand === 'number' && result.overallBand < 9 ? result.overallBand + 0.5 : null
  return { exam, result, answers, sections, byType: [...typeTotals.values()], weakestSkill, nextBand }
}

/** Thời gian làm (phút) — kết quả cũ không có. */
export const minutesSpent = (result: StoredExamResult) => (result.timeSpentSeconds ? Math.max(1, Math.round(result.timeSpentSeconds / 60)) : null)

/** Band hiển thị "6.5" (luôn 1 chữ số thập phân). */
export const formatBand = (band: number) => band.toFixed(1)
