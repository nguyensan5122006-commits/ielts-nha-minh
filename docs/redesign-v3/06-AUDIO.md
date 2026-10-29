# 06 — Âm thanh: giọng đọc AI cho cả web

> Nhóm âm thanh (TTS). Đọc kèm: `01-ARCHITECTURE.md` (giọng Anh-Anh mặc định, level-3 trộn Úc/Mỹ, khu trẻ em
> cần giọng cho MỌI từ + MỌI hướng dẫn), `07-KIDS-ZONE.md`, `src/content/content-types.ts` mục 7–8.

## 1. Tóm tắt 30 giây

- Mọi câu cần nghe được **đọc sẵn thành file mp3** bằng giọng Neural của Microsoft Edge (miễn phí, qua thư viện
  `msedge-tts`). Việc này chạy **trên máy** bằng 1 lệnh, rồi file được deploy cùng web (`public/audio/`).
- Lệnh: **`npm run tts:v3`**. Chạy lại bao nhiêu lần cũng được — chỉ tạo file còn thiếu.
- Trang web tính "mã" của câu cần đọc → có file thì phát file; chưa có file (hoặc file lỗi) thì dùng
  giọng đọc của trình duyệt (`speechSynthesis`) đúng ngôn ngữ/giọng gần nhất. Không bao giờ "im lặng".

## 2. Đường đi của 1 câu, từ nội dung đến loa

```
Nội dung: src/content/**  (+ src/features/kids-zone/**/*-text.ts nếu có)
   │
   │  scripts/audio-v3/collect-audio-jobs.ts   GOM: đọc từng file nội dung (file lỗi thì bỏ qua),
   │                                            nhận dạng dữ liệu theo "hình dạng", lập danh sách việc
   ▼
Danh sách việc: [mã, loại, các mảnh (giọng, tốc độ, chữ)]
   │
   │  scripts/audio-v3/edge-tts-synth.ts       ĐỌC: làm sạch ký hiệu (✓ → ___), gọi Edge TTS (4 việc song song, thử lại 4 lần)
   │  scripts/audio-v3/mp3-frames.ts           NỐI: cắt lặng thừa cuối câu, ghép các lượt nói + 350 ms im lặng, đo thời lượng
   ▼
public/audio/<mã>.mp3            kiểu CŨ: giọng tự động, tốc độ thường  (speak() cũ dùng)
public/audio/v3/<mã>.mp3         kiểu v3: giọng / tốc độ riêng (bài nghe v3, khu trẻ em)
public/audio/manifest.json       danh sách mã kiểu cũ
public/audio/manifest-v3.json    mã → { file, kind, voice, rate, durationMs, bytes } + bảng id câu hướng dẫn
   │
   │  src/services/audio-clip-keys.ts          CÁCH TÍNH MÃ (dùng chung cho script và web)
   ▼
src/services/text-to-speech.ts                 PHÁT: speak, playSegment, playKidsWord, playVoiceLine…
```

## 3. Bảng giọng

Đã kiểm tra danh sách giọng thật của Edge (10/2026, 322 giọng).

| Dùng cho | VoiceId (trong nội dung) | Giọng Edge | Ghi chú |
|---|---|---|---|
| Mặc định cả web | `gb-female` | `en-GB-SoniaNeural` | Nữ Anh-Anh |
| | `gb-male` | `en-GB-RyanNeural` | Nam Anh-Anh |
| | `gb-child` | `en-GB-MaisieNeural` | Bé gái Anh-Anh |
| Level 3 (trộn giọng) | `au-female` | `en-AU-NatashaNeural` | Nữ Úc |
| | `au-male` | `en-AU-WilliamMultilingualNeural` | Nam Úc. Microsoft đã **bỏ** `en-AU-WilliamNeural`; đây là giọng nam Úc duy nhất còn lại |
| | `us-female` | `en-US-JennyNeural` | Nữ Mỹ |
| | `us-male` | `en-US-GuyNeural` | Nam Mỹ |
| Khu trẻ em — tiếng Anh | — | `en-GB-LibbyNeural` | Nữ Anh-Anh rõ, ấm |
| Khu trẻ em — tiếng Việt | — | `vi-VN-HoaiMyNeural` | Nữ miền Bắc |

