/**
 * level-2-grammar-lessons.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 2 (≈ A2 – B1) · PHẦN 1
 * ----------------------------------------------------------------------------
 * Bài ngữ pháp MỚI, viết riêng cho khu Ngữ pháp (không nằm trong chặng nào trên lộ trình).
 * Mỗi bài: category 'grammar', track 'general' (tính XP cho track tổng quát).
 * Phần 2 của Level 2 nằm ở level-2-grammar-lessons-part2.ts.
 *
 * Danh sách bài:
 *   gr-l2-future            Tương lai: will, be going to, hiện tại tiếp diễn (lịch hẹn)
 *   gr-l2-present-perfect   Hiện tại hoàn thành vs quá khứ đơn: ever, never, already, yet, for, since
 *   gr-l2-past-continuous   Quá khứ tiếp diễn: việc đang diễn ra + việc xen vào (when / while)
 *   gr-l2-used-to           Used to / would: thói quen ngày xưa, so sánh với bây giờ
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ ngắn song ngữ, có ví dụ
 *   - exercises     : 11 bài luyện (có ít nhất 1 bài nói speak-sentence / speak-answer)
 *   - miniTest      : [] (bài v3 không có mini-test)
 *
 * Quy ước id: bài "gr-l2-<chủ đề>", bài tập "gr-l2-<chủ đề>-ex<số>".
 * Toàn bộ câu ví dụ và bài tập do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'
import { withGrammarMiniTests } from './grammar-mini-tests'

export const level2GrammarLessons: Lesson[] = withGrammarMiniTests([
  // ==========================================================================
  // BÀI 1: Các cách nói tương lai
  // ==========================================================================
  {
    id: 'gr-l2-future',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 10,
    title: {
      vi: 'Tương lai: will, be going to, hiện tại tiếp diễn',
      en: 'Future forms: will, going to, present continuous',
    },
    description: {
      vi: 'Chọn đúng cách nói tương lai: quyết định ngay lúc nói, kế hoạch có sẵn hay lịch hẹn cố định.',
      en: 'Choose the right future form: a decision made now, a plan you already have, or a fixed arrangement.',
    },
    teachingCards: [
      {
        title: { vi: 'will: quyết định ngay, dự đoán, đề nghị', en: 'will: instant decisions, predictions, offers' },
        body: {
          vi: '**will + V** dùng khi:\n• **quyết định ngay lúc nói**: The phone is ringing. I**\'ll** get it.\n• **dự đoán** theo ý kiến (I think, probably): I think robots **will** do more jobs.\n• **đề nghị, hứa**: I**\'ll** help you with your bags.\nPhủ định: **won\'t** (= will not).',
          en: '**will + V** is used for:\n• **decisions made while speaking**: The phone is ringing. I**\'ll** get it.\n• **opinion-based predictions** (I think, probably): I think robots **will** do more jobs.\n• **offers and promises**: I**\'ll** help you with your bags.\nNegative: **won\'t** (= will not).',
        },
        examples: [
          { en: 'It\'s cold in here. I\'ll close the window.', vi: 'Trong này lạnh quá. Để tôi đóng cửa sổ.' },
          { en: 'I promise I won\'t be late again.', vi: 'Tôi hứa sẽ không đến muộn nữa.' },
        ],
      },
      {
        title: { vi: 'be going to: kế hoạch & dấu hiệu', en: 'be going to: plans & evidence' },
        body: {
          vi: '**am / is / are going to + V** dùng khi:\n• **kế hoạch đã quyết từ trước**: I**\'m going to** study abroad next year.\n• **dự đoán có dấu hiệu rõ** ngay trước mắt: Look at those dark clouds. It**\'s going to** rain.\nSo sánh: "I\'ll buy a bike" (vừa quyết) – "I\'m going to buy a bike" (đã định từ trước).',
          en: '**am / is / are going to + V** is used for:\n• **plans decided earlier**: I**\'m going to** study abroad next year.\n• **predictions with clear evidence** now: Look at those dark clouds. It**\'s going to** rain.\nCompare: "I\'ll buy a bike" (deciding now) – "I\'m going to buy a bike" (already planned).',
        },
        examples: [
          { en: 'We\'re going to repaint the kitchen this summer.', vi: 'Hè này chúng tôi định sơn lại nhà bếp.' },
          { en: 'Watch out! That glass is going to fall.', vi: 'Cẩn thận! Cái cốc kia sắp rơi rồi.' },
        ],
      },
      {
        title: { vi: 'Hiện tại tiếp diễn: lịch hẹn cố định', en: 'Present continuous: fixed arrangements' },
        body: {
          vi: '**am / is / are + V-ing** + thời gian tương lai = việc **đã sắp xếp xong**, thường có người khác, giờ, địa điểm (đã ghi vào lịch).\nI**\'m meeting** my tutor at 4 p.m. tomorrow.\nWe**\'re flying** to Da Nang on Friday.\nNếu hỏi về kế hoạch cuối tuần: **What are you doing** this weekend?',
          en: '**am / is / are + V-ing** + a future time = an **arrangement already made**, often with other people, a time and a place (it\'s in your diary).\nI**\'m meeting** my tutor at 4 p.m. tomorrow.\nWe**\'re flying** to Da Nang on Friday.\nAsking about plans: **What are you doing** this weekend?',
        },
        examples: [
          { en: 'My sister is starting her new job on Monday.', vi: 'Thứ Hai này chị tôi bắt đầu công việc mới.' },
          { en: 'Are you coming to the class party tonight?', vi: 'Tối nay bạn có đến buổi tiệc của lớp không?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-future-ex01',
        type: 'multiple-choice',
        question: 'A: "We don\'t have any milk." B: "Oh, I ___ some on my way home."',
        options: ['buy', 'am going to buy', '\'ll buy', 'bought'],
        correctIndex: 2,
        explanation: {
          vi: 'B quyết định ngay lúc nghe tin → will (\'ll buy).',
          en: 'B decides at the moment of speaking → will (\'ll buy).',
        },
      },
      {
        id: 'gr-l2-future-ex02',
        type: 'fill-blank',
        sentence: 'Look at the traffic! We ___ late for the exam.',
        acceptedAnswers: ["are going to be", "'re going to be", 're going to be'],
        hint: '(be going to + be)',
        explanation: {
          vi: 'Có dấu hiệu rõ ngay trước mắt (kẹt xe) → be going to.',
          en: 'There is clear evidence now (the traffic) → be going to.',
        },
      },
      {
        id: 'gr-l2-future-ex03',
        type: 'multiple-choice',
        question: 'I ___ the dentist at 10 a.m. tomorrow. It\'s in my calendar.',
        options: ['see', 'am seeing', 'have seen', 'saw'],
        correctIndex: 1,
        explanation: {
          vi: 'Lịch hẹn đã sắp xếp, có giờ cụ thể → hiện tại tiếp diễn: am seeing.',
          en: 'A fixed arrangement with a time → present continuous: am seeing.',
        },
      },
      {
        id: 'gr-l2-future-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi câu với cách dùng của nó.', en: 'Match each sentence with its use.' },
        pairs: [
          { left: 'I\'ll carry that box for you.', right: 'an offer' },
          { left: 'I\'m going to learn to swim this year.', right: 'a plan made earlier' },
          { left: 'I\'m having dinner with Lan at seven.', right: 'a fixed arrangement' },
          { left: 'I think prices will go up.', right: 'an opinion prediction' },
        ],
        explanation: {
          vi: 'will: đề nghị/dự đoán theo ý kiến; going to: kế hoạch; V-ing: lịch hẹn.',
          en: 'will: offers/opinion predictions; going to: plans; -ing: arrangements.',
        },
      },
      {
        id: 'gr-l2-future-ex05',
        type: 'fill-blank',
        sentence: 'Don\'t worry, I ___ tell anyone your secret.',
        acceptedAnswers: ["won't", 'will not'],
        hint: '(not / will)',
        explanation: {
          vi: 'Lời hứa → will; phủ định là won\'t.',
          en: 'A promise → will; the negative is won\'t.',
        },
      },
      {
        id: 'gr-l2-future-ex06',
        type: 'arrange-words',
        translationVi: 'Năm sau chúng tôi định chuyển đến một căn hộ lớn hơn.',
        correctSentence: 'We are going to move to a bigger flat next year.',
        extraWords: ['will', 'moving'],
        explanation: {
          vi: 'Kế hoạch đã quyết từ trước → are going to + V nguyên mẫu.',
          en: 'A plan decided earlier → are going to + base verb.',
        },
      },
      {
        id: 'gr-l2-future-ex07',
        type: 'true-false',
        statement: '"I think more people will work from home in the future." is a correct way to make a prediction.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Dự đoán theo ý kiến (I think) → will + V là đúng.',
          en: 'An opinion-based prediction (I think) → will + V is correct.',
        },
      },
      {
        id: 'gr-l2-future-ex08',
        type: 'multiple-choice',
        question: 'Which question asks about someone\'s arrangements?',
        options: [
          'What do you do this weekend?',
          'What are you doing this weekend?',
          'What did you do this weekend?',
          'What you will do this weekend?',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Hỏi kế hoạch/lịch hẹn sắp tới → What are you doing…?',
          en: 'Asking about upcoming arrangements → What are you doing…?',
        },
      },
      {
        id: 'gr-l2-future-ex09',
        type: 'listen-choose',
        audioText: 'Woman: Are you free on Saturday?\nMan: Sorry, I\'m visiting my grandparents in the countryside.',
        question: 'Why can\'t the man meet on Saturday?',
        options: ['He is going to study.', 'He has an arrangement with his grandparents.', 'He will decide later.', 'He visited the countryside last week.'],
        correctIndex: 1,
        explanation: {
          vi: '"I\'m visiting my grandparents" = lịch hẹn đã sắp xếp.',
          en: '"I\'m visiting my grandparents" = an arrangement already made.',
        },
      },
      {
        id: 'gr-l2-future-ex10',
        type: 'fill-blank',
        sentence: 'My brother has bought the tickets. He ___ a concert on Sunday.',
        acceptedAnswers: ["is going to", "'s going to", 's going to', 'is going to go to', "'s going to go to"],
        hint: '(be going to)',
        explanation: {
          vi: 'Đã mua vé = kế hoạch quyết từ trước → is going to.',
          en: 'He has bought tickets = a plan made earlier → is going to.',
        },
      },
      {
        id: 'gr-l2-future-ex11',
        type: 'speak-answer',
        question: 'What are you going to do next weekend?',
        tipsVi:
          'Dùng "I\'m going to…" cho kế hoạch và "I\'m + V-ing" cho lịch hẹn có giờ. Thêm 1 lý do bằng because. Nói 2–3 câu.',
        sampleAnswer:
          'I\'m going to spend most of the weekend at home because I have a lot of reading to do. On Sunday afternoon, I\'m meeting two friends at a café near the lake. I think we\'ll probably talk about our exam plans.',
        recordSeconds: 40,
        explanation: {
          vi: 'Trộn going to (kế hoạch), V-ing (lịch hẹn) và will (dự đoán) cho câu trả lời tự nhiên.',
          en: 'Mix going to (plans), -ing (arrangements) and will (predictions) for a natural answer.',
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2: Hiện tại hoàn thành vs quá khứ đơn
  // ==========================================================================
  {
    id: 'gr-l2-present-perfect',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 11,
    title: {
      vi: 'Hiện tại hoàn thành vs quá khứ đơn',
      en: 'Present perfect vs past simple',
    },
    description: {
      vi: 'Dùng đúng ever, never, already, yet, for, since và biết khi nào bắt buộc phải dùng quá khứ đơn.',
      en: 'Use ever, never, already, yet, for and since correctly, and know when you must use the past simple.',
    },
    teachingCards: [
      {
        title: { vi: 'Trải nghiệm & kết quả bây giờ', en: 'Experience & present results' },
        body: {
          vi: '**have / has + V3** nối quá khứ với **bây giờ**, **không nói lúc nào**.\n• **Trải nghiệm**: Have you **ever** been to Singapore? I have **never** tried durian.\n• **already** (rồi), **just** (vừa mới) đứng giữa have và V3; **yet** (chưa / chưa?) cuối câu phủ định và câu hỏi.\nI\'ve **already** finished. Have you finished **yet**?',
          en: '**have / has + V3** links the past to **now**, **without saying when**.\n• **Experience**: Have you **ever** been to Singapore? I have **never** tried durian.\n• **already** and **just** go between have and V3; **yet** goes at the end of negatives and questions.\nI\'ve **already** finished. Have you finished **yet**?',
        },
        examples: [
          { en: 'I\'ve just sent you the report.', vi: 'Tôi vừa gửi bản báo cáo cho bạn.' },
          { en: 'She hasn\'t decided on a university yet.', vi: 'Cô ấy vẫn chưa chọn được trường đại học.' },
        ],
      },
      {
        title: { vi: 'for và since', en: 'for and since' },
        body: {
          vi: 'Việc **bắt đầu trong quá khứ và vẫn còn tới bây giờ**:\n**for** + **khoảng thời gian**: for three years, for a long time.\n**since** + **mốc bắt đầu**: since 2020, since Monday, since I was a child.\nI **have worked** here **for** five years. (vẫn đang làm)\nSai: "I work here since 2020." → Đúng: "I **have worked** here since 2020."',
          en: 'For something that **started in the past and continues now**:\n**for** + **a period**: for three years, for a long time.\n**since** + **a starting point**: since 2020, since Monday, since I was a child.\nI **have worked** here **for** five years. (I still do)\nWrong: "I work here since 2020." → Right: "I **have worked** here since 2020."',
        },
        examples: [
          { en: 'We have lived in this flat since 2018.', vi: 'Chúng tôi sống ở căn hộ này từ năm 2018.' },
          { en: 'My parents have known each other for thirty years.', vi: 'Bố mẹ tôi quen nhau đã ba mươi năm.' },
        ],
      },
      {
        title: { vi: 'Có thời gian đã qua → quá khứ đơn', en: 'Finished time → past simple' },
        body: {
          vi: 'Khi nói **rõ lúc nào** trong quá khứ (**yesterday, last year, in 2019, two days ago, when I was ten**) → bắt buộc dùng **quá khứ đơn**.\nI **have visited** Hue. (không nói lúc nào)\nI **visited** Hue **last summer**. (có thời gian)\nSai: "I have visited Hue last summer."',
          en: 'When you say **exactly when** in the past (**yesterday, last year, in 2019, two days ago, when I was ten**) → use the **past simple**.\nI **have visited** Hue. (no time given)\nI **visited** Hue **last summer**. (time given)\nWrong: "I have visited Hue last summer."',
        },
        examples: [
          { en: 'Have you ever flown? — Yes, I flew to Phu Quoc in 2022.', vi: 'Bạn đi máy bay bao giờ chưa? — Rồi, tôi bay đi Phú Quốc năm 2022.' },
          { en: 'I lost my keys yesterday, but I\'ve found them now.', vi: 'Hôm qua tôi làm mất chìa khoá, nhưng giờ tìm thấy rồi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-present-perfect-ex01',
        type: 'multiple-choice',
        question: 'I ___ in this city since I finished university.',
        options: ['live', 'lived', 'have lived', 'am living'],
        correctIndex: 2,
        explanation: {
          vi: '"since" + việc còn kéo dài tới giờ → hiện tại hoàn thành: have lived.',
          en: '"since" + a situation continuing until now → present perfect: have lived.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm có for / since với nghĩa tiếng Việt.', en: 'Match each for / since phrase with its Vietnamese meaning.' },
        pairs: [
          { left: 'for two weeks', right: 'trong (suốt) hai tuần' },
          { left: 'since Monday', right: 'từ thứ Hai (đến giờ)' },
          { left: 'for ages', right: 'lâu lắm rồi' },
          { left: 'since I was a child', right: 'từ hồi còn nhỏ (đến giờ)' },
        ],
        explanation: {
          vi: 'for + khoảng thời gian; since + mốc bắt đầu.',
          en: 'for + a period of time; since + a starting point.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex03',
        type: 'fill-blank',
        sentence: 'My grandmother has worked as a teacher ___ forty years.',
        acceptedAnswers: ['for'],
        hint: '(for / since)',
        explanation: {
          vi: '"forty years" là khoảng thời gian → for.',
          en: '"forty years" is a period of time → for.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I have seen that film last week.',
          'I saw that film last week.',
          'I have saw that film last week.',
          'I see that film last week.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"last week" là thời gian đã qua → quá khứ đơn: saw.',
          en: '"last week" is a finished time → past simple: saw.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex05',
        type: 'fill-blank',
        sentence: 'Have you ___ been to a music festival?',
        acceptedAnswers: ['ever'],
        hint: '(ever / never)',
        explanation: {
          vi: 'Câu hỏi về trải nghiệm → Have you ever…?',
          en: 'A question about experience → Have you ever…?',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi chưa làm xong bài tập về nhà.',
        correctSentence: "I haven't finished my homework yet.",
        extraWords: ['already', 'finish'],
        explanation: {
          vi: 'Phủ định "chưa" → haven\'t + V3 … yet (yet ở cuối câu).',
          en: 'Negative "not yet" → haven\'t + V3 … yet (yet at the end).',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex07',
        type: 'true-false',
        statement: '"She has went to the bank." is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Sau has cần V3: go → went → gone. Đúng: "She has gone to the bank."',
          en: 'After has we need V3: go → went → gone. Correct: "She has gone to the bank."',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex08',
        type: 'multiple-choice',
        question: 'A: "Is Minh here?" B: "No, he ___ left. You missed him by two minutes."',
        options: ['has just', 'just has', 'has yet', 'did yet'],
        correctIndex: 0,
        explanation: {
          vi: 'Vừa mới xảy ra → has just + V3; just đứng giữa has và V3.',
          en: 'It happened a moment ago → has just + V3; just goes between has and V3.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex09',
        type: 'fill-blank',
        sentence: 'We ___ to Japan in 2019, and it was amazing.',
        acceptedAnswers: ['went', 'travelled', 'traveled', 'flew'],
        hint: '(go)',
        explanation: {
          vi: '"in 2019" là thời điểm đã qua → quá khứ đơn: went.',
          en: '"in 2019" is a finished time → past simple: went.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex10',
        type: 'listen-type',
        audioText: 'I have studied English for six years.',
        acceptedAnswers: ['I have studied English for six years.', "I've studied English for six years."],
        explanation: {
          vi: 'Việc bắt đầu từ trước và vẫn tiếp tục → have studied + for.',
          en: 'Started in the past and still continuing → have studied + for.',
        },
      },
      {
        id: 'gr-l2-present-perfect-ex11',
        type: 'speak-answer',
        question: 'How long have you lived in your hometown?',
        tipsVi:
          'Trả lời bằng "I\'ve lived there for… / since…", rồi thêm 1 câu quá khứ đơn có thời gian cụ thể (VD: I moved… in…). Nhớ đọc rõ âm /v/ trong "I\'ve".',
        sampleAnswer:
          'I\'ve lived in Can Tho since I was born, so for about twenty years now. My family moved to a new house near the river in 2015, and I\'ve really enjoyed living there.',
        recordSeconds: 40,
        explanation: {
          vi: 'Hiện tại hoàn thành cho việc kéo dài tới giờ; quá khứ đơn cho mốc đã qua.',
          en: 'Present perfect for the ongoing situation; past simple for the finished time.',
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3: Quá khứ tiếp diễn
  // ==========================================================================
  {
    id: 'gr-l2-past-continuous',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 10,
    title: {
      vi: 'Quá khứ tiếp diễn: when và while',
      en: 'Past continuous: when and while',
    },
    description: {
      vi: 'Tả việc đang diễn ra trong quá khứ và việc ngắn xen vào — giúp kể chuyện sinh động hơn.',
      en: 'Describe an action in progress in the past and a short action that interrupted it — for livelier stories.',
    },
    teachingCards: [
      {
        title: { vi: 'Đang làm gì lúc đó?', en: 'What were you doing then?' },
        body: {
          vi: '**was / were + V-ing** = việc **đang diễn ra** tại một thời điểm trong quá khứ.\nI/he/she/it **was** · you/we/they **were**.\nAt 8 p.m. last night, I **was watching** the news.\nPhủ định: wasn\'t / weren\'t + V-ing. Câu hỏi: **What were you doing** at 8 p.m.?',
          en: '**was / were + V-ing** = an action **in progress** at a time in the past.\nI/he/she/it **was** · you/we/they **were**.\nAt 8 p.m. last night, I **was watching** the news.\nNegative: wasn\'t / weren\'t + V-ing. Question: **What were you doing** at 8 p.m.?',
        },
        examples: [
          { en: 'This time yesterday, we were sitting on a train.', vi: 'Giờ này hôm qua, chúng tôi đang ngồi trên tàu.' },
          { en: 'My parents weren\'t sleeping when I got home.', vi: 'Bố mẹ tôi chưa ngủ khi tôi về đến nhà.' },
        ],
      },
      {
        title: { vi: 'Việc dài + việc ngắn xen vào', en: 'Long action + short interruption' },
        body: {
          vi: '**Việc dài** (bối cảnh) → **quá khứ tiếp diễn**. **Việc ngắn** xen vào → **quá khứ đơn**.\nI **was cooking** dinner **when** the power **went** off.\n**when** + việc ngắn (quá khứ đơn).\n**while** + việc dài (quá khứ tiếp diễn): **While** I **was walking** home, it **started** to rain.',
          en: 'The **long action** (background) → **past continuous**. The **short action** that interrupts → **past simple**.\nI **was cooking** dinner **when** the power **went** off.\n**when** + short action (past simple).\n**while** + long action (past continuous): **While** I **was walking** home, it **started** to rain.',
        },
        examples: [
          { en: 'She was studying when her phone rang.', vi: 'Cô ấy đang học thì điện thoại reo.' },
          { en: 'While we were waiting for the bus, we met our old teacher.', vi: 'Trong lúc đợi xe buýt, chúng tôi gặp lại thầy giáo cũ.' },
        ],
      },
      {
        title: { vi: 'Hai việc cùng lúc & mở đầu câu chuyện', en: 'Two actions at once & setting the scene' },
        body: {
          vi: 'Hai việc dài **diễn ra song song** → cả hai dùng quá khứ tiếp diễn:\nWhile my mother **was cooking**, my father **was cleaning** the house.\nMở đầu câu chuyện (IELTS Speaking Part 2), tả bối cảnh trước: "It **was raining** and everyone **was hurrying** home…" rồi kể sự việc chính bằng quá khứ đơn.',
          en: 'Two long actions **happening at the same time** → both in the past continuous:\nWhile my mother **was cooking**, my father **was cleaning** the house.\nTo start a story (IELTS Speaking Part 2), set the scene first: "It **was raining** and everyone **was hurrying** home…" then tell the main events in the past simple.',
        },
        examples: [
          { en: 'The sun was shining and children were playing in the park.', vi: 'Nắng đang chiếu và trẻ con đang chơi trong công viên.' },
          { en: 'While I was reading, my brother was playing games.', vi: 'Trong lúc tôi đọc sách, em trai tôi chơi điện tử.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-past-continuous-ex01',
        type: 'multiple-choice',
        question: 'At 9 o\'clock last night, I ___ an essay.',
        options: ['write', 'was writing', 'were writing', 'have written'],
        correctIndex: 1,
        explanation: {
          vi: 'Đang diễn ra tại một giờ cụ thể trong quá khứ; chủ ngữ I → was writing.',
          en: 'In progress at a past time; subject I → was writing.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex02',
        type: 'fill-blank',
        sentence: 'We were having lunch when the manager ___ in.',
        acceptedAnswers: ['came', 'walked'],
        hint: '(come)',
        explanation: {
          vi: 'Việc ngắn xen vào sau "when" → quá khứ đơn: came.',
          en: 'The short interrupting action after "when" → past simple: came.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex03',
        type: 'fill-blank',
        sentence: 'While they ___ football, it started to rain heavily.',
        acceptedAnswers: ['were playing'],
        hint: '(play)',
        explanation: {
          vi: '"while" + việc dài → quá khứ tiếp diễn; they → were playing.',
          en: '"while" + the long action → past continuous; they → were playing.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I was taking a shower when the doorbell was ringing.',
          'I took a shower when the doorbell was ring.',
          'I was taking a shower when the doorbell rang.',
          'I were taking a shower when the doorbell rang.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Việc dài (was taking) + việc ngắn xen vào (rang, quá khứ đơn).',
          en: 'Long action (was taking) + short interruption (rang, past simple).',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối hai nửa để tạo câu đúng.', en: 'Match the two halves to make correct sentences.' },
        pairs: [
          { left: 'Lan was jogging in the park when', right: 'she twisted her ankle on a stone.' },
          { left: 'While I was washing the dishes,', right: 'I dropped a plate.' },
          { left: 'The children were sleeping when', right: 'the thunder woke them up.' },
          { left: 'While Dad was driving us to Hue,', right: 'he missed the exit twice.' },
        ],
        explanation: {
          vi: 'Việc dài dùng was/were + V-ing; việc xen vào dùng quá khứ đơn.',
          en: 'Long actions use was/were + -ing; interruptions use the past simple.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex06',
        type: 'arrange-words',
        translationVi: 'Bạn đang làm gì lúc mất điện?',
        correctSentence: 'What were you doing when the power went off?',
        extraWords: ['did', 'was'],
        explanation: {
          vi: 'Câu hỏi quá khứ tiếp diễn: What + were + you + V-ing…?',
          en: 'Past continuous question: What + were + you + -ing…?',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex07',
        type: 'true-false',
        statement: '"When I arrived, my friends were waiting for me." means my friends started waiting after I arrived.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"were waiting" = họ đã đang đợi từ trước khi tôi đến.',
          en: '"were waiting" = they were already waiting before I arrived.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex08',
        type: 'multiple-choice',
        question: 'I didn\'t hear the phone because I ___ to music.',
        options: ['listened', 'was listening', 'am listening', 'listen'],
        correctIndex: 1,
        explanation: {
          vi: 'Việc đang diễn ra làm bối cảnh cho lý do → was listening.',
          en: 'The action in progress gives the background reason → was listening.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex09',
        type: 'fill-blank',
        sentence: 'My sister ___ not studying when I called; she was watching TV.',
        acceptedAnswers: ['was'],
        hint: '(be)',
        explanation: {
          vi: 'Chủ ngữ số ít "My sister" → was (not) + V-ing.',
          en: 'Singular subject "My sister" → was (not) + -ing.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex10',
        type: 'listen-choose',
        audioText: 'While I was cycling to work, I saw an accident on the main road.',
        question: 'What was the speaker doing when he saw the accident?',
        options: ['Driving to work', 'Cycling to work', 'Walking home', 'Waiting for a bus'],
        correctIndex: 1,
        explanation: {
          vi: '"While I was cycling to work" = việc đang diễn ra khi thấy tai nạn.',
          en: '"While I was cycling to work" = the action in progress when he saw it.',
        },
      },
      {
        id: 'gr-l2-past-continuous-ex11',
        type: 'speak-sentence',
        sentence: 'I was walking home when it started to rain.',
        translationVi: 'Tôi đang đi bộ về nhà thì trời bắt đầu mưa.',
        explanation: {
          vi: 'Đọc rõ âm /z/ trong "was" và đuôi -ed /ɪd/ trong "started".',
          en: 'Say the /z/ in "was" and the /ɪd/ ending in "started".',
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 4: Used to / would — thói quen trong quá khứ
  // ==========================================================================
  {
    id: 'gr-l2-used-to',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 10,
    title: {
      vi: 'Used to & would: thói quen ngày xưa',
      en: 'Used to & would: past habits',
    },
    description: {
      vi: 'Kể về ngày xưa và so sánh với bây giờ — dạng câu hỏi rất hay gặp trong IELTS Speaking.',
      en: 'Talk about how things used to be and compare them with now — a very common IELTS Speaking topic.',
    },
    teachingCards: [
      {
        title: { vi: 'used to + V: ngày xưa thì thế, giờ thì không', en: 'used to + V: true then, not now' },
        body: {
          vi: '**used to + V nguyên mẫu** = thói quen hoặc tình trạng **trong quá khứ**, **bây giờ không còn**.\nI **used to** play badminton every evening. (giờ không chơi nữa)\nThere **used to** be a cinema here.\nSai: "I used to playing" → sau used to là **V nguyên mẫu**.',
          en: '**used to + base verb** = a habit or situation **in the past** that is **not true now**.\nI **used to** play badminton every evening. (I don\'t now)\nThere **used to** be a cinema here.\nWrong: "I used to playing" → after used to, use the **base verb**.',
        },
        examples: [
          { en: 'My grandfather used to ride a bicycle to work.', vi: 'Ông tôi ngày xưa đạp xe đi làm.' },
          { en: 'This street used to be very quiet.', vi: 'Con phố này ngày xưa rất yên tĩnh.' },
        ],
      },
      {
        title: { vi: 'Phủ định và câu hỏi', en: 'Negatives and questions' },
        body: {
          vi: 'Phủ định: **didn\'t use to + V** (không có -d sau use).\nI **didn\'t use to** like vegetables.\nCâu hỏi: **Did you use to + V?**\n**Did you use to** live in the countryside?\nCó thể nói: "I **never used to** eat breakfast."',
          en: 'Negative: **didn\'t use to + V** (no -d after use).\nI **didn\'t use to** like vegetables.\nQuestion: **Did you use to + V?**\n**Did you use to** live in the countryside?\nYou can also say: "I **never used to** eat breakfast."',
        },
        examples: [
          { en: 'We didn\'t use to have a car.', vi: 'Ngày xưa nhà tôi không có ô tô.' },
          { en: 'Did your school use to have a uniform?', vi: 'Trường bạn ngày xưa có đồng phục không?' },
        ],
      },
      {
        title: { vi: 'would: hành động lặp lại (không dùng cho trạng thái)', en: 'would: repeated actions (not states)' },
        body: {
          vi: '**would + V** cũng kể **hành động lặp lại** ngày xưa, nghe như đang hồi tưởng:\nEvery summer, we **would** visit our grandparents.\nNhưng **không** dùng would cho **trạng thái** (be, have, live, like, know):\nSai: "I would live in Hue." → Đúng: "I **used to** live in Hue."\nIELTS: "In the past, people **used to**… but nowadays they…"',
          en: '**would + V** also describes **repeated past actions**, with a nostalgic feel:\nEvery summer, we **would** visit our grandparents.\nBut **don\'t** use would for **states** (be, have, live, like, know):\nWrong: "I would live in Hue." → Right: "I **used to** live in Hue."\nIELTS: "In the past, people **used to**… but nowadays they…"',
        },
        examples: [
          { en: 'After dinner, my father would tell us stories.', vi: 'Sau bữa tối, bố tôi thường kể chuyện cho chúng tôi nghe.' },
          { en: 'People used to write letters, but now they send messages.', vi: 'Ngày xưa người ta viết thư, còn giờ thì nhắn tin.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l2-used-to-ex01',
        type: 'multiple-choice',
        question: 'When I was a child, I ___ to school with my cousins.',
        options: ['used to walk', 'used to walking', 'use to walked', 'was used walk'],
        correctIndex: 0,
        explanation: {
          vi: 'Thói quen ngày xưa → used to + V nguyên mẫu: used to walk.',
          en: 'A past habit → used to + base verb: used to walk.',
        },
      },
      {
        id: 'gr-l2-used-to-ex02',
        type: 'fill-blank',
        sentence: 'There ___ to be a big market here, but now it\'s a shopping centre.',
        acceptedAnswers: ['used'],
        hint: '(use)',
        explanation: {
          vi: 'Tình trạng ngày xưa, giờ không còn → There used to be…',
          en: 'A past situation that is no longer true → There used to be…',
        },
      },
      {
        id: 'gr-l2-used-to-ex03',
        type: 'fill-blank',
        sentence: 'I didn\'t ___ to like reading, but now I love it.',
        acceptedAnswers: ['use'],
        hint: '(use / used)',
        explanation: {
          vi: 'Sau didn\'t, dùng "use" (không có -d): didn\'t use to.',
          en: 'After didn\'t, write "use" with no -d: didn\'t use to.',
        },
      },
      {
        id: 'gr-l2-used-to-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is NOT correct?',
        options: [
          'We would go fishing every Sunday.',
          'I used to have long hair.',
          'I would have long hair.',
          'She used to be very shy.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"have long hair" là trạng thái → không dùng would, phải dùng used to.',
          en: '"have long hair" is a state → use used to, not would.',
        },
      },
      {
        id: 'gr-l2-used-to-ex05',
        type: 'arrange-words',
        translationVi: 'Ngày xưa bạn có sống ở nông thôn không?',
        correctSentence: 'Did you use to live in the countryside?',
        extraWords: ['used', 'living'],
        explanation: {
          vi: 'Câu hỏi: Did + S + use to + V? (use không có -d).',
          en: 'Question: Did + subject + use to + verb? (use has no -d).',
        },
      },
      {
        id: 'gr-l2-used-to-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối "ngày xưa" với "bây giờ".', en: 'Match "in the past" with "now".' },
        pairs: [
          { left: 'People used to write letters,', right: 'but now they send messages.' },
          { left: 'Families used to cook every meal,', right: 'but now many order food online.' },
          { left: 'Children used to play outside,', right: 'but now they often play on screens.' },
          { left: 'Most people used to pay in cash,', right: 'but now they use cards and apps.' },
        ],
        explanation: {
          vi: 'Mẫu so sánh IELTS: used to (ngày xưa) + but now (hiện tại đơn).',
          en: 'IELTS comparison pattern: used to (past) + but now (present simple).',
        },
      },
      {
        id: 'gr-l2-used-to-ex07',
        type: 'true-false',
        statement: '"My mother used to work in a bank." tells us she probably doesn\'t work there now.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: '"used to" = ngày xưa như vậy, bây giờ thì không còn.',
          en: '"used to" = true in the past, not true now.',
        },
      },
      {
        id: 'gr-l2-used-to-ex08',
        type: 'multiple-choice',
        question: 'Every Tet holiday, my grandmother ___ banh chung for the whole family.',
        options: ['would make', 'would made', 'used to making', 'was used to make'],
        correctIndex: 0,
        explanation: {
          vi: 'Hành động lặp lại ngày xưa → would + V nguyên mẫu: would make.',
          en: 'A repeated past action → would + base verb: would make.',
        },
      },
      {
        id: 'gr-l2-used-to-ex09',
        type: 'fill-blank',
        sentence: 'He used to ___ a lot of coffee, but he stopped last year.',
        acceptedAnswers: ['drink'],
        hint: '(drink)',
        explanation: {
          vi: 'Sau used to là V nguyên mẫu: drink.',
          en: 'After used to, use the base verb: drink.',
        },
      },
      {
        id: 'gr-l2-used-to-ex10',
        type: 'listen-type',
        audioText: 'We used to live in a small flat near the river.',
        acceptedAnswers: ['We used to live in a small flat near the river.', 'We used to live in a small flat near the river'],
        explanation: {
          vi: '"used to" đọc nhanh nghe như /juːstə/ — chữ viết vẫn là used to.',
          en: '"used to" sounds like /juːstə/ in fast speech, but it is written used to.',
        },
      },
      {
        id: 'gr-l2-used-to-ex11',
        type: 'speak-answer',
        question: 'How was your hometown different when you were a child?',
        tipsVi:
          'Dùng "There used to be…", "People used to…" cho ngày xưa, rồi "but now…" với hiện tại đơn. Đọc used to nhẹ: /juːstə/. Nói 3 câu.',
        sampleAnswer:
          'When I was a child, my hometown used to be much quieter. There used to be rice fields right next to my house, and we would fly kites there after school. But now there are new roads and apartment buildings everywhere.',
        recordSeconds: 45,
        explanation: {
          vi: 'used to cho trạng thái ngày xưa, would cho việc lặp lại, but now cho hiện tại.',
          en: 'used to for past states, would for repeated actions, but now for the present.',
        },
      },
    ],
    miniTest: [],
  },
])
