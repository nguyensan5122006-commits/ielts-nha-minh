/**
 * EventCards.tsx — 3 THẺ SỰ KIỆN TRÊN TRANG /play
 * ----------------------------------------------------------------------------
 *   DailyWordCard  : Thử thách từ hôm nay — mình đã đoán chưa, mấy lượt, cả nhà ai đã chơi
 *   TournamentCard : Giải đấu tuần — chủ đề, hạng của mình, người dẫn đầu, còn mấy ngày
 *   BossCard       : Boss cả nhà — thanh máu chung, hôm nay mình còn đánh được bao nhiêu
 * Mỗi thẻ có đúng 1 nút hành động ở đáy (bước tiếp theo rõ ràng).
 * Đang tải -> khung xương; lỗi mạng -> 1 dòng nhắc + nút vẫn bấm được (trang con tự tải lại).
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { vietnamDay } from '../../../../backend-helpers/vietnam-time'
import { Button, ProgressBar, Skeleton } from '../../../design-system'
import { BOSS_DEFEAT_REWARD } from '../../../game-economy/banana-rewards'
import { findGameTopic } from '../../../game-questions/question-bank'
import { useAuth } from '../../../services/auth-context'
import type { BossState, DailyWordState, WeeklyTournamentState } from '../../../services/api-client'
import { useLanguage } from '../../../translations/language-context'
import { GameArt, type ArtPlate } from '../components/GameArt'
import { emojiArtSlug } from '../emoji-art'
import { PLAY_ART } from '../game-catalog'
import { usePlayText } from '../playground-text'
import { daysLeftInWeek, isReady, type Loadable } from '../use-playground-data'

/** Khung chung của 1 thẻ sự kiện: ảnh 3D + nhãn nhỏ + tiêu đề + nội dung + nút ở đáy */
function EventShell({ art, plate, eyebrow, title, tone, children, action }: { art: string; plate: ArtPlate; eyebrow: ReactNode; title: ReactNode; tone: string; children: ReactNode; action: ReactNode }) {
  return (
    <article className={`pg-event pg-event--${tone}`}>
      <div className="pg-event__top">
        <GameArt slug={art} size={56} plate={plate} tilt={-6} />
        <div className="pg-event__heading">
          <span className="pg-event__eyebrow">{eyebrow}</span>
          <h3 className="pg-event__title">{title}</h3>
        </div>
      </div>
      <div className="pg-event__body">{children}</div>
      <div className="pg-event__action">{action}</div>
    </article>
  )
}

/** Đọc số lượt đang đoán dở hôm nay (trang Thử thách từ lưu trong máy) */
function localGuessCount(): number {
  try {
    const guesses = JSON.parse(localStorage.getItem(`ielts-daily-word-${vietnamDay()}`) ?? '[]') as unknown
    return Array.isArray(guesses) ? guesses.length : 0
  } catch {
    return 0
  }
}

/** Ô màu nhỏ của 1 kết quả Wordle ("🟩🟨⬜…" mỗi dòng 1 lượt) */
function PatternMini({ pattern }: { pattern: string }) {
  const rows = pattern.split('\n').filter(Boolean)
  return (
    <span className="pg-wordle-mini" aria-hidden>
      {rows.map((row, rowIndex) => (
        <span key={rowIndex} className="pg-wordle-mini__row">
          {[...row].map((cell, cellIndex) => (
            <i key={cellIndex} className={cell === '🟩' ? 'is-correct' : cell === '🟨' ? 'is-present' : 'is-absent'} />
          ))}
        </span>
      ))}
    </span>
  )
}

export function DailyWordCard({ data }: { data: Loadable<DailyWordState> }) {
  const playText = usePlayText()
  const { t } = useLanguage()
  const { user } = useAuth()
  const ready = isReady(data)
  const mine = ready ? data.mine : null
  const othersPlayed = ready ? data.results.filter((result) => result.userId !== user?.id).length : 0
  const inProgress = !mine ? localGuessCount() : 0

  let status: ReactNode
  if (data === 'loading') status = <Skeleton lines={2} />
  else if (mine) {
    status = (
      <div className="pg-event__split">
        <PatternMini pattern={mine.pattern} />
        <p className="pg-event__status">{mine.solved ? playText('dailySolved', { n: mine.guesses }) : playText('dailyFailed')}</p>
      </div>
    )
  } else
    status = (
      <p className="pg-event__status">
        {inProgress > 0 ? `${playText('dailyNotPlayed')} · ${inProgress}/6` : playText('dailyNotPlayed')}
      </p>
    )

  return (
    <EventShell
      art={PLAY_ART.dailyWord}
      plate="gold"
      tone="gold"
      eyebrow={playText('eventToday')}
      title={t('dailyWordTitle')}
      action={
        mine ? (
          <Button to="/daily-word" variant="secondary" fullWidth>
            {playText('dailySeeFamily')}
          </Button>
        ) : (
          <Button to="/daily-word" fullWidth iconRight="arrow-right">
            {playText('dailyPlay')}
          </Button>
        )
      }
    >
      {status}
      {ready && <p className="pg-event__meta">{othersPlayed > 0 ? playText('dailyFamily', { n: othersPlayed }) : playText('dailyNobody')}</p>}
      {data === 'error' && <p className="pg-event__meta">{playText('couldNotLoad')}</p>}
    </EventShell>
  )
}

