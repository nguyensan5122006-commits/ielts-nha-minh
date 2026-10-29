/**
 * TaskIntro.tsx — MÀN MỞ ĐẦU TASK: CHỌN "LUYỆN TẬP" HAY "THI THẬT" RỒI BẮT ĐẦU
 * ----------------------------------------------------------------------------
 *   <TaskIntro skill="reading" title="…" description="…"
 *     facts={[{ icon: 'exam', text: '13 câu' }, { icon: 'clock', text: '~20 phút' }]}
 *     modes={[{ id: 'practice', title: 'Luyện thoải mái', points: [...] },
 *             { id: 'exam', title: 'Thi thật · 20 phút', points: [...] }]}
 *     mode={mode} onModeChange={setMode}
 *     tip="Đặt mốc: phút 10 xong câu 1–7…"
 *     onStart={start} startLabel="Bắt đầu" onLater={exit} />
 *
 * 04-DESIGN-SYSTEM mục 13: "2 chế độ tách bạch TRƯỚC khi làm". 2 thẻ chọn lớn cạnh nhau
 * (radio), ghi rõ khác nhau ở đâu + thời lượng. Enter = bắt đầu.
 * Có mascot nhỏ (đây vẫn là bài học; trong phòng thi thật thì nhóm thi không truyền mascotPose).
 * ----------------------------------------------------------------------------
 */
import { useEffect, type ReactNode } from 'react'
import type { SkillName } from '../../content/content-types'
import { Button } from '../../design-system/components/Button'
import { Icon, type IconName } from '../../design-system/components/Icon'
import { Kbd } from '../../design-system/components/Kbd'
import { Mascot, type MascotPose } from '../../design-system/components/Mascot'
import './TaskIntro.css'

export interface TaskModeOption<Mode extends string> {
  id: Mode
  title: string
  points: string[]
  icon?: IconName
}

export interface TaskIntroProps<Mode extends string> {
  skill: SkillName
  eyebrow?: string
  title: string
  description?: string
  facts?: { icon: IconName; text: string }[]
  modes?: TaskModeOption<Mode>[]
  mode?: Mode
  onModeChange?: (mode: Mode) => void
  tipTitle?: string
  tip?: string
  /** nội dung thêm dưới mẹo (VD hướng dẫn nghe) */
  children?: ReactNode
  onStart: () => void
  startLabel: string
  onLater?: () => void
  laterLabel?: string
  mascotPose?: MascotPose
  modeGroupLabel?: string
}

export function TaskIntro<Mode extends string>({
  skill,
  eyebrow,
  title,
  description,
  facts = [],
  modes = [],
  mode,
  onModeChange,
  tipTitle,
  tip,
  children,
  onStart,
  startLabel,
  onLater,
  laterLabel,
  mascotPose,
  modeGroupLabel,
}: TaskIntroProps<Mode>) {
  // Enter = bắt đầu (trừ khi đang gõ trong ô nhập)
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement
      // đang đứng ở thẻ chọn chế độ thì Enter vẫn = bắt đầu; nút khác (Để sau…) giữ hành vi riêng
      if (event.key !== 'Enter' || target.closest('input, textarea') || (target.closest('button') && !target.closest('[role="radio"]'))) return
      event.preventDefault()
      onStart()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onStart])

  return (
    <div className={`xintro xintro--${skill}`}>
      <div className="xintro__card">
        <div className="xintro__head">
          <div className="xintro__heading">
            {eyebrow && <p className="xintro__eyebrow">{eyebrow}</p>}
            <h2 className="xintro__title">{title}</h2>
            {description && <p className="xintro__description">{description}</p>}
            {facts.length > 0 && (
              <ul className="xintro__facts">
                {facts.map((fact) => (
                  <li key={fact.text}>
                    <Icon name={fact.icon} size={16} />
                    {fact.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {mascotPose && <Mascot pose={mascotPose} size={112} className="xintro__mascot" />}
        </div>

        {modes.length > 0 && (
          <div className="xintro__modes" role="radiogroup" aria-label={modeGroupLabel}>
            {modes.map((option) => {
              const checked = option.id === mode
              return (
                <button key={option.id} type="button" role="radio" aria-checked={checked} className={checked ? 'xintro__mode is-checked' : 'xintro__mode'} onClick={() => onModeChange?.(option.id)}>
                  <span className="xintro__mode-top">
                    <span className="xintro__radio" aria-hidden />
                    {option.icon && <Icon name={option.icon} size={18} />}
                    <span className="xintro__mode-title">{option.title}</span>
                  </span>
                  <ul className="xintro__mode-points">
                    {option.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </button>
              )
            })}
          </div>
        )}

        {tip && (
          <div className="xintro__tip">
            <Icon name="hint" size={18} />
            <div>
              {tipTitle && <strong>{tipTitle}</strong>}
              <p>{tip}</p>
            </div>
          </div>
        )}
        {children}

        <div className="xintro__actions">
          {onLater && (
            <Button variant="secondary" size="lg" onClick={onLater}>
              {laterLabel}
            </Button>
          )}
          <Button size="lg" iconRight="arrow-right" onClick={onStart}>
            {startLabel}
            <Kbd onColor>Enter</Kbd>
          </Button>
        </div>
      </div>
    </div>
  )
}
