/**
 * collect-audio-jobs.ts
 * ----------------------------------------------------------------------------
 * GOM MỌI ĐOẠN CHỮ CẦN CÓ AUDIO -> danh sách "việc cần đọc" (AudioJob).
 *
 * Cách gom (chịu lỗi tốt, vì các nhóm nội dung đang viết file song song):
 *   1. Tìm mọi file .ts trong src/content/ (trừ fun-topics) + file chữ của khu trẻ em
 *      (src/features/kids-zone/**: *-text.ts, *voice*.ts, *lines*.ts, *instruction*.ts).
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
 *      Khu trẻ em (file nằm trong thư mục kids):
 *        - KidsWord        -> từ (chậm 15%) + từ chậm (35%) + câu ví dụ + nghĩa tiếng Việt
 *        - chữ cái A–Z (trò Xếp chữ), 2 tốc độ như từ
 *        - mẫu câu (sentence + wordIds), truyện (narrationEn/Vi, promptEn/Vi, options)
 *        - MỌI cặp chữ { vi, en } (tên chủ đề, tên trang phục, câu hướng dẫn…)
 *          -> tiếng Việt giọng Hoài My, tiếng Anh giọng Libby
 *        - lệnh tô màu: nếu có danh sách export tên chứa "colourCommand"/"colorCommand"
 *          (VD KIDS_COLOUR_COMMANDS, mỗi lệnh có commandEn / commandVi) thì dùng;
 *          không có thì tự tạo "Colour the <đồ vật> <màu>." cho mọi cặp
 *          (từ có nhãn 'colorable') × (từ có nhãn 'color').
 *        - chữ có {mascot} -> thay bằng tên mascot (src/design-system/mascot-name.ts)
 *          TRƯỚC khi tạo audio, giống hệt giao diện làm (fillMascotName).
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
  KIDS_ENGLISH_VOICE,
  SPEECH_RATE,
  VIETNAMESE_VOICE,
  clipKey,
  kidsColourCommand,
  kidsSentenceKey,
  kidsWordKey,
  legacyClipKey,
  resolveLineVoices,
  scriptToVoicedLines,
  segmentKey,
  splitIntoSpeakerTurns,
  voiceLineKey,
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
  voiceLines: Record<string, { vi?: string; en?: string }>
  loadedFiles: string[]
  failedFiles: { file: string; error: string }[]
  /** 2 câu khác nhau ra cùng mã (rất hiếm) — câu sau bị bỏ, cần báo */
  hashCollisions: string[]
  colourCommandSource: 'explicit-list' | 'template' | 'none'
  /** tên mascot đã dùng để thay {mascot} (null = không tìm thấy -> câu có {mascot} bị bỏ) */
  mascotName: string | null
}

const VOICE_IDS = new Set(Object.keys(EDGE_VOICE_BY_ID))
const KIDS_LEVELS = new Set(['starters', 'movers', 'flyers'])

