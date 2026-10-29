/**
 * password-and-session.ts
 * ----------------------------------------------------------------------------
 * 1) BĂM MẬT KHẨU: không bao giờ lưu mật khẩu gốc. Dùng PBKDF2 (có sẵn trong
 *    Web Crypto của Cloudflare) + "salt" ngẫu nhiên, lặp 100.000 vòng để kẻ xấu
 *    có lấy được database cũng rất khó dò ngược ra mật khẩu.
 * 2) PHIÊN ĐĂNG NHẬP: sau khi đăng nhập, tạo 1 token ngẫu nhiên, lưu vào bảng
 *    sessions và gửi xuống trình duyệt bằng cookie "HttpOnly" (JavaScript trên
 *    trang không đọc được cookie này -> an toàn hơn localStorage).
 * ----------------------------------------------------------------------------
 */
import type { ServerEnvironment } from './server-environment'
import { normalizeAgeGroup, type AgeGroup } from './age-groups'

const PBKDF2_ITERATIONS = 100_000 // Cloudflare Workers cho phép tối đa 100k
const SESSION_DAYS = 60 // đăng nhập 1 lần, nhớ 60 ngày
export const SESSION_COOKIE_NAME = 'ielts_session'

/* --------------------------- tiện ích chuyển đổi --------------------------- */

function bytesToHex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return bytes
}

/** So sánh 2 chuỗi trong thời gian cố định (chống tấn công đo thời gian). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/* ------------------------------- mật khẩu --------------------------------- */

async function pbkdf2(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, [
    'deriveBits',
  ])
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, keyMaterial, 256)
  return bytesToHex(new Uint8Array(bits))
}

/** Băm mật khẩu -> chuỗi lưu vào DB: "pbkdf2$100000$<salt>$<hash>" */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS)
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${hash}`
}

/** Kiểm tra mật khẩu người dùng nhập có khớp chuỗi đã lưu không. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algorithm, iterations, saltHex, hashHex] = stored.split('$')
  if (algorithm !== 'pbkdf2') return false
  const hash = await pbkdf2(password, hexToBytes(saltHex), Number(iterations))
  return safeEqual(hash, hashHex)
}

/* -------------------------------- phiên ----------------------------------- */

/** Tạo phiên mới, trả về header Set-Cookie để gửi cho trình duyệt. */
export async function createSession(env: ServerEnvironment, userId: number): Promise<string> {
  const token = bytesToHex(crypto.getRandomValues(new Uint8Array(32)))
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86_400_000).toISOString()
  await env.DB.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(token, userId, expiresAt)
    .run()
  return `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`
}

/** Header Set-Cookie để xoá cookie khi đăng xuất. */
export const clearSessionCookie = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`

/** Đọc token từ cookie của request. */
export function readSessionToken(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie') ?? ''
  for (const part of cookieHeader.split(';')) {
    const [name, ...rest] = part.trim().split('=')
    if (name === SESSION_COOKIE_NAME) return rest.join('=') || null
  }
  return null
}

export interface LoggedInUser {
  id: number
  username: string
  displayName: string
  /** (v3) nhóm tuổi — cột users.age_group (migration 0003) */
  ageGroup: AgeGroup
}

/** Tìm người dùng đang đăng nhập dựa vào cookie. Không có / hết hạn -> null. */
export async function getLoggedInUser(env: ServerEnvironment, request: Request): Promise<LoggedInUser | null> {
  const token = readSessionToken(request)
  if (!token) return null
  // Dùng u.* thay vì liệt kê u.age_group: lỡ deploy code mới TRƯỚC khi chạy migration 0003 trên
  // máy chủ thật thì cột age_group chưa có — u.* vẫn chạy được (ageGroup tạm = 'adult') thay vì
  // làm hỏng MỌI API. (Thứ tự đúng vẫn là: db:migrate:remote -> deploy.)
  const row = await env.DB.prepare(
    `SELECT u.*, s.expires_at
       FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token = ?`,
  )
    .bind(token)
    .first<{ id: number; username: string; display_name: string; age_group?: string; expires_at: string }>()
  if (!row || new Date(row.expires_at) < new Date()) return null
  return { id: row.id, username: row.username, displayName: row.display_name, ageGroup: normalizeAgeGroup(row.age_group) }
}
