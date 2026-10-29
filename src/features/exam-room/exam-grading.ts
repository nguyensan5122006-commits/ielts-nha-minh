/**
 * exam-grading.ts — CHẤM 1 LẦN LÀM ĐỀ + DỰNG KẾT QUẢ ĐỂ LƯU (không có giao diện)
 * ----------------------------------------------------------------------------
 * Luật chấm giữ NGUYÊN của src/exam-engine/exam-scoring.ts (kết quả cũ và mới so được với nhau):
 *   - Nghe / Đọc / Từ vựng: gradeObjectiveSection (đề < 40 câu thì quy tỉ lệ về thang 40)
 *   - Writing: AI (Gemini) chấm từng task; band Writing = (Task 1 + 2 × Task 2) / 3
 *   - Speaking: AI chấm từng Part từ bản ghi WAV; band = trung bình các Part
 *   - buildExamResult ghép lại: band tổng (thi thử, đủ 4 kỹ năng), % + đạt/chưa (test level)…
 *
 * Kết quả lưu (StoredExamResult) = ExamResult cũ + vài trường mới để màn "Xem lại" vẽ lại đề:
 *   answers (đáp án gốc theo id câu), mode, sectionsTaken, speakingSkipped, timeSpentSeconds.
 * Bỏ `context` (cả bài đọc) khỏi từng câu: đề còn trong ALL_EXAMS nên tra lại được, và máy chủ
 * chỉ nhận kết quả ≤ 300 KB (40 câu × bài đọc 5.000 ký tự đã vượt).
 * ----------------------------------------------------------------------------
 */
import { findLevelInfo } from '../../content/all-levels'
import type { Exam, ExamQuestion, ExamSection, SpeakingPart, WritingTask } from '../../content/content-types'
import { describeChartAsText } from '../../components/WritingTaskChart'
import { buildExamResult, gradeObjectiveSection, gradePlacement, type ExamAnswers, type ExamResult, type QuestionReview, type SectionResult } from '../../exam-engine/exam-scoring'
import type { NewMistake } from '../../learning-progress/progress-types'
import { api } from '../../services/api-client'
import { countWords } from '../../services/answer-checking'
import type { RecordedAudio } from '../../services/audio-recorder'
import { isObjectiveSection, partKey, type ExamRunMode } from './exam-catalog'
import { contextForQuestion } from './exam-part-content'

/** Kết quả phòng thi v3 lưu lên /api/exam-results (kết quả cũ không có các trường tuỳ chọn). */
export interface StoredExamResult extends ExamResult {
  roomVersion?: 3
  mode?: ExamRunMode
  /** câu trả lời gốc: id câu / id task -> giá trị (choice = số thứ tự phương án) */
  answers?: ExamAnswers
  /** chỉ số các phần đã làm */
  sectionsTaken?: number[]
  speakingSkipped?: boolean
  timeSpentSeconds?: number
}

/** 1 mục AI chấm (Writing task / Speaking part) — đúng kiểu SectionResult.aiResults cũ. */
export type AiResultEntry = NonNullable<SectionResult['aiResults']>[number]

/** Ít hơn số từ này coi như bỏ trống, không gửi AI. */
const MIN_WORDS_TO_GRADE = 5

/** Band mục tiêu gửi kèm AI (test level -> dải band của level; thi thử -> không gửi). */
export function targetBandFor(exam: Exam): string | undefined {
  return exam.levelId ? findLevelInfo(exam.levelId)?.bandRange : undefined
}

/* ============================================================================
 * 1. CÂU TỰ CHẤM
 * ========================================================================== */

export function gradeObjective(exam: Exam, sectionIndexes: number[], answers: ExamAnswers): { results: Map<number, SectionResult>; reviews: QuestionReview[] } {
  const results = new Map<number, SectionResult>()
  const reviews: QuestionReview[] = []
  for (const index of sectionIndexes) {
    const section = exam.sections[index]
    if (!section || !isObjectiveSection(section)) continue
    const graded = gradeObjectiveSection(section, answers)
    results.set(index, graded.result)
    // bỏ context nặng (xem chú thích đầu file)
    reviews.push(...graded.reviews.map(({ context: _dropped, ...review }) => review))
  }
  return { results, reviews }
}

