/**
 * WritingGapChart.tsx — "BẠN TỰ CHẤM vs AI CHẤM" QUA CÁC BÀI VIẾT
 * ----------------------------------------------------------------------------
 * Mỗi cột = 1 bài viết (cũ -> mới). Thanh dọc = khoảng band AI chấm (màu Viết, nhạt);
 * chấm tròn rỗng = band người học tự chấm. Khoảng cách chấm–thanh = "độ lệch tự đánh giá"
 * (psych-adult D9 luật 37: theo dõi độ lệch theo thời gian). 2 chuỗi -> luôn có chú giải.
 * Trục y 3–8, lưới mảnh mỗi 1 band, nhãn số ở trái.
 * ----------------------------------------------------------------------------
 */
import type { WritingPoint } from '../dashboard-stats'
import { useDashboardText } from '../progress-dashboard-text'

const Y_MIN = 3
const Y_MAX = 8

export function WritingGapChart({ points, height = 160 }: { points: WritingPoint[]; height?: number }) {
  const text = useDashboardText()
  const y = (band: number) => (1 - (Math.max(Y_MIN, Math.min(Y_MAX, band)) - Y_MIN) / (Y_MAX - Y_MIN)) * height
  const ticks = Array.from({ length: Y_MAX - Y_MIN + 1 }, (_, index) => Y_MIN + index)
  const fmt = (band: number) => band.toFixed(1)

  return (
    <div className="writing-chart">
      <div className="writing-chart__legend">
        <span className="writing-chart__key">
          <span className="writing-chart__swatch-range" /> {text.legendAi}
        </span>
        <span className="writing-chart__key">
          <span className="writing-chart__swatch-dot" /> {text.legendSelf}
        </span>
      </div>
      <div className="writing-chart__body">
        <div className="writing-chart__axis" style={{ height }} aria-hidden>
          {ticks.map((tick) => (
            <span key={tick} style={{ top: y(tick) }}>
              {tick}
            </span>
          ))}
        </div>
        <div className="writing-chart__plot" style={{ height }}>
          {ticks.map((tick) => (
            <span key={tick} className="writing-chart__grid" style={{ top: y(tick) }} />
          ))}
          {points.map((point) => {
            const tooltip = text.writingEntryTooltip(point.index, fmt(point.self), `${fmt(point.aiLow)}–${fmt(point.aiHigh)}`)
            return (
              <span key={point.index} className="writing-chart__col" title={tooltip} aria-label={tooltip} role="img">
                <span className="writing-chart__range" style={{ top: y(point.aiHigh), height: Math.max(6, y(point.aiLow) - y(point.aiHigh)) }} />
                <span className="writing-chart__dot" style={{ top: y(point.self) }} />
              </span>
            )
          })}
        </div>
        <span />
        <div className="writing-chart__x" aria-hidden>
          {points.map((point) => (
            <span key={point.index}>{text.essayLabel(point.index)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
