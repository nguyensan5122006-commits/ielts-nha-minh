# 03 — Tầng dữ liệu v3 (tiến độ học, ôn tập, lộ trình, tài khoản)

> Dành cho các nhóm giao diện (learning-path, lesson-player, vocabulary-review, mistakes-notebook,
> progress-dashboard, settings, placement, auth). Đọc file này là dùng được, không cần đọc hết code.
> Hợp đồng gốc: `01-ARCHITECTURE.md` mục 3. Chỗ nào khác hợp đồng đều ghi rõ ở mục 2.
>
> **Cập nhật 29/10/2026 (thu hẹp phạm vi):** đã XOÁ khu trẻ em (`progress.kids`, các hành động `kids…`,
> `kids-word-boxes.ts`), nhóm tuổi (`profile.ageGroup`, `user.ageGroup`, `backend-helpers/age-groups.ts`),
> chuối 🍌 / cửa hàng (`earnBananas`, `applyStreakFreeze` mua ở cửa hàng) và đấu trường. Bản lưu cũ còn
> `kids` / `profile.ageGroup` được `migrateProgress` bỏ đi êm (không lỗi). Nhiệm vụ thưởng **XP** qua
> `claimQuestReward(rewardKey, xp)`.

---

## 0. Tóm tắt 1 phút

```tsx
import { useProgress } from '../../learning-progress/progress-store'
import { findNextLesson, unitsFor, levelProgress } from '../../content/path-selectors'
import { dueCards, srsQueueInfo } from '../../learning-progress/fsrs-scheduler'

const { progress, streak, todayMinutes, completeLessonV3, recordAnswer, saveResume } = useProgress()
const next = findNextLesson(progress)              // nút "Học tiếp" (bài dở trước)
const units = unitsFor(progress.profile.track, progress.currentLevel[progress.profile.track])
const queue = dueCards(progress)                   // thẻ ôn ngay bây giờ
```

- **Mọi thay đổi tiến độ đi qua `useProgress()`**. Không tự sửa `progress` hay ghi localStorage.
- Mỗi hành động lưu **ngay** vào localStorage và gửi máy chủ sau 1,5 giây im lặng (lỗi mạng thì tự thử lại).
- Tiến độ cũ (version 1) **tự được nâng cấp** khi tải — giao diện luôn thấy `version: 2`.

---

## 1. Các file

| File | Vai trò |
|---|---|
| `src/learning-progress/progress-types.ts` | Kiểu `LearningProgress` (= V2), `LearningProgressV1`, `SerializedFsrsCard`, `createEmptyProgress()` |
| `src/learning-progress/progress-store.tsx` | `<ProgressProvider>` + `useProgress()` — đọc tiến độ, gọi hành động, tự lưu |
| `src/learning-progress/progress-updates.ts` | Hàm **thuần** tính tiến độ mới cho từng hành động (store chỉ gọi lại các hàm này) |
| `src/learning-progress/progress-migration.ts` | `migrateProgress(raw)` v1 → v2, `chooseNewerProgress(local, server)` |
| `src/learning-progress/fsrs-scheduler.ts` | Bọc thư viện `ts-fsrs` (FSRS-7): tạo / ôn thẻ, hàng đợi ôn, giới hạn thẻ mới |
| `src/learning-progress/streak-rules.ts` | Chuỗi ngày: freeze tự kiếm, sửa chuỗi 48 giờ, "Tuần này x/7" |
| `src/learning-progress/study-calendar.ts` | Hàm ngày tháng: `todayString`, `addDays`, `daysBetween`, `weekStartDay`, `weekIdOf` |
| `src/learning-progress/activity-stats.ts` | Chỉ số cho huy hiệu (`countWordsLearned`, `newlyEarnedAchievements`) |
| `src/content/all-levels.ts` | `ALL_LEVELS_V3` (3 level, 39 chặng), `findLevelInfo`, `LEVEL_ORDER`, `allUnits` |
| `src/content/lesson-registry.ts` | Mọi bài theo id: `findLessonById`, `allLessons`, `allLessonWords`, `LEGACY_LESSONS` — NẶNG (~2,3 MB), chỉ dùng ở script / trang lazy |
| `src/content/lesson-index.ts` + `lesson-loader.ts` | Mục lục nhẹ (`findLessonSummary`) + tải bài khi cần (`loadLesson`) — xem mục 14 |
| `src/content/path-selectors.ts` | Hỏi đáp về lộ trình: `unitsFor`, `findNextLesson`, `levelProgress`… (mục 6) |
| `src/content/content-lookup.ts` | Tra bài tập / từ / đoạn đọc theo id: `findExercise`, `findWord`, `findPassage`, `findLesson` |
| `src/content/skill-meta.ts` | `SKILL_ORDER`, `SKILL_COLORS`, `SKILL_ICONS` (trước nằm ở `unlock-rules.ts` — đã bỏ) |
| `src/content/legacy-levels.ts` | Đổi 6 level cũ → 3 level mới (chỉ dùng cho dữ liệu cũ) |

