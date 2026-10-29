# Nội dung khu trò chơi trẻ em (`src/content/kids/`)

Dành cho bé 9–11 tuổi (đọc được tiếng Việt, tiếng Anh ở trường khoảng A1). Mọi file theo kiểu dữ liệu ở
`src/content/content-types.ts` mục 8, và theo luật ở `_research/notes/psych-kids.md` mục 12.

| File | Chứa gì | Số lượng |
|---|---|---|
| `kids-topics.ts` | 16 chủ đề, ngân hàng từ Cambridge YLE (Starters / Movers / Flyers) | 375 từ (217 / 99 / 59), 365 từ có câu mẫu |
| `kids-sentences.ts` | Mẫu câu cho trò Ghép câu, dễ → khó | 89 câu (33 / 32 / 24) |
| `kids-stories.ts` | Truyện "Tuần tra cùng {mascot}" cho trò Phiêu lưu | 6 chương × 5 cảnh |
| `kids-voice-lines.ts` | Mọi câu mascot nói (VI + EN) + danh sách 8 trò | 109 câu |
| `colour-commands.ts` | Lệnh cho trò Nghe lệnh tô màu | 30 lệnh (12 Starters, 18 Movers) |
| `outfits.ts` | Tủ đồ mascot: 1 bộ mặc định + 10 bộ mở khoá theo chủ đề | 11 bộ |
| `index.ts` | Gom và xuất mọi thứ, kèm `KIDS_WORD_BY_ID`, `fillMascotName()` | — |

## Quy ước
- **id**: từ = `kids-<chủ đề>-<từ>` (VD `kids-food-ice-cream`); câu = `kids-sent-s01 / m01 / f01`;
  truyện = `kids-story-01-…`; lệnh tô màu = `kids-colour-01`; câu thoại = `kids-vl-…`.
- **Cấp từ** đã đối chiếu với danh sách từ Cambridge YLE bản 2018 (cột "first appears at").
- **`image`** = tên ảnh Microsoft Fluent Emoji 3D dạng slug (chữ thường, dấu cách → gạch nối).
  Mọi tên đã được so với danh sách thư mục thật của kho `microsoft/fluentui-emoji`.
  `image: ''` = không có ảnh hợp → từ đó chỉ dùng cho trò chữ (đánh vần, ghép câu, truyện).
  Không có 2 từ nào dùng chung 1 ảnh.
- **`tags`**: `color` (từ chỉ màu), `action` (động từ), `colorable` (đồ vật / con vật dễ tô màu).
- **`{mascot}`**: tên mascot chưa chốt. Giao diện gọi `fillMascotName(text, tên)` trước khi hiện chữ;
  câu thoại phải thay tên **trước khi** tạo file âm thanh.

## Ghi chú cho lập trình viên
- Trò có hình: chỉ lấy từ có `image` khác rỗng. Đáp án nhiễu nên lấy cùng chủ đề.
- Truyện: đáp án đúng đã đặt ở vị trí khác nhau, nhưng vẫn nên xáo trộn `options` khi hiển thị.
- Câu thoại: lọc theo `category`, `gameId`, `hintStep`; khen bằng lời ≤ 1 lần / 4 câu đúng và không lặp câu trong 1 buổi.
- Chủ đề `colours`, `family`, `clothes`, `numbers`, `actions`, `places` chưa có trang phục riêng (chỉ có sticker).

## Ghi chú cho nhóm tài sản (ảnh)
- Emoji người (VD `woman-teacher`, `woman-pilot`) có nhiều màu da: lấy thư mục **Default**.
- Một số ảnh đúng tên nhưng nghĩa hơi xa, nên xem lại khi tải: `person-curly-hair` (hair), `nesting-dolls` (doll),
  `alien-monster` (monster), `rescue-workers-helmet` (helmet = mũ bảo hiểm), `police-car-light` (police station),
  `hundred-points` (hundred), `motorway` (road), `books` (library), `houses` (village), `basket` (picnic),
  `softball` (ball), `droplet` (water), `face-savoring-food` (hungry).
