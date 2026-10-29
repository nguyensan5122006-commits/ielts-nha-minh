/**
 * MistakePractice.tsx — LƯỢT "ÔN LẠI CÂU SAI" (toàn màn hình)
 * ----------------------------------------------------------------------------
 *   <MistakePractice round={detailsList} onClose={…} onStartRound={(list) => …} />
 *
 * Hỏi lại từng câu sai như bài tập thật (chọn / gõ / ghép câu / tự kiểm tra).
 *   - Đúng  -> đánh dấu "đã sửa" (setMistakeResolved) + recordAnswer(đúng): thẻ ôn 'item:' được
 *              chấm Nhớ, câu được hẹn ôn lại sau để nhớ lâu. Đếm vào "lỗi đã sửa" (tiến bộ — D8 luật 35).
 *   - Sai   -> recordAnswer(sai, kèm mục lỗi): sổ tăng "sai N lần", thẻ ôn chấm Quên;
 *              câu được hỏi lại 1 lần ở cuối lượt với nhãn "Câu sai lúc nãy".
 * Mọi thứ lưu NGAY khi chấm -> thoát giữa chừng không mất gì.
 * Hết lượt: tổng kết + 3 thẻ bước tiếp theo (làm lại câu còn sai / ôn thẻ từ / xong hôm nay).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { fireConfetti } from '../../../design-system/components/Confetti'
import { Icon } from '../../../design-system/components/Icon'
import { Mascot } from '../../../design-system/components/Mascot'
import { ProgressRing } from '../../../design-system/components/ProgressRing'
import { SkillIcon } from '../../../design-system/components/SkillIcon'
import { playSound } from '../../../design-system/sound-kit'
import { findNextLesson } from '../../../content/path-selectors'
import { srsQueueInfo } from '../../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { buildReviewQueue, estimateSessionMinutes } from '../../vocabulary-review/review-session/review-queue'
import { FocusOverlay } from '../../vocabulary-review/shared/FocusOverlay'
import { NextStepCards, type NextStep } from '../../vocabulary-review/shared/NextStepCards'
import { RetryQuestionView, type RetryResult } from '../exercise-retry/RetryQuestionView'
import { describeMistake, estimateRetryMinutes, practiceOrder, type MistakeDetails } from '../mistake-lookup'
import { useMistakesText } from '../mistakes-notebook-text'
import './mistake-practice.css'

/** Số câu tối đa mỗi lượt (ngắn, làm xong trong vài phút). */
export const PRACTICE_ROUND_SIZE = 10

interface PracticeTurn {
  details: MistakeDetails
  attempt: number
}

export interface MistakePracticeProps {
  round: MistakeDetails[]
  onClose: () => void
  /** bắt đầu lượt mới (trang cha thay `round`) */
  onStartRound: (round: MistakeDetails[]) => void
}

