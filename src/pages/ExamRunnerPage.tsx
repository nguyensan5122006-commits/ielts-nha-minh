/**
 * ExamRunnerPage.tsx — PHÒNG THI (toàn màn hình)
 * ----------------------------------------------------------------------------
 * Các giai đoạn:
 *   'intro'   : thông tin đề + luật thi -> bấm Bắt đầu
 *   'section' : làm lần lượt từng phần (Listening -> Reading -> Writing -> Speaking).
 *               Mỗi phần có đồng hồ đếm ngược; hết giờ tự nộp phần đó.
 *               (Speaking không ép giờ vì đã có giờ cho từng câu.)
 *   'grading' : chấm điểm — câu trắc nghiệm chấm ngay, Writing/Speaking gửi AI.
 * Chấm xong: lưu kết quả lên máy chủ, cập nhật tiến độ, chuyển sang trang kết quả.
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { findExam } from '../content/all-exams'
import { findLevelInfo } from '../content/all-levels'
import type { Exam, ExamSection } from '../content/content-types'
import { describeChartAsText } from '../components/WritingTaskChart'
import { ObjectiveSectionView } from '../exam-engine/ObjectiveSectionView'
import { SpeakingSectionView, type SpeakingPartRecordings } from '../exam-engine/SpeakingSectionView'
import { WritingSectionView } from '../exam-engine/WritingSectionView'
import {
  buildExamResult,
  gradeObjectiveSection,
  gradePlacement,
  type ExamAnswers,
  type ExamResult,
  type QuestionReview,
  type SectionResult,
} from '../exam-engine/exam-scoring'
import { useProgress } from '../learning-progress/progress-store'
import { useWallet } from '../player-wallet/wallet-store'
import { api } from '../services/api-client'
import { countWords } from '../services/answer-checking'
import { useAuth } from '../services/auth-context'
import { stopSpeaking } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'

/** Nơi lưu tạm kết quả nếu không gửi được lên máy chủ. */
export const LOCAL_RESULT_KEY = 'ielts-last-exam-result'

/** XP thưởng khi làm xong 1 bài thi. */
const EXAM_XP: Record<Exam['kind'], number> = { placement: 20, 'level-test': 40, 'mock-ielts': 60 }

export function ExamRunnerPage() {
  const { examId = '' } = useParams()
  const exam = findExam(examId)
  if (!exam) return <Navigate to="/exams" replace />
  return <ExamRunner exam={exam} />
}

