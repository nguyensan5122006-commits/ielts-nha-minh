/**
 * mock-kid-progress.ts
 * ----------------------------------------------------------------------------
 * TIẾN ĐỘ GIẢ CỦA 1 BÉ — chỉ dùng cho trang xem thử /kids-preview khi phát triển.
 * Giúp xem giao diện ở nhiều tình huống mà không cần đăng nhập / chơi cả tuần.
 *
 * Chọn tình huống bằng tham số trên đường dẫn: /kids-preview?scenario=<tên>
 *   default : đã chơi vài ngày — 8 sticker Động vật, có từ đến hạn ôn, 2 từ sắp "thuộc"
 *   fresh   : bé mới tinh, chưa gặp từ nào (xem màn giới thiệu từ mới)
 *   tired   : như default nhưng hôm nay đã chơi hơn 30 phút (xem màn nhắc nghỉ mắt)
 *   outfit  : còn đúng 1 từ nữa là đủ bộ Động vật (xem màn mở khoá trang phục)
 * ----------------------------------------------------------------------------
 */
import { createEmptyKidsProgress, type KidsProgress, type KidsWordState } from '../../../learning-progress/progress-types'
import { addDays, todayString, weekIdOf, weekStartDay } from '../../../learning-progress/study-calendar'
import { findKidsTopic } from './kids-word-bank'

export type MockScenario = 'default' | 'fresh' | 'tired' | 'outfit'

export const MOCK_SCENARIOS: MockScenario[] = ['default', 'fresh', 'tired', 'outfit']

export function parseMockScenario(raw: string | null): MockScenario {
  return MOCK_SCENARIOS.includes(raw as MockScenario) ? (raw as MockScenario) : 'default'
}

/** Tạo trạng thái 1 từ: hộp `box`, đến hạn sau `dueInDays` ngày (âm = quá hạn). */
function wordState(box: KidsWordState['box'], dueInDays: number, today: string): KidsWordState {
  const seen = box + 2
  return { box, due: addDays(today, dueInDays), seen, right: box + 1, wrong: 1 }
}

export function buildMockKidsProgress(scenario: MockScenario, now = new Date()): KidsProgress {
  const kids = createEmptyKidsProgress()
  if (scenario === 'fresh') return kids

  const today = todayString(now)
  const animals = findKidsTopic('animals')!.words
  const colours = findKidsTopic('colours')!.words
  const words: KidsProgress['words'] = {}
  const stickers: string[] = []

  if (scenario === 'outfit') {
    // Mọi từ Động vật đã thuộc + có sticker, trừ "penguin" đang ở hộp 5 chờ ôn hôm nay
    for (const word of animals) {
      if (word.id === 'kids-animals-penguin') {
        words[word.id] = wordState(4, 0, today)
      } else {
        words[word.id] = wordState(5, 20, today)
        stickers.push(word.id)
      }
    }
  } else {
    animals.forEach((word, index) => {
      if (index < 8) {
        words[word.id] = wordState(5, 25, today) // đã thuộc
        stickers.push(word.id)
      } else if (index < 10) words[word.id] = wordState(4, 0, today) // đúng lần này là thuộc -> sticker
      else if (index < 14) words[word.id] = wordState((index % 2 ? 1 : 2) as 1 | 2, -1, today) // đến hạn
      else if (index < 16) words[word.id] = wordState(0, 0, today) // hôm qua sai, ôn lại
      else if (index < 20) words[word.id] = wordState(2, 2, today) // vừa học, chưa đến hạn
    })
  }
  colours.slice(0, 3).forEach((word) => (words[word.id] = wordState(1, 1, today)))

  // Tem tuần: các ngày đã chơi trong tuần này (tối đa 3 ngày trước hôm nay)
  const monday = weekStartDay(today)
  const playedDays = [0, 1, 3].map((offset) => addDays(monday, offset)).filter((day) => day < today)

  return {
    ...kids,
    words,
    stickers,
    playSecondsByDay: { [today]: scenario === 'tired' ? 30 * 60 + 5 : 14 * 60 },
    roundsByDay: { [today]: 1 },
    bestScores: { 'listen-tap': 7 },
    weeklyStamps: { [weekIdOf(today)]: [...playedDays, today] },
  }
}
