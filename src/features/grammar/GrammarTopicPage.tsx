/**
 * GrammarTopicPage.tsx — TRANG /grammar/:topicId: 1 ĐIỂM NGỮ PHÁP
 * ----------------------------------------------------------------------------
 * Bố cục:
 *   1. "← Ngữ pháp" + huy hiệu level + tên điểm + 1 câu tóm tắt
 *   2. Khung công thức + câu ví dụ (có nút loa)
 *   3. Danh sách bài dạy điểm này: bài mới của khu Ngữ pháp ("Bài ngữ pháp") hoặc bài sẵn có
 *      trên lộ trình ("Trên lộ trình · Level 2 · Trường học"); mỗi bài có phút, số câu,
 *      trạng thái (điểm tốt nhất) và nút "Học" -> /lesson/:id (trình học dùng chung).
 *   4. "Xem nhanh lý thuyết": thẻ dạy của bài đầu tiên (tải khi cần bằng useLesson —
 *      không kéo cả kho bài vào trang).
 *   5. Điểm trước / điểm sau (cùng thứ tự với trang danh sách).
 *   Cột phải: tiến độ điểm này + nút học bài nên học tiếp.
 * ----------------------------------------------------------------------------
 */
import { Fragment, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { RightRail } from '../../app/layout'
import { findGrammarTopic, GRAMMAR_LEVELS, GRAMMAR_TOPICS, isGrammarOnlyLesson } from '../../content/grammar/grammar-topics'
import { findUnitOfLesson } from '../../content/path-selectors'
import { useLesson } from '../../content/use-lesson'
import { AudioButton } from '../../design-system/components/AudioButton'
import { Badge } from '../../design-system/components/Badge'
import { Button } from '../../design-system/components/Button'
import { Card } from '../../design-system/components/Card'
import { EmptyState } from '../../design-system/components/EmptyState'
import { Icon } from '../../design-system/components/Icon'
import { LevelBadge } from '../../design-system/components/LevelBadge'
import { ProgressRing } from '../../design-system/components/ProgressRing'
import { Skeleton } from '../../design-system/components/Skeleton'
import { SkillIcon } from '../../design-system/components/SkillIcon'
import { useProgress } from '../../learning-progress/progress-store'
import { useLanguage } from '../../translations/language-context'
import { firstLessonToOpen, topicProgress, type TopicLessonState } from './grammar-progress'
import { useGrammarText } from './grammar-text'
import './grammar.css'

export function GrammarTopicPage() {
  const { topicId } = useParams()
  const text = useGrammarText()
  const { pick } = useLanguage()
  const { progress } = useProgress()
  const topic = findGrammarTopic(topicId)
  const state = useMemo(() => (topic ? topicProgress(topic, progress) : null), [topic, progress])

  if (!topic || !state) {
    return (
      <main className="gr-page">
        <EmptyState pose="surprised" title={text.notFoundTitle} text={text.notFoundText} action={<Button to="/grammar">{text.backToList}</Button>} />
      </main>
    )
  }

  const levelInfo = GRAMMAR_LEVELS.find((info) => info.level === topic.level) ?? GRAMMAR_LEVELS[0]
  const position = GRAMMAR_TOPICS.findIndex((item) => item.id === topic.id)
  const previous = GRAMMAR_TOPICS[position - 1]
  const next = GRAMMAR_TOPICS[position + 1]
  const lessonToOpen = firstLessonToOpen(state)

  return (
    <main className="gr-page gr-page--topic">
      <RightRail>
        <Card className="gr-rail-next">
          <h2 className="gr-rail__title">{pick(topic.title)}</h2>
          <div className="gr-rail__ring">
            <ProgressRing value={state.total ? state.done / state.total : 0} size={88} label={text.lessonsDone(state.done, state.total)}>
              <strong className="gr-head__ring-value">{state.done}</strong>
              <span className="gr-head__ring-unit">/{state.total}</span>
            </ProgressRing>
            <p className="gr-rail__text">{text.lessonsDone(state.done, state.total)}</p>
          </div>
          {lessonToOpen && (
            <Button to={`/lesson/${lessonToOpen}`} fullWidth iconRight="arrow-right">
              {state.status === 'done' ? text.redoLesson : text.startLesson}
            </Button>
          )}
        </Card>
      </RightRail>

      <Link to="/grammar" className="gr-back">
        <Icon name="chevron-right" size={18} className="gr-back__icon" />
        {text.backToList}
      </Link>

      <header className="gr-topic-head">
        <LevelBadge level={topic.level} size={72} state={state.status === 'done' ? 'done' : 'default'} />
        <div>
          <p className="gr-head__eyebrow">
            {text.levelHeading(topic.level, pick(levelInfo.title))} · CEFR {levelInfo.cefr}
          </p>
          <h1 className="gr-head__title">{pick(topic.title)}</h1>
          <p className="gr-head__intro">{pick(topic.summary)}</p>
        </div>
      </header>

      <Card className="gr-formula">
        <div className="gr-formula__row">
          <span className="gr-formula__label">{text.patternLabel}</span>
          <p className="gr-formula__pattern" lang="en">
            {topic.pattern}
          </p>
        </div>
        <div className="gr-formula__row gr-formula__row--example">
          <span className="gr-formula__label">{text.exampleLabel}</span>
          <div className="gr-formula__example">
            <AudioButton text={topic.example} size="sm" showSlow={false} />
            <p lang="en">{topic.example}</p>
          </div>
        </div>
      </Card>

      <section className="gr-section" aria-labelledby="gr-lessons-title">
        <h2 id="gr-lessons-title" className="gr-section__title">
          {text.lessonsTitle}
        </h2>
        <p className="gr-section__intro">{text.lessonsIntro(state.lessons.length)}</p>
        <ol className="gr-lessons">
          {state.lessons.map((lesson, index) => (
            <li key={lesson.summary.id}>
              <LessonRow lesson={lesson} number={index + 1} />
            </li>
          ))}
        </ol>
      </section>

      {state.lessons[0] && <CheatSheet lessonId={state.lessons[0].summary.id} />}

      <nav className="gr-pager" aria-label={text.lessonsTitle}>
        {previous ? (
          <Link to={`/grammar/${previous.id}`} className="gr-pager__link">
            <span className="gr-pager__hint">← {text.prevTopic}</span>
            <span className="gr-pager__name">{pick(previous.title)}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/grammar/${next.id}`} className="gr-pager__link gr-pager__link--next">
            <span className="gr-pager__hint">{text.nextTopic} →</span>
            <span className="gr-pager__name">{pick(next.title)}</span>
          </Link>
        )}
      </nav>
    </main>
  )
}

/* ------------------------------ 1 dòng bài học ------------------------------ */

function LessonRow({ lesson, number }: { lesson: TopicLessonState; number: number }) {
  const text = useGrammarText()
  const { pick } = useLanguage()
  const { summary } = lesson
  const isGrammarLesson = isGrammarOnlyLesson(summary.id)
  // bài sẵn có trên lộ trình: ghi rõ nằm ở level / chặng nào
  const location = isGrammarLesson ? undefined : findUnitOfLesson(summary.id)
  const tag = isGrammarLesson ? text.grammarLessonTag : location ? text.pathLessonTag(location.level.order, pick(location.unit.title)) : null

  return (
    <Card className={['gr-lesson', lesson.done && 'gr-lesson--done'].filter(Boolean).join(' ')} padding="sm">
      <span className="gr-lesson__number" aria-hidden>
        {lesson.done ? <Icon name="check" size={18} strokeWidth={3} /> : number}
      </span>
      <SkillIcon skill={summary.skill} size={40} />
      <div className="gr-lesson__body">
        <p className="gr-lesson__title">{pick(summary.title)}</p>
        <p className="gr-lesson__meta">
          {tag && (
            <Badge tone={isGrammarLesson ? 'navy' : 'neutral'} size="sm">
              {tag}
            </Badge>
          )}
          <span>{text.minutes(summary.estimatedMinutes)}</span>
          {summary.exerciseCount > 0 && <span>· {text.exercises(summary.exerciseCount)}</span>}
          {lesson.bestAccuracy !== null && <span className="gr-lesson__best">· {text.bestScore(Math.round(lesson.bestAccuracy * 100))}</span>}
        </p>
      </div>
      <Button to={`/lesson/${summary.id}`} variant={lesson.done ? 'secondary' : 'primary'} size="sm">
        {lesson.done ? text.redoLesson : text.startLesson}
      </Button>
    </Card>
  )
}

/* ------------------------------ xem nhanh lý thuyết ------------------------------ */

/** Thẻ dạy của bài đầu tiên — tải bài khi mở trang (1 file bài ~50–150 KB). */
function CheatSheet({ lessonId }: { lessonId: string }) {
  const text = useGrammarText()
  const { pick } = useLanguage()
  const { lesson, status, retry } = useLesson(lessonId)

  return (
    <section className="gr-section" aria-labelledby="gr-cheat-title">
      <h2 id="gr-cheat-title" className="gr-section__title">
        {text.cheatTitle}
      </h2>
      <p className="gr-section__intro">{text.cheatIntro}</p>
      {status === 'loading' && (
        <Card aria-busy="true" aria-label={text.cheatLoading}>
          <Skeleton variant="text" lines={4} />
        </Card>
      )}
      {status === 'error' && (
        <Card variant="soft" className="gr-cheat-error">
          <span>{text.cheatError}</span>
          <Button variant="secondary" size="sm" iconLeft="retry" onClick={retry}>
            {text.retry}
          </Button>
        </Card>
      )}
      {status === 'ready' && lesson && (
        <div className="gr-cheat">
          {lesson.teachingCards.slice(0, 3).map((card, index) => (
            <Card key={index} className="gr-cheat__card">
              <h3 className="gr-cheat__title">{pick(card.title)}</h3>
              <p className="gr-cheat__body">
                <BoldLines text={pick(card.body)} />
              </p>
              {card.examples && card.examples.length > 0 && (
                <ul className="gr-cheat__examples">
                  {card.examples.map((example) => (
                    <li key={example.en} className="gr-cheat__example">
                      <AudioButton text={example.en} size="sm" showSlow={false} />
                      <span>
                        <span className="gr-cheat__en" lang="en">
                          {example.en}
                        </span>
                        <span className="gr-cheat__vi">{example.vi}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}

/** Hiện chữ có **đậm** và xuống dòng "\n" (cùng quy ước với thẻ dạy trong bài học). */
function BoldLines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, lineIndex) => (
        <span key={lineIndex} className="gr-cheat__line">
          {line.split(/\*\*(.+?)\*\*/g).map((piece, pieceIndex) => (pieceIndex % 2 === 1 ? <strong key={pieceIndex}>{piece}</strong> : <Fragment key={pieceIndex}>{piece}</Fragment>))}
        </span>
      ))}
    </>
  )
}
