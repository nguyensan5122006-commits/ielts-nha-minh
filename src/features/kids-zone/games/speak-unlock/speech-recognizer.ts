/**
 * speech-recognizer.ts — NGHE BÉ NÓI 1 TỪ bằng Web Speech API (Chrome / Edge / Safari)
 * ----------------------------------------------------------------------------
 *   const listening = listenForWord({ devTranscript: 'cat' })
 *   const outcome = await listening.result      // { kind: 'heard', alternatives: [...] } | …
 *   listening.stop()                             // bé bấm lại nút micro = nói xong
 *
 * Khác services/speech-recognition.ts (bài "Đọc to câu" của người lớn) ở chỗ:
 *   - maxAlternatives = 6 (luật 32 cần ≥ 5 phương án để chấm lỏng)
 *   - giọng Anh-Anh (en-GB) cho khớp giọng mẫu của khu trẻ em
 *   - CHƯA dùng nhận diện ngay trên máy (processLocally / SpeechRecognition.available() của Chrome mới):
 *     khi thử, available() làm treo hẳn trang trên Chrome 141 headless -> quá rủi ro cho bé.
 *     Hiện dùng cách thường của trình duyệt (Chrome gửi âm thanh tới máy chủ Google để nhận diện).
 *     Luật 34 muốn "ưu tiên trên máy" -> đã ghi câu hỏi cho chủ nhà trong _research/OPEN-QUESTIONS.md.
 *   - phân loại lỗi rõ ràng: im lặng / micro bị chặn / trình duyệt không nghe được
 *   - hẹn giờ dự phòng: không bao giờ treo ở trạng thái "đang nghe"
 * Micro chỉ được xin khi bé BẤM nút (start() gọi trong hàm xử lý bấm).
 * Không lưu, không tải âm thanh lên đâu cả.
 *
 * CHỈ KHI DEV (thử trên máy không có micro): thêm vào địa chỉ trang
 *   ?speech=off      giả trình duyệt không hỗ trợ  -> trò tự sang "tự nghe và so sánh"
 *   ?speech=blocked  giả micro bị chặn
 *   ?speech=right    giả máy nghe đúng từ           ?speech=wrong  giả máy nghe ra từ khác
 * ----------------------------------------------------------------------------
 */

/** Kiểu tối thiểu (TypeScript chưa có sẵn kiểu cho Web Speech API). */
interface RecognitionAlternative {
  transcript: string
}
interface RecognitionEvent {
  results: ArrayLike<ArrayLike<RecognitionAlternative>>
}
interface MinimalRecognition {
  lang: string
  interimResults: boolean
  continuous: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: RecognitionEvent) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}
interface RecognitionConstructor {
  new (): MinimalRecognition
}

export type ListenOutcome =
  | { kind: 'heard'; alternatives: string[] }
  /** bé chưa nói gì / nói nhỏ quá */
  | { kind: 'silence' }
  /** micro bị chặn hoặc máy không có micro */
  | { kind: 'mic-blocked' }
  /** trình duyệt không nghe được (mất mạng, không hỗ trợ tiếng Anh…) */
  | { kind: 'failed'; error: string }

export interface ListeningHandle {
  result: Promise<ListenOutcome>
  stop: () => void
}

const LANG = 'en-GB'
const MAX_ALTERNATIVES = 6
/** Nghe tối đa chừng này rồi tự dừng (từ đơn chỉ cần 1–2 giây) */
const LISTEN_TIMEOUT_MS = 7000

type DevSpeechMode = 'off' | 'blocked' | 'right' | 'wrong' | null

function devSpeechMode(): DevSpeechMode {
  if (!import.meta.env.DEV) return null
  const value = new URLSearchParams(window.location.search).get('speech')
  return value === 'off' || value === 'blocked' || value === 'right' || value === 'wrong' ? value : null
}

function recognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === 'undefined' || devSpeechMode() === 'off') return null
  const w = window as unknown as Record<string, unknown>
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as RecognitionConstructor | null
}

/** Trình duyệt này có nghe được giọng nói không? (Firefox: không) */
export function isSpeechRecognitionAvailable(): boolean {
  return recognitionConstructor() !== null
}

/**
 * Bắt đầu nghe NGAY (gọi trong hàm xử lý bấm nút để trình duyệt hỏi quyền micro đúng lúc).
 * @param devTranscript chỉ dùng khi dev giả lập (?speech=right): chữ "máy nghe được"
 */
export function listenForWord(options: { devTranscript?: string } = {}): ListeningHandle {
  const dev = devSpeechMode()
  if (dev === 'blocked') return { result: Promise.resolve({ kind: 'mic-blocked' }), stop: () => {} }
  if (dev === 'right' || dev === 'wrong') {
    let finish: (outcome: ListenOutcome) => void = () => {}
    const result = new Promise<ListenOutcome>((resolve) => (finish = resolve))
    const outcome: ListenOutcome = { kind: 'heard', alternatives: dev === 'right' ? [options.devTranscript ?? ''] : ['banana split', 'bandana'] }
    const timer = window.setTimeout(() => finish(outcome), 1200)
    return {
      result,
      stop: () => {
        window.clearTimeout(timer)
        finish(outcome)
      },
    }
  }

  const Recognition = recognitionConstructor()
  if (!Recognition) return { result: Promise.resolve({ kind: 'failed', error: 'unsupported' }), stop: () => {} }

  const recognition = new Recognition()
  recognition.lang = LANG
  recognition.interimResults = false
  recognition.continuous = false
  recognition.maxAlternatives = MAX_ALTERNATIVES

  let settled = false
  let finish: (outcome: ListenOutcome) => void = () => {}
  const result = new Promise<ListenOutcome>((resolve) => {
    finish = (outcome) => {
      if (settled) return
      settled = true
      window.clearTimeout(watchdog)
      resolve(outcome)
    }
  })

  let alternatives: string[] = []
  recognition.onresult = (event) => {
    const first = event.results[0]
    if (!first) return
    alternatives = Array.from({ length: first.length }, (_, i) => first[i].transcript).filter(Boolean)
  }
  recognition.onerror = (event) => {
    if (event.error === 'no-speech' || event.error === 'aborted') finish({ kind: 'silence' })
    else if (event.error === 'not-allowed' || event.error === 'service-not-allowed' || event.error === 'audio-capture') finish({ kind: 'mic-blocked' })
    else finish({ kind: 'failed', error: event.error })
  }
  recognition.onend = () => finish(alternatives.length ? { kind: 'heard', alternatives } : { kind: 'silence' })

  // dự phòng: quá lâu thì tự dừng (onend sẽ trả kết quả); vẫn không xong thì coi như im lặng
  const watchdog = window.setTimeout(() => {
    try {
      recognition.stop()
    } catch {
      /* đã dừng */
    }
    window.setTimeout(() => finish(alternatives.length ? { kind: 'heard', alternatives } : { kind: 'silence' }), 1200)
  }, LISTEN_TIMEOUT_MS)

  try {
    recognition.start()
  } catch (error) {
    finish({ kind: 'failed', error: String(error) })
  }

  return {
    result,
    stop: () => {
      try {
        recognition.stop()
      } catch {
        /* đã dừng */
      }
    },
  }
}
