"""
corgi_poses.py — "Kịch bản" tư thế + biểu cảm của mascot Corgi.

Mỗi tư thế (pose) là một dict mô tả:
    head   : nghiêng đầu {"roll": độ (+ = nghiêng về bên phải người xem), "pitch": (+ = cúi xuống),
             "yaw": (+ = quay mặt sang phải người xem)}
    arms   : {"R": ..., "L": ...}  — R = tay PHẢI của nhân vật (bên TRÁI người xem, X âm), L = tay trái.
             Mỗi tay là một dict:
               {"mode": "rest"}                 tay buông thả tự nhiên
               {"mode": "salute"}               tay chào (bàn tay áp vành mũ)
               {"mode": "reach", "anchor": ..., "at": (x, y, z), "fingers": (x, y, z), "palm": (x, y, z),
                "pole": (x, y, z), "grip": "open" | "fist" | "thumb"}
                    anchor  : gốc toạ độ của điểm "at":
                                "shoulder" = khớp vai, "chest" = mặt trước ngực, "head" = tâm đầu (theo khung đầu)
                    at      : vị trí TÂM BÀN TAY so với anchor (m). x dương = HƯỚNG RA NGOÀI phía tay đó
                              (code tự lật dấu cho tay phải) → một bộ số dùng được cho cả 2 tay.
                    fingers : hướng các ngón tay chỉ tới
                    palm    : hướng LÒNG bàn tay quay về (nơi có đệm thịt hồng)
                    pole    : khuỷu tay "lồi" về hướng nào (gợi ý cho IK)
                    grip    : open = bàn tay xoè (găng), fist = nắm (cầm đồ), thumb = nắm + giơ ngón cái
    eyes   : "open" | "happy" (cong ^ ^) | "sleepy" (nhắm, cong xuống) | "wide" (mở to) | "wink" (nháy 1 mắt)
    look   : (dx, dz) dời đốm sáng trong mắt → hướng nhìn (vd nhìn lên khi suy nghĩ)
    mouth  : "smile" (cười mở, lưỡi trong miệng) | "tongue" (cười mở + thè lưỡi) | "closed" (miệng khép chữ w)
             | "o" (chữ o — ngạc nhiên) | "wide" (há to — ăn mừng)
    brows  : None | "soft" (lông mày nhẹ) | "worried" (nhướng ở giữa — dịu dàng, an ủi)
             | "raised" (nhướng cao — ngạc nhiên) | "one_up" (1 bên nhướng — suy nghĩ)
    ears   : {"out": độ, "back": độ} cộng thêm vào góc tai (dương = cụp ra ngoài / ra sau)
    props  : danh sách đồ vật: "headphones", "book", "pencil", "notepad", "mic", "heart", "zzz",
             "notes" (nốt nhạc), "confetti", "question"
    view   : góc camera (phương vị độ) khi render pose này cho web

Muốn thêm tư thế mới: copy một pose gần giống, đổi vài số, chạy render_poses.py --poses <tên>.
"""

import copy

REST = {"mode": "rest"}

