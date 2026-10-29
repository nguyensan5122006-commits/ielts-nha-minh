/**
 * use-now.ts — "ĐỒNG HỒ" CHO GIAO DIỆN: trả về thời điểm hiện tại, tự cập nhật mỗi `everyMs`.
 * Dùng cho đếm ngược tới lượt ôn kế tiếp (ô Thời điểm vàng). Tab bị ẩn thì trình duyệt tự
 * chạy chậm lại; khi quay lại tab thì cập nhật ngay.
 */
import { useEffect, useState } from 'react'

export function useNow(everyMs = 30_000): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const tick = () => setNow(new Date())
    const timer = window.setInterval(tick, everyMs)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [everyMs])
  return now
}
