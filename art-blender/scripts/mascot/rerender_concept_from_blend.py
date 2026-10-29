"""
rerender_concept_from_blend.py — Render lại ảnh so sánh concept TỪ FILE .blend ĐÃ LƯU (không dựng lại hình).

Khi nào dùng: chỉ đổi ÁNH SÁNG / BÓNG ĐỔ / CAMERA (không đổi hình dáng, màu lông, tư thế).
Dựng lại hình mất ~15 phút mỗi concept; cách này chỉ ~1–2 phút.

CHẠY (Git Bash) — file .blend đặt TRƯỚC --python:
    "E:/Tools/Blender/5.2.3/blender.exe" --background \\
        "E:/IELTS_ThienThao/art-blender/blend-files/mascot_concept_c.blend" \\
        --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/rerender_concept_from_blend.py" -- --concept C

Script này cũng "nâng cấp" sân khấu cũ: bỏ đèn bóng-đổ-trên-đầu (nếu có), thêm bóng giả dưới chân,
rồi lưu đè file .blend.
"""

import os
import sys

SCRIPTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MASCOT_DIR = os.path.dirname(os.path.abspath(__file__))
for p in (SCRIPTS_DIR, MASCOT_DIR):
    if p not in sys.path:
        sys.path.insert(0, p)

import math

import bpy

from _common.render_settings import render_still, save_render_outputs
from mascot_stage import collect_points, frame_camera, add_blob_shadow
from build_and_render_concept import VIEWS, ART_DIR


def main():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    key = argv[argv.index("--concept") + 1].lower() if "--concept" in argv else "c"
    views = ["front", "threequarter", "side", "salute34", "head"]
    scene = bpy.context.scene
    out_dir = os.path.join(ART_DIR, "renders", "concepts")

    # --- nâng cấp sân khấu ---
    old = bpy.data.objects.get("Light_ContactShadow")
    if old:
        bpy.data.objects.remove(old, do_unlink=True)
    catcher = bpy.data.objects["ShadowCatcher"]
    blob = bpy.data.objects.get(catcher.get("blob", "")) or add_blob_shadow()
    catcher["blob"] = blob.name
    rig, cam = bpy.data.objects["LightRig"], scene.camera

    # --- các collection tư thế; tư thế chào trong file đang đứng lệch sang phải 2.6 m → đưa về giữa ---
    cols = {c.name.rsplit("_", 1)[-1]: c for c in bpy.data.collections if c.name.startswith("Corgi_")}
    for obj in cols["salute"].objects:
        obj.matrix_world.translation.x -= 2.6

    size = int(argv[argv.index("--size") + 1]) if "--size" in argv else 1024   # cỡ ảnh toàn thân
    for view in views:
        pose, az, el, head_only = VIEWS[view]
        for name, col in cols.items():
            col.hide_render = name != pose
        objs = list(cols[pose].objects)
        pts = collect_points(objs, min_z=None)
        rig.rotation_euler = (0.0, 0.0, math.radians(az))
        frame_camera(cam, pts, az, el, margin=0.06 if head_only else 0.07)
        scene.render.resolution_x = scene.render.resolution_y = 512 if head_only else size
        catcher.hide_render = head_only
        blob.hide_render = head_only
        render_still(label=f"{key}-{view}")
        save_render_outputs(os.path.join(out_dir, f"concept_{key}_{view}"), webp=False)

    # --- lưu lại file .blend (2 tư thế đứng cạnh nhau như cũ) ---
    for obj in cols["salute"].objects:
        obj.matrix_world.translation.x += 2.6
    for name, col in cols.items():
        col.hide_render = name == "head"
    catcher.hide_render = blob.hide_render = False
    rig.rotation_euler = (0, 0, 0)
    scene.render.resolution_x = scene.render.resolution_y = size
    bpy.ops.wm.save_mainfile(compress=True)
    print(f"[rerender] XONG concept {key.upper()}")


if __name__ == "__main__":
    main()
