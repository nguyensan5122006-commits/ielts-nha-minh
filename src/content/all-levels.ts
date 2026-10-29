/**
 * all-levels.ts
 * ----------------------------------------------------------------------------
 * "MỤC LỤC" CỦA KHOÁ HỌC v3: 3 LEVEL, MỖI LEVEL GỒM NHIỀU CHẶNG (UNIT).
 *
 *   level-1  0 – 2.0   Pre-A1 – A1   Khởi động
 *   level-2  2.0 – 4.0 A1 – A2       Nền tảng
 *   level-3  4.0 – 6.5 B1 – B2       Bứt phá 6.5
 *
 * Mỗi chặng (Unit) = 5–7 bài cùng 1 chủ đề, trộn các kỹ năng theo thứ tự:
 * từ vựng trước -> nghe / đọc -> nói / viết. Chặng chỉ lưu ID bài; nội dung bài
 * nằm trong lesson-registry.ts.
 *
 * 2 track (lộ trình):
 *   - 'general' (Tiếng Anh tổng quát) và 'ielts' (Luyện thi IELTS)
 *   - Chặng có tracks: ['general', 'ielts'] = DÙNG CHUNG cho cả 2 track.
 *   - Chặng riêng của từng track xếp xen kẽ theo số `order`.
 *
 * 100 bài cũ (Level 1 + Level 2 bản trước) được gom thành 18 chặng dùng chung,
 * GIỮ NGUYÊN id bài -> tiến độ cũ của người học tự khớp.
 * Chặng mới của các nhóm nội dung v3 được gắn ở khối "NỘI DUNG MỚI" cuối file.
 * ----------------------------------------------------------------------------
 */
import type { LevelId, LevelInfo, TrackId, Unit } from './content-types'
// chỉ lấy CHUỖI id bài test (file nhỏ) — import index-v3 sẽ kéo cả ngân hàng đề vào trang đầu
import { LEVEL_TEST_V3_IDS } from './exams/level-test-ids'
// chặng mới của các nhóm nội dung v3 (bài của các chặng này nằm trong lesson-registry.ts)
import { level2BridgeGeneralUnits } from './levels/level-2-bridge/general/units'
import { level2BridgeIeltsUnits } from './levels/level-2-bridge/ielts/units'
import { level3IeltsListeningReadingUnits } from './levels/level-3-ielts/listening-reading/units'
import { level3IeltsWritingSpeakingUnits } from './levels/level-3-ielts/writing-speaking/units'
import { level3GeneralUnits } from './levels/level-3-general/units'

const BOTH_TRACKS: TrackId[] = ['general', 'ielts']

/* ============================================================================
 * LEVEL 1 (0 – 2.0): 9 chặng dùng chung, 50 bài cũ
 * ========================================================================== */

