/**
 * hint-ladder.ts
 * ----------------------------------------------------------------------------
 * "THANG GỢI Ý" 3 BẬC khi bé chọn sai (psych-kids luật 15–16) — máy trạng thái thuần.
 *
 *   Sai lần 1 -> bậc 'replay' : đáp án vừa chọn mờ đi (bị loại), PHÁT LẠI audio.
 *                               Không lộ đáp án.
 *   Sai lần 2 -> bậc 'clue'   : loại thêm đáp án vừa chọn + 1 manh mối
 *                               (chữ cái đầu khi đang ẩn chữ / nghĩa tiếng Việt khi đang hiện chữ).
 *   Sai lần 3 -> bậc 'reveal' : hiện đáp án đúng, bé tự bấm lại vào nó;
 *                               câu này quay lại cuối lượt.
 *   Chỉ còn đúng 1 đáp án chưa bị loại -> cũng là 'reveal' (vì không còn gì để chọn).
 *   => KHÔNG BAO GIỜ có lần sai thứ 4.
 *
 * Sai không bị trừ điểm, không buzzer, không X đỏ — giao diện dùng màu cam san hô.
 * Dùng chung cho mọi trò có "chọn 1 trong nhiều" (Nghe và chạm, Bóng bay, Phiêu lưu…).
 * ----------------------------------------------------------------------------
 */

export type HintStep = 'none' | 'replay' | 'clue' | 'reveal'

export interface HintLadderState {
  /** Số lần chọn sai ở câu này (0..3) */
  wrongCount: number
  /** Id các đáp án đã bị loại (mờ đi, không bấm được) */
  eliminated: string[]
  step: HintStep
  /** Đã chọn đúng (kể cả sau khi được hiện đáp án) */
  solved: boolean
}

export const initialHintState: HintLadderState = { wrongCount: 0, eliminated: [], step: 'none', solved: false }

/** Bé chọn 1 đáp án SAI -> trạng thái mới (bậc gợi ý tiếp theo). */
export function hintAfterWrongPick(state: HintLadderState, pickedId: string, allOptionIds: string[], correctId: string): HintLadderState {
  if (state.solved || state.step === 'reveal') return state // đang hiện đáp án: bấm sai nữa không tính
  const wrongCount = state.wrongCount + 1
  const eliminated = state.eliminated.includes(pickedId) ? state.eliminated : [...state.eliminated, pickedId]
  const stillChoosable = allOptionIds.filter((id) => id !== correctId && !eliminated.includes(id))
  const step: HintStep = wrongCount >= 3 || stillChoosable.length === 0 ? 'reveal' : wrongCount === 2 ? 'clue' : 'replay'
  return { wrongCount, eliminated, step, solved: false }
}

/** Bé chọn ĐÚNG. */
export const hintAfterCorrectPick = (state: HintLadderState): HintLadderState => ({ ...state, solved: true })

/** Kết quả cuối của câu, theo cách Leitner hiểu. */
export function hintOutcome(state: HintLadderState): { firstTry: boolean; usedHint: boolean; revealed: boolean } {
  return { firstTry: state.wrongCount === 0, usedHint: state.wrongCount > 0, revealed: state.step === 'reveal' }
}

/** Manh mối bậc 2 cho 1 từ: "c _ _" (khi đang ẩn chữ). */
export function firstLetterPattern(word: string): string {
  return word
    .split('')
    .map((char, index) => (index === 0 ? char : char === ' ' ? '  ' : '_'))
    .join(' ')
}
