# Khu trẻ em — Hướng dẫn làm trò chơi (động cơ dùng chung)

> Dành cho nhóm làm trò 2–8. Trò 1 **"Nghe và chạm"** (`games/listen-tap/`) đã hoàn chỉnh — là **mẫu để chép cách làm**.
> Đặc tả: `07-KIDS-ZONE.md` · luật tâm lý: `_research/notes/psych-kids.md` mục 12 · dữ liệu: `03-DATA-LAYER.md` mục 9.
> Thư mục: `src/features/kids-zone/` (chủ: nhóm kids-zone). Mỗi trò sống trong `games/<gameId>/` của riêng nhóm mình.

## 1. Bản đồ thư mục

```
src/features/kids-zone/
  kids-routes.tsx            /kids, /kids/play/:gameId, /kids/album, /kids/wardrobe (+ /kids-preview khi dev)
  KidsZoneLayout.tsx         bọc dữ liệu (thật / giả) + bộ đếm giờ chơi
  KidsPlayPage.tsx           tìm trò trong game-registry -> GameRoundShell
  kids-text.ts               chữ giao diện 2 ngôn ngữ: useKidsText()
  kids-zone.css              "thế giới" trời/mây/đồi + class dùng chung kz-*
  kids-data/
    kids-data-context.tsx    useKidsData(): tiến độ bé + hành động (thật / xem thử)
    kids-word-bank.ts        tra từ, chủ đề, ảnh; pickActiveTopic
    kids-rewards.ts          luật sticker + trang phục
    mock-kid-progress.ts     dữ liệu giả cho /kids-preview?scenario=...
  game-engine/               ĐỘNG CƠ DÙNG CHUNG (đừng sửa riêng cho 1 trò — cần gì ghi REQUESTS.md)
    GameRoundShell.tsx       vỏ 1 lượt: giới thiệu từ mới -> câu hỏi -> sticker -> túi đồ -> nhắc nghỉ
    use-round-session.ts     "trọng tài": câu hiện tại, ghi Leitner, sao, khen, câu quay lại cuối lượt
    round-builder.ts         xếp 8–12 câu (từ đến hạn + ≤ 3 từ mới + gặp lại trong lượt)
    answer-options.ts        chọn đáp án nhiễu
    hint-ladder.ts           thang gợi ý 3 bậc (không bao giờ có lần sai thứ 4)
    adaptive-difficulty.ts   độ khó 1/2/3 theo tỉ lệ đúng lần đầu (mục tiêu 75–85%)
    praise-picker.ts         lời khen cụ thể, ≤ 1 lần / 4 câu đúng, không lặp trong buổi
    kids-audio.ts            giọng đọc Anh / Việt (có hẹn giờ dự phòng, không bao giờ kẹt)
    kids-sounds.ts           hiệu ứng (sound-kit của hệ thiết kế) + nốt nhạc cho chữ cái
    use-game-keys.ts         phím 1–4, Enter/Space, R
    use-spoken-line.ts       giọng + phụ đề chạy theo, cờ "đã nghe xong"
    play-time.tsx            đếm giờ chơi thật (rảnh > 60s không đếm) + luật nhắc nghỉ 30 phút
    kids-day-log.ts          mục tiêu 1/2/3 lượt, trần 8 từ mới/ngày (localStorage)
    components/              GameTopBar, MascotCorner, KidsMascot, KidsPicture, CorrectBurst, MascotSays,
                             NewWordIntro, RoundResult, RewardScreens (sticker/trang phục/nhắc nghỉ), SkyWorld
  games/
    game-registry.ts         TỰ TÌM games/*/game-definition.ts (không cần sửa file này)
    listen-tap/              trò 1 (mẫu)
  hub/  album/  wardrobe/    sảnh, sổ sticker, tủ đồ
```

## 2. Thêm 1 trò mới — 4 bước

**Bước 1.** Tạo `games/<gameId>/game-definition.ts`. `gameId` lấy từ kiểu `KidsGameId` trong `src/content/kids` (
`memory-match`, `spell-it`, `balloon-pop`, `sentence-builder`, `colour-command`, `speak-unlock`, `patrol-adventure`).

```ts
import { lazy } from 'react'
import type { KidsGameDefinition } from '../game-registry'

export const gameDefinition: KidsGameDefinition = {
  id: 'spell-it',
  art: ['input-latin-lowercase', 'memo', 'pencil'],   // 3 slug ảnh public/word-images làm bìa thẻ ở sảnh
  accent: 'var(--skill-writing)',                       // màu nhấn thẻ trò
  needsPicture: true,                                   // true = chỉ lấy từ có ảnh; false = cả từ image ''
  skill: { vi: 'chính tả', en: 'spelling' },
  Component: lazy(() => import('./SpellItGame').then((m) => ({ default: m.SpellItGame }))),
}
```
Xong bước này sảnh tự đổi thẻ "Sắp có" thành chơi được, `/kids/play/spell-it` tự chạy. **Không sửa** `game-registry.ts`, `kids-routes.tsx`, `App.tsx`.

