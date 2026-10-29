"""
render_poses.py — Render TOÀN BỘ ảnh mascot cho website (các tư thế + ảnh đầu) bằng MỘT lệnh.

CHẠY (Git Bash) — ví dụ render 8 tư thế ưu tiên + ảnh đầu của concept C, đồng phục xanh ô-liu:
    "E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \\
        --python "E:/IELTS_ThienThao/art-blender/scripts/mascot/render_poses.py" -- \\
        --concept C --poses priority,head --uniform olive

    Sau đó chạy bước tối ưu ảnh cho web (đổi cỡ 256/512/1024 + WebP, ảnh đầu 32..512 PNG):
    cd "E:/IELTS_ThienThao/art-blender/tools" && node publish_mascot.mjs --concept C

THAM SỐ (sau dấu --):
    --concept A|B|C        concept (corgi_concepts.py)
    --poses LIST           tên tư thế cách nhau dấu phẩy (corgi_poses.py), hoặc nhóm:
                           priority (8 tư thế chính), secondary (5 tư thế phụ), all (cả 13), head (ảnh đầu)
    --uniform olive|traffic   bộ màu đồng phục
    --size N               cỡ ảnh gốc (mặc định 1024)
    --samples N            số sample Cycles (mặc định 192)
    --draft                lưới thưa (nhanh ~3 lần) — để xem thử tư thế
    --out-dir PATH         thư mục ảnh gốc (mặc định art-blender/renders/poses/<concept>_<uniform>)
    --save-blend           lưu thêm file .blend của từng tư thế vào blend-files/poses/

KẾT QUẢ (ảnh gốc PNG nền trong suốt, CHƯA tối ưu — tool publish_mascot.mjs mới đưa lên public/):
    renders/poses/<concept>_<uniform>/<pose>.png       (1024 px, có bóng đổ mềm dưới chân)
    renders/poses/<concept>_<uniform>/head.png         (1024 px, chỉ cái đầu, không bóng)
    renders/poses/<concept>_<uniform>/report.json      (thời gian, kiểm tra ảnh bị cắt mép)
"""

import json
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

from _common.render_settings import render_still, save_render_outputs
from mascot_stage import setup_stage, collect_points, frame_camera, fixed_camera
from corgi_concepts import make_concept
from corgi_builder import build_corgi
from corgi_poses import POSES, PRIORITY, SECONDARY, get_pose

ART_DIR = os.path.dirname(SCRIPTS_DIR)
ELEVATION = 6.0       # camera nhìn hơi từ trên xuống (độ)


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    args = {"concept": "C", "poses": "priority,head", "uniform": "olive", "size": 1024, "samples": 192,
            "out_dir": None, "draft": False, "save_blend": False}
    i = 0
    while i < len(argv):
        a = argv[i]
        if a in ("--draft", "--save-blend"):
            args[a[2:].replace("-", "_")] = True
            i += 1
            continue
        args[a.lstrip("-").replace("-", "_")] = argv[i + 1]
        i += 2
    names = []
    for item in args["poses"].split(","):
        item = item.strip()
        group = {"priority": PRIORITY, "secondary": SECONDARY, "all": PRIORITY + SECONDARY}.get(item)
        names += group if group else [item]
    for n in names:
        if n not in POSES:
            raise SystemExit(f"Không có tư thế '{n}'. Các tư thế: {', '.join(POSES)}")
    args["poses"] = list(dict.fromkeys(names))          # bỏ trùng, giữ thứ tự
    args["size"], args["samples"] = int(args["size"]), int(args["samples"])
    if args["out_dir"] is None:
        args["out_dir"] = os.path.join(ART_DIR, "renders", "poses", f"{args['concept'].lower()}_{args['uniform']}")
    return args


def frame_box(P):
    """
    Hộp khung CỐ ĐỊNH cho mọi tư thế toàn thân của 1 concept: từ sàn tới trên đỉnh mũ/tai một khoảng
    (đủ chỗ cho tay giơ cao, chữ Z, dấu hỏi...). Trả về (z_dưới, z_trên).
    """
    hs = P["hs"]
    top_cap = P["head_center"][2] + P["cap_off"][2] + (P["crown_z"] + P["crown_r"][2]) * P["cap_scale"]
    z_top = top_cap + 0.36 * hs
    return -0.16, z_top