const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null
/** Chuỗi có chỗ điền động ("{count}", "${name}") -> không tạo sẵn audio được */
const hasPlaceholder = (text: string) => /[{}]|\$\{/.test(text)

/** Tên mascot thật (đọc từ src/design-system/mascot-name.ts). Chưa có file -> null (bỏ qua câu có {mascot}). */
let mascotName: string | null = null
/** Thay {mascot} bằng tên thật — PHẢI giống fillMascotName() của giao diện để chữ (và mã) khớp nhau. */
const fillMascot = (text: string) => (mascotName ? text.split('{mascot}').join(mascotName) : text)

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

/** Danh sách file cần đọc nội dung, theo thứ tự: file tổng hợp trước, file lẻ sau. */
export function findContentFiles(projectRoot: string, includeFunTopics: boolean): string[] {
  const contentDir = join(projectRoot, 'src', 'content')
  const contentFiles = listFilesRecursive(contentDir).filter((file) => {
    const rel = relative(contentDir, file).replace(/\\/g, '/')
    if (!rel.endsWith('.ts') || rel.endsWith('.d.ts')) return false
    if (rel === 'content-types.ts') return false // chỉ có kiểu dữ liệu
    if (!includeFunTopics && (rel.startsWith('fun-topics/') || rel === 'all-fun-topics.ts')) return false
    return true
  })
  const kidsZoneFiles = listFilesRecursive(join(projectRoot, 'src', 'features', 'kids-zone')).filter((file) =>
    /(-text|voice|lines|instruction)[^/\\]*\.ts$/i.test(file),
  )
  return [...contentFiles, ...kidsZoneFiles]
}

/** File thuộc khu trẻ em? (quyết định giọng + tốc độ) */
const isKidsFile = (file: string) => /[\\/](kids|kids-zone)[\\/]/.test(file)

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
  voiceLines: Record<string, { vi?: string; en?: string }> = {}

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

  /** Từ trẻ em: 2 bản (thường -15%, chậm -35%). Chữ cái A–Z cũng đi qua đây (kind 'kids-letter'). */
  kidsWord(word: string, kind: AudioClipKind = 'kids-word') {
    if (!isText(word)) return
    const text = word.trim()
    this.add({ key: kidsWordKey(text), kind, pieces: [{ voice: KIDS_ENGLISH_VOICE, rate: SPEECH_RATE.kidsWord, text }], legacy: false })
    this.add({
      key: kidsWordKey(text, true),
      kind: kind === 'kids-word' ? 'kids-word-slow' : kind,
      pieces: [{ voice: KIDS_ENGLISH_VOICE, rate: SPEECH_RATE.kidsWordSlow, text }],
      legacy: false,
    })
  }

  kidsSentence(sentence: string, kind: AudioClipKind) {
    if (!isText(sentence)) return
    const text = fillMascot(sentence).trim()
    if (hasPlaceholder(text)) return
    this.add({ key: kidsSentenceKey(text), kind, pieces: [{ voice: KIDS_ENGLISH_VOICE, rate: SPEECH_RATE.kidsSentence, text }], legacy: false })
  }

  /** Câu hướng dẫn của bé (có id để playVoiceLine(id, lang) tra được). */
  voiceLine(id: string, lang: 'vi' | 'en', text: string, kind: AudioClipKind = 'kids-voice-line') {
    if (!isText(text)) return
    const clean = fillMascot(text).trim()
    if (hasPlaceholder(clean)) return
    const voice = lang === 'vi' ? VIETNAMESE_VOICE : KIDS_ENGLISH_VOICE
    const rate = lang === 'vi' ? SPEECH_RATE.kidsVietnamese : SPEECH_RATE.kidsSentence
    const key = voiceLineKey(clean, lang)
    this.add({ key, kind, pieces: [{ voice, rate, text: clean }], legacy: false })
    if (id) this.voiceLines[id] = { ...this.voiceLines[id], [lang]: key }
  }
}

/* ============================================================================
 * 3. ĐI QUA DỮ LIỆU, NHẬN DẠNG THEO HÌNH DẠNG
 * ========================================================================== */

interface KidsWordSeen {
  word: string
  tags: string[]
}

class ContentWalker {
  private seen = new WeakSet<object>()
  kidsWords: KidsWordSeen[] = []
  explicitColourCommands = 0

  constructor(private book: JobBook) {}

