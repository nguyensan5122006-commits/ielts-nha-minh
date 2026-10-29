/**
 * use-round-session.ts
 * ----------------------------------------------------------------------------
 * "TRỌNG TÀI" CỦA 1 LƯỢT CHƠI — hook dùng chung cho mọi trò.
 *
 * Trò chơi chỉ lo vẽ câu hỏi + hiệu ứng; còn lại hook này lo:
 *   - câu hiện tại, câu nào cần thẻ giới thiệu từ mới trước (stage 'intro')
 *   - bé phải xem đáp án -> câu quay lại CUỐI LƯỢT
 *   - ghi hộp Leitner ĐÚNG 1 LẦN cho mỗi từ / lượt, ở lần xuất hiện CUỐI CÙNG của từ,
 *     với kết quả "tệ nhất" trong lượt (sai > đúng nhờ gợi ý > đúng ngay)
 *     -> từ mới gặp 2 lần trong lượt không bị "nhảy 2 hộp" trong 1 ngày
 *   - trao sticker ngay khi 1 từ vừa "thuộc", mở trang phục khi đủ bộ (lưu ngay, bé thoát giữa chừng vẫn còn)
 *   - đếm sao (đúng ngay lần đầu), chuỗi đúng liền, nhịp khen (≤ 1 lần / 4 câu đúng)
 *   - cuối lượt: ghi kỷ lục + số lượt + tem tuần, cập nhật độ khó, tạo RoundSummary
 *
 * Cách dùng trong 1 trò (xem games/listen-tap/ListenTapGame.tsx):
 *   const session = useRoundSession(plan)
 *   session.current            // câu đang chơi (RoundItem)
 *   const feedback = session.completeItem({ wrongCount, revealed, responseMs })
 *   ...chạy hiệu ứng đúng...
 *   session.advance()          // sang câu sau (hết câu -> session.summary có giá trị)
 * ----------------------------------------------------------------------------
 */
import { useCallback, useRef, useState } from 'react'
import type { KidsWord } from '../../../content/content-types'
import type { KidsOutfit } from '../../../content/kids'
import { useKidsData, type KidsWordAnswerResult } from '../kids-data/kids-data-context'
import { outfitEarnedByWord, stickerIdForWord } from '../kids-data/kids-rewards'
import { recordRoundAccuracy } from './adaptive-difficulty'
import type { ItemOutcome, RoundItem, RoundPlan, RoundSummary, RoundWordResult } from './engine-types'
import { isPraiseTurn, pickPraise, type PraiseLine } from './praise-picker'

type FinalResult = 'right' | 'right-with-hint' | 'wrong'
const SEVERITY: Record<FinalResult, number> = { right: 0, 'right-with-hint': 1, wrong: 2 }

/** Những gì 1 trò báo khi bé làm xong 1 câu. */
export interface CompleteItemInput extends ItemOutcome {
  /** bé đã bấm nghe lại / nghe chậm trước khi chọn đúng */
  usedReplay?: boolean
  /** đang bật "ẩn chữ" */
  textHidden?: boolean
}

/** Động cơ trả lại cho trò: có khen không, chuỗi đúng liền, câu có quay lại không. */
export interface ItemFeedback {
  praise: PraiseLine | null
  firstTryStreak: number
  comesBack: boolean
}

export interface RoundSession {
  plan: RoundPlan
  current: RoundItem | null
  /** 'intro' = đang hiện thẻ giới thiệu từ mới · 'question' = đang hỏi · 'done' = hết lượt */
  stage: 'intro' | 'question' | 'done'
  /** số câu đã xong / tổng số câu (tổng tăng khi có câu quay lại cuối lượt) */
  doneCount: number
  totalCount: number
  firstTryStreak: number
  /** id các từ đã chơi trong lượt (cũ -> mới) — dùng chọn đáp án nhiễu */
  recentWordIds: string[]
  finishIntro: () => void
  completeItem: (input: CompleteItemInput) => ItemFeedback
  advance: () => void
  summary: RoundSummary | null
}

