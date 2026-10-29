/**
 * StyleGuidePage.tsx — TRANG "SỔ TAY GIAO DIỆN" SỐNG ( /design )
 * ----------------------------------------------------------------------------
 * Hiện MỌI component của hệ thiết kế với dữ liệu mẫu, ở cả chế độ sáng và tối,
 * để các nhóm làm tính năng xem trước và copy cách dùng.
 *   /design         tất cả component
 *   /design/shell   khung trang 3 cột (AppShell) với widget mẫu ở cột phải
 *   /design/focus   màn học toàn màn hình (FocusLayout) + khung phản hồi
 * Không cần đăng nhập. Dữ liệu ở đây đều là dữ liệu GIẢ.
 * Ảnh mascot / icon 3D chưa có thì thấy "ảnh tạm" — đúng như thiết kế.
 * ----------------------------------------------------------------------------
 */
import { useState, type ReactNode } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { Avatar } from './components/Avatar'
import { AudioButton } from './components/AudioButton'
import { Badge, type BadgeTone } from './components/Badge'
import { Button } from './components/Button'
import { Card, CardHeader } from './components/Card'
import { Chip } from './components/Chip'
import { fireConfetti } from './components/Confetti'
import { EmptyState } from './components/EmptyState'
import { Icon } from './components/Icon'
import { IconButton } from './components/IconButton'
import { Kbd } from './components/Kbd'
import { LanguageToggle } from './components/LanguageToggle'
import { LevelBadge } from './components/LevelBadge'
import { Mascot, MASCOT_POSES } from './components/Mascot'
import { MascotModel } from './components/MascotModel'
import { Modal } from './components/Modal'
import { ProgressBar } from './components/ProgressBar'
import { ProgressRing } from './components/ProgressRing'
import { SegmentedControl } from './components/SegmentedControl'
import { Sheet } from './components/Sheet'
import { SkillIcon } from './components/SkillIcon'
import { Skeleton } from './components/Skeleton'
import { SoundToggle } from './components/SoundToggle'
import { Stepper } from './components/Stepper'
import { StreakFlame } from './components/StreakFlame'
import { Tabs } from './components/Tabs'
import { ThemeToggle } from './components/ThemeToggle'
import { Timer, useCountdown } from './components/Timer'
import { useToast } from './components/Toast'
import { Tooltip } from './components/Tooltip'
import { WordImage } from './components/WordImage'
import { XpCounter } from './components/XpCounter'
import { playSound, SOUND_NAMES } from './sound-kit'
import { DemoContinueCard, DemoStreakGoalCard } from './style-guide/demo-widgets'
import { FocusPreview } from './style-guide/FocusPreview'
import { ShellPreview } from './style-guide/ShellPreview'
import './StyleGuidePage.css'

export function StyleGuidePage() {
  return (
    <Routes>
      <Route index element={<ComponentGallery />} />
      <Route path="shell" element={<ShellPreview />} />
      <Route path="focus" element={<FocusPreview />} />
    </Routes>
  )
}

/* ============================== khung trang /design ============================== */

const SECTIONS = [
  ['colors', 'Màu'],
  ['type', 'Chữ'],
  ['buttons', 'Nút'],
  ['cards', 'Thẻ'],
  ['labels', 'Chip & nhãn'],
  ['progress', 'Tiến độ'],
  ['mascot', 'Mascot'],
  ['media', 'Ảnh & âm thanh'],
  ['feedback', 'Phản hồi'],
  ['navigation', 'Điều hướng'],
  ['states', 'Trạng thái'],
  ['compare', 'Sáng ↔ Tối'],
  ['legacy', 'Trang cũ'],
] as const

