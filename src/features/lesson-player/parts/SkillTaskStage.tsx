/**
 * SkillTaskStage.tsx — "NHƯỜNG SÂN" CHO TRÌNH LUYỆN KỸ NĂNG CỦA NHÓM KHÁC
 * ----------------------------------------------------------------------------
 * Tra bảng đăng ký (skill-task-registry.ts) theo lesson.mode:
 *   - có player -> vẽ player (tải lười trong <Suspense>), truyền props theo hợp đồng
 *   - chưa có   -> thẻ bình tĩnh "Phần này đang được hoàn thiện" + nút "Đi tiếp"
 *                  (không ngõ cụt: người học vẫn tới được màn kết quả)
 * Player lỗi khi chạy -> ErrorBoundary bắt lại, hiện cùng thẻ "Đi tiếp".
 * ----------------------------------------------------------------------------
 */
import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react'
import type { Lesson } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Mascot, type MascotPose } from '../../../design-system/components/Mascot'
import { Skeleton } from '../../../design-system/components/Skeleton'
import { useLessonText } from '../lesson-player-text'
import { useSkillTask, type SkillTaskMode, type SkillTaskResult } from '../skill-task-registry'

const MODE_POSE: Record<SkillTaskMode, MascotPose> = { listening: 'listening', reading: 'reading', writing: 'writing', speaking: 'speaking' }

interface SkillTaskStageProps {
  lesson: Lesson
  mode: SkillTaskMode
  resumeData: unknown | null
  onSaveResume: (data: unknown) => void
  onComplete: (result: SkillTaskResult) => void
  onRequestExit: () => void
}

/** Bắt lỗi khi player của nhóm khác bị hỏng -> không làm sập cả trình học */
class TaskErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[lesson-player] skill task crashed', error, info.componentStack)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function TaskPlaceholder({ mode, onContinue }: { mode: SkillTaskMode; onContinue: () => void }) {
  const text = useLessonText()
  return (
    <div className="lp-task-missing">
      <Mascot pose={MODE_POSE[mode]} size={150} />
      <p className="lp-task-missing__eyebrow">{text.taskIntroTitle(text.skillNames[mode] ?? mode)}</p>
      <h2>{text.taskMissingTitle}</h2>
      <p>{text.taskMissingText}</p>
      <Button size="lg" iconRight="arrow-right" onClick={onContinue}>
        {text.taskSkip}
      </Button>
    </div>
  )
}

export function SkillTaskStage({ lesson, mode, resumeData, onSaveResume, onComplete, onRequestExit }: SkillTaskStageProps) {
  const registered = useSkillTask(mode)
  const skip = () => onComplete({ correct: 0, total: 0 })
  if (!registered) return <TaskPlaceholder mode={mode} onContinue={skip} />
  const Player = registered.Component
  return (
    <TaskErrorBoundary fallback={<TaskPlaceholder mode={mode} onContinue={skip} />}>
      <Suspense fallback={<Skeleton variant="rect" height={420} />}>
        <Player lesson={lesson} mode={mode} resumeData={resumeData} onSaveResume={onSaveResume} onComplete={onComplete} onRequestExit={onRequestExit} />
      </Suspense>
    </TaskErrorBoundary>
  )
}
