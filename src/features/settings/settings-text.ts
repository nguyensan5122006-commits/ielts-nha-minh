/**
 * settings-text.ts — CHỮ GIAO DIỆN CỦA TRANG /settings (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const settingsText = useSettingsText()
 *   settingsText('goalMinutes', { n: 10 })   -> "10 phút"
 * Giọng văn: xưng "bạn", câu ngắn, giải thích vì sao có cài đặt này (1 dòng).
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

export const SETTINGS_TEXT = {
  title: { vi: 'Cài đặt', en: 'Settings' },
  intro: { vi: 'Mọi thay đổi được lưu ngay.', en: 'Changes are saved right away.' },
  saved: { vi: 'Đã lưu', en: 'Saved' },
  saving: { vi: 'Đang lưu…', en: 'Saving…' },
  saveError: { vi: 'Chưa lưu lên máy chủ — sẽ tự thử lại', en: 'Not synced yet — will retry' },

  /* nhóm: hiển thị */
  groupDisplay: { vi: 'Hiển thị & âm thanh', en: 'Display & sound' },
  language: { vi: 'Ngôn ngữ hướng dẫn', en: 'Interface language' },
  languageHint: { vi: 'Nội dung học luôn là tiếng Anh — chỉ phần hướng dẫn đổi theo.', en: 'Lessons stay in English — only instructions change.' },
  theme: { vi: 'Giao diện', en: 'Theme' },
  themeHint: { vi: '"Theo máy" tự đổi sáng / tối theo cài đặt của máy.', en: '"System" follows your device.' },
  themeLight: { vi: 'Sáng', en: 'Light' },
  themeDark: { vi: 'Tối', en: 'Dark' },
  themeSystem: { vi: 'Theo máy', en: 'System' },
  sound: { vi: 'Hiệu ứng âm thanh', en: 'Sound effects' },
  soundHint: { vi: 'Tiếng "ting" khi đúng, "pop" khi nhận thưởng. Giọng đọc bài nghe không bị tắt.', en: 'Chimes for correct answers and rewards. Listening audio is not affected.' },
  soundOn: { vi: 'Bật', en: 'On' },
  soundOff: { vi: 'Tắt', en: 'Off' },
  soundTest: { vi: 'Nghe thử', en: 'Test' },

  /* nhóm: thói quen */
  groupHabit: { vi: 'Mục tiêu & giờ học', en: 'Goal & study time' },
  goal: { vi: 'Mục tiêu mỗi ngày', en: 'Daily goal' },
  goalHint: { vi: 'Vòng mục tiêu trên trang Học đầy khi bạn học đủ số phút này.', en: 'Your goal ring fills up after this many minutes.' },
  goalMinutes: { vi: '{n} phút', en: '{n} min' },
  minutesUnit: { vi: 'phút', en: 'min' },
  goalNote5: { vi: 'Nhẹ nhàng — hợp ngày bận', en: 'Light — good for busy days' },
  // (QA) bản EN rút gọn: thẻ hẹp ~70px, chữ "recommended" bị bẻ đôi giữa từ
  goalNote10: { vi: 'Đều đặn — khuyên dùng', en: 'Steady — best start' },
  goalNote15: { vi: 'Nghiêm túc', en: 'Serious' },
  goalNote20: { vi: 'Tăng tốc', en: 'Intense' },
  goalNote30: { vi: 'Luyện thi', en: 'Exam prep' },
  studyPlan: { vi: 'Hẹn giờ học', en: 'Study plan' },
  studyPlanHint: { vi: 'Gắn việc học với 1 thói quen có sẵn giúp nhớ học hơn. {mascot} chỉ nhắc trong web, không gửi thông báo.', en: 'Linking study to an existing habit helps. {mascot} only reminds you inside the app — no notifications.' },
  studyCue: { vi: 'Sau khi…', en: 'After…' },
  studyCueCustom: { vi: 'Tự ghi…', en: 'Custom…' },
  studyCuePlaceholder: { vi: 'VD: đưa con đi học về', en: 'e.g. after the school run' },
  studyTime: { vi: 'Lúc', en: 'At' },
  studyNone: { vi: 'Chưa hẹn', en: 'Not set' },
  studySentence: { vi: 'Mình sẽ học sau khi {cue} lúc {time}.', en: "I'll study after {cue} at {time}." },
  studySentenceNoTime: { vi: 'Mình sẽ học sau khi {cue}.', en: "I'll study after {cue}." },
  studyClear: { vi: 'Bỏ hẹn', en: 'Clear' },
  cueDinner: { vi: 'ăn tối', en: 'dinner' },
  cueWork: { vi: 'đi làm về', en: 'work' },
  cueSchool: { vi: 'đi học về', en: 'school' },
  cueBreakfast: { vi: 'ăn sáng', en: 'breakfast' },
  cueBed: { vi: 'tắm xong, trước khi ngủ', en: 'my evening shower' },

  /* nhóm: học */
  groupLearning: { vi: 'Cách học', en: 'Learning' },
  track: { vi: 'Lộ trình', en: 'Track' },
  trackHint: { vi: 'Đổi lộ trình không mất tiến độ — bài đã học vẫn giữ nguyên.', en: 'Switching tracks keeps all your progress.' },
  trackGeneral: { vi: 'Tiếng Anh tổng quát', en: 'General English' },
  trackGeneralNote: { vi: 'Giao tiếp, đời sống, công việc', en: 'Everyday life and work' },
  trackIelts: { vi: 'Luyện thi IELTS', en: 'IELTS prep' },
  trackIeltsNote: { vi: 'Đủ 4 kỹ năng theo dạng đề thi', en: 'All 4 skills, exam style' },
  srs: { vi: 'Nút chấm khi ôn thẻ', en: 'Review buttons' },
  srsHint: { vi: '2 nút đơn giản hơn; 4 nút giúp hẹn lịch ôn chính xác hơn.', en: '2 buttons is simpler; 4 buttons schedules reviews more precisely.' },
  srsAuto: { vi: 'Tự động', en: 'Auto' },
  srsAutoNote: { vi: 'Đang dùng {n} nút', en: 'Using {n} buttons' },
  srsTwo: { vi: '2 nút', en: '2 buttons' },
  srsTwoNote: { vi: 'Quên · Nhớ', en: 'Forgot · Got it' },
  srsFour: { vi: '4 nút', en: '4 buttons' },
  srsFourNote: { vi: 'Lại · Khó · Được · Dễ', en: 'Again · Hard · Good · Easy' },
  voice: { vi: 'Giọng đọc', en: 'Voice' },
  voiceHint: { vi: 'Giọng Anh-Anh giống bài thi IELTS. Level 3 vẫn trộn thêm giọng Úc / Mỹ.', en: 'British English matches the IELTS test. Level 3 still mixes in Australian / American.' },
  voiceGb: { vi: 'Anh-Anh', en: 'British' },
  voiceUs: { vi: 'Anh-Mỹ', en: 'American' },
  voiceDefault: { vi: 'mặc định', en: 'default' },
  voiceSample: { vi: 'Nghe thử giọng', en: 'Hear a sample' },

  /* nhóm: tài khoản */
  groupAccount: { vi: 'Tài khoản', en: 'Account' },
  displayName: { vi: 'Tên hiển thị', en: 'Display name' },
  username: { vi: 'Tên đăng nhập', en: 'Username' },
  profileLink: { vi: 'Trang cá nhân', en: 'My profile' },
  logout: { vi: 'Đăng xuất', en: 'Log out' },
  logoutHint: { vi: 'Tiến độ đã được lưu trên máy chủ.', en: 'Your progress is saved on the server.' },
  backToLearn: { vi: 'Về trang học', en: 'Back to learning' },
} satisfies Record<string, { vi: string; en: string }>

export type SettingsTextKey = keyof typeof SETTINGS_TEXT

export function useSettingsText(): (key: SettingsTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = SETTINGS_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return fillMascotName(text)
    },
    [language],
  )
}
