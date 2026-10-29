/**
 * RoundResult.tsx — MÀN KẾT THÚC LƯỢT: "TÚI ĐỒ TỪ VỰNG"
 * ----------------------------------------------------------------------------
 * Bên trái: Ki ăn mừng + lời nói (giọng + phụ đề), số sao ⭐ (câu đúng ngay lần đầu),
 *           kỷ lục cá nhân, "Lượt 2/3" so với mục tiêu hôm nay.
 * Bên phải: túi đồ — mỗi từ vừa gặp là 1 thẻ có loa; nhãn "Mới" (từ mới),
 *           "↑ Lên hộp" (lên hộp Leitner), "Thuộc rồi" (vừa thành sticker).
 * Dưới: 2 nút CÙNG CỠ, CÙNG KIỂU: "Chơi thêm 1 lượt" | "Xong hôm nay" — không nút nào
 *       được chọn sẵn, không tự chơi tiếp (psych-kids luật 3–4).
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { getKidsVoiceLine } from '../../../../content/kids'
import { fireConfetti } from '../../../../design-system/components/Confetti'
import { Icon } from '../../../../design-system/components/Icon'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useKidsText } from '../../kids-text'
import type { RoundSummary, RoundWordResult } from '../engine-types'
import { sayWord } from '../kids-audio'
import { playSound } from '../kids-sounds'
import { KidsPicture } from './KidsPicture'
import { MascotSays } from './MascotSays'
import './RoundResult.css'

export interface RoundResultProps {
  summary: RoundSummary
  /** lượt thứ mấy hôm nay (đã tính lượt này) */
  roundsToday: number
  /** mục tiêu bé chọn ở sảnh (1/2/3) */
  goal: number
  onPlayAgain: () => void
  onDone: () => void
}

export function RoundResult({ summary, roundsToday, goal, onPlayAgain, onDone }: RoundResultProps) {
  const text = useKidsText()
  const goalReached = roundsToday >= goal
  // Lời Ki: xong mục tiêu -> "Xong mục tiêu hôm nay rồi." ; chưa -> "Xong một vòng rồi. Bạn muốn làm gì tiếp?"
  const line = getKidsVoiceLine(goalReached ? 'kids-vl-end-02' : 'kids-vl-end-01')

  useEffect(() => {
    playSound('complete')
    fireConfetti({ origin: { x: 0.28, y: 0.4 }, particleCount: 70 })
  }, [])

  return (
    <section className="kz-result" aria-labelledby="kz-result-title">
      <div className="kz-result__hero">
        {roundsToday <= goal && <span className="kz-chip kz-result__round">{text.roundCounter(roundsToday, goal)}</span>}
        <h1 id="kz-result-title" className="kz-result__title">
          {goalReached ? text.goalDoneTitle : text.roundDoneTitle}
        </h1>

        <div className="kz-result__stars">
          <span className="kz-result__star-badge" aria-hidden>
            <Icon name="star" size={44} />
            <span className="kz-result__star-count">{summary.stars}</span>
          </span>
          <span className="kz-result__stars-text">{text.starsLine(summary.stars, summary.totalQuestions)}</span>
        </div>

        {summary.isPersonalBest ? (
          <div className="kz-result__best is-new">
            <KidsPicture slug="trophy" word="trophy" size={40} decorative />
            {text.personalBest}
          </div>
        ) : summary.previousBest > 0 ? (
          <div className="kz-result__best">{text.personalBestOld(Math.max(summary.previousBest, summary.stars))}</div>
        ) : null}

        {line && <MascotSays pose="celebrate" text={fillMascotName(line.vi)} lineId={line.id} mascotSize={180} className="kz-result__mascot" />}
      </div>

      <div className="kz-result__bag kz-card">
        <header className="kz-result__bag-head">
          <KidsPicture slug="backpack" word="backpack" size={52} decorative />
          <div>
            <h2 className="kz-result__bag-title">{text.bagTitle}</h2>
            <p className="kz-result__bag-hint">{text.bagHint}</p>
          </div>
        </header>
        <ul className="kz-result__words">
          {summary.words.map((result, index) => (
            <WordTile key={result.word.id} result={result} index={index} />
          ))}
        </ul>
      </div>

      <div className="kz-choice-row kz-result__choices">
        <button type="button" className="kz-choice" onClick={onPlayAgain}>
          <Icon name="play-fill" size={24} /> {text.playOneMore}
        </button>
        <button type="button" className="kz-choice" onClick={onDone}>
          <Icon name="check" size={24} /> {text.doneForToday}
        </button>
      </div>
    </section>
  )
}

function WordTile({ result, index }: { result: RoundWordResult; index: number }) {
  const text = useKidsText()
  const movedUp = result.boxAfter !== null && result.boxBefore !== null && result.boxAfter > result.boxBefore
  return (
    <li className="kz-result__word" style={{ animationDelay: `${180 + index * 55}ms` }}>
      <button type="button" className="kz-result__word-btn" onClick={() => void sayWord(result.word)} aria-label={`${result.word.word}, ${result.word.meaningVi}`}>
        <KidsPicture slug={result.word.image} word={result.word.word} size={58} decorative />
        <span className="kz-result__word-text">
          <span className="kz-result__word-en">{result.word.word}</span>
          <span className="kz-result__word-vi">{result.word.meaningVi}</span>
        </span>
        <span className="kz-result__tags">
          {result.justMastered ? (
            <span className="kz-chip kz-chip--gold">{text.tagMastered}</span>
          ) : result.isNew ? (
            <span className="kz-chip kz-chip--new">{text.tagNew}</span>
          ) : movedUp ? (
            <span className="kz-chip kz-chip--up" title={text.tagUp}>
              ↑ {text.tagUp}
            </span>
          ) : null}
        </span>
        <Icon name="volume" size={18} className="kz-result__speaker" />
      </button>
    </li>
  )
}
