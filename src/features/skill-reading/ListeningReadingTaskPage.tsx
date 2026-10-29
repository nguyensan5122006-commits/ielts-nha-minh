/**
 * ListeningReadingTaskPage.tsx — TRANG LUYỆN RIÊNG PHẦN NGHE / ĐỌC CỦA 1 BÀI
 *   /listening/:lessonId   ·   /reading/:lessonId
 * ----------------------------------------------------------------------------
 * Mở thẳng task Listening/Reading (bỏ qua thẻ dạy + bài tập khởi động) để:
 *   - luyện lại 1 bài nghe/đọc đã học (VD từ sổ câu sai, từ kết quả),
 *   - kiểm thử trình Nghe/Đọc độc lập với trình học, và cho nhóm Phòng thi xem mẫu.
 * Dùng đúng bảng đăng ký của trình học (skill-task-registry) + khung FocusLayout,
 * nên người học thấy y hệt như trong bài.
 *
 * Trang này KHÔNG ghi progress.resume (đó là chỗ của trình học — tránh giẫm lên bài đang
 * học dở). Chỗ đang làm chỉ giữ trong sessionStorage của tab (tải lại trang vẫn còn).
 * Câu trả lời vẫn được ghi vào thống kê kỹ năng + sổ câu sai (player tự làm), và cộng phút học.
 * ----------------------------------------------------------------------------
 */
import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FocusLayout } from '../../app/layout'
import { useLesson } from '../../content/use-lesson'
import { Button } from '../../design-system/components/Button'
import { Mascot } from '../../design-system/components/Mascot'
import { Skeleton } from '../../design-system/components/Skeleton'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { skillTaskModeOf, useSkillTask, type SkillTaskResult } from '../lesson-player/skill-task-registry'
// trình học tự nạp file đăng ký bằng skill-task-loader; trang này đứng riêng nên tự nạp
import '../skill-listening/register-skill-tasks'
import './register-skill-tasks'
import './ListeningReadingTaskPage.css'

const sessionKey = (lessonId: string) => `ielts-skill-task-${lessonId}`

function readSession(lessonId: string): unknown {
  try {
    return JSON.parse(sessionStorage.getItem(sessionKey(lessonId)) ?? 'null')
  } catch {
    return null
  }
}

const PAGE_TEXT = {
  notFound: { vi: 'Không tìm thấy bài nghe/đọc này.', en: "This listening/reading task wasn't found." },
  back: { vi: 'Về lộ trình', en: 'Back to path' },
  doneTitle: { vi: 'Xong phần luyện', en: 'Practice done' },
  again: { vi: 'Làm lại từ đầu', en: 'Start again' },
  loadError: { vi: 'Chưa tải được bài — kiểm tra mạng rồi thử lại.', en: "Couldn't load the lesson — check your connection and try again." },
  retry: { vi: 'Thử lại', en: 'Try again' },
}

export default function ListeningReadingTaskPage() {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const { pick, language } = useLanguage()
  const { addStudyMinutes } = useProgress()
  const { lesson, status, retry } = useLesson(lessonId)
  const mode = lesson ? skillTaskModeOf(lesson) : null
  const registered = useSkillTask(mode === 'listening' || mode === 'reading' ? mode : null)
  const [result, setResult] = useState<SkillTaskResult | null>(null)
  const [round, setRound] = useState(0)
  const leave = () => navigate('/learn')

  // đang tải file bài học (mỗi nhóm bài là 1 file JS riêng, tải khi cần)
  if (status === 'loading') {
    return (
      <FocusLayout onExit={leave}>
        <Skeleton variant="rect" height={420} />
      </FocusLayout>
    )
  }

  if (!lesson || !registered || !mode) {
    return (
      <FocusLayout onExit={leave}>
        <div className="lr-page__empty">
          <Mascot pose={status === 'error' ? 'thinking' : 'surprised'} size={120} />
          <p>{status === 'error' ? PAGE_TEXT.loadError[language] : PAGE_TEXT.notFound[language]}</p>
          <div className="lr-page__actions">
            <Button variant="secondary" onClick={leave}>
              {PAGE_TEXT.back[language]}
            </Button>
            {status === 'error' && (
              <Button iconLeft="review" onClick={retry}>
                {PAGE_TEXT.retry[language]}
              </Button>
            )}
          </div>
        </div>
      </FocusLayout>
    )
  }

  const { Component, options } = registered
  return (
    <FocusLayout onExit={leave} width={result ? 'normal' : options.layout}>
      {result ? (
        <div className="lr-page__done">
          <Mascot pose="celebrate" size={160} />
          <h1>{PAGE_TEXT.doneTitle[language]}</h1>
          <p className="lr-page__lesson">{pick(lesson.title)}</p>
          {result.summary && <p className="lr-page__summary">{pick(result.summary)}</p>}
          <div className="lr-page__actions">
            <Button variant="secondary" onClick={leave}>
              {PAGE_TEXT.back[language]}
            </Button>
            <Button
              size="lg"
              iconLeft="review"
              onClick={() => {
                sessionStorage.removeItem(sessionKey(lesson.id))
                setResult(null)
                setRound((value) => value + 1)
              }}
            >
              {PAGE_TEXT.again[language]}
            </Button>
          </div>
        </div>
      ) : (
        <Suspense fallback={<Skeleton variant="rect" height={420} />}>
          <Component
            key={round}
            lesson={lesson}
            mode={mode}
            resumeData={readSession(lesson.id)}
            onSaveResume={(data) => {
              try {
                sessionStorage.setItem(sessionKey(lesson.id), JSON.stringify(data))
              } catch {
                /* bỏ qua */
              }
            }}
            onComplete={(taskResult) => {
              sessionStorage.removeItem(sessionKey(lesson.id))
              if (taskResult.minutes) addStudyMinutes(taskResult.minutes)
              setResult(taskResult)
            }}
            onRequestExit={leave}
          />
        </Suspense>
      )}
    </FocusLayout>
  )
}
