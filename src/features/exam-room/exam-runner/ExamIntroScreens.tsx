/**
 * ExamIntroScreens.tsx — 2 MÀN MỞ ĐẦU CỦA PHÒNG THI (dùng TaskIntro của exam-ui, không mascot)
 * ----------------------------------------------------------------------------
 *   <ExamOverview>   màn đầu tiên của 1 đề:
 *       - thông tin đề + bảng các phần (kỹ năng · số câu · phút) + luật phòng thi
 *       - đề thi thử: chọn "Thi thật" hoặc "Luyện từng phần" (chọn được phần muốn làm)
 *       - test Level 1: ghi rõ "không bấm giờ"
 *       - đang làm dở: thẻ "Bạn đang làm dở đề này" -> "Làm tiếp" (Enter) / "Làm lại từ đầu"
 *   <SectionIntro>   trước mỗi phần (như màn hướng dẫn trước từng phần của máy thi):
 *       "Phần 2/4 · Reading · 3 passage · 40 câu · 60 phút" + cách làm + nút bắt đầu.
 *       Phần Nghe có nút "Thử loa".
 * ----------------------------------------------------------------------------
 */
import { useState } from 'react'
import type { Exam } from '../../../content/content-types'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Modal } from '../../../design-system/components/Modal'
import { playAudioLine } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import type { ExamDisplay } from '../../exam-ui/ExamDisplaySettings'
import { ExamFrame } from '../../exam-ui/ExamFrame'
import { TaskIntro } from '../../exam-ui/TaskIntro'
import { examFacts, examRulesFor, isObjectiveSection, offersModeChoice, sectionQuestionCount, type ExamRunMode } from '../exam-catalog'
import { formatDuration, skillTextKey, useExamRoomText } from '../exam-room-text'
import type { ExamSession } from '../exam-session'

/* ============================================================================
 * Màn tổng quan đề
 * ========================================================================== */

export interface ExamOverviewProps {
  exam: Exam
  session: ExamSession
  display: ExamDisplay
  /** đang làm dở -> hiện thẻ "Làm tiếp" */
  resuming: boolean
  onStart: (mode: ExamRunMode, sectionOrder: number[]) => void
  onResume: () => void
  onRestart: () => void
  onExit: () => void
}

