"""
export_glb.py — Xuất model ra file .glb (glTF nhị phân) để hiển thị 3D trên web (three.js...).

KHÁI NIỆM:
    glTF / .glb : "JPEG của thế giới 3D" — định dạng chuẩn cho web. .glb = 1 file gói gọn
                  lưới (mesh), vật liệu, texture, animation.
    Draco       : thuật toán nén lưới của Google. Giảm dung lượng mesh 5–10 lần.
                  Đổi lại: trình duyệt phải tải thêm bộ giải nén Draco (~300 KB, có cache).
                  "quantization" = làm tròn toạ độ về N bit; số bit càng thấp file càng nhỏ
                  nhưng có thể làm bề mặt hơi "gợn". Mặc định dưới đây an toàn cho nhân vật.

GIỚI HẠN CẦN NHỚ:
    - Node vật liệu PROCEDURAL (Noise, ColorRamp, Bump...) KHÔNG xuất sang glTF được. glTF chỉ
      hiểu Principled BSDF + ảnh texture. Muốn giữ màu/hiệu ứng lông trên web phải "bake"
      (nướng) ra ảnh texture trước khi xuất. Hàm warn_procedural_inputs() tự cảnh báo việc này.
      (Đã gặp: Base Color nối từ ColorRamp → .glb mất màu → thân hiện TRẮNG trên web.)
    - Sheen (lớp lông mịn) được xuất qua extension KHR_materials_sheen (three.js hỗ trợ);
      Coat → KHR_materials_clearcoat.
    - Vật liệu Blender mặc định không bật "Backface Culling" → glTF ghi doubleSided=true
      (GPU vẽ cả mặt trong). Với khối kín nên bật mat.use_backface_culling = True.

CÁCH DÙNG:
    from _common.export_glb import export_glb
    info = export_glb("E:/.../model.glb", objects=[body, eye_left, eye_right], draco=True)
    print(info["size_kb"])
"""

import os

import bpy

# Những loại node mà glTF exporter "hiểu" khi nối vào Principled BSDF.
# Nối bất kỳ node nào khác (Noise, ColorRamp, Bump...) → exporter BỎ QUA input đó.
_GLTF_FRIENDLY_NODES = {"ShaderNodeTexImage", "ShaderNodeNormalMap", "ShaderNodeSeparateColor",
                        "ShaderNodeUVMap", "ShaderNodeMapping"}
_CHECKED_INPUTS = ("Base Color", "Roughness", "Metallic", "Normal", "Alpha", "Emission Color")


def warn_procedural_inputs(objects):
    """
    In cảnh báo nếu vật liệu dùng node procedural ở các input quan trọng.

    Ví dụ đã gặp khi test: Base Color nối từ ColorRamp → file .glb KHÔNG có màu nền
    (baseColorFactor bị bỏ) → trên web thân nhân vật hiện MÀU TRẮNG.
    Cách sửa: bake (nướng) màu ra ảnh texture, hoặc đặt màu cố định cho bản xuất web.
    Trả về danh sách cảnh báo (chuỗi).
    """
    warnings = []
    materials = {slot.material for obj in objects for slot in obj.material_slots if slot.material}
    for mat in materials:
        if mat.node_tree is None:
            continue
        for node in mat.node_tree.nodes:
            if node.bl_idname != "ShaderNodeBsdfPrincipled":
                continue
            for input_name in _CHECKED_INPUTS:
                socket = node.inputs.get(input_name)
                if socket is None or not socket.is_linked:
                    continue
                source = socket.links[0].from_node
                if source.bl_idname not in _GLTF_FRIENDLY_NODES:
                    warnings.append(f"Vật liệu '{mat.name}': '{input_name}' nối từ node "
                                    f"'{source.bl_idname}' → sẽ bị BỎ khi xuất glTF (cần bake ra ảnh).")
    for w in warnings:
        print("[export_glb] CẢNH BÁO:", w)
    return warnings


def export_glb(filepath, objects=None, draco=True, draco_level=6,
               position_bits=14, normal_bits=10, texcoord_bits=12,
               apply_modifiers=True, export_animations=False, verbose=True):
    """
    Xuất .glb.

    objects        : danh sách object cần xuất. None = xuất mọi object có thể render
                     (trừ camera/đèn). Nên truyền rõ ràng để không lẫn shadow catcher, đèn...
    draco          : bật nén Draco.
    draco_level    : 0–10, mức nén (cao = nén chậm hơn, file nhỏ hơn chút; giải nén không chậm hơn).
    apply_modifiers: True = áp dụng modifier (vd Subdivision) → lưới xuất ra mịn như lúc render.
                     Lưu ý số đỉnh tăng mạnh; cho web nên giảm level Subdivision trước khi xuất.

    Trả về dict {"path", "size_kb", "objects", "vertices", "triangles"}.
    """
    filepath = os.path.abspath(filepath)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    view_layer = bpy.context.view_layer

    if objects is None:
        objects = [o for o in bpy.context.scene.objects
                   if o.type in {"MESH", "CURVE", "SURFACE", "META", "FONT", "ARMATURE", "EMPTY"}
                   and not getattr(o, "is_shadow_catcher", False)]

    # Exporter dùng "use_selection" → chọn đúng các object cần xuất, bỏ chọn phần còn lại.
    for obj in view_layer.objects:
        obj.select_set(False)
    for obj in objects:
        obj.select_set(True)
    if objects:
        view_layer.objects.active = objects[0]

    procedural_warnings = warn_procedural_inputs(objects)

    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format="GLB",
        use_selection=True,
        export_apply=apply_modifiers,
        export_yup=True,                          # web (three.js) dùng trục Y hướng lên
        export_cameras=False,
        export_lights=False,
        export_animations=export_animations,
        export_materials="EXPORT",
        export_draco_mesh_compression_enable=draco,
        export_draco_mesh_compression_level=draco_level,
        export_draco_position_quantization=position_bits,
        export_draco_normal_quantization=normal_bits,
        export_draco_texcoord_quantization=texcoord_bits,
    )

    # Đếm số đỉnh / tam giác sau khi áp modifier (để biết model "nặng" cỡ nào).
    depsgraph = bpy.context.evaluated_depsgraph_get()
    vertices = triangles = 0
    for obj in objects:
        if obj.type != "MESH":
            continue
        evaluated = obj.evaluated_get(depsgraph) if apply_modifiers else obj
        mesh = evaluated.to_mesh()
        mesh.calc_loop_triangles()
        vertices += len(mesh.vertices)
        triangles += len(mesh.loop_triangles)
        evaluated.to_mesh_clear()

    size_kb = os.path.getsize(filepath) / 1024
    info = {"path": filepath, "size_kb": round(size_kb, 1), "objects": [o.name for o in objects],
            "vertices": vertices, "triangles": triangles, "draco": draco,
            "warnings": procedural_warnings}
    if verbose:
        print(f"[export_glb] {filepath}: {size_kb:.1f} KB, {vertices} đỉnh, {triangles} tam giác, "
              f"draco={draco}")
    return info
