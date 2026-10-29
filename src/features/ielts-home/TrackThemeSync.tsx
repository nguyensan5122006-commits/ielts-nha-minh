/**
 * TrackThemeSync.tsx — ĐỔI GIAO DIỆN THEO TRACK ĐANG HỌC
 * ----------------------------------------------------------------------------
 * Đặt data-track="general" | "ielts" lên thẻ <html> theo progress.profile.track.
 * track-theme.css dựa vào thuộc tính này để đổi màu cả web sang "chế độ IELTS"
 * (xanh phòng thi) — nhìn là biết đang luyện IELTS hay học tiếng Anh tổng quát.
 * Không vẽ gì ra màn hình. Gắn 1 lần trong App.tsx (khối đã đăng nhập).
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { useProgress } from '../../learning-progress/progress-store'
import './track-theme.css'

export function TrackThemeSync() {
  const { progress } = useProgress()
  const track = progress.profile.track
  useEffect(() => {
    document.documentElement.dataset.track = track
    // rời khu đã đăng nhập (đăng xuất) -> bỏ thuộc tính, trang khách dùng màu gốc
    return () => {
      delete document.documentElement.dataset.track
    }
  }, [track])
  return null
}
