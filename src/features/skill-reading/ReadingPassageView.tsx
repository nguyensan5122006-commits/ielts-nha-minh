/**
 * ReadingPassageView.tsx — BÀI ĐỌC (cột trái của trình Reading)
 * ----------------------------------------------------------------------------
 *   <ReadingPassageView passage={task.passage} marks={marks}
 *     lookup={lookup} onWordTap={tap} renderLookupBubble={…} onNoteClick={openNote} />
 *
 * - Chữ Source Serif 4, 18px, giãn dòng 1.75 (đọc lâu không mỏi) × cỡ chữ người học chọn.
 * - Nhãn đoạn A, B, C… nằm ở lề trái (đề hỏi "Which paragraph…", lời giải chỉ "đoạn D").
 * - Mỗi đoạn là 1 "khối" (data-hl-block="para-A") để tô vàng / ghi chú / tô bằng chứng.
 * - Bấm 1 từ (không kéo chọn) -> onWordTap (trình đọc tra nghĩa, chỉ ở chế độ luyện tập).
 * ----------------------------------------------------------------------------
 */
import { forwardRef, type MouseEvent, type ReactNode } from 'react'
import type { ReadingTask } from '../../content/content-types'
import { MarkedText, type TextMark } from '../exam-ui/MarkedText'
import { wordAtPoint, type BlockRange } from '../exam-ui/text-selection'
import { useReadingText } from './skill-reading-text'
import './ReadingPassageView.css'

export const paragraphBlockId = (label: string | undefined, index: number) => `para-${label ?? index + 1}`

export interface PassageLookup extends BlockRange {
  render: (wordNode: ReactNode) => ReactNode
}

export interface ReadingPassageViewProps {
  passage: ReadingTask['passage']
  marks: TextMark[]
  lookup?: PassageLookup | null
  /** null = tắt tra từ (thi thật) */
  onWordTap?: ((hit: BlockRange & { word: string }) => void) | null
  onNoteClick?: (mark: TextMark) => void
  hint?: string | null
}

export const ReadingPassageView = forwardRef<HTMLDivElement, ReadingPassageViewProps>(function ReadingPassageView({ passage, marks, lookup, onWordTap, onNoteClick, hint }, ref) {
  const text = useReadingText()
  const textOf = (blockId: string) => passage.paragraphs.find((paragraph, index) => paragraphBlockId(paragraph.label, index) === blockId)?.text

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!onWordTap) return
    // đang kéo chọn chữ -> để popover tô vàng xử lý
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return
    // bấm vào nút trong bong bóng nghĩa -> bỏ qua
    if ((event.target as HTMLElement).closest('button, [data-hl-ignore]')) return
    const hit = wordAtPoint(event.clientX, event.clientY, textOf)
    if (hit) onWordTap(hit)
  }

  return (
    <article className={onWordTap ? 'xpassage is-tappable' : 'xpassage'} ref={ref} onClick={onClick}>
      {hint && <p className="xpassage__hint">{hint}</p>}
      <h2 className="xpassage__title">{passage.title}</h2>
      {passage.paragraphs.map((paragraph, index) => {
        const blockId = paragraphBlockId(paragraph.label, index)
        return (
          <div key={blockId} className="xpassage__para" id={`xpara-${blockId}`}>
            {paragraph.label && (
              <span className="xpassage__label" aria-label={text('paragraph', { label: paragraph.label })}>
                {paragraph.label}
              </span>
            )}
            <MarkedText
              as="p"
              className="xpassage__text"
              blockId={blockId}
              text={paragraph.text}
              marks={marks}
              lookup={lookup && lookup.blockId === blockId ? lookup : null}
              onMarkClick={onNoteClick}
            />
          </div>
        )
      })}
    </article>
  )
})
