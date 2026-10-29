/**
 * ProfilePage.tsx — TRANG CÁ NHÂN /profile/:userId
 * Avatar + tên + danh hiệu (theo level), level tài khoản, thống kê học tập,
 * kỷ lục trò chơi chữ, huy hiệu.
 * Xem người khác: có nút "Nhắn riêng".
 * (v3) Giao diện làm lại: thẻ đầu trang lớn, ô thống kê có ảnh 3D, kỷ lục theo trò chơi,
 *      tường huy hiệu; trang của mình có nút Cài đặt. /profile (không id) -> trang của mình.
 */
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { accountLevelFromXp } from '../gamification/account-level'
import { ACHIEVEMENTS } from '../gamification/quests-and-achievements'
import { PlayerAvatar, PlayerName } from '../components/PlayerIdentity'
import { Badge, Button, EmptyState, Icon, ProgressBar, Skeleton } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { miniGameInfo } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useRealtime } from '../realtime/realtime-store'
import { api, type ProfileData } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/profile.css'

export function ProfilePage() {
  const { userId = '' } = useParams()
  const { user } = useAuth()
  const { online } = useRealtime()
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    setProfile(null)
    setError('')
    api
      .getProfile(Number(userId))
      .then(setProfile)
      .catch((e: Error) => setError(e.message))
  }, [userId])

  // /profile (menu "Hồ sơ") -> trang của chính mình
  if (!userId && user) return <Navigate to={`/profile/${user.id}`} replace />

  if (error)
    return (
      <main className="page pg-page pg-page--narrow">
        <div className="pg-panel">
          <EmptyState pose="surprised" title={playText('couldNotLoad')} action={<Button onClick={() => window.location.reload()}>{playText('retry')}</Button>} />
        </div>
      </main>
    )
  if (!profile)
    return (
      <main className="page pg-page profile">
        <Skeleton variant="rect" height={180} />
        <Skeleton variant="rect" height={120} />
      </main>
    )

  const isMe = profile.user.id === user?.id
  const level = accountLevelFromXp(profile.totalXp)
  const stats = profile.stats
  const statTiles: [string, string, number | string | null | undefined][] = [
    ['blue-book', t('statLessons'), stats.lessons],
    ['star', t('statPerfect'), stats.perfectMiniTests],
    ['brain', t('statWords'), stats.wordsLearned],
    ['fire', t('statLongestStreak'), stats.longestStreak],
    ['chequered-flag', t('statLevelTests'), stats.levelTests],
    ['rainbow', t('statFunCards'), stats.funCards ?? 0],
    ['input-latin-letters', t('statDailyWords'), stats.dailyWords ?? 0],
  ]
  // chỉ hiện huy hiệu / kỷ lục còn trong danh sách (dữ liệu cũ có thể còn của trò chơi đã xoá)
  const badges = ACHIEVEMENTS.filter((a) => profile.achievements.includes(a.id))
  const records = profile.records.filter((record) => miniGameInfo(record.game))

  return (
    <main className="page pg-page profile">
      <Link to="/play" className="pg-back">
        <span className="pg-back__arrow" aria-hidden>
          <Icon name="arrow-right" size={16} />
        </span>
        {playText('backToPlay')}
      </Link>

      {/* thẻ đầu trang */}
      <section className="profile-hero">
        <PlayerAvatar avatarItemId={profile.user.avatar} size={112} online={online.includes(profile.user.id)} />
        <div className="profile-hero__text">
          <h1 className="profile-hero__name">
            <PlayerName name={profile.user.displayName} title={pick(level.title)} showTitle />
          </h1>
          <div className="profile-hero__level">
            <Badge tone="olive" variant="solid">
              Lv.{level.level}
            </Badge>
            <span className="ds-num">
              {profile.totalXp} XP · {level.xpIntoLevel}/{level.xpNeeded} {t('toNextLevel')}
            </span>
          </div>
          <ProgressBar value={level.xpIntoLevel} max={level.xpNeeded} size="sm" label={t('toNextLevel')} className="profile-hero__bar" />
        </div>
        <div className="profile-hero__actions">
          {isMe ? (
            <Button to="/settings" variant="ghost" iconLeft="settings">
              {playText('profileSettings')}
            </Button>
          ) : (
            <Button to={`/chat?dm=${profile.user.id}`} variant="secondary" iconLeft="chat">
              {t('messagePrivately')}
            </Button>
          )}
        </div>
      </section>

      <h2 className="pg-section-title">{playText('profileStats')}</h2>
      <ul className="profile-stats">
        {statTiles.map(([art, label, value]) => (
          <li key={label} className="profile-stat">
            <GameArt slug={art} size={36} />
            <strong className="profile-stat__value ds-num">{value ?? 0}</strong>
            <span className="profile-stat__label">{label}</span>
          </li>
        ))}
      </ul>

      <div className="profile-columns">
        <section className="pg-panel">
          <h2 className="pg-panel__title">
            <GameArt slug="joystick" size={28} /> {t('gameRecords')}
          </h2>
          {records.length === 0 ? (
            <p className="profile-empty">{t('noRecordsYet')}</p>
          ) : (
            <ul className="profile-records">
              {records.map((record) => {
                const game = miniGameInfo(record.game)
                return (
                  <li key={record.game}>
                    {game && <GameArt slug={game.art} size={32} />}
                    <span>{game ? t(`game_${game.id}`) : record.game}</span>
                    <strong className="ds-num">{record.bestScore}</strong>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
        <section className="pg-panel">
          <h2 className="pg-panel__title">
            <GameArt slug="sports-medal" size={28} /> {t('badges')}
            <span className="pg-panel__aside ds-num">
              {badges.length}/{ACHIEVEMENTS.length}
            </span>
          </h2>
          {badges.length === 0 ? (
            <EmptyState
              pose="thumbs-up"
              mascotSize={96}
              title={t('noBadgesYet')}
              action={
                isMe ? (
                  <Button to="/quests#badges" variant="secondary" size="sm">
                    {playText('badgesOpen')}
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <ul className="profile-badges">
              {badges.map((achievement) => (
                <li key={achievement.id} title={pick(achievement.description)}>
                  <span className="profile-badges__art">
                    <GameArt emoji={achievement.icon} size={34} />
                  </span>
                  <span>{pick(achievement.title)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
