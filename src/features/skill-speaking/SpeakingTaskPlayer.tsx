/**
 * SpeakingTaskPlayer.tsx — TRÌNH LUYỆN NÓI (lesson.mode = 'speaking', dữ liệu lesson.speakingTask)
 * ----------------------------------------------------------------------------
 * Được trình học mở sau phần bài tập khởi động (đăng ký ở register-skill-tasks.ts). 4 bước:
 *
 *   1. NÓI          xin micro (MicGate) -> Part 1/3: từng câu hỏi + máy ghi âm
 *                   Part 2: cue card 3 pha Sẵn sàng → Chuẩn bị 1:00 (ô ghi chú) → Nói 2:00 → Xong + tự kiểm tra
 *                   Bài thi thử: tách theo nhãn "Part 1/2/3:", có màn mở đầu từng Part
 *                   Cột phải: cụm từ hữu ích (bấm nghe), âm cần chú ý, dòng riêng tư
 *   2. TỰ CHẤM      nghe lại bản ghi | checklist FC, LR, GRA, P -> band tự chấm
 *   3. SO MẪU & LUYỆN ÂM  đoán band bài mẫu -> bản ghi của mình | bài mẫu (đọc + nghe giọng máy phần "A:")
 *                   tab "Luyện âm mục tiêu": tô màu từng từ 3 mức (pronunciation-check.ts)
 *   4. AI CHẤM      (tuỳ chọn) gửi các bản ghi tới /api/ai/grade-speaking -> band ±0.5, ưu điểm trước
 *
 * Riêng tư (psych-adult D9 luật 38): bản ghi chỉ nằm trong bộ nhớ trình duyệt, KHÔNG lưu vào resume,
 * chỉ gửi đi khi người học bấm "Chấm bằng AI" (có dòng chữ nhỏ nói rõ).
 * Resume lưu: bước, Part/câu đang làm, ghi chú cue card, ô tự kiểm tra, tự chấm, kết quả AI.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../../design-system/components/Button'
import { Icon } from '../../design-system/components/Icon'
import { Stepper } from '../../design-system/components/Stepper'
import { Tabs } from '../../design-system/components/Tabs'
import { useProgress } from '../../learning-progress/progress-store'
import { api } from '../../services/api-client'
import { speak } from '../../services/text-to-speech'
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
} from '../skill-writing/band-scale'
import { AiResultView } from '../skill-writing/feedback/AiResultView'
import { AiStatusCard } from '../skill-writing/feedback/AiStatusCard'
import { GuessBandCard } from '../skill-writing/feedback/GuessBandCard'
import { DEFAULT_SPEAKING_CHECKLIST, SelfCheckPanel, type ChecklistGroup } from '../skill-writing/feedback/SelfCheckPanel'
import { useAiGrading, type AiGradingResultV3 } from '../skill-writing/feedback/use-ai-grading'
import { useWritingText } from '../skill-writing/skill-writing-text'
import { CueCardStage, type CuePhase } from './CueCardStage'
import { MicGate } from './MicGate'
import { PronunciationDrill } from './PronunciationDrill'
import { QuestionFlowStage } from './QuestionFlowStage'
import { useSpeakingText } from './skill-speaking-text'
import { answerKey, buildSpeakingSections, sectionQuestions } from './speaking-plan'
import { MyRecordingsList, SampleTranscript, SpeakingCompare } from './SpeakingSamples'
import type { RecordingTake } from './SpeakingRecorder'
import { useMicrophone } from './use-microphone'
import '../skill-writing/feedback/feedback.css'
import './SpeakingTaskPlayer.css'

type Stage = 'speak' | 'self-check' | 'samples' | 'ai'
const STAGES: Stage[] = ['speak', 'self-check', 'samples', 'ai']

interface SavedAiResult {
  result: AiGradingResultV3
  sent: number
  total: number
  at: string
}

interface SpeakingResumeState {
  v: 1
  stage: Stage
  sectionIndex: number
  questionIndex: number
  introSeen: number[]
  cuePhase: CuePhase
  notes: Record<string, string>
  quickChecks: Record<string, boolean[]>
  selfAnswers: Record<string, SelfCheckAnswer>
  guess: { mysteryIndex: number; picked: number | null; done: boolean }
  reviewTab: 'samples' | 'drill'
  ai: SavedAiResult | null
  elapsedSeconds: number
}

/** Giới hạn dung lượng gửi AI 1 lần (máy chủ nhận tối đa 14 triệu ký tự base64 ≈ 5 phút WAV 16kHz). */
const AI_BASE64_BUDGET = 13_000_000

