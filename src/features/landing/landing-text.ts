/**
 * landing-text.ts
 * ----------------------------------------------------------------------------
 * CHỮ CỦA TRANG GIỚI THIỆU "/" (khách chưa đăng nhập) — 2 ngôn ngữ.
 *   const text = useLandingText()
 *   text.heroTitleLine1   -> "Cả nhà học tiếng Anh"
 *
 * Giọng văn (04-DESIGN-SYSTEM mục 11 + ui-vn-b "Giọng văn"): ấm, ngắn, xưng "bạn",
 * mascot tự xưng tên. Tiêu đề ≤ 6 từ. Không hứa hẹn kiểu quảng cáo, không so sánh xã hội.
 * Bảng xếp hạng mẫu dùng tên vai trong nhà (Mẹ, Bố…) — KHÔNG phải người thật.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system'
import { useLanguage } from '../../translations/language-context'

const VI = {
  /* ---------- đầu trang ---------- */
  login: 'Đăng nhập',
  heroEyebrow: 'Web học tiếng Anh của gia đình',
  heroTitleLine1: 'Cả nhà học tiếng Anh,',
  heroTitleLine2: 'mỗi ngày một chút',
  heroLead: 'Mỗi bài chỉ 5 phút, cún {mascot} dẫn đường từ con số 0 tới IELTS 6.5. Bé có khu trò chơi riêng.',
  ctaStart: 'Bắt đầu học',
  ctaResume: (n: number) => `Làm tiếp bài xếp lớp (câu ${n + 1})`,
  ctaResult: 'Xem lại kết quả xếp lớp',
  ctaHaveAccount: 'Tôi đã có tài khoản',
  heroFacts: ['Bài xếp lớp 5 phút', 'Xem kết quả ngay, chưa cần tài khoản', 'Không đồng hồ, không áp lực'],
  heroMascotHello: 'Chào bạn! Mình là {mascot}.',
  chipListen: (word: string) => `Nghe từ "${word}"`,

  /* ---------- bậc thang ---------- */
  stairsEyebrow: 'Lộ trình 3 level',
  stairsTitle: 'Bạn đang ở bậc nào?',
  stairsLead: 'Từ con số 0 tới band 6.5, chia thành 3 level và nhiều chặng ngắn. Làm bài xếp lớp để biết điểm xuất phát.',
  stairsCta: 'Tìm điểm xuất phát',
  youAreHereQuestion: 'Bạn ở đây?',
  goal: 'Mục tiêu 6.5',

  /* ---------- 2 lộ trình ---------- */
  tracksTitle: 'Chọn hướng đi của bạn',
  trackGeneralTitle: 'Tiếng Anh tổng quát',
  trackGeneralBody: 'Giao tiếp, đọc báo, xem phim, đi du lịch. Học để dùng được ngay.',
  trackGeneralPoints: ['Chủ đề đời sống', 'Nói & nghe nhiều', 'A1 → B2'],
  trackIeltsTitle: 'Luyện thi IELTS',
  trackIeltsBody: 'Đủ 4 kỹ năng theo đúng dạng đề, chấm Writing/Speaking theo tiêu chí band.',
  trackIeltsPoints: ['Dạng đề thật', 'Phòng thi thử', 'Mục tiêu 6.5'],
  tracksNote: 'Hai lộ trình dùng chung nền tảng — đổi qua lại không mất tiến độ.',

  /* ---------- 5 kỹ năng ---------- */
  skillsTitle: 'Đủ 5 kỹ năng, mỗi bài một chút',
  skills: {
    listening: { name: 'Nghe', line: 'Giọng Anh-Anh, nghe lại từng đoạn' },
    reading: { name: 'Đọc', line: 'Bấm 1 từ là thấy nghĩa ngay' },
    writing: { name: 'Viết', line: 'Tự chấm theo tiêu chí, so bài mẫu' },
    speaking: { name: 'Nói', line: 'Ghi âm riêng tư, nghe lại thoải mái' },
    vocabulary: { name: 'Từ vựng', line: 'Ôn đúng lúc sắp quên' },
  },

  /* ---------- khu trẻ em ---------- */
  kidsEyebrow: 'Cho bé 9–11 tuổi',
  kidsTitle: 'Khu trò chơi của bé',
  kidsBody: 'Nghe và chạm, lật thẻ, xếp chữ, bóng bay chữ… Mọi từ đều có giọng đọc. Thuộc từ nào, nhận sticker từ đó.',
  kidsPoints: ['Từ vựng Cambridge Starters–Flyers', 'Nhắc nghỉ mắt sau 30 phút', 'Không cược, không mua bán'],

  /* ---------- bảng xếp hạng gia đình ---------- */
  familyEyebrow: 'Cả nhà cùng học',
  familyTitle: 'Bảng xếp hạng nhà mình',
  familyBody: 'Mỗi người một tài khoản. Cùng giữ chuỗi ngày, cùng lên bảng tuần.',
  familyWeek: 'Tuần này',
  familyGoal: (done: number, total: number) => `Cả nhà ${done}/${total} lượt học`,
  familySample: 'Ví dụ minh hoạ',
  familyMembers: ['Mẹ', 'Bé Na', 'Bố', 'Anh Minh'],
  xp: 'XP',

  /* ---------- kêu gọi cuối ---------- */
  finalTitle: '5 phút để biết bạn bắt đầu từ đâu',
  finalBody: 'Không cần tài khoản. Xem kết quả và lộ trình ngay, thích thì lưu lại.',
  footer: 'IELTS Nhà Mình · web học tiếng Anh của gia đình',
}

