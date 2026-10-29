/**
 * shop-catalog.ts
 * ----------------------------------------------------------------------------
 * DANH MỤC CỬA HÀNG — mọi món có thể mua bằng chuối 🍌.
 *
 * Loại món (category):
 *   power       : sức mạnh thi đấu (dùng 1 lần, tối đa 3 lần / trận)
 *   study       : đồ học tập (bảo vệ streak, hồi tim, thêm lượt AI) — dùng 1 lần
 *   avatar      : ảnh đại diện (emoji) — mua 1 lần dùng mãi
 *   frame       : khung avatar
 *   name-color  : màu tên
 *   title       : danh hiệu hiển thị dưới tên
 *   sticker-pack: bộ sticker cho chat
 *   chat-effect : hiệu ứng khi gửi tin (pháo hoa, tim bay...)
 * Món có price 0 = miễn phí, ai cũng có sẵn.
 * File dùng chung cho trang web và máy chủ (máy chủ kiểm tra giá khi mua).
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content/content-types'

export type ShopCategory = 'power' | 'study' | 'avatar' | 'frame' | 'name-color' | 'title' | 'sticker-pack' | 'chat-effect'

export interface ShopItem {
  id: string
  category: ShopCategory
  name: BilingualText
  description: BilingualText
  price: number
  icon: string
  /** true = dùng xong mất (power, study); false = sở hữu vĩnh viễn */
  consumable: boolean
  /** giá trị dùng để hiển thị: emoji avatar, mã màu, CSS khung... */
  value?: string
}

/** Các ô "đang dùng" trên người: mỗi ô chọn 1 món đã sở hữu. */
export const EQUIP_SLOTS = ['avatar', 'frame', 'name-color', 'title'] as const
export type EquipSlot = (typeof EQUIP_SLOTS)[number]

/** Số sức mạnh tối đa được dùng trong 1 trận. */
export const MAX_POWERS_PER_MATCH = 3

const avatar = (id: string, emoji: string, price: number, vi: string, en: string): ShopItem => ({
  id: `avatar-${id}`,
  category: 'avatar',
  name: { vi, en },
  description: { vi: 'Ảnh đại diện', en: 'Avatar' },
  price,
  icon: emoji,
  consumable: false,
  value: emoji,
})