export function TournamentCard({ data }: { data: Loadable<WeeklyTournamentState> }) {
  const playText = usePlayText()
  const { t, pick } = useLanguage()
  const { user } = useAuth()
  const daysLeft = daysLeftInWeek()
  const eyebrow = `${playText('eventThisWeek')} · ${daysLeft === 0 ? playText('lastDay') : playText('daysLeft', { n: daysLeft })}`

  let body: ReactNode
  let hasScore = false
  if (data === 'loading') body = <Skeleton lines={2} />
  else if (data === 'error') body = <p className="pg-event__meta">{playText('couldNotLoad')}</p>
  else {
    const topic = findGameTopic(`fun:${data.topicId}`)
    const myIndex = data.leaderboard.findIndex((entry) => entry.userId === user?.id)
    const leader = data.leaderboard[0]
    hasScore = myIndex >= 0
    body = (
      <>
        <p className="pg-event__topic">
          {topic && <GameArt emoji={topic.icon} size={26} />}
          <span>
            <span className="pg-event__meta">{playText('tourTopic')}</span>
            <strong>{topic ? pick(topic.title) : data.topicId}</strong>
          </span>
        </p>
        <p className="pg-event__status">
          {hasScore ? playText('tourYourRank', { rank: myIndex + 1, total: data.leaderboard.length }) : playText('tourNoScore')}
        </p>
        {leader && leader.userId !== user?.id && <p className="pg-event__meta">{playText('tourLeader', { name: leader.displayName, n: leader.bestScore })}</p>}
        {hasScore && myIndex === 0 && <p className="pg-event__meta">{playText('tourBest', { n: data.leaderboard[0].bestScore })}</p>}
      </>
    )
  }

  return (
    <EventShell
      art={PLAY_ART.tournament}
      plate="primary"
      tone="primary"
      eyebrow={eyebrow}
      title={t('tournamentTitle')}
      action={
        <Button to="/tournament" fullWidth variant={hasScore ? 'secondary' : 'primary'} iconRight={hasScore ? undefined : 'arrow-right'}>
          {hasScore ? playText('tourImprove') : playText('tourPlay')}
        </Button>
      }
    >
      {body}
    </EventShell>
  )
}

export function BossCard({ data }: { data: Loadable<BossState> }) {
  const playText = usePlayText()
  const { t, pick } = useLanguage()
  const { user } = useAuth()

  if (!isReady(data)) {
    return (
      <EventShell
        art={PLAY_ART.boss}
        plate="red"
        tone="red"
        eyebrow={playText('eventThisWeek')}
        title={t('bossTitle')}
        action={
          <Button to="/boss" fullWidth variant="secondary">
            {playText('bossAttack')}
          </Button>
        }
      >
        {data === 'loading' ? <Skeleton lines={2} /> : <p className="pg-event__meta">{playText('couldNotLoad')}</p>}
      </EventShell>
    )
  }

  const leftToday = Math.max(0, data.dailyDamageLimit - data.myDamageToday)
  const contributed = data.contributors.some((contributor) => contributor.userId === user?.id)
  const hpPercent = data.maxHp > 0 ? data.hp / data.maxHp : 0

  let action: ReactNode
  let status: string
  if (data.defeated) {
    status = playText('bossDefeated')
    action =
      contributed && !data.claimed ? (
        <Button to="/boss" fullWidth iconLeft={<GameArt slug={PLAY_ART.gift} size={22} />}>
          {playText('bossClaim', { n: BOSS_DEFEAT_REWARD })}
        </Button>
      ) : (
        <Button to="/boss" fullWidth variant="secondary">
          {data.claimed ? playText('bossClaimed') : t('bossTitle')}
        </Button>
      )
  } else if (leftToday === 0) {
    status = playText('bossDoneToday')
    action = (
      <Button to="/boss" fullWidth variant="secondary">
        {t('bossContributors')}
      </Button>
    )
  } else {
    status = playText('bossLeftToday', { n: leftToday })
    action = (
      <Button to="/boss" fullWidth iconRight="arrow-right">
        {playText('bossAttack')}
      </Button>
    )
  }

  return (
    <EventShell
      art={emojiArtSlug(data.defeated ? '💀' : data.boss.emoji) ?? PLAY_ART.boss}
      plate="red"
      tone="red"
      eyebrow={`${playText('eventThisWeek')} · ${t('bossTitle')}`}
      title={pick(data.boss.name)}
      action={action}
    >
      <div className="pg-boss-mini">
        <div className="pg-boss-mini__bar">
          <ProgressBar value={data.hp} max={data.maxHp} size="sm" showHead={false} color="linear-gradient(90deg, var(--c-red), var(--c-oops))" label={playText('bossHp')} />
          <span className="pg-boss-mini__hp ds-num">
            {data.hp}/{data.maxHp} · {Math.round(hpPercent * 100)}%
          </span>
        </div>
      </div>
      <p className="pg-event__status">{status}</p>
      {data.contributors.length > 0 && <p className="pg-event__meta">{playText('bossTeam', { n: data.contributors.length })}</p>}
    </EventShell>
  )
}
