/**
 * GameRoundShell.tsx — "VỎ" CHUNG CỦA MỌI TRÒ CHƠI
 * ----------------------------------------------------------------------------
 * Mỗi trò chỉ cần viết phần câu hỏi, còn vỏ lo cả vòng đời 1 lượt:
 *
 *   xếp lượt (round-builder) -> [thẻ giới thiệu từ mới] -> câu hỏi (trò tự vẽ) -> …
 *   -> hết câu: màn sticker (nếu có từ vừa thuộc) -> màn trang phục (nếu đủ bộ)
 *   -> "Túi đồ từ vựng" -> (đã chơi ≥ 30 phút) màn nhắc nghỉ mắt
 *   -> "Chơi thêm 1 lượt" (xếp lượt mới) | "Xong hôm nay" (về sảnh)
 *
 * Cách dùng (xem games/listen-tap/ListenTapGame.tsx):
 *   <GameRoundShell gameId="listen-tap" renderGame={(props) => <ListenTapBoard {...props} />} />
 * Trò nhận `session` (useRoundSession) + `onExit`. Khi session.current = null thì trò không vẽ gì.
 * Phím Esc = thoát về sảnh (mọi câu đã tự lưu).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { KidsWord } from '../../../content/content-types'
import { todayString } from '../../../learning-progress/study-calendar'
import { useKidsData } from '../kids-data/kids-data-context'
import { outfitIdForStore } from '../kids-data/kids-rewards'
import { currentDifficulty } from './adaptive-difficulty'
import { NewWordIntro } from './components/NewWordIntro'
import { OutfitUnlock, RestReminder, StickerAward } from './components/RewardScreens'
import { RoundResult } from './components/RoundResult'
import { SkyWorld } from './components/SkyWorld'
import type { KidsGameId, RoundPlan } from './engine-types'
import { getDailyGoal, logRoundForToday, newWordsLeftToday, todayTotals } from './kids-day-log'
import { stopVoice } from './kids-audio'
import { usePlayTime } from './play-time'
import { buildRound } from './round-builder'
import { useRoundSession, type RoundSession } from './use-round-session'

/** Thứ mà mỗi trò nhận được từ vỏ. */
export interface KidsGameProps {
  session: RoundSession
  /** về sảnh (đã tự lưu) */
  onExit: () => void
}

export interface GameRoundShellProps {
  gameId: KidsGameId
  /** chủ đề bé chọn ở sảnh (bỏ trống = chủ đề đang học) */
  topicId?: string
  /** trò cần ảnh 3D cho mỗi từ (chọn hình) — mặc định true */
  needsPicture?: boolean
  /** lọc thêm từ hợp với trò (khai trong game-definition.ts) */
  wordFilter?: (word: KidsWord) => boolean
  renderGame: (props: KidsGameProps) => ReactNode
}

export function GameRoundShell({ gameId, topicId, needsPicture = true, wordFilter, renderGame }: GameRoundShellProps) {
  const kidsData = useKidsData()
  const navigate = useNavigate()

  const makePlan = (): RoundPlan =>
    buildRound({
      gameId,
      kids: kidsData.kids,
      today: todayString(),
      difficulty: currentDifficulty(gameId),
      topicId,
      needsPicture,
      wordFilter,
      newWordsLeftToday: newWordsLeftToday(),
    })

  // key đổi = lượt mới hoàn toàn (mọi trạng thái bên trong RoundRunner làm lại từ đầu)
  const [round, setRound] = useState(() => ({ key: 0, plan: makePlan() }))
  const playAgain = () => setRound((current) => ({ key: current.key + 1, plan: makePlan() }))
  const exit = () => {
    stopVoice()
    navigate(kidsData.basePath)
  }

  return (
    <SkyWorld className="kz-game-world">
      <RoundRunner key={round.key} plan={round.plan} renderGame={renderGame} onPlayAgain={playAgain} onExit={exit} />
    </SkyWorld>
  )
}

/* ---------------------------------------------------------------------------
 * 1 lượt chơi: câu hỏi -> phần thưởng -> kết quả -> (nhắc nghỉ)
 * ------------------------------------------------------------------------- */

interface RoundRunnerProps {
  plan: RoundPlan
  renderGame: (props: KidsGameProps) => ReactNode
  onPlayAgain: () => void
  onExit: () => void
}

function RoundRunner({ plan, renderGame, onPlayAgain, onExit }: RoundRunnerProps) {
  const session = useRoundSession(plan)
  const kidsData = useKidsData()
  const playTime = usePlayTime()
  const summary = session.summary

  // Bước phần thưởng: 0..(số sticker + số trang phục) — hết thì sang túi đồ
  const [rewardStep, setRewardStep] = useState(0)
  const [showRest, setShowRest] = useState(false)

  // Esc = thoát (chỉ khi đang chơi; màn kết quả có nút riêng)
  useEffect(() => {
    if (summary) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onExit()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [summary, onExit])

  // Lượt vừa xong: ghi sổ hôm nay (1 lần)
  useEffect(() => {
    if (!summary) return
    logRoundForToday({
      newWordCount: plan.newWordIds.length,
      wordIds: summary.words.map((w) => w.word.id),
      stickerCount: summary.newStickers.length,
    })
  }, [summary, plan.newWordIds.length])

  const rewardCount = summary ? summary.newStickers.length + summary.newOutfits.length : 0
  const showingResult = !!summary && rewardStep >= rewardCount

  // Tới màn túi đồ: nếu hôm nay đã chơi ≥ 30 phút -> hiện màn nhắc nghỉ sau 1,4 giây
  // (để bé kịp nhìn túi đồ của mình trước)
  // (playTime để trong ref: chỉ muốn kiểm tra 1 lần khi vừa tới màn túi đồ, không phải mỗi lần đồng hồ nhích)
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

  if (!summary) {
    return (
      <>
        {renderGame({ session, onExit })}
        {session.stage === 'intro' && session.current && <NewWordIntro key={session.current.key} word={session.current.word} onDone={session.finishIntro} />}
      </>
    )
  }

  // Phần thưởng lần lượt: sticker trước, rồi trang phục
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

  const today = todayString()
  const totals = todayTotals()
  return (
    <>
      <RoundResult summary={summary} roundsToday={kidsData.kids.roundsByDay[today] ?? 1} goal={getDailyGoal()} onPlayAgain={onPlayAgain} onDone={onExit} />
      {showRest && <RestReminder wordsToday={totals.words} stickersToday={totals.stickers} onRest={onExit} onOneMore={onPlayAgain} />}
    </>
  )
}
