"""
corgi_props.py — Đồ vật đi kèm tư thế của mascot (tai nghe, sách, bút chì, sổ, micro, trái tim,
nốt nhạc, chữ Z, dấu hỏi, hoa giấy).

Cách dùng: build_corgi() tự gọi build_props(ctx) với danh sách X["props"] của tư thế.
    ctx có: P (concept), X (tư thế), head_frame (khung đầu), head_info, arms (khớp 2 tay),
            chest_front (điểm giữa ngực), collection, mats (vật liệu chung).

Đồ vật cũng dựng bằng SDF (sdf_toolkit) để cùng phong cách "đồ chơi vinyl bo tròn" với nhân vật.
Màu đồ vật theo màu 5 kỹ năng của website (src/design-system/tokens.css):
    Nghe #2e9bf0 · Đọc #8b5cf6 · Viết #f0568c · Nói #13b5a5 · Từ vựng #f5a623
"""

import math
import os

import numpy as np

from sdf_toolkit import (Model, Ellipsoid, Sphere, RoundCone, Capsule, RoundBox, Torus, Lambda,
                         smax, sd2_star5, rotation_matrix, frame_from_axes)
import corgi_materials as M


def srgb(hex_color):
    """Mã màu hex sRGB (như trên web) → màu LINEAR dùng trong Blender."""
    h = hex_color.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(h[i:i + 2], 16) / 255.0
        out.append(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4)
    return tuple(out)


COLORS = {
    "listening": srgb("#2e9bf0"),
    "reading": srgb("#8b5cf6"),
    "writing": srgb("#f0568c"),
    "speaking": srgb("#13b5a5"),
    "vocabulary": srgb("#f5a623"),
    "navy": srgb("#232a5c"),
    "paper": srgb("#f6efe0"),
    "pencil": srgb("#ffc83d"),
    "wood": srgb("#f2cf9b"),
    "graphite": srgb("#3a3a44"),
    "heart": srgb("#ff4f73"),
    "cushion": srgb("#2b2f3a"),
    "mic_mesh": srgb("#4a4f5c"),
    "zzz": srgb("#7fa6ff"),
    "question": srgb("#ffbf2e"),
    "confetti": [srgb("#ffbf2e"), srgb("#ff5a6e"), srgb("#2e9bf0"), srgb("#13b5a5"), srgb("#8b5cf6")],
}


def _norm(v):
    v = np.asarray(v, dtype=np.float64)
    return v / np.linalg.norm(v)


def _mat(ctx, key, maker):
    """Lấy vật liệu đồ vật từ bộ nhớ đệm (tạo 1 lần cho mỗi concept)."""
    mats = ctx["mats"]
    if key not in mats:
        mats[key] = maker()
    return mats[key]


def _vinyl(ctx, name, color, rough=0.32, coat=0.45):
    return _mat(ctx, name, lambda: M.make_glossy(f"M_Prop_{name}", color, roughness=rough, coat=coat,
                                                 coat_rough=0.2, specular=0.4))


def _mesh(ctx, name, sdf, h, mat, verbose, frame=None):
    from corgi_builder import _mesh as build_mesh
    return build_mesh(name, sdf, h, None, ctx["collection"], mat, verbose, frame=frame)


def _round_cylinder(c, axis, radius, half_len, rr):
    """Hình trụ bo mép: tâm c, trục `axis`, bán kính, nửa chiều dài, bán kính bo rr."""
    c = np.asarray(c, float)
    a = _norm(axis)

    def fn(Q):
        q = Q - c
        h = q @ a
        r = np.linalg.norm(q - h[:, None] * a, axis=1)
        dx, dy = r - (radius - rr), np.abs(h) - (half_len - rr)
        return np.hypot(np.maximum(dx, 0), np.maximum(dy, 0)) + np.minimum(np.maximum(dx, dy), 0) - rr
    m = max(radius, half_len) + 0.02
    return Lambda(fn, c - m, c + m)


# =============================================================================
# Các đồ vật
# =============================================================================

