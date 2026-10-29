/**
 * WordGuessRound.tsx — 1 VÁN CỦA "NHÌN ẢNH ĐOÁN TỪ" (mode="picture") HOẶC "ĐIỀN CHỮ CÒN THIẾU" (mode="missing")
 * ----------------------------------------------------------------------------
 *   <WordGuessRound words={10 từ} mode="picture" difficulty="easy" timed={false} seed={123}
 *                   onFinish={(summary) => …} onQuit={() => …} />
 *
 * Mỗi từ:
 *   - Hàng Ô CHỮ: ô xám đã cho sẵn chữ (trò Điền chữ), ô trống người chơi phải điền.
 *   - Bàn VIÊN CHỮ: chữ cần điền + vài chữ "mồi" (round-rules.ts). Bấm viên chữ hoặc GÕ PHÍM.
 *     Bấm vào ô đã điền = trả chữ về bàn.
 *   - Gợi ý (mỗi gợi ý −25 điểm): chữ cái đầu / mở 1 chữ, nghĩa tiếng Việt, nghe từ.
 *   - Kiểm tra: đúng -> điểm + chuỗi; sai lần 1 -> thử lại (điểm còn 1 nửa); sai lần 2 -> hiện từ đúng + đọc to.
 *     Từ sai mà đang có thẻ ôn ("word:<id>") -> chấm thẻ "again" để từ quay lại sớm trong phần Ôn tập.
 *
 * PHÍM TẮT: a–z gõ chữ · Backspace xoá 1 chữ · Delete xoá hết · Enter kiểm tra / từ tiếp theo · 1 / 2 / 3 = 3 nút gợi ý · Esc = bỏ qua
 * Chế độ tính giờ (tuỳ chọn): TIMED_SECONDS giây mỗi từ, hết giờ = hiện đáp án.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Button, Icon, IconButton, Kbd, Mascot, playSound, ProgressBar } from '../../../design-system'
import { TimerBar, TimerBarIdle } from '../../../games/GameQuestionView'
import { useProgress } from '../../../learning-progress/progress-store'
import { speak } from '../../../services/text-to-speech'
import { GameArt } from '../../playground/components/GameArt'
import { buildPuzzle, MAX_TRIES, scoreWord, TIMED_SECONDS, type Difficulty, type PuzzleMode, type RoundSummary, type WordOutcome } from '../round-rules'
import type { PoolWord } from '../word-pool'
import { useWordGamesText } from '../word-games-text'

export interface WordGuessRoundProps {
  words: PoolWord[]
  mode: PuzzleMode
  difficulty: Difficulty
  timed: boolean
  seed: number
  onFinish: (summary: RoundSummary) => void
  onQuit: () => void
}

/** 1 ô chữ: chữ đang hiện, có bị khoá không (cho sẵn / do gợi ý), lấy từ viên chữ số mấy */
interface Slot {
  letter: string | null
  locked: boolean
  /** chữ này được mở bằng gợi ý (tô màu khác) */
  fromHint?: boolean
  tile: number | null
}

type HintKind = 'letter' | 'meaning' | 'audio'
type RevealReason = 'wrong' | 'timeout' | 'skip'

interface WordState {
  slots: Slot[]
  tryNumber: number
  /** gợi ý đã TRẢ ĐIỂM */
  paidHints: number
  meaningShown: boolean
  audioUnlocked: boolean
  status: 'answering' | 'correct' | 'revealed'
  reveal?: RevealReason
  /** sai lần 1 -> hiện dòng "thử lại" */
  retry: boolean
  /** tăng mỗi lần cần rung hàng ô chữ */
  shake: number
  points: number
  addedToReview: boolean
  startedAt: number
}

