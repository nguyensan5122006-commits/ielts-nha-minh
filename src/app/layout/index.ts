/**
 * app/layout/index.ts — các KHUNG TRANG dùng chung
 *   AppShell       : khung 3 cột (sidebar | nội dung | cột phải) — chỉ vẽ, nhận props
 *   AppShellRoute  : AppShell đã nối dữ liệu thật, dùng làm route cha trong App.tsx
 *   RightRail      : đặt widget vào cột phải từ bên trong 1 trang
 *   FocusLayout    : màn học / thi toàn màn hình (nút Lưu & thoát, thanh tiến độ, âm thanh)
 */
export { AppShell, type AppShellProps, type AppShellAccount } from './AppShell'
export { AppShellRoute } from './AppShellRoute'
export { RightRail } from './RightRail'
export { FocusLayout, type FocusLayoutProps } from './FocusLayout'
export { NAV_ITEMS, isNavItemActive, type NavItem } from './nav-items'
