# 10 — Bộ khung thi dùng chung (`src/features/exam-ui/`) + trình Nghe / Đọc

> Nhóm skill-listening-reading làm. Dùng cho: trình Nghe (`skill-listening/`), trình Đọc (`skill-reading/`)
> trong bài học, và **nhóm Phòng thi** khi dựng đề thi thử đầy đủ (4 kỹ năng, nhiều Part).
> Ý tưởng lấy từ research `ui-ielts-a` (máy thi IELTS chính thức), `ui-ielts-b` (Locate / Explain / Listen from here),
> `ui-vn-b` ý 8 (xem lại chia đôi), `ui-edtech-b` (Readlang bấm từ ra nghĩa). Làm lại theo phong cách "Vinyl Toy UI".

Nhập 1 chỗ: `import { … } from '../exam-ui'` (file `index.ts` xuất hết).

---

## 1. Bức tranh chung

```
┌ ExamFrame ─────────────────────────────────────────────────────────────┐
│ dải task: ● Tên bài [Luyện tập|Thi thật]   ⏱ Còn 17 phút   ✎ Ghi chú  Aa │  <- header (embedded) / header + nút thoát (standalone)
├────────────────────────── SplitPane ──────────────┬──────────────────────┤
│  cột trái (bài đọc / trình phát + lời thoại)  ↔   │ cột phải (câu hỏi)   │ NotesPanel (300px, đẩy nội dung)
│  MarkedText + SelectionToolbar                    │ ExamQuestionList     │
├───────────────────────────────────────────────────┴──────────────────────┤
│ QuestionNavigator: Part 1 [1][2][3]…  Part 2 0/4 …        ‹ ›  [Kiểm tra & nộp] │
└──────────────────────────────────────────────────────────────────────────┘
ReviewBeforeSubmit (Modal) · TaskIntro (chọn Luyện tập / Thi thật) · TaskResultSummary + EvidenceStrip (xem lại)
```

Hai chế độ (04-DESIGN-SYSTEM mục 13, chọn ở `TaskIntro` TRƯỚC khi làm):

| | Luyện tập | Thi thật |
|---|---|---|
| Đồng hồ | không | `CalmExamTimer` "Còn N phút", hết giờ tự nộp |
| Nghe | nghe lại từng đoạn, tua ±5 s, tốc độ 0.75/1/1.25× | mỗi đoạn 1 lần, phát liền, không dừng/tua |
| Đọc | bấm từ → nghĩa tiếng Việt + "Lưu vào sổ từ" | không tra từ |
| Gợi ý | chip "Tối đa 2 từ", cảnh báo gõ quá số từ, mẹo Unikey | không |
| Tô vàng / ghi chú / gắn cờ | có | có (như máy thi) |

---

## 2. Các mảnh (component + hàm)

### ExamFrame — khung toàn màn
```tsx
const display = useExamDisplay()
<ExamFrame display={display} variant="standalone" title="Mock test 2 · Reading" skill="reading"
  badge={<ModeBadge mode="exam" />}
  timer={<CalmExamTimer secondsLeft={secondsLeft} tone={tone} />} tone={tone}
  tools={<FrameTool icon={<NoteIcon />} label="Ghi chú" count={notes.length} pressed={open} onClick={toggle} />}
  onExit={saveAndExit}
  aside={open ? <NotesPanel … /> : null}
  footer={<QuestionNavigator … />}>
  <SplitPane … />
</ExamFrame>
```
- `variant="standalone"`: có header riêng + nút "Lưu & thoát" (phòng thi). Cao `100dvh` (đổi bằng `--exam-frame-height`).
- `variant="embedded"`: nằm trong `FocusLayout` của trình học (đã có thanh trên + nút thoát) → header thành dải task mảnh,
  không có nút thoát thứ 2. CSS dùng `:has()` để vùng nội dung FocusLayout + mọi lớp bọc (VD `.lp-content`) giãn đủ cao.
- Header đổi màu êm theo `tone`: `soon` (≤ 5 phút, cam nhạt), `final` (≤ 60 giây, cam san hô). Không nhấp nháy.
- Khi khung đang hiện: bong bóng chat nổi bị ẩn (che nút Nộp bài).

### SplitPane — 2 cột có tay nắm ↔
`start` / `end` (2 vùng cuộn riêng; `startRef` / `endRef` trỏ vào vùng cuộn), `defaultRatio`, `minStartPx`, `minEndPx`,
`storageKey` (nhớ tỉ lệ). Kéo chuột/cảm ứng; bàn phím: Tab tới tay nắm → ← → (Shift = bước lớn), Home/End, Enter / bấm đúp = mặc định.
Khung < 860px tự xếp dọc. Đổi `key` khi muốn đọc lại tỉ lệ khác (VD pha xem lại dùng `storageKey` khác).

