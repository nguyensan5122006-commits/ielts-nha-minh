/**
 * montage.mjs — Ghép nhanh nhiều ảnh thành 1 lưới trên nền màu (để xem/so sánh render).
 *   node montage.mjs out.png --cols 3 --cell 512 --bg 246,243,236 a.png b.png c.png ...
 */
import sharp from "sharp";
const a = process.argv.slice(2);
const out = a.shift();
let cols = 3, cell = 512, bg = [246, 243, 236];
const files = [];
for (let i = 0; i < a.length; i++) {
  if (a[i] === "--cols") cols = +a[++i];
  else if (a[i] === "--cell") cell = +a[++i];
  else if (a[i] === "--bg") bg = a[++i].split(",").map(Number);
  else files.push(a[i]);
}
const rows = Math.ceil(files.length / cols);
const comps = await Promise.all(files.map(async (f, i) => ({
  input: await sharp(f).resize(cell, cell, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer(),
  left: (i % cols) * cell, top: Math.floor(i / cols) * cell,
})));
await sharp({ create: { width: cols * cell, height: rows * cell, channels: 4, background: { r: bg[0], g: bg[1], b: bg[2], alpha: 1 } } })
  .composite(comps).png().toFile(out);
console.log("saved", out);
