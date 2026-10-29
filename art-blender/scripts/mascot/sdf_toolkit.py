"""
sdf_toolkit.py — "Đất nặn kỹ thuật số": dựng hình hữu cơ bằng SDF rồi biến thành lưới (mesh) sạch.

Ý TƯỞNG (đọc kỹ phần này trước khi đọc code):
    SDF = Signed Distance Field = "trường khoảng cách có dấu".
    Với mỗi điểm p trong không gian, hàm sdf(p) trả về:
        < 0  nếu p nằm TRONG vật thể,
        = 0  nếu p nằm ĐÚNG trên bề mặt,
        > 0  nếu p nằm NGOÀI (giá trị ≈ khoảng cách tới bề mặt).

    Vì sao dùng SDF thay vì ghép khối cầu/khối hộp?
        - Phép "hợp mềm" (smooth union) làm các khối CHẢY vào nhau như đất sét được miết tay
          (giống metaball / voxel remesh trong Blender) → không có đường nối cứng, không "lắp ghép".
        - Phép "trừ mềm" (smooth subtraction) khoét hốc mắt, miệng, rãnh ngón chân... có mép bo tròn.
        - Lớp vải (áo) = bề mặt thân "nở" thêm vài mm → áo ôm sát người như shrinkwrap, rồi
          cộng thêm hàm nếp gấp (folds) để vải mềm.
        - Đổi tư thế (giơ tay chào) chỉ là đổi toạ độ khớp → toàn bộ thân, áo, màu lông đi theo.

    Cách biến SDF thành lưới:  thuật toán "Surface Nets" (anh em của Marching Cubes).
        1) Lấy mẫu sdf trên lưới ô vuông 3D (voxel), bước h (vd 6 mm).
        2) Ô (cell) nào có góc trong + góc ngoài → bề mặt đi qua ô đó → đặt 1 đỉnh trong ô.
        3) Mỗi cạnh lưới bị bề mặt cắt qua → nối 4 ô quanh cạnh thành 1 mặt TỨ GIÁC (quad).
        → Lưới toàn quad, đều đặn: rất hợp với modifier Subdivision Surface.
        4) "Chiếu" từng đỉnh lên đúng mặt sdf=0 (bước Newton) rồi "thả lỏng" (relax) cho quad đều.

CÁC THÀNH PHẦN CHÍNH:
    Primitive (hình cơ bản): Sphere, Ellipsoid, RoundCone (viên nhộng 2 đầu to nhỏ khác nhau),
                             RoundBox, Torus, Lambda (hàm tuỳ ý).
    Model: một "ngăn xếp điêu khắc" — danh sách thao tác (union / subtract / intersect / displace...)
           áp lần lượt, giống các bước nặn đất.
    mesh_from_sdf(): Model → (đỉnh, mặt) numpy → object Blender.

Đơn vị: mét. Trục: X sang phải (của người xem), -Y hướng về camera (mặt nhân vật), Z hướng lên.
Tất cả hàm khoảng cách nhận mảng điểm P có shape (N, 3) và trả về mảng (N,).
"""

import math
import time

import numpy as np


# =============================================================================
# 1. Toán phụ trợ
# =============================================================================

def _v(x):
    """Chuyển tuple/list → mảng numpy float64."""
    return np.asarray(x, dtype=np.float64)


def rotation_matrix(rx=0.0, ry=0.0, rz=0.0):
    """Ma trận xoay từ 3 góc Euler (độ), thứ tự X → Y → Z (giống Blender 'XYZ')."""
    ax, ay, az = (math.radians(a) for a in (rx, ry, rz))
    cx, sx, cy, sy, cz, sz = math.cos(ax), math.sin(ax), math.cos(ay), math.sin(ay), math.cos(az), math.sin(az)
    mx = np.array([[1, 0, 0], [0, cx, -sx], [0, sx, cx]])
    my = np.array([[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]])
    mz = np.array([[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]])
    return mz @ my @ mx


def frame_from_axes(forward, up_hint=(0, 0, 1)):
    """
    Tạo ma trận xoay 3x3 có cột = (trục X, trục Y, trục Z) cục bộ, sao cho
    trục -Y cục bộ trỏ theo `forward` (giống quy ước "mặt nhìn về -Y").
    Dùng để đặt mắt/mũi/lưỡi... "dán" theo pháp tuyến bề mặt.
    """
    f = _v(forward) / np.linalg.norm(forward)
    y_axis = -f
    z_axis = _v(up_hint) - np.dot(up_hint, y_axis) * y_axis
    z_axis /= np.linalg.norm(z_axis)
    x_axis = np.cross(y_axis, z_axis)
    return np.stack([x_axis, y_axis, z_axis], axis=1)


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def smin(a, b, k):
    """Hợp MỀM (smooth union) — polynomial smooth-min của Inigo Quilez. k = bán kính bo (m)."""
    if k <= 0:
        return np.minimum(a, b)
    h = np.maximum(k - np.abs(a - b), 0.0) / k
    return np.minimum(a, b) - h * h * k * 0.25


