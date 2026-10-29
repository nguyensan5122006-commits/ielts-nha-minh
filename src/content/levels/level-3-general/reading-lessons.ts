/**
 * reading-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * BÀI ĐỌC (mode 'reading') — bài THỨ BA của mỗi chặng
 * ----------------------------------------------------------------------------
 * Bài đọc đời thật (350–550 từ): bài báo, blog du lịch, bài bình luận, review phim,
 * bài tạp chí. Tất cả là bài tự soạn; tên người, tên phim đều là tên tự đặt.
 *
 * Danh sách bài:
 *   l3-g-u1-read  Bài báo: Gây ấn tượng khi phỏng vấn  (chọn tiêu đề đoạn, TRUE/FALSE/NOT GIVEN)
 *   l3-g-u2-read  Blog du lịch: Chuyến đi "trục trặc"    (đọc lướt tìm chi tiết, trình tự sự việc)
 *   l3-g-u3-read  Bài bình luận về thư viện khu phố     (sự thật hay ý kiến, chọn câu tóm tắt)
 *   l3-g-u4-read  Review phim "The Last Ferry"           (cấu trúc review, khen – chê)
 *   l3-g-u5-read  Tạp chí: Thói quen nhỏ, thay đổi lớn   (dạng "Người nào…?", paraphrase)
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2 thẻ chiến thuật đọc (song ngữ)
 *   - exercises     : 10 bài khởi động (từ vựng trong bài, luyện chiến thuật, 1 câu nói)
 *   - readingTask   : bài đọc chia đoạn A, B, C…; 8–9 câu hỏi, mỗi câu có paragraphLabel
 *                     (đáp án nằm ở đoạn nào). Chọn tiêu đề đoạn = kind 'choice';
 *                     trả lời ngắn = kind 'gap-fill'. examMinutes = chế độ bấm giờ.
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l3-g-u<chặng>-read", bài tập "...-ex<số>", câu hỏi "...-q<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

/** Danh sách tiêu đề dùng chung cho 3 câu "chọn tiêu đề đoạn" của bài 1 (có 4 tiêu đề gây nhiễu). */
const U1_HEADINGS: string[] = [
  'Why clothes matter most',
  'Small signals that you take it seriously',
  'Nerves are normal',
  'Real examples work best',
  'An honest answer to a difficult question',
  'What to do after you get the job',
  'Ending on a strong note',
]

/** Các lựa chọn cho dạng "Người nào…?" của bài 5. */
const U5_PEOPLE: string[] = ['Minh', 'Sarah', 'Tom', 'Lan']

