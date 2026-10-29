/**
 * word-lookup.ts
 * ----------------------------------------------------------------------------
 * TRA NGHĨA TIẾNG VIỆT CỦA 1 TỪ TIẾNG ANH (bấm từ trong bài đọc, chế độ luyện tập).
 *
 * Nguồn, theo thứ tự ưu tiên:
 *   1. từ vựng của CHÍNH bài đang học (lesson.words) — nghĩa đúng ngữ cảnh, có phiên âm + id
 *   2. từ điển nhỏ có sẵn (reading-glossary.ts) — các từ hay gặp trong bài đọc v3
 *   3. thẻ Học vui (nghĩa đơn giản) — tải LƯỜI bằng prepareWordLookup()
 * Không có -> meaningVi = null (giao diện hiện "Chưa có nghĩa — lưu để tra sau").
 *
 * KHÔNG import lesson-registry.ts (nạp toàn bộ ~2,3 MB nội dung — xem lesson-loader.ts).
 *
 * Dạng chia được đưa về từ gốc bằng vài luật đơn giản: -s/-es/-ies, -ed/-ied, -ing,
 * phụ âm đôi (stopped -> stop), -er/-est, -ly, 's sở hữu.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content/content-types'
import { READING_GLOSSARY } from './reading-glossary'

export interface WordMeaning {
  /** từ người học bấm (giữ nguyên chữ trong bài) */
  surface: string
  /** từ gốc tìm được trong từ điển (VD "stopped" -> "stop") */
  headword: string
  meaningVi: string | null
  ipa?: string
  /** id từ vựng trong nội dung bài học (lưu sổ từ FSRS được) */
  wordId?: string
}

interface Entry {
  meaningVi: string
  ipa?: string
}

/** Từ điển phụ (thẻ Học vui) — rỗng cho tới khi prepareWordLookup() tải xong. */
const extraDictionary = new Map<string, Entry>()
let extraLoading: Promise<void> | null = null

/** Tải trước từ điển phụ (gọi khi mở bài đọc ở chế độ luyện tập). Gọi nhiều lần không sao. */
export function prepareWordLookup(): Promise<void> {
  extraLoading ??= import('../../content/all-fun-topics')
    .then((fun) => {
      const add = (word: string, entry: Entry) => {
        const key = word.trim().toLowerCase()
        if (key && !extraDictionary.has(key)) extraDictionary.set(key, entry)
      }
      for (const card of fun.allFunCards()) add(card.word, { meaningVi: card.meaningVi, ipa: card.ipa })
    })
    .catch(() => {
      extraLoading = null // mất mạng: lần sau thử lại
    })
  return extraLoading
}

/** Các dạng gốc có thể của 1 từ (thứ tự: chính nó trước). */
export function candidateForms(word: string): string[] {
  const w = word.toLowerCase().replace(/[’]/g, "'").replace(/'s$/, '')
  const forms = [w]
  const push = (form: string) => form.length >= 2 && !forms.includes(form) && forms.push(form)
  if (w.endsWith('ies')) push(w.slice(0, -3) + 'y')
  if (w.endsWith('es')) push(w.slice(0, -2))
  if (w.endsWith('s') && !w.endsWith('ss')) push(w.slice(0, -1))
  if (w.endsWith('ied')) push(w.slice(0, -3) + 'y')
  if (w.endsWith('ed')) {
    push(w.slice(0, -2))
    push(w.slice(0, -1))
    if (/([b-df-hj-np-tv-z])\1ed$/.test(w)) push(w.slice(0, -3))
  }
  if (w.endsWith('ing')) {
    push(w.slice(0, -3))
    push(w.slice(0, -3) + 'e')
    if (/([b-df-hj-np-tv-z])\1ing$/.test(w)) push(w.slice(0, -4))
  }
  if (w.endsWith('er')) push(w.slice(0, -2))
  if (w.endsWith('est')) push(w.slice(0, -3))
  if (w.endsWith('ily')) push(w.slice(0, -3) + 'y')
  if (w.endsWith('ly')) push(w.slice(0, -2))
  return forms
}

/** Tra nghĩa 1 từ. `lesson` = bài đang học (từ của bài được ưu tiên). */
export function lookupWord(surface: string, lesson?: Lesson): WordMeaning {
  const forms = candidateForms(surface)
  const lessonWords = lesson?.words ?? []
  for (const form of forms) {
    const own = lessonWords.find((word) => word.word.toLowerCase() === form)
    if (own) return { surface, headword: own.word, meaningVi: own.meaningVi, ipa: own.ipa, wordId: own.id }
  }
  for (const form of forms) {
    const meaning = READING_GLOSSARY.get(form)
    if (meaning) return { surface, headword: form, meaningVi: meaning }
  }
  for (const form of forms) {
    const entry = extraDictionary.get(form)
    if (entry) return { surface, headword: form, ...entry }
  }
  return { surface, headword: forms[0], meaningVi: null }
}
