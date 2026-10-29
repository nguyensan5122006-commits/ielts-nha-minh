/**
 * audio-recorder.ts
 * ----------------------------------------------------------------------------
 * GHI ÂM GIỌNG NÓI để gửi cho AI chấm Speaking.
 *
 * Trình duyệt ghi âm ra định dạng webm, nhưng Gemini đọc tốt nhất WAV.
 * Vì vậy sau khi ghi xong, ta:
 *   1. giải mã âm thanh (AudioContext.decodeAudioData)
 *   2. trộn về 1 kênh (mono) và giảm còn 16.000 mẫu/giây (đủ cho giọng nói, file nhỏ)
 *   3. đóng gói thành file WAV 16-bit rồi chuyển sang base64 để gửi qua JSON
 * 1 phút ghi âm ≈ 1,9 MB.
 * ----------------------------------------------------------------------------
 */

const TARGET_SAMPLE_RATE = 16_000

export interface RecordedAudio {
  base64Wav: string
  mimeType: 'audio/wav'
  durationSeconds: number
  playbackUrl: string // để người học nghe lại bài nói của mình
}

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null
  private chunks: Blob[] = []
  private stream: MediaStream | null = null

  /** Xin quyền micro và bắt đầu ghi. */
  async start(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    this.chunks = []
    this.mediaRecorder = new MediaRecorder(this.stream)
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) this.chunks.push(event.data)
    }
    this.mediaRecorder.start()
  }

  get isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording'
  }

  /** Dừng ghi, trả về file WAV base64. */
  async stop(): Promise<RecordedAudio> {
    const recorder = this.mediaRecorder
    if (!recorder) throw new Error('Chưa bắt đầu ghi âm')
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve()
      recorder.stop()
    })
    this.stream?.getTracks().forEach((track) => track.stop()) // tắt đèn micro
    const recordedBlob = new Blob(this.chunks, { type: recorder.mimeType })
    return convertToWav(recordedBlob)
  }

  /** Huỷ ghi âm (khi rời trang). */
  cancel(): void {
    if (this.mediaRecorder?.state === 'recording') this.mediaRecorder.stop()
    this.stream?.getTracks().forEach((track) => track.stop())
  }
}

async function convertToWav(blob: Blob): Promise<RecordedAudio> {
  // Bước 1: giải mã
  const audioContext = new AudioContext()
  const decoded = await audioContext.decodeAudioData(await blob.arrayBuffer())
  await audioContext.close()

  // Bước 2: giảm tần số mẫu + trộn mono bằng OfflineAudioContext
  const length = Math.ceil(decoded.duration * TARGET_SAMPLE_RATE)
  const offline = new OfflineAudioContext(1, Math.max(1, length), TARGET_SAMPLE_RATE)
  const source = offline.createBufferSource()
  source.buffer = decoded
  source.connect(offline.destination)
  source.start()
  const rendered = await offline.startRendering()
  const samples = rendered.getChannelData(0)

  // Bước 3: viết header WAV (44 byte) + dữ liệu 16-bit
  const buffer = new ArrayBuffer(44 + samples.length * 2)
  const view = new DataView(buffer)
  const writeText = (offset: number, text: string) => [...text].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)))
  writeText(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * 2, true)
  writeText(8, 'WAVE')
  writeText(12, 'fmt ')
  view.setUint32(16, 16, true) // kích thước khối fmt
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, 1, true) // 1 kênh
  view.setUint32(24, TARGET_SAMPLE_RATE, true)
  view.setUint32(28, TARGET_SAMPLE_RATE * 2, true) // byte / giây
  view.setUint16(32, 2, true) // byte / mẫu
  view.setUint16(34, 16, true) // bit / mẫu
  writeText(36, 'data')
  view.setUint32(40, samples.length * 2, true)
  samples.forEach((sample, i) => {
    const clamped = Math.max(-1, Math.min(1, sample))
    view.setInt16(44 + i * 2, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true)
  })

  const wavBlob = new Blob([buffer], { type: 'audio/wav' })
  return {
    base64Wav: await blobToBase64(wavBlob),
    mimeType: 'audio/wav',
    durationSeconds: decoded.duration,
    playbackUrl: URL.createObjectURL(wavBlob),
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1]) // bỏ phần "data:audio/wav;base64,"
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}
