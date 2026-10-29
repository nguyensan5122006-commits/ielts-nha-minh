/**
 * MascotCorner.tsx — KI Ở GÓC TRÁI DƯỚI, PHẢN ỨNG THEO TỪNG CÂU
 * ----------------------------------------------------------------------------
 *   const mascot = useMascotReaction('listening')
 *   mascot.react('happy', 'Đúng rồi')          // đổi nét mặt + bong bóng (tự ẩn sau ~2,6 giây)
 *   mascot.react('comfort', 'Nghe lại nhé', 4000)
 *   <MascotCorner reaction={mascot.reaction} />
 *
 * Ngôn ngữ pose cố định (04-DESIGN-SYSTEM mục 5): đúng = happy · sai = comfort ·
 * gợi ý = thinking · xong lượt = celebrate · đang nghe = listening · chào = wave.
 * Bong bóng ở đây là PHỤ ĐỀ ngắn; câu nào cần giọng thì trò tự gọi kids-audio.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { KidsMascot, type MascotPose } from './KidsMascot'
import './MascotCorner.css'

export interface MascotReaction {
  pose: MascotPose
  text: string | null
  /** tăng mỗi lần phản ứng -> bong bóng nảy lại dù chữ giống lần trước */
  id: number
}

export function useMascotReaction(restingPose: MascotPose = 'wave') {
  const [reaction, setReaction] = useState<MascotReaction>({ pose: restingPose, text: null, id: 0 })
  const hideTimer = useRef<number | undefined>(undefined)

  const react = useCallback(
    (pose: MascotPose, text: string | null = null, showMs = 2600) => {
      window.clearTimeout(hideTimer.current)
      setReaction((current) => ({ pose, text, id: current.id + 1 }))
      // sau một lúc: tắt bong bóng, Ki về tư thế nghỉ
      hideTimer.current = window.setTimeout(() => setReaction((current) => ({ ...current, pose: restingPose, text: null })), showMs)
    },
    [restingPose],
  )
  useEffect(() => () => window.clearTimeout(hideTimer.current), [])
  return { reaction, react }
}

export function MascotCorner({ reaction, size = 156, outfitId }: { reaction: MascotReaction; size?: number; outfitId?: string }) {
  return (
    <div className="kz-corner" aria-live="polite">
      <KidsMascot pose={reaction.pose} size={size} outfitId={outfitId} />
      {reaction.text && (
        <p className="kz-bubble kz-corner__bubble" key={reaction.id}>
          {reaction.text}
        </p>
      )}
    </div>
  )
}