Đã **bỏ**: `learning-progress/spaced-repetition.ts` (Leitner cũ), `learning-progress/unlock-rules.ts`, `ALL_LEVELS` / `findLevel` (6 level cũ).
Trang học cũ nằm trong `src/_legacy-v2/` (không build, chỉ để tham khảo).

---

## 2. Dữ liệu `LearningProgress` (version 2)

| Trường | Ý nghĩa |
|---|---|
| `profile` | `{ track, dailyGoalMinutes, studyCue?, studyTime?, voice: 'gb'|'us', theme, srsButtons?: 2|4 }` |
| `currentLevel[track]`, `unlockedLevels[track]` | Level đang học / đã mở theo từng track (`'general' | 'ielts'`) |
| `lessons[lessonId]` | `{ completedAt, bestAccuracy (0..1), attempts }` — có mục này = bài đã xong |
| `miniTests`, `levelTests` | Giữ từ v1 (mini-test có tim; test cuối level đã qua) |
| `resume` | Bài đang dở: `{ lessonId, stepIndex, queue, answers, updatedAt }` hoặc `null` |
| `drafts[taskId]` | Nháp Writing `{ text, updatedAt }` (tối đa 30 nháp) |
| `skillStats[skill]` | `{ answered, correct, recent }` — `recent` = 0/1 của 40 câu gần nhất |
| `bandEstimates[skill]` | `{ low, high, confidence, updatedAt }` |
| `srs[key]` | Thẻ FSRS. key `word:<wordId>` (từ vựng) hoặc `item:<exerciseId>` (câu từng sai) |
| `mistakes` | Sổ lỗi sai (tối đa 300), kiểu `MistakeEntry` như cũ |
| `streak` | `{ current, longest, lastStudyDate, freezes, repairUntil?, repairStreak?, repairLessonsDone? }` |
| `studyDates` | Các ngày có học "YYYY-MM-DD" (giữ ~400 ngày) |
| `minutesByDay`, `xpByDay`, `xpTotal` | Phút học (90 ngày), XP (60 ngày), tổng XP |
| `placement` | `{ level, track, bandLow, bandHigh, takenAt }` hoặc `null` — bài xếp lớp v3: khoảng luôn ±0.5 quanh điểm ước lượng, trần 6.5 |
| `writingLog` | Nhật ký bài viết (200 bài gần nhất) |
| `lifetimeStats`, `questCounters`, `claimedRewards`, `unlockedAchievements`, `rewardedAccountLevel` | Trò chơi hoá — giữ nguyên như cũ |
| `savedAt` | Thời điểm thay đổi cuối (ISO) — kho tự điền, dùng chọn bản mới hơn |

