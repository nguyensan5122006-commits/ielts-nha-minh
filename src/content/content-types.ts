/**
 * content-types.ts
 * ----------------------------------------------------------------------------
 * ĐỊNH NGHĨA KIỂU DỮ LIỆU CHO TOÀN BỘ NỘI DUNG HỌC.
 *
 * Mọi bài học, bài tập, đề thi đều phải theo đúng "khuôn" ở file này.
 * Nhờ vậy giao diện chỉ cần viết 1 lần, còn nội dung thì thêm bao nhiêu cũng được.
 *
 * Cấu trúc tổng quát:
 *   Level (cấp độ, VD 0-2.0)
 *     └── SkillTrack (1 kỹ năng trong level: speaking, listening, ...)
 *           └── Lesson (1 bài học, kiểu Duolingo)
 *                 ├── teachingCards  : thẻ lý thuyết ngắn đọc trước khi làm
 *                 ├── words          : từ vựng (chỉ bài vocabulary mới cần)
 *                 ├── exercises      : chuỗi bài tập luyện
 *                 └── miniTest       : bài kiểm tra nhỏ cuối bài (có tính tim ❤)
 *   Exam (đề thi: xếp lớp, kiểm tra level, thi thử IELTS)
 * ----------------------------------------------------------------------------
 */

/** Văn bản song ngữ: tiếng Việt + tiếng Anh. Người dùng bấm nút để chuyển. */
export interface BilingualText {
  vi: string
  en: string
}

/** 5 nhánh học trong mỗi level. */
export type SkillName = 'vocabulary' | 'listening' | 'reading' | 'speaking' | 'writing'

/* ============================================================================
 * 1. TỪ VỰNG
 * ========================================================================== */

export interface VocabularyWord {
  id: string // duy nhất toàn site, VD "l1-family-mother"
  word: string // "mother"
  ipa: string // phiên âm "/ˈmʌð.ər/"
  partOfSpeech: string // "noun", "verb", "adjective"...
  meaningVi: string // "mẹ"
  definitionEn: string // giải nghĩa tiếng Anh đơn giản
  examples: { en: string; vi: string }[] // 2-3 câu ví dụ có dịch
  /** Ghi chú cách dùng / lỗi hay gặp (không bắt buộc) */
  usageNote?: BilingualText
}

/* ============================================================================
 * 2. BÀI TẬP (EXERCISE) — mỗi kiểu là 1 dạng bài kiểu Duolingo
 * ========================================================================== */

/** Phần chung mà mọi bài tập đều có. */
interface ExerciseBase {
  id: string // duy nhất toàn site
  /** Lời giải thích hiện ra sau khi trả lời (đúng hoặc sai). */
  explanation?: BilingualText
  /** Nếu bài tập dựa trên 1 đoạn đọc trong lesson.readingPassages thì ghi id vào đây. */
  passageId?: string
}

/** Chọn 1 đáp án đúng. */
export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple-choice'
  question: string // câu hỏi (tiếng Anh, có thể kèm tiếng Việt)
  options: string[]
  correctIndex: number // vị trí đáp án đúng, bắt đầu từ 0
}

/** Điền vào chỗ trống. Câu dùng "___" để đánh dấu chỗ trống (chỉ 1 chỗ). */
export interface FillBlankExercise extends ExerciseBase {
  type: 'fill-blank'
  sentence: string // "She ___ a teacher."
  acceptedAnswers: string[] // ["is"] — so sánh không phân biệt hoa/thường
  hint?: string // gợi ý nhỏ, VD "(be)"
}

/** Sắp xếp các từ thành câu đúng (bấm vào từng thẻ từ). */
export interface ArrangeWordsExercise extends ExerciseBase {
  type: 'arrange-words'
  translationVi: string // nghĩa tiếng Việt của câu cần ghép
  correctSentence: string // "I am a student." — các từ cách nhau bởi dấu cách
  extraWords?: string[] // từ gây nhiễu (không thuộc câu)
}

/** Nối cặp: bên trái ↔ bên phải (VD từ ↔ nghĩa). */
export interface MatchPairsExercise extends ExerciseBase {
  type: 'match-pairs'
  instruction: BilingualText
  pairs: { left: string; right: string }[] // 4-6 cặp
}

/** Đúng / Sai / Không có thông tin (kiểu IELTS Reading). */
export interface TrueFalseExercise extends ExerciseBase {
  type: 'true-false'
  statement: string
  answer: 'TRUE' | 'FALSE' | 'NOT GIVEN'
  allowNotGiven: boolean // false = chỉ có True/False
}

/** Nghe rồi chọn đáp án. audioText là lời được đọc (máy đọc hoặc file mp3). */
export interface ListenChooseExercise extends ExerciseBase {
  type: 'listen-choose'
  audioText: string
  question: string
  options: string[]
  correctIndex: number
}

