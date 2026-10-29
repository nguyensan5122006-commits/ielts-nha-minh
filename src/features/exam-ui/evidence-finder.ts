/**
 * evidence-finder.ts
 * ----------------------------------------------------------------------------
 * "SOI BẰNG CHỨNG": tìm chỗ trong bài đọc / lời thoại chứa đáp án của 1 câu hỏi.
 * Hàm thuần — không đụng giao diện, dùng chung cho Reading, Listening và phòng thi.
 *
 * Nội dung bài KHÔNG có trường "vị trí bằng chứng", nên ta suy ra theo thứ tự ưu tiên:
 *   1. Cụm trong ngoặc kép ở lời giải (VD: "it must have been Friday the tenth")
 *      -> tìm đúng cụm đó trong đoạn văn / dòng thoại (bỏ qua hoa-thường, dấu câu).
 *      Cụm có "..." được tách thành nhiều mảnh; phần trong [ngoặc vuông] là chữ người soạn thêm, bỏ đi.
 *   2. Câu điền từ: tìm chính đáp án (VD "laptop") trong đoạn được chỉ định.
 *   3. Không tìm được -> chỉ trả về khối (đoạn A / đoạn nghe 2) để giao diện cuộn tới.
 *
 * "Khối" (TextBlock) = 1 đoạn văn của bài đọc, hoặc 1 dòng thoại của bài nghe.
 * Kết quả dùng chỉ số ký tự trong chữ GỐC của khối -> giao diện tô màu bằng MarkedText.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, ExamQuestion } from '../../content/content-types'

export interface TextBlock {
  /** mã khối, VD 'para-B' hoặc 'line-s2-3' */
  id: string
  text: string
  /** nhóm của khối: nhãn đoạn ('B') hoặc id đoạn nghe — để ưu tiên tìm đúng chỗ */
  group?: string
}

export interface TextRange {
  blockId: string
  start: number
  end: number
}

export interface EvidenceResult {
  /** cụm bằng chứng tìm được (tô đậm) */
  phrases: TextRange[]
  /** cả câu chứa cụm đầu tiên (tô nhạt) */
  sentence: TextRange | null
  /** khối nên cuộn tới (kể cả khi không tìm được cụm) */
  blockId: string | null
  /** độ chắc: 'quote' = theo trích dẫn lời giải · 'answer' = theo đáp án · 'block' = chỉ biết đoạn · 'none' */
  confidence: 'quote' | 'answer' | 'block' | 'none'
}

/* ------------------------------------------------------------------ chuẩn hoá */

/**
 * Chuẩn hoá để so khớp "dễ tính": chữ thường, nháy cong -> thẳng, bỏ dấu câu, gộp khoảng trắng.
 * Trả về thêm `map`: vị trí ký tự chuẩn hoá -> vị trí trong chữ gốc (để tô đúng chỗ).
 */
