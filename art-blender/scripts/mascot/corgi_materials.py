"""
corgi_materials.py — Vật liệu (material) cho mascot Corgi kiểu "đồ chơi vinyl cao cấp".

NGUYÊN TẮC CHUNG:
    - Vinyl designer toy: bề mặt mịn, hơi bóng kiểu satin (lớp Coat mỏng), ánh sáng thấm nhẹ dưới da
      (Subsurface) để màu không bị "chết" như nhựa rẻ tiền.
    - Màu lông KHÔNG tô bằng texture ảnh mà bằng "mặt nạ" (mask) lưu trên từng đỉnh lưới:
        m_white  : khoảng cách có dấu tới vùng lông trắng (âm = trong vùng trắng)
        m_inner  : vùng trong tai (hồng kem)
        m_mouth  : vùng trong miệng (đỏ sẫm)
        m_brow   : mảng "lông mày" (màu kem; góc nghiêng đổi theo biểu cảm)
        m_pad    : đệm thịt hồng ở lòng bàn tay
        m_blush  : má hồng phun sơn
        m_shade  : 0..1, càng lớn càng về phía lưng/đỉnh đầu → cam đậm hơn
      Shader dùng node Map Range (kiểu SMOOTHSTEP) trên các giá trị này → đường ranh màu SẮC NÉT,
      mượt (vì giá trị khoảng cách được nội suy tuyến tính giữa các đỉnh, đường 0 rất trơn).
    - Màu trong node là màu TUYẾN TÍNH (linear), không phải mã hex sRGB. AgX làm màu nhạt đi một chút
      → chọn màu gốc hơi rực hơn mong muốn (xem PIPELINE-NOTES mục 20).

Socket của node Mix (ShaderNodeMix, data_type='RGBA'): inputs[0]=Factor, [6]=A, [7]=B, outputs[2]=Result.
"""

import bpy


# -----------------------------------------------------------------------------
# Tiện ích dựng node
# -----------------------------------------------------------------------------

class NodeBuilder:
    """Bọc node_tree cho gọn: tạo node, đặt vị trí, nối dây."""

    def __init__(self, mat):
        if mat.node_tree is None:
            mat.use_nodes = True
        self.nt = mat.node_tree
        self.nodes, self.links = self.nt.nodes, self.nt.links
        self.nodes.clear()
        self.out = self.new("ShaderNodeOutputMaterial", 900, 0)

    def new(self, kind, x=0, y=0, **props):
        n = self.nodes.new(kind)
        n.location = (x, y)
        for k, v in props.items():
            setattr(n, k, v)
        return n

    def link(self, a, b):
        self.links.new(a, b)

    def attr(self, name, x, y):
        n = self.new("ShaderNodeAttribute", x, y)
        n.attribute_type = "GEOMETRY"
        n.attribute_name = name
        return n

    def smooth_mask(self, src_socket, edge_in, edge_out, x, y):
        """Map Range SMOOTHSTEP: giá trị = edge_in → 1, = edge_out → 0 (ranh màu mềm vừa đủ)."""
        mr = self.new("ShaderNodeMapRange", x, y)
        mr.interpolation_type = "SMOOTHSTEP"
        mr.inputs[1].default_value = edge_in
        mr.inputs[2].default_value = edge_out
        mr.inputs[3].default_value = 1.0
        mr.inputs[4].default_value = 0.0
        self.link(src_socket, mr.inputs[0])
        return mr.outputs[0]

    def mix_color(self, fac_socket, a, b, x, y):
        """Trộn 2 màu (a khi fac=0, b khi fac=1). a/b là socket hoặc tuple RGBA."""
        m = self.new("ShaderNodeMix", x, y)
        m.data_type = "RGBA"
        m.blend_type = "MIX"
        if fac_socket is not None:
            self.link(fac_socket, m.inputs[0])
        for idx, val in ((6, a), (7, b)):
            if isinstance(val, tuple):
                m.inputs[idx].default_value = val if len(val) == 4 else (*val, 1.0)
            else:
                self.link(val, m.inputs[idx])
        return m.outputs[2]

    def math(self, op, a, b, x, y):
        n = self.new("ShaderNodeMath", x, y)
        n.operation = op
        for idx, val in ((0, a), (1, b)):
            if isinstance(val, (int, float)):
                n.inputs[idx].default_value = val
            else:
                self.link(val, n.inputs[idx])
        return n.outputs[0]

    def principled(self, x=600, y=0, **values):
        p = self.new("ShaderNodeBsdfPrincipled", x, y)
        for name, val in values.items():
            p.inputs[name.replace("_", " ")].default_value = val
        self.link(p.outputs[0], self.out.inputs["Surface"])
        return p

    def object_coords(self, x, y):
        tc = self.new("ShaderNodeTexCoord", x, y)
        return tc.outputs["Object"]