def remove_objects(objs):
    """Xoá object + dữ liệu lưới/chữ của 1 tư thế sau khi render (giải phóng bộ nhớ)."""
    for obj in list(objs.values()):
        if not hasattr(obj, "data"):
            continue
        data = obj.data
        bpy.data.objects.remove(obj, do_unlink=True)
        if data is not None and data.users == 0:
            if isinstance(data, bpy.types.Mesh):
                bpy.data.meshes.remove(data)
            elif isinstance(data, bpy.types.Curve):
                bpy.data.curves.remove(data)


def alpha_edge_report(path):
    """Đọc lại ảnh PNG: có pixel đặc chạm mép ảnh không (dấu hiệu bị cắt khung)?"""
    img = bpy.data.images.load(path, check_existing=False)
    w, h = img.size
    px = np.empty(w * h * 4, dtype=np.float32)
    img.pixels.foreach_get(px)
    a = px.reshape(h, w, 4)[:, :, 3]
    bpy.data.images.remove(img)
    edges = {"top": float(a[-1, :].max()), "bottom": float(a[0, :].max()),
             "left": float(a[:, 0].max()), "right": float(a[:, -1].max())}
    clipped = [k for k, v in edges.items() if v > 0.5 and k != "bottom"]
    return edges, clipped


def main():
    args = parse_args()
    if args["draft"]:
        import sdf_toolkit
        sdf_toolkit.VOXEL_SCALE = 1.5
    P = make_concept(args["concept"], args["uniform"])
    os.makedirs(args["out_dir"], exist_ok=True)
    t_start = time.perf_counter()
    rig, cam, catcher = setup_stage(args["size"], args["samples"])
    z0, z1 = frame_box(P)
    scene = bpy.context.scene
    report = {"concept": P["key"], "uniform": args["uniform"], "size": args["size"], "samples": args["samples"],
              "frame_box": [z0, z1], "poses": {}}

    for name in args["poses"]:
        X = get_pose(name)
        t0 = time.perf_counter()
        col = bpy.data.collections.new(f"Corgi_{P['key']}_{name}")
        scene.collection.children.link(col)
        objs = build_corgi(P, pose=X, collection=col)
        objs.pop("_ctx", None)
        t_build = time.perf_counter() - t0

        az = X["view"]
        rig.rotation_euler = (0.0, 0.0, np.radians(az))
        if X["head_only"]:
            # Ảnh đầu (logo / favicon): chính diện, căn sát khung, không bóng đổ
            pts = collect_points(col.objects)
            frame_camera(cam, pts, az, 3.0, margin=0.04)
            catcher.hide_render = True
        else:
            fixed_camera(cam, z0, z1, az, ELEVATION)
            catcher.hide_render = False
        blob = bpy.data.objects.get(catcher.get("blob", ""))
        if blob:
            blob.hide_render = catcher.hide_render      # bóng giả dưới chân đi cùng mặt bắt bóng
        sec = render_still(label=f"{P['key']}-{name}")
        base = os.path.join(args["out_dir"], name)
        save_render_outputs(base, webp=False)
        edges, clipped = alpha_edge_report(base + ".png")
        if clipped:
            print(f"[poses] CẢNH BÁO: {name} có thể bị cắt mép ở {clipped}")
        report["poses"][name] = {"build_s": round(t_build, 1), "render_s": round(sec, 1), "view": az,
                                 "clipped_edges": clipped}
        if args["save_blend"]:
            d = os.path.join(ART_DIR, "blend-files", "poses")
            os.makedirs(d, exist_ok=True)
            bpy.ops.wm.save_as_mainfile(filepath=os.path.join(d, f"{P['key'].lower()}_{name}.blend"),
                                        compress=True, copy=True)
        remove_objects(objs)
        bpy.data.collections.remove(col)
        print(f"[poses] {name}: dựng {t_build:.0f}s + render {sec:.0f}s")

    report["total_s"] = round(time.perf_counter() - t_start, 1)
    with open(os.path.join(args["out_dir"], "report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"[poses] XONG {len(args['poses'])} ảnh trong {report['total_s']:.0f}s → {args['out_dir']}")


if __name__ == "__main__":
    main()
