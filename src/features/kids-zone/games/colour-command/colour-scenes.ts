/**
 * colour-scenes.ts — "BẢN VẼ" CÁC BỨC TRANH CỦA TRÒ NGHE LỆNH TÔ MÀU
 * ----------------------------------------------------------------------------
 * Mỗi bức tranh = 1 nền cảnh (công viên, phòng, đường phố, biển, ao, trời đêm)
 *               + các ảnh 3D đặt lên trên (ảnh của từ trong ngân hàng từ)
 *               + vài đồ vẽ tay bằng SVG (cái bàn, cái ao — ngân hàng từ chưa có ảnh).
 *
 * TOẠ ĐỘ: tranh luôn có tỉ lệ 2 : 1 (rộng gấp đôi cao — SCENE_ASPECT).
 *   x, y   = vị trí TÂM của ảnh, tính % chiều rộng / chiều cao tranh (0 = trái / trên)
 *   size   = cạnh ảnh (ảnh vuông), tính % CHIỀU CAO tranh
 *   role   = 'target'  : đồ vật phải tô (bấm đúng + đúng màu)
 *            'other'   : đồ vật bấm được nhưng không phải đáp án (đáp án nhiễu)
 *            'scenery' : cảnh nền / vật làm mốc (cái giường, cái cây, đầu búp bê giấy…) — không bấm được
 *   flip   = lật ngang · rotate = xoay (độ) · stretch = kéo dài ngang (con rắn "dài nhất")
 *   z      = lớp (số lớn nằm trên). Bỏ trống: cảnh nền nằm dưới (2), vật bấm được nằm trên (4–8, vật ở
 *            thấp hơn nằm trên vật ở cao — như nhìn thật). Cần "che" (vịt trong hộp, hoa sau cây) thì ghi z.
 *
 * COMMAND_SCENES: 30 tranh cho 30 lệnh soạn sẵn (content/kids/colour-commands.ts, theo `sceneNoteEn`).
 * TEMPLATE_SLOTS: chỗ đặt 3–4 đồ vật cho lệnh ghép từ mẫu ("Colour the cat red.").
 * Sửa tranh: đổi số ở đây rồi xem /kids-preview/play/colour-command — không cần sửa code vẽ.
 * ----------------------------------------------------------------------------
 */

/** Tỉ lệ rộng : cao của mọi bức tranh. */
export const SCENE_ASPECT = 2

export type SceneBackdrop = 'park' | 'room' | 'road' | 'sea' | 'pond' | 'night'

export interface ScenePlacement {
  /** từ trong ngân hàng từ (lấy ảnh + chữ). Vật trang trí không phải từ thì dùng `slug`. */
  wordId?: string
  /** tên ảnh trang trí trong public/word-images (VD 'zzz' = đang ngủ, 'musical-notes' = đang nhảy) */
  slug?: string
  role: 'target' | 'other' | 'scenery'
  x: number
  y: number
  size: number
  flip?: boolean
  rotate?: number
  stretch?: number
  z?: number
}

/** Đồ vẽ tay bằng SVG: cái bàn (mặt bàn ở y, rộng w% tranh) · cái ao (hình bầu dục tâm x,y rộng w cao h). */
export interface SceneProp {
  kind: 'table' | 'pond'
  x: number
  y: number
  w: number
  h?: number
  z?: number
}

export interface ColourSceneLayout {
  backdrop: SceneBackdrop
  things: ScenePlacement[]
  props?: SceneProp[]
}

/* Viết tắt cho dễ đọc bảng dưới */
const T = (wordId: string, x: number, y: number, size: number, extra: Partial<ScenePlacement> = {}): ScenePlacement => ({
  wordId,
  role: 'target',
  x,
  y,
  size,
  ...extra,
})
const O = (wordId: string, x: number, y: number, size: number, extra: Partial<ScenePlacement> = {}): ScenePlacement => ({
  wordId,
  role: 'other',
  x,
  y,
  size,
  ...extra,
})
const S = (wordId: string, x: number, y: number, size: number, extra: Partial<ScenePlacement> = {}): ScenePlacement => ({
  wordId,
  role: 'scenery',
  x,
  y,
  size,
  ...extra,
})
const DECO = (slug: string, x: number, y: number, size: number, extra: Partial<ScenePlacement> = {}): ScenePlacement => ({
  slug,
  role: 'scenery',
  x,
  y,
  size,
  ...extra,
})

