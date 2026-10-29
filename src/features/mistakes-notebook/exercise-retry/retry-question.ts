/**
 * retry-question.ts — "CÂU HỎI LÀM LẠI": 1 dạng chung cho mọi câu từng sai
 * ----------------------------------------------------------------------------
 * Câu sai đến từ nhiều nguồn: bài tập trong bài học (10 dạng Exercise), câu trong đề thi
 * (choice / TFNG / gap-fill), hoặc chỉ còn chữ trong sổ lỗi (bài đã bị xoá). Để màn
 * "Ôn lại câu sai" và phiên ôn thẻ chỉ cần 1 bộ giao diện, mọi thứ được đổi về 4 dạng:
 *
 *   choice      chọn 1 đáp án (trắc nghiệm, nghe-chọn, Đúng/Sai/Không có thông tin)
 *   type        gõ đáp án (điền chỗ trống, nghe-chép, điền từ trong đề thi)
 *   arrange     bấm các thẻ từ để ghép câu
 *   self-check  tự kiểm tra: xem câu hỏi -> nghĩ/nói ra -> hiện đáp án -> tự chấm
 *               (dạng nói, viết, nối cặp — không chấm máy nhanh được trong lúc ôn)
 *
 * Chấm điểm: gradeRetryAnswer(). Sai 1 ký tự (gõ nhầm) vẫn tính ĐÚNG nhưng báo cách viết
 * chuẩn (04-DESIGN-SYSTEM.md, mục bổ sung "Seneca").
 * File thuần (không React) để chạy thử được ngoài trình duyệt.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, ExamQuestion, Exercise } from '../../../content/content-types'
import { normalizeAnswer } from '../../../services/answer-checking'

interface RetryBase {
  /** id gốc (bài tập / câu thi) */
  id: string
  /** đề / câu hỏi hiển thị (có thể nhiều dòng) */
  prompt: string
  /** câu được đọc bằng loa (bài nghe) */
  audioText?: string
  /** đoạn văn đi kèm (câu đọc hiểu trong đề thi) — hiện thu gọn */
  passageText?: string
  explanation?: BilingualText | string
  /** đáp án đúng dạng chữ (hiện trong khung phản hồi) */
  answerText: string
}

export type RetryQuestion =
  | (RetryBase & { kind: 'choice'; options: string[]; correctIndex: number })
  | (RetryBase & { kind: 'type'; acceptedAnswers: string[]; hint?: string; /** câu có "___" để vẽ ô trống ngay trong câu */ sentence?: string })
  | (RetryBase & { kind: 'arrange'; tiles: string[]; correctSentence: string; translationVi: string })
  | (RetryBase & { kind: 'self-check'; /** lời nhắc cách tự kiểm tra (VD "Đọc to câu này") */ instruction: 'say' | 'recall' | 'write' })

/* ============================================================================
 * 1. ĐỔI TỪ NGUỒN GỐC -> RetryQuestion
 * ========================================================================== */

/** Xáo trộn cố định theo chuỗi hạt giống (cùng câu -> cùng thứ tự, không nhảy khi vẽ lại). */
function seededShuffle<T>(items: T[], seedText: string): T[] {
  const result = [...items]
  let seed = 0
  for (let i = 0; i < seedText.length; i++) seed = (Math.imul(seed, 31) + seedText.charCodeAt(i)) >>> 0
  const random = () => {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    return seed / 0x100000000
  }
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Đáp án đã có nhãn chữ cái ("A. …", "i. …") thì KHÔNG xáo (02-CONTENT-GUIDE: không xáo câu matching). */
function hasLetterLabels(options: string[]) {
  return options.some((option) => /^([A-J]|[ivx]+)[.)]\s/.test(option.trim()))
}

/** Xáo các lựa chọn và trả về vị trí mới của đáp án đúng. */
function shuffleChoice(id: string, options: string[], correctIndex: number) {
  if (hasLetterLabels(options) || options.length <= 2) return { options, correctIndex }
  const order = seededShuffle(
    options.map((_, index) => index),
    id,
  )
  return { options: order.map((index) => options[index]), correctIndex: order.indexOf(correctIndex) }
}