function ExamRunner({ exam }: { exam: Exam }) {
  const { t, pick } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { addXp, setPlacementResult, passLevelTest, recordMistake, recordActivity, markStudyDay } = useProgress()
  const { earnBananas } = useWallet()

  const [phase, setPhase] = useState<'intro' | 'section' | 'grading'>('intro')
  const [sectionIndex, setSectionIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [answers, setAnswers] = useState<ExamAnswers>({})
  const speakingRecordings = useRef<SpeakingPartRecordings[]>([])
  const [gradingError, setGradingError] = useState('')

  const section: ExamSection | undefined = exam.sections[sectionIndex]
  const level = exam.levelId ? findLevelInfo(exam.levelId) : undefined
  const targetBand = level?.bandRange

  const setAnswer = useCallback((id: string, value: string) => setAnswers((current) => ({ ...current, [id]: value })), [])

  /* ---------- cảnh báo khi lỡ tay đóng tab giữa giờ thi ---------- */
  useEffect(() => {
    if (phase === 'intro') return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [phase])

  /* ---------- chấm điểm toàn bài ---------- */
  const gradeEverything = useCallback(async () => {
    setPhase('grading')
    stopSpeaking()
    const sectionResults: SectionResult[] = []
    const reviews: QuestionReview[] = []

    // Chạy song song: mỗi phần trả về 1 SectionResult
    const sectionPromises = exam.sections.map(async (current): Promise<SectionResult> => {
      if (current.skill === 'writing') {
        const aiResults = await Promise.all(
          (current.writingTasks ?? []).map(async (task) => {
            const text = answers[task.id] ?? ''
            const label = `Task ${task.taskNumber}`
            if (countWords(text) < 5) return { label, prompt: task.prompt, userText: text, result: null, error: 'Bỏ trống / Empty' }
            try {
              const { result } = await api.gradeWriting({
                prompt: task.prompt,
                answer: text,
                taskKind: exam.kind === 'mock-ielts' ? (task.taskNumber === 1 ? 'task1' : 'task2') : 'lesson',
                targetBand,
                chartDescription: task.chartData ? describeChartAsText(task.chartData) : undefined,
              })
              return { label, prompt: task.prompt, userText: text, result }
            } catch (e) {
              return { label, prompt: task.prompt, userText: text, result: null, error: (e as Error).message }
            }
          }),
        )
        return { skill: current.skill, title: current.title, aiResults }
      }

      if (current.skill === 'speaking') {
        const aiResults = await Promise.all(
          speakingRecordings.current.map(async (part) => {
            const label = `Part ${part.partNumber}`
            const prompt = part.answers.map((a) => a.question).join('\n')
            try {
              const { result } = await api.gradeSpeaking({
                context: exam.kind === 'mock-ielts' ? 'ielts' : 'lesson',
                partLabel: label,
                targetBand,
                answers: part.answers.map((a) => ({ question: a.question, audioBase64: a.audio.base64Wav, mimeType: a.audio.mimeType })),
              })
              return { label, prompt, result }
            } catch (e) {
              return { label, prompt, result: null, error: (e as Error).message }
            }
          }),
        )
        return { skill: current.skill, title: current.title, aiResults }
      }

      const graded = gradeObjectiveSection(current, answers)
      reviews.push(...graded.reviews)
      return graded.result
    })
    sectionResults.push(...(await Promise.all(sectionPromises)))

    const placement = exam.kind === 'placement' ? gradePlacement(exam, answers) : undefined
    const result: ExamResult = buildExamResult(exam, sectionResults, reviews, placement)

    /* ---- cập nhật tiến độ học ---- */
    addXp(EXAM_XP[exam.kind])
    recordActivity('examsTaken')
    markStudyDay() // làm xong bài thi = hôm nay có học (giữ chuỗi ngày)
    if (exam.kind === 'placement') void earnBananas('exam-placement')
    if (exam.kind === 'mock-ielts') void earnBananas('exam-mock')
    if (result.levelTest?.passed) void earnBananas('level-test')
    if (placement) setPlacementResult(placement.recommendedLevelOrder, placement.estimatedBand)
    if (result.levelTest?.passed && level) passLevelTest(level.id, level.order, result.percent ?? 0)
    // câu sai -> sổ lỗi sai (tối đa 40 câu / bài để sổ không quá dài)
    reviews
      .filter((r) => !r.isCorrect)
      .slice(0, 40)
      .forEach((r) =>
        recordMistake({
          source: 'exam',
          itemId: r.questionId,
          parentId: exam.id,
          question: `[${exam.id} · ${r.skill} · Q${r.number}] ${r.prompt}`,
          userAnswer: r.userAnswer,
          correctAnswer: r.correctAnswer,
          explanation: r.explanation?.vi,
          context: r.context?.slice(0, 4000),
        }),
      )

    /* ---- lưu kết quả ---- */
    try {
      const { id } = await api.saveExamResult(exam.id, result)
      navigate(`/exam-result/${id}`, { replace: true })
    } catch (e) {
      try {
        sessionStorage.setItem(LOCAL_RESULT_KEY, JSON.stringify(result))
      } catch {
        /* bỏ qua */
      }
      setGradingError((e as Error).message)
      navigate('/exam-result/local', { replace: true })
    }
  }, [exam, answers, targetBand, addXp, setPlacementResult, passLevelTest, recordMistake, recordActivity, markStudyDay, level, navigate])

  /* ---------- chuyển phần ---------- */
  const goToNextSection = useCallback(() => {
    stopSpeaking()
    if (sectionIndex + 1 < exam.sections.length) {
      const next = sectionIndex + 1
      setSectionIndex(next)
      setSecondsLeft(exam.sections[next].durationMinutes * 60)
      window.scrollTo(0, 0)
    } else {
      void gradeEverything()
    }
  }, [sectionIndex, exam.sections, gradeEverything])

  /* ---------- đồng hồ đếm ngược ---------- */
  useEffect(() => {
    if (phase !== 'section' || section?.skill === 'speaking') return
    if (secondsLeft <= 0) {
      goToNextSection() // hết giờ: tự nộp phần này
      return
    }
    const timer = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [phase, secondsLeft, section?.skill, goToNextSection])

  /* ======================= GIAO DIỆN ======================= */

  if (phase === 'intro') {
    const totalMinutes = exam.sections.reduce((sum, s) => sum + s.durationMinutes, 0)
    return (
      <div className="exam-shell">
        <div className="exam-header">
          <strong>{pick(exam.title)}</strong>
          <span>{user?.displayName}</span>
        </div>
        <div className="exam-single" style={{ maxWidth: 760 }}>
          <span className="badge badge--primary">{t(`kind_${exam.kind}`)}</span>
          <h1 style={{ marginTop: 10 }}>{pick(exam.title)}</h1>
          <p className="muted">{pick(exam.description)}</p>
          <div className="card" style={{ margin: '20px 0' }}>
            {exam.sections.map((s) => (
              <div key={s.title} className="row row--between" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                <strong>{s.title}</strong>
                <span className="muted">{t('minutes', { n: s.durationMinutes })}</span>
              </div>
            ))}
            <div className="row row--between" style={{ paddingTop: 10 }}>
              <strong>{t('overall')}</strong>
              <strong>{t('minutes', { n: totalMinutes })}</strong>
            </div>
          </div>
          <h3>{t('examRules')}</h3>
          <ul className="muted">
            <li>{t('examRule1')}</li>
            <li>{t('examRule2')}</li>
            <li>{t('examRule3')}</li>
            <li>{t('examRule4')}</li>
          </ul>
          <div className="row" style={{ marginTop: 20 }}>
            <Link to="/exams" className="button button--secondary button--large">
              {t('back')}
            </Link>
            <button
              type="button"
              className="button button--primary button--large"
              onClick={() => {
                setSecondsLeft(exam.sections[0].durationMinutes * 60)
                setPhase('section')
              }}
            >
              {t('startExam')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'grading' || !section) {
    return (
      <div className="exam-shell">
        <div className="exam-single celebration">
          <span className="spinner" style={{ width: 48, height: 48 }} />
          <p style={{ marginTop: 20 }}>{t('gradingExam')}</p>
          {gradingError && <div className="alert">{gradingError}</div>}
        </div>
      </div>
    )
  }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <div className="exam-shell">
      {/* thanh trên: tên thí sinh | phần thi | đồng hồ | nút nộp phần */}
      <div className="exam-header">
        <span>
          👤 {user?.displayName} · <strong>{section.title}</strong> ({sectionIndex + 1}/{exam.sections.length})
        </span>
        <div className="row">
          {section.skill !== 'speaking' && (
            <>
              <span className={`exam-timer ${secondsLeft < 120 ? 'is-urgent' : ''}`}>
                ⏱ {t('timeLeft')} {minutes}:{String(seconds).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="button button--secondary button--small"
                onClick={() => {
                  if (window.confirm(t('confirmNextSection'))) goToNextSection()
                }}
              >
                {t('nextSection')} →
              </button>
            </>
          )}
        </div>
      </div>

      {(section.skill === 'listening' || section.skill === 'reading' || section.skill === 'vocabulary') && (
        <ObjectiveSectionView key={sectionIndex} section={section} answers={answers} onAnswer={setAnswer} />
      )}
      {section.skill === 'writing' && <WritingSectionView key={sectionIndex} section={section} answers={answers} onAnswer={setAnswer} />}
      {section.skill === 'speaking' && (
        <SpeakingSectionView
          key={sectionIndex}
          section={section}
          onFinished={(recordings) => {
            speakingRecordings.current = recordings
            goToNextSection()
          }}
        />
      )}
    </div>
  )
}