/** id từ hay dùng */
const W = {
  cat: 'kids-animals-cat',
  dog: 'kids-animals-dog',
  bird: 'kids-animals-bird',
  fish: 'kids-animals-fish',
  duck: 'kids-animals-duck',
  frog: 'kids-animals-frog',
  snake: 'kids-animals-snake',
  rabbit: 'kids-animals-rabbit',
  ball: 'kids-toys-ball',
  kite: 'kids-toys-kite',
  robot: 'kids-toys-robot',
  balloon: 'kids-toys-balloon',
  apple: 'kids-food-apple',
  banana: 'kids-food-banana',
  carrot: 'kids-food-carrot',
  tree: 'kids-weather-tree',
  flower: 'kids-weather-flower',
  rock: 'kids-weather-rock',
  island: 'kids-weather-island',
  moon: 'kids-weather-moon',
  cloud: 'kids-weather-cloud',
  star: 'kids-colours-star',
  chair: 'kids-home-chair',
  bed: 'kids-home-bed',
  box: 'kids-home-box',
  sofa: 'kids-home-sofa',
  house: 'kids-home-house',
  car: 'kids-transport-car',
  bus: 'kids-transport-bus',
  lorry: 'kids-transport-lorry',
  boat: 'kids-transport-boat',
  girl: 'kids-family-girl',
  boy: 'kids-family-boy',
  man: 'kids-family-man',
  woman: 'kids-family-woman',
  baby: 'kids-family-baby',
  dress: 'kids-clothes-dress',
  tshirt: 'kids-clothes-t-shirt',
  hat: 'kids-clothes-hat',
  shoes: 'kids-clothes-shoes',
  socks: 'kids-clothes-socks',
  book: 'kids-school-book',
}

