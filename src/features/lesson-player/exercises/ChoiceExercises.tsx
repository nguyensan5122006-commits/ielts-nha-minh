/**
 * ChoiceExercises.tsx — CÁC DẠNG BÀI "CHỌN ĐÁP ÁN"
 * ----------------------------------------------------------------------------
 *   MultipleChoiceExercise : đọc câu hỏi, chọn 1 đáp án
 *   ListenChooseExercise   : nghe rồi chọn (tự phát 1 lần, Space/R nghe lại)
 *   TrueFalseExercise      : TRUE / FALSE (/ NOT GIVEN) — kiểu IELTS Reading
 *
 * Đáp án = thẻ AnswerOption (mẫu .sg-answer của hệ thiết kế) có phím số 1–4 ở đầu (spec 04 mục 8).
 * Sau khi kiểm tra: đáp án đúng chuyển XANH ngay trong danh sách (kể cả khi
 * người học chọn sai), đáp án đã chọn sai viền cam san hô — không tô đỏ cả khung.
 * Gợi ý nấc 1–2: vài đáp án sai bị "loại" (mờ đi, gạch ngang, không bấm được).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { ListenChooseExercise as ListenChooseData, MultipleChoiceExercise as MultipleChoiceData, TrueFalseExercise as TrueFalseData } from '../../../content/content-types'
import { Icon } from '../../../design-system/components/Icon'
import { AnswerOption, type AnswerOptionState } from './AnswerOption'
import { playSound } from '../../../design-system/sound-kit'
import { stableOptionOrder } from './option-order'
import { useLessonText } from '../lesson-player-text'
import type { CheckOutcome, ExerciseViewProps } from './exercise-contract'
import { eliminatedOptions, eliminatedTrueFalse } from './hint-ladder'
import { ListenHero } from './ListenHero'
import { ExerciseHeading, PromptText } from './ExerciseHeading'

/* ======================= DANH SÁCH ĐÁP ÁN DÙNG CHUNG ======================= */

interface ChoiceItem {
  /** giá trị gửi lên khi chọn (vị trí gốc "2" hoặc "TRUE") */
  value: string
  label: ReactNode
  /** dòng phụ nhỏ dưới nhãn (VD "Đúng" dưới TRUE) */
  sublabel?: string
  /** chữ thuần để đo độ dài (chọn 1 hay 2 cột) */
  plain: string
}

interface ChoiceListProps {
  items: ChoiceItem[]
  selected: string | null
  /** giá trị đúng — chỉ dùng để tô màu SAU khi kiểm tra */
  correctValue: string
  outcome: CheckOutcome | null
  /** giá trị bị loại bởi gợi ý */
  eliminated: string[]
  onSelect: (value: string) => void
  /** xếp thành 1 hàng ngang (Đúng / Sai / Không có thông tin) */
  inRow?: boolean
}

export function ChoiceList({ items, selected, correctValue, outcome, eliminated, onSelect, inRow = false }: ChoiceListProps) {
  const isLocked = !!outcome

  // phím 1..n chọn theo thứ tự đang hiển thị
  useEffect(() => {
    if (isLocked) return
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (event.ctrlKey || event.metaKey || event.altKey || target.closest('input, textarea, [contenteditable="true"], [role="dialog"]')) return
      const index = Number(event.key) - 1
      if (!Number.isInteger(index) || index < 0 || index >= items.length) return
      const item = items[index]
      if (eliminated.includes(item.value)) return
      event.preventDefault()
      onSelect(item.value)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isLocked, items, eliminated, onSelect])

  // 4 đáp án ngắn -> lưới 2 cột cho gọn mắt
  const twoColumns = items.length === 4 && items.every((item) => item.plain.length <= 26)

  return (
    <div
      className={['lp-choices', twoColumns && 'lp-choices--grid', inRow && 'lp-choices--row'].filter(Boolean).join(' ')}
      style={inRow ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined}
      role="radiogroup"
    >
      {items.map((item, position) => {
        const isSelected = item.value === selected
        let state: AnswerOptionState = isSelected ? 'selected' : eliminated.includes(item.value) ? 'eliminated' : 'idle'
        if (isLocked) {
          // đáp án đúng luôn XANH ngay trong danh sách (kể cả khi người học chọn sai)
          if (item.value === correctValue && (outcome.verdict === 'correct' || outcome.verdict === 'wrong')) state = 'correct'
          else if (isSelected) state = 'oops'
          else state = 'dim'
        }
        return (
          <AnswerOption
            key={item.value}
            keyLabel={String(position + 1)}
            state={state}
            sublabel={item.sublabel}
            layout={inRow ? 'tile' : 'row'}
            disabled={isLocked}
            order={position}
            onClick={(event) => {
              onSelect(item.value)
              // bấm bằng chuột -> bỏ focus để phím Enter quay về "Kiểm tra"
              if (event.detail > 0) event.currentTarget.blur()
            }}
          >
            {item.label}
          </AnswerOption>
        )
      })}
    </div>
  )
}

