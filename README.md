# IELTS Nhà Mình — Học IELTS từ 0 đến 6.5

Web học tiếng Anh cho gia đình. Học theo kiểu Duolingo với 2 lộ trình dùng chung nền: **Luyện thi IELTS** và **Tiếng Anh tổng quát** — 3 level (0–2.0, 2.0–4.0, 4.0–6.5), mỗi level đủ 5 kỹ năng. Có mini-test, bài test cuối level, phòng thi thử IELTS và AI (Gemini) chấm Writing/Speaking. Mọi tài khoản như nhau (không chia nhóm tuổi).

Thêm vài phần vui để cả nhà cùng học:
- **Học vui:** thẻ từ theo chủ đề — cờ 197 nước, động vật, đồ ăn...
- **Trò chơi chữ:** Thử thách từ mỗi ngày (kiểu Wordle), Spelling Bee, Nối từ (chơi với máy) — có kỷ lục cả nhà.
- **Chat:** kênh gia đình và chat riêng (sticker, ảnh, "đang gõ…", "đã xem").
- **Thành tích:** XP, chuỗi ngày học, bảng xếp hạng gia đình, nhiệm vụ (thưởng XP), huy hiệu, level tài khoản.
  XP / bảng xếp hạng / nhiệm vụ / huy hiệu **chỉ có ở lộ trình Tiếng Anh tổng quát** (và trò chơi chữ); lộ trình IELTS,
  phòng thi và đề thi thử không cộng XP, không hiện các thứ đó — chỉ giữ chuỗi ngày học (xem `src/gamification/gamification-scope.ts`).

(29/10/2026 đã xoá hẳn: khu trẻ em, chuối 🍌 + cửa hàng, đấu trường / giải tuần / boss và các mini game khác.)

**Chi phí: 0đ/tháng.** Mọi thứ chạy trên Cloudflare (gói miễn phí):
- **Pages:** giao diện web
- **Pages Functions:** API
- **D1:** database
- **Durable Objects:** realtime cho chat (ai đang online, tin nhắn tức thì)

---

## 1. Cấu trúc thư mục

