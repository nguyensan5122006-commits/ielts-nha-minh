/**
 * TeachingCardView.tsx — THẺ DẠY (lý thuyết ngắn trước khi luyện) + THẺ "TỪ MỚI"
 * ----------------------------------------------------------------------------
 *   <TeachingCardView card={card} index={0} total={3} illustration="waving-hand" />
 *   <NewWordsView words={lesson.words} />
 *
 * Bố cục thẻ dạy: ảnh 3D lớn (Fluent Emoji) nổi trên "đốm" màu kỹ năng bên trái,
 * tiêu đề Baloo 2 + nội dung (hỗ trợ **đậm**) bên phải; dưới là ví dụ, mỗi ví dụ
 * có nút loa (nghe ngay, có rùa đọc chậm). Phím Enter = Tiếp (trang cha xử lý).
 * ----------------------------------------------------------------------------
 */
import { Fragment, type CSSProperties } from 'react'
import type { SkillName, TeachingCard, VocabularyWord } from '../../../content/content-types'
import { findWordImage, toWordImageSlug } from '../../../content/word-image-catalog'
import { AudioButton } from '../../../design-system/components/AudioButton'
import { WordImage } from '../../../design-system/components/WordImage'
import { useLanguage } from '../../../translations/language-context'
import { useLessonText } from '../lesson-player-text'

/** Ảnh mặc định theo kỹ năng khi thẻ không gợi ra ảnh nào */
const SKILL_FALLBACK_IMAGE: Record<SkillName, string> = {
  vocabulary: 'books',
  listening: 'headphone',
  reading: 'open-book',
  writing: 'memo',
  speaking: 'speaking-head',
}

const STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'your', 'you', 'is', 'are', 'how', 'what', 'saying', 'using', 'use', 'part', 'about'])

/**
 * Chọn ảnh minh hoạ cho từng thẻ: thử các chữ **đậm** và chữ trong tiêu đề tiếng Anh
 * (VD "Saying hello" -> waving-hand), tránh trùng ảnh giữa các thẻ; không có thì
 * dùng icon của chặng (thẻ đầu) hoặc ảnh theo kỹ năng.
 */
export function pickCardImages(cards: TeachingCard[], unitIcon: string | undefined, skill: SkillName): string[] {
  const used = new Set<string>()
  return cards.map((card, index) => {
    const bold = [...card.body.en.matchAll(/\*\*(.+?)\*\*/g)].map((match) => match[1])
    const titleWords = card.title.en.split(/[\s&,/]+/).filter((word) => word.length > 2 && !STOP_WORDS.has(word.toLowerCase()))
    const candidates = [card.title.en, ...titleWords, ...bold, ...(card.examples ?? []).flatMap((example) => example.en.split(/\s+/))]
    for (const candidate of candidates) {
      const slug = findWordImage(candidate.replace(/[^a-z\s-]/gi, '').trim())
      if (slug && !used.has(slug)) {
        used.add(slug)
        return slug
      }
    }
    const fallback = index === 0 && unitIcon ? unitIcon : SKILL_FALLBACK_IMAGE[skill]
    used.add(fallback)
    return fallback
  })
}

/** Chữ có **đậm** -> <strong> (giữ xuống dòng). */
function RichLines({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="lp-card__line">
          {line.split(/\*\*(.+?)\*\*/g).map((piece, pieceIndex) => (pieceIndex % 2 === 1 ? <strong key={pieceIndex}>{piece}</strong> : <Fragment key={pieceIndex}>{piece}</Fragment>))}
        </span>
      ))}
    </>
  )
}

interface TeachingCardViewProps {
  card: TeachingCard
  index: number
  total: number
  illustration: string
  skill: SkillName
}

export function TeachingCardView({ card, index, total, illustration, skill }: TeachingCardViewProps) {
  const { pick } = useLanguage()
  const text = useLessonText()
  return (
    <article className="lp-card" style={{ '--card-accent': `var(--skill-${skill})` } as CSSProperties}>
      <p className="lp-card__count">{text.cardOf(index + 1, total)}</p>
      <div className="lp-card__head">
        <div className="lp-card__art" aria-hidden>
          <WordImage slug={illustration} word={card.title.en} size={124} decorative />
        </div>
        <div className="lp-card__titles">
          <h1 className="lp-card__title">{pick(card.title)}</h1>
          <p className="lp-card__body">
            <RichLines text={pick(card.body)} />
          </p>
        </div>
      </div>
      {card.examples && card.examples.length > 0 && (
        <section className="lp-examples" aria-label={text.examplesLabel}>
          {card.examples.map((example, exampleIndex) => (
            <div key={exampleIndex} className="lp-example" style={{ animationDelay: `${120 + exampleIndex * 70}ms` }}>
              <AudioButton text={example.en} size="sm" showSlow={false} />
              <div className="lp-example__text">
                <span className="lp-example__en" lang="en">
                  {example.en}
                </span>
                <span className="lp-example__vi">{example.vi}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </article>
  )
}

/* ================================ TỪ MỚI ================================ */

export function NewWordsView({ words }: { words: VocabularyWord[] }) {
  const text = useLessonText()
  const { pick } = useLanguage()
  return (
    <article className="lp-card lp-card--words">
      <div className="lp-words__head">
        <h1 className="lp-card__title">{text.newWordsTitle}</h1>
        <p className="lp-words__hint">{text.newWordsHint}</p>
      </div>
      <ul className="lp-words">
        {words.map((word, index) => (
          <li key={word.id} className="lp-word-card" style={{ animationDelay: `${index * 45}ms` }}>
            {/* không có ảnh -> slug không tồn tại -> WordImage tự hiện ô chữ cái đầu */}
            <WordImage slug={findWordImage(word.word) ?? toWordImageSlug(word.word)} word={word.word} size={56} decorative />
            <div className="lp-word-card__text">
              <span className="lp-word-card__word" lang="en">
                {word.word}
              </span>
              <span className="lp-word-card__ipa">
                {word.ipa} · <em>{word.partOfSpeech}</em>
              </span>
              <span className="lp-word-card__meaning">{word.meaningVi}</span>
              {word.usageNote && <span className="lp-word-card__note">{pick(word.usageNote)}</span>}
            </div>
            <AudioButton text={word.word} size="sm" showSlow={false} />
          </li>
        ))}
      </ul>
    </article>
  )
}
