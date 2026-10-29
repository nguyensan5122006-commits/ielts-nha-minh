"""
corgi_builder.py — Dựng toàn bộ mascot Corgi (thân lông + đồng phục + mũ kê-pi) từ bộ thông số concept.

LUỒNG CHÍNH:  build_corgi(params, pose, collection)
    1) Đầu (thiết kế ở toạ độ "đầu đứng thẳng"), rồi đặt vào thế giới bằng khung Frame (nghiêng đầu).
    2) Thân, chân, tay (tay tính bằng IK 2 khớp: vai → khuỷu → bàn) theo tư thế "neutral" hoặc "salute".
    3) Hợp MỀM đầu + thân + tai + tay chân thành MỘT khối lông liền (không có đường ghép).
    4) Áo = bề mặt thân nở thêm vài cm + hàm nếp gấp; cổ áo, cầu vai, thắt lưng, túi = "lớp vỏ" bám
       theo bề mặt áo (shell) cắt theo hình 2D → tự ôm sát như shrinkwrap.
    5) Mũ kê-pi, mắt, mũi, lưỡi, huy hiệu = các object riêng (vật liệu riêng), đặt theo khung của đầu.
    6) Tính "mặt nạ màu" (vùng trắng, trong tai, trong miệng...) cho từng đỉnh → shader tô màu sắc nét.

Mọi hàm khoảng cách dùng sdf_toolkit (xem giải thích SDF ở đầu file đó).
"""

import math

import numpy as np

from sdf_toolkit import (Model, Ellipsoid, Sphere, RoundCone, Capsule, RoundBox, Torus, Lambda, Transformed,
                         FlatRoundCone, smin, smax, smoothstep, sd2_star5, sd2_polygon, sd2_ellipse_approx,
                         sd2_vesica, rotation_matrix, frame_from_axes, mesh_from_sdf, to_blender_object,
                         add_point_attribute, sphere_trace)
import corgi_materials as M


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
    """IK 2 khớp: trả về vị trí khuỷu tay sao cho vai→khuỷu = l1, khuỷu→đích = l2, khuỷu lệch về phía `pole`."""
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

