/**
 * ui-text.ts
 * ----------------------------------------------------------------------------
 * TỪ ĐIỂN CHỮ GIAO DIỆN (nút bấm, tiêu đề, thông báo...) bằng 2 ngôn ngữ.
 * Dùng trong component: const { t } = useLanguage();  t('check')  -> "Kiểm tra"
 * Câu có {biến}: t('xpEarned', { xp: 10 }) -> "+10 XP"
 *
 * Thêm chữ mới: thêm 1 dòng  tenKhoa: { vi: '...', en: '...' }
 * ----------------------------------------------------------------------------
 */
export const UI_TEXT = {
  /* ---------- chung ---------- */
  loading: { vi: 'Đang tải...', en: 'Loading...' },
  start: { vi: 'Bắt đầu', en: 'Start' },
  continue: { vi: 'Tiếp tục', en: 'Continue' },
  check: { vi: 'Kiểm tra', en: 'Check' },
  skip: { vi: 'Bỏ qua', en: 'Skip' },
  submit: { vi: 'Nộp bài', en: 'Submit' },
  close: { vi: 'Đóng', en: 'Close' },
  minutes: { vi: '{n} phút', en: '{n} min' },
  xpEarned: { vi: '+{xp} XP', en: '+{xp} XP' },

  /* ---------- menu ---------- */
  streakTooltip: { vi: 'Chuỗi ngày học liên tục', en: 'Day streak' },

  /* ---------- bài học ---------- */
  correct: { vi: 'Chính xác!', en: 'Correct!' },
  incorrect: { vi: 'Chưa đúng', en: 'Not quite' },
  correctAnswerIs: { vi: 'Đáp án đúng:', en: 'Correct answer:' },
  whyWrong: { vi: 'Tại sao sai? (AI)', en: 'Why? (AI)' },
  retryLater: { vi: 'Câu này sẽ quay lại cuối bài', en: 'This one will come back at the end' },
  heartsLeft: { vi: 'Tim còn lại', en: 'Hearts left' },
  quitConfirm: { vi: 'Thoát? Tiến độ bài này sẽ mất.', en: 'Quit? Progress in this lesson will be lost.' },

  /* ---------- dạng bài tập ---------- */
  chooseAnswer: { vi: 'Chọn đáp án đúng', en: 'Choose the correct answer' },
  fillTheBlank: { vi: 'Điền vào chỗ trống', en: 'Fill in the blank' },
  typeAnswerHere: { vi: 'Gõ câu trả lời...', en: 'Type your answer...' },
  arrangeWords: { vi: 'Sắp xếp thành câu đúng', en: 'Build the sentence' },
  trueFalse: { vi: 'Đúng hay sai?', en: 'True or false?' },
  listenAndChoose: { vi: 'Nghe và chọn đáp án', en: 'Listen and choose' },
  typeWhatYouHear: { vi: 'Nghe và gõ lại', en: 'Type what you hear' },
  readAloud: { vi: 'Đọc to câu sau', en: 'Read this aloud' },
  speakAnswer: { vi: 'Trả lời bằng giọng nói', en: 'Answer by speaking' },
  writeAnswer: { vi: 'Viết câu trả lời', en: 'Write your answer' },
  listenNormal: { vi: 'Nghe', en: 'Play' },
  listenSlow: { vi: 'Nghe chậm', en: 'Slow' },
  tapToSpeak: { vi: 'Bấm để nói', en: 'Tap to speak' },
  listeningNow: { vi: 'Đang nghe... bấm để dừng', en: 'Listening... tap to stop' },
  youSaid: { vi: 'Máy nghe được:', en: 'We heard:' },
  speechUnsupported: {
    vi: 'Trình duyệt này không hỗ trợ nhận giọng nói. Hãy dùng Chrome hoặc Edge, hoặc bấm Bỏ qua.',
    en: 'This browser does not support speech recognition. Use Chrome or Edge, or press Skip.',
  },
  micDenied: { vi: 'Không dùng được micro. Hãy cho phép quyền micro trên trình duyệt.', en: 'Microphone unavailable. Please allow microphone access.' },
  cannotSpeakNow: { vi: 'Bỏ qua (không nói được lúc này)', en: "Skip (can't speak now)" },
  startRecording: { vi: 'Bắt đầu ghi âm', en: 'Start recording' },
  stopRecording: { vi: 'Dừng ghi âm', en: 'Stop recording' },
  recordAgain: { vi: 'Ghi lại', en: 'Record again' },
  recordingSeconds: { vi: 'Đang ghi âm... {s}s', en: 'Recording... {s}s' },
  sendToAi: { vi: 'Gửi AI chấm', en: 'Send for AI grading' },
  aiGrading: { vi: 'AI đang chấm bài...', en: 'AI is grading...' },
  wordCount: { vi: '{n} từ (tối thiểu {min})', en: '{n} words (min {min})' },
  tips: { vi: 'Gợi ý', en: 'Tips' },
  sampleAnswer: { vi: 'Bài mẫu', en: 'Sample answer' },
  aiFeedback: { vi: 'Nhận xét của AI', en: 'AI feedback' },
  overallBand: { vi: 'Band ước tính', en: 'Estimated band' },
  mistakesFound: { vi: 'Lỗi cần sửa', en: 'Corrections' },
  improvedVersion: { vi: 'Bản sửa tốt hơn', en: 'Improved version' },
  transcript: { vi: 'AI nghe được', en: 'Transcript' },
  aiNote: { vi: 'Điểm AI chỉ là ước tính để tham khảo.', en: 'AI scores are estimates only.' },
  aiUnavailableContinue: { vi: 'Không chấm được bằng AI. Bạn vẫn có thể tiếp tục.', en: 'AI grading failed. You can still continue.' },

  /* ---------- ôn tập ---------- */
  dueToday: { vi: 'Cần ôn hôm nay', en: 'Due today' },

  /* ---------- phòng thi ---------- */
  playRecording: { vi: '▶ Phát bài nghe', en: '▶ Play recording' },
  audioPlaying: { vi: 'Đang phát... hãy nghe và trả lời', en: 'Playing... listen and answer' },
  audioFinished: { vi: 'Bài nghe đã phát xong', en: 'Recording finished' },
  audioOnce: { vi: 'Chỉ phát được 1 lần', en: 'Plays only once' },
  question: { vi: 'Câu', en: 'Question' },
  speakingExaminer: { vi: 'Giám khảo ảo', en: 'Virtual examiner' },
  prepTime: { vi: 'Thời gian chuẩn bị: {s}s — ghi chú ý chính', en: 'Preparation: {s}s — make notes' },
  speakNow: { vi: 'Mời bạn nói ({s}s)', en: 'Speak now ({s}s)' },
  startSpeaking: { vi: 'Bắt đầu nói ngay', en: 'Start speaking now' },
  notes: { vi: 'Ghi chú', en: 'Notes' },
  skipSpeaking: { vi: 'Bỏ qua phần Nói', en: 'Skip speaking' },
  confirmSkipSpeaking: { vi: 'Bỏ qua phần Nói còn lại? Phần chưa ghi âm sẽ không được chấm.', en: 'Skip the rest of Speaking? Unrecorded parts will not be graded.' },

  /* ---------- xếp hạng ---------- */
  leaderboardTitle: { vi: 'Bảng xếp hạng gia đình', en: 'Family leaderboard' },
  leaderboardIntro: { vi: 'Tính theo XP tuần này (bắt đầu lại mỗi thứ Hai).', en: 'Ranked by XP this week (resets every Monday).' },

  /* ================== PHẦN TRÒ CHƠI HOÁ (đợt 2) ================== */

  /* ---------- level tài khoản, huy hiệu ---------- */
  levelUpToast: { vi: 'Lên Lv.{level}! 🎉', en: 'Level {level} reached! 🎉' },
  badgeUnlocked: { vi: 'Mở khoá huy hiệu: {name}', en: 'Badge unlocked: {name}' },
  toNextLevel: { vi: 'XP tới level sau', en: 'XP to next level' },

  /* ---------- chào mừng ---------- */
  newsUnread: { vi: '{n} tin nhắn chưa đọc', en: '{n} unread messages' },
  newsOvertaken: { vi: '{names} vừa vượt bạn trên bảng xếp hạng tuần!', en: '{names} just passed you on the weekly leaderboard!' },

  /* ---------- học vui ---------- */
  funTitle: { vi: 'Học vui', en: 'Fun words' },
  cardsSeen: { vi: 'thẻ đã xem', en: 'cards seen' },
  tapToFlip: { vi: 'Bấm thẻ hoặc phím Space để lật · ← → chuyển thẻ', en: 'Click or press Space to flip · ← → to move' },

  /* ---------- nhiệm vụ, huy hiệu ---------- */
  owned: { vi: 'Đã có', en: 'Owned' },
  questsTitle: { vi: 'Nhiệm vụ & Huy hiệu', en: 'Quests & Badges' },
  questsIntro: { vi: 'Hoàn thành nhiệm vụ để nhận thêm XP. Huy hiệu tự mở khoá khi bạn đạt mốc.', en: 'Complete quests for bonus XP. Badges unlock automatically at milestones.' },
  dailyQuests: { vi: 'Nhiệm vụ hôm nay', en: "Today's quests" },
  weeklyQuests: { vi: 'Nhiệm vụ tuần', en: 'Weekly quests' },
  familyQuest: { vi: 'Nhiệm vụ cả nhà', en: 'Family quest' },
  familyXpProgress: { vi: 'XP cả nhà tuần này', en: 'Family XP this week' },
  claimed: { vi: 'Đã nhận', en: 'Claimed' },
  badges: { vi: 'Huy hiệu', en: 'Badges' },
  noBadgesYet: { vi: 'Chưa có huy hiệu nào.', en: 'No badges yet.' },

  /* ---------- hồ sơ ---------- */
  statLessons: { vi: 'Bài đã học', en: 'Lessons' },
  statPerfect: { vi: 'Mini-test 3 sao', en: '3-star tests' },
  statWords: { vi: 'Từ đã học', en: 'Words learned' },
  statLongestStreak: { vi: 'Streak dài nhất', en: 'Longest streak' },
  statLevelTests: { vi: 'Test level đã qua', en: 'Level tests passed' },
  statFunCards: { vi: 'Thẻ Học vui đã xem', en: 'Fun cards viewed' },
  statDailyWords: { vi: 'Thử thách từ đã giải', en: 'Daily words solved' },
  gameRecords: { vi: 'Kỷ lục trò chơi chữ', en: 'Word game records' },
  noRecordsYet: { vi: 'Chưa có kỷ lục nào.', en: 'No records yet.' },
  messagePrivately: { vi: 'Nhắn riêng', en: 'Message' },

  /* ---------- chat ---------- */
  familyChannel: { vi: 'Gia đình', en: 'Family' },
  onlineCount: { vi: '{n} người khác đang online', en: '{n} others online' },
  olderMessages: { vi: 'Xem tin cũ hơn', en: 'Older messages' },
  typeMessage: { vi: 'Nhập tin nhắn...', en: 'Type a message...' },
  imageError: { vi: 'Không đọc được ảnh này', en: 'Could not read this image' },
  chatOffline: { vi: 'Đang mất kết nối, chờ chút rồi gửi lại', en: 'Disconnected — please retry in a moment' },
  seenBy: { vi: 'Đã xem: {names}', en: 'Seen by {names}' },
  isTyping: { vi: '{names} đang gõ...', en: '{names} is typing...' },
  reconnecting: { vi: 'Đang kết nối lại...', en: 'Reconnecting...' },

  /* ---------- trò chơi chữ (Spelling Bee, Nối từ) ---------- */
  game_spelling: { vi: 'Spelling Bee', en: 'Spelling Bee' },
  'game_word-chain': { vi: 'Nối từ', en: 'Word chain' },
  gameDesc_spelling: { vi: 'Nghe máy đọc từ, gõ đúng chính tả.', en: 'Listen to a word and spell it.' },
  'gameDesc_word-chain': { vi: 'Từ sau bắt đầu bằng chữ cuối của từ trước. Hết giờ là thua!', en: 'Each word starts with the last letter of the previous one. Run out of time and you lose!' },
  topic: { vi: 'Chủ đề', en: 'Topic' },
  lessonTopics: { vi: 'Bài học', en: 'Lessons' },
  mixedTopics: { vi: 'Tổng hợp', en: 'Mixed' },
  questionCountLabel: { vi: 'Số câu', en: 'Questions' },
  youWin: { vi: 'Bạn thắng!', en: 'You win!' },
  gameOver: { vi: 'Kết thúc', en: 'Game over' },
  yourTurnLetter: { vi: 'Lượt của bạn! Từ bắt đầu bằng', en: 'Your turn! Word starting with' },

  /* ---------- chung của trò chơi ---------- */
  typeTheWord: { vi: 'gõ từ...', en: 'type the word...' },
  notEnoughQuestions: { vi: 'Chủ đề này chỉ đủ {n} câu cho kiểu chơi này.', en: 'This topic only has {n} questions for this game.' },
  newRecord: { vi: 'Kỷ lục mới!', en: 'New record!' },
  changeSettings: { vi: 'Đổi cài đặt', en: 'Change settings' },
  playAgain: { vi: 'Chơi lại', en: 'Play again' },
  familyRecords: { vi: 'Kỷ lục cả nhà', en: 'Family records' },
  wordsInChain: { vi: '{n} từ', en: '{n} words' },
  computerThinking: { vi: 'Máy đang nghĩ...', en: 'Computer is thinking...' },
  computerGaveUp: { vi: 'Máy hết từ, chịu thua! (+50 điểm)', en: 'The computer ran out of words! (+50 points)' },
  timeUp: { vi: 'Hết giờ!', en: "Time's up!" },
  chainRuleLetters: { vi: 'Chỉ gõ chữ cái, ít nhất 3 chữ', en: 'Letters only, at least 3' },
  chainRuleStart: { vi: 'Phải bắt đầu bằng chữ {letter}', en: 'Must start with {letter}' },
  chainRuleUsed: { vi: 'Từ này dùng rồi', en: 'Already used' },
  chainRuleDictionary: { vi: 'Không có trong từ điển', en: 'Not in the dictionary' },

  /* ---------- thử thách từ mỗi ngày ---------- */
  dailyWordTitle: { vi: 'Thử thách từ hôm nay', en: "Today's word" },
  dailyWordShort: { vi: 'Đoán từ 5 chữ trong 6 lượt, so với cả nhà.', en: 'Guess the 5-letter word in 6 tries.' },
  wordleNeed5: { vi: 'Cần đủ 5 chữ cái', en: 'Need 5 letters' },
  wordleNotWord: { vi: 'Không có trong từ điển', en: 'Not in word list' },
  wordlePlayedElsewhere: { vi: 'Hôm nay bạn đã chơi rồi.', en: 'You already played today.' },
  familyToday: { vi: 'Cả nhà hôm nay', en: 'Family today' },
} as const satisfies Record<string, { vi: string; en: string }>

export type UiTextKey = keyof typeof UI_TEXT
