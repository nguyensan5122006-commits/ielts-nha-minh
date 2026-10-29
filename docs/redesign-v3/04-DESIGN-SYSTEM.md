# Redesign v3 — Hệ thiết kế (design system) & ngôn ngữ hình ảnh

> Chủ nhà chọn phong cách **"vui nhộn kiểu game"**. Nhưng phải **khác Duolingo rõ rệt** (không xanh lá chanh, không font tròn kiểu Feather, không nút "đế dày" border-bottom kiểu Duo, không đường đi zigzag vòng tròn y hệt).
> Ý tưởng chủ đạo: **"Vinyl Toy UI" + "Tuần tra học tập"** — mọi thứ mềm, tròn, bóng nhẹ như đồ chơi vinyl (khớp mascot Corgi vinyl), và câu chuyện "cún cảnh sát tuần tra cùng bạn qua các trạm học".
> Nguồn ý tưởng: `_research/notes/*.md` (Mochi: khung phản hồi + mascot ló đầu; Khan: thang gợi ý, sai không tô đỏ; ELSA: tô màu phát âm 3 mức; Cambridge W&I: thanh đếm từ, tab so sánh bản nháp; LingoLeap: cue card 3 pha; Brilliant: onboarding 1 câu/màn; DataCamp: thanh kỹ năng quanh vạch mục tiêu).

## 1. Màu (CSS custom properties trong `src/design-system/tokens.css`)

Nguồn cảm hứng: lông Corgi (cam mật ong + kem trắng), đồng phục (xanh ô-liu, đỏ ve áo, vàng cầu vai), bầu trời đêm tuần tra (xanh navy).

| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| `--c-bg` | `#FFF8EE` (kem ấm) | `#0E1330` | nền trang |
| `--c-surface` | `#FFFFFF` | `#171D40` | thẻ, khung |
| `--c-surface-2` | `#FFF1DD` | `#20285A` | khối phụ, input |
| `--c-ink` | `#1E2347` (navy mực) | `#F4F1FF` | chữ chính |
| `--c-ink-2` | `#5B6187` | `#B7BCE0` | chữ phụ |
| `--c-line` | `#F0E2CC` | `#2C3570` | viền mảnh |
| `--c-primary` | `#FF8A2A` (cam Corgi) | `#FF9D47` | nút chính, điểm nhấn |
| `--c-primary-deep` | `#E66A0A` | `#FF8A2A` | gradient đáy nút, hover |
| `--c-primary-soft` | `#FFE7CF` | `#3A2A2A` | nền chip, highlight |
| `--c-navy` | `#2B3A8F` | `#7D8CFF` | nút phụ đậm, link, header khu thi |
| `--c-olive` | `#7E8F4E` (đồng phục) | `#A9BC72` | chi tiết thương hiệu, huy hiệu cấp |
| `--c-red` | `#E2453C` (ve áo) | `#FF6B62` | chuỗi ngày (lửa), nhãn "Mới" |
| `--c-gold` | `#F5B82E` (cầu vai) | `#FFCC55` | XP, sao, huy hiệu, vàng thưởng |
| `--c-success` | `#1FB57A` | `#3DDC97` | trả lời đúng |
| `--c-success-soft` | `#E2F8EE` | `#123A2E` | nền khung phản hồi đúng |
| `--c-oops` | `#F2724B` (cam san hô — KHÔNG đỏ chói) | `#FF8F6B` | trả lời chưa đúng |
| `--c-oops-soft` | `#FFE9E0` | `#3D2320` | nền khung phản hồi sai |

Màu kỹ năng (icon 3D, viền thẻ, thanh tiến độ kỹ năng):
`--skill-listening #2E9BF0` (xanh trời) · `--skill-reading #8B5CF6` (tím) · `--skill-writing #F0568C` (hồng san hô) · `--skill-speaking #13B5A5` (ngọc) · `--skill-vocabulary #F5A623` (vàng mật ong).

Tỉ lệ tương phản chữ ≥ 4.5:1 (chữ trên nút cam dùng `#1E2347` hoặc trắng đậm 700 + bóng chữ nhẹ — kiểm tra bằng công cụ, chọn cái đạt). Chế độ tối: theo hệ thống + nút chuyển trong cài đặt (`data-theme="light|dark"` trên `<html>`).

## 2. Chữ