**Bước 2.** Viết component nhận `KidsGameProps` (`{ session, onExit }`). Khung tối thiểu:

```tsx
export function SpellItGame({ session, onExit }: KidsGameProps) {
  const mascot = useMascotReaction('thinking')          // pose nghỉ của Ki trong trò này
  const item = session.current
  return (
    <div className="kz-game-screen">                    {/* khung chung: cao 1 màn hình, không cuộn */}
      <GameTopBar doneCount={session.doneCount} totalCount={session.totalCount}
                  firstTryStreak={session.firstTryStreak} onExit={onExit} />
      <main className="kz-game-stage">
        {item && session.stage === 'question' && <SpellQuestion key={item.key} item={item} session={session} onReact={mascot.react} />}
      </main>
      <MascotCorner reaction={mascot.reaction} />
    </div>
  )
}
```
- `session.stage === 'intro'`: vỏ tự hiện thẻ giới thiệu từ mới — trò **không** vẽ câu hỏi lúc đó.
- Đặt `key={item.key}` cho component câu hỏi -> mỗi câu là 1 component mới (trạng thái tự làm lại).
- `session.current === null` (hết câu) -> vỏ tự lo sticker / túi đồ / nhắc nghỉ.

**Bước 3.** Trong câu hỏi, khi bé làm xong (đúng, kể cả đúng sau khi được chỉ đáp án):
```ts
const feedback = session.completeItem({ wrongCount, revealed, responseMs, usedReplay, textHidden })
// feedback.praise      -> lời khen cụ thể (hoặc null) — cho Ki nói + bong bóng
// feedback.comesBack   -> câu sẽ quay lại cuối lượt (bé đã phải xem đáp án)
// ...chạy hiệu ứng đúng (≤ 0,8 giây), đọc từ + nghĩa...
session.advance()   // sang câu sau — GỌI ĐÚNG 1 LẦN mỗi câu
```
Trò **không** gọi `answerWord` / `awardSticker` / `recordRoundEnd` — `useRoundSession` đã làm (ghi Leitner 1 lần / từ / lượt
ở lần xuất hiện cuối, kết quả "tệ nhất"; trao sticker ngay khi từ vừa thuộc; ghi kỷ lục + tem tuần cuối lượt).

**Bước 4.** Chạy `/kids-preview/play/<gameId>` (chỉ khi `npm run dev`, không cần đăng nhập), chụp màn hình, sửa tới khi đẹp.

## 3. Tham chiếu API

### Lượt chơi
| Thứ | Ở đâu | Ghi chú |
|---|---|---|
| `KidsGameProps` | `GameRoundShell.tsx` | `{ session: RoundSession; onExit(): void }` |
| `RoundSession` | `use-round-session.ts` | `plan`, `current: RoundItem \| null`, `stage: 'intro'\|'question'\|'done'`, `doneCount`, `totalCount`, `firstTryStreak`, `recentWordIds`, `completeItem()`, `advance()`, `summary` |
| `RoundPlan` | `engine-types.ts` | `items`, `distractorPool` (cùng chủ đề + từ đã gặp), `newWordIds`, `difficulty` |
| `RoundItem` | `engine-types.ts` | `key` (duy nhất mỗi lần xuất hiện), `word: KidsWord`, `kind: 'new'\|'review'\|'repeat'\|'practice'`, `showIntro` |
| `plan.difficulty` | `adaptive-difficulty.ts` | `{ level: 1\|2\|3, optionCount: 3\|4, hideTextByDefault }` — trò tự diễn giải (VD Bóng bay: số bóng = optionCount + 1) |
| `buildRound(opts)` | `round-builder.ts` | vỏ tự gọi; trò chỉ khai `needsPicture` trong definition |

### Câu trắc nghiệm & gợi ý
```ts
const options = pickAnswerOptions({ target: item.word, pool: plan.distractorPool, count: plan.difficulty.optionCount,
                                    recentWordIds: session.recentWordIds, preferLookAlike: plan.difficulty.level === 3 })
let hint = initialHintState
hint = hintAfterWrongPick(hint, pickedId, options.map((o) => o.id), item.word.id)
// hint.step: 'replay' (đọc lại, không lộ) | 'clue' (loại thêm + manh mối) | 'reveal' (chỉ đáp án, bé bấm lại)
// hint.eliminated: id các đáp án mờ đi — không cho bấm nữa
hint = hintAfterCorrectPick(hint)
session.completeItem({ wrongCount: hint.wrongCount, revealed: hint.step === 'reveal', responseMs })
firstLetterPattern('cat')  // "c _ _"
```
Trò không phải trắc nghiệm (Xếp chữ, Ghép câu…) vẫn dùng đúng 3 bậc: đếm `wrongCount` của riêng mình, bậc 3 = hiện cách làm đúng.

