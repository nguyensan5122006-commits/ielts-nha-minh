/**
 * placement-v3.ts
 * ----------------------------------------------------------------------------
 * BÀI XẾP LỚP THÍCH ỨNG v3 — ngân hàng 60 câu + thuật toán chọn câu + chấm kết quả.
 * (Thay cho placement-test.ts cũ 30 câu / 20 phút. File cũ giữ nguyên để không vỡ dữ liệu cũ.)
 *
 * Nguồn luật: _research/notes/psych-adult.md D2 (≤ 12 câu, ≤ 5–6 phút, kết quả = CEFR + khoảng band)
 * và A15 (người mới hay lo lắng: không đồng hồ, không "buzz", mở đầu bằng thành công).
 *
 * NGÂN HÀNG CÂU (PLACEMENT_V3_ITEMS) — 60 câu, 7 mức độ khó × 4 kỹ năng:
 *   band 0.5 : 8 câu  (V2 G2 L2 R2)   — Pre-A1 thấp: từ đơn, chào hỏi, số
 *   band 1.5 : 10 câu (V3 G3 L2 R2)   — Pre-A1/A1: be, can, there is, giờ, phòng trong nhà
 *   band 2.5 : 9 câu  (V2 G3 L2 R2)   — A1/A2: hiện tại đơn -s, quá khứ đơn, so sánh hơn
 *   band 3.5 : 9 câu  (V2 G3 L2 R2)   — A2/B1: for/since, điều kiện 1, quá khứ tiếp diễn, -ed/-ing
 *   band 4.5 : 8 câu  (V2 G2 L2 R2)   — B1: bị động, điều kiện 2, collocation, ý chính đoạn văn
 *   band 5.5 : 8 câu  (V2 G2 L2 R2)   — B1+/B2: điều kiện 3, get sth done, "pose a threat", quan điểm
 *   band 6.5 : 8 câu  (V2 G2 L2 R2)   — B2: đảo ngữ, điều kiện hỗn hợp, sắc thái từ, suy luận
 *   V = vocabulary, G = grammar, L = listening (nghe rồi chọn), R = reading (đọc 2–4 câu rồi chọn)
 *   Thứ tự trong mảng = thứ tự ưu tiên: câu đầu của mỗi ô (band, kỹ năng) là câu "dễ chịu" nhất.
 *   Câu đầu tiên của cả bài luôn là "placement-v3-b15-v-01" (câu khởi động, rất dễ).
 *
 * ============================================================================
 * ĐẶC TẢ THUẬT TOÁN (nhóm UI làm theo — đã có sẵn hàm thuần ở cuối file)
 * ============================================================================
 *
 * 0) TRƯỚC KHI LÀM BÀI (màn /start)
 *    - Chọn track + nhóm tuổi. Có nút ngang hàng "Tôi mới bắt đầu từ 0"
 *      → KHÔNG làm bài, dùng completeBeginnerResult(): Level 1, Pre-A1, band 0–1.0,
 *        confidence 'low', source 'self-reported'. Lộ trình Level 1 vốn bắt đầu từ con số 0
 *        nên chọn này luôn an toàn; người học có thể làm bài xếp lớp sau trong Cài đặt.
 *    - Lời dẫn gợi ý: "Khoảng 5 phút, không tính giờ. Câu nào chưa biết cứ bấm 'Mình chưa biết'
 *      — như vậy kết quả còn chính xác hơn đoán bừa."
 *
 * 1) TRONG KHI LÀM BÀI
 *    - Mỗi màn 1 câu, có thanh tiến độ (tính trên tối đa 12; dừng sớm thì nhảy lên 100% + "Xong rồi!").
 *    - KHÔNG báo đúng/sai sau từng câu (đây là bài đo, và người mới dễ nản khi thấy nhiều chữ "chưa đúng").
 *      Chỉ hiện chuyển cảnh nhẹ. Giải thích (explanation) xem ở màn kết quả, mục "Xem lại câu đã làm".
 *    - Luôn có nút "Mình chưa biết câu này" → ghi { itemId, correct: false }.
 *    - Câu nghe: tự phát 1 lần, cho nghe lại thêm 1 lần (tổng 2 lần), tốc độ 1×. Không hiện chữ.
 *    - Không đồng hồ. Tự lưu danh sách câu trả lời vào localStorage sau mỗi câu (mở lại → làm tiếp).
 *    - Đỡ cho người lo lắng: nếu 2 trong 3 câu đầu "chưa đúng", hiện 1 lần lời mời nhẹ nhàng
 *      "Phần này hơi lạ với bạn? Bạn có thể bắt đầu ngay từ Level 1." với 2 nút ngang nhau
 *      [Bắt đầu Level 1] [Làm tiếp]. Chọn Level 1 → dùng estimatePlacement(câu đã làm).
 *
 * 2) CHỌN MỨC ĐỘ KHÓ CHO CÂU TIẾP THEO (cầu thang lên/xuống — "staircase")
 *    a. Câu 1: band 1.5 (câu khởi động).
 *    b. Câu trước ĐÚNG → lên 1 band. "Khởi động nhanh": nếu CHƯA sai câu nào và câu vừa rồi ở
 *       band ≥ 2.5 thì lên 2 band (1.5 → 2.5 → 4.5 → 6.5), để người giỏi không mất thời gian.
 *    c. Câu trước SAI → xuống 1 band.
 *    d. Luôn giữ trong khoảng 0.5 … 6.5 (đúng ở 6.5 thì ở lại 6.5; sai ở 0.5 thì ở lại 0.5).
 *    e. "Khoá mức": band nào đã sai ≥ 2 câu VÀ số câu sai > số câu đúng ở band đó thì bị khoá —
 *       từ đó không lên band đó (hay cao hơn) nữa, mà ở lại band ngay dưới.
 *       (Người học không phải gặp lại mức đã nhiều lần thấy quá khó — luật "sai 2 câu ở 1 mức thì dừng mức đó".)
 *
 * 3) CHỌN KỸ NĂNG VÀ CÂU CỤ THỂ
 *    - Kỹ năng = kỹ năng đã làm ÍT câu nhất; hoà thì theo thứ tự vocabulary → grammar → listening → reading
 *      (nên 4 câu đầu lần lượt là V, G, L, R — đúng thứ tự "từ vựng/ngữ pháp → nghe → đọc").
 *    - Lấy câu CHƯA làm đầu tiên trong ngân hàng có đúng (band, kỹ năng).
 *    - Hết câu ở ô đó → câu chưa làm khác cùng band (theo thứ tự ưu tiên kỹ năng ở trên);
 *      hết cả band → band gần nhất, ưu tiên band thấp hơn.
 *    - Hiển thị: xáo thứ tự đáp án cố định theo id (như stableOptionOrder), chấm theo correctIndex.
 *
 * 4) LUẬT DỪNG (kiểm tra sau mỗi câu, theo thứ tự)
 *    a. 'beginner-floor': đã sai ≥ 2 câu ở band 0.5 → dừng (có thể chỉ sau 3 câu — nhẹ nhàng cho người mới).
 *    b. 'top-reached'   : đã làm ≥ 10 câu và đúng ≥ 2 câu ở band 6.5 → dừng (chạm trần của bài).
 *    c. 'converged'     : 5 câu gần nhất chỉ nằm trong 2 band liền nhau (cao nhất − thấp nhất ≤ 1)
 *                         VÀ đã làm ≥ 10 câu (≥ 6 câu nếu cả 5 câu đó đều ở band ≤ 1.5 — người mới
 *                         không phải làm dài khi kết quả Level 1 đã rõ) → dừng.
 *    d. 'max-items'     : đã làm 12 câu → dừng.
 *    e. 'bank-exhausted': không còn câu để hỏi (thực tế không xảy ra với 60 câu).
 *    Người học bấm thoát giữa chừng: vẫn tính được kết quả từ các câu đã làm (độ tin cậy sẽ thấp).
 *
 * 5) TÍNH KẾT QUẢ — estimatePlacement(answers)
 *    Ý tưởng (dễ hiểu): thử lần lượt mọi "band thật" có thể có, từ 0.0 đến 7.5 (bước 0.05).
 *    Với mỗi band thử, tính xem người có band đó trả lời ĐÚNG Y HỆT như người học vừa làm thì
 *    "hợp lý" đến đâu. Band càng giải thích tốt chuỗi đúng/sai thì càng nặng ký.
 *    Lấy trung bình có trọng số = điểm ước lượng; độ "trải rộng" = độ không chắc chắn.
 *    (Thuật ngữ: ước lượng EAP với mô hình IRT 3 tham số cố định.)
 *      - Xác suất đúng 1 câu có band b của người có band θ:
 *          P = g + (1 − g) / (1 + e^(−1.5 × (θ − b)))      g = 1 / số đáp án (tỉ lệ đoán mò)
 *        → người cao hơn câu 1 band đúng ~86%; thấp hơn 1 band chỉ ~40–45% (gần mức đoán).
 *      - Niềm tin ban đầu (prior): phân phối chuẩn quanh 2.5, độ lệch 3.0 (rất "mềm"),
 *        chỉ để kết quả không chạy lung tung khi người học đúng hết hoặc sai hết.
 *    Từ điểm ước lượng θ̂ và độ lệch chuẩn sd:
 *      - bandPoint = θ̂ làm tròn 0.1, giới hạn 0 … 7.0 (KHÔNG hiện số này cho người học).
 *      - Khoảng band (quyết định chủ nhà 29/10/2026): LUÔN là ±0.5 quanh điểm ước lượng, trần 6.5.
 *          tâm = θ̂ làm tròn 0.5, kẹp 0 … 6.5;  bandLow = tâm − 0.5 (≥ 0),  bandHigh = tâm + 0.5 (≤ 6.5).
 *          VD θ̂ 3.7 → tâm 3.5 → "3.0–4.0";  θ̂ 7.0 → tâm 6.5 → "6.0–6.5";  θ̂ 0.2 → tâm 0 → "0–0.5".
 *          Lý do: khoảng cố định dễ hiểu, không phình ra khi làm ít câu; trần 6.5 = đỉnh của bài
 *          (câu khó nhất là band 6.5 — bài không đo được trên mức đó). Độ không chắc chắn (sd)
 *          vẫn dùng cho độ tin cậy (confidence) bên dưới — 'low' thì UI ghi "ước lượng sơ bộ".
 *          (Trước đây: w = sd kẹp [0.25, 1.0], khoảng rộng 0.5–2.0 band, trần 7.0.)
 *      - CEFR (theo bảng IDP trong psych-adult A18, dùng θ̂ làm tròn 0.5):
 *          ≤ 1.5 Pre-A1 · 2.0–2.5 A1 · 3.0–3.5 A2 · 4.0–5.0 B1 · ≥ 5.5 B2
 *        cefrRange = CEFR(bandLow) "–" CEFR(bandHigh) nếu khác nhau, VD "A2–B1".
 *      - Level gợi ý: θ̂ < 2.0 → level-1 · 2.0 ≤ θ̂ < 4.0 → level-2 · θ̂ ≥ 4.0 → level-3.
 *        stretchLevel = level kế trên nếu θ̂ cách ngưỡng < 0.5 (1.5–1.9 hoặc 3.5–3.9):
 *        UI nói "Bạn đã sát Level 3 — làm bài kiểm tra Level 2 để lên thẳng".
 *      - Độ tin cậy (của khoảng band; mô phỏng cho thấy sai số trung bình ≈ 0.8 × sd):
 *          'high'   : sd ≤ 0.5 và ≥ 5 câu      (sai số trung bình ~0.4 band)
 *          'medium' : sd ≤ 0.85                (sai số trung bình ~0.5–0.65 band — mức thường gặp)
 *          'low'    : còn lại (thoát sớm, trả lời mâu thuẫn, hoặc tự chọn "mới bắt đầu")
 *
 * 6) MÀN KẾT QUẢ
 *    "Bạn bắt đầu ở Level 2 · A2 · khoảng band 2.5–3.5" + 1 câu can-do của level (song ngữ).
 *    confidence 'low' → thêm dòng "Ước lượng sơ bộ — sẽ chính xác hơn sau vài bài học".
 *    Không bao giờ hiện 1 con số band lẻ (psych-adult D6 luật 23). bySkill dùng cho dòng "Nghe 2/3".
 *    Lưu vào progress v2: placement = { level: recommendedLevel, track, bandLow, bandHigh, takenAt }.
 *    KHÔNG ghi bandEstimates theo kỹ năng từ bài này (quá ít câu mỗi kỹ năng; D6 cần ≥ 20 câu).
 *
 * 7) VÍ DỤ TỰ KIỂM TRA (đã chạy thật bằng chính các hàm dưới đây; V/G/L/R = kỹ năng, ✓ đúng, ✗ sai).
 *    Nhóm UI nên viết test lặp lại đúng các ví dụ này: đưa lần lượt câu do nextPlacementItem() chọn,
 *    trả lời theo chuỗi ✓/✗, rồi so placementStopReason() và estimatePlacement().
 *    A. Người mới hoàn toàn: 1.5V✗ 0.5G✗ 0.5L✗ → 'beginner-floor' sau 3 câu
 *       → { bandPoint 0.5, band 0–1.0, Pre-A1, level-1, confidence 'medium' }
 *    B. Người mới biết chút ít: 1.5V✗ 0.5G✓ 1.5L✗ 0.5R✓ 0.5V✓ 0.5G✗ → 'converged' sau 6 câu
 *       → { bandPoint 0.8, band 0.5–1.5, Pre-A1, level-1, 'medium' }
 *    C. Người A2: 1.5V✓ 2.5G✓ 4.5L✗ 3.5R✗ 2.5V✓ 3.5G✓ 4.5L✗ (4.5 bị khoá) 3.5R✓ 3.5V✗ 2.5G✓ 3.5L✓ 3.5V✓
 *       → 'converged' sau 12 câu → { bandPoint 3.5, band 3.0–4.0, A2 (khoảng A2–B1), level-2, stretch level-3, 'medium' }
 *    D. Người B1+: 1.5V✓ 2.5G✓ 4.5L✓ 6.5R✗ 5.5V✗ 4.5G✓ 5.5L✓ 6.5R✗ (6.5 khoá) 5.5V✗ (5.5 khoá) 4.5G✓ 4.5L✓ 4.5R✓
 *       → 'max-items' sau 12 câu → { bandPoint 5.1, band 4.5–5.5, B1 (khoảng B1–B2), level-3, 'medium' }
 *    E. Người giỏi: đúng hết 1.5V 2.5G 4.5L rồi 7 câu 6.5 → 'top-reached' sau 10 câu
 *       → { bandPoint 7.0, band 6.0–6.5 (trần 6.5), B2, level-3, 'high' }
 *    F. Thoát sau 4 câu: 1.5V✓ 2.5G✓ 4.5L✗ 3.5R✓ → (chưa dừng) { bandPoint 3.7, band 3.0–4.0, A2 (A2–B1), level-2, stretch level-3, 'low' }
 *    G. Bấm "Tôi mới bắt đầu từ 0" (hoặc 0 câu): completeBeginnerResult() → { band 0–1.0, Pre-A1, level-1, 'low', 'self-reported' }
 *
 * 8) KIỂM THỬ MÔ PHỎNG (đã chạy 1.500 người ảo cho mỗi band thật 0 … 7, trả lời theo đúng mô hình mục 5):
 *    trung bình 7–11 câu (người mới ~7, giữa ~11, giỏi ~10); sai số trung bình 0.5–0.6 band;
 *    (số liệu mô phỏng này chạy với khoảng band CŨ theo sd; khoảng ±0.5 mới hẹp hơn khi làm ít câu
 *    nên tỉ lệ "band thật nằm trong khoảng" sẽ thấp hơn — chưa chạy lại mô phỏng)
 *    band thật nằm trong khoảng hiển thị ~83–91% (riêng band thật 0: ~58% vì bài không phân biệt được 0 với 0.5);
 *    level gợi ý đúng 86–100% khi band thật cách ngưỡng level ≥ 1 (ngay sát ngưỡng thì ~50/50 — vì thế có stretchLevel).
 *    Khi câu hỏi thật kém phân loại hơn mô hình (độ dốc 1.0): sai số ~0.7, độ phủ ~75% — vẫn dùng được.
 *    Sau khi có dữ liệu thật (≥ 200 lượt làm), nên hiệu chỉnh lại band của từng câu theo tỉ lệ đúng thực tế.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText, LevelId } from '../content-types'
import type {
  CefrLabel,
  PlacementAnswer,
  PlacementBand,
  PlacementEstimate,
  PlacementItem,
  PlacementSkill,
  PlacementStopReason,
} from './placement-types'

/** Hướng dẫn mặc định theo dạng câu (UI hiện trên mỗi câu; tiếng Việt mặc định cho người mới). */
export const PLACEMENT_KIND_INSTRUCTIONS: Record<PlacementItem['kind'], BilingualText> = {
  choice: { vi: 'Chọn đáp án đúng.', en: 'Choose the correct answer.' },
  'listen-choose': { vi: 'Nghe rồi chọn đáp án đúng. Bạn được nghe 2 lần.', en: 'Listen and choose the correct answer. You can listen twice.' },
  'read-choose': { vi: 'Đọc đoạn ngắn rồi chọn đáp án đúng.', en: 'Read the short text and choose the correct answer.' },
}