def headphones(ctx, verbose):
    """Tai nghe chụp tai: quai cong vắt qua đỉnh mũ, 2 chụp tai xanh "kỹ năng Nghe" ở hai bên má."""
    P, hf, hc, hs = ctx["P"], ctx["head_frame"], ctx["head_info"]["hc"], ctx["P"]["hs"]
    cs = P["cap_scale"]
    crown_x = P["crown_r"][0] * cs
    rx = max(P["cranium"][0], crown_x) + 0.10 * hs        # quai rộng hơn vành mũ
    yb = -0.10 * hs                                         # quai nằm TRƯỚC gốc tai
    zc = -0.03 * hs                                         # tâm chụp tai (so với tâm đầu)
    crown_top = P["cap_off"][2] + (P["crown_z"] + P["crown_r"][2]) * cs
    rz = crown_top + 0.065 * hs - zc
    n = 4.0                                                 # siêu-elip: vai quai "vuông" hơn, không cắt mũ

    def band_fn(Q):
        q = Q - hc
        x, z = q[:, 0] / rx, (q[:, 2] - zc) / rz
        f = (np.abs(x) ** n + np.abs(np.maximum(z, 0)) ** n) ** (1.0 / n) - 1.0
        d_curve = f * min(rx, rz) * 0.85
        d = np.hypot(np.maximum(np.abs(d_curve) - 0.010 * hs, 0), np.maximum(np.abs(q[:, 1] - yb) - 0.030 * hs, 0))
        d = d - 0.012 * hs
        return smax(d, -(q[:, 2] - zc), 0.01)
    lo = hc + np.array([-rx - 0.1, yb - 0.1, zc - 0.05])
    hi = hc + np.array([rx + 0.1, yb + 0.1, zc + rz + 0.1])
    band = Lambda(band_fn, lo, hi)
    objs = {"hp_band": _mesh(ctx, "Headphones_Band", band, 0.003, _vinyl(ctx, "Navy", COLORS["navy"], 0.4, 0.3),
                             verbose, frame=hf)}
    cups, cushions = Model("cups"), Model("cushions")
    for s in (-1, 1):
        c = hc + np.array([s * rx, yb, zc])
        cups.union(_round_cylinder(c, (1, 0, 0), 0.125 * hs, 0.055 * hs, 0.035 * hs))
        cups.union(_round_cylinder(c + np.array([s * 0.045 * hs, 0, 0]), (1, 0, 0), 0.07 * hs, 0.03 * hs,
                                   0.02 * hs), k=0.01)
        inner_x = rx - 0.055 * hs
        cushions.union(Torus(hc + np.array([s * (inner_x - 0.025 * hs), yb, zc]), 0.085 * hs, 0.042 * hs,
                             rot=rotation_matrix(0, 90, 0)))
    objs["hp_cups"] = _mesh(ctx, "Headphones_Cups", cups, 0.003, _vinyl(ctx, "Listening", COLORS["listening"]),
                            verbose, frame=hf)
    objs["hp_cushions"] = _mesh(ctx, "Headphones_Cushions", cushions, 0.003,
                                _vinyl(ctx, "Cushion", COLORS["cushion"], 0.6, 0.1), verbose, frame=hf)
    return objs


def _note_model(origin, scale, tilt_deg):
    """1 nốt nhạc móc đơn (♪): đầu nốt elip nghiêng + thân + đuôi cờ."""
    o = np.asarray(origin, float)
    s = scale
    R = rotation_matrix(0, tilt_deg, 0)
    m = Model("note")
    m.union(Ellipsoid(o, (0.055 * s, 0.035 * s, 0.040 * s), rot=R @ rotation_matrix(0, -25, 0)))
    top = o + R @ np.array([0.046 * s, 0.0, 0.20 * s])
    m.union(Capsule(o + R @ np.array([0.046 * s, 0, 0.0]), top, 0.012 * s), k=0.01 * s)
    m.union(RoundCone(top, top + R @ np.array([0.07 * s, 0.0, -0.09 * s]), 0.022 * s, 0.010 * s), k=0.02 * s)
    return m


def notes(ctx, verbose):
    hf, hc = ctx["head_frame"], ctx["head_info"]["hc"]
    hs = ctx["P"]["hs"]
    m = Model("notes")
    m.union(_note_model(hf.point(hc + np.array([-0.86, -0.12, 0.10]) * np.array([hs, 1, 1])), 1.25, 12))
    m.union(_note_model(hf.point(hc + np.array([-0.70, -0.08, 0.50]) * np.array([hs, 1, 1])), 0.95, -10))
    return {"notes": _mesh(ctx, "Notes", m, 0.0025, _vinyl(ctx, "Listening", COLORS["listening"]), verbose)}


