/**
 * exercise-contract.ts — "HỢP ĐỒNG" CHUNG CỦA MỌI DẠNG BÀI TẬP TRONG TRÌNH HỌC
 * ----------------------------------------------------------------------------
 * Mỗi dạng bài (chọn đáp án, điền từ, ghép câu, nói…) là 1 component nhận
 * `ExerciseViewProps`. Component KHÔNG tự chấm điểm: nó chỉ báo câu trả lời hiện
 * tại lên trang cha (onAnswerChange). Khi người học bấm "Kiểm tra" (Enter), trang
 * cha gọi `checkExerciseAnswer()` ở file này -> được `CheckOutcome` (đúng / chưa
 * đúng / máy chưa nghe rõ + đáp án + chữ cần tô) rồi truyền ngược xuống để
 * component tô màu (VD đáp án đúng chuyển xanh ngay trong danh sách).
 *
 * Câu trả lời luôn là 1 CHUỖI (lưu được vào progress.resume, gửi vào sổ lỗi):
 *   multiple-choice / listen-choose : "2"            (vị trí GỐC của đáp án)
 *   true-false                       : "TRUE" | "FALSE" | "NOT GIVEN"
 *   fill-blank / listen-type         : chữ người học gõ
 *   arrange-words                    : câu ghép được "Nice to meet you."
 *   match-pairs                      : "<số lần nối sai>|<các cặp từng nối sai>" VD "2|0,3"
 *   speak-sentence                   : SPEECH_PREFIX + JSON {heard, alternatives} | NO_MIC | SELF_SAME | SELF_NOT_YET
 *   speak-answer / write-answer      : AI_DONE_PREFIX + JSON kết quả AI | AI_FAILED
 * ----------------------------------------------------------------------------
 */
import type { Exercise, LevelId } from '../../../content/content-types'
import type { AiGradingResult } from '../../../services/api-client'
import { matchesAnyAnswer, normalizeAnswer, sentenceSimilarity } from '../../../services/answer-checking'
import { diffAgainstCorrect, editDistance, fillBlankTokens, findTypoMatch, normalizeWord, type DiffToken } from './answer-diff'
import type { HintLevel } from './hint-ladder'

/* ============================ câu trả lời đặc biệt ============================ */

/** Bài nói: kết quả nhận diện giọng nói (JSON phía sau tiền tố) */
export const SPEECH_PREFIX = '__speech__:'
/** Bài nói: máy không có / không mở được micro -> không tính điểm */
export const NO_MIC_ANSWER = '__no_mic__'
/** Bài nói: người học tự nghe so sánh và thấy "Giống rồi" */
export const SELF_SAME_ANSWER = '__self_same__'
/** Bài nói: tự so sánh thấy "Chưa giống" -> không phạt, ôn sau */
export const SELF_NOT_YET_ANSWER = '__self_not_yet__'
/** Bài AI chấm xong: JSON kết quả phía sau tiền tố */
export const AI_DONE_PREFIX = '__ai_done__:'
/** AI lỗi / người học bỏ qua bài AI -> không tính sai */
export const AI_FAILED_ANSWER = '__ai_failed__'

/** Độ giống tối thiểu (0..1) để câu đọc to được tính là đúng. */
export const SPEAKING_SIMILARITY_REQUIRED = 0.7

/** Dạng bài tự "nộp" (không cần nút Kiểm tra chung): nói, viết AI chấm. */
export const SELF_SUBMITTING_TYPES: Exercise['type'][] = ['speak-sentence', 'speak-answer', 'write-answer']
/** Dạng bài AI chấm (hiện nhận xét ngay trong bài, không có "đúng/sai"). */
export const AI_GRADED_TYPES: Exercise['type'][] = ['speak-answer', 'write-answer']
/** Dạng bài gõ chữ (hiện mẹo tắt Unikey ở câu gõ đầu tiên). */
export const TYPING_TYPES: Exercise['type'][] = ['fill-blank', 'listen-type']

/* ================================== kiểu ================================== */

/**
 * 3 màu phản hồi (spec 04 cuối file):
 *   correct = xanh · wrong = cam san hô · unclear = vàng "máy chưa nghe rõ" (không tính sai, không phạt)
 */
export type Verdict = 'correct' | 'wrong' | 'unclear'

/** Mức nghe rõ của từng từ trong bài đọc to (tô 3 màu kiểu ELSA, không hiện %). */
export type SpokenWordMark = 'heard' | 'almost' | 'missed'

