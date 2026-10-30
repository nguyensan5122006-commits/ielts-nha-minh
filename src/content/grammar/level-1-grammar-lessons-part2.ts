/**
 * level-1-grammar-lessons-part2.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 1 (≈ A1 – A2), PHẦN 2
 * ----------------------------------------------------------------------------
 * Bài LUYỆN TẬP riêng cho các điểm ngữ pháp trước đây chỉ có bài trên lộ trình
 * (học lý thuyết xong không có chỗ luyện tập trung).
 *
 * Danh sách bài:
 *   gr-l1-be-verb             am / is / are, phủ định, câu hỏi
 *   gr-l1-present-simple      Hiện tại đơn: V / V-s, do / does
 *   gr-l1-present-continuous  Hiện tại tiếp diễn & động từ trạng thái
 *   gr-l1-past-simple         Quá khứ đơn: V-ed, động từ bất quy tắc, did
 *   gr-l1-there-is            There is / There are / There was / There were
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2–3 thẻ ngắn song ngữ, có ví dụ
 *   - exercises     : 8 bài luyện (chọn, điền, sắp xếp, nối)
 *   - miniTest      : 5 câu kiểm tra cuối bài (có tính tim)
 *
 * Quy ước id: bài "gr-l1-<chủ đề>", bài tập "-ex<số>", câu kiểm tra "-t<số>".
 * Toàn bộ câu ví dụ và bài tập do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level1GrammarLessonsPart2: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Động từ "to be"
  // ==========================================================================
  {
    id: 'gr-l1-be-verb',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 7,
    title: { vi: 'Luyện tập: am / is / are', en: 'Practice: am / is / are' },
    description: {
      vi: 'Dùng đúng am, is, are trong câu khẳng định, phủ định và câu hỏi.',
      en: 'Use am, is and are correctly in positive sentences, negatives and questions.',
    },
    teachingCards: [
      {
        title: { vi: 'Chọn am, is hay are', en: 'Choosing am, is or are' },
        body: {
          vi: '**I → am** · **he / she / it / 1 người, 1 vật → is** · **you / we / they / nhiều người, nhiều vật → are**.\nViết tắt khi nói: I\'m, she\'s, they\'re.\nSai thường gặp: "I is", "My parents is".',
          en: '**I → am** · **he / she / it / one person or thing → is** · **you / we / they / many people or things → are**.\nShort forms in speech: I\'m, she\'s, they\'re.\nCommon mistakes: "I is", "My parents is".',
        },
        examples: [
          { en: 'I am twenty years old.', vi: 'Tôi hai mươi tuổi.' },
          { en: 'My brother is a doctor.', vi: 'Anh tôi là bác sĩ.' },
          { en: 'These shoes are new.', vi: 'Đôi giày này mới.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi', en: 'Negatives and questions' },
        body: {
          vi: '**Phủ định**: thêm **not** sau am/is/are → I\'m not, she isn\'t, they aren\'t.\n**Câu hỏi**: đưa am/is/are lên **đầu câu** → Are you ready? Is he at home?\nTrả lời ngắn: Yes, I am. / No, he isn\'t.',
          en: '**Negative**: add **not** after am/is/are → I\'m not, she isn\'t, they aren\'t.\n**Question**: move am/is/are to the **front** → Are you ready? Is he at home?\nShort answers: Yes, I am. / No, he isn\'t.',
        },
        examples: [
          { en: 'She isn\'t tired today.', vi: 'Hôm nay cô ấy không mệt.' },
          { en: 'Are your friends from Da Nang?', vi: 'Bạn của bạn đến từ Đà Nẵng à?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-be-verb-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối dạng đầy đủ với dạng viết tắt.', en: 'Match each full form with its short form.' },
        pairs: [
          { left: 'I am', right: "I'm" },
          { left: 'she is', right: "she's" },
          { left: 'they are', right: "they're" },
          { left: 'he is not', right: "he isn't" },
          { left: 'we are not', right: "we aren't" },
        ],
        explanation: { vi: 'I → am; 1 người/vật → is; we/they/you → are. not viết tắt thành n\'t.', en: 'I → am; one person or thing → is; we/they/you → are. not shortens to n\'t.' },
      },
      {
        id: 'gr-l1-be-verb-ex02',
        type: 'fill-blank',
        sentence: 'My parents ___ teachers.',
        acceptedAnswers: ['are'],
        hint: '(am / is / are)',
        explanation: { vi: '"My parents" = 2 người → are.', en: '"My parents" are two people → are.' },
      },
      {
        id: 'gr-l1-be-verb-ex03',
        type: 'multiple-choice',
        question: '___ your sister a student?',
        options: ['Am', 'Is', 'Are', 'Be'],
        correctIndex: 1,
        explanation: { vi: '"your sister" = 1 người → Is đứng đầu câu hỏi.', en: '"your sister" is one person → Is at the start of the question.' },
      },
      {
        id: 'gr-l1-be-verb-ex04',
        type: 'fill-blank',
        sentence: 'I ___ not hungry, thank you.',
        acceptedAnswers: ['am', "'m"],
        hint: '(be)',
        explanation: { vi: 'I luôn đi với am: I am not.', en: 'I always goes with am: I am not.' },
      },
      {
        id: 'gr-l1-be-verb-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['They is my friends.', 'They are my friends.', 'They am my friends.', 'They my friends.'],
        correctIndex: 1,
        explanation: { vi: 'They → are. Không được bỏ động từ to be.', en: 'They → are. You cannot leave out the verb be.' },
      },
      {
        id: 'gr-l1-be-verb-ex06',
        type: 'arrange-words',
        translationVi: 'Anh ấy không ở nhà.',
        correctSentence: "He isn't at home.",
        extraWords: ['aren\'t', 'do'],
        explanation: { vi: 'He + isn\'t (= is not).', en: 'He + isn\'t (= is not).' },
      },
      {
        id: 'gr-l1-be-verb-ex07',
        type: 'multiple-choice',
        question: '"Are you from Hanoi?" — "Yes, I ___."',
        options: ['am', 'is', 'are', "I'm"],
        correctIndex: 0,
        explanation: { vi: 'Trả lời ngắn: Yes, I am. (không viết tắt "Yes, I\'m").', en: 'Short answer: Yes, I am. (not "Yes, I\'m").' },
      },
      {
        id: 'gr-l1-be-verb-ex08',
        type: 'arrange-words',
        translationVi: 'Những quyển sách này có đắt không?',
        correctSentence: 'Are these books expensive?',
        extraWords: ['Is'],
        explanation: { vi: '"these books" số nhiều → Are đứng đầu.', en: '"these books" is plural → Are goes first.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-be-verb-t01',
        type: 'multiple-choice',
        question: 'The weather ___ very hot today.',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 1,
        explanation: { vi: '"The weather" là 1 thứ → is.', en: '"The weather" is one thing → is.' },
      },
      {
        id: 'gr-l1-be-verb-t02',
        type: 'fill-blank',
        sentence: 'We ___ in the same class.',
        acceptedAnswers: ['are', "'re"],
        hint: '(be)',
        explanation: { vi: 'We → are.', en: 'We → are.' },
      },
      {
        id: 'gr-l1-be-verb-t03',
        type: 'multiple-choice',
        question: 'Choose the correct negative: "Lan is busy."',
        options: ["Lan not is busy.", "Lan isn't busy.", "Lan doesn't busy.", "Lan aren't busy."],
        correctIndex: 1,
        explanation: { vi: 'Phủ định: is + not → isn\'t.', en: 'Negative: is + not → isn\'t.' },
      },
      {
        id: 'gr-l1-be-verb-t04',
        type: 'fill-blank',
        sentence: '___ your children at school now?',
        acceptedAnswers: ['Are', 'are'],
        hint: '(be)',
        explanation: { vi: '"your children" số nhiều → Are.', en: '"your children" is plural → Are.' },
      },
      {
        id: 'gr-l1-be-verb-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['I am a nurse.', 'It is cold.', 'My friends is kind.', 'You are late.'],
        correctIndex: 2,
        explanation: { vi: '"My friends" số nhiều → are, không phải is.', en: '"My friends" is plural → are, not is.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Thì hiện tại đơn
  // ==========================================================================
  {
    id: 'gr-l1-present-simple',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: thì hiện tại đơn', en: 'Practice: present simple' },
    description: {
      vi: 'Thêm -s/-es đúng chỗ, dùng do/does trong câu hỏi và phủ định.',
      en: 'Add -s/-es in the right place and use do/does in questions and negatives.',
    },
    teachingCards: [
      {
        title: { vi: 'Khi nào dùng, khi nào thêm -s', en: 'When to use it and when to add -s' },
        body: {
          vi: 'Dùng cho **thói quen, lịch trình, sự thật**: I get up at 6. The sun rises in the east.\n**he / she / it** → động từ **thêm -s**: works, lives.\nThêm **-es** sau o, s, sh, ch, x: goes, watches, fixes. Phụ âm + y → **-ies**: study → studies.\n**have → has**.',
          en: 'Use it for **habits, timetables and facts**: I get up at 6. The sun rises in the east.\n**he / she / it** → the verb **adds -s**: works, lives.\nAdd **-es** after o, s, sh, ch, x: goes, watches, fixes. Consonant + y → **-ies**: study → studies.\n**have → has**.',
        },
        examples: [
          { en: 'My father drinks coffee every morning.', vi: 'Bố tôi uống cà phê mỗi sáng.' },
          { en: 'She watches TV after dinner.', vi: 'Cô ấy xem TV sau bữa tối.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi với do / does', en: 'Negatives and questions with do / does' },
        body: {
          vi: '**I / you / we / they** → don\'t + V, Do … + V?\n**he / she / it** → doesn\'t + V, Does … + V?\nSau does / doesn\'t, động từ **không thêm -s** nữa: She doesn\'t **like** (không phải likes).',
          en: '**I / you / we / they** → don\'t + V, Do … + V?\n**he / she / it** → doesn\'t + V, Does … + V?\nAfter does / doesn\'t, the verb takes **no -s**: She doesn\'t **like** (not likes).',
        },
        examples: [
          { en: 'We don\'t work on Sundays.', vi: 'Chúng tôi không làm việc vào Chủ nhật.' },
          { en: 'Does your brother play football?', vi: 'Anh trai bạn có chơi bóng đá không?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-present-simple-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng ngôi thứ ba (he/she/it).', en: 'Match each verb with its he/she/it form.' },
        pairs: [
          { left: 'go', right: 'goes' },
          { left: 'study', right: 'studies' },
          { left: 'have', right: 'has' },
          { left: 'play', right: 'plays' },
          { left: 'watch', right: 'watches' },
        ],
        explanation: { vi: 'go → goes, study → studies, have → has, play → plays (nguyên âm + y giữ y), watch → watches.', en: 'go → goes, study → studies, have → has, play → plays (vowel + y keeps the y), watch → watches.' },
      },
      {
        id: 'gr-l1-present-simple-ex02',
        type: 'fill-blank',
        sentence: 'My sister ___ in a bank.',
        acceptedAnswers: ['works'],
        hint: '(work)',
        explanation: { vi: '"My sister" = she → works.', en: '"My sister" = she → works.' },
      },
      {
        id: 'gr-l1-present-simple-ex03',
        type: 'multiple-choice',
        question: '___ you like spicy food?',
        options: ['Does', 'Do', 'Are', 'Is'],
        correctIndex: 1,
        explanation: { vi: 'you → Do + V?', en: 'you → Do + V?' },
      },
      {
        id: 'gr-l1-present-simple-ex04',
        type: 'multiple-choice',
        question: 'He ___ meat. He is a vegetarian.',
        options: ["don't eat", "doesn't eat", "doesn't eats", 'not eat'],
        correctIndex: 1,
        explanation: { vi: 'He → doesn\'t + V nguyên mẫu (eat, không phải eats).', en: 'He → doesn\'t + base verb (eat, not eats).' },
      },
      {
        id: 'gr-l1-present-simple-ex05',
        type: 'fill-blank',
        sentence: 'The train ___ at 7:30 every morning.',
        acceptedAnswers: ['leaves', 'arrives', 'goes', 'departs', 'comes'],
        hint: '(leave)',
        explanation: { vi: 'Lịch trình dùng hiện tại đơn; "The train" = it → leaves.', en: 'Timetables use the present simple; "The train" = it → leaves.' },
      },
      {
        id: 'gr-l1-present-simple-ex06',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi thường nấu bữa tối.',
        correctSentence: 'My mother usually cooks dinner.',
        extraWords: ['cook', 'is'],
        explanation: { vi: 'Trạng từ tần suất (usually) đứng trước động từ thường; mother = she → cooks.', en: 'Frequency adverbs (usually) go before the main verb; mother = she → cooks.' },
      },
      {
        id: 'gr-l1-present-simple-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['Does she speaks English?', 'Do she speak English?', 'Does she speak English?', 'She does speaks English?'],
        correctIndex: 2,
        explanation: { vi: 'Does + she + V nguyên mẫu.', en: 'Does + she + base verb.' },
      },
      {
        id: 'gr-l1-present-simple-ex08',
        type: 'arrange-words',
        translationVi: 'Họ không sống ở thành phố.',
        correctSentence: "They don't live in the city.",
        extraWords: ["doesn't", 'lives'],
        explanation: { vi: 'They → don\'t + live.', en: 'They → don\'t + live.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-present-simple-t01',
        type: 'fill-blank',
        sentence: 'Water ___ at 100 degrees Celsius.',
        acceptedAnswers: ['boils'],
        hint: '(boil)',
        explanation: { vi: 'Sự thật khoa học → hiện tại đơn; water = it → boils.', en: 'A scientific fact → present simple; water = it → boils.' },
      },
      {
        id: 'gr-l1-present-simple-t02',
        type: 'multiple-choice',
        question: 'My grandparents ___ TV in the evening.',
        options: ['watches', 'watch', 'is watching', 'watchs'],
        correctIndex: 1,
        explanation: { vi: 'grandparents = they → watch (không thêm -es).', en: 'grandparents = they → watch (no -es).' },
      },
      {
        id: 'gr-l1-present-simple-t03',
        type: 'fill-blank',
        sentence: 'Minh ___ not like coffee.',
        acceptedAnswers: ['does'],
        hint: '(do / does)',
        explanation: { vi: 'Minh = he → does not.', en: 'Minh = he → does not.' },
      },
      {
        id: 'gr-l1-present-simple-t04',
        type: 'multiple-choice',
        question: 'Where ___ your aunt live?',
        options: ['do', 'does', 'is', 'are'],
        correctIndex: 1,
        explanation: { vi: 'your aunt = she → does.', en: 'your aunt = she → does.' },
      },
      {
        id: 'gr-l1-present-simple-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['He studies hard.', 'She haves two cats.', 'It rains a lot here.', 'They go to work by bus.'],
        correctIndex: 1,
        explanation: { vi: 'have → has với she: She has two cats.', en: 'have → has with she: She has two cats.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Hiện tại tiếp diễn & động từ trạng thái
  // ==========================================================================
  {
    id: 'gr-l1-present-continuous',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: hiện tại tiếp diễn', en: 'Practice: present continuous' },
    description: {
      vi: 'Phân biệt "đang làm" với "thường làm", và không dùng -ing với know, like, want.',
      en: 'Tell "doing now" from "usually do", and avoid -ing with know, like and want.',
    },
    teachingCards: [
      {
        title: { vi: 'am / is / are + V-ing', en: 'am / is / are + V-ing' },
        body: {
          vi: 'Dùng cho việc **đang xảy ra lúc nói** hoặc **tạm thời dạo này**: I\'m cooking now. She\'s staying with her aunt this month.\nTừ hay đi kèm: now, right now, at the moment, today, this week.\nChính tả: make → making, sit → sitting, lie → lying.',
          en: 'Use it for actions **happening now** or **temporary situations**: I\'m cooking now. She\'s staying with her aunt this month.\nCommon time words: now, right now, at the moment, today, this week.\nSpelling: make → making, sit → sitting, lie → lying.',
        },
        examples: [
          { en: 'Be quiet! The baby is sleeping.', vi: 'Im lặng nào! Em bé đang ngủ.' },
          { en: 'I usually walk, but today I\'m taking a taxi.', vi: 'Tôi thường đi bộ, nhưng hôm nay tôi đi taxi.' },
        ],
      },
      {
        title: { vi: 'Động từ trạng thái: không thêm -ing', en: 'State verbs: no -ing' },
        body: {
          vi: 'Động từ chỉ **suy nghĩ, cảm xúc, sở hữu** thường **không** dùng tiếp diễn: know, understand, believe, like, love, hate, want, need, prefer, own, belong.\nSai: "I am knowing the answer." → Đúng: **I know** the answer.',
          en: 'Verbs for **thoughts, feelings and possession** are usually **not** used in the continuous: know, understand, believe, like, love, hate, want, need, prefer, own, belong.\nWrong: "I am knowing the answer." → Right: **I know** the answer.',
        },
        examples: [
          { en: 'I need a new phone.', vi: 'Tôi cần một cái điện thoại mới.' },
          { en: 'Do you understand this question?', vi: 'Bạn có hiểu câu hỏi này không?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-present-continuous-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng -ing đúng chính tả.', en: 'Match each verb with its correct -ing form.' },
        pairs: [
          { left: 'run', right: 'running' },
          { left: 'write', right: 'writing' },
          { left: 'lie', right: 'lying' },
          { left: 'play', right: 'playing' },
        ],
        explanation: { vi: 'run → running (gấp đôi n), write → writing (bỏ e), lie → lying (ie → y).', en: 'run → running (double n), write → writing (drop e), lie → lying (ie → y).' },
      },
      {
        id: 'gr-l1-present-continuous-ex02',
        type: 'fill-blank',
        sentence: 'Look! It ___ raining.',
        acceptedAnswers: ['is', "'s"],
        hint: '(be)',
        explanation: { vi: '"Look!" → việc đang xảy ra; It → is + V-ing.', en: '"Look!" shows something happening now; It → is + V-ing.' },
      },
      {
        id: 'gr-l1-present-continuous-ex03',
        type: 'multiple-choice',
        question: 'I ___ the answer to this question.',
        options: ['am knowing', 'know', 'knowing', 'am know'],
        correctIndex: 1,
        explanation: { vi: 'know là động từ trạng thái → không dùng -ing.', en: 'know is a state verb → no -ing.' },
      },
      {
        id: 'gr-l1-present-continuous-ex04',
        type: 'multiple-choice',
        question: 'She usually ___ to work, but this week she ___ from home.',
        options: ['drives / works', 'is driving / works', 'drives / is working', 'is driving / is working'],
        correctIndex: 2,
        explanation: { vi: 'usually → thói quen (hiện tại đơn); this week → tạm thời (tiếp diễn).', en: 'usually → habit (present simple); this week → temporary (continuous).' },
      },
      {
        id: 'gr-l1-present-continuous-ex05',
        type: 'fill-blank',
        sentence: 'What are you ___ at the moment?',
        acceptedAnswers: ['doing', 'reading', 'eating', 'watching', 'studying'],
        hint: '(do)',
        explanation: { vi: 'are you + V-ing → doing.', en: 'are you + V-ing → doing.' },
      },
      {
        id: 'gr-l1-present-continuous-ex06',
        type: 'arrange-words',
        translationVi: 'Bọn trẻ đang chơi ngoài vườn.',
        correctSentence: 'The children are playing in the garden.',
        extraWords: ['is', 'play'],
        explanation: { vi: 'children số nhiều → are playing.', en: 'children is plural → are playing.' },
      },
      {
        id: 'gr-l1-present-continuous-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I am wanting a drink.', 'I want a drink.', 'I wanting a drink.', 'I am want a drink.'],
        correctIndex: 1,
        explanation: { vi: 'want là động từ trạng thái → I want.', en: 'want is a state verb → I want.' },
      },
      {
        id: 'gr-l1-present-continuous-ex08',
        type: 'arrange-words',
        translationVi: 'Bây giờ tôi không xem TV.',
        correctSentence: "I'm not watching TV now.",
        extraWords: ["don't", 'watch'],
        explanation: { vi: 'Phủ định: am not + V-ing.', en: 'Negative: am not + V-ing.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-present-continuous-t01',
        type: 'multiple-choice',
        question: 'Listen! Someone ___ at the door.',
        options: ['knocks', 'is knocking', 'knock', 'knocking'],
        correctIndex: 1,
        explanation: { vi: '"Listen!" → đang xảy ra → is knocking.', en: '"Listen!" → happening now → is knocking.' },
      },
      {
        id: 'gr-l1-present-continuous-t02',
        type: 'fill-blank',
        sentence: 'This bag ___ to my teacher.',
        acceptedAnswers: ['belongs'],
        hint: '(belong)',
        explanation: { vi: 'belong là động từ trạng thái → hiện tại đơn: belongs.', en: 'belong is a state verb → present simple: belongs.' },
      },
      {
        id: 'gr-l1-present-continuous-t03',
        type: 'fill-blank',
        sentence: 'We are ___ for the bus right now.',
        acceptedAnswers: ['waiting'],
        hint: '(wait)',
        explanation: { vi: 'are + V-ing → waiting.', en: 'are + V-ing → waiting.' },
      },
      {
        id: 'gr-l1-present-continuous-t04',
        type: 'multiple-choice',
        question: 'He ___ to the gym three times a week.',
        options: ['goes', 'is going', 'go', 'going'],
        correctIndex: 0,
        explanation: { vi: '"three times a week" = thói quen → goes.', en: '"three times a week" is a habit → goes.' },
      },
      {
        id: 'gr-l1-present-continuous-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['She is cooking now.', 'I am loving this song.', 'They are studying English.', 'He is sitting next to me.'],
        correctIndex: 1,
        explanation: { vi: 'Trong tiếng Anh chuẩn mực, love là động từ trạng thái → I love this song.', en: 'In standard English, love is a state verb → I love this song.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Thì quá khứ đơn
  // ==========================================================================
  {
    id: 'gr-l1-past-simple',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 9,
    title: { vi: 'Luyện tập: thì quá khứ đơn', en: 'Practice: past simple' },
    description: {
      vi: 'Chia động từ có quy tắc và bất quy tắc, dùng did / didn\'t cho đúng.',
      en: 'Form regular and irregular past verbs and use did / didn\'t correctly.',
    },
    teachingCards: [
      {
        title: { vi: 'V-ed và động từ bất quy tắc', en: 'V-ed and irregular verbs' },
        body: {
          vi: 'Dùng cho việc **đã xong** ở thời điểm xác định: yesterday, last week, in 2020, two days ago.\n**Có quy tắc**: thêm -ed → worked, lived, stopped, studied.\n**Bất quy tắc** phải học thuộc: go → **went**, eat → **ate**, buy → **bought**, see → **saw**, have → **had**.\nwas / were: I/he/she/it **was** · you/we/they **were**.',
          en: 'Use it for **finished** actions at a definite time: yesterday, last week, in 2020, two days ago.\n**Regular**: add -ed → worked, lived, stopped, studied.\n**Irregular** verbs must be learnt: go → **went**, eat → **ate**, buy → **bought**, see → **saw**, have → **had**.\nwas / were: I/he/she/it **was** · you/we/they **were**.',
        },
        examples: [
          { en: 'We visited my grandparents last Sunday.', vi: 'Chúng tôi thăm ông bà Chủ nhật tuần trước.' },
          { en: 'She bought a new dress yesterday.', vi: 'Hôm qua cô ấy mua một chiếc váy mới.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi với did', en: 'Negatives and questions with did' },
        body: {
          vi: 'Mọi ngôi: **didn\'t + V nguyên mẫu**, **Did … + V nguyên mẫu?**\nSau did, động từ **trở về nguyên mẫu**: Did you **go**? (không phải went). I didn\'t **see** him.',
          en: 'All subjects: **didn\'t + base verb**, **Did … + base verb?**\nAfter did, the verb goes **back to its base form**: Did you **go**? (not went). I didn\'t **see** him.',
        },
        examples: [
          { en: 'I didn\'t sleep well last night.', vi: 'Tối qua tôi ngủ không ngon.' },
          { en: 'Did you finish your homework?', vi: 'Bạn làm xong bài tập chưa?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-past-simple-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng quá khứ.', en: 'Match each verb with its past form.' },
        pairs: [
          { left: 'go', right: 'went' },
          { left: 'eat', right: 'ate' },
          { left: 'buy', right: 'bought' },
          { left: 'see', right: 'saw' },
          { left: 'study', right: 'studied' },
        ],
        explanation: { vi: '4 động từ bất quy tắc + study → studied (phụ âm + y → ied).', en: 'Four irregular verbs + study → studied (consonant + y → ied).' },
      },
      {
        id: 'gr-l1-past-simple-ex02',
        type: 'fill-blank',
        sentence: 'I ___ a great film last night.',
        acceptedAnswers: ['saw', 'watched'],
        hint: '(see)',
        explanation: { vi: 'last night → quá khứ; see → saw.', en: 'last night → past; see → saw.' },
      },
      {
        id: 'gr-l1-past-simple-ex03',
        type: 'multiple-choice',
        question: 'Did you ___ to the party on Saturday?',
        options: ['went', 'go', 'goes', 'going'],
        correctIndex: 1,
        explanation: { vi: 'Sau Did → động từ nguyên mẫu: go.', en: 'After Did → base verb: go.' },
      },
      {
        id: 'gr-l1-past-simple-ex04',
        type: 'fill-blank',
        sentence: 'The children ___ very tired after the trip.',
        acceptedAnswers: ['were'],
        hint: '(was / were)',
        explanation: { vi: 'children số nhiều → were.', en: 'children is plural → were.' },
      },
      {
        id: 'gr-l1-past-simple-ex05',
        type: 'multiple-choice',
        question: 'She ___ her keys, so she couldn\'t open the door.',
        options: ['forget', 'forgot', 'forgeted', 'did forgot'],
        correctIndex: 1,
        explanation: { vi: 'forget là bất quy tắc → forgot.', en: 'forget is irregular → forgot.' },
      },
      {
        id: 'gr-l1-past-simple-ex06',
        type: 'arrange-words',
        translationVi: 'Hôm qua chúng tôi không đi làm.',
        correctSentence: "We didn't go to work yesterday.",
        extraWords: ['went', "don't"],
        explanation: { vi: 'didn\'t + go (nguyên mẫu).', en: 'didn\'t + go (base form).' },
      },
      {
        id: 'gr-l1-past-simple-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['He didn\'t called me.', 'He not call me.', 'He didn\'t call me.', 'He doesn\'t called me.'],
        correctIndex: 2,
        explanation: { vi: 'didn\'t + call (nguyên mẫu).', en: 'didn\'t + call (base form).' },
      },
      {
        id: 'gr-l1-past-simple-ex08',
        type: 'arrange-words',
        translationVi: 'Bạn đã mua gì ở chợ?',
        correctSentence: 'What did you buy at the market?',
        extraWords: ['bought', 'do'],
        explanation: { vi: 'Wh- + did + you + buy?', en: 'Wh- + did + you + buy?' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-past-simple-t01',
        type: 'fill-blank',
        sentence: 'My family ___ to Nha Trang last summer.',
        acceptedAnswers: ['went', 'travelled', 'traveled', 'moved'],
        hint: '(go)',
        explanation: { vi: 'last summer → go → went.', en: 'last summer → go → went.' },
      },
      {
        id: 'gr-l1-past-simple-t02',
        type: 'multiple-choice',
        question: 'I ___ at home yesterday evening.',
        options: ['were', 'was', 'am', 'did'],
        correctIndex: 1,
        explanation: { vi: 'I → was.', en: 'I → was.' },
      },
      {
        id: 'gr-l1-past-simple-t03',
        type: 'fill-blank',
        sentence: 'They ___ (not) finish the project on time.',
        acceptedAnswers: ["didn't", 'did not'],
        hint: '(did not)',
        explanation: { vi: 'Phủ định quá khứ: didn\'t + V.', en: 'Past negative: didn\'t + V.' },
      },
      {
        id: 'gr-l1-past-simple-t04',
        type: 'multiple-choice',
        question: 'When ___ you start learning English?',
        options: ['do', 'did', 'were', 'was'],
        correctIndex: 1,
        explanation: { vi: 'Hỏi về quá khứ với động từ thường → did.', en: 'A past question with a main verb → did.' },
      },
      {
        id: 'gr-l1-past-simple-t05',
        type: 'multiple-choice',
        question: 'Which past form is wrong?',
        options: ['stop → stopped', 'have → had', 'think → thinked', 'come → came'],
        correctIndex: 2,
        explanation: { vi: 'think là bất quy tắc → thought.', en: 'think is irregular → thought.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: There is / There are
  // ==========================================================================
  {
    id: 'gr-l1-there-is',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 7,
    title: { vi: 'Luyện tập: There is / There are', en: 'Practice: There is / There are' },
    description: {
      vi: 'Nói "có cái gì ở đâu" — chọn is hay are, was hay were theo danh từ phía sau.',
      en: 'Say what there is somewhere — choose is or are, was or were from the noun that follows.',
    },
    teachingCards: [
      {
        title: { vi: 'Chọn is hay are', en: 'Choosing is or are' },
        body: {
          vi: '**There is** + danh từ số ít / không đếm được: There is a bank. There is some milk.\n**There are** + danh từ số nhiều: There are two parks.\nQuá khứ: **There was / There were**.\nTiếng Việt nói "Ở đây có…" nhưng tiếng Anh **không** dùng "have": Sai: "Here has a bank".',
          en: '**There is** + singular / uncountable noun: There is a bank. There is some milk.\n**There are** + plural noun: There are two parks.\nPast: **There was / There were**.\nDon\'t use "have" for this meaning: Wrong: "Here has a bank".',
        },
        examples: [
          { en: 'There is a supermarket near my house.', vi: 'Có một siêu thị gần nhà tôi.' },
          { en: 'There were many people at the concert.', vi: 'Có rất nhiều người ở buổi hòa nhạc.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi', en: 'Negatives and questions' },
        body: {
          vi: 'Phủ định: There **isn\'t** a… / There **aren\'t any**…\nCâu hỏi: **Is there** a…? **Are there any**…? **How many** … are there?\nTrả lời: Yes, there is. / No, there aren\'t.',
          en: 'Negative: There **isn\'t** a… / There **aren\'t any**…\nQuestions: **Is there** a…? **Are there any**…? **How many** … are there?\nAnswers: Yes, there is. / No, there aren\'t.',
        },
        examples: [
          { en: 'Is there a pharmacy around here?', vi: 'Quanh đây có hiệu thuốc không?' },
          { en: 'There aren\'t any eggs in the fridge.', vi: 'Trong tủ lạnh không còn quả trứng nào.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-there-is-ex01',
        type: 'fill-blank',
        sentence: 'There ___ three bedrooms in our flat.',
        acceptedAnswers: ['are'],
        hint: '(is / are)',
        explanation: { vi: 'three bedrooms số nhiều → are.', en: 'three bedrooms is plural → are.' },
      },
      {
        id: 'gr-l1-there-is-ex02',
        type: 'multiple-choice',
        question: 'There ___ some water in the bottle.',
        options: ['is', 'are', 'have', 'has'],
        correctIndex: 0,
        explanation: { vi: 'water không đếm được → is.', en: 'water is uncountable → is.' },
      },
      {
        id: 'gr-l1-there-is-ex03',
        type: 'multiple-choice',
        question: '___ any good restaurants in your town?',
        options: ['Is there', 'Are there', 'Have there', 'There are'],
        correctIndex: 1,
        explanation: { vi: 'restaurants số nhiều → Are there any…?', en: 'restaurants is plural → Are there any…?' },
      },
      {
        id: 'gr-l1-there-is-ex04',
        type: 'fill-blank',
        sentence: 'There ___ a big storm last night.',
        acceptedAnswers: ['was'],
        hint: '(was / were)',
        explanation: { vi: 'last night + a storm (số ít) → was.', en: 'last night + a storm (singular) → was.' },
      },
      {
        id: 'gr-l1-there-is-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['In my village has a river.', 'There has a river in my village.', 'There is a river in my village.', 'There are a river in my village.'],
        correctIndex: 2,
        explanation: { vi: 'Nói "có" một vật → There is + a + danh từ số ít.', en: 'To say something exists → There is + a + singular noun.' },
      },
      {
        id: 'gr-l1-there-is-ex06',
        type: 'arrange-words',
        translationVi: 'Lớp bạn có bao nhiêu học sinh?',
        correctSentence: 'How many students are there in your class?',
        extraWords: ['is', 'much'],
        explanation: { vi: 'How many + danh từ số nhiều + are there…?', en: 'How many + plural noun + are there…?' },
      },
      {
        id: 'gr-l1-there-is-ex07',
        type: 'fill-blank',
        sentence: 'There ___ any chairs in the meeting room yesterday.',
        acceptedAnswers: ["weren't", 'were not'],
        hint: '(not / were)',
        explanation: { vi: 'yesterday + chairs số nhiều + phủ định → weren\'t.', en: 'yesterday + plural chairs + negative → weren\'t.' },
      },
      {
        id: 'gr-l1-there-is-ex08',
        type: 'arrange-words',
        translationVi: 'Trên bàn có một con mèo.',
        correctSentence: 'There is a cat on the table.',
        extraWords: ['are', 'has'],
        explanation: { vi: 'There is + a cat + nơi chốn.', en: 'There is + a cat + place.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-there-is-t01',
        type: 'multiple-choice',
        question: 'There ___ a lot of traffic this morning.',
        options: ['were', 'was', 'are', 'have'],
        correctIndex: 1,
        explanation: { vi: 'traffic không đếm được + quá khứ → was.', en: 'traffic is uncountable + past → was.' },
      },
      {
        id: 'gr-l1-there-is-t02',
        type: 'fill-blank',
        sentence: 'There ___ two cafés on this street.',
        acceptedAnswers: ['are'],
        hint: '(is / are)',
        explanation: { vi: 'two cafés → are.', en: 'two cafés → are.' },
      },
      {
        id: 'gr-l1-there-is-t03',
        type: 'multiple-choice',
        question: '"Is there a bus stop near here?" — "Yes, ___."',
        options: ['there is', 'it is', 'there are', 'has'],
        correctIndex: 0,
        explanation: { vi: 'Trả lời ngắn: Yes, there is.', en: 'Short answer: Yes, there is.' },
      },
      {
        id: 'gr-l1-there-is-t04',
        type: 'fill-blank',
        sentence: 'There aren\'t ___ apples left.',
        acceptedAnswers: ['any'],
        hint: '(some / any)',
        explanation: { vi: 'Phủ định → any.', en: 'Negative → any.' },
      },
      {
        id: 'gr-l1-there-is-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['There is an apple.', 'There are some books.', 'There is many cars.', 'There was a problem.'],
        correctIndex: 2,
        explanation: { vi: 'many cars số nhiều → There are many cars.', en: 'many cars is plural → There are many cars.' },
      },
    ],
  },
]
