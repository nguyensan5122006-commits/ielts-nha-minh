# Mascot Corgi "Ki" — 3 hướng concept

> Cập nhật: 2026-10-29. Tất cả dựng và render trong **Blender 5.2.3** (Cycles, GPU RTX 4060), bằng script
> trong `art-blender/scripts/mascot/`. Không có hình nào vẽ tay hay làm bằng three.js/CSS.

**Ảnh so sánh:** [`concepts-sheet.png`](concepts-sheet.png). Mỗi concept có các hàng: chính diện, góc 3/4, nghiêng,
tư thế chào (★ tư thế chính), ảnh đầu (logo). Hàng cuối thu nhỏ ảnh đầu còn 128 / 64 / 32 px trên nền sáng và
nền tối, kèm bản 32 px phóng to để soi từng điểm ảnh.

Ảnh lẻ 1024 px: `concept_{a,b,c}_{front,threequarter,side,salute34}.png`, ảnh đầu 512 px: `concept_{a,b,c}_head.png`.
File Blender mở xem/chỉnh tay được: `art-blender/blend-files/mascot_concept_{a,b,c}.blend`
(trong file có 2 tư thế đứng cạnh nhau: đứng thường | chào).

---

## Điểm chung của cả 3 concept

- **Giống chó:** Corgi Pembroke, lông cam-nâu vàng, mõm + má dưới + ngực + bàn chân màu trắng kem,
  có vệt trắng giữa trán. Tai to dựng đứng, lòng tai màu kem đào. Má hồng "phun sơn" kiểu đồ chơi.
- **Chất liệu:** đồ chơi vinyl mềm. Bề mặt satin, hơi thấm sáng (subsurface), không bóng loáng như nhựa rẻ.
  Áo có vân vải chéo rất nhẹ. Huy hiệu, cúc, dây mũ là kim loại vàng.
- **Đồng phục CAND, mức chi tiết vừa:**
  - Mũ kê-pi: đỉnh xanh ô-liu, băng đỏ, dây vàng xoắn, lưỡi trai đen ánh navy.
  - Huy hiệu **cách điệu**: vòng lá vàng, đĩa đỏ, sao vàng. Cố ý **không sao chép công an hiệu thật**.
  - Áo ô-liu nhạt, cổ bẻ có ve đỏ và cúc vàng, cầu vai vàng có sao, nẹp áo và cúc vàng.
  - Thắt lưng da nâu, khoá vàng.
- **Tư thế chính — chào:** tay phải giơ lên, bàn tay áp mép vành mũ (phía trước tai), ngón chỉ chéo vào giữa,
  **lòng bàn tay quay ra trước**. Nhờ vậy thấy rõ 4 "hạt đậu" hồng ở lòng bàn tay: rất dễ thương, và đọc được
  ngay là "chào" chứ không phải gãi đầu.
- **Màu đồng phục nằm ở 1 chỗ:** `PALETTE_BASE` / `UNIFORM_PRESETS` trong `scripts/mascot/corgi_concepts.py`.
  Đã có sẵn bộ `traffic`: áo và mũ vàng kem kiểu CSGT.

## So sánh

| | **A — Tròn Đậu** | **B — Cáo Tinh Anh** | **C — Đồ Chơi Mập** ✅ đề xuất |
|---|---|---|---|
| Ý tưởng | Cân đối, "hiền lành chuẩn mực" | Thanh, lanh lợi, "anh cảnh sát nhỏ" | Đồ chơi bày bàn học: đầu rất to, thân ngắn, tay chân mập |
| Tỉ lệ đầu (kể cả mũ) / chiều cao | ~48% | ~48% | **~51%** (đúng yêu cầu chibi ≈ 1/2) |
| Mắt | Đen tròn to, 2 đốm sáng | Hạnh nhân, tròng nâu + con ngươi | **Đen tròn rất to**, 2 đốm sáng |
| Mõm, tai | Mõm ngắn; tai to, đầu tai bo | Mõm dài kiểu cáo; tai dài nhọn | Mõm ngắn rộng; **tai to, đầu tai tròn** |
| Đồng phục | Gọn: ve, cầu vai, nẹp, thắt lưng | Nhiều chi tiết: thêm túi ngực có nắp, nẹp cửa tay, viền đỏ cầu vai, nếp vải nhiều | Gọn nhất; điểm nhấn sao đỏ trên cầu vai, khoá thắt lưng hình sao |
| Ở cỡ 64 px | Tốt | Tạm: tròng nâu nhoè, mõm dài thành mảng trắng hẹp | **Tốt nhất**: mắt, mõm trắng, mũ xanh–đỏ tách bạch |
| Ở cỡ 32 px | Còn nhận ra: mũ + 2 mắt | Khó: mắt lẫn vào lông | **Còn nhận ra**: mũ xanh–đỏ, 2 chấm mắt, mõm trắng |
| Cảm giác | Dễ thương, hơi "người lớn" | Ngầu, hợp người lớn hơn trẻ em; tai dài dễ bị nhìn thành cáo/chihuahua | Dễ thương nhất cho bé 9–11; người lớn vẫn thấy "xịn" như art toy |
| Cử chỉ (tay) | Tay ngắn, cử chỉ nhỏ | Tay thanh, khó thấy ở ảnh nhỏ | Bàn tay mập → cử chỉ (chào, giơ ngón cái, cầm sách/micro) rõ ở 256 px |

## Đề xuất: **Concept C — "Đồ Chơi Mập"**

