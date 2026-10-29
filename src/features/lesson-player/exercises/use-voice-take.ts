/**
 * use-voice-take.ts — 1 "LƯỢT NÓI": ghi âm + nhận diện giọng nói CÙNG LÚC
 * ----------------------------------------------------------------------------
 *   const take = useVoiceTake({ maxSeconds: 12 })
 *   take.start()          // xin micro, bắt đầu ghi + nghe
 *   take.stop()           // dừng (hoặc tự dừng khi người học im lặng / hết giờ)
 *   take.status           // 'idle' | 'requesting' | 'recording' | 'processing' | 'done' | 'blocked'
 *   take.transcripts      // các phương án chữ máy nghe được (rỗng nếu trình duyệt không hỗ trợ)
 *   take.recordingUrl     // file ghi âm để "Nghe lại mình"
 *   take.level            // 0..1 độ lớn giọng (vẽ vòng sóng quanh nút micro)
 *
 * Vì sao 2 thứ cùng lúc? Web Speech API (miễn phí, có sẵn trong Chrome/Edge) chỉ
 * trả về CHỮ, không trả về âm thanh. Muốn người học nghe lại giọng mình (so với
 * giọng mẫu — cách luyện phát âm rẻ và hiệu quả nhất) thì phải ghi âm song song
 * bằng MediaRecorder.
 *
 * Không có micro / bị chặn quyền -> status 'blocked' (giao diện hiện lối ra
 * "Bỏ qua — không tính sai", spec 3 màu: vàng = không phải lỗi của người học).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { isSpeechRecognitionSupported, listenOnce } from '../../../services/speech-recognition'

export type TakeStatus = 'idle' | 'requesting' | 'recording' | 'processing' | 'done' | 'blocked'

export interface VoiceTake {
  status: TakeStatus
  transcripts: string[]
  recordingUrl: string | null
  /** trình duyệt có nhận diện giọng nói không (không có -> người học tự so sánh) */
  recognitionSupported: boolean
  /** số giây đã ghi */
  seconds: number
  /** 0..1 độ lớn giọng hiện tại */
  level: number
  /** đang chờ người học bấm "Cho phép" micro quá lâu (> 5 giây) -> hiện lời nhắc */
  waitingPermission: boolean
  start: () => Promise<void>
  stop: () => void
  reset: () => void
  playMine: () => void
}

