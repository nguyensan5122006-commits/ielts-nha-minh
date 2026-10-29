/**
 * SpeakSentenceExercise.tsx — ĐỌC TO 1 CÂU (shadowing)
 * ----------------------------------------------------------------------------
 * 3 nút tròn theo đúng thứ tự luyện (học từ LingoDeer / Busuu):
 *     🔊 Nghe mẫu (+ rùa chậm)   →   🎙 Nói   →   👂 Nghe lại mình (mở khoá sau khi nói)
 * Phím: Space = nghe mẫu · V = nói / dừng · P = nghe lại mình.
 *
 * Kết quả tô 3 màu trên TỪNG TỪ (kiểu ELSA, không hiện %):
 *     xanh = máy nghe rõ · vàng = gần đúng · cam san hô = chưa nghe ra
 * Bài nói KHÔNG BAO GIỜ bị tính "sai": máy nghe chưa đủ giống = khung VÀNG
 * "Máy chưa nghe rõ" (không phạt) + nút "Nói lại". Sau 2 lần chưa rõ, hoặc trình
 * duyệt không nhận diện được giọng nói -> người học TỰ so sánh (Giống rồi / Chưa giống).
 * Không có micro -> lối ra "Bỏ qua (không tính sai)".
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { SpeakSentenceExercise as SpeakSentenceData } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Kbd } from '../../../design-system/components/Kbd'
import { useLessonText } from '../lesson-player-text'
import { LessonGlyph } from '../parts/LessonGlyph'
import { SELF_NOT_YET_ANSWER, SELF_SAME_ANSWER, SPEECH_PREFIX, type ExerciseViewProps } from './exercise-contract'
import { ExerciseHeading } from './ExerciseHeading'
import { ListenHero } from './ListenHero'
import { useVoiceTake } from './use-voice-take'

export function SpeakSentenceExercise({ exercise, outcome, onSubmit }: ExerciseViewProps<SpeakSentenceData>) {
  const text = useLessonText()
  const [unclearCount, setUnclearCount] = useState(0)
  const [selfCheck, setSelfCheck] = useState(false)
  const lastOutcome = useRef(outcome)

  const take = useVoiceTake({
    maxSeconds: Math.min(20, 6 + exercise.sentence.split(' ').length),
    onDone: ({ transcripts, recordingUrl }) => {
      // trình duyệt không nhận diện được giọng -> chuyển sang tự so sánh
      if (!take.recognitionSupported) {
        if (recordingUrl) setSelfCheck(true)
        return
      }
      onSubmit(SPEECH_PREFIX + JSON.stringify({ alternatives: transcripts }))
    },
  })

  // đếm số lần "máy chưa nghe rõ" (trang cha đặt lại outcome = null khi người học bấm "Nói lại")
  useEffect(() => {
    if (outcome && outcome !== lastOutcome.current && outcome.verdict === 'unclear' && !outcome.noMic) setUnclearCount((n) => n + 1)
    if (!outcome && lastOutcome.current) take.reset()
    lastOutcome.current = outcome
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcome])

  // phím V (nói/dừng) và P (nghe lại mình)
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      if (outcome || event.ctrlKey || event.metaKey || event.altKey || target.closest('input, textarea, [role="dialog"]')) return
      const key = event.key.toLowerCase()
      if (key === 'v') {
        event.preventDefault()
        if (take.status === 'recording') take.stop()
        else void take.start()
      } else if (key === 'p' && take.recordingUrl) {
        event.preventDefault()
        take.playMine()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [outcome, take])

  const isRecording = take.status === 'recording'
  const isBusy = take.status === 'requesting' || take.status === 'processing'
  const showSelfCheck = !outcome && (selfCheck || (unclearCount >= 2 && !!take.recordingUrl))

  // từng từ của câu: sau khi chấm thì tô 3 màu
  const words = outcome?.spokenWords ?? exercise.sentence.split(' ').map((word) => ({ text: word, mark: null }))

  return (
    <>
      <ExerciseHeading icon="volume">{text.instrSpeakSentence}</ExerciseHeading>

      <div className="lp-speak-card">
        <p className="lp-speak-sentence" lang="en">
          {words.map((word, index) => (
            <span key={index} className={word.mark ? `lp-word lp-word--${word.mark}` : 'lp-word'}>
              {word.text}
            </span>
          ))}
        </p>
        <p className="lp-speak-meaning">{exercise.translationVi}</p>
        {outcome?.spokenWords && (
          <ul className="lp-word-legend" aria-label={text.youSaid}>
            <li className="lp-word--heard">{text.wordHeard}</li>
            <li className="lp-word--almost">{text.wordAlmost}</li>
            <li className="lp-word--missed">{text.wordMissed}</li>
          </ul>
        )}
        {outcome?.heardText && (
          <p className="lp-heard">
            {text.youSaid}: <em>“{outcome.heardText}”</em>
          </p>
        )}
      </div>

      {take.status === 'blocked' && !outcome ? (
        <div className="lp-mic-blocked" role="status">
          <span className="lp-mic-blocked__icon" aria-hidden>
            <LessonGlyph name="mic-off" size={22} />
          </span>
          <div>
            <strong>{text.micBlocked}</strong>
            <p>{text.micBlockedText}</p>
            <div className="ds-row ds-gap-2">
              <ListenHero text={exercise.sentence} size="md" showKeyHint={false} />
              {/* lối ra "Bỏ qua (không tính sai)" nằm ở thanh đáy — không lặp nút ở đây */}
            </div>
          </div>
        </div>
      ) : (
        <div className="lp-speak-controls">
          <div className="lp-speak-control">
            <ListenHero text={exercise.sentence} size="lg" showKeyHint={false} />
            <span className="lp-speak-control__label">{text.listenModel}</span>
          </div>

          <div className="lp-speak-control lp-speak-control--main">
            <button
              type="button"
              className={['lp-mic', isRecording && 'is-recording', isBusy && 'is-busy'].filter(Boolean).join(' ')}
              style={{ '--mic-level': take.level } as CSSProperties}
              onClick={(event) => {
                if (isRecording) take.stop()
                else void take.start()
                if (event.detail > 0) event.currentTarget.blur()
              }}
              disabled={!!outcome || isBusy}
              aria-label={isRecording ? text.stopRecording : text.record}
            >
              <span className="lp-mic__ring" aria-hidden />
              {isRecording ? <span className="lp-mic__stop" aria-hidden /> : <LessonGlyph name="mic" size={34} />}
            </button>
            <span className="lp-speak-control__label">
              {isRecording ? text.stopRecording : take.recordingUrl ? text.recordAgain : text.record}
            </span>
          </div>

          <div className="lp-speak-control">
            <button type="button" className="lp-round-btn" onClick={take.playMine} disabled={!take.recordingUrl || isRecording} aria-label={text.playMine}>
              <LessonGlyph name="ear" size={26} />
            </button>
            <span className="lp-speak-control__label">{text.playMine}</span>
          </div>
        </div>
      )}

      {!outcome && take.status !== 'blocked' && (
        <p className="lp-speak-status" aria-live="polite">
          {take.status === 'requesting' && (take.waitingPermission ? text.waitingMicPermission : text.requestingMic)}
          {isRecording && (
            <>
              <span className="lp-rec-dot" aria-hidden /> {text.listeningNow} · {take.seconds}s
            </>
          )}
          {take.status === 'processing' && text.processingSpeech}
          {(take.status === 'idle' || take.status === 'done') && !showSelfCheck && (
            <span className="lp-key-note">
              {!take.recognitionSupported ? text.speechNotSupported : null}
              <span className="lp-key-note__keys">
                <Kbd>Space</Kbd> {text.listenModel} · <Kbd>V</Kbd> {text.record} · <Kbd>P</Kbd> {text.playMine}
              </span>
            </span>
          )}
        </p>
      )}

      {showSelfCheck && (
        <div className="lp-self-check">
          <p>{text.selfCheckQuestion}</p>
          <div className="ds-row ds-gap-2">
            <Button variant="secondary" onClick={() => onSubmit(SELF_NOT_YET_ANSWER)}>
              {text.selfNotYet}
            </Button>
            <Button onClick={() => onSubmit(SELF_SAME_ANSWER)}>{text.selfSame}</Button>
          </div>
        </div>
      )}
    </>
  )
}