const level1SharedUnits: Unit[] = [
  {
    id: 'u1-01-hello',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 1,
    title: { vi: 'Xin chào!', en: 'Hello!' },
    icon: 'waving-hand',
    canDo: {
      vi: 'Sau chặng này bạn có thể chào hỏi, nói tên, tuổi, quê mình và đánh vần tên của bạn bằng tiếng Anh.',
      en: 'After this unit, you can say hello, give your name, age and hometown, and spell your name in English.',
    },
    lessonIds: ['l1-vocab-01', 'l1-listen-01', 'l1-read-02', 'l1-speak-01', 'l1-write-01'],
  },
  {
    id: 'u1-02-people',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 2,
    title: { vi: 'Những người thân quen', en: 'People in my life' },
    icon: 'people-hugging',
    canDo: {
      vi: 'Sau chặng này bạn có thể giới thiệu các thành viên gia đình, tả ngoại hình và trang phục của một người.',
      en: 'After this unit, you can introduce your family and describe what a person looks like and wears.',
    },
    lessonIds: ['l1-vocab-02', 'l1-vocab-06', 'l1-listen-03', 'l1-read-06', 'l1-speak-02', 'l1-write-02', 'l1-write-07'],
  },
  {
    id: 'u1-03-numbers-time',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 3,
    title: { vi: 'Số, giờ và ngày tháng', en: 'Numbers, times & dates' },
    icon: 'calendar',
    canDo: {
      vi: 'Sau chặng này bạn có thể nghe và ghi đúng số điện thoại, giá tiền, giờ, ngày; đọc thời gian biểu đơn giản.',
      en: 'After this unit, you can catch phone numbers, prices, times and dates, and read a simple timetable.',
    },
    lessonIds: ['l1-vocab-03', 'l1-listen-02', 'l1-listen-04', 'l1-listen-08', 'l1-read-03', 'l1-write-08'],
  },
  {
    id: 'u1-04-my-day',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 4,
    title: { vi: 'Một ngày của tôi', en: 'My day' },
    icon: 'alarm-clock',
    canDo: {
      vi: 'Sau chặng này bạn có thể kể và viết một đoạn ngắn về thói quen hằng ngày bằng thì hiện tại đơn.',
      en: 'After this unit, you can talk and write a short paragraph about your daily routine in the present simple.',
    },
    lessonIds: ['l1-vocab-04', 'l1-listen-10', 'l1-read-01', 'l1-speak-04', 'l1-write-04', 'l1-write-05', 'l1-write-10'],
  },
  {
    id: 'u1-05-home-town',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 5,
    title: { vi: 'Nhà và thị trấn', en: 'Home & town' },
    icon: 'house',
    canDo: {
      vi: 'Sau chặng này bạn có thể tả ngôi nhà, căn phòng của bạn và hiểu lời chỉ đường đơn giản.',
      en: 'After this unit, you can describe your home and your room, and follow simple directions around town.',
    },
    lessonIds: ['l1-vocab-05', 'l1-listen-05', 'l1-read-09', 'l1-speak-05', 'l1-write-06'],
  },
  {
    id: 'u1-06-food',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 6,
    title: { vi: 'Đồ ăn và thức uống', en: 'Food & drinks' },
    icon: 'fork-and-knife-with-plate',
    canDo: {
      vi: 'Sau chặng này bạn có thể đọc thực đơn, gọi đồ ở quán cà phê và nói món mình thích, kèm lý do.',
      en: 'After this unit, you can read a menu, order in a café and say what food you like and why.',
    },
    lessonIds: ['l1-vocab-07', 'l1-listen-06', 'l1-read-05', 'l1-speak-06', 'l1-write-03'],
  },
  {
    id: 'u1-07-weather',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 7,
    title: { vi: 'Thời tiết và các mùa', en: 'Weather & seasons' },
    icon: 'sun-behind-cloud',
    canDo: {
      vi: 'Sau chặng này bạn có thể nghe bản tin thời tiết, nói về mùa yêu thích và viết email ngắn cho bạn bè.',
      en: 'After this unit, you can understand a weather report, talk about your favourite season and write a short email to a friend.',
    },
    lessonIds: ['l1-vocab-09', 'l1-listen-09', 'l1-read-07', 'l1-speak-07', 'l1-write-09'],
  },
  {
    id: 'u1-08-free-time',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 8,
    title: { vi: 'Thời gian rảnh và cuối tuần', en: 'Free time & weekends' },
    icon: 'soccer-ball',
    canDo: {
      vi: 'Sau chặng này bạn có thể kể chuyện cuối tuần bằng thì quá khứ đơn và làm dạng True / False / Not Given đầu tiên.',
      en: 'After this unit, you can tell people about your weekend in the past simple and try your first True / False / Not Given task.',
    },
    lessonIds: ['l1-vocab-10', 'l1-listen-07', 'l1-read-04', 'l1-read-10', 'l1-speak-09'],
  },
  {
    id: 'u1-09-all-about-me',
    levelId: 'level-1',
    tracks: BOTH_TRACKS,
    order: 9,
    title: { vi: 'Tất cả về tôi', en: 'All about me' },
    icon: 'bust-in-silhouette',
    canDo: {
      vi: 'Sau chặng này bạn có thể đặt câu hỏi Wh-, nói về sức khoẻ, sở thích và trả lời IELTS Speaking Part 1 về quê hương, công việc.',
      en: 'After this unit, you can ask Wh- questions, talk about your health and likes, and answer IELTS Speaking Part 1 about your hometown and work.',
    },
    lessonIds: ['l1-vocab-08', 'l1-read-08', 'l1-speak-03', 'l1-speak-08', 'l1-speak-10'],
  },
]

/* ============================================================================
 * LEVEL 2 (2.0 – 4.0): 9 chặng dùng chung (50 bài cũ, phần 2.0 – 3.0)
 *                      + chặng mới phần 3.0 – 4.0 (nhóm level-2-bridge) ở cuối file
 * ========================================================================== */

