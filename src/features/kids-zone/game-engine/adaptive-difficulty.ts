/**
 * adaptive-difficulty.ts
 * ----------------------------------------------------------------------------
 * ĐỘ KHÓ TỰ ĐIỀU CHỈNH (psych-kids luật 10): mục tiêu bé đúng NGAY LẦN ĐẦU 75–85%.
 *
 *   < 65% ở 2 lượt LIÊN TIẾP -> giảm 1 mức (ít đáp án hơn)
 *   > 92% ở lượt vừa xong     -> tăng 1 mức (4 đáp án, ẩn chữ sẵn, đáp án dễ nhầm)
 *   còn lại                   -> giữ nguyên
 *
 *   Mức 1 (dễ) : 3 đáp án, hiện chữ
 *   Mức 2 (vừa): 4 đáp án, hiện chữ        <- bắt đầu ở đây
 *   Mức 3 (khó): 4 đáp án, ẩn chữ, đáp án nhiễu dễ nhầm
 *
 * Lịch sử tỉ lệ đúng lưu trong localStorage của máy, theo từng trò.
 * (Kho tiến độ chưa có chỗ cho số liệu này — đã ghi đề xuất trong REQUESTS.md.)
 * ----------------------------------------------------------------------------
 */
import type { DifficultySettings, KidsGameId } from './engine-types'

const STORAGE_PREFIX = 'kids-zone:difficulty:'
const LOW = 0.65
const HIGH = 0.92

interface DifficultyMemory {
  level: 1 | 2 | 3
  /** tỉ lệ đúng lần đầu của các lượt gần nhất (mới nhất ở cuối) */
  recentRates: number[]
}

const SETTINGS: Record<1 | 2 | 3, DifficultySettings> = {
  1: { level: 1, optionCount: 3, hideTextByDefault: false },
  2: { level: 2, optionCount: 4, hideTextByDefault: false },
  3: { level: 3, optionCount: 4, hideTextByDefault: true },
}

function readMemory(gameId: KidsGameId): DifficultyMemory {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + gameId)
    const parsed = raw ? (JSON.parse(raw) as DifficultyMemory) : null
    if (parsed && [1, 2, 3].includes(parsed.level) && Array.isArray(parsed.recentRates)) return parsed
  } catch {
    /* hỏng / chế độ riêng tư -> dùng mặc định */
  }
  return { level: 2, recentRates: [] }
}

/** Cài đặt độ khó cho lượt sắp chơi. */
export function currentDifficulty(gameId: KidsGameId): DifficultySettings {
  return SETTINGS[readMemory(gameId).level]
}

/** Quy tắc thuần: từ mức hiện tại + các tỉ lệ gần nhất -> mức mới. */
export function nextDifficultyLevel(level: 1 | 2 | 3, recentRates: number[]): 1 | 2 | 3 {
  const last = recentRates[recentRates.length - 1]
  const previous = recentRates[recentRates.length - 2]
  if (last !== undefined && previous !== undefined && last < LOW && previous < LOW) return Math.max(1, level - 1) as 1 | 2 | 3
  if (last !== undefined && last > HIGH) return Math.min(3, level + 1) as 1 | 2 | 3
  return level
}

/** Gọi cuối mỗi lượt với tỉ lệ đúng lần đầu (0..1). Trả mức mới. */
export function recordRoundAccuracy(gameId: KidsGameId, firstTryRate: number): 1 | 2 | 3 {
  const memory = readMemory(gameId)
  const recentRates = [...memory.recentRates, firstTryRate].slice(-5)
  const level = nextDifficultyLevel(memory.level, recentRates)
  // Đổi mức thì "xoá sổ" lịch sử, để mức mới được thử ít nhất 2 lượt trước khi hạ tiếp
  const next: DifficultyMemory = { level, recentRates: level === memory.level ? recentRates : [] }
  try {
    localStorage.setItem(STORAGE_PREFIX + gameId, JSON.stringify(next))
  } catch {
    /* bỏ qua */
  }
  return level
}
