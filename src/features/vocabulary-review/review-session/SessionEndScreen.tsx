/**
 * SessionEndScreen.tsx — MÀN KẾT THÚC PHIÊN ÔN (ý tưởng Seneca)
 * ----------------------------------------------------------------------------
 * Thứ tự (psych-adult D5 + 04-DESIGN-SYSTEM mục bổ sung "Seneca"):
 *   1. mascot ăn mừng ngắn + "Xong phiên ôn!"
 *   2. 3 ô số liệu: thẻ đã ôn · nhớ ngay · thời gian
 *   3. đồng hồ "Độ bền trí nhớ" (5 nấc, trung bình các thẻ vừa ôn) + "ôn lại sau khoảng …"
 *   4. 3 thẻ bước tiếp theo: thẻ đầu "Ôn lại N câu sai" (nếu có), không thì "Học tiếp";
 *      thẻ cuối luôn là "Xong hôm nay".
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { fireConfetti } from '../../../design-system/components/Confetti'
import { Icon } from '../../../design-system/components/Icon'
import { Mascot } from '../../../design-system/components/Mascot'
import { SkillIcon } from '../../../design-system/components/SkillIcon'
import { findNextLesson } from '../../../content/path-selectors'
import { countCardsByLabel } from '../../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { estimateRetryMinutes } from '../../mistakes-notebook/mistake-lookup'
import { memoryLevelOf } from '../memory-levels'
import { MemoryStrengthMeter } from '../shared/MemoryStrengthMeter'
import { NextStepCards, type NextStep } from '../shared/NextStepCards'
import { useReviewText } from '../vocabulary-review-text'
import { formatApproxInterval } from './review-queue'

export interface SessionSummary {
  reviewedKeys: string[]
  rememberedFirstTry: number
  minutes: number
}

const HOUR = 3_600_000

export function SessionEndScreen({ summary, onClose }: { summary: SessionSummary; onClose: () => void }) {
  const text = useReviewText()
  const { language, pick } = useLanguage()
  const { progress } = useProgress()
  const now = Date.now()

  useEffect(() => {
    if (summary.reviewedKeys.length > 0) fireConfetti({ particleCount: 60 })
  }, [summary.reviewedKeys.length])

  // độ bền trung bình của các thẻ vừa ôn (theo kho mới nhất)
  const cards = summary.reviewedKeys.map((key) => progress.srs[key]).filter(Boolean)
  const averageLevel = cards.length ? cards.reduce((total, card) => total + memoryLevelOf(card), 0) / cards.length : 1
  // lần hẹn ôn gần nhất (bỏ qua bước học ngắn vài phút — người học không cần quay lại sau 10 phút)
  const upcoming = cards.map((card) => new Date(card.due).getTime() - now).filter((ms) => ms > 0)
  const meaningful = upcoming.filter((ms) => ms >= HOUR)
  const comeBackMs = meaningful.length ? Math.min(...meaningful) : upcoming.length ? Math.min(...upcoming) : 24 * HOUR

  const openMistakes = progress.mistakes.filter((mistake) => !mistake.resolved).length
  const next = findNextLesson(progress)
  const knownWords = countCardsByLabel(progress, 'word:').known
  const percent = summary.reviewedKeys.length ? Math.round((summary.rememberedFirstTry / summary.reviewedKeys.length) * 100) : 0

  const learnStep: NextStep | null = next
    ? {
        id: 'learn',
        icon: <SkillIcon skill={next.lesson.skill} size={40} />,
        title: text.stepLearnTitle,
        meta: text.stepLearnMeta(pick(next.lesson.title)),
        to: `/lesson/${next.lesson.id}`,
        accent: `var(--skill-${next.lesson.skill})`,
      }
    : null
  const steps: NextStep[] = []
  if (openMistakes > 0) {
    steps.push({
      id: 'mistakes',
      icon: <Icon name="review" size={24} />,
      title: text.stepMistakesTitle(openMistakes),
      meta: text.stepMistakesMeta(estimateRetryMinutes(Math.min(openMistakes, 10))),
      to: '/mistakes?practice=1',
    })
    if (learnStep) steps.push(learnStep)
  } else if (learnStep) {
    steps.push(learnStep)
  }
  if (steps.length < 2) {
    steps.push({ id: 'words', icon: <SkillIcon skill="vocabulary" size={40} />, title: text.stepWordsTitle, meta: text.stepWordsMeta(knownWords), to: '/words' })
  }
  steps.push({
    id: 'done',
    icon: <Icon name="check" size={24} />,
    title: text.stepDoneTitle,
    meta: text.stepDoneMeta,
    onClick: onClose,
    accent: 'var(--c-olive)',
  })

  return (
    <div className="session-end">
      <div className="session-end__hero">
        <Mascot pose="celebrate" size={168} />
        <div>
          <h1 className="session-end__title">{summary.reviewedKeys.length ? text.doneTitle : text.sessionEmptyTitle}</h1>
          {summary.reviewedKeys.length > 0 && <p className="session-end__subtitle">{text.doneSubtitle(summary.reviewedKeys.length)}</p>}
        </div>
      </div>

      {summary.reviewedKeys.length > 0 && (
        <>
          <dl className="session-end__stats">
            <div className="session-end__stat">
              <dt>{text.statCards}</dt>
              <dd>{summary.reviewedKeys.length}</dd>
            </div>
            <div className="session-end__stat">
              <dt>{text.statRemembered}</dt>
              <dd>{percent}%</dd>
            </div>
            <div className="session-end__stat">
              <dt>{text.statMinutes}</dt>
              <dd>{text.minutesShort(summary.minutes)}</dd>
            </div>
          </dl>

          <section className="session-end__strength" aria-label={text.strengthTitle}>
            <div className="session-end__strength-head">
              <h2>{text.strengthTitle}</h2>
              <MemoryStrengthMeter level={averageLevel} size="lg" />
            </div>
            <p className="session-end__comeback">
              <Icon name="clock" size={18} /> {text.comeBackIn(formatApproxInterval(comeBackMs, language))}
            </p>
            <p className="session-end__help">{text.strengthHelp}</p>
          </section>
        </>
      )}

      <NextStepCards title={text.nextStepsTitle} steps={steps.slice(0, 3)} />
    </div>
  )
}