function ComponentGallery() {
  return (
    <div className="sg-page">
      <header className="sg-header">
        <div className="sg-header__brand">
          <Mascot pose="salute" size={44} headOnly />
          <div>
            <div className="ds-eyebrow">IELTS Nhà Mình · redesign v3</div>
            <h1 className="sg-header__title">Vinyl Toy UI</h1>
          </div>
        </div>
        <nav className="sg-header__links" aria-label="Trang mẫu">
          <Button to="/design/shell" variant="secondary" size="sm" iconLeft="learn">
            Khung 3 cột
          </Button>
          <Button to="/design/focus" variant="secondary" size="sm" iconLeft="exam">
            Màn học
          </Button>
        </nav>
        <div className="sg-header__toggles">
          <LanguageToggle />
          <ThemeToggle />
          <SoundToggle />
        </div>
      </header>

      <div className="sg-layout">
        <nav className="sg-toc" aria-label="Mục lục">
          {SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <main className="sg-main">
          <ColorsSection />
          <TypeSection />
          <ButtonsSection />
          <CardsSection />
          <LabelsSection />
          <ProgressSection />
          <MascotSection />
          <MediaSection />
          <FeedbackSection />
          <NavigationSection />
          <StatesSection />
          <CompareSection />
          <LegacySection />
        </main>
      </div>
    </div>
  )
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="sg-section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sg-section__title">
        {title}
      </h2>
      {intro && <p className="sg-section__intro">{intro}</p>}
      {children}
    </section>
  )
}

function Demo({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? 'sg-demo sg-demo--wide' : 'sg-demo'}>
      <div className="sg-demo__label">{label}</div>
      <div className="sg-demo__body">{children}</div>
    </div>
  )
}

/* ============================== các mục ============================== */

const COLOR_TOKENS = [
  ['--c-bg', 'nền trang'],
  ['--c-surface', 'thẻ'],
  ['--c-surface-2', 'khối phụ'],
  ['--c-ink', 'chữ chính'],
  ['--c-ink-2', 'chữ phụ'],
  ['--c-line', 'viền'],
  ['--c-primary', 'cam Corgi'],
  ['--c-primary-deep', 'cam đậm'],
  ['--c-primary-soft', 'cam nhạt'],
  ['--c-navy', 'navy'],
  ['--c-olive', 'ô-liu'],
  ['--c-red', 'đỏ ve áo'],
  ['--c-gold', 'vàng cầu vai'],
  ['--c-success', 'đúng'],
  ['--c-success-soft', 'nền đúng'],
  ['--c-oops', 'chưa đúng'],
  ['--c-oops-soft', 'nền chưa đúng'],
] as const
const SKILL_TOKENS = ['listening', 'reading', 'writing', 'speaking', 'vocabulary'] as const

function ColorsSection() {
  return (
    <Section id="colors" title="Màu" intro="Cảm hứng từ chú Corgi cảnh sát: lông cam mật ong + kem, đồng phục ô-liu, ve áo đỏ, cầu vai vàng, đêm tuần tra navy. Chữ trên nút cam dùng navy (6.4:1).">
      <div className="sg-swatches">
        {COLOR_TOKENS.map(([token, name]) => (
          <div key={token} className="sg-swatch">
            <span className="sg-swatch__chip" style={{ background: `var(${token})` }} />
            <span className="sg-swatch__name">{name}</span>
            <code>{token}</code>
          </div>
        ))}
      </div>
      <div className="sg-swatches sg-swatches--skills">
        {SKILL_TOKENS.map((skill) => (
          <div key={skill} className="sg-swatch">
            <span className="sg-swatch__chip" style={{ background: `var(--skill-${skill})` }} />
            <span className="sg-swatch__name">{skill}</span>
            <code>--skill-{skill}</code>
          </div>
        ))}
      </div>
    </Section>
  )
}

function TypeSection() {
  return (
    <Section id="type" title="Chữ" intro="Baloo 2 cho tiêu đề/số/nút · Be Vietnam Pro cho giao diện · Source Serif 4 cho bài đọc dài.">
      <div className="sg-type">
        <div className="sg-type__row">
          <span className="sg-type__meta">60 · Baloo 2 800</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-4xl)', fontWeight: 800, lineHeight: 1 }}>Band 6.5</span>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">44 · Baloo 2</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-3xl)', fontWeight: 800, lineHeight: 1.1 }}>Tuyến tuần tra</span>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">32 · h1</span>
          <h1 style={{ margin: 0 }}>Học tiếng Anh mỗi ngày một chút</h1>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">24 · câu hỏi</span>
          <h2 style={{ margin: 0 }}>He ___ the newspaper every morning.</h2>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">20 · h3</span>
          <h3 style={{ margin: 0 }}>Trạm 3 · Gia đình</h3>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">17 · body</span>
          <p style={{ margin: 0 }}>Bạn nghe ra được số điện thoại rồi đó! Câu sai sẽ quay lại cuối bài để bạn thử lần nữa.</p>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">15 · phụ</span>
          <p className="ds-muted ds-text-sm" style={{ margin: 0 }}>
            5 phút · còn 2 bài tới mốc · tự lưu sau mỗi câu
          </p>
        </div>
        <div className="sg-type__row">
          <span className="sg-type__meta">18 · bài đọc</span>
          <p className="ds-reading" style={{ margin: 0, maxWidth: 640 }}>
            The coastal town had depended on fishing for centuries, yet by the 1990s its harbour was quieter than anyone could remember.
          </p>
        </div>
      </div>
    </Section>
  )
}