/* ============================================================================
 * 2. WRITING + SPEAKING (gọi AI)
 * ========================================================================== */

export interface WritingJob {
  key: string
  sectionIndex: number
  task: WritingTask
  text: string
}

export function writingJobs(exam: Exam, sectionIndexes: number[], answers: ExamAnswers): WritingJob[] {
  return sectionIndexes.flatMap((index) =>
    (exam.sections[index]?.writingTasks ?? []).map((task) => ({ key: `w-${task.id}`, sectionIndex: index, task, text: answers[task.id] ?? '' })),
  )
}

export const isEmptyWriting = (job: WritingJob) => countWords(job.text) < MIN_WORDS_TO_GRADE

export async function gradeWritingJob(exam: Exam, job: WritingJob): Promise<AiResultEntry> {
  const label = `Task ${job.task.taskNumber}`
  const base = { label, prompt: job.task.prompt, userText: job.text }
  if (isEmptyWriting(job)) return { ...base, result: null, error: 'empty' }
  try {
    const { result } = await api.gradeWriting({
      prompt: job.task.prompt,
      answer: job.text,
      taskKind: exam.kind === 'mock-ielts' ? (job.task.taskNumber === 1 ? 'task1' : 'task2') : 'lesson',
      targetBand: targetBandFor(exam),
      chartDescription: job.task.chartData ? describeChartAsText(job.task.chartData) : undefined,
    })
    return { ...base, result }
  } catch (error) {
    return { ...base, result: null, error: (error as Error).message || 'error' }
  }
}

/** Bản ghi của 1 câu nói: câu hỏi + file WAV. */
export interface SpeakingAnswer {
  question: string
  audio: RecordedAudio
}

export interface SpeakingJob {
  key: string
  sectionIndex: number
  part: SpeakingPart
  answers: SpeakingAnswer[]
}

export function speakingJobs(exam: Exam, sectionIndexes: number[], takes: Record<number, SpeakingAnswer[]>): SpeakingJob[] {
  return sectionIndexes.flatMap((index) =>
    (exam.sections[index]?.speakingParts ?? []).map((part) => ({ key: `s-${index}-${part.partNumber}`, sectionIndex: index, part, answers: takes[part.partNumber] ?? [] })),
  )
}

export async function gradeSpeakingJob(exam: Exam, job: SpeakingJob): Promise<AiResultEntry> {
  const label = `Part ${job.part.partNumber}`
  const prompt = job.part.questions.join('\n')
  if (job.answers.length === 0) return { label, prompt, result: null, error: 'empty' }
  try {
    const { result } = await api.gradeSpeaking({
      context: exam.kind === 'mock-ielts' ? 'ielts' : 'lesson',
      partLabel: label,
      targetBand: targetBandFor(exam),
      answers: job.answers.map((answer) => ({ question: answer.question, audioBase64: answer.audio.base64Wav, mimeType: answer.audio.mimeType })),
    })
    return { label, prompt, result }
  } catch (error) {
    return { label, prompt, result: null, error: (error as Error).message || 'error' }
  }
}

/* ============================================================================
 * 3. GHÉP KẾT QUẢ
 * ========================================================================== */

export interface AssembleInput {
  exam: Exam
  mode: ExamRunMode
  sectionIndexes: number[]
  answers: ExamAnswers
  aiResults: Record<string, AiResultEntry>
  speakingSkipped: boolean
  timeSpentSeconds: number
}

