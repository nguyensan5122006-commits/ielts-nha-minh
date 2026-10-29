/**
 * RoundResult.tsx — MÀN KẾT QUẢ CUỐI VÁN (dùng chung cho Nhìn ảnh, Điền chữ, Spelling Bee, Nối từ)
 * ----------------------------------------------------------------------------
 *   <RoundResult
 *     score={820} correct={8} total={10} bestStreak={5}
 *     words={[{ word: 'cat', meaningVi: 'con mèo', correct: false, … }]}   // để liệt kê "từ cần ôn"
 *     saved={{ isNewRecord: true, isWeekBest: true, myBest: 820 }}         // null = đang lưu / không lưu được
 *     onPlayAgain={…} onChangeSettings={…}
 *   />
 * Thứ tự (theo 04-DESIGN-SYSTEM mục 9): mascot + tiêu đề → điểm lớn + 3 chỉ số
 * → từ cần ôn (nút nghe) → 1 nút chính "Chơi ván mới" (Enter) + nút phụ.
 * Mascot: phá kỷ lục = celebrate · đúng ≥ nửa = happy · còn lại = thumbs-up (cổ vũ, không chê).
 * ----------------------------------------------------------------------------
 */
import { useEffect, type ReactNode } from 'react'
import { Button, IconButton, Kbd, Mascot } from '../../../design-system'
import { speak } from '../../../services/text-to-speech'
import { GameArt } from '../../playground/components/GameArt'
import type { WordOutcome } from '../round-rules'
import { useWordGamesText } from '../word-games-text'

export interface SavedScore {
  isNewRecord: boolean
  /** điểm cao nhất tuần của mình (chưa phải kỷ lục mọi lúc) */
  isWeekBest: boolean
  /** kỷ lục mọi lúc sau ván này */
  myBest: number | null
}

export interface RoundResultProps {
  score: number
  correct?: number
  total?: number
  bestStreak?: number
  /** dòng phụ dưới tiêu đề (VD lý do thua ở Nối từ) */
  subtitle?: ReactNode
  /** tiêu đề riêng (mặc định "Xong ván!"; kỷ lục mới hiện bằng nhãn vàng bên dưới) */
  title?: ReactNode
  words?: WordOutcome[]
  /** hiện mục "Từ cần ôn lại" (mặc định: khi có danh sách từ) — truyền true để hiện cả khi không sai từ nào */
  showReview?: boolean
  /** undefined = đang lưu · null = không lưu được · còn lại = kết quả lưu */
  saved: SavedScore | null | undefined
  onPlayAgain: () => void
  onChangeSettings?: () => void
  /** nội dung thêm (VD chuỗi từ của ván Nối từ) */
  children?: ReactNode
}

export function RoundResult({ score, correct, total, bestStreak, subtitle, title, words = [], showReview, saved, onPlayAgain, onChangeSettings, children }: RoundResultProps) {
  const text = useWordGamesText()
  const missed = words.filter((word) => !word.correct)
  const isNewRecord = !!saved?.isNewRecord
  const pose = isNewRecord ? 'celebrate' : correct !== undefined && total ? (correct >= total / 2 ? 'happy' : 'thumbs-up') : 'happy'

  // Enter = chơi ván mới
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      // đang đứng ở 1 nút / link / ô nhập -> để Enter làm việc của chính nó
      if (event.key !== 'Enter' || (target && ['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes(target.tagName))) return
      event.preventDefault()
      onPlayAgain()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onPlayAgain])

  return (
    <section className="pg-panel wk-result" aria-labelledby="round-result-title">
      <div className="wk-result__hero">
        <Mascot pose={pose} size={132} />
        <div className="wk-result__headline">
          <h2 id="round-result-title">{title ?? text('resultDone')}</h2>
          {subtitle && <p className="wk-result__subtitle">{subtitle}</p>}
          <div className="wk-result__score">
            <strong className="ds-num">{score}</strong>
            <span>{text('score').toLowerCase()}</span>
          </div>
          <div className="wk-result__badges">
            {isNewRecord && (
              <span className="wg-record">
                <GameArt slug="trophy" size={24} /> {text('resultNewRecord')}
              </span>
            )}
            {!isNewRecord && saved?.isWeekBest && (
              <span className="wk-chip wk-chip--gold">
                <GameArt slug="glowing-star" size={20} /> {text('resultWeekBest')}
              </span>
            )}
          </div>
        </div>
      </div>

      <dl className="wk-result__stats">
        {correct !== undefined && total !== undefined && (
          <div>
            <dt>{text('statCorrect')}</dt>
            <dd className="ds-num">
              {correct}/{total}
            </dd>
          </div>
        )}
        {bestStreak !== undefined && (
          <div>
            <dt>{text('statStreak')}</dt>
            <dd className="ds-num">{bestStreak}</dd>
          </div>
        )}
        <div>
          <dt>{text('panelMineAll')}</dt>
          <dd className="ds-num">{saved === undefined ? '…' : (saved?.myBest ?? '—')}</dd>
        </div>
      </dl>

      {saved === null && <p className="pg-note pg-note--gold">{text('resultOffline')}</p>}

      {children}

      {(showReview ?? words.length > 0) && (
        <div className="wk-result__review">
          <h3>{text('resultReview')}</h3>
          {missed.length === 0 ? (
            <p className="wk-result__all-right">
              <GameArt slug="check-mark-button" size={22} /> {text('resultAllRight')}
            </p>
          ) : (
            <ul className="wk-missed">
              {missed.map((word) => (
                <li key={word.word}>
                  {word.imageSlug ? <GameArt slug={word.imageSlug} size={40} /> : <span className="wk-missed__dot" aria-hidden />}
                  <span className="wk-missed__text">
                    <strong>{word.word}</strong>
                    <span>{word.meaningVi}</span>
                  </span>
                  <IconButton icon="volume" label={`${text('listen')}: ${word.word}`} size="sm" onClick={() => void speak(word.word)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="pg-actions wk-result__actions">
        {onChangeSettings && (
          <Button variant="secondary" onClick={onChangeSettings}>
            {text('resultChange')}
          </Button>
        )}
        <Button size="lg" onClick={onPlayAgain} iconLeft="retry">
          {text('resultPlayAgain')} <Kbd onColor>Enter</Kbd>
        </Button>
      </div>
      <Button variant="ghost" size="sm" to="/play" iconRight="arrow-right">
        {text('resultBack')}
      </Button>
    </section>
  )
}