**Khác hợp đồng 01-ARCHITECTURE (đã điều chỉnh, có lý do):**
- Thêm `savedAt` (chống mất dữ liệu khi mất mạng), `studyDates` (tính "Tuần này x/7"), giữ `miniTests` + `levelTests`.
- `streak` thêm `repairStreak`, `repairLessonsDone` (cần để trả lại chuỗi khi sửa thành công).
- `profile.srsButtons` (tuỳ chọn 2/4 nút), `SerializedFsrsCard.addedOn / firstReviewOn` (đếm thẻ mới / ngày).
- Bỏ `dailyGoalXp` (thay bằng `profile.dailyGoalMinutes`).

---

## 3. `useProgress()` — giá trị đọc

| Tên | Kiểu | Ghi chú |
|---|---|---|
| `progress` | `LearningProgress` | Luôn là bản mới nhất |
| `isLoaded` | `boolean` | Đã tải xong (máy chủ trả lời hoặc mất mạng) |
| `saveStatus` | `'saved' \| 'saving' \| 'error'` | `error` = đang chờ thử lại (dữ liệu vẫn an toàn trong máy) |
| `streak` | `StreakSummary` | `{ current, longest, freezes, studiedToday, repairAvailable, repairLessonsLeft, repairUntil, repairStreak, thisWeekDays, totalStudyDays }` |
| `visibleStreak` | `number` | = `streak.current` (giữ cho code cũ) |
| `todayXp`, `todayMinutes` | `number` | Cho vòng mục tiêu ngày (dùng `todayMinutes / progress.profile.dailyGoalMinutes`) |

## 4. `useProgress()` — hành động

### 4.1 Giữ từ bản cũ (các trang trò chơi chữ, Học vui, nhiệm vụ, phòng thi đang dùng)

| Hành động | Ghi chú |
|---|---|
| `addXp(amount)` | Cộng XP + ghi XP bảng xếp hạng. **Không còn tự tăng chuỗi** (chuỗi chỉ tính bài học / phiên ôn / bài thi). Chỉ gọi ở ngữ cảnh track general — mục 15 |
| `recordActivity(metric, amount?)` | Đếm nhiệm vụ / huy hiệu |
| `claimQuestReward(rewardKey, xp)` | Nhận thưởng nhiệm vụ: +XP (ghi cả bảng xếp hạng) + ghi `claimedRewards`; nhận rồi thì bỏ qua |
| `unlockAchievements(ids)`, `setRewardedAccountLevel(level)` | GameWatchers gọi khi mở huy hiệu / báo lên level |
| `recordMistake(mistake)` | Thêm sổ lỗi; câu không phải đề thi còn tạo thẻ `item:` |
| `setMistakeResolved(id, resolved)` | Đánh dấu "đã hiểu" |
| `passLevelTest(levelId, levelOrder, percent)` | Ghi điểm + mở level sau (cả 2 track) + tính ngày học |
| `setPlacementResult(order1to6, estimatedBand)` | Bài xếp lớp **cũ** — tự đổi sang level mới |
| `recordMiniTestAttempt(lessonId, passed, stars)` | Mini-test có tim |
| `completeLesson(lessonId, accuracy, wordIds)` | Bản cũ = `completeLessonV3(..., minutes = 0)` |

### 4.2 Mới (v3)