function readResume(data: unknown, sectionCount: number, sampleCount: number): SpeakingResumeState | null {
  const state = data as Partial<SpeakingResumeState> | null
  if (!state || state.v !== 1 || !STAGES.includes(state.stage as Stage)) return null
  const sectionIndex = Math.min(Math.max(0, state.sectionIndex ?? 0), sectionCount - 1)
  return {
    v: 1,
    stage: state.stage as Stage,
    sectionIndex,
    questionIndex: Math.max(0, state.questionIndex ?? 0),
    introSeen: state.introSeen ?? [],
    // đồng hồ chuẩn bị / nói không chạy tiếp được sau khi tải lại -> quay về "Sẵn sàng"
    cuePhase: state.cuePhase === 'done' ? 'done' : 'ready',
    notes: state.notes ?? {},
    quickChecks: state.quickChecks ?? {},
    selfAnswers: state.selfAnswers ?? {},
    guess: state.guess && state.guess.mysteryIndex < sampleCount ? state.guess : { mysteryIndex: 0, picked: null, done: false },
    reviewTab: state.reviewTab === 'drill' ? 'drill' : 'samples',
    ai: state.ai ?? null,
    elapsedSeconds: state.elapsedSeconds ?? 0,
  }
}

export default function SpeakingTaskPlayer({ lesson, resumeData, onSaveResume, onComplete }: SkillTaskProps) {
  const task = lesson.speakingTask!
  const text = useSpeakingText()
  const writingText = useWritingText()
  const { pick } = useLanguage()
  const { progress, updateBandEstimate } = useProgress()
  const mic = useMicrophone()

  /* ---------- dữ liệu cố định ---------- */
  const sections = useMemo(() => buildSpeakingSections(task), [task])
  const isMock = sections.length > 1
  const samples = useMemo(() => sortedSamples(task.bandSamples ?? []), [task])
  const bands = useMemo(() => sampleBands(task.bandSamples ?? []), [task])
  const display = bandDisplayFor(lesson.id, progress.profile.track)
  const checklist: ChecklistGroup[] = task.checklist?.length ? task.checklist : DEFAULT_SPEAKING_CHECKLIST
  const criteria: CriterionCode[] = checklist.map((group) => group.criterion)

  /* ---------- trạng thái ---------- */
  const initial = useMemo(
    () =>
      readResume(resumeData, sections.length, samples.length) ?? {
        v: 1 as const,
        stage: 'speak' as Stage,
        sectionIndex: 0,
        questionIndex: 0,
        introSeen: [],
        cuePhase: 'ready' as CuePhase,
        notes: {},
        quickChecks: {},
        selfAnswers: {},
        guess: { mysteryIndex: Math.floor(Math.random() * Math.max(1, samples.length)), picked: null, done: samples.length === 0 },
        reviewTab: 'samples' as const,
        ai: null,
        elapsedSeconds: 0,
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  const [stage, setStage] = useState<Stage>(initial.stage)
  const [sectionIndex, setSectionIndex] = useState(initial.sectionIndex)
  const [questionIndex, setQuestionIndex] = useState(initial.questionIndex)
  const [introSeen, setIntroSeen] = useState<number[]>(initial.introSeen)
  const [cuePhase, setCuePhaseState] = useState<CuePhase>(initial.cuePhase)
  const [cuePhaseStartedAt, setCuePhaseStartedAt] = useState(() => Date.now())
  const [notes, setNotes] = useState(initial.notes)
  const [quickChecks, setQuickChecks] = useState(initial.quickChecks)
  const [selfAnswers, setSelfAnswers] = useState(initial.selfAnswers)
  const [guess, setGuess] = useState(initial.guess)
  const [reviewTab, setReviewTab] = useState<'samples' | 'drill'>(initial.reviewTab)
  const [aiSaved, setAiSaved] = useState<SavedAiResult | null>(initial.ai)
  const [takes, setTakes] = useState<Record<string, RecordingTake>>({})
  const [isRecording, setIsRecording] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const sessionStart = useRef(Date.now())
  const grading = useAiGrading<AiGradingResultV3>()
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initial.ai) grading.markDone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setCuePhase(phase: CuePhase) {
    setCuePhaseState(phase)
    setCuePhaseStartedAt(Date.now())
  }

  /* ---------- lưu resume ---------- */
  useEffect(() => {
    const state: SpeakingResumeState = {
      v: 1,
      stage,
      sectionIndex,
      questionIndex,
      introSeen,
      cuePhase,
      notes,
      quickChecks,
      selfAnswers,
      guess,
      reviewTab,
      ai: aiSaved,
      elapsedSeconds: initial.elapsedSeconds + Math.round((Date.now() - sessionStart.current) / 1000),
    }
    onSaveResume(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, sectionIndex, questionIndex, introSeen, cuePhase, notes, quickChecks, selfAnswers, guess, reviewTab, aiSaved])

  /* ---------- tự chấm ---------- */
  const selfScore = selfBandFromChecklist(checklist, selfAnswers, bands)
  const selfBand = selfScore.overall

  /* ---------- điều hướng ---------- */
  const section = sections[sectionIndex]
  const showIntro = isMock && stage === 'speak' && !introSeen.includes(sectionIndex)
  const isLastQuestion = section.kind === 'cue-card' || questionIndex >= section.questions.length - 1
  const isLastSection = sectionIndex >= sections.length - 1

  function goTo(next: Stage) {
    setStage(next)
    setNotice(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function nextStep() {
    if (section.kind === 'questions' && questionIndex < section.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
      return
    }
    if (!isLastSection) {
      setSectionIndex(sectionIndex + 1)
      setQuestionIndex(0)
      setCuePhase('ready')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    goTo('self-check')
  }

  function toSamples() {
    if (selfBand === null) {
      setNotice(writingText.questionsLeft(selfScore.total - selfScore.answered))
      return
    }
    goTo('samples')
  }

  /* ---------- AI chấm ---------- */
  const recordedAnswers = useMemo(
    () =>
      sections.flatMap((s, sIndex) =>
        sectionQuestions(s).flatMap((question, qIndex) => {
          const take = takes[answerKey(sIndex, qIndex)]
          return take ? [{ question: s.kind === 'cue-card' ? `Part 2 cue card: ${s.topic} ${s.points.join('; ')}` : question, take, part: s.part, order: sIndex * 100 + qIndex }] : []
        }),
      ),
    [sections, takes],
  )

  async function grade() {
    if (stage !== 'ai') goTo('ai')
    if (recordedAnswers.length === 0) {
      setNotice(text.aiNeedsRecording)
      return
    }
    // Ưu tiên Part 2, rồi Part 3, rồi Part 1 cho tới khi đầy giới hạn dung lượng; gửi theo thứ tự thi
    const priority = [...recordedAnswers].sort((a, b) => [2, 3, 1].indexOf(a.part) - [2, 3, 1].indexOf(b.part) || a.order - b.order)
    let budget = AI_BASE64_BUDGET
    const chosen = priority.filter((answer) => {
      if (answer.take.base64Wav.length > budget) return false
      budget -= answer.take.base64Wav.length
      return true
    })
    if (chosen.length === 0) {
      setNotice(writingText.aiErrorTooLong)
      return
    }
    chosen.sort((a, b) => a.order - b.order)
    const result = await grading.run(() =>
      api
        .gradeSpeaking({
          context: display === 'numbers' ? 'ielts' : 'lesson',
          partLabel: isMock ? 'Full mock test (Part 1, 2, 3)' : `Part ${task.part}`,
          targetBand: `${formatBand(bands[0])} – ${formatBand(bands[bands.length - 1])}`,
          answers: chosen.map((answer) => ({ question: answer.question, audioBase64: answer.take.base64Wav, mimeType: answer.take.mimeType })),
        })
        .then((response) => response.result as AiGradingResultV3),
    )
    if (!result) return
    setAiSaved({ result, sent: chosen.length, total: recordedAnswers.length, at: new Date().toISOString() })
    // band ước tính Speaking: chưa có lịch sử -> độ tin cậy thấp; đã có -> trung bình với ước tính cũ
    const range = aiBandRange(result.overallBand)
    const previous = progress.bandEstimates.speaking
    if (previous) {
      updateBandEstimate('speaking', roundToHalfBand((previous.low + range.low) / 2), roundToHalfBand((previous.high + range.high) / 2), 'medium')
    } else {
      updateBandEstimate('speaking', range.low, range.high, 'low')
    }
  }

  function finish() {
    const aiRange = aiSaved ? aiBandRange(aiSaved.result.overallBand) : null
    const bandForLevel = aiSaved?.result.overallBand ?? selfBand
    const answered = recordedAnswers.length
    const totalQuestions = sections.reduce((sum, s) => sum + sectionQuestions(s).length, 0)
    const level = bandForLevel === null ? null : LEVEL_LABELS[levelIndexForBand(bandForLevel, bands)]
    const summary =
      display === 'labels' && level
        ? { vi: `Bạn đã nói ${answered}/${totalQuestions} câu, mức ước tính: ${level.vi}.`, en: `You answered ${answered}/${totalQuestions}; estimated level: ${level.en}.` }
        : aiRange
          ? {
              vi: `Bạn đã nói ${answered}/${totalQuestions} câu, AI ước tính band ${formatBand(aiRange.low)}–${formatBand(aiRange.high)}.`,
              en: `You answered ${answered}/${totalQuestions}; the AI estimated band ${formatBand(aiRange.low)}–${formatBand(aiRange.high)}.`,
            }
          : selfBand !== null
            ? { vi: `Bạn đã nói ${answered}/${totalQuestions} câu, tự chấm khoảng ${formatBand(selfBand)}.`, en: `You answered ${answered}/${totalQuestions} and estimated about ${formatBand(selfBand)}.` }
            : undefined
    const band = display === 'numbers' ? (aiRange ?? (selfBand !== null ? { low: Math.max(0, selfBand - 0.5), high: selfBand + 0.5 } : undefined)) : undefined
    const minutes = Math.max(1, Math.round((initial.elapsedSeconds + (Date.now() - sessionStart.current) / 1000) / 60))
    onComplete({ correct: 0, total: 0, band, summary, minutes })
  }

  /* ---------- vẽ ---------- */
  const stepNames = [text.stepSpeak, text.stepSelfCheck, text.stepSamples, text.stepAi]
  const micBlocking = mic.state !== 'ready' && !mic.useWithoutMic
  const cueNotesKey = String(sectionIndex)

  return (
    <div className="speaking-task" ref={topRef}>
      <header className="speaking-task__header">
        <div className="speaking-task__heading">
          <span className="speaking-task__eyebrow">
            <Icon name="volume" size={16} /> Speaking · {isMock ? text.mockLabel : text.partLabel(task.part)}
          </span>
          <h1 className="speaking-task__title">{pick(lesson.title)}</h1>
        </div>
        <Stepper variant="numbered" current={STAGES.indexOf(stage)} steps={stepNames} className="speaking-task__stepper" />
      </header>

      {/* ---------------- 1. NÓI ---------------- */}
      {stage === 'speak' && (
        <div className="speaking-task__split">
          <section className="speaking-task__main">
            <MicGate mic={mic}>
              {showIntro ? (
                <SectionIntro sections={sections} current={sectionIndex} />
              ) : section.kind === 'questions' ? (
                <QuestionFlowStage
                  section={section}
                  sectionIndex={sectionIndex}
                  questionIndex={questionIndex}
                  onJump={setQuestionIndex}
                  takes={takes}
                  onTake={(key, take) => setTakes((current) => ({ ...current, [key]: take }))}
                  mic={mic}
                  onRecordingChange={setIsRecording}
                />
              ) : (
                <CueCardStage
                  section={section}
                  phase={cuePhase}
                  phaseStartedAt={cuePhaseStartedAt}
                  onPhase={setCuePhase}
                  notes={notes[cueNotesKey] ?? ''}
                  onNotes={(value) => setNotes((current) => ({ ...current, [cueNotesKey]: value }))}
                  take={takes[answerKey(sectionIndex, 0)] ?? null}
                  onTake={(take) => setTakes((current) => ({ ...current, [answerKey(sectionIndex, 0)]: take }))}
                  mic={mic}
                  onRecordingChange={setIsRecording}
                  quickChecks={quickChecks[cueNotesKey] ?? []}
                  onQuickCheck={(index, value) =>
                    setQuickChecks((current) => {
                      const list = [...(current[cueNotesKey] ?? [])]
                      list[index] = value
                      return { ...current, [cueNotesKey]: list }
                    })
                  }
                />
              )}
            </MicGate>
            {/* riêng tư mặc định (psych-adult D9 luật 38): luôn nói rõ ngay dưới chỗ ghi âm */}
            {!micBlocking && (
              <p className="speaking-task__privacy speaking-task__privacy--main">
                <Icon name="lock" size={14} /> {text.privacyShort}
              </p>
            )}
          </section>
          <aside className="speaking-task__side">
            {isMock && <PartsProgress sections={sections} current={sectionIndex} />}
            {task.usefulPhrases && task.usefulPhrases.length > 0 && (
              <div className="speaking-task__panel speaking-task__panel--soft">
                <h3 className="speaking-task__side-title">{text.phrasesTitle}</h3>
                <p className="speaking-task__side-hint">{text.phrasesHint}</p>
                <div className="speaking-task__phrases" lang="en">
                  {task.usefulPhrases.map((phrase) => (
                    <button key={phrase} type="button" className="speaking-task__phrase" onClick={() => void speak(phrase)}>
                      <Icon name="volume" size={14} />
                      <span>{phrase}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {task.targetSounds && task.targetSounds.length > 0 && (
              <div className="speaking-task__panel speaking-task__panel--soft">
                <h3 className="speaking-task__side-title">{text.drillTargets}</h3>
                <ul className="speaking-task__sounds" lang="en">
                  {task.targetSounds.map((sound) => (
                    <li key={sound}>{sound}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* ---------------- 2. TỰ CHẤM ---------------- */}
      {stage === 'self-check' && (
        <div className="speaking-task__split speaking-task__split--wide-side">
          <aside className="speaking-task__panel speaking-task__sticky">
            <h2 className="speaking-task__panel-title">{text.yourRecordings}</h2>
            <MyRecordingsList sections={sections} takes={takes} />
            {Object.keys(takes).length === 0 && <p className="speaking-task__note">{text.notKeptOnReload}</p>}
          </aside>
          <section className="speaking-task__main">
            <h2 className="speaking-task__section-title">{writingText.selfCheckTitle}</h2>
            <p className="speaking-task__lead">{text.selfCheckIntro}</p>
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

      {/* ---------------- 3. BÀI MẪU + LUYỆN ÂM ---------------- */}
      {stage === 'samples' && (
        <div className="speaking-task__review">
          <Tabs
            items={[
              { id: 'samples', label: text.tabSamples },
              { id: 'drill', label: text.tabDrill },
            ]}
            value={reviewTab}
            onChange={setReviewTab}
            label={text.stageTabsLabel}
            idPrefix="speaking-review"
          />
          <div className="speaking-task__review-panel" role="tabpanel" id={`speaking-review-panel-${reviewTab}`} aria-labelledby={`speaking-review-tab-${reviewTab}`}>
            {reviewTab === 'drill' ? (
              <div className="speaking-task__single">
                <MicGate mic={mic}>
                  <PronunciationDrill task={task} mic={mic} />
                </MicGate>
              </div>
            ) : !guess.done ? (
              <div className="speaking-task__single">
                <GuessBandCard
                  samples={samples}
                  mysteryIndex={guess.mysteryIndex}
                  picked={guess.picked}
                  onPick={(index) => setGuess((g) => ({ ...g, picked: index }))}
                  display={display}
                  renderSample={(sample) => <SampleTranscript text={sample.text} />}
                  onContinue={() => setGuess((g) => ({ ...g, done: true }))}
                  onSkip={() => setGuess((g) => ({ ...g, done: true }))}
                />
              </div>
            ) : (
              <SpeakingCompare sections={sections} takes={takes} samples={samples} display={display} bands={bands} selfBand={selfBand} initialIndex={guess.mysteryIndex} />
            )}
          </div>
        </div>
      )}

      {/* ---------------- 4. AI ---------------- */}
      {stage === 'ai' && (
        <div className="speaking-task__single speaking-task__ai">
          {notice && grading.status !== 'loading' && <p className="speaking-task__notice">{notice}</p>}
          {grading.status === 'done' && aiSaved ? (
            <>
              {aiSaved.sent < aiSaved.total && <p className="speaking-task__note">{text.aiPartial(aiSaved.sent, aiSaved.total)}</p>}
              <AiResultView result={aiSaved.result} display={display} bands={bands} selfBand={selfBand} criteria={criteria} />
            </>
          ) : (
            <AiStatusCard
              status={grading.status === 'done' ? 'idle' : grading.status}
              error={grading.error}
              startedAt={grading.startedAt}
              expectedSeconds={40}
              onGrade={() => void grade()}
              onCancel={grading.cancel}
              privacyNote={text.privacyAi}
              intro={display === 'numbers' ? text.aiIntro : text.aiIntroLabels}
              loadingTitle={text.aiLoading}
              loadingHint={text.aiLoadingHint}
            />
          )}
        </div>
      )}

      {/* ---------------- THANH ĐÁY ---------------- */}
      <footer className="speaking-task__actions">
        <div className="speaking-task__actions-inner">
          {stage === 'speak' && (
            <SpeakActions
              micBlocking={micBlocking}
              showIntro={showIntro}
              sectionPart={section.part}
              isCue={section.kind === 'cue-card'}
              cuePhase={cuePhase}
              isRecording={isRecording}
              hasMic={mic.state === 'ready'}
              questionIndex={questionIndex}
              isLastQuestion={isLastQuestion}
              isLastSection={isLastSection}
              nextPart={sections[sectionIndex + 1]?.part}
              onStartSection={() => setIntroSeen((seen) => [...seen, sectionIndex])}
              onCuePhase={setCuePhase}
              onPrevious={() => setQuestionIndex(Math.max(0, questionIndex - 1))}
              onNext={nextStep}
            />
          )}

          {stage === 'self-check' && (
            <>
              <Button variant="secondary" iconLeft="retry" onClick={() => goTo('speak')}>
                {text.backToSpeak}
              </Button>
              <span className="speaking-task__actions-note">
                {notice ? <span className="speaking-task__warn">{notice}</span> : selfScore.answered < selfScore.total ? writingText.questionsLeft(selfScore.total - selfScore.answered) : writingText.allAnswered}
              </span>
              <Button variant="primary" size="lg" iconRight="arrow-right" onClick={toSamples} disabled={selfBand === null}>
                {writingText.toSamples}
              </Button>
            </>
          )}

          {stage === 'samples' && (
            <>
              <Button variant="secondary" onClick={finish}>
                {writingText.finishNoAi}
              </Button>
              <span className="speaking-task__actions-note">{writingText.aiNotNeeded}</span>
              <Button variant="primary" size="lg" iconLeft="sparkle" onClick={() => void grade()}>
                {writingText.toAi}
              </Button>
            </>
          )}

          {stage === 'ai' && (
            <>
              {aiSaved ? (
                <Button variant="secondary" iconLeft="retry" onClick={() => void grade()} disabled={grading.status === 'loading' || recordedAnswers.length === 0}>
                  {text.regrade}
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => goTo('samples')}>
                  {text.stepSamples}
                </Button>
              )}
              <span className="speaking-task__actions-note">{aiSaved ? writingText.finishHint : writingText.aiNotNeeded}</span>
              <Button variant="primary" size="lg" iconRight="check" onClick={finish} disabled={grading.status === 'loading'}>
                {writingText.finish}
              </Button>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

/* ============================================================================
 * Các mảnh nhỏ
 * ========================================================================== */

/** Thanh đáy của bước Nói — đổi theo Part / pha cue card. */
function SpeakActions(props: {
  micBlocking: boolean
  showIntro: boolean
  sectionPart: 1 | 2 | 3
  isCue: boolean
  cuePhase: CuePhase
  isRecording: boolean
  hasMic: boolean
  questionIndex: number
  isLastQuestion: boolean
  isLastSection: boolean
  nextPart: 1 | 2 | 3 | undefined
  onStartSection: () => void
  onCuePhase: (phase: CuePhase) => void
  onPrevious: () => void
  onNext: () => void
}) {
  const text = useSpeakingText()
  const writingText = useWritingText()
  const nextLabel = !props.isLastQuestion
    ? text.nextQuestion
    : !props.isLastSection
      ? text.startSection(props.nextPart ?? props.sectionPart + 1)
      : writingText.stepSelfCheck

  if (props.micBlocking) return <span className="speaking-task__actions-note">{text.micExplain}</span>

  if (props.showIntro) {
    return (
      <>
        <span className="speaking-task__actions-note" />
        <Button variant="primary" size="lg" iconRight="arrow-right" onClick={props.onStartSection}>
          {text.startSection(props.sectionPart)}
        </Button>
      </>
    )
  }

  if (props.isCue) {
    if (props.cuePhase === 'ready')
      return (
        <>
          <span className="speaking-task__actions-note" />
          <Button variant="primary" size="lg" iconLeft="clock" onClick={() => props.onCuePhase('prepare')}>
            {text.startPrepare}
          </Button>
        </>
      )
    if (props.cuePhase === 'prepare')
      return (
        <>
          <span className="speaking-task__actions-note" />
          <Button variant="primary" size="lg" iconRight="arrow-right" onClick={() => props.onCuePhase('speak')}>
            {text.startSpeaking}
          </Button>
        </>
      )
    if (props.cuePhase === 'speak')
      return props.hasMic ? (
        <span className="speaking-task__actions-note">
          {text.speakAimHint} · {text.keyHint}
        </span>
      ) : (
        <>
          <span className="speaking-task__actions-note">{text.noMicMode}</span>
          <Button variant="primary" size="lg" onClick={() => props.onCuePhase('done')}>
            {text.phaseDone}
          </Button>
        </>
      )
    return (
      <>
        <Button variant="secondary" iconLeft="retry" onClick={() => props.onCuePhase('ready')}>
          {text.redoCueCard}
        </Button>
        <span className="speaking-task__actions-note" />
        <Button variant="primary" size="lg" iconRight="arrow-right" onClick={props.onNext}>
          {nextLabel}
        </Button>
      </>
    )
  }

  return (
    <>
      {props.questionIndex > 0 ? (
        <Button variant="secondary" iconLeft="chevron-right" className="speaking-task__prev" onClick={props.onPrevious} disabled={props.isRecording}>
          {text.previousQuestion}
        </Button>
      ) : (
        <span />
      )}
      <span className="speaking-task__actions-note">{props.isRecording ? text.keyHint : props.hasMic ? text.keyHint : text.noMicMode}</span>
      <Button variant="primary" size="lg" iconRight="arrow-right" onClick={props.onNext} disabled={props.isRecording}>
        {nextLabel}
      </Button>
    </>
  )
}

/** Màn mở đầu mỗi Part trong bài thi thử. */
function SectionIntro({ sections, current }: { sections: ReturnType<typeof buildSpeakingSections>; current: number }) {
  const text = useSpeakingText()
  const section = sections[current]
  const intro = section.part === 1 ? text.sectionIntroPart1 : section.part === 2 ? text.sectionIntroPart2 : text.sectionIntroPart3
  return (
    <div className="section-intro">
      <span className="section-intro__badge">{text.partLabel(section.part)}</span>
      <h2 className="section-intro__title">{intro}</h2>
      <p className="section-intro__count">
        {section.kind === 'questions' ? text.questionsCount(section.questions.length) : text.cueCard}
      </p>
    </div>
  )
}

/** Tiến độ 3 Part (bài thi thử) ở cột phải. */
function PartsProgress({ sections, current }: { sections: ReturnType<typeof buildSpeakingSections>; current: number }) {
  const text = useSpeakingText()
  return (
    <ol className="parts-progress">
      {sections.map((section, index) => (
        <li key={index} className={`parts-progress__item${index === current ? ' is-current' : ''}${index < current ? ' is-done' : ''}`}>
          <span className="parts-progress__dot">{index < current ? <Icon name="check" size={12} strokeWidth={3} /> : section.part}</span>
          <span>
            {text.partLabel(section.part)}
            <small>{section.kind === 'cue-card' ? text.cueCard : text.questionsCount(section.questions.length)}</small>
          </span>
        </li>
      ))}
    </ol>
  )
}