function ButtonsSection() {
  const [loading, setLoading] = useState(false)
  return (
    <Section id="buttons" title="Nút" intro="Pill vinyl: gradient sáng trên → đậm dưới, vệt sáng mép trên, bóng cùng tông. Bấm = thu nhỏ 0.97 (không có 'đế dày').">
      <div className="sg-grid">
        <Demo label="Biến thể (md)">
          <Button>Học tiếp</Button>
          <Button variant="secondary">Dừng ở đây</Button>
          <Button variant="ghost" iconLeft="hint">
            Gợi ý
          </Button>
          <Button variant="navy">Vào phòng thi</Button>
          <Button variant="danger">Xoá</Button>
        </Demo>
        <Demo label="Kích thước sm · md · lg · xl (trẻ em)">
          <Button size="sm">Nhỏ</Button>
          <Button size="md">Vừa</Button>
          <Button size="lg" iconRight="arrow-right">
            Bắt đầu học
          </Button>
          <Button size="xl">Chơi tiếp</Button>
        </Demo>
        <Demo label="Có icon · đang tải · khoá · có phím tắt">
          <Button iconLeft="play-fill">Nghe</Button>
          <Button
            variant="secondary"
            loading={loading}
            onClick={() => {
              setLoading(true)
              window.setTimeout(() => setLoading(false), 1500)
            }}
          >
            Lưu bài
          </Button>
          <Button disabled>Kiểm tra</Button>
          <Button size="lg" iconRight={<Kbd onColor>Enter</Kbd>}>
            Kiểm tra
          </Button>
        </Demo>
        <Demo label="IconButton (soft · ghost · primary · bật/tắt)">
          <IconButton icon="close" label="Đóng" />
          <IconButton icon="flag" label="Báo lỗi" variant="ghost" />
          <IconButton icon="play-fill" label="Phát" variant="primary" size="lg" />
          <IconButton icon="star-outline" label="Đánh dấu" pressed />
          <IconButton icon="settings" label="Cài đặt" size="sm" />
        </Demo>
      </div>
    </Section>
  )
}

function CardsSection() {
  return (
    <Section id="cards" title="Thẻ" intro="Nền trắng, viền 1px, bóng mềm 2 lớp. Thẻ 'feature' (CTA Học tiếp) màu cam với mascot tràn ra khỏi mép.">
      <div className="sg-grid sg-grid--cards">
        <Card>
          <CardHeader icon={<SkillIcon skill="reading" size={44} />} eyebrow="Kỹ năng" title="Đọc hiểu" subtitle="3/6 bài · band 4.5–5.0" action={<Badge tone="success">Đang tốt</Badge>} />
          <ProgressBar value={3} max={6} color="var(--skill-reading)" size="sm" label="Đọc hiểu" />
        </Card>
        <Card variant="soft">
          <CardHeader title="Thẻ soft" subtitle="Khối phụ bên trong trang" />
          <p className="ds-muted ds-text-sm" style={{ margin: 0 }}>
            Không có bóng — dùng cho nhóm nội dung phụ.
          </p>
        </Card>
        <Card accentColor="var(--skill-listening)" interactive>
          <CardHeader title="Thẻ bấm được + vạch màu" subtitle="Rê chuột để thấy nổi lên" icon={<SkillIcon skill="listening" size={44} />} />
        </Card>
        <Card variant="outline">
          <div className="ds-center" style={{ minHeight: 96, gap: 8 }}>
            <Icon name="plus" size={24} />
            <span className="ds-muted">Thẻ outline — "thêm mới"</span>
          </div>
        </Card>
        <div style={{ paddingTop: 36 }}>
          <DemoContinueCard />
        </div>
        <DemoStreakGoalCard />
      </div>
    </Section>
  )
}

