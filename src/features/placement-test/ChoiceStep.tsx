/**
 * ChoiceStep.tsx — BƯỚC 1 CỦA /start: "Bạn học để làm gì?" + "Bạn là…" (1 màn duy nhất)
 * ----------------------------------------------------------------------------
 * Gộp 2 câu hỏi vào 1 màn (psych-adult D2 luật 1: bắt đầu học trong ≤ 2 bước).
 * Thẻ lớn có ảnh 3D + cún hỏi trong bong bóng thoại (ý Mochi / Brilliant, làm lại kiểu mình).
 * Chọn xong 2 câu -> nút chính "Bắt đầu bài xếp lớp" sáng lên (Enter cũng được).
 * Link phụ "Tôi mới bắt đầu từ con số 0" -> bỏ qua bài, vào thẳng Level 1.
 * Bé (Học sinh tiểu học) -> luôn track Tiếng Anh tổng quát + bài kiểm tra mini 4–6 câu.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState, type KeyboardEvent } from 'react'
import type { TrackId } from '../../content/content-types'
import { Button, Icon, Mascot, Stepper, WordImage } from '../../design-system'
import type { AgeGroup } from '../../../backend-helpers/age-groups'
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
  disabled?: boolean
}

/** 1 thẻ lựa chọn lớn (radio): ảnh 3D + tiêu đề + 1 dòng gợi ý. */
function ChoiceCard({ selected, onSelect, image, title, hint, disabled }: ChoiceCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={['pt-choice', selected && 'is-selected', disabled && 'is-muted'].filter(Boolean).join(' ')}
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
  const [ageGroup, setAgeGroup] = useState<AgeGroup | null>(null)
  const isKid = ageGroup === 'kid'
  // bé luôn học track tổng quát -> chỉ cần chọn nhóm tuổi
  const effectiveTrack: TrackId | null = isKid ? 'general' : track
  const ready = !!ageGroup && !!effectiveTrack
  const setup: PlacementSetup | null = ready ? { track: effectiveTrack!, ageGroup: ageGroup! } : null

  // Enter = bắt đầu (khi đã chọn đủ và con trỏ không nằm trên 1 nút khác)
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Enter' || !setup) return
      const target = event.target as HTMLElement
      if (target.closest('button, a, input, select, textarea')) return
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
            selected={effectiveTrack === 'general'}
            onSelect={() => setTrack('general')}
            image="globe-showing-asia-australia"
            title={text.trackGeneral}
            hint={text.trackGeneralHint}
          />
          <ChoiceCard
            selected={!isKid && track === 'ielts'}
            onSelect={() => setTrack('ielts')}
            image="graduation-cap"
            title={text.trackIelts}
            hint={text.trackIeltsHint}
            disabled={isKid}
          />
        </div>
      </section>

      <section className="pt-question-block" aria-labelledby="pt-who-q">
        <h2 id="pt-who-q" className="pt-question-block__title ob-display">
          {text.whoQuestion}
        </h2>
        <div className="pt-choices pt-choices--three" role="radiogroup" aria-labelledby="pt-who-q" onKeyDown={moveFocusWithArrows}>
          <ChoiceCard selected={ageGroup === 'kid'} onSelect={() => setAgeGroup('kid')} image="child" title={text.ageKid} hint={text.ageKidHint} />
          <ChoiceCard selected={ageGroup === 'teen'} onSelect={() => setAgeGroup('teen')} image="student" title={text.ageTeen} hint={text.ageTeenHint} />
          <ChoiceCard selected={ageGroup === 'adult'} onSelect={() => setAgeGroup('adult')} image="office-worker" title={text.ageAdult} hint={text.ageAdultHint} />
        </div>
        {isKid && (
          <p className="pt-kid-note" role="status">
            <WordImage slug="balloon" word="balloon" size={24} decorative />
            {text.kidTrackNote}
          </p>
        )}
      </section>

      <div className="pt-choose__actions">
        <Button size="xl" iconRight="arrow-right" disabled={!setup} onClick={() => setup && onStartTest(setup)}>
          {isKid ? text.startTestKid : text.startTest}
        </Button>
        <p className="pt-choose__facts">{ready ? (isKid ? text.testFactsKid : text.testFacts) : text.chooseBothFirst}</p>
        {!isKid && (
          <p className="pt-choose__zero">
            <button type="button" className="ob-text-link" disabled={!setup} onClick={() => setup && onStartFromZero(setup)}>
              {text.beginnerLink}
            </button>
            <span className="pt-choose__zero-hint"> — {text.beginnerLinkHint}</span>
          </p>
        )}
      </div>
    </main>
  )
}
