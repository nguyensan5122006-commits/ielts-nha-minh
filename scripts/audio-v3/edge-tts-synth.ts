/**
 * edge-tts-synth.ts
 * ----------------------------------------------------------------------------
 * GỌI GIỌNG ĐỌC AI CỦA MICROSOFT EDGE (miễn phí, qua thư viện msedge-tts)
 * để đọc 1 đoạn chữ -> trả về dữ liệu mp3 (Buffer).
 *
 * Có thêm 3 thứ so với script cũ:
 *   1. Tốc độ đọc (rate, VD "-15%") cho khu trẻ em.
 *   2. Hết thời gian chờ + thử lại nhiều lần (mạng chập chờn, máy chủ từ chối tạm thời).
 *   3. "Vá" cách đăng nhập của thư viện: từ khoảng 10/2026 máy chủ Microsoft đòi mã
 *      Sec-MS-GEC kiểu mới (v2). msedge-tts 2.0.9 (bản đang cài) chỉ có kiểu cũ nên
 *      bị trả lỗi 403. Bản msedge-tts >= 2.1.0 đã sửa — khi nâng cấp thư viện, phần vá
 *      tự nhận ra và không chạy nữa. Thuật toán chép từ msedge-tts 2.1.1 (giấy phép MIT,
 *      © Migushthe2nd), dựa trên phân tích ở https://github.com/rany2/edge-tts/pull/492.
 * ----------------------------------------------------------------------------
 */
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

/** Định dạng đầu ra: mp3 mono 24 kHz, 48 kbps (~6 KB/giây) — đủ rõ cho giọng nói, file nhỏ. */
export const AUDIO_FORMAT = OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3

/* ============================================================================
 * 1. VÁ ĐĂNG NHẬP Sec-MS-GEC v2 (chỉ chạy khi thư viện còn dùng kiểu cũ)
 * ========================================================================== */

const EDGE_COPYRIGHT = 'Copyright (C) Microsoft Corporation. All rights reserved.'
const SWAP_FIRST_WORD = { swappedWord: 0xef0569fb, swappedSum: 0x76f50f34, swappedProduct: 0xc3efea97 }
const SWAP_SECOND_WORD = { swappedWord: 0xc31713db, swappedSum: 0x1881ce3c, swappedProduct: 0x35bd1ec9 }
const MIX_FIRST_WORD = [0xcf98b111, 0x87085b9f, 0x12ceb96d, 0x257e1d83]
const MIX_SECOND_WORD = [0xa27416f5, 0xd38396ff, 0x7c932b89, 0xbfa49f69]

const swapHalves = (value: number) => ((value << 16) | (value >>> 16)) >>> 0
const toUpperHex = (bytes: Uint8Array) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase()

function swapTerm(word: number, key: number, m: typeof SWAP_FIRST_WORD): number {
  const sum = Math.imul(word, key) + Math.imul(swapHalves(word), m.swappedWord)
  const product = Math.imul(swapHalves(sum), m.swappedSum) >>> 0
  return (Math.imul(swapHalves(product), m.swappedProduct) + product) >>> 0
}

function swapAndMultiply(value: number, multipliers: number[]): number {
  for (const multiplier of multipliers) value = Math.imul(swapHalves(value), multiplier) >>> 0
  return value
}

/** Mã kiểm tra 64 bit ("CS64") — phần đầu của mã Sec-MS-GEC v2. */
function checksum64(message: Uint8Array, digest: Uint8Array): Uint8Array {
  const digestView = new DataView(digest.buffer, digest.byteOffset, digest.byteLength)
  const firstKey = (digestView.getUint32(0, true) | 1) >>> 0
  const secondKey = (digestView.getUint32(4, true) | 1) >>> 0
  const padded = new Uint8Array(Math.ceil(message.length / 8) * 8)
  padded.set(message)
  const words = new DataView(padded.buffer)
  let swapSum = 0
  let lastSwap = 0
  let mix = 0
  let mixSum = 0
  for (let offset = 0; offset < padded.length; offset += 8) {
    const firstWord = words.getUint32(offset, true)
    const secondWord = words.getUint32(offset + 4, true)
    const firstSwap = swapTerm(firstWord, firstKey, SWAP_FIRST_WORD)
    lastSwap = swapTerm(secondWord, secondKey, SWAP_SECOND_WORD)
    swapSum = (swapSum + firstSwap + lastSwap) >>> 0
    mix = swapAndMultiply(Math.imul(mix + firstWord, firstKey), MIX_FIRST_WORD)
    mixSum = (mixSum + mix) >>> 0
    mix = swapAndMultiply(Math.imul(mix + secondWord, secondKey), MIX_SECOND_WORD)
    mixSum = (mixSum + mix) >>> 0
  }
  const result = new Uint8Array(8)
  const view = new DataView(result.buffer)
  view.setUint32(0, lastSwap ^ mix, true)
  view.setUint32(4, swapSum ^ mixSum, true)
  return result
}

