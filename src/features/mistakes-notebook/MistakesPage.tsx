/**
 * MistakesPage.tsx — TRANG /mistakes: SỔ CÂU SAI
 * ----------------------------------------------------------------------------
 * Bố cục:
 *   1. Đầu trang + thanh chuyển khu Ôn tập
 *   2. Thẻ lớn "Ôn lại câu sai" (N câu chờ sửa · khoảng X phút) + vòng "lỗi đã sửa"
 *   3. Lọc: Chưa sửa / Đã sửa / Tất cả + kỹ năng
 *   4. Câu sai NHÓM theo kỹ năng -> theo dạng câu hỏi; mỗi nhóm kỹ năng có nút "Ôn lại các câu này"
 * Lượt luyện (MistakePractice) phủ toàn màn hình. Mở thẳng bằng /mistakes?practice=1
 * (thẻ "Ôn lại N câu sai" ở cuối phiên ôn thẻ).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SkillName } from '../../content/content-types'
import { findNextLesson } from '../../content/path-selectors'
import { SKILL_ORDER } from '../../content/skill-meta'
import { Button } from '../../design-system/components/Button'
import { Card } from '../../design-system/components/Card'
import { Chip } from '../../design-system/components/Chip'
import { EmptyState } from '../../design-system/components/EmptyState'
import { Kbd } from '../../design-system/components/Kbd'
import { Mascot } from '../../design-system/components/Mascot'
import { ProgressRing } from '../../design-system/components/ProgressRing'
import { SkillIcon } from '../../design-system/components/SkillIcon'
import { Tabs } from '../../design-system/components/Tabs'
import { useProgress } from '../../learning-progress/progress-store'
import { ReviewSectionNav } from '../vocabulary-review/shared/ReviewSectionNav'
import { MistakeCard } from './MistakeCard'
import { describeMistake, estimateRetryMinutes, practiceOrder, type MistakeDetails, type QuestionTypeId } from './mistake-lookup'
import { MistakePractice, PRACTICE_ROUND_SIZE } from './mistake-practice/MistakePractice'
import { useMistakesText } from './mistakes-notebook-text'
import '../vocabulary-review/shared/review-shared.css'
import './mistakes-notebook.css'

type StatusFilter = 'open' | 'fixed' | 'all'
/** Mỗi nhóm dạng câu hiện tối đa bấy nhiêu câu trước khi bấm "Xem thêm". */
const CARDS_PER_GROUP = 2

interface TypeGroup {
  type: QuestionTypeId
  items: MistakeDetails[]
}
interface SkillGroup {
  skill: SkillName
  total: number
  open: MistakeDetails[]
  types: TypeGroup[]
}

