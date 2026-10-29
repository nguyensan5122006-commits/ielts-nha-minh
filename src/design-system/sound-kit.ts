/**
 * sound-kit.ts — HIỆU ỨNG ÂM THANH TỰ TỔNG HỢP (không cần file mp3)
 * ----------------------------------------------------------------------------
 * Dùng Web Audio API của trình duyệt để "đánh đàn" ra âm thanh ngay lúc cần:
 *   playSound('correct')   // chuông ấm 2 nốt khi trả lời đúng
 *   playSound('oops')      // 1 nốt trầm mềm khi chưa đúng (không "buzz")
 *
 * Danh sách: tap · correct · oops · complete · streak · levelUp · sticker · flip · pop
 *
 * Nguyên tắc âm thanh: ấm, tròn, nhỏ tiếng — không chói, không gắt.
 *   - Dùng sóng sine/triangle (mềm), không dùng sóng vuông/răng cưa (gắt).
 *   - Mọi nốt đều "vào" từ từ vài mili-giây và tắt dần (không bị tiếng tách).
 *   - Có bộ lọc cắt tiếng rít tần số cao + tiếng vọng rất nhẹ cho ấm.
 *
 * Tắt tiếng toàn cục: setSoundMuted(true) — nhớ trong localStorage.
 * Trong component: const { muted, toggleMuted } = useSoundSettings()
 * ----------------------------------------------------------------------------
 */
import { useSyncExternalStore } from 'react'

export type SoundName = 'tap' | 'correct' | 'oops' | 'complete' | 'streak' | 'levelUp' | 'sticker' | 'flip' | 'pop'

export const SOUND_NAMES: SoundName[] = ['tap', 'correct', 'oops', 'complete', 'streak', 'levelUp', 'sticker', 'flip', 'pop']

const MUTED_KEY = 'ielts-sound-muted'
const VOLUME_KEY = 'ielts-sound-volume'
/** Âm lượng mặc định thấp (0..1) — hiệu ứng chỉ là "gia vị". */
const DEFAULT_VOLUME = 0.35

/* ============================ cài đặt (tắt tiếng, âm lượng) ============================ */

function readStored<T>(key: string, parse: (raw: string | null) => T): T {
  try {
    return parse(localStorage.getItem(key))
  } catch {
    return parse(null)
  }
}

let muted = readStored(MUTED_KEY, (raw) => raw === '1')
let volume = readStored(VOLUME_KEY, (raw) => {
  const value = raw === null ? NaN : Number(raw)
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : DEFAULT_VOLUME
})

const listeners = new Set<() => void>()
function notify() {
  if (masterGain && audioContext) masterGain.gain.setTargetAtTime(muted ? 0 : volume, audioContext.currentTime, 0.02)
  listeners.forEach((listener) => listener())
}

export function isSoundMuted(): boolean {
  return muted
}

export function setSoundMuted(next: boolean): void {
  muted = next
  try {
    localStorage.setItem(MUTED_KEY, next ? '1' : '0')
  } catch {
    /* bỏ qua */
  }
  notify()
}

/** Âm lượng 0..1 (mặc định 0.35). */
export function setSoundVolume(next: number): void {
  volume = Math.min(1, Math.max(0, next))
  try {
    localStorage.setItem(VOLUME_KEY, String(volume))
  } catch {
    /* bỏ qua */
  }
  notify()
}

/** Hook React: đọc + đổi cài đặt âm thanh; component tự vẽ lại khi đổi. */
export function useSoundSettings() {
  const snapshot = useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => `${muted ? 1 : 0}|${volume}`,
    () => `0|${DEFAULT_VOLUME}`,
  )
  const [mutedFlag, volumeText] = snapshot.split('|')
  return {
    muted: mutedFlag === '1',
    volume: Number(volumeText),
    setMuted: setSoundMuted,
    toggleMuted: () => setSoundMuted(!muted),
    setVolume: setSoundVolume,
  }
}

/* ============================ "bàn trộn âm" Web Audio ============================ */

let audioContext: AudioContext | null = null
let masterGain: GainNode | null = null
/** Điểm vào chung của mọi nốt: lọc -> (khô + vọng nhẹ) -> âm lượng tổng -> loa */
let mixInput: AudioNode | null = null

