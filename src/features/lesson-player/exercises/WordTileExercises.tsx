/**
 * WordTileExercises.tsx — CÁC DẠNG BÀI "THẺ TỪ"
 * ----------------------------------------------------------------------------
 *   ArrangeWordsExercise : ghép các thẻ từ thành câu đúng
 *       - BẤM thẻ ở ngân hàng từ -> thẻ bay lên dòng trả lời; bấm thẻ trên dòng -> trả về.
 *       - KÉO THẢ (tuỳ chọn): kéo thẻ vào đúng chỗ muốn chèn, kéo để đổi thứ tự,
 *         kéo ngược xuống ngân hàng để bỏ.
 *       - Phím Backspace: bỏ thẻ cuối cùng.
 *       - Thẻ đã dùng để lại "chỗ trống" mờ ở ngân hàng -> bố cục không nhảy.
 *   MatchPairsExercise   : bấm 1 thẻ trái rồi 1 thẻ phải để nối cặp; nối hết thì tự kiểm tra.
 *
 * Thẻ kiểu "vinyl": nền trắng bo tròn, bóng mềm phía dưới (KHÔNG đế dày kiểu Duolingo).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import type { ArrangeWordsExercise as ArrangeWordsData, MatchPairsExercise as MatchPairsData } from '../../../content/content-types'
import { Icon } from '../../../design-system/components/Icon'
import { playSound } from '../../../design-system/sound-kit'
import { speak } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import { useLessonText } from '../lesson-player-text'
import { diffAgainstCorrect } from './answer-diff'
import type { ExerciseViewProps } from './exercise-contract'
import { ExerciseHeading } from './ExerciseHeading'
import { arrangePrefixCount, revealedPairs } from './hint-ladder'
import { seededShuffle } from './option-order'

/* ================================ GHÉP CÂU ================================ */

interface Tile {
  id: number
  word: string
}

/** Dữ liệu kéo thả: thẻ nào, đang ở đâu */
type DragSource = { tileId: number; from: 'bank' | 'answer' }

