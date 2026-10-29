# Báo cáo ảnh minh hoạ từ vựng (word-images)

Sinh tự động bởi `scripts/check-word-images.ts` lúc 2026-10-28 19:34 (UTC).
Chạy lại (ở thư mục gốc):

```
npx esbuild scripts/check-word-images.ts --bundle --platform=node --format=esm --outfile=node_modules/.cache/check-word-images.mjs --log-level=warning
node node_modules/.cache/check-word-images.mjs --md docs/redesign-v3/word-image-report.md
```

Ảnh: `public/word-images/<slug>.webp` (160×160, Fluent Emoji 3D, MIT). Có 1595 ảnh.
Danh sách slug: `WORD_IMAGE_SLUGS` trong `src/content/word-image-catalog.ts`; tra từ khoá: `public/word-images/catalog.json`.
Lưu ý: tài liệu cũ ghi tên file `<slug>-128.webp` — tên đúng là `<slug>.webp` (giá trị `image`/`icon` chỉ ghi slug, không đuôi).

## Tóm tắt

| Loại | Số lượng |
|---|---|
| Giá trị `image`/`icon` quét được | 476 (trong 24 file) |
| Đúng slug, có ảnh | 411 (349 ảnh khác nhau) |
| **Slug không tồn tại — cần sửa** | **1** |
| Để trống (`''` = cố ý không có ảnh) | 48 |
| Ký tự emoji (chưa dùng ảnh 3D) | 16 |

## Slug không tồn tại (cần sửa)

| File:dòng | Trường | Giá trị | Từ gần đó | Sửa thành | Gợi ý khác |
|---|---|---|---|---|---|
| `src/content/all-levels.ts:59` | icon | `family` |  | **`people-hugging`** | `fairy` |

## Ký tự emoji → ảnh 3D tương ứng

Các chỗ này đang dùng ký tự emoji (hiển thị bằng font hệ điều hành). Muốn đồng bộ phong cách 3D thì đổi sang slug ở cột cuối.

| File:dòng | Trường | Emoji | Slug 3D |
|---|---|---|---|
| `src/content/fun-topics/animals.ts:7` | icon | 🐘 | `elephant` |
| `src/content/fun-topics/body.ts:7` | icon | 🦵 | `leg` |
| `src/content/fun-topics/clothes.ts:7` | icon | 👕 | `t-shirt` |
| `src/content/fun-topics/colors-shapes.ts:7` | icon | 🎨 | `artist-palette` |
| `src/content/fun-topics/countries.ts:19` | icon | 🌍 | `globe-showing-europe-africa` |
| `src/content/fun-topics/emotions.ts:7` | icon | 😊 | `smiling-face-with-smiling-eyes` |
| `src/content/fun-topics/food-drinks.ts:7` | icon | 🍜 | `steaming-bowl` |
| `src/content/fun-topics/fruits-vegetables.ts:7` | icon | 🥕 | `carrot` |
| `src/content/fun-topics/household.ts:7` | icon | 🛋️ | `couch-and-lamp` |
| `src/content/fun-topics/jobs.ts:7` | icon | 👩‍⚕️ | `woman-health-worker` |
| `src/content/fun-topics/musical-instruments.ts:7` | icon | 🎸 | `guitar` |
| `src/content/fun-topics/nature.ts:7` | icon | 🌋 | `volcano` |
| `src/content/fun-topics/places.ts:7` | icon | 🏫 | `school` |
| `src/content/fun-topics/sports-hobbies.ts:7` | icon | ⚽ | `soccer-ball` |
| `src/content/fun-topics/vehicles.ts:7` | icon | 🚗 | `automobile` |
| `src/content/fun-topics/weather-seasons.ts:7` | icon | ⛅ | `sun-behind-cloud` |

## Theo file

| File | image | icon | sai |
|---|---|---|---|
| `src/content/all-levels.ts` | 0 | 18 | 1 |
| `src/content/fun-topics/animals.ts` | 0 | 1 |  |
| `src/content/fun-topics/body.ts` | 0 | 1 |  |
| `src/content/fun-topics/clothes.ts` | 0 | 1 |  |
| `src/content/fun-topics/colors-shapes.ts` | 0 | 1 |  |
| `src/content/fun-topics/countries.ts` | 0 | 1 |  |
| `src/content/fun-topics/emotions.ts` | 0 | 1 |  |
| `src/content/fun-topics/food-drinks.ts` | 0 | 1 |  |
| `src/content/fun-topics/fruits-vegetables.ts` | 0 | 1 |  |
| `src/content/fun-topics/household.ts` | 0 | 1 |  |
| `src/content/fun-topics/jobs.ts` | 0 | 1 |  |
| `src/content/fun-topics/musical-instruments.ts` | 0 | 1 |  |
| `src/content/fun-topics/nature.ts` | 0 | 1 |  |
| `src/content/fun-topics/places.ts` | 0 | 1 |  |
| `src/content/fun-topics/sports-hobbies.ts` | 0 | 1 |  |
| `src/content/fun-topics/vehicles.ts` | 0 | 1 |  |
| `src/content/fun-topics/weather-seasons.ts` | 0 | 1 |  |
| `src/content/kids/kids-stories.ts` | 30 | 0 |  |
| `src/content/kids/kids-topics.ts` | 391 | 0 |  |
| `src/content/levels/level-2-bridge/general/units.ts` | 0 | 4 |  |
| `src/content/levels/level-2-bridge/ielts/units.ts` | 0 | 4 |  |
| `src/content/levels/level-3-general/units.ts` | 0 | 5 |  |
| `src/content/levels/level-3-ielts/listening-reading/units.ts` | 0 | 4 |  |
| `src/content/levels/level-3-ielts/writing-speaking/units.ts` | 0 | 4 |  |
