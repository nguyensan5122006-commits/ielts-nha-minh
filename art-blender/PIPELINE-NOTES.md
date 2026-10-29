# PIPELINE-NOTES — Ghi chú kỹ thuật pipeline Blender

Cập nhật: 2026-10-29. Máy: Windows 11, Ryzen 7 7435HS, RTX 4060 Laptop GPU (8 GB, driver 591.66), RAM 24 GB.

---

## 1. Phiên bản Blender và đường dẫn

| Mục | Giá trị |
|---|---|
| Phiên bản | **Blender 5.2.3 LTS** (bản ổn định mới nhất ngày 2026-10-29, nhánh LTS hỗ trợ tới 07/2028) |
| Build | hash `e13b728c6880`, build 2026-10-22, branch `blender-v5.2-release` |
| File chạy | `E:/Tools/Blender/5.2.3/blender.exe` (bản portable, không cần cài, không cần quyền admin) |
| Python đi kèm | 3.13.13: `E:/Tools/Blender/5.2.3/5.2/python/bin/python.exe` |
| glTF add-on | Khronos glTF Blender I/O v5.2.41 (có sẵn, đã bật) |
| File zip gốc | `E:/Tools/_downloads/blender-5.2.3-windows-x64.zip` (388 MB, xoá được nếu cần chỗ) |

**Đã kiểm tra file tải về như sau:**

- **Nguồn:** zip tải từ mirror chính thức `https://mirrors.ocf.berkeley.edu/blender/release/Blender5.2/`.
  Không tải thẳng từ `download.blender.org`, vì site này chặn mọi request tự động bằng Cloudflare (xem mục 6).
- **SHA256:** `723f08a4401502561eb763cdeacf8745b31e5f3f154d287d3830d97cf75dc2fb`.
  - Giá trị này khớp với file `blender-5.2.3.sha256` lấy từ 3 mirror chính thức độc lập: Berkeley, NLUUG và Clarkson. Ba file sha256 giống hệt nhau từng byte.
  - Chưa đối chiếu được trực tiếp với file trên `download.blender.org` (bị Cloudflare chặn).
- **Chữ ký số:** chữ ký Authenticode của `blender.exe` hợp lệ (`Status: Valid`).
  - Người ký: `CN=Blender Foundation, O=Blender Foundation, L=Amsterdam, C=NL`.
  - Nơi cấp chứng chỉ: Microsoft ID Verified CS EOC CA 04.

> Trên máy còn `E:/Tools/blender-4.5.9-windows-x64/` và `E:/Tools/venv3d/` (tạo ngày 27/10, **không phải**
> do bước cài đặt này). Pipeline KHÔNG dùng chúng. Cấu hình người dùng của 4.5 nằm ở
> `%APPDATA%/Blender Foundation/Blender/4.5`. Các script luôn chạy với `--factory-startup` nên không bị ảnh hưởng.

---

## 2. Lệnh chạy

### Git Bash (khuyên dùng)

```bash
# Kiểm tra phiên bản
"E:/Tools/Blender/5.2.3/blender.exe" --background --version

# Test toàn bộ pipeline (GPU + so sánh CPU + đo lần render thứ 2 + xuất GLB + lưu .blend)
"E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \
  --python "E:/IELTS_ThienThao/art-blender/scripts/_common/test_render.py" -- --cpu-compare --gpu-warm

# Mẫu chung cho một script bất kỳ, tham số riêng của script đặt SAU dấu --
"E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \
  --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/<ten-script>.py" -- --tham-so gia-tri

# Mở 1 file .blend bằng giao diện để xem/chỉnh tay
"E:/Tools/Blender/5.2.3/blender.exe" "E:/IELTS_ThienThao/art-blender/blend-files/_pipeline-test_fuzzy-ball.blend"

# Render lại 1 file .blend có sẵn rồi chạy script trên đó (file .blend đặt TRƯỚC --python)
"E:/Tools/Blender/5.2.3/blender.exe" --background "E:/.../file.blend" --python "E:/.../script.py"
```

### PowerShell

```powershell
& "E:\Tools\Blender\5.2.3\blender.exe" --background --factory-startup `
  --python "E:\IELTS_ThienThao\art-blender\scripts\_common\test_render.py" -- --cpu-compare
