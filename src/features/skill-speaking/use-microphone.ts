/**
 * use-microphone.ts — QUYỀN MICRO + "TAI NGHE" ÂM LƯỢNG ĐỂ VẼ SÓNG ÂM
 * ----------------------------------------------------------------------------
 * Trạng thái micro (ý 7 trong _research/notes/ui-ielts-ai.md — xin quyền có giải thích trước,
 * không bật hộp thoại bất ngờ):
 *   'checking'    đang hỏi trình duyệt đã cho phép chưa
 *   'prompt'      chưa cho phép -> hiện thẻ giải thích + nút "Cho phép dùng micro"
 *   'requesting'  hộp thoại của trình duyệt đang mở
 *   'ready'       có luồng âm thanh -> vẽ sóng âm, ghi âm được
 *   'denied'      người dùng / trình duyệt chặn -> hướng dẫn mở lại
 *   'unsupported' không có micro / trình duyệt không hỗ trợ -> cho luyện không ghi âm
 *
 * Việc GHI ÂM thật vẫn do services/audio-recorder.ts (VoiceRecorder) làm — hook này chỉ giữ
 * 1 luồng micro riêng để đo âm lượng (AnalyserNode) cho sóng âm trực tiếp + vạch mức micro.
 * readLevel(): 0..1, gọi mỗi khung hình khi cần vẽ.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'

export type MicState = 'checking' | 'prompt' | 'requesting' | 'ready' | 'denied' | 'unsupported'

export interface MicrophoneHandle {
  state: MicState
  request: () => Promise<void>
  /** mức âm hiện tại 0..1 (RMS, đã phóng cho dễ nhìn) */
  readLevel: () => number
  /** người học chọn "tiếp tục không ghi âm" */
  useWithoutMic: boolean
  continueWithoutMic: () => void
}

export function useMicrophone(): MicrophoneHandle {
  const [state, setState] = useState<MicState>('checking')
  const [useWithoutMic, setUseWithoutMic] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const contextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const bufferRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const aliveRef = useRef(true) // component còn trên màn hình? (tránh giữ micro sau khi rời trang)

  const open = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
    if (!aliveRef.current) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = stream
    const context = new AudioContext()
    const analyser = context.createAnalyser()
    analyser.fftSize = 1024
    context.createMediaStreamSource(stream).connect(analyser)
    contextRef.current = context
    analyserRef.current = analyser
    bufferRef.current = new Uint8Array(new ArrayBuffer(analyser.fftSize))
    setState('ready')
  }, [])

  const request = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setState('unsupported')
      return
    }
    setState('requesting')
    try {
      await open()
    } catch (error) {
      const name = (error as DOMException)?.name
      setState(name === 'NotFoundError' || name === 'NotReadableError' || name === 'OverconstrainedError' ? 'unsupported' : 'denied')
    }
  }, [open])

  // Lúc mở: đã cho phép từ trước -> bật luôn (không hỏi lại); chưa -> chờ người học bấm
  useEffect(() => {
    let cancelled = false
    aliveRef.current = true
    async function check() {
      if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        setState('unsupported')
        return
      }
      try {
        const status = await navigator.permissions?.query({ name: 'microphone' as PermissionName })
        if (cancelled) return
        if (status?.state === 'granted') await request()
        else if (status?.state === 'denied') setState('denied')
        else setState('prompt')
      } catch {
        if (!cancelled) setState('prompt') // trình duyệt không có Permissions API cho micro
      }
    }
    void check()
    return () => {
      cancelled = true
      aliveRef.current = false
      streamRef.current?.getTracks().forEach((track) => track.stop())
      void contextRef.current?.close().catch(() => {})
    }
  }, [request])

  const readLevel = useCallback(() => {
    const analyser = analyserRef.current
    const buffer = bufferRef.current
    if (!analyser || !buffer) return 0
    analyser.getByteTimeDomainData(buffer)
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
      const sample = (buffer[i] - 128) / 128
      sum += sample * sample
    }
    const rms = Math.sqrt(sum / buffer.length)
    return Math.min(1, rms * 4.5) // giọng nói thường có RMS 0.02–0.2 -> phóng lên cho sóng dễ nhìn
  }, [])

  return { state, request, readLevel, useWithoutMic, continueWithoutMic: () => setUseWithoutMic(true) }
}
