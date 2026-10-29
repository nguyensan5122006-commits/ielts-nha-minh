/**
 * HighlightNotesLayer.tsx — TÔ VÀNG + GHI CHÚ TRÊN BÀI (giống máy thi IELTS)
 * ----------------------------------------------------------------------------
 * Gồm 3 phần dùng cùng nhau:
 *
 *   const notes = useHighlightNotes(savedMarks, (marks) => save(marks))   // trạng thái
 *   <SelectionToolbar containerRef={passageRef} onHighlight={notes.highlight}
 *                     onNote={(r) => { const id = notes.addNote(r); openPanel(id) }}
 *                     onRemove={notes.removeIn} canRemove={notes.hasMarkIn} />
 *   <NotesPanel notes={notes.noteMarks} … />                              // cột ghi chú bên phải
 *   <MarkedText … marks={notes.textMarks} />                                // vẽ chữ đã tô
 *
 * Bôi đen chữ -> popover nhỏ ngay dưới vùng chọn: "Tô vàng | Ghi chú" (+ "Xoá tô" nếu đã tô).
 * Ghi chú mở cột phải 300px (đẩy nội dung, không che). Mọi thứ lưu bằng vị trí ký tự (JSON).
 * Bàn phím: chọn chữ bằng Shift + mũi tên cũng hiện popover; Esc để ẩn.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Icon } from '../../design-system/components/Icon'
import { IconButton } from '../../design-system/components/IconButton'
import { useExamUiText } from './exam-ui-text'
import type { TextMark } from './MarkedText'
import { selectionToBlockRanges, type BlockRange } from './text-selection'
import './HighlightNotesLayer.css'

/* ============================================================================
 * 1. TRẠNG THÁI
 * ========================================================================== */

export interface UserMark extends BlockRange {
  id: string
  kind: 'highlight' | 'note'
  /** đoạn chữ đã chọn (hiện trong cột ghi chú) */
  quote: string
  note?: string
  createdAt: string
}

const overlaps = (a: BlockRange, b: BlockRange) => a.blockId === b.blockId && a.start < b.end && b.start < a.end
let markCounter = 0
const newMarkId = () => `m${Date.now().toString(36)}${(markCounter++).toString(36)}`

/**
 * @param initial  mark đã lưu (VD từ resume)
 * @param onChange gọi mỗi khi danh sách thay đổi (để lưu)
 * @param textOf   lấy chữ gốc của khối -> tạo `quote`
 */
