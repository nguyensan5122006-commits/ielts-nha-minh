/**
 * use-story-narration.ts — ĐỌC LỜI KỂ TRUYỆN + PHỤ ĐỀ CHẠY THEO GIỌNG
 * ----------------------------------------------------------------------------
 *   const narration = useStoryNarration()
 *   await narration.play({ text: 'Kim is sad…', lang: 'en' })                  // lời kể tiếng Anh
 *   await narration.play({ text: 'Kim đang buồn…', lang: 'vi', lineId: '…' })   // bản dịch tiếng Việt
 *   narration.spokenWords   // số chữ đã đọc tới -> tô đậm dần
 *
 * Giống use-spoken-line.ts của động cơ (chỉ đọc lời Ki tiếng Việt), nhưng đọc được cả câu TIẾNG ANH
 * (kids-audio: kind 'sentence' -> file mp3 tạo sẵn của lời kể) và câu tiếng Việt theo id
 * ('<id chương>.scenes.<i>.narration'). Phụ đề bám theo tiến độ phát thật (onProgress);
 * chưa có tiến độ thì chạy theo thời gian ước lượng. Mọi Promise luôn kết thúc (kids-audio có hẹn giờ dự phòng).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { estimateSpeechMs, speakSequence, stopVoice, type SpeechStep } from '../../game-engine/kids-audio'

export interface NarrationRequest {
  text: string
  lang: 'en' | 'vi'
  /** id câu trong kho âm thanh (tiếng Việt) — có file thì phát file */
  lineId?: string
  slow?: boolean
}

export function useStoryNarration() {
  const [playing, setPlaying] = useState<NarrationRequest | null>(null)
  const [spokenWords, setSpokenWords] = useState(0)
  const runId = useRef(0)
  const ticker = useRef<number | undefined>(undefined)

  const play = useCallback((request: NarrationRequest): Promise<void> => {
    const id = ++runId.current
    const count = request.text.split(/\s+/).filter(Boolean).length
    window.clearInterval(ticker.current)
    setPlaying(request)
    setSpokenWords(0)

    // phụ đề theo thời gian ước lượng — bị thay bằng tiến độ thật khi service âm thanh báo về
    let shown = 0
    let gotRealProgress = false
    const perWordMs = Math.max(140, estimateSpeechMs(request.text, request.lang, request.slow ? 0.8 : 1) / Math.max(1, count))
    ticker.current = window.setInterval(() => {
      if (gotRealProgress) return
      shown = Math.min(count, shown + 1)
      setSpokenWords(shown)
      if (shown >= count) window.clearInterval(ticker.current)
    }, perWordMs)

    const step: SpeechStep =
      request.lang === 'en' ? { kind: 'sentence', text: request.text, slow: request.slow } : { kind: 'line', id: request.lineId, text: request.text }
    return speakSequence([step], (_, progress) => {
      if (id !== runId.current || !(progress.duration > 0)) return
      gotRealProgress = true
      setSpokenWords(Math.min(count, Math.ceil((progress.currentTime / progress.duration) * count)))
    }).then(() => {
      if (id !== runId.current) return // đã có lượt đọc mới / đã dừng
      window.clearInterval(ticker.current)
      setSpokenWords(count)
      setPlaying(null)
    })
  }, [])

  /** Dừng đọc (bấm Bỏ qua / rời cảnh). Phụ đề hiện đủ chữ. */
  const stop = useCallback(() => {
    runId.current++
    window.clearInterval(ticker.current)
    setPlaying(null)
    setSpokenWords(Number.MAX_SAFE_INTEGER)
    stopVoice()
  }, [])

  useEffect(
    () => () => {
      runId.current++
      window.clearInterval(ticker.current)
    },
    [],
  )

  return { playing, spokenWords, play, stop }
}
