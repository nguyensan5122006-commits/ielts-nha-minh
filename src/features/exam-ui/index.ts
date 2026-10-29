/**
 * exam-ui/index.ts — CỔNG XUẤT BỘ KHUNG THI DÙNG CHUNG
 * ----------------------------------------------------------------------------
 * Trình Nghe/Đọc trong bài học và Phòng thi (mock test) dùng chung các mảnh này.
 * Hướng dẫn chi tiết + ví dụ: docs/redesign-v3/10-EXAM-UI.md
 *
 *   import { ExamFrame, SplitPane, QuestionNavigator, ExamQuestionList, buildQuestionGroups } from '../exam-ui'
 * ----------------------------------------------------------------------------
 */

/* khung + bố cục */
export { ExamFrame, FrameTool, ModeBadge, NoteIcon, type ExamFrameProps } from './ExamFrame'
export { SplitPane, type SplitPaneProps } from './SplitPane'
export { QuestionNavigator, type NavigatorPart, type NavigatorQuestion, type QuestionNavigatorProps } from './QuestionNavigator'
export { TaskIntro, type TaskIntroProps, type TaskModeOption } from './TaskIntro'

/* câu hỏi */
export { ExamQuestionList, InstructionText, type ExamQuestionListProps } from './ExamQuestionList'
export * from './question-grouping'
export { gradeAll, gradeQuestion, answerText, correctAnswerText, isAnswered, type GradeSummary, type QuestionResult, type TypeStat } from './answer-grading'

/* tô vàng + ghi chú + vẽ chữ có tô */
export { MarkedText, scrollMarkIntoView, type TextMark, type MarkKind } from './MarkedText'
export { useHighlightNotes, SelectionToolbar, NotesPanel, type UserMark } from './HighlightNotesLayer'
export { selectionToBlockRanges, wordAtPoint, scrollBlockIntoView, type BlockRange } from './text-selection'

/* hiển thị, đồng hồ, nộp bài, kết quả */
export { useExamDisplay, ExamDisplaySettings, type ExamDisplay, type ExamContrast, type ExamTextSize } from './ExamDisplaySettings'
export { CalmExamTimer, useExamCountdown, toneFor, type TimerTone } from './CalmExamTimer'
export { ReviewBeforeSubmit, type ReviewBeforeSubmitProps } from './ReviewBeforeSubmit'
export { TaskResultSummary, type TaskResultSummaryProps } from './TaskResultSummary'
export { EvidenceStrip, type EvidenceStripProps, type EvidenceAction } from './EvidenceReview'
export { findEvidence, quotedFragments, expandToSentence, paraphrasePairsFromExplanation, sharedKeywords, type TextBlock, type TextRange, type EvidenceResult } from './evidence-finder'

/* trạng thái 1 lần làm + ghi tiến độ (bài học) */
export { useTaskSession, readTaskSession, createTaskSession, type TaskSessionState, type TaskMode, type TaskPhase } from './use-task-session'
export { useLessonTaskRecorder, taskBandEstimate, type TaskBand } from './lesson-task-recording'
export { loadSkillTaskQuestion, findQuestionInLesson, type SkillTaskQuestionLocation } from './task-question-lookup'
export { useExamUiText, QUESTION_TYPE_NAMES, type ExamUiTextKey } from './exam-ui-text'
