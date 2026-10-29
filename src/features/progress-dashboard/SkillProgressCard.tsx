/**
 * SkillProgressCard.tsx — THẺ 1 KỸ NĂNG TRÊN BẢNG TIẾN ĐỘ
 * ----------------------------------------------------------------------------
 * Icon 3D kỹ năng + tên · % đúng của 40 câu gần nhất (số lớn) · đường xu hướng · số câu đã làm
 * · band dạng khoảng (track IELTS) hoặc bậc CEFR (track tổng quát) — chỉ khi đủ dữ liệu.
 * Viền trên mang màu kỹ năng (nhận diện), chữ luôn màu chữ thường.
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import type { SkillName } from '../../content/content-types'
import { SkillIcon } from '../../design-system/components/SkillIcon'
import type { SkillStat } from '../../learning-progress/progress-types'
import { Sparkline } from './charts/Sparkline'
import { accuracyChange, accuracyTrend, cefrForBand, recentAccuracy, type SkillBand } from './dashboard-stats'
import { useDashboardText } from './progress-dashboard-text'

export interface SkillProgressCardProps {
  skill: SkillName
  stat: SkillStat | undefined
  band: SkillBand
  /** 'band' (IELTS) | 'cefr' (tổng quát) */
  scale: 'band' | 'cefr'
}

export function SkillProgressCard({ skill, stat, band, scale }: SkillProgressCardProps) {
  const text = useDashboardText()
  const accuracy = recentAccuracy(stat)
  const trend = accuracyTrend(stat)
  const change = accuracyChange(stat)
  const color = `var(--skill-${skill})`

  return (
    <article className="skill-card" style={{ '--skill-accent': color } as CSSProperties}>
      <header className="skill-card__head">
        <SkillIcon skill={skill} size={40} />
        <h3>{text.skillName[skill]}</h3>
      </header>
      {accuracy === null ? (
        <p className="skill-card__empty">{text.noAnswersYet}</p>
      ) : (
        <>
          <div className="skill-card__main">
            <span className="skill-card__value">{Math.round(accuracy * 100)}%</span>
            {change !== null && (
              <span className={`skill-card__delta${change > 2 ? ' is-up' : change < -2 ? ' is-down' : ''}`} title={text.trendHint}>
                {change > 2 ? text.trendUp(change) : change < -2 ? text.trendDown(-change) : text.trendFlat}
              </span>
            )}
          </div>
          <span className="skill-card__caption">{text.recentAccuracy}</span>
          <Sparkline values={trend} color={color} label={text.trendLabel} width={180} height={40} />
          <p className="skill-card__trend">{text.itemsDone(stat?.answered ?? 0)}</p>
        </>
      )}
      <footer className="skill-card__band">
        {band.kind === 'range' ? (
          scale === 'band' ? (
            <>
              <strong>Band {text.bandRange(band.low, band.high)}</strong>
              <span>{text.confidenceName[band.confidence]}</span>
            </>
          ) : (
            <>
              <strong>CEFR {cefrForBand((band.low + band.high) / 2)}</strong>
              <span>{text.confidenceName[band.confidence]}</span>
            </>
          )
        ) : (
          <span className="skill-card__missing">{band.unit === 'essays' ? text.needMoreWriting(band.needed) : text.needMoreItems(band.needed)}</span>
        )}
      </footer>
    </article>
  )
}
