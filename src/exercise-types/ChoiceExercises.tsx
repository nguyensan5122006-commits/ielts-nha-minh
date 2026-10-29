/**
 * ChoiceExercises.tsx — CÁC DẠNG BÀI "CHỌN ĐÁP ÁN"
 *  - MultipleChoiceExercise : đọc câu hỏi, chọn 1 đáp án
 *  - ListenChooseExercise   : nghe rồi chọn
 *  - TrueFalseExercise      : Đúng / Sai / Không có thông tin
 * Có phím tắt: bấm 1, 2, 3, 4 để chọn nhanh.
 */
import { useEffect, useMemo, useState } from 'react'
import type {
  ListenChooseExercise as ListenChooseData,
  MultipleChoiceExercise as MultipleChoiceData,
  TrueFalseExercise as TrueFalseData,
} from '../content/content-types'
import { SpeakerButton } from '../components/SpeakerButton'
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import { stableOptionOrder, type ExerciseComponentProps } from './exercise-shared'

/* --------------------- danh sách lựa chọn dùng chung --------------------- */

interface OptionListProps {
  options: string[]
  selectedIndex: number | null
  correctIndex: number | null // null = không tô màu đúng/sai
  isLocked: boolean
  onSelect: (index: number) => void // luôn trả về vị trí GỐC của đáp án
  /** có giá trị -> xáo thứ tự hiển thị (cố định theo chuỗi này, thường là id bài tập) */
  shuffleSeed?: string
}

function OptionList({ options, selectedIndex, correctIndex, isLocked, onSelect, shuffleSeed }: OptionListProps) {
  // displayOrder[vị trí hiển thị] = vị trí gốc
  const displayOrder = useMemo(
    () => (shuffleSeed ? stableOptionOrder(shuffleSeed, options) : options.map((_, i) => i)),
    [shuffleSeed, options],
  )

  // phím tắt 1..n (theo thứ tự đang hiển thị)
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (isLocked || (event.target as HTMLElement).tagName === 'INPUT') return
      const index = Number(event.key) - 1
      if (index >= 0 && index < options.length) onSelect(displayOrder[index])
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isLocked, options.length, onSelect, displayOrder])

  const useTwoColumns = options.every((option) => option.length < 28) && options.length === 4

  return (
    <div className={`option-list ${useTwoColumns ? 'option-list--two-columns' : ''}`}>
      {displayOrder.map((index, position) => {
        const option = options[index]
        let stateClass = index === selectedIndex ? 'is-selected' : ''
        if (isLocked && correctIndex !== null) {
          if (index === correctIndex) stateClass = 'is-correct'
          else if (index === selectedIndex) stateClass = 'is-wrong'
        }
        return (
          <button key={index} type="button" className={`option-button ${stateClass}`} disabled={isLocked} onClick={() => onSelect(index)}>
            <span className="option-button__key">{position + 1}</span>
            <span>{option}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------ chọn đáp án ------------------------------ */

export function MultipleChoiceExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<MultipleChoiceData>) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  const select = (index: number) => {
    setSelected(index)
    onAnswerChange(String(index))
  }
  return (
    <>
      <div className="exercise-instruction">{t('chooseAnswer')}</div>
      <p className="exercise-prompt">{exercise.question}</p>
      <OptionList options={exercise.options} selectedIndex={selected} correctIndex={exercise.correctIndex} isLocked={isLocked} onSelect={select} shuffleSeed={exercise.id} />
    </>
  )
}

/* ------------------------------ nghe và chọn ----------------------------- */

export function ListenChooseExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<ListenChooseData>) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState<number | null>(null)
  // tự phát âm thanh 1 lần khi mở bài
  useEffect(() => {
    speak(exercise.audioText)
  }, [exercise.audioText])
  const select = (index: number) => {
    setSelected(index)
    onAnswerChange(String(index))
  }
  return (
    <>
      <div className="exercise-instruction">{t('listenAndChoose')}</div>
      <SpeakerButton text={exercise.audioText} />
      <p className="exercise-prompt">{exercise.question}</p>
      <OptionList options={exercise.options} selectedIndex={selected} correctIndex={exercise.correctIndex} isLocked={isLocked} onSelect={select} shuffleSeed={exercise.id} />
      {isLocked && (
        <details style={{ marginTop: 16 }}>
          <summary className="small muted">Script</summary>
          <p className="small" style={{ whiteSpace: 'pre-line', marginTop: 6 }}>
            {exercise.audioText}
          </p>
        </details>
      )}
    </>
  )
}

/* ------------------------------ đúng / sai ------------------------------- */

export function TrueFalseExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<TrueFalseData>) {
  const { t } = useLanguage()
  const choices: TrueFalseData['answer'][] = exercise.allowNotGiven ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['TRUE', 'FALSE']
  const [selected, setSelected] = useState<number | null>(null)
  const select = (index: number) => {
    setSelected(index)
    onAnswerChange(choices[index])
  }
  return (
    <>
      <div className="exercise-instruction">{t('trueFalse')}</div>
      <p className="exercise-prompt">
        <strong>{exercise.statement}</strong>
      </p>
      <OptionList options={choices} selectedIndex={selected} correctIndex={choices.indexOf(exercise.answer)} isLocked={isLocked} onSelect={select} />
    </>
  )
}
