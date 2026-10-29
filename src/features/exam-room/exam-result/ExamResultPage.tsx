/**
 * ExamResultPage.tsx — /exam-result/:resultId · KẾT QUẢ 1 LẦN THI (mở được cả kết quả cũ)
 * ----------------------------------------------------------------------------
 * Thứ tự (04-DESIGN-SYSTEM mục 13 "Kết quả" + research ui-ielts-a ý 6, 10):
 *   1. Thẻ đầu: band tổng + tên band ("6.5 · Khá") / % + đạt-chưa đạt (test level) / level gợi ý
 *      (bài xếp lớp cũ) + "Bước tiếp theo" bằng lời thường (so band kế tiếp, kỹ năng nên ưu tiên)
 *      + 1 nút chính + 1 nút phụ.
 *   2. Điểm từng kỹ năng (band hoặc số câu đúng) — bấm "Xem lại" mở màn soi bằng chứng.
 *   3. % đúng theo DẠNG câu hỏi + "Những điểm cần lưu ý".
 *   4. Nhận xét AI Writing (từng task) + bài mẫu tham khảo · Nhận xét AI Speaking (từng Part).
 *   5. Lưới số câu (xanh đúng / cam san hô chưa đúng) -> bấm mở màn xem lại đúng câu đó.
 * '/exam-result/local' = kết quả tạm trong máy khi chưa gửi được lên máy chủ (có nút "Thử lưu lại").
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findLevelInfo, LEVEL_ORDER } from '../../../content/all-levels'
import { levelIdFromLegacyOrder } from '../../../content/legacy-levels'
import { Badge, Button, Card, EmptyState, Icon, ProgressRing, SkillIcon, Skeleton } from '../../../design-system'
import { api } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { QUESTION_TYPE_NAMES, useExamUiText } from '../../exam-ui/exam-ui-text'
import { AiResultView } from '../../skill-writing/feedback/AiResultView'
import { formatResultDate } from '../exam-list/ExamListPage'
import { forgetLocalResult, readLocalResult, type StoredExamResult } from '../exam-grading'
import { buildResultView, formatBand, minutesSpent, type ResultSectionView, type ResultView } from '../exam-result-model'
import { bandName, skillTextKey, useExamRoomText } from '../exam-room-text'
import '../exam-room.css'
import './exam-result.css'

type LoadState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; result: StoredExamResult; createdAt: string | null; isLocal: boolean }

export function ExamResultPage() {
  const { resultId = '' } = useParams()
  const text = useExamRoomText()
  const [state, setState] = useState<LoadState>({ status: 'loading' })

  useEffect(() => {
    let alive = true
    if (resultId === 'local') {
      const local = readLocalResult()
      setState(local ? { status: 'ready', result: local, createdAt: local.finishedAt, isLocal: true } : { status: 'error' })
      return
    }
    setState({ status: 'loading' })
    api
      .getExamResult(Number(resultId))
      .then((data) => alive && setState({ status: 'ready', result: data.result as StoredExamResult, createdAt: data.createdAt, isLocal: false }))
      .catch(() => alive && setState({ status: 'error' }))
    return () => {
      alive = false
    }
  }, [resultId])

  if (state.status === 'loading') {
    return (
      <div className="xr-page">
        <Skeleton variant="rect" height={220} />
        <Skeleton variant="rect" height={140} />
        <Skeleton variant="text" lines={4} />
      </div>
    )
  }
  if (state.status === 'error') {
    return (
      <div className="xr-page">
        <EmptyState pose="thinking" title={text('resultNotFound')} text={text('resultNotFoundText')} action={<Button to="/exams">{text('backToExams')}</Button>} />
      </div>
    )
  }
  return <ResultContent result={state.result} createdAt={state.createdAt} isLocal={state.isLocal} resultId={resultId} />
}

function ResultContent({ result, createdAt, isLocal, resultId }: { result: StoredExamResult; createdAt: string | null; isLocal: boolean; resultId: string }) {
  const text = useExamRoomText()
  const uiText = useExamUiText()
  const { pick, language } = useLanguage()
  const navigate = useNavigate()
  const view = useMemo(() => buildResultView(result), [result])
  const { exam } = view
  const reviewUrl = (sectionIndex?: number, questionId?: string) => {
    const params = new URLSearchParams()
    if (sectionIndex !== undefined) params.set('s', String(sectionIndex))
    if (questionId) params.set('q', questionId)
    const query = params.toString()
    return `/exam-result/${resultId}/review${query ? `?${query}` : ''}`
  }
  const objectiveSections = view.sections.filter((section) => section.parts.length > 0)
  const canReview = !!exam && objectiveSections.length > 0
  const minutes = minutesSpent(result)

  /* ---------- thẻ đầu ---------- */
  const level = exam?.levelId ? findLevelInfo(exam.levelId) : undefined
  const isLastLevel = level ? LEVEL_ORDER.indexOf(level.id) === LEVEL_ORDER.length - 1 : false
  const placementLevel = result.placement ? findLevelInfo(levelIdFromLegacyOrder(result.placement.recommendedLevelOrder)) : undefined
  const weakest = view.weakestSkill
  const nextStep = weakest
    ? view.nextBand !== null
      ? text('nextStepBand', { next: formatBand(view.nextBand), skill: text(skillTextKey(weakest)), tip: text(`tip_${weakest}`) })
      : text('nextStepLevel', { skill: text(skillTextKey(weakest)), tip: text(`tip_${weakest}`) })
    : null

  let primary: { label: string; to?: string; onClick?: () => void; icon?: 'arrow-right' | 'review' | 'retry' | 'eye' }
  let secondary: { label: string; to: string; icon?: 'arrow-right' | 'review' | 'retry' | 'eye' } | null
  if (result.levelTest?.passed) {
    primary = { label: text('continueLearning'), to: '/learn', icon: 'arrow-right' }
    secondary = canReview ? { label: text('reviewAnswers'), to: reviewUrl(), icon: 'eye' } : null
  } else if (result.levelTest) {
    primary = { label: text('practiceMistakes'), to: '/mistakes?practice=1', icon: 'review' }
    secondary = canReview ? { label: text('reviewAnswers'), to: reviewUrl(), icon: 'eye' } : { label: text('backToExams'), to: '/exams' }
  } else if (placementLevel) {
    primary = { label: text('continueLearning'), to: '/learn', icon: 'arrow-right' }
    secondary = canReview ? { label: text('reviewAnswers'), to: reviewUrl(), icon: 'eye' } : null
  } else {
    primary = canReview ? { label: text('reviewAnswers'), to: reviewUrl(), icon: 'eye' } : { label: text('retakeExam'), to: `/exam/${result.examId}`, icon: 'retry' }
    secondary = canReview ? { label: text('retakeExam'), to: `/exam/${result.examId}`, icon: 'retry' } : { label: text('backToExams'), to: '/exams' }
  }

  const takenSkills = new Set(view.sections.map((section) => section.skill))
  const fourSkillsTaken = ['listening', 'reading', 'writing', 'speaking'].every((skill) => takenSkills.has(skill as ResultSectionView['skill']))

  return (
    <div className="xr-page xr-result">
      <Button to="/exams" variant="ghost" size="sm" iconLeft={<Icon name="chevron-right" size={16} className="xr-flip" />} className="xr-result__back">
        {text('backToExams')}
      </Button>

      {isLocal && (
        <div className="xr-notice">
          <Icon name="clock" size={18} />
          <span className="xr-notice__text">{text('localResultNote')}</span>
          <LocalRetrySave result={result} onSaved={(id) => navigate(`/exam-result/${id}`, { replace: true })} />
        </div>
      )}
      {!exam && (
        <div className="xr-notice xr-notice--info">
          <Icon name="hint" size={18} />
          <span>{text('examGoneNote')}</span>
        </div>
      )}

      {/* ---------- 1. thẻ đầu ---------- */}
      <Card className="xr-hero" padding="lg">
        <div className="xr-hero__main">
          <span className="xr-eyebrow">
            {text('resultEyebrow')} · {exam ? (exam.kind === 'mock-ielts' ? text('eyebrow_mock') : exam.kind === 'level-test' ? text('eyebrow_level-test') : text('eyebrow_placement')) : result.examId}
          </span>
          <h1 className="xr-hero__title">{exam ? pick(exam.title) : result.examId}</h1>
          <p className="xr-hero__meta">
            {createdAt && <span>{text('takenOn', { date: formatResultDate(createdAt, language) })}</span>}
            {result.mode && <Badge tone={result.mode === 'exam' ? 'navy' : 'neutral'} size="sm">{text(result.mode === 'exam' ? 'modeExamTag' : 'modePracticeTag')}</Badge>}
            {minutes && <span>{text('timeSpent', { n: minutes })}</span>}
          </p>

          {result.levelTest && (
            <p className={result.levelTest.passed ? 'xr-hero__verdict is-pass' : 'xr-hero__verdict'}>
              <Icon name={result.levelTest.passed ? 'check' : 'hint'} size={18} strokeWidth={result.levelTest.passed ? 3 : 2} />
              {result.levelTest.passed ? (isLastLevel ? text('levelPassedLast') : text('levelPassed')) : text('levelFailed', { pass: result.levelTest.passPercent })}
            </p>
          )}
          {placementLevel && result.placement && <p className="xr-hero__verdict is-pass">{text('placementLine', { n: placementLevel.order, range: result.placement.estimatedBand })}</p>}

          {nextStep && (
            <div className="xr-next">
              <span className="xr-next__label">{text('nextStepTitle')}</span>
              <p>{nextStep}</p>
            </div>
          )}
          <div className="xr-hero__actions">
            {secondary && (
              <Button to={secondary.to} variant="secondary" iconLeft={secondary.icon}>
                {secondary.label}
              </Button>
            )}
            <Button to={primary.to} onClick={primary.onClick} iconRight={primary.icon === 'arrow-right' ? 'arrow-right' : undefined} iconLeft={primary.icon !== 'arrow-right' ? primary.icon : undefined}>
              {primary.label}
            </Button>
          </div>
        </div>

        <div className="xr-hero__score">
          {exam?.kind === 'mock-ielts' || (!exam && result.overallBand !== null) ? (
            result.overallBand !== null ? (
              <div className="xr-band">
                <span className="xr-band__label">{text('overallBand')}</span>
                <strong className="xr-band__value ds-num">{formatBand(result.overallBand)}</strong>
                <span className="xr-band__name">{bandName(result.overallBand)[language]}</span>
              </div>
            ) : (
              <div className="xr-band is-empty">
                <span className="xr-band__label">{text('overallBand')}</span>
                <strong className="xr-band__value">—</strong>
                <span className="xr-band__name">{fourSkillsTaken ? text('missingBandNote') : text('partialNote', { n: takenSkills.size })}</span>
              </div>
            )
          ) : result.percent !== null ? (
            <ProgressRing value={result.percent / 100} size={150} color={result.levelTest ? (result.levelTest.passed ? 'var(--c-success)' : 'var(--c-oops)') : 'var(--c-navy)'} label={`${text('scorePercent')} ${result.percent}%`}>
              <strong className="xr-ring-number ds-num">{result.percent}%</strong>
              <span className="xr-ring-caption">{text('scorePercent')}</span>
            </ProgressRing>
          ) : null}
        </div>
      </Card>

      {/* ---------- 2. từng kỹ năng ---------- */}
      <section className="xr-group" aria-labelledby="xr-skills-title">
        <div className="xr-group__head">
          <h2 id="xr-skills-title" className="xr-group__title">
            {text('skillsTitle')}
          </h2>
          {exam?.kind === 'mock-ielts' && <p className="xr-group__note">{text('bandNote')}</p>}
        </div>
        <ul className="xr-skill-grid">
          {view.sections.map((section) => (
            <SkillTile key={`${section.skill}-${section.title}`} section={section} reviewTo={canReview && section.parts.length ? reviewUrl(section.index) : null} speakingSkipped={!!result.speakingSkipped} />
          ))}
        </ul>
      </section>

      {/* ---------- 3. theo dạng câu + lưu ý ---------- */}
      {(view.byType.length > 0 || result.notes.length > 0) && (
        <div className="xr-result__two">
          {view.byType.length > 0 && <TypeBreakdown view={view} />}
          {result.notes.length > 0 && (
            <Card className="xr-notes-card">
              <h2 className="xr-card-title">{text('notesTitle')}</h2>
              <ul className="xr-notes-list">
                {result.notes.map((note, index) => (
                  <li key={index}>{pick(note)}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {/* ---------- 4. nhận xét AI ---------- */}
      {view.sections
        .filter((section) => section.skill === 'writing' || section.skill === 'speaking')
        .map((section) => (
          <AiSection key={section.skill} section={section} view={view} speakingSkipped={!!result.speakingSkipped} />
        ))}

      {/* ---------- 5. lưới từng câu ---------- */}
      {objectiveSections.length > 0 && (
        <section className="xr-group" aria-labelledby="xr-questions-title">
          <div className="xr-group__head">
            <h2 id="xr-questions-title" className="xr-group__title">
              {text('questionsTitle')}
            </h2>
            {canReview && <p className="xr-group__note">{text('questionsHint')}</p>}
          </div>
          <Card className="xr-qgrid-card">
            {objectiveSections.map((section) => (
              <div key={section.title} className="xr-qgrid">
                <p className="xr-qgrid__label">
                  <SkillIcon skill={section.skill} size={22} /> {text(skillTextKey(section.skill))}
                  <span className="ds-num">{text('correctOf', { c: section.correct ?? 0, t: section.total ?? 0 })}</span>
                </p>
                <ol className="xr-qgrid__numbers">
                  {section.parts.flatMap((part) =>
                    part.part.questions.map((question) => {
                      const graded = part.grade.results[question.id]
                      const className = ['xr-qnum', graded?.isCorrect ? 'is-correct' : graded?.isBlank ? 'is-blank' : 'is-wrong'].join(' ')
                      const label = `${uiText('questionStatus', { n: question.number })}, ${uiText(graded?.isCorrect ? 'statusCorrect' : 'statusIncorrect')}`
                      return (
                        <li key={question.id}>
                          {canReview ? (
                            <button type="button" className={className} onClick={() => navigate(reviewUrl(section.index, question.id))} aria-label={label}>
                              {question.number}
                            </button>
                          ) : (
                            <span className={className}>{question.number}</span>
                          )}
                        </li>
                      )
                    }),
                  )}
                </ol>
              </div>
            ))}
          </Card>
        </section>
      )}
    </div>
  )
}

/* ============================================================================
 * Ô kỹ năng
 * ========================================================================== */

function SkillTile({ section, reviewTo, speakingSkipped }: { section: ResultSectionView; reviewTo: string | null; speakingSkipped: boolean }) {
  const text = useExamRoomText()
  const { language } = useLanguage()
  const ratio = section.total ? (section.correct ?? 0) / section.total : null
  return (
    <Card as="li" className={`xr-skill-tile xr-skill-tile--${section.skill}`} padding="md">
      <div className="xr-skill-tile__top">
        <SkillIcon skill={section.skill} size={36} />
        <span className="xr-skill-tile__name">
          <strong>{text(skillTextKey(section.skill))}</strong>
          <span>{section.title}</span>
        </span>
      </div>
      {typeof section.band === 'number' ? (
        <p className="xr-skill-tile__band">
          <strong className="ds-num">{formatBand(section.band)}</strong>
          <span>{bandName(section.band)[language]}</span>
        </p>
      ) : section.band === null ? (
        <p className="xr-skill-tile__band is-empty">
          <span>{section.skill === 'speaking' && speakingSkipped ? text('speakingSkippedNote') : text('noBand')}</span>
        </p>
      ) : null}
      {ratio !== null && (
        <>
          <p className="xr-skill-tile__score ds-num">{text('correctOf', { c: section.correct ?? 0, t: section.total ?? 0 })}</p>
          <span className="xr-skill-tile__bar" aria-hidden>
            <span style={{ width: `${Math.round(ratio * 100)}%` }} data-level={ratio >= 0.7 ? 'good' : ratio >= 0.4 ? 'mid' : 'low'} />
          </span>
        </>
      )}
      {reviewTo && (
        <Button to={reviewTo} variant="ghost" size="sm" iconLeft="eye" className="xr-skill-tile__review">
          {text('reviewAnswers')}
        </Button>
      )}
    </Card>
  )
}

/* ============================================================================
 * % theo dạng câu hỏi
 * ========================================================================== */

function TypeBreakdown({ view }: { view: ResultView }) {
  const text = useExamRoomText()
  const { language } = useLanguage()
  const stats = [...view.byType].sort((a, b) => a.correct / a.total - b.correct / b.total)
  return (
    <Card className="xr-types-card">
      <h2 className="xr-card-title">{text('byTypeTitle')}</h2>
      <p className="xr-card-note">{text('byTypeHint')}</p>
      <ul className="xr-types">
        {stats.map((stat) => {
          const percent = Math.round((stat.correct / Math.max(1, stat.total)) * 100)
          return (
            <li key={stat.typeId} className="xr-types__row">
              <span className="xr-types__name">{QUESTION_TYPE_NAMES[stat.typeId]?.[language] ?? stat.typeId}</span>
              <span className="xr-types__bar" aria-hidden>
                <span style={{ width: `${percent}%` }} data-level={percent >= 70 ? 'good' : percent >= 40 ? 'mid' : 'low'} />
              </span>
              <span className="xr-types__score ds-num">
                {stat.correct}/{stat.total}
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

/* ============================================================================
 * Nhận xét AI (Writing / Speaking)
 * ========================================================================== */

const WRITING_CRITERIA_TASK1 = ['TA', 'CC', 'LR', 'GRA'] as const
const WRITING_CRITERIA_TASK2 = ['TR', 'CC', 'LR', 'GRA'] as const
const SPEAKING_CRITERIA = ['FC', 'LR', 'GRA', 'P'] as const

function AiSection({ section, view, speakingSkipped }: { section: ResultSectionView; view: ResultView; speakingSkipped: boolean }) {
  const text = useExamRoomText()
  const writing = section.skill === 'writing'
  const items = section.aiResults ?? []
  const examSection = view.exam?.sections[section.index]
  return (
    <section className="xr-group" aria-labelledby={`xr-ai-${section.skill}`}>
      <div className="xr-group__head">
        <h2 id={`xr-ai-${section.skill}`} className="xr-group__title">
          <SkillIcon skill={section.skill} size={30} /> {text(writing ? 'writingTitle' : 'speakingTitle')}
          {typeof section.band === 'number' && <Badge tone="navy">{text('bandValue', { b: formatBand(section.band) })}</Badge>}
        </h2>
      </div>
      {items.length === 0 && (
        <Card variant="soft">
          <p className="xr-card-note">{!writing && speakingSkipped ? text('speakingSkippedNote') : text('aiNotGraded')}</p>
        </Card>
      )}
      {items.map((item) => {
        const task = writing ? examSection?.writingTasks?.find((candidate) => `Task ${candidate.taskNumber}` === item.label) : undefined
        const words = item.userText ? item.userText.trim().split(/\s+/).filter(Boolean).length : 0
        const criteria = writing ? (task?.taskNumber === 1 || item.label === 'Task 1' ? WRITING_CRITERIA_TASK1 : WRITING_CRITERIA_TASK2) : SPEAKING_CRITERIA
        // thước band quanh kết quả (không có bài mẫu theo band ở đề thi -> ẩn mốc bằng CSS .xr-ai)
        const center = item.result?.overallBand ?? 5
        const bands = [Math.max(1, center - 2), Math.min(8, center + 2)]
        return (
          <Card key={item.label} className="xr-ai" padding="lg">
            <div className="xr-ai__head">
              <h3 className="xr-ai__title">{writing ? `Writing ${item.label}` : `Speaking ${item.label}`}</h3>
              {item.result && <Badge tone="navy">{text('bandValue', { b: formatBand(item.result.overallBand) })}</Badge>}
            </div>
            {item.result ? (
              <AiResultView result={item.result} display="numbers" bands={bands} selfBand={null} criteria={[...criteria]} />
            ) : (
              <p className="xr-ai__error">
                <Icon name="hint" size={16} /> {item.error === 'empty' ? text('emptyAnswer') : text('aiNotGraded')}
              </p>
            )}
            <details className="xr-ai__details">
              <summary>{writing ? text('showEssay', { n: words }) : text('showQuestions')}</summary>
              <p className="xr-ai__prompt">{item.prompt}</p>
              {item.userText && <p className="xr-ai__essay">{item.userText}</p>}
            </details>
            {task?.sampleAnswer && (
              <details className="xr-ai__details">
                <summary>{text('sampleAnswer')}</summary>
                <p className="xr-ai__essay xr-ai__essay--sample">{task.sampleAnswer}</p>
              </details>
            )}
          </Card>
        )
      })}
    </section>
  )
}

/* ============================================================================
 * Kết quả tạm trong máy -> thử gửi lại lên máy chủ
 * ========================================================================== */

function LocalRetrySave({ result, onSaved }: { result: StoredExamResult; onSaved: (id: number) => void }) {
  const text = useExamRoomText()
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <Button
      variant="secondary"
      size="sm"
      iconLeft="retry"
      loading={busy}
      onClick={() => {
        setBusy(true)
        setFailed(false)
        api
          .saveExamResult(result.examId, result)
          .then(({ id }) => {
            forgetLocalResult()
            onSaved(id)
          })
          .catch(() => setFailed(true))
          .finally(() => setBusy(false))
      }}
    >
      {failed ? text('retry') : text('retrySave')}
    </Button>
  )
}
