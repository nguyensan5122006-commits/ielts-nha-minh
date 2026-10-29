# Yêu cầu gắn kết giữa các nhóm (REQUESTS)

Mỗi nhóm thêm 1 mục riêng bên dưới (không sửa mục của nhóm khác).

> **Lưu ý 29/10/2026 (dọn phạm vi):** các mục cũ bên dưới còn nhắc khu trẻ em, nhóm tuổi, chuối / cửa hàng,
> đấu trường, giải tuần, boss — những phần đó **đã xoá hẳn** khỏi code (xem đầu `01-ARCHITECTURE.md`).
> Các mục được giữ nguyên làm lịch sử; đừng làm theo yêu cầu nào liên quan tới phần đã xoá.

---

## Nhóm "Bài xếp lớp + test level" (`src/content/exams/`) → gửi nhóm nền móng + nhóm UI

Đã thêm (không sửa file nào ngoài `src/content/exams/`):
- `src/content/exams/placement-types.ts` — kiểu mới cho bài xếp lớp thích ứng (`PlacementItem`, `PlacementAnswer`, `PlacementEstimate`…).
- `src/content/exams/placement-v3.ts` — ngân hàng 60 câu + đặc tả thuật toán (comment đầu file) + hàm thuần.
- `src/content/exams/level-test-v3.ts` — 3 bài test level (`level-test-v3-level-1|2|3`), kiểu `Exam`, chỉ câu tự chấm, passPercent 70.
- `src/content/exams/mock-ielts-test-2.ts` — đề thi thử IELTS số 2 (`mock-ielts-2`), cấu trúc giống hệt đề 1.
- `src/content/exams/index-v3.ts` — cổng xuất tất cả những thứ trên.

### 1. `src/content/all-exams.ts` (nhóm nền móng sửa)
```ts
import { EXAMS_V3 } from './exams/index-v3'
export const ALL_EXAMS: Exam[] = [placementTest, level1Test, level2Test, mockIeltsTest1, ...EXAMS_V3]
```
(Giữ `placementTest`, `level1Test`, `level2Test` cũ để kết quả cũ của người dùng vẫn mở được.)

### 2. `src/content/all-levels.ts` — LevelInfo v3
```ts
import { LEVEL_TEST_V3_IDS } from './exams/index-v3'
// level-1: levelTestId: LEVEL_TEST_V3_IDS['level-1']  ('level-test-v3-level-1'), tương tự level-2, level-3
```

### 3. Trang `/start` (nhóm `features/placement-test/`)
```ts
import {
  nextPlacementItem, placementStopReason, estimatePlacement, completeBeginnerResult,
  PLACEMENT_KIND_INSTRUCTIONS, type PlacementAnswer, type PlacementEstimate,
} from '../../content/exams/index-v3'
```
- Vòng lặp: `item = nextPlacementItem(answers)`; `null` → dừng, lý do = `placementStopReason(answers)`; kết quả = `estimatePlacement(answers)`.
- Nút "Tôi mới bắt đầu từ 0" → `completeBeginnerResult()`.
- Làm theo mục 0, 1, 6 trong comment đầu `placement-v3.ts`: không báo đúng/sai từng câu, có nút "Mình chưa biết câu này" (= `correct: false`),
  câu nghe phát tối đa 2 lần, không đồng hồ, lưu `answers` vào localStorage sau mỗi câu, lời mời "bắt đầu Level 1" khi 2/3 câu đầu chưa đúng.
- Hiển thị: "Level X · {cefr} · khoảng band {bandLow}–{bandHigh}", KHÔNG hiện `bandPoint`. `stretchLevel` → gợi ý làm bài test level để lên thẳng.
- Lưu progress v2: `placement = { level: recommendedLevel, track, bandLow, bandHigh, takenAt }`.
- Nên viết test lặp lại 7 ví dụ A–G ở mục 7 đầu file `placement-v3.ts`.
- `PlacementSkill` có thêm `'grammar'` (không có trong `SkillName`): khi ghi `skillStats` thì gộp grammar vào `vocabulary`.

### 4. `scripts/generate-listening-audio.ts` (TTS)
Đề trong `ALL_EXAMS` tự được gom. Riêng câu nghe của bài xếp lớp (không phải `Exam`) cần thêm vào `collectTexts()`:
```ts
import { PLACEMENT_V3_ITEMS } from '../src/content/exams/index-v3'
for (const item of PLACEMENT_V3_ITEMS) if (item.kind === 'listen-choose') texts.add(item.audioText)
```
Hội thoại viết "Woman: …\nMan: …" (người nói đầu = giọng nữ Sonia, thứ hai = nam Ryan, đúng thứ tự `SPEAKER_VOICES`).
Mock 2 Part 3 và Level 3 test Part 3 có 3 người nói → người thứ 3 (Chloe / Mia) tự nhận giọng Úc `en-AU-NatashaNeural`.

### 5. Gợi ý cho nhóm UI phòng thi (không bắt buộc)
- `stableOptionOrder` chỉ nhận diện đáp án có chữ cái in hoa "A. …". Danh sách heading bắt đầu bằng số La Mã thường ("i. …", như đề 1)
  đang bị xáo và thêm chữ "A. iv. …". Đề xuất: coi `/^[ivx]+\.\s/` cũng là "đã đánh nhãn" (không xáo, không thêm chữ cái).
- Bài test Level 1: ẩn đồng hồ (psych-adult A15: không timer ở band 0–2.0); `durationMinutes` chỉ để ước lượng thời gian.
- Câu hỏi Reading trong đề mới có `paragraphLabel` → có thể highlight đoạn chứa đáp án khi xem giải thích.

---

## Nhóm nền móng dữ liệu (`src/learning-progress/`, `src/content/` dùng chung, backend) → trả lời + gửi các nhóm

Tài liệu API đầy đủ: **`docs/redesign-v3/03-DATA-LAYER.md`**.

### Đã làm theo yêu cầu của nhóm "Bài xếp lớp + test level"
- Mục 1: `all-exams.ts` đã thêm `...EXAMS_V3` (giữ đề cũ).
- Mục 2: `all-levels.ts` dùng `LEVEL_TEST_V3_IDS` cho `levelTestId` của cả 3 level.
- Mục 4: `scripts/generate-listening-audio.ts` đã gom câu nghe `PLACEMENT_V3_ITEMS`.

### Đã gắn nội dung v3 (lesson-registry.ts + all-levels.ts)
Level 2 bridge general/ielts, Level 3 ielts (nghe-đọc, viết-nói), Level 3 general — tổng 205 bài, 39 chặng, `npm run validate` qua.
Thêm file bài mới vào thư mục của nhóm mình → báo nhóm nền móng (hoặc tự thêm 1 dòng import vào `lesson-registry.ts`, đúng khối "(v3)").

### Gửi nhóm auth / signup
- `register({ ..., ageGroup })` — gửi `'kid' | 'teen' | 'adult'` từ lựa chọn ở `/start`. Không gửi = `'adult'`.

### Gửi nhóm giao diện (learning-path, lesson-player, review, mistakes)
- Thay `ComingSoonPage` trong `src/app/App.tsx` bằng trang mới cho: `/`, `/learn`, `/roadmap`, `/level/:levelId`, `/lesson/:lessonId`,
  `/lesson/:lessonId/mini-test`, `/review`, `/mistakes`. Trang cũ để tham khảo ở `src/_legacy-v2/`.
- Phòng thi (`ExamsPage`) đang liệt kê cả test level cũ lẫn v3 — nên ẩn `level-1-test`, `level-2-test` khỏi danh sách (vẫn giữ trong `ALL_EXAMS`).

### Nhóm âm thanh (TTS)
- Đã kiểm tra: `scripts/generate-audio-v3.ts` (`npm run tts:v3`) đã gom `listeningTask.segments` — không cần làm thêm. TODO trong `generate-listening-audio.ts` cũ chỉ là ghi chú.

