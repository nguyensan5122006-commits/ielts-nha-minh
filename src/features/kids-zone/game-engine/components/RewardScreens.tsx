/**
 * RewardScreens.tsx — CÁC MÀN "NHẬN THƯỞNG" VÀ "NHẮC NGHỈ" (lớp phủ giữa màn hình)
 * ----------------------------------------------------------------------------
 *   <StickerAward word={kidsWord} onDone={...} />           // 1 sticker mới (từ vừa thuộc)
 *   <OutfitUnlock outfit={kidsOutfit} onTryOn onLater />    // đủ bộ sticker -> trang phục Ki
 *   <RestReminder wordsToday stickersToday onRest onOneMore />  // chơi ≥ 30 phút
 *
 * Luật (psych-kids 8, 18–21): khen lớn CHỈ cho mốc thật (thuộc từ sau ≥ 7 ngày, đủ bộ);
 * màn nhắc nghỉ không khoá, không trách, 2 nút ngang hàng.
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import type { KidsWord } from '../../../../content/content-types'
import { getKidsVoiceLine, type KidsOutfit } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { fireConfetti } from '../../../../design-system/components/Confetti'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { useLanguage } from '../../../../translations/language-context'
import { topicOfWord } from '../../kids-data/kids-word-bank'
import { useKidsText } from '../../kids-text'
import { sayWord } from '../kids-audio'
import { playSound } from '../kids-sounds'
import { useGameKeys } from '../use-game-keys'
import { KidsMascot } from './KidsMascot'
import { KidsPicture } from './KidsPicture'
import { MascotSays } from './MascotSays'
import './RewardScreens.css'

const voice = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

/* ============================ Sticker mới ============================ */

export function StickerAward({ word, onDone }: { word: KidsWord; onDone: () => void }) {
  const text = useKidsText()
  const { pick } = useLanguage()
  const topic = topicOfWord(word.id)

  useEffect(() => {
    playSound('sticker')
    fireConfetti({ origin: { x: 0.5, y: 0.42 }, particleCount: 90 })
    const timer = window.setTimeout(() => void sayWord(word), 500)
    return () => window.clearTimeout(timer)
  }, [word])

  useGameKeys({ onEnter: onDone, onReplay: () => void sayWord(word) })

  return (
    <div className="kz-overlay" role="dialog" aria-modal="true" aria-labelledby="kz-sticker-title">
      <div className="kz-award">
        <span className="kz-award__rays" aria-hidden />
        <p id="kz-sticker-title" className="kz-award__eyebrow">
          <Icon name="sparkle" size={20} /> {text.stickerTitle}
        </p>
        <button type="button" className="kz-sticker" onClick={() => void sayWord(word)} aria-label={word.word}>
          <KidsPicture slug={word.image} word={word.word} size={200} decorative />
        </button>
        <h2 className="kz-award__word">{word.word}</h2>
        <p className="kz-award__meaning">
          {word.meaningVi}
          {topic && <span className="kz-chip kz-award__topic">{pick(topic.title)}</span>}
        </p>
        {/* Lời khen "mốc thật": nhớ từ sau cả tuần */}
        <MascotSays pose="celebrate" text={voice('kids-vl-praise-m01')} lineId="kids-vl-praise-m01" mascotSize={110} className="kz-award__says" />
        <Button size="xl" onClick={onDone} iconRight={<Kbd onColor>Enter</Kbd>}>
          {text.stickerToAlbum}
        </Button>
      </div>
    </div>
  )
}

/* ============================ Trang phục mới ============================ */

export function OutfitUnlock({ outfit, onTryOn, onLater }: { outfit: KidsOutfit; onTryOn: () => void; onLater: () => void }) {
  const text = useKidsText()
  const { pick } = useLanguage()
  useEffect(() => {
    playSound('levelUp')
    fireConfetti({ origin: { x: 0.5, y: 0.4 }, particleCount: 110 })
  }, [])
  const lineId = getKidsVoiceLine(`kids-vl-outfit-${outfit.id}`) ? `kids-vl-outfit-${outfit.id}` : 'kids-vl-unlock-outfit'
  const line = voice(lineId)

  return (
    <div className="kz-overlay" role="dialog" aria-modal="true" aria-labelledby="kz-outfit-title">
      <div className="kz-award kz-award--outfit">
        <span className="kz-award__rays" aria-hidden />
        <p id="kz-outfit-title" className="kz-award__eyebrow">
          <Icon name="sparkle" size={20} /> {text.outfitTitle}
        </p>
        <div className="kz-award__stage">
          <KidsMascot pose="celebrate" outfitId={outfit.id} size={230} />
        </div>
        <h2 className="kz-award__word">{fillMascotName(pick(outfit.name))}</h2>
        <MascotSays pose="happy" text={line} lineId={lineId} hideMascot className="kz-award__says" />
        <div className="kz-choice-row">
          <button type="button" className="kz-choice" onClick={onTryOn}>
            <Icon name="sparkle" size={22} /> {text.outfitTry}
          </button>
          <button type="button" className="kz-choice" onClick={onLater}>
            {text.outfitLater}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ============================ Nhắc nghỉ mắt ============================ */

export interface RestReminderProps {
  wordsToday: number
  stickersToday: number
  onRest: () => void
  onOneMore: () => void
}

export function RestReminder({ wordsToday, stickersToday, onRest, onOneMore }: RestReminderProps) {
  const text = useKidsText()
  return (
    <div className="kz-overlay" role="dialog" aria-modal="true" aria-labelledby="kz-rest-title">
      <div className="kz-award kz-award--rest">
        <h2 id="kz-rest-title" className="kz-award__title">
          {text.restTitle}
        </h2>
        <MascotSays pose="sleepy" text={voice('kids-vl-rest-01')} lineId="kids-vl-rest-01" mascotSize={170} className="kz-award__says kz-award__says--big" />
        <p className="kz-award__tip">
          <KidsPicture slug="eyes" word="eyes" size={34} decorative /> {voice('kids-vl-rest-02')}
        </p>
        <p className="kz-award__summary">{text.restSummary(wordsToday, stickersToday)}</p>
        <div className="kz-choice-row">
          <button type="button" className="kz-choice" onClick={onRest}>
            <KidsPicture slug="sleeping-face" word="rest" size={34} decorative /> {text.restStop}
          </button>
          <button type="button" className="kz-choice" onClick={onOneMore}>
            <Icon name="play-fill" size={22} /> {text.restOneMore}
          </button>
        </div>
      </div>
    </div>
  )
}
