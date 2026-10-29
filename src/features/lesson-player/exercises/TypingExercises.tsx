/**
 * TypingExercises.tsx — CÁC DẠNG BÀI "GÕ CHỮ"
 * ----------------------------------------------------------------------------
 *   FillBlankExercise  : điền từ vào chỗ trống "___" ngay trong câu
 *   ListenTypeExercise : nghe rồi gõ lại cả câu (chính tả — kiểu DOL)
 *
 * - Ô gõ tự nhận con trỏ, Enter = Kiểm tra (trang cha xử lý).
 * - Câu gõ đầu tiên của buổi học: mẹo "Tắt bộ gõ tiếng Việt (Unikey)".
 *   Gõ ra chữ có dấu (ê, ơ, đ…) -> mẹo tự hiện lại, nói rõ nguyên nhân.
 * - Sai chính tả nhỏ 1 ký tự vẫn tính đúng (chấm ở exercise-contract.ts).
 * - Xem lời giải: ô tự điền đáp án, viền xanh.
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import type { FillBlankExercise as FillBlankData, ListenTypeExercise as ListenTypeData } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { useLessonText } from '../lesson-player-text'
import { looksLikeVietnameseIme } from './answer-diff'
import type { CheckOutcome, ExerciseViewProps } from './exercise-contract'
import { ExerciseHeading } from './ExerciseHeading'
import { ListenHero } from './ListenHero'

/* ------------------------- mẹo tắt bộ gõ tiếng Việt ------------------------- */

function TypingTip({ visible, detected, onDismiss }: { visible: boolean; detected: boolean; onDismiss: () => void }) {
  const text = useLessonText()
  if (!visible && !detected) return null
  return (
    <div className={['lp-typing-tip', detected && 'is-detected'].filter(Boolean).join(' ')} role="note">
      <span className="lp-typing-tip__icon" aria-hidden>
        ⌨️
      </span>
      <div className="lp-typing-tip__body">
        <strong>{text.unikeyTitle}</strong>
        <span>{detected ? text.unikeyDetected : text.unikeyText}</span>
      </div>
      {!detected && (
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          {text.gotIt}
        </Button>
      )}
    </div>
  )
}

/** Trạng thái ô gõ: viền theo kết quả. */
function inputState(outcome: CheckOutcome | null): string {
  if (!outcome) return ''
  if (outcome.sawSolution) return 'is-solution'
  return outcome.verdict === 'correct' ? 'is-correct' : 'is-wrong'
}

/* ================================ ĐIỀN TỪ ================================ */

export function FillBlankExercise({ exercise, outcome, onAnswerChange, showTypingTip, onDismissTypingTip }: ExerciseViewProps<FillBlankData>) {
  const text = useLessonText()
  const [value, setValue] = useState('')
  const [before, after = ''] = exercise.sentence.split('___')
  const answerLength = Math.max(...exercise.acceptedAnswers.map((answer) => answer.length))
  const shown = outcome?.sawSolution ? exercise.acceptedAnswers[0] : value
  const detected = looksLikeVietnameseIme(value)

  return (
    <>
      <ExerciseHeading icon="sparkle">{text.instrFillBlank}</ExerciseHeading>
      <p className="lp-fill">
        <span>{before}</span>
        <input
          className={`lp-fill__input ${inputState(outcome)}`}
          // ô rộng theo độ dài đáp án (đơn vị ch = bề rộng 1 chữ số) — không lộ đáp án vì cộng thêm khoảng dư
          style={{ width: `${Math.max(5, answerLength + 3)}ch` }}
          value={shown}
          disabled={!!outcome}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label={text.instrFillBlank}
          onChange={(event) => {
            setValue(event.target.value)
            onAnswerChange(event.target.value.trim() ? event.target.value : null)
          }}
        />
        <span>{after}</span>
      </p>
      {exercise.hint && (
        <p className="lp-clue">
          <Icon name="hint" size={16} /> {exercise.hint}
        </p>
      )}
      <TypingTip visible={showTypingTip && !outcome} detected={!outcome && detected} onDismiss={onDismissTypingTip} />
    </>
  )
}

/* ============================ NGHE VÀ GÕ LẠI ============================ */

export function ListenTypeExercise({ exercise, outcome, onAnswerChange, showTypingTip, onDismissTypingTip }: ExerciseViewProps<ListenTypeData>) {
  const text = useLessonText()
  const [value, setValue] = useState('')
  const shown = outcome?.sawSolution ? exercise.acceptedAnswers[0] : value
  const detected = looksLikeVietnameseIme(value)

  return (
    <>
      <ExerciseHeading icon="volume">{text.instrListenType}</ExerciseHeading>
      <div className="lp-dictation">
        <ListenHero text={exercise.audioText} autoPlay size="xl" keyLabel="Ctrl + Space" />
        <input
          className={`lp-dictation__input ${inputState(outcome)}`}
          value={shown}
          disabled={!!outcome}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={text.typeSentenceHere}
          aria-label={text.instrListenType}
          onChange={(event) => {
            setValue(event.target.value)
            onAnswerChange(event.target.value.trim() ? event.target.value : null)
          }}
        />
      </div>
      <TypingTip visible={showTypingTip && !outcome} detected={!outcome && detected} onDismiss={onDismissTypingTip} />
    </>
  )
}
