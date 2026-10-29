/**
 * AiGradedExercises.tsx — BÀI NÓI / VIẾT TỰ DO DO AI (Gemini) NHẬN XÉT
 * ----------------------------------------------------------------------------
 *   SpeakAnswerExercise : nghe câu hỏi -> ghi âm câu trả lời -> nghe lại / ghi lại -> gửi chấm
 *   WriteAnswerExercise : viết vào ô (đếm từ trực tiếp) -> gửi chấm (Ctrl + Enter)
 *
 * Máy ghi âm đủ trạng thái (spec 04 mục 13): xin micro -> sẵn sàng -> đang ghi
 * (thanh thời gian) -> nghe lại / ghi lại -> đang chấm -> kết quả.
 * AI lỗi / không có micro: KHÔNG tính sai, luôn có nút đi tiếp (không ngõ cụt).
 * Ghi âm mặc định riêng tư: chỉ gửi đi khi người học bấm "Gửi chấm".
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import type { SpeakAnswerExercise as SpeakAnswerData, WriteAnswerExercise as WriteAnswerData } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Kbd } from '../../../design-system/components/Kbd'
import { api } from '../../../services/api-client'
import { countWords } from '../../../services/answer-checking'
import { VoiceRecorder, type RecordedAudio } from '../../../services/audio-recorder'
import { useLessonText } from '../lesson-player-text'
import { LessonGlyph } from '../parts/LessonGlyph'
import { AiResultCard } from './AiResultCard'
import { AI_DONE_PREFIX, AI_FAILED_ANSWER, type ExerciseViewProps } from './exercise-contract'
import { ExerciseHeading } from './ExerciseHeading'
import { ListenHero } from './ListenHero'

/** Khung "Gợi ý cách trả lời" gập/mở */
function TipsBox({ tips, sample }: { tips: string; sample?: string }) {
  const text = useLessonText()
  return (
    <details className="lp-tips">
      <summary>
        <LessonGlyph name="lightbulb" size={18} /> {text.tipsLabel}
      </summary>
      <p>{tips}</p>
      {sample && (
        <p className="lp-tips__sample">
          <strong>{text.sampleAnswer}:</strong> {sample}
        </p>
      )}
    </details>
  )
}

/* ============================ NÓI TỰ DO (AI) ============================ */

type RecorderState = 'idle' | 'requesting' | 'recording' | 'recorded' | 'grading' | 'blocked' | 'failed'

