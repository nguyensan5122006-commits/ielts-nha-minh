/**
 * check-word-images.ts — KIỂM TRA TÊN ẢNH MINH HOẠ TRONG NỘI DUNG CÓ TỒN TẠI KHÔNG
 * ----------------------------------------------------------------------------
 * Quét mọi file src/content/**\/*.ts, tìm các giá trị dạng chuỗi:
 *     image: 'red-apple'      (ảnh minh hoạ trong nội dung)
 *     icon: 'airplane'        (Unit — chặng học)
 * rồi so với danh sách ảnh có thật (WORD_IMAGE_SLUGS trong src/content/word-image-catalog.ts,
 * file ảnh ở public/word-images/<slug>.webp).
 *
 * Báo cáo:
 *   - slug KHÔNG tồn tại → đề xuất sửa (từ đồng nghĩa / số nhiều) + gợi ý từ chỉ mục từ khoá
 *     (public/word-images/catalog.json)
 *   - giá trị là ký tự emoji (VD icon: '🐘') → cho biết ảnh 3D tương ứng (nếu có)
 *   - image: '' = cố ý không có ảnh → chỉ đếm, không báo lỗi
 *
 * Chạy (ở thư mục gốc E:\IELTS_ThienThao), giống cách "npm run validate" đóng gói bằng esbuild:
 *   npx esbuild scripts/check-word-images.ts --bundle --platform=node --format=esm --outfile=node_modules/.cache/check-word-images.mjs --log-level=warning
 *   node node_modules/.cache/check-word-images.mjs --md docs/redesign-v3/word-image-report.md
 * (--md <đường dẫn> = ghi thêm báo cáo Markdown. Thoát với mã 1 nếu có slug sai.)
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import {
  findWordImage,
  hasWordImage,
  suggestWordImages,
  WORD_IMAGE_SLUGS,
  type WordImageCatalog,
} from '../src/content/word-image-catalog'

const ROOT = process.cwd()
const CONTENT_DIR = join(ROOT, 'src', 'content')
const SKIP_FILES = new Set(['word-image-catalog.ts'])
const catalog = JSON.parse(readFileSync(join(ROOT, 'public', 'word-images', 'catalog.json'), 'utf8')) as WordImageCatalog

/** 1 lần xuất hiện `image: '…'` hoặc `icon: '…'` trong nội dung. */
interface Usage {
  file: string // đường dẫn tương đối, dấu /
  line: number
  field: 'image' | 'icon'
  value: string
  /** `word: '…'` gần nhất phía trên (cùng object) — giúp gợi ý tốt hơn */
  nearbyWord?: string
}

/** Liệt kê đệ quy mọi file .ts trong 1 thư mục. */
function listTsFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...listTsFiles(path))
    else if (entry.name.endsWith('.ts') && !SKIP_FILES.has(entry.name)) files.push(path)
  }
  return files.sort()
}