| Hành động | Khi nào gọi |
|---|---|
| `setProfile(patch)` | Trang cài đặt: mục tiêu phút, giờ học, giọng, theme, `srsButtons`… |
| `setTrack(track)` | Đổi tab General / IELTS |
| `setPlacementV3({ level, track, bandLow, bandHigh })` | Kết quả bài xếp lớp thích ứng — mở khoá tới level đó, đặt làm level hiện tại (không kéo người đang học cao xuống) |
| `startLesson(lessonId, queue)` | Bắt đầu bài **từ đầu** (xoá chỗ dở cũ). Muốn học tiếp chỗ dở: đọc `progress.resume` thay vì gọi hàm này |
| `saveResume({ lessonId, stepIndex, queue, answers })` | **Sau mỗi câu trả lời** — ghi localStorage ngay, máy chủ sau 1,5 giây |
| `clearResume()` | Người học bỏ bài dở |
| `recordAnswer(skill, correct, itemKey?, mistake?)` | Mỗi câu chấm được. `itemKey` = id bài tập/câu hỏi → thẻ `item:<itemKey>`; `mistake` (khi sai) → sổ lỗi |
| `completeLessonV3(lessonId, accuracy, learnedWordIds, minutes)` | Hết bài. Tạo thẻ `word:` (hẹn ôn từ mai), xoá `resume`, +1 ngày học, +phút, tự mở level sau nếu xong cả level. **Không** cộng XP — trang kết quả tự gọi `addXp` |
| `addStudyMinutes(minutes)` | Thời gian học ngoài bài (VD đọc thêm) |
| `markStudyDay()` | Làm xong 1 bài thi (phòng thi đã gọi sẵn) |
| `saveDraft(taskId, text)` | Writing autosave (text rỗng = xoá nháp) |
| `logWriting({ taskId, words, selfBand?, aiLow?, aiHigh? })` | Sau khi nộp bài viết |
| `updateBandEstimate(skill, low, high, confidence)` | Sau khi có band (tự chấm / AI / bài thi) |
| `reviewSrsCard(key, rating)` | Mỗi thẻ ở `/review`. `rating`: `'again' \| 'hard' \| 'good' \| 'easy'` |
| `completeReviewSession(minutes?)` | Hết phiên ôn trọn vẹn → giữ chuỗi ngày |
| `flushSave()` | Gửi ngay (VD bấm `Esc` thoát bài) |

---

## 5. Luồng chuẩn cho trình học (`/lesson/:lessonId`)

1. Mở bài: nếu `progress.resume?.lessonId === lessonId` → khôi phục `stepIndex`, `queue`, `answers`; nếu không → `startLesson(lessonId, queue)`.
2. Mỗi câu: `recordAnswer(lesson.skill, correct, exercise.id, correct ? undefined : { source: 'lesson', itemId: exercise.id, parentId: lesson.id, question, userAnswer, correctAnswer, explanation })` rồi `saveResume({...})`.
3. Hết bài: `completeLessonV3(lesson.id, đúng / tổng, lesson.words?.map(w => w.id) ?? [], phút)` → `addXp(n)` **chỉ khi** `lessonEarnsXp(lesson.id, track)` (mục 15).
4. Nút "Học tiếp" trên màn kết quả: `findNextLesson(progress)` — tính khi **vẽ** màn kết quả (lần render sau completeLessonV3),
   không tính ngay trong cùng hàm xử lý click (biến `progress` trong hàm đó vẫn là bản trước khi cập nhật).
   Mọi hành động đều đọc bản mới nhất bên trong kho, nên gọi nhiều hành động liên tiếp trong 1 hàm vẫn đúng.

---

## 6. Lộ trình — `src/content/path-selectors.ts`

| Hàm | Trả về |
|---|---|
| `unitsFor(track, levelId)` | Các chặng của level theo track (chặng chung + riêng), sắp theo `order` |
| `lessonsOfUnit(unit)` | `LessonSummary[]` (mục lục nhẹ — nội dung đầy đủ: `loadLesson(id)`, mục 14) |
| `pathLessonIds(track, levelId)` | Id bài theo đúng thứ tự đường đi |
| `unitProgress(unit, progress)` | `{ done, total, percent, isComplete, nextLessonId }` |
| `levelProgress(track, levelId, progress)` | `{ done, total, percent, isComplete, unitsDone, unitsTotal, currentUnit, lessonsToNextMilestone, nextMilestone, lessonsToLevelEnd }` — "Còn **N** bài tới mốc" = `lessonsToNextMilestone`; mốc = xong chặng đang học (`kind: 'unit'`), chặng cuối thì `kind: 'level'` |
| `findNextLesson(progress, track?)` | `{ lesson, unit, levelId, track, reason: 'resume' \| 'next', resume }` hoặc `null` (học hết) |
| `lessonPathState(track, levelId, lessonId, progress)` | `'done' \| 'next' \| 'open' \| 'locked'` (chỉ khoá theo level; trong level được chọn tự do) |
| `isLevelUnlocked(track, levelId, progress)`, `nextLevelId(levelId)`, `levelForBand(band)` | |
| `isLevelTestUnlocked(levelId, progress, track?)` | Đã học ≥ 80% số bài của level |
| `findUnitOfLesson(lessonId, track?)` | `{ unit, level }` |

