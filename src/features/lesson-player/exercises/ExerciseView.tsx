/**
 * ExerciseView.tsx — CHỌN ĐÚNG COMPONENT THEO DẠNG BÀI (exercise.type)
 * ----------------------------------------------------------------------------
 *   <ExerciseView exercise={ex} outcome={outcome} hintLevel={0} ... />
 *
 * Đây là "cổng" duy nhất trang trình học dùng để vẽ 1 bài tập. Nhóm khác
 * (VD sổ lỗi sai muốn cho làm lại câu) cũng có thể dùng lại component này +
 * checkExerciseAnswer() trong exercise-contract.ts.
 * ----------------------------------------------------------------------------
 */
import type { ReactNode } from 'react'
import { ArrangeWordsExercise, MatchPairsExercise } from './WordTileExercises'
import { ListenChooseExercise, MultipleChoiceExercise, TrueFalseExercise } from './ChoiceExercises'
import { FillBlankExercise, ListenTypeExercise } from './TypingExercises'
import { SpeakSentenceExercise } from './SpeakSentenceExercise'
import { SpeakAnswerExercise, WriteAnswerExercise } from './AiGradedExercises'
import type { ExerciseViewProps } from './exercise-contract'
import './exercises.css'

export function ExerciseView(props: ExerciseViewProps): ReactNode {
  const { exercise } = props
  switch (exercise.type) {
    case 'multiple-choice':
      return <MultipleChoiceExercise {...props} exercise={exercise} />
    case 'listen-choose':
      return <ListenChooseExercise {...props} exercise={exercise} />
    case 'true-false':
      return <TrueFalseExercise {...props} exercise={exercise} />
    case 'fill-blank':
      return <FillBlankExercise {...props} exercise={exercise} />
    case 'listen-type':
      return <ListenTypeExercise {...props} exercise={exercise} />
    case 'arrange-words':
      return <ArrangeWordsExercise {...props} exercise={exercise} />
    case 'match-pairs':
      return <MatchPairsExercise {...props} exercise={exercise} />
    case 'speak-sentence':
      return <SpeakSentenceExercise {...props} exercise={exercise} />
    case 'speak-answer':
      return <SpeakAnswerExercise {...props} exercise={exercise} />
    case 'write-answer':
      return <WriteAnswerExercise {...props} exercise={exercise} />
  }
}
