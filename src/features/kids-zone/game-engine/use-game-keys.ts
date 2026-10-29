/**
 * use-game-keys.ts
 * ----------------------------------------------------------------------------
 * PHÍM TẮT CHUNG CHO MỌI TRÒ (psych-kids luật 29 + 40):
 *   1–4        chọn đáp án thứ 1..4      (onChoice(0..3))
 *   Enter/Space tiếp tục                  (onEnter)
 *   R          nghe lại                   (onReplay)
 *
 *   useGameKeys({ onChoice: pick, onEnter: next, onReplay: replay }, isActive)
 *
 * Bỏ qua phím khi bé đang gõ trong ô nhập, hoặc khi giữ Ctrl/Alt/Cmd (phím tắt trình duyệt).
 * Hàm xử lý luôn là bản mới nhất (lưu trong ref) nên không cần khai báo "deps".
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef } from 'react'

export interface GameKeyHandlers {
  onChoice?: (index: number) => void
  onEnter?: () => void
  onReplay?: () => void
}

export function useGameKeys(handlers: GameKeyHandlers, active = true): void {
  const handlersRef = useRef(handlers)
  handlersRef.current = handlers

  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      const { onChoice, onEnter, onReplay } = handlersRef.current

      if (onChoice && /^[1-4]$/.test(event.key)) {
        event.preventDefault()
        onChoice(Number(event.key) - 1)
      } else if (onEnter && (event.key === 'Enter' || event.key === ' ')) {
        // Space/Enter trên 1 nút đang được focus thì để trình duyệt tự "bấm" nút đó
        if (target?.tagName === 'BUTTON' || target?.tagName === 'A') return
        event.preventDefault()
        onEnter()
      } else if (onReplay && (event.key === 'r' || event.key === 'R')) {
        event.preventDefault()
        onReplay()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])
}
