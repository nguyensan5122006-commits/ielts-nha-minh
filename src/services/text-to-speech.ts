/**
 * text-to-speech.ts
 * ----------------------------------------------------------------------------
 * PHÁT ÂM THANH (giọng đọc) CHO CẢ WEB.
 *
 * Cách hoạt động:
 *  1. Lệnh "npm run tts:v3" (scripts/generate-audio-v3.ts) tạo sẵn file mp3 bằng giọng AI
 *     cho mọi câu cần nghe, đặt tên theo "mã" của câu (xem audio-clip-keys.ts), và ghi
 *     danh sách vào public/audio/manifest.json (kiểu cũ) + manifest-v3.json (kiểu mới).
 *  2. Khi cần phát: tính mã -> có file mp3 thì phát file.
 *  3. Không có file (hoặc file lỗi) -> dùng giọng đọc có sẵn của trình duyệt
 *     (speechSynthesis), chọn đúng ngôn ngữ/giọng gần nhất (Anh-Anh, Úc, Mỹ, Việt).
 *
 * Các hàm chính:
 *   speak(text, rate)              (cũ) đọc 1 câu / 1 kịch bản "Anna: …\nTom: …"
 *   playAudioLine(line)            đọc 1 dòng AudioLine đúng giọng (gb-female, au-male…)
 *   playSegment(segment)           phát 1 đoạn nghe (file ghép sẵn; chưa có thì đọc từng dòng, nghỉ 350 ms)
 *   stopSpeaking()                 dừng mọi âm thanh
 *
 * Mọi hàm play… trả về 1 PlaybackHandle: `await handle.finished` = chờ phát xong;
 * có pause / resume / seek / setRate / currentTime / duration cho trình nghe (Listening player).
 * ----------------------------------------------------------------------------
 */
import type { AudioLine, VoiceId } from '../content/content-types'
import {
  BROWSER_LANG_BY_VOICE,
  DEFAULT_VOICE,
  EDGE_VOICE_BY_ID,
  audioLineKey,
  clipKey,
  hashAudioText,
  resolveLineVoices,
  scriptToVoicedLines,
  segmentKey,
  type AudioManifestV3,
} from './audio-clip-keys'

// Giữ tên cũ để code cũ vẫn import được từ file này
export { hashAudioText, splitIntoSpeakerTurns } from './audio-clip-keys'

/** 3 tốc độ của trình nghe: chậm / thường / nhanh. */
export const PLAYBACK_RATES = [0.75, 1, 1.25] as const
export type PlaybackRate = (typeof PLAYBACK_RATES)[number]

/** Khoảng nghỉ tự nhiên giữa 2 người nói khi phải đọc từng dòng (chưa có file ghép sẵn). */
const GAP_BETWEEN_LINES_SECONDS = 0.35

/* ============================================================================
 * 1. DANH SÁCH FILE MP3 CÓ SẴN (manifest)
 * ========================================================================== */

let legacyManifest: Promise<Set<string>> | null = null
/** manifest.json kiểu cũ: mảng các mã có file /audio/<mã>.mp3 */
function loadLegacyManifest(): Promise<Set<string>> {
  legacyManifest ??= fetch('/audio/manifest.json')
    .then(async (response) => new Set(response.ok ? ((await response.json()) as string[]) : []))
    .catch(() => new Set<string>())
  return legacyManifest
}

let v3Manifest: Promise<AudioManifestV3 | null> | null = null
/** manifest-v3.json: mã -> { file, durationMs, … }. Tải 1 lần, khi cần. */
function loadV3Manifest(): Promise<AudioManifestV3 | null> {
  v3Manifest ??= fetch('/audio/manifest-v3.json')
    .then(async (response) => (response.ok ? ((await response.json()) as AudioManifestV3) : null))
    .catch(() => null)
  return v3Manifest
}

/** Thông tin 1 file audio theo mã: đường dẫn + thời lượng (giây). Không có -> null. */
export async function getClipInfo(key: string): Promise<{ url: string; durationSec: number } | null> {
  const manifest = await loadV3Manifest()
  const entry = manifest?.entries[key]
  if (entry) return { url: `/audio/${entry.file}`, durationSec: entry.durationMs / 1000 }
  return null
}

/* ============================================================================
 * 2. CHỌN GIỌNG TRÌNH DUYỆT (khi không có file mp3)
 * ========================================================================== */

