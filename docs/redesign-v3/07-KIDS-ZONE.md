# Khu vui chơi tiếng Anh cho bé 9–11 tuổi — đặc tả

Nguồn: `_research/notes/psych-kids.md` (40 luật mục 12), `kids-web.md`, `kids-apps.md`. Quyết định chủ nhà: bé 9–11 (đọc được tiếng Việt, tiếng Anh ~A1), mỗi người 1 tài khoản, **không có khu phụ huynh**, 30 phút/ngày **chỉ nhắc nhẹ, không khoá**, từ vựng Cambridge Starters–Movers–Flyers, bé không cược chuối ở đấu trường.
Luật trong psych-kids nhắc tới PIN/phụ huynh → **bỏ** (không có khu phụ huynh). Các luật còn lại giữ.

## 1. Cảm giác chung
- Không "trẻ con": bé 9–11 thích **thử thách, sưu tầm, câu chuyện, hài hước, kỷ lục cá nhân**. Phong cách game thật: nền trời sáng + đồi, thẻ vinyl to; chế độ "Đua tốc độ" dùng nền tối neon (tuỳ chọn).
- Mascot Ki luôn có mặt (góc trái dưới, pose `wave`/`happy`/`thinking`), nói bằng **giọng + phụ đề chạy theo** (nút Tiếp chỉ sáng khi nghe xong lần đầu, có nút nghe lại).
- Mọi chữ tiếng Anh có loa; hướng dẫn tiếng Việt ≤ 12 từ + giọng đọc tiếng Việt. Nút 🐢 nghe chậm. Phím `R` nghe lại.
- Thao tác chính là click; mọi kéo-thả có cách "click chọn → click đích". Nút ≥ 56px. Phím `1–4`, `Enter`.

## 2. Sảnh (/kids)
- Header: avatar bé + "Tem tuần" (thẻ 7 ô, mục tiêu 4/7 — không phải chuỗi liên tục) + thanh "thời gian hôm nay" mờ ở góc.
- Giữa: Ki chào bằng giọng ("Chào {tên}! Hôm nay chơi gì nào?") + **nút to "Chơi tiếp"** (vào trò được gợi ý: có từ đến hạn ôn).
- "Hôm nay chọn 1 trong 3": 3 thẻ trò chơi (xoay vòng theo ngày, ưu tiên trò có từ đến hạn), mỗi thẻ có ảnh, tên, "≈ 3 phút".
- Dưới: "Tất cả trò chơi" (8 trò), "Sổ sticker" (tiến độ bộ 12/20, ô chưa có = bóng đen), "Tủ đồ của Ki" (trang phục mở khoá), "Học bài" (sang lộ trình general level-1), "Thử thách cả nhà" (mục tiêu hợp tác tuần, không xếp hạng cá nhân).
- Mục tiêu buổi: bé chọn 1/2/3 lượt khi bắt đầu (mặc định 3).

## 3. Một lượt chơi (engine dùng chung `src/features/kids-zone/game-engine/`)
- 8–12 câu, median ≤ 4 phút. ≤ 3 từ mới / lượt (mới : ôn ≈ 30 : 70). Từ chọn theo Leitner 5 hộp (`kids-word-boxes.ts`), ưu tiên đến hạn; từ mới lấy từ chủ đề đang học.
- **Giới thiệu từ mới** (lần đầu gặp): thẻ "ghép chữ vào khuôn" (mỗi chữ cái bay vào và kêu âm), ảnh 3D, nghĩa tiếng Việt, câu ví dụ có giọng — 5–8 giây, bỏ qua được.
- **Thang gợi ý** khi sai: lần 1 → phát lại audio, đáp án sai mờ đi (bị loại), không lộ đáp án; lần 2 → loại thêm 1 đáp án + gợi ý (chữ cái đầu / nghĩa tiếng Việt); lần 3 → hiện đáp án, bé bấm lại đáp án đúng, câu quay lại cuối lượt. Không có lần sai thứ 4. Không buzzer, không X đỏ, không trừ điểm. Màu cam nhẹ.
- **Đúng**: ✓ + "ting", thẻ sáng viền vàng, nhắc lại từ + nghĩa ngắn (giọng). Lời khen bằng lời ≤ 1 lần / 4 câu đúng, cụ thể ("Bạn nghe ra âm /k/ ở đầu rồi!"), không "thông minh/giỏi quá".
- Độ khó thích nghi: tỉ lệ đúng lần đầu mục tiêu 75–85% (ít đáp án hơn khi < 65% hai lượt liền; ẩn ảnh/chuyển sang gõ khi > 92%).
- **Kết thúc lượt**: "Túi đồ từ vựng" — các từ vừa gặp xếp thành thẻ có loa, từ mới có nhãn "Mới", từ lên hộp có mũi tên ↑; ⭐ số câu đúng ngay lần đầu; "Kỷ lục của bạn" nếu phá kỷ lục. 2 nút **cùng kích thước**: "Chơi thêm 1 lượt" và "Xong hôm nay" (không nút nào được chọn sẵn). Không autoplay lượt mới.
- **Sticker**: khi 1 từ lên "đã thuộc" (hộp 5 sau ôn ở mốc ≥ 7 ngày) → màn nhận sticker (pop + âm `sticker`) vào sổ theo chủ đề. Xong bộ chủ đề → mở trang phục Ki (màn mặc thử).
- **30 phút/ngày**: đếm thời gian có thao tác (rảnh > 60s không đếm). Khi vượt 30 phút → sau khi xong lượt hiện màn Ki "Mình chơi 30 phút rồi, nghỉ mắt chút nhé?" với 2 nút ngang nhau "Nghỉ thôi" / "Chơi thêm 1 lượt". Không khoá, không ngôn ngữ tội lỗi; nhắc lại tối đa mỗi 15 phút.
- Chế độ: "Thong thả" (mặc định, không đồng hồ) | "Đua tốc độ" (tuỳ chọn, chỉ dùng từ ở hộp ≥ 3, đồng hồ 60–90s nền tối neon, kỷ lục cá nhân).

