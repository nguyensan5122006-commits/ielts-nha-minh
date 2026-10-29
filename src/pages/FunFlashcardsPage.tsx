/**
 * FunFlashcardsPage.tsx — XEM THẺ TỪ CỦA 1 CHỦ ĐỀ HỌC VUI
 * ----------------------------------------------------------------------------
 * Mặt trước: hình (emoji / cờ) + từ tiếng Anh + phiên âm + nút nghe.
 * Bấm thẻ (hoặc phím Space) để lật: nghĩa tiếng Việt, câu ví dụ, thông tin thêm.
 * Phím ← → để chuyển thẻ. Có chế độ "Đoán nghĩa" (ẩn chữ, chỉ hiện hình).
 * Thẻ đã xem được nhớ trong máy (localStorage) để hiện tiến độ; xem hết 1 chủ đề -> tiếng "ting" chúc mừng.
 * (v3) Giao diện làm lại: thẻ lật 3D bo tròn, nút tròn ← 🔊 →, gợi ý phím, công tắc "Đoán nghĩa",
 *      xem hết chủ đề -> mascot ăn mừng + nút sang chủ đề tiếp theo.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ALL_FUN_TOPICS, findFunTopic } from '../content/all-fun-topics'
import { CardImage } from '../components/PlayerIdentity'
import { SpeakerButton } from '../components/SpeakerButton'
import { Button, Icon, IconButton, Kbd, Mascot, playSound, ProgressBar } from '../design-system'
import { PlayPageHeader } from '../features/playground/components/PlayPageHeader'
import { emojiArtSlug } from '../features/playground/emoji-art'
import { PLAY_ART } from '../features/playground/game-catalog'
import { usePlayText } from '../features/playground/playground-text'
import { useProgress } from '../learning-progress/progress-store'
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'
import '../features/playground/styles/fun.css'

const seenKey = (topicId: string) => `ielts-fun-seen-${topicId}`

/** Đọc danh sách id thẻ đã xem của 1 chủ đề. */
export function readSeenCards(topicId: string): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(seenKey(topicId)) ?? '[]') as string[])
  } catch {
    return new Set()
  }
}

function saveSeenCards(topicId: string, seen: Set<string>) {
  try {
    localStorage.setItem(seenKey(topicId), JSON.stringify([...seen]))
  } catch {
    /* bỏ qua */
  }
}

