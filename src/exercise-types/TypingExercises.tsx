/**
 * TypingExercises.tsx — CÁC DẠNG BÀI "GÕ CHỮ"
 *  - FillBlankExercise  : điền từ vào chỗ trống "___" ngay trong câu
 *  - ListenTypeExercise : nghe rồi gõ lại cả câu (chính tả)
 */
import { useEffect, useState } from 'react'
import type { FillBlankExercise as FillBlankData, ListenTypeExercise as ListenTypeData } from '../content/content-types'
import { SpeakerButton } from '../components/SpeakerButton'
import { speak } from '../services/text-to-speech'
import { useLanguage } from '../translations/language-context'
import type { ExerciseComponentProps } from './exercise-shared'

export function FillBlankExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<FillBlankData>) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  // tách câu thành phần trước và sau chỗ trống
  const [before, after] = exercise.sentence.split('___')

  return (
    <>
      <div className="exercise-instruction">{t('fillTheBlank')}</div>
      <p className="exercise-prompt" style={{ fontSize: '1.3rem', lineHeight: 2 }}>
        {before}
        <input
          className="inline-blank-input"
          value={value}
          disabled={isLocked}
          autoFocus
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => {
            setValue(event.target.value)
            onAnswerChange(event.target.value.trim() ? event.target.value : null)
          }}
        />
        {after}
      </p>
      {exercise.hint && <p className="muted">💡 {exercise.hint}</p>}
    </>
  )
}

export function ListenTypeExercise({ exercise, isLocked, onAnswerChange }: ExerciseComponentProps<ListenTypeData>) {
  const { t } = useLanguage()
  const [value, setValue] = useState('')
  useEffect(() => {
    speak(exercise.audioText)
  }, [exercise.audioText])

  return (
    <>
      <div className="exercise-instruction">{t('typeWhatYouHear')}</div>
      <SpeakerButton text={exercise.audioText} />
      <textarea
        className="text-area"
        style={{ minHeight: 110 }}
        placeholder={t('typeAnswerHere')}
        value={value}
        disabled={isLocked}
        autoFocus
        spellCheck={false}
        onChange={(event) => {
          setValue(event.target.value)
          onAnswerChange(event.target.value.trim() ? event.target.value : null)
        }}
      />
    </>
  )
}
