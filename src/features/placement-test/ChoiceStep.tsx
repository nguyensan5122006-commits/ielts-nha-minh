/**
 * ChoiceStep.tsx — BƯỚC 1 CỦA /start: "Bạn học để làm gì?" (1 màn duy nhất)
 * ----------------------------------------------------------------------------
 * 1 câu hỏi chọn mục tiêu (psych-adult D2 luật 1: bắt đầu học trong ≤ 2 bước):
 * Tiếng Anh tổng quát hoặc Luyện thi IELTS. Mọi tài khoản như nhau — không hỏi tuổi.
 * Thẻ lớn có ảnh 3D + cún hỏi trong bong bóng thoại (ý Mochi / Brilliant, làm lại kiểu mình).
 * Chọn xong -> nút chính "Bắt đầu bài xếp lớp" sáng lên (Enter cũng được).
 * Link phụ "Tôi mới bắt đầu từ con số 0" -> bỏ qua bài, vào thẳng Level 1.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState, type KeyboardEvent } from 'react'
import type { TrackId } from '../../content/content-types'
import { Button, Icon, Mascot, Stepper, WordImage } from '../../design-system'
import type { PlacementSetup } from './placement-storage'
import { usePlacementText } from './placement-text'

export interface ChoiceStepProps {
  onStartTest: (setup: PlacementSetup) => void
  onStartFromZero: (setup: PlacementSetup) => void
}

interface ChoiceCardProps {
  selected: boolean
  onSelect: () => void
  image: string
  title: string
  hint: string
}

/** 1 thẻ lựa chọn lớn (radio): ảnh 3D + tiêu đề + 1 dòng gợi ý. */
function ChoiceCard({ selected, onSelect, image, title, hint }: ChoiceCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={['pt-choice', selected && 'is-selected'].filter(Boolean).join(' ')}
      onClick={onSelect}
    >
      <span className="pt-choice__art">
        <WordImage slug={image} word={title} size={64} decorative />
      </span>
      <span className="pt-choice__text">
        <strong className="pt-choice__title">{title}</strong>
        <span className="pt-choice__hint">{hint}</span>
      </span>
      <span className="pt-choice__check" aria-hidden>
        <Icon name="check" size={16} strokeWidth={3} />
      </span>
    </button>
  )
}

/** Mũi tên ← → di chuyển giữa các thẻ trong 1 nhóm (như nhóm radio chuẩn). */
function moveFocusWithArrows(event: KeyboardEvent<HTMLDivElement>) {
  if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
  const cards = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]'))
  const index = cards.indexOf(document.activeElement as HTMLButtonElement)
  if (index < 0) return
  event.preventDefault()
  const step = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1
  const next = cards[(index + step + cards.length) % cards.length]
  next.focus()
  next.click()
}

export function ChoiceStep({ onStartTest, onStartFromZero }: ChoiceStepProps) {
  const text = usePlacementText()
  const [track, setTrack] = useState<TrackId | null>(null)
  const setup: PlacementSetup | null = track ? { track } : null

  // Enter = bắt đầu (khi đã chọn đủ và con trỏ không nằm trên 1 nút khác)
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Enter' || !setup) return
      const target = event.target as HTMLElement
      // (QA) bấm chuột chọn thẻ xong thì con trỏ vẫn nằm trên thẻ (role="radio") -> Enter vẫn phải
      // bắt đầu bài, không "bấm lại" thẻ đó. Các nút / ô nhập khác thì để Enter làm việc của chúng.
      if (target.closest('button:not([role="radio"]), a, input, select, textarea')) return
      event.preventDefault()
      onStartTest(setup)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setup, onStartTest])

  return (
    <main className="pt-choose ob-container">
      <Stepper variant="numbered" current={0} steps={text.stepNames} className="pt-stepper" />

      <div className="pt-choose__hello">
        <Mascot pose="salute" size={112} speech={text.mascotHello} speechSide="right" />
      </div>

      <section className="pt-question-block" aria-labelledby="pt-goal-q">
        <h1 id="pt-goal-q" className="pt-question-block__title ob-display">
          {text.goalQuestion}
        </h1>
        <div className="pt-choices pt-choices--two" role="radiogroup" aria-labelledby="pt-goal-q" onKeyDown={moveFocusWithArrows}>
          <ChoiceCard
            selected={track === 'general'}
            onSelect={() => setTrack('general')}
            image="globe-showing-asia-australia"
            title={text.trackGeneral}
            hint={text.trackGeneralHint}
          />
          <ChoiceCard
            selected={track === 'ielts'}
            onSelect={() => setTrack('ielts')}
            image="graduation-cap"
            title={text.trackIelts}
            hint={text.trackIeltsHint}
          />
        </div>
      </section>

      <div className="pt-choose__actions">
        <Button size="xl" iconRight="arrow-right" disabled={!setup} onClick={() => setup && onStartTest(setup)}>
          {text.startTest}
        </Button>
        <p className="pt-choose__facts">{setup ? text.testFacts : text.chooseGoalFirst}</p>
        <p className="pt-choose__zero">
          <button type="button" className="ob-text-link" disabled={!setup} onClick={() => setup && onStartFromZero(setup)}>
            {text.beginnerLink}
          </button>
          <span className="pt-choose__zero-hint"> — {text.beginnerLinkHint}</span>
        </p>
      </div>
    </main>
  )
}
