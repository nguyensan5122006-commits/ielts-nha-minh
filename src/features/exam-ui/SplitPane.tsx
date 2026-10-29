/**
 * SplitPane.tsx — 2 CỘT CÓ TAY NẮM KÉO ↔ Ở GIỮA (bài đọc | câu hỏi), giống máy thi IELTS
 * ----------------------------------------------------------------------------
 *   <SplitPane
 *     start={<Passage />}  startLabel="Bài đọc"
 *     end={<Questions />}  endLabel="Câu hỏi"
 *     defaultRatio={0.52} storageKey="reading" />
 *
 * - Mỗi cột cuộn RIÊNG (startRef / endRef trỏ vào vùng cuộn để cuộn tới bằng chứng).
 * - Kéo tay nắm bằng chuột/bút/cảm ứng. Bàn phím: Tab tới tay nắm rồi ← → (Shift = bước lớn),
 *   Home/End = hẹp nhất/rộng nhất, Enter hoặc bấm đúp = về mặc định.
 *   (Máy thi thật không chỉnh được bằng phím — mình thêm cho người dùng bàn phím.)
 * - Tỉ lệ được nhớ trong localStorage theo `storageKey`.
 * - Khung hẹp hơn 860px: 2 cột xếp dọc (không vỡ ở 768px).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode, type Ref } from 'react'
import { useExamUiText } from './exam-ui-text'
import './SplitPane.css'

export interface SplitPaneProps {
  start: ReactNode
  end: ReactNode
  /** nhãn vùng cho trình đọc màn hình */
  startLabel: string
  endLabel: string
  /** tỉ lệ độ rộng cột trái 0..1 (mặc định 0.5) */
  defaultRatio?: number
  minStartPx?: number
  minEndPx?: number
  /** nhớ tỉ lệ đã kéo (localStorage) */
  storageKey?: string
  startRef?: Ref<HTMLDivElement>
  endRef?: Ref<HTMLDivElement>
  className?: string
}

const STACK_BELOW_PX = 860

function readRatio(key: string | undefined, fallback: number): number {
  if (!key) return fallback
  try {
    const saved = Number(localStorage.getItem(`ielts-split-${key}`))
    return saved > 0.1 && saved < 0.9 ? saved : fallback
  } catch {
    return fallback
  }
}

export function SplitPane({ start, end, startLabel, endLabel, defaultRatio = 0.5, minStartPx = 320, minEndPx = 360, storageKey, startRef, endRef, className }: SplitPaneProps) {
  const text = useExamUiText()
  const rootRef = useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = useState(() => readRatio(storageKey, defaultRatio))
  const [stacked, setStacked] = useState(false)
  const [dragging, setDragging] = useState(false)
  const ratioRef = useRef(ratio)
  ratioRef.current = ratio

  // xếp dọc khi khung hẹp
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const observer = new ResizeObserver(([entry]) => setStacked(entry.contentRect.width < STACK_BELOW_PX))
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  /** giới hạn tỉ lệ theo độ rộng tối thiểu của 2 cột */
  const clamp = useCallback(
    (value: number) => {
      const width = rootRef.current?.clientWidth ?? 1200
      const min = Math.min(0.45, minStartPx / width)
      const max = Math.max(0.55, 1 - minEndPx / width)
      return Math.min(max, Math.max(min, value))
    },
    [minStartPx, minEndPx],
  )

  const persist = useCallback(
    (value: number) => {
      if (!storageKey) return
      try {
        localStorage.setItem(`ielts-split-${storageKey}`, value.toFixed(3))
      } catch {
        /* bỏ qua */
      }
    },
    [storageKey],
  )

  useEffect(() => setRatio((value) => clamp(value)), [clamp])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !rootRef.current) return
    const rect = rootRef.current.getBoundingClientRect()
    setRatio(clamp((event.clientX - rect.left) / rect.width))
  }
  const onPointerUp = () => {
    if (!dragging) return
    setDragging(false)
    persist(ratioRef.current)
  }
  const reset = () => {
    setRatio(clamp(defaultRatio))
    persist(defaultRatio)
  }
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 0.1 : 0.02
    let next: number | null = null
    if (event.key === 'ArrowLeft') next = ratio - step
    else if (event.key === 'ArrowRight') next = ratio + step
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = 1
    else if (event.key === 'Enter') next = defaultRatio
    if (next === null) return
    event.preventDefault()
    const clamped = clamp(next)
    setRatio(clamped)
    persist(clamped)
  }

  const style = { '--split-ratio': ratio } as CSSProperties

  return (
    <div ref={rootRef} className={['xsplit', stacked && 'is-stacked', dragging && 'is-dragging', className].filter(Boolean).join(' ')} style={style}>
      <section ref={startRef} className="xsplit__pane xsplit__pane--start" aria-label={startLabel} tabIndex={-1}>
        {start}
      </section>
      {!stacked && (
        <div
          className="xsplit__handle"
          role="separator"
          aria-orientation="vertical"
          aria-label={text('resizePanes')}
          aria-valuenow={Math.round(ratio * 100)}
          aria-valuemin={10}
          aria-valuemax={90}
          tabIndex={0}
          title={text('resizePanes')}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={reset}
          onKeyDown={onKeyDown}
        >
          <span className="xsplit__grip" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 7 3 12l5 5M16 7l5 5-5 5M3 12h18" />
            </svg>
          </span>
        </div>
      )}
      <section ref={endRef} className="xsplit__pane xsplit__pane--end" aria-label={endLabel} tabIndex={-1}>
        {end}
      </section>
    </div>
  )
}