export function assembleResult({ exam, mode, sectionIndexes, answers, aiResults, speakingSkipped, timeSpentSeconds }: AssembleInput): StoredExamResult {
  const objective = gradeObjective(exam, sectionIndexes, answers)
  const writing = writingJobs(exam, sectionIndexes, answers)
  const sections: SectionResult[] = sectionIndexes.map((index) => {
    const section = exam.sections[index]
    if (isObjectiveSection(section)) return objective.results.get(index)!
    if (section.skill === 'writing') {
      return { skill: section.skill, title: section.title, aiResults: writing.filter((job) => job.sectionIndex === index).map((job) => aiResults[job.key] ?? { label: `Task ${job.task.taskNumber}`, prompt: job.task.prompt, userText: job.text, result: null, error: 'missing' }) }
    }
    // speaking: chỉ những Part có kết quả (bỏ qua phần Nói -> không có mục nào -> band null)
    const parts = (section.speakingParts ?? []).map((part) => aiResults[`s-${index}-${part.partNumber}`]).filter((entry): entry is AiResultEntry => !!entry && entry.error !== 'empty')
    return { skill: section.skill, title: section.title, aiResults: parts }
  })
  const placement = exam.kind === 'placement' ? gradePlacement(exam, answers) : undefined
  const result = buildExamResult(exam, sections, objective.reviews, placement)
  return { ...result, roomVersion: 3, mode, answers, sectionsTaken: sectionIndexes, speakingSkipped, timeSpentSeconds }
}

/* ============================================================================
 * 4. GHI VÀO TIẾN ĐỘ HỌC (qua useProgress — không tự lưu)
 * ========================================================================== */

/** Các hành động của useProgress() + ví chuối mà phòng thi cần (truyền vào để file này không phụ thuộc React). */
export interface ProgressEffects {
  addXp: (amount: number) => void
  recordActivity: (metric: 'examsTaken') => void
  markStudyDay: () => void
  recordAnswer: (skill: ExamSection['skill'], correct: boolean, itemKey?: string, mistake?: NewMistake) => void
  passLevelTest: (levelId: string, levelOrder: number, percent: number) => void
  setPlacementResult: (order: number, estimatedBand: string) => void
  updateBandEstimate: (skill: ExamSection['skill'], low: number, high: number, confidence: 'low' | 'medium' | 'high') => void
  saveDraft: (taskId: string, text: string) => void
  logWriting: (entry: { taskId: string; words: number; aiLow?: number; aiHigh?: number }) => void
  earnBananas: (reason: 'exam-placement' | 'exam-mock' | 'level-test') => Promise<number> | void
  flushSave: () => void
}

/** XP thưởng khi nộp xong (luyện vài phần thì ít hơn đề đủ). */
const EXAM_XP: Record<Exam['kind'], number> = { placement: 20, 'level-test': 40, 'mock-ielts': 60 }
/** Tối đa số câu sai đưa vào sổ lỗi mỗi lần thi (sổ không quá dài). */
const MAX_MISTAKES_PER_EXAM = 40

/** Khoá nháp Writing của phòng thi trong progress.drafts. */
export const writingDraftKey = (examId: string, taskId: string) => `exam:${examId}:${taskId}`

