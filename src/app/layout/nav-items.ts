/**
 * nav-items.ts — DANH SÁCH MỤC TRONG THANH ĐIỀU HƯỚNG (sidebar trái / thanh dưới)
 * ----------------------------------------------------------------------------
 * Muốn thêm/bớt/đổi thứ tự mục menu: sửa mảng ở đây.
 *   matchPrefixes: các đường dẫn khiến mục này "đang sáng" (VD Sân chơi sáng cả
 *   khi đang ở /daily-word, /games/…, /quests… vì đó là các trang con của Sân chơi).
 * ----------------------------------------------------------------------------
 */
import type { DsTextKey } from '../../design-system/design-system-text'
import type { IconName } from '../../design-system/components/Icon'

export interface NavItem {
  id: string
  /** đường dẫn khi bấm */
  to: string
  /** khoá chữ trong design-system-text.ts */
  labelKey: DsTextKey
  icon: IconName
  /** đang ở các đường dẫn bắt đầu bằng những chuỗi này -> mục sáng lên */
  matchPrefixes: string[]
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'learn', to: '/learn', labelKey: 'navLearn', icon: 'learn', matchPrefixes: ['/learn', '/lesson', '/level', '/roadmap', '/progress'] },
  { id: 'review', to: '/review', labelKey: 'navReview', icon: 'review', matchPrefixes: ['/review', '/words', '/mistakes', '/fun'] },
  // khu Ngữ pháp (src/features/grammar): danh sách điểm ngữ pháp theo 3 level + bài luyện riêng
  { id: 'grammar', to: '/grammar', labelKey: 'navGrammar', icon: 'grammar', matchPrefixes: ['/grammar'] },
  { id: 'exams', to: '/exams', labelKey: 'navExams', icon: 'exam', matchPrefixes: ['/exams', '/exam-result'] },
  {
    id: 'play',
    to: '/play',
    labelKey: 'navPlay',
    icon: 'play',
    matchPrefixes: ['/play', '/games', '/daily-word', '/quests', '/leaderboard'],
  },
  { id: 'chat', to: '/chat', labelKey: 'navChat', icon: 'chat', matchPrefixes: ['/chat'] },
  { id: 'profile', to: '/profile', labelKey: 'navProfile', icon: 'profile', matchPrefixes: ['/profile', '/settings'] },
]

/** Mục nào đang sáng với đường dẫn hiện tại ('/' coi như /learn — trang chủ của người học) */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const path = pathname === '/' ? '/learn' : pathname
  return item.matchPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}
