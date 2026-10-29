/**
 * ChapterBadge.tsx — MÀN "HUY HIỆU CHƯƠNG" khi bé đi hết 1 chương truyện
 * ----------------------------------------------------------------------------
 * Huy hiệu tròn vàng (vẽ bằng CSS) có ảnh của chương ở giữa + dải ruy-băng "Chương 3",
 * Ki ăn mừng và nói "Chương này xong rồi. Cảm ơn đồng đội đã giúp Ki." (giọng + phụ đề chạy theo).
 * 1 nút "Nhận huy hiệu" -> sang phần thưởng chung (sticker nếu có) + "Túi đồ từ vựng".
 * Huy hiệu là mốc THẬT (xong cả chương) nên được ăn mừng to (luật 18).
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import type { KidsStoryChapter } from '../../../../content/content-types'
import { getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { fireConfetti } from '../../../../design-system/components/Confetti'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { KidsPicture } from '../../game-engine/components/KidsPicture'
import { MascotSays } from '../../game-engine/components/MascotSays'
import { playSound } from '../../game-engine/kids-sounds'
import { useGameKeys } from '../../game-engine/use-game-keys'
import { useLanguage } from '../../../../translations/language-context'
import { usePatrolText } from './patrol-text'
import { CHAPTER_BADGE_ART, chapterNumber } from './story-plan'

export function ChapterBadge({ chapter, outfitId, onDone }: { chapter: KidsStoryChapter; outfitId?: string; onDone: () => void }) {
  const text = usePatrolText()
  const { language } = useLanguage()
  const number = chapterNumber(chapter)
  const line = getKidsVoiceLine('kids-vl-story-end')

  useEffect(() => {
    playSound('levelUp')
    fireConfetti({ origin: { x: 0.5, y: 0.35 }, particleCount: 90 })
  }, [])

  useGameKeys({ onEnter: onDone })

  return (
    <main className="pa-badge-screen">
      <p className="kz-chip kz-chip--gold pa-badge-screen__chip">{text.badgeTitle}</p>
      <div className="pa-medal" aria-hidden>
        <span className="pa-medal__ribbon pa-medal__ribbon--left" />
        <span className="pa-medal__ribbon pa-medal__ribbon--right" />
        <span className="pa-medal__disc">
          <span className="pa-medal__rays" />
          <KidsPicture slug={CHAPTER_BADGE_ART[chapter.id] ?? 'sports-medal'} word="badge" size={120} decorative />
        </span>
        <span className="pa-medal__band">{text.chapterLabel(number)}</span>
      </div>
      <h1 className="pa-badge-screen__title">{text.badgeChapter(number)}</h1>
      <p className="pa-badge-screen__name">{fillMascotName(language === 'en' ? chapter.title.en : chapter.title.vi)}</p>
      {line && (
        <MascotSays pose="celebrate" text={fillMascotName(line.vi)} lineId={line.id} mascotSize={120} outfitId={outfitId} className="pa-badge-screen__ki" />
      )}
      <Button size="xl" className="pa-badge-next" onClick={onDone} iconRight={<Kbd onColor>Enter</Kbd>}>
        {text.badgeCollect}
      </Button>
    </main>
  )
}