def build_head(P):
    """Trả về (model_đầu, info). info chứa khung mắt, mũi, miệng, tai... để dựng chi tiết + mặt nạ màu."""
    hc = np.asarray(P["head_center"], float)
    m = Model("head")
    m.union(Ellipsoid(hc, P["cranium"]))
    m.union(Ellipsoid(hc + P["forehead_off"], P["forehead_r"]), k=0.10)
    for s in (-1, 1):
        m.union(Ellipsoid(hc + _mirror(P["cheek_off"], s), P["cheek_r"]), k=P["cheek_k"])
    m.union(Ellipsoid(hc + P["muzzle_off"], P["muzzle_r"]), k=P["muzzle_k"])
    if P["muzzle_tip"]:
        off, r = P["muzzle_tip"]
        m.union(Ellipsoid(hc + off, r), k=0.09)
    a, b, r = P["bridge"]
    m.union(Capsule(hc + a, hc + b, r), k=0.08)
    m.union(Ellipsoid(hc + P["chin_off"], P["chin_r"]), k=0.05)

    # --- Túm lông má (tạo viền răng cưa mềm ở má — đặc trưng đồ chơi vinyl điêu khắc) ---
    for s in (-1, 1):
        for a, b, r0, r1 in P["cheek_tufts"]:
            m.union(RoundCone(hc + _mirror(a, s), hc + _mirror(b, s), r0, r1), k=P["tuft_k"])

    # --- Mảng lông mày nhô nhẹ (concept B) ---
    if P["brows"]:
        for bx, bz, rx, rz, lift in P["brows"]:
            for s in (-1, 1):
                p0, n0 = surface_front(m, s * bx, hc[2] + bz)
                m.union(Ellipsoid(p0 - n0 * 0.02, (rx, 0.03 + lift, rz),
                                  rot=frame_from_axes(n0)), k=0.03)

    info = {"hc": hc}

    # --- TAI: lá tai dẹt + lòng tai khoét vào ---
    ears = []
    for s in (-1, 1):
        base = hc + _mirror(P["ear_base_off"], s)
        out, back = math.radians(P["ear_out_deg"]), math.radians(P["ear_back_deg"])
        axis = _norm((s * math.sin(out), math.sin(back), math.cos(out)))
        tip = base + axis * P["ear_len"]
        fo = math.radians(P["ear_face_out_deg"])
        facing = _norm((s * math.sin(fo), -math.cos(fo), 0.0))
        outer = FlatRoundCone(base, tip, P["ear_r_base"], P["ear_r_tip"], facing, P["ear_thick"])
        f_orth = facing - np.dot(facing, axis) * axis
        f_orth /= np.linalg.norm(f_orth)
        inner_base = base + axis * 0.075 + f_orth * 0.045
        inner_tip = tip - axis * 0.055 + f_orth * 0.03
        inner = FlatRoundCone(inner_base, inner_tip, P["ear_r_base"] * 0.62, P["ear_r_tip"] * 0.50,
                              facing, P["ear_thick"] * 0.72)
        m.union(outer, k=0.07)
        m.subtract(inner, k=0.022)
        ears.append({"base": base, "tip": tip, "axis": axis, "inner": inner})
    info["ears"] = ears

    # --- MŨI: tìm điểm đầu mõm ---
    nose_p, nose_n = surface_front(m, 0.0, hc[2] + P["nose_z"])
    info["nose"] = (nose_p, nose_n)

    # --- MIỆNG: khoét đường cười hình cung, giữa mở to (chỗ thè lưỡi), hai khoé nhỏ cong lên ---
    mouth_p, _ = surface_front(m, 0.0, hc[2] + P["mouth_z"])
    mouth = Model("mouth")
    hw, op, cv = P["mouth_halfwidth"], P["mouth_open"], P["mouth_curve"]
    pts = []
    for t in np.linspace(-1, 1, 11):
        x = hw * t
        z = mouth_p[2] + cv * t * t - 0.006 * (1 - t * t)
        y = mouth_p[1] + 0.018 + 0.11 * t * t
        r = 0.010 + op * (1 - t * t) ** 1.4
        pts.append(((x, y, z), r))
    for (p0, r0), (p1, r1) in zip(pts[:-1], pts[1:]):
        mouth.union(RoundCone(p0, p1, r0, r1), k=0.01)
    # rãnh nhân trung (từ dưới mũi xuống giữa miệng)
    philtrum = Capsule(nose_p + (0, 0.012, -0.035), (0, mouth_p[1] + 0.006, mouth_p[2] + 0.02), 0.0075)
    m.subtract(mouth, k=0.014)
    m.subtract(philtrum, k=0.012)
    info["mouth"] = mouth
    info["mouth_p"] = mouth_p

    # --- MẮT: tìm điểm trên mặt, khoét hốc nông, ghi lại khung để đặt nhãn cầu ---
    eyes = []
    ex, ez = P["eye_pos"]
    for s in (-1, 1):
        p0, n0 = surface_front(m, s * ex, hc[2] + ez)
        fwd = _norm(n0 * 0.55 + np.array([0, -1.0, 0]) * 0.45)
        R = frame_from_axes(fwd, up_hint=(0, 0, 1))
        frame = Frame(p0, R)
        eyes.append((s, frame))
        rx, rz = P["eye_size"]
        socket = Transformed(Ellipsoid((0, 0.004, 0), (rx + 0.014, 0.034, rz + 0.014),
                                       rot=rotation_matrix(0, s * P["eye_tilt"], 0)), frame.o, frame.R)
        m.subtract(socket, k=0.018)
    info["eyes"] = eyes

    # --- vị trí bàn tay chào (toạ độ đầu): điểm trên thái dương phải, bàn tay áp sát ra ngoài ---
    sd = _norm(P["salute_dir"])
    p_s, n_s = sphere_trace(m, hc + sd * 1.5, -sd, max_dist=2.0)
    info["salute_paw"] = p_s + n_s * (P["paw_r"][1] * 0.80)
    info["salute_normal"] = n_s
    return m, info


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


