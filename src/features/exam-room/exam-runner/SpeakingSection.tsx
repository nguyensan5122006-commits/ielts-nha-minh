/**
 * SpeakingSection.tsx — PHẦN THI NÓI VỚI "GIÁM KHẢO ẢO" (Part 1 · Part 2 cue card · Part 3)
 * ----------------------------------------------------------------------------
 * Mỗi câu hỏi đi qua các bước:
 *   part-intro -> asking (giám khảo đọc câu hỏi bằng giọng máy, chữ hiện kèm)
 *              -> preparing (chỉ Part 2: 1 phút chuẩn bị, có ô ghi chú, nút "Nói luôn")
 *              -> answering (tự bật ghi âm, thanh thời gian; hết giờ hoặc bấm Dừng)
 *              -> answered  (thi thật: tự sang câu sau · luyện tập: nghe lại / ghi lại / "Câu tiếp")
 * Dùng lại của nhóm skill-speaking: useMicrophone + MicGate (xin quyền có giải thích, lối thoát
 * "không có micro") và SpeakingRecorder (sóng âm, tự dừng, đổi WAV để AI nghe).
 * Bản ghi nằm trong `takesRef` của trang cha (không lưu vào máy — quá nặng); chấm AI sau khi nộp cả đề.
 * Không có micro / không muốn thi nói -> "Bỏ qua phần Nói" (phần Nói không có band).
 * ----------------------------------------------------------------------------
 */
import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'
import { Button } from '../../../design-system/components/Button'
import { Icon } from '../../../design-system/components/Icon'
import { Modal } from '../../../design-system/components/Modal'
import { useCountdown } from '../../../design-system/components/Timer'
import { speak, stopSpeaking } from '../../../services/text-to-speech'
import { useLanguage } from '../../../translations/language-context'
import { ExamFrame, ModeBadge } from '../../exam-ui/ExamFrame'
import { MicGate } from '../../skill-speaking/MicGate'
import { SpeakingRecorder, type RecordingTake } from '../../skill-speaking/SpeakingRecorder'
import '../../skill-speaking/SpeakingTaskPlayer.css'
import { useMicrophone } from '../../skill-speaking/use-microphone'
import type { SpeakingAnswer } from '../exam-grading'
import { useExamRoomText } from '../exam-room-text'
import type { SectionRunnerProps } from './ObjectiveSection'
import { ExitDialog, useSpentSeconds, useUnloadWarning } from './runner-shared'

type Stage = 'part-intro' | 'asking' | 'preparing' | 'answering' | 'answered'

export interface SpeakingSectionProps extends SectionRunnerProps {
  /** nơi giữ bản ghi theo Part (trang cha dùng để chấm) */
  takesRef: MutableRefObject<Record<number, SpeakingAnswer[]>>
}

const formatMinutes = (seconds: number, language: 'vi' | 'en') => (seconds % 60 === 0 ? `${seconds / 60} ${language === 'vi' ? 'phút' : 'min'}` : `${seconds} ${language === 'vi' ? 'giây' : 's'}`)

