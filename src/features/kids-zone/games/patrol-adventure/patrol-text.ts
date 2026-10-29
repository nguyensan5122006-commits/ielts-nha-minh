/**
 * patrol-text.ts — CHỮ TRÊN MÀN HÌNH CỦA TRÒ "PHIÊU LƯU CÙNG KI" (2 ngôn ngữ)
 *   const text = usePatrolText()
 * Lời truyện + câu hỏi lấy từ content/kids/kids-stories.ts; lời Ki nói lấy từ kids-voice-lines.ts.
 * Luật viết: hướng dẫn ≤ 12 từ, không "Sai", không "giỏi quá / thông minh".
 * {mascot} được thay bằng tên thật (fillMascotName).
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  // bản đồ chương
  mapTitle: 'Tuần tra cùng {mascot}',
  mapHint: 'Chọn 1 nhiệm vụ. Xong chương nào nhận huy hiệu chương đó.',
  chapterLabel: (n: number) => `Chương ${n}`,
  chapterDone: 'Đã có huy hiệu',
  chapterNext: 'Nhiệm vụ mới',
  chapterLocked: 'Xong chương trước để mở',
  startChapter: (title: string) => `Bắt đầu: ${title}`,
  replayChapter: (title: string) => `Chơi lại: ${title}`,
  // trong chương
  sceneLabel: (scene: number, total: number) => `Cảnh ${scene}/${total}`,
  recapLabel: 'Nhớ lại',
  listenStory: 'Nghe lại truyện (R)',
  listenSlow: 'Nghe chậm',
  translate: 'Dịch',
  skip: 'Bỏ qua',
  listeningStory: 'Nghe truyện nhé…',
  skipHint: 'Muốn vào câu hỏi luôn? Bấm Bỏ qua',
  questionLabel: 'Câu hỏi',
  hearOption: (option: string) => `Nghe "${option}"`,
  next: 'Đi tiếp',
  correctBubbles: ['Đúng rồi', 'Chính xác', 'Đi tiếp thôi', 'Chuẩn luôn'],
  // huy hiệu
  badgeTitle: 'Huy hiệu mới',
  badgeChapter: (n: number) => `Huy hiệu chương ${n}`,
  badgeCollect: 'Nhận huy hiệu',
}

export type PatrolText = typeof VI

const EN: PatrolText = {
  mapTitle: 'Patrol with {mascot}',
  mapHint: 'Pick a mission. Finish a chapter to get its badge.',
  chapterLabel: (n) => `Chapter ${n}`,
  chapterDone: 'Badge collected',
  chapterNext: 'New mission',
  chapterLocked: 'Finish the chapter before',
  startChapter: (title) => `Start: ${title}`,
  replayChapter: (title) => `Play again: ${title}`,
  sceneLabel: (scene, total) => `Scene ${scene}/${total}`,
  recapLabel: 'Remember',
  listenStory: 'Hear the story again (R)',
  listenSlow: 'Listen slowly',
  translate: 'Vietnamese',
  skip: 'Skip',
  listeningStory: 'Listen to the story…',
  skipHint: 'Want the question now? Tap Skip',
  questionLabel: 'Question',
  hearOption: (option) => `Hear "${option}"`,
  next: 'Go on',
  correctBubbles: ['Yes', 'Exactly', "Let's go on", 'That is it'],
  badgeTitle: 'New badge',
  badgeChapter: (n) => `Chapter ${n} badge`,
  badgeCollect: 'Collect badge',
}

/** Thay {mascot} trong mọi chuỗi (kể cả chuỗi do hàm trả về). */
function withMascot(text: PatrolText): PatrolText {
  const result = {} as Record<string, unknown>
  for (const [key, value] of Object.entries(text)) {
    result[key] =
      typeof value === 'string'
        ? fillMascotName(value)
        : typeof value === 'function'
          ? (...args: unknown[]) => fillMascotName(String((value as (...a: unknown[]) => unknown)(...args)))
          : value
  }
  return result as PatrolText
}

const BY_LANGUAGE = { vi: withMascot(VI), en: withMascot(EN) }

export function usePatrolText(): PatrolText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
