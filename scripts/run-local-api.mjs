/**
 * run-local-api.mjs — CHẠY API LOCAL VỚI BÍ MẬT NẰM NGOÀI PROJECT
 * ----------------------------------------------------------------------------
 * Bí mật (GEMINI_API_KEY, ANTHROPIC_API_KEY, INVITE_CODE) KHÔNG để trong project nữa
 * để không bao giờ lỡ đưa lên GitHub. File thật nằm ở thư mục anh em:
 *
 *     E:\IELTS_ThienThao\                 <- project (đưa lên GitHub)
 *     E:\IELTS_ThienThao-secrets\.dev.vars <- bí mật (KHÔNG đưa lên đâu cả)
 *
 * Script này đọc file đó rồi chạy `wrangler pages dev` kèm từng biến qua cờ --binding.
 * (Cờ --env-file của wrangler không áp dụng cho `pages dev`, nên phải làm cách này.)
 *
 * Chạy bằng: npm run api
 * Muốn để file bí mật chỗ khác: đặt biến môi trường SECRETS_FILE=<đường dẫn>.
 * ----------------------------------------------------------------------------
 */
import { existsSync, readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import path from 'node:path'

const projectRoot = path.resolve(import.meta.dirname, '..')
const secretsFile =
  process.env.SECRETS_FILE ?? path.resolve(projectRoot, '..', 'IELTS_ThienThao-secrets', '.dev.vars')

// 1. Đọc file bí mật dạng KEY=VALUE (bỏ dòng trống và dòng bắt đầu bằng #)
const bindingFlags = []
if (existsSync(secretsFile)) {
  for (const line of readFileSync(secretsFile, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const equalsAt = trimmed.indexOf('=')
    if (equalsAt < 1) continue
    const key = trimmed.slice(0, equalsAt).trim()
    const value = trimmed.slice(equalsAt + 1).trim().replace(/^["']|["']$/g, '')
    if (value) bindingFlags.push('--binding', `${key}=${value}`)
  }
  console.log(`Đã nạp ${bindingFlags.length / 2} bí mật từ ${secretsFile}`)
} else {
  console.warn(`Không thấy file bí mật: ${secretsFile}`)
  console.warn('Chép .dev.vars.example sang đó rồi điền mã thật. API vẫn chạy nhưng AI / đăng ký sẽ lỗi.')
}

// 2. Chạy wrangler (shell: true để Windows tìm được npx)
const child = spawn('npx', ['wrangler', 'pages', 'dev', 'dist', '--port', '8788', ...bindingFlags], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})
child.on('exit', (code) => process.exit(code ?? 0))
