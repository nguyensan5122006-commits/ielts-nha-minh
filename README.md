# IELTS Nhà Mình — Học IELTS từ 0 đến 6.5

Web học IELTS cho gia đình. Học theo kiểu Duolingo, chia 6 level từ 0 đến 6.5, mỗi level có 5 kỹ năng. Có mini-test, bài test cuối level, phòng thi thử IELTS và AI (Gemini) chấm Writing/Speaking.

Thêm phần vui chơi để cả nhà thi đua học:
- **Học vui:** thẻ từ theo chủ đề — cờ 197 nước, động vật, đồ ăn...
- **Chuối 🍌:** tiền trong web, kiếm được khi học.
- **Cửa hàng:** mua sức mạnh thi đấu, đồ học tập, đồ trang trí.
- **Chat:** kênh gia đình và chat riêng.
- **Đấu trường:** thi đấu trực tiếp kiểu Quizlet / Kahoot, có cược chuối.
- **Mini game:** Spelling Bee, Nối từ, Đua xếp câu.
- **Sự kiện:** Thử thách từ mỗi ngày (Wordle), Giải đấu tuần, Boss cả nhà.
- **Thành tích:** nhiệm vụ, huy hiệu, level tài khoản.

**Chi phí: 0đ/tháng.** Mọi thứ chạy trên Cloudflare (gói miễn phí):
- **Pages:** giao diện web
- **Pages Functions:** API
- **D1:** database
- **Durable Objects:** realtime cho chat và thi đấu

---

## 1. Cấu trúc thư mục

