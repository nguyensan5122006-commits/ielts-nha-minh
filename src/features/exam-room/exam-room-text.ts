/**
 * exam-room-text.ts — CHỮ GIAO DIỆN (2 ngôn ngữ) CỦA PHÒNG THI + MINI-TEST
 * ----------------------------------------------------------------------------
 *   const text = useExamRoomText()
 *   text('startExam')                  -> "Bắt đầu làm bài" / "Start the test"
 *   text('minutes', { n: 60 })         -> "60 phút" / "60 min"
 *
 * Chữ dùng chung của khung thi (Nộp bài, Còn 17 phút, Tô vàng…) nằm ở exam-ui/exam-ui-text.ts.
 * Đề thi (bài đọc, câu hỏi, kịch bản nghe) luôn là tiếng Anh — không nằm ở đây.
 * Luật viết (04-DESIGN-SYSTEM mục 11): câu ngắn, xưng "bạn", không VIẾT HOA tiếng Việt,
 * không đổ lỗi; sai = "Chưa đúng" + bước tiếp theo. Phòng thi không có mascot.
 * ----------------------------------------------------------------------------
 */
import { useCallback } from 'react'
import type { ExamSection } from '../../content/content-types'
import { useLanguage } from '../../translations/language-context'

const EXAM_ROOM_TEXT = {
  /* ---------- danh sách đề /exams ---------- */
  pageTitle: { vi: 'Phòng thi', en: 'Exam room' },
  pageIntro: {
    vi: 'Làm bài như trên máy thi IELTS thật: đồng hồ êm, tô vàng, ghi chú, gắn cờ. Nộp xong có band từng kỹ năng và lời chữa từng câu.',
    en: 'Work just like the computer-delivered IELTS: calm timer, highlights, notes and flags. After submitting you get a band per skill and a review of every question.',
  },
  groupMock: { vi: 'Thi thử IELTS Academic', en: 'IELTS Academic mock tests' },
  groupMockNote: { vi: '4 kỹ năng như đề thật · chọn "Thi thật" hoặc "Luyện từng phần"', en: 'All 4 skills like the real test · choose "Exam" or "Practise by section"' },
  groupLevel: { vi: 'Kiểm tra cuối level', en: 'End-of-level tests' },
  groupLevelNote: { vi: 'Đạt {pass}% để mở level tiếp theo', en: 'Score {pass}% to unlock the next level' },
  groupPlacement: { vi: 'Bài xếp lớp', en: 'Placement test' },
  placementTitle: { vi: 'Làm lại bài xếp lớp', en: 'Retake the placement test' },
  placementText: { vi: 'Tối đa 12 câu, khoảng 6 phút, không bấm giờ — tìm level vừa sức với bạn.', en: 'Up to 12 questions, about 6 minutes, no timer — find the level that fits you.' },
  placementCurrent: { vi: 'Lần trước: Level {n} · band {low}–{high}', en: 'Last time: Level {n} · band {low}–{high}' },
  minutes: { vi: '{n} phút', en: '{n} min' },
  questions: { vi: '{n} câu', en: '{n} questions' },
  questionRange: { vi: 'Câu {range}', en: 'Questions {range}' },
  noTimer: { vi: 'Không bấm giờ', en: 'No timer' },
  start: { vi: 'Bắt đầu', en: 'Start' },
  resume: { vi: 'Làm tiếp', en: 'Resume' },
  retake: { vi: 'Làm lại', en: 'Retake' },
  viewResult: { vi: 'Xem kết quả', en: 'View result' },
  inProgress: { vi: 'Đang làm dở · {where}', en: 'In progress · {where}' },
  locked: { vi: 'Chưa mở', en: 'Locked' },
  lockedHint: { vi: 'Học xong 80% số bài của Level {n} để mở bài kiểm tra.', en: 'Finish 80% of the Level {n} lessons to unlock this test.' },
  passed: { vi: 'Đã đạt {n}%', en: 'Passed · {n}%' },
  bestBand: { vi: 'Cao nhất: band {band}', en: 'Best: band {band}' },
  lastTry: { vi: 'Lần gần nhất: {score}', en: 'Last attempt: {score}' },
  historyTitle: { vi: 'Lịch sử thi', en: 'Test history' },
  historyEmptyTitle: { vi: 'Chưa có bài thi nào', en: 'No tests yet' },
  historyEmpty: { vi: 'Bắt đầu bằng 1 đề thi thử hoặc bài kiểm tra level ở trên — kết quả sẽ hiện ở đây.', en: 'Start with a mock test or a level test above — results will appear here.' },
  historyError: { vi: 'Chưa tải được lịch sử thi.', en: "Couldn't load your test history." },
  retry: { vi: 'Thử lại', en: 'Try again' },
  legacyTag: { vi: 'Đề cũ', en: 'Old test' },
  tipsTitle: { vi: 'Trước khi vào phòng thi', en: 'Before you start' },
  tip1: { vi: 'Đeo tai nghe, chọn chỗ yên tĩnh. Phần Nói cần micro.', en: 'Use headphones and a quiet place. Speaking needs a microphone.' },
  tip2: { vi: 'Câu trả lời tự lưu — lỡ đóng tab, mở lại vẫn làm tiếp.', en: 'Answers save automatically — reopen the test to carry on.' },
  tip3: { vi: 'Sai không bị trừ điểm: câu nào chưa chắc cứ đoán.', en: 'No penalty for wrong answers: always guess.' },
  shortcutsTitle: { vi: 'Phím tắt khi làm bài', en: 'Keyboard shortcuts' },
  shortcutNav: { vi: 'Câu trước / sau', en: 'Previous / next question' },
  shortcutChoose: { vi: 'Chọn đáp án', en: 'Choose an answer' },
  shortcutFlag: { vi: 'Gắn cờ câu đang xem', en: 'Flag the current question' },
  shortcutSubmit: { vi: 'Kiểm tra & nộp phần', en: 'Review & submit the section' },
  bandsTitle: { vi: 'Band ước tính của bạn', en: 'Your estimated bands' },
  bandsEmpty: { vi: 'Làm 1 đề thi thử để có band từng kỹ năng.', en: 'Take a mock test to see a band for each skill.' },

  /* ---------- tên kỹ năng ---------- */
  skill_listening: { vi: 'Nghe', en: 'Listening' },
  skill_reading: { vi: 'Đọc', en: 'Reading' },
  skill_writing: { vi: 'Viết', en: 'Writing' },
  skill_speaking: { vi: 'Nói', en: 'Speaking' },
  skill_vocabulary: { vi: 'Từ vựng & ngữ pháp', en: 'Vocabulary & grammar' },

  /* ---------- màn tổng quan đề ---------- */
  eyebrow_mock: { vi: 'Thi thử IELTS Academic', en: 'IELTS Academic mock test' },
  'eyebrow_level-test': { vi: 'Kiểm tra cuối level', en: 'End-of-level test' },
  eyebrow_placement: { vi: 'Bài xếp lớp (bản cũ)', en: 'Placement test (old version)' },
  sectionsTitle: { vi: 'Các phần thi', en: 'Sections' },
  totalTime: { vi: 'Tổng thời gian', en: 'Total time' },
  modeGroup: { vi: 'Chọn cách làm bài', en: 'Choose how to take the test' },
  modeExamTitle: { vi: 'Thi thật', en: 'Exam' },
  modeExamPoint1: { vi: 'Giờ thật từng phần, hết giờ tự nộp', en: 'Real timing per section, auto-submit' },
  modeExamPoint2: { vi: 'Phần Nghe phát 1 lần, không dừng / tua', en: 'Listening plays once, no pause or rewind' },
  modeExamPoint3: { vi: 'Chấm cuối bài: band cả 4 kỹ năng', en: 'Scored at the end: band for all 4 skills' },
  modePracticeTitle: { vi: 'Luyện từng phần', en: 'Practise by section' },
  modePracticePoint1: { vi: 'Không bấm giờ', en: 'No timer' },
  modePracticePoint2: { vi: 'Nghe lại, tua 5 giây, đổi tốc độ', en: 'Replay, skip 5 s, change speed' },
  modePracticePoint3: { vi: 'Chọn phần muốn làm (VD chỉ Reading)', en: 'Pick the sections you want (e.g. Reading only)' },
  pickSections: { vi: 'Làm những phần nào?', en: 'Which sections?' },
  pickAtLeastOne: { vi: 'Chọn ít nhất 1 phần.', en: 'Pick at least one section.' },
  rulesTitle: { vi: 'Luật phòng thi', en: 'Test rules' },
  rule1: { vi: 'Câu trả lời tự lưu trong máy — đóng tab mở lại vẫn làm tiếp đúng chỗ.', en: 'Answers save on this device — reopen to continue where you left off.' },
  rule2: { vi: 'Bôi đen chữ để tô vàng / ghi chú; gắn cờ câu khó để xem lại.', en: 'Select text to highlight or add a note; flag hard questions to revisit.' },
  rule3: { vi: 'Sai không bị trừ điểm — câu nào chưa chắc, cứ đoán.', en: 'No penalty for wrong answers — guess if unsure.' },
  rule4: { vi: 'Writing và Speaking do AI (Gemini) chấm sau khi nộp, band dạng khoảng.', en: 'Writing and Speaking are graded by AI (Gemini) after you submit, as a band range.' },
  ruleNoTimer: { vi: 'Bài này không bấm giờ — cứ làm thong thả.', en: 'This test has no timer — take your time.' },
  rulePlays: { vi: 'Mỗi Part phần Nghe được nghe tối đa {n} lần.', en: 'Each Listening part can be played up to {n} times.' },
  startExam: { vi: 'Bắt đầu làm bài', en: 'Start the test' },
  backToExams: { vi: 'Về phòng thi', en: 'Back to exam room' },
  resumeTitle: { vi: 'Bạn đang làm dở đề này', en: "You're partway through this test" },
  resumeText: { vi: 'Đang ở phần {section} · đã làm {done}/{total} câu. Câu trả lời đã được lưu.', en: 'On {section} · {done}/{total} answered. Your answers are saved.' },
  resumeTextShort: { vi: 'Đang ở phần {section}. Câu trả lời đã được lưu.', en: 'On {section}. Your answers are saved.' },
  restart: { vi: 'Làm lại từ đầu', en: 'Start over' },
  restartTitle: { vi: 'Làm lại từ đầu?', en: 'Start over?' },
  restartText: { vi: 'Câu trả lời đang lưu của đề này sẽ bị xoá.', en: 'The saved answers for this test will be cleared.' },
  cancel: { vi: 'Thôi', en: 'Cancel' },
  examNotFound: { vi: 'Không tìm thấy đề thi này', en: 'Test not found' },
  examNotFoundText: { vi: 'Đề có thể đã đổi tên. Chọn đề khác trong phòng thi nhé.', en: 'It may have been renamed. Pick another test in the exam room.' },
  lockedTitle: { vi: 'Bài kiểm tra này chưa mở', en: 'This test is still locked' },
  goLearn: { vi: 'Về lộ trình', en: 'Go to your path' },
  tryAnyway: { vi: 'Vẫn làm thử', en: 'Try it anyway' },

  /* ---------- giới thiệu từng phần ---------- */
  sectionOf: { vi: 'Phần {n}/{total}', en: 'Section {n} of {total}' },
  partsCount: { vi: '{n} phần nhỏ', en: '{n} parts' },
  passagesCount: { vi: '{n} bài đọc', en: '{n} passages' },
  tasksCount: { vi: '{n} bài viết', en: '{n} tasks' },
  startSection: { vi: 'Bắt đầu phần {skill}', en: 'Start {skill}' },
  intro_listening_auto: {
    vi: 'Âm thanh tự phát lần lượt từ Part 1 tới Part {n}, mỗi Part 1 lần, không dừng hay tua được. Hết âm thanh bạn có 2 phút để kiểm tra lại.',
    en: 'The audio plays Part 1 to Part {n} in a row, once each, with no pausing or rewinding. When it ends you get 2 minutes to check your answers.',
  },
  intro_listening_limited: { vi: 'Mỗi Part được nghe tối đa {n} lần. Bấm ▶ ở từng Part khi bạn sẵn sàng.', en: 'Each part can be played up to {n} times. Press ▶ on a part when you are ready.' },
  intro_listening_free: { vi: 'Nghe lại, lùi / tới 5 giây, đổi tốc độ thoải mái.', en: 'Replay, skip back / forward 5 s and change speed as you like.' },
  intro_reading: {
    vi: 'Bài đọc bên trái, câu hỏi bên phải. Bôi đen chữ để tô vàng hoặc ghi chú. Mỗi passage nên dành khoảng 20 phút.',
    en: 'Passage on the left, questions on the right. Select text to highlight or add a note. Spend about 20 minutes per passage.',
  },
  intro_vocabulary: { vi: 'Chọn đáp án đúng hoặc gõ 1 từ vào chỗ trống.', en: 'Choose the right answer or type one word in the gap.' },
  intro_writing: {
    vi: 'Đề bên trái, ô viết bên phải. Task 2 tính điểm gấp đôi Task 1 — nên dành khoảng 20 phút cho Task 1 và 40 phút cho Task 2.',
    en: 'Task on the left, writing box on the right. Task 2 counts twice as much as Task 1 — spend about 20 minutes on Task 1 and 40 on Task 2.',
  },
  intro_writing_single: { vi: 'Đề bên trái, ô viết bên phải. Đọc kỹ đề và viết đủ số từ.', en: 'Task on the left, writing box on the right. Read the task carefully and reach the word count.' },
  intro_speaking: {
    vi: 'Giám khảo ảo đọc câu hỏi, máy tự ghi âm câu trả lời của bạn. Part 2 có 1 phút chuẩn bị. Cần micro.',
    en: 'A virtual examiner reads each question and your answer is recorded automatically. Part 2 gives you 1 minute to prepare. A microphone is needed.',
  },
  speakingReloadNote: { vi: 'Bản ghi âm không lưu khi tải lại trang — nếu tải lại, phần Nói sẽ làm lại từ đầu.', en: 'Recordings are not kept if the page reloads — Speaking would restart.' },
  tipTitle: { vi: 'Mẹo', en: 'Tip' },
  selectHint: { vi: 'Bôi đen chữ để tô vàng hoặc ghi chú', en: 'Select text to highlight or add a note' },
  soundCheck: { vi: 'Thử loa', en: 'Sound check' },
  soundCheckLine: { vi: 'This is a sound check. If you can hear this clearly, you are ready.', en: 'This is a sound check. If you can hear this clearly, you are ready.' },

  /* ---------- làm phần Nghe / Đọc / Từ vựng ---------- */
  submitSection: { vi: 'Nộp phần này', en: 'Submit section' },
  answerQuestions: { vi: 'Trả lời câu {from}–{to}.', en: 'Answer questions {from}–{to}.' },
  audioTitle: { vi: 'Âm thanh', en: 'Audio' },
  audioPlaying: { vi: 'Đang phát', en: 'Playing' },
  audioPlayingPart: { vi: 'Đang phát {part}', en: 'Playing {part}' },
  audioPaused: { vi: 'Đang dừng', en: 'Paused' },
  audioDone: { vi: 'Đã nghe xong', en: 'Played' },
  audioNotYet: { vi: 'Chưa phát', en: 'Not played yet' },
  audioUpNext: { vi: 'Phát tiếp theo', en: 'Up next' },
  audioLoading: { vi: 'Đang tải âm thanh…', en: 'Loading audio…' },
  playsLeft: { vi: 'Còn {n} lần nghe', en: '{n} plays left' },
  noPlaysLeft: { vi: 'Hết lượt nghe', en: 'No plays left' },
  play: { vi: 'Phát', en: 'Play' },
  pause: { vi: 'Dừng', en: 'Pause' },
  continuePlay: { vi: 'Phát tiếp', en: 'Continue' },
  playPart: { vi: 'Nghe {part}', en: 'Play {part}' },
  back5: { vi: 'Lùi 5 giây', en: 'Back 5 s' },
  forward5: { vi: 'Tới 5 giây', en: 'Forward 5 s' },
  speed: { vi: 'Tốc độ', en: 'Speed' },
  examAudioNote: { vi: 'Như thi thật: các Part phát liền mạch, mỗi Part 1 lần.', en: 'Like the real test: parts play in a row, once each.' },
  transcriptLocked: { vi: 'Lời thoại mở sau khi nộp bài', en: 'Transcript opens after you submit' },
  transcriptLockedText: { vi: 'Nghe trước, đọc sau — để tai quen tốc độ thật.', en: 'Listen first, read later — train your ear for real speed.' },
  browserVoice: { vi: 'Đang đọc bằng giọng của trình duyệt (chưa có file âm thanh).', en: 'Using the browser voice (no audio file yet).' },
  checkTimeTitle: { vi: 'Hết âm thanh — 2 phút kiểm tra lại đáp án', en: 'Audio finished — 2 minutes to check your answers' },
  blockedTitle: { vi: 'Bấm để nghe tiếp', en: 'Press to continue listening' },
  blockedText: { vi: 'Trình duyệt cần 1 cú bấm trước khi phát âm thanh.', en: 'Your browser needs a click before it can play audio.' },
  startListening: { vi: 'Bắt đầu nghe', en: 'Start listening' },
  resumeListening: { vi: 'Nghe tiếp {part}', en: 'Continue {part}' },
  exitTitle: { vi: 'Ra khỏi phòng thi?', en: 'Leave the test?' },
  exitText: { vi: 'Câu trả lời đã lưu trong máy này. Mở lại đề sẽ làm tiếp đúng chỗ.', en: 'Your answers are saved on this device. Reopen the test to continue where you were.' },
  exitTimerNote: { vi: 'Đồng hồ dừng trong lúc bạn ra ngoài.', en: 'The timer pauses while you are away.' },
  exitAudioNote: { vi: 'Âm thanh đang phát sẽ dừng; quay lại nghe tiếp từ chỗ đó.', en: 'The audio stops; you will continue from the same point.' },
  stay: { vi: 'Ở lại làm tiếp', en: 'Keep going' },
  leave: { vi: 'Lưu & thoát', en: 'Save & exit' },
  timeUpToast: { vi: 'Hết giờ phần {skill} — bài đã được nộp tự động.', en: "Time's up for {skill} — your answers were submitted." },
  saving: { vi: 'Đang lưu…', en: 'Saving…' },
  saved: { vi: 'Đã lưu', en: 'Saved' },
  saveLocalError: { vi: 'Chưa lưu được trong máy', en: "Couldn't save on this device" },

  /* ---------- Writing ---------- */
  taskLabel: { vi: 'Task {n}', en: 'Task {n}' },
  writeAtLeast: { vi: 'Viết ít nhất {n} từ', en: 'Write at least {n} words' },
  spendAbout: { vi: 'Nên dành khoảng {n} phút', en: 'Spend about {n} minutes' },
  wordCount: { vi: 'Số từ: {n}', en: 'Words: {n}' },
  wordsShort: { vi: 'còn thiếu {n} từ', en: '{n} words to go' },
  wordsEnough: { vi: 'đủ số từ', en: 'word count reached' },
  essayLabel: { vi: 'Bài làm Task {n}', en: 'Your answer · Task {n}' },
  essayPlaceholder: { vi: 'Bắt đầu viết ở đây…', en: 'Start writing here…' },
  taskPane: { vi: 'Đề bài', en: 'Task' },
  answerPane: { vi: 'Bài làm', en: 'Your answer' },

  /* ---------- Speaking ---------- */
  speakingPart: { vi: 'Speaking · Part {n}', en: 'Speaking · Part {n}' },
  examiner: { vi: 'Giám khảo', en: 'Examiner' },
  part1Intro: { vi: 'Giám khảo hỏi về bạn và các chủ đề quen thuộc. Trả lời 2–3 câu cho mỗi câu hỏi.', en: 'Questions about you and familiar topics. Give 2–3 sentences for each.' },
  part2Intro: { vi: 'Bạn nhận 1 thẻ đề, có 1 phút chuẩn bị (ghi chú được) rồi nói liền tối đa {n}.', en: 'You get a task card, 1 minute to prepare (with notes), then speak for up to {n}.' },
  part3Intro: { vi: 'Câu hỏi thảo luận sâu hơn. Nêu ý kiến + lý do + ví dụ.', en: 'Deeper discussion questions. Give an opinion, a reason and an example.' },
  startPart: { vi: 'Bắt đầu Part {n}', en: 'Start Part {n}' },
  questionOf: { vi: 'Câu {i}/{n}', en: 'Question {i} of {n}' },
  examinerAsking: { vi: 'Giám khảo đang hỏi…', en: 'The examiner is asking…' },
  repeatQuestion: { vi: 'Nghe lại câu hỏi', en: 'Hear the question again' },
  prepLeft: { vi: 'Chuẩn bị · còn {s} giây', en: 'Preparation · {s} s left' },
  prepNotes: { vi: 'Ghi chú nhanh (không chấm)', en: 'Quick notes (not marked)' },
  prepNotesPlaceholder: { vi: 'Gạch ý chính: ai? ở đâu? khi nào? vì sao?', en: 'Jot ideas: who? where? when? why?' },
  speakNow: { vi: 'Nói luôn', en: 'Start speaking now' },
  startPrep: { vi: 'Bắt đầu chuẩn bị', en: 'Start preparing' },
  youShouldSay: { vi: 'You should say:', en: 'You should say:' },
  nextQuestion: { vi: 'Câu tiếp', en: 'Next question' },
  nextPart: { vi: 'Sang Part {n}', en: 'Go to Part {n}' },
  finishSpeaking: { vi: 'Nộp phần Nói', en: 'Submit Speaking' },
  skipSpeaking: { vi: 'Bỏ qua phần Nói', en: 'Skip Speaking' },
  skipSpeakingTitle: { vi: 'Bỏ qua phần Nói?', en: 'Skip Speaking?' },
  skipSpeakingText: { vi: 'Phần Nói sẽ không có band (và chưa có band tổng). Các câu đã ghi âm vẫn được chấm.', en: "Speaking won't get a band (so no overall band). Answers already recorded are still graded." },
  noMicText: { vi: 'Không ghi âm được — bạn vẫn có thể nói thành tiếng để luyện rồi bấm "Câu tiếp" (phần này sẽ không có band).', en: 'Recording is unavailable — you can still answer aloud for practice, then press "Next question" (no band for this part).' },
  recordedOk: { vi: 'Đã ghi âm', en: 'Recorded' },
  movingOn: { vi: 'Đã ghi âm · sang câu tiếp…', en: 'Recorded · moving on…' },
  speakingProgress: { vi: 'Part {p} · câu {i}/{n}', en: 'Part {p} · question {i}/{n}' },

  /* ---------- chấm bài ---------- */
  gradingTitle: { vi: 'Đang chấm bài', en: 'Grading your test' },
  gradingIntro: { vi: 'Phần Nghe / Đọc chấm ngay. Writing và Speaking do AI chấm — thường 15–40 giây mỗi bài. Đừng đóng trang nhé.', en: 'Listening / Reading are marked instantly. Writing and Speaking are graded by AI — usually 15–40 seconds each. Please keep this page open.' },
  gradingObjective: { vi: 'Chấm {skills}', en: 'Mark {skills}' },
  gradingWriting: { vi: 'AI chấm Writing Task {n}', en: 'AI grades Writing Task {n}' },
  gradingSpeaking: { vi: 'AI chấm Speaking Part {n}', en: 'AI grades Speaking Part {n}' },
  gradingSave: { vi: 'Lưu kết quả + cập nhật tiến độ', en: 'Save the result + update progress' },
  stepWaiting: { vi: 'Chờ', en: 'Waiting' },
  stepRunning: { vi: 'Đang chấm…', en: 'Working…' },
  stepDone: { vi: 'Xong', en: 'Done' },
  stepFailed: { vi: 'Chưa được', en: 'Failed' },
  stepSkipped: { vi: 'Bỏ trống', en: 'Empty' },
  aiFailedTitle: { vi: 'AI chưa chấm được {list}', en: "AI couldn't grade {list}" },
  aiFailedText: { vi: 'Có thể AI đang bận hoặc mất mạng. Thử lại, hoặc xem kết quả luôn (phần đó sẽ chưa có band).', en: 'The AI may be busy or you may be offline. Try again, or see your result now (that part will have no band).' },
  retryAi: { vi: 'Thử chấm lại', en: 'Try again' },
  skipAi: { vi: 'Xem kết quả luôn', en: 'See result now' },
  saveFailedTitle: { vi: 'Chưa lưu được lên máy chủ', en: "Couldn't save to the server" },
  saveFailedText: { vi: 'Kết quả vẫn được giữ trong máy này. Có mạng lại thì bấm "Thử lưu lại".', en: 'The result is kept on this device. When you are back online, press "Save again".' },
  retrySave: { vi: 'Thử lưu lại', en: 'Save again' },
  viewLocalResult: { vi: 'Xem kết quả trong máy', en: 'View result on this device' },

  /* ---------- kết quả ---------- */
  resultEyebrow: { vi: 'Kết quả', en: 'Result' },
  takenOn: { vi: 'Làm lúc {date}', en: 'Taken {date}' },
  modeExamTag: { vi: 'Thi thật', en: 'Exam' },
  modePracticeTag: { vi: 'Luyện tập', en: 'Practice' },
  overallBand: { vi: 'Band tổng', en: 'Overall band' },
  bandValue: { vi: 'Band {b}', en: 'Band {b}' },
  noBand: { vi: 'Chưa có band', en: 'No band yet' },
  correctOf: { vi: '{c}/{t} câu đúng', en: '{c}/{t} correct' },
  scorePercent: { vi: 'Điểm', en: 'Score' },
  levelPassed: { vi: 'Đạt rồi! Level tiếp theo đã mở.', en: 'Passed! The next level is unlocked.' },
  levelPassedLast: { vi: 'Đạt rồi! Bạn đã qua level cao nhất.', en: 'Passed! You cleared the top level.' },
  levelFailed: { vi: 'Chưa đạt — cần {pass}%. Ôn các câu sai rồi thử lại nhé.', en: 'Not yet — you need {pass}%. Review the wrong answers and try again.' },
  placementLine: { vi: 'Gợi ý: Level {n} · band khoảng {range}', en: 'Suggested: Level {n} · band about {range}' },
  partialNote: { vi: 'Bạn làm {n}/4 kỹ năng nên chưa có band tổng.', en: 'You took {n} of 4 skills, so there is no overall band.' },
  missingBandNote: { vi: 'Còn kỹ năng chưa có band nên chưa tính được band tổng.', en: 'A skill has no band yet, so the overall band is not available.' },
  nextStepTitle: { vi: 'Bước tiếp theo', en: 'Next step' },
  nextStepBand: { vi: 'Để lên band {next}, ưu tiên {skill}: {tip}', en: 'To reach band {next}, focus on {skill}: {tip}' },
  nextStepLevel: { vi: 'Ôn {skill} trước: {tip}', en: 'Work on {skill} first: {tip}' },
  tip_listening: { vi: 'đoán loại từ cần điền trước khi nghe, và nghe chép chính tả 10 phút mỗi ngày.', en: 'predict the type of word before listening, and do 10 minutes of dictation a day.' },
  tip_reading: { vi: 'tìm đúng câu chứa đáp án trước khi chọn — với TRUE/FALSE/NOT GIVEN đừng dùng hiểu biết bên ngoài.', en: 'find the exact sentence before answering — for TRUE/FALSE/NOT GIVEN never use outside knowledge.' },
  tip_writing: { vi: 'mỗi đoạn 1 ý chính + ví dụ cụ thể; dành 3 phút cuối soát chia động từ và số từ.', en: 'one main idea per paragraph with a concrete example; keep 3 minutes to check verbs and word count.' },
  tip_speaking: { vi: 'trả lời 2–3 câu: ý chính + lý do + ví dụ; ghi âm rồi nghe lại để sửa phát âm.', en: 'answer in 2–3 sentences: idea + reason + example; record yourself and listen back.' },
  tip_vocabulary: { vi: 'ôn thẻ từ mỗi ngày và học từ theo cụm (collocation).', en: 'review your word cards daily and learn words in collocations.' },
  reviewAnswers: { vi: 'Xem lại bài làm', en: 'Review answers' },
  retakeExam: { vi: 'Làm lại đề này', en: 'Retake this test' },
  continueLearning: { vi: 'Học tiếp', en: 'Continue learning' },
  practiceMistakes: { vi: 'Ôn lại câu sai', en: 'Practise wrong answers' },
  skillsTitle: { vi: 'Điểm từng kỹ năng', en: 'Score by skill' },
  byTypeTitle: { vi: 'Theo dạng câu hỏi', en: 'By question type' },
  byTypeHint: { vi: 'Dạng thấp nhất là chỗ nên luyện trước.', en: 'Start practising with the lowest type.' },
  writingTitle: { vi: 'Nhận xét Writing', en: 'Writing feedback' },
  speakingTitle: { vi: 'Nhận xét Speaking', en: 'Speaking feedback' },
  notesTitle: { vi: 'Những điểm cần lưu ý', en: 'Things to work on' },
  questionsTitle: { vi: 'Từng câu', en: 'Every question' },
  questionsHint: { vi: 'Bấm 1 số câu để xem lại kèm bằng chứng trong bài.', en: 'Click a number to review it with the evidence in the text.' },
  showEssay: { vi: 'Đề bài & bài làm ({n} từ)', en: 'Task & your answer ({n} words)' },
  showQuestions: { vi: 'Câu hỏi đã trả lời', en: 'Questions answered' },
  sampleAnswer: { vi: 'Bài mẫu tham khảo', en: 'Model answer' },
  aiNotGraded: { vi: 'AI chưa chấm được phần này', en: "The AI couldn't grade this part" },
  emptyAnswer: { vi: 'Bỏ trống', en: 'Left empty' },
  speakingSkippedNote: { vi: 'Bạn đã bỏ qua phần Nói.', en: 'You skipped Speaking.' },
  localResultNote: { vi: 'Kết quả này chỉ đang lưu trong máy (chưa gửi được lên máy chủ).', en: 'This result is only stored on this device (not yet saved to the server).' },
  resultNotFound: { vi: 'Không tìm thấy kết quả', en: 'Result not found' },
  resultNotFoundText: { vi: 'Kết quả có thể thuộc tài khoản khác hoặc đã bị xoá.', en: 'It may belong to another account or have been removed.' },
  resultLoadFailed: { vi: 'Chưa tải được kết quả', en: "Couldn't load the result" },
  resultLoadFailedText: { vi: 'Có thể mạng chập chờn. Kết quả vẫn được lưu — bấm thử lại nhé.', en: 'Your connection may be unstable. The result is still saved — try again.' },
  examGoneNote: { vi: 'Đề này không còn trong phòng thi — chỉ xem được điểm và từng câu.', en: 'This test is no longer in the exam room — only scores and answers are shown.' },
  timeSpent: { vi: 'Thời gian làm: {n} phút', en: 'Time spent: {n} min' },
  bandNote: { vi: 'Band ước tính, dạng khoảng ±0.5 cho Viết / Nói.', en: 'Estimated band; Writing / Speaking shown as a ±0.5 range.' },

  /* ---------- xem lại chi tiết ---------- */
  reviewTitle: { vi: '{exam} · Xem lại', en: '{exam} · Review' },
  backToResult: { vi: 'Về kết quả', en: 'Back to result' },
  transcript: { vi: 'Lời thoại', en: 'Transcript' },
  listenAgain: { vi: 'Nghe lại Part này', en: 'Replay this part' },
  sectionPicker: { vi: 'Chọn phần để xem lại', en: 'Choose a section to review' },
  noObjective: { vi: 'Lần làm này không có phần Nghe / Đọc để xem lại.', en: 'This attempt has no Listening / Reading to review.' },

  /* ---------- mini-test ---------- */
  miniEyebrow: { vi: 'Mini-test cuối bài', en: 'End-of-lesson mini-test' },
  miniIntroText: {
    vi: '{n} câu · 5 tim. Sai 1 câu mất 1 tim, không làm lại câu đã qua. Còn tim tới câu cuối là qua.',
    en: '{n} questions · 5 hearts. Each wrong answer costs a heart and there are no retries. Finish with hearts left to pass.',
  },
  miniStarsRule: { vi: '5 tim = 3 sao · 3–4 tim = 2 sao · 1–2 tim = 1 sao', en: '5 hearts = 3 stars · 3–4 = 2 stars · 1–2 = 1 star' },
  miniStart: { vi: 'Bắt đầu mini-test', en: 'Start the mini-test' },
  miniBackToLesson: { vi: 'Về bài học', en: 'Back to the lesson' },
  miniLessonFirst: { vi: 'Bạn chưa học xong bài này — mini-test sẽ dễ hơn nếu học trước.', en: "You haven't finished this lesson yet — the mini-test is easier after the lesson." },
  miniLearnFirst: { vi: 'Học bài trước', en: 'Do the lesson first' },
  miniAlreadyPassed: { vi: 'Bạn đã qua mini-test này ({stars} sao). Làm lại để lấy thêm sao nhé.', en: 'You already passed this mini-test ({stars} stars). Retake it for more stars.' },
  miniHeartsLeft: { vi: 'Còn {n} tim', en: '{n} hearts left' },
  miniHeartLost: { vi: 'Mất 1 tim', en: 'Lost a heart' },
  miniPassedTitle: { vi: 'Qua mini-test!', en: 'Mini-test passed!' },
  miniPassedText: { vi: 'Còn {h} tim · đúng {c}/{t} câu', en: '{h} hearts left · {c}/{t} correct' },
  miniFailedTitle: { vi: 'Hết tim rồi', en: 'Out of hearts' },
  miniFailedText: { vi: 'Không sao — ôn lại bài rồi thử lại. Các câu sai đã vào Sổ câu sai.', en: 'No worries — review the lesson and try again. Your wrong answers are in the mistakes notebook.' },
  miniRetry: { vi: 'Làm lại mini-test', en: 'Retake the mini-test' },
  miniReviewLesson: { vi: 'Ôn lại bài', en: 'Review the lesson' },
  miniNextLesson: { vi: 'Học bài tiếp theo', en: 'Next lesson' },
  miniBackToPath: { vi: 'Về lộ trình', en: 'Back to your path' },
  miniExit: { vi: 'Thoát', en: 'Exit' },
  miniExitTitle: { vi: 'Thoát mini-test?', en: 'Leave the mini-test?' },
  miniExitText: { vi: 'Mini-test không lưu giữa chừng — lần sau sẽ làm lại từ đầu, không mất tim hay sao đã có.', en: "Mini-tests don't save midway — next time starts fresh. You keep stars you already earned." },
  miniLoading: { vi: 'Đang tải mini-test…', en: 'Loading the mini-test…' },
  miniLoadError: { vi: 'Chưa tải được bài', en: "Couldn't load the lesson" },
  miniProgress: { vi: 'Tiến độ mini-test', en: 'Mini-test progress' },
  miniXp: { vi: '+{n} XP', en: '+{n} XP' },
} satisfies Record<string, { vi: string; en: string }>

