/**
 * PlaygroundPage.tsx — TRANG /play "SÂN CHƠI GIA ĐÌNH"
 * ----------------------------------------------------------------------------
 * "Sảnh" gom các phần vui của gia đình, theo thứ tự:
 *   1. Trò chơi chữ: Thử thách từ hôm nay (kiểu Wordle) + Spelling Bee + Nối từ (kèm kỷ lục cả nhà)
 *   2. Nhiệm vụ · Huy hiệu · Xếp hạng tuần
 *   3. Học vui (chủ đề thẻ từ)
 * Các trang chi tiết ở đường dẫn riêng (/daily-word, /games/spelling, /games/word-chain, /quests…),
 * trang này chỉ là "sảnh". Danh sách trò chơi: game-catalog.ts.
 * Bố cục dùng container query: tự xếp lại theo bề rộng thật của vùng nội dung
 * (có / không có sidebar, cột phải) chứ không theo bề rộng cửa sổ.
 * ----------------------------------------------------------------------------
 */
import { Button } from '../../design-system'
import { PLAY_ART } from './game-catalog'
import { DailyWordCard } from './hub/DailyWordCard'
import { FunTopicsStrip } from './hub/FunTopicsStrip'
import { MiniGameGrid } from './hub/MiniGameGrid'
import { BadgesCard, BoardCard, QuestsCard } from './hub/SideCards'
import { GameArt } from './components/GameArt'
import { usePlayText } from './playground-text'
import { usePlaygroundData } from './use-playground-data'
import './styles/play-kit.css'
import './styles/playground-hub.css'

export function PlaygroundPage() {
  const playText = usePlayText()
  const data = usePlaygroundData()

  return (
    <main className="page pg-page pg-hub">
      <header className="pg-hub__header">
        <div>
          <h1 className="pg-hub__title">{playText('hubTitle')}</h1>
          <p className="pg-hub__intro">{playText('hubIntro')}</p>
        </div>
      </header>

      <section className="pg-hub__section" aria-labelledby="pg-games-title">
        <div className="pg-section-head">
          <h2 id="pg-games-title" className="pg-section-title">
            {playText('gamesTitle')}
          </h2>
          <p className="pg-section-sub">{playText('gamesIntro')}</p>
        </div>
        <div className="pg-hub__games">
          <DailyWordCard data={data.dailyWord} />
          <MiniGameGrid records={data.records} />
        </div>
      </section>

      <div className="pg-hub__trio">
        <QuestsCard />
        <BadgesCard />
        <BoardCard />
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
