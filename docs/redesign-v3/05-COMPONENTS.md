# Redesign v3 — Thư viện component (hướng dẫn cho các nhóm tính năng)

> Xem trực tiếp mọi component (cả sáng/tối): mở web và vào **`/design`** (không cần đăng nhập).
> Khung 3 cột mẫu: **`/design/shell`** (thêm `?kid=1` để xem menu của bé) · Màn học mẫu: **`/design/focus`**.
> Spec gốc: `04-DESIGN-SYSTEM.md`. File này nói **cách dùng**.

## 0. Nguyên tắc chung

- Import từ **một cửa**: `import { Button, Card, Mascot } from '../../design-system'` (file `src/design-system/index.ts`).
  Khung trang: `import { AppShellRoute, RightRail, FocusLayout } from '../../app/layout'`.
- **CSS chung đã nạp sẵn** (biến màu, font, chuyển động) qua `src/styles/global.css` → `@import '../design-system/index.css'`.
  CSS của mỗi component nằm cạnh file `.tsx` và tự nạp khi import component.
- **Không viết mã màu trực tiếp.** Dùng biến trong `src/design-system/tokens.css`:
  `var(--c-primary)`, `var(--c-ink)`, `var(--c-surface)`, `var(--skill-reading)`, `var(--r-lg)`, `var(--shadow-card)`, `var(--s-4)`…
  Chữ màu trên nền sáng dùng bản **`-ink`** (`--c-primary-ink`, `--c-success-ink`, `--c-oops-ink`…) để đạt tương phản ≥ 4.5:1.
  Chữ TRÊN nút cam: `--c-on-primary` (navy). Chữ trên nền navy: `--c-on-navy`.
- Class của hệ thiết kế bắt đầu bằng `ds-` (không đụng class cũ `.button`, `.card`…).
- Chữ giao diện của hệ thiết kế: `src/design-system/design-system-text.ts` (`useDsText()`). Mỗi nhóm có file chữ riêng (`features/x/x-text.ts`).
- Tên mascot: `MASCOT_NAME` (= "Ki") trong `src/design-system/mascot-name.ts`; trong câu chữ viết `{mascot}` rồi gọi `fillMascotName(text)`.
- Mọi component đã: có vòng focus khi dùng bàn phím, nhãn cho trình đọc màn hình, tôn trọng "giảm chuyển động".

## 1. Khung trang (`src/app/layout/`)

### AppShellRoute / AppShell — khung 3 cột
```tsx
// App.tsx (đã gắn sẵn): mọi trang trong nhóm này tự có sidebar + thanh tab dưới
<Route element={<RequireLogin />}>
  <Route element={<AppShellRoute />}>
    <Route path="/learn" element={<LearnPage />} />
  </Route>
</Route>
```
- ≥ 1280px: sidebar 240 | nội dung | cột phải 340. 1024–1279: cột phải xuống dưới nội dung. < 1024: thanh tab dưới.
- Menu: Học · Ôn tập · Luyện thi · Sân chơi · Chat · Hồ sơ (tài khoản `ageGroup: 'kid'` thấy **Khu vui chơi** đầu tiên). Sửa menu ở `src/app/layout/nav-items.ts`.
- Trang tự đặt lề trong: nội dung chính nên tự giới hạn chiều rộng (VD lộ trình `max-width: 720px; margin: 0 auto`).

### RightRail — đặt widget vào cột phải
```tsx
export function LearnPage() {
  return (
    <>
      <RightRail>
        <StreakGoalWidget />
        <FamilyLeaderboardWidget />
      </RightRail>
      <h1>Lộ trình</h1>
    </>
  )
}
```
Trang không có `<RightRail>` → cột phải tự ẩn. Mỗi widget nên là 1 `<Card>`; các widget cách nhau 16px tự động. Mẫu widget: `src/design-system/style-guide/demo-widgets.tsx`.

### FocusLayout — màn học / thi toàn màn hình
```tsx
<FocusLayout
  onExit={saveAndLeave}                       // nút "Lưu & thoát" + phím Esc
  progress={<ProgressBar value={step} max={total} valueText={`${step}/${total}`} label="Tiến độ bài" />}
  trailing={<Timer secondsLeft={left} />}      // tuỳ chọn
  width="normal"                               // normal 760 · wide 1080 · full
  footer={checked ? <Sheet … /> : <MyActionBar />}
>
  …câu hỏi…
</FocusLayout>
```
Route của màn này đặt **ngoài** `AppShellRoute` (không có sidebar).

## 2. Nút & điều khiển

