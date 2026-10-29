"""
corgi_builder.py — Dựng toàn bộ mascot Corgi (thân lông + đồng phục + mũ kê-pi + biểu cảm + đồ vật).

HAI LOẠI THÔNG SỐ:
    P  = thông số CONCEPT (hình dáng, màu sắc, đồng phục) — xem corgi_concepts.py
    X  = thông số TƯ THẾ + BIỂU CẢM (tay đặt đâu, mắt/miệng kiểu gì, cầm đồ gì) — xem corgi_poses.py
    → cùng một concept có thể dựng ra mọi tư thế; cùng một tư thế dùng được cho mọi concept.

LUỒNG CHÍNH:  build_corgi(P, pose, collection)
    1) Đầu (thiết kế ở toạ độ "đầu đứng thẳng"): sọ, má, mõm, tai, lông mày, khoét miệng + hốc mắt
       theo biểu cảm. Rồi đặt vào thế giới bằng khung Frame (nghiêng/cúi/quay đầu).
    2) Thân, chân; tay tính bằng IK 2 khớp (vai → khuỷu → bàn tay) theo "mục tiêu" của tư thế.
       Tay hoạt hình được phép DÀI RA khi với không tới (vd tay chào chạm vành mũ).
    3) Hợp MỀM đầu + thân + tai + chân thành MỘT khối lông liền (không có đường ghép).
    4) Áo = bề mặt thân nở thêm vài cm + hàm nếp gấp; cổ áo, cầu vai, thắt lưng, túi = "lớp vỏ" bám
       theo bề mặt áo (shell) cắt theo hình 2D → tự ôm sát như shrinkwrap.
    5) Mũ kê-pi, mắt, mũi, lưỡi, huy hiệu, đồ vật (tai nghe, sách...) = các object riêng.
    6) Tính "mặt nạ màu" (vùng trắng, trong tai, trong miệng, đệm thịt bàn tay...) cho từng đỉnh.

Mọi hàm khoảng cách dùng sdf_toolkit (xem giải thích SDF ở đầu file đó).
"""

import math

import numpy as np

from sdf_toolkit import (Model, Ellipsoid, Sphere, RoundCone, Capsule, RoundBox, Torus, Lambda, Transformed,
                         FlatRoundCone, smin, smax, smoothstep, sd2_star5, sd2_polygon, sd2_polyline,
                         sd2_ellipse_approx, sd2_vesica, rotation_matrix, frame_from_axes, mesh_from_sdf,
                         to_blender_object, add_point_attribute, sphere_trace)
import corgi_materials as M
from corgi_poses import get_pose


# =============================================================================
# Khung toạ độ (vị trí + hướng) — để gắn mắt, mũ... theo đầu
# =============================================================================

class Frame:
    """Khung toạ độ: điểm p (cục bộ) → o + R·p (thế giới). Cột của R = các trục cục bộ."""

    def __init__(self, origin=(0, 0, 0), R=None):
        self.o = np.asarray(origin, dtype=np.float64)
        self.R = np.eye(3) if R is None else np.asarray(R, dtype=np.float64)

    def compose(self, child):
        return Frame(self.o + self.R @ child.o, self.R @ child.R)

    def to_world(self, P):
        return np.asarray(P, dtype=np.float64) @ self.R.T + self.o

    def point(self, p):
        """Một điểm cục bộ → thế giới."""
        return self.to_world(np.asarray(p, dtype=np.float64)[None, :])[0]

    def to_local(self, P):
        return (np.asarray(P, dtype=np.float64) - self.o) @ self.R

    def matrix(self):
        from mathutils import Matrix
        m = Matrix.Identity(4)
        for i in range(3):
            for j in range(3):
                m[i][j] = float(self.R[i, j])
            m[i][3] = float(self.o[i])
        return m


def _norm(v):
    v = np.asarray(v, dtype=np.float64)
    return v / np.linalg.norm(v)


def two_bone_ik(shoulder, target, l1, l2, pole):
    """IK 2 khớp: trả về (khuỷu, cổ tay) sao cho vai→khuỷu = l1, khuỷu→đích = l2, khuỷu lệch về phía `pole`."""
    s, t = np.asarray(shoulder, float), np.asarray(target, float)
    d = float(np.linalg.norm(t - s))
    d = min(d, (l1 + l2) * 0.999)
    u = (t - s) / np.linalg.norm(t - s)
    a = (l1 * l1 - l2 * l2 + d * d) / (2 * d)
    h = math.sqrt(max(l1 * l1 - a * a, 0.0))
    v = np.asarray(pole, float) - np.dot(pole, u) * u
    v /= np.linalg.norm(v)
    return s + a * u + h * v, s + u * d


def _mirror(p, s):
    """Lật toạ độ X theo phía tay/tai: s = +1 (bên trái nhân vật, X dương) hoặc -1."""
    return np.array([p[0] * s, p[1], p[2]], dtype=np.float64)


def surface_front(model, x, z, start_y=-2.0):
    """Điểm trên bề mặt `model` nhìn từ PHÍA TRƯỚC (bắn tia từ y = -2 m theo hướng +Y) tại (x, z)."""
    return sphere_trace(model, (x, start_y, z), (0.0, 1.0, 0.0), max_dist=4.0)


def surface_top(model, x, y, start_z=3.0):
    """Điểm trên bề mặt nhìn từ TRÊN XUỐNG (bắn tia từ z = 3 m theo hướng -Z) tại (x, y)."""
    return sphere_trace(model, (x, y, start_z), (0.0, 0.0, -1.0), max_dist=4.0)


# =============================================================================
# 1. ĐẦU (toạ độ thiết kế: đầu đứng thẳng)
# =============================================================================

# Lông mày theo biểu cảm: (độ nhướng lên m, góc độ — dương = đầu TRONG của lông mày nhướng lên)
BROW_SHAPES = {
    "soft": {"L": (0.0, 4.0), "R": (0.0, 4.0)},
    "worried": {"L": (0.012, 24.0), "R": (0.012, 24.0)},
    "raised": {"L": (0.034, 8.0), "R": (0.034, 8.0)},
    "one_up": {"L": (0.036, -12.0), "R": (-0.004, 10.0)},
}


def eyes_closed(X, side):
    """Mắt bên `side` có nhắm không (cười ^ ^, buồn ngủ, hoặc bên nháy mắt)."""
    if X["eyes"] in ("happy", "sleepy"):
        return True
    return X["eyes"] == "wink" and side > 0


