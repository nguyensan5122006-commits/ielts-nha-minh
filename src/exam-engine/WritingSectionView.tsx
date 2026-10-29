/**
 * WritingSectionView.tsx — PHẦN THI VIẾT
 * Đề bài (+ biểu đồ Task 1) bên trái | ô viết bên phải, đếm từ trực tiếp.
 * Nhiều task -> chuyển qua lại bằng các nút ở thanh dưới.
 */
import { useState } from 'react'
import type { ExamSection } from '../content/content-types'
import { WritingTaskChart } from '../components/WritingTaskChart'
import { countWords } from '../services/answer-checking'
import { useLanguage } from '../translations/language-context'
import type { ExamAnswers } from './exam-scoring'

interface WritingSectionViewProps {
  section: ExamSection
  answers: ExamAnswers
  onAnswer: (taskId: string, text: string) => void
}

export function WritingSectionView({ section, answers, onAnswer }: WritingSectionViewProps) {
  const { t } = useLanguage()
  const tasks = section.writingTasks ?? []
  const [taskIndex, setTaskIndex] = useState(0)
  const task = tasks[taskIndex]
  const text = answers[task.id] ?? ''
  const words = countWords(text)

  return (
    <>
      <div className="exam-split">
        <div>
          <h2>Writing Task {task.taskNumber}</h2>
          <p className="small muted">{t('minutes', { n: task.suggestedMinutes })} · {task.minWords}+ words</p>
          <p style={{ whiteSpace: 'pre-line' }}>{task.prompt}</p>
          {task.chartData && <WritingTaskChart chart={task.chartData} />}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            className="text-area"
            style={{ flex: 1, minHeight: 420, fontSize: '1rem' }}
            value={text}
            onChange={(event) => onAnswer(task.id, event.target.value)}
            spellCheck={false} // thi thật không có kiểm tra chính tả
          />
          <div className="row row--between" style={{ marginTop: 8 }}>
            <span className={words >= task.minWords ? 'badge badge--success' : 'badge'}>{t('wordCount', { n: words, min: task.minWords })}</span>
          </div>
        </div>
      </div>
      <div className="exam-navigator">
        {tasks.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={answers[item.id]?.trim() ? 'is-answered' : ''}
            style={{ minWidth: 90, fontWeight: index === taskIndex ? 800 : 500 }}
            onClick={() => setTaskIndex(index)}
          >
            Task {item.taskNumber}
          </button>
        ))}
      </div>
    </>
  )
}
