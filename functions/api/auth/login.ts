/**
 * POST /api/auth/login — ĐĂNG NHẬP
 * Body: { username, password }. Đúng -> tạo phiên, gửi cookie.
 * Trả về { user: { id, username, displayName } }.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { createSession, verifyPassword } from '../../../backend-helpers/password-and-session'

export const onRequestPost: ApiHandler = async ({ request, env }) => {
  const body = (await request.json()) as { username?: string; password?: string }
  const user = await env.DB.prepare('SELECT id, username, display_name, password_hash FROM users WHERE username = ?')
    .bind((body.username ?? '').trim())
    .first<{ id: number; username: string; display_name: string; password_hash: string }>()

  // Cố ý trả cùng 1 thông báo cho "sai tên" và "sai mật khẩu" để không lộ tên nào tồn tại
  if (!user || !(await verifyPassword(body.password ?? '', user.password_hash))) {
    return errorResponse('Sai tên đăng nhập hoặc mật khẩu / Wrong username or password', 401)
  }

  // Dọn các phiên đã hết hạn cho database gọn
  await env.DB.prepare("DELETE FROM sessions WHERE expires_at < strftime('%Y-%m-%dT%H:%M:%fZ','now')").run()

  const cookie = await createSession(env, user.id)
  return jsonResponse(
    { user: { id: user.id, username: user.username, displayName: user.display_name } },
    200,
    { 'Set-Cookie': cookie },
  )
}
