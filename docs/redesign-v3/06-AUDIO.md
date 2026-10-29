# 06 — Âm thanh: giọng đọc AI cho cả web

> Nhóm âm thanh (TTS). Đọc kèm: `01-ARCHITECTURE.md` (giọng Anh-Anh mặc định, level-3 trộn Úc/Mỹ),
> `src/content/content-types.ts` mục 7.
>
> **Cập nhật 29/10/2026:** khu trẻ em đã xoá → bỏ hẳn các loại audio `kids-*` (2 248 file, ~24 MB đã xoá khỏi
> `public/audio/v3/`), bảng `voiceLines` trong manifest, các hàm `playKids…` / `playVoiceLine` / `preloadClips`
> và tốc độ `kids…`. Các mục bên dưới đã viết lại cho phần còn lại.

## 1. Tóm tắt 30 giây

- Mọi câu cần nghe được **đọc sẵn thành file mp3** bằng giọng Neural của Microsoft Edge (miễn phí, qua thư viện
  `msedge-tts`). Việc này chạy **trên máy** bằng 1 lệnh, rồi file được deploy cùng web (`public/audio/`).
- Lệnh: **`npm run tts:v3`**. Chạy lại bao nhiêu lần cũng được — chỉ tạo file còn thiếu.
- Trang web tính "mã" của câu cần đọc → có file thì phát file; chưa có file (hoặc file lỗi) thì dùng
  giọng đọc của trình duyệt (`speechSynthesis`) đúng ngôn ngữ/giọng gần nhất. Không bao giờ "im lặng".

## 2. Đường đi của 1 câu, từ nội dung đến loa

```
Nội dung: src/content/**
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
public/audio/v3/<mã>.mp3         kiểu v3: giọng riêng (bài nghe v3, câu nghe bài xếp lớp)
public/audio/manifest.json       danh sách mã kiểu cũ
public/audio/manifest-v3.json    mã → { file, kind, voice, rate, durationMs, bytes }
   │
   │  src/services/audio-clip-keys.ts          CÁCH TÍNH MÃ (dùng chung cho script và web)
   ▼
src/services/text-to-speech.ts                 PHÁT: speak, playAudioLine, playSegment…
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

**Hội thoại không ghi `voice`** (VD kịch bản `"Woman: …\nMan: …"` trong đề thi cũ, hoặc `AudioLine` thiếu `voice`):
hàm `resolveLineVoices()` đoán nam/nữ theo tên người nói ("Woman", "Mr Brown", "Linh", "Tom"…). Người không đoán được
nhận giới đang ít người hơn, để 2 người nói luôn nghe khác nhau. Mỗi người 1 giọng: nữ lần lượt Sonia → Natasha → Jenny,
nam lần lượt Ryan → William → Guy.

## 4. Tốc độ đọc

| Hằng số (`SPEECH_RATE`) | Giá trị | Dùng cho |
|---|---|---|
| `normal` | `+0%` | Mọi file |

Trình nghe còn có tốc độ phát 0,75× / 1× / 1,25× (đổi `playbackRate`, không cần file riêng).

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

Không tạo (cố ý): thẻ "Học vui" (`fun-topics`, thêm `--with-fun-topics` nếu muốn), câu hỏi/bài mẫu Speaking,
dịch tiếng Việt của câu ví dụ. Chữ có chỗ điền động (VD tên người học) không tạo sẵn được → trình duyệt đọc.

## 6. "Mã" (key) và tên file

Mã = băm FNV-1a 32-bit → 8 ký tự hex (`hashAudioText`, giữ nguyên từ bản cũ).

- **Mã cũ** = `hashAudioText(câu)`. Giọng tự động: 1 người nói = Sonia; hội thoại = mỗi người 1 giọng. File
  `public/audio/<mã>.mp3`. Nhờ vậy 203 file cũ vẫn dùng được và `speak()` cũ không phải sửa gì.
- **Mã v3** = `hashAudioText("v3|<giọng Edge>|<tốc độ>|<câu>")` → cùng 1 câu nhưng khác giọng / khác tốc độ ra
  mã khác. File `public/audio/v3/<mã>.mp3`.
- **Đoạn nghe** = `hashAudioText("v3-seg|" + từng dòng "<giọng>><chữ>")` — sửa 1 chữ hay đổi giọng 1 dòng là ra mã mới.
- Hai mã khác nhau nhưng đọc **giống hệt** (cùng giọng, tốc độ, chữ) thì dùng chung 1 file — manifest-v3 ghi
  mã → file nên làm được việc này.

Tất cả hàm tính mã ở **`src/services/audio-clip-keys.ts`** — script và web dùng chung, nên luôn khớp nhau.

## 7. Chạy lại

```bash
npm run tts:v3                          # tạo file còn thiếu (cả nội dung mới), cập nhật 2 manifest
npm run tts:v3 -- --dry-run             # chỉ đếm + ước tính dung lượng, không tạo / không ghi gì
npm run tts:v3 -- --only word,example  # chỉ vài loại (tên loại ở mục 5)
npm run tts:v3 -- --limit 20            # thử nhanh 20 file
npm run tts:v3 -- --prune               # xoá file trong public/audio/v3 không còn nội dung nào dùng
npm run tts:v3 -- --concurrency 2       # bớt số việc song song nếu mạng yếu / bị từ chối nhiều
```

Khi nào chạy: sau khi thêm/sửa nội dung có chữ cần nghe; trước khi `npm run deploy`.
In ra cuối: số file tạo mới, dung lượng thư mục, danh sách câu lỗi (bị bỏ qua — **chạy lại lệnh là thử lại**).
Mỗi file được ghi ra file tạm rồi mới đổi tên → tắt ngang giữa chừng không để lại file hỏng.
Bước kiểm tra cuối (mỗi lần chạy) đọc lại MỌI file: < 1 KB, không đọc được khung mp3, hoặc thời lượng ≈ 0 → xoá để lần sau tạo lại.

Thời gian: ~2 100 file mất khoảng 20 phút (≈ 110 file/phút). Các lần sau chỉ vài giây đến vài phút.

`npm run tts` (script cũ `generate-listening-audio.ts`) vẫn còn nhưng **hiện không chạy được** (lỗi 403, xem mục 10)
và không cần nữa: `tts:v3` đã làm hết việc của nó.

## 8. Dùng trong code (cho các nhóm giao diện)

Mọi hàm `play…` trả về **`PlaybackHandle`** và tự dừng âm thanh đang phát trước đó (mỗi lúc chỉ 1 âm thanh).

```ts
import {
  speak, stopSpeaking, playAudioLine, playSegment, getClipInfo, PLAYBACK_RATES,
} from '../services/text-to-speech'
import { segmentKey } from '../services/audio-clip-keys'

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