const FEMALE_VOICE_NAME = /female|sonia|libby|maisie|hazel|susan|zira|natasha|jenny|aria|karen|samantha|catherine|serena|kate|hoaimy|hoài my|linh/i
const MALE_VOICE_NAME = /\bmale|ryan|george|david|daniel|guy|william|thomas|mark|james|oliver|arthur|namminh|nam minh/i

/** Chọn giọng trình duyệt hợp ngôn ngữ (VD 'en-AU') và giới tính; variety = đổi giọng theo người nói. */
function pickBrowserVoice(lang: string, gender: 'female' | 'male' | null, variety: number): SpeechSynthesisVoice | undefined {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined
  const voices = window.speechSynthesis.getVoices()
  const normalise = (code: string) => code.replace('_', '-').toLowerCase()
  let pool = voices.filter((voice) => normalise(voice.lang) === lang.toLowerCase())
  // không có đúng giọng Úc/Mỹ -> lấy giọng cùng thứ tiếng (ưu tiên Anh-Anh)
  if (pool.length === 0) pool = voices.filter((voice) => normalise(voice.lang).startsWith(lang.slice(0, 2).toLowerCase()))
  pool.sort((a, b) => Number(normalise(b.lang) === 'en-gb') - Number(normalise(a.lang) === 'en-gb'))
  if (pool.length === 0) return undefined
  if (gender) {
    const sameGender = pool.filter((voice) =>
      gender === 'female' ? FEMALE_VOICE_NAME.test(voice.name) : MALE_VOICE_NAME.test(voice.name) && !/female/i.test(voice.name),
    )
    if (sameGender.length) pool = sameGender
  }
  return pool[variety % pool.length]
}

const genderOfVoice = (voice: VoiceId): 'female' | 'male' => (/female|child/.test(voice) ? 'female' : 'male')

/* ============================================================================
 * 3. "BƯỚC" PHÁT: 1 lần phát = chuỗi các bước (file mp3 / đọc bằng trình duyệt / nghỉ)
 * ========================================================================== */

type PlaybackStep =
  | { kind: 'file'; url: string; durationSec: number; fallback: PlaybackStep[] }
  | { kind: 'speech'; text: string; lang: string; gender: 'female' | 'male' | null; variety: number; baseRate: number; durationSec: number }
  | { kind: 'gap'; durationSec: number }

/** Ước lượng thời lượng câu (giây) khi chưa có file: ~14 ký tự/giây. */
const estimateSeconds = (text: string, baseRate = 1) => (0.4 + text.length / 14) / baseRate

function speechStep(text: string, lang: string, gender: 'female' | 'male' | null, variety = 0, baseRate = 1): PlaybackStep {
  return { kind: 'speech', text, lang, gender, variety, baseRate, durationSec: estimateSeconds(text, baseRate) }
}

function fileStep(url: string, durationSec: number, fallback: PlaybackStep[]): PlaybackStep {
  return { kind: 'file', url, durationSec, fallback }
}

/** Các bước đọc 1 dòng: có file đúng giọng thì phát file, không thì giọng trình duyệt. */
async function stepsForLine(line: { text: string; voice: VoiceId }, variety: number): Promise<PlaybackStep> {
  const speech = speechStep(line.text, BROWSER_LANG_BY_VOICE[line.voice], genderOfVoice(line.voice), variety)
  const info = await getClipInfo(clipKey(line.text, EDGE_VOICE_BY_ID[line.voice]))
  return info ? fileStep(info.url, info.durationSec, [speech]) : speech
}

/* ============================================================================
 * 4. PLAYBACKHANDLE — điều khiển 1 lần phát
 * ========================================================================== */

export interface PlaybackProgress {
  /** đã phát được bao nhiêu giây (theo thời lượng nội dung, không phụ thuộc tốc độ) */
  currentTime: number
  /** tổng thời lượng (giây). Chưa có file thì là số ước lượng. */
  duration: number
}

export interface PlayOptions {
  /** tốc độ phát: 0.75 / 1 / 1.25 (mặc định 1) */
  rate?: number
  /** gọi khoảng 5 lần/giây khi đang phát (vẽ thanh tiến độ) */
  onProgress?: (progress: PlaybackProgress) => void
  /** gọi khi phát HẾT tự nhiên (không gọi khi bị stop) */
  onEnded?: () => void
}

type PlaybackState = 'loading' | 'playing' | 'paused' | 'ended' | 'stopped'

