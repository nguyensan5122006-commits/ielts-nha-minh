/**
 * read-logged-in-user.ts
 * Lấy người dùng mà _middleware.ts đã gắn vào context.data.user.
 * (Chỉ dùng trong các API cần đăng nhập — middleware đảm bảo luôn có user.)
 */
import type { LoggedInUser } from './password-and-session'

export function readLoggedInUser(data: Record<string, unknown>): LoggedInUser {
  return data.user as LoggedInUser
}
