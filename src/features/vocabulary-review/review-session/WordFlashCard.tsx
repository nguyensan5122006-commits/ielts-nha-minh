/**
 * WordFlashCard.tsx — THẺ TỪ VỰNG 2 MẶT TRONG PHIÊN ÔN
 * ----------------------------------------------------------------------------
 * Mặt trước (chọn theo trình độ, psych-adult D8 luật 35):
 *   - "listen"  (người mới, level-1): ảnh 3D + loa tự đọc từ -> nhớ lại từ đó
 *   - "meaning" (còn lại): nghĩa tiếng Việt + câu ví dụ có chỗ trống -> tự nhớ ra từ tiếng Anh
 * Mặt sau: từ to + phiên âm + loa giọng Anh + nghĩa + câu ví dụ (từ được tô) + độ nhớ hiện tại.
 *
 * Lật thẻ KHÔNG xoay 3D: thẻ "mở dài xuống", có đường gạch đứt ngăn 2 mặt (ý tưởng Mochi —
 * mắt không phải đọc lại mặt trước). Lật xong tự đọc từ bằng giọng Anh.
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import { AudioButton } from '../../../design-system/components/AudioButton'
import { Badge } from '../../../design-system/components/Badge'
import { WordImage } from '../../../design-system/components/WordImage'
import type { VocabularyWord } from '../../../content/content-types'
import { findWordImage } from '../../../content/word-image-catalog'
import { speak } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import type { MemoryLevel } from '../memory-levels'
import { MemoryStrengthMeter } from '../shared/MemoryStrengthMeter'
import { useReviewText } from '../vocabulary-review-text'
import { RichText } from '../shared/RichText'
import { splitAroundWord } from './blank-word'

export type FrontStyle = 'listen' | 'meaning'

export interface WordFlashCardProps {
  word: VocabularyWord
  flipped: boolean
  frontStyle: FrontStyle
  /** nấc nhớ hiện tại của thẻ (hiện ở mặt sau) */
  memoryLevel: MemoryLevel
  isNew: boolean
  /** thẻ quay lại vì lúc nãy chưa nhớ */
  isRetry: boolean
}

export function WordFlashCard({ word, flipped, frontStyle, memoryLevel, isNew, isRetry }: WordFlashCardProps) {
  const text = useReviewText()
  const { language } = useLanguage()
  const imageSlug = findWordImage(word.word)
  const example = word.examples[0]
  const split = example ? splitAroundWord(example.en, word.word) : null
  // mặt "nghe + ảnh" chỉ dùng được khi có ảnh; không có ảnh thì quay về mặt "nghĩa"
  const style: FrontStyle = frontStyle === 'listen' && imageSlug ? 'listen' : 'meaning'

  // mặt nghe: tự đọc khi thẻ hiện ra · mọi thẻ: tự đọc từ khi vừa lật
  useEffect(() => {
    if (!flipped && style === 'listen') void speak(word.word)
  }, [word.id, flipped, style, word.word])
  useEffect(() => {
    if (flipped && style === 'meaning') void speak(word.word)
  }, [flipped, style, word.word])

  return (
    <article className={`srs-card${flipped ? ' is-flipped' : ''}`} aria-live="polite">
      <div className="srs-card__tags">
        {isRetry && (
          <Badge tone="oops" size="sm">
            {text.againLabel}
          </Badge>
        )}
        {isNew && !isRetry && (
          <Badge tone="gold" size="sm">
            {text.newBadge}
          </Badge>
        )}
      </div>

      {/* ---------- MẶT TRƯỚC ---------- */}
      <div className="srs-card__front">
        {style === 'listen' ? (
          <>
            <p className="srs-card__prompt">{text.frontPromptListen}</p>
            <div className="srs-card__listen">
              <WordImage slug={imageSlug!} word={word.word} size={148} decorative />
              <AudioButton text={word.word} size="lg" label={text.listenUk} />
            </div>
          </>
        ) : (
          <>
            <p className="srs-card__prompt">{text.frontPromptMeaning}</p>
            <p className="srs-card__meaning">{word.meaningVi}</p>
            {!flipped && <p className="srs-card__pos">{word.partOfSpeech}</p>}
            {example && !flipped && (
              <div className="srs-card__example">
                {split && (
                  <p className="srs-card__example-en" lang="en">
                    {split.before}
                    {/* chỗ trống dài theo độ dài từ thật (không lộ chữ cái nào) */}
                    <span className="srs-card__blank" role="img" aria-label="___" style={{ width: `${Math.max(4, split.match.length) * 0.62}em` }} />
                    {split.after}
                  </p>
                )}
                <p className="srs-card__example-vi">{example.vi}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ---------- MẶT SAU ---------- */}
      {flipped && (
        <div className="srs-card__back">
          <div className="srs-card__word-row">
            {imageSlug && style === 'meaning' && <WordImage slug={imageSlug} word={word.word} size={72} decorative />}
            <div className="srs-card__word-block">
              <h2 className="srs-card__word" lang="en">
                {word.word}
              </h2>
              <p className="srs-card__ipa">
                <span lang="en">{word.ipa}</span>
                <span className="srs-card__pos-inline">{word.partOfSpeech}</span>
              </p>
            </div>
            <AudioButton text={word.word} size="md" label={text.listenUk} />
          </div>
          {style === 'listen' && <p className="srs-card__meaning srs-card__meaning--back">{word.meaningVi}</p>}
          {example && (
            <div className="srs-card__example srs-card__example--back">
              <span className="srs-card__label">{text.exampleLabel}</span>
              <div className="srs-card__example-row">
                <p className="srs-card__example-en" lang="en">
                  {split ? (
                    <>
                      {split.before}
                      <mark className="srs-card__mark">{split.match}</mark>
                      {split.after}
                    </>
                  ) : (
                    example.en
                  )}
                </p>
                <AudioButton text={example.en} size="sm" label={text.listenExample} />
              </div>
              <p className="srs-card__example-vi">{example.vi}</p>
            </div>
          )}
          {word.usageNote && (
            <p className="srs-card__usage">
              <span className="srs-card__label">{text.usageLabel}</span>
              <RichText text={language === 'vi' ? word.usageNote.vi : word.usageNote.en} />
            </p>
          )}
          <div className="srs-card__memory">
            <span className="srs-card__label">{text.memoryNow}</span>
            <MemoryStrengthMeter level={memoryLevel} size="md" />
          </div>
        </div>
      )}
    </article>
  )
}
