/**
 * POST /api/auth/logout — ĐĂNG XUẤT: xoá phiên trong DB và xoá cookie.
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { clearSessionCookie, readSessionToken } from '../../../backend-helpers/password-and-session'

export const onRequestPost: ApiHandler = async ({ request, env }) => {
  const token = readSessionToken(request)
  if (token) await env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run()
  return jsonResponse({ ok: true }, 200, { 'Set-Cookie': clearSessionCookie })
}
