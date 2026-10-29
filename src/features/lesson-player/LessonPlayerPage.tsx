/**
 * LessonPlayerPage.tsx — TRÌNH HỌC /lesson/:lessonId (toàn màn hình, trong FocusLayout)
 * ============================================================================
 * Luồng 1 bài (01-ARCHITECTURE mục 4.5):
 *
 *   thẻ dạy (≤ 3) → [từ mới] → bài tập → [task kỹ năng của nhóm khác] → câu sai làm lại → kết quả
 *
 * File này là "nhạc trưởng": giữ phiên học (session/lesson-session.ts), quyết định
 * đang ở bước nào, gọi kho tiến độ, và gắn phím tắt:
 *     1–4 chọn đáp án · Enter kiểm tra / tiếp tục · Space hoặc R nghe lại
 *     (Ctrl+Space khi đang gõ chữ) · Esc mở hộp thoại "Đã lưu chỗ bạn đang học"
 *
 * Tiến độ (03-DATA-LAYER mục 5):
 *   - mở bài: có progress.resume của bài này -> quay về ĐÚNG câu; không -> startLesson()
 *   - mỗi câu: recordAnswer(kỹ năng, đúng?, id câu, lỗi sai) rồi saveResume({...})
 *   - hết bài: completeLessonV3(...) -> addXp -> earnBananas('lesson') -> màn kết quả
 *
 * Các phần giao diện nằm trong parts/ (thẻ dạy, khung phản hồi, kết quả…),
 * các dạng bài trong exercises/. Mỗi file có giải thích ở đầu.
 * ============================================================================
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FocusLayout } from '../../app/layout'
import type { Exercise, Lesson } from '../../content/content-types'
import { findUnitOfLesson, levelProgress, unitProgress } from '../../content/path-selectors'
import { useLesson } from '../../content/use-lesson'
import { Button } from '../../design-system/components/Button'
import { EmptyState } from '../../design-system/components/EmptyState'
import { Icon } from '../../design-system/components/Icon'
import { Kbd } from '../../design-system/components/Kbd'
import { ProgressBar } from '../../design-system/components/ProgressBar'
import { Skeleton } from '../../design-system/components/Skeleton'
import { useToast } from '../../design-system/components/Toast'
import { playSound } from '../../design-system/sound-kit'
import '../../design-system/theme' // áp sáng/tối ngay cả khi mở thẳng link bài học
import { useProgress } from '../../learning-progress/progress-store'
import { useWallet } from '../../player-wallet/wallet-store'
import { stopSpeaking } from '../../services/text-to-speech'
import {
  checkExerciseAnswer,
  isSelfSubmitting,
  skipOutcome,
  solutionOutcome,
  TYPING_TYPES,
  type CheckOutcome,
} from './exercises/exercise-contract'
import { ExerciseView } from './exercises/ExerciseView'
import { hintMessage, hintStepsOf, type HintLevel } from './exercises/hint-ladder'
import { replayCurrentAudio } from './exercises/ListenHero'
import { useLessonText } from './lesson-player-text'
import { BottomBar, CheckButton, HintButton } from './parts/ActionBar'
import { FeedbackSheet } from './parts/FeedbackSheet'
import { HintBubble } from './parts/HintBubble'
import { LessonResults, type CompletionInfo } from './parts/LessonResults'
import { MilestoneScreen, type Milestone } from './parts/MilestoneScreen'
import { QuitDialog } from './parts/QuitDialog'
import { SkillTaskStage } from './parts/SkillTaskStage'
import { NewWordsView, pickCardImages, TeachingCardView } from './parts/TeachingCardView'
import { applyDevJump, isDevJump, readDevFlags } from './session/dev-flags'
import { passageOf, skillOfExercise } from './session/exercise-skill'
import {
  advance,
  createSession,
  currentQuestionNumber,
  fromResume,
  goBack,
  isFinished,
  MAX_RETRIES_PER_ITEM,
  parseStep,
  recordCheck,
  recordOf,
  sessionProgress,
  skipTheory,
  summarizeSession,
  toResume,
  touch,
  type SessionState,
} from './session/lesson-session'
import { calculateLessonXp } from './session/lesson-xp'
import { useSkillTask, skillTaskModeOf, type SkillTaskResult } from './skill-task-registry'
import './skill-task-loader' // nạp file đăng ký trình kỹ năng của các nhóm khác
import './lesson-player.css'

/* ============================================================================
 * 1. TRANG: tải bài (theo lesson-loader) -> chạy bài
 * ========================================================================== */

