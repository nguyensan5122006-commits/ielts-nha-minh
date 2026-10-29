/**
 * PlacementAudio.tsx — NÚT NGHE CỦA CÂU NGHE TRONG BÀI XẾP LỚP (tự phát 1 lần, tối đa 2 lần)
 * ----------------------------------------------------------------------------
 *   <PlacementAudio text={item.audioText} voice={item.voice} maxPlays={2} autoPlay
 *                   onPlaysChange={setPlays} label="Bấm loa để nghe" />
 *
 * Vì sao không dùng thẳng <AudioButton>?
 *   AudioButton của hệ thiết kế đọc bằng speak(text) — luôn giọng tự động (nữ), trong khi câu
 *   xếp lớp có giọng riêng (`voice: 'gb-male'`…). File mp3 đúng giọng là loại `placement-line`
 *   (06-AUDIO.md mục 5) và phải phát bằng playAudioLine({ text, voice }). AudioButton cũng chưa
 *   có "tự phát" + "giới hạn số lần nghe". Nên đây là bản nhỏ trong thư mục onboarding, VẼ Y HỆT
 *   AudioButton (dùng lại class ds-audio của nó) — đã ghi đề nghị vào REQUESTS.md.
 *
 * Cách phát:
 *   - 1 người nói  -> playAudioLine({ text, voice })  (file v3 đúng giọng; thiếu thì giọng trình duyệt)
 *   - hội thoại "Woman: …\nMan: …" -> speak(text)     (file kiểu cũ, mỗi người 1 giọng)
 * Rời câu (component bị gỡ) -> dừng âm thanh.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import type { VoiceId } from '../../content/content-types'
import { Icon } from '../../design-system'
import { playAudioLine, speak, stopSpeaking } from '../../services/text-to-speech'
import '../../design-system/components/AudioButton.css'

export interface PlacementAudioProps {
  text: string
  voice: VoiceId
  /** số lần được nghe (bài xếp lớp: 2) */
  maxPlays: number
  /** tự phát 1 lần khi câu hiện ra */
  autoPlay?: boolean
  /** báo số lần đã nghe (để hiện "còn 1 lần") */
  onPlaysChange?: (plays: number) => void
  /** nhãn đọc màn hình */
  label: string
}

/** Kịch bản có dạng "Tên: lời thoại" ở nhiều dòng -> hội thoại */
function isDialogue(text: string): boolean {
  return /^[A-Z][\w .'-]{0,20}:\s/m.test(text) && text.includes('\n')
}

export function PlacementAudio({ text, voice, maxPlays, autoPlay = false, onPlaysChange, label }: PlacementAudioProps) {
  const [playing, setPlaying] = useState(false)
  const [plays, setPlays] = useState(0)
  const playsRef = useRef(0)
  const token = useRef(0) // chỉ lần phát mới nhất được đổi trạng thái "đang phát"

  const play = useCallback(async () => {
    if (playsRef.current >= maxPlays) return
    playsRef.current += 1
    setPlays(playsRef.current)
    onPlaysChange?.(playsRef.current)
    const myToken = ++token.current
    setPlaying(true)
    try {
      if (isDialogue(text)) await speak(text)
      else await playAudioLine({ text, voice }).finished
    } finally {
      if (myToken === token.current) setPlaying(false)
    }
  }, [text, voice, maxPlays, onPlaysChange])

  // tự phát 1 lần (chờ hiệu ứng chuyển câu xong). Cờ ref chống phát 2 lần ở StrictMode.
  const autoPlayedFor = useRef<string | null>(null)
  useEffect(() => {
    if (!autoPlay || autoPlayedFor.current === text) return
    const timer = window.setTimeout(() => {
      autoPlayedFor.current = text
      void play()
    }, 450)
    return () => window.clearTimeout(timer)
  }, [autoPlay, text, play])

  // rời câu -> dừng
  useEffect(() => () => stopSpeaking(), [])

  const usedUp = plays >= maxPlays && !playing
  return (
    <span className="ds-audio ds-audio--lg">
      <button
        type="button"
        className={['ds-audio__main', 'pt-audio__main', playing && 'is-playing'].filter(Boolean).join(' ')}
        onClick={() => void play()}
        disabled={usedUp || playing}
        aria-label={label}
        title={label}
      >
        {playing ? (
          <span className="ds-audio__wave" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <Icon name="volume" size={32} strokeWidth={2.2} />
        )}
      </button>
    </span>
  )
}
