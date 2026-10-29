# Redesign v3 — Kiến trúc, sơ đồ trang, mô hình dữ liệu

> Tài liệu "hợp đồng" chung cho mọi nhóm (code, nội dung, 3D, kiểm thử).
> Quyết định của chủ nhà: xem `C:\Users\San\.claude\projects\E--IELTS-ThienThao\memory\ielts-family-site.md` (phần Redesign v3).
> Nghiên cứu: `E:\IELTS_ThienThao\_research\notes\*.md` (đặc biệt `psych-adult.md` mục D).
>
> **Cập nhật 29/10/2026 — chủ nhà thu hẹp phạm vi.** Web còn: track IELTS + Tiếng Anh tổng quát, phòng thi, chat,
> 3 trò chơi chữ (Thử thách từ mỗi ngày `/daily-word`, Spelling Bee `/games/spelling`, Nối từ `/games/word-chain`),
> Học vui `/fun`, nhiệm vụ / huy hiệu / XP / chuỗi / bảng xếp hạng. **Đã xoá hẳn:** khu trẻ em (`/kids…`),
> nhóm tuổi tài khoản (kid / teen / adult — mọi tài khoản như nhau; cột `users.age_group` để nguyên, không dùng),
> chuối 🍌 + cửa hàng + quà đăng nhập + hồi tim mini-test, đấu trường / phòng đấu / giải tuần / boss / Đố vui / Đua xếp câu.
> Các mục bên dưới còn nhắc những phần đó là lịch sử thiết kế — đã đánh dấu (ĐÃ XOÁ).

## 0. Tóm tắt quyết định

| Chủ đề | Quyết định |
|---|---|
| Thiết bị | **Desktop trước** (≥ 1280px là chính, phải dùng được từ 1024px). Mobile/tablet làm sau, nhưng CSS không được vỡ ở 768px. |
| Ngôn ngữ | Song ngữ VI/EN có nút chuyển (giữ `translations/`). Nội dung học luôn là tiếng Anh; chỉ hướng dẫn/giải thích đổi ngôn ngữ. |
| Lộ trình | 2 track dùng chung nền: `general` (Tiếng Anh tổng quát) và `ielts` (Luyện thi IELTS). 3 level: `level-1` 0–2.0, `level-2` 2.0–4.0, `level-3` 4.0–6.5. |
| Tài khoản | Mỗi người 1 tài khoản (username + mật khẩu + mã mời gia đình) — giữ backend cũ. Mọi tài khoản như nhau (nhóm tuổi kid / teen / adult ĐÃ XOÁ 29/10). Không có khu phụ huynh. |
| Lần đầu | Khách làm **bài xếp lớp trước** (≤ 12 câu, ≤ 6 phút) → kết quả + lộ trình → tạo tài khoản 1 form để lưu. |
| Lưu tiến độ | 1 cục JSON / người trong D1 (giữ `/api/progress`), nâng `version: 2`, tự chuyển đổi từ v1. Autosave ≤ 5 giây, quay lại đúng câu đang làm. |
| Chấm Writing/Speaking | Tự chấm checklist 4 tiêu chí → so bài mẫu theo band → Gemini (band dạng khoảng ±0.5). |
| Phong cách | **Vui nhộn kiểu game** (chủ nhà chọn), nhưng *liều game hoá* theo `psych-adult.md` D10: game giữ thói quen + làm tiến bộ hiện rõ, không cạnh tranh với nội dung. |
| Tính năng cũ | (29/10) Giữ: chat, 3 trò chơi chữ, Học vui, nhiệm vụ / huy hiệu. ĐÃ XOÁ: đấu trường + cược, chuối + cửa hàng, giải tuần, boss, các mini game khác. Bảng xếp hạng gia đình **trên trang chủ**. |
| Tim | Không có tim trong bài học (câu sai quay lại cuối bài). Tim chỉ ở mini-test (hết tim → làm lại). |
| Nhắc học | Chỉ trong web (mascot ngủ gật, banner giữ chuỗi). |
| Giọng | Anh-Anh mặc định; level-3 trộn thêm Úc/Mỹ. TTS bằng `msedge-tts` (đã có `scripts/generate-listening-audio.ts`). |
| Mascot | Corgi vàng cam + trắng, đồ chơi vinyl, chibi, đồng phục CAND cách điệu vừa phải, tư thế chính đứng chào. Làm trong Blender → `public/mascot/`. |

## 1. Sơ đồ trang (routes)