def arm_chain(P, pose, side, head_frame, head_info):
    """
    Trả về dict khớp tay: shoulder, elbow, paw (tâm bàn tay), paw_R (khung bàn tay:
    cột 0 = ngang bàn, cột 1 = hướng MU bàn tay, cột 2 = hướng các ngón).
    """
    sh = _mirror(P["shoulder"], side)
    paw_len = P["paw_r"][2]
    if pose == "salute" and side == -1:
        # Tay PHẢI của nhân vật (X âm) giơ lên chào.
        # Bàn tay dẹt áp vào thái dương, NGÓN CHỈ LÊN vành mũ, mu bàn tay quay ra ngoài;
        # cổ tay gập nhẹ → nhìn nghiêng thấy rõ hình bàn tay "găng" (không chỉ là 1 chấm tròn).
        sh = sh + np.array([-0.02, -0.01, P["salute_shrug"]])      # nhún vai lên
        paw_c = head_frame.to_world(head_info["salute_paw"][None, :])[0]
        normal = head_frame.R @ head_info["salute_normal"]
        up = head_frame.R @ np.array([0.0, 0.0, 1.0])
        front = head_frame.R @ np.array([0.0, -1.0, 0.0])
        fingers = up * 0.85 + front * 0.30
        fingers = _norm(fingers - np.dot(fingers, normal) * normal)
        wrist_target = paw_c - fingers * paw_len * 0.55
        l1, l2 = P["salute_arm_len"]
        elbow, wrist = two_bone_ik(sh, wrist_target, l1, l2, pole=(-1.0, 0.05, -0.45))
        paw = wrist + fingers * paw_len * 0.55
        fwd, facing = fingers, normal
    else:
        target = _mirror(P["neutral_paw"], side)
        l1, l2 = P["arm_len"]
        elbow, paw = two_bone_ik(sh, target, l1, l2, pole=(side * 0.6, 0.6, 0.2))
        fwd = _norm(paw - elbow)
        facing = _norm(np.array([side * 0.25, -1.0, 0.0]))
    f = facing - np.dot(facing, fwd) * fwd
    f /= np.linalg.norm(f)
    x = np.cross(f, fwd)
    paw_R = np.stack([x, f, fwd], axis=1)
    return {"shoulder": sh, "elbow": elbow, "paw": paw, "paw_R": paw_R, "side": side}


def build_body(P, pose, head_model, head_frame, head_info):
    """Khối lông liền: thân + đầu + tay + chân + mông + đuôi."""
    body = Model("body")
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
        body.union(RoundCone(tc + (0, -0.02, 0), tc + (dx, 0.06, dz), 0.05, 0.026), k=0.04)
    # Tay: chỉ giữ khối vai trong thân; cánh tay là object RIÊNG (xem build_arm) — mối nối nằm khuất
    # trong tay áo. Nhờ vậy bàn tay chào áp vào thái dương mà không bị "chảy" dính vào đầu.
    arms = []
    for s in (-1, 1):
        a = arm_chain(P, pose, s, head_frame, head_info)
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
    """Một cánh tay lông (vai → khuỷu → cổ tay → bàn tay găng có 2 rãnh ngón)."""
    arm = Model("arm")
    r_mid = (P["arm_r"][0] + P["arm_r"][1]) / 2
    sh = a["shoulder"]
    arm.union(Sphere(sh, P["arm_r"][0] * 1.05))
    arm.union(RoundCone(sh, a["elbow"], P["arm_r"][0], r_mid), k=0.04)
    wrist = a["paw"] - a["paw_R"][:, 2] * P["paw_r"][2] * 0.55
    arm.union(RoundCone(a["elbow"], wrist, r_mid, P["arm_r"][1]), k=0.04)
    # Bàn tay "găng" tròn
    arm.union(Ellipsoid(a["paw"], P["paw_r"], rot=a["paw_R"]), k=0.045)
    # 3 ngón: 2 rãnh nhỏ ở đầu bàn, phía mu bàn tay (mặt nhìn thấy)
    for gx in (-0.3, 0.3):
        g0 = a["paw"] + a["paw_R"] @ np.array([gx * P["paw_r"][0], P["paw_r"][1] * 0.75, P["paw_r"][2] * 0.35])
        g1 = a["paw"] + a["paw_R"] @ np.array([gx * P["paw_r"][0], P["paw_r"][1] * 0.55, P["paw_r"][2] * 1.05])
        arm.subtract(Capsule(g0, g1, 0.0075), k=0.012)
    return arm


