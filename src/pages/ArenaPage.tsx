/**
 * ArenaPage.tsx — ĐẤU TRƯỜNG (trung tâm các trò chơi cạnh tranh)
 * ----------------------------------------------------------------------------
 * Tab "Đấu trực tiếp": tạo phòng (kiểu chơi, chủ đề, số câu, giây/câu, cược chuối,
 *                      mời ai), danh sách phòng đang chờ, ai đang online.
 * Tab "Chơi một mình": Đố vui, Spelling Bee, Đua xếp câu, Nối từ với máy.
 * Tab "Sự kiện": Thử thách từ hôm nay, Giải đấu tuần, Boss cả nhà.
 * /arena?challenge=5 -> mở sẵn tab đấu và tick mời người id 5.
 * (v3) Tài khoản bé (ageGroup kid) không thấy phần cược: luôn chơi vui, vào được cả phòng có cược
 *      (máy chủ ép tiền cược của bé = 0, bé thắng nhận thưởng cố định).
 * (v3) Giao diện làm lại bằng hệ thiết kế (src/design-system) + bộ đồ chơi Sân chơi
 *      (src/features/playground). Logic tạo / vào phòng giữ nguyên.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { findGameTopic } from '../game-questions/question-bank'
import type { RoomSettings } from '../game-questions/realtime-protocol'
import { KID_BATTLE_WIN_REWARD } from '../game-economy/banana-rewards'
import { SHOP_ITEMS } from '../game-economy/shop-catalog'
import { PlayerAvatar } from '../components/PlayerIdentity'
import { Button, Icon, SegmentedControl, Tabs } from '../design-system'
import { TopicSelect } from '../games/TopicSelect'
import { BananaPill } from '../features/playground/components/BananaPill'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { MINI_GAMES, miniGameInfo, PLAY_ART } from '../features/playground/game-catalog'
import { MiniGameGrid } from '../features/playground/hub/MiniGameGrid'
import { usePlayText } from '../features/playground/playground-text'
import { useFamily } from '../family-members/family-store'
import { useWallet } from '../player-wallet/wallet-store'
import { useRealtime } from '../realtime/realtime-store'
import { useAuth } from '../services/auth-context'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/playground-hub.css'
import '../features/playground/styles/arena.css'

const BET_PRESETS = [0, 5, 10, 20, 50]
type ArenaTab = 'live' | 'solo' | 'events'

export function ArenaPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { user } = useAuth()
  const { members } = useFamily()
  const { online, rooms, myRoom, send, connected } = useRealtime()
  const { bananas, quantityOf } = useWallet()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const challengeTarget = Number(searchParams.get('challenge'))
  const isKid = user?.ageGroup === 'kid'

  const [tab, setTab] = useState<ArenaTab>('live')
  const [settings, setSettings] = useState<RoomSettings>({ gameType: 'quiz', topicId: 'fun:animals', questionCount: 10, secondsPerQuestion: 10, bet: 10 })
  const [invite, setInvite] = useState<number[]>(challengeTarget ? [challengeTarget] : [])

  const others = members.filter((m) => m.id !== user?.id).sort((a, b) => Number(online.includes(b.id)) - Number(online.includes(a.id)))
  const onlineMembers = members.filter((m) => online.includes(m.id))
  const update = (patch: Partial<RoomSettings>) => setSettings((current) => ({ ...current, ...patch }))

  function createRoom() {
    send({ t: 'room:create', settings: { ...settings, bet: isKid ? 0 : Math.min(settings.bet, bananas) }, invite })
    navigate('/arena/room')
  }

  function joinRoom(roomId: string) {
    send({ t: 'room:join', roomId })
    navigate('/arena/room')
  }

  const toggleInvite = (memberId: number) => setInvite((current) => (current.includes(memberId) ? current.filter((id) => id !== memberId) : [...current, memberId]))

  const powers = SHOP_ITEMS.filter((item) => item.category === 'power')

  return (
    <main className="page pg-page arena">
      <PlayPageHeader
        back
        art={PLAY_ART.arena}
        artPlate="navy"
        title={t('arenaTitle')}
        intro={t('arenaIntro')}
        actions={
          <div className="arena-wallet">
            <BananaPill amount={bananas} to="/shop" />
            <ul className="arena-wallet__powers" aria-label={t('powers')}>
              {powers.map((power) => (
                <li key={power.id} title={pick(power.name)} className={quantityOf(power.id) === 0 ? 'is-empty' : undefined}>
                  <GameArt emoji={power.icon} size={22} />
                  <span className="ds-num">{quantityOf(power.id)}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Tabs<ArenaTab>
        label={t('arenaTitle')}
        variant="pill"
        idPrefix="arena"
        value={tab}
        onChange={setTab}
        className="arena-tabs"
        items={[
          { id: 'live', label: t('liveBattles'), icon: <GameArt slug={PLAY_ART.arena} size={22} /> },
          { id: 'solo', label: t('soloGames'), icon: <GameArt slug="joystick" size={22} /> },
          { id: 'events', label: t('events'), icon: <GameArt slug="spiral-calendar" size={22} /> },
        ]}
      />

      {/* =================== ĐẤU TRỰC TIẾP =================== */}
      {tab === 'live' && (
        <div className="arena-live" role="tabpanel" id="arena-panel-live" aria-labelledby="arena-tab-live">
          <section className="pg-panel arena-create" aria-labelledby="arena-create-title">
            <h2 id="arena-create-title" className="pg-panel__title">
              {t('createRoom')}
            </h2>
            {myRoom && (
              <div className="pg-note pg-note--info arena-create__inroom">
                <span>{playText('liveInRoom')}</span>
                <Button to="/arena/room" size="sm" iconRight="arrow-right">
                  {t('backToRoom')}
                </Button>
              </div>
            )}

            {/* kiểu chơi: 4 thẻ có ảnh */}
            <div className="pg-field">
              <span className="pg-field__label">{t('gameType')}</span>
              <div className="arena-modes" role="radiogroup" aria-label={t('gameType')}>
                {MINI_GAMES.map((game) => {
                  const active = settings.gameType === game.id
                  return (
                    <button
                      key={game.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      className={`arena-mode ${active ? 'is-active' : ''}`}
                      style={{ ['--mode-accent' as string]: game.accent }}
                      onClick={() => update({ gameType: game.id })}
                    >
                      <GameArt slug={game.art} size={40} />
                      <span className="arena-mode__name">{t(`game_${game.id}`)}</span>
                      <span className="arena-mode__desc">{t(`gameDesc_${game.id}`)}</span>
                      <span className="arena-mode__tick" aria-hidden>
                        <Icon name="check" size={14} strokeWidth={3} />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {settings.gameType !== 'word-chain' && (
              <div className="arena-rules">
                <div className="pg-field arena-rules__topic">
                  <label className="pg-field__label" htmlFor="arena-topic">
                    {t('topic')}
                  </label>
                  <TopicSelect id="arena-topic" value={settings.topicId} onChange={(topicId) => update({ topicId })} />
                </div>
                <div className="pg-field">
                  <span className="pg-field__label">{t('questionCountLabel')}</span>
                  <SegmentedControl<5 | 10 | 20>
                    label={t('questionCountLabel')}
                    value={settings.questionCount}
                    onChange={(questionCount) => update({ questionCount })}
                    options={[5, 10, 20].map((n) => ({ value: n as 5 | 10 | 20, label: String(n) }))}
                  />
                </div>
                <div className="pg-field">
                  <span className="pg-field__label">{t('secondsPerQuestion')}</span>
                  <SegmentedControl<5 | 10 | 15>
                    label={t('secondsPerQuestion')}
                    value={settings.secondsPerQuestion}
                    onChange={(secondsPerQuestion) => update({ secondsPerQuestion })}
                    options={[5, 10, 15].map((n) => ({ value: n as 5 | 10 | 15, label: `${n}s` }))}
                  />
                </div>
              </div>
            )}

            {/* cược: bé không thấy phần này */}
            {isKid ? (
              <p className="pg-note pg-note--gold">
                <GameArt slug="banana" size={20} /> {playText('arenaKidBet', { n: KID_BATTLE_WIN_REWARD })}
              </p>
            ) : (
              <div className="pg-field">
                <span className="pg-field__label">
                  {t('betLabel')} <span className="pg-field__hint">· {t('youHave', { n: bananas })}</span>
                </span>
                <div className="arena-bets" role="radiogroup" aria-label={t('betLabel')}>
                  {BET_PRESETS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      role="radio"
                      aria-checked={settings.bet === amount}
                      className={`arena-bet ${settings.bet === amount ? 'is-active' : ''}`}
                      disabled={amount > bananas}
                      onClick={() => update({ bet: amount })}
                    >
                      {amount === 0 ? (
                        t('justForFun')
                      ) : (
                        <>
                          <GameArt slug="banana" size={18} /> {amount}
                        </>
                      )}
                    </button>
                  ))}
                </div>
                <span className="pg-field__hint">{t('betRule')}</span>
              </div>
            )}

            {/* mời ai */}
            <div className="pg-field">
              <span className="pg-field__label">{playText('arenaWho')}</span>
              <div className="arena-invite">
                {others.map((member) => {
                  const checked = invite.includes(member.id)
                  const isOnline = online.includes(member.id)
                  return (
                    <button
                      key={member.id}
                      type="button"
                      aria-pressed={checked}
                      className={`arena-invitee ${checked ? 'is-checked' : ''} ${isOnline ? 'is-online' : ''}`}
                      onClick={() => toggleInvite(member.id)}
                    >
                      <PlayerAvatar avatarItemId={member.avatar} frameItemId={member.frame} size={32} online={isOnline} />
                      <span className="arena-invitee__name">{member.displayName}</span>
                      <span className="arena-invitee__box" aria-hidden>
                        {checked && <Icon name="check" size={14} strokeWidth={3} />}
                      </span>
                    </button>
                  )
                })}
              </div>
              <span className="pg-field__hint">{playText('arenaInviteHint')}</span>
            </div>

            <div className="arena-create__footer">
              <Button size="lg" fullWidth disabled={!connected || (!isKid && settings.bet > bananas)} onClick={createRoom} iconRight={connected ? 'arrow-right' : undefined} loading={!connected}>
                {connected ? (invite.length > 0 ? `${t('createRoom')} · ${playText('arenaInviteCount', { n: invite.length })}` : t('createRoom')) : t('reconnecting')}
              </Button>
            </div>
          </section>

          <div className="arena-side">
            <section className="pg-panel pg-panel--tight" aria-labelledby="arena-rooms-title">
              <h3 id="arena-rooms-title" className="pg-panel__title">
                <GameArt slug="door" size={28} /> {t('openRooms')}
                <span className="pg-panel__aside">{rooms.length}</span>
              </h3>
              {rooms.length === 0 && <p className="arena-empty">{playText('arenaNoRooms')}</p>}
              <ul className="arena-rooms">
                {rooms.map((room) => {
                  const host = members.find((m) => m.id === room.hostId)
                  const topic = findGameTopic(room.settings.topicId)
                  const game = miniGameInfo(room.settings.gameType)
                  return (
                    <li key={room.id} className="arena-room">
                      {game && <GameArt slug={game.art} size={34} />}
                      <span className="arena-room__text">
                        <strong>{t(`game_${room.settings.gameType}`)}</strong>
                        <span>
                          {host?.displayName} · {room.players.length}/6
                          {room.settings.gameType !== 'word-chain' && topic ? ` · ${pick(topic.title)}` : ''}
                        </span>
                      </span>
                      {room.settings.bet > 0 && !isKid && <BananaPill amount={room.settings.bet} size="sm" />}
                      {myRoom?.id !== room.id ? (
                        <Button size="sm" disabled={!isKid && room.settings.bet > bananas} onClick={() => joinRoom(room.id)}>
                          {t('joinRoom')}
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" to="/arena/room">
                          {t('backToRoom')}
                        </Button>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="pg-panel pg-panel--tight" aria-labelledby="arena-online-title">
              <h3 id="arena-online-title" className="pg-panel__title">
                <span className="arena-online-dot" aria-hidden /> {t('onlineNow')}
                <span className="pg-panel__aside">{onlineMembers.length}</span>
              </h3>
              {onlineMembers.length === 0 && <p className="arena-empty">{playText('arenaNobody')}</p>}
              <ul className="arena-online">
                {onlineMembers.map((member) => (
                  <li key={member.id}>
                    <Link to={`/profile/${member.id}`} className="arena-online__person">
                      <PlayerAvatar avatarItemId={member.avatar} frameItemId={member.frame} size={32} online />
                      <span>{member.displayName}</span>
                      {member.id === user?.id && <span className="pg-rank__me">{playText('you')}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}

      {/* =================== CHƠI MỘT MÌNH =================== */}
      {tab === 'solo' && (
        <div role="tabpanel" id="arena-panel-solo" aria-labelledby="arena-tab-solo">
          <MiniGameGrid />
        </div>
      )}

      {/* =================== SỰ KIỆN =================== */}
      {tab === 'events' && (
        <ul className="arena-events" role="tabpanel" id="arena-panel-events" aria-labelledby="arena-tab-events">
          {[
            { to: '/daily-word', art: PLAY_ART.dailyWord, plate: 'gold' as const, title: t('dailyWordTitle'), text: t('dailyWordShort') },
            { to: '/tournament', art: PLAY_ART.tournament, plate: 'primary' as const, title: t('tournamentTitle'), text: t('tournamentShort') },
            { to: '/boss', art: PLAY_ART.boss, plate: 'red' as const, title: t('bossTitle'), text: t('bossShort') },
          ].map((event) => (
            <li key={event.to}>
              <Link to={event.to} className="pg-game">
                <GameArt slug={event.art} size={64} plate={event.plate} tilt={-6} className="pg-game__art" />
                <span className="pg-game__name">{event.title}</span>
                <span className="pg-game__desc">{event.text}</span>
                <span className="pg-game__cta">
                  {playText('play')} <Icon name="arrow-right" size={16} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