### QuestionNavigator — thanh câu hỏi dưới đáy
```tsx
<QuestionNavigator parts={[{ id: 'p1', label: 'Part 1', questions: [{ id, number, answered, flagged, result? }] }]}
  currentId={id} onSelect={goTo} onPrev={…} onNext={…}
  extra="Đã làm 7/13" primaryAction={{ label: 'Kiểm tra & nộp', onClick: openReview }} />
```
Vạch trên số: xám = chưa làm, xanh = đã làm · viền navy = đang xem · chấm đỏ = gắn cờ · màn kết quả: ô xanh/cam san hô.
Part đang xem mở số câu; Part khác thu gọn "Part 2 · 0/13" (có ✓ khi xong hết). Nút ‹ › nằm TRONG thanh (không đè lên câu).

### ExamQuestionList + question-grouping — vẽ câu hỏi đề IELTS
```ts
const { intro, groups } = buildQuestionGroups(part.instructions, part.questions)
<ExamQuestionList groups={groups} intro={intro} answers={answers} onAnswer={setAnswer}
  flags={flagSet} onToggleFlag={toggle} currentId={id} onFocusQuestion={setId}
  review={null | gradeAll(groups, answers).results} practiceHints showTypingTip
  renderGroupLead={(g) => …} renderAfterQuestion={(q) => <EvidenceStrip … />} />
```
- `splitInstructions` cắt "Questions 1–5: … Questions 6–8: …" thành từng nhóm (cả khi có "\n"); hướng dẫn hiển thị `pre-line`,
  cụm VIẾT HOA (TRUE, NOT GIVEN, ONE WORD AND/OR A NUMBER) in đậm như đề thật (không tô đỏ). "MAP: …" tách ra khung mô tả bản đồ.
- Cách vẽ (`layout`): `list` (MCQ — cả hàng tô nền khi chọn) · `pills` (TRUE/FALSE/NOT GIVEN, YES/NO/NOT GIVEN, A–G, tên người)
  · `matching` (≥ 2 câu liền nhau dùng CHUNG danh sách đã có nhãn → khung danh sách hiện 1 lần, mỗi câu chỉ bấm nhãn A–H / i–viii)
  · `gap` (ô gõ ngay trong câu, số câu làm chữ mờ, `spellCheck=false`).
- **Nhãn phương án lấy từ nội dung** (`optionLabel`), KHÔNG đánh lại, KHÔNG xáo. MCQ không có nhãn mới tự hiện A/B/C.
- Đuôi chung của mọi câu trong nhóm (VD "(Map: South Entrance at the bottom…)") được cắt và hiện 1 lần (`sharedPromptSuffix`).
- `parseWordLimit` + `exceedsWordLimit`: chip "Tối đa 2 từ và/hoặc 1 số" + cảnh báo khi gõ quá (chỉ luyện tập).
- Giá trị lưu khớp `exam-scoring.ts`: choice = số thứ tự phương án ("2"), TFNG = chữ ("FALSE"), gap = chữ gõ.
- Radio thật (`<input type=radio>` ẩn) → mũi tên chạy giữa phương án; nút cờ ngoài vòng Tab (Tab đi thẳng ô → ô như máy thi), gắn cờ bằng Alt+F.
- `classifyQuestionType` → dạng câu (tfng, ynng, matching-headings, matching-information, map, matching, mcq, form, table, note,
  flow-chart, summary, sentence, short-answer, word-meaning, gap) cho "% theo dạng". Tên hiển thị: `QUESTION_TYPE_NAMES`.

### answer-grading
`gradeAll(groups, answers)` → `{ results[id]: { isCorrect, isBlank, nearMiss, userText, correctText, typeId }, correct, total, accuracy, byType }`.
Dùng lại `isQuestionCorrect` của `src/exam-engine/exam-scoring.ts`. `nearMiss` = sai đúng 1 ký tự (vẫn tính sai như IELTS, chỉ nhắc chính tả).

