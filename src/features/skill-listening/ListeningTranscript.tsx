/**
 * ListeningTranscript.tsx — LỜI THOẠI (chỉ hiện SAU khi nộp bài)
 * ----------------------------------------------------------------------------
 *   <ListeningTranscript segments={segments} marks={evidenceMarks}
 *     playingSegment={audio.segmentIndex} playingLine={audio.currentLine}
 *     onPlayLine={(seg, line) => audio.playFromLine(seg, line)} />
 *
 * - Mỗi dòng: tên người nói + câu thoại (vẽ bằng MarkedText -> tô bằng chứng "Q3" như bài đọc).
 * - Dòng đang phát được đánh dấu bằng vạch màu bên trái (kiểu karaoke nhẹ, không nhảy chữ).
 * - Bấm số giờ nhỏ ở đầu dòng = nghe từ dòng đó.
 * Mã khối của 1 dòng: `${segmentId}#${lineIndex}` (evidence-finder dùng cùng mã).
 * ----------------------------------------------------------------------------
 */
import { forwardRef } from 'react'
import { Icon } from '../../design-system/components/Icon'
import { MarkedText, type TextMark } from '../exam-ui/MarkedText'
import { useListeningText } from './skill-listening-text'
import type { ListeningSegment } from './use-listening-audio'
import './ListeningTranscript.css'

export const lineBlockId = (segmentId: string, lineIndex: number) => `${segmentId}#${lineIndex}`
export function parseLineBlockId(blockId: string): { segmentId: string; lineIndex: number } | null {
  const hash = blockId.lastIndexOf('#')
  if (hash < 0) return null
  return { segmentId: blockId.slice(0, hash), lineIndex: Number(blockId.slice(hash + 1)) }
}

/** Màu tên người nói: mỗi người 1 màu cố định trong đoạn hội thoại */
const SPEAKER_TONES = ['var(--skill-listening)', 'var(--c-primary-deep)', 'var(--skill-speaking)', 'var(--skill-reading)']

export interface ListeningTranscriptProps {
  segments: ListeningSegment[]
  marks: TextMark[]
  playingSegment: number
  playingLine: number
  isPlaying: boolean
  onPlayLine: (segmentIndex: number, lineIndex: number) => void
  onPlaySegment: (segmentIndex: number) => void
}

export const ListeningTranscript = forwardRef<HTMLDivElement, ListeningTranscriptProps>(function ListeningTranscript(
  { segments, marks, playingSegment, playingLine, isPlaying, onPlayLine, onPlaySegment },
  ref,
) {
  const text = useListeningText()
  const speakers = [...new Set(segments.flatMap((segment) => segment.lines.map((line) => line.speaker ?? '')))]

  return (
    <div className="xtranscript" ref={ref}>
      <h2 className="xtranscript__title">{text('transcript')}</h2>
      {segments.map((segment, segmentIndex) => (
        <section key={segment.id} className="xtranscript__segment" aria-label={text('segmentLabel', { n: segmentIndex + 1 })}>
          <header className="xtranscript__segment-head">
            <span>{text('segmentLabel', { n: segmentIndex + 1 })}</span>
            <button type="button" className="xtranscript__play" onClick={() => onPlaySegment(segmentIndex)}>
              <Icon name="play-fill" size={14} />
              {text('playSegment')}
            </button>
          </header>
          {segment.lines.map((line, lineIndex) => {
            const playing = isPlaying && segmentIndex === playingSegment && lineIndex === playingLine
            const tone = SPEAKER_TONES[Math.max(0, speakers.indexOf(line.speaker ?? '')) % SPEAKER_TONES.length]
            return (
              <div key={lineIndex} className={playing ? 'xtranscript__line is-playing' : 'xtranscript__line'}>
                <button
                  type="button"
                  className="xtranscript__line-play"
                  onClick={() => onPlayLine(segmentIndex, lineIndex)}
                  aria-label={`${text('play')}: ${line.speaker ?? ''} ${line.text.slice(0, 40)}`}
                  title={text('play')}
                >
                  <Icon name="play-fill" size={12} />
                </button>
                <p className="xtranscript__text">
                  {line.speaker && (
                    <span className="xtranscript__speaker" style={{ color: tone }}>
                      {line.speaker}:{' '}
                    </span>
                  )}
                  <MarkedText blockId={lineBlockId(segment.id, lineIndex)} text={line.text} marks={marks} />
                </p>
              </div>
            )
          })}
        </section>
      ))}
    </div>
  )
})
