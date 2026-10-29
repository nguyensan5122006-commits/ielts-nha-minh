"""
studio_lighting.py — Dựng "phòng chụp ảnh" (studio) ảo trong Blender.

GỒM CÁC HÀM:
    clear_scene()              – xoá sạch object/vật liệu cũ trong scene (sân khấu trống).
    add_three_point_lights()   – hệ 3 đèn mềm kinh điển của nhiếp ảnh:
                                   * KEY  (đèn chính)  : sáng nhất, đặt chéo phía trước-trái-trên.
                                   * FILL (đèn phụ)    : yếu hơn, phía đối diện, làm dịu bóng đổ.
                                   * RIM  (đèn viền)   : đặt SAU lưng nhân vật, tạo viền sáng
                                                         tách nhân vật khỏi nền (rất đẹp với lông/fuzzy).
    add_studio_world()         – "bầu trời" giả lập ảnh HDRI studio bằng node (không cần file ảnh):
                                   sàn tối – đường chân trời sáng – trần dịu + 1 "softbox" sáng.
                                   Nền này KHÔNG hiện ra khi film_transparent=True nhưng vẫn chiếu sáng
                                   và tạo phản chiếu (reflection) lên vật thể bóng.
    add_shadow_catcher()       – mặt phẳng "bắt bóng": chỉ giữ lại BÓNG ĐỔ trên nền trong suốt.
    add_studio_camera()        – thêm camera và hướng nó nhìn vào mục tiêu.
    point_at()                 – xoay một object (đèn/camera) nhìn về một điểm.

Đơn vị: 1 = 1 mét. Mặc định nhân vật coi như cao ~2 m, tâm ở gốc toạ độ (0,0,0).
Trục: X sang phải, Y đi VÀO màn hình (camera đứng ở Y âm), Z hướng lên.
"""

import math

import bpy
from mathutils import Vector


# ---------------------------------------------------------------------------
# Tiện ích chung
# ---------------------------------------------------------------------------

def clear_scene():
    """Xoá mọi object, mesh, vật liệu, đèn, camera... để bắt đầu từ cảnh trống."""
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    # Xoá dữ liệu "mồ côi" (không còn object nào dùng) để file .blend gọn.
    for collection in (bpy.data.meshes, bpy.data.materials, bpy.data.lights,
                       bpy.data.cameras, bpy.data.worlds, bpy.data.images):
        for block in list(collection):
            if block.users == 0:
                collection.remove(block)


def point_at(obj, target=(0.0, 0.0, 0.0)):
    """Xoay `obj` để trục -Z của nó (hướng chiếu của đèn/camera) chỉ vào `target`."""
    direction = Vector(target) - obj.location
    # to_track_quat('-Z', 'Y'): trục -Z nhìn theo `direction`, trục Y hướng lên trên.
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def _link(obj, collection=None):
    """Đưa object vào collection (mặc định collection gốc của scene)."""
    (collection or bpy.context.scene.collection).objects.link(obj)
    return obj


# ---------------------------------------------------------------------------
# Đèn
# ---------------------------------------------------------------------------

def add_area_light(name, location, target=(0, 0, 0), energy_watts=300.0, size=2.0,
                   color=(1.0, 1.0, 1.0), shape="DISK", collection=None):
    """
    Thêm 1 đèn AREA (đèn mặt phẳng). Đèn càng TO (size lớn) thì bóng càng MỀM.
    energy_watts: công suất (W). Đèn ở xa ~4-5 m cần vài trăm W.
    """
    light_data = bpy.data.lights.new(name=name, type="AREA")
    light_data.energy = energy_watts
    light_data.color = color
    light_data.shape = shape          # 'DISK' (tròn) / 'SQUARE' / 'RECTANGLE' / 'ELLIPSE'
    light_data.size = size
    light_obj = bpy.data.objects.new(name=name, object_data=light_data)
    light_obj.location = location
    point_at(light_obj, target)
    return _link(light_obj, collection)


