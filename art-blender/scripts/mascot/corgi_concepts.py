"""
corgi_concepts.py — Bộ thông số cho 3 hướng concept của mascot Corgi.

Mỗi concept là một dict. BASE chứa giá trị mặc định (concept A "Tròn Đậu").
Concept B, C chỉ ghi những gì KHÁC so với BASE (hàm make_concept() trộn lại).

Quy ước toạ độ (mét): nhân vật cao ~2 m, chân chạm sàn z = 0, mặt nhìn về -Y (phía camera),
X dương = bên TRÁI của nhân vật (bên phải người xem).
Các toạ độ của ĐẦU ghi dưới dạng "độ lệch so với tâm đầu" (head_center) cho dễ chỉnh tỉ lệ.

Màu sắc: giá trị LINEAR (không phải hex sRGB). Ghi chú hex sRGB gần đúng ở bên cạnh.
"""

import copy

# Bảng màu chung (linear)
PALETTE_BASE = {
    "orange_light": (0.86, 0.30, 0.055),   # ~ #F0943E cam vàng ấm (má, viền)
    "orange_deep": (0.62, 0.15, 0.022),    # ~ #CF6A26 cam đậm (lưng, đỉnh đầu, ngọn tai)
    "white": (0.90, 0.84, 0.74),           # ~ #F3ECDF trắng kem ấm (không trắng tinh để khỏi cháy sáng)
    "inner_ear": (0.90, 0.55, 0.38),       # ~ #F3C3A5 kem đào (lòng tai)
    "brow": (0.93, 0.86, 0.72),            # ~ #F7EEDC lông mày kem
    "pad": (0.90, 0.36, 0.40),             # ~ #F2A0A8 đệm thịt hồng ở lòng bàn tay
    "mouth": (0.20, 0.022, 0.03),          # ~ #7A2830 đỏ sẫm trong miệng / đường miệng
    "nose": (0.018, 0.015, 0.016),         # gần đen
    "eye_line": (0.022, 0.014, 0.014),     # mắt nhắm (sợi cong) — nâu đen
    "tongue": (0.92, 0.12, 0.17),          # ~ #F5617A hồng đậm, ướt
    # ---- ĐỒNG PHỤC: đổi màu ở ĐÂY (vd sang Cảnh sát giao thông: xem UNIFORM_PRESETS bên dưới) ----
    "shirt": (0.22, 0.33, 0.075),          # ~ #82A04C xanh ô-liu sáng (áo cảnh sát)
    "cap_crown": (0.13, 0.22, 0.045),      # ~ #63813B ô-liu đậm hơn (đỉnh mũ)
    "red": (0.48, 0.006, 0.014),           # ~ #B8101E đỏ (băng mũ, ve áo) — đậm để AgX không thành hồng san hô
    "gold": (1.0, 0.70, 0.26),             # vàng kim loại
    "gold_paint": (0.95, 0.62, 0.10),      # ~ #F9D05A vàng sơn (cầu vai)
    "visor": (0.010, 0.010, 0.013),        # đen satin
    "belt": (0.11, 0.045, 0.018),          # ~ #5C3B24 nâu da
    "eye_iris": (0.045, 0.016, 0.006),     # quầng nâu RẤT tối ở đáy mắt đen (A, C) — B có màu riêng
}

# Bộ màu đồng phục có sẵn — chọn bằng tham số --uniform khi render (render_poses.py)
UNIFORM_PRESETS = {
    # Cảnh sát nhân dân: áo xanh ô-liu nhạt, mũ đỉnh xanh, băng đỏ (mặc định hiện tại)
    "olive": {},
    # Cảnh sát giao thông: áo + đỉnh mũ màu vàng kem nhạt
    "traffic": {"shirt": (0.80, 0.62, 0.30), "cap_crown": (0.74, 0.56, 0.26)},
}