export function useVoiceTake({ maxSeconds = 12, onDone }: { maxSeconds?: number; onDone?: (result: { transcripts: string[]; recordingUrl: string | null }) => void } = {}): VoiceTake {
  const [status, setStatus] = useState<TakeStatus>('idle')
  const [transcripts, setTranscripts] = useState<string[]>([])
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [level, setLevel] = useState(0)
  const [waitingPermission, setWaitingPermission] = useState(false)
  /** mỗi lần xin micro có 1 số thứ tự: kết quả của lần xin cũ (đã hết giờ) thì bỏ */
  const requestToken = useRef(0)
  const recognitionSupported = isSpeechRecognitionSupported()

  // các "dây điện" cần dọn khi xong / rời trang
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const recognitionStop = useRef<(() => void) | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const frameRef = useRef(0)
  const timerRef = useRef(0)
  const playerRef = useRef<HTMLAudioElement | null>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  /** kết quả nhận diện (chờ ghi âm dừng hẳn rồi mới báo) */
  const pendingTranscripts = useRef<string[]>([])

  const cleanupDevices = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    window.clearInterval(timerRef.current)
    streamRef.current?.getTracks().forEach((track) => track.stop()) // tắt đèn micro
    streamRef.current = null
    void audioContextRef.current?.close().catch(() => {})
    audioContextRef.current = null
    setLevel(0)
  }, [])

  /** Dừng máy ghi âm -> có file -> báo kết quả */
  const finishRecording = useCallback(() => {
    const recorder = recorderRef.current
    if (!recorder || recorder.state === 'inactive') {
      cleanupDevices()
      return
    }
    setStatus('processing')
    recorder.stop()
  }, [cleanupDevices])

  const start = useCallback(async () => {
    if (status === 'recording' || status === 'requesting') return
    playerRef.current?.pause()
    setTranscripts([])
    pendingTranscripts.current = []
    setSeconds(0)
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setStatus('blocked')
      return
    }
    setStatus('requesting')
    const token = ++requestToken.current
    // hộp hỏi quyền micro có thể nằm im (người học không thấy) -> nhắc sau 5 giây, bỏ cuộc sau 20 giây
    const nudge = window.setTimeout(() => setWaitingPermission(true), 5000)
    let stream: MediaStream
    try {
      stream = await Promise.race([
        navigator.mediaDevices.getUserMedia({ audio: true }),
        new Promise<never>((_, reject) => window.setTimeout(() => reject(new Error('permission timeout')), 20_000)),
      ])
    } catch {
      if (token === requestToken.current) setStatus('blocked')
      return
    } finally {
      window.clearTimeout(nudge)
      setWaitingPermission(false)
    }
    if (token !== requestToken.current) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    streamRef.current = stream

    // máy ghi âm
    const chunks: Blob[] = []
    const recorder = new MediaRecorder(stream)
    recorder.ondataavailable = (event) => event.data.size > 0 && chunks.push(event.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })
      const url = blob.size > 0 ? URL.createObjectURL(blob) : null
      setRecordingUrl((old) => {
        if (old) URL.revokeObjectURL(old)
        return url
      })
      setTranscripts(pendingTranscripts.current)
      cleanupDevices()
      setStatus('done')
      onDoneRef.current?.({ transcripts: pendingTranscripts.current, recordingUrl: url })
    }
    recorderRef.current = recorder
    recorder.start()
    setStatus('recording')

    // đo độ lớn giọng để vẽ vòng sóng
    try {
      const context = new AudioContext()
      audioContextRef.current = context
      const analyser = context.createAnalyser()
      analyser.fftSize = 256
      context.createMediaStreamSource(stream).connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      const tick = () => {
        analyser.getByteTimeDomainData(data)
        let peak = 0
        for (const value of data) peak = Math.max(peak, Math.abs(value - 128))
        setLevel(Math.min(1, peak / 64))
        frameRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch {
      /* không đo được thì thôi, vẫn ghi âm bình thường */
    }

    // đồng hồ + tự dừng khi hết giờ
    const startedAt = Date.now()
    timerRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000
      setSeconds(Math.floor(elapsed))
      if (elapsed >= maxSeconds) {
        recognitionStop.current?.()
        finishRecording()
      }
    }, 250)

    // nhận diện giọng nói chạy song song; nghe xong (người học ngừng nói) -> dừng ghi
    if (recognitionSupported) {
      const session = listenOnce()
      recognitionStop.current = session.stop
      session.result
        .then((alternatives) => {
          pendingTranscripts.current = alternatives
        })
        .catch(() => {
          pendingTranscripts.current = []
        })
        .finally(() => {
          recognitionStop.current = null
          finishRecording()
        })
    }
  }, [status, maxSeconds, recognitionSupported, finishRecording, cleanupDevices])

  const stop = useCallback(() => {
    if (status !== 'recording') return
    if (recognitionStop.current) recognitionStop.current() // kết quả nhận diện sẽ gọi finishRecording
    else finishRecording()
  }, [status, finishRecording])

  const reset = useCallback(() => {
    playerRef.current?.pause()
    setStatus('idle')
    setTranscripts([])
    setSeconds(0)
  }, [])

  const playMine = useCallback(() => {
    if (!recordingUrl) return
    playerRef.current?.pause()
    const audio = new Audio(recordingUrl)
    playerRef.current = audio
    void audio.play().catch(() => {})
  }, [recordingUrl])

  // rời câu: tắt micro, dừng nhận diện, xoá file tạm
  useEffect(
    () => () => {
      recognitionStop.current?.()
      if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
      cleanupDevices()
      playerRef.current?.pause()
    },
    [cleanupDevices],
  )
  useEffect(() => () => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl)
  }, [recordingUrl])

  return { status, transcripts, recordingUrl, recognitionSupported, seconds, level, waitingPermission, start, stop, reset, playMine }
}
