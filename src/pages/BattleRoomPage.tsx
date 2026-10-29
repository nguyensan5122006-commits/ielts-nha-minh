/**
 * BattleRoomPage.tsx — PHÒNG ĐẤU TRỰC TIẾP /arena/room
 * ----------------------------------------------------------------------------
 * Hiện theo trạng thái phòng (lấy từ realtime-store):
 *   - Phòng chờ  : ai đã vào (6 ghế), luật trận, hũ chuối; chủ phòng bấm "Bắt đầu"
 *   - Đếm ngược 3-2-1
 *   - Đang đấu   : câu hỏi + đồng hồ (trái), bảng điểm sống (phải: tự xếp lại khi điểm đổi),
 *                  khung phản hồi đúng/sai sau mỗi câu, thanh sức mạnh (đóng băng, khiên, 50/50, x2, thêm giờ)
 *   - Nối từ     : lượt của ai, chữ cái bắt buộc, chuỗi từ đã nói
 *   - Kết thúc   : bục nhận giải top 3 + mascot ăn mừng (nếu mình thắng), chuối thắng / thua, nút đấu lại
 * (v3) Giao diện làm lại; logic gửi / nhận tin realtime giữ nguyên.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { findGameTopic } from '../game-questions/question-bank'
import type { PowerId } from '../game-questions/realtime-protocol'
import { MAX_POWERS_PER_MATCH, SHOP_ITEMS } from '../game-economy/shop-catalog'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { Badge, Button, EmptyState, fireConfetti, Icon, Mascot, playSound } from '../design-system'
import { GameQuestionView, TimerBar, TimerBarIdle } from '../games/GameQuestionView'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { Podium } from '../features/playground/components/Podium'
import { RankRow } from '../features/playground/components/RankRow'
import { miniGameInfo } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/game.css'
import '../features/playground/styles/battle.css'

const POWERS = SHOP_ITEMS.filter((item) => item.category === 'power')
const SEATS = 6
/** chiều cao 1 dòng bảng điểm (px) — dùng để "trượt" dòng tới vị trí mới khi đổi hạng */
const SCORE_ROW_H = 60