/* ============================================================================
 * NGÂN HÀNG CÂU HỎI
 * ========================================================================== */

export const PLACEMENT_V3_ITEMS: PlacementItem[] = [
  /* ------------------------------ BAND 0.5 ------------------------------ */
  {
    id: 'placement-v3-b05-v-01',
    band: 0.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'Which word is a number?',
    options: ['green', 'seven', 'happy', 'dog'],
    correctIndex: 1,
    explanation: {
      vi: '"Seven" là số 7. "Green" là màu xanh lá, "happy" là vui, "dog" là con chó.',
      en: '"Seven" is the number 7. The other words are a colour, a feeling and an animal.',
    },
  },
  {
    id: 'placement-v3-b05-v-02',
    band: 0.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'You meet your teacher at 8 a.m. What do you say?',
    options: ['Good morning!', 'Good night!', 'Thank you!', 'Sorry!'],
    correctIndex: 0,
    explanation: {
      vi: '8 giờ sáng là buổi sáng nên chào "Good morning!". "Good night" dùng khi chúc ngủ ngon.',
      en: '8 a.m. is in the morning, so we say "Good morning!". "Good night" is for bedtime.',
    },
  },
  {
    id: 'placement-v3-b05-g-01',
    band: 0.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'I ___ Nam.',
    options: ['is', 'are', 'am', 'be'],
    correctIndex: 2,
    explanation: {
      vi: 'Với "I" (tôi) luôn dùng "am": I am Nam.',
      en: '"I" always goes with "am": I am Nam.',
    },
  },
  {
    id: 'placement-v3-b05-g-02',
    band: 0.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'I have two ___.',
    options: ['cat', 'a cat', 'cats'],
    correctIndex: 2,
    explanation: {
      vi: 'Từ hai trở lên thì danh từ thêm -s: two cats.',
      en: 'For two or more, the noun takes -s: two cats.',
    },
  },
  {
    id: 'placement-v3-b05-l-01',
    band: 0.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'Hello! My name is Anna.',
    voice: 'gb-female',
    question: 'What is her name?',
    options: ['Linda', 'Anna', 'Kate', 'Mary'],
    correctIndex: 1,
    explanation: {
      vi: 'Cô ấy nói "My name is Anna" (Tên tôi là Anna).',
      en: 'She says, "My name is Anna."',
    },
  },
  {
    id: 'placement-v3-b05-l-02',
    band: 0.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'My brother is ten years old.',
    voice: 'gb-female',
    question: 'How old is her brother?',
    options: ['2', '12', '20', '10'],
    correctIndex: 3,
    explanation: {
      vi: '"Ten" là số 10. "Twelve" là 12, "twenty" là 20.',
      en: '"Ten" is 10. "Twelve" is 12 and "twenty" is 20.',
    },
  },
  {
    id: 'placement-v3-b05-r-01',
    band: 0.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'This is my cat. Her name is Mimi. She is black and white.',
    question: "What is the cat's name?",
    options: ['Mimi', 'Kiki', 'Lily', 'Mina'],
    correctIndex: 0,
    explanation: {
      vi: 'Câu thứ hai: "Her name is Mimi" (Tên nó là Mimi).',
      en: 'The second sentence says, "Her name is Mimi."',
    },
  },
  {
    id: 'placement-v3-b05-r-02',
    band: 0.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'I am Hoa. I am a student. I like apples and bananas.',
    question: 'What does Hoa like?',
    options: ['milk and bread', 'cats and dogs', 'apples and bananas', 'books and pens'],
    correctIndex: 2,
    explanation: {
      vi: 'Hoa viết "I like apples and bananas" (Tôi thích táo và chuối).',
      en: 'Hoa writes, "I like apples and bananas."',
    },
  },

  /* ------------------------------ BAND 1.5 ------------------------------ */
  // Câu khởi động (luôn là câu số 1 của bài): rất dễ, quen thuộc, không đánh đố.
  {
    id: 'placement-v3-b15-v-01',
    band: 1.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'I sleep in my ___.',
    options: ['bedroom', 'kitchen', 'bathroom', 'garden'],
    correctIndex: 0,
    explanation: {
      vi: '"Bedroom" là phòng ngủ. "Kitchen" là bếp, "bathroom" là phòng tắm, "garden" là vườn.',
      en: 'We sleep in a bedroom. We cook in a kitchen.',
    },
  },
  {
    id: 'placement-v3-b15-v-02',
    band: 1.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'Which day comes after Saturday?',
    options: ['Friday', 'Monday', 'Sunday', 'Tuesday'],
    correctIndex: 2,
    explanation: {
      vi: 'Thứ tự: Friday (thứ Sáu), Saturday (thứ Bảy), Sunday (Chủ nhật).',
      en: 'The order is Friday, Saturday, Sunday.',
    },
  },
  {
    id: 'placement-v3-b15-v-03',
    band: 1.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: "My father's brother is my ___.",
    options: ['aunt', 'cousin', 'son', 'uncle'],
    correctIndex: 3,
    explanation: {
      vi: 'Anh/em trai của bố là "uncle" (chú/bác). "Aunt" là cô/dì.',
      en: "Your father's brother is your uncle. Your father's sister is your aunt.",
    },
  },
  {
    id: 'placement-v3-b15-g-01',
    band: 1.5,
    skill: 'grammar',
    kind: 'choice',
    question: '___ you like coffee?',
    options: ['Do', 'Are', 'Does', 'Is'],
    correctIndex: 0,
    explanation: {
      vi: 'Câu hỏi với "you" và động từ thường (like) dùng "Do".',
      en: 'Questions with "you" and an action verb like "like" start with "Do".',
    },
  },
  {
    id: 'placement-v3-b15-g-02',
    band: 1.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'There ___ a book on the table.',
    options: ['are', 'is', 'am', 'be'],
    correctIndex: 1,
    explanation: {
      vi: '"A book" là một cuốn (số ít) nên dùng "There is".',
      en: '"A book" is singular, so we use "There is".',
    },
  },
  {
    id: 'placement-v3-b15-g-03',
    band: 1.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'My sister ___ swim very well.',
    options: ['cans', 'is', 'can', 'can to'],
    correctIndex: 2,
    explanation: {
      vi: '"Can" không thêm -s, theo sau là động từ nguyên mẫu: can swim.',
      en: '"Can" never takes -s and is followed by the base verb: can swim.',
    },
  },
  {
    id: 'placement-v3-b15-l-01',
    band: 1.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: What time is it?\nMan: It's seven o'clock.",
    voice: 'gb-male',
    question: 'What time is it?',
    options: ['6:00', '7:00', '7:30', '11:00'],
    correctIndex: 1,
    explanation: {
      vi: 'Người đàn ông nói "seven o\'clock" = 7 giờ đúng.',
      en: 'The man says "seven o\'clock", which is 7:00.',
    },
  },
  {
    id: 'placement-v3-b15-l-02',
    band: 1.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'The supermarket is next to the bank.',
    voice: 'gb-female',
    question: 'Where is the supermarket?',
    options: ['behind the bank', 'next to the school', 'opposite the bank', 'next to the bank'],
    correctIndex: 3,
    explanation: {
      vi: '"Next to" là bên cạnh: siêu thị ở cạnh ngân hàng.',
      en: '"Next to" means beside. The supermarket is beside the bank.',
    },
  },
  {
    id: 'placement-v3-b15-r-01',
    band: 1.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: "Tom gets up at six o'clock. He has breakfast with his family. Then he walks to school.",
    question: 'How does Tom go to school?',
    options: ['by bus', 'on foot', 'by car', 'by bike'],
    correctIndex: 1,
    explanation: {
      vi: '"He walks to school" là đi bộ đến trường, tức "on foot".',
      en: '"He walks to school" means he goes on foot.',
    },
  },
  {
    id: 'placement-v3-b15-r-02',
    band: 1.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'Shop opening hours. Monday to Friday: 8 a.m. to 6 p.m. Saturday: 9 a.m. to 1 p.m. We are closed on Sundays.',
    question: 'Which day is the shop closed all day?',
    options: ['Saturday', 'Monday', 'Friday', 'Sunday'],
    correctIndex: 3,
    explanation: {
      vi: 'Thông báo ghi "We are closed on Sundays" (Chủ nhật đóng cửa).',
      en: 'The notice says, "We are closed on Sundays."',
    },
  },

  /* ------------------------------ BAND 2.5 ------------------------------ */
  {
    id: 'placement-v3-b25-g-01',
    band: 2.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'My brother ___ football every Saturday.',
    options: ['play', 'plays', 'playing', 'is play'],
    correctIndex: 1,
    explanation: {
      vi: 'Thói quen ("every Saturday") với "my brother" (ngôi 3 số ít) nên thêm -s: plays.',
      en: 'A habit with "my brother" (he) needs the verb with -s: plays.',
    },
  },
  {
    id: 'placement-v3-b25-g-02',
    band: 2.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'We ___ to the beach last summer.',
    options: ['go', 'goes', 'went', 'going'],
    correctIndex: 2,
    explanation: {
      vi: '"Last summer" (hè năm ngoái) là quá khứ: go chuyển thành went.',
      en: '"Last summer" is in the past, so "go" becomes "went".',
    },
  },
  {
    id: 'placement-v3-b25-g-03',
    band: 2.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'My new phone is ___ than my old one.',
    options: ['smaller', 'small', 'smallest', 'more small'],
    correctIndex: 0,
    explanation: {
      vi: 'Có "than" thì dùng so sánh hơn; tính từ ngắn thêm -er: smaller.',
      en: '"Than" needs a comparative. Short adjectives add -er: smaller.',
    },
  },
  {
    id: 'placement-v3-b25-v-01',
    band: 2.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'The opposite of "cheap" is ___.',
    options: ['poor', 'expensive', 'cheaper', 'small'],
    correctIndex: 1,
    explanation: {
      vi: '"Cheap" là rẻ, trái nghĩa là "expensive" (đắt).',
      en: '"Cheap" means low in price; "expensive" means high in price.',
    },
  },
  {
    id: 'placement-v3-b25-v-02',
    band: 2.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'A ___ works in a hospital and looks after sick people.',
    options: ['waiter', 'farmer', 'pilot', 'nurse'],
    correctIndex: 3,
    explanation: {
      vi: '"Nurse" là y tá: làm ở bệnh viện, chăm sóc người bệnh.',
      en: 'A nurse works in a hospital and cares for sick people.',
    },
  },
  {
    id: 'placement-v3-b25-l-01',
    band: 2.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Hi, it's Lan. Just to remind you, the party is on Friday, not Thursday. See you there!",
    voice: 'gb-female',
    question: 'When is the party?',
    options: ['on Thursday', 'on Friday', 'on Saturday'],
    correctIndex: 1,
    explanation: {
      vi: 'Lan nói "on Friday, not Thursday": tiệc vào thứ Sáu.',
      en: 'Lan says "on Friday, not Thursday".',
    },
  },
  {
    id: 'placement-v3-b25-l-02',
    band: 2.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: How much are these apples?\nMan: They're two pounds a kilo.",
    voice: 'gb-male',
    question: 'How much are the apples?',
    options: ['£2 each', '£12 a kilo', '£2 a kilo', '£10 a kilo'],
    correctIndex: 2,
    explanation: {
      vi: 'Người bán nói "two pounds a kilo" = 2 bảng một ký.',
      en: 'The man says "two pounds a kilo".',
    },
  },
  {
    id: 'placement-v3-b25-r-01',
    band: 2.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: "Dear Mai, I'm sorry, but I can't come to your house on Saturday. My grandmother is ill, so I'm going to visit her in Hue. Can we meet next week? Linh",
    question: "Why can't Linh go to Mai's house?",
    options: ['She is ill.', 'She has a test.', 'She is visiting her sick grandmother.', 'She is on holiday in Hue.'],
    correctIndex: 2,
    explanation: {
      vi: 'Linh viết bà bị ốm ("My grandmother is ill") nên Linh đi thăm bà.',
      en: "Linh's grandmother is ill, so Linh is going to visit her.",
    },
  },
  {
    id: 'placement-v3-b25-r-02',
    band: 2.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'The city museum is open every day from 9 a.m. to 5 p.m. Tickets cost 50,000 dong for adults. Children under six get in free.',
    question: "Who doesn't need to pay?",
    options: ['all children', 'adults', 'children under six', 'students'],
    correctIndex: 2,
    explanation: {
      vi: '"Children under six get in free" = trẻ dưới 6 tuổi vào miễn phí.',
      en: 'The text says, "Children under six get in free."',
    },
  },

  /* ------------------------------ BAND 3.5 ------------------------------ */
  {
    id: 'placement-v3-b35-g-01',
    band: 3.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'She has worked at this hospital ___ ten years.',
    options: ['since', 'for', 'during', 'ago'],
    correctIndex: 1,
    explanation: {
      vi: '"Ten years" là một khoảng thời gian nên dùng "for". "Since" đi với mốc thời gian.',
      en: '"Ten years" is a period of time, so use "for". "Since" needs a starting point.',
    },
  },
  {
    id: 'placement-v3-b35-g-02',
    band: 3.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'If it ___ tomorrow, we will stay at home.',
    options: ['will rain', 'rained', 'raining', 'rains'],
    correctIndex: 3,
    explanation: {
      vi: 'Điều kiện loại 1: vế "if" dùng hiện tại đơn (rains), không dùng "will".',
      en: 'First conditional: the "if" part uses the present simple (rains), not "will".',
    },
  },
  {
    id: 'placement-v3-b35-g-03',
    band: 3.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'I was cooking dinner when the phone ___.',
    options: ['was ringing', 'rang', 'rings', 'has rung'],
    correctIndex: 1,
    explanation: {
      vi: 'Việc ngắn xen vào việc đang diễn ra (was cooking) dùng quá khứ đơn: rang.',
      en: 'A short action interrupting a longer one (was cooking) uses the past simple: rang.',
    },
  },
  {
    id: 'placement-v3-b35-v-01',
    band: 3.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: "Could you ___ my cat while I'm on holiday?",
    options: ['look for', 'look up', 'look after', 'look at'],
    correctIndex: 2,
    explanation: {
      vi: '"Look after" = chăm sóc. "Look for" là tìm, "look at" là nhìn.',
      en: '"Look after" means take care of. "Look for" means try to find.',
    },
  },
  {
    id: 'placement-v3-b35-v-02',
    band: 3.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'The film was so ___ that I fell asleep.',
    options: ['boring', 'bored', 'exciting', 'interested'],
    correctIndex: 0,
    explanation: {
      vi: 'Bộ phim gây chán nên dùng đuôi -ing: boring. "Bored" tả cảm xúc của người.',
      en: 'Use -ing for the thing that causes the feeling: boring. "Bored" describes a person.',
    },
  },
  {
    id: 'placement-v3-b35-l-01',
    band: 3.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: Shall we meet at the café at ten?\nMan: I've got a meeting until ten. Can we make it eleven instead?\nWoman: Sure, eleven is fine.",
    voice: 'gb-female',
    question: 'What time will they meet?',
    options: ['10:00', '10:30', '11:00', '12:00'],
    correctIndex: 2,
    explanation: {
      vi: 'Anh ấy bận đến 10 giờ, đề nghị "eleven instead" và cô ấy đồng ý.',
      en: 'He is busy until ten, suggests "eleven instead", and she agrees.',
    },
  },
  {
    id: 'placement-v3-b35-l-02',
    band: 3.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'Attention, please. The ten fifteen train to Hai Phong is running about twenty minutes late. It will now leave from platform four, not platform two.',
    voice: 'gb-female',
    question: 'Which platform will the train leave from?',
    options: ['platform 2', 'platform 4', 'platform 10', 'platform 15'],
    correctIndex: 1,
    explanation: {
      vi: 'Thông báo nói "platform four, not platform two": tàu đi từ sân ga số 4.',
      en: 'The announcement says "platform four, not platform two".',
    },
  },
  {
    id: 'placement-v3-b35-r-01',
    band: 3.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'Last year, Minh stopped driving to work and started cycling instead. The journey takes him ten minutes longer, but he feels healthier and saves a lot of money on petrol.',
    question: 'What is one disadvantage of cycling for Minh?',
    options: ['It costs more money.', 'He feels less healthy.', 'He has to cycle in the rain.', 'The journey takes longer.'],
    correctIndex: 3,
    explanation: {
      vi: '"Takes him ten minutes longer" (mất thêm 10 phút) là bất lợi duy nhất được nêu.',
      en: '"Takes him ten minutes longer" is the only disadvantage mentioned.',
    },
  },
  {
    id: 'placement-v3-b35-r-02',
    band: 3.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: "Our English club meets every Tuesday evening. New members are always welcome, and you don't need to book. However, please bring your own dictionary, as we don't have enough for everyone.",
    question: 'What does the club ask members to do?',
    options: ['book a place', 'bring a dictionary', 'pay a fee', 'come on Wednesday'],
    correctIndex: 1,
    explanation: {
      vi: '"Please bring your own dictionary" = hãy mang từ điển riêng. Không cần đặt chỗ.',
      en: 'The text says, "please bring your own dictionary". Booking is not needed.',
    },
  },

  /* ------------------------------ BAND 4.5 ------------------------------ */
  {
    id: 'placement-v3-b45-g-01',
    band: 4.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'Our school ___ by a local architect fifty years ago.',
    options: ['designed', 'has designed', 'was designed', 'is designing'],
    correctIndex: 2,
    explanation: {
      vi: 'Ngôi trường không tự thiết kế được nên dùng bị động quá khứ: was designed.',
      en: 'The school did not design itself, so use the past passive: was designed.',
    },
  },
  {
    id: 'placement-v3-b45-g-02',
    band: 4.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'If I ___ more free time, I would learn to play the guitar.',
    options: ['had', 'have', 'will have', 'would have'],
    correctIndex: 0,
    explanation: {
      vi: 'Điều kiện loại 2 (giả định hiện tại): If + quá khứ đơn "had", vế sau dùng "would".',
      en: 'Second conditional (imaginary present): If + past simple "had", then "would" + verb.',
    },
  },
  {
    id: 'placement-v3-b45-v-01',
    band: 4.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'Could you ___ me a favour and post this letter?',
    options: ['make', 'give', 'take', 'do'],
    correctIndex: 3,
    explanation: {
      vi: 'Cụm cố định: "do someone a favour" = giúp ai một việc.',
      en: 'Fixed phrase: "do someone a favour" means help someone.',
    },
  },
  {
    id: 'placement-v3-b45-v-02',
    band: 4.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'Although the hotel was expensive, the service was ___: the staff were slow and unfriendly.',
    options: ['excellent', 'disappointing', 'generous', 'impressive'],
    correctIndex: 1,
    explanation: {
      vi: 'Nhân viên chậm, không thân thiện nên dịch vụ "disappointing" (đáng thất vọng).',
      en: 'Slow, unfriendly staff mean the service was disappointing.',
    },
  },
  {
    id: 'placement-v3-b45-l-01',
    band: 4.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: Are you taking the bus to the conference tomorrow?\nMan: I was going to, but a colleague has offered me a lift, so I'll go with her.",
    voice: 'gb-male',
    question: 'How will the man travel to the conference?',
    options: ['by bus', "in a colleague's car", 'by train', 'on foot'],
    correctIndex: 1,
    explanation: {
      vi: 'Anh ấy định đi xe buýt nhưng đồng nghiệp cho đi nhờ xe ("offered me a lift").',
      en: 'He planned to take the bus, but a colleague "offered me a lift".',
    },
  },
  {
    id: 'placement-v3-b45-l-02',
    band: 4.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: The new library is really impressive, isn't it?\nMan: The building's lovely, I'll give you that. But it's a shame they've cut the opening hours. I can hardly ever get there now.",
    voice: 'gb-male',
    question: 'What is the man unhappy about?',
    options: ['the building', 'the staff', 'the opening hours', 'the location'],
    correctIndex: 2,
    explanation: {
      vi: 'Anh ấy khen toà nhà nhưng tiếc vì giờ mở cửa bị cắt ("cut the opening hours").',
      en: 'He likes the building but regrets that "they\'ve cut the opening hours".',
    },
  },
  {
    id: 'placement-v3-b45-r-01',
    band: 4.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'Many people believe that goldfish can remember things for only three seconds. However, experiments have shown that goldfish can be trained to respond to sounds and can remember them for months. The three-second idea, it seems, is simply a myth.',
    question: 'What is the main point of the text?',
    options: [
      'Goldfish remember things for longer than many people think.',
      'Goldfish can only remember things for three seconds.',
      'Goldfish are difficult to train.',
      'Scientists disagree about goldfish memory.',
    ],
    correctIndex: 0,
    explanation: {
      vi: 'Cá vàng nhớ được hàng tháng; ý "ba giây" chỉ là chuyện hoang đường (myth).',
      en: 'Goldfish can remember for months; the three-second idea is "a myth".',
    },
  },
  {
    id: 'placement-v3-b45-r-02',
    band: 4.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'When Hana started her online shop, she worked alone at her kitchen table. Three years later, she employs six people and rents a small office. She still answers every customer email herself, though, because she believes it keeps the business personal.',
    question: 'Why does Hana answer customer emails herself?',
    options: ['Her staff are too busy.', 'She has no employees.', 'She wants the business to feel personal.', 'Customers complained about her staff.'],
    correctIndex: 2,
    explanation: {
      vi: 'Câu cuối: "because she believes it keeps the business personal" (giữ sự gần gũi).',
      en: 'The last sentence: "because she believes it keeps the business personal".',
    },
  },

  /* ------------------------------ BAND 5.5 ------------------------------ */
  {
    id: 'placement-v3-b55-g-01',
    band: 5.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'If she had left home earlier, she ___ the train.',
    options: ['would catch', 'will catch', 'had caught', 'would have caught'],
    correctIndex: 3,
    explanation: {
      vi: 'Điều kiện loại 3 (quá khứ không xảy ra): If + had V3, would have + V3.',
      en: 'Third conditional (unreal past): If + had + past participle, would have + past participle.',
    },
  },
  {
    id: 'placement-v3-b55-g-02',
    band: 5.5,
    skill: 'grammar',
    kind: 'choice',
    question: "My laptop isn't working, so I need to get it ___.",
    options: ['repair', 'repaired', 'to repair', 'repairing'],
    correctIndex: 1,
    explanation: {
      vi: '"Get something + V3" = nhờ người khác làm: get it repaired (mang đi sửa).',
      en: '"Get something done" means someone else does it for you: get it repaired.',
    },
  },
  {
    id: 'placement-v3-b55-v-01',
    band: 5.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'The number of tourists visiting the island has ___ sharply since the new airport opened.',
    options: ['raised', 'arisen', 'increased', 'grown up'],
    correctIndex: 2,
    explanation: {
      vi: '"Increase" không cần tân ngữ. "Raise" cần tân ngữ; "grow up" là lớn lên (người).',
      en: '"Increase" needs no object. "Raise" needs an object; "grow up" is for people.',
    },
  },
  {
    id: 'placement-v3-b55-v-02',
    band: 5.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'Air pollution ___ a serious threat to public health.',
    options: ['poses', 'makes', 'does', 'takes'],
    correctIndex: 0,
    explanation: {
      vi: 'Kết hợp từ cố định: "pose a threat" hoặc "pose a risk" = gây ra mối đe doạ.',
      en: 'Fixed collocation: "pose a threat" or "pose a risk".',
    },
  },
  {
    id: 'placement-v3-b55-l-01',
    band: 5.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'Woman: Did you enjoy the talk on renewable energy?\nMan: Well, the speaker clearly knew her subject, but she tried to cover far too much in an hour. By the end, most of us had stopped taking notes.',
    voice: 'gb-male',
    question: "What was the man's opinion of the talk?",
    options: ['The speaker did not know enough.', 'The topic was not interesting.', 'It contained too much information.', 'It was easy to follow.'],
    correctIndex: 2,
    explanation: {
      vi: 'Diễn giả hiểu chủ đề nhưng "tried to cover far too much" (quá nhiều nội dung).',
      en: 'The speaker knew her subject but "tried to cover far too much".',
    },
  },
  {
    id: 'placement-v3-b55-l-02',
    band: 5.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Before you begin the experiment, make sure you've read the safety notes. You won't need your goggles until step three, but please keep them on your desk from the start.",
    voice: 'gb-female',
    question: 'When should students put on their goggles?',
    options: ['at the start', 'at step three', 'after the experiment', 'before reading the notes'],
    correctIndex: 1,
    explanation: {
      vi: '"Won\'t need your goggles until step three": đến bước 3 mới cần đeo kính.',
      en: '"You won\'t need your goggles until step three."',
    },
  },
  {
    id: 'placement-v3-b55-r-01',
    band: 5.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'Working from home was once seen as a perk offered only by forward-thinking companies. Today, many employers regard it as a practical necessity rather than a reward. Nevertheless, some managers remain unconvinced, arguing that creativity suffers when colleagues rarely meet in person.',
    question: 'What worries some managers about working from home?',
    options: ['It costs companies too much.', 'Staff work too many hours.', 'It is only a reward.', 'It may reduce creativity.'],
    correctIndex: 3,
    explanation: {
      vi: 'Một số quản lý cho rằng "creativity suffers" (sáng tạo giảm) khi ít gặp mặt.',
      en: 'Some managers argue that "creativity suffers" when colleagues rarely meet.',
    },
  },
  {
    id: 'placement-v3-b55-r-02',
    band: 5.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: "The town's new cycle lanes were expected to reduce traffic. Surprisingly, car journeys in the centre fell only slightly in the first year. Officials suggest that the real change may take longer, as people need time to alter long-established habits.",
    question: 'According to officials, why has traffic not fallen much yet?',
    options: ['The cycle lanes are too narrow.', 'People need time to change their habits.', 'Fewer people now own bicycles.', 'The lanes were built in the wrong place.'],
    correctIndex: 1,
    explanation: {
      vi: 'Quan chức cho rằng người dân cần thời gian để đổi thói quen lâu năm.',
      en: 'Officials say people "need time to alter long-established habits".',
    },
  },

  /* ------------------------------ BAND 6.5 ------------------------------ */
  {
    id: 'placement-v3-b65-g-01',
    band: 6.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'Not only ___ the exam, but she also got the highest mark in her class.',
    options: ['she passed', 'did she pass', 'she did pass', 'passed she'],
    correctIndex: 1,
    explanation: {
      vi: 'Câu mở đầu bằng "Not only" phải đảo ngữ như câu hỏi: did she pass.',
      en: 'After "Not only" at the start, use question word order: did she pass.',
    },
  },
  {
    id: 'placement-v3-b65-g-02',
    band: 6.5,
    skill: 'grammar',
    kind: 'choice',
    question: 'If I had studied medicine at university, I ___ a doctor now.',
    options: ['would have been', 'will be', 'had been', 'would be'],
    correctIndex: 3,
    explanation: {
      vi: 'Điều kiện hỗn hợp: giả định quá khứ (had studied) dẫn đến kết quả hiện tại ("now"): would be.',
      en: 'Mixed conditional: an unreal past cause (had studied) with a present result ("now"): would be.',
    },
  },
  {
    id: 'placement-v3-b65-v-01',
    band: 6.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'At first she was ___ to accept the job because of the long hours, but in the end she agreed.',
    options: ['eager', 'keen', 'reluctant', 'delighted'],
    correctIndex: 2,
    explanation: {
      vi: '"Reluctant" = ngần ngại, không muốn; hợp với "but in the end she agreed".',
      en: '"Reluctant" means unwilling, which fits "but in the end she agreed".',
    },
  },
  {
    id: 'placement-v3-b65-v-02',
    band: 6.5,
    skill: 'vocabulary',
    kind: 'choice',
    question: 'The two studies reached ___ conclusions: one found a strong link, while the other found none.',
    options: ['contradictory', 'consistent', 'identical', 'complementary'],
    correctIndex: 0,
    explanation: {
      vi: 'Một nghiên cứu thấy liên hệ, nghiên cứu kia không: kết luận trái ngược (contradictory).',
      en: 'One found a link and the other did not, so the conclusions were contradictory.',
    },
  },
  {
    id: 'placement-v3-b65-l-01',
    band: 6.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: "Woman: So, are you going to apply for the manager's job?\nMan: I'd be lying if I said I wasn't tempted. The salary's better, obviously. But I'd have far less time with my kids, and that's not a trade I'm willing to make at the moment.",
    voice: 'gb-male',
    question: 'What does the man decide?',
    options: ['He will apply because of the salary.', 'He has already applied.', 'He has not decided yet.', 'He will not apply for now.'],
    correctIndex: 3,
    explanation: {
      vi: 'Anh ấy bị hấp dẫn nhưng "not a trade I\'m willing to make at the moment".',
      en: 'He is tempted, but "that\'s not a trade I\'m willing to make at the moment".',
    },
  },
  {
    id: 'placement-v3-b65-l-02',
    band: 6.5,
    skill: 'listening',
    kind: 'listen-choose',
    audioText: 'Many people assume that working longer hours always means getting more done. However, studies of office workers suggest that, beyond about fifty hours a week, output per hour falls so sharply that the extra time adds very little.',
    voice: 'gb-female',
    question: "What is the speaker's main point?",
    options: [
      'Office workers should work fifty hours a week.',
      'Very long working hours add little extra output.',
      'Output rises steadily with working hours.',
      'Most people work fewer than fifty hours a week.',
    ],
    correctIndex: 1,
    explanation: {
      vi: 'Quá khoảng 50 giờ/tuần, năng suất mỗi giờ giảm mạnh nên giờ làm thêm "adds very little".',
      en: 'Beyond about fifty hours, output per hour drops so much that extra time "adds very little".',
    },
  },
  {
    id: 'placement-v3-b65-r-01',
    band: 6.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: "Critics of standardised testing argue that it encourages teachers to 'teach to the test', narrowing what students learn. Supporters counter that, without common measures, it would be impossible to identify schools that are failing their students. Both sides, however, accept that tests reveal only part of what a good education involves.",
    question: 'What do both critics and supporters accept?',
    options: ['Tests should be abolished.', 'Teachers always teach to the test.', 'Tests show only part of a good education.', 'Failing schools are easy to identify.'],
    correctIndex: 2,
    explanation: {
      vi: 'Câu cuối: cả hai phía đều chấp nhận bài thi chỉ cho thấy "only part" của giáo dục tốt.',
      en: 'The last sentence: both sides accept tests "reveal only part" of a good education.',
    },
  },
  {
    id: 'placement-v3-b65-r-02',
    band: 6.5,
    skill: 'reading',
    kind: 'read-choose',
    passage: 'The decline in bee populations has often been blamed on a single cause, usually pesticides. Yet researchers increasingly describe it as the combined result of several pressures, including habitat loss, disease and climate change, none of which would be as damaging on its own.',
    question: 'What do researchers increasingly believe?',
    options: [
      'Pesticides are the only cause of the decline.',
      'Several pressures together explain the decline.',
      'Climate change is the most serious factor.',
      'Bee populations are no longer falling.',
    ],
    correctIndex: 1,
    explanation: {
      vi: 'Nhà nghiên cứu xem sự suy giảm là kết quả của nhiều áp lực cộng lại ("combined result").',
      en: 'Researchers see it as "the combined result of several pressures".',
    },
  },
]