// --- 1 câu đúng giọng ---
playAudioLine({ text: 'Hello! Shall we practise?', voice: 'gb-female' })

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

## 9. Quy ước cho người soạn nội dung (để có audio đúng)

- Bài nghe v3: mỗi `AudioLine` ghi `speaker` + `voice`. Level-3 trộn `au-*`, `us-*`.
- Số viết như người nói ("oh seven eight…", "twenty-three"), tránh ký hiệu lạ (máy đọc sai).
- Đề thi kiểu cũ: dòng `"Tên: lời thoại"` được đọc nhiều giọng; dùng tên rõ nam/nữ (Woman, Man, Mr…, tên phổ biến).
- Chữ có chỗ điền (`{mascot}`, `{tên}`, `{count}`) không tạo sẵn được → câu đó không có file (trình duyệt đọc).

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
- Cloudflare Pages: tối đa 20 000 file / lần deploy, 25 MB / file. Audio hiện chiếm khoảng 2 100 file.
- Câu tiếng Anh rất dài (> 1 200 ký tự) được cắt theo câu rồi nối lại (máy chủ hay ngắt đoạn quá dài).
- **Cắt lặng cuối câu**: Edge để 0,4–1,3 giây im lặng sau mỗi câu. `trimTrailingSilence()` bỏ các khung lặng ở
  cuối (nhận ra bằng "độ lớn" global_gain < 145 trong side info, không cần giải mã), chừa 200 ms. Chỉ cắt ở CUỐI
  vì mỗi khung mp3 chỉ mượn dữ liệu của khung trước nó. Đã so bằng giải mã thật: vị trí hết tiếng nói không đổi,
  biên độ bị bỏ ≤ 0,001 (không nghe được). Kết quả: 1 từ ~1,0 giây thay vì 1,9 giây; khoảng cách 2 lượt nói
  trong hội thoại ~0,75 giây thay vì ~1,3 giây.
- **Làm sạch ký hiệu trước khi đọc** (`prepareTextForSpeech`): nội dung có ký hiệu để nhìn (`✓ ✗ → ↗ ___ /`) mà máy
  sẽ đọc thành "check mark", "right arrow"… → bỏ / đổi thành ngắt nghỉ / "blank". Mã file vẫn tính từ chữ gốc.
- File nội dung có `import 'react'` (hook) vẫn đọc được: script đóng gói từng file vào `node_modules/.cache/audio-v3-modules/`
  rồi import. File lỗi cú pháp (đang viết dở) chỉ bị bỏ qua và in cảnh báo 1 dòng.
- `manifest-v3.json` ~280 KB thô (nhỏ hơn nhiều khi Cloudflare nén); web tải 1 lần, khi phát âm thanh v3 đầu tiên.

## 11. Số liệu lần tạo gần nhất (29/10/2026, sau khi xoá audio khu trẻ em)

Nguồn: 62 file nội dung (mọi file trong `src/content/` trừ fun-topics), 0 file lỗi.

| Loại | Số file | Thời lượng TB | MB |
|---|---:|---:|---:|
| exam-script | 18 | 119,5 s | 12,3 |
| lesson-audio | 325 | 6,1 s | 11,4 |
| example | 1 245 | 2,9 s | 20,5 |
| word | 218 | 1,0 s | 1,3 |
| lesson-sentence | 245 | 3,2 s | 4,4 |
| listening-segment | 72 | 52,2 s | 21,5 |
| **Tổng** | **2 123 file mp3** (2 051 ở `audio/`, 72 ở `audio/v3/`) | | **~71 MB** |

`manifest-v3.json`: 2 130 mã (7 mã câu xếp lớp dùng chung file với mã cũ).
Kiểm tra: 0 file < 1 KB, 0 file hỏng khung, thời lượng manifest = số khung × 24 ms cho mọi file;
trình duyệt Chromium (headless) tải + giải mã 90 file mẫu (mọi loại) đúng thời lượng, có tiếng (RMS > 0,005);
`playSegment` (tạm dừng, tua, đổi tốc độ, onEnded), `speak`, `stopSpeaking` chạy đúng.