export const level3GeneralReadingLessons: Lesson[] = [
  /* ==========================================================================
   * CHẶNG 1 — BÀI BÁO: GÂY ẤN TƯỢNG KHI PHỎNG VẤN (~480 từ, đoạn A–F)
   * Kỹ năng: tìm ý chính đoạn (chọn tiêu đề), TRUE / FALSE / NOT GIVEN.
   * ======================================================================== */
  {
    id: 'l3-g-u1-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 18,
    title: { vi: 'Bài báo: Gây ấn tượng khi phỏng vấn', en: 'Article: Making a good impression at interviews' },
    description: {
      vi: 'Đọc bài báo về kỹ năng phỏng vấn, luyện tìm ý chính của đoạn và phân biệt TRUE / FALSE / NOT GIVEN.',
      en: 'Read an article about interview skills; practise finding main ideas and TRUE / FALSE / NOT GIVEN.',
    },
    teachingCards: [
      {
        title: { vi: 'Tìm ý chính của đoạn', en: 'Finding the main idea of a paragraph' },
        body: {
          vi: 'Ý chính thường nằm ở **câu đầu** (đôi khi câu cuối). Các câu giữa là **ví dụ, chi tiết**. Khi chọn tiêu đề cho đoạn, hãy hỏi: "Đoạn này **chủ yếu** nói gì?" Đừng chọn tiêu đề chỉ khớp với **một chi tiết nhỏ** hoặc một từ giống trong bài.',
          en: 'The main idea is usually in the **first sentence** (sometimes the last). The middle sentences give **examples and details**. When choosing a heading, ask: "What is this paragraph **mainly** about?" Don\'t pick a heading that only matches **one small detail** or one repeated word.',
        },
        examples: [
          {
            en: 'Arriving early shows you are organised. Reading about the company helps too.',
            vi: 'Đến sớm cho thấy bạn ngăn nắp. Tìm hiểu công ty cũng giúp ích. → Ý chính: những cách đơn giản cho thấy bạn nghiêm túc.',
          },
        ],
      },
      {
        title: { vi: 'TRUE / FALSE / NOT GIVEN', en: 'TRUE / FALSE / NOT GIVEN' },
        body: {
          vi: '**TRUE** = bài nói đúng như vậy (có thể bằng từ khác).\n**FALSE** = bài nói **ngược lại**.\n**NOT GIVEN** = bài **không nhắc đến**, không thể biết.\nBẫy hay gặp: dùng hiểu biết của mình. Chỉ dựa vào **bài đọc**, dù câu đó nghe rất hợp lý.',
          en: '**TRUE** = the text says the same thing (maybe in other words).\n**FALSE** = the text says **the opposite**.\n**NOT GIVEN** = the text **doesn\'t say**, so you can\'t know.\nCommon trap: using your own knowledge. Use **only the text**, even if a statement sounds sensible.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u1-read-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với nghĩa đúng', en: 'Match words from the article with their meanings' },
        pairs: [
          { left: 'punctuality', right: 'being on time' },
          { left: 'posture', right: 'the way you sit or stand' },
          { left: 'exaggerated', right: 'made to seem bigger than it is' },
          { left: 'manageable', right: 'not too big to deal with' },
          { left: 'decisive', right: 'the thing that decides the result' },
        ],
        explanation: {
          vi: 'Năm từ xuất hiện trong bài đọc. Biết trước giúp bạn đọc nhanh hơn.',
          en: 'Five words from the article. Knowing them first helps you read faster.',
        },
      },
      {
        id: 'l3-g-u1-read-ex02',
        type: 'fill-blank',
        sentence: 'Interviewers like candidates who show a ___ to learn new things.',
        acceptedAnswers: ['willingness'],
        hint: '(being happy to do something)',
        explanation: {
          vi: '"a willingness to + V" = sự sẵn lòng làm gì.',
          en: '"a willingness to + verb" = being happy to do something.',
        },
      },
      {
        id: 'l3-g-u1-read-ex03',
        type: 'multiple-choice',
        question:
          'Paragraph: "Arriving early shows you are organised. Reading about the company helps too. Both tell the interviewer you take the job seriously." What is the main idea?',
        options: ['Arriving early', 'Reading about the company', 'Simple ways to show you are serious', 'Being organised at work'],
        correctIndex: 2,
        explanation: {
          vi: 'Câu cuối gom ý cả đoạn: cho thấy bạn nghiêm túc. A và B chỉ là chi tiết.',
          en: 'The last sentence sums up both details: showing you are serious.',
        },
      },
      {
        id: 'l3-g-u1-read-ex04',
        type: 'true-false',
        statement: 'Text: "Most interviews last about forty minutes." Statement: "Most interviews last less than an hour."',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '40 phút ít hơn 1 giờ: cùng nghĩa, chỉ khác cách diễn đạt.',
          en: 'Forty minutes is less than an hour: same meaning, different words.',
        },
      },
      {
        id: 'l3-g-u1-read-ex05',
        type: 'true-false',
        statement: 'Text: "Tom applied for three jobs last month." Statement: "Tom got one of the jobs."',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài chỉ nói Tom nộp đơn, không nói kết quả, nên không thể biết.',
          en: 'The text only says he applied; it says nothing about the result.',
        },
      },
      {
        id: 'l3-g-u1-read-ex06',
        type: 'true-false',
        statement: 'Text: "Very few managers cared about expensive clothes." Statement: "Most managers thought expensive clothes were important."',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"Very few cared" ngược hẳn với "most thought… important".',
          en: '"Very few cared" is the opposite of "most thought… important".',
        },
      },
      {
        id: 'l3-g-u1-read-ex07',
        type: 'multiple-choice',
        question: 'Text: "Linh works in a bank. Two of her colleagues come from Da Nang." Which statement is NOT GIVEN?',
        options: ['Linh has a job.', 'Linh works with people from Da Nang.', 'Linh enjoys her job.', 'Linh works in a bank.'],
        correctIndex: 2,
        explanation: {
          vi: 'Bài không nói Linh thích công việc hay không.',
          en: 'The text never says whether Linh enjoys her job.',
        },
      },
      {
        id: 'l3-g-u1-read-ex08',
        type: 'multiple-choice',
        question: '"A weak start could be rescued if the candidate gave strong answers later." What does "rescued" mean here?',
        options: ['saved', 'repeated', 'forgotten', 'recorded'],
        correctIndex: 0,
        explanation: {
          vi: '"rescue" = cứu vãn: khởi đầu kém vẫn có thể được "cứu" bằng câu trả lời tốt.',
          en: '"rescue" = save: a bad start can still be saved by good answers.',
        },
      },
      {
        id: 'l3-g-u1-read-ex09',
        type: 'multiple-choice',
        question: 'Where is the main idea of a paragraph USUALLY found?',
        options: ['In the first sentence', 'In the longest word', 'In the numbers', 'In the middle sentence'],
        correctIndex: 0,
        explanation: {
          vi: 'Câu chủ đề thường đứng đầu đoạn; câu sau là chi tiết, ví dụ.',
          en: 'The topic sentence usually comes first; details follow.',
        },
      },
      {
        id: 'l3-g-u1-read-ex10',
        type: 'speak-sentence',
        sentence: 'Arriving early shows that you take the interview seriously.',
        translationVi: 'Đến sớm cho thấy bạn nghiêm túc với buổi phỏng vấn.',
        explanation: {
          vi: 'Đọc rõ -s cuối "shows" /z/. Nhấn ar-RI-ving, EAR-ly, SE-ri-ous-ly.',
          en: 'Say the final /z/ in "shows". Stress ar-RI-ving, EAR-ly, SE-ri-ous-ly.',
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'First Impressions: What Really Happens in a Job Interview',
        paragraphs: [
          {
            label: 'A',
            text: 'Most of us have heard that interviewers make up their minds in the first few minutes. According to a survey of three hundred hiring managers carried out by a recruitment website, around a third said they knew within ten minutes whether a candidate was right for the job. However, the same managers also said that a weak start could be rescued if the candidate gave strong answers later. In other words, first impressions matter, but they are not the end of the story.',
          },
          {
            label: 'B',
            text: 'So what creates a good first impression? Surprisingly, it is not usually what candidates wear. Most managers in the survey said they expected people to look tidy, but very few cared about expensive clothes. What they noticed far more was punctuality and preparation. Arriving ten minutes early, knowing the name of the person you are meeting and having read about the company all send a clear message: I take this seriously.',
          },
          {
            label: 'C',
            text: 'Body language also plays a part, although its importance is often exaggerated online. A friendly greeting, eye contact and a relaxed posture help, but nobody expects a candidate to look completely calm. "Everyone is nervous," says Laura Bennett, who has interviewed staff for a group of language schools for twelve years. "I actually worry a little when someone seems too relaxed. It can look as if they don\'t really care."',
          },
          {
            label: 'D',
            text: 'The answers themselves are, of course, the most important part. Interviewers are not only listening to what you have done but to how you explain it. A useful method is to describe a real situation, the action you took and the result. For example, instead of saying "I\'m good at solving problems", a candidate might describe how they reorganised a messy delivery schedule and reduced late orders by half. Specific stories are easier to believe and easier to remember.',
          },
          {
            label: 'E',
            text: 'One question that many candidates find difficult is "What is your biggest weakness?" Bennett advises against pretending to have no weaknesses or giving a fake one, such as "I work too hard." Instead, she suggests choosing a real but manageable weakness and explaining what you are doing to improve it. "Saying that you used to find public speaking difficult, and that you joined a speaking club to get better, shows honesty and a willingness to learn."',
          },
          {
            label: 'F',
            text: 'Finally, the end of the interview matters as much as the beginning. Candidates who ask one or two thoughtful questions, about training, the team or what success looks like in the first six months, leave a stronger impression than those who simply say they have no questions. And a short thank-you email sent on the same day, while rarely decisive, is a polite way to follow up and keep your name in the interviewer\'s mind.',
          },
        ],
      },
      instructions:
        'Questions 1–3: Choose the best heading for each paragraph.\nQuestions 4–6: Write TRUE, FALSE or NOT GIVEN.\nQuestions 7–9: Choose the correct answer, or write ONE WORD AND/OR A NUMBER from the text.',
      examMinutes: 15,
      strategyTip: {
        vi: 'Làm câu chọn tiêu đề trước: đọc câu đầu mỗi đoạn. Với TRUE/FALSE/NOT GIVEN, tìm đúng câu trong bài rồi so từng ý, đừng đoán theo hiểu biết riêng.',
        en: 'Do the headings first by reading the first sentence of each paragraph. For TRUE/FALSE/NOT GIVEN, find the exact sentence and compare carefully; don\'t use your own knowledge.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u1-read-q1',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Choose the best heading for Paragraph B.',
          options: U1_HEADINGS,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B nói về đúng giờ và chuẩn bị kỹ. Quần áo chỉ được nhắc để bác bỏ.',
            en: 'B is about punctuality and preparation. Clothes are mentioned only to be dismissed.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-read-q2',
          paragraphLabel: 'D',
          number: 2,
          prompt: 'Choose the best heading for Paragraph D.',
          options: U1_HEADINGS,
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D khuyên kể tình huống thật, hành động và kết quả cụ thể.',
            en: 'D recommends describing a real situation, action and result.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-read-q3',
          paragraphLabel: 'F',
          number: 3,
          prompt: 'Choose the best heading for Paragraph F.',
          options: U1_HEADINGS,
          correctIndex: 6,
          explanation: {
            vi: 'Đoạn F nói về cuối buổi phỏng vấn và email cảm ơn, không phải sau khi được nhận.',
            en: 'F is about the end of the interview and a thank-you email, not about after getting the job.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u1-read-q4',
          paragraphLabel: 'A',
          number: 4,
          prompt: 'About a third of the managers in the survey decided within ten minutes.',
          answer: 'TRUE',
          explanation: {
            vi: '"around a third said they knew within ten minutes" = cùng nghĩa.',
            en: '"around a third said they knew within ten minutes" = same meaning.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u1-read-q5',
          paragraphLabel: 'B',
          number: 5,
          prompt: 'Most managers expected candidates to wear expensive clothes.',
          answer: 'FALSE',
          explanation: {
            vi: 'Bài nói "very few cared about expensive clothes": ngược lại.',
            en: 'The text says "very few cared about expensive clothes": the opposite.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u1-read-q6',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'Laura Bennett was very nervous at her own first job interview.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bà nói "Everyone is nervous" nhưng không kể về buổi phỏng vấn của chính mình.',
            en: 'She says "Everyone is nervous" but never mentions her own first interview.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'In the example, the candidate reduced late orders by ___.',
          acceptedAnswers: ['half', '50%', 'fifty percent', '50 percent'],
          explanation: {
            vi: '"reduced late orders by half" = giảm một nửa số đơn giao trễ.',
            en: '"reduced late orders by half".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u1-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'What does Bennett advise about the "biggest weakness" question?',
          options: [
            'Say you have no weaknesses.',
            'Say that you work too hard.',
            'Give a real weakness and explain how you are improving.',
            'Politely refuse to answer.',
          ],
          correctIndex: 2,
          explanation: {
            vi: '"choosing a real but manageable weakness and explaining what you are doing to improve it".',
            en: '"choosing a real but manageable weakness and explaining what you are doing to improve it".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u1-read-q9',
          paragraphLabel: 'F',
          number: 9,
          prompt: 'A thank-you email should be sent on the ___ day as the interview.',
          acceptedAnswers: ['same'],
          explanation: {
            vi: '"a short thank-you email sent on the same day".',
            en: '"a short thank-you email sent on the same day".',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 2 — BLOG DU LỊCH: CHUYẾN ĐI "TRỤC TRẶC" (~460 từ, đoạn A–F)
   * Kỹ năng: đọc lướt tìm số/tên (scanning), theo dõi trình tự (by the time, eventually).
   * ======================================================================== */
  {
    id: 'l3-g-u2-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 18,
    title: { vi: 'Blog du lịch: Chuyến đi "trục trặc"', en: 'Travel blog: The trip that went wrong' },
    description: {
      vi: 'Đọc bài blog kể lại chuyến đi gặp nhiều sự cố; luyện đọc lướt tìm chi tiết và theo dõi trình tự sự việc.',
      en: 'Read a blog about a trip full of problems; practise scanning for details and following the order of events.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc lướt tìm thông tin (scanning)', en: 'Scanning for details' },
        body: {
          vi: 'Khi câu hỏi có **tên riêng, số, ngày, giờ**, đừng đọc lại cả bài. **Lướt mắt** tìm đúng tên hoặc số đó (chữ viết hoa và chữ số rất dễ thấy), rồi đọc kỹ **1–2 câu xung quanh**. Lưu ý: bài có thể viết số bằng chữ ("four hours").',
          en: 'When a question has a **name, number, date or time**, don\'t reread everything. **Scan** for that name or number (capital letters and digits are easy to spot), then read **the 1–2 sentences around it** carefully. Note: numbers may be written as words ("four hours").',
        },
      },
      {
        title: { vi: 'Theo dõi trình tự sự việc', en: 'Following the order of events' },
        body: {
          vi: 'Từ báo thời gian: **as soon as, by the time, meanwhile, eventually, the next morning**.\n"**By the time** I landed, the last train **had gone**" = tàu đi **trước** khi tôi đến.\nCâu hỏi về thứ tự thường dựa vào các từ này và **quá khứ hoàn thành** (had + V3).',
          en: 'Time words: **as soon as, by the time, meanwhile, eventually, the next morning**.\n"**By the time** I landed, the last train **had gone**" = the train left **before** I arrived.\nQuestions about order often depend on these words and the **past perfect** (had + past participle).',
        },
        examples: [
          { en: 'By the time I arrived, the last train had gone.', vi: 'Lúc tôi đến nơi thì chuyến tàu cuối đã đi rồi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u2-read-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với nghĩa đúng', en: 'Match words from the blog with their meanings' },
        pairs: [
          { left: 'itinerary', right: 'a detailed plan of a journey' },
          { left: 'apologetic', right: 'showing you are sorry' },
          { left: 'firm', right: 'not changing your decision' },
          { left: 'branch', right: 'one of several shops or offices of a business' },
          { left: 'currency', right: 'the money used in a country' },
        ],
        explanation: {
          vi: 'Năm từ bạn sẽ gặp trong bài blog.',
          en: 'Five words you will meet in the blog post.',
        },
      },
      {
        id: 'l3-g-u2-read-ex02',
        type: 'multiple-choice',
        question: '"By the time we got to the platform, the train had left." What happened first?',
        options: ['We got to the platform.', 'The train left.', 'Both at the same time.', "We can't tell."],
        correctIndex: 1,
        explanation: {
          vi: '"had left" (quá khứ hoàn thành) xảy ra trước "got to".',
          en: '"had left" (past perfect) happened before "got to".',
        },
      },
      {
        id: 'l3-g-u2-read-ex03',
        type: 'fill-blank',
        sentence: 'We waited for hours. ___, at about midnight, the bus arrived.',
        acceptedAnswers: ['Eventually', 'Finally'],
        hint: '(after a long time)',
        explanation: {
          vi: '"Eventually" = cuối cùng thì (sau thời gian dài chờ đợi).',
          en: '"Eventually" = in the end, after a long time.',
        },
      },
      {
        id: 'l3-g-u2-read-ex04',
        type: 'multiple-choice',
        question: 'A question asks how many hours a flight was delayed. What should you scan for?',
        options: ['Words like "happy" and "sad"', 'Numbers or number words near "delayed"', 'The title', 'The last word of each paragraph'],
        correctIndex: 1,
        explanation: {
          vi: 'Lướt tìm số (hoặc số viết bằng chữ) gần từ khoá "delayed".',
          en: 'Scan for a number (or number word) near the key word "delayed".',
        },
      },
      {
        id: 'l3-g-u2-read-ex05',
        type: 'multiple-choice',
        question: '"The owner was apologetic but firm." What does this mean?',
        options: [
          'She was sorry but did not change her decision.',
          'She was angry and rude.',
          'She changed her mind quickly.',
          'She did not say anything.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"apologetic" = có vẻ áy náy; "firm" = cương quyết, không đổi ý.',
          en: '"apologetic" = sorry; "firm" = not changing her decision.',
        },
      },
      {
        id: 'l3-g-u2-read-ex06',
        type: 'fill-blank',
        sentence: 'Always keep some cash in the local ___ when you travel abroad.',
        acceptedAnswers: ['currency'],
        explanation: {
          vi: '"local currency" = tiền của nước bạn đến.',
          en: '"local currency" = the money of the country you visit.',
        },
      },
      {
        id: 'l3-g-u2-read-ex07',
        type: 'multiple-choice',
        question: '"It was a neighbourhood I would never have chosen." The writer means…',
        options: [
          'She chose the neighbourhood carefully.',
          "She didn't choose it, and wouldn't have chosen it herself.",
          'She will choose it next time.',
          'She hated the neighbourhood.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"would never have chosen" = (giả định) nếu tự chọn thì đã không chọn nơi đó.',
          en: '"would never have chosen" = she wouldn\'t have picked it herself.',
        },
      },
      {
        id: 'l3-g-u2-read-ex08',
        type: 'true-false',
        statement: 'Text: "I spent three of my seven days there." Statement: "She spent most of her trip there."',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '3 trên 7 ngày là ít hơn một nửa, nên "most" là sai.',
          en: 'Three of seven days is less than half, so "most" is false.',
        },
      },
      {
        id: 'l3-g-u2-read-ex09',
        type: 'arrange-words',
        translationVi: 'Lúc tôi đến nơi thì chuyến tàu cuối đã đi rồi.',
        correctSentence: 'By the time I arrived, the last train had gone.',
        extraWords: ['has', 'went'],
        explanation: {
          vi: '"By the time + quá khứ đơn, … had + V3" cho việc xảy ra trước.',
          en: '"By the time + past simple, … had + past participle" for the earlier event.',
        },
      },
      {
        id: 'l3-g-u2-read-ex10',
        type: 'speak-sentence',
        sentence: 'Most people are kinder than we expect.',
        translationVi: 'Hầu hết mọi người tử tế hơn chúng ta nghĩ.',
        explanation: {
          vi: 'Đọc rõ /st/ cuối "most" và /kt/ cuối "expect".',
          en: 'Say the /st/ at the end of "most" and the /kt/ at the end of "expect".',
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Three Things I Learned When Everything Went Wrong',
        paragraphs: [
          {
            label: 'A',
            text: 'I had been planning my first solo trip abroad for almost a year. I had saved up, booked a small guesthouse in Seoul and made a detailed itinerary for every single day. I was proud of how organised I was. Looking back, that was probably my first mistake: I had planned for everything except things going wrong.',
          },
          {
            label: 'B',
            text: 'The problems started before I even left Vietnam. My flight was delayed by four hours because of a storm, so by the time I landed it was nearly midnight and the last airport train had gone. I had very little Korean money, and my phone battery was at three percent. Standing in the arrivals hall, I felt completely lost.',
          },
          {
            label: 'C',
            text: 'That was when I met Joon, a university student who was waiting for his sister\'s flight. He noticed me staring at a map with a worried face and asked if I needed help. He showed me where to catch a night bus, wrote the name of my stop in Korean on a piece of paper and even lent me his charger for twenty minutes. I never saw him again, but I still think of him whenever I see a lost tourist in Hanoi.',
          },
          {
            label: 'D',
            text: 'The next morning brought a new surprise. The guesthouse had no record of my booking. The owner was apologetic but firm: there were no rooms available. I showed her my confirmation email, and after a long phone call she discovered that the booking website had sent my reservation to their other branch, on the opposite side of the city. Eventually she called a taxi for me and refused to let me pay for it.',
          },
          {
            label: 'E',
            text: 'I lost a whole day of my perfect itinerary, and at first I was annoyed. But the other guesthouse was in a neighbourhood I would never have chosen, full of small family restaurants and quiet streets. I ended up spending three of my seven days there, and those were the best days of the trip.',
          },
          {
            label: 'F',
            text: 'So what did I learn? First, always keep some cash in the local currency and a power bank in your hand luggage. Second, an itinerary is a guide, not a rule; some of the best experiences are the ones you don\'t plan. And third, never be too proud to ask for help. Most people are kinder than we expect, and one day, you will be the one who can help.',
          },
        ],
      },
      instructions:
        'Questions 1–9. Choose the correct answer, write TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER from the text.',
      examMinutes: 15,
      strategyTip: {
        vi: 'Câu hỏi đi theo thứ tự bài. Với câu có số hoặc tên, lướt tìm số/tên đó trước rồi đọc kỹ câu xung quanh.',
        en: 'The questions follow the order of the text. For number or name questions, scan for them first, then read around them carefully.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u2-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'What does Linh think was her "first mistake"?',
          options: [
            "She didn't save enough money.",
            'She planned for everything except problems.',
            'She booked the wrong guesthouse.',
            'She travelled alone.',
          ],
          correctIndex: 1,
          explanation: {
            vi: '"I had planned for everything except things going wrong."',
            en: '"I had planned for everything except things going wrong."',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-read-q2',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Her flight was delayed by ___ hours.',
          acceptedAnswers: ['4', 'four'],
          explanation: {
            vi: '"delayed by four hours because of a storm".',
            en: '"delayed by four hours because of a storm".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u2-read-q3',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Linh took the last airport train into the city.',
          answer: 'FALSE',
          explanation: {
            vi: '"the last airport train had gone": tàu đã đi trước khi cô đến.',
            en: '"the last airport train had gone" before she landed.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u2-read-q4',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'Joon was at the airport to meet a member of his family.',
          answer: 'TRUE',
          explanation: {
            vi: '"waiting for his sister\'s flight": chờ em/chị gái = người trong gia đình.',
            en: '"waiting for his sister\'s flight": his sister is family.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u2-read-q5',
          paragraphLabel: 'C',
          number: 5,
          prompt: 'How did Joon help Linh?',
          options: [
            'He drove her to the guesthouse.',
            'He gave her some Korean money.',
            'He showed her the night bus and lent her a charger.',
            'He phoned the guesthouse for her.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Anh chỉ chỗ bắt xe buýt đêm, viết tên điểm dừng và cho mượn sạc.',
            en: 'He showed her the night bus, wrote her stop, and lent his charger.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u2-read-q6',
          paragraphLabel: 'D',
          number: 6,
          prompt: "The booking had been sent to the guesthouse's other ___.",
          acceptedAnswers: ['branch'],
          explanation: {
            vi: '"sent my reservation to their other branch" = cơ sở khác.',
            en: '"sent my reservation to their other branch".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u2-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'Linh paid for the taxi to the other guesthouse.',
          answer: 'FALSE',
          explanation: {
            vi: 'Chủ nhà nghỉ "refused to let me pay for it": không cho cô trả tiền.',
            en: 'The owner "refused to let me pay for it".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u2-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'Linh spent more than half of her trip in the new neighbourhood.',
          answer: 'FALSE',
          explanation: {
            vi: '3 trên 7 ngày là chưa tới một nửa chuyến đi.',
            en: 'Three of seven days is less than half the trip.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u2-read-q9',
          paragraphLabel: 'F',
          number: 9,
          prompt: 'Which piece of advice does Linh NOT give?',
          options: [
            'Carry some local cash.',
            'Keep a power bank in your hand luggage.',
            'Always book through a website.',
            "Don't be too proud to ask for help.",
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Linh không khuyên đặt phòng qua website; chính website đã gây ra lỗi.',
            en: 'She never recommends booking websites; one actually caused her problem.',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 3 — BÀI BÌNH LUẬN: THƯ VIỆN KHU PHỐ (~450 từ, đoạn A–F)
   * Kỹ năng: phân biệt sự thật / ý kiến, nhận ra ý phản đối mà tác giả đáp lại,
   *          chọn câu tóm tắt đúng nhất.
   * ======================================================================== */
  {
    id: 'l3-g-u3-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 18,
    title: { vi: 'Bài bình luận: Sự thật hay ý kiến?', en: 'Opinion piece: fact or opinion?' },
    description: {
      vi: 'Đọc bài bình luận về thư viện khu phố; phân biệt sự thật với ý kiến và chọn câu tóm tắt đúng.',
      en: 'Read an opinion piece about a neighbourhood library; separate facts from opinions and choose the best summary.',
    },
    teachingCards: [
      {
        title: { vi: 'Bài bình luận được xây thế nào?', en: 'How an opinion piece is built' },
        body: {
          vi: 'Thường gồm: **quan điểm** của người viết (đoạn đầu) → **lý do + bằng chứng** (số liệu, ví dụ) → **ý phản đối** và cách người viết đáp lại ("Some people argue… But…") → **kết luận / lời kêu gọi**. Tìm câu nêu quan điểm trước, các đoạn sau sẽ dễ hiểu hơn.',
          en: 'Usually: the writer\'s **opinion** (first paragraph) → **reasons + evidence** (numbers, examples) → an **opposing view** and the writer\'s reply ("Some people argue… But…") → a **conclusion or call to action**. Find the opinion sentence first; the rest becomes easier.',
        },
      },
      {
        title: { vi: 'Tóm tắt trong 3 câu', en: 'Summarising in three sentences' },
        body: {
          vi: '1) **Chủ đề + quan điểm**: The writer argues that…\n2) **Lý do chính**: The main reason is…\n3) **Kết luận**: The writer ends by…\nDùng **từ của bạn**, bỏ ví dụ nhỏ và số liệu phụ. Câu tóm tắt tốt phải đúng **toàn bài**, không chỉ một đoạn.',
          en: '1) **Topic + opinion**: The writer argues that…\n2) **Main reason**: The main reason is…\n3) **Conclusion**: The writer ends by…\nUse **your own words** and leave out small examples and extra numbers. A good summary fits **the whole text**, not one paragraph.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u3-read-ex01',
        type: 'multiple-choice',
        question: 'Which sentence is a FACT?',
        options: [
          'The museum is the most beautiful building in the city.',
          'The museum opened in 1998.',
          'Everyone should visit the museum.',
          'The museum is surprisingly boring.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Năm mở cửa kiểm chứng được. Ba câu kia là đánh giá cá nhân.',
          en: 'An opening year can be checked. The others are personal judgements.',
        },
      },
      {
        id: 'l3-g-u3-read-ex02',
        type: 'multiple-choice',
        question: 'Which phrase usually signals an OPINION?',
        options: ['in 2019', 'according to the report', 'I strongly believe', 'three hundred people'],
        correctIndex: 2,
        explanation: {
          vi: '"I strongly believe" = người viết nêu suy nghĩ của mình.',
          en: '"I strongly believe" introduces the writer\'s own view.',
        },
      },
      {
        id: 'l3-g-u3-read-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với nghĩa đúng', en: 'Match words from the article with their meanings' },
        pairs: [
          { left: 'argue', right: 'say something is true and give reasons' },
          { left: 'figures', right: 'official numbers or statistics' },
          { left: 'valuable', right: 'very useful or important' },
          { left: 'job seeker', right: 'a person looking for work' },
          { left: 'confident', right: 'sure that something is true' },
        ],
        explanation: {
          vi: 'Năm từ quan trọng trong bài bình luận.',
          en: 'Five important words from the opinion piece.',
        },
      },
      {
        id: 'l3-g-u3-read-ex04',
        type: 'fill-blank',
        sentence: 'In a summary, you can write: "The writer ___ that the library should stay open."',
        acceptedAnswers: ['argues', 'believes', 'thinks', 'claims', 'says', 'feels'],
        explanation: {
          vi: 'Động từ tường thuật quan điểm: argues, believes, thinks… (thêm -s vì "The writer").',
          en: 'Reporting verbs for opinions: argues, believes, thinks… (with -s after "The writer").',
        },
      },
      {
        id: 'l3-g-u3-read-ex05',
        type: 'multiple-choice',
        question: 'What is the BEST way to summarise a text?',
        options: [
          'Copy the first paragraph',
          'Use your own words and keep only the main ideas',
          'Include every number in the text',
          'Add your own opinion',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Tóm tắt = ý chính, bằng từ của bạn, không thêm ý kiến riêng.',
          en: 'A summary = main ideas, in your words, without your own opinion.',
        },
      },
      {
        id: 'l3-g-u3-read-ex06',
        type: 'true-false',
        statement: 'If an article says "Some people argue that libraries are no longer needed", the WRITER must think libraries are no longer needed.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đây là ý của người khác; người viết thường đáp lại ý này ngay sau đó.',
          en: 'This is someone else\'s view; the writer usually replies to it next.',
        },
      },
      {
        id: 'l3-g-u3-read-ex07',
        type: 'multiple-choice',
        question: '"You cannot download a quiet desk." What does the writer mean?',
        options: [
          'Desks are too expensive.',
          'Some things a library offers cannot be found online.',
          'The internet is too slow.',
          'The library needs new desks.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Chỗ ngồi yên tĩnh là thứ không thể "tải về" từ mạng.',
          en: 'A quiet place to sit is something the internet cannot give you.',
        },
      },
      {
        id: 'l3-g-u3-read-ex08',
        type: 'fill-blank',
        sentence: 'Borrowing has ___ by forty percent, but visitor numbers have risen.',
        acceptedAnswers: ['fallen', 'dropped', 'decreased', 'gone down'],
        hint: '(gone down)',
        explanation: {
          vi: '"but … risen" cho biết vế đầu là giảm: fallen / dropped.',
          en: '"but … risen" shows the first part went down: fallen / dropped.',
        },
      },
      {
        id: 'l3-g-u3-read-ex09',
        type: 'multiple-choice',
        question: '"This is partly true." The writer…',
        options: ['completely agrees', 'agrees a little, but not completely', 'strongly disagrees', 'has no opinion'],
        correctIndex: 1,
        explanation: {
          vi: '"partly" = một phần: đồng ý một phần, sau đó sẽ có "but".',
          en: '"partly" = in part: some agreement, usually followed by "but".',
        },
      },
      {
        id: 'l3-g-u3-read-ex10',
        type: 'speak-sentence',
        sentence: 'The writer argues that the library should change, not close.',
        translationVi: 'Người viết cho rằng thư viện nên thay đổi chứ không nên đóng cửa.',
        explanation: {
          vi: 'Đọc rõ /z/ cuối "argues". Nhấn CHANGE và CLOSE để tạo tương phản.',
          en: 'Say the final /z/ in "argues". Stress CHANGE and CLOSE for contrast.',
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Our Library Is Not Dying. It Is Changing.',
        paragraphs: [
          {
            label: 'A',
            text: 'Last month, the managers of our neighbourhood library said it might close next year. Their reason is simple: book borrowing has fallen by around forty percent in the last five years. I understand their worry, and the numbers are real. But I strongly believe that closing the library would be a serious mistake. It is not dying; it is changing.',
          },
          {
            label: 'B',
            text: 'Anyone who visits on a weekday afternoon can see this. While fewer people borrow books, the building is rarely empty. According to the library\'s own figures, the number of visitors actually rose last year, to more than three hundred a day. Students come to study because their homes are too small or too noisy. Older residents come to read the newspapers and chat. Parents bring young children to the free story sessions on Saturday mornings.',
          },
          {
            label: 'C',
            text: 'In other words, people are using the library in a different way. For many of them, it is the only place in the neighbourhood where they can sit for hours without paying for a coffee. In a city where space is expensive, that is not a small thing. It is, in my view, one of the most valuable services our area has.',
          },
          {
            label: 'D',
            text: 'Some people argue that libraries are no longer needed because everything is online. This is partly true: you can read the news or an e-book on your phone. But not everyone has a good internet connection or a quiet place to use it. Last year, job seekers used the library\'s computers to write more than two thousand job applications. You cannot download a quiet desk.',
          },
          {
            label: 'E',
            text: 'Of course, the library cannot stay exactly as it is. It should stay open later in the evenings, when working people are free, and it could rent part of its space for small classes, from cooking to computer skills, to raise money. Other libraries have tried this with good results. A library that people use is much easier to keep open than one that only holds books.',
          },
          {
            label: 'F',
            text: 'Before any decision is made, I would ask the managers to do one simple thing: talk to the people who actually use the building. Spend a Saturday morning there. Count the children, the students and the grandparents. I am confident they will see what I see: not an old building full of unread books, but the living room of our neighbourhood.',
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct answer, decide if a sentence is a FACT or an OPINION, write TRUE, FALSE or NOT GIVEN, or write ONE WORD AND/OR A NUMBER from the text.',
      examMinutes: 15,
      strategyTip: {
        vi: 'Đọc đoạn A để tìm quan điểm chính trước. Với câu FACT/OPINION, hỏi: "Câu này có kiểm chứng được không, hay là cách nghĩ của người viết?"',
        en: 'Read paragraph A first to find the main opinion. For FACT/OPINION, ask: "Can this be checked, or is it what the writer thinks?"',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u3-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: "What is the writer's main opinion?",
          options: [
            'The library should close next year.',
            'The library should stay open but change.',
            'Book borrowing has increased.',
            'Libraries are only useful for students.',
          ],
          correctIndex: 1,
          explanation: {
            vi: '"closing the library would be a serious mistake… it is changing" và đoạn E đề xuất thay đổi.',
            en: '"closing… would be a serious mistake… it is changing", and E suggests changes.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-read-q2',
          paragraphLabel: 'A',
          number: 2,
          prompt: 'FACT or OPINION? "Book borrowing has fallen by around forty percent in the last five years."',
          options: ['Fact', 'Opinion'],
          correctIndex: 0,
          explanation: {
            vi: 'Là số liệu kiểm chứng được, chính người viết cũng nói "the numbers are real".',
            en: 'It is a checkable number; the writer even says "the numbers are real".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-read-q3',
          paragraphLabel: 'C',
          number: 3,
          prompt: 'FACT or OPINION? "It is one of the most valuable services our area has."',
          options: ['Fact', 'Opinion'],
          correctIndex: 1,
          explanation: {
            vi: '"in my view" và "most valuable" là dấu hiệu ý kiến.',
            en: '"in my view" and "most valuable" signal an opinion.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u3-read-q4',
          paragraphLabel: 'B',
          number: 4,
          prompt: 'The library runs free story sessions for children on Saturday mornings.',
          answer: 'TRUE',
          explanation: {
            vi: '"free story sessions on Saturday mornings".',
            en: '"free story sessions on Saturday mornings".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u3-read-q5',
          paragraphLabel: 'B',
          number: 5,
          prompt: 'Most of the library\'s visitors are students.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bài kể học sinh, người lớn tuổi, phụ huynh nhưng không nói nhóm nào đông nhất.',
            en: 'Students, older residents and parents are listed, but no group is called the largest.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u3-read-q6',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'Last year, job seekers wrote more than ___ applications on the library computers.',
          acceptedAnswers: ['2000', '2,000', 'two thousand'],
          explanation: {
            vi: '"more than two thousand job applications".',
            en: '"more than two thousand job applications".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u3-read-q7',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'The writer believes the library should stay exactly the same.',
          answer: 'FALSE',
          explanation: {
            vi: '"the library cannot stay exactly as it is": ngược lại.',
            en: '"the library cannot stay exactly as it is": the opposite.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u3-read-q8',
          number: 8,
          prompt: 'Which is the BEST summary of the whole article?',
          options: [
            'Libraries are old-fashioned, and people should read online instead.',
            'Although fewer books are borrowed, the library is still busy and useful, so it should change rather than close.',
            'The library managers have already decided to close the building.',
            'Students need quieter homes, so the city should build bigger flats.',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Câu B gói đủ: sách mượn ít đi, nhưng thư viện vẫn đông và hữu ích, nên cần đổi mới.',
            en: 'Option B covers the whole text: fewer loans, still busy and useful, so change not close.',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 4 — REVIEW PHIM "THE LAST FERRY" (phim tự đặt tên, ~420 từ, đoạn A–F)
   * Kỹ năng: nhận ra cấu trúc review, ngôn ngữ khen – chê, từ chuyển ý (however, despite).
   * ======================================================================== */
  {
    id: 'l3-g-u4-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 18,
    title: { vi: 'Đọc bài review phim', en: 'Reading a film review' },
    description: {
      vi: 'Đọc bài review một bộ phim; nhận ra cấu trúc review, điểm khen – chê và lời khuyên của người viết.',
      en: 'Read a film review; notice how it is organised, what the writer praises and criticises, and the final recommendation.',
    },
    teachingCards: [
      {
        title: { vi: 'Cấu trúc một bài review', en: 'How a review is organised' },
        body: {
          vi: '1) **Giới thiệu**: tên phim, thể loại, bối cảnh.\n2) **Nội dung** (không tiết lộ kết thúc).\n3) **Điểm mạnh**: diễn xuất, nhạc, hình ảnh.\n4) **Điểm yếu**.\n5) **Kết luận** + ai nên xem.\nBiết cấu trúc này, bạn đoán được thông tin nằm ở đoạn nào trước khi đọc kỹ.',
          en: '1) **Introduction**: title, type of film, setting.\n2) **Story** (no spoilers).\n3) **Strengths**: acting, music, images.\n4) **Weaknesses**.\n5) **Verdict** + who should watch it.\nKnowing this, you can guess which paragraph has the answer before reading closely.',
        },
      },
      {
        title: { vi: 'Ngôn ngữ khen – chê', en: 'The language of praise and criticism' },
        body: {
          vi: '**Khen**: stunning, moving, beautifully shot, a stand-out performance.\n**Chê nhẹ**: a little slow, drags, doesn\'t quite work, never properly developed.\n**Từ chuyển ý** báo hiệu ý **trái ngược**: **However, …** / **Although** + câu / **Despite** + danh từ hoặc V-ing.',
          en: '**Praise**: stunning, moving, beautifully shot, a stand-out performance.\n**Gentle criticism**: a little slow, drags, doesn\'t quite work, never properly developed.\n**Contrast words** signal a change of direction: **However, …** / **Although** + clause / **Despite** + noun or -ing.',
        },
        examples: [
          { en: 'Despite a slow start, the film is very moving.', vi: 'Dù mở đầu hơi chậm, bộ phim rất cảm động.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u4-read-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với nghĩa đúng', en: 'Match words from the review with their meanings' },
        pairs: [
          { left: 'cast', right: 'all the actors in a film' },
          { left: 'subplot', right: 'a smaller, second story in a film' },
          { left: 'convincing', right: 'making you believe it is real' },
          { left: 'drag', right: 'feel slow and boring' },
          { left: 'twist', right: 'a sudden surprise in a story' },
        ],
        explanation: {
          vi: 'Năm từ hay gặp trong review phim.',
          en: 'Five words you often see in film reviews.',
        },
      },
      {
        id: 'l3-g-u4-read-ex02',
        type: 'multiple-choice',
        question: '"Despite a slow start, the series is excellent." Overall, the writer thinks the series is…',
        options: ['bad because it starts slowly', 'excellent', 'slow and boring', 'too short'],
        correctIndex: 1,
        explanation: {
          vi: '"Despite" đưa ra điểm yếu nhỏ; ý chính nằm ở vế sau: excellent.',
          en: '"Despite" gives a small weakness; the main point comes after: excellent.',
        },
      },
      {
        id: 'l3-g-u4-read-ex03',
        type: 'fill-blank',
        sentence: '___ the long running time, I enjoyed every minute.',
        acceptedAnswers: ['Despite', 'In spite of'],
        explanation: {
          vi: 'Phía sau là cụm danh từ (the long running time) nên dùng Despite.',
          en: 'A noun phrase follows (the long running time), so use Despite.',
        },
      },
      {
        id: 'l3-g-u4-read-ex04',
        type: 'multiple-choice',
        question: 'In a review, where do you usually find who should watch the film?',
        options: ['In the first paragraph', 'In the story summary', 'In the conclusion', 'In the list of actors'],
        correctIndex: 2,
        explanation: {
          vi: 'Lời gợi ý ai nên xem thường nằm ở đoạn kết luận.',
          en: 'Recommendations usually come in the final paragraph.',
        },
      },
      {
        id: 'l3-g-u4-read-ex05',
        type: 'multiple-choice',
        question: '"The middle section drags." The middle part is…',
        options: ['exciting', 'too slow', 'very short', 'funny'],
        correctIndex: 1,
        explanation: {
          vi: '"drag" = kéo lê: phần đó chậm và hơi chán.',
          en: '"drag" = feel slow and boring.',
        },
      },
      {
        id: 'l3-g-u4-read-ex06',
        type: 'multiple-choice',
        question: 'Which phrase is PRAISE?',
        options: [
          'never properly developed',
          'a stand-out performance',
          'at least twenty minutes too long',
          'feels as if it belongs in a different film',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"stand-out" = nổi bật, xuất sắc hơn hẳn. Ba cụm kia là lời chê.',
          en: '"stand-out" = excellent, better than the rest. The others criticise.',
        },
      },
      {
        id: 'l3-g-u4-read-ex07',
        type: 'fill-blank',
        sentence: 'The film is beautifully ___: every scene looks like a painting.',
        acceptedAnswers: ['shot', 'filmed'],
        explanation: {
          vi: '"beautifully shot" = quay rất đẹp (shoot – shot – shot).',
          en: '"beautifully shot" = filmed beautifully (shoot – shot – shot).',
        },
      },
      {
        id: 'l3-g-u4-read-ex08',
        type: 'true-false',
        statement: 'Text: "He says very little, yet a single look tells you everything." Statement: "The actor talks a lot in the film."',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"says very little" = nói rất ít, ngược với "talks a lot".',
          en: '"says very little" is the opposite of "talks a lot".',
        },
      },
      {
        id: 'l3-g-u4-read-ex09',
        type: 'multiple-choice',
        question: '"By the end, I was surprisingly moved." The writer…',
        options: [
          'expected to cry and did',
          "didn't expect to feel emotional, but did",
          'moved to another seat',
          'felt nothing',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"surprisingly" = không ngờ; "moved" = xúc động.',
          en: '"surprisingly" = unexpectedly; "moved" = emotionally touched.',
        },
      },
      {
        id: 'l3-g-u4-read-ex10',
        type: 'speak-sentence',
        sentence: 'Despite a few weaknesses, the film is well worth watching.',
        translationVi: 'Dù có vài điểm yếu, bộ phim rất đáng xem.',
        explanation: {
          vi: 'Đọc rõ /ɪz/ cuối "weaknesses" và /θ/ trong "worth".',
          en: 'Say the final /ɪz/ in "weaknesses" and the /θ/ in "worth".',
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Review: The Last Ferry (four stars out of five)',
        paragraphs: [
          {
            label: 'A',
            text: 'Some films shout for your attention. The Last Ferry, the second feature from a young director, quietly earns it. Set in a small river town in southern Vietnam, this gentle family drama follows Mr Sau, a ferryman in his sixties, during his final month of work before a new bridge opens and his little boat is no longer needed. It is the kind of film that stays with you for days.',
          },
          {
            label: 'B',
            text: 'The plot is simple, and I won\'t spoil it. Mr Sau\'s daughter, who moved to the city years ago, comes home with her teenage son, who would much rather be on his phone than on a slow boat. Over four weeks, the three of them slowly learn to understand each other. Nothing dramatic happens. There are no car chases or big twists. But by the end, I was surprisingly moved.',
          },
          {
            label: 'C',
            text: 'Much of the film\'s power comes from its cast. The actor who plays Mr Sau, a former theatre performer making his first film, gives a stand-out performance. He says very little, yet a single look tells you everything about his pride and his fear of being forgotten. The young actor playing his grandson is also convincing, especially in a lovely scene where the two of them repair the boat\'s engine together.',
          },
          {
            label: 'D',
            text: 'The film is also beautifully shot. The camera spends long moments on the river at sunrise, on markets full of fruit, and on the faces of passengers who have used the ferry all their lives. The soundtrack, mostly a single guitar, matches these images perfectly and never tells you how to feel. Even the slow rhythm of the boat\'s engine becomes part of the music.',
          },
          {
            label: 'E',
            text: 'However, the film is not perfect. The middle section drags, and at almost two hours and twenty minutes, it is at least twenty minutes too long. A subplot about the daughter\'s job in the city is never properly developed and feels as if it belongs in a different film. Viewers who prefer fast-moving stories may find their attention wandering.',
          },
          {
            label: 'F',
            text: 'Despite these weaknesses, The Last Ferry is well worth watching. It is a warm, honest film about change, family and the things we lose when life gets faster. Watch it with your parents or grandparents, and maybe put your phone away first. It may not change your life, but it will probably make you want to call home.',
          },
        ],
      },
      instructions:
        'Questions 1–8. Choose the correct answer, write TRUE, FALSE or NOT GIVEN, or write ONE WORD from the text.',
      examMinutes: 15,
      strategyTip: {
        vi: 'Dùng cấu trúc review để đoán vị trí đáp án: diễn xuất ở đoạn C, nhạc và hình ảnh ở D, điểm yếu sau "However" ở E.',
        en: 'Use the review structure to find answers fast: acting in C, images and music in D, weaknesses after "However" in E.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u4-read-q1',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'What is the film mainly about?',
          options: [
            'A city family on holiday',
            "An old ferryman's last month of work",
            'A team building a new bridge',
            'A teenager who becomes a ferryman',
          ],
          correctIndex: 1,
          explanation: {
            vi: '"follows Mr Sau, a ferryman… during his final month of work".',
            en: '"follows Mr Sau, a ferryman… during his final month of work".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-read-q2',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Which paragraph describes the story without giving away the ending?',
          options: ['Paragraph A', 'Paragraph B', 'Paragraph D', 'Paragraph F'],
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: "The plot is simple, and I won\'t spoil it", rồi kể nội dung chính.',
            en: 'B: "The plot is simple, and I won\'t spoil it", then the main story.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u4-read-q3',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'The film contains several exciting action scenes.',
          answer: 'FALSE',
          explanation: {
            vi: '"Nothing dramatic happens. There are no car chases or big twists."',
            en: '"Nothing dramatic happens. There are no car chases or big twists."',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u4-read-q4',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'The Last Ferry is the first film for the actor who plays Mr Sau.',
          answer: 'TRUE',
          explanation: {
            vi: '"a former theatre performer making his first film".',
            en: '"a former theatre performer making his first film".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u4-read-q5',
          paragraphLabel: 'C',
          number: 5,
          prompt: 'The young actor has won a prize for this role.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Bài khen diễn viên trẻ "convincing" nhưng không nhắc giải thưởng nào.',
            en: 'He is called "convincing", but no prize is mentioned.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u4-read-q6',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'The soundtrack is played mostly on one ___.',
          acceptedAnswers: ['guitar'],
          explanation: {
            vi: '"The soundtrack, mostly a single guitar".',
            en: '"The soundtrack, mostly a single guitar".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-read-q7',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'What does the reviewer criticise?',
          options: ['The acting and the music', 'The length and a weak subplot', 'The ending and the camera work', 'The price of tickets'],
          correctIndex: 1,
          explanation: {
            vi: 'Sau "However": quá dài 20 phút và mạch phụ chưa được phát triển.',
            en: 'After "However": twenty minutes too long and an undeveloped subplot.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u4-read-q8',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Who does the reviewer suggest watching the film with?',
          options: ['Young children', 'Friends who like action films', 'Older family members', 'Nobody: watch it alone'],
          correctIndex: 2,
          explanation: {
            vi: '"Watch it with your parents or grandparents" = người lớn tuổi trong gia đình.',
            en: '"Watch it with your parents or grandparents" = older family members.',
          },
        },
      ],
    },
    miniTest: [],
  },

  /* ==========================================================================
   * CHẶNG 5 — TẠP CHÍ: THÓI QUEN NHỎ, THAY ĐỔI LỚN (~430 từ, đoạn A–E)
   * Bốn người kể: Minh (sức khoẻ), Sarah (tiền bạc), Tom (bạn cùng nhà), Lan (điện thoại trong bữa tối)
   * Kỹ năng: dạng "Người nào…?" (matching information), nhận ra paraphrase.
   * ======================================================================== */
  {
    id: 'l3-g-u5-read',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 18,
    title: { vi: 'Tạp chí: Thói quen nhỏ, thay đổi lớn', en: 'Magazine: Small habits, big changes' },
    description: {
      vi: 'Đọc chuyện của bốn người về sức khoẻ, tiền bạc và công nghệ trong nhà; luyện dạng câu hỏi "Người nào…?".',
      en: 'Read four people\'s stories about health, money and technology at home; practise "Which person…?" questions.',
    },
    teachingCards: [
      {
        title: { vi: 'Dạng "Người nào…?"', en: '"Which person…?" questions' },
        body: {
          vi: 'Bài có nhiều người kể, câu hỏi hỏi **ai nói hoặc làm gì**. Cách làm: đọc nhanh từng đoạn, **ghi 2–3 từ khoá cạnh tên** mỗi người (VD Minh: doctor, walking). Rồi mới đọc câu hỏi. Lưu ý: **một người có thể được chọn nhiều lần**.',
          en: 'The text has several people, and questions ask **who said or did what**. First read each section quickly and **note 2–3 key words next to each name** (e.g. Minh: doctor, walking). Then read the questions. Note: **one person can be the answer more than once**.',
        },
      },
      {
        title: { vi: 'Tìm ý giống, không tìm từ giống', en: 'Match meaning, not words' },
        body: {
          vi: 'Câu hỏi: "Who **found the change hard at the beginning**?"\nBài viết: "**The first two weeks were a nightmare.**"\nHai câu không chung từ nào nhưng **cùng ý**. Đây gọi là **paraphrase**. Cẩn thận với đáp án có **từ giống hệt** câu hỏi: đó thường là bẫy.',
          en: 'Question: "Who **found the change hard at the beginning**?"\nText: "**The first two weeks were a nightmare.**"\nNo words are shared, but the **meaning is the same**: a **paraphrase**. Be careful with options that repeat **exactly the same words** as the question; they are often traps.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u5-read-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với nghĩa đúng', en: 'Match words from the article with their meanings' },
        pairs: [
          { left: 'blood pressure', right: 'how strongly blood moves through your body' },
          { left: 'doubtful', right: 'not sure something will work' },
          { left: 'flatmate', right: 'a person you share a flat with' },
          { left: 'takeaway', right: 'cooked food you buy and eat at home' },
          { left: 'nightmare', right: 'a very bad or difficult experience' },
        ],
        explanation: {
          vi: 'Năm từ xuất hiện trong bốn câu chuyện của bài.',
          en: 'Five words from the four stories in the article.',
        },
      },
      {
        id: 'l3-g-u5-read-ex02',
        type: 'multiple-choice',
        question: 'Question: "Who found the change difficult at the beginning?" Which sentence matches?',
        options: [
          '"It\'s only twenty-five minutes a day."',
          '"The first two weeks were a nightmare."',
          '"We talk more now."',
          '"I have savings."',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"first two weeks" = at the beginning; "nightmare" = difficult.',
          en: '"first two weeks" = at the beginning; "nightmare" = difficult.',
        },
      },
      {
        id: 'l3-g-u5-read-ex03',
        type: 'multiple-choice',
        question: '"I\'ll admit I was doubtful." The speaker…',
        options: ['was sure it would work', 'was not sure it would work', "didn't try it", 'was angry'],
        correctIndex: 1,
        explanation: {
          vi: '"doubtful" = nghi ngờ, không chắc sẽ hiệu quả.',
          en: '"doubtful" = not sure it would work.',
        },
      },
      {
        id: 'l3-g-u5-read-ex04',
        type: 'fill-blank',
        sentence: 'We share ___ the jobs every Sunday, so everyone knows what to do.',
        acceptedAnswers: ['out'],
        explanation: {
          vi: '"share out" = chia phần việc cho mọi người.',
          en: '"share out" = divide something between people.',
        },
      },
      {
        id: 'l3-g-u5-read-ex05',
        type: 'multiple-choice',
        question: '"We get on so much better now." This means…',
        options: ['They argue more.', 'They have a better relationship.', 'They moved house.', 'They get on the bus together.'],
        correctIndex: 1,
        explanation: {
          vi: '"get on (well)" = hợp nhau, quan hệ tốt (đã học ở bài từ vựng).',
          en: '"get on (well)" = have a good relationship (from the vocabulary lesson).',
        },
      },
      {
        id: 'l3-g-u5-read-ex06',
        type: 'fill-blank',
        sentence: 'I used to ___ out with my brother over silly things.',
        acceptedAnswers: ['fall'],
        explanation: {
          vi: '"used to + V nguyên mẫu": used to fall out = trước đây hay cãi nhau.',
          en: '"used to + base verb": used to fall out = argued often in the past.',
        },
      },
      {
        id: 'l3-g-u5-read-ex07',
        type: 'multiple-choice',
        question: 'What is the best first step for "Which person…?" questions?',
        options: [
          'Read the questions only',
          "Note 2–3 key words next to each person's name",
          'Translate every word',
          'Read only the first paragraph',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Ghi từ khoá cạnh tên giúp bạn so khớp câu hỏi nhanh hơn.',
          en: 'Key words next to each name help you match questions quickly.',
        },
      },
      {
        id: 'l3-g-u5-read-ex08',
        type: 'true-false',
        statement: 'Text: "I started getting off the bus two stops early." Statement: "He stopped using the bus completely."',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Anh vẫn đi xe buýt, chỉ xuống sớm hai trạm để đi bộ.',
          en: 'He still takes the bus; he just gets off two stops early.',
        },
      },
      {
        id: 'l3-g-u5-read-ex09',
        type: 'multiple-choice',
        question: '"I always seemed to be short at the end of the month." "Short" here means…',
        options: ['without enough money', 'very tired', 'having extra money', 'working short hours'],
        correctIndex: 0,
        explanation: {
          vi: '"be short (of money)" = thiếu tiền.',
          en: '"be short (of money)" = not have enough money.',
        },
      },
      {
        id: 'l3-g-u5-read-ex10',
        type: 'speak-sentence',
        sentence: 'Small changes can make a big difference to your health.',
        translationVi: 'Những thay đổi nhỏ có thể tạo khác biệt lớn cho sức khoẻ của bạn.',
        explanation: {
          vi: 'Đọc rõ /ɪz/ cuối "changes" và /θ/ cuối "health".',
          en: 'Say /ɪz/ at the end of "changes" and /θ/ at the end of "health".',
        },
      },
    ],
    readingTask: {
      passage: {
        title: 'Small Habits, Big Changes: Four Readers\' Stories',
        paragraphs: [
          {
            label: 'A',
            text: 'We asked readers to tell us about one small change that made a big difference to their everyday lives. We received more than six hundred replies. Here are four of our favourites.',
          },
          {
            label: 'B',
            text: 'Minh, 34, accountant: "For years, I told myself I was too busy to exercise. Then my doctor warned me that my blood pressure was getting too high. I didn\'t join a gym, because I knew I would never go. Instead, I started getting off the bus two stops early and walking the rest of the way to the office. It\'s only twenty-five minutes a day, but after six months my blood pressure is back to normal and I\'ve lost five kilos. Best of all, I arrive at work with a clear head."',
          },
          {
            label: 'C',
            text: 'Sarah, 41, nurse: "My problem was money, or rather, where it went. I earned a good salary but always seemed to be short at the end of the month. My teenage son suggested a budgeting app, and I\'ll admit I was doubtful. The first two weeks were a nightmare. Seeing every coffee and taxi written down was embarrassing! But it worked. I\'ve cut my spending on takeaways by half, and for the first time in my life, I have savings. I\'ve even started saving up for a family holiday."',
          },
          {
            label: 'D',
            text: 'Tom, 29, teacher: "I used to fall out with my flatmates all the time over silly things: whose turn it was to clean the kitchen, who had eaten whose food. Last year we started a simple rule: a ten-minute meeting every Sunday evening with a cup of tea. We share out the jobs for the week and talk about anything that\'s bothering us before it becomes a big argument. It sounds a bit formal, I know, but we get on so much better now. We\'ve actually become proper friends."',
          },
          {
            label: 'E',
            text: 'Lan, 52, shop owner: "In our house, everyone used to eat dinner with one eye on a screen. My husband watched the news, the kids were on their phones, and I was answering messages from customers. So I bought a small basket, and now all phones go into it before dinner. The kids complained loudly for about a week. Now they actually remind me. We talk more, we eat more slowly, and I\'ve noticed I sleep better on the nights I don\'t check my work messages after eight."',
          },
        ],
      },
      instructions:
        'Questions 1–5: Which person (Minh, Sarah, Tom or Lan) does each statement describe? You may choose a person more than once.\nQuestion 6: Write ONE WORD AND/OR A NUMBER from the text.\nQuestions 7–9: Write TRUE, FALSE or NOT GIVEN.',
      examMinutes: 15,
      strategyTip: {
        vi: 'Đọc 4 câu chuyện trước, ghi 2–3 từ khoá cạnh mỗi tên. Câu hỏi diễn đạt khác bài, hãy so ý chứ đừng so từ.',
        en: 'Read the four stories first and note 2–3 key words next to each name. The questions paraphrase the text, so match ideas, not words.',
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-g-u5-read-q1',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Which person changed a habit after advice from a health professional?',
          options: U5_PEOPLE,
          correctIndex: 0,
          explanation: {
            vi: 'Minh: "my doctor warned me…" (doctor = health professional).',
            en: 'Minh: "my doctor warned me…" (a doctor is a health professional).',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-read-q2',
          paragraphLabel: 'C',
          number: 2,
          prompt: 'Which person was not sure the idea would work at first?',
          options: U5_PEOPLE,
          correctIndex: 1,
          explanation: {
            vi: 'Sarah: "I\'ll admit I was doubtful" = không chắc sẽ hiệu quả.',
            en: 'Sarah: "I\'ll admit I was doubtful" = not sure it would work.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-read-q3',
          paragraphLabel: 'D',
          number: 3,
          prompt: 'Which person now has a weekly routine with the people they live with?',
          options: U5_PEOPLE,
          correctIndex: 2,
          explanation: {
            vi: 'Tom: họp 10 phút "every Sunday evening" với bạn cùng nhà = mỗi tuần.',
            en: 'Tom: a ten-minute meeting "every Sunday evening" = weekly.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-read-q4',
          paragraphLabel: 'E',
          number: 4,
          prompt: "Whose children were unhappy about the change at first?",
          options: U5_PEOPLE,
          correctIndex: 3,
          explanation: {
            vi: 'Lan: "The kids complained loudly for about a week."',
            en: 'Lan: "The kids complained loudly for about a week."',
          },
        },
        {
          kind: 'choice',
          id: 'l3-g-u5-read-q5',
          paragraphLabel: 'B',
          number: 5,
          prompt: 'Which person says they now feel more mentally ready when they start work?',
          options: U5_PEOPLE,
          correctIndex: 0,
          explanation: {
            vi: 'Minh: "I arrive at work with a clear head" = đầu óc minh mẫn khi bắt đầu làm việc.',
            en: 'Minh: "I arrive at work with a clear head".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-g-u5-read-q6',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'Sarah has cut her spending on takeaways by ___.',
          acceptedAnswers: ['half', '50%', 'fifty percent', '50 percent'],
          explanation: {
            vi: '"I\'ve cut my spending on takeaways by half".',
            en: '"I\'ve cut my spending on takeaways by half".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u5-read-q7',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'Tom admits that the Sunday meeting may sound a little formal.',
          answer: 'TRUE',
          explanation: {
            vi: '"It sounds a bit formal, I know" = anh thừa nhận nghe hơi trang trọng.',
            en: '"It sounds a bit formal, I know" = he admits it.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u5-read-q8',
          paragraphLabel: 'E',
          number: 8,
          prompt: "Lan's husband no longer watches the news at all.",
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Chỉ biết điện thoại cất đi trong bữa tối; không nói chồng Lan có còn xem tin không.',
            en: 'We only know phones go away at dinner; nothing says he stopped watching the news.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-g-u5-read-q9',
          paragraphLabel: 'A',
          number: 9,
          prompt: 'The magazine received fewer than five hundred replies.',
          answer: 'FALSE',
          explanation: {
            vi: '"more than six hundred replies": nhiều hơn 500.',
            en: '"more than six hundred replies": more than five hundred.',
          },
        },
      ],
    },
    miniTest: [],
  },
]