# =============================================================================
# 3. MẶT NẠ MÀU LÔNG (tính trên đỉnh lưới thân)
# =============================================================================

def fur_masks(P, V, head_frame, head_info, arms):
    """
    V: đỉnh thân (thế giới). Trả về dict tên → mảng giá trị (m_white, m_inner, m_mouth, m_brow, m_shade).
    Quy ước: giá trị ÂM = nằm trong vùng màu đó (giống SDF), shader dùng smoothstep quanh 0.
    """
    hc = head_info["hc"]
    H = head_frame.to_local(V)       # đỉnh đổi sang toạ độ thiết kế của đầu

    # --- Vùng trắng trên mặt: mõm + má dưới + vệt trắng giữa trán (blaze) ---
    face = Model("white_face")
    mo = np.asarray(P["muzzle_off"], float)
    face.union(Ellipsoid(hc + mo + (0, 0.03, -0.06), (P["muzzle_r"][0] + 0.12, P["muzzle_r"][1] + 0.10, P["muzzle_r"][2] + 0.07)))
    for s in (-1, 1):
        c = hc + _mirror(P["cheek_off"], s) + (0, -0.02, -0.075)
        face.union(Ellipsoid(c, (P["cheek_r"][0] * 0.95, P["cheek_r"][1] * 1.1, P["cheek_r"][2] * 0.62)), k=0.06)
    ez = P["eye_pos"][1]
    face.union(RoundCone(hc + (0, -0.42, -0.08), hc + (0, -0.36, ez + 0.20), 0.05, 0.085), k=0.06)
    face.union(Ellipsoid(hc + P["chin_off"], np.asarray(P["chin_r"]) + 0.06), k=0.04)
    m_white = face.dist(H)

    # --- Trắng trên thân: ngực-bụng (dưới áo), bàn tay, cẳng chân + bàn chân, mặt dưới mông ---
    chest = Ellipsoid(np.asarray(P["belly_c"]) + (0, -0.12, 0.12), (P["belly_r"][0] * 0.8, 0.2, 0.38))
    m_white = np.minimum(m_white, np.maximum(chest.dist(V), P["shirt_hem"] + 0.04 - V[:, 2]))
    for a in arms:
        paw_zone = Ellipsoid(a["paw"] - a["paw_R"][:, 2] * 0.02, np.asarray(P["paw_r"]) * (1.25, 1.35, 1.12),
                             rot=a["paw_R"])
        m_white = np.minimum(m_white, paw_zone.dist(V))
    leg_white = V[:, 2] - (P["ankle"][2] + 0.075 + 0.02 * np.sin(V[:, 0] * 30.0))
    legs_region = V[:, 2] < P["hip"][2]
    m_white = np.where(legs_region, np.minimum(m_white, leg_white), m_white)
    tail = Ellipsoid(np.asarray(P["tail_c"]) + (0, 0.03, -0.05), (0.10, 0.10, 0.08))
    m_white = np.minimum(m_white, tail.dist(V))

    # --- Trong tai ---
    m_inner = np.full(len(V), 1.0)
    for e in head_info["ears"]:
        m_inner = np.minimum(m_inner, e["inner"].dist(H) - 0.004)

    # --- Trong miệng (và viền môi sẫm) ---
    m_mouth = head_info["mouth"].dist(H) - 0.0045

    # --- Mảng lông mày (B) ---
    m_brow = np.full(len(V), 1.0)
    if P["brows"]:
        for bx, bz, rx, rz, _ in P["brows"]:
            for s in (-1, 1):
                b = Ellipsoid(hc + (s * bx, -0.35, bz), (rx, 0.25, rz),
                              rot=rotation_matrix(0, -s * 12.0, 0))
                m_brow = np.minimum(m_brow, b.dist(H))

    # --- Má hồng "phun sơn" (airbrush) dưới mắt, lệch ra ngoài ---
    m_blush = np.full(len(V), 1.0)
    ex, ez = P["eye_pos"]
    for s in (-1, 1):
        b = Ellipsoid(hc + (s * (ex + 0.10), -0.30, ez - 0.13), (0.075, 0.30, 0.050),
                      rot=rotation_matrix(0, -s * 10.0, 0))
        m_blush = np.minimum(m_blush, b.dist(H))

    # --- Độ đậm của màu cam: lưng + đỉnh đầu + ngọn tai đậm hơn ---
    shade = 0.45 * smoothstep(1.05, 1.80, H[:, 2]) + 0.45 * smoothstep(-0.15, 0.35, V[:, 1])
    for e in head_info["ears"]:
        t = np.clip(((H - e["base"]) @ e["axis"]) / np.linalg.norm(e["tip"] - e["base"]), 0, 1)
        near = np.linalg.norm(H - e["base"], axis=1) < 0.75
        shade = np.where(near, np.maximum(shade, 0.35 + 0.6 * t * t), shade)
    shade = np.clip(shade, 0, 1)
    return {"m_white": m_white, "m_inner": m_inner, "m_mouth": m_mouth, "m_brow": m_brow, "m_shade": shade,
            "m_blush": m_blush}


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
    zb, hem, top = P["belt_z"], P["shirt_hem"], P["shirt_top"]
    F = P["folds"]

    def build(with_folds):
        # Thân áo: thân nộm nở thêm t, cộng nếp gấp, cắt ở cổ (bị đầu che) và gấu áo
        # (gấu hơi thấp hơn ở sau lưng để phủ lên mông).
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
            # cắt phẳng ở cửa tay → mép tay áo gọn, thấy độ dày vải
            sleeve.intersect(Lambda(lambda Q, end=end, d=d: (Q - end) @ d, (-9, -9, -9), (9, 9, 9)))
            if with_folds and P["cuffs"]:
                # nẹp cửa tay: vòng dày hơn một chút ở mép
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
            # nếp chéo từ nách về giữa ngực
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
    # tâm miếng ve: trung bình đỉnh đa giác, đẩy về phía trong một chút
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

    # ---- Túi ngực có nắp (concept B) ----
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

    # ---- Cầu vai (vàng) + ngôi sao ----
    boards = Model("boards")
    stars = Model("board_stars")
    for a in arms:
        s = a["side"]
        x0, x1 = P["board_len"]
        hw = P["board_halfw"]
        # tâm vai: chiếu từ trên xuống mặt áo
        mid_x = s * (x0 + x1) / 2
        p_top, _ = surface_top(shirt_plain, mid_x, 0.0)

        def region(Q, s=s, x0=x0, x1=x1, hw=hw):
            ax = Q[:, 0] * s
            # đầu nhọn quay vào cổ
            d = np.maximum(np.maximum(x0 - ax + np.abs(Q[:, 1]) * 0.9, ax - x1), np.abs(Q[:, 1]) - hw)
            return d
        ball = Sphere(p_top, (x1 - x0) * 0.75)
        bbb = (p_top - 0.25, p_top + 0.25)
        boards.union(shell_on(shirt_plain, 0.013, 0.0105, region, bbb, k=0.006, extra=ball.dist))
        if P["board_style"] == "gold_red_piping":
            pass  # viền đỏ thêm ở dưới (xem board_piping)
        star_c = np.array([s * (x1 - 0.06), 0.0])
        def star_region(Q, sc=star_c):
            return sd2_star5(Q[:, 0] - sc[0], -(Q[:, 1] - sc[1]), 0.026, 0.45)
        stars.union(shell_on(shirt_plain, 0.0255, 0.0045, star_region, bbb, k=0.003, extra=ball.dist))
    bb_boards = ((-0.6, -0.4, 0.5), (0.6, 0.4, 1.2))
    objs["boards"] = _mesh("ShoulderBoards", boards, 0.0028, bb_boards, collection, mats["gold_paint"], verbose)
    star_mat = mats["red"] if P["board_style"] == "gold_red_star" else mats["gold"]
    objs["board_stars"] = _mesh("ShoulderStars", stars, 0.0018, bb_boards, collection, star_mat, verbose)
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
                return np.maximum(np.maximum(x0 - 0.01 - ax + np.abs(Q[:, 1]) * 0.9, ax - x1 - 0.008), np.abs(Q[:, 1]) - hw)
            piping.union(shell_on(shirt_plain, 0.010, 0.0085, region, (p_top - 0.25, p_top + 0.25), k=0.005,
                                  extra=ball.dist))
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

    # ---- Đỉnh mũ xanh ô-liu: "gối" dẹt, phía trước hơi vểnh lên (dáng yên ngựa của kê-pi) ----
    crx, cry, crz = (np.asarray(P["crown_r"]) * sc).tolist()
    cz = P["crown_z"] * sc
    lift = P["crown_front_lift"]
    crown = Model("crown")
    crown.union(Ellipsoid((0, -0.01 * sc, cz), (crx, cry, crz), rot=rotation_matrix(-lift, 0, 0)))
    # vành chuyển tiếp từ đỉnh xuống băng (thu hẹp dần) — nằm bên trong đỉnh, lộ ra phía dưới mép
    crown.union(Lambda(lambda Q: smax(band_fn(Q * np.array([0.985, 0.985, 1.0]) - np.array([0, 0, 0.03 * sc])),
                                      -(Q[:, 2] - bh * 0.85), 0.01),
                       (-rx - 0.05, -ry - 0.05, 0.0), (rx + 0.05, ry + 0.05, cz + 0.05)), k=0.035)
    crown_bb = ((-crx - 0.05, -cry - 0.08, bh * 0.5), (crx + 0.05, cry + 0.05, cz + crz + 0.08))
    objs["crown"] = _mesh("Cap_Crown", crown, 0.0045, crown_bb, collection, mats["cap_crown"], verbose,
                          frame=cap_frame)

    # ---- Lưỡi trai đen bóng: tấm cong, chúc xuống, hai bên cụp nhẹ ----
    vl = P["visor_len"] * sc
    drop = math.tan(math.radians(P["visor_drop_deg"]))

    def visor_fn(Q):
        x, y, z = Q[:, 0], Q[:, 1], Q[:, 2]
        fwd = np.maximum(-y - ry * 0.80, 0.0)
        zs = 0.006 - drop * fwd - 0.55 * (x / rx) ** 2 * 0.06
        plate = np.abs(z - zs) * 0.93 - 0.0085
        # viền ngoài: elip lệch về trước
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
                                     Q[:, 1] + ry * 0.12, 0.01),           # chỉ nửa trước của mũ
                      (-rx - 0.05, -ry - 0.05, cord_z - 0.05), (rx + 0.05, 0.05, cord_z + 0.05)))
    for s in (-1, 1):
        ang = math.radians(15)
        bx, by = s * rx * 1.04 * math.cos(ang), -ry * 1.04 * math.sin(ang)
        gold.union(Ellipsoid((bx, by, cord_z), (0.017 * sc, 0.017 * sc, 0.017 * sc)), k=0.004)
    objs["cord"] = _mesh("Cap_Cord", gold, 0.002, None, collection, mats["gold_rope"], verbose, frame=cap_frame)

    # ---- Huy hiệu: vòng lá vàng + đĩa đỏ + sao vàng (cách điệu, KHÔNG sao chép công an hiệu) ----
    em_center_guess = np.array([0.0, 0.0, cz - crz * 0.15])
    p_em, n_em = surface_front(crown, 0.0, em_center_guess[2])
    em_frame_local = Frame(p_em, frame_from_axes(_norm(n_em * 0.7 + np.array([0, -1, 0.25]) * 0.3)))
    em_frame = cap_frame.compose(em_frame_local)
    er = P["emblem_r"] * sc
    wreath = Model("wreath")
    wreath.union(Torus((0, 0.004, 0), er * 0.80, er * 0.11, rot=rotation_matrix(90, 0, 0)))
    for s in (-1, 1):
        for i in range(7):
            a_deg = -110 + i * 28                     # lá xếp từ đáy vòng lên gần đỉnh
            a = math.radians(a_deg)
            px, pz = s * er * 0.80 * math.cos(a), er * 0.80 * math.sin(a)
            # trục dài của lá (trục Z cục bộ) xoay theo tiếp tuyến của vòng: góc quanh Y = -s·a
            leaf = Ellipsoid((px * 1.06, -0.002, pz * 1.06), (er * 0.13, er * 0.09, er * 0.26),
                             rot=rotation_matrix(0, -s * a_deg + s * 18, 0))
            wreath.union(leaf, k=er * 0.06)
    # khoảng hở ở đỉnh vòng lá (giống vòng nguyệt quế)
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

