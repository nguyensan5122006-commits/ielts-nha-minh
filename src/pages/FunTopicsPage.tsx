/**
 * FunTopicsPage.tsx — TRANG "HỌC VUI": danh sách chủ đề thẻ từ, xếp theo nhóm
 * (Thế giới, Thiên nhiên, Ăn uống, Đời sống, Con người, Giải trí).
 * Mỗi chủ đề hiện số thẻ đã xem / tổng số thẻ.
 * (v3) Giao diện làm lại: ô chủ đề có ảnh 3D + thanh tiến độ; thẻ "Xem tiếp" ở đầu trang
 *      trỏ tới chủ đề đang xem dở (bước tiếp theo rõ ràng).
 */
import { Link } from 'react-router-dom'
import { ALL_FUN_TOPICS } from '../content/all-fun-topics'
import { Badge, buttonClassName, Icon, ProgressBar } from '../design-system'
import { GameArt } from '../features/playground/components/GameArt'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useLanguage } from '../translations/language-context'
import { readSeenCards } from './FunFlashcardsPage'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/fun.css'

export function FunTopicsPage() {
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const seenCount = (topicId: string, total: number) => Math.min(readSeenCards(topicId).size, total)

  // gom chủ đề theo nhóm (giữ thứ tự xuất hiện)
  const groups = new Map<string, typeof ALL_FUN_TOPICS>()
  for (const topic of ALL_FUN_TOPICS) {
    const key = pick(topic.group)
    groups.set(key, [...(groups.get(key) ?? []), topic])
  }
  // chủ đề nên xem tiếp: đang dở (nhiều thẻ nhất) -> nếu không có thì chủ đề đầu tiên chưa mở
  const inProgress = ALL_FUN_TOPICS.filter((topic) => {
    const seen = seenCount(topic.id, topic.cards.length)
    return seen > 0 && seen < topic.cards.length
  }).sort((a, b) => seenCount(b.id, b.cards.length) / b.cards.length - seenCount(a.id, a.cards.length) / a.cards.length)[0]
  const nextTopic = inProgress ?? ALL_FUN_TOPICS.find((topic) => seenCount(topic.id, topic.cards.length) === 0)

  return (
    <main className="page pg-page fun">
      <PlayPageHeader back art={PLAY_ART.fun} artPlate="success" title={t('funTitle')} intro={playText('funIntroShort')} />

      {nextTopic && (
        <Link to={`/fun/${nextTopic.id}`} className="fun-next">
          <GameArt emoji={nextTopic.icon} size={64} plate="success" tilt={-6} />
          <span className="fun-next__text">
            <span className="fun-next__eyebrow">{inProgress ? playText('funContinue') : playText('funStart')}</span>
            <strong>{pick(nextTopic.title)}</strong>
            <span className="fun-next__count ds-num">{playText('funCards', { seen: seenCount(nextTopic.id, nextTopic.cards.length), total: nextTopic.cards.length })}</span>
          </span>
          {/* trông như nút nhưng chỉ là chữ (cả thẻ đã là 1 link) — không lồng nút trong link */}
          <span className={buttonClassName({ size: 'lg', extra: 'fun-next__cta' })} aria-hidden>
            <span className="ds-btn__label">{inProgress ? playText('funContinue') : playText('funStart')}</span>
            <Icon name="arrow-right" size={22} />
          </span>
        </Link>
      )}

      {[...groups.entries()].map(([groupName, topics]) => (
        <section key={groupName} className="fun-group" aria-label={groupName}>
          <h2 className="pg-section-title">{groupName}</h2>
          <ul className="fun-grid">
            {topics.map((topic) => {
              const seen = seenCount(topic.id, topic.cards.length)
              const done = seen >= topic.cards.length
              return (
                <li key={topic.id}>
                  <Link to={`/fun/${topic.id}`} className={`fun-tile ${done ? 'is-done' : ''}`}>
                    <GameArt emoji={topic.icon} size={56} />
                    <strong className="fun-tile__name">{pick(topic.title)}</strong>
                    <span className="fun-tile__count ds-num">{playText('funCards', { seen, total: topic.cards.length })}</span>
                    {done ? (
                      <Badge tone="success" icon="check" size="sm">
                        {playText('funDone')}
                      </Badge>
                    ) : (
                      <ProgressBar value={seen} max={topic.cards.length} size="sm" color="var(--grad-success)" label={pick(topic.title)} />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}
