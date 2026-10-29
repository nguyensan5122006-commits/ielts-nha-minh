/**
 * IeltsHomePage.tsx — TRANG CHỦ KHU "LUYỆN THI IELTS" (/ielts)
 * ----------------------------------------------------------------------------
 * Khác hẳn trang Tiếng Anh tổng quát (/english — đường "tuần tra" vui nhộn, mascot, XP):
 * ở đây là một KẾ HOẠCH ÔN THI dạng bảng, gọn và nghiêm túc.
 *   1. Đầu trang: "Kế hoạch luyện thi" + mục tiêu band 6.5 + nút vào phòng thi thử
 *   2. 4 ô band ước tính (Listening / Reading / Writing / Speaking) + % đúng gần đây
 *   3. Dải "Bài tiếp theo trong kế hoạch" (findNextLesson của track IELTS)
 *   4. Tab giai đoạn (= 3 level) -> danh sách MODULE (= chặng của track IELTS, bấm để mở/đóng;
 *      chỉ module đang học mở sẵn),
 *      mỗi module là 1 bảng bài: dạng bài, thời gian, kết quả tốt nhất, nút Làm.
 *   Cột phải: chuỗi ngày + Thời điểm vàng (LearnerRightRail tự ẩn XP / nhiệm vụ ở track IELTS).
 * Dữ liệu chỉ đọc từ useProgress() + path-selectors (không lưu gì riêng).
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState } from 'react'
import { ALL_LEVELS_V3 } from '../../content/all-levels'
import type { LevelId, SkillName } from '../../content/content-types'
import { findNextLesson, isLevelUnlocked, lessonsOfUnit, unitProgress, unitsFor } from '../../content/path-selectors'
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { Card } from '../../design-system/components/Card'
import { Icon } from '../../design-system/components/Icon'
import { ProgressBar } from '../../design-system/components/ProgressBar'
import { SkillIcon } from '../../design-system/components/SkillIcon'
import { Tabs } from '../../design-system/components/Tabs'
import type { LearningProgress } from '../../learning-progress/progress-types'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { LearnerRightRail } from '../right-rail/LearnerRightRail'
import { useIeltsHomeText } from './ielts-home-text'
import './ielts-home.css'

const EXAM_SKILLS: SkillName[] = ['listening', 'reading', 'writing', 'speaking']

export function IeltsHomePage() {
  const text = useIeltsHomeText()
  const { pick } = useLanguage()
  const { progress } = useProgress()
  const [levelId, setLevelId] = useState<LevelId>(() => progress.currentLevel.ielts ?? 'level-1')
  const level = ALL_LEVELS_V3.find((item) => item.id === levelId) ?? ALL_LEVELS_V3[0]
  const unlocked = isLevelUnlocked('ielts', levelId, progress)
  const units = useMemo(() => unitsFor('ielts', levelId), [levelId])
  const next = findNextLesson(progress, 'ielts')

  return (
    <main className="ih-page">
      <LearnerRightRail hide={['continue']} />

      <header className="ih-head">
        <div>
          <p className="ih-head__eyebrow">
            <Icon name="exam" size={16} /> {text.eyebrow}
          </p>
          <h1 className="ih-head__title">{text.title}</h1>
          <p className="ih-head__intro">{text.intro}</p>
        </div>
        <div className="ih-head__side">
          <div className="ih-target">
            <span className="ih-target__label">{text.targetLabel}</span>
            <strong className="ih-target__value">{text.targetBand}</strong>
          </div>
          <Button to="/exams" iconRight="arrow-right">
            {text.mockTest}
          </Button>
          <Button to="/english" variant="ghost" size="sm">
            {text.switchToGeneral}
          </Button>
        </div>
      </header>

      <section aria-label={text.skillsTitle} className="ih-skills">
        {EXAM_SKILLS.map((skill) => (
          <SkillBandCard key={skill} skill={skill} progress={progress} />
        ))}
      </section>

      <Card className="ih-next" padding="md">
        {next ? (
          <>
            <SkillIcon skill={next.lesson.skill} size={44} />
            <div className="ih-next__body">
              <p className="ih-next__label">
                {text.nextTitle}
                {next.reason === 'resume' && (
                  <Badge tone="primary" size="sm">
                    {text.nextResume}
                  </Badge>
                )}
              </p>
              <p className="ih-next__title">{pick(next.lesson.title)}</p>
              <p className="ih-next__meta">
                {text.mode[next.lesson.mode]} · {text.minutes(next.lesson.estimatedMinutes)}
              </p>
            </div>
            <Button to={`/lesson/${next.lesson.id}`} iconRight="arrow-right">
              {text.nextStart}
            </Button>
          </>
        ) : (
          <p className="ih-next__label">{text.allDone}</p>
        )}
      </Card>

      <Tabs<LevelId>
        label={text.levelTabs}
        idPrefix="ih-level"
        value={levelId}
        onChange={setLevelId}
        className="ih-tabs"
        items={ALL_LEVELS_V3.map((item) => ({ id: item.id, label: text.levelTab(item.order, item.bandRange) }))}
      />

      <section role="tabpanel" id={`ih-level-panel-${levelId}`} aria-labelledby={`ih-level-tab-${levelId}`}>
        <p className="ih-level-goal">{pick(level.goals)}</p>
        {!unlocked && (
          <p className="ih-locked">
            <Icon name="lock" size={16} /> {text.locked}
          </p>
        )}
        <ol className="ih-modules">
          {units.map((unit, index) => {
            const stats = unitProgress(unit, progress)
            const lessons = lessonsOfUnit(unit)
            // chỉ mở sẵn module đang học (chứa bài tiếp theo, hoặc module đầu tiên chưa xong) — trang gọn hơn
            const isCurrent = next ? unit.lessonIds.includes(next.lesson.id) : false
            const openByDefault = isCurrent || (!next && index === 0) || (!units.some((u) => next && u.lessonIds.includes(next.lesson.id)) && index === units.findIndex((u) => !unitProgress(u, progress).isComplete))
            return (
              <li key={unit.id}>
                <Card className="ih-module" padding="none">
                  <details open={openByDefault}>
                  <summary className="ih-module__head">
                    <div>
                      <p className="ih-module__label">{text.moduleLabel(index + 1)}</p>
                      <h2 className="ih-module__title">{pick(unit.title)}</h2>
                      <p className="ih-module__cando">{pick(unit.canDo)}</p>
                    </div>
                    <div className="ih-module__progress">
                      <span>{text.moduleProgress(stats.done, stats.total)}</span>
                      <ProgressBar value={stats.done} max={Math.max(1, stats.total)} size="sm" label={text.moduleProgress(stats.done, stats.total)} />
                    </div>
                    <Icon name="chevron-down" size={20} className="ih-module__chevron" />
                  </summary>
                  <table className="ih-table">
                    <thead>
                      <tr>
                        <th scope="col">{text.colLesson}</th>
                        <th scope="col">{text.colType}</th>
                        <th scope="col">{text.colTime}</th>
                        <th scope="col">{text.colResult}</th>
                        <th scope="col">
                          <span className="ih-sr">{text.doLesson}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((lesson) => {
                        const record = progress.lessons[lesson.id]
                        const isNext = next?.lesson.id === lesson.id
                        return (
                          <tr key={lesson.id} className={[record && 'is-done', isNext && 'is-next'].filter(Boolean).join(' ')}>
                            <td>
                              <span className="ih-lesson">
                                <SkillIcon skill={lesson.skill} size={28} />
                                <span>{pick(lesson.title)}</span>
                              </span>
                            </td>
                            <td className="ih-muted">{text.mode[lesson.mode]}</td>
                            <td className="ih-muted">{text.minutes(lesson.estimatedMinutes)}</td>
                            <td>{record ? <strong className="ih-best">{text.best(Math.round(record.bestAccuracy * 100))}</strong> : <span className="ih-muted">{text.notYet}</span>}</td>
                            <td className="ih-action">
                              {unlocked ? (
                                <Button to={`/lesson/${lesson.id}`} size="sm" variant={record ? 'secondary' : isNext ? 'primary' : 'secondary'}>
                                  {record ? text.redoLesson : text.doLesson}
                                </Button>
                              ) : (
                                <span className="ih-muted">{text.lockedShort}</span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  </details>
                </Card>
              </li>
            )
          })}
        </ol>
      </section>
    </main>
  )
}

/* ------------------------------ 1 ô band của 1 kỹ năng ------------------------------ */

function SkillBandCard({ skill, progress }: { skill: SkillName; progress: LearningProgress }) {
  const text = useIeltsHomeText()
  const band = progress.bandEstimates[skill]
  const stat = progress.skillStats[skill]
  const recent = stat?.recent ?? []
  const percent = recent.length ? Math.round((recent.filter((value) => value === 1).length / recent.length) * 100) : null
  return (
    <Card className="ih-skill" padding="sm" accentColor={`var(--skill-${skill})`}>
      <div className="ih-skill__top">
        <SkillIcon skill={skill} size={32} />
        <span className="ih-skill__name">{text.skillName[skill]}</span>
      </div>
      <strong className="ih-skill__band">{band ? text.bandRange(band.low, band.high) : text.noBand}</strong>
      <span className="ih-skill__meta">{percent !== null && stat ? text.accuracy(percent, stat.answered) : text.noAnswers}</span>
    </Card>
  )
}
