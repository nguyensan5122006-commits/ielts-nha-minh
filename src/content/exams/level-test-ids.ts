/**
 * level-test-ids.ts — ID BÀI TEST CUỐI LEVEL (v3), TÁCH RIÊNG CHO NHẸ
 * ----------------------------------------------------------------------------
 * all-levels.ts (nằm trong gói JS đầu tiên) chỉ cần CHUỖI id, không cần nội dung đề.
 * Nếu import từ index-v3.ts thì cả ngân hàng đề (~180 KB) bị kéo theo vào trang đầu.
 * Phải khớp id trong level-test-v3.ts — `npm run validate` kiểm tra.
 * ----------------------------------------------------------------------------
 */
import type { LevelId } from '../content-types'

export const LEVEL_TEST_V3_IDS: Record<LevelId, string> = {
  'level-1': 'level-test-v3-level-1',
  'level-2': 'level-test-v3-level-2',
  'level-3': 'level-test-v3-level-3',
}
