/**
 * publish_mascot.mjs — Tối ưu ảnh mascot đã render rồi chép vào website (public/mascot/).
 *
 * CHẠY (trong thư mục art-blender/tools, vì sharp được cài ở đây):
 *     node publish_mascot.mjs --concept C                    # đồng phục mặc định "olive"
 *     node publish_mascot.mjs --concept C --uniform traffic   # bộ ảnh đồng phục CSGT
 *     node publish_mascot.mjs --concept C --dry-run           # chỉ in dung lượng, không ghi file
 *
 * ĐẦU VÀO  (do scripts/mascot/render_poses.py tạo, PNG 1024 px nền trong suốt):
 *     art-blender/renders/poses/<concept>_<uniform>/<pose>.png  và  head.png
 *
 * ĐẦU RA   (đúng "hợp đồng tài sản" docs/redesign-v3/01-ARCHITECTURE.md mục 6):
 *     public/mascot/poses/<pose>-256.webp | -512.webp | -1024.webp
 *     public/mascot/head/head-32.png | -64 | -128 | -192 | -512
 *
 * NGÂN SÁCH DUNG LƯỢNG: mỗi cỡ có mức tối đa (KB). Tool thử chất lượng WebP từ cao xuống thấp
 * tới khi file nhỏ hơn ngân sách (ảnh 512 px mục tiêu < 80 KB).
 */

import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";
import { cleanShadow } from "./shadow_clean.mjs";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const CONCEPT = opt("--concept", "C").toLowerCase();
const UNIFORM = opt("--uniform", "olive");
const DRY = args.includes("--dry-run");

const ART = path.resolve(import.meta.dirname, "..");
const SRC = path.resolve(opt("--src", path.join(ART, "renders", "poses", `${CONCEPT}_${UNIFORM}`)));
const PUBLIC = path.resolve(opt("--out", path.resolve(ART, "..", "public", "mascot")));   // --out: thư mục khác (thử nghiệm)

const POSE_SIZES = [256, 512, 1024];
const BUDGET_KB = { 256: 28, 512: 80, 1024: 230 };       // tối đa cho mỗi cỡ
const HEAD_SIZES = [32, 64, 128, 192, 512];

/** WebP nhỏ nhất ≤ ngân sách: thử quality 92 → 60. Alpha giữ chất lượng cao để viền mượt. */
async function encodeWebp(buf, size) {
  const resized = await sharp(buf).resize(size, size, { kernel: "lanczos3", fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  let out = null;
  for (let q = 92; q >= 60; q -= 4) {
    out = await sharp(resized).webp({ quality: q, alphaQuality: 90, effort: 6, smartSubsample: true }).toBuffer();
    if (out.length / 1024 <= BUDGET_KB[size]) return { out, q };
  }
  return { out, q: 60 };
}

async function headPng(buf, size) {
  let img = sharp(buf).resize(size, size, { kernel: "lanczos3", fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  // ảnh rất nhỏ (favicon): làm nét nhẹ để mắt + mũ còn rõ
  if (size <= 64) img = img.sharpen({ sigma: 0.6 });
  return img.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
}

function write(file, data) {
  if (DRY) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
}

const rows = [];
if (!fs.existsSync(SRC)) {
  console.error("Không thấy thư mục ảnh gốc:", SRC);
  process.exit(1);
}
for (const f of fs.readdirSync(SRC).filter((n) => n.endsWith(".png")).sort()) {
  const name = f.replace(/\.png$/, "");
  const buf = fs.readFileSync(path.join(SRC, f));
  if (name === "head") {
    for (const size of HEAD_SIZES) {
      const out = await headPng(buf, size);
      const file = path.join(PUBLIC, "head", `head-${size}.png`);
      write(file, out);
      rows.push({ file: path.relative(PUBLIC, file), kb: +(out.length / 1024).toFixed(1) });
    }
    continue;
  }
  const clean = await cleanShadow(buf);
  for (const size of POSE_SIZES) {
    const { out, q } = await encodeWebp(clean, size);
    const file = path.join(PUBLIC, "poses", `${name}-${size}.webp`);
    write(file, out);
    rows.push({ file: path.relative(PUBLIC, file), kb: +(out.length / 1024).toFixed(1), quality: q });
  }
}
console.table(rows);
const total = rows.reduce((s, r) => s + r.kb, 0);
console.log(`${DRY ? "(dry-run) " : ""}${rows.length} file, tổng ${total.toFixed(0)} KB → ${PUBLIC}`);
