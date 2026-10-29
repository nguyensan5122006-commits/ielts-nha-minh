/**
 * audio-clip-keys.ts
 * ----------------------------------------------------------------------------
 * "MÃ SỐ" CHO TỪNG ĐOẠN ÂM THANH — dùng chung cho script tạo audio và trang web.
 *
 * Ý tưởng: mỗi đoạn audio (1 từ, 1 câu, 1 đoạn hội thoại) có 1 "mã" (key) 8 ký tự
 * hex, tính bằng hàm băm FNV-1a từ: giọng đọc + tốc độ + chữ cần đọc.
 *   - Script `npm run tts:v3` tính mã -> tạo file mp3 -> ghi vào public/audio/manifest-v3.json
 *   - Trang web tính lại ĐÚNG mã đó -> tra manifest -> có file thì phát file,
 *     không có thì dùng giọng đọc của trình duyệt (speechSynthesis).
 * Vì 2 bên phải tính ra cùng 1 mã nên mọi hàm tính mã nằm ở file này (không chứa
 * code trình duyệt, chạy được cả trong Node lẫn trong web).
 *
 * Có 2 kiểu mã:
 *   1. Mã CŨ (legacyClipKey)   = băm đúng chữ cần đọc. Giọng "tự động": 1 người nói
 *      = Sonia (Anh-Anh); hội thoại "Anna: …\nTom: …" = mỗi người 1 giọng. Tốc độ thường.
 *      Dùng cho hàm speak(text) cũ: câu bài tập, từ vựng, ví dụ, kịch bản đề thi.
 *      File nằm ở public/audio/<mã>.mp3 (giữ nguyên như bản cũ).
 *   2. Mã v3 (clipKey, segmentKey) = băm "v3|giọng|tốc độ|chữ" -> cùng 1 câu nhưng
 *      khác giọng / khác tốc độ sẽ ra mã khác, không bị ghi đè lẫn nhau.
 *      File nằm ở public/audio/v3/<mã>.mp3.
 * ----------------------------------------------------------------------------
 */
import type { AudioLine, VoiceId } from '../content/content-types'

/* ============================================================================
 * 1. HÀM BĂM + TÁCH LƯỢT NÓI (giữ nguyên từ bản cũ — đừng đổi, file cũ dựa vào đây)
 * ========================================================================== */

/** Băm chuỗi FNV-1a 32-bit -> 8 ký tự hex. Script tạo audio và trang web dùng chung hàm này. */
export function hashAudioText(text: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return hash.toString(16).padStart(8, '0')
}

/** Tách kịch bản "Anna: Hello.\nTom: Hi!" thành từng lượt nói: [{ speaker, text }]. */
export function splitIntoSpeakerTurns(script: string): { speaker: string | null; text: string }[] {
  const turns: { speaker: string | null; text: string }[] = []
  // Nhận diện "Tên:" ở đầu dòng hoặc giữa dòng (VD "Anna: Hi. Tom: Hello.")
  const pattern = /(?:^|\s)([A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)?):\s/g
  const markers = [...script.matchAll(pattern)]
  if (markers.length === 0) return [{ speaker: null, text: script.trim() }]
  if ((markers[0].index ?? 0) > 0) {
    const before = script.slice(0, markers[0].index).trim()
    if (before) turns.push({ speaker: null, text: before })
  }
  markers.forEach((marker, i) => {
    const start = (marker.index ?? 0) + marker[0].length
    const end = i + 1 < markers.length ? markers[i + 1].index : script.length
    const text = script.slice(start, end).trim()
    if (text) turns.push({ speaker: marker[1], text })
  })
  return turns
}

/* ============================================================================
 * 2. BẢNG GIỌNG ĐỌC
 *    Tên giọng là giọng Neural của Microsoft Edge (đã kiểm tra còn dùng được 10/2026).
 * ========================================================================== */

/** VoiceId trong nội dung -> tên giọng Edge TTS. */
export const EDGE_VOICE_BY_ID: Record<VoiceId, string> = {
  'gb-female': 'en-GB-SoniaNeural',
  'gb-male': 'en-GB-RyanNeural',
  'gb-child': 'en-GB-MaisieNeural',
  'au-female': 'en-AU-NatashaNeural',
  // Microsoft đã bỏ en-AU-WilliamNeural; bản "Multilingual" là giọng nam Úc còn lại
  'au-male': 'en-AU-WilliamMultilingualNeural',
  'us-female': 'en-US-JennyNeural',
  'us-male': 'en-US-GuyNeural',
}