const BADGE_TONES: BadgeTone[] = ['neutral', 'primary', 'navy', 'olive', 'red', 'gold', 'success', 'oops']

function LabelsSection() {
  const [topic, setTopic] = useState('food')
  return (
    <Section id="labels" title="Chip & nhãn">
      <div className="sg-grid">
        <Demo label="Chip chọn được (bấm thử)">
          {[
            ['food', '🍜', 'Đồ ăn'],
            ['family', '👨‍👩‍👧', 'Gia đình'],
            ['travel', '✈️', 'Du lịch'],
            ['work', '💼', 'Công việc'],
          ].map(([id, icon, label]) => (
            <Chip key={id} icon={icon} selected={topic === id} onClick={() => setTopic(id)}>
              {label}
            </Chip>
          ))}
          <Chip color="var(--skill-listening)" selected size="sm">
            Listening
          </Chip>
        </Demo>
        <Demo label="Badge soft">
          {BADGE_TONES.map((tone) => (
            <Badge key={tone} tone={tone}>
              {tone}
            </Badge>
          ))}
        </Demo>
        <Demo label="Badge solid">
          <Badge tone="red" variant="solid">
            Mới
          </Badge>
          <Badge tone="gold" variant="solid" icon="star">
            +10 XP
          </Badge>
          <Badge tone="success" variant="solid" icon="check">
            Đã xong
          </Badge>
          <Badge tone="navy" variant="solid">
            IELTS
          </Badge>
          <Badge tone="olive" variant="solid">
            Level 1
          </Badge>
          <Badge tone="primary" variant="solid">
            Đang học
          </Badge>
        </Demo>
      </div>
    </Section>
  )
}

function ProgressSection() {
  const [step, setStep] = useState(3)
  const [streak, setStreak] = useState(12)
  const [xpKey, setXpKey] = useState(0)
  const total = 10
  return (
    <Section id="progress" title="Tiến độ" intro="Thanh tiến độ có đầu là huy hiệu ngôi sao; vượt mốc 50% / 100% sẽ lấp lánh. Bấm thử các nút.">
      <div className="sg-grid">
        <Demo label="ProgressBar (bấm + để thấy chuyển động)" wide>
          <div className="ds-stack" style={{ width: '100%' }}>
            <ProgressBar value={step} max={total} label="Tiến độ bài" valueText={`${step}/${total}`} streakText={step >= 7 ? `${step - 4} câu đúng liền!` : undefined} />
            <ProgressBar value={step} max={total} size="lg" color="var(--skill-speaking)" label="Nói" />
            <ProgressBar value={65} size="sm" color="var(--skill-writing)" label="Viết" />
            <div className="ds-row">
              <Button size="sm" variant="secondary" onClick={() => setStep((n) => Math.max(0, n - 1))}>
                −1
              </Button>
              <Button size="sm" onClick={() => setStep((n) => Math.min(total, n + 1))}>
                +1 câu
              </Button>
            </div>
          </div>
        </Demo>
        <Demo label="ProgressRing">
          <ProgressRing value={0.72} label="Độ chính xác 72%">
            <strong>72%</strong>
            <span>chính xác</span>
          </ProgressRing>
          <ProgressRing value={0.4} size={72} color="var(--skill-listening)" label="Nghe 40%">
            <span style={{ fontSize: 22 }}>🎧</span>
          </ProgressRing>
          <ProgressRing value={1} size={56} color="var(--c-success)" label="Xong">
            <Icon name="check" size={22} strokeWidth={3} />
          </ProgressRing>
        </Demo>
        <Demo label="StreakFlame (bấm để giữ chuỗi)">
          <StreakFlame count={streak} size="lg" showLabel />
          <StreakFlame count={streak} />
          <StreakFlame count={3} active={false} />
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setStreak((n) => n + 1)
              playSound('streak')
            }}
          >
            +1 ngày
          </Button>
        </Demo>
        <Demo label="XpCounter (đếm lên)">
          <XpCounter key={xpKey} value={35} size="lg" />
          <XpCounter key={`b${xpKey}`} value={1240} from={1205} showPlus={false} />
          <Button size="sm" variant="ghost" onClick={() => setXpKey((n) => n + 1)}>
            Chạy lại
          </Button>
        </Demo>
        <Demo label="LevelBadge (3 level · đã qua · đang học · khoá)">
          <LevelBadge level={1} state="done" />
          <LevelBadge level={2} state="current" />
          <LevelBadge level={3} state="locked" />
        </Demo>
        <Demo label="Stepper" wide>
          <div className="ds-stack" style={{ width: '100%' }}>
            <Stepper total={6} current={2} />
            <Stepper variant="dots" total={5} current={1} />
            <Stepper variant="numbered" current={1} steps={['Chọn mục tiêu', 'Bài xếp lớp', 'Tạo tài khoản']} />
          </div>
        </Demo>
      </div>
    </Section>
  )
}