const level2SharedUnits: Unit[] = [
  {
    id: 'u2-01-food-cooking',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 1,
    title: { vi: 'Ẩm thực và nấu nướng', en: 'Food & cooking' },
    icon: 'cooking',
    canDo: {
      vi: 'Sau chặng này bạn có thể đọc lướt tìm ý chính, đọc công thức nấu ăn và nói về thói quen ăn uống của mình.',
      en: 'After this unit, you can skim for the main idea, follow a recipe and talk about your eating habits.',
    },
    lessonIds: ['l2-vocab-01', 'l2-read-01', 'l2-read-05', 'l2-speak-03', 'l2-write-01'],
  },
  {
    id: 'u2-02-home-hometown',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 2,
    title: { vi: 'Nhà và quê hương', en: 'Home & hometown' },
    icon: 'house-with-garden',
    canDo: {
      vi: 'Sau chặng này bạn có thể điền mẫu đơn khi nghe (tên, địa chỉ, email) và nói về quê hương, ngôi nhà bằng câu trả lời dài hơn.',
      en: 'After this unit, you can complete a form while listening (names, addresses, emails) and give longer answers about your hometown and home.',
    },
    lessonIds: ['l2-vocab-07', 'l2-listen-01', 'l2-listen-02', 'l2-speak-01', 'l2-speak-02', 'l2-write-03', 'l2-write-07'],
  },
  {
    id: 'u2-03-shopping',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 3,
    title: { vi: 'Mua sắm và tiền bạc', en: 'Shopping & money' },
    icon: 'shopping-bags',
    canDo: {
      vi: 'Sau chặng này bạn có thể nghe giá tiền, ngày tháng (cả khi người nói tự sửa), đọc quét quảng cáo và kể về món đồ vừa mua.',
      en: 'After this unit, you can catch prices and dates (even when speakers correct themselves), scan an advert and describe something you bought.',
    },
    lessonIds: ['l2-vocab-02', 'l2-listen-03', 'l2-read-02', 'l2-speak-08', 'l2-write-02'],
  },
  {
    id: 'u2-04-health',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 4,
    title: { vi: 'Sức khoẻ và thể dục', en: 'Health & fitness' },
    icon: 'stethoscope',
    canDo: {
      vi: 'Sau chặng này bạn có thể đặt lịch khám, đăng ký phòng tập, chọn tiêu đề cho đoạn văn và đưa lời khuyên với should / must.',
      en: "After this unit, you can book a doctor's appointment, join a gym, match headings to paragraphs and give advice with should / must.",
    },
    lessonIds: ['l2-vocab-05', 'l2-listen-05', 'l2-listen-06', 'l2-read-04', 'l2-write-05'],
  },
  {
    id: 'u2-05-free-time',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 5,
    title: { vi: 'Sở thích và bạn bè', en: 'Free time & friends' },
    icon: 'artist-palette',
    canDo: {
      vi: 'Sau chặng này bạn có thể nói về sở thích, kể lại cuối tuần và viết email mời / cảm ơn bạn bè có dùng từ nối.',
      en: 'After this unit, you can talk about hobbies, describe last weekend and write an email to invite or thank a friend using linking words.',
    },
    lessonIds: ['l2-vocab-06', 'l2-read-03', 'l2-speak-04', 'l2-write-06', 'l2-write-09'],
  },
  {
    id: 'u2-06-weather-travel',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 6,
    title: { vi: 'Thời tiết và đi lại', en: 'Weather & getting around' },
    icon: 'bus',
    canDo: {
      vi: 'Sau chặng này bạn có thể hiểu bản đồ, chỉ đường, thông báo ở nhà ga và so sánh các phương tiện, các mùa trong năm.',
      en: 'After this unit, you can follow maps, directions and station announcements, and compare types of transport and seasons.',
    },
    lessonIds: ['l2-vocab-03', 'l2-vocab-04', 'l2-listen-08', 'l2-listen-10', 'l2-read-07', 'l2-speak-05', 'l2-speak-06'],
  },
  {
    id: 'u2-07-holidays',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 7,
    title: { vi: 'Kỳ nghỉ và lễ hội', en: 'Holidays & festivals' },
    icon: 'red-paper-lantern',
    canDo: {
      vi: 'Sau chặng này bạn có thể đoán trước loại đáp án khi nghe, nhận ra cách diễn đạt khác (paraphrase) và kể về một chuyến đi.',
      en: 'After this unit, you can predict answers before you listen, spot paraphrases and describe a trip or a festival.',
    },
    lessonIds: ['l2-vocab-10', 'l2-listen-04', 'l2-listen-07', 'l2-listen-09', 'l2-read-08', 'l2-speak-09'],
  },
  {
    id: 'u2-08-school',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 8,
    title: { vi: 'Trường lớp và học tập', en: 'School & study' },
    icon: 'graduation-cap',
    canDo: {
      vi: 'Sau chặng này bạn có thể đọc bản tin trường học, nhận ra từ đồng nghĩa và viết đoạn văn có câu chủ đề rõ ràng.',
      en: 'After this unit, you can read a school newsletter, recognise synonyms and write a paragraph with a clear topic sentence.',
    },
    lessonIds: ['l2-vocab-09', 'l2-read-06', 'l2-read-09', 'l2-speak-07', 'l2-write-08'],
  },
  {
    id: 'u2-09-work-plans',
    levelId: 'level-2',
    tracks: BOTH_TRACKS,
    order: 9,
    title: { vi: 'Công việc và kế hoạch', en: 'Work & future plans' },
    icon: 'briefcase',
    canDo: {
      vi: 'Sau chặng này bạn có thể nói 1 phút về một người hay một nơi (Part 2), viết về kế hoạch và mô tả số liệu đơn giản (Task 1).',
      en: 'After this unit, you can speak for one minute about a person or place (Part 2), write about your plans and describe simple data (Task 1).',
    },
    lessonIds: ['l2-vocab-08', 'l2-read-10', 'l2-speak-10', 'l2-write-04', 'l2-write-10'],
  },
]

