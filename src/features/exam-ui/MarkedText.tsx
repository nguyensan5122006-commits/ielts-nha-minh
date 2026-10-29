/**
 * MarkedText.tsx — VẼ 1 KHỐI CHỮ CÓ TÔ MÀU (tô vàng, ghi chú, bằng chứng, từ đang tra nghĩa)
 * ----------------------------------------------------------------------------
 *   <MarkedText blockId="para-B" text={paragraph.text} marks={marks} />
 *
 * - `marks` là các đoạn [start, end) tính bằng số ký tự trong `text` (xem text-selection.ts).
 *   Nhiều mark chồng nhau được: chữ nhận đủ các lớp màu.
 * - Mark có `label` (VD "Q5") -> hiện nhãn nhỏ ngay trước chỗ bắt đầu (kiểu IELTS Online Tests).
 * - `lookup` (tuỳ chọn): 1 từ đang được tra nghĩa -> vẽ bằng hàm `renderLookup` (Readlang:
 *   nghĩa tiếng Việt hiện ngay PHÍA TRÊN từ, dòng tự giãn ra, không có popup che chữ).
 * - Phần tử phụ (nhãn, nghĩa) có data-hl-ignore để không bị đếm khi bôi đen chữ.
 * ----------------------------------------------------------------------------
 */
import { Fragment, type ReactNode } from 'react'
import './MarkedText.css'

export type MarkKind = 'highlight' | 'note' | 'evidence' | 'evidence-phrase'

export interface TextMark {
  id: string
  blockId: string
  start: number
  end: number
  kind: MarkKind
  /** nhãn nhỏ trước chỗ bắt đầu, VD "Q5" */
  label?: string
  /** mark đang được chọn (VD bằng chứng của câu đang xem) -> đậm hơn */
  active?: boolean
}

export interface MarkedTextProps {
  blockId: string
  text: string
  marks?: TextMark[]
  lookup?: { start: number; end: number; render: (wordNode: ReactNode) => ReactNode } | null
  /** bấm vào 1 đoạn đang có mark (VD chữ có ghi chú -> mở ghi chú) */
  onMarkClick?: (mark: TextMark) => void
  className?: string
  /** thẻ bao ngoài (mặc định span) */
  as?: 'span' | 'p' | 'div'
}

export function MarkedText({ blockId, text, marks = [], lookup, onMarkClick, className, as = 'span' }: MarkedTextProps) {
  const Tag = as
  const own = marks.filter((mark) => mark.blockId === blockId && mark.end > mark.start)

  // các mốc cắt chữ: đầu/cuối mọi mark + đầu/cuối từ đang tra
  const cuts = new Set<number>([0, text.length])
  for (const mark of own) {
    cuts.add(Math.max(0, Math.min(text.length, mark.start)))
    cuts.add(Math.max(0, Math.min(text.length, mark.end)))
  }
  if (lookup) {
    cuts.add(lookup.start)
    cuts.add(lookup.end)
  }
  const points = [...cuts].sort((a, b) => a - b)

  /** vẽ 1 mẩu chữ [from, to) với các mark đang phủ lên nó */
  const renderPiece = (from: number, to: number) => {
    const covering = own.filter((mark) => mark.start <= from && mark.end >= to)
    const startingHere = own.filter((mark) => mark.start === from && mark.label)
    const piece = text.slice(from, to)
    const labels = startingHere.map((mark) => (
      <span key={`label-${mark.id}`} className={mark.active ? 'xm-label is-active' : 'xm-label'} data-hl-ignore aria-hidden>
        {mark.label}
      </span>
    ))
    if (covering.length === 0) return <Fragment key={from}>{labels}{piece}</Fragment>
    const classes = ['xm', ...new Set(covering.map((mark) => `xm--${mark.kind}`)), covering.some((mark) => mark.active) && 'is-active'].filter(Boolean).join(' ')
    const clickable = onMarkClick ? covering.find((mark) => mark.kind === 'note') ?? null : null
    // id của mark bắt đầu ở đây -> để cuộn tới đúng chỗ (scrollMarkIntoView)
    const anchorIds = own.filter((mark) => mark.start === from).map((mark) => mark.id).join(' ')
    return (
      <Fragment key={from}>
        {labels}
        <mark
          className={classes}
          data-mark-ids={anchorIds || undefined}
          onClick={clickable ? () => onMarkClick?.(clickable) : undefined}
        >
          {piece}
        </mark>
      </Fragment>
    )
  }

  const children: ReactNode[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i]
    const to = points[i + 1]
    if (to <= from) continue
    if (lookup && from === lookup.start) {
      // gom mọi mẩu nằm trong từ đang tra vào 1 khối
      const inner: ReactNode[] = []
      let j = i
      while (j < points.length - 1 && points[j + 1] <= lookup.end) {
        inner.push(renderPiece(points[j], points[j + 1]))
        j++
      }
      children.push(<Fragment key={`lookup-${from}`}>{lookup.render(inner)}</Fragment>)
      i = j - 1
      continue
    }
    children.push(renderPiece(from, to))
  }

  return (
    <Tag className={className} data-hl-block={blockId}>
      {children}
    </Tag>
  )
}

/** Cuộn tới mark có id (bên trong `container`) và nháy viền 1 lần. Trả về true nếu tìm thấy. */
export function scrollMarkIntoView(container: Element | null, markId: string): boolean {
  if (!container) return false
  const element = [...container.querySelectorAll<HTMLElement>('[data-mark-ids]')].find((node) => node.dataset.markIds?.split(' ').includes(markId))
  if (!element) return false
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
  element.classList.remove('xm-flash')
  void element.offsetWidth // ép vẽ lại để animation chạy lại
  element.classList.add('xm-flash')
  return true
}