BASE = {
    "key": "A",
    "name": "Tròn Đậu (Rounded Bean)",
    "palette": PALETTE_BASE,
    "mask_edge": 0.006,          # độ mềm ranh màu lông (m)
    "voxel_body": 0.0065,        # kích thước voxel khi tạo lưới thân (m) — nhỏ = chi tiết hơn, chậm hơn

    # ---------------- ĐẦU ----------------
    "head_center": (0.0, 0.0, 1.40),
    "cranium": (0.50, 0.45, 0.45),
    "forehead_off": (0.0, -0.16, 0.06), "forehead_r": (0.40, 0.30, 0.32),
    "cheek_off": (0.25, -0.20, -0.17), "cheek_r": (0.26, 0.23, 0.21), "cheek_k": 0.12,
    "muzzle_off": (0.0, -0.355, -0.155), "muzzle_r": (0.20, 0.18, 0.13), "muzzle_k": 0.10,
    "muzzle_tip": None,          # (off, r) — thêm khối đầu mõm nhọn (concept B)
    "bridge": ((0.0, -0.33, 0.04), (0.0, -0.47, -0.09), 0.07),
    "chin_off": (0.0, -0.35, -0.285), "chin_r": (0.12, 0.10, 0.06),
    # Túm lông má (đầu, cuối, r đầu, r cuối) — cho bên X dương, tự lấy đối xứng
    # Túm lông má: đầu túm TO (≥ 0.045) + hợp mềm rộng → viền gợn sóng mềm, KHÔNG thành gai nhọn
    "cheek_tufts": [
        ((0.36, -0.14, -0.20), (0.46, -0.12, -0.27), 0.080, 0.050),
        ((0.42, -0.04, -0.13), (0.51, -0.02, -0.18), 0.078, 0.048),
        ((0.30, -0.22, -0.25), (0.35, -0.21, -0.32), 0.065, 0.045),
    ],
    "tuft_k": 0.05,
    "head_scale": 1.06,          # phóng to/thu nhỏ CẢ cái đầu (gồm mũ, mắt, tai...) — cằm giữ nguyên chỗ
    "blaze": 0.085,              # vệt trắng giữa trán (bề rộng đỉnh, m); 0 = không có
    # Mắt
    "eye_style": "black",        # "black" | "iris"
    "eye_shape": "ellipse",      # "ellipse" | "almond"
    "eye_pos": (0.200, 0.035),   # (x, z lệch so với tâm đầu) trên mặt
    "eye_size": (0.088, 0.104),  # (rx, rz) — với almond: (nửa dài, nửa cao)
    "eye_tilt": 0.0,             # độ, đuôi mắt xếch lên (+)
    "eye_protrude": 0.016,
    "eye_catchlights": ((-0.026, 0.036, 0.020), (0.030, -0.036, 0.010)),
    "eye_iris_r": 0.075, "eye_pupil_r": 0.03,
    # Lông mày: (x, khoảng cách trên mép mắt, rx, rz, độ nhô) — None = không có lông mày
    "brow": (0.17, 0.045, 0.050, 0.025, 0.009),
    # Mũi, miệng, lưỡi
    "nose_z": -0.105, "nose_r": (0.072, 0.05, 0.048),
    "mouth_z": -0.215, "mouth_halfwidth": 0.13, "mouth_open": 0.050, "mouth_curve": 0.040,
    "tongue_len": 0.12, "tongue_w": 0.052, "tongue_side": 0.012, "tongue_thick": 0.30,
    "blush": 0.55,               # độ đậm má hồng "phun sơn" (0 = tắt)
    # Tai: gốc, góc nghiêng ra ngoài, nghiêng ra sau, dài, bán kính gốc/ngọn, độ dẹt
    "ear_base_off": (0.425, 0.07, 0.15), "ear_out_deg": 32.0, "ear_back_deg": 10.0, "ear_len": 0.47,
    "ear_r_base": 0.20, "ear_r_tip": 0.068, "ear_thick": 0.55, "ear_face_out_deg": 22.0,
    "ear_inner": 0.48,           # bề rộng lòng tai so với tai (nhỏ hơn = viền cam dày hơn)

    # ---------------- THÂN ----------------
    "torso_c": (0.0, 0.02, 0.585), "torso_r": (0.33, 0.29, 0.33),
    "belly_c": (0.0, -0.06, 0.50), "belly_r": (0.29, 0.25, 0.26),
    "chest_c": (0.0, -0.06, 0.76), "chest_r": (0.27, 0.22, 0.17),
    "butt_c": (0.13, 0.17, 0.36), "butt_r": 0.19,
    "tail_c": (0.0, 0.39, 0.42),
    "shoulder": (0.30, -0.01, 0.775), "shoulder_r": 0.11, "neck_r": 0.13,
    "arm_r": (0.092, 0.080),     # bán kính cánh tay (vai, cổ tay)
    "arm_len": (0.235, 0.255),   # (cánh tay trên, cẳng tay + bàn) khi đứng thường
    "paw_r": (0.088, 0.075, 0.098),   # (ngang, dày, dài)
    "hip": (0.17, 0.0, 0.34), "ankle": (0.19, -0.03, 0.11), "leg_r": (0.125, 0.10),
    "foot_c": (0.20, -0.10, 0.068), "foot_r": (0.115, 0.165, 0.078),
    "neck_k": 0.07,

    # ---------------- TƯ THẾ ----------------
    "neutral_head_roll": 3.0,    # nghiêng đầu nhẹ cho dễ thương (độ)
    "neutral_paw": (0.47, -0.10, 0.41),
    "salute_head_roll": -9.0, "salute_head_pitch": 3.0,
    # Tay chào (toạ độ đầu, x dương = hướng RA NGOÀI phía tay chào): bàn tay ở mép vành mũ, TRƯỚC tai
    "salute_paw_off": (0.40, -0.30, 0.15),
    "salute_fingers": (-0.62, -0.10, 0.78),   # ngón chỉ chéo lên, vào phía giữa vành mũ
    "salute_palm": (0.25, -0.95, -0.15),      # lòng bàn tay quay ra trước (thấy đệm thịt hồng)
    "salute_shrug": 0.06,

    # ---------------- ĐỒNG PHỤC ----------------
    "shirt_t": 0.022, "shirt_top": 0.965, "shirt_hem": 0.335,
    "sleeve_frac": 0.62, "sleeve_extra": (0.030, 0.036),
    "belt_z": 0.475, "belt_half_h": 0.034,
    "folds": 1.0,                # hệ số độ sâu nếp gấp
    "fold_detail": "simple",    # "simple" | "rich"
    "collar_poly": [(-0.022, 0.935), (-0.075, 0.79), (-0.215, 0.835), (-0.235, 0.965)],
    "pockets": False,
    "placket_buttons_z": (0.70, 0.60, 0.39),
    "board_len": (0.15, 0.39), "board_halfw": 0.064, "board_thick": 0.014,
    "board_style": "gold",       # "gold" | "gold_red_piping" | "gold_red_star" | "red"
    "cuffs": False,
    # Mũ kê-pi: khung mũ đặt theo toạ độ đầu
    "cap_off": (0.0, -0.035, 0.245), "cap_pitch": -4.0, "cap_roll": 0.0, "cap_scale": 1.0,
    "band_r": (0.432, 0.388), "band_h": 0.12,
    "crown_r": (0.492, 0.468, 0.090), "crown_z": 0.205, "crown_front_lift": 8.0,
    "visor_len": 0.215, "visor_drop_deg": 21.0,
    "emblem_r": 0.096, "emblem_lift": 0.02,   # huy hiệu to hơn để còn nhìn ra ở ảnh nhỏ
    "buckle_star": False,
}


