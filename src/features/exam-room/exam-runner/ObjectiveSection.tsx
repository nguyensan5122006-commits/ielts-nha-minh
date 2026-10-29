/**
 * ObjectiveSection.tsx — 1 PHẦN THI CÓ CÂU TỰ CHẤM: Listening · Reading · Vocabulary & Grammar
 * ----------------------------------------------------------------------------
 * Giống máy thi IELTS trên máy tính (Inspera — research ui-ielts-a "Spec exam mode"):
 *   - mỗi màn hình là 1 Part / Passage; thanh câu hỏi dưới đáy theo Part (đã làm / đang xem / gắn cờ)
 *   - Reading: 2 cột kéo được (bài đọc | câu hỏi), bôi đen -> tô vàng / ghi chú (cột ghi chú bên phải)
 *   - Listening: cột trái = trạng thái âm thanh + danh sách Part (ListeningPanel), cột phải = câu hỏi.
 *       Thi thật: các Part tự phát liền mạch, mỗi Part 1 lần; hết âm thanh còn 2 phút kiểm tra rồi tự nộp.
 *   - Vocabulary: 1 cột giữa màn.
 *   - đồng hồ êm "Còn 17 phút" (nếu đề bấm giờ), hết giờ tự nộp phần này.
 *   - "Nộp phần này" -> màn Kiểm tra trước khi nộp (câu trống, câu gắn cờ).
 * Phím tắt: Alt+←/→ câu trước/sau · 1–9 chọn đáp án câu đang xem · Alt+F gắn cờ · Ctrl+Enter kiểm tra & nộp.
 *
 * Mỗi Part vẽ bằng <PartScreen key=…> riêng: đổi Part = vẽ lại màn (cuộn về đầu, tô vàng đúng bài).
 * Đồng hồ + âm thanh nằm ở component này nên KHÔNG bị ngắt khi đổi Part.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Exam, ExamPart } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Modal } from '../../../design-system/components/Modal'
import { isAnswered } from '../../exam-ui/answer-grading'
import { CalmExamTimer, useExamCountdown, type TimerTone } from '../../exam-ui/CalmExamTimer'
import type { ExamDisplay } from '../../exam-ui/ExamDisplaySettings'
import { useExamUiText } from '../../exam-ui/exam-ui-text'
import { ExamFrame, FrameTool, ModeBadge, NoteIcon } from '../../exam-ui/ExamFrame'
import { ExamQuestionList } from '../../exam-ui/ExamQuestionList'
import { NotesPanel, SelectionToolbar, useHighlightNotes, type UserMark } from '../../exam-ui/HighlightNotesLayer'
import { scrollMarkIntoView } from '../../exam-ui/MarkedText'
import { answerValueFor, buildQuestionGroups, choicesOf } from '../../exam-ui/question-grouping'
import { QuestionNavigator, type NavigatorPart } from '../../exam-ui/QuestionNavigator'
import { ReviewBeforeSubmit } from '../../exam-ui/ReviewBeforeSubmit'
import { SplitPane } from '../../exam-ui/SplitPane'
import { scrollBlockIntoView } from '../../exam-ui/text-selection'
import { ReadingPassageView } from '../../skill-reading/ReadingPassageView'
import '../../skill-reading/ReadingTaskPlayer.css'
import { formatAudioTime, scriptDuration, useExamAudio } from '../exam-audio'
import { LISTENING_CHECK_SECONDS, partKey, type ExamRules } from '../exam-catalog'
import { cleanInstructions, passageBlocks, passageForView } from '../exam-part-content'
import { useExamRoomText } from '../exam-room-text'
import type { ExamSessionHandle } from '../exam-session'
import { ListeningPanel } from './ListeningPanel'
import { ExitDialog, focusQuestion, SaveStatus, useSpentSeconds, useUnloadWarning } from './runner-shared'

export interface SectionRunnerProps {
  exam: Exam
  sectionIndex: number
  /** "Phần 2/4" */
  position: { n: number; total: number }
  handle: ExamSessionHandle
  rules: ExamRules
  display: ExamDisplay
  onSubmit: (reason: 'manual' | 'time-up') => void
  onExit: () => void
}

