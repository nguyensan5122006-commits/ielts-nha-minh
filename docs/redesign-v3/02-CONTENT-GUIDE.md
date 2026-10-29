# Hướng dẫn soạn nội dung v3 (cho các nhóm nội dung)

Đọc trước: `docs/redesign-v3/01-ARCHITECTURE.md`, kiểu dữ liệu `src/content/content-types.ts` (mục 7, 8 là phần mới),
một file mẫu cũ (VD `src/content/levels/level-2-foundation/reading-lessons.ts`) để theo đúng văn phong, và
`_research/notes/psych-adult.md` mục D (luật thiết kế bài học). (Khu trẻ em đã xoá 29/10/2026.)

## Luật bắt buộc
1. **Tự soạn 100%.** Đúng định dạng đề IELTS thật, nhưng không chép đề/bài mẫu từ sách Cambridge, British Council, IDP hay bất kỳ nguồn có bản quyền nào. Không dùng tên người thật nổi tiếng, thương hiệu thật làm nội dung chính.
2. **Kiểu dữ liệu đúng `content-types.ts`.** File phải qua `npx tsc --noEmit -p .` (chạy ở `E:\IELTS_ThienThao`).
3. **id duy nhất toàn site**, theo tiền tố của nhóm mình (xem bảng dưới). Không đổi id của nội dung cũ.
4. **Song ngữ**: `title`, `description`, `teachingCards`, `explanation`, `canDo` có `vi` + `en`. Nội dung học (câu hỏi, bài đọc, audio) bằng tiếng Anh.
5. **Feedback**: mọi bài tập có `explanation` — 1 dòng "vì sao" ≤ 20 từ mỗi ngôn ngữ; level-1 viết tiếng Việt dễ hiểu.
6. **Kích thước bài** (psych-adult D1): level-1: 6–8 bài tập, ≤ 5 từ mới; level-2: 8–12, ≤ 7 từ mới; level-3: 10–15, ≤ 8 từ mới. ≥ 70% bài tập bắt người học tự nhớ/tự chọn. `miniTest` có thể để `[]` (kiểm tra nằm ở checkpoint cuối chặng).
7. **Thẻ dạy** ≤ 3 thẻ/bài, mỗi thẻ ≤ 70 từ mỗi ngôn ngữ, có ví dụ. Dùng `**đậm**` cho ý chính.
8. **Mỗi bài level-2/level-3 có ít nhất 1 bài tập nói ngắn** (`speak-sentence` hoặc `speak-answer`) — Speaking là điểm yếu số 1 của người Việt. Nhắm các âm hay sai: phụ âm cuối, -s/-ed, trọng âm.
9. **Audio**: dùng `audioText` (bài tập) hoặc `AudioLine` (task nghe). Giọng mặc định Anh-Anh; level-3 trộn `au-*`, `us-*`. Hội thoại ghi `speaker`. Không viết gì máy đọc sai (tránh ký hiệu lạ; số viết như người nói).
10. **Bài mẫu theo band** (Writing/Speaking): 3 mức `4.0`, `5.5`, `6.5`. Bài band thấp phải *thật sự* có lỗi điển hình của band đó (không phải bài hay bị hạ điểm). `notesVi` giải thích theo 4 tiêu chí, 2–4 câu.
11. **Checklist tự chấm**: mỗi tiêu chí 2–4 câu hỏi có/không, ngôn ngữ đời thường (VD "Mỗi đoạn thân bài có 1 ý chính rõ ràng ở câu đầu không?").
12. **Không lệch văn hoá / nhạy cảm**: chủ đề gia đình Việt, đời sống, công việc, du lịch, giáo dục, môi trường, công nghệ, sức khoẻ, thể thao, ẩm thực. Không chính trị, tôn giáo, bạo lực.
13. Mỗi file có comment đầu file tiếng Việt: file chứa gì, danh sách bài (như file mẫu cũ).

## Cấu trúc 1 bài kỹ năng (mode khác 'practice')
`teachingCards` (chiến thuật) → `exercises` khởi động 3–6 câu → task (`listeningTask` / `readingTask` / `writingTask` / `speakingTask`).
- Listening: 2–4 `segments`, mỗi câu hỏi có `segmentId`; câu hỏi dạng đề thật (form/note completion, MCQ, map/plan mô tả bằng chữ, matching).
- Reading: bài đọc chia `paragraphs` có `label` A, B, C…; câu hỏi có `paragraphLabel` (đáp án nằm ở đâu). Level-3 bài đọc 450–750 từ, có `examMinutes`.
  Matching headings → kind `choice` với `options` = danh sách tiêu đề. Short answer → kind `gap-fill`.
