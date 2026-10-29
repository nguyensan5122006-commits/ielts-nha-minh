/**
 * SpeakerButton.tsx — NÚT LOA để nghe 1 câu / đoạn hội thoại.
 *  variant="large": nút to cho bài nghe (kèm nút nghe chậm 🐢)
 *  variant="inline": biểu tượng loa nhỏ cạnh câu ví dụ
 */
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'

interface SpeakerButtonProps {
  text: string
  variant?: 'large' | 'inline'
}

export function SpeakerButton({ text, variant = 'large' }: SpeakerButtonProps) {
  const { t } = useLanguage()

  if (variant === 'inline') {
    return (
      <button type="button" className="inline-speaker" onClick={() => speak(text)} aria-label={t('listenNormal')}>
        🔊
      </button>
    )
  }
  return (
    <div className="speaker-row">
      <button type="button" className="speaker-button" onClick={() => speak(text)} aria-label={t('listenNormal')}>
        🔊
      </button>
      <button
        type="button"
        className="speaker-button speaker-button--small"
        onClick={() => speak(text, 0.7)}
        aria-label={t('listenSlow')}
        title={t('listenSlow')}
      >
        🐢
      </button>
    </div>
  )
}
