/**
 * ReviewSectionNav.tsx — THANH CHUYỂN NHANH GIỮA 3 TRANG CỦA KHU "ÔN TẬP"
 * ----------------------------------------------------------------------------
 *   <ReviewSectionNav />     // Ôn thẻ (12) · Sổ từ vựng · Sổ câu sai (5)
 *
 * 3 trang /review, /words, /mistakes cùng nằm dưới mục "Ôn tập" của menu chính,
 * nên đầu mỗi trang có thanh này (viên thuốc, trang đang mở được tô) kèm số đếm
 * việc đang chờ — người học thấy ngay còn gì cần làm.
 * ----------------------------------------------------------------------------
 */
import { NavLink } from 'react-router-dom'
import { srsQueueInfo } from '../../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../../learning-progress/progress-store'
import { useReviewText } from '../vocabulary-review-text'

export function ReviewSectionNav() {
  const text = useReviewText()
  const { progress } = useProgress()
  const dueCount = srsQueueInfo(progress).sessionSize
  const openMistakes = progress.mistakes.filter((mistake) => !mistake.resolved).length

  const items = [
    { to: '/review', label: text.navReview, count: dueCount },
    { to: '/words', label: text.navWords, count: 0 },
    { to: '/mistakes', label: text.navMistakes, count: openMistakes },
  ]
  return (
    <nav className="review-nav" aria-label={text.sectionNavLabel}>
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className={({ isActive }) => `review-nav__item${isActive ? ' is-active' : ''}`}>
          <span>{item.label}</span>
          {item.count > 0 && <span className="review-nav__count">{item.count > 99 ? '99+' : item.count}</span>}
        </NavLink>
      ))}
    </nav>
  )
}
