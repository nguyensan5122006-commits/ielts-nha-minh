/**
 * AiResultView.tsx — KẾT QUẢ AI CHẤM (dùng chung Writing + Speaking)
 * ----------------------------------------------------------------------------
 * Thứ tự (ui-vn-b.md ý 6 "Ưu điểm trước" + psych-adult D9 luật 37):
 *   1. Band dạng KHOẢNG ±0.5 trên 1 thước nhỏ, kèm chấm "Bạn tự chấm" và mốc bài mẫu
 *      (track general: 3 ô Cơ bản / Tốt / Rất tốt, không có số)
 *   2. Ưu điểm
 *   3. Nâng cấp theo từng tiêu chí: nhận xét + câu TRÍCH từ bài làm bằng chứng + cách sửa
 *   4. Bản nâng cấp (gập) · Lời AI nghe được (Speaking, gập)
 * Không dùng số to màu đỏ (ui-ielts-ai.md, Tránh 7): band màu mực, khung nhẹ.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { Icon } from '../../../design-system/components/Icon'
import { useLanguage } from '../../../translations/language-context'
import {
  CRITERIA,
  LEVEL_LABELS,
  aiBandRange,
  criterionCodeFromName,
  criterionOfMistake,
  formatBand,
  levelIndexForBand,
  type BandDisplay,
  type CriterionCode,
} from '../band-scale'
import { useWritingText } from '../skill-writing-text'
import type { AiGradingResultV3 } from './use-ai-grading'
import './feedback.css'

interface AiResultViewProps {
  result: AiGradingResultV3
  display: BandDisplay
  /** mốc bài mẫu, thấp -> cao */
  bands: number[]
  /** band tự chấm (để đặt chấm "Bạn tự chấm" lên thước) */
  selfBand: number | null
  /** tiêu chí của bài này theo thứ tự hiển thị (Writing: TA/TR, CC, LR, GRA · Speaking: FC, LR, GRA, P) */
  criteria: CriterionCode[]
}

