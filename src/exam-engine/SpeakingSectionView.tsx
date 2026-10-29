/**
 * SpeakingSectionView.tsx — PHẦN THI NÓI VỚI "GIÁM KHẢO ẢO"
 * ----------------------------------------------------------------------------
 * Luồng cho mỗi câu hỏi:
 *   1. 'asking'    : giám khảo ảo đọc câu hỏi (giọng máy)
 *   2. 'preparing' : chỉ Part 2 — 60 giây chuẩn bị, có ô ghi chú, xem cue card
 *   3. 'answering' : tự bật ghi âm; hết giờ hoặc bấm "Dừng" -> sang câu tiếp
 * Xong tất cả -> gọi onFinished(bản ghi âm theo từng Part) để gửi AI chấm.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import type { ExamSection } from '../content/content-types'
import { VoiceRecorderPanel } from '../components/VoiceRecorderPanel'
import type { RecordedAudio } from '../services/audio-recorder'
import { speak, stopSpeaking } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'

export interface SpeakingPartRecordings {
  partNumber: number
  answers: { question: string; audio: RecordedAudio }[]
}

type Stage = 'part-intro' | 'asking' | 'preparing' | 'answering'

export function SpeakingSectionView({ section, onFinished }: { section: ExamSection; onFinished: (recordings: SpeakingPartRecordings[]) => void }) {
  const { t } = useLanguage()
  const parts = section.speakingParts ?? []
  const [partIndex, setPartIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [stage, setStage] = useState<Stage>('part-intro')
  const [prepLeft, setPrepLeft] = useState(0)
  const [notes, setNotes] = useState('')
  const [recordings, setRecordings] = useState<SpeakingPartRecordings[]>([])

  const part = parts[partIndex]
  const question = part.questions[questionIndex]

  // giai đoạn hỏi: đọc câu hỏi xong thì chuyển sang chuẩn bị / trả lời
  useEffect(() => {
    if (stage !== 'asking') return
    let cancelled = false
    const spoken = part.partNumber === 2 ? `${question}. ${(part.cueCardPoints ?? []).join('. ')}` : question
    speak(spoken).then(() => {
      if (cancelled) return
      if (part.prepSeconds > 0) {
        setPrepLeft(part.prepSeconds)
        setStage('preparing')
      } else setStage('answering')
    })
    return () => {
      cancelled = true
      stopSpeaking()
    }
  }, [stage, part, question])

  // đếm ngược thời gian chuẩn bị
  useEffect(() => {
    if (stage !== 'preparing') return
    if (prepLeft <= 0) {
      setStage('answering')
      return
    }
    const timer = window.setTimeout(() => setPrepLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [stage, prepLeft])

  /** Ghi âm xong 1 câu -> lưu lại, chuyển câu / part tiếp theo. */
  function handleRecorded(audio: RecordedAudio) {
    const updated = [...recordings]
    const existing = updated.find((r) => r.partNumber === part.partNumber)
    if (existing) existing.answers.push({ question, audio })
    else updated.push({ partNumber: part.partNumber, answers: [{ question, audio }] })
    setRecordings(updated)

    if (questionIndex + 1 < part.questions.length) {
      setQuestionIndex(questionIndex + 1)
      setStage('asking')
    } else if (partIndex + 1 < parts.length) {
      setPartIndex(partIndex + 1)
      setQuestionIndex(0)
      setNotes('')
      setStage('part-intro')
    } else {
      onFinished(updated)
    }
  }

  return (
    <div className="exam-single">
      <div className="row row--between" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>
          Speaking Part {part.partNumber}
        </h2>
        <div className="row">
          <span className="badge">
            {t('question')} {questionIndex + 1}/{part.questions.length}
          </span>
          {/* máy không có micro / không muốn thi nói: nộp những phần đã ghi */}
          <button
            type="button"
            className="button button--ghost button--small"
            onClick={() => {
              if (window.confirm(t('confirmSkipSpeaking'))) {
                stopSpeaking()
                onFinished(recordings)
              }
            }}
          >
            {t('skipSpeaking')}
          </button>
        </div>
      </div>

      {stage === 'part-intro' ? (
        <div className="card celebration" style={{ padding: 32 }}>
          <div className="celebration__emoji">🧑‍🏫</div>
          <h3>
            {t('speakingExaminer')} — Part {part.partNumber}
          </h3>
          <p className="muted">{part.partNumber === 2 ? t('prepTime', { s: part.prepSeconds }) : t('speakNow', { s: part.answerSeconds })}</p>
          <button type="button" className="button button--primary button--large" onClick={() => setStage('asking')}>
            {t('start')}
          </button>
        </div>
      ) : (
        <div className="stack">
          {/* câu hỏi / cue card */}
          <div className="card">
            <div className="small muted" style={{ marginBottom: 6 }}>
              🧑‍🏫 {t('speakingExaminer')} {stage === 'asking' && <span className="spinner" style={{ width: 14, height: 14, verticalAlign: 'middle' }} />}
            </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: part.cueCardPoints ? 8 : 0 }}>{question}</p>
            {part.partNumber === 2 && part.cueCardPoints && (
              <>
                <div className="small muted">You should say:</div>
                <ul style={{ marginTop: 4 }}>
                  {part.cueCardPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {stage === 'preparing' && (
            <div className="card">
              <div className="row row--between" style={{ marginBottom: 8 }}>
                <strong>⏳ {t('prepTime', { s: prepLeft })}</strong>
                <button type="button" className="button button--secondary button--small" onClick={() => setStage('answering')}>
                  {t('startSpeaking')}
                </button>
              </div>
              <textarea className="text-area" style={{ minHeight: 120 }} placeholder={t('notes')} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          )}

          {stage === 'answering' && (
            <div className="card">
              {part.partNumber === 2 && notes && (
                <p className="small muted" style={{ whiteSpace: 'pre-line' }}>
                  📝 {notes}
                </p>
              )}
              <p style={{ fontWeight: 600 }}>🎙 {t('speakNow', { s: part.answerSeconds })}</p>
              {/* key mới cho mỗi câu -> khung ghi âm được tạo lại và tự bắt đầu ghi */}
              <VoiceRecorderPanel key={`${partIndex}-${questionIndex}`} maxSeconds={part.answerSeconds} onRecorded={handleRecorded} autoStart />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