export const SHOP_ITEMS: ShopItem[] = [
  /* ---------- SỨC MẠNH THI ĐẤU ---------- */
  {
    id: 'power-freeze',
    category: 'power',
    icon: '🧊',
    price: 10,
    consumable: true,
    name: { vi: 'Đóng băng', en: 'Freeze' },
    description: { vi: 'Đóng băng 1 đối thủ 2 giây: họ không bấm được đáp án.', en: 'Freeze an opponent for 2 seconds.' },
  },
  {
    id: 'power-shield',
    category: 'power',
    icon: '🛡️',
    price: 15,
    consumable: true,
    name: { vi: 'Khiên chặn', en: 'Shield' },
    description: { vi: 'Bật lên để chặn đòn đóng băng tiếp theo nhắm vào bạn.', en: 'Blocks the next freeze aimed at you.' },
  },
  {
    id: 'power-fifty',
    category: 'power',
    icon: '✂️',
    price: 8,
    consumable: true,
    name: { vi: '50/50', en: '50/50' },
    description: { vi: 'Bỏ bớt 2 đáp án sai của câu hiện tại.', en: 'Removes two wrong answers from the current question.' },
  },
  {
    id: 'power-double',
    category: 'power',
    icon: '2️⃣',
    price: 12,
    consumable: true,
    name: { vi: 'Nhân đôi điểm', en: 'Double points' },
    description: { vi: 'Câu hiện tại trả lời đúng được gấp đôi điểm.', en: 'Double points for the current question if correct.' },
  },
  {
    id: 'power-time',
    category: 'power',
    icon: '⏳',
    price: 6,
    consumable: true,
    name: { vi: 'Thêm giờ', en: 'Extra time' },
    description: { vi: 'Thêm 5 giây cho riêng bạn ở câu hiện tại.', en: '+5 seconds for you on the current question.' },
  },

  /* ---------- ĐỒ HỌC TẬP ---------- */
  {
    id: 'study-streak-freeze',
    category: 'study',
    icon: '🧯',
    price: 30,
    consumable: true,
    name: { vi: 'Bảo vệ streak', en: 'Streak freeze' },
    description: { vi: 'Lỡ nghỉ 1 ngày vẫn giữ chuỗi ngày học. Tự dùng khi cần.', en: 'Keeps your streak if you miss one day. Used automatically.' },
  },
  {
    id: 'study-heart-refill',
    category: 'study',
    icon: '💖',
    price: 10,
    consumable: true,
    name: { vi: 'Hồi tim', en: 'Heart refill' },
    description: { vi: 'Hết tim trong mini-test? Hồi đầy 5 tim và làm tiếp.', en: 'Out of hearts in a mini-test? Refill 5 hearts and continue.' },
  },
  {
    id: 'study-ai-extra',
    category: 'study',
    icon: '🤖',
    price: 15,
    consumable: true,
    name: { vi: '+5 lượt AI', en: '+5 AI uses' },
    description: { vi: 'Thêm 5 lượt AI chấm bài / giải thích trong hôm nay.', en: 'Five extra AI gradings/explanations today.' },
  },

  /* ---------- AVATAR ---------- */
  avatar('smile', '🙂', 0, 'Mặt cười', 'Smile'),
  avatar('cool', '😎', 0, 'Ngầu', 'Cool'),
  avatar('cat', '🐱', 0, 'Mèo', 'Cat'),
  avatar('dog', '🐶', 0, 'Cún', 'Dog'),
  avatar('frog', '🐸', 20, 'Ếch', 'Frog'),
  avatar('fox', '🦊', 20, 'Cáo', 'Fox'),
  avatar('panda', '🐼', 30, 'Gấu trúc', 'Panda'),
  avatar('penguin', '🐧', 30, 'Chim cánh cụt', 'Penguin'),
  avatar('lion', '🦁', 40, 'Sư tử', 'Lion'),
  avatar('tiger', '🐯', 40, 'Hổ', 'Tiger'),
  avatar('owl', '🦉', 50, 'Cú thông thái', 'Wise owl'),
  avatar('ghost', '👻', 50, 'Bóng ma', 'Ghost'),
  avatar('robot', '🤖', 60, 'Người máy', 'Robot'),
  avatar('alien', '👽', 70, 'Người ngoài hành tinh', 'Alien'),
  avatar('unicorn', '🦄', 80, 'Kỳ lân', 'Unicorn'),
  avatar('dragon', '🐉', 120, 'Rồng', 'Dragon'),
  avatar('crown', '👑', 200, 'Vương miện', 'Crown'),

  /* ---------- KHUNG AVATAR (value = CSS background của viền) ---------- */
  { id: 'frame-leaf', category: 'frame', icon: '🍃', price: 60, consumable: false, value: 'linear-gradient(135deg,#4caf50,#a5d6a7)', name: { vi: 'Khung lá', en: 'Leaf frame' }, description: { vi: 'Viền xanh lá quanh avatar', en: 'Green border' } },
  { id: 'frame-ice', category: 'frame', icon: '❄️', price: 100, consumable: false, value: 'linear-gradient(135deg,#4fc3f7,#e1f5fe,#0288d1)', name: { vi: 'Khung băng', en: 'Ice frame' }, description: { vi: 'Viền băng giá', en: 'Icy border' } },
  { id: 'frame-fire', category: 'frame', icon: '🔥', price: 120, consumable: false, value: 'linear-gradient(135deg,#ff5722,#ffc107,#d84315)', name: { vi: 'Khung lửa', en: 'Fire frame' }, description: { vi: 'Viền lửa rực', en: 'Fiery border' } },
  { id: 'frame-gold', category: 'frame', icon: '🥇', price: 80, consumable: false, value: 'linear-gradient(135deg,#f9d423,#fff3b0,#e0a800)', name: { vi: 'Khung vàng', en: 'Gold frame' }, description: { vi: 'Viền vàng sang trọng', en: 'Golden border' } },
  { id: 'frame-rainbow', category: 'frame', icon: '🌈', price: 150, consumable: false, value: 'conic-gradient(#f44336,#ff9800,#ffeb3b,#4caf50,#2196f3,#9c27b0,#f44336)', name: { vi: 'Khung cầu vồng', en: 'Rainbow frame' }, description: { vi: 'Viền 7 màu', en: 'Rainbow border' } },

  /* ---------- MÀU TÊN (value = màu CSS) ---------- */
  { id: 'color-red', category: 'name-color', icon: '🔴', price: 40, consumable: false, value: '#e53935', name: { vi: 'Tên đỏ', en: 'Red name' }, description: { vi: 'Tên hiển thị màu đỏ', en: 'Red display name' } },
  { id: 'color-blue', category: 'name-color', icon: '🔵', price: 40, consumable: false, value: '#1e88e5', name: { vi: 'Tên xanh dương', en: 'Blue name' }, description: { vi: 'Tên màu xanh dương', en: 'Blue display name' } },
  { id: 'color-green', category: 'name-color', icon: '🟢', price: 40, consumable: false, value: '#2e7d32', name: { vi: 'Tên xanh lá', en: 'Green name' }, description: { vi: 'Tên màu xanh lá', en: 'Green display name' } },
  { id: 'color-purple', category: 'name-color', icon: '🟣', price: 60, consumable: false, value: '#8e24aa', name: { vi: 'Tên tím', en: 'Purple name' }, description: { vi: 'Tên màu tím', en: 'Purple display name' } },
  { id: 'color-gold', category: 'name-color', icon: '🟡', price: 100, consumable: false, value: '#d4a017', name: { vi: 'Tên vàng kim', en: 'Gold name' }, description: { vi: 'Tên màu vàng kim', en: 'Gold display name' } },
  { id: 'color-rainbow', category: 'name-color', icon: '🌈', price: 200, consumable: false, value: 'rainbow', name: { vi: 'Tên cầu vồng', en: 'Rainbow name' }, description: { vi: 'Tên đổi màu cầu vồng', en: 'Rainbow display name' } },

  /* ---------- DANH HIỆU MUA ĐƯỢC ---------- */
  { id: 'title-bookworm', category: 'title', icon: '📚', price: 50, consumable: false, value: 'Mọt sách|Bookworm', name: { vi: 'Mọt sách', en: 'Bookworm' }, description: { vi: 'Danh hiệu dưới tên', en: 'Title under your name' } },
  { id: 'title-speedster', category: 'title', icon: '⚡', price: 80, consumable: false, value: 'Tia chớp|Speedster', name: { vi: 'Tia chớp', en: 'Speedster' }, description: { vi: 'Danh hiệu dưới tên', en: 'Title under your name' } },
  { id: 'title-wordking', category: 'title', icon: '👑', price: 120, consumable: false, value: 'Vua từ vựng|Word King', name: { vi: 'Vua từ vựng', en: 'Word King' }, description: { vi: 'Danh hiệu dưới tên', en: 'Title under your name' } },
  { id: 'title-genius', category: 'title', icon: '🧠', price: 150, consumable: false, value: 'Thần đồng|Genius', name: { vi: 'Thần đồng', en: 'Genius' }, description: { vi: 'Danh hiệu dưới tên', en: 'Title under your name' } },

  /* ---------- STICKER & HIỆU ỨNG CHAT ---------- */
  { id: 'stickers-animals', category: 'sticker-pack', icon: '🐵', price: 30, consumable: false, value: '🐵 🙈 🙉 🙊 🐶 🐱 🐰 🐻 🐼 🐨 🐯 🦁', name: { vi: 'Sticker động vật', en: 'Animal stickers' }, description: { vi: '12 sticker động vật cỡ lớn', en: '12 big animal stickers' } },
  { id: 'stickers-party', category: 'sticker-pack', icon: '🥳', price: 30, consumable: false, value: '🥳 🎉 🎊 🎂 🍰 🎁 🎈 🪅 🍾 🥂 🎆 🎇', name: { vi: 'Sticker tiệc tùng', en: 'Party stickers' }, description: { vi: '12 sticker tiệc cỡ lớn', en: '12 big party stickers' } },
  { id: 'stickers-study', category: 'sticker-pack', icon: '📖', price: 30, consumable: false, value: '📖 ✏️ 📝 🎓 🧠 💡 💯 ✅ ❌ 🔥 💪 🏆', name: { vi: 'Sticker học tập', en: 'Study stickers' }, description: { vi: '12 sticker học tập cỡ lớn', en: '12 big study stickers' } },
  { id: 'effect-fireworks', category: 'chat-effect', icon: '🎆', price: 50, consumable: false, value: 'fireworks', name: { vi: 'Pháo hoa', en: 'Fireworks' }, description: { vi: 'Gửi tin kèm hiệu ứng pháo hoa trên màn hình mọi người', en: 'Send a message with fireworks' } },
  { id: 'effect-hearts', category: 'chat-effect', icon: '💕', price: 40, consumable: false, value: 'hearts', name: { vi: 'Tim bay', en: 'Flying hearts' }, description: { vi: 'Gửi tin kèm tim bay', en: 'Send a message with flying hearts' } },
]

/** Sticker miễn phí ai cũng có. */
export const FREE_STICKERS = '👍 👏 😂 😍 😮 😢 😡 🙏 🎉 ❤️ 🤔 👋'

export const findShopItem = (itemId: string) => SHOP_ITEMS.find((item) => item.id === itemId)

/** Món miễn phí (price 0) coi như ai cũng sở hữu. */
export const FREE_ITEM_IDS = SHOP_ITEMS.filter((item) => item.price === 0).map((item) => item.id)