function freshWordState(answer: string, givenMask: boolean[], meaningFree: boolean, audioFree: boolean): WordState {
  return {
    slots: [...answer].map((letter, index) => (givenMask[index] ? { letter, locked: true, tile: null } : { letter: null, locked: false, tile: null })),
    tryNumber: 1,
    paidHints: 0,
    meaningShown: meaningFree,
    audioUnlocked: audioFree,
    status: 'answering',
    retry: false,
    shake: 0,
    points: 0,
    addedToReview: false,
    startedAt: Date.now(),
  }
}

export function WordGuessRound({ words, mode, difficulty, timed, seed, onFinish, onQuit }: WordGuessRoundProps) {
  const text = useWordGamesText()
  const { reviewSrsCard } = useProgress()
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [outcomes, setOutcomes] = useState<WordOutcome[]>([])

  const word = words[index]
  const puzzle = useMemo(() => buildPuzzle(word.word, mode, difficulty, seed + index * 7919), [word.word, mode, difficulty, seed, index])

  // Manh mối hiện sẵn (không mất điểm) theo trò + độ khó:
  //   Nhìn ảnh: luôn có ảnh; nghĩa & tiếng là gợi ý trả điểm
  //   Điền chữ: dễ = ảnh + nghĩa + tiếng miễn phí · vừa = ảnh + nghĩa · khó = chỉ còn ô chữ (nghĩa, tiếng là gợi ý)
  const showPicture = mode === 'picture' || (!!word.imageSlug && difficulty !== 'hard')
  const meaningFree = mode === 'missing' && difficulty !== 'hard'
  const audioFree = mode === 'missing' && difficulty === 'easy'

  const [state, setState] = useState<WordState>(() => freshWordState(puzzle.answer, puzzle.givenMask, meaningFree, audioFree))
  // sang từ mới -> làm mới trạng thái ô chữ
  const [stateFor, setStateFor] = useState(index)
  if (stateFor !== index) {
    setStateFor(index)
    setState(freshWordState(puzzle.answer, puzzle.givenMask, meaningFree, audioFree))
  }

  const usedTiles = new Set(state.slots.map((slot) => slot.tile).filter((tile): tile is number => tile !== null))
  const answering = state.status === 'answering'
  const openSlots = state.slots.filter((slot) => !slot.locked).length
  const isLast = index === words.length - 1

  /* ---------------- đặt / bỏ chữ ---------------- */

  const placeTile = useCallback(
    (tileIndex: number) => {
      setState((current) => {
        if (current.status !== 'answering') return current
        const used = new Set(current.slots.map((slot) => slot.tile))
        if (used.has(tileIndex)) return current
        const target = current.slots.findIndex((slot) => !slot.locked && slot.letter === null)
        if (target < 0) return current
        const slots = current.slots.map((slot, i) => (i === target ? { ...slot, letter: puzzle.tiles[tileIndex], tile: tileIndex } : slot))
        return { ...current, slots, retry: false }
      })
      playSound('tap')
    },
    [puzzle.tiles],
  )

  const typeLetter = useCallback(
    (letter: string) => {
      // tìm viên chữ còn trống đúng chữ này; không có -> rung nhẹ
      const tileIndex = puzzle.tiles.findIndex((tile, i) => tile === letter && !usedTiles.has(i))
      if (tileIndex < 0 || !state.slots.some((slot) => !slot.locked && slot.letter === null)) {
        setState((current) => ({ ...current, shake: current.shake + 1 }))
        return
      }
      placeTile(tileIndex)
    },
    [puzzle.tiles, usedTiles, state.slots, placeTile],
  )

  const removeAt = useCallback((slotIndex: number) => {
    setState((current) => {
      const slot = current.slots[slotIndex]
      if (current.status !== 'answering' || !slot || slot.locked || slot.letter === null) return current
      return { ...current, slots: current.slots.map((s, i) => (i === slotIndex ? { ...s, letter: null, tile: null } : s)) }
    })
  }, [])

  const backspace = useCallback(() => {
    const last = state.slots.map((slot, i) => (!slot.locked && slot.letter !== null ? i : -1)).filter((i) => i >= 0).pop()
    if (last !== undefined) removeAt(last)
  }, [state.slots, removeAt])

  const clearAll = useCallback(() => {
    setState((current) => ({ ...current, slots: current.slots.map((slot) => (slot.locked ? slot : { ...slot, letter: null, tile: null })) }))
  }, [])

  /* ---------------- kết thúc 1 từ ---------------- */

  const recordOutcome = useCallback(
    (correct: boolean, points: number) => {
      setOutcomes((list) => [...list, { word: word.word, meaningVi: word.meaningVi, imageSlug: word.imageSlug, correct, points }])
    },
    [word],
  )

  const revealAnswer = useCallback(
    (reason: RevealReason) => {
      if (state.status !== 'answering') return
      // từ đang có thẻ ôn -> chấm "again" để quay lại sớm ở /review (không tạo thẻ mới cho từ chưa học)
      const addedToReview = !!word.srsKey
      if (word.srsKey) reviewSrsCard(word.srsKey, 'again')
      setState((current) => ({
        ...current,
        status: 'revealed',
        reveal: reason,
        retry: false,
        addedToReview,
        slots: [...puzzle.answer].map((letter, i) => ({ letter, locked: true, fromHint: current.slots[i].fromHint, tile: null })),
      }))
      setStreak(0)
      recordOutcome(false, 0)
      playSound('oops')
      void speak(word.word)
    },
    [state.status, word, puzzle.answer, reviewSrsCard, recordOutcome],
  )

  const check = useCallback(() => {
    if (!answering) return
    if (state.slots.some((slot) => slot.letter === null)) {
      setState((current) => ({ ...current, shake: current.shake + 1 }))
      return
    }
    const guess = state.slots.map((slot) => slot.letter).join('')
    if (guess === puzzle.answer) {
      const timeLeftRatio = timed ? 1 - (Date.now() - state.startedAt) / (TIMED_SECONDS * 1000) : undefined
      const points = scoreWord({ difficulty, hintsUsed: state.paidHints, tryNumber: state.tryNumber, streakBefore: streak, timeLeftRatio })
      setState((current) => ({ ...current, status: 'correct', points, retry: false }))
      setScore((value) => value + points)
      setStreak((value) => {
        const next = value + 1
        setBestStreak((best) => Math.max(best, next))
        return next
      })
      recordOutcome(true, points)
      playSound(streak + 1 >= 3 ? 'streak' : 'correct')
      void speak(word.word)
      return
    }
    if (state.tryNumber < MAX_TRIES) {
      // sai lần 1: rung, trả chữ (không khoá) về bàn, cho thử lại
      playSound('oops')
      setState((current) => ({
        ...current,
        tryNumber: current.tryNumber + 1,
        retry: true,
        shake: current.shake + 1,
        slots: current.slots.map((slot) => (slot.locked ? slot : { ...slot, letter: null, tile: null })),
      }))
      return
    }
    revealAnswer('wrong')
  }, [answering, state, puzzle.answer, timed, difficulty, streak, word.word, recordOutcome, revealAnswer])

  const next = useCallback(() => {
    if (answering) return
    if (isLast) {
      onFinish({ score, correct: outcomes.filter((o) => o.correct).length, total: words.length, bestStreak, words: outcomes })
      return
    }
    setIndex((value) => value + 1)
  }, [answering, isLast, onFinish, score, outcomes, words.length, bestStreak])

  /* ---------------- gợi ý ---------------- */

  /** Mở đúng chữ ở 1 ô (khoá ô lại). Viên chữ tương ứng bị lấy khỏi bàn (nếu đang nằm ở ô sai thì gỡ ra). */
  const revealLetterAt = useCallback(
    (slotIndex: number) => {
      setState((current) => {
        const letter = puzzle.answer[slotIndex]
        let slots = current.slots.map((slot, i) => (i === slotIndex ? { ...slot, letter: null, tile: null } : slot))
        const used = new Set(slots.map((slot) => slot.tile))
        let tile = puzzle.tiles.findIndex((t, i) => t === letter && !used.has(i))
        if (tile < 0) {
          // viên chữ cần dùng đang nằm ở ô khác (sai chỗ) -> gỡ ô đó ra
          const holder = slots.findIndex((slot) => !slot.locked && slot.tile !== null && puzzle.tiles[slot.tile] === letter)
          if (holder >= 0) {
            tile = slots[holder].tile!
            slots = slots.map((slot, i) => (i === holder ? { ...slot, letter: null, tile: null } : slot))
          }
        }
        slots = slots.map((slot, i) => (i === slotIndex ? { letter, locked: true, fromHint: true, tile: tile >= 0 ? tile : null } : slot))
        return { ...current, slots, paidHints: current.paidHints + 1, retry: false }
      })
    },
    [puzzle.answer, puzzle.tiles],
  )

  /** Ô sẽ được mở bằng gợi ý chữ: Nhìn ảnh = chữ ĐẦU (1 lần); Điền chữ = ô trống đầu tiên (còn ≥ 2 ô mở) */
  const letterHintTarget = mode === 'picture' ? (state.slots[0]?.locked ? -1 : 0) : openSlots >= 2 ? state.slots.findIndex((slot) => !slot.locked) : -1

  const takeHint = useCallback(
    (kind: HintKind) => {
      if (!answering) return
      if (kind === 'letter') {
        if (letterHintTarget < 0) return
        revealLetterAt(letterHintTarget)
      } else if (kind === 'meaning') {
        if (state.meaningShown) return
        setState((current) => ({ ...current, meaningShown: true, paidHints: current.paidHints + 1 }))
      } else {
        if (!state.audioUnlocked) setState((current) => ({ ...current, audioUnlocked: true, paidHints: current.paidHints + 1 }))
        void speak(word.word)
      }
      playSound('pop')
    },
    [answering, letterHintTarget, revealLetterAt, state.meaningShown, state.audioUnlocked, word.word],
  )

  /* ---------------- đồng hồ (chế độ tính giờ) ---------------- */
  useEffect(() => {
    if (!timed || !answering) return
    const timer = window.setTimeout(() => revealAnswer('timeout'), Math.max(0, state.startedAt + TIMED_SECONDS * 1000 - Date.now()))
    return () => window.clearTimeout(timer)
  }, [timed, answering, state.startedAt, revealAnswer])

  /* ---------------- bàn phím ---------------- */
  // giữ hàm mới nhất trong ref -> chỉ gắn sự kiện 1 lần
  const keyActions = useRef({ typeLetter, backspace, clearAll, check, next, takeHint, revealAnswer, answering })
  keyActions.current = { typeLetter, backspace, clearAll, check, next, takeHint, revealAnswer, answering }
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
      const actions = keyActions.current
      const key = event.key
      if (key === 'Enter') {
        // đang đứng ở 1 nút khác (Bỏ qua, Dừng ván, gợi ý…) -> để Enter bấm đúng nút đó
        if (target?.tagName === 'BUTTON' && !target.classList.contains('wq-tile') && !target.classList.contains('wq-slot')) return
        event.preventDefault() // đứng ở viên chữ: chặn Enter "bấm" lại viên chữ -> chỉ kiểm tra
        if (actions.answering) actions.check()
        else actions.next()
      } else if (!actions.answering) {
        return
      } else if (key === 'Backspace') {
        event.preventDefault()
        actions.backspace()
      } else if (key === 'Delete') {
        actions.clearAll()
      } else if (key === 'Escape') {
        actions.revealAnswer('skip')
      } else if (key === '1') actions.takeHint('letter')
      else if (key === '2') actions.takeHint('meaning')
      else if (key === '3') actions.takeHint('audio')
      else if (/^[a-zA-Z]$/.test(key)) actions.typeLetter(key.toLowerCase())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ---------------- giao diện ---------------- */
  const meaningVisible = state.meaningShown || !answering
  const audioVisible = state.audioUnlocked || !answering
  const hintButtons: { kind: HintKind; key: string; label: string; available: boolean; done: boolean; free?: boolean }[] = [
    { kind: 'letter', key: '1', label: mode === 'picture' ? text('hintFirst') : text('hintLetter'), available: letterHintTarget >= 0, done: mode === 'picture' && letterHintTarget < 0 },
    { kind: 'meaning', key: '2', label: text('hintMeaning'), available: !state.meaningShown, done: state.meaningShown },
    { kind: 'audio', key: '3', label: text('hintAudio'), available: true, done: false, free: state.audioUnlocked },
  ]
  // Điền chữ (dễ / vừa): nghĩa đã hiện sẵn -> bỏ nút gợi ý nghĩa cho gọn
  const shownHints = hintButtons.filter((hint) => !(hint.kind === 'meaning' && meaningFree))

  const feedbackTitle =
    state.status === 'correct' ? text('correct') : state.reveal === 'timeout' ? text('timeUp') : state.reveal === 'skip' ? text('skipped') : text('wrongReveal')

  return (
    <section className={`gq-card wq-round wq-round--${mode}`} aria-label={mode === 'picture' ? text('pictureAsk') : text('missingAsk')}>
      {/* thanh trên: từ mấy / tiến độ / chuỗi / điểm */}
      <div className="gq-stage__bar">
        <span className="gq-chip ds-num">{text('roundOf', { n: index + 1, total: words.length })}</span>
        <ProgressBar className="gq-stage__progress" value={index + (answering ? 0 : 1)} max={words.length} size="sm" label={text('roundOf', { n: index + 1, total: words.length })} />
        {streak >= 2 && (
          <span className="gq-chip gq-chip--streak" key={`streak-${streak}`}>
            <GameArt slug="fire" size={18} /> {text('streak', { n: streak })}
          </span>
        )}
        <span className="gq-score">
          <span className="gq-score__label">{text('score')}</span>
          <strong className="ds-num" key={`score-${score}`}>
            {score}
          </strong>
        </span>
        <IconButton icon="close" label={text('quit')} size="sm" variant="ghost" onClick={onQuit} />
      </div>

      {timed && (answering ? <TimerBar key={`${index}-${state.startedAt}`} startedAt={state.startedAt} durationMs={TIMED_SECONDS * 1000} /> : <TimerBarIdle />)}

      {/* manh mối */}
      <div className={`wq-clue ${showPicture ? 'has-picture' : ''}`}>
        {showPicture && word.imageSlug && (
          <div className="wq-picture" key={`pic-${index}`}>
            <img src={`/word-images/${word.imageSlug}.webp`} alt={mode === 'picture' ? text('pictureAsk') : ''} width={160} height={160} draggable={false} />
          </div>
        )}
        <div className="wq-clue__text">
          <p className="wq-ask">{mode === 'picture' ? text('pictureAsk') : text('missingAsk')}</p>
          <p className={`wq-meaning ${meaningVisible ? '' : 'is-hidden'}`}>
            <span className="wq-meaning__label">{text('meaningLabel')}</span>
            {meaningVisible ? <span className="wq-meaning__text">{word.meaningVi}</span> : <span className="wq-meaning__text" aria-label={text('hintMeaning')}>· · ·</span>}
          </p>
          <div className="wq-clue__meta">
            <span className="wq-length ds-num">{text('lettersCount', { n: puzzle.answer.length })}</span>
            {audioVisible && (
              <Button variant="secondary" size="sm" iconLeft="volume" onClick={() => void speak(word.word)}>
                {text('listen')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* hàng ô chữ */}
      <div
        className={`wq-slots ${state.shake ? 'is-shaking' : ''} ${state.status === 'correct' ? 'is-correct' : ''} ${state.status === 'revealed' ? 'is-revealed' : ''}`}
        key={`slots-${index}-${state.shake}`}
        role="group"
        aria-label={text('slotsLabel')}
        style={{ '--letters': puzzle.answer.length } as CSSProperties}
      >
        {state.slots.map((slot, i) => {
          const given = puzzle.givenMask[i]
          const classes = ['wq-slot', given && 'is-given', slot.fromHint && 'is-hint', !given && slot.letter && 'is-filled', state.status === 'revealed' && !given && 'is-answer'].filter(Boolean).join(' ')
          return (
            <button
              key={i}
              type="button"
              className={classes}
              onClick={() => removeAt(i)}
              disabled={!answering || slot.locked || slot.letter === null}
              aria-label={slot.letter ? slot.letter : `${i + 1}`}
              tabIndex={-1}
            >
              {slot.letter ?? ''}
            </button>
          )
        })}
      </div>

      <p className={`wq-retry ${state.retry ? 'is-visible' : ''}`} role="status">
        {state.retry ? text('wrongRetry') : ''}
      </p>

      {answering ? (
        <>
          {/* bàn viên chữ */}
          <div className="wq-tiles" role="group" aria-label={text('tilesLabel')}>
            {puzzle.tiles.map((tile, i) => (
              <button key={i} type="button" className={`wq-tile ${usedTiles.has(i) ? 'is-used' : ''}`} onClick={() => placeTile(i)} disabled={usedTiles.has(i)} aria-label={tile}>
                {tile}
              </button>
            ))}
          </div>

          {/* gợi ý + hành động */}
          <div className="wq-actions">
            <div className="wq-hints" role="group" aria-label={text('hints')}>
              {shownHints.map((hint) => (
                <button key={hint.kind} type="button" className={`wq-hint ${hint.done ? 'is-done' : ''}`} onClick={(event) => {
                    takeHint(hint.kind)
                    event.currentTarget.blur() // bỏ focus -> Enter sau đó vẫn là "Kiểm tra"
                  }} disabled={!hint.available}>
                  <Icon name={hint.kind === 'audio' ? 'volume' : hint.kind === 'meaning' ? 'eye' : 'hint'} size={18} />
                  <span className="wq-hint__text">
                    <span className="wq-hint__label">{hint.label}</span>
                    <span className="wq-hint__cost">{hint.done ? text('hintUsed') : hint.free ? text('hintFree') : text('hintCost')}</span>
                  </span>
                  <Kbd>{hint.key}</Kbd>
                </button>
              ))}
            </div>
            <div className="wq-actions__main">
              <Button variant="ghost" onClick={() => revealAnswer('skip')}>
                {text('skip')}
              </Button>
              <Button size="lg" onClick={check} disabled={state.slots.some((slot) => slot.letter === null)}>
                {text('check')} <Kbd onColor>Enter</Kbd>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={`wq-feedback ${state.status === 'correct' ? 'is-good' : 'is-oops'}`} role="status">
          <Mascot pose={state.status === 'correct' ? 'happy' : 'comfort'} size={76} />
          <div className="wq-feedback__text">
            <strong className="wq-feedback__title">{feedbackTitle}</strong>
            <span className="wq-feedback__word">
              {word.word}
              <IconButton icon="volume" label={`${text('listen')}: ${word.word}`} size="sm" onClick={() => void speak(word.word)} />
            </span>
            <span className="wq-feedback__meaning">{word.meaningVi}</span>
            {state.addedToReview && (
              <span className="wk-chip wk-chip--navy">
                <Icon name="review" size={14} /> {text('addedToReview')}
              </span>
            )}
          </div>
          {state.status === 'correct' && <span className="wq-feedback__points ds-num">+{state.points}</span>}
          <Button size="lg" onClick={next} autoFocus iconRight="arrow-right">
            {isLast ? text('finish') : text('next')} <Kbd onColor>Enter</Kbd>
          </Button>
        </div>
      )}
    </section>
  )
}