def _new_material(name):
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    return mat, NodeBuilder(mat)


def _rgba(c):
    return c if len(c) == 4 else (*c, 1.0)


# -----------------------------------------------------------------------------
# 1. Lông vinyl (thân + đầu + tai + chân tay — một lưới duy nhất)
# -----------------------------------------------------------------------------

def make_fur_vinyl(name, palette, edge=0.006, gloss=0.3, fur_bump=0.018, blush=0.0):
    """
    palette: dict màu linear:
        orange_light, orange_deep, white, inner_ear, mouth, brow (tuỳ chọn)
    edge: nửa bề rộng vùng chuyển màu (m). 0.006 = ranh sắc kiểu sơn vinyl.
    """
    mat, nb = _new_material(name)
    # --- màu cam: chuyển từ sáng (bụng/má) → đậm (lưng/đỉnh đầu) theo m_shade ---
    shade = nb.attr("m_shade", -1400, 400)
    base = nb.mix_color(shade.outputs["Factor"], _rgba(palette["orange_light"]),
                        _rgba(palette["orange_deep"]), -1150, 400)
    # --- lông trắng ---
    white_attr = nb.attr("m_white", -1400, 150)
    white_fac = nb.smooth_mask(white_attr.outputs["Factor"], -edge, edge, -1150, 150)
    col = nb.mix_color(white_fac, base, _rgba(palette["white"]), -900, 300)
    # --- mảng lông mày (màu kem, nhô nhẹ — góc theo biểu cảm) ---
    if "brow" in palette:
        brow_attr = nb.attr("m_brow", -1400, -50)
        brow_fac = nb.smooth_mask(brow_attr.outputs["Factor"], -edge, edge, -1150, -50)
        col = nb.mix_color(brow_fac, col, _rgba(palette["brow"]), -700, 250)
    # --- đệm thịt hồng ở lòng bàn tay ("hạt đậu") ---
    if "pad" in palette:
        pad_attr = nb.attr("m_pad", -1400, -350)
        pad_fac = nb.smooth_mask(pad_attr.outputs["Factor"], -0.003, 0.003, -1150, -350)
        col = nb.mix_color(pad_fac, col, _rgba(palette["pad"]), -550, 180)
    # --- má hồng phun sơn: chuyển rất mềm (ranh rộng 4 cm), trộn tối đa `blush` ---
    if blush > 0:
        blush_attr = nb.attr("m_blush", -1400, -150)
        blush_fac = nb.smooth_mask(blush_attr.outputs["Factor"], -0.03, 0.02, -1150, -150)
        blush_amt = nb.math("MULTIPLY", blush_fac, blush, -1000, -150)
        col = nb.mix_color(blush_amt, col, (0.95, 0.30, 0.30, 1.0), -600, 220)
    # --- trong tai ---
    inner_attr = nb.attr("m_inner", -1400, -250)
    inner_fac = nb.smooth_mask(inner_attr.outputs["Factor"], -edge * 1.5, edge * 1.5, -1150, -250)
    col = nb.mix_color(inner_fac, col, _rgba(palette["inner_ear"]), -500, 200)
    # --- trong miệng ---
    mouth_attr = nb.attr("m_mouth", -1400, -450)
    mouth_fac = nb.smooth_mask(mouth_attr.outputs["Factor"], -0.004, 0.004, -1150, -450)
    col = nb.mix_color(mouth_fac, col, _rgba(palette["mouth"]), -300, 150)

    # Độ nhám: lông satin 0.42, trong miệng ướt hơn (0.25)
    rough = nb.mix_color(mouth_fac, (0.42, 0.42, 0.42, 1), (0.22, 0.22, 0.22, 1), -300, -150)

    # --- bump "lông" rất nhẹ: nhiễu kéo dài theo chiều dọc → gợi sợi lông, không làm mất độ mịn vinyl ---
    coords = nb.object_coords(-1400, -700)
    stretch = nb.new("ShaderNodeVectorMath", -1200, -700)
    stretch.operation = "MULTIPLY"
    stretch.inputs[1].default_value = (140.0, 140.0, 45.0)
    nb.link(coords, stretch.inputs[0])
    noise = nb.new("ShaderNodeTexNoise", -1000, -700)
    noise.inputs["Scale"].default_value = 1.0
    noise.inputs["Detail"].default_value = 3.0
    noise.inputs["Roughness"].default_value = 0.55
    nb.link(stretch.outputs[0], noise.inputs["Vector"])
    bump = nb.new("ShaderNodeBump", -700, -700)
    bump.inputs["Strength"].default_value = fur_bump
    bump.inputs["Distance"].default_value = 0.002
    nb.link(noise.outputs["Factor"], bump.inputs["Height"])

    p = nb.principled(
        Roughness=0.42, Coat_Weight=gloss, Coat_Roughness=0.28,
        Subsurface_Weight=0.05, Subsurface_Radius=(1.0, 0.45, 0.25), Subsurface_Scale=0.008,
        Sheen_Weight=0.25, Sheen_Roughness=0.45, Sheen_Tint=(1.0, 0.85, 0.7, 1.0),
        Specular_IOR_Level=0.45,
    )
    nb.link(col, p.inputs["Base Color"])
    nb.link(rough, p.inputs["Roughness"])
    nb.link(bump.outputs[0], p.inputs["Normal"])
    nb.link(bump.outputs[0], p.inputs["Coat Normal"])
    return mat


