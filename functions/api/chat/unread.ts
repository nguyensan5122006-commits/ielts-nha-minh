/**
 * GET /api/chat/unread — SỐ TIN CHƯA ĐỌC theo từng kênh + danh sách kênh riêng đã có.
 */
import { jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { countUnreadMessages, listUserChannels } from '../../../backend-helpers/chat-queries'

export const onRequestGet: ApiHandler = async ({ env, data }) => {
  const user = readLoggedInUser(data)
  return jsonResponse({ unread: await countUnreadMessages(env.DB, user.id), channels: await listUserChannels(env.DB, user.id) })
}
