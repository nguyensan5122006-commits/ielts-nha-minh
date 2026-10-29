/**
 * ChapterMap.tsx — "BẢN ĐỒ TUẦN TRA": 6 CHƯƠNG TRUYỆN, CHỌN 1 ĐỂ CHƠI
 * ----------------------------------------------------------------------------
 * 6 thẻ chương kiểu bìa truyện tranh: ảnh cảnh đầu, "Chương 3", tên chương (VI + EN).
 *   - Chương đã xong: gắn huy hiệu vàng, chơi lại được.
 *   - Chương tiếp theo: sáng viền + nhãn "Nhiệm vụ mới"; nút to bên dưới = bắt đầu chương này (Enter).
 *   - Chương chưa mở: mờ, ổ khoá nhỏ, ghi "Xong chương trước để mở" (truyện đi theo thứ tự).
 * Bấm thẳng vào thẻ (đã mở) là vào chương đó — bé tự chọn (luật 25).
 * ----------------------------------------------------------------------------
 */
import { useEffect, type CSSProperties } from 'react'
import type { KidsStoryChapter } from '../../../../content/content-types'
import { KIDS_STORIES, getKidsVoiceLine } from '../../../../content/kids'
import { Button } from '../../../../design-system/components/Button'
import { Icon } from '../../../../design-system/components/Icon'
import { Kbd } from '../../../../design-system/components/Kbd'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { KidsPicture } from '../../game-engine/components/KidsPicture'
import type { useMascotReaction } from '../../game-engine/components/MascotCorner'
import { speakSequence, stopVoice } from '../../game-engine/kids-audio'
import { useGameKeys } from '../../game-engine/use-game-keys'
import { useLanguage } from '../../../../translations/language-context'
import { usePatrolText } from './patrol-text'
import { CHAPTER_BADGE_ART, chapterNumber, isChapterOpen, nextChapter } from './story-plan'

type MascotReact = ReturnType<typeof useMascotReaction>['react']

export interface ChapterMapProps {
  /** số chương đã xong (kids.storyChapter) */
  chaptersDone: number
  onStart: (chapter: KidsStoryChapter) => void
  onReact: MascotReact
}

export function ChapterMap({ chaptersDone, onStart, onReact }: ChapterMapProps) {
  const text = usePatrolText()
  const { language } = useLanguage()
  const recommended = nextChapter(chaptersDone)
  const recommendedIsReplay = chapterNumber(recommended) <= chaptersDone

  // Vào bản đồ: Ki báo "Có nhiệm vụ mới!" (giọng + bong bóng)
  useEffect(() => {
    const line = getKidsVoiceLine('kids-vl-story-start')
    if (!line) return
    const words = fillMascotName(line.vi)
    onReact('wave', words, 3600)
    const timer = window.setTimeout(() => void speakSequence([{ kind: 'line', id: line.id, text: words }]), 400)
    return () => {
      window.clearTimeout(timer)
      stopVoice()
    }
  }, [onReact])

  useGameKeys({ onEnter: () => onStart(recommended) })

  return (
    <main className="pa-map">
      <header className="pa-map__head">
        <h1 className="pa-map__title">{text.mapTitle}</h1>
        <p className="pa-map__hint">{text.mapHint}</p>
      </header>

      <ol className="pa-map__grid">
        {KIDS_STORIES.map((chapter, index) => {
          const number = index + 1
          const done = number <= chaptersDone
          const open = isChapterOpen(chapter, chaptersDone)
          const isNext = chapter === recommended && !recommendedIsReplay
          const titleMain = language === 'en' ? chapter.title.en : chapter.title.vi
          const titleSub = language === 'en' ? chapter.title.vi : chapter.title.en
          return (
            <li key={chapter.id} style={{ '--i': index } as CSSProperties}>
              <button
                type="button"
                className={['pa-chapter', done && 'is-done', isNext && 'is-next', !open && 'is-locked'].filter(Boolean).join(' ')}
                onClick={() => open && onStart(chapter)}
                disabled={!open}
                aria-label={`${text.chapterLabel(number)}: ${titleMain}`}
              >
                <span className="pa-chapter__cover">
                  <KidsPicture slug={chapter.scenes[0].image} word={titleMain} size={96} decorative />
                  {done && (
                    <span className="pa-chapter__badge" title={text.chapterDone}>
                      <KidsPicture slug={CHAPTER_BADGE_ART[chapter.id] ?? 'sports-medal'} word="badge" size={34} decorative />
                    </span>
                  )}
                  {!open && (
                    <span className="pa-chapter__lock">
                      <Icon name="lock" size={22} />
                    </span>
                  )}
                </span>
                <span className="pa-chapter__body">
                  <span className="pa-chapter__number">{text.chapterLabel(number)}</span>
                  <span className="pa-chapter__title">{fillMascotName(titleMain)}</span>
                  <span className="pa-chapter__sub">{fillMascotName(titleSub)}</span>
                  <span className="pa-chapter__status">{done ? text.chapterDone : isNext ? text.chapterNext : !open ? text.chapterLocked : ''}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="pa-map__actions">
        <Button size="xl" className="pa-start-btn" onClick={() => onStart(recommended)} iconRight={<Kbd onColor>Enter</Kbd>}>
          {(recommendedIsReplay ? text.replayChapter : text.startChapter)(language === 'en' ? recommended.title.en : recommended.title.vi)}
        </Button>
      </div>
    </main>
  )
}
