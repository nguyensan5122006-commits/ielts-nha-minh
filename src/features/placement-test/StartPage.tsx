/**
 * StartPage.tsx — TRANG /start: BƯỚC 1 (chọn mục tiêu) -> BƯỚC 2 (bài xếp lớp) -> /start/result
 * ----------------------------------------------------------------------------
 * Trang này chỉ "điều phối":
 *   - Có bài đang làm dở trong localStorage -> vào thẳng bài (tải lại trang = làm tiếp đúng câu).
 *   - Chưa có -> ChoiceStep (2 câu hỏi trên 1 màn).
 *   - Bài xong -> lưu kết quả (placement-storage) -> màn "Xong rồi!" ≤ 1,5 giây -> /start/result.
 *   - "Tôi mới bắt đầu từ con số 0" -> completeBeginnerResult() -> /start/result (không làm bài).
 * Khách chưa đăng nhập vẫn làm được hết; người đã đăng nhập cũng làm lại được (đo lại trình độ).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { completeBeginnerResult } from '../../content/exams/index-v3'
import { Button, Mascot, playSound, ProgressBar, useReducedMotion } from '../../design-system'
import { useAuth } from '../../services/auth-context'
import { PublicHeader } from '../landing/PublicHeader'
import { ChoiceStep } from './ChoiceStep'
import { PlacementRunner, type RunnerFinish } from './PlacementRunner'
import {
  clearDraft,
  loadDraft,
  newDraft,
  saveDraft,
  saveResult,
  type PlacementDraft,
  type PlacementSetup,
} from './placement-storage'
import { usePlacementText } from './placement-text'
import { defaultDailyMinutes } from './study-plan'
import './placement.css'

/** Màn "Xong rồi!" giữa bài và kết quả (hiệu ứng "đang vẽ lộ trình" — ui-edtech-a ý 5). */
function FinishScreen() {
  const text = usePlacementText()
  useEffect(() => playSound('complete'), [])
  return (
    <div className="ob-page pt-finish" role="status">
      <div className="pt-finish__inner">
        <Mascot pose="celebrate" size={200} placement="hero" />
        <h1 className="pt-finish__title ob-display">{text.finishTitle}</h1>
        <p className="pt-finish__body">{text.finishBody}</p>
        <div className="pt-finish__bar">
          <ProgressBar value={1} max={1} size="md" label={text.testTitle} />
        </div>
      </div>
    </div>
  )
}

export function StartPage() {
  const text = usePlacementText()
  const navigate = useNavigate()
  const { user } = useAuth()
  const reduceMotion = useReducedMotion()
  const [draft, setDraft] = useState<PlacementDraft | null>(() => loadDraft())
  const [finishing, setFinishing] = useState(false)

  const startTest = useCallback((setup: PlacementSetup) => {
    const fresh = newDraft(setup)
    saveDraft(fresh)
    setDraft(fresh)
    window.scrollTo({ top: 0 })
  }, [])

  const startFromZero = useCallback(
    (setup: PlacementSetup) => {
      clearDraft()
      saveResult({
        version: 1,
        setup,
        estimate: completeBeginnerResult(),
        answers: [],
        via: 'beginner',
        minutesSpent: 0,
        finishedAt: new Date().toISOString(),
        plan: { dailyGoalMinutes: defaultDailyMinutes('level-1') },
      })
      navigate('/start/result')
    },
    [navigate],
  )

  const finish = useCallback(
    ({ estimate, answers, via }: RunnerFinish) => {
      const current = loadDraft() ?? draft
      if (!current) return
      const minutesSpent = Math.min(30, Math.max(1, Math.round((Date.now() - new Date(current.startedAt).getTime()) / 60_000)))
      saveResult({
        version: 1,
        setup: current.setup,
        estimate,
        answers,
        via,
        minutesSpent,
        finishedAt: new Date().toISOString(),
        plan: { dailyGoalMinutes: defaultDailyMinutes(estimate.recommendedLevel) },
      })
      clearDraft()
      setFinishing(true)
      // ăn mừng ≤ 1,5 giây (design system mục 4); giảm chuyển động -> đi nhanh hơn
      window.setTimeout(() => navigate('/start/result', { replace: true }), reduceMotion ? 500 : 1500)
    },
    [draft, navigate, reduceMotion],
  )

  if (finishing) return <FinishScreen />

  if (draft) {
    return (
      <div className="ob-page pt-run-page">
        <PlacementRunner draft={draft} onFinish={finish} onLeave={() => navigate(user ? '/learn' : '/')} />
      </div>
    )
  }

  return (
    <div className="ob-page">
      <PublicHeader
        action={
          user ? (
            <Button variant="ghost" size="sm" to="/learn">
              {text.stepNames[2]}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" to="/login">
              {text.login}
            </Button>
          )
        }
      />
      <ChoiceStep onStartTest={startTest} onStartFromZero={startFromZero} />
    </div>
  )
}
