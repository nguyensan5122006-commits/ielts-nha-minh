/**
 * skill-speaking-text.ts — CHỮ GIAO DIỆN CỦA TRÌNH SPEAKING (2 ngôn ngữ)
 * ----------------------------------------------------------------------------
 *   const text = useSpeakingText()
 *   text.recordStart              -> "Bắt đầu ghi âm" / "Start recording"
 *   text.secondsLeft(42)          -> "Còn 42 giây" / "42 seconds left"
 * Phần chấm dùng chung (tự chấm, đoán band, AI) lấy chữ từ skill-writing-text.ts.
 * Luật viết: như skill-writing-text.ts (xưng "bạn", câu ngắn, không "giỏi quá / thông minh").
 * ----------------------------------------------------------------------------
 */
import { useMemo } from 'react'
import { fillMascotName } from '../../design-system/mascot-name'
import { useLanguage } from '../../translations/language-context'

const VI = {
  /* ---------- các bước ---------- */
  stepSpeak: 'Nói',
  stepSelfCheck: 'Tự chấm',
  stepSamples: 'So mẫu & luyện âm',
  stepAi: 'AI chấm',
  partLabel: (n: number) => `Part ${n}`,
  mockLabel: 'Thi nói thử',
  questionOf: (n: number, total: number) => `Câu ${n}/${total}`,

  /* ---------- riêng tư ---------- */
  privacyShort: 'Riêng tư: bản ghi chỉ nằm trong máy bạn, không ai nghe được. Chỉ gửi tới AI khi bạn bấm “Chấm bằng AI”.',
  privacyAi: 'Bấm nút này thì các bản ghi được gửi tới AI để chấm, rồi không lưu lại trên máy chủ.',
  notKeptOnReload: 'Bản ghi không được lưu khi tải lại trang.',

  /* ---------- micro ---------- */
  micTitle: 'Bật micro để luyện nói',
  micExplain: '{mascot} cần quyền dùng micro để ghi lại bài nói của bạn. Bản ghi chỉ nằm trong máy này.',
  micAllow: 'Cho phép dùng micro',
  micRequesting: 'Bấm “Cho phép” (Allow) trên hộp thoại của trình duyệt nhé.',
  micDeniedTitle: 'Micro đang bị chặn',
  micDenied: 'Bấm biểu tượng ổ khoá cạnh địa chỉ web → Micro → Cho phép, rồi bấm Thử lại.',
  micRetry: 'Thử lại',
  micMissingTitle: 'Chưa có micro',
  micMissing: 'Máy chưa có micro hoặc trình duyệt không hỗ trợ ghi âm. Bạn vẫn có thể nói thành tiếng và tự chấm.',
  micContinueWithout: 'Tiếp tục không ghi âm',
  micChecking: 'Đang kiểm tra micro…',
  micLevel: 'Mức âm micro',

  /* ---------- máy ghi âm ---------- */
  recordStart: 'Bắt đầu ghi âm',
  recordStop: 'Dừng',
  recordAgain: 'Ghi lại',
  recording: 'Đang ghi',
  processing: 'Đang xử lý bản ghi…',
  secondsLeft: (s: number) => `Còn ${s} giây`,
  timeLeft: (clock: string) => `Còn ${clock}`,
  playMine: 'Nghe lại mình',
  pauseMine: 'Tạm dừng',
  recordedLength: (clock: string) => `Bản ghi ${clock}`,
  keyRecord: 'R',
  keyHint: 'Phím R: ghi / dừng',
  recordFailed: 'Chưa ghi được âm. Kiểm tra micro rồi thử lại.',
  noMicMode: 'Đang luyện không ghi âm — hãy nói thành tiếng.',

  /* ---------- câu hỏi Part 1 / 3 ---------- */
  listenQuestion: 'Nghe câu hỏi',
  answerHintPart1: 'Trả lời 2–4 câu: ý chính → lý do → ví dụ.',
  answerHintPart3: 'Nêu quan điểm → lý do → ví dụ → so sánh hoặc dự đoán.',
  nextQuestion: 'Câu tiếp',
  previousQuestion: 'Câu trước',
  questionsCount: (n: number) => `${n} câu hỏi`,
  skipQuestion: 'Bỏ qua câu này',
  questionDone: 'Đã ghi',
  questionTodo: 'Chưa ghi',

  /* ---------- cue card Part 2 ---------- */
  cueCard: 'Cue card',
  cueYouShouldSay: 'You should say:',
  phaseReady: 'Sẵn sàng',
  phasePrepare: 'Chuẩn bị',
  phaseSpeak: 'Nói',
  phaseDone: 'Xong',
  readyTitle: 'Đọc đề, rồi bắt đầu 1 phút chuẩn bị',
  readyHint: 'Như phòng thi: 1 phút ghi từ khoá, rồi nói tối đa 2 phút. Cố nói ít nhất 1 phút 40 giây.',
  startPrepare: 'Bắt đầu 1 phút chuẩn bị',
  prepareStatus: 'Chuẩn bị: ghi từ khoá, không viết câu',
  notesLabel: 'Ghi chú (từ khoá)',
  notesPlaceholder: 'VD: island – 2 yrs ago – ferry 3 hrs – turtles – quiet…',
  startSpeaking: 'Mình sẵn sàng — bắt đầu nói',
  speakStatus: 'Nói đi — tối đa 2 phút',
  speakAimHint: 'Mục tiêu: qua vạch 1:40',
  doneStatus: 'Xong. Nghe lại rồi tự kiểm tra nhanh',
  shrinkTimer: 'Thu nhỏ đồng hồ',
  growTimer: 'Phóng to đồng hồ',
  spokeFor: (clock: string) => `Bạn đã nói ${clock}`,
  quickCheck: 'Tự kiểm tra nhanh',
  quickCheckItems: [
    'Mình nói được ít nhất 1 phút 40 giây',
    'Mình đi qua đủ các gợi ý trên thẻ',
    'Câu chuyện có bối cảnh → diễn biến → cảm nghĩ',
    'Mình ít dừng lâu và ít lặp từ',
  ],
  redoCueCard: 'Làm lại thẻ này',

  /* ---------- màn mở đầu từng Part (bài thi thử) ---------- */
  sectionIntroPart1: 'Câu hỏi ngắn về bản thân. Mỗi câu trả lời 2–4 câu.',
  sectionIntroPart2: '1 phút chuẩn bị, rồi nói tối đa 2 phút theo thẻ đề.',
  sectionIntroPart3: 'Câu hỏi thảo luận chung, nối từ chủ đề Part 2. Nêu ý kiến và lý do.',
  startSection: (n: number) => `Bắt đầu Part ${n}`,
  allPartsDone: 'Đã xong phần nói',

  /* ---------- cụm từ hữu ích ---------- */
  phrasesTitle: 'Cụm từ hữu ích',
  phrasesHint: 'Bấm để nghe. Thử chèn 1–2 cụm vào câu trả lời.',

  /* ---------- tự chấm / bài mẫu ---------- */
  selfCheckIntro: 'Nghe lại bản ghi của bạn rồi trả lời từng câu. Tự nghe lại là cách nhanh nhất để thấy chỗ ngập ngừng.',
  yourRecordings: 'Bản ghi của bạn',
  noRecording: 'Không có bản ghi',
  listenSample: 'Nghe bài mẫu',
  stopSample: 'Dừng',
  listenSampleSlow: 'Nghe chậm',
  sampleAudioNote: 'Giọng máy đọc phần trả lời (A:), đã bỏ “uh / um”.',
  tabSamples: 'Bài mẫu',
  tabDrill: 'Luyện âm mục tiêu',
  stageTabsLabel: 'Bài mẫu hoặc luyện âm',

  /* ---------- luyện âm ---------- */
  drillTitle: 'Luyện âm mục tiêu',
  drillIntro: 'Nghe mẫu, đọc to câu, máy tô màu từng từ theo 3 mức. Tên riêng tiếng Việt không chấm.',
  drillTargets: 'Âm cần luyện',
  drillListen: 'Nghe mẫu',
  drillSpeak: 'Đọc câu này',
  drillListening: 'Đang nghe bạn đọc…',
  drillStop: 'Xong',
  drillAgain: 'Đọc lại',
  drillPlayMine: 'Nghe mình',
  levelGood: 'Đúng',
  levelClose: 'Gần đúng',
  levelMissed: 'Chưa đúng',
  levelSkip: 'Không chấm (tên riêng)',
  drillUnclearTitle: 'Máy chưa nghe rõ',
  drillUnclear: 'Không tính là sai. Thử nói gần micro hơn, hoặc nghe mẫu rồi tự so với bản ghi của mình.',
  drillUnsupported: 'Trình duyệt này chưa nhận dạng giọng nói (dùng Chrome hoặc Edge). Bạn vẫn nghe mẫu và tự so được.',
  drillSummaryGood: (n: number, total: number) => `${n}/${total} từ khoá nghe rõ`,
  drillHeard: 'Máy nghe được:',
  drillNoSentences: 'Bài này chưa có câu luyện âm.',

  /* ---------- AI ---------- */
  aiIntro: 'AI nghe các bản ghi, cho band dạng khoảng ±0.5, nêu ưu điểm trước rồi tới chỗ nâng cấp theo FC, LR, GRA, P.',
  aiIntroLabels: 'AI nghe các bản ghi, xếp mức, nêu ưu điểm trước rồi tới chỗ nâng cấp theo từng tiêu chí.',
  aiNeedsRecording: 'Cần ít nhất 1 bản ghi để AI chấm.',
  aiLoading: '{mascot} đang nhờ AI nghe bài nói…',
  aiLoadingHint: 'Thường mất 20–60 giây. Nghe lại bản ghi của mình trong lúc chờ nhé.',
  aiPartial: (sent: number, total: number) => `Bản ghi dài quá giới hạn gửi 1 lần — AI nghe ${sent}/${total} câu (ưu tiên Part 2 và Part 3).`,
  regrade: 'Chấm lại',
  backToSpeak: 'Nói lại',
}

