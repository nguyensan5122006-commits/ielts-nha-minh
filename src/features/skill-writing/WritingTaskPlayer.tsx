/**
 * WritingTaskPlayer.tsx — TRÌNH LÀM BÀI WRITING (lesson.mode = 'writing', dữ liệu lesson.writingTask)
 * ----------------------------------------------------------------------------
 * Được trình học (lesson-player) mở sau phần bài tập khởi động — xem register-skill-tasks.ts.
 * 4 bước, mỗi bước 1 nút chính + 1 nút phụ ở thanh đáy:
 *
 *   1. VIẾT        đề + biểu đồ bên trái | editor bên phải (đếm từ, từ nối, từ lặp, đồng hồ, tự lưu nháp)
 *   2. TỰ CHẤM     bài của mình (có nhãn đoạn) | checklist 4 tiêu chí -> band tự chấm (công thức minh bạch)
 *   3. SO BÀI MẪU  trò "đoán band bài mẫu" -> đặt bài mình cạnh bài mẫu 4.0 / 5.5 / 6.5
 *   4. AI CHẤM & SỬA  sửa bài bên trái | kết quả AI bên phải (band ±0.5, ưu điểm trước, nâng cấp theo
 *                  tiêu chí có câu trích) + tab "Thay đổi" so với bản đã chấm + "Kiểm tra lại"
 *
 * Lưu tiến độ (03-DATA-LAYER):
 *   - nháp: useProgress().saveDraft(task.id, text) sau 0,7 giây ngừng gõ
 *   - bước đang ở, câu trả lời tự chấm, kết quả AI: onSaveResume(...) -> trình học ghi vào resume
 *   - nộp tự chấm / có kết quả AI: logWriting(...); đủ ≥ 2 lần AI chấm: updateBandEstimate('writing', …)
 * psych-adult D9 luật 37: tự chấm trước, AI sau, band luôn là khoảng ±0.5; track general không hiện số.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../../design-system/components/Button'
import { Icon } from '../../design-system/components/Icon'
import { Kbd } from '../../design-system/components/Kbd'
import { Stepper } from '../../design-system/components/Stepper'
import { Tabs } from '../../design-system/components/Tabs'
import { useProgress } from '../../learning-progress/progress-store'
import { api } from '../../services/api-client'
import { useLanguage } from '../../translations/language-context'
import type { SkillTaskProps } from '../lesson-player/skill-task-registry'
import {
  LEVEL_LABELS,
  aiBandRange,
  bandDisplayFor,
  formatBand,
  levelIndexForBand,
  roundToHalfBand,
  sampleBands,
  selfBandFromChecklist,
  sortedSamples,
  type CriterionCode,
  type SelfCheckAnswer,
} from './band-scale'
import { AiResultView } from './feedback/AiResultView'
import { AiStatusCard } from './feedback/AiStatusCard'
import { DraftChanges } from './feedback/DraftChanges'
import { GuessBandCard } from './feedback/GuessBandCard'
import { LabelledEssay, SampleNotes } from './feedback/LabelledEssay'
import { DEFAULT_WRITING_CHECKLIST, SelfCheckPanel, type ChecklistGroup } from './feedback/SelfCheckPanel'
import { useAiGrading, type AiGradingResultV3 } from './feedback/use-ai-grading'
import { useWritingText } from './skill-writing-text'
import { TaskBrief } from './TaskBrief'
import { describeChartAsText } from './TaskChart'
import { diffStats, diffWords } from './word-diff'
import { WritingEditor, type DraftSaveState } from './WritingEditor'
import { countWords, splitParagraphs, writingKindOf } from './writing-metrics'
import './WritingTaskPlayer.css'

type Stage = 'write' | 'self-check' | 'samples' | 'ai'
const STAGES: Stage[] = ['write', 'self-check', 'samples', 'ai']

interface AiCheck {
  text: string
  result: AiGradingResultV3
  at: string
}

/** Dữ liệu gửi trình học lưu vào resume (JSON thuần). Đổi cấu trúc -> tăng v. */
interface WritingResumeState {
  v: 1
  stage: Stage
  submittedText: string | null
  selfAnswers: Record<string, SelfCheckAnswer>
  selfLogged: boolean
  guess: { mysteryIndex: number; picked: number | null; done: boolean }
  checks: AiCheck[]
  elapsedSeconds: number
}

const DRAFT_SAVE_DELAY_MS = 700
const MAX_SAVED_CHECKS = 3 // giữ 3 lần chấm gần nhất trong resume (mỗi lần ~3KB)

