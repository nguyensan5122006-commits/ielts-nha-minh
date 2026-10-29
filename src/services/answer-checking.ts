/**
 * answer-checking.ts
 * ----------------------------------------------------------------------------
 * Các hàm so sánh câu trả lời "dễ tính" như Duolingo:
 *  - không phân biệt HOA / thường
 *  - bỏ qua dấu câu và khoảng trắng thừa
 *  - chấp nhận viết tắt phổ biến (I'm = I am ...)
 * ----------------------------------------------------------------------------
 */

const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am',
  "you're": 'you are',
  "he's": 'he is',
  "she's": 'she is',
  "it's": 'it is',
  "we're": 'we are',
  "they're": 'they are',
  "don't": 'do not',
  "doesn't": 'does not',
  "didn't": 'did not',
  "isn't": 'is not',
  "aren't": 'are not',
  "can't": 'cannot',
  "won't": 'will not',
  "what's": 'what is',
  "that's": 'that is',
  "there's": 'there is',
  "let's": 'let us',
}

/** Chuẩn hoá câu: chữ thường, bỏ dấu câu, mở rộng viết tắt, gộp khoảng trắng. */
export function normalizeAnswer(text: string): string {
  let result = text
    .toLowerCase()
    .replace(/[’‘`]/g, "'") // dấu nháy cong -> thẳng
    .trim()
  for (const [short, full] of Object.entries(CONTRACTIONS)) {
    result = result.replace(new RegExp(`\\b${short.replace("'", "'")}(?=\\s|$|[.,!?])`, 'g'), full)
  }
  return result
    .replace(/[.,!?;:"()\-–—]/g, ' ') // bỏ dấu câu
    .replace(/\s+/g, ' ')
    .trim()
}

/** Đúng nếu khớp 1 trong các đáp án được chấp nhận. */
export function matchesAnyAnswer(userAnswer: string, acceptedAnswers: string[]): boolean {
  const normalizedUser = normalizeAnswer(userAnswer)
  return acceptedAnswers.some((accepted) => normalizeAnswer(accepted) === normalizedUser)
}

/**
 * Độ giống nhau giữa 2 câu (0..1) dựa trên số từ trùng theo thứ tự (LCS).
 * Dùng cho bài đọc to: máy nhận giọng nói không hoàn hảo nên chỉ cần giống ~70%.
 */
export function sentenceSimilarity(spoken: string, target: string): number {
  const a = normalizeAnswer(spoken).split(' ').filter(Boolean)
  const b = normalizeAnswer(target).split(' ').filter(Boolean)
  if (b.length === 0) return 0
  // bảng quy hoạch động tìm dãy con chung dài nhất
  const table = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      table[i][j] = a[i - 1] === b[j - 1] ? table[i - 1][j - 1] + 1 : Math.max(table[i - 1][j], table[i][j - 1])
    }
  }
  return table[a.length][b.length] / Math.max(a.length, b.length)
}

/** Đếm số từ trong bài viết. */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}