/* ============================================================================
 * THUẬT TOÁN (các hàm thuần: cùng đầu vào → cùng kết quả, không đọc/ghi gì bên ngoài)
 * ========================================================================== */

/** Các tham số — đổi ở đây là đổi cả thuật toán (nhớ chạy lại ví dụ tự kiểm tra trong comment đầu file). */
export const PLACEMENT_RULES = {
  startBand: 1.5 as PlacementBand,
  minBand: 0.5,
  maxBand: 6.5,
  maxItems: 12,
  /** Số câu tối thiểu trước khi được dừng vì "đã hội tụ" (người ở mức ≤ 1.5 thì 6 câu). */
  minItemsConverged: 10,
  minItemsConvergedBeginner: 6,
  convergeWindow: 5,
  minItemsTopReached: 10,
  /** Mô hình chấm */
  slope: 1.5,
  priorMean: 2.5,
  priorSd: 3.0,
  gridMax: 7.5,
  gridStep: 0.05,
}

const SKILL_ORDER: PlacementSkill[] = ['vocabulary', 'grammar', 'listening', 'reading']
const ITEM_BY_ID = new Map(PLACEMENT_V3_ITEMS.map((item) => [item.id, item]))

interface AnsweredItem {
  item: PlacementItem
  correct: boolean
}