```

### Tham số của `test_render.py`

`--out-dir PATH`, `--samples N` (128), `--size N` (512), `--cpu-compare`, `--gpu-warm`, `--no-glb`,
`--no-shadow-catcher`, `--save-blend PATH|none`.

### Công cụ Node (`art-blender/tools/`)

Phiên bản: `@gltf-transform/cli` 4.5.1, `sharp` 0.35.5 (libvips 8.18.7, libwebp 1.6.0). Node 24.21.

```bash
cd "E:/IELTS_ThienThao/art-blender/tools"
npx gltf-transform --version                       # → 4.5.1
npx gltf-transform inspect  <file.glb>             # xem mesh, vật liệu, dung lượng
npx gltf-transform validate <file.glb>             # kiểm tra chuẩn glTF
npx gltf-transform optimize <in.glb> <out.glb> --compress draco     # hoặc --compress meshopt
```

`npx gltf-transform` phải chạy **bên trong** `art-blender/tools/` vì CLI được cài cục bộ ở đó, không cài global.

### Mẫu đầu file cho script mới (để import `_common`)

```python
import os, sys
SCRIPTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # .../art-blender/scripts
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

from _common.enable_gpu import enable_gpu
from _common.studio_lighting import clear_scene, add_three_point_lights, add_studio_world, \
    add_shadow_catcher, add_studio_camera
