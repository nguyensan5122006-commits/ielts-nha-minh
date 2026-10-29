/**
 * reading-lessons.ts
 * ----------------------------------------------------------------------------
 * CÁC BÀI LUYỆN ĐỌC IELTS — LEVEL 3 (band 4.0 – 6.5, CEFR B1–B2), TRACK "ielts".
 *
 * File này CHỈ chứa dữ liệu (nội dung), không có giao diện.
 * Mỗi bài (mode 'reading') đi theo đúng 3 bước:
 *   1. teachingCards   : 1–2 thẻ chiến thuật (song ngữ Việt/Anh)
 *   2. exercises       : 4–6 câu khởi động (một số dựa trên đoạn văn ngắn trong readingPassages;
 *                        câu cuối luôn là speak-sentence để luyện phát âm từ khó trong bài)
 *   3. readingTask     : 1 bài đọc 550–800 từ, chia đoạn A, B, C…, 10–13 câu hỏi.
 *                        Mỗi câu có paragraphLabel (đáp án nằm ở đoạn nào) -> highlight khi xem giải thích.
 *                        examMinutes = thời gian khi bật "chế độ thi thật".
 *
 * Quy ước dạng câu hỏi (không thêm kind mới):
 *   - TRUE/FALSE/NOT GIVEN            -> kind 'true-false-not-given'
 *   - YES/NO/NOT GIVEN (ý tác giả)    -> kind 'choice', options ['YES', 'NO', 'NOT GIVEN']
 *   - Matching information / headings -> kind 'choice' (options = chữ cái đoạn / danh sách tiêu đề)
 *   - Sentence/summary completion, short answer -> kind 'gap-fill'
 *
 * CHẶNG 12 — TFNG, YNNG và nối thông tin:
 *   l3-i-read-12-01 : Paraphrase + True/False/Not Given     — câu chuyện cà phê Việt Nam
 *   l3-i-read-12-02 : Bẫy trong TFNG (all/some, only…)      — sự trở lại của xe đạp
 *   l3-i-read-12-03 : Yes/No/Not Given (quan điểm tác giả)   — bài bình luận "Bênh vực sự nhàm chán"
 *   l3-i-read-12-04 : Matching information (đoạn nào chứa…)  — lịch sử viên gạch
 *   l3-i-read-12-05 : Luyện có giờ: YNNG + matching          — có nên giữ chữ viết tay?
 *
 * CHẶNG 13 — Headings, điền câu/tóm tắt, trắc nghiệm, trả lời ngắn:
 *   l3-i-read-13-01 : Matching headings                       — vì sao chúng ta quên
 *   l3-i-read-13-02 : Sentence + summary completion           — tre, loài cỏ để xây nhà
 *   l3-i-read-13-03 : Trắc nghiệm (MCQ)                        — tâm lý học của việc chờ đợi
 *   l3-i-read-13-04 : Short-answer questions                   — đọc bầu trời: dấu hiệu thời tiết dân gian
 *   l3-i-read-13-05 : 1 passage hoàn chỉnh, 13 câu, 20 phút    — khủng hoảng cát
 *
 * Mọi bài đọc do nhóm nội dung tự soạn (không chép Cambridge/BC/IDP).
 * Kiểu dữ liệu xem ở: src/content/content-types.ts (mục 7 — ReadingTask)
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../../content-types'

/* Đáp án dùng chung */
const YES_NO_NG = ['YES', 'NO', 'NOT GIVEN']
const PARAGRAPHS_A_TO_F = ['A', 'B', 'C', 'D', 'E', 'F']
const PARAGRAPHS_A_TO_G = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

/* Danh sách tiêu đề (matching headings) */
const HEADINGS_FORGETTING = [
  'i. The role of sleep in learning',
  'ii. Practical ways to remember more',
  'iii. A surprising view of a common experience',
  'iv. Possible reasons why memories fade',
  'v. An early study whose findings have been confirmed',
  'vi. Why a perfect memory would be a disadvantage',
  'vii. The difference between short-term and long-term memory',
  'viii. Current uses of the research and possible future developments',
]
const HEADINGS_SAND = [
  'i. Why not all sand is equally useful',
  'ii. The many uses of a basic material',
  'iii. The hidden dangers of taking sand from rivers',
  'iv. The search for substitutes',
  'v. A resource from the ocean and its drawbacks',
  'vi. Why sand prices have fallen',
  'vii. How deserts are formed',
  'viii. The role of governments in planning cities',
]

