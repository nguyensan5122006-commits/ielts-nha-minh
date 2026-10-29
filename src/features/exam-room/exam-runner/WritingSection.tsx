/**
 * WritingSection.tsx — PHẦN THI VIẾT (Writing Task 1 + Task 2)
 * ----------------------------------------------------------------------------
 * Như máy thi IELTS: đề + biểu đồ bên trái, ô viết bên phải, "Số từ: N" đếm ngay khi gõ,
 * không bắt lỗi chính tả, thanh dưới đáy có "Task 1 · Task 2" (viết rồi có vạch xanh).
 *   - Thi thật: ô viết gọn chỉ có số từ (ExamWritingBox) — đúng như ngày thi, không gợi ý.
 *   - Luyện tập: dùng WritingEditor của nhóm skill-writing (số đoạn, từ nối, từ lặp…).
 *   - Biểu đồ Task 1: TaskChart của skill-writing (màu hệ thiết kế, có chế độ tối, "Xem dạng bảng").
 * Tự lưu: câu trả lời vào phiên làm bài (máy này) + saveDraft() của kho tiến độ (đổi máy vẫn còn).
 * Chấm: AI (Gemini) chấm sau khi nộp cả đề — xem exam-grading.ts.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { WritingTask } from '../../../content/content-types'
import { useProgress } from '../../../learning-progress/progress-store'
import { countWords } from '../../../services/answer-checking'
import { CalmExamTimer, useExamCountdown } from '../../exam-ui/CalmExamTimer'
import { useExamUiText } from '../../exam-ui/exam-ui-text'
import { ExamFrame, ModeBadge } from '../../exam-ui/ExamFrame'
import { QuestionNavigator, type NavigatorPart } from '../../exam-ui/QuestionNavigator'
import { ReviewBeforeSubmit } from '../../exam-ui/ReviewBeforeSubmit'
import { SplitPane } from '../../exam-ui/SplitPane'
import { TaskChart } from '../../skill-writing/TaskChart'
import { WritingEditor } from '../../skill-writing/WritingEditor'
import '../../skill-writing/WritingTaskPlayer.css'
import { writingDraftKey } from '../exam-grading'
import { useExamRoomText } from '../exam-room-text'
import type { SectionRunnerProps } from './ObjectiveSection'
import { ExitDialog, SaveStatus, useSpentSeconds, useUnloadWarning } from './runner-shared'

/** Gửi nháp lên máy chủ sau ngần này im lặng (localStorage của phiên vẫn lưu sau 0,4 giây). */
const DRAFT_SYNC_MS = 2500

