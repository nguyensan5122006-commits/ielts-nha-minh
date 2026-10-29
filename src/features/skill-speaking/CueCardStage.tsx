/**
 * CueCardStage.tsx — PART 2: THẺ ĐỀ 3 PHA (ý 1 trong docs/research/notes/ui-ielts-ai.md, LingoLeap)
 * ----------------------------------------------------------------------------
 *   Sẵn sàng    : đọc thẻ đề (nghe được bằng giọng máy) -> nút "Bắt đầu 1 phút chuẩn bị"
 *   Chuẩn bị 1:00: đồng hồ số to ở góc thẻ + thanh mảnh chạy; Ô GHI CHÚ từ khoá bên cạnh
 *                 (thi thật được phát giấy nháp); hết giờ tự sang pha Nói
 *   Nói 2:00    : máy ghi tự bật (chấm đỏ + sóng âm + thanh thời gian có vạch mục tiêu 1:40),
 *                 hết 2 phút tự dừng
 *   Xong        : nghe lại + "Bạn đã nói 1:52" + 4 ô tự kiểm tra nhanh (tick thật, được lưu)
 * Đồng hồ thu nhỏ được (psych-adult D9 luật 38). Nút chính của từng pha nằm ở thanh đáy của trình.
 * ----------------------------------------------------------------------------
 */
import { useEffect, useState } from 'react'
import { AudioButton } from '../../design-system/components/AudioButton'
import { Icon } from '../../design-system/components/Icon'
import { formatClock } from '../../design-system/components/Timer'
import { useSpeakingText } from './skill-speaking-text'
import type { SpeakingSection } from './speaking-plan'
import { SpeakingRecorder, TakePlayer, type RecordingTake } from './SpeakingRecorder'
import type { MicrophoneHandle } from './use-microphone'

export type CuePhase = 'ready' | 'prepare' | 'speak' | 'done'
export const CUE_PHASES: CuePhase[] = ['ready', 'prepare', 'speak', 'done']

interface CueCardStageProps {
  section: Extract<SpeakingSection, { kind: 'cue-card' }>
  phase: CuePhase
  /** thời điểm (ms) bắt đầu pha hiện tại — để đồng hồ chạy đúng kể cả khi vẽ lại */
  phaseStartedAt: number
  onPhase: (phase: CuePhase) => void
  notes: string
  onNotes: (notes: string) => void
  take: RecordingTake | null
  onTake: (take: RecordingTake) => void
  mic: MicrophoneHandle
  onRecordingChange: (recording: boolean) => void
  quickChecks: boolean[]
  onQuickCheck: (index: number, value: boolean) => void
}

