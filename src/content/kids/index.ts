/**
 * index.ts — CỬA NGÕ của thư mục nội dung khu trẻ em.
 * Code nơi khác chỉ cần: import { KIDS_TOPICS, KIDS_SENTENCES, ... } from '../content/kids'
 *
 *   kids-topics.ts       16 chủ đề, ngân hàng từ Cambridge YLE (Starters / Movers / Flyers)
 *   kids-sentences.ts    mẫu câu cho trò Ghép câu
 *   kids-stories.ts      6 chương truyện "Tuần tra cùng {mascot}"
 *   kids-voice-lines.ts  mọi câu mascot nói (hướng dẫn, gợi ý, khen, nhắc nghỉ…) + danh sách 8 trò
 *   colour-commands.ts   30 lệnh cho trò Nghe lệnh tô màu
 *   outfits.ts           tủ đồ mascot (1 bộ mặc định + 10 bộ mở khoá)
 */
import type { KidsWord } from '../content-types'
import { KIDS_TOPICS } from './kids-topics'

export { KIDS_TOPICS } from './kids-topics'
export { KIDS_SENTENCES } from './kids-sentences'
export { KIDS_STORIES, KIDS_STORY_SERIES_TITLE } from './kids-stories'
export { KIDS_VOICE_LINES, KIDS_GAMES, getKidsVoiceLine } from './kids-voice-lines'
export type { KidsGameId, KidsVoiceCategory, KidsVoiceLine } from './kids-voice-lines'
export { KIDS_COLOUR_COMMANDS } from './colour-commands'
export type { KidsColourCommand } from './colour-commands'
export { KIDS_OUTFITS, DEFAULT_OUTFIT_ID } from './outfits'
export type { KidsOutfit } from './outfits'

/** Tất cả từ của mọi chủ đề, gộp thành 1 danh sách phẳng. */
export const ALL_KIDS_WORDS: KidsWord[] = KIDS_TOPICS.flatMap((topic) => topic.words)

/** Tra nhanh 1 từ theo id, VD KIDS_WORD_BY_ID['kids-animals-cat']. */
export const KIDS_WORD_BY_ID: Record<string, KidsWord> = Object.fromEntries(ALL_KIDS_WORDS.map((word) => [word.id, word]))

/** Mascot chưa có tên chính thức: mọi chữ có {mascot} đi qua hàm này trước khi hiện hoặc đọc. */
export function fillMascotName(text: string, mascotName: string): string {
  return text.split('{mascot}').join(mascotName)
}
