/**
 * GET /api/auth/signup-options — FORM ĐĂNG KÝ CẦN HỎI NHỮNG GÌ?
 * Trả về { inviteRequired: boolean }:
 *   - true  : máy chủ có đặt bí mật INVITE_CODE -> form hiện ô "Mã gia đình"
 *   - false : không đặt mã mời -> ai cũng tạo tài khoản được, form ẩn ô mã
 * Không bao giờ trả về chính mã mời.
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'

export const onRequestGet: ApiHandler = async ({ env }) => {
  return jsonResponse({ inviteRequired: !!env.INVITE_CODE?.trim() })
}
