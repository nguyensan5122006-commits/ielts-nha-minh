/**
 * SpeakingRecorder.tsx — MÁY GHI ÂM 1 CÂU TRẢ LỜI (đủ trạng thái, kiểu Speak & Improve)
 * ----------------------------------------------------------------------------
 *   sẵn sàng   : nút tròn lớn "Bắt đầu ghi âm" + vạch mức micro (biết micro đang nhận tiếng)
 *   đang ghi   : chấm đỏ thở + SÓNG ÂM chạy từ phải sang trái + thanh thời gian "Còn 0:42" + nút Dừng
 *   đang xử lý : vòng xoay "Đang xử lý bản ghi…" (đổi webm -> WAV để AI nghe được)
 *   đã ghi     : nút ▶ + sóng âm tĩnh của cả bài (phần đã nghe tô màu) + độ dài + "Ghi lại"
 * Quyền micro do MicGate + use-microphone.ts lo; việc ghi + đổi WAV do services/audio-recorder.ts.
 * Phím R = ghi / dừng (không áp dụng khi đang gõ trong ô chữ).
 * Bản ghi chỉ nằm trong bộ nhớ trình duyệt (object URL) — không gửi đi đâu.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { formatClock } from '../../design-system/components/Timer'
import { Icon } from '../../design-system/components/Icon'
import { Kbd } from '../../design-system/components/Kbd'
import { VoiceRecorder, type RecordedAudio } from '../../services/audio-recorder'
import { useSpeakingText } from './skill-speaking-text'
import type { MicrophoneHandle } from './use-microphone'

/** 1 lần ghi: file WAV (để gửi AI) + đường dẫn nghe lại + dãy độ cao sóng âm (để vẽ lại). */
export interface RecordingTake extends RecordedAudio {
  peaks: number[]
}

interface SpeakingRecorderProps {
  mic: MicrophoneHandle
  maxSeconds: number
  take: RecordingTake | null
  onRecorded: (take: RecordingTake) => void
  /** bắt đầu ghi ngay khi hiện ra (pha "Nói" của cue card) */
  autoStart?: boolean
  onRecordingChange?: (recording: boolean) => void
  /** vạch mục tiêu trên thanh thời gian (giây), VD 100 = 1:40 cho Part 2 */
  targetSeconds?: number
  /** lg = cue card (sóng âm cao hơn) */
  size?: 'md' | 'lg'
  enableShortcut?: boolean
}

const PEAK_INTERVAL_MS = 60 // mỗi 60ms lấy 1 vạch sóng