def heart(ctx, verbose):
    """Trái tim ôm trước ngực (an ủi) — đặt TRƯỚC 2 bàn tay để không bị che."""
    c = ctx["chest_front"] + np.array([0.0, -0.30, 0.05])
    k = 1.35
    m = Model("heart")
    for s in (-1, 1):
        m.union(Ellipsoid(c + np.array([s * 0.055, 0, 0.035]) * k, np.array((0.075, 0.05, 0.075)) * k), k=0.02 * k)
    m.union(RoundCone(c + np.array([0, 0, 0.01]) * k, c + np.array([0, 0, -0.10]) * k, 0.07 * k, 0.014 * k),
            k=0.05 * k)
    return {"heart": _mesh(ctx, "Heart", m, 0.0022, _vinyl(ctx, "Heart", COLORS["heart"], 0.28, 0.6), verbose)}


def book(ctx, verbose):
    """Sách mở cầm 2 tay: gáy sách quay ra trước, 2 bìa tím mở hình chữ V, ruột giấy kem, sao vàng trên bìa."""
    S = ctx["chest_front"] + np.array([0.0, -0.40, 0.06])
    W, H = 0.20, 0.30
    covers, pages, stars = Model("covers"), Model("pages"), Model("book_stars")
    th = math.radians(56.0)
    for s in (-1, 1):
        d = np.array([s * math.sin(th), math.cos(th), 0.0])            # hướng bìa từ gáy ra mép
        n = np.array([s * math.cos(th), -math.sin(th), 0.0])           # pháp tuyến mặt NGOÀI bìa
        R = np.stack([d, -n, np.array([0, 0, 1.0])], axis=1)            # trục cục bộ: x = d, y = -n, z = lên
        covers.union(RoundBox(S + d * W * 0.5, (W * 0.5, 0.009, H * 0.5), 0.008, rot=R), k=0.006)
        pages.union(RoundBox(S + d * W * 0.48 - n * 0.030, (W * 0.45, 0.022, H * 0.46), 0.006, rot=R), k=0.004)
        sc = S + d * W * 0.55 + n * 0.010
        Rs = R

        def star_fn(Q, sc=sc, Rs=Rs):
            q = (Q - sc) @ Rs
            return smax(sd2_star5(q[:, 0], q[:, 2], 0.050, 0.45), np.abs(q[:, 1] + 0.004) - 0.005, 0.003)
        stars.union(Lambda(star_fn, sc - 0.08, sc + 0.08))
    covers.union(_round_cylinder(S + np.array([0, 0.004, 0]), (0, 0, 1), 0.022, H * 0.5, 0.008), k=0.01)
    return {
        "book_covers": _mesh(ctx, "Book_Covers", covers, 0.0022, _vinyl(ctx, "Reading", COLORS["reading"]), verbose),
        "book_pages": _mesh(ctx, "Book_Pages", pages, 0.0022, _vinyl(ctx, "Paper", COLORS["paper"], 0.6, 0.1), verbose),
        "book_stars": _mesh(ctx, "Book_Stars", stars, 0.0015, ctx["mats"]["gold"], verbose),
    }


def _arm(ctx, side):
    for a in ctx["arms"]:
        if a["side"] == side:
            return a
    raise KeyError(side)


def notepad(ctx, verbose):
    """Sổ tay nằm trên lòng bàn tay TRÁI (bìa hồng "kỹ năng Viết", giấy kem)."""
    a = _arm(ctx, +1)
    R = a["paw_R"]
    palm = -R[:, 1]
    pr = ctx["P"]["paw_r"]
    c = a["paw"] + palm * (pr[1] + 0.018) + R[:, 2] * 0.03
    Rn = np.stack([R[:, 0], -palm, R[:, 2]], axis=1)
    cover = RoundBox(c, (0.12, 0.012, 0.15), 0.008, rot=Rn)
    page = RoundBox(c + palm * 0.016, (0.108, 0.008, 0.138), 0.005, rot=Rn)
    return {
        "notepad_cover": _mesh(ctx, "Notepad_Cover", cover, 0.002, _vinyl(ctx, "Writing", COLORS["writing"]), verbose),
        "notepad_page": _mesh(ctx, "Notepad_Page", page, 0.002, _vinyl(ctx, "Paper", COLORS["paper"], 0.6, 0.1), verbose),
    }