# -----------------------------------------------------------------------------------------------
# Các tư thế dùng cho web (hợp đồng tài sản: public/mascot/poses/<pose>-<size>.webp)
# -----------------------------------------------------------------------------------------------
POSES = {
    # Tư thế CHÍNH: chào kiểu công an — tay phải áp vành mũ, lòng bàn tay hướng ra trước.
    "salute": {
        "head": {"roll": -6.0, "pitch": 2.0, "yaw": 0.0},
        "arms": {"R": {"mode": "salute"}, "L": REST},
        "eyes": "open", "mouth": "smile", "brows": "soft",
        "view": -18.0,
    },
    # Đứng thường (dùng cho bảng so sánh concept + turnaround)
    "neutral": {
        "head": {"roll": 3.0},
        "arms": {"R": REST, "L": REST},
        "eyes": "open", "mouth": "smile", "brows": "soft",
        "view": 20.0,
    },
    # Trả lời đúng: mắt cười ^ ^, thè lưỡi, hai tay nắm hớn hở trước ngực
    "happy": {
        "head": {"roll": 8.0, "pitch": -3.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "chest", "at": (0.20, -0.10, 0.02), "fingers": (-0.3, -0.2, 1.0),
                  "palm": (-0.6, -0.4, 0.0), "pole": (1.0, 0.2, -0.6), "grip": "fist"},
            "L": {"mode": "reach", "anchor": "chest", "at": (0.20, -0.10, 0.02), "fingers": (-0.3, -0.2, 1.0),
                  "palm": (-0.6, -0.4, 0.0), "pole": (1.0, 0.2, -0.6), "grip": "fist"},
        },
        "eyes": "happy", "mouth": "tongue", "brows": "soft", "ears": {"out": -4.0},
        "view": 18.0,
    },
    # Vẫy tay chào (khu trẻ em): tay trái giơ cao, lòng bàn tay quay ra trước
    "wave": {
        "head": {"roll": 7.0},
        "arms": {
            "R": REST,
            "L": {"mode": "reach", "anchor": "shoulder", "at": (0.50, -0.16, 0.52), "fingers": (0.30, 0.0, 1.0),
                  "palm": (0.15, -1.0, 0.0), "pole": (1.0, 0.3, -0.6), "grip": "open"},
        },
        "eyes": "open", "mouth": "tongue", "brows": "soft",
        "view": -12.0,
    },
    # An ủi khi trả lời sai: nghiêng đầu, lông mày nhướng dịu, ôm trái tim trước ngực
    "comfort": {
        "head": {"roll": -10.0, "pitch": 4.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "chest", "at": (0.15, -0.22, 0.02), "fingers": (-0.45, -0.35, 0.8),
                  "palm": (-0.85, -0.1, 0.2), "pole": (1.0, 0.1, -0.6), "grip": "open"},
            "L": {"mode": "reach", "anchor": "chest", "at": (0.15, -0.22, 0.02), "fingers": (-0.45, -0.35, 0.8),
                  "palm": (-0.85, -0.1, 0.2), "pole": (1.0, 0.1, -0.6), "grip": "open"},
        },
        "eyes": "open", "mouth": "closed", "brows": "worried", "ears": {"out": 8.0, "back": 6.0},
        "look": (0.0, -0.006),
        "props": ["heart"],
        "view": 15.0,
    },
    # Gợi ý / suy nghĩ: tay chống cằm, mắt nhìn lên, 1 bên lông mày nhướng, dấu hỏi
    "thinking": {
        "head": {"roll": 9.0, "pitch": -4.0, "yaw": 6.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "head", "at": (0.05, -0.43, -0.36), "fingers": (-0.2, -0.3, 1.0),
                  "palm": (0.2, 0.2, 1.0), "pole": (1.0, -0.2, -1.0), "grip": "fist"},
            "L": {"mode": "reach", "anchor": "chest", "at": (0.04, -0.12, -0.10), "fingers": (-1.0, -0.2, 0.25),
                  "palm": (0.0, 0.3, 1.0), "pole": (1.0, 0.2, -0.4), "grip": "open"},
        },
        "eyes": "open", "mouth": "closed", "brows": "one_up", "look": (0.022, 0.022),
        "props": ["question"],
        "view": -15.0,
    },
    # Xong bài: hai tay giơ cao, há miệng cười, hoa giấy
    "celebrate": {
        "head": {"roll": -5.0, "pitch": -7.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "shoulder", "at": (0.28, -0.05, 0.56), "fingers": (0.3, 0.0, 1.0),
                  "palm": (0.0, -1.0, 0.1), "pole": (1.0, 0.4, -0.4), "grip": "open"},
            "L": {"mode": "reach", "anchor": "shoulder", "at": (0.28, -0.05, 0.56), "fingers": (0.3, 0.0, 1.0),
                  "palm": (0.0, -1.0, 0.1), "pole": (1.0, 0.4, -0.4), "grip": "open"},
        },
        "eyes": "happy", "mouth": "wide", "brows": "raised", "ears": {"out": -6.0},
        "props": ["confetti"],
        "view": 12.0,
    },
    # Nhắc học: buồn ngủ — mắt nhắm, đầu gục, tai cụp, chữ Z
    "sleepy": {
        "head": {"roll": 12.0, "pitch": 9.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "head", "at": (0.30, -0.50, -0.02), "fingers": (-0.25, -0.2, 1.0),
                  "palm": (0.3, 1.0, 0.0), "pole": (1.0, -0.2, -1.0), "grip": "fist"},
            "L": REST,
        },
        "eyes": "sleepy", "mouth": "o_small", "brows": "worried", "ears": {"out": 14.0, "back": 10.0},
        "props": ["zzz"],
        "view": 14.0,
    },
    # Kỹ năng Nghe: đeo tai nghe, 1 tay giữ tai nghe, mắt cười, nốt nhạc
    "listening": {
        "head": {"roll": 8.0},
        "arms": {
            "R": REST,
            "L": {"mode": "reach", "anchor": "head", "at": (0.50, -0.06, -0.03), "fingers": (-0.2, 0.0, 1.0),
                  "palm": (-1.0, 0.0, 0.0), "pole": (1.0, 0.0, -1.0), "grip": "open"},
        },
        "eyes": "happy", "mouth": "smile", "brows": "soft",
        "props": ["headphones", "notes"],
        "view": -14.0,
    },
    # Cổ vũ: giơ ngón cái + nháy mắt
    "thumbs-up": {
        "head": {"roll": 6.0},
        "arms": {
            "R": REST,
            "L": {"mode": "reach", "anchor": "chest", "at": (0.26, -0.22, 0.10), "fingers": (-0.9, -0.3, 0.0),
                  "palm": (-0.2, 0.2, -1.0), "pole": (1.0, 0.3, -0.7), "grip": "thumb"},
        },
        "eyes": "wink", "mouth": "tongue", "brows": "soft",
        "view": -12.0,
    },
    # Còn câu bỏ trống: ngạc nhiên — mắt to, miệng chữ o, hai tay áp má
    "surprised": {
        "head": {"roll": 0.0, "pitch": -4.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "head", "at": (0.40, -0.26, -0.22), "fingers": (-0.25, -0.1, 1.0),
                  "palm": (-1.0, -0.15, 0.0), "pole": (1.0, 0.0, -1.0), "grip": "open"},
            "L": {"mode": "reach", "anchor": "head", "at": (0.40, -0.26, -0.22), "fingers": (-0.25, -0.1, 1.0),
                  "palm": (-1.0, -0.15, 0.0), "pole": (1.0, 0.0, -1.0), "grip": "open"},
        },
        "eyes": "wide", "mouth": "o", "brows": "raised", "ears": {"out": -8.0},
        "view": 10.0,
    },
    # Kỹ năng Đọc: cầm sách mở bằng 2 tay
    "reading": {
        "head": {"roll": 6.0, "pitch": 8.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "chest", "at": (0.16, -0.30, 0.06), "fingers": (-0.2, -0.4, 1.0),
                  "palm": (-0.9, -0.1, 0.2), "pole": (1.0, 0.2, -0.6), "grip": "fist"},
            "L": {"mode": "reach", "anchor": "chest", "at": (0.16, -0.30, 0.06), "fingers": (-0.2, -0.4, 1.0),
                  "palm": (-0.9, -0.1, 0.2), "pole": (1.0, 0.2, -0.6), "grip": "fist"},
        },
        "eyes": "open", "mouth": "smile", "brows": "soft", "look": (0.0, -0.02),
        "props": ["book"],
        "view": 14.0,
    },
    # Kỹ năng Viết: tay trái cầm sổ, tay phải cầm bút chì
    "writing": {
        "head": {"roll": -7.0, "pitch": 7.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "chest", "at": (0.08, -0.30, 0.10), "fingers": (0.6, -0.3, 0.7),
                  "palm": (0.7, 0.0, -0.4), "pole": (1.0, 0.1, -0.7), "grip": "fist"},
            "L": {"mode": "reach", "anchor": "chest", "at": (0.14, -0.26, -0.04), "fingers": (-0.6, -0.4, 0.6),
                  "palm": (-0.3, -0.2, 1.0), "pole": (1.0, 0.1, -0.6), "grip": "open"},
        },
        "eyes": "open", "mouth": "tongue_side", "brows": "soft", "look": (-0.01, -0.02),
        "props": ["pencil", "notepad"],
        "view": -10.0,
    },
    # Kỹ năng Nói: cầm micro, miệng mở
    "speaking": {
        "head": {"roll": 5.0, "pitch": -3.0},
        "arms": {
            "R": {"mode": "reach", "anchor": "head", "at": (0.12, -0.52, -0.42), "fingers": (-0.5, -0.3, 0.8),
                  "palm": (-0.8, 0.2, 0.2), "pole": (1.0, 0.1, -0.8), "grip": "fist"},
            "L": {"mode": "reach", "anchor": "shoulder", "at": (0.30, -0.16, 0.28), "fingers": (0.3, -0.2, 1.0),
                  "palm": (0.0, -1.0, 0.2), "pole": (1.0, 0.2, -0.6), "grip": "open"},
        },
        "eyes": "open", "mouth": "wide", "brows": "raised",
        "props": ["mic"],
        "view": 12.0,
    },
    # Chỉ có cái đầu (logo / favicon) — không có thân
    "head": {
        "head": {"roll": 0.0},
        "arms": {"R": REST, "L": REST},
        "eyes": "open", "mouth": "smile", "brows": "soft",
        "head_only": True,
        "view": 0.0,
    },
}

PRIORITY = ["salute", "happy", "wave", "comfort", "thinking", "celebrate", "sleepy", "listening"]
SECONDARY = ["thumbs-up", "surprised", "reading", "writing", "speaking"]


def get_pose(name):
    """Trả về bản sao dict tư thế đầy đủ (thêm giá trị mặc định cho khoá còn thiếu)."""
    p = copy.deepcopy(POSES[name])
    p.setdefault("head", {})
    for k in ("roll", "pitch", "yaw"):
        p["head"].setdefault(k, 0.0)
    p.setdefault("eyes", "open")
    p.setdefault("look", (0.0, 0.0))
    p.setdefault("mouth", "smile")
    p.setdefault("brows", None)
    p.setdefault("ears", {})
    p["ears"].setdefault("out", 0.0)
    p["ears"].setdefault("back", 0.0)
    p.setdefault("props", [])
    p.setdefault("head_only", False)
    p.setdefault("view", 0.0)
    p["name"] = name
    return p
