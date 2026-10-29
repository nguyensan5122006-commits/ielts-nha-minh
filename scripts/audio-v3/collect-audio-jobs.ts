/**
 * collect-audio-jobs.ts
 * ----------------------------------------------------------------------------
 * GOM MỌI ĐOẠN CHỮ CẦN CÓ AUDIO -> danh sách "việc cần đọc" (AudioJob).
 *
 * Cách gom (chịu lỗi tốt, vì các nhóm nội dung đang viết file song song):
 *   1. Tìm mọi file .ts trong src/content/ (trừ fun-topics, trừ khi bật includeFunTopics).
 *   2. Mỗi file được "đóng gói" riêng bằng esbuild rồi import. File nào đang viết dở
 *      (lỗi cú pháp, lỗi chạy) -> bỏ qua file đó, ghi vào báo cáo, các file khác vẫn chạy.
 *      Nhờ vậy bài mới chưa gắn vào lesson-registry.ts vẫn được gom.
 *   3. Đi qua MỌI giá trị được export, nhận dạng theo "hình dạng" dữ liệu:
 *        - bài tập listen-choose / listen-type  -> audioText        (mã cũ)
 *        - bài tập speak-sentence               -> sentence         (mã cũ)
 *        - từ vựng (có word + ipa + examples)   -> word + ví dụ     (mã cũ)
 *        - thẻ dạy / bất kỳ examples[].en       -> ví dụ            (mã cũ)
 *        - phần đề thi có audioScript           -> kịch bản         (mã cũ)
 *        - câu nghe xếp lớp (kind listen-choose + voice) -> thêm bản đúng giọng
 *        - ListeningTask.segments               -> mỗi đoạn 1 file, ghép nhiều giọng
 *   4. Trùng chữ + trùng giọng + trùng tốc độ -> chỉ 1 file (mã giống nhau).
 * ----------------------------------------------------------------------------
 */
import { build } from 'esbuild'
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs'
import { basename, join, relative } from 'node:path'
import { pathToFileURL } from 'node:url'
import type { AudioLine, VoiceId } from '../../src/content/content-types'
import {
  EDGE_VOICE_BY_ID,
  SPEECH_RATE,
  clipKey,
  legacyClipKey,
  resolveLineVoices,
  scriptToVoicedLines,
  segmentKey,
  splitIntoSpeakerTurns,
  type AudioClipKind,
} from '../../src/services/audio-clip-keys'

/** 1 mảnh cần đọc: chữ + giọng + tốc độ. 1 file mp3 = 1 hoặc nhiều mảnh nối nhau. */
export interface AudioPiece {
  voice: string
  rate: string
  text: string
}

/** 1 file mp3 cần có. */
export interface AudioJob {
  key: string
  /** đường dẫn tính từ public/audio/, VD "v3/1a2b3c4d.mp3" */
  file: string
  kind: AudioClipKind
  pieces: AudioPiece[]
  /** vài chữ đầu để in ra màn hình khi chạy */
  label: string
}

export interface CollectResult {
  jobs: AudioJob[]
  /** mã -> file (nhiều mã có thể dùng chung 1 file nếu nội dung đọc giống hệt) */
  fileByKey: Map<string, { file: string; kind: AudioClipKind }>
  loadedFiles: string[]
  failedFiles: { file: string; error: string }[]
  /** 2 câu khác nhau ra cùng mã (rất hiếm) — câu sau bị bỏ, cần báo */
  hashCollisions: string[]
}

const VOICE_IDS = new Set(Object.keys(EDGE_VOICE_BY_ID))

const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null

/* ============================================================================
 * 1. TÌM FILE NỘI DUNG
 * ========================================================================== */

function listFilesRecursive(dir: string): string[] {
  if (!existsSync(dir)) return []
  const result: string[] = []
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) result.push(...listFilesRecursive(full))
    else result.push(full)
  }
  return result
}

/** Danh sách file cần đọc nội dung. */
export function findContentFiles(projectRoot: string, includeFunTopics: boolean): string[] {
  const contentDir = join(projectRoot, 'src', 'content')
  return listFilesRecursive(contentDir).filter((file) => {
    const rel = relative(contentDir, file).replace(/\\/g, '/')
    if (!rel.endsWith('.ts') || rel.endsWith('.d.ts')) return false
    if (rel === 'content-types.ts') return false // chỉ có kiểu dữ liệu
    if (!includeFunTopics && (rel.startsWith('fun-topics/') || rel === 'all-fun-topics.ts')) return false
    return true
  })
}

let loadCounter = 0