function MascotSection() {
  const [peekKey, setPeekKey] = useState(0)
  return (
    <Section id="mascot" title="Mascot" intro="Mỗi tình huống 1 pose cố định. Chưa có ảnh render → 'cún tạm' vẽ bằng CSS (emoji góc dưới cho biết pose), không bao giờ vỡ bố cục.">
      <div className="sg-poses">
        {MASCOT_POSES.map((pose) => (
          <div key={pose} className="sg-pose">
            <Mascot pose={pose} size={104} />
            <code>{pose}</code>
          </div>
        ))}
      </div>
      <div className="sg-grid sg-grid--placements">
        <Demo label="placement='peek-top' (ló đầu lên mép khung)">
          <div className="sg-peek-box" key={peekKey}>
            <Mascot pose="happy" placement="peek-top" size={112} speech="Đúng rồi!" />
            <strong>Chính xác!</strong>
            <p className="ds-muted ds-text-sm" style={{ margin: 0 }}>
              Khung trượt lên trước, 350ms sau mascot mới ló đầu.
            </p>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setPeekKey((n) => n + 1)}>
            Chạy lại
          </Button>
        </Demo>
        <Demo label="placement='corner' (tràn khỏi mép thẻ)">
          <div style={{ paddingTop: 40, width: '100%' }}>
            <Card variant="soft" style={{ minHeight: 120, paddingRight: 150 }}>
              <strong>Nhắc nhẹ</strong>
              <p className="ds-muted ds-text-sm" style={{ margin: 0 }}>
                Hôm nay mình chưa học đó — 5 phút thôi?
              </p>
              <Mascot pose="sleepy" placement="corner" size={156} />
            </Card>
          </div>
        </Demo>
        <Demo label="placement='inline' + bong bóng thoại">
          <Mascot pose="thinking" size={96} speech="{mascot} gợi ý: tìm từ chỉ thời gian trong câu nhé." />
        </Demo>
        <Demo label="placement='hero' (landing) + MascotModel 3D (tự lùi về ảnh khi chưa có .glb)" wide>
          <div className="sg-hero-row">
            <Mascot pose="salute" placement="hero" size={220} speech="Chào bạn! Mình là {mascot}, cùng tuần tra tiếng Anh nhé!" />
            <MascotModel size={240} />
          </div>
        </Demo>
      </div>
    </Section>
  )
}

