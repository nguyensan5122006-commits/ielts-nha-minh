/**
 * PictureWordPage.tsx — TRÒ "NHÌN ẢNH ĐOÁN TỪ": /games/picture-word
 * ----------------------------------------------------------------------------
 * Hiện 1 ảnh 3D (Fluent Emoji, public/word-images/<slug>.webp) -> người chơi ghép chữ cái
 * thành từ tiếng Anh (bấm viên chữ hoặc gõ phím). Gợi ý: chữ cái đầu, nghĩa tiếng Việt, nghe từ.
 * Mọi ô đều trống (khác trò Điền chữ còn thiếu). Luật chung: round-rules.ts · khung trang: WordGuessGamePage.
 * ----------------------------------------------------------------------------
 */
import { WordGuessGamePage } from './WordGuessGamePage'

/** Hình minh hoạ cách chơi trên màn chọn ván: ảnh con mèo -> ô chữ C A T */
function PicturePreview() {
  return (
    <div className="wk-preview" aria-hidden>
      <img className="wk-preview__img" src="/word-images/cat-face.webp" alt="" width={96} height={96} />
      <span className="wk-preview__arrow">→</span>
      <span className="wk-preview__slots">
        <i className="is-filled">c</i>
        <i className="is-filled">a</i>
        <i>t</i>
      </span>
    </div>
  )
}

export function PictureWordPage() {
  return <WordGuessGamePage gameId="picture-word" mode="picture" preview={<PicturePreview />} />
}
