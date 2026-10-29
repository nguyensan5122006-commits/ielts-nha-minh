-- =============================================================================
-- 0004 — KỶ LỤC TUẦN CỦA TRÒ CHƠI CHỮ (bảng kỷ lục gia đình trên trang /play)
--
-- Chỉ THÊM 1 bảng mới — không sửa / xoá bảng hay dữ liệu cũ.
--
--   game_weekly_best : điểm cao nhất của mỗi người, mỗi trò, trong từng tuần (tuần ISO giờ VN, VD "2026-W44")
--     - game   : 'spelling' | 'word-chain' | 'picture-word' | 'missing-letters'
--                (Thử thách từ mỗi ngày không cần bảng này: tính thẳng từ daily_word_results)
--     - rounds : số ván đã chơi trong tuần (để hiện "đã chơi 5 ván")
--   Kỷ lục MỌI LÚC vẫn nằm ở bảng cũ game_records (0002) — không đổi.
--
-- Chạy: npm run db:migrate          (máy local)
--       npm run db:migrate:remote   (Cloudflare thật — chủ nhà tự chạy khi deploy)
-- Nếu chưa chạy trên Cloudflare: trang vẫn hoạt động, chỉ phần "tuần này" để trống
-- (functions/api/games/records.ts + board.ts bắt lỗi "no such table" và bỏ qua).
-- =============================================================================

CREATE TABLE IF NOT EXISTS game_weekly_best (
  week       TEXT    NOT NULL,                      -- "2026-W44"
  game       TEXT    NOT NULL,                      -- tên trò (xem trên)
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  best_score INTEGER NOT NULL,                      -- điểm cao nhất tuần đó
  rounds     INTEGER NOT NULL DEFAULT 1,            -- số ván đã chơi tuần đó
  updated_at TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (week, game, user_id)
);
