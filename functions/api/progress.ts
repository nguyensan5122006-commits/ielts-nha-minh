/**
 * /api/progress — TIẾN ĐỘ HỌC CỦA NGƯỜI ĐANG ĐĂNG NHẬP
 *   GET : lấy cục JSON tiến độ (chưa có -> null, trang web tự tạo mới)
 *   PUT : ghi đè cục JSON tiến độ (trang web gửi lên ~1,5 giây sau mỗi thay đổi)
 *
 * Từ redesign v3, JSON có version: 2 (xem src/learning-progress/progress-types.ts). Máy chủ không
 * đọc nội dung — trang web tự nâng cấp bản version 1 cũ khi tải về.
 *
 * Vì sao lưu 1 cục JSON? Gia đình chỉ vài người, dữ liệu mỗi người vài chục KB.
 * Đọc/ghi 1 dòng là nhanh và đơn giản nhất — không cần thiết kế nhiều bảng.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../backend-helpers/read-logged-in-user'

// chặn dữ liệu quá lớn. Tiến độ v2 có thẻ ôn FSRS (~300 byte / thẻ) nên nâng từ 500KB lên 1,5MB
// (D1 cho phép 1 dòng tới 2MB). Người học rất nhiều (~4.000 thẻ) vẫn vừa.
const MAX_PROGRESS_BYTES = 1_500_000

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  const row = await env.DB.prepare('SELECT data_json FROM learning_progress WHERE user_id = ?')
    .bind(user.id)
    .first<{ data_json: string }>()
  return jsonResponse({ progress: row ? JSON.parse(row.data_json) : null })
}

export const onRequestPut: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const text = await request.text()
  if (text.length > MAX_PROGRESS_BYTES) return errorResponse('Dữ liệu tiến độ quá lớn', 413)
  JSON.parse(text) // ném lỗi nếu không phải JSON hợp lệ

  // "UPSERT": chưa có thì thêm, có rồi thì cập nhật
  await env.DB.prepare(
    `INSERT INTO learning_progress (user_id, data_json, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(user_id) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at`,
  )
    .bind(user.id, text)
    .run()
  return jsonResponse({ ok: true })
}
