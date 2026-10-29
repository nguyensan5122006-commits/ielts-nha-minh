/**
 * AudioButton.tsx — NÚT LOA ĐỌC TIẾNG ANH (+ nút "rùa" đọc chậm)
 * ----------------------------------------------------------------------------
 *   <AudioButton text="How are you?" />                 // đọc bằng services/text-to-speech.ts
 *   <AudioButton src="/audio/abc.mp3" size="lg" />       // phát file có sẵn
 *   <AudioButton text="apple" size="sm" showSlow={false} />
 *
 * text-to-speech.ts tự tìm file mp3 đã tạo sẵn (npm run tts); không có thì
 * dùng giọng đọc của trình duyệt. Đang phát -> nút hiện sóng âm nhỏ; bấm lần
 * nữa để dừng. Phím Space/R để "nghe lại" do màn bài học tự gắn (không ở đây).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import { speak, stopSpeaking } from '../../services/text-to-speech'
import { useDsText } from '../design-system-text'
import { Icon } from './Icon'
import './AudioButton.css'

export interface AudioButtonProps {
  /** câu/từ tiếng Anh cần đọc */
  text?: string
  /** hoặc đường dẫn file âm thanh có sẵn */
  src?: string
  /** sm 36px · md 52px · lg 72px · xl 88px (khu trẻ em) */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** hiện nút "rùa" đọc chậm bên cạnh (mặc định có, trừ size sm) */
  showSlow?: boolean
  /** tốc độ khi đọc chậm, mặc định 0.7 */
  slowRate?: number
  /** nhãn đọc màn hình (mặc định "Nghe") */
  label?: string
  /** gọi khi bắt đầu phát (VD để chấm "đã nghe") */
  onPlay?: () => void
  className?: string
}

let activeFileAudio: HTMLAudioElement | null = null

export function AudioButton({ text, src, size = 'md', showSlow, slowRate = 0.7, label, onPlay, className }: AudioButtonProps) {
  const dsText = useDsText()
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  const playToken = useRef(0) // chống trường hợp bấm liên tục: chỉ lần bấm mới nhất được đổi trạng thái

  // rời trang khi đang đọc -> dừng
  useEffect(
    () => () => {
      if (playToken.current) stopAll()
    },
    [],
  )

  function stopAll() {
    stopSpeaking()
    activeFileAudio?.pause()
    activeFileAudio = null
  }

  async function play(mode: 'normal' | 'slow') {
    if (playing === mode) {
      stopAll()
      setPlaying(null)
      return
    }
    const token = ++playToken.current
    const rate = mode === 'slow' ? slowRate : 1
    setPlaying(mode)
    onPlay?.()
    try {
      if (src) {
        stopAll()
        const audio = new Audio(src)
        audio.playbackRate = rate
        activeFileAudio = audio
        await new Promise<void>((resolve) => {
          audio.onended = () => resolve()
          audio.onerror = () => resolve()
          audio.play().catch(() => resolve())
        })
      } else if (text) {
        await speak(text, rate)
      }
    } finally {
      if (token === playToken.current) setPlaying(null)
    }
  }

  const withSlow = showSlow ?? size !== 'sm'
  const iconSize = { sm: 18, md: 24, lg: 32, xl: 40 }[size]
  return (
    <span className={['ds-audio', `ds-audio--${size}`, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={['ds-audio__main', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
        onClick={() => play('normal')}
        aria-label={playing === 'normal' ? dsText('stopListening') : (label ?? dsText('listen'))}
        title={label ?? dsText('listen')}
      >
        {playing === 'normal' ? (
          <span className="ds-audio__wave" aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <Icon name="volume" size={iconSize} strokeWidth={2.2} />
        )}
      </button>
      {withSlow && (
        <button
          type="button"
          className={['ds-audio__slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={() => play('slow')}
          aria-label={dsText('listenSlow')}
          title={dsText('listenSlow')}
        >
          <Icon name="turtle" size={Math.round(iconSize * 0.75)} />
        </button>
      )}
    </span>
  )
}