CONCEPT_B = {
    "key": "B",
    "head_scale": 1.0,
    "name": "Cáo Tinh Anh (Fox-cute)",
    "head_center": (0.0, 0.0, 1.42),
    "cranium": (0.48, 0.44, 0.43),
    "forehead_r": (0.38, 0.30, 0.31),
    "cheek_off": (0.24, -0.19, -0.18), "cheek_r": (0.23, 0.21, 0.19), "cheek_k": 0.11,
    "muzzle_off": (0.0, -0.39, -0.16), "muzzle_r": (0.165, 0.22, 0.12), "muzzle_k": 0.10,
    "muzzle_tip": ((0.0, -0.55, -0.135), (0.085, 0.075, 0.075)),
    "bridge": ((0.0, -0.32, 0.05), (0.0, -0.55, -0.08), 0.065),
    "chin_off": (0.0, -0.40, -0.28), "chin_r": (0.10, 0.11, 0.055),
    "cheek_tufts": [
        ((0.34, -0.14, -0.20), (0.46, -0.12, -0.29), 0.072, 0.042),
        ((0.40, -0.04, -0.12), (0.50, -0.02, -0.19), 0.072, 0.042),
        ((0.28, -0.22, -0.25), (0.34, -0.22, -0.34), 0.058, 0.040),
    ],
    "tuft_k": 0.045,
    "eye_style": "iris", "eye_shape": "almond",
    "palette": dict(PALETTE_BASE, eye_iris=(0.11, 0.035, 0.008)),   # tròng nâu ấm (hiền, đáng tin)
    "eye_pos": (0.19, 0.035), "eye_size": (0.102, 0.074), "eye_tilt": 7.0, "eye_protrude": 0.014,
    "eye_iris_r": 0.060, "eye_pupil_r": 0.034,
    "eye_catchlights": ((-0.024, 0.026, 0.017), (0.024, -0.022, 0.008)),
    "brow": (0.155, 0.065, 0.050, 0.026, 0.010),
    "blush": 0.3,
    "nose_z": -0.10, "nose_r": (0.062, 0.045, 0.042),
    "mouth_z": -0.215, "mouth_halfwidth": 0.11, "mouth_open": 0.036, "mouth_curve": 0.04,
    "tongue_len": 0.11, "tongue_w": 0.045,
    "ear_base_off": (0.41, 0.08, 0.15), "ear_out_deg": 28.0, "ear_len": 0.55,
    "ear_r_base": 0.18, "ear_r_tip": 0.042, "ear_thick": 0.45, "ear_inner": 0.50,
    "torso_c": (0.0, 0.02, 0.60), "torso_r": (0.31, 0.27, 0.35),
    "belly_r": (0.27, 0.24, 0.27),
    "chest_c": (0.0, -0.06, 0.78), "chest_r": (0.26, 0.21, 0.17),
    "shoulder": (0.29, -0.01, 0.795), "shoulder_r": 0.105,
    "shirt_top": 0.985, "shirt_hem": 0.32, "belt_z": 0.48,
    "folds": 1.5, "fold_detail": "rich", "pockets": True, "cuffs": True,
    "placket_buttons_z": (0.72, 0.62, 0.38),
    "board_style": "gold_red_piping",
    "collar_poly": [(-0.022, 0.945), (-0.07, 0.80), (-0.21, 0.845), (-0.23, 0.975)],
    "cap_off": (0.0, -0.035, 0.235),
    "band_r": (0.418, 0.382), "crown_r": (0.478, 0.460, 0.088),
    "emblem_r": 0.090,
    "salute_paw_off": (0.39, -0.30, 0.15),
}