### Gửi chủ nhà (khi đồng ý đưa lên mạng)
- Thứ tự: `npm run db:migrate:remote` (migration 0003: cột `users.age_group`) → `npm run deploy:realtime` → `npm run deploy`.

---

## Nhóm âm thanh (TTS) → gửi nhóm nền móng + kids-zone + skill-listening + placement / phòng thi

Đã thêm (không sửa file nội dung của nhóm khác): `scripts/generate-audio-v3.ts` + `scripts/audio-v3/*`, lệnh
`npm run tts:v3` (1 dòng trong `package.json`), `src/services/audio-clip-keys.ts` (cách tính mã, dùng chung),
mở rộng `src/services/text-to-speech.ts` (tương thích ngược — `speak`, `stopSpeaking`, `hashAudioText` giữ nguyên).
Hướng dẫn đầy đủ: `docs/redesign-v3/06-AUDIO.md`.

### 1. Nhóm nền móng — nâng `msedge-tts` lên `^2.1.1` (không gấp)
Từ khoảng 10/2026 máy chủ Microsoft trả 403 cho `msedge-tts 2.0.9` (đổi cách xác thực Sec-MS-GEC v2) → `npm run tts`
cũ hỏng. `tts:v3` tự vá khi chạy nên vẫn tạo được audio; nâng thư viện thì phần vá tự tắt và script cũ chạy lại được.

### 2. Kids-zone — dùng các hàm này (đã có file mp3 cho mọi từ, câu, câu mascot)
- `playKidsWord(word, { slow })` (nút loa / nút 🐢), `playKidsLetter('c')` (trò Xếp chữ), `playKidsMeaning(word)` (nghĩa tiếng Việt),
  `playKidsSentence(text)` (câu ví dụ, Ghép câu, lệnh tô màu `commandEn`, lời kể truyện `narrationEn`).
- Câu mascot: `playVoiceLine(line.id, 'vi' | 'en', { fallbackText: fillMascotName(line.vi) })`. File đã thay `{mascot}` = "Ki".
  Ghi chú trong `kids-voice-lines.ts` ("public/audio/kids/<id>-vi.mp3") **không dùng** — tra theo id qua manifest.
- Truyện: `playVoiceLine('<chapterId>.scenes.<i>.narration', lang)` / `'.prompt'`, hoặc `playKidsSentence(fillMascotName(scene.narrationEn))`.
- Tải trước 1 vòng: `preloadClips(words.map((w) => kidsWordKey(w.word)))`.
- Phụ đề chạy theo giọng: dùng `onProgress({ currentTime, duration })`.
- Câu có tên bé ("Chào {tên}!") không tạo sẵn được → truyền chữ đã điền làm `fallbackText` (trình duyệt đọc).

### 3. Skill-listening / phòng thi
- Bài nghe v3: `playSegment(segment, { rate, onProgress, onEnded })` → `handle.pause/resume/seek/setRate`, `handle.currentTime/duration`.
  Mỗi segment có 1 file ghép sẵn (tua chính xác). `PLAYBACK_RATES = [0.75, 1, 1.25]`.
- Đề thi kiểu cũ (`audioScript`) và câu `audioText`: `speak(text, rate)` như cũ (đã có file).
- `PlaybackHandle` không phải Promise: chờ bằng `await handle.finished`.

### 4. Placement `/start`
- `speak(item.audioText)` có file cho mọi câu nghe. Câu 1 người nói có `voice` khác `gb-female` dùng `playAudioLine({ text: item.audioText, voice: item.voice })`.

---

## Nhóm ONBOARDING (landing, /start, /start/result, /login, /signup) → mọi nhóm

### Vite treo — ĐÃ XỬ LÝ trong `vite.config.ts` (điều phối viên)
Trước đây Vite theo dõi cả thư mục dự án nên treo trên file bị khoá (`docs/research/profiles/*`, `.wrangler/state`…).
`vite.config.ts` chung giờ đã bỏ qua các thư mục đó — chỉ cần khởi động lại Vite. (File cấu hình riêng tạm thời của
onboarding `node_modules/.cache/vite-onboarding/vite.config.mjs` không còn cần.)

### Gửi nhóm hệ thiết kế — đề nghị mở rộng `AudioButton` (không gấp)
Câu nghe của bài xếp lớp có giọng riêng (`voice: 'gb-male'`…) → phải phát bằng `playAudioLine({ text, voice })`
(loại `placement-line`, 06-AUDIO.md mục 5), cần "tự phát 1 lần" và "tối đa 2 lần nghe". `AudioButton` chỉ có `text`
(→ `speak()`, giọng tự động). Onboarding tạm làm bản nhỏ `src/features/placement-test/PlacementAudio.tsx` (dùng lại
class `ds-audio` của AudioButton). Đề nghị AudioButton nhận thêm `line?: AudioLine`, `autoPlay?: boolean`,
`maxPlays?: number` — có rồi thì onboarding đổi về AudioButton.

### Gửi nhóm nền móng
- `src/pages/LoginPage.tsx` cũ không còn được dùng (App.tsx giờ dùng `src/features/auth/LoginPage.tsx`) — xoá được khi tiện.
- (Đã xong) Baloo 2 đã có trong `index.html` — onboarding đã bỏ `@import` font riêng.

### Gửi nhóm learning-path
- Route `/` giờ thuộc **landing** (đặt TRƯỚC khối RequireLogin trong App.tsx nên được ưu tiên): khách → trang giới thiệu;
  đã đăng nhập → `<Navigate to="/learn">` (bé → `/kids`). Route `/` trong `learningPathRoutes()` vẫn để nguyên, không bị gọi tới.
- **Tiến độ tặng sẵn (psych-adult A9 / D2 luật 4)**: khi `progress.placement` khác null, ô ĐẦU TIÊN của chặng đầu nên hiện
  tick sẵn với nhãn "Đã xong: bài xếp lớp" (không phải 1 bài học thật — chỉ là ô hiển thị). Màn kết quả của onboarding đã hứa
  điều này ("Bài xếp lớp · đã xong" → "Chặng 1: …"). Ngoài ra lúc lưu, onboarding đã gọi `markStudyDay()` +
  `addStudyMinutes(phút làm bài)` → chuỗi ngày bắt đầu từ 1 (chỉ khi đã làm bài thật, không tính "Tôi mới bắt đầu từ 0").
- `profile.studyCue` / `profile.studyTime` ("sau bữa tối" / "20:00") được lưu từ màn kết quả → dùng cho lời nhắc trong web.

### Gửi nhóm sở hữu `WelcomeModal` (src/components/WelcomeModal.tsx)
- Bảng "Mừng … quay lại!" hiện cả với tài khoản VỪA tạo và che luôn bài học đầu tiên (`/lesson/*`, màn toàn màn hình).
  Onboarding tạm né bằng cách ghi `localStorage['ielts-welcome-day-<userId>'] = hôm nay` trước khi chuyển vào bài
  (`skipWelcomeModalToday` trong `src/features/placement-test/use-apply-placement.ts`). Đề nghị WelcomeModal tự không hiện
  trên `/lesson/*`, `/exam/*`, `/kids/play/*` (hiện ở lần mở trang có khung kế tiếp).

### Thông tin cho mọi nhóm
- Kết quả xếp lớp của khách nằm trong localStorage (`ielts-placement-v3-result`), áp vào tài khoản bằng `setPlacementV3` +
  `setProfile({ dailyGoalMinutes, studyCue?, studyTime? })` khi đăng ký / đăng nhập từ màn kết quả. Muốn cho người đã đăng nhập
  làm lại bài xếp lớp (VD trong Cài đặt): link tới `/start` — màn kết quả có nút "Lưu & học ngay" cho người đã đăng nhập.

---

## Nhóm LESSON-PLAYER (`src/features/lesson-player/`, route `/lesson/:lessonId`) → mọi nhóm

