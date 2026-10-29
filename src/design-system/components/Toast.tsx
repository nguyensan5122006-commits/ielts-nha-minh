/**
 * Toast.tsx — THÔNG BÁO NỔI GÓC MÀN HÌNH ("Lên Lv.5!", "Mở khoá huy hiệu!")
 * ----------------------------------------------------------------------------
 * Hệ thống toast CŨ (src/components/ToastCenter.tsx) vẫn là "bộ máy" — đã được
 * <ToastProvider> bọc sẵn trong App.tsx. File này chỉ đưa nó vào hệ thiết kế để
 * các nhóm import từ 1 chỗ:
 *
 *   import { useToast } from '../design-system'
 *   const { showToast } = useToast()
 *   showToast({ icon: '🏅', text: 'Mở khoá huy hiệu "Chăm chỉ"!' })
 *   showToast({ icon: '💬', text: 'Bố vừa nhắn tin', action: { label: 'Mở chat', onClick: openChat } })
 *
 * Giao diện (viên trắng bo tròn, bóng vinyl, trượt vào từ phải) được làm lại
 * bằng CSS trong src/styles/gamification.css mục 2 — không đổi code cũ.
 * ----------------------------------------------------------------------------
 */
export { ToastProvider, useToast, type ToastOptions } from '../../components/ToastCenter'
