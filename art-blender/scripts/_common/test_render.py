"""
test_render.py — Kiểm tra TOÀN BỘ pipeline 3D trên máy này.

Script dựng 1 cảnh thử "quả bóng lông" (gần giống thân một mascot):
    - Thân: quả cầu mịn (icosphere + Subdivision Surface + shade smooth),
            vật liệu "lông mềm" = Principled BSDF có Sheen + bump nhiễu nhỏ.
    - Mắt : 2 quả cầu nhỏ đen bóng → phải thấy chấm phản chiếu đèn (catchlight).
    - Studio: 3 đèn area mềm + world giả HDRI + shadow catcher (bóng trên nền trong suốt).
Sau đó:
    1) Render bằng GPU (OptiX/CUDA), 512x512, 128 samples, khử nhiễu, AgX, nền trong suốt.
    2) Lưu PNG (RGBA) + WebP (RGBA, quality 90), đọc lại file để kiểm tra kênh alpha.
    3) (tuỳ chọn) Render lại bằng CPU để so sánh thời gian.
    4) Xuất .glb có nén Draco (và bản không nén để so sánh dung lượng).
    5) Ghi báo cáo JSON: thiết bị, thời gian render, dung lượng file.

CÁCH CHẠY (Git Bash hoặc PowerShell, từ bất kỳ thư mục nào):
    "E:/Tools/Blender/5.2.3/blender.exe" --background --factory-startup \
        --python "E:/IELTS_ThienThao/art-blender/scripts/_common/test_render.py" -- --cpu-compare

    Mọi tham số SAU dấu `--` là của script này (Blender bỏ qua chúng):
        --out-dir PATH      thư mục lưu kết quả (mặc định art-blender/renders/_pipeline-test)
        --samples N         số samples (mặc định 128)
        --size N            cạnh ảnh vuông, px (mặc định 512)
        --cpu-compare       render thêm 1 lần bằng CPU để so thời gian
        --gpu-warm          render GPU lần 2 để đo thời gian khi kernel đã nạp sẵn
        --no-glb            bỏ bước xuất GLB
        --no-shadow-catcher bỏ bóng đổ trên nền
        --save-blend PATH   lưu cảnh ra file .blend (mặc định blend-files/_pipeline-test_fuzzy-ball.blend;
                            truyền "none" để không lưu)
"""

import argparse
import json
import math
import os
import sys

# --- Cho phép import gói `_common` (xem giải thích trong _common/__init__.py) ---
THIS_DIR = os.path.dirname(os.path.abspath(__file__))        # .../scripts/_common
SCRIPTS_DIR = os.path.dirname(THIS_DIR)                       # .../scripts
ART_ROOT = os.path.dirname(SCRIPTS_DIR)                       # .../art-blender
if SCRIPTS_DIR not in sys.path:
    sys.path.insert(0, SCRIPTS_DIR)

import bmesh  # noqa: E402  (import sau khi sửa sys.path là cố ý)
import bpy  # noqa: E402
import numpy as np  # noqa: E402  (numpy có sẵn trong Python của Blender)
from mathutils import Vector  # noqa: E402

from _common.enable_gpu import enable_gpu, use_cpu_only  # noqa: E402
from _common.export_glb import export_glb  # noqa: E402
from _common.render_settings import render_still, save_render_outputs, setup_cycles_render  # noqa: E402
from _common.studio_lighting import (  # noqa: E402
    add_shadow_catcher, add_studio_camera, add_studio_world, add_three_point_lights, clear_scene)


# ---------------------------------------------------------------------------
# Đọc tham số dòng lệnh (phần sau dấu `--`)
# ---------------------------------------------------------------------------

def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    p = argparse.ArgumentParser(description="Kiểm tra pipeline render/xuất GLB")
    p.add_argument("--out-dir", default=os.path.join(ART_ROOT, "renders", "_pipeline-test"))
    p.add_argument("--samples", type=int, default=128)
    p.add_argument("--size", type=int, default=512)
    p.add_argument("--cpu-compare", action="store_true")
    p.add_argument("--gpu-warm", action="store_true")
    p.add_argument("--no-glb", action="store_true")
    p.add_argument("--no-shadow-catcher", action="store_true")
    p.add_argument("--save-blend",
                   default=os.path.join(ART_ROOT, "blend-files", "_pipeline-test_fuzzy-ball.blend"))
    return p.parse_args(argv)


