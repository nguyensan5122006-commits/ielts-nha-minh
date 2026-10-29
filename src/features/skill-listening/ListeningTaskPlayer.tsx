/**
 * ListeningTaskPlayer.tsx — TRÌNH LÀM BÀI NGHE (lesson.mode = 'listening')
 * ----------------------------------------------------------------------------
 * Được trình học (lesson-player) mở qua bảng đăng ký skill-task-registry
 * (xem register-skill-tasks.ts). Nhận SkillTaskProps: lesson, resumeData, onSaveResume, onComplete.
 *
 * 3 pha:
 *   1. intro      — chọn "Luyện thoải mái" hay "Như thi thật", đọc mẹo, bấm Bắt đầu nghe.
 *   2. answering  — 2 cột: trái = trình phát + danh sách đoạn + (lời thoại còn khoá);
 *                   phải = câu hỏi chia theo đoạn ("Đoạn 2 · Câu 4–7 · Nghe lại đoạn này").
 *                   Thanh câu hỏi dưới đáy, gắn cờ, "Kiểm tra & nộp" -> màn kiểm tra trước khi nộp.
 *                   Thi thật: mỗi đoạn 1 lần, phát liền, không dừng/tua/đổi tốc độ.
 *   3. review     — chấm + ghi tiến độ (recordAnswer từng câu, band ước tính).
 *                   Trái = lời thoại có tô bằng chứng "Q3"; phải = kết quả + từng câu với
 *                   "Nghe từ đoạn này" / "Xem lời thoại" / "Giải thích". "Tiếp tục" -> onComplete.
 *                   "Làm lại câu sai" -> quay lại pha 2 chỉ với các câu sai (không ghi tiến độ lần 2).
 *
 * Phím tắt: Space phát/dừng · R nghe lại đoạn · Shift+←/→ tua 5 giây · Alt+←/→ câu trước/sau
 *           · 1–9 chọn đáp án của câu đang xem · Ctrl+Enter kiểm tra & nộp.
 * Mọi thứ người học làm đều lưu qua onSaveResume (mở lại đúng chỗ).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ExamQuestion } from '../../content/content-types'
import { useLanguage } from '../../translations/language-context'
import type { SkillTaskProps } from '../lesson-player/skill-task-registry'
import { gradeAll, isAnswered } from '../exam-ui/answer-grading'
import { EvidenceStrip } from '../exam-ui/EvidenceReview'
import { findEvidence, type EvidenceResult, type TextBlock } from '../exam-ui/evidence-finder'
import { useExamUiText, QUESTION_TYPE_NAMES } from '../exam-ui/exam-ui-text'
import { useExamDisplay } from '../exam-ui/ExamDisplaySettings'
import { ExamFrame, ModeBadge } from '../exam-ui/ExamFrame'
import { ExamQuestionList } from '../exam-ui/ExamQuestionList'
import { useLessonTaskRecorder, taskBandEstimate } from '../exam-ui/lesson-task-recording'
import { scrollMarkIntoView, type TextMark } from '../exam-ui/MarkedText'
import { buildQuestionGroups, choicesOf, answerValueFor, type QuestionGroup } from '../exam-ui/question-grouping'
import { QuestionNavigator, type NavigatorPart } from '../exam-ui/QuestionNavigator'
import { ReviewBeforeSubmit } from '../exam-ui/ReviewBeforeSubmit'
import { SplitPane } from '../exam-ui/SplitPane'
import { TaskIntro } from '../exam-ui/TaskIntro'
import { TaskResultSummary } from '../exam-ui/TaskResultSummary'
import { scrollBlockIntoView } from '../exam-ui/text-selection'
import { useTaskSession } from '../exam-ui/use-task-session'
import { ListeningAudioPanel } from './ListeningAudioPanel'
import { ListeningTranscript, lineBlockId, parseLineBlockId } from './ListeningTranscript'
import { listeningSummary, useListeningText } from './skill-listening-text'
import { formatSeconds, useListeningAudio } from './use-listening-audio'
import './ListeningTaskPlayer.css'

/* ============================================================================
 * Hàm thuần: chia nhóm câu hỏi theo đoạn nghe
 * ========================================================================== */

