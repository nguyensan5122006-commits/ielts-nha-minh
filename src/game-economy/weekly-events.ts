/**
 * weekly-events.ts — SỰ KIỆN THEO TUẦN: GIẢI ĐẤU TUẦN & BOSS CẢ NHÀ
 * ----------------------------------------------------------------------------
 * Mỗi tuần (thứ Hai -> Chủ nhật, giờ VN):
 *   - Giải đấu tuần: 1 chủ đề Học vui xoay vòng. Ai có điểm cao nhất (làm bài
 *     15 câu tính giờ, làm lại bao nhiêu lần cũng được, lấy điểm cao nhất) nhận cúp + chuối.
 *   - Boss cả nhà: 1 con boss có thanh máu. Mỗi câu trả lời đúng ở trang Boss = 1 đòn.
 *     Hạ boss trong tuần -> ai góp sức đều nhận thưởng.
 * ----------------------------------------------------------------------------
 */
import type { BilingualText } from '../content/content-types'

/** Chủ đề xoay vòng cho giải đấu tuần (id chủ đề Học vui). */
export const TOURNAMENT_TOPIC_ROTATION = [
  'animals',
  'countries',
  'food-drinks',
  'jobs',
  'fruits-vegetables',
  'sports-hobbies',
  'household',
  'emotions',
  'vehicles',
  'places',
  'clothes',
  'nature',
  'body',
  'weather-seasons',
  'colors-shapes',
  'musical-instruments',
]

export function tournamentTopicOfWeek(weekNumber: number): string {
  return TOURNAMENT_TOPIC_ROTATION[weekNumber % TOURNAMENT_TOPIC_ROTATION.length]
}

export const TOURNAMENT_QUESTION_COUNT = 15
export const TOURNAMENT_SECONDS_PER_QUESTION = 10

export interface BossDefinition {
  emoji: string
  name: BilingualText
  taunt: BilingualText
}

export const BOSSES: BossDefinition[] = [
  { emoji: '🐉', name: { vi: 'Rồng Ngữ Pháp', en: 'Grammar Dragon' }, taunt: { vi: 'Ngươi không chia nổi động từ đâu!', en: "You can't conjugate a single verb!" } },
  { emoji: '👹', name: { vi: 'Quỷ Chính Tả', en: 'Spelling Ogre' }, taunt: { vi: 'Ta sẽ ăn hết chữ cái của ngươi!', en: 'I will eat all your letters!' } },
  { emoji: '🦑', name: { vi: 'Bạch Tuộc Từ Vựng', en: 'Vocab Kraken' }, taunt: { vi: '8 xúc tu, 8000 từ mới!', en: 'Eight arms, eight thousand words!' } },
  { emoji: '🤖', name: { vi: 'Robot Phát Âm', en: 'Pronunciation Bot' }, taunt: { vi: 'Bíp bíp... th-th-think!', en: 'Beep... th-th-think!' } },
  { emoji: '🧟', name: { vi: 'Thây Ma Thì Quá Khứ', en: 'Past Tense Zombie' }, taunt: { vi: 'Hôm qua ta đã... ăn não!', en: 'Yesterday I ... eated brains!' } },
  { emoji: '🦖', name: { vi: 'Khủng Long IELTS', en: 'IELTS Rex' }, taunt: { vi: 'Band 9 hay là thua!', en: 'Band 9 or bust!' } },
]

export function bossOfWeek(weekNumber: number): BossDefinition {
  return BOSSES[weekNumber % BOSSES.length]
}

/** Máu boss = 400 × số thành viên (tối thiểu 800). */
export function bossMaxHp(memberCount: number): number {
  return Math.max(800, 400 * memberCount)
}

/** Sát thương 1 đòn: 10, cộng thêm theo chuỗi trả lời đúng liên tiếp (tối đa +10). */
export function bossHitDamage(combo: number): number {
  return 10 + Math.min(10, combo)
}

/** Mỗi người tối đa bao nhiêu sát thương / ngày (để ai cũng có phần). */
export const BOSS_DAILY_DAMAGE_LIMIT = 400
