/**
 * GuessBandCard.tsx — TRÒ "ĐOÁN BAND BÀI MẪU" (dùng chung Writing + Speaking)
 * ----------------------------------------------------------------------------
 * Ý 7 trong docs/research/notes/ui-ielts-a.md: đọc bài mẫu GIẤU band -> tự đoán -> lật đáp án
 * kèm nhận xét giám khảo. Luyện "con mắt giám khảo" trước khi xem bài mẫu đặt cạnh bài mình.
 * Component chỉ vẽ; trạng thái (bài nào, đã chọn gì) do trình cha giữ để lưu resume. Phím 1–3 = chọn.
 * ----------------------------------------------------------------------------
 */
import { useEffect, type ReactNode } from 'react'
import type { BandSample } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { useLanguage } from '../../../translations/language-context'
import { formatBand, levelLabelOfSample, type BandDisplay } from '../band-scale'
import { useWritingText } from '../skill-writing-text'
import { SampleNotes } from './LabelledEssay'
import './feedback.css'

interface GuessBandCardProps {
  /** bài mẫu đã sắp thấp -> cao */
  samples: BandSample[]
  /** bài được giấu band để đoán (chỉ số trong samples) */
  mysteryIndex: number
  /** lựa chọn của người học (chỉ số trong samples) — null = chưa chọn */
  picked: number | null
  onPick: (index: number) => void
  display: BandDisplay
  /** vẽ nội dung bài mẫu (Writing: bài có nhãn đoạn; Speaking: các dòng Q/A) */
  renderSample: (sample: BandSample) => ReactNode
  onContinue: () => void
  onSkip: () => void
}

export function GuessBandCard({ samples, mysteryIndex, picked, onPick, display, renderSample, onContinue, onSkip }: GuessBandCardProps) {
  const text = useWritingText()
  const { language } = useLanguage()
  const mystery = samples[mysteryIndex]
  const revealed = picked !== null

  // Phím 1–3 = chọn mức (chỉ khi chưa chọn; không bắt phím khi đang gõ trong ô chữ)
  useEffect(() => {
    if (revealed) return
    const onKey = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input, textarea')) return
      const index = Number(event.key) - 1
      if (Number.isInteger(index) && index >= 0 && index < samples.length) onPick(index)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [revealed, samples.length, onPick])
  const labelOf = (index: number) =>
    display === 'numbers' ? `${formatBand(parseFloat(samples[index].band))}` : levelLabelOfSample(index)[language]

  return (
    <section className="guess-band" aria-labelledby="guess-band-title">
      <header className="guess-band__head">
        <div>
          <h3 id="guess-band-title" className="guess-band__title">
            {display === 'numbers' ? text.guessTitle : text.guessTitleLabels}
          </h3>
          <p className="guess-band__intro">{text.guessIntro}</p>
        </div>
        {!revealed && (
          <Button variant="ghost" size="sm" onClick={onSkip}>
            {text.skipGuess}
          </Button>
        )}
      </header>

      <div className="guess-band__sample">
        <span className="guess-band__sample-tag">{revealed ? labelOf(mysteryIndex) : text.mysterySample}</span>
        {renderSample(mystery)}
      </div>

      <div className="guess-band__question">
        <strong>{text.guessQuestion}</strong>
        <div className="guess-band__choices" role="radiogroup" aria-label={text.guessQuestion}>
          {samples.map((sample, index) => {
            const state = !revealed ? '' : index === mysteryIndex ? ' is-answer' : index === picked ? ' is-wrong' : ' is-dim'
            return (
              <button
                key={sample.band}
                type="button"
                role="radio"
                aria-checked={picked === index}
                disabled={revealed}
                className={`guess-band__choice${state}`}
                onClick={() => onPick(index)}
              >
                <span className="guess-band__choice-key">{index + 1}</span>
                {labelOf(index)}
              </button>
            )
          })}
        </div>
      </div>

      {revealed && (
        <div className={`guess-band__reveal${picked === mysteryIndex ? ' is-right' : ''}`} role="status">
          <p className="guess-band__verdict">{picked === mysteryIndex ? text.guessRight : text.guessOff(labelOf(mysteryIndex))}</p>
          <h4 className="guess-band__notes-title">{text.examinerNotes}</h4>
          <SampleNotes notes={mystery.notesVi} />
          <div className="guess-band__next">
            <Button variant="secondary" iconRight="arrow-right" onClick={onContinue}>
              {text.guessNext}
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