/** Đóng gói 1 file bằng esbuild rồi import -> các giá trị export. Lỗi -> ném lỗi để bên ngoài ghi lại. */
async function loadModule(file: string, projectRoot: string): Promise<Record<string, unknown>> {
  // file tạm nằm trong node_modules/.cache -> lệnh import thư viện (VD 'react') tìm được node_modules
  const outfile = join(projectRoot, 'node_modules', '.cache', 'audio-v3-modules', `${++loadCounter}-${basename(file, '.ts')}.mjs`)
  await build({
    entryPoints: [file],
    bundle: true,
    outfile,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent',
    packages: 'external',
    // file nội dung lỡ import ảnh / css (của giao diện) -> bỏ qua, không cần cho audio
    loader: { '.css': 'empty', '.png': 'empty', '.webp': 'empty', '.svg': 'empty', '.jpg': 'empty', '.glb': 'empty' },
  })
  return (await import(pathToFileURL(outfile).href)) as Record<string, unknown>
}

/* ============================================================================
 * 2. SỔ GHI VIỆC (gom trùng, phát hiện trùng mã)
 * ========================================================================== */

interface JobRequest {
  key: string
  kind: AudioClipKind
  pieces: AudioPiece[]
  /** true = mã cũ -> file bắt buộc tên "<mã>.mp3" ở thư mục gốc public/audio */
  legacy: boolean
}

class JobBook {
  private requests: JobRequest[] = []

  add(request: JobRequest) {
    if (request.pieces.length === 0 || request.pieces.some((piece) => !isText(piece.text))) return
    this.requests.push(request)
  }

  /** Câu ghép từ nhiều mảnh / 1 mảnh -> chuỗi "chữ ký" để so 2 việc có đọc giống hệt nhau không */
  private static signature(pieces: AudioPiece[]) {
    return JSON.stringify(pieces.map((piece) => [piece.voice, piece.rate, piece.text.trim()]))
  }

  /** Chốt danh sách: mã cũ xếp trước (giữ tên file cũ), bản v3 giống hệt nội dung thì dùng lại file đó. */
  finish(): { jobs: AudioJob[]; fileByKey: CollectResult['fileByKey']; hashCollisions: string[] } {
    const ordered = [...this.requests.filter((r) => r.legacy), ...this.requests.filter((r) => !r.legacy)]
    const signatureByKey = new Map<string, string>()
    const fileBySignature = new Map<string, string>()
    const fileByKey: CollectResult['fileByKey'] = new Map()
    const jobsByFile = new Map<string, AudioJob>()
    const hashCollisions: string[] = []
    for (const request of ordered) {
      const signature = JobBook.signature(request.pieces)
      const knownSignature = signatureByKey.get(request.key)
      if (knownSignature !== undefined) {
        if (knownSignature !== signature) hashCollisions.push(`${request.key}: "${request.pieces[0].text.slice(0, 50)}"`)
        continue // mã đã có
      }
      signatureByKey.set(request.key, signature)
      const reusedFile = fileBySignature.get(signature)
      if (reusedFile && !request.legacy) {
        fileByKey.set(request.key, { file: reusedFile, kind: request.kind })
        continue
      }
      const file = request.legacy ? `${request.key}.mp3` : `v3/${request.key}.mp3`
      if (!fileBySignature.has(signature)) fileBySignature.set(signature, file)
      fileByKey.set(request.key, { file, kind: request.kind })
      const label = request.pieces.map((piece) => piece.text).join(' / ').replace(/\s+/g, ' ').slice(0, 70)
      jobsByFile.set(file, { key: request.key, file, kind: request.kind, pieces: request.pieces, label })
    }
    return { jobs: [...jobsByFile.values()], fileByKey, hashCollisions }
  }

  /* ---------------- các loại việc ---------------- */

  /** Mã cũ: giọng tự động (1 người = Sonia; hội thoại = mỗi người 1 giọng), tốc độ thường. */
  legacyScript(text: string, kind: AudioClipKind) {
    if (!isText(text)) return
    const pieces = scriptToVoicedLines(text).flatMap((line) =>
      isText(line.text) ? [{ voice: EDGE_VOICE_BY_ID[line.voice], rate: SPEECH_RATE.normal, text: line.text }] : [],
    )
    this.add({ key: legacyClipKey(text), kind, pieces, legacy: true })
  }

  /** 1 câu, 1 giọng chỉ định. */
  singleLine(text: string, voiceId: VoiceId, kind: AudioClipKind) {
    if (!isText(text)) return
    const voice = EDGE_VOICE_BY_ID[voiceId]
    this.add({ key: clipKey(text, voice), kind, pieces: [{ voice, rate: SPEECH_RATE.normal, text: text.trim() }], legacy: false })
  }

