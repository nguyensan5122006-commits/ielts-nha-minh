/**
 * GET /api/auth/me — "TÔI LÀ AI?"
 * Trang web gọi khi mở để biết người dùng đã đăng nhập chưa.
 * Trả { user: null } nếu chưa đăng nhập (không báo lỗi).
 * Có đăng nhập: { user: { id, username, displayName } }.
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { getLoggedInUser } from '../../../backend-helpers/password-and-session'

export const onRequestGet: ApiHandler = async ({ request, env }) => {
  const user = await getLoggedInUser(env, request)
  return jsonResponse({ user })
}