- Writing: `WritingTaskV3` đủ `bandSamples` (3 bài) + `checklist` (4 tiêu chí) + `planningHintsVi`. Task 1 có `chartData`.
- Speaking: `SpeakingTask` với `bandSamples` (3 mức), `usefulPhrases`, `targetSounds`; Part 2 có `cueCard`.

## Mỗi nhóm xuất ra
- Các file bài: `export const <tên>Lessons: Lesson[] = [...]`
- 1 file chặng: `units.ts` → `export const <tên>Units: Unit[] = [...]` (id chặng, levelId, tracks, order, title, icon, canDo, lessonIds).
  `icon`: tên emoji tiếng Anh dạng slug của Fluent Emoji (VD `airplane`, `open-book`, `headphone`, `memo`, `speaking-head`, `newspaper`, `briefcase`) — nhóm tài sản sẽ tải ảnh 3D theo tên này.
- Không tự sửa `all-levels.ts`, `lesson-registry.ts` (nhóm nền móng gắn vào). Ghi chú gắn kết vào `docs/redesign-v3/REQUESTS.md` nếu cần.

## Bảng tiền tố id / thư mục
| Nhóm | Thư mục | Tiền tố id |
|---|---|---|
| Nền móng (map nội dung cũ) | `levels/level-1-beginner`, `levels/level-2-foundation` | giữ id cũ; chặng `u1-…`, `u2-…` |
| Level 2 phần 3.0–4.0, track general | `levels/level-2-bridge/general` | `l2b-g-…`, chặng `u2-g…` |
| Level 2 phần 3.0–4.0, track ielts | `levels/level-2-bridge/ielts` | `l2b-i-…`, chặng `u2-i…` |
| Level 3 IELTS Listening + Reading | `levels/level-3-ielts/listening-reading` | `l3-i-lis-…`, `l3-i-read-…`, chặng `u3-i…` |
| Level 3 IELTS Writing + Speaking | `levels/level-3-ielts/writing-speaking` | `l3-i-wri-…`, `l3-i-spk-…`, chặng `u3-i…` |
| Level 3 general (B1–B2) | `levels/level-3-general` | `l3-g-…`, chặng `u3-g…` |
| Bài xếp lớp + test level | `exams/` | `placement-v3-…`, `level-test-…` |

## Ghi chú thống nhất (cập nhật trong đêm)
- `canDo` là câu đầy đủ ("Sau chặng này bạn có thể…" / "After this unit, you can…"). Giao diện KHÔNG tự thêm tiền tố.
- Mốc `bandSamples`: level-2 bridge dùng "3.5" / "4.5" / "5.5"; level-3 IELTS dùng "4.0" / "5.5" / "6.5"; level-3 general dùng "4.5" / "5.5" / "6.5". Track general hiển thị nhãn "Cơ bản / Tốt / Rất tốt" thay vì số band.
- `listen-type` chấm bỏ qua dấu câu và hoa/thường; nên liệt kê biến thể viết tắt (I'll / I will).
- YES/NO/NOT GIVEN dùng `kind: 'choice'` với options `['YES','NO','NOT GIVEN']`. Giao diện hiển thị `instructions` với `white-space: pre-line` (có "\n" giữa các nhóm câu).
- `audioText` có tiền tố `Man:` / `Woman:` / `Officer:` → đọc bằng nhiều giọng (hàm `splitIntoSpeakerTurns`).
- Track general: Writing `taskNumber: 1` có thể KHÔNG có `chartData` (email, review) → trình Writing phải hiển thị được Task 1 không biểu đồ.
- Bài mẫu Speaking dạng "Q: …\nA: …" → hiển thị theo dòng; khi đọc audio bài mẫu chỉ đọc phần "A:".
- Options của câu matching đã CÓ sẵn chữ cái ('A. …', 'i. …') → giao diện KHÔNG tự thêm chữ cái phía trước, KHÔNG xáo trộn thứ tự options của câu matching.
- Speaking mock nhiều part trong 1 bài (VD `l3-i-spk-10`): `part: 2`, mỗi câu hỏi bắt đầu bằng "Part 1:", "Part 2:", "Part 3:" → trình Speaking tách theo nhãn này, chạy lần lượt Part 1 → cue card → Part 3.
- Bài Writing kiểu "fading": bài mẫu chú thích nằm ở `teachingCards[].examples` (`en` = câu mẫu, `vi` = vai trò câu); bài mẫu đục lỗ nằm ở `readingPassages` + bài tập gap-fill có `passageId` → trình bài học phải hiện `readingPassages` cạnh bài tập trong mọi mode.
- Bài mẫu Speaking band thấp có "uh…" → khi tạo audio bài mẫu, bỏ "uh/um".