from _common.render_settings import setup_cycles_render, render_still, save_render_outputs
from _common.export_glb import export_glb
```

---

## 3. GPU

- Thiết bị Cycles phát hiện:
  - `NVIDIA GeForce RTX 4060 Laptop GPU` qua cả 2 backend **OPTIX** và **CUDA**
  - `AMD Ryzen 7 7435HS` (CPU)
- `enable_gpu()` chọn **OPTIX** và chỉ bật GPU, không bật CPU cùng lúc. Trên laptop, render chung CPU+GPU không nhanh hơn mà còn làm máy nóng.
- Khử nhiễu mặc định là **OpenImageDenoise chạy trên GPU** (`denoising_use_gpu=True`). Muốn khử nhiễu nhanh hơn một chút thì dùng `denoiser="OPTIX"`.
- Dòng log `WARNING HIPEW initialization failed` là **vô hại**: Blender chỉ báo là không có driver AMD HIP.

---

## 4. Thời gian render

Cảnh test: 512×512, 128 samples (adaptive), OIDN, AgX, nền trong suốt, có SSS và bump.

| Trường hợp | Thời gian |
|---|---|
| GPU OptiX: lần render **đầu tiên trên máy** (cache OptiX còn trống) | **29.4 s** (chỉ 1 lần) |
| GPU OptiX: render đầu tiên mỗi lần mở Blender | **5.1 – 8.5 s** (3 lần chạy: 8.53 / 5.51 / 5.09) |
| GPU OptiX: render lần 2 trong cùng phiên | **4.5 – 10.3 s** (dao động do laptop đổi mức điện/nhiệt) |
| GPU: chi phí cố định mỗi lần render (đo bằng 1 sample) | ~2.5 – 3 s (khởi tạo thiết bị, nạp cảnh, dựng BVH) |
| GPU, `use_persistent_data=True`, từ lần 2 | **~1.7 s** |
| GPU, so sánh denoiser (cùng phiên) | OIDN-GPU 4.5–5.0 s, OPTIX denoiser 3.6 s |
| **CPU** Ryzen 7 7435HS | **34.0 – 39.6 s** (4 lần chạy: 39.6 / 34.5 / 34.9 / 34.0) |
| Toàn bộ `test_render.py --cpu-compare --gpu-warm` | ~55 – 65 s |

GPU nhanh hơn CPU khoảng **4–7 lần**. Với cảnh có tóc/lông thật, nhiều đèn, ảnh 1024–2048 px, khoảng cách
này còn lớn hơn. Cache OptiX lưu ở `%LOCALAPPDATA%\NVIDIA\OptixCache` (~24 MB). Nếu xoá cache thì lần
render đầu lại mất ~30 s.

---

## 5. Kết quả file

| File | Dung lượng | Ghi chú |
|---|---|---|
| `pipeline-test_fuzzy-ball.png` | 180 KB | RGBA 8-bit |
| `pipeline-test_fuzzy-ball.webp` | **13.7 KB** | RGBA, quality 90; kênh alpha giống hệt PNG |
| `pipeline-test_fuzzy-ball.glb` (Draco level 6) | **34.4 KB** | 5 766 đỉnh / 11 520 tam giác (đã áp Subdivision) |
| `pipeline-test_fuzzy-ball_no-draco.glb` | 194.4 KB | để so sánh: Draco nén ~5.7 lần |
| `gltf-transform optimize --compress draco` (từ bản no-draco) | 35.1 KB | tương đương Draco của Blender |
| `gltf-transform optimize --compress meshopt` | 52.1 KB | meshopt giải nén nhanh hơn Draco trên web |

**Kiểm tra alpha** (do script đọc lại file sau khi lưu, PNG và WebP cho kết quả giống nhau):

- 4 kênh
- 70.1% pixel trong suốt hoàn toàn
- 20.2% pixel đặc hoàn toàn
- 9.7% pixel bán trong suốt: viền khử răng cưa và bóng mềm từ shadow catcher
- Góc ảnh: alpha = 1/255, coi như trong suốt

**`gltf-transform validate`:**

- File Draco: không có lỗi hay cảnh báo, chỉ có thông báo mức "info". Validator không giải nén được Draco, và các bufferView "unused" là chỗ trống Draco để lại theo chuẩn.
- File không nén: hoàn toàn sạch.

**Đánh giá bằng mắt** (đã xem PNG, WebP và bản CPU trên nền trắng, xanh ngọc, đen):

- Màu cam đào ấm, không cháy sáng (AgX).
- Viền lông (sheen) sáng mềm ở rìa phải.
- Hai mắt đen bóng, có catchlight sắc nét từ đèn key và softbox.
- Không có hạt nhiễu, không có vệt loang của bộ khử nhiễu.
- Viền nền trong suốt sạch, không có quầng trắng hay đen.
- Bản GPU và bản CPU giống nhau.

---

## 6. Các "bẫy" đã gặp (gotchas)

### Tải Blender

1. **`download.blender.org` và `blender.org` trả 403 (Cloudflare "Just a moment...")** cho curl, WebFetch
   và cả trình duyệt headless.
   - Cách xử lý: dùng mirror chính thức, cấu trúc thư mục giống hệt, có đủ file `.sha256`. Ví dụ:
     - `mirrors.ocf.berkeley.edu/blender/release/`
     - `ftp.nluug.nl/pub/graphics/blender/release/`
     - `mirror.clarkson.edu/blender/release/`
   - **Không** tìm cách vượt qua trang kiểm tra bot.
2. Giải nén zip bằng `tar.exe` có sẵn của Windows (`C:/Windows/System32/tar.exe -xf file.zip --strip-components=1 -C <đích>`).
   Lệnh này nhanh hơn `Expand-Archive` của PowerShell rất nhiều. Bản giải nén nặng ~930 MB.

### Chạy script

3. **Luôn dùng `--factory-startup`** để kết quả giống nhau ở mọi lần chạy, không phụ thuộc cài đặt người dùng.
   Ở chế độ `--background`, Preferences (nơi bật GPU) **không được lưu lại**. Vì vậy mỗi script phải gọi `enable_gpu()`.
4. **Tham số của script đặt sau `--`**. Blender bỏ qua phần đó; script tự đọc `sys.argv[sys.argv.index("--")+1:]`.
5. **`sys.path`**: Blender không tự thêm thư mục chứa script vào đường dẫn import, nên phải tự `sys.path.insert(...)`
   (xem mẫu ở mục 2). Blender có đặt biến `__file__` khi chạy bằng `--python`.
6. Blender **bỏ qua biến môi trường `PYTHONPATH`**, trừ khi chạy kèm `--python-use-system-env`.
   Máy này **không cài Python hệ thống**: lệnh `python` chỉ mở Microsoft Store. Muốn chạy Python ngoài Blender thì dùng
   `E:/Tools/Blender/5.2.3/5.2/python/bin/python.exe`. Module `bpy` chỉ có khi chạy bên trong Blender.
7. **Python 3.13** (Blender 5.2), trong khi Blender 4.5 dùng 3.11. Thư viện biên dịch sẵn (.pyd/wheel) cho 3.11 sẽ không chạy được.
8. Đường dẫn Windows: trong Git Bash dùng dấu `/` (ví dụ `"E:/Tools/..."`). Trong PowerShell phải có `&` trước đường dẫn exe có dấu ngoặc kép.
9. Blender tự tạo `scripts/_common/__pycache__/` khi import, và tạo `*.blend1` (bản backup) mỗi khi lưu đè file `.blend`.
   Cả hai đã có trong `art-blender/.gitignore`.
10. Ở chế độ background, Blender 5.x **không in tiến độ từng sample** (`Fra: ... Sample x/128`).
    Muốn biết thời gian thì đo bằng `time.perf_counter()`, như `render_still()` đang làm.

### API Blender 5.x (khác với hướng dẫn cũ trên mạng)

11. `Material.use_nodes` và `World.use_nodes` đã **deprecated** (báo sẽ bị xoá ở bản 6.0). Material và world mới đã có sẵn `node_tree`.
    Code chỉ bật `use_nodes` khi `node_tree is None`.
12. Phải đặt `image_settings.media_type = "IMAGE"` **trước** `file_format = "PNG"/"WEBP"`. Định dạng có sẵn: PNG, WEBP, AVIF, JPEG, EXR...
13. Tên socket của Principled BSDF (v2):
    - Lớp chính: `Base Color`, `Diffuse Roughness`
    - Specular: `Specular IOR Level`
    - Subsurface: `Subsurface Weight`, `Subsurface Radius`, `Subsurface Scale`
    - Sheen: `Sheen Weight`, `Sheen Roughness`, `Sheen Tint`
    - Coat: `Coat Weight`, `Coat Roughness`
    - Emission: `Emission Color`, `Emission Strength`
    - Không còn `Specular`, `Sheen` hay `Clearcoat` kiểu cũ.
14. Node **Mix** (`ShaderNodeMix`) có nhiều socket **trùng tên** (`A`/`B` cho float, vector và màu). Vì vậy `inputs["A"]` dễ nối nhầm socket ẩn.
    Hãy dùng chỉ số, hoặc dùng node khác như Vector Math ADD (cách `studio_lighting.py` đang làm).
15. Các enum "động" (`cycles.denoiser`, `compute_device_type`, `view_transform`, `look`) trả về `enum_items` **rỗng** khi đọc qua `bl_rna`.
    Mẹo để xem danh sách hợp lệ: gán một giá trị sai, rồi đọc thông báo `TypeError`.
    - Look của AgX: `None`, `AgX - Punchy`, `AgX - Greyscale`
    - Các mức tương phản: `AgX - Very High / High / Medium High / Base / Medium Low / Low / Very Low Contrast`
16. Đèn: bật/tắt bóng đổ trong Cycles bằng `light.use_shadow`. Thuộc tính `light.cycles.cast_shadow` cũ không còn.
    Có thêm light linking: `obj.light_linking.receiver_collection` / `blocker_collection`.
17. `bmesh.ops.create_icosphere(bm, subdivisions=, radius=)`. Tham số là `radius`, không phải `diameter` như bản cũ.
    `calc_uvs=True` chỉ tạo UV khi mesh **đã có sẵn** UV layer. Quả cầu test hiện **không có UV**, nên mascot thật phải tự unwrap UV trước khi bake.
18. `mesh.shade_smooth()` dùng thẳng trên dữ liệu mesh, không cần context như `bpy.ops.object.shade_smooth()`.

### Ánh sáng, màu sắc, vật liệu (tinh chỉnh qua 3 vòng render thử)

19. **Đèn rim + shadow catcher:** rim đứng sau nhân vật nên bóng của nó đổ thẳng về phía camera. Kết quả là một mảng xám lớn phủ nửa dưới ảnh, alpha ở góc ảnh = 0.13.
    → `add_three_point_lights(rim_casts_shadow=False)` là mặc định. Sau khi sửa, alpha ở góc ảnh ≈ 0.
20. **AgX làm màu nhạt (pastel)**, Sheen Weight 1.0 còn phủ thêm lớp trắng → màu cam bị thành màu da nhợt.
    → Dùng màu gốc rực hơn màu mong muốn (màu trong node là **linear**, không phải hex sRGB), Sheen Weight 0.7 với tint cam,
    và look `AgX - Punchy` (vẫn là view transform AgX).
21. **World có chân trời quá sáng** → mắt đen phản chiếu dải sáng xám, trông như bi sắt.
    → Giảm `horizon_color` xuống 0.55, `sky_color` xuống 0.3.
22. **Noise bump quá mịn** (scale 90 trên khối cầu 1 m) nhỏ hơn 1 pixel ở ảnh 512 px, nên bộ khử nhiễu xoá mất.
    → Dùng scale ~45 và strength 0.35. Ảnh lớn hơn thì tăng scale.
23. ColorRamp loang màu: 2 mốc đặt **gần** nhau (0.42/0.58) sẽ tạo vệt loang lổ. Đặt **xa** nhau (0.2/0.8) thì chuyển màu êm.

### Ảnh WebP

24. Blender 5.2 lưu WebP trực tiếp (`file_format="WEBP"`), giữ đủ **RGBA**.
    - `quality=90`: màu nén có mất mát nhẹ, còn alpha được giữ chính xác (thống kê alpha y hệt bản PNG).
    - `quality=100`: lossless.
    - `save_render()` áp view transform (AgX + look), nên màu trong file đúng như màu xem trong Blender.
    - Đã kiểm tra bằng sharp: `hasAlpha=true`, 4 kênh.

### Xuất GLB

25. **Vật liệu procedural KHÔNG xuất sang glTF.** Base Color lấy từ ColorRamp và Normal lấy từ Bump đều bị bỏ.
    File `.glb` của quả bóng test **không có `baseColorFactor`**, nên trên web thân sẽ hiện **màu trắng**, chỉ còn lớp sheen cam.
    - `export_glb()` giờ tự in **CẢNH BÁO** cho trường hợp này.
    - Model cho web cần **bake** màu và normal ra ảnh texture (cần UV), hoặc dùng màu cố định.
    - Những gì **có** được xuất:
      - Sheen → `KHR_materials_sheen`
      - Coat → `KHR_materials_clearcoat`
      - Specular → `KHR_materials_specular`
26. Material mặc định có `doubleSided: true`. Với khối kín, nên đặt `mat.use_backface_culling = True` trước khi xuất để GPU web đỡ phải vẽ.
27. `export_apply=True` áp dụng modifier Subdivision. Quả cầu test từ 642 đỉnh tăng lên 3 842 đỉnh (thân). Với web, nên giảm level hoặc làm bản low-poly riêng.
28. File Draco cần `DRACOLoader` bên three.js. Bộ giải nén ~300 KB, tải một lần rồi được cache. Có thể thay bằng meshopt:
    - Bỏ nén khi xuất từ Blender, rồi chạy `gltf-transform optimize ... --compress meshopt`.
    - meshopt giải nén nhanh hơn nhưng file lớn hơn (52 KB so với 35 KB ở cảnh test).
    - **Gợi ý quy trình web:** xuất từ Blender không nén, rồi để `gltf-transform optimize` lo nén mesh và nén/đổi cỡ texture (dùng sharp).
29. `sharp` 0.35 chặn `require('sharp/package.json')` (do trường `exports`). Muốn xem phiên bản thì dùng `require('sharp').versions`.

### Hiệu năng

30. Lần render GPU **đầu tiên trên máy** mất ~29 s để dựng cache OptiX. Các lần sau ~5 s. Mỗi lần render tốn ~3 s chi phí cố định.
    Khi render hàng loạt (nhiều góc, nhiều biểu cảm) trong **một** lần chạy Blender, dùng `setup_cycles_render(persistent_data=True)`: từ lần 2 chỉ còn ~1.7 s/ảnh.
31. Thời gian render trên laptop dao động ±50% giữa các lần chạy (GPU đổi mức điện năng, nhiệt độ). Khi so sánh nên chạy 2–3 lần.

---

## 7. Mascot Corgi — ghi chú kỹ thuật (2026-10-29)

Lệnh chạy và cấu trúc script: xem `README.md`, mục "Mascot Corgi". Dưới đây là những điều đo được / bẫy đã gặp.

### Thời gian (RTX 4060 Laptop, Ryzen 7 7435HS)

| Việc | Thời gian |
|---|---|
| Dựng 1 tư thế toàn thân (SDF → lưới, CPU, 1 lõi), chất lượng thật | ~2.5–4 phút (chạy 1 mình); ~5–6 phút khi 6 tiến trình chạy cùng lúc |
| Dựng 1 tư thế, `--draft` (lưới thưa 1.5 lần) | ~1.5–2 phút |
| Dựng ảnh đầu (pose `head`) | ~30–70 s |
| Render 1024 px, 192 samples, sau khi dựng xong | ~5–20 s |
| 13 tư thế + ảnh đầu, 3 tiến trình song song (`render_mascot_all.mjs`) | ~25–35 phút |

### Bẫy đã gặp

32. **Modifier Subdivision Surface làm bước "Synchronizing data" của Cycles chậm khủng khiếp**: 40–90 s mỗi khi
    đổi cảnh, với ~400k quad. Tắt Subdivision thì chỉ còn 0.3–3.5 s. Đã so A/B ở ảnh 1024 px: lưới Surface Nets
    (voxel 6.5 mm, đã chiếu đúng lên bề mặt) gần như giống hệt bản có Subdivision. → `sdf_toolkit.USE_SUBDIVISION = False`.
    Cách tìm ra: chạy Blender với `--debug-cycles`, đọc dòng "Total time spent synchronizing data".
33. Thử nghi ngờ "mắt phát sáng (emission) biến mọi tam giác thành đèn" → **không phải** nguyên nhân chậm.
    Vẫn đặt `material.emission_sampling = 'NONE'` cho mắt để chắc chắn mắt không bị tính là nguồn sáng.
34. **Shadow catcher 20 m** bắt cả những vệt mờ ở tận chân trời → "bóng ma" mờ trong ảnh nền trong suốt.
    Còn **shadow catcher 4 m** thì cắt bóng dài thành cạnh thẳng. Cách giải quyết: **light linking**
    (`light.light_linking.receiver_collection` + `collection_objects[i].light_linking.link_state = 'EXCLUDE'/'INCLUDE'`).
    - Đèn chính KHÔNG chiếu lên mặt bắt bóng → mặt bắt bóng chỉ còn nhận ánh sáng trời → quầng bóng rất mềm.
    - Đã thử thêm 1 đèn tròn trên đỉnh đầu CHỈ chiếu mặt bắt bóng: cái đầu chibi to che đèn → vũng bóng đen
      rộng, xấu. Bỏ đèn đó.
    - Thay bằng **bóng giả (blob shadow)**: đĩa elip Principled màu đen, Alpha mờ dần ra mép, chỉ camera nhìn thấy.
      (Lưu ý: Transparent + Emission cường độ 0 KHÔNG được — Cycles bỏ qua closure phát sáng 0, đĩa trong suốt hẳn.)
    - Khi xuất web, `tools/shadow_clean.mjs` làm bóng mờ dần theo elip quanh chân và về 0 trong 12 px sát mép ảnh.
    - Xem `mascot_stage.contact_shadow()` / `add_blob_shadow()`.
    - Camera thấp (6°) làm đĩa sàn bị dẹt: đĩa bán kính 0.5 m chỉ cao ~20 px trên ảnh 512 px, phần lớn nằm sau bàn chân.
35. Đèn AREA mặc định **hiện trong phản chiếu**. Đèn hắt dưới hình vuông thành đốm VUÔNG trong mắt bóng
    → `obj.visible_glossy = False` + `light.shape = 'DISK'`. Tất cả đèn đặt `visible_camera = False`.
36. **Rãnh hẹp hơn ~2 ô lưới** (vd rãnh nhân trung 7.5 mm trên lưới 6.5 mm) bị lỗ chỗ như vết khâu → vẽ bằng màu (mask) thay vì khoét.
37. **Hốc lòng tai** phải đặt theo độ dày thật của tai (`ear_r_base * ear_thick`). Đặt sâu quá thì hốc thành "bọt khí"
    ẩn trong tai, chỉ làm lõm lấm tấm ở ngọn tai. Mask màu lòng tai chỉ tô ở MẶT TRƯỚC (ngọn tai mỏng, mặt sau dễ dính màu).
38. Tay chibi quá ngắn để chạm mũ khi chào → IK 2 khớp cho phép tay **dài ra** khi mục tiêu xa hơn 93% chiều dài tay
    (`arm_chain` trong `corgi_builder.py`). Ảnh hoạt hình nên không ai thấy tay dài hơn.
39. Dựng hình SDF chỉ dùng 1 lõi CPU (numpy) → chạy **nhiều tiến trình Blender song song** (mỗi tiến trình vài tư thế).
    Mỗi tiến trình chỉ chiếm ~1 GB VRAM khi render. 6 tiến trình cùng lúc vẫn ổn trên card 8 GB / RAM 24 GB.
40. Python của Blender buffer stdout khi chuyển hướng ra file → log chỉ hiện khi tiến trình kết thúc.
    Muốn theo dõi tiến độ thì xem file ảnh xuất hiện trong thư mục output.
41. **Chạy song song phải giới hạn luồng của numpy** (`OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1`).
    Nếu không, mỗi tiến trình Blender mở ~16 luồng BLAS. 3–4 tiến trình giành nhau 8 lõi + hết RAM (mỗi tiến trình ~5 GB):
    - render 1 ảnh 512 px mất 5 phút (bình thường vài giây);
    - 43 phút chưa xong tư thế đầu tiên.

    `render_mascot_all.mjs` đã tự đặt các biến này. Chạy tay nhiều tiến trình thì tự `export` trước.