CONCEPT_C = {
    "key": "C",
    "head_scale": 1.0,
    "name": "Đồ Chơi Mập (Chunky Toy)",
    "mask_edge": 0.003,
    "palette": dict(PALETTE_BASE, orange_light=(0.92, 0.36, 0.06), orange_deep=(0.80, 0.25, 0.035),
                    white=(0.88, 0.83, 0.74)),
    "head_center": (0.0, 0.0, 1.30),
    "cranium": (0.57, 0.51, 0.52),
    "forehead_off": (0.0, -0.17, 0.06), "forehead_r": (0.45, 0.33, 0.35),
    "cheek_off": (0.28, -0.22, -0.18), "cheek_r": (0.29, 0.25, 0.23), "cheek_k": 0.13,
    "muzzle_off": (0.0, -0.40, -0.17), "muzzle_r": (0.22, 0.17, 0.14), "muzzle_k": 0.10,
    "bridge": ((0.0, -0.36, 0.04), (0.0, -0.50, -0.10), 0.075),
    "chin_off": (0.0, -0.39, -0.30), "chin_r": (0.13, 0.10, 0.06),
    "cheek_tufts": [
        ((0.42, -0.14, -0.22), (0.52, -0.12, -0.29), 0.085, 0.055),
        ((0.47, -0.04, -0.14), (0.56, -0.02, -0.20), 0.085, 0.055),
    ],
    "tuft_k": 0.055,
    "eye_style": "black", "eye_shape": "ellipse",
    "eye_pos": (0.228, 0.03), "eye_size": (0.106, 0.122), "eye_protrude": 0.021,
    "eye_catchlights": ((-0.032, 0.040, 0.030), (0.034, -0.040, 0.014)),
    "eye_iris_r": 0.085,
    "blush": 0.7,
    "nose_z": -0.11, "nose_r": (0.085, 0.058, 0.055),
    "mouth_z": -0.23, "mouth_halfwidth": 0.13, "mouth_open": 0.045, "mouth_curve": 0.03,
    "tongue_len": 0.13, "tongue_w": 0.056,
    "ear_base_off": (0.48, 0.07, 0.17), "ear_out_deg": 35.0, "ear_len": 0.47,
    "ear_r_base": 0.21, "ear_r_tip": 0.080, "ear_thick": 0.55, "ear_inner": 0.48,
    "brow": (0.20, 0.045, 0.056, 0.028, 0.010),
    "torso_c": (0.0, 0.02, 0.50), "torso_r": (0.35, 0.30, 0.28),
    "belly_c": (0.0, -0.06, 0.44), "belly_r": (0.31, 0.27, 0.22),
    "chest_c": (0.0, -0.06, 0.64), "chest_r": (0.28, 0.22, 0.13),
    "butt_c": (0.14, 0.16, 0.30), "butt_r": 0.18,
    "tail_c": (0.0, 0.38, 0.36),
    "shoulder": (0.31, -0.01, 0.655), "shoulder_r": 0.11,
    "arm_r": (0.10, 0.09), "arm_len": (0.20, 0.23),
    "paw_r": (0.12, 0.10, 0.125),
    "hip": (0.18, 0.0, 0.27), "ankle": (0.20, -0.03, 0.10), "leg_r": (0.14, 0.12),
    "foot_c": (0.21, -0.11, 0.075), "foot_r": (0.14, 0.19, 0.085),
    "neutral_paw": (0.50, -0.12, 0.34),
    "salute_paw_off": (0.45, -0.33, 0.16),
    "shirt_top": 0.845, "shirt_hem": 0.27, "belt_z": 0.40, "belt_half_h": 0.040,
    "folds": 0.7,
    "collar_poly": [(-0.025, 0.815), (-0.08, 0.68), (-0.23, 0.72), (-0.25, 0.84)],
    "placket_buttons_z": (0.58,),
    "board_len": (0.13, 0.36), "board_halfw": 0.065, "board_style": "gold_red_star",
    "cap_off": (0.0, -0.04, 0.26), "cap_pitch": -6.0, "cap_roll": -4.0, "cap_scale": 1.15,
    "band_r": (0.425, 0.385), "band_h": 0.12,
    "crown_r": (0.49, 0.47, 0.095),
    "emblem_r": 0.100,
    "buckle_star": True,
}


