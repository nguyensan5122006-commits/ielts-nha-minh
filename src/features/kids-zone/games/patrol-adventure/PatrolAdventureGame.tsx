/**
 * PatrolAdventureGame.tsx — TRÒ 8 "PHIÊU LƯU CÙNG KI" (patrol-adventure; đặc tả 07 gọi là patrol-story)
 * ----------------------------------------------------------------------------
 * Truyện tranh "Tuần tra cùng Ki": 6 chương × 5 cảnh (content/kids/kids-stories.ts).
 * Mỗi cảnh: khung truyện + lời kể có giọng (luôn Bỏ qua được) + 1 câu hỏi để đi tiếp.
 * Hết chương: màn huy hiệu chương -> sticker (nếu có từ vừa thuộc) -> "Túi đồ từ vựng".
 *
 * TRÒ TRUYỆN DÙNG ĐỘNG CƠ CHUNG THẾ NÀO (vì truyện không hợp hẳn mô hình "lượt = 8–12 từ"):
 *   - Vỏ GameRoundShell vẫn bọc trò (nền trời, phím Esc, nút thoát) và vẫn tự xếp 1 lượt theo từ
 *     — trò KHÔNG dùng lượt đó (chỉ tắt thẻ giới thiệu từ mới của nó, xem useLayoutEffect bên dưới).
 *   - Trò tự xếp lượt = 1 chương (story-plan.ts: 1 cảnh = 1 câu, từ của câu = question.wordId)
 *     rồi chạy CHÍNH "trọng tài" chung useRoundSession(kế hoạch chương) -> Leitner, sao, chuỗi đúng,
 *     lời khen, kỷ lục, sticker, độ khó… đều do động cơ lo, không viết lại.
 *   - Thang gợi ý dùng hint-ladder.ts; Ki dùng KidsMascot + useMascotReaction (Ki đứng TRONG khung truyện
 *     vì Ki là nhân vật chính); thanh trên dùng GameTopBar; phần cuối lượt dùng lại RoundResult,
 *     StickerAward… qua StoryRoundEnd.tsx (bản sao phần cuối RoundRunner).
 *   - Đã đề xuất trong REQUESTS.md: cho game-definition khai `buildPlan` riêng -> vỏ chung chạy luôn
 *     kế hoạch chương, bỏ được StoryRoundEnd.tsx và đoạn tắt thẻ giới thiệu.
 *
 * Tiến độ truyện: kids.storyChapter (kho tiến độ) = số chương đã xong; lưu bằng kidsSetStoryChapter.
 * Ở /kids-preview (dữ liệu giả) chỉ nhớ trong bộ nhớ, không ghi vào tiến độ thật.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useLayoutEffect, useState } from 'react'
import type { KidsStoryChapter } from '../../../../content/content-types'
import { Icon } from '../../../../design-system/components/Icon'
import { useProgress } from '../../../../learning-progress/progress-store'
import { todayString } from '../../../../learning-progress/study-calendar'
import { currentDifficulty } from '../../game-engine/adaptive-difficulty'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import { useRoundSession } from '../../game-engine/use-round-session'
import { useKidsText } from '../../kids-text'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { ChapterBadge } from './ChapterBadge'
import { ChapterMap } from './ChapterMap'
import { buildStoryPlan, chapterNumber, sceneIndexOfItem } from './story-plan'
import { StoryRoundEnd } from './StoryRoundEnd'
import { StoryScene } from './StoryScene'
import './patrol-adventure.css'

/** Chỉ dùng ở /kids-preview: số chương đã xong (dữ liệu giả, mất khi tải lại trang). */
let previewChaptersDone: number | null = null

/** Đọc + lưu "số chương đã xong". Bản thật lưu vào kho tiến độ; bản xem thử chỉ nhớ tạm. */
function useChapterProgress() {
  const { kids, isPreview } = useKidsData()
  // useProgress luôn được gọi (đúng luật hook); không có kho (trang lạ) thì bỏ qua việc lưu
  let saveToStore: ((chapter: number) => void) | null = null
  try {
    saveToStore = useProgress().kidsSetStoryChapter
  } catch {
    saveToStore = null
  }
  const [previewDone, setPreviewDone] = useState(() => previewChaptersDone ?? kids.storyChapter)
  const chaptersDone = isPreview ? previewDone : kids.storyChapter

  const markChapterDone = (number: number) => {
    if (isPreview) {
      const next = Math.max(previewDone, number)
      previewChaptersDone = next
      setPreviewDone(next)
    } else if (number > kids.storyChapter) saveToStore?.(number)
  }
  return { chaptersDone, markChapterDone }
}

