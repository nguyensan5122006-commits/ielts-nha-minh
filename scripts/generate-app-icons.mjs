/**
 * generate-app-icons.mjs — TẠO ICON ỨNG DỤNG TỪ ĐẦU MASCOT
 * ----------------------------------------------------------------------------
 * Đầu Ki (public/mascot/head/head-512.png, do nhóm Blender render) có nền TRONG SUỐT.
 * Dùng thẳng làm favicon thì đẹp, nhưng:
 *   - iPhone/iPad (apple-touch-icon) tô nền trong suốt thành MÀU ĐEN -> cần bản có nền.
 *   - Android "maskable" cắt icon thành hình tròn/vuông bo -> đầu phải nằm trong vùng an toàn ~80%.
 * Script này ghép đầu Ki lên nền kem (#fff8ee = --c-bg trong tokens.css):
 *   public/apple-touch-icon.png   180×180, đầu chiếm 86%
 *   public/icon-maskable-512.png  512×512, đầu chiếm 72%
 * Chạy lại khi nhóm Blender render đầu Ki mới:  node scripts/generate-app-icons.mjs
 * (Nơi dùng: index.html + public/manifest.webmanifest)
 * ----------------------------------------------------------------------------
 */
import sharp from 'sharp'

const SOURCE = 'public/mascot/head/head-512.png'
const CREAM = { r: 0xff, g: 0xf8, b: 0xee, alpha: 1 }
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }

/** Ghép đầu Ki (thu nhỏ còn `ratio` cạnh) vào giữa 1 ô vuông nền kem cạnh `size`. */
async function iconWithBackground(size, ratio, outFile) {
  const inner = Math.round(size * ratio)
  const head = await sharp(SOURCE).resize(inner, inner, { fit: 'contain', background: TRANSPARENT }).toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: head, gravity: 'center' }])
    .png()
    .toFile(outFile)
  console.log('đã tạo', outFile)
}

await iconWithBackground(180, 0.86, 'public/apple-touch-icon.png')
await iconWithBackground(512, 0.72, 'public/icon-maskable-512.png')