/**
 * Nhóm hướng dẫn ("Questions 1–10") có thể trải qua nhiều đoạn nghe. Cắt nhỏ theo segmentId
 * để chen vạch "Đoạn 2 · Nghe lại đoạn này" đúng chỗ. Tiêu đề / khung danh sách chung chỉ
 * giữ ở mẩu đầu (không lặp lại).
 */
export function splitGroupsBySegment(groups: QuestionGroup[]): (QuestionGroup & { segmentId?: string; startsSegment: boolean })[] {
  const result: (QuestionGroup & { segmentId?: string; startsSegment: boolean })[] = []
  let previousSegment: string | undefined
  for (const group of groups) {
    let chunk: ExamQuestion[] = []
    const flush = (first: boolean) => {
      if (!chunk.length) return
      const segmentId = chunk[0].segmentId
      result.push({
        ...group,
        id: `${group.id}-${chunk[0].id}`,
        heading: first ? group.heading : '',
        body: first ? group.body : '',
        sharedOptions: first ? group.sharedOptions : undefined,
        wordLimit: first ? group.wordLimit : null,
        questions: chunk,
        segmentId,
        startsSegment: segmentId !== previousSegment,
      })
      previousSegment = segmentId
      chunk = []
    }
    let first = true
    for (const question of group.questions) {
      if (chunk.length && question.segmentId !== chunk[0].segmentId) {
        flush(first)
        first = false
      }
      chunk.push(question)
    }
    flush(first)
  }
  return result
}

/* ============================================================================
 * Component
 * ========================================================================== */

export default function ListeningTaskPlayer(props: SkillTaskProps) {
  if (!props.lesson.listeningTask) return null
  return <ListeningTaskView {...props} />
}

