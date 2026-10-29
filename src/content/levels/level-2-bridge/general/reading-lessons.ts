/**
 * reading-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "CẦU NỐI" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK TỔNG QUÁT (general)
 * KỸ NĂNG ĐỌC (mode 'reading')
 *
 * Cấu trúc 1 bài đọc v3:
 *   teachingCards (chiến thuật đọc) → exercises (khởi động: từ vựng, mẹo, nói)
 *   → readingTask: 1 bài đọc 200–300 từ chia đoạn A, B, C...; mỗi câu hỏi có paragraphLabel
 *     (đáp án nằm ở đoạn nào) để giao diện tô sáng khi xem giải thích.
 * Track tổng quát không bấm giờ (không đặt examMinutes) — học để hiểu, không áp lực thi.
 *
 * File này chứa 4 bài (mỗi chặng 1 bài):
 *   1. l2b-g-01-read : Blog du lịch "Chuyến đi nước ngoài đầu tiên" — đọc quét, bẫy "nearly"
 *   2. l2b-g-02-read : Bài viết "Small talk ở chỗ làm" — chọn tiêu đề đoạn (matching headings)
 *   3. l2b-g-03-read : "Hai ngôi trường" — học sinh Việt Nam so sánh trường mình với trường ở Anh
 *                      (so sánh hơn / nhất, not as ... as)
 *   4. l2b-g-04-read : Bản tin ngắn "Học sinh biến xe buýt cũ thành thư viện" — đọc tiêu đề tin, 5W
 *
 * Mọi bài đọc đều tự viết, tên người và tên tổ chức là tên tự đặt.
 * Quy ước id: bài "l2b-g-<chặng>-read", câu hỏi "...-q<số>", bài tập "...-ex<số>".
 * Kiểu dữ liệu xem ở: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

export const level2BridgeGeneralReadingLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — ĐỌC: BLOG CHUYẾN ĐI NƯỚC NGOÀI ĐẦU TIÊN
   * Kỹ năng: đọc câu hỏi trước, gạch từ khoá, đọc quét; bẫy "nearly / almost".
   * ======================================================================== */
  {
    id: 'l2b-g-01-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: 'Đọc: blog về chuyến đi nước ngoài đầu tiên', en: 'Reading: a blog about a first trip abroad' },
    description: {
      vi: 'Đọc một bài blog kể những bài học từ chuyến đi nước ngoài đầu tiên và tìm thông tin chi tiết.',
      en: 'Read a blog post about the lessons from a first trip abroad and find the details.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc câu hỏi trước, gạch từ khoá', en: 'Read the questions first' },
        body: {
          vi: "Đừng đọc cả bài ngay. Hãy:\n1. Đọc **câu hỏi**, gạch **từ khoá** (tên, con số, nơi chốn).\n2. **Lướt** bài tìm từ khoá đó (hoặc từ cùng nghĩa).\n3. Đọc **kỹ 2–3 câu** quanh chỗ đó rồi mới trả lời.\nCâu hỏi thường đi **theo thứ tự** các đoạn A, B, C...",
          en: "Don't read the whole text first. Instead:\n1. Read the **questions** and underline **key words** (names, numbers, places).\n2. **Scan** the text for those words (or words with the same meaning).\n3. Read **2–3 sentences** around them carefully, then answer.\nQuestions usually follow the **order** of paragraphs A, B, C...",
        },
        examples: [
          {
            en: 'Why did Thu pay extra money? → key words: pay, extra money',
            vi: 'Từ khoá: pay, extra money → lướt tìm trong bài',
          },
        ],
      },
      {
        title: { vi: "Bẫy 'nearly' và 'almost'", en: "The 'nearly' trap" },
        body: {
          vi: "**nearly / almost** = **suýt, gần như** — việc đó **chưa xảy ra**!\n'We **nearly missed** the plane.' = Suýt lỡ chuyến bay → thật ra **vẫn kịp**.\nVậy câu 'They missed the plane.' là **FALSE**.\nCũng cẩn thận với **only**, **all**, **never**: một từ nhỏ đổi cả nghĩa.",
          en: "**nearly / almost** = it **didn't** actually happen!\n'We **nearly missed** the plane.' = they caught it, just in time.\nSo 'They missed the plane.' is **FALSE**.\nAlso watch small words like **only**, **all** and **never** — they change the meaning.",
        },
        examples: [{ en: "I almost forgot my passport. (= I didn't forget it)", vi: 'Tôi suýt quên hộ chiếu. (= không quên)' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-01-read-ex01',
        type: 'multiple-choice',
        question: "'We nearly missed the bus.' Did they catch the bus?",
        options: ['Yes, they did.', "No, they didn't.", "We don't know."],
        correctIndex: 0,
        explanation: {
          vi: 'nearly missed = suýt lỡ → họ vẫn kịp xe buýt.',
          en: "'Nearly missed' means they caught it, just in time.",
        },
      },
      {
        id: 'l2b-g-01-read-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài đọc với nghĩa của nó.', en: 'Match the words from the text with their meanings.' },
        pairs: [
          { left: 'abroad', right: 'in another country' },
          { left: 'nervous', right: 'a little afraid' },
          { left: 'the limit', right: 'the most you are allowed' },
          { left: 'a power bank', right: 'a small battery for your phone' },
          { left: 'immediately', right: 'at once, very quickly' },
        ],
        explanation: {
          vi: 'Biết trước các từ này giúp bạn đọc bài nhanh hơn.',
          en: 'Knowing these words first helps you read faster.',
        },
      },
      {
        id: 'l2b-g-01-read-ex03',
        type: 'fill-blank',
        sentence: 'My suitcase was two kilos over the ___, so I paid extra.',
        acceptedAnswers: ['limit'],
        hint: 'the most you are allowed',
        explanation: {
          vi: 'over the limit = vượt quá mức cho phép.',
          en: "'Over the limit' = more than you are allowed.",
        },
      },
      {
        id: 'l2b-g-01-read-ex04',
        type: 'multiple-choice',
        question: "Question: 'How long before the flight did they arrive at the airport?' Which key words should you scan for?",
        options: ['blog, holiday', 'arrive, before, flight', 'cousin, Hanoi', 'power bank'],
        correctIndex: 1,
        explanation: {
          vi: 'Từ khoá phải lấy từ chính câu hỏi: arrive, before, flight.',
          en: 'Key words come from the question itself: arrive, before, flight.',
        },
      },
      {
        id: 'l2b-g-01-read-ex05',
        type: 'arrange-words',
        translationVi: 'Điện thoại mình hết pin, nên bọn mình không dùng được bản đồ.',
        correctSentence: "My phone battery was dead, so we couldn't use the map.",
        extraWords: ['because', "can't"],
        explanation: {
          vi: "'so' nối nguyên nhân (hết pin) với kết quả (không dùng được bản đồ).",
          en: "'So' joins the cause (a dead battery) and the result.",
        },
      },
      {
        id: 'l2b-g-01-read-ex06',
        type: 'listen-choose',
        audioText: 'Excuse me, could you help us? Our shower has no hot water.',
        question: 'What is the problem?',
        options: ['The room is cold.', 'There is no hot water in the shower.', "They can't find the shower.", 'The water is too hot.'],
        correctIndex: 1,
        explanation: {
          vi: "'Our shower has no hot water' = vòi sen không có nước nóng.",
          en: "'Our shower has no hot water.'",
        },
      },
      {
        id: 'l2b-g-01-read-ex07',
        type: 'fill-blank',
        sentence: "Simple English is ___. You don't need perfect grammar.",
        acceptedAnswers: ['enough'],
        hint: '= as much as you need',
        explanation: {
          vi: 'enough = đủ. Tiếng Anh đơn giản là đủ để giao tiếp.',
          en: "'Enough' = as much as you need.",
        },
      },
      {
        id: 'l2b-g-01-read-ex08',
        type: 'speak-sentence',
        sentence: "Don't be afraid to ask for help.",
        translationVi: 'Đừng ngại nhờ người khác giúp đỡ.',
        explanation: {
          vi: "Đọc rõ /t/ trong 'Don't' và /d/ cuối 'afraid'.",
          en: "Say the /t/ in 'Don't' and the /d/ at the end of 'afraid'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: "Thu's Travel Blog: My First Trip Abroad",
        paragraphs: [
          {
            label: 'A',
            text: 'Last March, I travelled abroad for the first time. I flew from Hanoi to Bangkok with my cousin Hoa for a five-day holiday. I was excited, but I was also a little nervous because my English was not very good.',
          },
          {
            label: 'B',
            text: 'The first lesson came at the airport. We arrived only one hour before our flight, and the queue for check-in was very long. We nearly missed the plane! Now I always get to the airport at least two hours early for international flights.',
          },
          {
            label: 'C',
            text: 'The second lesson was about luggage. I packed too many clothes, and my suitcase was two kilos over the limit, so I had to pay extra. On the way home, I wore my jacket and two T-shirts on the plane to make my bag lighter!',
          },
          {
            label: 'D',
            text: "On our second day, we got lost near the river. My phone battery was dead, so we couldn't use the map. I felt shy, but Hoa asked a woman at a fruit stall for directions. She smiled and said, 'Go straight on, then turn left at the temple.' Ten minutes later, we were back at our hotel. Lesson three: don't be afraid to ask for help, and always carry a power bank.",
          },
          {
            label: 'E',
            text: "Finally, I learned that simple English is enough. One evening, there was no hot water in our shower. I went to reception and said, 'Excuse me, could you help us? Our shower has no hot water.' The receptionist moved us to a new room immediately. People don't need perfect grammar. They need clear, polite words.",
          },
          {
            label: 'F',
            text: "Next year, I'm going to visit Singapore. This time, I'll pack less and smile more!",
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct answer, decide if the statement is TRUE, FALSE or NOT GIVEN, or write NO MORE THAN TWO WORDS AND/OR A NUMBER from the text.',
      strategyTip: {
        vi: 'Câu hỏi đi theo thứ tự đoạn A → F. Gạch từ khoá trong câu hỏi trước, rồi mới tìm trong bài.',
        en: 'The questions follow paragraphs A → F in order. Underline key words in each question first.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-01-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Why was Thu nervous before the trip?',
          options: [
            'She was afraid of flying.',
            'Her English was not very good.',
            'She was travelling alone.',
            'She did not have much money.',
          ],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn A: 'nervous because my English was not very good'. Thu đi cùng em họ, không đi một mình.",
            en: "Paragraph A: 'nervous because my English was not very good'. She went with her cousin.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-01-read-q2',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Thu and Hoa missed their flight to Bangkok.',
          answer: 'FALSE',
          explanation: {
            vi: "'We nearly missed the plane' = suýt lỡ → thật ra vẫn kịp.",
            en: "'We nearly missed the plane' means they caught it.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-read-q3',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Now Thu gets to the airport at least ___ hours before an international flight.',
          acceptedAnswers: ['two', '2'],
          explanation: {
            vi: "Đoạn B: 'at least two hours early for international flights'.",
            en: "Paragraph B: 'at least two hours early for international flights'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-read-q4',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'Why did Thu have to pay extra?',
          options: [
            'She bought a new suitcase.',
            'Her suitcase was too heavy.',
            'She changed her flight.',
            'She bought some T-shirts.',
          ],
          correctIndex: 1,
          explanation: {
            vi: "'two kilos over the limit' = vali nặng quá mức cho phép.",
            en: "'Two kilos over the limit' means the suitcase was too heavy.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-01-read-q5',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'Thu and Hoa bought some fruit from the woman at the stall.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bài chỉ nói Hoa hỏi đường người bán hoa quả, không nói có mua hay không.',
            en: 'Hoa asked the woman for directions; buying fruit is not mentioned.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-01-read-q6',
          paragraphLabel: 'D',
          number: 6,
          prompt: "Thu's advice: always carry a ___.",
          acceptedAnswers: ['power bank'],
          explanation: {
            vi: "Đoạn D: 'always carry a power bank' (sạc dự phòng).",
            en: "Paragraph D: 'always carry a power bank'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-01-read-q7',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'According to Thu, what do people need when they speak English?',
          options: ['Perfect grammar', 'Long sentences', 'Clear, polite words', 'A good accent'],
          correctIndex: 2,
          explanation: {
            vi: "Đoạn E: 'People don't need perfect grammar. They need clear, polite words.'",
            en: "Paragraph E: 'They need clear, polite words.'",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-01-read-q8',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Thu is planning another trip abroad next year.',
          answer: 'TRUE',
          explanation: {
            vi: "'Next year, I'm going to visit Singapore' — be going to = kế hoạch.",
            en: "'I'm going to visit Singapore' shows a plan.",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — ĐỌC: SMALL TALK Ở CHỖ LÀM
   * Kỹ năng: chọn tiêu đề cho đoạn (matching headings = kind 'choice', options = danh sách tiêu đề),
   * có 1 tiêu đề thừa; thêm câu T/F/NG và điền từ.
   * ======================================================================== */
  {
    id: 'l2b-g-02-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: 'Đọc: nói chuyện xã giao ở chỗ làm', en: 'Reading: small talk at work' },
    description: {
      vi: 'Đọc bài viết về small talk (chuyện trò xã giao) ở nơi làm việc, chọn tiêu đề cho đoạn và tìm chi tiết.',
      en: 'Read an article about small talk at work, choose headings for the paragraphs and find details.',
    },
    teachingCards: [
      {
        title: { vi: 'Chọn tiêu đề cho đoạn văn', en: 'Choosing a heading' },
        body: {
          vi: "Tiêu đề = **ý chính của cả đoạn**, không phải một chi tiết.\nCách làm: đọc **câu đầu** và **câu cuối** của đoạn → tự tóm tắt bằng **3–5 từ** → chọn tiêu đề gần nhất.\nCẩn thận: tiêu đề có **cùng một từ** với đoạn văn chưa chắc đã đúng. Thường có **1 tiêu đề thừa**.",
          en: "A heading = **the main idea of the whole paragraph**, not a detail.\nRead the **first** and **last** sentences → sum up the paragraph in **3–5 words** → choose the closest heading.\nCareful: a heading with **the same word** as the paragraph is not always right. There is usually **one extra heading**.",
        },
        examples: [
          {
            en: "A paragraph about safe topics like weather and food → 'What to talk about'",
            vi: "Đoạn nói về chủ đề an toàn → tiêu đề 'Nên nói về điều gì'",
          },
        ],
      },
      {
        title: { vi: 'Small talk là gì?', en: 'What is small talk?' },
        body: {
          vi: "**Small talk** = trò chuyện ngắn, nhẹ nhàng với đồng nghiệp: thời tiết, cuối tuần, đồ ăn...\nCâu mở đầu dễ: **How was your weekend?** / **Busy day?** / **Have you tried the new café downstairs?**\nKết thúc lịch sự: **Anyway, I'd better get back to work. Nice talking to you!**",
          en: "**Small talk** = short, light conversation with colleagues: the weather, the weekend, food...\nEasy openers: **How was your weekend?** / **Busy day?** / **Have you tried the new café downstairs?**\nA polite ending: **Anyway, I'd better get back to work. Nice talking to you!**",
        },
        examples: [{ en: 'How was your weekend? Did you do anything fun?', vi: 'Cuối tuần của bạn thế nào? Có làm gì vui không?' }],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-02-read-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu mở đầu với câu đáp phù hợp.', en: 'Match each opener with a good reply.' },
        pairs: [
          { left: 'How was your weekend?', right: 'Great, thanks! I went to the beach.' },
          { left: 'Busy day?', right: "Yes, I've had three meetings already!" },
          { left: 'Have you tried the new café downstairs?', right: 'Not yet. Is it good?' },
          { left: "Lovely weather today, isn't it?", right: "Yes, it's really sunny." },
          { left: 'Nice talking to you!', right: 'You too. See you later.' },
        ],
        explanation: {
          vi: 'Câu đáp tốt trả lời đúng ý và giữ cho cuộc trò chuyện vui vẻ.',
          en: 'A good reply answers the question and keeps the chat friendly.',
        },
      },
      {
        id: 'l2b-g-02-read-ex02',
        type: 'multiple-choice',
        question: 'Which topic is usually SAFE for small talk with a new colleague?',
        options: ['How much money they earn', 'Their weekend plans', 'How old they are', "Why they aren't married"],
        correctIndex: 1,
        explanation: {
          vi: 'Kế hoạch cuối tuần là chủ đề an toàn; lương, tuổi, hôn nhân là chuyện riêng tư.',
          en: 'Weekend plans are safe; money, age and marriage are personal.',
        },
      },
      {
        id: 'l2b-g-02-read-ex03',
        type: 'fill-blank',
        sentence: "Anyway, I'd better get ___ to work. Nice talking to you!",
        acceptedAnswers: ['back'],
        hint: 'return = get ...',
        explanation: {
          vi: "get back to work = quay lại làm việc — cách kết thúc lịch sự.",
          en: "'Get back to work' is a polite way to end a chat.",
        },
      },
      {
        id: 'l2b-g-02-read-ex04',
        type: 'multiple-choice',
        question: 'A good heading for a paragraph shows...',
        options: [
          'one small detail.',
          'the main idea of the whole paragraph.',
          'the first word of the paragraph.',
          'a number from the paragraph.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Tiêu đề phải bao quát ý chính của cả đoạn.',
          en: 'A heading covers the main idea of the whole paragraph.',
        },
      },
      {
        id: 'l2b-g-02-read-ex05',
        type: 'arrange-words',
        translationVi: 'Bạn đã thử quán cà phê mới ở tầng dưới chưa?',
        correctSentence: 'Have you tried the new café downstairs?',
        extraWords: ['did', 'try'],
        explanation: {
          vi: 'Have you tried...? = Bạn đã thử... chưa? (hiện tại hoàn thành).',
          en: 'Have you tried...? asks about experience (present perfect).',
        },
      },
      {
        id: 'l2b-g-02-read-ex06',
        type: 'listen-choose',
        audioText: 'Small talk helps people feel relaxed, and over time it builds trust in a team.',
        question: 'What does small talk help to build?',
        options: ['Money', 'Trust', 'Offices', 'Deadlines'],
        correctIndex: 1,
        explanation: {
          vi: "'it builds trust' = xây dựng sự tin tưởng.",
          en: "'It builds trust in a team.'",
        },
      },
      {
        id: 'l2b-g-02-read-ex07',
        type: 'fill-blank',
        sentence: "Good small talk isn't about talking a lot. It's about ___ and asking questions.",
        acceptedAnswers: ['listening'],
        hint: 'the opposite of speaking (-ing form)',
        explanation: {
          vi: 'Nói chuyện giỏi = biết lắng nghe (listening) và hỏi lại.',
          en: 'Good small talk means listening and asking questions.',
        },
      },
      {
        id: 'l2b-g-02-read-ex08',
        type: 'speak-sentence',
        sentence: 'How was your weekend? Did you do anything fun?',
        translationVi: 'Cuối tuần của bạn thế nào? Có làm gì vui không?',
        explanation: {
          vi: "Câu hỏi Yes/No 'anything fun?' lên giọng ở cuối.",
          en: "Your voice goes up at the end of 'anything fun?'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Small Talk: Why Those Two Minutes Matter',
        paragraphs: [
          {
            label: 'A',
            text: "It's nine o'clock on Monday morning. You are waiting for the lift with a colleague. Do you look at your phone, or do you say something? Many people find this moment difficult, especially in a new job. But a short, friendly chat, called 'small talk', can make a big difference.",
          },
          {
            label: 'B',
            text: 'Small talk is not just about being polite. When colleagues chat about simple things, they feel more relaxed with each other. Over time, this builds trust. People who trust each other work better in a team, share ideas more easily and ask for help when they have a problem.',
          },
          {
            label: 'C',
            text: "So what should you talk about? Safe topics include the weather, the weekend, food, sport and holidays. For example, you can ask, 'How was your weekend?' or 'Have you tried the new café downstairs?' Try to avoid personal questions, like how much money someone earns or why they are not married. These can make people feel uncomfortable.",
          },
          {
            label: 'D',
            text: "Good small talk is not about talking a lot. It is about listening and asking questions. If your colleague says, 'I went to Da Lat at the weekend,' don't just say 'Nice.' Ask a follow-up question, such as 'Oh, how was the weather there?' People love it when others show interest in their lives.",
          },
          {
            label: 'E',
            text: "Finally, know how to finish. Small talk should be short, usually two to five minutes. A polite way to end is: 'Anyway, I'd better get back to work. Nice talking to you!' Then smile and go. Tomorrow, you can start again where you stopped.",
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct heading or answer, decide if the statement is TRUE, FALSE or NOT GIVEN, or write NO MORE THAN TWO WORDS AND/OR A NUMBER from the text.',
      strategyTip: {
        vi: 'Câu 1–4: có 5 tiêu đề cho 4 đoạn, nên sẽ thừa 1 tiêu đề. Đọc câu đầu và câu cuối mỗi đoạn trước.',
        en: 'Questions 1–4: there are five headings for four paragraphs, so one is extra.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-02-read-q1',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Choose the best heading for paragraph B.',
          options: [
            'i. What to talk about, and what not to',
            'ii. How to end a conversation',
            'iii. Why small talk is useful',
            'iv. Listening is the key',
            'v. The best places to meet colleagues',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn B nói lợi ích của small talk: thoải mái, tin tưởng, làm việc nhóm tốt hơn.',
            en: 'Paragraph B explains the benefits: relaxing, trust and better teamwork.',
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-read-q2',
          paragraphLabel: 'C',
          number: 2,
          prompt: 'Choose the best heading for paragraph C.',
          options: [
            'i. What to talk about, and what not to',
            'ii. How to end a conversation',
            'iii. Why small talk is useful',
            'iv. Listening is the key',
            'v. The best places to meet colleagues',
          ],
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn C nêu chủ đề nên nói (thời tiết, cuối tuần) và nên tránh (lương, hôn nhân).',
            en: 'Paragraph C gives safe topics and topics to avoid.',
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-read-q3',
          paragraphLabel: 'D',
          number: 3,
          prompt: 'Choose the best heading for paragraph D.',
          options: [
            'i. What to talk about, and what not to',
            'ii. How to end a conversation',
            'iii. Why small talk is useful',
            'iv. Listening is the key',
            'v. The best places to meet colleagues',
          ],
          correctIndex: 3,
          explanation: {
            vi: "Câu chủ đề đoạn D: 'It is about listening and asking questions.'",
            en: "Topic sentence of D: 'It is about listening and asking questions.'",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-read-q4',
          paragraphLabel: 'E',
          number: 4,
          prompt: 'Choose the best heading for paragraph E.',
          options: [
            'i. What to talk about, and what not to',
            'ii. How to end a conversation',
            'iii. Why small talk is useful',
            'iv. Listening is the key',
            'v. The best places to meet colleagues',
          ],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn E mở đầu: 'Finally, know how to finish.' Tiêu đề v là tiêu đề thừa.",
            en: "Paragraph E begins 'Finally, know how to finish.' Heading v is not used.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-02-read-q5',
          paragraphLabel: 'A',
          number: 5,
          prompt: 'According to paragraph A, when do many people find small talk especially difficult?',
          options: ['At the weekend', 'In a new job', 'At lunch time', 'On the phone'],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn A: 'Many people find this moment difficult, especially in a new job.'",
            en: "Paragraph A: 'especially in a new job'.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-02-read-q6',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'It is a good idea to ask a new colleague how much money they earn.',
          answer: 'FALSE',
          explanation: {
            vi: "Đoạn C khuyên nên tránh hỏi 'how much money someone earns'.",
            en: 'Paragraph C says to avoid asking how much money someone earns.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: "Don't just say 'Nice.' Ask a ___ question.",
          acceptedAnswers: ['follow-up', 'follow up'],
          explanation: {
            vi: "Đoạn D: 'Ask a follow-up question' = hỏi tiếp về điều người kia vừa kể.",
            en: "Paragraph D: 'Ask a follow-up question.'",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-02-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'Small talk usually lasts from two to ___ minutes.',
          acceptedAnswers: ['five', '5'],
          explanation: {
            vi: "Đoạn E: 'usually two to five minutes'.",
            en: "Paragraph E: 'usually two to five minutes'.",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 3 — ĐỌC: HAI NGÔI TRƯỜNG (VIỆT NAM – ANH)
   * Ngữ pháp lồng ghép: so sánh hơn / nhất, not as ... as, both.
   * Kỹ năng: xác định câu đang nói về trường nào; NOT GIVEN (đừng tự suy diễn).
   * ======================================================================== */
  {
    id: 'l2b-g-03-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: 'Đọc: hai ngôi trường, hai thế giới', en: 'Reading: two schools, two worlds' },
    description: {
      vi: 'Đọc bài viết của một học sinh Việt Nam so sánh trường mình với một trường ở Anh, luyện so sánh hơn và so sánh nhất.',
      en: 'Read a Vietnamese student comparing her school with a school in England, and practise comparatives and superlatives.',
    },
    teachingCards: [
      {
        title: { vi: 'So sánh hơn và so sánh nhất', en: 'Comparatives and superlatives' },
        body: {
          vi: "Tính từ ngắn: small → **smaller** → **the smallest**; big → **bigger** → **the biggest**.\nTính từ dài: interesting → **more interesting** → **the most interesting**.\nBất quy tắc: good → **better** → **the best**; bad → **worse** → **the worst**.\nBằng nhau: **as ... as**. Không bằng: **not as ... as**.",
          en: "Short adjectives: small → **smaller** → **the smallest**; big → **bigger** → **the biggest**.\nLong adjectives: interesting → **more interesting** → **the most interesting**.\nIrregular: good → **better** → **the best**; bad → **worse** → **the worst**.\nEqual: **as ... as**. Not equal: **not as ... as**.",
        },
        examples: [
          { en: 'My new school is bigger than my old one.', vi: 'Trường mới của mình to hơn trường cũ.' },
          { en: "The food was not as tasty as my mum's cooking.", vi: 'Đồ ăn không ngon bằng mẹ mình nấu.' },
        ],
      },
      {
        title: { vi: 'Đọc bài so sánh hai nơi', en: 'Reading a comparison' },
        body: {
          vi: "Bài so sánh hai nơi hay dùng: **but**, **while**, **however**, **both** (cả hai), **different from**, **the same as**.\nKhi trả lời, luôn xác định câu đó nói về **trường nào**. Nhầm hai trường là lỗi hay gặp nhất!\nCâu **NOT GIVEN**: bài không nói thì **đừng tự đoán**.",
          en: "Comparison texts often use: **but**, **while**, **however**, **both**, **different from**, **the same as**.\nWhen you answer, always check **which school** the sentence is about. Mixing them up is the most common mistake!\n**NOT GIVEN**: if the text doesn't say it, **don't guess**.",
        },
        examples: [
          { en: 'Both schools have a library, but only one has a swimming pool.', vi: 'Cả hai trường đều có thư viện, nhưng chỉ một trường có bể bơi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-03-read-ex01',
        type: 'multiple-choice',
        question: "My school is ___ than my brother's school.",
        options: ['big', 'bigger', 'biggest', 'more big'],
        correctIndex: 1,
        explanation: {
          vi: 'Tính từ ngắn + -er + than: bigger than (gấp đôi chữ g).',
          en: 'Short adjective + -er + than: bigger than.',
        },
      },
      {
        id: 'l2b-g-03-read-ex02',
        type: 'multiple-choice',
        question: 'Drama was the ___ interesting lesson of the week.',
        options: ['more', 'most', 'much', 'very'],
        correctIndex: 1,
        explanation: {
          vi: "Có 'the' + tính từ dài → so sánh nhất: the most interesting.",
          en: "'The' + long adjective → the most interesting.",
        },
      },
      {
        id: 'l2b-g-03-read-ex03',
        type: 'fill-blank',
        sentence: "The school lunch was not as tasty ___ my mum's cooking.",
        acceptedAnswers: ['as'],
        explanation: {
          vi: 'not as + tính từ + as = không ... bằng.',
          en: 'not as + adjective + as = less than.',
        },
      },
      {
        id: 'l2b-g-03-read-ex04',
        type: 'fill-blank',
        sentence: "This year's exams are ___ than last year's. I'm so worried!",
        acceptedAnswers: ['worse'],
        hint: '(bad)',
        explanation: {
          vi: 'bad → worse → the worst (bất quy tắc).',
          en: 'bad → worse → the worst (irregular).',
        },
      },
      {
        id: 'l2b-g-03-read-ex05',
        type: 'arrange-words',
        translationVi: 'Lớp học của bọn mình là lớp to nhất trường.',
        correctSentence: 'Our classroom is the biggest in the school.',
        extraWords: ['most', 'bigger'],
        explanation: {
          vi: "So sánh nhất: the + tính từ -est + in + nơi chốn.",
          en: 'Superlative: the + -est adjective + in + place.',
        },
      },
      {
        id: 'l2b-g-03-read-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với dạng so sánh nhất.', en: 'Match each adjective with its superlative.' },
        pairs: [
          { left: 'good', right: 'the best' },
          { left: 'bad', right: 'the worst' },
          { left: 'big', right: 'the biggest' },
          { left: 'easy', right: 'the easiest' },
          { left: 'important', right: 'the most important' },
        ],
        explanation: {
          vi: 'Nhớ dạng bất quy tắc (best, worst) và cách đổi y → i (easiest).',
          en: 'Remember the irregular forms and y → i (easiest).',
        },
      },
      {
        id: 'l2b-g-03-read-ex07',
        type: 'listen-choose',
        audioText: 'Both schools give a lot of homework, but only my school has extra classes in the afternoon.',
        question: 'What is the same at both schools?',
        options: ['Extra classes', 'Lots of homework', 'Lunch time', 'Class size'],
        correctIndex: 1,
        explanation: {
          vi: "'Both schools give a lot of homework' → điểm giống nhau là bài tập nhiều.",
          en: "'Both schools give a lot of homework.'",
        },
      },
      {
        id: 'l2b-g-03-read-ex08',
        type: 'multiple-choice',
        question: "My school has 900 students. Emily's school has 1,200 students. Which is TRUE?",
        options: ['My school is bigger.', "Emily's school is bigger.", 'They are the same size.'],
        correctIndex: 1,
        explanation: {
          vi: '1.200 nhiều hơn 900 → trường của Emily lớn hơn.',
          en: "1,200 is more than 900, so Emily's school is bigger.",
        },
      },
      {
        id: 'l2b-g-03-read-ex09',
        type: 'speak-sentence',
        sentence: 'Drama was the most interesting lesson of the week.',
        translationVi: 'Kịch là tiết học thú vị nhất trong tuần.',
        explanation: {
          vi: "Đọc 'interesting' 3 âm tiết: IN-tres-ting; nối 'most interesting'.",
          en: "Say IN-tres-ting (three syllables) and link 'most interesting'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Two Schools, Two Worlds',
        paragraphs: [
          {
            label: 'A',
            text: "My name is Ngoc Anh, and I'm in Grade 9 at a secondary school in Hai Phong. Last autumn, I spent three weeks at a school in a small town in England as part of an exchange programme. I stayed with an English family, and their daughter, Emily, was in my class. Here are the biggest differences I noticed between her school and mine.",
          },
          {
            label: 'B',
            text: "First, the school day. At my school in Vietnam, lessons start at seven o'clock, so I get up before six. In England, lessons started at nine, which was much easier for me! However, the English students stayed at school until half past three, while I usually finish at half past eleven and study at home in the afternoon.",
          },
          {
            label: 'C',
            text: "Second, lunch. At Emily's school, everyone ate lunch together in a big dining hall. The food was not as tasty as my mum's cooking, but it was healthier than I expected, with lots of vegetables and fruit.",
          },
          {
            label: 'D',
            text: 'Lessons were also different. Classes were smaller, with about twenty-five students, not forty-five like in my class. Students moved to different rooms for each subject, and they asked the teacher a lot of questions. At first I was surprised, because in my class we usually listen and take notes. I think the most interesting lesson was drama, where we made a short play in groups.',
          },
          {
            label: 'E',
            text: "But some things were the same. Both schools give a lot of homework, and students in both countries worry about exams! Emily is coming to Hai Phong next year, and I'm going to show her my school. I think she'll love our snacks at break time.",
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct answer, decide if the statement is TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER from the text.',
      strategyTip: {
        vi: 'Với mỗi câu, hỏi: câu này nói về trường ở Việt Nam hay ở Anh? Gạch chân "my school" và "Emily\'s school" khi đọc.',
        en: "For each question, ask: is it about the school in Vietnam or in England? Underline 'my school' and 'Emily's school'.",
      },
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-03-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Why did Ngoc Anh go to England?',
          options: [
            'For a holiday with her family',
            'For a school exchange programme',
            'To visit her cousin',
            'To study at a university',
          ],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn A: 'as part of an exchange programme' = chương trình trao đổi học sinh.",
            en: "Paragraph A: 'as part of an exchange programme'.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-read-q2',
          paragraphLabel: 'B',
          number: 2,
          prompt: "At Emily's school, lessons started at ___ o'clock.",
          acceptedAnswers: ['nine', '9'],
          explanation: {
            vi: "Đoạn B: 'In England, lessons started at nine'.",
            en: "Paragraph B: 'In England, lessons started at nine.'",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-03-read-q3',
          paragraphLabel: 'B',
          number: 3,
          prompt: "Lessons at Ngoc Anh's school in Vietnam start later than at Emily's school.",
          answer: 'FALSE',
          explanation: {
            vi: 'Ở Việt Nam học lúc 7 giờ, ở Anh lúc 9 giờ → Việt Nam sớm hơn.',
            en: "Vietnam: seven o'clock; England: nine. Vietnam starts earlier.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-03-read-q4',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'What did Ngoc Anh think of the school lunch in England?',
          options: [
            "It was tastier than her mum's cooking.",
            'It was healthier than she expected.',
            'It was too expensive.',
            'It had no vegetables.',
          ],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn C: 'not as tasty as my mum's cooking, but ... healthier than I expected'.",
            en: "Paragraph C: 'healthier than I expected'.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-read-q5',
          paragraphLabel: 'D',
          number: 5,
          prompt: "There are about ___ students in Ngoc Anh's class in Vietnam.",
          acceptedAnswers: ['45', 'forty-five', 'forty five'],
          explanation: {
            vi: "Đoạn D: 'not forty-five like in my class'. Số 25 là lớp ở Anh — bẫy!",
            en: "Paragraph D: 'forty-five like in my class'. Twenty-five is the English class.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-03-read-q6',
          paragraphLabel: 'D',
          number: 6,
          prompt: "Ngoc Anh's teachers in Vietnam do not like questions from students.",
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bài chỉ nói lớp cô ấy thường nghe và ghi chép, không nói thầy cô thích hay không.',
            en: "The text says they listen and take notes, not what the teachers like.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-03-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'For Ngoc Anh, the most interesting lesson in England was ___.',
          acceptedAnswers: ['drama'],
          explanation: {
            vi: "Đoạn D: 'the most interesting lesson was drama'.",
            en: "Paragraph D: 'the most interesting lesson was drama'.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-03-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'Students at both schools get a lot of homework.',
          answer: 'TRUE',
          explanation: {
            vi: "Đoạn E: 'Both schools give a lot of homework'.",
            en: "Paragraph E: 'Both schools give a lot of homework.'",
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 4 — ĐỌC: BẢN TIN NGẮN
   * Kỹ năng: hiểu tiêu đề tin (hiện tại đơn = đã xảy ra, to + V = sẽ xảy ra),
   * tìm 5 thông tin Who / What / Where / When / Why ở đoạn đầu.
   * ======================================================================== */
  {
    id: 'l2b-g-04-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: 'Đọc: một bản tin ngắn', en: 'Reading: a short news story' },
    description: {
      vi: 'Đọc một bản tin địa phương, hiểu tiêu đề và trả lời câu hỏi ai, cái gì, ở đâu, khi nào, vì sao.',
      en: 'Read a short local news story, understand the headline and answer who, what, where, when and why.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc tiêu đề tin', en: 'Reading headlines' },
        body: {
          vi: "Tiêu đề tin rất **ngắn** nên hay:\n• bỏ **a / the / is / are**\n• dùng **hiện tại đơn** cho việc **đã xảy ra**: 'Students **Win** Prize' = Học sinh **đã** giành giải\n• dùng **to + V** cho việc **sắp xảy ra**: 'Town **to Open** New Library' = Thị trấn **sẽ** mở thư viện",
          en: "Headlines are **short**, so they often:\n• drop **a / the / is / are**\n• use the **present simple** for **past events**: 'Students **Win** Prize'\n• use **to + verb** for the **future**: 'Town **to Open** New Library'",
        },
        examples: [
          {
            en: "'Girl Finds Lost Dog' = A girl has found a lost dog.",
            vi: "'Girl Finds Lost Dog' = Một bé gái đã tìm thấy chú chó bị lạc.",
          },
        ],
      },
      {
        title: { vi: '5 câu hỏi Wh- của bản tin', en: 'The five Wh- questions' },
        body: {
          vi: "Đoạn đầu bản tin thường trả lời gần hết: **Who** (ai)? **What** (chuyện gì)? **Where** (ở đâu)? **When** (khi nào)? **Why** (vì sao)?\nCác đoạn sau thêm **chi tiết** và **lời trích** (lời người trong tin, đặt trong dấu ngoặc).\nĐọc kỹ đoạn đầu là hiểu được phần lớn bản tin!",
          en: "The first paragraph usually answers most of: **Who? What? Where? When? Why?**\nLater paragraphs add **details** and **quotes** (people's words in quotation marks).\nRead the first paragraph carefully and you will understand most of the story!",
        },
        examples: [
          {
            en: 'Last Sunday (when), forty students (who) cleaned a beach (what) in Da Nang (where).',
            vi: 'Chủ nhật tuần trước (khi nào), bốn mươi học sinh (ai) đã dọn sạch một bãi biển (chuyện gì) ở Đà Nẵng (ở đâu).',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2b-g-04-read-ex01',
        type: 'multiple-choice',
        question: "The headline 'Town to Open New Swimming Pool' means...",
        options: [
          'The town has opened a new pool.',
          'The town will open a new pool.',
          'The town has closed its pool.',
          "The town doesn't want a pool.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Tiêu đề dùng 'to + V' → việc sẽ xảy ra.",
          en: "'To + verb' in a headline shows the future.",
        },
      },
      {
        id: 'l2b-g-04-read-ex02',
        type: 'multiple-choice',
        question: "The headline 'Girl Finds Lost Dog in Park' means...",
        options: ['A girl will find a dog.', 'A girl found a lost dog.', 'A girl is losing her dog.', 'A dog found a girl.'],
        correctIndex: 1,
        explanation: {
          vi: 'Tiêu đề dùng hiện tại đơn cho việc đã xảy ra.',
          en: 'Headlines use the present simple for past events.',
        },
      },
      {
        id: 'l2b-g-04-read-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi Wh- với loại thông tin trả lời.', en: 'Match each Wh- question with the kind of answer.' },
        pairs: [
          { left: 'Who?', right: 'a group of students' },
          { left: 'What?', right: 'made a free library' },
          { left: 'Where?', right: 'in a park in the city centre' },
          { left: 'When?', right: 'last Saturday' },
          { left: 'Why?', right: 'because children need books' },
        ],
        explanation: {
          vi: 'Who = người, What = sự việc, Where = nơi, When = thời gian, Why = lý do.',
          en: 'Who = people, What = event, Where = place, When = time, Why = reason.',
        },
      },
      {
        id: 'l2b-g-04-read-ex04',
        type: 'fill-blank',
        sentence: 'You can ___ books from the library and bring them back next week.',
        acceptedAnswers: ['borrow'],
        hint: 'take something and give it back later',
        explanation: {
          vi: 'borrow = mượn (của ai); lend = cho (ai) mượn.',
          en: 'borrow = take for a short time; lend = give for a short time.',
        },
      },
      {
        id: 'l2b-g-04-read-ex05',
        type: 'fill-blank',
        sentence: 'The ___ work without pay because they want to help.',
        acceptedAnswers: ['volunteers'],
        hint: 'people who help for free',
        explanation: {
          vi: 'volunteer = tình nguyện viên, người giúp không lấy tiền.',
          en: 'A volunteer works for free to help others.',
        },
      },
      {
        id: 'l2b-g-04-read-ex06',
        type: 'listen-choose',
        audioText: "The new sports centre will open next Monday at ten o'clock.",
        question: 'When will the sports centre open?',
        options: ['This Monday at 10', 'Next Monday at 10', 'Next Monday at 2', 'Last Monday at 10'],
        correctIndex: 1,
        explanation: {
          vi: "'will open next Monday at ten' → thứ Hai tuần sau, 10 giờ.",
          en: "'Will open next Monday at ten o'clock.'",
        },
      },
      {
        id: 'l2b-g-04-read-ex07',
        type: 'arrange-words',
        translationVi: 'Một số người đã tặng sách cũ của họ cho thư viện.',
        correctSentence: 'Some people gave their old books to the library.',
        extraWords: ['give', 'from'],
        explanation: {
          vi: 'give something to somebody = tặng / đưa cái gì cho ai.',
          en: 'give something to somebody.',
        },
      },
      {
        id: 'l2b-g-04-read-ex08',
        type: 'speak-sentence',
        sentence: "Many children in my neighbourhood don't have books at home.",
        translationVi: 'Nhiều trẻ em trong khu phố của mình không có sách ở nhà.',
        explanation: {
          vi: "Đọc rõ /s/ cuối 'books'; 'children' đã là số nhiều, không thêm -s.",
          en: "Say the /s/ in 'books'; 'children' is already plural.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Students Turn Old Bus into Free Library',
        paragraphs: [
          {
            label: 'A',
            text: "A group of secondary school students in Can Tho have turned an old bus into a free library for children. The 'Book Bus' opened last Saturday in a park in the city centre, and more than two hundred children visited it on the first day.",
          },
          {
            label: 'B',
            text: "The idea came from fifteen-year-old Tran Minh Khoa. 'Many children in my neighbourhood don't have books at home, and the nearest library is quite far away,' he said. 'I wanted to bring books to them.'",
          },
          {
            label: 'C',
            text: 'Khoa and eight classmates spent four months on the project. A local bus company gave them the bus for free because it was too old to carry passengers. The students cleaned it, painted it bright yellow and built shelves inside. People in the city gave more than three thousand books.',
          },
          {
            label: 'D',
            text: 'The library is open every weekend from eight in the morning to five in the afternoon. Children can read inside the bus or borrow up to two books for one week. Volunteers from the school also read stories aloud every Sunday morning.',
          },
          {
            label: 'E',
            text: "Parents are very happy with the Book Bus. 'My daughter usually spends her weekends on her phone,' said Mrs Le Thi Hoa, a mother of two. 'Now she asks to come here every Saturday.' The students are now looking for a second bus so they can visit villages outside the city next year.",
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct answer, decide if the statement is TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER from the text.',
      strategyTip: {
        vi: 'Đọc kỹ tiêu đề và đoạn A trước: chúng trả lời Who, What, Where, When. Các đoạn sau cho chi tiết.',
        en: 'Read the headline and paragraph A carefully first: they answer Who, What, Where and When.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l2b-g-04-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'What is the news story mainly about?',
          options: [
            'A new bus route in Can Tho',
            'Students who made a library in a bus',
            'A school that needs more books',
            'A bus company that sells old buses',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Tiêu đề và đoạn A: học sinh biến xe buýt cũ thành thư viện miễn phí.',
            en: 'The headline and paragraph A: students turned a bus into a library.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-read-q2',
          paragraphLabel: 'A',
          number: 2,
          prompt: 'More than ___ children visited the Book Bus on its first day.',
          acceptedAnswers: ['200', 'two hundred'],
          explanation: {
            vi: "Đoạn A: 'more than two hundred children visited it on the first day'.",
            en: "Paragraph A: 'more than two hundred children'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-04-read-q3',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Why did Khoa start the project?',
          options: [
            'He wanted to sell books.',
            "Many local children don't have books at home.",
            'His school library closed.',
            'He wanted to learn to drive a bus.',
          ],
          correctIndex: 1,
          explanation: {
            vi: "Khoa nói: 'Many children in my neighbourhood don't have books at home'.",
            en: "Khoa says many children near him don't have books at home.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-04-read-q4',
          paragraphLabel: 'B',
          number: 4,
          prompt: 'Khoa wants to become a librarian when he grows up.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bài không nói gì về nghề Khoa muốn làm sau này.',
            en: "The story says nothing about Khoa's future job.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l2b-g-04-read-q5',
          paragraphLabel: 'C',
          number: 5,
          prompt: 'The bus company sold the bus to the students.',
          answer: 'FALSE',
          explanation: {
            vi: "Đoạn C: công ty 'gave them the bus for free' = cho không, không bán.",
            en: "Paragraph C: the company 'gave them the bus for free'.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-read-q6',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'The students painted the bus bright ___.',
          acceptedAnswers: ['yellow'],
          explanation: {
            vi: "Đoạn C: 'painted it bright yellow'.",
            en: "Paragraph C: 'painted it bright yellow'.",
          },
        },
        {
          kind: 'gap-fill',
          id: 'l2b-g-04-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'Children can borrow up to ___ books for one week.',
          acceptedAnswers: ['two', '2'],
          explanation: {
            vi: "Đoạn D: 'borrow up to two books for one week'.",
            en: "Paragraph D: 'borrow up to two books for one week'.",
          },
        },
        {
          kind: 'choice',
          id: 'l2b-g-04-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: "What does Mrs Hoa say about her daughter?",
          options: [
            'She reads books on her phone.',
            'She now wants to visit the Book Bus every Saturday.',
            'She works as a volunteer on the bus.',
            "She doesn't like reading.",
          ],
          correctIndex: 1,
          explanation: {
            vi: "Mrs Hoa: 'Now she asks to come here every Saturday.'",
            en: "Mrs Hoa: 'Now she asks to come here every Saturday.'",
          },
        },
      ],
    },
    miniTest: [],
  },
]
