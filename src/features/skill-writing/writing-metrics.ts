/**
 * writing-metrics.ts — ĐO BÀI VIẾT NGAY TRONG LÚC GÕ (không cần AI, chạy trên trình duyệt)
 * ----------------------------------------------------------------------------
 *   countWords(text)            số từ (như máy thi IELTS: tách theo khoảng trắng)
 *   splitParagraphs(text)       các đoạn (xuống dòng = sang đoạn mới)
 *   countLinkingWords(text)     số từ nối + số LOẠI từ nối (however, while, overall…)
 *   topRepeatedWords(text)      3 từ nội dung bị lặp nhiều nhất (≥ 3 lần)
 *   paragraphRoles(paras, kind) gắn nhãn vai trò cho từng đoạn: Mở bài / Overview / Thân bài 1… (kiểu Writing9)
 *   writingKindOf(task)         đề này là "báo cáo biểu đồ", "thư/email" hay "bài luận"
 * Ý tưởng: _research/notes/ui-ielts-ai.md ý 4 (thước đo trong editor) và ý 6 (nhãn đoạn).
 * ----------------------------------------------------------------------------
 */
import type { WritingTask } from '../../content/content-types'

/** Số từ: mỗi cụm ký tự liền nhau có ít nhất 1 chữ/số là 1 từ ("20%" = 1 từ, "–" không tính). */
export function countWords(text: string): number {
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length
}

/** Tách đoạn: mỗi dòng không rỗng là 1 đoạn (người học hay chỉ bấm Enter 1 lần để sang đoạn). */
export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

/* ---------------- từ nối ---------------- */

/** Danh sách từ nối / cụm chuyển ý thường dùng trong IELTS (cụm dài đứng trước để không đếm 2 lần). */
const LINKING_PHRASES = [
  'on the other hand', 'in the meantime', 'having said that', 'as a result', 'in addition', 'in contrast', 'by contrast',
  'by comparison', 'compared with', 'compared to', 'in conclusion', 'to sum up', 'to conclude', 'in summary', 'in general',
  'for example', 'for instance', 'such as', 'in particular', 'first of all', 'after that', 'as well as', 'in other words',
  'in spite of', 'due to', 'owing to', 'even though', 'so that', 'that said', 'as for', 'this means', 'which means',
  'not only', 'overall', 'however', 'moreover', 'furthermore', 'additionally', 'therefore', 'thus', 'consequently',
  'because', 'since', 'although', 'though', 'while', 'whereas', 'similarly', 'likewise', 'firstly', 'secondly',
  'thirdly', 'finally', 'meanwhile', 'afterwards', 'subsequently', 'nevertheless', 'nonetheless', 'instead',
  'otherwise', 'respectively', 'alternatively', 'namely', 'despite', 'then', 'also',
]

/** Đếm từ nối: tổng số lần + số loại khác nhau. */
export function countLinkingWords(text: string): { total: number; distinct: number; found: string[] } {
  let rest = ` ${text.toLowerCase().replace(/[’']/g, "'")} `
  const found = new Map<string, number>()
  for (const phrase of LINKING_PHRASES) {
    const pattern = new RegExp(`(?<![\\p{L}'])${phrase.replace(/ /g, '\\s+')}(?![\\p{L}'])`, 'gu')
    rest = rest.replace(pattern, () => {
      found.set(phrase, (found.get(phrase) ?? 0) + 1)
      return ' · ' // thay bằng dấu chấm giữa để cụm ngắn hơn ("contrast") không bị đếm lại
    })
  }
  const total = [...found.values()].reduce((a, b) => a + b, 0)
  return { total, distinct: found.size, found: [...found.keys()] }
}

/* ---------------- từ lặp ---------------- */

/** Từ chức năng: lặp là bình thường, không báo. */
const STOP_WORDS = new Set(
  `the a an and or but so of to in on at by for from with as into onto than then that this these those there their they them
  it its is are was were be been being am have has had do does did will would can could should may might must shall
  i you he she we me him her us my your our his not no yes very more most less least some any all each every other such
  only just about over under after before up down out off if because while which who whom whose what when where why how
  also both either neither one two three four five six seven eight nine ten per much many few lot lots get got make made
  people thing things year years well`.split(/\s+/),
)

