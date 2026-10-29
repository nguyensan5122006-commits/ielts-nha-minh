/**
 * pronunciation-check.ts — CHỌN CÂU LUYỆN ÂM MỤC TIÊU + TÔ MÀU TỪNG TỪ 3 MỨC
 * ----------------------------------------------------------------------------
 * Ý 3 trong _research/notes/ui-vn-b.md (ELSA): mỗi từ 1 màu — Đúng / Gần đúng / Chưa đúng,
 * KHÔNG hiện % trên từng từ (ui-ielts-ai.md, Tránh 5). Tên riêng tiếng Việt (Da Lat, Hanoi…)
 * không chấm, vì máy nhận dạng tiếng Anh luôn nghe sai (Tránh 11).
 *
 *   pickDrillSentences(task)        chọn ≤ 3 câu trong bài mẫu band cao nhất có nhiều từ chứa âm mục tiêu
 *   scoreReading(sentence, heard[]) so câu mẫu với các phương án máy nghe được (Web Speech API)
 *
 * "Gần đúng" = máy nghe ra từ GẦN giống: thiếu/sai đuôi -s, -ed, -ing (lỗi số 1 của người Việt),
 * hoặc lệch 1 chữ cái (từ ≥ 4 chữ). Đây là chấm lỏng để luyện tập, không phải điểm phát âm thật.
 * ----------------------------------------------------------------------------
 */
import type { SpeakingTask } from '../../content/content-types'
import { sampleSpeechLines } from './speaking-plan'

export type WordLevel = 'good' | 'close' | 'missed' | 'skip'

export interface ScoredWord {
  /** chữ hiển thị (giữ dấu câu) */
  display: string
  level: WordLevel
  /** từ chứa âm mục tiêu (gạch chân) */
  target: boolean
}

/* ---------------- âm mục tiêu -> cách nhận ra từ chứa âm đó ---------------- */

const CONSONANT_END = /[bcdfgjklmnpqstvxz]$/

function detectorsFor(targetSounds: string[]): ((word: string) => boolean)[] {
  const detectors: ((word: string) => boolean)[] = []
  for (const raw of targetSounds) {
    const sound = raw.toLowerCase()
    if (/-ed|past/.test(sound)) detectors.push((w) => w.length > 3 && /ed$/.test(w))
    if (/-s\b|final s|plural|third|\/s\/|\/z\//.test(sound)) detectors.push((w) => w.length > 3 && /[^s]s$/.test(w))
    if (/θ|ð|\bth\b|th-/.test(sound)) detectors.push((w) => w.includes('th'))
    if (/cluster|final consonant|ending|âm cuối|phụ âm cuối/.test(sound)) detectors.push((w) => w.length > 3 && /[bcdfgklmnpstxz]{2}$/.test(w))
    if (/\/v\/|\bv\b/.test(sound)) detectors.push((w) => w.includes('v'))
    if (/\/ʃ\/|sh/.test(sound)) detectors.push((w) => /sh|tion/.test(w))
  }
  // Không nhận ra âm nào (VD chỉ có "stress", "linking") -> luyện phụ âm cuối (lỗi phổ biến nhất)
  if (detectors.length === 0) detectors.push((w) => w.length > 3 && CONSONANT_END.test(w))
  return detectors
}

function normalize(word: string): string {
  return word
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, '')
}

/* ---------------- tên riêng tiếng Việt: không chấm ---------------- */

const VIETNAMESE_NAME_SYLLABLES = new Set(
  `da lat hanoi ha noi hai phong hue long ho chi minh saigon nha trang vung tau can tho phu quoc sapa sa pa hoi an
  nguyen tran le pham hoang huynh vu vo dang bui do ngo duong ly lan mai hoa tuan anh linh nam viet vietnam mekong
  tet pho banh mi bun cha thao thien minh khanh huong trang thu thuy quang dung hung phuong ninh binh dalat`.split(/\s+/),
)

