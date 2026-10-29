/**
 * WardrobePage.tsx — TỦ ĐỒ CỦA KI (/kids/wardrobe)
 * ----------------------------------------------------------------------------
 * Trái: "sân khấu" — Ki mặc bộ đang xem thử, tên bộ đồ, nút "Mặc bộ này".
 * Phải: 11 bộ đồ. Bộ đã mở -> bấm để xem thử; bộ chưa mở -> bóng đen + "Đủ bộ sticker
 *       Động vật: 8/37" (cách mở khoá luôn là HỌC, không mua — luật 21–23).
 * Đổi trang phục tự do bất cứ lúc nào (luật 25).
 * Ảnh Ki mặc đồ (/mascot/outfits/<id>-512.webp) chưa có -> ảnh tạm: Ki + món phụ kiện.
 * ----------------------------------------------------------------------------
 */
import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { getKidsVoiceLine, KIDS_OUTFITS, type KidsOutfit } from '../../../content/kids'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { fillMascotName } from '../../../design-system/mascot-name'
import { useLanguage } from '../../../translations/language-context'
import { KidsMascot } from '../game-engine/components/KidsMascot'
import { MascotSays } from '../game-engine/components/MascotSays'
import { SkyWorld } from '../game-engine/components/SkyWorld'
import { playSound } from '../game-engine/kids-sounds'
import { useKidsData } from '../kids-data/kids-data-context'
import { equippedOutfitId, isOutfitOwned, outfitIdForStore, topicStickerProgress } from '../kids-data/kids-rewards'
import { findKidsTopic } from '../kids-data/kids-word-bank'
import { useKidsText } from '../kids-text'
import './wardrobe.css'

export function WardrobePage() {
  const text = useKidsText()
  const { pick } = useLanguage()
  const { kids, basePath, equipOutfit } = useKidsData()
  const wearing = equippedOutfitId(kids)
  const [previewId, setPreviewId] = useState(wearing)
  const preview = KIDS_OUTFITS.find((o) => o.id === previewId) ?? KIDS_OUTFITS[0]
  const previewOwned = isOutfitOwned(kids, preview)
  const outfitName = (outfit: KidsOutfit) => fillMascotName(pick(outfit.name))
  const line = getKidsVoiceLine(`kids-vl-outfit-${preview.id}`)

  const wear = () => {
    playSound('pop')
    equipOutfit(outfitIdForStore(preview.id))
  }

  return (
    <SkyWorld>
      <div className="kz-wardrobe">
        <header className="kz-wardrobe__header">
          <Link to={basePath} className="kz-round-btn" aria-label={text.back} title={text.back}>
            <Icon name="arrow-right" size={24} className="kz-flip" />
          </Link>
          <h1 className="kz-wardrobe__title">{text.wardrobeTitle}</h1>
        </header>

        <div className="kz-wardrobe__body">
          {/* ---------- sân khấu ---------- */}
          <section className="kz-wardrobe__stage kz-card" aria-live="polite">
            <div className={['kz-wardrobe__podium', !previewOwned && 'is-locked'].filter(Boolean).join(' ')}>
              <KidsMascot pose={previewOwned ? 'happy' : 'thinking'} size={300} outfitId={preview.id} key={preview.id} />
            </div>
            <h2 className="kz-wardrobe__name">{outfitName(preview)}</h2>
            {previewOwned && line && <MascotSays key={preview.id} pose="happy" text={fillMascotName(line.vi)} lineId={line.id} hideMascot autoPlay={false} className="kz-wardrobe__says" />}
            {previewOwned ? (
              wearing === preview.id ? (
                <span className="kz-chip kz-chip--up kz-wardrobe__wearing">
                  <Icon name="check" size={18} strokeWidth={3} /> {text.wardrobeWearing}
                </span>
              ) : (
                <Button size="xl" onClick={wear} iconLeft="sparkle">
                  {text.wardrobeWear}
                </Button>
              )
            ) : (
              <LockedHint outfit={preview} />
            )}
          </section>

          {/* ---------- các bộ đồ ---------- */}
          <ul className="kz-wardrobe__grid">
            {KIDS_OUTFITS.map((outfit) => {
              const owned = isOutfitOwned(kids, outfit)
              return (
                <li key={outfit.id}>
                  <button
                    type="button"
                    className={['kz-outfit kz-card', owned ? 'is-owned' : 'is-locked', outfit.id === previewId && 'is-selected'].filter(Boolean).join(' ')}
                    onClick={() => {
                      playSound('tap')
                      setPreviewId(outfit.id)
                    }}
                    aria-pressed={outfit.id === previewId}
                  >
                    {outfit.id === wearing && (
                      <span className="kz-outfit__wearing" aria-label={text.wardrobeWearing}>
                        <Icon name="check" size={16} strokeWidth={3.2} />
                      </span>
                    )}
                    {!owned && (
                      <span className="kz-outfit__lock" aria-hidden>
                        <Icon name="lock" size={16} />
                      </span>
                    )}
                    <KidsMascot pose="happy" size={104} outfitId={outfit.id} />
                    <span className="kz-outfit__name">{outfitName(outfit)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </SkyWorld>
  )
}

/** Bộ chưa mở: cách mở khoá + tiến độ sticker của chủ đề. */
function LockedHint({ outfit }: { outfit: KidsOutfit }) {
  const text = useKidsText()
  const { pick } = useLanguage()
  const { kids } = useKidsData()
  const topic = outfit.unlockTopicId ? findKidsTopic(outfit.unlockTopicId) : undefined
  if (!topic) return null
  const progress = topicStickerProgress(kids, topic)
  return (
    <div className="kz-wardrobe__locked">
      <p>{text.wardrobeLocked(pick(topic.title), progress.collected, progress.total)}</p>
      <span className="kz-wardrobe__locked-bar" style={{ '--fill': `${(progress.collected / Math.max(1, progress.total)) * 100}%` } as CSSProperties} />
    </div>
  )
}