/** Mã ngôn ngữ cho giọng trình duyệt khi KHÔNG có file mp3 (dự phòng). */
export const BROWSER_LANG_BY_VOICE: Record<VoiceId, string> = {
  'gb-female': 'en-GB',
  'gb-male': 'en-GB',
  'gb-child': 'en-GB',
  'au-female': 'en-AU',
  'au-male': 'en-AU',
  'us-female': 'en-US',
  'us-male': 'en-US',
}

/** Giọng mặc định của web: nữ Anh-Anh. */
export const DEFAULT_VOICE: VoiceId = 'gb-female'

/** Khu trẻ em: giọng nữ Anh-Anh rõ, ấm (Libby) cho mọi chữ tiếng Anh. */
export const KIDS_ENGLISH_VOICE = 'en-GB-LibbyNeural'
/** Hướng dẫn tiếng Việt (khu trẻ em): giọng nữ Hoài My. */
export const VIETNAMESE_VOICE = 'vi-VN-HoaiMyNeural'

/**
 * Tốc độ đọc (đơn vị % của Edge TTS: "-15%" = chậm hơn 15%).
 * Theo nghiên cứu psych-kids.md luật 30: câu ~0.9×, từ mục tiêu chậm hơn (~0.75×).
 */
export const SPEECH_RATE = {
  normal: '+0%',
  kidsWord: '-15%', // từ vựng trẻ em, nút loa thường
  kidsWordSlow: '-35%', // nút con rùa 🐢
  kidsSentence: '-10%', // câu mẫu, lệnh tô màu, truyện (tiếng Anh)
  kidsVietnamese: '-5%', // hướng dẫn tiếng Việt cho bé
} as const

/* ============================================================================
 * 3. GÁN GIỌNG CHO HỘI THOẠI KHÔNG GHI VOICE
 *    "Woman:", "Mr Brown:", "Anna:" -> đoán nam/nữ; không đoán được thì xen kẽ nữ/nam.
 * ========================================================================== */

const FEMALE_WORDS = new Set(
  ('woman girl lady mrs ms miss mum mom mother grandma grandmother sister aunt daughter wife waitress receptionist ' +
    'anna lan mai linh hoa huong thao trang ngoc nga lucy emma mia sarah kate mary jane lisa sophie amy emily olivia ' +
    'chloe rachel helen jenny julia laura nina susan karen alice grace hannah jessica ella zoe ruby lily rose amelia ' +
    'charlotte isabella victoria claire fiona maria anne carol diana linda nancy sally tina yen thu ha vy chi')
    .split(' '),
)
const MALE_WORDS = new Set(
  ('man boy mr sir dad father grandpa grandfather brother uncle son husband waiter ' +
    'tom john ben jack david daniel peter mark james nam minh huy long tuan paul mike leo max harry oliver george ' +
    'william henry jacob ryan adam andrew michael robert richard steve steven thomas matthew luke ethan noah liam ' +
    'oscar charlie edward simon tony kevin brian nick dan joe sam hung khoa duc bao quang phong')
    .split(' '),
)

/** Đoán giới tính từ tên người nói ("Mr Brown" -> nam, "Woman" -> nữ). Không đoán được -> null. */
export function guessSpeakerGender(speaker: string): 'female' | 'male' | null {
  const words = speaker.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean)
  for (const word of words) {
    if (FEMALE_WORDS.has(word)) return 'female'
    if (MALE_WORDS.has(word)) return 'male'
  }
  return null
}

/** Giọng lần lượt cho người nói thứ 1, 2, 3… cùng giới (ưu tiên Anh-Anh). */
const FEMALE_VOICE_ORDER: VoiceId[] = ['gb-female', 'au-female', 'us-female']
const MALE_VOICE_ORDER: VoiceId[] = ['gb-male', 'au-male', 'us-male']

const FEMALE_VOICE_IDS = new Set<VoiceId>(['gb-female', 'gb-child', 'au-female', 'us-female'])

