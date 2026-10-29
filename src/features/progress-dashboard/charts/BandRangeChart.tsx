/**
 * BandRangeChart.tsx — BAND THEO KỸ NĂNG DẠNG "KHOẢNG" QUANH VẠCH MỤC TIÊU
 * ----------------------------------------------------------------------------
 * Ý tưởng DataCamp "skill bars quanh vạch mục tiêu" + IELTS Ready "band hiện tại vs mục tiêu".
 *   - Mỗi hàng = 1 kỹ năng IELTS (Nghe, Đọc, Viết, Nói); thang chung 0–9, lưới mảnh mỗi 1 band.
 *   - Thanh = KHOẢNG band ước tính (không bao giờ 1 điểm), màu kỹ năng; độ tin cậy thấp -> thanh nhạt hơn.
 *   - Vạch dọc = band mục tiêu (mặc định 6.5) chạy qua mọi hàng.
 *   - Bên phải: chữ "4.5–5.5 · còn ~1–2 band" (chữ màu thường, không dùng màu kỹ năng).
 *   - Chưa đủ dữ liệu: hàng hiện "Cần thêm N câu để ước tính" thay cho thanh.
 * Nhận diện kỹ năng KHÔNG chỉ bằng màu: luôn có icon + tên ở đầu hàng.
 * ----------------------------------------------------------------------------
 */
import type { SkillName } from '../../../content/content-types'
import { SkillIcon } from '../../../design-system/components/SkillIcon'
import { gapToTarget, type SkillBand } from '../dashboard-stats'
import { useDashboardText } from '../progress-dashboard-text'

const SCALE_MAX = 9

export interface BandRangeChartProps {
  rows: { skill: SkillName; band: SkillBand }[]
  target: number
}


export function BandRangeChart({ rows, target }: BandRangeChartProps) {
  const text = useDashboardText()
  // thang bắt đầu dưới band thấp nhất 1 bậc (VD 3–9) để khoảng không bị bé tí; chưa có số liệu -> 0–9
  const lows = rows.flatMap(({ band }) => (band.kind === 'range' ? [band.low] : []))
  const scaleMin = lows.length ? Math.max(0, Math.min(Math.floor(Math.min(...lows)) - 1, Math.floor(target) - 2)) : 0
  const ticks = Array.from({ length: SCALE_MAX - scaleMin + 1 }, (_, index) => scaleMin + index)
  /** Vị trí % trên thang. */
  const at = (band: number) => ((band - scaleMin) / (SCALE_MAX - scaleMin)) * 100
  return (
    <div className="band-chart">
      {/* hàng thước: số band + nhãn mục tiêu */}
      <div className="band-chart__row band-chart__row--scale" aria-hidden>
        <span />
        <div className="band-chart__track band-chart__track--scale">
          {ticks
            .filter((tick) => Math.abs(tick - target) >= 0.8) // không đè lên nhãn mục tiêu
            .map((tick) => (
            <span key={tick} className="band-chart__tick-label" style={{ left: `${at(tick)}%` }}>
              {tick}
            </span>
          ))}
          <span className="band-chart__goal-label" style={{ left: `${at(target)}%` }}>
            {text.goalLabel(target)}
          </span>
        </div>
        <span />
      </div>

      {rows.map(({ skill, band }) => (
        <div key={skill} className="band-chart__row">
          <span className="band-chart__skill">
            <SkillIcon skill={skill} size={28} />
            {text.skillName[skill]}
          </span>
          <div className="band-chart__track">
            {ticks.map((tick) => (
              <span key={tick} className="band-chart__grid" style={{ left: `${at(tick)}%` }} />
            ))}
            <span className="band-chart__goal" style={{ left: `${at(target)}%` }} />
            {band.kind === 'range' ? (
              <span
                className={`band-chart__range confidence-${band.confidence}`}
                style={{ left: `${at(band.low)}%`, width: `${at(band.high) - at(band.low)}%`, background: `var(--skill-${skill})` }}
                title={`${text.skillName[skill]}: ${text.bandRange(band.low, band.high)} · ${text.confidenceName[band.confidence]} · ${band.source === 'measured' ? text.bandSourceMeasured : text.bandSourcePractice}`}
              />
            ) : (
              <span className="band-chart__missing">{band.unit === 'essays' ? text.needMoreWriting(band.needed) : text.needMoreItems(band.needed)}</span>
            )}
          </div>
          <span className="band-chart__value">
            {band.kind === 'range' ? (
              <>
                <strong>{text.bandRange(band.low, band.high)}</strong>
                <span>{text.gapToGoal(...gapToTarget(band, target))}</span>
                <span>{text.confidenceName[band.confidence]}</span>
              </>
            ) : (
              <span>—</span>
            )}
          </span>
        </div>
      ))}

      {/* bảng dữ liệu cho trình đọc màn hình (dataviz: luôn có "table view") */}
      <table className="ds-visually-hidden">
        <caption>{text.bandTableCaption}</caption>
        <tbody>
          {rows.map(({ skill, band }) => (
            <tr key={skill}>
              <th scope="row">{text.skillName[skill]}</th>
              <td>{band.kind === 'range' ? `${text.bandRange(band.low, band.high)}, ${text.confidenceName[band.confidence]}` : text.needMoreItems(band.needed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