export interface CheckOutcome {
  verdict: Verdict
  /** đáp án đúng dạng chữ (hiện cho người học, lưu sổ lỗi) */
  correctAnswerText: string
  /** đáp án chia thành từng mảnh, mảnh differs = true được tô nổi */
  correctTokens: DiffToken[] | null
  /** câu trả lời của người học dạng chữ */
  userAnswerText: string
  /** câu hỏi dạng chữ (sổ lỗi, hỏi AI) */
  questionText: string
  /** đúng nhưng có 1 lỗi gõ nhỏ */
  typo?: { typed: string; fixed: string }
  /** dòng "Nghĩa là…" tiếng Việt (ghép câu, đọc to) */
  meaningVi?: string
  /** đọc to: từng từ của câu mẫu + mức nghe rõ */
  spokenWords?: { text: string; mark: SpokenWordMark }[]
  /** đọc to: máy nghe được gì */
  heardText?: string
  /** đọc to: máy không có micro */
  noMic?: boolean
  /** bài AI chấm: kết quả (null = AI lỗi / bỏ qua) */
  aiResult?: AiGradingResult | null
  /** người học bấm "Xem lời giải" (nấc 3 của thang gợi ý) */
  sawSolution?: boolean
  /** người học bấm "Bỏ qua" */
  skipped?: boolean
}

/** Props chung của mọi component dạng bài. */
export interface ExerciseViewProps<T extends Exercise = Exercise> {
  exercise: T
  /** null = đang trả lời; có giá trị = đã kiểm tra (khoá + tô màu) */
  outcome: CheckOutcome | null
  /** nấc gợi ý đang mở (0 = chưa dùng, 3 = đã xem lời giải) */
  hintLevel: HintLevel
  /** lần làm thứ mấy (0 = lần đầu, 1+ = "Câu sai lúc nãy") — đổi thứ tự đáp án để không nhớ vị trí */
  attempt?: number
  /** báo câu trả lời hiện tại (null = chưa trả lời xong -> nút Kiểm tra mờ) */
  onAnswerChange: (answer: string | null) => void
  /** bài tự nộp (nói / AI chấm) gọi hàm này khi xong — trang cha chấm luôn, không chờ Enter */
  onSubmit: (answer: string) => void
  /** hiện mẹo "tắt Unikey" (câu gõ chữ đầu tiên của buổi học) */
  showTypingTip: boolean
  onDismissTypingTip: () => void
  /** band mục tiêu của level (gửi AI chấm cho hợp trình độ) */
  targetBand?: string
  levelId?: LevelId
}

/* ============================== hàm tiện ích ============================== */

export function isSelfSubmitting(exercise: Exercise): boolean {
  return SELF_SUBMITTING_TYPES.includes(exercise.type)
}

/** Câu hỏi dạng chữ ngắn gọn (sổ lỗi, gửi AI giải thích). */
export function questionTextOf(exercise: Exercise): string {
  switch (exercise.type) {
    case 'multiple-choice':
      return exercise.question
    case 'listen-choose':
      return `🔊 "${exercise.audioText}" — ${exercise.question}`
    case 'fill-blank':
      return exercise.sentence
    case 'arrange-words':
      return exercise.translationVi
    case 'match-pairs':
      return exercise.pairs.map((pair) => pair.left).join(', ')
    case 'true-false':
      return exercise.statement
    case 'listen-type':
      return `🔊 ${exercise.audioText}`
    case 'speak-sentence':
      return exercise.sentence
    case 'speak-answer':
      return exercise.question
    case 'write-answer':
      return exercise.prompt
  }
}

/** Đáp án đúng dạng chữ. */
export function correctAnswerOf(exercise: Exercise): string {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose':
      return exercise.options[exercise.correctIndex]
    case 'fill-blank':
      return exercise.sentence.replace('___', exercise.acceptedAnswers[0])
    case 'arrange-words':
      return exercise.correctSentence
    case 'match-pairs':
      return exercise.pairs.map((pair) => `${pair.left} = ${pair.right}`).join('; ')
    case 'true-false':
      return exercise.answer
    case 'listen-type':
      return exercise.acceptedAnswers[0]
    case 'speak-sentence':
      return exercise.sentence
    case 'speak-answer':
    case 'write-answer':
      return exercise.sampleAnswer
  }
}

/** Câu trả lời "đáp án đúng" dạng chuỗi — dùng khi người học xem lời giải (nấc 3). */
export function solutionAnswerOf(exercise: Exercise): string {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose':
      return String(exercise.correctIndex)
    case 'true-false':
      return exercise.answer
    case 'fill-blank':
    case 'listen-type':
      return exercise.acceptedAnswers[0]
    case 'arrange-words':
      return exercise.correctSentence
    case 'match-pairs':
      return '0|'
    default:
      return ''
  }
}