### 1. Hợp đồng trình kỹ năng (skill-listening-reading, skill-writing-speaking) — ĐÃ CÓ
- File `src/features/lesson-player/skill-task-registry.ts` (đọc comment đầu file — đủ hợp đồng).
- Đăng ký: tạo `src/features/<nhóm>/register-skill-tasks.ts` gọi `registerSkillTask(mode, lazy(() => import('./Player')), { layout })`.
  Trình học tự nạp mọi file tên này (import.meta.glob) — KHÔNG cần sửa App.tsx hay file của lesson-player.
- Props: `{ lesson, mode, resumeData, onSaveResume(data), onComplete(result), onRequestExit() }`.
- Player tự `recordAnswer` từng câu; trình học lo `completeLessonV3`, XP, chuối, resume, màn kết quả.
- Chưa có player cho mode -> trình học hiện thẻ "Phần này đang được hoàn thiện" + "Đi tiếp" (không ngõ cụt).

### 2. Nhóm hệ thiết kế — đề nghị thêm icon vào `Icon.tsx` (không gấp)
`mic`, `mic-off`, `ear`, `replay`, `robot`, `lightbulb`, `target`, `timer` — trình học đang tự vẽ tạm trong
`src/features/lesson-player/parts/LessonGlyph.tsx` (cùng phong cách nét 2px bo tròn). Có rồi thì báo để đổi sang Icon chung.

### 3. Nhóm nền móng / backend — API báo lỗi câu hỏi (không gấp)
Nút cờ "Báo lỗi câu hỏi" trong khung phản hồi hiện chỉ lưu trong máy (`localStorage['ielts-lesson-reports']`:
`{ lessonId, itemId, at }`). Khi có `POST /api/content-reports` thì đổi 1 hàm `saveReport()` trong `parts/FeedbackSheet.tsx`.

### 4. Nhóm khác muốn tái dùng dạng bài (VD sổ lỗi sai "Ôn lại câu sai")
`import { ExerciseView } from '../lesson-player/exercises/ExerciseView'` + `checkExerciseAnswer()` trong
`exercises/exercise-contract.ts` (thuần, không React). Xem `parts/MistakeReplay.tsx` làm mẫu (~100 dòng).
`src/exercise-types/` cũ giữ nguyên để không làm vỡ phòng thi (`exam-engine` dùng `stableOptionOrder`).

### 5. Learning-path — link nhanh cho dev
Khi `npm run dev`: `/dev/lessons` liệt kê mọi bài + nút nhảy tới câu bất kỳ (`?devItem=`, `?devTask=1`, `?devResults=1`).

---

## Nhóm KIDS-ZONE (`src/features/kids-zone/`, route `/kids/*`) → nhóm nền móng, hệ thiết kế, audio, Blender, kids games 2–8

Đã làm: động cơ trò chơi dùng chung, sảnh `/kids`, sổ sticker, tủ đồ, trò 1 "Nghe và chạm" hoàn chỉnh.
Hướng dẫn cho nhóm làm trò 2–8: **`docs/redesign-v3/08-KIDS-GAMES-DEV.md`** (thêm trò = tạo `games/<id>/game-definition.ts`, không sửa file chung).
`App.tsx`: đã thêm 2 dòng — `{kidsPreviewRoutes()}` (ngoài vùng đăng nhập, chỉ khi `npm run dev`) và `{kidsRoutes()}` (trong `RequireLogin`,
ngoài `LayoutWithNavigation` — khu trẻ em toàn màn hình). Vui lòng giữ 2 dòng này khi sửa App.tsx.

### 1. Nhóm nền móng dữ liệu (`src/learning-progress/`)
- **Trùng tên bộ đồ mặc định**: `createEmptyKidsProgress().equippedOutfit = 'classic'` và `kidsEquipOutfit` chỉ nhận `'classic'`, nhưng nội dung dùng
  `DEFAULT_OUTFIT_ID = 'police-uniform'` (`content/kids/outfits.ts`). Kids-zone đang quy đổi 2 chiều (`kids-rewards.ts`: `equippedOutfitId`,
  `outfitIdForStore`). Đề xuất: `kidsEquipOutfit` nhận cả `'police-uniform'` (hoặc đổi mặc định sang `'police-uniform'` + migrate `'classic'`).
- **Tem tuần đóng quá dễ**: `kidsAddPlaySeconds` đóng tem hôm nay ngay khi có vài giây hoạt động (mở sảnh, rê chuột 20 giây là có tem).
  Luật 24 = "ngày có chơi". Đề xuất: chỉ `kidsRecordBestScore` (xong 1 lượt) mới đóng tem; `kidsAddPlaySeconds` chỉ cộng giờ.
- **Độ khó thích nghi** đang lưu localStorage theo máy (`kids-zone:difficulty:<gameId>`). Đề xuất thêm `kids.recentFirstTryRates: Record<gameId, number[]>`
  (≤ 5 số) + hành động lưu, để đổi máy không mất. Tương tự trần "8 từ mới/ngày" đang đếm trong localStorage — nếu `KidsWordState` có thêm
  `firstSeen: 'YYYY-MM-DD'` thì tính được từ tiến độ thật.
- "Thử thách cả nhà" (sảnh) mới hiện số lượt của riêng bé. Cần API / selector tổng lượt chơi của cả gia đình trong tuần để làm đúng ý "hợp tác".

### 2. Nhóm hệ thiết kế (`src/design-system/`)
- `WordImage` thử `/word-images/<slug>-128.webp` trước (luôn 404 — tên file thật là `<slug>.webp`, xem `word-image-report.md`) rồi mới thử
  `<slug>.webp` → mỗi ảnh mới chậm 1 lượt tải hỏng. Đề xuất đảo thứ tự / bỏ `-128`. Khu trẻ em dùng bản riêng `KidsPicture` (tải thẳng + tải trước).
- Font **Baloo 2** chưa được nạp ở `index.html` → `kids-zone.css` đang `@import` Google Fonts. Khi index.html nạp Baloo 2 thì xoá dòng @import đó.
- `Mascot` (ảnh tạm = hình tròn + chữ "Ki"): khu trẻ em dùng Ki vẽ SVG có nét mặt theo pose (`game-engine/components/KidsMascot.tsx`, có cả
  tai nghe cho pose `listening`). Nếu muốn dùng làm ảnh tạm chung cho cả web, cứ lấy.

### 3. Nhóm audio — đã dùng xong
- `kids-audio.ts` gọi `playKidsWord`, `playKidsMeaning`, `playKidsSentence`, `playVoiceLine(id, 'vi', { fallbackText, onProgress })`, `preloadClips`.
  Phụ đề chạy theo dùng `onProgress`. Cảm ơn. Chưa có mp3 (đọc bằng giọng máy): câu chào có tên bé "Chào {tên}! Hôm nay chơi gì nào?",
  4 câu khen có chèn tên từ (`WORD_PRAISE` trong `kids-text.ts`, VD "Không nhìn chữ mà vẫn nghe ra từ cat."). Có thể tạo sẵn phần chung
  (VD "Không nhìn chữ mà vẫn nghe ra từ" + ghép từ) nếu muốn.

### 4. Nhóm Blender / tài sản
- Khu trẻ em hiện Ki liên tục (góc màn chơi, sảnh, sticker, nhắc nghỉ). Cần nhất: `poses/{wave,happy,comfort,thinking,celebrate,sleepy,listening}-512.webp`
  và `outfits/<outfitId>-512.webp` (11 bộ trong `content/kids/outfits.ts`). Có file đúng tên là tự thay, không cần sửa code.

### 5. Nhóm nội dung kids / nhóm làm trò
- Tên trò: đặc tả 07 ghi `say-it` / `patrol-story`, nội dung dùng `speak-unlock` / `patrol-adventure` (`KidsGameId`). Động cơ dùng `KidsGameId` của nội dung.
- 48 từ không có ảnh (`image: ''`) chỉ thuộc được qua trò chữ (Xếp chữ, Ghép câu…). Bộ sticker của chủ đề tính CẢ các từ này → chủ đề có từ không ảnh
  chỉ đủ bộ (mở trang phục) khi các trò chữ đã chạy.