def build_head(P, X):
    """Trả về (model_đầu, info). info chứa khung mắt, mũi, miệng, tai, lông mày... để dựng chi tiết + mặt nạ màu."""
    hc = np.asarray(P["head_center"], float)
    hs = P["hs"]
    m = Model("head")
    m.union(Ellipsoid(hc, P["cranium"]))
    m.union(Ellipsoid(hc + P["forehead_off"], P["forehead_r"]), k=0.10 * hs)
    for s in (-1, 1):
        m.union(Ellipsoid(hc + _mirror(P["cheek_off"], s), P["cheek_r"]), k=P["cheek_k"])
    m.union(Ellipsoid(hc + P["muzzle_off"], P["muzzle_r"]), k=P["muzzle_k"])
    if P["muzzle_tip"]:
        off, r = P["muzzle_tip"]
        m.union(Ellipsoid(hc + off, r), k=0.09 * hs)
    a, b, r = P["bridge"]
    m.union(Capsule(hc + a, hc + b, r), k=0.08 * hs)
    m.union(Ellipsoid(hc + P["chin_off"], P["chin_r"]), k=0.05 * hs)

    # --- Túm lông má: viền gợn sóng MỀM ở má (đầu túm to + hợp mềm rộng → không thành gai nhọn) ---
    for s in (-1, 1):
        for a, b, r0, r1 in P["cheek_tufts"]:
            m.union(RoundCone(hc + _mirror(a, s), hc + _mirror(b, s), r0, r1), k=P["tuft_k"])

    info = {"hc": hc}

    # --- TAI: lá tai dẹt + lòng tai khoét vào. Góc tai cộng thêm theo biểu cảm (vểnh / cụp) ---
    ears = []
    for s in (-1, 1):
        base = hc + _mirror(P["ear_base_off"], s)
        out = math.radians(P["ear_out_deg"] + X["ears"]["out"])
        back = math.radians(P["ear_back_deg"] + X["ears"]["back"])
        axis = _norm((s * math.sin(out), math.sin(back), math.cos(out)))
        tip = base + axis * P["ear_len"]
        fo = math.radians(P["ear_face_out_deg"])
        facing = _norm((s * math.sin(fo), -math.cos(fo), 0.0))
        outer = FlatRoundCone(base, tip, P["ear_r_base"], P["ear_r_tip"], facing, P["ear_thick"])
        f_orth = facing - np.dot(facing, axis) * axis
        f_orth /= np.linalg.norm(f_orth)
        # Lòng tai đặt SÁT mặt trước của lá tai (theo đúng độ dày tai) → luôn khoét thủng mặt trước thành
        # hốc rõ ràng. (Nếu đặt sâu quá, hốc thành "bọt khí" ẩn trong tai, chỉ làm lõm lấm tấm ở ngọn tai.)
        inner_base = base + axis * (P["ear_len"] * 0.20) + f_orth * (P["ear_r_base"] * P["ear_thick"] * 0.80)
        inner_tip = tip - axis * (P["ear_len"] * 0.15) + f_orth * (P["ear_r_tip"] * P["ear_thick"] * 0.80)
        inner = FlatRoundCone(inner_base, inner_tip, P["ear_r_base"] * P["ear_inner"], P["ear_r_tip"] * 0.45,
                              facing, P["ear_thick"] * 0.72)
        m.union(outer, k=0.07 * hs)
        m.subtract(inner, k=0.022 * hs)
        ears.append({"base": base, "tip": tip, "axis": axis, "inner": inner, "front": f_orth})
    info["ears"] = ears

    # --- LÔNG MÀY: 2 mảng lông kem nhô nhẹ trên mắt; góc + độ nhướng theo biểu cảm ---
    info["brows"] = []
    if P["brow"] and X["brows"]:
        bx, bz_gap, rx, rz, height = P["brow"]
        bz = P["eye_pos"][1] + P["eye_size"][1] + bz_gap
        shape = BROW_SHAPES[X["brows"]]
        for s in (-1, 1):
            lift, ang = shape["L" if s > 0 else "R"]
            p0, n0 = surface_front(m, s * bx, hc[2] + bz + lift)
            R = frame_from_axes(n0) @ rotation_matrix(0, s * ang, 0)
            ry = 0.026 * hs
            c = p0 - n0 * (ry - height)
            m.union(Ellipsoid(c, (rx, ry, rz), rot=R), k=0.018 * hs)
            info["brows"].append((c, (rx + 0.004 * hs, 0.06 * hs, rz + 0.004 * hs), R))

    # --- MŨI: tìm điểm đầu mõm ---
    nose_p, nose_n = surface_front(m, 0.0, hc[2] + P["nose_z"])
    info["nose"] = (nose_p, nose_n)

    # --- MIỆNG theo biểu cảm (xem make_mouth) ---
    mouth_p, _ = surface_front(m, 0.0, hc[2] + P["mouth_z"])
    mouth = make_mouth(P, X, mouth_p, nose_p)
    if mouth["carve"] is not None:
        m.subtract(mouth["carve"], k=mouth["k"])
    # (rãnh nhân trung KHÔNG khoét nữa — rãnh hẹp hơn 2 ô lưới bị lỗ chỗ như vết khâu; giờ vẽ bằng màu,
    #  xem mouth["mask"])
    info["mouth"] = mouth
    info["mouth_p"] = mouth_p

    # --- MẮT: tìm điểm trên mặt, khoét hốc nông (chỉ khi mắt MỞ), ghi lại khung để đặt nhãn cầu ---
    eyes = []
    ex, ez = P["eye_pos"]
    rx, rz = P["eye_size"]
    for s in (-1, 1):
        p0, n0 = surface_front(m, s * ex, hc[2] + ez)
        fwd = _norm(n0 * 0.55 + np.array([0, -1.0, 0]) * 0.45)
        R = frame_from_axes(fwd, up_hint=(0, 0, 1))
        frame = Frame(p0, R)
        eyes.append((s, frame))
        if not eyes_closed(X, s):
            k = 1.12 if X["eyes"] == "wide" else 1.0
            socket = Transformed(Ellipsoid((0, 0.004, 0), (rx * k + 0.014 * hs, 0.034 * hs, rz * k + 0.014 * hs),
                                           rot=rotation_matrix(0, s * P["eye_tilt"], 0)), frame.o, frame.R)
            m.subtract(socket, k=0.018 * hs)
    info["eyes"] = eyes
    return m, info


def make_mouth(P, X, mouth_p, nose_p):
    """
    Hình miệng theo biểu cảm X["mouth"]. Trả về dict:
        carve    : hình để KHOÉT vào đầu (None nếu không khoét)
        philtrum : rãnh nhân trung (từ mũi xuống miệng)
        mask(H)  : hàm khoảng cách → tô màu đỏ sẫm trong miệng / đường môi
        tongue   : mô tả lưỡi (None = không có lưỡi)
    Miệng mở = hình chữ "D" nằm ngang: mép trên gần thẳng, mép dưới cong võng, 2 khoé nhếch lên → nụ cười.
    """
    hs = P["hs"]
    hw, op, cv = P["mouth_halfwidth"], P["mouth_open"], P["mouth_curve"]
    my, mz = float(mouth_p[1]), float(mouth_p[2])
    kind = X["mouth"]
    out = {"kind": kind, "carve": None, "philtrum": None, "tongue": None, "k": 0.012 * hs}
    nb_z = float(nose_p[2]) - P["nose_r"][2] * 0.7          # chân mũi

    def with_philtrum(mask_fn, z_end):
        """Thêm đường nhân trung mảnh (vẽ màu) từ chân mũi xuống mép trên của miệng."""
        def fn(H):
            seg = sd2_polyline(H[:, 0], H[:, 2], [(0.0, nb_z), (0.0, z_end)]) - 0.0042 * hs
            return np.minimum(mask_fn(H), front_only(H, seg))
        return fn

    def depth(Q, extra=0.0):
        # đáy hốc miệng: lùi sâu hơn ở 2 khoé vì mõm cong ra sau
        return Q[:, 1] - (my + (0.045 + extra) * hs + 2.0 * Q[:, 0] ** 2)

    def front_only(Q, d):
        return np.where(Q[:, 1] < my + 0.10 * hs, d, 1.0)

    top_c = mz + 0.012 * hs        # mép trên ở giữa
    if kind in ("smile", "tongue", "wide", "tongue_side"):
        wk = 1.12 if kind == "wide" else (0.85 if kind == "tongue_side" else 1.0)
        ok = {"smile": 1.25, "tongue": 1.35, "wide": 2.1, "tongue_side": 0.9}[kind]
        w, o = hw * wk, op * ok
        ts = np.linspace(-1, 1, 23)
        top = [(w * t, top_c + cv * t * t - 0.010 * hs * math.exp(-(t / 0.2) ** 2)) for t in ts]
        bot = [(w * t, top_c + cv * t * t - o * (1 - t * t) ** 0.85) for t in ts[::-1]][1:-1]
        poly = top + bot
        zb0 = top_c - o                                 # đáy mép dưới (giữa)

        def d2(Q, poly=poly):
            return sd2_polygon(Q[:, 0], Q[:, 2], poly)
        bb = ((-w - 0.04, my - 0.2, zb0 - 0.04), (w + 0.04, my + 0.2, top_c + cv + 0.04))
        out["carve"] = Lambda(lambda Q: smax(d2(Q), depth(Q), 0.012 * hs), bb[0], bb[1])
        out["mask"] = with_philtrum(lambda H: front_only(H, d2(H) - 0.0035 * hs), top_c)
        side = P["tongue_side"]
        if kind == "tongue":
            L = P["tongue_len"]
            out["tongue"] = {"style": "out", "path": [
                (side * 0.2, my + 0.050 * hs, zb0 + 0.022 * hs),
                (side * 0.5, my - 0.010 * hs, zb0 + 0.006 * hs),
                (side * 0.8, my - 0.030 * hs, zb0 - 0.030 * hs),
                (side, my - 0.036 * hs, zb0 - L * 0.62)], "w": P["tongue_w"]}
        elif kind == "tongue_side":
            # lưỡi thè ra ở KHOÉ miệng (tập trung khi viết)
            sx = -w * 0.55
            out["tongue"] = {"style": "out", "path": [
                (sx * 0.6, my + 0.040 * hs, zb0 + 0.02 * hs),
                (sx, my - 0.012 * hs, zb0 + 0.004 * hs),
                (sx * 1.15, my - 0.020 * hs, zb0 - 0.040 * hs)], "w": P["tongue_w"] * 0.75}
        else:
            big = kind == "wide"
            out["tongue"] = {"style": "in", "c": (0.0, my + (0.035 if big else 0.022) * hs, zb0 + 0.016 * hs),
                             "r": (w * (0.62 if big else 0.56), (0.062 if big else 0.052) * hs,
                                   (0.040 if big else 0.030) * hs)}
    elif kind in ("o", "o_small"):
        rx, rz = ((0.044, 0.054) if kind == "o" else (0.030, 0.034))
        rx, rz = rx * hs, rz * hs
        zc = mz - 0.012 * hs

        def d2(Q, rx=rx, rz=rz, zc=zc):
            return sd2_ellipse_approx(Q[:, 0], Q[:, 2] - zc, rx, rz)
        bb = ((-rx - 0.04, my - 0.2, zc - rz - 0.04), (rx + 0.04, my + 0.2, zc + rz + 0.04))
        out["carve"] = Lambda(lambda Q: smax(d2(Q), depth(Q, 0.01), 0.010 * hs), bb[0], bb[1])
        out["mask"] = with_philtrum(lambda H: front_only(H, d2(H) - 0.003 * hs), zc + rz)
        out["tongue"] = {"style": "in", "c": (0.0, my + 0.04 * hs, zc - rz * 0.55),
                         "r": (rx * 0.75, 0.045 * hs, rz * 0.45)}
        out["k"] = 0.010 * hs
    else:  # "closed": đường miệng chữ w (khép), khoé nhếch lên
        w = hw * 0.95
        nb = float(nose_p[2]) - P["nose_r"][2] * 0.8
        line = [(0.0, nb), (0.0, top_c + 0.008 * hs),
                (w * 0.30, mz - 0.010 * hs), (w * 0.62, mz - 0.004 * hs + cv * 0.25), (w, mz + cv * 0.85)]
        pts = [(-x, z) for x, z in line[::-1]] + line[1:]
        # 2 nhánh: (khoé trái → giữa → khoé phải) + (giữa → mũi) — dùng chung đường gấp khúc
        left_right = [(-x, z) for x, z in line[:1:-1]] + [(0.0, line[1][1])] + line[2:]
        r = 0.0085 * hs

        def d2(Q):
            a = sd2_polyline(Q[:, 0], Q[:, 2], left_right)
            b = sd2_polyline(Q[:, 0], Q[:, 2], line[:2])
            return np.minimum(a, b) - r
        bb = ((-w - 0.04, my - 0.2, mz - 0.06), (w + 0.04, my + 0.2, nb + 0.03))
        out["carve"] = Lambda(lambda Q: smax(d2(Q), Q[:, 1] - (my + 0.03 * hs + 2.0 * Q[:, 0] ** 2), 0.006 * hs),
                              bb[0], bb[1])
        out["mask"] = lambda H: front_only(H, d2(H) + r - 0.0055 * hs)
        out["k"] = 0.006 * hs
        del pts
    return out


