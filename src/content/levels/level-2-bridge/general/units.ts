/**
 * units.ts
 * ----------------------------------------------------------------------------
 * CÁC CHẶNG (UNIT) — LEVEL 2, PHẦN "CẦU NỐI" 3.0 – 4.0 (CEFR A2 → A2+) — TRACK TỔNG QUÁT
 *
 * Track "Tiếng Anh tổng quát" (general) = học để dùng tiếng Anh trong đời sống,
 * không áp lực thi cử. Các chặng này chỉ hiện ở track general (tracks: ['general']),
 * xếp SAU các chặng dùng chung 2.0 – 3.0 (order 20 trở đi).
 *
 * 4 chặng, mỗi chặng 5 bài theo đúng thứ tự trên đường đi:
 *   từ vựng + ngữ pháp → nghe → đọc → nói → viết
 *
 *   order 20  u2-g01-travel  Du lịch            (sân bay, khách sạn, hỏi đường, nhờ giúp đỡ)
 *   order 21  u2-g02-work    Công việc          (giới thiệu, lịch họp, email, điện thoại, small talk)
 *   order 22  u2-g03-school  Trường học         (môn học, bài tập, dự án; ngữ pháp chương trình phổ thông)
 *   order 23  u2-g04-media   Phim, nhạc, tin tức (thể loại, ý kiến, bản tin, giới thiệu phim)
 *   order 24  u2-g05-people-places  (thêm 29/10) Thành phố, thiên nhiên, gia đình + cụm động từ thường ngày
 *             — 4 bài TỪ VỰNG chủ đề IELTS còn thiếu (xem docs/redesign-v3/11-CONTENT-GAPS.md)
 *             + 1 bài NGHE ôn lại các từ đó (l2b-g-05-listen, nằm trong listening-lessons.ts)
 *
 * icon = tên emoji Fluent (dạng slug) — nhóm tài sản tải ảnh 3D theo tên này.
 * Nội dung bài nằm ở các file *-lessons.ts cùng thư mục.
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Unit } from '../../../content-types'

export const level2BridgeGeneralUnits: Unit[] = [
  {
    id: 'u2-g01-travel',
    levelId: 'level-2',
    tracks: ['general'],
    order: 20,
    title: { vi: 'Du lịch', en: 'Travel' },
    icon: 'airplane',
    canDo: {
      vi: 'Sau chặng này bạn có thể làm thủ tục ở sân bay và khách sạn, hỏi đường, và nhờ giúp đỡ một cách lịch sự.',
      en: 'After this unit, you can check in at an airport and a hotel, ask for directions and ask for help politely.',
    },
    lessonIds: ['l2b-g-01-vocab', 'l2b-g-01-listen', 'l2b-g-01-read', 'l2b-g-01-speak', 'l2b-g-01-write'],
  },
  {
    id: 'u2-g02-work',
    levelId: 'level-2',
    tracks: ['general'],
    order: 21,
    title: { vi: 'Công việc', en: 'At work' },
    icon: 'briefcase',
    canDo: {
      vi: 'Sau chặng này bạn có thể tự giới thiệu ở chỗ làm, nói về lịch họp, nghe điện thoại và viết một email công việc đơn giản.',
      en: 'After this unit, you can introduce yourself at work, talk about meetings, handle a phone call and write a simple work email.',
    },
    lessonIds: ['l2b-g-02-vocab', 'l2b-g-02-listen', 'l2b-g-02-read', 'l2b-g-02-speak', 'l2b-g-02-write'],
  },
  {
    id: 'u2-g03-school',
    levelId: 'level-2',
    tracks: ['general'],
    order: 22,
    title: { vi: 'Trường học', en: 'School life' },
    icon: 'school',
    canDo: {
      vi: 'Sau chặng này bạn có thể nói về môn học, bài tập và dự án nhóm, dùng hiện tại hoàn thành, so sánh và will / going to.',
      en: 'After this unit, you can talk about subjects, homework and group projects using the present perfect, comparisons and will / going to.',
    },
    lessonIds: ['l2b-g-03-vocab', 'l2b-g-03-listen', 'l2b-g-03-read', 'l2b-g-03-speak', 'l2b-g-03-write'],
  },
  {
    id: 'u2-g04-media',
    levelId: 'level-2',
    tracks: ['general'],
    order: 23,
    title: { vi: 'Phim, nhạc và tin tức', en: 'Films, music and news' },
    icon: 'clapper-board',
    canDo: {
      vi: 'Sau chặng này bạn có thể nói về phim và nhạc mình thích, đọc hiểu một bản tin ngắn và giới thiệu một bộ phim cho bạn bè.',
      en: 'After this unit, you can talk about films and music you like, understand a short news story and recommend a film to a friend.',
    },
    lessonIds: ['l2b-g-04-vocab', 'l2b-g-04-listen', 'l2b-g-04-read', 'l2b-g-04-speak', 'l2b-g-04-write'],
  },
  // (thêm 29/10) Chặng từ vựng: các chủ đề IELTS còn thiếu ở Level 2 + cụm động từ (phrasal verbs) hằng ngày.
  // Bài nằm ở topic-vocabulary-lessons.ts, phrasal-verb-lessons.ts và (bài nghe cuối chặng) listening-lessons.ts.
  {
    id: 'u2-g05-people-places',
    levelId: 'level-2',
    tracks: ['general'],
    order: 24,
    title: { vi: 'Thành phố, thiên nhiên và gia đình', en: 'Cities, nature and family' },
    icon: 'cityscape',
    canDo: {
      vi: 'Sau chặng này bạn có thể tả khu phố và thành phố của mình, nói về thiên nhiên, con vật, các mối quan hệ trong gia đình và dùng những cụm động từ hằng ngày.',
      en: 'After this unit, you can describe your neighbourhood and city, talk about nature, animals and family relationships, and use everyday phrasal verbs.',
    },
    lessonIds: ['l2b-g-05-city', 'l2b-g-05-nature', 'l2b-g-05-family', 'l2b-g-05-phrasal', 'l2b-g-05-listen'],
  },
]
