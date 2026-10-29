/**
 * ContinueCard.tsx — THẺ "HỌC TIẾP" (c) ở cột phải
 * ----------------------------------------------------------------------------
 * Thẻ cam nổi bật, mascot ló ra khỏi mép thẻ, ghi rõ bài kế tiếp (hoặc bài đang dở),
 * trạm nào, kỹ năng, số phút + 1 nút "Học tiếp". Luôn có mặt ở mọi trang có cột phải
 * -> người học không bao giờ phải tìm "học gì tiếp".
 * Học hết bài đã mở -> mời sang phòng thi (không có ngõ cụt).
 * ----------------------------------------------------------------------------
 */
import { useNavigate } from 'react-router-dom'
import { unitsFor, findNextLesson } from '../../../content/path-selectors'
import { preloadLesson } from '../../../content/lesson-loader'
import { Button } from '../../../design-system/components/Button'
import { Card } from '../../../design-system/components/Card'
import { Mascot } from '../../../design-system/components/Mascot'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { useRightRailText } from '../right-rail-text'

const SKILL_NAMES = {
  vi: { vocabulary: 'Từ vựng', listening: 'Nghe', reading: 'Đọc', speaking: 'Nói', writing: 'Viết' },
  en: { vocabulary: 'Vocabulary', listening: 'Listening', reading: 'Reading', speaking: 'Speaking', writing: 'Writing' },
} as const

export function ContinueCard() {
  const text = useRightRailText()
  const { pick, language } = useLanguage()
  const { progress } = useProgress()
  const navigate = useNavigate()
  const next = findNextLesson(progress)

  if (!next) {
    return (
      <Card padding="sm" className="rr-card rr-continue rr-continue--done" as="section">
        <div className="rr-continue__eyebrow">{text.allDoneTitle}</div>
        <p className="rr-continue__meta">{text.allDoneBody}</p>
        <Button to="/exams" variant="navy" size="md" iconRight="arrow-right">
          {text.allDoneButton}
        </Button>
      </Card>
    )
  }

  const stationNumber = next.unit && next.levelId ? unitsFor(next.track, next.levelId).findIndex((unit) => unit.id === next.unit!.id) + 1 : 0
  const start = () => navigate(`/lesson/${next.lesson.id}`)

  return (
    <Card variant="feature" padding="sm" className="rr-card rr-continue" as="section" aria-label={text.continueEyebrow}>
      <Mascot pose="thumbs-up" size={92} className="rr-continue__mascot" />
      <div className="rr-continue__eyebrow">{next.reason === 'resume' ? text.resumeEyebrow : text.continueEyebrow}</div>
      <h3 className="rr-continue__title">{pick(next.lesson.title)}</h3>
      {next.unit && stationNumber > 0 && <div className="rr-continue__station">{text.continueStation(stationNumber, pick(next.unit.title))}</div>}
      <div className="rr-continue__meta">{text.continueMeta(SKILL_NAMES[language][next.lesson.skill], next.lesson.estimatedMinutes)}</div>
      <Button variant="navy" size="md" fullWidth iconRight="arrow-right" onClick={start} onPointerEnter={() => preloadLesson(next.lesson.id)}>
        {text.continueButton}
      </Button>
    </Card>
  )
}
