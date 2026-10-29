/**
 * TaskChart.tsx — BIỂU ĐỒ WRITING TASK 1 (bản v3: theo màu hệ thiết kế, có chế độ tối)
 * ----------------------------------------------------------------------------
 * Bọc lại ý tưởng của src/components/WritingTaskChart.tsx (component cũ dùng màu cứng,
 * không hợp nền tối) nhưng vẽ lại bằng biến màu --chart-1..6 (TaskChart.css).
 * Bảng màu đã chạy qua bộ kiểm tra mù màu của skill dataviz cho cả nền sáng lẫn tối.
 *
 *   line  : đường 2px + chấm, nhãn tên đường ở cuối đường, rê chuột hiện vạch dọc + số liệu năm đó
 *   bar   : cột nhóm, bo 4px đầu cột, khe 2px giữa các cột, rê chuột hiện số
 *   pie   : mỗi series 1 vòng tròn (VD 2005 và 2025), lát cách nhau 2px
 *   table : bảng (hàng = labels, cột = series)
 * Mọi biểu đồ có nút "Xem dạng bảng" (người khó phân biệt màu vẫn đọc được số).
 * describeChartAsText (gửi AI) dùng lại từ component cũ.
 * ----------------------------------------------------------------------------
 */
import { useId, useMemo, useState, type MouseEvent } from 'react'
import type { WritingTask } from '../../content/content-types'
import { useWritingText } from './skill-writing-text'
import './TaskChart.css'

export type ChartData = NonNullable<WritingTask['chartData']>
export { describeChartAsText } from '../../components/WritingTaskChart'

const SERIES_VARS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5', '--chart-6']
const colorOf = (index: number) => `var(${SERIES_VARS[index % SERIES_VARS.length]})`

interface TooltipState {
  x: number
  y: number
  title: string
  rows: { color: string; name: string; value: string }[]
}

export function TaskChart({ chart }: { chart: ChartData }) {
  const text = useWritingText()
  const [asTable, setAsTable] = useState(chart.chartType === 'table')
  const titleId = useId()

  return (
    <figure className="task-chart" aria-labelledby={titleId}>
      <figcaption id={titleId} className="task-chart__title">
        {chart.title}
        <span className="task-chart__unit">{chart.unit}</span>
      </figcaption>
      {asTable ? (
        <ChartTable chart={chart} />
      ) : chart.chartType === 'pie' ? (
        <PieCharts chart={chart} />
      ) : (
        <XYChart chart={chart} />
      )}
      {chart.chartType !== 'table' && (
        <button type="button" className="task-chart__toggle" onClick={() => setAsTable((value) => !value)}>
          {asTable ? text.showChart : text.showTable}
        </button>
      )}
    </figure>
  )
}

/* ============================================================================
 * Biểu đồ đường + cột (chung 1 hệ trục)
 * ========================================================================== */