function MediaSection() {
  return (
    <Section id="media" title="Ảnh & âm thanh" intro="Icon kỹ năng, ảnh từ vựng, huy hiệu đều có ảnh tạm đẹp khi file 3D chưa có.">
      <div className="sg-grid">
        <Demo label="SkillIcon">
          {SKILL_TOKENS.map((skill) => (
            <SkillIcon key={skill} skill={skill} size={56} label={skill} />
          ))}
        </Demo>
        <Demo label="WordImage (ô tạm chữ cái · emoji)">
          <WordImage slug="red-apple" word="apple" size={72} />
          <WordImage slug="school-bus" word="bus" size={72} />
          <WordImage slug="teacher" word="teacher" size={72} />
          <WordImage slug="🐶" word="dog" size={72} />
          <WordImage slug="🌧️" word="rain" size={72} />
        </Demo>
        <Demo label="Avatar">
          <Avatar name="Thiên Thảo" size={48} />
          <Avatar name="Bố Hùng" emoji="🦁" size={48} ring="gold" />
          <Avatar name="Mẹ Lan" emoji="🌸" size={48} online />
          <Avatar name="Bé Na" size={48} ring="primary" online={false} />
          <Avatar name="Ông Tư" emoji="🐢" size={36} ring="olive" />
        </Demo>
        <Demo label="AudioButton (bấm để nghe · rùa = chậm)">
          <AudioButton text="How are you today?" size="lg" />
          <AudioButton text="Nice to meet you." />
          <AudioButton text="apple" size="sm" />
          <AudioButton text="Elephant" size="xl" showSlow={false} />
        </Demo>
        <Demo label="Hiệu ứng âm thanh (Web Audio, không cần file)" wide>
          {SOUND_NAMES.map((name) => (
            <Button key={name} size="sm" variant="secondary" onClick={() => playSound(name)}>
              {name}
            </Button>
          ))}
        </Demo>
      </div>
    </Section>
  )
}

function FeedbackSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [sheetTone, setSheetTone] = useState<'success' | 'oops' | null>(null)
  const { showToast } = useToast()
  return (
    <Section id="feedback" title="Phản hồi" intro="Khung phản hồi kiểu Mochi làm lại: trượt lên 180ms → mascot ló đầu 350ms sau. Sai dùng cam san hô, không tô đỏ chói.">
      <div className="sg-sheet-stack">
        <Sheet
          open
          position="static"
          tone="success"
          title="Chính xác!"
          mascotPose="happy"
          primaryAction={{ label: 'Tiếp tục', onClick: () => playSound('correct') }}
          onReport={() => undefined}
        >
          <p>"already" + "twice" → thì hiện tại hoàn thành: have watched.</p>
        </Sheet>
        <Sheet
          open
          position="static"
          tone="oops"
          title="Chưa đúng — đáp án: reads"
          mascotPose="comfort"
          primaryAction={{ label: 'Tiếp tục', onClick: () => playSound('oops') }}
          secondaryActions={
            <Button variant="ghost" size="sm" iconLeft="sparkle">
              Hỏi AI vì sao
            </Button>
          }
          onReport={() => undefined}
        >
          <p>"every morning" là dấu hiệu thì hiện tại đơn; chủ ngữ "he" số ít → reads.</p>
        </Sheet>
        <Sheet open position="static" tone="hint" title="Gợi ý 1/3" mascotPose="thinking">
          <p>Tìm từ chỉ tần suất trong câu.</p>
        </Sheet>
      </div>
      <div className="sg-grid" style={{ marginTop: 24 }}>
        <Demo label="Mở thật (cố định ở đáy màn hình)">
          <Button
            variant="secondary"
            onClick={() => {
              setSheetTone('success')
              playSound('correct')
            }}
          >
            Sheet đúng
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSheetTone('oops')
              playSound('oops')
            }}
          >
            Sheet sai
          </Button>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Modal + mascot
          </Button>
        </Demo>
        <Demo label="Toast · Confetti · Tooltip · Kbd">
          <Button
            variant="secondary"
            onClick={() => {
              showToast({ icon: '🏅', text: 'Mở khoá huy hiệu "Chăm chỉ"!' })
              playSound('sticker')
            }}
          >
            Toast
          </Button>
          <Button
            onClick={() => {
              fireConfetti()
              playSound('complete')
            }}
          >
            🎉 Confetti
          </Button>
          <Tooltip text="Chuỗi ngày học liên tục">
            <button type="button" className="sg-plain-button">
              <StreakFlame count={12} size="sm" />
            </button>
          </Tooltip>
          <span className="ds-row ds-gap-1">
            <Kbd>1</Kbd>
            <Kbd>2</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
          </span>
        </Demo>
      </div>
      <Sheet
        open={sheetTone !== null}
        tone={sheetTone ?? 'success'}
        title={sheetTone === 'success' ? 'Chính xác!' : 'Chưa đúng — đáp án: have watched'}
        mascotPose={sheetTone === 'success' ? 'happy' : 'comfort'}
        primaryAction={{ label: 'Tiếp tục', onClick: () => setSheetTone(null) }}
        onReport={() => undefined}
      >
        <p>Bấm Enter hoặc nút Tiếp tục để đóng.</p>
      </Sheet>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Còn 2 câu bỏ trống"
        mascotPose="surprised"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Vẫn nộp bài
            </Button>
            <Button onClick={() => setModalOpen(false)}>Ở lại làm tiếp</Button>
          </>
        }
      >
        Bạn có chắc muốn nộp bài không? Câu bỏ trống sẽ được tính là chưa đúng.
      </Modal>
    </Section>
  )
}

