/**
 * MilestoneScreen.tsx — MÀN ĂN MỪNG LỚN, CHỈ KHI ĐẠT MỐC
 * ----------------------------------------------------------------------------
 * Mốc (psych-adult D5.20): xong 1 trạm (unit), xong cả level, chuỗi 7 / 30 / 100 ngày.
 * Sau 1 bài tối đa 2 màn ăn mừng: màn này (nếu có mốc) + màn kết quả.
 * Ăn mừng ngắn: pháo giấy 1,2 giây, huy hiệu bay vào; Enter = sang màn kết quả.
 * Lời khen theo QUÁ TRÌNH (đều đặn, hoàn thành) — không "giỏi quá / thiên tài".
 * ----------------------------------------------------------------------------
 */
import { useEffect } from 'react'
import type { LevelId, Unit } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { fireConfetti } from '../../../design-system/components/Confetti'
import { Kbd } from '../../../design-system/components/Kbd'
import { LevelBadge } from '../../../design-system/components/LevelBadge'
import { Mascot } from '../../../design-system/components/Mascot'
import { StreakFlame } from '../../../design-system/components/StreakFlame'
import { WordImage } from '../../../design-system/components/WordImage'
import { playSound } from '../../../design-system/sound-kit'
import { useLanguage } from '../../../translations/language-context'
import { useLessonText } from '../lesson-player-text'

export interface Milestone {
  unit?: Unit
  levelId?: LevelId
  streakDays?: number
}

export function MilestoneScreen({ milestone, onContinue }: { milestone: Milestone; onContinue: () => void }) {
  const text = useLessonText()
  const { pick } = useLanguage()

  useEffect(() => {
    playSound(milestone.levelId ? 'levelUp' : milestone.streakDays ? 'streak' : 'complete')
    fireConfetti({ origin: { x: 0.5, y: 0.32 }, particleCount: 120 })
  }, [milestone])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault()
        onContinue()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onContinue])

  const levelNumber = milestone.levelId ? Number(milestone.levelId.slice(-1)) : 0
  const title = milestone.levelId ? text.milestoneLevelTitle : milestone.unit ? text.milestoneUnitTitle : text.milestoneStreakTitle(milestone.streakDays ?? 0)

  return (
    <div className="lp-milestone" role="dialog" aria-modal="false" aria-label={title}>
      <div className="lp-milestone__art">
        {milestone.levelId ? (
          <LevelBadge level={levelNumber as 1 | 2 | 3} size={168} />
        ) : milestone.unit ? (
          <span className="lp-milestone__station">
            <WordImage slug={milestone.unit.icon} word={milestone.unit.title.en} size={112} decorative />
          </span>
        ) : (
          <StreakFlame count={milestone.streakDays ?? 0} size="lg" celebrateKey={milestone.streakDays} />
        )}
        <Mascot pose="celebrate" size={148} className="lp-milestone__mascot" />
      </div>
      <h1 className="lp-milestone__title">{title}</h1>
      {milestone.unit && <p className="lp-milestone__text">{text.milestoneUnitText(pick(milestone.unit.title))}</p>}
      {milestone.unit && <p className="lp-milestone__cando">{pick(milestone.unit.canDo)}</p>}
      {milestone.streakDays && (milestone.unit || milestone.levelId) ? (
        <p className="lp-milestone__streak">
          <StreakFlame count={milestone.streakDays} size="sm" /> {text.milestoneStreakTitle(milestone.streakDays)}
        </p>
      ) : null}
      {milestone.streakDays && !milestone.unit && !milestone.levelId && <p className="lp-milestone__text">{text.milestoneStreakText}</p>}
      <Button size="lg" onClick={onContinue} iconRight={<Kbd onColor>Enter</Kbd>} autoFocus>
        {text.seeResults}
      </Button>
    </div>
  )
}
