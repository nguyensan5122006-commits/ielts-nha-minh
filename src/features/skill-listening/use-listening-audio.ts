/**
 * use-listening-audio.ts
 * ----------------------------------------------------------------------------
 * ĐIỀU KHIỂN AUDIO CỦA BÀI NGHE (hook React) — bọc API của nhóm âm thanh
 * (src/services/text-to-speech.ts: playSegment + PlaybackHandle).
 *
 *   const audio = useListeningAudio(task.segments, { autoAdvance: true })
 *   audio.play(1)                 phát đoạn 2 từ đầu
 *   audio.playFromLine(1, 4)      "Nghe từ đoạn này": phát đoạn 2 từ dòng thoại thứ 5
 *   audio.toggle() · seekBy(-5) · setRate(0.75) · stop()
 *   audio.segmentIndex / status / currentTime / duration / currentLine / rate / durations
 *
 * Cách tìm vị trí 1 dòng thoại trong file mp3 ghép sẵn của cả đoạn:
 *   file không có mốc thời gian từng dòng -> ước lượng theo độ dài chữ (cùng công thức
 *   ~14 ký tự/giây + 0,35 giây nghỉ giữa 2 người nói như text-to-speech.ts), rồi CO GIÃN
 *   cho khớp tổng thời lượng thật của file. Sai số ~1 giây -> lùi thêm 1 giây cho chắc.
 * Không có file mp3 -> text-to-speech.ts tự đọc bằng giọng trình duyệt (speechSynthesis);
 *   khi đó mỗi dòng là 1 bước, tua sẽ nhảy về đầu dòng gần nhất.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AudioLine } from '../../content/content-types'
import { segmentKey } from '../../services/audio-clip-keys'
import { getClipInfo, playSegment, type PlaybackHandle } from '../../services/text-to-speech'

export type AudioStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'ended'

export interface ListeningSegment {
  id: string
  lines: AudioLine[]
}

/** Thời lượng ước tính của 1 dòng (giây) — cùng công thức với text-to-speech.ts. */
const estimateLineSeconds = (text: string) => 0.4 + text.length / 14
const GAP_SECONDS = 0.35
/** lùi thêm khi "nghe từ đây" để không mất chữ đầu */
const LEAD_IN_SECONDS = 1

/** Mốc bắt đầu (ước tính, giây) của từng dòng + tổng ước tính. */
export function estimatedLineOffsets(lines: AudioLine[]): { offsets: number[]; total: number } {
  const offsets: number[] = []
  let time = 0
  lines.forEach((line, index) => {
    if (index > 0) time += GAP_SECONDS
    offsets.push(time)
    time += estimateLineSeconds(line.text)
  })
  return { offsets, total: time }
}

