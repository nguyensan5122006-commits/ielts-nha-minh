/**
 * praise-picker.ts
 * ----------------------------------------------------------------------------
 * CHỌN LỜI KHEN CỤ THỂ (psych-kids luật 17–18).
 *
 *   - Khen bằng lời TỐI ĐA 1 lần / 4 câu đúng (các câu đúng khác chỉ có "ting" + ✓).
 *   - Chỉ chọn câu khen ĐÚNG VỚI TÌNH HUỐNG thật: VD "Sai rồi sửa ngay…" chỉ khi bé vừa sửa sai,
 *     "Bạn nghe một lần là nhận ra từ" chỉ khi bé không bấm nghe lại.
 *   - Không lặp lại câu nào trong cùng 1 buổi (nhớ trong sessionStorage).
 *   - Không bao giờ "thông minh / giỏi quá / thiên tài" — kho câu đã soạn theo luật đó.
 *
 * Kho câu: KIDS_VOICE_LINES (category 'praise-process' / 'praise-result') + vài câu có tên từ
 * (VD "Không nhìn chữ mà vẫn nghe ra từ cat") soạn ở kids-text.ts.
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../content/content-types'
import { KIDS_VOICE_LINES } from '../../../content/kids'
import { fillMascotName } from '../../../design-system/mascot-name'
import { WORD_PRAISE } from '../kids-text'
import type { KidsGameId, RoundItemKind } from './engine-types'

/** Mọi điều động cơ biết về câu vừa đúng. */
export interface PraiseContext {
  gameId: KidsGameId
  word: KidsWord
  /** số lần sai trước khi đúng ở câu này */
  wrongCount: number
  /** đã phải xem đáp án */
  revealed: boolean
  /** bé có bấm nghe lại / nghe chậm trước khi chọn không */
  usedReplay: boolean
  responseMs: number
  /** đang bật "ẩn chữ" */
  textHidden: boolean
  /** hộp Leitner trước câu này (null = từ mới) */
  boxBefore: number | null
  /** câu này là loại gì (mới / ôn / gặp lại trong lượt / luyện thêm) */
  itemKind: RoundItemKind
  /** lần trước gặp từ này bé có sai không */
  missedLastTime: boolean
}

export interface PraiseLine {
  id: string
  text: string
}

/** Điều kiện "câu khen này đúng với tình huống" — theo id câu trong kho lời thoại. */
const CONDITIONS: Record<string, (c: PraiseContext) => boolean> = {
  'kids-vl-praise-p01': (c) => c.usedReplay && c.wrongCount === 0,
  'kids-vl-praise-p02': (c) => c.wrongCount === 0 && c.responseMs > 2500,
  'kids-vl-praise-p03': (c) => c.wrongCount >= 1 && !c.revealed,
  'kids-vl-praise-p05': (c) => c.wrongCount === 2 && !c.revealed && c.textHidden,
  'kids-vl-praise-p06': (c) => c.wrongCount >= 1,
  'kids-vl-praise-p11': (c) => c.wrongCount >= 1 && !c.revealed,
  'kids-vl-praise-p13': (c) => c.wrongCount === 0 && c.responseMs > 3500,
  'kids-vl-praise-r02': (c) => c.wrongCount === 0,
  'kids-vl-praise-r03': (c) => c.wrongCount === 0 && c.missedLastTime,
  'kids-vl-praise-r06': (c) => c.wrongCount === 0 && !c.usedReplay && c.responseMs < 4000,
  'kids-vl-praise-r11': (c) => c.wrongCount === 0 && c.word.level === 'flyers',
}

const USED_KEY = 'kids-zone:praise-used'

function readUsed(): Set<string> {
  try {
    return new Set(JSON.parse(sessionStorage.getItem(USED_KEY) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}
function markUsed(id: string) {
  const used = readUsed()
  used.add(id)
  try {
    sessionStorage.setItem(USED_KEY, JSON.stringify([...used]))
  } catch {
    /* bỏ qua */
  }
}

/**
 * Chọn 1 câu khen hợp tình huống, chưa dùng trong buổi. Ưu tiên câu có tên từ (cụ thể nhất).
 * Không có câu nào hợp -> null (chỉ "ting", không nói gì — vẫn tốt).
 */
export function pickPraise(context: PraiseContext): PraiseLine | null {
  const used = readUsed()

  // 1. Câu có nhắc tên từ — cụ thể nhất
  for (const template of WORD_PRAISE) {
    const id = `${template.id}:${context.word.id}`
    if (!used.has(template.id) && template.when(context)) {
      markUsed(template.id)
      return { id, text: template.text.replace('{word}', context.word.word) }
    }
  }

  // 2. Câu trong kho lời thoại (đúng trò hoặc dùng chung), có điều kiện khớp
  const candidates = KIDS_VOICE_LINES.filter(
    (line) =>
      (line.category === 'praise-process' || line.category === 'praise-result') &&
      (!line.gameId || line.gameId === context.gameId) &&
      !used.has(line.id) &&
      CONDITIONS[line.id]?.(context),
  )
  if (!candidates.length) return null
  const line = candidates[Math.floor(Math.random() * candidates.length)]
  markUsed(line.id)
  return { id: line.id, text: fillMascotName(line.vi) }
}

/** Nhịp khen: câu đúng thứ 4, 8, 12… (đếm trong lượt) mới được khen bằng lời. */
export const isPraiseTurn = (correctCountInRound: number) => correctCountInRound > 0 && correctCountInRound % 4 === 0