def build_face_parts(P, head_frame, head_info, collection, mats, verbose=True):
    objs = {}
    rx, rz = P["eye_size"]
    prot = P["eye_protrude"]
    R_big = 0.20
    for s, fr in head_info["eyes"]:
        tilt = math.radians(s * P["eye_tilt"])
        c, sn = math.cos(tilt), math.sin(tilt)

        def eye_fn(Q, c=c, sn=sn):
            x = Q[:, 0] * c + Q[:, 2] * sn
            z = -Q[:, 0] * sn + Q[:, 2] * c
            if P["eye_shape"] == "almond":
                d2 = sd2_vesica(x, z, rx, rz) - 0.004
            else:
                d2 = sd2_ellipse_approx(x, z, rx, rz)
            dome = np.sqrt(Q[:, 0] ** 2 + (Q[:, 1] - (R_big - prot)) ** 2 + Q[:, 2] ** 2) - R_big
            d = smax(d2, dome, 0.010)
            return smax(d, Q[:, 1] - 0.03, 0.0)
        eye = Lambda(eye_fn, (-rx - 0.02, -0.06, -rz - 0.03), (rx + 0.02, 0.05, rz + 0.03))
        name = "Eye_L" if s > 0 else "Eye_R"
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

    # ---- Lưỡi: dải dẹt cong, thò ra khỏi miệng, buông xuống qua môi dưới, có rãnh giữa ----
    mp = head_info["mouth_p"]
    L, w = P["tongue_len"], P["tongue_w"]
    side = P["tongue_side"]
    path = [mp + (side * 0.3, 0.07, 0.012),
            mp + (side * 0.6, -0.005, -0.002),
            mp + (side * 0.9, -0.045, -0.035),
            mp + (side, -0.06, -0.035 - L * 0.55)]
    tongue = Model("tongue")
    widths = [w * 0.92, w, w * 0.98, w * 0.86]
    for (a, wa), (b, wb) in zip(zip(path[:-1], widths[:-1]), zip(path[1:], widths[1:])):
        seg_dir = _norm(b - a)
        facing = _norm(np.cross(seg_dir, (1, 0, 0)))
        if facing[1] > 0:
            facing = -facing
        tongue.union(FlatRoundCone(a, b, wa, wb, facing, P["tongue_thick"]), k=0.03)
    # rãnh giữa lưỡi (mặt trước)
    for a, b in zip(path[1:-1], path[2:]):
        seg_dir = _norm(b - a)
        facing = _norm(np.cross(seg_dir, (1, 0, 0)))
        if facing[1] > 0:
            facing = -facing
        tongue.subtract(Capsule(a + facing * 0.0165, b + facing * 0.0135 - seg_dir * 0.03, 0.0065), k=0.01)
    objs["tongue"] = _mesh("Tongue", tongue, 0.0018, None, collection, mats["tongue"], verbose,
                           frame=head_frame)
    return objs