/** Nghe rồi gõ lại (chính tả / dictation). */
export interface ListenTypeExercise extends ExerciseBase {
  type: 'listen-type'
  audioText: string
  acceptedAnswers: string[] // thường chỉ 1 câu = audioText; chấm bỏ qua dấu câu
}

/** Đọc to 1 câu — trình duyệt nhận giọng nói và so với câu mẫu. */
export interface SpeakSentenceExercise extends ExerciseBase {
  type: 'speak-sentence'
  sentence: string
  translationVi: string
}

/** Trả lời nói tự do 1 câu hỏi — AI (Gemini) chấm. */
export interface SpeakAnswerExercise extends ExerciseBase {
  type: 'speak-answer'
  question: string
  tipsVi: string // gợi ý cách trả lời
  sampleAnswer: string // câu trả lời mẫu
  recordSeconds: number // thời gian ghi âm tối đa
}

/** Viết tự do — AI (Gemini) chấm. */
export interface WriteAnswerExercise extends ExerciseBase {
  type: 'write-answer'
  prompt: string
  tipsVi: string
  minWords: number
  sampleAnswer: string
}

export type Exercise =
  | MultipleChoiceExercise
  | FillBlankExercise
  | ArrangeWordsExercise
  | MatchPairsExercise
  | TrueFalseExercise
  | ListenChooseExercise
  | ListenTypeExercise
  | SpeakSentenceExercise
  | SpeakAnswerExercise
  | WriteAnswerExercise

/* ============================================================================
 * 3. BÀI HỌC (LESSON)
 * ========================================================================== */

/** Thẻ lý thuyết: đọc trước khi làm bài tập. body hỗ trợ **in đậm** và xuống dòng. */
export interface TeachingCard {
  title: BilingualText
  body: BilingualText
  /** Ví dụ tiếng Anh kèm dịch, có nút loa để nghe. */
  examples?: { en: string; vi: string }[]
}

/** Đoạn văn đọc hiểu dùng cho nhiều câu hỏi. */
export interface ReadingPassage {
  id: string
  title: string
  text: string // đoạn văn tiếng Anh, các đoạn cách nhau bởi "\n\n"
}

export interface Lesson {
  id: string // VD "l1-vocab-01"
  skill: SkillName
  title: BilingualText
  description: BilingualText // 1 câu mô tả học gì
  teachingCards: TeachingCard[]
  words?: VocabularyWord[] // chỉ bài vocabulary
  readingPassages?: ReadingPassage[]
  exercises: Exercise[] // 8-12 bài luyện
  miniTest: Exercise[] // 5-8 câu, có tính tim (bài v3 có thể để mảng rỗng)

  /* ---------- (v3) bài kỹ năng chuyên sâu ----------
   * mode 'practice' (mặc định) = bài kiểu Duolingo: thẻ dạy -> bài tập.
   * Các mode khác: thẻ dạy (chiến thuật) -> vài bài tập khởi động -> 1 "task" kỹ năng
   * mở bằng trình riêng (Listening player, Reading 2 cột, Writing editor, Speaking recorder). */
  mode?: LessonMode
  /** Thời lượng ước tính (phút) — hiện trên lộ trình, giúp người học chọn bài vừa sức */
  estimatedMinutes?: number
  listeningTask?: ListeningTask
  readingTask?: ReadingTask
  writingTask?: WritingTaskV3
  speakingTask?: SpeakingTask

  /* ---------- (v3) phân loại thêm (tuỳ chọn) ----------
   * category 'grammar' = bài của khu "Ngữ pháp" (/grammar, nội dung ở src/content/grammar/).
   *   Bài này KHÔNG nằm trong chặng nào trên lộ trình — người học mở từ trang Ngữ pháp.
   * track = bài này tính cho track nào (VD khi cộng XP theo track). Không ghi = theo chặng chứa bài. */
  category?: LessonCategory
  track?: TrackId
}

/** Nhóm nội dung đặc biệt của 1 bài (hiện chỉ có 'grammar'). */
export type LessonCategory = 'grammar'

/* ============================================================================
 * 4. LEVEL
 * ========================================================================== */

export interface SkillTrack {
  skill: SkillName
  lessons: Lesson[]
}

export interface Level {
  id: string // "level-1"
  order: number // 1..6
  bandRange: string // "0 – 2.0"
  title: BilingualText
  goals: BilingualText // người học đạt được gì sau level
  available: boolean // false = "Sắp có", chưa có nội dung
  skillTracks: SkillTrack[]
  /** id đề thi lớn cuối level (nằm trong danh sách Exam) */
  levelTestId?: string
}

/* ============================================================================
 * 5. ĐỀ THI (EXAM) — dùng cho bài xếp lớp, kiểm tra level, thi thử IELTS
 * ========================================================================== */

