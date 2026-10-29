/**
 * kids-rewards.ts
 * ----------------------------------------------------------------------------
 * LUẬT PHẦN THƯỞNG CỦA KHU TRẺ EM: sticker + trang phục mascot.
 * (psych-kids luật 20–23: thưởng gắn với THUỘC TỪ, không thưởng theo phút / đăng nhập,
 *  không quay thưởng, không món nào phải mua.)
 *
 *   - Mỗi từ = 1 sticker. Id sticker = id từ (VD 'kids-animals-cat').
 *     Bé nhận sticker khi từ lên "đã thuộc" (hộp 5, sau lần ôn ở mốc ≥ 7 ngày).
 *     Sticker đã nhận thì giữ mãi, kể cả khi sau này từ bị lùi hộp.
 *   - Sưu tập đủ sticker của 1 chủ đề -> mở trang phục của chủ đề đó (topic.outfitId).
 *   - Ảnh sticker = ảnh 3D của từ, viền trắng dày kiểu sticker bóc dán (CSS drop-shadow),
 *     nên không cần vẽ thêm 300+ sticker riêng.
 * ----------------------------------------------------------------------------
 */
import type { KidsTopic } from '../../../content/content-types'
import { DEFAULT_OUTFIT_ID, KIDS_OUTFITS, type KidsOutfit } from '../../../content/kids'
import type { KidsProgress } from '../../../learning-progress/progress-types'
import { KIDS_TOPICS, topicOfWord } from './kids-word-bank'

/** Sticker của 1 từ có id trùng id từ — giữ 1 hàm để sau này đổi cách đặt tên ở 1 chỗ. */
export const stickerIdForWord = (wordId: string) => wordId

/** Tiến độ sổ sticker của 1 chủ đề, VD 12/20. */
export function topicStickerProgress(kids: KidsProgress, topic: KidsTopic): { collected: number; total: number } {
  const owned = new Set(kids.stickers)
  const collected = topic.words.filter((word) => owned.has(stickerIdForWord(word.id))).length
  return { collected, total: topic.words.length }
}

export const isTopicComplete = (kids: KidsProgress, topic: KidsTopic) => {
  const { collected, total } = topicStickerProgress(kids, topic)
  return total > 0 && collected >= total
}

/** Tổng số sticker đã có / tổng số sticker có thể sưu tập. */
export function albumTotals(kids: KidsProgress): { collected: number; total: number } {
  const total = KIDS_TOPICS.reduce((sum, topic) => sum + topic.words.length, 0)
  return { collected: kids.stickers.length, total }
}

/**
 * Sau khi bé vừa nhận sticker của `wordId` (kids đã có sticker đó): chủ đề có vừa đủ bộ không?
 * Có -> trả trang phục cần mở (nếu chủ đề có trang phục và bé chưa có).
 */
export function outfitEarnedByWord(kidsAfter: KidsProgress, wordId: string): KidsOutfit | null {
  const topic = topicOfWord(wordId)
  if (!topic?.outfitId || !isTopicComplete(kidsAfter, topic)) return null
  if (kidsAfter.outfits.includes(topic.outfitId)) return null
  return KIDS_OUTFITS.find((outfit) => outfit.id === topic.outfitId) ?? null
}

/**
 * Bộ đồ đang mặc, đã quy về id trong outfits.ts.
 * (Kho tiến độ dùng 'classic' cho bộ mặc định, nội dung dùng 'police-uniform' — 2 tên là 1 bộ.)
 */
export function equippedOutfitId(kids: KidsProgress): string {
  return !kids.equippedOutfit || kids.equippedOutfit === 'classic' ? DEFAULT_OUTFIT_ID : kids.equippedOutfit
}

/** Id gửi cho kho tiến độ khi mặc đồ: bộ mặc định phải gửi 'classic' (xem REQUESTS.md). */
export const outfitIdForStore = (outfitId: string) => (outfitId === DEFAULT_OUTFIT_ID ? 'classic' : outfitId)

export function isOutfitOwned(kids: KidsProgress, outfit: KidsOutfit): boolean {
  return outfit.unlockTopicId === null || kids.outfits.includes(outfit.id)
}

/** Ảnh trang phục (nhóm 3D xuất theo hợp đồng tài sản). Chưa có ảnh -> component tự hiện ảnh tạm. */
export const outfitImageUrl = (outfitId: string) => `/mascot/outfits/${outfitId}-512.webp`

/**
 * Món phụ kiện tiêu biểu của mỗi bộ đồ (ảnh 3D Fluent) — dùng làm ẢNH TẠM:
 * khi chưa có ảnh Ki mặc đồ, giao diện vẽ Ki + món này ở góc để bé vẫn phân biệt các bộ.
 */
export const OUTFIT_ACCESSORY: Record<string, string> = {
  'police-uniform': 'police-car-light',
  'safari-explorer': 'compass',
  doctor: 'stethoscope',
  chef: 'cooking',
  graduate: 'graduation-cap',
  'party-time': 'party-popper',
  pyjamas: 'teddy-bear',
  'football-kit': 'soccer-ball',
  pilot: 'airplane',
  raincoat: 'umbrella-with-rain-drops',
  firefighter: 'fire-engine',
}
