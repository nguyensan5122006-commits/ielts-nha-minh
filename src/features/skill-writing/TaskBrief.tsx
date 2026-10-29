/**
 * TaskBrief.tsx — CỘT TRÁI CỦA TRÌNH WRITING: đề bài + biểu đồ + gợi ý dàn ý + bài mẫu tham khảo
 * ----------------------------------------------------------------------------
 * Luôn nằm trong tầm mắt khi viết (giống máy thi IELTS: đề một bên, bài làm một bên).
 *   - Đề: tách đoạn, các dòng "- …" / "1. …" thành danh sách cho dễ đọc
 *   - Task 1 có chartData -> TaskChart; Task 1 không biểu đồ (email, review) -> chỉ chữ
 *   - "Gợi ý lập dàn ý" (planningHintsVi) gập/mở
 *   - Thang "fading": nấc 1 có bài mẫu chú thích (từ teachingCards), nấc 2 có bài mẫu
 *     khuyết (readingPassages) -> ở đây hiện bản ĐÃ ĐIỀN để tham khảo; nấc 3 không có gì.
 * ----------------------------------------------------------------------------
 */
import type { Lesson, WritingTaskV3 } from '../../content/content-types'
import { Icon } from '../../design-system/components/Icon'
import { GappedModelPassage, findAnnotatedModel, gapAnswersFor, splitAnnotation } from './GappedModelPassage'
import { useWritingText } from './skill-writing-text'
import { TaskChart } from './TaskChart'

/** Đề bài -> các khối: đoạn văn hoặc danh sách. */
function promptBlocks(prompt: string): ({ kind: 'text'; text: string } | { kind: 'list'; ordered: boolean; items: string[] })[] {
  return prompt
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .flatMap((block) => {
      const lines = block.split('\n').map((line) => line.trim())
      const listLines = lines.filter((line) => /^([-•]|\d+\.)\s+/.test(line))
      if (listLines.length === 0) return [{ kind: 'text' as const, text: block }]
      const head = lines.filter((line) => !/^([-•]|\d+\.)\s+/.test(line)).join(' ')
      const ordered = /^\d+\./.test(listLines[0])
      const items = listLines.map((line) => line.replace(/^([-•]|\d+\.)\s+/, ''))
      return [...(head ? [{ kind: 'text' as const, text: head }] : []), { kind: 'list' as const, ordered, items }]
    })
}

export function TaskBrief({ lesson, task }: { lesson: Lesson; task: WritingTaskV3 }) {
  const text = useWritingText()
  const annotated = findAnnotatedModel(lesson)
  const gappedModels = (lesson.readingPassages ?? []).filter((passage) => /\(\d+\)\s*_{2,}/.test(passage.text))

  return (
    <div className="task-brief">
      <div className="task-brief__chips">
        <span className="task-brief__chip task-brief__chip--accent">{text.taskLabel(task.taskNumber)}</span>
        <span className="task-brief__chip">{text.minWordsShort(task.minWords)}</span>
        <span className="task-brief__chip">
          <Icon name="clock" size={14} /> {text.minutesShort(task.suggestedMinutes)}
        </span>
      </div>

      <section className="task-brief__prompt" aria-label={text.promptHeading}>
        {promptBlocks(task.prompt).map((block, index) =>
          block.kind === 'text' ? (
            <p key={index}>{block.text}</p>
          ) : block.ordered ? (
            <ol key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          ) : (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        )}
      </section>

      {task.chartData && (
        <div className="task-brief__chart">
          <TaskChart chart={task.chartData} />
        </div>
      )}

      {task.planningHintsVi && task.planningHintsVi.length > 0 && (
        <details className="task-brief__fold">
          <summary>
            <Icon name="hint" size={18} /> {text.planningHints}
            <Icon name="chevron-down" size={18} className="task-brief__fold-chevron" />
          </summary>
          <ol className="task-brief__hints">
            {task.planningHintsVi.map((hint) => (
              <li key={hint}>{hint}</li>
            ))}
          </ol>
        </details>
      )}

      {annotated && (
        <details className="task-brief__fold">
          <summary>
            <Icon name="learn" size={18} /> {text.annotatedModel}
            <Icon name="chevron-down" size={18} className="task-brief__fold-chevron" />
          </summary>
          <p className="task-brief__fold-hint">{text.annotatedModelHint}</p>
          <ol className="task-brief__annotated">
            {annotated.examples!.map((example) => {
              const { role, note } = splitAnnotation(example.vi)
              return (
                <li key={example.en}>
                  {role && <span className="task-brief__role">{role}</span>}
                  <p className="task-brief__model-sentence">{example.en}</p>
                  <p className="task-brief__model-note">{note}</p>
                </li>
              )
            })}
          </ol>
        </details>
      )}

      {gappedModels.map((passage) => (
        <details key={passage.id} className="task-brief__fold">
          <summary>
            <Icon name="learn" size={18} /> {text.gappedModel}
            <Icon name="chevron-down" size={18} className="task-brief__fold-chevron" />
          </summary>
          <div className="task-brief__gapped">
            <GappedModelPassage passage={passage} filled={gapAnswersFor(lesson, passage.id)} />
          </div>
        </details>
      ))}
    </div>
  )
}
