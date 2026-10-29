/**
 * notification-sound.ts — TIẾNG "TING" KHI CÓ TIN NHẮN / LỜI MỜI
 * Tự tạo âm thanh bằng Web Audio (không cần file mp3). Gọi tối đa 1 lần / giây.
 */
let lastPlayedAt = 0

export function playNotificationSound() {
  if (Date.now() - lastPlayedAt < 1000) return
  lastPlayedAt = Date.now()
  try {
    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, context.currentTime) // nốt A5
    oscillator.frequency.setValueAtTime(1320, context.currentTime + 0.08) // lên E6
    gain.gain.setValueAtTime(0.0001, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.15, context.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.3)
    oscillator.onended = () => void context.close()
  } catch {
    /* trình duyệt chặn âm thanh khi chưa có thao tác: bỏ qua */
  }
}