export function PatrolAdventureGame({ session: shellSession, onExit }: KidsGameProps) {
  const { kids } = useKidsData()
  const mascot = useMascotReaction('wave')
  const { chaptersDone, markChapterDone } = useChapterProgress()
  const [screen, setScreen] = useState<{ chapter: KidsStoryChapter; key: number } | null>(null)
  const exitLabel = useKidsText().exitGame

  // Lượt "theo từ" của vỏ chung không dùng tới: nếu câu đầu của nó là từ mới, vỏ sẽ phủ thẻ giới thiệu
  // từ mới lên truyện -> đánh dấu "đã giới thiệu" ngay trước khi trình duyệt vẽ để thẻ đó không hiện.
  useLayoutEffect(() => {
    if (shellSession.stage === 'intro') shellSession.finishIntro()
  }, [shellSession])

  const backToMap = useCallback(() => setScreen(null), [])

  if (!screen) {
    return (
      <div className="kz-game-screen pa-screen">
        <header className="pa-map-bar">
          <button type="button" className="kz-round-btn" onClick={onExit} aria-label={exitLabel} title={exitLabel}>
            <Icon name="close" size={26} />
          </button>
        </header>
        <ChapterMap
          chaptersDone={chaptersDone}
          onReact={mascot.react}
          onStart={(chapter) => setScreen((current) => ({ chapter, key: (current?.key ?? 0) + 1 }))}
        />
        <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
      </div>
    )
  }
  return (
    <StoryChapterRound
      key={screen.key}
      chapter={screen.chapter}
      onChapterDone={() => markChapterDone(chapterNumber(screen.chapter))}
      onPlayAgain={backToMap}
      onExit={onExit}
    />
  )
}

/* ============================ 1 lượt = 1 chương ============================ */

interface StoryChapterRoundProps {
  chapter: KidsStoryChapter
  onChapterDone: () => void
  onPlayAgain: () => void
  onExit: () => void
}

function StoryChapterRound({ chapter, onChapterDone, onPlayAgain, onExit }: StoryChapterRoundProps) {
  const { kids } = useKidsData()
  const outfitId = equippedOutfitId(kids)
  const mascot = useMascotReaction('wave')
  // Kế hoạch chương: tính 1 lần khi vào chương
  const [plan] = useState(() => buildStoryPlan(chapter, kids, todayString(), currentDifficulty('patrol-adventure')))
  const session = useRoundSession(plan)
  const [badgeShown, setBadgeShown] = useState(false)

  if (session.summary) return <StoryRoundEnd summary={session.summary} plan={plan} onPlayAgain={onPlayAgain} onExit={onExit} />

  if (badgeShown) {
    return (
      <div className="kz-game-screen pa-screen">
        <ChapterBadge chapter={chapter} outfitId={outfitId} onDone={() => session.advance()} />
      </div>
    )
  }

  const item = session.current
  return (
    <div className="kz-game-screen pa-screen">
      <GameTopBar doneCount={session.doneCount} totalCount={session.totalCount} firstTryStreak={session.firstTryStreak} onExit={onExit} />
      {item && (
        <StoryScene
          key={item.key}
          chapter={chapter}
          scene={chapter.scenes[sceneIndexOfItem(item)]}
          sceneIndex={sceneIndexOfItem(item)}
          item={item}
          session={session}
          isRecap={item.key.endsWith('-again')}
          showTranslationByDefault={plan.difficulty.level === 1}
          reaction={mascot.reaction}
          onReact={mascot.react}
          outfitId={outfitId}
          onChapterComplete={() => {
            onChapterDone()
            setBadgeShown(true)
          }}
        />
      )}
    </div>
  )
}