### HighlightNotesLayer + MarkedText — tô vàng, ghi chú, tô bằng chứng
```tsx
const notes = useHighlightNotes(savedMarks, saveMarks, textOf)     // UserMark[] lưu bằng vị trí ký tự (JSON)
<article ref={passageRef}>
  {paragraphs.map((p) => <MarkedText as="p" blockId={`para-${p.label}`} text={p.text} marks={[...notes.textMarks, ...evidenceMarks]} />)}
</article>
<SelectionToolbar containerRef={passageRef} onHighlight={notes.highlight} onNote={(r) => openPanel(notes.addNote(r))}
  onRemove={notes.removeIn} canRemove={notes.hasMarkIn} />
<NotesPanel notes={notes.noteMarks} onChangeNote={notes.updateNote} onDelete={notes.remove} onLocate={…} />
```
- Mỗi khối chữ có `data-hl-block`; phần chèn thêm (nhãn "Q5", nghĩa từ) có `data-hl-ignore` để không làm lệch vị trí.
- Bôi đen → popover "Tô vàng | Ghi chú" (+ "Xoá tô" nếu đã tô) ngay dưới vùng chọn; tự nới ra trọn từ. Esc đóng (không kích hoạt "thoát bài").
- `TextMark.kind`: `highlight` (vàng) · `note` (cam nhạt gạch chấm, bấm mở ghi chú) · `evidence` (câu chứa đáp án, navy nhạt)
  · `evidence-phrase` (cụm then chốt, đậm + gạch chân). `label: 'Q5'` hiện nhãn nhỏ; `active` = câu đang xem (chỉ tô câu đang xem, câu khác chỉ còn nhãn).
- `scrollMarkIntoView(container, markId)` / `scrollBlockIntoView(container, blockId, { flash })`: cuộn + nháy viền 1 lần.

### evidence-finder — "soi bằng chứng"
`findEvidence({ question, blocks, preferredGroup })` (khối = đoạn văn hoặc dòng thoại; nhóm = nhãn đoạn / id đoạn nghe):
1) cụm trong ngoặc kép/đơn của lời giải (tách "...", bỏ "[…]") → tìm trọn từ, bỏ qua hoa-thường/dấu câu;
2) câu điền từ → tìm chính đáp án; 3) chỉ biết đoạn (`confidence: 'block'`). Trên nội dung hiện có: ~87% câu tìm được cụm chính xác,
phần còn lại thường là NOT GIVEN (đúng là không có bằng chứng). `sentence` = cả câu chứa cụm. `paraphrasePairsFromExplanation` rút cặp "X = Y";
`sharedKeywords` = từ khoá chung câu hỏi ↔ bài (để dò).

### EvidenceStrip — dải xem lại dưới mỗi câu
Đúng/Chưa đúng + đáp án + 1 dòng "vì sao" · nút do trình truyền vào (Đọc: "Tìm trong bài"; Nghe: "Nghe từ đoạn này", "Xem lời thoại")
· "Giải thích" mở bảng **Câu hỏi nói ↔ Trong bài** (tô từ khoá chung) + cặp diễn đạt lại.

### ExamDisplaySettings — tương phản + cỡ chữ (nút "Aa Hiển thị")
4 lựa chọn: Theo giao diện (sáng/tối của web) · Đen trên trắng · Trắng trên đen · Vàng trên đen; cỡ chữ Vừa/Lớn/Rất lớn
(`--exam-text-scale` 1 / 1.15 / 1.3). Nhớ trong localStorage `ielts-exam-display`. Gắn `display.rootProps` lên khung ngoài.

### CalmExamTimer
`const { secondsLeft, tone } = useExamCountdown(startSeconds, { running, onExpire })` (theo đồng hồ máy, không lệch khi ẩn tab).
Hiện "Còn 17 phút" (không nhảy giây); ≤ 60 giây: "Còn 42 giây" và không ẩn được. Ẩn/hiện bằng nút mắt. Báo trình đọc màn hình 1 lần khi đổi mốc.

### ReviewBeforeSubmit
Modal: Đã làm x/y · N câu bỏ trống · N câu gắn cờ · lưới số câu (bấm để nhảy tới) · "IELTS không trừ điểm câu sai — cứ đoán"
· thi thật thêm "nộp rồi không sửa được". Nút: "Làm tiếp" / "Nộp bài". Phím: Ctrl+Enter mở màn này.

### TaskIntro / TaskResultSummary
- `TaskIntro`: tiêu đề, số câu/số từ/thời lượng, 2 thẻ chế độ (radio), mẹo, "Bắt đầu" (Enter). Phòng thi: không truyền `mascotPose`.
- `TaskResultSummary`: vòng điểm, band ước tính DẠNG KHOẢNG (ẩn khi đúng < 20% — không hiện "Band 0"), % theo dạng câu,
  1 điều làm tốt + 1–2 việc sửa được, 2 nút (chính "Tiếp tục" + phụ "Làm lại câu sai").

### use-task-session + lesson-task-recording (riêng cho bài học)
- `useTaskSession(resumeData, onSaveResume)`: trạng thái JSON (pha, chế độ, đáp án, cờ, tô vàng, giây còn lại, lượt nghe, thời gian làm thật…),
  tự lưu (gõ chữ: 600 ms im lặng; đổi pha: ngay). `retryWrong(ids)` = làm lại câu sai (không ghi tiến độ lần 2).
