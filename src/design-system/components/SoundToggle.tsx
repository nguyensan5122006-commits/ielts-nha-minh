/**
 * SoundToggle.tsx — NÚT BẬT / TẮT HIỆU ỨNG ÂM THANH (toàn web)
 * ----------------------------------------------------------------------------
 *   <SoundToggle />
 * Đọc/ghi cài đặt trong sound-kit.ts (nhớ trong localStorage).
 * Chỉ tắt HIỆU ỨNG (ting, pop…); giọng đọc bài nghe vẫn phát bình thường.
 * ----------------------------------------------------------------------------
 */
import { useDsText } from '../design-system-text'
import { playSound, useSoundSettings } from '../sound-kit'
import { Icon } from './Icon'
import './Toggles.css'

export interface SoundToggleProps {
  className?: string
  /** hiện chữ "Âm thanh" bên cạnh icon */
  showLabel?: boolean
}

export function SoundToggle({ className, showLabel = false }: SoundToggleProps) {
  const { muted, setMuted } = useSoundSettings()
  const dsText = useDsText()
  const label = muted ? dsText('soundOn') : dsText('soundOff') // nhãn = việc sẽ xảy ra khi bấm

  return (
    <button
      type="button"
      className={['ds-toggle-compact', muted && 'is-off', showLabel && 'has-label', className].filter(Boolean).join(' ')}
      onClick={() => {
        setMuted(!muted)
        if (muted) playSound('tap') // vừa bật lại -> cho nghe 1 tiếng nhẹ để biết đã có âm
      }}
      aria-label={label}
      title={label}
    >
      <Icon name={muted ? 'volume-off' : 'volume'} size={18} />
      {showLabel && <span>{dsText('sound')}</span>}
    </button>
  )
}