def add_three_point_lights(target=(0.0, 0.0, 0.0), distance=5.0, brightness=1.0,
                           warm_key=True, rim_casts_shadow=False, collection=None):
    """
    Hệ 3 đèn mềm (key / fill / rim) nhìn vào `target`.

    distance  : khoảng cách đèn tới nhân vật (m). Đổi distance thì công suất tự bù
                theo luật bình phương khoảng cách để độ sáng gần như không đổi.
    brightness: hệ số nhân chung cho cả 3 đèn (1.0 = mặc định; 1.5 = sáng hơn 50%).
    warm_key  : True = key hơi ấm, fill hơi lạnh (nhìn "điện ảnh", dễ thương hơn).
    rim_casts_shadow: mặc định False. Đèn rim đứng SAU nhân vật nên bóng của nó đổ thẳng
                VỀ PHÍA CAMERA → trên shadow catcher thành một mảng xám lớn phủ cả nửa dưới
                ảnh (đã gặp khi test). Tắt bóng của rim là "mẹo" phổ biến trong studio; với
                vật thể lồi (khối cầu, thân mascot) không gây lộ sáng.

    Trả về dict {"key": obj, "fill": obj, "rim": obj}.
    Giá trị công suất dưới đây đã được tinh chỉnh bằng render thử (xem PIPELINE-NOTES.md).
    """
    t = Vector(target)
    # Hệ số bù công suất: tham chiếu ở 5 m.
    falloff = (distance / 5.0) ** 2 * brightness

    def at(azimuth_deg, elevation_deg):
        """Vị trí trên mặt cầu bán kính `distance` quanh target.
        azimuth 0° = ngay trước mặt (phía camera, Y âm); dương = sang phải."""
        az, el = math.radians(azimuth_deg), math.radians(elevation_deg)
        return t + Vector((math.sin(az) * math.cos(el) * distance,
                           -math.cos(az) * math.cos(el) * distance,
                           math.sin(el) * distance))

    key_color = (1.0, 0.93, 0.85) if warm_key else (1.0, 1.0, 1.0)
    fill_color = (0.85, 0.92, 1.0) if warm_key else (1.0, 1.0, 1.0)

    key = add_area_light("Light_Key", at(-40, 35), t, 650 * falloff, size=3.0,
                         color=key_color, collection=collection)
    fill = add_area_light("Light_Fill", at(55, 10), t, 160 * falloff, size=4.0,
                          color=fill_color, collection=collection)
    rim = add_area_light("Light_Rim", at(160, 40), t, 1000 * falloff, size=2.5,
                         color=(1.0, 1.0, 1.0), collection=collection)
    rim.data.use_shadow = rim_casts_shadow      # Cycles 4.x/5.x: Light.use_shadow
    return {"key": key, "fill": fill, "rim": rim}


# ---------------------------------------------------------------------------
# World (môi trường) giống HDRI studio — dựng hoàn toàn bằng node
# ---------------------------------------------------------------------------

