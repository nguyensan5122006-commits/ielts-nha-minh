/**
 * QuestsPage.tsx — NHIỆM VỤ & HUY HIỆU
 * ----------------------------------------------------------------------------
 *  - Nhiệm vụ hôm nay (3 cái, đổi mỗi ngày) + nhiệm vụ tuần + nhiệm vụ cả nhà
 *    Đủ chỉ tiêu -> nút "Nhận" -> cộng XP (claimQuestReward, mỗi nhiệm vụ nhận 1 lần).
 *  - Huy hiệu: tự mở khoá khi đạt (GameWatchers lo việc đó), ở đây chỉ hiển thị
 *    huy hiệu đã có và tiến độ tới huy hiệu tiếp theo.
 * (v3) Giao diện làm lại: mỗi nhiệm vụ có ảnh 3D theo loại việc, nút "Nhận" nổi bật khi xong;
 *      huy hiệu là ô ảnh 3D (chưa mở = xám + thanh tiến độ). /quests#badges cuộn tới huy hiệu.
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { vietnamDay, vietnamWeekId } from '../../backend-helpers/vietnam-time'
import {
  ACHIEVEMENTS,
  FAMILY_WEEKLY_QUEST,
  WEEKLY_QUESTS,
  pickDailyQuests,
  type AchievementDefinition,
  type ActivityMetric,
  type QuestDefinition,
} from '../gamification/quests-and-achievements'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { Badge, Button, Icon, playSound, ProgressBar, ProgressRing } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { achievementMetricValue } from '../learning-progress/activity-stats'
import { useProgress } from '../learning-progress/progress-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/quests.css'

/** Ảnh 3D theo loại việc của nhiệm vụ */
const METRIC_ART: Record<ActivityMetric, string> = {
  lessons: 'blue-book',
  miniTests: 'memo',
  perfectMiniTests: 'star',
  reviews: 'repeat-button',
  xp: 'high-voltage',
  miniGames: 'joystick',
  funCards: 'rainbow',
  dailyWords: 'input-latin-letters',
  examsTaken: 'memo',
  chatMessages: 'speech-balloon',
  studyDays: 'spiral-calendar',
}

/** Gom huy hiệu theo bộ (cùng chỉ số), giữ thứ tự xuất hiện; cấp trong bộ xếp theo mốc tăng dần */
const badgeSeries = ACHIEVEMENTS.reduce<{ metric: AchievementDefinition['metric']; tiers: AchievementDefinition[] }[]>((groups, achievement) => {
  const group = groups.find((item) => item.metric === achievement.metric)
  if (group) group.tiers.push(achievement)
  else groups.push({ metric: achievement.metric, tiers: [achievement] })
  return groups
}, [])

