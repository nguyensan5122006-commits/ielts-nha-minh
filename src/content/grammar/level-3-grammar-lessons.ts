/**
 * level-3-grammar-lessons.ts — KHU "NGỮ PHÁP" · NHÓM LEVEL 3 (≈ B1 – B2) · PHẦN 1
 * ----------------------------------------------------------------------------
 * Bài ngữ pháp viết riêng cho trang /grammar (không nằm trong chặng nào của lộ trình).
 * Mỗi bài: category 'grammar', track 'general' (tính XP cho track tổng quát), mode 'practice'.
 *
 * Danh sách bài:
 *   gr-l3-present-perfect-continuous  Hiện tại hoàn thành tiếp diễn (nhấn thời gian kéo dài)
 *   gr-l3-past-perfect                Quá khứ hoàn thành & phối hợp các thì khi kể chuyện
 *   gr-l3-conditionals-2-3            Câu điều kiện loại 2 (không có thật) & loại 3 (quá khứ đã khác)
 *   gr-l3-passive                     Câu bị động qua các thì + "It is believed that…"
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ lý thuyết song ngữ, có ví dụ
 *   - exercises     : 12 bài (chọn, điền, sắp xếp, nối, đúng/sai, nghe, nói, 1 bài viết AI chấm)
 *   - miniTest      : []
 *
 * Quy ước id: bài "gr-l3-<tên>", bài tập "gr-l3-<tên>-ex<số>".
 * Nội dung tự soạn 100% — không chép sách ngữ pháp nào.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'
import { withGrammarMiniTests } from './grammar-mini-tests'

export const level3GrammarLessons: Lesson[] = withGrammarMiniTests([
  /* ==========================================================================
   * BÀI 1 — HIỆN TẠI HOÀN THÀNH TIẾP DIỄN
   * ======================================================================== */
  {
    id: 'gr-l3-present-perfect-continuous',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Hiện tại hoàn thành tiếp diễn', en: 'Present perfect continuous' },
    description: {
      vi: 'Nói về việc đã kéo dài từ quá khứ tới giờ, và phân biệt với hiện tại hoàn thành thường.',
      en: 'Talk about activities that have continued up to now, and compare them with the present perfect simple.',
    },
    teachingCards: [
      {
        title: { vi: 'Cấu trúc và cách dùng', en: 'Form and use' },
        body: {
          vi: '**have / has been + V-ing**\nDùng cho việc **bắt đầu trong quá khứ và vẫn đang tiếp diễn** (hoặc vừa dừng), khi muốn **nhấn mạnh thời gian kéo dài**.\nHay đi với **for, since, all day, lately, recently**.\nHỏi: **How long have you been + V-ing?**',
          en: '**have / has been + -ing**\nUse it for an activity that **started in the past and is still going on** (or has just stopped), to **stress how long** it lasted.\nCommon with **for, since, all day, lately, recently**.\nAsk: **How long have you been + -ing?**',
        },
        examples: [
          { en: "I've been learning English for six years.", vi: 'Tôi đã học tiếng Anh được sáu năm (và vẫn đang học).' },
          { en: 'How long have you been working at this company?', vi: 'Bạn làm ở công ty này bao lâu rồi?' },
          { en: "Your eyes are red. Have you been staring at a screen all day?", vi: 'Mắt bạn đỏ quá. Bạn nhìn màn hình cả ngày à?' },
        ],
      },
      {
        title: { vi: 'Nhấn thời gian hay nhấn kết quả?', en: 'Duration or result?' },
        body: {
          vi: '**have been + V-ing** → nhấn **quá trình, thời gian** (bao lâu).\n**have + V3** → nhấn **kết quả, số lượng** (được bao nhiêu, xong chưa).\nI**\'ve been writing** my essay all morning. (vẫn đang viết)\nI**\'ve written** three paragraphs. (kết quả: 3 đoạn)\nCó **con số / số lượng** → thường dùng hiện tại hoàn thành thường.',
          en: '**have been + -ing** → stresses the **activity and duration** (how long).\n**have + past participle** → stresses the **result or amount** (how much, finished?).\nI**\'ve been writing** my essay all morning. (still writing)\nI**\'ve written** three paragraphs. (result: 3)\nWith **numbers / amounts** → usually the present perfect simple.',
        },
        examples: [
          { en: "She's been cleaning the house since eight o'clock.", vi: 'Cô ấy dọn nhà từ 8 giờ đến giờ.' },
          { en: "She's cleaned the kitchen and the living room.", vi: 'Cô ấy đã dọn xong bếp và phòng khách.' },
        ],
      },
      {
        title: { vi: 'Không dùng với động từ trạng thái', en: 'Not with state verbs' },
        body: {
          vi: 'Động từ **trạng thái** (know, believe, own, like, want, belong, understand) **không** dùng dạng -ing → dùng **have + V3**.\nSai: "I\'ve been knowing her for years."\nĐúng: I**\'ve known** her for years.',
          en: '**State verbs** (know, believe, own, like, want, belong, understand) are **not** used with -ing → use **have + past participle**.\nWrong: "I\'ve been knowing her for years."\nRight: I**\'ve known** her for years.',
        },
        examples: [
          { en: "We've had this car since 2018.", vi: 'Chúng tôi có chiếc xe này từ năm 2018.' },
          { en: "I've always wanted to visit Iceland.", vi: 'Tôi luôn muốn đến Iceland.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-present-perfect-continuous-ex01',
        type: 'multiple-choice',
        question: 'I ___ for the bus for twenty minutes, and it still hasn\'t come.',
        options: ['wait', 'am waiting', 'have been waiting', 'waited'],
        correctIndex: 2,
        explanation: {
          vi: 'Bắt đầu trước đây, vẫn đang chờ, có "for twenty minutes" → have been waiting.',
          en: 'Started earlier, still waiting, with "for twenty minutes" → have been waiting.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex02',
        type: 'fill-blank',
        sentence: 'The city ___ a new metro line since 2021.',
        acceptedAnswers: ['has been building', "'s been building"],
        hint: '(build)',
        explanation: {
          vi: 'Việc kéo dài từ 2021 đến nay, chưa xong → has been building.',
          en: 'An ongoing activity since 2021, not finished → has been building.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex03',
        type: 'fill-blank',
        sentence: 'How long ___ you been living in Ho Chi Minh City?',
        acceptedAnswers: ['have'],
        hint: '(have / has)',
        explanation: {
          vi: 'Câu hỏi: How long + have + you + been + V-ing?',
          en: 'Question form: How long + have + you + been + -ing?',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          "I've been knowing my best friend since primary school.",
          "I've known my best friend since primary school.",
          "I'm knowing my best friend since primary school.",
          'I know my best friend since primary school.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"know" là động từ trạng thái → have known, không dùng -ing.',
          en: '"know" is a state verb → have known, not -ing.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex05',
        type: 'multiple-choice',
        question: 'So far this month, our team ___ fifteen new customers.',
        options: ['has been finding', 'has found', 'is finding', 'have been found'],
        correctIndex: 1,
        explanation: {
          vi: 'Có số lượng (fifteen) → nhấn kết quả → has found.',
          en: 'A number (fifteen) → focus on result → has found.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu với ý nghĩa đúng.', en: 'Match each sentence with its meaning.' },
        pairs: [
          { left: "I've been reading that book.", right: "I haven't finished it yet." },
          { left: "I've read that book.", right: 'I finished it.' },
          { left: "He's been running.", right: "That's why he's out of breath." },
          { left: "He's run five kilometres.", right: 'This is the total distance.' },
        ],
        explanation: {
          vi: 'been + V-ing: quá trình / dấu vết còn lại; have + V3: kết quả, đã xong.',
          en: 'been + -ing: the activity or its signs; have + past participle: a finished result.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex07',
        type: 'true-false',
        statement: '"Air pollution has been getting worse in many cities lately." is a correct sentence.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Xu hướng đang tiếp diễn gần đây ("lately") → has been getting, đúng.',
          en: 'An ongoing recent trend ("lately") → has been getting is correct.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex08',
        type: 'arrange-words',
        translationVi: 'Cô ấy đã học cho kỳ thi IELTS từ tháng Ba.',
        correctSentence: 'She has been studying for IELTS since March.',
        extraWords: ['for', 'is'],
        explanation: {
          vi: 'has been + V-ing; "since" + mốc thời gian (March).',
          en: 'has been + -ing; "since" + a starting point (March).',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex09',
        type: 'listen-choose',
        audioText: "Sorry I'm so dirty. I've been repairing my bike in the garage all afternoon.",
        question: 'Why is the speaker dirty?',
        options: [
          'He has just bought a bike.',
          'He was working on his bike for a long time.',
          'He cleaned the garage yesterday.',
          'He is going to repair his bike.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"have been repairing… all afternoon" giải thích kết quả hiện tại (bị bẩn).',
          en: '"have been repairing… all afternoon" explains the present result (dirty).',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex10',
        type: 'speak-sentence',
        sentence: "I've been working here for three years, and I've learned a lot.",
        translationVi: 'Tôi làm ở đây được ba năm rồi, và tôi đã học được rất nhiều.',
        explanation: {
          vi: 'So sánh 2 thì trong 1 câu. Đọc "I\'ve been" nhanh, "been" nhẹ /bɪn/.',
          en: 'Two tenses in one sentence. Say "I\'ve been" quickly, with a weak /bɪn/.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex11',
        type: 'speak-answer',
        question: 'IELTS Part 1: How long have you been studying English, and how has your English changed?',
        tipsVi: 'Câu 1: I\'ve been studying English for/since … Câu 2: dùng have + V3 cho kết quả: I\'ve improved…, I\'ve learned…',
        sampleAnswer:
          "I've been studying English since I was about ten, so for around eight years now. Recently I've been watching a lot of videos in English, and I've definitely improved my listening.",
        recordSeconds: 45,
        explanation: {
          vi: 'Kiểm tra: been + V-ing cho thời gian kéo dài, have + V3 cho kết quả.',
          en: 'Check: been + -ing for duration, have + past participle for results.',
        },
      },
      {
        id: 'gr-l3-present-perfect-continuous-ex12',
        type: 'write-answer',
        prompt:
          'Write a short email (40–60 words) to an English-speaking friend explaining what you have been doing lately and what you have achieved.',
        tipsVi:
          'Dùng ít nhất 2 câu "have been + V-ing" (việc kéo dài gần đây) và 2 câu "have + V3" (kết quả). Thêm lately / recently / since…',
        minWords: 40,
        sampleAnswer:
          "Hi Sam, sorry I haven't written for ages! I've been working on a big project at work since September, so I've been staying late most evenings. The good news is that we've finished the first stage, and I've saved enough money for a short trip. How have you been? Lan",
        explanation: {
          vi: 'Kiểm tra: phân biệt quá trình (been + V-ing) và kết quả (have + V3).',
          en: 'Check: separate activities (been + -ing) from results (have + past participle).',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — QUÁ KHỨ HOÀN THÀNH & KỂ CHUYỆN
   * ======================================================================== */
  {
    id: 'gr-l3-past-perfect',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Quá khứ hoàn thành & kể chuyện', en: 'Past perfect & narrative tenses' },
    description: {
      vi: 'Sắp xếp các việc trong quá khứ cho rõ: việc nào xảy ra trước, việc nào đang diễn ra.',
      en: 'Order past events clearly: what happened first and what was in progress.',
    },
    teachingCards: [
      {
        title: { vi: 'Quá khứ hoàn thành: "trước một mốc quá khứ"', en: 'Past perfect: "before another past moment"' },
        body: {
          vi: '**had + V3** (mọi chủ ngữ).\nDùng cho việc xảy ra **trước** một việc / mốc khác **trong quá khứ**.\nWhen I got to the station, the train **had left**. (tàu đi trước, tôi đến sau)\nSo sánh: When I got there, the train **left**. (tôi đến rồi tàu mới đi)',
          en: '**had + past participle** (all subjects).\nUse it for something that happened **before** another **past** event or time.\nWhen I got to the station, the train **had left**. (train first, me second)\nCompare: When I got there, the train **left**. (I arrived, then it left)',
        },
        examples: [
          { en: 'She had never flown before her trip to Singapore.', vi: 'Trước chuyến đi Singapore, cô ấy chưa từng đi máy bay.' },
          { en: 'I was hungry because I had skipped breakfast.', vi: 'Tôi đói vì đã bỏ bữa sáng.' },
        ],
      },
      {
        title: { vi: 'Từ báo hiệu', en: 'Signal words' },
        body: {
          vi: '**by the time** + quá khứ đơn, … **had + V3**: By the time help arrived, the fire **had spread**.\n**already, just, never… before** hay đi với had.\n**before / after** đã cho biết thứ tự, nên quá khứ đơn cũng được: After I **(had) finished** work, I went home.',
          en: '**by the time** + past simple, … **had + past participle**: By the time help arrived, the fire **had spread**.\n**already, just, never… before** often go with had.\n**before / after** already show the order, so the past simple is also fine: After I **(had) finished** work, I went home.',
        },
        examples: [
          { en: 'By the time we reached the cinema, the film had already started.', vi: 'Khi chúng tôi tới rạp thì phim đã bắt đầu rồi.' },
          { en: 'The shop had just closed when I arrived.', vi: 'Cửa hàng vừa đóng cửa lúc tôi tới.' },
        ],
      },
      {
        title: { vi: 'Kể chuyện: 3 thì phối hợp', en: 'Telling a story: three tenses together' },
        body: {
          vi: '**Quá khứ đơn** → các sự việc **chính, lần lượt**.\n**Quá khứ tiếp diễn** → **bối cảnh** đang diễn ra.\n**Quá khứ hoàn thành** → việc **xảy ra trước** đó.\nIt **was raining** and I **was walking** home. Suddenly I **realised** I **had left** my keys at the office.',
          en: '**Past simple** → the **main events, in order**.\n**Past continuous** → the **background** in progress.\n**Past perfect** → something that happened **earlier**.\nIt **was raining** and I **was walking** home. Suddenly I **realised** I **had left** my keys at the office.',
        },
        examples: [
          { en: 'While we were having dinner, my phone rang. It was a friend I had met in Hue.', vi: 'Khi chúng tôi đang ăn tối thì điện thoại reo. Đó là một người bạn tôi đã quen ở Huế.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-past-perfect-ex01',
        type: 'multiple-choice',
        question: 'When we arrived at the party, most of the guests ___ home.',
        options: ['have gone', 'had gone', 'were going', 'go'],
        correctIndex: 1,
        explanation: {
          vi: 'Khách về TRƯỚC khi chúng tôi đến → had gone.',
          en: 'The guests left BEFORE we arrived → had gone.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex02',
        type: 'fill-blank',
        sentence: 'By the time the ambulance came, a nurse ___ first aid.',
        acceptedAnswers: ['had given', "'d given"],
        hint: '(give)',
        explanation: {
          vi: '"By the time" + quá khứ đơn → vế còn lại dùng had + V3.',
          en: '"By the time" + past simple → the other clause uses had + past participle.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex03',
        type: 'fill-blank',
        sentence: 'I didn\'t recognise my old school because they ___ it completely.',
        acceptedAnswers: ['had rebuilt', "'d rebuilt"],
        hint: '(rebuild)',
        explanation: {
          vi: 'Việc xây lại xảy ra trước lúc tôi không nhận ra → had rebuilt.',
          en: 'The rebuilding happened before I failed to recognise it → had rebuilt.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex04',
        type: 'multiple-choice',
        question: 'Which event happened FIRST? "When I turned on the TV, the match had finished."',
        options: ['I turned on the TV.', 'The match finished.', 'Both at the same time.', 'We cannot know.'],
        correctIndex: 1,
        explanation: {
          vi: 'had finished = việc xảy ra trước → trận đấu kết thúc trước.',
          en: 'had finished = the earlier event → the match finished first.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex05',
        type: 'multiple-choice',
        question: 'I ___ along the beach when I saw a turtle.',
        options: ['had walked', 'was walking', 'have walked', 'walk'],
        correctIndex: 1,
        explanation: {
          vi: 'Bối cảnh đang diễn ra khi việc khác xảy ra → quá khứ tiếp diễn.',
          en: 'A background action in progress when something happened → past continuous.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối thì với vai trò trong câu chuyện.', en: 'Match each tense with its job in a story.' },
        pairs: [
          { left: 'past simple', right: 'main events in order' },
          { left: 'past continuous', right: 'background in progress' },
          { left: 'past perfect', right: 'an earlier event' },
          { left: 'by the time', right: 'signal for had + past participle' },
        ],
        explanation: {
          vi: 'Ba thì phối hợp giúp người nghe hiểu thứ tự sự việc.',
          en: 'The three tenses together show the listener the order of events.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex07',
        type: 'true-false',
        statement: '"Before she moved to Da Nang, she had lived in Hanoi for ten years." is correct.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sống ở Hà Nội xảy ra trước khi chuyển → had lived, đúng.',
          en: 'Living in Hanoi came before moving → had lived is correct.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex08',
        type: 'true-false',
        statement: '"I had gone to the dentist yesterday." is the best way to talk about one simple event yesterday.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Một việc đơn lẻ, không có mốc quá khứ khác → quá khứ đơn: I went…',
          en: 'One event with no other past point → past simple: I went…',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex09',
        type: 'arrange-words',
        translationVi: 'Cô ấy chưa từng thấy tuyết trước chuyến đi đó.',
        correctSentence: 'She had never seen snow before that trip.',
        extraWords: ['has'],
        explanation: {
          vi: '"had never + V3 … before" = chưa từng trước một mốc quá khứ.',
          en: '"had never + past participle … before" = not before a past point.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex10',
        type: 'listen-choose',
        audioText:
          "Last Friday I was driving to work when my car stopped. I checked the engine, and then I realised I hadn't filled up the tank for over a week.",
        question: 'Why did the car stop?',
        options: ['The engine was broken.', 'There was no petrol left.', 'There was a traffic jam.', 'The driver was late.'],
        correctIndex: 1,
        explanation: {
          vi: '"hadn\'t filled up the tank" = đã không đổ xăng trước đó → hết xăng.',
          en: '"hadn\'t filled up the tank" = no petrol had been added earlier → it ran out.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex11',
        type: 'speak-answer',
        question: 'IELTS Part 2 style: Describe a time when something went wrong on a trip. What happened?',
        tipsVi:
          'Bối cảnh: I was … -ing. Sự việc chính: quá khứ đơn. Việc xảy ra trước: had + V3 (VD: I realised I had forgotten…). Nói 4–5 câu.',
        sampleAnswer:
          "Two years ago I was travelling to Da Lat with my family. We were waiting at the bus station when my father suddenly realised he had left our tickets at the hotel. He ran back to get them, but by the time he returned, the bus had already gone. In the end, we caught a later bus and laughed about it.",
        recordSeconds: 60,
        explanation: {
          vi: 'Kiểm tra: có đủ 3 thì — bối cảnh, sự việc chính, việc xảy ra trước.',
          en: 'Check: all three tenses — background, main events, earlier events.',
        },
      },
      {
        id: 'gr-l3-past-perfect-ex12',
        type: 'write-answer',
        prompt:
          'Write a short paragraph (50–70 words) about a day when you arrived somewhere too late. Use the past simple, past continuous and past perfect.',
        tipsVi: 'Gợi ý: It was … and I was … -ing. When I arrived, … had already … By the time …, … had …',
        minWords: 50,
        sampleAnswer:
          "Last month I had an important job interview. It was raining heavily and the traffic was moving very slowly. I was sitting in a taxi, checking the time every minute. When I finally arrived, the manager had already started interviewing the next candidate. I had prepared for a week, so I was very disappointed. Luckily, they kindly gave me another appointment.",
        explanation: {
          vi: 'Kiểm tra: had + V3 chỉ dùng cho việc xảy ra trước, không lạm dụng.',
          en: 'Check: use had + past participle only for earlier events — don\'t overuse it.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — CÂU ĐIỀU KIỆN LOẠI 2 & LOẠI 3
   * ======================================================================== */
  {
    id: 'gr-l3-conditionals-2-3',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 13,
    title: { vi: 'Câu điều kiện loại 2 & loại 3', en: 'Second & third conditionals' },
    description: {
      vi: 'Tưởng tượng điều không có thật ở hiện tại và nói về điều đã có thể khác trong quá khứ.',
      en: 'Imagine unreal situations now and talk about how the past could have been different.',
    },
    teachingCards: [
      {
        title: { vi: 'Loại 2: không có thật ở hiện tại / tương lai', en: 'Second conditional: unreal now or future' },
        body: {
          vi: '**If + quá khứ đơn, would / could + V.**\nDùng cho tình huống **tưởng tượng, khó xảy ra**. Thì quá khứ ở đây **không** nói về quá khứ.\nVới **be**, văn trang trọng dùng **were** cho mọi chủ ngữ: If I **were** you, …\nRất hữu ích cho IELTS Speaking Part 3 và Writing Task 2.',
          en: '**If + past simple, would / could + verb.**\nUse it for **imagined or unlikely** situations. The past form does **not** mean past time.\nWith **be**, formal English uses **were** for all subjects: If I **were** you, …\nVery useful for IELTS Speaking Part 3 and Writing Task 2.',
        },
        examples: [
          { en: 'If I had more free time, I would learn to play the guitar.', vi: 'Nếu tôi có nhiều thời gian rảnh hơn, tôi sẽ học chơi đàn guitar.' },
          { en: 'If public transport were free, fewer people would drive.', vi: 'Nếu phương tiện công cộng miễn phí, sẽ ít người lái xe hơn.' },
        ],
      },
      {
        title: { vi: 'Loại 3: quá khứ đã có thể khác', en: 'Third conditional: a different past' },
        body: {
          vi: '**If + had + V3, would / could have + V3.**\nNói về điều **đã không xảy ra** và kết quả tưởng tượng của nó — thường để **tiếc nuối** hoặc **rút kinh nghiệm**.\nIf I **had left** earlier, I **wouldn\'t have missed** the flight. (thực tế: tôi đi muộn và lỡ chuyến)',
          en: '**If + had + past participle, would / could have + past participle.**\nTalk about something that **did not happen** and its imagined result — often for **regret** or **lessons**.\nIf I **had left** earlier, I **wouldn\'t have missed** the flight. (in fact, I left late and missed it)',
        },
        examples: [
          { en: 'If she had studied harder, she would have passed the exam.', vi: 'Nếu cô ấy học chăm hơn thì đã đỗ kỳ thi rồi.' },
          { en: "We could have saved money if we had booked earlier.", vi: 'Chúng ta đã có thể tiết kiệm tiền nếu đặt sớm hơn.' },
        ],
      },
      {
        title: { vi: 'Chọn loại nào?', en: 'Which one?' },
        body: {
          vi: '**Loại 1**: có thể xảy ra thật → If it rains, I **will** stay home.\n**Loại 2**: tưởng tượng về hiện tại/tương lai → If I **won** the lottery, I **would** travel.\n**Loại 3**: tưởng tượng về quá khứ → If I **had seen** you, I **would have said** hello.\n**Không** dùng would trong vế if.',
          en: '**First**: really possible → If it rains, I **will** stay home.\n**Second**: imagined present/future → If I **won** the lottery, I **would** travel.\n**Third**: imagined past → If I **had seen** you, I **would have said** hello.\n**No** would in the if-clause.',
        },
        examples: [
          { en: 'If the government invested more in education, the economy would grow faster.', vi: 'Nếu chính phủ đầu tư nhiều hơn vào giáo dục, kinh tế sẽ tăng trưởng nhanh hơn.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-conditionals-2-3-ex01',
        type: 'multiple-choice',
        question: 'If I ___ the mayor of my city, I would build more cycle lanes.',
        options: ['am', 'were', 'will be', 'had been'],
        correctIndex: 1,
        explanation: {
          vi: 'Tình huống tưởng tượng ở hiện tại → loại 2: If I were…',
          en: 'An imagined present situation → second conditional: If I were…',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex02',
        type: 'fill-blank',
        sentence: 'If people ate less meat, there ___ fewer greenhouse gases.',
        acceptedAnswers: ['would be', "'d be"],
        hint: '(be)',
        explanation: {
          vi: 'Loại 2: If + quá khứ đơn (ate), would + V (would be).',
          en: 'Second conditional: If + past simple (ate), would + verb (would be).',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex03',
        type: 'fill-blank',
        sentence: 'If we had checked the weather forecast, we ___ our umbrellas.',
        acceptedAnswers: ['would have brought', "'d have brought", 'would have taken', "'d have taken"],
        hint: '(bring)',
        explanation: {
          vi: 'Loại 3 (quá khứ không có thật): would have + V3.',
          en: 'Third conditional (unreal past): would have + past participle.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex04',
        type: 'multiple-choice',
        question: '"If he had taken the job, he would have moved to Singapore." What is TRUE?',
        options: [
          'He took the job and moved.',
          "He didn't take the job and didn't move.",
          'He will take the job soon.',
          'He moved but didn\'t take the job.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Loại 3 nói điều trái với quá khứ: thực tế anh ấy không nhận việc.',
          en: 'The third conditional is the opposite of the real past: he didn\'t take it.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'If I would have more money, I would buy a flat.',
          'If I had more money, I would buy a flat.',
          'If I have more money, I would buy a flat.',
          'If I had more money, I will buy a flat.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Loại 2: If + had (quá khứ), would + buy. Không dùng would sau if.',
          en: 'Second: If + had (past), would + buy. No would after if.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối vế "if" với kết quả đúng loại.', en: 'Match each if-clause with the correct result.' },
        pairs: [
          { left: 'If it rains tomorrow,', right: 'the match will be cancelled.' },
          { left: 'If cities had fewer cars,', right: 'the air would be cleaner.' },
          { left: 'If you had asked me,', right: 'I would have helped you.' },
          { left: 'If I were you,', right: 'I would talk to the manager.' },
        ],
        explanation: {
          vi: 'Hiện tại → will; quá khứ đơn → would; had + V3 → would have.',
          en: 'Present → will; past simple → would; had + past participle → would have.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex07',
        type: 'true-false',
        statement: '"If I had known about the traffic, I would leave earlier." is correct.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Vế if là loại 3 → kết quả phải là "would have left".',
          en: 'The if-clause is third conditional → the result must be "would have left".',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex08',
        type: 'arrange-words',
        translationVi: 'Nếu tôi là bạn, tôi sẽ đặt vé ngay hôm nay.',
        correctSentence: 'If I were you, I would book the tickets today.',
        extraWords: ['will'],
        explanation: {
          vi: '"If I were you" + would + V là cách khuyên quen thuộc.',
          en: '"If I were you" + would + verb is a common way to give advice.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex09',
        type: 'listen-choose',
        audioText:
          "Honestly, if I hadn't joined that photography club at university, I would never have become a designer.",
        question: 'What does the speaker mean?',
        options: [
          'The club made the speaker become a designer.',
          'The speaker never joined a club.',
          'The speaker is not a designer.',
          'The speaker wants to join a club.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Thực tế: đã tham gia câu lạc bộ → đã trở thành nhà thiết kế.',
          en: 'In reality, the speaker joined the club → became a designer.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex10',
        type: 'speak-sentence',
        sentence: "If I'd known about the problem, I would have helped you.",
        translationVi: 'Nếu tôi biết về vấn đề đó, tôi đã giúp bạn rồi.',
        explanation: {
          vi: 'Khi nói nhanh: "would have" nghe như /ˈwʊdəv/. "I\'d" = I had.',
          en: 'In fast speech "would have" sounds like /ˈwʊdəv/. "I\'d" = I had.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex11',
        type: 'speak-answer',
        question: 'IELTS Part 3: What would happen if everyone in your city worked from home?',
        tipsVi:
          'Dùng loại 2: If everyone worked from home, … would … Nêu 1 lợi ích + 1 bất lợi, có lý do. Có thể thêm "might / could".',
        sampleAnswer:
          "If everyone worked from home, the roads would be much less crowded and the air would probably be cleaner. On the other hand, many cafés and restaurants in the city centre might lose customers, and people could feel quite isolated.",
        recordSeconds: 60,
        explanation: {
          vi: 'Kiểm tra: If + quá khứ đơn, would / might / could + V.',
          en: 'Check: If + past simple, would / might / could + verb.',
        },
      },
      {
        id: 'gr-l3-conditionals-2-3-ex12',
        type: 'write-answer',
        prompt:
          'IELTS Writing Task 2 practice: Write 2–3 sentences (40–60 words) about this idea: "What would happen if all university education were free?"',
        tipsVi: 'Câu 1: If university education were free, … would … Câu 2: thêm kết quả thứ hai (could / might). Câu 3: một hạn chế.',
        minWords: 40,
        sampleAnswer:
          'If university education were free, many more young people from poor families would be able to study. This could reduce inequality and help the economy in the long term. However, if the government paid all the fees, it might have to raise taxes or cut spending on other services.',
        explanation: {
          vi: 'Kiểm tra: dùng were / quá khứ đơn sau if, would / could / might ở vế kết quả.',
          en: 'Check: were / past simple after if; would / could / might in the result.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — CÂU BỊ ĐỘNG
   * ======================================================================== */
  {
    id: 'gr-l3-passive',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 14,
    title: { vi: 'Câu bị động', en: 'The passive voice' },
    description: {
      vi: 'Dùng bị động ở nhiều thì để nhấn vào việc được làm — đặc biệt khi tả quy trình và viết học thuật.',
      en: 'Use the passive in different tenses to focus on the action — especially for processes and academic writing.',
    },
    teachingCards: [
      {
        title: { vi: 'Cấu trúc: be + V3', en: 'Form: be + past participle' },
        body: {
          vi: 'Bị động = **be** (chia theo thì) + **V3**.\nHiện tại: is/are **made** · Quá khứ: was/were **built**\nHiện tại hoàn thành: has/have **been done**\nTương lai: will **be used** · Động từ khuyết thiếu: can / should **be recycled**\nĐang diễn ra: is/are **being repaired**',
          en: 'Passive = **be** (in the right tense) + **past participle**.\nPresent: is/are **made** · Past: was/were **built**\nPresent perfect: has/have **been done**\nFuture: will **be used** · Modal: can / should **be recycled**\nIn progress: is/are **being repaired**',
        },
        examples: [
          { en: 'Rice is grown in the Mekong Delta.', vi: 'Lúa được trồng ở đồng bằng sông Cửu Long.' },
          { en: 'The old market has been turned into a museum.', vi: 'Khu chợ cũ đã được biến thành bảo tàng.' },
          { en: 'Plastic bottles can be recycled.', vi: 'Chai nhựa có thể được tái chế.' },
        ],
      },
      {
        title: { vi: 'Khi nào dùng bị động? "by…" khi nào?', en: 'When to use it — and when to add "by…"' },
        body: {
          vi: 'Dùng bị động khi **người làm không quan trọng, không rõ, hoặc ai cũng biết**, và khi **tả quy trình**.\nChỉ thêm **by + người làm** khi thông tin đó **có ích**.\nThe bridge was opened **in 2020**. (không cần "by someone")\nThe novel was written **by a 17-year-old student**. (thông tin thú vị → giữ)',
          en: 'Use the passive when the **doer is unimportant, unknown or obvious**, and to **describe processes**.\nAdd **by + doer** only when it is **useful information**.\nThe bridge was opened **in 2020**. (no "by someone")\nThe novel was written **by a 17-year-old student**. (interesting → keep it)',
        },
        examples: [
          { en: 'First, the tea leaves are picked. Then they are dried in the sun.', vi: 'Đầu tiên, lá chè được hái. Sau đó chúng được phơi nắng.' },
          { en: 'My wallet was stolen on the bus.', vi: 'Ví của tôi bị lấy cắp trên xe buýt.' },
        ],
      },
      {
        title: { vi: 'Bị động khách quan: It is believed that…', en: 'Impersonal passive: It is believed that…' },
        body: {
          vi: 'Văn viết học thuật hay dùng **It is + V3 + that…** để nêu ý kiến chung mà không nói "ai nghĩ":\n**It is believed / thought / said / expected that…**\nIt **is widely believed that** exercise improves memory.\nGiúp bài IELTS Writing nghe **khách quan, trang trọng** hơn.',
          en: 'Academic writing often uses **It is + past participle + that…** to state a common view without saying who holds it:\n**It is believed / thought / said / expected that…**\nIt **is widely believed that** exercise improves memory.\nIt makes IELTS Writing sound more **objective and formal**.',
        },
        examples: [
          { en: 'It is expected that the population will reach ten million by 2040.', vi: 'Người ta dự đoán dân số sẽ đạt mười triệu vào năm 2040.' },
          { en: 'It is often said that travel broadens the mind.', vi: 'Người ta thường nói du lịch giúp mở mang đầu óc.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-passive-ex01',
        type: 'multiple-choice',
        question: 'Millions of smartphones ___ every year.',
        options: ['sell', 'are sold', 'are selling', 'sold'],
        correctIndex: 1,
        explanation: {
          vi: 'Điện thoại không tự bán → bị động hiện tại: are sold.',
          en: 'Phones don\'t sell themselves → present passive: are sold.',
        },
      },
      {
        id: 'gr-l3-passive-ex02',
        type: 'fill-blank',
        sentence: 'This temple ___ in the 11th century.',
        acceptedAnswers: ['was built'],
        hint: '(build)',
        explanation: {
          vi: 'Mốc quá khứ (11th century) → bị động quá khứ: was built.',
          en: 'A past time (11th century) → past passive: was built.',
        },
      },
      {
        id: 'gr-l3-passive-ex03',
        type: 'fill-blank',
        sentence: 'Since 2015, more than 200 new schools ___ in rural areas.',
        acceptedAnswers: ['have been built', 'have been opened', 'have been constructed'],
        hint: '(build)',
        explanation: {
          vi: '"Since 2015" → hiện tại hoàn thành bị động: have been built.',
          en: '"Since 2015" → present perfect passive: have been built.',
        },
      },
      {
        id: 'gr-l3-passive-ex04',
        type: 'multiple-choice',
        question: 'The new airport ___ next year.',
        options: ['will open by the government', 'will be opened', 'is opening by', 'will be open by them'],
        correctIndex: 1,
        explanation: {
          vi: 'Tương lai bị động: will be + V3; người làm không cần nói.',
          en: 'Future passive: will be + past participle; the doer isn\'t needed.',
        },
      },
      {
        id: 'gr-l3-passive-ex05',
        type: 'fill-blank',
        sentence: 'Old batteries should ___ in the normal rubbish bin.',
        acceptedAnswers: ['not be thrown', 'not be put', 'not be placed'],
        hint: '(not / throw)',
        explanation: {
          vi: 'Động từ khuyết thiếu bị động phủ định: should not be + V3.',
          en: 'Negative modal passive: should not be + past participle.',
        },
      },
      {
        id: 'gr-l3-passive-ex06',
        type: 'arrange-words',
        translationVi: 'Người ta tin rằng trà xanh tốt cho sức khoẻ.',
        correctSentence: 'It is believed that green tea is good for health.',
        extraWords: ['believes'],
        explanation: {
          vi: 'Bị động khách quan: It is believed that + mệnh đề.',
          en: 'Impersonal passive: It is believed that + clause.',
        },
      },
      {
        id: 'gr-l3-passive-ex07',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu chủ động với câu bị động tương ứng.', en: 'Match each active sentence with its passive form.' },
        pairs: [
          { left: 'They clean the streets daily.', right: 'The streets are cleaned daily.' },
          { left: 'They cleaned the streets.', right: 'The streets were cleaned.' },
          { left: 'They have cleaned the streets.', right: 'The streets have been cleaned.' },
          { left: 'They will clean the streets.', right: 'The streets will be cleaned.' },
          { left: 'They are cleaning the streets.', right: 'The streets are being cleaned.' },
        ],
        explanation: {
          vi: 'Giữ nguyên thì của "be", động từ chính đổi thành V3.',
          en: 'Keep the tense in "be" and change the main verb to the past participle.',
        },
      },
      {
        id: 'gr-l3-passive-ex08',
        type: 'true-false',
        statement: '"The letters were delivered by someone this morning." is the most natural way to say this.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"by someone" không thêm thông tin → bỏ: The letters were delivered this morning.',
          en: '"by someone" adds nothing → drop it: The letters were delivered this morning.',
        },
      },
      {
        id: 'gr-l3-passive-ex09',
        type: 'multiple-choice',
        question: 'Process: "After the coffee beans ___, they are roasted at a high temperature."',
        options: ['have picked', 'are picked', 'pick', 'picking'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả quy trình → bị động hiện tại: are picked.',
          en: 'Describing a process → present passive: are picked.',
        },
      },
      {
        id: 'gr-l3-passive-ex10',
        type: 'listen-type',
        audioText: 'The road is being repaired, so the buses are delayed.',
        acceptedAnswers: ['The road is being repaired, so the buses are delayed.', "The road's being repaired, so the buses are delayed."],
        explanation: {
          vi: '"is being repaired" = đang được sửa (bị động tiếp diễn).',
          en: '"is being repaired" = repairs are in progress (continuous passive).',
        },
      },
      {
        id: 'gr-l3-passive-ex11',
        type: 'speak-answer',
        question: 'Describe how a popular food or drink from your country is made. Use the passive.',
        tipsVi: 'Dùng First, … is/are + V3. Then … After that … Finally … Nói 4–5 bước. VD: bánh chưng, phở, cà phê phin.',
        sampleAnswer:
          'Banh chung is a traditional cake. First, the rice is washed and soaked overnight. Then the leaves are cleaned and folded into a square. After that, the rice, beans and pork are placed inside. Finally, the cakes are boiled for about ten hours.',
        recordSeconds: 60,
        explanation: {
          vi: 'Kiểm tra: is/are + V3 cho mỗi bước, từ nối First, Then, Finally.',
          en: 'Check: is/are + past participle for each step, with First, Then, Finally.',
        },
      },
      {
        id: 'gr-l3-passive-ex12',
        type: 'write-answer',
        prompt:
          'IELTS Writing Task 1 practice: Describe how household waste is recycled in 4–5 steps (50–70 words). Use the passive.',
        tipsVi:
          'Mở đầu: The diagram shows how… Mỗi bước 1 câu bị động: is collected, is taken, is sorted, is cleaned, is turned into… Dùng First / Next / After that / Finally.',
        minWords: 50,
        sampleAnswer:
          'The process shows how household waste is recycled. First, the waste is collected from homes and taken to a recycling centre. Next, it is sorted into paper, glass and plastic. After that, each material is cleaned and melted or crushed. Finally, the materials are turned into new products, which are sold in shops.',
        explanation: {
          vi: 'Kiểm tra: mỗi bước là bị động hiện tại, không cần "by".',
          en: 'Check: each step uses the present passive, no need for "by".',
        },
      },
    ],
    miniTest: [],
  },
])
