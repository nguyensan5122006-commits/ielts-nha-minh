/**
 * ListenHero.tsx — NÚT NGHE LỚN CỦA BÀI NGHE (+ nút rùa nghe chậm) + phím Space/R
 * ----------------------------------------------------------------------------
 *   <ListenHero text="Good morning!" autoPlay />
 *
 * - Tự phát 1 lần khi câu hỏi hiện ra (autoPlay) — người học không phải bấm.
 * - Phím Space hoặc R = nghe lại (trang trình học gọi replayCurrentAudio()).
 *   Mỗi lúc chỉ có 1 ListenHero "giữ" phím tắt: cái được vẽ sau cùng.
 * - Nghe lại không giới hạn, có tốc độ chậm 0.7× (psych-adult D3.11).
 * Giao diện mượn CSS của nút loa trong hệ thiết kế (ds-audio) để đồng bộ.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '../../../design-system/components/Icon'
import { Kbd } from '../../../design-system/components/Kbd'
import '../../../design-system/components/AudioButton.css'
import { speak, stopSpeaking } from '../../../services/text-to-speech'
import { useLessonText } from '../lesson-player-text'

/* ---------------- phím tắt "nghe lại": 1 hàm phát hiện hành ---------------- */
let currentReplay: (() => void) | null = null

/** Trang trình học gọi khi người học bấm Space / R. Trả về false nếu câu này không có audio. */
export function replayCurrentAudio(): boolean {
  if (!currentReplay) return false
  currentReplay()
  return true
}

/** Đăng ký hàm "nghe lại" cho câu đang hiện (tự gỡ khi câu biến mất). */
export function useReplayShortcut(replay: (() => void) | null) {
  useEffect(() => {
    if (!replay) return
    currentReplay = replay
    return () => {
      if (currentReplay === replay) currentReplay = null
    }
  }, [replay])
}

interface ListenHeroProps {
  /** câu tiếng Anh cần đọc (có thể nhiều dòng "Man: …\nWoman: …") */
  text: string
  /** tự phát khi hiện ra */
  autoPlay?: boolean
  /** lg 72px (mặc định) · xl 88px · md 52px */
  size?: 'md' | 'lg' | 'xl'
  /** hiện dòng gợi ý phím "Space để nghe lại" */
  showKeyHint?: boolean
  /** chữ trên phím gợi ý (ô gõ chữ dùng "Ctrl + Space" vì Space là dấu cách) */
  keyLabel?: string
  className?: string
}

export function ListenHero({ text, autoPlay = false, size = 'lg', showKeyHint = true, keyLabel = 'Space', className }: ListenHeroProps) {
  const copy = useLessonText()
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  const token = useRef(0)

  const play = useCallback(
    async (mode: 'normal' | 'slow') => {
      const myToken = ++token.current
      setPlaying(mode)
      try {
        await speak(text, mode === 'slow' ? 0.7 : 1)
      } finally {
        if (myToken === token.current) setPlaying(null)
      }
    },
    [text],
  )

  // phím Space / R
  const replay = useCallback(() => void play('normal'), [play])
  useReplayShortcut(replay)

  // tự phát 1 lần (đợi khung bài trượt vào xong cho đỡ giật)
  useEffect(() => {
    if (!autoPlay) return
    const timer = window.setTimeout(() => void play('normal'), 380)
    return () => {
      window.clearTimeout(timer)
    }
  }, [autoPlay, play])

  // rời câu -> tắt tiếng
  useEffect(
    () => () => {
      token.current++
      stopSpeaking()
    },
    [],
  )

  const iconSize = size === 'xl' ? 40 : size === 'lg' ? 32 : 24
  return (
    <div className={['lp-listen', className].filter(Boolean).join(' ')}>
      <span className={`ds-audio ds-audio--${size}`}>
        <button
          type="button"
          className={['ds-audio__main', playing === 'normal' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={(event) => {
            void play('normal')
            if (event.detail > 0) event.currentTarget.blur() // bấm chuột xong trả Enter về cho "Kiểm tra"
          }}
          aria-label={copy.replayHint}
          title={copy.replayHint}
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
        <button
          type="button"
          className={['ds-audio__slow', playing === 'slow' && 'is-playing'].filter(Boolean).join(' ')}
          onClick={(event) => {
            void play('slow')
            if (event.detail > 0) event.currentTarget.blur()
          }}
          aria-label="0.7×"
          title="0.7×"
        >
          <Icon name="turtle" size={Math.round(iconSize * 0.72)} />
        </button>
      </span>
      {showKeyHint && (
        <span className="lp-listen__keys" aria-hidden>
          <Kbd>{keyLabel}</Kbd> {copy.pressToReplay}
        </span>
      )}
    </div>
  )
}