# =============================================================================
# 7. Vật liệu + hàm dựng tổng
# =============================================================================

def make_materials(P):
    pal = P["palette"]
    k = P["key"]
    eye_style = P["eye_style"]
    mats = {
        "fur": M.make_fur_vinyl(f"M_{k}_Fur", dict(pal, **({"brow": pal["white"]} if P["brows"] else {})),
                                edge=P["mask_edge"], blush=P["blush"]),
        "shirt": M.make_fabric(f"M_{k}_Shirt", pal["shirt"]),
        "cap_crown": M.make_fabric(f"M_{k}_CapCrown", pal["cap_crown"], weave_strength=0.08),
        "red": M.make_fabric(f"M_{k}_RedFelt", pal["red"], weave_strength=0.06, roughness=0.55, sheen=0.12),
        "gold": M.make_gold(f"M_{k}_Gold", pal["gold"]),
        "gold_rope": M.make_gold(f"M_{k}_GoldRope", pal["gold"], roughness=0.3, rope=True),
        "gold_paint": M.make_satin(f"M_{k}_GoldPaint", pal["gold_paint"], roughness=0.32, coat=0.4),
        # lưỡi trai: đen "satin bóng" — quá bóng thì phản chiếu cả bầu trời studio → trông như bạc
        "visor": M.make_glossy(f"M_{k}_Visor", pal["visor"], roughness=0.38, coat=0.45, coat_rough=0.2,
                               specular=0.32),
        "belt": M.make_glossy(f"M_{k}_Belt", pal["belt"], roughness=0.42, coat=0.25, coat_rough=0.3,
                              bump_scale=90.0, bump_strength=0.12),
        "nose": M.make_glossy(f"M_{k}_Nose", pal["nose"], roughness=0.3, coat=0.6, coat_rough=0.12,
                              bump_scale=160.0, bump_strength=0.25),
        "tongue": M.make_glossy(f"M_{k}_Tongue", pal["tongue"], roughness=0.25, coat=0.55, coat_rough=0.12,
                                sss=0.35, sss_radius=(1.0, 0.25, 0.2)),
        "eye": M.make_eye(f"M_{k}_Eye", "iris" if eye_style == "iris" else "black",
                          iris_color=pal["eye_iris"], iris_radius=P["eye_iris_r"], pupil_radius=P["eye_pupil_r"],
                          catchlights=P["eye_catchlights"]),
    }
    return mats


