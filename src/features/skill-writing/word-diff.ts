/**
 * word-diff.ts — SO 2 BẢN NHÁP THEO TỪNG TỪ (cho tab "Thay đổi", kiểu Write & Improve)
 * ----------------------------------------------------------------------------
 * Thuật toán "dãy con chung dài nhất" (LCS) trên danh sách từ:
 *   - từ có ở cả 2 bản theo cùng thứ tự  -> 'same'
 *   - chỉ có ở bản cũ                     -> 'removed' (gạch ngang)
 *   - chỉ có ở bản mới                    -> 'added'   (nền xanh)
 * Mỗi "token" = 1 từ + khoảng trắng/xuống dòng theo sau, nên ghép lại vẫn giữ đúng đoạn văn.
 * Bài viết ≤ ~600 từ -> bảng 600×600 = 360 nghìn ô, chạy tức thì.
 * ----------------------------------------------------------------------------
 */

export interface DiffPart {
  type: 'same' | 'added' | 'removed'
  text: string
}

const MAX_CELLS = 1_500_000 // phòng bài quá dài: vượt thì so theo đoạn thay vì theo từ

function tokenize(text: string): string[] {
  return text.match(/\S+\s*|\s+/g) ?? []
}

/** So khớp 2 token: bỏ qua khoảng trắng theo sau (thêm 1 dấu cách không tính là sửa). */
function sameWord(a: string, b: string): boolean {
  return a.trim() === b.trim()
}

export function diffWords(before: string, after: string): DiffPart[] {
  let oldTokens = tokenize(before)
  let newTokens = tokenize(after)
  if (oldTokens.length * newTokens.length > MAX_CELLS) {
    // quá dài: so theo đoạn
    oldTokens = before.split(/(?<=\n)/)
    newTokens = after.split(/(?<=\n)/)
  }
  const n = oldTokens.length
  const m = newTokens.length

  // lcs[i][j] = độ dài LCS của oldTokens[i..] và newTokens[j..] (lưu phẳng 1 mảng cho nhanh)
  const width = m + 1
  const lcs = new Uint16Array((n + 1) * (m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i * width + j] = sameWord(oldTokens[i], newTokens[j])
        ? lcs[(i + 1) * width + j + 1] + 1
        : Math.max(lcs[(i + 1) * width + j], lcs[i * width + j + 1])
    }
  }

  // Đi từ đầu, chọn hướng theo bảng -> danh sách phần, gộp các phần cùng loại liền nhau
  const parts: DiffPart[] = []
  const push = (type: DiffPart['type'], text: string) => {
    const last = parts[parts.length - 1]
    if (last && last.type === type) last.text += text
    else parts.push({ type, text })
  }
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (sameWord(oldTokens[i], newTokens[j])) {
      push('same', newTokens[j])
      i++
      j++
    } else if (lcs[(i + 1) * width + j] >= lcs[i * width + j + 1]) {
      push('removed', oldTokens[i++])
    } else {
      push('added', newTokens[j++])
    }
  }
  while (i < n) push('removed', oldTokens[i++])
  while (j < m) push('added', newTokens[j++])
  return parts
}

/** Đếm nhanh: bao nhiêu từ thêm / bớt (hiện trên tab "Thay đổi (+12 −5)"). */
export function diffStats(parts: DiffPart[]): { added: number; removed: number } {
  const words = (text: string) => text.split(/\s+/).filter(Boolean).length
  return parts.reduce(
    (acc, part) => {
      if (part.type === 'added') acc.added += words(part.text)
      if (part.type === 'removed') acc.removed += words(part.text)
      return acc
    },
    { added: 0, removed: 0 },
  )
}