function readResume(data: unknown, sampleCount: number): WritingResumeState | null {
  const state = data as Partial<WritingResumeState> | null
  if (!state || state.v !== 1 || !STAGES.includes(state.stage as Stage)) return null
  return {
    v: 1,
    stage: state.stage as Stage,
    submittedText: typeof state.submittedText === 'string' ? state.submittedText : null,
    selfAnswers: state.selfAnswers ?? {},
    selfLogged: !!state.selfLogged,
    guess: state.guess && state.guess.mysteryIndex < sampleCount ? state.guess : { mysteryIndex: 0, picked: null, done: false },
    checks: Array.isArray(state.checks) ? state.checks : [],
    elapsedSeconds: state.elapsedSeconds ?? 0,
  }
}

export default function WritingTaskPlayer({ lesson, resumeData, onSaveResume, onComplete }: SkillTaskProps) {
  const task = lesson.writingTask!
  const text = useWritingText()
  const { language, pick } = useLanguage()
  const { progress, saveStatus, saveDraft, logWriting, updateBandEstimate } = useProgress()
  const progressRef = useRef(progress)
  progressRef.current = progress

  /* ---------- dữ liệu cố định của đề ---------- */
  const samples = useMemo(() => sortedSamples(task.bandSamples ?? []), [task])
  const bands = useMemo(() => sampleBands(task.bandSamples ?? []), [task])
  const display = bandDisplayFor(lesson.id, progress.profile.track)
  const kind = writingKindOf(task)
  const checklist: ChecklistGroup[] = useMemo(() => {
    if (task.checklist?.length) return task.checklist
    return DEFAULT_WRITING_CHECKLIST.map((group) => (group.criterion === 'TR' && task.taskNumber === 1 ? { ...group, criterion: 'TA' as const } : group))
  }, [task])
  const criteria: CriterionCode[] = checklist.map((group) => group.criterion)

  /* ---------- trạng thái (khôi phục từ resume nếu có) ---------- */
  const initial = useMemo(
    () =>
      readResume(resumeData, samples.length) ?? {
        v: 1 as const,
        stage: 'write' as Stage,
        submittedText: null,
        selfAnswers: {},
        selfLogged: false,
        guess: { mysteryIndex: Math.floor(Math.random() * Math.max(1, samples.length)), picked: null, done: samples.length === 0 },
        checks: [],
        elapsedSeconds: 0,
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const [stage, setStage] = useState<Stage>(initial.stage)
  const [submittedText, setSubmittedText] = useState<string | null>(initial.submittedText)
  const [selfAnswers, setSelfAnswers] = useState(initial.selfAnswers)
  const [selfLogged, setSelfLogged] = useState(initial.selfLogged)
  const [guess, setGuess] = useState(initial.guess)
  const [checks, setChecks] = useState<AiCheck[]>(initial.checks)
  const [essay, setEssay] = useState(() => progress.drafts[task.id]?.text ?? initial.submittedText ?? '')
  const [confirmShort, setConfirmShort] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const [feedbackTab, setFeedbackTab] = useState<'feedback' | 'changes'>('feedback')
  const sessionStart = useRef(Date.now())
  const grading = useAiGrading<AiGradingResultV3>()
  const lastCheck = checks[checks.length - 1] ?? null

  // Có kết quả AI cũ trong resume -> hiện luôn
  useEffect(() => {
    if (initial.checks.length > 0) grading.markDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---------- tự lưu nháp ---------- */
  const [pendingDraft, setPendingDraft] = useState(false)
  // nháp khôi phục từ kho tiến độ = đã lưu sẵn
  const [savedOnce, setSavedOnce] = useState(() => !!progress.drafts[task.id])
  const essayRef = useRef(essay)
  essayRef.current = essay
  useEffect(() => {
    if (!pendingDraft) return
    const timer = window.setTimeout(() => {
      saveDraft(task.id, essayRef.current)
      setPendingDraft(false)
      setSavedOnce(true)
    }, DRAFT_SAVE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [essay, pendingDraft, saveDraft, task.id])
  // rời trang khi còn nháp chưa lưu -> lưu ngay
  const pendingRef = useRef(pendingDraft)
  pendingRef.current = pendingDraft
  useEffect(
    () => () => {
      if (pendingRef.current) saveDraft(task.id, essayRef.current)
    },
    [saveDraft, task.id],
  )
  const draftState: DraftSaveState = pendingDraft
    ? 'saving'
    : !savedOnce
      ? 'idle'
      : saveStatus === 'error'
        ? 'local'
        : saveStatus === 'saving'
          ? 'saving'
          : 'saved'

  function changeEssay(next: string) {
    setEssay(next)
    setPendingDraft(true)
    setConfirmShort(false)
    setNotice(null)
  }

  /* ---------- lưu resume mỗi khi trạng thái quan trọng đổi ---------- */
  useEffect(() => {
    const state: WritingResumeState = {
      v: 1,
      stage,
      submittedText,
      selfAnswers,
      selfLogged,
      guess,
      checks: checks.slice(-MAX_SAVED_CHECKS),
      elapsedSeconds: initial.elapsedSeconds + Math.round((Date.now() - sessionStart.current) / 1000),
    }
    onSaveResume(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, submittedText, selfAnswers, selfLogged, guess, checks])

  /* ---------- band tự chấm ---------- */
  const selfScore = selfBandFromChecklist(checklist, selfAnswers, bands)
  const selfBand = selfScore.overall

  /* ---------- chuyển bước ---------- */
  const topRef = useRef<HTMLDivElement>(null)
  function goTo(next: Stage) {
    setStage(next)
    setNotice(null)
    setConfirmShort(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitWriting = useCallback(
    (force = false) => {
      const words = countWords(essay)
      if (words < 15) {
        setNotice(text.tooShortToSubmit)
        return
      }
      if (words < task.minWords && !force) {
        setConfirmShort(true)
        return
      }
      saveDraft(task.id, essay)
      setPendingDraft(false)
      setSubmittedText(essay)
      // nộp lại bản khác -> phải tự chấm lại + ghi nhật ký lần nộp mới
      if (submittedText !== null && submittedText !== essay) setSelfLogged(false)
      goTo('self-check')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [essay, task, submittedText, text],
  )

  function toSamples() {
    if (selfBand === null) {
      setNotice(text.questionsLeft(selfScore.total - selfScore.answered))
      return
    }
    if (!selfLogged && submittedText) {
      logWriting({ taskId: task.id, words: countWords(submittedText), selfBand })
      setSelfLogged(true)
    }
    goTo('samples')
  }

  async function grade() {
    const answer = essay.trim()
    if (stage !== 'ai') goTo('ai')
    setFeedbackTab('feedback')
    const result = await grading.run(() =>
      api
        .gradeWriting({
          prompt: task.prompt,
          answer,
          taskKind: task.taskNumber === 1 ? 'task1' : 'task2',
          targetBand: `${formatBand(bands[0])} – ${formatBand(bands[bands.length - 1])}`,
          chartDescription: task.chartData ? describeChartAsText(task.chartData) : undefined,
        })
        .then((response) => response.result as AiGradingResultV3),
    )
    if (!result) return
    const range = aiBandRange(result.overallBand)
    setChecks((current) => [...current, { text: answer, result, at: new Date().toISOString() }])
    logWriting({ taskId: task.id, words: countWords(answer), selfBand: selfBand ?? undefined, aiLow: range.low, aiHigh: range.high })
    // band ước tính kỹ năng: chỉ cập nhật khi có ≥ 2 lần AI chấm (psych-adult D6 luật 23)
    const previous = progressRef.current.writingLog.filter((entry) => entry.aiLow != null && entry.aiHigh != null).slice(-4)
    const all = [...previous.map((entry) => ({ low: entry.aiLow!, high: entry.aiHigh! })), range]
    if (all.length >= 2) {
      const average = (values: number[]) => roundToHalfBand(values.reduce((a, b) => a + b, 0) / values.length)
      updateBandEstimate('writing', average(all.map((r) => r.low)), average(all.map((r) => r.high)), all.length >= 5 ? 'high' : 'medium')
    }
  }

  function finish() {
    const finalText = lastCheck?.text ?? submittedText ?? essay
    const words = countWords(finalText)
    const aiRange = lastCheck ? aiBandRange(lastCheck.result.overallBand) : null
    const bandForScore = lastCheck?.result.overallBand ?? selfBand
    const levelName = (band: number) => LEVEL_LABELS[levelIndexForBand(band, bands)]
    const summary =
      display === 'labels' && bandForScore !== null
        ? { vi: VI_SUMMARY.level(words, levelName(bandForScore).vi), en: EN_SUMMARY.level(words, levelName(bandForScore).en) }
        : aiRange
          ? { vi: VI_SUMMARY.ai(words, aiRange.low, aiRange.high), en: EN_SUMMARY.ai(words, aiRange.low, aiRange.high) }
          : selfBand !== null
            ? { vi: VI_SUMMARY.self(words, selfBand), en: EN_SUMMARY.self(words, selfBand) }
            : undefined
    const band =
      display === 'numbers' ? (aiRange ?? (selfBand !== null ? { low: Math.max(0, selfBand - 0.5), high: selfBand + 0.5 } : undefined)) : undefined
    const minutes = Math.max(1, Math.round((initial.elapsedSeconds + (Date.now() - sessionStart.current) / 1000) / 60))
    // Writing không chấm đúng/sai -> correct/total = 0/0 (đúng hợp đồng của trình học)
    onComplete({ correct: 0, total: 0, band, summary, minutes })
  }

  /* ---------- vẽ ---------- */
  const stepNames = [text.stepWrite, text.stepSelfCheck, text.stepSamples, text.stepAi]
  const submitted = submittedText ?? essay
  const submittedMeta = text.wordCountLine(countWords(submitted), splitParagraphs(submitted).length)
  const changes = lastCheck ? diffStats(diffWords(lastCheck.text, essay)) : null
  const canRecheck = !!lastCheck && essay.trim() !== lastCheck.text && grading.status !== 'loading'

  return (
    <div className="writing-task" ref={topRef}>
      <header className="writing-task__header">
        <div className="writing-task__heading">
          <span className="writing-task__eyebrow">
            <Icon name="learn" size={16} /> Writing · {text.taskLabel(task.taskNumber)}
          </span>
          <h1 className="writing-task__title">{pick(lesson.title)}</h1>
        </div>
        <Stepper variant="numbered" current={STAGES.indexOf(stage)} steps={stepNames} className="writing-task__stepper" />
      </header>

      {/* ---------------- 1. VIẾT ---------------- */}
      {stage === 'write' && (
        <div className="writing-task__split">
          <aside className="writing-task__side writing-task__panel">
            <TaskBrief lesson={lesson} task={task} />
          </aside>
          <section className="writing-task__main writing-task__paper">
            <WritingEditor
              value={essay}
              onChange={changeEssay}
              minWords={task.minWords}
              suggestedMinutes={task.suggestedMinutes}
              saveState={draftState}
              onSubmitShortcut={() => submitWriting()}
              autoFocus
            />
          </section>
        </div>
      )}

      {/* ---------------- 2. TỰ CHẤM ---------------- */}
      {stage === 'self-check' && (
        <div className="writing-task__split">
          <aside className="writing-task__side writing-task__panel">
            <h2 className="writing-task__panel-title">{text.yourAnswer}</h2>
            <LabelledEssay essay={submitted} kind={kind} meta={submittedMeta} />
          </aside>
          <section className="writing-task__main">
            <h2 className="writing-task__section-title">{text.selfCheckTitle}</h2>
            <p className="writing-task__lead">{text.selfCheckIntro}</p>
            <SelfCheckPanel
              checklist={checklist}
              answers={selfAnswers}
              onAnswer={(key, answer) => {
                setSelfAnswers((current) => ({ ...current, [key]: answer }))
                setNotice(null)
              }}
              bands={bands}
              display={display}
            />
          </section>
        </div>
      )}

      {/* ---------------- 3. SO BÀI MẪU ---------------- */}
      {stage === 'samples' &&
        (!guess.done ? (
          <div className="writing-task__single">
            <GuessBandCard
              samples={samples}
              mysteryIndex={guess.mysteryIndex}
              picked={guess.picked}
              onPick={(index) => setGuess((g) => ({ ...g, picked: index }))}
              display={display}
              renderSample={(sample) => <LabelledEssay essay={sample.text} kind={kind} />}
              onContinue={() => setGuess((g) => ({ ...g, done: true }))}
              onSkip={() => setGuess((g) => ({ ...g, done: true }))}
            />
          </div>
        ) : (
          <SamplesCompare
            essay={submitted}
            meta={submittedMeta}
            samples={samples}
            kind={kind}
            display={display}
            selfBand={selfBand}
            bands={bands}
            initialIndex={guess.mysteryIndex}
          />
        ))}

      {/* ---------------- 4. AI CHẤM & SỬA ---------------- */}
      {stage === 'ai' && (
        <div className="writing-task__split writing-task__split--ai">
          <section className="writing-task__main writing-task__paper">
            <WritingEditor
              value={essay}
              onChange={changeEssay}
              minWords={task.minWords}
              suggestedMinutes={task.suggestedMinutes}
              saveState={draftState}
              label={text.reviseTitle}
              hint={text.reviseIntro}
              showTimer={false}
              minHeight={360}
            />
          </section>
          <aside className="writing-task__side writing-task__side--right">
            {grading.status === 'done' && lastCheck ? (
              <div className="writing-task__panel">
                {checks.length > 1 && (
                  <div className="writing-task__checks" aria-label={text.checksHistory}>
                    {checks.map((check, index) => {
                      const range = aiBandRange(check.result.overallBand)
                      return (
                        <span key={check.at} className={`writing-task__check${index === checks.length - 1 ? ' is-current' : ''}`}>
                          {text.checkN(index + 1)} ·{' '}
                          {display === 'numbers'
                            ? `${formatBand(range.low)}–${formatBand(range.high)}`
                            : LEVEL_LABELS[levelIndexForBand(check.result.overallBand, bands)][language]}
                        </span>
                      )
                    })}
                  </div>
                )}
                <Tabs
                  items={[
                    { id: 'feedback', label: text.tabFeedback },
                    {
                      id: 'changes',
                      label: (
                        <>
                          {text.tabChanges}
                          {changes && (changes.added > 0 || changes.removed > 0) && (
                            <span className="writing-task__diff-count">{text.changesCount(changes.added, changes.removed)}</span>
                          )}
                        </>
                      ),
                    },
                  ]}
                  value={feedbackTab}
                  onChange={setFeedbackTab}
                  label={text.feedbackTabsLabel}
                  idPrefix="writing-feedback"
                  variant="pill"
                />
                <div className="writing-task__tab-panel" role="tabpanel" id={`writing-feedback-panel-${feedbackTab}`} aria-labelledby={`writing-feedback-tab-${feedbackTab}`}>
                  {feedbackTab === 'feedback' ? (
                    <AiResultView result={lastCheck.result} display={display} bands={bands} selfBand={selfBand} criteria={criteria} />
                  ) : (
                    <DraftChanges before={lastCheck.text} after={essay} />
                  )}
                </div>
              </div>
            ) : (
              <AiStatusCard
                status={grading.status === 'done' ? 'idle' : grading.status}
                error={grading.error}
                startedAt={grading.startedAt}
                expectedSeconds={25}
                onGrade={() => void grade()}
                onCancel={grading.cancel}
                privacyNote={text.aiPrivacyWriting}
                intro={display === 'numbers' ? text.aiIntro : text.aiIntroLabels}
              />
            )}
            {grading.status === 'error' && lastCheck && (
              <p className="writing-task__note">{text.aiSelfStillStands}</p>
            )}
          </aside>
        </div>
      )}

      {/* ---------------- THANH ĐÁY: 1 nút chính + 1 nút phụ ---------------- */}
      <footer className="writing-task__actions">
        <div className="writing-task__actions-inner">
          {stage === 'write' && (
            <>
              <span className="writing-task__actions-note">
                {confirmShort ? (
                  <span className="writing-task__warn">{text.underMin(task.minWords - countWords(essay))}</span>
                ) : notice ? (
                  <span className="writing-task__warn">{notice}</span>
                ) : (
                  <>
                    <Kbd>{text.shortcutSubmit}</Kbd>
                  </>
                )}
              </span>
              {confirmShort ? (
                <>
                  <Button variant="secondary" onClick={() => setConfirmShort(false)}>
                    {text.keepWriting}
                  </Button>
                  <Button variant="primary" onClick={() => submitWriting(true)}>
                    {text.submitAnyway}
                  </Button>
                </>
              ) : (
                <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => submitWriting()}>
                  {text.submitWrite}
                </Button>
              )}
            </>
          )}

          {stage === 'self-check' && (
            <>
              <Button variant="secondary" onClick={() => goTo('write')}>
                {text.backToEdit}
              </Button>
              <span className="writing-task__actions-note">
                {notice ? <span className="writing-task__warn">{notice}</span> : selfScore.answered < selfScore.total ? text.questionsLeft(selfScore.total - selfScore.answered) : text.allAnswered}
              </span>
              <Button variant="primary" size="lg" iconRight="arrow-right" onClick={toSamples} disabled={selfBand === null}>
                {text.toSamples}
              </Button>
            </>
          )}

          {stage === 'samples' && (
            <>
              <Button variant="secondary" onClick={finish}>
                {text.finishNoAi}
              </Button>
              <span className="writing-task__actions-note">{text.aiNotNeeded}</span>
              <Button variant="primary" size="lg" iconLeft="sparkle" onClick={() => void grade()}>
                {text.toAi}
              </Button>
            </>
          )}

          {stage === 'ai' && (
            <>
              {lastCheck ? (
                <Button variant="secondary" iconLeft="retry" onClick={() => void grade()} disabled={!canRecheck}>
                  {text.aiRegrade}
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => goTo('samples')}>
                  {text.stepSamples}
                </Button>
              )}
              <span className="writing-task__actions-note">{lastCheck ? text.finishHint : text.aiNotNeeded}</span>
              <Button variant="primary" size="lg" iconRight="check" onClick={finish} disabled={grading.status === 'loading'}>
                {text.finish}
              </Button>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

/* ============================================================================
 * Bước 3b: bài mình | bài mẫu (tab theo band)
 * ========================================================================== */

function SamplesCompare({
  essay,
  meta,
  samples,
  kind,
  display,
  selfBand,
  bands,
  initialIndex,
}: {
  essay: string
  meta: string
  samples: ReturnType<typeof sortedSamples>
  kind: ReturnType<typeof writingKindOf>
  display: ReturnType<typeof bandDisplayFor>
  selfBand: number | null
  bands: number[]
  initialIndex: number
}) {
  const text = useWritingText()
  const { language } = useLanguage()
  // mở sẵn bài mẫu gần band tự chấm nhất (so với "người ngang mình" trước)
  const nearest = selfBand === null ? initialIndex : levelIndexForBand(selfBand, bands)
  const [index, setIndex] = useState(Math.min(nearest, samples.length - 1))
  const labelOf = (i: number) => (display === 'numbers' ? formatBand(parseFloat(samples[i].band)) : LEVEL_LABELS[Math.min(i, 2)][language])
  const sample = samples[index]

  return (
    <div className="writing-task__compare">
      <div className="writing-task__compare-intro">
        <h2 className="writing-task__section-title">{text.compareTitle}</h2>
        <p className="writing-task__lead">{text.compareIntro}</p>
      </div>
      <div className="writing-task__split writing-task__split--even">
        <section className="writing-task__panel writing-task__panel--mine">
          <h3 className="writing-task__panel-title">
            {text.yourAnswer}
            {selfBand !== null && (
              <span className="writing-task__panel-badge">
                {display === 'numbers' ? `${text.selfBandTitle} ${formatBand(selfBand)}` : LEVEL_LABELS[levelIndexForBand(selfBand, bands)][language]}
              </span>
            )}
          </h3>
          <LabelledEssay essay={essay} kind={kind} meta={meta} />
        </section>
        <section className="writing-task__panel">
          <Tabs
            items={samples.map((_, i) => ({ id: String(i), label: text.sampleTab(labelOf(i)) }))}
            value={String(index)}
            onChange={(id) => setIndex(Number(id))}
            label={text.samplesTabsLabel}
            idPrefix="writing-samples"
            variant="pill"
          />
          {sample && (
            <div className="writing-task__sample" role="tabpanel" id={`writing-samples-panel-${index}`} aria-labelledby={`writing-samples-tab-${index}`}>
              <LabelledEssay essay={sample.text} kind={kind} meta={text.wordCountLine(countWords(sample.text), splitParagraphs(sample.text).length)} />
              <div className="writing-task__notes">
                <h4>{text.examinerNotes}</h4>
                <SampleNotes notes={sample.notesVi} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

/* Câu tóm tắt cho màn kết quả của trình học (song ngữ, không phụ thuộc ngôn ngữ đang chọn) */
const VI_SUMMARY = {
  self: (words: number, band: number) => `Bạn viết ${words} từ, tự chấm khoảng ${formatBand(band)}.`,
  ai: (words: number, low: number, high: number) => `Bạn viết ${words} từ, AI ước tính band ${formatBand(low)}–${formatBand(high)}.`,
  level: (words: number, level: string) => `Bạn viết ${words} từ, mức ước tính: ${level}.`,
}
const EN_SUMMARY = {
  self: (words: number, band: number) => `You wrote ${words} words and estimated about ${formatBand(band)}.`,
  ai: (words: number, low: number, high: number) => `You wrote ${words} words; the AI estimated band ${formatBand(low)}–${formatBand(high)}.`,
  level: (words: number, level: string) => `You wrote ${words} words; estimated level: ${level}.`,
}
