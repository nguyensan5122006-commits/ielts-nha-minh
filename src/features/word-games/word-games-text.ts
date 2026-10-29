/**
 * word-games-text.ts — CHỮ GIAO DIỆN CỦA KHU "TRÒ CHƠI CHỮ" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 * Dùng cho trang /play (sảnh), 2 trò mới (Nhìn ảnh đoán từ, Điền chữ còn thiếu),
 * màn chọn ván / kết quả / bảng kỷ lục dùng chung cho cả 5 trò.
 *
 *   const text = useWordGamesText()
 *   text('roundOf', { n: 3, total: 10 })   -> "Từ 3/10"
 *
 * Giọng văn (04-DESIGN-SYSTEM mục 11): xưng "bạn", câu ngắn, sai = "Chưa đúng" + bước tiếp theo,
 * không khen "giỏi quá / thiên tài".
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

export const WORD_GAMES_TEXT = {
  /* ---------- sảnh /play ---------- */
  hubTitle: { vi: 'Trò chơi chữ', en: 'Word games' },
  hubIntro: { vi: 'Mỗi ván vài phút, dùng chính những từ bạn đã học. Chơi một mình, so kỷ lục với cả nhà.', en: 'A few minutes per round, using the words you have learned. Play solo, compare records with the family.' },
  hubMascot: { vi: '{mascot} chọn từ trong bài bạn đã học trước nhé!', en: '{mascot} picks words from your lessons first!' },
  hubGames: { vi: '5 trò chơi', en: '5 games' },
  cardBest: { vi: 'Kỷ lục của bạn', en: 'Your best' },
  cardWeekLeader: { vi: 'Tuần này dẫn đầu', en: 'Leading this week' },
  cardNoBest: { vi: 'Chưa chơi', en: 'Not played yet' },
  cardNobodyWeek: { vi: 'Chưa ai chơi', en: 'Nobody yet' },
  cardPlay: { vi: 'Chơi', en: 'Play' },
  cardNew: { vi: 'Mới', en: 'New' },
  dailyDone: { vi: 'Hôm nay đã xong', en: 'Done for today' },
  dailyWaiting: { vi: 'Đang chờ bạn', en: 'Waiting for you' },
  dailyWeekSolved: { vi: 'Tuần này bạn đoán ra {n} ngày', en: 'You solved {n} days this week' },

  /* ---------- bảng kỷ lục gia đình ---------- */
  boardTitle: { vi: 'Bảng kỷ lục gia đình', en: 'Family records' },
  boardIntro: { vi: 'Điểm cao nhất tuần này của từng người. Thứ Hai bắt đầu tuần mới.', en: "Everyone's best score this week. A new week starts on Monday." },
  boardMember: { vi: 'Thành viên', en: 'Member' },
  boardAllTime: { vi: 'Kỷ lục mọi lúc', en: 'All-time record' },
  boardEmpty: { vi: 'Chưa có ai trong nhà', en: 'No family members yet' },
  boardWeeklyOff: { vi: 'Bảng tuần chưa bật trên máy chủ (cần chạy migration 0004).', en: 'Weekly board is not enabled on the server yet (migration 0004).' },
  boardDailyUnit: { vi: 'Đoán từ: số ngày đoán ra tuần này', en: 'Daily word: days solved this week' },
  boardLeader: { vi: 'Dẫn đầu', en: 'Leader' },
  boardIdle: { vi: '{n} người khác chưa chơi tuần này.', en: '{n} others have not played this week.' },
  boardError: { vi: 'Chưa tải được bảng kỷ lục — thử lại sau ít phút.', en: "Couldn't load the records — try again in a minute." },

  /* ---------- cột kỷ lục trong trang chơi ---------- */
  panelTitle: { vi: 'Kỷ lục', en: 'Records' },
  panelMine: { vi: 'Của bạn', en: 'Yours' },
  panelMineAll: { vi: 'Mọi lúc', en: 'All time' },
  panelMineWeek: { vi: 'Tuần này', en: 'This week' },
  panelWeek: { vi: 'Cả nhà tuần này', en: 'Family this week' },
  panelNobody: { vi: 'Tuần này chưa ai chơi — bạn mở hàng nhé.', en: 'No one has played this week — be the first.' },
  panelFamilyBest: { vi: 'Kỷ lục nhà: {n} · {name}', en: 'Family record: {n} · {name}' },
  panelRounds: { vi: '{n} ván', en: '{n} rounds' },
  panelDays: { vi: '{n} ngày đã chơi', en: '{n} days played' },

  /* ---------- màn chọn ván ---------- */
  setupTitle: { vi: 'Chọn ván chơi', en: 'Set up your round' },
  setupDifficulty: { vi: 'Độ khó', en: 'Difficulty' },
  diffEasy: { vi: 'Dễ', en: 'Easy' },
  diffMedium: { vi: 'Vừa', en: 'Medium' },
  diffHard: { vi: 'Khó', en: 'Hard' },
  diffEasyHint: { vi: 'Từ 3–5 chữ cái, ít chữ mồi', en: '3–5 letter words, few extra letters' },
  diffMediumHint: { vi: 'Từ 4–7 chữ cái · điểm ×1.5', en: '4–7 letter words · points ×1.5' },
  diffHardHint: { vi: 'Từ 6 chữ cái trở lên · điểm ×2', en: '6+ letter words · points ×2' },
  setupPace: { vi: 'Nhịp chơi', en: 'Pace' },
  paceRelaxed: { vi: 'Thong thả', en: 'Relaxed' },
  paceTimed: { vi: 'Tính giờ', en: 'Timed' },
  paceRelaxedHint: { vi: 'Không đồng hồ — nghĩ bao lâu cũng được.', en: 'No clock — take as long as you need.' },
  paceTimedHint: { vi: '{n} giây mỗi từ, trả lời nhanh được thêm điểm.', en: '{n} seconds per word, faster answers earn bonus points.' },
  setupFromLessons: { vi: '{n} từ lấy từ bài bạn đã học', en: '{n} words come from your lessons' },
  setupFromLevel: { vi: 'Bạn chưa học từ nào hợp độ khó này — dùng từ của level bạn đang học.', en: 'No learned words fit this level yet — using words from your current level.' },
  setupWords: { vi: '{n} từ mỗi ván', en: '{n} words per round' },
  setupStart: { vi: 'Bắt đầu', en: 'Start' },
  setupLoading: { vi: 'Đang chuẩn bị từ…', en: 'Preparing words…' },
  setupKeys: { vi: 'Gõ chữ trên bàn phím · Enter kiểm tra · Backspace xoá', en: 'Type letters · Enter to check · Backspace to delete' },

  /* ---------- trong ván ---------- */
  roundOf: { vi: 'Từ {n}/{total}', en: 'Word {n}/{total}' },
  score: { vi: 'Điểm', en: 'Score' },
  streak: { vi: '{n} từ đúng liền!', en: '{n} in a row!' },
  check: { vi: 'Kiểm tra', en: 'Check' },
  next: { vi: 'Từ tiếp theo', en: 'Next word' },
  finish: { vi: 'Xem kết quả', en: 'See results' },
  skip: { vi: 'Bỏ qua', en: 'Skip' },
  clear: { vi: 'Xoá hết', en: 'Clear' },
  quit: { vi: 'Dừng ván', en: 'Quit round' },
  hints: { vi: 'Gợi ý', en: 'Hints' },
  hintFirst: { vi: 'Chữ cái đầu', en: 'First letter' },
  hintLetter: { vi: 'Mở 1 chữ', en: 'Reveal a letter' },
  hintMeaning: { vi: 'Nghĩa tiếng Việt', en: 'Vietnamese meaning' },
  hintAudio: { vi: 'Nghe từ', en: 'Hear the word' },
  hintCost: { vi: '−25 điểm', en: '−25 pts' },
  hintFree: { vi: 'Miễn phí', en: 'Free' },
  hintUsed: { vi: 'Đã dùng', en: 'Used' },
  pictureAsk: { vi: 'Đây là gì trong tiếng Anh?', en: 'What is this in English?' },
  missingAsk: { vi: 'Điền chữ còn thiếu', en: 'Fill in the missing letters' },
  meaningLabel: { vi: 'Nghĩa', en: 'Meaning' },
  lettersCount: { vi: '{n} chữ cái', en: '{n} letters' },
  correct: { vi: 'Đúng rồi!', en: 'Correct!' },
  wrongRetry: { vi: 'Chưa đúng — thử lại 1 lần nữa', en: 'Not quite — one more try' },
  wrongReveal: { vi: 'Chưa đúng. Từ đúng là:', en: 'Not quite. The word is:' },
  timeUp: { vi: 'Hết giờ. Từ đúng là:', en: "Time's up. The word is:" },
  skipped: { vi: 'Đã bỏ qua. Từ đúng là:', en: 'Skipped. The word is:' },
  addedToReview: { vi: 'Đã đưa vào ôn tập', en: 'Added to your reviews' },
  listen: { vi: 'Nghe', en: 'Listen' },
  tilesLabel: { vi: 'Bàn chữ cái', en: 'Letter tiles' },
  slotsLabel: { vi: 'Ô chữ của bạn', en: 'Your answer' },

  /* ---------- kết quả ---------- */
  resultNewRecord: { vi: 'Kỷ lục mới!', en: 'New record!' },
  resultWeekBest: { vi: 'Điểm cao nhất tuần của bạn', en: 'Your best this week' },
  resultDone: { vi: 'Xong ván!', en: 'Round complete!' },
  statCorrect: { vi: 'Từ đúng', en: 'Correct' },
  statStreak: { vi: 'Chuỗi dài nhất', en: 'Best streak' },
  resultCorrect: { vi: '{n}/{total} từ đúng', en: '{n}/{total} correct' },
  resultStreak: { vi: 'Chuỗi dài nhất: {n}', en: 'Best streak: {n}' },
  resultBest: { vi: 'Kỷ lục của bạn: {n}', en: 'Your best: {n}' },
  resultReview: { vi: 'Từ cần ôn lại', en: 'Words to review' },
  resultAllRight: { vi: 'Không sai từ nào trong ván này.', en: 'No mistakes this round.' },
  resultPlayAgain: { vi: 'Chơi ván mới', en: 'Play again' },
  resultChange: { vi: 'Đổi cài đặt', en: 'Change settings' },
  resultBack: { vi: 'Về Trò chơi chữ', en: 'Back to word games' },
  resultOffline: { vi: 'Chưa lưu được điểm (mất mạng?) — điểm vẫn hiện ở đây.', en: "Couldn't save your score (offline?) — it's still shown here." },
  backToHub: { vi: 'Trò chơi chữ', en: 'Word games' },
} satisfies Record<string, { vi: string; en: string }>

export type WordGamesTextKey = keyof typeof WORD_GAMES_TEXT

/** Hook trả về hàm lấy chữ theo ngôn ngữ đang chọn (có thay {biến} và {mascot}). */
export function useWordGamesText(): (key: WordGamesTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = WORD_GAMES_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return fillMascotName(text)
    },
    [language],
  )
}
