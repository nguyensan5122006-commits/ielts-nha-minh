/**
 * WordsPage.tsx — TRANG /words: SỔ TỪ VỰNG
 * ----------------------------------------------------------------------------
 * Bố cục:
 *   1. Đầu trang + thanh chuyển khu Ôn tập
 *   2. Dải "phân bố 5 cấp độ nhớ" (thanh xếp chồng) + 6 nút lọc: Tất cả · Mới gặp … Khắc sâu
 *      + nút chính "Ôn N từ đến hạn"
 *   3. Thanh công cụ: tìm kiếm · kỹ năng · chặng · sắp xếp
 *   4. Lưới ô từ (ảnh 3D, loa, nghĩa, độ nhớ, trạng thái) — hiện 48 ô/lần, "Xem thêm"
 * Bộ lọc cấp độ đọc từ URL (?level=3) để /review bấm cột là mở đúng nhóm từ.
 * Trống: mascot + 1 câu + 1 nút (EmptyState).
 * ----------------------------------------------------------------------------
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { SkillName } from '../../../content/content-types'
import { SKILL_ORDER } from '../../../content/skill-meta'
import { findNextLesson } from '../../../content/path-selectors'
import { Button } from '../../../design-system/components/Button'
import { Card } from '../../../design-system/components/Card'
import { Chip } from '../../../design-system/components/Chip'
import { EmptyState } from '../../../design-system/components/EmptyState'
import { SkillIcon } from '../../../design-system/components/SkillIcon'
import { dueCards } from '../../../learning-progress/fsrs-scheduler'
import { useProgress } from '../../../learning-progress/progress-store'
import { useLanguage } from '../../../translations/language-context'
import { useMistakesText } from '../../mistakes-notebook/mistakes-notebook-text'
import { MEMORY_LEVELS, type MemoryLevel } from '../memory-levels'
import { ReviewSectionNav } from '../shared/ReviewSectionNav'
import { useReviewText } from '../vocabulary-review-text'
import { WordCard, WordDetailModal } from './WordCard'
import { collectWordEntries, filterWordEntries, sortWordEntries, type WordEntry, type WordSort } from './word-entries'
import '../shared/review-shared.css'
import './words-notebook.css'

const PAGE_SIZE = 48

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}

export function WordsPage() {
  const text = useReviewText()
  const skillText = useMistakesText()
  const { pick } = useLanguage()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { progress } = useProgress()
  const now = useMemo(() => new Date(), [progress])

  const levelParam = Number(searchParams.get('level'))
  const level: MemoryLevel | null = MEMORY_LEVELS.includes(levelParam as MemoryLevel) ? (levelParam as MemoryLevel) : null
  const [skill, setSkill] = useState<SkillName | null>(null)
  const [unitId, setUnitId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<WordSort>('due')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [openKey, setOpenKey] = useState<string | null>(null)

  // từ đến hạn THEO hàng ôn hôm nay (đã áp giới hạn từ mới / ngày của tầng dữ liệu)
  const dueWordKeys = useMemo(() => dueCards(progress, now).filter((item) => item.key.startsWith('word:')).map((item) => item.key), [progress, now])
  const entries = useMemo(() => {
    // (QA) Từ MỚI đã tới ngày nhưng hôm nay hết lượt từ mới -> chưa phải "Đến hạn" (khớp dòng
    // "Không có từ nào đến hạn" ở đầu trang); nó sẽ vào hàng ôn của ngày mai.
    const dueSet = new Set(dueWordKeys)
    return collectWordEntries(progress, progress.profile.track, now).map((entry) =>
      entry.isNew && entry.isDue && !dueSet.has(entry.key) ? { ...entry, isDue: false } : entry,
    )
  }, [progress, now, dueWordKeys])
  const filtered = useMemo(() => sortWordEntries(filterWordEntries(entries, { level, skill, unitId, search }), sort), [entries, level, skill, unitId, search, sort])
  useEffect(() => setVisibleCount(PAGE_SIZE), [level, skill, unitId, search, sort])

  const levelCounts = useMemo(() => {
    const counts: Record<MemoryLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const entry of entries) counts[entry.level]++
    return counts
  }, [entries])
  const skillsPresent = SKILL_ORDER.filter((name) => entries.some((entry) => entry.skill === name))
  const units = useMemo(() => {
    const seen = new Map<string, NonNullable<WordEntry['unit']>>()
    for (const entry of entries) if (entry.unit && !seen.has(entry.unit.id)) seen.set(entry.unit.id, entry.unit)
    return [...seen.values()].sort((a, b) => a.levelId.localeCompare(b.levelId) || a.order - b.order)
  }, [entries])

  const openEntry = entries.find((entry) => entry.key === openKey) ?? null

  const setLevel = (next: MemoryLevel | null) => {
    const params = new URLSearchParams(searchParams)
    if (next === null) params.delete('level')
    else params.set('level', String(next))
    setSearchParams(params, { replace: true })
  }
  const clearFilters = () => {
    setLevel(null)
    setSkill(null)
    setUnitId(null)
    setSearch('')
  }
  const reviewKeys = (keys: string[]) => navigate('/review', { state: { onlyKeys: keys } })

  if (entries.length === 0) {
    const next = findNextLesson(progress)
    return (
      <main className="review-page">
        <header className="review-page__head">
          <div>
            <span className="review-page__eyebrow">{text.wordsEyebrow}</span>
            <h1 className="review-page__title">{text.wordsTitle}</h1>
          </div>
          <ReviewSectionNav />
        </header>
        <Card className="words-empty">
          <EmptyState
            pose="reading"
            title={text.wordsEmptyTitle}
            text={text.wordsEmptyText}
            action={
              <Button size="lg" to={next ? `/lesson/${next.lesson.id}` : '/learn'} iconRight="arrow-right">
                {text.startFirstLesson}
              </Button>
            }
          />
        </Card>
      </main>
    )
  }

  const total = entries.length
  return (
    <main className="review-page">
      <header className="review-page__head">
        <div>
          <span className="review-page__eyebrow">{text.wordsEyebrow}</span>
          <h1 className="review-page__title">{text.wordsTitle}</h1>
          <p className="review-page__intro">{text.wordsIntro(total, levelCounts[5])}</p>
        </div>
        <ReviewSectionNav />
      </header>

      {/* ---------- phân bố cấp độ nhớ + lọc ---------- */}
      <Card className="words-levels" padding="md">
        <div className="words-levels__top">
          <div className="words-levels__bar" role="img" aria-label={MEMORY_LEVELS.map((step) => `${text.memoryLevelName[step]}: ${levelCounts[step]}`).join(', ')}>
            {MEMORY_LEVELS.map((step) =>
              levelCounts[step] ? (
                <span
                  key={step}
                  className="words-levels__segment"
                  style={{ flexGrow: levelCounts[step], background: `var(--memory-${step})` }}
                  title={`${text.memoryLevelName[step]}: ${levelCounts[step]}`}
                />
              ) : null,
            )}
          </div>
          {dueWordKeys.length > 0 ? (
            <Button onClick={() => reviewKeys(dueWordKeys)} iconRight="arrow-right">
              {text.dueWordsCta(dueWordKeys.length)}
            </Button>
          ) : (
            <span className="words-levels__none">{text.noDueWords}</span>
          )}
        </div>
        <div className="words-levels__filters" role="group" aria-label={text.memoryChartHint}>
          <button type="button" className={`level-filter${level === null ? ' is-selected' : ''}`} aria-pressed={level === null} onClick={() => setLevel(null)}>
            <span className="level-filter__name">{text.allLevels}</span>
            <span className="level-filter__count">{total}</span>
          </button>
          {MEMORY_LEVELS.map((step) => (
            <button
              key={step}
              type="button"
              className={`level-filter${level === step ? ' is-selected' : ''}`}
              aria-pressed={level === step}
              onClick={() => setLevel(level === step ? null : step)}
              title={text.memoryLevelHint[step]}
            >
              <span className="level-filter__swatch" style={{ background: `var(--memory-${step})` }} aria-hidden />
              <span className="level-filter__name">{text.memoryLevelName[step]}</span>
              <span className="level-filter__count">{levelCounts[step]}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* ---------- thanh công cụ ---------- */}
      <div className="words-toolbar">
        <label className="words-search">
          <SearchIcon />
          <span className="ds-visually-hidden">{text.searchLabel}</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={text.searchPlaceholder} />
        </label>
        {skillsPresent.length > 1 && (
          <div className="words-toolbar__chips" role="group" aria-label={text.filterSkill}>
            {skillsPresent.map((name) => (
              <Chip key={name} size="sm" selected={skill === name} onClick={() => setSkill(skill === name ? null : name)} icon={<SkillIcon skill={name} size={20} />} color={`var(--skill-${name})`}>
                {skillText.skillName[name]}
              </Chip>
            ))}
          </div>
        )}
        {units.length > 1 && (
          <label className="words-select">
            <span>{text.filterUnit}</span>
            <select value={unitId ?? ''} onChange={(event) => setUnitId(event.target.value || null)}>
              <option value="">{text.allUnits}</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {pick(unit.title)}
                </option>
              ))}
            </select>
          </label>
        )}
        <label className="words-select">
          <span>{text.sortLabel}</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as WordSort)}>
            <option value="due">{text.sortDue}</option>
            <option value="weak">{text.sortWeak}</option>
            <option value="recent">{text.sortRecent}</option>
            <option value="alpha">{text.sortAlpha}</option>
          </select>
        </label>
      </div>
      <p className="words-count" aria-live="polite">
        {text.resultCount(filtered.length)}
      </p>

      {/* ---------- lưới từ ---------- */}
      {filtered.length === 0 ? (
        <Card className="words-empty">
          <EmptyState
            pose="thinking"
            mascotSize={120}
            title={text.emptyFilterTitle}
            text={text.emptyFilterText}
            action={
              <Button variant="secondary" onClick={clearFilters}>
                {text.clearFilters}
              </Button>
            }
          />
        </Card>
      ) : (
        <>
          <div className="words-grid">
            {filtered.slice(0, visibleCount).map((entry) => (
              <WordCard key={entry.key} entry={entry} now={now.getTime()} onOpen={() => setOpenKey(entry.key)} />
            ))}
          </div>
          {filtered.length > visibleCount && (
            <div className="words-more">
              <Button variant="secondary" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
                {text.showMore(Math.min(PAGE_SIZE, filtered.length - visibleCount))}
              </Button>
            </div>
          )}
        </>
      )}

      <WordDetailModal entry={openEntry} now={now.getTime()} onClose={() => setOpenKey(null)} onReview={(key) => reviewKeys([key])} />
    </main>
  )
}