export function SpeakingSection({ exam, sectionIndex, position, handle, rules, display, onSubmit, onExit, takesRef }: SpeakingSectionProps) {
  const text = useExamRoomText()
  const { language } = useLanguage()
  const { session, update } = handle
  const section = exam.sections[sectionIndex]
  const parts = section.speakingParts ?? []
  const mic = useMicrophone()
  const practice = session.mode === 'practice' && !rules.timed

  const [partIndex, setPartIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [stage, setStage] = useState<Stage>('part-intro')
  const [notes, setNotes] = useState('')
  const [take, setTake] = useState<RecordingTake | null>(null)
  const [skipOpen, setSkipOpen] = useState(false)
  const [exitOpen, setExitOpen] = useState(false)

  useSpentSeconds(handle, sectionIndex)
  useUnloadWarning(true)
  useEffect(() => () => stopSpeaking(), [])

  // tải lại trang giữa phần Nói -> bản ghi đã mất, làm lại từ đầu
  useEffect(() => {
    takesRef.current = {}
  }, [takesRef])

  const part = parts[partIndex]
  const question = part?.questions[questionIndex] ?? ''
  const isLastQuestion = partIndex === parts.length - 1 && questionIndex === (part?.questions.length ?? 1) - 1

  /* ---------- giám khảo đọc câu hỏi ---------- */
  const askToken = useRef(0)
  const ask = useCallback(() => {
    if (!part) return
    const token = ++askToken.current
    setStage('asking')
    const spoken = part.partNumber === 2 ? `${question}. You should say: ${(part.cueCardPoints ?? []).join('. ')}` : question
    void speak(spoken).then(() => {
      if (token !== askToken.current) return
      setStage(part.prepSeconds > 0 ? 'preparing' : 'answering')
    })
  }, [part, question])

  useEffect(() => {
    if (stage === 'asking') return
    // rời bước hỏi (VD bấm "Trả lời luôn") -> ngắt giọng đọc
    askToken.current++
  }, [stage])

  /* ---------- ghi âm xong 1 câu ---------- */
  const saveTake = (recorded: RecordingTake) => {
    if (!part) return
    const list = takesRef.current[part.partNumber] ?? []
    list[questionIndex] = { question, audio: recorded }
    takesRef.current[part.partNumber] = list
    setTake(recorded)
    setStage('answered')
  }

  const goNext = useCallback(() => {
    stopSpeaking()
    setTake(null)
    if (!part) return
    if (questionIndex + 1 < part.questions.length) {
      setQuestionIndex(questionIndex + 1)
      setStage('asking')
      return
    }
    if (partIndex + 1 < parts.length) {
      setPartIndex(partIndex + 1)
      setQuestionIndex(0)
      setNotes('')
      setStage('part-intro')
      return
    }
    // gọn danh sách (bỏ ô trống do bỏ qua câu) rồi nộp
    for (const key of Object.keys(takesRef.current)) takesRef.current[Number(key)] = takesRef.current[Number(key)].filter(Boolean)
    onSubmit('manual')
  }, [part, partIndex, parts.length, questionIndex, takesRef, onSubmit])

  // bước "asking" mới -> đọc câu hỏi
  useEffect(() => {
    if (stage === 'asking') ask()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- chỉ khi sang câu mới
  }, [stage, partIndex, questionIndex])

  // thi thật: ghi xong tự sang câu sau (nhịp ngắn để người học thấy "Đã ghi âm")
  useEffect(() => {
    if (stage !== 'answered' || practice) return
    const id = window.setTimeout(goNext, 1200)
    return () => window.clearTimeout(id)
  }, [stage, practice, goNext])

  const skip = () => {
    stopSpeaking()
    setSkipOpen(false)
    for (const key of Object.keys(takesRef.current)) takesRef.current[Number(key)] = takesRef.current[Number(key)].filter(Boolean)
    update({ speakingSkipped: true }, true)
    onSubmit('manual')
  }

  if (!part) return null
  const total = parts.reduce((sum, candidate) => sum + candidate.questions.length, 0)
  const doneBefore = parts.slice(0, partIndex).reduce((sum, candidate) => sum + candidate.questions.length, 0) + questionIndex
  const partIntro = part.partNumber === 1 ? text('part1Intro') : part.partNumber === 2 ? text('part2Intro', { n: formatMinutes(part.answerSeconds, language) }) : text('part3Intro')

  return (
    <ExamFrame
      display={display}
      variant="standalone"
      className="xr-frame"
      title={section.title}
      skill="speaking"
      badge={
        <>
          <ModeBadge mode={exam.kind === 'level-test' ? 'test' : practice ? 'practice' : 'exam'} />
          <span className="xr-frame__position">{text('sectionOf', position)}</span>
        </>
      }
      onExit={() => setExitOpen(true)}
      exitLabel={text('leave')}
      footer={
        <div className="xr-speak-bar">
          <ol className="xr-speak-bar__parts" aria-label={text('speakingProgress', { p: part.partNumber, i: questionIndex + 1, n: part.questions.length })}>
            {parts.map((candidate, index) => (
              <li key={candidate.partNumber} className={index < partIndex ? 'is-done' : index === partIndex ? 'is-current' : ''}>
                <span className="xr-speak-bar__label">Part {candidate.partNumber}</span>
                <span className="xr-speak-bar__dots" aria-hidden>
                  {candidate.questions.map((_, qIndex) => (
                    <i key={qIndex} className={index < partIndex || (index === partIndex && (qIndex < questionIndex || (qIndex === questionIndex && stage === 'answered'))) ? 'is-done' : index === partIndex && qIndex === questionIndex ? 'is-current' : ''} />
                  ))}
                </span>
              </li>
            ))}
          </ol>
          <span className="xr-speak-bar__count ds-num">
            {doneBefore + (stage === 'answered' ? 1 : 0)}/{total}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSkipOpen(true)}>
            {text('skipSpeaking')}
          </Button>
        </div>
      }
    >
      <div className="xr-speak">
        <MicGate mic={mic}>
          {stage === 'part-intro' ? (
            <section className="xr-speak__card xr-speak__intro">
              <span className="xr-eyebrow">{text('speakingPart', { n: part.partNumber })}</span>
              <h2 className="xr-speak__title">{partIntro}</h2>
              <p className="xr-speak__meta">
                {text('questions', { n: part.questions.length })}
                {part.prepSeconds > 0 && ` · ${text('prepLeft', { s: part.prepSeconds })}`}
              </p>
              <p className="xr-speak__note">
                <Icon name="hint" size={16} /> {text('speakingReloadNote')}
              </p>
              <Button size="lg" iconRight="arrow-right" onClick={() => setStage('asking')} autoFocus>
                {text('startPart', { n: part.partNumber })}
              </Button>
            </section>
          ) : (
            <section className="xr-speak__card">
              <div className="xr-speak__examiner">
                <span className="xr-speak__avatar" aria-hidden>
                  🧑‍🏫
                </span>
                <div className="xr-speak__bubble">
                  <span className="xr-speak__who">
                    {text('examiner')} · {text('questionOf', { i: questionIndex + 1, n: part.questions.length })}
                    {stage === 'asking' && <span className="xr-speak__asking">{text('examinerAsking')}</span>}
                  </span>
                  <p className="xr-speak__question" lang="en">
                    {question}
                  </p>
                  {part.partNumber === 2 && part.cueCardPoints && (
                    <div className="xr-speak__cue" lang="en">
                      <span>{text('youShouldSay')}</span>
                      <ul>
                        {part.cueCardPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {stage === 'asking' && (
                    <button type="button" className="xr-link-button" onClick={ask}>
                      <Icon name="volume" size={15} /> {text('repeatQuestion')}
                    </button>
                  )}
                </div>
              </div>

              {stage === 'asking' && (
                <div className="xr-speak__actions">
                  <Button variant="secondary" onClick={() => setStage(part.prepSeconds > 0 ? 'preparing' : 'answering')}>
                    {part.prepSeconds > 0 ? text('startPrep') : text('speakNow')}
                  </Button>
                </div>
              )}

              {stage === 'preparing' && <PrepStage key={`${partIndex}-${questionIndex}`} seconds={part.prepSeconds} notes={notes} onNotes={setNotes} onDone={() => setStage('answering')} />}

              {(stage === 'answering' || stage === 'answered') && (
                <div className="xr-speak__record">
                  {part.partNumber === 2 && notes.trim() && (
                    <p className="xr-speak__my-notes">
                      <Icon name="hint" size={15} /> {notes}
                    </p>
                  )}
                  {mic.state === 'ready' ? (
                    <SpeakingRecorder
                      key={`${partIndex}-${questionIndex}`}
                      mic={mic}
                      maxSeconds={part.answerSeconds}
                      targetSeconds={part.partNumber === 2 ? Math.max(30, part.answerSeconds - 20) : undefined}
                      take={practice ? take : null}
                      onRecorded={saveTake}
                      autoStart
                      size={part.partNumber === 2 ? 'lg' : 'md'}
                    />
                  ) : (
                    <p className="xr-speak__no-mic">{text('noMicText')}</p>
                  )}
                  {stage === 'answered' && !practice && (
                    <p className="xr-speak__moving" role="status">
                      <Icon name="check" size={16} strokeWidth={3} /> {text('movingOn')}
                    </p>
                  )}
                  {(practice || mic.state !== 'ready') && (stage === 'answered' || mic.state !== 'ready') && (
                    <div className="xr-speak__actions">
                      <Button iconRight="arrow-right" onClick={goNext}>
                        {isLastQuestion ? text('finishSpeaking') : questionIndex + 1 < part.questions.length ? text('nextQuestion') : text('nextPart', { n: parts[partIndex + 1]?.partNumber ?? '' })}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </MicGate>
      </div>

      <Modal
        open={skipOpen}
        onClose={() => setSkipOpen(false)}
        size="sm"
        title={text('skipSpeakingTitle')}
        footer={
          <>
            <Button variant="secondary" onClick={skip}>
              {text('skipSpeaking')}
            </Button>
            <Button onClick={() => setSkipOpen(false)}>{text('stay')}</Button>
          </>
        }
      >
        <p className="xr-dialog-text">{text('skipSpeakingText')}</p>
      </Modal>
      <ExitDialog
        open={exitOpen}
        onStay={() => setExitOpen(false)}
        onLeave={() => {
          stopSpeaking()
          onExit()
        }}
      />
    </ExamFrame>
  )
}

/** Part 2: 1 phút chuẩn bị + ô ghi chú; hết giờ tự sang "Nói". */
function PrepStage({ seconds, notes, onNotes, onDone }: { seconds: number; notes: string; onNotes: (value: string) => void; onDone: () => void }) {
  const text = useExamRoomText()
  const left = useCountdown(seconds, { running: true, onExpire: onDone })
  return (
    <div className="xr-speak__prep">
      <div className="xr-speak__prep-head">
        <strong className="ds-num">{text('prepLeft', { s: left })}</strong>
        <Button size="sm" onClick={onDone} iconRight="arrow-right">
          {text('speakNow')}
        </Button>
      </div>
      <div className="xr-speak__prep-bar" aria-hidden>
        <span style={{ width: `${(1 - left / seconds) * 100}%` }} />
      </div>
      <label className="xr-speak__prep-label" htmlFor="xr-prep-notes">
        {text('prepNotes')}
      </label>
      <textarea id="xr-prep-notes" className="xr-speak__prep-notes" value={notes} onChange={(event) => onNotes(event.target.value)} placeholder={text('prepNotesPlaceholder')} autoFocus spellCheck={false} />
    </div>
  )
}