/** Ghép câu trả lời với câu hỏi trong ngân hàng (bỏ qua id lạ). */
function toHistory(answers: PlacementAnswer[]): AnsweredItem[] {
  const history: AnsweredItem[] = []
  for (const answer of answers) {
    const item = ITEM_BY_ID.get(answer.itemId)
    if (item) history.push({ item, correct: answer.correct })
  }
  return history
}

const countAt = (history: AnsweredItem[], band: number, correct: boolean) =>
  history.filter((h) => h.item.band === band && h.correct === correct).length

/** Band thấp nhất "bị khoá": đã sai ≥ 2 câu VÀ số câu sai nhiều hơn số câu đúng ở band đó. Không có thì null. */
function lowestLockedBand(history: AnsweredItem[]): number | null {
  const locked = [...new Set(history.map((h) => h.item.band))].filter((band) => {
    const wrong = countAt(history, band, false)
    return wrong >= 2 && wrong > countAt(history, band, true)
  })
  return locked.length ? Math.min(...locked) : null
}

/** Mức độ khó cho câu tiếp theo (mục 2 trong đặc tả). */
export function nextPlacementBand(answers: PlacementAnswer[]): PlacementBand {
  const history = toHistory(answers)
  if (history.length === 0) return PLACEMENT_RULES.startBand
  const last = history[history.length - 1]
  const noMistakeYet = history.every((h) => h.correct)
  let next = last.correct ? last.item.band + (noMistakeYet && last.item.band >= 2.5 ? 2 : 1) : last.item.band - 1
  next = Math.min(PLACEMENT_RULES.maxBand, Math.max(PLACEMENT_RULES.minBand, next))
  const locked = lowestLockedBand(history)
  if (locked !== null && next >= locked) next = Math.max(PLACEMENT_RULES.minBand, locked - 1)
  return next as PlacementBand
}