# -----------------------------------------------------------------------------
# 2. Vải (áo, mũ) — màu + vân dệt chéo (twill) rất nhẹ + sheen kiểu vải
# -----------------------------------------------------------------------------

def make_fabric(name, color, weave_scale=260.0, weave_strength=0.12, roughness=0.72, sheen=0.45):
    mat, nb = _new_material(name)
    coords = nb.object_coords(-1200, 0)
    # Vân chéo: Wave texture dạng BANDS hướng chéo + nhiễu nhỏ làm sợi vải không đều
    wave = nb.new("ShaderNodeTexWave", -900, 100)
    wave.wave_type = "BANDS"
    wave.bands_direction = "DIAGONAL"
    wave.inputs["Scale"].default_value = weave_scale
    wave.inputs["Distortion"].default_value = 1.5
    wave.inputs["Detail"].default_value = 1.0
    nb.link(coords, wave.inputs["Vector"])
    noise = nb.new("ShaderNodeTexNoise", -900, -150)
    noise.inputs["Scale"].default_value = 35.0
    noise.inputs["Detail"].default_value = 4.0
    nb.link(coords, noise.inputs["Vector"])
    height = nb.math("ADD", wave.outputs["Factor"], nb.math("MULTIPLY", noise.outputs["Factor"], 0.6, -700, -150), -500, 0)
    bump = nb.new("ShaderNodeBump", -300, 0)
    bump.inputs["Strength"].default_value = weave_strength
    bump.inputs["Distance"].default_value = 0.001
    nb.link(height, bump.inputs["Height"])
    # Màu hơi loang ±4% theo nhiễu lớn → vải không phẳng lì như nhựa
    var = nb.new("ShaderNodeMapRange", -500, 250)
    var.inputs[1].default_value, var.inputs[2].default_value = 0.3, 0.7
    var.inputs[3].default_value, var.inputs[4].default_value = 0.93, 1.05
    nb.link(noise.outputs["Factor"], var.inputs[0])
    tint = nb.new("ShaderNodeVectorMath", -300, 250)
    tint.operation = "SCALE"
    tint.inputs[0].default_value = color[:3]
    nb.link(var.outputs[0], tint.inputs["Scale"])
    p = nb.principled(Roughness=roughness, Sheen_Weight=sheen, Sheen_Roughness=0.5,
                      Sheen_Tint=(1, 1, 1, 1), Specular_IOR_Level=0.35,
                      Subsurface_Weight=0.03, Subsurface_Radius=(1, 1, 1), Subsurface_Scale=0.01)
    nb.link(tint.outputs[0], p.inputs["Base Color"])
    nb.link(bump.outputs[0], p.inputs["Normal"])
    return mat


