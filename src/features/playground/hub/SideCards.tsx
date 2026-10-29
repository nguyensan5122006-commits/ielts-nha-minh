/**
 * SideCards.tsx — CÁC THẺ NHỎ TRÊN TRANG /play
 * ----------------------------------------------------------------------------
 *   BoardCard   : xếp hạng XP tuần của cả nhà (top 5, dòng của mình tô nổi)
 *   QuestsCard  : 3 nhiệm vụ hôm nay + số phần thưởng đang chờ nhận
 *   BadgesCard  : số huy hiệu đã có (vòng tiến độ) + huy hiệu sắp mở gần nhất
 *   ShopCard    : số chuối + sức mạnh thi đấu đang có
 * Mỗi thẻ có 1 nút đi tiếp (Nhận thưởng / Xem huy hiệu / Vào cửa hàng / Bảng đầy đủ).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { vietnamDay, vietnamWeekId } from '../../../../backend-helpers/vietnam-time'
import { PlayerName } from '../../../components/PlayerIdentity'
import { Button, Icon, ProgressBar, ProgressRing } from '../../../design-system'
import { accountLevelFromXp } from '../../../game-economy/account-level'
import { ACHIEVEMENTS, FAMILY_WEEKLY_QUEST, WEEKLY_QUESTS, pickDailyQuests } from '../../../game-economy/quests-and-achievements'
import { SHOP_ITEMS } from '../../../game-economy/shop-catalog'
import { useFamily } from '../../../family-members/family-store'
import { achievementMetricValue } from '../../../learning-progress/activity-stats'
import { useProgress } from '../../../learning-progress/progress-store'
import { useWallet } from '../../../player-wallet/wallet-store'
import { useRealtime } from '../../../realtime/realtime-store'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import { BananaPill } from '../components/BananaPill'
import { GameArt } from '../components/GameArt'
import { RankRow } from '../components/RankRow'
import { PLAY_ART } from '../game-catalog'
import { usePlayText } from '../playground-text'

/** Khung thẻ nhỏ: ảnh + tiêu đề + (phần phải) / nội dung / nút đáy */
function SideShell({ art, title, aside, children, action, className }: { art: string; title: ReactNode; aside?: ReactNode; children: ReactNode; action: ReactNode; className?: string }) {
  return (
    <article className={['pg-side', className].filter(Boolean).join(' ')}>
      <header className="pg-side__head">
        <GameArt slug={art} size={36} />
        <h3 className="pg-side__title">{title}</h3>
        {aside && <span className="pg-side__aside">{aside}</span>}
      </header>
      <div className="pg-side__body">{children}</div>
      <div className="pg-side__action">{action}</div>
    </article>
  )
}

/* ---------------- Xếp hạng tuần ---------------- */
export function BoardCard() {
  const playText = usePlayText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const { members } = useFamily()
  const { online } = useRealtime()
  const ranked = [...members].sort((a, b) => b.weekXp - a.weekXp)
  const myIndex = ranked.findIndex((member) => member.id === user?.id)
  // top 5; nếu mình ngoài top 5 thì thay dòng cuối bằng dòng của mình
  const shown = ranked.slice(0, 5)
  if (myIndex >= 5) shown[4] = ranked[myIndex]

  return (
    <SideShell
      art={PLAY_ART.leaderboard}
      title={playText('boardTitle')}
      className="pg-side--board"
      action={
        <Button to="/leaderboard" variant="ghost" size="sm" iconRight="arrow-right">
          {playText('boardOpen')}
        </Button>
      }
    >
      {ranked.length === 0 ? (
        <p className="pg-side__empty">{playText('loadingShort')}</p>
      ) : (
        <ol className="pg-rank-list pg-rank-list--compact">
          {shown.map((member, index) => {
            const rank = ranked.indexOf(member) + 1
            const skipped = index > 0 && rank - (ranked.indexOf(shown[index - 1]) + 1) > 1
            return [
              skipped && (
                <li key={`gap-${member.id}`} className="pg-rank-gap" aria-hidden>
                  ···
                </li>
              ),
              <RankRow
                key={member.id}
                rank={rank}
                name={<PlayerName name={member.displayName} nameColorItemId={member.nameColor} />}
                avatar={{ avatarItemId: member.avatar, frameItemId: member.frame, online: online.includes(member.id) }}
                meta={pick(accountLevelFromXp(member.totalXp).title)}
                value={member.weekXp}
                unit="XP"
                isMe={member.id === user?.id}
                to={`/profile/${member.id}`}
              />,
            ]
          })}
        </ol>
      )}
    </SideShell>
  )
}