type LandingText = typeof VI

const EN: LandingText = {
  login: 'Log in',
  heroEyebrow: "Our family's English learning site",
  heroTitleLine1: 'English for the whole family,',
  heroTitleLine2: 'a little every day',
  heroLead: 'Short 5-minute lessons with {mascot} the corgi as your guide — from zero to IELTS 6.5. Kids get their own games zone.',
  ctaStart: 'Start learning',
  ctaResume: (n: number) => `Continue placement test (question ${n + 1})`,
  ctaResult: 'See my placement result',
  ctaHaveAccount: 'I already have an account',
  heroFacts: ['5-minute placement test', 'Instant result, no account needed', 'No timer, no pressure'],
  heroMascotHello: "Hi! I'm {mascot}.",
  chipListen: (word: string) => `Listen to "${word}"`,

  stairsEyebrow: 'A 3-level path',
  stairsTitle: 'Which step are you on?',
  stairsLead: 'From zero to band 6.5, split into 3 levels of short units. Take the placement test to find your starting point.',
  stairsCta: 'Find my starting point',
  youAreHereQuestion: 'You here?',
  goal: 'Goal 6.5',

  tracksTitle: 'Choose your direction',
  trackGeneralTitle: 'General English',
  trackGeneralBody: 'Conversation, news, films, travel. Learn English you can use right away.',
  trackGeneralPoints: ['Everyday topics', 'Lots of speaking & listening', 'A1 → B2'],
  trackIeltsTitle: 'IELTS preparation',
  trackIeltsBody: 'All 4 skills in real question formats; Writing/Speaking checked against band criteria.',
  trackIeltsPoints: ['Real question types', 'Mock test room', 'Goal 6.5'],
  tracksNote: 'Both paths share the same foundation — switch any time without losing progress.',

  skillsTitle: 'All 5 skills, a little each lesson',
  skills: {
    listening: { name: 'Listening', line: 'British voices, replay any part' },
    reading: { name: 'Reading', line: 'Tap a word to see its meaning' },
    writing: { name: 'Writing', line: 'Self-check by criteria, compare samples' },
    speaking: { name: 'Speaking', line: 'Private recordings, replay freely' },
    vocabulary: { name: 'Vocabulary', line: 'Review right before you forget' },
  },

  kidsEyebrow: 'For kids aged 9–11',
  kidsTitle: 'The kids games zone',
  kidsBody: 'Listen & tap, memory cards, spelling, word balloons… Every word is read aloud. Learn a word, earn its sticker.',
  kidsPoints: ['Cambridge Starters–Flyers words', 'Eye-break reminder after 30 min', 'No betting, no shopping'],

  familyEyebrow: 'Learning together',
  familyTitle: 'Our family leaderboard',
  familyBody: 'One account per person. Keep your streaks and climb the weekly board together.',
  familyWeek: 'This week',
  familyGoal: (done: number, total: number) => `Family: ${done}/${total} study sessions`,
  familySample: 'Example',
  familyMembers: ['Mum', 'Little Na', 'Dad', 'Minh'],
  xp: 'XP',

  finalTitle: 'Five minutes to find your starting point',
  finalBody: 'No account needed. See your result and path right away, then save it if you like.',
  footer: "IELTS Nhà Mình · our family's English site",
}

function withMascotName(text: LandingText): LandingText {
  const fill = (value: unknown): unknown =>
    typeof value === 'string' ? fillMascotName(value) : Array.isArray(value) ? value.map(fill) : value
  return Object.fromEntries(Object.entries(text).map(([key, value]) => [key, fill(value)])) as LandingText
}

const BY_LANGUAGE = { vi: withMascotName(VI), en: withMascotName(EN) }

/** Chữ trang giới thiệu theo ngôn ngữ đang chọn. */
export function useLandingText(): LandingText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