export function WritingSection({ exam, sectionIndex, position, handle, rules, display, onSubmit, onExit }: SectionRunnerProps) {
  const text = useExamRoomText()
  const uiText = useExamUiText()
  const { progress, saveDraft } = useProgress()
  const { session, update, saveState } = handle
  const section = exam.sections[sectionIndex]
  const tasks = useMemo(() => section.writingTasks ?? [], [section])
  const sectionKey = String(sectionIndex)
  const currentId = session.currentId[sectionKey] ?? tasks[0]?.id ?? null
  const task = tasks.find((candidate) => candidate.id === currentId) ?? tasks[0]
  const [reviewOpen, setReviewOpen] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)

  useSpentSeconds(handle, sectionIndex)
  useUnloadWarning(true)

  // bài trên máy khác (nháp ở máy chủ) mà máy này chưa có -> lấy về 1 lần
  useEffect(() => {
    const restored: Record<string, string> = {}
    for (const candidate of tasks) {
      const draft = progress.drafts[writingDraftKey(exam.id, candidate.id)]
      if (draft?.text && !handle.latest.current.answers[candidate.id]) restored[candidate.id] = draft.text
    }
    if (Object.keys(restored).length) update((current) => ({ answers: { ...current.answers, ...restored } }))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ khi mở phần
  }, [])

  /* ---------- gõ chữ: lưu phiên + hẹn gửi nháp ---------- */
  const draftTimers = useRef<Record<string, number>>({})
  const setEssay = useCallback(
    (taskId: string, value: string) => {
      update((current) => ({ answers: { ...current.answers, [taskId]: value } }))
      window.clearTimeout(draftTimers.current[taskId])
      draftTimers.current[taskId] = window.setTimeout(() => saveDraft(writingDraftKey(exam.id, taskId), value), DRAFT_SYNC_MS)
    },
    [update, saveDraft, exam.id],
  )
  useEffect(() => {
    const timers = draftTimers.current
    return () => Object.values(timers).forEach((id) => window.clearTimeout(id))
  }, [])
  const flushDrafts = () => {
    for (const candidate of tasks) {
      window.clearTimeout(draftTimers.current[candidate.id])
      const value = handle.latest.current.answers[candidate.id]
      if (value) saveDraft(writingDraftKey(exam.id, candidate.id), value)
    }
  }

  /* ---------- đồng hồ ---------- */
  const submitRef = useRef(onSubmit)
  submitRef.current = onSubmit
  const { secondsLeft, tone } = useExamCountdown(session.secondsLeft[sectionKey] ?? section.durationMinutes * 60, {
    running: rules.timed,
    onExpire: () => submitRef.current('time-up'),
  })
  useEffect(() => {
    if (rules.timed && secondsLeft % 5 === 0) update((current) => ({ secondsLeft: { ...current.secondsLeft, [sectionKey]: secondsLeft } }), false, true)
  }, [rules.timed, secondsLeft, sectionKey, update])

  const selectTask = useCallback((taskId: string) => update((current) => ({ currentId: { ...current.currentId, [sectionKey]: taskId } })), [update, sectionKey])
  const stepTask = (delta: number) => {
    const index = tasks.findIndex((candidate) => candidate.id === task?.id)
    const next = tasks[Math.max(0, Math.min(tasks.length - 1, index + delta))]
    if (next) selectTask(next.id)
  }

  // Ctrl+Enter = kiểm tra & nộp · Alt+←/→ = đổi task
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (reviewOpen || exitOpen || (event.target as HTMLElement).closest('[role="dialog"]')) return
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        setReviewOpen(true)
      } else if (event.altKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault()
        stepTask(event.key === 'ArrowRight' ? 1 : -1)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  // mỗi task là 1 "Part" trên thanh dưới đáy (như máy thi: Part 1 / Part 2, viết rồi có vạch xanh)
  const navigatorParts: NavigatorPart[] = tasks.map((candidate) => ({
    id: `w-${candidate.id}`,
    label: text('taskLabel', { n: candidate.taskNumber }),
    questions: [{ id: candidate.id, number: candidate.taskNumber, answered: countWords(session.answers[candidate.id] ?? '') > 0 }],
  }))
  const writtenCount = navigatorParts.filter((part) => part.questions[0].answered).length

  const leave = () => {
    flushDrafts()
    if (rules.timed) update((current) => ({ secondsLeft: { ...current.secondsLeft, [sectionKey]: secondsLeft } }), true)
    else update({}, true)
    onExit()
  }

  if (!task) return null
  const essay = session.answers[task.id] ?? ''

  return (
    <ExamFrame
      display={display}
      variant="standalone"
      className="xr-frame"
      title={section.title}
      skill="writing"
      badge={
        <>
          <ModeBadge mode={session.mode === 'exam' || rules.timed ? 'exam' : 'practice'} />
          <span className="xr-frame__position">{text('sectionOf', position)}</span>
        </>
      }
      timer={rules.timed ? <CalmExamTimer secondsLeft={secondsLeft} tone={tone} /> : null}
      tone={rules.timed ? tone : 'calm'}
      status={<SaveStatus state={saveState} />}
      onExit={() => setExitOpen(true)}
      exitLabel={text('leave')}
      footer={
        <QuestionNavigator
          parts={navigatorParts}
          currentId={task.id}
          onSelect={selectTask}
          onPrev={tasks.length > 1 ? () => stepTask(-1) : undefined}
          onNext={tasks.length > 1 ? () => stepTask(1) : undefined}
          extra={uiText('answeredOf', { done: writtenCount, total: tasks.length })}
          primaryAction={{ label: text('submitSection'), onClick: () => setReviewOpen(true) }}
        />
      }
    >
      <SplitPane
        key={task.id}
        start={<TaskPrompt task={task} />}
        end={
          <div className="xr-write">
            {session.mode === 'practice' && !rules.timed ? (
              <WritingEditor
                value={essay}
                onChange={(value) => setEssay(task.id, value)}
                minWords={task.minWords}
                suggestedMinutes={task.suggestedMinutes}
                saveState={saveState === 'saving' ? 'saving' : saveState === 'saved' ? 'saved' : 'local'}
                label={text('essayLabel', { n: task.taskNumber })}
                showTimer={false}
                onSubmitShortcut={() => setReviewOpen(true)}
                autoFocus
                minHeight={360}
              />
            ) : (
              <ExamWritingBox task={task} value={essay} onChange={(value) => setEssay(task.id, value)} />
            )}
            {tasks.length > 1 && task.id !== tasks[tasks.length - 1].id && (
              <div className="xr-part-next">
                <button type="button" className="xr-link-button" onClick={() => stepTask(1)}>
                  {text('taskLabel', { n: tasks[tasks.findIndex((candidate) => candidate.id === task.id) + 1].taskNumber })} →
                </button>
              </div>
            )}
          </div>
        }
        startLabel={text('taskPane')}
        endLabel={text('answerPane')}
        defaultRatio={0.46}
        storageKey="exam-room-writing"
      />
      <ReviewBeforeSubmit
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={() => {
          setReviewOpen(false)
          flushDrafts()
          onSubmit('manual')
        }}
        onJump={(id) => {
          setReviewOpen(false)
          selectTask(id)
        }}
        parts={navigatorParts}
        examMode={rules.timed || session.mode === 'exam'}
        itemKind="tasks"
      />
      <ExitDialog open={exitOpen} onStay={() => setExitOpen(false)} onLeave={leave} timed={rules.timed} />
    </ExamFrame>
  )
}