def smax(a, b, k):
    """Giao MỀM / trừ mềm dùng hàm này: smax(a, -b, k) = lấy a khoét đi b, mép bo k."""
    return -smin(-a, -b, k)


# =============================================================================
# 2. Hình cơ bản (primitive). Mỗi hình có .bbox (min, max) và .dist(P)
#    bbox dùng để "bỏ qua" điểm ở xa → tính nhanh hơn rất nhiều.
# =============================================================================

class Primitive:
    bbox = None  # (np.array(3), np.array(3))

    def dist(self, P):
        raise NotImplementedError

    def gradient(self, P, eps=1e-3, f0=None):
        """
        Hướng pháp tuyến (chưa chuẩn hoá) bằng sai phân.
        Nếu có f0 = dist(P) sẵn → dùng sai phân TIẾN (3 lần tính thay vì 6) cho nhanh.
        """
        P = np.asarray(P, dtype=np.float64)
        g = np.zeros_like(P)
        for axis in range(3):
            d = np.zeros(3)
            d[axis] = eps
            if f0 is None:
                g[:, axis] = (self.dist(P + d) - self.dist(P - d)) / (2 * eps)
            else:
                g[:, axis] = (self.dist(P + d) - f0) / eps
        return g


class Ellipsoid(Primitive):
    """Elip-xô-ít (quả trứng/quả cầu dẹt). radii = (rx, ry, rz) theo trục cục bộ; rot = ma trận 3x3."""

    def __init__(self, center, radii, rot=None):
        self.c, self.r = _v(center), _v(radii)
        self.R = np.eye(3) if rot is None else _v(rot)
        m = float(np.max(self.r))
        self.bbox = (self.c - m, self.c + m)

    def dist(self, P):
        q = (P - self.c) @ self.R          # đổi sang hệ toạ độ cục bộ (R trực giao → R^T = nghịch đảo)
        k0 = np.linalg.norm(q / self.r, axis=1)
        k1 = np.linalg.norm(q / (self.r * self.r), axis=1)
        # ngay tâm elip công thức thành 0/0 → trả về "sâu bên trong" (-bán kính nhỏ nhất)
        return np.where(k1 < 1e-9, -float(np.min(self.r)), k0 * (k0 - 1.0) / np.maximum(k1, 1e-9))


def Sphere(center, radius):
    return Ellipsoid(center, (radius, radius, radius))


class RoundCone(Primitive):
    """
    "Viên nhộng côn": đoạn thẳng a→b, bán kính ra ở a, rb ở b (IQ sdRoundCone — chính xác).
    Dùng cho tay, chân, tai, lưỡi... ra = rb thì thành viên nhộng (capsule) thường.
    """

    def __init__(self, a, b, ra, rb):
        self.a, self.b, self.ra, self.rb = _v(a), _v(b), float(ra), float(rb)
        m = max(ra, rb)
        self.bbox = (np.minimum(self.a, self.b) - m, np.maximum(self.a, self.b) + m)

    def dist(self, P):
        a, b, r1, r2 = self.a, self.b, self.ra, self.rb
        ba = b - a
        l2 = float(ba @ ba)
        rr = r1 - r2
        a2 = l2 - rr * rr
        il2 = 1.0 / l2
        pa = P - a
        y = pa @ ba
        z = y - l2
        xv = pa * l2 - y[:, None] * ba
        x2 = np.einsum("ij,ij->i", xv, xv)
        y2 = y * y * l2
        z2 = z * z * l2
        k = math.copysign(1.0, rr) * rr * rr * x2
        out = (np.sqrt(x2 * a2 * il2) + y * rr) * il2 - r1   # mặc định: phần thân côn
        m1 = (np.sign(z) * a2 * z2) > k                       # gần đầu b
        m2 = (np.sign(y) * a2 * y2) < k                       # gần đầu a
        out = np.where(m1, np.sqrt(x2 + z2) * il2 - r2, out)
        out = np.where(m2 & ~m1, np.sqrt(x2 + y2) * il2 - r1, out)
        return out


def Capsule(a, b, r):
    return RoundCone(a, b, r, r)