/** 3 từ nội dung bị lặp nhiều nhất (≥ 3 lần, dài ≥ 4 chữ cái). Gộp số nhiều đơn giản: "increases" -> "increase". */
export function topRepeatedWords(text: string, limit = 3): { word: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const raw of text.toLowerCase().match(/[a-z][a-z'-]*/g) ?? []) {
    const word = raw.replace(/'s$/, '')
    if (word.length < 4 || STOP_WORDS.has(word)) continue
    const base = word.endsWith('s') && !word.endsWith('ss') && counts.has(word.slice(0, -1)) ? word.slice(0, -1) : word
    counts.set(base, (counts.get(base) ?? 0) + 1)
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }))
}

/* ---------------- loại bài + nhãn đoạn ---------------- */

/** report = Task 1 biểu đồ/quy trình · letter = thư/email · essay = bài luận, review, bài đăng */
export type WritingKind = 'report' | 'letter' | 'essay'

export function writingKindOf(task: Pick<WritingTask, 'taskNumber' | 'chartData' | 'prompt'>): WritingKind {
  if (task.chartData) return 'report'
  const prompt = task.prompt.toLowerCase()
  if (task.taskNumber === 1 && /\b(chart|graph|table|diagram|map|process)\b/.test(prompt)) return 'report'
  if (/\b(email|e-mail|letter)\b/.test(prompt)) return 'letter'
  return 'essay'
}

export type ParagraphRole =
  | { kind: 'title' | 'greeting' | 'intro' | 'overview' | 'conclusion' | 'opening' | 'closing' | 'signoff' | 'block' }
  | { kind: 'body' | 'point'; index: number }

const OVERVIEW_START = /^(overall|in general|generally|in summary|to sum up|it is clear|it is evident|it can be seen)/i
const CONCLUSION_START = /^(in conclusion|to conclude|to sum up|in summary|overall|all in all|in short)/i
const GREETING = /^(dear|hi|hello|to whom)\b/i
const SIGNOFF = /^(best|kind|warm)?\s*(regards|wishes)|^yours\b|^thank you|^thanks|^cheers|^waiting for|^i look forward|^love,?$/i

/**
 * Gắn nhãn vai trò cho từng đoạn theo vị trí + câu mở đoạn (đoán, không cần AI).
 * Chỉ 1 đoạn duy nhất -> "Một khối — chưa chia đoạn" (lỗi CC hay gặp ở band 4).
 */
export function paragraphRoles(paragraphs: string[], kind: WritingKind): ParagraphRole[] {
  if (paragraphs.length === 0) return []
  if (paragraphs.length === 1) return [{ kind: 'block' }]

  if (kind === 'letter') {
    const roles: (ParagraphRole | null)[] = paragraphs.map((p, i) => {
      if (i === 0 && /^subject\s*:/i.test(p)) return { kind: 'title' }
      if (GREETING.test(p) && p.length < 60) return { kind: 'greeting' }
      const isTail = i >= paragraphs.length - 2
      if (isTail && (SIGNOFF.test(p) || (p.split(/\s+/).length <= 2 && i === paragraphs.length - 1))) return { kind: 'signoff' }
      return null
    })
    const contentIndexes = roles.map((r, i) => (r ? -1 : i)).filter((i) => i >= 0)
    contentIndexes.forEach((paragraphIndex, order) => {
      if (contentIndexes.length >= 3 && order === 0) roles[paragraphIndex] = { kind: 'opening' }
      else if (contentIndexes.length >= 3 && order === contentIndexes.length - 1) roles[paragraphIndex] = { kind: 'closing' }
      else roles[paragraphIndex] = { kind: 'point', index: contentIndexes.length >= 3 ? order : order + 1 }
    })
    return roles as ParagraphRole[]
  }

  let bodyCount = 0
  return paragraphs.map((p, i) => {
    const isLast = i === paragraphs.length - 1
    if (kind === 'report') {
      if (OVERVIEW_START.test(p)) return { kind: 'overview' }
      if (i === 0) return { kind: 'intro' }
    } else {
      if (i === 0) return { kind: 'intro' }
      if (isLast && (paragraphs.length >= 3 || CONCLUSION_START.test(p))) return { kind: 'conclusion' }
    }
    bodyCount += 1
    return { kind: 'body', index: bodyCount }
  })
}