/**
 * Gán VoiceId cho từng dòng. Dòng đã có `voice` giữ nguyên.
 * Dòng chưa có, làm 2 bước để 2 người nói luôn nghe khác nhau:
 *   1. Đoán nam/nữ theo tên ("Woman", "Mr Brown", "Linh"…). Người không đoán được
 *      nhận giới đang ÍT người hơn (VD "Receptionist" nói với "Linh" -> thành nam).
 *   2. Mỗi người 1 giọng chưa ai dùng, theo thứ tự xuất hiện (ưu tiên Anh-Anh).
 * Dòng không có tên người nói -> giọng mặc định (nữ Anh-Anh).
 */
export function resolveLineVoices(lines: AudioLine[]): { speaker?: string; text: string; voice: VoiceId }[] {
  const voiceBySpeaker = new Map<string, VoiceId>()
  let femaleCount = 0
  let maleCount = 0
  // giọng người viết nội dung đã chọn sẵn: giữ, và tính vào số nam/nữ
  for (const line of lines) {
    if (line.speaker && line.voice && !voiceBySpeaker.has(line.speaker)) {
      voiceBySpeaker.set(line.speaker, line.voice)
      if (FEMALE_VOICE_IDS.has(line.voice)) femaleCount++
      else maleCount++
    }
  }
  // bước 1: giới tính của những người chưa có giọng (theo thứ tự xuất hiện)
  const newSpeakers = [...new Set(lines.filter((l) => l.speaker && !voiceBySpeaker.has(l.speaker)).map((l) => l.speaker as string))]
  const genderBySpeaker = new Map<string, 'female' | 'male' | null>(newSpeakers.map((s) => [s, guessSpeakerGender(s)]))
  for (const gender of genderBySpeaker.values()) {
    if (gender === 'female') femaleCount++
    if (gender === 'male') maleCount++
  }
  for (const speaker of newSpeakers) {
    if (genderBySpeaker.get(speaker)) continue
    const gender = femaleCount <= maleCount ? 'female' : 'male'
    genderBySpeaker.set(speaker, gender)
    if (gender === 'female') femaleCount++
    else maleCount++
  }
  // bước 2: mỗi người 1 giọng chưa dùng
  for (const speaker of newSpeakers) {
    const order = genderBySpeaker.get(speaker) === 'female' ? FEMALE_VOICE_ORDER : MALE_VOICE_ORDER
    const used = new Set(voiceBySpeaker.values())
    const voice = order.find((candidate) => !used.has(candidate)) ?? order[0]
    voiceBySpeaker.set(speaker, voice)
  }
  return lines.map((line) => ({
    speaker: line.speaker,
    text: line.text,
    voice: line.voice ?? (line.speaker ? (voiceBySpeaker.get(line.speaker) ?? DEFAULT_VOICE) : DEFAULT_VOICE),
  }))
}

/** Kịch bản kiểu cũ ("Anna: …\nTom: …") -> các dòng AudioLine đã gán giọng (dùng cho mã cũ). */
export function scriptToVoicedLines(script: string): { speaker?: string; text: string; voice: VoiceId }[] {
  const turns = splitIntoSpeakerTurns(script)
  return resolveLineVoices(turns.map((turn) => ({ speaker: turn.speaker ?? undefined, text: turn.text })))
}

/* ============================================================================
 * 4. CÁC HÀM TÍNH MÃ (KEY)
 * ========================================================================== */

/** Mã CŨ: băm nguyên văn câu (giọng tự động, tốc độ thường). File: /audio/<mã>.mp3 */
export function legacyClipKey(text: string): string {
  return hashAudioText(text)
}

/** Mã v3 cho 1 câu, 1 giọng, 1 tốc độ. edgeVoice = tên giọng Edge (VD "en-GB-LibbyNeural"). */
export function clipKey(text: string, edgeVoice: string, rate: string = SPEECH_RATE.normal): string {
  return hashAudioText(`v3|${edgeVoice}|${rate}|${text.trim()}`)
}

/** Mã v3 cho 1 dòng AudioLine (đọc riêng 1 dòng, tốc độ thường). */
export function audioLineKey(line: AudioLine): string {
  return clipKey(line.text, EDGE_VOICE_BY_ID[line.voice ?? DEFAULT_VOICE])
}