### Âm thanh, giọng, phím
| Hàm | Dùng khi |
|---|---|
| `sayWord(word, { slow? })` | đọc từ tiếng Anh — file mp3 tạo sẵn (slow = bản chậm cho nút 🐢) |
| `sayMeaning(word)` · `saySentence(text)` | nghĩa tiếng Việt của từ (mp3) · câu tiếng Anh (câu ví dụ, lệnh tô màu, lời kể) |
| `sayVoiceLine(getKidsVoiceLine(id)!)` | Ki nói 1 câu trong kho lời thoại (mp3 theo id) |
| `speakSequence([{ kind: 'word'\|'meaning'\|'sentence'\|'line', …, pauseAfterMs? }], onProgress?)` | đọc nối nhau (VD từ -> nghĩa -> lời khen); lượt mới tự huỷ lượt cũ. `{ kind: 'line', id?, text }`: có id -> mp3, không -> giọng máy đọc `text` |
| `preloadWordAudio(words)` | tải trước tiếng các từ của lượt (gọi 1 lần khi trò mở) |
| `stopVoice()` | rời câu / bấm Tiếp khi đang đọc |
| `playSound('correct'\|'oops'\|'tap'\|'pop'\|'flip'\|'sticker'\|'complete'\|'streak'\|'levelUp')` | hiệu ứng (nút tắt tiếng ở thanh trên) |
| `playLetterNote(i)` | 1 nốt nhạc cho chữ cái thứ i (Xếp chữ, Bóng bay chữ…) |
| `useGameKeys({ onChoice, onEnter, onReplay }, active)` | phím `1–4`, `Enter`/`Space`, `R` (Esc do vỏ lo) |
| `useSpokenLine(text)` / `<MascotSays pose text onHeard />` | giọng + phụ đề chạy theo; `onHeard` để bật nút Tiếp sau lần nghe đầu |

Mọi Promise giọng đọc **luôn kết thúc** (có hẹn giờ dự phòng) — có thể `await` an toàn. Bên dưới là `services/text-to-speech.ts`
của nhóm audio (`06-AUDIO.md`): chưa có file mp3 thì tự đọc bằng giọng trình duyệt.

### Thành phần giao diện (game-engine/components)
| Component | Việc |
|---|---|
| `GameTopBar` | thoát · thanh tiến độ ngôi sao + "3 câu đúng liền" · nút riêng (`extra`) · tắt hiệu ứng |
| `MascotCorner` + `useMascotReaction(restingPose)` | Ki góc trái dưới; `react(pose, text, ms)`: đúng=`happy`, sai=`comfort`, gợi ý=`thinking` |
| `KidsMascot` | Ki (ảnh Blender nếu có, chưa có thì Ki vẽ SVG theo pose; `outfitId` = mặc trang phục) |
| `KidsPicture` + `preloadWordImages(slugs)` | ảnh 3D `/word-images/<slug>.webp`, tải trước để thẻ hiện tức thì |
| `CorrectBurst` | bùng sao khi đúng (đặt trong khung `position: relative`) |
| `SkyWorld` | nền trời + đồi (vỏ đã bọc sẵn — trò không cần) |

### Dữ liệu
`useKidsData()` -> `{ kids, kidName, basePath, isPreview, ... }`. Link nội bộ luôn nối từ `basePath` (`/kids` hoặc `/kids-preview`).
Từ / chủ đề: `kids-word-bank.ts` (`findKidsWord`, `topicOfWord`, `hasPicture`, `wordImageUrl`). Lời thoại: `getKidsVoiceLine(id)` (`src/content/kids`).

### CSS dùng chung (`kids-zone.css`, tiền tố `kz-`)
`kz-card` (thẻ vinyl trắng bo 28px) · `kz-glass` (kính mờ trên nền trời) · `kz-chip` (+ `--new` đỏ, `--up` xanh, `--gold`) ·
`kz-choice-row` + `kz-choice` (2 nút **ngang hàng** — bắt buộc cho mọi cặp "chơi tiếp / dừng") · `kz-round-btn` (nút tròn 56px) ·
`kz-toggle` (nút bật/tắt có chữ, VD "Ẩn chữ") · `kz-bubble` · `kz-overlay` · `kz-game-screen` + `kz-game-stage` (khung 1 màn chơi). Biến màu thế giới: `--kz-ink`, `--kz-card-bg`, `--kz-listen`… (tự đổi theo chế độ tối).

