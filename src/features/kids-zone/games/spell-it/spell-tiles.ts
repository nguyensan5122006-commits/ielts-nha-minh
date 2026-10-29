/**
 * spell-tiles.ts — CHUẨN BỊ "KHUÔN CHỮ" VÀ "Ô CHỮ CÁI" CHO TRÒ XẾP CHỮ
 * ----------------------------------------------------------------------------
 * Hàm THUẦN (không giao diện, không âm thanh) -> dễ đọc, dễ thử.
 *
 *   buildMold('ice cream')   -> 9 ô: i c e [cách] c r e a m   (ô cách/gạch nối/dấu ' điền sẵn)
 *   buildTiles('cat', 2)     -> các chữ của từ (xáo trộn) + vài chữ "nhiễu" tuỳ mức khó
 *
 * Mức khó (adaptive-difficulty.ts):
 *   1 (dễ)  : chỉ có đúng các chữ của từ  -> bé chỉ cần xếp lại thứ tự
 *   2 (vừa) : + 2 chữ nhiễu
 *   3 (khó) : + 3 chữ nhiễu, ưu tiên chữ "dễ nhầm" (b/d/p, m/n, a/e/o…)
 * Từ dài thì bớt chữ nhiễu để khay chữ không quá 2 hàng.
 * So sánh chữ KHÔNG phân biệt hoa thường (psych-kids luật 40).
 * ----------------------------------------------------------------------------
 */

/** 1 ô trong khuôn chữ. fixed = dấu cách / gạch nối / dấu ' -> điền sẵn, bé không phải xếp. */
export interface MoldSlot {
  index: number
  char: string
  fixed: boolean
}

/** 1 ô chữ cái bé bấm được. */
export interface LetterTile {
  id: string
  letter: string
  /** chữ nhiễu (không có trong từ) */
  isDistractor: boolean
}

/** Hai chữ cái giống nhau, không phân biệt hoa thường. */
export const sameLetter = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()

const isLetter = (char: string) => /[a-z]/i.test(char)

/** Khuôn chữ: mỗi ký tự 1 ô; ký tự không phải chữ cái thì điền sẵn. */
export function buildMold(word: string): MoldSlot[] {
  return word.split('').map((char, index) => ({ index, char, fixed: !isLetter(char) }))
}

/** Các ô bé phải điền, theo thứ tự từ trái sang phải. */
export const lettersToPlace = (mold: MoldSlot[]) => mold.filter((slot) => !slot.fixed)

/**
 * Chữ "dễ nhầm" với 1 chữ cái (hình giống / âm giống) — dùng làm chữ nhiễu ở mức khó.
 * VD từ "dog" -> nhiễu có thể là b, p, q (giống d), a, u (giống o)…
 */
const LOOK_ALIKE: Record<string, string> = {
  a: 'eou',
  b: 'dpq',
  c: 'ks',
  d: 'bpq',
  e: 'aio',
  f: 'tv',
  g: 'qj',
  h: 'nk',
  i: 'ely',
  j: 'gi',
  k: 'ch',
  l: 'it',
  m: 'nw',
  n: 'mh',
  o: 'aeu',
  p: 'bdq',
  q: 'gp',
  r: 'n',
  s: 'cz',
  t: 'fl',
  u: 'vo',
  v: 'uw',
  w: 'vm',
  x: 'z',
  y: 'i',
  z: 's',
}
const COMMON_LETTERS = 'aeioutnsrhldcmpbgkfwy'

/** Số chữ nhiễu theo mức khó và độ dài từ. */
export function distractorCount(level: 1 | 2 | 3, letterCount: number): number {
  const base = level === 1 ? 0 : level === 2 ? 2 : 3
  if (letterCount > 10) return Math.min(base, 1)
  if (letterCount > 8) return Math.min(base, 2)
  return base
}

/**
 * Các ô chữ cái cho 1 từ: đủ chữ của từ (chữ lặp thì có 2 ô) + chữ nhiễu, đã xáo trộn.
 * Không bao giờ xáo ra đúng thứ tự của từ (không thì bé chỉ việc bấm từ trái sang phải).
 */
export function buildTiles(word: string, level: 1 | 2 | 3, random: () => number = Math.random): LetterTile[] {
  const letters = word.split('').filter(isLetter)
  const lowerSet = new Set(letters.map((l) => l.toLowerCase()))
  // từ viết hoa toàn bộ (VD "TV") -> chữ nhiễu cũng viết hoa cho đồng bộ
  const allUpper = letters.every((l) => l === l.toUpperCase())

  /* chữ nhiễu: ưu tiên chữ dễ nhầm với chữ trong từ, rồi tới chữ thông dụng; không trùng chữ của từ */
  const wanted = distractorCount(level, letters.length)
  const candidates: string[] = []
  const addCandidate = (char: string) => {
    if (!lowerSet.has(char) && !candidates.includes(char)) candidates.push(char)
  }
  if (level === 3) shuffleInPlace([...lowerSet], random).forEach((l) => (LOOK_ALIKE[l] ?? '').split('').forEach(addCandidate))
  shuffleInPlace(COMMON_LETTERS.split(''), random).forEach(addCandidate)
  const distractors = candidates.slice(0, wanted).map((char) => (allUpper ? char.toUpperCase() : char))

  const tiles: LetterTile[] = [
    ...letters.map((letter, index) => ({ id: `w${index}`, letter, isDistractor: false })),
    ...distractors.map((letter, index) => ({ id: `d${index}`, letter, isDistractor: true })),
  ]

  // Xáo; nếu lỡ ra đúng thứ tự của từ thì xáo lại (tối đa vài lần — từ 1 chữ cái thì đành chịu)
  let shuffled = shuffleInPlace([...tiles], random)
  for (let attempt = 0; attempt < 6 && startsWithWord(shuffled, letters); attempt++) shuffled = shuffleInPlace([...tiles], random)
  return shuffled
}

/** Khay chữ có bắt đầu bằng đúng cả từ không (VD c-a-t-… cho "cat")? */
function startsWithWord(tiles: LetterTile[], letters: string[]): boolean {
  return letters.length > 1 && letters.every((letter, index) => tiles[index] && sameLetter(tiles[index].letter, letter))
}

/** Xáo trộn tại chỗ (Fisher–Yates) và trả lại chính mảng đó. */
function shuffleInPlace<T>(items: T[], random: () => number): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}