export function BattleRoomPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { memberById } = useFamily()
  const { quantityOf, refreshWallet } = useWallet()
  const { myRoom, game, send, answer, usePower, leaveRoom } = useRealtime()
  const navigate = useNavigate()
  const [now, setNow] = useState(Date.now())
  const [freezeTargetMode, setFreezeTargetMode] = useState(false)
  const [chainInput, setChainInput] = useState('')

  // đồng hồ cho đếm ngược / đóng băng
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 200)
    return () => window.clearInterval(timer)
  }, [])

  // âm thanh khi lật đáp án (1 lần mỗi câu): đúng -> "ting", sai -> nốt trầm nhẹ
  const myResult = user ? game.reveal?.results[user.id] : undefined
  const soundedReveal = useRef(-1)
  useEffect(() => {
    if (!game.reveal || soundedReveal.current === game.reveal.index) return
    soundedReveal.current = game.reveal.index
    if (myResult) playSound(myResult.correct ? 'correct' : 'oops')
  }, [game.reveal, myResult])

  // kết thúc trận: thắng -> pháo giấy + nhạc hoàn thành (1 lần)
  const iWon = !!user && !!game.over?.winnerIds.includes(user.id)
  const celebrated = useRef(false)
  useEffect(() => {
    if (!game.over) {
      celebrated.current = false
      return
    }
    if (celebrated.current) return
    celebrated.current = true
    if (iWon) {
      playSound('complete')
      fireConfetti({ origin: { x: 0.5, y: 0.3 } })
    }
  }, [game.over, iWon])

  if (!myRoom && !game.over) {
    return (
      <main className="page pg-page pg-page--narrow bt">
        <div className="pg-panel bt-empty">
          <EmptyState
            pose="thinking"
            title={playText('roomNotInRoom')}
            text={playText('roomNotInRoomText')}
            action={
              <div className="pg-actions">
                <Button variant="secondary" to="/play">
                  {playText('backToPlay')}
                </Button>
                <Button to="/arena" iconRight="arrow-right">
                  {t('navArena')}
                </Button>
              </div>
            }
          />
        </div>
      </main>
    )
  }

  const room = myRoom
  const isHost = room?.hostId === user?.id
  const topic = room ? findGameTopic(room.settings.topicId) : undefined
  const gameInfo = room ? miniGameInfo(room.settings.gameType) : undefined
  const players = room?.players ?? []
  const frozen = game.frozenUntil > now
  const opponents = players.filter((p) => p.id !== user?.id && !p.left)

  function leave() {
    leaveRoom()
    navigate('/arena')
  }

  function activatePower(power: PowerId, targetId?: number) {
    usePower(power, targetId)
    setFreezeTargetMode(false)
    window.setTimeout(() => void refreshWallet(), 800) // cập nhật số sức mạnh còn lại
  }

  function rematch() {
    if (!room) return
    send({ t: 'room:create', settings: room.settings, invite: players.map((p) => p.id).filter((id) => id !== user?.id) })
  }

  function submitChainWord(event: FormEvent) {
    event.preventDefault()
    if (!chainInput.trim()) return
    send({ t: 'game:word', word: chainInput.trim() })
    setChainInput('')
  }

  /* ---------- bảng điểm sống (dùng chung cho câu hỏi + nối từ) ----------
   * Mỗi dòng đặt tuyệt đối theo hạng hiện tại (top = hạng × chiều cao dòng),
   * nên khi ai vượt lên, dòng đó TRƯỢT lên vị trí mới (transition), không nhảy. */
  const scoreOf = (player: (typeof players)[number]) => game.scores[player.id] ?? player.score
  const byScore = [...players].sort((a, b) => scoreOf(b) - scoreOf(a))
  const scoreboard = (
    <section className="bt-board" aria-label={playText('roomLive')}>
      <h2 className="bt-board__title">{playText('roomLive')}</h2>
      <ol className="bt-board__list" style={{ height: players.length * SCORE_ROW_H } as CSSProperties}>
        {players.map((player) => {
          const rank = byScore.indexOf(player)
          const member = memberById(player.id)
          const result = game.reveal?.results[player.id]
          const eliminated = game.eliminated.includes(player.id) || player.left
          return (
            <li
              key={player.id}
              className={['bt-board__row', player.id === user?.id && 'is-me', eliminated && 'is-out', result && (result.correct ? 'is-right' : 'is-miss')].filter(Boolean).join(' ')}
              style={{ transform: `translateY(${rank * SCORE_ROW_H}px)` }}
            >
              <span className="bt-board__rank ds-num">{rank + 1}</span>
              <PlayerAvatar avatarItemId={member?.avatar} frameItemId={member?.frame} size={36} />
              <span className="bt-board__name">
                {player.name}
                {player.isKid && <span className="bt-kid">🌱</span>}
              </span>
              {game.chain?.playerId === player.id && (
                <Badge tone="gold" size="sm">
                  ✍️
                </Badge>
              )}
              {result && (
                <span className={`bt-board__delta ${result.correct ? 'is-good' : 'is-bad'}`} key={`delta-${game.reveal?.index}`}>
                  {result.correct ? `+${result.points}` : '✗'}
                </span>
              )}
              <strong className="bt-board__score ds-num" key={`score-${scoreOf(player)}`}>
                {scoreOf(player)}
              </strong>
            </li>
          )
        })}
      </ol>
    </section>
  )

  /* ======================= KẾT THÚC ======================= */
  if (game.over) {
    const ranking = game.over.ranking
    const myPlace = ranking.findIndex((result) => result.id === user?.id) + 1
    const winners = ranking.filter((result) => game.over!.winnerIds.includes(result.id))
    const podiumEntries = ranking.map((result) => ({
      id: result.id,
      name: result.name,
      score: result.score,
      avatarItemId: memberById(result.id)?.avatar,
      frameItemId: memberById(result.id)?.frame,
      extra: result.bananaChange !== 0 ? <BananaPill amount={result.bananaChange} signed size="sm" /> : undefined,
    }))
    return (
      <main className="page pg-page pg-page--narrow bt">
        <section className={`pg-panel bt-over ${iWon ? 'is-win' : ''}`}>
          <div className="bt-over__hero">
            <Mascot pose={iWon ? 'celebrate' : 'thumbs-up'} size={iWon ? 180 : 140} placement="hero" />
            <div className="bt-over__headline">
              <span className="ds-eyebrow">{playText('roomFinal')}</span>
              <h1>{iWon ? t('youWin') : winners.length > 0 ? playText('roomWinnerIs', { name: winners.map((w) => w.name).join(', ') }) : t('gameOver')}</h1>
              {myPlace > 0 && !iWon && <p className="bt-over__place">{playText('roomYourPlace', { n: myPlace })}</p>}
              {game.over.pot > 0 && (
                <p className="bt-over__pot">
                  <GameArt slug="money-bag" size={24} /> {t('potWas', { n: game.over.pot })}
                </p>
              )}
            </div>
          </div>

          <Podium entries={podiumEntries} meId={user?.id} unit={playText('pointsUnit')} />

          {ranking.length > 3 && (
            <ol className="pg-rank-list bt-over__rest">
              {ranking.slice(3).map((result, index) => (
                <RankRow
                  key={result.id}
                  rank={index + 4}
                  name={result.name}
                  avatar={{ avatarItemId: memberById(result.id)?.avatar, frameItemId: memberById(result.id)?.frame }}
                  meta={playText('roomCorrectCount', { n: result.correctCount })}
                  value={result.score}
                  extra={result.bananaChange !== 0 ? <BananaPill amount={result.bananaChange} signed size="sm" /> : undefined}
                  isMe={result.id === user?.id}
                />
              ))}
            </ol>
          )}

          <div className="pg-actions">
            <Button variant="secondary" size="lg" onClick={leave}>
              {t('backToArena')}
            </Button>
            {isHost && room ? (
              <Button size="lg" iconLeft="review" onClick={rematch}>
                {t('rematch')}
              </Button>
            ) : (
              <Button size="lg" to="/play" iconRight="arrow-right">
                {playText('soloBackToPlay')}
              </Button>
            )}
          </div>
        </section>
      </main>
    )
  }

  if (!room) return null

  /* ======================= PHÒNG CHỜ ======================= */
  if (room.status === 'lobby') {
    const waitingInvites = room.invited.filter((id) => !players.some((p) => p.id === id))
    const emptySeats = Math.max(0, SEATS - players.length - waitingInvites.length)
    return (
      <main className="page pg-page pg-page--narrow bt">
        <section className="pg-panel bt-lobby">
          <header className="bt-lobby__head">
            {gameInfo && <GameArt slug={gameInfo.art} size={56} plate={gameInfo.plate} tilt={-6} />}
            <div className="bt-lobby__title">
              <span className="ds-eyebrow">{playText('roomLobby')}</span>
              <h1>
                {t(`game_${room.settings.gameType}`)}
                {room.settings.gameType !== 'word-chain' && topic && <span className="bt-lobby__topic"> · {pick(topic.title)}</span>}
              </h1>
            </div>
            <Button variant="ghost" size="sm" iconLeft="exit" onClick={leave}>
              {t('leaveRoom')}
            </Button>
          </header>

          <ul className="bt-lobby__rules">
            {room.settings.gameType !== 'word-chain' && (
              <li>
                <Icon name="clock" size={16} /> {playText('roomRules', { q: room.settings.questionCount, s: room.settings.secondsPerQuestion })}
              </li>
            )}
            <li className={room.settings.bet > 0 ? 'is-gold' : undefined}>
              <GameArt slug="banana" size={18} /> {room.settings.bet > 0 ? t('betEach', { n: room.settings.bet }) : playText('roomFree')}
            </li>
            <li>
              <GameArt slug="high-voltage" size={18} /> {t('powersAllowed', { n: MAX_POWERS_PER_MATCH })}
            </li>
          </ul>

          <h2 className="bt-lobby__players-title">
            {t('players')} <span className="ds-num">({players.length}/{SEATS})</span>
          </h2>
          <ul className="bt-seats">
            {players.map((player) => {
              const member = memberById(player.id)
              return (
                <li key={player.id} className={`bt-seat ${player.id === user?.id ? 'is-me' : ''}`}>
                  <PlayerAvatar avatarItemId={member?.avatar} frameItemId={member?.frame} size={60} online />
                  <strong className="bt-seat__name">{player.name}</strong>
                  {player.id === room.hostId ? (
                    <Badge tone="primary" size="sm">
                      {t('host')}
                    </Badge>
                  ) : player.isKid ? (
                    <Badge tone="olive" size="sm">
                      {playText('roomFree')}
                    </Badge>
                  ) : null}
                </li>
              )
            })}
            {waitingInvites.map((id) => (
              <li key={id} className="bt-seat is-waiting">
                <PlayerAvatar avatarItemId={memberById(id)?.avatar} size={60} />
                <span className="bt-seat__name">{memberById(id)?.displayName}</span>
                <span className="bt-seat__hint">{t('invited')}…</span>
              </li>
            ))}
            {Array.from({ length: emptySeats }, (_, index) => (
              <li key={`empty-${index}`} className="bt-seat is-empty" aria-hidden>
                <span className="bt-seat__plus">
                  <Icon name="plus" size={22} />
                </span>
                <span className="bt-seat__hint">{playText('roomWaitingSeat')}</span>
              </li>
            ))}
          </ul>

          <div className="bt-lobby__footer">
            {isHost ? (
              <>
                <Button size="lg" fullWidth disabled={players.length < 2} onClick={() => send({ t: 'room:start' })} iconLeft={players.length >= 2 ? 'play-fill' : undefined}>
                  {players.length < 2 ? t('waitingForPlayers') : t('startBattle')}
                </Button>
                {players.length < 2 && <p className="bt-lobby__hint">{playText('roomNeedTwo')}</p>}
              </>
            ) : (
              <div className="bt-lobby__wait">
                <Mascot pose="thinking" size={72} />
                <p>{t('waitingForHost')}</p>
              </div>
            )}
          </div>
        </section>
      </main>
    )
  }

  /* ======================= ĐẾM NGƯỢC ======================= */
  if (game.countdownStartsAt && game.countdownStartsAt > now) {
    const secondsLeft = Math.ceil((game.countdownStartsAt - now) / 1000)
    return (
      <main className="page pg-page pg-page--narrow bt">
        <div className="bt-countdown" role="timer" aria-live="assertive">
          {gameInfo && <GameArt slug={gameInfo.art} size={72} />}
          <span className="bt-countdown__label">{playText('roomCountdown')}</span>
          <span className="bt-countdown__number ds-num" key={`count-${secondsLeft}`}>
            {secondsLeft}
          </span>
        </div>
      </main>
    )
  }

  /* ======================= NỐI TỪ ======================= */
  if (room.settings.gameType === 'word-chain') {
    const chain = game.chain
    const myTurn = chain?.playerId === user?.id
    const iAmOut = !!user && game.eliminated.includes(user.id)
    return (
      <main className="page pg-page bt bt--playing">
        <div className="bt-arena">
          <div className="bt-arena__main">
            {chain && (
              <section className={`gq-card bt-chain ${myTurn ? 'is-my-turn' : ''}`}>
                <TimerBar key={chain.deadline} startedAt={chain.deadline - 15000} durationMs={15000} />
                <div className="bt-chain__turn">
                  <span className="bt-chain__who">{myTurn ? t('yourTurnLetter') : t('playerTurn', { name: players.find((p) => p.id === chain.playerId)?.name ?? '' })}</span>
                  <span className="bt-chain__letter" key={`letter-${chain.requiredLetter}`} aria-label={`${playText('roomTurnLetter')} ${chain.requiredLetter.toUpperCase()}`}>
                    {chain.requiredLetter.toUpperCase()}
                  </span>
                </div>
                <div className="bt-chain__words">
                  {chain.history.map((item, index) => (
                    <span key={index} className={`bt-chain__word ${item.playerId === user?.id ? 'is-me' : item.playerId === 0 ? 'is-start' : ''}`}>
                      {item.word}
                    </span>
                  ))}
                </div>
                {myTurn && !iAmOut && (
                  <form onSubmit={submitChainWord} className="gq-type">
                    <input className="pg-input pg-input--big" value={chainInput} onChange={(e) => setChainInput(e.target.value)} autoFocus autoComplete="off" spellCheck={false} aria-label={t('yourTurnLetter')} />
                    <Button type="submit" size="lg">
                      {t('submit')}
                    </Button>
                  </form>
                )}
                {game.chainRejected && myTurn && <p className="pg-note pg-note--oops">{game.chainRejected}</p>}
                {iAmOut && <p className="pg-note">{t('youAreOut')}</p>}
              </section>
            )}
            <Button variant="ghost" size="sm" iconLeft="exit" onClick={leave} className="bt-leave">
              {t('leaveRoom')}
            </Button>
          </div>
          {scoreboard}
        </div>
      </main>
    )
  }

  /* ======================= ĐANG ĐẤU (theo câu hỏi) ======================= */
  const question = game.question
  const canUsePower = game.powersUsed < MAX_POWERS_PER_MATCH && !game.reveal && !!question
  return (
    <main className="page pg-page bt bt--playing">
      <div className="bt-arena">
        <div className="bt-arena__main">
          {question && (
            <section className={`gq-card ${frozen ? 'is-frozen' : ''}`}>
              <div className="gq-stage__bar">
                <span className="gq-chip ds-num">
                  {t('question')} {game.questionIndex + 1}/{game.totalQuestions}
                </span>
                {game.extraMs > 0 && <span className="gq-chip gq-chip--streak">⏳ +{game.extraMs / 1000}s</span>}
              </div>
              {!game.reveal ? <TimerBar key={game.questionIndex} startedAt={game.questionStartedAt} durationMs={game.timeLimitMs + game.extraMs} /> : <TimerBarIdle />}
              <GameQuestionView
                question={question}
                onAnswer={answer}
                locked={game.myAnswer !== null || !!game.reveal || frozen}
                myAnswer={game.myAnswer}
                reveal={game.reveal ? { correctIndex: game.reveal.correctIndex, correctAnswer: game.reveal.correctAnswer } : null}
                removedIndexes={game.removedIndexes}
              />
              {game.myAnswer !== null && !game.reveal && (
                <p className="bt-waiting">
                  <span className="bt-waiting__dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  {t('waitingOthers')}
                </p>
              )}
              {game.reveal && (
                <div className={`gq-feedback ${myResult?.correct ? 'is-good' : 'is-oops'}`} role="status">
                  <span className="gq-feedback__icon" aria-hidden>
                    <Icon name={myResult?.correct ? 'check' : myResult ? 'close' : 'clock'} size={18} strokeWidth={3} />
                  </span>
                  <strong>{myResult?.correct ? playText('roomCorrect') : myResult && myResult.answer ? playText('roomWrong') : playText('roomTimeout')}</strong>
                  {myResult?.correct ? (
                    <span className="gq-feedback__points ds-num">+{myResult.points}</span>
                  ) : (
                    question.kind === 'choice' && <span className="gq-feedback__answer">{playText('roomAnswerWas', { answer: game.reveal.correctAnswer })}</span>
                  )}
                </div>
              )}
              {frozen && (
                <div className="bt-frozen" role="status">
                  <GameArt slug="ice" size={56} />
                  <strong>{playText('roomFrozen')}</strong>
                  <span className="ds-num">{Math.ceil((game.frozenUntil - now) / 1000)}s</span>
                </div>
              )}
            </section>
          )}

          {/* thanh sức mạnh */}
          <div className="bt-powers">
            <span className="bt-powers__count">
              {t('powers')} <span className="ds-num">{game.powersUsed}/{MAX_POWERS_PER_MATCH}</span>
            </span>
            {POWERS.map((power) => {
              const quantity = quantityOf(power.id)
              const disabled = !canUsePower || quantity === 0 || (power.id === 'power-fifty' && question?.kind !== 'choice')
              return (
                <button
                  key={power.id}
                  type="button"
                  className={`bt-power ${power.id === 'power-freeze' && freezeTargetMode ? 'is-armed' : ''}`}
                  disabled={disabled}
                  title={pick(power.description)}
                  aria-label={`${pick(power.name)} (${quantity})`}
                  onClick={() => (power.id === 'power-freeze' ? setFreezeTargetMode(!freezeTargetMode) : activatePower(power.id as PowerId))}
                >
                  <GameArt emoji={power.icon} size={30} />
                  <span className="bt-power__qty ds-num">{quantity}</span>
                </button>
              )
            })}
          </div>
          {freezeTargetMode && (
            <div className="bt-freeze-pick">
              <span>
                <GameArt slug="ice" size={20} /> {t('freezeWho')}
              </span>
              {opponents.map((opponent) => (
                <Button key={opponent.id} variant="secondary" size="sm" onClick={() => activatePower('power-freeze', opponent.id)}>
                  {opponent.name}
                </Button>
              ))}
            </div>
          )}

          {/* nhật ký sức mạnh gần đây */}
          <div className="bt-powerlog" aria-live="polite">
            {game.powerLog
              .filter((entry) => now - entry.at < 4000)
              .map((entry) => {
                const from = players.find((p) => p.id === entry.fromId)?.name
                const target = players.find((p) => p.id === entry.targetId)?.name
                const power = POWERS.find((p) => p.id === entry.power)
                return (
                  <div key={entry.at} className="bt-powerlog__item">
                    {power && <GameArt emoji={power.icon} size={20} />} {from} {power && pick(power.name)}
                    {target ? ` → ${target}` : ''} {entry.blocked ? `🛡️ ${t('blocked')}` : ''}
                  </div>
                )
              })}
          </div>

          <Button variant="ghost" size="sm" iconLeft="exit" onClick={leave} className="bt-leave">
            {t('leaveRoom')}
          </Button>
        </div>
        {scoreboard}
      </div>
    </main>
  )
}