  /** 1 đoạn nghe v3 (nhiều dòng) -> 1 file ghép. */
  segment(lines: AudioLine[]) {
    const valid = lines.filter((line) => isText(line.text))
    if (valid.length === 0) return
    const pieces = resolveLineVoices(valid).map((line) => ({
      voice: EDGE_VOICE_BY_ID[line.voice],
      rate: SPEECH_RATE.normal,
      text: line.text.trim(),
    }))
    this.add({ key: segmentKey(valid), kind: 'listening-segment', pieces, legacy: false })
  }
}

/* ============================================================================
 * 3. ĐI QUA DỮ LIỆU, NHẬN DẠNG THEO HÌNH DẠNG
 * ========================================================================== */

class ContentWalker {
  private seen = new WeakSet<object>()

  constructor(private book: JobBook) {}

  /** Đi qua 1 giá trị export (mảng, object lồng nhau…). */
  walk(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach((item) => this.walk(item))
      return
    }
    if (!isObject(value) || typeof value === 'function' || this.seen.has(value)) return
    this.seen.add(value)
    this.visitNode(value)
    for (const child of Object.values(value)) if (isObject(child)) this.walk(child)
  }

  /** Nhận dạng 1 object: bài học, đề thi, bài xếp lớp, bài nghe v3. */
  private visitNode(node: Record<string, unknown>) {
    const book = this.book
    // bài tập trong lesson
    if ((node.type === 'listen-choose' || node.type === 'listen-type') && isText(node.audioText)) book.legacyScript(node.audioText, 'lesson-audio')
    if (node.type === 'speak-sentence' && isText(node.sentence)) book.legacyScript(node.sentence, 'lesson-sentence')
    // câu nghe bài xếp lớp v3: có thêm giọng riêng
    if (node.kind === 'listen-choose' && isText(node.audioText)) {
      book.legacyScript(node.audioText, 'lesson-audio')
      const turns = splitIntoSpeakerTurns(node.audioText)
      if (typeof node.voice === 'string' && VOICE_IDS.has(node.voice) && turns.length === 1 && !turns[0].speaker) {
        book.singleLine(node.audioText, node.voice as VoiceId, 'placement-line')
      }
    }
    // phần nghe trong đề thi (kiểu cũ)
    if (isText(node.audioScript)) book.legacyScript(node.audioScript, 'exam-script')
    // bài nghe v3: segments[].lines[]
    if (Array.isArray(node.segments)) {
      for (const segment of node.segments) {
        if (isObject(segment) && Array.isArray(segment.lines)) {
          book.segment(segment.lines.filter((line): line is AudioLine => isObject(line) && isText(line.text)))
        }
      }
    }
    // từ vựng: word + ipa + examples
    if (isText(node.word) && isText(node.ipa) && Array.isArray(node.examples)) book.legacyScript(node.word, 'word')
    // mọi danh sách ví dụ { en, vi } (từ vựng, thẻ dạy)
    if (Array.isArray(node.examples)) {
      for (const example of node.examples) if (isObject(example) && isText(example.en)) book.legacyScript(example.en, 'example')
    }
  }
}

/* ============================================================================
 * 4. HÀM CHÍNH
 * ========================================================================== */

export async function collectAudioJobs(projectRoot: string, options: { includeFunTopics?: boolean } = {}): Promise<CollectResult> {
  rmSync(join(projectRoot, 'node_modules', '.cache', 'audio-v3-modules'), { recursive: true, force: true }) // dọn file tạm lần trước
  const book = new JobBook()
  const walker = new ContentWalker(book)
  const loadedFiles: string[] = []
  const failedFiles: { file: string; error: string }[] = []

  for (const file of findContentFiles(projectRoot, options.includeFunTopics ?? false)) {
    const rel = relative(projectRoot, file).replace(/\\/g, '/')
    let exports: Record<string, unknown>
    try {
      exports = await loadModule(file, projectRoot)
    } catch (error) {
      const message = (error as Error).message.split('\n').slice(0, 3).join(' ').slice(0, 240)
      failedFiles.push({ file: rel, error: message })
      continue
    }
    loadedFiles.push(rel)
    for (const value of Object.values(exports)) walker.walk(value)
  }

  const { jobs, fileByKey, hashCollisions } = book.finish()
  return { jobs, fileByKey, loadedFiles, failedFiles, hashCollisions }
}
