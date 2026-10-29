/**
 * functions/api/_middleware.ts
 * ----------------------------------------------------------------------------
 * "Người gác cổng" chạy TRƯỚC mọi API trong thư mục /api.
 *  - Bắt lỗi chung: API nào lỗi bất ngờ cũng trả về JSON gọn thay vì trang lỗi.
 *  - Kiểm tra đăng nhập: trừ đăng ký / đăng nhập, mọi API khác đều cần cookie hợp lệ.
 *    Người dùng tìm được sẽ gắn vào context.data.user để các API phía sau dùng.
 * ----------------------------------------------------------------------------
 */
import { errorResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { getLoggedInUser } from '../../backend-helpers/password-and-session'

/** Các đường dẫn không cần đăng nhập. */
const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/register', '/api/auth/me']

export const onRequest: ApiHandler = async (context) => {
  try {
    const path = new URL(context.request.url).pathname
    if (!PUBLIC_PATHS.includes(path)) {
      const user = await getLoggedInUser(context.env, context.request)
      if (!user) return errorResponse('Bạn cần đăng nhập / Please log in', 401)
      context.data.user = user
    }
    return await context.next()
  } catch (error) {
    console.error(error)
    return errorResponse('Lỗi máy chủ / Server error: ' + (error as Error).message, 500)
  }
}
