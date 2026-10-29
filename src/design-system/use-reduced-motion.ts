/**
 * use-reduced-motion.ts — BIẾT NGƯỜI DÙNG CÓ BẬT "GIẢM CHUYỂN ĐỘNG" KHÔNG
 * ----------------------------------------------------------------------------
 * Một số người bị chóng mặt khi màn hình nhảy/bay nhiều nên bật tuỳ chọn
 * "Reduce motion" trong máy. CSS tự xử lý (base.css); còn chuyển động viết
 * bằng JS (pháo giấy canvas, số XP đếm lên) thì hỏi hook này:
 *   const reduceMotion = useReducedMotion()
 *   if (reduceMotion) -> hiện kết quả cuối luôn, không chạy hiệu ứng.
 * ----------------------------------------------------------------------------
 */
import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Hỏi 1 lần (ngoài React), VD trong hàm fireConfetti(). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.(QUERY).matches
}

function subscribe(listener: () => void): () => void {
  const media = window.matchMedia?.(QUERY)
  media?.addEventListener('change', listener)
  return () => media?.removeEventListener('change', listener)
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false)
}