## 4. Luật bắt buộc cho mọi trò (kiểm trước khi bàn giao)
- [ ] Phản hồi đúng/sai hiện **≤ 300 ms** sau khi bấm (đổi class ngay trong hàm xử lý, không chờ âm thanh). Hiệu ứng đúng ≤ 0,8 giây.
- [ ] Sai: **không** buzzer, X đỏ, rung, trừ điểm, mất mạng. Dùng `--c-oops` (cam san hô) + `playSound('oops')`. Thang 3 bậc, **không có lần sai thứ 4**.
- [ ] Lời khen chỉ lấy từ `feedback.praise` (đã đúng nhịp ≤ 1/4 câu đúng, cụ thể, không lặp). Không tự viết "giỏi quá / thông minh".
- [ ] Mọi chữ tiếng Anh bấm vào nghe được; có nút nghe lại + 🐢; phím `R`.
- [ ] Nút / vùng bấm ≥ 56px, cách nhau ≥ 8px. Kéo-thả phải có cách "bấm chọn -> bấm đích". Phím `1–4`, `Enter`.
- [ ] Không đồng hồ đếm ngược (trừ chế độ "Đua tốc độ" tuỳ chọn, chưa làm).
- [ ] `prefers-reduced-motion`: tắt bay/nảy/pháo giấy, giữ đổi màu (xem cuối `listen-tap.css`).
- [ ] Chế độ tối: dùng biến `--kz-*`/`--c-*`, không mã màu trắng cứng cho nền thẻ.
- [ ] Đẹp ở 1440×900 **và** 1100×800, không cuộn trong lúc chơi; không vỡ ở 768px.
- [ ] Hướng dẫn tiếng Việt ≤ 12 từ (lấy câu `instruction` trong kho lời thoại nếu có).
- [ ] Sau khi bấm đúng bằng chuột, bỏ focus khỏi nút (`blur()`) hoặc khoá nút -> phím Enter là "Tiếp" (lỗi đã gặp ở trò 1).

## 5. Nhịp thời gian của trò 1 (tham khảo)
`ListenTapGame.tsx` -> hằng `TIMING`: thẻ bay vào lệch nhau 70 ms; tự đọc từ sau 380 ms; sai -> đọc lại sau 420 ms
(chờ thẻ lắc xong); đúng -> giữ ít nhất 1,1 giây, đọc từ + nghĩa (+ khen) rồi nghỉ 0,4 giây mới sang câu; Enter để đi nhanh.
Hiệu ứng đúng: thẻ nảy 1.12 -> 1.06 (520 ms), dấu ✓ bật (420 ms), bùng sao (680 ms), các thẻ khác co lại để thẻ đúng trượt vào giữa,
tia nắng vàng xoay chậm phía sau.

## 6. Chạy thử & kiểm thử
- Dev: `npx vite --port <cổng nhóm> --strictPort`. Xem thử không cần đăng nhập: `/kids-preview`, `/kids-preview/play/<gameId>`,
  thêm `?scenario=default|fresh|tired|outfit` (`default` có 2 từ sắp "thuộc" -> thấy màn sticker; `tired` -> màn nhắc nghỉ;
  `outfit` -> mở trang phục; `fresh` -> bé mới, toàn thẻ giới thiệu từ mới). Dữ liệu xem thử chỉ ở bộ nhớ, tải lại trang là về ban đầu.
- Khi dev, thẻ đáp án đúng có `data-answer="true"` (bản build thật không có) -> script tự chơi: bấm `.lt-card[data-answer]`.
  Trò mới nên làm tương tự để nhóm QA tự động hoá.
- Xoá trạng thái máy: `localStorage` khoá `kids-zone:*` (độ khó, sổ hôm nay, mốc nhắc nghỉ), `sessionStorage` `kids-zone:praise-used`.
- `npx tsc --noEmit -p .` phải sạch cho file của mình.

## 7. Còn để ngỏ (xem thêm REQUESTS.md mục "kids-zone")
- Chế độ "Đua tốc độ" (nền tối neon, 60–90 giây, chỉ từ hộp ≥ 3) — chưa làm.
- Ảnh Ki (pose / trang phục) chưa có -> đang dùng Ki vẽ SVG + phụ kiện 3D. Khi nhóm Blender xuất ảnh đúng tên, tự thay.
- Lời khen có chèn tên từ và câu chào có tên bé chưa có mp3 (đọc bằng giọng máy; máy không có giọng Việt thì chỉ hiện chữ).
- "Thử thách cả nhà" mới hiện phần đóng góp của chính bé (chưa có dữ liệu cả nhà).
