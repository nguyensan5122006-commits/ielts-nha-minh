/**
 * PronunciationDrill.tsx — LUYỆN ÂM MỤC TIÊU (targetSounds) BẰNG NHẬN DẠNG GIỌNG NÓI MIỄN PHÍ
 * ----------------------------------------------------------------------------
 * Vòng "Nghe mẫu → Đọc → Xem màu → Nghe mình" (ui-langapps.md ý 1 + ui-vn-b.md ý 3):
 *   - câu lấy từ bài mẫu band cao nhất, gạch chân các từ chứa âm cần luyện (-ed, -s, /θ/…)
 *   - "Đọc câu này": Web Speech API (services/speech-recognition.ts) nghe + đồng thời ghi âm
 *     (services/audio-recorder.ts) để nghe lại so A/B với giọng mẫu
 *   - tô màu từng từ 3 mức Đúng / Gần đúng / Chưa đúng, KHÔNG có %; tên riêng tiếng Việt không chấm
 *   - máy không nghe được gì -> khung VÀNG "Máy chưa nghe rõ — không tính là sai"
 * Không gửi gì lên máy chủ của web (Web Speech API của Chrome tự xử lý giọng nói).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { SpeakingTask } from '../../content/content-types'
import { AudioButton } from '../../design-system/components/AudioButton'
import { Button } from '../../design-system/components/Button'
import { Icon } from '../../design-system/components/Icon'
import { VoiceRecorder } from '../../services/audio-recorder'
import { isSpeechRecognitionSupported, listenOnce } from '../../services/speech-recognition'
import { pickDrillSentences, scoreReading, type ScoredWord } from './pronunciation-check'
import { useSpeakingText } from './skill-speaking-text'
import { TakePlayer, type RecordingTake } from './SpeakingRecorder'
import type { MicrophoneHandle } from './use-microphone'

type DrillState =
  | { status: 'idle' }
  | { status: 'listening' }
  | { status: 'scored'; words: ScoredWord[]; heard: string }
  | { status: 'unclear' }

export function PronunciationDrill({ task, mic }: { task: SpeakingTask; mic: MicrophoneHandle }) {
  const text = useSpeakingText()
  const sentences = useMemo(() => pickDrillSentences(task), [task])
  const recognitionSupported = isSpeechRecognitionSupported()

  return (
    <section className="drill" aria-labelledby="drill-title">
      <header className="drill__head">
        <h3 id="drill-title" className="drill__title">
          {text.drillTitle}
        </h3>
        <p className="drill__intro">{text.drillIntro}</p>
        {task.targetSounds && task.targetSounds.length > 0 && (
          <div className="drill__targets">
            <span className="drill__targets-label">{text.drillTargets}:</span>
            {task.targetSounds.map((sound) => (
              <span key={sound} className="drill__target-chip" lang="en">
                {sound}
              </span>
            ))}
          </div>
        )}
        <DrillLegend />
        {!recognitionSupported && <p className="drill__notice drill__notice--unclear">{text.drillUnsupported}</p>}
      </header>

      {sentences.length === 0 ? (
        <p className="drill__empty">{text.drillNoSentences}</p>
      ) : (
        <ol className="drill__list">
          {sentences.map((item, index) => (
            <DrillSentence key={item.sentence} index={index} sentence={item.sentence} targetWords={item.targetWords} mic={mic} recognitionSupported={recognitionSupported} />
          ))}
        </ol>
      )}
    </section>
  )
}

function DrillLegend() {
  const text = useSpeakingText()
  return (
    <ul className="drill__legend" aria-label="legend">
      <li>
        <span className="drill__swatch drill__swatch--good" /> {text.levelGood}
      </li>
      <li>
        <span className="drill__swatch drill__swatch--close" /> {text.levelClose}
      </li>
      <li>
        <span className="drill__swatch drill__swatch--missed" /> {text.levelMissed}
      </li>
      <li>
        <span className="drill__swatch drill__swatch--skip" /> {text.levelSkip}
      </li>
    </ul>
  )
}

function DrillSentence({
  index,
  sentence,
  targetWords,
  mic,
  recognitionSupported,
}: {
  index: number
  sentence: string
  targetWords: string[]
  mic: MicrophoneHandle
  recognitionSupported: boolean
}) {
  const text = useSpeakingText()
  const [state, setState] = useState<DrillState>({ status: 'idle' })
  const [take, setTake] = useState<RecordingTake | null>(null)
  const stopRef = useRef<(() => void) | null>(null)
  const recorderRef = useRef<VoiceRecorder | null>(null)
  const targets = new Set(targetWords)

  useEffect(
    () => () => {
      stopRef.current?.()
      recorderRef.current?.cancel()
    },
    [],
  )

  async function read() {
    setState({ status: 'listening' })
    // ghi âm song song để nghe lại (nếu có micro); lỗi ghi âm không chặn việc nhận dạng
    let recorder: VoiceRecorder | null = null
    if (mic.state === 'ready') {
      recorder = new VoiceRecorder()
      try {
        await recorder.start()
        recorderRef.current = recorder
      } catch {
        recorder = null
      }
    }
    let transcripts: string[] = []
    if (recognitionSupported) {
      const listening = listenOnce()
      stopRef.current = listening.stop
      transcripts = await listening.result.catch(() => [])
      stopRef.current = null
    } else {
      // không nhận dạng được: ghi tối đa 12 giây hoặc tới khi bấm Xong
      await new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, 12_000)
        stopRef.current = () => {
          window.clearTimeout(timer)
          resolve()
        }
      })
      stopRef.current = null
    }
    if (recorder) {
      try {
        const audio = await recorder.stop()
        setTake({ ...audio, peaks: [] })
      } catch {
        /* bỏ qua — vẫn có kết quả nhận dạng */
      }
      recorderRef.current = null
    }
    const scored = scoreReading(sentence, transcripts, targetWords)
    setState(scored ? { status: 'scored', ...scored } : { status: 'unclear' })
  }

  const words: ScoredWord[] =
    state.status === 'scored'
      ? state.words
      : sentence.split(/\s+/).map((display) => ({ display, level: 'skip' as const, target: targets.has(display.toLowerCase().replace(/^[^a-z']+|[^a-z']+$/g, '')) }))
  const targetResults = state.status === 'scored' ? state.words.filter((w) => w.target) : []

  return (
    <li className={`drill__item is-${state.status}`}>
      <span className="drill__number">{index + 1}</span>
      <div className="drill__body">
        <p className="drill__sentence" lang="en">
          {words.map((word, i) => (
            <span key={i} className={`drill__word${state.status === 'scored' ? ` is-${word.level}` : ''}${word.target ? ' is-target' : ''}`}>
              {word.display}{' '}
            </span>
          ))}
        </p>

        <div className="drill__actions">
          <AudioButton text={sentence} size="sm" label={text.drillListen} />
          {state.status === 'listening' ? (
            <Button variant="secondary" size="sm" onClick={() => stopRef.current?.()}>
              <span className="drill__listening-dot" aria-hidden /> {text.drillListening} · {text.drillStop}
            </Button>
          ) : (
            <Button variant={state.status === 'idle' ? 'primary' : 'secondary'} size="sm" iconLeft={state.status === 'idle' ? undefined : 'retry'} onClick={() => void read()}>
              {state.status === 'idle' ? text.drillSpeak : text.drillAgain}
            </Button>
          )}
          {take && state.status !== 'listening' && (
            <span className="drill__mine">
              <TakePlayer take={take} compact />
            </span>
          )}
        </div>

        {state.status === 'scored' && (
          <p className="drill__result" role="status">
            <Icon name="check" size={14} /> {text.drillSummaryGood(targetResults.filter((w) => w.level === 'good').length, targetResults.length)}
            <span className="drill__heard">
              {text.drillHeard} “{state.heard}”
            </span>
          </p>
        )}
        {state.status === 'unclear' && (
          <div className="drill__notice drill__notice--unclear" role="status">
            <strong>{text.drillUnclearTitle}</strong> {text.drillUnclear}
          </div>
        )}
      </div>
    </li>
  )
}
