/**
 * StationSign.tsx — BIỂN HIỆU CỦA 1 TRẠM (chặng) trên đường tuần tra
 * ----------------------------------------------------------------------------
 *   [ảnh 3D chủ đề]  Trạm 3 · 6 bài                     (vòng 3/6)
 *                    Số, giờ và ngày tháng
 *                    <câu can-do đầy đủ — KHÔNG thêm tiền tố>
 * Màu chủ đề của trạm (--station) tô viền trên + nền nhạt + vòng tiến độ.
 * Trạm đã xong mà nằm trước trạm đang học thì gọn lại thành 1 dòng (CompactStationRow).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties } from 'react'
import { Icon } from '../../../design-system/components/Icon'
import { ProgressRing } from '../../../design-system/components/ProgressRing'
import { WordImage } from '../../../design-system/components/WordImage'
import { useLanguage } from '../../../translations/language-context'
import { useLearningPathText } from '../learning-path-text'
import type { PathStation } from '../path-view-model'

export function StationSign({ station, isCurrent, onCollapse }: { station: PathStation; isCurrent: boolean; onCollapse?: () => void }) {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  const style = { '--station': station.color } as CSSProperties
  return (
    <header className={`lp-sign${isCurrent ? ' is-current' : ''}${station.isComplete ? ' is-complete' : ''}`} style={style}>
      <div className="lp-sign__board">
        <div className="lp-sign__icon">
          <WordImage slug={station.unit.icon} word={station.unit.title.en} size={60} decorative />
        </div>
        <div className="lp-sign__text">
          <div className="lp-sign__eyebrow">
            <span className="lp-sign__number">{text.station(station.number)}</span>
            <span aria-hidden>·</span>
            <span>{text.stationLessons(station.total)}</span>
            {isCurrent && <span className="lp-sign__here">{text.stationHere}</span>}
          </div>
          <h2 className="lp-sign__title" id={`station-${station.unit.id}`}>
            {pick(station.unit.title)}
          </h2>
          <p className="lp-sign__cando">{pick(station.unit.canDo)}</p>
        </div>
        <div className="lp-sign__progress">
          <ProgressRing value={station.total ? station.done / station.total : 0} size={58} thickness={6} color={station.isComplete ? 'var(--c-gold)' : 'var(--station)'} label={text.stationProgress(station.done, station.total)}>
            <strong className="lp-sign__count">
              {station.isComplete ? <Icon name="check" size={22} strokeWidth={3} /> : text.stationProgress(station.done, station.total)}
            </strong>
          </ProgressRing>
          {onCollapse && (
            <button type="button" className="lp-sign__collapse" onClick={onCollapse}>
              {text.stationCollapse}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

/** Trạm đã xong (nằm trước trạm đang học): 1 dòng gọn, bấm để mở lại các bài. */
export function CompactStationRow({ station, onExpand }: { station: PathStation; onExpand: () => void }) {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  return (
    <button type="button" className="lp-compact" style={{ '--station': station.color } as CSSProperties} onClick={onExpand} aria-expanded={false}>
      <span className="lp-compact__check" aria-hidden>
        <Icon name="check" size={16} strokeWidth={3.2} />
      </span>
      <WordImage slug={station.unit.icon} word={station.unit.title.en} size={30} decorative />
      <span className="lp-compact__text">
        <span className="lp-compact__number">{text.station(station.number)}</span>
        <span className="lp-compact__title">{pick(station.unit.title)}</span>
      </span>
      <span className="lp-compact__count">{text.stationProgress(station.done, station.total)}</span>
      <span className="lp-compact__more">
        {text.stationExpand}
        <Icon name="chevron-down" size={16} />
      </span>
    </button>
  )
}

/** Nhiều trạm đầu đã xong (≥ 3): gộp thành 1 dòng "Trạm 1–7 đã xong · 40 bài" để trạm đang học nằm gần đầu trang. */
export function DoneStationsGroupRow({ stations, onExpand }: { stations: PathStation[]; onExpand: () => void }) {
  const text = useLearningPathText()
  const lessons = stations.reduce((sum, station) => sum + station.total, 0)
  return (
    <button type="button" className="lp-compact lp-compact--group" onClick={onExpand} aria-expanded={false}>
      <span className="lp-compact__check" aria-hidden>
        <Icon name="check" size={16} strokeWidth={3.2} />
      </span>
      <span className="lp-compact__icons" aria-hidden>
        {stations.slice(0, 5).map((station) => (
          <WordImage key={station.unit.id} slug={station.unit.icon} word={station.unit.title.en} size={26} decorative />
        ))}
      </span>
      <span className="lp-compact__text">
        <span className="lp-compact__title">{text.doneStationsGroup(stations[0].number, stations[stations.length - 1].number)}</span>
      </span>
      <span className="lp-compact__count">{text.doneStationsLessons(lessons)}</span>
      <span className="lp-compact__more">
        {text.stationExpand}
        <Icon name="chevron-down" size={16} />
      </span>
    </button>
  )
}