### Button
```tsx
<Button>Học tiếp</Button>                                   // primary cam (mặc định), md 44px
<Button variant="secondary">Dừng ở đây</Button>             // kem
<Button variant="ghost" iconLeft="hint">Gợi ý</Button>      // chỉ chữ
<Button variant="navy">Vào phòng thi</Button>
<Button variant="danger">Xoá</Button>
<Button size="lg" iconRight={<Kbd onColor>Enter</Kbd>}>Kiểm tra</Button>  // CTA 56px
<Button size="xl">Chơi tiếp</Button>                        // khu trẻ em 64px
<Button to="/learn">Về lộ trình</Button>                    // thành <Link>
<Button loading>Lưu</Button>  <Button fullWidth>…</Button>
```
`iconLeft/iconRight` nhận tên icon (xem `Icon`) hoặc phần tử bất kỳ.

### IconButton — nút tròn chỉ có icon (bắt buộc `label`)
```tsx
<IconButton icon="close" label="Đóng" onClick={close} />
<IconButton icon="flag" label="Báo lỗi câu hỏi" variant="plain" size="sm" />   // trên nền màu
<IconButton icon="star-outline" label="Đánh dấu" pressed={saved} />         // nút bật/tắt
```

### Icon — bộ icon nét tròn tự vẽ
```tsx
<Icon name="learn" />  <Icon name="volume" label="Bật âm thanh" size={24} />
```
Tên có sẵn: learn, review, exam, play, chat, profile, kids, sun, moon, system, volume, volume-off, globe, close, check, exit, arrow-right, retry, chevron-down, chevron-right, flag, play-fill, pause, turtle, clock, eye, eye-off, sparkle, hint, star, star-outline, lock, plus, menu, settings. Thêm icon: sửa `ICON_PATHS` trong `Icon.tsx`.

### Tabs / SegmentedControl
```tsx
<Tabs label="Chọn lộ trình" idPrefix="track" value={track} onChange={setTrack}
  items={[{ id: 'general', label: 'Tiếng Anh tổng quát', icon: '🌏' }, { id: 'ielts', label: 'Luyện thi IELTS', count: 3 }]} />
<div role="tabpanel" id="track-panel-general" aria-labelledby="track-tab-general">…</div>

<Tabs variant="pill" … />                                    // dạng viên thuốc
<SegmentedControl label="Tốc độ" value={rate} onChange={setRate}
  options={[{ value: 0.75, label: '0.75×' }, { value: 1, label: '1×' }, { value: 1.25, label: '1.25×' }]} />
```
Tabs = đổi "trang con"; SegmentedControl = đổi 1 cài đặt. Cả hai dùng được phím ← →.

### Chip / Badge
```tsx
<Chip icon="🍜" selected={topic === 'food'} onClick={() => setTopic('food')}>Đồ ăn</Chip>
<Badge tone="red" variant="solid">Mới</Badge>
<Badge tone="success" icon="check">Đã xong</Badge>   // tone: neutral primary navy olive red gold success oops
```

### LanguageToggle / ThemeToggle / SoundToggle
```tsx
<LanguageToggle />  <LanguageToggle variant="compact" />
<ThemeToggle />     <ThemeToggle variant="compact" />   // sáng · tối · theo máy
<SoundToggle />     <SoundToggle showLabel />
```

### Tooltip / Kbd
```tsx
<Tooltip text="Chuỗi ngày học liên tục"><button>🔥 12</button></Tooltip>
<Kbd>1</Kbd> <Kbd>Enter</Kbd>          // tự ẩn trên màn < 1024px (thường là cảm ứng)
```

## 3. Thẻ & bố cục nội dung

### Card / CardHeader
```tsx
<Card>
  <CardHeader icon={<SkillIcon skill="reading" size={44} />} eyebrow="Kỹ năng" title="Đọc hiểu"
    subtitle="3/6 bài" action={<Badge tone="success">Đang tốt</Badge>} />
  …
</Card>
<Card variant="soft">…</Card>                       // khối phụ, không bóng
<Card variant="outline">…</Card>                    // ô "thêm mới"
<Card accentColor="var(--skill-listening)" to="/lesson/l1">…</Card>   // vạch màu + bấm được
<Card variant="feature" padding="md">               // CTA "Học tiếp": nền cam, chữ navy
  …<Mascot pose="thumbs-up" placement="corner" size={150} />
</Card>
```
Thẻ feature: chừa `padding-right` ~128px cho mascot; mascot cao hơn thẻ sẽ tràn ra khỏi mép trên (đúng ý spec).

