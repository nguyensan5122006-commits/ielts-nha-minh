/**
 * POST /api/auth/register — ĐĂNG KÝ TÀI KHOẢN
 * Body: { username, displayName, password, inviteCode, ageGroup? }
 * Có đặt bí mật INVITE_CODE -> chỉ người có mã mời gia đình mới đăng ký được.
 * KHÔNG đặt INVITE_CODE -> ai cũng đăng ký được (form tự ẩn ô mã, xem signup-options.ts).
 * ageGroup (v3): 'kid' | 'teen' | 'adult' — không gửi thì là 'adult'; gửi giá trị lạ thì báo lỗi.
 */
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { createSession, hashPassword } from '../../../backend-helpers/password-and-session'
import { DEFAULT_AGE_GROUP, isAgeGroup } from '../../../backend-helpers/age-groups'

export const onRequestPost: ApiHandler = async ({ request, env }) => {
  const body = (await request.json()) as {
    username?: string
    displayName?: string
    password?: string
    inviteCode?: string
    ageGroup?: unknown
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
  const ageGroup = body.ageGroup === undefined || body.ageGroup === null || body.ageGroup === '' ? DEFAULT_AGE_GROUP : body.ageGroup
  if (!isAgeGroup(ageGroup)) return errorResponse('Nhóm tuổi không hợp lệ (kid / teen / adult) / Invalid age group')

  // 3. Tên đã có người dùng chưa?
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first()
  if (existing) return errorResponse('Tên đăng nhập đã tồn tại / Username taken', 409)

  // 4. Lưu tài khoản (mật khẩu đã băm) rồi đăng nhập luôn
  const passwordHash = await hashPassword(password)
  const result = await env.DB.prepare('INSERT INTO users (username, display_name, password_hash, age_group) VALUES (?, ?, ?, ?)')
    .bind(username, displayName.slice(0, 40), passwordHash, ageGroup)
    .run()
  const userId = Number(result.meta.last_row_id)
  const cookie = await createSession(env, userId)

  return jsonResponse({ user: { id: userId, username, displayName, ageGroup } }, 201, { 'Set-Cookie': cookie })
}
