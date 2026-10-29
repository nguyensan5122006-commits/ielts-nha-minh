/**
 * blank-word.ts — ĐỤC LỖ TỪ ĐANG ÔN TRONG CÂU VÍ DỤ
 * ----------------------------------------------------------------------------
 * Mặt trước thẻ (người học band ≥ 2.0) là: nghĩa tiếng Việt + câu ví dụ có CHỖ TRỐNG
 * đúng vị trí của từ -> người học phải tự nhớ ra từ tiếng Anh (thẻ "hướng sản sinh",
 * psych-adult D8 luật 35). Từ trong câu có thể đã chia: "go" -> "goes", "study" -> "studied".
 *
 *   splitAroundWord('She goes to work by bus.', 'go')
 *     -> { before: 'She ', match: 'goes', after: ' to work by bus.' }
 * Không tìm thấy -> null (giao diện sẽ không hiện câu tiếng Anh để khỏi lộ đáp án).
 * ----------------------------------------------------------------------------
 */

export interface WordSplit {
  before: string
  match: string
  after: string
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Các "gốc" để dò: go -> go; study -> stud(y|ies|ied); make -> mak(e|ing). */
function stemPatterns(word: string): string[] {
  const clean = word.trim().toLowerCase().replace(/^(to|a|an|the)\s+/, '')
  const patterns = [`${escapeRegExp(clean)}(?:s|es|ed|d|ing|er|est)?`]
  if (/[^aeiou]y$/.test(clean)) patterns.push(`${escapeRegExp(clean.slice(0, -1))}(?:ies|ied|ier|iest)`)
  if (/e$/.test(clean)) patterns.push(`${escapeRegExp(clean.slice(0, -1))}(?:ing|ed)`)
  // nhân đôi phụ âm cuối: stop -> stopped, run -> running
  if (/[^aeiou][aeiou][bdgmnprt]$/.test(clean)) patterns.push(`${escapeRegExp(clean)}${clean.slice(-1)}(?:ed|ing|er)`)
  return patterns
}

export function splitAroundWord(sentence: string, word: string): WordSplit | null {
  for (const pattern of stemPatterns(word)) {
    const regex = new RegExp(`(^|[^A-Za-z'])(${pattern})(?=[^A-Za-z']|$)`, 'i')
    const found = regex.exec(sentence)
    if (found) {
      const start = found.index + found[1].length
      const match = found[2]
      return { before: sentence.slice(0, start), match, after: sentence.slice(start + match.length) }
    }
  }
  return null
}