interface WordTally {
  worst: FinalResult | null
  allFirstTry: boolean
  answer: KidsWordAnswerResult | null
}

export function useRoundSession(plan: RoundPlan): RoundSession {
  const kidsData = useKidsData()
  // Luôn đọc bản dữ liệu mới nhất trong các hàm xử lý sự kiện
  const kidsDataRef = useRef(kidsData)
  kidsDataRef.current = kidsData

  // Ảnh chụp lúc bắt đầu lượt: hộp Leitner "trước", kỷ lục cũ
  const [start] = useState(() => ({ kids: kidsData.kids, at: Date.now() }))
  // Từ nào được phép đổi hộp Leitner trong lượt này (câu "luyện thêm" thì không)
  const [leitnerWordIds] = useState(() => new Set(plan.items.filter((i) => i.kind === 'new' || i.kind === 'review').map((i) => i.word.id)))

  const queue = useRef<RoundItem[]>([...plan.items])
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const [queueLength, setQueueLength] = useState(plan.items.length)
  const [introduced, setIntroduced] = useState<string[]>([])
  const [firstTryStreak, setFirstTryStreak] = useState(0)
  const [summary, setSummary] = useState<RoundSummary | null>(null)

  const tallies = useRef(new Map<string, WordTally>())
  const stats = useRef({ stars: 0, answered: 0, correct: 0, streak: 0 })
  const recentWordIds = useRef<string[]>([])
  const newStickers = useRef<KidsWord[]>([])
  const newOutfits = useRef<KidsOutfit[]>([])

  const current = summary ? null : (queue.current[index] ?? null)
  const stage: RoundSession['stage'] = !current ? 'done' : current.showIntro && !introduced.includes(current.word.id) ? 'intro' : 'question'

  const finishIntro = useCallback(() => {
    const item = queue.current[indexRef.current]
    if (item) setIntroduced((ids) => (ids.includes(item.word.id) ? ids : [...ids, item.word.id]))
  }, [])

  /** Ghi hộp Leitner cho 1 từ + trao sticker / trang phục nếu vừa thuộc. */
  const recordWord = (word: KidsWord, tally: WordTally) => {
    const data = kidsDataRef.current
    const result = tally.worst ?? 'right'
    tally.answer = data.answerWord(word.id, result !== 'wrong', result === 'right-with-hint')
    if (!tally.answer.justMastered) return

    data.awardSticker(stickerIdForWord(word.id))
    newStickers.current.push(word)
    // Tính "sau khi nhận sticker" bằng tay (dữ liệu trong context chưa kịp cập nhật)
    const kidsAfter = {
      ...data.kids,
      stickers: [...new Set([...data.kids.stickers, ...newStickers.current.map((w) => stickerIdForWord(w.id))])],
      outfits: [...new Set([...data.kids.outfits, ...newOutfits.current.map((o) => o.id)])],
    }
    const outfit = outfitEarnedByWord(kidsAfter, word.id)
    if (outfit) {
      data.unlockOutfit(outfit.id)
      newOutfits.current.push(outfit)
    }
  }

  const completeItem = useCallback(
    (input: CompleteItemInput): ItemFeedback => {
      const item = queue.current[indexRef.current]
      if (!item) return { praise: null, firstTryStreak: 0, comesBack: false }
      const word = item.word
      const result: FinalResult = input.revealed ? 'wrong' : input.wrongCount > 0 ? 'right-with-hint' : 'right'

      // 1. Cộng dồn kết quả của từ trong lượt (giữ kết quả tệ nhất)
      const tally = tallies.current.get(word.id) ?? { worst: null, allFirstTry: true, answer: null }
      if (!tally.worst || SEVERITY[result] > SEVERITY[tally.worst]) tally.worst = result
      tally.allFirstTry &&= input.wrongCount === 0
      tallies.current.set(word.id, tally)

      // 2. Sao, chuỗi đúng liền
      const s = stats.current
      s.answered += 1
      if (input.wrongCount === 0) {
        s.stars += 1
        s.streak += 1
      } else s.streak = 0
      if (!input.revealed) s.correct += 1
      setFirstTryStreak(s.streak)
      recentWordIds.current = [...recentWordIds.current.filter((id) => id !== word.id), word.id]

      // 3. Phải xem đáp án -> câu quay lại cuối lượt
      if (input.revealed) {
        queue.current.push({ ...item, key: `${item.key}-again`, kind: item.kind === 'practice' ? 'practice' : 'repeat', showIntro: false })
        setQueueLength(queue.current.length)
      }

      // 4. Lần xuất hiện cuối của từ trong lượt -> ghi hộp Leitner
      const appearsLater = queue.current.slice(indexRef.current + 1).some((later) => later.word.id === word.id)
      if (!appearsLater && leitnerWordIds.has(word.id) && !tally.answer) recordWord(word, tally)

      // 5. Khen bằng lời: chỉ ở câu đúng thứ 4, 8, 12…
      const before = start.kids.words[word.id]
      const praise =
        !input.revealed && isPraiseTurn(s.correct)
          ? pickPraise({
              gameId: plan.gameId,
              word,
              wrongCount: input.wrongCount,
              revealed: input.revealed,
              usedReplay: !!input.usedReplay,
              responseMs: input.responseMs,
              textHidden: !!input.textHidden,
              boxBefore: before ? before.box : null,
              itemKind: item.kind,
              missedLastTime: !!before && before.box === 0 && before.wrong > 0,
            })
          : null

      return { praise, firstTryStreak: s.streak, comesBack: input.revealed }
    },
    // [] = tạo hàm 1 lần: mọi thứ hàm cần đều nằm trong ref hoặc cố định suốt lượt (start, plan)
    [],
  )

  const finishRound = () => {
    const data = kidsDataRef.current
    const s = stats.current
    const previousBest = start.kids.bestScores[plan.gameId] ?? 0
    data.recordRoundEnd(plan.gameId, s.stars)
    if (s.answered > 0) recordRoundAccuracy(plan.gameId, s.stars / s.answered)

    // Túi đồ: mỗi từ 1 thẻ, theo thứ tự gặp lần đầu
    const seen = new Set<string>()
    const words: RoundWordResult[] = []
    for (const item of queue.current) {
      if (seen.has(item.word.id)) continue
      seen.add(item.word.id)
      const tally = tallies.current.get(item.word.id)
      words.push({
        word: item.word,
        isNew: plan.newWordIds.includes(item.word.id),
        boxBefore: start.kids.words[item.word.id]?.box ?? null,
        boxAfter: tally?.answer?.after.box ?? null,
        allFirstTry: tally?.allFirstTry ?? false,
        justMastered: !!tally?.answer?.justMastered,
      })
    }
    setSummary({
      gameId: plan.gameId,
      words,
      stars: s.stars,
      totalQuestions: s.answered,
      previousBest,
      isPersonalBest: previousBest > 0 && s.stars > previousBest,
      newStickers: newStickers.current,
      newOutfits: newOutfits.current,
      durationSeconds: Math.round((Date.now() - start.at) / 1000),
    })
  }

  const advance = useCallback(() => {
    const next = indexRef.current + 1
    if (next >= queue.current.length) {
      finishRound()
      return
    }
    indexRef.current = next
    setIndex(next)
  }, [])

  return {
    plan,
    current,
    stage,
    doneCount: summary ? queueLength : index,
    totalCount: queueLength,
    firstTryStreak,
    recentWordIds: recentWordIds.current,
    finishIntro,
    completeItem,
    advance,
    summary,
  }
}
