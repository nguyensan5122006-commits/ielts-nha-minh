/**
 * generate-audio-v3.ts
 * ----------------------------------------------------------------------------
 * TẠO TOÀN BỘ FILE MP3 GIỌNG ĐỌC AI CHO WEB (bản v3). Chạy trên máy, rồi deploy.
 *
 *   npm run tts:v3                 tạo các file còn thiếu (file đã có thì bỏ qua)
 *   npm run tts:v3 -- --dry-run    chỉ đếm: cần bao nhiêu file, ước tính dung lượng
 *   npm run tts:v3 -- --only word,example   chỉ tạo vài loại (tên loại: AudioClipKind trong audio-clip-keys.ts)
 *   npm run tts:v3 -- --limit 50   tạo tối đa 50 file (thử nhanh)
 *   npm run tts:v3 -- --prune      xoá file trong public/audio/v3 không còn dùng
 *   npm run tts:v3 -- --with-fun-topics   gom thêm thẻ "Học vui" (mặc định không)
 *
 * Các bước:
 *   1. Gom mọi đoạn chữ cần đọc (scripts/audio-v3/collect-audio-jobs.ts).
 *   2. Đọc từng đoạn bằng giọng Edge TTS (4 việc song song, lỗi thì thử lại).
 *      Cắt khoảng lặng thừa ở cuối mỗi câu (chừa 200 ms).
 *      Đoạn nhiều mảnh (hội thoại) -> nối các mảnh, chèn 350 ms im lặng giữa 2 lượt nói.
 *   3. Kiểm tra từng file (không rỗng, ≥ 1 KB, đọc được khung mp3, có thời lượng).
 *   4. Ghi public/audio/manifest-v3.json (mã -> file + thời lượng) và
 *      public/audio/manifest.json (danh sách mã cũ, cho hàm speak() cũ).
 * Kết quả in ra cuối: số file, dung lượng, các đoạn bị lỗi (bỏ qua, chạy lại để thử lại).
 * Hướng dẫn đầy đủ: docs/redesign-v3/06-AUDIO.md
 * ----------------------------------------------------------------------------
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { collectAudioJobs, type AudioJob } from './audio-v3/collect-audio-jobs'
import { AUDIO_FORMAT, splitLongText, synthesize } from './audio-v3/edge-tts-synth'
import { makeSilence, readMp3Info, trimTrailingSilence } from './audio-v3/mp3-frames'
import type { AudioClipKind, AudioManifestEntry, AudioManifestV3 } from '../src/services/audio-clip-keys'

const PROJECT_ROOT = process.cwd()
const AUDIO_DIR = join(PROJECT_ROOT, 'public', 'audio')
const GAP_BETWEEN_TURNS_MS = 350 // khoảng lặng tự nhiên giữa 2 người nói
const MIN_FILE_BYTES = 1024 // file nhỏ hơn 1 KB coi như hỏng
const SIZE_WARNING_MB = 250

/* ---------------- đọc tham số dòng lệnh ---------------- */
const args = process.argv.slice(2)
const argValue = (name: string) => {
  const index = args.indexOf(name)
  return index >= 0 ? args[index + 1] : undefined
}
const DRY_RUN = args.includes('--dry-run')
const PRUNE = args.includes('--prune')
const WITH_FUN_TOPICS = args.includes('--with-fun-topics')
const LIMIT = Number(argValue('--limit') ?? Infinity)
const CONCURRENCY = Number(argValue('--concurrency') ?? 4)
const ONLY_KINDS = argValue('--only')?.split(',').map((kind) => kind.trim()) ?? null

const formatMb = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
const formatSeconds = (ms: number) => `${(ms / 1000).toFixed(1)}s`

/** Ước tính thời lượng 1 việc (chưa tạo) để dự báo dung lượng: ~15 ký tự/giây + 0,7 giây đệm. */
function estimateDurationMs(job: AudioJob): number {
  return job.pieces.reduce((total, piece) => {
    const slowdown = 1 + Math.max(0, -parseInt(piece.rate, 10) || 0) / 100
    return total + (700 + (piece.text.length / 15) * 1000) * slowdown
  }, 0) + GAP_BETWEEN_TURNS_MS * Math.max(0, job.pieces.length - 1)
}

