/**
 * ReviewSession.tsx — 1 PHIÊN ÔN THẺ FSRS (màn toàn màn hình)
 * ----------------------------------------------------------------------------
 *   <ReviewSession items={buildReviewQueue(progress)} onClose={() => setSession(null)} />
 *
 * Luồng mỗi thẻ:
 *   thẻ từ:   mặt trước -> Space lật -> chấm 1–2 (Quên/Nhớ) hoặc 1–4 (Quên/Khó/Nhớ/Dễ)
 *             (số nút theo profile.srsButtons — srsButtonModeFor). "Mình đã biết từ này" (K) = Dễ.
 *   câu sai:  làm lại như bài tập -> máy tự chấm (autoRating: sai = Quên, đúng chậm = Khó, đúng = Nhớ).
 * Mỗi lần chấm gọi reviewSrsCard() -> LƯU NGAY (thoát giữa chừng không mất gì).
 * Thẻ "Quên" được đưa lại CUỐI phiên (học lại trong phiên, tối đa 2 lần/thẻ — Mochi).
 * Hết hàng -> completeReviewSession(phút) (giữ chuỗi ngày) + XP nhỏ (chỉ track general) -> màn kết thúc.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Kbd } from '../../../design-system/components/Kbd'
import { playSound } from '../../../design-system/sound-kit'
import { autoRating, ratingsForButtonMode, srsButtonModeFor, type SrsRating } from '../../../learning-progress/fsrs-scheduler'
import { isGamifiedTrack } from '../../../gamification/gamification-scope'
import { useProgress } from '../../../learning-progress/progress-store'
import { retryQuestionFromExercise } from '../../mistakes-notebook/exercise-retry/retry-question'
import { RetryQuestionView, type RetryResult } from '../../mistakes-notebook/exercise-retry/RetryQuestionView'
import { useMistakesText } from '../../mistakes-notebook/mistakes-notebook-text'
import { memoryLevelOf } from '../memory-levels'
import { FocusOverlay } from '../shared/FocusOverlay'
import { useReviewText } from '../vocabulary-review-text'
import { previewIntervals, type ReviewItem } from './review-queue'
import { RatingBar } from './RatingBar'
import { SessionEndScreen, type SessionSummary } from './SessionEndScreen'
import { WordFlashCard, type FrontStyle } from './WordFlashCard'
import './review-session.css'

/** 1 lượt hiện thẻ trong phiên. attempt 0 = lần đầu, ≥ 1 = quay lại vì lúc nãy quên. */
interface SessionTurn {
  item: ReviewItem
  attempt: number
}

/** Mỗi thẻ quên được hỏi lại tối đa bấy nhiêu lần trong 1 phiên (tránh vòng lặp mệt mỏi). */
const MAX_RETRIES_PER_CARD = 2
/** Mỗi thẻ ôn được XP (D10: XP chỉ cho hành động học thật), tối đa mỗi phiên. */
const XP_PER_CARD = 1
const MAX_SESSION_XP = 30

export interface ReviewSessionProps {
  items: ReviewItem[]
  onClose: () => void
}