export function applyProgressEffects(exam: Exam, result: StoredExamResult, effects: ProgressEffects): void {
  const sectionIndexes = result.sectionsTaken ?? exam.sections.map((_, index) => index)
  const fullTest = sectionIndexes.length === exam.sections.length

  effects.addXp(fullTest ? EXAM_XP[exam.kind] : Math.round(EXAM_XP[exam.kind] / 3))
  effects.recordActivity('examsTaken')
  effects.markStudyDay() // làm xong bài thi = hôm nay có học (giữ chuỗi ngày)

  // từng câu tự chấm -> thống kê kỹ năng (+ câu sai vào sổ lỗi, có đoạn ngữ cảnh ngắn)
  let mistakes = 0
  for (const index of sectionIndexes) {
    const section = exam.sections[index]
    section.parts?.forEach((part, partIndex) => {
      for (const question of part.questions) {
        const review = result.questionReviews.find((r) => r.questionId === question.id)
        if (!review) continue
        const wrong = !review.isCorrect && mistakes < MAX_MISTAKES_PER_EXAM
        if (wrong) mistakes++
        effects.recordAnswer(
          section.skill,
          review.isCorrect,
          undefined, // câu đề thi không tạo thẻ ôn "item:" (findExercise không tra được — xem REQUESTS)
          wrong ? mistakeOf(exam, section, question, review, contextForQuestion(part, question, partKey(index, partIndex))) : undefined,
        )
      }
    })
  }

  // band ước tính (chỉ đề thi thử: đủ câu / có AI) — dạng khoảng ±0.5.
  // Bỏ qua phần Nghe/Đọc để trống > 20% câu (VD luyện thử vài câu) để không kéo band ước tính xuống oan.
  if (exam.kind === 'mock-ielts') {
    for (const section of result.sections) {
      if (typeof section.band !== 'number') continue
      const reviews = result.questionReviews.filter((review) => review.skill === section.skill)
      if (reviews.length > 0 && reviews.filter((review) => !review.userAnswer).length / reviews.length > 0.2) continue
      const low = Math.max(0, section.band - 0.5)
      const high = Math.min(9, section.band + 0.5)
      effects.updateBandEstimate(section.skill, low, high, 'medium')
    }
  }

  // Writing: nhật ký bài viết + xoá nháp
  for (const section of result.sections) {
    if (section.skill !== 'writing') continue
    for (const index of sectionIndexes) {
      for (const task of exam.sections[index].writingTasks ?? []) {
        const entry = section.aiResults?.find((item) => item.label === `Task ${task.taskNumber}`)
        const text = result.answers?.[task.id] ?? ''
        if (countWords(text) >= MIN_WORDS_TO_GRADE) {
          const band = entry?.result?.overallBand
          effects.logWriting({ taskId: task.id, words: countWords(text), aiLow: band !== undefined ? Math.max(0, band - 0.5) : undefined, aiHigh: band !== undefined ? Math.min(9, band + 0.5) : undefined })
        }
        effects.saveDraft(writingDraftKey(exam.id, task.id), '')
      }
    }
  }

  if (result.placement) effects.setPlacementResult(result.placement.recommendedLevelOrder, result.placement.estimatedBand)
  const level = findLevelInfo(exam.levelId)
  if (result.levelTest?.passed && level) effects.passLevelTest(level.id, level.order, result.percent ?? 0)

  // chuối: máy chủ tự giới hạn số lần / ngày
  if (exam.kind === 'placement') void effects.earnBananas('exam-placement')
  if (exam.kind === 'mock-ielts' && fullTest) void effects.earnBananas('exam-mock')
  if (result.levelTest?.passed) void effects.earnBananas('level-test')

  effects.flushSave()
}

function mistakeOf(exam: Exam, section: ExamSection, question: ExamQuestion, review: QuestionReview, context: string | undefined) {
  return {
    source: 'exam' as const,
    itemId: question.id,
    parentId: exam.id,
    question: `[${section.title} · Q${question.number}] ${question.prompt}`,
    userAnswer: review.userAnswer,
    correctAnswer: review.correctAnswer,
    explanation: question.explanation?.vi,
    context,
  }
}

/* ============================================================================
 * 5. LƯU TẠM TRONG MÁY KHI KHÔNG GỬI ĐƯỢC LÊN MÁY CHỦ (/exam-result/local)
 * ========================================================================== */

/** Cùng khoá với trang kết quả cũ để kết quả tạm cũ vẫn mở được. */
export const LOCAL_RESULT_KEY = 'ielts-last-exam-result'

export function keepResultLocally(result: StoredExamResult): void {
  try {
    sessionStorage.setItem(LOCAL_RESULT_KEY, JSON.stringify(result))
    localStorage.setItem(LOCAL_RESULT_KEY, JSON.stringify(result))
  } catch {
    /* bỏ qua */
  }
}

export function readLocalResult(): StoredExamResult | null {
  try {
    const raw = sessionStorage.getItem(LOCAL_RESULT_KEY) ?? localStorage.getItem(LOCAL_RESULT_KEY)
    return raw ? (JSON.parse(raw) as StoredExamResult) : null
  } catch {
    return null
  }
}

export function forgetLocalResult(): void {
  try {
    sessionStorage.removeItem(LOCAL_RESULT_KEY)
    localStorage.removeItem(LOCAL_RESULT_KEY)
  } catch {
    /* bỏ qua */
  }
}
