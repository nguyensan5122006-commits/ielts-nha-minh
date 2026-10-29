/**
 * Sparkline.tsx — ĐƯỜNG XU HƯỚNG NHỎ (độ chính xác qua 40 câu gần nhất)
 * ----------------------------------------------------------------------------
 *   <Sparkline values={[0.6, 0.7, 0.75, …]} color="var(--skill-reading)" label="…" />
 *
 * Quy ước dataviz: nét 2px bo tròn, vùng dưới đường tô màu cùng tông ~10%, chấm cuối ≥ 8px
 * có viền 2px màu nền (nổi trên đường). Rê chuột -> chấm + nhãn % tại điểm gần nhất.
 * Màu nét = màu kỹ năng (nhận diện); chữ luôn dùng màu chữ thường.
 * ----------------------------------------------------------------------------
 */
import { useId, useState, type MouseEvent } from 'react'

export interface SparklineProps {
  /** giá trị 0..1 */
  values: number[]
  color: string
  label: string
  width?: number
  height?: number
}

export function Sparkline({ values, color, label, width = 168, height = 48 }: SparklineProps) {
  const gradientId = 'spark-' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const [hover, setHover] = useState<number | null>(null)
  if (values.length < 2) return null
  const pad = 5 // chừa chỗ cho chấm cuối không bị cắt
  const x = (index: number) => pad + (index / (values.length - 1)) * (width - pad * 2)
  // trục y cố định 0..100% để so được giữa các kỹ năng (không phóng to dao động nhỏ)
  const y = (value: number) => pad + (1 - value) * (height - pad * 2)
  const line = values.map((value, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(' ')
  const area = `${line} L${x(values.length - 1).toFixed(1)},${height} L${x(0).toFixed(1)},${height} Z`
  const shown = hover ?? values.length - 1

  function onMove(event: MouseEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - box.left) / box.width
    setHover(Math.max(0, Math.min(values.length - 1, Math.round(ratio * (values.length - 1)))))
  }

  return (
    <span className="sparkline">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label={label} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* đường mốc 50% mảnh, chìm */}
        <line x1={pad} x2={width - pad} y1={y(0.5)} y2={y(0.5)} className="sparkline__grid" vectorEffect="non-scaling-stroke" />
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <circle cx={x(shown)} cy={y(values[shown])} r={4.5} fill={color} className="sparkline__dot" />
      </svg>
      {hover !== null && (
        <span className="sparkline__tip" style={{ left: `${(x(hover) / width) * 100}%` }}>
          {Math.round(values[hover] * 100)}%
        </span>
      )}
    </span>
  )
}
