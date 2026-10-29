/**
 * SignupPage.tsx — TRANG /signup (tạo tài khoản trực tiếp, không qua màn kết quả)
 * ----------------------------------------------------------------------------
 * 2 tình huống:
 *   a) Máy này CÓ kết quả xếp lớp chưa lưu (làm bài rồi nhưng chưa tạo tài khoản):
 *      hiện "Kết quả xếp lớp của bạn: Level 2 · 2.5–3.5" -> đăng ký xong thì áp kết quả
 *      (useApplyPlacement) và vào thẳng bài đầu tiên của level đó.
 *   b) CHƯA làm bài: mời làm bài xếp lớp 5 phút (khuyến khích), hoặc đăng ký luôn:
 *      chọn track ngay trong form -> bắt đầu từ Level 1 (bài đầu tiên), bé -> /kids.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import type { TrackId } from '../../content/content-types'
import { findNextLesson } from '../../content/path-selectors'
import { Button, Icon, SegmentedControl, WordImage } from '../../design-system'
import { useProgress } from '../../learning-progress/progress-store'
import { useAuth } from '../../services/auth-context'
import type { AgeGroup } from '../../../backend-helpers/age-groups'
import { loadResult } from '../placement-test/placement-storage'
import { formatBandRange } from '../placement-test/study-plan'
import { skipWelcomeModalToday, useApplyPlacement } from '../placement-test/use-apply-placement'
import { AuthShell } from './AuthShell'
import { SignupForm } from './SignupForm'
import { useAuthText } from './auth-text'

export function SignupPage() {
  const text = useAuthText()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { progress, isLoaded, setTrack } = useProgress()
  const apply = useApplyPlacement()
  const [result] = useState(() => {
    const saved = loadResult()
    return saved && !saved.appliedToUserId ? saved : null
  })
  const [track, setTrackChoice] = useState<TrackId>('general')
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(result?.setup.ageGroup ?? 'adult')
  /** đăng ký KHÔNG có kết quả xếp lớp: chờ tiến độ tải xong rồi đặt track + vào bài đầu */
  const [pendingTrack, setPendingTrack] = useState<TrackId | null>(null)
  /** đã bấm gửi form -> không tự chuyển về "/" khi `user` vừa xuất hiện (để còn đi vào bài đầu tiên) */
  const [submitted, setSubmitted] = useState(false)

  // (a) có kết quả: áp xong -> vào học
  useEffect(() => {
    if (apply.status === 'done' && apply.destination) navigate(apply.destination, { replace: true })
  }, [apply.status, apply.destination, navigate])

  // (b) không có kết quả: tiến độ tải xong -> đặt track -> bài đầu tiên của Level 1 (bé -> /kids)
  useEffect(() => {
    if (!pendingTrack || !user || !isLoaded) return
    setTrack(pendingTrack)
    skipWelcomeModalToday(user.id) // vào thẳng bài đầu, không để bảng chào che bài
    if (user.ageGroup === 'kid') navigate('/kids', { replace: true })
    else {
      const next = findNextLesson(progress, pendingTrack)
      navigate(next ? `/lesson/${next.lesson.id}` : '/learn', { replace: true })
    }
    setPendingTrack(null)
  }, [pendingTrack, user, isLoaded, progress, setTrack, navigate])

  const isWorking = apply.status !== 'idle' || pendingTrack !== null
  if (user && !submitted && !isWorking && !apply.isRequested) return <Navigate to="/" replace />

  const summary = result
    ? result.setup.ageGroup === 'kid'
      ? 'Level 1'
      : `Level ${result.estimate.recommendedLevel.slice(-1)} · ${formatBandRange(result.estimate.bandLow, result.estimate.bandHigh)} (${result.estimate.cefrRange})`
    : ''

  return (
    <AuthShell
      title={text.signupTitle}
      subtitle={text.signupSub}
      mascotPose="wave"
      notice={
        result ? (
          <p className="au-notice" role="status">
            <Icon name="sparkle" size={18} />
            {text.signupHasResult(summary)}
          </p>
        ) : (
          <div className="au-test-prompt">
            <WordImage slug="bullseye" word="placement test" size={40} decorative />
            <div className="au-test-prompt__copy">
              <strong>{text.signupTestPromptTitle}</strong>
              <span>{text.signupTestPromptBody}</span>
            </div>
            <Button variant="navy" size="sm" to="/start" iconRight="arrow-right">
              {text.signupTestPromptCta}
            </Button>
          </div>
        )
      }
      footer={
        <span className="au-card__footer-title">
          {text.haveAccount}{' '}
          <Link to="/login" className="ob-text-link">
            {text.loginLink}
          </Link>
        </span>
      }
    >
      <SignupForm
        defaultAgeGroup={ageGroup}
        onAgeGroupChange={setAgeGroup}
        submitLabel={(age) => (age === 'kid' ? text.signupButtonKid : text.signupButton)}
        busy={isWorking}
        beforeSubmit={() => {
          setSubmitted(true)
          if (result) apply.request() // đăng ký xong thì áp kết quả xếp lớp
        }}
        onRegistered={(age) => {
          if (!result) setPendingTrack(age === 'kid' ? 'general' : track)
        }}
        extraFields={
          !result && ageGroup !== 'kid' ? (
            <div className="au-field">
              <span className="au-label">{text.trackLabel}</span>
              <SegmentedControl<TrackId>
                className="au-segmented"
                label={text.trackLabel}
                value={track}
                onChange={setTrackChoice}
                options={[
                  { value: 'general', label: text.trackGeneral },
                  { value: 'ielts', label: text.trackIelts },
                ]}
              />
            </div>
          ) : undefined
        }
      />
    </AuthShell>
  )
}
