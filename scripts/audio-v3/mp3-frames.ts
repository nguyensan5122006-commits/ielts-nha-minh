/**
 * mp3-frames.ts
 * ----------------------------------------------------------------------------
 * ĐỌC "KHUNG" (FRAME) CỦA FILE MP3 — để đo thời lượng, kiểm tra file hỏng,
 * và tạo khoảng lặng (im lặng) chèn giữa 2 người nói.
 *
 * Kiến thức nền (đủ để đọc code bên dưới):
 *   - File mp3 là chuỗi các "khung" nối tiếp nhau. Mỗi khung bắt đầu bằng 4 byte
 *     "header" (11 bit đầu luôn là 1 = dấu đồng bộ 0xFFE), cho biết: phiên bản MPEG,
 *     bitrate, tần số lấy mẫu, mono/stereo…
 *   - Mỗi khung chứa cố định 1152 mẫu (MPEG-1) hoặc 576 mẫu (MPEG-2). Edge TTS
 *     xuất MPEG-2, 24 kHz, 48 kbps mono -> mỗi khung 144 byte = 24 ms âm thanh.
 *     => Thời lượng = số khung × 24 ms (không cần giải mã âm thanh).
 *   - 2 file mp3 cùng định dạng nối thẳng vào nhau vẫn là 1 file mp3 hợp lệ.
 *   - Khung "im lặng": giữ header, phần còn lại toàn số 0 -> máy giải mã ra im lặng.
 * ----------------------------------------------------------------------------
 */

/** Thông tin đọc được từ 1 file / 1 đoạn mp3. */
export interface Mp3Info {
  frames: number
  durationMs: number
  sampleRate: number
  bitrateKbps: number
  /** 4 byte header của khung đầu tiên (dùng làm khuôn tạo khung im lặng) */
  firstHeader: Buffer
  /** số byte không phải khung mp3 hợp lệ (rác / bị cắt cụt) */
  junkBytes: number
}

// Bảng bitrate (kbps) cho Layer III theo chỉ số 4 bit trong header
const BITRATE_MPEG1_L3 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320]
const BITRATE_MPEG2_L3 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
// Tần số lấy mẫu theo phiên bản: MPEG-1, MPEG-2, MPEG-2.5
const SAMPLE_RATES: Record<'1' | '2' | '2.5', number[]> = {
  '1': [44100, 48000, 32000],
  '2': [22050, 24000, 16000],
  '2.5': [11025, 12000, 8000],
}

interface FrameHeader {
  version: '1' | '2' | '2.5'
  bitrateKbps: number
  sampleRate: number
  padding: number
  frameBytes: number
  samplesPerFrame: number
}

/** Giải mã 4 byte header tại vị trí offset. Không phải header Layer III hợp lệ -> null. */
function parseFrameHeader(buffer: Buffer, offset: number): FrameHeader | null {
  if (offset + 4 > buffer.length) return null
  const b1 = buffer[offset + 1]
  const b2 = buffer[offset + 2]
  if (buffer[offset] !== 0xff || (b1 & 0xe0) !== 0xe0) return null // không có dấu đồng bộ
  const versionBits = (b1 >> 3) & 0x03 // 00 = 2.5, 10 = 2, 11 = 1
  const layerBits = (b1 >> 1) & 0x03 // 01 = Layer III
  if (versionBits === 0x01 || layerBits !== 0x01) return null
  const version = versionBits === 0x03 ? '1' : versionBits === 0x02 ? '2' : '2.5'
  const bitrateIndex = b2 >> 4
  const sampleRateIndex = (b2 >> 2) & 0x03
  if (bitrateIndex === 0 || bitrateIndex === 15 || sampleRateIndex === 3) return null
  const bitrateKbps = (version === '1' ? BITRATE_MPEG1_L3 : BITRATE_MPEG2_L3)[bitrateIndex]
  const sampleRate = SAMPLE_RATES[version][sampleRateIndex]
  const padding = (b2 >> 1) & 0x01
  const samplesPerFrame = version === '1' ? 1152 : 576
  // công thức chuẩn: số byte/khung = (mẫu/khung ÷ 8) × bitrate ÷ tần số + padding
  const frameBytes = Math.floor(((samplesPerFrame / 8) * bitrateKbps * 1000) / sampleRate) + padding
  return { version, bitrateKbps, sampleRate, padding, frameBytes, samplesPerFrame }
}

/** Bỏ qua thẻ ID3v2 ở đầu file (nếu có) -> trả về vị trí bắt đầu dữ liệu mp3. */
function skipId3Tag(buffer: Buffer): number {
  if (buffer.length < 10 || buffer.toString('latin1', 0, 3) !== 'ID3') return 0
  // kích thước ID3 lưu dạng "synchsafe" (mỗi byte chỉ dùng 7 bit)
  const size = ((buffer[6] & 0x7f) << 21) | ((buffer[7] & 0x7f) << 14) | ((buffer[8] & 0x7f) << 7) | (buffer[9] & 0x7f)
  return 10 + size
}

