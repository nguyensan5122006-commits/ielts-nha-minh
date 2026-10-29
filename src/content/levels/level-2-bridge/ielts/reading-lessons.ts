/**
 * reading-lessons.ts
 * ----------------------------------------------------------------------------
 * LEVEL 2 — PHẦN "BRIDGE" (band 3.0 – 4.0, CEFR A2 → A2+) — TRACK IELTS
 * CHẶNG: "LÀM QUEN IELTS READING"
 *
 * Ở level-2-foundation người học đã biết skimming, scanning, TFNG, matching headings,
 * điền 1 từ ở mức cơ bản. Chặng này chuyển sang ĐÚNG ĐỊNH DẠNG ĐỀ THẬT, bài đọc 300–400 từ
 * chia đoạn A, B, C... và câu hỏi đúng lời hướng dẫn IELTS:
 *   01 l2b-i-read-01  Cấu trúc đề Reading + câu trả lời ngắn (giới hạn số từ) — cây tre
 *   02 l2b-i-read-02  TRUE/FALSE/NOT GIVEN và YES/NO/NOT GIVEN — bài báo về bài tập về nhà
 *   03 l2b-i-read-03  Tìm đoạn chứa thông tin (matching information) — vườn trên mái nhà
 *   04 l2b-i-read-04  Hoàn thành câu NO MORE THAN TWO WORDS — cà phê Tây Nguyên
 *   05 l2b-i-read-05  Thử làm bài có bấm giờ (examMinutes) — công ty làm việc 4 ngày/tuần
 *
 * Cấu trúc 1 bài mode 'reading':
 *   teachingCards (chiến thuật) → exercises khởi động → readingTask
 *   - passage.paragraphs có label A, B, C... để câu hỏi ghi paragraphLabel (đáp án nằm ở đâu).
 *   - YES/NO/NOT GIVEN không có kind riêng → dùng kind 'choice' với options ['YES','NO','NOT GIVEN'].
 *   - Matching information → kind 'choice' với options là các chữ cái đoạn văn.
 *   - Câu trả lời ngắn / hoàn thành câu → kind 'gap-fill' (prompt có đúng 1 chỗ "___").
 *
 * Quy ước id: bài "l2b-i-read-NN", bài tập "l2b-i-read-NN-exMM", câu hỏi task "l2b-i-read-NN-qM".
 * Bài đọc là văn bản tự soạn; tên công ty, nhà hàng, trường học là hư cấu.
 * Kiểu dữ liệu: src/content/content-types.ts
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

/** Lựa chọn dùng chung cho câu hỏi YES / NO / NOT GIVEN (kind 'choice'). */
const YES_NO_NOT_GIVEN = ['YES', 'NO', 'NOT GIVEN']