export type ExamRoomTextKey = keyof typeof EXAM_ROOM_TEXT

/** Hook trả về hàm lấy chữ theo ngôn ngữ đang chọn; `{tên}` trong câu được thay bằng giá trị. */
export function useExamRoomText(): (key: ExamRoomTextKey, variables?: Record<string, string | number>) => string {
  const { language } = useLanguage()
  return useCallback(
    (key, variables) => {
      let text: string = EXAM_ROOM_TEXT[key][language]
      for (const [name, value] of Object.entries(variables ?? {})) text = text.replaceAll(`{${name}}`, String(value))
      return text
    },
    [language],
  )
}

/** Khoá chữ tên kỹ năng của 1 phần thi. */
export const skillTextKey = (skill: ExamSection['skill']) => `skill_${skill}` as const

/** Tên band IELTS chính thức (thang 0–9) + bản tiếng Việt dễ hiểu. */
export const BAND_NAMES: Record<number, { vi: string; en: string }> = {
  9: { vi: 'Thành thạo', en: 'Expert' },
  8: { vi: 'Rất tốt', en: 'Very good' },
  7: { vi: 'Tốt', en: 'Good' },
  6: { vi: 'Khá', en: 'Competent' },
  5: { vi: 'Trung bình', en: 'Modest' },
  4: { vi: 'Hạn chế', en: 'Limited' },
  3: { vi: 'Rất hạn chế', en: 'Extremely limited' },
  2: { vi: 'Rời rạc', en: 'Intermittent' },
  1: { vi: 'Mới làm quen', en: 'Non-user' },
  0: { vi: 'Chưa làm', en: 'Did not attempt' },
}

export const bandName = (band: number) => BAND_NAMES[Math.floor(band)] ?? BAND_NAMES[0]

/** 164 -> "2 giờ 44 phút" / "2 h 44 min"; 45 -> "45 phút". */
export function formatDuration(totalMinutes: number, language: 'vi' | 'en'): string {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const unitH = language === 'vi' ? 'giờ' : 'h'
  const unitM = language === 'vi' ? 'phút' : 'min'
  if (hours === 0) return `${minutes} ${unitM}`
  return minutes === 0 ? `${hours} ${unitH}` : `${hours} ${unitH} ${minutes} ${unitM}`
}
