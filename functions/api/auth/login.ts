/**
 * POST /api/auth/login — ĐĂNG NHẬP
 * Body: { username, password }. Đúng -> tạo phiên, gửi cookie.
 * Trả về { user: { id, username, displayName, ageGroup } }.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { createSession, verifyPassword } from '../../../backend-helpers/password-and-session'
import { normalizeAgeGroup } from '../../../backend-helpers/age-groups'

export const onRequestPost: ApiHandler = async ({ request, env }) => {
  const body = (await request.json()) as { username?: string; password?: string }
  // SELECT * (không liệt kê age_group) để vẫn đăng nhập được nếu migration 0003 chưa chạy trên máy chủ thật
  const user = await env.DB.prepare('SELECT * FROM users WHERE username = ?')
    .bind((body.username ?? '').trim())
    .first<{ id: number; username: string; display_name: string; password_hash: string; age_group?: string }>()

  // Cố ý trả cùng 1 thông báo cho "sai tên" và "sai mật khẩu" để không lộ tên nào tồn tại
  if (!user || !(await verifyPassword(body.password ?? '', user.password_hash))) {
    return errorResponse('Sai tên đăng nhập hoặc mật khẩu / Wrong username or password', 401)
  }

  // Dọn các phiên đã hết hạn cho database gọn
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at < strftime('%Y-%m-%dT%H:%M:%fZ','now')").run()

  const cookie = await createSession(env, user.id)
  return jsonResponse(
    { user: { id: user.id, username: user.username, displayName: user.display_name, ageGroup: normalizeAgeGroup(user.age_group) } },
    200,
    { 'Set-Cookie': cookie },
  )
}
