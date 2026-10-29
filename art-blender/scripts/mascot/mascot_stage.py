"""
mascot_stage.py — "Sân khấu" dùng chung cho mọi lần render mascot: đèn, world, camera, căn khung.

    setup_stage(size, samples)       → (rig, cam, catcher)   dựng GPU + Cycles + đèn + bóng đổ + camera
    collect_points(objects)          → các đỉnh (thế giới) của object, để căn khung
    frame_camera(cam, pts, az, el)   → camera TỰ căn cho mọi điểm vừa khung (dùng cho ảnh đầu, bảng concept)
    fixed_camera(cam, box, az, el)   → camera CỐ ĐỊNH theo 1 hộp cho trước (mọi pose cùng tỉ lệ → trên web
                                       đổi pose không làm mascot to/nhỏ đột ngột)

Quy ước góc: phương vị (azimuth) 0 = chính diện; dương = camera lệch sang BÊN TRÁI nhân vật
(bên phải người xem). Góc ngẩng (elevation) dương = camera cao hơn, nhìn xuống.
"""

import math

import bpy
import numpy as np
from mathutils import Vector

from _common.enable_gpu import enable_gpu
from _common.studio_lighting import clear_scene, add_three_point_lights, add_studio_world, \
    add_shadow_catcher, add_studio_camera, point_at
from _common.render_settings import setup_cycles_render


def setup_stage(size, samples):
    """Sân khấu chung: GPU, Cycles, world studio, 3 đèn + đèn hắt, shadow catcher, camera."""
    clear_scene()
    gpu = enable_gpu(verbose=False)
    print(f"[stage] GPU: {gpu['backend']} {gpu['active_devices']}")
    setup_cycles_render(samples=samples, resolution=(size, size), look="AgX - Punchy",
                        persistent_data=True, max_bounces=10, exposure=-0.75)
    bpy.context.scene.cycles.adaptive_threshold = 0.008
    # trần studio xám TRUNG TÍNH (không xanh) → vùng tối của lông trắng không bị ngả xám xanh
    add_studio_world(strength=0.42, softbox_strength=3.5, sky_color=(0.32, 0.32, 0.33))
    rig = bpy.data.objects.new("LightRig", None)
    bpy.context.scene.collection.objects.link(rig)
    lights = add_three_point_lights(target=(0.0, 0.0, 1.0), distance=6.0, brightness=1.0)
    # đèn phụ (fill) bớt xanh lạnh → lông trắng không bị xám tím trong vùng tối
    lights["fill"].data.color = (0.96, 0.96, 1.0)
    for light in lights.values():
        light.parent = rig
    # đèn hắt nhẹ từ dưới-trước (bounce) cho vùng dưới cằm/mũ không quá tối
    bounce = bpy.data.lights.new("Light_Bounce", "AREA")
    bounce.energy, bounce.size, bounce.color = 140.0, 4.0, (1.0, 0.95, 0.9)
    bounce.shape = "DISK"
    bob = bpy.data.objects.new("Light_Bounce", bounce)
    bob.location = (0.5, -5.0, -0.6)
    point_at(bob, (0, 0, 1.0))
    bounce.use_shadow = False
    # không cho đèn này hiện trong phản chiếu (trước đây thành đốm VUÔNG trong mắt)
    bob.visible_glossy = False
    bpy.context.scene.collection.objects.link(bob)
    bob.parent = rig
    catcher = add_shadow_catcher(z=0.0)
    cam = add_studio_camera(location=(0, -7, 1.0), target=(0, 0, 1.0), lens_mm=85.0)
    return rig, cam, catcher


def collect_points(objects, min_z=None, step=7):
    """Đỉnh (toạ độ thế giới, lấy 1/step) của các object MESH. min_z: chỉ lấy điểm cao hơn mức này."""
    pts = []
    for obj in objects:
        if obj.type != "MESH":
            continue
        n = len(obj.data.vertices)
        co = np.empty(n * 3, dtype=np.float32)
        obj.data.vertices.foreach_get("co", co)
        co = co.reshape(-1, 3)[::step].astype(np.float64)
        mw = np.array(obj.matrix_world)
        w = co @ mw[:3, :3].T + mw[:3, 3]
        if min_z is not None:
            w = w[w[:, 2] > min_z]
        if len(w):
            pts.append(w)
    return np.concatenate(pts, axis=0)


def _direction(azimuth, elevation):
    az, el = math.radians(azimuth), math.radians(elevation)
    return np.array([math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)])


def frame_camera(cam, points, azimuth, elevation, margin=0.07, lens=85.0):
    """Đặt camera theo góc (phương vị, ngẩng) sao cho mọi điểm nằm gọn trong khung, cách mép `margin`."""
    cam.data.lens = lens
    tan_half = (cam.data.sensor_width / 2) / lens
    target = (points.min(axis=0) + points.max(axis=0)) / 2
    direction = _direction(azimuth, elevation)
    d = 6.0
    for _ in range(8):
        cam.location = Vector(target + direction * d)
        point_at(cam, Vector(target))
        bpy.context.view_layer.update()
        inv = np.array(cam.matrix_world.inverted())
        pc = points @ inv[:3, :3].T + inv[:3, 3]
        depth = -pc[:, 2]
        x, y = pc[:, 0] / depth, pc[:, 1] / depth
        cx, cy = (x.min() + x.max()) / 2, (y.min() + y.max()) / 2
        half = max(x.max() - x.min(), y.max() - y.min()) / 2
        mw = np.array(cam.matrix_world)
        right, up = mw[:3, 0], mw[:3, 1]
        target = target + (right * cx + up * cy) * d
        d *= half / (tan_half * (1 - 2 * margin))
    cam.location = Vector(target + direction * d)
    point_at(cam, Vector(target))
    return target, d


def fixed_camera(cam, z_bottom, z_top, azimuth, elevation, lens=85.0):
    """
    Camera cố định: khung vuông phủ từ z_bottom tới z_top (theo chiều dọc), tâm ở trục giữa nhân vật.
    Cùng z_bottom/z_top cho mọi pose → mascot luôn cùng kích thước trên ảnh.
    """
    cam.data.lens = lens
    tan_half = (cam.data.sensor_width / 2) / lens
    half = (z_top - z_bottom) / 2
    target = np.array([0.0, 0.0, (z_top + z_bottom) / 2])
    d = half / tan_half
    direction = _direction(azimuth, elevation)
    cam.location = Vector(target + direction * d)
    point_at(cam, Vector(target))
    return target, d
