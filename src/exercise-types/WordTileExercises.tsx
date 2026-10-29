/**
 * WordTileExercises.tsx — CÁC DẠNG BÀI "BẤM THẺ TỪ"
 *  - ArrangeWordsExercise : bấm các thẻ từ theo thứ tự để ghép thành câu
 *  - MatchPairsExercise   : bấm 1 thẻ bên trái rồi 1 thẻ bên phải để nối cặp
 */
import { useMemo, useState } from 'react'
import type { ArrangeWordsExercise as ArrangeWordsData, MatchPairsExercise as MatchPairsData } from '../content/content-types'
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import { shuffle, type ExerciseComponentProps } from './exercise-shared'

/* ----------------------------- ghép câu ------------------------------ */

export function ArrangeWordsExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<ArrangeWordsData>) {
  const { t } = useLanguage()
  // tạo danh sách thẻ (trộn ngẫu nhiên 1 lần), mỗi thẻ có id riêng vì có thể trùng chữ
  const tiles = useMemo(
    () => shuffle([...exercise.correctSentence.split(' '), ...(exercise.extraWords ?? [])]).map((word, id) => ({ id, word })),
    [exercise],
  )
  const [chosenIds, setChosenIds] = useState<number[]>([])

  function update(nextIds: number[]) {
    setChosenIds(nextIds)
    onAnswerChange(nextIds.length ? nextIds.map((id) => tiles[id].word).join(' ') : null)
  }

  return (
    <>
      <div className="exercise-instruction">{t('arrangeWords')}</div>
      <p className="exercise-prompt">🇻🇳 {exercise.translationVi}</p>
      {/* dòng câu trả lời: bấm thẻ ở đây để bỏ ra */}
      <div className="answer-line">
        {chosenIds.map((id) => (
          <button key={id} type="button" className="word-chip" disabled={isLocked} onClick={() => update(chosenIds.filter((x) => x !== id))}>
            {tiles[id].word}
          </button>
        ))}
      </div>
      {/* ngân hàng từ: bấm để thêm vào câu */}
      <div className="word-bank">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`word-chip ${chosenIds.includes(tile.id) ? 'is-used' : ''}`}
            disabled={isLocked || chosenIds.includes(tile.id)}
            onClick={() => {
              speak(tile.word, 0.9)
              update([...chosenIds, tile.id])
            }}
          >
            {tile.word}
          </button>
        ))}
      </div>
    </>
  )
}

/* ----------------------------- nối cặp ------------------------------- */

export function MatchPairsExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<MatchPairsData>) {
  const { pick } = useLanguage()
  // trộn riêng 2 cột để người học phải tự tìm
  const leftColumn = useMemo(() => shuffle(exercise.pairs.map((pair, index) => ({ index, text: pair.left }))), [exercise])
  const rightColumn = useMemo(() => shuffle(exercise.pairs.map((pair, index) => ({ index, text: pair.right }))), [exercise])

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([]) // các cặp đã nối đúng
  const [wrongFlash, setWrongFlash] = useState<{ left: number; right: number } | null>(null)
  const [wrongAttempts, setWrongAttempts] = useState(0)

  /** Khi đã chọn đủ 1 trái + 1 phải thì kiểm tra cặp đó. */
  function tryMatch(left: number | null, right: number | null) {
    if (left === null || right === null) return
    if (left === right) {
      const nextMatched = [...matched, left]
      setMatched(nextMatched)
      if (nextMatched.length === exercise.pairs.length) onAnswerChange(String(wrongAttempts))
    } else {
      setWrongAttempts((n) => n + 1)
      setWrongFlash({ left, right })
      window.setTimeout(() => setWrongFlash(null), 450)
    }
    setSelectedLeft(null)
    setSelectedRight(null)
  }

  const chipClass = (side: 'left' | 'right', index: number) => {
    if (matched.includes(index)) return 'word-chip is-matched'
    if (wrongFlash && wrongFlash[side] === index) return 'word-chip is-wrong'
    if ((side === 'left' ? selectedLeft : selectedRight) === index) return 'word-chip is-selected'
    return 'word-chip'
  }

  return (
    <>
      <div className="exercise-instruction">{pick(exercise.instruction)}</div>
      <div className="match-columns">
        {leftColumn.map((left, row) => (
          <div key={`row-${row}`} style={{ display: 'contents' }}>
            <button
              type="button"
              className={chipClass('left', left.index)}
              disabled={isLocked || matched.includes(left.index)}
              onClick={() => {
                setSelectedLeft(left.index)
                tryMatch(left.index, selectedRight)
              }}
            >
              {left.text}
            </button>
            <button
              type="button"
              className={chipClass('right', rightColumn[row].index)}
              disabled={isLocked || matched.includes(rightColumn[row].index)}
              onClick={() => {
                setSelectedRight(rightColumn[row].index)
                tryMatch(selectedLeft, rightColumn[row].index)
              }}
            >
              {rightColumn[row].text}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
