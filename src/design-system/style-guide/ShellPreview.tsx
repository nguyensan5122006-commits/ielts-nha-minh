/**
 * ShellPreview.tsx — XEM TRƯỚC KHUNG TRANG 3 CỘT ( /design/shell )
 * ----------------------------------------------------------------------------
 * Dùng <AppShell> thật với dữ liệu GIẢ (không cần đăng nhập) + widget mẫu ở cột
 * phải, để kiểm tra bố cục ở các độ rộng: ≥1280 (3 cột), 1024–1279 (cột phải
 * xuống dưới), <1024 (thanh tab dưới).
 * ----------------------------------------------------------------------------
 */
import { AppShell } from '../../app/layout/AppShell'
import { RightRail } from '../../app/layout/RightRail'
import { Avatar } from '../components/Avatar'
import { Badge } from '../components/Badge'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Icon } from '../components/Icon'
import { LevelBadge } from '../components/LevelBadge'
import { SkillIcon } from '../components/SkillIcon'
import { Tabs } from '../components/Tabs'
import { DemoContinueCard, DemoLeaderboardCard, DemoQuestsCard, DemoStreakGoalCard } from './demo-widgets'
import './StyleGuidePreview.css'

const DEMO_LESSONS = [
  { title: 'Chào hỏi & giới thiệu', skill: 'speaking', state: 'done' },
  { title: 'Số đếm & tuổi', skill: 'listening', state: 'done' },
  { title: 'Gia đình của tôi', skill: 'vocabulary', state: 'current' },
  { title: 'Đọc thư của bạn', skill: 'reading', state: 'locked' },
  { title: 'Viết 3 câu về gia đình', skill: 'writing', state: 'locked' },
] as const

export function ShellPreview() {
  return (
    <AppShell
      account={{ id: 1, displayName: 'Thiên Thảo' }}
      avatar={<Avatar name="Thiên Thảo" emoji="🦊" size={38} online />}
      stats={{ streak: 12, studiedToday: true, level: 7 }}
      unreadChat={3}
      saveStatus="saved"
      onLogout={() => undefined}
      activePath="/learn"
    >
      <RightRail>
        <DemoStreakGoalCard />
        <div style={{ paddingTop: 30 }}>
          <DemoContinueCard />
        </div>
        <DemoLeaderboardCard />
        <DemoQuestsCard />
      </RightRail>

      <div className="pv-learn">
        <Tabs
          label="Chọn lộ trình"
          idPrefix="pv-track"
          value="general"
          onChange={() => undefined}
          items={[
            { id: 'general', label: 'Tiếng Anh tổng quát', icon: '🌏' },
            { id: 'ielts', label: 'Luyện thi IELTS', icon: '🎯' },
          ]}
        />

        <div className="pv-levels">
          <LevelBadge level={1} size={72} state="done" />
          <LevelBadge level={2} size={84} state="current" />
          <LevelBadge level={3} size={72} state="locked" />
          <div className="pv-levels__text">
            <div className="ds-eyebrow">Level 2 · Thành phố</div>
            <h1 className="pv-levels__title">Bạn ở Trạm 3</h1>
            <p className="ds-muted" style={{ margin: 0 }}>
              Còn 2 bài tới mốc · mục tiêu band 6.5
            </p>
          </div>
        </div>

        <Card className="pv-station" padding="lg">
          <div className="pv-station__head">
            <div>
              <div className="ds-eyebrow">Trạm 3</div>
              <h2 className="pv-station__title">Gia đình</h2>
              <p className="ds-muted ds-text-sm" style={{ margin: 0 }}>
                Sau trạm này bạn có thể giới thiệu các thành viên trong gia đình.
              </p>
            </div>
            <Badge tone="primary">2/5</Badge>
          </div>
          <ol className="pv-path">
            {DEMO_LESSONS.map((lesson, index) => (
              <li key={lesson.title} className={`pv-path__item is-${lesson.state}`} style={{ marginLeft: [0, 60, 110, 60, 0][index] }}>
                <span className="pv-node">
                  {lesson.state === 'locked' ? <Icon name="lock" size={22} /> : <SkillIcon skill={lesson.skill} size={40} />}
                  {lesson.state === 'done' && (
                    <span className="pv-node__check">
                      <Icon name="check" size={14} strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="pv-path__label">
                  <strong>{lesson.title}</strong>
                  <span className="ds-muted ds-text-sm">{lesson.state === 'done' ? 'Đã xong' : lesson.state === 'current' ? '5 phút · bài tiếp theo' : 'Chưa mở'}</span>
                </span>
                {lesson.state === 'current' && (
                  <Button size="sm" iconRight="arrow-right">
                    Học tiếp
                  </Button>
                )}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </AppShell>
  )
}