# ---------------------------------------------------------------------------
# Vật liệu
# ---------------------------------------------------------------------------

def make_fuzzy_material(name="Mat_Fur_Peach",
                        color_light=(0.95, 0.36, 0.08),      # cam đào (giá trị LINEAR)
                        color_dark=(0.85, 0.24, 0.05)):      # cam đậm hơn một chút
    """
    Vật liệu "lông mềm" giả lập (không dùng hệ thống tóc/hair thật — nhẹ và nhanh):
        - Sheen: lớp ánh mịn ở rìa vật thể, giống lông tơ/vải nhung khi có đèn rim.
        - Roughness cao: bề mặt không bóng.
        - Bump từ Noise tần số cao: bề mặt lấm tấm như sợi lông ngắn.
        - Noise tần số thấp → ColorRamp: màu loang nhẹ 2 tông cho tự nhiên.
    Màu trong node là màu LINEAR (không phải mã sRGB/hex trên web).
    LƯU Ý: AgX + Sheen làm màu nhạt đi (pastel) → chọn màu gốc ĐẬM/RỰC hơn màu mong muốn.
    Lần test đầu dùng cam nhạt (0.91, 0.40, 0.16) → ra màu da người nhợt nhạt.
    """
    mat = bpy.data.materials.new(name)
    if mat.node_tree is None:          # Blender < 5 cần bật use_nodes; 5.x có sẵn node_tree
        mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    nodes.clear()

    def node(kind, x, y):
        n = nodes.new(kind)
        n.location = (x, y)
        return n

    coords = node("ShaderNodeTexCoord", -1000, 0)

    # Màu loang nhẹ
    color_noise = node("ShaderNodeTexNoise", -750, 250)
    color_noise.inputs["Scale"].default_value = 3.0
    color_noise.inputs["Detail"].default_value = 2.0
    links.new(coords.outputs["Object"], color_noise.inputs["Vector"])
    color_ramp = node("ShaderNodeValToRGB", -500, 250)
    # Hai mốc càng XA nhau (0.2 ↔ 0.8) thì chuyển màu càng êm; đặt gần nhau → loang lổ.
    color_ramp.color_ramp.elements[0].position = 0.2
    color_ramp.color_ramp.elements[0].color = (*color_dark, 1.0)
    color_ramp.color_ramp.elements[1].position = 0.8
    color_ramp.color_ramp.elements[1].color = (*color_light, 1.0)
    links.new(color_noise.outputs["Fac"], color_ramp.inputs["Fac"])

    # Bump "lông tơ" tần số cao
    fur_noise = node("ShaderNodeTexNoise", -750, -200)
    # Scale 45 trên khối cầu bán kính 1 m → hạt đủ to để thấy ở ảnh 512 px
    # (scale 90 quá mịn, nhỏ hơn 1 pixel và bị bộ khử nhiễu xoá mất).
    fur_noise.inputs["Scale"].default_value = 45.0
    fur_noise.inputs["Detail"].default_value = 8.0
    fur_noise.inputs["Roughness"].default_value = 0.7
    links.new(coords.outputs["Object"], fur_noise.inputs["Vector"])
    bump = node("ShaderNodeBump", -450, -200)
    bump.inputs["Strength"].default_value = 0.35
    bump.inputs["Distance"].default_value = 0.01
    links.new(fur_noise.outputs["Fac"], bump.inputs["Height"])

    bsdf = node("ShaderNodeBsdfPrincipled", -150, 0)
    bsdf.inputs["Roughness"].default_value = 0.85
    bsdf.inputs["Diffuse Roughness"].default_value = 0.5     # bề mặt kiểu vải/lông, tối mềm hơn ở rìa
    bsdf.inputs["Specular IOR Level"].default_value = 0.25   # ít bóng
    bsdf.inputs["Sheen Weight"].default_value = 0.7           # 1.0 phủ trắng quá → màu bệt
    bsdf.inputs["Sheen Roughness"].default_value = 0.5
    bsdf.inputs["Sheen Tint"].default_value = (1.0, 0.75, 0.5, 1.0)  # ánh lông hơi cam, không trắng
    bsdf.inputs["Subsurface Weight"].default_value = 0.1      # ánh sáng xuyên nhẹ → mềm
    bsdf.inputs["Subsurface Radius"].default_value = (1.0, 0.45, 0.25)
    bsdf.inputs["Subsurface Scale"].default_value = 0.05
    links.new(color_ramp.outputs["Color"], bsdf.inputs["Base Color"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    out = node("ShaderNodeOutputMaterial", 150, 0)
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])
    return mat


