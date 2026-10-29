/**
 * kids-word-boxes.ts
 * ----------------------------------------------------------------------------
 * ÔN TỪ CHO BÉ BẰNG 5 HỘP LEITNER (luật 35–36 trong _research/notes/psych-kids.md).
 *
 * Trẻ 9–11 tuổi KHÔNG tự chấm "khó / dễ" — hệ thống tự chấm theo kết quả trò chơi.
 * Mỗi từ nằm trong 1 hộp; hộp càng cao thì càng lâu mới gặp lại:
 *
 *   box 0 = Hộp 1 : gặp lại NGAY TRONG BUỔI (sau 3–5 câu khác — trò chơi tự xếp)
 *   box 1 = Hộp 2 : 1 ngày sau
 *   box 2 = Hộp 3 : 3 ngày sau
 *   box 3 = Hộp 4 : 7 ngày sau
 *   box 4 = Hộp 5 : 14 ngày sau
 *   box 5 = ĐÃ THUỘC (nhận sticker) — thỉnh thoảng (30 ngày) ôn lại cho khỏi quên
 *
 * Luật lên / xuống hộp:
 *   - Đúng ngay lần đầu       -> lên 1 hộp
 *   - Đúng nhờ gợi ý          -> giữ nguyên hộp (hẹn lại theo hộp đó)
 *   - Sai (sau tối đa 3 lần thử trong câu đó):
 *       + đang ở Hộp 3 trở lên (box ≥ 2) -> LÙI 2 HỘP (không về 0 cho đỡ nản)
 *       + đang ở Hộp 1–2 (box 0–1)       -> về Hộp 1 (box 0)
 *
 * Trần ôn: tối đa 30 từ / ngày; nghỉ nhiều ngày thì nợ ôn được trải đều, hộp thấp ưu tiên.
 * Trò chơi nên gọi kidsAnswerWord() ĐÚNG 1 LẦN cho mỗi câu hỏi, với kết quả cuối cùng.
 * ----------------------------------------------------------------------------
 */
import type { KidsProgress, KidsWordState } from './progress-types'
import { addDays } from './study-calendar'

/** Số ngày chờ trước lần gặp lại, theo hộp (box 0..5). */
export const KIDS_BOX_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30] as const
/** box 5 = đã thuộc */
export const KIDS_MASTERED_BOX = 5
/** Trần số từ ôn mỗi ngày (luật 36) */
export const KIDS_DAILY_REVIEW_CAP = 30
/** Từ mới tối đa mỗi vòng chơi / mỗi buổi (mục 6) */
export const KIDS_NEW_WORDS_PER_ROUND = 3
export const KIDS_NEW_WORDS_PER_SESSION = 8

/** Kết quả 1 câu hỏi trong trò chơi. */
export type KidsAnswerResult = 'right' | 'right-with-hint' | 'wrong'

type Box = KidsWordState['box']
const clampBox = (box: number): Box => Math.max(0, Math.min(KIDS_MASTERED_BOX, box)) as Box

/**
 * Cập nhật 1 từ sau khi bé trả lời. Từ chưa có trạng thái (lần đầu gặp) bắt đầu ở hộp 0.
 * Hàm "thuần": trả trạng thái mới, không sửa trạng thái cũ.
 */
export function answerKidsWord(previous: KidsWordState | undefined, result: KidsAnswerResult, today: string): KidsWordState {
  const current: KidsWordState = previous ?? { box: 0, due: today, seen: 0, right: 0, wrong: 0 }
  let box: Box
  if (result === 'right') box = clampBox(current.box + 1)
  else if (result === 'right-with-hint') box = current.box
  else box = current.box >= 2 ? clampBox(current.box - 2) : 0

  return {
    box,
    due: addDays(today, KIDS_BOX_INTERVAL_DAYS[box]),
    seen: current.seen + 1,
    right: current.right + (result === 'wrong' ? 0 : 1),
    wrong: current.wrong + (result === 'wrong' ? 1 : 0),
  }
}

export const isKidsWordMastered = (state: KidsWordState | undefined) => state?.box === KIDS_MASTERED_BOX

/**
 * Các từ cần ôn hôm nay (tối đa `cap`). Hộp thấp trước (dễ quên nhất), cùng hộp thì
 * từ quá hạn lâu nhất trước. Nợ ôn nhiều hơn trần -> phần còn lại để các ngày sau.
 */
export function kidsWordsDueToday(kids: KidsProgress, today: string, cap = KIDS_DAILY_REVIEW_CAP): string[] {
  return Object.entries(kids.words)
    .filter(([, state]) => state.due <= today)
    .sort(([, a], [, b]) => a.box - b.box || a.due.localeCompare(b.due))
    .slice(0, cap)
    .map(([wordId]) => wordId)
}

/** Chọn từ MỚI (chưa gặp) cho 1 vòng chơi, theo thứ tự danh sách gợi ý của trò chơi. */
export function pickNewKidsWords(kids: KidsProgress, candidateWordIds: string[], count = KIDS_NEW_WORDS_PER_ROUND): string[] {
  return candidateWordIds.filter((id) => !kids.words[id]).slice(0, count)
}

/** Tiến độ 1 bộ (chủ đề): số từ đã thuộc / tổng — dùng cho album sticker "12/20". */
export function kidsTopicProgress(kids: KidsProgress, wordIds: string[]): { mastered: number; started: number; total: number } {
  let mastered = 0
  let started = 0
  for (const id of wordIds) {
    const state = kids.words[id]
    if (!state) continue
    started++
    if (isKidsWordMastered(state)) mastered++
  }
  return { mastered, started, total: wordIds.length }
}
