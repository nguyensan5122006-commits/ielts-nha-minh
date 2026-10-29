/**
 * units.ts — LEVEL 3 (band 4.0 – 6.5) · TRACK IELTS · CÁC CHẶNG WRITING + SPEAKING
 * ----------------------------------------------------------------------------
 * File này khai báo 4 chặng (unit) trên lộ trình IELTS của level 3:
 *   Chặng 14 — Writing Task 1 (biểu đồ đường, cột, tròn, bảng, quy trình)  → 5 bài l3-i-wri-01…05
 *   Chặng 15 — Writing Task 2 (opinion, discussion, ưu/nhược, nguyên nhân/giải pháp,
 *              đề 2 câu hỏi)                                               → 5 bài l3-i-wri-06…10
 *   Chặng 16 — Speaking Part 1 + Part 2                                    → 5 bài l3-i-spk-01…05
 *   Chặng 17 — Speaking Part 3 + bài thi nói thử trọn bộ                   → 5 bài l3-i-spk-06…10
 *
 * Mỗi chặng chỉ chứa id bài theo đúng thứ tự trên đường đi; nội dung bài nằm ở
 * writing-lessons.ts và speaking-lessons.ts cùng thư mục.
 * "order" là thứ tự chặng trong level 3 (các chặng của nhóm khác dùng số khác, xếp xen kẽ).
 * "icon" là tên ảnh 3D Fluent Emoji (nhóm tài sản tải ảnh theo tên này).
 * ----------------------------------------------------------------------------
 */
import type { Unit } from '../../../content-types'

export const level3IeltsWritingSpeakingUnits: Unit[] = [
  {
    id: 'u3-i-wri-14-task1',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 14,
    title: {
      vi: 'Writing Task 1: Mô tả biểu đồ và quy trình',
      en: 'Writing Task 1: Describing charts and processes',
    },
    icon: 'chart-increasing',
    canDo: {
      vi: 'Viết bài Task 1 khoảng 170 từ trong 20 phút, có overview rõ, nhóm số liệu hợp lý và so sánh chính xác cho 5 dạng đề.',
      en: 'Write a 170-word Task 1 report in 20 minutes with a clear overview, logical grouping and accurate comparisons for five task types.',
    },
    lessonIds: ['l3-i-wri-01', 'l3-i-wri-02', 'l3-i-wri-03', 'l3-i-wri-04', 'l3-i-wri-05'],
  },
  {
    id: 'u3-i-wri-15-task2',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 15,
    title: {
      vi: 'Writing Task 2: Viết bài luận',
      en: 'Writing Task 2: Essay writing',
    },
    icon: 'memo',
    canDo: {
      vi: 'Viết bài luận Task 2 khoảng 270 từ trong 40 phút, có luận điểm rõ, thân bài theo PEEL và trả lời đủ mọi phần của 5 dạng đề.',
      en: 'Write a 270-word Task 2 essay in 40 minutes with a clear position, PEEL body paragraphs and full answers to all five question types.',
    },
    lessonIds: ['l3-i-wri-06', 'l3-i-wri-07', 'l3-i-wri-08', 'l3-i-wri-09', 'l3-i-wri-10'],
  },
  {
    id: 'u3-i-spk-16-part1-2',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 16,
    title: {
      vi: 'Speaking Part 1 và Part 2',
      en: 'Speaking Parts 1 and 2',
    },
    icon: 'speaking-head',
    canDo: {
      vi: 'Trả lời Part 1 dài 2–4 câu tự nhiên và nói trọn 2 phút Part 2 theo dàn ý câu chuyện, ít ngập ngừng.',
      en: 'Give natural 2–4 sentence answers in Part 1 and speak for a full 2 minutes in Part 2 with a clear story structure and few hesitations.',
    },
    lessonIds: ['l3-i-spk-01', 'l3-i-spk-02', 'l3-i-spk-03', 'l3-i-spk-04', 'l3-i-spk-05'],
  },
  {
    id: 'u3-i-spk-17-part3-mock',
    levelId: 'level-3',
    tracks: ['ielts'],
    order: 17,
    title: {
      vi: 'Speaking Part 3 và thi nói thử',
      en: 'Speaking Part 3 and a mock test',
    },
    icon: 'studio-microphone',
    canDo: {
      vi: 'Thảo luận câu hỏi Part 3 bằng cách nêu quan điểm, so sánh, dự đoán và giải thích lý do, rồi làm trọn một bài thi nói thử.',
      en: 'Discuss Part 3 questions by giving opinions, comparing, speculating and explaining reasons, then complete a full mock speaking test.',
    },
    lessonIds: ['l3-i-spk-06', 'l3-i-spk-07', 'l3-i-spk-08', 'l3-i-spk-09', 'l3-i-spk-10'],
  },
]