export function normalizeWithMap(text: string): { normalized: string; map: number[] } {
  let normalized = ''
  const map: number[] = []
  let lastWasSpace = true // bỏ khoảng trắng đầu chuỗi
  for (let i = 0; i < text.length; i++) {
    let ch = text[i].toLowerCase()
    if (/[’‘`´]/.test(ch)) ch = "'"
    // dấu nháy dùng làm ngoặc ('Water in our city') -> khoảng trắng; nháy giữa 2 chữ (don't) thì giữ
    if (ch === "'" && !(/[a-z]/i.test(text[i - 1] ?? '') && /[a-z]/i.test(text[i + 1] ?? ''))) ch = ' '
    if (/[–—]/.test(ch)) ch = '-'
    if (/[.,;:!?"“”()[\]…]/.test(ch)) ch = ' ' // dấu câu coi như khoảng trắng
    if (/\s/.test(ch)) {
      if (lastWasSpace) continue
      ch = ' '
      lastWasSpace = true
    } else {
      lastWasSpace = false
    }
    normalized += ch
    map.push(i)
  }
  // bỏ khoảng trắng cuối
  while (normalized.endsWith(' ')) {
    normalized = normalized.slice(0, -1)
    map.pop()
  }
  return { normalized, map }
}

const normalizePhrase = (phrase: string) => normalizeWithMap(phrase).normalized

/** Tìm cụm (đã chuẩn hoá) trong chữ gốc, chỉ khớp trọn từ. Trả về vị trí gốc hoặc null. */
export function findPhraseInText(text: string, phrase: string, fromOriginalIndex = 0): { start: number; end: number } | null {
  const needle = normalizePhrase(phrase)
  if (!needle) return null
  const { normalized, map } = normalizeWithMap(text)
  let searchFrom = map.findIndex((original) => original >= fromOriginalIndex)
  if (searchFrom < 0) return null
  while (searchFrom <= normalized.length - needle.length) {
    const index = normalized.indexOf(needle, searchFrom)
    if (index < 0) return null
    const before = index === 0 ? ' ' : normalized[index - 1]
    const after = index + needle.length >= normalized.length ? ' ' : normalized[index + needle.length]
    // trọn từ: trước và sau là khoảng trắng (hoặc đầu/cuối chuỗi)
    if (!/[a-z0-9']/.test(before) && !/[a-z0-9']/.test(after)) {
      return { start: map[index], end: map[index + needle.length - 1] + 1 }
    }
    searchFrom = index + 1
  }
  return null
}

/* ------------------------------------------------------------------ trích dẫn */

/** Lấy các cụm trong ngoặc kép của lời giải (cả bản Việt lẫn Anh), tách theo "...". */
export function quotedFragments(explanation?: BilingualText): string[] {
  if (!explanation) return []
  const fragments: string[] = []
  // ngoặc kép "…" / “…”, và ngoặc đơn '…' (mở sau khoảng trắng/dấu ":", đóng trước khoảng trắng/dấu câu —
  // để không nhầm dấu nháy trong I'd, don't)
  const quotePatterns = [/["“]([^"”]{2,200})["”]/g, /(?:^|[\s(:])['‘](.{3,200}?)['’](?=[\s.,;:)!?]|$)/g]
  for (const text of [explanation.en, explanation.vi]) {
    for (const match of quotePatterns.flatMap((pattern) => [...text.matchAll(pattern)])) {
      for (const piece of match[1].split(/\.{3}|…/)) {
        const cleaned = piece.replace(/\[[^\]]*\]/g, ' ').replace(/\s+/g, ' ').trim()
        // cụm quá ngắn ("oh", "A") dễ khớp nhầm -> bỏ
        if (normalizePhrase(cleaned).replace(/[^a-z0-9]/g, '').length >= 4) fragments.push(cleaned)
      }
    }
  }
  return [...new Set(fragments)]
}

/* ------------------------------------------------------------------ mở rộng ra cả câu */

/** Mở rộng [start, end) ra cả câu chứa nó (ranh giới: . ! ? và đầu/cuối khối). */
export function expandToSentence(text: string, start: number, end: number): { start: number; end: number } {
  let sentenceStart = 0
  const before = text.slice(0, start)
  const boundary = /[.!?]["'”’)]?\s+/g
  for (const match of before.matchAll(boundary)) sentenceStart = (match.index ?? 0) + match[0].length
  const afterMatch = text.slice(end).match(/[.!?]["'”’)]?(\s|$)/)
  const sentenceEnd = afterMatch ? end + (afterMatch.index ?? 0) + afterMatch[0].trimEnd().length : text.length
  return { start: sentenceStart, end: Math.max(sentenceEnd, end) }
}

/* ------------------------------------------------------------------ tìm bằng chứng */

export interface EvidenceQuery {
  question: ExamQuestion
  blocks: TextBlock[]
  /** nhóm khối ưu tiên: segmentId (nghe) hoặc paragraphLabel (đọc) */
  preferredGroup?: string
}

/** Tìm bằng chứng cho 1 câu hỏi. */
export function findEvidence({ question, blocks, preferredGroup }: EvidenceQuery): EvidenceResult {
  const preferred = preferredGroup ? blocks.filter((block) => block.group === preferredGroup) : []
  const searchOrder = preferred.length ? [...preferred, ...blocks.filter((block) => block.group !== preferredGroup)] : blocks
  const fallbackBlock = preferred[0]?.id ?? null

  /** tìm 1 cụm trong danh sách khối, khối ưu tiên trước */
  const locate = (phrase: string, onlyPreferred: boolean): TextRange | null => {
    for (const block of onlyPreferred && preferred.length ? preferred : searchOrder) {
      const found = findPhraseInText(block.text, phrase)
      if (found) return { blockId: block.id, ...found }
    }
    return null
  }

  // 1. cụm trích dẫn trong lời giải
  const phrases: TextRange[] = []
  for (const fragment of quotedFragments(question.explanation)) {
    const range = locate(fragment, false)
    if (range && !phrases.some((p) => p.blockId === range.blockId && p.start === range.start)) phrases.push(range)
  }
  if (phrases.length) return withSentence(phrases, blocks, 'quote')

  // 2. câu điền từ: tìm chính đáp án (trong khối ưu tiên trước)
  if (question.kind === 'gap-fill') {
    for (const answer of [...question.acceptedAnswers].sort((a, b) => b.length - a.length)) {
      const range = locate(answer, true)
      if (range) return withSentence([range], blocks, 'answer')
    }
  }

  // 3. chỉ biết khối
  if (fallbackBlock) return { phrases: [], sentence: null, blockId: fallbackBlock, confidence: 'block' }
  return { phrases: [], sentence: null, blockId: null, confidence: 'none' }
}

function withSentence(phrases: TextRange[], blocks: TextBlock[], confidence: EvidenceResult['confidence']): EvidenceResult {
  const first = phrases[0]
  const block = blocks.find((b) => b.id === first.blockId)
  // mọi cụm cùng khối với cụm đầu -> lấy từ câu chứa cụm sớm nhất tới câu chứa cụm muộn nhất
  const sameBlock = phrases.filter((phrase) => phrase.blockId === first.blockId)
  const from = Math.min(...sameBlock.map((phrase) => phrase.start))
  const to = Math.max(...sameBlock.map((phrase) => phrase.end))
  const sentence = block ? { blockId: first.blockId, start: expandToSentence(block.text, from, from).start, end: expandToSentence(block.text, to, to).end } : null
  return { phrases, sentence, blockId: first.blockId, confidence }
}

/* ------------------------------------------------------------------ cặp diễn đạt lại */

export interface ParaphrasePair {
  /** cách nói trong câu hỏi / chữ trước dấu = */
  left: string
  /** cách nói trong bài / chữ sau dấu = */
  right: string
}

/**
 * Lấy cặp "diễn đạt lại" từ lời giải, VD:
 *   '"Leather strap" = a strap made of leather'      -> Leather strap ↔ a strap made of leather
 *   'Form diễn đạt "made of" ≈ "leather"'            (không có = thì bỏ qua)
 * Chỉ nhận dạng dấu "=" hoặc "≈" đứng giữa 2 vế ngắn.
 */
export function paraphrasePairsFromExplanation(text: string | undefined): ParaphrasePair[] {
  if (!text) return []
  const pairs: ParaphrasePair[] = []
  for (const clause of text.split(/[;,](?=\s)|\.\s|\n/)) {
    const parts = clause.split(/\s[=≈]\s/)
    if (parts.length !== 2) continue
    const clean = (value: string) => value.replace(/^[\s"“”'(]+|[\s"“”')]+$/g, '').replace(/\s*→.*$/, '').trim()
    const left = clean(parts[0].split(/[:–—]\s/).at(-1) ?? parts[0])
    const right = clean(parts[1])
    if (left && right && left.length <= 60 && right.length <= 80 && left.toLowerCase() !== right.toLowerCase()) pairs.push({ left, right })
  }
  return pairs
}

/**
 * Từ "neo" chung giữa câu hỏi và câu bằng chứng (danh từ/động từ nội dung, bỏ từ chức năng).
 * Giúp người học thấy mình nên dò (scan) theo từ nào.
 */
const STOP_WORDS = new Set(
  'a an the and or but if of to in on at by for from with as is are was were be been being it its this that these those there their they them he she his her you your we our i my me not no do does did have has had will would can could should may might must than then so such into about over after before also only very more most some any all each which who whom what when where why how'.split(' '),
)

export function sharedKeywords(a: string, b: string): string[] {
  const words = (text: string) => normalizePhrase(text).split(' ').filter((word) => word.length > 2 && !STOP_WORDS.has(word))
  const right = new Set(words(b))
  return [...new Set(words(a).filter((word) => right.has(word)))]
}