- `useLessonTaskRecorder()`: `recordAnswer(skill, đúng/sai, —, lỗi)` từng câu (không truyền itemKey — xem REQUESTS), band ước tính từ
  `rawScoreToBand` (chặn trần theo level: level-3 tối đa 7.0, level-2 tối đa 4.5; chỉ chặng IELTS), `updateBandEstimate` khi kỹ năng đã ≥ 20 câu.
- `loadSkillTaskQuestion(lessonId, questionId)`: cho Sổ câu sai tra ngược câu task + ngữ cảnh + link mở lại.

---

## 3. Trình Nghe (`skill-listening/ListeningTaskPlayer.tsx`, mode `'listening'`)
- Đăng ký: `skill-listening/register-skill-tasks.ts` (`layout: 'full'`). Luyện riêng: `/listening/:lessonId`.
- Âm thanh: `playSegment(segment, { rate, onProgress, onEnded })` của `text-to-speech.ts` (mỗi đoạn v3 đã có 1 file mp3 ghép sẵn).
  Hook `useListeningAudio`: phát đoạn / "nghe từ dòng thứ N" (ước vị trí dòng theo độ dài chữ rồi co giãn theo thời lượng file thật, lùi 1 giây)
  / dừng / tua ±5 / tốc độ / dòng đang phát (karaoke nhẹ trong lời thoại).
- Cột trái: thẻ trình phát (thanh tiến độ chia theo đoạn, bấm để tua) + danh sách "Đoạn 1/2/3 · Câu 1–3 · 1:11" với "Nghe lại đoạn này";
  lời thoại KHOÁ tới khi nộp. Cột phải: câu hỏi, chen vạch "Đoạn 2 · Câu 4–7 · Nghe lại đoạn này" đúng chỗ đổi đoạn.
- Thi thật: header "● Đang phát đoạn 2", mỗi đoạn 1 lượt (đếm trong resume — mở lại không nghe lại được), tự sang đoạn sau.
- Xem lại: lời thoại có nhãn Q1…Q10, câu đang xem tô bằng chứng; "Nghe từ đoạn này" phát từ dòng chứa đáp án.
- Phím: Space phát/dừng · R nghe lại đoạn · Shift+←/→ tua 5 s · Alt+←/→ câu trước/sau · Alt+F gắn cờ · 1–9 chọn đáp án · Ctrl+Enter nộp.

## 4. Trình Đọc (`skill-reading/ReadingTaskPlayer.tsx`, mode `'reading'`)
- Đăng ký: `skill-reading/register-skill-tasks.ts` (`layout: 'full'`). Luyện riêng: `/reading/:lessonId`.
- Bài đọc Source Serif 4, 18px × cỡ chữ, nhãn đoạn A–G ở lề trái; tay nắm kéo 2 cột; tô vàng + ghi chú (lưu cùng resume).
- Luyện tập: bấm 1 từ → từ thành chip tím, nghĩa tiếng Việt hiện NGAY TRÊN từ (dòng tự giãn, không che chữ) + 🔊 + "Lưu vào sổ từ";
  từ điển: từ của bài → `reading-glossary.ts` (~820 từ hay gặp trong bài đọc v3, tự soạn) → thẻ Học vui + từ khu trẻ em (tải lười).
  Không có → "Chưa có nghĩa — lưu để tra sau". Esc đóng.
- Thi thật (bài có `examMinutes`): đồng hồ êm, hết giờ tự nộp ("Hết giờ — bài đã được nộp tự động"), không tra từ, không chip gợi ý.
- Xem lại: "Tìm trong bài" cuộn tới đoạn + tô câu bằng chứng "Q5"; "Giải thích" = câu hỏi ↔ trong bài + từ khoá + paraphrase.

## 5. Gợi ý cho nhóm Phòng thi (đề nhiều Part)
- Mỗi `ExamPart` → 1 `NavigatorPart`; `buildQuestionGroups(part.instructions, part.questions)` cho từng Part.
- Reading: `passage.text` tách `\n\n` thành khối `para-<n>` cho `MarkedText` / `findEvidence`.
- Listening đề cũ (`audioScript` dạng "Tên: lời"): dùng `speak(script)` hoặc tách dòng thành `AudioLine[]` rồi `playSegment`.
- Lưu trạng thái: tự viết (đề thi không dùng `progress.resume`), có thể tái dùng kiểu `TaskSessionState`.
- Chấm: `gradeAll` cho từng Part rồi `rawScoreToBand` / `buildExamResult` của `exam-scoring.ts`.
