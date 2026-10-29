/**
 * BossPage.tsx — ĐÁNH BOSS CẢ NHÀ
 * ----------------------------------------------------------------------------
 * Mỗi tuần 1 boss có thanh máu chung cho cả nhà. Mỗi lượt đánh = 10 câu hỏi tổng hợp:
 * trả lời đúng = 1 đòn (10 sát thương + thưởng combo tới +10). Hết lượt gửi sát thương lên máy chủ.
 * Mỗi người tối đa 400 sát thương / ngày để ai cũng góp phần.
 * Boss gục -> mọi người đã góp sức bấm "Nhận thưởng" được 40 🍌.
 * (v3) Giao diện làm lại: boss ảnh 3D lớn trong "hang" đỏ, rung + số sát thương bay lên khi trúng,
 *      thanh máu dày, cột phải là sát thương hôm nay + nút Đánh / Nhận thưởng, bảng người góp sức.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { generateQuestions, type GameQuestion } from '../game-questions/question-bank'
import { bossHitDamage } from '../game-economy/weekly-events'
import { BOSS_DEFEAT_REWARD } from '../game-economy/banana-rewards'
import { SoloQuestionRunner } from '../games/SoloQuestionRunner'
import { Badge, Button, Mascot, playSound, ProgressBar, Skeleton } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { RankRow } from '../features/playground/components/RankRow'
import { emojiArtSlug } from '../features/playground/emoji-art'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api, type BossState } from '../services/api-client'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/events.css'

const QUESTIONS_PER_ATTACK = 10

export function BossPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { memberById } = useFamily()
  const { user } = useAuth()
  const { recordActivity } = useProgress()
  const { setBalance } = useWallet()
  const [state, setState] = useState<BossState | null>(null)
  const [questions, setQuestions] = useState<GameQuestion[] | null>(null)
  const [hitFlash, setHitFlash] = useState<number | null>(null)
  const runDamage = useRef({ hits: 0, damage: 0 })
  const [lastAttack, setLastAttack] = useState<{ hits: number; damage: number } | null>(null)

  useEffect(() => {
    api.getBoss().then(setState).catch(() => {})
  }, [])

  if (!state)
    return (
      <main className="page pg-page events">
        <Skeleton variant="rect" height={220} />
      </main>
    )

  function startAttack() {
    runDamage.current = { hits: 0, damage: 0 }
    setQuestions(generateQuestions('quiz', 'mix:all', QUESTIONS_PER_ATTACK, Math.floor(Math.random() * 2 ** 31)))
  }

  function onAnswered(isCorrect: boolean, combo: number) {
    if (!isCorrect) return
    const damage = bossHitDamage(combo)
    runDamage.current.hits++
    runDamage.current.damage += damage
    setHitFlash(damage)
    playSound('pop')
    window.setTimeout(() => setHitFlash(null), 700)
  }

  async function finishAttack() {
    setQuestions(null)
    const { hits, damage } = runDamage.current
    setLastAttack({ hits, damage })
    if (hits > 0) recordActivity('bossHits', hits)
    try {
      setState(await api.attackBoss(hits, damage))
    } catch {
      /* bỏ qua */
    }
  }

  async function claim() {
    const { balance } = await api.claimBoss()
    setBalance(balance)
    setState(await api.getBoss())
  }

  const hpPercent = (state.hp / state.maxHp) * 100
  const contributed = state.contributors.some((c) => c.userId === user?.id)
  const remainingToday = Math.max(0, state.dailyDamageLimit - state.myDamageToday)

  const bossArt = emojiArtSlug(state.defeated ? '💀' : state.boss.emoji)
  const ranked = [...state.contributors].sort((a, b) => b.damage - a.damage)

  /** Thẻ boss: ảnh 3D lớn + máu. compact = bản nhỏ đặt trên câu hỏi khi đang đánh */
  const bossCard = (compact: boolean) => (
    <div className={`ev-boss ${compact ? 'is-compact' : ''} ${hitFlash ? 'is-hit' : ''} ${state.defeated ? 'is-defeated' : ''}`}>
      <div className="ev-boss__lair">
        <GameArt slug={bossArt} emoji={state.defeated ? '💀' : state.boss.emoji} size={compact ? 64 : 132} />
        {hitFlash && (
          <span className="ev-boss__damage ds-num" key={`hit-${hitFlash}-${runDamage.current.hits}`}>
            -{hitFlash}
          </span>
        )}
      </div>
      <div className="ev-boss__info">
        {!compact && <span className="ev-hero__eyebrow">{t('bossTitle')}</span>}
        <h2 className="ev-boss__name">{pick(state.boss.name)}</h2>
        {!compact && !state.defeated && <p className="ev-boss__taunt">“{pick(state.boss.taunt)}”</p>}
        <div className="ev-hp" role="meter" aria-label={playText('bossHp')} aria-valuemin={0} aria-valuemax={state.maxHp} aria-valuenow={state.hp}>
          <div className="ev-hp__fill" style={{ width: `${hpPercent}%` }} />
          <span className="ev-hp__label ds-num">
            {state.hp}/{state.maxHp}
          </span>
        </div>
      </div>
    </div>
  )

  if (questions) {
    return (
      <main className="page pg-page pg-page--narrow events">
        <SoloQuestionRunner questions={questions} secondsPerQuestion={10} onFinish={finishAttack} onAnswered={onAnswered} header={bossCard(true)} />
      </main>
    )
  }

  return (
    <main className="page pg-page events">
      <PlayPageHeader back art={PLAY_ART.boss} artPlate="red" title={t('bossTitle')} intro={t('bossIntro', { reward: BOSS_DEFEAT_REWARD })} />

      <section className="ev-hero ev-hero--boss">
        {bossCard(false)}
        <div className="ev-boss__side">
          {state.defeated ? (
            <div className="ev-boss__win">
              <Mascot pose="celebrate" size={96} />
              <strong>{playText('bossDefeated')}</strong>
            </div>
          ) : (
            <div className="ev-boss__today">
              <span>{t('bossDamageToday', { done: state.myDamageToday, limit: state.dailyDamageLimit })}</span>
              <ProgressBar value={state.myDamageToday} max={state.dailyDamageLimit} size="sm" color="var(--grad-oops)" showHead={false} label={t('bossDamageToday', { done: state.myDamageToday, limit: state.dailyDamageLimit })} />
            </div>
          )}
          {state.defeated ? (
            contributed && !state.claimed ? (
              <Button size="lg" fullWidth onClick={claim} iconLeft={<GameArt slug="wrapped-gift" size={24} />}>
                {t('claimBossReward', { n: BOSS_DEFEAT_REWARD })}
              </Button>
            ) : (
              <Badge tone={state.claimed ? 'success' : 'neutral'} icon={state.claimed ? 'check' : undefined}>
                {state.claimed ? t('claimed') : t('bossDefeatedNoShare')}
              </Badge>
            )
          ) : (
            <Button size="lg" fullWidth disabled={remainingToday === 0} onClick={startAttack} iconLeft={remainingToday === 0 ? undefined : <GameArt slug="crossed-swords" size={24} />}>
              {remainingToday === 0 ? t('bossRestToday') : t('attackBoss')}
            </Button>
          )}
          {!state.defeated && remainingToday > 0 && <span className="ev-boss__hint">{playText('bossLeftToday', { n: remainingToday })}</span>}
          {!state.defeated && remainingToday === 0 && (
            <Button to="/play" variant="ghost" size="sm" iconRight="arrow-right">
              {playText('soloBackToPlay')}
            </Button>
          )}
        </div>
      </section>

      {lastAttack && (
        <p className="pg-note pg-note--success ev-lastrun" role="status">
          <GameArt slug="crossed-swords" size={20} /> {playText('bossYourHits', { hits: lastAttack.hits, damage: lastAttack.damage })}
        </p>
      )}

      <section className="pg-panel">
        <h3 className="pg-panel__title">
          <GameArt slug="busts-in-silhouette" size={28} /> {t('bossContributors')}
          <span className="pg-panel__aside">{playText('bossTeam', { n: state.contributors.length })}</span>
        </h3>
        {ranked.length === 0 ? (
          <p className="ev-empty">{t('nobodyYet')}</p>
        ) : (
          <ol className="pg-rank-list">
            {ranked.map((c, index) => (
              <RankRow
                key={c.userId}
                rank={index + 1}
                name={c.displayName}
                avatar={{ avatarItemId: memberById(c.userId)?.avatar, frameItemId: memberById(c.userId)?.frame }}
                meta={`${c.hits} ${t('hits')}`}
                value={c.damage}
                unit={t('damage')}
                isMe={c.userId === user?.id}
              />
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}
