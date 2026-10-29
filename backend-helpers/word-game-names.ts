/**
 * word-game-names.ts — TÊN CÁC TRÒ CHƠI CHỮ CÓ TÍNH ĐIỂM (dùng chung cho máy chủ)
 * ----------------------------------------------------------------------------
 * functions/api/games/records.ts (lưu điểm) và board.ts (bảng kỷ lục) cùng đọc danh sách này.
 * Trang web có danh sách riêng kèm tên / ảnh / màu: src/features/playground/game-catalog.ts.
 * Thêm trò mới: thêm tên ở đây + 1 dòng trong game-catalog.ts.
 * (Thử thách từ mỗi ngày 'daily-word' không nằm ở đây vì không tính điểm — dùng bảng daily_word_results.)
 * ----------------------------------------------------------------------------
 */

/** spelling = Spelling Bee · word-chain = Nối từ · picture-word = Nhìn ảnh đoán từ · missing-letters = Điền chữ còn thiếu */
export const SCORE_GAMES = ['spelling', 'word-chain', 'picture-word', 'missing-letters'] as const
export type ScoreGameId = (typeof SCORE_GAMES)[number]

export function isScoreGame(name: unknown): name is ScoreGameId {
  return typeof name === 'string' && (SCORE_GAMES as readonly string[]).includes(name)
}