# =============================================================================
# 2. THÂN + TAY CHÂN (toạ độ thế giới)
# =============================================================================

def torso_core(P):
    """Phần thân (không có đầu, tay, chân) — dùng làm "người nộm" để may áo/thắt lưng."""
    t = Model("torso_core")
    t.union(Ellipsoid(P["torso_c"], P["torso_r"]))
    t.union(Ellipsoid(P["belly_c"], P["belly_r"]), k=0.10)
    t.union(Ellipsoid(P["chest_c"], P["chest_r"]), k=0.10)
    for s in (-1, 1):
        t.union(Sphere(_mirror(P["shoulder"], s), P["shoulder_r"]), k=0.10)
        t.union(Sphere(_mirror(P["butt_c"], s) + (0, -0.02, 0.06), P["butt_r"] * 0.85), k=0.10)
    # cổ: để áo ôm lên tới chân cổ (cổ áo đứng), phần trên bị đầu che
    top = P["shirt_top"]
    t.union(Capsule((0, 0.0, P["chest_c"][2]), (0, 0.01, top + 0.05), P["neck_r"] + 0.012), k=0.07)
    return t


def arm_chain(P, X, side, head_frame, head_info, chest_front):
    """
    Tính các khớp của 1 cánh tay theo tư thế. Trả về dict: shoulder, elbow, paw (tâm bàn tay),
    paw_R (khung bàn tay: cột 0 = ngang bàn, cột 1 = hướng MU bàn tay, cột 2 = hướng các ngón), grip.
    """
    spec = X["arms"]["R" if side < 0 else "L"]
    mode = spec["mode"]
    sh = _mirror(P["shoulder"], side)
    paw_len = P["paw_r"][2]
    hc = head_info["hc"]
    grip = spec.get("grip", "open")

    if mode == "rest":
        target = _mirror(P["neutral_paw"], side)
        l1, l2 = P["arm_len"]
        elbow, paw = two_bone_ik(sh, target, l1, l2, pole=(side * 0.6, 0.6, 0.2))
        fingers = _norm(paw - elbow)
        back = _norm(np.array([side * 0.25, -1.0, 0.0]))          # mu bàn tay quay ra trước
    else:
        if mode == "salute":
            # Tay PHẢI giơ lên chào: bàn tay áp mép vành mũ (trước tai), ngón chỉ chéo lên vào giữa,
            # LÒNG bàn tay quay ra trước (thấy đệm thịt hồng) — đúng kiểu chào của công an Việt Nam.
            sh = sh + np.array([0.0, -0.01, P["salute_shrug"]])     # nhún vai lên
            paw_c = head_frame.point(hc + _mirror(P["salute_paw_off"], side))
            fingers = head_frame.R @ _norm(_mirror(P["salute_fingers"], side))
            palm = head_frame.R @ _norm(_mirror(P["salute_palm"], side))
            pole = _mirror((1.0, -0.15, -0.30), side)
            grip = "open"
        else:  # "reach": đặt tâm bàn tay tại anchor + at
            at = _mirror(spec["at"], side)
            anchor = spec.get("anchor", "shoulder")
            fingers = _norm(_mirror(spec["fingers"], side))
            palm = _norm(_mirror(spec["palm"], side))
            if anchor == "shoulder":
                paw_c = sh + at
            elif anchor == "chest":
                paw_c = chest_front + at
            else:  # "head": toạ độ theo khung đầu (đầu nghiêng thì tay đi theo)
                paw_c = head_frame.point(hc + at)
                fingers = head_frame.R @ fingers
                palm = head_frame.R @ palm
            pole = _mirror(spec.get("pole", (1.0, 0.3, -0.5)), side)
        wrist_t = paw_c - fingers * paw_len * 0.55
        l1, l2 = P["arm_len"]
        d = float(np.linalg.norm(wrist_t - sh))
        if d > 0.93 * (l1 + l2):                     # với không tới → tay "dài ra" (hoạt hình)
            k = d / (0.93 * (l1 + l2))
            l1, l2 = l1 * k, l2 * k
        elbow, wrist = two_bone_ik(sh, wrist_t, l1, l2, pole)
        paw = wrist + fingers * paw_len * 0.55
        back = -palm
    f = back - np.dot(back, fingers) * fingers
    f /= np.linalg.norm(f)
    x = np.cross(f, fingers)
    paw_R = np.stack([x, f, fingers], axis=1)
    return {"shoulder": sh, "elbow": elbow, "paw": paw, "paw_R": paw_R, "side": side, "grip": grip,
            "mode": mode}


def build_body(P, X, head_model, head_frame, head_info, chest_front):
    """Khối lông liền: thân + đầu + chân + mông + đuôi. (Cánh tay là object riêng — xem build_arm.)"""
    body = Model("body")
    if X["head_only"]:
        body.union(Transformed(head_model, head_frame.o, head_frame.R))
        return body, []
    # Thân
    body.union(Ellipsoid(P["torso_c"], P["torso_r"]))
    body.union(Ellipsoid(P["belly_c"], P["belly_r"]), k=0.10)
    body.union(Ellipsoid(P["chest_c"], P["chest_r"]), k=0.10)
    body.union(Capsule((0, 0.0, P["chest_c"][2]), (0, 0.01, P["shirt_top"] + 0.08), P["neck_r"]), k=0.07)
    # Mông tròn xù + đuôi cụt
    for s in (-1, 1):
        body.union(Sphere(_mirror(P["butt_c"], s), P["butt_r"]), k=0.09)
    tc = np.asarray(P["tail_c"], float)
    body.union(Ellipsoid(tc, (0.075, 0.07, 0.085)), k=0.06)
    for dx, dz in ((-0.045, 0.04), (0.045, 0.04), (0.0, 0.075)):
        body.union(RoundCone(tc + (0, -0.02, 0), tc + (dx, 0.06, dz), 0.05, 0.034), k=0.05)
    # Tay: chỉ giữ khối vai trong thân; cánh tay là object RIÊNG — mối nối nằm khuất trong tay áo.
    # Nhờ vậy bàn tay chào áp vào vành mũ / cầm đồ trước ngực mà không bị "chảy" dính vào thân.
    arms = []
    for s in (-1, 1):
        a = arm_chain(P, X, s, head_frame, head_info, chest_front)
        arms.append(a)
        body.union(Sphere(a["shoulder"], P["shoulder_r"]), k=0.10)
    # Chân + bàn chân (đế phẳng nhẹ để đứng vững)
    for s in (-1, 1):
        hip, ank = _mirror(P["hip"], s), _mirror(P["ankle"], s)
        body.union(RoundCone(hip, ank, P["leg_r"][0], P["leg_r"][1]), k=0.07)
        fc = _mirror(P["foot_c"], s)
        body.union(Ellipsoid(fc, P["foot_r"]), k=0.06)
        for gx in (-0.33, 0.33):
            g0 = fc + (gx * P["foot_r"][0], -P["foot_r"][1] * 0.55, P["foot_r"][2] * 0.75)
            g1 = fc + (gx * P["foot_r"][0], -P["foot_r"][1] * 1.05, P["foot_r"][2] * 0.05)
            body.subtract(Capsule(g0, g1, 0.008), k=0.012)
    # Đầu (đã nghiêng theo tư thế) — hợp mềm với thân ở cổ
    body.union(Transformed(head_model, head_frame.o, head_frame.R), k=P["neck_k"])
    # Đế bàn chân phẳng
    body.intersect(Lambda(lambda Q: -Q[:, 2] + 0.004, (-9, -9, -9), (9, 9, 9)), k=0.02)
    return body, arms