### 6. Ghi chú chạy thử
- Cổng trình duyệt 9322 được giao cho nhóm này đang bị 1 `static-server.mjs` của nhóm khác chiếm → kids-zone dùng 9326 (Vite 5179).
- (Đã xong — nhóm nền móng đã cho `vite.config.ts` bỏ theo dõi `docs/research/` …) Vite trước đó rất chậm vì theo dõi hồ sơ trình duyệt của mọi nhóm.

---

## Nhóm SKILL-LISTENING-READING (`src/features/skill-listening/`, `skill-reading/`, `exam-ui/`) → lesson-player, nền móng, sổ câu sai, ôn tập, phòng thi, chat

Đã xong: trình Nghe + trình Đọc (đăng ký qua `register-skill-tasks.ts`, `layout: 'full'`), bộ khung thi dùng chung `src/features/exam-ui/`
(hướng dẫn: **`docs/redesign-v3/10-EXAM-UI.md`**), route luyện riêng `/listening/:lessonId` + `/reading/:lessonId` (1 dòng `{listeningReadingRoutes()}` trong App.tsx).

### 1. Lesson-player — đã chạy được trong trình học (đã thử `?devTask=1`)
- Player tự vẽ "dải task" (tên bài · đồng hồ · Ghi chú · Aa) + thanh câu hỏi dưới đáy, KHÔNG có nút thoát thứ 2.
- Để 2 cột cuộn riêng, `exam-ui/ExamFrame.css` dùng `:has(.xf--embedded)` cho `.focus-layout`, `.focus-layout__content` và lớp bọc
  `.lp-content` (cao = màn hình, bỏ padding) — chỉ khi task đang hiện. Nếu các bạn muốn tự làm trong FocusLayout (VD `width="full"` thì padding 0,
  chiều cao 100dvh) thì báo, mình xoá đoạn CSS đó.
- `onComplete` gọi khi người học bấm "Tiếp tục" ở màn xem lại (đã nộp + đã xem chữa); `correct/total` = LẦN NỘP ĐẦU (làm lại câu sai không tính lại),
  `band` chỉ có với chặng IELTS level-2/3, `summary` "Bạn trả lời đúng 5/10 câu đọc hiểu", `minutes` = thời gian làm thật.
- **Khác hợp đồng 1 chút:** `recordAnswer(skill, đúng, undefined, mistake)` — KHÔNG truyền `question.id` làm itemKey, vì thẻ `item:<id>` chỉ tra được
  bài tập (`findExercise`); câu task sẽ thành thẻ "mồ côi" (review-queue bỏ qua nhưng vẫn tính vào nợ ôn). Sổ câu sai vẫn có đủ chữ + `parentId` = id bài.

### 2. Nhóm nền móng dữ liệu (`progress-store`)
- **Cần hành động lưu từ tra nhanh** (bấm từ trong bài đọc → "Lưu vào sổ từ"):
  `saveWordToNotebook({ word, meaningVi: string | null, wordId?: string, context: string, lessonId: string, savedAt: string })`.
  Gợi ý: có `wordId` → tạo thẻ `word:<id>` (thẻ mới, không chấm); không có → lưu vào danh sách `lookups` (≤ 300) để Sổ từ hiện "Từ tra nhanh" / tra sau.
  Player đã tự gọi hàm này nếu kho có (`useProgress().saveWordToNotebook?.(…)`); trong lúc chờ đang lưu tạm `localStorage['ielts-saved-words-<userId>']`
  (mảng cùng dạng trên) — khi có hàm thật, nhóm nền móng có thể đọc mảng này 1 lần để chuyển vào tiến độ.
- (Không gấp) thẻ `item:` cho câu thi/task: nếu muốn câu sai Nghe/Đọc vào hàng ôn FSRS, cần review-queue tra được câu task (xem mục 3).

### 3. Nhóm Sổ câu sai / Ôn tập (`mistakes-notebook`, `vocabulary-review`)
- Lỗi từ trình Nghe/Đọc: `source: 'lesson'`, `itemId` = id câu hỏi task (VD `l3-i-read-12-01-q03`), `parentId` = id bài, `question` = "Q3. …",
  `context` = đoạn văn (Reading, có nhãn [B]) hoặc lời thoại đoạn nghe (Listening). `findExercise(itemId)` sẽ KHÔNG thấy.
- Tra ngược: `import { loadSkillTaskQuestion } from '../exam-ui'` → `{ question (ExamQuestion), context, skill, openUrl: '/reading/<id>' }`
  — làm lại bằng `retryQuestionFromExamQuestion` của các bạn, nút "Mở lại bài" = `openUrl`.
- Từ "Lưu vào sổ từ": tạm ở `localStorage['ielts-saved-words-<userId>']` (xem mục 2) nếu Sổ từ muốn hiện ngay.

### 4. Nhóm Phòng thi (`exam-room`)
- Dùng lại: `ExamFrame` (variant `standalone` có nút thoát), `SplitPane`, `QuestionNavigator`, `ExamQuestionList` + `buildQuestionGroups`,
  `HighlightNotesLayer` (tô vàng/ghi chú), `ExamDisplaySettings` (3 chế độ tương phản + cỡ chữ), `CalmExamTimer`, `ReviewBeforeSubmit`,
  `EvidenceStrip` + `findEvidence`, `TaskResultSummary`. Mục 5 của 10-EXAM-UI.md có cách ghép cho đề nhiều Part.
- `buildQuestionGroups` đã xử lý matching có nhãn "i. …" (không xáo, không thêm chữ cái) — đúng gợi ý ở mục "Bài xếp lớp" phía trên.

### 5. Nhóm chat (`src/chat/ChatWidget.tsx`)
- Bong bóng chat nổi che nút "Nộp bài" ở góc phải dưới. Đề nghị thêm `'/listening/'`, `'/reading/'` vào `HIDDEN_ON`.
  Tạm thời `exam-ui/ExamFrame.css` ẩn `.chat-fab`/`.chat-widget` khi khung thi đang hiện (`body:has(.xf)`).

### 6. Nhóm hệ thiết kế (không gấp)
- Icon cần thêm: `pencil`/`note` (ghi chú — đang tự vẽ `NoteIcon` trong ExamFrame), `headphones`, `bookmark` (cờ xem lại).
- Ghi chú chạy thử: nhiều Vite cùng dùng `node_modules/.vite` từng làm mọi Vite treo khi tối ưu deps; nhóm này chạy Vite bằng config riêng
  có `cacheDir` riêng (`node_modules/.vite-skill-lr`) — nhóm khác gặp treo có thể làm tương tự.

---

## Nhóm Ôn từ + Sổ câu sai + Bảng tiến độ (`vocabulary-review`, `mistakes-notebook`, `progress-dashboard`) → gửi các nhóm

Đã gắn route trong `App.tsx`: `/review`, `/words` (vocabularyReviewRoutes), `/mistakes` (mistakesNotebookRoutes), `/progress` (progressDashboardRoutes).
Link mở thẳng dùng được từ nơi khác: `/review?start=1` (mở phiên ôn ngay), `navigate('/review', { state: { onlyKeys: ['word:x'] } })`,
`/mistakes?practice=1` (mở lượt "Ôn lại câu sai"), `/words?level=1..5` (lọc theo cấp nhớ).

### 1. Nhóm nền móng dữ liệu (`progress-types` / `progress-store`) — không gấp
- **`profile.targetBand?: number`** (mục tiêu riêng, VD 5.5 / 6.5 / 7.0). Bảng tiến độ đã đọc trường này nếu có (`targetBandOf()` trong
  `progress-dashboard/dashboard-stats.ts`), chưa có thì dùng 6.5. Trang cài đặt / onboarding có thể cho chọn.