type SpeakingText = typeof VI

const EN: SpeakingText = {
  stepSpeak: 'Speak',
  stepSelfCheck: 'Self-check',
  stepSamples: 'Models & sounds',
  stepAi: 'AI check',
  partLabel: (n) => `Part ${n}`,
  mockLabel: 'Mock test',
  questionOf: (n, total) => `Question ${n}/${total}`,

  privacyShort: 'Private: recordings stay on this device and nobody else can hear them. They go to the AI only when you press “Check with AI”.',
  privacyAi: 'Pressing this sends your recordings to the AI for grading; they are not kept on the server.',
  notKeptOnReload: 'Recordings are not kept if you reload the page.',

  micTitle: 'Turn on your microphone',
  micExplain: '{mascot} needs microphone access to record your answers. Recordings stay on this device.',
  micAllow: 'Allow microphone',
  micRequesting: 'Press “Allow” in the browser pop-up.',
  micDeniedTitle: 'Microphone is blocked',
  micDenied: 'Click the lock icon next to the web address → Microphone → Allow, then press Try again.',
  micRetry: 'Try again',
  micMissingTitle: 'No microphone found',
  micMissing: 'This device has no microphone or the browser cannot record. You can still speak aloud and check yourself.',
  micContinueWithout: 'Continue without recording',
  micChecking: 'Checking the microphone…',
  micLevel: 'Microphone level',

  recordStart: 'Start recording',
  recordStop: 'Stop',
  recordAgain: 'Record again',
  recording: 'Recording',
  processing: 'Processing your recording…',
  secondsLeft: (s) => `${s} seconds left`,
  timeLeft: (clock) => `${clock} left`,
  playMine: 'Play mine',
  pauseMine: 'Pause',
  recordedLength: (clock) => `Recording ${clock}`,
  keyRecord: 'R',
  keyHint: 'R key: record / stop',
  recordFailed: 'Could not record. Check the microphone and try again.',
  noMicMode: 'Practising without recording — speak aloud.',

  listenQuestion: 'Hear the question',
  answerHintPart1: 'Answer in 2–4 sentences: point → reason → example.',
  answerHintPart3: 'Give an opinion → reason → example → compare or predict.',
  nextQuestion: 'Next question',
  previousQuestion: 'Previous',
  questionsCount: (n) => `${n} question${n === 1 ? '' : 's'}`,
  skipQuestion: 'Skip this one',
  questionDone: 'Recorded',
  questionTodo: 'Not yet',

  cueCard: 'Cue card',
  cueYouShouldSay: 'You should say:',
  phaseReady: 'Ready',
  phasePrepare: 'Prepare',
  phaseSpeak: 'Speak',
  phaseDone: 'Done',
  readyTitle: 'Read the card, then start your minute',
  readyHint: 'Just like the test: 1 minute for keywords, then up to 2 minutes of talking. Aim for at least 1:40.',
  startPrepare: 'Start 1 minute to prepare',
  prepareStatus: 'Prepare: keywords, not sentences',
  notesLabel: 'Notes (keywords)',
  notesPlaceholder: 'e.g. island – 2 yrs ago – ferry 3 hrs – turtles – quiet…',
  startSpeaking: 'I’m ready — start speaking',
  speakStatus: 'Speak now — up to 2 minutes',
  speakAimHint: 'Aim: get past 1:40',
  doneStatus: 'Done. Listen back and check yourself',
  shrinkTimer: 'Shrink timer',
  growTimer: 'Enlarge timer',
  spokeFor: (clock) => `You spoke for ${clock}`,
  quickCheck: 'Quick self-check',
  quickCheckItems: [
    'I spoke for at least 1 minute 40 seconds',
    'I covered every prompt on the card',
    'My story had a scene → events → reflection',
    'I rarely paused for long or repeated words',
  ],
  redoCueCard: 'Redo this card',

  sectionIntroPart1: 'Short questions about you. Answer each in 2–4 sentences.',
  sectionIntroPart2: '1 minute to prepare, then up to 2 minutes on the cue card.',
  sectionIntroPart3: 'Discussion questions linked to Part 2. Give opinions and reasons.',
  startSection: (n) => `Start Part ${n}`,
  allPartsDone: 'Speaking done',

  phrasesTitle: 'Useful phrases',
  phrasesHint: 'Tap to hear. Try to use 1–2 in your answer.',

  selfCheckIntro: 'Listen to your recordings, then answer each question. Listening back shows your pauses fastest.',
  yourRecordings: 'Your recordings',
  noRecording: 'No recording',
  listenSample: 'Play model',
  stopSample: 'Stop',
  listenSampleSlow: 'Play slowly',
  sampleAudioNote: 'A computer voice reads the answers (A:), without “uh / um”.',
  tabSamples: 'Model answers',
  tabDrill: 'Target sounds',
  stageTabsLabel: 'Models or sound practice',

  drillTitle: 'Target sounds',
  drillIntro: 'Hear the model, read the sentence aloud, and each word is coloured on 3 levels. Vietnamese names are not scored.',
  drillTargets: 'Sounds to practise',
  drillListen: 'Hear model',
  drillSpeak: 'Read this aloud',
  drillListening: 'Listening to you…',
  drillStop: 'Done',
  drillAgain: 'Read again',
  drillPlayMine: 'Play mine',
  levelGood: 'Clear',
  levelClose: 'Nearly',
  levelMissed: 'Not yet',
  levelSkip: 'Not scored (name)',
  drillUnclearTitle: 'The computer did not catch that',
  drillUnclear: 'This does not count as wrong. Move closer to the mic, or play the model and compare with your own recording.',
  drillUnsupported: 'This browser cannot recognise speech (use Chrome or Edge). You can still hear the model and compare.',
  drillSummaryGood: (n, total) => `${n}/${total} key words heard clearly`,
  drillHeard: 'Heard:',
  drillNoSentences: 'This lesson has no sound practice sentences yet.',

  aiIntro: 'The AI listens to your recordings, gives a band range (±0.5), strengths first, then upgrades for FC, LR, GRA and P.',
  aiIntroLabels: 'The AI listens to your recordings, places them on a level, strengths first, then upgrades for each criterion.',
  aiNeedsRecording: 'Record at least one answer for the AI to check.',
  aiLoading: '{mascot} is asking the AI to listen to your answers…',
  aiLoadingHint: 'This usually takes 20–60 seconds. Listen to your recordings while you wait.',
  aiPartial: (sent, total) => `Too long to send at once — the AI hears ${sent}/${total} answers (Parts 2 and 3 first).`,
  regrade: 'Check again',
  backToSpeak: 'Speak again',
}

const BY_LANGUAGE = { vi: VI, en: EN }

/** Chữ giao diện trình Speaking theo ngôn ngữ đang chọn ({mascot} đã được thay tên). */
export function useSpeakingText(): SpeakingText {
  const { language } = useLanguage()
  return useMemo(() => {
    const source = BY_LANGUAGE[language]
    return { ...source, micExplain: fillMascotName(source.micExplain), aiLoading: fillMascotName(source.aiLoading) }
  }, [language])
}

export type { SpeakingText }
