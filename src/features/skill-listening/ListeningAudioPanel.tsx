/**
 * ListeningAudioPanel.tsx — TRÌNH PHÁT CỦA BÀI NGHE (cột trái)
 * ----------------------------------------------------------------------------
 *   <ListeningAudioPanel audio={audio} segments={segments} mode="practice"
 *     segmentQuestions={[[1,3],[4,7],[8,10]]} replaysUsed={…} onPlaySegment={(i) => …} />
 *
 * Luyện tập: nút phát/dừng lớn, lùi/tới 5 giây, tốc độ 0.75×/1×/1.25×, thanh tiến độ
 *   chia theo đoạn (bấm để tua), danh sách "Đoạn 1/2/3" có nút "Nghe lại đoạn này".
 * Như thi thật: chỉ hiện trạng thái đang phát + thanh tiến độ (không bấm được),
 *   mỗi đoạn nghe 1 lần, phát liền mạch (giống máy thi: không có player).
 * ----------------------------------------------------------------------------
 */
import type { CSSProperties, MouseEvent } from 'react'
import { Icon } from '../../design-system/components/Icon'
import { IconButton } from '../../design-system/components/IconButton'
import { SegmentedControl } from '../../design-system/components/SegmentedControl'
import { PLAYBACK_RATES } from '../../services/text-to-speech'
import { useListeningText } from './skill-listening-text'
import { formatSeconds, type ListeningAudio, type ListeningSegment } from './use-listening-audio'
import './ListeningAudioPanel.css'

export interface ListeningAudioPanelProps {
  audio: ListeningAudio
  segments: ListeningSegment[]
  mode: 'practice' | 'exam'
  /** số câu đầu/cuối của từng đoạn (để ghi "Câu 4–7") */
  segmentQuestions: ([number, number] | null)[]
  /** số lần đã phát mỗi đoạn */
  replaysUsed: Record<string, number>
  /** người học bấm phát 1 đoạn (player đếm lượt + kiểm tra giới hạn) */
  onPlaySegment: (index: number) => void
  /** đã nộp bài: thu gọn danh sách đoạn (lời thoại hiện bên dưới) */
  compact?: boolean
}

/** Icon tua 5 giây (mũi tên vòng + số 5) */
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