```
IELTS_ThienThao/
├── index.html                  Trang HTML gốc (nạp font, gắn app React)
├── package.json                Danh sách thư viện + các lệnh npm run ...
├── vite.config.ts              Cấu hình công cụ build Vite
├── wrangler.toml               Cấu hình Cloudflare cho trang web (D1, Gemini, nối tới realtime)
├── .dev.vars                   Bí mật khi chạy local: GEMINI_API_KEY, INVITE_CODE (không đưa lên git)
│
├── database/migrations/        Các bước tạo / nâng cấp database (chạy theo thứ tự 0001, 0002...)
│
├── functions/api/              ===== MÁY CHỦ (API) — mỗi file là 1 đường dẫn =====
│   ├── _middleware.ts          Chạy trước mọi API: bắt lỗi, kiểm tra đăng nhập
│   ├── auth/                   register / login / logout / me
│   ├── progress.ts             Đọc / lưu tiến độ học
│   ├── xp.ts                   Ghi XP (cho bảng xếp hạng)
│   ├── users.ts, profile.ts    Danh sách thành viên, trang cá nhân
│   ├── economy/                Ví chuối: nhận thưởng, quà đăng nhập, mua / dùng / trang bị đồ
│   ├── chat/                   Lịch sử tin nhắn, số tin chưa đọc
│   ├── games/                  Kỷ lục mini game, Thử thách từ, Giải đấu tuần, Boss
│   ├── realtime.ts             Mở kết nối WebSocket -> chuyển sang worker realtime
│   ├── welcome-news.ts         Tin mới cho bảng "Mừng quay lại"
│   ├── exam-results.ts         Lưu / xem kết quả thi
│   └── ai/                     grade-writing / grade-speaking / explain-mistake (gọi Gemini)
│
├── realtime-worker/            ===== MÁY CHỦ REALTIME (worker riêng "ielts-realtime") =====
│   ├── wrangler.toml
│   └── src/
│       ├── family-hub.ts       "Phòng sinh hoạt chung": ai online, chat, quản lý phòng đấu
│       ├── battle-room.ts      Luật 1 trận đấu: câu hỏi, điểm, sức mạnh, nối từ, chia hũ chuối
│       └── word-chain-dictionary.ts   Từ điển cho trò Nối từ
│
├── backend-helpers/            Code dùng chung cho máy chủ
│   ├── password-and-session.ts Băm mật khẩu, phiên đăng nhập
│   ├── banana-ledger.ts        Sổ cái chuối: cộng / trừ an toàn, túi đồ
│   ├── chat-queries.ts         Truy vấn chat
│   ├── vietnam-time.ts         Ngày / tuần theo giờ Việt Nam
│   ├── gemini-client.ts        Gọi Gemini (có thử lại + model dự phòng), giới hạn lượt AI
│   └── server-environment.ts, read-logged-in-user.ts
│
├── scripts/
│   ├── generate-listening-audio.ts  Tạo file mp3 giọng AI cho bài nghe (npm run tts)
│   ├── validate-content.ts          Kiểm tra lỗi dữ liệu (npm run validate)
│   └── test-progress-migration.ts   Kiểm thử kho tiến độ v2 + chuyển đổi dữ liệu cũ (npm run test:progress)
│
├── public/
│   ├── audio/                  File mp3 bài nghe + manifest.json
│   ├── flags/                  Ảnh cờ SVG 197 nước (thư viện flag-icons, giấy phép MIT)
│   └── dictionary/             Từ điển ~125.000 từ tiếng Anh (ENABLE, public domain)
│
└── src/                        ===== GIAO DIỆN (React) =====
    ├── main.tsx, app/App.tsx   Điểm khởi động, bảng định tuyến URL -> trang
    ├── pages/                  Mỗi file = 1 trang
    ├── components/             Mảnh giao diện dùng lại (avatar, thông báo nổi, bảng chào mừng...)
    ├── exercise-types/         Dạng bài tập Duolingo + "máy chạy bài tập" ExercisePlayer
    ├── exam-engine/            Phòng thi: hiển thị, giám khảo ảo, chấm điểm & quy đổi band
    ├── learning-progress/      Tiến độ v2: XP, chuỗi ngày (freeze, sửa chuỗi), ôn tập FSRS, sổ lỗi sai, khu trẻ em,
    │                           tự nâng cấp dữ liệu cũ — tài liệu: docs/redesign-v3/03-DATA-LAYER.md
    ├── player-wallet/          Ví chuối phía trình duyệt
    ├── family-members/         Danh sách thành viên gia đình
    ├── realtime/               Kết nối WebSocket, trạng thái phòng đấu, tiếng "ting"
    ├── chat/                   Khung chat, bong bóng chat, nén ảnh
    ├── games/                  Hiển thị câu hỏi trò chơi, chạy lượt chơi 1 mình, chọn chủ đề
    ├── game-economy/           LUẬT CHƠI dùng chung web + máy chủ: level, thưởng chuối, cửa hàng,
    │                           nhiệm vụ, huy hiệu, giải tuần, boss — muốn chỉnh giá / thưởng: sửa ở đây
    ├── game-questions/         Ngân hàng câu hỏi thi đấu + "ngôn ngữ" tin nhắn realtime
    ├── services/               Gọi API, đăng nhập, phát âm thanh, nhận giọng nói, ghi âm
    ├── translations/           Song ngữ Việt / Anh (ui-text.ts = từ điển chữ giao diện)
    ├── styles/                 global.css (giao diện chung) + gamification.css (phần trò chơi)
    └── content/                ===== NỘI DUNG HỌC =====
        ├── content-types.ts    "Khuôn" dữ liệu — ĐỌC FILE NÀY TRƯỚC
        ├── all-levels.ts       Mục lục 3 level v3 -> các chặng (unit) -> id bài
        ├── lesson-registry.ts  Mọi bài học theo id
        ├── path-selectors.ts   Hỏi đáp lộ trình: chặng của track, "Học tiếp", tiến độ level
        ├── all-exams.ts        Danh sách đề thi
        ├── all-fun-topics.ts   Danh sách chủ đề Học vui
        ├── levels/             level-1-beginner, level-2-foundation (mỗi kỹ năng 10 bài)
        ├── fun-topics/         16 chủ đề thẻ từ (632 thẻ)
        └── exams/              Bài xếp lớp, test Level 1, test Level 2, đề thi thử IELTS số 1
```

**Gợi ý đọc code để học:**
1. Phần học: `content-types.ts` → `all-levels.ts` → `content/path-selectors.ts` → `exercise-types/ExercisePlayer.tsx` → `learning-progress/progress-updates.ts` → `learning-progress/progress-store.tsx` → `functions/api/progress.ts`
2. Phần thi đấu: `game-questions/realtime-protocol.ts` → `realtime/realtime-store.tsx` → `realtime-worker/src/family-hub.ts` → `realtime-worker/src/battle-room.ts`

---

## 2. Chạy thử trên máy

