/**
 * kids-data-context.tsx
 * ----------------------------------------------------------------------------
 * "Ổ CẮM DỮ LIỆU" CỦA KHU TRẺ EM.
 *
 * Mọi trang / trò chơi trong khu trẻ em KHÔNG gọi thẳng kho tiến độ (useProgress),
 * mà gọi useKidsData(). Lý do: có 2 nguồn dữ liệu cắm vào cùng 1 ổ:
 *
 *   1. LiveKidsDataProvider    — dữ liệu THẬT của bé đang đăng nhập (kho tiến độ,
 *                                tự lưu localStorage + máy chủ). Dùng ở /kids.
 *   2. PreviewKidsDataProvider — dữ liệu GIẢ (mock-kid-progress.ts) chỉ nằm trong bộ nhớ.
 *                                Dùng ở trang xem thử /kids-preview khi phát triển
 *                                (không cần đăng nhập, không ghi gì lên máy chủ).
 *
 * Cả 2 đều dùng CÙNG các hàm thuần trong learning-progress/progress-updates.ts,
 * nên trò chơi chạy y hệt nhau ở 2 chế độ.
 * ----------------------------------------------------------------------------
 */
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { useProgress } from '../../../learning-progress/progress-store'
import {
  createEmptyKidsProgress,
  createEmptyProgress,
  type KidsProgress,
  type KidsWordState,
  type LearningProgress,
} from '../../../learning-progress/progress-types'
import * as update from '../../../learning-progress/progress-updates'
import { useAuth } from '../../../services/auth-context'
import { buildMockKidsProgress, type MockScenario } from './mock-kid-progress'

/** Kết quả ghi 1 từ vào hộp Leitner. */
export interface KidsWordAnswerResult {
  /** trạng thái TRƯỚC khi trả lời (undefined = lần đầu gặp) */
  before: KidsWordState | undefined
  after: KidsWordState
  /** từ vừa lên "đã thuộc" ở lần này -> trao sticker */
  justMastered: boolean
}

export interface KidsDataValue {
  /** Tiến độ khu trẻ em (luôn có — bé mới thì là tiến độ trống) */
  kids: KidsProgress
  /** Tên hiển thị của bé, VD "Thảo" */
  kidName: string
  /** Gốc đường dẫn: '/kids' (thật) hoặc '/kids-preview' (xem thử) — link nội bộ phải nối từ đây */
  basePath: string
  isPreview: boolean
  /** Ghi kết quả CUỐI CÙNG của 1 từ trong 1 lượt (đúng / đúng nhờ gợi ý / sai) */
  answerWord: (wordId: string, correct: boolean, usedHint: boolean) => KidsWordAnswerResult
  awardSticker: (stickerId: string) => void
  unlockOutfit: (outfitId: string) => void
  equipOutfit: (outfitId: string) => void
  addPlaySeconds: (seconds: number) => void
  /** Gọi 1 lần cuối mỗi lượt: kỷ lục + đếm lượt hôm nay + tem tuần */
  recordRoundEnd: (gameId: string, score: number) => void
}

const KidsDataContext = createContext<KidsDataValue | null>(null)

export function useKidsData(): KidsDataValue {
  const value = useContext(KidsDataContext)
  if (!value) throw new Error('useKidsData() phải nằm trong LiveKidsDataProvider hoặc PreviewKidsDataProvider')
  return value
}

/* ============================ 1. DỮ LIỆU THẬT ============================ */

export function LiveKidsDataProvider({ children }: { children: ReactNode }) {
  const store = useProgress()
  const { user } = useAuth()
  const emptyKids = useMemo(createEmptyKidsProgress, [])
  const kids = store.progress.kids ?? emptyKids

  // Ref luôn giữ bản mới nhất -> đọc "trạng thái trước" đúng cả khi React chưa kịp vẽ lại
  const kidsRef = useRef(kids)
  kidsRef.current = kids

  const value = useMemo<KidsDataValue>(
    () => ({
      kids,
      kidName: user?.displayName ?? 'bạn',
      basePath: '/kids',
      isPreview: false,
      answerWord: (wordId, correct, usedHint) => {
        const before = kidsRef.current.words[wordId]
        const { state, justMastered } = store.kidsAnswerWord(wordId, correct, usedHint)
        return { before, after: state, justMastered }
      },
      awardSticker: store.kidsAwardSticker,
      unlockOutfit: store.kidsUnlockOutfit,
      equipOutfit: store.kidsEquipOutfit,
      addPlaySeconds: store.kidsAddPlaySeconds,
      recordRoundEnd: store.kidsRecordBestScore,
    }),
    [kids, user?.displayName, store],
  )
  return <KidsDataContext.Provider value={value}>{children}</KidsDataContext.Provider>
}

/* ============================ 2. DỮ LIỆU XEM THỬ ============================ */

export function PreviewKidsDataProvider({ scenario, children }: { scenario: MockScenario; children: ReactNode }) {
  const [progress, setProgress] = useState<LearningProgress>(() => ({
    ...createEmptyProgress(),
    kids: buildMockKidsProgress(scenario),
  }))
  // Giống kho thật: ref giữ bản mới nhất để các hàm trả kết quả ngay (đồng bộ)
  const progressRef = useRef(progress)

  const value = useMemo<KidsDataValue>(() => {
    const commit = (change: (current: LearningProgress) => LearningProgress) => {
      const next = change(progressRef.current)
      progressRef.current = next
      setProgress(next)
      return next
    }
    return {
      kids: progress.kids ?? createEmptyKidsProgress(),
      kidName: 'Thảo',
      basePath: '/kids-preview',
      isPreview: true,
      answerWord: (wordId, correct, usedHint) => {
        const beforeProgress = progressRef.current
        const after = commit((p) => update.kidsAnswerWord(p, wordId, correct, usedHint))
        return {
          before: beforeProgress.kids?.words[wordId],
          after: after.kids!.words[wordId],
          justMastered: update.kidsWordJustMastered(beforeProgress, after, wordId),
        }
      },
      awardSticker: (id) => void commit((p) => update.kidsAwardSticker(p, id)),
      unlockOutfit: (id) => void commit((p) => update.kidsUnlockOutfit(p, id)),
      equipOutfit: (id) => void commit((p) => update.kidsEquipOutfit(p, id)),
      addPlaySeconds: (seconds) => void commit((p) => update.kidsAddPlaySeconds(p, seconds)),
      recordRoundEnd: (gameId, score) => void commit((p) => update.kidsRecordBestScore(p, gameId, score)),
    }
  }, [progress])
  return <KidsDataContext.Provider value={value}>{children}</KidsDataContext.Provider>
}