export function QuestsPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { progress, claimQuestReward } = useProgress()
  const { members } = useFamily()
  const location = useLocation()

  const day = vietnamDay()
  const week = vietnamWeekId()
  const counters = progress.questCounters
  const dailyCounts = counters.day === day ? counters.daily : {}
  const weeklyCounts = counters.week === week ? counters.weekly : {}
  const familyXp = members.reduce((sum, m) => sum + m.weekXp, 0)

  // /quests#badges -> cuộn tới mục huy hiệu (link từ trang /play)
  useEffect(() => {
    if (location.hash === '#badges') document.getElementById('badges')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  function claim(rewardKey: string, xp: number) {
    claimQuestReward(rewardKey, xp)
    playSound('sticker')
  }

  function QuestRow({ quest, value, rewardKey }: { quest: QuestDefinition; value: number; rewardKey: string }) {
    const done = value >= quest.target
    const claimed = progress.claimedRewards.includes(rewardKey)
    return (
      <li className={`quest ${done ? 'is-done' : ''} ${claimed ? 'is-claimed' : ''}`}>
        <GameArt slug={METRIC_ART[quest.metric]} size={40} />
        <div className="quest__body">
          <div className="quest__top">
            <strong className="quest__title">{pick(quest.title)}</strong>
            <span className="quest__count ds-num">
              {Math.min(value, quest.target)}/{quest.target}
            </span>
          </div>
          <ProgressBar value={Math.min(value, quest.target)} max={quest.target} size="sm" color={done ? 'var(--grad-success)' : 'var(--grad-gold)'} label={pick(quest.title)} />
        </div>
        <div className="quest__reward">
          {claimed ? (
            <Badge tone="success" icon="check">
              {t('claimed')}
            </Badge>
          ) : done ? (
            <Button size="sm" onClick={() => claim(rewardKey, quest.xp)} iconLeft={<GameArt slug="high-voltage" size={18} />}>
              {playText('claimShort')} +{quest.xp} XP
            </Button>
          ) : (
            <span className="quest__prize">
              <GameArt slug="high-voltage" size={18} /> +{quest.xp} XP
            </span>
          )}
        </div>
      </li>
    )
  }

  const familyKey = `family:${week}`
  const familyDone = familyXp >= FAMILY_WEEKLY_QUEST.targetXp
  const familyClaimed = progress.claimedRewards.includes(familyKey)
  // chỉ đếm huy hiệu còn trong danh sách (huy hiệu của trò chơi đã xoá vẫn có thể nằm trong dữ liệu cũ)
  const unlockedCount = ACHIEVEMENTS.filter((achievement) => progress.unlockedAchievements.includes(achievement.id)).length

  return (
    <main className="page pg-page quests">
      <PlayPageHeader back art={PLAY_ART.quests} artPlate="red" title={t('questsTitle')} intro={t('questsIntro')} />

      <div className="quests__layout">
        <div className="quests__column">
          <section className="pg-panel" aria-labelledby="quests-daily">
            <h2 id="quests-daily" className="pg-panel__title">
              <GameArt slug="sun" size={30} /> {t('dailyQuests')}
              <span className="pg-panel__aside">{playText('questsDayResets')}</span>
            </h2>
            <ul className="quest-list">
              {user &&
                pickDailyQuests(day, user.id).map((quest) => (
                  <QuestRow key={quest.id} quest={quest} value={dailyCounts[quest.metric] ?? 0} rewardKey={`daily:${day}:${quest.id}`} />
                ))}
            </ul>
          </section>

          <section className="pg-panel" aria-labelledby="quests-weekly">
            <h2 id="quests-weekly" className="pg-panel__title">
              <GameArt slug="spiral-calendar" size={30} /> {t('weeklyQuests')}
              <span className="pg-panel__aside">{playText('questsWeekResets')}</span>
            </h2>
            <ul className="quest-list">
              {WEEKLY_QUESTS.map((quest) => (
                <QuestRow key={quest.id} quest={quest} value={weeklyCounts[quest.metric] ?? 0} rewardKey={`weekly:${week}:${quest.id}`} />
              ))}
            </ul>
          </section>

          <section className="quests-family" aria-labelledby="quests-family">
            <div className="quests-family__head">
              <GameArt slug="house-with-garden" size={48} />
              <div>
                <h2 id="quests-family">{t('familyQuest')}</h2>
                <p>{pick(FAMILY_WEEKLY_QUEST.title)}</p>
              </div>
            </div>
            <ProgressBar
              value={Math.min(familyXp, FAMILY_WEEKLY_QUEST.targetXp)}
              max={FAMILY_WEEKLY_QUEST.targetXp}
              size="lg"
              color="var(--grad-success)"
              label={t('familyXpProgress')}
              valueText={`${familyXp}/${FAMILY_WEEKLY_QUEST.targetXp} XP`}
            />
            <ul className="quests-family__members">
              {[...members]
                .sort((a, b) => b.weekXp - a.weekXp)
                .slice(0, 8)
                .map((m) => (
                  <li key={m.id} className={m.id === user?.id ? 'is-me' : undefined}>
                    <PlayerAvatar avatarItemId={m.avatar} size={24} />
                    <span>{m.displayName}</span>
                    <strong className="ds-num">{m.weekXp}</strong>
                  </li>
                ))}
              {members.length > 8 && <li className="is-more">{playText('familyMore', { n: members.length - 8 })}</li>}
            </ul>
            <div className="quests-family__foot">
              <span className="quests-family__hint">{playText('questsFamilyHint')}</span>
              {familyClaimed ? (
                <Badge tone="success" icon="check">
                  {t('claimed')}
                </Badge>
              ) : (
                <Button size="sm" disabled={!familyDone} onClick={() => claim(familyKey, FAMILY_WEEKLY_QUEST.xp)} iconLeft={<GameArt slug="high-voltage" size={18} />}>
                  {familyDone ? `${playText('claimShort')} +${FAMILY_WEEKLY_QUEST.xp} XP` : `+${FAMILY_WEEKLY_QUEST.xp} XP`}
                </Button>
              )}
            </div>
          </section>
        </div>

        <section className="pg-panel quests-badges" id="badges" aria-labelledby="quests-badges">
          <div className="quests-badges__head">
            <ProgressRing value={unlockedCount / ACHIEVEMENTS.length} size={72} color="var(--c-gold)" label={playText('badgesCount', { n: unlockedCount, total: ACHIEVEMENTS.length })}>
              <strong className="ds-num">{unlockedCount}</strong>
            </ProgressRing>
            <div>
              <h2 id="quests-badges">{t('badges')}</h2>
              <p>{playText('badgesCount', { n: unlockedCount, total: ACHIEVEMENTS.length })}</p>
            </div>
          </div>
          {/* Huy hiệu xếp theo "bộ" (cùng 1 chỉ số, nhiều cấp I → V): mỗi bộ 1 ô, chấm tròn = cấp đã mở,
              thanh tiến độ = tới cấp kế tiếp. 44 huy hiệu -> 15 ô, dễ nhìn hơn. */}
          <ul className="badge-wall">
            {badgeSeries.map((series) => {
              const unlockedTiers = series.tiers.filter((tier) => progress.unlockedAchievements.includes(tier.id))
              const nextTier = series.tiers.find((tier) => !progress.unlockedAchievements.includes(tier.id))
              const shown = nextTier ?? series.tiers[series.tiers.length - 1]
              const value = achievementMetricValue(progress, series.metric)
              const anyUnlocked = unlockedTiers.length > 0
              const complete = !nextTier
              return (
                <li key={series.metric} className={`badge-cell ${anyUnlocked ? 'is-unlocked' : ''} ${complete ? 'is-complete' : ''}`} title={pick(shown.description)}>
                  <span className="badge-cell__art">
                    <GameArt emoji={shown.icon} size={44} />
                    {!anyUnlocked && (
                      <span className="badge-cell__lock" aria-hidden>
                        <Icon name="lock" size={12} strokeWidth={2.5} />
                      </span>
                    )}
                  </span>
                  <strong className="badge-cell__title">{pick(unlockedTiers[unlockedTiers.length - 1]?.title ?? shown.title)}</strong>
                  <span className="badge-cell__tiers" aria-label={`${unlockedTiers.length}/${series.tiers.length}`}>
                    {series.tiers.map((tier) => (
                      <i key={tier.id} className={progress.unlockedAchievements.includes(tier.id) ? 'is-on' : undefined} />
                    ))}
                  </span>
                  {nextTier ? (
                    <span className="badge-cell__progress">
                      <span className="badge-cell__desc">{pick(nextTier.description)}</span>
                      <ProgressBar value={Math.min(value, nextTier.target)} max={nextTier.target} size="sm" showHead={false} color="var(--grad-gold)" label={pick(nextTier.title)} />
                      <span className="ds-num">
                        {Math.min(value, nextTier.target)}/{nextTier.target}
                      </span>
                    </span>
                  ) : (
                    <Badge tone="gold" size="sm" icon="star">
                      {playText('badgesComplete')}
                    </Badge>
                  )}
                  <span className="ds-visually-hidden">{anyUnlocked ? t('owned') : playText('badgesLocked')}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}