/** Từ viết hoa (không đứng đầu câu) thuộc danh sách âm tiết tên Việt -> không chấm. */
function isVietnameseName(display: string, index: number): boolean {
  const word = normalize(display)
  if (!VIETNAMESE_NAME_SYLLABLES.has(word)) return false
  const capitalised = /^[A-ZĐ]/.test(display.replace(/^[^A-Za-zĐ]+/, ''))
  return capitalised && (index > 0 || word === 'vietnam' || word === 'hanoi')
}

/* ---------------- chọn câu luyện ---------------- */

/** ≤ 3 câu (6–26 từ) trong bài mẫu band cao nhất, nhiều từ chứa âm mục tiêu nhất; giữ thứ tự xuất hiện. */
export function pickDrillSentences(task: SpeakingTask, max = 3): { sentence: string; targetWords: string[] }[] {
  const best = [...task.bandSamples].sort((a, b) => parseFloat(b.band) - parseFloat(a.band))[0]
  if (!best) return []
  const detectors = detectorsFor(task.targetSounds ?? [])
  const sentences = sampleSpeechLines(best.text)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((sentence) => sentence.trim())
    .filter((sentence) => {
      const count = sentence.split(/\s+/).length
      return count >= 6 && count <= 26
    })
  const scored = sentences.map((sentence, order) => {
    const words = sentence.split(/\s+/)
    const targetWords = [
      ...new Set(
        words
          .map((w, i) => ({ clean: normalize(w), display: w, i }))
          .filter(({ clean, display, i }) => clean && !isVietnameseName(display, i) && detectors.some((detect) => detect(clean)))
          .map(({ clean }) => clean),
      ),
    ]
    return { sentence, targetWords, order }
  })
  return scored
    .filter((item) => item.targetWords.length >= 2)
    .sort((a, b) => b.targetWords.length - a.targetWords.length)
    .slice(0, max)
    .sort((a, b) => a.order - b.order)
    .map(({ sentence, targetWords }) => ({ sentence, targetWords }))
}

/* ---------------- chấm 1 lần đọc ---------------- */

/** Bỏ đuôi ngữ pháp để so "gốc từ": walked -> walk, visits -> visit, taking -> tak */
function stem(word: string): string {
  return word.replace(/'s$/, '').replace(/(ied|ies)$/, 'y').replace(/(ing|ed|es|s)$/, '')
}

function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1))
      previous = temp
    }
  }
  return row[b.length]
}

function levelFor(word: string, heard: string[]): Exclude<WordLevel, 'skip'> {
  if (heard.includes(word)) return 'good'
  const root = stem(word)
  for (const candidate of heard) {
    if (root.length >= 3 && stem(candidate) === root) return 'close' // đúng gốc, sai/thiếu đuôi
    if (word.length >= 4 && editDistance(word, candidate) <= (word.length >= 7 ? 2 : 1)) return 'close'
  }
  return 'missed'
}

/**
 * So câu mẫu với các phương án máy nghe được -> chọn phương án khớp nhiều nhất.
 * Trả về null khi máy không nghe được gì (giao diện hiện khung VÀNG "máy chưa nghe rõ", không tính sai).
 */
export function scoreReading(sentence: string, transcripts: string[], targetWords: string[]): { words: ScoredWord[]; heard: string } | null {
  const usable = transcripts.map((t) => t.trim()).filter(Boolean)
  if (usable.length === 0) return null
  const displays = sentence.split(/\s+/).filter(Boolean)
  const targets = new Set(targetWords)

  let best: { words: ScoredWord[]; heard: string; score: number } | null = null
  for (const transcript of usable) {
    const heardWords = transcript.split(/\s+/).map(normalize).filter(Boolean)
    const words = displays.map((display, index): ScoredWord => {
      const clean = normalize(display)
      const target = targets.has(clean)
      if (!clean || /^\d+$/.test(clean) || isVietnameseName(display, index)) return { display, level: 'skip', target: false }
      return { display, level: levelFor(clean, heardWords), target }
    })
    const score = words.reduce((sum, w) => sum + (w.level === 'good' ? 2 : w.level === 'close' ? 1 : 0), 0)
    if (!best || score > best.score) best = { words, heard: transcript, score }
  }
  return best && { words: best.words, heard: best.heard }
}