/* ---------------- Nhiệm vụ hôm nay ---------------- */
export function QuestsCard() {
  const playText = usePlayText()
  const { pick } = useLanguage()
  const { user } = useAuth()
  const { members } = useFamily()
  const { progress } = useProgress()
  const day = vietnamDay()
  const week = vietnamWeekId()
  const counters = progress.questCounters
  const dailyCounts = counters.day === day ? counters.daily : {}
  const weeklyCounts = counters.week === week ? counters.weekly : {}
  const claimed = new Set(progress.claimedRewards)
  const daily = user ? pickDailyQuests(day, user.id) : []

  // phần thưởng đủ điều kiện mà chưa nhận (ngày + tuần + cả nhà)
  const familyXp = members.reduce((sum, member) => sum + member.weekXp, 0)
  const readyCount =
    daily.filter((quest) => (dailyCounts[quest.metric] ?? 0) >= quest.target && !claimed.has(`daily:${day}:${quest.id}`)).length +
    WEEKLY_QUESTS.filter((quest) => (weeklyCounts[quest.metric] ?? 0) >= quest.target && !claimed.has(`weekly:${week}:${quest.id}`)).length +
    (familyXp >= FAMILY_WEEKLY_QUEST.targetXp && !claimed.has(`family:${week}`) ? 1 : 0)
  const allDailyClaimed = daily.length > 0 && daily.every((quest) => claimed.has(`daily:${day}:${quest.id}`))

  return (
    <SideShell
      art={PLAY_ART.quests}
      title={playText('questsTitle')}
      aside={readyCount > 0 ? <span className="pg-side__badge">{readyCount}</span> : undefined}
      action={
        readyCount > 0 ? (
          <Button to="/quests" size="sm" fullWidth iconLeft={<GameArt slug={PLAY_ART.gift} size={20} />}>
            {playText('questsClaim')}
          </Button>
        ) : (
          <Button to="/quests" size="sm" variant="secondary" fullWidth>
            {playText('questsOpen')}
          </Button>
        )
      }
    >
      <ul className="pg-quest-mini">
        {daily.map((quest) => {
          const value = Math.min(dailyCounts[quest.metric] ?? 0, quest.target)
          const done = value >= quest.target
          return (
            <li key={quest.id} className={done ? 'is-done' : undefined}>
              <span className="pg-quest-mini__check" aria-hidden>
                {done ? <Icon name="check" size={14} strokeWidth={3} /> : null}
              </span>
              <span className="pg-quest-mini__text">
                <span className="pg-quest-mini__title">{pick(quest.title)}</span>
                <ProgressBar value={value} max={quest.target} size="sm" color={done ? 'var(--grad-success)' : 'var(--grad-gold)'} label={pick(quest.title)} />
              </span>
              <span className="pg-quest-mini__count ds-num">
                {value}/{quest.target}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="pg-side__note">{readyCount > 0 ? playText('questsReady', { n: readyCount }) : allDailyClaimed ? playText('questsAllClaimed') : playText('questsDayResets')}</p>
    </SideShell>
  )
}

/* ---------------- Huy hiệu ---------------- */
export function BadgesCard() {
  const playText = usePlayText()
  const { pick } = useLanguage()
  const { progress } = useProgress()
  const unlocked = progress.unlockedAchievements.length
  // huy hiệu chưa mở mà gần xong nhất
  const next = ACHIEVEMENTS.filter((achievement) => !progress.unlockedAchievements.includes(achievement.id))
    .map((achievement) => ({ achievement, value: achievementMetricValue(progress, achievement.metric) }))
    .sort((a, b) => b.value / b.achievement.target - a.value / a.achievement.target)[0]

  return (
    <SideShell
      art={PLAY_ART.badges}
      title={playText('badgesTitle')}
      action={
        <Button to="/quests#badges" size="sm" variant="secondary" fullWidth>
          {playText('badgesOpen')}
        </Button>
      }
    >
      <div className="pg-badges-mini">
        <ProgressRing value={unlocked / ACHIEVEMENTS.length} size={76} color="var(--c-gold)" label={playText('badgesCount', { n: unlocked, total: ACHIEVEMENTS.length })}>
          <span className="pg-badges-mini__count">
            <strong className="ds-num">{unlocked}</strong>
            <span className="ds-num">/{ACHIEVEMENTS.length}</span>
          </span>
        </ProgressRing>
        {next && (
          <div className="pg-badges-mini__next">
            <span className="pg-side__label">{playText('badgesNext')}</span>
            <span className="pg-badges-mini__name">
              <GameArt emoji={next.achievement.icon} size={24} />
              {pick(next.achievement.title)}
            </span>
            <ProgressBar value={Math.min(next.value, next.achievement.target)} max={next.achievement.target} size="sm" color="var(--grad-gold)" label={pick(next.achievement.description)} />
            <span className="pg-side__note">
              {pick(next.achievement.description)} · <span className="ds-num">{Math.min(next.value, next.achievement.target)}/{next.achievement.target}</span>
            </span>
          </div>
        )}
      </div>
    </SideShell>
  )
}

/* ---------------- Cửa hàng ---------------- */
const POWERS = SHOP_ITEMS.filter((item) => item.category === 'power')

export function ShopCard() {
  const playText = usePlayText()
  const { pick } = useLanguage()
  const { bananas, quantityOf } = useWallet()
  return (
    <SideShell
      art={PLAY_ART.shop}
      title={playText('shopTitle')}
      action={
        <Button to="/shop" size="sm" variant="secondary" fullWidth iconRight="arrow-right">
          {playText('shopOpen')}
        </Button>
      }
    >
      <div className="pg-shop-mini">
        <BananaPill amount={bananas} size="lg" />
        <p className="pg-side__note">{playText('shopText')}</p>
        <span className="pg-side__label">{playText('shopPowers')}</span>
        <ul className="pg-shop-mini__powers">
          {POWERS.map((power) => (
            <li key={power.id} title={pick(power.name)} className={quantityOf(power.id) === 0 ? 'is-empty' : undefined}>
              <GameArt emoji={power.icon} size={26} />
              <span className="ds-num">{quantityOf(power.id)}</span>
              <span className="ds-visually-hidden">{pick(power.name)}</span>
            </li>
          ))}
        </ul>
      </div>
    </SideShell>
  )
}
