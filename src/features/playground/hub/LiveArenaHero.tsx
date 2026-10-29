/**
 * LiveArenaHero.tsx — THẺ LỚN "ĐẤU TRƯỜNG GIA ĐÌNH" ĐẦU TRANG /play
 * ----------------------------------------------------------------------------
 * Trả lời 3 câu trong 1 cái nhìn: ai đang online? có phòng nào đang chờ? mình nên bấm gì?
 * Nút chính đổi theo tình huống (luôn có đúng 1 nút chính + 1 nút phụ):
 *   - đang ở trong phòng       -> "Quay lại phòng của bạn"
 *   - có phòng người khác mở   -> "Vào phòng" (phòng đầu tiên) · phụ: "Tạo phòng"
 *   - có người online          -> "Tạo phòng" · phụ: "Thách <tên>"
 *   - không ai online          -> "Tạo phòng" · phụ: "Thách đấu" (người offline nhận lời mời khi mở web)
 * Tài khoản bé: không nhắc tới cược, chỉ "chơi vui, thắng vẫn có thưởng".
 * Nền "đêm tuần tra" (navy + sao) cố định ở cả 2 chế độ sáng/tối để thẻ luôn nổi bật.
 * ----------------------------------------------------------------------------
 */
import { useNavigate } from 'react-router-dom'
import { PlayerAvatar } from '../../../components/PlayerIdentity'
import { Button } from '../../../design-system'
import { findGameTopic } from '../../../game-questions/question-bank'
import { useFamily } from '../../../family-members/family-store'
import { useWallet } from '../../../player-wallet/wallet-store'
import { useRealtime } from '../../../realtime/realtime-store'
import { useAuth } from '../../../services/auth-context'
import { useLanguage } from '../../../translations/language-context'
import { GameArt } from '../components/GameArt'
import { MINI_GAMES, miniGameInfo, PLAY_ART } from '../game-catalog'
import { usePlayText } from '../playground-text'

