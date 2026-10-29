/**
 * LearnPage.tsx — TRANG LỘ TRÌNH "TUYẾN TUẦN TRA" (/learn, cũng là trang chủ khi đã đăng nhập)
 * ----------------------------------------------------------------------------
 * Bố cục cột giữa (tối đa 720px):
 *   1. Tiêu đề + nút sang khu Luyện thi IELTS (/ielts) — trang này luôn là track general (29/10)
 *   2. Chọn level: 3 huy hiệu có band + CEFR + tiến độ
 *   3. Dòng trạng thái "Bạn ở Trạm 3 · còn 2 bài tới mốc" + bậc thang band mini
 *   4. Banner mascot ngủ gật (chỉ khi hôm nay chưa học)
 *   5. Đường tuần tra: mỗi chặng = 1 "Trạm" (biển hiệu) + đoạn đường có các nút bài;
 *      trạm đã xong phía trước gọn lại 1 dòng; cuối level là cổng bài kiểm tra.
 *   6. Nút "Học tiếp" nổi ở đáy khi nút bài hiện tại trôi khỏi màn hình.
 * Cột phải: <LearnerRightRail /> (chuỗi + mục tiêu, Học tiếp, cả nhà, Thời điểm vàng, nhiệm vụ).
 *
 * Phím tắt: Enter = Học tiếp (khi không đang gõ / không đứng trên nút khác), Esc = đóng khung xem trước.
 * Level đang xem nằm trên URL (?level=level-2) -> tải lại trang vẫn giữ, gửi link được.
 * ----------------------------------------------------------------------------
 */
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { LEVEL_ORDER } from '../../content/all-levels'
import type { LevelId, TrackId } from '../../content/content-types'
import { levelProgress } from '../../content/path-selectors'
import { Button } from '../../design-system/components/Button'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { LearnerRightRail } from '../right-rail/LearnerRightRail'
import { RailSummaryStrip } from '../right-rail/widgets/RailSummaryStrip'
import { SleepyReminderBanner } from '../right-rail/widgets/SleepyReminderBanner'
import { BandStaircase } from './components/BandStaircase'
import { FloatingContinue } from './components/FloatingContinue'
import { LevelSelector } from './components/LevelSelector'
import { LevelTestGate } from './components/LevelTestGate'
import { StationRoute } from './components/StationRoute'
import { CompactStationRow, DoneStationsGroupRow, StationSign } from './components/StationSign'
import { useLearningPathText } from './learning-path-text'
import { buildPathView, defaultLevelFor, type PathLevelView, type PathStation } from './path-view-model'
import { useElementWidth } from './use-element-width'
import './learning-path.css'

function isLevelId(value: string | null | undefined): value is LevelId {
  return !!value && (LEVEL_ORDER as string[]).includes(value)
}