export function FunFlashcardsPage() {
  const { topicId = '' } = useParams()
  const topic = findFunTopic(topicId)
  const { t, pick } = useLanguage()
  const playText = usePlayText()
  const { recordActivity } = useProgress()
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [guessMode, setGuessMode] = useState(false)
  const [seen, setSeen] = useState<Set<string>>(() => readSeenCards(topicId))

  const card = topic?.cards[index]

  // đánh dấu thẻ đang xem là "đã xem"; xem đủ cả chủ đề lần đầu -> tiếng chúc mừng
  useEffect(() => {
    if (!topic || !card || seen.has(card.id)) return
    const next = new Set(seen).add(card.id)
    setSeen(next)
    saveSeenCards(topic.id, next)
    recordActivity('funCards')
    if (next.size === topic.cards.length) playSound('sticker')
  }, [topic, card, seen, recordActivity])

  const go = useCallback(
    (delta: number) => {
      if (!topic) return
      setIndex((current) => (current + delta + topic.cards.length) % topic.cards.length)
      setFlipped(false)
    },
    [topic],
  )

  // phím tắt
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const focused = event.target as HTMLElement | null
      if (focused && (focused.tagName === 'INPUT' || focused.tagName === 'TEXTAREA' || focused.isContentEditable)) return
      if (event.key === 'ArrowRight') go(1)
      else if (event.key === 'ArrowLeft') go(-1)
      else if (event.key === ' ') {
        event.preventDefault()
        setFlipped((f) => !f)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  // tự đọc từ khi chuyển thẻ (chế độ thường)
  useEffect(() => {
    if (card && !guessMode) void speak(card.word)
  }, [card, guessMode])

  if (!topic || !card) return <Navigate to="/fun" replace />
  const showWord = !guessMode || flipped
  const allSeen = seen.size >= topic.cards.length
  const topicIndex = ALL_FUN_TOPICS.findIndex((item) => item.id === topic.id)
  const nextTopic = ALL_FUN_TOPICS[(topicIndex + 1) % ALL_FUN_TOPICS.length]

  return (
    <main className="page pg-page pg-page--narrow fun">
      <PlayPageHeader
        back={{ to: '/fun', label: t('funTitle') }}
        art={emojiArtSlug(topic.icon) ?? PLAY_ART.fun}
        artPlate="success"
        title={pick(topic.title)}
        intro={
          <span className="ds-num">
            {index + 1}/{topic.cards.length} · {seen.size} {t('cardsSeen')}
          </span>
        }
        actions={
          <label className="fun-switch">
            <input type="checkbox" checked={guessMode} onChange={(e) => setGuessMode(e.target.checked)} />
            <span className="fun-switch__track" aria-hidden>
              <span className="fun-switch__thumb" />
            </span>
            {playText('funGuessMode')}
          </label>
        }
      />

      <ProgressBar value={seen.size} max={topic.cards.length} size="sm" color="var(--grad-success)" label={t('cardsSeen')} className="fun-progress" />

      {/* thẻ lật */}
      <div
        className={`fun-card ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setFlipped((f) => !f)
        }}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={t('tapToFlip')}
      >
        <div className="fun-card__inner">
          <div className="fun-card__face fun-card__front">
            <span className="fun-card__picture">
              <CardImage image={card.image} size={120} />
            </span>
            {showWord ? (
              <>
                <div className="fun-card__word">{card.word}</div>
                <div className="fun-card__ipa">
                  {card.ipa} · <em>{card.partOfSpeech}</em>
                </div>
              </>
            ) : (
              <div className="fun-card__word is-hidden">?</div>
            )}
          </div>
          <div className="fun-card__face fun-card__back">
            <div className="fun-card__word fun-card__word--sm">
              {card.word} <span className="fun-card__ipa">{card.ipa}</span>
            </div>
            <div className="fun-card__meaning">{card.meaningVi}</div>
            <ul className="fun-card__examples" onClick={(e) => e.stopPropagation()}>
              {card.examples.map((example, i) => (
                <li key={i}>
                  <div className="fun-card__en">
                    <SpeakerButton text={example.en} variant="inline" /> {example.en}
                  </div>
                  <div className="fun-card__vi">{example.vi}</div>
                </li>
              ))}
            </ul>
            {card.extraInfo && (
              <p className="fun-card__extra">
                <Icon name="hint" size={16} /> {pick(card.extraInfo)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="fun-controls">
        <IconButton icon={<span className="fun-controls__arrow is-left"><Icon name="arrow-right" size={22} /></span>} label="←" size="lg" onClick={() => go(-1)} />
        <IconButton icon="volume" label={t('listenNormal')} variant="primary" size="lg" onClick={() => speak(card.word)} />
        <IconButton icon="arrow-right" label="→" size="lg" onClick={() => go(1)} />
      </div>
      <p className="fun-keys">
        <Kbd>←</Kbd> <Kbd>→</Kbd> {playText('funKeysMove')} · <Kbd>Space</Kbd> {playText('funKeysFlip')}
      </p>

      {allSeen && (
        <div className="pg-note pg-note--success fun-done">
          <Mascot pose="celebrate" size={56} />
          <span>{playText('funTopicDone')}</span>
          <Button to={`/fun/${nextTopic.id}`} size="sm" iconRight="arrow-right">
            {playText('funNextTopic')}: {pick(nextTopic.title)}
          </Button>
        </div>
      )}

      {/* danh sách nhỏ toàn bộ thẻ */}
      <div className="fun-strip">
        {topic.cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            className={`fun-strip__item ${i === index ? 'is-active' : ''} ${seen.has(c.id) ? 'is-seen' : ''}`}
            onClick={() => {
              setIndex(i)
              setFlipped(false)
            }}
            title={c.word}
            aria-label={c.word}
          >
            <CardImage image={c.image} size={26} />
          </button>
        ))}
      </div>
    </main>
  )
}