- Tiêu đề / số lớn / nút: **"Baloo 2"** (Google Fonts, có tiếng Việt) — tròn, dày, vui, khác Duolingo. Weight 600–800.
- Giao diện & nội dung: **"Be Vietnam Pro"** (đang dùng) 400–700.
- Bài đọc dài (Reading passage, bài mẫu Writing): **"Source Serif 4"** (đang dùng) — dễ đọc lâu.
- Thang cỡ (desktop): 13 / 15 / **17 (body)** / 20 / 24 / 32 / 44 / 60. Line-height body 1.6; bài đọc 1.75, 18px.

## 3. Hình khối, bóng, chất liệu ("vinyl")

- Bo góc: `--r-sm 10px`, `--r-md 16px`, `--r-lg 24px`, `--r-xl 32px`, nút = pill (999px) hoặc 16px.
- Thẻ: nền trắng, viền 1px `--c-line`, bóng mềm 2 lớp `0 1px 0 rgba(30,35,71,.04), 0 10px 30px -12px rgba(30,35,71,.18)`. Thẻ nổi bật (CTA "Học tiếp"): gradient nhẹ từ `--c-primary` → `--c-primary-deep`, chữ trắng, có ảnh mascot tràn ra khỏi mép thẻ.
- **Nút chính "vinyl"**: pill, gradient dọc (sáng trên → đậm dưới), viền trong 1px trắng 35% ở trên (highlight bóng như đồ chơi), bóng màu cùng tông phía dưới `0 8px 18px -8px <màu 60%>`. Hover: sáng hơn 4%, nâng 1px. Nhấn: `scale(.97)` + bóng ngắn lại (80ms). KHÔNG dùng kiểu đế dày border-bottom.
- Nút phụ: nền `--c-surface-2`, chữ `--c-ink`, cùng hình pill. Nút "ghost": chỉ chữ + icon.
- Kích thước nút: lg 56px (CTA chính), md 44px, sm 36px; vùng bấm ≥ 48px.
- Viền focus: vòng 3px `--c-navy` 40% (truy cập bằng bàn phím luôn thấy).

## 4. Chuyển động & âm thanh

- Thời lượng: vi mô 120–180ms; panel 220–280ms; ăn mừng ≤ 1,5s (bỏ qua bằng Enter). Easing: `cubic-bezier(.2,.8,.2,1)` (ra), spring nhẹ cho bật nảy `cubic-bezier(.34,1.56,.64,1)`.
- `prefers-reduced-motion`: tắt nảy, tắt pháo giấy, giữ chuyển màu.
- Khoảnh khắc chính:
  - Chọn đáp án: thẻ nhún 0.98 → 1, viền chuyển màu.
  - Kiểm tra: khung phản hồi trượt lên từ đáy (180ms); 350ms sau đầu mascot ló lên mép khung (pose `happy` khi đúng, `comfort` khi sai); khi sai, đáp án đúng được tô xanh ngay trong danh sách.
  - Thanh tiến độ bài: đầu thanh là huy hiệu ngôi sao nhỏ; khi tăng thì chạy mượt 400ms + lấp lánh ở mốc 50%, 100%; chuỗi đúng liên tiếp ≥ 3 → nhãn nhỏ "3 câu đúng liền!" (không phóng to toàn màn).
  - Hoàn thành bài: mascot `celebrate` (ảnh/webm), pháo giấy nhỏ màu thương hiệu 1,2s, số XP đếm lên.
  - Giữ chuỗi ngày: ngọn lửa đỏ-cam "bùng" 1 lần + con số lật.
  - Lên level: huy hiệu 3D level bay vào giữa, toả sáng, mascot chào.
- Âm thanh: tự tổng hợp bằng Web Audio (`src/design-system/sound-kit.ts`, không cần file): `tap` (tích nhẹ), `correct` (2 nốt quãng 3 lên, chuông ấm), `oops` (1 nốt thấp mềm, không buzz), `complete` (arpeggio 4 nốt), `streak` (whoosh + chuông), `levelUp`, `sticker` (pop). Có nút tắt tiếng; mặc định bật, âm lượng nhỏ.

## 5. Mascot trong giao diện (hợp đồng ảnh: 01-ARCHITECTURE mục 6)

`<Mascot pose size placement />` — placement: `peek-top` (ló đầu trên mép khung), `corner`, `hero`, `inline`. Mỗi tình huống có **1 pose cố định** để người học hiểu "ngôn ngữ" của mascot:

