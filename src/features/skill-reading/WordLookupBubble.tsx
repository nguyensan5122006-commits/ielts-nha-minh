/**
 * WordLookupBubble.tsx — BONG BÓNG NGHĨA TIẾNG VIỆT NẰM NGAY TRÊN TỪ ĐƯỢC BẤM
 * ----------------------------------------------------------------------------
 *   <WordLookupBubble>…nghĩa + nút loa + "Lưu vào sổ từ"…</WordLookupBubble>
 *
 * Bong bóng căn giữa phía trên từ. Từ nằm sát mép trái/phải bài đọc thì bong bóng bị tràn
 * ra ngoài -> đo lại sau khi vẽ và đẩy vào trong khung bài đọc (.xpassage); mũi tên nhỏ vẫn
 * chỉ đúng vào từ (biến CSS --arrow-shift).
 * Có data-hl-ignore: chữ trong bong bóng không bị tính khi bôi đen / tô vàng.
 * ----------------------------------------------------------------------------
 */
import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const EDGE_GAP = 8

export function WordLookupBubble({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    const bubble = ref.current
    const frame = bubble?.closest('.xpassage')
    if (!bubble || !frame) return
    const box = bubble.getBoundingClientRect()
    const area = frame.getBoundingClientRect()
    // vị trí khi chưa đẩy = vị trí đo được trừ phần đã đẩy
    const left = box.left - shift
    const right = box.right - shift
    let next = 0
    if (left < area.left + EDGE_GAP) next = area.left + EDGE_GAP - left
    else if (right > area.right - EDGE_GAP) next = area.right - EDGE_GAP - right
    if (Math.abs(next - shift) > 0.5) setShift(next)
    // đo 1 lần mỗi lần nội dung đổi (đổi từ / đổi trạng thái "Đã lưu")
  }, [children, shift])

  const style = { '--bubble-shift': `${shift}px`, '--arrow-shift': `${-shift}px` } as CSSProperties
  return (
    <span ref={ref} className="xlookup__bubble" data-hl-ignore role="status" style={style}>
      {children}
    </span>
  )
}