class RoundBox(Primitive):
    """Hộp bo góc. half = nửa kích thước (hx, hy, hz); radius = bán kính bo."""

    def __init__(self, center, half, radius=0.0, rot=None):
        self.c, self.h, self.rad = _v(center), _v(half), float(radius)
        self.R = np.eye(3) if rot is None else _v(rot)
        m = float(np.linalg.norm(self.h)) + self.rad
        self.bbox = (self.c - m, self.c + m)

    def dist(self, P):
        q = np.abs((P - self.c) @ self.R) - (self.h - self.rad)
        outside = np.linalg.norm(np.maximum(q, 0.0), axis=1)
        inside = np.minimum(np.max(q, axis=1), 0.0)
        return outside + inside - self.rad


class Torus(Primitive):
    """Hình xuyến (bánh donut) nằm trong mặt phẳng XY cục bộ. R = bán kính lớn, r = bán kính ống."""

    def __init__(self, center, R, r, rot=None, scale_xy=(1.0, 1.0)):
        self.c, self.Rr, self.r = _v(center), float(R), float(r)
        self.R = np.eye(3) if rot is None else _v(rot)
        self.sxy = _v(scale_xy)
        m = R * max(scale_xy) + r
        self.bbox = (self.c - m, self.c + m)

    def dist(self, P):
        q = (P - self.c) @ self.R
        qx, qy = q[:, 0] / self.sxy[0], q[:, 1] / self.sxy[1]
        ring = np.sqrt(qx * qx + qy * qy) - self.Rr
        return np.sqrt(ring * ring + q[:, 2] ** 2) - self.r


class Lambda(Primitive):
    """Hình tuỳ ý: truyền vào hàm fn(P)->(N,) và bbox. Dùng cho ngôi sao, vỏ áo, miếng vá..."""

    def __init__(self, fn, bbox_min, bbox_max):
        self.fn = fn
        self.bbox = (_v(bbox_min), _v(bbox_max))

    def dist(self, P):
        return self.fn(P)


class Transformed(Primitive):
    """
    Đặt một hình (thiết kế ở hệ toạ độ CỤC BỘ) vào thế giới bằng phép dời + xoay (không méo).
    origin = vị trí gốc cục bộ trong thế giới; R = ma trận xoay (cột = trục cục bộ trong thế giới).
    Dùng cho: cả cái đầu (nghiêng đầu khi chào), mũ, mắt...
    """

    def __init__(self, prim, origin, R):
        self.prim, self.o, self.R = prim, _v(origin), _v(R)
        lo, hi = prim.bbox
        corners = np.array([[x, y, z] for x in (lo[0], hi[0]) for y in (lo[1], hi[1]) for z in (lo[2], hi[2])])
        world = corners @ self.R.T + self.o
        self.bbox = (world.min(axis=0), world.max(axis=0))

    def dist(self, P):
        return self.prim.dist((P - self.o) @ self.R)


class FlatRoundCone(Primitive):
    """
    Viên nhộng côn bị ÉP DẸT theo một hướng — dùng cho TAI (lá tai dày ~ vài cm) và LƯỠI.
        base, tip   : hai đầu
        r_base, r_tip: bán kính hai đầu (theo bề NGANG của lá tai)
        facing      : hướng mặt trước của lá (pháp tuyến của "tấm" dẹt)
        thickness   : tỉ lệ ép dẹt (0.4 = dày bằng 40% bề ngang)
    Khoảng cách được nhân với `thickness` → luôn "an toàn" (không vượt quá khoảng cách thật).
    """

    def __init__(self, base, tip, r_base, r_tip, facing, thickness):
        self.base, self.tip = _v(base), _v(tip)
        w = self.tip - self.base
        self.L = float(np.linalg.norm(w))
        w /= self.L
        f = _v(facing) - np.dot(facing, w) * w
        f /= np.linalg.norm(f)
        u = np.cross(f, w)
        self.R = np.stack([u, f, w], axis=1)    # cột: ngang, mặt trước, dọc
        self.th = float(thickness)
        self.cone = RoundCone((0, 0, 0), (0, 0, self.L), r_base, r_tip)
        m = max(r_base, r_tip)
        self.bbox = (np.minimum(self.base, self.tip) - m, np.maximum(self.base, self.tip) + m)

    def dist(self, P):
        q = (P - self.base) @ self.R
        q[:, 1] /= self.th
        return self.cone.dist(q) * self.th


# --- Hình 2D (dùng để "đùn" thành 3D: ngôi sao, miếng cầu vai, ve áo...) ----------------------