export function LearnPage() {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const params = useParams<{ levelId?: string }>()
  const [searchParams, setSearchParams] = useSearchParams()

  const track = progress.profile.track
  const requestedLevel = searchParams.get('level') ?? params.levelId
  const viewLevel: LevelId = isLevelId(requestedLevel) ? requestedLevel : defaultLevelFor(track, progress)
  const view = useMemo(() => buildPathView(track, viewLevel, progress), [track, viewLevel, progress])

  const pathRef = useRef<HTMLDivElement>(null)
  const pathWidth = useElementWidth(pathRef)
  const [openNodeId, setOpenNodeId] = useState<string | null>(null)
  // trạm người học tự bấm mở / thu gọn (mặc định: trạm đã xong nằm trước trạm đang học thì gọn)
  const [expandedOverrides, setExpandedOverrides] = useState<Record<string, boolean>>({})
  // ≥ 3 trạm đầu đã xong thì gộp thành 1 dòng "Trạm 1–7 đã xong" (bấm để mở danh sách)
  const [showDoneStations, setShowDoneStations] = useState(false)

  const startLesson = useCallback((lessonId: string) => navigate(`/lesson/${lessonId}`), [navigate])
  const next = view.next

  const changeLevel = useCallback(
    (levelId: LevelId) => {
      setOpenNodeId(null)
      setShowDoneStations(false)
      setSearchParams((current) => {
        const updated = new URLSearchParams(current)
        updated.set('level', levelId)
        return updated
      })
      window.scrollTo({ top: 0, behavior: 'auto' })
    },
    [setSearchParams],
  )

  // Phím Enter = Học tiếp (khi không đứng trên ô nhập / nút / link khác)
  useEffect(() => {
    if (!next) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      const target = event.target as HTMLElement | null
      if (target && target.closest('input, textarea, select, button, a, [contenteditable="true"], [role="dialog"]')) return
      event.preventDefault()
      startLesson(next.lesson.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, startLesson])

  const isExpanded = (stationIndex: number) => {
    const station = view.stations[stationIndex]
    const override = expandedOverrides[station.unit.id]
    if (override !== undefined) return override
    // gọn lại: trạm đã xong mà phía sau còn trạm chưa xong (người học đang ở phía sau)
    return !(station.isComplete && view.stations.slice(stationIndex + 1).some((later) => !later.isComplete))
  }
  const setExpanded = (unitId: string, value: boolean) => setExpandedOverrides((current) => ({ ...current, [unitId]: value }))

  // số trạm đầu tiên đã xong liên tiếp và đang ở dạng gọn -> gộp nếu từ 3 trạm trở lên
  let leadingDone = 0
  while (leadingDone < view.stations.length && !isExpanded(leadingDone) && view.stations[leadingDone].isComplete) leadingDone++
  const groupDone = leadingDone >= 3 && !showDoneStations

  // trạm chứa bài Học tiếp; level đang xem không có bài Học tiếp -> trạm đầu tiên chưa xong
  const currentStationNumber = view.stations.find((station) => station.hasNext)?.number ?? view.currentStationNumber

  return (
    <div className="lp-page" data-track={track}>
      <PathHeader view={view} track={track} onLevelChange={changeLevel} currentStationNumber={currentStationNumber} />
      {/* màn < 1280px: cột phải nằm tận cuối trang -> tóm tắt chuỗi ngày, cả nhà, thẻ đến hạn ở đây */}
      <RailSummaryStrip />

      {next && (
        <SleepyReminderBanner stationNumber={next.unit && view.nextIsHere ? currentStationNumber : null} lessonMinutes={next.lesson.estimatedMinutes} onStart={() => startLesson(next.lesson.id)} />
      )}

      <div className="lp-path" ref={pathRef} data-level={view.levelId}>
        {view.stations.length === 0 && <p className="lp-empty">{text.emptyLevel}</p>}
        {groupDone && (
          <div className="lp-station lp-station--compact">
            <DoneStationsGroupRow stations={view.stations.slice(0, leadingDone)} onExpand={() => setShowDoneStations(true)} />
          </div>
        )}
        {view.stations.map((station, index) => {
          if (groupDone && index < leadingDone) return null
          const expanded = isExpanded(index)
          const isCurrent = station.number === currentStationNumber && view.isUnlocked
          return (
            <Fragment key={station.unit.id}>
              {expanded ? (
                <section className={`lp-station${isCurrent ? ' is-current' : ''}${station.isComplete ? ' is-complete' : ''}`} aria-labelledby={`station-${station.unit.id}`}>
                  <StationSign
                    station={station}
                    isCurrent={isCurrent}
                    onCollapse={station.isComplete && expandedOverrides[station.unit.id] ? () => setExpanded(station.unit.id, false) : undefined}
                  />
                  <StationRoute
                    station={station}
                    stationIndex={index}
                    levelNumber={view.levelNumber}
                    width={pathWidth}
                    openNodeId={openNodeId}
                    onToggleNode={setOpenNodeId}
                    onStartLesson={startLesson}
                  />
                </section>
              ) : (
                <div className="lp-station lp-station--compact">
                  <CompactStationRow station={station} onExpand={() => setExpanded(station.unit.id, true)} />
                </div>
              )}
            </Fragment>
          )
        })}
        {view.stations.length > 0 && <LevelTestGate view={view} onViewLevel={changeLevel} />}

        <FloatingContinue
          lessonId={next?.lesson.id ?? null}
          lessonTitle={next ? pick(next.lesson.title) : ''}
          watchKey={`${track}|${view.levelId}|${Object.keys(expandedOverrides).length}|${showDoneStations}`}
          onContinue={() => next && startLesson(next.lesson.id)}
        />
      </div>

      <LearnerRightRail />
    </div>
  )
}

/* ============================================================================
 * ĐẦU TRANG: tiêu đề + tab track + chọn level + dòng trạng thái + bậc thang band
 * ========================================================================== */

function PathHeader({
  view,
  track,
  onLevelChange,
  currentStationNumber,
}: {
  view: PathLevelView
  track: TrackId
  onLevelChange: (levelId: LevelId) => void
  currentStationNumber: number | null
}) {
  const text = useLearningPathText()
  const { pick } = useLanguage()
  const { progress } = useProgress()
  const learningLevel = progress.currentLevel[track] ?? 'level-1'
  const learningStats = levelProgress(track, learningLevel, progress)
  const { stats, levelNumber } = view
  const milestoneStation = view.stations.find((station) => station.number === currentStationNumber) ?? null

  // dòng trạng thái theo level ĐANG XEM
  let headline: string
  let subline: string
  if (!view.isUnlocked) {
    headline = `${text.levelN(levelNumber)} · ${pick(view.level.title)}`
    subline = text.statusSubLocked(levelNumber - 1)
  } else if (stats.isComplete) {
    headline = text.statusLevelDone(levelNumber)
    subline = text.statusSubDone
  } else if (currentStationNumber) {
    const milestone = stats.nextMilestone
    headline = milestone?.kind === 'level' ? text.statusLineLevelEnd(stats.lessonsToNextMilestone, levelNumber) : text.statusLine(currentStationNumber, stats.lessonsToNextMilestone)
    subline = milestone?.kind === 'level' ? text.statusSubLevelTest : milestone ? text.statusSubUnit(pick(milestone.unit.title)) : ''
  } else {
    headline = text.statusNotStarted
    subline = ''
  }

  return (
    <header className="lp-header">
      <div className="lp-header__top">
        <div className="lp-header__titles">
          <h1 className="lp-header__title">{text.pageTitle}</h1>
          <p className="lp-header__subtitle">{text.pageSubtitle(`${text.levelN(levelNumber)} · ${text.areaNames[levelNumber - 1]}`)}</p>
        </div>
        {/* (29/10) 2 khu học tách hẳn nhau: trang này luôn là Tiếng Anh tổng quát; IELTS ở /ielts */}
        <Button to="/ielts" variant="secondary" size="sm" iconRight="arrow-right" className="lp-header__tabs">
          {text.switchToIelts}
        </Button>
      </div>

      <LevelSelector track={track} value={view.levelId} currentLevel={learningLevel} progress={progress} onChange={onLevelChange} />

      <div className={`lp-status${view.isUnlocked ? '' : ' is-locked'}`}>
        <div className="lp-status__text">
          <p className="lp-status__headline">{headline}</p>
          {subline && <p className="lp-status__sub">{subline}</p>}
          {view.isUnlocked && !stats.isComplete && milestoneStation && <MilestoneSegments station={milestoneStation} />}
        </div>
        <BandStaircase track={track} currentLevel={learningLevel} percentInLevel={learningStats.percent / 100} />
      </div>
    </header>
  )
}

/** Các ô nhỏ = các bài của trạm đang học: vàng = xong, cam = bài Học tiếp, xám = còn lại (thấy mốc gần lắm rồi). */
function MilestoneSegments({ station }: { station: PathStation }) {
  const text = useLearningPathText()
  return (
    <div className="lp-milestone" aria-label={text.stationProgress(station.done, station.total)}>
      {station.nodes.map((node) => (
        <span key={node.summary.id} className={`lp-milestone__seg${node.state === 'next' ? ' is-next' : node.accuracy !== null ? ' is-done' : ''}`} />
      ))}
      <span className="lp-milestone__flag">🏁 {text.station(station.number)}</span>
    </div>
  )
}
