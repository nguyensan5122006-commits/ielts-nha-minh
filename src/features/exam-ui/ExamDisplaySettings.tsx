/**
 * ExamDisplaySettings.tsx — TUỲ CHỌN HIỂN THỊ PHÒNG THI: độ tương phản + cỡ chữ
 * ----------------------------------------------------------------------------
 *   const display = useExamDisplay()
 *   <div className="xf" {...display.rootProps}>        // gắn lên khung ngoài cùng của bài thi
 *     <ExamDisplaySettings display={display} />         // nút "Aa Hiển thị" trên header
 *
 * Giống máy thi IELTS (Options -> Contrast / Text size), thêm 1 lựa chọn "Theo giao diện"
 * (sáng/tối của web) làm mặc định:
 *   - contrast: 'theme' | 'black-on-white' | 'white-on-black' | 'yellow-on-black'
 *   - textSize: 'regular' | 'large' | 'xlarge'   (nhân cỡ chữ 1 / 1.15 / 1.3)
 * Lựa chọn được nhớ trong localStorage (dùng chung cho mọi bài Listening/Reading/phòng thi).
 * Màu của từng chế độ khai báo trong ExamDisplaySettings.css (đổi lại token --c-*).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { SegmentedControl } from '../../design-system/components/SegmentedControl'
import { useExamUiText, type ExamUiTextKey } from './exam-ui-text'
import './ExamDisplaySettings.css'

export type ExamContrast = 'theme' | 'black-on-white' | 'white-on-black' | 'yellow-on-black'
export type ExamTextSize = 'regular' | 'large' | 'xlarge'

const STORAGE_KEY = 'ielts-exam-display'
const TEXT_SCALE: Record<ExamTextSize, number> = { regular: 1, large: 1.15, xlarge: 1.3 }

interface DisplayState {
  contrast: ExamContrast
  textSize: ExamTextSize
}

function readSaved(): DisplayState {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<DisplayState>
    return {
      contrast: (['theme', 'black-on-white', 'white-on-black', 'yellow-on-black'] as const).includes(saved.contrast as ExamContrast) ? saved.contrast! : 'theme',
      textSize: (['regular', 'large', 'xlarge'] as const).includes(saved.textSize as ExamTextSize) ? saved.textSize! : 'regular',
    }
  } catch {
    return { contrast: 'theme', textSize: 'regular' }
  }
}

export function useExamDisplay() {
  const [state, setState] = useState<DisplayState>(readSaved)
  const update = useCallback((patch: Partial<DisplayState>) => {
    setState((current) => {
      const next = { ...current, ...patch }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* bỏ qua */
      }
      return next
    })
  }, [])
  const rootProps = useMemo(
    () => ({
      'data-exam-contrast': state.contrast,
      style: { '--exam-text-scale': TEXT_SCALE[state.textSize] } as CSSProperties,
    }),
    [state],
  )
  return { ...state, setContrast: (contrast: ExamContrast) => update({ contrast }), setTextSize: (textSize: ExamTextSize) => update({ textSize }), rootProps }
}

export type ExamDisplay = ReturnType<typeof useExamDisplay>

const CONTRAST_OPTIONS: { value: ExamContrast; label: ExamUiTextKey }[] = [
  { value: 'theme', label: 'contrastDefault' },
  { value: 'black-on-white', label: 'contrastBlackOnWhite' },
  { value: 'white-on-black', label: 'contrastWhiteOnBlack' },
  { value: 'yellow-on-black', label: 'contrastYellowOnBlack' },
]

export function ExamDisplaySettings({ display }: { display: ExamDisplay }) {
  const text = useExamUiText()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // bấm ra ngoài / Esc để đóng
  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => !rootRef.current?.contains(event.target as Node) && setOpen(false)
    // Esc: chỉ đóng bảng chọn (capture + preventDefault -> không kích hoạt "thoát bài")
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open])

  return (
    <div className="xdisplay" ref={rootRef}>
      <button type="button" className="xf-tool" aria-expanded={open} aria-haspopup="dialog" aria-label={text('display')} title={text('display')} onClick={() => setOpen((value) => !value)}>
        <span className="xdisplay__aa" aria-hidden>
          Aa
        </span>
        <span className="xf-tool__label">{text('display')}</span>
      </button>
      {open && (
        <div className="xdisplay__panel" role="dialog" aria-label={text('display')}>
          <p className="xdisplay__heading">{text('contrast')}</p>
          <div className="xdisplay__swatches" role="radiogroup" aria-label={text('contrast')}>
            {CONTRAST_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={display.contrast === option.value}
                className={`xdisplay__swatch xdisplay__swatch--${option.value}`}
                onClick={() => display.setContrast(option.value)}
              >
                <span className="xdisplay__sample" aria-hidden>
                  Aa
                </span>
                <span>{text(option.label)}</span>
              </button>
            ))}
          </div>
          <p className="xdisplay__heading">{text('textSize')}</p>
          <SegmentedControl
            label={text('textSize')}
            size="sm"
            value={display.textSize}
            onChange={display.setTextSize}
            options={[
              { value: 'regular', label: text('textRegular') },
              { value: 'large', label: text('textLarge') },
              { value: 'xlarge', label: text('textExtraLarge') },
            ]}
          />
        </div>
      )}
    </div>
  )
}