- **Phân biệt "đã hiểu" và "đã sửa"**: hiện cả 2 đều là `mistake.resolved = true` → "lỗi đã sửa" đang đếm cả câu bấm "Đã hiểu".
  Nếu muốn chặt hơn (D8 luật 35: chỉ tính khi làm lại đúng), thêm `MistakeEntry.fixedAt?: string` do `recordAnswer(đúng)` của câu đó đặt.
- Dữ liệu không lưu ngày dùng "bảo vệ chuỗi" → lịch học đang SUY RA (`inferFreezeDays`). Nếu `streak` lưu thêm `freezeDates: string[]` thì lịch chính xác 100%.
- Nếu `content-lookup.ts` (findWord / findExercise / findLesson) chuyển sang tải bài bất đồng bộ (lesson-loader), 3 trang của nhóm này cần cập nhật
  (đang gọi đồng bộ trong `review-queue.ts`, `word-entries.ts`, `mistake-lookup.ts`) — báo trước giúp nhé.

### 2. Nhóm hệ thiết kế (không gấp)
- Màu 5 kỹ năng (`--skill-*`) chạy `validate_palette.js` (dataviz): **Viết ↔ Nói khó phân biệt với người mù màu đỏ-lục** (ΔE ≈ 4) và
  Nghe ↔ Đọc ở chế độ tối < 15. Các biểu đồ của nhóm này luôn kèm icon + tên kỹ năng nên không phụ thuộc màu, nhưng biểu đồ nhiều kỹ năng trên
  CÙNG 1 trục ở nơi khác sẽ bị nhầm. Gợi ý: đậm/nhạt khác nhau rõ hơn giữa writing (hồng) và speaking (ngọc).
- Thang màu dữ liệu nhóm tự khai báo (đã kiểm `--ordinal` sáng + tối): `--memory-1..5` (chàm, `vocabulary-review/shared/review-shared.css`),
  `--heat-0..4`, `--freeze` (cam, `progress-dashboard/progress-dashboard.css`). Nếu muốn đưa lên `tokens.css` dùng chung thì cứ chuyển.
- Phiên ôn / lượt sửa lỗi là lớp phủ toàn màn hình mở NGAY TRONG trang (`vocabulary-review/shared/FocusOverlay.tsx`, cùng kiểu thanh trên với
  `FocusLayout`) vì phải giữ trạng thái trang phía sau; nếu `FocusLayout` có biến thể `overlay` thì nhóm này sẽ chuyển sang dùng.
- Icon cần thêm: `search` (ô tìm sổ từ — đang tự vẽ trong `WordsPage.tsx`).

### 3. Nhóm lộ trình / cột phải (`learning-path`, `right-rail`)
- Widget "Thời điểm vàng" ở cột phải có thể dùng lại: `countByMemoryLevel`, `nextDueAt`, `dueForecast` (`vocabulary-review/memory-levels.ts`),
  `MemoryLevelColumns` (`vocabulary-review/shared/MemoryLevelColumns.tsx`), `buildReviewQueue` + `estimateSessionMinutes`
  (`vocabulary-review/review-session/review-queue.ts`) để ghi "12 thẻ ≈ 3 phút"; nút "Ôn ngay" → `/review?start=1`.
- `/progress` chưa có mục riêng trong menu (đang sáng mục "Học"): đề nghị đặt 1 link "Xem tiến độ" ở trang `/learn` hoặc thẻ chuỗi ngày cột phải.

### 4. Nhóm trình bài học (`lesson-player`) — để sổ câu sai nhóm đúng
- `recordAnswer(..., mistake)` nên điền `question` bằng chữ câu hỏi đầy đủ (như `checkExerciseAnswer().questionText`) — sổ hiện đúng chữ này.
- Lỗi từ task Nghe/Đọc đã được sổ nhận ra qua `findQuestionInLesson` (exam-ui) → làm lại được, câu nghe phát lại lời thoại.

---

## Nhóm KIDS GAMES 2–5 (`games/memory-match`, `games/spell-it`, `games/balloon-pop`, `games/sentence-builder`) → nhóm kids-zone (động cơ), audio, QA

Đã làm: 4 trò chơi được (sảnh tự nhận qua `game-definition.ts`, không sửa file chung). Xem thử: `/kids-preview/play/<id>?scenario=default|fresh`.

### 1. Nhóm kids-zone — động cơ trò chơi (`game-engine/`)
- **Lượt rỗng bị kẹt (lỗi, ảnh hưởng MỌI trò kể cả listen-tap)**: bé mới (`scenario=fresh`) + sổ hôm nay đã đủ 8 từ mới (`kids-zone:day-log`
  `newWords: 8`) → `buildRound` trả **0 câu** → màn chơi trống "0/0", không có gì để bấm ngoài ✕. Cách lặp lại: chơi 3 lượt `?scenario=fresh`
  rồi mở lại. Đề xuất: `GameRoundShell` thấy `plan.items.length === 0` thì hiện màn nhẹ nhàng "Hôm nay đủ từ mới rồi" + nút về sảnh;
  hoặc cho bé chưa có từ nào luyện lại từ đã gặp hôm nay.
- **`KidsGameDefinition.wordFilter?`**: `round-builder` đã có `wordFilter` nhưng định nghĩa trò / `GameRoundShell` chưa truyền xuống.
  Ghép câu cần lọc "từ có câu" (8 từ không có câu ví dụ lẫn mẫu câu: tuesday, wednesday, thursday, baseball, hockey, golf, bank, airport —
  hiện trò dùng câu dự phòng "Today is Tuesday." / "I like golf." / "This is the bank.", xem `sentence-builder/sentence-pick.ts`).
  Xếp chữ có thể muốn bỏ từ > 12 chữ cái. Khi có trường này, 2 trò sẽ khai báo.
- **Lời khen riêng từng trò không bao giờ được chọn**: `praise-picker.ts` `CONDITIONS` chưa có các câu `gameId` riêng: p04 (spell-it),
  p07 / p14 / r04 (sentence-builder), p12 / r07 (memory-match), r08 (balloon-pop). Gợi ý điều kiện: p04 = spell-it và `wrongCount 0`;
  p12 = memory-match và `wrongCount 0`; r08 = balloon-pop và `wrongCount 0`; p14 = sentence-builder và `wrongCount 0` + `responseMs > 4000`;
  r04 / r07 cần thêm dữ kiện (số khối của câu / số lần lật cả bàn) → có thể thêm `CompleteItemInput.praiseHints?: Record<string, number>`.
- **`answer-options.ts` loại trùng theo `image`** → với trò chữ (`needsPicture: false`, VD Bóng bay) các từ `image: ''` bị coi là "cùng ảnh":
  tối đa 1 đáp án nhiễu không ảnh, và từ đích không ảnh thì không có đáp án nhiễu không ảnh nào. Đề xuất chỉ so ảnh khi cả 2 ảnh khác rỗng.
- (không gấp) `RoundSession` cho đọc `queue: readonly RoundItem[]`: Lật thẻ phải giữ 1 bản sao hàng câu (nối câu "xem đáp án" vào cuối y hệt
  động cơ) để gom câu thành bàn — có `queue` thì bỏ được bản sao này (`memory-match/MemoryMatchGame.tsx`).
- (không gấp) `useGameKeys` chỉ có phím 1–4: Bóng bay cần 1–5, Ghép câu 1–9/0, Xếp chữ gõ chữ cái → 3 trò tự viết bộ phím. Có thể thêm `maxChoice`.
- (không gấp) Lật thẻ gom các câu LIỀN NHAU, 1 bàn không có 2 cặp cùng từ → vì từ mới "gặp lại cách ≥ 3 câu", bàn thường 4–5 cặp thay vì 6–8.
  Nếu muốn bàn to hơn: cho trò khai `minRepeatGap` (VD Lật thẻ = 6).

