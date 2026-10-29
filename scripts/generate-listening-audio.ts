/**
 * generate-listening-audio.ts
 * ----------------------------------------------------------------------------
 * TẠO FILE MP3 GIỌNG ĐỌC AI CHO BÀI NGHE (chạy 1 lần trên máy, rồi deploy).
 *   npm run tts          -> chỉ các bài nghe (audioText, kịch bản đề thi)
 *   npm run tts -- --all -> thêm cả câu ví dụ, từ vựng, câu đọc to (lâu hơn nhiều)
 *
 * Dùng giọng Neural của Microsoft Edge (miễn phí, qua thư viện msedge-tts).
 * Hội thoại "Anna: ... / Tom: ..." -> mỗi người 1 giọng khác nhau, ghép thành 1 file.
 * File lưu ở public/audio/<mã băm>.mp3, danh sách ở public/audio/manifest.json.
 * Trang web tự dùng file mp3 nếu có, không có thì dùng giọng trình duyệt.
 * Chạy lại script chỉ tạo các file còn thiếu (câu đã có file sẽ bỏ qua).
 * ----------------------------------------------------------------------------
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
import { allLessons } from '../src/content/lesson-registry'
import { ALL_EXAMS } from '../src/content/all-exams'
import { PLACEMENT_V3_ITEMS } from '../src/content/exams/index-v3'
import { hashAudioText, splitIntoSpeakerTurns } from '../src/services/text-to-speech'

const OUTPUT_DIR = join(process.cwd(), 'public', 'audio')
const INCLUDE_EVERYTHING = process.argv.includes('--all')

/** Giọng cho từng người nói (theo thứ tự xuất hiện). Ưu tiên giọng Anh-Anh như IELTS. */
const SPEAKER_VOICES = ['en-GB-SoniaNeural', 'en-GB-RyanNeural', 'en-AU-NatashaNeural', 'en-GB-ThomasNeural', 'en-US-JennyNeural', 'en-AU-WilliamNeural']
const SINGLE_VOICE = 'en-GB-SoniaNeural'

/* ---------- 1. gom tất cả câu cần đọc ---------- */
function collectTexts(): Set<string> {
  const texts = new Set<string>()
  for (const lesson of allLessons()) {
    for (const exercise of [...lesson.exercises, ...lesson.miniTest]) {
      if (exercise.type === 'listen-choose' || exercise.type === 'listen-type') texts.add(exercise.audioText)
      if (INCLUDE_EVERYTHING && exercise.type === 'speak-sentence') texts.add(exercise.sentence)
    }
    if (INCLUDE_EVERYTHING) {
      lesson.teachingCards.forEach((card) => card.examples?.forEach((example) => texts.add(example.en)))
      lesson.words?.forEach((word) => {
        texts.add(word.word)
        word.examples.forEach((example) => texts.add(example.en))
      })
    }
  }
  // (v3) listeningTask.segments (mỗi dòng có giọng riêng) do scripts/generate-audio-v3.ts (npm run tts:v3) tạo.
  for (const exam of ALL_EXAMS) {
    for (const section of exam.sections) section.parts?.forEach((part) => part.audioScript && texts.add(part.audioScript))
  }
  // (v3) câu nghe của bài xếp lớp thích ứng (không phải Exam nên phải gom riêng)
  for (const item of PLACEMENT_V3_ITEMS) if (item.kind === 'listen-choose') texts.add(item.audioText)
  return texts
}

/* ---------- 2. đọc 1 đoạn bằng 1 giọng -> Buffer mp3 ---------- */
const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function synthesize(text: string, voice: string): Promise<Buffer> {
  const tts = new MsEdgeTTS()
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
  const { audioStream } = tts.toStream(escapeXml(text))
  const chunks: Buffer[] = []
  await new Promise<void>((resolve, reject) => {
    audioStream.on('data', (chunk: Buffer) => chunks.push(chunk))
    audioStream.on('end', () => resolve())
    audioStream.on('error', reject)
  })
  tts.close()
  return Buffer.concat(chunks)
}

/* ---------- 3. tạo file cho 1 kịch bản (có thể nhiều người nói) ---------- */
async function createAudioFile(script: string, filePath: string) {
  const turns = splitIntoSpeakerTurns(script)
  const speakers: string[] = []
  const pieces: Buffer[] = []
  for (const turn of turns) {
    if (turn.speaker && !speakers.includes(turn.speaker)) speakers.push(turn.speaker)
    const voice = turn.speaker ? SPEAKER_VOICES[speakers.indexOf(turn.speaker) % SPEAKER_VOICES.length] : SINGLE_VOICE
    pieces.push(await synthesize(turn.text, voice))
  }
  writeFileSync(filePath, Buffer.concat(pieces)) // file mp3 cùng định dạng có thể nối thẳng với nhau
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  const texts = [...collectTexts()]
  console.log(`Có ${texts.length} đoạn cần audio${INCLUDE_EVERYTHING ? ' (gồm cả ví dụ)' : ''}.`)

  let created = 0
  for (const [index, text] of texts.entries()) {
    const filePath = join(OUTPUT_DIR, `${hashAudioText(text)}.mp3`)
    if (existsSync(filePath)) continue
    try {
      await createAudioFile(text, filePath)
      created++
      console.log(`[${index + 1}/${texts.length}] ✓ ${text.slice(0, 60).replace(/\n/g, ' ')}`)
    } catch (error) {
      console.log(`[${index + 1}/${texts.length}] ✗ lỗi: ${(error as Error).message}`)
    }
  }

  // ghi danh sách file đang có để trang web biết câu nào có mp3
  const available = readdirSync(OUTPUT_DIR)
    .filter((name) => name.endsWith('.mp3'))
    .map((name) => name.replace('.mp3', ''))
  writeFileSync(join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(available))
  console.log(`Xong: tạo mới ${created} file, tổng ${available.length} file mp3.`)
}

void main()