/** Chọn câu theo mục 3 (không kiểm tra luật dừng). */
function pickItem(answers: PlacementAnswer[]): PlacementItem | null {
  const history = toHistory(answers)
  const used = new Set(answers.map((a) => a.itemId))
  const band = nextPlacementBand(answers)
  const usedPerSkill = (skill: PlacementSkill) => history.filter((h) => h.item.skill === skill).length
  // sort ổn định: hoà nhau thì giữ thứ tự V → G → L → R
  const skills = [...SKILL_ORDER].sort((a, b) => usedPerSkill(a) - usedPerSkill(b))
  const findAt = (targetBand: number) => {
    for (const skill of skills) {
      const item = PLACEMENT_V3_ITEMS.find((i) => i.band === targetBand && i.skill === skill && !used.has(i.id))
      if (item) return item
    }
    return null
  }
  // band mục tiêu trước, rồi band gần nhất (ưu tiên thấp hơn)
  for (let distance = 0; distance <= 6; distance++) {
    for (const candidate of distance === 0 ? [band] : [band - distance, band + distance]) {
      if (candidate < PLACEMENT_RULES.minBand || candidate > PLACEMENT_RULES.maxBand) continue
      const item = findAt(candidate)
      if (item) return item
    }
  }
  return null
}

/** Có dừng bài chưa? null = làm tiếp (mục 4 trong đặc tả). */
export function placementStopReason(answers: PlacementAnswer[]): PlacementStopReason | null {
  const history = toHistory(answers)
  const n = history.length
  if (countAt(history, 0.5, false) >= 2) return 'beginner-floor'
  if (n >= PLACEMENT_RULES.minItemsTopReached && countAt(history, 6.5, true) >= 2) return 'top-reached'
  if (n >= PLACEMENT_RULES.convergeWindow) {
    const recent = history.slice(-PLACEMENT_RULES.convergeWindow).map((h) => h.item.band)
    const highest = Math.max(...recent)
    const minItems = highest <= 1.5 ? PLACEMENT_RULES.minItemsConvergedBeginner : PLACEMENT_RULES.minItemsConverged
    if (n >= minItems && highest - Math.min(...recent) <= 1) return 'converged'
  }
  if (n >= PLACEMENT_RULES.maxItems) return 'max-items'
  if (pickItem(answers) === null) return 'bank-exhausted'
  return null
}

