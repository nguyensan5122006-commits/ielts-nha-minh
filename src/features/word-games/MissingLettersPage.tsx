/**
 * MissingLettersPage.tsx — TRÒ "ĐIỀN CHỮ CÒN THIẾU": /games/missing-letters
 * ----------------------------------------------------------------------------
 * 1 từ bị che vài chữ (VD  c _ t ), manh mối = nghĩa tiếng Việt (+ ảnh, + tiếng tuỳ độ khó).
 * Độ khó càng cao càng che nhiều chữ (dễ ~1/3, vừa ~1/2, khó ~2/3 và có thể che cả chữ đầu).
 * Luật chung: round-rules.ts · khung trang: WordGuessGamePage.
 * ----------------------------------------------------------------------------
 */
import { WordGuessGamePage } from './WordGuessGamePage'

/** Hình minh hoạ cách chơi: b _ n a _ a -> banana */
function MissingPreview() {
  return (
    <div className="wk-preview" aria-hidden>
      <img className="wk-preview__img" src="/word-images/banana.webp" alt="" width={96} height={96} />
      <span className="wk-preview__slots">
        <i className="is-given">b</i>
        <i className="is-filled">a</i>
        <i className="is-given">n</i>
        <i className="is-given">a</i>
        <i />
        <i className="is-given">a</i>
      </span>
    </div>
  )
}

export function MissingLettersPage() {
  return <WordGuessGamePage gameId="missing-letters" mode="missing" preview={<MissingPreview />} />
}