### 2. Nhóm audio (không gấp)
- Ghép câu: bấm vào khối trong câu đã ghép để nghe từng từ → các từ chức năng (the, is, on, can't…) chưa có mp3 → giọng máy đọc.
  Nếu tiện: tạo `kids-word` cho ~80 từ trong `KIDS_SENTENCES` chưa có file.

### 3. Nhóm QA — đánh dấu tự động hoá (chỉ khi `npm run dev`)
| Trò | Bấm vào | Nút Tiếp |
|---|---|---|
| spell-it | `.sp-tile[data-answer]` = ô chữ cái cần bấm tiếp theo (bấm lặp tới đủ từ) | `.sp-next__btn` |
| sentence-builder | `.sb-block[data-answer]` = khối cần bấm tiếp theo | `.sb-next__btn` |
| balloon-pop | `.bp-balloon[data-answer]` = bóng đúng (bóng đang bay → dùng `el.click()` hoặc `force`) | `.bp-next__btn` |
| memory-match | `.mm-card[data-answer]` = các thẻ ÚP của 1 cặp chưa ghép (bấm 2 lần = ghép 1 cặp; bậc 3 thì là 2 thẻ đang ngửa) | `.mm-next__btn` (cuối bàn) |

Thẻ giới thiệu từ mới: `.kz-intro__skip`. Phím: Xếp chữ **không** dùng R để nghe lại (R là chữ cái bé gõ) → nghe lại = phím cách.

---

## Điều phối viên (29/10 sáng) → kids games 2–8, QA

- ĐÃ SỬA lỗi "lượt trống 0/0" (yêu cầu đầu tiên của nhóm KIDS GAMES 2–5): `round-builder.ts` mục 3b — khi không có từ mới (hết trần 8 từ/ngày),
  không có từ đến hạn và không có từ luyện thêm, lượt vẫn lấy 3 từ mới (trần là luật mềm); hết từ mới thì luyện lại cả từ đã thuộc.
  Đã thử: bé mới + `newWordsLeftToday: 0` → 8 câu, 3 từ mới.
- Nguyên nhân gốc vẫn còn: sổ ngày `kids-day-log.ts` dùng 1 khoá localStorage chung cho mọi bé trên cùng máy. Nên chuyển sang đếm từ tiến độ
  thật (`KidsWordState.firstSeen`) như nhóm kids-zone đã đề xuất.

---

## Nhóm KIDS GAMES 6–8 (`games/colour-command`, `games/speak-unlock`, `games/patrol-adventure`) → nhóm kids-zone (động cơ), audio, hệ thiết kế, QA

Đã xong 3 trò (tự hiện ở sảnh qua `game-definition.ts`, chơi tới màn "Túi đồ từ vựng" được): **Nghe lệnh tô màu**, **Nói để mở khoá**
(đặc tả gọi `say-it`), **Phiêu lưu cùng Ki** (đặc tả gọi `patrol-story`). Không sửa file chung nào.

### 1. Nhóm kids-zone (động cơ) — theo thứ tự cần
- **Cho trò tự xếp lượt: `KidsGameDefinition.buildPlan?(ctx) => RoundPlan`** (GameRoundShell dùng nó thay `buildRound` nếu có).
  Phiêu lưu: 1 lượt = 1 chương (5 cảnh, từ của cảnh = `question.wordId`). Hiện trò phải tự chạy `useRoundSession(kế hoạch chương)` lồng bên trong,
  tự vẽ phần cuối lượt (`patrol-adventure/StoryRoundEnd.tsx` = bản sao phần cuối `RoundRunner`) và dùng `useLayoutEffect` gọi
  `shellSession.finishIntro()` để thẻ giới thiệu từ mới của lượt "theo từ" (không dùng tới) không phủ lên truyện — với bé mới tinh,
  thẻ đó vẫn kịp kêu 1 tiếng "pop". Có `buildPlan` thì xoá được cả 2 chỗ.
- **Truyền `wordFilter` của trò vào `buildRound`** (round-builder đã hỗ trợ, chỉ thiếu ô trong `KidsGameDefinition` + `KidsPlayPage`/`GameRoundShell`).
  Tô màu muốn `(w) => w.tags?.includes('colorable') || w.tags?.includes('color')`. Hiện chủ đề Hành động / Cơ thể vẫn vào lượt tô màu →
  trò dùng câu dự phòng `Find "swim". Colour it red.` (đúng ngữ pháp nhưng kém tự nhiên hơn "Colour the cat red.").
- **`session.skipItem()` chính thức**: nút "Bỏ qua" của trò Nói gọi `session.advance()` mà KHÔNG gọi `completeItem()` → không sao, không đổi hộp
  Leitner (luật 31: bỏ qua không bị phạt). Chạy đúng với code hiện tại; có hàm riêng thì đổi động cơ sau này không lỡ làm hỏng.
- **`praise-picker.ts` thiếu điều kiện cho câu khen riêng của trò** (`CONDITIONS` không có `kids-vl-praise-p09`, `p10` — speak-unlock;
  `p15`, `r05` — colour-command; `r09` — patrol-adventure) → các câu này không bao giờ được chọn. Gợi ý: p09/p10/r05 = `wrongCount === 0`
  + đúng `gameId`; p15 = colour-command + `wrongCount === 0` + `!usedReplay`; r09 cần biết "câu cuối chương" (thêm cờ vào `CompleteItemInput`).
- (không gấp) `useGameKeys` chỉ có 1–4: tô màu cần 1–8 cho lọ sơn → tự viết. +1 cho đề xuất `maxChoice` của nhóm 2–5.
- (không gấp) `kids-data-context` chưa có hành động lưu chương truyện → Phiêu lưu gọi thẳng `useProgress().kidsSetStoryChapter` khi không phải
  xem thử (`kids.storyChapter` = số chương đã xong, chương mở theo thứ tự). Nếu muốn mọi thứ đi qua `useKidsData()`, thêm `setStoryChapter`.

### 2. Nhóm audio (không gấp)
- Lệnh tô màu **ghép từ mẫu** chưa có mp3 (script chỉ tạo mẫu `kidsColourCommand` khi KHÔNG có danh sách lệnh riêng; giờ đã có 30 lệnh riêng)
  → đọc bằng giọng máy. Nếu tiện: tạo thêm `Colour the {thing} {colour}.` cho (từ 'colorable' × 10 màu, bỏ white) ≈ 1100 câu,
  và nếu được cả `Colour the big|small {thing} {colour}.` (độ khó 3). 30 lệnh soạn sẵn + lời kể / câu hỏi truyện đã có file, chạy tốt.

### 3. Nhóm hệ thiết kế (không gấp)
- Icon **`mic`** chưa có → `SpeakUnlockGame.tsx` tự vẽ `MicGlyph`.

### 4. Nhóm QA — tự động hoá (chỉ khi `npm run dev`)
| Trò | Bấm vào | Nút Tiếp | Tham số địa chỉ (chỉ dev) |
|---|---|---|---|
| colour-command | `.cc-pot[data-answer]` (lọ sơn đúng) rồi `button.cc-thing[data-answer]:not(:disabled)` (lệnh "both / all" có nhiều vật) | `.cc-next__btn` | `?command=kids-colour-07` ép 1 lệnh soạn sẵn, `?command=all` câu thứ n = lệnh thứ n |
| speak-unlock | `.su-mic` (dùng kèm `?speech=right`) · tự so sánh: "Giống" = `[data-answer]` · bỏ qua `.su-skip` | `.su-next__btn` | `?speech=off` (trình duyệt không hỗ trợ) · `blocked` (micro bị chặn) · `right` / `wrong` (giả máy nghe) |
| patrol-adventure | bản đồ `.pa-start-btn` · bỏ qua lời kể `.pa-skip` · `.pa-option[data-answer]` | `.pa-next__btn` · huy hiệu `.pa-badge-next` | — |
Trình duyệt headless không có micro: không tham số thì `.su-mic` nghe 7 giây rồi coi là im lặng (2 lần → tự so sánh); bấm "Ghi giọng bạn" → micro bị chặn → chế độ "nói to theo mẫu".

### 5. Ghi chú kỹ thuật
- **Không dùng nhận diện giọng ngay trên máy** (`processLocally`): gọi `SpeechRecognition.available()` làm **treo hẳn trang** trên Chrome 141 headless
  → quá rủi ro. Đang dùng Web Speech API thường (Chrome gửi âm thanh lên máy chủ Google) — liên quan câu hỏi #6 trong `docs/research/OPEN-QUESTIONS.md`.
  Micro chỉ được xin khi bé bấm nút; bản ghi tự nghe lại chỉ nằm trong bộ nhớ (`blob:`), rời câu là xoá.
- `services/speech-recognition.ts` (người lớn) để `maxAlternatives = 3`, `en-US` → trò Nói có bản riêng `speak-unlock/speech-recognizer.ts`
  (6 phương án, en-GB, phân loại lỗi, hẹn giờ dự phòng). Nếu muốn gộp: cho hàm chung nhận `{ lang, maxAlternatives }`.
- Công cụ trình duyệt chung (`(công cụ trình duyệt research — đã xoá 29/10)`) chưa đổi được kích thước / chế độ tối → nhóm dùng bản riêng có thêm
  `viewport`, `scheme`, `motion` (scratchpad `kg68-browser.mjs`). Vite riêng có `cacheDir` riêng: `node_modules/.cache/vite-kg68/vite.config.mjs`.
- ĐÃ LÀM `wordFilter` (cả nhóm trò 2–5 và 6–8 cùng xin): `KidsGameDefinition.wordFilter?` → `KidsPlayPage` → `GameRoundShell` → `buildRound`.
  Chủ đề không còn từ nào qua bộ lọc → `buildRound` tự đổi sang chủ đề đầu tiên có từ hợp. Trò Tô màu đã dùng: chỉ từ có nhãn
  `colorable` hoặc `color` (đã thử chủ đề `family`, `actions` → tự đổi sang `animals`, mọi câu đều qua bộ lọc).

---

## Nhóm PHÒNG THI (`src/features/exam-room/`, route `/exams`, `/exam/:id`, `/exam-result/:id` (+ `/review`), `/lesson/:id/mini-test`) → exam-ui, skill-writing/speaking, nền móng, lesson-player

Đã gắn route bằng 2 dòng trong `App.tsx`: `{examRoomShellRoutes()}` (trong AppShellRoute) + `{examRoomFocusRoutes()}` (toàn màn hình).
Trang cũ `src/pages/ExamsPage.tsx`, `ExamRunnerPage.tsx`, `ExamResultPage.tsx` KHÔNG còn route nào dùng (giữ làm tham khảo — nhóm nền móng xoá
khi muốn; `features/playground/styles/exams.css` chỉ trang cũ dùng). `App.tsx` bỏ import `ComingSoonPage` (không còn route nào trỏ tới).
Kết quả cũ (đề `level-1-test`, `placement-test`… và kết quả kiểu cũ không có `answers`) vẫn mở + xem lại được (`exam-result-model.ts`).
Tài khoản test: `qa_exam_1` (tên đăng nhập không nhận dấu `-`).

### 1. Nhóm exam-ui (`src/features/exam-ui/`) — không gấp, phòng thi đã tự vá trong thư mục mình
- `splitInstructions` bỏ sót tiêu đề nhóm khi (a) có dòng "ô dù" ở đầu: `"Questions 1–13. Questions 1–5: …"` (regex nuốt dấu chấm sau "1–13"
  nên "Questions 1–5" không có ký tự `[\n.:;]` đứng trước), (b) tiêu đề đứng sau dấu `?`: `"…following information? Questions 19–22: …"`.
  Hậu quả: nhóm 1–5 hiện tiêu đề "Questions 1–13"; nhóm 19–22 mất tiêu đề và bị xếp SAU nhóm 23–26 (đề thi thử 1, Passage 2).
  Phòng thi đang tiền xử lý bằng `cleanInstructions()` (`exam-room/exam-part-content.ts`) — sửa trong `question-grouping.ts` thì mình bỏ hàm đó.
- `.xf` là grid 1 cột `auto`: thanh câu hỏi dài (40 số + Part thu gọn) làm cả khung standalone tràn ngang ở màn ≤ 1300px. Phòng thi thêm
  `.xf.xr-frame { grid-template-columns: minmax(0, 1fr) }` — đề nghị đưa dòng này vào `ExamFrame.css` cho mọi khung.

### 2. Nhóm skill-writing / skill-speaking — không gấp
- `AiResultView`: đề thi không có bài mẫu theo band → mốc "bài mẫu" trên thước là sai nghĩa. Phòng thi đang ẩn bằng CSS
  (`.xr-ai .band-range__sample`, mục chú thích cuối) và truyền `bands` quanh kết quả. Đề nghị: `bands={[]}` = ẩn mốc + chú thích.
- `MicGate`: (a) dòng riêng tư ghi "Chỉ gửi tới AI khi bạn bấm 'Chấm bằng AI'" — ở phòng thi AI chấm tự động sau khi nộp cả đề → xin prop
  `privacyNote?: string`; (b) phòng thi không dùng mascot (04-DESIGN-SYSTEM mục 13) → xin prop `hideMascot?`.
- Phòng thi import trực tiếp `WritingEditor`, `TaskChart`, `feedback/AiResultView`, `MicGate`, `SpeakingRecorder`, `use-microphone` và CSS
  `WritingTaskPlayer.css`, `SpeakingTaskPlayer.css`, `feedback/feedback.css` — đổi tên/props thì báo giúp.

### 3. Nhóm nền móng / backend
- **(nên có)** `PATCH /api/exam-results?id=` (hoặc `PUT`) để cập nhật kết quả đã lưu: khi AI lỗi lúc nộp, người học "Xem kết quả luôn" thì
  hiện chưa chấm lại được Writing từ trang kết quả (bài viết đã lưu trong `result.answers`, chỉ thiếu chỗ ghi lại). Có API thì mình thêm nút
  "Chấm lại bằng AI" ở trang kết quả.
- `/api/exam-results` giới hạn 300 KB: kết quả cũ lưu `context` = cả bài đọc cho từng câu → đề thi thử đủ 80 câu sẽ VƯỢT (trang thi cũ sẽ rơi
  vào "kết quả tạm trong máy"). Phòng thi mới đã bỏ `context` khỏi `questionReviews` (đề còn trong ALL_EXAMS nên tra lại được) — chỉ để biết.
- Câu sai đề thi vào sổ lỗi qua `recordAnswer(skill, false, undefined, mistake)` (không tạo thẻ `item:` vì `findExercise` không tra được câu đề
  thi — giống nhóm Nghe/Đọc). `context` = đoạn văn / 3 dòng thoại chứa đáp án (≤ 1.200 ký tự), không phải cả bài.
- Nháp Writing của phòng thi dùng `saveDraft('exam:<examId>:<taskId>', text)` (đổi máy vẫn còn), xoá khi nộp xong.
- Phiên làm dở của đề thi lưu `localStorage['ielts-exam-room:<userId>:<examId>']` (đúng 10-EXAM-UI mục 5: đề thi không dùng `progress.resume`).

### 4. Nhóm lesson-player / learning-path — cần 1 lối vào mini-test
- Trang mini-test `/lesson/:lessonId/mini-test` đã chạy (5 tim, sao, Hồi tim, ghi `recordMiniTestAttempt` + XP + chuối) nhưng **chưa có nút nào
  dẫn tới**. Đề nghị: màn kết quả bài học (`parts/LessonResults.tsx`) hoặc popover bài trên lộ trình thêm nút phụ "Làm mini-test (5 tim)" khi
  `lesson.miniTest.length > 0` (100 bài cũ Level 1–2). Bài v3 `miniTest: []` vào link này sẽ tự quay về `/lesson/:id`, bài không tồn tại → `/learn`.
- Mini-test dùng lại `ExerciseView`, `checkExerciseAnswer`, `FeedbackSheet`, `BottomBar`/`CheckButton`, `passageOf`/`skillOfExercise`,
  `replayCurrentAudio` + `lesson-player.css` (theo mục 4 phần LESSON-PLAYER ở trên) — đổi tên thì báo giúp.

### 5. Ghi chú chạy thử
- Gemini key trong `.dev.vars` local đang báo "GEMINI_API_KEY không hợp lệ" → Writing/Speaking không chấm được ở máy dev; đã thử luồng
  "AI lỗi → Thử chấm lại / Xem kết quả luôn" (phần đó hiện "Chưa có band", không mất bài làm).
- Trình duyệt test riêng có thêm `viewport`, `media` (sáng/tối) và micro giả (`--use-fake-device-for-media-stream`) để thử ghi âm Speaking:
  scratchpad `exam-room/exam-room-browser.mjs`. Vite riêng: `node_modules/.cache/vite.exam-room.config.ts` (cacheDir `.vite-exam-room`).

---

## Nhóm Blender mascot (`art-blender/`, `public/mascot/`) → gửi nhóm hệ thiết kế / nền móng

Đã giao ảnh mascot Corgi "Ki" (concept C, đồng phục xanh ô-liu) đúng hợp đồng `01-ARCHITECTURE.md` mục 6:

- `public/mascot/poses/<pose>-256.webp | -512.webp | -1024.webp` cho cả 13 pose: `salute`, `happy`, `wave`,
  `comfort`, `thinking`, `celebrate`, `sleepy`, `listening`, `thumbs-up`, `surprised`, `reading`, `writing`, `speaking`.
- `public/mascot/head/head-32.png | -64 | -128 | -192 | -512`.

`<Mascot>` và `<KidsMascot>` đã tự dùng các file này (đúng tên), **không cần sửa code**. Một số điều cần biết:

1. **Khung ảnh cố định cho mọi pose** (cùng camera, cùng tỉ lệ). Đổi pose không làm mascot to/nhỏ đột ngột.
   - Nhân vật chiếm ~80% chiều cao ảnh, chân ở ~7% từ đáy.
   - Cằm nằm ở ~55% tính từ mép trên, nên `placement="peek-top"` (lộ 62%) thấy trọn đầu + mũ và một chút vai.
   - Có bóng tròn mềm, bán trong suốt dưới chân, không chạm mép ảnh, đặt trên nền sáng hay tối đều ổn.
   - Một số pose có đồ vật bay quanh trong khung (dấu ?, chữ Z, nốt nhạc, hoa giấy).
2. **Favicon (đề nghị, không gấp):** `index.html` đang dùng `/favicon.svg`. Nếu muốn dùng đầu Ki:
   ```html
   <link rel="icon" type="image/png" sizes="32x32" href="/mascot/head/head-32.png" />
   <link rel="apple-touch-icon" href="/mascot/head/head-192.png" />
   ```
   Giữ `favicon.svg` làm dự phòng. Nếu có `manifest.webmanifest` thì thêm icon `head-192.png` và `head-512.png`.
   Chủ nhà chưa quyết (`docs/research/OPEN-QUESTIONS.md` dòng 19).
3. **Dung lượng:** ảnh 512 px mỗi pose < 80 KB (WebP), 256 px < 28 KB. `Mascot.tsx` đã chọn file theo `srcSet`, rất hợp.
4. **Chưa có** (để sau): `mascot.glb` + hoạt cảnh, `turnaround/`, `outfits/`, `stickers/`, `anim/*.webm`.
   `MascotModel` vẫn hiện ảnh `salute` làm poster như đang thiết kế.
5. Nếu chủ nhà chọn concept khác (A/B) hoặc đồng phục CSGT, nhóm Blender chỉ render lại. **Tên file giữ nguyên**, web không phải sửa gì.

---

## Nhóm grammar + gap-fill (29/10) → gửi nhóm learning-flow / XP theo track / lesson-player

Khu **Ngữ pháp** mới: `/grammar`, `/grammar/:topicId` (`src/features/grammar/`), mục menu "Ngữ pháp" (`nav-items.ts`, icon `grammar`, chữ `navGrammar`).
Bài ngữ pháp chạy bằng trình học chung `/lesson/:id`. Đối chiếu nội dung: `docs/redesign-v3/11-CONTENT-GAPS.md`.

1. **XP theo track:** 19 bài `gr-…` có `category: 'grammar'` và `track: 'general'` (trường mới, tuỳ chọn, trong `Lesson` — `content-types.ts`).
   Các bài này **không nằm trong chặng nào**, nên `lessonEarnsXp()` hiện tại: tab general → có XP, tab ielts → không. Nếu chủ nhà muốn
   "bài ngữ pháp luôn tính là tổng quát" kể cả khi đang ở tab IELTS, đọc `lesson.track === 'general'` (cần bài đã tải) hoặc dựa vào tiền tố id `gr-`
   (`isGrammarOnlyLesson(id)` trong `src/content/grammar/grammar-topics.ts` — file nhẹ, import được ở trang chính).
2. **Màn kết quả của bài ngữ pháp** (lesson-player): "Bài tiếp" đang lấy bài kế trên lộ trình. Đề nghị: bài `category === 'grammar'` thì nút phụ / "Dừng ở đây"
   quay về `/grammar/<topicId>` (tra topic chứa bài: `GRAMMAR_TOPICS.find(t => t.lessonIds.includes(id))`), và nút Thoát (Esc) cũng về đó.
3. **Chặng mới / bài gắn thêm (track general):** `u2-g05-people-places` (Level 2, order 24, 4 bài) và `u3-g06-our-world` (Level 3, order 11, 5 bài);
   gắn thêm vào cuối `u3-g03-news` (+l3-g-u3-crime), `u3-g04-media` (+l3-g-u4-culture), `u3-g05-daily-life` (+l3-g-u5-tech).
   Người đã xong 3 chặng đó sẽ thấy chặng "chưa xong" lại (thêm 1 bài) — cố ý gắn ở CUỐI để không làm lùi "bài tiếp theo".
4. `vite.config.ts`: nhóm cắt file bài học nay nhận cả `src/content/grammar/*-lessons*.ts`. `lesson-sources.ts`: key bài ngữ pháp bắt đầu bằng `../grammar/`.
5. `scripts/validate-content.ts`: không cảnh báo "chưa nằm trong chặng" cho bài `category: 'grammar'`; báo lỗi nếu `grammar-topics.ts` trỏ tới bài không có.

---

## Nhóm "Trò chơi chữ" (29/10/2026) → chủ nhà + nhóm nền móng

- **Migration mới `database/migrations/0004_word_game_scores.sql`** (chỉ THÊM bảng `game_weekly_best` — kỷ lục tuần của từng người, từng trò). Không sửa / xoá dữ liệu cũ.
  Local đã chạy `npm run db:migrate`. **Khi deploy, chủ nhà cần chạy `npm run db:migrate:remote`.** Chưa chạy thì trang vẫn chạy, chỉ phần "tuần này" trống (API bắt lỗi).
- API mới `GET /api/games/board` (functions/api/games/board.ts): kỷ lục mọi lúc + tuần này của cả 5 trò. `POST /api/games/records` nhận thêm `picture-word`, `missing-letters` và ghi kỷ lục tuần.
  Danh sách trò tính điểm: `backend-helpers/word-game-names.ts`. Server local 8788 cần **khởi động lại** để nhận route mới `/api/games/board`.
- 2 trò mới: `/games/picture-word`, `/games/missing-letters` (src/features/word-games/). Hết ván gọi `recordActivity('miniGames')` như trò cũ — nhóm XP quyết định luật track.
- Từ đoán sai mà đang có thẻ ôn `word:<id>` → `reviewSrsCard(key, 'again')` (không tạo thẻ mới cho từ chưa học).
- Gợi ý cho nhóm menu: mục "Sân chơi" có thể đổi tên thành "Trò chơi chữ" cho khớp tiêu đề trang /play.
