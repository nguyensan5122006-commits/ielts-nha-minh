/**
 * GrammarPage.tsx — TRANG /grammar: DANH SÁCH MỌI ĐIỂM NGỮ PHÁP
 * ----------------------------------------------------------------------------
 * Bố cục:
 *   1. Đầu trang: tiêu đề + vòng tròn "đã học x/33 điểm" (tính trên mọi level)
 *   2. Tab chọn Level 1 / 2 / 3 (mặc định = level người học đang ở, theo track đang chọn)
 *   3. Đầu nhóm: huy hiệu level + CEFR/band + thanh tiến độ của level
 *   4. Lưới thẻ điểm ngữ pháp: tên, 1 câu tóm tắt, công thức, tiến độ "1/3 bài", nhãn "Bài mới"
 *   5. Thẻ "Bài kiểm tra Level x": 15 câu tổng hợp cả level (GRAMMAR_LEVEL_TESTS) + điểm tốt nhất
 *   Cột phải: "Học tiếp ngữ pháp" (điểm nên học tiếp) + 3 bước học cho nhớ.
 *
 * Tiến độ CHỈ đọc từ progress.lessons (grammar-progress.ts) — không có kho lưu riêng.
 * Bấm 1 thẻ -> /grammar/:topicId.
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState } from 'react'
import { RightRail } from '../../app/layout'
import { GRAMMAR_LEVEL_TESTS, GRAMMAR_LEVELS, GRAMMAR_TOPICS, grammarTopicsOfLevel, isGrammarOnlyLesson, type GrammarLevel, type GrammarTopic } from '../../content/grammar/grammar-topics'
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { Card } from '../../design-system/components/Card'
import { LevelBadge } from '../../design-system/components/LevelBadge'
import { ProgressBar } from '../../design-system/components/ProgressBar'
import { ProgressRing } from '../../design-system/components/ProgressRing'
import { Tabs } from '../../design-system/components/Tabs'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { nextTopicToStudy, topicProgress, type TopicProgress } from './grammar-progress'
import { useGrammarText } from './grammar-text'
import './grammar.css'

type LevelTabId = 'level-1' | 'level-2' | 'level-3'

const levelOfTab = (tab: LevelTabId): GrammarLevel => Number(tab.slice(-1)) as GrammarLevel

export function GrammarPage() {
  const text = useGrammarText()
  const { pick } = useLanguage()
  const { progress } = useProgress()

  // mặc định mở đúng level người học đang ở (theo tab track đang chọn ở /learn)
  const [tab, setTab] = useState<LevelTabId>(() => progress.currentLevel[progress.profile.track] ?? 'level-1')
  const level = levelOfTab(tab)
  const levelInfo = GRAMMAR_LEVELS.find((info) => info.level === level) ?? GRAMMAR_LEVELS[0]

  // tiến độ của từng điểm (tính 1 lần mỗi khi tiến độ đổi)
  const progressByTopic = useMemo(() => {
    const map = new Map<string, TopicProgress>()
    for (const topic of GRAMMAR_TOPICS) map.set(topic.id, topicProgress(topic, progress))
    return map
  }, [progress])

  const learnedCount = (topics: GrammarTopic[]) => topics.filter((topic) => progressByTopic.get(topic.id)?.status === 'done').length
  const topics = grammarTopicsOfLevel(level)
  const learnedInLevel = learnedCount(topics)
  const learnedOverall = learnedCount(GRAMMAR_TOPICS)
  const nextTopic = nextTopicToStudy(topics, progress)

  return (
    <main className="gr-page">
      <RightRail>
        <Card className="gr-rail-next">
          <h2 className="gr-rail__title">{text.nextTitle}</h2>
          {nextTopic ? (
            <>
              <p className="gr-rail__text">{text.nextText}</p>
              <p className="gr-rail__topic">{pick(nextTopic.title)}</p>
              <p className="gr-rail__pattern" lang="en">
                {nextTopic.pattern}
              </p>
              <Button to={`/grammar/${nextTopic.id}`} fullWidth iconRight="arrow-right">
                {text.nextButton}
              </Button>
            </>
          ) : (
            <p className="gr-rail__text">{text.nextAllDone}</p>
          )}
        </Card>
        <Card variant="soft" className="gr-rail-how">
          <h2 className="gr-rail__title">{text.howTitle}</h2>
          <ol className="gr-rail__steps">
            {text.howSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
      </RightRail>

      <header className="gr-head">
        <div className="gr-head__text">
          <span className="gr-head__eyebrow">{text.eyebrow}</span>
          <h1 className="gr-head__title">{text.title}</h1>
          <p className="gr-head__intro">{text.intro}</p>
        </div>
        <ProgressRing value={GRAMMAR_TOPICS.length ? learnedOverall / GRAMMAR_TOPICS.length : 0} size={104} label={text.topicsLearned(learnedOverall, GRAMMAR_TOPICS.length)} className="gr-head__ring">
          <strong className="gr-head__ring-value">{learnedOverall}</strong>
          <span className="gr-head__ring-unit">{text.overallUnit(GRAMMAR_TOPICS.length)}</span>
        </ProgressRing>
      </header>

      <Tabs
        label={text.levelTabsLabel}
        idPrefix="grammar-level"
        variant="pill"
        value={tab}
        onChange={setTab}
        className="gr-tabs"
        items={GRAMMAR_LEVELS.map((info) => ({ id: `level-${info.level}` as LevelTabId, label: `${text.levelTab(info.level)} · ${info.cefr}` }))}
      />

      <section className="gr-level" role="tabpanel" id={`grammar-level-panel-${tab}`} aria-labelledby={`grammar-level-tab-${tab}`}>
        <div className="gr-level__head">
          <LevelBadge level={level} size={64} state={learnedInLevel === topics.length && topics.length > 0 ? 'done' : 'default'} />
          <div className="gr-level__titles">
            <h2 className="gr-level__title">{text.levelHeading(level, pick(levelInfo.title))}</h2>
            <p className="gr-level__meta">{text.levelMeta(levelInfo.cefr, levelInfo.band)}</p>
          </div>
          <div className="gr-level__progress">
            <span className="gr-level__count">{text.topicsLearned(learnedInLevel, topics.length)}</span>
            <ProgressBar value={learnedInLevel} max={Math.max(1, topics.length)} size="sm" label={text.topicsLearned(learnedInLevel, topics.length)} />
          </div>
        </div>

        <ol className="gr-grid">
          {topics.map((topic, index) => (
            <li key={topic.id}>
              <TopicCard topic={topic} number={index + 1} state={progressByTopic.get(topic.id)} isNext={topic.id === nextTopic?.id} />
            </li>
          ))}
        </ol>

        <LevelTestCard level={level} />
      </section>
    </main>
  )
}

/* ------------------------------ bài kiểm tra cuối level ------------------------------ */

