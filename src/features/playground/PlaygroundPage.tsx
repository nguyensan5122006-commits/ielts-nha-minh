/**
 * PlaygroundPage.tsx — TRANG /play "TRÒ CHƠI CHỮ"
 * ----------------------------------------------------------------------------
 * Sảnh của 5 trò chơi chữ (chơi một mình, so kỷ lục với cả nhà):
 *   1. Đầu trang: tiêu đề + mascot Ki ("chọn từ trong bài bạn đã học")
 *   2. Lưới trò chơi: thẻ lớn "Thử thách từ hôm nay" (trạng thái hôm nay) + 4 thẻ trò tính điểm
 *      (Nhìn ảnh đoán từ, Điền chữ còn thiếu, Spelling Bee, Nối từ) — mỗi thẻ có kỷ lục của bạn
 *      và ai dẫn đầu tuần này
 *   3. Bảng kỷ lục gia đình: mọi thành viên × 5 trò, điểm cao nhất tuần này + kỷ lục mọi lúc
 *   4. Nhiệm vụ ngày · Huy hiệu · XP tuần cả nhà (thi đua của chế độ Tiếng Anh cơ bản)
 *   5. Học vui: thẻ từ theo chủ đề
 * Danh sách trò chơi: game-catalog.ts. Dữ liệu: use-playground-data.ts (/api/games/daily-word + /api/games/board).
 * Bố cục dùng container query: tự xếp lại theo bề rộng thật của vùng nội dung
 * (có / không có sidebar, cột phải) chứ không theo bề rộng cửa sổ.
 * ----------------------------------------------------------------------------
 */
import { Button, Mascot } from '../../design-system'
import { boardFor } from '../word-games/use-game-board'
import { useWordGamesText } from '../word-games/word-games-text'
import { GameArt } from './components/GameArt'
import { MINI_GAMES, PLAY_ART } from './game-catalog'
import { DailyWordCard } from './hub/DailyWordCard'
import { FamilyRecordsBoard } from './hub/FamilyRecordsBoard'
import { FunTopicsStrip } from './hub/FunTopicsStrip'
import { BadgesCard, BoardCard, QuestsCard } from './hub/SideCards'
import { usePlayText } from './playground-text'
import { WordGameCard } from './hub/WordGameCard'
import { usePlaygroundData } from './use-playground-data'
import './styles/play-kit.css'
import './styles/playground-hub.css'
import './styles/word-games-hub.css'

/** 2 trò mới có nhãn "Mới" */
const NEW_GAMES = new Set(['picture-word', 'missing-letters'])

export function PlaygroundPage() {
  const text = useWordGamesText()
  const playText = usePlayText()
  const data = usePlaygroundData()
  const week = typeof data.board === 'object' ? data.board.week : null

  return (
    <main className="page pg-page wgh">
      <header className="wgh-hero">
        <div className="wgh-hero__text">
          <h1 className="wgh-hero__title">{text('hubTitle')}</h1>
          <p className="wgh-hero__intro">{text('hubIntro')}</p>
        </div>
        <div className="wgh-hero__mascot">
          <p className="wgh-hero__bubble">{text('hubMascot')}</p>
          <Mascot pose="thumbs-up" size={124} />
        </div>
      </header>

      <section className="wgh-section" aria-labelledby="wgh-games-title">
        <h2 id="wgh-games-title" className="ds-visually-hidden">
          {text('hubGames')}
        </h2>
        <div className="wgh-grid">
          <DailyWordCard data={data.dailyWord} weekSolved={boardFor(data.board, 'daily-word')?.myWeekBest} />
          {MINI_GAMES.map((game, index) => (
            <WordGameCard key={game.id} game={game} board={boardFor(data.board, game.id)} isNew={NEW_GAMES.has(game.id)} tilt={index % 2 === 0 ? -6 : 6} />
          ))}
        </div>
      </section>

      <section className="wgh-section pg-panel" aria-labelledby="wgh-board-title">
        <div className="wgh-section__head">
          <h2 id="wgh-board-title" className="pg-section-title">
            <GameArt slug="trophy" size={34} /> {text('boardTitle')}
          </h2>
          <p className="pg-section-sub">
            {text('boardIntro')}
            {week && <span className="wgh-week ds-num">{week.replace('-W', ' · W')}</span>}
          </p>
        </div>
        <FamilyRecordsBoard board={data.board} />
      </section>

      {/* 4. Thi đua của chế độ Tiếng Anh cơ bản: nhiệm vụ ngày, huy hiệu, XP tuần cả nhà
          (trang /play luôn tính là chế độ cơ bản — xem gamification-scope.ts) */}
      <div className="pg-hub__trio">
        <QuestsCard />
        <BadgesCard />
        <BoardCard />
      </div>

      {/* 5. Học vui: thẻ từ theo chủ đề (không phải trò chơi, chỉ để xem cho vui) */}
      <section className="wgh-section" aria-labelledby="pg-fun-title">
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
