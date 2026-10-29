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
import numpy as np
from mathutils import Vector

from _common.enable_gpu import enable_gpu
from _common.studio_lighting import clear_scene, add_three_point_lights, add_studio_world, \
    add_shadow_catcher, add_studio_camera, point_at
from _common.render_settings import setup_cycles_render, render_still, save_render_outputs

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
    "head": ("neutral", 18.0, 4.0, True),
}


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = {"concept": "A", "views": "front,threequarter,side,salute34,head", "size": 1024,
            "samples": 160, "suffix": "", "out_dir": os.path.join(ART_DIR, "renders", "concepts"),
            "blend": True}
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


# -----------------------------------------------------------------------------
# Camera tự căn khung: chiếu đỉnh của các object lên ảnh, dời tâm + chỉnh khoảng cách cho vừa
# -----------------------------------------------------------------------------

def _collect_points(objects, head_only_z=None, step=7):
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
        if head_only_z is not None:
            w = w[w[:, 2] > head_only_z]
        if len(w):
            pts.append(w)
    return np.concatenate(pts, axis=0)


def frame_camera(cam, points, azimuth, elevation, margin=0.07, lens=85.0):
    """Đặt camera theo góc (phương vị, ngẩng) sao cho mọi điểm nằm gọn trong khung, cách mép `margin`."""
    cam.data.lens = lens
    tan_half = (cam.data.sensor_width / 2) / lens
    target = (points.min(axis=0) + points.max(axis=0)) / 2
    az, el = math.radians(azimuth), math.radians(elevation)
    direction = np.array([math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)])
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


# -----------------------------------------------------------------------------

def setup_stage(size, samples):
    clear_scene()
    gpu = enable_gpu(verbose=False)
    print(f"[concept] GPU: {gpu['backend']} {gpu['active_devices']}")
    setup_cycles_render(samples=samples, resolution=(size, size), look="AgX - Punchy",
                        persistent_data=True, max_bounces=10, exposure=-0.75)
    bpy.context.scene.cycles.adaptive_threshold = 0.008
    add_studio_world(strength=0.42, softbox_strength=3.5)
    rig = bpy.data.objects.new("LightRig", None)
    bpy.context.scene.collection.objects.link(rig)
    lights = add_three_point_lights(target=(0.0, 0.0, 1.0), distance=6.0, brightness=1.0)
    for light in lights.values():
        light.parent = rig
    # đèn hắt nhẹ từ dưới-trước (bounce) cho vùng dưới cằm/mũ không quá tối
    bounce = bpy.data.lights.new("Light_Bounce", "AREA")
    bounce.energy, bounce.size, bounce.color = 140.0, 4.0, (1.0, 0.95, 0.9)
    bob = bpy.data.objects.new("Light_Bounce", bounce)
    bob.location = (0.5, -5.0, -0.6)
    point_at(bob, (0, 0, 1.0))
    bounce.use_shadow = False
    bpy.context.scene.collection.objects.link(bob)
    bob.parent = rig
    catcher = add_shadow_catcher(z=0.0)
    cam = add_studio_camera(location=(0, -7, 1.0), target=(0, 0, 1.0), lens_mm=85.0)
    return rig, cam, catcher


def set_pose_visible(collections, pose):
    for name, col in collections.items():
        col.hide_render = (name != pose)
        col.hide_viewport = (name != pose)


def main():
    args = parse_args()
    if args.get("draft"):
        import sdf_toolkit
        sdf_toolkit.VOXEL_SCALE = 1.5     # bản nháp: lưới thưa hơn → dựng nhanh hơn ~3 lần
    P = make_concept(args["concept"])
    key = P["key"].lower()
    t_start = time.perf_counter()
    rig, cam, catcher = setup_stage(args["size"], args["samples"])

    poses_needed = sorted({VIEWS[v][0] for v in args["views"]} | ({"neutral", "salute"} if args["blend"] else set()))
    collections, built = {}, {}
    for pose in poses_needed:
        col = bpy.data.collections.new(f"Corgi_{P['key']}_{pose}")
        bpy.context.scene.collection.children.link(col)
        collections[pose] = col
        built[pose] = build_corgi(P, pose=pose, collection=col)

    os.makedirs(args["out_dir"], exist_ok=True)
    report = []
    # Gom các góc theo tư thế → mỗi tư thế chỉ phải nạp cảnh lên GPU 1 lần (đỡ ~1 phút mỗi lần đổi)
    ordered = sorted(args["views"], key=lambda v: (VIEWS[v][0] != "neutral", VIEWS[v][3]))
    for view in ordered:
        pose, az, el, head_only = VIEWS[view]
        set_pose_visible(collections, pose)
        objs = list(collections[pose].objects)
        head_z = P["head_center"][2] - 0.52 if head_only else None
        pts = _collect_points(objs, head_only_z=head_z)
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
