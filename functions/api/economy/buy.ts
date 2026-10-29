/**
 * POST /api/economy/buy — MUA HÀNG
 * Body: { itemId, quantity? }  (quantity chỉ áp dụng cho món dùng 1 lần, tối đa 10)
 * Máy chủ lấy giá từ shop-catalog.ts, trừ chuối nếu đủ rồi bỏ món vào túi đồ.
 */
import { findShopItem } from '../../../src/game-economy/shop-catalog'
import { errorResponse, jsonResponse, type ApiHandler } from '../../../backend-helpers/server-environment'
import { readLoggedInUser } from '../../../backend-helpers/read-logged-in-user'
import { addToInventory, getInventory, spendBananas } from '../../../backend-helpers/banana-ledger'

export const onRequestPost: ApiHandler = async ({ request, env, data }) => {
  const user = readLoggedInUser(data)
  const body = (await request.json()) as { itemId?: string; quantity?: number }
  const item = findShopItem(body.itemId ?? '')
  if (!item || item.price <= 0) return errorResponse('Món này không bán / Item not for sale')

  const quantity = item.consumable ? Math.min(10, Math.max(1, Math.floor(body.quantity ?? 1))) : 1
  if (!item.consumable) {
    const owned = await getInventory(env.DB, user.id)
    if (owned[item.id]) return errorResponse('Bạn đã có món này rồi / Already owned')
  }

  const { ok, balance } = await spendBananas(env.DB, user.id, item.price * quantity, `shop:${item.id}`)
  if (!ok) return errorResponse('Không đủ chuối 🍌 / Not enough bananas', 402)
  await addToInventory(env.DB, user.id, item.id, quantity)
  return jsonResponse({ balance, inventory: await getInventory(env.DB, user.id) })
}