export function LiveArenaHero() {
  const playText = usePlayText()
  const { t, pick } = useLanguage()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { members } = useFamily()
  const { bananas } = useWallet()
  const { connected, online, rooms, myRoom, send } = useRealtime()
  const isKid = user?.ageGroup === 'kid'

  const familyOthers = members.filter((member) => member.id !== user?.id)
  const onlineOthers = familyOthers.filter((member) => online.includes(member.id))
  const joinableRooms = rooms.filter((room) => room.id !== myRoom?.id && room.status === 'lobby')
  const firstRoom = joinableRooms[0]
  const canAfford = (bet: number) => isKid || bet <= bananas

  function joinRoom(roomId: string) {
    send({ t: 'room:join', roomId })
    navigate('/arena/room')
  }

  /* ----- chọn nút chính + nút phụ theo tình huống ----- */
  let primary: { label: string; onClick: () => void; disabled?: boolean }
  let secondary: { label: string; to: string } | null
  if (myRoom) {
    primary = { label: playText('liveBackToRoom'), onClick: () => navigate('/arena/room') }
    secondary = null
  } else if (firstRoom) {
    primary = { label: playText('liveJoin'), onClick: () => joinRoom(firstRoom.id), disabled: !connected || !canAfford(firstRoom.settings.bet) }
    secondary = { label: playText('liveCreate'), to: '/arena' }
  } else if (onlineOthers.length > 0) {
    primary = { label: playText('liveCreate'), onClick: () => navigate('/arena') }
    secondary = { label: playText('liveChallenge', { name: onlineOthers[0].displayName }), to: `/arena?challenge=${onlineOthers[0].id}` }
  } else {
    primary = { label: playText('liveCreate'), onClick: () => navigate('/arena') }
    secondary = { label: playText('liveChallengeAny'), to: '/arena' }
  }

  return (
    <section className="pg-live" aria-labelledby="pg-live-title">
      <span className="pg-live__stars" aria-hidden />
      <div className="pg-live__body">
        <span className="pg-live__eyebrow">
          <span className={`pg-live__pulse ${connected ? 'is-on' : ''}`} aria-hidden />
          {playText('liveEyebrow')}
        </span>
        <h2 id="pg-live-title" className="pg-live__title">
          {playText('liveTitle')}
        </h2>

        {/* ai đang online */}
        <div className="pg-live__online">
          {onlineOthers.length > 0 ? (
            <>
              <span className="pg-live__faces">
                {onlineOthers.slice(0, 5).map((member) => (
                  <span key={member.id} className="pg-live__face" title={member.displayName}>
                    <PlayerAvatar avatarItemId={member.avatar} frameItemId={member.frame} size={36} online />
                  </span>
                ))}
              </span>
              <span>
                <strong>{playText('liveOnline', { n: onlineOthers.length })}</strong>
                <span className="pg-live__names">{onlineOthers.map((member) => member.displayName).join(', ')}</span>
              </span>
            </>
          ) : (
            <>
              {/* không ai online: vẫn hiện mặt cả nhà (mờ) để biết có thể mời ai */}
              {familyOthers.length > 0 && (
                <span className="pg-live__faces is-offline">
                  {familyOthers.slice(0, 5).map((member) => (
                    <span key={member.id} className="pg-live__face" title={member.displayName}>
                      <PlayerAvatar avatarItemId={member.avatar} frameItemId={member.frame} size={36} />
                    </span>
                  ))}
                </span>
              )}
              <span className="pg-live__quiet">{connected ? playText('liveNobodyOnline') : playText('liveConnecting')}</span>
            </>
          )}
        </div>

        {/* 4 kiểu đấu */}
        <ul className="pg-live__modes" aria-label={playText('liveModes')}>
          {MINI_GAMES.map((game) => (
            <li key={game.id}>
              <GameArt slug={game.art} size={22} />
              {t(`game_${game.id}`)}
            </li>
          ))}
        </ul>

        {/* phòng đang chờ (tối đa 2) */}
        {joinableRooms.length > 0 && !myRoom && (
          <ul className="pg-live__rooms" aria-label={playText('liveOpenRooms')}>
            {joinableRooms.slice(0, 2).map((room) => {
              const host = members.find((member) => member.id === room.hostId)
              const game = miniGameInfo(room.settings.gameType)
              const topic = room.settings.gameType !== 'word-chain' ? findGameTopic(room.settings.topicId) : undefined
              return (
                <li key={room.id} className="pg-live__room">
                  {game && <GameArt slug={game.art} size={30} />}
                  <span className="pg-live__room-text">
                    <strong>{playText('liveRoomBy', { name: host?.displayName ?? '…' })}</strong>
                    <span>
                      {t(`game_${room.settings.gameType}`)}
                      {topic ? ` · ${pick(topic.title)}` : ''} · {room.players.length}/6
                      {room.settings.bet > 0 && !isKid ? ` · ${room.settings.bet} 🍌` : ''}
                    </span>
                  </span>
                  {room !== firstRoom && (
                    <Button size="sm" variant="secondary" onClick={() => joinRoom(room.id)} disabled={!connected || !canAfford(room.settings.bet)}>
                      {playText('liveJoin')}
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <div className="pg-live__actions">
          <Button size="lg" iconRight="arrow-right" onClick={primary.onClick} disabled={primary.disabled}>
            {primary.label}
          </Button>
          {secondary && (
            <Button size="lg" variant="ghost" to={secondary.to} className="pg-live__secondary">
              {secondary.label}
            </Button>
          )}
        </div>
        <p className="pg-live__note">{isKid ? playText('liveKidNote') : playText('liveBetNote')}</p>
      </div>
      <GameArt slug={PLAY_ART.arena} size={148} tilt={-8} className="pg-live__art" />
    </section>
  )
}