```
KHÁCH (chưa đăng nhập)
/                       Landing: hero mascot 3D + 1 nút "Bắt đầu học" + "Tôi đã có tài khoản"
/start                  Bài xếp lớp (khách làm được), autosave localStorage
/start/result           Kết quả: level + band dạng khoảng + track gợi ý + lộ trình → form tạo tài khoản
/login                  Đăng nhập
/signup                 Tạo tài khoản (nhận kết quả xếp lớp nếu có)

NGƯỜI HỌC — bố cục 3 cột desktop: sidebar trái | nội dung | cột phải
/                       = /learn
/learn                  Lộ trình: chọn track (tab), level, các chặng (unit) dạng đường đi; nút "Học tiếp" luôn nổi bật
                        Cột phải: streak + mục tiêu ngày, BẢNG XẾP HẠNG GIA ĐÌNH (top 5), nhiệm vụ ngày, ôn tập đến hạn
/lesson/:lessonId       Trình học toàn màn hình (practice + skill task), autosave, resume
/review                 Ôn từ vựng (FSRS) — flashcard
/words                  Sổ từ vựng (đã học / đang ôn / nhớ chắc)
/mistakes               Sổ câu sai → "Ôn lại câu sai"
/progress               Dashboard tiến độ: theo kỹ năng, band ước tính dạng khoảng, lịch học, chuỗi ngày
/exams, /exam/:id, /exam-result/:id   Phòng thi thử (giữ, làm lại giao diện kiểu máy thi IELTS)
/play                   Sân chơi gia đình: trò chơi chữ, nhiệm vụ, huy hiệu, xếp hạng, Học vui (sảnh)
  /daily-word, /games/spelling, /games/word-chain, /quests, /leaderboard, /fun, /fun/:topicId
/chat                   Chat (giữ) + bong bóng chat nổi
/profile/:userId        Trang cá nhân
/settings               Cài đặt: ngôn ngữ, chế độ tối, mục tiêu ngày, giờ học, giọng đọc, track
```

Không có ngõ cụt: mọi màn hình kết thúc đều có 1 nút chính (Học tiếp / Làm bài tiếp theo / Ôn lại câu sai / Chơi tiếp) + 1 nút phụ (Dừng ở đây / Về trang chính).

## 2. Mô hình nội dung (content model v3)

File: `src/content/content-types.ts` (mở rộng, giữ kiểu cũ để nội dung cũ vẫn chạy).

```ts
export type TrackId = 'general' | 'ielts'
export type LevelId = 'level-1' | 'level-2' | 'level-3'

/** 1 chặng học (unit) = 5–7 bài, có 1 câu "can-do" */
export interface Unit {
  id: string                 // 'u1-03-family'  (level 1, chặng 3)
  levelId: LevelId
  tracks: TrackId[]          // ['general','ielts'] = dùng chung; ['ielts'] = chỉ track IELTS
  order: number              // thứ tự trong level (chặng dùng chung xếp xen với chặng riêng theo order)
  title: BilingualText
  icon: string               // tên ảnh 3D emoji trong public/word-images/ hoặc emoji
  canDo: BilingualText       // "Sau chặng này bạn có thể…"
  lessonIds: string[]        // theo thứ tự trên đường đi
  checkpointExamId?: string  // bài kiểm tra cuối chặng (tuỳ chọn, có tim)
}

export interface LevelInfo {
  id: LevelId; order: 1 | 2 | 3
  bandRange: string          // '0 – 2.0'
  cefr: string               // 'Pre-A1 – A1'
  title: BilingualText; goals: BilingualText
  units: Unit[]              // tất cả chặng của level (cả 2 track)
  levelTestId?: string
}

/** Lesson cũ + 2 trường mới. mode mặc định 'practice' (bài kiểu Duolingo). */
export interface Lesson {
  ...cũ (id, skill, title, description, teachingCards, words?, readingPassages?, exercises, miniTest)
  mode?: 'practice' | 'listening' | 'reading' | 'writing' | 'speaking'
  estimatedMinutes?: number
  listeningTask?: ListeningTask   // mode 'listening'
  readingTask?: ReadingTask       // mode 'reading'
  writingTask?: WritingTaskV3     // mode 'writing'
  speakingTask?: SpeakingTask     // mode 'speaking'
}

export interface AudioLine { speaker?: string; text: string; voice?: 'gb-female'|'gb-male'|'au-female'|'au-male'|'us-female'|'us-male'|'gb-child' }
export interface ListeningTask {
  instructions: string                 // "Questions 1–5. Write ONE WORD AND/OR A NUMBER."
  segments: { id: string; lines: AudioLine[] }[]   // mỗi đoạn nghe lại riêng được
  questions: ExamQuestion[]            // gắn segmentId để nút "Nghe lại đoạn này"
  strategyTip?: BilingualText
}
export interface ReadingTask {
  passage: { title: string; paragraphs: { label?: string; text: string }[] }
  instructions: string
  questions: ExamQuestion[]            // thêm kind 'matching-headings' | 'short-answer'
  examMinutes?: number                 // chế độ bấm giờ như thi thật
  strategyTip?: BilingualText
}
export interface BandSample { band: string; text: string; notesVi: string }
export interface WritingTaskV3 extends WritingTask {   // WritingTask cũ có taskNumber, prompt, chartData, minWords…
  bandSamples: BandSample[]            // ví dụ band 4.0 / 5.5 / 6.5
  checklist: { criterion: 'TA'|'TR'|'CC'|'LR'|'GRA'; questionsVi: string[] }[]
  planningHintsVi?: string[]
}
export interface SpeakingTask {
  part: 1 | 2 | 3
  questions: string[]
  cueCard?: { topic: string; points: string[] }   // part 2: 60s chuẩn bị + 120s nói
  bandSamples: { band: string; text: string; notesVi: string }[]
  usefulPhrases?: string[]
  targetSounds?: string[]              // VD ['final -s', '/θ/']
}
```