export function useHighlightNotes(initial: UserMark[] | undefined, onChange: ((marks: UserMark[]) => void) | undefined, textOf: (blockId: string) => string) {
  const [marks, setMarks] = useState<UserMark[]>(initial ?? [])
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    onChangeRef.current?.(marks)
  }, [marks])

  const quoteOf = useCallback((range: BlockRange) => textOf(range.blockId).slice(range.start, range.end).trim(), [textOf])

  /** Kéo chọn lỡ cắt giữa từ ("provid|es") -> nới ra trọn từ, bỏ khoảng trắng 2 đầu (như bút dạ thật). */
  const snapToWords = useCallback(
    (range: BlockRange): BlockRange => {
      const text = textOf(range.blockId)
      let { start, end } = range
      while (start > 0 && /[\p{L}\p{N}'’-]/u.test(text[start - 1]) && /[\p{L}\p{N}]/u.test(text[start] ?? '')) start--
      while (end < text.length && /[\p{L}\p{N}'’-]/u.test(text[end]) && /[\p{L}\p{N}]/u.test(text[end - 1] ?? '')) end++
      while (start < end && /\s/.test(text[start])) start++
      while (end > start && /\s/.test(text[end - 1])) end--
      return { ...range, start, end }
    },
    [textOf],
  )

  const highlight = useCallback(
    (ranges: BlockRange[]) =>
      setMarks((current) => [
        ...current,
        ...ranges.map(snapToWords).filter((range) => range.end > range.start).map((range) => ({ ...range, id: newMarkId(), kind: 'highlight' as const, quote: quoteOf(range), createdAt: new Date().toISOString() })),
      ]),
    [quoteOf, snapToWords],
  )

  /** Tạo ghi chú (gộp các khối được chọn thành 1 ghi chú ở khối đầu). Trả về id để mở cột ghi chú. */
  const addNote = useCallback(
    (rawRanges: BlockRange[]): string => {
      const id = newMarkId()
      const ranges = rawRanges.map(snapToWords)
      const first = ranges[0]
      const quote = ranges.map(quoteOf).join(' … ')
      setMarks((current) => [...current, { ...first, id, kind: 'note', quote, note: '', createdAt: new Date().toISOString() }])
      return id
    },
    [quoteOf, snapToWords],
  )

  const removeIn = useCallback((ranges: BlockRange[]) => setMarks((current) => current.filter((mark) => !ranges.some((range) => overlaps(mark, range)))), [])
  const hasMarkIn = useCallback((ranges: BlockRange[]) => marks.some((mark) => ranges.some((range) => overlaps(mark, range))), [marks])
  const updateNote = useCallback((id: string, note: string) => setMarks((current) => current.map((mark) => (mark.id === id ? { ...mark, note } : mark))), [])
  const remove = useCallback((id: string) => setMarks((current) => current.filter((mark) => mark.id !== id)), [])

  const textMarks = useMemo<TextMark[]>(() => marks.map((mark) => ({ id: mark.id, blockId: mark.blockId, start: mark.start, end: mark.end, kind: mark.kind })), [marks])
  const noteMarks = useMemo(() => marks.filter((mark) => mark.kind === 'note'), [marks])

  return { marks, textMarks, noteMarks, highlight, addNote, removeIn, hasMarkIn, updateNote, remove }
}

/* ============================================================================
 * 2. POPOVER KHI BÔI ĐEN CHỮ
 * ========================================================================== */

interface ToolbarState {
  ranges: BlockRange[]
  left: number
  top: number
  placement: 'below' | 'above'
}

export interface SelectionToolbarProps {
  /** vùng chứa các khối chữ (data-hl-block) */
  containerRef: RefObject<HTMLElement | null>
  enabled?: boolean
  onHighlight: (ranges: BlockRange[]) => void
  onNote: (ranges: BlockRange[]) => void
  onRemove: (ranges: BlockRange[]) => void
  canRemove: (ranges: BlockRange[]) => boolean
}

export function SelectionToolbar({ containerRef, enabled = true, onHighlight, onNote, onRemove, canRemove }: SelectionToolbarProps) {
  const text = useExamUiText()
  const [state, setState] = useState<ToolbarState | null>(null)
  const visibleRef = useRef(false)
  visibleRef.current = state !== null

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return
    const check = () =>
      window.setTimeout(() => {
        const selection = window.getSelection()
        const ranges = selectionToBlockRanges(container, selection)
        if (!ranges.length || !selection || selection.rangeCount === 0) return setState(null)
        const rect = selection.getRangeAt(0).getBoundingClientRect()
        const width = 260
        const left = Math.min(window.innerWidth - width / 2 - 8, Math.max(width / 2 + 8, rect.left + rect.width / 2))
        const below = rect.bottom + 64 < window.innerHeight
        setState({ ranges, left, top: below ? rect.bottom + 10 : rect.top - 10, placement: below ? 'below' : 'above' })
      }, 0)
    const onKeyUp = (event: KeyboardEvent) => event.shiftKey && check()
    const hide = () => setState(null)
    const onSelectionChange = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) setState(null)
    }
    // Esc khi popover đang mở: chỉ đóng popover (pha capture + preventDefault -> không kích hoạt "thoát bài")
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !visibleRef.current) return
      event.preventDefault()
      window.getSelection()?.removeAllRanges()
      hide()
    }
    container.addEventListener('mouseup', check)
    container.addEventListener('keyup', onKeyUp)
    document.addEventListener('selectionchange', onSelectionChange)
    document.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      container.removeEventListener('mouseup', check)
      container.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('selectionchange', onSelectionChange)
      document.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [containerRef, enabled])

  if (!state) return null
  const run = (action: (ranges: BlockRange[]) => void) => {
    action(state.ranges)
    window.getSelection()?.removeAllRanges()
    setState(null)
  }
  const removable = canRemove(state.ranges)

  return (
    <div
      className={`xhl-toolbar is-${state.placement}`}
      style={{ left: state.left, top: state.top }}
      role="toolbar"
      aria-label={text('highlight')}
      // giữ nguyên vùng chọn khi bấm nút
      onMouseDown={(event) => event.preventDefault()}
    >
      <button type="button" className="xhl-toolbar__btn" onClick={() => run(onHighlight)}>
        <span className="xhl-toolbar__swatch" aria-hidden />
        {text('highlight')}
      </button>
      <button type="button" className="xhl-toolbar__btn" onClick={() => run(onNote)}>
        <Icon name="plus" size={16} />
        {text('addNote')}
      </button>
      {removable && (
        <button type="button" className="xhl-toolbar__btn xhl-toolbar__btn--remove" onClick={() => run(onRemove)}>
          <Icon name="close" size={16} />
          {text('removeHighlight')}
        </button>
      )}
    </div>
  )
}

/* ============================================================================
 * 3. CỘT GHI CHÚ
 * ========================================================================== */

export interface NotesPanelProps {
  notes: UserMark[]
  onClose: () => void
  onChangeNote: (id: string, note: string) => void
  onDelete: (id: string) => void
  /** bấm vào trích đoạn -> cuộn tới chỗ đó trong bài */
  onLocate?: (note: UserMark) => void
  /** tên khối để hiện, VD "Đoạn B" */
  blockLabel?: (blockId: string) => string
  /** ghi chú vừa tạo -> tự đặt con trỏ vào ô gõ */
  focusId?: string | null
}

export function NotesPanel({ notes, onClose, onChangeNote, onDelete, onLocate, blockLabel, focusId }: NotesPanelProps) {
  const text = useExamUiText()
  const focusRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    focusRef.current?.focus()
  }, [focusId])

  return (
    <aside className="xhl-notes" aria-label={text('notesTitle')}>
      <header className="xhl-notes__header">
        <h2 className="xhl-notes__title">{text('notesTitle')}</h2>
        <IconButton icon="close" label={text('closeNotes')} size="sm" variant="ghost" onClick={onClose} />
      </header>
      {notes.length === 0 ? (
        <p className="xhl-notes__empty">{text('notesEmpty')}</p>
      ) : (
        <ul className="xhl-notes__list">
          {notes.map((note) => (
            <li key={note.id} className="xhl-note">
              <div className="xhl-note__meta">
                {blockLabel && <span className="xhl-note__block">{blockLabel(note.blockId)}</span>}
                <button type="button" className="xhl-note__delete" onClick={() => onDelete(note.id)}>
                  {text('deleteNote')}
                </button>
              </div>
              <button type="button" className="xhl-note__quote" onClick={() => onLocate?.(note)} title={text('goToText')}>
                “{note.quote.length > 140 ? `${note.quote.slice(0, 140)}…` : note.quote}”
              </button>
              <textarea
                ref={note.id === focusId ? focusRef : undefined}
                className="xhl-note__input"
                rows={3}
                value={note.note ?? ''}
                placeholder={text('notePlaceholder')}
                onChange={(event) => onChangeNote(note.id, event.target.value)}
                spellCheck={false}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