export class PlaybackHandle {
  /** Kết thúc khi phát xong HOẶC bị dừng. VD: await playAudioLine(line).finished */
  readonly finished: Promise<void>
  private resolveFinished!: () => void
  private steps: PlaybackStep[] = []
  private index = 0
  private stateValue: PlaybackState = 'loading'
  private pauseRequested = false
  private rateValue: number
  private audio: HTMLAudioElement | null = null
  private stepLaunched = false // bước hiện tại đã bắt đầu kêu chưa
  private stepElapsed = 0 // giây nội dung đã phát của bước speech/gap (trước lần dừng gần nhất)
  private stepStartedAt = 0 // performance.now() lúc bước speech/gap chạy tiếp
  private stepToken = 0 // tăng khi đổi bước -> sự kiện của bước cũ bị bỏ qua
  private gapTimer: ReturnType<typeof setTimeout> | undefined
  private progressTimer: ReturnType<typeof setInterval> | undefined

  constructor(buildSteps: () => Promise<PlaybackStep[]>, private options: PlayOptions = {}) {
    this.rateValue = options.rate ?? 1
    this.finished = new Promise((resolve) => (this.resolveFinished = resolve))
    buildSteps()
      .then((steps) => {
        if (this.stateValue === 'stopped') return
        this.steps = steps
        this.stateValue = this.pauseRequested ? 'paused' : 'playing'
        this.progressTimer = setInterval(() => this.stateValue === 'playing' && this.emitProgress(), 200)
        this.startStep(0)
      })
      .catch(() => this.finish(false))
  }

  get state(): PlaybackState {
    return this.stateValue
  }
  get rate(): number {
    return this.rateValue
  }
  /** true nếu toàn bộ đang phát từ file mp3 (seek chính xác). */
  get usingFiles(): boolean {
    return this.steps.length > 0 && this.steps.every((step) => step.kind !== 'speech')
  }

  get duration(): number {
    return this.steps.reduce((sum, step) => sum + step.durationSec, 0)
  }

  get currentTime(): number {
    let time = 0
    for (let i = 0; i < Math.min(this.index, this.steps.length); i++) time += this.steps[i].durationSec
    const step = this.steps[this.index]
    if (!step) return Math.min(time, this.duration)
    if (step.kind === 'file') return time + (this.audio?.currentTime ?? 0)
    const running = this.stateValue === 'playing' && this.stepLaunched ? ((performance.now() - this.stepStartedAt) / 1000) * this.rateValue : 0
    return time + Math.min(step.durationSec, this.stepElapsed + running)
  }

  pause(): void {
    if (this.stateValue === 'loading') {
      this.pauseRequested = true
      return
    }
    if (this.stateValue !== 'playing') return
    const step = this.steps[this.index]
    if (this.stepLaunched && step) {
      if (step.kind === 'file') this.audio?.pause()
      else {
        this.stepElapsed += ((performance.now() - this.stepStartedAt) / 1000) * this.rateValue
        clearTimeout(this.gapTimer) // hẹn giờ hết khoảng nghỉ / "chó canh" của câu đọc
        if (step.kind === 'speech') window.speechSynthesis?.pause()
      }
    }
    this.stateValue = 'paused'
    this.emitProgress()
  }

  resume(): void {
    if (this.stateValue === 'loading') {
      this.pauseRequested = false
      return
    }
    if (this.stateValue !== 'paused') return
    this.stateValue = 'playing'
    const step = this.steps[this.index]
    if (!step) return this.finish(true)
    if (!this.stepLaunched) return this.launchStep()
    if (step.kind === 'file') void this.audio?.play().catch(() => this.useFallback())
    else {
      this.stepStartedAt = performance.now()
      if (step.kind === 'speech') {
        window.speechSynthesis?.resume()
        this.scheduleSpeechWatchdog(step)
      } else this.scheduleGapEnd(step)
    }
  }

  /** Nhảy tới giây thứ `seconds` (dùng cho nút tua ±5 giây). Đoạn đọc bằng trình duyệt thì đọc lại từ đầu câu đó. */
  seek(seconds: number): void {
    if (this.stateValue === 'loading' || this.stateValue === 'ended' || this.stateValue === 'stopped') return
    const target = Math.max(0, Math.min(seconds, Math.max(0, this.duration - 0.05)))
    let start = 0
    for (let i = 0; i < this.steps.length; i++) {
      const step = this.steps[i]
      if (target < start + step.durationSec || i === this.steps.length - 1) {
        const offset = target - start
        if (i === this.index && step.kind === 'file' && this.audio) {
          this.audio.currentTime = offset // cùng file -> chỉ đổi vị trí, không tải lại
        } else {
          this.startStep(i, offset)
        }
        this.emitProgress()
        return
      }
      start += step.durationSec
    }
  }