def make_glossy_eye_material(name="Mat_Eye_GlossyBlack"):
    """Mắt đen rất bóng: roughness thấp + lớp Coat (như lớp sơn bóng) → chấm sáng sắc nét."""
    mat = bpy.data.materials.new(name)
    if mat.node_tree is None:
        mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.006, 0.006, 0.01, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.08
    bsdf.inputs["Specular IOR Level"].default_value = 0.6
    bsdf.inputs["Coat Weight"].default_value = 1.0
    bsdf.inputs["Coat Roughness"].default_value = 0.02
    return mat


# ---------------------------------------------------------------------------
# Hình khối
# ---------------------------------------------------------------------------

def add_smooth_sphere(name, radius=1.0, location=(0, 0, 0), ico_subdivisions=3,
                      subsurf_levels=2, material=None):
    """
    Quả cầu mịn: icosphere (lưới tam giác đều, không có "điểm cực" như UV sphere)
    + modifier Subdivision Surface + shade smooth.
    """
    mesh = bpy.data.meshes.new(name + "_Mesh")
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=ico_subdivisions, radius=radius, calc_uvs=True)
    bm.to_mesh(mesh)
    bm.free()
    mesh.shade_smooth()                       # đổ bóng mịn (thay cho bpy.ops.object.shade_smooth)
    obj = bpy.data.objects.new(name, mesh)
    obj.location = location
    bpy.context.scene.collection.objects.link(obj)
    if subsurf_levels:
        mod = obj.modifiers.new("Subdivision", "SUBSURF")
        mod.levels = subsurf_levels           # mức hiển thị trong viewport
        mod.render_levels = subsurf_levels    # mức khi render
    if material:
        obj.data.materials.append(material)
    return obj


def point_on_sphere(radius, azimuth_deg, elevation_deg):
    """Điểm trên mặt cầu tâm gốc toạ độ. azimuth 0° = hướng về camera (trục -Y)."""
    az, el = math.radians(azimuth_deg), math.radians(elevation_deg)
    return Vector((math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el))) * radius


# ---------------------------------------------------------------------------
# Kiểm tra kênh alpha của file ảnh đã lưu
# ---------------------------------------------------------------------------