/* ---------------- tạo 1 file ---------------- */
async function renderJob(job: AudioJob): Promise<{ bytes: number; durationMs: number }> {
  const parts: Buffer[] = []
  let silence: Buffer | null = null
  for (const [index, piece] of job.pieces.entries()) {
    // câu rất dài -> chia nhỏ theo câu rồi nối lại
    for (const chunk of splitLongText(piece.text)) {
      // Edge để ~0,4–1,3 giây lặng ở cuối mỗi câu -> cắt bớt, chừa 200 ms (bấm loa xong là "xong" ngay,
      // 2 lượt nói trong hội thoại không cách nhau quá xa)
      const audio = trimTrailingSilence(await synthesize(chunk, piece.voice, piece.rate))
      const info = readMp3Info(audio)
      if (!info) throw new Error(`dữ liệu trả về không phải mp3 (${piece.voice})`)
      if (!silence) silence = makeSilence(info.firstHeader, GAP_BETWEEN_TURNS_MS)
      parts.push(audio)
    }
    if (index < job.pieces.length - 1 && silence) parts.push(silence)
  }
  const output = Buffer.concat(parts)
  const info = readMp3Info(output)
  if (!info || output.length < MIN_FILE_BYTES) throw new Error(`file tạo ra quá nhỏ / hỏng (${output.length} byte)`)
  const target = join(AUDIO_DIR, job.file)
  writeFileSync(`${target}.tmp`, output) // ghi file tạm rồi đổi tên -> không bao giờ để lại file dở dang
  renameSync(`${target}.tmp`, target)
  return { bytes: output.length, durationMs: info.durationMs }
}

