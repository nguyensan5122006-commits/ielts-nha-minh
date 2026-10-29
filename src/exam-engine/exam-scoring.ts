/**
 * exam-scoring.ts
 * ----------------------------------------------------------------------------
 * CHẤM ĐIỂM BÀI THI — các hàm thuần (chỉ tính toán, không gọi mạng).
 *
 *  - Listening / Reading: đếm câu đúng -> đổi sang band theo bảng quy đổi IELTS
 *    (đề ít hơn 40 câu thì quy tỉ lệ về thang 40).
 *  - Writing: band = (Task 1 + 2 × Task 2) / 3   (Task 2 nặng gấp đôi, như thi thật)
 *  - Speaking: trung bình các Part.
 *  - Overall: trung bình 4 kỹ năng, làm tròn kiểu IELTS (.25 -> .5, .75 -> lên 1).
 *  - Bài xếp lớp: đếm đúng theo từng mức độ (id câu có dạng "pl-L3-q12").
 *  - Bài test level: quy ra % (câu tự chấm + Writing/Speaking theo band AI).
 * ----------------------------------------------------------------------------
 */
import { findLevelInfo } from '../content/all-levels'
import { legacyBandRange } from '../content/legacy-levels'
import type { BilingualText, Exam, ExamQuestion, ExamSection } from '../content/content-types'
import { matchesAnyAnswer } from '../services/answer-checking'
import type { AiGradingResult } from '../services/api-client'

/* ------------------------------ kiểu dữ liệu ------------------------------ */

/** Câu trả lời của người thi: id câu hỏi / id task -> chữ (với trắc nghiệm là số thứ tự đáp án). */
export type ExamAnswers = Record<string, string>

export interface QuestionReview {
  questionId: string
  skill: ExamSection['skill']
  number: number
  prompt: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  kind: ExamQuestion['kind']
  explanation?: BilingualText
  /** đoạn văn / kịch bản để AI giải thích đúng ngữ cảnh */
  context?: string
}

export interface SectionResult {
  skill: ExamSection['skill']
  title: string
  correct?: number // Listening / Reading / Vocabulary
  total?: number
  band?: number | null // null = chưa chấm được (AI lỗi)
  /** Writing: mỗi task 1 kết quả; Speaking: mỗi part 1 kết quả */
  aiResults?: { label: string; prompt: string; userText?: string; result: AiGradingResult | null; error?: string }[]
}

export interface ExamResult {
  examId: string
  kind: Exam['kind']
  finishedAt: string
  sections: SectionResult[]
  questionReviews: QuestionReview[]
  overallBand: number | null
  percent: number | null
  notes: BilingualText[]
  placement?: { recommendedLevelOrder: number; estimatedBand: string; correctByLevel: Record<string, number> }
  levelTest?: { passed: boolean; passPercent: number }
}

/* -------------------------- bảng quy đổi band ----------------------------- */

// [số câu đúng tối thiểu (trên 40), band]
const LISTENING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0],
]
const READING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0],
]

export function rawScoreToBand(skill: 'listening' | 'reading', correct: number, total: number): number {
  const outOf40 = total === 40 ? correct : Math.round((correct / Math.max(total, 1)) * 40)
  const table = skill === 'listening' ? LISTENING_BANDS : READING_BANDS
  return table.find(([minimum]) => outOf40 >= minimum)![1]
}

/** Làm tròn kiểu IELTS về bội số 0.5 gần nhất (.25 lên .5, .75 lên số nguyên kế tiếp). */
export function roundToIeltsBand(value: number): number {
  return Math.round(value * 2) / 2
}

/* ------------------------------ chấm câu hỏi ------------------------------ */

export function isQuestionCorrect(question: ExamQuestion, answer: string | undefined): boolean {
  if (answer === undefined || answer === '') return false
  switch (question.kind) {
    case 'choice':
      return Number(answer) === question.correctIndex
    case 'true-false-not-given':
      return answer === question.answer
    case 'gap-fill':
      return matchesAnyAnswer(answer, question.acceptedAnswers)
  }
}

function correctAnswerText(question: ExamQuestion): string {
  if (question.kind === 'choice') return question.options[question.correctIndex]
  if (question.kind === 'true-false-not-given') return question.answer
  return question.acceptedAnswers[0]
}

function userAnswerText(question: ExamQuestion, answer: string | undefined): string {
  if (!answer) return ''
  return question.kind === 'choice' ? (question.options[Number(answer)] ?? '') : answer
}