export function AiResultView({ result, display, bands, selfBand, criteria }: AiResultViewProps) {
  const text = useWritingText()
  const { language } = useLanguage()
  const vi = language === 'vi'
  const range = aiBandRange(result.overallBand)

  // Ghép tiêu chí AI trả về theo mã + xếp lỗi vào đúng tiêu chí
  const byCriterion = useMemo(() => {
    return criteria.map((code) => {
      const fromAi = result.criteria?.find((c) => {
        const mapped = criterionCodeFromName(c.name)
        return mapped === code || ((code === 'TA' || code === 'TR') && (mapped === 'TA' || mapped === 'TR'))
      })
      const mistakes = (result.mistakes ?? []).filter((m) => criterionOfMistake(m, criteria) === code)
      return { code, band: fromAi?.band ?? null, comment: fromAi ? (vi ? fromAi.commentVi : fromAi.commentEn) : '', mistakes }
    })
  }, [criteria, result, vi])

  // Ưu điểm: máy chủ có trả strengths thì dùng; chưa có -> 1–2 tiêu chí điểm cao nhất kèm nhận xét
  const strengths = useMemo(() => {
    const given = vi ? result.strengthsVi : result.strengthsEn
    if (given && given.length > 0) return given.map((line) => ({ code: null as CriterionCode | null, line }))
    const ranked = byCriterion.filter((c) => c.band !== null && c.comment).sort((a, b) => (b.band ?? 0) - (a.band ?? 0))
    if (ranked.length === 0) return [{ code: null, line: text.strengthsFallback }]
    // tiêu chí cao nhất + (nếu có) 1 tiêu chí nữa CAO HƠN band chung — tránh khen nhầm chỗ còn yếu
    return ranked
      .filter((c, i) => i === 0 || (i < 2 && (c.band ?? 0) > result.overallBand))
      .map((c) => ({ code: c.code, line: c.comment }))
  }, [byCriterion, result, vi, text.strengthsFallback])

  // Mở sẵn tiêu chí yếu nhất
  const weakest = byCriterion.reduce<CriterionCode | null>((lowest, c) => {
    if (c.band === null) return lowest
    const current = byCriterion.find((x) => x.code === lowest)?.band ?? Infinity
    return c.band < current ? c.code : lowest
  }, null)

  const gap = selfBand === null ? 0 : Math.abs(selfBand - result.overallBand)
  const levelGap = selfBand !== null && levelIndexForBand(selfBand, bands) !== levelIndexForBand(result.overallBand, bands)

  return (
    <div className="ai-result">
      <BandRange display={display} bands={bands} low={range.low} high={range.high} ai={result.overallBand} self={selfBand} />
      <p className="ai-result__summary">{vi ? result.summaryVi : result.summaryEn}</p>
      {display === 'numbers' && gap >= 1 && <p className="ai-result__gap">{text.aiGap(formatBand(gap))}</p>}
      {display === 'labels' && levelGap && <p className="ai-result__gap">{text.aiGapLabels}</p>}

      <section className="ai-result__section ai-result__section--strengths" aria-label={text.strengthsTitle}>
        <h4 className="ai-result__heading">
          <span className="ai-result__heading-icon ai-result__heading-icon--good" aria-hidden>
            <Icon name="star" size={16} />
          </span>
          {text.strengthsTitle}
        </h4>
        <ul className="ai-result__strengths">
          {strengths.map((item, index) => (
            <li key={index}>
              {item.code && <span className="criterion-tag">{CRITERIA[item.code].short}</span>}
              <span>{item.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ai-result__section" aria-label={text.upgradesTitle}>
        <h4 className="ai-result__heading">
          <span className="ai-result__heading-icon" aria-hidden>
            <Icon name="arrow-right" size={16} />
          </span>
          {text.upgradesTitle}
        </h4>
        <div className="ai-result__criteria">
          {byCriterion.map((item) => (
            <details key={item.code} className="ai-criterion" open={item.code === weakest}>
              <summary className="ai-criterion__head">
                <span className="criterion-tag criterion-tag--lg">{CRITERIA[item.code].short}</span>
                <span className="ai-criterion__name">
                  <strong>{CRITERIA[item.code].name.en}</strong>
                  <span>{vi ? CRITERIA[item.code].plainVi : CRITERIA[item.code].plainEn}</span>
                </span>
                {item.mistakes.length > 0 && <span className="ai-criterion__count">{item.mistakes.length}</span>}
                {item.band !== null && (
                  <span className="ai-criterion__band">
                    {display === 'numbers' ? `≈ ${formatBand(item.band)}` : LEVEL_LABELS[levelIndexForBand(item.band, bands)][language]}
                  </span>
                )}
                <Icon name="chevron-down" size={18} className="ai-criterion__chevron" />
              </summary>
              <div className="ai-criterion__body">
                {item.comment && <p className="ai-criterion__comment">{item.comment}</p>}
                {item.mistakes.length === 0 ? (
                  <p className="ai-criterion__none">{text.upgradesNone}</p>
                ) : (
                  <ul className="ai-evidence">
                    {item.mistakes.map((mistake, index) => (
                      <li key={index} className="ai-evidence__item">
                        <div className="ai-evidence__pair">
                          <span className="ai-evidence__label">{text.evidenceLabel}</span>
                          <q className="ai-evidence__quote">{mistake.original}</q>
                        </div>
                        <div className="ai-evidence__pair">
                          <span className="ai-evidence__label">{text.suggestionLabel}</span>
                          <span className="ai-evidence__fix">{mistake.correction}</span>
                        </div>
                        <p className="ai-evidence__why">{vi ? mistake.explanationVi : mistake.explanationEn}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {result.improvedVersion && (
        <details className="ai-result__more">
          <summary>
            <Icon name="sparkle" size={16} /> {text.improvedTitle}
          </summary>
          <p className="ai-result__improved-hint">{text.improvedHint}</p>
          <p className="ai-result__improved">{result.improvedVersion}</p>
        </details>
      )}
      {result.transcripts && result.transcripts.length > 0 && (
        <details className="ai-result__more">
          <summary>
            <Icon name="volume" size={16} /> {text.transcriptTitle}
          </summary>
          <ol className="ai-result__transcripts">
            {result.transcripts.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ol>
        </details>
      )}
      <p className="ai-result__disclaimer">{display === 'numbers' ? text.aiRangeNote : text.aiLevelNote} {text.aiDisclaimer}</p>
    </div>
  )
}

/* ============================================================================
 * Thước band: khoảng AI tô màu, chấm tự chấm, mốc bài mẫu
 * ========================================================================== */

function BandRange({ display, bands, low, high, ai, self }: { display: BandDisplay; bands: number[]; low: number; high: number; ai: number; self: number | null }) {
  const text = useWritingText()
  const { language } = useLanguage()

  if (display === 'labels') {
    const aiLevel = levelIndexForBand(ai, bands)
    const selfLevel = self === null ? null : levelIndexForBand(self, bands)
    return (
      <div className="band-range band-range--labels">
        <span className="band-range__caption">{text.aiLevel}</span>
        <div className="band-range__levels">
          {LEVEL_LABELS.map((label, index) => (
            <div key={label.vi} className={`band-range__level${index === aiLevel ? ' is-ai' : ''}`}>
              <span>{label[language]}</span>
              {selfLevel === index && <span className="band-range__self-chip">{text.aiSelfMarker}</span>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const scaleMin = Math.max(0, Math.floor(bands[0]) - 1)
  const scaleMax = Math.min(9, Math.ceil(bands[bands.length - 1]) + 1)
  const pos = (band: number) => `${((Math.min(scaleMax, Math.max(scaleMin, band)) - scaleMin) / (scaleMax - scaleMin)) * 100}%`
  const ticks: number[] = []
  for (let b = scaleMin; b <= scaleMax; b += 1) ticks.push(b)

  return (
    <div className="band-range">
      <div className="band-range__top">
        <span className="band-range__caption">{text.aiBandRange}</span>
        <span className="band-range__value ds-num">
          {formatBand(low)} – {formatBand(high)}
        </span>
      </div>
      <div className="band-range__scale" aria-hidden>
        <div className="band-range__track" />
        <div className="band-range__fill" style={{ left: pos(low), width: `calc(${pos(high)} - ${pos(low)})` }} />
        {self !== null && (
          <div className="band-range__self" style={{ left: pos(self) }}>
            <span className="band-range__self-dot" />
            <span className="band-range__self-label">
              {text.aiSelfMarker} {formatBand(self)}
            </span>
          </div>
        )}
        {bands.map((band) => (
          <span key={band} className="band-range__sample" style={{ left: pos(band) }} title={`${text.aiSampleMarkers} ${formatBand(band)}`} />
        ))}
        {ticks.map((tick) => (
          <span key={tick} className="band-range__tick ds-num" style={{ left: pos(tick) }}>
            {tick}
          </span>
        ))}
      </div>
      <div className="band-range__legend">
        <span>
          <span className="band-range__legend-fill" /> {text.aiBandRange}
        </span>
        <span>
          <span className="band-range__legend-sample" /> {text.aiSampleMarkers} ({bands.map(formatBand).join(' · ')})
        </span>
      </div>
    </div>
  )
}