function ListeningTaskView({ lesson, resumeData, onSaveResume, onComplete }: SkillTaskProps) {
  const task = lesson.listeningTask!
  const text = useListeningText()
  const uiText = useExamUiText()
  const { pick, language } = useLanguage()
  const display = useExamDisplay()
  const session = useTaskSession(resumeData, onSaveResume, { defaultMode: 'practice' })
  const { state } = session
  const isExam = state.mode === 'exam'
  const record = useLessonTaskRecorder()

  const questionsPaneRef = useRef<HTMLDivElement>(null)
  const audioPaneRef = useRef<HTMLDivElement>(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  /** câu vừa bấm "Nghe từ đoạn này" (để tô nút đang phát đúng câu) */
  const [listeningFromId, setListeningFromId] = useState<string | null>(null)

  const segments = task.segments
  const segmentIndexOf = useMemo(() => new Map(segments.map((segment, index) => [segment.id, index])), [segments])

  /* ---------- nhóm câu hỏi ---------- */
  const grouped = useMemo(() => buildQuestionGroups(task.instructions, task.questions), [task])
  const allGroups = useMemo(() => splitGroupsBySegment(grouped.groups), [grouped])
  // làm lại câu sai: chỉ hiện các câu đó
  const visibleGroups = useMemo(() => {
    if (!state.retryIds || state.phase !== 'answering') return allGroups
    const keep = new Set(state.retryIds)
    return allGroups.map((group) => ({ ...group, questions: group.questions.filter((q) => keep.has(q.id)) })).filter((group) => group.questions.length > 0)
  }, [allGroups, state.retryIds, state.phase])
  const orderedQuestions = useMemo(() => visibleGroups.flatMap((group) => group.questions), [visibleGroups])

  /** số câu đầu/cuối của mỗi đoạn */
  const segmentQuestions = useMemo(
    () =>
      segments.map((segment) => {
        const numbers = task.questions.filter((q) => q.segmentId === segment.id).map((q) => q.number)
        return numbers.length ? ([Math.min(...numbers), Math.max(...numbers)] as [number, number]) : null
      }),
    [segments, task.questions],
  )

  /* ---------- audio ---------- */
  const phaseRef = useRef(state.phase)
  phaseRef.current = state.phase
  const replaysRef = useRef(state.replaysUsed)
  replaysRef.current = state.replaysUsed
  const audio = useListeningAudio(segments, {
    autoAdvance: state.phase === 'answering',
    onSegmentStart: (index) => {
      // không đếm khi đang xem lại (nghe lại tự do); lúc vừa bấm Bắt đầu, pha còn là 'intro' -> vẫn đếm
      if (phaseRef.current === 'review') return
      const id = segments[index].id
      session.patch({ replaysUsed: { ...replaysRef.current, [id]: (replaysRef.current[id] ?? 0) + 1 } }, true)
    },
  })

  /** người học bấm phát 1 đoạn (thi thật: mỗi đoạn 1 lần) */
  const playSegment = useCallback(
    (index: number) => {
      if (isExam && state.phase === 'answering' && (state.replaysUsed[segments[index].id] ?? 0) >= 1) return
      audio.play(index)
    },
    [audio, isExam, segments, state.phase, state.replaysUsed],
  )

  /* ---------- chấm ---------- */
  const summary = useMemo(() => gradeAll(grouped.groups, state.answers), [grouped, state.answers])
  const band = state.firstScore ? taskBandEstimate(lesson.id, 'listening', state.firstScore.correct, state.firstScore.total) : null

  /* ---------- bằng chứng trong lời thoại ---------- */
  const blocks = useMemo<TextBlock[]>(() => segments.flatMap((segment) => segment.lines.map((line, index) => ({ id: lineBlockId(segment.id, index), text: line.text, group: segment.id }))), [segments])
  const evidence = useMemo(() => {
    const map = new Map<string, EvidenceResult>()
    for (const question of task.questions) map.set(question.id, findEvidence({ question, blocks, preferredGroup: question.segmentId }))
    return map
  }, [task.questions, blocks])
  const evidenceMarks = useMemo<TextMark[]>(() => {
    const marks: TextMark[] = []
    for (const question of task.questions) {
      const found = evidence.get(question.id)
      if (!found?.sentence) continue
      const active = question.id === activeId
      marks.push({ id: `ev-${question.id}`, ...found.sentence, kind: 'evidence', label: `Q${question.number}`, active })
      found.phrases.forEach((phrase, index) => marks.push({ id: `evp-${question.id}-${index}`, ...phrase, kind: 'evidence-phrase', active }))
    }
    return marks
  }, [task.questions, evidence, activeId])

  /** dòng thoại chứa bằng chứng (để "Nghe từ đoạn này"); không tìm thấy -> đầu đoạn của câu */
  const evidenceLine = useCallback(
    (question: ExamQuestion): { segmentIndex: number; lineIndex: number } => {
      const blockId = evidence.get(question.id)?.blockId
      const parsed = blockId ? parseLineBlockId(blockId) : null
      if (parsed && segmentIndexOf.has(parsed.segmentId)) return { segmentIndex: segmentIndexOf.get(parsed.segmentId)!, lineIndex: parsed.lineIndex }
      return { segmentIndex: segmentIndexOf.get(question.segmentId ?? '') ?? 0, lineIndex: 0 }
    },
    [evidence, segmentIndexOf],
  )

  /* ---------- điều hướng câu ---------- */
  const currentId = state.currentId ?? orderedQuestions[0]?.id ?? null

  const focusQuestion = useCallback((questionId: string) => {
    const element = questionsPaneRef.current?.querySelector<HTMLElement>(`#xq-${CSS.escape(questionId)}`)
    if (!element) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
    element.querySelector<HTMLElement>('input:not([disabled]):not([readonly]), input:checked, button')?.focus({ preventScroll: true })
  }, [])

  const locateInTranscript = useCallback(
    (question: ExamQuestion) => {
      setActiveId(question.id)
      // đợi React vẽ lại mark "active" rồi mới cuộn
      window.requestAnimationFrame(() => {
        if (!scrollMarkIntoView(audioPaneRef.current, `ev-${question.id}`)) {
          const { segmentIndex, lineIndex } = evidenceLine(question)
          scrollBlockIntoView(audioPaneRef.current, lineBlockId(segments[segmentIndex].id, lineIndex), { flash: true })
        }
      })
    },
    [evidenceLine, segments],
  )

  const goTo = useCallback(
    (questionId: string) => {
      session.setCurrent(questionId)
      focusQuestion(questionId)
      if (state.phase === 'review') {
        const question = task.questions.find((q) => q.id === questionId)
        if (question) locateInTranscript(question)
      }
    },
    [session, focusQuestion, state.phase, task.questions, locateInTranscript],
  )

  const step = useCallback(
    (delta: number) => {
      const index = orderedQuestions.findIndex((q) => q.id === currentId)
      const next = orderedQuestions[Math.max(0, Math.min(orderedQuestions.length - 1, index + delta))]
      if (next) goTo(next.id)
    },
    [orderedQuestions, currentId, goTo],
  )

  /* ---------- pha ---------- */
  const start = useCallback(() => {
    session.start(state.mode, null)
    audio.play(0)
  }, [session, state.mode, audio])

  const submit = useCallback(() => {
    setReviewOpen(false)
    audio.stop()
    const result = gradeAll(grouped.groups, session.state.answers)
    if (session.state.submitCount === 0) {
      record({
        lesson,
        skill: 'listening',
        groups: grouped.groups,
        summary: result,
        explanationOf: pick,
        contextOf: (questionId) => {
          const question = task.questions.find((q) => q.id === questionId)
          const segment = segments.find((s) => s.id === question?.segmentId)
          return segment?.lines.map((line) => (line.speaker ? `${line.speaker}: ${line.text}` : line.text)).join('\n')
        },
      })
    }
    session.submit({ correct: result.correct, total: result.total })
    const firstWrong = allGroups.flatMap((g) => g.questions).find((q) => !result.results[q.id]?.isCorrect)
    if (firstWrong) locateInTranscript(firstWrong)
    window.requestAnimationFrame(() => questionsPaneRef.current?.scrollTo({ top: 0 }))
  }, [audio, allGroups, grouped, session, record, lesson, pick, task.questions, segments, locateInTranscript])

  const wrongIds = useMemo(() => Object.values(summary.results).filter((r) => !r.isCorrect).map((r) => r.questionId), [summary])
  // mở lại bài khi đang ở màn xem lại: chọn sẵn câu sai đầu tiên để thấy ngay bằng chứng (không cuộn)
  const preselected = useRef(false)
  useEffect(() => {
    if (preselected.current) return
    preselected.current = true
    if (state.phase === 'review' && activeId === null && wrongIds.length) setActiveId(wrongIds[0])
  }, [state.phase, activeId, wrongIds])

  const complete = useCallback(() => {
    audio.stop()
    if (session.state.completed) return
    session.patch({ completed: true }, true)
    const first = session.state.firstScore ?? { correct: summary.correct, total: summary.total }
    const mistakes = allGroups
      .flatMap((g) => g.questions)
      .filter((q) => !summary.results[q.id]?.isCorrect)
      .slice(0, 5)
      .map((q) => ({ itemId: q.id, question: `Q${q.number}. ${q.prompt}`, userAnswer: summary.results[q.id].userText, correctAnswer: summary.results[q.id].correctText, explanation: q.explanation }))
    onComplete({
      correct: first.correct,
      total: first.total,
      mistakes,
      band: band ? { low: band.low, high: band.high } : undefined,
      summary: listeningSummary(first.correct, first.total),
      minutes: Math.max(1, Math.round(session.state.activeSeconds / 60)),
    })
  }, [audio, session, summary, allGroups, onComplete, band])

  const retryWrong = useCallback(() => {
    audio.stop()
    session.retryWrong(wrongIds)
    setActiveId(null)
    window.requestAnimationFrame(() => questionsPaneRef.current?.scrollTo({ top: 0 }))
  }, [audio, session, wrongIds])

  /* ---------- phím tắt ---------- */
  useEffect(() => {
    if (state.phase === 'intro') return
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || reviewOpen) return
      const target = event.target as HTMLElement
      const typing = !!target.closest('input[type="text"], input:not([type]), textarea, [contenteditable="true"]')
      const onControl = !!target.closest('button, input, select, textarea, [role="radio"], [role="separator"], label')
      if (event.altKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault()
        step(event.key === 'ArrowRight' ? 1 : -1)
        return
      }
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && state.phase === 'answering') {
        event.preventDefault()
        setReviewOpen(true)
        return
      }
      // Alt+F: gắn / bỏ cờ câu đang xem (nút cờ nằm ngoài vòng Tab)
      if (event.altKey && (event.key === 'f' || event.key === 'F') && state.phase === 'answering' && currentId) {
        event.preventDefault()
        session.toggleFlag(currentId)
        return
      }
      if (typing) return
      const canControlAudio = !isExam || state.phase === 'review'
      if (event.key === ' ' && !onControl && canControlAudio) {
        event.preventDefault()
        if (audio.status === 'idle') playSegment(audio.segmentIndex)
        else audio.toggle()
      } else if ((event.key === 'r' || event.key === 'R') && !event.ctrlKey && !event.metaKey && canControlAudio) {
        playSegment(audio.segmentIndex)
      } else if (event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight') && canControlAudio) {
        event.preventDefault()
        audio.seekBy(event.key === 'ArrowLeft' ? -5 : 5)
      } else if (/^[1-9]$/.test(event.key) && state.phase === 'answering' && !event.ctrlKey && !event.altKey && !event.metaKey) {
        const question = orderedQuestions.find((q) => q.id === currentId)
        if (!question || question.kind === 'gap-fill') return
        const index = Number(event.key) - 1
        if (index < choicesOf(question).length) session.setAnswer(question.id, answerValueFor(question, index))
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state.phase, reviewOpen, step, isExam, audio, playSegment, orderedQuestions, currentId, session])

  /* ---------- thanh câu hỏi ---------- */
  const flags = useMemo(() => new Set(state.flags), [state.flags])
  const navigatorParts = useMemo<NavigatorPart[]>(() => {
    const parts = segments.map((segment, index) => ({ id: segment.id, label: text('segmentLabel', { n: index + 1 }), questions: [] as NavigatorPart['questions'] }))
    for (const question of orderedQuestions) {
      const part = parts[segmentIndexOf.get(question.segmentId ?? '') ?? 0]
      const result = state.phase === 'review' ? summary.results[question.id] : undefined
      part.questions.push({
        id: question.id,
        number: question.number,
        answered: isAnswered(state.answers, question.id),
        flagged: flags.has(question.id),
        result: result ? (result.isCorrect ? 'correct' : 'incorrect') : undefined,
      })
    }
    return parts.filter((part) => part.questions.length > 0)
  }, [segments, orderedQuestions, segmentIndexOf, state.phase, state.answers, summary, flags, text])

  const answeredCount = orderedQuestions.filter((q) => isAnswered(state.answers, q.id)).length

  /* ============================== VẼ ============================== */

  const title = pick(lesson.title)
  const isIelts = /^l(2b|3)-i-/.test(lesson.id)

  if (state.phase === 'intro') {
    const totalAudio = segments.reduce((sum, segment) => sum + audio.durations[segmentIndexOf.get(segment.id)!], 0)
    return (
      <ExamFrame display={display} variant="embedded" title={title} skill="listening">
        <TaskIntro
          skill="listening"
          eyebrow={isIelts ? text('eyebrow') : text('eyebrowGeneral')}
          title={title}
          description={pick(lesson.description)}
          facts={[
            { icon: 'exam', text: text('questionsCount', { n: task.questions.length }) },
            { icon: 'volume', text: text('segmentsCount', { n: segments.length }) },
            { icon: 'clock', text: `Audio ${formatSeconds(totalAudio)}` },
          ]}
          modeGroupLabel={text('modeGroup')}
          modes={[
            { id: 'practice', title: text('practiceTitle'), points: [text('practicePoint1'), text('practicePoint2'), text('practicePoint3')] },
            { id: 'exam', title: text('examTitle'), points: [text('examPoint1'), text('examPoint2'), text('examPoint3')] },
          ]}
          mode={state.mode}
          onModeChange={(mode) => session.patch({ mode }, true)}
          tipTitle={task.strategyTip ? text('strategy') : undefined}
          tip={task.strategyTip ? pick(task.strategyTip) : undefined}
          onStart={start}
          startLabel={text('start')}
          mascotPose="listening"
        />
      </ExamFrame>
    )
  }

  const reviewing = state.phase === 'review'
  const audioActive = audio.status === 'playing' || audio.status === 'loading'

  const leftPane = (
    <div className="xlis-left">
      <ListeningAudioPanel
        audio={audio}
        segments={segments}
        mode={reviewing ? 'practice' : state.mode}
        segmentQuestions={segmentQuestions}
        replaysUsed={state.replaysUsed}
        onPlaySegment={playSegment}
        compact={reviewing}
      />
      {reviewing ? (
        <ListeningTranscript
          segments={segments}
          marks={evidenceMarks}
          playingSegment={audio.segmentIndex}
          playingLine={audio.currentLine}
          isPlaying={audio.status === 'playing' || audio.status === 'paused'}
          onPlayLine={(segmentIndex, lineIndex) => {
            setListeningFromId(null)
            audio.playFromLine(segmentIndex, lineIndex)
          }}
          onPlaySegment={(segmentIndex) => {
            setListeningFromId(null)
            audio.play(segmentIndex)
          }}
        />
      ) : (
        <>
          <div className="xlis-locked">
            <span className="xlis-locked__icon" aria-hidden>
              📝
            </span>
            <div>
              <strong>{text('transcriptLocked')}</strong>
              <p>{text('transcriptLockedHint')}</p>
            </div>
          </div>
          {!isExam && task.strategyTip && (
            <div className="xlis-tip">
              <strong>{text('strategy')}</strong>
              <p>{pick(task.strategyTip)}</p>
            </div>
          )}
          {!isExam && <p className="xlis-shortcuts">{text('shortcutsHint')}</p>}
        </>
      )}
    </div>
  )

  const typeName = (typeId: string) => QUESTION_TYPE_NAMES[typeId]?.[language] ?? typeId

  // 1 điều làm tốt + 1–2 việc sửa được (không chê bai)
  const bestType = [...summary.byType].filter((s) => s.total >= 2 && s.correct / s.total >= 0.7).sort((a, b) => b.correct / b.total - a.correct / a.total)[0]
  const wentWell =
    summary.correct === summary.total
      ? text('wentWellAll', { n: summary.total })
      : bestType
        ? text('wentWellType', { type: typeName(bestType.typeId), c: bestType.correct, t: bestType.total })
        : summary.correct > 0
          ? text('wentWellSome', { c: summary.correct })
          : null
  const results = Object.values(summary.results)
  const improve = [
    results.filter((r) => r.isBlank).length > 0 && text('improveBlank', { n: results.filter((r) => r.isBlank).length }),
    results.filter((r) => r.nearMiss).length > 0 && text('improveSpelling', { n: results.filter((r) => r.nearMiss).length }),
    wrongIds.length > 0 && text('improveListenAgain'),
  ].filter((item): item is string => !!item)

  const rightPane = (
    <div className="xlis-right">
      {reviewing && (
        <TaskResultSummary
          summary={summary}
          band={band}
          typeName={typeName}
          wentWell={wentWell}
          improve={improve.slice(0, 2)}
          primary={{ label: text('continue'), onClick: complete }}
          secondary={wrongIds.length > 0 ? { label: text('retryWrong'), onClick: retryWrong } : null}
        />
      )}
      {state.retryIds && !reviewing && <p className="xlis-retry-note">{text('retrying', { n: state.retryIds.length })}</p>}
      <ExamQuestionList
        groups={visibleGroups}
        intro={grouped.intro}
        answers={state.answers}
        onAnswer={reviewing ? undefined : session.setAnswer}
        flags={flags}
        onToggleFlag={reviewing ? undefined : session.toggleFlag}
        currentId={reviewing ? activeId : currentId}
        onFocusQuestion={(id) => (reviewing ? setActiveId(id) : session.setCurrent(id))}
        review={reviewing ? summary.results : null}
        practiceHints={!isExam && !reviewing}
        showTypingTip={!isExam}
        renderGroupLead={(group) => {
          const meta = group as QuestionGroup & { segmentId?: string; startsSegment?: boolean }
          if (!meta.startsSegment || meta.segmentId === undefined) return null
          const index = segmentIndexOf.get(meta.segmentId) ?? 0
          const range = segmentQuestions[index]
          const playing = audio.segmentIndex === index && audioActive
          const used = state.replaysUsed[meta.segmentId] ?? 0
          const canPlay = reviewing || !isExam || used === 0
          return (
            <div className={playing ? 'xlis-divider is-playing' : 'xlis-divider'}>
              <span className="xlis-divider__label">
                {text('segmentLabel', { n: index + 1 })}
                {range && <span> · {range[0] === range[1] ? text('segmentQuestion', { n: range[0] }) : text('segmentQuestions', { from: range[0], to: range[1] })}</span>}
              </span>
              <span className="xlis-divider__line" aria-hidden />
              {playing ? (
                <span className="xlis-divider__state">{text('nowPlaying')}</span>
              ) : canPlay ? (
                <button type="button" className="xlis-divider__btn" onClick={() => (reviewing ? audio.play(index) : playSegment(index))}>
                  {used > 0 || reviewing ? text('replaySegment') : text('playSegment')}
                </button>
              ) : (
                <span className="xlis-divider__state">{text('examNoPlaysLeft')}</span>
              )}
            </div>
          )
        }}
        renderAfterQuestion={
          reviewing
            ? (question) => {
                const result = summary.results[question.id]
                if (!result) return null
                const found = evidence.get(question.id)
                const block = found?.sentence ? blocks.find((b) => b.id === found.sentence!.blockId) : null
                const segmentIndex = segmentIndexOf.get(question.segmentId ?? '') ?? 0
                const { segmentIndex: playSeg, lineIndex } = evidenceLine(question)
                const isPlayingHere = audioActive && audio.segmentIndex === playSeg && listeningFromId === question.id
                return (
                  <EvidenceStrip
                    result={result}
                    explanation={pick(question.explanation)}
                    explanationEn={question.explanation?.en}
                    questionText={question.prompt}
                    evidenceText={block && found?.sentence ? block.text.slice(found.sentence.start, found.sentence.end) : null}
                    evidenceWhere={text('segmentLabel', { n: segmentIndex + 1 })}
                    expanded={expanded.has(question.id)}
                    onToggle={() =>
                      setExpanded((current) => {
                        const next = new Set(current)
                        if (next.has(question.id)) next.delete(question.id)
                        else next.add(question.id)
                        return next
                      })
                    }
                    actions={[
                      {
                        icon: 'volume',
                        label: uiText('listenFromHere'),
                        active: isPlayingHere,
                        onClick: () => {
                          locateInTranscript(question)
                          setListeningFromId(question.id)
                          audio.playFromLine(playSeg, lineIndex)
                        },
                      },
                      { icon: 'eye', label: uiText('locateInTranscript'), onClick: () => locateInTranscript(question) },
                    ]}
                  />
                )
              }
            : undefined
        }
      />
    </div>
  )

  const audioStatus =
    !reviewing && isExam && audioActive ? (
      <span className="xlis-onair">
        <span className="xlis-onair__dot" aria-hidden />
        {text('audioPlayingStatus', { n: audio.segmentIndex + 1 })}
      </span>
    ) : null

  return (
    <ExamFrame
      display={display}
      variant="embedded"
      title={title}
      skill="listening"
      badge={<ModeBadge mode={reviewing ? (state.firstScore?.mode ?? 'practice') : state.mode} />}
      timer={audioStatus}
      footer={
        <QuestionNavigator
          parts={navigatorParts}
          currentId={reviewing ? activeId : currentId}
          onSelect={goTo}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          extra={reviewing ? null : uiText('answeredOf', { done: answeredCount, total: orderedQuestions.length })}
          primaryAction={reviewing ? { label: text('continue'), onClick: complete, icon: 'arrow-right' } : { label: text('submitCheck'), onClick: () => setReviewOpen(true) }}
        />
      }
    >
      <SplitPane
        key={reviewing ? 'review' : 'answer'}
        start={leftPane}
        end={rightPane}
        startRef={audioPaneRef}
        endRef={questionsPaneRef}
        startLabel={text('audioPane')}
        endLabel={text('questionsPane')}
        defaultRatio={reviewing ? 0.46 : 0.36}
        minStartPx={330}
        storageKey={reviewing ? 'listening-review' : 'listening'}
      />
      <ReviewBeforeSubmit
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={submit}
        onJump={(id) => {
          setReviewOpen(false)
          goTo(id)
        }}
        parts={navigatorParts}
        examMode={isExam}
      />
    </ExamFrame>
  )
}