/** Tạo bàn trộn lần đầu cần dùng (trình duyệt chỉ cho phát sau khi người dùng bấm/chạm). */
function getMixer(): { ctx: AudioContext; input: AudioNode } | null {
  if (typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AudioContextClass) return null
  if (!audioContext) {
    audioContext = new AudioContextClass()
    masterGain = audioContext.createGain()
    masterGain.gain.value = muted ? 0 : volume

    // Lọc thông thấp: cắt bớt tiếng rít trên 7kHz -> âm thanh ấm hơn
    const warmFilter = audioContext.createBiquadFilter()
    warmFilter.type = 'lowpass'
    warmFilter.frequency.value = 7000
    warmFilter.Q.value = 0.5

    // Tiếng vọng rất nhẹ: 1 đường trễ 70ms có hồi tiếp nhỏ (như phòng nhỏ có rèm)
    const delay = audioContext.createDelay(0.5)
    delay.delayTime.value = 0.07
    const feedback = audioContext.createGain()
    feedback.gain.value = 0.22
    const echoLevel = audioContext.createGain()
    echoLevel.gain.value = 0.18
    const echoDamp = audioContext.createBiquadFilter()
    echoDamp.type = 'lowpass'
    echoDamp.frequency.value = 2500

    warmFilter.connect(masterGain) // tiếng khô
    warmFilter.connect(delay) // nhánh vọng
    delay.connect(echoDamp)
    echoDamp.connect(feedback)
    feedback.connect(delay)
    echoDamp.connect(echoLevel)
    echoLevel.connect(masterGain)
    masterGain.connect(audioContext.destination)
    mixInput = warmFilter
  }
  if (audioContext.state === 'suspended') void audioContext.resume()
  return { ctx: audioContext, input: mixInput! }
}

/* ============================ nhạc cụ nhỏ ============================ */

interface ToneOptions {
  frequency: number
  /** giây tính từ "bây giờ" */
  start?: number
  /** tổng thời gian ngân (giây) */
  duration?: number
  type?: OscillatorType
  gain?: number
  /** thời gian "vào" (giây) — vài ms để không có tiếng tách */
  attack?: number
  /** trượt cao độ tới tần số này (Hz) trong suốt nốt */
  glideTo?: number
  /** các "hoạ âm" thêm vào cho giống chuông: [bội số tần số, độ lớn] */
  partials?: [number, number][]
}

/** Đánh 1 nốt: dao động -> bao âm (to dần rồi tắt dần) -> bàn trộn. */
function tone(ctx: AudioContext, output: AudioNode, options: ToneOptions): void {
  const { frequency, start = 0, duration = 0.4, type = 'sine', gain = 0.25, attack = 0.006, glideTo, partials = [[1, 1]] } = options
  const t0 = ctx.currentTime + start
  const envelope = ctx.createGain()
  envelope.gain.setValueAtTime(0.0001, t0)
  envelope.gain.exponentialRampToValueAtTime(gain, t0 + attack)
  // tắt dần theo hàm mũ -> nghe tự nhiên như gõ chuông/phím đàn
  envelope.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  envelope.connect(output)

  for (const [ratio, level] of partials) {
    const oscillator = ctx.createOscillator()
    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency * ratio, t0)
    if (glideTo) oscillator.frequency.exponentialRampToValueAtTime(glideTo * ratio, t0 + duration * 0.8)
    const partialGain = ctx.createGain()
    partialGain.gain.value = level
    oscillator.connect(partialGain)
    partialGain.connect(envelope)
    oscillator.start(t0)
    oscillator.stop(t0 + duration + 0.05)
  }
}

/** Âm sắc "chuông ấm": nốt gốc + bội 2 nhỏ + bội 3 rất nhỏ. */
const BELL: [number, number][] = [
  [1, 1],
  [2, 0.22],
  [3.01, 0.06],
]
/** Âm sắc "mộc cầm" (marimba): gốc + bội 4 tắt nhanh. */
const MARIMBA: [number, number][] = [
  [1, 1],
  [4, 0.12],
]