def sd2_star5(px, py, r, rf):
    """Ngôi sao 5 cánh 2D (IQ sdStar5). r = bán kính đỉnh, rf (0..1) = độ "béo" của cánh."""
    k1x, k1y = 0.809016994375, -0.587785252292
    k2x, k2y = -k1x, k1y
    px = np.abs(px)
    d1 = np.maximum(k1x * px + k1y * py, 0.0)
    px, py = px - 2.0 * d1 * k1x, py - 2.0 * d1 * k1y
    d2 = np.maximum(k2x * px + k2y * py, 0.0)
    px, py = px - 2.0 * d2 * k2x, py - 2.0 * d2 * k2y
    px = np.abs(px)
    py = py - r
    bax, bay = rf * (-k1y) - 0.0, rf * k1x - 1.0
    h = np.clip((px * bax + py * bay) / (bax * bax + bay * bay), 0.0, r)
    dx, dy = px - bax * h, py - bay * h
    return np.sqrt(dx * dx + dy * dy) * np.sign(py * bax - px * bay)


def sd2_polygon(px, py, verts):
    """Đa giác 2D lồi/lõm bất kỳ (IQ sdPolygon). verts = [(x, y), ...] theo thứ tự."""
    v = np.asarray(verts, dtype=np.float64)
    d = (px - v[0, 0]) ** 2 + (py - v[0, 1]) ** 2
    s = np.ones_like(px)
    n = len(v)
    j = n - 1
    for i in range(n):
        ex, ey = v[j, 0] - v[i, 0], v[j, 1] - v[i, 1]
        wx, wy = px - v[i, 0], py - v[i, 1]
        t = np.clip((wx * ex + wy * ey) / (ex * ex + ey * ey), 0.0, 1.0)
        bx, by = wx - ex * t, wy - ey * t
        d = np.minimum(d, bx * bx + by * by)
        c1 = py >= v[i, 1]
        c2 = py < v[j, 1]
        c3 = ex * wy > ey * wx
        flip = (c1 & c2 & c3) | (~c1 & ~c2 & ~c3)
        s = np.where(flip, -s, s)
        j = i
    return s * np.sqrt(d)


def sd2_ellipse_approx(px, py, rx, ry):
    """Elip 2D (xấp xỉ, đủ tốt gần biên)."""
    k0 = np.sqrt((px / rx) ** 2 + (py / ry) ** 2)
    k1 = np.sqrt((px / rx ** 2) ** 2 + (py / ry ** 2) ** 2)
    return k0 * (k0 - 1.0) / np.maximum(k1, 1e-9)


def sd2_polyline(px, py, pts):
    """Khoảng cách 2D (không dấu) tới đường gấp khúc qua các điểm pts = [(x, y), ...] (vd đường miệng chữ w)."""
    v = np.asarray(pts, dtype=np.float64)
    d = np.full(px.shape, 1e3)
    for (ax, ay), (bx, by) in zip(v[:-1], v[1:]):
        ex, ey = bx - ax, by - ay
        wx, wy = px - ax, py - ay
        t = np.clip((wx * ex + wy * ey) / (ex * ex + ey * ey), 0.0, 1.0)
        d = np.minimum(d, np.hypot(wx - ex * t, wy - ey * t))
    return d


def sd2_vesica(px, py, half_length, half_width):
    """
    Hình "hạt hạnh nhân" (vesica) = giao của 2 hình tròn. Dùng cho mắt hạnh nhân (concept B).
    Trục dài nằm theo X: hai mũi nhọn ở (±half_length, 0); bề dày lớn nhất = 2*half_width.
    (IQ sdVesica, đã đổi trục cho mắt nằm ngang.)
    """
    L, W = half_length, half_width
    r = 0.5 * (W + L * L / W)        # bán kính 2 hình tròn
    d = 0.5 * (L * L / W - W)        # tâm 2 hình tròn ở (0, ±d)
    qx, qy = np.abs(py), np.abs(px)  # đổi trục: công thức gốc có trục dài theo Y
    b = math.sqrt(r * r - d * d)     # = L
    tip = (qy - b) * d > qx * b
    dist_tip = np.sqrt(qx * qx + (qy - b) ** 2)
    dist_arc = np.sqrt((qx + d) ** 2 + qy * qy) - r
    return np.where(tip, dist_tip, dist_arc)


# =============================================================================
# 3. Model — "ngăn xếp điêu khắc"
# =============================================================================

CULL_MARGIN = 0.08   # m — vùng đệm quanh bbox của mỗi hình khi "bỏ qua điểm ở xa"


