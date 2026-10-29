/**
 * PlaygroundPage.tsx — TRANG /play "SÂN CHƠI GIA ĐÌNH"
 * ----------------------------------------------------------------------------
 * Gom mọi tính năng vui của gia đình vào 1 trang, theo thứ tự "việc nên làm trước":
 *   1. Đấu trường trực tiếp (thẻ lớn): ai online, phòng đang chờ, Tạo phòng / Thách đấu
 *      + Xếp hạng tuần bên cạnh
 *   2. Sự kiện: Thử thách từ hôm nay · Giải đấu tuần · Boss cả nhà
 *   3. Mini game chơi một mình (4 ô)
 *   4. Nhiệm vụ · Huy hiệu · Cửa hàng
 *   5. Học vui (chủ đề thẻ từ)
 * Các trang chi tiết vẫn ở đường dẫn cũ (/arena, /daily-word, /shop…), trang này chỉ là "sảnh".
 * Bố cục dùng container query: tự xếp lại theo bề rộng thật của vùng nội dung
 * (có / không có sidebar, cột phải) chứ không theo bề rộng cửa sổ.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../design-system'
import { useWallet } from '../../player-wallet/wallet-store'
import { BananaPill } from './components/BananaPill'
import { PLAY_ART } from './game-catalog'
import { BossCard, DailyWordCard, TournamentCard } from './hub/EventCards'
import { FunTopicsStrip } from './hub/FunTopicsStrip'
import { LiveArenaHero } from './hub/LiveArenaHero'
import { MiniGameGrid } from './hub/MiniGameGrid'
import { BadgesCard, BoardCard, QuestsCard, ShopCard } from './hub/SideCards'
import { GameArt } from './components/GameArt'
import { usePlayText } from './playground-text'
import { usePlaygroundData } from './use-playground-data'
import './styles/play-kit.css'
import './styles/playground-hub.css'

export function PlaygroundPage() {
  const playText = usePlayText()
  const { bananas } = useWallet()
  const data = usePlaygroundData()

  return (
    <main className="page pg-page pg-hub">
      <header className="pg-hub__header">
        <div>
          <h1 className="pg-hub__title">{playText('hubTitle')}</h1>
          <p className="pg-hub__intro">{playText('hubIntro')}</p>
        </div>
        <div className="pg-hub__wallet">
          <BananaPill amount={bananas} to="/shop" size="lg" />
          <Button to="/shop" variant="secondary" size="md" iconLeft={<GameArt slug={PLAY_ART.shop} size={22} />}>
            {playText('hubShop')}
          </Button>
        </div>
      </header>

      <div className="pg-hub__top">
        <LiveArenaHero />
        <BoardCard />
      </div>

      <section className="pg-hub__section" aria-labelledby="pg-events-title">
        <h2 id="pg-events-title" className="pg-section-title">
          {playText('eventsTitle')}
        </h2>
        <div className="pg-hub__events">
          <DailyWordCard data={data.dailyWord} />
          <TournamentCard data={data.tournament} />
          <BossCard data={data.boss} />
        </div>
      </section>

      <section className="pg-hub__section" aria-labelledby="pg-games-title">
        <div className="pg-section-head">
          <h2 id="pg-games-title" className="pg-section-title">
            {playText('gamesTitle')}
          </h2>
          <p className="pg-section-sub">{playText('gamesIntro')}</p>
        </div>
        <MiniGameGrid records={data.records} />
      </section>

      <div className="pg-hub__trio">
        <QuestsCard />
        <BadgesCard />
        <ShopCard />
      </div>

      <section className="pg-hub__section" aria-labelledby="pg-fun-title">
        <div className="pg-section-head">
          <h2 id="pg-fun-title" className="pg-section-title">
            <GameArt slug={PLAY_ART.fun} size={32} /> {playText('funTitle')}
          </h2>
          <p className="pg-section-sub">{playText('funText')}</p>
          <Button to="/fun" variant="ghost" size="sm" iconRight="arrow-right" className="pg-section-link">
            {playText('seeAll')}
          </Button>
        </div>
        <FunTopicsStrip />
      </section>
    </main>
  )
}