export function useListeningAudio(segments: ListeningSegment[], options: { autoAdvance?: boolean; onSegmentStart?: (index: number) => void } = {}) {
  const [segmentIndex, setSegmentIndex] = useState(0)
  const [status, setStatus] = useState<AudioStatus>('idle')
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [rate, setRateState] = useState(1)
  /** thời lượng từng đoạn (file thật nếu có, không thì ước tính) — cho danh sách đoạn */
  const [durations, setDurations] = useState<number[]>(() => segments.map((segment) => estimatedLineOffsets(segment.lines).total))

  const handleRef = useRef<PlaybackHandle | null>(null)
  const tokenRef = useRef(0)
  const rateRef = useRef(1)
  const optionsRef = useRef(options)
  optionsRef.current = options
  const advanceTimer = useRef<number | undefined>(undefined)

  const estimates = useMemo(() => segments.map((segment) => estimatedLineOffsets(segment.lines)), [segments])

  // thời lượng thật từ manifest (nếu nhóm âm thanh đã tạo file)
  useEffect(() => {
    let cancelled = false
    void Promise.all(segments.map((segment) => getClipInfo(segmentKey(segment.lines)))).then((infos) => {
      if (cancelled) return
      setDurations(infos.map((info, i) => info?.durationSec ?? estimatedLineOffsets(segments[i].lines).total))
    })
    return () => {
      cancelled = true
    }
  }, [segments])

  const stop = useCallback(() => {
    tokenRef.current++
    window.clearTimeout(advanceTimer.current)
    handleRef.current?.stop()
    handleRef.current = null
    setStatus('idle')
  }, [])

  // rời trang: tắt tiếng
  useEffect(() => () => stop(), [stop])

  /** Phát đoạn `index` từ giây `fromEstimated` (tính theo thang ƯỚC TÍNH; tự co giãn theo file thật). */
  const playAt = useCallback(
    (index: number, fromEstimated = 0) => {
      const segment = segments[index]
      if (!segment) return
      window.clearTimeout(advanceTimer.current)
      const token = ++tokenRef.current
      setSegmentIndex(index)
      setStatus('loading')
      setCurrentTime(0)
      optionsRef.current.onSegmentStart?.(index)
      const handle = playSegment(segment, {
        rate: rateRef.current,
        onProgress: (progress) => {
          if (token !== tokenRef.current) return
          setCurrentTime(progress.currentTime)
          setDuration(progress.duration)
        },
        onEnded: () => {
          if (token !== tokenRef.current) return
          setStatus('ended')
          // tự sang đoạn sau (như băng thi thật chạy liền) sau 1,5 giây
          if (optionsRef.current.autoAdvance && index < segments.length - 1) {
            advanceTimer.current = window.setTimeout(() => token === tokenRef.current && playAt(index + 1), 1500)
          }
        },
      })
      handleRef.current = handle
      if (fromEstimated > 0) handle.pause() // chờ tải xong, tua tới đúng chỗ rồi mới phát
      // đợi PlaybackHandle dựng xong (tải manifest) -> biết thời lượng thật
      const poll = window.setInterval(() => {
        if (token !== tokenRef.current || handle.state === 'stopped') return window.clearInterval(poll)
        if (handle.state === 'loading') return
        window.clearInterval(poll)
        setDuration(handle.duration)
        if (fromEstimated > 0) {
          const scale = handle.duration / Math.max(0.1, estimates[index].total)
          handle.seek(Math.max(0, fromEstimated * scale - LEAD_IN_SECONDS))
          handle.resume()
          setCurrentTime(handle.currentTime)
        }
        setStatus('playing')
      }, 40)
    },
    [segments, estimates],
  )

  const play = useCallback((index: number) => playAt(index, 0), [playAt])
  const playFromLine = useCallback((index: number, lineIndex: number) => playAt(index, estimates[index]?.offsets[lineIndex] ?? 0), [playAt, estimates])

  const pause = useCallback(() => {
    handleRef.current?.pause()
    setStatus((current) => (current === 'playing' ? 'paused' : current))
  }, [])
  const resume = useCallback(() => {
    handleRef.current?.resume()
    setStatus((current) => (current === 'paused' ? 'playing' : current))
  }, [])
  const toggle = useCallback(() => {
    if (status === 'playing') pause()
    else if (status === 'paused') resume()
    else if (status === 'ended' && segmentIndex === segments.length - 1) play(segmentIndex)
    else if (status === 'ended') play(segmentIndex + 1)
    else if (status === 'idle') play(segmentIndex)
  }, [status, pause, resume, play, segmentIndex, segments.length])

  const seekBy = useCallback((delta: number) => {
    const handle = handleRef.current
    if (!handle || handle.state === 'loading' || handle.state === 'ended' || handle.state === 'stopped') return
    const target = Math.max(0, Math.min(handle.duration - 0.1, handle.currentTime + delta))
    handle.seek(target)
    setCurrentTime(target)
  }, [])

  /** Tua tới tỉ lệ 0..1 của đoạn đang phát (bấm lên thanh tiến độ). */
  const seekToRatio = useCallback((ratio: number) => {
    const handle = handleRef.current
    if (!handle || handle.state === 'loading' || handle.state === 'ended' || handle.state === 'stopped') return
    const target = Math.max(0, Math.min(handle.duration - 0.1, ratio * handle.duration))
    handle.seek(target)
    setCurrentTime(target)
  }, [])

  const setRate = useCallback((next: number) => {
    rateRef.current = next
    setRateState(next)
    handleRef.current?.setRate(next)
  }, [])

  /** Dòng thoại đang phát (ước tính) — để tô "karaoke" trong lời thoại sau khi nộp. */
  const currentLine = useMemo(() => {
    if (status === 'idle') return -1
    const estimate = estimates[segmentIndex]
    if (!estimate || duration <= 0) return -1
    const scale = duration / Math.max(0.1, estimate.total)
    let line = 0
    estimate.offsets.forEach((offset, index) => {
      if (offset * scale <= currentTime + 0.05) line = index
    })
    return line
  }, [status, estimates, segmentIndex, duration, currentTime])

  return { segmentIndex, status, currentTime, duration, rate, durations, currentLine, play, playFromLine, pause, resume, toggle, seekBy, seekToRatio, setRate, stop }
}

export type ListeningAudio = ReturnType<typeof useListeningAudio>

/** 75 -> "1:15" */
export function formatSeconds(seconds: number): string {
  const total = Math.max(0, Math.round(seconds))
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}
