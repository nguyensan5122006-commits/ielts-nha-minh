/**
 * RightRail.tsx — CỘT PHẢI 340px (chuỗi ngày, mục tiêu, bảng xếp hạng gia đình…)
 * ----------------------------------------------------------------------------
 * Khung trang (AppShell) chừa sẵn 1 "ô trống" ở cột phải. Trang nào muốn có cột
 * phải thì đặt nội dung vào bằng <RightRail> — ở BẤT KỲ đâu trong trang:
 *
 *   export function LearnPage() {
 *     return (
 *       <>
 *         <RightRail>
 *           <StreakGoalWidget />
 *           <FamilyLeaderboardWidget />
 *         </RightRail>
 *         <h1>Lộ trình</h1> ...
 *       </>
 *     )
 *   }
 *
 * Cách làm: React "portal" — nội dung được vẽ sang ô cột phải dù component nằm
 * trong trang. Trang KHÔNG có <RightRail> thì cột phải tự ẩn, nội dung rộng ra.
 * Màn 1024–1279px: cột phải tự xếp xuống dưới nội dung; < 1024px: cũng nằm dưới.
 * ----------------------------------------------------------------------------
 */
import { createContext, useContext, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Ô cột phải (thẻ <aside> của AppShell). null = chưa vẽ xong hoặc không có khung. */
export const RightRailSlotContext = createContext<HTMLElement | null>(null)

export interface RightRailProps {
  children: ReactNode
}

export function RightRail({ children }: RightRailProps) {
  const slot = useContext(RightRailSlotContext)
  if (!slot) return null // trang đang nằm ngoài AppShell (VD màn học toàn màn hình) -> không vẽ
  return createPortal(<div className="right-rail__stack">{children}</div>, slot)
}
