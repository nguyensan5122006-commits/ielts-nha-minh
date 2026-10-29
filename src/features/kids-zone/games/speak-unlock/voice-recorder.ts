/**
 * voice-recorder.ts — GHI GIỌNG BÉ ĐỂ TỰ NGHE LẠI (bước "tự nghe và so sánh", luật 33)
 * ----------------------------------------------------------------------------
 *   const take = await startVoiceRecording()        // xin micro (chỉ gọi khi bé bấm nút)
 *   if (take.kind === 'recording') { …; const url = await take.stop() }   // url = blob: để phát lại
 *
 * Quyền riêng tư (luật 34): bản ghi CHỈ nằm trong bộ nhớ trình duyệt (blob:), không tải lên đâu;
 * trò gọi URL.revokeObjectURL(url) khi rời câu -> bản ghi bị xoá.
 * Tự dừng sau MAX_RECORD_MS (1 từ chỉ cần 1–2 giây).
 * ----------------------------------------------------------------------------
 */

const MAX_RECORD_MS = 3500

export type RecordingStart = { kind: 'recording'; stop: () => Promise<string | null> } | { kind: 'mic-blocked' } | { kind: 'unsupported' }

/** Trình duyệt có ghi âm được không (MediaRecorder + getUserMedia). */
export function canRecordVoice(): boolean {
  return typeof window !== 'undefined' && typeof window.MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
}

export async function startVoiceRecording(onAutoStop?: (url: string | null) => void): Promise<RecordingStart> {
  if (!canRecordVoice()) return { kind: 'unsupported' }
  let stream: MediaStream
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
  } catch {
    return { kind: 'mic-blocked' }
  }

  const recorder = new MediaRecorder(stream)
  const chunks: BlobPart[] = []
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) chunks.push(event.data)
  }
  const finished = new Promise<string | null>((resolve) => {
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop()) // tắt đèn micro ngay
      resolve(chunks.length ? URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/webm' })) : null)
    }
  })
  recorder.start()

  const stop = () => {
    window.clearTimeout(autoStop)
    if (recorder.state !== 'inactive') recorder.stop()
    return finished
  }
  const autoStop = window.setTimeout(() => void stop().then((url) => onAutoStop?.(url)), MAX_RECORD_MS)
  return { kind: 'recording', stop }
}

/** Phát lại 1 bản ghi; Promise xong khi phát hết (có hẹn giờ dự phòng, không bao giờ treo). */
export function playRecording(url: string): Promise<void> {
  return new Promise((resolve) => {
    const audio = new Audio(url)
    const done = () => {
      window.clearTimeout(fallback)
      resolve()
    }
    const fallback = window.setTimeout(done, MAX_RECORD_MS + 1500)
    audio.onended = done
    audio.onerror = done
    void audio.play().catch(done)
  })
}
