/**
 * ReadingTaskPlayer.tsx — TRÌNH LÀM BÀI ĐỌC (lesson.mode = 'reading')
 * ----------------------------------------------------------------------------
 * Được trình học (lesson-player) mở qua bảng đăng ký skill-task-registry
 * (register-skill-tasks.ts). Nhận SkillTaskProps: lesson, resumeData, onSaveResume, onComplete.
 *
 * 3 pha:
 *   1. intro      — bài có examMinutes: chọn "Luyện thoải mái" hay "Thi thật · N phút".
 *   2. answering  — 2 cột kéo được: bài đọc (Source Serif 4, nhãn đoạn) | câu hỏi.
 *                   Bôi đen chữ -> "Tô vàng | Ghi chú" (cột ghi chú bên phải).
 *                   Luyện tập: bấm 1 từ -> nghĩa tiếng Việt hiện ngay trên từ + "Lưu vào sổ từ".
 *                   Thi thật: đồng hồ "Còn N phút" (êm), hết giờ tự nộp, không tra từ/gợi ý.
 *                   Thanh câu hỏi dưới đáy (đã làm / đang xem / gắn cờ) + màn kiểm tra trước khi nộp.
 *   3. review     — chấm + ghi tiến độ; % theo dạng câu; từng câu có "Tìm trong bài"
 *                   (cuộn tới đoạn, tô bằng chứng "Q5") và "Giải thích" (câu hỏi ↔ trong bài,
 *                   từ khoá để dò, cặp diễn đạt lại rút từ lời giải). "Tiếp tục" -> onComplete.
 *
 * Phím tắt: Alt+←/→ câu trước/sau · 1–9 chọn đáp án câu đang xem · Ctrl+Enter kiểm tra & nộp
 *           · Esc đóng nghĩa từ.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ExamQuestion } from '../../content/content-types'
import { Icon } from '../../design-system/components/Icon'
import { playAudioLine } from '../../services/text-to-speech'
import { useLanguage } from '../../translations/language-context'
import type { SkillTaskProps } from '../lesson-player/skill-task-registry'
import { gradeAll, isAnswered } from '../exam-ui/answer-grading'
import { CalmExamTimer, useExamCountdown } from '../exam-ui/CalmExamTimer'
import { EvidenceStrip } from '../exam-ui/EvidenceReview'
import { findEvidence, type EvidenceResult, type TextBlock } from '../exam-ui/evidence-finder'
import { QUESTION_TYPE_NAMES, useExamUiText } from '../exam-ui/exam-ui-text'
import { useExamDisplay } from '../exam-ui/ExamDisplaySettings'
import { ExamFrame, FrameTool, ModeBadge, NoteIcon } from '../exam-ui/ExamFrame'
import { ExamQuestionList } from '../exam-ui/ExamQuestionList'
import { NotesPanel, SelectionToolbar, useHighlightNotes, type UserMark } from '../exam-ui/HighlightNotesLayer'
import { isIeltsTaskLesson, useLessonTaskRecorder } from '../exam-ui/lesson-task-recording'
import { scrollMarkIntoView, type TextMark } from '../exam-ui/MarkedText'
import { answerValueFor, buildQuestionGroups, choicesOf } from '../exam-ui/question-grouping'
import { QuestionNavigator, type NavigatorPart } from '../exam-ui/QuestionNavigator'
import { ReviewBeforeSubmit } from '../exam-ui/ReviewBeforeSubmit'
import { SplitPane } from '../exam-ui/SplitPane'
import { TaskIntro } from '../exam-ui/TaskIntro'
import { TaskResultSummary } from '../exam-ui/TaskResultSummary'
import { scrollBlockIntoView, type BlockRange } from '../exam-ui/text-selection'
import { useTaskSession } from '../exam-ui/use-task-session'
import { paragraphBlockId, ReadingPassageView, type PassageLookup } from './ReadingPassageView'
import { readingSummary, useReadingText } from './skill-reading-text'
import { useSavedWords } from './use-saved-words'
import { WordLookupBubble } from './WordLookupBubble'
import { lookupWord, prepareWordLookup, type WordMeaning } from './word-lookup'
import './ReadingTaskPlayer.css'

export default function ReadingTaskPlayer(props: SkillTaskProps) {
  if (!props.lesson.readingTask) return null
  return <ReadingTaskView {...props} />
}

function ReadingTaskView({ lesson, resumeData, onSaveResume, onComplete }: SkillTaskProps) {
  const task = lesson.readingTask!
  const text = useReadingText()
  const uiText = useExamUiText()
  const { pick, language } = useLanguage()
  const display = useExamDisplay()
  const examSeconds = task.examMinutes ? task.examMinutes * 60 : null
  const session = useTaskSession(resumeData, onSaveResume, { defaultMode: 'practice' })
  const { state } = session
  const isExam = state.mode === 'exam' && !!examSeconds
  const record = useLessonTaskRecorder()
  const savedWords = useSavedWords()
  // luyện tập: tải trước từ điển phụ để bấm từ là có nghĩa ngay (thi thật không tra từ)
  useEffect(() => {
    if (!isExam) void prepareWordLookup()
  }, [isExam])

  const passagePaneRef = useRef<HTMLDivElement>(null)
  const questionsPaneRef = useRef<HTMLDivElement>(null)
  const passageRef = useRef<HTMLDivElement>(null)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [focusNoteId, setFocusNoteId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [lookup, setLookup] = useState<(BlockRange & { meaning: WordMeaning; context: string }) | null>(null)
  const [timeUp, setTimeUp] = useState(false)

  /* ---------- bài đọc: khối + chữ ---------- */
  const blocks = useMemo<TextBlock[]>(
    () => task.passage.paragraphs.map((paragraph, index) => ({ id: paragraphBlockId(paragraph.label, index), text: paragraph.text, group: paragraph.label })),
    [task.passage],
  )
  const textOf = useCallback((blockId: string) => blocks.find((block) => block.id === blockId)?.text ?? '', [blocks])
  const wordCount = useMemo(() => blocks.reduce((sum, block) => sum + block.text.split(/\s+/).length, 0), [blocks])

  /* ---------- tô vàng + ghi chú (lưu cùng resume) ---------- */
  const saveMarks = useCallback((marks: UserMark[]) => session.patch({ marks }), [session])
  const highlights = useHighlightNotes(state.marks, saveMarks, textOf)

  /* ---------- câu hỏi ---------- */
  const grouped = useMemo(() => buildQuestionGroups(task.instructions, task.questions), [task])
  const visibleGroups = useMemo(() => {
    if (!state.retryIds || state.phase !== 'answering') return grouped.groups
    const keep = new Set(state.retryIds)
    return grouped.groups.map((group) => ({ ...group, questions: group.questions.filter((q) => keep.has(q.id)) })).filter((group) => group.questions.length > 0)
  }, [grouped, state.retryIds, state.phase])
  const orderedQuestions = useMemo(() => visibleGroups.flatMap((group) => group.questions), [visibleGroups])

  /* ---------- chấm + bằng chứng ---------- */
  const summary = useMemo(() => gradeAll(grouped.groups, state.answers), [grouped, state.answers])
  // KHÔNG hiện band sau 1 task (luật D6.23) — bài IELTS chỉ nhắc "band ở trang Tiến độ khi đủ 20 câu"
  const bandLater = isIeltsTaskLesson(lesson.id)
  const evidence = useMemo(() => {
    const map = new Map<string, EvidenceResult>()
    for (const question of task.questions) map.set(question.id, findEvidence({ question, blocks, preferredGroup: question.paragraphLabel }))
    return map
  }, [task.questions, blocks])
  const evidenceMarks = useMemo<TextMark[]>(() => {
    if (state.phase !== 'review') return []
    const marks: TextMark[] = []
    for (const question of task.questions) {
      const found = evidence.get(question.id)
      if (!found?.sentence) continue
      const active = question.id === activeId
      marks.push({ id: `ev-${question.id}`, ...found.sentence, kind: 'evidence', label: `Q${question.number}`, active })
      found.phrases.forEach((phrase, index) => marks.push({ id: `evp-${question.id}-${index}`, ...phrase, kind: 'evidence-phrase', active }))
    }
    return marks
  }, [state.phase, task.questions, evidence, activeId])
  const allMarks = useMemo(() => [...highlights.textMarks, ...evidenceMarks], [highlights.textMarks, evidenceMarks])

  /* ---------- đồng hồ thi thật ---------- */
  const autoSubmitRef = useRef<() => void>(() => {})
  const { secondsLeft, tone } = useExamCountdown(state.secondsLeft ?? examSeconds ?? 0, {
    running: isExam && state.phase === 'answering',
    onExpire: () => autoSubmitRef.current(),
  })
  // lưu số giây còn lại mỗi 15 giây (đóng tab mở lại vẫn đúng giờ)
  useEffect(() => {
    if (isExam && state.phase === 'answering' && secondsLeft % 15 === 0) session.patch({ secondsLeft })
  }, [isExam, state.phase, secondsLeft, session])

  /* ---------- tra từ (luyện tập) ---------- */
  const tapWord = useCallback(
    (hit: BlockRange & { word: string }) => {
      if (lookup && lookup.blockId === hit.blockId && lookup.start === hit.start) return setLookup(null)
      const blockText = textOf(hit.blockId)
      // câu chứa từ = ngữ cảnh khi lưu vào sổ
      const before = blockText.slice(0, hit.start).search(/[^.!?]*$/)
      const afterMatch = blockText.slice(hit.end).match(/[.!?]/)
      const context = blockText.slice(Math.max(0, before), afterMatch ? hit.end + (afterMatch.index ?? 0) + 1 : blockText.length).trim()
      setLookup({ ...hit, meaning: lookupWord(hit.word, lesson), context })
    },
    [lookup, textOf, lesson],
  )
  useEffect(() => {
    if (!lookup) return
    // pha 'capture' + preventDefault: Esc chỉ đóng nghĩa từ, KHÔNG kích hoạt 'thoát bài' của FocusLayout
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setLookup(null)
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [lookup])

  const passageLookup = useMemo<PassageLookup | null>(() => {
    if (!lookup) return null
    const { meaning } = lookup
    const saved = savedWords.isSaved(meaning.headword)
    return {
      blockId: lookup.blockId,
      start: lookup.start,
      end: lookup.end,
      render: (wordNode) => (
        <span className="xlookup">
          <WordLookupBubble>
            <span className={meaning.meaningVi ? 'xlookup__meaning' : 'xlookup__meaning is-unknown'}>{meaning.meaningVi ?? text('lookupUnknown')}</span>
            <button type="button" className="xlookup__btn xlookup__btn--icon" aria-label={text('lookupListen')} title={text('lookupListen')} onClick={() => playAudioLine({ text: meaning.headword })}>
              <Icon name="volume" size={14} />
            </button>
            <button
              type="button"
              className={saved ? 'xlookup__btn is-saved' : 'xlookup__btn'}
              onClick={() => !saved && savedWords.save({ word: meaning.headword, meaningVi: meaning.meaningVi, wordId: meaning.wordId, context: lookup.context, lessonId: lesson.id })}
            >
              <Icon name={saved ? 'check' : 'plus'} size={13} strokeWidth={2.5} />
              {saved ? text('lookupSaved') : text('lookupSave')}
            </button>
          </WordLookupBubble>
          <span className="xlookup__word">{wordNode}</span>
        </span>
      ),
    }
  }, [lookup, savedWords, text, lesson.id])

  /* ---------- điều hướng ---------- */
  const currentId = state.currentId ?? orderedQuestions[0]?.id ?? null

  const focusQuestion = useCallback((questionId: string) => {
    const element = questionsPaneRef.current?.querySelector<HTMLElement>(`#xq-${CSS.escape(questionId)}`)
    if (!element) return
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    element.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
    element.querySelector<HTMLElement>('input:not([disabled]):not([readonly]), input:checked, button')?.focus({ preventScroll: true })
  }, [])

  const locateInPassage = useCallback(
    (question: ExamQuestion) => {
      setActiveId(question.id)
      window.requestAnimationFrame(() => {
        if (scrollMarkIntoView(passagePaneRef.current, `ev-${question.id}`)) return
        const label = question.paragraphLabel
        const index = task.passage.paragraphs.findIndex((paragraph) => paragraph.label === label)
        if (index >= 0) scrollBlockIntoView(passagePaneRef.current, paragraphBlockId(label, index), { flash: true })
      })
    },
    [task.passage.paragraphs],
  )

  const goTo = useCallback(
    (questionId: string) => {
      session.setCurrent(questionId)
      focusQuestion(questionId)
      if (state.phase === 'review') {
        const question = task.questions.find((q) => q.id === questionId)
        if (question) locateInPassage(question)
      }
    },
    [session, focusQuestion, state.phase, task.questions, locateInPassage],
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
  const start = useCallback(() => session.start(examSeconds ? state.mode : 'practice', examSeconds), [session, state.mode, examSeconds])

  const submit = useCallback(() => {
    setReviewOpen(false)
    setLookup(null)
    const result = gradeAll(grouped.groups, session.state.answers)
    if (session.state.submitCount === 0) {
      record({
        lesson,
        skill: 'reading',
        groups: grouped.groups,
        summary: result,
        explanationOf: pick,
        contextOf: (questionId) => {
          const question = task.questions.find((q) => q.id === questionId)
          const paragraph = task.passage.paragraphs.find((p) => p.label && p.label === question?.paragraphLabel)
          return paragraph ? `[${paragraph.label}] ${paragraph.text}` : undefined
        },
      })
    }
    session.submit({ correct: result.correct, total: result.total })
    const firstWrong = grouped.groups.flatMap((g) => g.questions).find((q) => !result.results[q.id]?.isCorrect)
    if (firstWrong) locateInPassage(firstWrong)
    window.requestAnimationFrame(() => questionsPaneRef.current?.scrollTo({ top: 0 }))
  }, [grouped, session, record, lesson, pick, task, locateInPassage])

  autoSubmitRef.current = () => {
    setTimeUp(true)
    submit()
  }

  const wrongIds = useMemo(() => Object.values(summary.results).filter((r) => !r.isCorrect).map((r) => r.questionId), [summary])
  // mở lại bài khi đang ở màn xem lại: chọn sẵn câu sai đầu tiên để thấy ngay bằng chứng (không cuộn)
  const preselected = useRef(false)
  useEffect(() => {
    if (preselected.current) return
    preselected.current = true
    if (state.phase === 'review' && activeId === null && wrongIds.length) setActiveId(wrongIds[0])
  }, [state.phase, activeId, wrongIds])

  const complete = useCallback(() => {
    if (session.state.completed) return
    session.patch({ completed: true }, true)
    const first = session.state.firstScore ?? { correct: summary.correct, total: summary.total }
    const mistakes = grouped.groups
      .flatMap((g) => g.questions)
      .filter((q) => !summary.results[q.id]?.isCorrect)
      .slice(0, 5)
      .map((q) => ({ itemId: q.id, question: `Q${q.number}. ${q.prompt}`, userAnswer: summary.results[q.id].userText, correctAnswer: summary.results[q.id].correctText, explanation: q.explanation }))
    onComplete({
      correct: first.correct,
      total: first.total,
      mistakes,
      summary: readingSummary(first.correct, first.total),
      minutes: Math.max(1, Math.round(session.state.activeSeconds / 60)),
    })
  }, [session, summary, grouped, onComplete])

  const retryWrong = useCallback(() => {
    session.retryWrong(wrongIds)
    setActiveId(null)
    setTimeUp(false)
    window.requestAnimationFrame(() => questionsPaneRef.current?.scrollTo({ top: 0 }))
  }, [session, wrongIds])

  /* ---------- phím tắt ---------- */
  useEffect(() => {
    if (state.phase === 'intro') return
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || reviewOpen) return
      const target = event.target as HTMLElement
      const typing = !!target.closest('input[type="text"], input:not([type]), textarea, [contenteditable="true"]')
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
      if (/^[1-9]$/.test(event.key) && state.phase === 'answering' && !event.ctrlKey && !event.altKey && !event.metaKey) {
        const question = orderedQuestions.find((q) => q.id === currentId)
        if (!question || question.kind === 'gap-fill') return
        const index = Number(event.key) - 1
        if (index < choicesOf(question).length) session.setAnswer(question.id, answerValueFor(question, index))
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [state.phase, reviewOpen, step, orderedQuestions, currentId, session])

  /* ---------- thanh câu hỏi ---------- */
  const flags = useMemo(() => new Set(state.flags), [state.flags])
  const navigatorParts = useMemo<NavigatorPart[]>(
    () => [
      {
        id: 'passage',
        label: text('passagePane'),
        questions: orderedQuestions.map((question) => {
          const result = state.phase === 'review' ? summary.results[question.id] : undefined
          return {
            id: question.id,
            number: question.number,
            answered: isAnswered(state.answers, question.id),
            flagged: flags.has(question.id),
            result: result ? (result.isCorrect ? 'correct' : 'incorrect') : undefined,
          }
        }),
      },
    ],
    [orderedQuestions, state.phase, state.answers, summary, flags, text],
  )
  const answeredCount = orderedQuestions.filter((q) => isAnswered(state.answers, q.id)).length

  /* ============================== VẼ ============================== */

  const title = pick(lesson.title)
  const isIelts = /^l(2b|3)-i-/.test(lesson.id)
  const typeName = (typeId: string) => QUESTION_TYPE_NAMES[typeId]?.[language] ?? typeId

  if (state.phase === 'intro') {
    return (
      <ExamFrame display={display} variant="embedded" title={title} skill="reading">
        <TaskIntro
          skill="reading"
          eyebrow={isIelts ? text('eyebrow') : text('eyebrowGeneral')}
          title={task.passage.title}
          description={pick(lesson.description)}
          facts={[
            { icon: 'exam', text: text('questionsCount', { n: task.questions.length }) },
            { icon: 'learn', text: text('wordsCount', { n: wordCount }) },
            ...(task.examMinutes ? [{ icon: 'clock' as const, text: text('minutes', { n: task.examMinutes }) }] : []),
          ]}
          modeGroupLabel={text('modeGroup')}
          modes={
            examSeconds
              ? [
                  { id: 'practice' as const, title: text('practiceTitle'), points: [text('practicePoint1'), text('practicePoint2'), text('practicePoint3')] },
                  { id: 'exam' as const, title: text('examTitle', { n: task.examMinutes! }), points: [text('examPoint1'), text('examPoint2'), text('examPoint3')] },
                ]
              : []
          }
          mode={state.mode}
          onModeChange={(mode) => session.patch({ mode }, true)}
          tipTitle={task.strategyTip ? text('strategy') : undefined}
          tip={task.strategyTip ? pick(task.strategyTip) : undefined}
          onStart={start}
          startLabel={text('start')}
          mascotPose="reading"
        />
      </ExamFrame>
    )
  }

  const reviewing = state.phase === 'review'
  const canLookup = !isExam && !reviewing

  const leftPane = (
    <>
      <ReadingPassageView
        ref={passageRef}
        passage={task.passage}
        marks={allMarks}
        lookup={canLookup ? passageLookup : null}
        onWordTap={canLookup ? tapWord : null}
        onNoteClick={(mark) => {
          setNotesOpen(true)
          setFocusNoteId(mark.id)
        }}
        hint={reviewing ? null : canLookup ? text('tapHint') : text('selectHint')}
      />
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
  )

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
  const tfngWrong = results.filter((r) => !r.isCorrect && (r.typeId === 'tfng' || r.typeId === 'ynng')).length
  const improve = [
    results.filter((r) => r.isBlank).length > 0 && text('improveBlank', { n: results.filter((r) => r.isBlank).length }),
    tfngWrong >= 2 && text('improveTfng'),
    results.filter((r) => r.nearMiss).length > 0 && text('improveSpelling', { n: results.filter((r) => r.nearMiss).length }),
    wrongIds.length > 0 && text('improveLocate'),
  ].filter((item): item is string => !!item)

  const rightPane = (
    <div className="xread-right">
      {reviewing && timeUp && <p className="xread-timeup">{uiText('timeUp')}</p>}
      {reviewing && (
        <TaskResultSummary
          summary={summary}
          bandLater={bandLater}
          typeName={typeName}
          wentWell={wentWell}
          improve={improve.slice(0, 2)}
          primary={{ label: text('continue'), onClick: complete }}
          secondary={wrongIds.length > 0 ? { label: text('retryWrong'), onClick: retryWrong } : null}
        />
      )}
      {state.retryIds && !reviewing && <p className="xread-retry-note">{text('retrying', { n: state.retryIds.length })}</p>}
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
        renderAfterQuestion={
          reviewing
            ? (question) => {
                const result = summary.results[question.id]
                if (!result) return null
                const found = evidence.get(question.id)
                const block = found?.sentence ? blocks.find((b) => b.id === found.sentence!.blockId) : null
                const where = question.paragraphLabel ?? block?.group
                return (
                  <EvidenceStrip
                    result={result}
                    explanation={pick(question.explanation)}
                    explanationEn={question.explanation?.en}
                    questionText={question.prompt}
                    evidenceText={block && found?.sentence ? block.text.slice(found.sentence.start, found.sentence.end) : null}
                    evidenceWhere={where ? text('paragraph', { label: where }) : undefined}
                    expanded={expanded.has(question.id)}
                    onToggle={() =>
                      setExpanded((current) => {
                        const next = new Set(current)
                        if (next.has(question.id)) next.delete(question.id)
                        else next.add(question.id)
                        return next
                      })
                    }
                    actions={[{ icon: 'eye', label: uiText('locate'), active: activeId === question.id, onClick: () => locateInPassage(question) }]}
                  />
                )
              }
            : undefined
        }
      />
    </div>
  )

  const notes = notesOpen ? (
    <NotesPanel
      notes={highlights.noteMarks}
      onClose={() => setNotesOpen(false)}
      onChangeNote={highlights.updateNote}
      onDelete={highlights.remove}
      onLocate={(note) => scrollMarkIntoView(passagePaneRef.current, note.id) || scrollBlockIntoView(passagePaneRef.current, note.blockId, { flash: true })}
      blockLabel={(blockId) => text('paragraph', { label: blockId.replace('para-', '') })}
      focusId={focusNoteId}
    />
  ) : null

  return (
    <ExamFrame
      display={display}
      variant="embedded"
      title={title}
      skill="reading"
      badge={<ModeBadge mode={reviewing ? (state.firstScore?.mode ?? 'practice') : isExam ? 'exam' : 'practice'} />}
      timer={isExam && !reviewing ? <CalmExamTimer secondsLeft={secondsLeft} tone={tone} /> : null}
      tone={isExam && !reviewing ? tone : 'calm'}
      tools={<FrameTool icon={<NoteIcon />} label={uiText('notes')} count={highlights.noteMarks.length} pressed={notesOpen} onClick={() => setNotesOpen((open) => !open)} />}
      aside={notes}
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
        start={leftPane}
        end={rightPane}
        startRef={passagePaneRef}
        endRef={questionsPaneRef}
        startLabel={text('passagePane')}
        endLabel={text('questionsPane')}
        defaultRatio={0.52}
        storageKey="reading"
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
