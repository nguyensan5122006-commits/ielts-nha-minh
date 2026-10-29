/**
 * SpeakingExercises.tsx — CÁC DẠNG BÀI NÓI
 *  - SpeakSentenceExercise : đọc to 1 câu; trình duyệt nhận giọng nói rồi so với câu mẫu (miễn phí)
 *  - SpeakAnswerExercise   : trả lời câu hỏi bằng giọng nói; ghi âm gửi AI Gemini chấm
 */
import { useState } from 'react'
import type { SpeakAnswerExercise as SpeakAnswerData, SpeakSentenceExercise as SpeakSentenceData } from '../content/content-types'
import { AiFeedbackCard } from '../components/AiFeedbackCard'
import { SpeakerButton } from '../components/SpeakerButton'
import { VoiceRecorderPanel } from '../components/VoiceRecorderPanel'
import { api, type AiGradingResult } from '../services/api-client'
import type { RecordedAudio } from '../services/audio-recorder'
import { isSpeechRecognitionSupported, listenOnce } from '../services/speech-recognition'
import { useLanguage } from '../translations/language-context'
import { AI_DONE_PREFIX, AI_FAILED_ANSWER, SKIPPED_ANSWER, type ExerciseComponentProps } from './exercise-shared'

/* ------------------------------ đọc to câu ------------------------------- */

export function SpeakSentenceExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<SpeakSentenceData>) {
  const { t } = useLanguage()
  const [isListening, setIsListening] = useState(false)
  const [heard, setHeard] = useState('')
  const [stopListening, setStopListening] = useState<(() => void) | null>(null)
  const supported = isSpeechRecognitionSupported()

  async function toggleListening() {
    if (isListening) {
      stopListening?.()
      return
    }
    const session = listenOnce()
    setStopListening(() => session.stop)
    setIsListening(true)
    try {
      const alternatives = await session.result
      // lấy phương án máy nghe được giống câu mẫu nhất (phương án đầu thường tốt nhất)
      const best = alternatives[0] ?? ''
      setHeard(best)
      onAnswerChange(best || null)
    } catch {
      setHeard('')
    } finally {
      setIsListening(false)
    }
  }

  return (
    <>
      <div className="exercise-instruction">{t('readAloud')}</div>
      <div className="row" style={{ alignItems: 'flex-start', marginBottom: 20 }}>
        <SpeakerButton text={exercise.sentence} variant="inline" />
        <div>
          <p className="exercise-prompt" style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: 4 }}>
            {exercise.sentence}
          </p>
          <p className="muted">{exercise.translationVi}</p>
        </div>
      </div>

      {supported ? (
        <button type="button" className={`microphone-button ${isListening ? 'is-active' : ''}`} onClick={toggleListening} disabled={isLocked}>
          🎙 {isListening ? t('listeningNow') : t('tapToSpeak')}
        </button>
      ) : (
        <div className="alert alert--warning">
          {t('speechUnsupported')}{' '}
          <button type="button" className="button button--secondary button--small" onClick={() => onAnswerChange(SKIPPED_ANSWER)} disabled={isLocked}>
            {t('skip')}
          </button>
        </div>
      )}
      {heard && (
        <p style={{ marginTop: 14 }}>
          <span className="muted">{t('youSaid')}</span> <strong>{heard}</strong>
        </p>
      )}
      {supported && !isLocked && (
        <button type="button" className="button button--ghost button--small" style={{ marginTop: 8 }} onClick={() => onAnswerChange(SKIPPED_ANSWER)}>
          {t('cannotSpeakNow')}
        </button>
      )}
    </>
  )
}

/* -------------------------- trả lời nói (AI chấm) ------------------------- */

export function SpeakAnswerExercise({ exercise, onAnswerChange, targetBand }: ExerciseComponentProps<SpeakAnswerData>) {
  const { t } = useLanguage()
  const [recording, setRecording] = useState<RecordedAudio | null>(null)
  const [isGrading, setIsGrading] = useState(false)
  const [result, setResult] = useState<AiGradingResult | null>(null)
  const [error, setError] = useState('')

  async function sendToAi() {
    if (!recording) return
    setIsGrading(true)
    setError('')
    try {
      const { result: grading } = await api.gradeSpeaking({
        context: 'lesson',
        targetBand,
        answers: [{ question: exercise.question, audioBase64: recording.base64Wav, mimeType: recording.mimeType }],
      })
      setResult(grading)
      onAnswerChange(AI_DONE_PREFIX + grading.overallBand)
    } catch (e) {
      setError((e as Error).message)
      onAnswerChange(AI_FAILED_ANSWER) // vẫn cho đi tiếp
    } finally {
      setIsGrading(false)
    }
  }

  return (
    <>
      <div className="exercise-instruction">{t('speakAnswer')}</div>
      <div className="row" style={{ marginBottom: 12 }}>
        <SpeakerButton text={exercise.question} variant="inline" />
        <p className="exercise-prompt" style={{ margin: 0, fontWeight: 600 }}>
          {exercise.question}
        </p>
      </div>
      <details style={{ marginBottom: 16 }}>
        <summary>💡 {t('tips')}</summary>
        <p style={{ marginTop: 8 }}>{exercise.tipsVi}</p>
        <p className="muted">
          <strong>{t('sampleAnswer')}:</strong> {exercise.sampleAnswer}
        </p>
      </details>

      {!result && (
        <>
          <VoiceRecorderPanel maxSeconds={exercise.recordSeconds} onRecorded={setRecording} disabled={isGrading} />
          <button type="button" className="button button--primary" style={{ marginTop: 14 }} disabled={!recording || isGrading} onClick={sendToAi}>
            {isGrading ? (
              <>
                <span className="spinner" /> {t('aiGrading')}
              </>
            ) : (
              <>🤖 {t('sendToAi')}</>
            )}
          </button>
        </>
      )}
      {error && (
        <div className="alert" style={{ marginTop: 12 }}>
          {error} — {t('aiUnavailableContinue')}
        </div>
      )}
      {result && <AiFeedbackCard result={result} />}
    </>
  )
}
