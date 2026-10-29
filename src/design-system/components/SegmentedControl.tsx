/**
 * SegmentedControl.tsx — CÔNG TẮC NHIỀU LỰA CHỌN (chọn 1 trong 2–4)
 * ----------------------------------------------------------------------------
 *   <SegmentedControl
 *     label="Tốc độ"
 *     options={[{ value: 0.75, label: '0.75×' }, { value: 1, label: '1×' }, { value: 1.25, label: '1.25×' }]}
 *     value={rate}
 *     onChange={setRate}
 *   />
 *
 * Khác Tabs: Tabs đổi "trang con"; SegmentedControl đổi 1 CÀI ĐẶT.
 * Có "viên trượt" chạy theo lựa chọn. Bàn phím: ← → (nhóm radio chuẩn).
 * ----------------------------------------------------------------------------
 */
import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'
import './SegmentedControl.css'

export interface SegmentOption<Value extends string | number> {
  value: Value
  label: ReactNode
  /** nhãn đọc màn hình khi label chỉ là icon */
  ariaLabel?: string
}

export interface SegmentedControlProps<Value extends string | number> {
  options: SegmentOption<Value>[]
  value: Value
  onChange: (value: Value) => void
  /** nhãn cho cả nhóm */
  label: string
  size?: 'sm' | 'md'
  className?: string
}

export function SegmentedControl<Value extends string | number>({ options, value, onChange, label, size = 'md', className }: SegmentedControlProps<Value>) {
  const groupRef = useRef<HTMLDivElement>(null)
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    let next = selectedIndex
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selectedIndex + 1) % options.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selectedIndex - 1 + options.length) % options.length
    else return
    event.preventDefault()
    onChange(options[next].value)
    groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
  }

  // viên trượt: rộng 1/n, dịch sang phải theo vị trí lựa chọn
  const style = { '--seg-count': options.length, '--seg-index': selectedIndex } as CSSProperties

  return (
    <div ref={groupRef} className={['ds-segmented', `ds-segmented--${size}`, className].filter(Boolean).join(' ')} role="radiogroup" aria-label={label} style={style} onKeyDown={onKeyDown}>
      <span className="ds-segmented__thumb" aria-hidden />
      {options.map((option, index) => {
        const checked = index === selectedIndex
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={option.ariaLabel}
            title={option.ariaLabel}
            tabIndex={checked ? 0 : -1}
            className={checked ? 'ds-segmented__option is-checked' : 'ds-segmented__option'}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