function LevelTestCard({ level }: { level: GrammarLevel }) {
  const text = useGrammarText()
  const { progress } = useProgress()
  const testId = GRAMMAR_LEVEL_TESTS[level]
  const record = progress.lessons[testId]

  return (
    <Card variant="soft" className="gr-test" padding="md">
      <div className="gr-test__body">
        <h3 className="gr-test__title">{text.testTitle(level)}</h3>
        <p className="gr-test__text">{text.testText}</p>
        {record && <p className="gr-test__best">{text.bestScore(Math.round(record.bestAccuracy * 100))}</p>}
      </div>
      <Button to={`/lesson/${testId}`} variant={record ? 'secondary' : 'primary'} iconRight="arrow-right">
        {record ? text.testRedo : text.testStart}
      </Button>
    </Card>
  )
}

/* ------------------------------ 1 thẻ điểm ngữ pháp ------------------------------ */

function TopicCard({ topic, number, state, isNext }: { topic: GrammarTopic; number: number; state: TopicProgress | undefined; isNext: boolean }) {
  const text = useGrammarText()
  const { pick } = useLanguage()
  const done = state?.done ?? 0
  const total = state?.total ?? 0
  const status = state?.status ?? 'new'
  // "Bài mới" = điểm này có bài viết riêng cho khu Ngữ pháp mà người học chưa làm
  const hasNewLesson = !!state?.lessons.some((lesson) => isGrammarOnlyLesson(lesson.summary.id) && !lesson.done)

  return (
    <Card to={`/grammar/${topic.id}`} className={['gr-topic', `gr-topic--${status}`, isNext && 'gr-topic--next'].filter(Boolean).join(' ')} padding="md">
      <div className="gr-topic__top">
        <span className="gr-topic__number" aria-hidden>
          {status === 'done' ? '✓' : number}
        </span>
        <div className="gr-topic__badges">
          {status === 'done' && (
            <Badge tone="success" size="sm" icon="check">
              {text.statusDone}
            </Badge>
          )}
          {status === 'started' && (
            <Badge tone="primary" size="sm">
              {text.statusStarted}
            </Badge>
          )}
          {hasNewLesson && (
            <Badge tone="navy" size="sm" icon="sparkle">
              {text.newLessonBadge}
            </Badge>
          )}
        </div>
      </div>
      <h3 className="gr-topic__title">{pick(topic.title)}</h3>
      <p className="gr-topic__summary">{pick(topic.summary)}</p>
      <p className="gr-topic__pattern" lang="en">
        {topic.pattern}
      </p>
      <div className="gr-topic__foot">
        <ProgressBar value={done} max={Math.max(1, total)} size="sm" color="var(--c-success)" label={text.lessonsDone(done, total)} />
        <span className="gr-topic__count">{text.lessonsDone(done, total)}</span>
      </div>
    </Card>
  )
}