/** Đi qua toàn bộ các khung của 1 file mp3 -> số khung, thời lượng. File hỏng -> null. */
export function readMp3Info(buffer: Buffer): Mp3Info | null {
  let offset = skipId3Tag(buffer)
  let frames = 0
  let totalMs = 0
  let junkBytes = 0
  let first: FrameHeader | null = null
  let firstHeader: Buffer | null = null
  while (offset + 4 <= buffer.length) {
    const header = parseFrameHeader(buffer, offset)
    if (!header || offset + header.frameBytes > buffer.length) {
      // không phải khung (hoặc khung cuối bị cắt) -> dò tiếp từng byte
      junkBytes++
      offset++
      continue
    }
    if (!first) {
      first = header
      firstHeader = Buffer.from(buffer.subarray(offset, offset + 4))
    }
    frames++
    totalMs += (header.samplesPerFrame / header.sampleRate) * 1000
    offset += header.frameBytes
  }
  junkBytes += buffer.length - offset
  if (!first || !firstHeader || frames === 0) return null
  return {
    frames,
    durationMs: Math.round(totalMs),
    sampleRate: first.sampleRate,
    bitrateKbps: first.bitrateKbps,
    firstHeader,
    junkBytes,
  }
}

/* ============================================================================
 * CẮT KHOẢNG LẶNG THỪA Ở CUỐI
 * Edge TTS để ~0,4–1,3 giây im lặng sau mỗi câu -> bấm loa xong phải chờ mới "xong",
 * và 2 lượt nói trong hội thoại cách nhau quá xa. Ta bỏ bớt các khung im lặng ở CUỐI.
 * An toàn: mỗi khung chỉ "mượn" dữ liệu của khung TRƯỚC nó (bit reservoir), nên bỏ khung
 * ở cuối không làm hỏng khung nào còn lại. (Không cắt ở đầu vì lý do ngược lại.)
 * ========================================================================== */

/** Đọc 2 số trong "side info" của khung mono: số bit dữ liệu âm thanh + "độ lớn" (global_gain). */
function readMonoGranule(buffer: Buffer, offset: number, header: FrameHeader): { dataBits: number; globalGain: number } | null {
  const channelMode = buffer[offset + 3] >> 6
  if (channelMode !== 3) return null // chỉ xử lý mono (Edge TTS luôn mono)
  // bit bắt đầu của part2_3_length và global_gain trong side info (sau 4 byte header)
  const [lengthBit, gainBit] = header.version === '1' ? [18, 39] : [9, 30]
  const readBits = (start: number, count: number) => {
    let value = 0
    for (let i = 0; i < count; i++) {
      const bit = start + i
      value = (value << 1) | ((buffer[offset + 4 + (bit >> 3)] >> (7 - (bit & 7))) & 1)
    }
    return value
  }
  return { dataBits: readBits(lengthBit, 12), globalGain: readBits(gainBit, 8) }
}

/** Ngưỡng "có tiếng": khung nói thật có global_gain ~145–190; khung lặng (nhiễu nền) ~125–141. */
const SPEECH_GAIN_THRESHOLD = 145

/**
 * Bỏ các khung im lặng ở cuối, chừa lại `keepMs` (mặc định 200 ms) cho tự nhiên.
 * File không phải mp3 mono hợp lệ -> trả về nguyên vẹn.
 */
export function trimTrailingSilence(buffer: Buffer, keepMs = 200): Buffer {
  const frames: { offset: number; end: number; loud: boolean; ms: number }[] = []
  let offset = skipId3Tag(buffer)
  while (offset + 4 <= buffer.length) {
    const header = parseFrameHeader(buffer, offset)
    if (!header || offset + header.frameBytes > buffer.length) return buffer // có rác -> không đụng vào
    const granule = readMonoGranule(buffer, offset, header)
    if (!granule) return buffer
    frames.push({
      offset,
      end: offset + header.frameBytes,
      loud: granule.dataBits > 0 && granule.globalGain >= SPEECH_GAIN_THRESHOLD,
      ms: (header.samplesPerFrame / header.sampleRate) * 1000,
    })
    offset += header.frameBytes
  }
  let lastLoud = -1
  frames.forEach((frame, index) => frame.loud && (lastLoud = index))
  if (lastLoud < 0) return buffer // toàn im lặng -> để nguyên cho bước kiểm tra phát hiện
  const keepFrames = Math.ceil(keepMs / frames[0].ms)
  const lastKept = Math.min(frames.length - 1, lastLoud + keepFrames)
  return buffer.subarray(0, frames[lastKept].end)
}

/**
 * Tạo đoạn im lặng dài khoảng `ms` mili-giây, cùng định dạng với header mẫu.
 * Mỗi khung = header (bỏ padding, bỏ CRC) + toàn số 0 -> giải mã ra im lặng.
 */
export function makeSilence(templateHeader: Buffer, ms: number): Buffer {
  const header = Buffer.from(templateHeader)
  header[1] |= 0x01 // bit "protection" = 1 -> không có mã CRC (CRC toàn 0 sẽ sai)
  header[2] &= ~0x02 // bỏ bit padding để mọi khung dài bằng nhau
  const info = parseFrameHeader(Buffer.concat([header, Buffer.alloc(4)]), 0)
  if (!info) throw new Error('Header mp3 mẫu không hợp lệ, không tạo được khoảng lặng')
  const frameMs = (info.samplesPerFrame / info.sampleRate) * 1000
  const frameCount = Math.max(1, Math.round(ms / frameMs))
  const frame = Buffer.alloc(info.frameBytes) // toàn số 0
  header.copy(frame, 0)
  return Buffer.concat(Array.from({ length: frameCount }, () => frame))
}
