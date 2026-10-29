/**
 * placement-types.ts
 * ----------------------------------------------------------------------------
 * KIỂU DỮ LIỆU RIÊNG CHO BÀI XẾP LỚP THÍCH ỨNG v3 (placement-v3.ts).
 *
 * Vì sao cần file riêng?
 *   Kiểu `Exam` cũ (content-types.ts) là đề cố định: ai cũng làm cùng 1 danh sách câu.
 *   Bài xếp lớp v3 là "ngân hàng câu hỏi" + thuật toán chọn câu: mỗi người làm
 *   10–12 câu khác nhau tuỳ đúng/sai. Mỗi câu cần thêm 2 nhãn mà `Exam` không có:
 *     - band  : độ khó quy ra band IELTS (0.5, 1.5 … 6.5)
 *     - skill : vocabulary | grammar | listening | reading
 *   File này KHÔNG sửa content-types.ts (file chung của nhóm nền móng), chỉ dùng lại
 *   BilingualText, LevelId, VoiceId từ đó.
 *
 * Gồm:
 *   1. PlacementBand, PlacementSkill, CefrLabel  — các nhãn
 *   2. PlacementItem (3 dạng câu: choice / listen-choose / read-choose)
 *   3. PlacementAnswer   — 1 câu người học đã trả lời (đầu vào của thuật toán)
 *   4. PlacementEstimate — kết quả (band dạng khoảng + CEFR + level gợi ý + độ tin cậy)
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, LevelId, VoiceId } from '../content-types'

/* ============================================================================
 * 1. NHÃN
 * ========================================================================== */

/**
 * 7 mức độ khó, đặt ở GIỮA mỗi khoảng 1 band:
 *   0.5 = Pre-A1 thấp (từ đơn, chào hỏi)       1.5 = Pre-A1/A1 (câu rất ngắn, be/have)
 *   2.5 = A1/A2 (hiện tại đơn, quá khứ đơn)      3.5 = A2/B1 (hiện tại hoàn thành, điều kiện 1)
 *   4.5 = B1 (bị động, điều kiện 2, suy luận)    5.5 = B1+/B2 (điều kiện 3, từ học thuật)
 *   6.5 = B2 (đảo ngữ, sắc thái, suy luận khó)
 * Ý nghĩa: người học có band ≈ b làm câu mức b đúng khoảng 50–60%;
 * cao hơn 1 band thì đúng khoảng 85%; thấp hơn 1 band thì chủ yếu đoán.
 */
export type PlacementBand = 0.5 | 1.5 | 2.5 | 3.5 | 4.5 | 5.5 | 6.5

/** Kỹ năng của câu. 'grammar' tách riêng để cân đối đề; khi ghi vào skillStats thì gộp vào 'vocabulary'. */
export type PlacementSkill = 'vocabulary' | 'grammar' | 'listening' | 'reading'

/** Nhãn CEFR hiển thị. Bài xếp lớp không đo được trên B2 (app dừng ở band 6.5). */
export type CefrLabel = 'Pre-A1' | 'A1' | 'A2' | 'B1' | 'B2'

/* ============================================================================
 * 2. CÂU HỎI TRONG NGÂN HÀNG
 * ========================================================================== */

interface PlacementItemBase {
  /** Duy nhất toàn site. Quy ước: "placement-v3-b{band×10}-{v|g|l|r}-{số}", VD "placement-v3-b35-g-02" */
  id: string
  band: PlacementBand
  skill: PlacementSkill
  /** Câu hỏi hiện trên màn hình (tiếng Anh). Câu có chỗ trống dùng "___". */
  question: string
  /** 3–4 lựa chọn. UI nên xáo thứ tự hiển thị (cố định theo id), chấm theo correctIndex. */
  options: string[]
  correctIndex: number
  /** 1 dòng "vì sao" ≤ 20 từ mỗi ngôn ngữ (hiện ở màn kết quả, KHÔNG hiện ngay sau mỗi câu). */
  explanation: BilingualText
}

/** Trắc nghiệm chữ (từ vựng / ngữ pháp). */
export interface PlacementChoiceItem extends PlacementItemBase {
  kind: 'choice'
}

/** Nghe rồi chọn. audioText đọc bằng TTS; hội thoại dạng "Woman: …\nMan: …" (người nói đầu = giọng nữ). */
export interface PlacementListenItem extends PlacementItemBase {
  kind: 'listen-choose'
  audioText: string
  /** Giọng cho câu 1 người nói. Hội thoại: script TTS tự gán giọng theo thứ tự người nói (nữ trước, nam sau). */
  voice: VoiceId
}

/** Đọc đoạn ngắn (2–4 câu) rồi chọn. */
export interface PlacementReadItem extends PlacementItemBase {
  kind: 'read-choose'
  passage: string
}

export type PlacementItem = PlacementChoiceItem | PlacementListenItem | PlacementReadItem

/* ============================================================================
 * 3. ĐẦU VÀO / ĐẦU RA CỦA THUẬT TOÁN
 * ========================================================================== */

/**
 * 1 câu đã trả lời. Nút "Mình chưa biết câu này" ghi correct = false
 * (khuyến khích bấm nút này thay vì đoán bừa — kết quả chính xác hơn).
 */
export interface PlacementAnswer {
  itemId: string
  correct: boolean
}

/** Lý do dừng bài (UI dùng để chọn câu chúc mừng phù hợp). */
export type PlacementStopReason =
  | 'beginner-floor' // sai 2 câu ở mức 0.5 → bắt đầu từ Level 1 là vừa
  | 'top-reached' // đúng 2 câu ở mức 6.5 → đã chạm trần của bài
  | 'converged' // 5 câu gần nhất chỉ dao động trong 1 band → đủ chắc
  | 'max-items' // đã làm 12 câu
  | 'bank-exhausted' // hết câu phù hợp (gần như không xảy ra)

export interface PlacementEstimate {
  /** Ước lượng điểm (đã làm tròn 0.1) — chỉ dùng nội bộ / debug, KHÔNG hiện 1 con số lẻ cho người học. */
  bandPoint: number
  /** Khoảng band hiển thị, bội số 0.5, VD 2.5 và 3.5 → "khoảng band 2.5–3.5". */
  bandLow: number
  bandHigh: number
  /** CEFR của điểm ước lượng, VD "A2". */
  cefr: CefrLabel
  /** CEFR theo khoảng, VD "A2" hoặc "A2–B1" (hiện cạnh khoảng band). */
  cefrRange: string
  /** Level nên bắt đầu. */
  recommendedLevel: LevelId
  /** Có khi điểm sát ngưỡng level trên (trong 0.5 band): UI gợi ý "làm bài test Level để lên thẳng". */
  stretchLevel?: LevelId
  /** Độ tin cậy của KHOẢNG BAND (không phải của level). */
  confidence: 'low' | 'medium' | 'high'
  /** 'test' = làm bài; 'self-reported' = bấm "Tôi mới bắt đầu từ 0". */
  source: 'test' | 'self-reported'
  itemsAnswered: number
  /** Số câu đúng / đã làm theo từng kỹ năng (để màn kết quả nói "Nghe: 2/3"). */
  bySkill: Record<PlacementSkill, { answered: number; correct: number }>
}
