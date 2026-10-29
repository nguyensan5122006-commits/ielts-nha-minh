/**
 * LearnerRightRail.tsx — CỘT PHẢI CỦA NGƯỜI HỌC (teen / adult)
 * ----------------------------------------------------------------------------
 * Gắn các ô vào cột phải của khung trang bằng <RightRail> (src/app/layout/RightRail.tsx —
 * React portal: đặt ở đâu trong trang cũng được, nội dung tự sang cột phải).
 *
 *   <LearnerRightRail />                    // đủ 5 ô theo thứ tự chuẩn
 *   <LearnerRightRail hide={['continue']} /> // bỏ bớt ô (VD trang đã có nút Học tiếp to)
 *
 * Thứ tự (design system mục 6): Hôm nay (chuỗi + mục tiêu) · Học tiếp · Cả nhà tuần này ·
 * Thời điểm vàng · Nhiệm vụ hôm nay.
 * Màn 1024–1279px: khung trang tự xếp cột phải xuống dưới nội dung thành lưới 2 cột.
 * ----------------------------------------------------------------------------
 */
import { RightRail } from '../../app/layout/RightRail'
import { ContinueCard } from './widgets/ContinueCard'
import { DailyQuestsCard } from './widgets/DailyQuestsCard'
import { FamilyLeaderboardCard } from './widgets/FamilyLeaderboardCard'
import { GoldenTimeCard } from './widgets/GoldenTimeCard'
import { StreakGoalCard } from './widgets/StreakGoalCard'
import './right-rail.css'

export type RightRailWidgetId = 'today' | 'continue' | 'leaderboard' | 'golden-time' | 'quests'

export function LearnerRightRail({ hide = [] }: { hide?: RightRailWidgetId[] }) {
  const show = (id: RightRailWidgetId) => !hide.includes(id)
  return (
    <RightRail>
      {show('today') && <StreakGoalCard />}
      {show('continue') && <ContinueCard />}
      {show('leaderboard') && <FamilyLeaderboardCard />}
      {show('golden-time') && <GoldenTimeCard />}
      {show('quests') && <DailyQuestsCard />}
    </RightRail>
  )
}