def pencil(ctx, verbose):
    """Bút chì to cầm trong nắm tay PHẢI, đầu bút chĩa về phía sổ tay."""
    a = _arm(ctx, -1)
    R = a["paw_R"]
    axis = _norm(R[:, 0])
    try:
        target = _arm(ctx, +1)["paw"]
        if np.dot(target - a["paw"], axis) < 0:
            axis = -axis
    except KeyError:
        pass
    c = a["paw"]
    r = 0.030
    body_a, body_b = c - axis * 0.13, c + axis * 0.17
    body = _round_cylinder((body_a + body_b) / 2, axis, r, 0.15, 0.006)
    wood = RoundCone(body_b, body_b + axis * 0.085, r * 0.95, 0.007)
    tip = Sphere(body_b + axis * 0.085, 0.010)
    ferrule = _round_cylinder(body_a - axis * 0.018, axis, r * 1.05, 0.022, 0.004)
    eraser = _round_cylinder(body_a - axis * 0.058, axis, r * 1.0, 0.024, 0.012)
    return {
        "pencil_body": _mesh(ctx, "Pencil_Body", body, 0.002, _vinyl(ctx, "Pencil", COLORS["pencil"]), verbose),
        "pencil_wood": _mesh(ctx, "Pencil_Wood", wood, 0.0016, _vinyl(ctx, "Wood", COLORS["wood"], 0.6, 0.05), verbose),
        "pencil_tip": _mesh(ctx, "Pencil_Tip", tip, 0.0012, _vinyl(ctx, "Graphite", COLORS["graphite"], 0.35, 0.2), verbose),
        "pencil_ferrule": _mesh(ctx, "Pencil_Ferrule", ferrule, 0.0016, ctx["mats"]["gold"], verbose),
        "pencil_eraser": _mesh(ctx, "Pencil_Eraser", eraser, 0.0016, _vinyl(ctx, "Writing", COLORS["writing"]), verbose),
    }


def mic(ctx, verbose):
    """Micro cầm tay: tay cầm xanh ngọc "kỹ năng Nói", đầu lưới xám, vòng bạc. Đầu micro hướng về miệng."""
    a = _arm(ctx, -1)
    hf, hi = ctx["head_frame"], ctx["head_info"]
    mouth = hf.point(hi["mouth_p"])
    axis = _norm(mouth - a["paw"])
    c = a["paw"]
    handle = RoundCone(c - axis * 0.11, c + axis * 0.10, 0.030, 0.040)
    ring = _round_cylinder(c + axis * 0.115, axis, 0.050, 0.018, 0.008)
    ball = Sphere(c + axis * 0.19, 0.078)
    gray = _mat(ctx, "MicMesh", lambda: M.make_glossy("M_Prop_MicMesh", COLORS["mic_mesh"], roughness=0.45, coat=0.2,
                                                      bump_scale=220.0, bump_strength=0.35))
    return {
        "mic_handle": _mesh(ctx, "Mic_Handle", handle, 0.002, _vinyl(ctx, "Speaking", COLORS["speaking"]), verbose),
        "mic_ring": _mesh(ctx, "Mic_Ring", ring, 0.0016, ctx["mats"]["gold"], verbose),
        "mic_ball": _mesh(ctx, "Mic_Ball", ball, 0.002, gray, verbose),
    }