/** Câu tiếp theo để hiện, hoặc null nếu đã đến lúc dừng (xem placementStopReason để biết lý do). */
export function nextPlacementItem(answers: PlacementAnswer[]): PlacementItem | null {
  return placementStopReason(answers) ? null : pickItem(answers)
}

/* ------------------------------ chấm kết quả ------------------------------ */

const roundToHalf = (value: number) => Math.round(value * 2) / 2
const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value))

/** Xác suất người có band theta làm đúng 1 câu (mô hình ở mục 5 đặc tả). */
function probabilityCorrect(theta: number, item: PlacementItem): number {
  const guess = 1 / item.options.length
  return guess + (1 - guess) / (1 + Math.exp(-PLACEMENT_RULES.slope * (theta - item.band)))
}

/** Bảng IDP (psych-adult A18): band IELTS → CEFR. */
function bandToCefr(band: number): CefrLabel {
  const rounded = roundToHalf(band)
  if (rounded <= 1.5) return 'Pre-A1'
  if (rounded <= 2.5) return 'A1'
  if (rounded <= 3.5) return 'A2'
  if (rounded <= 5) return 'B1'
  return 'B2'
}

function bandToLevel(band: number): LevelId {
  if (band < 2) return 'level-1'
  if (band < 4) return 'level-2'
  return 'level-3'
}