```
IELTS_ThienThao/
├── index.html                  Trang HTML gốc (nạp font, gắn app React)
├── package.json                Danh sách thư viện + các lệnh npm run ...
├── vite.config.ts              Cấu hình công cụ build Vite
├── wrangler.toml               Cấu hình Cloudflare cho trang web (D1, Gemini, nối tới realtime)
├── .dev.vars.example           Mẫu bí mật. File thật nằm NGOÀI project (xem mục "Bí mật" bên dưới)
├── .github/workflows/deploy.yml  Push lên GitHub -> tự build + đưa lên Cloudflare Pages
│
├── docs/                       ===== TÀI LIỆU =====
│   ├── redesign-v3/            Thiết kế bản v3: kiến trúc, nội dung, dữ liệu, giao diện, âm thanh, phòng thi
│   ├── research/               Ghi chú + báo cáo nghiên cứu, OPEN-QUESTIONS (không đưa lên git)
│   └── review/                 Trang xem 6 bài mẫu để duyệt nội dung
├── art-blender/                Xưởng 3D: script Blender dựng mascot Ki, file .blend, ảnh render (xem README trong đó)
│
├── database/migrations/        Các bước tạo / nâng cấp database (chạy theo thứ tự 0001, 0002...)
│
├── functions/api/              ===== MÁY CHỦ (API) — mỗi file là 1 đường dẫn =====
│   ├── _middleware.ts          Chạy trước mọi API: bắt lỗi, kiểm tra đăng nhập
│   ├── auth/                   register / login / logout / me
│   ├── progress.ts             Đọc / lưu tiến độ học
│   ├── xp.ts                   Ghi XP (cho bảng xếp hạng)
│   ├── users.ts, profile.ts    Danh sách thành viên, trang cá nhân
│   ├── chat/                   Lịch sử tin nhắn, số tin chưa đọc
│   ├── games/                  Kỷ lục trò chơi chữ (records, board), Thử thách từ mỗi ngày (daily-word)
│   ├── realtime.ts             Mở kết nối WebSocket -> chuyển sang worker realtime
│   ├── exam-results.ts         Lưu / xem kết quả thi
│   └── ai/                     grade-writing / grade-speaking / explain-mistake (Gemini, lỗi thì dùng Claude)
│
├── realtime-worker/            ===== MÁY CHỦ REALTIME (worker riêng "ielts-realtime") =====
│   ├── wrangler.toml
│   └── src/
│       └── family-hub.ts       "Phòng sinh hoạt chung": ai online, chat, "đang gõ…", "đã xem"
│
├── backend-helpers/            Code dùng chung cho máy chủ
│   ├── password-and-session.ts Băm mật khẩu, phiên đăng nhập
│   ├── chat-queries.ts         Truy vấn chat
│   ├── vietnam-time.ts         Ngày / tuần theo giờ Việt Nam
│   ├── ai-client.ts            Cửa chung gọi AI: thử Gemini trước, lỗi thì chuyển Claude (chỉ bài chữ)
│   ├── gemini-client.ts        Gọi Gemini (có thử lại + model dự phòng), giới hạn lượt AI
│   ├── claude-client.ts        Gọi Claude (dự phòng, cần ANTHROPIC_API_KEY)
│   ├── word-game-names.ts      Danh sách tên trò chơi chữ hợp lệ
│   └── server-environment.ts, read-logged-in-user.ts
│
├── scripts/                    ===== CÔNG CỤ CHẠY BẰNG LỆNH npm run ... =====
│   ├── generate-audio-v3.ts         Tạo file mp3 giọng AI cho mọi câu cần nghe (npm run tts:v3)
│   ├── audio-v3/                    Phần ruột của script trên: gom câu, gọi giọng Edge, đọc độ dài mp3
│   ├── generate-lesson-index.ts     Tạo mục lục bài học src/content/generated (tự chạy khi npm run build)
│   ├── validate-content.ts          Kiểm tra lỗi dữ liệu (npm run validate)
│   ├── test-progress-migration.ts   Kiểm thử kho tiến độ v2 + chuyển đổi dữ liệu cũ (npm run test:progress)
│   ├── check-word-images.ts         Kiểm tra ảnh minh hoạ từ vựng có đủ không
│   └── generate-app-icons.mjs       Tạo icon ứng dụng từ ảnh đầu mascot
│
├── public/
│   ├── audio/                  File mp3 bài nghe + manifest.json
│   ├── flags/                  Ảnh cờ SVG 197 nước (thư viện flag-icons, giấy phép MIT)
│   ├── word-images/            Ảnh minh hoạ từ vựng 3D (Fluent Emoji, MIT)
│   ├── mascot/                 Ảnh cún Corgi (mascot) các tư thế
│   └── dictionary/             Từ điển ~125.000 từ tiếng Anh cho trò Nối từ / Thử thách từ (ENABLE, public domain)
│
└── src/                        ===== GIAO DIỆN (React) =====
    ├── main.tsx, app/App.tsx   Điểm khởi động, bảng định tuyến URL -> trang
    ├── features/               ===== CÁC KHU GIAO DIỆN — mỗi thư mục 1 khu, có file *-routes.tsx riêng =====
    │   ├── landing/            Trang giới thiệu (chưa đăng nhập)
    │   ├── auth/               Đăng nhập / đăng ký
    │   ├── placement-test/     Bài xếp lớp (/start)
    │   ├── ielts-home/         Trang chủ sau đăng nhập, chọn lộ trình IELTS / tổng quát
    │   ├── learning-path/      Bản đồ chặng học (/learn)
    │   ├── lesson-player/      Màn chơi 1 bài học (bài tập, gợi ý, kết quả)
    │   ├── skill-listening/    Bài nghe   ┐
    │   ├── skill-reading/      Bài đọc    │ 4 kỹ năng: mỗi thư mục lo 1 dạng bài lớn
    │   ├── skill-speaking/     Bài nói    │ (trong lesson-player và phòng thi)
    │   ├── skill-writing/      Bài viết   ┘ + AI chấm
    │   ├── grammar/            Ngữ pháp (/grammar): chủ đề, bài luyện, mini-test, test level
    │   ├── vocabulary-review/  Ôn từ vựng FSRS, sổ từ
    │   ├── mistakes-notebook/  Sổ lỗi sai + hỏi AI "vì sao sai"
    │   ├── progress-dashboard/ Biểu đồ tiến độ
    │   ├── exam-room/          Phòng thi: danh sách đề, làm bài, kết quả, mini-test
    │   ├── exam-ui/            Mảnh giao diện thi kiểu máy tính (đồng hồ, chia đôi màn hình, tô sáng...)
    │   ├── playground/         Khu vui chơi /play (trang tổng)
    │   ├── word-games/         Trò chơi chữ: Thử thách từ mỗi ngày, Spelling Bee, Nối từ, Đoán chữ...
    │   │   └── solo-quiz/      Ngân hàng câu hỏi + bộ chạy 1 lượt chơi một mình
    │   ├── fun-topics/         Học vui: danh sách chủ đề + thẻ từ
    │   ├── family-achievements/ Bảng xếp hạng gia đình, nhiệm vụ, hồ sơ cá nhân
    │   ├── right-rail/         Cột phải (chuỗi ngày, nhiệm vụ, xếp hạng nhỏ)
    │   └── settings/           Cài đặt
    ├── components/             Mảnh giao diện dùng lại (avatar, thông báo nổi, bảng chào mừng...)
    ├── design-system/          Hệ thiết kế v3: màu, chữ, component (Button, Card, Mascot...) — xem /design
    ├── exam-engine/            Chấm điểm & quy đổi band (exam-scoring.ts)
    ├── learning-progress/      Tiến độ v2: XP, chuỗi ngày (freeze, sửa chuỗi), ôn tập FSRS, sổ lỗi sai,
    │                           tự nâng cấp dữ liệu cũ — tài liệu: docs/redesign-v3/03-DATA-LAYER.md
    ├── family-members/         Danh sách thành viên gia đình
    ├── realtime/               Kết nối WebSocket (ai online, chat), "ngôn ngữ" tin nhắn realtime, tiếng "ting"
    ├── chat/                   Trang chat, khung chat, bong bóng chat, nén ảnh
    ├── gamification/           LUẬT TRÒ CHƠI HOÁ: level tài khoản, nhiệm vụ (thưởng XP), huy hiệu
    ├── services/               Gọi API, đăng nhập, phát âm thanh, nhận giọng nói, ghi âm,
    │                           chấm đáp án bài tập (exercise-shared.ts, answer-checking.ts)
    ├── translations/           Song ngữ Việt / Anh (ui-text.ts = từ điển chữ giao diện)
    ├── styles/                 global.css (giao diện chung) + gamification.css (phần trò chơi)
    └── content/                ===== NỘI DUNG HỌC =====
        ├── content-types.ts    "Khuôn" dữ liệu — ĐỌC FILE NÀY TRƯỚC
        ├── all-levels.ts       Mục lục 3 level v3 -> các chặng (unit) -> id bài
        ├── lesson-registry.ts  Mọi bài học theo id
        ├── path-selectors.ts   Hỏi đáp lộ trình: chặng của track, "Học tiếp", tiến độ level
        ├── all-exams.ts        Danh sách đề thi
        ├── all-fun-topics.ts   Danh sách chủ đề Học vui
        ├── levels/             level-1-beginner, level-2-foundation, level-2-bridge, level-3-general, level-3-ielts
        ├── grammar/            Chủ đề ngữ pháp, bài luyện từng level, mini-test, test level
        ├── fun-topics/         16 chủ đề thẻ từ (632 thẻ)
        ├── exams/              Bài xếp lớp, test Level 1, test Level 2, đề thi thử IELTS số 1 và 2
        └── generated/          Mục lục bài học do script tự tạo — KHÔNG sửa tay
```

