# art-blender — Xưởng làm hình 3D cho website IELTS

Thư mục này chứa mọi thứ để **tạo hình 3D (mascot, đồ vật, phần thưởng...) bằng Blender**,
render ra ảnh PNG/WebP nền trong suốt, hoặc xuất model `.glb` để hiển thị 3D trên web.

Toàn bộ quy trình chạy **bằng script Python** (không cần bấm chuột trong Blender), nên làm lại
được y hệt bất cứ lúc nào. Mở file `.blend` bằng giao diện Blender khi muốn xem/chỉnh tay.

> Thông tin kỹ thuật chi tiết (phiên bản, lệnh chạy, thời gian render, các lỗi đã gặp):
> xem **[PIPELINE-NOTES.md](PIPELINE-NOTES.md)**.

---

## Cấu trúc thư mục

```
art-blender/
├── README.md              ← file bạn đang đọc
├── PIPELINE-NOTES.md      ← ghi chú kỹ thuật: lệnh chạy, GPU, thời gian, lỗi đã gặp
├── scripts/               ← code Python điều khiển Blender
│   ├── _common/           ← các hàm DÙNG CHUNG cho mọi script (import được)
│   │   ├── __init__.py        biến thư mục thành "package" Python + hướng dẫn import
│   │   ├── enable_gpu.py      bật GPU (OptiX → CUDA → CPU)
│   │   ├── studio_lighting.py dọn cảnh, 3 đèn mềm, world giả HDRI, camera, shadow catcher
│   │   ├── render_settings.py Cycles + AgX + nền trong suốt + khử nhiễu, lưu PNG/WebP
│   │   ├── export_glb.py      xuất .glb (nén Draco) + cảnh báo vật liệu không xuất được
│   │   └── test_render.py     script KIỂM TRA cả pipeline (quả bóng lông có mắt)
│   └── mascot/            ← script dựng mascot Corgi "Ki" (xem mục "Mascot Corgi" bên dưới)
│       ├── corgi_concepts.py      THÔNG SỐ 3 concept A/B/C + MÀU (lông, đồng phục) — đổi màu ở đây
│       ├── corgi_poses.py         13 tư thế + biểu cảm (tay đặt đâu, mắt/miệng, đồ vật cầm theo)
│       ├── corgi_builder.py       dựng nhân vật từ concept + tư thế (đầu, thân, tay, áo, mũ kê-pi...)
│       ├── corgi_props.py         đồ vật: tai nghe, sách, bút chì, sổ, micro, trái tim, chữ Z, dấu ?...
│       ├── corgi_materials.py     vật liệu vinyl, vải, vàng kim loại, mắt vẽ bằng shader
│       ├── sdf_toolkit.py         "đất nặn kỹ thuật số": SDF → lưới (giải thích chi tiết ở đầu file)
│       ├── mascot_stage.py        sân khấu chung: đèn, camera, căn khung
│       ├── build_and_render_concept.py  render bảng so sánh concept (chính diện, 3/4, nghiêng, chào, đầu)
│       ├── rerender_concept_from_blend.py  render lại ảnh concept từ .blend đã lưu (chỉ đổi đèn/camera)
│       └── render_poses.py        render ảnh cho WEBSITE (các tư thế + ảnh đầu)
├── blend-files/           ← file nguồn .blend (mở bằng Blender để xem/chỉnh)
├── renders/               ← ảnh render THÔ và file xuất thử — KHÔNG đưa thẳng lên web
│   └── _pipeline-test/        kết quả của test_render.py
└── tools/                 ← công cụ Node.js để tối ưu file trước khi lên web
    ├── package.json           @gltf-transform/cli (tối ưu .glb) + sharp (xử lý ảnh)
    ├── render_mascot_all.mjs  MỘT LỆNH: render mọi tư thế mascot (song song) + chép lên public/mascot
    ├── publish_mascot.mjs     tối ưu ảnh mascot (WebP 256/512/1024, PNG đầu 32..512) → public/mascot
    ├── make_concept_sheets.mjs  ghép bảng so sánh 3 concept + kiểm tra cỡ 64/32 px
    ├── shadow_clean.mjs       dọn bóng đổ mềm cho khỏi bị cắt ở mép ảnh (dùng chung)
    └── montage.mjs            ghép nhanh nhiều ảnh thành lưới để xem
```

### Giải thích từng thư mục

