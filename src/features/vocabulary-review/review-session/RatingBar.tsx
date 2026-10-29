/**
 * RatingBar.tsx — HÀNG NÚT CHẤM THẺ (Quên / Nhớ  hoặc  Quên / Khó / Nhớ / Dễ)
 * ----------------------------------------------------------------------------
 *   <RatingBar ratings={['again','good']} intervals={{again: 600000, good: 259200000, …}} onRate={rate} />
 *
 * Dưới mỗi nút ghi rõ "gặp lại sau 10 phút / 3 ngày" (ý tưởng Mochi: người học thấy hậu quả
 * của lựa chọn nên hiểu cách ôn ngắt quãng). Phím 1..4 theo thứ tự nút.
 * Màu: Quên = cam san hô (không đỏ chói), Khó = vàng, Nhớ = cam chính (nút gợi ý), Dễ = navy.
 * ----------------------------------------------------------------------------
 */
import type { SrsRating } from '../../../learning-progress/fsrs-scheduler'
import { Kbd } from '../../../design-system/components/Kbd'
import { useLanguage } from '../../../translations/language-context'
import { useReviewText } from '../vocabulary-review-text'
import { formatInterval } from './review-queue'

export interface RatingBarProps {
  ratings: SrsRating[]
  /** mili-giây tới lần ôn sau cho từng mức chấm */
  intervals: Record<SrsRating, number>
  onRate: (rating: SrsRating) => void
}

export function RatingBar({ ratings, intervals, onRate }: RatingBarProps) {
  const text = useReviewText()
  const { language } = useLanguage()
  return (
    <div className={`rating-bar rating-bar--${ratings.length}`} role="group" aria-label={text.rateHint}>
      {ratings.map((rating, index) => (
        <button key={rating} type="button" className={`rating-btn rating-btn--${rating}`} onClick={() => onRate(rating)}>
          <span className="rating-btn__top">
            <span className="rating-btn__name">{text.ratingName[rating]}</span>
            <Kbd>{index + 1}</Kbd>
          </span>
          <span className="rating-btn__interval">{text.nextInterval(formatInterval(intervals[rating], language))}</span>
        </button>
      ))}
    </div>
  )
}