| Tình huống | Pose |
|---|---|
| Chào mừng, landing, logo lớn | `salute` |
| Đúng / bình thường vui | `happy` |
| Sai (an ủi, không buồn quá) | `comfort` |
| Gợi ý / suy nghĩ / câu khó | `thinking` |
| Hoàn thành bài, giữ chuỗi | `celebrate` |
| Cổ vũ đầu bài, nhắc mục tiêu | `thumbs-up` |
| Chưa học hôm nay (nhắc) | `sleepy` |
| Còn câu bỏ trống / ngạc nhiên | `surprised` |
| Listening / Reading / Writing / Speaking | `listening` / `reading` / `writing` / `speaking` |
| Vẫy chào (trang trống, chat) | `wave` |

Khi file ảnh chưa có: hiện placeholder là ảnh `head` nếu có, nếu không có thì một hình tròn cam có chữ viết tắt tên mascot — không để vỡ layout.
Tên mascot tạm: **"Ki"** (token `{mascot}` trong nội dung). Có thể đổi ở 1 chỗ: `src/design-system/mascot-name.ts`.

## 6. Bố cục desktop

- Khung chính: **sidebar trái 240px** (logo đầu mascot + "IELTS Nhà Mình"; mục: Học · Ôn tập · Luyện thi · Sân chơi · Chat · Hồ sơ; dưới cùng: nút VI/EN, sáng/tối) | **nội dung** (tối đa 720px cho lộ trình) | **cột phải 340px** (chuỗi ngày + mục tiêu ngày dạng vòng, thẻ "Học tiếp", **bảng xếp hạng gia đình top 5**, "Thời điểm vàng" ôn từ, nhiệm vụ ngày).
- ≥ 1280px: 3 cột. 1024–1279px: cột phải gập xuống dưới. < 1024px: sidebar thành thanh dưới (chuẩn bị cho bản mobile sau).
- Màn học/thi: toàn màn, không sidebar; thanh trên chỉ có nút thoát (tự lưu), thanh tiến độ, và nút âm thanh.

## 7. Lộ trình "Tuyến tuần tra" (/learn)

- Mỗi **level = 1 bản đồ khu vực** (Level 1 "Khu phố", Level 2 "Thành phố", Level 3 "Toàn quốc" — đổi tên được). Mỗi **chặng (unit) = 1 "Trạm"**: biển hiệu trạm (tiêu đề + câu can-do + tiến độ "3/6"), màu theo chủ đề.
- **Bài học = nút hình huy hiệu khiên tròn** (không phải vòng tròn kiểu Duolingo), có icon 3D kỹ năng bên trong; trạng thái: đã xong (vàng có dấu tích), hiện tại (cam, phát sáng thở chậm, mascot đứng cạnh với bong bóng "Học tiếp"), khoá (xám mờ, vẫn bấm xem trước được).
- Đường nối: con đường uốn lượn mềm (SVG path) có vạch kẻ đường đứt khúc, cây/nhà nhỏ trang trí ở 2 bên (ảnh emoji 3D nhỏ, mờ 60%).
- Đầu trang: tab track ("Tiếng Anh tổng quát" | "Luyện thi IELTS"), chọn level dạng 3 huy hiệu 3D, dòng "Bạn ở Trạm 3 · còn 2 bài tới mốc" + bậc thang band mini (Bạn ở đây → Mục tiêu 6.5).

## 8. Màn bài học

- Cột giữa 760px, khoảng trắng rộng. Câu hỏi 24px Baloo 2. Đáp án = thẻ lớn có số phím `1–4` ở đầu.
- Đáy màn: thanh hành động cố định: trái "Bỏ qua"/"Gợi ý", phải nút chính "Kiểm tra" (Enter). Sau khi kiểm tra: khung phản hồi thay thế thanh (mẫu Mochi): tiêu đề "Chính xác!" / "Chưa đúng — đáp án: …", 1 dòng "vì sao", nút "Tiếp tục" (Enter), nút cờ báo lỗi, nút "Hỏi AI vì sao" (khi sai).
- Thang gợi ý 3 nấc (Khan): gợi ý 1 → gợi ý 2 → lời giải. Sai không tô đỏ toàn khung; dùng `--c-oops`.
- Thẻ dạy: thẻ lớn có ảnh 3D minh hoạ, ví dụ có nút loa; "Tiếp" bằng Enter.

