/**
 * units.ts
 * ----------------------------------------------------------------------------
 * CÁC CHẶNG (UNIT) IELTS LISTENING + READING — LEVEL 3 (band 4.0 – 6.5), TRACK "ielts".
 *
 * Mỗi chặng = 5 bài theo đúng thứ tự trên lộ trình, kèm 1 câu "can-do"
 * (sau chặng này bạn làm được gì). Nội dung bài nằm ở:
 *   - listening-lessons.ts (chặng 10, 11)
 *   - reading-lessons.ts   (chặng 12, 13)
 *
 *   u3-i-lis-10-sections-1-2        : Listening Section 1–2 (form, bảng, trắc nghiệm, bản đồ, matching)
 *   u3-i-lis-11-sections-3-4        : Listening Section 3–4 (thảo luận học thuật, bài giảng)
 *   u3-i-read-12-tfng-matching      : Reading TFNG, YNNG, matching information
 *   u3-i-read-13-headings-completion: Reading headings, điền câu/tóm tắt, MCQ, short answer, bài có giờ
 *
 * icon = tên emoji Fluent (slug) — nhóm tài sản tải ảnh 3D theo tên này.
 * Kiểu dữ liệu: Unit trong src/content/content-types.ts (mục 7).
 * ----------------------------------------------------------------------------
 */
import type { Unit } from '../../../content-types'

export const level3IeltsListeningReadingUnits: Unit[] = [
  {
    id: 'u3-i-lis-10-sections-1-2',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 10,
    title: { vi: 'Listening Section 1–2: Tình huống đời sống', en: 'Listening Sections 1–2: Everyday situations' },
    icon: 'headphone',
    canDo: {
      vi: 'Bạn có thể nghe hội thoại và bài nói đời thường để điền form, điền bảng, chọn đáp án có bẫy, ghi chú bản đồ và nối thông tin.',
      en: 'I can follow everyday conversations and talks to complete forms and tables, answer tricky multiple choice, label a map and match information.',
    },
    lessonIds: ['l3-i-lis-10-01', 'l3-i-lis-10-02', 'l3-i-lis-10-03', 'l3-i-lis-10-04', 'l3-i-lis-10-05'],
  },
  {
    id: 'u3-i-lis-11-sections-3-4',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 11,
    title: { vi: 'Listening Section 3–4: Thảo luận và bài giảng', en: 'Listening Sections 3–4: Discussions and lectures' },
    icon: 'studio-microphone',
    canDo: {
      vi: 'Bạn có thể theo dõi thảo luận học thuật và bài giảng, nhận ra quyết định cuối cùng và dùng signposting để điền ghi chú, tóm tắt.',
      en: 'I can follow academic discussions and lectures, identify final decisions, and use signposting to complete notes and summaries.',
    },
    lessonIds: ['l3-i-lis-11-01', 'l3-i-lis-11-02', 'l3-i-lis-11-03', 'l3-i-lis-11-04', 'l3-i-lis-11-05'],
  },
  {
    id: 'u3-i-read-12-tfng-matching',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 12,
    title: { vi: 'Reading: True/False, Yes/No và nối thông tin', en: 'Reading: TFNG, YNNG and matching information' },
    icon: 'magnifying-glass-tilted-left',
    canDo: {
      vi: 'Bạn có thể nhận ra paraphrase, phân biệt FALSE với NOT GIVEN, xác định quan điểm tác giả và tìm đoạn chứa thông tin.',
      en: "I can spot paraphrase, tell FALSE from NOT GIVEN, identify the writer's views and find which paragraph contains information.",
    },
    lessonIds: ['l3-i-read-12-01', 'l3-i-read-12-02', 'l3-i-read-12-03', 'l3-i-read-12-04', 'l3-i-read-12-05'],
  },
  {
    id: 'u3-i-read-13-headings-completion',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 13,
    title: { vi: 'Reading: Tiêu đề, điền câu, trắc nghiệm, trả lời ngắn', en: 'Reading: Headings, completion, MCQ and short answer' },
    icon: 'open-book',
    canDo: {
      vi: 'Bạn có thể chọn tiêu đề đoạn, điền câu và tóm tắt đúng giới hạn từ, làm trắc nghiệm, trả lời ngắn và hoàn thành 1 passage trong 20 phút.',
      en: 'I can match headings, complete sentences and summaries within the word limit, answer MCQ and short-answer questions, and finish a passage in 20 minutes.',
    },
    lessonIds: ['l3-i-read-13-01', 'l3-i-read-13-02', 'l3-i-read-13-03', 'l3-i-read-13-04', 'l3-i-read-13-05'],
  },
]
