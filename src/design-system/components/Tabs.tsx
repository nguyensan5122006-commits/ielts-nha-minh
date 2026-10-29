/**
 * Tabs.tsx — THANH TAB (VD "Tiếng Anh tổng quát" | "Luyện thi IELTS")
 * ----------------------------------------------------------------------------
 *   const [track, setTrack] = useState('general')
 *   <Tabs
 *     label="Chọn lộ trình"
 *     items={[{ id: 'general', label: 'Tiếng Anh tổng quát' }, { id: 'ielts', label: 'Luyện thi IELTS', icon: '🎯' }]}
 *     value={track}
 *     onChange={setTrack}
 *     idPrefix="track"
 *   />
 *   <div role="tabpanel" id="track-panel-general" aria-labelledby="track-tab-general">…</div>
 *
 * Bàn phím (chuẩn WAI-ARIA): ← → để chuyển tab, Home/End về đầu/cuối.
 * Chỉ tab đang chọn nằm trong vòng Tab (tabindex 0), các tab khác -1.
 * ----------------------------------------------------------------------------
 */
import { useRef, type KeyboardEvent, type ReactNode } from 'react'
import './Tabs.css'

export interface TabItem<Id extends string = string> {
  id: Id
  label: ReactNode
  /** icon/emoji/ảnh nhỏ trước chữ */
  icon?: ReactNode
  /** số đếm nhỏ sau chữ (VD 3 thẻ cần ôn) */
  count?: number
  disabled?: boolean
}

export interface TabsProps<Id extends string = string> {
  items: TabItem<Id>[]
  value: Id
  onChange: (id: Id) => void
  /** nhãn cho cả nhóm tab (trình đọc màn hình) */
  label: string
  /** tiền tố id để nối tab với panel: tab = `${idPrefix}-tab-${id}`, panel = `${idPrefix}-panel-${id}` */
  idPrefix?: string
  /** underline = gạch chân (mặc định) · pill = viên thuốc trên nền kem */
  variant?: 'underline' | 'pill'
  className?: string
}

export function Tabs<Id extends string = string>({ items, value, onChange, label, idPrefix = 'tabs', variant = 'underline', className }: TabsProps<Id>) {
  const listRef = useRef<HTMLDivElement>(null)

  function focusTab(index: number) {
    const enabled = items.filter((item) => !item.disabled)
    const target = enabled[(index + enabled.length) % enabled.length]
    if (!target) return
    onChange(target.id)
    listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${target.id}"]`)?.focus()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const enabled = items.filter((item) => !item.disabled)
    const current = enabled.findIndex((item) => item.id === value)
    if (event.key === 'ArrowRight') focusTab(current + 1)
    else if (event.key === 'ArrowLeft') focusTab(current - 1)
    else if (event.key === 'Home') focusTab(0)
    else if (event.key === 'End') focusTab(enabled.length - 1)
    else return
    event.preventDefault()
  }

  return (
    <div ref={listRef} className={['ds-tabs', `ds-tabs--${variant}`, className].filter(Boolean).join(' ')} role="tablist" aria-label={label} onKeyDown={onKeyDown}>
      {items.map((item) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${item.id}`}
            aria-controls={`${idPrefix}-panel-${item.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            data-tab-id={item.id}
            className={selected ? 'ds-tab is-selected' : 'ds-tab'}
            onClick={() => onChange(item.id)}
          >
            {item.icon && <span className="ds-tab__icon">{item.icon}</span>}
            <span className="ds-tab__label">{item.label}</span>
            {item.count !== undefined && <span className="ds-tab__count">{item.count}</span>}
          </button>
        )
      })}
    </div>
  )
}
