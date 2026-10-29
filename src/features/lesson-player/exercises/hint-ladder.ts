/**
 * hint-ladder.ts — THANG GỢI Ý 3 NẤC (học từ Khan Academy)
 * ----------------------------------------------------------------------------
 *   nấc 1  gợi ý nhẹ   (loại 1 đáp án sai / chữ cái đầu / xếp sẵn từ đầu tiên…)
 *   nấc 2  gợi ý mạnh  (còn 2 lựa chọn / khung chữ / xếp sẵn nửa câu…)
 *   nấc 3  lời giải    (hiện đáp án -> câu này quay lại cuối bài để tự làm)
 *
 * Tinh thần: người học bí thì có lối ra, nhưng vẫn phải tự nhớ nhiều nhất có thể
 * (retrieval practice). Dùng gợi ý nấc 1–2 mà làm đúng vẫn tính đúng (XP giảm một nửa);
 * xem lời giải = câu đó chưa thuộc -> làm lại cuối bài + vào lịch ôn.
 *
 * Mọi hàm ở đây là hàm thuần: cùng bài + cùng nấc -> luôn cùng kết quả
 * (đáp án bị loại cố định theo id bài, mở lại bài vẫn y hệt).
 * ----------------------------------------------------------------------------
 */
import type { Exercise } from '../../../content/content-types'
import type { LessonText } from '../lesson-player-text'

export type HintLevel = 0 | 1 | 2 | 3

/** Số nấc gợi ý TRƯỚC lời giải (0 = bài này không có gợi ý). */
export function hintStepsOf(exercise: Exercise): 0 | 1 | 2 {
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose':
      return exercise.options.length >= 4 ? 2 : 1
    case 'true-false':
      return exercise.allowNotGiven ? 2 : 1
    case 'fill-blank':
    case 'listen-type':
    case 'arrange-words':
      return 2
    case 'match-pairs':
      return exercise.pairs.length >= 4 ? 2 : 1
    default:
      // bài nói / viết tự do: không có "đáp án" để gợi ý -> dùng "Gợi ý cách trả lời" trong bài
      return 0
  }
}

/** Số giả ngẫu nhiên cố định theo chuỗi (cùng id -> cùng thứ tự). */
function seededOrder(seedText: string, items: number[]): number[] {
  let seed = 7
  for (let i = 0; i < seedText.length; i++) seed = (Math.imul(seed, 31) + seedText.charCodeAt(i)) >>> 0
  const order = [...items]
  for (let i = order.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    const j = seed % (i + 1)
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/** Trắc nghiệm: vị trí GỐC các đáp án sai bị "loại" ở nấc hiện tại. */
export function eliminatedOptions(exercise: Exercise, level: HintLevel): number[] {
  if (level === 0) return []
  if (exercise.type === 'multiple-choice' || exercise.type === 'listen-choose') {
    const wrong = exercise.options.map((_, i) => i).filter((i) => i !== exercise.correctIndex)
    const count = level >= 3 ? wrong.length : Math.min(level, Math.max(0, wrong.length - 1))
    return seededOrder(exercise.id, wrong).slice(0, count)
  }
  return []
}

/** Đúng/Sai/Không có thông tin: đáp án bị loại (chỉ khi có 3 lựa chọn, nấc 2). */
export function eliminatedTrueFalse(exercise: Exercise, level: HintLevel): string[] {
  if (exercise.type !== 'true-false' || !exercise.allowNotGiven || level < 2) return []
  const wrong = (['TRUE', 'FALSE', 'NOT GIVEN'] as const).filter((choice) => choice !== exercise.answer)
  return [wrong[exercise.id.length % wrong.length]]
}

/** Ghép câu: số từ đầu câu được xếp sẵn. */
export function arrangePrefixCount(exercise: Exercise, level: HintLevel): number {
  if (exercise.type !== 'arrange-words' || level === 0) return 0
  const words = exercise.correctSentence.split(' ').length
  if (level >= 3) return words
  if (level === 1) return 1
  return Math.max(2, Math.floor(words / 2))
}

/** Nối cặp: các cặp (vị trí gốc) được nối sẵn. */
export function revealedPairs(exercise: Exercise, level: HintLevel): number[] {
  if (exercise.type !== 'match-pairs' || level === 0) return []
  const order = seededOrder(exercise.id, exercise.pairs.map((_, i) => i))
  if (level >= 3) return order
  return order.slice(0, level)
}

/** Che chữ: "name" -> "n _ _ e" (giữ chữ đầu + cuối). */
function maskWord(word: string, keepLast: boolean): string {
  const letters = [...word]
  return letters.map((char, i) => (i === 0 || (keepLast && i === letters.length - 1) || !/[a-z]/i.test(char) ? char : '_')).join(' ')
}

/** Khung câu: "What is your name?" -> "W___ i_ y___ n___?" */
function sentenceFrame(sentence: string): string {
  return sentence
    .split(' ')
    .map((word) => word.replace(/^([^a-z]*[a-z])([a-z']*)/i, (_m, first: string, rest: string) => first + '_'.repeat(rest.length)))
    .join(' ')
}

/** Câu gợi ý hiện cho người học ở nấc hiện tại (null = không có chữ). */
export function hintMessage(exercise: Exercise, level: HintLevel, text: LessonText): string | null {
  if (level === 0 || level >= 3) return null
  switch (exercise.type) {
    case 'multiple-choice':
    case 'listen-choose': {
      const removed = eliminatedOptions(exercise, level).length
      const line = text.hintEliminated(removed)
      return exercise.type === 'listen-choose' && level === 1 ? `${line} ${text.hintListenSlow}` : line
    }
    case 'true-false': {
      if (level === 1) return text.hintTfLook
      const removed = eliminatedTrueFalse(exercise, level)[0]
      return removed ? text.hintTfOneOut(removed) : text.hintTfLook
    }
    case 'fill-blank': {
      const answer = exercise.acceptedAnswers[0]
      // gợi ý có sẵn trong đề (VD "(be)") đã luôn hiện dưới câu -> nấc 1 cho chữ cái đầu
      if (level === 1) return text.hintFirstLetter(answer[0], answer.replace(/\s/g, '').length)
      return text.hintLetters(answer.split(' ').map((word) => maskWord(word, word.length > 2)).join('   '))
    }
    case 'listen-type': {
      const answer = exercise.acceptedAnswers[0]
      const words = answer.split(' ')
      if (level === 1) return `${text.hintWordCount(words.length, words[0])} ${text.hintListenSlow}`
      return text.hintMasked(sentenceFrame(answer))
    }
    case 'arrange-words': {
      const first = exercise.correctSentence.split(' ')[0]
      return level === 1 ? text.hintFirstWord(first) : text.hintHalfSentence
    }
    case 'match-pairs':
      return text.hintPairs(revealedPairs(exercise, level).length)
    default:
      return null
  }
}