Lộ trình hiện có: Level 1 = 9 chặng dùng chung (50 bài cũ); Level 2 = 9 chặng dùng chung (50 bài cũ, order 1–9)
+ 4 chặng general + 4 chặng ielts (phần 3.0–4.0, order 20+); Level 3 = 5 chặng general + 8 chặng ielts.
Test cuối level: `level-test-v3-level-1|2|3`.

---

## 7. Ôn tập FSRS — `src/learning-progress/fsrs-scheduler.ts`

Cấu hình: retention 0.90, khoảng tối đa 365 ngày, fuzz bật, bước học `1m, 10m`, học lại `10m` (FSRS-7, trọng số mặc định).

| Hàm | Ghi chú |
|---|---|
| `dueCards(progress, now?)` | `SrsQueueItem[] = { key, card, isNew }[]` — thẻ đến hạn (quá hạn lâu nhất trước) rồi thẻ mới, đã áp mọi giới hạn |
| `srsQueueInfo(progress, now?)` | `{ dueReviews, newWaiting, newOpenedToday, newLimitToday, backlogPaused, reviewsLeftToday, sessionSize }` |
| `srsButtonModeFor(progress)` | `2` hoặc `4` (người lớn level-3 = 4; còn lại 2; `profile.srsButtons` ghi đè) |
| `ratingsForButtonMode(mode)` | `['again','good']` hoặc `['again','hard','good','easy']` |
| `autoRating(correct, { seconds?, usedHint? })` | Thẻ tự chấm: sai → again; đúng chậm > 10s / dùng gợi ý → hard; đúng → good |
| `cardMemoryLabel(card)` / `countCardsByLabel(progress, 'word:')` | `'new' \| 'learning' \| 'reviewing' \| 'known'` (known = độ bền ≥ 21 ngày) — cho `/words` |
| `newCardsPerDayLimit(progress)` | level-1: 5, level-2: 10, level-3: 15 |

Luật: nợ ôn > 150 thẻ → `backlogPaused` (không mở thẻ mới — hiện "Ôn hết thẻ cũ trước để không quên"); tối đa 100 lượt ôn / ngày.
Thẻ `word:<id>`: tra từ bằng `findWord(id)`. Thẻ `item:<id>`: tra bài tập bằng `findExercise(id)` (câu thi không có thẻ).

---

## 8. Chuỗi ngày — `streak-rules.ts`

- Chuỗi +1 khi trong ngày có: xong 1 bài học, hoặc `completeReviewSession()`, hoặc xong bài thi / mini-test. Game, Học vui **không** tính.
- Freeze tự trang bị: 1 cái mỗi 7 ngày chuỗi, tối đa 2; lỡ ngày thì tự dùng (chuỗi giữ, không cộng).
- Đứt chuỗi (vắng ≤ 3 ngày không được bảo vệ, chuỗi cũ ≥ 2): `streak.repairAvailable` trong 48 giờ; học **2 bài** → chuỗi cũ được trả lại.
- Luôn hiện cạnh chuỗi: `streak.thisWeekDays` ("Tuần này x/7") và `streak.totalStudyDays` — không bao giờ giảm.
- Lời nhắn: không đổ lỗi ("Hôm qua bận à? Không sao") — xem psych-adult A10.

## 9. (Đã xoá 29/10/2026 — khu trẻ em, hộp Leitner của bé)

---

## 10. Nâng cấp dữ liệu cũ — `progress-migration.ts`