  /** Đổi tốc độ khi đang phát (0.75 / 1 / 1.25). Đoạn đọc bằng trình duyệt: áp dụng từ câu sau. */
  setRate(rate: number): void {
    const step = this.steps[this.index]
    if (step && step.kind !== 'file' && this.stateValue === 'playing' && this.stepLaunched) {
      this.stepElapsed += ((performance.now() - this.stepStartedAt) / 1000) * this.rateValue
      this.stepStartedAt = performance.now()
    }
    this.rateValue = rate
    if (this.audio) this.audio.playbackRate = rate
    if (step?.kind === 'gap' && this.stateValue === 'playing' && this.stepLaunched) this.scheduleGapEnd(step)
  }

  /** Dừng hẳn (không gọi onEnded). */
  stop(): void {
    if (this.stateValue === 'ended' || this.stateValue === 'stopped') return
    this.stateValue = 'stopped'
    this.cleanupStep()
    this.finish(false)
  }

  /* ---------------- bên trong ---------------- */

  private emitProgress() {
    this.options.onProgress?.({ currentTime: this.currentTime, duration: this.duration })
  }

  private cleanupStep() {
    this.stepToken++
    clearTimeout(this.gapTimer)
    if (this.audio) {
      this.audio.onended = null
      this.audio.onerror = null
      this.audio.pause()
      this.audio = null
    }
    if (this.steps[this.index]?.kind === 'speech') window.speechSynthesis?.cancel()
    this.stepLaunched = false
    this.stepElapsed = 0
  }

  /** Chuẩn bị bước thứ `index` (bắt đầu từ giây `offset` của bước), rồi phát nếu đang ở trạng thái phát. */
  private startStep(index: number, offset = 0) {
    this.cleanupStep()
    this.index = index
    if (index >= this.steps.length) return this.finish(true)
    const step = this.steps[index]
    const token = this.stepToken
    if (step.kind === 'file') {
      const audio = new Audio(step.url)
      audio.preload = 'auto'
      audio.defaultPlaybackRate = this.rateValue
      audio.playbackRate = this.rateValue
      audio.onloadedmetadata = () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) step.durationSec = audio.duration
        if (offset > 0) audio.currentTime = offset
        audio.playbackRate = this.rateValue
      }
      audio.onended = () => token === this.stepToken && this.startStep(index + 1)
      audio.onerror = () => token === this.stepToken && this.useFallback()
      this.audio = audio
    } else if (step.kind === 'gap') {
      this.stepElapsed = Math.min(offset, step.durationSec)
    }
    if (this.stateValue === 'playing') this.launchStep()
  }

  /** Thật sự bắt đầu kêu bước hiện tại. */
  private launchStep() {
    const step = this.steps[this.index]
    if (!step) return this.finish(true)
    const token = this.stepToken
    this.stepLaunched = true
    this.stepStartedAt = performance.now()
    if (step.kind === 'file') {
      void this.audio?.play().catch(() => token === this.stepToken && this.useFallback())
    } else if (step.kind === 'speech') {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return this.startStep(this.index + 1)
      const utterance = new SpeechSynthesisUtterance(step.text)
      utterance.lang = step.lang
      utterance.rate = step.baseRate * this.rateValue
      const voice = pickBrowserVoice(step.lang, step.gender, step.variety)
      if (voice) utterance.voice = voice
      const next = () => token === this.stepToken && this.startStep(this.index + 1)
      utterance.onend = next
      utterance.onerror = next
      window.speechSynthesis.speak(utterance)
      this.scheduleSpeechWatchdog(step)
    } else {
      this.scheduleGapEnd(step)
    }
  }

  /**
   * "Chó canh": Chrome đôi khi không báo onend cho câu đọc dài -> trình phát bị treo.
   * Quá 3 lần thời lượng ước tính (+5 giây) mà chưa xong thì tự sang bước sau.
   */
  private scheduleSpeechWatchdog(step: PlaybackStep) {
    clearTimeout(this.gapTimer)
    const token = this.stepToken
    const limitSeconds = (Math.max(0, step.durationSec * 3 + 5 - this.stepElapsed)) / this.rateValue
    this.gapTimer = setTimeout(() => {
      // startStep -> cleanupStep đổi stepToken TRƯỚC rồi mới huỷ câu đang đọc (sự kiện onend cũ bị bỏ qua)
      if (token === this.stepToken) this.startStep(this.index + 1)
    }, limitSeconds * 1000)
  }

  private scheduleGapEnd(step: PlaybackStep) {
    clearTimeout(this.gapTimer)
    const token = this.stepToken
    const remaining = Math.max(0, step.durationSec - this.stepElapsed) / this.rateValue
    this.gapTimer = setTimeout(() => token === this.stepToken && this.startStep(this.index + 1), remaining * 1000)
  }

  /** File mp3 lỗi / không phát được -> thay bằng giọng trình duyệt. */
  private useFallback() {
    const step = this.steps[this.index]
    if (!step || step.kind !== 'file') return
    this.steps.splice(this.index, 1, ...step.fallback)
    this.startStep(this.index)
  }

  private finish(natural: boolean) {
    clearInterval(this.progressTimer)
    if (natural && this.stateValue !== 'stopped') {
      this.stateValue = 'ended'
      this.emitProgress()
      this.options.onEnded?.()
    }
    if (currentPlayback === this) currentPlayback = null
    this.resolveFinished()
  }
}

