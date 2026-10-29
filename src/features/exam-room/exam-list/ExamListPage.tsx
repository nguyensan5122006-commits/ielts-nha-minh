/**
 * ExamListPage.tsx — /exams · DANH SÁCH ĐỀ CỦA PHÒNG THI + LỊCH SỬ THI
 * ----------------------------------------------------------------------------
 * Thứ tự trên trang (mỗi khối có 1 nút chính rõ ràng):
 *   1. Dải "Bạn đang làm dở …  [Làm tiếp]" nếu có đề đang làm dở (đọc phiên tự lưu trong máy).
 *   2. Thi thử IELTS: 2 thẻ lớn (đề 1, đề 2) — 4 kỹ năng, band cao nhất đã đạt.
 *   3. Kiểm tra cuối level: 3 thẻ (Level 1 không bấm giờ). Chưa đủ 80% bài -> nhãn "Chưa mở"
 *      nhưng vẫn "Vẫn làm thử" được (người học giỏi có thể vượt level — ý của bài xếp lớp).
 *   4. Bài xếp lớp -> /start (bản thích ứng v3, thay đề xếp lớp cũ).
 *   5. Lịch sử thi (cả kết quả của đề cũ đã ẩn) -> /exam-result/:id.
 * Cột phải: band ước tính từng kỹ năng + phím tắt khi làm bài.
 * Đề cũ 'level-1-test', 'level-2-test', 'placement-test' bị ẩn ở đây (exam-catalog.ts).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import { RightRail } from '../../../app/layout'
import type { Exam } from '../../../content/content-types'
import { isLevelTestUnlocked } from '../../../content/path-selectors'
import { Badge, Button, Card, EmptyState, Icon, Kbd, LevelBadge, SkillIcon, Skeleton, WordImage } from '../../../design-system'
import { useProgress } from '../../../learning-progress/progress-store'
import { api } from '../../../services/api-client'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import { examFacts, examRulesFor, findExam, HIDDEN_LEGACY_EXAM_IDS, levelNumberOf, listedExams } from '../exam-catalog'
import { formatDuration, skillTextKey, useExamRoomText } from '../exam-room-text'
import { listStartedSessions, type ExamSession } from '../exam-session'
import '../exam-room.css'
import './exam-list.css'

type HistoryItem = { id: number; examId: string; createdAt: string; overallBand: number | null; percent: number | null }

/** Ngày giờ máy chủ (UTC, không có 'Z') -> chữ theo ngôn ngữ. */
export function formatResultDate(createdAt: string, language: 'vi' | 'en'): string {
  const date = new Date(/Z$|[+-]\d\d:?\d\d$/.test(createdAt) ? createdAt : `${createdAt.replace(' ', 'T')}Z`)
  if (Number.isNaN(date.getTime())) return createdAt
  return date.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function ExamListPage() {
  const text = useExamRoomText()
  const { pick, language } = useLanguage()
  const { user } = useAuth()
  const { progress } = useProgress()
  const [history, setHistory] = useState<HistoryItem[] | null>(null)
  const [historyError, setHistoryError] = useState(false)

  const loadHistory = useCallback(() => {
    setHistoryError(false)
    api
      .listExamResults()
      .then((data) => setHistory(data.results))
      .catch(() => {
        setHistory([])
        setHistoryError(true)
      })
  }, [])
  useEffect(loadHistory, [loadHistory])

  const started = useMemo(() => (user ? listStartedSessions(user.id) : {}), [user])
  const exams = useMemo(() => listedExams(), [])
  const mocks = exams.filter((exam) => exam.kind === 'mock-ielts')
  const levelTests = exams.filter((exam) => exam.kind === 'level-test')

  // phiên làm dở mới nhất -> dải "Làm tiếp" đầu trang
  const latestStarted = Object.values(started)
    .filter((session) => findExam(session.examId))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]

  const historyOf = (examId: string) => history?.filter((item) => item.examId === examId) ?? []
  const where = (session: ExamSession) => {
    const exam = findExam(session.examId)
    const section = exam?.sections[session.sectionOrder[session.step] ?? 0]
    return section ? text(skillTextKey(section.skill)) : ''
  }

  return (
    <div className="xr-page xr-list">
      <RightRail>
        <BandsWidget />
        <ShortcutsWidget />
      </RightRail>

      <header className="xr-list__head">
        <h1 className="xr-list__title">{text('pageTitle')}</h1>
        <p className="xr-list__intro">{text('pageIntro')}</p>
      </header>

      {latestStarted && (
        <div className="xr-resume" role="status">
          <span className="xr-resume__icon" aria-hidden>
            <Icon name="clock" size={20} />
          </span>
          <span className="xr-resume__text">
            <strong>{pick(findExam(latestStarted.examId)!.title)}</strong>
            <span>{text('inProgress', { where: where(latestStarted) })}</span>
          </span>
          <Button to={`/exam/${latestStarted.examId}`} variant="navy" iconRight="arrow-right">
            {text('resume')}
          </Button>
        </div>
      )}

      {/* ---------- thi thử IELTS ---------- */}
      <section className="xr-group" aria-labelledby="xr-group-mock">
        <div className="xr-group__head">
          <h2 id="xr-group-mock" className="xr-group__title">
            <WordImage slug="graduation-cap" word="mock test" size={30} decorative /> {text('groupMock')}
          </h2>
          <p className="xr-group__note">{text('groupMockNote')}</p>
        </div>
        <ul className="xr-mock-grid">
          {mocks.map((exam) => (
            <MockCard key={exam.id} exam={exam} session={started[exam.id]} history={historyOf(exam.id)} />
          ))}
        </ul>
      </section>

      {/* ---------- kiểm tra cuối level ---------- */}
      <section className="xr-group" aria-labelledby="xr-group-level">
        <div className="xr-group__head">
          <h2 id="xr-group-level" className="xr-group__title">
            <WordImage slug="chequered-flag" word="level test" size={30} decorative /> {text('groupLevel')}
          </h2>
          <p className="xr-group__note">{text('groupLevelNote', { pass: levelTests[0]?.passPercent ?? 70 })}</p>
        </div>
        <ul className="xr-level-grid">
          {levelTests.map((exam) => {
            const passed = exam.levelId ? progress.levelTests[exam.levelId] : undefined
            const locked = !!exam.levelId && !passed && !isLevelTestUnlocked(exam.levelId, progress)
            return <LevelCard key={exam.id} exam={exam} session={started[exam.id]} history={historyOf(exam.id)} passedPercent={passed?.percent} locked={locked} />
          })}
        </ul>
      </section>

      {/* ---------- bài xếp lớp (bản thích ứng v3) ---------- */}
      <section className="xr-group" aria-labelledby="xr-group-placement">
        <h2 id="xr-group-placement" className="ds-visually-hidden">
          {text('groupPlacement')}
        </h2>
        <Card to="/start" className="xr-placement" padding="md">
          <WordImage slug="compass" word="placement" size={52} decorative />
          <span className="xr-placement__text">
            <span className="xr-eyebrow">{text('groupPlacement')}</span>
            <strong>{text('placementTitle')}</strong>
            <span>
              {text('placementText')}
              {progress.placement && (
                <>
                  {' '}
                  · {text('placementCurrent', { n: progress.placement.level.replace('level-', ''), low: progress.placement.bandLow, high: progress.placement.bandHigh })}
                </>
              )}
            </span>
          </span>
          <Icon name="arrow-right" size={22} />
        </Card>
      </section>

      {/* ---------- lịch sử thi ---------- */}
      <section className="xr-group" aria-labelledby="xr-group-history">
        <div className="xr-group__head">
          <h2 id="xr-group-history" className="xr-group__title">
            <WordImage slug="memo" word="history" size={30} decorative /> {text('historyTitle')}
          </h2>
        </div>
        <Card padding="none" className="xr-history">
          {history === null && (
            <div className="xr-history__loading">
              <Skeleton variant="text" lines={3} />
            </div>
          )}
          {history && history.length === 0 && !historyError && <EmptyState pose="reading" mascotSize={96} title={text('historyEmptyTitle')} text={text('historyEmpty')} />}
          {historyError && (
            <div className="xr-history__error">
              <span>{text('historyError')}</span>
              <Button variant="secondary" size="sm" iconLeft="retry" onClick={loadHistory}>
                {text('retry')}
              </Button>
            </div>
          )}
          {history && history.length > 0 && (
            <ul className="xr-history__list">
              {history.map((item) => {
                const exam = findExam(item.examId)
                const legacy = HIDDEN_LEGACY_EXAM_IDS.has(item.examId)
                return (
                  <li key={item.id} className="xr-history__row">
                    <span className="xr-history__name">
                      <strong>{exam ? pick(exam.title) : item.examId}</strong>
                      <span>
                        {formatResultDate(item.createdAt, language)}
                        {legacy && (
                          <Badge tone="neutral" size="sm" className="xr-history__legacy">
                            {text('legacyTag')}
                          </Badge>
                        )}
                      </span>
                    </span>
                    <span className="xr-history__score">
                      {item.overallBand !== null && item.overallBand !== undefined && <Badge tone="navy">{text('bandValue', { b: Number(item.overallBand).toFixed(1) })}</Badge>}
                      {item.percent !== null && item.percent !== undefined && <Badge tone="neutral">{item.percent}%</Badge>}
                    </span>
                    <Button to={`/exam-result/${item.id}`} variant="secondary" size="sm" iconRight="arrow-right">
                      {text('viewResult')}
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>
      </section>
    </div>
  )
}

/* ============================================================================
 * Thẻ đề thi thử
 * ========================================================================== */

function MockCard({ exam, session, history }: { exam: Exam; session?: ExamSession; history: HistoryItem[] }) {
  const text = useExamRoomText()
  const { pick, language } = useLanguage()
  const facts = examFacts(exam)
  const bands = history.map((item) => item.overallBand).filter((band): band is number => typeof band === 'number')
  const best = bands.length ? Math.max(...bands) : null

  return (
    <Card as="li" className="xr-mock" padding="lg">
      <div className="xr-mock__top">
        <span className="xr-eyebrow">IELTS Academic</span>
        {session ? (
          <Badge tone="primary" icon="clock" size="sm">
            {text('resume')}
          </Badge>
        ) : best !== null ? (
          <Badge tone="success" icon="star" size="sm">
            {text('bestBand', { band: best.toFixed(1) })}
          </Badge>
        ) : null}
      </div>
      <h3 className="xr-mock__title">{pick(exam.title)}</h3>
      <p className="xr-mock__desc">{pick(exam.description)}</p>
      <ul className="xr-mock__skills">
        {exam.sections.map((section) => (
          <li key={section.title} className={`xr-skill-chip xr-skill-chip--${section.skill}`}>
            <SkillIcon skill={section.skill} size={28} />
            <span>
              <strong>{text(skillTextKey(section.skill))}</strong>
              <span>{text('minutes', { n: section.durationMinutes })}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="xr-mock__foot">
        <span className="xr-mock__time">
          <Icon name="clock" size={16} /> {formatDuration(facts.totalMinutes, language)} · {text('questions', { n: facts.objectiveQuestions })}
        </span>
        <div className="xr-mock__actions">
          {history[0] && (
            <Button to={`/exam-result/${history[0].id}`} variant="ghost" size="md">
              {text('viewResult')}
            </Button>
          )}
          <Button to={`/exam/${exam.id}`} variant={session ? 'primary' : 'navy'} size="md" iconRight="arrow-right">
            {session ? text('resume') : history.length ? text('retake') : text('start')}
          </Button>
        </div>
      </div>
    </Card>
  )
}

/* ============================================================================
 * Thẻ bài kiểm tra level
 * ========================================================================== */

function LevelCard({ exam, session, history, passedPercent, locked }: { exam: Exam; session?: ExamSession; history: HistoryItem[]; passedPercent?: number; locked: boolean }) {
  const text = useExamRoomText()
  const { pick } = useLanguage()
  const facts = examFacts(exam)
  const level = levelNumberOf(exam) ?? 1
  const rules = examRulesFor(exam, 'exam')
  const last = history[0]

  return (
    <Card as="li" className={['xr-level', locked && 'is-locked'].filter(Boolean).join(' ')} padding="md">
      <div className="xr-level__top">
        <LevelBadge level={level} size={56} state={passedPercent !== undefined ? 'done' : locked ? 'locked' : 'default'} />
        {passedPercent !== undefined ? (
          <Badge tone="success" icon="check" size="sm">
            {text('passed', { n: passedPercent })}
          </Badge>
        ) : session ? (
          <Badge tone="primary" icon="clock" size="sm">
            {text('resume')}
          </Badge>
        ) : locked ? (
          <Badge tone="neutral" icon="lock" size="sm">
            {text('locked')}
          </Badge>
        ) : null}
      </div>
      <h3 className="xr-level__title">{pick(exam.title)}</h3>
      <p className="xr-level__desc">{pick(exam.description)}</p>
      <ul className="xr-level__meta">
        <li>
          <Icon name="clock" size={14} /> {rules.timed ? text('minutes', { n: facts.totalMinutes }) : text('noTimer')}
        </li>
        <li>{text('questions', { n: facts.objectiveQuestions })}</li>
        {last && last.percent !== null && <li>{text('lastTry', { score: `${last.percent}%` })}</li>}
      </ul>
      {locked && <p className="xr-level__hint">{text('lockedHint', { n: level })}</p>}
      <div className="xr-level__actions">
        <Button to={`/exam/${exam.id}`} variant={locked ? 'secondary' : session ? 'primary' : 'navy'} size="md" fullWidth iconRight="arrow-right">
          {session ? text('resume') : locked ? text('tryAnyway') : passedPercent !== undefined || last ? text('retake') : text('start')}
        </Button>
      </div>
    </Card>
  )
}

/* ============================================================================
 * Cột phải
 * ========================================================================== */

const BAND_SKILLS = ['listening', 'reading', 'writing', 'speaking'] as const

function BandsWidget() {
  const text = useExamRoomText()
  const { progress } = useProgress()
  const estimates = progress.bandEstimates
  const any = BAND_SKILLS.some((skill) => estimates[skill])
  return (
    <Card className="xr-rail-card">
      <h2 className="xr-rail-card__title">{text('bandsTitle')}</h2>
      {any ? (
        <ul className="xr-bands">
          {BAND_SKILLS.map((skill) => {
            const estimate = estimates[skill]
            return (
              <li key={skill} className="xr-bands__row">
                <SkillIcon skill={skill} size={28} />
                <span className="xr-bands__name">{text(skillTextKey(skill))}</span>
                <span className="xr-bands__value ds-num">{estimate ? `${estimate.low.toFixed(1)}–${estimate.high.toFixed(1)}` : '—'}</span>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="xr-rail-card__empty">{text('bandsEmpty')}</p>
      )}
    </Card>
  )
}

function ShortcutsWidget() {
  const text = useExamRoomText()
  return (
    <Card className="xr-rail-card">
      <h2 className="xr-rail-card__title">{text('shortcutsTitle')}</h2>
      <dl className="xr-shortcuts">
        <div>
          <dt>
            <Kbd>Alt</Kbd> + <Kbd>←</Kbd> <Kbd>→</Kbd>
          </dt>
          <dd>{text('shortcutNav')}</dd>
        </div>
        <div>
          <dt>
            <Kbd>1</Kbd>–<Kbd>9</Kbd>
          </dt>
          <dd>{text('shortcutChoose')}</dd>
        </div>
        <div>
          <dt>
            <Kbd>Alt</Kbd> + <Kbd>F</Kbd>
          </dt>
          <dd>{text('shortcutFlag')}</dd>
        </div>
        <div>
          <dt>
            <Kbd>Ctrl</Kbd> + <Kbd>Enter</Kbd>
          </dt>
          <dd>{text('shortcutSubmit')}</dd>
        </div>
      </dl>
      <ul className="xr-tips">
        <li>{text('tip1')}</li>
        <li>{text('tip2')}</li>
        <li>{text('tip3')}</li>
      </ul>
    </Card>
  )
}