class Model(Primitive):
    """
    Một chuỗi thao tác áp lên trường khoảng cách D (ban đầu = +∞, tức "không có gì").

        m = Model("than")
        m.union(Ellipsoid(...), k=0.08)      # đắp thêm đất, miết mép bo 8 cm
        m.subtract(Sphere(...), k=0.02)      # khoét hốc, mép bo 2 cm
        m.intersect(prim, k)                 # chỉ giữ phần giao
        m.displace(fn, bbox)                 # cộng thêm "nếp" (fn trả về độ lồi/lõm, m)
        m.offset(t)                          # nở đều t mét (dùng cho vải/vỏ)

    Model cũng là một Primitive → có thể lồng Model này vào Model khác.
    """

    def __init__(self, name="model"):
        self.name = name
        self.ops = []          # list of (kind, prim_or_fn, k, bbox)
        self.bbox = None

    def _grow_bbox(self, bb, margin=0.0):
        lo, hi = _v(bb[0]) - margin, _v(bb[1]) + margin
        if self.bbox is None:
            self.bbox = (lo, hi)
        else:
            self.bbox = (np.minimum(self.bbox[0], lo), np.maximum(self.bbox[1], hi))

    def union(self, prim, k=0.0):
        self.ops.append(("union", prim, k, prim.bbox))
        self._grow_bbox(prim.bbox, k)
        return self

    def subtract(self, prim, k=0.0):
        self.ops.append(("subtract", prim, k, prim.bbox))
        return self

    def intersect(self, prim, k=0.0):
        self.ops.append(("intersect", prim, k, None))   # giao ảnh hưởng MỌI điểm → không cắt bbox
        return self

    def displace(self, fn, bbox_min, bbox_max):
        self.ops.append(("displace", fn, 0.0, (_v(bbox_min), _v(bbox_max))))
        return self

    def offset(self, t):
        self.ops.append(("offset", None, t, None))
        if self.bbox is not None and t > 0:
            self.bbox = (self.bbox[0] - t, self.bbox[1] + t)
        return self

    # ---- đánh giá trường khoảng cách tại các điểm P (N,3) ----
    def dist(self, P):
        P = np.asarray(P, dtype=np.float64)
        D = np.full(len(P), 1e3)
        for kind, prim, k, bb in self.ops:
            if kind == "offset":
                D = D - k
                continue
            if kind == "intersect":
                D = smax(D, prim.dist(P), k)
                continue
            # Chỉ tính ở các điểm nằm trong bbox (nở thêm k + CULL_MARGIN) → nhanh hơn nhiều.
            # Điểm ở xa giữ giá trị 1000 ("rất xa"); CULL_MARGIN phải ≥ đường chéo ô lưới THÔ
            # để mọi nút thô gần bề mặt đều được tính chính xác (xem sample_grid).
            margin = k + CULL_MARGIN
            lo, hi = bb[0] - margin, bb[1] + margin
            sel = np.all((P >= lo) & (P <= hi), axis=1)
            if not sel.any():
                continue
            idx = np.nonzero(sel)[0]
            Ps = P[idx]
            if kind == "union":
                D[idx] = smin(D[idx], prim.dist(Ps), k)
            elif kind == "subtract":
                D[idx] = smax(D[idx], -prim.dist(Ps), k)
            elif kind == "displace":
                D[idx] = D[idx] - prim(Ps)
        return D



# =============================================================================
# 4. Lấy mẫu trên lưới + Surface Nets
# =============================================================================

def _eval_points(sdf, P, chunk=1_500_000):
    out = np.empty(len(P), dtype=np.float32)
    for i in range(0, len(P), chunk):
        out[i:i + chunk] = sdf.dist(P[i:i + chunk])
    return out


