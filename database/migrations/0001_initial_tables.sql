-- =============================================================================
-- 0001 — CÁC BẢNG BAN ĐẦU (Cloudflare D1, thực chất là SQLite)
--
-- Thiết kế "nhẹ nhất có thể": chỉ 5 bảng.
--   users            : tài khoản (username + mật khẩu đã băm)
--   sessions         : phiên đăng nhập (cookie trỏ tới đây)
--   learning_progress: TOÀN BỘ tiến độ học của 1 người, lưu thành 1 cục JSON
--                      (bài đã học, SRS, sổ lỗi sai, streak...). Đọc/ghi 1 lần là xong.
--   xp_events        : mỗi lần nhận XP ghi 1 dòng -> dùng tính bảng xếp hạng tuần
--   exam_results     : kết quả các bài thi (kèm nhận xét AI) để xem lại
--   ai_usage         : đếm số lượt gọi AI mỗi ngày, tránh dùng hết quota Gemini free
--
-- Chạy: npm run db:migrate (local) / npm run db:migrate:remote (Cloudflare)
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  username      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  display_name  TEXT    NOT NULL,
  password_hash TEXT    NOT NULL,   -- dạng "pbkdf2$<số vòng>$<salt>$<hash>"
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT    PRIMARY KEY,   -- chuỗi ngẫu nhiên, lưu trong cookie
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT    NOT NULL
);

CREATE TABLE IF NOT EXISTS learning_progress (
  user_id    INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  data_json  TEXT    NOT NULL,      -- xem kiểu LearningProgress trong src/learning-progress
  updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS xp_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount     INTEGER NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_xp_events_time ON xp_events(created_at);

CREATE TABLE IF NOT EXISTS exam_results (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exam_id     TEXT    NOT NULL,
  result_json TEXT    NOT NULL,     -- điểm từng kỹ năng, câu sai, nhận xét AI
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_exam_results_user ON exam_results(user_id, created_at);

CREATE TABLE IF NOT EXISTS ai_usage (
  user_id INTEGER NOT NULL,
  day     TEXT    NOT NULL,         -- "2026-10-05"
  count   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