`ExamQuestion` có thêm `segmentId?` (listening) và `paragraphLabel?` (reading). Không thêm kind mới: matching headings dùng `choice` (options = danh sách tiêu đề), short answer dùng `gap-fill`. Kiểu chính xác: xem `src/content/content-types.ts` mục 7–8 (đã viết xong, là nguồn sự thật). Nội dung đặt trong:

```
src/content/
  content-types.ts        hợp đồng kiểu dữ liệu
  all-levels.ts           3 LevelInfo + units (tham chiếu lesson id)
  lesson-registry.ts      tất cả lesson theo id (gom từ các file bên dưới)
  levels/level-1-beginner/…   (giữ, id cũ giữ nguyên để tiến độ cũ map tự động)
  levels/level-2-foundation/… (giữ)
  levels/level-2-bridge/      MỚI: phần 3.0–4.0 (general + IELTS làm quen)
  levels/level-3-ielts/       MỚI: listening/reading/writing/speaking theo dạng đề
  levels/level-3-general/     MỚI: B1–B2 giao tiếp, công việc, phim/báo
  exams/                      placement mới (thích ứng), level tests, mock IELTS
```

## 3. Tiến độ v2 (progress model)

`src/learning-progress/progress-types.ts` — `version: 2`. Hàm `migrateProgress(raw)` chuyển v1 → v2:
- giữ `xpTotal, xpByDay, streak, lessons (id cũ), miniTests, mistakes, gamification fields`;
- `reviewCards` (Leitner) → thẻ FSRS mới (box → stability ước lượng);
- `placement.recommendedLevelOrder` cũ (1..6) → level mới (1–2 → level-1/2, ≥3 → level-2).

```ts
interface LearningProgressV2 {
  version: 2
  profile: { track: TrackId; dailyGoalMinutes: number; studyCue?: string; studyTime?: string;
             voice: 'gb'|'us'; theme: 'system'|'light'|'dark' }
  currentLevel: Record<TrackId, LevelId>
  unlockedLevels: Record<TrackId, LevelId[]>
  lessons: Record<string, { completedAt: string; bestAccuracy: number; attempts: number }>
  /** Bài đang làm dở — mở lại web là quay về đúng câu */
  resume: { lessonId: string; stepIndex: number; queue: string[]; answers: Record<string, unknown>; updatedAt: string } | null
  drafts: Record<string, { text: string; updatedAt: string }>      // bản nháp Writing
  skillStats: Record<SkillName, { answered: number; correct: number; recent: number[] }>  // recent: 0/1 của 40 câu gần nhất
  bandEstimates: Partial<Record<SkillName, { low: number; high: number; confidence: 'low'|'medium'|'high'; updatedAt: string }>>
  srs: Record<string, SerializedFsrsCard>   // key 'word:<id>' | 'item:<exerciseId>'; dùng thư viện ts-fsrs
  mistakes: MistakeEntry[]
  streak: { current: number; longest: number; lastStudyDate: string | null; freezes: number; repairUntil?: string }
  minutesByDay: Record<string, number>      // 90 ngày gần nhất
  xpTotal: number; xpByDay: Record<string, number>
  placement: { level: LevelId; track: TrackId; bandLow: number; bandHigh: number; takenAt: string } | null
  writingLog: { taskId: string; words: number; selfBand?: number; aiLow?: number; aiHigh?: number; at: string }[]
  …các trường game hoá cũ (lifetimeStats, questCounters, claimedRewards, unlockedAchievements, rewardedAccountLevel)
}
// (29/10) profile.ageGroup và khối kids đã bỏ — migrateProgress tự xoá khỏi bản lưu cũ.
```

