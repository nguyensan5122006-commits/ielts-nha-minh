/**
 * writing-lessons.ts — LEVEL 2 "FOUNDATION" (Band 2.0 – 3.0, CEFR A1+/A2) — KỸ NĂNG VIẾT
 * ----------------------------------------------------------------------------
 * File này chứa 10 bài học Viết cho người đã qua Level 1.
 * Lộ trình:
 *   1. Hiện tại đơn vs hiện tại tiếp diễn khi viết
 *   2. Kể chuyện ở quá khứ đơn (động từ bất quy tắc)
 *   3. So sánh hai thứ (so sánh hơn / so sánh nhất)
 *   4. Viết về kế hoạch tương lai (be going to)
 *   5. Đưa lời khuyên (should / must)
 *   6. Viết email / thư thân mật (mời, cảm ơn)
 *   7. Tả một nơi chốn với there was / there were + tính từ
 *   8. Cấu trúc đoạn văn (câu chủ đề + câu hỗ trợ + câu kết)
 *   9. Từ nối (first, also, however, so, because)
 *  10. Làm quen IELTS Writing Task 1 — mô tả số liệu đơn giản
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2-3 thẻ lý thuyết song ngữ
 *   - exercises     : 10 bài luyện, trong đó đúng 1 bài "write-answer" (AI chấm)
 *   - miniTest      : 6 câu kiểm tra, trong đó đúng 1 bài "write-answer"
 *
 * Quy ước id: "l2-write-<số bài>-ex<số>" và "l2-write-<số bài>-test<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level2WritingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Hiện tại đơn (thói quen, sự thật) vs hiện tại tiếp diễn (đang xảy ra)
  // ==========================================================================
  {
    id: 'l2-write-01',
    skill: 'writing',
    title: {
      vi: 'Hiện tại đơn và hiện tại tiếp diễn khi viết',
      en: 'Present simple vs present continuous in writing',
    },
    description: {
      vi: 'Biết khi nào viết "I play" và khi nào viết "I am playing" để câu văn đúng nghĩa.',
      en: 'Know when to write "I play" and when to write "I am playing" so your meaning is clear.',
    },
    teachingCards: [
      {
        title: { vi: 'Hiện tại đơn: thói quen và sự thật', en: 'Present simple: habits and facts' },
        body: {
          vi: 'Dùng **hiện tại đơn** cho việc làm **thường xuyên** hoặc **sự thật**.\nCấu trúc: I/You/We/They + **V** — He/She/It + **V-s/es**.\nPhủ định: **don\'t / doesn\'t + V**.\nTừ hay đi kèm: **always, usually, often, sometimes, never, every day, on Mondays**.',
          en: 'Use the **present simple** for **habits** and **facts**.\nForm: I/You/We/They + **V** — He/She/It + **V-s/es**.\nNegative: **don\'t / doesn\'t + V**.\nCommon words: **always, usually, often, sometimes, never, every day, on Mondays**.',
        },
        examples: [
          { en: 'My brother usually gets up at six.', vi: 'Anh trai tôi thường dậy lúc 6 giờ.' },
          { en: 'The sun rises in the east.', vi: 'Mặt trời mọc ở phía đông.' },
          { en: 'We don\'t go to school on Sundays.', vi: 'Chúng tôi không đi học vào Chủ nhật.' },
        ],
      },
      {
        title: { vi: 'Hiện tại tiếp diễn: đang xảy ra', en: 'Present continuous: happening now' },
        body: {
          vi: 'Dùng **hiện tại tiếp diễn** cho việc **đang xảy ra lúc này** hoặc **tạm thời trong thời gian này**.\nCấu trúc: **am / is / are + V-ing**.\nTừ hay đi kèm: **now, right now, at the moment, today, this week, Look!, Listen!**',
          en: 'Use the **present continuous** for things **happening now** or **temporary situations**.\nForm: **am / is / are + V-ing**.\nCommon words: **now, right now, at the moment, today, this week, Look!, Listen!**',
        },
        examples: [
          { en: 'Look! It is snowing.', vi: 'Nhìn kìa! Trời đang có tuyết.' },
          { en: 'I am staying with my aunt this week.', vi: 'Tuần này tôi đang ở nhà dì.' },
        ],
      },
      {
        title: { vi: 'Động từ chỉ trạng thái', en: 'State verbs' },
        body: {
          vi: 'Một số động từ chỉ **cảm xúc, suy nghĩ, sở hữu** thường **không** dùng dạng -ing: **like, love, hate, want, need, know, understand, believe, have (sở hữu)**.\nSai: "I am wanting a drink." → Đúng: "I **want** a drink."',
          en: 'Some verbs for **feelings, thoughts and possession** are usually **not** used in the -ing form: **like, love, hate, want, need, know, understand, believe, have (own)**.\nWrong: "I am wanting a drink." → Right: "I **want** a drink."',
        },
        examples: [
          { en: 'I know the answer now.', vi: 'Giờ tôi biết câu trả lời rồi.' },
          { en: 'She needs a new bag.', vi: 'Cô ấy cần một chiếc túi mới.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-01-ex01',
        type: 'multiple-choice',
        question: 'Look! The children ___ in the garden.',
        options: ['play', 'are playing', 'plays', 'played'],
        correctIndex: 1,
        explanation: {
          vi: '"Look!" cho thấy việc đang xảy ra ngay lúc này → hiện tại tiếp diễn: are playing.',
          en: '"Look!" shows it is happening now → present continuous: are playing.',
        },
      },
      {
        id: 'l2-write-01-ex02',
        type: 'fill-blank',
        sentence: 'My father usually ___ to work by bus.',
        acceptedAnswers: ['goes'],
        hint: '(go)',
        explanation: {
          vi: '"usually" = thói quen → hiện tại đơn. Chủ ngữ "My father" (ngôi 3 số ít) → goes.',
          en: '"usually" = habit → present simple. "My father" is third person singular → goes.',
        },
      },
      {
        id: 'l2-write-01-ex03',
        type: 'fill-blank',
        sentence: 'Be quiet! The baby ___ now.',
        acceptedAnswers: ['is sleeping', "'s sleeping"],
        hint: '(sleep)',
        explanation: {
          vi: '"now" → việc đang xảy ra: is sleeping.',
          en: '"now" → happening at the moment: is sleeping.',
        },
      },
      {
        id: 'l2-write-01-ex04',
        type: 'arrange-words',
        translationVi: 'Tuần này tôi đang học cho kỳ thi.',
        correctSentence: 'I am studying for an exam this week.',
        extraWords: ['studies'],
        explanation: {
          vi: '"this week" = việc tạm thời → am studying.',
          en: '"this week" = a temporary situation → am studying.',
        },
      },
      {
        id: 'l2-write-01-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I am knowing the answer.', 'I knowing the answer.', 'I am know the answer.', 'I know the answer.'],
        correctIndex: 3,
        explanation: {
          vi: '"know" là động từ trạng thái, không dùng dạng -ing → I know the answer.',
          en: '"know" is a state verb, so we don\'t use -ing → I know the answer.',
        },
      },
      {
        id: 'l2-write-01-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối phần đầu với phần cuối để tạo câu đúng.', en: 'Match the beginnings with the endings.' },
        pairs: [
          { left: 'She usually', right: 'drinks tea in the morning.' },
          { left: 'Right now she', right: 'is drinking coffee.' },
          { left: 'We always', right: 'walk to school.' },
          { left: 'At the moment we', right: 'are waiting for the bus.' },
          { left: 'He never', right: 'eats meat.' },
        ],
        explanation: {
          vi: 'usually / always / never → hiện tại đơn. Right now / At the moment → hiện tại tiếp diễn.',
          en: 'usually / always / never → present simple. Right now / At the moment → present continuous.',
        },
      },
      {
        id: 'l2-write-01-ex07',
        type: 'true-false',
        statement: '"I am wanting a new phone." is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"want" là động từ trạng thái → viết đúng là "I want a new phone."',
          en: '"want" is a state verb → the correct sentence is "I want a new phone."',
        },
      },
      {
        id: 'l2-write-01-ex08',
        type: 'multiple-choice',
        question: 'My sister ___ a letter at the moment, so she can\'t talk.',
        options: ['is writing', 'writes', 'write', 'wrote'],
        correctIndex: 0,
        explanation: {
          vi: '"at the moment" → đang xảy ra → is writing.',
          en: '"at the moment" → happening now → is writing.',
        },
      },
      {
        id: 'l2-write-01-ex09',
        type: 'fill-blank',
        sentence: 'Water ___ at 100 degrees Celsius.',
        acceptedAnswers: ['boils'],
        hint: '(boil)',
        explanation: {
          vi: 'Đây là sự thật khoa học → hiện tại đơn: boils.',
          en: 'This is a scientific fact → present simple: boils.',
        },
      },
      {
        id: 'l2-write-01-ex10',
        type: 'write-answer',
        prompt:
          'Write about your normal school or work day (present simple). Then write what is different this week (present continuous). Example: "I usually walk to school, but this week I am taking the bus."',
        tipsVi:
          'Phần 1: dùng usually / always / every day + hiện tại đơn. Phần 2: dùng this week / at the moment + am/is/are + V-ing. Nhớ thêm -s cho he/she/it.',
        minWords: 40,
        sampleAnswer:
          'I usually get up at six o\'clock and have breakfast with my family. Then I ride my bike to school. I study until four, and in the evening I do my homework. This week is different. My bike is broken, so I am walking to school. My mother is working late, so I am cooking dinner every evening.',
        explanation: {
          vi: 'Kiểm tra: thói quen dùng hiện tại đơn, việc tạm thời tuần này dùng hiện tại tiếp diễn.',
          en: 'Check: habits use the present simple; temporary things this week use the present continuous.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-01-test01',
        type: 'multiple-choice',
        question: 'What ___ you usually ___ on Sundays?',
        options: ['are / doing', 'do / do', 'does / do', 'do / doing'],
        correctIndex: 1,
        explanation: {
          vi: '"usually" → câu hỏi hiện tại đơn: What do you usually do...?',
          en: '"usually" → present simple question: What do you usually do...?',
        },
      },
      {
        id: 'l2-write-01-test02',
        type: 'fill-blank',
        sentence: 'Listen! Someone ___ the piano.',
        acceptedAnswers: ['is playing', "'s playing"],
        hint: '(play)',
        explanation: {
          vi: '"Listen!" → việc đang xảy ra: is playing.',
          en: '"Listen!" → happening now: is playing.',
        },
      },
      {
        id: 'l2-write-01-test03',
        type: 'arrange-words',
        translationVi: 'Anh ấy không ăn thịt.',
        correctSentence: "He doesn't eat meat.",
        extraWords: ["isn't"],
        explanation: {
          vi: 'Phủ định hiện tại đơn với he: doesn\'t + động từ nguyên mẫu (eat).',
          en: 'Present simple negative with he: doesn\'t + base verb (eat).',
        },
      },
      {
        id: 'l2-write-01-test04',
        type: 'multiple-choice',
        question: 'Which sentence is WRONG?',
        options: [
          'She is cooking dinner now.',
          'They play football every Saturday.',
          'I am liking this song.',
          'We are learning English this year.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"like" là động từ trạng thái → phải viết "I like this song."',
          en: '"like" is a state verb → it should be "I like this song."',
        },
      },
      {
        id: 'l2-write-01-test05',
        type: 'true-false',
        statement: 'In the sentence "I usually get up at six", the verb is in the present simple.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: '"get up" ở dạng hiện tại đơn, đi với "usually" để chỉ thói quen.',
          en: '"get up" is present simple, used with "usually" for a habit.',
        },
      },
      {
        id: 'l2-write-01-test06',
        type: 'write-answer',
        prompt:
          'Write about one person in your family. What does he or she usually do every day? What is he or she doing these days that is different?',
        tipsVi:
          'Dùng hiện tại đơn (+s/es) cho thói quen, rồi chuyển sang "these days / this month" + is + V-ing cho việc tạm thời.',
        minWords: 40,
        sampleAnswer:
          'My older sister is a nurse. She usually works at a big hospital in the city centre. She starts work at seven and often comes home very late. She loves her job. These days, she is not working at the hospital because she is taking an English course. She is also learning to drive this month.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Kể chuyện bằng quá khứ đơn (động từ có quy tắc & bất quy tắc)
  // ==========================================================================
  {
    id: 'l2-write-02',
    skill: 'writing',
    title: { vi: 'Kể chuyện bằng thì quá khứ đơn', en: 'Writing a story in the past simple' },
    description: {
      vi: 'Dùng động từ quá khứ (có quy tắc và bất quy tắc) để kể lại một câu chuyện ngắn.',
      en: 'Use regular and irregular past verbs to tell a short story.',
    },
    teachingCards: [
      {
        title: { vi: 'Động từ có quy tắc: thêm -ed', en: 'Regular verbs: add -ed' },
        body: {
          vi: 'Hầu hết động từ thêm **-ed**: walk → walk**ed**, play → play**ed**.\nChú ý chính tả:\n- Tận cùng **-e**: chỉ thêm **-d** (like → liked).\n- Phụ âm + **y**: đổi thành **-ied** (study → stud**ied**).\n- 1 nguyên âm + 1 phụ âm: gấp đôi phụ âm (stop → sto**pp**ed).',
          en: 'Most verbs add **-ed**: walk → walk**ed**, play → play**ed**.\nSpelling notes:\n- Ending in **-e**: add only **-d** (like → liked).\n- Consonant + **y**: change to **-ied** (study → stud**ied**).\n- One vowel + one consonant: double it (stop → sto**pp**ed).',
        },
        examples: [
          { en: 'We stopped at a small café.', vi: 'Chúng tôi dừng lại ở một quán cà phê nhỏ.' },
          { en: 'She studied all night.', vi: 'Cô ấy học suốt đêm.' },
        ],
      },
      {
        title: { vi: 'Động từ bất quy tắc hay gặp', en: 'Common irregular verbs' },
        body: {
          vi: 'Phải học thuộc: **go → went, see → saw, eat → ate, buy → bought, take → took, have → had, come → came, find → found, lose → lost, make → made, hear → heard, teach → taught**.\nPhủ định và câu hỏi dùng **did + động từ nguyên mẫu**: I **didn\'t go**. **Did** you **see** it?',
          en: 'Learn these by heart: **go → went, see → saw, eat → ate, buy → bought, take → took, have → had, come → came, find → found, lose → lost, make → made, hear → heard, teach → taught**.\nNegatives and questions use **did + base verb**: I **didn\'t go**. **Did** you **see** it?',
        },
        examples: [
          { en: 'We went to the beach and ate seafood.', vi: 'Chúng tôi đi biển và ăn hải sản.' },
          { en: 'I didn\'t buy anything.', vi: 'Tôi không mua gì cả.' },
        ],
      },
      {
        title: { vi: 'Từ chỉ thời gian khi kể chuyện', en: 'Time words for stories' },
        body: {
          vi: 'Mở đầu: **Last weekend, Yesterday, Two years ago, One day...**\nNối các sự việc: **First, Then, After that, Later, Finally**.\nMột câu chuyện hay có: **khi nào – ở đâu – chuyện gì xảy ra – cảm xúc**.',
          en: 'Start with: **Last weekend, Yesterday, Two years ago, One day...**\nConnect events: **First, Then, After that, Later, Finally**.\nA good story says: **when – where – what happened – how you felt**.',
        },
        examples: [
          { en: 'Last Sunday, I took my dog to the park.', vi: 'Chủ nhật tuần trước, tôi dắt chó ra công viên.' },
          { en: 'After that, we had ice cream.', vi: 'Sau đó, chúng tôi ăn kem.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-02-ex01',
        type: 'fill-blank',
        sentence: 'Last Saturday we ___ to the zoo.',
        acceptedAnswers: ['went'],
        hint: '(go)',
        explanation: {
          vi: '"go" là động từ bất quy tắc: go → went.',
          en: '"go" is irregular: go → went.',
        },
      },
      {
        id: 'l2-write-02-ex02',
        type: 'multiple-choice',
        question: 'What is the past simple of "buy"?',
        options: ['buyed', 'brought', 'bought', 'buys'],
        correctIndex: 2,
        explanation: {
          vi: 'buy → bought. Cẩn thận: "brought" là quá khứ của "bring" (mang theo).',
          en: 'buy → bought. Careful: "brought" is the past of "bring".',
        },
      },
      {
        id: 'l2-write-02-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với dạng quá khứ của nó.', en: 'Match each verb with its past form.' },
        pairs: [
          { left: 'see', right: 'saw' },
          { left: 'eat', right: 'ate' },
          { left: 'take', right: 'took' },
          { left: 'find', right: 'found' },
          { left: 'lose', right: 'lost' },
        ],
        explanation: {
          vi: 'Đây là những động từ bất quy tắc rất hay dùng khi kể chuyện.',
          en: 'These irregular verbs are very common in stories.',
        },
      },
      {
        id: 'l2-write-02-ex04',
        type: 'fill-blank',
        sentence: 'She ___ her homework yesterday, so the teacher was angry.',
        acceptedAnswers: ["didn't finish", 'did not finish'],
        hint: '(not / finish)',
        explanation: {
          vi: 'Phủ định quá khứ đơn: didn\'t + động từ nguyên mẫu → didn\'t finish.',
          en: 'Past simple negative: didn\'t + base verb → didn\'t finish.',
        },
      },
      {
        id: 'l2-write-02-ex05',
        type: 'arrange-words',
        translationVi: 'Chúng tôi đã đi dã ngoại trong công viên.',
        correctSentence: 'We had a picnic in the park.',
        extraWords: ['haved'],
        explanation: {
          vi: 'have → had (bất quy tắc). Không có từ "haved".',
          en: 'have → had (irregular). "haved" is not a word.',
        },
      },
      {
        id: 'l2-write-02-ex06',
        type: 'multiple-choice',
        question: 'Which question is correct?',
        options: ['Did you saw the film?', 'Do you saw the film?', 'Did you seen the film?', 'Did you see the film?'],
        correctIndex: 3,
        explanation: {
          vi: 'Câu hỏi quá khứ: Did + chủ ngữ + động từ nguyên mẫu → Did you see...?',
          en: 'Past question: Did + subject + base verb → Did you see...?',
        },
      },
      {
        id: 'l2-write-02-ex07',
        type: 'fill-blank',
        sentence: 'He ___ his phone on the bus, so he was very sad.',
        acceptedAnswers: ['lost'],
        hint: '(lose)',
        explanation: {
          vi: 'lose → lost (bất quy tắc).',
          en: 'lose → lost (irregular).',
        },
      },
      {
        id: 'l2-write-02-ex08',
        type: 'true-false',
        statement: 'The past simple of "stop" is "stoped".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '1 nguyên âm + 1 phụ âm → gấp đôi phụ âm: stopped.',
          en: 'One vowel + one consonant → double it: stopped.',
        },
      },
      {
        id: 'l2-write-02-ex09',
        type: 'multiple-choice',
        question: 'First, we bought our tickets. ___, we went into the cinema.',
        options: ['Then', 'Because', 'But', 'So'],
        correctIndex: 0,
        explanation: {
          vi: '"Then" (sau đó) dùng để nối các sự việc theo thứ tự.',
          en: '"Then" connects events in order.',
        },
      },
      {
        id: 'l2-write-02-ex10',
        type: 'write-answer',
        prompt:
          'Write a short story about a day out you had last month. Where did you go? Who did you go with? What did you do? How did you feel?',
        tipsVi:
          'Bắt đầu bằng "Last month, ...". Dùng First / Then / After that để nối. Dùng ít nhất 4 động từ bất quy tắc (went, saw, ate, bought, took...). Kết thúc bằng cảm xúc: I felt...',
        minWords: 50,
        sampleAnswer:
          'Last month, I went to Vung Tau with my cousins. We took an early bus and arrived at nine o\'clock. First, we swam in the sea for two hours. Then we ate fresh seafood at a small restaurant near the beach. After that, we walked up the hill and saw the lighthouse. I bought some postcards for my friends. We came home late, but I felt very happy.',
        explanation: {
          vi: 'Kiểm tra: mọi động từ đều ở quá khứ; có từ nối thứ tự; có câu kết về cảm xúc.',
          en: 'Check: all verbs are in the past; sequence words are used; it ends with feelings.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-02-test01',
        type: 'fill-blank',
        sentence: 'I ___ a strange noise outside last night.',
        acceptedAnswers: ['heard'],
        hint: '(hear)',
        explanation: {
          vi: 'hear → heard (bất quy tắc).',
          en: 'hear → heard (irregular).',
        },
      },
      {
        id: 'l2-write-02-test02',
        type: 'multiple-choice',
        question: 'What is the past simple of "teach"?',
        options: ['taught', 'teached', 'thought', 'teaches'],
        correctIndex: 0,
        explanation: {
          vi: 'teach → taught. "thought" là quá khứ của "think".',
          en: 'teach → taught. "thought" is the past of "think".',
        },
      },
      {
        id: 'l2-write-02-test03',
        type: 'arrange-words',
        translationVi: 'Họ đã không đến bữa tiệc của tôi.',
        correctSentence: "They didn't come to my party.",
        extraWords: ['comed'],
        explanation: {
          vi: 'didn\'t + động từ nguyên mẫu (come). Không có từ "comed".',
          en: 'didn\'t + base verb (come). "comed" is not a word.',
        },
      },
      {
        id: 'l2-write-02-test04',
        type: 'fill-blank',
        sentence: 'My mum ___ a delicious cake for my birthday.',
        acceptedAnswers: ['made'],
        hint: '(make)',
        explanation: {
          vi: 'make → made (bất quy tắc).',
          en: 'make → made (irregular).',
        },
      },
      {
        id: 'l2-write-02-test05',
        type: 'multiple-choice',
        question: 'Find the mistake: "Yesterday I go to school by bike and arrived early."',
        options: ['Yesterday', 'go', 'by bike', 'arrived'],
        correctIndex: 1,
        explanation: {
          vi: '"Yesterday" → phải dùng quá khứ: went, không phải go.',
          en: '"Yesterday" → we need the past: went, not go.',
        },
      },
      {
        id: 'l2-write-02-test06',
        type: 'write-answer',
        prompt:
          'Write about the best day of your last holiday. Say when it was, where you were, what happened and how you felt.',
        tipsVi:
          'Viết toàn bộ ở quá khứ đơn. Kiểm tra lại các động từ bất quy tắc. Dùng First, Then, After that, Finally.',
        minWords: 50,
        sampleAnswer:
          'The best day of my last holiday was in July. My family stayed in a small hotel in Da Lat. In the morning, we visited a flower garden and took a lot of photos. Then we had hot soup for lunch because it was cold. In the afternoon, my father taught me to ride a horse. I fell off once, but I didn\'t cry. It was a fantastic day.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: So sánh hai thứ — so sánh hơn và so sánh nhất
  // ==========================================================================
  {
    id: 'l2-write-03',
    skill: 'writing',
    title: { vi: 'So sánh hai thứ', en: 'Comparing two things' },
    description: {
      vi: 'Viết câu so sánh hơn (bigger than) và so sánh nhất (the biggest) để so sánh nơi chốn, đồ vật, con người.',
      en: 'Write comparatives (bigger than) and superlatives (the biggest) to compare places, things and people.',
    },
    teachingCards: [
      {
        title: { vi: 'So sánh hơn: A ... hơn B', en: 'Comparatives: A is ...er than B' },
        body: {
          vi: 'Tính từ ngắn (1 âm tiết): thêm **-er + than**: tall → tall**er than**.\nTận cùng **-y**: happy → happ**ier**. Gấp đôi phụ âm: big → bi**gg**er, hot → ho**tt**er.\nTính từ dài (2-3 âm tiết trở lên): **more + adj + than**: **more expensive than**.\nBất quy tắc: **good → better, bad → worse, far → farther/further**.',
          en: 'Short adjectives (1 syllable): add **-er + than**: tall → tall**er than**.\nEnding in **-y**: happy → happ**ier**. Double the consonant: big → bi**gg**er, hot → ho**tt**er.\nLong adjectives: **more + adj + than**: **more expensive than**.\nIrregular: **good → better, bad → worse, far → farther/further**.',
        },
        examples: [
          { en: 'My brother is taller than me.', vi: 'Anh trai tôi cao hơn tôi.' },
          { en: 'A taxi is more expensive than a bus.', vi: 'Đi taxi đắt hơn đi xe buýt.' },
        ],
      },
      {
        title: { vi: 'So sánh nhất: ... nhất', en: 'Superlatives: the ...est' },
        body: {
          vi: 'Dùng khi so sánh **3 thứ trở lên**. Luôn có **the**.\nTính từ ngắn: **the + adj-est**: the tallest, the biggest, the happiest.\nTính từ dài: **the most + adj**: the most beautiful.\nBất quy tắc: **the best, the worst**.\nHay đi với: **in my class, in the world, of all**.',
          en: 'Use it to compare **three or more** things. Always use **the**.\nShort adjectives: **the + adj-est**: the tallest, the biggest, the happiest.\nLong adjectives: **the most + adj**: the most beautiful.\nIrregular: **the best, the worst**.\nOften with: **in my class, in the world, of all**.',
        },
        examples: [
          { en: 'August is the hottest month here.', vi: 'Tháng Tám là tháng nóng nhất ở đây.' },
          { en: 'This is the best pizza in town.', vi: 'Đây là chiếc pizza ngon nhất thị trấn.' },
        ],
      },
      {
        title: { vi: 'not as ... as: không ... bằng', en: 'not as ... as' },
        body: {
          vi: 'Cách khác để so sánh: **A is not as + adj + as B** = A không ... bằng B.\nTính từ giữ **nguyên dạng**: My bag is **not as heavy as** yours.',
          en: 'Another way to compare: **A is not as + adj + as B**.\nThe adjective stays in its **normal form**: My bag is **not as heavy as** yours.',
        },
        examples: [
          { en: 'The village is not as noisy as the city.', vi: 'Làng quê không ồn ào bằng thành phố.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-03-ex01',
        type: 'fill-blank',
        sentence: 'A bus is ___ than a bicycle.',
        acceptedAnswers: ['faster'],
        hint: '(fast)',
        explanation: {
          vi: 'Tính từ ngắn + -er + than → faster than.',
          en: 'Short adjective + -er + than → faster than.',
        },
      },
      {
        id: 'l2-write-03-ex02',
        type: 'multiple-choice',
        question: 'This exercise is ___ than the last one.',
        options: ['more easy', 'easyer', 'easier', 'most easy'],
        correctIndex: 2,
        explanation: {
          vi: '"easy" tận cùng phụ âm + y → đổi thành -ier: easier.',
          en: '"easy" ends in consonant + y → change to -ier: easier.',
        },
      },
      {
        id: 'l2-write-03-ex03',
        type: 'fill-blank',
        sentence: 'Ha Long Bay is one of ___ places in Vietnam.',
        acceptedAnswers: ['the most beautiful'],
        hint: '(beautiful)',
        explanation: {
          vi: 'Tính từ dài → so sánh nhất: the most beautiful.',
          en: 'Long adjective → superlative: the most beautiful.',
        },
      },
      {
        id: 'l2-write-03-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với dạng so sánh hơn.', en: 'Match each adjective with its comparative.' },
        pairs: [
          { left: 'good', right: 'better' },
          { left: 'bad', right: 'worse' },
          { left: 'big', right: 'bigger' },
          { left: 'happy', right: 'happier' },
          { left: 'expensive', right: 'more expensive' },
        ],
        explanation: {
          vi: 'good/bad là bất quy tắc; big gấp đôi g; happy đổi y → i; expensive dùng more.',
          en: 'good/bad are irregular; big doubles the g; happy changes y → i; expensive uses more.',
        },
      },
      {
        id: 'l2-write-03-ex05',
        type: 'arrange-words',
        translationVi: 'Mèo yên lặng hơn chó.',
        correctSentence: 'Cats are quieter than dogs.',
        extraWords: ['more'],
        explanation: {
          vi: '"quiet" là tính từ ngắn → quieter. Không dùng "more quieter".',
          en: '"quiet" is short → quieter. Never "more quieter".',
        },
      },
      {
        id: 'l2-write-03-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She is the taller girl in my class.',
          'She is tallest girl in my class.',
          'She is the most tall girl in my class.',
          'She is the tallest girl in my class.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'So sánh với cả lớp → so sánh nhất: the tallest (có "the").',
          en: 'Comparing with the whole class → superlative: the tallest (with "the").',
        },
      },
      {
        id: 'l2-write-03-ex07',
        type: 'true-false',
        statement: 'The comparative of "good" is "gooder".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"good" bất quy tắc: good → better → the best.',
          en: '"good" is irregular: good → better → the best.',
        },
      },
      {
        id: 'l2-write-03-ex08',
        type: 'fill-blank',
        sentence: 'My phone is not as ___ as yours.',
        acceptedAnswers: ['expensive'],
        hint: '(expensive)',
        explanation: {
          vi: 'Cấu trúc not as + tính từ nguyên dạng + as.',
          en: 'Structure: not as + normal adjective + as.',
        },
      },
      {
        id: 'l2-write-03-ex09',
        type: 'multiple-choice',
        question: 'Which sentence compares two drinks correctly?',
        options: [
          'Coffee is more strong than tea.',
          'Coffee is stronger than tea.',
          'Coffee is strongest than tea.',
          'Coffee is strong than tea.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"strong" là tính từ ngắn → stronger than.',
          en: '"strong" is short → stronger than.',
        },
      },
      {
        id: 'l2-write-03-ex10',
        type: 'write-answer',
        prompt:
          'Compare two places you know, for example your hometown and a big city. Write about size, weather, prices and people. Which one do you prefer and why?',
        tipsVi:
          'Dùng ít nhất 3 câu so sánh hơn (bigger than, more expensive than...) và 1 câu so sánh nhất. Kết thúc bằng: I prefer ... because ...',
        minWords: 50,
        sampleAnswer:
          'My hometown is a small town in Nghe An, and Hanoi is a big city. Hanoi is much bigger and busier than my town. Food and rent are more expensive there. However, my hometown is quieter and the air is cleaner. The people in my town are also friendlier. Hanoi has the best schools, but I prefer my hometown because life there is more relaxing.',
        explanation: {
          vi: 'Kiểm tra: có "than" sau so sánh hơn, có "the" trước so sánh nhất.',
          en: 'Check: "than" after comparatives, "the" before superlatives.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-03-test01',
        type: 'fill-blank',
        sentence: 'Today is ___ than yesterday.',
        acceptedAnswers: ['hotter'],
        hint: '(hot)',
        explanation: {
          vi: '1 nguyên âm + 1 phụ âm → gấp đôi: hot → hotter.',
          en: 'One vowel + one consonant → double it: hot → hotter.',
        },
      },
      {
        id: 'l2-write-03-test02',
        type: 'multiple-choice',
        question: 'Mount Everest is ___ mountain in the world.',
        options: ['the higher', 'highest', 'the highest', 'the most high'],
        correctIndex: 2,
        explanation: {
          vi: '"in the world" → so sánh nhất: the highest.',
          en: '"in the world" → superlative: the highest.',
        },
      },
      {
        id: 'l2-write-03-test03',
        type: 'arrange-words',
        translationVi: 'Đi tàu rẻ hơn đi máy bay.',
        correctSentence: 'Travelling by train is cheaper than flying.',
        extraWords: ['cheapest'],
        explanation: {
          vi: 'So sánh 2 thứ → cheaper than.',
          en: 'Comparing two things → cheaper than.',
        },
      },
      {
        id: 'l2-write-03-test04',
        type: 'fill-blank',
        sentence: 'For me, English is ___ than Maths.',
        acceptedAnswers: ['more difficult'],
        hint: '(difficult)',
        explanation: {
          vi: '"difficult" là tính từ dài → more difficult than.',
          en: '"difficult" is long → more difficult than.',
        },
      },
      {
        id: 'l2-write-03-test05',
        type: 'multiple-choice',
        question: 'What is the comparative of "bad"?',
        options: ['worst', 'badder', 'more bad', 'worse'],
        correctIndex: 3,
        explanation: {
          vi: 'bad → worse → the worst.',
          en: 'bad → worse → the worst.',
        },
      },
      {
        id: 'l2-write-03-test06',
        type: 'write-answer',
        prompt:
          'Compare two kinds of transport, for example a motorbike and a bus. Which is faster, cheaper and safer? Which is the best for you?',
        tipsVi: 'Dùng faster / cheaper / safer / more comfortable than... và 1 câu so sánh nhất: ... is the best for me.',
        minWords: 50,
        sampleAnswer:
          'In my city, many people use motorbikes and buses. A motorbike is faster than a bus because it can go through small streets. However, a bus is cheaper and safer. It is also more comfortable when it rains. A bus is not as flexible as a motorbike, because you must wait at the bus stop. For me, the bus is the best way to go to school.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Viết về kế hoạch tương lai với "be going to"
  // ==========================================================================
  {
    id: 'l2-write-04',
    skill: 'writing',
    title: { vi: 'Viết về kế hoạch tương lai', en: 'Writing about future plans' },
    description: {
      vi: 'Dùng "be going to" để viết về dự định và kế hoạch của bạn.',
      en: 'Use "be going to" to write about your plans and intentions.',
    },
    teachingCards: [
      {
        title: { vi: 'Be going to + động từ', en: 'Be going to + verb' },
        body: {
          vi: 'Dùng **be going to + V (nguyên mẫu)** để nói về **kế hoạch đã quyết định**.\nI **am** going to... — He/She/It **is** going to... — You/We/They **are** going to...\nPhủ định: I\'m **not** going to... Câu hỏi: **Are** you going to...?',
          en: 'Use **be going to + base verb** for **plans you have already decided**.\nI **am** going to... — He/She/It **is** going to... — You/We/They **are** going to...\nNegative: I\'m **not** going to... Question: **Are** you going to...?',
        },
        examples: [
          { en: 'I am going to learn Japanese next year.', vi: 'Năm sau tôi định học tiếng Nhật.' },
          { en: 'Are you going to watch the match tonight?', vi: 'Tối nay bạn có định xem trận đấu không?' },
        ],
      },
      {
        title: { vi: 'Dự đoán dựa vào dấu hiệu', en: 'Predictions from what we can see' },
        body: {
          vi: 'Be going to còn dùng để **dự đoán** khi có **dấu hiệu rõ ràng** ngay bây giờ.\nVD: Nhìn mây đen → **It\'s going to rain.**\nTừ chỉ tương lai: **tomorrow, tonight, next week, next year, this summer, soon, in the future**.',
          en: 'Be going to is also used for **predictions** when there is **clear evidence** now.\nE.g. You see dark clouds → **It\'s going to rain.**\nFuture time words: **tomorrow, tonight, next week, next year, this summer, soon, in the future**.',
        },
        examples: [
          { en: 'Be careful! You are going to fall.', vi: 'Cẩn thận! Bạn sắp ngã đấy.' },
          { en: 'We are going to move house soon.', vi: 'Chúng tôi sắp chuyển nhà.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-04-ex01',
        type: 'fill-blank',
        sentence: 'I ___ visit my grandparents next weekend.',
        acceptedAnswers: ['am going to', "'m going to"],
        hint: '(be going to)',
        explanation: {
          vi: 'Chủ ngữ "I" → am going to + V.',
          en: 'Subject "I" → am going to + verb.',
        },
      },
      {
        id: 'l2-write-04-ex02',
        type: 'multiple-choice',
        question: 'She ___ study medicine at university.',
        options: ['are going to', 'is going to', 'going to', 'is go to'],
        correctIndex: 1,
        explanation: {
          vi: '"She" → is going to + V.',
          en: '"She" → is going to + verb.',
        },
      },
      {
        id: 'l2-write-04-ex03',
        type: 'arrange-words',
        translationVi: 'Mùa hè này chúng tôi sẽ đi du lịch Đà Lạt.',
        correctSentence: 'We are going to travel to Da Lat this summer.',
        extraWords: ['travelling'],
        explanation: {
          vi: 'Sau "going to" là động từ nguyên mẫu: travel.',
          en: 'After "going to" we use the base verb: travel.',
        },
      },
      {
        id: 'l2-write-04-ex04',
        type: 'fill-blank',
        sentence: "They ___ buy a new car. They don't have enough money.",
        acceptedAnswers: ["aren't going to", 'are not going to', "'re not going to"],
        hint: '(not / be going to)',
        explanation: {
          vi: 'Phủ định: They aren\'t going to + V.',
          en: 'Negative: They aren\'t going to + verb.',
        },
      },
      {
        id: 'l2-write-04-ex05',
        type: 'multiple-choice',
        question: 'Look at those black clouds! It ___.',
        options: ['is going to rain', 'rains', 'rained', 'is rain'],
        correctIndex: 0,
        explanation: {
          vi: 'Có dấu hiệu (mây đen) → dự đoán bằng be going to.',
          en: 'There is evidence (black clouds) → prediction with be going to.',
        },
      },
      {
        id: 'l2-write-04-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi với câu trả lời phù hợp.', en: 'Match the questions with the answers.' },
        pairs: [
          { left: 'What are you going to do tonight?', right: "I'm going to watch a film." },
          { left: 'Where is she going to stay?', right: 'At a small hotel near the beach.' },
          { left: 'Are they going to come?', right: 'Yes, they are.' },
          { left: 'When is he going to start his new job?', right: 'Next Monday.' },
          { left: 'Who are you going to invite?', right: 'All my classmates.' },
        ],
        explanation: {
          vi: 'What → việc làm; Where → nơi chốn; When → thời gian; Who → người; Are...? → Yes/No.',
          en: 'What → an activity; Where → a place; When → a time; Who → people; Are...? → Yes/No.',
        },
      },
      {
        id: 'l2-write-04-ex07',
        type: 'true-false',
        statement: '"I going to study tonight." is a correct sentence.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Thiếu "am": I am going to study tonight.',
          en: '"am" is missing: I am going to study tonight.',
        },
      },
      {
        id: 'l2-write-04-ex08',
        type: 'fill-blank',
        sentence: '___ you going to play football after school?',
        acceptedAnswers: ['Are'],
        explanation: {
          vi: 'Câu hỏi với "you" → Are you going to...?',
          en: 'Question with "you" → Are you going to...?',
        },
      },
      {
        id: 'l2-write-04-ex09',
        type: 'multiple-choice',
        question: 'Which time expression talks about the future?',
        options: ['last year', 'yesterday', 'two days ago', 'next month'],
        correctIndex: 3,
        explanation: {
          vi: '"next month" (tháng sau) chỉ tương lai; các đáp án khác chỉ quá khứ.',
          en: '"next month" is the future; the others are the past.',
        },
      },
      {
        id: 'l2-write-04-ex10',
        type: 'write-answer',
        prompt:
          'Write about your plans for the next summer holiday. Where are you going to go? Who are you going to go with? What are you going to do there?',
        tipsVi:
          'Dùng ít nhất 4 câu với am/is/are going to + V. Thêm từ chỉ thời gian: this summer, in July, after that. Có thể thêm 1 câu "I\'m not going to...".',
        minWords: 50,
        sampleAnswer:
          'This summer, I am going to visit Phu Quoc Island with my family. We are going to fly there in July and stay for five days. My parents are going to rent a small house near the beach. Every morning, I am going to swim and play volleyball with my brother. I am not going to study during the trip. I think it is going to be a wonderful holiday.',
        explanation: {
          vi: 'Kiểm tra: am/is/are đúng với chủ ngữ, sau going to là động từ nguyên mẫu.',
          en: 'Check: am/is/are matches the subject, and a base verb follows going to.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-04-test01',
        type: 'fill-blank',
        sentence: 'My brother ___ learn to drive next year.',
        acceptedAnswers: ['is going to', "'s going to"],
        hint: '(be going to)',
        explanation: {
          vi: '"My brother" = he → is going to.',
          en: '"My brother" = he → is going to.',
        },
      },
      {
        id: 'l2-write-04-test02',
        type: 'multiple-choice',
        question: 'What ___ you going to do this weekend?',
        options: ['is', 'do', 'are', 'am'],
        correctIndex: 2,
        explanation: {
          vi: '"you" đi với "are": What are you going to do?',
          en: '"you" goes with "are": What are you going to do?',
        },
      },
      {
        id: 'l2-write-04-test03',
        type: 'arrange-words',
        translationVi: 'Tôi sẽ không ăn đồ ăn nhanh nữa.',
        correctSentence: "I'm not going to eat fast food again.",
        extraWords: ['eating'],
        explanation: {
          vi: 'Phủ định: I\'m not going to + V (eat).',
          en: 'Negative: I\'m not going to + base verb (eat).',
        },
      },
      {
        id: 'l2-write-04-test04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She is going to visits Paris.',
          'She going to visit Paris.',
          'She is going to visit Paris.',
          'She is go to visit Paris.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Đủ 3 phần: is + going to + động từ nguyên mẫu (visit).',
          en: 'All three parts: is + going to + base verb (visit).',
        },
      },
      {
        id: 'l2-write-04-test05',
        type: 'fill-blank',
        sentence: 'We ___ have a party on Friday. Can you come?',
        acceptedAnswers: ['are going to', "'re going to"],
        hint: '(be going to)',
        explanation: {
          vi: '"We" → are going to.',
          en: '"We" → are going to.',
        },
      },
      {
        id: 'l2-write-04-test06',
        type: 'write-answer',
        prompt: 'Write about your plans for the next five years. Think about study, work, hobbies and travel.',
        tipsVi:
          'Mỗi ý 1-2 câu với be going to. Dùng next year, in two years, in the future. Có thể nói lý do với because.',
        minWords: 50,
        sampleAnswer:
          'I have some big plans for the next five years. Next year, I am going to finish high school. Then I am going to study computer science at university in Ho Chi Minh City. I am also going to practise English every day because I want to work for an international company. In the future, my best friend and I are going to travel around Thailand.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: Đưa lời khuyên với should / shouldn't và nói quy định với must / mustn't
  // ==========================================================================
  {
    id: 'l2-write-05',
    skill: 'writing',
    title: { vi: 'Đưa lời khuyên: should và must', en: 'Giving advice: should and must' },
    description: {
      vi: 'Viết lời khuyên với should / shouldn\'t và nói về quy định với must / mustn\'t.',
      en: 'Write advice with should / shouldn\'t and talk about rules with must / mustn\'t.',
    },
    teachingCards: [
      {
        title: { vi: 'Should / shouldn\'t: lời khuyên', en: 'Should / shouldn\'t: advice' },
        body: {
          vi: '**should + V nguyên mẫu** = nên làm. **shouldn\'t + V** = không nên làm.\nKhông thêm -s, không thêm "to": She **should go** (KHÔNG viết "shoulds go" hay "should to go").\nCách mở đầu mềm mại: **I think you should... / Maybe you should... / Why don\'t you...?**',
          en: '**should + base verb** = it is a good idea. **shouldn\'t + verb** = it is not a good idea.\nNo -s and no "to": She **should go** (NOT "shoulds go" or "should to go").\nSoft openings: **I think you should... / Maybe you should... / Why don\'t you...?**',
        },
        examples: [
          { en: 'You should go to bed earlier.', vi: 'Bạn nên đi ngủ sớm hơn.' },
          { en: 'I think you shouldn\'t skip breakfast.', vi: 'Mình nghĩ bạn không nên bỏ bữa sáng.' },
        ],
      },
      {
        title: { vi: 'Must / mustn\'t: quy định, bắt buộc', en: 'Must / mustn\'t: rules and strong necessity' },
        body: {
          vi: '**must + V** = bắt buộc phải (quy định, luật lệ, rất cần thiết).\n**mustn\'t + V** = **không được phép** làm.\nChú ý: mustn\'t KHÔNG có nghĩa là "không cần". "Không cần" là **don\'t have to**.',
          en: '**must + verb** = it is necessary (rules, laws, very important things).\n**mustn\'t + verb** = it is **not allowed**.\nNote: mustn\'t does NOT mean "not necessary". "Not necessary" is **don\'t have to**.',
        },
        examples: [
          { en: 'You must wear a helmet on a motorbike.', vi: 'Bạn phải đội mũ bảo hiểm khi đi xe máy.' },
          { en: 'You mustn\'t smoke in the hospital.', vi: 'Bạn không được hút thuốc trong bệnh viện.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-05-ex01',
        type: 'fill-blank',
        sentence: 'You look tired. You ___ go to bed early tonight.',
        acceptedAnswers: ['should'],
        explanation: {
          vi: 'Đưa lời khuyên → should.',
          en: 'Giving advice → should.',
        },
      },
      {
        id: 'l2-write-05-ex02',
        type: 'multiple-choice',
        question: "You ___ use your phone in the exam room. It's against the rules.",
        options: ['must', "mustn't", 'should', 'can'],
        correctIndex: 1,
        explanation: {
          vi: 'Quy định cấm → mustn\'t (không được phép).',
          en: 'A rule that forbids something → mustn\'t.',
        },
      },
      {
        id: 'l2-write-05-ex03',
        type: 'arrange-words',
        translationVi: 'Bạn nên uống nhiều nước hơn.',
        correctSentence: 'You should drink more water.',
        extraWords: ['to'],
        explanation: {
          vi: 'should + động từ nguyên mẫu, không có "to".',
          en: 'should + base verb, no "to".',
        },
      },
      {
        id: 'l2-write-05-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She shoulds see a doctor.',
          'She should to see a doctor.',
          'She should sees a doctor.',
          'She should see a doctor.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'should không thêm -s, không có "to", động từ sau ở dạng nguyên mẫu.',
          en: 'should has no -s, no "to", and the next verb is in base form.',
        },
      },
      {
        id: 'l2-write-05-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối vấn đề với lời khuyên phù hợp.', en: 'Match each problem with the best advice.' },
        pairs: [
          { left: 'I have a toothache.', right: 'You should see a dentist.' },
          { left: "I can't sleep at night.", right: "You shouldn't drink coffee in the evening." },
          { left: 'I want to improve my English.', right: 'You should read English stories every day.' },
          { left: "I'm always late for school.", right: 'You should get up earlier.' },
          { left: 'I feel cold.', right: 'You should wear a jacket.' },
        ],
        explanation: {
          vi: 'Mỗi lời khuyên giải quyết đúng vấn đề tương ứng.',
          en: 'Each piece of advice solves the matching problem.',
        },
      },
      {
        id: 'l2-write-05-ex06',
        type: 'fill-blank',
        sentence: "Students ___ wear a uniform at my school. It's a rule.",
        acceptedAnswers: ['must', 'have to'],
        explanation: {
          vi: 'Quy định bắt buộc → must (hoặc have to).',
          en: 'A rule → must (or have to).',
        },
      },
      {
        id: 'l2-write-05-ex07',
        type: 'true-false',
        statement: '"Mustn\'t" means "it is not necessary".',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'mustn\'t = không được phép. "Không cần thiết" là don\'t have to.',
          en: 'mustn\'t = not allowed. "Not necessary" is don\'t have to.',
        },
      },
      {
        id: 'l2-write-05-ex08',
        type: 'fill-blank',
        sentence: 'You ___ eat so many sweets. They are bad for your teeth.',
        acceptedAnswers: ["shouldn't", 'should not'],
        explanation: {
          vi: 'Lời khuyên không nên làm → shouldn\'t.',
          en: 'Advice not to do something → shouldn\'t.',
        },
      },
      {
        id: 'l2-write-05-ex09',
        type: 'multiple-choice',
        question: 'Your friend says: "I\'m bored." Which reply gives advice?',
        options: ["Why don't you go for a walk?", "I'm bored too.", 'You were bored yesterday.', 'Are you bored?'],
        correctIndex: 0,
        explanation: {
          vi: '"Why don\'t you...?" là một cách đưa lời khuyên thân thiện.',
          en: '"Why don\'t you...?" is a friendly way to give advice.',
        },
      },
      {
        id: 'l2-write-05-ex10',
        type: 'write-answer',
        prompt:
          'Your friend wants to be healthier. Write a short message to him or her with 4–5 pieces of advice. Use should, shouldn\'t and must.',
        tipsVi:
          'Mở đầu: Hi + tên. Viết 4-5 lời khuyên: You should..., You shouldn\'t..., You must... Có thể nói lý do với because. Kết thúc: Good luck!',
        minWords: 40,
        sampleAnswer:
          'Hi Nam, I know you want to be healthier, so here is my advice. You should eat more fruit and vegetables. You shouldn\'t drink so much bubble tea because it has a lot of sugar. You should also walk or cycle to school. Most importantly, you must sleep at least eight hours every night. Good luck!',
        explanation: {
          vi: 'Kiểm tra: should/shouldn\'t/must + động từ nguyên mẫu, không có "to".',
          en: 'Check: should/shouldn\'t/must + base verb, without "to".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-05-test01',
        type: 'fill-blank',
        sentence: 'Drivers ___ stop at a red light. It is the law.',
        acceptedAnswers: ['must', 'have to'],
        explanation: {
          vi: 'Luật giao thông → must.',
          en: 'A traffic law → must.',
        },
      },
      {
        id: 'l2-write-05-test02',
        type: 'multiple-choice',
        question: "It's raining. You ___ take an umbrella.",
        options: ["shouldn't", "mustn't", 'should', "don't"],
        correctIndex: 2,
        explanation: {
          vi: 'Trời mưa → lời khuyên nên mang ô: should.',
          en: 'It\'s raining → advice to take an umbrella: should.',
        },
      },
      {
        id: 'l2-write-05-test03',
        type: 'arrange-words',
        translationVi: 'Bạn không được chạy gần hồ bơi.',
        correctSentence: "You mustn't run near the pool.",
        extraWords: ['running'],
        explanation: {
          vi: 'mustn\'t + động từ nguyên mẫu (run).',
          en: 'mustn\'t + base verb (run).',
        },
      },
      {
        id: 'l2-write-05-test04',
        type: 'multiple-choice',
        question: 'What does "You shouldn\'t stay up late." mean?',
        options: [
          'It is a good idea to stay up late.',
          'It is not a good idea to stay up late.',
          'You are not able to stay up late.',
          'You stayed up late last night.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'shouldn\'t = không nên (không phải ý hay).',
          en: 'shouldn\'t = it is not a good idea.',
        },
      },
      {
        id: 'l2-write-05-test05',
        type: 'fill-blank',
        sentence: 'He has a bad cold. He ___ stay at home and rest.',
        acceptedAnswers: ['should'],
        explanation: {
          vi: 'Lời khuyên cho người bị cảm → should.',
          en: 'Advice for someone with a cold → should.',
        },
      },
      {
        id: 'l2-write-05-test06',
        type: 'write-answer',
        prompt:
          'A new student is joining your class next week. Write some advice for him or her. What should and shouldn\'t they do? What rules must they follow?',
        tipsVi:
          'Viết 2-3 lời khuyên với should/shouldn\'t và 2 quy định với must/mustn\'t. Có thể dùng because để giải thích.',
        minWords: 50,
        sampleAnswer:
          'Welcome to our class! Here is some advice for you. You should arrive before seven o\'clock because the gate closes early. You should sit near the front, so you can hear the teacher. You shouldn\'t be shy. Everyone is friendly. There are also some rules. You must wear the school uniform every day, and you mustn\'t use your phone in class.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 6: Viết email / thư thân mật — mời và cảm ơn
  // ==========================================================================
  {
    id: 'l2-write-06',
    skill: 'writing',
    title: { vi: 'Viết email thân mật: mời và cảm ơn', en: 'Writing an informal email: inviting and thanking' },
    description: {
      vi: 'Viết một email ngắn cho bạn bè để mời đi chơi hoặc cảm ơn, đúng bố cục và giọng văn thân mật.',
      en: 'Write a short email to a friend to invite or thank them, with the right layout and friendly tone.',
    },
    teachingCards: [
      {
        title: { vi: 'Bố cục một email thân mật', en: 'The layout of an informal email' },
        body: {
          vi: '1. **Lời chào**: Hi Lan, / Dear Lan, (có dấu phẩy)\n2. **Câu mở đầu**: How are you? / Thanks for your email.\n3. **Nội dung chính**: lý do viết (mời, cảm ơn, kể chuyện...).\n4. **Câu kết**: See you soon! / Write back soon!\n5. **Ký tên**: Love, / Best wishes, / Take care, + tên bạn.\nEmail thân mật được dùng **dạng rút gọn**: I\'m, can\'t, don\'t.',
          en: '1. **Greeting**: Hi Lan, / Dear Lan, (with a comma)\n2. **Opening line**: How are you? / Thanks for your email.\n3. **Main part**: why you are writing (inviting, thanking, news...).\n4. **Closing line**: See you soon! / Write back soon!\n5. **Sign-off**: Love, / Best wishes, / Take care, + your name.\nInformal emails can use **contractions**: I\'m, can\'t, don\'t.',
        },
        examples: [
          { en: 'Hi Tom, How are you? I hope you\'re well.', vi: 'Chào Tom, Bạn khỏe không? Mình mong bạn vẫn khỏe.' },
          { en: 'Write back soon! Best wishes, Mai', vi: 'Nhớ trả lời sớm nhé! Thân, Mai' },
        ],
      },
      {
        title: { vi: 'Mời và trả lời lời mời', en: 'Inviting and replying' },
        body: {
          vi: '**Mời**: Would you like **to** come...? / Do you want **to** join us...? / Can you come to...?\nNhớ nói rõ **khi nào, ở đâu, làm gì**.\n**Nhận lời**: I\'d love to! / That sounds great!\n**Từ chối lịch sự**: Sorry, I can\'t because... / I\'m afraid I\'m busy that day.',
          en: '**Inviting**: Would you like **to** come...? / Do you want **to** join us...? / Can you come to...?\nAlways say **when, where and what**.\n**Accepting**: I\'d love to! / That sounds great!\n**Refusing politely**: Sorry, I can\'t because... / I\'m afraid I\'m busy that day.',
        },
        examples: [
          { en: 'Would you like to come to my house for dinner on Saturday?', vi: 'Bạn có muốn đến nhà mình ăn tối thứ Bảy này không?' },
          { en: 'Sorry, I can\'t come because I have a piano lesson.', vi: 'Xin lỗi, mình không đến được vì có buổi học piano.' },
        ],
      },
      {
        title: { vi: 'Cảm ơn', en: 'Thanking' },
        body: {
          vi: '**Thank you (so much) for + danh từ / V-ing**: Thank you for the present. / Thanks for **helping** me.\nThêm 1-2 câu nói vì sao bạn vui: I really love it. / It was really kind of you.',
          en: '**Thank you (so much) for + noun / V-ing**: Thank you for the present. / Thanks for **helping** me.\nAdd one or two sentences about why you are happy: I really love it. / It was really kind of you.',
        },
        examples: [
          { en: 'Thanks so much for the book. I read it in two days!', vi: 'Cảm ơn bạn nhiều vì cuốn sách. Mình đọc hết trong hai ngày!' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-06-ex01',
        type: 'multiple-choice',
        question: 'What is the best greeting for an email to your friend Linh?',
        options: ['Dear Sir or Madam,', 'To whom it may concern,', 'Hi Linh,', 'Hello Mr Linh,'],
        correctIndex: 2,
        explanation: {
          vi: 'Viết cho bạn bè → chào thân mật: Hi + tên,',
          en: 'Writing to a friend → friendly greeting: Hi + name,',
        },
      },
      {
        id: 'l2-write-06-ex02',
        type: 'fill-blank',
        sentence: 'Would you like ___ come to my birthday party on Saturday?',
        acceptedAnswers: ['to'],
        explanation: {
          vi: 'Would you like + to + V.',
          en: 'Would you like + to + verb.',
        },
      },
      {
        id: 'l2-write-06-ex03',
        type: 'arrange-words',
        translationVi: 'Cảm ơn bạn rất nhiều vì món quà dễ thương.',
        correctSentence: 'Thank you so much for the lovely present.',
        extraWords: ['to'],
        explanation: {
          vi: 'Thank you for + danh từ (the lovely present).',
          en: 'Thank you for + noun (the lovely present).',
        },
      },
      {
        id: 'l2-write-06-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối mục đích với câu phù hợp.', en: 'Match each purpose with a phrase.' },
        pairs: [
          { left: 'Inviting', right: 'Would you like to come?' },
          { left: 'Accepting', right: "I'd love to!" },
          { left: 'Refusing politely', right: "Sorry, I can't make it." },
          { left: 'Thanking', right: 'It was really kind of you.' },
          { left: 'Ending', right: 'Write back soon!' },
        ],
        explanation: {
          vi: 'Đây là các câu thường dùng trong email thân mật.',
          en: 'These are common phrases in informal emails.',
        },
      },
      {
        id: 'l2-write-06-ex05',
        type: 'multiple-choice',
        question: 'Which sign-off is best for an email to a close friend?',
        options: ['Yours faithfully,', 'Best wishes,', 'Regards, the Manager', 'Sincerely yours, Sir'],
        correctIndex: 1,
        explanation: {
          vi: '"Best wishes," thân thiện; các cách còn lại quá trang trọng.',
          en: '"Best wishes," is friendly; the others are too formal.',
        },
      },
      {
        id: 'l2-write-06-ex06',
        type: 'fill-blank',
        sentence: 'Thanks ___ inviting me to your party!',
        acceptedAnswers: ['for'],
        explanation: {
          vi: 'Thanks for + V-ing.',
          en: 'Thanks for + V-ing.',
        },
      },
      {
        id: 'l2-write-06-ex07',
        type: 'true-false',
        statement: 'In an informal email to a friend, you can use contractions like "I\'m" and "can\'t".',
        answer: 'TRUE',
        allowNotGiven: true,
        explanation: {
          vi: 'Email thân mật dùng dạng rút gọn rất tự nhiên.',
          en: 'Contractions are natural in informal emails.',
        },
      },
      {
        id: 'l2-write-06-ex08',
        type: 'multiple-choice',
        question: 'Which is the best FIRST line after "Hi Tom,"?',
        options: ['See you soon!', 'Love, Mai', 'Can you bring some drinks?', "How are you? I hope you're well."],
        correctIndex: 3,
        explanation: {
          vi: 'Sau lời chào là câu hỏi thăm; "See you soon" và "Love" dùng ở cuối thư.',
          en: 'After the greeting comes a friendly opening; "See you soon" and "Love" go at the end.',
        },
      },
      {
        id: 'l2-write-06-ex09',
        type: 'fill-blank',
        sentence: "I'm sorry, but I can't come ___ I have an exam on Monday.",
        acceptedAnswers: ['because', 'as'],
        explanation: {
          vi: 'Nêu lý do từ chối → because.',
          en: 'Giving a reason for refusing → because.',
        },
      },
      {
        id: 'l2-write-06-ex10',
        type: 'write-answer',
        prompt:
          'Write an email to a friend. Invite him or her to a picnic or a birthday party. Say when and where it is, what you are going to do, and what to bring.',
        tipsVi:
          'Đủ 5 phần: lời chào – câu mở đầu – lời mời (khi nào, ở đâu, làm gì) – câu kết – ký tên. Dùng Would you like to...? và be going to.',
        minWords: 50,
        sampleAnswer:
          'Hi Hoa,\nHow are you? I hope your exams went well. I\'m having a small picnic at Thong Nhat Park next Sunday, and I\'d love you to come. We\'re going to meet at the main gate at nine o\'clock. We\'re going to play games and have lunch by the lake. Could you bring some fruit? Please let me know soon.\nLove,\nMai',
        explanation: {
          vi: 'Kiểm tra: có đủ khi nào, ở đâu, làm gì, mang gì và phần chào/kết thân mật.',
          en: 'Check: when, where, what, what to bring, and a friendly greeting and ending.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-06-test01',
        type: 'multiple-choice',
        question: 'Which sentence is an invitation?',
        options: [
          'Do you want to come to the cinema with me on Friday?',
          'I went to the cinema on Friday.',
          'The cinema is near my house.',
          'I like going to the cinema.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Do you want to come...?" là câu mời; các câu khác chỉ là thông tin.',
          en: '"Do you want to come...?" is an invitation; the others just give information.',
        },
      },
      {
        id: 'l2-write-06-test02',
        type: 'fill-blank',
        sentence: 'Thank you for ___ me with my homework.',
        acceptedAnswers: ['helping'],
        hint: '(help)',
        explanation: {
          vi: 'Sau giới từ "for" dùng V-ing: helping.',
          en: 'After the preposition "for" we use V-ing: helping.',
        },
      },
      {
        id: 'l2-write-06-test03',
        type: 'arrange-words',
        translationVi: 'Mình mong sớm được gặp bạn.',
        correctSentence: 'I hope to see you soon.',
        extraWords: ['seeing'],
        explanation: {
          vi: 'hope + to + V nguyên mẫu: hope to see.',
          en: 'hope + to + base verb: hope to see.',
        },
      },
      {
        id: 'l2-write-06-test04',
        type: 'multiple-choice',
        question: 'Your friend invites you to a party, but you are busy. What do you write?',
        options: [
          "I'd love to come!",
          "Sorry, I can't come because I'm visiting my grandma.",
          'Yes, of course I will come.',
          'Thanks for the present.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Từ chối lịch sự: Sorry, I can\'t... + lý do.',
          en: 'A polite refusal: Sorry, I can\'t... + a reason.',
        },
      },
      {
        id: 'l2-write-06-test05',
        type: 'true-false',
        statement: '"Yours faithfully" is a good way to end an email to your best friend.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"Yours faithfully" rất trang trọng. Với bạn thân dùng Love, / Best wishes, / Take care,',
          en: '"Yours faithfully" is very formal. For a best friend use Love, / Best wishes, / Take care,',
        },
      },
      {
        id: 'l2-write-06-test06',
        type: 'write-answer',
        prompt:
          'Your uncle gave you a birthday present. Write a short email to thank him. Say what the present was, why you like it and how you are going to use it.',
        tipsVi:
          'Bắt đầu: Dear Uncle + tên, hoặc Hi Uncle..., Dùng Thank you so much for... Nói vì sao thích và bạn sẽ dùng nó thế nào (be going to). Kết: Love, + tên.',
        minWords: 50,
        sampleAnswer:
          'Dear Uncle Minh,\nThank you so much for the birthday present. I love the football boots! They are the best boots I have, and they fit me perfectly. My old boots were too small, so your present came at the right time. I\'m going to wear them in my school match next Saturday. It was really kind of you.\nLove,\nKhoa',
      },
    ],
  },

  // ==========================================================================
  // BÀI 7: Tả một nơi chốn trong quá khứ với there was / there were + tính từ
  // ==========================================================================
  {
    id: 'l2-write-07',
    skill: 'writing',
    title: { vi: 'Tả nơi chốn với there was / there were', en: 'Describing a place with there was / there were' },
    description: {
      vi: 'Tả một nơi bạn từng đến hoặc từng sống, dùng there was / there were và tính từ miêu tả.',
      en: 'Describe a place you visited or lived in, using there was / there were and adjectives.',
    },
    teachingCards: [
      {
        title: { vi: 'There was / There were', en: 'There was / There were' },
        body: {
          vi: 'Dùng để nói **có cái gì** ở một nơi **trong quá khứ**.\n**There was** + danh từ số ít hoặc không đếm được: There was a park. There was some water.\n**There were** + danh từ số nhiều: There were two cinemas.\nPhủ định: There **wasn\'t** a.../ There **weren\'t any**...\nCâu hỏi: **Was there** a...? **Were there any**...?',
          en: 'Use it to say **what existed** in a place **in the past**.\n**There was** + singular or uncountable noun: There was a park. There was some water.\n**There were** + plural noun: There were two cinemas.\nNegative: There **wasn\'t** a... / There **weren\'t any**...\nQuestion: **Was there** a...? **Were there any**...?',
        },
        examples: [
          { en: 'There was a small river behind my school.', vi: 'Có một con sông nhỏ phía sau trường tôi.' },
          { en: 'There weren\'t any buses in my village.', vi: 'Làng tôi không có chiếc xe buýt nào.' },
        ],
      },
      {
        title: { vi: 'Tính từ miêu tả nơi chốn', en: 'Adjectives for places' },
        body: {
          vi: 'Tính từ đứng **trước danh từ** (a **busy** street) hoặc **sau động từ be** (The street was **busy**).\nTừ hay dùng: **crowded, quiet, noisy, peaceful, modern, old, clean, dirty, narrow, wide, beautiful, cheap, expensive**.\nThêm **very / really / quite** để rõ mức độ: It was **really** peaceful.',
          en: 'Adjectives go **before a noun** (a **busy** street) or **after be** (The street was **busy**).\nUseful words: **crowded, quiet, noisy, peaceful, modern, old, clean, dirty, narrow, wide, beautiful, cheap, expensive**.\nAdd **very / really / quite** for degree: It was **really** peaceful.',
        },
        examples: [
          { en: 'There were many narrow streets in the old town.', vi: 'Phố cổ có nhiều con đường hẹp.' },
          { en: 'The beach was clean and quiet.', vi: 'Bãi biển sạch và yên tĩnh.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-07-ex01',
        type: 'fill-blank',
        sentence: 'There ___ a small market near my old house.',
        acceptedAnswers: ['was'],
        explanation: {
          vi: '"a small market" số ít → There was.',
          en: '"a small market" is singular → There was.',
        },
      },
      {
        id: 'l2-write-07-ex02',
        type: 'fill-blank',
        sentence: 'There ___ many tourists at the beach yesterday.',
        acceptedAnswers: ['were'],
        explanation: {
          vi: '"many tourists" số nhiều → There were.',
          en: '"many tourists" is plural → There were.',
        },
      },
      {
        id: 'l2-write-07-ex03',
        type: 'multiple-choice',
        question: 'There ___ any milk in the fridge this morning, so I had tea.',
        options: ["weren't", "aren't", "wasn't", "isn't"],
        correctIndex: 2,
        explanation: {
          vi: '"milk" không đếm được và "this morning" là quá khứ → There wasn\'t.',
          en: '"milk" is uncountable and "this morning" is past → There wasn\'t.',
        },
      },
      {
        id: 'l2-write-07-ex04',
        type: 'arrange-words',
        translationVi: 'Có hai cái cây cao trong vườn.',
        correctSentence: 'There were two tall trees in the garden.',
        extraWords: ['was'],
        explanation: {
          vi: '"two tall trees" số nhiều → There were. Tính từ "tall" đứng trước danh từ.',
          en: '"two tall trees" is plural → There were. The adjective "tall" goes before the noun.',
        },
      },
      {
        id: 'l2-write-07-ex05',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'There was a lot of people at the concert.',
          'There were a lot of people at the concert.',
          'There were a lot of water on the floor.',
          'There was many shops in the street.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"people" là danh từ số nhiều → There were.',
          en: '"people" is plural → There were.',
        },
      },
      {
        id: 'l2-write-07-ex06',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với từ trái nghĩa.', en: 'Match each adjective with its opposite.' },
        pairs: [
          { left: 'crowded', right: 'empty' },
          { left: 'noisy', right: 'quiet' },
          { left: 'modern', right: 'old-fashioned' },
          { left: 'clean', right: 'dirty' },
          { left: 'cheap', right: 'expensive' },
        ],
        explanation: {
          vi: 'Học tính từ theo cặp trái nghĩa giúp bạn tả nơi chốn đa dạng hơn.',
          en: 'Learning adjectives in opposite pairs helps you describe places better.',
        },
      },
      {
        id: 'l2-write-07-ex07',
        type: 'true-false',
        statement: 'We use "there were" with plural nouns, for example "there were three cafés".',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng: danh từ số nhiều → there were.',
          en: 'Correct: plural nouns → there were.',
        },
      },
      {
        id: 'l2-write-07-ex08',
        type: 'fill-blank',
        sentence: '___ there a swimming pool at the hotel?',
        acceptedAnswers: ['Was'],
        explanation: {
          vi: 'Câu hỏi với danh từ số ít: Was there a...?',
          en: 'Question with a singular noun: Was there a...?',
        },
      },
      {
        id: 'l2-write-07-ex09',
        type: 'multiple-choice',
        question: 'Which sentence puts the adjective in the right place?',
        options: ['It was a house big.', 'It was big a house.', 'It was a big house.', 'A house big it was.'],
        correctIndex: 2,
        explanation: {
          vi: 'Tính từ đứng trước danh từ: a big house.',
          en: 'The adjective goes before the noun: a big house.',
        },
      },
      {
        id: 'l2-write-07-ex10',
        type: 'write-answer',
        prompt:
          'Describe a place you visited in the past, for example a hotel, a town or a park. What was there? What was it like? Did you like it?',
        tipsVi:
          'Dùng ít nhất 3 câu với there was / there were và ít nhất 4 tính từ (crowded, peaceful, beautiful...). Kết thúc bằng cảm nghĩ của bạn.',
        minWords: 50,
        sampleAnswer:
          'Last year, I visited Hoi An with my class. It was a beautiful old town. There were many narrow streets with yellow houses. There was a small river in the middle of the town, and there were lots of colourful lanterns. In the evening, the streets were very crowded, but the atmosphere was peaceful. I really liked it.',
        explanation: {
          vi: 'Kiểm tra: was đi với số ít, were đi với số nhiều; tính từ đặt đúng chỗ.',
          en: 'Check: was with singular, were with plural; adjectives in the right place.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-07-test01',
        type: 'fill-blank',
        sentence: 'There ___ no students in the classroom at seven in the evening.',
        acceptedAnswers: ['were'],
        explanation: {
          vi: '"students" số nhiều → There were no students.',
          en: '"students" is plural → There were no students.',
        },
      },
      {
        id: 'l2-write-07-test02',
        type: 'multiple-choice',
        question: 'There ___ a beautiful lake in the middle of the park.',
        options: ['were', 'was', 'are', 'be'],
        correctIndex: 1,
        explanation: {
          vi: '"a beautiful lake" số ít → There was.',
          en: '"a beautiful lake" is singular → There was.',
        },
      },
      {
        id: 'l2-write-07-test03',
        type: 'arrange-words',
        translationVi: 'Những con phố hẹp và đông đúc.',
        correctSentence: 'The streets were narrow and busy.',
        extraWords: ['was'],
        explanation: {
          vi: '"The streets" số nhiều → were. Tính từ đứng sau động từ be.',
          en: '"The streets" is plural → were. The adjectives come after be.',
        },
      },
      {
        id: 'l2-write-07-test04',
        type: 'fill-blank',
        sentence: 'There ___ any shops in the village, so we bought food in town.',
        acceptedAnswers: ["weren't", 'were not'],
        hint: '(not)',
        explanation: {
          vi: '"any shops" số nhiều, phủ định → There weren\'t any shops.',
          en: '"any shops" is plural and negative → There weren\'t any shops.',
        },
      },
      {
        id: 'l2-write-07-test05',
        type: 'multiple-choice',
        question: 'The old market was very ___. There were hundreds of people.',
        options: ['empty', 'quiet', 'crowded', 'lonely'],
        correctIndex: 2,
        explanation: {
          vi: 'Hàng trăm người → đông đúc: crowded.',
          en: 'Hundreds of people → crowded.',
        },
      },
      {
        id: 'l2-write-07-test06',
        type: 'write-answer',
        prompt:
          'Describe your primary school as it was when you were a child. What was there? What was it like? How did you feel there?',
        tipsVi:
          'Dùng there was / there were + tính từ. Nói về lớp học, sân trường, cây cối, thầy cô. Kết thúc bằng cảm xúc: I felt... / I loved...',
        minWords: 50,
        sampleAnswer:
          'My primary school was small but lovely. There were only six classrooms, and they were quite old. There was a big playground in front of the school, and there were two tall trees in the corner. We played there every break time. There wasn\'t a library, but our teachers were very kind. I felt happy and safe there.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 8: Cấu trúc đoạn văn — câu chủ đề, câu hỗ trợ, câu kết
  // ==========================================================================
  {
    id: 'l2-write-08',
    skill: 'writing',
    title: { vi: 'Cấu trúc một đoạn văn', en: 'Paragraph structure' },
    description: {
      vi: 'Viết đoạn văn có câu chủ đề, các câu hỗ trợ và câu kết — nền tảng cho IELTS Writing.',
      en: 'Write a paragraph with a topic sentence, supporting sentences and a concluding sentence — the base of IELTS Writing.',
    },
    teachingCards: [
      {
        title: { vi: 'Ba phần của một đoạn văn', en: 'The three parts of a paragraph' },
        body: {
          vi: '1. **Câu chủ đề (topic sentence)**: câu đầu tiên, nêu **ý chính** của cả đoạn.\n2. **Câu hỗ trợ (supporting sentences)**: 2-4 câu đưa ra **lý do, ví dụ, chi tiết** cho ý chính.\n3. **Câu kết (concluding sentence)**: nhắc lại ý chính **bằng cách nói khác**.\nMỗi đoạn chỉ nói về **MỘT ý chính**. Câu nào không liên quan thì bỏ đi.',
          en: '1. **Topic sentence**: the first sentence; it gives the **main idea** of the paragraph.\n2. **Supporting sentences**: 2–4 sentences with **reasons, examples and details**.\n3. **Concluding sentence**: repeats the main idea **in different words**.\nEach paragraph has **ONE main idea**. Remove any sentence that is not about it.',
        },
        examples: [
          { en: 'Topic: Football is my favourite sport.', vi: 'Câu chủ đề: Bóng đá là môn thể thao yêu thích của tôi.' },
          { en: 'Support: It is exciting, and I can play it with my friends.', vi: 'Hỗ trợ: Nó hấp dẫn, và tôi có thể chơi cùng bạn bè.' },
          { en: 'Conclusion: That is why I play football every weekend.', vi: 'Câu kết: Đó là lý do tôi chơi bóng đá mỗi cuối tuần.' },
        ],
      },
      {
        title: { vi: 'Cách mở đầu câu kết', en: 'How to start a concluding sentence' },
        body: {
          vi: 'Một vài cụm từ hữu ích: **That is why... / For these reasons, ... / In short, ... / In conclusion, ...**\nKhông thêm ý mới ở câu kết — chỉ tóm lại ý chính.',
          en: 'Useful phrases: **That is why... / For these reasons, ... / In short, ... / In conclusion, ...**\nDon\'t add a new idea in the concluding sentence — just sum up the main idea.',
        },
        examples: [
          { en: 'For these reasons, I think everyone should learn to cook.', vi: 'Vì những lý do này, tôi nghĩ ai cũng nên học nấu ăn.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-08-ex01',
        type: 'multiple-choice',
        question: 'Which is the best topic sentence for a paragraph about why you like your hometown?',
        options: [
          'My hometown is a wonderful place to live.',
          'There is a bakery on Tran Phu Street.',
          'The bus ticket costs 7,000 dong.',
          'I went there last year.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Câu chủ đề nêu ý chính chung; các câu khác chỉ là chi tiết nhỏ.',
          en: 'A topic sentence gives the general main idea; the others are small details.',
        },
      },
      {
        id: 'l2-write-08-ex02',
        type: 'multiple-choice',
        question: 'Topic sentence: "Cycling is good for students." Which is a supporting sentence?',
        options: [
          'My favourite colour is blue.',
          'It helps them stay fit and healthy.',
          'Cars are very expensive in Japan.',
          'I have two brothers.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu hỗ trợ đưa ra lý do cho ý chính: đạp xe giúp khỏe mạnh.',
          en: 'A supporting sentence gives a reason for the main idea: cycling keeps you healthy.',
        },
      },
      {
        id: 'l2-write-08-ex03',
        type: 'multiple-choice',
        question: 'Which sentence does NOT belong in a paragraph about healthy breakfasts?',
        options: [
          'Eggs give you energy for the morning.',
          'Fruit is full of vitamins.',
          'My cousin plays the guitar very well.',
          'A glass of milk is good for your bones.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu về đàn guitar không liên quan đến bữa sáng lành mạnh → bỏ đi.',
          en: 'The guitar sentence is not about healthy breakfasts → remove it.',
        },
      },
      {
        id: 'l2-write-08-ex04',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi phần với nhiệm vụ của nó.', en: 'Match each part with its job.' },
        pairs: [
          { left: 'Topic sentence', right: 'gives the main idea' },
          { left: 'Supporting sentence', right: 'gives a reason or an example' },
          { left: 'Concluding sentence', right: 'repeats the main idea at the end' },
          { left: 'Linking word', right: 'connects two ideas' },
        ],
        explanation: {
          vi: 'Mỗi phần trong đoạn văn có một nhiệm vụ riêng.',
          en: 'Each part of a paragraph has its own job.',
        },
      },
      {
        id: 'l2-write-08-ex05',
        type: 'fill-blank',
        sentence: '___ these reasons, I think everyone should learn to swim.',
        acceptedAnswers: ['For'],
        explanation: {
          vi: '"For these reasons" = Vì những lý do này — dùng mở đầu câu kết.',
          en: '"For these reasons" is a common way to start a concluding sentence.',
        },
      },
      {
        id: 'l2-write-08-ex06',
        type: 'multiple-choice',
        question: 'Which is the best concluding sentence for a paragraph about why reading is useful?',
        options: [
          'I bought a book yesterday.',
          'Books are made of paper.',
          'My sister likes films.',
          'In short, reading every day makes us smarter and happier.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Câu kết tóm lại ý chính (đọc sách có ích) và có cụm "In short".',
          en: 'It sums up the main idea (reading is useful) and starts with "In short".',
        },
      },
      {
        id: 'l2-write-08-ex07',
        type: 'true-false',
        statement: 'A good paragraph usually talks about many different main ideas.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Mỗi đoạn văn chỉ nên có MỘT ý chính.',
          en: 'Each paragraph should have ONE main idea.',
        },
      },
      {
        id: 'l2-write-08-ex08',
        type: 'arrange-words',
        translationVi: 'Đó là lý do tôi yêu trường của mình.',
        correctSentence: 'That is why I love my school.',
        extraWords: ['because'],
        explanation: {
          vi: '"That is why..." = Đó là lý do... — cách mở đầu câu kết rất hay dùng.',
          en: '"That is why..." is a very common way to start a concluding sentence.',
        },
      },
      {
        id: 'l2-write-08-ex09',
        type: 'true-false',
        statement: 'The topic sentence is usually the first sentence of a paragraph.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Câu chủ đề thường đứng đầu để người đọc biết ngay ý chính.',
          en: 'It usually comes first, so the reader knows the main idea at once.',
        },
      },
      {
        id: 'l2-write-08-ex10',
        type: 'write-answer',
        prompt:
          'Write one paragraph with the title "My favourite season". Use a topic sentence, three supporting sentences and a concluding sentence.',
        tipsVi:
          'Câu 1: My favourite season is... Câu 2-4: lý do / ví dụ (thời tiết, hoạt động, đồ ăn...). Câu cuối: That is why... / For these reasons...',
        minWords: 60,
        sampleAnswer:
          'My favourite season is autumn. First, the weather in Hanoi is cool and dry, so it is very comfortable. The sky is often blue, and the streets smell of milk flowers in the evening. Also, autumn is the season of the Mid-Autumn Festival, and I can eat mooncakes with my family. Finally, it is the best time for walking around the lakes. For these reasons, I always look forward to autumn.',
        explanation: {
          vi: 'Kiểm tra: câu chủ đề rõ ràng, các câu hỗ trợ đều nói về mùa thu, câu kết nhắc lại ý chính.',
          en: 'Check: a clear topic sentence, all supporting sentences are about autumn, and the conclusion repeats the main idea.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-08-test01',
        type: 'multiple-choice',
        question: 'Which is the best topic sentence for a paragraph about pets?',
        options: [
          'My dog is brown.',
          'I fed the cat at six o\'clock.',
          'Having a pet can teach children many things.',
          'The pet shop closes at nine.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu chủ đề là ý chung, có thể giải thích thêm bằng lý do và ví dụ.',
          en: 'A topic sentence is a general idea that can be explained with reasons and examples.',
        },
      },
      {
        id: 'l2-write-08-test02',
        type: 'multiple-choice',
        question: 'Which sentence supports "Learning English opens many doors."?',
        options: [
          'It can help you get a better job.',
          'English has 26 letters.',
          'I had rice for lunch.',
          'My teacher is tall.',
        ],
        correctIndex: 0,
        explanation: {
          vi: '"Giúp có việc tốt hơn" là một lý do cho ý "mở ra nhiều cơ hội".',
          en: '"A better job" is a reason why English opens doors.',
        },
      },
      {
        id: 'l2-write-08-test03',
        type: 'fill-blank',
        sentence: 'In ___, a good paragraph has one clear main idea.',
        acceptedAnswers: ['conclusion', 'short'],
        explanation: {
          vi: '"In conclusion" / "In short" = Tóm lại — dùng mở đầu câu kết.',
          en: '"In conclusion" / "In short" start a concluding sentence.',
        },
      },
      {
        id: 'l2-write-08-test04',
        type: 'true-false',
        statement: 'Supporting sentences give reasons, examples or details.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng, câu hỗ trợ làm rõ ý chính bằng lý do, ví dụ, chi tiết.',
          en: 'Correct — they explain the main idea with reasons, examples and details.',
        },
      },
      {
        id: 'l2-write-08-test05',
        type: 'multiple-choice',
        question: 'What is the correct order of a paragraph?',
        options: [
          'concluding → topic → supporting',
          'topic → supporting → concluding',
          'supporting → concluding → topic',
          'topic → concluding → supporting',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Thứ tự: câu chủ đề → câu hỗ trợ → câu kết.',
          en: 'Order: topic → supporting → concluding.',
        },
      },
      {
        id: 'l2-write-08-test06',
        type: 'write-answer',
        prompt:
          'Write one paragraph about "The best way to spend a weekend". Include a topic sentence, supporting sentences with reasons or examples, and a concluding sentence.',
        tipsVi:
          'Chỉ nói về MỘT ý chính. Câu đầu nêu cách bạn thích nhất; 3 câu giữa giải thích vì sao; câu cuối dùng In short / That is why.',
        minWords: 60,
        sampleAnswer:
          'In my opinion, the best way to spend a weekend is to go outside with friends. Firstly, after five days at school, we need fresh air and exercise. We can ride our bikes to the park or play badminton together. Secondly, spending time with friends makes us relaxed and happy. We can talk, laugh and forget about our homework. In short, a weekend outdoors with friends is good for both our body and our mind.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 9: Từ nối — first, also, however, so, because
  // ==========================================================================
  {
    id: 'l2-write-09',
    skill: 'writing',
    title: { vi: 'Từ nối: first, also, however, so, because', en: 'Linking words: first, also, however, so, because' },
    description: {
      vi: 'Dùng từ nối để bài viết mạch lạc: liệt kê, thêm ý, đối lập, nguyên nhân và kết quả.',
      en: 'Use linking words to make your writing flow: order, adding, contrast, reason and result.',
    },
    teachingCards: [
      {
        title: { vi: 'Thứ tự và thêm ý', en: 'Order and adding ideas' },
        body: {
          vi: '**Thứ tự**: **First, / Then, / Next, / Finally,** (thường có dấu phẩy sau).\n**Thêm ý**: **also** (đứng trước động từ thường, sau "be"): I **also** like tennis. / She is **also** kind.\n**and** nối 2 ý trong 1 câu; **too** đứng cuối câu: I like tennis **too**.',
          en: '**Order**: **First, / Then, / Next, / Finally,** (usually followed by a comma).\n**Adding**: **also** (before a main verb, after "be"): I **also** like tennis. / She is **also** kind.\n**and** joins two ideas in one sentence; **too** goes at the end: I like tennis **too**.',
        },
        examples: [
          { en: 'First, wash the rice. Then, put it in the rice cooker.', vi: 'Đầu tiên, vo gạo. Sau đó, cho vào nồi cơm điện.' },
          { en: 'The hotel was cheap. It was also very clean.', vi: 'Khách sạn rẻ. Nó cũng rất sạch.' },
        ],
      },
      {
        title: { vi: 'Đối lập: but và however', en: 'Contrast: but and however' },
        body: {
          vi: '**but** nối 2 ý **trong cùng một câu**: The film was long, **but** it was interesting.\n**However** thường **đứng đầu câu mới** và có **dấu phẩy** sau: The film was long. **However,** it was interesting.',
          en: '**but** joins two ideas **in one sentence**: The film was long, **but** it was interesting.\n**However** usually **starts a new sentence** and is followed by a **comma**: The film was long. **However,** it was interesting.',
        },
        examples: [
          { en: 'My phone is old. However, it still works well.', vi: 'Điện thoại của tôi cũ rồi. Tuy nhiên, nó vẫn chạy tốt.' },
        ],
      },
      {
        title: { vi: 'Nguyên nhân và kết quả: because và so', en: 'Reason and result: because and so' },
        body: {
          vi: '**because** + **nguyên nhân** (vì...): I stayed home **because** it was raining.\n**so** + **kết quả** (nên...): It was raining, **so** I stayed home.\nĐừng dùng cả hai trong một câu. Sai: "Because it was raining, so I stayed home."',
          en: '**because** + **reason**: I stayed home **because** it was raining.\n**so** + **result**: It was raining, **so** I stayed home.\nDon\'t use both in one sentence. Wrong: "Because it was raining, so I stayed home."',
        },
        examples: [
          { en: 'I was hungry, so I made a sandwich.', vi: 'Tôi đói nên tôi làm một cái bánh mì kẹp.' },
          { en: 'She was happy because she passed the test.', vi: 'Cô ấy vui vì đã qua bài kiểm tra.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-09-ex01',
        type: 'fill-blank',
        sentence: 'I was very hungry, ___ I made a sandwich.',
        acceptedAnswers: ['so'],
        explanation: {
          vi: '"made a sandwich" là kết quả → so.',
          en: '"made a sandwich" is the result → so.',
        },
      },
      {
        id: 'l2-write-09-ex02',
        type: 'fill-blank',
        sentence: 'I stayed at home ___ it was raining.',
        acceptedAnswers: ['because', 'as'],
        explanation: {
          vi: '"it was raining" là nguyên nhân → because.',
          en: '"it was raining" is the reason → because.',
        },
      },
      {
        id: 'l2-write-09-ex03',
        type: 'multiple-choice',
        question: 'The hotel was cheap. ___, the rooms were dirty.',
        options: ['So', 'Because', 'However', 'Also'],
        correctIndex: 2,
        explanation: {
          vi: 'Rẻ (tốt) ↔ bẩn (xấu) là hai ý đối lập → However.',
          en: 'Cheap (good) vs dirty (bad) is a contrast → However.',
        },
      },
      {
        id: 'l2-write-09-ex04',
        type: 'multiple-choice',
        question: 'I like swimming. I ___ enjoy playing tennis.',
        options: ['also', 'however', 'because', 'so'],
        correctIndex: 0,
        explanation: {
          vi: 'Thêm một ý cùng chiều → also (đứng trước động từ enjoy).',
          en: 'Adding a similar idea → also (before the verb enjoy).',
        },
      },
      {
        id: 'l2-write-09-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ nối với cách dùng của nó.', en: 'Match each linking word with its use.' },
        pairs: [
          { left: 'because', right: 'gives a reason' },
          { left: 'so', right: 'gives a result' },
          { left: 'however', right: 'shows a contrast' },
          { left: 'also', right: 'adds another idea' },
          { left: 'first', right: 'starts a list or a sequence' },
        ],
        explanation: {
          vi: 'Mỗi từ nối có một chức năng riêng.',
          en: 'Each linking word has its own job.',
        },
      },
      {
        id: 'l2-write-09-ex06',
        type: 'arrange-words',
        translationVi: 'Tuy nhiên, thời tiết rất tệ.',
        correctSentence: 'However, the weather was terrible.',
        extraWords: ['because'],
        explanation: {
          vi: 'However đứng đầu câu, theo sau là dấu phẩy.',
          en: 'However starts the sentence and is followed by a comma.',
        },
      },
      {
        id: 'l2-write-09-ex07',
        type: 'true-false',
        statement: '"Because" introduces a result, and "so" introduces a reason.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Ngược lại: because + nguyên nhân, so + kết quả.',
          en: 'It is the opposite: because + reason, so + result.',
        },
      },
      {
        id: 'l2-write-09-ex08',
        type: 'multiple-choice',
        question: 'Which sentence has the correct punctuation?',
        options: [
          'However the film was boring.',
          'However the film, was boring.',
          'However; the film was boring.',
          'However, the film was boring.',
        ],
        correctIndex: 3,
        explanation: {
          vi: 'Sau However ở đầu câu cần dấu phẩy.',
          en: 'Put a comma after However at the start of a sentence.',
        },
      },
      {
        id: 'l2-write-09-ex09',
        type: 'fill-blank',
        sentence: '___, wash the vegetables. Then, cut them into small pieces.',
        acceptedAnswers: ['First', 'Firstly', 'First of all'],
        explanation: {
          vi: 'Bước đầu tiên → First.',
          en: 'The first step → First.',
        },
      },
      {
        id: 'l2-write-09-ex10',
        type: 'write-answer',
        prompt:
          'Write about how you prepare for an important exam. Use these linking words: first, also, however, so, because.',
        tipsVi:
          'Viết theo thứ tự các bước (First, Then, Finally). Thêm ý bằng also, nói khó khăn bằng However, giải thích bằng because / so.',
        minWords: 60,
        sampleAnswer:
          'Before an important exam, I follow a simple plan. First, I make a timetable because I want to study every subject. Then I read my notes and do old tests. I also study with two classmates, so we can help each other. However, I sometimes feel very nervous before the exam. When that happens, I go for a short walk. Finally, I sleep early the night before, so I feel fresh in the morning.',
        explanation: {
          vi: 'Kiểm tra: đủ 5 từ nối, However có dấu phẩy, không dùng because và so trong cùng một câu.',
          en: 'Check: all five linking words, a comma after However, and no because + so in the same sentence.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-09-test01',
        type: 'fill-blank',
        sentence: 'She studied hard, ___ she passed the test.',
        acceptedAnswers: ['so'],
        explanation: {
          vi: '"passed the test" là kết quả → so.',
          en: '"passed the test" is the result → so.',
        },
      },
      {
        id: 'l2-write-09-test02',
        type: 'multiple-choice',
        question: "We didn't go to the park ___ it was too hot.",
        options: ['so', 'because', 'however', 'also'],
        correctIndex: 1,
        explanation: {
          vi: '"it was too hot" là nguyên nhân → because.',
          en: '"it was too hot" is the reason → because.',
        },
      },
      {
        id: 'l2-write-09-test03',
        type: 'arrange-words',
        translationVi: 'Tôi yêu âm nhạc, vì vậy tôi muốn học piano.',
        correctSentence: 'I love music, so I want to learn the piano.',
        extraWords: ['learning'],
        explanation: {
          vi: 'so + kết quả; want + to + V nguyên mẫu (learn).',
          en: 'so + result; want + to + base verb (learn).',
        },
      },
      {
        id: 'l2-write-09-test04',
        type: 'multiple-choice',
        question: 'My phone is very old. ___, it still works well.',
        options: ['So', 'Because', 'First', 'However'],
        correctIndex: 3,
        explanation: {
          vi: 'Cũ ↔ vẫn tốt là hai ý đối lập → However.',
          en: 'Old vs still works well is a contrast → However.',
        },
      },
      {
        id: 'l2-write-09-test05',
        type: 'true-false',
        statement: 'We usually put a comma after "However" at the start of a sentence.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Đúng: However, ...',
          en: 'Correct: However, ...',
        },
      },
      {
        id: 'l2-write-09-test06',
        type: 'write-answer',
        prompt:
          'Write about your favourite hobby. How did you start it? Why do you like it? Is there any problem with it? Use at least four different linking words.',
        tipsVi:
          'Gợi ý: First, ... / I like it because ... / It is also ... / However, ... / so ... Nhớ dấu phẩy sau However và First.',
        minWords: 60,
        sampleAnswer:
          'My favourite hobby is drawing. I started it when I was eight because my aunt gave me a box of colour pencils. At first, I only drew animals. Now I also draw people and buildings. I like drawing because it helps me relax after school. However, good paper and paints are quite expensive, so I usually draw in a cheap notebook. In the future, I want to take an art class.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 10: Làm quen IELTS Writing Task 1 — mô tả số liệu đơn giản
  //         (số liệu được cho bằng chữ trong đề, chưa cần vẽ biểu đồ)
  // ==========================================================================
  {
    id: 'l2-write-10',
    skill: 'writing',
    title: { vi: 'Làm quen IELTS Task 1: mô tả số liệu', en: 'First look at IELTS Task 1: describing numbers' },
    description: {
      vi: 'Mô tả số liệu trong một biểu đồ cột hoặc bảng nhỏ bằng các cụm như "more than", "the highest".',
      en: 'Describe the numbers in a small bar chart or table using phrases like "more than" and "the highest".',
    },
    teachingCards: [
      {
        title: { vi: 'IELTS Writing Task 1 là gì?', en: 'What is IELTS Writing Task 1?' },
        body: {
          vi: 'Trong Task 1, bạn nhìn **biểu đồ hoặc bảng số liệu** và **mô tả** những gì nó cho thấy (bài thi thật cần ít nhất 150 từ).\nBước 1: Câu mở đầu — **The bar chart / The table shows...**\nBước 2: Nêu **số lớn nhất, nhỏ nhất** và **so sánh** các số.\nKhông viết ý kiến cá nhân (I think, I like...). Chỉ mô tả **số liệu**.',
          en: 'In Task 1 you look at a **chart or table** and **describe** what it shows (the real test needs at least 150 words).\nStep 1: Opening sentence — **The bar chart / The table shows...**\nStep 2: Give the **highest and lowest** numbers and **compare** them.\nDon\'t give your opinion (I think, I like...). Only describe the **data**.',
        },
        examples: [
          { en: 'The bar chart shows the number of books that four students read in 2025.', vi: 'Biểu đồ cột cho thấy số sách bốn học sinh đã đọc trong năm 2025.' },
        ],
      },
      {
        title: { vi: 'Cụm từ so sánh số liệu', en: 'Phrases for comparing numbers' },
        body: {
          vi: '**the highest / the lowest** — cao nhất / thấp nhất\n**the most popular / the least popular** — phổ biến nhất / ít phổ biến nhất\n**more than / fewer than** (đếm được) / **less than** (không đếm được)\n**twice as many as** — gấp đôi\n**the same as / equal to** — bằng\nNếu số liệu ở **quá khứ** (2020, last year) → dùng **quá khứ đơn**.',
          en: '**the highest / the lowest**\n**the most popular / the least popular**\n**more than / fewer than** (countable) / **less than** (uncountable)\n**twice as many as**\n**the same as / equal to**\nIf the data is in the **past** (2020, last year) → use the **past simple**.',
        },
        examples: [
          { en: 'Binh read the highest number of books (20).', vi: 'Bình đọc nhiều sách nhất (20 cuốn).' },
          { en: 'Lan read twice as many books as Chi.', vi: 'Lan đọc số sách gấp đôi Chi.' },
          { en: 'Fewer students chose art than music.', vi: 'Số học sinh chọn mỹ thuật ít hơn số chọn âm nhạc.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l2-write-10-ex01',
        type: 'multiple-choice',
        question: 'Data — Books read in 2025: An 12, Binh 20, Chi 8. Who read the most books?',
        options: ['An', 'Chi', 'Binh', 'They read the same number.'],
        correctIndex: 2,
        explanation: {
          vi: 'Bình đọc 20 cuốn — con số cao nhất.',
          en: 'Binh read 20 books — the highest number.',
        },
      },
      {
        id: 'l2-write-10-ex02',
        type: 'fill-blank',
        sentence: 'Binh read 20 books and Chi read 8. Binh read ___ books than Chi.',
        acceptedAnswers: ['more'],
        explanation: {
          vi: '20 > 8 → more ... than.',
          en: '20 > 8 → more ... than.',
        },
      },
      {
        id: 'l2-write-10-ex03',
        type: 'fill-blank',
        sentence: 'An read 12 books, Binh 20 and Chi 8. Chi read the ___ number of books.',
        acceptedAnswers: ['lowest', 'smallest'],
        explanation: {
          vi: '8 là số nhỏ nhất → the lowest / the smallest number.',
          en: '8 is the smallest → the lowest / the smallest number.',
        },
      },
      {
        id: 'l2-write-10-ex04',
        type: 'multiple-choice',
        question: 'Which is the best first sentence for a Task 1 answer?',
        options: [
          'The bar chart shows the number of books that four students read in 2025.',
          'I think the chart is very interesting.',
          'Books are good for students.',
          'Binh is my best friend.',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Câu mở đầu Task 1 nói biểu đồ cho thấy gì; không nêu ý kiến cá nhân.',
          en: 'A Task 1 opening says what the chart shows; no personal opinion.',
        },
      },
      {
        id: 'l2-write-10-ex05',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ tiếng Anh với nghĩa tiếng Việt.', en: 'Match the English phrases with their Vietnamese meanings.' },
        pairs: [
          { left: 'the highest', right: 'cao nhất' },
          { left: 'the lowest', right: 'thấp nhất' },
          { left: 'more than', right: 'nhiều hơn' },
          { left: 'fewer than', right: 'ít hơn (danh từ đếm được)' },
          { left: 'twice as many as', right: 'gấp đôi' },
          { left: 'the same as', right: 'bằng, giống như' },
        ],
        explanation: {
          vi: 'Đây là các cụm từ cơ bản nhất để mô tả số liệu.',
          en: 'These are the most basic phrases for describing numbers.',
        },
      },
      {
        id: 'l2-write-10-ex06',
        type: 'true-false',
        statement:
          'Data — Cinema visitors: Monday 50, Saturday 200. Statement: There were four times as many visitors on Saturday as on Monday.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: '200 ÷ 50 = 4 → gấp bốn lần (four times as many).',
          en: '200 ÷ 50 = 4 → four times as many.',
        },
      },
      {
        id: 'l2-write-10-ex07',
        type: 'multiple-choice',
        question: 'Data — How students travel to school: walk 15, bike 30, bus 15. Which sentence is correct?',
        options: [
          'More students walk than cycle.',
          'The bus is the most popular way.',
          'The same number of students walk and take the bus.',
          'Fewer students cycle than walk.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Đi bộ 15 = xe buýt 15 → bằng nhau. Xe đạp (30) mới là phổ biến nhất.',
          en: 'Walk 15 = bus 15 → the same. Cycling (30) is the most popular.',
        },
      },
      {
        id: 'l2-write-10-ex08',
        type: 'fill-blank',
        sentence: 'Ice cream sales: June 300, July 600. Sales in July were ___ as high as in June.',
        acceptedAnswers: ['twice', 'two times'],
        explanation: {
          vi: '600 = 2 × 300 → twice as high as.',
          en: '600 = 2 × 300 → twice as high as.',
        },
      },
      {
        id: 'l2-write-10-ex09',
        type: 'true-false',
        statement: 'In IELTS Writing Task 1, you should give your personal opinion about the chart.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Task 1 chỉ mô tả số liệu, không nêu ý kiến cá nhân.',
          en: 'Task 1 only describes the data; no personal opinion.',
        },
      },
      {
        id: 'l2-write-10-ex10',
        type: 'write-answer',
        prompt:
          'The table shows how many hours four friends spent playing sport in one week. Minh: 6 hours. Lan: 2 hours. Hoa: 4 hours. Tuan: 8 hours. Describe the information. Compare the numbers.',
        tipsVi:
          'Câu 1: The table shows... Sau đó nêu người cao nhất (Tuan), thấp nhất (Lan), và so sánh: more than, twice as many hours as... Không nêu ý kiến.',
        minWords: 50,
        sampleAnswer:
          'The table shows the number of hours that four friends spent playing sport in one week. Tuan spent the most time on sport, with 8 hours. Minh was second with 6 hours. Hoa played sport for 4 hours, which was twice as much as Lan. Lan spent the least time, only 2 hours. Overall, Tuan played four times as long as Lan.',
        explanation: {
          vi: 'Kiểm tra: có câu mở đầu, có số cao nhất / thấp nhất, có so sánh, không có ý kiến cá nhân.',
          en: 'Check: an opening sentence, the highest / lowest numbers, comparisons, and no personal opinion.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l2-write-10-test01',
        type: 'multiple-choice',
        question: 'Data — Museum visitors: 2022: 5,000; 2023: 8,000; 2024: 6,000. Which year had the highest number of visitors?',
        options: ['2022', '2023', '2024', 'All years were equal.'],
        correctIndex: 1,
        explanation: {
          vi: '8.000 là số lớn nhất → năm 2023.',
          en: '8,000 is the highest number → 2023.',
        },
      },
      {
        id: 'l2-write-10-test02',
        type: 'fill-blank',
        sentence: 'Class A has 30 students and Class B has 25. Class B has ___ students than Class A.',
        acceptedAnswers: ['fewer'],
        explanation: {
          vi: '"students" đếm được và 25 < 30 → fewer than.',
          en: '"students" is countable and 25 < 30 → fewer than.',
        },
      },
      {
        id: 'l2-write-10-test03',
        type: 'true-false',
        statement: 'Data — Drinks sold: tea 40 cups, coffee 40 cups, juice 25 cups. Statement: Juice was more popular than tea.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Nước ép (25) ít hơn trà (40) → câu sai.',
          en: 'Juice (25) was less popular than tea (40) → false.',
        },
      },
      {
        id: 'l2-write-10-test04',
        type: 'arrange-words',
        translationVi: 'Bóng đá là môn thể thao được yêu thích nhất.',
        correctSentence: 'Football was the most popular sport.',
        extraWords: ['more'],
        explanation: {
          vi: 'So sánh nhất với tính từ dài: the most popular.',
          en: 'Superlative with a long adjective: the most popular.',
        },
      },
      {
        id: 'l2-write-10-test05',
        type: 'multiple-choice',
        question: 'Which phrase is the best way to begin a Task 1 answer?',
        options: ['In my opinion,', 'I like this chart because', 'Hello teacher,', 'The chart shows'],
        correctIndex: 3,
        explanation: {
          vi: 'Task 1 bắt đầu bằng việc nói biểu đồ cho thấy gì: The chart shows...',
          en: 'Task 1 starts by saying what the chart shows: The chart shows...',
        },
      },
      {
        id: 'l2-write-10-test06',
        type: 'write-answer',
        prompt:
          'The bar chart shows how many students joined each club at a school in 2025. Music: 40. Art: 25. Sport: 60. Science: 25. Describe the information and make comparisons.',
        tipsVi:
          'Số liệu năm 2025 (quá khứ) → dùng quá khứ đơn (joined, was). Nêu câu lạc bộ phổ biến nhất, ít nhất, hai câu lạc bộ bằng nhau và 1-2 phép so sánh.',
        minWords: 50,
        sampleAnswer:
          'The bar chart shows the number of students who joined four school clubs in 2025. Sport was the most popular club, with 60 students. Music was second, with 40 students, so 20 fewer students chose music than sport. Art and science were the least popular clubs. They had the same number of students, 25 each. Overall, more students joined sport than art and science together.',
      },
    ],
  },
]