`migrateProgress(raw)` nhận bất kỳ thứ gì (null, v1, v2 thiếu trường) → luôn trả V2 đầy đủ. Gọi nhiều lần không đổi kết quả.

| v1 | v2 |
|---|---|
| `xpTotal`, `xpByDay`, `streak`, `lessons` (id cũ), `miniTests`, `levelTests`, `mistakes`, trò chơi hoá | Giữ nguyên (`lessons[id].attempts = 1`) |
| `reviewCards['word:x']` hộp 0..5 | `srs['word:x']` — hộp 0 = thẻ mới; hộp 1..5 = đang ôn, độ bền 1/3/7/14/30 ngày, giữ ngày đến hạn |
| `reviewCards['exercise:x']` | `srs['item:x']` |
| `placement.recommendedLevelOrder` 1..6 | 1 → level-1; 2–3 → level-2; ≥ 4 → level-2 **và mở thêm level-3**. `estimatedBand` "3.0 – 4.0" → `bandLow 3, bandHigh 4` |
| `unlockedLevelOrder`, đã học bài `l2-*`, đã qua test level-1 | Cùng quy tắc trên cho `currentLevel` / `unlockedLevels` (cả 2 track) |
| `dailyGoalXp` | `profile.dailyGoalMinutes` (30 XP ≈ 10 phút, làm tròn 5, trong 5..30) |
| chuỗi đang có | Tặng `freezes = min(2, chuỗi / 7)` |
| ngày có XP | `studyDates` |

Khi tải: bản trong máy (localStorage) có `savedAt` mới hơn bản máy chủ → dùng bản trong máy và gửi lại (`chooseNewerProgress`).
Máy chủ còn v1 → nâng cấp rồi tự gửi bản v2 lên. `/api/progress` giờ nhận tối đa 1,5MB (thẻ FSRS ~300 byte/thẻ).

---

## 11. Tài khoản & máy chủ

- `UserAccount` (`useAuth().user`) = `{ id, username, displayName }`. Mọi tài khoản như nhau — **không còn nhóm tuổi**.
- `register({ username, displayName, password, inviteCode })`. Cột `users.age_group` (migration 0003) vẫn còn trong database
  nhưng máy chủ không đọc / ghi nữa (tài khoản mới nhận giá trị mặc định của cột) — không cần migration xoá cột.
- Realtime (`realtime-worker`) chỉ còn: ai online, chat, "đang gõ…", "đã xem". Đấu trường / cược đã xoá.
- **Thứ tự deploy khi chủ nhà đồng ý:** `npm run deploy:realtime` → `npm run deploy`.

## 12. Kiểm thử

- `npm run test:progress` — 39 kiểm thử: chuyển đổi v1 → v2, chuỗi, FSRS, hàng đợi ôn, bỏ dữ liệu cũ (kids / ageGroup), thưởng nhiệm vụ, lộ trình, chọn bản mới hơn, luật XP theo track (mục 15), khoảng band bài xếp lớp.
- `npm run validate` — kiểm tra nội dung v3 (chặng trỏ đúng bài, id không trùng, `segmentId` / `paragraphLabel` hợp lệ, task Writing/Speaking có bài mẫu…).

## 13. Còn mở / gợi ý

- Chưa lưu "revlog" FSRS đầy đủ (psych-adult D8.33) để tối ưu trọng số sau này — JSON sẽ to; nếu cần, tách bảng D1 riêng.
- Audio bài nghe v3 (`listeningTask.segments`): do `npm run tts:v3` của nhóm âm thanh tạo (scripts/generate-audio-v3.ts, docs 06-AUDIO.md); `npm run tts` cũ chỉ còn để tương thích.
- Phòng thi đang liệt kê cả test level cũ (`level-1-test`, `level-2-test`) lẫn mới — nhóm giao diện nên ẩn đề cũ khỏi danh sách (giữ để mở kết quả cũ).

---

## 14. Tải nội dung bài học khi cần (`loadLesson`) — nhóm learning-path, 29/10

