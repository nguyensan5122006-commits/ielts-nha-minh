/**
 * banana-rewards.ts
 * ----------------------------------------------------------------------------
 * BẢNG THƯỞNG CHUỐI 🍌 — "tiền" trong web, dùng để cược thi đấu và mua đồ.
 * Máy chủ dùng bảng này để quyết định số chuối (trang web không tự đặt số được).
 *
 * Mỗi lý do (reason) có:
 *   amount     : số chuối mỗi lần
 *   dailyLimit : tối đa bao nhiêu lần / ngày được thưởng (chống "cày" lặp lại)
 * Đổi nhịp kinh tế: sửa các con số ở đây rồi deploy.
 * ----------------------------------------------------------------------------
 */

export const STARTING_BANANAS = 50

export type BananaReason =
  | 'lesson' // học xong 1 bài
  | 'mini-test-1' // qua mini-test 1 sao
  | 'mini-test-2'
  | 'mini-test-3'
  | 'review' // xong 1 lượt ôn tập
  | 'level-test' // qua bài test cuối level
  | 'exam-placement'
  | 'exam-mock'
  | 'fun-topic' // xem hết 1 bộ thẻ Học vui
  | 'game-played' // chơi xong 1 mini game một mình
  | 'game-record' // phá kỷ lục cá nhân

export const BANANA_REWARDS: Record<BananaReason, { amount: number; dailyLimit: number }> = {
  lesson: { amount: 5, dailyLimit: 20 },
  'mini-test-1': { amount: 5, dailyLimit: 20 },
  'mini-test-2': { amount: 10, dailyLimit: 20 },
  'mini-test-3': { amount: 15, dailyLimit: 20 },
  review: { amount: 3, dailyLimit: 5 },
  'level-test': { amount: 50, dailyLimit: 2 },
  'exam-placement': { amount: 10, dailyLimit: 1 },
  'exam-mock': { amount: 30, dailyLimit: 2 },
  'fun-topic': { amount: 3, dailyLimit: 10 },
  'game-played': { amount: 2, dailyLimit: 10 },
  'game-record': { amount: 10, dailyLimit: 3 },
}

/** Quà đăng nhập hằng ngày: ngày 1 = 5, mỗi ngày liên tiếp +3, tối đa 20. */
export function dailyLoginReward(loginStreak: number): number {
  return Math.min(20, 5 + 3 * (Math.max(1, loginStreak) - 1))
}

/** Thưởng Thử thách từ mỗi ngày theo số lượt đoán (1 lượt = 15, 6 lượt = 5). */
export function dailyWordReward(guesses: number): number {
  return Math.max(5, 17 - guesses * 2)
}

export const WEEKLY_TOURNAMENT_PRIZES = [100, 50, 25] // hạng 1, 2, 3
export const BOSS_DEFEAT_REWARD = 40

/* ---------------------------------------------------------------------------
 * (v3) BÉ KHÔNG CƯỢC CHUỐI
 * Tài khoản nhóm tuổi 'kid' vào đấu trường luôn có tiền cược = 0 (máy chủ realtime ép,
 * dù phòng có cược). Bé thắng trận thì KHÔNG lấy hũ chuối của người lớn mà nhận
 * 1 phần thưởng cố định nhỏ do máy chủ cộng — đủ vui nhưng không thành "cờ bạc".
 * 10 🍌 ≈ 2 bài học; tối đa 3 lần / ngày để không "cày" bằng cách đấu liên tục.
 * ------------------------------------------------------------------------- */
export const KID_BATTLE_WIN_REWARD = 10
export const KID_BATTLE_WIN_DAILY_LIMIT = 3