## 4. Tám trò chơi
| # | id | Tên | Cách chơi | Kỹ năng |
|---|---|---|---|---|
| 1 | `listen-tap` | **Nghe và chạm** (LÀM TRƯỚC, hoàn chỉnh nhất) | Nghe từ → chọn 1 trong 3–4 ảnh 3D. Nút "ẩn chữ" luyện tai. Từ vừa học thành đáp án nhiễu ở câu sau | nghe hiểu từ |
| 2 | `memory-match` | **Lật thẻ ghép cặp** | 6–8 cặp: ảnh ↔ chữ, hoặc chữ ↔ âm thanh (thẻ loa). Lật thẻ có âm `flip`; ghép đúng thẻ bay vào túi | nhận diện chữ |
| 3 | `spell-it` | **Xếp chữ thành từ** | Ảnh + giọng → bấm chữ cái (mỗi chữ có âm) vào khuôn; chữ đúng vị trí chuyển màu; gợi ý = hiện chữ đầu | chính tả |
| 4 | `balloon-pop` | **Bóng bay chữ** | Nghe từ → bấm đúng bóng (chữ) trong 4–5 bóng bay lên chậm; bóng lỡ sẽ quay lại, không mất mạng | nghe + đọc nhanh |
| 5 | `sentence-builder` | **Ghép câu** | Tranh + câu tiếng Việt → bấm khối chữ thành câu (mẫu Movers/Flyers); khối đúng vị trí tính từ đầu chuyển cam; xong câu thì cả câu được đọc + tô màu loại từ | ngữ pháp câu |
| 6 | `colour-command` | **Nghe lệnh tô màu** | Nghe "Colour the cat red" → chọn màu → bấm vào vật trong tranh (tranh ghép từ ảnh 3D trên nền cảnh) | nghe lệnh, màu, giới từ |
| 7 | `say-it` | **Nói để mở khoá** | Ki đưa rương khoá; bé đọc to từ → Web Speech API chấm lỏng (maxAlternatives ≥ 5, khoảng cách sửa ≤ 1–2); 2 lần không nhận → tự nghe so sánh rồi bấm "Giống / Chưa giống"; luôn có "Bỏ qua"; không bao giờ hiện chữ "Sai"; không hỗ trợ trình duyệt → tự động sang tự kiểm tra | phát âm |
| 8 | `patrol-story` | **Phiêu lưu cùng Ki** | Truyện tranh tuần tra 6 chương × 5 cảnh (khung truyện + thoại có giọng, ≤ 15s, có Bỏ qua); mỗi cảnh 1 câu hỏi để đi tiếp; hết chương nhận huy hiệu chương | đọc hiểu, nghe |

## 5. Nội dung & tài sản
- Ngân hàng từ: `src/content/kids/` (KIDS_TOPICS, câu mẫu, truyện, lệnh tô màu, voice lines có id).
- Ảnh từ: `/word-images/<slug>.webp` (Fluent Emoji 3D). Audio: `playKidsWord`, `playVoiceLine` trong `text-to-speech.ts` (nhóm audio đang làm), dự phòng speechSynthesis.
- Ảnh Ki: `/mascot/poses/*`, trang phục `/mascot/outfits/<outfitId>-512.webp`, sticker `/mascot/stickers/<id>-256.webp` — chưa có thì dùng placeholder của component `Mascot` / ảnh chủ đề.
- Tiến độ: `progress.kids` (03-DATA-LAYER.md).
