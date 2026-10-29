/**
 * DevLessonIndexPage.tsx — /dev/lessons (CHỈ CÓ KHI CHẠY npm run dev)
 * ----------------------------------------------------------------------------
 * Công cụ cho người làm web: liệt kê mọi bài theo level, bấm 1 bài để xem danh sách
 * bài tập và NHẢY THẲNG tới câu bất kỳ (chụp ảnh màn hình, kiểm thử giao diện).
 * Các cờ nhảy: xem session/dev-flags.ts. Bản build thật không có trang này.
 * ----------------------------------------------------------------------------
 */
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { allLessonSummaries } from '../../content/lesson-index'
import { useLesson } from '../../content/use-lesson'
import { useLanguage } from '../../translations/language-context'
import { loadedSkillTaskRegistrations } from './skill-task-loader'
import { registeredSkillTaskModes } from './skill-task-registry'
import './lesson-player.css'

function LessonExercises({ lessonId }: { lessonId: string }) {
  const { lesson, status } = useLesson(lessonId)
  if (status !== 'ready' || !lesson) return <p className="lp-dev__muted">{status}…</p>
  return (
    <ol className="lp-dev__exercises">
      {lesson.exercises.map((exercise) => (
        <li key={exercise.id}>
          <Link to={`/lesson/${lesson.id}?devItem=${exercise.id}`}>
            <code>{exercise.type}</code> {exercise.id}
          </Link>
        </li>
      ))}
    </ol>
  )
}

export function DevLessonIndexPage() {
  const { pick } = useLanguage()
  const [filter, setFilter] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)
  const lessons = useMemo(() => {
    const query = filter.trim().toLowerCase()
    return allLessonSummaries().filter((lesson) => !query || lesson.id.includes(query) || pick(lesson.title).toLowerCase().includes(query) || lesson.mode.includes(query))
  }, [filter, pick])

  return (
    <main className="lp-dev">
      <h1>Dev · lessons ({lessons.length})</h1>
      <p className="lp-dev__muted">
        Skill players: {registeredSkillTaskModes().join(', ') || 'none'} · files: {loadedSkillTaskRegistrations.join(', ') || 'none'}
      </p>
      <input className="lp-dev__filter" placeholder="filter: l1-vocab, listening…" value={filter} onChange={(event) => setFilter(event.target.value)} autoFocus />
      <table className="lp-dev__table">
        <tbody>
          {lessons.map((lesson) => (
            <tr key={lesson.id}>
              <td>
                <button type="button" className="lp-dev__toggle" onClick={() => setOpenId(openId === lesson.id ? null : lesson.id)}>
                  {openId === lesson.id ? '▾' : '▸'}
                </button>
              </td>
              <td>
                <strong>{lesson.id}</strong> · {pick(lesson.title)} <span className="lp-dev__muted">({lesson.mode}, {lesson.exerciseCount} ex)</span>
                {openId === lesson.id && <LessonExercises lessonId={lesson.id} />}
              </td>
              <td className="lp-dev__links">
                <Link to={`/lesson/${lesson.id}?devFresh=1`}>start</Link>
                <Link to={`/lesson/${lesson.id}`}>resume</Link>
                {lesson.mode !== 'practice' && <Link to={`/lesson/${lesson.id}?devTask=1`}>task</Link>}
                <Link to={`/lesson/${lesson.id}?devRetry=1`}>retries</Link>
                <Link to={`/lesson/${lesson.id}?devResults=1`}>results</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
