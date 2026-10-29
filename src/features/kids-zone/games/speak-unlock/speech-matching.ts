/**
 * speech-matching.ts — CHẤM "LỎNG" TỪ BÉ VỪA NÓI (psych-kids luật 32)
 * ----------------------------------------------------------------------------
 * Máy nhận diện giọng nói (Web Speech API) trả về 5–6 phương án chữ nó "nghe được".
 * Bé 9–11 tuổi phát âm tiếng Anh chưa chuẩn, máy lại hay nghe nhầm giọng trẻ con
 * -> phải chấm thật rộng tay. Coi là ĐÚNG nếu trong BẤT KỲ phương án nào:
 *   1. có đúng từ đó (bỏ qua hoa / thường, dấu câu, "a / an / the" đứng trước)
 *   2. hoặc 1 cụm chữ trong đó cách từ đích ≤ 1 lần sửa chữ (từ ≤ 5 chữ cái) / ≤ 2 lần (từ dài hơn)
 *      VD "cat" ~ "cats", "kat" · "elephant" ~ "elefant"
 *   3. thiếu / thừa đuôi -s, -es, -ed ("shoe" ~ "shoes", "jump" ~ "jumped")
 *   4. từ đồng âm ("two" ~ "to / too", "pear" ~ "pair"), số viết bằng chữ số ("2" ~ "two")
 *   5. từ ghép viết liền / tách / gạch nối ("ice cream" ~ "icecream", "T-shirt" ~ "t shirt")
 *   6. ĐỌC GẦN GIỐNG: so cả "khoá âm" (soundKey) — gộp ee/ea -> i, oo -> u, ph -> f, c -> k…
 *      VD bé nói nguyên âm ngắn "ship" cho "sheep" (lỗi rất hay gặp của người Việt) vẫn được nhận.
 * Hàm THUẦN (không đụng trình duyệt) -> dễ kiểm thử.
 * ----------------------------------------------------------------------------
 */

/** Nhóm từ đồng âm (đọc giống nhau) — máy hay viết ra từ khác trong nhóm. */
const HOMOPHONE_GROUPS: string[][] = [
  ['two', 'to', 'too', '2'],
  ['four', 'for', 'fore', '4'],
  ['eight', 'ate', '8'],
  ['one', 'won', '1'],
  ['pear', 'pair', 'pare'],
  ['sea', 'see', 'c'],
  ['bee', 'be', 'b'],
  ['tea', 't'],
  ['eye', 'i', 'aye'],
  ['sun', 'son'],
  ['tail', 'tale'],
  ['whale', 'wail', 'wale'],
  ['flower', 'flour'],
  ['night', 'knight'],
  ['write', 'right', 'rite'],
  ['hear', 'here'],
  ['blue', 'blew'],
  ['road', 'rode', 'rowed'],
  ['meet', 'meat'],
  ['week', 'weak'],
  ['hair', 'hare'],
  ['bear', 'bare'],
  ['deer', 'dear'],
  ['plane', 'plain'],
  ['mail', 'male'],
  ['knows', 'nose', 'noes'],
  ['no', 'know'],
  ['red', 'read'],
  ['grey', 'gray'],
  ['colour', 'color'],
  ['mum', 'mom', 'mam'],
  ['ok', 'okay'],
]

const NUMBER_WORDS: Record<string, string> = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '10': 'ten',
  '11': 'eleven',
  '12': 'twelve',
  '20': 'twenty',
  '100': 'hundred',
}

const ARTICLES = new Set(['a', 'an', 'the'])

/** Chữ thường, bỏ dấu câu, gạch nối -> cách, gộp khoảng trắng; số -> chữ. */
export function normalizeSpeech(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((token) => NUMBER_WORDS[token] ?? token)
    .join(' ')
}

/** Khoảng cách sửa chữ (Levenshtein): số lần thêm / bớt / thay 1 chữ cái để biến a thành b. */
export function editDistance(a: string, b: string): number {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const current = [i]
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost)
    }
    previous = current
  }
  return previous[b.length]
}

