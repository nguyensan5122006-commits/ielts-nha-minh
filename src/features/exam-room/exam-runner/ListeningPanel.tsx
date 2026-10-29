/**
 * ListeningPanel.tsx — CỘT TRÁI CỦA PHẦN NGHE: trạng thái âm thanh + danh sách Part
 * ----------------------------------------------------------------------------
 * 3 kiểu theo luật của đề (exam-catalog.examRulesFor):
 *   - như máy thi (autoPlayListening): không có nút phát; chỉ hiện "Đang phát Part 2 · 1:23 / 3:11",
 *     thanh tiến độ không bấm được, Part đã nghe ghi "Đã nghe xong".
 *   - giới hạn lượt (VD test Level 2): mỗi Part 1 nút "Nghe Part 1 · còn 2 lần nghe".
 *   - luyện tập / Level 1: thêm dừng, lùi / tới 5 giây, tốc độ 0.75× / 1× / 1.25×, bấm thanh để tua.
 * Bấm vào 1 Part = xem câu hỏi của Part đó (không làm phát lại).
 * Lời thoại khoá tới khi nộp bài (xem ở màn "Xem lại").
 * ----------------------------------------------------------------------------
 */
import type { MouseEvent } from 'react'
import type { ExamPart } from '../../../content/content-types'
import { Icon } from '../../../design-system/components/Icon'
import { IconButton } from '../../../design-system/components/IconButton'
import { SegmentedControl } from '../../../design-system/components/SegmentedControl'
import { PLAYBACK_RATES } from '../../../services/text-to-speech'
import { formatAudioTime, type ExamAudio } from '../exam-audio'
import { partKey, type ExamRules } from '../exam-catalog'
import { useExamRoomText } from '../exam-room-text'
import type { PartAudioState } from '../exam-session'

export interface ListeningPanelProps {
  parts: ExamPart[]
  sectionIndex: number
  currentPartIndex: number
  audioState: Record<string, PartAudioState>
  audio: ExamAudio
  rules: ExamRules
  /** thời lượng thật của từng Part (giây), theo partKey */
  durations: Record<string, number>
  onPlayPart: (partIndex: number) => void
  onSelectPart: (partIndex: number) => void
}