def check_alpha(path):
    """Đọc lại ảnh, trả về thống kê kênh alpha: góc ảnh phải = 0 (trong suốt), giữa ảnh = 1."""
    img = bpy.data.images.load(path, check_existing=False)
    w, h = img.size
    px = np.empty(w * h * 4, dtype=np.float32)
    img.pixels.foreach_get(px)                # pixels: RGBA float, hàng dưới cùng trước
    rgba = px.reshape(h, w, 4)
    alpha = rgba[:, :, 3]
    stats = {
        "channels": img.channels,
        "size": [w, h],
        "alpha_corner": float(alpha[0, 0]),
        "alpha_center": float(alpha[h // 2, w // 2]),
        "fully_transparent_pct": round(float((alpha == 0).mean() * 100), 1),
        "fully_opaque_pct": round(float((alpha >= 0.999).mean() * 100), 1),
        "partial_alpha_pct": round(float(((alpha > 0) & (alpha < 0.999)).mean() * 100), 1),
    }
    bpy.data.images.remove(img)
    return stats


# ---------------------------------------------------------------------------
# Chương trình chính
# ---------------------------------------------------------------------------

def main():
    args = parse_args()
    out_dir = os.path.abspath(args.out_dir)
    os.makedirs(out_dir, exist_ok=True)
    base = os.path.join(out_dir, "pipeline-test_fuzzy-ball")
    report = {"blender": bpy.app.version_string, "python": sys.version.split()[0]}

    # 1) Cảnh ---------------------------------------------------------------
    clear_scene()
    scene = bpy.context.scene
    body = add_smooth_sphere("Body", radius=1.0, material=make_fuzzy_material())
    eye_mat = make_glossy_eye_material()
    eyes = []
    for side, azimuth in (("L", -18.0), ("R", 18.0)):
        eye = add_smooth_sphere(f"Eye_{side}", radius=0.13, ico_subdivisions=3, subsurf_levels=1,
                                location=point_on_sphere(0.97, azimuth, 12.0), material=eye_mat)
        eyes.append(eye)

    add_three_point_lights(target=(0, 0, 0), distance=5.0)
    add_studio_world(strength=0.35)
    if not args.no_shadow_catcher:
        add_shadow_catcher(z=-1.0)
    add_studio_camera(location=(0.0, -7.5, 0.6), target=(0.0, 0.0, -0.1), lens_mm=70.0)

    # 2) Render GPU ---------------------------------------------------------
    gpu_info = enable_gpu()
    report["gpu"] = gpu_info
    # look "AgX - Punchy": vẫn là AgX nhưng tăng tương phản/độ rực — bù cho việc AgX làm nhạt màu.
    setup_cycles_render(samples=args.samples, resolution=(args.size, args.size),
                        denoiser="OPENIMAGEDENOISE", denoise_on_gpu=True, look="AgX - Punchy")
    report["settings"] = {"samples": args.samples, "size": args.size,
                          "denoiser": scene.cycles.denoiser,
                          "denoise_on_gpu": scene.cycles.denoising_use_gpu,
                          "view_transform": scene.view_settings.view_transform,
                          "look": scene.view_settings.look,
                          "film_transparent": scene.render.film_transparent}
    report["render_seconds"] = {}
    label = f"{gpu_info['device']}_{gpu_info['backend']}"
    report["render_seconds"][f"{label}_cold"] = round(render_still(label=f"{label} (lần 1, cold)"), 2)
    if args.gpu_warm and gpu_info["device"] == "GPU":
        report["render_seconds"][f"{label}_warm"] = round(render_still(label=f"{label} (lần 2, warm)"), 2)
    saved = save_render_outputs(base, png=True, webp=True, webp_quality=90)
    report["outputs"] = {os.path.basename(p): {"size_kb": round(os.path.getsize(p) / 1024, 1),
                                               "alpha": check_alpha(p)} for p in saved}

    # 3) So sánh CPU --------------------------------------------------------
    if args.cpu_compare:
        use_cpu_only()
        scene.cycles.denoising_use_gpu = False   # khử nhiễu cũng chạy CPU cho công bằng
        report["render_seconds"]["CPU"] = round(render_still(label="CPU"), 2)
        cpu_saved = save_render_outputs(base + "_cpu", png=True, webp=False)
        report["outputs"][os.path.basename(cpu_saved[0])] = {
            "size_kb": round(os.path.getsize(cpu_saved[0]) / 1024, 1)}

    # 4) Xuất GLB -----------------------------------------------------------
    if not args.no_glb:
        model_objects = [body, *eyes]            # KHÔNG xuất đèn, camera, shadow catcher
        report["glb_draco"] = export_glb(base + ".glb", objects=model_objects, draco=True)
        report["glb_no_draco"] = export_glb(base + "_no-draco.glb", objects=model_objects, draco=False)

    # 5) Lưu .blend (để mở bằng giao diện Blender xem lại cảnh) -------------
    if args.save_blend and args.save_blend.lower() != "none":
        blend_path = os.path.abspath(args.save_blend)
        os.makedirs(os.path.dirname(blend_path), exist_ok=True)
        bpy.ops.wm.save_as_mainfile(filepath=blend_path, compress=True)
        report["blend_file"] = blend_path

    report_path = base + "_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print("[test_render] BÁO CÁO:\n" + json.dumps(report, indent=2, ensure_ascii=False))
    print(f"[test_render] Đã ghi {report_path}")


if __name__ == "__main__":
    main()
