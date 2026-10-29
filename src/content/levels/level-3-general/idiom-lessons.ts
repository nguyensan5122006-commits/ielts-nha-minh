/**
 * idiom-lessons.ts — LEVEL 3 · TRACK GENERAL (band 4.0 – 6.5, CEFR B1 – B2)
 * THÀNH NGỮ GIAO TIẾP + CỤM ĐỘNG TỪ ĐỂ THẢO LUẬN (mode 'practice')
 * ----------------------------------------------------------------------------
 * 2 bài kiểu Duolingo thuộc chặng "Thế giới quanh ta" (u3-g06…), giúp nói tự nhiên hơn
 * trong giao tiếp và IELTS Speaking (Part 1 + Part 3).
 *
 * Danh sách bài:
 *   l3-g-u6-idioms   Thành ngữ giao tiếp hằng ngày: a piece of cake, under the weather,
 *                    break the ice, on the same page, hit the books, once in a blue moon,
 *                    cost an arm and a leg, keep an eye on
 *   l3-g-u6-phrasal  Cụm động từ để thảo luận: come up with, look into, deal with, bring up,
 *                    point out, carry on, end up, figure out
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ (cách dùng, văn phong nói/viết, mẹo)
 *   - words         : 8 thành ngữ / cụm động từ (IPA Anh-Anh, nghĩa, 2 câu ví dụ, ghi chú)
 *   - exercises     : 12 bài (chọn, điền, nối, sắp xếp, đúng/sai, nghe, nói)
 *   - miniTest      : [] (kiểm tra nằm ở checkpoint cuối chặng)
 *
 * Quy ước id: bài "l3-g-u6-…", bài tập "<id bài>-ex<số>",
 * từ "l3-g-w2-<cụm từ>" (w2 = nhóm từ bổ sung, tránh trùng id cũ "l3-g-w-…").
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level3GeneralIdiomLessons: Lesson[] = [
  /* ==========================================================================
   * BÀI 1 — THÀNH NGỮ GIAO TIẾP HẰNG NGÀY
   * ======================================================================== */
  {
    id: 'l3-g-u6-idioms',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Thành ngữ giao tiếp hằng ngày', en: 'Everyday conversational idioms' },
    description: {
      vi: '8 thành ngữ người bản xứ vẫn dùng thường xuyên, khi nào nên dùng và khi nào không.',
      en: '8 idioms people still use every day, and when to use them — or not.',
    },
    teachingCards: [
      {
        title: { vi: 'Thành ngữ là cụm cố định', en: 'Idioms are fixed phrases' },
        body: {
          vi: 'Nghĩa của thành ngữ **không phải** nghĩa từng chữ cộng lại:\n**a piece of cake** (một miếng bánh) = **rất dễ**\n**under the weather** (dưới thời tiết) = **hơi mệt, hơi ốm**\nThành ngữ là cụm **cố định**: không đổi từ, không thêm bớt. Nói "a piece of bread" là sai.',
          en: 'An idiom\'s meaning is **not** the sum of its words:\n**a piece of cake** = **very easy**\n**under the weather** = **a bit ill**\nIdioms are **fixed**: don\'t change or add words. "A piece of bread" doesn\'t work.',
        },
        examples: [
          { en: 'The first test was a piece of cake.', vi: 'Bài kiểm tra đầu tiên dễ ợt.' },
          { en: "I'm feeling a bit under the weather today.", vi: 'Hôm nay tôi thấy hơi mệt trong người.' },
        ],
      },
      {
        title: { vi: 'Nói thì được, viết luận thì không', en: 'Fine for speaking, not for essays' },
        body: {
          vi: 'Thành ngữ mang văn phong **thân mật**.\n✓ Nói chuyện với bạn bè, gia đình, đồng nghiệp.\n✓ **IELTS Speaking** — nếu dùng **tự nhiên, đúng ngữ cảnh**.\n✗ **IELTS Writing Task 2**, email trang trọng: thay bằng từ thường (very easy, expensive).\nGiám khảo đánh giá cao từ dùng **đúng**, không phải từ "lạ".',
          en: 'Idioms are **informal**.\n✓ Chatting with friends, family and colleagues.\n✓ **IELTS Speaking** — if used **naturally and correctly**.\n✗ **IELTS Writing Task 2** and formal emails: use plain words (very easy, expensive).\nExaminers reward **accurate** language, not "fancy" words.',
        },
        examples: [
          { en: 'Speaking: Rent in the city centre costs an arm and a leg.', vi: 'Nói: Tiền thuê nhà ở trung tâm đắt cắt cổ.' },
          { en: 'Essay: Housing in city centres is extremely expensive.', vi: 'Bài luận: Nhà ở trung tâm thành phố cực kỳ đắt đỏ.' },
        ],
      },
      {
        title: { vi: 'Đừng nhồi nhét', en: "Don't overdo it" },
        body: {
          vi: 'Mỗi câu trả lời chỉ nên có **1–2 thành ngữ**. Nhồi 4–5 cái nghe như **học thuộc lòng**.\nMẹo: chọn vài thành ngữ **hợp với chuyện của bạn** (học hành, sức khoẻ, tiền bạc) và luyện đến khi bật ra tự nhiên.\nNếu không chắc nghĩa — **đừng dùng**.',
          en: 'Use only **1–2 idioms** per answer. Four or five sounds **memorised**.\nTip: pick a few that **fit your life** (study, health, money) and practise until they come out naturally.\nIf you\'re not sure of the meaning — **don\'t use it**.',
        },
        examples: [
          { en: 'I only go to the cinema once in a blue moon — I usually stream films at home.', vi: 'Hiếm lắm tôi mới ra rạp — thường tôi xem phim ở nhà.' },
          { en: 'Before exams, I really have to hit the books.', vi: 'Trước kỳ thi, tôi phải cắm đầu vào học.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-piece-of-cake',
        word: 'a piece of cake',
        ipa: '/ə ˌpiːs əv ˈkeɪk/',
        partOfSpeech: 'idiom',
        meaningVi: 'dễ ợt, rất dễ',
        definitionEn: 'Something that is very easy to do.',
        examples: [
          { en: 'Setting up the new printer was a piece of cake.', vi: 'Cài máy in mới dễ ợt.' },
          { en: "Don't worry about the quiz — it'll be a piece of cake.", vi: 'Đừng lo bài kiểm tra nhỏ — sẽ dễ thôi.' },
        ],
        usageNote: {
          vi: 'Nghĩa đen: "một miếng bánh". Thường đi sau **be**: It was a piece of cake.',
          en: 'Usually after **be**: It was a piece of cake.',
        },
      },
      {
        id: 'l3-g-w2-under-the-weather',
        word: 'under the weather',
        ipa: '/ˌʌn.də ðə ˈweð.ə(r)/',
        partOfSpeech: 'idiom',
        meaningVi: 'hơi mệt, hơi ốm',
        definitionEn: 'Slightly ill or not feeling well.',
        examples: [
          { en: "Grandma is a bit under the weather, so we're staying in tonight.", vi: 'Bà hơi mệt nên tối nay cả nhà ở nhà.' },
          { en: 'I felt under the weather after the long flight.', vi: 'Tôi thấy mệt mỏi sau chuyến bay dài.' },
        ],
        usageNote: {
          vi: 'Nghĩa đen: "dưới thời tiết" — không liên quan tới mưa nắng. Chỉ dùng cho **ốm nhẹ**.',
          en: 'Nothing to do with the weather. Only for **mild** illness.',
        },
      },
      {
        id: 'l3-g-w2-break-the-ice',
        word: 'break the ice',
        ipa: '/ˌbreɪk ði ˈaɪs/',
        partOfSpeech: 'idiom',
        meaningVi: 'phá tan bầu không khí ngại ngùng ban đầu',
        definitionEn: 'To make people who have just met feel more relaxed.',
        examples: [
          { en: 'Our teacher played a short game to break the ice on the first day.', vi: 'Cô giáo cho chơi một trò ngắn để phá băng hôm đầu tiên.' },
          { en: 'Talking about food is an easy way to break the ice.', vi: 'Nói chuyện về đồ ăn là cách dễ để làm quen.' },
        ],
        usageNote: {
          vi: 'Nghĩa đen: "đập vỡ lớp băng". Danh từ: **an ice-breaker** = trò/câu mở đầu để làm quen.',
          en: 'Noun: **an ice-breaker** = an activity to help people relax.',
        },
      },
      {
        id: 'l3-g-w2-on-the-same-page',
        word: 'on the same page',
        ipa: '/ɒn ðə ˌseɪm ˈpeɪdʒ/',
        partOfSpeech: 'idiom',
        meaningVi: 'cùng quan điểm, hiểu ý nhau, thống nhất',
        definitionEn: 'Agreeing about something or understanding it in the same way.',
        examples: [
          { en: "Let's check the plan again so we're all on the same page.", vi: 'Mình xem lại kế hoạch để mọi người cùng thống nhất nhé.' },
          { en: 'My parents are on the same page about screen time.', vi: 'Bố mẹ tôi cùng quan điểm về thời gian dùng màn hình.' },
        ],
      },
      {
        id: 'l3-g-w2-hit-the-books',
        word: 'hit the books',
        ipa: '/ˌhɪt ðə ˈbʊks/',
        partOfSpeech: 'idiom',
        meaningVi: 'cắm đầu vào học, học chăm chỉ',
        definitionEn: 'To start studying hard.',
        examples: [
          { en: 'The exam is next week, so I need to hit the books.', vi: 'Tuần sau thi rồi, tôi phải cắm đầu vào học.' },
          { en: 'After dinner, my brother hits the books until ten.', vi: 'Sau bữa tối, em tôi học miệt mài tới 10 giờ.' },
        ],
        usageNote: {
          vi: 'Nghĩa đen: "đánh vào sách" — thật ra là **học chăm**, không phải đánh.',
          en: 'It means study hard — nobody hits anything!',
        },
      },
      {
        id: 'l3-g-w2-once-in-a-blue-moon',
        word: 'once in a blue moon',
        ipa: '/ˌwʌns ɪn ə ˌbluː ˈmuːn/',
        partOfSpeech: 'idiom',
        meaningVi: 'rất hiếm khi, năm thì mười hoạ',
        definitionEn: 'Very rarely.',
        examples: [
          { en: 'We eat fast food once in a blue moon.', vi: 'Năm thì mười hoạ nhà tôi mới ăn đồ ăn nhanh.' },
          { en: 'My uncle lives abroad, so we only see him once in a blue moon.', vi: 'Chú tôi sống ở nước ngoài nên rất hiếm khi gặp.' },
        ],
        usageNote: {
          vi: 'Thường đặt **cuối câu**. Rất hợp với câu hỏi Part 1 "How often do you…?".',
          en: 'Usually at the **end** of the sentence. Great for Part 1 "How often…?" questions.',
        },
      },
      {
        id: 'l3-g-w2-cost-an-arm-and-a-leg',
        word: 'cost an arm and a leg',
        ipa: '/ˌkɒst ən ˌɑːm ənd ə ˈleɡ/',
        partOfSpeech: 'idiom',
        meaningVi: 'đắt cắt cổ, rất đắt',
        definitionEn: 'To be extremely expensive.',
        examples: [
          { en: 'Flights during Tet cost an arm and a leg.', vi: 'Vé máy bay dịp Tết đắt cắt cổ.' },
          { en: 'The repair cost an arm and a leg, so we bought a new washing machine.', vi: 'Sửa đắt quá nên nhà tôi mua máy giặt mới.' },
        ],
        usageNote: {
          vi: 'Chia động từ **cost** theo thì: costs (hiện tại), cost (quá khứ — giữ nguyên).',
          en: 'Change **cost** for tense: it costs / it cost (past is the same).',
        },
      },
      {
        id: 'l3-g-w2-keep-an-eye-on',
        word: 'keep an eye on',
        ipa: '/ˌkiːp ən ˈaɪ ɒn/',
        partOfSpeech: 'idiom',
        meaningVi: 'để mắt tới, trông chừng',
        definitionEn: 'To watch someone or something to make sure they are safe or all right.',
        examples: [
          { en: 'Could you keep an eye on my bag while I buy a drink?', vi: 'Bạn trông giúp mình cái túi trong lúc mình đi mua nước nhé?' },
          { en: 'I keep an eye on the news to see if the storm is coming.', vi: 'Tôi theo dõi tin tức xem bão có tới không.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l3-g-u6-idioms-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối thành ngữ với nghĩa thật.', en: 'Match each idiom with its real meaning.' },
        pairs: [
          { left: 'a piece of cake', right: 'very easy' },
          { left: 'under the weather', right: 'slightly ill' },
          { left: 'once in a blue moon', right: 'very rarely' },
          { left: 'cost an arm and a leg', right: 'very expensive' },
          { left: 'hit the books', right: 'study hard' },
        ],
        explanation: {
          vi: 'Thành ngữ không dịch từng chữ — học nghĩa thật của cả cụm.',
          en: "Don't translate word by word — learn the real meaning.",
        },
      },
      {
        id: 'l3-g-u6-idioms-ex02',
        type: 'multiple-choice',
        question: "Mai can't come to the party. She's ___ and wants to rest.",
        options: ['on the same page', 'under the weather', 'a piece of cake', 'breaking the ice'],
        correctIndex: 1,
        explanation: {
          vi: 'Muốn nghỉ ngơi vì hơi ốm → under the weather.',
          en: 'She wants to rest because she feels ill → under the weather.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex03',
        type: 'fill-blank',
        sentence: 'At the start of the meeting, the manager told a funny story to break the ___.',
        acceptedAnswers: ['ice'],
        explanation: {
          vi: 'break the ice = làm mọi người bớt ngại khi mới gặp.',
          en: 'break the ice = help people relax when they first meet.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex04',
        type: 'multiple-choice',
        question: 'Which sentence uses the idiom correctly?',
        options: [
          'The homework was a piece of bread.',
          'The homework was a slice of cake.',
          'The homework was a piece of cake.',
          'The homework was piece of cakes.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Thành ngữ cố định: phải là đúng "a piece of cake".',
          en: 'Idioms are fixed: it must be exactly "a piece of cake".',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex05',
        type: 'true-false',
        statement: '"Cost an arm and a leg" is a good choice for a formal IELTS Writing Task 2 essay.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Thành ngữ thân mật; bài luận nên viết "extremely expensive".',
          en: 'Idioms are informal; an essay should say "extremely expensive".',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex06',
        type: 'fill-blank',
        sentence: 'I only eat out once in a blue ___ because I prefer home cooking.',
        acceptedAnswers: ['moon'],
        explanation: {
          vi: 'once in a blue moon = rất hiếm khi.',
          en: 'once in a blue moon = very rarely.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex07',
        type: 'multiple-choice',
        question: "Before we start the project, let's make sure everyone is ___.",
        options: ['under the weather', 'on the same page', 'once in a blue moon', 'a piece of cake'],
        correctIndex: 1,
        explanation: {
          vi: 'Muốn mọi người cùng hiểu, cùng thống nhất → on the same page.',
          en: 'Everyone should understand and agree → on the same page.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex08',
        type: 'arrange-words',
        translationVi: 'Bạn trông chừng em bé giúp mình được không?',
        correctSentence: 'Could you keep an eye on the baby?',
        extraWords: ['look'],
        explanation: {
          vi: 'keep an eye on + người/vật = trông chừng.',
          en: 'keep an eye on + someone/something = watch to keep safe.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex09',
        type: 'listen-choose',
        audioText:
          "Man: Are you coming to the café with us tonight?\nWoman: I'd love to, but my final exam is on Monday. I really need to hit the books this weekend.",
        question: 'What will the woman do this weekend?',
        options: ['Go to the café', 'Study hard for her exam', 'Buy some new books'],
        correctIndex: 1,
        explanation: {
          vi: '"hit the books" = học chăm chỉ, không phải mua sách.',
          en: '"hit the books" = study hard, not buy books.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex10',
        type: 'true-false',
        statement: 'Using five idioms in one short Speaking answer usually sounds natural.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Chỉ nên 1–2 thành ngữ; nhiều quá nghe như học thuộc.',
          en: 'Use only 1–2; too many sounds memorised.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex11',
        type: 'speak-sentence',
        sentence: 'Flights during the holidays cost an arm and a leg.',
        translationVi: 'Vé máy bay dịp lễ đắt cắt cổ.',
        explanation: {
          vi: 'Nối âm "an arm and a leg" thành "a-nar-man-da-leg"; rõ /t/ trong cost.',
          en: 'Link "an arm and a leg"; say the /t/ in cost clearly.',
        },
      },
      {
        id: 'l3-g-u6-idioms-ex12',
        type: 'speak-answer',
        question: 'How often do you go to the cinema? Why?',
        tipsVi:
          'Trả lời tần suất + lý do + ví dụ. Có thể dùng 1 thành ngữ thật tự nhiên (once in a blue moon, cost an arm and a leg). Đừng nhồi nhét.',
        sampleAnswer:
          "Honestly, I only go to the cinema once in a blue moon. Tickets aren't cheap, and I usually prefer watching films at home with my family because we can pause and chat. The last time I went was for my sister's birthday, and we really enjoyed the big screen.",
        recordSeconds: 45,
        explanation: {
          vi: 'Câu mẫu dùng 1 thành ngữ đúng chỗ, kèm lý do và ví dụ.',
          en: 'The sample uses one idiom naturally, plus a reason and an example.',
        },
      },
    ],
    miniTest: [],
  },

  /* ==========================================================================
   * BÀI 2 — CỤM ĐỘNG TỪ ĐỂ THẢO LUẬN (IELTS Speaking Part 3, nêu ý kiến)
   * ======================================================================== */
  {
    id: 'l3-g-u6-phrasal',
    skill: 'vocabulary',
    mode: 'practice',
    track: 'general',
    estimatedMinutes: 12,
    title: { vi: 'Cụm động từ để thảo luận', en: 'Phrasal verbs for discussion' },
    description: {
      vi: '8 cụm động từ giúp bạn nêu ý kiến, giải pháp và kết quả khi thảo luận hoặc thi IELTS Speaking Part 3.',
      en: '8 phrasal verbs for giving opinions, solutions and results in discussions and IELTS Speaking Part 3.',
    },
    teachingCards: [
      {
        title: { vi: 'Đoán nghĩa từ ngữ cảnh', en: 'Meaning from context' },
        body: {
          vi: 'Cùng một động từ, đổi từ nhỏ là đổi nghĩa:\n**bring up** a topic = **nêu ra** một chủ đề\n**point out** a problem = **chỉ ra** một vấn đề\n**end up** + V-ing = **rốt cuộc lại** (làm gì)\nKhi gặp cụm lạ, hãy nhìn **câu xung quanh**: người ta đang nêu ý, giải quyết, hay kể kết quả?',
          en: 'Change the small word and the meaning changes:\n**bring up** a topic = **mention** it\n**point out** a problem = **show** it\n**end up** + -ing = **finally do** something (often unplanned)\nWith a new one, look at the **sentence around it**: is the speaker suggesting, solving or describing a result?',
        },
        examples: [
          { en: 'My teacher pointed out a mistake in my essay.', vi: 'Cô giáo chỉ ra một lỗi trong bài luận của tôi.' },
          { en: 'We planned to eat out but ended up cooking at home.', vi: 'Định đi ăn ngoài nhưng rốt cuộc lại nấu ở nhà.' },
        ],
      },
      {
        title: { vi: 'Nói dùng cụm động từ, viết dùng từ trang trọng', en: 'Phrasal verbs for speaking, formal verbs for writing' },
        body: {
          vi: 'Cụm động từ nghe **tự nhiên** khi nói; bài viết học thuật hay dùng **1 từ trang trọng**:\n**come up with** ↔ **propose / create**\n**look into** ↔ **investigate**\n**deal with** ↔ **handle / tackle**\n**figure out** ↔ **understand / solve**\nSpeaking: dùng cụm động từ. Writing Task 2: ưu tiên từ trang trọng.',
          en: 'Phrasal verbs sound **natural** in speech; academic writing prefers **one formal verb**:\n**come up with** ↔ **propose / create**\n**look into** ↔ **investigate**\n**deal with** ↔ **handle / tackle**\n**figure out** ↔ **understand / solve**\nSpeaking: phrasal verbs. Writing Task 2: formal verbs.',
        },
        examples: [
          { en: 'Speaking: The government should come up with better ideas.', vi: 'Nói: Chính phủ nên nghĩ ra những ý tưởng tốt hơn.' },
          { en: 'Writing: The government should propose more effective policies.', vi: 'Viết: Chính phủ nên đề xuất những chính sách hiệu quả hơn.' },
        ],
      },
      {
        title: { vi: 'Cụm động từ 3 phần', en: 'Three-part phrasal verbs' },
        body: {
          vi: 'Một số cụm có **3 phần**: động từ + 2 từ nhỏ, và **không tách** được:\n**come up with** an idea ✓ — come an idea up with ✗\nVới đại từ: come up with **it** (đại từ đứng **sau cùng**).\nNgược lại, **bring up / point out / figure out** tách được: bring **it** up, figure **it** out.',
          en: 'Some have **three parts**: verb + two small words, and they **can\'t be separated**:\n**come up with** an idea ✓ — come an idea up with ✗\nWith a pronoun: come up with **it** (pronoun at the **end**).\nBut **bring up / point out / figure out** are separable: bring **it** up, figure **it** out.',
        },
        examples: [
          { en: 'She came up with a clever solution.', vi: 'Cô ấy nghĩ ra một giải pháp thông minh.' },
          { en: "This maths problem is hard, but I'll figure it out.", vi: 'Bài toán này khó, nhưng tôi sẽ tìm ra cách giải.' },
        ],
      },
    ],
    words: [
      {
        id: 'l3-g-w2-come-up-with',
        word: 'come up with',
        ipa: '/kʌm ˈʌp wɪð/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'nghĩ ra (ý tưởng, giải pháp)',
        definitionEn: 'To think of an idea, plan or answer.',
        examples: [
          { en: 'Our group came up with a plan to reduce plastic at school.', vi: 'Nhóm chúng tôi nghĩ ra kế hoạch giảm nhựa ở trường.' },
          { en: 'Cities need to come up with ways to cut traffic.', vi: 'Các thành phố cần nghĩ ra cách giảm kẹt xe.' },
        ],
        usageNote: {
          vi: '3 phần, không tách: come up with **an idea**. Từ trang trọng: **propose, devise**.',
          en: 'Three parts, not separable. Formal: **propose, devise**.',
        },
      },
      {
        id: 'l3-g-w2-look-into',
        word: 'look into',
        ipa: '/lʊk ˈɪn.tuː/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'xem xét, tìm hiểu kỹ (một vấn đề)',
        definitionEn: 'To examine the facts about a problem or situation.',
        examples: [
          { en: 'The school is looking into the cost of a new library.', vi: 'Nhà trường đang xem xét chi phí xây thư viện mới.' },
          { en: "I'll look into it and call you back.", vi: 'Tôi sẽ tìm hiểu việc đó rồi gọi lại cho bạn.' },
        ],
        usageNote: {
          vi: 'Không tách: look into **it**. Trang trọng: **investigate, examine**.',
          en: 'Not separable: look into **it**. Formal: **investigate, examine**.',
        },
      },
      {
        id: 'l3-g-w2-deal-with',
        word: 'deal with',
        ipa: '/ˈdiːl wɪð/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'giải quyết, xử lý',
        definitionEn: 'To take action to solve a problem.',
        examples: [
          { en: 'Young people need to learn how to deal with stress.', vi: 'Người trẻ cần học cách đối phó với căng thẳng.' },
          { en: 'The local council is dealing with the flooding.', vi: 'Chính quyền địa phương đang xử lý tình trạng ngập.' },
        ],
        usageNote: {
          vi: 'Quá khứ: **dealt** /delt/ with. Trang trọng: **handle, tackle**.',
          en: 'Past: **dealt** /delt/ with. Formal: **handle, tackle**.',
        },
      },
      {
        id: 'l3-g-w2-bring-up',
        word: 'bring up',
        ipa: '/brɪŋ ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'nêu ra (chủ đề); nuôi dạy (con cái)',
        definitionEn: 'To start talking about a subject; also to look after a child until it is an adult.',
        examples: [
          { en: 'At the family meeting, my sister brought up the idea of a holiday.', vi: 'Trong buổi họp gia đình, chị tôi nêu ra ý đi du lịch.' },
          { en: 'I was brought up by my grandparents in the countryside.', vi: 'Tôi được ông bà nuôi lớn ở quê.' },
        ],
        usageNote: {
          vi: 'Có 2 nghĩa — nhìn ngữ cảnh. Tách được: bring **it** up.',
          en: 'Two meanings — check the context. Separable: bring **it** up.',
        },
      },
      {
        id: 'l3-g-w2-point-out',
        word: 'point out',
        ipa: '/pɔɪnt ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'chỉ ra, lưu ý (điều gì)',
        definitionEn: 'To tell someone a fact they may not have noticed.',
        examples: [
          { en: 'Experts point out that sleep is important for memory.', vi: 'Các chuyên gia chỉ ra rằng giấc ngủ quan trọng với trí nhớ.' },
          { en: 'He pointed out a small error in the report.', vi: 'Anh ấy chỉ ra một lỗi nhỏ trong báo cáo.' },
        ],
        usageNote: {
          vi: 'Hay dùng **point out that** + mệnh đề — rất hữu ích để dẫn ý kiến.',
          en: 'Often **point out that** + clause — useful for reporting views.',
        },
      },
      {
        id: 'l3-g-w2-carry-on',
        word: 'carry on',
        ipa: '/ˌkær.i ˈɒn/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tiếp tục',
        definitionEn: 'To continue doing something.',
        examples: [
          { en: 'If we carry on using so much plastic, the oceans will suffer.', vi: 'Nếu chúng ta tiếp tục dùng nhiều nhựa như vậy, đại dương sẽ chịu hậu quả.' },
          { en: 'Sorry for interrupting — please carry on.', vi: 'Xin lỗi đã ngắt lời — bạn cứ nói tiếp đi.' },
        ],
        usageNote: {
          vi: 'carry on + **V-ing** hoặc carry on **with** + danh từ.',
          en: 'carry on + **-ing**, or carry on **with** + noun.',
        },
      },
      {
        id: 'l3-g-w2-end-up',
        word: 'end up',
        ipa: '/end ˈʌp/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'rốt cuộc, cuối cùng lại (thường ngoài dự tính)',
        definitionEn: 'To finally be in a situation or do something you did not plan.',
        examples: [
          { en: 'Many people buy a gym membership and end up never going.', vi: 'Nhiều người mua thẻ tập rồi rốt cuộc chẳng bao giờ đi.' },
          { en: 'We got lost and ended up in a lovely little village.', vi: 'Chúng tôi lạc đường và cuối cùng lại tới một ngôi làng nhỏ xinh.' },
        ],
        usageNote: {
          vi: 'end up + **V-ing** / + nơi chốn: ended up **staying**, ended up **in** Da Lat.',
          en: 'end up + **-ing** / + place: ended up **staying**, ended up **in** Da Lat.',
        },
      },
      {
        id: 'l3-g-w2-figure-out',
        word: 'figure out',
        ipa: '/ˌfɪɡ.ər ˈaʊt/',
        partOfSpeech: 'phrasal verb',
        meaningVi: 'tìm ra, hiểu ra (cách làm, câu trả lời)',
        definitionEn: 'To understand something or find the answer after thinking.',
        examples: [
          { en: "My grandparents can't figure out how to use video calls.", vi: 'Ông bà tôi không biết cách gọi video.' },
          { en: 'It took me an hour to figure out the problem.', vi: 'Tôi mất một tiếng mới tìm ra vấn đề.' },
        ],
        usageNote: {
          vi: 'Tách được: figure **it** out. Trang trọng: **solve, work out, understand**.',
          en: 'Separable: figure **it** out. Formal: **solve, understand**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l3-g-u6-phrasal-ex01',
        type: 'match-pairs',
        instruction: {
          vi: 'Nối cụm động từ với từ trang trọng có nghĩa gần nhất.',
          en: 'Match each phrasal verb with the closest formal verb.',
        },
        pairs: [
          { left: 'come up with', right: 'propose' },
          { left: 'look into', right: 'investigate' },
          { left: 'deal with', right: 'handle' },
          { left: 'carry on', right: 'continue' },
          { left: 'point out', right: 'indicate' },
        ],
        explanation: {
          vi: 'Speaking dùng cụm động từ; Writing Task 2 có thể đổi sang từ trang trọng.',
          en: 'Use phrasal verbs in speaking; formal verbs suit Writing Task 2.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex02',
        type: 'multiple-choice',
        question: 'Our class needs to ___ an idea for the school charity day.',
        options: ['come up with', 'end up', 'carry on', 'bring up with'],
        correctIndex: 0,
        explanation: {
          vi: 'Nghĩ ra ý tưởng → come up with an idea.',
          en: 'Think of an idea → come up with an idea.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex03',
        type: 'fill-blank',
        sentence: "I wanted to stay home, but I ended ___ going to the party and had a great time.",
        acceptedAnswers: ['up'],
        explanation: {
          vi: 'end up + V-ing = rốt cuộc lại làm gì (ngoài dự định).',
          en: 'end up + -ing = finally do something you did not plan.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex04',
        type: 'multiple-choice',
        question: 'In which sentence does "bring up" mean "raise a child"?',
        options: [
          'She brought up the problem at the meeting.',
          'He was brought up in a small fishing village.',
          "Don't bring up politics at dinner.",
          'Can I bring up one more point?',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"was brought up in a village" = được nuôi lớn ở làng.',
          en: '"was brought up in a village" = grew up there as a child.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex05',
        type: 'fill-blank',
        sentence: 'The new manager has to deal ___ a lot of complaints from customers.',
        acceptedAnswers: ['with'],
        explanation: {
          vi: 'Giải quyết, xử lý = deal with.',
          en: 'Take action on a problem = deal with.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She came up an excellent idea with.',
          'She came an excellent idea up with.',
          'She came up with an excellent idea.',
          'She came with up an excellent idea.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Cụm 3 phần không tách: came up with + danh từ.',
          en: 'Three-part phrasal verbs stay together: came up with + noun.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex07',
        type: 'arrange-words',
        translationVi: 'Các nhà khoa học chỉ ra rằng không khí ô nhiễm có hại cho trẻ em.',
        correctSentence: 'Scientists point out that polluted air is harmful to children.',
        extraWords: ['up'],
        explanation: {
          vi: 'point out that + mệnh đề = chỉ ra rằng…',
          en: 'point out that + clause = say a fact others may not notice.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex08',
        type: 'true-false',
        statement: 'In a formal essay, "investigate" is usually a better choice than "look into".',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: 'Bài viết học thuật ưu tiên từ trang trọng: investigate.',
          en: 'Academic writing prefers the formal verb: investigate.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex09',
        type: 'fill-blank',
        sentence: 'This app is confusing, but I think I can figure it ___.',
        acceptedAnswers: ['out'],
        explanation: {
          vi: 'figure out = tìm ra cách; "it" nằm giữa: figure it out.',
          en: 'figure out = understand; "it" goes in the middle: figure it out.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex10',
        type: 'listen-choose',
        audioText:
          "Woman: The traffic near the school is terrible in the mornings.\nMan: I know. The city council says it's looking into the problem, but nothing has changed yet.",
        question: 'What has the city council done?',
        options: ['It has solved the traffic problem.', 'It is studying the problem.', 'It has closed the school road.'],
        correctIndex: 1,
        explanation: {
          vi: '"looking into the problem" = đang xem xét, chưa giải quyết xong.',
          en: '"looking into the problem" = examining it, not solved yet.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex11',
        type: 'speak-sentence',
        sentence: 'If we carry on like this, we will end up with more problems.',
        translationVi: 'Nếu cứ tiếp tục thế này, rốt cuộc chúng ta sẽ gặp nhiều vấn đề hơn.',
        explanation: {
          vi: 'Nối âm "carry on", "end up"; nhấn vào on và up.',
          en: 'Link "carry on", "end up"; stress on and up.',
        },
      },
      {
        id: 'l3-g-u6-phrasal-ex12',
        type: 'speak-answer',
        question: 'What can young people do to deal with stress from studying?',
        tipsVi:
          'Part 3: nêu ý kiến + lý do + ví dụ. Dùng 2–3 cụm động từ tự nhiên (deal with, come up with, end up, carry on, point out).',
        sampleAnswer:
          "I think the first step is to come up with a realistic study timetable, with short breaks. Many students try to study all night and end up feeling exhausted. Doctors often point out that sleep and exercise help us deal with stress, so even a short walk in the evening can make a big difference.",
        recordSeconds: 60,
        explanation: {
          vi: 'Câu mẫu có ý kiến, lý do, ví dụ và dùng cụm động từ đúng chỗ.',
          en: 'The sample gives an opinion, reasons and examples with natural phrasal verbs.',
        },
      },
    ],
    miniTest: [],
  },
]