export const level3IeltsReadingLessons: Lesson[] = [
  // ==========================================================================
  // CHẶNG 12 — BÀI 1: Paraphrase + True/False/Not Given — câu chuyện cà phê
  // ==========================================================================
  {
    id: 'l3-i-read-12-01',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Paraphrase và True / False / Not Given', en: 'Paraphrase and True / False / Not Given' },
    description: {
      vi: 'Nhận ra cách câu hỏi diễn đạt lại bài đọc, và phân biệt TRUE, FALSE, NOT GIVEN qua bài về cà phê Việt Nam.',
      en: 'Spot how questions paraphrase the passage, and tell TRUE, FALSE and NOT GIVEN apart in a text about Vietnamese coffee.',
    },
    teachingCards: [
      {
        title: { vi: 'Paraphrase — chìa khoá của Reading', en: 'Paraphrase: the key to Reading' },
        body: {
          vi: 'Câu hỏi IELTS hầu như **không lặp lại** từ trong bài mà **diễn đạt lại**: từ đồng nghĩa (**rapid → fast**), đổi loại từ (**grow → growth**), đổi cấu trúc (**A caused B → B resulted from A**). Cách làm: dùng **tên riêng, con số** để định vị, rồi so **ý**, không so từng chữ.',
          en: 'IELTS questions rarely **repeat** the passage; they **paraphrase** it with synonyms (**rapid → fast**), new word forms (**grow → growth**) and new structures (**A caused B → B resulted from A**). Method: use **names and numbers** to find the place, then compare **meaning**, not exact words.',
        },
        examples: [{ en: 'Fresh milk was scarce. → There was not enough fresh milk.', vi: '"Scarce" = khan hiếm = not enough.' }],
      },
      {
        title: { vi: 'TRUE / FALSE / NOT GIVEN', en: 'TRUE / FALSE / NOT GIVEN' },
        body: {
          vi: '**TRUE**: bài nói **cùng ý** với câu. **FALSE**: bài nói **ngược lại**. **NOT GIVEN**: bài **không có đủ thông tin** để biết đúng hay sai. Tuyệt đối **không dùng hiểu biết riêng** — chỉ dựa vào bài đọc.',
          en: '**TRUE**: the passage says **the same thing**. **FALSE**: the passage says **the opposite**. **NOT GIVEN**: there is **not enough information** to decide. Never use **your own knowledge** — use only the passage.',
        },
        examples: [
          { en: 'Most farmers grow robusta. → Few farmers grow robusta.', vi: 'FALSE — ngược nghĩa với bài.' },
          { en: 'Most farmers grow robusta. → Robusta is easier to sell.', vi: 'NOT GIVEN — bài không nói chuyện bán.' },
        ],
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-read-12-01-p1',
        title: 'A Tea Village',
        text: 'In the hills of northern Vietnam, a small village has grown tea for over two hundred years. Most of the leaves are still picked by hand, usually early in the morning. A few younger farmers have bought machines, but buyers in the city still pay more for hand-picked tea.',
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-12-01-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ trong bài với cách diễn đạt lại.', en: 'Match each passage phrase with its paraphrase.' },
        pairs: [
          { left: 'introduced', right: 'brought in' },
          { left: 'expanded rapidly', right: 'grew quickly' },
          { left: 'scarce', right: 'in short supply' },
          { left: 'the great majority of', right: 'most' },
          { left: 'less likely to be damaged', right: 'more resistant' },
        ],
        explanation: {
          vi: 'Đây là các kiểu paraphrase rất hay gặp trong câu hỏi IELTS.',
          en: 'These are typical paraphrases used in IELTS questions.',
        },
      },
      {
        id: 'l3-i-read-12-01-ex02',
        type: 'multiple-choice',
        question: 'Passage: "The drink was created because fresh milk was hard to find." Which sentence is a correct paraphrase?',
        options: [
          'A shortage of fresh milk led to the invention of the drink.',
          'The drink was made with fresh milk.',
          'The drink made fresh milk popular.',
          'Fresh milk was too expensive to buy.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Hard to find" = shortage; "was created because" = led to the invention.',
          en: '"Hard to find" = a shortage; "was created because" = led to the invention.',
        },
      },
      {
        id: 'l3-i-read-12-01-ex03',
        type: 'true-false',
        passageId: 'l3-i-read-12-01-p1',
        statement: "Machines are now used on most of the village's tea farms.",
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: '"Most of the leaves are still picked by hand"; chỉ "a few" có máy.',
          en: '"Most of the leaves are still picked by hand"; only "a few" have machines.',
        },
      },
      {
        id: 'l3-i-read-12-01-ex04',
        type: 'true-false',
        passageId: 'l3-i-read-12-01-p1',
        statement: 'Hand-picked tea sells for a higher price.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"Buyers... still pay more for hand-picked tea" = giá cao hơn.',
          en: '"Buyers... still pay more for hand-picked tea" = a higher price.',
        },
      },
      {
        id: 'l3-i-read-12-01-ex05',
        type: 'true-false',
        passageId: 'l3-i-read-12-01-p1',
        statement: 'The village sells its tea to other countries.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài chỉ nói "buyers in the city", không nhắc xuất khẩu.',
          en: 'The text only mentions "buyers in the city", nothing about exports.',
        },
      },
      {
        id: 'l3-i-read-12-01-ex06',
        type: 'speak-sentence',
        sentence: 'Robusta coffee is grown mainly in the Central Highlands.',
        translationVi: 'Cà phê robusta được trồng chủ yếu ở Tây Nguyên.',
        explanation: {
          vi: 'Đọc rõ /n/ cuối "grown", /dz/ cuối "Highlands"; nhấn ro-BUS-ta.',
          en: 'Pronounce final /n/ in "grown" and /dz/ in "Highlands"; stress ro-BUS-ta.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 18,
      instructions:
        'Questions 1–10: Do the following statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Questions 11–12: Find ONE WORD ONLY in the given paragraph that has the meaning shown.',
      strategyTip: {
        vi: 'Câu hỏi TFNG đi theo thứ tự bài. Gạch tên riêng/con số trong câu hỏi để định vị nhanh.',
        en: 'TFNG questions follow the passage order. Underline names and numbers to find each answer quickly.',
      },
      passage: {
        title: 'The Bean That Changed the Highlands',
        paragraphs: [
          {
            label: 'A',
            text: "Ask most people to name the world's largest coffee producer and they will probably answer correctly: Brazil. Far fewer know that second place belongs to Vietnam, a country whose coffee exports were still very small at the start of the 1980s. Today, coffee provides an income for hundreds of thousands of farming families, and Vietnamese coffee culture, from tiny plastic stools on the pavement to stylish modern cafés, attracts visitors from all over the world.",
          },
          {
            label: 'B',
            text: 'Coffee is thought to have arrived in Vietnam in the second half of the nineteenth century, brought by French missionaries, who planted the first trees near churches in the north of the country. These early plantations grew arabica, the type of coffee that was most popular in Europe. However, arabica proved difficult to grow in the northern climate, and production remained small for decades. It was only in the early twentieth century, when planters moved south to the Central Highlands, that coffee began to be grown on a larger scale.',
          },
          {
            label: 'C',
            text: "The highlands offered rich red soil and a long rainy season, but the real turning point was the choice of plant. Robusta, a hardier relative of arabica, grows well at lower altitudes, produces more fruit per tree and is less likely to be damaged by disease. Its beans contain roughly twice as much caffeine as arabica beans, which gives the drink a stronger, more bitter taste. Today, the great majority of Vietnam's coffee is robusta, and much of it is sold to companies that make instant coffee.",
          },
          {
            label: 'D',
            text: "The most dramatic growth came after economic reforms in the late 1980s allowed families to farm their own land and sell their crops freely. Encouraged by high world prices, thousands of farmers planted coffee, and the area used for the crop expanded rapidly during the 1990s. By the end of that decade, Vietnam had overtaken Colombia to become the world's second-largest producer. The boom brought money to the region, but it also had costs. At the start of the 2000s, so much coffee reached the world market that prices collapsed, and many farmers who had borrowed money to plant trees found themselves deep in debt.",
          },
          {
            label: 'E',
            text: "Inside Vietnam, coffee developed a style of its own. Because fresh milk was scarce for much of the twentieth century, people sweetened their coffee with condensed milk, which could be stored for months without a refrigerator. The coffee is usually made with a phin, a small metal filter that sits on top of the cup and lets the coffee drip through slowly. Hanoi's famous egg coffee is said to have been invented in the 1940s by a hotel bartender who whisked egg yolks with sugar as a substitute for milk. Whether or not every detail of this story is true, the drink is now served in cafés far beyond Vietnam.",
          },
          {
            label: 'F',
            text: "Today, the industry faces new challenges. Coffee farms need large amounts of water in the dry season, and in some provinces wells have to be dug deeper every year to reach it. Scientists warn that rising temperatures could make some of today's growing areas unsuitable for coffee in the coming decades. In response, some farmers are planting other crops, such as pepper and fruit trees, among their coffee plants, which helps to protect the soil and gives them a second source of income. Others are experimenting with high-quality 'fine robusta', hoping to show that Vietnamese beans can compete not only on price but also on flavour.",
          },
        ],
      },
      questions: [
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Vietnam produces more coffee than any other country apart from Brazil.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn A: "second place belongs to Vietnam" = chỉ đứng sau Brazil.',
            en: 'Para A: "second place belongs to Vietnam" = more than any country except Brazil.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'The first coffee trees in Vietnam were planted in the Central Highlands.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn B: cây đầu tiên trồng "near churches in the north" → mâu thuẫn.',
            en: 'Para B: the first trees were "near churches in the north", not the highlands.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'The missionaries chose arabica because it was cheaper than other types of coffee.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Đoạn B chỉ nói arabica phổ biến ở châu Âu, không nói gì về giá.',
            en: 'Para B says arabica was popular in Europe; price is never mentioned.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'Robusta plants are more easily harmed by disease than arabica plants.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn C: robusta "is less likely to be damaged by disease" → ngược lại.',
            en: 'Para C: robusta "is less likely to be damaged by disease" — the opposite.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'Coffee prices rose sharply at the start of the 2000s.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn D: đầu những năm 2000 "prices collapsed" (giá sụp đổ), không phải tăng.',
            en: 'Para D: at the start of the 2000s "prices collapsed" — they fell.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q06',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'Some farmers had borrowed money in order to grow coffee.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn D: "farmers who had borrowed money to plant trees" → TRUE.',
            en: 'Para D: "farmers who had borrowed money to plant trees".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q07',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'Condensed milk could be stored for a long period without being kept cold.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn E: "stored for months without a refrigerator" = để lâu không cần làm lạnh.',
            en: 'Para E: "stored for months without a refrigerator" = stored without being kept cold.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q08',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'Egg coffee is more popular with foreign visitors than with Vietnamese people.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Đoạn E nói cà phê trứng có ở nước ngoài, nhưng không so sánh ai thích hơn.',
            en: 'Para E says it is served abroad, but compares nobody\'s preferences.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q09',
          paragraphLabel: 'F',
          number: 9,
          prompt: 'In some areas, farmers now have to dig deeper wells to find water.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn F: "wells have to be dug deeper every year" → TRUE.',
            en: 'Para F: "wells have to be dug deeper every year".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-01-q10',
          paragraphLabel: 'F',
          number: 10,
          prompt: 'Scientists believe coffee will soon be impossible to grow anywhere in Vietnam.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn F: chỉ "some of today\'s growing areas", không phải mọi nơi.',
            en: 'Para F: only "some of today\'s growing areas" could become unsuitable.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-12-01-q11',
          paragraphLabel: 'C',
          number: 11,
          prompt: 'Paragraph C: a word meaning "tougher; better able to survive" = ___',
          acceptedAnswers: ['hardier'],
          explanation: {
            vi: 'Đoạn C: "a hardier relative of arabica" — hardier = khoẻ hơn, chịu được khắc nghiệt.',
            en: 'Para C: "a hardier relative of arabica" — hardier = tougher.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-12-01-q12',
          paragraphLabel: 'E',
          number: 12,
          prompt: 'Paragraph E: a word meaning "difficult to find; in short supply" = ___',
          acceptedAnswers: ['scarce'],
          explanation: {
            vi: 'Đoạn E: "fresh milk was scarce" — scarce = khan hiếm.',
            en: 'Para E: "fresh milk was scarce" — scarce = hard to find.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 12 — BÀI 2: Bẫy trong TFNG + matching information — sự trở lại của xe đạp
  // ==========================================================================
  {
    id: 'l3-i-read-12-02',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Bẫy True / False / Not Given', en: 'True / False / Not Given traps' },
    description: {
      vi: 'Luyện nhận ra từ hạn định (all, some, only, completely) và phân biệt FALSE với NOT GIVEN qua bài về xe đạp.',
      en: 'Practise spotting qualifiers (all, some, only, completely) and telling FALSE from NOT GIVEN in a text about bicycles.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ hạn định đổi cả đáp án', en: 'Qualifiers change the answer' },
        body: {
          vi: 'Một chữ nhỏ có thể đổi đáp án: **all / most / some / a few**, **always / often / rarely**, **completely / partly**, **the first / the only**. VD bài: "**Several** companies closed, and **the ones that survived**…" → câu "**All** companies closed" = **FALSE**. Gạch chân **từ hạn định** trong câu hỏi trước khi đọc.',
          en: 'One small word can change the answer: **all / most / some / a few**, **always / often / rarely**, **completely / partly**, **the first / the only**. Text: "**Several** companies closed, and **the ones that survived**…" → "**All** companies closed" = **FALSE**. Underline the **qualifiers** in each statement first.',
        },
      },
      {
        title: { vi: 'FALSE hay NOT GIVEN?', en: 'FALSE or NOT GIVEN?' },
        body: {
          vi: 'Hỏi: **bài có nói điều ngược lại không?** Có → **FALSE**. Bài **im lặng** về điểm đó → **NOT GIVEN**. VD bài: "The scheme started in 1965." Câu "It started in the 1980s" → FALSE. Câu "It was popular with tourists" → NOT GIVEN (bài không nhắc du khách).',
          en: 'Ask: **does the passage say the opposite?** Yes → **FALSE**. The passage is **silent** on that point → **NOT GIVEN**. Text: "The scheme started in 1965." → "It started in the 1980s" = FALSE. "It was popular with tourists" = NOT GIVEN (tourists are never mentioned).',
        },
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-read-12-02-p1',
        title: 'New Cycle Lanes',
        text: 'Last year, the town council opened four new cycle lanes. Three of them are separated from cars by a low wall; the fourth is simply painted on the road. Council figures show that cycling increased on all four routes, but the rise was much smaller on the painted lane.',
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-12-02-ex01',
        type: 'true-false',
        passageId: 'l3-i-read-12-02-p1',
        statement: 'All of the new cycle lanes are separated from traffic by a wall.',
        answer: 'FALSE',
        allowNotGiven: true,
        explanation: {
          vi: 'Chỉ "three of them" có tường; làn thứ tư chỉ sơn → "all" sai.',
          en: 'Only "three of them" have a wall; the fourth is painted → "all" is false.',
        },
      },
      {
        id: 'l3-i-read-12-02-ex02',
        type: 'true-false',
        passageId: 'l3-i-read-12-02-p1',
        statement: 'Cycling became more popular on every new route.',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: '"Cycling increased on all four routes" = every new route.',
          en: '"Cycling increased on all four routes" = on every new route.',
        },
      },
      {
        id: 'l3-i-read-12-02-ex03',
        type: 'true-false',
        passageId: 'l3-i-read-12-02-p1',
        statement: 'The painted lane was the cheapest to build.',
        answer: 'NOT GIVEN',
        allowNotGiven: true,
        explanation: {
          vi: 'Bài không nhắc chi phí xây làn nào cả.',
          en: 'The text never mentions the cost of any lane.',
        },
      },
      {
        id: 'l3-i-read-12-02-ex04',
        type: 'multiple-choice',
        question:
          'Passage: "Some riders use electric bikes to travel to work." Statement: "Electric bikes are mainly used for travelling to work." What is the answer?',
        options: ['NOT GIVEN', 'TRUE', 'FALSE'],
        correctIndex: 0,
        explanation: {
          vi: '"Some" không cho biết đó có phải mục đích chính hay không → NOT GIVEN.',
          en: '"Some" does not tell us whether it is the main use → NOT GIVEN.',
        },
      },
      {
        id: 'l3-i-read-12-02-ex05',
        type: 'multiple-choice',
        question: 'Which word in a statement should make you check the passage especially carefully?',
        options: ['completely', 'bicycle', 'city', 'road'],
        correctIndex: 0,
        explanation: {
          vi: '"Completely" là từ hạn định mạnh — bài thường chỉ nói "partly" hoặc "still".',
          en: '"Completely" is a strong qualifier — the passage often says only "partly".',
        },
      },
      {
        id: 'l3-i-read-12-02-ex06',
        type: 'speak-sentence',
        sentence: 'Protected cycle lanes encourage more people to ride.',
        translationVi: 'Làn xe đạp có rào chắn khuyến khích nhiều người đạp xe hơn.',
        explanation: {
          vi: '"Protected" đuôi -ed đọc /ɪd/; "lanes" có /nz/ cuối; nhấn en-COUR-age.',
          en: '"Protected" ends in /ɪd/; "lanes" ends in /nz/; stress en-COUR-age.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 18,
      instructions:
        'Questions 1–8: Do the following statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN. Questions 9–12: The passage has seven paragraphs, A–G. Which paragraph contains the following information? You may use any letter more than once.',
      strategyTip: {
        vi: 'Trước khi tìm trong bài, khoanh tròn từ hạn định trong mỗi câu (all, completely, most…). Đó thường là chỗ quyết định đáp án.',
        en: 'Before searching the passage, circle the qualifier in each statement (all, completely, most…). It often decides the answer.',
      },
      passage: {
        title: "The Bicycle's Second Life",
        paragraphs: [
          {
            label: 'A',
            text: 'For much of the twentieth century, the bicycle seemed to be a machine whose time had passed. In Europe and North America, rising incomes meant that millions of families bought their first car, and city planners widened roads to make room for them. Cycling came to be seen as a hobby for enthusiasts or a way for children to play, rather than a serious means of transport. Yet over the last thirty years, the bicycle has made a remarkable comeback in cities around the world, and transport planners now talk about it as a serious answer to traffic jams, air pollution and the health problems caused by inactive lifestyles.',
          },
          {
            label: 'B',
            text: 'The idea of sharing bicycles is older than many people realise. In 1965, a group of activists in Amsterdam painted a number of old bicycles white and left them unlocked around the city for anyone to use. The experiment did not last long. Within weeks, many of the bikes had been stolen or thrown into canals, and the police removed others, because leaving a bicycle unlocked was against the law at the time. Later schemes in other cities tried to solve the problem of theft by asking users to put a coin into a lock, which they got back when they returned the bike. These schemes worked better, but bikes still disappeared, because users could not be identified.',
          },
          {
            label: 'C',
            text: 'The breakthrough came with technology. From the early 2000s, cities began to install docking stations where bikes could only be released with a membership card or, later, a mobile phone. Because every user could now be identified, theft fell dramatically. Paris opened one of the best-known systems in 2007, and within a few years hundreds of cities around the world had followed its example.',
          },
          {
            label: 'D',
            text: "The next stage was the 'dockless' bike, which is found and unlocked using a phone app and can be left almost anywhere. Dockless schemes spread at astonishing speed in Chinese cities around 2016 and 2017, when competing companies placed millions of brightly coloured bikes on the streets. But the companies had produced far more bikes than people needed. Pavements were blocked, and in some cities huge piles of unwanted bicycles had to be collected and stored on empty land. Several of the smaller companies went out of business, and the ones that survived had to accept strict limits on the number of bikes they could put on the streets.",
          },
          {
            label: 'E',
            text: 'Sharing schemes alone, however, do not persuade people to cycle. Surveys consistently find that the main reason people give for not cycling is fear of traffic. Lanes that are simply painted on busy roads do little to change this, because riders still feel exposed to cars and lorries. What makes the biggest difference is physical separation: lanes protected by a kerb, a row of parked cars or a low wall. When the Spanish city of Seville built a network of separated lanes in the late 2000s, the number of daily bike trips increased many times over within a few years, although it started from a very low level.',
          },
          {
            label: 'F',
            text: 'The newest change is electric power. An electric bicycle, or e-bike, has a small motor that helps the rider when they pedal, which makes hills and long distances much less tiring. Surveys suggest that e-bike owners tend to ride further and more often than owners of ordinary bikes, and e-bikes are especially popular with older riders, some of whom had given up cycling years earlier. Critics point out that e-bikes are heavier and faster than ordinary bicycles, and some cities have reported a rise in accidents involving them.',
          },
          {
            label: 'G',
            text: "Not everyone welcomes the bicycle's return. Some shop owners fear that removing parking spaces to build cycle lanes will drive their customers away. However, several studies have found that people who arrive by bike tend to spend less per visit than drivers but visit more often, so that over a month they may spend as much as, or even more than, customers who come by car. The debate is far from over, but one thing is clear: the bicycle is no longer seen as a relic of the past.",
          },
        ],
      },
      questions: [
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'For much of the twentieth century, cycling was widely regarded as a serious form of transport.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn A: là thú vui/trò chơi "rather than a serious means of transport".',
            en: 'Para A: a hobby or play "rather than a serious means of transport".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'The white bicycles in Amsterdam were provided by the city authorities.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn B: xe do "a group of activists" đưa ra; cảnh sát còn thu bớt.',
            en: 'Para B: "a group of activists" provided them; the police even removed some.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Some of the white bicycles were taken away by the police.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn B: "the police removed others" → TRUE.',
            en: 'Para B: "the police removed others".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q04',
          paragraphLabel: 'B',
          number: 4,
          prompt: 'Coin-deposit schemes completely solved the problem of theft.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn B: "worked better, but bikes still disappeared" → không "completely".',
            en: 'Para B: "worked better, but bikes still disappeared" — not "completely".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'All of the dockless bike companies in China went out of business.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn D: "the ones that survived" → không phải tất cả đều phá sản.',
            en: 'Para D: "the ones that survived" shows not all companies closed.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q06',
          paragraphLabel: 'E',
          number: 6,
          prompt: "Seville's separated cycle lanes cost less than the city had expected.",
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Đoạn E nói kết quả ở Seville, hoàn toàn không nhắc chi phí.',
            en: 'Para E gives Seville\'s results but says nothing about cost.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q07',
          paragraphLabel: 'F',
          number: 7,
          prompt: 'According to surveys, people with e-bikes tend to cycle more often than people with ordinary bicycles.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn F: e-bike owners "ride further and more often" → TRUE.',
            en: 'Para F: e-bike owners "ride further and more often than owners of ordinary bikes".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-02-q08',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Most cities require e-bike riders to wear a helmet.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Đoạn F có nói tai nạn, nhưng không nói luật đội mũ bảo hiểm.',
            en: 'Para F mentions accidents, but nothing about helmet rules.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-02-q09',
          paragraphLabel: 'B',
          number: 9,
          prompt: 'Which paragraph contains: an example of a scheme that ended after a short time',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: thử nghiệm xe trắng "did not last long" → kết thúc nhanh.',
            en: 'Para B: the white bicycle experiment "did not last long".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-02-q10',
          paragraphLabel: 'E',
          number: 10,
          prompt: 'Which paragraph contains: a reason why painted lanes attract few new cyclists',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 4,
          explanation: {
            vi: 'Đoạn E: làn sơn vô ích vì người đi xe "still feel exposed to cars".',
            en: 'Para E: painted lanes fail because riders "still feel exposed to cars and lorries".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-02-q11',
          paragraphLabel: 'D',
          number: 11,
          prompt: 'Which paragraph contains: problems caused by an oversupply of bicycles',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D: "far more bikes than people needed" → vỉa hè bị chắn, xe chất đống.',
            en: 'Para D: "far more bikes than people needed" — blocked pavements, piles of bikes.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-02-q12',
          paragraphLabel: 'G',
          number: 12,
          prompt: 'Which paragraph contains: a comparison of how much two groups of shoppers spend',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 6,
          explanation: {
            vi: 'Đoạn G: người đi xe đạp "spend less per visit... but visit more often" so với người lái xe.',
            en: 'Para G: cyclists "spend less per visit than drivers but visit more often".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 12 — BÀI 3: Yes / No / Not Given — bài bình luận "Bênh vực sự nhàm chán"
  // ==========================================================================
  {
    id: 'l3-i-read-12-03',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Yes / No / Not Given: quan điểm của tác giả', en: "Yes / No / Not Given: the writer's views" },
    description: {
      vi: 'Phân biệt quan điểm của tác giả với ý kiến người khác trong một bài bình luận về sự nhàm chán của trẻ em.',
      en: "Separate the writer's own views from other people's opinions in an article about children and boredom.",
    },
    teachingCards: [
      {
        title: { vi: 'YNNG khác TFNG thế nào?', en: 'How is YNNG different from TFNG?' },
        body: {
          vi: 'TFNG hỏi về **thông tin/sự kiện**. YNNG hỏi về **quan điểm của tác giả**. **YES**: tác giả **đồng ý** với câu. **NO**: tác giả **phản đối**. **NOT GIVEN**: không thể biết tác giả nghĩ gì. Bài YNNG thường là **bài nghị luận**, có nhiều từ thể hiện thái độ.',
          en: "TFNG asks about **facts**. YNNG asks about **the writer's views**. **YES**: the writer **agrees** with the statement. **NO**: the writer **disagrees**. **NOT GIVEN**: impossible to know what the writer thinks. YNNG passages are usually **argumentative**, full of attitude words.",
        },
      },
      {
        title: { vi: 'Ý tác giả hay ý người khác?', en: "Writer's view or someone else's?" },
        body: {
          vi: 'Bẫy lớn nhất: bài **thuật lại ý người khác** ("Many parents believe…", "Critics argue…") rồi tác giả **phản bác**. Tìm từ thái độ: **I believe, in my view, rightly, wrongly, it is a mistake to**. "**None of this means that…**" thường báo hiệu tác giả **không đồng ý** với một kết luận quá đà.',
          en: 'The biggest trap: the passage **reports other people\'s views** ("Many parents believe…", "Critics argue…") and the writer then **rejects them**. Look for attitude words: **I believe, in my view, rightly, wrongly, it is a mistake to**. "**None of this means that…**" often shows the writer **rejects** an extreme conclusion.',
        },
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-read-12-03-p1',
        title: 'Games and Children',
        text: 'Many people claim that video games make children lazy. In my view, this is simply not the case: the best games demand concentration, planning and teamwork. That said, I would never suggest that games should replace outdoor play, which children need for their physical health.',
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-12-03-ex01',
        type: 'multiple-choice',
        passageId: 'l3-i-read-12-03-p1',
        question: 'The writer thinks video games make children lazy. YES, NO or NOT GIVEN?',
        options: YES_NO_NG,
        correctIndex: 1,
        explanation: {
          vi: '"Many people claim..." là ý người khác; tác giả: "this is simply not the case".',
          en: '"Many people claim..." is others\' view; the writer says "this is simply not the case".',
        },
      },
      {
        id: 'l3-i-read-12-03-ex02',
        type: 'multiple-choice',
        passageId: 'l3-i-read-12-03-p1',
        question: "The writer believes outdoor play is important for children's health. YES, NO or NOT GIVEN?",
        options: YES_NO_NG,
        correctIndex: 0,
        explanation: {
          vi: '"Outdoor play, which children need for their physical health" → YES.',
          en: '"Outdoor play, which children need for their physical health" → YES.',
        },
      },
      {
        id: 'l3-i-read-12-03-ex03',
        type: 'multiple-choice',
        passageId: 'l3-i-read-12-03-p1',
        question: 'The writer thinks parents should play video games with their children. YES, NO or NOT GIVEN?',
        options: YES_NO_NG,
        correctIndex: 2,
        explanation: {
          vi: 'Đoạn văn không nhắc tới việc cha mẹ chơi cùng con → NOT GIVEN.',
          en: 'The text never mentions parents playing with children → NOT GIVEN.',
        },
      },
      {
        id: 'l3-i-read-12-03-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ với ý nghĩa của nó.', en: 'Match each phrase with what it shows.' },
        pairs: [
          { left: 'It is a myth that…', right: 'the writer disagrees' },
          { left: 'Rightly, many teachers…', right: 'the writer agrees with the teachers' },
          { left: 'Critics argue that…', right: "someone else's opinion" },
          { left: 'In my view…', right: "the writer's own opinion" },
        ],
        explanation: {
          vi: 'Từ thái độ cho biết ai đang nói và tác giả đồng ý hay không.',
          en: 'Attitude words show whose view it is and whether the writer agrees.',
        },
      },
      {
        id: 'l3-i-read-12-03-ex05',
        type: 'speak-sentence',
        sentence: 'Boredom can encourage children to be more creative.',
        translationVi: 'Sự nhàm chán có thể khuyến khích trẻ sáng tạo hơn.',
        explanation: {
          vi: 'Nhấn BORE-dom và cre-A-tive; đọc rõ /n/ cuối "children".',
          en: 'Stress BORE-dom and cre-A-tive; say the final /n/ in "children".',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 18,
      instructions:
        'Questions 1–8: Do the following statements agree with the views of the writer? Choose YES, NO or NOT GIVEN. Questions 9–12: The passage has six paragraphs, A–F. Which paragraph contains the following information?',
      strategyTip: {
        vi: 'Với mỗi câu YNNG, hỏi: đây là ý của tác giả hay của "many parents", "critics"? Chỉ quan điểm của tác giả mới quyết định đáp án.',
        en: 'For each statement, ask: is this the writer\'s view, or that of "many parents" or "critics"? Only the writer\'s view counts.',
      },
      passage: {
        title: 'In Defence of Boredom',
        paragraphs: [
          {
            label: 'A',
            text: "Ask a group of parents what they fear most during the school holidays, and many will give the same answer: the words 'I'm bored'. In many families, these words are treated almost as an emergency. A tablet is handed over, a class is booked, a trip is planned. I understand the impulse — nobody enjoys listening to a complaining child — but I believe we have come to see boredom as a problem to be solved, when it is often an opportunity to be used.",
          },
          {
            label: 'B',
            text: 'It is worth remembering how recent our fear of boredom is. A generation ago, long summer afternoons with nothing planned were perfectly normal, and children were expected to find their own amusement. Today, many children move from school to after-school clubs to screens with barely a pause. Organised activities have real value, and I would not want to return to a time when children from poorer families had few chances to learn music or sport. But a timetable with no empty space leaves children no opportunity to discover what they would choose to do if nobody were choosing for them.',
          },
          {
            label: 'C',
            text: 'There is growing evidence that boredom can be productive. In one frequently quoted experiment, adults who had first completed a dull task — copying numbers from a telephone directory — later came up with more creative ideas than those who had not. Psychologists suggest that when the mind has nothing interesting to focus on, it begins to wander, and a wandering mind makes unexpected connections. Of course, a single study proves little on its own, and researchers are rightly cautious about applying its findings to children. Still, the idea fits with what many writers, artists and inventors say about where their best ideas come from.',
          },
          {
            label: 'D',
            text: "Critics of this view argue that boredom is simply unpleasant, and that it is unkind to leave children in a state they dislike. Some also point out that bored teenagers are more likely to take risks. These concerns deserve to be taken seriously, but they confuse two different things. Chronic boredom — a long-term feeling that life has no meaning or purpose — is genuinely harmful and should never be ignored. The short, everyday boredom of a rainy Sunday afternoon is something quite different. It is uncomfortable, but discomfort is not the same as harm.",
          },
          {
            label: 'E',
            text: 'The real danger, in my view, is not boredom itself but the speed with which we now escape from it. Smartphones mean that no adult or child ever has to experience even a minute of empty time. Waiting for a bus, standing in a queue, sitting in a car: all these moments are now filled with a screen. As a result, many young people never develop the ability to tolerate a quiet mind, and when they finally face a situation without entertainment, they find it unbearable. Like any skill, the ability to cope with boredom has to be practised.',
          },
          {
            label: 'F',
            text: "None of this means that parents should deliberately make their children's lives dull. What it does mean is that the next time a child complains of having nothing to do, the best response may be to do nothing at all. Leave some paper, a few old boxes and perhaps a pile of books within reach, and then step away. The first half-hour may be full of complaints. But in my experience, what follows is often a den built from cushions, a play invented for the whole family or a story written in a notebook. Children are far better at filling empty time than we give them credit for.",
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: "It is understandable that parents want to act quickly when a child says 'I'm bored'.",
          options: YES_NO_NG,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn A: "I understand the impulse" → tác giả thông cảm → YES.',
            en: 'Para A: "I understand the impulse" — the writer sympathises → YES.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Organised activities for children have little value.',
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: "Organised activities have real value" → NO.',
            en: 'Para B: "Organised activities have real value" → NO.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Children today get more homework than children did a generation ago.',
          options: YES_NO_NG,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn B so sánh thời gian rảnh, không nói gì về bài tập về nhà.',
            en: 'Para B compares free time, not homework → NOT GIVEN.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'The telephone directory experiment proves that boredom makes children more creative.',
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn C: "a single study proves little"; thí nghiệm làm với người lớn → NO.',
            en: 'Para C: "a single study proves little", and it tested adults → NO.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'Long-term boredom can be damaging and needs to be taken seriously.',
          options: YES_NO_NG,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn D: chronic boredom "is genuinely harmful and should never be ignored" → YES.',
            en: 'Para D: chronic boredom "is genuinely harmful and should never be ignored" → YES.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q06',
          paragraphLabel: 'E',
          number: 6,
          prompt: 'Smartphones have made it harder for young people to cope with empty time.',
          options: YES_NO_NG,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn E: vì màn hình, nhiều bạn trẻ "never develop the ability to tolerate a quiet mind".',
            en: 'Para E: because of screens, many "never develop the ability to tolerate a quiet mind".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q07',
          paragraphLabel: 'F',
          number: 7,
          prompt: "Parents should deliberately make their children's lives boring.",
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn F: "None of this means that parents should deliberately make... lives dull" → NO.',
            en: 'Para F: "None of this means that parents should deliberately make... lives dull".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q08',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Simple materials lead to more creative play than expensive toys do.',
          options: YES_NO_NG,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn F nhắc giấy, hộp cũ nhưng không so sánh với đồ chơi đắt tiền.',
            en: 'Para F mentions paper and boxes but never compares them with expensive toys.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q09',
          paragraphLabel: 'C',
          number: 9,
          prompt: 'Which paragraph contains: a description of an experiment',
          options: PARAGRAPHS_A_TO_F,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn C mô tả thí nghiệm "copying numbers from a telephone directory".',
            en: 'Para C describes the experiment of "copying numbers from a telephone directory".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q10',
          paragraphLabel: 'D',
          number: 10,
          prompt: 'Which paragraph contains: a distinction between two types of boredom',
          options: PARAGRAPHS_A_TO_F,
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D phân biệt "chronic boredom" và "short, everyday boredom".',
            en: 'Para D separates "chronic boredom" from "short, everyday boredom".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q11',
          paragraphLabel: 'E',
          number: 11,
          prompt: 'Which paragraph contains: a list of everyday moments that are now filled with screens',
          options: PARAGRAPHS_A_TO_F,
          correctIndex: 4,
          explanation: {
            vi: 'Đoạn E: "Waiting for a bus, standing in a queue, sitting in a car".',
            en: 'Para E: "Waiting for a bus, standing in a queue, sitting in a car".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-03-q12',
          paragraphLabel: 'F',
          number: 12,
          prompt: 'Which paragraph contains: practical advice for parents',
          options: PARAGRAPHS_A_TO_F,
          correctIndex: 5,
          explanation: {
            vi: 'Đoạn F khuyên: để sẵn giấy, hộp cũ, sách "and then step away".',
            en: 'Para F advises: leave paper, boxes and books "and then step away".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 12 — BÀI 4: Matching information (đoạn nào chứa…) — lịch sử viên gạch
  // ==========================================================================
  {
    id: 'l3-i-read-12-04',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Matching information: đoạn nào chứa thông tin?', en: 'Matching information: which paragraph?' },
    description: {
      vi: 'Tìm đoạn chứa một chi tiết cụ thể (ví dụ, lý do, dự đoán…) trong bài về lịch sử viên gạch.',
      en: 'Find the paragraph that contains a specific detail (an example, a reason, a prediction…) in a text about bricks.',
    },
    teachingCards: [
      {
        title: { vi: 'Tìm chi tiết, không tìm ý chính', en: 'Details, not main ideas' },
        body: {
          vi: 'Dạng "Which paragraph contains…?" hỏi về **một chi tiết** nằm đâu đó trong đoạn (một ví dụ, một con số, một lý do), **không phải ý chính** của đoạn. Câu hỏi **không theo thứ tự** bài. Một đoạn có thể được dùng **hơn 1 lần**, hoặc **không lần nào**.',
          en: '"Which paragraph contains…?" asks about **one detail** somewhere in a paragraph (an example, a number, a reason), **not the main idea**. The questions are **not in passage order**. A paragraph may be used **more than once**, or **not at all**.',
        },
      },
      {
        title: { vi: 'Gạch chân loại thông tin', en: 'Underline the type of information' },
        body: {
          vi: 'Gạch chân **loại thông tin** cần tìm: **an example of** (ví dụ), **a reason for** (lý do), **a comparison** (so sánh), **a description of a process** (quy trình), **a reference to** (có nhắc tới), **a prediction** (dự đoán). Rồi đọc **từng đoạn** và hỏi: đoạn này có loại thông tin đó không?',
          en: 'Underline the **type of information**: **an example of**, **a reason for**, **a comparison**, **a description of a process**, **a reference to**, **a prediction**. Then read **each paragraph** and ask: does it contain that type of information?',
        },
        examples: [{ en: 'Some engineers predict that bricks could be grown.', vi: '"Predict" → khớp với "a prediction about…".' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-12-04-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối loại thông tin với câu ví dụ.', en: 'Match each type of information with an example sentence.' },
        pairs: [
          { left: 'a prediction', right: 'By 2040, demand is expected to double.' },
          { left: 'a comparison', right: 'Stone lasts far longer than wood.' },
          { left: 'a reason', right: 'This happened because wood was scarce.' },
          { left: 'a process', right: 'First the clay is mixed, then shaped, then dried.' },
          { left: 'an example', right: 'Some cities, such as Hue, kept their old walls.' },
        ],
        explanation: {
          vi: 'Nhận ra loại thông tin giúp bạn quét bài nhanh hơn.',
          en: 'Recognising the type of information helps you scan faster.',
        },
      },
      {
        id: 'l3-i-read-12-04-ex02',
        type: 'multiple-choice',
        question: 'Question: "a reference to a law". Which sentence would match?',
        options: [
          'The government banned the old kilns in 2010.',
          'The kilns produced a lot of smoke.',
          'Builders prefer lighter blocks.',
          'Clay is often found near rivers.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Banned" (cấm) liên quan tới luật lệ; các câu khác không nhắc luật.',
          en: '"Banned" relates to a law; the other sentences do not.',
        },
      },
      {
        id: 'l3-i-read-12-04-ex03',
        type: 'multiple-choice',
        question: 'In a "Which paragraph contains…?" task, which statement is TRUE?',
        options: [
          'The same paragraph can be the answer to two questions.',
          'The questions follow the order of the paragraphs.',
          'Each paragraph is used exactly once.',
          'The answer is always in the first sentence of a paragraph.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Một đoạn có thể dùng nhiều lần; câu hỏi không theo thứ tự bài.',
          en: 'A paragraph can be used more than once; questions are not in order.',
        },
      },
      {
        id: 'l3-i-read-12-04-ex04',
        type: 'multiple-choice',
        question: 'Question: "a reason why a material stopped being used". Which sentence matches?',
        options: [
          'Builders stopped using it because it cracked in cold weather.',
          'It is still used in many villages today.',
          'It was first used about two thousand years ago.',
          'It is made from a mixture of sand and lime.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Stopped using it because..." = lý do vật liệu không còn được dùng.',
          en: '"Stopped using it because..." gives the reason it fell out of use.',
        },
      },
      {
        id: 'l3-i-read-12-04-ex05',
        type: 'speak-sentence',
        sentence: 'Fired bricks are stronger and last much longer than mud bricks.',
        translationVi: 'Gạch nung chắc hơn và bền lâu hơn nhiều so với gạch bùn.',
        explanation: {
          vi: '"Fired" đọc /faɪəd/; đọc rõ /ks/ cuối "bricks" và /st/ cuối "last".',
          en: '"Fired" is /faɪəd/; say /ks/ in "bricks" and /st/ in "last" clearly.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 18,
      instructions:
        'Questions 1–8: The passage has seven paragraphs, A–G. Which paragraph contains the following information? You may use any letter more than once. Questions 9–12: Do the following statements agree with the information in the passage? Choose TRUE, FALSE or NOT GIVEN.',
      strategyTip: {
        vi: 'Đọc hết 8 câu matching trước, gạch loại thông tin. Rồi đọc từng đoạn A→G một lần và đánh dấu câu nào khớp.',
        en: 'Read all eight matching questions first. Then read paragraphs A→G once, ticking any question each paragraph answers.',
      },
      passage: {
        title: 'The Humble Brick',
        paragraphs: [
          {
            label: 'A',
            text: "Look around almost any town in the world and you will see bricks. They are so common that we rarely notice them, yet the brick is one of humanity's oldest and most successful inventions. Its basic form — a block of clay or earth small enough to be held in one hand — has changed remarkably little over thousands of years, even though the methods used to make it have been transformed.",
          },
          {
            label: 'B',
            text: 'The earliest bricks were not fired at all. Around nine thousand years ago, people in the Middle East began shaping mud mixed with straw into blocks and leaving them to dry in the sun. The straw helped to hold the mud together and stopped the bricks from cracking as they dried. Sun-dried bricks were cheap and easy to make, and in hot, dry climates they could last for centuries. Their great weakness was water: heavy rain could slowly wash them away, which is why many ancient mud-brick buildings survive today only as low mounds of earth.',
          },
          {
            label: 'C',
            text: 'The solution was fire. When clay is heated to a very high temperature in a kiln, it undergoes a chemical change and becomes almost as hard as stone. Fired bricks first appeared more than five thousand years ago, and they were far more resistant to rain and frost than sun-dried ones. However, firing required huge quantities of fuel, so for many centuries fired bricks were used mainly for the most important buildings, such as palaces and temples, or only for the outer walls that faced the weather, while the inner walls were still built of mud.',
          },
          {
            label: 'D',
            text: 'For most of history, bricks were made by hand, and their size varied from place to place. This changed during the nineteenth century, when machines were invented that could press clay into moulds far faster than any worker. At the same time, new types of kiln allowed bricks to be fired continuously rather than in separate batches. Production rose dramatically and prices fell, and in many industrial cities, long rows of identical brick houses were built for the workers who were moving from the countryside to find jobs in factories.',
          },
          {
            label: 'E',
            text: 'Bricks offer several practical advantages that help to explain their long popularity. They do not burn, they need very little maintenance, and they are good at storing heat: a thick brick wall absorbs warmth during the day and releases it slowly at night, which helps to keep indoor temperatures steady. Because each brick is small, builders can also create curves, arches and decorative patterns that would be difficult to achieve with larger materials.',
          },
          {
            label: 'F',
            text: "The brick's environmental record, however, is mixed. Firing clay still uses a great deal of energy, and in many developing countries bricks are produced in small traditional kilns that burn coal, wood or even old tyres, releasing smoke that damages the health of workers and nearby residents. In Vietnam, for example, the government has set out to replace traditional kilns with cleaner technology and to encourage the use of unfired building blocks. Digging clay can also damage farmland, since the best clay is often found in the same fertile river valleys where crops are grown.",
          },
          {
            label: 'G',
            text: 'Researchers are now looking for ways to make the brick fit for a low-carbon future. One approach is the compressed earth block, which is made by pressing damp soil mixed with a little cement in a machine and then leaving it to harden without any firing. Another is to add waste materials, such as ash from power stations or crushed glass, to the clay, which can reduce the amount of new clay needed and lower the firing temperature. Some engineers even predict that, within a few decades, bricks could be grown rather than made, using bacteria that bind grains of sand together. If they are right, the oldest building material of all may be about to begin a new chapter.',
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q01',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Which paragraph contains: a reason why some ancient buildings now look like small hills',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: mưa bào mòn gạch, nên công trình cổ "survive today only as low mounds of earth".',
            en: 'Para B: rain washed bricks away, so buildings "survive today only as low mounds of earth".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q02',
          paragraphLabel: 'F',
          number: 2,
          prompt: 'Which paragraph contains: an example of a government trying to change how bricks are produced',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 5,
          explanation: {
            vi: 'Đoạn F: "In Vietnam... the government has set out to replace traditional kilns".',
            en: 'Para F: "In Vietnam... the government has set out to replace traditional kilns".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q03',
          paragraphLabel: 'E',
          number: 3,
          prompt: 'Which paragraph contains: an explanation of how brick walls help to control indoor temperatures',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 4,
          explanation: {
            vi: 'Đoạn E: tường gạch hấp thụ nhiệt ban ngày, toả ra ban đêm, giữ nhiệt độ "steady".',
            en: 'Para E: walls absorb warmth by day and release it at night, keeping temperatures "steady".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q04',
          paragraphLabel: 'B',
          number: 4,
          prompt: 'Which paragraph contains: a reference to a material that was added to mud to prevent cracking',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: rơm (straw) "stopped the bricks from cracking" — đoạn B dùng lần thứ hai.',
            en: 'Para B: the straw "stopped the bricks from cracking" — B is used twice.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q05',
          paragraphLabel: 'G',
          number: 5,
          prompt: 'Which paragraph contains: a prediction about a possible future way of producing bricks',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 6,
          explanation: {
            vi: 'Đoạn G: "Some engineers even predict... bricks could be grown rather than made".',
            en: 'Para G: "Some engineers even predict... bricks could be grown rather than made".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q06',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'Which paragraph contains: a reason why fired bricks were not used for every building in the past',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn C: nung "required huge quantities of fuel" nên chỉ dùng cho công trình quan trọng.',
            en: 'Para C: firing "required huge quantities of fuel", so it was kept for important buildings.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q07',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'Which paragraph contains: a link between people moving to cities and a type of housing',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D: dãy nhà gạch xây cho công nhân "moving from the countryside".',
            en: 'Para D: rows of brick houses for workers "moving from the countryside".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-04-q08',
          paragraphLabel: 'A',
          number: 8,
          prompt: 'Which paragraph contains: a claim that the basic shape of the brick has hardly changed',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn A: hình dạng cơ bản "has changed remarkably little" = hardly changed.',
            en: 'Para A: its basic form "has changed remarkably little" = hardly changed.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-04-q09',
          paragraphLabel: 'B',
          number: 9,
          prompt: 'Sun-dried bricks could survive for a long time in hot, dry places.',
          answer: 'TRUE',
          explanation: {
            vi: 'Đoạn B: "in hot, dry climates they could last for centuries" → TRUE.',
            en: 'Para B: "in hot, dry climates they could last for centuries".',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-04-q10',
          paragraphLabel: 'C',
          number: 10,
          prompt: 'Fired bricks were less able to resist frost than sun-dried bricks.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn C: gạch nung "far more resistant to rain and frost" → ngược lại.',
            en: 'Para C: fired bricks were "far more resistant to rain and frost" — the opposite.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-04-q11',
          paragraphLabel: 'D',
          number: 11,
          prompt: 'The first brick-making machines were developed in Britain.',
          answer: 'NOT GIVEN',
          explanation: {
            vi: 'Đoạn D nói máy ra đời thế kỷ 19, không nói ở nước nào.',
            en: 'Para D dates the machines to the 1800s but names no country.',
          },
        },
        {
          kind: 'true-false-not-given',
          id: 'l3-i-read-12-04-q12',
          paragraphLabel: 'G',
          number: 12,
          prompt: 'Compressed earth blocks are fired at a lower temperature than ordinary bricks.',
          answer: 'FALSE',
          explanation: {
            vi: 'Đoạn G: khối đất nén cứng lại "without any firing" — không nung chút nào.',
            en: 'Para G: they harden "without any firing" — they are not fired at all.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 12 — BÀI 5: Luyện có giờ — YNNG + matching information (bài nghị luận về chữ viết tay)
  // ==========================================================================
  {
    id: 'l3-i-read-12-05',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Luyện có giờ: Yes/No/Not Given + nối thông tin', en: 'Timed practice: Yes/No/Not Given + matching' },
    description: {
      vi: 'Làm trọn 1 bài đọc nghị luận với 13 câu trong 20 phút, kết hợp YNNG và matching information.',
      en: 'Complete one argumentative passage with 13 questions in 20 minutes, combining YNNG and matching information.',
    },
    teachingCards: [
      {
        title: { vi: 'Chia thời gian 20 phút', en: 'Managing 20 minutes' },
        body: {
          vi: 'Một passage ≈ **20 phút cho 13 câu**. Gợi ý: **2–3 phút** đọc lướt cả bài, khoảng **1 phút/câu**, **2 phút** cuối kiểm tra. Kẹt một câu quá 2 phút? **Đánh dấu, bỏ qua**, quay lại sau. Không bao giờ để trống — đoán vẫn có cơ hội đúng.',
          en: 'One passage ≈ **20 minutes for 13 questions**. Plan: **2–3 minutes** skimming, about **1 minute per question**, and **2 minutes** at the end to check. Stuck for over 2 minutes? **Mark it and move on**, then come back. Never leave a blank — a guess can still score.',
        },
      },
      {
        title: { vi: 'Làm dạng nào trước?', en: 'Which question type first?' },
        body: {
          vi: 'YES/NO/NOT GIVEN đi **theo thứ tự bài**, nên làm trước — vừa làm vừa hiểu bài. Matching information **không theo thứ tự**, làm sau khi đã quen bài: đọc **tất cả câu hỏi** trước, rồi đọc từng đoạn xem khớp câu nào.',
          en: 'YES/NO/NOT GIVEN questions **follow the passage order**, so do them first — they help you learn the text. Matching information is **not in order**, so do it later: read **all the questions** first, then check each paragraph against them.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-12-05-ex01',
        type: 'multiple-choice',
        question: 'You have 20 minutes for 13 questions. After 12 minutes you have finished only 6. What should you do?',
        options: [
          'Speed up and skip any question that takes too long',
          'Read the whole passage again carefully',
          'Stop and re-check your first 6 answers',
          'Leave the last 7 questions blank',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Còn 8 phút cho 7 câu: phải tăng tốc và bỏ qua câu khó.',
          en: 'Eight minutes for seven questions: speed up and skip hard ones.',
        },
      },
      {
        id: 'l3-i-read-12-05-ex02',
        type: 'multiple-choice',
        question: 'Passage: "It would be foolish to treat a single experiment as the final word." What does the writer think?',
        options: [
          'One study is not enough to prove something.',
          'The experiment was badly designed.',
          'Experiments are a waste of time.',
          'The result of the experiment was surprising.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"The final word" = kết luận cuối cùng; một thí nghiệm là chưa đủ.',
          en: '"The final word" = the final conclusion; one experiment is not enough.',
        },
      },
      {
        id: 'l3-i-read-12-05-ex03',
        type: 'multiple-choice',
        question: 'Which phrase shows that the writer DISAGREES with an idea?',
        options: ['"I am not convinced."', '"These are reasonable arguments."', '"This is supported by research."', '"Typing is an essential skill."'],
        correctIndex: 0,
        explanation: {
          vi: '"I am not convinced" = tôi không bị thuyết phục → tác giả không đồng ý.',
          en: '"I am not convinced" means the writer does not accept the idea.',
        },
      },
      {
        id: 'l3-i-read-12-05-ex04',
        type: 'fill-blank',
        sentence: 'Matching information questions are ___ in the same order as the paragraphs.',
        acceptedAnswers: ['not'],
        explanation: {
          vi: 'Matching information không theo thứ tự bài, nên làm sau YNNG.',
          en: 'Matching information is not in passage order, so do it after YNNG.',
        },
      },
      {
        id: 'l3-i-read-12-05-ex05',
        type: 'speak-sentence',
        sentence: 'Handwriting helps young children recognise letters more quickly.',
        translationVi: 'Viết tay giúp trẻ nhỏ nhận biết chữ cái nhanh hơn.',
        explanation: {
          vi: '"Handwriting": chữ W câm; "helps" đọc rõ /lps/; nhấn REC-og-nise.',
          en: 'The W in "handwriting" is silent; say /lps/ in "helps"; stress REC-og-nise.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 20,
      instructions:
        'Questions 1–7: Do the following statements agree with the views of the writer? Choose YES, NO or NOT GIVEN. Questions 8–13: The passage has seven paragraphs, A–G. Which paragraph contains the following information?',
      strategyTip: {
        vi: 'Bật chế độ thi thật. Làm câu 1–7 trước (theo thứ tự bài), rồi mới làm matching 8–13. Đừng để trống câu nào.',
        en: 'Turn on exam mode. Do questions 1–7 first (in passage order), then matching 8–13. Leave no blanks.',
      },
      passage: {
        title: 'Is Handwriting Worth Saving?',
        paragraphs: [
          {
            label: 'A',
            text: 'In classrooms around the world, a quiet change is taking place. Pupils who once spent hours practising their letters in neat rows now spend more and more of that time learning to type, swipe and tap. In some countries, schools have greatly reduced the time given to handwriting, and keyboard skills are introduced from the first years of primary school. Many people see this as simple common sense: adults today write far more on screens than on paper, so why not prepare children for the world they will actually live in? I am not convinced. Handwriting, I would argue, is not merely an old-fashioned way of recording words. It is also a way of thinking.',
          },
          {
            label: 'B',
            text: 'The case against handwriting deserves a fair hearing. Typing is faster for most people, and typed work is easier to edit, share and read. For children with certain physical difficulties, a keyboard can open doors that a pen keeps closed. Teachers also point out that the school day is already crowded, and that every hour spent on handwriting is an hour taken from something else. These are reasonable arguments, and nobody should want to return to the days when pupils were punished for untidy letters.',
          },
          {
            label: 'C',
            text: "Yet the evidence on learning tells a more complicated story. In a widely discussed study published in 2014, university students who took lecture notes by hand did better on questions that required real understanding than students who used laptops. The researchers' explanation was that typists tended to copy the lecturer's words almost exactly, while those writing by hand, being slower, were forced to summarise and therefore to think. Later attempts to repeat the study have produced mixed results, and it would be foolish to treat a single experiment as the final word. But the principle behind it — that slowing down can deepen understanding — is supported by a wide range of research on memory.",
          },
          {
            label: 'D',
            text: 'Studies with young children point in a similar direction. Brain scans suggest that when children form letters by hand, areas of the brain linked to reading become more active than when they simply look at letters or type them. Some researchers believe that the effort of drawing each shape helps children to recognise letters more quickly. If this is correct, then handwriting is not a rival to reading but one of its foundations, and removing it from early education would be a serious mistake.',
          },
          {
            label: 'E',
            text: 'There are also benefits that are harder to measure. A handwritten letter or card carries a personal quality that no email can match, which is perhaps why people keep them for decades. Writing by hand requires no battery and no internet connection, and it is free from the notifications that constantly interrupt work on a screen. For many adults, a notebook remains the place where plans are made and ideas take shape, precisely because it offers nothing else to do.',
          },
          {
            label: 'F',
            text: 'None of this means that schools should abandon keyboards. Typing is an essential skill, and children who cannot type quickly will be at a disadvantage in their studies and later at work. The real question is one of balance. In my view, the best approach is to teach handwriting thoroughly in the first years of school, when it supports reading and the control of small hand movements, and to introduce typing gradually after that. Joined-up writing, which takes many hours to master, may be the one element that can reasonably be reduced, since clear printed letters serve most practical purposes just as well.',
          },
          {
            label: 'G',
            text: 'Ultimately, the debate is less about pens and keyboards than about what we want education to achieve. If the goal is simply to produce text as quickly as possible, the keyboard wins easily. But if the goal is to help young people think clearly, remember what they learn and express themselves with care, then the slow, physical act of writing by hand still has a great deal to offer. It would be a pity to lose it simply because it no longer looks modern.',
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Handwriting is no more than an outdated way of recording words.',
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn A: "not merely an old-fashioned way of recording words" → NO.',
            en: 'Para A: "not merely an old-fashioned way of recording words" → NO.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Several of the points made in favour of typing are valid.',
          options: YES_NO_NG,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn B: "These are reasonable arguments" = valid → YES.',
            en: 'Para B: "These are reasonable arguments" = valid → YES.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Pupils with untidy handwriting should be given extra lessons.',
          options: YES_NO_NG,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn B chỉ nói không nên phạt chữ xấu; không nhắc học thêm → NOT GIVEN.',
            en: 'Para B rejects punishing untidy writing; extra lessons are never mentioned.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'The 2014 study proves that taking notes by hand always leads to better learning.',
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn C: kết quả lặp lại "mixed"; "foolish to treat a single experiment as the final word".',
            en: 'Para C: repeats were "mixed"; it is "foolish to treat a single experiment as the final word".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'If certain brain research is accurate, taking handwriting out of early education would be a serious error.',
          options: YES_NO_NG,
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn D: "If this is correct... removing it... would be a serious mistake" → YES.',
            en: 'Para D: "If this is correct... removing it... would be a serious mistake" → YES.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q06',
          paragraphLabel: 'E',
          number: 6,
          prompt: 'People keep handwritten letters for longer than any other personal documents.',
          options: YES_NO_NG,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn E: thư được giữ "for decades", nhưng không so với giấy tờ khác.',
            en: 'Para E: letters are kept "for decades", but no comparison with other documents.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q07',
          paragraphLabel: 'F',
          number: 7,
          prompt: 'Joined-up writing should remain a major part of the school timetable.',
          options: YES_NO_NG,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn F: chữ viết liền "may be the one element that can reasonably be reduced" → NO.',
            en: 'Para F: joined-up writing "can reasonably be reduced" → NO.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q08',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Which paragraph contains: a recommendation about the order in which two skills should be taught',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 5,
          explanation: {
            vi: 'Đoạn F: dạy viết tay trước, "introduce typing gradually after that".',
            en: 'Para F: teach handwriting first, then "introduce typing gradually after that".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q09',
          paragraphLabel: 'C',
          number: 9,
          prompt: 'Which paragraph contains: a possible reason why a slower method can improve understanding',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn C: viết tay chậm hơn nên phải "summarise and therefore to think".',
            en: 'Para C: slower hand-writers "were forced to summarise and therefore to think".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q10',
          paragraphLabel: 'E',
          number: 10,
          prompt: 'Which paragraph contains: benefits of handwriting that cannot easily be tested',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 4,
          explanation: {
            vi: 'Đoạn E: "benefits that are harder to measure" = khó kiểm chứng.',
            en: 'Para E: "benefits that are harder to measure" = not easily tested.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q11',
          paragraphLabel: 'B',
          number: 11,
          prompt: 'Which paragraph contains: a reference to pupils who may find a keyboard easier to use than a pen',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: trẻ có khó khăn thể chất — "a keyboard can open doors that a pen keeps closed".',
            en: 'Para B: for some children "a keyboard can open doors that a pen keeps closed".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q12',
          paragraphLabel: 'D',
          number: 12,
          prompt: 'Which paragraph contains: research suggesting that forming letters by hand helps children recognise them',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D: "the effort of drawing each shape helps children to recognise letters".',
            en: 'Para D: "the effort of drawing each shape helps children to recognise letters".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-12-05-q13',
          paragraphLabel: 'G',
          number: 13,
          prompt: 'Which paragraph contains: a contrast between two possible aims of education',
          options: PARAGRAPHS_A_TO_G,
          correctIndex: 6,
          explanation: {
            vi: 'Đoạn G: "If the goal is... But if the goal is..." → so sánh hai mục tiêu.',
            en: 'Para G: "If the goal is... But if the goal is..." contrasts two aims.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 13 — BÀI 1: Matching headings — vì sao chúng ta quên
  // ==========================================================================
  {
    id: 'l3-i-read-13-01',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Matching headings: chọn tiêu đề cho đoạn', en: 'Matching headings' },
    description: {
      vi: 'Chọn tiêu đề tóm đúng ý chính của từng đoạn, tránh bẫy từ trùng, qua bài về trí nhớ và sự quên.',
      en: 'Choose the heading that sums up each paragraph and avoid word-matching traps, in a text about memory and forgetting.',
    },
    teachingCards: [
      {
        title: { vi: 'Tiêu đề = ý chính của cả đoạn', en: 'A heading sums up the whole paragraph' },
        body: {
          vi: 'Tiêu đề đúng phải **tóm được cả đoạn**, không chỉ một chi tiết. Cách làm: đọc **câu đầu + câu cuối**, tự tóm ý bằng **3–5 từ**, rồi so với danh sách. Danh sách có **nhiều tiêu đề hơn số đoạn** — luôn có tiêu đề thừa.',
          en: 'The right heading **sums up the whole paragraph**, not one detail. Method: read the **first and last sentences**, summarise the idea in **3–5 words**, then compare with the list. There are **more headings than paragraphs** — some are extra.',
        },
      },
      {
        title: { vi: 'Bẫy: tiêu đề có từ trùng', en: 'Trap: headings that repeat a word' },
        body: {
          vi: 'Tiêu đề **có từ giống hệt trong đoạn** thường là **bẫy**. VD đoạn nói về ứng dụng và tương lai, có nhắc "sleep" một lần → tiêu đề "The role of sleep" **sai** vì đó chỉ là chi tiết. Làm **đoạn dễ trước**, gạch các tiêu đề đã dùng.',
          en: 'A heading that **repeats a word from the paragraph** is often a **trap**. E.g. a paragraph about apps and the future mentions "sleep" once → "The role of sleep" is **wrong**, because sleep is only a detail. Do the **easy paragraphs first** and cross out used headings.',
        },
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-read-13-01-p1',
        title: 'Goldfish Memory',
        text: 'Many people believe that goldfish can remember things for only three seconds. In fact, experiments have shown that goldfish can be trained to push a lever to get food, and they can remember how to do this for months. Some have even learned to respond to a particular sound at feeding time.',
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-13-01-ex01',
        type: 'multiple-choice',
        passageId: 'l3-i-read-13-01-p1',
        question: 'Choose the best heading for this paragraph.',
        options: ['A popular belief proved wrong', 'How to train a pet goldfish', 'The best food for goldfish', 'Sounds that frighten fish'],
        correctIndex: 0,
        explanation: {
          vi: 'Câu đầu nêu niềm tin phổ biến, "In fact..." bác bỏ nó → ý chính cả đoạn.',
          en: 'A common belief, then "In fact..." disproves it — that is the whole paragraph.',
        },
      },
      {
        id: 'l3-i-read-13-01-ex02',
        type: 'multiple-choice',
        passageId: 'l3-i-read-13-01-p1',
        question: 'Why is "How to train a pet goldfish" NOT the best heading?',
        options: ['It describes only a detail, not the main idea.', 'The paragraph never mentions training.', 'Goldfish cannot be trained.'],
        correctIndex: 0,
        explanation: {
          vi: 'Huấn luyện chỉ là bằng chứng (chi tiết) cho ý chính: niềm tin sai.',
          en: 'Training is only evidence (a detail) for the main idea: a wrong belief.',
        },
      },
      {
        id: 'l3-i-read-13-01-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối tóm tắt đoạn với tiêu đề phù hợp.', en: 'Match each paragraph summary with a heading.' },
        pairs: [
          { left: 'Scientists still disagree about the cause', right: 'A continuing debate' },
          { left: 'The first experiments on the topic', right: 'Early research' },
          { left: 'Ways people can improve their memory', right: 'Practical techniques' },
          { left: 'What may happen in the coming years', right: 'Looking ahead' },
        ],
        explanation: {
          vi: 'Tiêu đề thường là cách nói ngắn, khái quát của ý chính.',
          en: 'Headings are short, general ways of stating the main idea.',
        },
      },
      {
        id: 'l3-i-read-13-01-ex04',
        type: 'speak-sentence',
        sentence: 'Regular reviews help us remember new information for longer.',
        translationVi: 'Ôn tập đều đặn giúp ta nhớ thông tin mới lâu hơn.',
        explanation: {
          vi: 'Đọc rõ /z/ cuối "reviews"; nhấn re-MEM-ber và in-for-MA-tion.',
          en: 'Say the final /z/ in "reviews"; stress re-MEM-ber and in-for-MA-tion.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 17,
      instructions:
        'Questions 1–6: The passage has six paragraphs, A–F. Choose the correct heading for each paragraph from the list of headings (i–viii). Questions 7–10: Complete the sentences. Write NO MORE THAN TWO WORDS from the passage for each answer.',
      strategyTip: {
        vi: 'Với mỗi đoạn, viết ra 3–5 từ tóm ý TRƯỚC khi nhìn danh sách tiêu đề. Cẩn thận với tiêu đề chứa từ có trong đoạn.',
        en: 'For each paragraph, write a 3–5 word summary BEFORE looking at the headings. Be careful with headings that copy words from the text.',
      },
      passage: {
        title: 'Why Do We Forget?',
        paragraphs: [
          {
            label: 'A',
            text: 'Everyone has had the experience of walking into a room and forgetting why they went there, or meeting someone at a party and losing their name within minutes. Forgetting is usually seen as a failure — a sign that memory is weak or that something has gone wrong. Yet psychologists increasingly argue that forgetting is a normal and even necessary part of how memory works. To understand why, it helps to look at how scientists first began to measure it.',
          },
          {
            label: 'B',
            text: "The scientific study of forgetting began in the 1880s with a German psychologist who used himself as his only subject. He memorised long lists of nonsense syllables, such as 'DAX' and 'BOK', which had no meaning that could help him remember them, and then tested himself after different periods of time. He found that most forgetting happened very quickly: within a day, a large part of what he had learned had gone, after which the rate of loss slowed down. When plotted on a graph, his results formed what is now known as the 'forgetting curve'. Remarkably, a careful repeat of his experiment, carried out more than a century later, produced very similar results.",
          },
          {
            label: 'C',
            text: 'Why do memories fade? One explanation is that memory traces simply decay over time if they are not used, rather like a path across a field that disappears when nobody walks along it. However, many researchers believe that a more important cause is interference: new information competes with old information, making it harder to find. If you have ever moved house and kept writing your old address, or struggled to remember where you parked today because you have parked in the same car park many times before, you have experienced interference.',
          },
          {
            label: 'D',
            text: "Forgetting may in fact serve a useful purpose. A memory system that stored every detail with equal strength would quickly become overloaded with information that is no longer relevant, such as last year's timetable or an old phone number. By allowing unused information to fade, the brain makes it easier to find what matters now. Some researchers have also suggested that forgetting helps us to generalise: by losing small details, we are better able to remember the overall pattern, which is often more useful.",
          },
          {
            label: 'E',
            text: "The good news is that the forgetting curve can be flattened. The same nineteenth-century research showed that each time information is reviewed, it is forgotten more slowly afterwards. This is the principle behind 'spaced repetition', in which material is reviewed at gradually increasing intervals: perhaps after one day, then three days, then a week, and so on. Testing yourself is particularly effective. Studies have repeatedly found that students who try to recall information from memory remember it better than those who simply read it again, even when both groups spend the same amount of time studying.",
          },
          {
            label: 'F',
            text: 'These findings are now built into many language-learning apps, which decide when to show each word again based on how well the learner remembered it last time. Researchers are also exploring whether sleep can be used to strengthen memories, since there is evidence that the brain replays recent experiences during deep sleep. It seems likely that, in the future, learning will be organised less around how much time we spend studying and more around when we study. For learners, the message is encouraging: forgetting is not a sign of failure, but a normal step on the way to remembering.',
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Paragraph A',
          options: HEADINGS_FORGETTING,
          correctIndex: 2,
          explanation: {
            vi: 'Quên là chuyện thường gặp, nhưng được xem là "normal and even necessary" → iii.',
            en: 'A common experience seen as "normal and even necessary" — a surprising view → iii.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'Paragraph B',
          options: HEADINGS_FORGETTING,
          correctIndex: 4,
          explanation: {
            vi: 'Thí nghiệm từ 1880s; làm lại sau hơn 100 năm "produced very similar results" → v.',
            en: 'An 1880s experiment; a repeat a century later "produced very similar results" → v.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q03',
          paragraphLabel: 'C',
          number: 3,
          prompt: 'Paragraph C',
          options: HEADINGS_FORGETTING,
          correctIndex: 3,
          explanation: {
            vi: '"Why do memories fade?" — hai giải thích: decay và interference → iv.',
            en: '"Why do memories fade?" — two explanations: decay and interference → iv.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q04',
          paragraphLabel: 'D',
          number: 4,
          prompt: 'Paragraph D',
          options: HEADINGS_FORGETTING,
          correctIndex: 5,
          explanation: {
            vi: 'Nhớ mọi chi tiết sẽ khiến bộ nhớ "overloaded" → trí nhớ hoàn hảo là bất lợi → vi.',
            en: 'Storing every detail would leave memory "overloaded" — a perfect memory is a disadvantage → vi.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q05',
          paragraphLabel: 'E',
          number: 5,
          prompt: 'Paragraph E',
          options: HEADINGS_FORGETTING,
          correctIndex: 1,
          explanation: {
            vi: 'Spaced repetition và tự kiểm tra = cách thực tế để nhớ lâu hơn → ii.',
            en: 'Spaced repetition and self-testing = practical ways to remember more → ii.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-01-q06',
          paragraphLabel: 'F',
          number: 6,
          prompt: 'Paragraph F',
          options: HEADINGS_FORGETTING,
          correctIndex: 7,
          explanation: {
            vi: 'Ứng dụng học ngôn ngữ hiện nay + "in the future" → viii. "Sleep" chỉ là chi tiết (bẫy i).',
            en: 'Today\'s apps plus "in the future" → viii. Sleep is only a detail (trap i).',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-01-q07',
          paragraphLabel: 'B',
          number: 7,
          prompt: 'The German psychologist tested his memory using lists of ___.',
          acceptedAnswers: ['nonsense syllables'],
          explanation: {
            vi: 'Đoạn B: "He memorised long lists of nonsense syllables" (2 từ).',
            en: 'Para B: "He memorised long lists of nonsense syllables" (two words).',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-01-q08',
          paragraphLabel: 'C',
          number: 8,
          prompt: 'According to one explanation, memory traces that are not used gradually ___.',
          acceptedAnswers: ['decay'],
          explanation: {
            vi: 'Đoạn C: "memory traces simply decay over time if they are not used".',
            en: 'Para C: "memory traces simply decay over time if they are not used".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-01-q09',
          paragraphLabel: 'C',
          number: 9,
          prompt: 'When new information competes with old information, this is called ___.',
          acceptedAnswers: ['interference'],
          explanation: {
            vi: 'Đoạn C: "interference: new information competes with old information".',
            en: 'Para C: "interference: new information competes with old information".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-01-q10',
          paragraphLabel: 'E',
          number: 10,
          prompt: 'Reviewing material at gradually increasing intervals is known as ___.',
          acceptedAnswers: ['spaced repetition'],
          explanation: {
            vi: 'Đoạn E: "\'spaced repetition\', in which material is reviewed at gradually increasing intervals".',
            en: 'Para E: "\'spaced repetition\', in which material is reviewed at gradually increasing intervals".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 13 — BÀI 2: Sentence + summary completion — tre, loài cỏ để xây nhà
  // ==========================================================================
  {
    id: 'l3-i-read-13-02',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Hoàn thành câu và tóm tắt', en: 'Sentence and summary completion' },
    description: {
      vi: 'Điền câu và bản tóm tắt bằng từ trong bài (NO MORE THAN TWO WORDS), qua bài về cây tre trong xây dựng.',
      en: 'Complete sentences and a summary with words from the passage (NO MORE THAN TWO WORDS) in a text about bamboo as a building material.',
    },
    teachingCards: [
      {
        title: { vi: 'Hoàn thành câu: chép đúng từ trong bài', en: 'Sentence completion: copy words exactly' },
        body: {
          vi: 'Đáp án phải là **từ có trong bài**, chép **đúng chính tả**, và **câu hoàn chỉnh phải đúng ngữ pháp**. "NO MORE THAN TWO WORDS" = 1 hoặc 2 từ. **Không đổi dạng từ** (bài viết "treated" thì không viết "treatment"). Câu hỏi đi **theo thứ tự** bài đọc.',
          en: 'Answers must be **words from the passage**, copied with **correct spelling**, and the **completed sentence must be grammatical**. "NO MORE THAN TWO WORDS" = one or two words. **Don\'t change word forms** (if the text says "treated", don\'t write "treatment"). Questions **follow the passage order**.',
        },
      },
      {
        title: { vi: 'Tóm tắt: tìm đúng đoạn trước', en: 'Summaries: find the right section first' },
        body: {
          vi: 'Bản tóm tắt thường chỉ bao **1–3 đoạn**. Đọc **câu đầu của bản tóm tắt** để định vị đoạn trong bài. Với mỗi chỗ trống: đoán **loại từ**, tìm **từ đồng nghĩa** của các chữ quanh chỗ trống trong bài, rồi chép **chính xác** từ đó.',
          en: 'A summary usually covers only **one to three paragraphs**. Read the **first sentence of the summary** to locate the section. For each gap: predict the **word type**, find **synonyms** of the words around it in the passage, then copy the word **exactly**.',
        },
        examples: [{ en: 'reducing the risk of landslides = lowering the danger of landslides', vi: 'risk = danger → chỗ trống sau "danger of" là landslides.' }],
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-13-02-ex01',
        type: 'multiple-choice',
        question:
          'Passage: "Untreated bamboo is quickly attacked by insects." Sentence: "Bamboo that has not been ___ is easily damaged by insects." (NO MORE THAN TWO WORDS) Which answer is correct?',
        options: ['treated', 'treatment', 'untreated', 'been treated'],
        correctIndex: 0,
        explanation: {
          vi: '"Has not been treated" đúng ngữ pháp; "treatment" sai dạng từ, "been treated" lặp "been".',
          en: '"Has not been treated" is grammatical; "treatment" is the wrong form.',
        },
      },
      {
        id: 'l3-i-read-13-02-ex02',
        type: 'multiple-choice',
        question: 'Which of these answers breaks the rule "NO MORE THAN TWO WORDS"?',
        options: ['the root system', 'root system', 'roots', 'underground roots'],
        correctIndex: 0,
        explanation: {
          vi: '"The root system" có 3 từ (tính cả "the") → sai.',
          en: '"The root system" has three words, including "the" → wrong.',
        },
      },
      {
        id: 'l3-i-read-13-02-ex03',
        type: 'fill-blank',
        sentence: 'Passage: "Farmers flood the fields to stop weeds from growing." Summary: "Water is used to prevent the growth of ___."',
        acceptedAnswers: ['weeds'],
        explanation: {
          vi: '"Stop... from growing" = prevent the growth of → weeds (giữ số nhiều).',
          en: '"Stop... from growing" = prevent the growth of → weeds (keep the plural).',
        },
      },
      {
        id: 'l3-i-read-13-02-ex04',
        type: 'multiple-choice',
        question: '"Some bamboo can grow almost a metre in a single ___." Which answer fits grammatically?',
        options: ['day', 'days', 'daily', 'quickly'],
        correctIndex: 0,
        explanation: {
          vi: 'Sau "a single" cần danh từ số ít → day.',
          en: 'After "a single" you need a singular noun → day.',
        },
      },
      {
        id: 'l3-i-read-13-02-ex05',
        type: 'speak-sentence',
        sentence: 'Bamboo is a giant grass that can grow almost a metre in a single day.',
        translationVi: 'Tre là một loài cỏ khổng lồ, có thể mọc gần một mét mỗi ngày.',
        explanation: {
          vi: '"Giant" đọc /ˈdʒaɪ.ənt/ có /t/ cuối; "grass" nguyên âm dài /ɑː/ và /s/ cuối.',
          en: '"Giant" is /ˈdʒaɪ.ənt/ with a final /t/; "grass" has a long /ɑː/ and final /s/.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 17,
      instructions:
        'Questions 1–5: Complete the sentences. Write NO MORE THAN TWO WORDS from the passage for each answer. Questions 6–11: Complete the summary (paragraphs D–F). Write NO MORE THAN TWO WORDS from the passage for each answer.',
      strategyTip: {
        vi: 'Sau khi điền, đọc lại cả câu: có đúng ngữ pháp không? Số ít hay số nhiều? Có quá 2 từ không?',
        en: 'After filling each gap, read the whole sentence: is it grammatical? Singular or plural? No more than two words?',
      },
      passage: {
        title: 'Bamboo: The Grass That Builds',
        paragraphs: [
          {
            label: 'A',
            text: 'In villages across Vietnam, rows of tall, green bamboo once surrounded almost every settlement, providing shade, building materials and protection from strong winds. To most people, bamboo looks like a tree, but botanically it is a member of the grass family, related to rice and wheat. There are more than a thousand species, ranging from small plants grown in gardens to giants over thirty metres tall, and they grow naturally on every continent except Europe and Antarctica.',
          },
          {
            label: 'B',
            text: "Bamboo's most famous quality is its speed of growth. Some species can grow almost a metre in a single day, and a new stem, known as a culm, reaches its full height within a few months. However, a culm that has just reached full height is still soft. It needs another three to five years to harden before it is strong enough for construction. Even so, this compares extremely well with hardwood trees, which may take fifty years or more before they can be harvested. Moreover, because bamboo regrows from its underground root system, cutting the mature culms does not kill the plant, and there is no need to replant.",
          },
          {
            label: 'C',
            text: "For builders, bamboo's great advantage is its combination of lightness and strength. The hollow culm is divided into sections by solid joints called nodes, which make it stiffer and stop it from splitting or collapsing. The fibres in its outer layer are particularly strong in tension — that is, when they are being pulled. For this reason, some engineers have compared it, weight for weight, with steel. Bamboo is also flexible enough to bend rather than break in strong winds, which is why well-built bamboo structures have often survived storms and earthquakes better than heavier buildings.",
          },
          {
            label: 'D',
            text: 'Yet bamboo has serious weaknesses. The culms contain large amounts of starch, which makes them a favourite food of insects such as beetles, as well as fungi. Untreated bamboo used outdoors may last only two or three years. Traditionally, Vietnamese builders dealt with this problem by soaking freshly cut culms in ponds or rivers for several weeks, which washes out much of the starch. Today, the most common method is to soak them in a solution of boron salts, a treatment that can extend their life to several decades if the bamboo is also kept dry. Joining culms is another difficulty: because they are round, hollow and vary in thickness, they cannot easily be connected with the nails and standard fittings used for wood.',
          },
          {
            label: 'E',
            text: "Modern technology is helping to overcome some of these problems. In engineered bamboo, the culms are cut into thin strips, which are then dried, treated and glued together under pressure to form flat boards and beams. These products have a regular shape and size, which makes them much easier to use on building sites, and they are now widely sold for floors and furniture, and increasingly for the frames of buildings. Critics point out, though, that the glues and the energy used in processing reduce some of bamboo's environmental advantages.",
          },
          {
            label: 'F',
            text: 'Those advantages are nonetheless considerable. Bamboo forests absorb carbon dioxide quickly as they grow, and their dense networks of roots help to hold soil in place on steep slopes, reducing the risk of landslides. Because bamboo grows well on land that is too poor or too steep for many other crops, it can provide an income for farmers in difficult areas. Architects in several Asian countries have shown that bamboo can be used for elegant modern buildings, from restaurants to schools. Whether it can become a mainstream material in large cities, however, will depend partly on building regulations, which in many countries still have no clear standards for its use.',
          },
        ],
      },
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'Botanically, bamboo belongs to the ___ family.',
          acceptedAnswers: ['grass'],
          explanation: {
            vi: 'Đoạn A: "botanically it is a member of the grass family".',
            en: 'Para A: "botanically it is a member of the grass family".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'A new bamboo stem is known as a ___.',
          acceptedAnswers: ['culm'],
          explanation: {
            vi: 'Đoạn B: "a new stem, known as a culm" (thân tre).',
            en: 'Para B: "a new stem, known as a culm".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'Unlike bamboo, ___ trees may need fifty years or more before they can be cut.',
          acceptedAnswers: ['hardwood'],
          explanation: {
            vi: 'Đoạn B: "hardwood trees, which may take fifty years or more before they can be harvested".',
            en: 'Para B: "hardwood trees, which may take fifty years or more before they can be harvested".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'The solid joints that divide a culm into sections are called ___.',
          acceptedAnswers: ['nodes'],
          explanation: {
            vi: 'Đoạn C: "divided into sections by solid joints called nodes" (đốt tre).',
            en: 'Para C: "divided into sections by solid joints called nodes".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q05',
          paragraphLabel: 'C',
          number: 5,
          prompt: 'Bamboo fibres are especially strong when they are being ___.',
          acceptedAnswers: ['pulled'],
          explanation: {
            vi: 'Đoạn C: "strong in tension — that is, when they are being pulled".',
            en: 'Para C: "strong in tension — that is, when they are being pulled".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q06',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'Summary: Bamboo contains a lot of ___, which attracts insects and fungi.',
          acceptedAnswers: ['starch'],
          explanation: {
            vi: 'Đoạn D: "large amounts of starch, which makes them a favourite food of insects".',
            en: 'Para D: "large amounts of starch, which makes them a favourite food of insects".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q07',
          paragraphLabel: 'D',
          number: 7,
          prompt: 'In the past, Vietnamese builders soaked new culms in ___ or rivers to wash it out.',
          acceptedAnswers: ['ponds'],
          explanation: {
            vi: 'Đoạn D: "soaking freshly cut culms in ponds or rivers" — giữ số nhiều.',
            en: 'Para D: "soaking freshly cut culms in ponds or rivers" — keep the plural.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q08',
          paragraphLabel: 'D',
          number: 8,
          prompt: 'Today, culms are usually treated with ___ salts.',
          acceptedAnswers: ['boron'],
          explanation: {
            vi: 'Đoạn D: "the most common method is to soak them in a solution of boron salts".',
            en: 'Para D: "the most common method is to soak them in a solution of boron salts".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q09',
          paragraphLabel: 'E',
          number: 9,
          prompt: 'In engineered bamboo, thin ___ are glued together to make boards and beams.',
          acceptedAnswers: ['strips'],
          explanation: {
            vi: 'Đoạn E: "cut into thin strips... glued together"; "are" cần số nhiều.',
            en: 'Para E: "cut into thin strips... glued together"; "are" needs a plural.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q10',
          paragraphLabel: 'F',
          number: 10,
          prompt: 'Bamboo roots can lower the danger of ___ on steep slopes.',
          acceptedAnswers: ['landslides'],
          explanation: {
            vi: 'Đoạn F: "reducing the risk of landslides" — risk = danger.',
            en: 'Para F: "reducing the risk of landslides" — risk = danger.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-02-q11',
          paragraphLabel: 'F',
          number: 11,
          prompt: 'Bamboo grows on land that is too poor for many other ___.',
          acceptedAnswers: ['crops'],
          explanation: {
            vi: 'Đoạn F: "land that is too poor or too steep for many other crops".',
            en: 'Para F: "land that is too poor or too steep for many other crops".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 13 — BÀI 3: Trắc nghiệm (MCQ) — tâm lý học của việc chờ đợi
  // ==========================================================================
  {
    id: 'l3-i-read-13-03',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Trắc nghiệm Reading (MCQ)', en: 'Reading: multiple choice' },
    description: {
      vi: 'Luyện cách loại đáp án sai trong câu trắc nghiệm qua bài về tâm lý học của việc chờ đợi.',
      en: 'Practise eliminating wrong options in multiple-choice questions, using a text about the psychology of waiting.',
    },
    teachingCards: [
      {
        title: { vi: 'Đọc câu hỏi trước, đáp án sau', en: 'Stem first, options later' },
        body: {
          vi: 'Đọc **phần câu hỏi (stem)**, gạch từ khoá, tìm đoạn liên quan và **tự trả lời trong đầu**. Sau đó mới đọc 4 đáp án và chọn cái **gần nhất với ý bạn đã tìm**. Câu MCQ đi **theo thứ tự** bài đọc.',
          en: 'Read the **question stem**, underline key words, find the relevant part and **answer it in your head**. Only then read the four options and choose the one **closest to what you found**. MCQ questions **follow the passage order**.',
        },
      },
      {
        title: { vi: '3 kiểu đáp án sai', en: 'Three kinds of wrong option' },
        body: {
          vi: '1) **Đúng với bài nhưng không trả lời câu hỏi**. 2) **Có từ giống bài** nhưng ý bị đổi (sai người, sai nguyên nhân). 3) **Quá mạnh**: "always", "all", "proves" trong khi bài chỉ nói "may", "some". Loại từng đáp án và nói được **vì sao nó sai**.',
          en: '1) **True in the passage but doesn\'t answer the question**. 2) **Uses words from the passage** but changes the meaning (wrong person, wrong cause). 3) **Too strong**: "always", "all", "proves" when the passage says "may", "some". Eliminate each option and know **why it\'s wrong**.',
        },
      },
    ],
    readingPassages: [
      {
        id: 'l3-i-read-13-03-p1',
        title: 'The Menu Trick',
        text: 'A restaurant began giving customers a menu to read while they waited for a table. Although the average wait did not change, far fewer customers left before being seated.',
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-13-03-ex01',
        type: 'multiple-choice',
        passageId: 'l3-i-read-13-03-p1',
        question: 'What does the text suggest?',
        options: [
          'Having something to do makes waiting easier to accept.',
          'The restaurant reduced its waiting times.',
          'Customers prefer short menus.',
          'Most customers leave before they are seated.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Thời gian chờ không đổi, nhưng có menu để đọc thì ít khách bỏ đi hơn.',
          en: 'The wait was the same, but with a menu to read fewer people left.',
        },
      },
      {
        id: 'l3-i-read-13-03-ex02',
        type: 'multiple-choice',
        passageId: 'l3-i-read-13-03-p1',
        question: 'Why is "The restaurant reduced its waiting times" wrong?',
        options: ['The text says the average wait did not change.', 'The text does not mention waiting.', 'The text says the wait got longer.'],
        correctIndex: 0,
        explanation: {
          vi: '"The average wait did not change" → đáp án dùng từ của bài nhưng đổi ý.',
          en: '"The average wait did not change" — the option uses the text\'s words but changes the meaning.',
        },
      },
      {
        id: 'l3-i-read-13-03-ex03',
        type: 'multiple-choice',
        question: 'Passage: "Uncertain waits may feel longer than known ones." Which option is TOO STRONG?',
        options: [
          'Uncertain waits always feel longer.',
          'Not knowing how long you will wait can make it seem longer.',
          'Waiting can feel longer when it is uncertain.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Bài nói "may", đáp án nói "always" → quá mạnh.',
          en: 'The passage says "may"; "always" is too strong.',
        },
      },
      {
        id: 'l3-i-read-13-03-ex04',
        type: 'speak-sentence',
        sentence: 'Uncertain waits often feel longer than waits we can predict.',
        translationVi: 'Những lần chờ không biết trước thường có cảm giác lâu hơn những lần chờ đoán trước được.',
        explanation: {
          vi: 'Đọc rõ /ts/ cuối "waits", /kt/ cuối "predict"; nhấn un-CER-tain.',
          en: 'Say /ts/ in "waits" and /kt/ in "predict"; stress un-CER-tain.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 16,
      instructions:
        'Questions 1–7: Choose the correct letter, A, B, C or D. Questions 8–10: Complete the sentences. Write NO MORE THAN TWO WORDS from the passage for each answer.',
      strategyTip: {
        vi: 'Với mỗi đáp án sai, thử nói vì sao nó sai: không trả lời câu hỏi, đổi ý, hay quá mạnh?',
        en: 'For each wrong option, say why it is wrong: it doesn\'t answer the question, it changes the meaning, or it is too strong.',
      },
      passage: {
        title: 'The Psychology of Waiting',
        paragraphs: [
          {
            label: 'A',
            text: "Most of us spend a surprising amount of our lives waiting: for buses, in shops, on the phone, in doctors' surgeries. Waiting is rarely pleasant, but research suggests that how unpleasant it feels depends less on how long we actually wait than on how the wait is experienced. Two people who wait for exactly the same length of time may leave with very different impressions, and businesses have begun to pay close attention to the difference.",
          },
          {
            label: 'B',
            text: 'A frequently told story illustrates the point. At one large airport, passengers complained constantly about the time it took for their luggage to arrive. The airport hired more baggage handlers, and the average wait fell to about eight minutes, which was well within industry standards. Yet the complaints continued. When managers looked more closely, they found that passengers took about one minute to walk from their plane to the baggage area and then spent the remaining seven minutes standing still. The solution was to move the arrival gates further away, so that passengers walked for six minutes and waited for only two. Complaints almost disappeared, although the total time had not changed at all.',
          },
          {
            label: 'C',
            text: 'The lesson that many researchers draw from such examples is that unoccupied time feels longer than occupied time. This is why some hotels place mirrors beside lifts, why restaurants hand out menus while customers wait for a table, and why many call centres play music or give updates while callers are on hold. Theme parks go further, entertaining people in long queues with videos, displays and even actors. Distractions do not shorten the wait, but they change how it is perceived. Not every distraction works, however: music that callers find irritating can make a wait on the phone seem even longer.',
          },
          {
            label: 'D',
            text: "Uncertainty is another important factor. Waiting without knowing how long the wait will last is generally more stressful than waiting for a known period, even if the known period is longer. For this reason, many public transport systems now display the number of minutes until the next train or bus arrives. Studies of such displays have found that they reduce passengers' anxiety and can even increase their overall satisfaction with the service. Interestingly, some companies deliberately overestimate waiting times, so that customers are pleasantly surprised when they are served earlier than expected.",
          },
          {
            label: 'E',
            text: "Fairness also shapes how people feel. Most people are willing to wait their turn, but few things cause more anger than seeing someone who arrived later being served first. This helps to explain the popularity of the single 'snake' queue, in which all customers wait in one line and go to the next available counter. Although such a queue often looks long, it moves steadily, and customers tend to prefer it because nobody can be unlucky enough to choose a slow line, and everyone is served in the order in which they arrived.",
          },
          {
            label: 'F',
            text: 'Finally, the value of what we are waiting for affects our patience. People will queue for hours for tickets to a concert they are excited about, but become irritated after a few minutes in a supermarket. Researchers have also noticed that the end of a wait influences how the whole experience is remembered: a wait that ends with friendly, efficient service is often remembered as shorter than it really was. For managers, the message is clear. Reducing waiting times is expensive and sometimes impossible, but changing the experience of waiting may be both cheaper and more effective.',
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q01',
          paragraphLabel: 'A',
          number: 1,
          prompt: 'According to paragraph A, how unpleasant a wait feels depends mainly on',
          options: [
            'A. the actual length of the wait.',
            'B. the way the wait is experienced.',
            'C. the place where people are waiting.',
            'D. the number of other people waiting.',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn A: "depends less on how long we actually wait than on how the wait is experienced".',
            en: 'Para A: "less on how long we actually wait than on how the wait is experienced".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: "Why did the airport's first solution fail?",
          options: [
            'A. The new staff were poorly trained.',
            'B. The average wait was still longer than industry standards.',
            'C. Passengers still spent most of the time standing still.',
            'D. Passengers had to walk too far to the baggage area.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn B: đi 1 phút, rồi "the remaining seven minutes standing still". B sai: "well within" chuẩn.',
            en: 'Para B: one minute walking, "seven minutes standing still". B is wrong: "well within" standards.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q03',
          paragraphLabel: 'B',
          number: 3,
          prompt: 'What did the airport finally do?',
          options: [
            'A. It reduced the total time passengers spent waiting for luggage.',
            'B. It made passengers walk further before reaching their bags.',
            'C. It hired more staff to unload the planes.',
            'D. It moved the baggage area closer to the planes.',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn B: "move the arrival gates further away" → đi bộ 6 phút; tổng thời gian không đổi.',
            en: 'Para B: "move the arrival gates further away" — six minutes walking; total time unchanged.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: 'The writer mentions mirrors beside lifts as an example of',
          options: [
            'A. a way of making a wait seem shorter.',
            'B. a way of reducing actual waiting time.',
            'C. a design that customers dislike.',
            'D. a method used mainly at airports.',
          ],
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn C: thời gian có việc làm cảm giác ngắn hơn; xao nhãng "do not shorten the wait" → B sai.',
            en: 'Para C: occupied time feels shorter; distractions "do not shorten the wait", so B is wrong.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'What does the writer say about displays showing waiting times?',
          options: [
            'A. They make trains arrive more punctually.',
            'B. They are found on all public transport systems.',
            'C. They are too expensive for most companies.',
            "D. They make passengers less anxious.",
          ],
          correctIndex: 3,
          explanation: {
            vi: 'Đoạn D: "they reduce passengers\' anxiety". B quá mạnh: bài nói "many", không phải "all".',
            en: 'Para D: "they reduce passengers\' anxiety". B is too strong: "many", not "all".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q06',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'Why do some companies overestimate waiting times?',
          options: [
            'A. so that customers are pleased when they are served sooner',
            'B. to discourage customers from waiting',
            'C. because their staff work more slowly than expected',
            'D. to reduce complaints about prices',
          ],
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn D: để khách "pleasantly surprised when they are served earlier than expected".',
            en: 'Para D: so customers are "pleasantly surprised when they are served earlier than expected".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-03-q07',
          paragraphLabel: 'E',
          number: 7,
          prompt: "Customers prefer a single 'snake' queue mainly because",
          options: [
            'A. it is always shorter than separate lines.',
            'B. it lets them choose their own counter.',
            'C. it treats everyone fairly.',
            'D. it needs fewer staff.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn E bắt đầu bằng "Fairness"; ai đến trước được phục vụ trước. A sai: hàng "looks long".',
            en: 'Para E is about "fairness": served in order of arrival. A is wrong: it "often looks long".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-03-q08',
          paragraphLabel: 'C',
          number: 8,
          prompt: 'Music that callers find ___ can make a wait on the phone seem longer.',
          acceptedAnswers: ['irritating'],
          explanation: {
            vi: 'Đoạn C: "music that callers find irritating can make a wait... seem even longer".',
            en: 'Para C: "music that callers find irritating can make a wait... seem even longer".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-03-q09',
          paragraphLabel: 'F',
          number: 9,
          prompt: 'The ___ of a wait affects how people remember the whole experience.',
          acceptedAnswers: ['end'],
          explanation: {
            vi: 'Đoạn F: "the end of a wait influences how the whole experience is remembered".',
            en: 'Para F: "the end of a wait influences how the whole experience is remembered".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-03-q10',
          paragraphLabel: 'F',
          number: 10,
          prompt: 'Changing the experience of waiting may be cheaper and more ___ than reducing waiting times.',
          acceptedAnswers: ['effective'],
          explanation: {
            vi: 'Đoạn F: "may be both cheaper and more effective".',
            en: 'Para F: "may be both cheaper and more effective".',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 13 — BÀI 4: Short-answer questions — dấu hiệu thời tiết dân gian
  // ==========================================================================
  {
    id: 'l3-i-read-13-04',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 25,
    title: { vi: 'Trả lời ngắn (short-answer questions)', en: 'Short-answer questions' },
    description: {
      vi: 'Trả lời câu hỏi Wh- bằng tối đa 2 từ trong bài, qua bài về các dấu hiệu thời tiết dân gian và khoa học đằng sau.',
      en: 'Answer Wh- questions with no more than two words from the passage, in a text about folk weather signs and the science behind them.',
    },
    teachingCards: [
      {
        title: { vi: 'Từ để hỏi cho biết loại đáp án', en: 'The question word tells you the answer type' },
        body: {
          vi: 'Short-answer là **câu hỏi Wh-**, trả lời bằng **từ trong bài** trong giới hạn (VD **NO MORE THAN TWO WORDS AND/OR A NUMBER**). Từ để hỏi gợi ý loại đáp án: **Which animal** → tên con vật; **How many** → số; **When** → thời gian; **What colour** → màu. Câu hỏi đi **theo thứ tự** bài.',
          en: 'Short-answer questions are **Wh- questions** answered with **words from the passage** within a limit (e.g. **NO MORE THAN TWO WORDS AND/OR A NUMBER**). The question word shows the answer type: **Which animal** → an animal; **How many** → a number; **When** → a time; **What colour** → a colour. Questions **follow the passage order**.',
        },
      },
      {
        title: { vi: 'Viết gọn, không chép thừa', en: 'Keep it short' },
        body: {
          vi: 'Chỉ viết **phần trả lời**, không viết lại cả câu. Hỏi "What do pine cones do in dry weather?" → "**open**" (không viết "they open their scales"). Mạo từ "a/the" thường **không cần**, và nếu làm **vượt giới hạn từ** thì đáp án **sai**.',
          en: 'Write **only the answer**, not a full sentence. "What do pine cones do in dry weather?" → "**open**" (not "they open their scales"). Articles "a/the" are usually **not needed** — and if they take you **over the word limit**, the answer is **wrong**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-13-04-ex01',
        type: 'multiple-choice',
        question: 'Question: "Which bird is said to fly low before rain?" What type of answer do you need?',
        options: ['the name of a bird', 'a number', 'a place', 'a time'],
        correctIndex: 0,
        explanation: {
          vi: '"Which bird" → đáp án là tên một loài chim.',
          en: '"Which bird" → the answer is the name of a bird.',
        },
      },
      {
        id: 'l3-i-read-13-04-ex02',
        type: 'multiple-choice',
        question:
          'Limit: NO MORE THAN TWO WORDS. Question: "What do farmers use to protect young plants from frost?" Passage: "...farmers cover young plants with thin plastic sheets." Best answer?',
        options: ['plastic sheets', 'thin plastic sheets', 'they cover them with plastic sheets', 'young plants'],
        correctIndex: 0,
        explanation: {
          vi: '"Thin plastic sheets" có 3 từ → vượt giới hạn; "plastic sheets" đủ ý, 2 từ.',
          en: '"Thin plastic sheets" is three words; "plastic sheets" fits the limit.',
        },
      },
      {
        id: 'l3-i-read-13-04-ex03',
        type: 'fill-blank',
        sentence: 'Passage: "The festival takes place every year in the last week of May." Question: "In which month is the festival held?" Answer: ___',
        acceptedAnswers: ['May'],
        explanation: {
          vi: '"Which month" → chỉ cần tên tháng: May.',
          en: '"Which month" → only the month is needed: May.',
        },
      },
      {
        id: 'l3-i-read-13-04-ex04',
        type: 'speak-sentence',
        sentence: 'Dragonflies fly low when rain is on its way.',
        translationVi: 'Chuồn chuồn bay thấp khi trời sắp mưa.',
        explanation: {
          vi: '"Dragonflies" nhấn âm đầu DRAG-on-flies, đọc rõ /z/ cuối; "low" là /ləʊ/.',
          en: 'Stress DRAG-on-flies and say the final /z/; "low" is /ləʊ/.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 16,
      instructions:
        'Questions 1–8: Answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer. Questions 9–11: Choose the correct letter, A, B, C or D.',
      strategyTip: {
        vi: 'Gạch chân từ để hỏi (Which, What colour…) và 1 từ khoá để quét bài. Chỉ chép đúng phần trả lời.',
        en: 'Underline the question word (Which, What colour…) and one key word to scan for. Copy only the answer itself.',
      },
      passage: {
        title: 'Reading the Sky',
        paragraphs: [
          {
            label: 'A',
            text: 'Long before satellites and computers, people whose lives depended on the weather — farmers, sailors and shepherds — learned to read the signs around them. Many of their observations were passed down as short rhymes and sayings, which made them easy to remember. Some of these sayings are little more than superstition, but others, scientists now agree, are based on genuine patterns in the atmosphere.',
          },
          {
            label: 'B',
            text: "Perhaps the best known in English is 'Red sky at night, shepherd's delight; red sky in the morning, shepherd's warning.' The saying works reasonably well in places such as Britain, where weather systems usually move from west to east. In the evening the sun sets in the west, and a red sky suggests that the air in that direction is dry and clear, so fine weather is on its way. A red sky in the morning, when the sun rises in the east, may mean that the clear weather has already passed and that clouds, and possibly rain, are approaching from the west.",
          },
          {
            label: 'C',
            text: 'Vietnam has its own rich collection of weather sayings, many of them connected with farming. One well-known example notes that when dragonflies fly low it will rain, when they fly high it will be sunny, and when they fly in between there will be shade. Another warns that when the evening sky turns the yellow-orange colour of chicken fat, a storm may be coming and families should protect their homes. Like many sayings around the world, these contain a measure of truth. Before rain, the air becomes more humid and air pressure falls, which affects the height at which small insects fly — and the dragonflies that hunt them follow.',
          },
          {
            label: 'D',
            text: "Other natural signs also respond to humidity. Pine cones, for example, open their scales in dry weather, allowing their seeds to be carried away by the wind, and close them again when the air becomes damp. For this reason, some people hang a pine cone outside their door as a simple natural weather instrument. Similarly, the pleasant earthy smell that often comes before or after rain has a scientific explanation. The smell, which two Australian scientists named 'petrichor' in the 1960s, is produced partly by oils from plants and partly by a substance released by bacteria in the soil.",
          },
          {
            label: 'E',
            text: 'A ring of light around the sun or moon, known as a halo, is another sign with a sound basis. Haloes are caused by light passing through tiny ice crystals in thin, high clouds. These clouds often arrive ahead of a large weather system, so a halo can be an early sign that rain may follow within a day or so. Not all traditional signs are so reliable, however. There is no good evidence, for instance, for the popular belief that cows lie down when rain is coming. Cows lie down for many reasons, most of them related to digestion and rest.',
          },
          {
            label: 'F',
            text: 'Today, modern forecasting has largely replaced folk knowledge. Weather satellites, ocean buoys and powerful computers allow forecasters to predict the weather several days ahead with impressive accuracy; by some estimates, a five-day forecast today is roughly as accurate as a one-day forecast was in the early 1980s. Yet traditional observation still has value. A forecast covers a wide area, while a farmer who watches the sky over a particular valley may notice local changes that a computer model misses. For many people, too, the old sayings remain a way of staying connected to the natural world.',
          },
        ],
      },
      questions: [
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q01',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Which job is mentioned in the best-known English weather saying? ___',
          acceptedAnswers: ['shepherd', 'shepherds', 'a shepherd'],
          explanation: {
            vi: 'Đoạn B: "Red sky at night, shepherd\'s delight..." → shepherd (người chăn cừu).',
            en: 'Para B: "Red sky at night, shepherd\'s delight..." → shepherd.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q02',
          paragraphLabel: 'B',
          number: 2,
          prompt: 'From which direction do weather systems usually arrive in Britain? ___',
          acceptedAnswers: ['west', 'the west'],
          explanation: {
            vi: 'Đoạn B: hệ thời tiết "move from west to east" → đến từ phía tây.',
            en: 'Para B: weather systems "move from west to east" → they come from the west.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q03',
          paragraphLabel: 'C',
          number: 3,
          prompt: 'Which insects appear in a Vietnamese saying about rain and sunshine? ___',
          acceptedAnswers: ['dragonflies'],
          explanation: {
            vi: 'Đoạn C: "when dragonflies fly low it will rain..." → dragonflies (chuồn chuồn).',
            en: 'Para C: "when dragonflies fly low it will rain..." → dragonflies.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q04',
          paragraphLabel: 'C',
          number: 4,
          prompt: "In another Vietnamese saying, the colour of the evening sky is compared to what? ___",
          acceptedAnswers: ['chicken fat'],
          explanation: {
            vi: 'Đoạn C: "the yellow-orange colour of chicken fat" (ráng mỡ gà).',
            en: 'Para C: "the yellow-orange colour of chicken fat".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q05',
          paragraphLabel: 'D',
          number: 5,
          prompt: 'What do pine cones do with their scales when the air becomes damp? ___',
          acceptedAnswers: ['close', 'close them'],
          explanation: {
            vi: 'Đoạn D: mở khi khô, "close them again when the air becomes damp".',
            en: 'Para D: they open when dry and "close them again when the air becomes damp".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q06',
          paragraphLabel: 'D',
          number: 6,
          prompt: 'What name did two Australian scientists give to the smell of rain? ___',
          acceptedAnswers: ['petrichor'],
          explanation: {
            vi: 'Đoạn D: "two Australian scientists named \'petrichor\' in the 1960s".',
            en: 'Para D: "two Australian scientists named \'petrichor\' in the 1960s".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q07',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'What tiny objects in high clouds cause haloes? ___',
          acceptedAnswers: ['ice crystals'],
          explanation: {
            vi: 'Đoạn E: "light passing through tiny ice crystals in thin, high clouds".',
            en: 'Para E: "light passing through tiny ice crystals in thin, high clouds".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-04-q08',
          paragraphLabel: 'E',
          number: 8,
          prompt: 'Which animals are wrongly believed to lie down before rain? ___',
          acceptedAnswers: ['cows', 'cow'],
          explanation: {
            vi: 'Đoạn E: "no good evidence... that cows lie down when rain is coming".',
            en: 'Para E: "no good evidence... that cows lie down when rain is coming".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-04-q09',
          paragraphLabel: 'C',
          number: 9,
          prompt: 'According to paragraph C, why might dragonflies fly lower before rain?',
          options: [
            'A. They are frightened by thunder.',
            'B. Changes in humidity and air pressure affect the insects they hunt.',
            'C. They are looking for water to drink.',
            'D. Strong winds push them towards the ground.',
          ],
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn C: độ ẩm, áp suất thay đổi độ cao côn trùng bay, chuồn chuồn bay theo để săn.',
            en: 'Para C: humidity and pressure change where insects fly, and the dragonflies follow them.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-04-q10',
          paragraphLabel: 'D',
          number: 10,
          prompt: 'Why do some people hang pine cones outside their doors?',
          options: ['A. to show changes in the weather', 'B. to bring good luck', 'C. to attract birds', 'D. to collect seeds'],
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn D: dùng như "a simple natural weather instrument" → báo thời tiết.',
            en: 'Para D: as "a simple natural weather instrument".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-04-q11',
          paragraphLabel: 'F',
          number: 11,
          prompt: "What is the writer's main point in paragraph F?",
          options: [
            'A. Folk weather knowledge is now useless.',
            'B. Computers make more mistakes than farmers.',
            'C. Traditional observation can still be useful alongside modern forecasts.',
            'D. Forecasts were more accurate in the 1980s.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn F: "Yet traditional observation still has value" → C. D ngược với bài.',
            en: 'Para F: "Yet traditional observation still has value" → C. D is the opposite.',
          },
        },
      ],
    },
  },

  // ==========================================================================
  // CHẶNG 13 — BÀI 5: 1 passage hoàn chỉnh như thi thật — 13 câu, 20 phút — khủng hoảng cát
  // ==========================================================================
  {
    id: 'l3-i-read-13-05',
    skill: 'reading',
    mode: 'reading',
    estimatedMinutes: 30,
    title: { vi: 'Bài đọc hoàn chỉnh: 13 câu trong 20 phút', en: 'Full passage: 13 questions in 20 minutes' },
    description: {
      vi: 'Làm một passage IELTS hoàn chỉnh với 4 dạng câu hỏi (headings, điền câu, trắc nghiệm, trả lời ngắn) trong 20 phút.',
      en: 'Complete a full IELTS passage with four question types (headings, sentence completion, MCQ, short answer) in 20 minutes.',
    },
    teachingCards: [
      {
        title: { vi: 'Một passage hoàn chỉnh có giờ', en: 'A full passage against the clock' },
        body: {
          vi: 'Đây là **1 passage như thi thật: 13 câu, 20 phút**. Thứ tự gợi ý: **headings trước** (hiểu bố cục cả bài), rồi các dạng **đi theo thứ tự bài** (điền câu, trắc nghiệm, trả lời ngắn). Mốc kiểm tra: **phút thứ 10** nên xong headings và vài câu tiếp theo.',
          en: 'This is **one exam-style passage: 13 questions, 20 minutes**. Suggested order: **headings first** (they show the structure), then the types that **follow passage order** (sentence completion, MCQ, short answer). Checkpoint: by **minute 10**, finish the headings and a few more.',
        },
      },
      {
        title: { vi: '2 phút cuối: kiểm tra', en: 'The final two minutes: check' },
        body: {
          vi: 'Còn 2 phút: kiểm tra **số từ** của mỗi đáp án điền, **chính tả**, **số ít/số nhiều** (strip/strips), và **không để trống** câu nào. Đáp án điền phải **khớp ngữ pháp** khi đặt vào câu.',
          en: 'With 2 minutes left, check the **word count** of each written answer, **spelling**, **singular/plural** (strip/strips), and that **no question is blank**. Each written answer must **fit grammatically** into its sentence.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-i-read-13-05-ex01',
        type: 'multiple-choice',
        question: 'In a 20-minute passage with 13 questions, about how long should you spend skimming at the start?',
        options: ['2–3 minutes', '10 minutes', '30 seconds', 'You should not skim at all'],
        correctIndex: 0,
        explanation: {
          vi: '2–3 phút đủ để nắm bố cục mà vẫn còn ~15 phút cho câu hỏi.',
          en: 'Two to three minutes shows the structure and leaves about 15 for questions.',
        },
      },
      {
        id: 'l3-i-read-13-05-ex02',
        type: 'multiple-choice',
        question: 'Passage: "The material is too brittle to be used in cold climates." Which paraphrase is correct?',
        options: [
          'It breaks too easily for use where it is cold.',
          'It is mainly used in cold places.',
          'It becomes softer in cold weather.',
          'It is too expensive for cold countries.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Brittle" = giòn, dễ vỡ = breaks easily.',
          en: '"Brittle" means it breaks easily.',
        },
      },
      {
        id: 'l3-i-read-13-05-ex03',
        type: 'fill-blank',
        sentence: 'Passage: "Workers collect the shells by hand." Sentence: "The ___ are collected by hand." (ONE WORD)',
        acceptedAnswers: ['shells'],
        explanation: {
          vi: '"Are" cần chủ ngữ số nhiều → shells, không phải shell.',
          en: '"Are" needs a plural subject → shells, not shell.',
        },
      },
      {
        id: 'l3-i-read-13-05-ex04',
        type: 'speak-sentence',
        sentence: 'Sand is the most widely used natural resource after water.',
        translationVi: 'Cát là tài nguyên thiên nhiên được dùng nhiều nhất sau nước.',
        explanation: {
          vi: 'Đọc rõ /nd/ cuối "sand", "used" là /juːzd/; nhấn re-SOURCE.',
          en: 'Say /nd/ in "sand"; "used" is /juːzd/; stress re-SOURCE.',
        },
      },
    ],
    miniTest: [],
    readingTask: {
      examMinutes: 20,
      instructions:
        'Questions 1–5: The passage has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings (i–viii). Questions 6–8: Complete the sentences. Write NO MORE THAN TWO WORDS from the passage for each answer. Questions 9–11: Choose the correct letter, A, B, C or D. Questions 12–13: Answer the questions. Write NO MORE THAN TWO WORDS from the passage for each answer.',
      strategyTip: {
        vi: 'Bật chế độ thi thật, không tra từ điển. Đặt mốc: phút 10 xong câu 1–7; phút 18 xong tất cả; 2 phút cuối kiểm tra.',
        en: 'Turn on exam mode with no dictionary. Checkpoints: questions 1–7 by minute 10, all done by 18, then 2 minutes to check.',
      },
      passage: {
        title: 'Running Out of Sand?',
        paragraphs: [
          {
            label: 'A',
            text: 'Sand seems the most ordinary of materials, found on every beach and in every desert. It is hard to imagine that the world could ever run short of it. Yet sand and gravel are now the most heavily extracted solid materials on Earth. According to a United Nations estimate, around fifty billion tonnes are taken every year, and among natural resources only water is used in greater quantities. Demand is driven above all by construction, and it is rising fastest in the rapidly growing cities of Asia and Africa.',
          },
          {
            label: 'B',
            text: 'The reason is simple: modern cities are built largely of concrete, and concrete is mostly sand and gravel, held together with cement and water. Sand is also the main ingredient of glass, and very pure forms of it are used to make the silicon chips found in phones and computers. Roads, too, depend on it, both in the asphalt on the surface and in the layers beneath. In short, almost every part of the built environment contains sand in one form or another.',
          },
          {
            label: 'C',
            text: 'If sand is so common, why is there a problem? The answer lies in the shape of the grains. Desert sand has been blown about by the wind for thousands of years, which has made its grains small, smooth and rounded. Such grains do not lock together well, so desert sand is generally unsuitable for concrete. Builders prefer the rougher, more angular sand found in rivers, lakes and the sea. This is why some countries surrounded by desert nevertheless import sand for their construction projects.',
          },
          {
            label: 'D',
            text: 'Taking large amounts of sand from rivers has serious consequences. When sand is removed faster than the river can replace it, the riverbed is lowered and the banks become unstable. In the Mekong Delta in southern Vietnam, the extraction of sand from the river, combined with the trapping of sediment behind dams upstream, has been linked to severe erosion; in some places, roads and houses near the riverbank have collapsed into the water. A lower riverbed can also allow salt water from the sea to travel further inland, damaging the rice fields on which millions of people depend.',
          },
          {
            label: 'E',
            text: 'Sand from the sea is sometimes seen as an alternative, but it brings its own difficulties. Dredging the seabed can destroy the habitats of fish and other marine life. Sea sand also contains salt, which must be washed out before the sand can be used in concrete, because salt causes the steel bars inside concrete to rust. Despite these problems, demand for marine sand has grown, partly because of land reclamation. One small island nation, for instance, has increased its land area by around a quarter since the 1960s, largely using imported sand.',
          },
          {
            label: 'F',
            text: 'Researchers and engineers are now exploring ways to reduce our dependence on natural sand. One option is manufactured sand, produced by crushing rock into grains of the required size; because the grains are angular, they work well in concrete. Another is to recycle construction waste: old concrete can be crushed and reused, and waste glass can be ground into a material similar to sand. Some mining companies are also trying to make use of the huge quantities of sandy waste left over when metal ores are processed. In Vietnam, engineers have tested the use of sea sand to build the raised foundations of new roads in the Mekong Delta, where river sand has become scarce and expensive.',
          },
          {
            label: 'G',
            text: 'Technical solutions alone, however, will not be enough. Experts argue that the biggest obstacle is a lack of information: in many countries, nobody knows exactly how much sand is being extracted, or where, and illegal extraction is common. Better monitoring, clearer rules and higher prices that reflect the true environmental cost of sand would all help. So, too, would designing buildings that last longer and use less concrete in the first place. We have treated sand as if it were unlimited; it is time to start treating it as the valuable resource it is.',
          },
        ],
      },
      questions: [
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q01',
          paragraphLabel: 'B',
          number: 1,
          prompt: 'Paragraph B',
          options: HEADINGS_SAND,
          correctIndex: 1,
          explanation: {
            vi: 'Cát có trong bê tông, kính, chip, đường xá → nhiều công dụng → ii.',
            en: 'Sand in concrete, glass, chips and roads — many uses → ii.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q02',
          paragraphLabel: 'C',
          number: 2,
          prompt: 'Paragraph C',
          options: HEADINGS_SAND,
          correctIndex: 0,
          explanation: {
            vi: 'Cát sa mạc quá tròn, không dùng cho bê tông → i. "Deserts" chỉ là chi tiết (bẫy vii).',
            en: 'Desert sand is too round for concrete → i. "Deserts" is only a detail (trap vii).',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q03',
          paragraphLabel: 'D',
          number: 3,
          prompt: 'Paragraph D',
          options: HEADINGS_SAND,
          correctIndex: 2,
          explanation: {
            vi: 'Khai thác cát sông gây sạt lở, nhiễm mặn → "serious consequences" → iii.',
            en: 'River sand mining causes erosion and salt water inland → iii.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q04',
          paragraphLabel: 'E',
          number: 4,
          prompt: 'Paragraph E',
          options: HEADINGS_SAND,
          correctIndex: 4,
          explanation: {
            vi: 'Cát biển là lựa chọn khác nhưng "brings its own difficulties" → v.',
            en: 'Sea sand is an alternative but "brings its own difficulties" → v.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q05',
          paragraphLabel: 'F',
          number: 5,
          prompt: 'Paragraph F',
          options: HEADINGS_SAND,
          correctIndex: 3,
          explanation: {
            vi: 'Cát nghiền, tái chế bê tông, kính → các vật liệu thay thế → iv.',
            en: 'Manufactured sand, recycled concrete and glass — substitutes → iv.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-05-q06',
          paragraphLabel: 'C',
          number: 6,
          prompt: 'Desert sand is unsuitable for concrete because its grains are small, smooth and ___.',
          acceptedAnswers: ['rounded'],
          explanation: {
            vi: 'Đoạn C: "its grains small, smooth and rounded" — chép đúng "rounded".',
            en: 'Para C: "its grains small, smooth and rounded" — copy "rounded" exactly.',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-05-q07',
          paragraphLabel: 'E',
          number: 7,
          prompt: 'Salt must be washed out of sea sand because it makes the ___ inside concrete rust.',
          acceptedAnswers: ['steel bars', 'steel'],
          explanation: {
            vi: 'Đoạn E: "salt causes the steel bars inside concrete to rust".',
            en: 'Para E: "salt causes the steel bars inside concrete to rust".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-05-q08',
          paragraphLabel: 'F',
          number: 8,
          prompt: 'Manufactured sand works well in concrete because its grains are ___.',
          acceptedAnswers: ['angular'],
          explanation: {
            vi: 'Đoạn F: "because the grains are angular, they work well in concrete".',
            en: 'Para F: "because the grains are angular, they work well in concrete".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q09',
          paragraphLabel: 'A',
          number: 9,
          prompt: 'According to paragraph A, demand for sand is growing fastest in',
          options: ['A. desert regions.', 'B. cities in Asia and Africa.', 'C. coastal areas of Europe.', 'D. older industrial cities.'],
          correctIndex: 1,
          explanation: {
            vi: 'Đoạn A: "rising fastest in the rapidly growing cities of Asia and Africa".',
            en: 'Para A: "rising fastest in the rapidly growing cities of Asia and Africa".',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q10',
          paragraphLabel: 'D',
          number: 10,
          prompt: 'What does the writer say about erosion in the Mekong Delta?',
          options: [
            'A. Sand mining is its only cause.',
            'B. Dams have added sediment to the river.',
            'C. Sand extraction is one of its causes.',
            'D. It has stopped salt water reaching rice fields.',
          ],
          correctIndex: 2,
          explanation: {
            vi: 'Đoạn D: khai thác cát "combined with" đập giữ phù sa → một trong các nguyên nhân.',
            en: 'Para D: sand extraction "combined with" dams trapping sediment → one of the causes.',
          },
        },
        {
          kind: 'choice',
          id: 'l3-i-read-13-05-q11',
          paragraphLabel: 'G',
          number: 11,
          prompt: 'According to paragraph G, what is the biggest obstacle to solving the problem?',
          options: [
            'A. a lack of reliable information',
            'B. a shortage of new technology',
            'C. the low price of concrete',
            'D. the cost of new buildings',
          ],
          correctIndex: 0,
          explanation: {
            vi: 'Đoạn G: "the biggest obstacle is a lack of information".',
            en: 'Para G: "the biggest obstacle is a lack of information".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-05-q12',
          paragraphLabel: 'F',
          number: 12,
          prompt: 'Which waste material can be ground into something similar to sand? ___',
          acceptedAnswers: ['waste glass', 'glass'],
          explanation: {
            vi: 'Đoạn F: "waste glass can be ground into a material similar to sand".',
            en: 'Para F: "waste glass can be ground into a material similar to sand".',
          },
        },
        {
          kind: 'gap-fill',
          id: 'l3-i-read-13-05-q13',
          paragraphLabel: 'G',
          number: 13,
          prompt: 'Apart from better monitoring and clearer rules, what would reflect the true environmental cost of sand? ___',
          acceptedAnswers: ['higher prices', 'prices'],
          explanation: {
            vi: 'Đoạn G: "higher prices that reflect the true environmental cost of sand".',
            en: 'Para G: "higher prices that reflect the true environmental cost of sand".',
          },
        },
      ],
    },
  },
]
