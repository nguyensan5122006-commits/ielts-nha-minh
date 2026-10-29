/**
 * GET /api/realtime — MỞ KẾT NỐI REALTIME (WebSocket)
 * Middleware đã kiểm tra đăng nhập. File này chuyển kết nối sang Durable Object
 * FamilyHub (worker "ielts-realtime"), kèm id + tên + nhóm tuổi người dùng do máy chủ gắn
 * (ghi đè header gửi từ trình duyệt nên không giả mạo được).
 */
import { errorResponse, type ApiHandler } from '../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../backend-helpers/read-logged-in-user'

export const onRequestGet: ApiHandler = async ({ request, env, data }) => {
  if (request.headers.get('Upgrade') !== 'websocket') return errorResponse('Cần kết nối WebSocket', 426)
  if (!env.FAMILY_HUB) return errorResponse('Máy chủ realtime chưa được cấu hình', 503)
  const user = readLoggedInUser(data)

  const headers = new Headers(request.headers)
  headers.set('x-user-id', String(user.id))
  headers.set('x-user-name', encodeURIComponent(user.displayName))
  headers.set('x-user-age-group', user.ageGroup) // (v3) bé không được cược chuối
  // cả nhà dùng chung 1 "phòng sinh hoạt" tên "family"
  const hub = env.FAMILY_HUB.get(env.FAMILY_HUB.idFromName('family'))
  return hub.fetch(new Request(request.url, { headers }))
}