| Thư mục | Chứa gì | Ghi chú |
|---|---|---|
| `scripts/_common/` | Hàm Python dùng lại nhiều lần | Dấu `_` ở đầu tên = "đồ nghề chung", không phải sản phẩm. Mỗi file có phần giải thích ở đầu. |
| `scripts/mascot/` | Script dựng từng mascot | Đầu mỗi script phải có đoạn thêm `scripts/` vào `sys.path` (xem `_common/__init__.py`). |
| `blend-files/` | File `.blend` nguồn | Đặt tên rõ ràng, ví dụ `mascot_cu-meo_v01.blend`. Tên bắt đầu bằng `_` = file thử nghiệm. File `.blend1` (backup tự động) đã được bỏ qua trong git. File `.blend` của mascot (`mascot_concept_*.blend`, thư mục `poses/`) rất nặng (100+ MB) và dựng lại được bằng script → cũng bỏ qua trong git. |
| `renders/` | Ảnh render gốc, file `.glb` xuất thử, báo cáo JSON | Đây là "bản nháp". Chỉ ảnh/model **đã tối ưu** mới được copy sang thư mục `public/` của website. |
| `tools/` | Công cụ Node riêng cho phần đồ hoạ | Có `package.json` riêng, không lẫn với website. Cài bằng `cd tools && npm install`. |

---

## Quy trình làm việc (từ ý tưởng → web)

1. **Viết script** trong `scripts/mascot/` (dựng hình, vật liệu, dùng hàm trong `_common/`).
2. **Chạy script** bằng Blender ở chế độ nền (không mở cửa sổ) → tạo `.blend` + ảnh trong `renders/`.
3. **Xem kết quả**: mở ảnh trong `renders/...`, hoặc mở `.blend` bằng Blender.
4. **Tối ưu**: dùng `tools/` (gltf-transform cho `.glb`, sharp cho ảnh: đổi kích thước, WebP).
5. **Đưa lên web**: copy file đã tối ưu sang `public/` của website.

## Chạy thử nhanh

Mở **Git Bash** và chạy (mất khoảng 1 phút, gồm cả so sánh CPU):

```bash
"E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \
  --python "E:/IELTS_ThienThao/art-blender/scripts/_common/test_render.py" -- --cpu-compare
```

Kết quả xuất hiện trong `renders/_pipeline-test/`:

- `pipeline-test_fuzzy-ball.png`: ảnh PNG nền trong suốt (RGBA)
- `pipeline-test_fuzzy-ball.webp`: cùng ảnh đó dạng WebP (nhỏ hơn PNG ~13 lần)
- `pipeline-test_fuzzy-ball_cpu.png`: bản render bằng CPU (để so sánh)
- `pipeline-test_fuzzy-ball.glb`: model 3D nén Draco, khoảng 34 KB
- `pipeline-test_fuzzy-ball_no-draco.glb`: model không nén, khoảng 194 KB, để so sánh
- `pipeline-test_fuzzy-ball_report.json`: thiết bị đã dùng, thời gian render, dung lượng, kiểm tra alpha

Xem model `.glb` bằng công cụ dòng lệnh:

```bash
cd "E:/IELTS_ThienThao/art-blender/tools"
npx gltf-transform inspect ../renders/_pipeline-test/pipeline-test_fuzzy-ball.glb
```

## Từ khoá hay gặp

| Từ | Nghĩa ngắn gọn |
|---|---|
| **Cycles** | Bộ render vật lý của Blender (đẹp, dùng GPU). |
| **OptiX / CUDA** | Cách Blender dùng card NVIDIA. OptiX nhanh hơn trên card RTX. |
| **Samples** | Số tia sáng mỗi pixel. Nhiều = ít nhiễu, lâu hơn. |
| **Denoise** | Bộ lọc AI xoá hạt nhiễu sau khi render. |
| **AgX** | Cách chuyển ánh sáng thành màu màn hình, giữ màu đẹp, không cháy sáng. |
| **Film transparent** | Nền trong suốt (ảnh có kênh alpha). |
| **Shadow catcher** | Mặt phẳng vô hình chỉ giữ lại bóng đổ trên nền trong suốt. |
| **glTF / .glb** | Định dạng 3D chuẩn cho web (three.js đọc được). |
| **Draco** | Thuật toán nén lưới 3D, giảm dung lượng khoảng 5–7 lần. |
| **Bake** | "Nướng" hiệu ứng vật liệu procedural thành ảnh texture để xuất ra web. |

---

## Mascot Corgi "Ki" — dựng và render

Nhân vật được dựng **hoàn toàn bằng code** (không nặn tay): mỗi bộ phận là một hàm khoảng cách SDF
(xem giải thích ở đầu `scripts/mascot/sdf_toolkit.py`), hợp mềm với nhau như đất sét rồi biến thành lưới.
Nhờ vậy đổi tư thế, biểu cảm, màu áo hay cả concept chỉ là **đổi vài con số** rồi chạy lại.

