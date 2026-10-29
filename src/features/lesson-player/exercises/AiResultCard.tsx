/**
 * AiResultCard.tsx — NHẬN XÉT CỦA AI CHO BÀI NÓI / VIẾT TỰ DO (trong bài học)
 * ----------------------------------------------------------------------------
 * Thứ tự (spec 04 mục 13 + psych-adult D1/D9): "Điểm tốt" TRƯỚC -> "Nâng cấp" -> "Bài mẫu".
 * Số band chỉ hiện ở level-3, dạng KHOẢNG ±0.5 ("khoảng 5.0–6.0") kèm ghi chú
 * "Điểm AI chỉ là ước lượng". Level 1–2 không hiện số (chỉ nhận xét theo tiêu chí).
 * Level 1 chỉ hiện tối đa 3 lỗi quan trọng nhất cho đỡ ngợp.
 * ----------------------------------------------------------------------------
 */
import type { LevelId } from '../../../content/content-types'
import type { AiGradingResult } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { useLessonText } from '../lesson-player-text'

export function AiResultCard({ result, levelId, sampleAnswer }: { result: AiGradingResult; levelId?: LevelId; sampleAnswer?: string }) {
  const text = useLessonText()
  const { language } = useLanguage()
  const vi = language === 'vi'
  const maxMistakes = levelId === 'level-1' ? 3 : 5
  const showBand = levelId === 'level-3' && Number.isFinite(result.overallBand)
  const low = Math.max(0, Math.round((result.overallBand - 0.5) * 2) / 2).toFixed(1)
  const high = Math.min(9, Math.round((result.overallBand + 0.5) * 2) / 2).toFixed(1)

  return (
    <section className="lp-ai-result" aria-label={text.strengths}>
      {showBand && (
        <p className="lp-ai-result__band">
          <strong>{text.bandRange(low, high)}</strong>
          <span>{text.aiEstimateNote}</span>
        </p>
      )}

      <div className="lp-ai-result__block lp-ai-result__block--good">
        <h3>{text.strengths}</h3>
        <p>{vi ? result.summaryVi : result.summaryEn}</p>
        {result.criteria?.length > 0 && (
          <ul className="lp-ai-criteria">
            {result.criteria.map((criterion) => (
              <li key={criterion.name}>
                <span className="lp-ai-criteria__name">{criterion.name}</span>
                <span>{vi ? criterion.commentVi : criterion.commentEn}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {result.mistakes?.length > 0 && (
        <div className="lp-ai-result__block lp-ai-result__block--up">
          <h3>{text.upgrades}</h3>
          <ul className="lp-ai-fixes">
            {result.mistakes.slice(0, maxMistakes).map((mistake, index) => (
              <li key={index}>
                <span className="lp-ai-fixes__pair">
                  <del>{mistake.original}</del>
                  <span aria-hidden>→</span>
                  <ins>{mistake.correction}</ins>
                </span>
                <span className="lp-ai-fixes__why">{vi ? mistake.explanationVi : mistake.explanationEn}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.transcripts && result.transcripts.length > 0 && (
        <details className="lp-ai-result__more">
          <summary>{text.heardTranscript}</summary>
          {result.transcripts.map((line, index) => (
            <p key={index}>
              <em>{line}</em>
            </p>
          ))}
        </details>
      )}
      {(result.improvedVersion || sampleAnswer) && (
        <details className="lp-ai-result__more">
          <summary>{text.sampleAnswer}</summary>
          <p className="lp-ai-result__sample">{result.improvedVersion || sampleAnswer}</p>
        </details>
      )}
    </section>
  )
}