## 9. Kết quả bài
Thứ tự: mascot celebrate + "Bạn vừa làm được: …" (can-do) → 3 ô chỉ số (độ chính xác vòng tròn, thời gian, XP đếm lên) → "Câu cần ôn" (1–3, nút **Ôn lại câu sai**) → tiến độ ngày → 2 nút **Học tiếp** (chính) + **Dừng ở đây** (phụ, không mờ).

## 10. Thành phần cần có trong `src/design-system/components/`
`Button` (primary/secondary/ghost/danger, lg/md/sm, icon), `IconButton`, `Card` (+ `CardHeader`), `Chip`, `Badge`, `ProgressBar` (có đầu huy hiệu), `ProgressRing`, `StreakFlame`, `XpCounter`, `Mascot`, `SkillIcon`, `WordImage` (ảnh Fluent 3D theo slug, có fallback), `AudioButton` (loa, tốc độ chậm), `Kbd` (gợi ý phím), `Modal` (có mascot ló đầu), `Sheet` (khung trượt đáy), `Tabs`, `SegmentedControl`, `Tooltip`, `Toast` (giữ ToastCenter cũ nhưng restyle), `EmptyState` (mascot + 1 câu + 1 nút), `Skeleton`, `Confetti` (canvas nhẹ, tôn trọng reduced-motion), `Avatar` (giữ PlayerIdentity cũ, restyle), `LanguageToggle`, `ThemeToggle`, `Stepper`, `Timer` (ẩn/hiện, cảnh báo nhẹ khi còn 5 phút, không nhấp nháy).
Mỗi component: file `.tsx` + CSS cùng tên (`Button.css`), comment đầu file tiếng Việt, props có chú thích.

## 11. Giọng văn (copy)
- Xưng "bạn", mascot tự xưng tên ("Ki thấy bạn…"). Nút nói bằng giọng người học khi hợp ("Mình đã biết từ này").
- Khen cụ thể theo quá trình/kết quả ("Bạn nghe ra được số điện thoại rồi đó!"); cấm "thông minh/thiên tài/giỏi quá". Sai = "Chưa đúng" + bước tiếp theo.
- Câu ngắn, ≤ 2 dòng; tiêu đề ≤ 6 từ. Không dùng ngôn ngữ gây tội lỗi khi bỏ học.

## 12. (Đã xoá 29/10/2026 — khu trẻ em)