### EmptyState / Skeleton
```tsx
<EmptyState pose="thumbs-up" title="Chưa có câu sai nào"
  text="{mascot} sẽ gom các câu bạn làm sai vào đây." action={<Button to="/learn">Học tiếp</Button>} />
<Skeleton variant="text" lines={3} />  <Skeleton variant="rect" height={120} />  <Skeleton variant="circle" width={48} />
```

## 4. Tiến độ & phần thưởng

```tsx
<ProgressBar value={3} max={10} label="Tiến độ bài" valueText="3/10" streakText={streak >= 3 ? `${streak} câu đúng liền!` : undefined} />
<ProgressBar value={60} size="sm" color="var(--skill-reading)" />   // size sm không có đầu ngôi sao
<ProgressRing value={0.7} label="Mục tiêu hôm nay"><strong>14</strong><span>/20 phút</span></ProgressRing>
<StreakFlame count={12} />                // count tăng -> lửa "bùng" + số lật 1 lần
<StreakFlame count={12} active={false} /> // chưa học hôm nay: lửa xám
<XpCounter value={35} size="lg" />        // đếm 0 -> 35
<LevelBadge level={2} state="current" />  // state: default done current locked
<Stepper total={6} current={2} />  <Stepper variant="numbered" current={1} steps={['Mục tiêu', 'Xếp lớp', 'Tài khoản']} />
```
ProgressBar tự lấp lánh khi vượt 50% và 100%. Không cần tự làm hiệu ứng.

## 5. Mascot & ảnh 3D

### Mascot
```tsx
<Mascot pose="salute" placement="hero" size={280} speech="Chào bạn! Mình là {mascot}." />
<Mascot pose="happy" placement="peek-top" size={112} />    // khung cha cần position: relative
<Mascot pose="sleepy" placement="corner" size={150} />     // góc phải-dưới, tràn khỏi mép
<Mascot pose="thinking" size={96} speech="Gợi ý: …" />     // inline + bong bóng
<Mascot pose="salute" size={44} headOnly />                // chỉ cái đầu (logo, avatar)
```
Pose theo tình huống (bắt buộc giữ đúng để người học hiểu "ngôn ngữ" mascot):

| Tình huống | pose |
|---|---|
| Chào, landing, logo | `salute` |
| Đúng / vui | `happy` |
| Sai (an ủi) | `comfort` |
| Gợi ý / câu khó | `thinking` |
| Xong bài, giữ chuỗi | `celebrate` |
| Cổ vũ đầu bài | `thumbs-up` |
| Chưa học hôm nay | `sleepy` |
| Còn câu bỏ trống / ngạc nhiên | `surprised` |
| Kỹ năng | `listening` `reading` `writing` `speaking` |
| Khu trẻ em | `wave` |

Ảnh: `/mascot/poses/<pose>-<256|512|1024>.webp` (tự chọn theo độ nét) → thiếu thì `/mascot/head/head-192.png` → thiếu nữa thì "cún tạm" vẽ bằng CSS. Khung luôn đúng kích thước, không vỡ trang.

### MascotModel — 3D (chỉ landing)
```tsx
<MascotModel size={360} speech="…" />
```
Chỉ tải thư viện `@google/model-viewer` khi file `/mascot/mascot.glb` thật sự tồn tại; nếu không có thì hiện ảnh `salute`.

### SkillIcon / WordImage / LevelBadge / Avatar
```tsx
<SkillIcon skill="listening" size={48} />                    // /art/skills/<skill>-256.webp hoặc ô màu + emoji
<WordImage slug="red-apple" word="apple" size={96} />       // /word-images/<slug>-128.webp -> <slug>.webp -> ô chữ cái
<WordImage slug="🐶" word="dog" />                          // trường icon là emoji -> hiện emoji
<LevelBadge level={1} />                                     // /art/badges/level-1-512.webp hoặc khiên SVG
<Avatar name="Thiên Thảo" emoji="🦊" size={40} ring="gold" online />
```
Avatar mua ở cửa hàng vẫn dùng `PlayerAvatar` cũ (`src/components/PlayerIdentity.tsx`, đã đổi giao diện bằng CSS).

## 6. Phản hồi

### Sheet — khung phản hồi trượt từ đáy (mẫu Mochi, làm lại)
```tsx
<Sheet
  open={checked}
  tone={isRight ? 'success' : 'oops'}          // success | oops | hint | neutral
  title={isRight ? 'Chính xác!' : `Chưa đúng — đáp án: ${answer}`}
  mascotPose={isRight ? 'happy' : 'comfort'}
  primaryAction={{ label: 'Tiếp tục', onClick: next }}     // tự focus -> Enter = Tiếp tục
  secondaryActions={!isRight && <Button variant="ghost" size="sm" iconLeft="sparkle">Hỏi AI vì sao</Button>}
  onReport={openReport}                                    // nút cờ
>
  <p>"every morning" là dấu hiệu thì hiện tại đơn.</p>
</Sheet>
```
Nhịp: khung trượt lên 180ms → mascot ló đầu 350ms sau. Sai dùng cam san hô (`--c-oops`), không tô đỏ. Khi sai, **tô xanh đáp án đúng ngay trong danh sách** (việc của màn bài học). `position="static"` để đặt trong luồng trang (dùng ở `/design`).