# Các thông số "độ dài" của ĐẦU — nhân với head_scale khi phóng to/thu nhỏ cả cái đầu
HEAD_LENGTH_KEYS = [
    "cranium", "forehead_off", "forehead_r", "cheek_off", "cheek_r", "cheek_k", "muzzle_off", "muzzle_r",
    "muzzle_k", "muzzle_tip", "bridge", "chin_off", "chin_r", "cheek_tufts", "tuft_k", "eye_pos", "eye_size",
    "eye_protrude", "eye_catchlights", "eye_iris_r", "eye_pupil_r", "brow", "nose_z", "nose_r", "mouth_z",
    "mouth_halfwidth", "mouth_open", "mouth_curve", "tongue_len", "tongue_w", "tongue_side", "ear_base_off",
    "ear_len", "ear_r_base", "ear_r_tip", "cap_off", "salute_paw_off", "blaze",
]


def _scale(value, s):
    """Nhân mọi con số trong value (số, tuple, list lồng nhau) với s."""
    if value is None:
        return None
    if isinstance(value, (int, float)):
        return value * s
    return type(value)(_scale(v, s) for v in value)


def make_concept(key, uniform="olive"):
    """
    Trả về dict thông số đầy đủ của concept 'A' | 'B' | 'C'.
    uniform: bộ màu đồng phục trong UNIFORM_PRESETS ("olive" = Cảnh sát, "traffic" = CSGT).
    """
    params = copy.deepcopy(BASE)
    override = {"A": {}, "B": CONCEPT_B, "C": CONCEPT_C}[key.upper()]
    params.update(copy.deepcopy(override))
    params["palette"] = dict(params["palette"], **UNIFORM_PRESETS[uniform])
    hs = params["head_scale"]
    if hs != 1.0:
        hc = params["head_center"]
        chin_bottom = hc[2] + params["chin_off"][2] - params["chin_r"][2]
        for k in HEAD_LENGTH_KEYS:
            params[k] = _scale(params[k], hs)
        params["cap_scale"] *= hs
        # giữ cằm ở nguyên độ cao để đầu vẫn nối khít với cổ
        new_hc_z = chin_bottom - (params["chin_off"][2] - params["chin_r"][2])
        params["head_center"] = (hc[0], hc[1], new_hc_z)
    params["hs"] = hs
    return params
