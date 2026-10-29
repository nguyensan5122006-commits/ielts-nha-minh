/**
 * exam-audio.ts — PHÁT AUDIO CỦA PHẦN NGHE TRONG ĐỀ THI (mỗi Part = 1 kịch bản "Tên: lời")
 * ----------------------------------------------------------------------------
 *   const audio = useExamAudio({ onEnded: (key) => … })
 *   audio.play('0-1', part.audioScript, { from: 42 })   // phát Part 2 từ giây 42
 *   audio.pause() · audio.resume() · audio.seekBy(-5) · audio.setRate(0.75) · audio.stop()
 *   audio.view -> { status, key, currentTime, duration, rate, usingFile }
 *
 * Đề thi cũ dùng `audioScript` (không phải ListeningTask.segments như bài học v3), và lệnh
 * `npm run tts:v3` đã tạo sẵn 1 file mp3 cho mỗi kịch bản, mã = hashAudioText(kịch bản)
 * (đã kiểm: cả 18 Part của 7 đề đều có file). Vì vậy ở đây dùng thẳng 1 thẻ <audio>:
 * tua chính xác, biết thời lượng thật, lưu được "đang nghe tới giây thứ mấy" để làm tiếp.
 * Không có file (VD đề mới chưa chạy TTS) -> đọc bằng giọng trình duyệt qua speak() (không tua được).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { getClipInfo, hashAudioText, speak, stopSpeaking } from '../../services/text-to-speech'

export type ExamAudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended'

export interface ExamAudioView {
  status: ExamAudioStatus
  /** Part đang phát (partKey) */
  key: string | null
  currentTime: number
  duration: number
  rate: number
  /** true = phát file mp3 (tua được); false = giọng trình duyệt */
  usingFile: boolean
}

const IDLE: ExamAudioView = { status: 'idle', key: null, currentTime: 0, duration: 0, rate: 1, usingFile: true }

/** Ước lượng thời lượng khi phải đọc bằng giọng trình duyệt (~14 ký tự / giây). */
const estimateSeconds = (script: string) => 0.4 + script.length / 14

/** Thời lượng thật của file mp3 (giây) — để hiện "3:11" trước khi phát. null = chưa có file. */
export async function scriptDuration(script: string): Promise<number | null> {
  return (await getClipInfo(hashAudioText(script)))?.durationSec ?? null
}

export function useExamAudio({ onEnded }: { onEnded?: (key: string) => void } = {}) {
  const [view, setView] = useState<ExamAudioView>(IDLE)
  const element = useRef<HTMLAudioElement | null>(null)
  const viewRef = useRef(view)
  viewRef.current = view
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded
  // mỗi lần play() tăng số này -> sự kiện của lần phát cũ (đến muộn) bị bỏ qua
  const token = useRef(0)

  const detach = useCallback(() => {
    const audio = element.current
    if (audio) {
      audio.onended = null
      audio.ontimeupdate = null
      audio.onloadedmetadata = null
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
    element.current = null
  }, [])

  const stop = useCallback(() => {
    token.current++
    detach()
    stopSpeaking()
    setView((current) => ({ ...IDLE, rate: current.rate }))
  }, [detach])

  const play = useCallback(
    async (key: string, script: string, options: { from?: number; rate?: number } = {}) => {
      const myToken = ++token.current
      detach()
      stopSpeaking()
      const rate = options.rate ?? viewRef.current.rate
      setView({ status: 'loading', key, currentTime: options.from ?? 0, duration: estimateSeconds(script), rate, usingFile: true })
      const clip = await getClipInfo(hashAudioText(script))
      if (myToken !== token.current) return

      if (!clip) {
        // không có file -> giọng trình duyệt, phát từ đầu
        setView({ status: 'playing', key, currentTime: 0, duration: estimateSeconds(script), rate, usingFile: false })
        await speak(script, rate)
        if (myToken !== token.current) return
        setView((current) => ({ ...current, status: 'ended', currentTime: current.duration }))
        onEndedRef.current?.(key)
        return
      }

      const audio = new Audio(clip.url)
      element.current = audio
      audio.preload = 'auto'
      audio.playbackRate = rate
      const from = Math.max(0, Math.min(options.from ?? 0, clip.durationSec - 0.5))
      audio.onloadedmetadata = () => {
        if (from > 0) audio.currentTime = from
      }
      audio.ontimeupdate = () => {
        if (myToken !== token.current) return
        setView((current) => ({ ...current, currentTime: audio.currentTime, duration: Number.isFinite(audio.duration) ? audio.duration : current.duration }))
      }
      audio.onended = () => {
        if (myToken !== token.current) return
        setView((current) => ({ ...current, status: 'ended', currentTime: current.duration }))
        onEndedRef.current?.(key)
      }
      setView({ status: 'loading', key, currentTime: from, duration: clip.durationSec, rate, usingFile: true })
      try {
        await audio.play()
        if (myToken !== token.current) return
        setView((current) => ({ ...current, status: 'playing' }))
      } catch {
        // trình duyệt chặn tự phát (chưa có cú bấm nào trên trang) -> để người học bấm "Phát tiếp"
        if (myToken !== token.current) return
        setView((current) => ({ ...current, status: 'paused' }))
      }
    },
    [detach],
  )

  const pause = useCallback(() => {
    const audio = element.current
    if (audio) {
      audio.pause()
      setView((current) => (current.status === 'playing' ? { ...current, status: 'paused', currentTime: audio.currentTime } : current))
    } else if (viewRef.current.status === 'playing') {
      // giọng trình duyệt không dừng giữa chừng được -> dừng hẳn, lần sau phát lại từ đầu
      token.current++
      stopSpeaking()
      setView((current) => ({ ...current, status: 'paused', currentTime: 0 }))
    }
  }, [])

  const resume = useCallback(() => {
    const audio = element.current
    if (!audio) return false
    void audio
      .play()
      .then(() => setView((current) => ({ ...current, status: 'playing' })))
      .catch(() => setView((current) => ({ ...current, status: 'paused' })))
    return true
  }, [])

  const seekTo = useCallback((seconds: number) => {
    const audio = element.current
    if (!audio) return
    const duration = Number.isFinite(audio.duration) ? audio.duration : viewRef.current.duration
    audio.currentTime = Math.max(0, Math.min(seconds, Math.max(0, duration - 0.2)))
    setView((current) => ({ ...current, currentTime: audio.currentTime }))
  }, [])

  const seekBy = useCallback((delta: number) => seekTo((element.current?.currentTime ?? 0) + delta), [seekTo])

  const setRate = useCallback((rate: number) => {
    if (element.current) element.current.playbackRate = rate
    setView((current) => ({ ...current, rate }))
  }, [])

  // rời trang -> tắt tiếng (và đưa trạng thái về 'idle': khi dev sửa code, React giữ state nhưng audio đã bị huỷ)
  useEffect(
    () => () => {
      token.current++
      detach()
      stopSpeaking()
      setView((current) => ({ ...IDLE, rate: current.rate }))
    },
    [detach],
  )

  return { view, play, pause, resume, stop, seekTo, seekBy, setRate }
}

export type ExamAudio = ReturnType<typeof useExamAudio>

/** 191.7 -> "3:11" */
export function formatAudioTime(seconds: number): string {
  const whole = Math.max(0, Math.round(seconds))
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}