export function MistakePractice({ round, onClose, onStartRound }: MistakePracticeProps) {
  const text = useMistakesText()
  const { pick } = useLanguage()
  const { progress, recordAnswer, setMistakeResolved, addStudyMinutes, completeReviewSession } = useProgress()
  const [turns, setTurns] = useState<PracticeTurn[]>(() => round.map((details) => ({ details, attempt: 0 })))
  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  /** id mục lỗi đã sửa trong lượt này */
  const [fixedIds, setFixedIds] = useState<Set<string>>(() => new Set())
  const lastCorrect = useRef(false)
  const startedAt = useRef(Date.now())

  const turn = turns[index]

  const onChecked = useCallback(
    (result: RetryResult) => {
      if (!turn) return
      const { mistake, skill } = turn.details
      lastCorrect.current = result.correct
      // câu thi không có thẻ ôn 'item:' (không có dạng bài tập để ôn) -> không gửi itemKey
      const itemKey = mistake.source === 'exam' ? undefined : mistake.itemId
      if (result.correct) {
        recordAnswer(skill, true, itemKey)
        setMistakeResolved(mistake.id, true)
        setFixedIds((current) => new Set(current).add(mistake.id))
      } else {
        recordAnswer(skill, false, itemKey, {
          source: mistake.source,
          itemId: mistake.itemId,
          parentId: mistake.parentId,
          question: mistake.question,
          userAnswer: result.userAnswerText,
          correctAnswer: mistake.correctAnswer,
          explanation: mistake.explanation,
          context: mistake.context,
        })
      }
    },
    [turn, recordAnswer, setMistakeResolved],
  )

  const finish = useCallback(() => {
    setFinished(true)
    const minutes = Math.max(1, Math.round((Date.now() - startedAt.current) / 60_000))
    // làm lại câu sai = ôn thẻ 'item:' (FSRS) -> tính như 1 phiên ôn trọn vẹn: giữ chuỗi ngày + cộng phút
    // (psych-adult D7 luật 27: chuỗi = ≥ 1 bài học HOẶC 1 phiên ôn trong ngày)
    completeReviewSession(minutes)
    playSound('complete')
    if (fixedIds.size > 0 || lastCorrect.current) fireConfetti({ particleCount: 50 })
  }, [completeReviewSession, fixedIds.size])

  const onContinue = useCallback(() => {
    if (!turn) return
    // sai lần đầu -> hỏi lại 1 lần ở cuối lượt
    const nextTurns = !lastCorrect.current && turn.attempt === 0 ? [...turns, { details: turn.details, attempt: 1 }] : turns
    setTurns(nextTurns)
    if (index + 1 >= nextTurns.length) finish()
    else setIndex(index + 1)
  }, [turn, turns, index, finish])

  const exit = useCallback(() => {
    if (!finished && index > 0) addStudyMinutes(Math.max(1, Math.round((Date.now() - startedAt.current) / 60_000)))
    onClose()
  }, [finished, index, addStudyMinutes, onClose])

  /* ---------- màn tổng kết ---------- */
  const summary = useMemo(() => {
    if (!finished) return null
    const roundIds = new Set(round.map((details) => details.mistake.id))
    const stillOpen = progress.mistakes.filter((mistake) => roundIds.has(mistake.id) && !mistake.resolved)
    const otherOpen = progress.mistakes.filter((mistake) => !roundIds.has(mistake.id) && !mistake.resolved)
    const totalFixed = progress.mistakes.filter((mistake) => mistake.resolved).length
    return { stillOpen, otherOpen, totalFixed, fixedHere: round.length - stillOpen.length }
  }, [finished, round, progress.mistakes])

  if (summary) {
    const steps: NextStep[] = []
    if (summary.stillOpen.length > 0) {
      steps.push({
        id: 'retry-left',
        icon: <Icon name="review" size={24} />,
        title: text.stepRetryLeft(summary.stillOpen.length),
        meta: text.stepRetryLeftMeta,
        onClick: () => onStartRound(summary.stillOpen.map(describeMistake)),
      })
    } else if (summary.otherOpen.length > 0) {
      const next = summary.otherOpen.map(describeMistake).sort(practiceOrder).slice(0, PRACTICE_ROUND_SIZE)
      steps.push({
        id: 'more',
        icon: <Icon name="review" size={24} />,
        title: text.stepMoreMistakes(next.length),
        meta: text.stepMoreMistakesMeta(estimateRetryMinutes(next.length)),
        onClick: () => onStartRound(next),
      })
    }
    const due = srsQueueInfo(progress).sessionSize
    if (due > 0) {
      steps.push({
        id: 'review',
        icon: <SkillIcon skill="vocabulary" size={40} />,
        title: text.stepReviewCards(due),
        meta: text.stepReviewCardsMeta(estimateSessionMinutes(buildReviewQueue(progress))),
        to: '/review?start=1',
        accent: 'var(--skill-vocabulary)',
      })
    }
    const lesson = findNextLesson(progress)
    if (lesson && steps.length < 2) {
      steps.push({
        id: 'learn',
        icon: <SkillIcon skill={lesson.lesson.skill} size={40} />,
        title: text.stepLearn,
        meta: pick(lesson.lesson.title),
        to: `/lesson/${lesson.lesson.id}`,
        accent: `var(--skill-${lesson.lesson.skill})`,
      })
    }
    steps.push({ id: 'done', icon: <Icon name="check" size={24} />, title: text.stepDone, meta: text.stepDoneMeta, onClick: onClose, accent: 'var(--c-olive)' })

    return (
      <FocusOverlay ariaLabel={text.practiceCta} exitLabel={text.exit} onExit={onClose}>
        <div className="practice-end">
          <div className="practice-end__hero">
            <Mascot pose={summary.fixedHere > 0 ? 'celebrate' : 'comfort'} size={168} />
            <div>
              <h1>{text.practiceDoneTitle(summary.fixedHere, round.length)}</h1>
              <p>{text.practiceDoneText(summary.stillOpen.length)}</p>
            </div>
            <ProgressRing value={round.length ? summary.fixedHere / round.length : 0} size={112} color="var(--c-success)" label={text.fixedRingLabel(summary.fixedHere, round.length)}>
              <strong className="practice-end__ring-value">
                {summary.fixedHere}/{round.length}
              </strong>
            </ProgressRing>
          </div>
          <p className="practice-end__total">
            <Icon name="check" size={18} /> {text.fixedTotal(summary.totalFixed)}
          </p>
          <NextStepCards title={text.nextStepsTitle} steps={steps.slice(0, 3)} />
        </div>
      </FocusOverlay>
    )
  }

  /* ---------- đang làm ---------- */
  return (
    <FocusOverlay
      ariaLabel={text.practiceCta}
      exitLabel={text.exit}
      onExit={exit}
      progress={{ value: Math.min(index, round.length), max: round.length, label: text.practiceProgress, text: `${Math.min(index, round.length)}/${round.length}` }}
      topRight={
        <span className="practice-fixed">
          <Icon name="check" size={16} strokeWidth={3} /> {text.fixedSoFar(fixedIds.size)}
        </span>
      }
    >
      {turn && (
        <RetryQuestionView
          key={`${turn.details.mistake.id}-${turn.attempt}`}
          question={turn.details.retry}
          eyebrow={
            <>
              <SkillIcon skill={turn.details.skill} size={24} />
              <span>{text.skillName[turn.details.skill]}</span>
              <span aria-hidden>·</span>
              <span>{text.questionTypeName[turn.details.questionType]}</span>
              {turn.attempt > 0 && <span className="practice-again">{text.missedBeforeLabel}</span>}
            </>
          }
          correctTitle={text.correctFixedTitle}
          onChecked={onChecked}
          onContinue={onContinue}
        />
      )}
    </FocusOverlay>
  )
}
