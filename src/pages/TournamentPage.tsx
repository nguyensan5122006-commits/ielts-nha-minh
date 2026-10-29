/**
 * TournamentPage.tsx — GIẢI ĐẤU TUẦN
 * Mỗi tuần 1 chủ đề Học vui. Làm 15 câu tính giờ, chơi lại bao nhiêu lần cũng được,
 * lấy điểm cao nhất. Hết tuần: hạng 1-2-3 nhận 100 / 50 / 25 🍌 (+ cúp cho hạng 1).
 * (v3) Giao diện làm lại: thẻ chủ đề tuần + nút Chơi lớn, bảng điểm tuần (dòng của mình tô nổi,
 *      top 3 có thưởng chuối), bục vô địch tuần trước. Logic gọi API giữ nguyên.
 */
import { useEffect, useState } from 'react'
import { findGameTopic, generateQuestions, type GameQuestion } from '../game-questions/question-bank'
import { TOURNAMENT_QUESTION_COUNT, TOURNAMENT_SECONDS_PER_QUESTION } from '../game-economy/weekly-events'
import { SoloQuestionRunner, type SoloRunResult } from '../games/SoloQuestionRunner'
import { Button, EmptyState, Icon, Skeleton } from '../design-system'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { Podium } from '../features/playground/components/Podium'
import { RankRow } from '../features/playground/components/RankRow'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { daysLeftInWeek } from '../features/playground/use-playground-data'
import { useFamily } from '../family-members/family-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api, type WeeklyTournamentState } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/events.css'

export function TournamentPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const { refreshWallet } = useWallet()
  const [state, setState] = useState<WeeklyTournamentState | null>(null)
  const [questions, setQuestions] = useState<GameQuestion[] | null>(null)
  const [lastRun, setLastRun] = useState<SoloRunResult | null>(null)

  const load = () =>
    api
      .getWeeklyTournament()
      .then((data) => {
        setState(data)
        void refreshWallet() // có thể vừa được trao giải tuần trước
      })
      .catch(() => {})
  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!state)
    return (
      <main className="page pg-page events">
        <Skeleton variant="rect" height={200} />
      </main>
    )
  const topic = findGameTopic(`fun:${state.topicId}`)
  const lastTopic = findGameTopic(`fun:${state.lastWeek.topicId}`)
  const myIndex = state.leaderboard.findIndex((entry) => entry.userId === user?.id)
  const myBest = myIndex >= 0 ? state.leaderboard[myIndex].bestScore : undefined
  const daysLeft = daysLeftInWeek()

  async function finish(run: SoloRunResult) {
    setQuestions(null)
    setLastRun(run)
    await api.submitTournamentScore(run.score).catch(() => {})
    void load()
  }

  const startRun = () => setQuestions(generateQuestions('quiz', `fun:${state.topicId}`, TOURNAMENT_QUESTION_COUNT, Math.floor(Math.random() * 2 ** 31)))

  if (questions) {
    return (
      <main className="page pg-page pg-page--narrow events">
        <div className="ev-playing-head">
          <GameArt slug={PLAY_ART.tournament} size={40} />
          <span>{t('tournamentTitle')}</span>
          {topic && (
            <span className="ev-playing-head__topic">
              <GameArt emoji={topic.icon} size={24} /> {pick(topic.title)}
            </span>
          )}
        </div>
        <SoloQuestionRunner questions={questions} secondsPerQuestion={TOURNAMENT_SECONDS_PER_QUESTION} onFinish={finish} />
      </main>
    )
  }

  return (
    <main className="page pg-page events">
      <PlayPageHeader back art={PLAY_ART.tournament} artPlate="primary" title={t('tournamentTitle')} intro={t('tournamentIntro', { first: state.prizes[0], second: state.prizes[1], third: state.prizes[2] })} />

      {/* thẻ chủ đề tuần */}
      <section className="ev-hero ev-hero--tournament">
        {topic && <GameArt emoji={topic.icon} size={88} plate="primary" tilt={-6} />}
        <div className="ev-hero__text">
          <span className="ev-hero__eyebrow">
            {playText('tourTopic')} · {daysLeft === 0 ? playText('lastDay') : playText('daysLeft', { n: daysLeft })}
          </span>
          <h2 className="ev-hero__title">{topic ? pick(topic.title) : state.topicId}</h2>
          <ul className="ev-hero__facts">
            <li>
              <Icon name="clock" size={16} /> {TOURNAMENT_QUESTION_COUNT} {t('questionsWord')} · {TOURNAMENT_SECONDS_PER_QUESTION}s
            </li>
            <li>
              <Icon name="star" size={16} /> {t('yourBest')}: <strong className="ds-num">{myBest ?? '—'}</strong>
            </li>
            {myIndex >= 0 && <li>{playText('tourYourRank', { rank: myIndex + 1, total: state.leaderboard.length })}</li>}
          </ul>
        </div>
        <div className="ev-hero__cta">
          <Button size="lg" onClick={startRun} iconLeft="play-fill">
            {myBest !== undefined ? playText('tourImprove') : t('play')}
          </Button>
        </div>
      </section>

      {lastRun && (
        <p className="pg-note pg-note--success ev-lastrun" role="status">
          <Icon name="star" size={18} /> {playText('tourLastRun', { score: lastRun.score, correct: lastRun.correct, total: lastRun.total })}
        </p>
      )}

      <div className="ev-columns">
        <section className="pg-panel">
          <h3 className="pg-panel__title">
            <GameArt slug="bar-chart" size={28} /> {t('weekStandings')}
            <span className="pg-panel__aside">{state.week}</span>
          </h3>
          {state.leaderboard.length === 0 ? (
            <EmptyState pose="thumbs-up" mascotSize={110} title={t('nobodyYet')} action={<Button onClick={startRun}>{t('play')}</Button>} />
          ) : (
            <ol className="pg-rank-list">
              {state.leaderboard.map((entry, index) => (
                <RankRow
                  key={entry.userId}
                  rank={index + 1}
                  name={entry.displayName}
                  avatar={{ avatarItemId: memberById(entry.userId)?.avatar, frameItemId: memberById(entry.userId)?.frame }}
                  value={entry.bestScore}
                  unit={playText('pointsUnit')}
                  extra={index < 3 ? <BananaPill amount={state.prizes[index]} size="sm" /> : undefined}
                  isMe={entry.userId === user?.id}
                />
              ))}
            </ol>
          )}
        </section>

        <section className="pg-panel">
          <h3 className="pg-panel__title">
            <GameArt slug="sports-medal" size={28} /> {t('lastWeekChampions')}
            {lastTopic && <span className="pg-panel__aside">{pick(lastTopic.title)}</span>}
          </h3>
          {state.lastWeek.podium.length === 0 ? (
            <p className="ev-empty">{t('nobodyYet')}</p>
          ) : (
            <Podium
              entries={state.lastWeek.podium.map((entry) => ({
                id: entry.userId,
                name: entry.displayName,
                score: entry.bestScore,
                avatarItemId: memberById(entry.userId)?.avatar,
                frameItemId: memberById(entry.userId)?.frame,
              }))}
              meId={user?.id}
              unit={playText('pointsUnit')}
            />
          )}
        </section>
      </div>
    </main>
  )
}