/** Câu hỏi trong đề thi Listening / Reading (chấm tự động). */
export type ExamQuestion =
  | {
      kind: 'choice' // trắc nghiệm A/B/C/D, hoặc nối (matching / matching headings) dùng chữ cái
      id: string
      segmentId?: string // (v3) Listening: câu này thuộc đoạn nghe nào -> nút "Nghe lại đoạn này"
      paragraphLabel?: string // (v3) Reading: đáp án nằm ở đoạn nào (A, B, C...) -> highlight khi xem giải thích
      number: number // số thứ tự câu trong đề (1..40)
      prompt: string
      options: string[]
      correctIndex: number
      explanation?: BilingualText
    }
  | {
      kind: 'true-false-not-given'
      id: string
      segmentId?: string
      paragraphLabel?: string
      number: number
      prompt: string
      answer: 'TRUE' | 'FALSE' | 'NOT GIVEN'
      explanation?: BilingualText
    }
  | {
      kind: 'gap-fill' // điền từ, VD "NO MORE THAN TWO WORDS" (cũng dùng cho short-answer)
      id: string
      segmentId?: string
      paragraphLabel?: string
      number: number
      prompt: string // câu có "___"
      acceptedAnswers: string[]
      explanation?: BilingualText
    }

/** Một phần (part) trong kỹ năng Listening hoặc Reading. */
export interface ExamPart {
  title: string // "Part 1" / "Passage 1"
  instructions: string // "Questions 1–10. Write NO MORE THAN TWO WORDS..."
  /** Listening: kịch bản audio. Dòng dạng "Tên: lời thoại" sẽ được đọc nhiều giọng. */
  audioScript?: string
  /** Reading: đoạn văn */
  passage?: { title: string; text: string }
  questions: ExamQuestion[]
}

export interface WritingTask {
  id: string
  taskNumber: 1 | 2
  prompt: string // đề bài
  /** Task 1 thường có biểu đồ — mô tả bằng bảng dữ liệu để vẽ lại. */
  chartData?: {
    chartType: 'bar' | 'line' | 'table' | 'pie'
    title: string
    unit: string
    labels: string[] // trục X / tên hàng
    series: { name: string; values: number[] }[]
  }
  minWords: number
  suggestedMinutes: number
  sampleAnswer: string
}

export interface SpeakingPart {
  partNumber: 1 | 2 | 3
  /** Part 2: cue card, các ý gạch đầu dòng nằm trong cueCardPoints */
  questions: string[]
  cueCardPoints?: string[]
  prepSeconds: number // thời gian chuẩn bị (Part 2 = 60)
  answerSeconds: number // thời gian nói tối đa mỗi câu
}

export interface ExamSection {
  skill: 'listening' | 'reading' | 'writing' | 'speaking' | 'vocabulary'
  title: string
  durationMinutes: number
  parts?: ExamPart[] // listening / reading / vocabulary
  writingTasks?: WritingTask[] // writing
  speakingParts?: SpeakingPart[] // speaking
}

export interface Exam {
  id: string
  kind: 'placement' | 'level-test' | 'mock-ielts'
  title: BilingualText
  description: BilingualText
  /** Với level-test: thuộc level nào. Với placement: không cần. */
  levelId?: string
  sections: ExamSection[]
  /** Điểm % tối thiểu để qua (level-test). */
  passPercent?: number
}

/* ============================================================================
 * 6. HỌC VUI — THẺ TỪ THEO CHỦ ĐỀ (cờ, động vật, rau củ...)
 *    Chỉ là flashcard để xem + nghe; đồng thời là nguồn từ cho trò chơi chữ (Spelling Bee…).
 * ========================================================================== */

/** Hình minh hoạ của thẻ: emoji, hoặc cờ thật theo mã quốc gia ISO 2 chữ cái (VD "vn"). */
export type FunCardImage = { kind: 'emoji'; value: string } | { kind: 'flag'; countryCode: string }

export interface FunCard {
  id: string // duy nhất toàn site, VD "fun-animals-elephant"
  word: string // "elephant" (chỉ chữ cái + dấu cách/gạch nối, không dấu câu)
  ipa: string // "/ˈel.ɪ.fənt/"
  partOfSpeech: string // "noun"
  meaningVi: string // "con voi"
  image: FunCardImage
  /** 2 câu ví dụ có dịch */
  examples: { en: string; vi: string }[]
  /** Thông tin thêm hiện dưới thẻ, VD thủ đô, quốc tịch, mẹo nhớ */
  extraInfo?: BilingualText
  /** Chỉ chủ đề quốc gia: thủ đô và quốc tịch (hiện ở mặt sau thẻ) */
  capital?: string
  nationality?: string
}