export const COMMAND_SCENES: Record<string, ColourSceneLayout> = {
  /* ---------- STARTERS: màu + đồ vật ---------- */
  'kids-colour-01': { backdrop: 'park', things: [T(W.cat, 24, 68, 48), O(W.dog, 54, 68, 46), O(W.bird, 80, 30, 28)] },
  'kids-colour-02': { backdrop: 'park', things: [T(W.ball, 25, 80, 28), O(W.kite, 57, 28, 36), O(W.robot, 80, 66, 46)] },
  'kids-colour-03': {
    backdrop: 'pond',
    things: [T(W.fish, 30, 79, 26), O(W.duck, 58, 64, 34), O(W.frog, 82, 78, 26)],
  },
  'kids-colour-04': { backdrop: 'park', things: [T(W.kite, 25, 30, 36), O(W.balloon, 53, 32, 36), O(W.tree, 81, 54, 76)] },

  /* ---------- to / nhỏ ---------- */
  'kids-colour-05': {
    backdrop: 'room',
    props: [{ kind: 'table', x: 47, y: 62, w: 70 }],
    things: [T(W.apple, 32, 45, 36), O(W.apple, 52, 51, 22), O(W.banana, 69, 47, 30)],
  },
  'kids-colour-06': {
    backdrop: 'park',
    things: [S(W.tree, 50, 47, 94), O(W.bird, 39, 30, 24), T(W.bird, 62, 24, 13)],
  },

  /* ---------- giới từ: under / on / in / behind / between ---------- */
  'kids-colour-07': {
    backdrop: 'room',
    props: [{ kind: 'table', x: 32, y: 50, w: 34 }],
    things: [T(W.ball, 32, 80, 17), S(W.chair, 74, 60, 54), O(W.ball, 74, 45, 15)],
  },
  'kids-colour-08': {
    backdrop: 'room',
    things: [S(W.bed, 29, 64, 52), T(W.cat, 26, 47, 24), S(W.chair, 74, 60, 54), O(W.cat, 74, 82, 17)],
  },
  'kids-colour-09': {
    // vịt "trong hộp": hộp (z 2) che nửa dưới con vịt (z 1)
    backdrop: 'room',
    things: [T(W.duck, 36, 53, 26, { z: 1 }), S(W.box, 36, 70, 38, { z: 2 }), O(W.duck, 66, 72, 28)],
  },
  'kids-colour-10': {
    // hoa "sau cây": thân cây (z 2) che giữa bông hoa (z 1); hoa "trước cây" nằm trên (z 3)
    backdrop: 'park',
    things: [T(W.flower, 51, 73, 22, { z: 1 }), S(W.tree, 46, 46, 86, { z: 2 }), O(W.flower, 27, 84, 24, { z: 3 })],
  },
  'kids-colour-11': {
    backdrop: 'road',
    things: [S(W.bus, 15, 66, 34), T(W.car, 37, 70, 26), S(W.lorry, 60, 66, 34), O(W.car, 85, 70, 26)],
  },
  'kids-colour-12': {
    // "búp bê giấy": đầu người (ảnh trang trí, nằm trên) + chiếc váy bấm được bên dưới
    backdrop: 'room',
    things: [S(W.girl, 31, 37, 24, { z: 6 }), T(W.dress, 31, 63, 40), S(W.woman, 67, 30, 27, { z: 6 }), O(W.dress, 67, 60, 50)],
  },

  /* ---------- MOVERS: so sánh hơn / nhất ---------- */
  'kids-colour-13': { backdrop: 'park', things: [T(W.balloon, 33, 44, 62), O(W.balloon, 68, 54, 34)] },
  'kids-colour-14': {
    backdrop: 'park',
    things: [T(W.tree, 20, 46, 82), S(W.house, 50, 64, 42), O(W.tree, 80, 64, 40)],
  },
  'kids-colour-15': {
    backdrop: 'sea',
    things: [O(W.fish, 24, 64, 36), O(W.fish, 52, 72, 24), T(W.fish, 80, 62, 14)],
  },
  'kids-colour-16': {
    backdrop: 'park',
    things: [T(W.snake, 21, 72, 40, { stretch: 1.4 }), S(W.rock, 52, 76, 32), O(W.snake, 51, 56, 22), O(W.snake, 81, 74, 30, { stretch: 1.15 })],
  },

  /* ---------- both / all / số thứ tự ---------- */
  'kids-colour-17': {
    backdrop: 'room',
    things: [S(W.bed, 76, 60, 52), T(W.shoes, 14, 80, 26), T(W.shoes, 31, 82, 26, { flip: true }), O(W.socks, 51, 80, 26)],
  },
  'kids-colour-18': {
    backdrop: 'night',
    things: [O(W.moon, 84, 26, 30), O(W.cloud, 58, 64, 28), T(W.star, 14, 26, 15), T(W.star, 33, 14, 12), T(W.star, 38, 52, 14), T(W.star, 70, 34, 12)],
  },
  'kids-colour-19': {
    backdrop: 'road',
    things: [O(W.car, 14, 70, 26), T(W.car, 38, 70, 26), O(W.car, 62, 70, 26), O(W.car, 86, 70, 26)],
  },

  /* ---------- above / near ---------- */
  'kids-colour-20': {
    backdrop: 'park',
    things: [S(W.tree, 25, 62, 56), S(W.house, 71, 66, 44), T(W.kite, 25, 18, 26), O(W.kite, 71, 20, 26, { flip: true })],
  },
  'kids-colour-21': {
    backdrop: 'sea',
    things: [S(W.island, 24, 52, 42), T(W.boat, 45, 66, 26), O(W.boat, 85, 47, 12)],
  },

  /* ---------- mệnh đề "that / which / who is …" ---------- */
  'kids-colour-22': {
    // chó đang chạy theo quả bóng (bụi bay phía sau) · chó đang ngủ (zzz)
    backdrop: 'park',
    things: [O(W.ball, 12, 82, 14), O(W.dog, 32, 68, 40), DECO('dashing-away', 49, 72, 14), T(W.dog, 74, 76, 36, { rotate: -8 }), DECO('zzz', 87, 54, 15)],
  },
  'kids-colour-23': {
    backdrop: 'park',
    things: [T(W.bird, 24, 26, 22, { rotate: -16 }), DECO('dashing-away', 36, 32, 11), S(W.tree, 66, 48, 86), O(W.bird, 66, 29, 18)],
  },
  'kids-colour-24': {
    backdrop: 'room',
    things: [
      S(W.girl, 28, 31, 22, { z: 6, rotate: 8 }),
      T(W.dress, 28, 57, 34, { rotate: 8 }),
      DECO('musical-notes', 13, 58, 14),
      S(W.girl, 68, 31, 22, { z: 6 }),
      O(W.dress, 68, 57, 34),
      O(W.book, 82, 58, 15, { rotate: -10 }),
    ],
  },
  'kids-colour-25': {
    backdrop: 'park',
    things: [
      O(W.kite, 16, 25, 24),
      S(W.boy, 27, 38, 22, { z: 6 }),
      T(W.tshirt, 27, 62, 32),
      S(W.boy, 70, 38, 22, { z: 6 }),
      O(W.tshirt, 70, 62, 32),
      O(W.ball, 86, 80, 14),
    ],
  },
  'kids-colour-26': {
    backdrop: 'room',
    things: [
      S(W.man, 28, 50, 30),
      T(W.hat, 28, 29, 24, { z: 7 }),
      O(W.book, 44, 68, 16, { rotate: -8 }),
      S(W.man, 70, 50, 30),
      O(W.hat, 70, 29, 24, { z: 7 }),
      DECO('zzz', 86, 40, 13),
    ],
  },
  'kids-colour-27': {
    backdrop: 'room',
    props: [{ kind: 'table', x: 30, y: 50, w: 34 }],
    things: [T(W.cat, 30, 80, 20), S(W.sofa, 72, 60, 48), O(W.cat, 69, 48, 22)],
  },
  'kids-colour-28': {
    backdrop: 'park',
    things: [O(W.carrot, 15, 80, 16, { rotate: 20 }), T(W.rabbit, 31, 72, 36), O(W.rabbit, 68, 44, 34, { rotate: -10 }), DECO('dashing-away', 81, 60, 13)],
  },
  'kids-colour-29': {
    backdrop: 'room',
    props: [{ kind: 'table', x: 80, y: 52, w: 30 }],
    things: [S(W.baby, 14, 76, 22), S(W.chair, 46, 60, 54), T(W.ball, 46, 83, 14), O(W.ball, 80, 44, 14)],
  },
  'kids-colour-30': {
    backdrop: 'pond',
    things: [S(W.rock, 30, 74, 32), T(W.frog, 30, 55, 22), O(W.frog, 72, 78, 20)],
  },
}

