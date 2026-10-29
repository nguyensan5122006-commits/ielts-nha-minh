/**
 * DailyQuestsCard.tsx — (f) NHIỆM VỤ HÔM NAY (dùng lại logic nhiệm vụ cũ)
 * ----------------------------------------------------------------------------
 * 3 nhiệm vụ ngày bốc theo (ngày + người dùng) — pickDailyQuests trong
 * gamification/quests-and-achievements.ts, đếm bằng progress.questCounters (giống trang /quests).
 * Đủ chỉ tiêu -> nút "Nhận +XP" (claimQuestReward: cộng XP, mỗi nhiệm vụ nhận 1 lần).
 * Link "Tất cả" -> /quests (nhiệm vụ tuần, nhiệm vụ cả nhà, huy hiệu).
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import { vietnamDay } from '../../../../backend-helpers/vietnam-time'
import { Card } from '../../../design-system/components/Card'
import { Icon } from '../../../design-system/components/Icon'
import { pickDailyQuests } from '../../../gamification/quests-and-achievements'
import { useProgress } from '../../../learning-progress/progress-store'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import { useRightRailText } from '../right-rail-text'

export function DailyQuestsCard() {
  const text = useRightRailText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const { progress, claimQuestReward } = useProgress()
  if (!user) return null

  const day = vietnamDay()
  const counts = progress.questCounters.day === day ? progress.questCounters.daily : {}
  const quests = pickDailyQuests(day, user.id)

  return (
    <Card padding="sm" className="rr-card rr-quests" as="section" aria-labelledby="rr-quests-title">
      <div className="rr-card__head">
        <h3 id="rr-quests-title" className="rr-card__title">
          <img src="/word-images/bullseye.webp" width={24} height={24} alt="" aria-hidden />
          {text.questsTitle}
        </h3>
        <Link to="/quests" className="rr-card__link">
          {text.questsAll}
          <Icon name="chevron-right" size={14} />
        </Link>
      </div>
      <ul className="rr-quests__list">
        {quests.map((quest) => {
          const value = Math.min(counts[quest.metric] ?? 0, quest.target)
          const done = value >= quest.target
          const rewardKey = `daily:${day}:${quest.id}`
          const claimed = progress.claimedRewards.includes(rewardKey)
          return (
            <li key={quest.id} className={`rr-quest${done ? ' is-done' : ''}`}>
              <div className="rr-quest__top">
                <span className="rr-quest__title">{pick(quest.title)}</span>
                <span className="rr-quest__count ds-num">{text.questProgress(value, quest.target)}</span>
              </div>
              <div className="rr-quest__bottom">
                <span className="rr-quest__bar" aria-hidden>
                  <span style={{ width: `${(value / quest.target) * 100}%` }} />
                </span>
                {claimed ? (
                  <span className="rr-quest__claimed">
                    <Icon name="check" size={14} strokeWidth={3} /> {text.questClaimed}
                  </span>
                ) : (
                  <button type="button" className="rr-quest__claim" disabled={!done} onClick={() => claimQuestReward(rewardKey, quest.xp)}>
                    {done ? text.questClaim(quest.xp) : `+${quest.xp} XP`}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