/** Icon tua 5 giây: mũi tên vòng + số 5 */
function SkipIcon({ forward }: { forward?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden style={forward ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" />
      <path d="M4.5 3.5v4h4" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="currentColor" stroke="none" style={forward ? { transform: 'scaleX(-1)', transformOrigin: '12px 12px' } : undefined}>
        5
      </text>
    </svg>
  )
}

const questionRange = (part: ExamPart) => `${part.questions[0]?.number ?? ''}–${part.questions[part.questions.length - 1]?.number ?? ''}`

export function ListeningPanel({ parts, sectionIndex, currentPartIndex, audioState, audio, rules, durations, onPlayPart, onSelectPart }: ListeningPanelProps) {
  const text = useExamRoomText()
  const { view } = audio
  const activeIndex = parts.findIndex((_, index) => partKey(sectionIndex, index) === view.key)
  const isActive = activeIndex >= 0 && (view.status === 'playing' || view.status === 'paused' || view.status === 'loading')
  const shownIndex = isActive ? activeIndex : currentPartIndex
  const shownPart = parts[shownIndex]
  const shownKey = partKey(sectionIndex, shownIndex)
  const shownDuration = isActive ? view.duration : (durations[shownKey] ?? 0)
  const shownTime = isActive ? view.currentTime : audioState[shownKey]?.finished ? shownDuration : (audioState[shownKey]?.position ?? 0)
  const ratio = shownDuration > 0 ? Math.min(1, shownTime / shownDuration) : 0
  const limited = Number.isFinite(rules.listeningPlays)
  const nextAutoIndex = parts.findIndex((_, index) => !audioState[partKey(sectionIndex, index)]?.finished)

  const statusLabel = !isActive
    ? audioState[shownKey]?.finished
      ? text('audioDone')
      : text('audioNotYet')
    : view.status === 'loading'
      ? text('audioLoading')
      : view.status === 'paused'
        ? text('audioPaused')
        : text('audioPlaying')

  const seekByClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!rules.audioControls || !isActive || !view.usingFile) return
    const rect = event.currentTarget.getBoundingClientRect()
    audio.seekTo(((event.clientX - rect.left) / rect.width) * view.duration)
  }

  return (
    <div className="xr-listen">
      <section className={['xr-listen__now', isActive && view.status === 'playing' && 'is-playing'].filter(Boolean).join(' ')} aria-label={text('audioTitle')}>
        <div className="xr-listen__now-top">
          <span className="xr-listen__icon" aria-hidden>
            🎧
          </span>
          <span className="xr-listen__now-title">
            <strong>{shownPart?.title}</strong>
            <span>{text('answerQuestions', { from: shownPart?.questions[0]?.number ?? '', to: shownPart?.questions[shownPart.questions.length - 1]?.number ?? '' })}</span>
          </span>
          <span className={`xr-listen__status is-${isActive ? view.status : audioState[shownKey]?.finished ? 'done' : 'idle'}`}>
            {isActive && view.status === 'playing' && <span className="xr-listen__dot" aria-hidden />}
            {statusLabel}
          </span>
        </div>
        <div className="xr-listen__time ds-num" aria-hidden>
          <strong>{formatAudioTime(shownTime)}</strong> / {formatAudioTime(shownDuration)}
        </div>
        <div
          className={['xr-listen__bar', rules.audioControls && isActive && view.usingFile && 'is-seekable'].filter(Boolean).join(' ')}
          onClick={seekByClick}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={Math.round(shownDuration)}
          aria-valuenow={Math.round(shownTime)}
          aria-label={text('audioTitle')}
        >
          <span style={{ width: `${ratio * 100}%` }} />
        </div>

        {rules.audioControls && (
          <div className="xr-listen__controls">
            <IconButton icon={<SkipIcon />} label={text('back5')} size="sm" onClick={() => audio.seekBy(-5)} disabled={!isActive || !view.usingFile} />
            {isActive && view.status === 'playing' ? (
              <IconButton icon="pause" label={text('pause')} variant="primary" onClick={audio.pause} />
            ) : (
              <IconButton
                icon="play-fill"
                label={isActive ? text('continuePlay') : text('playPart', { part: shownPart?.title ?? '' })}
                variant="primary"
                onClick={() => (isActive && audio.resume() ? undefined : onPlayPart(shownIndex))}
                disabled={!isActive && limited && (audioState[shownKey]?.plays ?? 0) >= rules.listeningPlays}
              />
            )}
            <IconButton icon={<SkipIcon forward />} label={text('forward5')} size="sm" onClick={() => audio.seekBy(5)} disabled={!isActive || !view.usingFile} />
            <SegmentedControl
              label={text('speed')}
              size="sm"
              value={view.rate}
              onChange={(rate) => audio.setRate(rate)}
              options={PLAYBACK_RATES.map((rate) => ({ value: rate, label: `${rate}×` }))}
            />
          </div>
        )}
        {rules.autoPlayListening && <p className="xr-listen__note">{text('examAudioNote')}</p>}
        {!view.usingFile && isActive && <p className="xr-listen__note">{text('browserVoice')}</p>}
      </section>

      <ol className="xr-listen__parts">
        {parts.map((part, index) => {
          const key = partKey(sectionIndex, index)
          const state = audioState[key]
          const playing = isActive && activeIndex === index
          const playsLeft = limited ? Math.max(0, rules.listeningPlays - (state?.plays ?? 0)) : Infinity
          const label = playing
            ? view.status === 'paused'
              ? text('audioPaused')
              : text('audioPlaying')
            : rules.autoPlayListening
              ? state?.finished
                ? text('audioDone')
                : index === nextAutoIndex
                  ? text('audioUpNext')
                  : text('audioNotYet')
              : limited
                ? playsLeft > 0
                  ? text('playsLeft', { n: playsLeft })
                  : text('noPlaysLeft')
                : state?.finished
                  ? text('audioDone')
                  : ''
          return (
            <li key={key} className={['xr-listen__part', index === currentPartIndex && 'is-current', playing && 'is-playing', state?.finished && 'is-done'].filter(Boolean).join(' ')}>
              <button type="button" className="xr-listen__part-main" onClick={() => onSelectPart(index)} aria-current={index === currentPartIndex ? 'true' : undefined}>
                <span className="xr-listen__part-num" aria-hidden>
                  {state?.finished && !playing ? <Icon name="check" size={14} strokeWidth={3} /> : index + 1}
                </span>
                <span className="xr-listen__part-text">
                  <strong>{part.title}</strong>
                  <span>
                    {text('questionRange', { range: questionRange(part) })}
                    {durations[key] ? ` · ${formatAudioTime(durations[key])}` : ''}
                  </span>
                </span>
                <span className="xr-listen__part-state">{label}</span>
              </button>
              {!rules.autoPlayListening && !playing && (
                <IconButton
                  icon="play-fill"
                  size="sm"
                  label={text('playPart', { part: part.title })}
                  onClick={() => onPlayPart(index)}
                  disabled={playsLeft <= 0}
                />
              )}
            </li>
          )
        })}
      </ol>

      <div className="xr-listen__locked">
        <Icon name="lock" size={18} />
        <span>
          <strong>{text('transcriptLocked')}</strong>
          <span>{text('transcriptLockedText')}</span>
        </span>
      </div>
    </div>
  )
}
