/**
 * AiStatusCard.tsx — 3 TRẠNG THÁI TRƯỚC KHI CÓ KẾT QUẢ AI: mời chấm · đang chấm · lỗi
 * ----------------------------------------------------------------------------
 * Tránh lỗi "chờ không biết bao lâu" của các web AI khác (ui-ielts-ai.md, mục Tránh 10):
 * có thanh chạy theo thời gian dự kiến, câu "thường mất 15–40 giây", nút Huỷ chờ;
 * lỗi thì nói rõ lý do bằng lời thường + nút Thử lại + "kết quả tự chấm vẫn giữ".
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState, type ReactNode } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Mascot } from '../../../design-system/components/Mascot'
import { ProgressBar } from '../../../design-system/components/ProgressBar'
import { useWritingText } from '../skill-writing-text'
import type { AiErrorKind, AiStatus } from './use-ai-grading'
import './feedback.css'

interface AiStatusCardProps {
  status: Exclude<AiStatus, 'done'>
  error: { kind: AiErrorKind; message: string } | null
  startedAt: number | null
  /** thời gian dự kiến (giây) để thanh chạy hợp lý: Writing ~25, Speaking ~40 */
  expectedSeconds: number
  onGrade: () => void
  onCancel: () => void
  /** dòng riêng tư (Writing / Speaking khác nhau) */
  privacyNote: string
  intro: string
  /** nút phụ ở trạng thái mời chấm (VD "Hoàn thành, không cần AI") */
  secondary?: ReactNode
  /** chữ lúc đang chấm (Speaking: "nghe bài nói" thay cho "đọc bài") */
  loadingTitle?: string
  loadingHint?: string
}

export function AiStatusCard({ status, error, startedAt, expectedSeconds, onGrade, onCancel, privacyNote, intro, secondary, loadingTitle, loadingHint }: AiStatusCardProps) {
  const text = useWritingText()
  const elapsed = useElapsedSeconds(status === 'loading' ? startedAt : null)

  if (status === 'loading') {
    // chạy nhanh lúc đầu, chậm dần, không bao giờ "xong" trước khi AI trả lời
    const percent = Math.min(94, 100 * (1 - Math.exp(-elapsed / (expectedSeconds * 0.7))))
    return (
      <div className="ai-status ai-status--loading" role="status" aria-live="polite">
        <Mascot pose="thinking" size={88} />
        <div className="ai-status__body">
          <strong className="ai-status__title">{loadingTitle ?? text.aiLoading}</strong>
          <ProgressBar value={percent} size="sm" color="var(--task-accent, var(--skill-writing))" label={loadingTitle ?? text.aiLoading} showHead={false} />
          <span className="ai-status__hint">
            {loadingHint ?? text.aiLoadingHint} <span className="ds-num">{Math.round(elapsed)}s</span>
          </span>
          <div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              {text.aiCancel}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'error' && error) {
    const reason =
      error.kind === 'busy'
        ? text.aiErrorBusy
        : error.kind === 'limit'
          ? text.aiErrorLimit
          : error.kind === 'offline'
            ? text.aiErrorOffline
            : error.kind === 'too-long'
              ? text.aiErrorTooLong
              : text.aiErrorGeneric
    return (
      <div className="ai-status ai-status--error" role="alert">
        <span className="ai-status__icon" aria-hidden>
          <Icon name="hint" size={22} />
        </span>
        <div className="ai-status__body">
          <strong className="ai-status__title">{text.aiErrorTitle}</strong>
          <p className="ai-status__reason">{reason}</p>
          {/* lời máy chủ (VD 'khoá Gemini không hợp lệ') — chữ nhỏ, giúp người lớn sửa cấu hình */}
          {error.message && <p className="ai-status__detail">{error.message}</p>}
          <p className="ai-status__keep">
            <Icon name="check" size={16} /> {text.aiSelfStillStands}
          </p>
          <div className="ai-status__actions">
            <Button variant="secondary" size="sm" iconLeft="retry" onClick={onGrade}>
              {text.aiRetry}
            </Button>
            {secondary}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ai-status ai-status--idle">
      <span className="ai-status__icon ai-status__icon--sparkle" aria-hidden>
        <Icon name="sparkle" size={22} />
      </span>
      <div className="ai-status__body">
        <strong className="ai-status__title">{text.aiTitle}</strong>
        <p className="ai-status__reason">{intro}</p>
        <div className="ai-status__actions">
          <Button variant="primary" iconLeft="sparkle" onClick={onGrade}>
            {text.aiGrade}
          </Button>
          {secondary}
        </div>
        <p className="ai-status__privacy">
          <Icon name="lock" size={14} /> {privacyNote}
        </p>
      </div>
    </div>
  )
}

function useElapsedSeconds(startedAt: number | null): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (startedAt === null) return
    const timer = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(timer)
  }, [startedAt])
  return startedAt === null ? 0 : Math.max(0, (now - startedAt) / 1000)
}
