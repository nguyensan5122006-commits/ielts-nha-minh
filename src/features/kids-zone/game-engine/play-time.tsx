/**
 * play-time.tsx
 * ----------------------------------------------------------------------------
 * ĐẾM THỜI GIAN CHƠI THẬT + NHẮC NGHỈ MẮT 30 PHÚT (07-KIDS-ZONE mục 3, psych-kids luật 5–8).
 *
 * Đếm thế nào:
 *   - Mỗi giây kiểm tra: tab đang mở trên màn hình VÀ bé có thao tác (bấm, gõ phím,
 *     rê chuột, cuộn) trong 60 giây gần nhất -> cộng 1 giây.
 *     Bé bỏ đi > 60 giây -> ngừng đếm (không tính giờ "treo máy").
 *   - Cứ 20 giây (và khi rời trang / ẩn tab) thì cộng dồn vào kho tiến độ
 *     (kids.playSecondsByDay[hôm nay]) -> đổi máy vẫn đúng.
 *
 * Nhắc nghỉ:
 *   - Chỉ hiện SAU KHI XONG 1 LƯỢT (không bao giờ cắt giữa câu).
 *   - Lần đầu khi tổng hôm nay ≥ 30 phút; sau đó tối đa mỗi 15 phút 1 lần.
 *   - Không khoá: luôn có nút "Chơi thêm 1 lượt" ngang hàng nút "Nghỉ thôi".
 *
 * <PlayTimeProvider> bọc cả khu trẻ em (sảnh + trò chơi) để đếm liên tục khi chuyển trang.
 * ----------------------------------------------------------------------------
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { todayString } from '../../../learning-progress/study-calendar'
import { useKidsData } from '../kids-data/kids-data-context'

export const DAILY_SOFT_LIMIT_SECONDS = 30 * 60
export const REMIND_AGAIN_AFTER_SECONDS = 15 * 60
const IDLE_AFTER_MS = 60_000
const FLUSH_EVERY_SECONDS = 20

const reminderKey = (day: string) => `kids-zone:rest-reminded-at:${day}`

/**
 * Luật thuần: có nên nhắc nghỉ không?
 * @param secondsToday   tổng giây chơi hôm nay
 * @param lastRemindedAt tổng giây lúc nhắc lần trước (null = chưa nhắc hôm nay)
 */
export function isRestReminderDue(secondsToday: number, lastRemindedAt: number | null): boolean {
  if (secondsToday < DAILY_SOFT_LIMIT_SECONDS) return false
  return lastRemindedAt === null || secondsToday - lastRemindedAt >= REMIND_AGAIN_AFTER_SECONDS
}

interface PlayTimeValue {
  /** Tổng giây chơi hôm nay (gồm cả phần chưa kịp lưu) */
  secondsToday: number
  /** Gọi khi 1 lượt vừa xong: có cần hiện màn nhắc nghỉ không? */
  shouldRemindRest: () => boolean
  /** Ghi nhận đã nhắc (để 15 phút sau mới nhắc lại) */
  markRestReminded: () => void
}

const PlayTimeContext = createContext<PlayTimeValue | null>(null)

export function usePlayTime(): PlayTimeValue {
  const value = useContext(PlayTimeContext)
  if (!value) throw new Error('usePlayTime() phải nằm trong <PlayTimeProvider>')
  return value
}

export function PlayTimeProvider({ children }: { children: ReactNode }) {
  const { kids, addPlaySeconds } = useKidsData()
  const today = todayString()
  const savedSeconds = kids.playSecondsByDay[today] ?? 0

  const lastActivity = useRef(Date.now())
  /** giây đã đếm nhưng chưa ghi vào kho */
  const pending = useRef(0)
  const [pendingShown, setPendingShown] = useState(0)

  // Ref để hàm flush luôn gọi bản addPlaySeconds mới nhất
  const addRef = useRef(addPlaySeconds)
  addRef.current = addPlaySeconds

  const flush = useCallback(() => {
    if (pending.current <= 0) return
    const seconds = pending.current
    pending.current = 0
    setPendingShown(0)
    addRef.current(seconds)
  }, [])

  useEffect(() => {
    const markActive = () => (lastActivity.current = Date.now())
    const events = ['pointerdown', 'keydown', 'pointermove', 'wheel'] as const
    events.forEach((name) => window.addEventListener(name, markActive, { passive: true }))

    const tick = window.setInterval(() => {
      const visible = document.visibilityState === 'visible'
      const active = Date.now() - lastActivity.current <= IDLE_AFTER_MS
      if (!visible || !active) return
      pending.current += 1
      // chỉ vẽ lại mỗi 5 giây (thanh "thời gian hôm nay" tính theo phút, không cần mỗi giây)
      if (pending.current % 5 === 0) setPendingShown(pending.current)
      if (pending.current >= FLUSH_EVERY_SECONDS) flush()
    }, 1000)

    const onHide = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      events.forEach((name) => window.removeEventListener(name, markActive))
      window.clearInterval(tick)
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [flush])

  const secondsToday = savedSeconds + pendingShown
  // tổng "sống" (đọc lúc gọi hàm, không phải lúc vẽ)
  const savedRef = useRef(savedSeconds)
  savedRef.current = savedSeconds
  const liveSeconds = () => savedRef.current + pending.current

  const value = useMemo<PlayTimeValue>(
    () => ({
      secondsToday,
      shouldRemindRest: () => {
        let last: number | null = null
        try {
          const raw = localStorage.getItem(reminderKey(todayString()))
          last = raw === null ? null : Number(raw)
        } catch {
          /* bỏ qua */
        }
        return isRestReminderDue(liveSeconds(), last)
      },
      markRestReminded: () => {
        try {
          localStorage.setItem(reminderKey(todayString()), String(liveSeconds()))
        } catch {
          /* bỏ qua */
        }
      },
    }),
    [secondsToday],
  )
  return <PlayTimeContext.Provider value={value}>{children}</PlayTimeContext.Provider>
}
