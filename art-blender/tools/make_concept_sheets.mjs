/**
 * make_concept_sheets.mjs — Ghép ảnh so sánh 3 concept mascot + kiểm tra độ dễ nhận ở 32 px / 64 px.
 *
 * CHẠY (trong thư mục art-blender/tools, vì sharp được cài ở đây):
 *     cd "E:/IELTS_ThienThao/art-blender/tools"
 *     node make_concept_sheets.mjs                # dùng ảnh trong ../renders/concepts
 *     node make_concept_sheets.mjs --dir <thư mục> --suffix _draft
 *
 * ĐẦU VÀO (do build_and_render_concept.py tạo):
 *     concept_{a,b,c}_salute34.png, concept_{a,b,c}_front.png, concept_{a,b,c}_threequarter.png,
 *     concept_{a,b,c}_head.png (512 px)
 *
 * ĐẦU RA:
 *     concepts_comparison_sheet.png   — 3 concept cạnh nhau (hàng 1: tư thế chào 3/4, hàng 2: chính diện)
 *     concept_{x}_head_64.png / _32.png — đầu thu nhỏ đúng cỡ 64 px và 32 px (nền trong suốt)
 *     concepts_small_size_test.png     — bảng kiểm tra 32/64 px trên nền sáng + nền tối,
 *                                        kèm bản phóng to "pixel" (nearest) để soi từng điểm ảnh
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
  { key: "a", title: "A — Tròn Đậu", sub: "Rounded Bean" },
  { key: "b", title: "B — Cáo Tinh Anh", sub: "Fox-cute" },
  { key: "c", title: "C — Đồ Chơi Mập", sub: "Chunky Toy" },
];
const BG_LIGHT = { r: 246, g: 243, b: 236, alpha: 1 };
const BG_DARK = { r: 34, g: 38, b: 46, alpha: 1 };

const file = (key, view) => path.join(DIR, `concept_${key}_${view}${SUFFIX}.png`);

/** Tạo ảnh SVG chứa chữ (sharp vẽ SVG → PNG để ghép). */
function textSvg(width, height, lines, color = "#2b2b2b") {
  const tspans = lines
    .map((l, i) => `<text x="${width / 2}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size}"
      font-weight="${l.weight || 600}" fill="${l.color || color}" text-anchor="middle">${l.text}</text>`)
    .join("\n");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${tspans}</svg>`);
}

async function comparisonSheet() {
  const cell = 760;
  const header = 150;
  const gap = 20;
  const rows = ["salute34", "front"];
  const width = CONCEPTS.length * cell + (CONCEPTS.length + 1) * gap;
  const height = header + rows.length * cell + (rows.length + 1) * gap + 40;
  const layers = [];
  CONCEPTS.forEach((c, ci) => {
    const x = gap + ci * (cell + gap);
    layers.push({
      input: textSvg(cell, header, [
        { text: c.title, y: 70, size: 46 },
        { text: c.sub, y: 118, size: 30, weight: 400, color: "#6b6b6b" },
      ]),
      left: x,
      top: 0,
    });
    rows.forEach((view, ri) => {
      const f = file(c.key, view);
      if (!fs.existsSync(f)) return;
      layers.push({ input: f, left: x, top: header + gap + ri * (cell + gap), _resize: cell });
    });
  });
  const composites = await Promise.all(
    layers.map(async (l) => {
      if (l._resize) {
        const buf = await sharp(l.input).resize(l._resize, l._resize, { kernel: "lanczos3" }).png().toBuffer();
        return { input: buf, left: l.left, top: l.top };
      }
      return { input: l.input, left: l.left, top: l.top };
    }),
  );
  const out = path.join(DIR, `concepts_comparison_sheet${SUFFIX}.png`);
  await sharp({ create: { width, height, channels: 4, background: BG_LIGHT } }).composite(composites).png().toFile(out);
  console.log("Đã lưu", out);
}

async function smallSizeTest() {
  // Mỗi concept: thu nhỏ ảnh đầu 512 px → 64 px và 32 px (lanczos3 = sắc nét, giống trình duyệt thu nhỏ đẹp)
  const rowsH = 300;
  const header = 90;
  const colW = 300;
  const cols = ["64 px", "32 px", "64 px (phóng 4×)", "32 px (phóng 8×)"];
  const width = 260 + cols.length * colW * 2 + 40;
  const height = header + CONCEPTS.length * rowsH + 30;
  const composites = [];
  // tiêu đề cột: nửa trái nền sáng, nửa phải nền tối
  const halfX = 260;
  composites.push({
    input: await sharp({ create: { width: cols.length * colW, height: height, channels: 4, background: BG_DARK } }).png().toBuffer(),
    left: halfX + cols.length * colW,
    top: 0,
  });
  for (const [side, offX, color] of [["Nền sáng", halfX, "#2b2b2b"], ["Nền tối", halfX + cols.length * colW, "#eeeeee"]]) {
    composites.push({
      input: textSvg(cols.length * colW, 44, [{ text: side, y: 32, size: 28, color }]),
      left: offX,
      top: 4,
    });
    cols.forEach((c, i) => {
      composites.push({
        input: textSvg(colW, 40, [{ text: c, y: 30, size: 22, weight: 400, color }]),
        left: offX + i * colW,
        top: 46,
      });
    });
  }
  for (const [ri, c] of CONCEPTS.entries()) {
    const f = file(c.key, "head");
    if (!fs.existsSync(f)) continue;
    const top = header + ri * rowsH;
    composites.push({ input: textSvg(250, rowsH, [{ text: c.title.split(" — ")[0], y: rowsH / 2 + 10, size: 56 }]), left: 0, top });
    const p64 = await sharp(f).resize(64, 64, { kernel: "lanczos3" }).png().toBuffer();
    const p32 = await sharp(f).resize(32, 32, { kernel: "lanczos3" }).png().toBuffer();
    await sharp(p64).toFile(path.join(DIR, `concept_${c.key}_head_64${SUFFIX}.png`));
    await sharp(p32).toFile(path.join(DIR, `concept_${c.key}_head_32${SUFFIX}.png`));
    const big64 = await sharp(p64).resize(256, 256, { kernel: "nearest" }).png().toBuffer();
    const big32 = await sharp(p32).resize(256, 256, { kernel: "nearest" }).png().toBuffer();
    for (const offX of [halfX, halfX + cols.length * colW]) {
      const cy = top + (rowsH - 256) / 2;
      composites.push({ input: p64, left: offX + Math.round((colW - 64) / 2), top: Math.round(top + (rowsH - 64) / 2) });
      composites.push({ input: p32, left: offX + colW + Math.round((colW - 32) / 2), top: Math.round(top + (rowsH - 32) / 2) });
      composites.push({ input: big64, left: offX + 2 * colW + 22, top: Math.round(cy) });
      composites.push({ input: big32, left: offX + 3 * colW + 22, top: Math.round(cy) });
    }
  }
  const out = path.join(DIR, `concepts_small_size_test${SUFFIX}.png`);
  await sharp({ create: { width, height, channels: 4, background: BG_LIGHT } }).composite(composites).png().toFile(out);
  console.log("Đã lưu", out);
}

await comparisonSheet();
await smallSizeTest();