export function LessonPlayerPage() {
  const { lessonId = '' } = useParams()
  const { lesson, status, retry } = useLesson(lessonId)
  const text = useLessonText()
  const navigate = useNavigate()

  if (status === 'ready' && lesson) return <LessonRun key={lesson.id} lesson={lesson} />

  return (
    <FocusLayout onExit={() => navigate('/learn')} exitLabel={text.exit} progress={<ProgressBar value={0} max={1} label={text.loading} />}>
      {status === 'loading' ? (
        <div className="lp-loading" aria-busy="true" aria-label={text.loading}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rect" height={260} />
          <Skeleton variant="text" lines={3} />
        </div>
      ) : (
        <EmptyState
          pose={status === 'error' ? 'thinking' : 'surprised'}
          title={text.lessonNotFound}
          text={text.lessonNotFoundText}
          action={
            status === 'error' ? (
              <Button onClick={retry}>{text.tryAgain}</Button>
            ) : (
              <Button to="/learn" iconLeft="learn">
                {text.backToPath}
              </Button>
            )
          }
        />
      )}
    </FocusLayout>
  )
}

/* ============================================================================
 * 2. CHẠY 1 BÀI
 * ========================================================================== */

/** Trạng thái tạm của câu đang hiện (đặt lại khi sang câu khác). */
interface ItemUi {
  key: string
  answer: string | null
  outcome: CheckOutcome | null
  hintLevel: HintLevel
  checkedAt: number
}
const freshUi = (key: string): ItemUi => ({ key, answer: null, outcome: null, hintLevel: 0, checkedAt: 0 })

const TYPING_TIP_KEY = 'ielts-lp-unikey-tip-done'
const readTipDone = () => {
  try {
    return localStorage.getItem(TYPING_TIP_KEY) === '1'
  } catch {
    return false
  }
}

/** Khoảng chờ tối thiểu giữa "Kiểm tra" và "Tiếp tục" — chống bấm Enter 2 lần lỡ tay bỏ qua phản hồi */
const DOUBLE_ENTER_GUARD_MS = 320

