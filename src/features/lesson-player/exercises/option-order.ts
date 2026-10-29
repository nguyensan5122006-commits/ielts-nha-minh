/**
 * option-order.ts — THỨ TỰ HIỂN THỊ ĐÁP ÁN (xáo trộn nhưng CỐ ĐỊNH theo id câu hỏi)
 * ----------------------------------------------------------------------------
 *   stableOptionOrder('l1-vocab-01-ex01', ['Goodbye','Hello','Thank you','Good night'])
 *   -> [2, 0, 3, 1]  = hiện đáp án gốc số 2 đầu tiên…
 *
 * Mục đích: đáp án đúng không bị dồn vào 1 vị trí, nhưng mở lại bài (resume)
 * vẫn đúng thứ tự cũ -> phím 1–4 không "nhảy".
 * KHÔNG xáo khi đáp án đã có nhãn ("A. …", "B) …", "i. …", "iv. …") hoặc có
 * "all/none of the above" — vì đề có thể nhắc tới thứ tự đó (02-CONTENT-GUIDE).
 * ----------------------------------------------------------------------------
 */
export function stableOptionOrder(seedText: string, options: string[]): number[] {
  const original = options.map((_, i) => i)
  const isLabelled = (option: string) => /^[A-J]([.)]|\s*$)/.test(option.trim()) || /^[ivx]+[.)]\s/i.test(option.trim())
  if (options.some((option) => isLabelled(option) || /all of the above|none of the above/i.test(option))) return original
  // tạo số "giả ngẫu nhiên" từ id câu hỏi (cùng id -> cùng dãy số)
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

/** Trộn ngẫu nhiên thật (Fisher–Yates), trả về mảng mới. */
export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Trộn cố định theo chuỗi hạt giống (ghép câu, nối cặp: mở lại bài vẫn cùng thứ tự). */
export function seededShuffle<T>(seedText: string, items: T[]): T[] {
  const order = stableOptionOrderUnlabelled(seedText, items.length)
  return order.map((index) => items[index])
}

function stableOptionOrderUnlabelled(seedText: string, count: number): number[] {
  return stableOptionOrder(seedText, Array.from({ length: count }, (_, i) => `option-${i}`))
}