Trước đây mọi bài học (~2,3 MB JS) bị gói vào file JS đầu tiên → mở web rất chậm. Giờ chia 2 tầng:

| Tầng | File | Dùng khi |
|---|---|---|
| **Mục lục nhẹ** (~57 KB, có sẵn lúc mở web) | `src/content/lesson-index.ts` → `findLessonSummary(id)`, `allLessonSummaries()` | Vẽ lộ trình, nút "Học tiếp", popover xem trước, cột phải |
| **Nội dung đầy đủ** (tải theo file, 30–160 KB/lần) | `src/content/lesson-loader.ts` → `await loadLesson(id)` | Trình học `/lesson/:id`, mini-test, bất cứ chỗ nào cần `teachingCards` / `exercises` / task |

```ts
import { loadLesson, preloadLesson, getLoadedLesson } from '../../content/lesson-loader'
import { useLesson } from '../../content/use-lesson'          // hook React bọc loadLesson

const lesson = await loadLesson('l1-vocab-01')   // Lesson | undefined (id không tồn tại) — ném lỗi nếu mạng hỏng
preloadLesson(nextId)                            // tải trước, không chờ (VD rê chuột lên nút bài)
getLoadedLesson(id)                              // đã tải -> Lesson ngay (đồng bộ), chưa -> undefined

// trong component trình học:
const { lesson, status, retry } = useLesson(lessonId)
// status: 'loading' -> Skeleton · 'ready' -> chạy bài · 'not-found' -> về /learn · 'error' -> nút "Thử lại" gọi retry()
```

`LessonSummary` = `{ id, source, unitId, skill, mode, title, estimatedMinutes, exerciseCount, wordCount }`
(`estimatedMinutes` bài cũ không ghi → tự ước lượng từ số thẻ dạy + bài tập).

**Thay đổi API (đã sửa mọi chỗ dùng):**
- `findNextLesson(progress).lesson` và `lessonsOfUnit(unit)` giờ trả `LessonSummary` (có `id`, `title`, `skill`, `mode`, `estimatedMinutes`) — cần nội dung thì `loadLesson(next.lesson.id)`.
- `path-selectors.ts` không còn import `lesson-registry.ts`.

**Luật để giữ web nhẹ (file JS đầu < 700 KB):**
- Code chạy ở trang chính / cột phải / store **không** import `lesson-registry.ts` hay `content-lookup.ts` (2 file này kéo toàn bộ nội dung).
  Trang lazy (trò chơi, sổ từ…) vẫn import được, nhưng nên `await import('../../content/content-lookup')` khi thật sự cần.
- Trình học: đoạn đọc của bài lấy từ `lesson.readingPassages` (đừng dùng `findPassage` của content-lookup — sẽ kéo hết nội dung).
- `all-levels.ts` lấy id bài test level từ `exams/level-test-ids.ts` (không import `exams/index-v3.ts`).
- Mỗi file `src/content/levels/**/*-lessons*.ts` được build thành 1 file JS riêng (`vite.config.ts` → `codeSplitting.groups`).

**Thêm file bài mới (nhóm nội dung):** 1 dòng import ở `lesson-registry.ts` (như cũ) **+ 1 dòng** ở `src/content/lesson-sources.ts`,
rồi `npm run content:index` (tạo lại `src/content/generated/lesson-index-data.ts` — file máy tạo, không sửa tay).
`npm run validate` báo lỗi nếu quên 1 trong 2 bước; `npm run build` tự chạy `content:index` trước khi build.

Kích thước build (vite build, chưa nén): trước — `index` 361 KB + chunk chung 2.377 KB (≈ 2,74 MB tải lúc mở web);
sau — `index` ~417 KB + `language-context` 39 KB + `all-levels` 27 KB + nhỏ (≈ 0,49 MB). Mỗi lần mở bài tải thêm 30–160 KB.

---

## 15. XP chỉ ở track "Tiếng Anh tổng quát" — 29/10/2026 (quyết định chủ nhà)