/** Tách câu trả lời của bài nối cặp: "2|0,3" -> { wrong: 2, missed: [0, 3] } */
export function parseMatchAnswer(answer: string): { wrong: number; missed: number[] } {
  const [wrongText, missedText = ''] = answer.split('|')
  return {
    wrong: Number(wrongText) || 0,
    missed: missedText
      .split(',')
      .filter(Boolean)
      .map(Number)
      .filter((n) => Number.isInteger(n)),
  }
}

/** Đọc to: chấm từng từ của câu mẫu theo những gì máy nghe được. */
export function markSpokenWords(sentence: string, heard: string): { text: string; mark: SpokenWordMark }[] {
  const heardWords = heard.split(/\s+/).map(normalizeWord).filter(Boolean)
  const tokens = diffAgainstCorrect(heard, sentence)
  return tokens.map((token) => {
    if (!token.differs) return { text: token.text, mark: 'heard' as const }
    const target = normalizeWord(token.text)
    // gần đúng: máy nghe ra 1 từ na ná (lệch ≤ 2 ký tự với từ đủ dài) — VD "think" -> "sink"
    const almost = target.length >= 3 && heardWords.some((word) => editDistance(word, target) <= (target.length >= 4 ? 2 : 1))
    return { text: token.text, mark: almost ? ('almost' as const) : ('missed' as const) }
  })
}

/* ================================ CHẤM BÀI ================================ */

/** Chấm 1 câu trả lời. Thuần (không React), dùng được cả trong "Ôn lại câu sai". */
export function checkExerciseAnswer(exercise: Exercise, answer: string): CheckOutcome {
  const base = {
    correctAnswerText: correctAnswerOf(exercise),
    questionText: questionTextOf(exercise),
    userAnswerText: answer,
  }

  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose': {
      const chosen = exercise.options[Number(answer)] ?? ''
      const isCorrect = Number(answer) === exercise.correctIndex
      return {
        ...base,
        verdict: isCorrect ? 'correct' : 'wrong',
        userAnswerText: chosen,
        correctTokens: diffAgainstCorrect(chosen, exercise.options[exercise.correctIndex]),
      }
    }

    case 'true-false':
      return {
        ...base,
        verdict: answer === exercise.answer ? 'correct' : 'wrong',
        correctTokens: [{ text: exercise.answer, differs: true }],
      }

    case 'fill-blank': {
      if (matchesAnyAnswer(answer, exercise.acceptedAnswers)) {
        return { ...base, verdict: 'correct', correctTokens: fillBlankTokens(exercise.sentence, answer.trim()) }
      }
      const typo = findTypoMatch(answer, exercise.acceptedAnswers)
      if (typo) {
        return {
          ...base,
          verdict: 'correct',
          typo: { typed: typo.typedWord, fixed: typo.fixedWord },
          correctTokens: fillBlankTokens(exercise.sentence, typo.accepted),
        }
      }
      return { ...base, verdict: 'wrong', correctTokens: fillBlankTokens(exercise.sentence, exercise.acceptedAnswers[0]) }
    }

    case 'listen-type': {
      if (matchesAnyAnswer(answer, exercise.acceptedAnswers)) {
        return { ...base, verdict: 'correct', correctTokens: diffAgainstCorrect(answer, exercise.acceptedAnswers[0]) }
      }
      const typo = findTypoMatch(answer, exercise.acceptedAnswers)
      if (typo) {
        const tokens = exercise.acceptedAnswers[0].split(/\s+/).map((text) => ({ text, differs: normalizeWord(text) === typo.fixedWord }))
        return { ...base, verdict: 'correct', typo: { typed: typo.typedWord, fixed: typo.fixedWord }, correctTokens: tokens }
      }
      // so với đáp án gần nhất để tô chữ khác biệt
      const closest = [...exercise.acceptedAnswers].sort(
        (a, b) => sentenceSimilarity(answer, b) - sentenceSimilarity(answer, a),
      )[0]
      return { ...base, verdict: 'wrong', correctAnswerText: closest, correctTokens: diffAgainstCorrect(answer, closest) }
    }

    case 'arrange-words': {
      const isCorrect = matchesAnyAnswer(answer, [exercise.correctSentence])
      return {
        ...base,
        verdict: isCorrect ? 'correct' : 'wrong',
        correctTokens: diffAgainstCorrect(answer, exercise.correctSentence),
        meaningVi: exercise.translationVi,
      }
    }

    case 'match-pairs': {
      const { wrong, missed } = parseMatchAnswer(answer)
      // nối sai tối đa 1 lần vẫn tính là đúng (nhầm tay)
      const isCorrect = wrong <= 1
      const missedPairs = missed.map((index) => exercise.pairs[index]).filter(Boolean)
      const shown = missedPairs.length ? missedPairs : exercise.pairs
      return {
        ...base,
        verdict: isCorrect ? 'correct' : 'wrong',
        userAnswerText: `${wrong}×`,
        correctAnswerText: shown.map((pair) => `${pair.left} = ${pair.right}`).join(' · '),
        correctTokens: null,
      }
    }

    case 'speak-sentence': {
      const meaningVi = exercise.translationVi
      if (answer === NO_MIC_ANSWER) {
        return { ...base, verdict: 'unclear', noMic: true, correctTokens: null, userAnswerText: '', meaningVi }
      }
      if (answer === SELF_SAME_ANSWER) return { ...base, verdict: 'correct', correctTokens: null, userAnswerText: '', meaningVi }
      if (answer === SELF_NOT_YET_ANSWER) return { ...base, verdict: 'unclear', correctTokens: null, userAnswerText: '', meaningVi }
      let alternatives: string[] = []
      try {
        const parsed = JSON.parse(answer.slice(SPEECH_PREFIX.length)) as { alternatives?: string[] }
        alternatives = (parsed.alternatives ?? []).filter((text) => typeof text === 'string')
      } catch {
        alternatives = []
      }
      // lấy phương án máy nghe được giống câu mẫu nhất
      const best = alternatives.sort((a, b) => sentenceSimilarity(b, exercise.sentence) - sentenceSimilarity(a, exercise.sentence))[0] ?? ''
      const similarity = best ? sentenceSimilarity(best, exercise.sentence) : 0
      return {
        ...base,
        // KHÔNG BAO GIỜ "sai" ở bài nói: chưa đủ giống = máy chưa nghe rõ (vàng, không phạt)
        verdict: similarity >= SPEAKING_SIMILARITY_REQUIRED ? 'correct' : 'unclear',
        userAnswerText: best,
        heardText: best,
        spokenWords: markSpokenWords(exercise.sentence, best),
        correctTokens: null,
        meaningVi,
      }
    }

    case 'speak-answer':
    case 'write-answer': {
      if (answer.startsWith(AI_DONE_PREFIX)) {
        let aiResult: AiGradingResult | null = null
        try {
          aiResult = JSON.parse(answer.slice(AI_DONE_PREFIX.length)) as AiGradingResult
        } catch {
          aiResult = null
        }
        return { ...base, verdict: 'correct', userAnswerText: '', correctTokens: null, aiResult }
      }
      return { ...base, verdict: 'unclear', userAnswerText: '', correctTokens: null, aiResult: null }
    }
  }
}