/** Chấm 1 phần tự động (listening / reading / vocabulary). */
export function gradeObjectiveSection(section: ExamSection, answers: ExamAnswers): { result: SectionResult; reviews: QuestionReview[] } {
  const reviews: QuestionReview[] = []
  for (const part of section.parts ?? []) {
    const context = part.passage?.text ?? part.audioScript
    for (const question of part.questions) {
      const answer = answers[question.id]
      reviews.push({
        questionId: question.id,
        skill: section.skill,
        number: question.number,
        prompt: question.prompt,
        userAnswer: userAnswerText(question, answer),
        correctAnswer: correctAnswerText(question),
        isCorrect: isQuestionCorrect(question, answer),
        kind: question.kind,
        explanation: question.explanation,
        context,
      })
    }
  }
  const correct = reviews.filter((r) => r.isCorrect).length
  const band = section.skill === 'listening' || section.skill === 'reading' ? rawScoreToBand(section.skill, correct, reviews.length) : undefined
  return { result: { skill: section.skill, title: section.title, correct, total: reviews.length, band }, reviews }
}

/* ------------------------------ tổng hợp ---------------------------------- */

/** Lấy band trên của khoảng level, VD "0 – 2.0" -> 2 (dùng làm chuẩn "đạt" cho W/S ở bài test level). */
function upperBandOfLevel(levelId: string | undefined): number {
  const range = findLevelInfo(levelId)?.bandRange ?? '6.5' // level v3: level-1 0–2.0, level-2 2.0–4.0, level-3 4.0–6.5
  const numbers = range.match(/[\d.]+/g)?.map(Number) ?? [6.5]
  return Math.max(...numbers)
}

/** Ghép mọi phần lại thành kết quả cuối cùng. */
export function buildExamResult(
  exam: Exam,
  sections: SectionResult[],
  reviews: QuestionReview[],
  placement?: ExamResult['placement'], // chỉ có với bài xếp lớp (tính bằng gradePlacement)
): ExamResult {
  const result: ExamResult = {
    examId: exam.id,
    kind: exam.kind,
    finishedAt: new Date().toISOString(),
    sections,
    questionReviews: reviews,
    overallBand: null,
    percent: null,
    notes: buildNotes(sections, reviews),
  }

  // band Writing & Speaking từ kết quả AI
  for (const section of sections) {
    if (section.skill !== 'writing' && section.skill !== 'speaking') continue
    const bands = (section.aiResults ?? []).map((item) => item.result?.overallBand)
    // chưa có bài nào (bỏ qua) hoặc AI chấm lỗi -> chưa có band
    if (bands.length === 0 || bands.some((b) => b === undefined || b === null)) {
      section.band = null
      continue
    }
    section.band =
      section.skill === 'writing' && bands.length === 2
        ? roundToIeltsBand((bands[0]! + 2 * bands[1]!) / 3)
        : roundToIeltsBand(bands.reduce((s, b) => s! + b!, 0)! / bands.length)
  }

  if (exam.kind === 'mock-ielts') {
    const fourBands = ['listening', 'reading', 'writing', 'speaking'].map((skill) => sections.find((s) => s.skill === skill)?.band)
    if (fourBands.every((b) => typeof b === 'number')) {
      result.overallBand = roundToIeltsBand(fourBands.reduce((sum, b) => sum + b!, 0) / 4)
    }
  }

  // đề ngắn (xếp lớp, test level) quá ít câu để quy đổi band Nghe/Đọc -> chỉ hiện số câu đúng
  if (exam.kind !== 'mock-ielts') {
    for (const section of sections) if (section.total !== undefined) delete section.band
  }

  if (placement) result.placement = placement

  if (exam.kind === 'level-test') {
    // mỗi câu tự chấm = 1 điểm; mỗi task Writing / part Speaking = 5 điểm × (band AI / band mục tiêu)
    const target = upperBandOfLevel(exam.levelId)
    let earned = reviews.filter((r) => r.isCorrect).length
    let possible = reviews.length
    for (const section of sections) {
      for (const item of section.aiResults ?? []) {
        if (!item.result) continue // AI lỗi -> không tính phần này
        earned += 5 * Math.min(1, item.result.overallBand / target)
        possible += 5
      }
    }
    result.percent = possible ? Math.round((earned / possible) * 100) : 0
    const passPercent = exam.passPercent ?? 70
    result.levelTest = { passed: result.percent >= passPercent, passPercent }
  } else {
    const objective = sections.filter((s) => s.total)
    const correct = objective.reduce((sum, s) => sum + (s.correct ?? 0), 0)
    const total = objective.reduce((sum, s) => sum + (s.total ?? 0), 0)
    result.percent = total ? Math.round((correct / total) * 100) : null
  }
  return result
}