export function ObjectiveSection({ exam, sectionIndex, position, handle, rules, display, onSubmit, onExit }: SectionRunnerProps) {
  const text = useExamRoomText()
  const uiText = useExamUiText()
  const { session, update, saveState } = handle
  const section = exam.sections[sectionIndex]
  const parts = useMemo(() => section.parts ?? [], [section])
  const isListening = section.skill === 'listening'
  const autoListening = isListening && rules.autoPlayListening
  const sectionKey = String(sectionIndex)

  const grouped = useMemo(() => parts.map((part) => buildQuestionGroups(cleanInstructions(part.instructions), part.questions)), [parts])
  const ordered = useMemo(() => parts.flatMap((part) => part.questions), [parts])
  const currentId = session.currentId[sectionKey] ?? ordered[0]?.id ?? null
  const currentPartIndex = Math.max(0, parts.findIndex((part) => part.questions.some((question) => question.id === currentId)))
  const flags = useMemo(() => new Set(session.flags), [session.flags])
  const [reviewOpen, setReviewOpen] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)

  useSpentSeconds(handle, sectionIndex)
  useUnloadWarning(true)

  /* ---------- đáp án, cờ, câu đang xem ---------- */
  const setAnswer = useCallback((id: string, value: string) => update((current) => ({ answers: { ...current.answers, [id]: value } })), [update])
  const toggleFlag = useCallback(
    (id: string) => update((current) => ({ flags: current.flags.includes(id) ? current.flags.filter((flag) => flag !== id) : [...current.flags, id] })),
    [update],
  )
  const setCurrent = useCallback((id: string) => update((current) => ({ currentId: { ...current.currentId, [sectionKey]: id } })), [update, sectionKey])
  const goTo = useCallback(
    (id: string) => {
      setCurrent(id)
      focusQuestion(id)
    },
    [setCurrent],
  )
  const step = useCallback(
    (delta: number) => {
      const index = ordered.findIndex((question) => question.id === currentId)
      const next = ordered[Math.max(0, Math.min(ordered.length - 1, index + delta))]
      if (next) goTo(next.id)
    },
    [ordered, currentId, goTo],
  )
  const goToPart = useCallback((partIndex: number) => parts[partIndex]?.questions[0] && goTo(parts[partIndex].questions[0].id), [parts, goTo])

  /* ---------- nộp (tay / hết giờ) ---------- */
  const submitRef = useRef(onSubmit)
  submitRef.current = onSubmit

  /* ---------- đồng hồ phần (không áp dụng cho phần Nghe kiểu máy thi) ---------- */
  const sectionTimed = rules.timed && !autoListening
  const { secondsLeft, tone } = useExamCountdown(session.secondsLeft[sectionKey] ?? section.durationMinutes * 60, {
    running: sectionTimed,
    onExpire: () => submitRef.current('time-up'),
  })
  useEffect(() => {
    if (sectionTimed && secondsLeft % 5 === 0) update((current) => ({ secondsLeft: { ...current.secondsLeft, [sectionKey]: secondsLeft } }), false, true)
  }, [sectionTimed, secondsLeft, sectionKey, update])

  /* ---------- âm thanh phần Nghe ---------- */
  const [durations, setDurations] = useState<Record<string, number>>({})
  useEffect(() => {
    if (!isListening) return
    let alive = true
    void Promise.all(parts.map(async (part, index) => [partKey(sectionIndex, index), part.audioScript ? await scriptDuration(part.audioScript) : null] as const)).then((pairs) => {
      if (!alive) return
      setDurations(Object.fromEntries(pairs.filter((pair): pair is readonly [string, number] => pair[1] !== null)))
    })
    return () => {
      alive = false
    }
  }, [isListening, parts, sectionIndex])

  const partIndexOfKey = (key: string) => parts.findIndex((_, index) => partKey(sectionIndex, index) === key)
  const audio = useExamAudio({
    onEnded: (key) => {
      update((current) => ({ audio: { ...current.audio, [key]: { plays: Math.max(1, current.audio[key]?.plays ?? 1), position: 0, finished: true } } }), true)
      if (!autoListening) return
      const finishedIndex = partIndexOfKey(key)
      const nextIndex = parts.findIndex((_, index) => index > finishedIndex && !handle.latest.current.audio[partKey(sectionIndex, index)]?.finished)
      if (nextIndex >= 0) playPart(nextIndex)
      else update({ listeningCheckLeft: LISTENING_CHECK_SECONDS }, true)
    },
  })

  /** Phát 1 Part. Thi thật: tiếp tục từ chỗ đã nghe (nếu tải lại trang giữa chừng). */
  function playPart(partIndex: number) {
    const part = parts[partIndex]
    if (!part?.audioScript) return
    const key = partKey(sectionIndex, partIndex)
    const state = handle.latest.current.audio[key]
    const resumeFrom = autoListening && state && !state.finished ? state.position : 0
    // lượt nghe tính lúc bắt đầu; thi thật: mỗi Part đúng 1 lượt (gọi lại khi làm tiếp không tính thêm)
    const plays = autoListening ? 1 : (state?.plays ?? 0) + 1
    if (Number.isFinite(rules.listeningPlays) && !autoListening && plays > rules.listeningPlays) return
    update((current) => ({ audio: { ...current.audio, [key]: { plays, position: resumeFrom, finished: false } } }), true)
    void audio.play(key, part.audioScript, { from: resumeFrom })
    // thi thật: màn câu hỏi đi theo Part đang phát (nếu người học đang ở Part trước)
    if (autoListening && currentPartIndex < partIndex) goToPart(partIndex)
  }

  // thi thật: vào phần là tự phát Part chưa nghe đầu tiên (người học vừa bấm "Bắt đầu" / "Làm tiếp")
  const [autoTried, setAutoTried] = useState(false)
  useEffect(() => {
    if (!autoListening || autoTried) return
    setAutoTried(true)
    if (handle.latest.current.listeningCheckLeft !== null) return
    const first = parts.findIndex((_, index) => !handle.latest.current.audio[partKey(sectionIndex, index)]?.finished)
    if (first >= 0) playPart(first)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ chạy 1 lần khi vào phần
  }, [autoListening])

  // lưu "đang nghe tới giây thứ mấy" mỗi ~3 giây (tải lại trang vẫn nghe tiếp đúng chỗ)
  const lastSavedPosition = useRef(0)
  useEffect(() => {
    const { key, currentTime, status } = audio.view
    if (!key || status !== 'playing' || Math.abs(currentTime - lastSavedPosition.current) < 3) return
    lastSavedPosition.current = currentTime
    update((current) => (current.audio[key] ? { audio: { ...current.audio, [key]: { ...current.audio[key], position: currentTime } } } : {}), false, true)
  }, [audio.view, update])

  // 2 phút kiểm tra sau khi hết âm thanh (thi thật)
  const checkActive = autoListening && session.listeningCheckLeft !== null
  const check = useExamCountdown(session.listeningCheckLeft ?? LISTENING_CHECK_SECONDS, { running: checkActive, onExpire: () => submitRef.current('time-up') })
  useEffect(() => {
    if (checkActive && check.secondsLeft % 5 === 0) update({ listeningCheckLeft: check.secondsLeft }, false, true)
  }, [checkActive, check.secondsLeft, update])

  const allPlayed = parts.every((_, index) => session.audio[partKey(sectionIndex, index)]?.finished)
  const nextUnplayed = parts.findIndex((_, index) => !session.audio[partKey(sectionIndex, index)]?.finished)
  // trình duyệt chặn tự phát (chưa có cú bấm) -> hộp "Bấm để nghe tiếp"
  const needsGesture = autoListening && autoTried && !allPlayed && !checkActive && audio.view.status !== 'playing' && audio.view.status !== 'loading' && !reviewOpen && !exitOpen

  /* ---------- rời phòng thi ---------- */
  const leave = () => {
    const { key, currentTime } = audio.view
    audio.pause()
    if (key) update((current) => (current.audio[key] && !current.audio[key].finished ? { audio: { ...current.audio, [key]: { ...current.audio[key], position: currentTime } } } : {}), true)
    update(sectionTimed ? (current) => ({ secondsLeft: { ...current.secondsLeft, [sectionKey]: secondsLeft } }) : {}, true)
    onExit()
  }

  const submitNow = () => {
    setReviewOpen(false)
    audio.stop()
    onSubmit('manual')
  }

  /* ---------- phím tắt ---------- */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || reviewOpen || exitOpen || needsGesture) return
      const target = event.target as HTMLElement
      if (target.closest('[role="dialog"]')) return
      const typing = !!target.closest('input[type="text"], input:not([type]), textarea, [contenteditable="true"]')
      if (event.altKey && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
        event.preventDefault()
        step(event.key === 'ArrowRight' ? 1 : -1)
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault()
        setReviewOpen(true)
      } else if (event.altKey && event.key.toLowerCase() === 'f' && currentId) {
        event.preventDefault()
        toggleFlag(currentId)
      } else if (!typing && /^[1-9]$/.test(event.key) && !event.ctrlKey && !event.altKey && !event.metaKey) {
        const question = ordered.find((q) => q.id === currentId)
        if (!question || question.kind === 'gap-fill') return
        const index = Number(event.key) - 1
        if (index < choicesOf(question).length) setAnswer(question.id, answerValueFor(question, index))
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [reviewOpen, exitOpen, needsGesture, step, currentId, toggleFlag, ordered, setAnswer])

  /* ---------- thanh câu hỏi ---------- */
  const navigatorParts = useMemo<NavigatorPart[]>(
    () =>
      parts.map((part, index) => ({
        id: partKey(sectionIndex, index),
        label: part.title,
        questions: part.questions.map((question) => ({ id: question.id, number: question.number, answered: isAnswered(session.answers, question.id), flagged: flags.has(question.id) })),
      })),
    [parts, sectionIndex, session.answers, flags],
  )
  const answeredCount = ordered.filter((question) => isAnswered(session.answers, question.id)).length

  /* ---------- header ---------- */
  const activeAudioIndex = audio.view.key ? partIndexOfKey(audio.view.key) : -1
  let timer: ReactNode = null
  let headerTone: TimerTone = 'calm'
  if (sectionTimed) {
    timer = <CalmExamTimer secondsLeft={secondsLeft} tone={tone} />
    headerTone = tone
  } else if (checkActive) {
    timer = (
      <span className="xr-check">
        <span className="xr-check__label">{text('checkTimeTitle')}</span>
        <CalmExamTimer secondsLeft={check.secondsLeft} tone={check.tone} hideable={false} />
      </span>
    )
    headerTone = check.tone
  } else if (isListening && activeAudioIndex >= 0 && (audio.view.status === 'playing' || audio.view.status === 'loading')) {
    timer = (
      <span className="xr-playing-chip">
        <span className="xr-listen__dot" aria-hidden />
        {text('audioPlayingPart', { part: parts[activeAudioIndex].title })} · <span className="ds-num">{formatAudioTime(audio.view.currentTime)}</span>
      </span>
    )
  }

  const part = parts[currentPartIndex]
  const key = partKey(sectionIndex, currentPartIndex)
  const isLastPart = currentPartIndex === parts.length - 1

  return (
    <>
      <PartScreen
        key={key}
        title={section.title}
        positionLabel={text('sectionOf', position)}
        skill={section.skill}
        display={display}
        badge={<ModeBadge mode={session.mode === 'exam' || rules.timed ? 'exam' : 'practice'} />}
        timer={timer}
        tone={headerTone}
        status={<SaveStatus state={saveState} />}
        onExit={() => setExitOpen(true)}
        footer={
          <QuestionNavigator
            parts={navigatorParts}
            currentId={currentId}
            onSelect={goTo}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
            extra={uiText('answeredOf', { done: answeredCount, total: ordered.length })}
            primaryAction={{ label: text('submitSection'), onClick: () => setReviewOpen(true) }}
          />
        }
        part={part}
        intro={grouped[currentPartIndex].intro}
        groups={grouped[currentPartIndex].groups}
        answers={session.answers}
        onAnswer={setAnswer}
        flags={flags}
        onToggleFlag={toggleFlag}
        currentId={currentId}
        onFocusQuestion={setCurrent}
        practiceHints={rules.practiceHints}
        marks={session.marks[key]}
        onMarksChange={(marks) => update((current) => ({ marks: { ...current.marks, [key]: marks } }))}
        leftPane={
          isListening ? (
            <ListeningPanel
              parts={parts}
              sectionIndex={sectionIndex}
              currentPartIndex={currentPartIndex}
              audioState={session.audio}
              audio={audio}
              rules={rules}
              durations={durations}
              onPlayPart={playPart}
              onSelectPart={goToPart}
            />
          ) : null
        }
        nextAction={
          isLastPart ? (
            <Button variant="navy" iconLeft="check" onClick={() => setReviewOpen(true)}>
              {uiText('checkAndSubmit')}
            </Button>
          ) : (
            <Button variant="secondary" iconRight="arrow-right" onClick={() => goToPart(currentPartIndex + 1)}>
              {parts[currentPartIndex + 1].title}
            </Button>
          )
        }
      />

      <ReviewBeforeSubmit
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={submitNow}
        onJump={(id) => {
          setReviewOpen(false)
          goTo(id)
        }}
        parts={navigatorParts}
        examMode={rules.timed || session.mode === 'exam'}
      />
      <ExitDialog open={exitOpen} onStay={() => setExitOpen(false)} onLeave={leave} timed={sectionTimed} audio={isListening && audio.view.status === 'playing'} />
      <Modal
        open={needsGesture}
        onClose={() => {}}
        hideCloseButton
        closeOnBackdrop={false}
        size="sm"
        title={text('blockedTitle')}
        footer={
          <Button iconLeft="play-fill" onClick={() => playPart(nextUnplayed)} autoFocus>
            {text('resumeListening', { part: parts[nextUnplayed]?.title ?? '' })}
          </Button>
        }
      >
        <p className="xr-dialog-text">
          <Icon name="volume" size={18} /> {text('blockedText')}
        </p>
      </Modal>
    </>
  )
}

