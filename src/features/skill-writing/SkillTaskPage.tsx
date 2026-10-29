/**
 * SkillTaskPage.tsx — TRANG "LUYỆN RIÊNG PHẦN VIẾT / NÓI" CỦA 1 BÀI: /skill-task/:lessonId
 * ----------------------------------------------------------------------------
 * Mở thẳng task Writing/Speaking của 1 bài (bỏ qua thẻ dạy + bài tập khởi động), dùng để:
 *   - luyện lại đề viết/nói đã học (VD từ sổ bài viết, lịch sử band),
 *   - kiểm thử trình Writing/Speaking độc lập với trình học.
 * Dùng đúng bảng đăng ký của trình học (skill-task-registry) + khung FocusLayout.
 * Trang này KHÔNG ghi progress.resume / hoàn thành bài (đó là việc của trình học) — chỗ đang làm chỉ giữ
 * trong tab (sessionStorage); nháp Writing
 * vẫn tự lưu qua saveDraft, band vẫn ghi qua logWriting / updateBandEstimate.
 * ----------------------------------------------------------------------------
 */
import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FocusLayout } from '../../app/layout'
import { useLesson } from '../../content/use-lesson'
import { Button } from '../../design-system/components/Button'
import { Mascot } from '../../design-system/components/Mascot'
import { useLanguage } from '../../translations/language-context'
import { skillTaskModeOf, useSkillTask, type SkillTaskResult } from '../lesson-player/skill-task-registry'
import { useWritingText } from './skill-writing-text'
// nạp 2 file đăng ký (trình học tự nạp bằng skill-task-loader; trang này đứng riêng nên tự nạp)
import './register-skill-tasks'
import '../skill-speaking/register-skill-tasks'
import './SkillTaskPage.css'

export default function SkillTaskPage() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const text = useWritingText()
  const { pick } = useLanguage()
  // tải đúng file chứa bài (không kéo cả kho nội dung vào gói JS — xem content/lesson-loader.ts)
  const { lesson, status, retry } = useLesson(lessonId)
  const mode = lesson ? skillTaskModeOf(lesson) : null
  const registered = useSkillTask(mode === 'writing' || mode === 'speaking' ? mode : null)
  const [result, setResult] = useState<SkillTaskResult | null>(null)
  const [round, setRound] = useState(0) // tăng -> vẽ lại task từ đầu ("Làm lại")
  const leave = () => navigate('/learn')
  const resumeKey = `skill-task-resume:${lessonId}`

  if (status === 'loading') {
    return (
      <FocusLayout onExit={leave}>
        <p className="skill-task-page__loading">{text.pageLoading}</p>
      </FocusLayout>
    )
  }

  if (!lesson || !registered || !mode) {
    return (
      <FocusLayout onExit={leave}>
        <div className="skill-task-page__empty">
          <Mascot pose="surprised" size={120} />
          <p>{!lesson ? text.pageNotFound : text.pageNoTask}</p>
          <div className="skill-task-page__actions">
            {status === 'error' && (
              <Button variant="primary" iconLeft="retry" onClick={retry}>
                {text.aiRetry}
              </Button>
            )}
            <Button variant="secondary" onClick={leave}>
              {text.pageBack}
            </Button>
          </div>
        </div>
      </FocusLayout>
    )
  }

  const { Component, options } = registered
  return (
    <FocusLayout onExit={leave} width={result ? 'normal' : options.layout}>
      {result ? (
        <div className="skill-task-page__done">
          <Mascot pose="celebrate" size={160} />
          <h1>{text.pageDoneTitle}</h1>
          <p className="skill-task-page__lesson">{pick(lesson.title)}</p>
          {result.summary && <p className="skill-task-page__summary">{pick(result.summary)}</p>}
          <div className="skill-task-page__actions">
            <Button variant="secondary" onClick={leave}>
              {text.pageBack}
            </Button>
            <Button
              variant="primary"
              size="lg"
              iconLeft="retry"
              onClick={() => {
                setResult(null)
                setRound((r) => r + 1)
              }}
            >
              {text.pageAgain}
            </Button>
          </div>
        </div>
      ) : (
        <Suspense fallback={<p className="skill-task-page__loading">{text.pageLoading}</p>}>
          <Component
            key={round}
            lesson={lesson}
            mode={mode}
            resumeData={round === 0 ? readSessionResume(resumeKey) : null}
            onSaveResume={(data) => writeSessionResume(resumeKey, data)}
            onComplete={(taskResult) => {
              writeSessionResume(resumeKey, null)
              setResult(taskResult)
            }}
            onRequestExit={leave}
          />
        </Suspense>
      )}
    </FocusLayout>
  )
}

/* Chỗ đang làm của trang luyện riêng: chỉ giữ trong TAB này (sessionStorage) để tải lại trang không mất bước.
 * Bài học thật dùng resume của trình học (progress.resume) — không đi qua đây. */
function readSessionResume(key: string): unknown | null {
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
function writeSessionResume(key: string, data: unknown): void {
  try {
    if (data === null) sessionStorage.removeItem(key)
    else sessionStorage.setItem(key, JSON.stringify(data))
  } catch {
    /* trình duyệt chặn lưu trữ -> bỏ qua */
  }
}
