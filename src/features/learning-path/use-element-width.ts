/**
 * use-element-width.ts — ĐO BỀ RỘNG 1 KHUNG (px) VÀ CẬP NHẬT KHI KHUNG ĐỔI CỠ
 * Đường tuần tra vẽ bằng SVG theo px, nên cần biết khung rộng bao nhiêu (720px ở màn to,
 * hẹp hơn ở màn nhỏ). Dùng ResizeObserver — chỉ chạy khi cỡ thật sự đổi.
 */
import { useLayoutEffect, useState, type RefObject } from 'react'

export function useElementWidth(ref: RefObject<HTMLElement | null>, fallback = 720): number {
  const [width, setWidth] = useState(fallback)
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    setWidth(Math.round(element.getBoundingClientRect().width) || fallback)
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width)
      if (next > 0) setWidth(next)
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, fallback])
  return width
}