def confetti(ctx, verbose):
    """Hoa giấy ăn mừng: sao vàng + dải giấy cong + hạt tròn nhiều màu, rải quanh nửa trên (cố định, không ngẫu nhiên)."""
    hc_w = ctx["head_frame"].point(ctx["head_info"]["hc"])
    rng = np.random.default_rng(7)
    groups = {i: Model(f"confetti_{i}") for i in range(len(COLORS["confetti"]))}
    stars = Model("confetti_stars")
    spots = [(-0.92, 0.05), (-0.80, 0.50), (-0.60, 0.78), (0.62, 0.80), (0.85, 0.46), (0.93, 0.02),
             (-0.95, -0.42), (0.95, -0.40), (-0.34, 0.92), (0.30, 0.95), (-0.78, -0.80), (0.80, -0.78)]
    for i, (dx, dz) in enumerate(spots):
        c = hc_w + np.array([dx, -0.25 + rng.uniform(-0.1, 0.1), dz * 0.85])
        kind = i % 3
        if kind == 0:   # sao vàng nghiêng
            R = rotation_matrix(90 + rng.uniform(-25, 25), rng.uniform(-40, 40), rng.uniform(-30, 30))

            def sfn(Q, c=c, R=R):
                q = (Q - c) @ R
                return smax(sd2_star5(q[:, 0], q[:, 1], 0.065, 0.48), np.abs(q[:, 2]) - 0.012, 0.008)
            stars.union(Lambda(sfn, c - 0.1, c + 0.1))
        elif kind == 1:  # dải giấy cong (nửa vòng xuyến)
            R = rotation_matrix(rng.uniform(0, 180), rng.uniform(0, 180), rng.uniform(0, 180))
            tor = Torus(c, 0.045, 0.012, rot=R, scale_xy=(1.0, 0.6))
            half = Lambda(lambda Q, c=c, R=R: ((Q - c) @ R)[:, 0], c - 0.1, c + 0.1)
            m = Model("rib")
            m.union(tor)
            m.intersect(half, k=0.0)
            groups[i % len(groups)].union(m)
        else:            # hạt tròn
            groups[i % len(groups)].union(Sphere(c, 0.028))
    objs = {"confetti_stars": _mesh(ctx, "Confetti_Stars", stars, 0.002, ctx["mats"]["gold"], verbose)}
    for i, g in groups.items():
        if g.ops:
            objs[f"confetti_{i}"] = _mesh(ctx, f"Confetti_{i}", g, 0.002,
                                          _vinyl(ctx, f"Confetti{i}", COLORS["confetti"][i]), verbose)
    return objs


# --- Chữ nổi 3D (Z z z, ?) dùng object Text của Blender ---------------------------------------

def _font():
    import bpy
    for path in ("C:/Windows/Fonts/seguibl.ttf", "C:/Windows/Fonts/ariblk.ttf", "C:/Windows/Fonts/arialbd.ttf"):
        if os.path.exists(path):
            return bpy.data.fonts.load(path, check_existing=True)
    return None


def _text(ctx, name, body, location, size, mat, tilt=0.0):
    import bpy
    curve = bpy.data.curves.new(name, "FONT")
    curve.body = body
    f = _font()
    if f:
        curve.font = f
    curve.size = size
    curve.align_x, curve.align_y = "CENTER", "CENTER"
    curve.extrude = size * 0.09
    curve.bevel_depth = size * 0.035
    curve.bevel_resolution = 3
    obj = bpy.data.objects.new(name, curve)
    ctx["collection"].objects.link(obj)
    obj.location = tuple(float(v) for v in location)
    # chữ dựng đứng (mặt phẳng XZ) và quay mặt về phía camera của pose
    obj.rotation_euler = (math.radians(90), math.radians(tilt), math.radians(ctx["X"]["view"]))
    obj.data.materials.append(mat)
    return obj


def zzz(ctx, verbose):
    hf, hc = ctx["head_frame"], ctx["head_info"]["hc"]
    mat = _vinyl(ctx, "Zzz", COLORS["zzz"], 0.3, 0.4)
    objs = {}
    for i, (dx, dz, size) in enumerate(((0.66, 0.30, 0.18), (0.84, 0.52, 0.24), (0.74, 0.78, 0.30))):
        p = hf.point(hc + np.array([dx, -0.15, dz]))
        objs[f"zzz_{i}"] = _text(ctx, f"Zzz_{i}", "Z" if i == 2 else "z", p, size, mat, tilt=-12 + i * 8)
    return objs


def question(ctx, verbose):
    hf, hc = ctx["head_frame"], ctx["head_info"]["hc"]
    p = hf.point(hc + np.array([0.78, -0.10, 0.62]))
    return {"question": _text(ctx, "Question", "?", p, 0.42, _vinyl(ctx, "Question", COLORS["question"]), tilt=12)}


BUILDERS = {
    "headphones": headphones, "notes": notes, "heart": heart, "book": book, "notepad": notepad,
    "pencil": pencil, "mic": mic, "confetti": confetti, "zzz": zzz, "question": question,
}


def build_props(ctx, verbose=True):
    """Dựng mọi đồ vật trong X["props"]. Trả về dict tên → object."""
    objs = {}
    for name in ctx["X"]["props"]:
        objs.update(BUILDERS[name](ctx, verbose))
    return objs
