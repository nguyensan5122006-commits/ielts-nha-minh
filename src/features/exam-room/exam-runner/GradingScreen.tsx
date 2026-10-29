/**
 * GradingScreen.tsx — MÀN "ĐANG CHẤM BÀI" SAU KHI NỘP PHẦN CUỐI
 * ----------------------------------------------------------------------------
 * Danh sách bước có trạng thái rõ ràng (không bắt chờ mà không biết bao lâu — ui-ielts-ai "Tránh 10"):
 *   ✓ Chấm Nghe · Đọc (tức thì)
 *   … AI chấm Writing Task 1 / Task 2, Speaking Part 1–3 (chạy song song, 15–40 giây mỗi bài)
 *   … Lưu kết quả + cập nhật tiến độ
 * AI lỗi -> "Thử chấm lại" hoặc "Xem kết quả luôn" (phần đó chưa có band) — không mất bài làm.
 * Lưu lên máy chủ lỗi -> giữ kết quả trong máy (/exam-result/local) + nút "Thử lưu lại".
 * Tiến độ học (XP, chuỗi ngày, sổ lỗi, band, mở level) chỉ ghi ĐÚNG 1 LẦN (applyProgressEffects).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Exam } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { useProgress } from '../../../learning-progress/progress-store'
import { useWallet } from '../../../player-wallet/wallet-store'
import { api } from '../../../services/api-client'
import { stopSpeaking } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import type { ExamDisplay } from '../../exam-ui/ExamDisplaySettings'
import { ExamFrame } from '../../exam-ui/ExamFrame'
import { isObjectiveSection } from '../exam-catalog'
import {
  applyProgressEffects,
  assembleResult,
  forgetLocalResult,
  gradeSpeakingJob,
  gradeWritingJob,
  isEmptyWriting,
  keepResultLocally,
  speakingJobs,
  writingJobs,
  type AiResultEntry,
  type SpeakingAnswer,
  type StoredExamResult,
} from '../exam-grading'
import { skillTextKey, useExamRoomText } from '../exam-room-text'
import type { ExamSessionHandle } from '../exam-session'

type StepState = 'waiting' | 'running' | 'done' | 'failed' | 'skipped'

export interface GradingScreenProps {
  exam: Exam
  handle: ExamSessionHandle
  takesRef: MutableRefObject<Record<number, SpeakingAnswer[]>>
  display: ExamDisplay
}

export function GradingScreen({ exam, handle, takesRef, display }: GradingScreenProps) {
  const text = useExamRoomText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const progress = useProgress()
  const { earnBananas } = useWallet()
  const session = handle.latest.current
  const sectionIndexes = session.sectionOrder

  const writing = useMemo(() => writingJobs(exam, sectionIndexes, session.answers), [exam, sectionIndexes, session.answers])
  const speaking = useMemo(() => speakingJobs(exam, sectionIndexes, takesRef.current), [exam, sectionIndexes, takesRef])
  const objectiveSkills = sectionIndexes.map((index) => exam.sections[index]).filter((section) => section && isObjectiveSection(section))

  const [ai, setAi] = useState<Record<string, AiResultEntry>>({})
  const [running, setRunning] = useState<Set<string>>(new Set())
  const [phase, setPhase] = useState<'grading' | 'ai-failed' | 'saving' | 'save-failed'>('grading')
  const effectsApplied = useRef(false)
  const resultRef = useRef<StoredExamResult | null>(null)
  const aiRef = useRef<Record<string, AiResultEntry>>({})
  // finish() mới nhất (runJobs gọi qua ref để không giữ bản cũ)
  const finishRef = useRef<(aiResults: Record<string, AiResultEntry>) => Promise<void>>(async () => {})

  /** Chạy các bài AI (lần đầu: tất cả; "Thử chấm lại": chỉ bài lỗi). */
  const runJobs = useCallback(
    async (onlyKeys?: Set<string>) => {
      setPhase('grading')
      const writingTodo = writing.filter((job) => !onlyKeys || onlyKeys.has(job.key))
      const speakingTodo = speaking.filter((job) => !onlyKeys || onlyKeys.has(job.key))
      setRunning(new Set([...writingTodo.filter((job) => !isEmptyWriting(job)).map((job) => job.key), ...speakingTodo.filter((job) => job.answers.length > 0).map((job) => job.key)]))
      const entries = await Promise.all([
        ...writingTodo.map(async (job) => [job.key, await gradeWritingJob(exam, job)] as const),
        ...speakingTodo.map(async (job) => [job.key, await gradeSpeakingJob(exam, job)] as const),
      ])
      const merged = { ...aiRef.current, ...Object.fromEntries(entries) }
      aiRef.current = merged
      setAi(merged)
      setRunning(new Set())
      const failed = entries.some(([, entry]) => !entry.result && entry.error !== 'empty')
      if (failed) setPhase('ai-failed')
      else void finishRef.current(merged)
    },
    [writing, speaking, exam],
  )

  /** Ghép kết quả -> ghi tiến độ (1 lần) -> lưu máy chủ -> sang trang kết quả. */
  const finish = useCallback(
    async (aiResults: Record<string, AiResultEntry>) => {
      setPhase('saving')
      const current = handle.latest.current
      if (!resultRef.current) {
        resultRef.current = assembleResult({
          exam,
          mode: current.mode,
          sectionIndexes: current.sectionOrder,
          answers: current.answers,
          aiResults,
          speakingSkipped: current.speakingSkipped || speaking.every((job) => job.answers.length === 0),
          timeSpentSeconds: Object.values(current.spentSeconds).reduce((sum, value) => sum + value, 0),
        })
      }
      const result = resultRef.current
      if (!effectsApplied.current) {
        effectsApplied.current = true
        applyProgressEffects(exam, result, { ...progress, earnBananas })
      }
      try {
        const { id } = await api.saveExamResult(exam.id, result)
        handle.discard()
        forgetLocalResult()
        navigate(`/exam-result/${id}`, { replace: true })
      } catch {
        keepResultLocally(result)
        handle.discard()
        setPhase('save-failed')
      }
    },
    [exam, handle, navigate, progress, earnBananas, speaking],
  )
  finishRef.current = finish

  // vào màn là chấm luôn (ref chặn chạy 2 lần ở chế độ StrictMode khi dev)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    stopSpeaking()
    void runJobs()
  }, [runJobs])

  const stepState = (key: string, empty: boolean): StepState => {
    if (empty) return 'skipped'
    if (running.has(key)) return 'running'
    const entry = ai[key]
    if (!entry) return 'waiting'
    if (entry.result) return 'done'
    return entry.error === 'empty' ? 'skipped' : 'failed'
  }

  const failedKeys = new Set(Object.entries(ai).filter(([, entry]) => !entry.result && entry.error !== 'empty').map(([key]) => key))
  const failedLabels = [...writing.filter((job) => failedKeys.has(job.key)).map((job) => `Writing Task ${job.task.taskNumber}`), ...speaking.filter((job) => failedKeys.has(job.key)).map((job) => `Speaking Part ${job.part.partNumber}`)].join(', ')

  return (
    <ExamFrame display={display} variant="standalone" className="xr-frame" title={pick(exam.title)}>
      <div className="xr-intro-scroll">
        <section className="xr-grading" aria-live="polite">
          <h2 className="xr-grading__title">
            {phase === 'save-failed' ? text('saveFailedTitle') : text('gradingTitle')}
            {(phase === 'grading' || phase === 'saving') && <span className="spinner xr-grading__spinner" aria-hidden />}
          </h2>
          <p className="xr-grading__intro">{phase === 'save-failed' ? text('saveFailedText') : text('gradingIntro')}</p>

          <ol className="xr-steps">
            {objectiveSkills.length > 0 && <Step state="done" label={text('gradingObjective', { skills: objectiveSkills.map((section) => text(skillTextKey(section.skill))).join(' · ') })} />}
            {writing.map((job) => (
              <Step key={job.key} state={stepState(job.key, isEmptyWriting(job))} label={text('gradingWriting', { n: job.task.taskNumber })} />
            ))}
            {speaking.map((job) => (
              <Step key={job.key} state={stepState(job.key, job.answers.length === 0)} label={text('gradingSpeaking', { n: job.part.partNumber })} />
            ))}
            <Step state={phase === 'saving' ? 'running' : phase === 'save-failed' ? 'failed' : 'waiting'} label={text('gradingSave')} />
          </ol>

          {phase === 'ai-failed' && (
            <div className="xr-grading__problem" role="alert">
              <strong>{text('aiFailedTitle', { list: failedLabels })}</strong>
              <p>{text('aiFailedText')}</p>
              <div className="xr-grading__actions">
                <Button variant="secondary" onClick={() => void finish(aiRef.current)}>
                  {text('skipAi')}
                </Button>
                <Button iconLeft="retry" onClick={() => void runJobs(failedKeys)}>
                  {text('retryAi')}
                </Button>
              </div>
            </div>
          )}
          {phase === 'save-failed' && (
            <div className="xr-grading__actions">
              <Button variant="secondary" onClick={() => navigate('/exam-result/local', { replace: true })}>
                {text('viewLocalResult')}
              </Button>
              <Button iconLeft="retry" onClick={() => void finish(aiRef.current)}>
                {text('retrySave')}
              </Button>
            </div>
          )}
        </section>
      </div>
    </ExamFrame>
  )
}

function Step({ state, label }: { state: StepState; label: string }) {
  const text = useExamRoomText()
  const stateText = { waiting: text('stepWaiting'), running: text('stepRunning'), done: text('stepDone'), failed: text('stepFailed'), skipped: text('stepSkipped') }[state]
  return (
    <li className={`xr-step is-${state}`}>
      <span className="xr-step__icon" aria-hidden>
        {state === 'done' ? <Icon name="check" size={14} strokeWidth={3} /> : state === 'failed' ? '!' : state === 'running' ? <span className="spinner xr-step__spinner" /> : state === 'skipped' ? '–' : ''}
      </span>
      <span className="xr-step__label">{label}</span>
      <span className="xr-step__state">{stateText}</span>
    </li>
  )
}
