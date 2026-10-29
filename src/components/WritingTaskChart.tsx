/**
 * WritingTaskChart.tsx — VẼ BIỂU ĐỒ CHO WRITING TASK 1
 * Đề Task 1 lưu số liệu dạng bảng (chartData) -> file này tự vẽ bằng SVG,
 * không cần ảnh. Hỗ trợ: cột (bar), đường (line), bảng (table), tròn (pie -> vẽ dạng bảng %).
 */
import type { WritingTask } from '../content/content-types'

type ChartData = NonNullable<WritingTask['chartData']>

const SERIES_COLORS = ['#2f6fed', '#f2711c', '#12a37a', '#db3f8c', '#7c5cf0', '#0b9fd8']

/** Chuyển dữ liệu biểu đồ thành chữ để gửi AI chấm. */
export function describeChartAsText(chart: ChartData): string {
  const header = `${chart.chartType} chart: ${chart.title} (unit: ${chart.unit})`
  const rows = chart.series.map(
    (series) => `${series.name}: ` + chart.labels.map((label, i) => `${label}=${series.values[i]}`).join(', '),
  )
  return [header, ...rows].join('\n')
}

export function WritingTaskChart({ chart }: { chart: ChartData }) {
  if (chart.chartType === 'table' || chart.chartType === 'pie') return <ChartAsTable chart={chart} />

  // Kích thước khung vẽ
  const width = 560
  const height = 300
  const padding = { top: 20, right: 16, bottom: 44, left: 48 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const maxValue = Math.max(...chart.series.flatMap((s) => s.values)) * 1.1 || 1
  const yOf = (value: number) => padding.top + plotHeight - (value / maxValue) * plotHeight
  const tickValues = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxValue * f))
  const groupWidth = plotWidth / chart.labels.length

  return (
    <div className="chart-box">
      <div style={{ fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>{chart.title}</div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img" aria-label={chart.title}>
        {/* đường lưới ngang + nhãn trục Y */}
        {tickValues.map((tick) => (
          <g key={tick}>
            <line x1={padding.left} x2={width - padding.right} y1={yOf(tick)} y2={yOf(tick)} stroke="#e2e5eb" />
            <text x={padding.left - 6} y={yOf(tick) + 4} fontSize="11" textAnchor="end" fill="#667085">
              {tick}
            </text>
          </g>
        ))}
        {/* nhãn trục X */}
        {chart.labels.map((label, i) => (
          <text key={label} x={padding.left + groupWidth * (i + 0.5)} y={height - padding.bottom + 18} fontSize="11" textAnchor="middle" fill="#344054">
            {label}
          </text>
        ))}
        <text x={12} y={padding.top + plotHeight / 2} fontSize="11" fill="#667085" transform={`rotate(-90 12 ${padding.top + plotHeight / 2})`} textAnchor="middle">
          {chart.unit}
        </text>

        {chart.chartType === 'bar'
          ? chart.series.map((series, seriesIndex) => {
              const barWidth = (groupWidth * 0.7) / chart.series.length
              return series.values.map((value, i) => (
                <rect
                  key={`${series.name}-${i}`}
                  x={padding.left + groupWidth * i + groupWidth * 0.15 + barWidth * seriesIndex}
                  y={yOf(value)}
                  width={barWidth - 2}
                  height={padding.top + plotHeight - yOf(value)}
                  rx={2}
                  fill={SERIES_COLORS[seriesIndex % SERIES_COLORS.length]}
                />
              ))
            })
          : chart.series.map((series, seriesIndex) => (
              <g key={series.name}>
                <polyline
                  fill="none"
                  stroke={SERIES_COLORS[seriesIndex % SERIES_COLORS.length]}
                  strokeWidth={2.5}
                  points={series.values.map((value, i) => `${padding.left + groupWidth * (i + 0.5)},${yOf(value)}`).join(' ')}
                />
                {series.values.map((value, i) => (
                  <circle key={i} cx={padding.left + groupWidth * (i + 0.5)} cy={yOf(value)} r={3.5} fill={SERIES_COLORS[seriesIndex % SERIES_COLORS.length]} />
                ))}
              </g>
            ))}
      </svg>
      {/* chú thích màu */}
      <div className="row small" style={{ justifyContent: 'center' }}>
        {chart.series.map((series, i) => (
          <span key={series.name} className="row" style={{ gap: 6 }}>
            <span className="skill-dot" style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }} />
            {series.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ChartAsTable({ chart }: { chart: ChartData }) {
  return (
    <div className="chart-box">
      <div style={{ fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>{chart.title}</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: 6, borderBottom: '2px solid #e2e5eb' }}>({chart.unit})</th>
            {chart.labels.map((label) => (
              <th key={label} style={{ padding: 6, borderBottom: '2px solid #e2e5eb' }}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chart.series.map((series) => (
            <tr key={series.name}>
              <td style={{ padding: 6, borderBottom: '1px solid #e2e5eb', fontWeight: 600 }}>{series.name}</td>
              {series.values.map((value, i) => (
                <td key={i} style={{ padding: 6, borderBottom: '1px solid #e2e5eb', textAlign: 'center' }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
