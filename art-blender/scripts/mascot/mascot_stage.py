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
    catcher = add_shadow_catcher(z=0.0, size=6.0)
    blob = contact_shadow(catcher, [lights["key"], lights["fill"], lights["rim"], bob])
    catcher["blob"] = blob.name        # để script ẩn/hiện bóng giả cùng mặt bắt bóng
    for obj in bpy.data.objects:
        if obj.type == "LIGHT":
            obj.visible_camera = False      # đèn không bao giờ hiện trực tiếp trong ảnh
    cam = add_studio_camera(location=(0, -7, 1.0), target=(0, 0, 1.0), lens_mm=85.0)
    return rig, cam, catcher


def contact_shadow(catcher, main_lights):
    """
    Bóng đổ GỌN dưới chân (thay cho bóng dài của đèn chính). Gồm 2 lớp:

    1) "Light linking" của Cycles: 4 đèn chiếu nhân vật KHÔNG chiếu xuống mặt bắt bóng (EXCLUDE), nên không có
       bóng dài kéo tới mép ảnh (trên web ảnh bị cắt ở mép thành mảng xám vuông). Mặt bắt bóng chỉ còn nhận ánh
       sáng trời (world) → một quầng bóng rất mềm, tự nhiên.
       (Đã thử thêm đèn tròn trên đỉnh đầu chỉ chiếu mặt bắt bóng: cái đầu to che đèn → vũng bóng đen rộng, xấu.)
    2) Một "bóng giả" (blob shadow): đĩa elip màu đen trong suốt dần ra mép, nằm sát sàn dưới chân, chỉ camera
       nhìn thấy. Giúp nhân vật "đứng" chắc trên sàn, điều chỉnh độ đậm/độ rộng dễ dàng.
    Nhân vật vẫn tự đổ bóng lên chính nó (dưới vành mũ, dưới cằm...) như bình thường.
    """
    excl = bpy.data.collections.new("LL_NotCatcher")
    excl.use_fake_user = True          # giữ collection khi lưu .blend (không có người dùng → bị xoá khi lưu)
    excl.objects.link(catcher)
    for item in excl.collection_objects:
        item.light_linking.link_state = "EXCLUDE"
    for light in main_lights:
        light.light_linking.receiver_collection = excl
    return add_blob_shadow()


def add_blob_shadow(radius=(0.66, 0.50), center=(0.0, -0.03), opacity=0.55, name="BlobShadow"):
    """Đĩa bóng giả: tâm đậm `opacity`, mờ dần về 0 ở mép elip bán kính `radius` (m)."""
    mesh = bpy.data.meshes.new(name)
    n = 64
    verts = [(0.0, 0.0, 0.0)] + [(math.cos(2 * math.pi * i / n), math.sin(2 * math.pi * i / n), 0.0) for i in range(n)]
    faces = [(0, 1 + i, 1 + (i + 1) % n) for i in range(n)]
    mesh.from_pydata(verts, [], faces)
    obj = bpy.data.objects.new(name, mesh)
    obj.location = (center[0], center[1], 0.003)
    obj.scale = (radius[0], radius[1], 1.0)
    for attr in ("visible_shadow", "visible_diffuse", "visible_glossy", "visible_transmission", "visible_volume_scatter"):
        setattr(obj, attr, False)       # chỉ camera nhìn thấy; không đổ bóng, không phản chiếu
    mat = bpy.data.materials.new("M_BlobShadow")
    if mat.node_tree is None:
        mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    tc = nt.nodes.new("ShaderNodeTexCoord")
    length = nt.nodes.new("ShaderNodeVectorMath")
    length.operation = "LENGTH"
    nt.links.new(tc.outputs["Object"], length.inputs[0])          # 0 ở tâm → 1 ở mép (toạ độ trước khi scale)
    fade = nt.nodes.new("ShaderNodeMapRange")
    fade.interpolation_type = "SMOOTHERSTEP"
    fade.inputs["From Min"].default_value, fade.inputs["From Max"].default_value = 0.0, 1.0
    fade.inputs["To Min"].default_value, fade.inputs["To Max"].default_value = opacity, 0.0
    nt.links.new(length.outputs["Value"], fade.inputs["Value"])
    # Principled màu đen tuyệt đối, không phản xạ; độ trong suốt (Alpha) = độ mờ dần ở trên.
    # (Đã thử Transparent + Emission cường độ 0: Cycles bỏ qua closure phát sáng 0 → đĩa trong suốt hoàn toàn.)
    bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.inputs["Base Color"].default_value = (0, 0, 0, 1)
    bsdf.inputs["Roughness"].default_value = 1.0
    bsdf.inputs["Specular IOR Level"].default_value = 0.0
    nt.links.new(fade.outputs["Result"], bsdf.inputs["Alpha"])
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(bsdf.outputs[0], out.inputs["Surface"])
    obj.data.materials.append(mat)
    bpy.context.scene.collection.objects.link(obj)
    return obj


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
