-- =============================================================================
-- 0003 — REDESIGN V3: NHÓM TUỔI CỦA TÀI KHOẢN
--
--   users.age_group : 'kid' (bé 9–11) | 'teen' (12–17) | 'adult' (người lớn)
--     - 'kid'  : trang chủ là Khu trò chơi, KHÔNG được cược chuối ở đấu trường
--                (máy chủ realtime ép cược = 0, thắng nhận thưởng cố định)
--     - tài khoản cũ đều thành 'adult' (giá trị mặc định)
--
-- Tiến độ học v2 vẫn nằm trong learning_progress.data_json (trang web tự nâng cấp
-- JSON từ version 1 lên 2 khi tải về) — không cần đổi bảng.
--
-- Chạy: npm run db:migrate (local) / npm run db:migrate:remote (Cloudflare — cần chủ nhà đồng ý)
-- =============================================================================

ALTER TABLE users ADD COLUMN age_group TEXT NOT NULL DEFAULT 'adult'
  CHECK (age_group IN ('kid', 'teen', 'adult'));
