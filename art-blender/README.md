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
│   └── mascot/            ← script dựng mascot (sẽ thêm sau)
├── blend-files/           ← file nguồn .blend (mở bằng Blender để xem/chỉnh)
├── renders/               ← ảnh render THÔ và file xuất thử — KHÔNG đưa thẳng lên web
│   └── _pipeline-test/        kết quả của test_render.py
└── tools/                 ← công cụ Node.js để tối ưu file trước khi lên web
    └── package.json           @gltf-transform/cli (tối ưu .glb) + sharp (xử lý ảnh)
```

### Giải thích từng thư mục

| Thư mục | Chứa gì | Ghi chú |
|---|---|---|
| `scripts/_common/` | Hàm Python dùng lại nhiều lần | Dấu `_` ở đầu tên = "đồ nghề chung", không phải sản phẩm. Mỗi file có phần giải thích ở đầu. |
| `scripts/mascot/` | Script dựng từng mascot | Đầu mỗi script phải có đoạn thêm `scripts/` vào `sys.path` (xem `_common/__init__.py`). |
| `blend-files/` | File `.blend` nguồn | Đặt tên rõ ràng, ví dụ `mascot_cu-meo_v01.blend`. Tên bắt đầu bằng `_` = file thử nghiệm. File `.blend1` (backup tự động) đã được bỏ qua trong git. |
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