**Hội thoại không ghi `voice`** (VD kịch bản `"Woman: …\nMan: …"` trong đề thi cũ, hoặc `AudioLine` thiếu `voice`):
hàm `resolveLineVoices()` đoán nam/nữ theo tên người nói ("Woman", "Mr Brown", "Linh", "Tom"…). Người không đoán được
nhận giới đang ít người hơn, để 2 người nói luôn nghe khác nhau. Mỗi người 1 giọng: nữ lần lượt Sonia → Natasha → Jenny,
nam lần lượt Ryan → William → Guy.

## 4. Tốc độ đọc

| Hằng số (`SPEECH_RATE`) | Giá trị | Dùng cho |
|---|---|---|
| `normal` | `+0%` | Mọi thứ của người lớn/teen |
| `kidsWord` | `-15%` | Từ vựng trẻ em, nút loa thường |
| `kidsWordSlow` | `-35%` | Từ vựng trẻ em, nút rùa 🐢 |
| `kidsSentence` | `-10%` | Câu mẫu, lệnh tô màu, lời kể truyện, câu hướng dẫn tiếng Anh |
| `kidsVietnamese` | `-5%` | Câu hướng dẫn / nghĩa tiếng Việt cho bé |

Theo `psych-kids.md` luật 30: câu khung ~0,9×, từ mục tiêu chậm hơn (~0,75×). Trình nghe người lớn còn có
tốc độ phát 0,75× / 1× / 1,25× (đổi `playbackRate`, không cần file riêng).

## 5. Những gì được tạo

| Loại (`kind`) | Lấy từ đâu | Giọng · tốc độ | Mã | Phát bằng |
|---|---|---|---|---|
| `lesson-audio` | `audioText` của bài `listen-choose` / `listen-type`; câu nghe bài xếp lớp | tự động · thường | cũ | `speak(text)` |
| `lesson-sentence` | `sentence` của bài `speak-sentence` | Sonia · thường | cũ | `speak(text)` |
| `word` | `words[].word` (từ vựng có `ipa`) | Sonia · thường | cũ | `speak(word)` |
| `example` | `examples[].en` (từ vựng, thẻ dạy) | Sonia · thường | cũ | `speak(text)` |
| `exam-script` | `audioScript` của phần nghe trong đề thi (kể cả đề v3) | tự động · thường | cũ | `speak(script)` |
| `placement-line` | câu nghe bài xếp lớp v3 có `voice` riêng, 1 người nói | theo `voice` | v3 | `playAudioLine({text, voice})` |
| `listening-segment` | `listeningTask.segments[]` — **mỗi đoạn 1 file**, các dòng nối nhau, 350 ms nghỉ | theo `AudioLine.voice` | v3 | `playSegment(segment)` |
| `kids-word` / `kids-word-slow` | `KidsWord.word` + đáp án truyện | Libby · -15% / -35% | v3 | `playKidsWord(word, {slow})` |
| `kids-letter` | chữ cái A–Z (trò Xếp chữ) | Libby · -15% / -35% | v3 | `playKidsLetter('c')` |
| `kids-word-meaning` | `KidsWord.meaningVi` | Hoài My · -5% | v3 | `playKidsMeaning(word)` |
| `kids-sentence` | `KidsWord.example.en`, `KIDS_SENTENCES[].sentence` | Libby · -10% | v3 | `playKidsSentence(text)` |
| `kids-colour-command` | `KIDS_COLOUR_COMMANDS[].commandEn` (+ `commandVi`) | Libby -10% / Hoài My -5% | v3 | `playKidsSentence(cmd.commandEn)` hoặc `playVoiceLine('<id>.command', lang)` |
| `kids-story` | truyện: `narrationEn/Vi`, `promptEn/Vi` | Libby / Hoài My | v3 | `playKidsSentence` hoặc `playVoiceLine` |
| `kids-voice-line` | MỌI cặp chữ `{ vi, en }` trong `src/content/kids/**` (câu mascot `KIDS_VOICE_LINES`, tên trò, tên chủ đề, tên trang phục, tên chương…) | Hoài My -5% / Libby -10% | v3 | `playVoiceLine(id, lang)` |

Không tạo (cố ý): thẻ "Học vui" (`fun-topics`, thêm `--with-fun-topics` nếu muốn), câu hỏi/bài mẫu Speaking,
dịch tiếng Việt của câu ví dụ. Chữ có chỗ điền động (VD tên bé) không tạo sẵn được → trình duyệt đọc.

`{mascot}` được thay bằng tên trong `src/design-system/mascot-name.ts` (hiện là **"Ki"**) **trước khi** đọc — giống
`fillMascotName()` của giao diện. **Đổi tên mascot → chạy lại `npm run tts:v3`** (câu cũ thành file thừa, xoá bằng `--prune`).