const FIELD_PATTERN = /\b(image|icon)\s*:\s*(['"])((?:(?!\2).)*)\2/g
const WORD_PATTERN = /\bword\s*:\s*(['"])((?:(?!\1).)*)\1/

function scanFile(path: string): Usage[] {
  const usages: Usage[] = []
  const lines = readFileSync(path, 'utf8').split(/\r?\n/)
  lines.forEach((text, index) => {
    const trimmed = text.trim()
    if (trimmed.startsWith('//') || trimmed.startsWith('*')) return // bỏ qua chú thích
    for (const match of text.matchAll(FIELD_PATTERN)) {
      let nearbyWord: string | undefined
      for (let back = index; back >= Math.max(0, index - 8) && !nearbyWord; back--) {
        nearbyWord = WORD_PATTERN.exec(lines[back])?.[2]
      }
      usages.push({
        file: relative(ROOT, path).split('\\').join('/'),
        line: index + 1,
        field: match[1] as 'image' | 'icon',
        value: match[3],
        nearbyWord,
      })
    }
  })
  return usages
}

const isEmoji = (value: string) => value.trim() !== '' && !/[a-z0-9]/i.test(value)

/* ---------- quét và phân loại ---------- */
const usages = listTsFiles(CONTENT_DIR).flatMap(scanFile)
const ok: Usage[] = []
const empty: Usage[] = []
const emoji: (Usage & { slug?: string })[] = []
const missing: (Usage & { fix?: string; suggestions: string[] })[] = []

for (const usage of usages) {
  if (usage.value.trim() === '') empty.push(usage)
  else if (isEmoji(usage.value)) emoji.push({ ...usage, slug: findWordImage(usage.value, catalog) })
  else if (hasWordImage(usage.value)) ok.push(usage)
  else {
    const fix = findWordImage(usage.value, catalog) ?? (usage.nearbyWord ? findWordImage(usage.nearbyWord, catalog) : undefined)
    const suggestions = [
      ...suggestWordImages(usage.value, catalog, 5),
      ...(usage.nearbyWord ? suggestWordImages(usage.nearbyWord, catalog, 3) : []),
    ].filter((slug, i, all) => slug !== fix && all.indexOf(slug) === i).slice(0, 5)
    missing.push({ ...usage, fix, suggestions })
  }
}

/* ---------- in ra màn hình ---------- */
const distinctUsed = new Set(ok.map((u) => u.value))
console.log(
  `${usages.length} giá trị image/icon trong ${new Set(usages.map((u) => u.file)).size} file — ` +
    `${ok.length} đúng (${distinctUsed.size} ảnh khác nhau / ${WORD_IMAGE_SLUGS.length} ảnh có sẵn), ` +
    `${missing.length} sai, ${empty.length} để trống, ${emoji.length} là ký tự emoji.`,
)
for (const m of missing) {
  console.log(
    `  ✗ ${m.file}:${m.line} ${m.field}: '${m.value}'` +
      (m.fix ? ` → sửa thành '${m.fix}'` : '') +
      (m.suggestions.length ? `  (gợi ý: ${m.suggestions.join(', ')})` : ''),
  )
}

/* ---------- báo cáo Markdown (tuỳ chọn) ---------- */
const mdFlag = process.argv.indexOf('--md')
if (mdFlag !== -1 && process.argv[mdFlag + 1]) {
  const code = (text: string) => (text ? `\`${text}\`` : '—')
  const perFile = new Map<string, { image: number; icon: number; missing: number }>()
  for (const u of usages) {
    const row = perFile.get(u.file) ?? { image: 0, icon: 0, missing: 0 }
    row[u.field]++
    perFile.set(u.file, row)
  }
  for (const m of missing) perFile.get(m.file)!.missing++

  const md: string[] = [
    '# Báo cáo ảnh minh hoạ từ vựng (word-images)',
    '',
    `Sinh tự động bởi \`scripts/check-word-images.ts\` lúc ${new Date().toISOString().slice(0, 16).replace('T', ' ')} (UTC).`,
    'Chạy lại (ở thư mục gốc):',
    '',
    '```',
    'npx esbuild scripts/check-word-images.ts --bundle --platform=node --format=esm --outfile=node_modules/.cache/check-word-images.mjs --log-level=warning',
    'node node_modules/.cache/check-word-images.mjs --md docs/redesign-v3/word-image-report.md',
    '```',
    '',
    `Ảnh: \`public/word-images/<slug>.webp\` (160×160, Fluent Emoji 3D, MIT). Có ${WORD_IMAGE_SLUGS.length} ảnh.`,
    'Danh sách slug: `WORD_IMAGE_SLUGS` trong `src/content/word-image-catalog.ts`; tra từ khoá: `public/word-images/catalog.json`.',
    'Lưu ý: tài liệu cũ ghi tên file `<slug>-128.webp` — tên đúng là `<slug>.webp` (giá trị `image`/`icon` chỉ ghi slug, không đuôi).',
    '',
    '## Tóm tắt',
    '',
    '| Loại | Số lượng |',
    '|---|---|',
    `| Giá trị \`image\`/\`icon\` quét được | ${usages.length} (trong ${perFile.size} file) |`,
    `| Đúng slug, có ảnh | ${ok.length} (${distinctUsed.size} ảnh khác nhau) |`,
    `| **Slug không tồn tại — cần sửa** | **${missing.length}** |`,
    `| Để trống (\`''\` = cố ý không có ảnh) | ${empty.length} |`,
    `| Ký tự emoji (chưa dùng ảnh 3D) | ${emoji.length} |`,
    '',
    '## Slug không tồn tại (cần sửa)',
    '',
  ]
  if (missing.length) {
    md.push('| File:dòng | Trường | Giá trị | Từ gần đó | Sửa thành | Gợi ý khác |', '|---|---|---|---|---|---|')
    for (const m of missing) {
      md.push(
        `| \`${m.file}:${m.line}\` | ${m.field} | ${code(m.value)} | ${m.nearbyWord ?? ''} | ${m.fix ? `**${code(m.fix)}**` : '—'} | ${m.suggestions.map(code).join(', ') || '—'} |`,
      )
    }
  } else md.push('Không có — mọi slug đều có ảnh. ✓')

  md.push('', '## Ký tự emoji → ảnh 3D tương ứng', '')
  if (emoji.length) {
    md.push('Các chỗ này đang dùng ký tự emoji (hiển thị bằng font hệ điều hành). Muốn đồng bộ phong cách 3D thì đổi sang slug ở cột cuối.', '')
    md.push('| File:dòng | Trường | Emoji | Slug 3D |', '|---|---|---|---|')
    for (const e of emoji) md.push(`| \`${e.file}:${e.line}\` | ${e.field} | ${e.value} | ${e.slug ? code(e.slug) : '— (không có)'} |`)
  } else md.push('Không có.')

  md.push('', '## Theo file', '', '| File | image | icon | sai |', '|---|---|---|---|')
  for (const [file, row] of perFile) md.push(`| \`${file}\` | ${row.image} | ${row.icon} | ${row.missing || ''} |`)
  md.push('')

  const outPath = join(ROOT, process.argv[mdFlag + 1])
  writeFileSync(outPath, md.join('\n'))
  console.log(`Đã ghi báo cáo: ${relative(ROOT, outPath).split('\\').join('/')}`)
}

if (missing.length) process.exit(1)
console.log('Mọi tên ảnh đều hợp lệ ✓')
