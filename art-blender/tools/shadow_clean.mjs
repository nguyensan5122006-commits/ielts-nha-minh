/**
 * shadow_clean.mjs — Dọn bóng đổ trên ảnh render nền trong suốt (dùng chung cho publish_mascot + bảng concept).
 *
 *     import { cleanShadow } from "./shadow_clean.mjs";
 *     const pngBuffer = await cleanShadow(inputPathOrBuffer);
 */
import sharp from "sharp";

/**
 * Dọn bóng đổ trước khi thu nhỏ (ảnh tư thế toàn thân):
 *   - Bóng mềm của ánh sáng trời có thể trôi tới mép phải ảnh. Trên web, mép ảnh cắt bóng thành một vệt thẳng.
 *     → Pixel "bóng" (gần như đen, bán trong suốt, nằm ở vùng sàn) mờ dần theo hình elip quanh bàn chân.
 *   - Mọi pixel cách mép ảnh < 12 px: alpha giảm dần về 0 (nhân vật không bao giờ chạm mép nên không ảnh hưởng).
 */
export async function cleanShadow(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const cx = W * 0.5, cy = H * 0.935, rx = W * 0.40, ry = H * 0.10;
  const smooth = (e0, e1, x) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };
  const edge = 12;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      let a = data[i + 3];
      if (a === 0) continue;
      const isShadow = a < 250 && Math.max(data[i], data[i + 1], data[i + 2]) <= 24 && y > H * 0.66;
      if (isShadow) {
        const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
        a *= 1 - smooth(0.65, 1.0, d);
      }
      const de = Math.min(x, y, W - 1 - x, H - 1 - y);
      if (de < edge) a *= smooth(0, edge, de);
      data[i + 3] = Math.round(a);
    }
  }
  return sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
}

