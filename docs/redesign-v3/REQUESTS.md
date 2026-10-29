# Yêu cầu gắn kết giữa các nhóm (REQUESTS)

Mỗi nhóm thêm 1 mục riêng bên dưới (không sửa mục của nhóm khác).

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
Trước đây Vite theo dõi cả thư mục dự án nên treo trên file bị khoá (`_research/profiles/*`, `.wrangler/state`…).
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
- (Đã xong — nhóm nền móng đã cho `vite.config.ts` bỏ theo dõi `_research/` …) Vite trước đó rất chậm vì theo dõi hồ sơ trình duyệt của mọi nhóm.

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
