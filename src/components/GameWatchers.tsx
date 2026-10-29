/**
 * GameWatchers.tsx — "NGƯỜI GÁC" CHẠY NGẦM KHI ĐÃ ĐĂNG NHẬP (không hiện giao diện riêng)
 * ----------------------------------------------------------------------------
 *  1. Lên level tài khoản  -> thông báo, khoe vào kênh gia đình (mốc có danh hiệu mới)
 *  2. Đủ điều kiện huy hiệu -> mở khoá, thông báo, khoe
 * (Freeze giữ chuỗi ngày học do kho tiến độ tự lo — xem streak-rules.ts.)
 *
 * Trò chơi hoá chỉ ở track "Tiếng Anh tổng quát" (src/gamification/gamification-scope.ts):
 *   - người học đang ở track IELTS -> KHÔNG báo gì (để dành; đổi sang tab general mới báo)
 *   - đang trong phòng thi (/exams, /exam/…, /exam-result/…) -> KHÔNG báo (phòng thi = IELTS)
 *   - đang ở Sân chơi (/play, /games/…) -> luôn báo (trò chơi chữ cộng XP ở mọi track)
 * ----------------------------------------------------------------------------
 */

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gamificationVisibleAt } from '../gamification/gamification-scope'
import { accountLevelFromXp, titleForLevel } from '../gamification/account-level'
import { newlyEarnedAchievements } from '../learning-progress/activity-stats'
import { useProgress } from '../learning-progress/progress-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { useToast } from './ToastCenter'

export function GameWatchers() {
  const { user } = useAuth()
  const { progress, isLoaded, unlockAchievements, setRewardedAccountLevel } = useProgress()
  const { send } = useRealtime()
  const { showToast } = useToast()
  const { t, pick } = useLanguage()
  // nhớ những gì đã báo trong phiên này -> không báo trùng khi effect chạy lại trước khi tiến độ kịp cập nhật
  const announcedLevel = useRef(0)
  const announcedBadges = useRef(new Set<string>())
  const { pathname } = useLocation()
  const gamified = gamificationVisibleAt(progress.profile.track, pathname)

  useEffect(() => {
    if (!isLoaded || !user || !gamified) return
    const level = accountLevelFromXp(progress.xpTotal).level
    const newAchievements = newlyEarnedAchievements(progress).filter((achievement) => !announcedBadges.current.has(achievement.id))

    /* ---------- 1: lên level tài khoản (mỗi level chỉ chúc mừng 1 lần) ---------- */
    const announcedUpTo = Math.max(progress.rewardedAccountLevel, announcedLevel.current)
    if (level > announcedUpTo) {
      announcedLevel.current = level
      for (let reached = announcedUpTo + 1; reached <= level; reached++) {
        showToast({ icon: '🎖️', text: t('levelUpToast', { level: reached }), durationMs: 6000 })
        const title = titleForLevel(reached)
        if (title.minLevel === reached) send({ t: 'chat:share', text: `🎖️ ${user.displayName} đạt Lv.${reached} — danh hiệu "${title.title.vi}" ${title.emoji}` })
      }
      setRewardedAccountLevel(level)
    }

    /* ---------- 2: huy hiệu mới ---------- */
    if (newAchievements.length > 0) {
      for (const achievement of newAchievements) announcedBadges.current.add(achievement.id)
      unlockAchievements(newAchievements.map((achievement) => achievement.id))
      for (const achievement of newAchievements) {
        showToast({ icon: achievement.icon, text: t('badgeUnlocked', { name: pick(achievement.title) }), durationMs: 6000 })
        send({ t: 'chat:share', text: `${achievement.icon} ${user.displayName} vừa mở huy hiệu "${achievement.title.vi}"` })
      }
    }
  }, [isLoaded, user, gamified, progress, showToast, t, pick, send, setRewardedAccountLevel, unlockAchievements])

  return null
}
