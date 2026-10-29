/**
 * render_mascot_all.mjs — MỘT LỆNH làm lại toàn bộ ảnh mascot cho website:
 *     1) chạy Blender (song song vài tiến trình) để render mọi tư thế + ảnh đầu  → renders/poses/...
 *     2) chạy publish_mascot.mjs để tối ưu (WebP 256/512/1024, PNG đầu 32..512) → public/mascot/...
 *
 * CHẠY (Git Bash hoặc PowerShell, trong thư mục art-blender/tools):
 *     node render_mascot_all.mjs                                  # concept C, đồng phục olive, 13 tư thế + đầu
 *     node render_mascot_all.mjs --concept A --uniform traffic    # concept khác / đồng phục CSGT
 *     node render_mascot_all.mjs --poses salute,happy,head        # chỉ vài tư thế
 *     node render_mascot_all.mjs --jobs 2 --no-publish            # 2 tiến trình, chưa chép lên web
 *     node render_mascot_all.mjs --draft --no-publish             # bản nháp nhanh để xem thử
 *
 * VÌ SAO CHẠY SONG SONG? Bước dựng hình (SDF → lưới) chạy bằng CPU và chỉ dùng 1 lõi; máy có 8 lõi
 * nên 3 tiến trình nhanh hơn ~2.5 lần. Mỗi tiến trình chỉ dùng ~1–1.5 GB VRAM khi render (card 8 GB).
 */

import { spawn } from "node:child_process";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : def;
};
const has = (name) => args.includes(name);

const BLENDER = opt("--blender", "E:/Tools/Blender/5.2.3/blender.exe");
const CONCEPT = opt("--concept", "C");
const UNIFORM = opt("--uniform", "olive");
const JOBS = Number(opt("--jobs", "3"));
const SAMPLES = opt("--samples", "192");
const SIZE = opt("--size", "1024");
const SCRIPT = path.resolve(import.meta.dirname, "..", "scripts", "mascot", "render_poses.py");

const ALL = ["salute", "happy", "wave", "comfort", "thinking", "celebrate", "sleepy", "listening",
  "thumbs-up", "surprised", "reading", "writing", "speaking", "head"];
const poses = opt("--poses", ALL.join(",")).split(",").map((s) => s.trim()).filter(Boolean);

// chia đều tư thế cho các tiến trình (xen kẽ để thời gian mỗi tiến trình gần bằng nhau)
const buckets = Array.from({ length: Math.min(JOBS, poses.length) }, () => []);
poses.forEach((p, i) => buckets[i % buckets.length].push(p));

function run(cmd, cmdArgs, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, cmdArgs, { stdio: ["ignore", "pipe", "pipe"] });
    const onData = (buf) => {
      for (const line of buf.toString().split(/\r?\n/)) {
        if (/\[poses\]|Traceback|Error/.test(line)) console.log(`[${label}] ${line.trim()}`);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${label} thoát với mã ${code}`))));
  });
}

const t0 = Date.now();
console.log(`Render concept ${CONCEPT} (${UNIFORM}): ${poses.length} ảnh, ${buckets.length} tiến trình Blender`);
await Promise.all(buckets.map((list, i) => {
  const a = ["--background", "--factory-startup", "--python", SCRIPT, "--",
    "--concept", CONCEPT, "--uniform", UNIFORM, "--poses", list.join(","), "--samples", SAMPLES, "--size", SIZE];
  if (has("--draft")) a.push("--draft");
  return run(BLENDER, a, `blender-${i + 1}`);
}));
console.log(`Render xong sau ${((Date.now() - t0) / 60000).toFixed(1)} phút`);

if (!has("--no-publish") && !has("--draft")) {
  // bước 2: tối ưu + chép lên public/mascot (in bảng dung lượng từng file)
  const child = spawn(process.execPath, [path.join(import.meta.dirname, "publish_mascot.mjs"), "--concept", CONCEPT,
    "--uniform", UNIFORM], { stdio: "inherit" });
  const code = await new Promise((r) => child.on("close", r));
  if (code !== 0) process.exit(code);
}