### Làm lại TOÀN BỘ ảnh cho website — 1 lệnh

```bash
cd "E:/IELTS_ThienThao/art-blender/tools"
node render_mascot_all.mjs --concept C --uniform olive
```

Lệnh này chạy 3 tiến trình Blender song song (~25–35 phút cho 13 tư thế + ảnh đầu), rồi tự tối ưu và chép vào:

| File trên web | Nội dung |
|---|---|
| `public/mascot/poses/<pose>-256.webp`, `-512.webp`, `-1024.webp` | 13 tư thế, nền trong suốt, có bóng mềm dưới chân |
| `public/mascot/head/head-32.png` … `head-512.png` | chỉ cái đầu (logo, avatar, favicon) |

Xem nhanh cả bộ: `renders/poses/poses-sheet_c_olive.png`. Ảnh gốc 1024 px: `renders/poses/c_olive/`.

Tư thế: `salute` (chào — CHÍNH), `happy`, `wave`, `comfort`, `thinking`, `celebrate`, `sleepy`, `listening`,
`thumbs-up`, `surprised`, `reading`, `writing`, `speaking`. Component `<Mascot>` và `<KidsMascot>` của web
tự dùng ảnh khi file có đúng tên (không cần sửa code web).

Tuỳ chọn hay dùng:

- `--concept A|B|C`: đổi concept.
- `--uniform traffic`: áo + mũ màu vàng kem kiểu Cảnh sát giao thông (xem `UNIFORM_PRESETS`).
- `--poses salute,happy,head`: chỉ làm lại vài tư thế.
- `--draft --no-publish`: bản nháp nhanh để xem thử, không đụng tới web.
- `--jobs 2`: số tiến trình Blender chạy song song.
- `--save-blend`: lưu thêm `.blend` từng tư thế vào `blend-files/poses/` để mở xem/chỉnh tay.

### Đổi màu đồng phục

Mọi màu nằm ở **một chỗ**: `PALETTE_BASE` trong `scripts/mascot/corgi_concepts.py` (màu tuyến tính, có ghi
mã hex gần đúng bên cạnh). Có sẵn 2 bộ trong `UNIFORM_PRESETS`: `olive` (Cảnh sát, mặc định) và
`traffic` (CSGT). Muốn thêm bộ mới thì thêm 1 dòng vào `UNIFORM_PRESETS` rồi chạy lệnh trên với `--uniform <tên>`.

### Từng bước riêng lẻ (khi cần)

```bash
# 1) Render vài tư thế (ảnh gốc PNG 1024 px → renders/poses/c_olive/)
"E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup   --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/render_poses.py" -- --concept C --poses salute,head

# 2) Tối ưu + chép lên web
cd "E:/IELTS_ThienThao/art-blender/tools" && node publish_mascot.mjs --concept C

# Bảng so sánh concept (renders/concepts/concepts-sheet.png)
"E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup   --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/build_and_render_concept.py" -- --concept A
#   (lặp lại với B, C) rồi:
cd "E:/IELTS_ThienThao/art-blender/tools" && node make_concept_sheets.mjs

# Chỉ đổi ĐÈN / BÓNG / CAMERA của ảnh concept (không dựng lại hình, ~2 phút thay vì ~15 phút):
"E:/Tools/Blender/5.2.3/blender.exe" --background "E:/IELTS_ThienThao/art-blender/blend-files/mascot_concept_c.blend"   --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/rerender_concept_from_blend.py" -- --concept C
```

> Khi tự chạy nhiều tiến trình Blender cùng lúc, nhớ `export OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1`
> trước (xem PIPELINE-NOTES mục 41). `render_mascot_all.mjs` đã tự làm việc này.

### Thêm một tư thế mới

1. Mở `scripts/mascot/corgi_poses.py`, copy một tư thế gần giống (vd `wave`), đặt tên mới.
2. Sửa: vị trí bàn tay (`at`), hướng ngón (`fingers`), hướng lòng bàn tay (`palm`), mắt (`eyes`),
   miệng (`mouth`), lông mày (`brows`), đồ vật (`props`). Giải thích từng khoá ở đầu file.
3. Xem nhanh: `node render_mascot_all.mjs --poses <tên> --draft --no-publish`
   → ảnh ở `renders/poses/c_olive/<tên>.png`.

### Việc để sau (chưa làm)

- `mascot.glb` (model 3D cho trang chủ) + hoạt cảnh idle/wave/celebrate/blink.
- `turnaround/` (4 góc), `outfits/` (trang phục mở khoá), `stickers/`, `anim/*.webm`.
- Huy hiệu level, icon 5 kỹ năng (`public/art/`).