def build_arm(P, a):
    """Một cánh tay lông (vai → khuỷu → cổ tay → bàn tay). grip: open (găng xoè) | fist (nắm) | thumb (giơ ngón cái)."""
    arm = Model("arm")
    r_mid = (P["arm_r"][0] + P["arm_r"][1]) / 2
    sh = a["shoulder"]
    R = a["paw_R"]
    pr = np.asarray(P["paw_r"], float)
    arm.union(Sphere(sh, P["arm_r"][0] * 1.05))
    arm.union(RoundCone(sh, a["elbow"], P["arm_r"][0], r_mid), k=0.04)
    wrist = a["paw"] - R[:, 2] * pr[2] * 0.55
    arm.union(RoundCone(a["elbow"], wrist, r_mid, P["arm_r"][1]), k=0.04)
    if a["grip"] == "open":
        # Bàn tay "găng" tròn dẹt + 2 rãnh ngón ở mu bàn tay
        arm.union(Ellipsoid(a["paw"], pr, rot=R), k=0.045)
        for gx in (-0.3, 0.3):
            g0 = a["paw"] + R @ np.array([gx * pr[0], pr[1] * 0.75, pr[2] * 0.35])
            g1 = a["paw"] + R @ np.array([gx * pr[0], pr[1] * 0.55, pr[2] * 1.05])
            arm.subtract(Capsule(g0, g1, 0.0075), k=0.012)
    else:
        # Nắm tay: khối tròn hơn, ngắn hơn; 3 rãnh đốt ngón ở mặt trước
        fist_r = pr * np.array([1.02, 1.18, 0.86])
        arm.union(Ellipsoid(a["paw"], fist_r, rot=R), k=0.045)
        for gx in (-0.33, 0.0, 0.33):
            g0 = a["paw"] + R @ np.array([gx * fist_r[0], -fist_r[1] * 0.35, fist_r[2] * 0.95])
            g1 = a["paw"] + R @ np.array([gx * fist_r[0], fist_r[1] * 0.55, fist_r[2] * 0.95])
            arm.subtract(Capsule(g0, g1, 0.0065), k=0.010)
        if a["grip"] == "thumb":
            # ngón cái: búp tròn chỉ thẳng lên trời
            up = np.array([0.0, 0.0, 1.0])
            base = a["paw"] + up * fist_r[2] * 0.25 - R[:, 1] * fist_r[1] * 0.1
            arm.union(RoundCone(base, base + up * 0.17 + R[:, 2] * 0.01, 0.050, 0.042), k=0.03)
    return arm


# =============================================================================
# 3. MẶT NẠ MÀU LÔNG (tính trên đỉnh lưới thân / tay)
# =============================================================================

def fur_masks(P, V, head_frame, head_info, arms):
    """
    V: đỉnh lưới (thế giới). Trả về dict tên → mảng giá trị.
    Quy ước: giá trị ÂM = nằm trong vùng màu đó (giống SDF), shader dùng smoothstep quanh 0.
    """
    hc = head_info["hc"]
    hs = P["hs"]
    H = head_frame.to_local(V)       # đỉnh đổi sang toạ độ thiết kế của đầu

    # --- Vùng trắng trên mặt: mõm + má dưới + vệt trắng giữa trán (blaze) ---
    face = Model("white_face")
    mo = np.asarray(P["muzzle_off"], float)
    face.union(Ellipsoid(hc + mo + np.array([0, 0.03, -0.06]) * hs,
                         (P["muzzle_r"][0] + 0.12 * hs, P["muzzle_r"][1] + 0.10 * hs, P["muzzle_r"][2] + 0.07 * hs)))
    for s in (-1, 1):
        c = hc + _mirror(P["cheek_off"], s) + np.array([0, -0.02, -0.075]) * hs
        face.union(Ellipsoid(c, (P["cheek_r"][0] * 0.95, P["cheek_r"][1] * 1.1, P["cheek_r"][2] * 0.62)), k=0.06 * hs)
    ez = P["eye_pos"][1]
    if P["blaze"]:
        face.union(RoundCone(hc + np.array([0, -0.42, -0.08]) * hs, hc + np.array([0, -0.36 * hs, ez + 0.20 * hs]),
                             0.05 * hs, P["blaze"] * hs), k=0.06 * hs)
    face.union(Ellipsoid(hc + P["chin_off"], np.asarray(P["chin_r"]) + 0.06 * hs), k=0.04 * hs)
    m_white = face.dist(H)

    # --- Trắng trên thân: ngực-bụng (dưới áo), bàn tay, cẳng chân + bàn chân, mặt dưới mông ---
    chest = Ellipsoid(np.asarray(P["belly_c"]) + (0, -0.12, 0.12), (P["belly_r"][0] * 0.8, 0.2, 0.38))
    m_white = np.minimum(m_white, np.maximum(chest.dist(V), P["shirt_hem"] + 0.04 - V[:, 2]))
    m_pad = np.full(len(V), 1.0)
    pr = np.asarray(P["paw_r"], float)
    for a in arms:
        R = a["paw_R"]
        paw_zone = Ellipsoid(a["paw"] - R[:, 2] * 0.02, pr * (1.25, 1.35, 1.12), rot=R)
        m_white = np.minimum(m_white, paw_zone.dist(V))
        # Đệm thịt hồng ở LÒNG bàn tay (mặt -cột1): 1 đệm lớn + 3 "hạt đậu" ở đầu ngón
        if a["grip"] == "open":
            th = pr[1]
            pads = [Ellipsoid(a["paw"] + R @ np.array([0.0, -th * 0.95, -pr[2] * 0.12]),
                              (pr[0] * 0.48, th * 0.5, pr[2] * 0.36), rot=R)]
            for gx, gz in ((-0.52, 0.55), (0.0, 0.70), (0.52, 0.55)):
                pads.append(Ellipsoid(a["paw"] + R @ np.array([gx * pr[0], -th * 0.80, gz * pr[2]]),
                                      (pr[0] * 0.21, th * 0.5, pr[2] * 0.19), rot=R))
            for pad in pads:
                m_pad = np.minimum(m_pad, pad.dist(V))
    leg_white = V[:, 2] - (P["ankle"][2] + 0.075 + 0.02 * np.sin(V[:, 0] * 30.0))
    legs_region = V[:, 2] < P["hip"][2]
    m_white = np.where(legs_region, np.minimum(m_white, leg_white), m_white)
    tail = Ellipsoid(np.asarray(P["tail_c"]) + (0, 0.03, -0.05), (0.10, 0.10, 0.08))
    m_white = np.minimum(m_white, tail.dist(V))

    # --- Trong tai ---
    m_inner = np.full(len(V), 1.0)
    for e in head_info["ears"]:
        d = e["inner"].dist(H) - 0.004 * hs
        # chỉ tô ở MẶT TRƯỚC của tai: ngọn tai mỏng → mặt sau cũng nằm sát lòng tai, nếu không chặn
        # thì màu kem lem ra sau tai thành các vệt lấm tấm
        behind = ((H - e["base"]) @ e["front"]) < 0.0
        m_inner = np.minimum(m_inner, np.where(behind, 1.0, d))

    # --- Trong miệng (và đường miệng khép) ---
    m_mouth = head_info["mouth"]["mask"](H)

    # --- Lông mày ---
    m_brow = np.full(len(V), 1.0)
    for c, r, R in head_info["brows"]:
        m_brow = np.minimum(m_brow, Ellipsoid(c, r, rot=R).dist(H))

    # --- Má hồng "phun sơn" (airbrush) dưới mắt, lệch ra ngoài ---
    m_blush = np.full(len(V), 1.0)
    ex, ez = P["eye_pos"]
    for s in (-1, 1):
        b = Ellipsoid(hc + np.array([s * (ex + 0.10 * hs), -0.30 * hs, ez - 0.13 * hs]),
                      (0.075 * hs, 0.30 * hs, 0.050 * hs), rot=rotation_matrix(0, -s * 10.0, 0))
        m_blush = np.minimum(m_blush, b.dist(H))

    # --- Độ đậm của màu cam: lưng + đỉnh đầu + ngọn tai đậm hơn ---
    shade = 0.45 * smoothstep(hc[2] - 0.35 * hs, hc[2] + 0.40 * hs, H[:, 2]) + 0.45 * smoothstep(-0.15, 0.35, V[:, 1])
    for e in head_info["ears"]:
        t = np.clip(((H - e["base"]) @ e["axis"]) / np.linalg.norm(e["tip"] - e["base"]), 0, 1)
        near = np.linalg.norm(H - e["base"], axis=1) < 0.75 * hs
        shade = np.where(near, np.maximum(shade, 0.55 + 0.45 * t), shade)
    shade = np.clip(shade, 0, 1)
    return {"m_white": m_white, "m_inner": m_inner, "m_mouth": m_mouth, "m_brow": m_brow, "m_shade": shade,
            "m_blush": m_blush, "m_pad": m_pad}