/** Kết quả khi người học bấm "Xem lời giải": tính như chưa đúng (câu quay lại cuối bài), không phạt thêm. */
export function solutionOutcome(exercise: Exercise): CheckOutcome {
  const outcome = checkExerciseAnswer(exercise, solutionAnswerOf(exercise))
  const tokens =
    exercise.type === 'fill-blank'
      ? fillBlankTokens(exercise.sentence, exercise.acceptedAnswers[0])
      : (outcome.correctTokens?.map((token) => ({ ...token, differs: exercise.type === 'arrange-words' || exercise.type === 'listen-type' ? false : token.differs })) ?? null)
  return { ...outcome, verdict: 'wrong', sawSolution: true, userAnswerText: '', correctTokens: tokens }
}

/**
 * Kết quả khi người học bấm "Bỏ qua":
 *  - bài nói / AI chấm: không tính điểm (vàng) — có thể đang ở chỗ ồn, không có micro…
 *  - bài khác: như chưa đúng (hiện đáp án, câu quay lại cuối bài)
 */
export function skipOutcome(exercise: Exercise): CheckOutcome {
  if (isSelfSubmitting(exercise)) {
    return { ...checkExerciseAnswer(exercise, exercise.type === 'speak-sentence' ? SELF_NOT_YET_ANSWER : AI_FAILED_ANSWER), skipped: true }
  }
  return { ...solutionOutcome(exercise), sawSolution: false, skipped: true }
}

/** So sánh 2 câu trả lời đã chuẩn hoá (dùng kiểm tra "đã thay đổi chưa"). */
export function sameAnswer(a: string | null, b: string | null): boolean {
  if (a === null || b === null) return a === b
  return normalizeAnswer(a) === normalizeAnswer(b)
}
