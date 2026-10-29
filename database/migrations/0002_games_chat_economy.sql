-- =============================================================================
-- 0002 — CHUỐI, CỬA HÀNG, CHAT, THI ĐẤU, MINI GAME, GIẢI TUẦN, BOSS
-- Chạy:  npm run db:migrate         (máy local)
--        npm run db:migrate:remote  (Cloudflare thật)
-- Wrangler tự nhớ file nào đã chạy, nên chạy lại lệnh không bị lặp.
-- =============================================================================

-- ---------- thêm cột cho bảng users ----------
ALTER TABLE users ADD COLUMN bananas INTEGER NOT NULL DEFAULT 50;     -- số chuối hiện có
ALTER TABLE users ADD COLUMN avatar TEXT NOT NULL DEFAULT 'avatar-smile'; -- id món avatar đang dùng
ALTER TABLE users ADD COLUMN frame TEXT;                               -- id khung đang dùng
ALTER TABLE users ADD COLUMN name_color TEXT;                          -- id màu tên đang dùng
ALTER TABLE users ADD COLUMN title TEXT;                               -- id danh hiệu đang dùng
ALTER TABLE users ADD COLUMN login_streak INTEGER NOT NULL DEFAULT 0;  -- số ngày đăng nhập liên tiếp
ALTER TABLE users ADD COLUMN last_login_day TEXT;                      -- "YYYY-MM-DD" lần nhận quà gần nhất
ALTER TABLE users ADD COLUMN last_active_at TEXT;                      -- lần cuối online

-- ---------- sổ cái chuối: mỗi lần cộng / trừ ghi 1 dòng ----------
CREATE TABLE IF NOT EXISTS banana_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount     INTEGER NOT NULL,          -- dương = nhận, âm = tiêu
  reason     TEXT    NOT NULL,          -- "lesson", "shop:power-freeze", "battle-win"...
  dedupe_key TEXT    UNIQUE,            -- chống nhận thưởng 2 lần (VD "quest:2026-10-06:d-lessons-2:5")
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_banana_events_user ON banana_events(user_id, created_at);

-- ---------- túi đồ: món đã mua ----------
CREATE TABLE IF NOT EXISTS inventory (
  user_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id  TEXT    NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, item_id)
);

-- ---------- chat ----------
CREATE TABLE IF NOT EXISTS chat_messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  channel    TEXT    NOT NULL,          -- "family" hoặc "dm:<id nhỏ>:<id lớn>"
  sender_id  INTEGER NOT NULL,
  kind       TEXT    NOT NULL,          -- text | image | sticker | system
  body       TEXT    NOT NULL,          -- chữ / ảnh base64 / emoji sticker
  effect     TEXT,                      -- hiệu ứng: fireworks | hearts
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_chat_channel ON chat_messages(channel, id);

CREATE TABLE IF NOT EXISTS chat_reads (
  user_id      INTEGER NOT NULL,
  channel      TEXT    NOT NULL,
  last_read_id INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, channel)
);

-- ---------- thi đấu trực tiếp ----------
CREATE TABLE IF NOT EXISTS battles (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  game_type   TEXT    NOT NULL,         -- quiz | spelling | sentence | word-chain
  topic_id    TEXT,
  bet         INTEGER NOT NULL DEFAULT 0,
  result_json TEXT    NOT NULL,         -- bảng xếp hạng cuối trận
  winner_ids  TEXT    NOT NULL,         -- ",3,5," để tìm nhanh bằng LIKE
  player_ids  TEXT    NOT NULL,         -- ",1,3,5,"
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- lời thách đấu gửi cho người đang offline
CREATE TABLE IF NOT EXISTS challenges (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user  INTEGER NOT NULL,
  to_user    INTEGER NOT NULL,
  game_type  TEXT    NOT NULL,
  topic_id   TEXT,
  bet        INTEGER NOT NULL DEFAULT 0,
  seen       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ---------- kỷ lục mini game chơi 1 mình ----------
CREATE TABLE IF NOT EXISTS game_records (
  user_id    INTEGER NOT NULL,
  game       TEXT    NOT NULL,          -- spelling | word-chain | sentence | quiz
  best_score INTEGER NOT NULL,
  updated_at TEXT    NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (user_id, game)
);

-- ---------- Thử thách từ mỗi ngày ----------
CREATE TABLE IF NOT EXISTS daily_word_results (
  user_id INTEGER NOT NULL,
  day     TEXT    NOT NULL,
  guesses INTEGER NOT NULL,             -- số lượt đã đoán
  solved  INTEGER NOT NULL,             -- 1 = đoán đúng
  pattern TEXT    NOT NULL,             -- ô màu để khoe (không lộ chữ), VD "⬜🟨🟩..."
  PRIMARY KEY (user_id, day)
);

-- ---------- giải đấu tuần ----------
CREATE TABLE IF NOT EXISTS weekly_scores (
  week       TEXT    NOT NULL,          -- "2026-W41"
  user_id    INTEGER NOT NULL,
  best_score INTEGER NOT NULL,
  PRIMARY KEY (week, user_id)
);

-- ---------- Boss cả nhà ----------
CREATE TABLE IF NOT EXISTS boss_damage (
  week    TEXT    NOT NULL,
  user_id INTEGER NOT NULL,
  damage  INTEGER NOT NULL DEFAULT 0,
  hits    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (week, user_id)
);

-- sát thương mỗi người mỗi ngày (để giới hạn / ngày, ai cũng có phần đánh boss)
CREATE TABLE IF NOT EXISTS boss_daily_damage (
  day     TEXT    NOT NULL,
  user_id INTEGER NOT NULL,
  damage  INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, user_id)
);
