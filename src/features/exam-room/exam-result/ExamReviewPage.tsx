/**
 * ExamReviewPage.tsx — /exam-result/:resultId/review?s=<phần>&q=<câu> · XEM LẠI TỪNG CÂU "SOI BẰNG CHỨNG"
 * ----------------------------------------------------------------------------
 * Toàn màn hình, cùng khung với lúc thi (người học nhận ra ngay chỗ mình đã làm):
 *   - Reading: bài đọc bên trái, câu chứa đáp án được tô (nhãn "Q5"); câu đang xem tô đậm.
 *   - Listening: lời thoại (giờ mới mở) + nút nghe lại Part, dòng chứa đáp án được tô.
 *   - Vocabulary: 1 cột.
 *   - Cột phải: câu hỏi ở chế độ xem lại (đúng xanh / chưa đúng cam san hô + đáp án)
 *     + dải EvidenceStrip dưới mỗi câu: "Tìm trong bài" / "Xem lời thoại" + "Giải thích"
 *     (câu hỏi nói ↔ trong bài, từ khoá để dò, cặp diễn đạt lại).
 *   - Thanh dưới đáy tô kết quả từng câu; đổi phần bằng nút trên header.
 * Mở được cả kết quả CŨ (đáp án dựng lại từ chữ — exam-result-model.reconstructAnswers).
 * Phím: Alt+←/→ câu trước/sau.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { ExamQuestion } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { EmptyState } from '../../../design-system/components/EmptyState'
import { IconButton } from '../../../design-system/components/IconButton'
import { SegmentedControl } from '../../../design-system/components/SegmentedControl'
import { api } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { useExamDisplay, type ExamDisplay } from '../../exam-ui/ExamDisplaySettings'
import { EvidenceStrip } from '../../exam-ui/EvidenceReview'
import { findEvidence, type EvidenceResult } from '../../exam-ui/evidence-finder'
import { useExamUiText } from '../../exam-ui/exam-ui-text'
import { ExamFrame } from '../../exam-ui/ExamFrame'
import { ExamQuestionList } from '../../exam-ui/ExamQuestionList'
import { MarkedText, scrollMarkIntoView, type TextMark } from '../../exam-ui/MarkedText'
import { QuestionNavigator, type NavigatorPart } from '../../exam-ui/QuestionNavigator'
import { SplitPane } from '../../exam-ui/SplitPane'
import { scrollBlockIntoView } from '../../exam-ui/text-selection'
import { ReadingPassageView } from '../../skill-reading/ReadingPassageView'
import '../../skill-reading/ReadingTaskPlayer.css'
import { formatAudioTime, useExamAudio } from '../exam-audio'
import { readLocalResult, type StoredExamResult } from '../exam-grading'
import { partBlocks, passageForView, transcriptLines } from '../exam-part-content'
import { buildResultView, type ResultPartView, type ResultSectionView } from '../exam-result-model'
import { skillTextKey, useExamRoomText } from '../exam-room-text'
import '../exam-room.css'
import '../exam-runner/exam-runner.css'
import { focusQuestion } from '../exam-runner/runner-shared'
import './exam-result.css'

export function ExamReviewPage() {
  const { resultId = '' } = useParams()
  const text = useExamRoomText()
  const [result, setResult] = useState<StoredExamResult | null | 'error'>(null)

  useEffect(() => {
    let alive = true
    if (resultId === 'local') {
      setResult(readLocalResult() ?? 'error')
      return
    }
    api
      .getExamResult(Number(resultId))
      .then((data) => alive && setResult(data.result as StoredExamResult))
      .catch(() => alive && setResult('error'))
    return () => {
      alive = false
    }
  }, [resultId])

  if (result === null) return <div className="xr-fullscreen-empty" aria-busy="true" />
  if (result === 'error') {
    return (
      <div className="xr-fullscreen-empty">
        <EmptyState pose="thinking" title={text('resultNotFound')} text={text('resultNotFoundText')} action={<Button to="/exams">{text('backToExams')}</Button>} />
      </div>
    )
  }
  return <ReviewContent result={result} resultId={resultId} />
}

function ReviewContent({ result, resultId }: { result: StoredExamResult; resultId: string }) {
  const text = useExamRoomText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const display = useExamDisplay()
  const [params, setParams] = useSearchParams()
  const view = useMemo(() => buildResultView(result), [result])
  const sections = view.sections.filter((section) => section.parts.length > 0)
  const backToResult = () => navigate(`/exam-result/${resultId}`)

  const requested = Number(params.get('s'))
  const section = sections.find((candidate) => candidate.index === requested) ?? sections[0]
  const questions = useMemo(() => section?.parts.flatMap((part) => part.part.questions) ?? [], [section])
  const firstWrong = questions.find((question) => !section?.parts.some((part) => part.grade.results[question.id]?.isCorrect))
  const currentId = (questions.some((question) => question.id === params.get('q')) ? params.get('q') : null) ?? firstWrong?.id ?? questions[0]?.id ?? null

  const select = useCallback(
    (questionId: string, sectionIndex = section?.index) => {
      setParams({ s: String(sectionIndex ?? 0), q: questionId }, { replace: true })
      focusQuestion(questionId)
    },
    [setParams, section],
  )
  const step = useCallback(
    (delta: number) => {
      const index = questions.findIndex((question) => question.id === currentId)
      const next = questions[Math.max(0, Math.min(questions.length - 1, index + delta))]
      if (next) select(next.id)
    },
    [questions, currentId, select],
  )
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!event.altKey || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return
      event.preventDefault()
      step(event.key === 'ArrowRight' ? 1 : -1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [step])

  const title = text('reviewTitle', { exam: view.exam ? pick(view.exam.title) : result.examId })
  if (!section || !view.exam) {
    return (
      <ExamFrame display={display} variant="standalone" title={title} onExit={backToResult} exitLabel={text('backToResult')}>
        <div className="xr-fullscreen-empty">
          <EmptyState pose="reading" title={text('noObjective')} action={<Button onClick={backToResult}>{text('backToResult')}</Button>} />
        </div>
      </ExamFrame>
    )
  }

  const navigatorParts: NavigatorPart[] = section.parts.map((part) => ({
    id: part.key,
    label: part.part.title,
    questions: part.part.questions.map((question) => {
      const graded = part.grade.results[question.id]
      return { id: question.id, number: question.number, answered: !graded?.isBlank, result: graded?.isCorrect ? 'correct' : 'incorrect' }
    }),
  }))
  const part = section.parts.find((candidate) => candidate.part.questions.some((question) => question.id === currentId)) ?? section.parts[0]

  return (
    <ReviewPartScreen
      key={part.key}
      title={title}
      display={display}
      section={section}
      sections={sections}
      part={part}
      answers={view.answers}
      currentId={currentId}
      onSelect={select}
      onExit={backToResult}
      footer={<QuestionNavigator parts={navigatorParts} currentId={currentId} onSelect={(id) => select(id)} onPrev={() => step(-1)} onNext={() => step(1)} primaryAction={{ label: text('backToResult'), onClick: backToResult, icon: 'arrow-right' }} />}
    />
  )
}

interface ReviewPartScreenProps {
  title: string
  display: ExamDisplay
  section: ResultSectionView
  sections: ResultSectionView[]
  part: ResultPartView
  answers: Record<string, string>
  currentId: string | null
  onSelect: (questionId: string, sectionIndex?: number) => void
  onExit: () => void
  footer: ReactNode
}

function ReviewPartScreen({ title, display, section, sections, part, answers, currentId, onSelect, onExit, footer }: ReviewPartScreenProps) {
  const text = useExamRoomText()
  const uiText = useExamUiText()
  const { pick } = useLanguage()
  const startPaneRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const passage = useMemo(() => passageForView(part.part), [part])
  const lines = useMemo(() => transcriptLines(part.part.audioScript, part.key), [part])
  const blocks = useMemo(() => partBlocks(part.part, part.key), [part])
  const isListening = !!part.part.audioScript

  /* ---------- bằng chứng cho từng câu ---------- */
  const evidence = useMemo(() => {
    const map = new Map<string, EvidenceResult>()
    for (const question of part.part.questions) map.set(question.id, findEvidence({ question, blocks, preferredGroup: question.paragraphLabel }))
    return map
  }, [part, blocks])
  const marks = useMemo<TextMark[]>(() => {
    const list: TextMark[] = []
    for (const question of part.part.questions) {
      const found = evidence.get(question.id)
      if (!found?.sentence) continue
      const active = question.id === currentId
      list.push({ id: `ev-${question.id}`, ...found.sentence, kind: 'evidence', label: `Q${question.number}`, active })
      found.phrases.forEach((phrase, index) => list.push({ id: `evp-${question.id}-${index}`, ...phrase, kind: 'evidence-phrase', active }))
    }
    return list
  }, [part, evidence, currentId])

  const locate = useCallback(
    (question: ExamQuestion) => {
      window.requestAnimationFrame(() => {
        if (scrollMarkIntoView(startPaneRef.current, `ev-${question.id}`)) return
        const blockId = evidence.get(question.id)?.blockId
        if (blockId) scrollBlockIntoView(startPaneRef.current, blockId, { flash: true })
      })
    },
    [evidence],
  )
  // mở màn / đổi câu -> cột trái cuộn tới bằng chứng của câu đang xem
  useEffect(() => {
    const question = part.part.questions.find((candidate) => candidate.id === currentId)
    if (question) locate(question)
    if (currentId) focusQuestion(currentId, 'auto')
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ khi đổi câu
  }, [currentId])

  /* ---------- nghe lại Part (lời thoại đã mở) ---------- */
  const audio = useExamAudio()
  const playing = audio.view.status === 'playing' || audio.view.status === 'loading'

  const questionsPane = (
    <div className="xr-qpane">
      <div className="xr-part-banner">
        <strong>{part.part.title}</strong>
        <span>{uiText('correctCount', { correct: part.grade.correct, total: part.grade.total })}</span>
      </div>
      <ExamQuestionList
        groups={part.groups}
        intro={part.intro}
        answers={answers}
        currentId={currentId}
        onFocusQuestion={(id) => onSelect(id)}
        review={part.grade.results}
        renderAfterQuestion={(question) => {
          const graded = part.grade.results[question.id]
          if (!graded) return null
          const found = evidence.get(question.id)
          const block = found?.sentence ? blocks.find((candidate) => candidate.id === found.sentence!.blockId) : null
          const where = question.paragraphLabel ?? block?.group
          return (
            <EvidenceStrip
              result={graded}
              explanation={pick(question.explanation)}
              explanationEn={question.explanation?.en}
              questionText={question.prompt}
              evidenceText={block && found?.sentence ? block.text.slice(found.sentence.start, found.sentence.end) : null}
              evidenceWhere={where ? uiText('evidenceInParagraph', { label: where }) : undefined}
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
                  icon: 'eye',
                  label: isListening ? uiText('locateInTranscript') : uiText('locate'),
                  active: question.id === currentId,
                  onClick: () => {
                    onSelect(question.id)
                    locate(question)
                  },
                },
              ]}
            />
          )
        }}
      />
    </div>
  )

  const startPane = passage ? (
    <ReadingPassageView passage={passage} marks={marks} onWordTap={null} />
  ) : isListening ? (
    <div className="xr-transcript">
      <div className="xr-transcript__player">
        <IconButton
          icon={playing ? 'pause' : 'play-fill'}
          variant="primary"
          label={playing ? text('pause') : text('listenAgain')}
          onClick={() => (playing ? audio.pause() : audio.view.key === part.key && audio.resume() ? undefined : void audio.play(part.key, part.part.audioScript!))}
        />
        <span className="xr-transcript__player-text">
          <strong>{text('listenAgain')}</strong>
          <span className="ds-num">
            {formatAudioTime(audio.view.key === part.key ? audio.view.currentTime : 0)} / {formatAudioTime(audio.view.key === part.key ? audio.view.duration : 0)}
          </span>
        </span>
        <div className="xr-listen__bar is-seekable" onClick={(event) => {
          if (audio.view.key !== part.key) return
          const rect = event.currentTarget.getBoundingClientRect()
          audio.seekTo(((event.clientX - rect.left) / rect.width) * audio.view.duration)
        }} aria-hidden>
          <span style={{ width: `${audio.view.key === part.key && audio.view.duration ? (audio.view.currentTime / audio.view.duration) * 100 : 0}%` }} />
        </div>
      </div>
      <h2 className="xr-transcript__title">{text('transcript')}</h2>
      <div className="xr-transcript__lines">
        {lines.map((line) => (
          <div key={line.id} className="xr-transcript__line">
            {line.speaker && <span className="xr-transcript__speaker">{line.speaker}</span>}
            <MarkedText as="p" className="xr-transcript__text" blockId={line.id} text={line.text} marks={marks} />
          </div>
        ))}
      </div>
    </div>
  ) : null

  return (
    <ExamFrame
      display={display}
      variant="standalone"
      className="xr-frame"
      title={title}
      skill={section.skill === 'vocabulary' ? undefined : (section.skill as 'listening' | 'reading')}
      onExit={onExit}
      exitLabel={text('backToResult')}
      tools={
        sections.length > 1 ? (
          <SegmentedControl
            label={text('sectionPicker')}
            size="sm"
            value={section.index}
            onChange={(index) => {
              const target = sections.find((candidate) => candidate.index === index)
              const first = target?.parts[0]?.part.questions[0]
              if (first) onSelect(first.id, index)
            }}
            options={sections.map((candidate) => ({ value: candidate.index, label: text(skillTextKey(candidate.skill)) }))}
          />
        ) : undefined
      }
      footer={footer}
    >
      {startPane ? (
        <SplitPane start={startPane} end={questionsPane} startRef={startPaneRef} startLabel={passage?.title ?? text('transcript')} endLabel={part.part.title} defaultRatio={isListening ? 0.42 : 0.52} storageKey={isListening ? 'exam-room-review-listening' : 'exam-room-review-reading'} />
      ) : (
        <div className="xr-single">{questionsPane}</div>
      )}
    </ExamFrame>
  )
}
