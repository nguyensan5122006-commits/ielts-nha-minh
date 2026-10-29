/**
 * FunTopicsStrip.tsx — HÀNG CHỦ ĐỀ "HỌC VUI" TRÊN TRANG /play
 * ----------------------------------------------------------------------------
 * Hiện 6 chủ đề: ưu tiên chủ đề đang xem dở (để "xem tiếp"), rồi tới chủ đề chưa mở.
 * Chủ đề đã xem hết xếp cuối. Mỗi ô: ảnh 3D, tên, "12/20 thẻ" + thanh tiến độ mảnh.
 * ----------------------------------------------------------------------------
 */
import { Link } from 'react-router-dom'
import { ProgressBar } from '../../../design-system'
import { ALL_FUN_TOPICS } from '../../../content/all-fun-topics'
import { readSeenCards } from '../../../pages/FunFlashcardsPage'
import { useLanguage } from '../../../translations/language-context'
import { GameArt } from '../components/GameArt'
import { usePlayText } from '../playground-text'

export function FunTopicsStrip({ limit = 6 }: { limit?: number }) {
  const playText = usePlayText()
  const { pick } = useLanguage()
  const topics = ALL_FUN_TOPICS.map((topic, order) => {
    const seen = Math.min(readSeenCards(topic.id).size, topic.cards.length)
    // điểm sắp xếp: đang dở (0) < chưa mở (1) < đã xong (2); cùng nhóm giữ thứ tự gốc
    const group = seen > 0 && seen < topic.cards.length ? 0 : seen === 0 ? 1 : 2
    return { topic, seen, group, order }
  })
    .sort((a, b) => a.group - b.group || a.order - b.order)
    .slice(0, limit)

  return (
    <ul className="pg-fun">
      {topics.map(({ topic, seen }) => (
        <li key={topic.id}>
          <Link to={`/fun/${topic.id}`} className="pg-fun__tile">
            <GameArt emoji={topic.icon} size={48} />
            <span className="pg-fun__name">{pick(topic.title)}</span>
            <span className="pg-fun__count ds-num">{playText('funCards', { seen, total: topic.cards.length })}</span>
            <ProgressBar value={seen} max={topic.cards.length} size="sm" color="var(--grad-success)" label={pick(topic.title)} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
