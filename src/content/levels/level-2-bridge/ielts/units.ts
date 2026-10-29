/**
 * units.ts
 * ----------------------------------------------------------------------------
 * CÁC CHẶNG (UNIT) — LEVEL 2, PHẦN "BRIDGE" (band 3.0 – 4.0), TRACK IELTS ("Làm quen IELTS")
 *
 * 4 chặng, mỗi chặng 5 bài, chỉ thuộc track 'ielts'. order 20–23 để đứng SAU các chặng
 * nền móng của level 2 (band 2.0 – 3.0) trên đường đi /learn.
 *   u2-i20-listening-intro  Làm quen IELTS Listening  (l2b-i-lis-01 … 05)
 *   u2-i21-reading-intro    Làm quen IELTS Reading    (l2b-i-read-01 … 05)
 *   u2-i22-writing-intro    Làm quen IELTS Writing    (l2b-i-wri-01 … 05)
 *   u2-i23-speaking-intro   Làm quen IELTS Speaking   (l2b-i-spk-01 … 05)
 *
 * icon = tên ảnh Fluent Emoji 3D (public/word-images/<icon>-128.webp, nhóm tài sản tải về).
 * Nội dung bài nằm trong listening-lessons.ts, reading-lessons.ts, writing-lessons.ts,
 * speaking-lessons.ts cùng thư mục. Kiểu dữ liệu: src/content/content-types.ts (mục 7).
 * ----------------------------------------------------------------------------
 */
import type { Unit } from '../../../content-types'

export const level2BridgeIeltsUnits: Unit[] = [
  {
    id: 'u2-i20-listening-intro',
    levelId: 'level-2',
    tracks: ['ielts'],
    order: 20,
    title: { vi: 'Làm quen IELTS Listening', en: 'Getting started with IELTS Listening' },
    icon: 'headphone',
    canDo: {
      vi: 'Sau chặng này bạn có thể làm một Part 1 IELTS Listening ngắn: điền form và ghi chú, bắt tên đánh vần, con số và tránh bẫy đổi ý.',
      en: 'After this unit you can do a short IELTS Listening Part 1: complete forms and notes, catch spelled names and numbers, and avoid distractors.',
    },
    lessonIds: ['l2b-i-lis-01', 'l2b-i-lis-02', 'l2b-i-lis-03', 'l2b-i-lis-04', 'l2b-i-lis-05'],
  },
  {
    id: 'u2-i21-reading-intro',
    levelId: 'level-2',
    tracks: ['ielts'],
    order: 21,
    title: { vi: 'Làm quen IELTS Reading', en: 'Getting started with IELTS Reading' },
    icon: 'open-book',
    canDo: {
      vi: 'Sau chặng này bạn có thể làm 5 dạng câu hỏi IELTS Reading cơ bản trên bài đọc 300–400 từ và tự canh giờ.',
      en: 'After this unit you can answer five basic IELTS Reading question types on a 300–400-word passage and manage your time.',
    },
    lessonIds: ['l2b-i-read-01', 'l2b-i-read-02', 'l2b-i-read-03', 'l2b-i-read-04', 'l2b-i-read-05'],
  },
  {
    id: 'u2-i22-writing-intro',
    levelId: 'level-2',
    tracks: ['ielts'],
    order: 22,
    title: { vi: 'Làm quen IELTS Writing', en: 'Getting started with IELTS Writing' },
    icon: 'memo',
    canDo: {
      vi: 'Sau chặng này bạn có thể viết bài Task 1 có overview cho biểu đồ đơn giản và một bài luận Task 2 nêu quan điểm theo bố cục 4 đoạn.',
      en: 'After this unit you can write a Task 1 answer with an overview for a simple chart and a four-paragraph Task 2 opinion essay.',
    },
    lessonIds: ['l2b-i-wri-01', 'l2b-i-wri-02', 'l2b-i-wri-03', 'l2b-i-wri-04', 'l2b-i-wri-05'],
  },
  {
    id: 'u2-i23-speaking-intro',
    levelId: 'level-2',
    tracks: ['ielts'],
    order: 23,
    title: { vi: 'Làm quen IELTS Speaking', en: 'Getting started with IELTS Speaking' },
    icon: 'speaking-head',
    canDo: {
      vi: 'Sau chặng này bạn có thể trả lời Part 1, nói khoảng 1 phút với thẻ đề Part 2 và nêu ý kiến ngắn trong Part 3, phát âm rõ âm cuối.',
      en: 'After this unit you can answer Part 1 questions, speak for about a minute in Part 2 and give short Part 3 opinions with clear final sounds.',
    },
    lessonIds: ['l2b-i-spk-01', 'l2b-i-spk-02', 'l2b-i-spk-03', 'l2b-i-spk-04', 'l2b-i-spk-05'],
  },
]