export function ListeningAudioPanel({ audio, segments, mode, segmentQuestions, replaysUsed, onPlaySegment, compact = false }: ListeningAudioPanelProps) {
  const text = useListeningText()
  const exam = mode === 'exam'
  const active = audio.status === 'playing' || audio.status === 'paused' || audio.status === 'loading'
  const current = audio.segmentIndex
  const range = segmentQuestions[current]
  const totalDuration = audio.durations.reduce((sum, value) => sum + value, 0)
  const ratio = audio.duration > 0 ? Math.min(1, audio.currentTime / audio.duration) : 0
  const nextUnplayed = segments.findIndex((segment) => !(replaysUsed[segment.id] > 0))
  const allPlayedInExam = exam && nextUnplayed < 0 && !active

  const segmentState = (index: number) => {
    if (index === current && active) return 'playing'
    return replaysUsed[segments[index].id] > 0 ? 'played' : 'new'
  }

  const onBarClick = (event: MouseEvent<HTMLDivElement>, index: number) => {
    if (exam) return
    const rect = event.currentTarget.getBoundingClientRect()
    const within = (event.clientX - rect.left) / rect.width
    if (index === current && active) audio.seekToRatio(within)
    else onPlaySegment(index)
  }

  const statusLabel = audio.status === 'loading' ? text('loading') : audio.status === 'playing' ? text('nowPlaying') : audio.status === 'paused' ? text('pause') : null

  return (
    <div className={['xaudio', exam && 'is-exam', compact && 'is-compact'].filter(Boolean).join(' ')} aria-label={text('player')} role="region">
      <div className="xaudio__now">
        <span className="xaudio__now-icon" aria-hidden>
          🎧
        </span>
        <div className="xaudio__now-text">
          <strong>
            {text('segmentLabel', { n: current + 1 })}
            <span className="xaudio__of">/{segments.length}</span>
          </strong>
          {range && <span>{range[0] === range[1] ? text('segmentQuestion', { n: range[0] }) : text('segmentQuestions', { from: range[0], to: range[1] })}</span>}
        </div>
        {statusLabel && (
          <span className={`xaudio__status xaudio__status--${audio.status}`}>
            <span className="xaudio__pulse" aria-hidden />
            {statusLabel}
          </span>
        )}
      </div>

      {!exam ? (
        <div className="xaudio__controls">
          <IconButton icon={<SkipIcon />} label={text('back5')} onClick={() => audio.seekBy(-5)} disabled={!active} />
          <IconButton
            className="xaudio__play"
            variant="primary"
            size="lg"
            icon={<Icon name={audio.status === 'playing' || audio.status === 'loading' ? 'pause' : 'play-fill'} size={26} />}
            label={audio.status === 'playing' ? text('pause') : text('play')}
            onClick={() => (active || audio.status === 'ended' ? audio.toggle() : onPlaySegment(current))}
          />
          <IconButton icon={<SkipIcon forward />} label={text('forward5')} onClick={() => audio.seekBy(5)} disabled={!active} />
          <span className="xaudio__time">
            {formatSeconds(audio.currentTime)} <span>/ {formatSeconds(audio.duration || audio.durations[current] || 0)}</span>
          </span>
        </div>
      ) : (
        <div className="xaudio__controls xaudio__controls--exam">
          {!active && nextUnplayed >= 0 ? (
            <button type="button" className="ds-btn ds-btn--primary ds-btn--md" onClick={() => onPlaySegment(nextUnplayed)}>
              <Icon name="play-fill" size={18} />
              <span className="ds-btn__label">{nextUnplayed === 0 ? text('examStart') : `${text('playSegment')} ${nextUnplayed + 1}`}</span>
            </button>
          ) : (
            <span className="xaudio__time">
              {formatSeconds(audio.currentTime)} <span>/ {formatSeconds(audio.duration || audio.durations[current] || 0)}</span>
            </span>
          )}
          <p className="xaudio__exam-note">{allPlayedInExam ? text('examAllDone') : text('examOnce')}</p>
        </div>
      )}

      {/* thanh tiến độ chia theo đoạn: độ rộng mỗi khúc = thời lượng đoạn đó */}
      <div className="xaudio__track" role="presentation">
        {segments.map((segment, index) => {
          const fill = index < current ? (replaysUsed[segment.id] > 0 ? 1 : 0) : index === current ? (audio.status === 'ended' ? 1 : ratio) : 0
          return (
            <div
              key={segment.id}
              className={['xaudio__track-part', index === current && 'is-current', !exam && 'is-clickable'].filter(Boolean).join(' ')}
              style={{ flexGrow: Math.max(1, audio.durations[index] ?? 1) } as CSSProperties}
              onClick={(event) => onBarClick(event, index)}
              title={text('segmentLabel', { n: index + 1 })}
            >
              <span className="xaudio__track-fill" style={{ width: `${fill * 100}%` }} />
            </div>
          )
        })}
      </div>

      {!exam && (
        <div className="xaudio__speed">
          <span className="xaudio__speed-label">{text('speed')}</span>
          <SegmentedControl
            size="sm"
            label={text('speed')}
            value={audio.rate}
            onChange={audio.setRate}
            options={PLAYBACK_RATES.map((rate) => ({ value: rate, label: `${rate}×` }))}
          />
          <span className="xaudio__total">{formatSeconds(totalDuration)}</span>
        </div>
      )}

      {!compact && (
        <ol className="xaudio__segments">
          {segments.map((segment, index) => {
            const state = segmentState(index)
            const q = segmentQuestions[index]
            const used = replaysUsed[segment.id] ?? 0
            return (
              <li key={segment.id} className={`xaudio__segment is-${state}`}>
                <span className="xaudio__segment-num" aria-hidden>
                  {state === 'played' ? <Icon name="check" size={14} strokeWidth={3} /> : index + 1}
                </span>
                <span className="xaudio__segment-text">
                  <strong>{text('segmentLabel', { n: index + 1 })}</strong>
                  <span>
                    {q ? (q[0] === q[1] ? text('segmentQuestion', { n: q[0] }) : text('segmentQuestions', { from: q[0], to: q[1] })) : ''} · {formatSeconds(audio.durations[index] ?? 0)}
                  </span>
                </span>
                {exam ? (
                  <span className="xaudio__segment-state">{state === 'playing' ? text('nowPlaying') : used > 0 ? text('examNoPlaysLeft') : text('examPlaysLeft', { n: 1 })}</span>
                ) : (
                  <button type="button" className="xaudio__segment-btn" onClick={() => onPlaySegment(index)}>
                    <Icon name={state === 'new' ? 'play-fill' : 'review'} size={15} />
                    {state === 'new' ? text('playSegment') : text('replaySegment')}
                  </button>
                )}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
