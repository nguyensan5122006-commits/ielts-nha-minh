/**
 * level-2-grammar-lessons-part2.ts — KHU "NGỮ PHÁP" · NHÓM LEVEL 2 (≈ A2 – B1) · PHẦN 2
 * ----------------------------------------------------------------------------
 * Bài ngữ pháp viết riêng cho trang /grammar (không nằm trong chặng nào của lộ trình).
 * Mỗi bài: category 'grammar', track 'general' (tính XP cho track tổng quát), mode 'practice'.
 *
 * Danh sách bài:
 *   gr-l2-gerund-infinitive  Động từ + V-ing hay + to V? (enjoy doing, decide to do, stop/remember/try)
 *   gr-l2-conditionals-0-1   Câu điều kiện loại 0 & loại 1 (+ unless, dấu phẩy, không "will" sau if)
 *   gr-l2-articles           Mạo từ nâng cao: nói chung (không mạo từ) hay nói cụ thể (the)
 *   gr-l2-questions          Câu hỏi có trợ động từ, câu hỏi chủ ngữ, câu hỏi gián tiếp lịch sự
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ lý thuyết song ngữ, có ví dụ
 *   - exercises     : 11–12 bài (chọn, điền, sắp xếp, nối, đúng/sai, nghe, nói)
 *   - miniTest      : [] (kiểm tra nằm ở trang Ngữ pháp / lộ trình)
 *
 * Quy ước id: bài "gr-l2-<tên>", bài tập "gr-l2-<tên>-ex<số>".
 * Nội dung tự soạn 100% — không chép sách ngữ pháp nào.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level2GrammarLessonsPart2: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — ĐỘNG TỪ + V-ING HAY + TO V?
   * ======================================================================== */
  {
    id: 'gr-l2-gerund-infinitive',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Động từ + V-ing hay + to V?', en: 'Verb + -ing or to-infinitive?' },
    description: {
      vi: 'Nhớ nhóm động từ đi với V-ing, nhóm đi với to V, và vài động từ đổi nghĩa.',
      en: 'Learn which verbs take -ing, which take to + verb, and which change meaning.',
    },
    teachingCards: [
      {
        title: { vi: 'Nhóm + V-ing và nhóm + to V', en: 'The -ing group and the to group' },
        body: {
          vi: '**+ V-ing:** enjoy, avoid, finish, mind, suggest, keep.\n**+ to V:** want, decide, hope, plan, agree, refuse, afford.\nMẹo: nhóm **to V** thường hướng về **tương lai** (muốn, định, hy vọng làm gì).\nSau **giới từ** (in, at, about, of, before, after) luôn dùng **V-ing**: interested **in learning**.',
          en: '**+ -ing:** enjoy, avoid, finish, mind, suggest, keep.\n**+ to + verb:** want, decide, hope, plan, agree, refuse, afford.\nTip: the **to** group often looks to the **future** (want, plan, hope).\nAfter a **preposition** (in, at, about, of, before, after) always use **-ing**: interested **in learning**.',
        },
        examples: [
          { en: 'My grandparents enjoy walking in the park every morning.', vi: 'Ông bà tôi thích đi bộ trong công viên mỗi sáng.' },
          { en: 'We decided to recycle more plastic at home.', vi: 'Chúng tôi quyết định tái chế nhiều nhựa hơn ở nhà.' },
          { en: 'She is good at solving maths problems.', vi: 'Cô ấy giỏi giải các bài toán.' },
        ],
      },
      {
        title: { vi: 'Dùng cả hai, nghĩa gần như nhau', en: 'Both forms, almost the same meaning' },
        body: {
          vi: '**like, love, hate, start, begin** đi được với **cả V-ing lẫn to V**, nghĩa gần như không đổi.\nNhưng **would like / would love** luôn + **to V**: I\'d like **to book** a table.',
          en: '**like, love, hate, start, begin** can take **-ing or to + verb** with little change in meaning.\nBut **would like / would love** always take **to + verb**: I\'d like **to book** a table.',
        },
        examples: [
          { en: 'It started raining / It started to rain after lunch.', vi: 'Trời bắt đầu mưa sau bữa trưa.' },
          { en: "I'd love to study abroad one day.", vi: 'Tôi rất muốn một ngày nào đó được du học.' },
        ],
      },
      {
        title: { vi: 'Đổi nghĩa: stop, remember, try', en: 'Meaning changes: stop, remember, try' },
        body: {
          vi: '**stop doing** = bỏ hẳn việc đó · **stop to do** = dừng lại để làm việc khác.\n**remember doing** = nhớ là đã làm (quá khứ) · **remember to do** = nhớ để làm (việc sắp làm).\n**try doing** = thử xem có hiệu quả · **try to do** = cố gắng làm (việc khó).',
          en: '**stop doing** = quit the activity · **stop to do** = pause in order to do something else.\n**remember doing** = recall a past action · **remember to do** = not forget a future task.\n**try doing** = experiment · **try to do** = make an effort (it is hard).',
        },
        examples: [
          { en: 'My uncle stopped smoking last year.', vi: 'Chú tôi đã bỏ thuốc lá năm ngoái.' },
          { en: 'On the way home, we stopped to buy some fruit.', vi: 'Trên đường về, chúng tôi dừng lại để mua ít trái cây.' },
          { en: 'Please remember to turn off the lights.', vi: 'Nhớ tắt đèn nhé.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-gerund-infinitive-ex01',
        type: 'multiple-choice',
        question: 'Many students avoid ___ questions in class because they feel shy.',
        options: ['to ask', 'asking', 'ask', 'asked'],
        correctIndex: 1,
        explanation: {
          vi: '"avoid" luôn đi với V-ing → avoid asking.',
          en: '"avoid" is always followed by -ing → avoid asking.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex02',
        type: 'fill-blank',
        sentence: 'My parents can\'t afford ___ a new car this year.',
        acceptedAnswers: ['to buy'],
        hint: '(buy)',
        explanation: {
          vi: '"afford" đi với to V → can\'t afford to buy.',
          en: '"afford" takes to + verb → can\'t afford to buy.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex03',
        type: 'fill-blank',
        sentence: 'Have you finished ___ your report yet?',
        acceptedAnswers: ['writing'],
        hint: '(write)',
        explanation: {
          vi: '"finish" đi với V-ing → finished writing.',
          en: '"finish" takes -ing → finished writing.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng theo sau đúng.', en: 'Match each beginning with the correct ending.' },
        pairs: [
          { left: 'I enjoy', right: 'cooking for my family.' },
          { left: 'They refused', right: 'to pay the extra fee.' },
          { left: 'She is thinking of', right: 'changing her job.' },
          { left: 'We hope', right: 'to see you again soon!' },
          { left: 'Would you mind', right: 'opening the window?' },
        ],
        explanation: {
          vi: 'enjoy, mind, giới từ (of) + V-ing; refuse, hope + to V.',
          en: 'enjoy, mind and prepositions (of) take -ing; refuse and hope take to + verb.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex05',
        type: 'arrange-words',
        translationVi: 'Bác sĩ khuyên nên đi bộ nhiều hơn.',
        correctSentence: 'The doctor suggested walking more.',
        extraWords: ['to'],
        explanation: {
          vi: '"suggest" đi với V-ing, không dùng "suggest to walk".',
          en: '"suggest" takes -ing; "suggest to walk" is wrong.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex06',
        type: 'multiple-choice',
        question: 'Choose the best meaning: "I stopped to check my phone."',
        options: [
          'I never use my phone now.',
          'I paused what I was doing so I could check my phone.',
          'I forgot to check my phone.',
          'I checked my phone all day.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"stop to do" = dừng việc đang làm để làm việc khác.',
          en: '"stop to do" = pause one activity in order to do another.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex07',
        type: 'true-false',
        statement: '"I remember visiting this museum when I was seven." is correct and talks about a past memory.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: '"remember doing" = nhớ lại việc đã làm trong quá khứ.',
          en: '"remember doing" = recall something you did in the past.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex08',
        type: 'true-false',
        statement: '"We plan going to the beach next weekend." is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"plan" đi với to V → We plan to go to the beach.',
          en: '"plan" takes to + verb → We plan to go to the beach.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex09',
        type: 'multiple-choice',
        question: "I can't sleep. — ___ drinking a glass of warm milk before bed.",
        options: ['Try', 'Stop', 'Refuse', 'Afford'],
        correctIndex: 0,
        explanation: {
          vi: '"try doing" = thử một cách xem có hiệu quả không.',
          en: '"try doing" = experiment with something to see if it works.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex10',
        type: 'listen-choose',
        audioText: 'After finishing university, my cousin decided to work abroad for a few years.',
        question: 'What did the cousin decide?',
        options: ['To study more', 'To work in another country', 'To stop working', 'To finish university early'],
        correctIndex: 1,
        explanation: {
          vi: '"decided to work abroad" = quyết định làm việc ở nước ngoài.',
          en: '"decided to work abroad" = chose to work in another country.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex11',
        type: 'speak-sentence',
        sentence: 'I enjoy reading, but I want to read more English books.',
        translationVi: 'Tôi thích đọc sách, nhưng tôi muốn đọc nhiều sách tiếng Anh hơn.',
        explanation: {
          vi: 'enjoy + V-ing, want + to V. Đọc rõ âm cuối /ŋ/ của "reading".',
          en: 'enjoy + -ing, want + to + verb. Say the final /ŋ/ in "reading" clearly.',
        },
      },
      {
        id: 'gr-l2-gerund-infinitive-ex12',
        type: 'speak-answer',
        question: 'What do you enjoy doing in your free time, and what do you hope to try in the future?',
        tipsVi: 'Câu 1: I enjoy + V-ing … because … Câu 2: I hope / I\'d like + to V … Nói 2–3 câu.',
        sampleAnswer:
          "I really enjoy playing badminton with my friends because it keeps me fit. In the future, I hope to try rock climbing, but I need to find a good teacher first.",
        recordSeconds: 45,
        explanation: {
          vi: 'Kiểm tra: enjoy + V-ing, hope / would like + to V.',
          en: 'Check: enjoy + -ing, hope / would like + to + verb.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — CÂU ĐIỀU KIỆN LOẠI 0 & LOẠI 1
   * ======================================================================== */
  {
    id: 'gr-l2-conditionals-0-1',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Câu điều kiện loại 0 & loại 1', en: 'Zero & first conditionals' },
    description: {
      vi: 'Nói sự thật luôn đúng và khả năng có thật trong tương lai bằng câu "If…".',
      en: 'Use "If…" sentences for general truths and real future possibilities.',
    },
    teachingCards: [
      {
        title: { vi: 'Loại 0: sự thật, luôn luôn như vậy', en: 'Zero conditional: always true' },
        body: {
          vi: '**If + hiện tại đơn, hiện tại đơn.**\nDùng cho **sự thật, quy luật** — lần nào cũng vậy. Có thể thay **if** bằng **when**.\nVD: If you heat ice, it **melts**.',
          en: '**If + present simple, present simple.**\nUse it for **facts and rules** that are true every time. You can replace **if** with **when**.\nE.g. If you heat ice, it **melts**.',
        },
        examples: [
          { en: 'If plants don\'t get water, they die.', vi: 'Nếu cây không có nước, chúng sẽ chết.' },
          { en: 'When I drink coffee at night, I can\'t sleep.', vi: 'Hễ tôi uống cà phê buổi tối là tôi không ngủ được.' },
        ],
      },
      {
        title: { vi: 'Loại 1: khả năng có thật ở tương lai', en: 'First conditional: a real future possibility' },
        body: {
          vi: '**If + hiện tại đơn, will + V.**\nDùng cho việc **có thể xảy ra** và kết quả của nó.\n**Không dùng will sau if**: "If it will rain" → If it **rains**.\nVế kết quả có thể dùng **can, may, should** hoặc câu mệnh lệnh.',
          en: '**If + present simple, will + verb.**\nUse it for something that **may really happen** and its result.\n**No will after if**: "If it will rain" → If it **rains**.\nThe result can also use **can, may, should** or an imperative.',
        },
        examples: [
          { en: 'If the bus is late, I will take a taxi.', vi: 'Nếu xe buýt đến muộn, tôi sẽ đi taxi.' },
          { en: 'If you feel tired, take a short break.', vi: 'Nếu bạn thấy mệt, hãy nghỉ một chút.' },
        ],
      },
      {
        title: { vi: 'Unless và dấu phẩy', en: 'Unless and the comma' },
        body: {
          vi: '**unless = if … not** (trừ khi).\nUnless you hurry, you\'ll miss the train = If you **don\'t** hurry, you\'ll miss the train.\n**Dấu phẩy:** vế **if đứng đầu** → có phẩy. Vế if **đứng sau** → không cần phẩy.',
          en: '**unless = if … not**.\nUnless you hurry, you\'ll miss the train = If you **don\'t** hurry, you\'ll miss the train.\n**Comma:** **if-clause first** → use a comma. If-clause **second** → no comma.',
        },
        examples: [
          { en: "We won't finish the project unless everyone helps.", vi: 'Chúng ta sẽ không xong dự án trừ khi mọi người cùng giúp.' },
          { en: "If prices go up, fewer people will travel. / Fewer people will travel if prices go up.", vi: 'Nếu giá tăng, sẽ ít người đi du lịch hơn.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-conditionals-0-1-ex01',
        type: 'multiple-choice',
        question: 'If you mix blue and yellow, you ___ green.',
        options: ['will got', 'get', 'got', 'getting'],
        correctIndex: 1,
        explanation: {
          vi: 'Sự thật luôn đúng → loại 0: hiện tại đơn ở cả hai vế.',
          en: 'A fact that is always true → zero conditional: present simple in both parts.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex02',
        type: 'fill-blank',
        sentence: 'If it ___ tomorrow, we will move the class party indoors.',
        acceptedAnswers: ['rains'],
        hint: '(rain)',
        explanation: {
          vi: 'Sau "if" dùng hiện tại đơn, không dùng will → rains.',
          en: 'After "if" use the present simple, not will → rains.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex03',
        type: 'fill-blank',
        sentence: 'If you study a little every day, your English ___ quickly.',
        acceptedAnswers: ['will improve', "'ll improve"],
        hint: '(improve)',
        explanation: {
          vi: 'Kết quả có thể xảy ra trong tương lai → will improve.',
          en: 'A likely future result → will improve.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'If the city will build more parks, people will be happier.',
          'If the city builds more parks, people will be happier.',
          'If the city builds more parks, people are happier tomorrow.',
          'If the city build more parks, people will be happier.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'If + hiện tại đơn (builds, có -s), will + V.',
          en: 'If + present simple (builds, with -s), will + verb.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối vế "if" với kết quả hợp lý.', en: 'Match each if-clause with a logical result.' },
        pairs: [
          { left: 'If you press this button,', right: 'the machine starts.' },
          { left: 'If I pass the exam,', right: 'my parents will be proud.' },
          { left: 'If you don\'t water the plants,', right: 'they die.' },
          { left: 'If we leave now,', right: "we'll catch the last bus." },
        ],
        explanation: {
          vi: 'Quy luật dùng hiện tại; việc có thể xảy ra dùng will.',
          en: 'Rules use the present; possible future results use will.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex06',
        type: 'multiple-choice',
        question: '"Unless you book early, you won\'t get a cheap ticket." This means:',
        options: [
          'If you book early, you won\'t get a cheap ticket.',
          'If you don\'t book early, you won\'t get a cheap ticket.',
          'You will get a cheap ticket anyway.',
          'Booking early is not important.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'unless = if … not → If you don\'t book early.',
          en: 'unless = if … not → If you don\'t book early.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex07',
        type: 'fill-blank',
        sentence: 'You won\'t lose weight ___ you eat less sugar.',
        acceptedAnswers: ['unless'],
        hint: '(= if … not)',
        explanation: {
          vi: '"unless" = trừ khi / nếu không: sẽ không giảm cân nếu không ăn ít đường.',
          en: '"unless" = if not: you won\'t lose weight if you don\'t eat less sugar.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex08',
        type: 'arrange-words',
        translationVi: 'Nếu bạn cần giúp đỡ, tôi sẽ gọi cho bạn.',
        correctSentence: 'If you need help, I will call you.',
        extraWords: ['needs'],
        explanation: {
          vi: 'Vế if đứng đầu → có dấu phẩy; you + need (không -s).',
          en: 'If-clause first → comma; you + need (no -s).',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex09',
        type: 'true-false',
        statement: '"People will use public transport more if tickets are cheaper." is correct without a comma.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Vế if đứng sau thì không cần dấu phẩy.',
          en: 'When the if-clause comes second, no comma is needed.',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex10',
        type: 'listen-type',
        audioText: 'If the weather is good, we will go hiking on Sunday.',
        acceptedAnswers: [
          'If the weather is good, we will go hiking on Sunday.',
          "If the weather is good, we'll go hiking on Sunday.",
        ],
        explanation: {
          vi: 'Loại 1: If + is (hiện tại), will go (tương lai).',
          en: 'First conditional: If + is (present), will go (future).',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex11',
        type: 'speak-sentence',
        sentence: "If I save enough money, I'll travel to Japan next year.",
        translationVi: 'Nếu tôi tiết kiệm đủ tiền, tôi sẽ đi Nhật vào năm sau.',
        explanation: {
          vi: 'Nói "I\'ll" gọn thành /aɪl/; nhớ âm /v/ trong "save".',
          en: 'Say "I\'ll" as one sound /aɪl/; pronounce the /v/ in "save".',
        },
      },
      {
        id: 'gr-l2-conditionals-0-1-ex12',
        type: 'speak-answer',
        question: 'What will you do this weekend if the weather is bad?',
        tipsVi: 'Bắt đầu: If the weather is bad, I\'ll … Thêm 1 câu "If it\'s sunny, I\'ll …" để so sánh.',
        sampleAnswer:
          "If the weather is bad, I'll probably stay at home and watch a film with my family. But if it's sunny, I'll go to the lake with my friends.",
        recordSeconds: 40,
        explanation: {
          vi: 'Kiểm tra: If + hiện tại đơn, will + V ở vế kết quả.',
          en: 'Check: If + present simple, will + verb in the result.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — MẠO TỪ NÂNG CAO: THE HAY KHÔNG CÓ MẠO TỪ?
   * ======================================================================== */
  {
    id: 'gr-l2-articles',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Mạo từ nâng cao: the hay không có mạo từ?', en: 'Articles in depth: the or no article?' },
    description: {
      vi: 'Biết khi nào nói chung chung (không mạo từ) và khi nào nói cụ thể (the) — lỗi rất hay gặp trong bài viết.',
      en: 'Know when to speak in general (no article) and when to be specific (the) — a very common writing error.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói chung chung: không dùng mạo từ', en: 'Talking in general: no article' },
        body: {
          vi: 'Nói về **một loại nói chung** → dùng **danh từ số nhiều** hoặc **không đếm được**, **không có the**.\n**Children** need sleep. **Technology** is changing **education**.\nLỗi hay gặp: "The people" like shopping online → **People** like shopping online.',
          en: 'For **a whole group in general** → use a **plural** or **uncountable noun** with **no the**.\n**Children** need sleep. **Technology** is changing **education**.\nCommon error: "The people" like shopping online → **People** like shopping online.',
        },
        examples: [
          { en: 'Exercise is good for mental health.', vi: 'Tập thể dục tốt cho sức khoẻ tinh thần.' },
          { en: 'Many teenagers spend too much time on social media.', vi: 'Nhiều thanh thiếu niên dành quá nhiều thời gian cho mạng xã hội.' },
        ],
      },
      {
        title: { vi: 'Nói cụ thể: dùng the', en: 'Being specific: use the' },
        body: {
          vi: 'Dùng **the** khi người nghe **biết đó là cái nào**:\n• đã nhắc trước đó, hoặc có phần giải thích phía sau: **the children in my class**\n• **duy nhất**: the sun, the internet, **the environment**, the government\n• **so sánh nhất**: the best, the most important\n**Society** thì thường **không** có the.',
          en: 'Use **the** when the listener **knows which one**:\n• mentioned before or defined after: **the children in my class**\n• **unique**: the sun, the internet, **the environment**, the government\n• **superlatives**: the best, the most important\n**Society** usually takes **no** article.',
        },
        examples: [
          { en: 'The children in my neighbourhood play football every evening.', vi: 'Bọn trẻ trong khu tôi chơi bóng mỗi tối.' },
          { en: 'We must protect the environment for future generations.', vi: 'Chúng ta phải bảo vệ môi trường cho các thế hệ sau.' },
          { en: 'Society has changed a lot since the internet appeared.', vi: 'Xã hội đã thay đổi nhiều kể từ khi có internet.' },
        ],
      },
      {
        title: { vi: 'A / an: một trong nhiều, và nghề nghiệp', en: 'A / an: one of many, and jobs' },
        body: {
          vi: 'Dùng **a/an** với danh từ **đếm được số ít**, khi nói **một cái bất kỳ** hoặc nhắc **lần đầu**.\nNói nghề nghiệp **luôn có a/an**: She is **an engineer**. (Không nói "She is engineer".)\nLần đầu: **a** new café → lần sau: **the** café.',
          en: 'Use **a/an** with **singular countable** nouns for **any one** or a **first mention**.\nJobs **always** take a/an: She is **an engineer**. (Not "She is engineer".)\nFirst time: **a** new café → next time: **the** café.',
        },
        examples: [
          { en: 'My brother is a nurse at a big hospital.', vi: 'Anh tôi là y tá ở một bệnh viện lớn.' },
          { en: 'A new café opened near my office. The café is always busy.', vi: 'Một quán cà phê mới mở gần văn phòng tôi. Quán đó lúc nào cũng đông.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-articles-ex01',
        type: 'multiple-choice',
        question: '___ is one of the biggest problems in large cities.',
        options: ['The pollution', 'A pollution', 'Pollution', 'Pollutions'],
        correctIndex: 2,
        explanation: {
          vi: 'Nói chung chung về ô nhiễm (không đếm được) → không mạo từ.',
          en: 'Pollution in general (uncountable) → no article.',
        },
      },
      {
        id: 'gr-l2-articles-ex02',
        type: 'multiple-choice',
        question: 'Governments should do more to protect ___.',
        options: ['environment', 'the environment', 'an environment', 'environments'],
        correctIndex: 1,
        explanation: {
          vi: '"the environment" (môi trường tự nhiên) là cụm cố định, luôn có the.',
          en: '"the environment" (the natural world) is fixed and always takes the.',
        },
      },
      {
        id: 'gr-l2-articles-ex03',
        type: 'fill-blank',
        sentence: 'My aunt is ___ architect, and she designs schools.',
        acceptedAnswers: ['an'],
        hint: '(a / an / the)',
        explanation: {
          vi: 'Nghề nghiệp cần a/an; "architect" bắt đầu bằng nguyên âm → an.',
          en: 'Jobs need a/an; "architect" starts with a vowel sound → an.',
        },
      },
      {
        id: 'gr-l2-articles-ex04',
        type: 'fill-blank',
        sentence: 'This is ___ most useful app I have ever downloaded.',
        acceptedAnswers: ['the'],
        hint: '(a / an / the)',
        explanation: {
          vi: 'So sánh nhất (most useful) luôn đi với the.',
          en: 'Superlatives (most useful) always take the.',
        },
      },
      {
        id: 'gr-l2-articles-ex05',
        type: 'true-false',
        statement: '"The people today are busier than in the past." is the best way to talk about people in general.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Nói chung về con người → "People today are busier…", bỏ the.',
          en: 'People in general → "People today are busier…", without the.',
        },
      },
      {
        id: 'gr-l2-articles-ex06',
        type: 'multiple-choice',
        question: 'Which sentence talks about SPECIFIC students?',
        options: [
          'Students need enough sleep.',
          'The students in Room 5 are preparing a presentation.',
          'Students often feel stressed before exams.',
          'Good students ask questions.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"in Room 5" chỉ rõ nhóm học sinh nào → dùng the.',
          en: '"in Room 5" says exactly which students → the.',
        },
      },
      {
        id: 'gr-l2-articles-ex07',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi cụm với lý do dùng (hoặc không dùng) mạo từ.', en: 'Match each phrase with the reason for its article.' },
        pairs: [
          { left: 'the internet', right: 'only one exists' },
          { left: 'Children love games.', right: 'general statement' },
          { left: 'a doctor', right: 'a job' },
          { left: 'the tallest building', right: 'superlative' },
          { left: 'the book I lent you', right: 'defined by the words after it' },
        ],
        explanation: {
          vi: 'the: duy nhất, so sánh nhất, được xác định; a: nghề; không mạo từ: nói chung.',
          en: 'the: unique, superlative, defined; a: jobs; no article: general.',
        },
      },
      {
        id: 'gr-l2-articles-ex08',
        type: 'fill-blank',
        sentence: 'I bought a new laptop last week, but ___ laptop is already slow.',
        acceptedAnswers: ['the'],
        hint: '(a / the)',
        explanation: {
          vi: 'Laptop đã được nhắc ở trước → lần hai dùng the.',
          en: 'The laptop was already mentioned → use the the second time.',
        },
      },
      {
        id: 'gr-l2-articles-ex09',
        type: 'arrange-words',
        translationVi: 'Công nghệ đang thay đổi cách chúng ta học.',
        correctSentence: 'Technology is changing the way we learn.',
        extraWords: ['The'],
        explanation: {
          vi: '"Technology" nói chung → không mạo từ; "the way we learn" được xác định → the.',
          en: '"Technology" in general → no article; "the way we learn" is defined → the.',
        },
      },
      {
        id: 'gr-l2-articles-ex10',
        type: 'listen-choose',
        audioText: 'Society depends on the internet more than ever, so cyber safety is becoming important for everyone.',
        question: 'Which noun has NO article in the sentence you heard?',
        options: ['internet', 'society', 'Both have "the"', 'Neither has an article'],
        correctIndex: 1,
        explanation: {
          vi: '"Society" không có mạo từ; "the internet" luôn có the.',
          en: '"Society" has no article; "the internet" always takes the.',
        },
      },
      {
        id: 'gr-l2-articles-ex11',
        type: 'speak-sentence',
        sentence: 'Children should spend more time outdoors and less time on the internet.',
        translationVi: 'Trẻ em nên dành nhiều thời gian ngoài trời hơn và ít thời gian trên internet hơn.',
        explanation: {
          vi: '"Children" nói chung → không the. Nói "the" trước nguyên âm "internet" là /ði/.',
          en: '"Children" in general → no the. Before a vowel, say "the" as /ði/.',
        },
      },
      {
        id: 'gr-l2-articles-ex12',
        type: 'speak-answer',
        question: 'Do you think technology is good for children? Why or why not?',
        tipsVi: 'Nói chung → "Technology", "Children" (không the). Nhắc cụ thể → "the children in my family". Nói 2–3 câu.',
        sampleAnswer:
          'I think technology is mostly good for children because they can learn a lot online. However, the children in my family sometimes play games for too long, so parents should set clear rules.',
        recordSeconds: 45,
        explanation: {
          vi: 'Kiểm tra: danh từ nói chung không có the; nhóm cụ thể có the.',
          en: 'Check: general nouns without the; specific groups with the.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — CÂU HỎI CHỦ NGỮ & CÂU HỎI GIÁN TIẾP
   * ======================================================================== */
  {
    id: 'gr-l2-questions',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Câu hỏi chủ ngữ & câu hỏi gián tiếp', en: 'Subject questions & indirect questions' },
    description: {
      vi: 'Đặt câu hỏi đúng trật tự: khi nào cần do/does/did, khi nào không, và cách hỏi lịch sự.',
      en: 'Build questions in the right order: when you need do/does/did, when you don\'t, and how to ask politely.',
    },
    teachingCards: [
      {
        title: { vi: 'Trợ động từ do / does / did', en: 'The helpers do / does / did' },
        body: {
          vi: 'Câu hỏi với động từ thường cần **trợ động từ**:\n**(Wh-) + do/does/did + chủ ngữ + V nguyên mẫu?**\nWhere **does** your brother **work**? (không "works")\nWhat **did** you **eat**? (không "ate")\nVới **be, can, will, have (hoàn thành)** thì **đảo** lên trước: Where **is** he? **Can** you swim?',
          en: 'Questions with ordinary verbs need a **helper**:\n**(Wh-) + do/does/did + subject + base verb?**\nWhere **does** your brother **work**? (not "works")\nWhat **did** you **eat**? (not "ate")\nWith **be, can, will, have (perfect)**, just **move it** first: Where **is** he? **Can** you swim?',
        },
        examples: [
          { en: 'How often do you go to the gym?', vi: 'Bạn đi tập gym bao lâu một lần?' },
          { en: 'Why did your family move to Da Lat?', vi: 'Vì sao gia đình bạn chuyển đến Đà Lạt?' },
        ],
      },
      {
        title: { vi: 'Câu hỏi chủ ngữ: không cần do', en: 'Subject questions: no do' },
        body: {
          vi: 'Khi **Who / What** là **chủ ngữ** (người/vật **làm** hành động) → **không dùng do/does/did**, động từ giữ nguyên dạng câu khẳng định.\n**Who called you?** (Ai gọi bạn? — ai đó gọi)\n**Who did you call?** (Bạn gọi ai? — bạn gọi)\n**What happened?** (không "What did happen?")',
          en: 'When **Who / What** is the **subject** (the one **doing** the action) → **no do/does/did**; the verb stays as in a statement.\n**Who called you?** (someone called)\n**Who did you call?** (you called someone)\n**What happened?** (not "What did happen?")',
        },
        examples: [
          { en: 'Who teaches you English?', vi: 'Ai dạy bạn tiếng Anh?' },
          { en: 'What caused the traffic jam this morning?', vi: 'Cái gì gây ra vụ tắc đường sáng nay?' },
        ],
      },
      {
        title: { vi: 'Câu hỏi gián tiếp lịch sự', en: 'Polite indirect questions' },
        body: {
          vi: 'Bắt đầu bằng **Could you tell me… / Do you know…** → phần sau theo **trật tự câu khẳng định** (chủ ngữ + động từ), **không** do/does/did.\nWhere **is the station**? → Could you tell me where **the station is**?\nCâu hỏi Yes/No → thêm **if**: Do you know **if** the shop is open?',
          en: 'Start with **Could you tell me… / Do you know…** → the rest uses **statement order** (subject + verb), **no** do/does/did.\nWhere **is the station**? → Could you tell me where **the station is**?\nYes/No questions → add **if**: Do you know **if** the shop is open?',
        },
        examples: [
          { en: 'Could you tell me what time the museum closes?', vi: 'Bạn có thể cho tôi biết mấy giờ bảo tàng đóng cửa không?' },
          { en: 'Do you know if the library has free Wi-Fi?', vi: 'Bạn có biết thư viện có Wi-Fi miễn phí không?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-questions-ex01',
        type: 'multiple-choice',
        question: 'Where ___ your sister study?',
        options: ['do', 'does', 'is', 'did she'],
        correctIndex: 1,
        explanation: {
          vi: 'Chủ ngữ "your sister" (số ít), động từ thường → does.',
          en: '"your sister" is singular with an ordinary verb → does.',
        },
      },
      {
        id: 'gr-l2-questions-ex02',
        type: 'fill-blank',
        sentence: 'What time ___ you get home yesterday?',
        acceptedAnswers: ['did'],
        hint: '(do / does / did)',
        explanation: {
          vi: '"yesterday" → quá khứ → did + V nguyên mẫu (get).',
          en: '"yesterday" → past → did + base verb (get).',
        },
      },
      {
        id: 'gr-l2-questions-ex03',
        type: 'multiple-choice',
        question: 'Which question is correct?',
        options: ['What did happen at the meeting?', 'What happened at the meeting?', 'What was happen at the meeting?', 'What does happened at the meeting?'],
        correctIndex: 1,
        explanation: {
          vi: '"What" là chủ ngữ → không dùng did: What happened?',
          en: '"What" is the subject → no did: What happened?',
        },
      },
      {
        id: 'gr-l2-questions-ex04',
        type: 'multiple-choice',
        question: 'Your friend says: "Minh helped me with my homework." You want to know the helper. Ask:',
        options: ['Who did help you?', 'Who did you help?', 'Who helped you?', 'Who you helped?'],
        correctIndex: 2,
        explanation: {
          vi: 'Hỏi người làm hành động (chủ ngữ) → Who helped you? không có did.',
          en: 'Asking about the doer (subject) → Who helped you? with no did.',
        },
      },
      {
        id: 'gr-l2-questions-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi với câu trả lời phù hợp.', en: 'Match each question with its answer.' },
        pairs: [
          { left: 'Who called you?', right: 'My manager called me.' },
          { left: 'Who did you call?', right: 'I called my manager.' },
          { left: 'What broke the window?', right: 'A football broke it.' },
          { left: 'What did you break?', right: 'I broke a glass.' },
        ],
        explanation: {
          vi: 'Không có did → hỏi chủ ngữ; có did → hỏi tân ngữ.',
          en: 'No did → asking about the subject; with did → asking about the object.',
        },
      },
      {
        id: 'gr-l2-questions-ex06',
        type: 'arrange-words',
        translationVi: 'Bạn có thể cho tôi biết trạm xe buýt ở đâu không?',
        correctSentence: 'Could you tell me where the bus stop is?',
        extraWords: ['does'],
        explanation: {
          vi: 'Câu hỏi gián tiếp: chủ ngữ (the bus stop) đứng trước động từ (is).',
          en: 'Indirect question: subject (the bus stop) before the verb (is).',
        },
      },
      {
        id: 'gr-l2-questions-ex07',
        type: 'true-false',
        statement: '"Do you know where does the teacher live?" is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Câu gián tiếp bỏ does: Do you know where the teacher lives?',
          en: 'Indirect questions drop does: Do you know where the teacher lives?',
        },
      },
      {
        id: 'gr-l2-questions-ex08',
        type: 'fill-blank',
        sentence: 'Do you know ___ the pharmacy is open on Sundays?',
        acceptedAnswers: ['if', 'whether'],
        hint: '(Yes/No question)',
        explanation: {
          vi: 'Câu hỏi Yes/No gián tiếp → thêm if (hoặc whether).',
          en: 'Indirect Yes/No questions need if (or whether).',
        },
      },
      {
        id: 'gr-l2-questions-ex09',
        type: 'multiple-choice',
        question: 'Choose the most polite and correct question to a stranger:',
        options: [
          'Where is the hospital?',
          'Could you tell me where the hospital is?',
          'Could you tell me where is the hospital?',
          'Tell me where the hospital.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Lịch sự nhất và đúng trật tự: … where the hospital is?',
          en: 'Most polite with correct order: … where the hospital is?',
        },
      },
      {
        id: 'gr-l2-questions-ex10',
        type: 'listen-choose',
        audioText: 'Excuse me, could you tell me how much a ticket to the city centre costs?',
        question: 'What does the speaker want to know?',
        options: ['The time of the train', 'The price of a ticket', 'Where the city centre is', 'How long the trip takes'],
        correctIndex: 1,
        explanation: {
          vi: '"how much a ticket… costs" = hỏi giá vé.',
          en: '"how much a ticket… costs" = asking the price.',
        },
      },
      {
        id: 'gr-l2-questions-ex11',
        type: 'speak-sentence',
        sentence: 'Could you tell me what time the next train leaves?',
        translationVi: 'Bạn có thể cho tôi biết chuyến tàu tiếp theo khởi hành lúc mấy giờ không?',
        explanation: {
          vi: 'Trật tự câu khẳng định: the next train leaves. Đọc rõ âm /z/ cuối "leaves".',
          en: 'Statement order: the next train leaves. Say the final /z/ in "leaves".',
        },
      },
      {
        id: 'gr-l2-questions-ex12',
        type: 'speak-answer',
        question: 'Imagine you are new in a town. Ask a local person two polite questions about places you need.',
        tipsVi: 'Dùng "Could you tell me where … is?" và "Do you know if …?". Nhớ: chủ ngữ trước động từ, không does/did.',
        sampleAnswer:
          'Excuse me, could you tell me where the nearest post office is? And do you know if there is a good bookshop near here?',
        recordSeconds: 30,
        explanation: {
          vi: 'Kiểm tra: câu gián tiếp theo trật tự khẳng định, Yes/No dùng if.',
          en: 'Check: indirect questions use statement order; Yes/No uses if.',
        },
      },
    ],
    miniTest: [],
  },
]
