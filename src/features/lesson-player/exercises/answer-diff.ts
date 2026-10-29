/**
 * answer-diff.ts — SO SÁNH CÂU TRẢ LỜI VỚI ĐÁP ÁN ĐỂ "TÔ ĐÚNG CHỮ KHÁC BIỆT"
 * ----------------------------------------------------------------------------
 * Khi người học trả lời chưa đúng, khung phản hồi hiện đáp án đúng và TÔ NỔI
 * những từ khác với câu của họ (spec 04 cuối file: "tô đúng chữ/từ khác biệt").
 *
 *   diffAgainstCorrect('I is a student', 'I am a student.')
 *   -> [{text:'I',differs:false},{text:'am',differs:true},{text:'a',...},{text:'student.',...}]
 *
 * Cách làm: tìm "dãy con chung dài nhất" (LCS) giữa 2 dãy từ đã chuẩn hoá
 * (chữ thường, bỏ dấu câu). Từ nào của đáp án KHÔNG nằm trong dãy chung = khác biệt.
 *
 * Ngoài ra: chấp nhận LỖI CHÍNH TẢ NHỎ (1 ký tự) như Duolingo — vẫn tính đúng
 * nhưng chỉ ra cách viết chuẩn. Cẩn thận không "tha" lỗi ngữ pháp: thêm/bớt đuôi
 * -s, -es, -d, -ed (read ↔ reads) KHÔNG được coi là lỗi chính tả.
 * ----------------------------------------------------------------------------
 */
import { normalizeAnswer } from '../../../services/answer-checking'

export interface DiffToken {
  /** chữ hiển thị (giữ nguyên hoa/thường và dấu câu của đáp án) */
  text: string
  /** true = từ này khác với câu người học -> tô nổi */
  differs: boolean
}

/** Chuẩn hoá 1 từ để so: chữ thường, bỏ dấu câu ở 2 đầu, nháy cong -> thẳng. */
export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '')
}

/** Bảng LCS: trả về mảng cờ "từ thứ j của b có nằm trong dãy chung không". */
function lcsMembership(a: string[], b: string[]): boolean[] {
  const table = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      table[i][j] = a[i - 1] === b[j - 1] ? table[i - 1][j - 1] + 1 : Math.max(table[i - 1][j], table[i][j - 1])
    }
  }
  // đi ngược bảng để đánh dấu các từ của b thuộc dãy chung
  const inCommon = new Array<boolean>(b.length).fill(false)
  let i = a.length
  let j = b.length
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      inCommon[j - 1] = true
      i--
      j--
    } else if (table[i - 1][j] >= table[i][j - 1]) i--
    else j--
  }
  return inCommon
}

/** Tô các từ trong đáp án đúng mà câu người học không có (đúng thứ tự). */
export function diffAgainstCorrect(userText: string, correctText: string): DiffToken[] {
  const userWords = userText.split(/\s+/).map(normalizeWord).filter(Boolean)
  const correctWords = correctText.split(/\s+/).filter(Boolean)
  const inCommon = lcsMembership(userWords, correctWords.map(normalizeWord))
  return correctWords.map((text, index) => ({ text, differs: !inCommon[index] && normalizeWord(text) !== '' }))
}

/**
 * Câu đáp án có 1 chỗ trống được điền -> tô riêng từ điền vào.
 * VD fillBlankTokens('My ___ is Lan.', 'name') -> "My [name] is Lan."
 */
export function fillBlankTokens(sentence: string, answer: string): DiffToken[] {
  const [before = '', after = ''] = sentence.split('___')
  const tokens: DiffToken[] = []
  if (before.trim()) tokens.push({ text: before.trimEnd(), differs: false })
  tokens.push({ text: answer, differs: true })
  if (after.trim()) tokens.push({ text: after.trimStart(), differs: false })
  // nối lại dấu câu dính liền: "Lan." không cần dấu cách phía trước nếu after bắt đầu bằng dấu câu
  return tokens
}

/* ----------------------------- lỗi chính tả nhỏ ----------------------------- */

/** Khoảng cách Damerau (OSA): số thao tác thêm / xoá / thay / đổi chỗ 2 ký tự liền nhau. */
export function editDistance(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const d = Array.from({ length: rows }, (_, i) => {
    const row = new Array<number>(cols).fill(0)
    row[0] = i
    return row
  })
  for (let j = 0; j < cols; j++) d[0][j] = j
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
    }
  }
  return d[a.length][b.length]
}

/** Khác nhau chỉ ở đuôi ngữ pháp (-s/-es/-d/-ed) -> đó là lỗi ngữ pháp, không phải chính tả. */
function differsOnlyByInflection(a: string, b: string): boolean {
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a]
  if (!longer.startsWith(shorter)) return false
  return ['s', 'es', 'd', 'ed'].includes(longer.slice(shorter.length))
}

/** 2 từ chỉ lệch 1 lỗi gõ nhỏ (từ đủ dài, không phải lỗi đuôi ngữ pháp). */
export function isSmallTypo(typed: string, correct: string): boolean {
  if (typed === correct || correct.length < 4) return false
  if (differsOnlyByInflection(typed, correct)) return false
  return editDistance(typed, correct) === 1
}

export interface TypoMatch {
  /** đáp án được chấp nhận khớp gần đúng */
  accepted: string
  /** từ người học gõ sai */
  typedWord: string
  /** từ đúng */
  fixedWord: string
}

/**
 * Câu người học có khớp 1 đáp án nếu "tha" đúng 1 lỗi chính tả nhỏ ở 1 từ không?
 * Các từ khác phải khớp hoàn toàn (sau chuẩn hoá). Trả về null nếu không.
 */
export function findTypoMatch(userAnswer: string, acceptedAnswers: string[]): TypoMatch | null {
  const userWords = normalizeAnswer(userAnswer).split(' ').filter(Boolean)
  for (const accepted of acceptedAnswers) {
    const acceptedWords = normalizeAnswer(accepted).split(' ').filter(Boolean)
    if (acceptedWords.length !== userWords.length) continue
    let typo: { typedWord: string; fixedWord: string } | null = null
    let ok = true
    for (let i = 0; i < acceptedWords.length; i++) {
      if (userWords[i] === acceptedWords[i]) continue
      if (!typo && isSmallTypo(userWords[i], acceptedWords[i])) {
        typo = { typedWord: userWords[i], fixedWord: acceptedWords[i] }
        continue
      }
      ok = false
      break
    }
    if (ok && typo) return { accepted, ...typo }
  }
  return null
}

/** Có chữ tiếng Việt có dấu không (dấu hiệu bộ gõ Unikey đang bật khi gõ tiếng Anh). */
export function looksLikeVietnameseIme(text: string): boolean {
  return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(text)
}