export function ArrangeWordsExercise({ exercise, outcome, hintLevel, attempt = 0, onAnswerChange }: ExerciseViewProps<ArrangeWordsData>) {
  const text = useLessonText()
  const correctWords = useMemo(() => exercise.correctSentence.split(' '), [exercise.correctSentence])
  // thẻ trộn CỐ ĐỊNH theo id (mở lại bài vẫn cùng thứ tự); mỗi thẻ có id riêng vì có thể trùng chữ
  const tiles = useMemo<Tile[]>(
    () => seededShuffle(attempt ? `${exercise.id}#${attempt}` : exercise.id, [...correctWords, ...(exercise.extraWords ?? [])]).map((word, id) => ({ id, word })),
    [exercise.id, exercise.extraWords, correctWords, attempt],
  )
  const [chosen, setChosen] = useState<number[]>([])
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragSource = useRef<DragSource | null>(null)
  const isLocked = !!outcome

  /** id các thẻ ứng với N từ đầu của câu đúng (dùng cho gợi ý / lời giải) */
  const prefixIds = useMemo(() => {
    const count = arrangePrefixCount(exercise, outcome?.sawSolution ? 3 : hintLevel)
    const used = new Set<number>()
    return correctWords.slice(0, count).map((word) => {
      const tile = tiles.find((t) => t.word === word && !used.has(t.id))!
      used.add(tile.id)
      return tile.id
    })
  }, [exercise, hintLevel, outcome?.sawSolution, correctWords, tiles])

  // gợi ý mở thêm nấc -> xếp sẵn các từ đầu câu (giữ lại phần người học đã xếp phía sau)
  useEffect(() => {
    if (prefixIds.length === 0) return
    setChosen((current) => {
      const rest = current.filter((id) => !prefixIds.includes(id))
      // xem lời giải -> chỉ còn câu đúng; gợi ý -> giữ phần người học đã xếp phía sau
      return outcome?.sawSolution ? prefixIds : [...prefixIds, ...rest]
    })
  }, [prefixIds, outcome?.sawSolution])

  function update(next: number[]) {
    setChosen(next)
    onAnswerChange(next.length ? next.map((id) => tiles[id].word).join(' ') : null)
  }

  // báo câu trả lời sau khi gợi ý xếp sẵn
  useEffect(() => {
    if (prefixIds.length && !isLocked) onAnswerChange(chosen.length ? chosen.map((id) => tiles[id].word).join(' ') : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosen])

  const lockedCount = prefixIds.length
  const place = (id: number, at?: number) => {
    if (isLocked || chosen.includes(id)) return
    speak(tiles[id].word, 0.9)
    playSound('tap')
    const next = [...chosen]
    next.splice(Math.max(lockedCount, at ?? next.length), 0, id)
    update(next)
  }
  const remove = (id: number) => {
    if (isLocked || prefixIds.includes(id)) return
    playSound('tap')
    update(chosen.filter((x) => x !== id))
  }

  // Backspace = bỏ thẻ cuối
  useEffect(() => {
    if (isLocked) return
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (event.key !== 'Backspace' || target.closest('input, textarea, [role="dialog"]')) return
      const last = chosen.at(-1)
      if (last === undefined || prefixIds.includes(last)) return
      event.preventDefault()
      remove(last)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* ----- kéo thả (HTML5 drag & drop) ----- */
  const onDragStart = (source: DragSource) => (event: DragEvent) => {
    dragSource.current = source
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(source.tileId))
  }
  const dropOnAnswer = (index: number) => (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setDragOverIndex(null)
    const source = dragSource.current
    dragSource.current = null
    if (!source || isLocked) return
    if (source.from === 'bank') return place(source.tileId, index)
    // đổi chỗ trong dòng trả lời
    if (prefixIds.includes(source.tileId)) return
    const without = chosen.filter((id) => id !== source.tileId)
    const fromIndex = chosen.indexOf(source.tileId)
    const target = fromIndex < index ? index - 1 : index
    without.splice(Math.max(lockedCount, target), 0, source.tileId)
    update(without)
  }
  const dropOnBank = (event: DragEvent) => {
    event.preventDefault()
    const source = dragSource.current
    dragSource.current = null
    if (source?.from === 'answer') remove(source.tileId)
  }

  // tô màu sau khi kiểm tra: từ nằm sai chỗ / thừa = cam san hô
  const userWords = chosen.map((id) => tiles[id].word)
  const wrongPositions = useMemo(() => {
    if (!outcome || outcome.verdict === 'correct' || outcome.sawSolution) return new Set<number>()
    // từ của NGƯỜI HỌC không nằm trong dãy chung với câu đúng
    const tokens = diffAgainstCorrect(exercise.correctSentence, userWords.join(' '))
    return new Set(tokens.map((token, index) => (token.differs ? index : -1)).filter((index) => index >= 0))
  }, [outcome, exercise.correctSentence, userWords])

  return (
    <>
      <ExerciseHeading icon="sparkle">{text.instrArrange}</ExerciseHeading>
      <div className="lp-translate">
        <span className="lp-translate__flag" aria-hidden>
          VI
        </span>
        <span className="lp-translate__text">{exercise.translationVi}</span>
      </div>

      {/* dòng trả lời: 2 vạch kẻ như vở, thẻ nằm trên vạch */}
      <div
        className={['lp-answer-line', dragOverIndex !== null && 'is-drag-over', isLocked && `is-${outcome.sawSolution ? 'solution' : outcome.verdict}`].filter(Boolean).join(' ')}
        onDragOver={(event) => {
          if (isLocked) return
          event.preventDefault()
          if (dragOverIndex === null) setDragOverIndex(chosen.length)
        }}
        onDragLeave={() => setDragOverIndex(null)}
        onDrop={dropOnAnswer(chosen.length)}
        aria-label={text.instrArrange}
      >
        {chosen.length === 0 && !isLocked && <span className="lp-answer-line__empty">{text.arrangeEmpty}</span>}
        {chosen.map((id, index) => {
          const isHinted = prefixIds.includes(id)
          const state = isLocked ? (outcome.sawSolution ? 'is-solution' : wrongPositions.has(index) ? 'is-wrong' : 'is-right') : isHinted ? 'is-hinted' : ''
          return (
            <button
              key={id}
              type="button"
              className={['lp-tile', 'lp-tile--placed', state, dragOverIndex === index && 'is-insert-before'].filter(Boolean).join(' ')}
              disabled={isLocked || isHinted}
              draggable={!isLocked && !isHinted}
              onDragStart={onDragStart({ tileId: id, from: 'answer' })}
              onDragOver={(event) => {
                if (isLocked) return
                event.preventDefault()
                event.stopPropagation()
                setDragOverIndex(index)
              }}
              onDrop={dropOnAnswer(index)}
              onClick={(event) => {
                remove(id)
                if (event.detail > 0) event.currentTarget.blur()
              }}
            >
              {tiles[id].word}
            </button>
          )
        })}
      </div>

      {/* ngân hàng từ */}
      <div className="lp-bank" onDragOver={(event) => event.preventDefault()} onDrop={dropOnBank}>
        {tiles.map((tile) => {
          const used = chosen.includes(tile.id)
          return used ? (
            <span key={tile.id} className="lp-tile lp-tile--ghost" aria-hidden>
              {tile.word}
            </span>
          ) : (
            <button
              key={tile.id}
              type="button"
              className="lp-tile"
              disabled={isLocked}
              draggable={!isLocked}
              onDragStart={onDragStart({ tileId: tile.id, from: 'bank' })}
              onClick={(event) => {
                place(tile.id)
                if (event.detail > 0) event.currentTarget.blur()
              }}
            >
              {tile.word}
            </button>
          )
        })}
      </div>
      {!isLocked && chosen.length > lockedCount && (
        <p className="lp-key-note" aria-hidden>
          <kbd className="ds-kbd">Backspace</kbd> {text.arrangeBackspace}
        </p>
      )}
    </>
  )
}

/* ================================ NỐI CẶP ================================ */

export function MatchPairsExercise({ exercise, outcome, hintLevel, attempt = 0, onSubmit }: ExerciseViewProps<MatchPairsData>) {
  const text = useLessonText()
  const { pick } = useLanguage()
  // trộn riêng 2 cột (cố định theo id) để người học phải tự tìm
  const leftColumn = useMemo(() => seededShuffle(`${exercise.id}-L${attempt}`, exercise.pairs.map((pair, index) => ({ index, text: pair.left }))), [exercise, attempt])
  const rightColumn = useMemo(() => seededShuffle(`${exercise.id}-R${attempt}`, exercise.pairs.map((pair, index) => ({ index, text: pair.right }))), [exercise, attempt])

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [justMatched, setJustMatched] = useState<number | null>(null)
  const [wrongFlash, setWrongFlash] = useState<{ left: number; right: number } | null>(null)
  const [wrongCount, setWrongCount] = useState(0)
  const [missed, setMissed] = useState<number[]>([])
  const submitted = useRef(false)
  const isLocked = !!outcome

  // gợi ý: nối sẵn vài cặp
  const hinted = revealedPairs(exercise, outcome?.sawSolution ? 3 : hintLevel)
  useEffect(() => {
    if (hinted.length === 0) return
    setMatched((current) => [...new Set([...current, ...hinted])])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hinted.join(',')])

  // nối hết -> tự kiểm tra (không bắt bấm thêm nút)
  useEffect(() => {
    if (isLocked || submitted.current || matched.length !== exercise.pairs.length) return
    submitted.current = true
    const timer = window.setTimeout(() => onSubmit(`${wrongCount}|${missed.join(',')}`), 380)
    return () => window.clearTimeout(timer)
  }, [matched, exercise.pairs.length, isLocked, onSubmit, wrongCount, missed])

  function tryMatch(left: number | null, right: number | null) {
    if (left === null || right === null) return
    if (left === right) {
      setMatched((current) => [...current, left])
      setJustMatched(left)
      playSound('pop')
      window.setTimeout(() => setJustMatched((value) => (value === left ? null : value)), 520)
    } else {
      setWrongCount((n) => n + 1)
      setMissed((current) => [...new Set([...current, left])])
      setWrongFlash({ left, right })
      playSound('oops')
      window.setTimeout(() => setWrongFlash(null), 460)
    }
    setSelectedLeft(null)
    setSelectedRight(null)
  }

  const tileState = (side: 'left' | 'right', index: number) => {
    if (matched.includes(index)) return justMatched === index ? 'is-just-matched' : 'is-matched'
    if (wrongFlash && wrongFlash[side] === index) return 'is-wrong'
    if ((side === 'left' ? selectedLeft : selectedRight) === index) return 'is-selected'
    return ''
  }

  return (
    <>
      <ExerciseHeading icon="sparkle">{pick(exercise.instruction)}</ExerciseHeading>
      <p className="lp-match-meta">
        <span>{text.matchHint}</span>
        <span className="lp-match-meta__count">{text.matchedCount(matched.length, exercise.pairs.length)}</span>
      </p>
      <div className="lp-match">
        {leftColumn.map((left, row) => {
          const right = rightColumn[row]
          return (
            <div key={row} className="lp-match__row">
              <button
                type="button"
                className={`lp-tile lp-tile--match ${tileState('left', left.index)}`}
                disabled={isLocked || matched.includes(left.index)}
                onClick={(event) => {
                  setSelectedLeft(left.index)
                  tryMatch(left.index, selectedRight)
                  if (event.detail > 0) event.currentTarget.blur()
                }}
              >
                {matched.includes(left.index) && <Icon name="check" size={16} strokeWidth={3} />}
                <span>{left.text}</span>
              </button>
              <button
                type="button"
                className={`lp-tile lp-tile--match lp-tile--right ${tileState('right', right.index)}`}
                disabled={isLocked || matched.includes(right.index)}
                onClick={(event) => {
                  setSelectedRight(right.index)
                  tryMatch(selectedLeft, right.index)
                  if (event.detail > 0) event.currentTarget.blur()
                }}
              >
                {matched.includes(right.index) && <Icon name="check" size={16} strokeWidth={3} />}
                <span>{right.text}</span>
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
