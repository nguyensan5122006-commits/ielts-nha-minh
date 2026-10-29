/**
 * ExamRunnerPage.tsx — /exam/:examId · PHÒNG THI TOÀN MÀN HÌNH (mô phỏng IELTS thi trên máy tính)
 * ----------------------------------------------------------------------------
 * Trang này chỉ "điều phối" các màn theo phiên làm bài (exam-session.ts):
 *   overview       -> ExamOverview: thông tin đề, chọn Thi thật / Luyện từng phần, luật phòng thi
 *                     (đang làm dở: thẻ "Làm tiếp" / "Làm lại từ đầu")
 *   section-intro  -> SectionIntro: "Phần 2/4 · Reading · …" + nút bắt đầu
 *   section        -> ObjectiveSection (Nghe / Đọc / Từ vựng) · WritingSection · SpeakingSection
 *   grading        -> GradingScreen: chấm + AI + ghi tiến độ + lưu -> /exam-result/:id
 * Mỗi phần được vẽ với key = chỉ số phần -> đồng hồ, âm thanh, cuộn… bắt đầu mới cho từng phần.
 * Phiên tự lưu trong máy: đóng tab / "Lưu & thoát" rồi mở lại -> làm tiếp đúng phần, đúng câu, đúng giờ.
 * Bài kiểm tra level chưa mở (học < 80% bài) vẫn làm được — trang danh sách đã ghi rõ "Chưa mở".
 * ----------------------------------------------------------------------------
 */
import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Exam } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { EmptyState } from '../../../design-system/components/EmptyState'
import { useToast } from '../../../design-system/components/Toast'
import { useAuth } from '../../../services/auth-context'
import { useExamDisplay } from '../../exam-ui/ExamDisplaySettings'
import { examRulesFor, findExam, isObjectiveSection, type ExamRunMode } from '../exam-catalog'
import type { SpeakingAnswer } from '../exam-grading'
import { skillTextKey, useExamRoomText } from '../exam-room-text'
import { useExamSession } from '../exam-session'
import '../exam-room.css'
import './exam-runner.css'
import { ExamOverview, SectionIntro } from './ExamIntroScreens'
import { GradingScreen } from './GradingScreen'
import { ObjectiveSection } from './ObjectiveSection'
import { SpeakingSection } from './SpeakingSection'
import { WritingSection } from './WritingSection'

export function ExamRunnerPage() {
  const { examId = '' } = useParams()
  const text = useExamRoomText()
  const { user } = useAuth()
  const exam = findExam(examId)
  if (!exam) {
    return (
      <div className="xr-fullscreen-empty">
        <EmptyState pose="thinking" title={text('examNotFound')} text={text('examNotFoundText')} action={<Button to="/exams">{text('backToExams')}</Button>} />
      </div>
    )
  }
  if (!user) return null
  return <ExamRunner key={`${user.id}-${exam.id}`} exam={exam} userId={user.id} />
}

function ExamRunner({ exam, userId }: { exam: Exam; userId: number }) {
  const text = useExamRoomText()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const handle = useExamSession(userId, exam)
  const { session, update, reset } = handle
  const display = useExamDisplay()
  const takesRef = useRef<Record<number, SpeakingAnswer[]>>({})
  // mở lại đề đang làm dở -> hiện màn tổng quan có thẻ "Làm tiếp" trước (cần 1 cú bấm để phát âm thanh)
  const [resumeGate, setResumeGate] = useState(() => session.stage === 'section' || session.stage === 'section-intro')

  const rules = examRulesFor(exam, session.mode)
  const sectionIndex = session.sectionOrder[session.step] ?? 0
  const section = exam.sections[sectionIndex]
  const position = { n: session.step + 1, total: session.sectionOrder.length }
  const exit = () => navigate('/exams')

  const start = (mode: ExamRunMode, sectionOrder: number[]) => {
    takesRef.current = {}
    update({ mode, sectionOrder, step: 0, stage: 'section-intro', startedAt: new Date().toISOString() }, true)
  }

  const finishSection = (reason: 'manual' | 'time-up') => {
    if (reason === 'time-up') showToast({ icon: '⏰', text: text('timeUpToast', { skill: text(skillTextKey(section.skill)) }) })
    update((current) => (current.step + 1 < current.sectionOrder.length ? { step: current.step + 1, stage: 'section-intro', listeningCheckLeft: null } : { stage: 'grading' }), true)
  }

  if (session.stage === 'overview' || resumeGate) {
    return (
      <ExamOverview
        exam={exam}
        session={session}
        display={display}
        resuming={resumeGate}
        onStart={start}
        onResume={() => setResumeGate(false)}
        onRestart={() => {
          reset('exam')
          setResumeGate(false)
        }}
        onExit={exit}
      />
    )
  }

  if (session.stage === 'grading') return <GradingScreen exam={exam} handle={handle} takesRef={takesRef} display={display} />

  if (session.stage === 'section-intro') {
    return <SectionIntro key={sectionIndex} exam={exam} sectionIndex={sectionIndex} position={position} mode={session.mode} display={display} onStart={() => update({ stage: 'section' }, true)} onExit={exit} />
  }

  const common = { exam, sectionIndex, position, handle, rules, display, onSubmit: finishSection, onExit: exit }
  if (isObjectiveSection(section)) return <ObjectiveSection key={sectionIndex} {...common} />
  if (section.skill === 'writing') return <WritingSection key={sectionIndex} {...common} />
  return <SpeakingSection key={sectionIndex} {...common} takesRef={takesRef} />
}
