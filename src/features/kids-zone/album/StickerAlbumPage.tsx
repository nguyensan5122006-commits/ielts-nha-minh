/**
 * StickerAlbumPage.tsx — SỔ STICKER (/kids/album)
 * ----------------------------------------------------------------------------
 * Trái: 16 chủ đề Cambridge, mỗi chủ đề có thanh tiến độ "12/20".
 * Phải: trang của chủ đề đang chọn — sticker đã có (ảnh 3D viền trắng như sticker bóc dán,
 *       hơi nghiêng; bấm để nghe từ) và ô CHƯA CÓ là BÓNG ĐEN của hình (gợi tò mò "sưu tập
 *       cho đủ", ý tưởng từ trang chọn xe của PBS Kids) + phần thưởng đủ bộ: trang phục Ki.
 * Sticker chỉ có được bằng cách THUỘC từ (psych-kids luật 20–23) — không mua, không quay.
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { KidsWord } from '../../../content/content-types'
import { KIDS_OUTFITS } from '../../../content/kids'
import { Icon } from '../../../design-system/components/Icon'
import { fillMascotName } from '../../../design-system/mascot-name'
import { useLanguage } from '../../../translations/language-context'
import { KidsMascot } from '../game-engine/components/KidsMascot'
import { KidsPicture } from '../game-engine/components/KidsPicture'
import { SkyWorld } from '../game-engine/components/SkyWorld'
import { sayWord } from '../game-engine/kids-audio'
import { playSound } from '../game-engine/kids-sounds'
import { useKidsData } from '../kids-data/kids-data-context'
import { albumTotals, stickerIdForWord, topicStickerProgress } from '../kids-data/kids-rewards'
import { KIDS_TOPICS, pickActiveTopic } from '../kids-data/kids-word-bank'
import { useKidsText } from '../kids-text'
import '../game-engine/components/RewardScreens.css'
import './sticker-album.css'

/** Độ nghiêng "ngẫu nhiên" nhưng cố định cho mỗi sticker (để mỗi lần mở sổ trông giống nhau). */
function tiltFor(id: string) {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0
  return (Math.abs(hash) % 13) - 6
}

export function StickerAlbumPage() {
  const text = useKidsText()
  const { pick } = useLanguage()
  const { kids, basePath } = useKidsData()
  const [topicId, setTopicId] = useState(() => pickActiveTopic(kids).id)
  const [message, setMessage] = useState<{ wordId: string; text: string } | null>(null)
  const topic = KIDS_TOPICS.find((t) => t.id === topicId) ?? KIDS_TOPICS[0]
  const owned = new Set(kids.stickers)
  const progress = topicStickerProgress(kids, topic)
  const totals = albumTotals(kids)
  const outfit = KIDS_OUTFITS.find((o) => o.id === topic.outfitId)
  const outfitOwned = !!outfit && kids.outfits.includes(outfit.id)

  const tapSticker = (word: KidsWord) => {
    if (owned.has(stickerIdForWord(word.id))) {
      playSound('pop')
      setMessage({ wordId: word.id, text: `${word.word} · ${word.meaningVi}` })
      void sayWord(word)
    } else {
      playSound('tap')
      setMessage({ wordId: word.id, text: text.albumMissing })
    }
  }

  return (
    <SkyWorld>
      <div className="kz-album">
        <header className="kz-album__header">
          <Link to={basePath} className="kz-round-btn" aria-label={text.back} title={text.back}>
            <Icon name="arrow-right" size={24} className="kz-flip" />
          </Link>
          <h1 className="kz-album__title">{text.albumTitle}</h1>
          <span className="kz-chip kz-chip--gold kz-album__total">
            <Icon name="star" size={16} /> {text.albumTotal(totals.collected, totals.total)}
          </span>
        </header>

        <div className="kz-album__body">
          {/* ---------- danh sách chủ đề ---------- */}
          <nav className="kz-album__topics kz-card" aria-label={text.albumTopics}>
            {KIDS_TOPICS.map((t) => {
              const p = topicStickerProgress(kids, t)
              return (
                <button
                  key={t.id}
                  type="button"
                  className={['kz-album__topic', t.id === topic.id && 'is-active', p.collected >= p.total && 'is-complete'].filter(Boolean).join(' ')}
                  onClick={() => {
                    setTopicId(t.id)
                    setMessage(null)
                  }}
                  aria-current={t.id === topic.id ? 'page' : undefined}
                >
                  <KidsPicture slug={t.image} word={t.title.en} size={36} decorative />
                  <span className="kz-album__topic-text">
                    <span className="kz-album__topic-name">{pick(t.title)}</span>
                    <span className="kz-album__topic-bar" style={{ '--fill': `${(p.collected / Math.max(1, p.total)) * 100}%` } as CSSProperties} />
                  </span>
                  <span className="kz-album__topic-count">
                    {p.collected}/{p.total}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* ---------- trang chủ đề ---------- */}
          <section className="kz-album__page kz-card" aria-labelledby="kz-album-topic">
            <div className="kz-album__page-head">
              <KidsPicture slug={topic.image} word={topic.title.en} size={56} decorative />
              <div className="kz-album__page-title">
                <h2 id="kz-album-topic">{pick(topic.title)}</h2>
                <div className="kz-album__progress" style={{ '--fill': `${(progress.collected / Math.max(1, progress.total)) * 100}%` } as CSSProperties}>
                  <span className="kz-album__progress-bar" />
                  <span className="kz-album__progress-text">
                    {progress.collected}/{progress.total}
                  </span>
                </div>
              </div>
              {outfit && (
                <div className={['kz-album__reward', outfitOwned && 'is-owned'].filter(Boolean).join(' ')}>
                  <KidsMascot pose="happy" size={64} outfitId={outfit.id} />
                  <span>{outfitOwned ? text.albumOutfitOwned(fillMascotName(pick(outfit.name))) : text.albumOutfitReward(fillMascotName(pick(outfit.name)))}</span>
                </div>
              )}
            </div>

            <ul className="kz-album__grid">
              {topic.words.map((word) => {
                const has = owned.has(stickerIdForWord(word.id))
                return (
                  <li key={word.id}>
                    <button
                      type="button"
                      className={['kz-album-sticker', has ? 'is-owned' : 'is-missing', message?.wordId === word.id && 'is-selected'].filter(Boolean).join(' ')}
                      style={{ '--tilt': `${tiltFor(word.id)}deg` } as CSSProperties}
                      onClick={() => tapSticker(word)}
                      aria-label={has ? word.word : text.albumMissing}
                    >
                      {word.image ? (
                        <KidsPicture slug={word.image} word={word.word} size={84} decorative />
                      ) : (
                        // từ không có ảnh: sticker chữ
                        <span className="kz-album-sticker__letters">{has ? word.word : '?'}</span>
                      )}
                      <span className="kz-album-sticker__label">{has ? word.word : '?'}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            {message && (
              <p className="kz-album__message kz-bubble kz-bubble--tail-bottom" key={message.wordId} role="status">
                {message.text}
              </p>
            )}
          </section>
        </div>
      </div>
    </SkyWorld>
  )
}