XP, bảng xếp hạng, nhiệm vụ, huy hiệu, level tài khoản (Lv.N) là của track **general**. Track **IELTS** chỉ giữ **chuỗi ngày học**
(streak tính cho CẢ 2 track như cũ). Code: `src/gamification/gamification-scope.ts` (mọi luật nằm ở 1 file này).

**App biết đang ở track nào:** `progress.profile.track` = tab người học đang chọn ở `/learn` (hoặc Cài đặt); bài học xét thêm
track của chặng chứa bài (`all-levels.ts`); phòng thi luôn = IELTS.

| Hoạt động | Cộng XP? | Hàm |
|---|---|---|
| Bài học / mini-test, tab **general**, bài thuộc chặng có `'general'` (chặng riêng general **hoặc chặng dùng chung**) | Có | `lessonEarnsXp(lessonId, track)` |
| Bài tự khai `lesson.track` (bài Ngữ pháp `gr-…`: `track: 'general'`) | Theo `lesson.track`, **bỏ qua tab** → bài Ngữ pháp luôn có XP | `lessonEarnsXp(id, tab, lesson.track)` |
| Bài học / mini-test, tab **IELTS** (kể cả bài của chặng dùng chung) | Không | — |
| Bài chỉ nằm trong chặng IELTS nhưng mở khi đang ở tab general (VD link thẳng) | Không | — |
| Bài không thuộc chặng nào (bài cũ / chưa gắn lộ trình), tab general | Có | — |
| Phiên ôn thẻ `/review` | Chỉ khi tab general | `isGamifiedTrack(track)` |
| Phòng thi: bài test level, đề thi thử, bài xếp lớp cũ | **Không bao giờ** (vẫn tính chuỗi ngày, sổ lỗi, band, mở level) | `exam-grading.ts` |
| Trò chơi chữ `/play`, `/games/*`, nhiệm vụ đã đủ chỉ tiêu | Có, ở mọi track | (không qua file này) |

**Luật cho bài dùng chung:** cùng 1 bài, mở từ tab general thì có XP, mở từ tab IELTS thì không. Người học đổi tab là đổi "ngữ cảnh".

**Giao diện:**
- Màn kết quả bài học: `CompletionInfo.xp = null` → ẩn hẳn ô XP (còn 2 ô) và dòng "học lại chỉ 30% XP". Mini-test: ẩn "+N XP".
- Cột phải `/learn`: tab IELTS ẩn "Cả nhà tuần này" + "Nhiệm vụ hôm nay"; dải tóm tắt màn hẹp bỏ ô bảng xếp hạng. Ô "Hôm nay" (chuỗi + phút) giữ nguyên.
- Thanh điều hướng: "Lv.N" chỉ hiện khi `gamificationVisibleAt(track, pathname)` — tab general hoặc đang ở Sân chơi, **không** trong phòng thi.
- `GameWatchers` (toast lên level / huy hiệu) dùng cùng hàm: tab IELTS và phòng thi không báo; điều kiện vẫn được giữ, đổi sang tab general
  (hoặc vào Sân chơi) mới báo.
- Hook cho giao diện mới: `useGamificationVisible()`.
- Bài Ngữ pháp (`category: 'grammar'`): màn kết quả có nút chính "Về điểm ngữ pháp" → `/grammar/<topicId>` (không có thì `/grammar`);
  "Dừng ở đây" và thoát giữa bài cũng về đó (`lesson-player/session/grammar-return.ts`).

**Dữ liệu cũ không bị đụng:** `xpTotal`, `xpByDay`, `claimedRewards`, `unlockedAchievements` giữ nguyên — luật này chỉ quyết định có
CỘNG THÊM / có HIỆN hay không. Bộ đếm nhiệm vụ / huy hiệu (`questCounters`, `lifetimeStats`, gồm `lessons`, `examsTaken`) vẫn đếm ở cả
2 track (bài IELTS vẫn tính vào nhiệm vụ "Hoàn thành 2 bài học" — nhận thưởng được khi quay lại tab general).