## 6. "Mã" (key) và tên file

Mã = băm FNV-1a 32-bit → 8 ký tự hex (`hashAudioText`, giữ nguyên từ bản cũ).

- **Mã cũ** = `hashAudioText(câu)`. Giọng tự động: 1 người nói = Sonia; hội thoại = mỗi người 1 giọng. File
  `public/audio/<mã>.mp3`. Nhờ vậy 203 file cũ vẫn dùng được và `speak()` cũ không phải sửa gì.
- **Mã v3** = `hashAudioText("v3|<giọng Edge>|<tốc độ>|<câu>")` → cùng 1 câu nhưng khác giọng / khác tốc độ ra
  mã khác (VD "cat" -15% và "cat" -35% là 2 file). File `public/audio/v3/<mã>.mp3`.
- **Đoạn nghe** = `hashAudioText("v3-seg|" + từng dòng "<giọng>><chữ>")` — sửa 1 chữ hay đổi giọng 1 dòng là ra mã mới.
- Hai mã khác nhau nhưng đọc **giống hệt** (cùng giọng, tốc độ, chữ) thì dùng chung 1 file — manifest-v3 ghi
  mã → file nên làm được việc này.
- Câu hướng dẫn trẻ em có thêm **id**: `manifest-v3.json` → `voiceLines["kids-vl-instr-listen-tap"] = { vi: "<mã>", en: "<mã>" }`.
  Id = id của object gần nhất + đường dẫn trường, VD `kids-vl-hint1-listen` (câu mascot), `animals.title`
  (tên chủ đề), `kids-colour-03.command`, `kids-animals-cat.meaning`, `kids-story-01-lost-kitten.scenes.0.narration`.

Tất cả hàm tính mã ở **`src/services/audio-clip-keys.ts`** — script và web dùng chung, nên luôn khớp nhau.

## 7. Chạy lại

```bash
npm run tts:v3                          # tạo file còn thiếu (cả nội dung mới), cập nhật 2 manifest
npm run tts:v3 -- --dry-run             # chỉ đếm + ước tính dung lượng, không tạo / không ghi gì
npm run tts:v3 -- --only kids-word,kids-word-slow   # chỉ vài loại (tên loại ở mục 5)
npm run tts:v3 -- --limit 20            # thử nhanh 20 file
npm run tts:v3 -- --prune               # xoá file trong public/audio/v3 không còn nội dung nào dùng
npm run tts:v3 -- --concurrency 2       # bớt số việc song song nếu mạng yếu / bị từ chối nhiều
```

Khi nào chạy: sau khi thêm/sửa nội dung có chữ cần nghe; sau khi đổi tên mascot; trước khi `npm run deploy`.
In ra cuối: số file tạo mới, dung lượng thư mục, danh sách câu lỗi (bị bỏ qua — **chạy lại lệnh là thử lại**).
Mỗi file được ghi ra file tạm rồi mới đổi tên → tắt ngang giữa chừng không để lại file hỏng.
Bước kiểm tra cuối (mỗi lần chạy) đọc lại MỌI file: < 1 KB, không đọc được khung mp3, hoặc thời lượng ≈ 0 → xoá để lần sau tạo lại.

Thời gian: lần đầu ~4 000 file mất khoảng 40 phút (≈ 110 file/phút). Các lần sau chỉ vài giây đến vài phút.

`npm run tts` (script cũ `generate-listening-audio.ts`) vẫn còn nhưng **hiện không chạy được** (lỗi 403, xem mục 10)
và không cần nữa: `tts:v3` đã làm hết việc của nó.

## 8. Dùng trong code (cho các nhóm giao diện)

Mọi hàm `play…` trả về **`PlaybackHandle`** và tự dừng âm thanh đang phát trước đó (mỗi lúc chỉ 1 âm thanh).