export function ReviewSession({ items, onClose }: ReviewSessionProps) {
  const text = useReviewText()
  const mistakesText = useMistakesText()
  const { progress, reviewSrsCard, completeReviewSession, addStudyMinutes, addXp, setMistakeResolved } = useProgress()

  const [turns, setTurns] = useState<SessionTurn[]>(() => items.map((item) => ({ item, attempt: 0 })))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [summary, setSummary] = useState<SessionSummary | null>(null)
  const startedAt = useRef(Date.now())
  /** kết quả lần ĐẦU của từng thẻ (để tính "nhớ ngay") */
  const firstResults = useRef(new Map<string, boolean>())
  const finishedRef = useRef(false)

  const turn = turns[index]
  const buttonMode = srsButtonModeFor(progress)
  const ratings = ratingsForButtonMode(buttonMode)
  // người mới (level-1): mặt trước "nghe + ảnh"
  const frontStyle: FrontStyle = progress.currentLevel[progress.profile.track] === 'level-1' ? 'listen' : 'meaning'

  // thẻ mới nhất trong kho (sau các lần chấm trước đó trong phiên)
  const liveCard = turn ? (progress.srs[turn.item.key] ?? turn.item.card) : undefined
  const intervals = useMemo(
    () => (turn && liveCard ? previewIntervals(liveCard, turn.item.key, ratings, new Date()) : null),
    // tính lại khi đổi thẻ / lật (đủ chính xác; không cần theo từng giây)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turn?.item.key, turn?.attempt, flipped, buttonMode],
  )

  const elapsedMinutes = () => Math.max(1, Math.round((Date.now() - startedAt.current) / 60_000))

  /** Hết hàng thẻ: ghi nhận phiên ôn (giữ chuỗi), thưởng nhỏ, hiện màn kết thúc. */
  const finishSession = useCallback(() => {
    if (finishedRef.current) return
    finishedRef.current = true
    const reviewedKeys = [...firstResults.current.keys()]
    const minutes = elapsedMinutes()
    if (reviewedKeys.length > 0) {
      completeReviewSession(minutes)
      // XP chỉ ở track general (src/gamification/gamification-scope.ts); chuỗi ngày thì cả 2 track
      if (isGamifiedTrack(progress.profile.track)) addXp(Math.min(MAX_SESSION_XP, reviewedKeys.length * XP_PER_CARD))
      playSound('complete')
    }
    setSummary({
      reviewedKeys,
      rememberedFirstTry: [...firstResults.current.values()].filter(Boolean).length,
      minutes,
    })
  }, [completeReviewSession, addXp, progress.profile.track])

  /** Sang thẻ kế (hoặc kết thúc). `requeue` = đưa thẻ hiện tại xuống cuối hàng. */
  const advance = useCallback(
    (requeue: boolean) => {
      const nextTurns = requeue && turn ? [...turns, { item: turn.item, attempt: turn.attempt + 1 }] : turns
      setTurns(nextTurns)
      setFlipped(false)
      if (index + 1 >= nextTurns.length) finishSession()
      else setIndex(index + 1)
    },
    [turns, turn, index, finishSession],
  )

  /** Chấm 1 thẻ từ. */
  const rate = useCallback(
    (rating: SrsRating) => {
      if (!turn || summary) return
      reviewSrsCard(turn.item.key, rating)
      if (!firstResults.current.has(turn.item.key)) firstResults.current.set(turn.item.key, rating !== 'again')
      playSound(rating === 'again' ? 'flip' : 'tap')
      advance(rating === 'again' && turn.attempt < MAX_RETRIES_PER_CARD)
    },
    [turn, summary, reviewSrsCard, advance],
  )

  /** Thẻ câu từng sai: máy chấm xong -> lưu ngay. Đúng = 1 lỗi đã sửa. */
  const onItemChecked = useCallback(
    (result: RetryResult) => {
      if (!turn) return
      const rating = autoRating(result.correct, { seconds: result.seconds })
      reviewSrsCard(turn.item.key, rating)
      if (!firstResults.current.has(turn.item.key)) firstResults.current.set(turn.item.key, result.correct)
      if (result.correct && turn.item.exercise) {
        for (const mistake of progress.mistakes) if (mistake.itemId === turn.item.exercise.id && !mistake.resolved) setMistakeResolved(mistake.id, true)
      }
    },
    [turn, reviewSrsCard, progress.mistakes, setMistakeResolved],
  )
  const lastItemCorrect = useRef(false)

  /* ---------- phím tắt cho thẻ từ ---------- */
  useEffect(() => {
    if (!turn || summary || turn.item.kind !== 'word') return
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
      if (event.key === ' ' || event.key === 'ArrowDown') {
        if (event.target instanceof HTMLButtonElement && event.key === ' ') return // nút đang focus tự xử lý Space
        event.preventDefault()
        if (!flipped) {
          setFlipped(true)
          playSound('flip')
        }
        return
      }
      if (event.key === 'k' || event.key === 'K') {
        event.preventDefault()
        rate('easy')
        return
      }
      if (!flipped) return
      const position = Number(event.key)
      if (position >= 1 && position <= ratings.length) {
        event.preventDefault()
        rate(ratings[position - 1])
      } else if (event.key === 'Enter' && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault()
        rate('good')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [turn, summary, flipped, ratings, rate])

  /** Thoát giữa chừng: mọi thẻ đã chấm đều đã lưu; cộng phút học cho phần đã làm. */
  const exit = useCallback(() => {
    if (!summary && firstResults.current.size > 0) addStudyMinutes(elapsedMinutes())
    onClose()
  }, [summary, addStudyMinutes, onClose])

  const doneCount = Math.min(firstResults.current.size, items.length)

  return (
    <FocusOverlay
      ariaLabel={text.navReview}
      exitLabel={text.exitSession}
      onExit={exit}
      progress={summary ? undefined : { value: doneCount, max: items.length, label: text.sessionProgress, text: text.cardCounter(doneCount, items.length) }}
    >
      {summary ? (
        <SessionEndScreen summary={summary} onClose={onClose} />
      ) : turn?.item.kind === 'word' && turn.item.word ? (
        <div className="review-session">
          <div className="review-session__stage">
            <WordFlashCard
              key={`${turn.item.key}-${turn.attempt}`}
              word={turn.item.word}
              flipped={flipped}
              frontStyle={frontStyle}
              memoryLevel={memoryLevelOf(liveCard ?? turn.item.card)}
              isNew={turn.item.isNew}
              isRetry={turn.attempt > 0}
            />
          </div>
          <div className="review-session__footer">
            {!flipped ? (
              <div className="review-session__footer-row">
                <Button variant="ghost" onClick={() => rate('easy')} title={text.knowItHint} iconRight={<Kbd>K</Kbd>}>
                  {text.knowIt}
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    setFlipped(true)
                    playSound('flip')
                  }}
                  iconRight={<Kbd onColor>Space</Kbd>}
                >
                  {text.flip}
                </Button>
              </div>
            ) : (
              intervals && (
                <div className="review-session__rate">
                  <p className="review-session__rate-hint">{text.rateHint}</p>
                  <RatingBar ratings={ratings} intervals={intervals} onRate={rate} />
                </div>
              )
            )}
          </div>
        </div>
      ) : turn?.item.kind === 'item' && turn.item.exercise ? (
        <RetryQuestionView
          key={`${turn.item.key}-${turn.attempt}`}
          question={retryQuestionFromExercise(turn.item.exercise)}
          eyebrow={<span className="review-session__item-label">{turn.attempt > 0 ? text.againLabel : text.frontPromptItem}</span>}
          correctTitle={mistakesText.correctFixedTitle}
          onChecked={(result) => {
            lastItemCorrect.current = result.correct
            onItemChecked(result)
          }}
          onContinue={() => advance(!lastItemCorrect.current && (turn?.attempt ?? 0) < 1)}
        />
      ) : (
        <SessionEndScreen summary={{ reviewedKeys: [], rememberedFirstTry: 0, minutes: 0 }} onClose={onClose} />
      )}
    </FocusOverlay>
  )
}
