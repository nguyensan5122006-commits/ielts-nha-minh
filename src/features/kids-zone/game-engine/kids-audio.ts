/**
 * kids-audio.ts
 * ----------------------------------------------------------------------------
 * GIỌNG ĐỌC TRONG KHU TRẺ EM — lớp mỏng bọc services/text-to-speech.ts (nhóm audio).
 *
 * Nhóm audio đã tạo sẵn file mp3 (giọng AI) cho: mọi từ trẻ em (thường + chậm), nghĩa tiếng Việt
 * của từ, câu ví dụ, mọi câu mascot trong kids-voice-lines.ts. Chưa có file -> service tự dùng
 * giọng của trình duyệt. File này chỉ thêm 3 thứ trò chơi cần:
 *
 *   1. speakSequence([...])   đọc NHIỀU câu nối nhau (VD từ -> nghĩa -> lời khen); gọi lượt mới
 *                             hoặc stopVoice() thì lượt cũ tự dừng giữa chừng.
 *   2. Hẹn giờ dự phòng       mọi Promise LUÔN kết thúc (trình duyệt chặn tự phát, giọng máy không
 *                             báo "xong"…) -> nút "Tiếp" / tự sang câu không bao giờ bị kẹt.
 *   3. onProgress             cho phụ đề chạy theo giọng (use-spoken-line.ts).
 *
 * Các loại bước đọc (SpeechStep):
 *   { kind: 'word', word, slow? }          từ tiếng Anh (playKidsWord)       — nút loa, nút 🐢
 *   { kind: 'meaning', word }              nghĩa tiếng Việt (playKidsMeaning) — "con mèo"
 *   { kind: 'sentence', text, slow? }      câu tiếng Anh (playKidsSentence)  — câu ví dụ
 *   { kind: 'line', id?, text }            lời mascot tiếng Việt (playVoiceLine; id có file thì phát file)
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../content/content-types'
import type { KidsVoiceLine } from '../../../content/kids'
import { fillMascotName } from '../../../design-system/mascot-name'
import { kidsWordKey } from '../../../services/audio-clip-keys'
import {
  playKidsMeaning,
  playKidsSentence,
  playKidsWord,
  playVoiceLine,
  preloadClips,
  stopSpeaking,
  type PlaybackHandle,
  type PlaybackProgress,
} from '../../../services/text-to-speech'

export type SpeechStep =
  | { kind: 'word'; word: KidsWord | string; slow?: boolean; pauseAfterMs?: number }
  | { kind: 'meaning'; word: KidsWord; pauseAfterMs?: number }
  | { kind: 'sentence'; text: string; slow?: boolean; pauseAfterMs?: number }
  | { kind: 'line'; id?: string; text: string; pauseAfterMs?: number }

/** Mỗi lượt đọc mới tăng số này; lượt cũ thấy số đã đổi thì tự dừng. */
let playToken = 0

/** Ước lượng thời gian đọc (ms) khi chưa biết độ dài file — cho hẹn giờ dự phòng. */
export function estimateSpeechMs(text: string, lang: 'en' | 'vi', rate = 1): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const perWord = lang === 'vi' ? 290 : 380
  return Math.round((350 + words * perWord) / rate)
}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))

/** Chờ handle phát xong, nhưng không quá `ms` (dự phòng). */
function finishedWithin(handle: PlaybackHandle, ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, ms)
    void handle.finished.finally(() => {
      window.clearTimeout(timer)
      resolve()
    })
  })
}

function textOf(step: SpeechStep): { text: string; lang: 'en' | 'vi' } {
  switch (step.kind) {
    case 'word':
      return { text: typeof step.word === 'string' ? step.word : step.word.word, lang: 'en' }
    case 'meaning':
      return { text: step.word.meaningVi, lang: 'vi' }
    case 'sentence':
      return { text: step.text, lang: 'en' }
    case 'line':
      return { text: step.text, lang: 'vi' }
  }
}

/** Bắt đầu phát 1 bước -> trả handle của service âm thanh. */
function startStep(step: SpeechStep, onProgress?: (progress: PlaybackProgress) => void): PlaybackHandle {
  switch (step.kind) {
    case 'word':
      return playKidsWord(step.word, { slow: step.slow, onProgress })
    case 'meaning':
      return playKidsMeaning(step.word, { onProgress })
    case 'sentence':
      return playKidsSentence(step.text, { slow: step.slow, onProgress })
    case 'line':
      // có id trong kho lời thoại -> phát file mp3; không có -> service đọc chữ bằng giọng máy
      return playVoiceLine(step.id ?? step.text, 'vi', { fallbackText: step.text, onProgress })
  }
}

/**
 * Đọc lần lượt các bước. Gọi lượt mới (hoặc stopVoice) sẽ dừng lượt đang đọc.
 * onProgress(stepIndex, progress): phụ đề chạy theo (chỉ dùng khi đọc 1 câu).
 */
export async function speakSequence(steps: SpeechStep[], onProgress?: (stepIndex: number, progress: PlaybackProgress) => void): Promise<void> {
  const token = ++playToken
  stopSpeaking()
  for (const [index, step] of steps.entries()) {
    if (token !== playToken) return
    const { text, lang } = textOf(step)
    const handle = startStep(step, onProgress && ((progress) => token === playToken && onProgress(index, progress)))
    // dự phòng: gấp đôi thời gian ước lượng + 2,5 giây (đủ cho tải file chậm)
    await finishedWithin(handle, estimateSpeechMs(text, lang) * 2 + 2500)
    if (step.pauseAfterMs && token === playToken) await wait(step.pauseAfterMs)
  }
}

/** Đọc 1 từ tiếng Anh (slow = nút 🐢). */
export const sayWord = (word: KidsWord | string, options: { slow?: boolean } = {}) => speakSequence([{ kind: 'word', word, slow: options.slow }])

/** Đọc nghĩa tiếng Việt của từ. */
export const sayMeaning = (word: KidsWord) => speakSequence([{ kind: 'meaning', word }])

/** Đọc 1 câu tiếng Anh (câu ví dụ…). */
export const saySentence = (text: string) => speakSequence([{ kind: 'sentence', text }])

/** Mascot nói 1 câu trong kho lời thoại (tiếng Việt, đã thay tên mascot). */
export const sayVoiceLine = (line: KidsVoiceLine) => speakSequence([{ kind: 'line', id: line.id, text: fillMascotName(line.vi) }])

/** Tải trước tiếng các từ của 1 lượt -> bấm loa là kêu ngay. */
export function preloadWordAudio(words: (KidsWord | string)[]): void {
  void preloadClips(words.map((word) => kidsWordKey(typeof word === 'string' ? word : word.word)))
}

/** Dừng mọi giọng đọc (rời câu, bấm Tiếp khi đang đọc). */
export function stopVoice(): void {
  playToken++
  stopSpeaking()
}
