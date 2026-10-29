/**
 * VoiceRecorderPanel.tsx — KHUNG GHI ÂM
 * Nút bắt đầu / dừng, đồng hồ đếm giây, tự dừng khi hết thời gian tối đa,
 * và trình phát để nghe lại. Ghi xong gọi onRecorded(audio).
 */
import { useEffect, useRef, useState } from 'react'
import { VoiceRecorder, type RecordedAudio } from '../services/audio-recorder'
import { useLanguage } from '../translations/language-context'

interface VoiceRecorderPanelProps {
  maxSeconds: number
  onRecorded: (audio: RecordedAudio) => void
  disabled?: boolean
  /** true = tự bắt đầu ghi ngay khi hiện ra (dùng trong phòng thi) */
  autoStart?: boolean
}

export function VoiceRecorderPanel({ maxSeconds, onRecorded, disabled, autoStart }: VoiceRecorderPanelProps) {
  const { t } = useLanguage()
  const recorder = useRef(new VoiceRecorder())
  const [isRecording, setIsRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function start() {
    setError('')
    try {
      await recorder.current.start()
      setSeconds(0)
      setIsRecording(true)
    } catch {
      setError(t('micDenied'))
    }
  }

  async function stop() {
    if (!recorder.current.isRecording) return
    setIsRecording(false)
    const audio = await recorder.current.stop()
    setPlaybackUrl(audio.playbackUrl)
    onRecorded(audio)
  }

  // đồng hồ: mỗi giây +1, đủ maxSeconds thì tự dừng
  useEffect(() => {
    if (!isRecording) return
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(timer)
  }, [isRecording])
  useEffect(() => {
    if (isRecording && seconds >= maxSeconds) void stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isRecording, maxSeconds])

  // tự bắt đầu (phòng thi) + huỷ ghi âm khi rời khỏi component
  const hasAutoStarted = useRef(false) // tránh bật micro 2 lần (React StrictMode chạy effect 2 lần khi dev)
  useEffect(() => {
    const current = recorder.current
    if (autoStart && !hasAutoStarted.current) {
      hasAutoStarted.current = true
      void start()
    }
    return () => current.cancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="stack" style={{ gap: 10 }}>
      {isRecording ? (
        <button type="button" className="microphone-button is-active" onClick={stop}>
          ⏹ {t('recordingSeconds', { s: maxSeconds - seconds })} — {t('stopRecording')}
        </button>
      ) : (
        <button type="button" className="microphone-button" onClick={start} disabled={disabled}>
          🎙 {playbackUrl ? t('recordAgain') : t('startRecording')}
        </button>
      )}
      {playbackUrl && !isRecording && <audio controls src={playbackUrl} style={{ width: '100%' }} />}
      {error && <div className="alert">{error}</div>}
    </div>
  )
}