  /** Đi qua 1 giá trị export. path = vị trí (dùng làm id câu hướng dẫn). */
  walk(value: unknown, kids: boolean, path: string[], parentKey: string | null, inColourList = false) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // danh sách lệnh tô màu dạng mảng chữ: ['Colour the cat red.', …]
        if (inColourList && isText(item)) {
          this.book.kidsSentence(item, 'kids-colour-command')
          this.explicitColourCommands++
        }
        const itemPath = isObject(item) && isText(item.id) ? [item.id] : [...path, String(index)]
        this.walk(item, kids, itemPath, parentKey, inColourList)
      })
      return
    }
    if (!isObject(value) || typeof value === 'function' || this.seen.has(value)) return
    this.seen.add(value)
    const nodePath = isText(value.id) ? [value.id] : path
    if (kids) this.visitKidsNode(value, nodePath, parentKey, inColourList)
    else this.visitAdultNode(value)
    // đi xuống các trường con; "danh sách lệnh tô màu" chỉ áp dụng cho phần tử cấp 1
    // (mảng con như sceneWordIds chứa id từ, không phải câu lệnh)
    for (const [key, child] of Object.entries(value)) {
      if (isObject(child)) this.walk(child, kids, [...nodePath, key], key, false)
    }
  }

  /** Nội dung người lớn / teen: bài học, đề thi, bài xếp lớp. */
  private visitAdultNode(node: Record<string, unknown>) {
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

  /** Nội dung khu trẻ em. */
  private visitKidsNode(node: Record<string, unknown>, path: string[], parentKey: string | null, inColourList: boolean) {
    const book = this.book
    const id = path.join('.')
    // từ vựng trẻ em
    if (isText(node.word) && isText(node.meaningVi) && typeof node.level === 'string' && KIDS_LEVELS.has(node.level)) {
      book.kidsWord(node.word)
      const tags = Array.isArray(node.tags) ? node.tags.filter(isText) : []
      this.kidsWords.push({ word: node.word.trim(), tags })
      if (isObject(node.example) && isText(node.example.en)) book.kidsSentence(node.example.en, 'kids-sentence')
      // nghĩa tiếng Việt (đọc khi bé trả lời đúng / gợi ý bậc 2) — id "<id từ>.meaning"
      book.voiceLine(`${id}.meaning`, 'vi', node.meaningVi, 'kids-word-meaning')
    }
    // mẫu câu (trò Ghép câu)
    if (isText(node.sentence) && Array.isArray(node.wordIds)) book.kidsSentence(node.sentence, 'kids-sentence')
    // truyện phiêu lưu
    if (isText(node.narrationEn)) book.kidsSentence(node.narrationEn, 'kids-story')
    if (isText(node.narrationVi)) book.voiceLine(`${id}.narration`, 'vi', node.narrationVi, 'kids-story')
    if (isText(node.narrationEn)) book.voiceLine(`${id}.narration`, 'en', node.narrationEn, 'kids-story')
    if (isText(node.promptEn)) {
      book.kidsSentence(node.promptEn, 'kids-story')
      book.voiceLine(`${id}.prompt`, 'en', node.promptEn, 'kids-story')
      if (Array.isArray(node.options)) node.options.filter(isText).forEach((option) => book.kidsWord(option))
    }
    if (isText(node.promptVi)) book.voiceLine(`${id}.prompt`, 'vi', node.promptVi, 'kids-story')
    // lệnh tô màu trong danh sách riêng (object có commandEn / command / text / en)
    if (inColourList) {
      const command = [node.commandEn, node.command, node.text, node.en].find(isText)
      if (command) {
        book.kidsSentence(command, 'kids-colour-command')
        book.voiceLine(`${id}.command`, 'en', command, 'kids-colour-command')
        this.explicitColourCommands++
      }
      if (isText(node.commandVi)) book.voiceLine(`${id}.command`, 'vi', node.commandVi, 'kids-colour-command')
    }
    // mọi cặp chữ { vi, en } / { textVi, textEn } -> câu hướng dẫn (trừ câu ví dụ của từ)
    if (parentKey !== 'example') {
      const vi = [node.vi, node.textVi].find(isText)
      const en = [node.en, node.textEn].find(isText)
      if (vi) book.voiceLine(id, 'vi', vi)
      if (en) book.voiceLine(id, 'en', en)
    }
  }
}

/* ============================================================================
 * 4. HÀM CHÍNH
 * ========================================================================== */

export async function collectAudioJobs(projectRoot: string, options: { includeFunTopics?: boolean } = {}): Promise<CollectResult> {
  // tên mascot dùng để thay {mascot} (file của nhóm design-system)
  const mascotFile = join(projectRoot, 'src', 'design-system', 'mascot-name.ts')
  mascotName = null
  rmSync(join(projectRoot, 'node_modules', '.cache', 'audio-v3-modules'), { recursive: true, force: true }) // dọn file tạm lần trước
  if (existsSync(mascotFile)) {
    try {
      const value = (await loadModule(mascotFile, projectRoot)).MASCOT_NAME
      mascotName = isText(value) ? value : null
    } catch {
      mascotName = null
    }
  }
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
    const kids = isKidsFile(file)
    for (const [exportName, value] of Object.entries(exports)) {
      const isColourList = kids && /colou?r.?command/i.test(exportName)
      walker.walk(value, kids, [exportName], null, isColourList)
    }
  }

  // chữ cái A–Z cho trò Xếp chữ (mỗi chữ cái "kêu" tên của nó: A = "ay", B = "bee"…)
  if (walker.kidsWords.length > 0) {
    for (const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') book.kidsWord(letter, 'kids-letter')
  }

  // lệnh tô màu: không có danh sách riêng -> tự tạo từ (đồ vật tô được) × (màu)
  let colourCommandSource: CollectResult['colourCommandSource'] = 'none'
  if (walker.explicitColourCommands > 0) colourCommandSource = 'explicit-list'
  else {
    const unique = (words: KidsWordSeen[]) => [...new Set(words.map((w) => w.word))]
    const colours = unique(walker.kidsWords.filter((w) => w.tags.includes('color')))
    const things = unique(walker.kidsWords.filter((w) => w.tags.includes('colorable')))
    for (const thing of things) for (const colour of colours) book.kidsSentence(kidsColourCommand(thing, colour), 'kids-colour-command')
    if (colours.length && things.length) colourCommandSource = 'template'
  }

  const { jobs, fileByKey, hashCollisions } = book.finish()
  return { jobs, fileByKey, voiceLines: book.voiceLines, loadedFiles, failedFiles, hashCollisions, colourCommandSource, mascotName }
}