function LessonRun({ lesson }: { lesson: Lesson }) {
  const text = useLessonText()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const store = useProgress()
  const { progress } = store
  const { earnBananas } = useWallet()
  const { showToast } = useToast()

  const taskMode = skillTaskModeOf(lesson)
  const registeredTask = useSkillTask(taskMode)
  const track = progress.profile.track
  // chặng + level chứa bài (cố định trong suốt buổi học)
  const [location] = useState(() => findUnitOfLesson(lesson.id, track))
  const unit = location?.unit ?? null
  const level = location?.level ?? null
  const targetBand = level?.bandRange
  const cards = useMemo(() => lesson.teachingCards.slice(0, 3), [lesson])
  const cardImages = useMemo(() => pickCardImages(cards, unit?.icon, lesson.skill), [cards, unit?.icon, lesson.skill])

  /* ---------- 2.1 mở bài: tiếp tục chỗ dở hoặc bắt đầu mới ---------- */
  const [initial] = useState(() => {
    const dev = readDevFlags(searchParams)
    const resume = progress.resume
    const resumed = !dev.fresh && resume?.lessonId === lesson.id
    const base = resumed ? fromResume(resume, lesson, taskMode) : createSession(lesson, taskMode)
    return { state: applyDevJump(base, dev, lesson), resumed, devJump: isDevJump(dev) }
  })
  const [session, setSession] = useState<SessionState>(initial.state)
  const sessionRef = useRef(session)

  /** Đổi phiên học + lưu chỗ đang làm (localStorage ngay, máy chủ sau 1,5 giây). */
  const commit = useCallback(
    (next: SessionState) => {
      sessionRef.current = next
      setSession(next)
      if (!isFinished(next)) store.saveResume(toResume(lesson.id, next))
    },
    [store, lesson.id],
  )

  const startedRef = useRef(false)
  useEffect(() => {
    // chỉ 1 lần (StrictMode khi dev chạy effect 2 lần) và không "mở lại" bài đã giả lập xong
    if (startedRef.current) return
    startedRef.current = true
    if (!initial.resumed && !isFinished(initial.state)) store.startLesson(lesson.id, initial.state.queue)
    if (initial.devJump && !isFinished(initial.state)) store.saveResume(toResume(lesson.id, initial.state))
    if (initial.resumed && initial.state.stepIndex > 0) {
      const number = currentQuestionNumber(initial.state)
      showToast({ icon: '📍', text: text.resumeToast(number) })
    }
    // chỉ chạy 1 lần khi mở bài
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- 2.2 bước hiện tại ---------- */
  const stepKey = session.queue[session.stepIndex]
  const step = stepKey ? parseStep(stepKey) : null
  const finished = isFinished(session)
  const exercise: Exercise | undefined = step?.kind === 'exercise' ? lesson.exercises.find((item) => item.id === step.exerciseId) : undefined
  const passage = passageOf(lesson, exercise)

  const uiKey = `${session.stepIndex}|${stepKey}`
  const [ui, setUi] = useState<ItemUi>(() => freshUi(uiKey))
  let current = ui
  if (ui.key !== uiKey) {
    // sang câu mới: đặt lại ngay trong lúc vẽ (không chờ effect -> không nháy câu cũ)
    current = freshUi(uiKey)
    setUi(current)
  }

  const [quitOpen, setQuitOpen] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [comboText, setComboText] = useState<string | undefined>()
  const comboTimer = useRef(0)
  const [typingTipDone, setTypingTipDone] = useState(readTipDone)
  const firstTypingId = lesson.exercises.find((item) => TYPING_TYPES.includes(item.type))?.id

  /* ---------- 2.3 kiểm tra 1 câu ---------- */
  const applyOutcome = useCallback(
    (outcome: CheckOutcome, hintLevel: HintLevel) => {
      if (!exercise || step?.kind !== 'exercise') return
      const now = Date.now()
      setUi({ ...current, outcome, hintLevel, checkedAt: now })
      if (outcome.verdict === 'correct') playSound('correct')
      else if (outcome.verdict === 'wrong' && !outcome.sawSolution && !outcome.skipped) playSound('oops')

      // ghi vào kho tiến độ (câu "không tính điểm" thì bỏ qua)
      const record = recordOf(sessionRef.current, exercise.id)
      if (outcome.verdict !== 'unclear') {
        const firstMistake = outcome.verdict === 'wrong' && !record.question
        store.recordAnswer(
          skillOfExercise(exercise, lesson),
          outcome.verdict === 'correct',
          exercise.id,
          firstMistake
            ? {
                source: 'lesson',
                itemId: exercise.id,
                parentId: lesson.id,
                question: outcome.questionText,
                userAnswer: outcome.userAnswerText || (outcome.sawSolution ? text.solutionShown : text.skip),
                correctAnswer: outcome.correctAnswerText,
                explanation: exercise.explanation?.vi,
                context: passage?.text,
              }
            : undefined,
        )
      }
      const comboBefore = sessionRef.current.meta.combo
      const next = recordCheck(touch(sessionRef.current, now), exercise, outcome, hintLevel, step.retry)
      commit(next)
      // nhãn nhỏ "3 câu đúng liền!" trên đầu thanh tiến độ (không phóng to toàn màn)
      if (next.meta.combo >= 3 && next.meta.combo > comboBefore) {
        setComboText(text.comboLabel(next.meta.combo))
        window.clearTimeout(comboTimer.current)
        comboTimer.current = window.setTimeout(() => setComboText(undefined), 2200)
      }
    },
    [exercise, step, current, store, lesson, text, passage, commit],
  )

  const check = useCallback(
    (override?: string) => {
      if (!exercise || current.outcome) return
      const value = override ?? current.answer
      if (value === null) return
      applyOutcome(checkExerciseAnswer(exercise, value), current.hintLevel)
    },
    [exercise, current, applyOutcome],
  )

  const continueNext = useCallback(() => {
    if (!current.outcome || Date.now() - current.checkedAt < DOUBLE_ENTER_GUARD_MS) return
    stopSpeaking()
    commit(advance(touch(sessionRef.current)))
  }, [current, commit])

  const openHint = () => {
    if (!exercise || current.outcome) return
    const steps = hintStepsOf(exercise)
    if (current.hintLevel < steps) {
      playSound('tap')
      setUi({ ...current, hintLevel: (current.hintLevel + 1) as HintLevel })
    } else applyOutcome(solutionOutcome(exercise), 3)
  }

  /* ---------- 2.4 thẻ dạy ---------- */
  const nextCard = useCallback(() => {
    stopSpeaking()
    commit(advance(touch(sessionRef.current)))
  }, [commit])

  /* ---------- 2.5 task kỹ năng ---------- */
  const saveTaskResume = useCallback(
    (data: unknown) => commit({ ...touch(sessionRef.current), taskResume: data }),
    [commit],
  )
  const completeTask = useCallback(
    (result: SkillTaskResult) => {
      const next = advance({ ...touch(sessionRef.current), taskResult: result, taskResume: null })
      commit(next)
    },
    [commit],
  )

  /* ---------- 2.6 thoát ---------- */
  const leave = async () => {
    setLeaving(true)
    stopSpeaking()
    commit(touch(sessionRef.current))
    await store.flushSave().catch(() => {})
    navigate('/learn')
  }

  /* ---------- 2.7 phím tắt chung ---------- */
  useEffect(() => {
    if (finished) return
    function onKey(event: KeyboardEvent) {
      if (quitOpen) return // hộp thoại tự xử lý Esc / Tab
      const target = event.target as HTMLElement
      if (target.closest('[role="dialog"]')) return
      const tag = target.tagName
      const inText = !!target.closest('input, textarea, [contenteditable="true"]')

      if (event.key === 'Escape') {
        event.preventDefault()
        setQuitOpen(true)
        return
      }
      if (step?.kind === 'task') return // trình kỹ năng tự lo phím của nó

      if (event.key === 'Enter' && !event.shiftKey && !event.altKey) {
        // nút đang được chọn bằng Tab -> để Enter bấm chính nút đó; ô viết dài -> Enter xuống dòng
        if (tag === 'BUTTON' || tag === 'A' || tag === 'SUMMARY' || tag === 'TEXTAREA') return
        event.preventDefault()
        if (step?.kind === 'card' || step?.kind === 'words') nextCard()
        else if (exercise) {
          if (current.outcome) continueNext()
          else if (!isSelfSubmitting(exercise)) check()
        }
        return
      }
      // nghe lại: Space / R (Ctrl+Space khi đang gõ chữ)
      const isSpace = event.key === ' '
      if (isSpace && event.ctrlKey) {
        if (replayCurrentAudio()) event.preventDefault()
        return
      }
      if (!inText && !event.ctrlKey && !event.metaKey && !event.altKey && (isSpace || event.key.toLowerCase() === 'r')) {
        if (replayCurrentAudio()) event.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finished, quitOpen, step, exercise, current.outcome, nextCard, continueNext, check])

  /* ---------- 2.8 hết bài: ghi tiến độ 1 lần ---------- */
  const [completion, setCompletion] = useState<CompletionInfo | null>(null)
  const beforeRef = useRef<{ unitDone: boolean; levelDone: boolean; studiedToday: boolean } | null>(null)
  const completedRef = useRef(false)
  useEffect(() => {
    if (!finished || completedRef.current) return
    completedRef.current = true
    stopSpeaking()
    const state = sessionRef.current
    const summary = summarizeSession(state, lesson)
    beforeRef.current = {
      unitDone: unit ? unitProgress(unit, progress).isComplete : true,
      levelDone: level ? levelProgress(track, level.id, progress).isComplete : true,
      studiedToday: store.streak.studiedToday,
    }
    const minutes = Math.max(1, Math.round(state.taskResult?.minutes ?? summary.activeMinutes))
    const isRepeat = !!progress.lessons[lesson.id]
    const xp = calculateLessonXp({ summary, taskMode, taskResult: state.taskResult, isRepeat, minutesTodayBefore: store.todayMinutes })
    store.completeLessonV3(lesson.id, summary.accuracy, lesson.words?.map((word) => word.id) ?? [], minutes)
    store.addXp(xp)
    void earnBananas('lesson')
    setCompletion({ summary, xp, minutes, isRepeat, taskResult: state.taskResult })
  }, [finished, lesson, unit, level, track, progress, store, taskMode, earnBananas])

  // mốc (xong trạm / level / chuỗi 7-30-100): tính 1 lần ngay khi có kết quả (tiến độ đã cập nhật)
  const [milestone, setMilestone] = useState<{ value: Milestone | null; seen: boolean } | null>(null)
  if (completion && milestone === null && beforeRef.current) {
    const before = beforeRef.current
    const found: Milestone = {}
    if (unit && !before.unitDone && unitProgress(unit, progress).isComplete) found.unit = unit
    if (level && !before.levelDone && levelProgress(track, level.id, progress).isComplete) found.levelId = level.id
    if (!before.studiedToday && [7, 30, 100].includes(store.streak.current)) found.streakDays = store.streak.current
    const has = !!(found.unit || found.levelId || found.streakDays)
    setMilestone({ value: has ? found : null, seen: !has })
  }

  /* ============================== VẼ ============================== */

  if (finished) {
    if (!completion || !milestone) return <div className="lp-results" aria-busy="true" />
    if (milestone.value && !milestone.seen) return <MilestoneScreen milestone={milestone.value} onContinue={() => setMilestone({ ...milestone, seen: true })} />
    return <LessonResults lesson={lesson} unit={unit} levelId={level?.id ?? null} targetBand={targetBand} completion={completion} />
  }

  const stats = sessionProgress(session)
  const inExercises = step?.kind === 'exercise' || step?.kind === 'task'
  const width = step?.kind === 'task' ? (registeredTask?.options.layout ?? 'normal') : passage ? 'wide' : 'normal'
  const hintSteps = exercise ? hintStepsOf(exercise) : 0
  const hintText = exercise && !current.outcome ? hintMessage(exercise, current.hintLevel, text) : null
  const record = exercise ? recordOf(session, exercise.id) : null
  // đang bí (2 câu gần nhất đều sai) -> nút Gợi ý khẽ nhắc
  const nudgeHint = session.meta.combo === 0 && Object.values(session.items).filter((item) => item.lastVerdict === 'wrong').length >= 2

  let content: ReactNode = null
  let footer: ReactNode = null

  if (step?.kind === 'card') {
    const isLastTheory = parseStep(session.queue[session.stepIndex + 1] ?? '')?.kind !== 'card' && parseStep(session.queue[session.stepIndex + 1] ?? '')?.kind !== 'words'
    content = <TeachingCardView card={cards[step.index]} index={step.index} total={cards.length} illustration={cardImages[step.index]} skill={lesson.skill} />
    footer = (
      <BottomBar
        left={
          <>
            {session.stepIndex > 0 && (
              <Button variant="ghost" iconLeft={<Icon name="chevron-right" size={18} className="lp-flip" />} onClick={() => commit(goBack(sessionRef.current))}>
                {text.back}
              </Button>
            )}
            {!isLastTheory && (
              <Button variant="ghost" onClick={() => commit(skipTheory(sessionRef.current))}>
                {text.skipTheory}
              </Button>
            )}
          </>
        }
        right={
          <Button size="lg" onClick={nextCard} iconRight={<Kbd onColor>Enter</Kbd>}>
            {isLastTheory ? text.startPractice : text.next}
          </Button>
        }
      />
    )
  } else if (step?.kind === 'words' && lesson.words) {
    content = <NewWordsView words={lesson.words} />
    footer = (
      <BottomBar
        left={
          <Button variant="ghost" iconLeft={<Icon name="chevron-right" size={18} className="lp-flip" />} onClick={() => commit(goBack(sessionRef.current))}>
            {text.back}
          </Button>
        }
        right={
          <Button size="lg" onClick={nextCard} iconRight={<Kbd onColor>Enter</Kbd>}>
            {text.startPractice}
          </Button>
        }
      />
    )
  } else if (step?.kind === 'exercise' && exercise) {
    content = (
      <div className={['lp-stage', passage && 'lp-stage--split'].filter(Boolean).join(' ')}>
        {passage && (
          <aside className="lp-passage" aria-label={text.readPassage}>
            <p className="lp-passage__eyebrow">{text.readPassage}</p>
            <h3 className="lp-passage__title">{passage.title}</h3>
            <div className="lp-passage__text ds-reading">{passage.text}</div>
          </aside>
        )}
        <div className="lp-stage__main" key={uiKey}>
          {step.retry > 0 && (
            <span className="lp-retry-tag">
              <Icon name="review" size={14} /> {text.retryTag}
            </span>
          )}
          <ExerciseView
            exercise={exercise}
            outcome={current.outcome}
            hintLevel={current.hintLevel}
            attempt={step.retry}
            onAnswerChange={(answer) => setUi((value) => (value.key === uiKey ? { ...value, answer } : value))}
            onSubmit={(answer) => check(answer)}
            showTypingTip={!typingTipDone && exercise.id === firstTypingId && step.retry === 0}
            onDismissTypingTip={() => {
              setTypingTipDone(true)
              try {
                localStorage.setItem(TYPING_TIP_KEY, '1')
              } catch {
                /* bỏ qua */
              }
            }}
            targetBand={targetBand}
            levelId={level?.id}
          />
          {hintText && <HintBubble message={hintText} step={current.hintLevel} steps={hintSteps} />}
        </div>
      </div>
    )
    footer = current.outcome ? (
      <FeedbackSheet
        key={uiKey}
        lessonId={lesson.id}
        exercise={exercise}
        outcome={current.outcome}
        willRetry={current.outcome.verdict === 'wrong' && step.retry < MAX_RETRIES_PER_ITEM}
        context={passage?.text}
        onContinue={continueNext}
        onSpeakAgain={
          exercise.type === 'speak-sentence' && current.outcome.verdict === 'unclear' && !current.outcome.noMic && !current.outcome.skipped
            ? () => setUi({ ...current, outcome: null, answer: null })
            : undefined
        }
      />
    ) : (
      <BottomBar
        left={
          <>
            {hintSteps > 0 && <HintButton level={current.hintLevel} steps={hintSteps} nudge={nudgeHint && (record?.attempts ?? 0) === 0} onClick={openHint} />}
            <Button variant="ghost" onClick={() => applyOutcome(skipOutcome(exercise), current.hintLevel)}>
              {isSelfSubmitting(exercise) ? text.skipNoPenalty : text.skip}
            </Button>
          </>
        }
        // nói / AI chấm / nối cặp tự kiểm tra khi xong -> không cần nút Kiểm tra
        right={!isSelfSubmitting(exercise) && exercise.type !== 'match-pairs' && <CheckButton disabled={current.answer === null} onClick={() => check()} />}
      />
    )
  } else if (step?.kind === 'task') {
    content = (
      <SkillTaskStage
        lesson={lesson}
        mode={step.mode}
        resumeData={session.taskResume}
        onSaveResume={saveTaskResume}
        onComplete={completeTask}
        onRequestExit={() => setQuitOpen(true)}
      />
    )
  }

  // localStorage được ghi NGAY mỗi lần -> 'saving' (đang gửi máy chủ) vẫn là "Đã lưu" với người học
  const saveLabel = store.saveStatus === 'error' ? text.offlineChip : text.savedChip

  return (
    <FocusLayout
      onExit={() => setQuitOpen(true)}
      exitLabel={text.exit}
      exitOnEscape={false}
      width={width}
      progress={
        <ProgressBar
          value={stats.done}
          max={stats.total}
          label={text.progressLabel}
          valueText={inExercises ? `${stats.itemsDone}/${stats.itemsTotal}` : undefined}
          streakText={comboText}
        />
      }
      trailing={
        <span className={`lp-save lp-save--${store.saveStatus === 'error' ? 'error' : 'saved'}`} title={saveLabel}>
          <Icon name={store.saveStatus === 'error' ? 'clock' : 'check'} size={14} strokeWidth={2.6} />
          <span className="lp-save__label">{saveLabel}</span>
        </span>
      }
      footer={footer}
    >
      <div className={['lp-content', current.outcome && 'has-sheet'].filter(Boolean).join(' ')} key={step?.kind === 'exercise' ? undefined : uiKey}>
        {content}
      </div>
      <QuitDialog
        open={quitOpen}
        questionNumber={inExercises ? currentQuestionNumber(session) : null}
        saving={leaving}
        onStay={() => setQuitOpen(false)}
        onLeave={() => void leave()}
      />
    </FocusLayout>
  )
}
