/**
 * MemoryMatchGame.tsx — TRÒ 2 "LẬT THẺ GHÉP CẶP" (memory-match)
 * ----------------------------------------------------------------------------
 * Lật thẻ tìm cặp: ẢNH ↔ CHỮ (mức 1–2) hoặc thẻ LOA ↔ CHỮ (mức 3). Ghép đúng thì thẻ bay vào túi.
 * Cách chơi trên 1 bàn nằm ở MemoryBoardView.tsx; cách gom câu thành bàn ở memory-board-plan.ts.
 *
 * File này là "người phiên dịch" giữa bàn lật thẻ và ĐỘNG CƠ DÙNG CHUNG (useRoundSession):
 * động cơ nghĩ theo hàng câu "1 câu = 1 từ, làm lần lượt", còn bàn lật thẻ cho bé ghép các cặp
 * theo THỨ TỰ TUỲ Ý. Nên trò:
 *   1. Gom vài câu liền nhau thành 1 bàn (bắt đầu từ câu hiện tại của động cơ).
 *   2. Từ mới trong bàn: động cơ tự hiện thẻ giới thiệu cho câu đầu; các từ mới còn lại trò tự hiện
 *      thẻ giới thiệu (NewWordIntro của động cơ) TRƯỚC khi chia bài -> bé luôn gặp từ mới trước khi chơi.
 *   3. Bé ghép xong 1 cặp -> ghi kết quả của câu đó. Kết quả được "nộp" cho động cơ ĐÚNG THỨ TỰ hàng câu:
 *      câu đầu bàn đã có kết quả thì nộp (completeItem + advance), rồi tới câu sau…; câu nào chưa ghép
 *      thì dừng chờ. Nhờ vậy Leitner / sticker / lời khen của động cơ chạy y như các trò khác,
 *      và bé thoát giữa bàn thì các cặp đã nộp vẫn được lưu.
 *   4. Câu cuối của bàn: nộp kết quả ngay nhưng chỉ "advance" sau màn ăn mừng xong bàn
 *      (advance ở câu cuối lượt = hết lượt -> vỏ chuyển sang màn sticker / túi đồ ngay).
 *   Bé phải xem đáp án (gợi ý bậc 3) -> động cơ nối câu đó vào cuối hàng; trò nối y hệt vào bản sao
 *   hàng câu của mình để bàn sau có câu đó.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { getKidsVoiceLine } from '../../../../content/kids'
import { fillMascotName } from '../../../../design-system/mascot-name'
import { GameTopBar } from '../../game-engine/components/GameTopBar'
import { preloadWordImages } from '../../game-engine/components/KidsPicture'
import { MascotCorner, useMascotReaction } from '../../game-engine/components/MascotCorner'
import { NewWordIntro } from '../../game-engine/components/NewWordIntro'
import type { KidsGameProps } from '../../game-engine/GameRoundShell'
import { preloadWordAudio, speakSequence } from '../../game-engine/kids-audio'
import type { RoundItem } from '../../game-engine/engine-types'
import type { CompleteItemInput, ItemFeedback } from '../../game-engine/use-round-session'
import { useKidsData } from '../../kids-data/kids-data-context'
import { equippedOutfitId } from '../../kids-data/kids-rewards'
import { useKidsText } from '../../kids-text'
import { MemoryBoardView } from './MemoryBoardView'
import { planBoard, type MemoryBoard, type MemoryPair } from './memory-board-plan'
import './memory-match.css'

const voiceLine = (id: string) => fillMascotName(getKidsVoiceLine(id)?.vi ?? '')

export function MemoryMatchGame({ session, onExit }: KidsGameProps) {
  const kidsText = useKidsText()
  const { kids } = useKidsData()
  const mascot = useMascotReaction('thinking')
  const level = session.plan.difficulty.level

  /** Bản sao hàng câu của động cơ (câu phải xem đáp án được nối vào cuối giống hệt động cơ) */
  const queue = useRef<RoundItem[]>([...session.plan.items])
  const [board, setBoard] = useState<MemoryBoard | null>(null)
  const [boardNumber, setBoardNumber] = useState(0)
  /** các từ mới trong bàn cần thẻ giới thiệu trước khi chia bài */
  const [introItems, setIntroItems] = useState<RoundItem[]>([])
  /** số cặp THẬT đã ghép trên bàn hiện tại (để thanh tiến độ chạy mượt theo từng cặp) */
  const [matchedRealCount, setMatchedRealCount] = useState(0)

  // Nộp kết quả cho động cơ theo đúng thứ tự (xem đầu file)
  const outcomes = useRef(new Map<number, CompleteItemInput>())
  const nextToSubmit = useRef(0)
  const finalAdvancePending = useRef(false)
  const instructionSaid = useRef(false)

  // Tải trước ảnh + tiếng của cả lượt (gồm cả kho cặp đệm)
  useEffect(() => {
    preloadWordImages([...session.plan.items.map((item) => item.word.image), ...session.plan.distractorPool.map((word) => word.image), 'paw-prints', 'backpack'].filter(Boolean))
    preloadWordAudio(session.plan.items.map((item) => item.word))
  }, [session.plan])

  // Động cơ đang ở 1 câu hỏi mà chưa có bàn -> xếp bàn mới bắt đầu từ câu đó
  const { stage, current, doneCount, recentWordIds } = session
  useEffect(() => {
    if (board || stage !== 'question' || !current) return
    const next = planBoard({ queue: queue.current, startIndex: doneCount, level, fillerPool: session.plan.distractorPool, recentWordIds })
    outcomes.current.clear()
    nextToSubmit.current = doneCount
    finalAdvancePending.current = false
    // câu đầu bàn đã được vỏ giới thiệu; các từ mới còn lại trò tự giới thiệu
    setIntroItems(queue.current.slice(doneCount + 1, doneCount + next.itemCount).filter((item) => item.showIntro))
    setMatchedRealCount(0)
    setBoard(next)
    setBoardNumber((n) => n + 1)
  }, [board, stage, current, doneCount, level, recentWordIds, session.plan.distractorPool])

  // Bàn đầu tiên hiện ra (sau thẻ giới thiệu) -> Ki đọc hướng dẫn 1 lần mỗi lượt
  const { react } = mascot
  const boardVisible = !!board && introItems.length === 0
  useEffect(() => {
    if (!boardVisible || instructionSaid.current || !board) return
    instructionSaid.current = true
    const id = board.mode === 'picture' ? 'kids-vl-instr-memory-picture' : 'kids-vl-instr-memory-sound'
    react('thinking', voiceLine(id), 3600)
    void speakSequence([{ kind: 'line', id, text: voiceLine(id) }])
  }, [boardVisible, board, react])

  /** 1 cặp thật vừa ghép xong -> ghi kết quả, nộp cho động cơ những câu đã đủ điều kiện */
  const onPairMatched = (pair: MemoryPair, outcome: CompleteItemInput): ItemFeedback | null => {
    if (!board || pair.queueIndex === null) return null
    outcomes.current.set(pair.queueIndex, outcome)
    setMatchedRealCount((n) => n + 1)

    const end = board.startIndex + board.itemCount
    let firstFeedback: ItemFeedback | null = null
    while (nextToSubmit.current < end && outcomes.current.has(nextToSubmit.current)) {
      const index = nextToSubmit.current
      const input = outcomes.current.get(index)!
      const feedback = session.completeItem(input)
      // động cơ nối câu "phải xem đáp án" vào cuối hàng -> nối y hệt vào bản sao
      if (input.revealed) {
        const item = queue.current[index]
        queue.current.push({ ...item, key: `${item.key}-again`, kind: item.kind === 'practice' ? 'practice' : 'repeat', showIntro: false })
      }
      if (!firstFeedback || (!firstFeedback.praise && feedback.praise)) firstFeedback = feedback
      nextToSubmit.current = index + 1
      if (index + 1 < end) {
        session.advance()
        // từ mới ở câu kế tiếp đã được trò giới thiệu trước khi chia bài -> báo động cơ khỏi hiện lại
        if (queue.current[index + 1].showIntro) session.finishIntro()
      } else {
        finalAdvancePending.current = true // câu cuối bàn: advance sau màn ăn mừng
      }
    }
    // cặp vừa ghép có thể chưa được nộp (đang chờ câu trước) -> vẫn báo "quay lại cuối lượt" đúng cho cặp này
    return firstFeedback ?? { praise: null, firstTryStreak: session.firstTryStreak, comesBack: outcome.revealed }
  }

  const onBoardDone = () => {
    setBoard(null)
    if (finalAdvancePending.current) {
      finalAdvancePending.current = false
      session.advance()
    }
  }

  // Thanh tiến độ: tính theo từng cặp thật đã ghép trên bàn (mượt hơn đợi nộp theo thứ tự)
  const shownDone = board ? board.startIndex + matchedRealCount : session.doneCount
  const intro = introItems[0]

  return (
    <div className="kz-game-screen mm-screen">
      <GameTopBar doneCount={shownDone} totalCount={session.totalCount} firstTryStreak={session.firstTryStreak} onExit={onExit} />
      <main className="kz-game-stage mm-stage">
        {board && !intro && (
          <MemoryBoardView
            key={boardNumber}
            board={board}
            onPairMatched={onPairMatched}
            onBoardDone={onBoardDone}
            onReact={mascot.react}
            correctBubbles={kidsText.correctBubbles}
          />
        )}
      </main>
      {intro && <NewWordIntro key={intro.key} word={intro.word} onDone={() => setIntroItems((items) => items.slice(1))} />}
      <MascotCorner reaction={mascot.reaction} outfitId={equippedOutfitId(kids)} />
    </div>
  )
}
