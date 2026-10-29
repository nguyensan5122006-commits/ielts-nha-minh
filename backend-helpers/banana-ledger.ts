/**
 * banana-ledger.ts — SỔ CÁI CHUỐI 🍌 (chỉ máy chủ được cộng / trừ chuối)
 * ----------------------------------------------------------------------------
 *  grantBananas : cộng chuối (có thể kèm dedupeKey để không nhận 2 lần 1 phần thưởng)
 *  spendBananas : trừ chuối nếu đủ — dùng câu lệnh "UPDATE ... WHERE bananas >= giá"
 *                 nên 2 yêu cầu mua cùng lúc cũng không làm chuối bị âm.
 * Mỗi thay đổi đều ghi 1 dòng vào banana_events để tra lại lịch sử.
 * D1 "batch" = chạy nhiều câu lệnh trong 1 giao dịch: lỗi 1 câu thì huỷ cả nhóm.
 * ----------------------------------------------------------------------------
 */

/** Kiểu tối giản của database D1 để file này dùng được cả ở Pages lẫn Worker realtime. */
type Database = D1Database

export async function getBananaBalance(db: Database, userId: number): Promise<number> {
  const row = await db.prepare('SELECT bananas FROM users WHERE id = ?').bind(userId).first<{ bananas: number }>()
  return row?.bananas ?? 0
}

/**
 * Cộng chuối. Trả về granted=false nếu phần thưởng này (dedupeKey) đã nhận rồi.
 */
export async function grantBananas(
  db: Database,
  userId: number,
  amount: number,
  reason: string,
  dedupeKey: string | null = null,
): Promise<{ granted: boolean; balance: number }> {
  if (amount <= 0) return { granted: false, balance: await getBananaBalance(db, userId) }
  try {
    await db.batch([
      db.prepare('INSERT INTO banana_events (user_id, amount, reason, dedupe_key) VALUES (?, ?, ?, ?)').bind(userId, amount, reason, dedupeKey),
      db.prepare('UPDATE users SET bananas = bananas + ? WHERE id = ?').bind(amount, userId),
    ])
  } catch (error) {
    // trùng dedupe_key = đã nhận rồi -> không cộng nữa
    if (String(error).includes('UNIQUE')) return { granted: false, balance: await getBananaBalance(db, userId) }
    throw error
  }
  return { granted: true, balance: await getBananaBalance(db, userId) }
}

/** Trừ chuối nếu đủ. Trả về ok=false khi không đủ chuối. */
export async function spendBananas(db: Database, userId: number, cost: number, reason: string): Promise<{ ok: boolean; balance: number }> {
  if (cost <= 0) return { ok: true, balance: await getBananaBalance(db, userId) }
  const result = await db.prepare('UPDATE users SET bananas = bananas - ? WHERE id = ? AND bananas >= ?').bind(cost, userId, cost).run()
  if (!result.meta.changes) return { ok: false, balance: await getBananaBalance(db, userId) }
  await db.prepare('INSERT INTO banana_events (user_id, amount, reason) VALUES (?, ?, ?)').bind(userId, -cost, reason).run()
  return { ok: true, balance: await getBananaBalance(db, userId) }
}

/** Đếm số lần đã nhận thưởng `reason` kể từ thời điểm `sinceSql` (để áp giới hạn / ngày). */
export async function countRewardsSince(db: Database, userId: number, reason: string, sinceSql: string): Promise<number> {
  const row = await db
    .prepare('SELECT COUNT(*) AS n FROM banana_events WHERE user_id = ? AND reason = ? AND created_at >= ?')
    .bind(userId, reason, sinceSql)
    .first<{ n: number }>()
  return row?.n ?? 0
}

/* ------------------------------ túi đồ ------------------------------ */

export async function getInventory(db: Database, userId: number): Promise<Record<string, number>> {
  const { results } = await db.prepare('SELECT item_id, quantity FROM inventory WHERE user_id = ? AND quantity > 0').bind(userId).all<{
    item_id: string
    quantity: number
  }>()
  return Object.fromEntries(results.map((row) => [row.item_id, row.quantity]))
}

export async function addToInventory(db: Database, userId: number, itemId: string, quantity: number): Promise<void> {
  await db
    .prepare(
      `INSERT INTO inventory (user_id, item_id, quantity) VALUES (?, ?, ?)
       ON CONFLICT(user_id, item_id) DO UPDATE SET quantity = quantity + excluded.quantity`,
    )
    .bind(userId, itemId, quantity)
    .run()
}

/** Dùng 1 món tiêu hao. false = không còn món đó. */
export async function consumeInventoryItem(db: Database, userId: number, itemId: string): Promise<boolean> {
  const result = await db
    .prepare('UPDATE inventory SET quantity = quantity - 1 WHERE user_id = ? AND item_id = ? AND quantity > 0')
    .bind(userId, itemId)
    .run()
  return !!result.meta.changes
}