# =============================================================================
# 4. ÁO + phụ kiện áo
# =============================================================================

def build_shirt(P, arms):
    """
    Áo = thân nộm nở thêm shirt_t, cộng nếp gấp, giới hạn từ gấu áo tới cổ; tay áo ngắn bám theo cánh tay.
    Trả về (shirt_model, shirt_nofold_model, core).
    """
    core = torso_core(P)
    t = P["shirt_t"]
    hem, top = P["shirt_hem"], P["shirt_top"]
    F = P["folds"]

    def build(with_folds):
        body_part = Model("shirt_body")
        body_part.union(core)
        body_part.offset(t)
        if with_folds:
            body_part.displace(lambda Q: _shirt_folds(Q, P, F), (-1.5, -1.5, hem - 0.1), (1.5, 1.5, top + 0.1))
        body_part.intersect(Lambda(lambda Q: Q[:, 2] - top, (-9, -9, -9), (9, 9, 9)), k=0.0)
        body_part.intersect(Lambda(lambda Q: (hem - 0.025 * np.clip(Q[:, 1] * 4, -1, 1)) - Q[:, 2],
                                   (-9, -9, -9), (9, 9, 9)), k=0.006)
        sh = Model("shirt" if with_folds else "shirt_plain")
        sh.union(body_part)
        # Tay áo ngắn: ống côn dọc cánh tay trên, cắt phẳng ở cửa tay (thấy rõ độ dày vải)
        for a in arms:
            s0, e0 = a["shoulder"], a["elbow"]
            end = s0 + (e0 - s0) * P["sleeve_frac"]
            ra = P["arm_r"][0] + P["sleeve_extra"][0]
            rb = P["arm_r"][0] + P["sleeve_extra"][1]
            d = _norm(end - s0)
            sleeve = Model("sleeve")
            sleeve.union(RoundCone(s0 - d * 0.02, end + d * 0.05, ra, rb))
            sleeve.intersect(Lambda(lambda Q, end=end, d=d: (Q - end) @ d, (-9, -9, -9), (9, 9, 9)))
            if with_folds and P["cuffs"]:
                sleeve.union(RoundCone(end - d * 0.035, end, rb + 0.006, rb + 0.006), k=0.01)
                sleeve.intersect(Lambda(lambda Q, end=end, d=d: (Q - end) @ d, (-9, -9, -9), (9, 9, 9)))
            sh.union(sleeve, k=0.05)
        return sh

    return build(True), build(False), core


def _shirt_folds(Q, P, F):
    """
    Nếp gấp vải (giá trị dương = phồng ra, âm = lõm vào), đơn vị mét.
        - Thắt lưng bóp eo áo lại.
        - Ngay trên thắt lưng: vải "bồng" nhẹ + nếp dọc mềm.
        - Dưới thắt lưng: vạt áo xoè + vài nếp.
        - (rich) nếp chéo từ nách xuống ngực, nếp ngang ở lưng.
    """
    x, y, z = Q[:, 0], Q[:, 1], Q[:, 2]
    zb = P["belt_z"]
    theta = np.arctan2(x, -y)
    out = -0.013 * np.exp(-((z - zb) / 0.04) ** 2)
    above = np.clip((z - zb - 0.02) / 0.10, 0, 1) * np.clip((zb + 0.20 - z) / 0.10, 0, 1)
    out += F * above * (0.009 + 0.0055 * np.sin(9 * theta + 0.6) * (0.6 + 0.4 * np.sin(3 * theta)))
    below = np.clip((zb - 0.03 - z) / 0.10, 0, 1)
    out += F * below * (0.010 + 0.006 * np.sin(7 * theta + 1.3))
    if P["fold_detail"] == "rich":
        for s in (-1, 1):
            u = (s * x * 0.7 + (z - 0.70) * 0.7)
            band = np.exp(-((s * x - 0.22) / 0.09) ** 2) * np.exp(-((z - 0.68) / 0.08) ** 2) * (y < 0)
            out += F * 0.004 * band * np.sin(u * 60.0)
        back = np.exp(-((z - 0.70) / 0.10) ** 2) * (y > 0.05)
        out += F * 0.0035 * back * np.sin(z * 70.0 + x * 8.0)
    return out


def shell_on(surface, offset, half_thick, region2d, bbox, k=0.005, extra=None):
    """
    "Lớp vỏ bám bề mặt": tấm dày 2*half_thick nằm cách `surface` một khoảng `offset`,
    chỉ giữ phần nằm trong region2d(Q) < 0. Dùng cho cổ áo, cầu vai, nẹp áo, túi, thắt lưng.
    """
    def fn(Q):
        d = np.abs(surface.dist(Q) - offset) - half_thick
        d = smax(d, region2d(Q), k)
        if extra is not None:
            d = smax(d, extra(Q), k)
        return d
    return Lambda(fn, bbox[0], bbox[1])


