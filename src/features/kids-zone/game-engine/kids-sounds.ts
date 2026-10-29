/**
 * kids-sounds.ts
 * ----------------------------------------------------------------------------
 * HIỆU ỨNG ÂM THANH CỦA KHU TRẺ EM.
 *   - Âm chung (tap, correct "ting", oops, complete, sticker, pop, flip…) lấy từ
 *     bộ âm thanh của hệ thiết kế: src/design-system/sound-kit.ts (cùng nút tắt tiếng).
 *   - Thêm 1 âm riêng: playLetterNote(i) — tiếng "đàn mộc cầm" cho từng chữ cái bay vào
 *     khuôn ở thẻ giới thiệu từ mới. Chữ thứ i kêu nốt thứ i của gam ngũ cung
 *     -> cả từ nghe như 1 câu nhạc đi lên, vui tai mà không chói.
 * ----------------------------------------------------------------------------
 */
import { isSoundMuted, playSound, type SoundName } from '../../../design-system/sound-kit'

export { playSound, type SoundName }

// Gam ngũ cung Đô trưởng (C D E G A) qua 2 quãng tám — nốt nào ghép với nốt nào cũng êm
const PENTATONIC_HZ = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98, 1760.0]

let letterContext: AudioContext | null = null

export function playLetterNote(index: number): void {
  if (isSoundMuted()) return
  try {
    letterContext ??= new AudioContext()
    if (letterContext.state === 'suspended') void letterContext.resume()
    const ctx = letterContext
    const t0 = ctx.currentTime
    const frequency = PENTATONIC_HZ[index % PENTATONIC_HZ.length]
    const envelope = ctx.createGain()
    envelope.gain.setValueAtTime(0.0001, t0)
    envelope.gain.exponentialRampToValueAtTime(0.09, t0 + 0.005)
    envelope.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.32)
    envelope.connect(ctx.destination)
    // mộc cầm = nốt gốc + bội 4 tắt nhanh
    for (const [ratio, level] of [
      [1, 1],
      [4, 0.1],
    ]) {
      const oscillator = ctx.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.value = frequency * ratio
      const gain = ctx.createGain()
      gain.gain.value = level
      oscillator.connect(gain)
      gain.connect(envelope)
      oscillator.start(t0)
      oscillator.stop(t0 + 0.35)
    }
  } catch {
    /* âm thanh chỉ là phụ */
  }
}
