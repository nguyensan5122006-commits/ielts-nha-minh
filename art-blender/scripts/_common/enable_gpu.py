"""
enable_gpu.py — Bật render bằng GPU cho Cycles.

VÌ SAO CẦN FILE NÀY?
    Mặc định Cycles render bằng CPU. Muốn dùng card NVIDIA phải làm 2 bước:
      1) Trong Preferences (cài đặt của Blender) chọn "backend" tính toán:
         - OPTIX: dùng nhân RT của card RTX → nhanh nhất trên RTX 4060.
         - CUDA : chạy được trên mọi card NVIDIA, chậm hơn OptiX một chút.
         rồi tick chọn thiết bị (device) GPU.
      2) Trong Scene đặt `scene.cycles.device = 'GPU'`.
    Khi chạy `blender --background` (không giao diện) Preferences không được
    lưu lại, nên MỖI script phải tự gọi enable_gpu() ở đầu.

CÁCH DÙNG:
    from _common.enable_gpu import enable_gpu
    info = enable_gpu()            # tự thử OPTIX → CUDA → (không có thì) CPU
    print(info["backend"], info["active_devices"])

    from _common.enable_gpu import use_cpu_only
    use_cpu_only()                 # ép render CPU (để so sánh tốc độ)
"""

import bpy


def _cycles_preferences():
    """Lấy object Preferences của add-on Cycles (nơi chọn OPTIX/CUDA và thiết bị)."""
    return bpy.context.preferences.addons["cycles"].preferences


def list_devices(verbose=True):
    """Trả về danh sách mọi thiết bị Cycles đang thấy: [(tên, loại, đang_dùng), ...]."""
    prefs = _cycles_preferences()
    prefs.refresh_devices()  # quét lại phần cứng
    devices = [(d.name, d.type, bool(d.use)) for d in prefs.devices]
    if verbose:
        print("[enable_gpu] Thiết bị Cycles phát hiện được:")
        for name, dev_type, used in devices:
            print(f"    - {name:<45} type={dev_type:<6} use={used}")
    return devices


def enable_gpu(preferred_backends=("OPTIX", "CUDA"), also_use_cpu=False, scene=None, verbose=True):
    """
    Bật GPU cho Cycles.

    Tham số:
        preferred_backends: thứ tự backend muốn thử. Mặc định OPTIX trước, CUDA sau.
        also_use_cpu: True = cho CPU render cùng GPU (thường KHÔNG nhanh hơn trên laptop,
                      còn làm máy nóng → để False).
        scene: scene cần bật GPU (mặc định scene hiện tại).

    Trả về dict:
        {"device": "GPU"|"CPU", "backend": "OPTIX"|"CUDA"|"NONE",
         "active_devices": [tên thiết bị đang dùng], "all_devices": [...]}
    """
    scene = scene or bpy.context.scene
    prefs = _cycles_preferences()

    for backend in preferred_backends:
        # Gán backend. Nếu bản Blender/driver không hỗ trợ → TypeError → thử cái tiếp theo.
        try:
            prefs.compute_device_type = backend
        except TypeError:
            if verbose:
                print(f"[enable_gpu] Backend {backend} không có trong bản Blender này, bỏ qua.")
            continue

        prefs.refresh_devices()
        gpu_devices = [d for d in prefs.devices if d.type == backend]
        if not gpu_devices:
            if verbose:
                print(f"[enable_gpu] Backend {backend}: không tìm thấy GPU nào.")
            continue

        # Bật GPU của backend này; CPU chỉ bật nếu also_use_cpu=True.
        for d in prefs.devices:
            d.use = (d.type == backend) or (also_use_cpu and d.type == "CPU")

        scene.cycles.device = "GPU"
        active = [d.name for d in prefs.devices if d.use]
        if verbose:
            print(f"[enable_gpu] ĐÃ BẬT GPU — backend={backend}, thiết bị: {active}")
            list_devices(verbose=True)
        return {
            "device": "GPU",
            "backend": backend,
            "active_devices": active,
            "all_devices": [(d.name, d.type) for d in prefs.devices],
        }

    # Không có GPU dùng được → quay về CPU (vẫn render được, chỉ chậm hơn).
    return use_cpu_only(scene=scene, verbose=verbose)


def use_cpu_only(scene=None, verbose=True):
    """Ép Cycles render bằng CPU (dùng để so sánh hoặc khi GPU lỗi)."""
    scene = scene or bpy.context.scene
    prefs = _cycles_preferences()
    try:
        prefs.compute_device_type = "NONE"
    except TypeError:
        pass
    scene.cycles.device = "CPU"
    if verbose:
        print("[enable_gpu] Đang dùng CPU để render.")
    return {
        "device": "CPU",
        "backend": "NONE",
        "active_devices": ["CPU"],
        "all_devices": [(d.name, d.type) for d in prefs.devices],
    }