/* ============================================================================
 * 1 PART TRÊN MÀN HÌNH (vẽ lại khi đổi Part)
 * ========================================================================== */

interface PartScreenProps {
  title: string
  positionLabel: string
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocabulary'
  display: ExamDisplay
  badge: ReactNode
  timer: ReactNode
  tone: TimerTone
  status: ReactNode
  onExit: () => void
  footer: ReactNode
  part: ExamPart
  intro: string
  groups: ReturnType<typeof buildQuestionGroups>['groups']
  answers: Record<string, string>
  onAnswer: (id: string, value: string) => void
  flags: ReadonlySet<string>
  onToggleFlag: (id: string) => void
  currentId: string | null
  onFocusQuestion: (id: string) => void
  practiceHints: boolean
  marks: UserMark[] | undefined
  onMarksChange: (marks: UserMark[]) => void
  leftPane: ReactNode
  nextAction: ReactNode
}

function PartScreen(props: PartScreenProps) {
  const { title, positionLabel, skill, display, badge, timer, tone, status, onExit, footer, part, intro, groups, answers, onAnswer, flags, onToggleFlag, currentId, onFocusQuestion, practiceHints, marks, onMarksChange, leftPane, nextAction } = props
  const text = useExamRoomText()
  const uiText = useExamUiText()
  const passage = useMemo(() => passageForView(part), [part])
  const blocks = useMemo(() => passageBlocks(passage), [passage])
  const textOf = useCallback((blockId: string) => blocks.find((block) => block.id === blockId)?.text ?? '', [blocks])
  const highlights = useHighlightNotes(marks, onMarksChange, textOf)
  const [notesOpen, setNotesOpen] = useState(false)
  const [focusNoteId, setFocusNoteId] = useState<string | null>(null)
  const passagePaneRef = useRef<HTMLDivElement>(null)
  const passageRef = useRef<HTMLDivElement>(null)
  const questionsPaneRef = useRef<HTMLDivElement>(null)

  const first = part.questions[0]?.number
  const last = part.questions[part.questions.length - 1]?.number

  const questions = (
    <div className="xr-qpane">
      <div className="xr-part-banner">
        <strong>{part.title}</strong>
        <span>{text('answerQuestions', { from: first ?? '', to: last ?? '' })}</span>
      </div>
      <ExamQuestionList
        groups={groups}
        intro={intro}
        answers={answers}
        onAnswer={onAnswer}
        flags={flags}
        onToggleFlag={onToggleFlag}
        currentId={currentId}
        onFocusQuestion={onFocusQuestion}
        practiceHints={practiceHints}
        showTypingTip={practiceHints}
      />
      <div className="xr-part-next">{nextAction}</div>
    </div>
  )

  let body: ReactNode
  if (passage) {
    body = (
      <SplitPane
        start={
          <>
            <ReadingPassageView ref={passageRef} passage={passage} marks={highlights.textMarks} onWordTap={null} onNoteClick={(mark) => (setNotesOpen(true), setFocusNoteId(mark.id))} hint={text('selectHint')} />
            <SelectionToolbar
              containerRef={passageRef}
              onHighlight={highlights.highlight}
              onNote={(ranges) => {
                const id = highlights.addNote(ranges)
                setNotesOpen(true)
                setFocusNoteId(id)
              }}
              onRemove={highlights.removeIn}
              canRemove={highlights.hasMarkIn}
            />
          </>
        }
        end={questions}
        startRef={passagePaneRef}
        endRef={questionsPaneRef}
        startLabel={part.passage?.title ?? part.title}
        endLabel={part.title}
        defaultRatio={0.52}
        storageKey="exam-room-reading"
      />
    )
  } else if (leftPane) {
    body = (
      <SplitPane
        start={leftPane}
        end={questions}
        startRef={passagePaneRef}
        endRef={questionsPaneRef}
        startLabel={text('audioTitle')}
        endLabel={part.title}
        defaultRatio={0.34}
        minStartPx={300}
        storageKey="exam-room-listening"
      />
    )
  } else {
    body = <div className="xr-single">{questions}</div>
  }

  return (
    <ExamFrame
      display={display}
      variant="standalone"
      className="xr-frame"
      title={title}
      skill={skill === 'vocabulary' ? undefined : skill}
      badge={
        <>
          {badge}
          <span className="xr-frame__position">{positionLabel}</span>
        </>
      }
      timer={timer}
      tone={tone}
      status={status}
      tools={passage ? <FrameTool icon={<NoteIcon />} label={uiText('notes')} count={highlights.noteMarks.length} pressed={notesOpen} onClick={() => setNotesOpen((open) => !open)} /> : undefined}
      onExit={onExit}
      exitLabel={text('leave')}
      aside={
        notesOpen ? (
          <NotesPanel
            notes={highlights.noteMarks}
            onClose={() => setNotesOpen(false)}
            onChangeNote={highlights.updateNote}
            onDelete={highlights.remove}
            onLocate={(note) => scrollMarkIntoView(passagePaneRef.current, note.id) || scrollBlockIntoView(passagePaneRef.current, note.blockId, { flash: true })}
            blockLabel={(blockId) => blockId.replace('para-', '¶ ')}
            focusId={focusNoteId}
          />
        ) : null
      }
      footer={footer}
    >
      {body}
    </ExamFrame>
  )
}
