/**
 * use-apply-placement.ts
 * ----------------------------------------------------------------------------
 * CHÉP KẾT QUẢ XẾP LỚP (đang nằm trong localStorage của khách) VÀO TÀI KHOẢN.
 *
 * Dùng ở 3 chỗ: màn kết quả /start/result (đăng ký ngay tại chỗ, hoặc đã đăng nhập sẵn),
 * trang /login (bấm "Đã có tài khoản? Đăng nhập" từ màn kết quả) và trang /signup.
 *
 *   const apply = useApplyPlacement()
 *   apply.request()            // gọi TRƯỚC khi đăng ký / đăng nhập (đặt cờ chờ áp)
 *   apply.status               // 'idle' -> 'applying' -> 'done'
 *   apply.destination          // khi 'done': '/lesson/<id>' (bài đầu tiên) hoặc '/learn'
 *
 * Vì sao phải CHỜ chứ không gọi ngay sau `await register()`?
 *   Đăng ký xong, progress-store mới bắt đầu tải tiến độ của tài khoản từ máy chủ.
 *   Nếu ghi kết quả trước khi tải xong, bản tải về (rỗng) sẽ ĐÈ mất kết quả.
 *   Nên hook đợi tới khi `user` có mặt VÀ `isLoaded = true` rồi mới gọi các hành động
 *   của useProgress() (đúng luật 03-DATA-LAYER: mọi thay đổi đi qua useProgress()).
 *
 * Áp những gì (1 lần duy nhất cho mỗi tài khoản):
 *   - setPlacementV3({ level, track, bandLow, bandHigh })  -> mở khoá + đặt level hiện tại
 *   - setProfile({ dailyGoalMinutes, studyCue, studyTime }) -> kế hoạch chọn trên màn kết quả
 *   - nếu đã làm bài thật: markStudyDay() + addStudyMinutes() -> ngày học đầu tiên được tính
 *     ("tiến độ tặng sẵn có lý do thật" — psych-adult A9: bạn ĐÃ học 5 phút rồi)
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { findNextLesson } from '../../content/path-selectors'
import { useProgress } from '../../learning-progress/progress-store'
import { todayString } from '../../learning-progress/study-calendar'
import { useAuth } from '../../services/auth-context'
import { clearDraft, clearPendingApply, hasPendingApply, loadResult, markPendingApply, updateResult } from './placement-storage'

export type ApplyStatus = 'idle' | 'applying' | 'done'

/**
 * Người học vừa lưu lộ trình và được đưa THẲNG vào bài đầu tiên: không để bảng
 * "Mừng quay lại" (src/components/WelcomeModal.tsx, hiện lần đầu mở web mỗi ngày) che bài học.
 * Cách làm: đánh dấu "hôm nay đã chào" bằng đúng khoá localStorage mà WelcomeModal đọc.
 * (Đã ghi REQUESTS.md: nên để WelcomeModal tự bỏ qua màn toàn màn hình /lesson/*.)
 */
export function skipWelcomeModalToday(userId: number) {
  try {
    localStorage.setItem(`ielts-welcome-day-${userId}`, todayString())
  } catch {
    /* bỏ qua */
  }
}

export interface ApplyPlacement {
  /** Đặt cờ "đăng nhập xong thì áp kết quả" (gọi trước register/login, hoặc khi đã đăng nhập sẵn) */
  request: () => void
  /** Có kết quả đang chờ áp không (để trang /login hiện dòng "kết quả sẽ được lưu") */
  isRequested: boolean
  status: ApplyStatus
  destination: string | null
}

export function useApplyPlacement(): ApplyPlacement {
  const { user } = useAuth()
  const { progress, isLoaded, setPlacementV3, setProfile, markStudyDay, addStudyMinutes } = useProgress()
  const [isRequested, setIsRequested] = useState(hasPendingApply)
  const [status, setStatus] = useState<ApplyStatus>('idle')
  const [destination, setDestination] = useState<string | null>(null)
  /** Thời điểm bắt đầu áp — để nhận ra lần vẽ lại có tiến độ ĐÃ cập nhật */
  const appliedAt = useRef(0)

  const request = useCallback(() => {
    markPendingApply()
    setIsRequested(true)
  }, [])

  // 1) Đủ điều kiện (đã đăng nhập + tiến độ đã tải) -> gọi các hành động của kho tiến độ
  useEffect(() => {
    if (!isRequested || status !== 'idle' || !user || !isLoaded) return
    const result = loadResult()
    clearPendingApply()
    skipWelcomeModalToday(user.id)
    // (QA) Kết quả đã áp cho BẤT KỲ tài khoản nào (kể cả người khác trong nhà dùng chung máy) thì
    // không áp nữa — tránh chép trình độ của người trước vào tài khoản mới tạo trên cùng trình duyệt.
    if (!result || result.appliedToUserId != null) {
      // không có gì để áp (hoặc đã áp rồi): đi thẳng vào học
      setDestination('/learn')
      setStatus('done')
      return
    }
    const { estimate, setup, plan } = result
    appliedAt.current = Date.now()
    setPlacementV3({ level: estimate.recommendedLevel, track: setup.track, bandLow: estimate.bandLow, bandHigh: estimate.bandHigh })
    setProfile({
      dailyGoalMinutes: plan.dailyGoalMinutes,
      ...(plan.studyCue ? { studyCue: plan.studyCue } : {}),
      ...(plan.studyTime ? { studyTime: plan.studyTime } : {}),
    })
    if (result.via !== 'beginner' && estimate.itemsAnswered > 0) {
      markStudyDay()
      addStudyMinutes(Math.max(1, result.minutesSpent))
    }
    updateResult({ appliedToUserId: user.id })
    clearDraft()
    setStatus('applying')
  }, [isRequested, status, user, isLoaded, setPlacementV3, setProfile, markStudyDay, addStudyMinutes])

  // 2) Lần vẽ lại SAU khi kho đã cập nhật -> tính bài đầu tiên (findNextLesson cần tiến độ mới)
  useEffect(() => {
    if (status !== 'applying') return
    const takenAt = progress.placement ? new Date(progress.placement.takenAt).getTime() : 0
    if (takenAt < appliedAt.current - 5_000) return // kho chưa kịp cập nhật
    const next = findNextLesson(progress)
    setDestination(next ? `/lesson/${next.lesson.id}` : '/learn')
    setStatus('done')
  }, [status, progress])

  return { request, isRequested, status, destination }
}