/* ============================================================================
 * NỘI DUNG MỚI (v3) — chặng của các nhóm nội dung
 * Số order: chặng dùng chung Level 2 là 1–9, chặng riêng phần 3.0 – 4.0 là 20+ (đi sau).
 * Level 3: general 1, 3, 5, 7, 9; ielts 10–17 (mỗi track chỉ thấy chặng của mình).
 * ========================================================================== */

/** Level 2 phần 3.0 – 4.0: general (giao tiếp) + ielts (làm quen dạng đề). */
const level2BridgeUnits: Unit[] = [...level2BridgeGeneralUnits, ...level2BridgeIeltsUnits]
/** Level 3 (4.0 – 6.5): IELTS (nghe-đọc, viết-nói) + general (B1–B2). */
const level3Units: Unit[] = [...level3IeltsListeningReadingUnits, ...level3IeltsWritingSpeakingUnits, ...level3GeneralUnits]

/* ============================================================================
 * 3 LEVEL
 * ========================================================================== */

export const ALL_LEVELS_V3: LevelInfo[] = [
  {
    id: 'level-1',
    order: 1,
    bandRange: '0 – 2.0',
    cefr: 'Pre-A1 – A1',
    title: { vi: 'Khởi động', en: 'Starter' },
    goals: {
      vi: 'Làm quen tiếng Anh từ con số 0: chào hỏi, giới thiệu bản thân, số đếm, gia đình, thói quen hằng ngày. Viết câu đơn đúng ngữ pháp, nghe hiểu tên, số, giờ.',
      en: 'Start English from zero: greetings, introducing yourself, numbers, family, daily routines. Write correct simple sentences and catch names, numbers and times when listening.',
    },
    units: level1SharedUnits,
    levelTestId: LEVEL_TEST_V3_IDS['level-1'], // bài test level v3 (bài cũ 'level-1-test' vẫn còn trong ALL_EXAMS)
  },
  {
    id: 'level-2',
    order: 2,
    bandRange: '2.0 – 4.0',
    cefr: 'A1 – A2',
    title: { vi: 'Nền tảng', en: 'Foundation' },
    goals: {
      vi: 'Nắm thì hiện tại, quá khứ, tương lai gần và so sánh; ~1500 từ chủ đề quen thuộc. Đọc bài 200–400 từ, nghe hội thoại và thông báo, nói 1 phút liền mạch, viết đoạn văn có liên kết. Track IELTS làm quen đủ các dạng câu hỏi.',
      en: 'Present, past and future forms, comparisons and ~1,500 everyday words. Read 200–400 word texts, follow conversations and announcements, speak for a minute and write linked paragraphs. The IELTS track meets every question type.',
    },
    units: [...level2SharedUnits, ...level2BridgeUnits],
    levelTestId: LEVEL_TEST_V3_IDS['level-2'],
  },
  {
    id: 'level-3',
    order: 3,
    bandRange: '4.0 – 6.5',
    cefr: 'B1 – B2',
    title: { vi: 'Bứt phá 6.5', en: 'Road to 6.5' },
    goals: {
      vi: 'Track IELTS: luyện từng dạng đề Nghe/Đọc có giờ, Writing Task 1 + 2 và Speaking Part 1–3 theo band descriptors để đạt 6.5. Track tổng quát: giao tiếp công việc, phim, báo ở trình độ B1–B2.',
      en: 'IELTS track: timed Listening/Reading question types, Writing Task 1 + 2 and Speaking Parts 1–3 against the band descriptors to reach 6.5. General track: B1–B2 English for work, films and the news.',
    },
    units: level3Units,
    levelTestId: LEVEL_TEST_V3_IDS['level-3'],
  },
]

/** Thứ tự 3 level. */
export const LEVEL_ORDER: LevelId[] = ['level-1', 'level-2', 'level-3']

/** Tìm 1 level theo id ('level-1' | 'level-2' | 'level-3'). */
export function findLevelInfo(levelId: string | undefined): LevelInfo | undefined {
  return ALL_LEVELS_V3.find((level) => level.id === levelId)
}

/** Tất cả chặng của mọi level (cả 2 track). */
export function allUnits(): Unit[] {
  return ALL_LEVELS_V3.flatMap((level) => level.units)
}