def add_studio_world(strength=0.35, floor_color=(0.08, 0.07, 0.065),
                     horizon_color=(0.55, 0.53, 0.5), sky_color=(0.3, 0.33, 0.38),
                     softbox_direction=(-0.6, -0.5, 0.6), softbox_strength=4.0,
                     scene=None):
    """
    Tạo World dạng gradient: dưới = sàn tối, giữa = chân trời sáng, trên = trần xanh xám,
    cộng thêm một vùng sáng tròn ("softbox") để vật thể bóng có điểm phản chiếu đẹp.

    strength: độ sáng tổng của world (0.2–0.5 là "ánh sáng môi trường" nhẹ).
    horizon_color: KHÔNG nên quá sáng — mắt/vật bóng phản chiếu dải chân trời; sáng quá
                   thì mắt trông như bi sắt (chrome) thay vì đen bóng.
    softbox_direction: hướng (x, y, z) của softbox nhìn từ nhân vật.
    """
    scene = scene or bpy.context.scene
    world = bpy.data.worlds.new("World_Studio")
    scene.world = world
    # Blender 5.x: world mới đã có node_tree sẵn (use_nodes đã "deprecated").
    if world.node_tree is None:
        world.use_nodes = True
    nodes, links = world.node_tree.nodes, world.node_tree.links
    nodes.clear()

    def node(kind, x, y):
        n = nodes.new(kind)
        n.location = (x, y)
        return n

    # Hướng nhìn (vector đơn vị) của mỗi tia đi ra môi trường.
    tex_coord = node("ShaderNodeTexCoord", -1200, 0)
    normalize = node("ShaderNodeVectorMath", -1000, 0)
    normalize.operation = "NORMALIZE"
    links.new(tex_coord.outputs["Generated"], normalize.inputs[0])

    # --- Gradient theo độ cao Z: -1 (sàn) → 0 (chân trời) → +1 (trần) ---
    separate = node("ShaderNodeSeparateXYZ", -800, 150)
    links.new(normalize.outputs["Vector"], separate.inputs["Vector"])
    z_to_01 = node("ShaderNodeMapRange", -600, 150)          # đổi [-1, 1] → [0, 1]
    z_to_01.inputs["From Min"].default_value = -1.0
    z_to_01.inputs["From Max"].default_value = 1.0
    links.new(separate.outputs["Z"], z_to_01.inputs["Value"])

    ramp = node("ShaderNodeValToRGB", -400, 150)
    elements = ramp.color_ramp.elements
    elements[0].position, elements[0].color = 0.40, (*floor_color, 1.0)
    elements[1].position, elements[1].color = 0.52, (*horizon_color, 1.0)
    top = elements.new(0.85)
    top.color = (*sky_color, 1.0)
    links.new(z_to_01.outputs["Result"], ramp.inputs["Fac"])

    # --- Softbox: vùng sáng tròn mềm theo hướng softbox_direction ---
    sb_dir = Vector(softbox_direction).normalized()
    dot = node("ShaderNodeVectorMath", -800, -150)
    dot.operation = "DOT_PRODUCT"
    dot.inputs[1].default_value = sb_dir
    links.new(normalize.outputs["Vector"], dot.inputs[0])
    sb_mask = node("ShaderNodeMapRange", -600, -150)          # cos(góc) 0.90..0.97 → 0..1
    sb_mask.interpolation_type = "SMOOTHSTEP"
    sb_mask.inputs["From Min"].default_value = 0.90
    sb_mask.inputs["From Max"].default_value = 0.97
    links.new(dot.outputs["Value"], sb_mask.inputs["Value"])
    sb_amount = node("ShaderNodeMath", -400, -150)
    sb_amount.operation = "MULTIPLY"
    sb_amount.inputs[1].default_value = softbox_strength
    links.new(sb_mask.outputs["Result"], sb_amount.inputs[0])

    # Màu cuối = gradient + softbox (trắng).
    # Dùng Vector Math ADD thay cho node "Mix": node Mix có nhiều socket TRÙNG TÊN
    # (A/B cho float, vector, màu) nên gọi inputs["A"] dễ nối nhầm socket ẩn.
    # Blender tự đổi màu ↔ vector, và số (float) → vector (x=y=z) khi nối dây.
    add = node("ShaderNodeVectorMath", -150, 0)
    add.operation = "ADD"
    links.new(ramp.outputs["Color"], add.inputs[0])
    links.new(sb_amount.outputs["Value"], add.inputs[1])     # float → (v, v, v) = trắng

    background = node("ShaderNodeBackground", 100, 0)
    background.inputs["Strength"].default_value = strength
    links.new(add.outputs["Vector"], background.inputs["Color"])
    output = node("ShaderNodeOutputWorld", 300, 0)
    links.new(background.outputs["Background"], output.inputs["Surface"])
    return world


# ---------------------------------------------------------------------------
# Shadow catcher + camera
# ---------------------------------------------------------------------------

def add_shadow_catcher(z=0.0, size=20.0, collection=None):
    """
    Mặt phẳng nằm ngang ở độ cao z, bật "Shadow Catcher" (chỉ Cycles).
    Kết quả: ảnh nền trong suốt nhưng vẫn có bóng đổ mờ dưới chân nhân vật
    → ghép lên web trên mọi màu nền đều tự nhiên.
    """
    mesh = bpy.data.meshes.new("ShadowCatcher_Mesh")
    h = size / 2
    mesh.from_pydata([(-h, -h, 0), (h, -h, 0), (h, h, 0), (-h, h, 0)], [], [(0, 1, 2, 3)])
    obj = bpy.data.objects.new("ShadowCatcher", mesh)
    obj.location.z = z
    obj.is_shadow_catcher = True
    return _link(obj, collection)


def add_studio_camera(location=(0.0, -7.5, 0.8), target=(0.0, 0.0, 0.0), lens_mm=70.0,
                      scene=None, collection=None):
    """
    Thêm camera, hướng vào `target` và đặt làm camera render.
    lens_mm: tiêu cự. 50 = bình thường, 70–85 = chân dung (ít méo hình, nhân vật dễ thương hơn).
    """
    scene = scene or bpy.context.scene
    cam_data = bpy.data.cameras.new("Camera_Studio")
    cam_data.lens = lens_mm
    cam = bpy.data.objects.new("Camera_Studio", cam_data)
    cam.location = location
    point_at(cam, target)
    _link(cam, collection)
    scene.camera = cam
    return cam
