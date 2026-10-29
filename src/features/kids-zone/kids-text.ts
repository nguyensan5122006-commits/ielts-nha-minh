/**
 * kids-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ HIỂN THỊ CỦA KHU TRẺ EM — 2 ngôn ngữ (theo nút VI/EN của web).
 *   const text = useKidsText()
 *   text.playOn                 -> "Chơi tiếp" / "Keep playing"
 *   text.starsLine(8, 10)       -> "8/10 câu đúng ngay lần đầu"
 *
 * Lời mascot NÓI (có giọng) nằm ở src/content/kids/kids-voice-lines.ts — luôn tiếng Việt
 * vì bé 9–11 tuổi hiểu hướng dẫn tiếng Việt nhanh nhất. File này chỉ là chữ trên nút,
 * tiêu đề, nhãn nhỏ — và vài câu khen có chèn tên từ (WORD_PRAISE).
 *
 * Luật viết (psych-kids mục 12 + design system mục 11):
 *   - hướng dẫn ≤ 12 từ · tiêu đề ≤ 6 từ · xưng "bạn", mascot tự xưng tên
 *   - không "thông minh / giỏi quá / thiên tài", không chữ IN HOA, không nhiều dấu "!"
 *   - không gây áp lực / tội lỗi khi bé nghỉ
 * {mascot} = tên mascot (đổi ở src/design-system/mascot-name.ts) — useKidsText tự thay.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'
import type { PraiseContext } from './game-engine/praise-picker'

const VI = {
  // chung
  back: 'Về sảnh',
  exitGame: 'Thoát (đã tự lưu)',
  mainSite: 'Trang chính',
  next: 'Tiếp',
  skip: 'Bỏ qua',
  listenAgain: 'Nghe lại',
  listenSlow: 'Nghe chậm',
  soundOn: 'Bật hiệu ứng âm thanh',
  soundOff: 'Tắt hiệu ứng âm thanh',
  hideText: 'Ẩn chữ',
  minutes: (m: number) => `${m} phút`,

  // sảnh
  hubGreeting: (name: string) => `Chào ${name}! Hôm nay chơi gì nào?`,
  playOn: 'Chơi tiếp',
  playOnHint: (game: string, due: number) => (due > 0 ? `${game} · ${due} từ cần ôn` : `${game} · học từ mới`),
  goalTitle: 'Hôm nay chơi mấy lượt?',
  goalOption: (n: number) => `${n} lượt`,
  goalProgress: (done: number, goal: number) => (done >= goal ? 'Xong mục tiêu hôm nay' : `Đã chơi ${done}/${goal} lượt`),
  todayPicks: 'Hôm nay chọn 1 trong 3',
  aboutMinutes: '≈ 3 phút',
  allGames: 'Tất cả trò chơi',
  comingSoon: 'Sắp có',
  stampCard: 'Tem tuần',
  stampGoal: (count: number, goal: number) => (count >= goal ? `Đủ ${goal} tem tuần này` : `${count}/${goal} tem tuần này`),
  weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  timeToday: (m: number) => `Hôm nay ${m} phút`,
  albumCard: 'Sổ sticker',
  albumCardHint: (collected: number, total: number) => `${collected}/${total} sticker`,
  wardrobeCard: 'Tủ đồ của {mascot}',
  wardrobeCardHint: (owned: number, total: number) => `${owned}/${total} bộ đồ`,
  learnCard: 'Học bài',
  learnCardHint: 'Lộ trình tiếng Anh',
  familyCard: 'Thử thách cả nhà',
  familyCardHint: (rounds: number, goal: number) => `Tuần này bạn góp ${rounds}/${goal} lượt`,

  // trong trò chơi
  progressLabel: 'Tiến độ lượt chơi',
  streakChip: (n: number) => `${n} câu đúng liền`,
  listenPrompt: 'Nghe rồi chọn hình đúng',
  hintFirstLetter: 'Chữ cái đầu',
  hintMeaning: 'Nghĩa',
  readyBubble: 'Nghe kĩ nhé',
  correctBubbles: ['Đúng rồi', 'Chuẩn luôn', 'Chính nó', 'Đúng từ này'],
  pictureLabel: (n: number) => `Hình ${n}`,
  revealTapHere: 'Bấm vào đây',

  // giới thiệu từ mới
  newWordBadge: 'Từ mới',

  // kết thúc lượt
  roundDoneTitle: 'Xong lượt rồi',
  goalDoneTitle: 'Xong mục tiêu hôm nay',
  roundCounter: (n: number, goal: number) => `Lượt ${n}/${goal}`,
  starsLine: (stars: number, total: number) => `${stars}/${total} câu đúng ngay lần đầu`,
  personalBest: 'Kỷ lục mới của bạn',
  personalBestOld: (best: number) => `Kỷ lục của bạn: ${best} sao`,
  bagTitle: 'Túi đồ từ vựng',
  bagHint: 'Bấm vào thẻ để nghe lại',
  tagNew: 'Mới',
  tagUp: 'Lên hộp',
  tagMastered: 'Thuộc rồi',
  playOneMore: 'Chơi thêm 1 lượt',
  doneForToday: 'Xong hôm nay',

  // sticker & trang phục
  stickerTitle: 'Sticker mới',
  stickerToAlbum: 'Cất vào sổ',
  outfitTitle: 'Trang phục mới',
  outfitTry: 'Mặc thử ngay',
  outfitLater: 'Để sau',

  // nhắc nghỉ mắt
  restTitle: 'Nghỉ mắt chút nhé?',
  restSummary: (words: number, stickers: number) =>
    stickers > 0 ? `Hôm nay: ${words} từ đã chơi · ${stickers} sticker mới` : `Hôm nay bạn đã chơi ${words} từ`,
  restStop: 'Nghỉ thôi',
  restOneMore: 'Chơi thêm 1 lượt',

  // sổ sticker
  albumTitle: 'Sổ sticker',
  albumTotal: (collected: number, total: number) => `${collected} / ${total} sticker`,
  albumMissing: 'Thuộc từ này để nhận sticker',
  albumOutfitReward: (outfit: string) => `Đủ bộ → mở trang phục "${outfit}"`,
  albumOutfitOwned: (outfit: string) => `Đã mở trang phục "${outfit}"`,
  albumTopics: 'Các chủ đề',

  // tủ đồ
  wardrobeTitle: 'Tủ đồ của {mascot}',
  wardrobeWearing: 'Đang mặc',
  wardrobeWear: 'Mặc bộ này',
  wardrobeLocked: (topic: string, collected: number, total: number) => `Đủ bộ sticker "${topic}": ${collected}/${total}`,
  wardrobeDefault: 'Có sẵn từ đầu',
}

export type KidsText = typeof VI

const EN: KidsText = {
  back: 'Back to lobby',
  exitGame: 'Exit (saved)',
  mainSite: 'Main site',
  next: 'Next',
  skip: 'Skip',
  listenAgain: 'Listen again',
  listenSlow: 'Listen slowly',
  soundOn: 'Turn sound effects on',
  soundOff: 'Turn sound effects off',
  hideText: 'Hide word',
  minutes: (m) => `${m} min`,

  hubGreeting: (name) => `Hi ${name}! What shall we play today?`,
  playOn: 'Keep playing',
  playOnHint: (game, due) => (due > 0 ? `${game} · ${due} words to review` : `${game} · new words`),
  goalTitle: 'How many rounds today?',
  goalOption: (n) => `${n} ${n === 1 ? 'round' : 'rounds'}`,
  goalProgress: (done, goal) => (done >= goal ? "Today's goal is done" : `${done}/${goal} rounds played`),
  todayPicks: 'Pick 1 of 3 today',
  aboutMinutes: '≈ 3 min',
  allGames: 'All games',
  comingSoon: 'Coming soon',
  stampCard: 'Stamp card',
  stampGoal: (count, goal) => (count >= goal ? `${goal} stamps this week` : `${count}/${goal} stamps this week`),
  weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  timeToday: (m) => `Today ${m} min`,
  albumCard: 'Sticker album',
  albumCardHint: (collected, total) => `${collected}/${total} stickers`,
  wardrobeCard: "{mascot}'s wardrobe",
  wardrobeCardHint: (owned, total) => `${owned}/${total} outfits`,
  learnCard: 'Lessons',
  learnCardHint: 'English learning path',
  familyCard: 'Family challenge',
  familyCardHint: (rounds, goal) => `You added ${rounds}/${goal} rounds this week`,

  progressLabel: 'Round progress',
  streakChip: (n) => `${n} in a row`,
  listenPrompt: 'Listen, then tap the right picture',
  hintFirstLetter: 'First letter',
  hintMeaning: 'Meaning',
  readyBubble: 'Listen carefully',
  correctBubbles: ['Yes', 'That is it', 'Right one', 'Got it'],
  pictureLabel: (n) => `Picture ${n}`,
  revealTapHere: 'Tap here',

  newWordBadge: 'New word',

  roundDoneTitle: 'Round done',
  goalDoneTitle: "Today's goal is done",
  roundCounter: (n, goal) => `Round ${n}/${goal}`,
  starsLine: (stars, total) => `${stars}/${total} right on the first try`,
  personalBest: 'New personal best',
  personalBestOld: (best) => `Your best: ${best} stars`,
  bagTitle: 'Word bag',
  bagHint: 'Tap a card to hear it again',
  tagNew: 'New',
  tagUp: 'Moved up',
  tagMastered: 'Learned',
  playOneMore: 'One more round',
  doneForToday: 'Done for today',

  stickerTitle: 'New sticker',
  stickerToAlbum: 'Put in album',
  outfitTitle: 'New outfit',
  outfitTry: 'Try it on',
  outfitLater: 'Later',

  restTitle: 'Time to rest your eyes?',
  restSummary: (words, stickers) => (stickers > 0 ? `Today: ${words} words played · ${stickers} new stickers` : `Today you played ${words} words`),
  restStop: "Let's rest",
  restOneMore: 'One more round',

  albumTitle: 'Sticker album',
  albumTotal: (collected, total) => `${collected} / ${total} stickers`,
  albumMissing: 'Learn this word to get the sticker',
  albumOutfitReward: (outfit) => `Full set → unlocks "${outfit}"`,
  albumOutfitOwned: (outfit) => `Unlocked "${outfit}"`,
  albumTopics: 'Topics',

  wardrobeTitle: "{mascot}'s wardrobe",
  wardrobeWearing: 'Wearing',
  wardrobeWear: 'Wear this',
  wardrobeLocked: (topic, collected, total) => `Full "${topic}" sticker set: ${collected}/${total}`,
  wardrobeDefault: 'Ready from the start',
}

/** Thay {mascot} trong mọi chuỗi (kể cả chuỗi do hàm trả về). */
function withMascotName(text: KidsText): KidsText {
  const result = {} as Record<string, unknown>
  for (const [key, value] of Object.entries(text)) {
    result[key] =
      typeof value === 'string'
        ? fillMascotName(value)
        : typeof value === 'function'
          ? (...args: unknown[]) => fillMascotName(String((value as (...a: unknown[]) => unknown)(...args)))
          : value
  }
  return result as KidsText
}

const BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

/** Chữ khu trẻ em theo ngôn ngữ đang chọn. */
export function useKidsText(): KidsText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}

/** Câu khen có chèn tên từ — cụ thể nhất, ưu tiên dùng trước (mỗi mẫu 1 lần / buổi). Mascot nói tiếng Việt. */
export const WORD_PRAISE: { id: string; text: string; when: (c: PraiseContext) => boolean }[] = [
  {
    id: 'kids-praise-word-hidden',
    text: 'Không nhìn chữ mà vẫn nghe ra từ {word}.',
    when: (c) => c.textHidden && c.wrongCount === 0 && c.gameId === 'listen-tap',
  },
  {
    id: 'kids-praise-word-week',
    text: 'Bạn vẫn nhớ từ {word} sau cả tuần.',
    when: (c) => c.wrongCount === 0 && (c.boxBefore ?? 0) >= 3,
  },
  {
    id: 'kids-praise-word-new',
    text: 'Từ {word} mới học mà bạn đã nhận ra ngay.',
    when: (c) => c.wrongCount === 0 && c.boxBefore === null && c.itemKind === 'repeat',
  },
  {
    id: 'kids-praise-word-comeback',
    text: 'Lần trước từ {word} hơi khó, lần này bạn chọn đúng luôn.',
    when: (c) => c.wrongCount === 0 && c.missedLastTime,
  },
]