export function SpeakAnswerExercise({ exercise, outcome, onSubmit, targetBand, levelId }: ExerciseViewProps<SpeakAnswerData>) {
  const text = useLessonText()
  const recorder = useRef(new VoiceRecorder())
  const [state, setState] = useState<RecorderState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [recording, setRecording] = useState<RecordedAudio | null>(null)
  const timer = useRef(0)

  // rời câu khi đang ghi -> tắt micro
  useEffect(
    () => () => {
      window.clearInterval(timer.current)
      recorder.current.cancel()
    },
    [],
  )

  async function startRecording() {
    setState('requesting')
    try {
      // hộp hỏi quyền micro bị bỏ quên -> sau 20 giây coi như không có micro (vẫn có lối ra)
      await Promise.race([recorder.current.start(), new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error('permission timeout')), 20_000))])
    } catch {
      recorder.current.cancel()
      setState('blocked')
      return
    }
    setSeconds(0)
    setState('recording')
    const startedAt = Date.now()
    timer.current = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000)
      setSeconds(elapsed)
      if (elapsed >= exercise.recordSeconds) void stopRecording()
    }, 250)
  }

  async function stopRecording() {
    window.clearInterval(timer.current)
    if (!recorder.current.isRecording) return
    try {
      const audio = await recorder.current.stop()
      setRecording(audio)
      setState('recorded')
    } catch {
      setState('blocked')
    }
  }

  async function sendToAi() {
    if (!recording) return
    setState('grading')
    try {
      const { result } = await api.gradeSpeaking({
        context: 'lesson',
        targetBand,
        answers: [{ question: exercise.question, audioBase64: recording.base64Wav, mimeType: recording.mimeType }],
      })
      onSubmit(AI_DONE_PREFIX + JSON.stringify(result))
    } catch {
      setState('failed')
    }
  }

  const progress = Math.min(1, seconds / exercise.recordSeconds)
  return (
    <>
      <ExerciseHeading icon="volume">{text.instrSpeakAnswer}</ExerciseHeading>
      <div className="lp-listen-row">
        <ListenHero text={exercise.question} size="lg" showKeyHint={false} />
        <h2 className="lp-prompt lp-prompt--compact">{exercise.question}</h2>
      </div>
      <TipsBox tips={exercise.tipsVi} sample={exercise.sampleAnswer} />

      {outcome?.aiResult ? (
        <AiResultCard result={outcome.aiResult} levelId={levelId} sampleAnswer={exercise.sampleAnswer} />
      ) : outcome ? null : state === 'blocked' || state === 'failed' ? (
        <div className="lp-mic-blocked" role="status">
          <span className="lp-mic-blocked__icon" aria-hidden>
            <LessonGlyph name={state === 'blocked' ? 'mic-off' : 'robot'} size={22} />
          </span>
          <div>
            <strong>{state === 'blocked' ? text.micBlocked : text.gradeFailed}</strong>
            {state === 'blocked' && <p>{text.micBlockedText}</p>}
            <Button variant="secondary" onClick={() => onSubmit(AI_FAILED_ANSWER)}>
              {text.skipNoPenalty}
            </Button>
          </div>
        </div>
      ) : (
        <div className="lp-recorder">
          <button
            type="button"
            className={['lp-mic', state === 'recording' && 'is-recording', (state === 'requesting' || state === 'grading') && 'is-busy'].filter(Boolean).join(' ')}
            onClick={() => (state === 'recording' ? void stopRecording() : void startRecording())}
            disabled={state === 'requesting' || state === 'grading'}
            aria-label={state === 'recording' ? text.stopRecording : text.record}
          >
            <span className="lp-mic__ring" aria-hidden />
            {state === 'recording' ? <span className="lp-mic__stop" aria-hidden /> : <LessonGlyph name="mic" size={34} />}
          </button>
          <div className="lp-recorder__side">
            {state === 'recording' ? (
              <>
                <p className="lp-speak-status">
                  <span className="lp-rec-dot" aria-hidden /> {text.listeningNow}
                </p>
                <div className="lp-recorder__bar" role="progressbar" aria-valuemin={0} aria-valuemax={exercise.recordSeconds} aria-valuenow={seconds}>
                  <span style={{ width: `${progress * 100}%` }} />
                </div>
                <span className="lp-recorder__time ds-num">
                  {seconds}s / {exercise.recordSeconds}s
                </span>
              </>
            ) : state === 'recorded' || state === 'grading' ? (
              <div className="ds-row ds-row--wrap ds-gap-2">
                <Button variant="secondary" iconLeft={<LessonGlyph name="ear" size={18} />} onClick={() => recording && void new Audio(recording.playbackUrl).play()} disabled={state === 'grading'}>
                  {text.playMine}
                </Button>
                <Button variant="ghost" iconLeft={<LessonGlyph name="replay" size={18} />} onClick={() => void startRecording()} disabled={state === 'grading'}>
                  {text.recordAgain}
                </Button>
                <Button onClick={() => void sendToAi()} loading={state === 'grading'}>
                  {state === 'grading' ? text.grading : text.sendToGrade}
                </Button>
              </div>
            ) : (
              <p className="lp-speak-status">
                {state === 'requesting' ? text.requestingMic : text.recordSeconds(exercise.recordSeconds)}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/* ============================ VIẾT TỰ DO (AI) ============================ */

export function WriteAnswerExercise({ exercise, outcome, onSubmit, targetBand, levelId }: ExerciseViewProps<WriteAnswerData>) {
  const text = useLessonText()
  const [value, setValue] = useState('')
  const [state, setState] = useState<'writing' | 'grading' | 'failed'>('writing')
  const words = countWords(value)
  const enough = words >= exercise.minWords

  async function sendToAi() {
    if (!enough || state === 'grading') return
    setState('grading')
    try {
      const { result } = await api.gradeWriting({ prompt: exercise.prompt, answer: value, taskKind: 'lesson', targetBand })
      onSubmit(AI_DONE_PREFIX + JSON.stringify(result))
    } catch {
      setState('failed')
    }
  }

  return (
    <>
      <ExerciseHeading icon="sparkle">{text.instrWriteAnswer}</ExerciseHeading>
      <h2 className="lp-prompt lp-prompt--compact lp-prompt--pre">{exercise.prompt}</h2>
      <TipsBox tips={exercise.tipsVi} />
      <div className={['lp-writer', enough && 'is-enough'].filter(Boolean).join(' ')}>
        <textarea
          className="lp-writer__area"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
              event.preventDefault()
              void sendToAi()
            }
          }}
          disabled={!!outcome || state === 'grading'}
          placeholder={text.writeHere}
          spellCheck={false}
          autoFocus
        />
        <div className="lp-writer__foot">
          <div className="lp-writer__count">
            <span className="lp-writer__meter" aria-hidden>
              <span style={{ width: `${Math.min(100, (words / exercise.minWords) * 100)}%` }} />
            </span>
            <span className="ds-num">{enough ? `${text.enoughWords} · ${words}` : text.wordCount(words, exercise.minWords)}</span>
          </div>
          {!outcome && (
            <div className="ds-row ds-gap-2">
              <span className="lp-key-note" aria-hidden>
                <Kbd>Ctrl</Kbd>+<Kbd>Enter</Kbd>
              </span>
              <Button onClick={() => void sendToAi()} disabled={!enough} loading={state === 'grading'}>
                {state === 'grading' ? text.grading : text.sendToGrade}
              </Button>
            </div>
          )}
        </div>
      </div>
      {state === 'failed' && !outcome && (
        <div className="lp-mic-blocked" role="status">
          <span className="lp-mic-blocked__icon" aria-hidden>
            <LessonGlyph name="robot" size={22} />
          </span>
          <div>
            <strong>{text.gradeFailed}</strong>
            <div className="ds-row ds-gap-2">
              <Button variant="secondary" onClick={() => void sendToAi()}>
                {text.tryAgain}
              </Button>
              <Button variant="ghost" onClick={() => onSubmit(AI_FAILED_ANSWER)}>
                {text.skipNoPenalty}
              </Button>
            </div>
          </div>
        </div>
      )}
      {outcome?.aiResult && <AiResultCard result={outcome.aiResult} levelId={levelId} sampleAnswer={exercise.sampleAnswer} />}
    </>
  )
}
