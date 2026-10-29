/**
 * POST /api/auth/register — ĐĂNG KÝ TÀI KHOẢN
 * Body: { username, displayName, password, inviteCode }
 * Có đặt bí mật INVITE_CODE -> chỉ người có mã mời gia đình mới đăng ký được.
 * KHÔNG đặt INVITE_CODE -> ai cũng đăng ký được (form tự ẩn ô mã, xem signup-options.ts).
 * Mọi tài khoản như nhau (không chia nhóm tuổi). Cột users.age_group cũ vẫn còn trong database
 * nhưng không dùng nữa — tài khoản mới nhận giá trị mặc định của cột.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { createSession, hashPassword } from '../../../backend-helpers/password-and-session'

export const onRequestPost: ApiHandler = async ({ request, env }) => {
  const body = (await request.json()) as {
    username?: string
    displayName?: string
    password?: string
    inviteCode?: string
  }
  const username = (body.username ?? '').trim()
  const displayName = (body.displayName ?? '').trim() || username
  const password = body.password ?? ''

  // 1. Kiểm tra mã mời (chỉ khi chủ nhà có đặt mã)
  const inviteCode = env.INVITE_CODE?.trim()
  if (inviteCode && (body.inviteCode ?? '').trim() !== inviteCode) {
    return errorResponse('Mã mời không đúng / Wrong invite code', 403)
  }

  // 2. Kiểm tra dữ liệu nhập
  if (!/^[a-zA-Z0-9_.]{3,20}$/.test(username)) {
    return errorResponse('Tên đăng nhập 3-20 ký tự, chỉ gồm chữ không dấu, số, _ hoặc . / Username: 3-20 letters, digits, _ or .')
  }
  if (password.length < 6) return errorResponse('Mật khẩu tối thiểu 6 ký tự / Password needs 6+ characters')

  // 3. Tên đã có người dùng chưa?
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first()
  if (existing) return errorResponse('Tên đăng nhập đã tồn tại / Username taken', 409)

  // 4. Lưu tài khoản (mật khẩu đã băm) rồi đăng nhập luôn
  const passwordHash = await hashPassword(password)
  const result = await env.DB.prepare('INSERT INTO users (username, display_name, password_hash) VALUES (?, ?, ?)')
    .bind(username, displayName.slice(0, 40), passwordHash)
    .run()
  const userId = Number(result.meta.last_row_id)
  const cookie = await createSession(env, userId)

  return jsonResponse({ user: { id: userId, username, displayName } }, 201, { 'Set-Cookie': cookie })
}