export const level2BridgeIeltsReadingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Cấu trúc đề IELTS Reading + câu trả lời ngắn (word limit)
  //        Bài đọc: "Bamboo: A Plant with a Thousand Uses"
  // ==========================================================================
  {
    id: "l2b-i-read-01",
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: "Đề IELTS Reading và câu trả lời ngắn", en: "The IELTS Reading test and short-answer questions" },
    description: {
      vi: "Biết cấu trúc đề Reading và trả lời câu hỏi ngắn đúng giới hạn số từ.",
      en: "Learn the Reading test format and answer short questions within the word limit.",
    },
    teachingCards: [
      {
        title: { vi: "Bài thi IELTS Reading", en: "The IELTS Reading test" },
        body: {
          vi: "**60 phút, 3 bài đọc, 40 câu.** Không có thêm giờ để chép đáp án.\n- **Academic**: bài từ sách, tạp chí, báo khoa học phổ thông.\n- **General Training**: thông báo, quảng cáo, bài báo đời thường.\nMỗi bài dài khoảng **700–900 từ** — ở chặng này bạn tập với bài ngắn hơn.\nTrung bình **20 phút cho mỗi bài**.",
          en: "**60 minutes, 3 passages, 40 questions.** There is no extra time to copy your answers.\n- **Academic**: texts from books, magazines and popular science.\n- **General Training**: notices, adverts and everyday articles.\nEach passage is about **700–900 words** — in this unit you practise with shorter ones.\nAim for about **20 minutes per passage**.",
        },
        examples: [{ en: "Passage 1 is usually the easiest.", vi: "Bài đọc 1 thường dễ nhất." }],
      },
      {
        title: { vi: "Trả lời ngắn và giới hạn từ", en: "Short answers and word limits" },
        body: {
          vi: "Đề: **Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.**\n- Lấy **đúng từ trong bài**, không tự đổi từ.\n- Tối đa **2 từ + 1 số** (VD: 20 years ✓).\n- Viết thừa từ = **sai**, kể cả khi ý đúng.\n- Chép **đúng chính tả và số ít/số nhiều** như trong bài.",
          en: "Task: **Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.**\n- Use **words from the passage** — don't change them.\n- Maximum **2 words + a number** (e.g. 20 years ✓).\n- Too many words = **wrong**, even if the idea is right.\n- Copy the **spelling and singular/plural** exactly.",
        },
        examples: [
          { en: "Text: '...they use sharp knives.' → sharp knives ✓  a knife ✗", vi: "Chép đúng 'sharp knives' như trong bài" },
        ],
      },
      {
        title: { vi: "Quét tìm từ khoá 'khó đổi'", en: "Scan for keywords that can't change" },
        body: {
          vi: "Một số từ **không thể paraphrase**: **tên riêng, con số, năm, địa danh**. Dùng chúng để **định vị** đáp án nhanh.\nVD câu hỏi có 'Vietnamese' → quét tìm chữ V viết hoa trong bài, rồi **đọc kỹ 1–2 câu quanh đó**.\nCâu trả lời ngắn thường đi **theo thứ tự** bài đọc.",
          en: "Some words **can't be paraphrased**: **names, numbers, years and places**. Use them to **find the answer quickly**.\nE.g. the question has 'Vietnamese' → scan for the capital V, then **read 1–2 sentences around it** carefully.\nShort-answer questions usually follow the **order of the passage**.",
        },
        examples: [{ en: "What did Vietnamese families build with bamboo?", vi: "Từ khoá khó đổi: Vietnamese" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-read-01-ex01",
        type: 'multiple-choice',
        question: "How long is the IELTS Reading test?",
        options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"],
        correctIndex: 2,
        explanation: {
          vi: "60 phút cho 3 bài đọc, 40 câu.",
          en: "60 minutes for 3 passages and 40 questions.",
        },
      },
      {
        id: "l2b-i-read-01-ex02",
        type: 'true-false',
        statement: "In the IELTS Reading test, you get extra time at the end to copy your answers.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Việc chép đáp án nằm trong 60 phút, không có thêm giờ.",
          en: "False. Copying answers is part of the 60 minutes; there is no extra time.",
        },
      },
      {
        id: "l2b-i-read-01-ex03",
        type: 'multiple-choice',
        question: "Instruction: NO MORE THAN TWO WORDS AND/OR A NUMBER. Which answer is NOT allowed?",
        options: ["bamboo shoots", "20 years", "very young bamboo shoots", "water"],
        correctIndex: 2,
        explanation: {
          vi: "'very young bamboo shoots' có 4 từ → quá giới hạn.",
          en: "'Very young bamboo shoots' has four words → over the limit.",
        },
      },
      {
        id: "l2b-i-read-01-ex04",
        type: 'multiple-choice',
        question: "Text: 'The workers use sharp knives.' Question: 'What do the workers use?' Which answer is correct?",
        options: ["sharp knifes", "sharp knife", "sharp knives", "they use knives"],
        correctIndex: 2,
        explanation: {
          vi: "Chép đúng từ trong bài: 'knives' (số nhiều, đúng chính tả).",
          en: "Copy the words exactly: 'knives' — plural, correct spelling.",
        },
      },
      {
        id: "l2b-i-read-01-ex05",
        type: 'multiple-choice',
        question: "Which keyword is the EASIEST to scan for in a passage?",
        options: ["important", "1,000", "useful", "people"],
        correctIndex: 1,
        explanation: {
          vi: "Con số nổi bật trên trang và không thể paraphrase.",
          en: "Numbers stand out on the page and can't be paraphrased.",
        },
      },
      {
        id: "l2b-i-read-01-ex06",
        type: 'speak-sentence',
        sentence: "Bamboo is actually a type of grass.",
        translationVi: "Tre thật ra là một loại cỏ.",
        explanation: {
          vi: "Nhấn bamBOO ở âm tiết thứ hai. Giữ âm /s/ cuối trong grass.",
          en: "Stress bamBOO on the second syllable. Keep the final /s/ in 'grass'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: "Bamboo: A Plant with a Thousand Uses",
        paragraphs: [
          {
            label: "A",
            text: "Bamboo grows in many warm parts of the world, from China and Vietnam to Africa and South America. Although some kinds are as tall as trees, bamboo is actually a type of grass. Scientists have described more than one thousand different kinds of bamboo, and they come in many sizes and colours, from green and yellow to almost black.",
          },
          {
            label: "B",
            text: "The most surprising thing about bamboo is its speed. Some kinds can grow almost one metre in a single day, which makes bamboo one of the fastest-growing plants on Earth. A young plant reaches its full height in just a few months, and after that its stem becomes harder every year. Farmers usually harvest bamboo when it is three to five years old. Many trees, by comparison, need twenty years or more before their wood can be used.",
          },
          {
            label: "C",
            text: "In Vietnam, bamboo has been part of village life for centuries. In the past, families used it to build houses, fences and small bridges. It was also made into everyday objects such as baskets, chopsticks and fishing traps. Even today, many people enjoy eating young bamboo shoots, which are often cooked in soups or with meat.",
          },
          {
            label: "D",
            text: "Bamboo is now becoming popular around the world because it is good for the environment. When it is cut, it grows back from its roots, so farmers do not need to plant it again. It also needs very little water and usually no chemicals. As a result, companies now use bamboo to make products such as floors, toothbrushes and even clothes.",
          },
          {
            label: "E",
            text: "However, bamboo is not perfect. Some kinds spread very quickly and can take over gardens and forests, which makes life difficult for other plants. Also, turning hard bamboo into soft cloth often uses strong chemicals, so bamboo clothes are not always as 'green' as they seem. Experts advise shoppers to read labels carefully before they buy.",
          },
        ],
      },
      instructions:
        "Questions 1–7. Answer the questions below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      strategyTip: {
        vi: "Mỗi câu: tìm từ khoá khó đổi (Vietnamese, one day...), đọc kỹ quanh đó, rồi đếm số từ trước khi viết.",
        en: "For each question, find a keyword, read around it, then count your words before you write.",
      },
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q1",
          paragraphLabel: "A",
          number: 1,
          prompt: "What type of plant is bamboo? ___",
          acceptedAnswers: ["grass", "a grass"],
          explanation: {
            vi: "'bamboo is actually a type of grass' → grass.",
            en: "'Bamboo is actually a type of grass' → grass.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q2",
          paragraphLabel: "B",
          number: 2,
          prompt: "How much can some kinds of bamboo grow in one day? ___",
          acceptedAnswers: [
            "almost one metre",
            "one metre",
            "1 metre",
            "almost 1 metre",
            "1m",
            "1 m",
            "one meter",
            "1 meter",
            "almost one meter",
            "almost 1 meter",
          ],
          explanation: {
            vi: "'grow almost one metre in a single day' → almost one metre (2 từ + 1 số).",
            en: "'Grow almost one metre in a single day' → almost one metre.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q3",
          paragraphLabel: "B",
          number: 3,
          prompt: "Which part of a bamboo plant becomes harder every year? ___",
          acceptedAnswers: ["stem", "its stem", "the stem"],
          explanation: {
            vi: "'its stem becomes harder every year' → stem.",
            en: "'Its stem becomes harder every year' → stem.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q4",
          paragraphLabel: "C",
          number: 4,
          prompt: "Apart from houses and fences, what did Vietnamese families build with bamboo in the past? ___",
          acceptedAnswers: ["small bridges", "bridges"],
          explanation: {
            vi: "'to build houses, fences and small bridges' → small bridges.",
            en: "'To build houses, fences and small bridges' → small bridges.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q5",
          paragraphLabel: "C",
          number: 5,
          prompt: "Which part of young bamboo do people cook in soups? ___",
          acceptedAnswers: ["shoots", "bamboo shoots"],
          explanation: {
            vi: "'young bamboo shoots, which are often cooked in soups' → shoots.",
            en: "'Young bamboo shoots, which are often cooked in soups' → shoots.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q6",
          paragraphLabel: "D",
          number: 6,
          prompt: "What does bamboo need very little of? ___",
          acceptedAnswers: ["water"],
          explanation: {
            vi: "'It also needs very little water' → water.",
            en: "'It also needs very little water' → water.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-01-q7",
          paragraphLabel: "E",
          number: 7,
          prompt: "According to experts, what should shoppers read carefully? ___",
          acceptedAnswers: ["labels"],
          explanation: {
            vi: "'Experts advise shoppers to read labels carefully' → labels (số nhiều).",
            en: "'Experts advise shoppers to read labels carefully' → labels (plural).",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2: TRUE/FALSE/NOT GIVEN (thông tin) và YES/NO/NOT GIVEN (quan điểm)
  //        Bài đọc: một giáo viên viết về việc bỏ bài tập về nhà
  // ==========================================================================
  {
    id: "l2b-i-read-02",
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: "TRUE/FALSE/NOT GIVEN và YES/NO/NOT GIVEN", en: "TRUE/FALSE/NOT GIVEN vs YES/NO/NOT GIVEN" },
    description: {
      vi: "Phân biệt câu hỏi về thông tin (TFNG) và câu hỏi về quan điểm của người viết (YNNG).",
      en: "Tell the difference between questions about facts (TFNG) and about the writer's views (YNNG).",
    },
    teachingCards: [
      {
        title: { vi: "Hai dạng giống mà khác", en: "Two similar tasks" },
        body: {
          vi: "**TRUE / FALSE / NOT GIVEN**: so câu cho sẵn với **thông tin, sự thật** trong bài.\n**YES / NO / NOT GIVEN**: so với **ý kiến của người viết**.\nCách nghĩ giống nhau:\n- **TRUE / YES** = bài nói giống vậy.\n- **FALSE / NO** = bài nói **ngược lại**.\n- **NOT GIVEN** = bài **không nói** về điều đó.\nĐáp án thường đi **theo thứ tự** bài.",
          en: "**TRUE / FALSE / NOT GIVEN**: compare the statement with **facts** in the passage.\n**YES / NO / NOT GIVEN**: compare it with the **writer's opinions**.\nThe thinking is the same:\n- **TRUE / YES** = the passage says the same.\n- **FALSE / NO** = it says the **opposite**.\n- **NOT GIVEN** = it **doesn't say**.\nAnswers usually follow the **order of the passage**.",
        },
        examples: [
          { en: "Fact: 'The school has 300 pupils.'", vi: "Sự thật → TRUE / FALSE / NOT GIVEN" },
          { en: "Opinion: 'I believe homework is often a waste of time.'", vi: "Quan điểm → YES / NO / NOT GIVEN" },
        ],
      },
      {
        title: { vi: "Nhận ra ý kiến người viết", en: "Spotting the writer's opinion" },
        body: {
          vi: "Dấu hiệu của **ý kiến**:\n- **I believe / I think / In my view**\n- **should / must**\n- từ đánh giá: **the best, a mistake, wrong, sadly, surprisingly**\nCâu có **số liệu, năm, sự kiện** thường là **thông tin**.\nCẩn thận: người viết có thể **nhắc ý người khác** (Some parents worry...) rồi mới nói ý mình (but I think...).",
          en: "Signs of an **opinion**:\n- **I believe / I think / In my view**\n- **should / must**\n- judging words: **the best, a mistake, wrong, sadly, surprisingly**\nSentences with **numbers, years and events** are usually **facts**.\nCareful: the writer may **report other people's views** (Some parents worry...) before giving their own (but I think...).",
        },
        examples: [{ en: "Some parents worry about this, but I think they are wrong.", vi: "Ý của người viết nằm sau 'but I think'" }],
      },
      {
        title: { vi: "FALSE/NO hay NOT GIVEN?", en: "FALSE/NO or NOT GIVEN?" },
        body: {
          vi: "Tự hỏi 2 câu:\n1. Bài có nói **điều ngược lại** không? → **FALSE / NO**.\n2. Bài **không nhắc** đến đúng điểm này? → **NOT GIVEN**.\nChú ý từ nhỏ đổi nghĩa lớn: **all / some**, **always / sometimes**, **only**, **more / less**.\nĐừng dùng **hiểu biết riêng** của bạn — chỉ dựa vào bài.",
          en: "Ask yourself two questions:\n1. Does the passage say **the opposite**? → **FALSE / NO**.\n2. Does it **not mention** this exact point? → **NOT GIVEN**.\nWatch small words with big meaning: **all / some**, **always / sometimes**, **only**, **more / less**.\nDon't use **your own knowledge** — only the passage.",
        },
        examples: [
          { en: "Text: 'open every day except Monday' – Statement: 'open seven days a week' → FALSE", vi: "'trừ thứ Hai' ngược với '7 ngày/tuần' → FALSE" },
        ],
      },
    ],
    exercises: [
      {
        id: "l2b-i-read-02-ex01",
        type: 'multiple-choice',
        question: "Which sentence is a FACT, not an opinion?",
        options: ["The school opened in 2015.", "Homework is boring.", "Schools should start later.", "Reading is the best hobby."],
        correctIndex: 0,
        explanation: {
          vi: "Năm mở trường kiểm chứng được → sự thật. Ba câu kia là ý kiến.",
          en: "A year can be checked → a fact. The other three are opinions.",
        },
      },
      {
        id: "l2b-i-read-02-ex02",
        type: 'multiple-choice',
        question: "Which phrase shows the writer's OPINION?",
        options: ["In 2020, the town built...", "In my view, ...", "The survey found that...", "The school has 300 pupils."],
        correctIndex: 1,
        explanation: {
          vi: "'In my view' = theo tôi → mở đầu ý kiến người viết.",
          en: "'In my view' introduces the writer's opinion.",
        },
      },
      {
        id: "l2b-i-read-02-ex03",
        type: 'multiple-choice',
        question: "Text: 'I believe children need at least nine hours of sleep.' Statement: The writer thinks sleep is important for children.",
        options: YES_NO_NOT_GIVEN,
        correctIndex: 0,
        explanation: {
          vi: "Người viết tin trẻ cần ngủ ít nhất 9 tiếng → coi giấc ngủ là quan trọng.",
          en: "The writer believes children need nine hours' sleep → sleep matters.",
        },
      },
      {
        id: "l2b-i-read-02-ex04",
        type: 'multiple-choice',
        question: "Text: 'Some people say phones help teenagers learn, but I disagree.' Statement: The writer thinks phones help teenagers learn.",
        options: YES_NO_NOT_GIVEN,
        correctIndex: 1,
        explanation: {
          vi: "Đó là ý người khác; người viết nói 'I disagree' → NO.",
          en: "That's other people's view; the writer says 'I disagree' → NO.",
        },
      },
      {
        id: "l2b-i-read-02-ex05",
        type: 'true-false',
        statement: "Text: 'Only a few parents help their children with homework.' — Statement: Most parents help their children with homework.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: "'Only a few' (rất ít) ngược với 'most' (hầu hết) → FALSE.",
          en: "'Only a few' is the opposite of 'most' → FALSE.",
        },
      },
      {
        id: "l2b-i-read-02-ex06",
        type: 'true-false',
        statement: "Text: 'The library opened in 2019 and has 5,000 books.' — Statement: The library is popular with children.",
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: "Bài nói năm mở và số sách, không nói trẻ em có thích hay không.",
          en: "The text gives the year and the number of books, nothing about children.",
        },
      },
      {
        id: "l2b-i-read-02-ex07",
        type: 'speak-sentence',
        sentence: "In my view, a tired child is not a better learner.",
        translationVi: "Theo tôi, một đứa trẻ mệt mỏi không học tốt hơn.",
        explanation: {
          vi: "Nhấn VIEW, TIRED, BETTER. Đọc rõ âm /d/ cuối trong tired.",
          en: "Stress VIEW, TIRED and BETTER. Say the final /d/ in 'tired'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: "Less Homework, Happier Children?",
        paragraphs: [
          {
            label: "A",
            text: "Last year, Hillview Primary School, where I have taught for twelve years, stopped giving homework to children under the age of ten. Instead, these pupils are asked to read at home for twenty minutes every evening, with a parent if possible. When the head teacher first suggested the idea, I was not sure it was a good one. Now, I believe it is one of the best decisions our school has ever made.",
          },
          {
            label: "B",
            text: "Before the change, our teachers spent many hours every week marking homework. Many children did not finish it, and some parents did most of it for them. In my view, homework at this age teaches children very little. Instead, it mainly shows which families have the time to help and which do not.",
          },
          {
            label: "C",
            text: "Since the change, there have been clear benefits. Teachers now have more time to plan interesting lessons and to give each child feedback in class. Children arrive at school less tired, and a survey of our parents found that most families felt less stressed in the evenings. Reading has also improved. Before the change, about half of our pupils said they enjoyed books; now almost three quarters do.",
          },
          {
            label: "D",
            text: "Not everyone agrees with our approach. Some parents worry that their children will find secondary school difficult if they are not used to homework. I understand this concern, but I think it is wrong. Children can learn good study habits at eleven or twelve. Before that age, playing outside, helping at home and sleeping well are more important.",
          },
          {
            label: "E",
            text: "Of course, every school is different, and what works for us may not work everywhere. Several other schools in our town are now watching our results closely, and their teachers have visited our classrooms to ask questions. However, I am sure of one thing: a tired child is not a better learner.",
          },
        ],
      },
      instructions:
        "Questions 1–4. Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.\nQuestions 5–8. Do the following statements agree with the views of the writer? Choose YES, NO or NOT GIVEN.",
      strategyTip: {
        vi: "Câu 1–4 hỏi sự thật; câu 5–8 hỏi ý kiến người viết — tìm các cụm như 'I think', 'In my view'.",
        en: "Questions 1–4 ask about facts; 5–8 ask about the writer's views — look for 'I think', 'In my view'.",
      },
      questions: [
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-02-q1",
          paragraphLabel: "A",
          number: 1,
          prompt: "Hillview Primary School has stopped giving homework to all of its pupils.",
          answer: 'FALSE',
          explanation: {
            vi: "Chỉ trẻ dưới 10 tuổi không có bài tập, không phải tất cả.",
            en: "Only children under ten have no homework, not all pupils.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-02-q2",
          paragraphLabel: "A",
          number: 2,
          prompt: "Younger pupils at the school are asked to read at home every evening.",
          answer: 'TRUE',
          explanation: {
            vi: "'asked to read at home for twenty minutes every evening' → TRUE.",
            en: "'Asked to read at home for twenty minutes every evening' → TRUE.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-02-q3",
          paragraphLabel: "C",
          number: 3,
          prompt: "The survey of parents was carried out online.",
          answer: 'NOT GIVEN',
          explanation: {
            vi: "Bài có nhắc cuộc khảo sát nhưng không nói làm bằng cách nào.",
            en: "The survey is mentioned, but not how it was carried out.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-02-q4",
          paragraphLabel: "C",
          number: 4,
          prompt: "The percentage of pupils who enjoy books has increased.",
          answer: 'TRUE',
          explanation: {
            vi: "Từ khoảng một nửa lên gần ba phần tư → tăng.",
            en: "From about half to almost three quarters → it increased.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-02-q5",
          paragraphLabel: "A",
          number: 5,
          prompt: "The writer supported the idea from the very beginning.",
          options: YES_NO_NOT_GIVEN,
          correctIndex: 1,
          explanation: {
            vi: "'I was not sure it was a good one' → lúc đầu chưa ủng hộ → NO.",
            en: "'I was not sure it was a good one' → not at first → NO.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-02-q6",
          paragraphLabel: "B",
          number: 6,
          prompt: "Homework for young children mainly shows how much help families can give.",
          options: YES_NO_NOT_GIVEN,
          correctIndex: 0,
          explanation: {
            vi: "Khớp với 'it mainly shows which families have the time to help'.",
            en: "Matches 'it mainly shows which families have the time to help'.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-02-q7",
          paragraphLabel: "D",
          number: 7,
          prompt: "Parents who worry about secondary school are right.",
          options: YES_NO_NOT_GIVEN,
          correctIndex: 1,
          explanation: {
            vi: "Người viết hiểu nỗi lo nhưng nói 'I think it is wrong' → NO.",
            en: "The writer understands the worry but says 'I think it is wrong' → NO.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-02-q8",
          paragraphLabel: "D",
          number: 8,
          prompt: "Children under ten should do sport at school every day.",
          options: YES_NO_NOT_GIVEN,
          correctIndex: 2,
          explanation: {
            vi: "Người viết nói chơi ngoài trời quan trọng, không nói về thể thao ở trường mỗi ngày.",
            en: "The writer mentions playing outside, not daily sport at school.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3: Tìm đoạn chứa thông tin (matching information)
  //        Bài đọc: "Gardens in the Sky" — vườn trên mái nhà ở thành phố
  // ==========================================================================
  {
    id: "l2b-i-read-03",
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: "Tìm đoạn chứa thông tin", en: "Matching information: which paragraph?" },
    description: {
      vi: "Tìm đoạn văn chứa một chi tiết cụ thể — dạng bài mà đáp án không theo thứ tự.",
      en: "Find the paragraph that contains a specific detail — a task where answers are not in order.",
    },
    teachingCards: [
      {
        title: { vi: "Dạng 'Which paragraph contains...?'", en: "The 'Which paragraph contains...?' task" },
        body: {
          vi: "Đề cho một **thông tin** (một lý do, một ví dụ, một con số...), bạn tìm **đoạn nào chứa nó** (A, B, C...).\n**Khác Matching Headings**: heading là **ý chính cả đoạn**; ở đây chỉ là **1 chi tiết nhỏ**.\nĐáp án **không theo thứ tự**. Một đoạn có thể được dùng **nhiều lần** hoặc **không lần nào** (NB You may use any letter more than once).",
          en: "You get a piece of **information** (a reason, an example, a number...) and find **which paragraph contains it** (A, B, C...).\n**Not like Matching Headings**: a heading is the **main idea**; here it is just **one detail**.\nAnswers are **not in order**. A letter can be used **more than once** or **not at all** (NB You may use any letter more than once).",
        },
        examples: [
          { en: "a reason why the shop closed → look for 'because', 'so', 'as a result'", vi: "Tìm đoạn có lý do (because, so, as a result)" },
        ],
      },
      {
        title: { vi: "Từ chỉ loại thông tin", en: "Words that name the information" },
        body: {
          vi: "Câu hỏi thường bắt đầu bằng **loại thông tin** — hãy nhớ nghĩa:\n- **a reason** → lý do (because, so, as a result)\n- **an example** → ví dụ (for example, such as)\n- **a description** → miêu tả\n- **a problem** → vấn đề, khó khăn\n- **a prediction** → dự đoán tương lai (will, by 2040)\n- **a comparison** → so sánh",
          en: "Questions often start with the **type of information** — know what each means:\n- **a reason** → because, so, as a result\n- **an example** → for example, such as\n- **a description** → what something is like\n- **a problem** → a difficulty\n- **a prediction** → the future (will, by 2040)\n- **a comparison** → two things compared",
        },
        examples: [{ en: "Experts predict that by 2040... → a prediction", vi: "'by 2040' + 'will' → dự đoán" }],
      },
      {
        title: { vi: "Cách làm hiệu quả", en: "An efficient method" },
        body: {
          vi: "1. Đọc **tất cả** câu hỏi, gạch chân loại thông tin + từ khoá.\n2. Đọc **từng đoạn** (A, rồi B...). Đọc xong 1 đoạn, hỏi: 'Đoạn này có chứa câu nào không?'\n3. Làm câu **dễ** (có tên, số) trước.\nVì cần đọc cả bài, dạng này nên làm **sau** các dạng theo thứ tự.",
          en: "1. Read **all** the questions; underline the type of information and key words.\n2. Read **one paragraph at a time** (A, then B...). After each, ask: 'Does it contain any of the questions?'\n3. Do the **easy** ones (names, numbers) first.\nBecause you need the whole passage, do this task **after** the in-order tasks.",
        },
        examples: [{ en: "Paragraph A → check all 7 questions → Paragraph B → ...", vi: "Đọc đoạn A → dò cả 7 câu → sang đoạn B..." }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-read-03-ex01",
        type: 'match-pairs',
        instruction: { vi: "Nối loại thông tin với nghĩa tiếng Việt.", en: "Match each type of information with its meaning." },
        pairs: [
          { left: "a reason", right: "lý do, vì sao" },
          { left: "an example", right: "ví dụ cụ thể" },
          { left: "a prediction", right: "dự đoán tương lai" },
          { left: "a problem", right: "vấn đề, khó khăn" },
          { left: "a comparison", right: "so sánh hai thứ" },
          { left: "a description", right: "miêu tả" },
        ],
        explanation: {
          vi: "Hiểu loại thông tin giúp bạn biết cần tìm câu như thế nào.",
          en: "Knowing the type of information tells you what kind of sentence to look for.",
        },
      },
      {
        id: "l2b-i-read-03-ex02",
        type: 'multiple-choice',
        question: "Which sentence contains a PREDICTION?",
        options: [
          "The bridge opened in 2021.",
          "By 2035, most cars in the city will be electric.",
          "Old cars are very noisy.",
          "Many people cycle to work because it is cheap.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "'By 2035' + 'will' → nói về tương lai = dự đoán.",
          en: "'By 2035' + 'will' → the future = a prediction.",
        },
      },
      {
        id: "l2b-i-read-03-ex03",
        type: 'multiple-choice',
        question: "Which sentence gives a REASON?",
        options: [
          "Bicycles are popular because they are cheap to use.",
          "There are 50 bicycle shops in the city.",
          "A new cycle path will be built next year.",
          "This bicycle has a red basket.",
        ],
        correctIndex: 0,
        explanation: {
          vi: "'because' giới thiệu lý do.",
          en: "'Because' introduces a reason.",
        },
      },
      {
        id: "l2b-i-read-03-ex04",
        type: 'true-false',
        statement: "In a 'Which paragraph contains...?' task, the answers always follow the order of the paragraphs.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Đáp án dạng này không theo thứ tự bài đọc.",
          en: "False. Answers to this task are not in passage order.",
        },
      },
      {
        id: "l2b-i-read-03-ex05",
        type: 'multiple-choice',
        question: "What is the main difference between Matching Headings and Matching Information?",
        options: [
          "Both ask for the main idea of a paragraph.",
          "Matching Information asks for a detail, not the main idea.",
          "Matching Information uses each letter only once.",
          "Matching Headings answers are never in the passage.",
        ],
        correctIndex: 1,
        explanation: {
          vi: "Heading = ý chính cả đoạn; Matching information = 1 chi tiết.",
          en: "A heading is the main idea; matching information is one detail.",
        },
      },
      {
        id: "l2b-i-read-03-ex06",
        type: 'speak-sentence',
        sentence: "Plants keep the building cool in summer.",
        translationVi: "Cây giúp toà nhà mát vào mùa hè.",
        explanation: {
          vi: "Đọc rõ âm cuối: plants /ts/, keep /p/, cool /l/.",
          en: "Say the final sounds: plants /ts/, keep /p/, cool /l/.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: "Gardens in the Sky",
        paragraphs: [
          {
            label: "A",
            text: "Cities around the world are growing fast. As more people move into cities, more houses, offices and roads are built, and the space left for parks and trees becomes smaller every year. To solve this problem, a growing number of building owners are turning their flat roofs into gardens. In some Asian cities, rooftop gardens can now be seen on schools, hospitals and shopping centres.",
          },
          {
            label: "B",
            text: "One of the main benefits of a green roof is temperature control. In summer, a normal roof absorbs heat from the sun, and the rooms under it become very hot. Plants and soil, however, block much of this heat. As a result, the top floor of a building with a green roof can be several degrees cooler, so people use their air conditioners less and pay lower electricity bills.",
          },
          {
            label: "C",
            text: "Some rooftop gardens are also used to grow food. In the city of Westport, a popular restaurant called Green Table grows most of its herbs and salad leaves on its own roof. The chef picks them a few minutes before cooking, so they are always fresh, and the restaurant no longer needs to pay for daily deliveries.",
          },
          {
            label: "D",
            text: "However, building a garden on a roof is not simple. Wet soil is extremely heavy, and many older buildings were not designed to carry so much weight. Before any work begins, an engineer must check that the roof is strong enough. The cost of preparing a roof can also be high, which stops many owners from starting a project.",
          },
          {
            label: "E",
            text: "Rooftop gardens may also be good for the mind. In one small study, office workers who spent ten minutes in a roof garden at lunchtime said that they felt calmer and less stressed in the afternoon. Some companies now hold short meetings outdoors among the plants.",
          },
          {
            label: "F",
            text: "Experts believe rooftop gardens will become much more common. Some predict that by 2040, most new buildings in large cities will be required to have a green roof. Several city governments already offer money to owners who add plants to their roofs, and this help is likely to increase in the future.",
          },
        ],
      },
      instructions:
        "Questions 1–7. The passage has six paragraphs, A–F. Which paragraph contains the following information? Choose the correct letter, A–F. NB You may use any letter more than once.",
      strategyTip: {
        vi: "Đọc từng đoạn một và đối chiếu với cả 7 câu, thay vì đọc cả bài cho từng câu.",
        en: "Read one paragraph at a time and check it against all seven questions.",
      },
      questions: [
        {
          kind: 'choice',
          id: "l2b-i-read-03-q1",
          paragraphLabel: "B",
          number: 1,
          prompt: "a reason why green roofs can reduce electricity bills",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn B: cây chắn nhiệt → bớt dùng điều hoà → 'lower electricity bills'.",
            en: "B: plants block heat, so people use air conditioners less → lower bills.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q2",
          paragraphLabel: "C",
          number: 2,
          prompt: "an example of a business that grows its own food",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 2,
          explanation: {
            vi: "Đoạn C: nhà hàng Green Table trồng rau thơm, xà lách trên mái.",
            en: "C: the Green Table restaurant grows herbs and salad on its roof.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q3",
          paragraphLabel: "D",
          number: 3,
          prompt: "a problem with adding gardens to older buildings",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 3,
          explanation: {
            vi: "Đoạn D: đất ướt rất nặng, nhà cũ không được thiết kế để chịu sức nặng đó.",
            en: "D: wet soil is heavy, and older buildings weren't designed for the weight.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q4",
          paragraphLabel: "F",
          number: 4,
          prompt: "a prediction about rules for new buildings",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 5,
          explanation: {
            vi: "Đoạn F: 'by 2040, most new buildings... will be required' → dự đoán.",
            en: "F: 'by 2040, most new buildings... will be required' → a prediction.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q5",
          paragraphLabel: "E",
          number: 5,
          prompt: "information about how a garden can affect people's feelings",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 4,
          explanation: {
            vi: "Đoạn E: nhân viên thấy 'calmer and less stressed' → cảm xúc.",
            en: "E: workers felt 'calmer and less stressed' → feelings.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q6",
          paragraphLabel: "A",
          number: 6,
          prompt: "a reason why cities have less space for parks",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 0,
          explanation: {
            vi: "Đoạn A: thêm nhà, văn phòng, đường nên chỗ cho công viên nhỏ dần.",
            en: "A: more houses, offices and roads leave less space for parks.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-03-q7",
          paragraphLabel: "F",
          number: 7,
          prompt: "a mention of money that some cities give to building owners",
          options: ["A", "B", "C", "D", "E", "F"],
          correctIndex: 5,
          explanation: {
            vi: "Lại là đoạn F: 'offer money to owners'. Một chữ cái có thể dùng 2 lần.",
            en: "F again: 'offer money to owners'. A letter can be used twice.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4: Hoàn thành câu — NO MORE THAN TWO WORDS from the passage
  //        Bài đọc: "From Farm to Cup: Coffee in Vietnam"
  // ==========================================================================
  {
    id: "l2b-i-read-04",
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 15,
    title: { vi: "Hoàn thành câu: NO MORE THAN TWO WORDS", en: "Sentence completion: NO MORE THAN TWO WORDS" },
    description: {
      vi: "Hoàn thành câu bằng từ trong bài: nhận ra paraphrase, kiểm tra ngữ pháp và giới hạn từ.",
      en: "Complete sentences with words from the passage: spot the paraphrase, check grammar and the word limit.",
    },
    teachingCards: [
      {
        title: { vi: "Câu đề bài là bản 'nói lại' của bài đọc", en: "The sentence is a paraphrase" },
        body: {
          vi: "Phần đầu câu hỏi thường **diễn đạt lại** một câu trong bài. Hãy tìm **từ đồng nghĩa**, rồi lấy **từ đứng ngay sau** nó.\nVD bài viết: 'Workers **pick** the cherries **by hand**.'\nCâu hỏi: 'The cherries are **collected** ___.' → **by hand**.\nĐáp án thường đi **theo thứ tự** bài đọc.",
          en: "The start of the sentence usually **paraphrases** a sentence in the passage. Find the **synonym**, then take the **words right after** it.\nE.g. Text: 'Workers **pick** the cherries **by hand**.'\nQuestion: 'The cherries are **collected** ___.' → **by hand**.\nAnswers usually follow the **order of the passage**.",
        },
        examples: [{ en: "pick = collect, start = begin, abroad = in other countries", vi: "Các cặp đồng nghĩa hay gặp" }],
      },
      {
        title: { vi: "Kiểm tra 3 điều trước khi viết", en: "Check three things before you write" },
        body: {
          vi: "1. **Số từ**: TWO WORDS = tối đa 2 từ.\n2. **Ngữ pháp**: đọc lại cả câu — có đúng không? (a + danh từ số ít, are + số nhiều...)\n3. **Chính tả**: chép **y hệt** trong bài, **không đổi dạng từ** (dry ≠ dried).\nSai 1 trong 3 điều = mất điểm.",
          en: "1. **Word count**: TWO WORDS = two words maximum.\n2. **Grammar**: read the whole sentence again — is it correct? (a + singular, are + plural...)\n3. **Spelling**: copy **exactly**; **don't change the word form** (dry ≠ dried).\nOne mistake = no mark.",
        },
        examples: [{ en: "The beans are dried for two to three ___. → a plural noun of time", vi: "'two to three' + danh từ số nhiều chỉ thời gian" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-read-04-ex01",
        type: 'multiple-choice',
        question: "Sentence: 'The fruit is spread out on large concrete ___.' What type of word is missing?",
        options: ["A verb", "An adjective", "A number", "A plural noun"],
        correctIndex: 3,
        explanation: {
          vi: "Không có 'a' trước 'large concrete' → thường là danh từ số nhiều (yards).",
          en: "No 'a' before 'large concrete' → usually a plural noun (yards).",
        },
      },
      {
        id: "l2b-i-read-04-ex02",
        type: 'multiple-choice',
        question: "Instruction: NO MORE THAN TWO WORDS. Text: 'Workers pick the cherries carefully by hand.' Sentence: 'The cherries are picked ___.' Which answer is correct?",
        options: ["by hand", "carefully by hand", "hand", "by hands"],
        correctIndex: 0,
        explanation: {
          vi: "'carefully by hand' = 3 từ; 'by hands' là đổi từ trong bài.",
          en: "'Carefully by hand' is three words; 'by hands' changes the text.",
        },
      },
      {
        id: "l2b-i-read-04-ex03",
        type: 'match-pairs',
        instruction: { vi: "Nối từ trong bài với cách nói lại trong câu hỏi.", en: "Match words in the passage with their paraphrases." },
        pairs: [
          { left: "pick", right: "collect" },
          { left: "ripe", right: "ready to eat" },
          { left: "begin", right: "start" },
          { left: "hot weather", right: "high temperatures" },
          { left: "abroad", right: "in other countries" },
        ],
        explanation: {
          vi: "Câu hỏi hoàn thành câu thường dùng từ đồng nghĩa với bài.",
          en: "Sentence-completion questions often use synonyms of words in the passage.",
        },
      },
      {
        id: "l2b-i-read-04-ex04",
        type: 'true-false',
        statement: "In sentence completion, you can change a word from the passage, for example 'dry' to 'dried'.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Phải chép đúng từ trong bài, không đổi dạng.",
          en: "False. Copy the word exactly as it is in the passage.",
        },
      },
      {
        id: "l2b-i-read-04-ex05",
        type: 'multiple-choice',
        question: "Text: 'Many people drink it with sweet condensed milk.' Sentence: 'Many people add sweet ___ to their coffee.' Which answer is correct?",
        options: ["condensed milk", "condensed milks", "sweet condensed milk", "milk condensed"],
        correctIndex: 0,
        explanation: {
          vi: "'condensed milk' — 2 từ đúng trong bài; 'sweet' đã có sẵn trong câu.",
          en: "'Condensed milk' — two words from the text; 'sweet' is already in the sentence.",
        },
      },
      {
        id: "l2b-i-read-04-ex06",
        type: 'fill-blank',
        sentence: "Before you write, check the word limit, the ___ and the spelling.",
        acceptedAnswers: ["grammar"],
        hint: "(ngữ pháp)",
        explanation: {
          vi: "3 điều cần kiểm tra: số từ, ngữ pháp, chính tả.",
          en: "Three checks: word limit, grammar and spelling.",
        },
      },
      {
        id: "l2b-i-read-04-ex07",
        type: 'speak-sentence',
        sentence: "The cherries are dried in the sun for two weeks.",
        translationVi: "Quả cà phê được phơi nắng trong hai tuần.",
        explanation: {
          vi: "dried đọc /draɪd/, một âm tiết; weeks giữ /ks/ cuối.",
          en: "'Dried' is /draɪd/, one syllable. Keep the final /ks/ in 'weeks'.",
        },
      },
    ],
    readingTask: {
      passage: {
        title: "From Farm to Cup: Coffee in Vietnam",
        paragraphs: [
          {
            label: "A",
            text: "Vietnam is one of the largest coffee producers in the world, and most of its coffee is grown in the Central Highlands. Farmers there mainly grow Robusta, a strong and slightly bitter type of coffee. Robusta plants are tougher than many other kinds, and they grow well in hot weather and at lower heights above the sea.",
          },
          {
            label: "B",
            text: "A coffee plant first produces small white flowers that smell a little like jasmine. A few days later, the flowers fall, and small green fruits begin to grow. These fruits are called coffee cherries, and they slowly change colour over many months. When the cherries are ripe and ready to pick, they are bright red.",
          },
          {
            label: "C",
            text: "The harvest usually takes place in the dry season, from around October to January. It is hard work. Because the cherries on one plant do not all become ripe at the same time, workers often go back to the same plants several times. On many small farms, the cherries are picked by hand, and the whole family helps.",
          },
          {
            label: "D",
            text: "After the harvest, most Vietnamese farmers dry the cherries in the sun. The fruit is spread out on large concrete yards or mats and turned several times a day so that it dries evenly. This usually takes two to three weeks. When the cherries are completely dry, a machine removes the outside, and the green coffee beans inside are ready to sell.",
          },
          {
            label: "E",
            text: "The beans become brown when they are roasted. In Vietnam, some roasters add a little butter or sugar during roasting to create a special taste. At home and in cafés, the coffee is often made with a phin, a small metal filter that sits on top of a cup. Many people drink it with sweet condensed milk.",
          },
          {
            label: "F",
            text: "Today, the coffee industry is changing. Many young farmers are learning new methods so that they can grow better beans. Although these beans need more care, they can be sold for higher prices, both in Vietnam and abroad.",
          },
        ],
      },
      instructions:
        "Questions 1–8. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      strategyTip: {
        vi: "Đọc cả câu trước, đoán loại từ (tính từ? danh từ số nhiều?), tìm từ đồng nghĩa trong bài, rồi kiểm tra ngữ pháp.",
        en: "Read the whole sentence, predict the word type, find the synonym in the passage, then check the grammar.",
      },
      questions: [
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q1",
          paragraphLabel: "A",
          number: 1,
          prompt: "Robusta coffee grows well in ___ weather.",
          acceptedAnswers: ["hot"],
          explanation: {
            vi: "'they grow well in hot weather' → hot.",
            en: "'They grow well in hot weather' → hot.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q2",
          paragraphLabel: "B",
          number: 2,
          prompt: "Before the fruit appears, a coffee plant has small white ___.",
          acceptedAnswers: ["flowers"],
          explanation: {
            vi: "'first produces small white flowers' → flowers (số nhiều).",
            en: "'First produces small white flowers' → flowers (plural).",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q3",
          paragraphLabel: "B",
          number: 3,
          prompt: "Coffee cherries are bright ___ when they are ready to be picked.",
          acceptedAnswers: ["red"],
          explanation: {
            vi: "'ripe and ready to pick, they are bright red' → red.",
            en: "'Ripe and ready to pick, they are bright red' → red.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q4",
          paragraphLabel: "C",
          number: 4,
          prompt: "Farmers collect their coffee cherries during the ___.",
          acceptedAnswers: ["dry season"],
          explanation: {
            vi: "'The harvest usually takes place in the dry season' → dry season.",
            en: "'The harvest usually takes place in the dry season' → dry season.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q5",
          paragraphLabel: "C",
          number: 5,
          prompt: "Workers visit the same plants several times because the cherries are not all ___ at the same time.",
          acceptedAnswers: ["ripe"],
          explanation: {
            vi: "'do not all become ripe at the same time' → ripe.",
            en: "'Do not all become ripe at the same time' → ripe.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q6",
          paragraphLabel: "E",
          number: 6,
          prompt: "During roasting, some roasters add a little ___ or sugar.",
          acceptedAnswers: ["butter"],
          explanation: {
            vi: "'add a little butter or sugar during roasting' → butter.",
            en: "'Add a little butter or sugar during roasting' → butter.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q7",
          paragraphLabel: "E",
          number: 7,
          prompt: "A phin is a small ___ that sits on top of a cup.",
          acceptedAnswers: ["metal filter", "filter"],
          explanation: {
            vi: "'a small metal filter' → metal filter (2 từ, số ít sau 'a').",
            en: "'A small metal filter' → metal filter (two words, singular after 'a').",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-04-q8",
          paragraphLabel: "F",
          number: 8,
          prompt: "Better beans need more care, but they can be sold for ___.",
          acceptedAnswers: ["higher prices"],
          explanation: {
            vi: "'they can be sold for higher prices' → higher prices.",
            en: "'They can be sold for higher prices' → higher prices.",
          },
        },
      ],
    },
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 5: Thử làm bài có bấm giờ — 1 bài đọc, 3 dạng câu hỏi, 15 phút
  //        Bài đọc: "Working Four Days a Week"
  // ==========================================================================
  {
    id: "l2b-i-read-05",
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 20,
    title: { vi: "Thử làm bài có bấm giờ", en: "Try it timed: a mixed passage" },
    description: {
      vi: "Làm một bài đọc với 3 dạng câu hỏi trong 15 phút, như phòng thi thật.",
      en: "Do one passage with three question types in 15 minutes, like the real test.",
    },
    teachingCards: [
      {
        title: { vi: "Quản lý thời gian", en: "Managing your time" },
        body: {
          vi: "Thi thật: **60 phút / 3 bài** → khoảng **20 phút mỗi bài**.\nBài hôm nay ngắn hơn: **15 phút cho 9 câu**.\n- Không dành quá **2 phút** cho 1 câu. Bí thì **đoán, đánh dấu, đi tiếp**.\n- **Không bỏ trống**: câu sai không bị trừ điểm.\n- Chừa **1–2 phút cuối** để kiểm tra chính tả và số từ.",
          en: "Real test: **60 minutes / 3 passages** → about **20 minutes each**.\nToday's passage is shorter: **15 minutes for 9 questions**.\n- Don't spend more than **2 minutes** on one question. If stuck, **guess, mark it, move on**.\n- **Never leave a blank**: wrong answers lose nothing.\n- Keep **1–2 minutes** at the end to check spelling and word limits.",
        },
        examples: [{ en: "Stuck on question 4? Guess, mark it, go to question 5.", vi: "Bí câu 4? Đoán, đánh dấu, làm câu 5." }],
      },
      {
        title: { vi: "Thứ tự làm bài gợi ý", en: "A suggested order" },
        body: {
          vi: "1. **Đọc lướt** bài 1–2 phút: tiêu đề + câu đầu mỗi đoạn.\n2. Làm các dạng **theo thứ tự bài** trước: TRUE/FALSE/NOT GIVEN, hoàn thành câu.\n3. Làm **tìm đoạn chứa thông tin** sau cùng — lúc đó bạn đã hiểu bài hơn.\n4. Quay lại các câu đã đánh dấu.",
          en: "1. **Skim** the passage for 1–2 minutes: title + first sentence of each paragraph.\n2. Do the **in-order** tasks first: TRUE/FALSE/NOT GIVEN, sentence completion.\n3. Do **matching information** last — by then you know the passage better.\n4. Go back to any questions you marked.",
        },
        examples: [{ en: "Skim → TFNG → sentence completion → matching → check", vi: "Lướt → TFNG → hoàn thành câu → tìm đoạn → kiểm tra" }],
      },
    ],
    exercises: [
      {
        id: "l2b-i-read-05-ex01",
        type: 'multiple-choice',
        question: "In the real IELTS Reading test, about how long should you spend on each passage?",
        options: ["5 minutes", "10 minutes", "20 minutes", "40 minutes"],
        correctIndex: 2,
        explanation: {
          vi: "60 phút chia 3 bài → khoảng 20 phút mỗi bài.",
          en: "60 minutes ÷ 3 passages → about 20 minutes each.",
        },
      },
      {
        id: "l2b-i-read-05-ex02",
        type: 'multiple-choice',
        question: "You can't find the answer to a question after 2 minutes. What should you do?",
        options: ["Keep looking until you find it", "Guess, mark it and move on", "Leave it blank", "Start the passage again"],
        correctIndex: 1,
        explanation: {
          vi: "Đừng kẹt ở 1 câu: đoán, đánh dấu, quay lại sau nếu còn giờ.",
          en: "Don't get stuck: guess, mark it and come back if you have time.",
        },
      },
      {
        id: "l2b-i-read-05-ex03",
        type: 'multiple-choice',
        question: "Which task is usually best to do LAST, because its answers are not in order?",
        options: ["Sentence completion", "TRUE / FALSE / NOT GIVEN", "Matching information", "Short-answer questions"],
        correctIndex: 2,
        explanation: {
          vi: "Tìm đoạn chứa thông tin không theo thứ tự, cần hiểu cả bài → làm sau.",
          en: "Matching information isn't in order and needs the whole passage → do it last.",
        },
      },
      {
        id: "l2b-i-read-05-ex04",
        type: 'true-false',
        statement: "In IELTS Reading, you lose a mark for every wrong answer.",
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: "Sai. Câu sai không bị trừ điểm, nên đừng bỏ trống.",
          en: "False. Wrong answers lose nothing, so never leave a blank.",
        },
      },
      {
        id: "l2b-i-read-05-ex05",
        type: 'match-pairs',
        instruction: { vi: "Nối dạng câu hỏi với điều bạn cần tìm.", en: "Match each task with what you look for." },
        pairs: [
          { left: "TRUE / FALSE / NOT GIVEN", right: "facts in the passage" },
          { left: "YES / NO / NOT GIVEN", right: "the writer's opinions" },
          { left: "Which paragraph contains...?", right: "one detail in a paragraph" },
          { left: "Matching headings", right: "the main idea of a paragraph" },
          { left: "Sentence completion", right: "exact words from the passage" },
        ],
        explanation: {
          vi: "Ôn cả chặng: mỗi dạng tìm một loại thông tin khác nhau.",
          en: "Unit review: each task asks you to look for something different.",
        },
      },
      {
        id: "l2b-i-read-05-ex06",
        type: 'speak-sentence',
        sentence: "I'll skip this question and come back to it later.",
        translationVi: "Tôi sẽ bỏ qua câu này và quay lại sau.",
        explanation: {
          vi: "Nối come_back_to_it. Giữ /p/ cuối trong skip, /k/ trong back.",
          en: "Link come_back_to_it. Keep the final /p/ in 'skip' and /k/ in 'back'.",
        },
      },
    ],
    readingTask: {
      examMinutes: 15,
      passage: {
        title: "Working Four Days a Week",
        paragraphs: [
          {
            label: "A",
            text: "When Brightway, a small design company with forty employees, announced that its staff would work only four days a week, many people thought the idea would fail. The company did not reduce anyone's salary. Staff simply worked from Monday to Thursday and had every Friday off. The trial began in January and lasted six months.",
          },
          {
            label: "B",
            text: "The manager, Grace Dunmore, explains why she decided to try it. 'Our staff were very tired,' she says. 'Many of them were taking days off because of stress, and two of our best designers left the company in one year. I needed a way to keep good people.' She had read about similar experiments in other countries and wanted to see whether the idea could work in a small business.",
          },
          {
            label: "C",
            text: "To make the plan work, the company changed the way it organised the working day. Meetings were limited to thirty minutes, and staff were asked not to check their emails during the first two hours of the morning. Instead, they used this time for 'deep work', which means tasks that need full concentration. Every Monday, each team also agreed on a list of tasks to finish before Thursday afternoon.",
          },
          {
            label: "D",
            text: "The results surprised even the manager. The company completed slightly more projects than in the same six months of the previous year, and the number of sick days fell by almost half. In a survey at the end of the trial, ninety per cent of employees said they felt healthier. Many said they used their free day for hobbies, sport or time with their children.",
          },
          {
            label: "E",
            text: "However, the change was not easy for everyone. Some customers were unhappy because they could not contact the company on Fridays. To solve this, Brightway now asks two employees to answer phone calls on that day, and they take another day off instead. A few staff also found it hard to finish all their work in four days. Even so, the company has decided to keep the four-day week, and Dunmore says she would 'never go back'.",
          },
        ],
      },
      instructions:
        "Questions 1–3. Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.\nQuestions 4–6. The passage has five paragraphs, A–E. Which paragraph contains the following information? Choose the correct letter, A–E.\nQuestions 7–9. Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
      strategyTip: {
        vi: "Bật chế độ bấm giờ. Hết 15 phút chưa xong cũng không sao — xem lại để biết dạng nào làm bạn chậm.",
        en: "Turn on the timer. Not finished in 15 minutes? That's fine — check which task type slowed you down.",
      },
      questions: [
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-05-q1",
          paragraphLabel: "A",
          number: 1,
          prompt: "Brightway paid its staff less during the trial.",
          answer: 'FALSE',
          explanation: {
            vi: "'did not reduce anyone's salary' → không giảm lương → FALSE.",
            en: "'Did not reduce anyone's salary' → FALSE.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-05-q2",
          paragraphLabel: "A",
          number: 2,
          prompt: "The trial lasted for half a year.",
          answer: 'TRUE',
          explanation: {
            vi: "'lasted six months' = nửa năm → TRUE.",
            en: "'Lasted six months' = half a year → TRUE.",
          },
        },
        {
          kind: 'true-false-not-given',
          id: "l2b-i-read-05-q3",
          paragraphLabel: "B",
          number: 3,
          prompt: "Grace Dunmore once worked for a company in another country.",
          answer: 'NOT GIVEN',
          explanation: {
            vi: "Bà ấy đọc về thử nghiệm ở nước khác; bài không nói bà từng làm việc ở đó.",
            en: "She read about experiments abroad; the text doesn't say she worked abroad.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-05-q4",
          paragraphLabel: "B",
          number: 4,
          prompt: "the reason why the manager wanted to make a change",
          options: ["A", "B", "C", "D", "E"],
          correctIndex: 1,
          explanation: {
            vi: "Đoạn B: nhân viên mệt, nghỉ vì stress, người giỏi nghỉ việc → lý do.",
            en: "B: staff were tired and stressed, and good designers left → the reason.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-05-q5",
          paragraphLabel: "E",
          number: 5,
          prompt: "a problem that some customers had",
          options: ["A", "B", "C", "D", "E"],
          correctIndex: 4,
          explanation: {
            vi: "Đoạn E: khách không liên lạc được với công ty vào thứ Sáu.",
            en: "E: customers couldn't contact the company on Fridays.",
          },
        },
        {
          kind: 'choice',
          id: "l2b-i-read-05-q6",
          paragraphLabel: "C",
          number: 6,
          prompt: "a description of new rules for the working day",
          options: ["A", "B", "C", "D", "E"],
          correctIndex: 2,
          explanation: {
            vi: "Đoạn C: họp tối đa 30 phút, không xem email 2 giờ đầu.",
            en: "C: 30-minute meetings, no emails in the first two hours.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-05-q7",
          paragraphLabel: "C",
          number: 7,
          prompt: "During the first two hours of the morning, staff did not check their ___.",
          acceptedAnswers: ["emails", "e-mails"],
          explanation: {
            vi: "'asked not to check their emails' → emails.",
            en: "'Asked not to check their emails' → emails.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-05-q8",
          paragraphLabel: "D",
          number: 8,
          prompt: "Compared with the previous year, the number of sick days dropped by almost ___.",
          acceptedAnswers: ["half"],
          explanation: {
            vi: "'fell by almost half' — fell = dropped → half.",
            en: "'Fell by almost half' — fell = dropped → half.",
          },
        },
        {
          kind: 'gap-fill',
          id: "l2b-i-read-05-q9",
          paragraphLabel: "E",
          number: 9,
          prompt: "On Fridays, two employees now answer ___.",
          acceptedAnswers: ["phone calls", "calls"],
          explanation: {
            vi: "'answer phone calls on that day' → phone calls (2 từ).",
            en: "'Answer phone calls on that day' → phone calls (two words).",
          },
        },
      ],
    },
    miniTest: [],
  },
]
