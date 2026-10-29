/**
 * design-system-text.ts — CHỮ GIAO DIỆN CỦA HỆ THIẾT KẾ + KHUNG TRANG (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 * Tách riêng khỏi translations/ui-text.ts để nhóm hệ thiết kế không sửa file chung.
 * Dùng trong component:
 *   const dsText = useDsText()
 *   dsText('navLearn')                 -> "Học" / "Learn"
 *   dsText('timerLeft', { time: '4:59' })
 * Câu có {mascot} sẽ tự được thay bằng tên mascot (mascot-name.ts).
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import { useLanguage } from '../translations/language-context'
import { fillMascotName } from './mascot-name'

export const DS_TEXT = {
  /* ---------- khung trang (sidebar, thanh dưới) ---------- */
  brandName: { vi: 'IELTS Nhà Mình', en: 'Family IELTS' },
  navLearn: { vi: 'Học', en: 'Learn' },
  navReview: { vi: 'Ôn tập', en: 'Review' },
  navExams: { vi: 'Luyện thi', en: 'Practice tests' },
  navGrammar: { vi: 'Ngữ pháp', en: 'Grammar' },
  navPlay: { vi: 'Trò chơi chữ', en: 'Word games' },
  navChat: { vi: 'Chat', en: 'Chat' },
  navProfile: { vi: 'Hồ sơ', en: 'Profile' },
  mainNavigation: { vi: 'Điều hướng chính', en: 'Main navigation' },
  skipToContent: { vi: 'Bỏ qua menu, tới nội dung', en: 'Skip to content' },
  sideWidgets: { vi: 'Bảng phụ', en: 'Side panel' },
  accountMenu: { vi: 'Tài khoản', en: 'Account' },
  myProfile: { vi: 'Trang cá nhân', en: 'My profile' },
  logout: { vi: 'Đăng xuất', en: 'Log out' },
  streakLabel: { vi: '{n} ngày liên tiếp', en: '{n}-day streak' },
  levelLabel: { vi: 'Cấp {n}', en: 'Level {n}' },
  saveSaved: { vi: 'Đã lưu', en: 'Saved' },
  saveSaving: { vi: 'Đang lưu…', en: 'Saving…' },
  saveError: { vi: 'Chưa lưu được', en: 'Not saved' },
  unreadMessages: { vi: '{n} tin chưa đọc', en: '{n} unread' },

  /* ---------- màn tập trung (bài học / thi) ---------- */
  saveAndExit: { vi: 'Lưu & thoát', en: 'Save & exit' },
  lessonProgress: { vi: 'Tiến độ bài', en: 'Lesson progress' },

  /* ---------- công tắc ---------- */
  language: { vi: 'Ngôn ngữ', en: 'Language' },
  theme: { vi: 'Giao diện', en: 'Theme' },
  themeSystem: { vi: 'Theo máy', en: 'System' },
  themeLight: { vi: 'Sáng', en: 'Light' },
  themeDark: { vi: 'Tối', en: 'Dark' },
  sound: { vi: 'Âm thanh', en: 'Sound' },
  soundOn: { vi: 'Bật âm thanh', en: 'Sound on' },
  soundOff: { vi: 'Tắt âm thanh', en: 'Sound off' },

  /* ---------- component ---------- */
  close: { vi: 'Đóng', en: 'Close' },
  reportProblem: { vi: 'Báo lỗi câu hỏi', en: 'Report a problem' },
  loading: { vi: 'Đang tải…', en: 'Loading…' },
  listen: { vi: 'Nghe', en: 'Listen' },
  listenSlow: { vi: 'Nghe chậm', en: 'Listen slowly' },
  stopListening: { vi: 'Dừng', en: 'Stop' },
  timerLeft: { vi: 'Còn {time}', en: '{time} left' },
  timerHide: { vi: 'Ẩn đồng hồ', en: 'Hide timer' },
  timerShow: { vi: 'Hiện đồng hồ', en: 'Show timer' },
  timerHidden: { vi: 'Đồng hồ đang ẩn', en: 'Timer hidden' },
  timerWarning: { vi: 'Còn ít thời gian — cứ bình tĩnh', en: 'Not much time left — stay calm' },
  stepOf: { vi: 'Bước {current}/{total}', en: 'Step {current} of {total}' },
  progressOf: { vi: '{current}/{total}', en: '{current}/{total}' },
  xpGained: { vi: '+{n} XP', en: '+{n} XP' },
  mascotSays: { vi: '{mascot} nói', en: '{mascot} says' },
  mascotAlt: { vi: 'Chú cún {mascot}', en: '{mascot} the corgi' },
  newLabel: { vi: 'Mới', en: 'New' },
  streakDaysShort: { vi: 'ngày', en: 'days' },
  levelBadgeAlt: { vi: 'Huy hiệu level {n}', en: 'Level {n} badge' },
} satisfies Record<string, { vi: string; en: string }>

export type DsTextKey = keyof typeof DS_TEXT

/** Hook trả về hàm dịch chữ của hệ thiết kế theo ngôn ngữ đang chọn. */
export function useDsText(): (key: DsTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = DS_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return fillMascotName(text)
    },
    [language],
  )
}
