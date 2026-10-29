/**
 * units.ts — LEVEL 3 · TRACK GENERAL ("học để biết") — DANH SÁCH CHẶNG (UNIT)
 * ----------------------------------------------------------------------------
 * Level 3 = band 4.0 – 6.5 (CEFR B1 – B2). Track "general" = tiếng Anh dùng trong
 * đời thật (công việc, du lịch, tin tức, phim ảnh, đời sống), không áp lực thi cử.
 *
 * File này chỉ "xếp thứ tự" các bài: mỗi chặng có 5 bài theo đúng đường đi
 *   1) từ vựng + ngữ pháp (practice)  2) nghe  3) đọc  4) nói  5) viết
 * Nội dung bài nằm ở các file *-lessons.ts cùng thư mục.
 *
 * Danh sách chặng:
 *   u3-g01-work        Công việc & sự nghiệp          (icon briefcase)
 *   u3-g02-travel      Du lịch & xử lý sự cố           (icon luggage)
 *   u3-g03-news        Tin tức & bài báo               (icon newspaper)
 *   u3-g04-media       Phim, series, podcast & âm nhạc (icon clapper-board)
 *   u3-g05-daily-life  Đời sống & các mối quan hệ      (icon house)
 *
 * order dùng số lẻ 1, 3, 5, 7, 9 để chừa chỗ trống (2, 4, 6, 8) nếu sau này
 * có thêm chặng dùng chung cho cả 2 track xếp xen vào giữa.
 * ----------------------------------------------------------------------------
 */
import type { Unit } from '../../content-types'

export const level3GeneralUnits: Unit[] = [
  // Chặng 1: email công việc, họp, phỏng vấn, giới thiệu bản thân, nói chuyện xã giao nơi công sở
  {
    id: 'u3-g01-work',
    levelId: 'level-3',
    tracks: ['general'],
    order: 1,
    title: { vi: 'Công việc & sự nghiệp', en: 'Work & career' },
    icon: 'briefcase',
    canDo: {
      vi: 'Sau chặng này bạn có thể viết email công việc lịch sự, đồng ý hoặc phản đối khéo léo trong cuộc họp và giới thiệu bản thân khi phỏng vấn.',
      en: 'After this unit, you can write polite work emails, agree or disagree tactfully in meetings and present yourself in a job interview.',
    },
    lessonIds: ['l3-g-u1-vocab', 'l3-g-u1-listen', 'l3-g-u1-read', 'l3-g-u1-speak', 'l3-g-u1-write'],
  },

  // Chặng 2: đặt chỗ, phàn nàn, thất lạc hành lý, nhờ giúp đỡ, kể lại trải nghiệm du lịch
  {
    id: 'u3-g02-travel',
    levelId: 'level-3',
    tracks: ['general'],
    order: 3,
    title: { vi: 'Du lịch & xử lý sự cố', en: 'Travel & solving problems' },
    icon: 'luggage',
    canDo: {
      vi: 'Sau chặng này bạn có thể đặt chỗ, báo thất lạc hành lý, phàn nàn lịch sự mà rõ ràng và kể lại một chuyến đi.',
      en: 'After this unit, you can make bookings, report lost luggage, complain politely but clearly and describe a trip.',
    },
    lessonIds: ['l3-g-u2-vocab', 'l3-g-u2-listen', 'l3-g-u2-read', 'l3-g-u2-speak', 'l3-g-u2-write'],
  },

  // Chặng 3: đọc tin ngắn và bài bình luận, tóm tắt, phân biệt sự thật với ý kiến (không chính trị)
  {
    id: 'u3-g03-news',
    levelId: 'level-3',
    tracks: ['general'],
    order: 5,
    title: { vi: 'Tin tức & bài báo', en: 'News & articles' },
    icon: 'newspaper',
    canDo: {
      vi: 'Sau chặng này bạn có thể hiểu tin ngắn và bài bình luận, phân biệt sự thật với ý kiến và tóm tắt một tin trong vài câu.',
      en: 'After this unit, you can understand short news and opinion pieces, tell facts from opinions and summarise a story in a few sentences.',
    },
    lessonIds: ['l3-g-u3-vocab', 'l3-g-u3-listen', 'l3-g-u3-read', 'l3-g-u3-speak', 'l3-g-u3-write'],
  },

  // Chặng 4: nghe nói nhanh tự nhiên, nối âm, review phim, nói về sở thích, thành ngữ trên phim ảnh
  {
    id: 'u3-g04-media',
    levelId: 'level-3',
    tracks: ['general'],
    order: 7,
    title: { vi: 'Phim, series, podcast & âm nhạc', en: 'Films, series, podcasts & music' },
    icon: 'clapper-board',
    canDo: {
      vi: 'Sau chặng này bạn có thể theo kịp lời nói nhanh tự nhiên hơn, viết review phim và nói về gu giải trí của mình.',
      en: 'After this unit, you can follow fast natural speech more easily, write a film review and talk about your taste in entertainment.',
    },
    lessonIds: ['l3-g-u4-vocab', 'l3-g-u4-listen', 'l3-g-u4-read', 'l3-g-u4-speak', 'l3-g-u4-write'],
  },

  // Chặng 5: sức khoẻ, tiền bạc, công nghệ trong nhà, đưa lời khuyên, kể chuyện ở quá khứ
  {
    id: 'u3-g05-daily-life',
    levelId: 'level-3',
    tracks: ['general'],
    order: 9,
    title: { vi: 'Đời sống & các mối quan hệ', en: 'Daily life & relationships' },
    icon: 'house',
    canDo: {
      vi: 'Sau chặng này bạn có thể nói về sức khoẻ, tiền bạc và công nghệ trong nhà, đưa lời khuyên tự nhiên và kể chuyện ở quá khứ.',
      en: 'After this unit, you can talk about health, money and technology at home, give natural advice and tell stories in the past.',
    },
    lessonIds: ['l3-g-u5-vocab', 'l3-g-u5-listen', 'l3-g-u5-read', 'l3-g-u5-speak', 'l3-g-u5-write'],
  },
]
