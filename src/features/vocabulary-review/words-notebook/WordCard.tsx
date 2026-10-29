/**
 * WordCard.tsx — 1 Ô TỪ TRONG SỔ TỪ VỰNG + HỘP CHI TIẾT KHI BẤM VÀO
 * ----------------------------------------------------------------------------
 * Ô từ: ảnh 3D (Fluent Emoji, tra bằng findWordImage) · từ + phiên âm · loa ·
 *       nghĩa · đồng hồ 5 nấc nhớ · trạng thái ôn ("Đến hạn" / "ôn sau 3 ngày" / "Chưa ôn").
 * Bấm ô (Enter / chuột) -> WordDetailModal: đủ câu ví dụ (có loa), lưu ý cách dùng,
 *       số lần ôn / quên, bài học gốc, nút "Ôn ngay" nếu đến hạn.
 * ----------------------------------------------------------------------------
 */
import { AudioButton } from '../../../design-system/components/AudioButton'
import { Badge } from '../../../design-system/components/Badge'
import { Button } from '../../../design-system/components/Button'
import { Modal } from '../../../design-system/components/Modal'
import { useLanguage } from '../../../translations/language-context'
import { formatInterval } from '../review-session/review-queue'
import { MemoryStrengthMeter } from '../shared/MemoryStrengthMeter'
import { WordThumb } from '../shared/WordThumb'
import { useReviewText } from '../vocabulary-review-text'
import type { WordEntry } from './word-entries'

function DueStatus({ entry, now }: { entry: WordEntry; now: number }) {
  const text = useReviewText()
  const { language } = useLanguage()
  if (entry.isNew)
    return (
      <Badge tone={entry.isDue ? 'primary' : 'gold'} size="sm">
        {entry.isDue ? text.dueBadge : text.newCardBadge}
      </Badge>
    )
  if (entry.isDue)
    return (
      <Badge tone="primary" variant="solid" size="sm">
        {text.dueBadge}
      </Badge>
    )
  return <span className="wordbook-card__due">{text.dueIn(formatInterval(new Date(entry.card.due).getTime() - now, language))}</span>
}

export function WordCard({ entry, now, onOpen }: { entry: WordEntry; now: number; onOpen: () => void }) {
  const text = useReviewText()
  return (
    <article className={`wordbook-card${entry.isDue ? ' is-due' : ''}`}>
      {/* cả ô bấm được, nhưng nút loa bên trong vẫn là nút riêng -> dùng 1 nút "phủ" thay vì bọc lồng nút */}
      <button type="button" className="wordbook-card__hit" onClick={onOpen} aria-label={`${entry.word.word} — ${entry.word.meaningVi}`} />
      <div className="wordbook-card__top">
        <WordThumb word={entry.word.word} size={56} />
        <div className="wordbook-card__titles">
          <h3 className="wordbook-card__word" lang="en">
            {entry.word.word}
          </h3>
          <p className="wordbook-card__ipa" lang="en">
            {entry.word.ipa}
          </p>
        </div>
        <span className="wordbook-card__audio">
          <AudioButton text={entry.word.word} size="sm" label={text.listenUk} />
        </span>
      </div>
      <p className="wordbook-card__meaning">{entry.word.meaningVi}</p>
      <div className="wordbook-card__foot">
        <MemoryStrengthMeter level={entry.level} size="sm" />
        <span className="wordbook-card__level">{text.memoryLevelName[entry.level]}</span>
        <span className="wordbook-card__status">
          <DueStatus entry={entry} now={now} />
        </span>
      </div>
    </article>
  )
}

export interface WordDetailModalProps {
  entry: WordEntry | null
  now: number
  onClose: () => void
  onReview: (key: string) => void
}

export function WordDetailModal({ entry, now, onClose, onReview }: WordDetailModalProps) {
  const text = useReviewText()
  const { pick, language } = useLanguage()
  if (!entry) return null
  return (
    <Modal
      open={!!entry}
      onClose={onClose}
      title={entry.word.word}
      size="md"
      footer={
        <>
          <Button variant="secondary" to={`/lesson/${entry.lesson.id}`}>
            {text.openLesson}
          </Button>
          {entry.isDue ? (
            <Button onClick={() => onReview(entry.key)} iconRight="arrow-right">
              {text.reviewThis}
            </Button>
          ) : (
            <Button onClick={onClose}>{text.closeDetail}</Button>
          )}
        </>
      }
    >
      <div className="word-detail">
        <div className="word-detail__head">
          <WordThumb word={entry.word.word} size={96} />
          <div className="word-detail__titles">
            <p className="word-detail__ipa" lang="en">
              {entry.word.ipa} <span className="word-detail__pos">{entry.word.partOfSpeech}</span>
            </p>
            <p className="word-detail__meaning">{entry.word.meaningVi}</p>
            <p className="word-detail__definition" lang="en">
              {entry.word.definitionEn}
            </p>
          </div>
          <AudioButton text={entry.word.word} size="md" label={text.listenUk} />
        </div>

        <ul className="word-detail__examples">
          {entry.word.examples.map((example, index) => (
            <li key={index}>
              <div className="word-detail__example-row">
                <p lang="en">{example.en}</p>
                <AudioButton text={example.en} size="sm" label={text.listenExample} />
              </div>
              <p className="word-detail__example-vi">{example.vi}</p>
            </li>
          ))}
        </ul>

        {entry.word.usageNote && (
          <p className="word-detail__usage">
            <strong>{text.usageLabel}: </strong>
            {language === 'vi' ? entry.word.usageNote.vi : entry.word.usageNote.en}
          </p>
        )}

        <div className="word-detail__stats">
          <MemoryStrengthMeter level={entry.level} size="md" />
          <span>
            <DueStatus entry={entry} now={now} />
          </span>
          {entry.card.reps > 0 && <span>{text.reps(entry.card.reps)}</span>}
          {entry.card.lapses > 0 && <span>{text.lapses(entry.card.lapses)}</span>}
        </div>
        <p className="word-detail__lesson">
          {text.fromLesson}: <strong>{pick(entry.lesson.title)}</strong>
          {entry.unit && <> · {pick(entry.unit.title)}</>}
        </p>
      </div>
    </Modal>
  )
}