/**
 * Chỗ đặt đồ vật cho lệnh ghép từ mẫu (đã xáo thứ tự khi dùng).
 * Đặt so le cao thấp + to nhỏ khác nhau một chút cho tranh tự nhiên, không thành "hàng thẻ".
 */
export const TEMPLATE_SLOTS: Record<3 | 4, { x: number; y: number; size: number }[]> = {
  3: [
    { x: 20, y: 66, size: 48 },
    { x: 50, y: 60, size: 52 },
    { x: 80, y: 66, size: 48 },
  ],
  4: [
    { x: 14, y: 68, size: 40 },
    { x: 38, y: 60, size: 44 },
    { x: 62, y: 68, size: 40 },
    { x: 86, y: 60, size: 42 },
  ],
}

/** Từ "bay / treo trên trời" -> trong tranh mẫu được đặt cao lên (chim, diều, mây…). */
export const SKY_WORD_IDS = new Set([
  'kids-animals-bird',
  'kids-animals-parrot',
  'kids-animals-bee',
  'kids-animals-butterfly',
  'kids-toys-kite',
  'kids-toys-balloon',
  'kids-transport-plane',
  'kids-transport-helicopter',
  'kids-transport-rocket',
  'kids-weather-sun',
  'kids-weather-cloud',
  'kids-weather-rainbow',
  'kids-weather-moon',
  'kids-colours-star',
])

/** Nền cảnh cho lệnh ghép từ mẫu, theo chủ đề của từ. */
export function backdropForTopic(topicId: string | undefined): SceneBackdrop {
  switch (topicId) {
    case 'food':
    case 'school':
    case 'toys':
    case 'clothes':
    case 'home':
      return 'room'
    case 'transport':
      return 'road'
    default:
      return 'park'
  }
}