Autosave: store đã gửi PUT sau 1,5 giây im lặng — giữ. Thêm: ghi `resume` sau **mỗi câu trả lời**; `localStorage` luôn có bản mới nhất (mất mạng vẫn chạy, có mạng gửi lại).

Backend thay đổi tối thiểu:
- migration `0003_redesign_v3.sql`: `ALTER TABLE users ADD COLUMN age_group TEXT NOT NULL DEFAULT 'adult'` (cột vẫn còn; từ 29/10 máy chủ không dùng).
- realtime-worker: chỉ còn online / chat (đấu trường đã xoá 29/10).
- Không đụng database thật trên Cloudflare (remote) khi chưa được chủ nhà đồng ý.

## 4. Luồng học chính

1. **Landing** → "Bắt đầu học" → `/start` (chọn nhanh: "Tôi học để biết" / "Tôi luyện thi IELTS"; hoặc "Tôi mới bắt đầu từ 0" bỏ qua test).
2. **Bài xếp lớp thích ứng**: 10–12 câu (từ vựng/ngữ pháp → nghe → đọc), dễ lên khó; sai 2 câu liền ở một mức thì dừng mức đó. Không đồng hồ. Thanh tiến độ.
3. **Kết quả**: mascot vui + "Bạn ở Level 2 · khoảng band 2.5–3.0 (A2)" + câu can-do + bản đồ 3 level với chấm "bạn ở đây" + mục tiêu 6.5 → form tạo tài khoản (tên hiển thị, tên đăng nhập, mật khẩu, mã gia đình) → vào thẳng bài đầu tiên.
4. **Lộ trình /learn**: đường đi các chặng; nút "Học tiếp" luôn trỏ bài kế tiếp; "còn N bài tới mốc".
5. **Bài học** (`/lesson/:id`): thẻ dạy (≤ 3) → bài tập (6–15 câu, ≥ 70% là tự nhớ/tự chọn) → (nếu có) task kỹ năng → câu sai quay lại cuối → kết quả.
   - Feedback ≤ 300ms: đúng/sai + đáp án đúng + 1 dòng "vì sao". Không buzz, không đỏ toàn màn ở level-1.
   - Phím tắt desktop: `1–4` chọn, `Enter` kiểm tra/tiếp, `Space`/`R` nghe lại, `Esc` thoát (tự lưu).
6. **Kết quả bài**: can-do → 1–3 lỗi + "Ôn lại câu sai" → tiến độ ngày → XP nhỏ cuối. Ăn mừng ≤ 1,5s. 2 nút: "Học tiếp" + "Dừng ở đây".

Trình kỹ năng (dùng trong bài và trong phòng thi):
- **Listening**: play/pause, tua 5s, tốc độ 0.75×/1×/1.25×, nghe lại từng đoạn, transcript chỉ hiện sau khi nộp (đoạn nghe nối với câu hỏi).
- **Reading**: desktop 2 cột kéo được (bài đọc | câu hỏi), bôi đen để highlight (vàng) + ghi chú, chế độ bấm giờ như thi thật, bảng điều hướng câu.
- **Writing**: đề + biểu đồ (Task 1) bên trái, editor bên phải; đếm từ trực tiếp, đồng hồ (ẩn được), autosave nháp; nộp → tự chấm checklist 4 tiêu chí → so bài mẫu band 4/5.5/6.5 → Gemini.
- **Speaking**: ghi âm trình duyệt (MediaRecorder), sóng âm, nghe lại, so audio mẫu; Part 2 cue card 60s chuẩn bị + 120s nói; tự chấm + Gemini (giữ API cũ).

## 5. Khu trẻ em (ĐÃ XOÁ 29/10/2026 — giữ lại làm lịch sử thiết kế)

