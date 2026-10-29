/**
 * LessonPopover.tsx — KHUNG XEM TRƯỚC KHI BẤM VÀO 1 NÚT BÀI HỌC
 * ----------------------------------------------------------------------------
 * Hiện ngay dưới nút: tên bài, kỹ năng, số phút, số câu, tình trạng (đã xong / đang dở /
 * level chưa mở) + 1 nút chính (Học tiếp / Bắt đầu / Học lại / Học thử) + nút Đóng.
 * Bài ở level chưa mở vẫn xem trước được (design system mục 7).
 * Đóng bằng Esc, bấm ra ngoài, hoặc nút Đóng. Mở ra thì focus vào nút chính (dùng bàn phím được).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, type CSSProperties } from 'react'
import { Button } from '../../../design-system/components/Button'
import { SkillPicture } from './ShieldNode'
import { useLanguage } from '../../../translations/language-context'
import { useLearningPathText } from '../learning-path-text'
import type { PathNode } from '../path-view-model'

export interface LessonPopoverProps {
  node: PathNode
  stationNumber: number
  /** vị trí bài trong trạm (0, 1, 2…) và số bài của trạm — để ghi "Bài 3/6" */
  indexInStation: number
  stationTotal: number
  levelNumber: number
  /** vị trí mũi nhọn (tâm nút) trong khung trạm */
  anchor: { x: number; y: number }
  /** bề rộng khung trạm — để popover không tràn ra ngoài */
  containerWidth: number
  onStart: () => void
  onClose: () => void
}

const POPOVER_WIDTH = 300

export function LessonPopover({ node, stationNumber, indexInStation, stationTotal, levelNumber, anchor, containerWidth, onStart, onClose }: LessonPopoverProps) {
  const text = useLearningPathText()
  const boxRef = useRef<HTMLDivElement>(null)
  const { summary, state } = node

  useEffect(() => {
    boxRef.current?.querySelector<HTMLButtonElement>('.lp-popover__actions button')?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    const onPointer = (event: PointerEvent) => {
      const target = event.target as HTMLElement
      // bấm vào chính nút bài thì để nút tự xử lý (bật/tắt)
      if (!boxRef.current?.contains(target) && !target.closest('.lp-node')) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [onClose])

  const left = Math.min(Math.max(anchor.x - POPOVER_WIDTH / 2, 8), containerWidth - POPOVER_WIDTH - 8)
  const style = { left, top: anchor.y + 58, width: POPOVER_WIDTH, '--arrow-x': `${anchor.x - left}px`, '--skill-color': `var(--skill-${summary.skill})` } as CSSProperties

  const primaryLabel = state === 'next' ? text.continue : state === 'done' ? text.redo : state === 'locked' ? text.tryIt : text.start
  const status =
    state === 'done'
      ? text.stateDone(Math.round((node.accuracy ?? 0) * 100))
      : node.isResume
        ? text.stateResume
        : state === 'next'
          ? text.stateNext
          : state === 'locked'
            ? text.stateLocked(levelNumber - 1)
            : text.stateOpen

  return (
    <div ref={boxRef} className={`lp-popover is-${state}`} style={style} role="dialog" aria-label={summary.title.vi} data-testid="lesson-popover">
      <div className="lp-popover__head">
        <span className="lp-popover__icon">
          <SkillPicture skill={summary.skill} size={40} />
        </span>
        <div className="lp-popover__titles">
          <div className="lp-popover__eyebrow">
            {text.station(stationNumber)} · {text.lessonOf(indexInStation + 1, stationTotal)}
          </div>
          <PopoverTitle summary={summary} />
        </div>
      </div>
      <ul className="lp-popover__meta">
        <li className="lp-popover__chip lp-popover__chip--skill">{summary.mode === 'practice' ? text.skills[summary.skill] : text.modes[summary.mode]}</li>
        <li className="lp-popover__chip">{text.aboutMinutes(summary.estimatedMinutes)}</li>
        {summary.exerciseCount > 0 && <li className="lp-popover__chip">{text.exercises(summary.exerciseCount)}</li>}
        {summary.wordCount > 0 && <li className="lp-popover__chip">{text.words(summary.wordCount)}</li>}
      </ul>
      <p className="lp-popover__status">{status}</p>
      <div className="lp-popover__actions">
        <Button variant={state === 'done' || state === 'locked' ? 'secondary' : 'primary'} size="md" iconRight="arrow-right" onClick={onStart} fullWidth>
          {primaryLabel}
        </Button>
        <Button variant="ghost" size="md" onClick={onClose}>
          {text.close}
        </Button>
      </div>
    </div>
  )
}

/** Tên bài: tiếng Việt khi giao diện VI (kèm tên tiếng Anh nhỏ bên dưới), ngược lại chỉ tiếng Anh. */
function PopoverTitle({ summary }: { summary: PathNode['summary'] }) {
  const { language } = useLanguage()
  const isVietnamese = language === 'vi'
  return (
    <>
      <h3 className="lp-popover__title">{isVietnamese ? summary.title.vi : summary.title.en}</h3>
      {isVietnamese && summary.title.en !== summary.title.vi && <div className="lp-popover__subtitle">{summary.title.en}</div>}
    </>
  )
}