/**
 * Bài xếp lớp: id câu hỏi dạng "pl-L{1..6}-q{n}" cho biết câu thuộc mức độ nào.
 * Level gợi ý = mức thấp nhất mà người học đúng dưới 3/5 câu.
 * (Bài xếp lớp CŨ chấm theo 6 level cũ — kho tiến độ tự đổi sang level v3, xem content/legacy-levels.ts.)
 */
export function gradePlacement(exam: Exam, answers: ExamAnswers): { recommendedLevelOrder: number; estimatedBand: string; correctByLevel: Record<string, number> } {
  const correctByLevel: Record<string, number> = {}
  for (const section of exam.sections) {
    for (const part of section.parts ?? []) {
      for (const question of part.questions) {
        const level = question.id.match(/pl-L(\d)/)?.[1]
        if (!level) continue
        correctByLevel[`L${level}`] = (correctByLevel[`L${level}`] ?? 0) + (isQuestionCorrect(question, answers[question.id]) ? 1 : 0)
      }
    }
  }
  let recommended = 6
  for (let level = 1; level <= 6; level++) {
    if ((correctByLevel[`L${level}`] ?? 0) < 3) {
      recommended = level
      break
    }
  }
  return { recommendedLevelOrder: recommended, estimatedBand: legacyBandRange(recommended), correctByLevel }
}

/* ---------------------- "những điểm cần lưu ý" ---------------------------- */

const SKILL_NAMES: Record<string, BilingualText> = {
  listening: { vi: 'Nghe', en: 'Listening' },
  reading: { vi: 'Đọc', en: 'Reading' },
  vocabulary: { vi: 'Từ vựng & Ngữ pháp', en: 'Vocabulary & Grammar' },
  writing: { vi: 'Viết', en: 'Writing' },
  speaking: { vi: 'Nói', en: 'Speaking' },
}

/** Tự rút ra nhận xét từ các câu sai: phần nào yếu, dạng câu hỏi nào hay sai. */
function buildNotes(sections: SectionResult[], reviews: QuestionReview[]): BilingualText[] {
  const notes: BilingualText[] = []

  for (const section of sections) {
    if (!section.total) continue
    const percent = Math.round(((section.correct ?? 0) / section.total) * 100)
    if (percent < 60) {
      notes.push({
        vi: `Phần ${SKILL_NAMES[section.skill].vi} còn yếu (${percent}%). Nên học lại các bài ${SKILL_NAMES[section.skill].vi} trong level và làm thêm ôn tập.`,
        en: `${SKILL_NAMES[section.skill].en} needs work (${percent}%). Revisit the ${SKILL_NAMES[section.skill].en} lessons and do more review.`,
      })
    }
  }

  const wrong = reviews.filter((r) => !r.isCorrect)
  const blank = wrong.filter((r) => !r.userAnswer).length
  if (blank >= 3) {
    notes.push({
      vi: `Bạn bỏ trống ${blank} câu. Trong IELTS sai không bị trừ điểm — luôn đoán thay vì để trống.`,
      en: `You left ${blank} questions blank. IELTS has no penalty for wrong answers — always guess.`,
    })
  }
  const gapWrong = wrong.filter((r) => r.kind === 'gap-fill' && r.userAnswer).length
  if (gapWrong >= 2) {
    notes.push({
      vi: `Sai ${gapWrong} câu điền từ: kiểm tra chính tả, số ít/số nhiều và giới hạn số từ (VD "NO MORE THAN TWO WORDS").`,
      en: `${gapWrong} gap-fill errors: check spelling, singular/plural and the word limit (e.g. "NO MORE THAN TWO WORDS").`,
    })
  }
  const tfngWrong = wrong.filter((r) => r.kind === 'true-false-not-given').length
  if (tfngWrong >= 2) {
    notes.push({
      vi: `Sai ${tfngWrong} câu True/False/Not Given: FALSE = bài nói NGƯỢC lại; NOT GIVEN = bài KHÔNG nhắc tới. Đừng dùng hiểu biết bên ngoài.`,
      en: `${tfngWrong} True/False/Not Given errors: FALSE = the text says the opposite; NOT GIVEN = the text does not say. Don't use outside knowledge.`,
    })
  }

  for (const section of sections) {
    for (const item of section.aiResults ?? []) {
      const weakest = item.result?.criteria?.slice().sort((a, b) => a.band - b.band)[0]
      if (weakest) {
        notes.push({
          vi: `${SKILL_NAMES[section.skill].vi} – ${item.label}: tiêu chí yếu nhất là "${weakest.name}" (${weakest.band}). ${weakest.commentVi}`,
          en: `${SKILL_NAMES[section.skill].en} – ${item.label}: weakest criterion is "${weakest.name}" (${weakest.band}). ${weakest.commentEn}`,
        })
      }
    }
  }
  return notes
}