/** Bỏ đuôi -es / -s / -ed (để "shoes" ~ "shoe", "jumped" ~ "jump"). */
function stem(word: string): string {
  if (word.length > 4 && word.endsWith('es')) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith('ed')) return word.slice(0, -2)
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

/**
 * "Khoá âm" thô: viết lại từ theo cách ĐỌC gần đúng để so 2 từ đọc na ná nhau.
 * Không phải phiên âm thật — chỉ gộp vài cách viết cùng 1 âm mà trẻ hay đọc lẫn.
 */
export function soundKey(word: string): string {
  return word
    .replace(/ /g, '')
    .replace(/ph/g, 'f')
    .replace(/ck/g, 'k')
    .replace(/c(?=[eiy])/g, 's')
    .replace(/c/g, 'k')
    .replace(/(ee|ea|ie|ey)/g, 'i')
    .replace(/(oo|ou)/g, 'u')
    .replace(/([a-z])\1+/g, '$1')
    .replace(/(.{3,})e$/, '$1')
}

/** Các cách viết chấp nhận được của từ đích (đã chuẩn hoá). */
function acceptedForms(target: string): Set<string> {
  const base = normalizeSpeech(target)
    .split(' ')
    .filter((token, index, all) => !(index === 0 && all.length > 1 && ARTICLES.has(token)))
    .join(' ')
  const forms = new Set([base, base.replace(/ /g, ''), stem(base), stem(base.replace(/ /g, ''))])
  for (const group of HOMOPHONE_GROUPS) {
    if (group.includes(base)) group.forEach((word) => forms.add(word))
  }
  return forms
}

/** Số lần sửa chữ tối đa: từ ≤ 5 chữ cái -> 1, dài hơn -> 2 (luật 32). */
export const allowedEdits = (target: string) => (normalizeSpeech(target).replace(/ /g, '').length <= 5 ? 1 : 2)

export interface SpokenMatch {
  matched: boolean
  /** phương án máy nghe được gần đúng nhất (để gỡ lỗi — giao diện KHÔNG hiện chữ "Sai") */
  heard: string | null
}

/**
 * Bé có nói đúng từ không?
 * @param target       từ đích, VD "ice cream"
 * @param alternatives các phương án máy nghe được (5–6 phương án)
 */
export function matchSpokenWord(target: string, alternatives: string[]): SpokenMatch {
  const forms = acceptedForms(target)
  const targetFlat = normalizeSpeech(target).replace(/ /g, '')
  const wordCount = Math.max(1, normalizeSpeech(target).split(' ').length)
  const maxEdits = allowedEdits(target)
  let closest: { text: string; distance: number } | null = null

  for (const raw of alternatives) {
    const heard = normalizeSpeech(raw)
    if (!heard) continue
    const tokens = heard.split(' ').filter((token) => !ARTICLES.has(token))
    // mọi cụm liên tiếp dài 1..(số chữ của từ đích + 1) — máy hay tách / gộp từ ghép
    const pieces = new Set<string>([heard.replace(/ /g, '')])
    for (let size = 1; size <= wordCount + 1; size++) {
      for (let start = 0; start + size <= tokens.length; start++) {
        const piece = tokens.slice(start, start + size)
        pieces.add(piece.join(' '))
        pieces.add(piece.join(''))
      }
    }
    for (const piece of pieces) {
      if (forms.has(piece) || forms.has(stem(piece))) return { matched: true, heard: raw }
      const distance = Math.min(editDistance(piece.replace(/ /g, ''), targetFlat), editDistance(stem(piece.replace(/ /g, '')), stem(targetFlat)))
      if (distance <= maxEdits) return { matched: true, heard: raw }
      // đọc gần giống (nguyên âm dài / ngắn, c / k…): so "khoá âm"
      if (editDistance(soundKey(piece), soundKey(targetFlat)) <= maxEdits) return { matched: true, heard: raw }
      if (!closest || distance < closest.distance) closest = { text: raw, distance }
    }
  }
  return { matched: false, heard: closest?.text ?? null }
}
