/**
 * AiFeedbackCard.tsx — HIỂN THỊ KẾT QUẢ AI CHẤM WRITING / SPEAKING
 * Gồm: band tổng, 4 tiêu chí, nhận xét chung, danh sách lỗi (gạch đỏ -> sửa xanh),
 * bản viết lại tốt hơn và (với Speaking) lời AI nghe được.
 */
import type { AiGradingResult } from '../services/api-client'
import { useLanguage } from '../translations/language-context'

export function AiFeedbackCard({ result, title }: { result: AiGradingResult; title?: string }) {
  const { t, language } = useLanguage()
  const inVietnamese = language === 'vi'

  return (
    <div className="ai-feedback">
      <div className="row" style={{ alignItems: 'flex-start' }}>
        <div className="band-circle" title={t('overallBand')}>
          {Number(result.overallBand).toFixed(1)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: 4 }}>{title ?? t('aiFeedback')}</h3>
          <p style={{ marginBottom: 0 }}>{inVietnamese ? result.summaryVi : result.summaryEn}</p>
        </div>
      </div>

      {/* 4 tiêu chí chấm */}
      <div className="criteria-grid">
        {result.criteria?.map((criterion) => (
          <div className="criteria-item" key={criterion.name}>
            <div className="row row--between">
              <strong>{criterion.name}</strong>
              <span className="badge badge--primary">{Number(criterion.band).toFixed(1)}</span>
            </div>
            <div className="muted">{inVietnamese ? criterion.commentVi : criterion.commentEn}</div>
          </div>
        ))}
      </div>

      {/* AI nghe được gì (Speaking) */}
      {result.transcripts && result.transcripts.length > 0 && (
        <details style={{ marginBottom: 12 }}>
          <summary>{t('transcript')}</summary>
          {result.transcripts.map((line, index) => (
            <p key={index} className="small" style={{ marginTop: 8 }}>
              <em>
                {result.transcripts!.length > 1 ? `${index + 1}. ` : ''}
                {line}
              </em>
            </p>
          ))}
        </details>
      )}

      {/* Lỗi cần sửa */}
      {result.mistakes?.length > 0 && (
        <details open style={{ marginBottom: 12 }}>
          <summary>
            {t('mistakesFound')} ({result.mistakes.length})
          </summary>
          {result.mistakes.map((mistake, index) => (
            <div className="correction" key={index}>
              <del>{mistake.original}</del> → <ins>{mistake.correction}</ins>
              <div className="muted">{inVietnamese ? mistake.explanationVi : mistake.explanationEn}</div>
            </div>
          ))}
        </details>
      )}

      {result.improvedVersion && (
        <details>
          <summary>{t('improvedVersion')}</summary>
          <p style={{ whiteSpace: 'pre-line', marginTop: 8 }}>{result.improvedVersion}</p>
        </details>
      )}
      <p className="small muted" style={{ marginTop: 12, marginBottom: 0 }}>
        {t('aiNote')}
      </p>
    </div>
  )
}
