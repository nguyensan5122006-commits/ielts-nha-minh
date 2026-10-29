/**
 * FocusPreview.tsx — XEM TRƯỚC MÀN HỌC TOÀN MÀN HÌNH ( /design/focus )
 * ----------------------------------------------------------------------------
 * 1 câu hỏi mẫu dùng FocusLayout + ProgressBar + Sheet: chọn đáp án (phím 1–4),
 * Enter để kiểm tra, Enter lần nữa để tiếp tục. Sai thì đáp án đúng được tô
 * xanh NGAY TRONG danh sách (spec mục 4). Dữ liệu giả, không lưu gì.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FocusLayout } from '../../app/layout/FocusLayout'
import { Button } from '../components/Button'
import { Icon } from '../components/Icon'
import { Kbd } from '../components/Kbd'
import { ProgressBar } from '../components/ProgressBar'
import { Sheet } from '../components/Sheet'
import { playSound } from '../sound-kit'
import './StyleGuidePreview.css'

const QUESTIONS = [
  { prompt: 'He ___ the newspaper every morning before breakfast.', options: ['reads', 'is reading', 'read', 'has read'], answer: 0, why: '"every morning" là dấu hiệu thì hiện tại đơn; chủ ngữ "he" số ít → reads.' },
  { prompt: 'We ___ that movie twice already.', options: ['watch', 'have watched', 'watched', 'are watching'], answer: 1, why: '"already" + "twice" → thì hiện tại hoàn thành: have watched.' },
]

export function FocusPreview() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [done, setDone] = useState(0)
  const question = QUESTIONS[index % QUESTIONS.length]
  const isRight = selected === question.answer

  function check() {
    if (selected === null || checked) return
    setChecked(true)
    if (selected === question.answer) {
      setDone((n) => n + 1)
      playSound('correct')
    } else playSound('oops')
  }
  function next() {
    setChecked(false)
    setSelected(null)
    setIndex((n) => n + 1)
  }

  // phím tắt: 1–4 chọn, Enter kiểm tra / tiếp tục
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!checked && /^[1-4]$/.test(event.key)) {
        setSelected(Number(event.key) - 1)
        playSound('tap')
      }
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement
        // nút Kiểm tra / Tiếp tục đang focus thì tự xử lý Enter; còn lại (kể cả ô đáp án vừa bấm) -> kiểm tra / tiếp tục
        if (target instanceof HTMLButtonElement && !target.classList.contains('pv-option')) return
        event.preventDefault()
        ;(checked ? next : check)()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  return (
    <FocusLayout
      onExit={() => navigate('/design')}
      progress={<ProgressBar value={Math.min(done, 6)} max={6} valueText={`${Math.min(done, 6)}/6`} label="Tiến độ bài" streakText={done >= 3 && checked && isRight ? `${done} câu đúng liền!` : undefined} />}
      footer={
        checked ? (
          <Sheet
            open
            tone={isRight ? 'success' : 'oops'}
            title={isRight ? 'Chính xác!' : `Chưa đúng — đáp án: ${question.options[question.answer]}`}
            mascotPose={isRight ? 'happy' : 'comfort'}
            primaryAction={{ label: 'Tiếp tục', onClick: next }}
            secondaryActions={
              !isRight && (
                <Button variant="ghost" size="sm" iconLeft="sparkle">
                  Hỏi AI vì sao
                </Button>
              )
            }
            onReport={() => undefined}
          >
            <p>{question.why}</p>
          </Sheet>
        ) : (
          <div className="pv-actionbar">
            <div className="pv-actionbar__inner">
              <Button variant="ghost" iconLeft="hint">
                Gợi ý
              </Button>
              <Button size="lg" disabled={selected === null} onClick={check} iconRight={<Kbd onColor>Enter</Kbd>}>
                Kiểm tra
              </Button>
            </div>
          </div>
        )
      }
    >
      <div className="pv-question">
        <div className="ds-eyebrow">Chia thì đúng của động từ</div>
        <h1 className="pv-question__prompt">{question.prompt}</h1>
        <div className="pv-options" role="radiogroup" aria-label="Đáp án">
          {question.options.map((option, optionIndex) => {
            const state = checked ? (optionIndex === question.answer ? 'is-correct' : optionIndex === selected ? 'is-oops' : 'is-dim') : optionIndex === selected ? 'is-selected' : ''
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={optionIndex === selected}
                disabled={checked}
                className={`sg-answer pv-option ${state}`}
                onClick={() => {
                  setSelected(optionIndex)
                  playSound('tap')
                }}
              >
                <Kbd>{optionIndex + 1}</Kbd>
                <span className="pv-option__text">{option}</span>
                {checked && optionIndex === question.answer && <Icon name="check" size={20} strokeWidth={3} />}
              </button>
            )
          })}
        </div>
      </div>
    </FocusLayout>
  )
}
