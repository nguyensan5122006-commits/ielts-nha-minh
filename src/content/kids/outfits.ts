/**
 * outfits.ts
 * ----------------------------------------------------------------------------
 * TỦ ĐỒ CỦA MASCOT (chú chó Corgi cảnh sát) trong khu trò chơi trẻ em.
 *
 * - 'police-uniform' là bộ đồ MẶC ĐỊNH (đồng phục cảnh sát cách điệu) — có sẵn từ đầu.
 * - 10 bộ còn lại mở khoá khi bé sưu tập đủ sticker của 1 chủ đề (xem outfitId trong kids-topics.ts).
 *   Mọi trang phục đều kiếm được bằng học, không mua, không quay thưởng (psych-kids luật 21–23).
 * - artistBrief: 1 dòng mô tả cho hoạ sĩ 3D (Blender) — tiếng Anh để gửi thẳng cho nhóm tài sản.
 *   Ảnh xuất ra: public/mascot/outfits/<id>-512.webp (theo hợp đồng tài sản, 01-ARCHITECTURE mục 6).
 *
 * Tên mascot chưa chốt → trong chữ hiển thị dùng token {mascot}, giao diện tự thay tên thật.
 *
 * Danh sách: police-uniform (mặc định) · safari-explorer · doctor · chef · graduate · party-time
 *            · pyjamas · football-kit · pilot · raincoat · firefighter
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content-types'

export interface KidsOutfit {
  id: string
  name: BilingualText
  /** Chủ đề mở khoá bộ đồ này. null = bộ mặc định, có sẵn từ đầu. */
  unlockTopicId: string | null
  /** Mô tả ngắn cho hoạ sĩ 3D: trang phục trông thế nào (giữ nguyên dáng Corgi, tư thế chào). */
  artistBrief: string
}

/** Bộ đồ mascot mặc khi bé chưa chọn gì (giá trị ban đầu của equippedOutfit). */
export const DEFAULT_OUTFIT_ID = 'police-uniform'

export const KIDS_OUTFITS: KidsOutfit[] = [
  {
    id: 'police-uniform',
    name: { vi: 'Đồng phục cảnh sát', en: 'Police uniform' },
    unlockTopicId: null,
    artistBrief: 'The main look: stylised Vietnamese police uniform with cap and badge, kept simple and friendly (no weapons).',
  },
  {
    id: 'safari-explorer',
    name: { vi: 'Nhà thám hiểm', en: 'Safari explorer' },
    unlockTopicId: 'animals',
    artistBrief: 'Khaki shirt with big pockets, round explorer hat, small binoculars on a strap round the neck.',
  },
  {
    id: 'doctor',
    name: { vi: 'Bác sĩ nhí', en: 'Little doctor' },
    unlockTopicId: 'body',
    artistBrief: 'White doctor coat, stethoscope round the neck, small heart badge on the pocket (no red cross symbol, no needles).',
  },
  {
    id: 'chef',
    name: { vi: 'Đầu bếp', en: 'Chef' },
    unlockTopicId: 'food',
    artistBrief: 'Tall white chef hat, white chef jacket, red neckerchief, holding a wooden spoon.',
  },
  {
    id: 'graduate',
    name: { vi: 'Tốt nghiệp', en: 'Graduate' },
    unlockTopicId: 'school',
    artistBrief: 'Black square graduation cap with a yellow tassel, short black gown, rolled certificate with a red ribbon.',
  },
  {
    id: 'party-time',
    name: { vi: 'Dự tiệc', en: 'Party time' },
    unlockTopicId: 'toys',
    artistBrief: 'Striped cone party hat, colourful bow tie, one balloon tied to the paw.',
  },
  {
    id: 'pyjamas',
    name: { vi: 'Đồ ngủ', en: 'Pyjamas' },
    unlockTopicId: 'home',
    artistBrief: 'Soft blue pyjamas with little yellow stars, floppy nightcap with a pompom, small teddy bear under one arm.',
  },
  {
    id: 'football-kit',
    name: { vi: 'Đồ đá bóng', en: 'Football kit' },
    unlockTopicId: 'sports',
    artistBrief: 'Football shirt and shorts in made-up team colours (no real club or country logos), long socks, ball under one paw.',
  },
  {
    id: 'pilot',
    name: { vi: 'Phi công', en: 'Pilot' },
    unlockTopicId: 'transport',
    artistBrief: 'Navy pilot jacket with a gold wing badge, pilot cap, aviator sunglasses pushed up on the forehead.',
  },
  {
    id: 'raincoat',
    name: { vi: 'Áo mưa', en: 'Raincoat' },
    unlockTopicId: 'weather',
    artistBrief: 'Bright yellow raincoat and matching rain hat, small rubber boots, holding a clear umbrella.',
  },
  {
    id: 'firefighter',
    name: { vi: 'Lính cứu hoả', en: 'Firefighter' },
    unlockTopicId: 'jobs',
    artistBrief: 'Red firefighter helmet and jacket with reflective stripes, holding a short hose (no fire or smoke shown).',
  },
]
