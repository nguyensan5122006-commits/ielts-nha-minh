/**
 * server-environment.ts
 * ----------------------------------------------------------------------------
 * Các "biến môi trường" mà Cloudflare đưa vào mỗi API.
 *   - DB              : database D1 (khai báo trong wrangler.toml)
 *   - GEMINI_API_KEY  : khoá API Gemini (bí mật, không bao giờ gửi xuống trình duyệt)
 *   - INVITE_CODE     : mã mời gia đình, cần khi đăng ký
 *   - GEMINI_MODEL    : tên model Gemini
 *   - AI_DAILY_LIMIT  : số lượt AI tối đa / người / ngày
 *   - FAMILY_HUB      : "phòng sinh hoạt chung" realtime (Durable Object)
 * ----------------------------------------------------------------------------
 */
export interface ServerEnvironment {
  DB: D1Database
  GEMINI_API_KEY?: string
  INVITE_CODE?: string
  GEMINI_MODEL?: string
  GEMINI_FALLBACK_MODEL?: string
  AI_DAILY_LIMIT?: string
  /** Durable Object xử lý realtime (chat, online, thi đấu) — nằm ở realtime-worker */
  FAMILY_HUB?: DurableObjectNamespace
}

/** Kiểu hàm xử lý API của Cloudflare Pages Functions, gắn sẵn môi trường của mình. */
export type ApiHandler = PagesFunction<ServerEnvironment>

/** Trả về JSON kèm mã trạng thái HTTP. */
export function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
  })
}

/** Trả về lỗi dạng { error: "..." } để giao diện hiển thị. */
export function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status)
}