/** Bài tập trong bài học -> câu làm lại. */
export function retryQuestionFromExercise(exercise: Exercise): RetryQuestion {
  const base = { id: exercise.id, explanation: exercise.explanation }
  switch (exercise.type) {
    case 'multiple-choice':
      return { ...base, kind: 'choice', prompt: exercise.question, answerText: exercise.options[exercise.correctIndex], ...shuffleChoice(exercise.id, exercise.options, exercise.correctIndex) }
    case 'listen-choose':
      return {
        ...base,
        kind: 'choice',
        prompt: exercise.question,
        audioText: exercise.audioText,
        answerText: exercise.options[exercise.correctIndex],
        ...shuffleChoice(exercise.id, exercise.options, exercise.correctIndex),
      }
    case 'true-false': {
      const options = exercise.allowNotGiven ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['TRUE', 'FALSE']
      return { ...base, kind: 'choice', prompt: exercise.statement, options, correctIndex: options.indexOf(exercise.answer), answerText: exercise.answer }
    }
    case 'fill-blank':
      return {
        ...base,
        kind: 'type',
        prompt: exercise.sentence,
        sentence: exercise.sentence,
        acceptedAnswers: exercise.acceptedAnswers,
        hint: exercise.hint,
        answerText: exercise.sentence.replace('___', exercise.acceptedAnswers[0]),
      }
    case 'listen-type':
      return { ...base, kind: 'type', prompt: '', audioText: exercise.audioText, acceptedAnswers: exercise.acceptedAnswers, answerText: exercise.acceptedAnswers[0] }
    case 'arrange-words': {
      const words = exercise.correctSentence.split(/\s+/).filter(Boolean)
      return {
        ...base,
        kind: 'arrange',
        prompt: exercise.translationVi,
        translationVi: exercise.translationVi,
        tiles: seededShuffle([...words, ...(exercise.extraWords ?? [])], exercise.id),
        correctSentence: exercise.correctSentence,
        answerText: exercise.correctSentence,
      }
    }
    case 'match-pairs': {
      // nối cặp -> hỏi lại 1 cặp dạng trắc nghiệm: "<vế trái>" nối với vế phải nào? (vẫn là tự nhớ, chấm máy được)
      const seed = seededShuffle(
        exercise.pairs.map((_, index) => index),
        exercise.id + ':pair',
      )
      const asked = exercise.pairs[seed[0]]
      const rights = seededShuffle(
        exercise.pairs.map((pair) => pair.right),
        exercise.id + ':options',
      ).slice(0, 4)
      if (!rights.includes(asked.right)) rights[rights.length - 1] = asked.right
      return {
        ...base,
        kind: 'choice',
        prompt: `${exercise.instruction.en}\n${asked.left} → ?`,
        options: rights,
        correctIndex: rights.indexOf(asked.right),
        answerText: `${asked.left} = ${asked.right}`,
      }
    }
    case 'speak-sentence':
      return { ...base, kind: 'self-check', instruction: 'say', prompt: exercise.sentence, audioText: exercise.sentence, answerText: exercise.translationVi }
    case 'speak-answer':
      return { ...base, kind: 'self-check', instruction: 'say', prompt: exercise.question, answerText: exercise.sampleAnswer }
    case 'write-answer':
      return { ...base, kind: 'self-check', instruction: 'write', prompt: exercise.prompt, answerText: exercise.sampleAnswer }
  }
}

/** Câu trong đề thi -> câu làm lại. `passageText` = đoạn đọc / lời thoại (nếu có). */
export function retryQuestionFromExamQuestion(question: ExamQuestion, passageText?: string): RetryQuestion {
  const base = { id: question.id, explanation: question.explanation, passageText }
  if (question.kind === 'choice') {
    // câu matching/heading có nhãn chữ cái -> giữ nguyên thứ tự (shuffleChoice tự nhận ra)
    return { ...base, kind: 'choice', prompt: question.prompt, answerText: question.options[question.correctIndex], ...shuffleChoice(question.id, question.options, question.correctIndex) }
  }
  if (question.kind === 'true-false-not-given') {
    const options = ['TRUE', 'FALSE', 'NOT GIVEN']
    return { ...base, kind: 'choice', prompt: question.prompt, options, correctIndex: options.indexOf(question.answer), answerText: question.answer }
  }
  return {
    ...base,
    kind: 'type',
    prompt: question.prompt,
    sentence: question.prompt.includes('___') ? question.prompt : undefined,
    acceptedAnswers: question.acceptedAnswers,
    answerText: question.acceptedAnswers[0],
  }
}

/** Chỉ còn chữ trong sổ lỗi (không tìm được bài gốc) -> tự kiểm tra. */
export function retryQuestionFromText(id: string, prompt: string, correctAnswer: string, explanation?: string): RetryQuestion {
  return { id, kind: 'self-check', instruction: 'recall', prompt, answerText: correctAnswer, explanation }
}

/* ============================================================================
 * 2. CHẤM ĐIỂM
 * ========================================================================== */

export interface RetryGrade {
  correct: boolean
  /** đúng nhưng gõ sai 1 ký tự -> hiện cách viết chuẩn */
  nearMiss?: string
}

/** Khoảng cách sửa chữ (số ký tự phải thêm/bớt/đổi) — bắt lỗi gõ nhầm 1 chữ. */
function editDistance(a: string, b: string): number {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    for (let j = 1; j <= b.length; j++) current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    previous = current
  }
  return previous[b.length]
}

/**
 * Chấm 1 câu trả lời.
 * - choice:  answer = vị trí đáp án đã chọn (chuỗi số)
 * - type:    answer = chữ người học gõ
 * - arrange: answer = câu đã ghép (các thẻ nối bằng dấu cách)
 * - self-check: answer = 'yes' (tự nhận đúng) | 'no'
 */
export function gradeRetryAnswer(question: RetryQuestion, answer: string): RetryGrade {
  switch (question.kind) {
    case 'choice':
      return { correct: Number(answer) === question.correctIndex }
    case 'self-check':
      return { correct: answer === 'yes' }
    case 'arrange':
      return { correct: normalizeAnswer(answer) === normalizeAnswer(question.correctSentence) }
    case 'type': {
      const typed = normalizeAnswer(answer)
      if (!typed) return { correct: false }
      for (const accepted of question.acceptedAnswers) {
        const target = normalizeAnswer(accepted)
        if (typed === target) return { correct: true }
      }
      // gõ nhầm 1 ký tự ở từ đủ dài (≥ 4 chữ) -> vẫn đúng, nhắc cách viết chuẩn
      for (const accepted of question.acceptedAnswers) {
        const target = normalizeAnswer(accepted)
        if (target.length >= 4 && editDistance(typed, target) === 1) return { correct: true, nearMiss: accepted }
      }
      return { correct: false }
    }
  }
}
