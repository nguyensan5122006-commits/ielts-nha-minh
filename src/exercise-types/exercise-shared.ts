/**
 * exercise-shared.ts
 * ----------------------------------------------------------------------------
 * PHẦN DÙNG CHUNG CHO MỌI DẠNG BÀI TẬP.
 *
 * Mỗi dạng bài là 1 component nhận ExerciseComponentProps:
 *   - exercise       : dữ liệu bài tập
 *   - isLocked       : true sau khi đã bấm "Kiểm tra" (không cho sửa nữa)
 *   - onAnswerChange : báo cho trang cha câu trả lời hiện tại (null = chưa trả lời xong)
 *
 * Trang cha (ExercisePlayer) giữ câu trả lời, khi bấm "Kiểm tra" thì gọi
 * checkExerciseAnswer() ở dưới để biết đúng/sai.
 * ----------------------------------------------------------------------------
 */
import type { Exercise } from '../content/content-types'
import { matchesAnyAnswer, sentenceSimilarity } from '../services/answer-checking'

export interface ExerciseComponentProps<T extends Exercise = Exercise> {
  exercise: T
  isLocked: boolean
  onAnswerChange: (answer: string | null) => void
  /** band mục tiêu của level (gửi AI để chấm phù hợp trình độ) */
  targetBand?: string
}

/* Một số câu trả lời đặc biệt */
export const SKIPPED_ANSWER = '__skipped__' // bỏ qua bài nói khi trình duyệt không hỗ trợ
export const AI_DONE_PREFIX = '__ai_done__:' // bài AI chấm xong, kèm band. VD "__ai_done__:5.5"
export const AI_FAILED_ANSWER = '__ai_failed__' // AI lỗi nhưng vẫn cho đi tiếp

/** Dạng bài do AI chấm: tự có nút gửi bài riêng, không cần nút "Kiểm tra". */
export const AI_GRADED_TYPES: Exercise['type'][] = ['speak-answer', 'write-answer']

/** Độ giống tối thiểu để bài đọc to được tính là đúng. */
const SPEAKING_SIMILARITY_REQUIRED = 0.7

export interface AnswerCheckResult {
  isCorrect: boolean
  /** đáp án đúng dạng chữ để hiện cho người học */
  correctAnswerText: string
  /** câu trả lời của người học dạng chữ (lưu vào sổ lỗi sai) */
  userAnswerText: string
  /** câu hỏi dạng chữ (lưu vào sổ lỗi sai) */
  questionText: string
}

/** Chấm 1 câu trả lời. */
export function checkExerciseAnswer(exercise: Exercise, answer: string): AnswerCheckResult {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose': {
      const chosen = exercise.options[Number(answer)] ?? ''
      const question = exercise.type === 'listen-choose' ? `🔊 "${exercise.audioText}" — ${exercise.question}` : exercise.question
      return {
        isCorrect: Number(answer) === exercise.correctIndex,
        correctAnswerText: exercise.options[exercise.correctIndex],
        userAnswerText: chosen,
        questionText: question,
      }
    }
    case 'fill-blank':
      return {
        isCorrect: matchesAnyAnswer(answer, exercise.acceptedAnswers),
        correctAnswerText: exercise.sentence.replace('___', exercise.acceptedAnswers[0]),
        userAnswerText: answer,
        questionText: exercise.sentence,
      }
    case 'arrange-words':
      return {
        isCorrect: matchesAnyAnswer(answer, [exercise.correctSentence]),
        correctAnswerText: exercise.correctSentence,
        userAnswerText: answer,
        questionText: exercise.translationVi,
      }
    case 'match-pairs':
      // answer = số lần nối sai; sai tối đa 1 lần vẫn tính là đúng
      return {
        isCorrect: Number(answer) <= 1,
        correctAnswerText: exercise.pairs.map((p) => `${p.left} = ${p.right}`).join('; '),
        userAnswerText: `${answer} lần nối sai`,
        questionText: exercise.pairs.map((p) => p.left).join(', '),
      }
    case 'true-false':
      return {
        isCorrect: answer === exercise.answer,
        correctAnswerText: exercise.answer,
        userAnswerText: answer,
        questionText: exercise.statement,
      }
    case 'listen-type':
      return {
        isCorrect: matchesAnyAnswer(answer, exercise.acceptedAnswers),
        correctAnswerText: exercise.acceptedAnswers[0],
        userAnswerText: answer,
        questionText: `🔊 ${exercise.audioText}`,
      }
    case 'speak-sentence': {
      const isSkipped = answer === SKIPPED_ANSWER
      return {
        isCorrect: isSkipped || sentenceSimilarity(answer, exercise.sentence) >= SPEAKING_SIMILARITY_REQUIRED,
        correctAnswerText: exercise.sentence,
        userAnswerText: isSkipped ? '' : answer,
        questionText: exercise.sentence,
      }
    }
    case 'speak-answer':
    case 'write-answer':
      // bài AI chấm: hoàn thành là được tính (điểm chi tiết đã hiện ở thẻ nhận xét)
      return {
        isCorrect: true,
        correctAnswerText: exercise.sampleAnswer,
        userAnswerText: '',
        questionText: exercise.type === 'speak-answer' ? exercise.question : exercise.prompt,
      }
  }
}

/**
 * Thứ tự hiển thị các đáp án, xáo trộn nhưng CỐ ĐỊNH theo id câu hỏi
 * (mở lại vẫn cùng thứ tự). Mục đích: đáp án đúng không bị dồn vào 1 vị trí.
 * Trả về mảng vị trí gốc, VD [2, 0, 3, 1] = hiện đáp án gốc số 2 đầu tiên.
 * Không xáo nếu đáp án là nhãn chữ cái (A, B, C... / "A. ...") vì đề có thể nhắc tới thứ tự đó.
 */
export function stableOptionOrder(seedText: string, options: string[]): number[] {
  const original = options.map((_, i) => i)
  if (options.some((option) => /^[A-J]([.)]|\s*$)/.test(option.trim()) || /all of the above|none of the above/i.test(option))) {
    return original
  }
  // tạo số ngẫu nhiên "giả" từ id câu hỏi (cùng id -> cùng dãy số)
  let seed = 0
  for (let i = 0; i < seedText.length; i++) seed = (Math.imul(seed, 31) + seedText.charCodeAt(i)) >>> 0
  const nextRandom = () => {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    return seed / 0x100000000
  }
  for (let i = original.length - 1; i > 0; i--) {
    const j = Math.floor(nextRandom() * (i + 1))
    ;[original[i], original[j]] = [original[j], original[i]]
  }
  return original
}

/** Trộn ngẫu nhiên mảng (thuật toán Fisher–Yates), trả về mảng mới. */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