def sample_grid(sdf, bbox_min, bbox_max, h, coarse=4, verbose=True):
    """
    Tính sdf trên lưới đều bước h trong hộp [bbox_min, bbox_max]. Trả về (F, origin).

    TĂNG TỐC "THÔ → MỊN" (coarse-to-fine):
        1) Tính trên lưới THÔ (bước coarse*h) — rẻ.
        2) Chỉ những ô thô nằm GẦN bề mặt (|d| nhỏ) mới tính lại chính xác trên lưới MỊN.
        3) Ô thô ở xa bề mặt: mọi điểm mịn bên trong cùng dấu (cùng trong/ngoài) → lấy giá trị thô.
    Bề mặt chỉ cần giá trị chính xác ở sát nó, nên kết quả giống hệt cách tính toàn bộ nhưng nhanh ~10 lần.
    """
    t0 = time.perf_counter()
    lo = _v(bbox_min) - 2 * h
    hi = _v(bbox_max) + 2 * h
    n = np.ceil((hi - lo) / h).astype(int) + 1
    H = coarse * h
    nc = (n - 1 + coarse - 1) // coarse + 1                   # số nút thô (phủ hết lưới mịn)
    axes_c = [lo[i] + H * np.arange(nc[i]) for i in range(3)]
    Xc, Yc, Zc = np.meshgrid(*axes_c, indexing="ij")
    Fc = _eval_points(sdf, np.stack([Xc.ravel(), Yc.ravel(), Zc.ravel()], axis=1)).reshape(tuple(nc))
    del Xc, Yc, Zc

    # ô thô "hoạt động": có góc nằm gần bề mặt (ngưỡng an toàn = 2 × đường chéo ô)
    thr = 1.3 * math.sqrt(3.0) * H
    near = np.abs(Fc) < thr
    cell_active = np.zeros(tuple(nc - 1), dtype=bool)
    for dx in (0, 1):
        for dy in (0, 1):
            for dz in (0, 1):
                cell_active |= near[dx:nc[0] - 1 + dx, dy:nc[1] - 1 + dy, dz:nc[2] - 1 + dz]

    # lưới mịn: mặc định lấy giá trị nút thô gần nhất (đúng dấu ở vùng xa bề mặt)
    F = np.repeat(np.repeat(np.repeat(Fc, coarse, 0), coarse, 1), coarse, 2)[:n[0], :n[1], :n[2]].astype(np.float32)
    # đánh dấu các nút mịn thuộc ô thô hoạt động (kể cả nút biên phía +)
    cells_f = np.repeat(np.repeat(np.repeat(cell_active, coarse, 0), coarse, 1), coarse, 2)
    mask = np.zeros(tuple(n), dtype=bool)
    m0 = np.zeros(tuple(n), dtype=bool)
    s0, s1, s2 = (min(n[i], cells_f.shape[i]) for i in range(3))
    m0[:s0, :s1, :s2] = cells_f[:s0, :s1, :s2]
    for dx in (0, 1):
        for dy in (0, 1):
            for dz in (0, 1):
                sub = m0[:n[0] - dx, :n[1] - dy, :n[2] - dz]
                mask[dx:, dy:, dz:] |= sub
    idx = np.nonzero(mask)
    P = np.stack([lo[0] + h * idx[0], lo[1] + h * idx[1], lo[2] + h * idx[2]], axis=1)
    F[idx] = _eval_points(sdf, P)
    # Biên ngoài cùng luôn "ngoài" để bề mặt khép kín.
    F[0, :, :] = F[-1, :, :] = abs(h)
    F[:, 0, :] = F[:, -1, :] = abs(h)
    F[:, :, 0] = F[:, :, -1] = abs(h)
    if verbose:
        print(f"[sdf] lưới {n[0]}x{n[1]}x{n[2]} = {F.size/1e6:.1f}M điểm "
              f"(tính chính xác {len(P)/1e6:.2f}M), {time.perf_counter()-t0:.1f}s")
    return F, lo