def head_frame_for(P, pose):
    """Khung đầu: xoay quanh điểm cổ (pivot) theo tư thế."""
    pivot = np.array([0.0, 0.0, P["head_center"][2] - 0.38])
    if pose == "salute":
        R = rotation_matrix(P["salute_head_pitch"], P["salute_head_roll"], 0.0)
    else:
        R = rotation_matrix(0.0, P["neutral_head_roll"], 0.0)
    return Frame(pivot - R @ pivot, R)


def build_corgi(P, pose="neutral", collection=None, verbose=True):
    """Dựng toàn bộ nhân vật. Trả về dict tên → object Blender."""
    import time
    t0 = time.perf_counter()
    mats = make_materials(P)
    head_model, head_info = build_head(P)
    head_frame = head_frame_for(P, pose)
    body, arms = build_body(P, pose, head_model, head_frame, head_info)

    objs = {}
    fur_objects = [("Body_Fur", body, P["voxel_body"])]
    for a in arms:
        fur_objects.append(("Arm_R_Fur" if a["side"] < 0 else "Arm_L_Fur", build_arm(P, a), P["voxel_body"] * 0.8))
    for name, model, voxel in fur_objects:
        obj = _mesh(name, model, voxel, None, collection, mats["fur"], verbose, subdiv=(1, 1))
        V = np.array([v.co[:] for v in obj.data.vertices])
        for mname, values in fur_masks(P, V, head_frame, head_info, arms).items():
            add_point_attribute(obj, mname, np.clip(values, -0.05, 0.05) if mname != "m_shade" else values)
        objs[name] = obj

    shirt, shirt_plain, core = build_shirt(P, arms)
    sleeve_top = max(a["elbow"][2] for a in arms) + 0.15
    sbb = (np.array([-0.8, -0.6, P["shirt_hem"] - 0.08]), np.array([0.8, 0.6, max(P["shirt_top"] + 0.05, sleeve_top)]))
    objs["shirt"] = _mesh("Shirt", shirt, 0.0042, sbb, collection, mats["shirt"], verbose, subdiv=(1, 1))
    objs.update(build_uniform_parts(P, arms, shirt, shirt_plain, core, collection, mats, verbose))
    cap_objs, _ = build_cap(P, head_frame, head_info, collection, mats, verbose)
    objs.update(cap_objs)
    objs.update(build_face_parts(P, head_frame, head_info, collection, mats, verbose))
    if verbose:
        print(f"[corgi] concept {P['key']} pose={pose}: {len(objs)} object, {time.perf_counter()-t0:.0f}s")
    return objs