Cần cài [Node.js](https://nodejs.org) bản 20 trở lên.

```bash
npm install                 # cài thư viện (lần đầu)
npm run db:migrate          # tạo / nâng cấp database local
```

Mở file `.dev.vars` rồi điền `GEMINI_API_KEY` và `INVITE_CODE`.

Cần 2 cửa sổ terminal:

```bash
# cửa sổ 1: máy chủ realtime (chat, thi đấu)
npm run realtime

# cửa sổ 2: web + API
npm run build
npm run api                 # mở http://localhost:8788
```

Muốn thử thi đấu một mình: mở 2 trình duyệt (hoặc 1 cửa sổ ẩn danh) và đăng nhập 2 tài khoản khác nhau.

Lưu ý khi chạy local: 2 tiến trình cùng dùng 1 file database. Thỉnh thoảng có thể báo `database is locked`. Nếu bị, tắt cả 2 cửa sổ rồi chạy lại. Trên Cloudflare thật không bị lỗi này.

---

## 3. Đưa lên mạng (đã làm 1 lần — giờ chỉ cần cập nhật)

**Cập nhật thông thường** (sửa giao diện, nội dung):

```bash
npm run deploy
```

**Khi có thay đổi database** (thêm file trong `database/migrations/`):

```bash
npm run db:migrate:remote
```

**Khi sửa thư mục `realtime-worker/`** (chat, thi đấu):

```bash
npm run deploy:realtime
```

Thứ tự khi cập nhật cả 3: `db:migrate:remote` → `deploy:realtime` → `deploy`.

Mã bí mật (`GEMINI_API_KEY`, `INVITE_CODE`) đổi ở **Cloudflare → Workers & Pages → ielts-thienthao → Settings → Variables and Secrets**. Đổi xong chạy `npm run deploy` để áp dụng.

---

## 4. Tạo audio giọng AI cho bài nghe

```bash
npm run tts            # tạo mp3 cho bài nghe + đề thi
npm run tts -- --all   # thêm cả câu ví dụ, từ vựng (lâu hơn nhiều)
```

Câu nào chưa có mp3 thì web tự dùng giọng đọc của trình duyệt.

---

## 5. Thêm nội dung / level mới

1. Viết bài trong `src/content/levels/<thư mục>/` theo `docs/redesign-v3/02-CONTENT-GUIDE.md`, kèm file `units.ts` (các chặng).
2. Mở `src/content/lesson-registry.ts`: import mảng bài mới. Mở `src/content/all-levels.ts`: import mảng chặng, gắn vào level.
3. Bài test cuối level: tạo file trong `src/content/exams/`, thêm vào `all-exams.ts`, đặt `levelTestId` trong `all-levels.ts`.
4. Thêm chủ đề Học vui: tạo file trong `src/content/fun-topics/`, thêm vào `all-fun-topics.ts`.
5. Kiểm tra lỗi dữ liệu: `npm run validate`.
6. Tạo audio rồi đưa lên mạng: `npm run tts`, sau đó `npm run deploy`.

---

## 6. Chỉnh luật chơi

Mọi con số nằm trong `src/game-economy/`:

| Muốn đổi | Sửa file |
|---|---|
| Chuối thưởng khi học, quà đăng nhập, giải tuần, boss | `banana-rewards.ts` |
| Giá đồ, thêm avatar / khung / sticker | `shop-catalog.ts` |
| Nhiệm vụ, huy hiệu | `quests-and-achievements.ts` |
| XP lên level, danh hiệu | `account-level.ts` |
| Chủ đề giải tuần, boss, máu boss | `weekly-events.ts` |

Sửa xong chạy `npm run deploy` (và `npm run deploy:realtime` nếu đổi luật thi đấu).

---

## 7. Lưu ý

- **Quyền riêng tư Gemini:** gói miễn phí của Google có thể dùng dữ liệu gửi lên để cải thiện model.
- **Giới hạn AI:** mỗi người tối đa 40 lượt AI/ngày (`AI_DAILY_LIMIT` trong `wrangler.toml`). Mua thêm lượt bằng chuối ở Cửa hàng.
- **Điểm AI chỉ là ước tính** để tham khảo.
- **Trình duyệt:** dùng Chrome hoặc Edge. Thi Speaking và bài "đọc to" cần micro.
- **Chuối do máy chủ quản lý:** trang web không tự cộng chuối được. Mỗi phần thưởng có giới hạn số lần / ngày.
