/**
 * engine-types.ts
 * ----------------------------------------------------------------------------
 * CÁC KIỂU DỮ LIỆU CHUNG CỦA "ĐỘNG CƠ TRÒ CHƠI" khu trẻ em.
 * Mọi trò (Nghe và chạm, Lật thẻ, Xếp chữ…) đều nói chuyện với động cơ bằng các kiểu này,
 * nên thêm trò mới chỉ cần viết phần giao diện câu hỏi. Xem docs/redesign-v3/08-KIDS-GAMES-DEV.md.
 *
 *   RoundPlan    = kế hoạch 1 lượt chơi (danh sách câu, từ mới, độ khó)  <- round-builder.ts
 *   RoundItem    = 1 câu trong lượt (1 từ mục tiêu)
 *   ItemOutcome  = kết quả bé làm 1 câu (sai mấy lần, có phải xem đáp án không)
 *   RoundSummary = tổng kết lượt (túi đồ từ vựng, sao, kỷ lục, sticker mới)
 * ----------------------------------------------------------------------------
 */
import type { KidsWord } from '../../../content/content-types'
import type { KidsGameId, KidsOutfit } from '../../../content/kids'

export type { KidsGameId }

/**
 * Loại câu:
 *   new      = từ mới, lần đầu gặp -> có thẻ giới thiệu trước câu hỏi
 *   review   = từ đến hạn ôn (Leitner)
 *   repeat   = gặp lại trong cùng lượt (từ mới / từ hay sai) — "hộp 1: gặp lại ngay trong buổi"
 *   practice = luyện thêm cho đủ lượt (từ chưa đến hạn) — KHÔNG đổi hộp Leitner
 */
export type RoundItemKind = 'new' | 'review' | 'repeat' | 'practice'

export interface RoundItem {
  /** Khoá duy nhất cho mỗi lần xuất hiện (cùng 1 từ có thể xuất hiện 2 lần) */
  key: string
  word: KidsWord
  kind: RoundItemKind
  /** Hiện thẻ "giới thiệu từ mới" trước câu này */
  showIntro: boolean
}

/**
 * Chế độ chơi (07-KIDS-ZONE mục 3):
 *   calm = "Thong thả" (mặc định) — không đồng hồ, có thẻ giới thiệu từ mới, ghi hộp Leitner
 *   race = "Đua tốc độ" (tuỳ chọn) — chỉ từ ở hộp ≥ 3, đồng hồ 75 giây, nền tối neon, kỷ lục riêng;
 *          câu đều là "luyện thêm" -> KHÔNG đổi hộp Leitner (đua nhanh không phải lúc kiểm tra trí nhớ dài hạn)
 * Xem game-engine/race-mode/.
 */
export type RoundMode = 'calm' | 'race'

/** Cài đặt độ khó cho 1 lượt (adaptive-difficulty.ts tính). */
export interface DifficultySettings {
  /** 1 = dễ · 2 = vừa (mặc định) · 3 = khó */
  level: 1 | 2 | 3
  /** Số đáp án mỗi câu (3 hoặc 4 — luật 11: không quá 4) */
  optionCount: 3 | 4
  /** Mặc định ẩn chữ (luyện tai) — bé vẫn bật / tắt được */
  hideTextByDefault: boolean
}

export interface RoundPlan {
  gameId: KidsGameId
  /** Chủ đề chính của lượt (từ mới lấy từ đây) */
  topicId: string
  items: RoundItem[]
  /** Kho đáp án nhiễu: cùng chủ đề + từ vừa học gần đây (đều có ảnh nếu trò cần ảnh) */
  distractorPool: KidsWord[]
  /** Id các từ mới trong lượt (để gắn nhãn "Mới" ở túi đồ) */
  newWordIds: string[]
  difficulty: DifficultySettings
  /** Chế độ chơi — bỏ trống = 'calm' (Thong thả) */
  mode?: RoundMode
  /** Chỉ chế độ 'race': số giây của lượt đua */
  raceSeconds?: number
}

/** Kết quả bé làm 1 câu — trò chơi báo cho động cơ. */
export interface ItemOutcome {
  /** Số lần chọn sai trước khi đúng (0 = đúng ngay lần đầu) */
  wrongCount: number
  /** Bé đã phải xem đáp án (bậc 3 của thang gợi ý) -> câu quay lại cuối lượt */
  revealed: boolean
  /** Thời gian từ lúc câu hiện tới lúc trả lời đúng (ms) — để khen "nhanh hơn" */
  responseMs: number
}

/** 1 từ trong "túi đồ từ vựng" cuối lượt. */
export interface RoundWordResult {
  word: KidsWord
  isNew: boolean
  /** Hộp Leitner trước / sau lượt (null = chưa từng gặp / không đổi hộp vì là câu luyện thêm) */
  boxBefore: number | null
  boxAfter: number | null
  /** Đúng ngay lần đầu ở MỌI lần xuất hiện trong lượt */
  allFirstTry: boolean
  justMastered: boolean
}

export interface RoundSummary {
  gameId: KidsGameId
  words: RoundWordResult[]
  /** Số câu đúng ngay lần đầu = số sao ⭐ */
  stars: number
  totalQuestions: number
  previousBest: number
  isPersonalBest: boolean
  /** Từ vừa lên "đã thuộc" trong lượt này (mỗi từ = 1 sticker mới) */
  newStickers: KidsWord[]
  /** Trang phục vừa mở khoá (đủ bộ sticker 1 chủ đề) */
  newOutfits: KidsOutfit[]
  durationSeconds: number
  /** Chế độ của lượt vừa chơi (bỏ trống = 'calm') */
  mode?: RoundMode
  /** Chỉ chế độ 'race': lượt đua dài bao nhiêu giây */
  raceSeconds?: number
}