export function SpeakingRecorder({
  mic,
  maxSeconds,
  take,
  onRecorded,
  autoStart = false,
  onRecordingChange,
  targetSeconds,
  size = 'md',
  enableShortcut = true,
}: SpeakingRecorderProps) {
  const text = useSpeakingText()
  const recorderRef = useRef<VoiceRecorder | null>(null)
  const [phase, setPhase] = useState<'idle' | 'recording' | 'processing'>('idle')
  const [elapsed, setElapsed] = useState(0)
  const [error, setError] = useState(false)
  const peaksRef = useRef<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startedAtRef = useRef(0)
  const frameRef = useRef(0)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  const stop = useCallback(async () => {
    const recorder = recorderRef.current
    if (!recorder || phaseRef.current !== 'recording') return
    cancelAnimationFrame(frameRef.current)
    setPhase('processing')
    try {
      const audio = await recorder.stop()
      onRecorded({ ...audio, peaks: [...peaksRef.current] })
    } catch {
      setError(true)
    }
    recorderRef.current = null
    setPhase('idle')
    onRecordingChange?.(false)
  }, [onRecorded, onRecordingChange])

  const start = useCallback(async () => {
    if (phaseRef.current !== 'idle' || mic.state !== 'ready') return
    setError(false)
    const recorder = new VoiceRecorder()
    try {
      await recorder.start()
    } catch {
      setError(true)
      return
    }
    recorderRef.current = recorder
    peaksRef.current = []
    startedAtRef.current = performance.now()
    setElapsed(0)
    setPhase('recording')
    onRecordingChange?.(true)
  }, [mic.state, onRecordingChange])

  // Vòng vẽ sóng âm + đếm giờ + tự dừng khi hết thời gian
  useEffect(() => {
    if (phase !== 'recording') return
    let lastPeakAt = 0
    let lastSecond = -1
    const loop = (now: number) => {
      const seconds = (now - startedAtRef.current) / 1000
      if (now - lastPeakAt >= PEAK_INTERVAL_MS) {
        peaksRef.current.push(mic.readLevel())
        lastPeakAt = now
        drawLive(canvasRef.current, peaksRef.current)
      }
      const whole = Math.floor(seconds * 4) / 4
      if (whole !== lastSecond) {
        lastSecond = whole
        setElapsed(seconds)
      }
      if (seconds >= maxSeconds) {
        void stop()
        return
      }
      frameRef.current = requestAnimationFrame(loop)
    }
    frameRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameRef.current)
  }, [phase, maxSeconds, mic, stop])

  // Tự bắt đầu (cue card) — chỉ 1 lần
  const autoStarted = useRef(false)
  useEffect(() => {
    if (autoStart && !autoStarted.current && mic.state === 'ready') {
      autoStarted.current = true
      void start()
    }
  }, [autoStart, mic.state, start])

  // Rời màn khi đang ghi -> huỷ, tắt micro
  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current)
      recorderRef.current?.cancel()
    },
    [],
  )

  // Phím R
  useEffect(() => {
    if (!enableShortcut) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== 'r' || event.ctrlKey || event.metaKey || event.altKey) return
      if ((event.target as HTMLElement).closest('input, textarea, [contenteditable="true"]')) return
      event.preventDefault()
      if (phaseRef.current === 'recording') void stop()
      else if (phaseRef.current === 'idle') void start()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enableShortcut, start, stop])

  if (mic.state !== 'ready') {
    return <p className="speaking-recorder__no-mic">{text.noMicMode}</p>
  }

  const left = Math.max(0, maxSeconds - elapsed)

  /* ---------- đang ghi ---------- */
  if (phase === 'recording') {
    return (
      <div className={`speaking-recorder speaking-recorder--${size} is-recording`}>
        <div className="speaking-recorder__live">
          <span className="speaking-recorder__rec-dot" aria-hidden />
          <span className="speaking-recorder__rec-label">{text.recording}</span>
          <span className="speaking-recorder__clock ds-num" aria-hidden>
            {formatClock(elapsed)}
          </span>
        </div>
        <canvas ref={canvasRef} className="speaking-recorder__wave" aria-hidden />
        <div className="speaking-recorder__timebar" role="timer" aria-label={text.secondsLeft(Math.ceil(left))}>
          <span className="speaking-recorder__timebar-fill" style={{ width: `${(elapsed / maxSeconds) * 100}%` }} />
          {targetSeconds && <span className="speaking-recorder__target" style={{ left: `${(targetSeconds / maxSeconds) * 100}%` }} />}
          <span className="speaking-recorder__timebar-text ds-num">{text.timeLeft(formatClock(left))}</span>
        </div>
        <button type="button" className="speaking-recorder__stop" onClick={() => void stop()}>
          <span className="speaking-recorder__stop-square" aria-hidden />
          {text.recordStop}
          <Kbd>{text.keyRecord}</Kbd>
        </button>
      </div>
    )
  }

  /* ---------- đang xử lý ---------- */
  if (phase === 'processing') {
    return (
      <div className={`speaking-recorder speaking-recorder--${size} is-processing`} role="status">
        <span className="spinner speaking-recorder__spinner" aria-hidden />
        {text.processing}
      </div>
    )
  }

  /* ---------- đã có bản ghi ---------- */
  if (take) {
    return (
      <div className={`speaking-recorder speaking-recorder--${size} is-recorded`}>
        <TakePlayer take={take} />
        <button type="button" className="speaking-recorder__again" onClick={() => void start()}>
          <Icon name="retry" size={18} />
          {text.recordAgain}
        </button>
        {error && <p className="speaking-recorder__error">{text.recordFailed}</p>}
      </div>
    )
  }

  /* ---------- sẵn sàng ---------- */
  return (
    <div className={`speaking-recorder speaking-recorder--${size} is-ready`}>
      <button type="button" className="speaking-recorder__record" onClick={() => void start()}>
        <span className="speaking-recorder__mic" aria-hidden>
          <MicGlyph />
        </span>
        <span className="speaking-recorder__record-text">
          {text.recordStart}
          <span className="speaking-recorder__record-sub">
            {formatClock(maxSeconds)} · <Kbd>{text.keyRecord}</Kbd>
          </span>
        </span>
      </button>
      <MicLevel mic={mic} />
      {error && <p className="speaking-recorder__error">{text.recordFailed}</p>}
    </div>
  )
}