## 13. Phòng thi & trình kỹ năng (từ research ielts.org, IELTS Online Tests, Magoosh)
- **2 chế độ tách bạch** trước khi làm: "Luyện tập" (không giờ hoặc tự chọn giờ, chọn phần, chữa ngay sau từng phần) và "Thi thử" (giờ thật, tự nộp khi hết giờ, chấm cuối bài).
- **Giao diện thi giống máy thi IELTS**: header tối giản (tên thí sinh, đồng hồ dạng chữ "Còn 57 phút", chỉ hiện giây ở phút cuối và header đổi màu cam ở 5 phút cuối — không nhấp nháy), split pane có tay nắm kéo ↔, **thanh câu hỏi dưới đáy** theo Part (đã làm / đang ở / gắn cờ), nút cờ "xem lại sau", màn "Review" trước khi nộp liệt kê câu trống/cờ.
- **Bôi đen chữ → popover nhỏ "Highlight | Ghi chú"**; panel ghi chú trượt từ phải; tuỳ chọn hiển thị: 3 chế độ tương phản (đen/trắng, trắng/đen, vàng/đen) + 3 cỡ chữ.
- **Xem lại kiểu "soi bằng chứng"**: mỗi câu có nút "Tìm trong bài" (cuộn + tô bằng chứng có nhãn Q5), "Giải thích" (bảng từ khoá câu hỏi ↔ cách diễn đạt trong bài), Listening có "Nghe từ đoạn này".
- **Kết quả**: band từng kỹ năng + % đúng theo DẠNG câu hỏi (TFNG, gap-fill, matching…) + bảng xem lại (đúng/sai, thời gian, cờ) + 1 "bước tiếp theo" bằng lời thường (so sánh 2 band liền kề: "Để lên 6.0 bạn cần…").
- **Bài mẫu thành bài tập**: "Đoán band trước rồi mới xem", "Điền chỗ trống trong bài mẫu", "Lấy cụm từ hay vào sổ".
- Writing: đề + biểu đồ bên trái, editor bên phải; thanh đếm từ đổi màu khi đủ số từ; "Đang lưu… / Đã lưu"; số từ nối, từ lặp, số đoạn tự đếm; vòng Viết → Kiểm tra → Sửa → Kiểm tra lại với tab "Thay đổi" so 2 bản.
- Speaking: máy ghi âm đủ trạng thái (xin mic → sẵn sàng → đang ghi: sóng âm + thanh thời gian → nghe lại/ghi lại → đang chấm → kết quả). Part 2 cue card 3 pha: Sẵn sàng → Chuẩn bị 1:00 → Nói 2:00 → Xong + tự kiểm tra. Kết quả: "Ưu điểm" trước → "Nâng cấp" → "Bài mẫu", theo 4 tiêu chí; phát âm tô màu 3 mức (đúng/gần đúng/chưa đúng), không hiện % trên từng từ; loại tên riêng tiếng Việt khỏi chấm phát âm.
- Ôn từ "Thời điểm vàng" (Mochi): 5 cột cấp độ nhớ (Mới gặp → Quen mặt → Nhớ → Thuộc → Khắc sâu), đếm ngược tới lượt ôn kế tiếp, 1 nút "Ôn ngay"; thẻ có nút "Mình đã biết từ này".
- Bài đọc (luyện tập, không phải chế độ thi): **bấm 1 từ → từ thành chip xanh, nghĩa tiếng Việt hiện ngay phía trên dòng** (kiểu Readlang, không popup che chữ) + nút "Lưu vào sổ từ". Tắt trong chế độ thi thật.
- Kết quả sau phiên ôn (Seneca): đồng hồ "Độ bền trí nhớ" + "ôn lại sau khoảng 24 giờ", rồi **3 thẻ bước tiếp theo**, thẻ đầu là "Ôn lại N câu sai" (luôn miễn phí). Sai lỗi chính tả nhỏ (1 ký tự) → tính đúng + hiện cách viết chuẩn.
- Thẻ ôn từ (Vocabulary.com): sau mỗi câu, màn "Xem lại" chia đôi: câu hỏi trái | thẻ từ phải (vòng thành thạo, loa UK). Phím: `Space` lật thẻ, `1`/`2` (Quên/Nhớ) hoặc `1–4` (Again/Hard/Good/Easy).
- Lộ trình phải làm "0 → 6.5" thấy khả thi (Prep, DOL): mỗi level ghi **con số cụ thể + thời gian ước tính** ("~400 từ, 21 chủ điểm ngữ pháp, khoảng 6 giờ/tuần, ~3 tháng") và thang nhỏ theo kỹ năng ("1 câu đúng → 2 câu nối → 1 đoạn"). Kết quả xếp lớp hiện ngay, KHÔNG khoá sau đăng nhập.
- Nghe chép chính tả từng câu (DOL) + mẹo "Tắt bộ gõ tiếng Việt (Unikey) trước khi gõ tiếng Anh" hiện ở ô gõ đầu tiên.
- Kết quả bài test chia theo DẠNG câu hỏi + nút "Làm lại câu sai". Giải thích chỉ rõ vị trí trong bài + cụm diễn đạt lại.
- Tiêu đề lớn tiếng Việt: line-height ≥ 1.2 để dấu chồng không bị cắt.
- Khung phản hồi **3 màu**: xanh (đúng), cam san hô (chưa đúng), **vàng (máy chưa nghe rõ giọng — không tính sai, không phạt)**. Khi sai, tô đúng chữ/từ khác biệt + dòng "Nghĩa là…" tiếng Việt.
- Câu sai quay lại cuối bài có nhãn nhỏ "Câu sai lúc nãy". Kết quả bài có lưới xem lại từng câu (bấm mở).
- Thoát giữa bài: hộp thoại bình tĩnh "Đã lưu chỗ bạn đang học" (KHÔNG mascot khóc, KHÔNG mất tiến độ). Sau 1 bài tối đa 2 màn ăn mừng (kết quả + mốc nếu có).
- Không viết HOA toàn bộ tiếng Việt trên nút (dấu bị ép). Không dùng hộp xin quyền thông báo giả.
- Phòng thi: không mascot, chip đồng hồ, "Còn N lần nghe lại" (chế độ luyện tập), 2 cột.