function emptySkillTally(): PlacementEstimate['bySkill'] {
  return {
    vocabulary: { answered: 0, correct: 0 },
    grammar: { answered: 0, correct: 0 },
    listening: { answered: 0, correct: 0 },
    reading: { answered: 0, correct: 0 },
  }
}

/** Kết quả khi người học bấm "Tôi mới bắt đầu từ 0" (không làm bài). */
export function completeBeginnerResult(): PlacementEstimate {
  return {
    bandPoint: 0.5,
    bandLow: 0,
    bandHigh: 1,
    cefr: 'Pre-A1',
    cefrRange: 'Pre-A1',
    recommendedLevel: 'level-1',
    confidence: 'low',
    source: 'self-reported',
    itemsAnswered: 0,
    bySkill: emptySkillTally(),
  }
}

/**
 * "Độ hợp lý" của mọi band thử 0 … 7.5 → điểm ước lượng (mean) và độ không chắc chắn (sd).
 * Tách riêng để kiểm thử / mô phỏng. 0 câu → trả về đúng niềm tin ban đầu (prior).
 */
export function placementPosterior(answers: PlacementAnswer[]): { mean: number; sd: number } {
  const history = toHistory(answers)
  const { gridMax, gridStep, priorMean, priorSd } = PLACEMENT_RULES
  const thetas: number[] = []
  const logWeights: number[] = []
  for (let i = 0; i * gridStep <= gridMax + 1e-9; i++) {
    const theta = i * gridStep
    let logWeight = -((theta - priorMean) ** 2) / (2 * priorSd ** 2)
    for (const { item, correct } of history) {
      const p = probabilityCorrect(theta, item)
      logWeight += Math.log(correct ? p : 1 - p)
    }
    thetas.push(theta)
    logWeights.push(logWeight)
  }
  // đổi log → trọng số (trừ số lớn nhất để tránh tràn số), rồi lấy trung bình và độ lệch chuẩn
  const maxLog = Math.max(...logWeights)
  const weights = logWeights.map((lw) => Math.exp(lw - maxLog))
  const total = weights.reduce((sum, w) => sum + w, 0)
  const mean = thetas.reduce((sum, theta, i) => sum + theta * weights[i], 0) / total
  const variance = thetas.reduce((sum, theta, i) => sum + (theta - mean) ** 2 * weights[i], 0) / total
  return { mean, sd: Math.sqrt(variance) }
}

