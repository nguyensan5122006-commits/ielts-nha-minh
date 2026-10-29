/**
 * ResultPage.tsx — TRANG /start/result: KẾT QUẢ XẾP LỚP + LỘ TRÌNH + LƯU (đăng ký) TRÊN CÙNG 1 TRANG
 * ----------------------------------------------------------------------------
 * Kết quả hiện NGAY, KHÔNG khoá sau đăng nhập (ui-vn-a: tránh lỗi "hứa miễn phí rồi khoá kết quả").
 *
 * Cột trái (đọc từ trên xuống):
 *   1. Cún ăn mừng + "Bạn bắt đầu ở Level 2" + "khoảng band 2.5–3.5 · A2" + câu can-do
 *   2. Lộ trình: bậc thang 3 level "Bạn ở đây → Mục tiêu 6.5" + ô đầu tiên đã tick sẵn
 *      "Bài xếp lớp — đã xong" (tiến độ tặng sẵn CÓ LÝ DO THẬT — psych-adult A9 / D2 luật 4)
 *   3. Kế hoạch: số bài · phút/ngày (chọn được) · số tháng tới mốc tiếp theo (D6 luật 25, trung thực)
 *      + 1 dòng hẹn giờ học tuỳ chọn "Tôi sẽ học sau … lúc …" (D2 luật 3)
 *   4. "Xem lại các câu đã làm" (đáp án + 1 dòng vì sao) — gập sẵn
 * Cột phải (dính khi cuộn): form tạo tài khoản 1 bước -> "Lưu lộ trình & học ngay"
 *   -> đăng ký -> useApplyPlacement chép kết quả vào tiến độ -> vào thẳng bài đầu tiên.
 *   "Đã có tài khoản? Đăng nhập" giữ kết quả và áp sau khi đăng nhập.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import type { LevelId } from '../../content/content-types'
import { PLACEMENT_V3_ITEMS, type PlacementSkill } from '../../content/exams/index-v3'
import { Badge, Button, fireConfetti, Icon, Mascot, SegmentedControl, useReducedMotion, WordImage } from '../../design-system'
import { useAuth } from '../../services/auth-context'
import { useLanguage } from '../../translations/language-context'
import { SignupForm } from '../auth/SignupForm'
import { PublicHeader } from '../landing/PublicHeader'
import { loadResult, updateResult, type SavedPlacementResult, type StudyPlanChoices } from './placement-storage'
import { usePlacementText } from './placement-text'
import { LevelStaircase } from './route-map/LevelStaircase'
import { CAN_DO_BY_CEFR, DAILY_MINUTE_OPTIONS, estimateNextMilestone, formatBandRange, levelPlanNumbers } from './study-plan'
import { useApplyPlacement } from './use-apply-placement'
import './placement.css'

const ITEM_BY_ID = new Map(PLACEMENT_V3_ITEMS.map((item) => [item.id, item]))
const SKILL_ORDER: PlacementSkill[] = ['vocabulary', 'grammar', 'listening', 'reading']
/** Giờ gợi ý theo mốc sinh hoạt (người học sửa được) */
const CUE_DEFAULT_TIME = ['20:00', '21:30', '12:30', '17:00', '06:30']

