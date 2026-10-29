/**
 * SpeakingSamples.tsx — BÀI MẪU SPEAKING: hiện theo dòng Q/A + nghe bằng giọng máy + đặt cạnh bản ghi của mình
 * ----------------------------------------------------------------------------
 *   SampleTranscript   : "PART 1 / Q: … / A: …" -> tiêu đề Part, câu hỏi nhạt, câu trả lời rõ (02-CONTENT-GUIDE)
 *   SampleAudioButton  : đọc CHỈ phần trả lời (A: + đoạn kể Part 2), đã bỏ "uh / um" — ưu tiên file mp3
 *                        có sẵn (playSegment tra manifest), chưa có thì giọng trình duyệt
 *   MyRecordingsList   : danh sách câu hỏi + nút nghe lại bản ghi của mình (A/B với bài mẫu)
 *   SpeakingCompare    : bản ghi của mình | bài mẫu theo band (tab) + nhận xét giám khảo
 * ----------------------------------------------------------------------------
 */
import { useEffect, useRef, useState } from 'react'
import type { BandSample } from '../../content/content-types'
import { Icon } from '../../design-system/components/Icon'
import { Tabs } from '../../design-system/components/Tabs'
import { playSegment, stopSpeaking, type PlaybackHandle } from '../../services/text-to-speech'
import { useLanguage } from '../../translations/language-context'
import { LEVEL_LABELS, formatBand, levelIndexForBand, type BandDisplay } from '../skill-writing/band-scale'
import { SampleNotes } from '../skill-writing/feedback/LabelledEssay'
import { useWritingText } from '../skill-writing/skill-writing-text'
import { useSpeakingText } from './skill-speaking-text'
import { answerKey, parseSampleLines, sampleAudioLines, sectionQuestions, type SpeakingSection } from './speaking-plan'
import { TakePlayer, type RecordingTake } from './SpeakingRecorder'

export function SampleTranscript({ text }: { text: string }) {
  const lines = parseSampleLines(text)
  return (
    <div className="sample-transcript" lang="en">
      {lines.map((line, index) => {
        if (line.kind === 'heading') return <h5 key={index} className="sample-transcript__heading">{line.text}</h5>
        if (line.kind === 'question')
          return (
            <p key={index} className="sample-transcript__q">
              <span className="sample-transcript__tag">Q</span>
              {line.text}
            </p>
          )
        if (line.kind === 'answer')
          return (
            <p key={index} className="sample-transcript__a">
              <span className="sample-transcript__tag sample-transcript__tag--a">A</span>
              {line.text}
            </p>
          )
        return (
          <p key={index} className="sample-transcript__talk">
            {line.text}
          </p>
        )
      })}
    </div>
  )
}

/** Nút đọc bài mẫu (2 tốc độ). Bấm lại = dừng. */
export function SampleAudioButton({ sample }: { sample: BandSample }) {
  const text = useSpeakingText()
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  const handleRef = useRef<PlaybackHandle | null>(null)

  useEffect(
    () => () => {
      if (handleRef.current) stopSpeaking()
    },
    [],
  )
  useEffect(() => {
    // đổi bài mẫu -> dừng bài đang đọc
    if (handleRef.current) stopSpeaking()
    handleRef.current = null
    setPlaying(null)
  }, [sample])

  function play(mode: 'normal' | 'slow') {
    if (playing === mode) {
      stopSpeaking()
      handleRef.current = null
      setPlaying(null)
      return
    }
    const handle = playSegment({ lines: sampleAudioLines(sample.text) }, { rate: mode === 'slow' ? 0.85 : 1 })
    handleRef.current = handle
    setPlaying(mode)
    void handle.finished.then(() => {
      if (handleRef.current === handle) {
        handleRef.current = null
        setPlaying(null)
      }
    })
  }

  return (
    <div className="sample-audio">
      <button type="button" className={`sample-audio__button${playing === 'normal' ? ' is-playing' : ''}`} onClick={() => play('normal')}>
        <Icon name={playing === 'normal' ? 'pause' : 'volume'} size={18} />
        {playing === 'normal' ? text.stopSample : text.listenSample}
      </button>
      <button
        type="button"
        className={`sample-audio__button sample-audio__button--slow${playing === 'slow' ? ' is-playing' : ''}`}
        onClick={() => play('slow')}
        title={text.listenSampleSlow}
        aria-label={text.listenSampleSlow}
      >
        <Icon name={playing === 'slow' ? 'pause' : 'turtle'} size={18} />
      </button>
      <span className="sample-audio__note">{text.sampleAudioNote}</span>
    </div>
  )
}

/** Danh sách câu hỏi đã nói + nghe lại bản ghi. */
export function MyRecordingsList({ sections, takes }: { sections: SpeakingSection[]; takes: Record<string, RecordingTake> }) {
  const text = useSpeakingText()
  const multiPart = sections.length > 1
  return (
    <ol className="my-recordings">
      {sections.flatMap((section, sectionIndex) =>
        sectionQuestions(section).map((question, questionIndex) => {
          const take = takes[answerKey(sectionIndex, questionIndex)]
          return (
            <li key={answerKey(sectionIndex, questionIndex)} className="my-recordings__item">
              <span className="my-recordings__meta">
                {multiPart || section.kind === 'cue-card' ? text.partLabel(section.part) : text.questionOf(questionIndex + 1, sectionQuestions(section).length)}
              </span>
              <p className="my-recordings__question" lang="en">
                {question}
              </p>
              {take ? <TakePlayer take={take} compact /> : <span className="my-recordings__none">{text.noRecording}</span>}
            </li>
          )
        }),
      )}
    </ol>
  )
}

/** Bản ghi của mình | bài mẫu theo band. */
export function SpeakingCompare({
  sections,
  takes,
  samples,
  display,
  bands,
  selfBand,
  initialIndex,
}: {
  sections: SpeakingSection[]
  takes: Record<string, RecordingTake>
  samples: BandSample[]
  display: BandDisplay
  bands: number[]
  selfBand: number | null
  initialIndex: number
}) {
  const text = useSpeakingText()
  const writingText = useWritingText()
  const { language } = useLanguage()
  const nearest = selfBand === null ? initialIndex : levelIndexForBand(selfBand, bands)
  const [index, setIndex] = useState(Math.min(nearest, samples.length - 1))
  const sample = samples[index]
  const labelOf = (i: number) => (display === 'numbers' ? formatBand(parseFloat(samples[i].band)) : LEVEL_LABELS[Math.min(i, 2)][language])

  return (
    <div className="speaking-compare">
      <section className="speaking-task__panel speaking-task__panel--mine">
        <h3 className="speaking-task__panel-title">{text.yourRecordings}</h3>
        <MyRecordingsList sections={sections} takes={takes} />
      </section>
      <section className="speaking-task__panel">
        <Tabs
          items={samples.map((_, i) => ({ id: String(i), label: writingText.sampleTab(labelOf(i)) }))}
          value={String(index)}
          onChange={(id) => setIndex(Number(id))}
          label={writingText.samplesTabsLabel}
          idPrefix="speaking-samples"
          variant="pill"
        />
        {sample && (
          <div className="speaking-compare__sample" role="tabpanel" id={`speaking-samples-panel-${index}`} aria-labelledby={`speaking-samples-tab-${index}`}>
            <SampleAudioButton sample={sample} />
            <SampleTranscript text={sample.text} />
            <div className="speaking-task__notes">
              <h4>{writingText.examinerNotes}</h4>
              <SampleNotes notes={sample.notesVi} />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