/* ---------------- chạy nhiều việc song song ---------------- */
async function runPool<T>(items: T[], concurrency: number, worker: (item: T, index: number) => Promise<void>) {
  let next = 0
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

async function main() {
  const startedAt = Date.now()
  mkdirSync(join(AUDIO_DIR, 'v3'), { recursive: true })

  /* 1. gom việc */
  console.log('Đang gom nội dung cần đọc…')
  const collected = await collectAudioJobs(PROJECT_ROOT, { includeFunTopics: WITH_FUN_TOPICS })
  console.log(`Đọc được ${collected.loadedFiles.length} file nội dung.`)
  for (const failed of collected.failedFiles) console.log(`  ⚠ bỏ qua file lỗi: ${failed.file} — ${failed.error}`)
  for (const collision of collected.hashCollisions) console.log(`  ⚠ trùng mã băm (câu sau bị bỏ): ${collision}`)

  const allJobs = collected.jobs
  const isMissing = (job: AudioJob) => {
    const path = join(AUDIO_DIR, job.file)
    return !existsSync(path) || statSync(path).size < MIN_FILE_BYTES
  }

  /* bảng thống kê theo loại */
  const byKind = new Map<AudioClipKind, { total: number; missing: number; estimateBytes: number }>()
  for (const job of allJobs) {
    const row = byKind.get(job.kind) ?? { total: 0, missing: 0, estimateBytes: 0 }
    row.total++
    if (isMissing(job)) {
      row.missing++
      row.estimateBytes += (estimateDurationMs(job) / 1000) * 6000 // 48 kbps = 6 000 byte/giây
    }
    byKind.set(job.kind, row)
  }
  console.log('\nLoại                   Tổng   Thiếu   Ước tính thêm')
  for (const [kind, row] of byKind) {
    console.log(`  ${kind.padEnd(21)} ${String(row.total).padStart(5)} ${String(row.missing).padStart(7)}   ${formatMb(row.estimateBytes)}`)
  }
  const existingBytes = sumFolderBytes(AUDIO_DIR)
  const estimateNew = [...byKind.values()].reduce((sum, row) => sum + row.estimateBytes, 0)
  console.log(`Thư mục public/audio hiện có ${formatMb(existingBytes)}; ước tính thêm ${formatMb(estimateNew)}.`)
  if (existingBytes + estimateNew > SIZE_WARNING_MB * 1024 * 1024) {
    console.log(`⚠ Tổng có thể vượt ${SIZE_WARNING_MB} MB. Định dạng đang dùng (${AUDIO_FORMAT}) đã là mức nhỏ nhất của Edge TTS — cân nhắc --only để bớt loại.`)
  }
  if (DRY_RUN) return // chỉ đếm, không tạo / không ghi gì

  /* 2. tạo file còn thiếu */
  const todo = allJobs.filter((job) => isMissing(job) && (!ONLY_KINDS || ONLY_KINDS.includes(job.kind))).slice(0, LIMIT)
  console.log(`\nCần tạo ${todo.length} file (song song ${CONCURRENCY}).`)
  const failures: { job: AudioJob; error: string }[] = []
  let done = 0
  let createdBytes = 0
  await runPool(todo, CONCURRENCY, async (job) => {
    try {
      const result = await renderJob(job)
      createdBytes += result.bytes
      done++
      console.log(`[${String(done + failures.length).padStart(5)}/${todo.length}] ✓ ${job.kind.padEnd(19)} ${formatSeconds(result.durationMs).padStart(6)}  ${job.label}`)
    } catch (error) {
      failures.push({ job, error: (error as Error).message })
      console.log(`[${String(done + failures.length).padStart(5)}/${todo.length}] ✗ ${job.kind.padEnd(19)} lỗi: ${(error as Error).message} — ${job.label}`)
    }
  })

  /* 3 + 4. kiểm tra + ghi manifest */
  const { badFiles } = writeManifests(collected)

  /* dọn file v3 không còn dùng */
  const usedV3 = new Set([...collected.fileByKey.values()].map((entry) => entry.file).filter((file) => file.startsWith('v3/')))
  const orphans = readdirSync(join(AUDIO_DIR, 'v3')).filter((name) => name.endsWith('.mp3') && !usedV3.has(`v3/${name}`))
  if (orphans.length) {
    if (PRUNE) {
      orphans.forEach((name) => unlinkSync(join(AUDIO_DIR, 'v3', name)))
      console.log(`Đã xoá ${orphans.length} file v3 không còn dùng.`)
    } else console.log(`Có ${orphans.length} file v3 không còn nội dung nào dùng (chạy --prune để xoá).`)
  }

  console.log('\n================ KẾT QUẢ ================')
  console.log(`Tạo mới: ${done} file (${formatMb(createdBytes)}) trong ${formatSeconds(Date.now() - startedAt)}.`)
  console.log(`Thư mục public/audio: ${formatMb(sumFolderBytes(AUDIO_DIR))}.`)
  if (failures.length) {
    console.log(`Lỗi ${failures.length} đoạn (đã bỏ qua — chạy lại lệnh để thử lại):`)
    failures.slice(0, 50).forEach((f) => console.log(`  ✗ [${f.job.kind}] ${f.job.label} — ${f.error}`))
  }
  if (badFiles.length) console.log(`File hỏng đã xoá (chạy lại để tạo lại): ${badFiles.join(', ')}`)
}

/** Tổng dung lượng thư mục (kể cả thư mục con). */
function sumFolderBytes(dir: string): number {
  if (!existsSync(dir)) return 0
  return readdirSync(dir).reduce((sum, name) => {
    const full = join(dir, name)
    const stat = statSync(full)
    return sum + (stat.isDirectory() ? sumFolderBytes(full) : stat.size)
  }, 0)
}

/**
 * Kiểm tra mọi file đang có của nội dung hiện tại + ghi 2 file manifest.
 * File hỏng (< 1 KB, không đọc được khung mp3) -> xoá để lần sau tạo lại.
 */
function writeManifests(collected: Awaited<ReturnType<typeof collectAudioJobs>>): { badFiles: string[] } {
  const jobByFile = new Map(collected.jobs.map((job) => [job.file, job]))
  const infoByFile = new Map<string, { bytes: number; durationMs: number } | null>()
  const badFiles: string[] = []
  const fileInfo = (file: string) => {
    if (infoByFile.has(file)) return infoByFile.get(file) ?? null
    const path = join(AUDIO_DIR, file)
    let info: { bytes: number; durationMs: number } | null = null
    if (existsSync(path)) {
      const buffer = readFileSync(path)
      const mp3 = readMp3Info(buffer)
      if (buffer.length >= MIN_FILE_BYTES && mp3 && mp3.durationMs > 100) info = { bytes: buffer.length, durationMs: mp3.durationMs }
      else {
        unlinkSync(path)
        badFiles.push(file)
      }
    }
    infoByFile.set(file, info)
    return info
  }

  const entries: Record<string, AudioManifestEntry> = {}
  for (const [key, { file, kind }] of collected.fileByKey) {
    const info = fileInfo(file)
    if (!info) continue
    const pieces = jobByFile.get(file)?.pieces ?? []
    entries[key] = {
      file,
      kind,
      voice: [...new Set(pieces.map((piece) => piece.voice))].join('+'),
      rate: pieces[0]?.rate ?? '+0%',
      durationMs: info.durationMs,
      bytes: info.bytes,
    }
  }
  const manifest: AudioManifestV3 = { version: 3, generatedAt: new Date().toISOString(), format: AUDIO_FORMAT, entries }
  // mỗi mục 1 dòng: vừa gọn vừa dễ đọc / so sánh
  const entryLines = Object.entries(manifest.entries).map(([key, entry]) => `    ${JSON.stringify(key)}: ${JSON.stringify(entry)}`)
  const json =
    `{\n  "version": 3,\n  "generatedAt": ${JSON.stringify(manifest.generatedAt)},\n  "format": ${JSON.stringify(manifest.format)},\n` +
    `  "entries": {\n${entryLines.join(',\n')}\n  }\n}\n`
  writeFileSync(join(AUDIO_DIR, 'manifest-v3.json'), json)

  // manifest cũ: mọi file <mã>.mp3 ở thư mục gốc (giống script cũ) -> speak() cũ dùng
  const legacyIds = readdirSync(AUDIO_DIR)
    .filter((name) => name.endsWith('.mp3'))
    .map((name) => name.replace('.mp3', ''))
  writeFileSync(join(AUDIO_DIR, 'manifest.json'), JSON.stringify(legacyIds))

  const totalKeys = collected.fileByKey.size
  console.log(`Manifest v3: ${Object.keys(entries).length}/${totalKeys} mã đã có file.`)
  return { badFiles }
}

main().catch((error) => {
  console.error('Lỗi không mong muốn:', error)
  process.exit(1)
})
