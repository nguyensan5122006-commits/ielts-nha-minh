/**
 * use-spoken-line.ts
 * ----------------------------------------------------------------------------
 * GIỌNG + PHỤ ĐỀ CHẠY THEO cho lời mascot (07-KIDS-ZONE mục 1).
 *
 *   const line = useSpokenLine('Chào Thảo! Hôm nay chơi gì nào?', { lineId?: 'kids-vl-...' })
 *   line.spokenWords   // số chữ đã "đọc tới" -> tô đậm dần (phụ đề chạy theo)
 *   line.heard         // đã nghe hết ÍT NHẤT 1 lần -> nút "Tiếp" mới sáng lên
 *   line.replay()      // nút nghe lại
 *
 * lineId = id câu trong kho lời thoại -> phát file mp3 tạo sẵn; không có -> giọng máy đọc chữ.
 * Phụ đề bám theo tiến độ phát thật (onProgress của service âm thanh); chưa nhận được tiến độ
 * thì chạy theo thời gian ước lượng.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { estimateSpeechMs, speakSequence, stopVoice } from './kids-audio'

export interface SpokenLine {
  words: string[]
  spokenWords: number
  playing: boolean
  heard: boolean
  replay: () => void
}

export function useSpokenLine(text: string, options: { autoPlay?: boolean; lineId?: string; delayMs?: number } = {}): SpokenLine {
  const { autoPlay = true, lineId, delayMs = 250 } = options
  const words = text.split(/\s+/).filter(Boolean)
  const [spokenWords, setSpokenWords] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [heard, setHeard] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const runId = useRef(0)

  const play = useCallback(() => {
    const id = ++runId.current
    const count = text.split(/\s+/).filter(Boolean).length
    window.clearInterval(timer.current)
    setPlaying(true)
    setSpokenWords(0)

    // Phụ đề theo thời gian ước lượng — bị thay bằng tiến độ thật khi service báo về
    let shown = 0
    let gotRealProgress = false
    timer.current = window.setInterval(() => {
      if (gotRealProgress) return
      shown = Math.min(count, shown + 1)
      setSpokenWords(shown)
      if (shown >= count) window.clearInterval(timer.current)
    }, Math.max(120, estimateSpeechMs(text, 'vi') / Math.max(1, count)))

    void speakSequence([{ kind: 'line', id: lineId, text }], (_, progress) => {
      if (id !== runId.current || !(progress.duration > 0)) return
      gotRealProgress = true
      setSpokenWords(Math.min(count, Math.ceil((progress.currentTime / progress.duration) * count)))
    }).then(() => {
      if (id !== runId.current) return // đã có lượt đọc mới
      window.clearInterval(timer.current)
      setSpokenWords(count)
      setPlaying(false)
      setHeard(true)
    })
  }, [text, lineId])

  // Tự đọc khi câu hiện ra (chờ chút cho khung bay vào xong)
  useEffect(() => {
    if (!autoPlay) return
    const start = window.setTimeout(play, delayMs)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer.current)
      runId.current++
    }
  }, [autoPlay, play, delayMs])

  // Rời màn hình -> dừng đọc
  useEffect(() => () => stopVoice(), [])

  return { words, spokenWords, playing, heard, replay: play }
}