def build_uniform_parts(P, arms, shirt, shirt_plain, core, collection, mats, verbose=True):
    """Cổ áo + miếng ve đỏ, nẹp + cúc, cầu vai, thắt lưng + khoá, túi ngực (nếu có)."""
    objs = {}
    poly_r = P["collar_poly"]
    top = P["shirt_top"]

    # ---- Cổ áo (2 vạt nhọn chữ V) ----
    def collar_region(Q, inset=0.0):
        d = np.full(len(Q), 1e3)
        for s in (-1, 1):
            pts = [(x * s, z) for x, z in poly_r]
            if s == 1:
                pts = pts[::-1]
            d = np.minimum(d, sd2_polygon(Q[:, 0], Q[:, 2], pts))
        d = d + inset
        return smax(d, Q[:, 1] + 0.02, 0.01)      # chỉ phía trước
    bb = ((-0.31, -0.45, top - 0.27), (0.31, 0.0, top + 0.04))
    collar = shell_on(shirt_plain, 0.012, 0.0095, lambda Q: collar_region(Q, 0.0), bb, k=0.006)
    objs["collar"] = _mesh("Collar", collar, 0.0028, bb, collection, mats["shirt"], verbose)
    # Miếng ve đỏ trên cổ áo (nhỏ hơn vạt cổ áo một chút) + cúc vàng nhỏ
    patch = shell_on(shirt_plain, 0.0245, 0.0045, lambda Q: collar_region(Q, 0.022), bb, k=0.004)
    objs["collar_patch"] = _mesh("CollarPatch", patch, 0.0022, bb, collection, mats["red"], verbose)

    gold_bits = Model("gold_bits")
    cx = np.mean([p[0] for p in poly_r]) * 0.95
    cz = np.mean([p[1] for p in poly_r]) - 0.005
    for s in (-1, 1):
        p0, n0 = surface_front(shirt_plain, s * cx, cz)
        gold_bits.union(Ellipsoid(p0 + n0 * 0.027, (0.0125, 0.0125, 0.0125)))   # n0 = pháp tuyến hướng RA NGOÀI

    # ---- Nẹp áo + cúc ----
    zb = P["belt_z"]
    placket_bb = ((-0.08, -0.45, P["shirt_hem"] - 0.02), (0.08, 0.0, top))
    placket = shell_on(shirt_plain, 0.004, 0.006,
                       lambda Q: np.maximum(np.abs(Q[:, 0]) - 0.027, Q[:, 1] + 0.05), placket_bb, k=0.004)
    objs["placket"] = _mesh("Placket", placket, 0.003, placket_bb, collection, mats["shirt"], verbose)
    for bz in P["placket_buttons_z"]:
        p0, n0 = surface_front(shirt_plain, 0.0, bz)
        gold_bits.union(Ellipsoid(p0 + n0 * 0.008, (0.018, 0.012, 0.018), rot=frame_from_axes(n0)))

    # ---- Túi ngực có nắp ----
    if P["pockets"]:
        def pocket_region(Q, s, flap=False):
            cxp = s * 0.14
            if flap:
                return np.maximum(np.abs(Q[:, 0] - cxp) - 0.072, np.abs(Q[:, 2] - 0.735) - 0.022)
            return np.maximum(np.abs(Q[:, 0] - cxp) - 0.065, np.abs(Q[:, 2] - 0.66) - 0.07)
        pk = Model("pockets")
        for s in (-1, 1):
            pbb = ((s * 0.14 - 0.1, -0.45, 0.55), (s * 0.14 + 0.1, 0.0, 0.79))
            pk.union(shell_on(shirt_plain, 0.004, 0.005,
                              lambda Q, s=s: smax(pocket_region(Q, s), Q[:, 1] + 0.05, 0.01), pbb, k=0.004))
            pk.union(shell_on(shirt_plain, 0.011, 0.006,
                              lambda Q, s=s: smax(pocket_region(Q, s, True), Q[:, 1] + 0.05, 0.01), pbb, k=0.004))
            p0, n0 = surface_front(shirt_plain, s * 0.14, 0.725)
            gold_bits.union(Ellipsoid(p0 + n0 * 0.017, (0.0135, 0.010, 0.0135), rot=frame_from_axes(n0)))
        objs["pockets"] = _mesh("Pockets", pk, 0.003, ((-0.30, -0.45, 0.54), (0.30, 0.0, 0.80)),
                                collection, mats["shirt"], verbose)

    # ---- Cầu vai + ngôi sao ----
    boards = Model("boards")
    stars = Model("board_stars")
    bt = P["board_thick"]
    for a in arms:
        s = a["side"]
        x0, x1 = P["board_len"]
        hw = P["board_halfw"]
        mid_x = s * (x0 + x1) / 2
        p_top, _ = surface_top(shirt_plain, mid_x, 0.0)

        def region(Q, s=s, x0=x0, x1=x1, hw=hw):
            ax = Q[:, 0] * s
            # đầu nhọn quay vào cổ
            return np.maximum(np.maximum(x0 - ax + np.abs(Q[:, 1]) * 0.9, ax - x1), np.abs(Q[:, 1]) - hw)
        ball = Sphere(p_top, (x1 - x0) * 0.75)
        bbb = (p_top - 0.25, p_top + 0.25)
        boards.union(shell_on(shirt_plain, 0.003 + bt, bt, region, bbb, k=0.006, extra=ball.dist))
        star_c = np.array([s * (x1 - 0.06), 0.0])

        def star_region(Q, sc=star_c):
            return sd2_star5(Q[:, 0] - sc[0], -(Q[:, 1] - sc[1]), 0.028, 0.45)
        stars.union(shell_on(shirt_plain, 0.003 + 2 * bt + 0.0035, 0.0045, star_region, bbb, k=0.003,
                             extra=ball.dist))
    bb_boards = ((-0.6, -0.4, 0.5), (0.6, 0.4, 1.2))
    objs["boards"] = _mesh("ShoulderBoards", boards, 0.0028, bb_boards, collection, mats["board"], verbose)
    objs["board_stars"] = _mesh("ShoulderStars", stars, 0.0018, bb_boards, collection, mats["board_star"], verbose)
    if P["board_style"] == "gold_red_piping":
        piping = Model("piping")
        for a in arms:
            s = a["side"]
            x0, x1 = P["board_len"]
            hw = P["board_halfw"] + 0.008
            p_top, _ = surface_top(shirt_plain, s * (x0 + x1) / 2, 0.0)
            ball = Sphere(p_top, (x1 - x0) * 0.75)

            def region(Q, s=s, x0=x0, x1=x1, hw=hw):
                ax = Q[:, 0] * s
                return np.maximum(np.maximum(x0 - 0.01 - ax + np.abs(Q[:, 1]) * 0.9, ax - x1 - 0.008),
                                  np.abs(Q[:, 1]) - hw)
            piping.union(shell_on(shirt_plain, 0.0025 + bt * 0.8, bt * 0.8, region, (p_top - 0.25, p_top + 0.25),
                                  k=0.005, extra=ball.dist))
        objs["piping"] = _mesh("BoardPiping", piping, 0.0028, bb_boards, collection, mats["red"], verbose)

    # ---- Thắt lưng da + khoá vàng ----
    hb = P["belt_half_h"]
    belt_bb = ((-0.47, -0.47, zb - 0.07), (0.47, 0.47, zb + 0.07))
    belt = Lambda(lambda Q: smax(np.abs(core.dist(Q) - (P["shirt_t"] + 0.010)) - 0.0125, np.abs(Q[:, 2] - zb) - hb, 0.008),
                  belt_bb[0], belt_bb[1])
    objs["belt"] = _mesh("Belt", belt, 0.003, belt_bb, collection, mats["belt"], verbose)
    p0, n0 = surface_front(core, 0.0, zb)
    R = frame_from_axes(n0)
    buckle_c = p0 + n0 * (P["shirt_t"] + 0.034)
    bw = 0.058 if P["buckle_star"] else 0.05
    buckle = Model("buckle")
    buckle.union(RoundBox(buckle_c, (bw, 0.008, hb + 0.008), 0.007, rot=R))
    buckle.subtract(RoundBox(buckle_c + n0 * 0.006, (bw - 0.013, 0.006, hb - 0.006), 0.004, rot=R), k=0.003)
    if P["buckle_star"]:
        def star3d(Q, c=buckle_c, R=R):
            q = (Q - c) @ R
            d2 = sd2_star5(q[:, 0], q[:, 2], 0.03, 0.45)
            return smax(d2, np.abs(q[:, 1] + 0.004) - 0.005, 0.003)
        buckle.union(Lambda(star3d, buckle_c - 0.05, buckle_c + 0.05))
    else:
        buckle.union(RoundBox(buckle_c + n0 * 0.002, (0.022, 0.005, hb - 0.012), 0.004, rot=R), k=0.002)
    gold_bits.union(buckle)
    objs["gold_bits"] = _mesh("GoldBits", gold_bits, 0.0018, None, collection, mats["gold"], verbose)
    return objs


def _mesh(name, sdf, h, bbox, collection, mat, verbose=True, frame=None, subdiv=(1, 1)):
    """SDF → object Blender có vật liệu. frame: đặt object theo khung (mesh ở toạ độ cục bộ)."""
    verts, quads = mesh_from_sdf(sdf, h, bbox=bbox, verbose=verbose)
    obj = to_blender_object(name, verts, quads, collection=collection, subdiv_levels=subdiv)
    if frame is not None:
        obj.matrix_world = frame.matrix()
    if mat is not None:
        M.assign(obj, mat)
    return obj


# =============================================================================
# 5. MŨ KÊ-PI (toạ độ cục bộ của mũ: gốc = tâm đáy băng mũ, Z lên, -Y ra trước)
# =============================================================================