/* ============================================================================
 * 5. ĐIỀU KHIỂN CHUNG: mỗi lúc chỉ 1 âm thanh
 * ========================================================================== */

let currentPlayback: PlaybackHandle | null = null

function startPlayback(buildSteps: () => Promise<PlaybackStep[]>, options?: PlayOptions): PlaybackHandle {
  stopSpeaking()
  const handle = new PlaybackHandle(buildSteps, options)
  currentPlayback = handle
  return handle
}

/** Dừng mọi âm thanh đang phát. */
export function stopSpeaking(): void {
  currentPlayback?.stop()
  currentPlayback = null
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel()
}

/* ============================================================================
 * 6. CÁC HÀM PHÁT
 * ========================================================================== */

/**
 * (Hàm cũ, giữ nguyên cách dùng) Phát 1 câu / 1 đoạn hội thoại "Anna: …\nTom: …".
 * Trả về Promise kết thúc khi phát xong.
 * @param rate tốc độ (1 = bình thường, 0.75 = chậm "rùa" như Duolingo)
 */
export function speak(script: string, rate = 1): Promise<void> {
  return startPlayback(
    async () => {
      const lines = scriptToVoicedLines(script)
      const speech = lines.flatMap((line, index) => [
        ...(index > 0 ? [{ kind: 'gap', durationSec: GAP_BETWEEN_LINES_SECONDS } as PlaybackStep] : []),
        speechStep(line.text, BROWSER_LANG_BY_VOICE[line.voice], genderOfVoice(line.voice), index),
      ])
      const key = hashAudioText(script)
      if ((await loadLegacyManifest()).has(key)) {
        const total = speech.reduce((sum, step) => sum + step.durationSec, 0)
        return [fileStep(`/audio/${key}.mp3`, total, speech)]
      }
      return speech
    },
    { rate },
  ).finished
}

/** Đọc 1 dòng AudioLine đúng giọng của dòng (mặc định nữ Anh-Anh). */
export function playAudioLine(line: AudioLine, options?: PlayOptions): PlaybackHandle {
  return startPlayback(async () => {
    const voice = line.voice ?? DEFAULT_VOICE
    const speech = speechStep(line.text, BROWSER_LANG_BY_VOICE[voice], genderOfVoice(voice))
    // giọng mặc định (nữ Anh-Anh) thì file kiểu cũ của cùng câu cũng đúng giọng -> dùng được
    const info =
      (await getClipInfo(audioLineKey(line))) ?? (voice === DEFAULT_VOICE ? await getClipInfo(hashAudioText(line.text)) : null)
    return [info ? fileStep(info.url, info.durationSec, [speech]) : speech]
  }, options)
}

/**
 * Phát 1 đoạn nghe (ListeningTask.segments[i]).
 * Có file ghép sẵn -> phát 1 file (tua chính xác). Chưa có -> đọc từng dòng, nghỉ 350 ms giữa các dòng.
 */
export function playSegment(segment: { id?: string; lines: AudioLine[] }, options?: PlayOptions): PlaybackHandle {
  return startPlayback(async () => {
    const voiced = resolveLineVoices(segment.lines)
    const speakerOrder = [...new Set(voiced.map((line) => line.speaker ?? ''))]
    const perLine: PlaybackStep[] = []
    for (const [index, line] of voiced.entries()) {
      if (index > 0) perLine.push({ kind: 'gap', durationSec: GAP_BETWEEN_LINES_SECONDS })
      perLine.push(await stepsForLine(line, speakerOrder.indexOf(line.speaker ?? '')))
    }
    const info = await getClipInfo(segmentKey(segment.lines))
    return info ? [fileStep(info.url, info.durationSec, perLine)] : perLine
  }, options)
}
