/**
 * ObjectiveSectionView.tsx
 * ----------------------------------------------------------------------------
 * HIỂN THỊ PHẦN THI TỰ CHẤM: Listening, Reading, Vocabulary.
 * Bố cục giống thi IELTS trên máy tính:
 *   - Reading   : bài đọc bên trái | câu hỏi bên phải (cuộn riêng từng bên)
 *   - Listening : nút phát audio (chỉ 1 lần mỗi part) + câu hỏi
 *   - Thanh dưới cùng: các ô số câu hỏi; ô đã trả lời tô đen; bấm để nhảy tới câu đó
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import type { ExamQuestion, ExamSection } from '../content/content-types'
import { speak, stopSpeaking } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import { stableOptionOrder } from '../exercise-types/exercise-shared'
import type { ExamAnswers } from './exam-scoring'

const OPTION_LETTERS = 'ABCDEFGHIJ'

interface ObjectiveSectionViewProps {
  section: ExamSection
  answers: ExamAnswers
  onAnswer: (questionId: string, value: string) => void
}

export function ObjectiveSectionView({ section, answers, onAnswer }: ObjectiveSectionViewProps) {
  const { t } = useLanguage()
  const parts = section.parts ?? []
  const [partIndex, setPartIndex] = useState(0)
  const [playedParts, setPlayedParts] = useState<Set<number>>(new Set())
  const [playingPart, setPlayingPart] = useState<number | null>(null)
  const part = parts[partIndex]

  async function playAudio() {
    if (!part.audioScript || playedParts.has(partIndex)) return
    setPlayedParts((played) => new Set(played).add(partIndex))
    setPlayingPart(partIndex)
    await speak(part.audioScript)
    setPlayingPart(null)
  }

  function jumpToQuestion(targetPart: number, questionId: string) {
    setPartIndex(targetPart)
    window.setTimeout(() => document.getElementById(`question-${questionId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50)
  }

  const questionList = (
    <div>
      <div className="card card--soft" style={{ padding: 14, marginBottom: 12 }}>
        <strong>{part.title}</strong>
        <div className="small" style={{ whiteSpace: 'pre-line' }}>
          {part.instructions}
        </div>
      </div>
      {part.questions.map((question) => (
        <QuestionInput key={question.id} question={question} value={answers[question.id] ?? ''} onChange={(value) => onAnswer(question.id, value)} />
      ))}
    </div>
  )

  return (
    <>
      {section.skill === 'reading' && part.passage ? (
        <div className="exam-split">
          <div>
            <h2 style={{ fontFamily: 'var(--font-reading)' }}>{part.passage.title}</h2>
            <div className="exam-passage">{part.passage.text}</div>
          </div>
          {questionList}
        </div>
      ) : (
        <div className="exam-single">
          {part.audioScript && (
            <div className="card row row--between" style={{ marginBottom: 16 }}>
              <div>
                <strong>🎧 {part.title}</strong>
                <div className="small muted">{t('audioOnce')}</div>
              </div>
              {playingPart === partIndex ? (
                <span className="row small">
                  <span className="spinner" /> {t('audioPlaying')}
                </span>
              ) : playedParts.has(partIndex) ? (
                <span className="badge">{t('audioFinished')}</span>
              ) : (
                <button type="button" className="button button--primary" onClick={playAudio} disabled={playingPart !== null}>
                  {t('playRecording')}
                </button>
              )}
            </div>
          )}
          {questionList}
        </div>
      )}

      {/* thanh điều hướng câu hỏi */}
      <div className="exam-navigator">
        {parts.map((p, pIndex) => (
          <div key={pIndex} className="row" style={{ gap: 4, marginRight: 14 }}>
            <button
              type="button"
              onClick={() => {
                if (playingPart !== null && pIndex !== partIndex) stopSpeaking()
                setPartIndex(pIndex)
              }}
              style={{ fontWeight: pIndex === partIndex ? 800 : 500, minWidth: 64, borderColor: pIndex === partIndex ? '#1b2232' : undefined }}
            >
              {p.title}
            </button>
            {p.questions.map((q) => (
              <button key={q.id} type="button" className={answers[q.id] ? 'is-answered' : ''} onClick={() => jumpToQuestion(pIndex, q.id)}>
                {q.number}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

/* ------------------- ô trả lời theo từng dạng câu hỏi ------------------- */

function QuestionInput({ question, value, onChange }: { question: ExamQuestion; value: string; onChange: (value: string) => void }) {
  const number = <span className="exam-question__number">{question.number}</span>

  if (question.kind === 'gap-fill') {
    const [before, after] = question.prompt.split('___')
    return (
      <div className="exam-question" id={`question-${question.id}`}>
        {number}
        {before}
        <input
          className="text-input"
          style={{ display: 'inline-block', width: 170, padding: '4px 8px', margin: '0 4px' }}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {after}
      </div>
    )
  }

  const options = question.kind === 'choice' ? question.options : ['TRUE', 'FALSE', 'NOT GIVEN']
  // trắc nghiệm: xáo thứ tự hiển thị (cố định theo id) để đáp án đúng không dồn 1 chỗ
  const displayOrder = question.kind === 'choice' ? stableOptionOrder(question.id, options) : options.map((_, i) => i)
  return (
    <div className="exam-question" id={`question-${question.id}`}>
      <div style={{ marginBottom: 6 }}>
        {number}
        <span style={{ whiteSpace: 'pre-line' }}>{question.prompt}</span>
      </div>
      {displayOrder.map((index, position) => {
        const option = options[index]
        // trắc nghiệm lưu số thứ tự đáp án; T/F/NG lưu chữ
        const optionValue = question.kind === 'choice' ? String(index) : option
        return (
          <label key={index}>
            <input type="radio" name={question.id} checked={value === optionValue} onChange={() => onChange(optionValue)} />
            <span>
              {question.kind === 'choice' && /^[A-J][.)]?\s/.test(option) ? '' : question.kind === 'choice' ? `${OPTION_LETTERS[position]}. ` : ''}
              {option}
            </span>
          </label>
        )
      })}
    </div>
  )
}