export function MistakesPage() {
  const text = useMistakesText()
  const [searchParams, setSearchParams] = useSearchParams()
  const { progress, setMistakeResolved } = useProgress()
  const [status, setStatus] = useState<StatusFilter>('open')
  const [skillFilter, setSkillFilter] = useState<SkillName | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [round, setRound] = useState<MistakeDetails[] | null>(null)

  // tra nội dung gốc cho mọi mục lỗi (1 lần mỗi khi sổ thay đổi)
  const allDetails = useMemo(() => progress.mistakes.map(describeMistake), [progress.mistakes])
  const openDetails = useMemo(() => allDetails.filter((details) => !details.mistake.resolved), [allDetails])
  const fixedCount = allDetails.length - openDetails.length

  const startRound = useCallback((list: MistakeDetails[]) => {
    if (list.length) setRound([...list].sort(practiceOrder).slice(0, PRACTICE_ROUND_SIZE))
  }, [])
  const startDefaultRound = useCallback(() => startRound(openDetails), [startRound, openDetails])

  // /mistakes?practice=1 -> mở lượt luyện ngay
  useEffect(() => {
    if (searchParams.get('practice') === '1') {
      startDefaultRound()
      setSearchParams({}, { replace: true })
    }
    // chỉ khi vào trang
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Enter = "Ôn lại câu sai"
  useEffect(() => {
    if (round || openDetails.length === 0) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Enter' || event.target instanceof HTMLButtonElement || event.target instanceof HTMLAnchorElement || event.target instanceof HTMLInputElement) return
      event.preventDefault()
      startDefaultRound()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [round, openDetails.length, startDefaultRound])

  /* ---------- lọc + nhóm ---------- */
  const statusFiltered = useMemo(
    () => allDetails.filter((details) => (status === 'all' ? true : status === 'open' ? !details.mistake.resolved : details.mistake.resolved)),
    [allDetails, status],
  )
  const skillCounts = useMemo(() => {
    const counts = new Map<SkillName, number>()
    for (const details of statusFiltered) counts.set(details.skill, (counts.get(details.skill) ?? 0) + 1)
    return counts
  }, [statusFiltered])
  const groups = useMemo((): SkillGroup[] => {
    const visible = statusFiltered.filter((details) => !skillFilter || details.skill === skillFilter)
    return SKILL_ORDER.map((skill) => {
      const inSkill = visible.filter((details) => details.skill === skill)
      const byType = new Map<QuestionTypeId, MistakeDetails[]>()
      for (const details of inSkill) byType.set(details.questionType, [...(byType.get(details.questionType) ?? []), details])
      return {
        skill,
        total: inSkill.length,
        open: inSkill.filter((details) => !details.mistake.resolved),
        types: [...byType.entries()].map(([type, items]) => ({ type, items })).sort((a, b) => b.items.length - a.items.length),
      }
    }).filter((group) => group.total > 0)
  }, [statusFiltered, skillFilter])

  const toggleExpanded = (key: string) =>
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const header = (
    <header className="review-page__head">
      <div>
        <span className="review-page__eyebrow">{text.eyebrow}</span>
        <h1 className="review-page__title">{text.title}</h1>
        <p className="review-page__intro">{text.intro}</p>
      </div>
      <ReviewSectionNav />
    </header>
  )

  /* ---------- sổ trống ---------- */
  if (allDetails.length === 0) {
    const next = findNextLesson(progress)
    return (
      <main className="review-page">
        {header}
        <Card className="mistakes-empty">
          <EmptyState
            pose="thumbs-up"
            title={text.emptyTitle}
            text={text.emptyText}
            action={
              <Button size="lg" to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
                {text.emptyAction}
              </Button>
            }
          />
        </Card>
      </main>
    )
  }

  const firstRoundSize = Math.min(openDetails.length, PRACTICE_ROUND_SIZE)
  const nextLesson = findNextLesson(progress)

  return (
    <main className="review-page">
      {header}

      {/* ---------- thẻ lớn "Ôn lại câu sai" ---------- */}
      <section className={`mistakes-hero${openDetails.length ? '' : ' is-clear'}`}>
        <div className="mistakes-hero__body">
          {openDetails.length > 0 ? (
            <>
              <h2 className="mistakes-hero__title">{text.heroOpen(openDetails.length)}</h2>
              <p className="mistakes-hero__meta">
                {text.heroMinutes(estimateRetryMinutes(firstRoundSize))} · {text.heroRoundNote(PRACTICE_ROUND_SIZE)}
              </p>
              <div className="mistakes-hero__skills">
                {SKILL_ORDER.filter((skill) => openDetails.some((details) => details.skill === skill)).map((skill) => (
                  <span key={skill} className="mistakes-hero__skill">
                    <SkillIcon skill={skill} size={22} />
                    {text.skillName[skill]} <strong>{openDetails.filter((details) => details.skill === skill).length}</strong>
                  </span>
                ))}
              </div>
              <div className="mistakes-hero__actions">
                <Button size="lg" iconLeft="review" onClick={startDefaultRound} iconRight={<Kbd onColor>Enter</Kbd>}>
                  {text.practiceCta}
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="mistakes-hero__title">{text.allFixedTitle}</h2>
              <p className="mistakes-hero__meta">{text.allFixedText}</p>
              <div className="mistakes-hero__actions">
                <Button size="lg" to={nextLesson ? `/lesson/${nextLesson.lesson.id}` : '/learn'} iconRight="arrow-right">
                  {text.emptyAction}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="mistakes-hero__progress">
          <ProgressRing value={allDetails.length ? fixedCount / allDetails.length : 0} size={132} thickness={12} color="var(--c-success)" label={text.fixedRingLabel(fixedCount, allDetails.length)}>
            <span className="mistakes-hero__ring">
              <strong>{fixedCount}</strong>
              <span>/{allDetails.length}</span>
            </span>
          </ProgressRing>
          <span className="mistakes-hero__fixed-label">{text.fixedCount(fixedCount)}</span>
        </div>
        <Mascot pose={openDetails.length ? 'thinking' : 'celebrate'} size={150} className="mistakes-hero__mascot" />
      </section>

      {/* ---------- lọc ---------- */}
      <div className="mistakes-filters">
        <Tabs
          variant="pill"
          label={text.statusTabsLabel}
          idPrefix="mistake-status"
          value={status}
          onChange={(value) => setStatus(value as StatusFilter)}
          items={[
            { id: 'open', label: text.tabOpen, count: openDetails.length },
            { id: 'fixed', label: text.tabFixed, count: fixedCount },
            { id: 'all', label: text.tabAll, count: allDetails.length },
          ]}
        />
        <div className="mistakes-filters__skills" role="group" aria-label={text.skillFilterLabel}>
          <Chip size="sm" selected={skillFilter === null} onClick={() => setSkillFilter(null)}>
            {text.allSkills}
          </Chip>
          {SKILL_ORDER.filter((skill) => skillCounts.has(skill)).map((skill) => (
            <Chip
              key={skill}
              size="sm"
              selected={skillFilter === skill}
              onClick={() => setSkillFilter(skillFilter === skill ? null : skill)}
              icon={<SkillIcon skill={skill} size={20} />}
              color={`var(--skill-${skill})`}
            >
              {text.skillName[skill]} · {skillCounts.get(skill)}
            </Chip>
          ))}
        </div>
      </div>

      {/* ---------- danh sách theo kỹ năng -> dạng câu ---------- */}
      <div role="tabpanel" id={`mistake-status-panel-${status}`} aria-labelledby={`mistake-status-tab-${status}`}>
        {groups.length === 0 ? (
          <Card className="mistakes-empty">
            <EmptyState
              pose="happy"
              mascotSize={120}
              title={text.emptyFilterTitle}
              text={text.emptyFilterText}
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setStatus('all')
                    setSkillFilter(null)
                  }}
                >
                  {text.clearFilters}
                </Button>
              }
            />
          </Card>
        ) : (
          groups.map((group) => (
            <section key={group.skill} className="mistake-skill" style={{ '--group-color': `var(--skill-${group.skill})` } as CSSProperties}>
              <header className="mistake-skill__head">
                <SkillIcon skill={group.skill} size={44} />
                <div className="mistake-skill__titles">
                  <h2>{text.skillName[group.skill]}</h2>
                  <span>{text.questionsCount(group.total)}</span>
                </div>
                {group.open.length > 0 && (
                  <Button variant="secondary" size="sm" iconLeft="review" onClick={() => startRound(group.open)}>
                    {text.practiceCta} ({Math.min(group.open.length, PRACTICE_ROUND_SIZE)})
                  </Button>
                )}
              </header>
              {group.types.map((typeGroup) => {
                const groupKey = `${group.skill}:${typeGroup.type}`
                const showAll = expanded.has(groupKey)
                const visible = showAll ? typeGroup.items : typeGroup.items.slice(0, CARDS_PER_GROUP)
                return (
                  <div key={typeGroup.type} className="mistake-type">
                    <h3 className="mistake-type__title">
                      {text.questionTypeName[typeGroup.type]} <span>{typeGroup.items.length}</span>
                    </h3>
                    <div className="mistake-type__grid">
                      {visible.map((details) => (
                        <MistakeCard
                          key={details.mistake.id}
                          details={details}
                          onRetry={() => startRound([details])}
                          onToggleResolved={() => setMistakeResolved(details.mistake.id, !details.mistake.resolved)}
                        />
                      ))}
                    </div>
                    {typeGroup.items.length > CARDS_PER_GROUP && (
                      <Button variant="ghost" size="sm" iconRight={showAll ? 'chevron-down' : 'chevron-right'} onClick={() => toggleExpanded(groupKey)} className="mistake-type__more">
                        {showAll ? text.showLess : text.showMore(typeGroup.items.length - CARDS_PER_GROUP)}
                      </Button>
                    )}
                  </div>
                )
              })}
            </section>
          ))
        )}
      </div>

      {round && <MistakePractice key={round.map((details) => details.mistake.id).join(',')} round={round} onClose={() => setRound(null)} onStartRound={startRound} />}
    </main>
  )
}