Trò chơi (mỗi trò dùng chung ngân hàng từ `src/content/kids/` + SRS 5 hộp):
1. **Nghe và chạm** (Listen & Tap) — LÀM HOÀN CHỈNH TRƯỚC (mẫu cho các trò khác).
2. **Lật thẻ ghép cặp** (hình ↔ từ, từ ↔ âm thanh).
3. **Xếp chữ thành từ** (bấm/kéo chữ cái, mỗi chữ có âm).
4. **Bóng bay chữ** (nghe từ, bấm đúng bóng; bóng bay chậm, bóng lỡ sẽ quay lại — không mất mạng).
5. **Ghép câu** (khối chữ thành câu theo mẫu câu Movers/Flyers).
6. **Nghe lệnh tô màu** ("Color the cat red").
7. **Nói để mở khoá** (Web Speech API chấm lỏng; sau 2 lần không nhận ra → tự nghe so sánh rồi bấm Giống/Chưa giống; luôn có Bỏ qua).
8. **Phiêu lưu cùng mascot** (truyện tuần tra ngắn, trả lời đúng để đi tiếp; cutscene ≤ 15s, có Bỏ qua).

Phần thưởng: sticker khi 1 từ lên "đã thuộc"; album theo chủ đề Cambridge; xong bộ → mở trang phục mascot. Không tiền ảo ngẫu nhiên, không cược. 30 phút/ngày → mascot nhắc nghỉ mắt (không khoá). Mỗi lượt có điểm dừng tự nhiên + 2 nút ngang nhau "Chơi thêm 1 lượt" / "Xong hôm nay".

## 6. Hợp đồng tài sản mascot / 3D (nhóm Blender xuất đúng tên này)

```
public/mascot/
  poses/<pose>-<size>.webp        size: 256 | 512 | 1024 ; nền trong suốt
     pose: salute (CHÍNH), happy (thè lưỡi), wave, thumbs-up, celebrate, surprised,
           comfort (an ủi khi sai), thinking, sleepy (nhắc học),
           listening (tai nghe), reading (cầm sách), writing (cầm bút), speaking (cầm micro)
  head/head-<size>.png            size: 32 | 64 | 128 | 192 | 512 (logo/favicon)
  turnaround/{front,three-quarter,side,back}-1024.webp
  stickers/<stickerId>-256.webp
  anim/<name>.webm                VP9 có alpha, ≤ 600KB; name: idle-breathe, tail-wag, blink, tongue, celebrate
  mascot.glb                      Draco, ≤ 2.5MB, có actions: idle, wave, celebrate, blink
public/art/
  badges/level-1|2|3-512.webp     huy hiệu 3 level (3D)
  skills/listening|reading|writing|speaking|vocabulary-256.webp   icon 5 kỹ năng (3D)
  hero/*.webp                     minh hoạ hero
```

Code dùng component `<Mascot pose="salute" size={256} />` và `<SkillIcon skill="reading" />` — nếu file chưa có thì hiện ảnh tạm (placeholder) để không vỡ trang.

Ảnh minh hoạ từ vựng: **Microsoft Fluent Emoji 3D** (giấy phép MIT) → `public/word-images/<slug>.webp` (160px). Âm thanh hiệu ứng: tự tổng hợp bằng Web Audio hoặc gói CC0 (Kenney) → `public/sounds/`.

## 7. Cấu trúc code mới và quyền sở hữu file

```
src/
  app/                    App.tsx, route-registry (mỗi khu tự khai báo route của mình)
  design-system/          tokens.css, base.css, components/* (Button, Card, ProgressBar, Ring, Mascot, SkillIcon,
                          AudioButton, Modal, Tabs, Badge, Kbd, Toast, EmptyState…), motion + sound helpers
  features/
    landing/  placement-test/  auth/
    learning-path/        /learn + cột phải
    lesson-player/        trình học, các dạng bài, feedback, kết quả, resume
    skill-listening/  skill-reading/  skill-writing/  skill-speaking/
    vocabulary-review/    FSRS (ts-fsrs), /review, /words
    mistakes-notebook/
    progress-dashboard/
    playground/           /play hub; các trang cũ trong src/pages/ được restyle bằng design-system
    settings/
  content/  learning-progress/  services/  translations/ (mỗi feature có file chữ riêng: features/x/x-text.ts)
```

Quy tắc khi nhiều nhóm code song song: chỉ sửa trong thư mục mình sở hữu; file dùng chung (`app/`, `design-system/`, `learning-progress/`, `content/content-types.ts`) chỉ nhóm nền móng (foundation) sửa — nhóm khác cần thêm gì thì ghi vào `docs/redesign-v3/REQUESTS.md`.
Mọi file có comment đầu file bằng tiếng Việt giải thích vai trò (chủ nhà đọc code để học).

## 8. Việc để trống / hỏi lại chủ nhà

Ghi vào `E:\IELTS_ThienThao\_research\OPEN-QUESTIONS.md`.