/* ============================================================================
 * Nghe lại bản ghi: ▶ + sóng âm tĩnh, phần đã phát tô màu
 * ========================================================================== */

export function TakePlayer({ take, compact = false }: { take: RecordingTake; compact?: boolean }) {
  const text = useSpeakingText()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const audio = new Audio(take.playbackUrl)
    audioRef.current = audio
    const onTime = () => setPosition(audio.currentTime)
    const onEnd = () => {
      setPlaying(false)
      setPosition(0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [take.playbackUrl])

  useEffect(() => {
    drawStatic(canvasRef.current, take.peaks, take.durationSeconds ? position / take.durationSeconds : 0)
  }, [take, position])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      void audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return (
    <div className={`take-player${compact ? ' take-player--compact' : ''}`}>
      <button type="button" className="take-player__play" onClick={toggle} aria-label={playing ? text.pauseMine : text.playMine} title={playing ? text.pauseMine : text.playMine}>
        <Icon name={playing ? 'pause' : 'play-fill'} size={compact ? 16 : 20} />
      </button>
      <canvas ref={canvasRef} className="take-player__wave" aria-hidden />
      <span className="take-player__time ds-num">{formatClock(take.durationSeconds)}</span>
    </div>
  )
}

/** Vạch mức micro ở trạng thái sẵn sàng: nói thử thấy vạch nhảy = micro đang nghe. */
function MicLevel({ mic }: { mic: MicrophoneHandle }) {
  const text = useSpeakingText()
  const barRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let frame = 0
    const loop = () => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, mic.readLevel())})`
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [mic])
  return (
    <span className="speaking-recorder__level" title={text.micLevel}>
      <Icon name="volume" size={14} />
      <span className="speaking-recorder__level-track">
        <span ref={barRef} className="speaking-recorder__level-fill" />
      </span>
    </span>
  )
}

function MicGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </svg>
  )
}

/* ============================================================================
 * Vẽ sóng âm bằng canvas (màu lấy từ CSS color của canvas -> tự theo sáng/tối)
 * ========================================================================== */

function prepareCanvas(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio || 1
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
  }
  const context = canvas.getContext('2d')!
  context.setTransform(ratio, 0, 0, ratio, 0, 0)
  context.clearRect(0, 0, width, height)
  return { context, width, height }
}

const BAR = 3
const GAP = 2

/** Sóng âm trực tiếp: vạch mới nhất ở mép phải, cũ trôi sang trái. */
function drawLive(canvas: HTMLCanvasElement | null, peaks: number[]) {
  if (!canvas) return
  const { context, width, height } = prepareCanvas(canvas)
  const color = getComputedStyle(canvas).color
  const count = Math.floor(width / (BAR + GAP))
  const visible = peaks.slice(-count)
  context.fillStyle = color
  visible.forEach((peak, i) => {
    const barHeight = Math.max(2, peak * (height - 4))
    const x = width - (visible.length - i) * (BAR + GAP)
    context.beginPath()
    context.roundRect(x, (height - barHeight) / 2, BAR, barHeight, 1.5)
    context.fill()
  })
}

/** Sóng âm tĩnh của cả bản ghi, gom vạch cho vừa bề ngang; phần đã phát tô màu nhấn. */
function drawStatic(canvas: HTMLCanvasElement | null, peaks: number[], playedFraction: number) {
  if (!canvas) return
  const { context, width, height } = prepareCanvas(canvas)
  const styles = getComputedStyle(canvas)
  const played = styles.color
  const rest = styles.getPropertyValue('--wave-rest').trim() || 'rgba(128,128,128,.4)'
  const count = Math.max(1, Math.floor(width / (BAR + GAP)))
  const bucket = peaks.length / count
  for (let i = 0; i < count; i++) {
    const slice = peaks.slice(Math.floor(i * bucket), Math.max(Math.floor(i * bucket) + 1, Math.floor((i + 1) * bucket)))
    const peak = slice.length ? Math.max(...slice) : 0
    const barHeight = Math.max(2, peak * (height - 4))
    context.fillStyle = i / count <= playedFraction && playedFraction > 0 ? played : rest
    context.beginPath()
    context.roundRect(i * (BAR + GAP), (height - barHeight) / 2, BAR, barHeight, 1.5)
    context.fill()
  }
}
