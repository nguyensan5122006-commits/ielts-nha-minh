/**
 * MemoryLevelColumns.tsx — BIỂU ĐỒ 5 CỘT "CẤP ĐỘ NHỚ" (ý tưởng "Thời điểm vàng" của Mochi)
 * ----------------------------------------------------------------------------
 *   <MemoryLevelColumns counts={{1: 12, 2: 30, 3: 41, 4: 20, 5: 88}} onSelect={(level) => …} />
 *
 * Mỗi cột = 1 nấc nhớ (Mới gặp → Khắc sâu). Chiều cao cột tỉ lệ số từ, số đếm ghi trên đỉnh,
 * tên nấc ghi dưới chân (chữ dùng màu chữ thường, KHÔNG dùng màu cột — dataviz).
 * Màu cột: thang tuần tự 1 màu nhạt -> đậm (--memory-1 … --memory-5, đã kiểm bằng
 * validate_palette.js --ordinal cho cả nền sáng lẫn tối).
 * Có onSelect -> mỗi cột là 1 nút (bấm để lọc sổ từ theo nấc đó).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { MEMORY_LEVELS, type MemoryLevel } from '../memory-levels'
import { useReviewText } from '../vocabulary-review-text'

export interface MemoryLevelColumnsProps {
  counts: Record<MemoryLevel, number>
  /** nấc đang được chọn (tô nền) */
  selected?: MemoryLevel | null
  onSelect?: (level: MemoryLevel) => void
  /** chiều cao vùng cột (px), mặc định 120 */
  height?: number
}

export function MemoryLevelColumns({ counts, selected = null, onSelect, height = 120 }: MemoryLevelColumnsProps) {
  const text = useReviewText()
  const max = Math.max(1, ...MEMORY_LEVELS.map((level) => counts[level]))

  return (
    <div className="memory-columns" style={{ '--columns-h': `${height}px` } as CSSProperties}>
      {MEMORY_LEVELS.map((level) => {
        const count = counts[level]
        // cột có dữ liệu cao tối thiểu 6px để vẫn thấy được; 0 thì chỉ còn đường chân
        const barHeight = count === 0 ? 0 : Math.max(6, Math.round((count / max) * height))
        const name = text.memoryLevelName[level]
        const content = (
          <>
            <span className="memory-columns__plot">
              <span className="memory-columns__value">{count}</span>
              <span className="memory-columns__bar" style={{ height: barHeight, background: `var(--memory-${level})` }} />
            </span>
            <span className="memory-columns__label">{name}</span>
          </>
        )
        const title = `${name}: ${count} — ${text.memoryLevelHint[level]}`
        return onSelect ? (
          <button
            key={level}
            type="button"
            className={`memory-columns__col is-clickable${selected === level ? ' is-selected' : ''}`}
            onClick={() => onSelect(level)}
            aria-pressed={selected === level}
            title={title}
          >
            {content}
          </button>
        ) : (
          <div key={level} className="memory-columns__col" title={title}>
            {content}
          </div>
        )
      })}
    </div>
  )
}