/** Cột trái: dải "Task 1 · nên dành 20 phút · ít nhất 150 từ" + đề (giữ xuống dòng) + biểu đồ. */
function TaskPrompt({ task }: { task: WritingTask }) {
  const text = useExamRoomText()
  return (
    <div className="xr-task">
      <div className="xr-part-banner">
        <strong>{text('taskLabel', { n: task.taskNumber })}</strong>
        <span>
          {text('spendAbout', { n: task.suggestedMinutes })} · {text('writeAtLeast', { n: task.minWords })}
        </span>
      </div>
      <div className="xr-task__prompt">
        {task.prompt.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {task.chartData && (
        <div className="xr-task__chart">
          <TaskChart chart={task.chartData} />
        </div>
      )}
    </div>
  )
}

/** Ô viết kiểu máy thi: chỉ có số từ (cam khi còn thiếu -> xanh khi đủ). Không bắt lỗi chính tả. */
function ExamWritingBox({ task, value, onChange }: { task: WritingTask; value: string; onChange: (value: string) => void }) {
  const text = useExamRoomText()
  const ref = useRef<HTMLTextAreaElement>(null)
  const words = countWords(value)
  const enough = words >= task.minWords

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [task.id])

  return (
    <div className="writing-editor xr-exam-writing">
      <label className="xr-exam-writing__label" htmlFor={`xr-essay-${task.id}`}>
        {text('essayLabel', { n: task.taskNumber })}
      </label>
      <textarea
        ref={ref}
        id={`xr-essay-${task.id}`}
        className="writing-editor__input xr-exam-writing__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={text('essayPlaceholder')}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="sentences"
        lang="en"
      />
      <div className="xr-exam-writing__meter" aria-live="polite">
        <div className={`writing-editor__bar ${enough ? 'is-enough' : 'is-short'}`} aria-hidden>
          <span style={{ width: `${Math.min(100, (words / task.minWords) * 100)}%` }} />
        </div>
        <strong className="ds-num">{text('wordCount', { n: words })}</strong>
        <span className={enough ? 'xr-exam-writing__state is-enough' : 'xr-exam-writing__state'}>{enough ? text('wordsEnough') : text('wordsShort', { n: task.minWords - words })}</span>
      </div>
    </div>
  )
}
