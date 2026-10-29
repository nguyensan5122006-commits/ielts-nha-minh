"""
build_and_render_concept.py — Dựng 1 concept mascot Corgi (2 tư thế) rồi render các góc nhìn.

CHẠY (Git Bash):
    "E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \
        --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/build_and_render_concept.py" -- --concept A

THAM SỐ (sau dấu --):
    --concept A|B|C        concept cần dựng (xem corgi_concepts.py)
    --views LIST           các góc, cách nhau bằng dấu phẩy. Mặc định: front,threequarter,side,salute34,head
                           (thêm "back" để kiểm tra phía sau)
    --size N               cỡ ảnh (mặc định 1024)
    --samples N            số sample Cycles (mặc định 160)
    --suffix TEXT          thêm vào tên file ảnh (vd "_draft")
    --out-dir PATH         thư mục ảnh (mặc định art-blender/renders/concepts)
    --no-blend             không lưu file .blend
    --draft                bản nháp: lưới thưa hơn 1.5 lần (dựng nhanh, dùng khi đang chỉnh hình)
    --uniform olive|traffic   bộ màu đồng phục (xem UNIFORM_PRESETS trong corgi_concepts.py)

KẾT QUẢ:
    renders/concepts/concept_a_front.png, ..._threequarter.png, ..._side.png, ..._salute34.png,
    ..._head.png (đầu, 512 px — dùng để thu nhỏ thành 64/32 px kiểm tra độ dễ nhận diện)
    blend-files/mascot_concept_a.blend  (2 tư thế đứng cạnh nhau: bình thường | chào)
"""

import math
import os
import sys
import time

SCRIPTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # .../art-blender/scripts
MASCOT_DIR = os.path.dirname(os.path.abspath(__file__))
for p in (SCRIPTS_DIR, MASCOT_DIR):
    if p not in sys.path:
        sys.path.insert(0, p)

import bpy

from _common.render_settings import render_still, save_render_outputs
from mascot_stage import setup_stage, collect_points, frame_camera     # sân khấu + camera dùng chung

from corgi_concepts import make_concept
from corgi_builder import build_corgi

ART_DIR = os.path.dirname(SCRIPTS_DIR)

# Góc nhìn: (tư thế, góc phương vị độ, góc ngẩng độ, chỉ khung đầu?)
#   phương vị 0 = chính diện; dương = camera lệch sang BÊN TRÁI nhân vật (phải người xem).
VIEWS = {
    "front": ("neutral", 0.0, 4.0, False),
    "threequarter": ("neutral", 35.0, 7.0, False),
    "side": ("neutral", 90.0, 3.0, False),
    "back": ("neutral", 180.0, 6.0, False),
    "salute34": ("salute", -32.0, 6.0, False),
    "salute34b": ("salute", 30.0, 6.0, False),
    "salutefront": ("salute", 0.0, 4.0, False),
    "head": ("head", 0.0, 3.0, True),          # pose "head" = chỉ cái đầu (logo / favicon)
    "head34": ("neutral", 18.0, 4.0, True),    # đầu góc 3/4 (cắt từ tư thế đứng)
}


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = {"concept": "A", "views": "front,threequarter,side,salute34,head", "size": 1024,
            "samples": 160, "suffix": "", "out_dir": os.path.join(ART_DIR, "renders", "concepts"),
            "blend": True, "uniform": "olive"}
    i = 0
    while i < len(argv):
        a = argv[i]
        if a == "--no-blend":
            args["blend"] = False
            i += 1
            continue
        if a == "--draft":
            args["draft"] = True
            i += 1
            continue
        key = a.lstrip("-").replace("-", "_")
        args[key] = argv[i + 1]
        i += 2
    args["size"] = int(args["size"])
    args["samples"] = int(args["samples"])
    args["views"] = [v.strip() for v in args["views"].split(",") if v.strip()]
    return args



def set_pose_visible(collections, pose):
    for name, col in collections.items():
        col.hide_render = (name != pose)
        col.hide_viewport = (name != pose)


def main():
    args = parse_args()
    if args.get("draft"):
        import sdf_toolkit
        sdf_toolkit.VOXEL_SCALE = 1.5     # bản nháp: lưới thưa hơn → dựng nhanh hơn ~3 lần
    P = make_concept(args["concept"], args["uniform"])
    key = P["key"].lower()
    t_start = time.perf_counter()
    rig, cam, catcher = setup_stage(args["size"], args["samples"])

    poses_needed = sorted({VIEWS[v][0] for v in args["views"]} | ({"neutral", "salute"} if args["blend"] else set()))
    poses_needed = sorted(poses_needed, key=lambda p: p == "head")
    collections, built = {}, {}
    for pose in poses_needed:
        col = bpy.data.collections.new(f"Corgi_{P['key']}_{pose}")
        bpy.context.scene.collection.children.link(col)
        collections[pose] = col
        built[pose] = build_corgi(P, pose=pose, collection=col)
        built[pose].pop("_ctx", None)

    os.makedirs(args["out_dir"], exist_ok=True)
    report = []
    # Gom các góc theo tư thế → mỗi tư thế chỉ phải nạp cảnh lên GPU 1 lần (đỡ ~1 phút mỗi lần đổi)
    ordered = sorted(args["views"], key=lambda v: (VIEWS[v][0] != "neutral", VIEWS[v][3]))
    for view in ordered:
        pose, az, el, head_only = VIEWS[view]
        set_pose_visible(collections, pose)
        objs = list(collections[pose].objects)
        head_z = P["head_center"][2] - 0.52 * P["hs"] if head_only else None
        pts = collect_points(objs, min_z=head_z)
        rig.rotation_euler = (0.0, 0.0, math.radians(az))
        frame_camera(cam, pts, az, el, margin=0.06 if head_only else 0.07)
        scene = bpy.context.scene
        size = args["size"]
        if head_only:
            scene.render.resolution_x = scene.render.resolution_y = 512
        else:
            scene.render.resolution_x = scene.render.resolution_y = size
        catcher.hide_render = head_only
        sec = render_still(label=f"{key}-{view}")
        base = os.path.join(args["out_dir"], f"concept_{key}_{view}{args['suffix']}")
        save_render_outputs(base, webp=False)
        report.append((view, round(sec, 1)))

    if args["blend"]:
        # Đặt 2 tư thế cạnh nhau trong file .blend: bình thường ở giữa, tư thế chào lệch sang phải 2.6 m
        for name, col in collections.items():
            if name == "head":
                continue
            col.hide_render = False
            col.hide_viewport = False
            if name == "salute":
                for obj in col.objects:
                    obj.matrix_world.translation.x += 2.6
        rig.rotation_euler = (0, 0, 0)
        blend_dir = os.path.join(ART_DIR, "blend-files")
        os.makedirs(blend_dir, exist_ok=True)
        path = os.path.join(blend_dir, f"mascot_concept_{key}.blend")
        bpy.ops.wm.save_as_mainfile(filepath=path, compress=True)
        print(f"[concept] Đã lưu {path}")
    print(f"[concept] XONG concept {P['key']}: {report}, tổng {time.perf_counter() - t_start:.0f}s")


if __name__ == "__main__":
    main()
