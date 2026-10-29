/**
 * QuestionFlowStage.tsx — PART 1 / PART 3: TỪNG CÂU HỎI MỘT
 * ----------------------------------------------------------------------------
 * Mỗi màn 1 câu: số câu + chấm tiến độ, câu hỏi chữ to + nút nghe giọng giám khảo,
 * 1 dòng gợi ý cách trả lời (Part 1: ý chính → lý do → ví dụ; Part 3: quan điểm → lý do →
 * ví dụ → so sánh/dự đoán), rồi máy ghi âm. Nút "Câu tiếp" / "Bỏ qua" nằm ở thanh đáy của trình.
 * ----------------------------------------------------------------------------
 */
import { AudioButton } from '../../design-system/components/AudioButton'
import { useSpeakingText } from './skill-speaking-text'
import { answerKey, type SpeakingSection } from './speaking-plan'
import { SpeakingRecorder, type RecordingTake } from './SpeakingRecorder'
import type { MicrophoneHandle } from './use-microphone'

interface QuestionFlowStageProps {
  section: Extract<SpeakingSection, { kind: 'questions' }>
  sectionIndex: number
  questionIndex: number
  onJump: (questionIndex: number) => void
  takes: Record<string, RecordingTake>
  onTake: (key: string, take: RecordingTake) => void
  mic: MicrophoneHandle
  onRecordingChange: (recording: boolean) => void
}

export function QuestionFlowStage({ section, sectionIndex, questionIndex, onJump, takes, onTake, mic, onRecordingChange }: QuestionFlowStageProps) {
  const text = useSpeakingText()
  const question = section.questions[questionIndex]
  const key = answerKey(sectionIndex, questionIndex)

  return (
    <div className="question-flow">
      <div className="question-flow__top">
        <span className="question-flow__part">{text.partLabel(section.part)}</span>
        <span className="question-flow__count">{text.questionOf(questionIndex + 1, section.questions.length)}</span>
        <ol className="question-flow__dots" aria-label={text.questionOf(questionIndex + 1, section.questions.length)}>
          {section.questions.map((q, index) => {
            const done = !!takes[answerKey(sectionIndex, index)]
            return (
              <li key={q}>
                <button
                  type="button"
                  className={`question-flow__dot${index === questionIndex ? ' is-current' : ''}${done ? ' is-done' : ''}`}
                  onClick={() => onJump(index)}
                  aria-label={`${text.questionOf(index + 1, section.questions.length)} · ${done ? text.questionDone : text.questionTodo}`}
                  aria-current={index === questionIndex ? 'step' : undefined}
                />
              </li>
            )
          })}
        </ol>
      </div>

      <div className="question-flow__card">
        <p className="question-flow__question" lang="en">
          {question}
        </p>
        <div className="question-flow__listen">
          <AudioButton text={question} size="sm" label={text.listenQuestion} />
          <span>{text.listenQuestion}</span>
        </div>
        <p className="question-flow__hint">{section.part === 1 ? text.answerHintPart1 : text.answerHintPart3}</p>
      </div>

      <SpeakingRecorder
        key={key}
        mic={mic}
        maxSeconds={section.answerSeconds}
        take={takes[key] ?? null}
        onRecorded={(take) => onTake(key, take)}
        onRecordingChange={onRecordingChange}
      />
    </div>
  )
}