export function CueCardStage({
  section,
  phase,
  phaseStartedAt,
  onPhase,
  notes,
  onNotes,
  take,
  onTake,
  mic,
  onRecordingChange,
  quickChecks,
  onQuickCheck,
}: CueCardStageProps) {
  const text = useSpeakingText()
  const [timerSmall, setTimerSmall] = useState(false)
  const now = useTicker(phase === 'prepare' || phase === 'speak')

  const limit = phase === 'prepare' ? section.prepSeconds : section.speakSeconds
  const elapsed = Math.max(0, (now - phaseStartedAt) / 1000)
  const left = Math.max(0, limit - elapsed)

  // Hết 1 phút chuẩn bị -> tự sang pha Nói (như phòng thi)
  // Không có micro: hết 2 phút nói thì tự sang "Xong" (có micro thì máy ghi tự dừng rồi báo)
  useEffect(() => {
    if (phase === 'prepare' && left <= 0) onPhase('speak')
    if (phase === 'speak' && left <= 0 && mic.state !== 'ready') onPhase('done')
  }, [phase, left, onPhase, mic.state])

  const status =
    phase === 'ready' ? text.readyTitle : phase === 'prepare' ? text.prepareStatus : phase === 'speak' ? text.speakStatus : text.doneStatus
  const phaseNames: Record<CuePhase, string> = { ready: text.phaseReady, prepare: text.phasePrepare, speak: text.phaseSpeak, done: text.phaseDone }
  const showClock = phase === 'prepare' || phase === 'speak'
  const cardText = [section.topic, text.cueYouShouldSay, ...section.points].join('\n')

  return (
    <div className={`cue-stage cue-stage--${phase}`}>
      <ol className="cue-stage__phases" aria-label={text.cueCard}>
        {CUE_PHASES.map((p, index) => (
          <li key={p} className={`cue-stage__phase${p === phase ? ' is-current' : ''}${CUE_PHASES.indexOf(phase) > index ? ' is-done' : ''}`}>
            <span className="cue-stage__phase-dot">{CUE_PHASES.indexOf(phase) > index ? <Icon name="check" size={12} strokeWidth={3} /> : index + 1}</span>
            {phaseNames[p]}
          </li>
        ))}
      </ol>

      <div className={`cue-stage__layout${phase === 'prepare' || phase === 'speak' ? ' has-notes' : ''}${phase === 'speak' ? ' is-speaking' : ''}`}>
        <article className="cue-card" aria-label={text.cueCard}>
          <header className="cue-card__head">
            <span className="cue-card__eyebrow">
              {text.cueCard} · {text.partLabel(2)}
            </span>
            {showClock && (
              <button
                type="button"
                className={`cue-card__clock ds-num${timerSmall ? ' is-small' : ''}${phase === 'speak' && elapsed >= 100 ? ' is-past-target' : ''}`}
                onClick={() => setTimerSmall((small) => !small)}
                title={timerSmall ? text.growTimer : text.shrinkTimer}
                aria-label={`${text.timeLeft(formatClock(left))}. ${timerSmall ? text.growTimer : text.shrinkTimer}`}
              >
                {formatClock(left)}
              </button>
            )}
          </header>
          <h2 className="cue-card__topic" lang="en">
            {section.topic}
          </h2>
          {section.points.length > 0 && (
            <>
              <p className="cue-card__say" lang="en">
                {text.cueYouShouldSay}
              </p>
              <ul className="cue-card__points" lang="en">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </>
          )}
          {showClock && (
            <div className="cue-card__progress" aria-hidden>
              <span style={{ width: `${Math.min(100, (elapsed / limit) * 100)}%` }} />
              {phase === 'speak' && <span className="cue-card__target" style={{ left: `${(100 / section.speakSeconds) * 100}%` }} />}
            </div>
          )}
          <div className="cue-card__foot">
            <span className="cue-card__status">{status}</span>
            {phase === 'ready' && <AudioButton text={cardText} size="sm" showSlow={false} label={text.listenQuestion} />}
          </div>
        </article>

        {phase === 'prepare' && (
          <div className="cue-stage__notes">
            <label htmlFor="cue-notes">{text.notesLabel}</label>
            <textarea
              id="cue-notes"
              value={notes}
              onChange={(event) => onNotes(event.target.value)}
              placeholder={text.notesPlaceholder}
              autoFocus
              lang="en"
              spellCheck={false}
            />
          </div>
        )}

        {/* Pha Nói: máy ghi lên cột phải (luôn trong tầm mắt), ghi chú thu gọn ở dưới, chỉ đọc */}
        {phase === 'speak' && (
          <div className="cue-stage__speak-side">
            <SpeakingRecorder
              mic={mic}
              maxSeconds={section.speakSeconds}
              take={null}
              autoStart
              targetSeconds={100}
              size="lg"
              onRecorded={(recorded) => {
                onTake(recorded)
                onPhase('done')
              }}
              onRecordingChange={onRecordingChange}
            />
            {notes.trim() && (
              <div className="cue-stage__notes cue-stage__notes--compact">
                <span className="cue-stage__notes-label">{text.notesLabel}</span>
                <p lang="en">{notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {phase === 'ready' && <p className="cue-stage__hint">{text.readyHint}</p>}

      {phase === 'done' && (
        <div className="cue-stage__done">
          {take ? (
            <div className="cue-stage__playback">
              <strong>{text.spokeFor(formatClock(take.durationSeconds))}</strong>
              <TakePlayer take={take} />
              {take.durationSeconds < 100 && <span className="cue-stage__aim">{text.speakAimHint}</span>}
            </div>
          ) : null}
          <fieldset className="cue-stage__check">
            <legend>{text.quickCheck}</legend>
            {text.quickCheckItems.map((item, index) => (
              <label key={item} className="cue-stage__check-item">
                <input type="checkbox" checked={!!quickChecks[index]} onChange={(event) => onQuickCheck(index, event.target.checked)} />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  )
}

/** Đồng hồ nội bộ: cập nhật 4 lần/giây khi đang chạy. */
function useTicker(active: boolean): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    setNow(Date.now())
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(timer)
  }, [active])
  return now
}
