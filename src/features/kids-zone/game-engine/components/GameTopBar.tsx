/**
 * GameTopBar.tsx — THANH TRÊN CÙNG KHI ĐANG CHƠI
 * ----------------------------------------------------------------------------
 *   [✕ thoát]  [=====★------- 3/10]  (nút riêng của trò, VD "Ẩn chữ")  [🔊 hiệu ứng]
 *
 * - Thoát: về sảnh ngay (tiến độ từng câu đã tự lưu) — không hỏi "bạn có chắc?" (không gây áp lực).
 * - Thanh tiến độ dùng ProgressBar của hệ thiết kế: đầu thanh là ngôi sao, lấp lánh ở mốc
 *   50% / 100%, nhãn nhỏ "3 câu đúng liền" khi đúng liên tiếp ≥ 3 câu.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { Icon } from '../../../../design-system/components/Icon'
import { ProgressBar } from '../../../../design-system/components/ProgressBar'
import { useSoundSettings } from '../../../../design-system/sound-kit'
import { useKidsText } from '../../kids-text'
import './GameTopBar.css'

export interface GameTopBarProps {
  doneCount: number
  totalCount: number
  firstTryStreak: number
  onExit: () => void
  /** nút riêng của trò (đặt trước nút âm thanh) */
  extra?: ReactNode
}

export function GameTopBar({ doneCount, totalCount, firstTryStreak, onExit, extra }: GameTopBarProps) {
  const text = useKidsText()
  const sound = useSoundSettings()
  return (
    <header className="kz-topbar">
      <button type="button" className="kz-round-btn" onClick={onExit} aria-label={text.exitGame} title={text.exitGame}>
        <Icon name="close" size={26} />
      </button>
      <div className="kz-topbar__progress">
        <ProgressBar
          value={doneCount}
          max={Math.max(1, totalCount)}
          size="lg"
          label={text.progressLabel}
          valueText={`${Math.min(doneCount, totalCount)}/${totalCount}`}
          streakText={firstTryStreak >= 3 ? text.streakChip(firstTryStreak) : undefined}
          color="linear-gradient(90deg, var(--c-gold), var(--c-primary))"
        />
      </div>
      <div className="kz-topbar__tools">
        {extra}
        <button
          type="button"
          className="kz-round-btn"
          onClick={sound.toggleMuted}
          aria-pressed={sound.muted}
          aria-label={sound.muted ? text.soundOn : text.soundOff}
          title={sound.muted ? text.soundOn : text.soundOff}
        >
          <Icon name={sound.muted ? 'volume-off' : 'volume'} size={24} />
        </button>
      </div>
    </header>
  )
}