### Modal
```tsx
<Modal open={open} onClose={close} title="Còn 2 câu bỏ trống" mascotPose="surprised"
  footer={<><Button variant="secondary" onClick={submit}>Vẫn nộp</Button><Button onClick={close}>Ở lại làm tiếp</Button></>}>
  Bạn có chắc muốn nộp bài không?
</Modal>
```
Esc đóng, Tab không lọt ra ngoài, trả focus về chỗ cũ, khoá cuộn trang sau.

### Toast / Confetti / âm thanh
```tsx
const { showToast } = useToast()
showToast({ icon: '🏅', text: 'Mở khoá huy hiệu!' })

fireConfetti()                         // <= 1.2s, màu thương hiệu, tắt khi "giảm chuyển động"
<Confetti fireKey={finishedCount} />   // bản component

playSound('correct')   // tap correct oops complete streak levelUp sticker flip pop
const { muted, toggleMuted } = useSoundSettings()
```
Âm thanh tự tổng hợp bằng Web Audio (không cần file), âm lượng mặc định thấp, nút tắt tiếng nhớ trong localStorage. Gợi ý gắn âm: chọn đáp án `tap`, đúng `correct`, sai `oops`, xong bài `complete`, giữ chuỗi `streak`, lên level `levelUp`, nhận sticker `sticker`, lật thẻ `flip`.

### AudioButton — loa đọc tiếng Anh
```tsx
<AudioButton text="How are you?" />            // dùng services/text-to-speech.ts (mp3 có sẵn hoặc giọng trình duyệt)
<AudioButton src="/audio/abc.mp3" size="lg" />  // file có sẵn
<AudioButton text="apple" size="sm" showSlow={false} />
```
Nút "rùa" bên cạnh = đọc chậm (0.7×).

### Timer
```tsx
const left = useCountdown(60 * 60, { running: true, onExpire: submit })
<Timer secondsLeft={left} />                    // ẩn được; <= 5 phút đổi màu nhẹ, KHÔNG nhấp nháy
<Timer secondsLeft={left} onDark />             // trên header navy phòng thi
```

## 7. Sáng / tối

- `useTheme()` → `{ preference: 'system'|'light'|'dark', resolvedTheme, setPreference }`. Lưu ở localStorage `ielts-theme`; `index.html` đặt `data-theme` trước khi React chạy (không nháy trắng).
- Trang cài đặt muốn đồng bộ với `progress.profile.theme` thì gọi `setThemePreference(progress.profile.theme)` khi tải tiến độ.
- Ép theme cho 1 khối: `<div data-theme="dark" className="ds-theme-scope">`.

## 8. Trang cũ

Các trang giữ lại (đấu trường, cửa hàng, chat, sự kiện, hồ sơ, phòng thi) **không đổi markup**: `global.css` nối biến cũ (`--color-primary`, `--radius`…) sang biến mới và vẽ lại `.button`, `.card`, `.badge`, `.option-button`, `.toast`, `.modal`… theo kiểu vinyl (mục 1 và mục 10 của `global.css`, mục 13 của `gamification.css`). Lưu ý: `--color-primary` cũ giờ là **navy** (đủ tương phản cho cả chữ lẫn nền chữ trắng); nút chính `.button--primary` được tô cam riêng.

## 9. Tiện ích CSS nhỏ

`ds-stack` (dọc, cách 16px) · `ds-row` (ngang) · `ds-row--between` · `ds-gap-1…7` · `ds-auto-grid` (`--min`) · `ds-eyebrow` · `ds-muted` · `ds-display` · `ds-reading` (bài đọc serif 18px) · `ds-num` (số đều cột) · `ds-visually-hidden` · `ds-kids` (chữ 20px) · hiệu ứng `ds-anim-pop|rise|fade|float|glow|squish|nudge`.
Keyframes dùng chung (motion.css): `ds-slide-up`, `ds-peek-in`, `ds-pop`, `ds-glow-breathe`, `ds-glow-drop`, `ds-shimmer`, `ds-sparkle`, `ds-float`, `ds-flame-burst`, `ds-number-flip`, `ds-nudge`.
