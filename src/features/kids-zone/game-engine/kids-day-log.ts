/**
 * kids-day-log.ts
 * ----------------------------------------------------------------------------
 * SỔ GHI CHÉP "HÔM NAY" CỦA BÉ TRÊN MÁY NÀY (localStorage, tự hết hạn khi sang ngày mới):
 *   - mục tiêu buổi: 1 / 2 / 3 lượt (bé chọn ở sảnh, mặc định 3 — psych-kids luật 2)
 *   - đã học bao nhiêu từ mới hôm nay (trần 8 từ mới / buổi — luật 9)
 *   - các từ đã chơi + số sticker mới hôm nay (cho màn nhắc nghỉ: "Hôm nay: 12 từ · 1 sticker")
 *
 * Những số này chỉ để điều chỉnh trải nghiệm trong ngày, không phải tiến độ học
 * (tiến độ thật nằm trong kho tiến độ, đồng bộ máy chủ).
 * ----------------------------------------------------------------------------
 */
import { KIDS_NEW_WORDS_PER_SESSION } from '../../../learning-progress/kids-word-boxes'
import { todayString } from '../../../learning-progress/study-calendar'

export const DEFAULT_DAILY_GOAL = 3

interface DayLog {
  day: string
  goal: number
  newWords: number
  wordsPlayed: string[]
  stickers: number
}

const KEY = 'kids-zone:day-log'

function read(): DayLog {
  const today = todayString()
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null') as DayLog | null
    if (parsed && parsed.day === today) return parsed
  } catch {
    /* hỏng -> làm sổ mới */
  }
  return { day: today, goal: DEFAULT_DAILY_GOAL, newWords: 0, wordsPlayed: [], stickers: 0 }
}

function write(log: DayLog) {
  try {
    localStorage.setItem(KEY, JSON.stringify(log))
  } catch {
    /* bỏ qua */
  }
}

export const getDailyGoal = () => read().goal
export const setDailyGoal = (goal: number) => write({ ...read(), goal: Math.min(3, Math.max(1, Math.round(goal))) })

/** Còn được học bao nhiêu từ mới hôm nay (trần 8 / buổi). */
export const newWordsLeftToday = () => Math.max(0, KIDS_NEW_WORDS_PER_SESSION - read().newWords)

/** Ghi lại sau mỗi lượt. */
export function logRoundForToday(input: { newWordCount: number; wordIds: string[]; stickerCount: number }) {
  const log = read()
  write({
    ...log,
    newWords: log.newWords + input.newWordCount,
    wordsPlayed: [...new Set([...log.wordsPlayed, ...input.wordIds])],
    stickers: log.stickers + input.stickerCount,
  })
}

export function todayTotals(): { words: number; stickers: number } {
  const log = read()
  return { words: log.wordsPlayed.length, stickers: log.stickers }
}
