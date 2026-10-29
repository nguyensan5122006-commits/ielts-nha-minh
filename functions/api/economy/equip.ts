/**
 * POST /api/economy/equip — CHỌN MÓN ĐANG DÙNG (avatar, khung, màu tên, danh hiệu)
 * Body: { slot: 'avatar' | 'frame' | 'name-color' | 'title', itemId: string | null }
 * itemId = null -> bỏ trang trí ở ô đó (avatar thì về mặc định).
 */
import { EQUIP_SLOTS, FREE_ITEM_IDS, findShopItem, type EquipSlot } from '../../../src/game-economy/shop-catalog'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { getInventory } from '../../../backend-helpers/banana-ledger'

/** ô trang trí -> tên cột trong bảng users */
const COLUMN_OF_SLOT: Record<EquipSlot, string> = { avatar: 'avatar', frame: 'frame', 'name-color': 'name_color', title: 'title' }

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const { slot, itemId } = (await request.json()) as { slot?: EquipSlot; itemId?: string | null }
  if (!slot || !EQUIP_SLOTS.includes(slot)) return errorResponse('Ô trang trí không hợp lệ')

  if (itemId) {
    const item = findShopItem(itemId)
    if (!item || item.category !== slot) return errorResponse('Món không hợp lệ cho ô này')
    const owned = await getInventory(env.DB, user.id)
    if (!owned[itemId] && !FREE_ITEM_IDS.includes(itemId)) return errorResponse('Bạn chưa có món này')
  }
  const value = itemId ?? (slot === 'avatar' ? 'avatar-smile' : null)
  // tên cột lấy từ bảng cố định ở trên (không lấy từ người dùng) nên an toàn khi ghép vào SQL
  await env.DB.prepare(`UPDATE users SET ${COLUMN_OF_SLOT[slot]} = ? WHERE id = ?`).bind(value, user.id).run()
  return jsonResponse({ ok: true })
}