async function secMsGecV2(trustedClientToken: string): Promise<string> {
  // thời điểm hiện tại theo "tick" Windows, làm tròn 5 phút (giống trình duyệt Edge)
  const ticks = Math.floor(Date.now() / 1000) + 11644473600
  const windowsTicks = (ticks - (ticks % 300)) * 10000000
  const message = new TextEncoder().encode(EDGE_COPYRIGHT + `${windowsTicks}${trustedClientToken}`)
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', message))
  return `${toUpperHex(checksum64(message, digest))}-${toUpperHex(digest)}`
}

// Các hàm tĩnh "riêng tư" của thư viện -> truy cập qua kiểu any có kiểm soát
type PatchableTts = {
  generateSecMsGec: (token: string) => Promise<string>
  getSynthUrl: () => Promise<string>
}
const patchable = MsEdgeTTS as unknown as PatchableTts
if (!String(patchable.generateSecMsGec).includes('V2')) {
  const originalGetSynthUrl = patchable.getSynthUrl
  patchable.generateSecMsGec = secMsGecV2
  patchable.getSynthUrl = async () =>
    (await originalGetSynthUrl.call(MsEdgeTTS)).replace('Sec-MS-GEC-Version=1-', 'Sec-MS-GEC-Version=2-')
}

/* ============================================================================
 * 2. ĐỌC 1 ĐOẠN CHỮ -> MP3
 * ========================================================================== */

/** Thoát ký tự đặc biệt của XML (máy chủ nhận chữ trong khung SSML). */
const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Sửa chữ trước khi đưa máy đọc (KHÔNG đổi mã file — mã vẫn tính từ chữ gốc mà giao diện hiển thị).
 * Nội dung bài học có ký hiệu để NHÌN, máy sẽ đọc thành tiếng rất kỳ ("check mark", "right arrow"…):
 *   ✓ ✗ ✔ ↗ ↘ (dấu đúng/sai, mũi tên ngữ điệu) -> bỏ
 *   →                                          -> ngắt nghỉ (dấu phẩy)
 *   ___  (chỗ trống)                           -> "blank"
 *   " / " (hoặc)                               -> dấu phẩy
 *   **đậm**                                    -> bỏ dấu sao
 */
export function prepareTextForSpeech(text: string): string {
  const cleaned = text
    .replace(/[✓✔✗✘✅❌↗↘]/g, ' ')
    .replace(/\s*[→⇒➜]\s*/g, ', ')
    .replace(/_{2,}/g, ' blank ')
    .replace(/\s+\/\s+/g, ', ')
    .replace(/\*\*/g, '')
    .replace(/([.!?])\s*,\s*/g, '$1 ') // ". ," -> ". "
    .replace(/\s+([,.!?])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim()
  return cleaned || text
}

/** Đọc 1 lần (không thử lại). Quá thời gian -> lỗi. */
async function synthesizeOnce(text: string, voice: string, rate: string): Promise<Buffer> {
  const tts = new MsEdgeTTS()
  const timeoutMs = Math.max(30_000, text.length * 60) // câu dài cho thêm thời gian
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    const work = (async () => {
      await tts.setMetadata(voice, AUDIO_FORMAT)
      const { audioStream } = tts.toStream(escapeXml(prepareTextForSpeech(text)), { rate })
      const chunks: Buffer[] = []
      await new Promise<void>((resolve, reject) => {
        audioStream.on('data', (chunk: Buffer) => chunks.push(chunk))
        audioStream.on('end', () => resolve())
        audioStream.on('error', reject)
      })
      return Buffer.concat(chunks)
    })()
    const timeout = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`quá ${Math.round(timeoutMs / 1000)} giây không xong`)), timeoutMs)
    })
    const audio = await Promise.race([work, timeout])
    if (audio.length < 500) throw new Error(`máy chủ trả về quá ít dữ liệu (${audio.length} byte)`)
    return audio
  } finally {
    clearTimeout(timer)
    try {
      tts.close()
    } catch {
      /* bỏ qua lỗi khi đóng kết nối */
    }
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Đọc 1 đoạn chữ, thử lại tối đa `attempts` lần, mỗi lần chờ lâu hơn (2s, 6s, 15s…).
 * @param rate tốc độ kiểu Edge: "+0%" bình thường, "-15%" chậm hơn 15%
 */
export async function synthesize(text: string, voice: string, rate: string, attempts = 4): Promise<Buffer> {
  let lastError: unknown
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await synthesizeOnce(text, voice, rate)
    } catch (error) {
      lastError = error
      if (attempt < attempts) await wait([2000, 6000, 15000, 30000][attempt - 1] + Math.random() * 1000)
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

/**
 * Chia đoạn chữ dài thành các phần ≤ maxChars, cắt ở cuối câu.
 * (Đoạn quá dài dễ bị máy chủ ngắt giữa chừng.)
 */
export function splitLongText(text: string, maxChars = 1200): string[] {
  if (text.length <= maxChars) return [text]
  const sentences = text.split(/(?<=[.!?])\s+/)
  const parts: string[] = []
  let current = ''
  for (const sentence of sentences) {
    if (current && current.length + sentence.length + 1 > maxChars) {
      parts.push(current)
      current = sentence
    } else {
      current = current ? `${current} ${sentence}` : sentence
    }
  }
  if (current) parts.push(current)
  return parts
}