# -----------------------------------------------------------------------------
# 3. Kim loại vàng (huy hiệu, cúc áo, sao, khoá thắt lưng, dây mũ)
# -----------------------------------------------------------------------------

def make_gold(name="M_Gold", color=(1.0, 0.70, 0.28), roughness=0.26, rope=False):
    mat, nb = _new_material(name)
    p = nb.principled(Base_Color=_rgba(color), Metallic=1.0, Roughness=roughness,
                      Coat_Weight=0.15, Coat_Roughness=0.1)
    if rope:
        # Dây thừng xoắn: vân sóng chéo → bump (dây vàng trên lưỡi trai mũ)
        coords = nb.object_coords(-900, -200)
        wave = nb.new("ShaderNodeTexWave", -600, -200)
        wave.wave_type = "BANDS"
        wave.bands_direction = "DIAGONAL"
        wave.inputs["Scale"].default_value = 70.0
        nb.link(coords, wave.inputs["Vector"])
        bump = nb.new("ShaderNodeBump", -300, -200)
        bump.inputs["Strength"].default_value = 0.6
        bump.inputs["Distance"].default_value = 0.004
        nb.link(wave.outputs["Factor"], bump.inputs["Height"])
        nb.link(bump.outputs[0], p.inputs["Normal"])
    return mat


def make_glossy(name, color, roughness=0.15, coat=1.0, coat_rough=0.04, sss=0.0, sss_radius=(1, 0.3, 0.2),
                bump_scale=0.0, bump_strength=0.0, specular=0.5):
    """Nhựa/da bóng: lưỡi trai mũ (đen bóng), mũi, lưỡi (hồng ướt), thắt lưng da."""
    mat, nb = _new_material(name)
    p = nb.principled(Base_Color=_rgba(color), Roughness=roughness, Coat_Weight=coat,
                      Coat_Roughness=coat_rough, Subsurface_Weight=sss, Subsurface_Radius=sss_radius,
                      Subsurface_Scale=0.03, Specular_IOR_Level=specular)
    if bump_scale > 0:
        coords = nb.object_coords(-900, -200)
        noise = nb.new("ShaderNodeTexNoise", -600, -200)
        noise.inputs["Scale"].default_value = bump_scale
        noise.inputs["Detail"].default_value = 6.0
        nb.link(coords, noise.inputs["Vector"])
        bump = nb.new("ShaderNodeBump", -300, -200)
        bump.inputs["Strength"].default_value = bump_strength
        bump.inputs["Distance"].default_value = 0.002
        nb.link(noise.outputs["Factor"], bump.inputs["Height"])
        nb.link(bump.outputs[0], p.inputs["Normal"])
    return mat


def make_satin(name, color, roughness=0.38, coat=0.35):
    """Bề mặt sơn satin cho miếng vá đỏ, cầu vai..."""
    return make_glossy(name, color, roughness=roughness, coat=coat, coat_rough=0.25, specular=0.45)


# -----------------------------------------------------------------------------
# 4. Mắt — vẽ bằng shader theo toạ độ CỤC BỘ của object mắt (x ngang, z dọc)
# -----------------------------------------------------------------------------

