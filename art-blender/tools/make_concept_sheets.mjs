/**
 * make_concept_sheets.mjs — Ghép BẢNG SO SÁNH 3 concept mascot (1 ảnh) + kiểm tra độ dễ nhận ở 64/32 px.
 *
 * CHẠY (trong thư mục art-blender/tools, vì sharp được cài ở đây):
 *     cd "E:/IELTS_ThienThao/art-blender/tools"
 *     node make_concept_sheets.mjs                      # dùng ảnh trong ../renders/concepts
 *     node make_concept_sheets.mjs --suffix _draft      # dùng bộ ảnh nháp
 *
 * ĐẦU VÀO (do scripts/mascot/build_and_render_concept.py tạo):
 *     concept_{a,b,c}_{front,threequarter,side,salute34,head}{suffix}.png
 *
 * ĐẦU RA:
 *     concepts-sheet{suffix}.png  — 3 cột (A, B, C) × các hàng: chính diện, 3/4, nghiêng, chào, đầu,
 *                                   và hàng cuối: ảnh đầu thu nhỏ 128 / 64 / 32 px trên nền sáng + nền tối
 *                                   (kèm bản phóng to kiểu "pixel" để soi từng điểm ảnh ở 32 px)
 *     concept_{x}_head_64{suffix}.png / _32{suffix}.png — đầu thu nhỏ đúng cỡ
 */

import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const DIR = path.resolve(opt("--dir", path.join(import.meta.dirname, "..", "renders", "concepts")));
const SUFFIX = opt("--suffix", "");

const CONCEPTS = [
  { key: "a", title: "A — Tròn Đậu", sub: "cân đối, mắt đen tròn, áo gọn" },
  { key: "b", title: "B — Cáo Tinh Anh", sub: "mõm dài, mắt có tròng nâu, áo nhiều chi tiết" },
  { key: "c", title: "C — Đồ Chơi Mập", sub: "đầu rất to, thân ngắn, mắt to (đề xuất)" },
];
const ROWS = [
  { view: "front", label: "Chính diện" },
  { view: "threequarter", label: "Góc 3/4" },
  { view: "side", label: "Nghiêng" },
  { view: "salute34", label: "Chào (tư thế chính)" },
  { view: "head", label: "Đầu (logo)" },
];
const BG = { r: 246, g: 243, b: 236, alpha: 1 };
const BG_DARK = { r: 34, g: 38, b: 46, alpha: 1 };
const CELL = 440;
const GAP = 16;
const LABEL_W = 190;
const HEADER = 130;
const SMALL_H = 300;

const file = (key, view) => path.join(DIR, `concept_${key}_${view}${SUFFIX}.png`);

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

/** Ảnh SVG chứa chữ (sharp vẽ SVG → PNG để ghép). */
function textSvg(width, height, lines, anchor = "middle") {
  const x = anchor === "middle" ? width / 2 : 12;
  const t = lines
    .map((l) => `<text x="${x}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size}"
      font-weight="${l.weight || 600}" fill="${l.color || "#2b2b2b"}" text-anchor="${anchor}">${esc(l.text)}</text>`)
    .join("\n");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${t}</svg>`);
}

const width = LABEL_W + CONCEPTS.length * (CELL + GAP) + GAP;
const height = HEADER + ROWS.length * (CELL + GAP) + SMALL_H + 60;
const comps = [];

// tiêu đề cột
CONCEPTS.forEach((c, ci) => {
  const x = LABEL_W + GAP + ci * (CELL + GAP);
  comps.push({ input: textSvg(CELL, HEADER, [
    { text: c.title, y: 62, size: 38 },
    { text: c.sub, y: 104, size: 20, weight: 400, color: "#666" },
  ]), left: x, top: 0 });
});

// các hàng ảnh render
for (const [ri, row] of ROWS.entries()) {
  const top = HEADER + ri * (CELL + GAP);
  comps.push({ input: textSvg(LABEL_W, CELL, [{ text: row.label, y: CELL / 2, size: 22 }], "start"), left: 0, top });
  for (const [ci, c] of CONCEPTS.entries()) {
    const f = file(c.key, row.view);
    if (!fs.existsSync(f)) continue;
    const buf = await sharp(f).resize(CELL, CELL, { kernel: "lanczos3", fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    comps.push({ input: buf, left: LABEL_W + GAP + ci * (CELL + GAP), top });
  }
}

// hàng cuối: kiểm tra cỡ nhỏ (nửa trên nền sáng, nửa dưới nền tối)
const smallTop = HEADER + ROWS.length * (CELL + GAP);
comps.push({ input: textSvg(LABEL_W, SMALL_H, [
  { text: "Cỡ nhỏ", y: SMALL_H / 2 - 30, size: 22 },
  { text: "128 · 64 · 32 px", y: SMALL_H / 2, size: 18, weight: 400, color: "#666" },
  { text: "+ 32 px phóng to", y: SMALL_H / 2 + 26, size: 18, weight: 400, color: "#666" },
], "start"), left: 0, top: smallTop });
for (const [ci, c] of CONCEPTS.entries()) {
  const f = file(c.key, "head");
  if (!fs.existsSync(f)) continue;
  const x0 = LABEL_W + GAP + ci * (CELL + GAP);
  const darkBand = await sharp({ create: { width: CELL, height: SMALL_H / 2, channels: 4, background: BG_DARK } }).png().toBuffer();
  comps.push({ input: darkBand, left: x0, top: smallTop + SMALL_H / 2 });
  const sizes = [128, 64, 32];
  const bufs = {};
  for (const s of sizes) {
    bufs[s] = await sharp(f).resize(s, s, { kernel: "lanczos3" }).sharpen(s <= 64 ? { sigma: 0.6 } : undefined).png().toBuffer();
  }
  await sharp(bufs[64]).toFile(path.join(DIR, `concept_${c.key}_head_64${SUFFIX}.png`));
  await sharp(bufs[32]).toFile(path.join(DIR, `concept_${c.key}_head_32${SUFFIX}.png`));
  const zoom32 = await sharp(bufs[32]).resize(128, 128, { kernel: "nearest" }).png().toBuffer();
  for (const band of [0, 1]) {
    const yMid = smallTop + band * (SMALL_H / 2) + SMALL_H / 4;
    let x = x0 + 10;
    for (const s of sizes) {
      comps.push({ input: bufs[s], left: x, top: Math.round(yMid - s / 2) });
      x += s + 22;
    }
    comps.push({ input: zoom32, left: x0 + CELL - 128 - 6, top: Math.round(yMid - 64) });
  }
}

const out = path.join(DIR, `concepts-sheet${SUFFIX}.png`);
await sharp({ create: { width, height, channels: 4, background: BG } }).composite(comps).png({ compressionLevel: 9 }).toFile(out);
console.log("Đã lưu", out, `${width}x${height}`);
