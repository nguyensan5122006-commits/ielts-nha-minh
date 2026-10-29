/**
 * TopicSelect.tsx — Ô CHỌN CHỦ ĐỀ CÂU HỎI (nhóm: Học vui / Bài học / Tổng hợp)
 * (v3) Dùng kiểu ô chọn "pg-select" của Sân chơi (src/features/playground/styles/play-kit.css).
 */
import { listGameTopics } from '../game-questions/question-bank'
import { useLanguage } from '../translations/language-context'
import '../features/playground/styles/play-kit.css'

const TOPICS = listGameTopics()

export function TopicSelect({ value, onChange, id }: { value: string; onChange: (topicId: string) => void; id?: string }) {
  const { t, pick } = useLanguage()
  const groups: { id: 'fun' | 'lessons' | 'mixed'; label: string }[] = [
    { id: 'fun', label: t('funTitle') },
    { id: 'lessons', label: t('lessonTopics') },
    { id: 'mixed', label: t('mixedTopics') },
  ]
  return (
    <select id={id} className="pg-select" value={value} onChange={(e) => onChange(e.target.value)}>
      {groups.map((group) => (
        <optgroup key={group.id} label={group.label}>
          {TOPICS.filter((topic) => topic.group === group.id).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.icon} {pick(topic.title)}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  )
}
