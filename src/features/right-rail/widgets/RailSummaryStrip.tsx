/**
 * RailSummaryStrip.tsx — DẢI TÓM TẮT CỘT PHẢI (chỉ hiện ở màn 1024–1279px trở xuống)
 * ----------------------------------------------------------------------------
 * Ở màn hẹp, khung trang xếp cột phải XUỐNG DƯỚI nội dung — mà lộ trình rất dài, nên chuỗi ngày,
 * bảng xếp hạng gia đình (chủ nhà muốn thấy ngay trang chủ) và thẻ đến hạn bị đẩy xuống cuối trang.
 * Dải này đặt ở đầu trang, gồm 3 ô nhỏ bấm được:
 *   🔥 5 ngày · 0/15 phút   |   🏆 Cả nhà: bạn hạng 3 · 340 XP (3 avatar đầu)   |   ⏰ 12 thẻ đến hạn
 * Track IELTS: bỏ ô bảng xếp hạng (trò chơi hoá chỉ ở track general — gamification-scope.ts), còn 2 ô.
 * Màn ≥ 1280px (có cột phải bên cạnh) thì ẩn bằng CSS.
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import { PlayerAvatar } from '../../../components/PlayerIdentity'
import { StreakFlame } from '../../../design-system/components/StreakFlame'
import { useGamificationVisible } from '../../../gamification/gamification-scope'
import { useFamily } from '../../../family-members/family-store'
import { useProgress } from '../../../learning-progress/progress-store'
import { useAuth } from '../../../services/auth-context'
import { goldenTimeSummary } from '../memory-levels'
import { useRightRailText } from '../right-rail-text'

export function RailSummaryStrip() {
  const text = useRightRailText()
  const { user } = useAuth()
  const { progress, streak, todayMinutes } = useProgress()
  const { members } = useFamily()
  const goal = Math.max(1, progress.profile.dailyGoalMinutes || 10)
  const ranked = [...members].sort((a, b) => b.weekXp - a.weekXp)
  const myRank = ranked.findIndex((member) => member.id === user?.id) + 1
  const me = ranked[myRank - 1]
  const due = goldenTimeSummary(progress).dueNow
  const gamified = useGamificationVisible()

  return (
    <nav className={`rr-strip${gamified ? '' : ' rr-strip--two'}`} aria-label={text.todayTitle}>
      <a className="rr-strip__item" href="#rr-today">
        <StreakFlame count={streak.current} active={streak.studiedToday} size="sm" />
        <span className="rr-strip__text">
          <strong>{text.streakDaysLabel(streak.current)}</strong>
          <span>{text.goalMinutes(Math.round(todayMinutes), goal)}</span>
        </span>
      </a>
      {gamified && (
        <Link className="rr-strip__item" to="/leaderboard">
          <span className="rr-strip__avatars" aria-hidden>
            {ranked.slice(0, 3).map((member) => (
              <PlayerAvatar key={member.id} avatarItemId={member.avatar} size={26} />
            ))}
          </span>
          <span className="rr-strip__text">
            <strong>{text.leaderboardTitle}</strong>
            <span>{me ? text.stripRank(myRank, me.weekXp) : text.leaderboardLoading}</span>
          </span>
        </Link>
      )}
      <Link className={`rr-strip__item${due > 0 ? ' is-due' : ''}`} to="/review">
        <img src="/word-images/alarm-clock.webp" width={26} height={26} alt="" aria-hidden />
        <span className="rr-strip__text">
          <strong>{text.goldenTitle}</strong>
          <span>{text.goldenDue(due)}</span>
        </span>
      </Link>
    </nav>
  )
}
