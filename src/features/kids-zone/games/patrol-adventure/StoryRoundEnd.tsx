/**
 * StoryRoundEnd.tsx — PHẦN CUỐI LƯỢT CỦA TRÒ TRUYỆN: sticker -> trang phục -> "Túi đồ từ vựng" -> (nhắc nghỉ)
 * ----------------------------------------------------------------------------
 * VÌ SAO CÓ FILE NÀY: vỏ chung GameRoundShell tự xếp lượt bằng round-builder (theo TỪ), không cho trò
 * truyền kế hoạch riêng. Trò truyện cần lượt = 1 chương nên tự chạy useRoundSession(kế hoạch chương)
 * (xem PatrolAdventureGame.tsx) -> vỏ chung không biết lượt đã xong -> trò phải tự vẽ phần cuối lượt.
 * File này làm ĐÚNG như phần cuối của RoundRunner trong GameRoundShell.tsx, dùng lại nguyên các
 * component của động cơ (StickerAward, OutfitUnlock, RoundResult, RestReminder) + sổ hôm nay + đồng hồ chơi.
 * Khi động cơ cho trò tự xếp lượt (đã đề xuất trong REQUESTS.md) thì xoá file này.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { todayString } from '../../../../learning-progress/study-calendar'
import { OutfitUnlock, RestReminder, StickerAward } from '../../game-engine/components/RewardScreens'
import { RoundResult } from '../../game-engine/components/RoundResult'
import type { RoundPlan, RoundSummary } from '../../game-engine/engine-types'
import { getDailyGoal, logRoundForToday, todayTotals } from '../../game-engine/kids-day-log'
import { usePlayTime } from '../../game-engine/play-time'
import { useKidsData } from '../../kids-data/kids-data-context'
import { outfitIdForStore } from '../../kids-data/kids-rewards'

export interface StoryRoundEndProps {
  summary: RoundSummary
  plan: RoundPlan
  onPlayAgain: () => void
  onExit: () => void
}

export function StoryRoundEnd({ summary, plan, onPlayAgain, onExit }: StoryRoundEndProps) {
  const kidsData = useKidsData()
  const playTime = usePlayTime()
  const [rewardStep, setRewardStep] = useState(0)
  const [showRest, setShowRest] = useState(false)

  // Lượt vừa xong: ghi sổ hôm nay (1 lần) — giống RoundRunner
  useEffect(() => {
    logRoundForToday({ newWordCount: plan.newWordIds.length, wordIds: summary.words.map((w) => w.word.id), stickerCount: summary.newStickers.length })
  }, [summary, plan.newWordIds.length])

  const rewardCount = summary.newStickers.length + summary.newOutfits.length
  const showingResult = rewardStep >= rewardCount

  // Tới túi đồ: đã chơi ≥ 30 phút hôm nay -> nhắc nghỉ sau 1,4 giây (playTime trong ref: chỉ kiểm 1 lần)
  const playTimeRef = useRef(playTime)
  playTimeRef.current = playTime
  useEffect(() => {
    if (!showingResult || !playTimeRef.current.shouldRemindRest()) return
    const timer = window.setTimeout(() => {
      playTimeRef.current.markRestReminded()
      setShowRest(true)
    }, 1400)
    return () => window.clearTimeout(timer)
  }, [showingResult])

  if (rewardStep < summary.newStickers.length) {
    const word = summary.newStickers[rewardStep]
    return <StickerAward key={word.id} word={word} onDone={() => setRewardStep((s) => s + 1)} />
  }
  if (rewardStep < rewardCount) {
    const outfit = summary.newOutfits[rewardStep - summary.newStickers.length]
    return (
      <OutfitUnlock
        key={outfit.id}
        outfit={outfit}
        onTryOn={() => {
          kidsData.equipOutfit(outfitIdForStore(outfit.id))
          setRewardStep((s) => s + 1)
        }}
        onLater={() => setRewardStep((s) => s + 1)}
      />
    )
  }

  const totals = todayTotals()
  return (
    <>
      <RoundResult
        summary={summary}
        roundsToday={kidsData.kids.roundsByDay[todayString()] ?? 1}
        goal={getDailyGoal()}
        onPlayAgain={onPlayAgain}
        onDone={onExit}
      />
      {showRest && <RestReminder wordsToday={totals.words} stickersToday={totals.stickers} onRest={onExit} onOneMore={onPlayAgain} />}
    </>
  )
}