/**
 * Tính kết quả xếp lớp từ các câu đã trả lời (mục 5 trong đặc tả).
 * Gọi được bất cứ lúc nào (kể cả khi người học thoát giữa chừng). 0 câu → coi như "mới bắt đầu".
 */
export function estimatePlacement(answers: PlacementAnswer[]): PlacementEstimate {
  const history = toHistory(answers)
  if (history.length === 0) return completeBeginnerResult()
  const { mean, sd } = placementPosterior(answers)

  // khoảng band hiển thị: ±0.5 quanh tâm (θ̂ làm tròn 0.5), trần 6.5 — xem mục 5 đầu file
  const point = clamp(mean, 0, 7)
  const center = clamp(roundToHalf(point), 0, PLACEMENT_RULES.maxBand)
  const bandLow = Math.max(0, center - 0.5)
  const bandHigh = Math.min(PLACEMENT_RULES.maxBand, center + 0.5)

  // 4) CEFR, level, độ tin cậy
  const bandPoint = Math.round(point * 10) / 10
  const cefrLow = bandToCefr(bandLow)
  const cefrHigh = bandToCefr(bandHigh)
  const recommendedLevel = bandToLevel(bandPoint)
  const stretchLevel: LevelId | undefined =
    recommendedLevel === 'level-1' && bandPoint >= 1.5 ? 'level-2' : recommendedLevel === 'level-2' && bandPoint >= 3.5 ? 'level-3' : undefined
  const n = history.length
  const confidence: PlacementEstimate['confidence'] = sd <= 0.5 && n >= 5 ? 'high' : sd <= 0.85 ? 'medium' : 'low'

  const bySkill = emptySkillTally()
  for (const { item, correct } of history) {
    bySkill[item.skill].answered++
    if (correct) bySkill[item.skill].correct++
  }

  return {
    bandPoint,
    bandLow,
    bandHigh,
    cefr: bandToCefr(bandPoint),
    cefrRange: cefrLow === cefrHigh ? cefrLow : `${cefrLow}–${cefrHigh}`,
    recommendedLevel,
    ...(stretchLevel ? { stretchLevel } : {}),
    confidence,
    source: 'test',
    itemsAnswered: n,
    bySkill,
  }
}
