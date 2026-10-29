/**
 * speech-recognition.ts
 * ----------------------------------------------------------------------------
 * NHẬN DIỆN GIỌNG NÓI MIỄN PHÍ bằng Web Speech API có sẵn trong Chrome / Edge.
 * Dùng cho bài "Đọc to câu" — không tốn lượt AI.
 * Firefox chưa hỗ trợ -> giao diện sẽ cho phép bỏ qua bài đó.
 * ----------------------------------------------------------------------------
 */

// Kiểu dữ liệu tối thiểu (TypeScript chưa có sẵn kiểu cho API này)
interface MinimalRecognition {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
}

function getRecognitionConstructor(): (new () => MinimalRecognition) | null {
  const w = window as unknown as Record<string, unknown>
  return (w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null) as (new () => MinimalRecognition) | null
}

export function isSpeechRecognitionSupported(): boolean {
  return getRecognitionConstructor() !== null
}

/**
 * Nghe người dùng nói 1 câu, trả về các phương án chữ mà máy nghe được.
 * Kết thúc khi người dùng ngừng nói hoặc gọi hàm stop() được trả về.
 */
export function listenOnce(): { result: Promise<string[]>; stop: () => void } {
  const Recognition = getRecognitionConstructor()
  if (!Recognition) return { result: Promise.reject(new Error('unsupported')), stop: () => {} }

  const recognition = new Recognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 3

  const result = new Promise<string[]>((resolve, reject) => {
    let transcripts: string[] = []
    recognition.onresult = (event) => {
      const alternatives = event.results[0]
      transcripts = Array.from({ length: alternatives.length }, (_, i) => alternatives[i].transcript)
    }
    recognition.onerror = (event) => {
      if (event.error === 'no-speech') resolve([])
      else reject(new Error(event.error))
    }
    recognition.onend = () => resolve(transcripts)
  })

  recognition.start()
  return { result, stop: () => recognition.stop() }
}
