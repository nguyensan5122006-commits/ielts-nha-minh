/**
 * lesson-task-recording.ts
 * ----------------------------------------------------------------------------
 * GHI KẾT QUẢ TASK Listening/Reading VÀO TIẾN ĐỘ (qua useProgress — không tự lưu).
 *
 *   const record = useLessonTaskRecorder()
 *   const outcome = record({ lesson, skill: 'reading', groups, summary, explanationOf, contextOf })
 *   -> outcome.band (khoảng band ước tính của task, hoặc null), outcome.mistakes (cho trình học)
 *
 * Làm 3 việc (hợp đồng skill-task-registry mục 3 + 03-DATA-LAYER):
 *   1. recordAnswer(skill, đúng/sai, -, lỗi) cho TỪNG câu -> thống kê kỹ năng + sổ câu sai.
 *      KHÔNG truyền itemKey: thẻ ôn "item:<id>" chỉ tra được bài tập (findExercise), câu task
 *      không phải bài tập -> thẻ sẽ "mồ côi" trong hàng ôn. Sổ câu sai vẫn mở lại được bài
 *      nhờ parentId = id bài học (xem REQUESTS.md).
 *   2. Band ước tính DẠNG KHOẢNG từ điểm thô (bảng quy đổi trong exam-scoring.ts), chỉ cho
 *      bài thuộc chặng IELTS, chặn trần theo level (bài level-3 không thể nói lên band 8–9).
 *   3. updateBandEstimate khi đã có >= 20 câu của kỹ năng (psych-adult D23), trộn với band cũ.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import type { BilingualText, Lesson } from '../../content/content-types'
import { findUnitOfLesson } from '../../content/path-selectors'
import { rawScoreToBand, roundToIeltsBand } from '../../exam-engine/exam-scoring'
import { useProgress } from '../../learning-progress/progress-store'
import type { GradeSummary } from './answer-grading'
import type { QuestionGroup } from './question-grouping'

export interface TaskBand {
  value: number
  low: number
  high: number
}

/** Band trên của level (VD level-3 "4.0 – 6.5" -> 6.5). */
function upperBandOf(bandRange: string): number {
  const numbers = bandRange.match(/[\d.]+/g)?.map(Number) ?? [6.5]
  return Math.max(...numbers)
}

/**
 * Band ước tính của 1 task. null nếu bài không thuộc chặng IELTS (track general không hiện band)
 * hoặc không tra được level.
 */
export function taskBandEstimate(lessonId: string, skill: 'listening' | 'reading', correct: number, total: number): TaskBand | null {
  // quá ít câu đúng (hoặc bỏ trống gần hết) -> chưa đủ dữ liệu để nói band; không hiện "Band 0" làm nản
  if (total <= 0 || correct / total < 0.2) return null
  const located = findUnitOfLesson(lessonId, 'ielts')
  if (!located || !located.unit.tracks.includes('ielts') || located.unit.tracks.includes('general')) return null
  // trần = band trên của level + 0.5 (bài level-3 đúng hết ≈ 7.0, không phải 9.0)
  const cap = upperBandOf(located.level.bandRange) + 0.5
  const value = Math.min(rawScoreToBand(skill, correct, total), cap)
  return { value, low: Math.max(0, value - 0.5), high: Math.min(cap, value + 0.5) }
}

export interface RecordTaskInput {
  lesson: Lesson
  skill: 'listening' | 'reading'
  groups: QuestionGroup[]
  summary: GradeSummary
  /** lời giải theo ngôn ngữ đang chọn */
  explanationOf: (explanation: BilingualText | undefined) => string
  /** đoạn văn / lời thoại liên quan (giúp AI giải thích đúng ngữ cảnh trong sổ câu sai) */
  contextOf?: (questionId: string) => string | undefined
}

export interface RecordedMistake {
  itemId: string
  question: string
  userAnswer: string
  correctAnswer: string
  explanation?: BilingualText
}

export function useLessonTaskRecorder() {
  const { progress, recordAnswer, updateBandEstimate } = useProgress()

  return useCallback(
    ({ lesson, skill, groups, summary, explanationOf, contextOf }: RecordTaskInput): { band: TaskBand | null; mistakes: RecordedMistake[] } => {
      const mistakes: RecordedMistake[] = []
      for (const group of groups) {
        for (const question of group.questions) {
          const result = summary.results[question.id]
          if (!result) continue
          const questionText = `Q${question.number}. ${question.prompt}`
          const mistake = result.isCorrect
            ? undefined
            : {
                source: 'lesson' as const,
                itemId: question.id,
                parentId: lesson.id,
                question: questionText,
                userAnswer: result.userText,
                correctAnswer: result.correctText,
                explanation: explanationOf(question.explanation) || undefined,
                context: contextOf?.(question.id)?.slice(0, 1200),
              }
          recordAnswer(skill, result.isCorrect, undefined, mistake)
          if (!result.isCorrect) mistakes.push({ itemId: question.id, question: questionText, userAnswer: result.userText, correctAnswer: result.correctText, explanation: question.explanation })
        }
      }

      const band = taskBandEstimate(lesson.id, skill, summary.correct, summary.total)
      const answeredAfter = (progress.skillStats[skill]?.answered ?? 0) + summary.total
      if (band && answeredAfter >= 20) {
        const previous = progress.bandEstimates[skill]
        // trộn với band cũ (60% cũ, 40% bài mới) để 1 bài lệch không làm band nhảy
        const middle = previous ? roundToIeltsBand(0.6 * ((previous.low + previous.high) / 2) + 0.4 * band.value) : band.value
        const confidence = answeredAfter >= 120 ? 'high' : answeredAfter >= 60 ? 'medium' : 'low'
        updateBandEstimate(skill, Math.max(0, middle - 0.5), Math.min(9, middle + 0.5), confidence)
      }
      return { band, mistakes }
    },
    [progress, recordAnswer, updateBandEstimate],
  )
}
