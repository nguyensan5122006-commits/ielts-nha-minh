/**
 * balloon-pop-text.ts — CHỮ GIAO DIỆN CỦA TRÒ "BÓNG BAY CHỮ" (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const text = useBalloonPopText()
 *   text.instruction   -> "Nghe rồi bấm quả bóng có từ đó"
 * Chữ chung (Tiếp, Nghe lại, Chữ cái đầu, Nghĩa…) ở kids-text.ts; lời Ki nói ở kids-voice-lines.ts.
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { useLanguage } from '../../../../translations/language-context'

const VI = {
  instruction: 'Nghe rồi bấm quả bóng có từ đó',
  balloonLabel: (n: number, word: string) => `Bóng ${n}: ${word}`,
  skyLabel: 'Bầu trời bóng bay',
  /** dòng nhỏ dưới nút nghe: rê chuột lên bóng thì bóng đứng lại */
  hoverHint: 'Rê chuột lên bóng, bóng sẽ dừng lại',
}

export type BalloonPopText = typeof VI

const EN: BalloonPopText = {
  instruction: 'Listen, then pop the balloon with that word',
  balloonLabel: (n, word) => `Balloon ${n}: ${word}`,
  skyLabel: 'Balloon sky',
  hoverHint: 'Point at a balloon to stop it',
}

const BY_LANGUAGE = { vi: VI, en: EN }

export function useBalloonPopText(): BalloonPopText {
  const { language } = useLanguage()
  return useMemo(() => BY_LANGUAGE[language], [language])
}