def build_cap(P, head_frame, head_info, collection, mats, verbose=True):
    sc = P["cap_scale"]
    hc = head_info["hc"]
    cap_local = Frame(hc + np.asarray(P["cap_off"], float),
                      rotation_matrix(P["cap_pitch"], P["cap_roll"], 0.0))
    cap_frame = head_frame.compose(cap_local)
    rx, ry = (np.asarray(P["band_r"]) * sc).tolist()
    bh = P["band_h"] * sc
    objs = {}

    # ---- Băng mũ đỏ (hình trụ elip, hơi loe lên trên, bo mép) ----
    def band_fn(Q, rr=0.0):
        """Trụ elip từ z=0 tới z=bh, loe 4% lên trên. rr = bán kính bo mép (thu nhỏ hình rồi nở ra rr)."""
        z = Q[:, 2]
        flare = 1.0 + 0.04 * np.clip(z / bh, 0, 1)
        re = np.sqrt((Q[:, 0] / (rx * flare - rr)) ** 2 + (Q[:, 1] / (ry * flare - rr)) ** 2)
        d_r = (re - 1.0) * (min(rx, ry) - rr)
        d_z = np.abs(z - bh / 2) - (bh / 2 - rr)
        out = np.sqrt(np.maximum(d_r, 0) ** 2 + np.maximum(d_z, 0) ** 2) + np.minimum(np.maximum(d_r, d_z), 0)
        return out - rr
    band_bb = ((-rx - 0.05, -ry - 0.05, -0.02), (rx + 0.05, ry + 0.05, bh + 0.02))
    band = Lambda(lambda Q: band_fn(Q, 0.010), band_bb[0], band_bb[1])
    objs["band"] = _mesh("Cap_Band", band, 0.0035, band_bb, collection, mats["red"], verbose, frame=cap_frame)

    # ---- Đỉnh mũ: "gối" dẹt, phía trước hơi vểnh lên (dáng yên ngựa của kê-pi) ----
    crx, cry, crz = (np.asarray(P["crown_r"]) * sc).tolist()
    cz = P["crown_z"] * sc
    lift = P["crown_front_lift"]
    crown = Model("crown")
    crown.union(Ellipsoid((0, -0.01 * sc, cz), (crx, cry, crz), rot=rotation_matrix(-lift, 0, 0)))
    crown.union(Lambda(lambda Q: smax(band_fn(Q * np.array([0.985, 0.985, 1.0]) - np.array([0, 0, 0.03 * sc])),
                                      -(Q[:, 2] - bh * 0.85), 0.01),
                       (-rx - 0.05, -ry - 0.05, 0.0), (rx + 0.05, ry + 0.05, cz + 0.05)), k=0.035)
    crown_bb = ((-crx - 0.05, -cry - 0.08, bh * 0.5), (crx + 0.05, cry + 0.05, cz + crz + 0.08))
    objs["crown"] = _mesh("Cap_Crown", crown, 0.0045, crown_bb, collection, mats["cap_crown"], verbose,
                          frame=cap_frame)

    # ---- Lưỡi trai: tấm cong, chúc xuống, hai bên cụp nhẹ ----
    vl = P["visor_len"] * sc
    drop = math.tan(math.radians(P["visor_drop_deg"]))

    def visor_fn(Q):
        x, y, z = Q[:, 0], Q[:, 1], Q[:, 2]
        fwd = np.maximum(-y - ry * 0.80, 0.0)
        zs = 0.006 - drop * fwd - 0.55 * (x / rx) ** 2 * 0.06
        plate = np.abs(z - zs) * 0.93 - 0.0085
        outline = sd2_ellipse_approx(x, y + ry * 0.55, rx * 0.93, ry * 0.45 + vl)
        inner = -(np.sqrt((x / rx) ** 2 + (y / ry) ** 2) - 0.97) * min(rx, ry)   # không lấn vào trong băng
        d = smax(plate, outline, 0.012)
        d = smax(d, inner, 0.004)
        d = smax(d, y + ry * 0.25, 0.02)        # chỉ nửa trước
        return d
    visor = Lambda(visor_fn, (-rx - 0.05, -ry - vl - 0.1, -0.2), (rx + 0.05, 0.05, 0.06))
    objs["visor"] = _mesh("Cap_Visor", visor, 0.0025, visor.bbox, collection, mats["visor"], verbose,
                          frame=cap_frame)

    # ---- Dây vàng xoắn trên lưỡi trai + 2 cúc hai bên ----
    gold = Model("cap_gold")
    cord_z = bh * 0.30
    gold.union(Lambda(lambda Q: smax(_ellipse_tube(Q, rx * 1.042, ry * 1.042, cord_z, 0.0115 * sc),
                                     Q[:, 1] + ry * 0.12, 0.01),
                      (-rx - 0.05, -ry - 0.05, cord_z - 0.05), (rx + 0.05, 0.05, cord_z + 0.05)))
    for s in (-1, 1):
        ang = math.radians(15)
        bx, by = s * rx * 1.04 * math.cos(ang), -ry * 1.04 * math.sin(ang)
        gold.union(Ellipsoid((bx, by, cord_z), (0.017 * sc, 0.017 * sc, 0.017 * sc)), k=0.004)
    objs["cord"] = _mesh("Cap_Cord", gold, 0.002, None, collection, mats["gold_rope"], verbose, frame=cap_frame)

    # ---- Huy hiệu: vòng lá vàng + đĩa đỏ + sao vàng (cách điệu, KHÔNG sao chép công an hiệu) ----
    em_z = cz - crz * 0.15 + P["emblem_lift"] * sc
    p_em, n_em = surface_front(crown, 0.0, em_z)
    em_frame_local = Frame(p_em, frame_from_axes(_norm(n_em * 0.7 + np.array([0, -1, 0.25]) * 0.3)))
    em_frame = cap_frame.compose(em_frame_local)
    er = P["emblem_r"] * sc
    wreath = Model("wreath")
    wreath.union(Torus((0, 0.004, 0), er * 0.80, er * 0.11, rot=rotation_matrix(90, 0, 0)))
    for s in (-1, 1):
        for i in range(7):
            a_deg = -110 + i * 28
            a = math.radians(a_deg)
            px, pz = s * er * 0.80 * math.cos(a), er * 0.80 * math.sin(a)
            leaf = Ellipsoid((px * 1.06, -0.002, pz * 1.06), (er * 0.13, er * 0.09, er * 0.26),
                             rot=rotation_matrix(0, -s * a_deg + s * 18, 0))
            wreath.union(leaf, k=er * 0.06)
    wreath.subtract(Ellipsoid((0, 0, er * 1.05), (er * 0.22, er * 0.5, er * 0.26)), k=0.004)
    objs["emblem_wreath"] = _mesh("Emblem_Wreath", wreath, 0.0011, None, collection, mats["gold"], verbose,
                                  frame=em_frame)
    disc = Model("disc")
    disc.union(Lambda(lambda Q: smax(np.sqrt(Q[:, 0] ** 2 + Q[:, 2] ** 2) - er * 0.62, np.abs(Q[:, 1] - 0.003) - 0.006, 0.003),
                      (-er, -0.03, -er), (er, 0.03, er)))
    objs["emblem_disc"] = _mesh("Emblem_Disc", disc, 0.0011, None, collection, mats["red"], verbose, frame=em_frame)
    star = Lambda(lambda Q: smax(sd2_star5(Q[:, 0], Q[:, 2], er * 0.50, 0.42),
                                 np.abs(Q[:, 1] + 0.0045) - 0.0045, 0.0025),
                  (-er, -0.03, -er), (er, 0.03, er))
    objs["emblem_star"] = _mesh("Emblem_Star", star, 0.0009, None, collection, mats["gold"], verbose, frame=em_frame)
    return objs, cap_frame


def _ellipse_tube(Q, rx, ry, z0, r):
    """Ống tròn bán kính r chạy theo đường elip (rx, ry) ở độ cao z0 (dây mũ)."""
    re = np.sqrt((Q[:, 0] / rx) ** 2 + (Q[:, 1] / ry) ** 2)
    d_r = (re - 1.0) * min(rx, ry)
    return np.sqrt(d_r ** 2 + (Q[:, 2] - z0) ** 2) - r


# =============================================================================
# 6. MẮT, MŨI, LƯỠI
# =============================================================================

def _eye_arc(rx, rz, kind, hs):
    """
    Mắt NHẮM vẽ bằng một "sợi" cong nổi trên mặt (toạ độ khung mắt: x ngang, z dọc, -y ra ngoài).
        happy  : cong lên ∩ (mắt cười ^ ^)
        sleepy : cong xuống ∪ (nhắm thư giãn)
    Hai đầu sợi lùi vào trong theo độ cong của mặt (y tăng theo x²) để sợi luôn bám mặt.
    """
    m = Model("eye_arc")
    ts = np.linspace(-1, 1, 9)
    if kind == "happy":
        pts = [(rx * 1.02 * t, 0.006 * hs + (rx * t) ** 2 / 0.8, -rz * 0.30 + rz * 0.72 * (1 - t * t)) for t in ts]
        r0, r1 = 0.0175 * hs, 0.012 * hs
    else:
        pts = [(rx * 1.0 * t, 0.006 * hs + (rx * t) ** 2 / 0.8, -rz * 0.05 - rz * 0.36 * (1 - t * t)) for t in ts]
        r0, r1 = 0.014 * hs, 0.010 * hs
    for i, (a, b) in enumerate(zip(pts[:-1], pts[1:])):
        ta = abs(ts[i]); tb = abs(ts[i + 1])
        m.union(RoundCone(a, b, r0 + (r1 - r0) * ta, r0 + (r1 - r0) * tb), k=0.004 * hs)
    return m


def build_face_parts(P, X, head_frame, head_info, collection, mats, verbose=True):
    objs = {}
    hs = P["hs"]
    rx, rz = P["eye_size"]
    prot = P["eye_protrude"]
    R_big = 0.20 * hs
    for s, fr in head_info["eyes"]:
        name = "Eye_L" if s > 0 else "Eye_R"
        if eyes_closed(X, s):
            kind = "sleepy" if X["eyes"] == "sleepy" else "happy"
            arc = _eye_arc(rx, rz, kind, hs)
            objs[name] = _mesh(name, arc, 0.0015, None, collection, mats["eye_line"], verbose,
                               frame=head_frame.compose(fr))
            continue
        k = 1.12 if X["eyes"] == "wide" else 1.0
        erx, erz = rx * k, rz * k
        tilt = math.radians(s * P["eye_tilt"])
        c, sn = math.cos(tilt), math.sin(tilt)

        def eye_fn(Q, c=c, sn=sn, erx=erx, erz=erz):
            x = Q[:, 0] * c + Q[:, 2] * sn
            z = -Q[:, 0] * sn + Q[:, 2] * c
            if P["eye_shape"] == "almond":
                d2 = sd2_vesica(x, z, erx, erz) - 0.004
            else:
                d2 = sd2_ellipse_approx(x, z, erx, erz)
            dome = np.sqrt(Q[:, 0] ** 2 + (Q[:, 1] - (R_big - prot)) ** 2 + Q[:, 2] ** 2) - R_big
            d = smax(d2, dome, 0.010)
            return smax(d, Q[:, 1] - 0.03, 0.0)
        eye = Lambda(eye_fn, (-erx - 0.02, -0.06, -erz - 0.03), (erx + 0.02, 0.05, erz + 0.03))
        objs[name] = _mesh(name, eye, 0.0015, eye.bbox, collection, mats["eye"], verbose,
                           frame=head_frame.compose(fr))

    # ---- Mũi: khối tam giác bo tròn, 2 lỗ mũi nhỏ ----
    p_n, n_n = head_info["nose"]
    nfwd = _norm(n_n * 0.6 + np.array([0, -1.0, 0.25]) * 0.4)
    nose_frame = Frame(p_n + nfwd * 0.004, frame_from_axes(nfwd))
    nx, ny, nz = P["nose_r"]
    nose = Model("nose")
    nose.union(Ellipsoid((0, 0, 0.006), (nx, ny, nz * 0.85)))
    for s in (-1, 1):
        nose.union(Ellipsoid((s * nx * 0.45, -ny * 0.05, 0.012), (nx * 0.55, ny * 0.9, nz * 0.75)), k=0.02)
    nose.union(Ellipsoid((0, -ny * 0.1, -nz * 0.45), (nx * 0.45, ny * 0.75, nz * 0.55)), k=0.025)
    for s in (-1, 1):
        nose.subtract(Ellipsoid((s * nx * 0.42, -ny * 0.92, -nz * 0.15), (nx * 0.18, ny * 0.22, nz * 0.16),
                                rot=rotation_matrix(0, s * 30, 0)), k=0.008)
    nose.intersect(Lambda(lambda Q: Q[:, 1] - ny * 0.45, (-1, -1, -1), (1, 1, 1)), k=0.01)
    objs["nose"] = _mesh("Nose", nose, 0.0016, None, collection, mats["nose"], verbose,
                         frame=head_frame.compose(nose_frame))

    # ---- Lưỡi ----
    tg = head_info["mouth"]["tongue"]
    if tg is not None:
        tongue = Model("tongue")
        if tg["style"] == "in":
            c = np.asarray(tg["c"], float)
            r = np.asarray(tg["r"], float)
            tongue.union(Ellipsoid(c, r))
            # rãnh giữa lưỡi (mặt trên)
            tongue.subtract(Capsule(c + (0, -r[1] * 1.1, r[2] * 0.95), c + (0, r[1] * 0.6, r[2] * 0.95), 0.0065 * hs),
                            k=0.008 * hs)
        else:
            path = [np.asarray(p, float) for p in tg["path"]]
            w = tg["w"]
            widths = [w * 0.92] + [w] * (len(path) - 2) + [w * 0.86]
            for (a, wa), (b, wb) in zip(zip(path[:-1], widths[:-1]), zip(path[1:], widths[1:])):
                seg_dir = _norm(b - a)
                facing = _norm(np.cross(seg_dir, (1, 0, 0)))
                if facing[1] > 0:
                    facing = -facing
                tongue.union(FlatRoundCone(a, b, wa, wb, facing, P["tongue_thick"]), k=0.03 * hs)
            for a, b in zip(path[1:-1], path[2:]):
                seg_dir = _norm(b - a)
                facing = _norm(np.cross(seg_dir, (1, 0, 0)))
                if facing[1] > 0:
                    facing = -facing
                tongue.subtract(Capsule(a + facing * 0.0165 * hs, b + facing * 0.0135 * hs - seg_dir * 0.03 * hs,
                                        0.0065 * hs), k=0.01 * hs)
        objs["tongue"] = _mesh("Tongue", tongue, 0.0018, None, collection, mats["tongue"], verbose,
                               frame=head_frame)
    return objs