export interface FunTopic {
  id: string // "animals"
  title: BilingualText
  icon: string // emoji đại diện
  /** nhóm để xếp trên trang Học vui, VD "Thế giới", "Đời sống" */
  group: BilingualText
  cards: FunCard[]
}

/* ============================================================================
 * 7. (v3) TRACK, LEVEL MỚI, CHẶNG (UNIT) VÀ CÁC "TASK" KỸ NĂNG
 *
 *   Track (lộ trình)  : 'general' = Tiếng Anh tổng quát, 'ielts' = Luyện thi IELTS
 *   LevelInfo         : 3 level — level-1 (0–2.0), level-2 (2.0–4.0), level-3 (4.0–6.5)
 *     └── Unit (chặng): 5–7 bài, có câu "can-do". 1 chặng có thể dùng chung cho cả 2 track.
 *           └── lessonIds -> Lesson (tra trong lesson-registry.ts)
 * ========================================================================== */

export type TrackId = 'general' | 'ielts'
export type LevelId = 'level-1' | 'level-2' | 'level-3'
export type LessonMode = 'practice' | 'listening' | 'reading' | 'writing' | 'speaking'

export interface Unit {
  id: string // VD "u1-03-family" (level 1, chặng 3)
  levelId: LevelId
  /** Chặng này thuộc track nào. ['general', 'ielts'] = dùng chung. */
  tracks: TrackId[]
  /** Thứ tự trong level. Chặng chung và chặng riêng xếp xen theo số này. */
  order: number
  title: BilingualText
  /** Tên ảnh minh hoạ trong public/word-images (không có đuôi), hoặc 1 emoji */
  icon: string
  /** "Sau chặng này bạn có thể…" (1 câu) */
  canDo: BilingualText
  /** Các bài theo đúng thứ tự trên đường đi */
  lessonIds: string[]
  /** Bài kiểm tra cuối chặng (tuỳ chọn, có tim) */
  checkpointExamId?: string
}

export interface LevelInfo {
  id: LevelId
  order: 1 | 2 | 3
  bandRange: string // "0 – 2.0"
  cefr: string // "Pre-A1 – A1"
  title: BilingualText
  goals: BilingualText
  units: Unit[]
  levelTestId?: string
}

/** Giọng đọc cho 1 dòng audio (TTS). Mặc định Anh-Anh. */
export type VoiceId = 'gb-female' | 'gb-male' | 'gb-child' | 'au-female' | 'au-male' | 'us-female' | 'us-male'

export interface AudioLine {
  speaker?: string // tên nhân vật (hiện trong transcript)
  text: string
  voice?: VoiceId
}

/** Bài nghe: nhiều đoạn, mỗi đoạn nghe lại riêng được. Transcript chỉ hiện sau khi nộp. */
export interface ListeningTask {
  instructions: string // "Questions 1–5. Write ONE WORD AND/OR A NUMBER for each answer."
  segments: { id: string; lines: AudioLine[] }[]
  questions: ExamQuestion[] // mỗi câu nên có segmentId
  strategyTip?: BilingualText
}

/** Bài đọc: hiển thị 2 cột trên desktop (bài đọc | câu hỏi), có highlight và chế độ bấm giờ. */
export interface ReadingTask {
  passage: { title: string; paragraphs: { label?: string; text: string }[] }
  instructions: string
  questions: ExamQuestion[]
  /** Có giá trị = cho phép bật "chế độ thi thật" với đồng hồ này */
  examMinutes?: number
  strategyTip?: BilingualText
}

/** Bài mẫu theo band, kèm nhận xét vì sao đạt band đó. */
export interface BandSample {
  band: string // "4.0" | "5.5" | "6.5"
  text: string
  notesVi: string
}

/** 4 tiêu chí chấm IELTS: TA (Task 1) / TR (Task 2), CC, LR, GRA. Speaking: FC, LR, GRA, P. */
export type WritingCriterion = 'TA' | 'TR' | 'CC' | 'LR' | 'GRA'
export type SpeakingCriterion = 'FC' | 'LR' | 'GRA' | 'P'

export interface WritingTaskV3 extends WritingTask {
  bandSamples: BandSample[]
  /** Checklist tự chấm: mỗi tiêu chí vài câu hỏi có/không dễ hiểu */
  checklist: { criterion: WritingCriterion; questionsVi: string[] }[]
  planningHintsVi?: string[]
}

export interface SpeakingTask {
  part: 1 | 2 | 3
  questions: string[]
  /** Part 2: 60 giây chuẩn bị + 120 giây nói */
  cueCard?: { topic: string; points: string[] }
  bandSamples: BandSample[]
  checklist?: { criterion: SpeakingCriterion; questionsVi: string[] }[]
  usefulPhrases?: string[]
  /** Âm cần luyện (người Việt hay sai), VD "final -s", "/θ/" */
  targetSounds?: string[]
}