/** State "đáp án đang chọn" — khi xem lời giải thì tự chọn đáp án đúng. */
function useChoice(onAnswerChange: (answer: string | null) => void, outcome: CheckOutcome | null, solutionValue: string) {
  const [selected, setSelected] = useState<string | null>(null)
  const select = (value: string) => {
    if (value !== selected) playSound('tap')
    setSelected(value)
    onAnswerChange(value)
  }
  return { selected: outcome?.sawSolution ? solutionValue : selected, select }
}

/* ============================ CHỌN ĐÁP ÁN ĐÚNG ============================ */

export function MultipleChoiceExercise({ exercise, outcome, hintLevel, attempt, onAnswerChange }: ExerciseViewProps<MultipleChoiceData>) {
  const text = useLessonText()
  const { selected, select } = useChoice(onAnswerChange, outcome, String(exercise.correctIndex))
  const items = useOptionItems(attempt ? `${exercise.id}#${attempt}` : exercise.id, exercise.options)
  const eliminated = eliminatedOptions(exercise, hintLevel).map(String)

  return (
    <>
      <ExerciseHeading icon="sparkle">{text.instrChoose}</ExerciseHeading>
      <PromptText text={exercise.question} />
      <ChoiceList items={items} selected={selected} correctValue={String(exercise.correctIndex)} outcome={outcome} eliminated={eliminated} onSelect={select} />
    </>
  )
}

/** Đáp án xáo thứ tự cố định theo id câu (mở lại vẫn cùng thứ tự). */
function useOptionItems(seed: string, options: string[]): ChoiceItem[] {
  return useMemo(() => stableOptionOrder(seed, options).map((index) => ({ value: String(index), label: options[index], plain: options[index] })), [seed, options])
}

/* =============================== NGHE VÀ CHỌN =============================== */

export function ListenChooseExercise({ exercise, outcome, hintLevel, attempt, onAnswerChange }: ExerciseViewProps<ListenChooseData>) {
  const text = useLessonText()
  const { selected, select } = useChoice(onAnswerChange, outcome, String(exercise.correctIndex))
  const items = useOptionItems(attempt ? `${exercise.id}#${attempt}` : exercise.id, exercise.options)
  const eliminated = eliminatedOptions(exercise, hintLevel).map(String)

  return (
    <>
      <ExerciseHeading icon="volume">{text.instrListenChoose}</ExerciseHeading>
      <div className="lp-listen-row">
        <ListenHero text={exercise.audioText} autoPlay size="xl" />
        <PromptText text={exercise.question} compact />
      </div>
      <ChoiceList items={items} selected={selected} correctValue={String(exercise.correctIndex)} outcome={outcome} eliminated={eliminated} onSelect={select} />
      {/* sau khi kiểm tra: hiện lời thoại để người học đối chiếu điều vừa nghe */}
      {outcome && (
        <p className="lp-transcript">
          <Icon name="volume" size={16} />
          <span>{exercise.audioText}</span>
        </p>
      )}
    </>
  )
}

/* ================================ ĐÚNG / SAI ================================ */

export function TrueFalseExercise({ exercise, outcome, hintLevel, onAnswerChange }: ExerciseViewProps<TrueFalseData>) {
  const text = useLessonText()
  const { selected, select } = useChoice(onAnswerChange, outcome, exercise.answer)
  const choices: TrueFalseData['answer'][] = exercise.allowNotGiven ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['TRUE', 'FALSE']
  const sub: Record<TrueFalseData['answer'], string> = { TRUE: text.tfTrue, FALSE: text.tfFalse, 'NOT GIVEN': text.tfNotGiven }
  const items: ChoiceItem[] = choices.map((choice) => ({ value: choice, label: choice, sublabel: sub[choice], plain: choice }))

  return (
    <>
      <ExerciseHeading icon="check">{exercise.allowNotGiven ? text.instrTrueFalseNg : text.instrTrueFalse}</ExerciseHeading>
      <blockquote className="lp-statement">{exercise.statement}</blockquote>
      <ChoiceList items={items} selected={selected} correctValue={exercise.answer} outcome={outcome} eliminated={eliminatedTrueFalse(exercise, hintLevel)} onSelect={select} inRow />
    </>
  )
}
