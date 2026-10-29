"""
render_settings.py — Cấu hình render Cycles và lưu ảnh PNG / WebP.

CÁC KHÁI NIỆM:
    Cycles          : bộ render "path tracing" của Blender — ánh sáng vật lý, đẹp, chậm hơn EEVEE.
    samples         : số tia sáng bắn cho mỗi pixel. Nhiều hơn = ít nhiễu hơn nhưng lâu hơn.
                      Có khử nhiễu (denoise) thì 128 samples đã đủ sạch cho ảnh 512–1024 px.
    denoise         : bộ lọc AI xoá hạt nhiễu sau khi render.
                        - OPENIMAGEDENOISE (OIDN, của Intel): chất lượng cao, chạy được cả CPU lẫn
                          GPU NVIDIA đời mới → mặc định của dự án.
                        - OPTIX (của NVIDIA): rất nhanh, chỉ chạy trên GPU NVIDIA.
    AgX             : "view transform" — cách đổi ánh sáng vật lý (rất sáng) thành màu màn hình.
                      AgX giữ màu tươi mà không bị cháy sáng/bệt màu (thay cho "Filmic" cũ).
    film_transparent: nền trong suốt (kênh alpha) → ảnh PNG/WebP đặt lên web trên mọi màu nền.

CÁCH DÙNG:
    from _common.render_settings import setup_cycles_render, render_still, save_render_outputs
    setup_cycles_render(samples=128, resolution=(512, 512))
    seconds = render_still()
    paths = save_render_outputs("E:/.../renders/abc/ten-anh")   # → ten-anh.png + ten-anh.webp
"""

import os
import time

import bpy


def setup_cycles_render(scene=None, samples=128, resolution=(512, 512), transparent=True,
                        denoiser="OPENIMAGEDENOISE", denoise_on_gpu=True,
                        view_transform="AgX", look="None", exposure=0.0,
                        adaptive_threshold=0.01, max_bounces=8, persistent_data=False):
    """
    Đặt toàn bộ thông số render cho Cycles.

    denoiser: "OPENIMAGEDENOISE" | "OPTIX" | None (tắt khử nhiễu).
              Nếu chọn OPTIX mà máy không có GPU NVIDIA → tự đổi về OIDN.
              (Đo trên RTX 4060: OPTIX nhanh hơn OIDN-GPU ~1 s/ảnh; OIDN giữ chi tiết tốt hơn.)
    look    : "None" hoặc các look của AgX: "AgX - Punchy", "AgX - Base Contrast",
              "AgX - High Contrast", "AgX - Low Contrast"... (Punchy = rực + tương phản hơn).
    persistent_data: True = giữ cảnh đã nạp trên GPU giữa các lần render trong CÙNG một lần
              chạy Blender. Dùng khi render hàng loạt (nhiều góc/biểu cảm): lần 2 trở đi
              nhanh hơn nhiều (đo được 4.5 s → 1.7 s/ảnh 512 px).
    """
    scene = scene or bpy.context.scene
    scene.render.engine = "CYCLES"
    cycles = scene.cycles

    # --- Chất lượng / tốc độ ---
    cycles.samples = samples
    cycles.use_adaptive_sampling = True          # dừng sớm ở vùng đã sạch nhiễu → nhanh hơn
    cycles.adaptive_threshold = adaptive_threshold
    cycles.max_bounces = max_bounces             # số lần tia sáng được nảy
    cycles.use_light_tree = True                 # chọn đèn thông minh, giảm nhiễu khi nhiều đèn
    scene.render.use_persistent_data = persistent_data

    # --- Khử nhiễu ---
    cycles.use_denoising = denoiser is not None
    if denoiser:
        try:
            cycles.denoiser = denoiser
        except TypeError:                        # OPTIX không có → dùng OIDN
            print(f"[render_settings] Denoiser {denoiser} không khả dụng → dùng OPENIMAGEDENOISE")
            cycles.denoiser = "OPENIMAGEDENOISE"
        cycles.denoising_input_passes = "RGB_ALBEDO_NORMAL"  # dùng thêm màu gốc + pháp tuyến → giữ chi tiết
        cycles.denoising_prefilter = "ACCURATE"
        cycles.denoising_quality = "HIGH"
        cycles.denoising_use_gpu = denoise_on_gpu

    # --- Kích thước ảnh + nền trong suốt ---
    scene.render.resolution_x, scene.render.resolution_y = resolution
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = transparent

    # --- Quản lý màu ---
    scene.display_settings.display_device = "sRGB"
    scene.view_settings.view_transform = view_transform
    scene.view_settings.look = look
    scene.view_settings.exposure = exposure
    scene.view_settings.gamma = 1.0
    return scene


def render_still(scene=None, label="render"):
    """Render 1 khung hình (chưa lưu file). Trả về số giây đã chạy."""
    scene = scene or bpy.context.scene
    start = time.perf_counter()
    bpy.ops.render.render(write_still=False, scene=scene.name)
    seconds = time.perf_counter() - start
    print(f"[render_settings] {label}: {seconds:.2f} s "
          f"({scene.render.resolution_x}x{scene.render.resolution_y}, "
          f"{scene.cycles.samples} samples, device={scene.cycles.device})")
    return seconds


def _configure_image_format(image_settings, file_format, color_depth="8", quality=90, compression=15):
    """Đặt định dạng ảnh. Blender 5.x bắt buộc chọn media_type='IMAGE' trước khi chọn PNG/WEBP."""
    image_settings.media_type = "IMAGE"
    image_settings.file_format = file_format
    image_settings.color_mode = "RGBA"           # RGBA = có kênh trong suốt (alpha)
    if file_format == "PNG":
        image_settings.color_depth = color_depth  # "8" cho web; "16" nếu còn chỉnh màu sau
        image_settings.compression = compression  # 0–100: nén không mất dữ liệu, chỉ ảnh hưởng tốc độ/size
    elif file_format == "WEBP":
        image_settings.quality = quality          # 100 = lossless; 90 = lossy nhẹ, nhỏ hơn nhiều


def save_render_outputs(base_path_no_ext, scene=None, png=True, webp=True,
                        webp_quality=90, png_color_depth="8"):
    """
    Lưu ảnh vừa render ("Render Result") ra PNG và/hoặc WebP, CÓ kênh alpha.

    base_path_no_ext: đường dẫn KHÔNG có đuôi, ví dụ ".../renders/_pipeline-test/fuzzy-ball"
    Trả về danh sách đường dẫn đã lưu.

    Lưu ý: save_render() áp dụng view transform (AgX) của scene → màu file = màu xem trong Blender.
    """
    scene = scene or bpy.context.scene
    result = bpy.data.images.get("Render Result")
    if result is None:
        raise RuntimeError("Chưa có 'Render Result' — hãy gọi render_still() trước.")

    os.makedirs(os.path.dirname(os.path.abspath(base_path_no_ext)), exist_ok=True)
    settings = scene.render.image_settings
    saved = []

    if png:
        path = base_path_no_ext + ".png"
        _configure_image_format(settings, "PNG", color_depth=png_color_depth)
        result.save_render(filepath=path, scene=scene)
        saved.append(path)
    if webp:
        path = base_path_no_ext + ".webp"
        _configure_image_format(settings, "WEBP", quality=webp_quality)
        result.save_render(filepath=path, scene=scene, quality=webp_quality)
        saved.append(path)

    for p in saved:
        print(f"[render_settings] Đã lưu {p} ({os.path.getsize(p) / 1024:.1f} KB)")
    return saved