export function ResultPage() {
  const text = usePlacementText()
  const navigate = useNavigate()
  const { user } = useAuth()
  const apply = useApplyPlacement()
  const reduceMotion = useReducedMotion()
  const [result, setResult] = useState<SavedPlacementResult | null>(() => loadResult())

  // pháo giấy nhỏ 1 lần khi vào trang (tự tắt nếu giảm chuyển động)
  useEffect(() => {
    if (!result || reduceMotion) return
    const timer = window.setTimeout(() => fireConfetti({ origin: { x: 0.28, y: 0.3 }, particleCount: 60 }), 350)
    return () => window.clearTimeout(timer)
    // chỉ bắn khi mở trang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // áp xong vào tài khoản -> đi thẳng vào bài đầu tiên
  useEffect(() => {
    if (apply.status === 'done' && apply.destination) navigate(apply.destination, { replace: true })
  }, [apply.status, apply.destination, navigate])

  if (!result) return <Navigate to="/start" replace />

  const changePlan = (patch: Partial<StudyPlanChoices>) => {
    const plan = { ...result.plan, ...patch }
    updateResult({ plan })
    setResult({ ...result, plan })
  }

  return (
    <div className="ob-page">
      <PublicHeader />
      <main className="pt-result ob-container">
        <div className="pt-result__main">
          <ResultSummary result={result} />
          <RouteCard result={result} />
          <PlanCard result={result} onChange={changePlan} />
          {result.answers.length > 0 && <AnswerReview result={result} />}
          <p className="pt-result__retake">
            <Button variant="ghost" size="sm" to="/start">
              {text.retake}
            </Button>
          </p>
        </div>

        <aside className="pt-result__side">
          <SaveCard apply={apply} userName={user?.displayName ?? null} isLoggedIn={!!user} />
        </aside>
      </main>
    </div>
  )
}

/* ============================================================================
 * 1. TÓM TẮT KẾT QUẢ
 * ========================================================================== */
function ResultSummary({ result }: { result: SavedPlacementResult }) {
  const text = usePlacementText()
  const { pick } = useLanguage()
  const { estimate, setup, via } = result
  const levelNumber = Number(estimate.recommendedLevel.slice(-1))
  const stretchNumber = estimate.stretchLevel ? Number(estimate.stretchLevel.slice(-1)) : null

  return (
    <section className="pt-summary" aria-labelledby="pt-summary-title">
      <Mascot pose="celebrate" size={168} className="pt-summary__mascot" />
      <div className="pt-summary__copy">
        <span className="pt-eyebrow">{text.resultEyebrow}</span>
        <h1 id="pt-summary-title" className="pt-summary__title ob-display">
          {text.resultTitle(levelNumber)}
        </h1>
        <div className="pt-summary__chips">
          <Badge tone="primary" variant="solid" size="md">
            {text.bandChip(formatBandRange(estimate.bandLow, estimate.bandHigh))}
          </Badge>
          <Badge tone="navy" size="md">
            {estimate.cefrRange}
          </Badge>
          <Badge tone="neutral" size="md">
            {setup.track === 'ielts' ? text.trackIelts : text.trackGeneral}
          </Badge>
        </div>
        <p className="pt-summary__cando">{pick(CAN_DO_BY_CEFR[estimate.cefr])}</p>
        {via === 'beginner' && <p className="pt-summary__note">{text.selfReported}</p>}
        {via !== 'beginner' && estimate.confidence === 'low' && <p className="pt-summary__note">{text.lowConfidence}</p>}
        {stretchNumber && <p className="pt-summary__note pt-summary__note--stretch">{text.stretchHint(stretchNumber, levelNumber)}</p>}

        {estimate.itemsAnswered > 0 && (
          <div className="pt-skills" aria-label={text.bySkillTitle}>
            {SKILL_ORDER.filter((skill) => estimate.bySkill[skill].answered > 0).map((skill) => (
              <span key={skill} className="pt-skills__item">
                <span className="pt-skills__name">{text.skillNames[skill]}</span>
                <strong className="ds-num">
                  {estimate.bySkill[skill].correct}/{estimate.bySkill[skill].answered}
                </strong>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ============================================================================
 * 2. LỘ TRÌNH (bậc thang + ô đầu tiên tick sẵn)
 * ========================================================================== */
function RouteCard({ result }: { result: SavedPlacementResult }) {
  const text = usePlacementText()
  const { pick } = useLanguage()
  const level: LevelId = result.estimate.recommendedLevel
  const track = result.setup.track
  const numbers = useMemo(() => levelPlanNumbers(track, level), [track, level])

  return (
    <section className="pt-card pt-route" aria-labelledby="pt-route-title">
      <div className="pt-card__head">
        <h2 id="pt-route-title" className="pt-card__title ob-display">
          {text.routeTitle}
        </h2>
        <p className="pt-card__sub">{text.routeSub}</p>
      </div>

      <LevelStaircase
        currentLevel={level}
        band={{ low: result.estimate.bandLow, high: result.estimate.bandHigh }}
        youAreHereLabel={text.youAreHere}
        goalLabel={text.goal}
        pose="happy"
      />

      {/* tiến độ tặng sẵn có lý do thật: bài xếp lớp đã xong -> ô 1 đã tick */}
      <ol className="pt-route__steps">
        {result.via !== 'beginner' && (
          <li className="pt-route__step is-done">
            <span className="pt-route__dot">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
            <span>
              <strong>{text.endowedDone}</strong> · {text.endowedDoneHint}
            </span>
          </li>
        )}
        {numbers.firstUnitTitle && (
          <li className="pt-route__step is-next">
            <span className="pt-route__dot">
              <Icon name="arrow-right" size={14} strokeWidth={2.6} />
            </span>
            <span>
              <strong>{text.firstUnitLabel}:</strong> {pick(numbers.firstUnitTitle)}
            </span>
          </li>
        )}
      </ol>
    </section>
  )
}

/* ============================================================================
 * 3. KẾ HOẠCH — con số cụ thể, trung thực
 * ========================================================================== */
function PlanCard({ result, onChange }: { result: SavedPlacementResult; onChange: (patch: Partial<StudyPlanChoices>) => void }) {
  const text = usePlacementText()
  const level = result.estimate.recommendedLevel
  const numbers = useMemo(() => levelPlanNumbers(result.setup.track, level), [result.setup.track, level])
  const minutes = result.plan.dailyGoalMinutes
  const next = estimateNextMilestone(result.estimate.bandPoint, minutes)

  return (
    <section className="pt-card pt-plan" aria-labelledby="pt-plan-title">
      <div className="pt-card__head">
        <h2 id="pt-plan-title" className="pt-card__title ob-display">
          {text.planTitle} · Level {level.slice(-1)}
        </h2>
      </div>

      <div className="pt-plan__tiles">
        <div className="pt-tile">
          <WordImage slug="open-book" word="lessons" size={44} decorative />
          <strong className="pt-tile__value ob-display">{text.planLessons(numbers.lessons)}</strong>
          <span className="pt-tile__sub">{text.planLessonsSub(numbers.units, numbers.minutesPerLesson)}</span>
        </div>
        <div className="pt-tile pt-tile--pace">
          <WordImage slug="alarm-clock" word="minutes" size={44} decorative />
          <strong className="pt-tile__value ob-display">
            {minutes} <span className="pt-tile__unit">{text.planPace}</span>
          </strong>
          {/* đổi nhịp học -> số tháng bên cạnh tính lại ngay (thấy rõ đánh đổi) */}
          <SegmentedControl<number>
            className="pt-tile__pace"
            label={text.planPaceLabel}
            size="sm"
            value={minutes}
            onChange={(value) => onChange({ dailyGoalMinutes: value })}
            options={DAILY_MINUTE_OPTIONS.map((value) => ({ value, label: String(value), ariaLabel: `${value} ${text.planPace}` }))}
          />
        </div>
        <div className="pt-tile pt-tile--goal">
          <WordImage slug={next ? 'bullseye' : 'trophy'} word="goal" size={44} decorative />
          <strong className="pt-tile__value ob-display">{next ? text.planMonths(next.months) : text.planGoalReached}</strong>
          <span className="pt-tile__sub">{next ? text.planMonthsSub(next.label) : text.planGoalReachedSub}</span>
        </div>
      </div>
      {next && <p className="pt-plan__honest">{text.planHonest(next.hours)}</p>}

      <StudyIntention plan={result.plan} onChange={onChange} />
    </section>
  )
}

/** "Tôi sẽ học sau [bữa tối] lúc [20:00]" — implementation intention (psych-adult A11, D2 luật 3). */
function StudyIntention({ plan, onChange }: { plan: StudyPlanChoices; onChange: (patch: Partial<StudyPlanChoices>) => void }) {
  const text = usePlacementText()
  const cueIndex = plan.studyCue ? text.intentionCues.indexOf(plan.studyCue) : -1
  return (
    <div className="pt-intention">
      <span className="pt-intention__label">{text.intentionLabel}</span>
      <div className="pt-intention__sentence">
        <span>{text.intentionPrefix}</span>
        <select
          className="pt-select"
          value={cueIndex >= 0 ? String(cueIndex) : plan.studyCue ? 'custom' : ''}
          aria-label={text.intentionLabel}
          onChange={(event) => {
            const index = Number(event.target.value)
            if (event.target.value === '') onChange({ studyCue: undefined, studyTime: undefined })
            else onChange({ studyCue: text.intentionCues[index], studyTime: plan.studyTime ?? CUE_DEFAULT_TIME[index] })
          }}
        >
          <option value="">{text.intentionCueNone}</option>
          {text.intentionCues.map((cue, index) => (
            <option key={cue} value={String(index)}>
              {cue}
            </option>
          ))}
          {cueIndex < 0 && plan.studyCue && <option value="custom">{plan.studyCue}</option>}
        </select>
        <span>{text.intentionAt}</span>
        <input
          type="time"
          className="pt-select pt-select--time"
          value={plan.studyTime ?? ''}
          aria-label={`${text.intentionPrefix} ${text.intentionAt}`}
          onChange={(event) => onChange({ studyTime: event.target.value || undefined })}
        />
      </div>
    </div>
  )
}

/* ============================================================================
 * 4. XEM LẠI CÂU ĐÃ LÀM (gập sẵn — chỉ xem khi muốn)
 * ========================================================================== */
function AnswerReview({ result }: { result: SavedPlacementResult }) {
  const text = usePlacementText()
  const { pick } = useLanguage()
  return (
    <details className="pt-card pt-review">
      <summary className="pt-review__summary">
        <Icon name="chevron-right" size={18} className="pt-review__chevron" />
        {text.reviewToggle(result.answers.length)}
      </summary>
      <ol className="pt-review__list">
        {result.answers.map((answer, index) => {
          const item = ITEM_BY_ID.get(answer.itemId)
          if (!item) return null
          return (
            <li key={answer.itemId} className={['pt-review__item', answer.correct ? 'is-correct' : 'is-wrong'].join(' ')}>
              <span className="pt-review__number">{index + 1}</span>
              <div className="pt-review__body">
                <p className="pt-review__question" lang="en">
                  {item.kind === 'listen-choose' && <span className="pt-review__context">🎧 “{item.audioText}” </span>}
                  {item.kind === 'read-choose' && <span className="pt-review__context">“{item.passage}” </span>}
                  {item.question}
                </p>
                <p className="pt-review__answer">
                  <Badge tone={answer.correct ? 'success' : 'oops'} size="sm">
                    {answer.correct ? text.reviewCorrect : text.reviewWrong}
                  </Badge>
                  <span>
                    {text.reviewAnswer} <strong lang="en">{item.options[item.correctIndex]}</strong>
                  </span>
                </p>
                <p className="pt-review__why">{pick(item.explanation)}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </details>
  )
}

/* ============================================================================
 * 5. LƯU: form tạo tài khoản (khách) / nút lưu (đã đăng nhập)
 * ========================================================================== */
function SaveCard({
  apply,
  userName,
  isLoggedIn,
}: {
  apply: ReturnType<typeof useApplyPlacement>
  userName: string | null
  isLoggedIn: boolean
}) {
  const text = usePlacementText()
  const navigate = useNavigate()
  const busy = apply.status !== 'idle' || (apply.isRequested && isLoggedIn)
  /** vừa đăng ký bằng form này -> giữ nguyên form (nút đang quay) tới khi chuyển trang, không nhảy giao diện */
  const [usedForm, setUsedForm] = useState(false)

  if (isLoggedIn && !usedForm) {
    return (
      <section className="pt-card pt-save" aria-labelledby="pt-save-title">
        <Mascot pose="thumbs-up" size={96} placement="peek-top" />
        <h2 id="pt-save-title" className="pt-card__title ob-display">
          {text.loggedInTitle(userName ?? '')}
        </h2>
        <p className="pt-card__sub">{text.loggedInSub}</p>
        <Button size="lg" fullWidth loading={busy} iconRight="arrow-right" onClick={apply.request}>
          {text.loggedInButton}
        </Button>
      </section>
    )
  }

  return (
    <section className="pt-card pt-save" aria-labelledby="pt-save-title">
      <Mascot pose="thumbs-up" size={96} placement="peek-top" />
      <h2 id="pt-save-title" className="pt-card__title ob-display">
        {text.saveTitle}
      </h2>
      <p className="pt-card__sub">{text.saveSub}</p>
      <SignupForm
        submitLabel={text.saveButton}
        // đặt cờ "áp kết quả" ngay khi gửi; đăng ký xong, hook CHỜ tiến độ tải xong rồi mới áp
        // (nếu áp sớm, bản tiến độ rỗng tải từ máy chủ sẽ đè mất kết quả)
        beforeSubmit={() => {
          setUsedForm(true)
          apply.request()
        }}
        busy={busy}
      />
      <p className="pt-save__login">
        <button
          type="button"
          className="ob-text-link"
          onClick={() => {
            apply.request() // giữ kết quả: đăng nhập xong sẽ tự áp
            navigate('/login')
          }}
        >
          {text.haveAccountLogin}
        </button>
      </p>
      {busy && (
        <p className="pt-save__status" role="status">
          {text.applying}
        </p>
      )}
    </section>
  )
}
