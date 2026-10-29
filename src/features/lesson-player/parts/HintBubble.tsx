/**
 * HintBubble.tsx — LỜI GỢI Ý CỦA MASCOT (pose "thinking") dưới câu hỏi
 * ----------------------------------------------------------------------------
 * Hiện khi người học mở nấc gợi ý 1–2. Nằm TRONG vùng nội dung (không che câu hỏi,
 * không bật popup), trồi lên nhẹ 180ms.
 * ----------------------------------------------------------------------------
 */
import { Mascot } from '../../../design-system/components/Mascot'
import { useLessonText } from '../lesson-player-text'

export function HintBubble({ message, step, steps }: { message: string; step: number; steps: number }) {
  const text = useLessonText()
  return (
    <div className="lp-hint" role="status" key={step}>
      <Mascot pose="thinking" size={52} />
      <div className="lp-hint__bubble">
        <span className="lp-hint__step">{steps > 1 ? text.hintStep(step) : text.hint}</span>
        <span>{message}</span>
      </div>
    </div>
  )
}