```ts
import {
  speak, stopSpeaking, playAudioLine, playSegment, playKidsWord, playKidsLetter, playKidsMeaning,
  playKidsSentence, playVoiceLine, preload, preloadClips, getClipInfo, PLAYBACK_RATES,
} from '../services/text-to-speech'
import { kidsWordKey, segmentKey } from '../services/audio-clip-keys'

// --- Trình nghe (Listening player) ---
const handle = playSegment(task.segments[0], {
  rate: 1,                                                    // 0.75 | 1 | 1.25
  onProgress: ({ currentTime, duration }) => setBar(currentTime / duration),   // ~5 lần/giây
  onEnded: () => setDone(true),                               // chỉ khi phát hết (không gọi khi stop)
})
handle.pause(); handle.resume()
handle.seek(handle.currentTime - 5)                          // tua lùi 5 giây
handle.setRate(0.75)                                         // đổi tốc độ ngay khi đang phát
await handle.finished                                        // chờ xong (hoặc bị dừng)
const seconds = (await getClipInfo(segmentKey(seg.lines)))?.durationSec   // biết thời lượng trước khi phát

// --- Khu trẻ em ---
playKidsWord(word)                     // nút loa
playKidsWord(word, { slow: true })     // nút rùa 🐢
playKidsLetter('c')                    // trò Xếp chữ
playKidsMeaning(word)                  // "con mèo" (khi bé trả lời đúng)
playKidsSentence(word.example!.en)     // câu ví dụ
playVoiceLine(line.id, 'vi', { fallbackText: fillMascotName(line.vi) })   // câu mascot
preloadClips(roundWords.map((w) => kidsWordKey(w.word)))     // tải trước 10 từ của 1 vòng

// --- Cũ, vẫn chạy như trước ---
await speak('Anna: Hi.\nTom: Hello!')
stopSpeaking()
```

Lưu ý:
- `PlaybackHandle` **không phải** Promise — chờ bằng `await handle.finished`.
- `handle.usingFiles` = `true` nếu đang phát từ file (tua chính xác). Khi phải đọc bằng trình duyệt, `seek` đọc lại từ
  đầu câu chứa vị trí đó, `duration` là số ước lượng (~14 ký tự/giây).
- Đoạn nghe chưa có file ghép → `playSegment` tự đọc từng dòng (file từng dòng nếu có, không thì trình duyệt),
  nghỉ 350 ms giữa các dòng.
- Trình duyệt chặn tự phát âm thanh khi người dùng chưa bấm gì trên trang — câu chào đầu tiên nên phát sau 1 cú bấm.
- Câu có tên bé (`Chào {tên}!`) không tạo sẵn được → truyền chữ đã điền vào `fallbackText`, trình duyệt sẽ đọc.

## 9. Quy ước cho người soạn nội dung (để có audio đúng)

- Bài nghe v3: mỗi `AudioLine` ghi `speaker` + `voice`. Level-3 trộn `au-*`, `us-*`.
- Số viết như người nói ("oh seven eight…", "twenty-three"), tránh ký hiệu lạ (máy đọc sai).
- Đề thi kiểu cũ: dòng `"Tên: lời thoại"` được đọc nhiều giọng; dùng tên rõ nam/nữ (Woman, Man, Mr…, tên phổ biến).
- Khu trẻ em: mọi `{ vi, en }` trong `src/content/kids/**` tự có audio. Lệnh tô màu đặt trong `KIDS_COLOUR_COMMANDS`
  (`commandEn`); nếu trò chơi tự tạo câu lệnh thì dùng `kidsColourCommand(thing, colour)` → "Colour the cat red."
  (script cũng tạo đủ mọi cặp đồ vật × màu khi không có danh sách riêng).
- Chỗ điền duy nhất được hỗ trợ: `{mascot}`. Chỗ điền khác (`{tên}`, `{count}`) → câu đó không có file.

## 10. Ghi chú kỹ thuật / sự cố đã biết

- **Lỗi 403 từ máy chủ Microsoft (10/2026).** Máy chủ đổi cách xác thực (mã `Sec-MS-GEC` kiểu v2). `msedge-tts 2.0.9`
  đang cài chỉ có kiểu cũ → mọi lệnh tạo audio bị từ chối. `edge-tts-synth.ts` tự "vá" khi chạy (thuật toán chép từ
  `msedge-tts 2.1.1`, MIT). **Khuyên:** nâng `msedge-tts` lên `^2.1.1` trong `package.json` — phần vá tự nhận ra và
  không chạy nữa, và `npm run tts` cũ cũng chạy lại được.
- Edge TTS **không nhận thẻ SSML `<break>`** (đóng kết nối). Khoảng nghỉ 350 ms giữa 2 lượt nói được tạo bằng
  "khung mp3 im lặng" tự dựng (`makeSilence`), cùng định dạng nên nối thẳng được.
- File mp3 của Edge không có header Xing/VBR, mỗi khung 144 byte = 24 ms → nối file không làm sai thời lượng trên
  trình duyệt; thời lượng trong manifest = số khung × 24 ms.
