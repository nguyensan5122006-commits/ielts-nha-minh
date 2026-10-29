"""
Gói `_common` — các hàm Python dùng chung cho mọi script Blender của dự án.

File này có mặt để Python coi thư mục `_common/` là một "package"
(gói), nhờ đó các script khác có thể viết:

    from _common.enable_gpu import enable_gpu
    from _common.render_settings import setup_cycles_render

ĐIỀU KIỆN: thư mục `scripts/` (thư mục CHA của `_common/`) phải nằm trong
`sys.path`. Blender KHÔNG tự thêm nó, nên mỗi script phải tự thêm ở đầu file.
Đoạn mẫu (copy vào đầu mọi script mới, ví dụ scripts/mascot/xxx.py):

    import os, sys
    SCRIPTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if SCRIPTS_DIR not in sys.path:
        sys.path.insert(0, SCRIPTS_DIR)

(`__file__` là đường dẫn file script đang chạy; Blender có đặt biến này khi
chạy bằng `blender --background --python <script>`.)

Danh sách module:
    enable_gpu.py       – bật GPU cho Cycles (ưu tiên OptiX, sau đó CUDA)
    studio_lighting.py  – dọn cảnh, 3 đèn area mềm, world "studio", camera, shadow catcher
    render_settings.py  – cấu hình Cycles + AgX + nền trong suốt + khử nhiễu, lưu PNG/WebP
    export_glb.py       – xuất .glb (tuỳ chọn nén Draco) cho web
    test_render.py      – script kiểm tra toàn bộ pipeline (render thử + xuất GLB)
"""