# =============================================================================
# 7. Vật liệu + hàm dựng tổng
# =============================================================================

def make_materials(P, X):
    """Vật liệu theo concept P. Vật liệu mắt riêng cho từng pose (hướng nhìn khác nhau)."""
    pal = P["palette"]
    k = P["key"]
    look = X["look"]
    hs = P["hs"]
    catch = [(x + look[0] * hs, z + look[1] * hs, r) for x, z, r in P["eye_catchlights"]]
    if X["eyes"] == "wide":
        catch = [(x * 1.12, z * 1.12, r * 1.1) for x, z, r in catch]
    mats = {
        "fur": M.make_fur_vinyl(f"M_{k}_Fur", pal, edge=P["mask_edge"], blush=P["blush"]),
        "shirt": M.make_fabric(f"M_{k}_Shirt", pal["shirt"]),
        "cap_crown": M.make_fabric(f"M_{k}_CapCrown", pal["cap_crown"], weave_strength=0.08),
        "red": M.make_fabric(f"M_{k}_RedFelt", pal["red"], weave_strength=0.06, roughness=0.55, sheen=0.12),
        "gold": M.make_gold(f"M_{k}_Gold", pal["gold"]),
        "gold_rope": M.make_gold(f"M_{k}_GoldRope", pal["gold"], roughness=0.3, rope=True),
        "gold_paint": M.make_satin(f"M_{k}_GoldPaint", pal["gold_paint"], roughness=0.32, coat=0.4),
        # lưỡi trai: đen satin MỜ — bóng quá thì phản chiếu cả bầu trời studio → trông như tấm bạc
        "visor": M.make_glossy(f"M_{k}_Visor", pal["visor"], roughness=0.72, coat=0.0, coat_rough=0.35,
                               specular=0.10),
        "belt": M.make_glossy(f"M_{k}_Belt", pal["belt"], roughness=0.42, coat=0.25, coat_rough=0.3,
                              bump_scale=90.0, bump_strength=0.12),
        "nose": M.make_glossy(f"M_{k}_Nose", pal["nose"], roughness=0.3, coat=0.6, coat_rough=0.12,
                              bump_scale=160.0, bump_strength=0.25),
        "eye_line": M.make_glossy(f"M_{k}_EyeLine", pal["eye_line"], roughness=0.3, coat=0.6, coat_rough=0.1),
        "tongue": M.make_glossy(f"M_{k}_Tongue", pal["tongue"], roughness=0.25, coat=0.55, coat_rough=0.12,
                                sss=0.35, sss_radius=(1.0, 0.25, 0.2)),
        "eye": M.make_eye(f"M_{k}_Eye_{X['name']}", "iris" if P["eye_style"] == "iris" else "black",
                          iris_color=pal["eye_iris"], iris_radius=P["eye_iris_r"], pupil_radius=P["eye_pupil_r"],
                          catchlights=catch),
    }
    board_mat = {"gold": mats["gold_paint"], "gold_red_piping": mats["gold_paint"], "gold_red_star": mats["gold_paint"],
                 "red": mats["red"]}[P["board_style"]]
    mats["board"] = board_mat
    mats["board_star"] = mats["red"] if P["board_style"] == "gold_red_star" else mats["gold"]
    return mats


def head_frame_for(P, X):
    """Khung đầu: xoay quanh điểm cổ (pivot) theo tư thế (cúi / nghiêng / quay)."""
    pivot = np.array([0.0, 0.0, P["head_center"][2] - 0.38 * P["hs"]])
    h = X["head"]
    R = rotation_matrix(h["pitch"], h["roll"], h["yaw"])
    return Frame(pivot - R @ pivot, R)


def build_corgi(P, pose="neutral", collection=None, verbose=True):
    """
    Dựng toàn bộ nhân vật. pose = tên tư thế (xem corgi_poses.POSES) hoặc dict tư thế.
    Trả về dict tên → object Blender. (dict có thêm khoá "_ctx" chứa khung đầu, tay... cho camera/đồ vật.)
    """
    import time
    import corgi_props
    t0 = time.perf_counter()
    X = get_pose(pose) if isinstance(pose, str) else pose
    mats = make_materials(P, X)
    head_model, head_info = build_head(P, X)
    head_frame = head_frame_for(P, X)
    core = torso_core(P)
    chest_front, _ = surface_front(core, 0.0, P["chest_c"][2])
    body, arms = build_body(P, X, head_model, head_frame, head_info, chest_front)

    objs = {}
    fur_objects = [("Body_Fur", body, P["voxel_body"])]
    for a in arms:
        fur_objects.append(("Arm_R_Fur" if a["side"] < 0 else "Arm_L_Fur", build_arm(P, a), P["voxel_body"] * 0.8))
    for name, model, voxel in fur_objects:
        bbox = None
        if X["head_only"]:
            lo, hi = model.bbox
            bbox = (lo, hi)
        obj = _mesh(name, model, voxel, bbox, collection, mats["fur"], verbose, subdiv=(1, 1))
        V = np.array([v.co[:] for v in obj.data.vertices])
        for mname, values in fur_masks(P, V, head_frame, head_info, arms).items():
            add_point_attribute(obj, mname, np.clip(values, -0.05, 0.05) if mname != "m_shade" else values)
        objs[name] = obj

    if not X["head_only"]:
        shirt, shirt_plain, core = build_shirt(P, arms)
        sleeve_top = max(a["elbow"][2] for a in arms) + 0.15
        sbb = (np.array([-0.8, -0.6, P["shirt_hem"] - 0.08]),
               np.array([0.8, 0.6, max(P["shirt_top"] + 0.05, sleeve_top)]))
        objs["shirt"] = _mesh("Shirt", shirt, 0.0042, sbb, collection, mats["shirt"], verbose, subdiv=(1, 1))
        objs.update(build_uniform_parts(P, arms, shirt, shirt_plain, core, collection, mats, verbose))
    cap_objs, cap_frame = build_cap(P, head_frame, head_info, collection, mats, verbose)
    objs.update(cap_objs)
    objs.update(build_face_parts(P, X, head_frame, head_info, collection, mats, verbose))
    ctx = {"P": P, "X": X, "head_frame": head_frame, "head_info": head_info, "arms": arms,
           "chest_front": chest_front, "cap_frame": cap_frame, "collection": collection, "mats": mats}
    objs.update(corgi_props.build_props(ctx, verbose=verbose))
    if verbose:
        print(f"[corgi] concept {P['key']} pose={X['name']}: {len(objs)} object, {time.perf_counter()-t0:.0f}s")
    objs["_ctx"] = ctx
    return objs