def make_eye(name, style, iris_color=(0.16, 0.05, 0.012), iris_radius=0.05, pupil_radius=0.03,
             catchlights=((-0.026, 0.034, 0.024), (0.028, -0.03, 0.011)), center=(0.0, 0.0)):
    """
    style:
        "black" : mắt đen bóng toàn phần (concept A, C) — có quầng nâu rất tối phía dưới cho "có chiều sâu".
        "iris"  : có tròng nâu + con ngươi đen (concept B).
    catchlights: list (x, z, bán kính) — đốm sáng "vẽ sẵn" (giống mắt sơn của đồ chơi vinyl),
                 cộng với phản chiếu THẬT của đèn/softbox qua lớp Coat bóng.
    Toạ độ: object mắt có trục X ngang, Z dọc, -Y hướng ra ngoài (xem corgi_builder.place_eye).
    """
    mat, nb = _new_material(name)
    coords = nb.object_coords(-1600, 0)
    sep = nb.new("ShaderNodeSeparateXYZ", -1400, 0)
    nb.link(coords, sep.inputs[0])

    def dist2d(cx, cz, x, y):
        dx = nb.math("SUBTRACT", sep.outputs["X"], cx, x, y)
        dz = nb.math("SUBTRACT", sep.outputs["Z"], cz, x, y - 60)
        dx2 = nb.math("MULTIPLY", dx, dx, x + 150, y)
        dz2 = nb.math("MULTIPLY", dz, dz, x + 150, y - 60)
        return nb.math("SQRT", nb.math("ADD", dx2, dz2, x + 300, y), 0.0, x + 450, y)

    def disc(r, soft, socket, x, y):
        return nb.smooth_mask(socket, r - soft, r + soft, x, y)

    cx, cz = center
    r = dist2d(cx, cz, -1200, 300)
    if style == "iris":
        # tròng: sáng ở giữa-dưới, viền tối; con ngươi đen
        ring = nb.new("ShaderNodeMapRange", -700, 400)
        ring.inputs[1].default_value = pupil_radius
        ring.inputs[2].default_value = iris_radius
        ring.inputs[3].default_value = 1.0
        ring.inputs[4].default_value = 0.0
        nb.link(r, ring.inputs[0])
        iris_inner = tuple(min(1.0, c * 2.6) for c in iris_color)
        iris_col = nb.mix_color(ring.outputs[0], _rgba(iris_color), _rgba(iris_inner), -500, 400)
        rim = disc(iris_radius, 0.002, r, -700, 200)            # 1 trong tròng, 0 ngoài
        col = nb.mix_color(rim, (0.012, 0.008, 0.006, 1), iris_col, -300, 300)
        pupil = disc(pupil_radius, 0.0015, r, -700, 0)
        col = nb.mix_color(pupil, col, (0.004, 0.003, 0.003, 1), -100, 300)
    else:
        # mắt đen: quầng nâu rất tối ở nửa dưới (giả độ sâu tròng mắt)
        glow_c = dist2d(cx + 0.01, cz - 0.04, -1200, -300)
        glow = nb.smooth_mask(glow_c, iris_radius * 0.15, iris_radius * 0.8, -700, -300)
        col = nb.mix_color(glow, (0.006, 0.005, 0.005, 1), _rgba(iris_color), -300, 300)

    # Đốm sáng (catchlight) vẽ sẵn: trắng, hơi phát sáng để luôn rõ ở 32 px
    emit = None
    for i, (lx, lz, lr) in enumerate(catchlights):
        d = dist2d(lx + cx, lz + cz, -1200, -700 - i * 300)
        m = disc(lr, 0.0015, d, -700, -700 - i * 300)
        col = nb.mix_color(m, col, (0.95, 0.95, 0.95, 1), 100, 200 - i * 100)
        emit = m if emit is None else nb.math("MAXIMUM", emit, m, 100, -700 - i * 300)

    p = nb.principled(Roughness=0.12, Coat_Weight=1.0, Coat_Roughness=0.02, Specular_IOR_Level=0.6,
                      Emission_Color=(1, 1, 1, 1))
    nb.link(col, p.inputs["Base Color"])
    if emit is not None:
        strength = nb.math("MULTIPLY", emit, 0.6, 300, -700)
        nb.link(strength, p.inputs["Emission Strength"])
    # QUAN TRỌNG cho tốc độ: không coi mắt là "nguồn sáng". Nếu để mặc định (Auto), Cycles biến MỖI tam
    # giác của mắt thành 1 đèn nhỏ và phải dựng "cây đèn" (light tree) cho hàng trăm nghìn tam giác
    # → mỗi lần đổi cảnh mất thêm ~1 phút. Đốm sáng vẫn hiện bình thường khi camera nhìn thấy.
    _no_emission_sampling(mat)
    return mat


def _no_emission_sampling(mat):
    for owner in (mat, getattr(mat, "cycles", None)):
        if owner is not None and hasattr(owner, "emission_sampling"):
            owner.emission_sampling = "NONE"
            return True
    print(f"[materials] không tìm thấy emission_sampling cho {mat.name}")
    return False


def assign(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)
