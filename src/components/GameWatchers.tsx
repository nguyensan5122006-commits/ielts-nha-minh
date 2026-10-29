/**
 * GameWatchers.tsx — "NGƯỜI GÁC" CHẠY NGẦM KHI ĐÃ ĐĂNG NHẬP (không hiện giao diện riêng)
 * ----------------------------------------------------------------------------
 *  1. Lên level tài khoản  -> nhận chuối, thông báo, khoe vào kênh gia đình
 *  2. Đủ điều kiện huy hiệu -> mở khoá, nhận chuối, thông báo, khoe
 *  3. Lỡ học đúng 1 ngày mà có "Bảo vệ streak" MUA Ở CỬA HÀNG -> tự dùng để giữ chuỗi ngày học
 *     (freeze tự kiếm theo luật v3 đã được kho tiến độ dùng trước — xem streak-rules.ts)
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef } from 'react'
import { accountLevelFromXp, titleForLevel } from '../game-economy/account-level'
import { newlyEarnedAchievements } from '../learning-progress/activity-stats'
import { useProgress } from '../learning-progress/progress-store'
import { canUseShopStreakFreeze } from '../learning-progress/streak-rules'
import { useWallet } from '../player-wallet/wallet-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import { useToast } from './ToastCenter'

export function GameWatchers() {
  const { user } = useAuth()
  const { progress, isLoaded, unlockAchievements, setRewardedAccountLevel, applyStreakFreeze } = useProgress()
  const { economy, claimReward, owns, useItem } = useWallet()
  const { send } = useRealtime()
  const { showToast } = useToast()
  const { t, pick } = useLanguage()
  const busy = useRef(false) // tránh chạy chồng khi đang gọi máy chủ

  /* ---------- 1 & 2: level tài khoản và huy hiệu ---------- */
  useEffect(() => {
    if (!isLoaded || !economy || busy.current || !user) return
    const level = accountLevelFromXp(progress.xpTotal).level
    const newAchievements = newlyEarnedAchievements(progress)
    if (level <= progress.rewardedAccountLevel && newAchievements.length === 0) return

    busy.current = true
    void (async () => {
      try {
        for (let reached = progress.rewardedAccountLevel + 1; reached <= level; reached++) {
          await claimReward('level-up', String(reached)).catch(() => 0)
          showToast({ icon: '🎖️', text: t('levelUpToast', { level: reached }), durationMs: 6000 })
          const title = titleForLevel(reached)
          if (title.minLevel === reached) send({ t: 'chat:share', text: `🎖️ ${user.displayName} đạt Lv.${reached} — danh hiệu "${title.title.vi}" ${title.emoji}` })
        }
        if (level > progress.rewardedAccountLevel) setRewardedAccountLevel(level)

        if (newAchievements.length > 0) {
          unlockAchievements(newAchievements.map((a) => a.id))
          for (const achievement of newAchievements) {
            await claimReward('achievement', achievement.id).catch(() => 0)
            showToast({ icon: achievement.icon, text: t('badgeUnlocked', { name: pick(achievement.title) }), durationMs: 6000 })
            send({ t: 'chat:share', text: `${achievement.icon} ${user.displayName} vừa mở huy hiệu "${achievement.title.vi}"` })
          }
        }
      } finally {
        busy.current = false
      }
    })()
  }, [isLoaded, economy, user, progress, claimReward, showToast, t, pick, send, setRewardedAccountLevel, unlockAchievements])

  /* ---------- 3: bảo vệ streak ---------- */
  const freezeChecked = useRef(false)
  useEffect(() => {
    if (!isLoaded || !economy || freezeChecked.current) return
    freezeChecked.current = true
    // học lần cuối cách đây đúng 2 ngày (lỡ đúng hôm qua), freeze tự kiếm không đủ, và có món bảo vệ
    const streakToSave = progress.streak.current || progress.streak.repairStreak || 0
    if (canUseShopStreakFreeze(progress.streak) && owns('study-streak-freeze')) {
      void useItem('study-streak-freeze').then((ok) => {
        if (ok) {
          applyStreakFreeze()
          showToast({ icon: '🧯', text: t('streakFreezeUsed', { n: streakToSave }), durationMs: 6000 })
        }
      })
    }
  }, [isLoaded, economy, progress.streak, owns, useItem, applyStreakFreeze, showToast, t])

  return null
}
