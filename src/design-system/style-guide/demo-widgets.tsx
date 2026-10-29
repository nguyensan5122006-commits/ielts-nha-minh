/**
 * demo-widgets.tsx — WIDGET MẪU cho trang /design (dữ liệu giả)
 * ----------------------------------------------------------------------------
 * Đây CHỈ là bản mẫu để xem giao diện cột phải / thẻ "Học tiếp" trông thế nào.
 * Nhóm learning-path sẽ làm widget thật (nối dữ liệu tiến độ) theo đúng kiểu này.
 * ----------------------------------------------------------------------------
 */
import { Avatar } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card, CardHeader } from '../components/Card'
import { Icon } from '../components/Icon'
import { Mascot } from '../components/Mascot'
import { ProgressBar } from '../components/ProgressBar'
import { ProgressRing } from '../components/ProgressRing'
import { SkillIcon } from '../components/SkillIcon'
import { StreakFlame } from '../components/StreakFlame'

export const DEMO_FAMILY = [
  { name: 'Thiên Thảo', emoji: '🦊', xp: 1240, me: true },
  { name: 'Bố Hùng', emoji: '🦁', xp: 1185 },
  { name: 'Mẹ Lan', emoji: '🌸', xp: 960 },
  { name: 'Bé Na', emoji: '🐰', xp: 720 },
  { name: 'Ông Tư', emoji: '🐢', xp: 310 },
]

/** Thẻ chuỗi ngày + vòng mục tiêu ngày */
export function DemoStreakGoalCard() {
  return (
    <Card padding="md">
      <div className="sg-streak-goal">
        <ProgressRing value={0.7} size={92} label="Mục tiêu hôm nay: 14/20 phút">
          <strong>14</strong>
          <span>/20 phút</span>
        </ProgressRing>
        <div className="sg-streak-goal__text">
          <StreakFlame count={12} size="lg" />
          <div className="ds-muted ds-text-sm">ngày liên tiếp</div>
          <div className="ds-text-sm">Còn 6 phút là đạt mục tiêu hôm nay</div>
        </div>
      </div>
    </Card>
  )
}

/** Thẻ CTA "Học tiếp" — nền cam, mascot tràn ra khỏi mép */
export function DemoContinueCard() {
  return (
    <Card variant="feature" padding="md" className="sg-continue">
      <div className="ds-eyebrow">Bài tiếp theo · Trạm 3</div>
      <h3 className="sg-continue__title">Talking about family</h3>
      <div className="ds-text-sm sg-continue__meta">5 phút · còn 2 bài tới mốc</div>
      <Button variant="navy" size="md" iconRight="arrow-right">
        Học tiếp
      </Button>
      <Mascot pose="thumbs-up" placement="corner" size={150} />
    </Card>
  )
}

/** Bảng xếp hạng gia đình top 5 */
export function DemoLeaderboardCard() {
  return (
    <Card padding="md">
      <CardHeader title="Gia đình tuần này" subtitle="Xếp theo XP" action={<Badge tone="gold" icon="star">Tuần 44</Badge>} />
      <ol className="sg-board">
        {DEMO_FAMILY.map((member, index) => (
          <li key={member.name} className={member.me ? 'sg-board__row is-me' : 'sg-board__row'}>
            <span className="sg-board__rank">{index + 1}</span>
            <Avatar name={member.name} emoji={member.emoji} size={36} ring={index === 0 ? 'gold' : 'none'} />
            <span className="sg-board__name">{member.name}</span>
            <span className="sg-board__xp ds-num">{member.xp.toLocaleString('vi-VN')}</span>
          </li>
        ))}
      </ol>
    </Card>
  )
}

/** "Thời điểm vàng" ôn từ + nhiệm vụ ngày */
export function DemoQuestsCard() {
  return (
    <Card padding="md">
      <CardHeader title="Nhiệm vụ hôm nay" icon={<SkillIcon skill="vocabulary" size={40} />} />
      <div className="ds-stack ds-gap-3">
        <div>
          <div className="ds-row ds-row--between ds-text-sm">
            <span>Ôn 12 từ đến hạn</span>
            <span className="ds-muted ds-num">8/12</span>
          </div>
          <ProgressBar value={8} max={12} size="sm" color="var(--skill-vocabulary)" label="Ôn từ" />
        </div>
        <div>
          <div className="ds-row ds-row--between ds-text-sm">
            <span>Nghe 1 đoạn hội thoại</span>
            <Icon name="check" size={18} className="sg-done-icon" label="Đã xong" />
          </div>
          <ProgressBar value={1} max={1} size="sm" color="var(--skill-listening)" label="Nghe" />
        </div>
      </div>
    </Card>
  )
}