**Gợi ý đọc code để học:**
1. Phần học: `content-types.ts` → `all-levels.ts` → `content/path-selectors.ts` → `features/lesson-player/LessonPlayerPage.tsx` → `learning-progress/progress-updates.ts` → `learning-progress/progress-store.tsx` → `functions/api/progress.ts`
2. Phần chat realtime: `realtime/realtime-protocol.ts` → `realtime/realtime-store.tsx` → `functions/api/realtime.ts` → `realtime-worker/src/family-hub.ts`
3. Trò chơi chữ: `features/playground/game-catalog.ts` → `features/word-games/SpellingBeePage.tsx` (+ `features/word-games/solo-quiz/question-bank.ts`) → `functions/api/games/records.ts`

---

## 2. Chạy thử trên máy

Cần cài [Node.js](https://nodejs.org) bản 20 trở lên.

```bash
npm install                 # cài thư viện (lần đầu)
npm run db:migrate          # tạo / nâng cấp database local
```

**Bí mật (API key) để NGOÀI project** — để không bao giờ lỡ đưa lên GitHub:

```
E:\IELTS_ThienThao\                      project — đưa lên GitHub
E:\IELTS_ThienThao-secrets\              KHÔNG đưa lên đâu cả
├── .dev.vars                            GEMINI_API_KEY, INVITE_CODE, ANTHROPIC_API_KEY (không bắt buộc)
└── tai-khoan\                           3 tài khoản gia đình + file SQL thêm tài khoản
```

Máy mới: tạo thư mục `IELTS_ThienThao-secrets` cạnh project, chép `.dev.vars.example` vào đó, đổi tên thành `.dev.vars` rồi điền mã thật. `npm run api` (file `scripts/run-local-api.mjs`) tự đọc file này.

Cần 2 cửa sổ terminal:

```bash
# cửa sổ 1: máy chủ realtime (chat, ai online)
npm run realtime

# cửa sổ 2: web + API
npm run build
npm run api                 # mở http://localhost:8788
```

Muốn thử chat một mình: mở 2 trình duyệt (hoặc 1 cửa sổ ẩn danh) và đăng nhập 2 tài khoản khác nhau.

Lưu ý khi chạy local: 2 tiến trình cùng dùng 1 file database. Thỉnh thoảng có thể báo `database is locked`. Nếu bị, tắt cả 2 cửa sổ rồi chạy lại. Trên Cloudflare thật không bị lỗi này.

---

## 3. Đưa lên mạng (đã làm 1 lần — giờ chỉ cần cập nhật)

**Cập nhật thông thường** (sửa giao diện, nội dung): push lên nhánh `main`, GitHub Actions tự build và deploy (1–3 phút, xem ở tab **Actions**).

```bash
git add .
git commit -m "mô tả thay đổi"
git push
```

Không muốn qua GitHub thì vẫn deploy thẳng từ máy được: `npm run deploy`.

**Khi có thay đổi database** (thêm file trong `database/migrations/`):

```bash
npm run db:migrate:remote
```

**Khi sửa thư mục `realtime-worker/`** (chat, ai online):

```bash
npm run deploy:realtime
```

Thứ tự khi cập nhật cả 3: `db:migrate:remote` → `deploy:realtime` → `deploy`.

Mã bí mật (`GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `INVITE_CODE`) đổi ở **Cloudflare → Workers & Pages → ielts-nha-minh → Settings → Variables and Secrets** (chọn loại **Secret**). Đổi xong vào **GitHub → Actions → Deploy to Cloudflare → Run workflow** để áp dụng.

---

## 4. Tạo audio giọng AI cho bài nghe

```bash
npm run tts:v3                 # tạo mp3 còn thiếu cho mọi câu cần nghe (bài học, đề thi, bài nghe v3)
npm run tts:v3 -- --dry-run    # chỉ đếm, không tạo
```

Chi tiết: `docs/redesign-v3/06-AUDIO.md`.

Câu nào chưa có mp3 thì web tự dùng giọng đọc của trình duyệt.

---

## 5. Thêm nội dung / level mới

1. Viết bài trong `src/content/levels/<thư mục>/` theo `docs/redesign-v3/02-CONTENT-GUIDE.md`, kèm file `units.ts` (các chặng).
2. Mở `src/content/lesson-registry.ts`: import mảng bài mới. Mở `src/content/all-levels.ts`: import mảng chặng, gắn vào level.
3. Bài test cuối level: tạo file trong `src/content/exams/`, thêm vào `all-exams.ts`, đặt `levelTestId` trong `all-levels.ts`.
4. Thêm chủ đề Học vui: tạo file trong `src/content/fun-topics/`, thêm vào `all-fun-topics.ts`.
5. Kiểm tra lỗi dữ liệu: `npm run validate`.
6. Tạo audio rồi đưa lên mạng: `npm run tts:v3`, sau đó `npm run deploy`.

---

## 6. Chỉnh luật trò chơi hoá

| Muốn đổi | Sửa file |
|---|---|
| Nhiệm vụ (số XP thưởng), huy hiệu | `src/gamification/quests-and-achievements.ts` |
| XP lên level, danh hiệu | `src/gamification/account-level.ts` |
| Chỗ nào được cộng / hiện XP (chỉ track general + trò chơi chữ) | `src/gamification/gamification-scope.ts` — luật chi tiết: `docs/redesign-v3/03-DATA-LAYER.md` mục 15 |
| Danh sách trò chơi chữ trên /play | `src/features/playground/game-catalog.ts` (+ tên trò trong `functions/api/games/records.ts`) |

Sửa xong chạy `npm run deploy`.

---

## 7. Lưu ý

- **Quyền riêng tư Gemini:** gói miễn phí của Google có thể dùng dữ liệu gửi lên để cải thiện model.
- **Giới hạn AI:** mỗi người tối đa 40 lượt AI/ngày (`AI_DAILY_LIMIT` trong `wrangler.toml`).
- **Điểm AI chỉ là ước tính** để tham khảo.
- **Trình duyệt:** dùng Chrome hoặc Edge. Thi Speaking và bài "đọc to" cần micro.
- **Database:** các bảng cũ của tính năng đã xoá (chuối, cửa hàng, đấu trường, giải tuần, boss) vẫn nằm trong D1 nhưng không còn code nào dùng — để nguyên cũng không sao.