- Định dạng: `audio-24khz-48kbitrate-mono-mp3` (~6 KB/giây) — **mức nhỏ nhất** Edge cho phép (chỉ có 48k và 96k).
  Nếu tổng `public/audio` vượt ~250 MB, không giảm bitrate được nữa → bớt loại (`--only`) hoặc bỏ bớt nội dung.
- Cloudflare Pages: tối đa 20 000 file / lần deploy, 25 MB / file. Audio hiện chiếm khoảng 4 000 file.
- Câu tiếng Anh rất dài (> 1 200 ký tự) được cắt theo câu rồi nối lại (máy chủ hay ngắt đoạn quá dài).
- **Cắt lặng cuối câu**: Edge để 0,4–1,3 giây im lặng sau mỗi câu. `trimTrailingSilence()` bỏ các khung lặng ở
  cuối (nhận ra bằng "độ lớn" global_gain < 145 trong side info, không cần giải mã), chừa 200 ms. Chỉ cắt ở CUỐI
  vì mỗi khung mp3 chỉ mượn dữ liệu của khung trước nó. Đã so bằng giải mã thật: vị trí hết tiếng nói không đổi,
  biên độ bị bỏ ≤ 0,001 (không nghe được). Kết quả: từ trẻ em ~1,0 giây thay vì 1,9 giây; khoảng cách 2 lượt nói
  trong hội thoại ~0,75 giây thay vì ~1,3 giây.
- **Làm sạch ký hiệu trước khi đọc** (`prepareTextForSpeech`): nội dung có ký hiệu để nhìn (`✓ ✗ → ↗ ___ /`) mà máy
  sẽ đọc thành "check mark", "right arrow"… → bỏ / đổi thành ngắt nghỉ / "blank". Mã file vẫn tính từ chữ gốc.
- File nội dung có `import 'react'` (hook) vẫn đọc được: script đóng gói từng file vào `node_modules/.cache/audio-v3-modules/`
  rồi import. File lỗi cú pháp (đang viết dở) chỉ bị bỏ qua và in cảnh báo 1 dòng.
- `manifest-v3.json` ~640 KB thô nhưng chỉ ~46–67 KB khi tải (Cloudflare nén); web tải 1 lần, khi phát âm thanh v3 đầu tiên.
- Câu khen `WORD_PRAISE` (kids-text.ts) có `{word}` → không tạo sẵn được (giọng Việt đọc từ tiếng Anh sẽ sai) → trình duyệt đọc.

## 11. Số liệu lần tạo gần nhất (29/10/2026)

Nguồn: 70 file nội dung (mọi file trong `src/content/` trừ fun-topics + `src/features/kids-zone/kids-text.ts`), 0 file lỗi.

| Loại | Số file | Thời lượng TB | MB |
|---|---:|---:|---:|
| exam-script | 18 | 119,5 s | 12,3 |
| lesson-audio | 325 | 6,1 s | 11,4 |
| example | 1 245 | 2,9 s | 20,5 |
| word | 218 | 1,0 s | 1,3 |
| lesson-sentence | 245 | 3,2 s | 4,4 |
| listening-segment | 72 | 52,2 s | 21,5 |
| kids-word / kids-word-slow | 448 + 448 | 1,1 / 1,4 s | 2,9 + 3,6 |
| kids-letter | 52 | 1,0 s | 0,3 |
| kids-word-meaning | 375 | 1,2 s | 2,5 |
| kids-sentence | 443 | 2,3 s | 5,9 |
| kids-colour-command | 60 | 2,9 s | 1,0 |
| kids-story | 120 | 4,6 s | 3,2 |
| kids-voice-line | 302 | 2,9 s | 5,0 |
| **Tổng** | **4 371 file mp3** (2 051 ở `audio/`, 2 320 ở `audio/v3/`) | **279 phút** | **95,8 MB** |

`manifest-v3.json`: 4 378 mã (7 mã câu xếp lớp dùng chung file với mã cũ), 616 id câu hướng dẫn.
Kiểm tra: 0 file < 1 KB, 0 file hỏng khung, thời lượng manifest = số khung × 24 ms cho mọi file;
trình duyệt Chromium (headless) tải + giải mã 90 file mẫu (mọi loại) đúng thời lượng, có tiếng (RMS > 0,005);
`playKidsWord`, `playVoiceLine`, `playSegment` (tạm dừng, tua, đổi tốc độ, onEnded), `speak`, `stopSpeaking` chạy đúng.