1. **Đúng yêu cầu nhất về tỉ lệ chibi.** Đầu ≈ 1/2 chiều cao, thân ngắn, chân mập. Nhìn là biết đồ chơi
   vinyl, không thành "chó mặc đồ người".
2. **Dễ nhận ở cỡ nhỏ nhất.** Mặt rộng, mắt to và mõm trắng tạo 3 mảng tương phản lớn. Ở 32 px (favicon) vẫn
   thấy mũ xanh–đỏ, hai chấm mắt và mõm trắng. B mất mắt ở cỡ này, A kém C một chút.
3. **Hợp trẻ 9–11 mà người lớn không thấy trẻ con quá.** Chất liệu vinyl satin, đồng phục có chi tiết thật
   (dây mũ xoắn, ve cổ, cầu vai, khoá sao) nên vẫn trông "đắt tiền" như art toy.
4. **Cử chỉ đọc rõ.** Bàn tay to, có đệm thịt hồng, nên mọi tư thế trên web (chào, vẫy, giơ ngón cái, ôm tim,
   cầm sách/bút/micro) đều đọc được ngay cả ở ảnh 256 px.
5. Đồng phục gọn nhất nên ít "nhiễu" khi thu nhỏ. Muốn thêm túi ngực / nẹp cửa tay như B chỉ cần bật 2 tham số
   `pockets`, `cuffs`.

**Đã làm tiếp với C:** bộ ảnh web 13 tư thế + ảnh đầu (`public/mascot/`). Xem cả bộ ở
[`../poses/poses-sheet_c_olive.png`](../poses/poses-sheet_c_olive.png). Muốn đổi sang A hoặc B chỉ cần
chạy lại 1 lệnh (xem `art-blender/README.md`, mục "Mascot Corgi"):

```bash
cd "E:/IELTS_ThienThao/art-blender/tools" && node render_mascot_all.mjs --concept A
```

## Quá trình chỉnh sửa (tự phê bình sau mỗi lần render)

Bản nháp đầu tiên của cả 3 concept có nhiều lỗi. Đã sửa như sau:

| Lỗi thấy trên ảnh | Đã sửa thế nào |
|---|---|
| Tay chào **không với tới** mũ (tay chibi quá ngắn): bàn tay nằm ở má/tai, nhìn như gãi đầu | Tay hoạt hình tự "dài ra" khi cần. Bàn tay đặt ở mép vành mũ trước tai, lòng bàn tay quay ra trước, có đệm thịt hồng |
| Miệng tròn chữ "o" + lưỡi dài thõng: trông như mệt / ốm | Miệng cười hình chữ D, khoé nhếch lên, lưỡi nằm trong miệng. Có thêm các kiểu miệng khác theo biểu cảm |
| Túm lông má thành **gai nhọn** hai bên đầu | Đầu túm to + hợp mềm rộng → viền gợn sóng mềm |
| Lưỡi trai trông như **tấm bạc** (phản chiếu trần studio) | Đen ánh navy, satin mờ |
| Huy hiệu mũ quá nhỏ, ở 64 px không thấy | To gấp ~1.3 lần, đặt cao hơn |
| Đốm sáng **vuông** trong mắt | Đèn hắt dưới không hiện trong phản chiếu nữa |
| Lông trắng ở chân ngả **xám xanh** | Đèn phụ và trần studio chuyển sang trung tính |
| Tai mỏng, lòng tai lấm tấm vết lõm | Lòng tai đặt theo đúng độ dày tai → hốc kem đào rõ, viền cam dày |
| Rãnh nhân trung lỗ chỗ như vết khâu | Vẽ bằng nét màu mảnh |
| Bóng đổ dài bị cắt thẳng ở mép ảnh (xấu khi đặt lên thẻ web) | Đèn chính không chiếu xuống sàn (light linking của Cycles) + một "bóng giả" mềm dưới chân. Khi xuất ảnh web, bóng mờ dần trước khi chạm mép |
| Thử đèn tròn trên đỉnh đầu để tạo bóng dưới chân: cái đầu to che đèn → vũng bóng đen rộng | Bỏ đèn đó, dùng bóng giả (đĩa đen trong suốt dần ra mép) |

## Điểm còn chưa hoàn hảo (biết rõ, sẽ làm tiếp nếu cần)

- **Lông mày** (2 mảng kem nhỏ, đổi góc theo biểu cảm) bị vành mũ che bóng, nên ở ảnh nhỏ gần như không thấy.
  Biểu cảm hiện chủ yếu nhờ mắt, miệng, tai và tay.
- Mặt trên lưỡi trai vẫn có một dải sáng mờ khi nhìn từ trên xuống. Đó là phản chiếu thật của vật liệu, chấp nhận được.
- Lông là vinyl trơn (không có sợi lông thật), đúng với hướng "đồ chơi vinyl" đã thống nhất.
- Thân nhìn từ phía sau chưa được chăm chút (đuôi cụt, mông tròn). Chưa render góc sau cho web.

## Câu hỏi cần chủ nhà quyết

1. **Chọn concept** A / B / C (đề xuất C). Đổi concept = chạy lại 1 lệnh, khoảng 30 phút.
2. **Màu đồng phục:** giữ xanh ô-liu (Cảnh sát) hay đổi sang vàng kem (CSGT)? Đã có sẵn bộ màu `traffic`.
3. **Cầu vai:** thật ra cầu vai CAND là **nền đỏ có vạch/sao vàng**. Bản này làm **vàng** theo brief (dễ đọc ở
   ảnh nhỏ hơn). Muốn đúng thực tế thì đặt `board_style: "red"` trong `corgi_concepts.py`.
4. **Tên mascot:** vẫn tạm là "Ki".