function NavigationSection() {
  const [track, setTrack] = useState<'general' | 'ielts'>('general')
  const [view, setView] = useState<'week' | 'all'>('week')
  const [rate, setRate] = useState(1)
  return (
    <Section id="navigation" title="Điều hướng">
      <div className="sg-grid">
        <Demo label="Tabs (← → để chuyển)" wide>
          <Tabs
            label="Chọn lộ trình"
            idPrefix="sg-track"
            value={track}
            onChange={setTrack}
            items={[
              { id: 'general', label: 'Tiếng Anh tổng quát', icon: '🌏' },
              { id: 'ielts', label: 'Luyện thi IELTS', icon: '🎯', count: 3 },
            ]}
          />
        </Demo>
        <Demo label="Tabs dạng pill">
          <Tabs
            label="Bảng xếp hạng"
            idPrefix="sg-board"
            variant="pill"
            value={view}
            onChange={setView}
            items={[
              { id: 'week', label: 'Tuần này' },
              { id: 'all', label: 'Tất cả' },
            ]}
          />
        </Demo>
        <Demo label="SegmentedControl">
          <SegmentedControl
            label="Tốc độ nghe"
            value={rate}
            onChange={setRate}
            options={[
              { value: 0.75, label: '0.75×' },
              { value: 1, label: '1×' },
              { value: 1.25, label: '1.25×' },
            ]}
          />
        </Demo>
        <Demo label="Công tắc ngôn ngữ · giao diện · âm thanh">
          <LanguageToggle />
          <LanguageToggle variant="compact" />
          <ThemeToggle />
          <ThemeToggle variant="compact" />
          <SoundToggle />
          <SoundToggle showLabel />
        </Demo>
      </div>
    </Section>
  )
}

function StatesSection() {
  // bắt đầu từ 5 phút 4 giây -> vài giây sau thấy đồng hồ đổi sang cảnh báo nhẹ
  const secondsLeft = useCountdown(304)
  return (
    <Section id="states" title="Trạng thái">
      <div className="sg-grid">
        <Demo label="Timer (ẩn được · ≤ 5 phút đổi màu nhẹ, không nhấp nháy)">
          <Timer secondsLeft={secondsLeft} />
          <Timer secondsLeft={1520} />
          <div className="sg-dark-strip">
            <Timer secondsLeft={240} onDark />
          </div>
        </Demo>
        <Demo label="Skeleton (đang tải)">
          <div className="ds-row" style={{ width: '100%', alignItems: 'flex-start' }}>
            <Skeleton variant="circle" width={48} />
            <div className="ds-grow">
              <Skeleton variant="text" lines={3} />
            </div>
          </div>
          <Skeleton variant="rect" height={64} />
        </Demo>
        <Demo label="EmptyState" wide>
          <EmptyState pose="thumbs-up" title="Chưa có câu sai nào" text="{mascot} sẽ gom các câu bạn làm sai vào đây để ôn lại." action={<Button to="/design">Học tiếp</Button>} mascotSize={128} />
        </Demo>
      </div>
    </Section>
  )
}

