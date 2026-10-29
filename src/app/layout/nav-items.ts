/**
 * nav-items.ts — DANH SÁCH MỤC TRONG THANH ĐIỀU HƯỚNG (sidebar trái / thanh dưới)
 * ----------------------------------------------------------------------------
 * Muốn thêm/bớt/đổi thứ tự mục menu: sửa mảng ở đây.
 *   matchPrefixes: các đường dẫn khiến mục này "đang sáng" (VD Sân chơi sáng cả
 *   khi đang ở /arena, /shop… vì đó là các trang con của Sân chơi).
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
  /** chỉ hiện cho tài khoản trẻ em */
  kidsOnly?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'kids', to: '/kids', labelKey: 'navKids', icon: 'kids', matchPrefixes: ['/kids'], kidsOnly: true },
  { id: 'learn', to: '/learn', labelKey: 'navLearn', icon: 'learn', matchPrefixes: ['/learn', '/lesson', '/level', '/roadmap', '/progress'] },
  { id: 'review', to: '/review', labelKey: 'navReview', icon: 'review', matchPrefixes: ['/review', '/words', '/mistakes', '/fun'] },
  { id: 'exams', to: '/exams', labelKey: 'navExams', icon: 'exam', matchPrefixes: ['/exams', '/exam-result'] },
  {
    id: 'play',
    to: '/play',
    labelKey: 'navPlay',
    icon: 'play',
    matchPrefixes: ['/play', '/arena', '/games', '/daily-word', '/tournament', '/boss', '/shop', '/quests', '/leaderboard'],
  },
  { id: 'chat', to: '/chat', labelKey: 'navChat', icon: 'chat', matchPrefixes: ['/chat'] },
  { id: 'profile', to: '/profile', labelKey: 'navProfile', icon: 'profile', matchPrefixes: ['/profile', '/settings'] },
]

/** Mục menu cho 1 người dùng: bé (kid) thấy "Khu vui chơi" đầu tiên, người lớn thì không. */
export function navItemsFor(ageGroup: 'kid' | 'teen' | 'adult' | undefined): NavItem[] {
  return NAV_ITEMS.filter((item) => !item.kidsOnly || ageGroup === 'kid')
}

/** Mục nào đang sáng với đường dẫn hiện tại ('/' coi như /learn — trang chủ của người học) */
export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const path = pathname === '/' ? '/learn' : pathname
  return item.matchPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}