def surface_nets(F, origin, h):
    """
    Surface Nets: lưới mẫu F → (verts (V,3), quads (Q,4)).
    Mỗi ô có bề mặt đi qua sinh 1 đỉnh = trung bình các điểm cắt trên các cạnh của ô.
    Mỗi cạnh lưới bị cắt sinh 1 quad nối 4 ô xung quanh cạnh đó.
    """
    nx, ny, nz = F.shape
    inside = F < 0
    cx, cy, cz = nx - 1, ny - 1, nz - 1           # số ô theo mỗi trục
    acc = np.zeros((cx * cy * cz, 3), dtype=np.float64)
    cnt = np.zeros(cx * cy * cz, dtype=np.int32)
    edge_lists = []

    def cell_id(i, j, k):
        return (i * cy + j) * cz + k

    for axis in range(3):
        sl0 = [slice(None)] * 3
        sl1 = [slice(None)] * 3
        sl0[axis] = slice(0, -1)
        sl1[axis] = slice(1, None)
        f0 = F[tuple(sl0)]
        f1 = F[tuple(sl1)]
        cross = inside[tuple(sl0)] != inside[tuple(sl1)]
        ii, jj, kk = np.nonzero(cross)
        a, b = f0[ii, jj, kk].astype(np.float64), f1[ii, jj, kk].astype(np.float64)
        t = a / (a - b)
        pos = np.stack([ii, jj, kk], axis=1).astype(np.float64)
        pos[:, axis] += t
        # 4 ô kề cạnh: dịch -1/0 theo 2 trục còn lại
        # 2 trục còn lại theo thứ tự VÒNG (y,z) / (z,x) / (x,y) → quad luôn quay pháp tuyến ra +axis
        # (nếu dùng (x,z) cho trục y thì mặt bị lật ngược → bóng đổ loang vằn như vân gỗ).
        o1, o2 = (axis + 1) % 3, (axis + 2) % 3
        idx = np.stack([ii, jj, kk], axis=1)
        cells4 = []
        valid = np.ones(len(ii), dtype=bool)
        for d1, d2 in ((-1, -1), (0, -1), (0, 0), (-1, 0)):
            c = idx.copy()
            c[:, o1] += d1
            c[:, o2] += d2
            ok = (c[:, 0] >= 0) & (c[:, 0] < cx) & (c[:, 1] >= 0) & (c[:, 1] < cy) & (c[:, 2] >= 0) & (c[:, 2] < cz)
            valid &= ok
            cells4.append(c)
        for c in cells4:
            ok = (c[:, 0] >= 0) & (c[:, 0] < cx) & (c[:, 1] >= 0) & (c[:, 1] < cy) & (c[:, 2] >= 0) & (c[:, 2] < cz)
            cid = cell_id(c[ok, 0], c[ok, 1], c[ok, 2])
            for ax in range(3):
                acc[:, ax] += np.bincount(cid, weights=pos[ok, ax], minlength=len(cnt))
            cnt += np.bincount(cid, minlength=len(cnt)).astype(np.int32)
        quads = np.stack([cell_id(c[:, 0], c[:, 1], c[:, 2]) for c in cells4], axis=1)[valid]
        flip = ~(a[valid] < 0)            # điểm đầu cạnh ở NGOÀI → đảo chiều quad
        quads[flip] = quads[flip][:, ::-1]
        edge_lists.append(quads)

    active = cnt > 0
    remap = -np.ones(len(cnt), dtype=np.int64)
    remap[active] = np.arange(int(active.sum()))
    verts = acc[active] / cnt[active, None]
    verts = origin + verts * h
    quads = remap[np.concatenate(edge_lists, axis=0)]
    return verts, quads


def _vertex_neighbors_mean(verts, quads):
    """Trung bình vị trí các đỉnh kề (qua cạnh của quad) — dùng cho bước thả lỏng (relax)."""
    e = np.concatenate([quads[:, [0, 1]], quads[:, [1, 2]], quads[:, [2, 3]], quads[:, [3, 0]]], axis=0)
    e = np.concatenate([e, e[:, ::-1]], axis=0)
    n = len(verts)
    s = np.zeros_like(verts)
    for ax in range(3):
        s[:, ax] = np.bincount(e[:, 0], weights=verts[e[:, 1], ax], minlength=n)
    c = np.bincount(e[:, 0], minlength=n).astype(np.float64)
    return s / np.maximum(c, 1)[:, None]


def project_and_relax(verts, quads, sdf, h, project_iters=3, relax_iters=3, relax_strength=0.5):
    """
    1) Chiếu đỉnh lên đúng bề mặt sdf = 0 bằng bước Newton: p ← p − d·∇d/|∇d|².
    2) Thả lỏng theo phương TIẾP TUYẾN (không làm co hình) để quad đều nhau, rồi chiếu lại.
    """
    P = verts.copy()
    eps = h * 0.25
    state = {"g": None}

    def project(P, iters):
        for _ in range(iters):
            d = sdf.dist(P)
            g = sdf.gradient(P, eps, f0=d)
            state["g"] = g
            g2 = np.maximum(np.einsum("ij,ij->i", g, g), 1e-12)
            step = (d / g2)[:, None] * g
            # Giới hạn bước tối đa = 1 ô lưới (tránh nhảy sang bề mặt khác ở chỗ hẹp).
            sn = np.linalg.norm(step, axis=1)
            scale = np.minimum(1.0, h / np.maximum(sn, 1e-12))
            P = P - step * scale[:, None]
        return P

    P = project(P, project_iters)
    for _ in range(relax_iters):
        avg = _vertex_neighbors_mean(P, quads)
        g = state["g"]
        nrm = g / np.maximum(np.linalg.norm(g, axis=1), 1e-12)[:, None]
        delta = avg - P
        delta -= np.einsum("ij,ij->i", delta, nrm)[:, None] * nrm   # bỏ thành phần pháp tuyến
        P = P + relax_strength * delta
        P = project(P, 2)
    return P


VOXEL_SCALE = 1.0   # >1 = lưới thưa hơn (bản nháp nhanh). Script chính đặt 1.5 khi chạy --draft.

# Modifier Subdivision Surface: TẮT mặc định. Đã thử A/B ở ảnh 1024 px: lưới Surface Nets đã đủ dày + được
# chiếu đúng lên bề mặt nên ảnh gần như giống hệt, trong khi Subdivision làm bước "đồng bộ dữ liệu" của
# Cycles chậm thêm ~90 giây mỗi tư thế (3.5 s → 90 s). Bật lại (True) nếu cần render cận cảnh rất to.
USE_SUBDIVISION = False