/** Mã v3 cho 1 đoạn nghe (nhiều dòng, có thể nhiều giọng) -> 1 file mp3 đã ghép sẵn. */
export function segmentKey(lines: AudioLine[]): string {
  const voiced = resolveLineVoices(lines)
  return hashAudioText('v3-seg|' + voiced.map((line) => `${EDGE_VOICE_BY_ID[line.voice]}>${line.text.trim()}`).join('\n'))
}

/** Mã cho từ vựng khu trẻ em (giọng Libby; slow = nút rùa 🐢). */
export function kidsWordKey(word: string, slow = false): string {
  return clipKey(word, KIDS_ENGLISH_VOICE, slow ? SPEECH_RATE.kidsWordSlow : SPEECH_RATE.kidsWord)
}

/** Mã cho câu tiếng Anh khu trẻ em (câu mẫu, lệnh tô màu, lời kể truyện). */
export function kidsSentenceKey(sentence: string): string {
  return clipKey(sentence, KIDS_ENGLISH_VOICE, SPEECH_RATE.kidsSentence)
}

/** Mã cho 1 câu hướng dẫn (voice line) của bé theo ngôn ngữ. */
export function voiceLineKey(text: string, lang: 'vi' | 'en'): string {
  return lang === 'vi' ? clipKey(text, VIETNAMESE_VOICE, SPEECH_RATE.kidsVietnamese) : kidsSentenceKey(text)
}

/**
 * Câu lệnh trò "Nghe lệnh tô màu". Trò chơi PHẢI dùng hàm này để tạo câu,
 * vì script tạo audio cũng dùng đúng hàm này -> chữ khớp -> có file mp3.
 * VD kidsColourCommand('cat', 'red') -> "Colour the cat red."
 */
export function kidsColourCommand(thing: string, colour: string): string {
  return `Colour the ${thing} ${colour}.`
}

/* ============================================================================
 * 5. KIỂU DỮ LIỆU CỦA public/audio/manifest-v3.json
 * ========================================================================== */

/** Loại đoạn audio (để thống kê / gỡ lỗi). */
export type AudioClipKind =
  | 'lesson-audio' // audioText của bài nghe-chọn / nghe-gõ
  | 'lesson-sentence' // câu đọc to (speak-sentence)
  | 'word' // từ vựng người lớn
  | 'example' // câu ví dụ (từ vựng, thẻ dạy)
  | 'exam-script' // kịch bản nghe trong đề thi
  | 'placement-line' // câu nghe bài xếp lớp có giọng riêng
  | 'listening-segment' // 1 đoạn trong bài nghe v3 (ghép nhiều giọng)
  | 'kids-word' // từ trẻ em (chậm 15%)
  | 'kids-word-slow' // từ trẻ em, nút rùa (chậm 35%)
  | 'kids-word-meaning' // nghĩa tiếng Việt của từ trẻ em ("con mèo")
  | 'kids-letter' // chữ cái A–Z (trò Xếp chữ), có cả bản thường và bản chậm
  | 'kids-sentence' // câu mẫu trẻ em
  | 'kids-colour-command' // "Colour the cat red."
  | 'kids-story' // lời kể / câu hỏi truyện phiêu lưu
  | 'kids-voice-line' // hướng dẫn, tên chủ đề… (tiếng Việt hoặc tiếng Anh)

export interface AudioManifestEntry {
  /** đường dẫn file tính từ /audio/, VD "v3/1a2b3c4d.mp3" hoặc "1a2b3c4d.mp3" */
  file: string
  kind: AudioClipKind
  /** tên giọng Edge; nhiều giọng thì nối bằng "+" */
  voice: string
  rate: string
  durationMs: number
  bytes: number
}

export interface AudioManifestV3 {
  version: 3
  generatedAt: string
  format: string
  /** mã -> file + thông tin */
  entries: Record<string, AudioManifestEntry>
  /** id câu hướng dẫn trẻ em -> mã theo ngôn ngữ (dùng cho playVoiceLine(id, lang)) */
  voiceLines: Record<string, { vi?: string; en?: string }>
}
