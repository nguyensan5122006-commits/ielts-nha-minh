/**
 * index-v3.ts
 * ----------------------------------------------------------------------------
 * CỔNG XUẤT (export) CỦA NHÓM "BÀI XẾP LỚP + TEST LEVEL" (redesign v3).
 * Nhóm nền móng chỉ cần import từ file này — không phải mở từng file con.
 *
 *   - EXAMS_V3            : các đề dạng `Exam` (chạy trong phòng thi) → thêm vào ALL_EXAMS
 *                           = 3 bài test level v3 + đề thi thử IELTS số 2
 *   - LEVEL_TEST_V3_IDS   : id bài test của từng level → gắn vào LevelInfo.levelTestId
 *   - Bài xếp lớp thích ứng v3 (KHÔNG phải `Exam`, vì mỗi người làm câu khác nhau):
 *       ngân hàng PLACEMENT_V3_ITEMS + các hàm thuần nextPlacementItem / placementStopReason /
 *       estimatePlacement / completeBeginnerResult. Đặc tả đầy đủ ở đầu file placement-v3.ts.
 * ----------------------------------------------------------------------------
 */
import type { Exam } from '../content-types'
import { LEVEL_TESTS_V3, levelTestV3Level1, levelTestV3Level2, levelTestV3Level3 } from './level-test-v3'
import { mockIeltsTest2 } from './mock-ielts-test-2'

export { LEVEL_TESTS_V3, levelTestV3Level1, levelTestV3Level2, levelTestV3Level3, mockIeltsTest2 }

export {
  PLACEMENT_V3_ITEMS,
  PLACEMENT_RULES,
  PLACEMENT_KIND_INSTRUCTIONS,
  nextPlacementItem,
  nextPlacementBand,
  placementStopReason,
  estimatePlacement,
  placementPosterior,
  completeBeginnerResult,
} from './placement-v3'

export type {
  PlacementBand,
  PlacementSkill,
  CefrLabel,
  PlacementItem,
  PlacementChoiceItem,
  PlacementListenItem,
  PlacementReadItem,
  PlacementAnswer,
  PlacementStopReason,
  PlacementEstimate,
} from './placement-types'

/** Đề mới dạng Exam (phòng thi chạy được ngay): 3 bài test level + mock IELTS 2. */
export const EXAMS_V3: Exam[] = [...LEVEL_TESTS_V3, mockIeltsTest2]

/** id bài test cuối level (v3) — dùng cho LevelInfo.levelTestId trong all-levels.ts.
 *  Khai báo ở level-test-ids.ts (file nhỏ, không kéo nội dung đề vào trang đầu). */
export { LEVEL_TEST_V3_IDS } from './level-test-ids'