/** Cùng 1 bộ component vẽ 2 lần cạnh nhau: 1 khối ép sáng, 1 khối ép tối */
function CompareSection() {
  return (
    <Section id="compare" title="Sáng ↔ Tối" intro="Hai khối dưới đây ép theme riêng bằng data-theme, không phụ thuộc công tắc ở đầu trang.">
      <div className="sg-compare">
        {(['light', 'dark'] as const).map((theme) => (
          <div key={theme} data-theme={theme} className="ds-theme-scope sg-compare__panel">
            <div className="ds-row ds-row--between">
              <strong className="ds-display" style={{ fontSize: 'var(--fs-lg)' }}>
                {theme === 'light' ? 'Sáng' : 'Tối'}
              </strong>
              <StreakFlame count={12} />
            </div>
            <Card>
              <CardHeader icon={<SkillIcon skill="speaking" size={40} />} title="Nói · Part 2" subtitle="Cue card 60s chuẩn bị" action={<Badge tone="red" variant="solid">Mới</Badge>} />
              <ProgressBar value={6} max={10} valueText="6/10" label="Tiến độ" />
            </Card>
            <div className="ds-row ds-row--wrap">
              <Button>Học tiếp</Button>
              <Button variant="secondary">Dừng ở đây</Button>
              <Chip selected>Đồ ăn</Chip>
              <Badge tone="success" icon="check">
                Đã xong
              </Badge>
            </div>
            <div className="sg-compare__answers">
              <div className="sg-answer is-correct">
                <Kbd>1</Kbd> have watched <Icon name="check" size={18} strokeWidth={3} />
              </div>
              <div className="sg-answer is-oops">
                <Kbd>2</Kbd> watched
              </div>
            </div>
            <Sheet open position="static" tone="oops" title="Chưa đúng — đáp án: have watched" mascotPose="comfort" primaryAction={{ label: 'Tiếp tục', onClick: () => undefined }} />
          </div>
        ))}
      </div>
    </Section>
  )
}

/** Class CSS của trang cũ (KHÔNG đổi markup) sau khi nối biến mới */
function LegacySection() {
  return (
    <Section id="legacy" title="Trang cũ (đã đổi áo)" intro="Các class cũ trong global.css / gamification.css — đấu trường, cửa hàng, chat, thi… tự nhận giao diện mới qua biến CSS.">
      <div className="sg-grid">
        <Demo label=".button">
          <button type="button" className="button button--primary">
            Primary
          </button>
          <button type="button" className="button button--secondary">
            Secondary
          </button>
          <button type="button" className="button button--success">
            Success
          </button>
          <button type="button" className="button button--danger button--small">
            Danger
          </button>
          <button type="button" className="button button--ghost">
            Ghost
          </button>
        </Demo>
        <Demo label=".card · .badge · .progress-bar · .alert">
          <div className="card" style={{ width: '100%' }}>
            <h3>Thẻ cũ</h3>
            <div className="row" style={{ marginBottom: 12 }}>
              <span className="badge badge--primary">primary</span>
              <span className="badge badge--success">success</span>
              <span className="badge badge--error">error</span>
              <span className="badge badge--warning">warning</span>
            </div>
            <div className="progress-bar">
              <div className="progress-bar__fill" style={{ width: '60%' }} />
            </div>
          </div>
          <div className="alert" style={{ width: '100%' }}>
            Sai tên đăng nhập hoặc mật khẩu.
          </div>
          <div className="alert alert--info" style={{ width: '100%' }}>
            Mẹo: bấm Enter để kiểm tra.
          </div>
        </Demo>
        <Demo label=".option-button (chọn · đúng · sai)" wide>
          <div className="option-list" style={{ width: '100%' }}>
            <button type="button" className="option-button is-selected">
              <span className="option-button__key">1</span> is reading
            </button>
            <button type="button" className="option-button is-correct">
              <span className="option-button__key">2</span> reads
            </button>
            <button type="button" className="option-button is-wrong">
              <span className="option-button__key">3</span> read
            </button>
          </div>
        </Demo>
        <Demo label=".text-input · .tab-switch">
          <input className="text-input" placeholder="Tên đăng nhập" />
          <div className="tab-switch">
            <button type="button" className="is-active">
              Tuần này
            </button>
            <button type="button">Tất cả</button>
          </div>
        </Demo>
      </div>
      <p className="ds-muted ds-text-sm" style={{ marginTop: 16 }}>
        <Link to="/login">Mở trang đăng nhập cũ →</Link>
      </p>
    </Section>
  )
}