export function ExamOverview({ exam, session, display, resuming, onStart, onResume, onRestart, onExit }: ExamOverviewProps) {
  const text = useExamRoomText()
  const { pick, language } = useLanguage()
  const [mode, setMode] = useState<ExamRunMode>(session.mode)
  const allSections = exam.sections.map((_, index) => index)
  const [picked, setPicked] = useState<number[]>(allSections)
  const [restartOpen, setRestartOpen] = useState(false)
  const rules = examRulesFor(exam, mode)
  const chosen = rules.canPickSections ? picked : allSections
  const facts = examFacts(exam, chosen)
  const eyebrow = exam.kind === 'mock-ielts' ? text('eyebrow_mock') : exam.kind === 'level-test' ? text('eyebrow_level-test') : text('eyebrow_placement')

  const togglePick = (index: number) => setPicked((current) => (current.includes(index) ? current.filter((value) => value !== index) : [...current, index].sort((a, b) => a - b)))

  const resumeSection = exam.sections[session.sectionOrder[session.step] ?? 0]
  const objectiveIds = session.sectionOrder.flatMap((index) => (exam.sections[index]?.parts ?? []).flatMap((part) => part.questions.map((question) => question.id)))
  const answered = objectiveIds.filter((id) => (session.answers[id] ?? '').trim()).length

  return (
    <ExamFrame display={display} variant="standalone" className="xr-frame" title={pick(exam.title)} onExit={onExit} exitLabel={text('backToExams')}>
      <div className="xr-intro-scroll">
        <TaskIntro
          skill={exam.sections[0]?.skill ?? 'reading'}
          eyebrow={eyebrow}
          title={pick(exam.title)}
          description={pick(exam.description)}
          facts={[
            { icon: 'clock', text: rules.timed ? formatDuration(facts.totalMinutes, language) : text('noTimer') },
            { icon: 'exam', text: text('questions', { n: facts.objectiveQuestions }) },
            { icon: 'learn', text: facts.skills.map((skill) => text(skillTextKey(skill))).join(' · ') },
          ]}
          modeGroupLabel={text('modeGroup')}
          modes={
            offersModeChoice(exam) && !resuming
              ? [
                  { id: 'exam' as const, title: text('modeExamTitle'), icon: 'clock', points: [text('modeExamPoint1'), text('modeExamPoint2'), text('modeExamPoint3')] },
                  { id: 'practice' as const, title: text('modePracticeTitle'), icon: 'learn', points: [text('modePracticePoint1'), text('modePracticePoint2'), text('modePracticePoint3')] },
                ]
              : []
          }
          mode={mode}
          onModeChange={setMode}
          onStart={() => (resuming ? onResume() : chosen.length > 0 && onStart(mode, chosen))}
          startLabel={resuming ? text('resume') : text('startExam')}
          onLater={onExit}
          laterLabel={text('backToExams')}
        >
          {resuming ? (
            <div className="xr-resume-card" role="status">
              <Icon name="clock" size={20} />
              <div>
                <strong>{text('resumeTitle')}</strong>
                <p>
                  {resumeSection && objectiveIds.length > 0
                    ? text('resumeText', { section: text(skillTextKey(resumeSection.skill)), done: answered, total: objectiveIds.length })
                    : text('resumeTextShort', { section: resumeSection ? text(skillTextKey(resumeSection.skill)) : '' })}
                </p>
              </div>
              <Button variant="ghost" size="sm" iconLeft="retry" onClick={() => setRestartOpen(true)}>
                {text('restart')}
              </Button>
            </div>
          ) : (
            <>
              <div className="xr-sections">
                <p className="xr-sections__title">{rules.canPickSections ? text('pickSections') : text('sectionsTitle')}</p>
                <ul className="xr-sections__list">
                  {exam.sections.map((section, index) => {
                    const count = isObjectiveSection(section) ? text('questions', { n: sectionQuestionCount(section) }) : section.writingTasks ? text('tasksCount', { n: section.writingTasks.length }) : text('partsCount', { n: section.speakingParts?.length ?? 0 })
                    const content = (
                      <>
                        <span className={`xr-sections__dot xr-sections__dot--${section.skill}`} aria-hidden />
                        <span className="xr-sections__name">
                          <strong>{text(skillTextKey(section.skill))}</strong>
                          <span>{section.title}</span>
                        </span>
                        <span className="xr-sections__count">{count}</span>
                        <span className="xr-sections__time ds-num">{rules.timed ? text('minutes', { n: section.durationMinutes }) : '—'}</span>
                      </>
                    )
                    return (
                      <li key={section.title + index}>
                        {rules.canPickSections ? (
                          <label className={picked.includes(index) ? 'xr-sections__row is-picked' : 'xr-sections__row'}>
                            <input type="checkbox" checked={picked.includes(index)} onChange={() => togglePick(index)} />
                            {content}
                          </label>
                        ) : (
                          <div className="xr-sections__row">{content}</div>
                        )}
                      </li>
                    )
                  })}
                </ul>
                {rules.canPickSections && picked.length === 0 && <p className="xr-sections__warn">{text('pickAtLeastOne')}</p>}
              </div>
              <div className="xr-rules">
                <p className="xr-sections__title">{text('rulesTitle')}</p>
                <ul>
                  {!rules.timed && <li>{text('ruleNoTimer')}</li>}
                  {Number.isFinite(rules.listeningPlays) && rules.listeningPlays > 1 && exam.sections.some((section) => section.skill === 'listening') && <li>{text('rulePlays', { n: rules.listeningPlays })}</li>}
                  <li>{text('rule1')}</li>
                  <li>{text('rule2')}</li>
                  <li>{text('rule3')}</li>
                  {exam.sections.some((section) => section.skill === 'writing' || section.skill === 'speaking') && <li>{text('rule4')}</li>}
                </ul>
              </div>
            </>
          )}
        </TaskIntro>
      </div>
      <Modal
        open={restartOpen}
        onClose={() => setRestartOpen(false)}
        size="sm"
        title={text('restartTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={() => setRestartOpen(false)}>
              {text('cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setRestartOpen(false)
                onRestart()
              }}
            >
              {text('restart')}
            </Button>
          </>
        }
      >
        <p className="xr-dialog-text">{text('restartText')}</p>
      </Modal>
    </ExamFrame>
  )
}

/* ============================================================================
 * Màn trước mỗi phần
 * ========================================================================== */

export interface SectionIntroProps {
  exam: Exam
  sectionIndex: number
  position: { n: number; total: number }
  mode: ExamRunMode
  display: ExamDisplay
  onStart: () => void
  onExit: () => void
}

export function SectionIntro({ exam, sectionIndex, position, mode, display, onStart, onExit }: SectionIntroProps) {
  const text = useExamRoomText()
  const { pick } = useLanguage()
  const section = exam.sections[sectionIndex]
  const rules = examRulesFor(exam, mode)
  const skillName = text(skillTextKey(section.skill))

  const facts: { icon: 'exam' | 'clock' | 'learn'; text: string }[] = []
  if (section.parts) facts.push({ icon: 'learn', text: text(section.skill === 'reading' ? 'passagesCount' : 'partsCount', { n: section.parts.length }) }, { icon: 'exam', text: text('questions', { n: sectionQuestionCount(section) }) })
  if (section.writingTasks) facts.push({ icon: 'exam', text: text('tasksCount', { n: section.writingTasks.length }) })
  if (section.speakingParts) facts.push({ icon: 'learn', text: text('partsCount', { n: section.speakingParts.length }) })
  const listeningAuto = section.skill === 'listening' && rules.autoPlayListening
  if (section.skill !== 'speaking' && !listeningAuto) facts.push({ icon: 'clock', text: rules.timed ? text('minutes', { n: section.durationMinutes }) : text('noTimer') })

  const tip =
    section.skill === 'listening'
      ? listeningAuto
        ? text('intro_listening_auto', { n: section.parts?.length ?? 4 })
        : Number.isFinite(rules.listeningPlays)
          ? text('intro_listening_limited', { n: rules.listeningPlays })
          : text('intro_listening_free')
      : section.skill === 'reading'
        ? text('intro_reading')
        : section.skill === 'writing'
          ? (section.writingTasks?.length ?? 0) > 1
            ? text('intro_writing')
            : text('intro_writing_single')
          : section.skill === 'speaking'
            ? text('intro_speaking')
            : text('intro_vocabulary')

  return (
    <ExamFrame display={display} variant="standalone" className="xr-frame" title={`${section.title} · ${pick(exam.title)}`} skill={section.skill === 'vocabulary' ? undefined : section.skill} onExit={onExit} exitLabel={text('leave')}>
      <div className="xr-intro-scroll">
        <TaskIntro
          skill={section.skill}
          eyebrow={`${text('sectionOf', position)} · ${pick(exam.title)}`}
          title={`${skillName} · ${section.title}`}
          facts={facts}
          tipTitle={text('tipTitle')}
          tip={tip}
          onStart={onStart}
          startLabel={section.skill === 'listening' && listeningAuto ? text('startListening') : text('startSection', { skill: skillName })}
          onLater={onExit}
          laterLabel={text('leave')}
        >
          {section.skill === 'listening' && (
            <div className="xr-soundcheck">
              <span aria-hidden>🎧</span>
              <Button variant="secondary" size="sm" iconLeft="volume" onClick={() => playAudioLine({ text: text('soundCheckLine') })}>
                {text('soundCheck')}
              </Button>
            </div>
          )}
        </TaskIntro>
      </div>
    </ExamFrame>
  )
}
