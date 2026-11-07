/**
 * LeaderboardPage.tsx — BẢNG XẾP HẠNG GIA ĐÌNH
 * 2 tab: XP tuần này (mặc định, reset thứ Hai) và tổng XP mọi thời gian.
 * Mỗi dòng: avatar + khung, tên màu + danh hiệu, Lv, chấm online. Bấm để xem hồ sơ.
 * (v3) Giao diện làm lại: bục top 3, dòng của mình luôn tô nổi, thẻ "vị trí của bạn"
 *      cho biết còn bao nhiêu XP để vượt người phía trên + nút đi học (bước tiếp theo).
 */
import { useEffect, useState } from 'react'
import { accountLevelFromXp } from '../../gamification/account-level'
import { PlayerAvatar, PlayerName } from '../../components/PlayerIdentity'
import { Button, EmptyState, SegmentedControl, Skeleton } from '../../design-system'
import { GameArt } from '../playground/components/GameArt'
import { PlayPageHeader } from '../playground/components/PlayPageHeader'
import { Podium } from '../playground/components/Podium'
import { RankRow } from '../playground/components/RankRow'
import { PLAY_ART } from '../playground/game-catalog'
import { usePlayText } from '../playground/playground-text'
import { useFamily } from '../../family-members/family-store'
import { useRealtime } from '../../realtime/realtime-store'
import { useAuth } from '../../services/auth-context'
import { useLanguage } from '../../translations/language-context'
import '../playground/styles/play-kit.css'
import '../playground/styles/leaderboard.css'

export function LeaderboardPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { members, refreshMembers } = useFamily()
  const { online } = useRealtime()
  const [tab, setTab] = useState<'week' | 'all'>('week')

  useEffect(() => {
    void refreshMembers() // số XP mới nhất
  }, [refreshMembers])

  const xpOf = (member: (typeof members)[number]) => (tab === 'week' ? member.weekXp : member.totalXp)
  const sorted = [...members].sort((a, b) => xpOf(b) - xpOf(a))
  const myIndex = sorted.findIndex((member) => member.id === user?.id)
  const me = sorted[myIndex]
  const ahead = myIndex > 0 ? sorted[myIndex - 1] : undefined
  const nobodyHasXp = sorted.every((member) => xpOf(member) === 0)

  return (
    <main className="page pg-page pg-page--narrow board">
      <PlayPageHeader back art={PLAY_ART.leaderboard} artPlate="gold" title={t('leaderboardTitle')} intro={t('leaderboardIntro')} />

      {/* vị trí của bạn + bước tiếp theo */}
      {me && (
        <section className="board-me">
          <PlayerAvatar avatarItemId={me.avatar} size={56} online />
          <div className="board-me__text">
            <strong>{playText('boardYourRank', { rank: myIndex + 1, total: sorted.length })}</strong>
            <span>
              {myIndex === 0 && xpOf(me) > 0
                ? playText('boardTop')
                : ahead
                  ? playText('boardGapUp', { n: xpOf(ahead) - xpOf(me) + 1, name: ahead.displayName })
                  : ''}
            </span>
          </div>
          <span className="board-me__xp ds-num">
            {xpOf(me)} <small>XP</small>
          </span>
          <Button to="/learn" size="md" iconRight="arrow-right">
            {playText('boardStudyCta')}
          </Button>
        </section>
      )}

      <div className="board-tabs">
        <SegmentedControl<'week' | 'all'>
          label={t('leaderboardTitle')}
          value={tab}
          onChange={setTab}
          options={[
            { value: 'week', label: playText('boardTabWeek') },
            { value: 'all', label: playText('boardTabAll') },
          ]}
        />
      </div>

      <section className="pg-panel board-panel">
        {members.length === 0 ? (
          <Skeleton variant="rect" height={240} />
        ) : nobodyHasXp ? (
          <EmptyState
            pose="sleepy"
            title={playText('boardEmpty')}
            text={t('leaderboardIntro')}
            action={
              <Button to="/learn" iconRight="arrow-right">
                {playText('boardStudyCta')}
              </Button>
            }
          />
        ) : (
          <>
            <Podium
              entries={sorted.slice(0, 3).map((member) => ({
                id: member.id,
                name: member.displayName,
                score: xpOf(member),
                avatarItemId: member.avatar,
              }))}
              meId={user?.id}
              unit="XP"
            />
            <ol className="pg-rank-list board-list" start={4}>
              {sorted.slice(3).map((member, index) => {
                const level = accountLevelFromXp(member.totalXp)
                return (
                  <RankRow
                    key={member.id}
                    rank={index + 4}
                    name={<PlayerName name={member.displayName} />}
                    avatar={{ avatarItemId: member.avatar, online: online.includes(member.id) }}
                    meta={`Lv.${level.level} · ${pick(level.title)}`}
                    value={xpOf(member)}
                    unit="XP"
                    isMe={member.id === user?.id}
                    to={`/profile/${member.id}`}
                  />
                )
              })}
            </ol>
          </>
        )}
      </section>

      <p className="board-foot">
        <GameArt slug="busts-in-silhouette" size={22} /> {t('leaderboardIntro')}
      </p>
    </main>
  )
}
