/**
 * skill-listening-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ GIAO DIỆN CỦA TRÌNH NGHE (Listening task) — 2 ngôn ngữ theo nút VI/EN.
 *   const text = useListeningText()
 *   text('segmentLabel', { n: 2 })   -> "Đoạn 2"
 * Nội dung bài nghe (lời thoại, câu hỏi) luôn là tiếng Anh — không nằm ở đây.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { useLanguage } from '../../translations/language-context'

const LISTENING_TEXT = {
  eyebrow: { vi: 'Luyện nghe IELTS', en: 'IELTS Listening' },
  eyebrowGeneral: { vi: 'Luyện nghe', en: 'Listening practice' },
  questionsCount: { vi: '{n} câu hỏi', en: '{n} questions' },
  segmentsCount: { vi: '{n} đoạn nghe', en: '{n} recordings' },
  minutesAbout: { vi: 'khoảng {n} phút', en: 'about {n} min' },
  modeGroup: { vi: 'Chọn cách làm bài', en: 'Choose how to practise' },
  practiceTitle: { vi: 'Luyện thoải mái', en: 'Relaxed practice' },
  practicePoint1: { vi: 'Nghe lại từng đoạn bao nhiêu lần cũng được', en: 'Replay any recording as often as you like' },
  practicePoint2: { vi: 'Tua 5 giây, tốc độ 0.75× – 1.25×', en: 'Skip 5 seconds, speed 0.75× – 1.25×' },
  practicePoint3: { vi: 'Nộp bài xong mới mở lời thoại', en: 'Transcript opens after you submit' },
  examTitle: { vi: 'Như thi thật', en: 'Like the real test' },
  examPoint1: { vi: 'Mỗi đoạn chỉ nghe 1 lần, phát liền mạch', en: 'Each recording plays once, back to back' },
  examPoint2: { vi: 'Không tạm dừng, không tua, tốc độ chuẩn', en: 'No pause, no rewind, normal speed' },
  examPoint3: { vi: 'Đọc trước câu hỏi trong lúc chờ', en: 'Read ahead while you wait' },
  strategy: { vi: 'Mẹo làm bài', en: 'Strategy' },
  start: { vi: 'Bắt đầu nghe', en: 'Start listening' },
  later: { vi: 'Để sau', en: 'Later' },

  /* trình phát */
  player: { vi: 'Trình phát', en: 'Audio player' },
  play: { vi: 'Phát', en: 'Play' },
  pause: { vi: 'Tạm dừng', en: 'Pause' },
  back5: { vi: 'Lùi 5 giây', en: 'Back 5 seconds' },
  forward5: { vi: 'Tới 5 giây', en: 'Forward 5 seconds' },
  speed: { vi: 'Tốc độ', en: 'Speed' },
  segmentLabel: { vi: 'Đoạn {n}', en: 'Recording {n}' },
  segmentQuestions: { vi: 'Câu {from}–{to}', en: 'Q{from}–{to}' },
  segmentQuestion: { vi: 'Câu {n}', en: 'Q{n}' },
  replaySegment: { vi: 'Nghe lại đoạn này', en: 'Replay this part' },
  playSegment: { vi: 'Nghe đoạn này', en: 'Play this part' },
  nowPlaying: { vi: 'Đang phát', en: 'Playing' },
  played: { vi: 'Đã nghe', en: 'Played' },
  notPlayed: { vi: 'Chưa nghe', en: 'Not played' },
  loading: { vi: 'Đang tải…', en: 'Loading…' },
  examOnce: { vi: 'Như thi thật: mỗi đoạn nghe 1 lần, phát liền mạch.', en: 'Real-test mode: each recording plays once, back to back.' },
  examPlaysLeft: { vi: 'Còn {n} lần nghe', en: '{n} play left' },
  examNoPlaysLeft: { vi: 'Đã nghe xong', en: 'Finished' },
  examStart: { vi: 'Bắt đầu phát', en: 'Start the recording' },
  examAllDone: { vi: 'Audio đã hết. Kiểm tra lại đáp án rồi nộp bài.', en: 'The recording has finished. Check your answers, then submit.' },
  audioPlayingStatus: { vi: 'Đang phát đoạn {n}', en: 'Playing recording {n}' },
  transcriptLocked: { vi: 'Lời thoại sẽ mở sau khi nộp bài', en: 'The transcript opens after you submit' },
  transcriptLockedHint: { vi: 'Nghe trước, đọc sau — để tai quen với tốc độ thật.', en: 'Listen first, read later — it trains your ear for real speed.' },
  transcript: { vi: 'Lời thoại', en: 'Transcript' },
  shortcutsHint: { vi: 'Space: phát/dừng · R: nghe lại đoạn · Shift + ←/→: tua 5 giây · Alt + F: gắn cờ · Alt + ←/→: câu trước/sau', en: 'Space: play/pause · R: replay part · Shift + ←/→: skip 5 s · Alt + F: flag · Alt + ←/→: previous/next' },

  /* câu hỏi + kết quả */
  questionsPane: { vi: 'Câu hỏi', en: 'Questions' },
  audioPane: { vi: 'Audio và lời thoại', en: 'Audio and transcript' },
  submitCheck: { vi: 'Kiểm tra & nộp', en: 'Review & submit' },
  continue: { vi: 'Tiếp tục', en: 'Continue' },
  retryWrong: { vi: 'Làm lại câu sai', en: 'Retry wrong answers' },
  retrying: { vi: 'Đang làm lại {n} câu sai — nghe lại đoạn cần thiết rồi sửa.', en: 'Retrying {n} questions — replay the parts you need.' },
  wentWellAll: { vi: 'Bạn nghe ra đủ {n}/{n} thông tin.', en: 'You caught all {n} details.' },
  wentWellType: { vi: 'Dạng "{type}" làm rất chắc ({c}/{t}).', en: 'Solid on "{type}" ({c}/{t}).' },
  wentWellSome: { vi: 'Bạn đã nghe ra {c} chi tiết — giữ cách tập trung đó cho các đoạn sau.', en: 'You caught {c} details — keep that focus for the next parts.' },
  improveBlank: { vi: 'Còn {n} câu bỏ trống — cứ đoán, IELTS không trừ điểm câu sai.', en: 'Blank answers: {n} — always guess, there is no penalty.' }, // (QA) tránh "1 blanks"
  improveSpelling: { vi: '{n} câu gần đúng: chú ý chính tả, số ít/số nhiều.', en: 'Near misses: {n} — check spelling and plurals.' },
  improveListenAgain: { vi: 'Bấm "Nghe từ đoạn này" ở câu sai, nghe lại 2 lần trong khi nhìn lời thoại.', en: 'Use "Listen from here" on wrong answers and replay twice while reading.' },
  summaryLine: { vi: 'Bạn nghe ra {c}/{t} thông tin', en: 'You caught {c}/{t} details' },
} satisfies Record<string, { vi: string; en: string }>

export type ListeningTextKey = keyof typeof LISTENING_TEXT

export function useListeningText(): (key: ListeningTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = LISTENING_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return text
    },
    [language],
  )
}

/** Câu tóm tắt song ngữ cho màn kết quả của trình học. */
export function listeningSummary(correct: number, total: number) {
  return {
    vi: LISTENING_TEXT.summaryLine.vi.replace('{c}', String(correct)).replace('{t}', String(total)),
    en: LISTENING_TEXT.summaryLine.en.replace('{c}', String(correct)).replace('{t}', String(total)),
  }
}