/** Tiếng "vút" bằng nhiễu trắng đi qua bộ lọc quét tần số. */
function whoosh(ctx: AudioContext, output: AudioNode, { start = 0, duration = 0.35, from = 300, to = 2400, gain = 0.12 } = {}): void {
  const t0 = ctx.currentTime + start
  const length = Math.ceil(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1
  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const band = ctx.createBiquadFilter()
  band.type = 'bandpass'
  band.Q.value = 1.1
  band.frequency.setValueAtTime(from, t0)
  band.frequency.exponentialRampToValueAtTime(to, t0 + duration)
  const envelope = ctx.createGain()
  envelope.gain.setValueAtTime(0.0001, t0)
  envelope.gain.exponentialRampToValueAtTime(gain, t0 + duration * 0.35)
  envelope.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  noise.connect(band)
  band.connect(envelope)
  envelope.connect(output)
  noise.start(t0)
  noise.stop(t0 + duration + 0.02)
}

// Tần số các nốt nhạc dùng (Hz)
const NOTE = {
  D4: 293.66,
  E4: 329.63,
  G4: 392.0,
  C5: 523.25,
  E5: 659.25,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
  E6: 1318.51,
  G6: 1567.98,
  C7: 2093.0,
}

/* ============================ các hiệu ứng ============================ */

const RECIPES: Record<SoundName, (ctx: AudioContext, out: AudioNode) => void> = {
  // Tích nhẹ như gõ đầu ngón tay lên gỗ
  tap: (ctx, out) => tone(ctx, out, { frequency: 1200, glideTo: 900, duration: 0.05, type: 'triangle', gain: 0.12, attack: 0.002 }),

  // 2 nốt chuông đi lên quãng 3 trưởng (G5 -> B5): "đúng rồi!"
  correct: (ctx, out) => {
    tone(ctx, out, { frequency: NOTE.G5, duration: 0.5, gain: 0.2, partials: BELL })
    tone(ctx, out, { frequency: NOTE.B5, start: 0.09, duration: 0.7, gain: 0.22, partials: BELL })
  },

  // 1 nốt trầm, mềm, hơi trùng xuống (E4 -> D4): "chưa đúng, thử lại nhé" — không buzz
  oops: (ctx, out) => tone(ctx, out, { frequency: NOTE.E4, glideTo: NOTE.D4, duration: 0.42, type: 'triangle', gain: 0.2, attack: 0.012 }),

  // Hợp âm rải 4 nốt C5 E5 G5 C6: hoàn thành bài
  complete: (ctx, out) => {
    ;[NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6].forEach((frequency, index) =>
      tone(ctx, out, { frequency, start: index * 0.085, duration: index === 3 ? 0.9 : 0.45, gain: 0.18, partials: BELL }),
    )
  },

  // "Vút" + chuông: giữ chuỗi ngày
  streak: (ctx, out) => {
    whoosh(ctx, out, { duration: 0.32, gain: 0.1 })
    tone(ctx, out, { frequency: NOTE.A5, start: 0.22, duration: 0.6, gain: 0.18, partials: BELL })
    tone(ctx, out, { frequency: NOTE.E6, start: 0.3, duration: 0.8, gain: 0.12, partials: BELL })
  },

  // Rải nốt đi lên nhanh + hợp âm sáng ngân dài: lên level
  levelUp: (ctx, out) => {
    ;[NOTE.G4, NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6].forEach((frequency, index) =>
      tone(ctx, out, { frequency, start: index * 0.06, duration: 0.32, gain: 0.14, partials: MARIMBA }),
    )
    ;[NOTE.C6, NOTE.E6, NOTE.G6].forEach((frequency) => tone(ctx, out, { frequency, start: 0.32, duration: 1.1, gain: 0.08, partials: BELL }))
  },

  // "Bóp" bong bóng + 1 hạt lấp lánh: nhận sticker
  sticker: (ctx, out) => {
    tone(ctx, out, { frequency: 420, glideTo: 950, duration: 0.12, gain: 0.2, attack: 0.004 })
    tone(ctx, out, { frequency: NOTE.C7, start: 0.08, duration: 0.35, gain: 0.06, partials: BELL })
  },

  // "Phạch" nhẹ khi lật thẻ
  flip: (ctx, out) => whoosh(ctx, out, { duration: 0.11, from: 1200, to: 3200, gain: 0.09 }),

  // Bong bóng vỡ nhỏ
  pop: (ctx, out) => tone(ctx, out, { frequency: 900, glideTo: 320, duration: 0.08, gain: 0.18, attack: 0.002 }),
}

/**
 * Phát 1 hiệu ứng. An toàn để gọi ở bất cứ đâu: đang tắt tiếng, trình duyệt
 * không hỗ trợ, hay chưa được phép phát -> im lặng, không báo lỗi.
 */
export function playSound(name: SoundName): void {
  if (muted || volume === 0) return
  try {
    const mixer = getMixer()
    if (!mixer) return
    RECIPES[name](mixer.ctx, mixer.input)
  } catch {
    /* âm thanh chỉ là phụ — không bao giờ làm hỏng trang */
  }
}