def mesh_from_sdf(sdf, h, bbox=None, project_iters=3, relax_iters=3, verbose=True):
    """Toàn bộ quy trình: SDF → lưới mẫu → Surface Nets → chiếu + thả lỏng. Trả về (verts, quads)."""
    t0 = time.perf_counter()
    h = h * VOXEL_SCALE
    bb = bbox if bbox is not None else sdf.bbox
    F, origin = sample_grid(sdf, bb[0], bb[1], h, verbose=verbose)
    verts, quads = surface_nets(F, origin, h)
    del F
    verts = project_and_relax(verts, quads, sdf, h, project_iters, relax_iters)
    if verbose:
        print(f"[sdf] {getattr(sdf, 'name', 'sdf')}: {len(verts)} đỉnh, {len(quads)} quad, "
              f"{time.perf_counter()-t0:.1f}s")
    return verts, quads


# =============================================================================
# 5. Đưa vào Blender
# =============================================================================

def to_blender_object(name, verts, quads, collection=None, subdiv_levels=(1, 2), smooth=True):
    """
    Tạo object Blender từ verts/quads numpy, bật shade smooth và thêm modifier Subdivision Surface.
    subdiv_levels = (level ở viewport, level khi render).
    """
    import bpy

    mesh = bpy.data.meshes.new(name)
    nv, nq = len(verts), len(quads)
    mesh.vertices.add(nv)
    mesh.vertices.foreach_set("co", verts.astype(np.float32).ravel())
    mesh.loops.add(nq * 4)
    mesh.loops.foreach_set("vertex_index", quads.astype(np.int32).ravel())
    mesh.polygons.add(nq)
    mesh.polygons.foreach_set("loop_start", (np.arange(nq, dtype=np.int32) * 4))
    mesh.update(calc_edges=True)
    mesh.validate(clean_customdata=False)
    if smooth:
        mesh.shade_smooth()
    obj = bpy.data.objects.new(name, mesh)
    (collection or bpy.context.scene.collection).objects.link(obj)
    if USE_SUBDIVISION and subdiv_levels and subdiv_levels[1] > 0:
        mod = obj.modifiers.new("Subdivision", "SUBSURF")
        mod.levels, mod.render_levels = subdiv_levels
        mod.quality = 3
    return obj


def add_point_attribute(obj, name, values):
    """Ghi một thuộc tính số thực cho từng đỉnh (đọc trong shader bằng node Attribute)."""
    mesh = obj.data
    attr = mesh.attributes.get(name) or mesh.attributes.new(name, "FLOAT", "POINT")
    attr.data.foreach_set("value", np.asarray(values, dtype=np.float32))
    return attr


def add_point_vector_attribute(obj, name, values):
    """Thuộc tính vector 3 thành phần cho từng đỉnh (vd toạ độ 'tem' của mắt)."""
    mesh = obj.data
    attr = mesh.attributes.get(name) or mesh.attributes.new(name, "FLOAT_VECTOR", "POINT")
    attr.data.foreach_set("vector", np.asarray(values, dtype=np.float32).ravel())
    return attr


def object_vertices_world(obj):
    """Toạ độ các đỉnh (trước Subdivision) dạng numpy (V,3)."""
    co = np.empty(len(obj.data.vertices) * 3, dtype=np.float32)
    obj.data.vertices.foreach_get("co", co)
    return co.reshape(-1, 3).astype(np.float64)


def sphere_trace(sdf, origin, direction, max_dist=3.0, steps=600, eps=1e-4, max_step=0.03):
    """
    Bắn tia từ origin (phải ở NGOÀI vật) theo direction tới khi chạm bề mặt sdf.
    Trả về (điểm chạm, pháp tuyến). Dùng để đặt mắt/mũi/cúc áo... đúng lên bề mặt.
    max_step: bước tối đa — vì ngoài vùng bbox, Model trả về khoảng cách "giả" rất lớn (1000).
    """
    o = _v(origin)
    d = _v(direction) / np.linalg.norm(direction)
    t = 0.0
    for _ in range(steps):
        p = o + d * t
        dist = float(sdf.dist(p[None, :])[0])
        if dist < eps:
            g = sdf.gradient(p[None, :], 1e-3)[0]
            return p, g / np.linalg.norm(g)
        t += min(max(dist * 0.8, eps), max_step)
        if t > max_dist:
            break
    raise RuntimeError("sphere_trace: tia không chạm bề mặt")
