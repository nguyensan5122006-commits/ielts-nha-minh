/**
 * age-groups.ts — NHÓM TUỔI CỦA TÀI KHOẢN (dùng chung: trang web, API, máy chủ realtime)
 * ----------------------------------------------------------------------------
 *   'kid'   : bé 9–11 tuổi  -> trang chủ là Khu trò chơi, KHÔNG được cược chuối
 *   'teen'  : 12–17 tuổi    -> lộ trình học bình thường, SRS mặc định 2 nút
 *   'adult' : người lớn     -> mặc định (tài khoản cũ khi nâng cấp đều là 'adult')
 *
 * Lưu ở cột users.age_group (migration 0003). File này không phụ thuộc trình duyệt
 * hay Cloudflare nên cả 3 nơi đều import được.
 * ----------------------------------------------------------------------------
 */

export type AgeGroup = 'kid' | 'teen' | 'adult'

/** Danh sách hợp lệ — dùng để kiểm tra dữ liệu gửi lên. */
export const AGE_GROUPS: readonly AgeGroup[] = ['kid', 'teen', 'adult']

/** Nhóm tuổi mặc định khi không có thông tin. */
export const DEFAULT_AGE_GROUP: AgeGroup = 'adult'

/** Kiểm tra 1 giá trị bất kỳ có phải nhóm tuổi hợp lệ không. */
export function isAgeGroup(value: unknown): value is AgeGroup {
  return typeof value === 'string' && (AGE_GROUPS as readonly string[]).includes(value)
}

/** Đọc nhóm tuổi từ database: giá trị lạ / thiếu -> 'adult'. */
export function normalizeAgeGroup(value: unknown): AgeGroup {
  return isAgeGroup(value) ? value : DEFAULT_AGE_GROUP
}