function niceMax(value: number): number {
  if (value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const steps = [1, 2, 2.5, 5, 10]
  const step = steps.find((s) => s * magnitude >= value / 4) ?? 10
  return Math.ceil(value / (step * magnitude)) * step * magnitude
}

function XYChart({ chart }: { chart: ChartData }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const isLine = chart.chartType === 'line'
  // khung vẽ hẹp (~ bề ngang thật của cột đề) để chữ trục không bị thu nhỏ quá
  const width = 470
  const height = 290
  // chừa lề phải cho nhãn tên đường (line, ≤ 4 series)
  const directLabels = isLine && chart.series.length <= 4
  // lề phải vừa đủ cho tên đường dài nhất (~7.5px / ký tự ở cỡ chữ 13.5px)
  const longestName = Math.max(...chart.series.map((s) => s.name.length))
  const padding = { top: 14, right: directLabels ? Math.min(150, 28 + longestName * 7.5) : 12, bottom: 34, left: 40 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const maxValue = niceMax(Math.max(...chart.series.flatMap((s) => s.values)))
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => maxValue * f)
  const yOf = (value: number) => padding.top + plotHeight - (value / maxValue) * plotHeight
  const groupWidth = plotWidth / chart.labels.length
  const xOf = (index: number) => padding.left + groupWidth * (index + 0.5)

  // Nhãn cuối đường: đẩy cho không chồng nhau (cách nhau tối thiểu 14px)
  const endLabels = useMemo(() => {
    if (!directLabels) return []
    const last = chart.labels.length - 1
    const items = chart.series
      .map((series, index) => ({ name: series.name, index, y: yOf(series.values[last]) }))
      .sort((a, b) => a.y - b.y)
    for (let i = 1; i < items.length; i++) items[i].y = Math.max(items[i].y, items[i - 1].y + 17)
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, directLabels])

  function showColumn(index: number, event: MouseEvent<SVGElement>) {
    const box = (event.currentTarget.ownerSVGElement ?? (event.currentTarget as SVGSVGElement)).getBoundingClientRect()
    const scale = box.width / width
    setTooltip({
      x: xOf(index) * scale,
      y: padding.top * scale,
      title: chart.labels[index],
      rows: chart.series.map((series, s) => ({ color: colorOf(s), name: series.name, value: `${series.values[index]}` })),
    })
  }

  const barWidth = (groupWidth * 0.72) / chart.series.length

  return (
    <div className="task-chart__plot" onMouseLeave={() => setTooltip(null)}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label={chart.title}>
        {ticks.map((tick) => (
          <g key={tick} className="task-chart__grid">
            <line x1={padding.left} x2={width - padding.right} y1={yOf(tick)} y2={yOf(tick)} />
            <text x={padding.left - 8} y={yOf(tick) + 4} textAnchor="end">
              {Number.isInteger(tick) ? tick : tick.toFixed(1)}
            </text>
          </g>
        ))}
        {chart.labels.map((label, i) => (
          <text key={label} className="task-chart__axis-label" x={xOf(i)} y={height - padding.bottom + 20} textAnchor="middle">
            {label}
          </text>
        ))}

        {isLine
          ? chart.series.map((series, s) => (
              <g key={series.name}>
                <polyline
                  className="task-chart__line"
                  stroke={colorOf(s)}
                  points={series.values.map((value, i) => `${xOf(i)},${yOf(value)}`).join(' ')}
                />
                {series.values.map((value, i) => (
                  <circle key={i} className="task-chart__dot" cx={xOf(i)} cy={yOf(value)} r={4} fill={colorOf(s)} />
                ))}
              </g>
            ))
          : chart.series.map((series, s) =>
              series.values.map((value, i) => {
                const x = padding.left + groupWidth * i + groupWidth * 0.14 + barWidth * s
                const top = yOf(value)
                const barHeight = padding.top + plotHeight - top
                const w = Math.max(2, barWidth - 2) // khe 2px giữa các cột
                const r = Math.min(4, w / 2, barHeight)
                // cột bo 4px ở ĐẦU, đáy vuông bám trục
                const path = `M${x},${top + barHeight} V${top + r} Q${x},${top} ${x + r},${top} H${x + w - r} Q${x + w},${top} ${x + w},${top + r} V${top + barHeight} Z`
                return <path key={`${series.name}-${i}`} d={path} fill={colorOf(s)} className="task-chart__bar" />
              }),
            )}

        {endLabels.map((item) => (
          <g key={item.name}>
            <circle cx={width - padding.right + 10} cy={item.y} r={4} fill={colorOf(item.index)} />
            <text className="task-chart__end-label" x={width - padding.right + 18} y={item.y + 5}>
              {item.name}
            </text>
          </g>
        ))}

        {/* vùng rê chuột: 1 cột trong suốt cho mỗi nhãn trục X (to hơn nét vẽ để dễ trúng) */}
        {chart.labels.map((label, i) => (
          <rect
            key={`hit-${label}`}
            x={padding.left + groupWidth * i}
            y={padding.top}
            width={groupWidth}
            height={plotHeight}
            fill="transparent"
            onMouseEnter={(event) => showColumn(i, event)}
            onMouseMove={(event) => showColumn(i, event)}
          />
        ))}
        {tooltip && isLine && (
          <line
            className="task-chart__crosshair"
            x1={xOf(chart.labels.indexOf(tooltip.title))}
            x2={xOf(chart.labels.indexOf(tooltip.title))}
            y1={padding.top}
            y2={padding.top + plotHeight}
          />
        )}
      </svg>
      <Legend names={chart.series.map((s) => s.name)} />
      {tooltip && <ChartTooltip tooltip={tooltip} unit={chart.unit} />}
    </div>
  )
}

/* ============================================================================
 * Biểu đồ tròn: mỗi series = 1 vòng (VD năm 2005, 2025); lát = labels
 * ========================================================================== */

function PieCharts({ chart }: { chart: ChartData }) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const size = 200
  const radius = 88
  const inner = 46

  function arcPath(start: number, end: number): string {
    const point = (angle: number, r: number) => [size / 2 + r * Math.sin(angle), size / 2 - r * Math.cos(angle)]
    const large = end - start > Math.PI ? 1 : 0
    const [x1, y1] = point(start, radius)
    const [x2, y2] = point(end, radius)
    const [x3, y3] = point(end, inner)
    const [x4, y4] = point(start, inner)
    return `M${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${inner},${inner} 0 ${large} 0 ${x4},${y4} Z`
  }

  return (
    <div className="task-chart__plot" onMouseLeave={() => setTooltip(null)}>
      <div className="task-chart__pies">
        {chart.series.map((series) => {
          const total = series.values.reduce((a, b) => a + b, 0) || 1
          let angle = 0
          return (
            <div key={series.name} className="task-chart__pie">
              <svg viewBox={`0 0 ${size} ${size}`} width="100%" role="img" aria-label={`${chart.title} – ${series.name}`}>
                {series.values.map((value, i) => {
                  const start = angle
                  angle += (value / total) * Math.PI * 2
                  if (value <= 0) return null
                  return (
                    <path
                      key={chart.labels[i]}
                      d={arcPath(start, angle)}
                      fill={colorOf(i)}
                      className="task-chart__slice"
                      onMouseEnter={(event) => {
                        const box = (event.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                        const host = (event.currentTarget.closest('.task-chart__plot') as HTMLElement).getBoundingClientRect()
                        setTooltip({
                          x: box.left - host.left + box.width / 2,
                          y: box.top - host.top + 8,
                          title: `${series.name} · ${chart.labels[i]}`,
                          rows: [{ color: colorOf(i), name: chart.labels[i], value: `${value}` }],
                        })
                      }}
                    />
                  )
                })}
                <text x={size / 2} y={size / 2 + 6} textAnchor="middle" className="task-chart__pie-center">
                  {series.name}
                </text>
              </svg>
            </div>
          )
        })}
      </div>
      <Legend names={chart.labels} />
      {tooltip && <ChartTooltip tooltip={tooltip} unit={chart.unit} />}
    </div>
  )
}

/* ============================================================================
 * Phần phụ: chú thích màu, khung số liệu khi rê chuột, bảng
 * ========================================================================== */

function Legend({ names }: { names: string[] }) {
  return (
    <ul className="task-chart__legend">
      {names.map((name, i) => (
        <li key={name}>
          <span className="task-chart__swatch" style={{ background: colorOf(i) }} />
          {name}
        </li>
      ))}
    </ul>
  )
}

function ChartTooltip({ tooltip, unit }: { tooltip: TooltipState; unit: string }) {
  return (
    <div className="task-chart__tooltip" style={{ left: tooltip.x, top: tooltip.y }} role="status">
      <strong>{tooltip.title}</strong>
      {tooltip.rows.map((row) => (
        <div key={row.name} className="task-chart__tooltip-row">
          <span className="task-chart__swatch" style={{ background: row.color }} />
          <span>{row.name}</span>
          <span className="task-chart__tooltip-value">{row.value}</span>
        </div>
      ))}
      <span className="task-chart__tooltip-unit">{unit}</span>
    </div>
  )
}

function ChartTable({ chart }: { chart: ChartData }) {
  return (
    <div className="task-chart__table-wrap">
      <table className="task-chart__table">
        <thead>
          <tr>
            <th scope="col" />
            {chart.series.map((series) => (
              <th key={series.name} scope="col">
                {series.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.labels.map((label, row) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {chart.series.map((series) => (
                <td key={series.name}>{series.values[row]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
