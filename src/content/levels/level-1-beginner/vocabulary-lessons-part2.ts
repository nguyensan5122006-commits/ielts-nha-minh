/**
 * vocabulary-lessons-part2.ts
 * ----------------------------------------------------------------------------
 * LEVEL 1 (band 0 – 2.0, người mới bắt đầu) — NHÁNH TỪ VỰNG (VOCABULARY), PHẦN 2
 *
 * File này nối tiếp vocabulary-lessons.ts, gồm 5 bài học từ vựng tiếp theo:
 *   6.  l1-vocab-06: Màu sắc & quần áo
 *   7.  l1-vocab-07: Đồ ăn & thức uống cơ bản
 *   8.  l1-vocab-08: Cơ thể & cảm thấy khỏe / ốm
 *   9.  l1-vocab-09: Thời tiết & các mùa
 *   10. l1-vocab-10: Sở thích & hoạt động lúc rảnh rỗi
 *
 * Mỗi bài gồm:
 *   - teachingCards : 2-3 thẻ lý thuyết ngắn (song ngữ Việt/Anh) đọc trước
 *   - words         : 8 từ vựng (phiên âm IPA giọng Anh-Anh, nghĩa, ví dụ, lưu ý)
 *   - exercises     : 10 bài luyện nhiều dạng (chọn đáp án, nối cặp, điền từ,
 *                     xếp câu, nghe-chọn, nghe-gõ, đọc to)
 *   - miniTest      : 6 câu kiểm tra cuối bài (có tính tim ❤)
 *
 * Lưu ý: KHÔNG dùng dạng 'speak-answer' / 'write-answer' trong bài từ vựng vì
 * 2 dạng đó cần AI chấm (tốn lượt gọi API).
 * Kiểu dữ liệu được định nghĩa trong src/content/content-types.ts.
 * ----------------------------------------------------------------------------
 */

import type { Lesson } from '../../content-types'

export const level1VocabularyLessonsPart2: Lesson[] = [
  /* ==========================================================================
   * BÀI 6 — MÀU SẮC & QUẦN ÁO
   * Học tên các màu cơ bản, tên quần áo và cách nói "tôi mặc ...".
   * Điểm ngữ pháp: tính từ màu đứng TRƯỚC danh từ (a red shirt).
   * ======================================================================== */
  {
    id: 'l1-vocab-06',
    skill: 'vocabulary',
    title: { vi: 'Màu sắc & quần áo', en: 'Colours & clothes' },
    description: {
      vi: 'Học tên các màu, tên quần áo và cách nói mình mặc gì.',
      en: 'Learn colours, clothes and how to say what you wear.',
    },
    teachingCards: [
      {
        title: { vi: 'Các màu cơ bản', en: 'Basic colours' },
        body: {
          vi: '**red** = đỏ, **blue** = xanh dương, **green** = xanh lá, **yellow** = vàng\n**black** = đen, **white** = trắng, **brown** = nâu, **pink** = hồng, **grey** = xám\nHỏi màu: **What colour is it?** (Nó màu gì?)\nTrả lời: **It is red.** (Nó màu đỏ.)',
          en: '**red**, **blue**, **green**, **yellow**, **black**, **white**, **brown**, **pink**, **grey**\nAsk: **What colour is it?**\nAnswer: **It is red.**',
        },
        examples: [
          { en: 'What colour is your bag?', vi: 'Cặp của bạn màu gì?' },
          { en: 'It is green.', vi: 'Nó màu xanh lá.' },
        ],
      },
      {
        title: { vi: 'Màu đứng TRƯỚC đồ vật', en: 'Colour comes BEFORE the noun' },
        body: {
          vi: 'Tiếng Việt nói "áo **đỏ**", nhưng tiếng Anh nói **a red shirt** — màu đứng TRƯỚC danh từ.\nĐÚNG: **a red shirt**, **a black hat**\nSAI: a shirt red\nTính từ màu KHÔNG thêm "s": **two red shirts** (không nói "reds shirts").',
          en: 'In English the colour comes BEFORE the noun: **a red shirt**, **a black hat**.\nNot "a shirt red".\nColours never take "s": **two red shirts**.',
        },
        examples: [
          { en: 'I have a red shirt.', vi: 'Tôi có một cái áo sơ mi đỏ.' },
          { en: 'She has two black hats.', vi: 'Cô ấy có hai cái mũ đen.' },
        ],
      },
      {
        title: { vi: 'Quần áo & động từ "wear"', en: 'Clothes & the verb "wear"' },
        body: {
          vi: '**shirt** = áo sơ mi, **T-shirt** = áo phông, **dress** = váy liền, **jacket** = áo khoác\n**trousers** = quần dài, **jeans** = quần bò, **shoes** = giày, **hat** = mũ\n**wear** = mặc, đội, đi (giày) — một từ dùng cho mọi loại quần áo.\nChú ý: **trousers, jeans, shoes** luôn ở số nhiều → dùng **are**: **My shoes are black.**',
          en: '**shirt**, **T-shirt**, **dress**, **jacket**, **trousers**, **jeans**, **shoes**, **hat**\n**wear** is used for all clothes, hats and shoes.\n**Trousers, jeans, shoes** are plural → use **are**: **My shoes are black.**',
        },
        examples: [
          { en: 'I wear a white shirt to school.', vi: 'Tôi mặc áo sơ mi trắng đi học.' },
          { en: 'My jeans are blue.', vi: 'Quần bò của tôi màu xanh.' },
          { en: 'He wears a hat in summer.', vi: 'Anh ấy đội mũ vào mùa hè.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-red',
        word: 'red',
        ipa: '/red/',
        partOfSpeech: 'adjective',
        meaningVi: 'màu đỏ',
        definitionEn: 'The colour of blood or a tomato.',
        examples: [
          { en: 'I like your red dress.', vi: 'Tôi thích chiếc váy đỏ của bạn.' },
          { en: 'The apple is red.', vi: 'Quả táo màu đỏ.' },
        ],
      },
      {
        id: 'l1-w-blue',
        word: 'blue',
        ipa: '/bluː/',
        partOfSpeech: 'adjective',
        meaningVi: 'màu xanh dương (xanh da trời)',
        definitionEn: 'The colour of the sky on a sunny day.',
        examples: [
          { en: 'The sky is blue.', vi: 'Bầu trời màu xanh.' },
          { en: 'He has a blue bike.', vi: 'Anh ấy có một chiếc xe đạp màu xanh dương.' },
        ],
        usageNote: {
          vi: 'Tiếng Việt "xanh" có thể là **blue** (xanh dương) hoặc **green** (xanh lá). Nhớ phân biệt!',
          en: 'Vietnamese "xanh" can be **blue** or **green** — choose the right one.',
        },
      },
      {
        id: 'l1-w-black',
        word: 'black',
        ipa: '/blæk/',
        partOfSpeech: 'adjective',
        meaningVi: 'màu đen',
        definitionEn: 'The darkest colour, like the sky at night.',
        examples: [
          { en: 'My cat is black.', vi: 'Con mèo của tôi màu đen.' },
          { en: 'She wears black shoes.', vi: 'Cô ấy đi giày đen.' },
        ],
      },
      {
        id: 'l1-w-white',
        word: 'white',
        ipa: '/waɪt/',
        partOfSpeech: 'adjective',
        meaningVi: 'màu trắng',
        definitionEn: 'The colour of milk or snow.',
        examples: [
          { en: 'We wear white shirts to school.', vi: 'Chúng tôi mặc áo sơ mi trắng đi học.' },
          { en: 'Milk is white.', vi: 'Sữa màu trắng.' },
        ],
        usageNote: {
          vi: 'Đọc /waɪt/, chữ "h" câm. Nhớ phát âm âm /t/ ở cuối.',
          en: 'The "h" is silent. Say the /t/ at the end.',
        },
      },
      {
        id: 'l1-w-shirt',
        word: 'shirt',
        ipa: '/ʃɜːt/',
        partOfSpeech: 'noun',
        meaningVi: 'áo sơ mi',
        definitionEn: 'A piece of clothing for the top of your body, often with buttons.',
        examples: [
          { en: 'This shirt is too big.', vi: 'Cái áo sơ mi này rộng quá.' },
          { en: 'Dad wears a shirt to work.', vi: 'Bố mặc áo sơ mi đi làm.' },
        ],
        usageNote: {
          vi: '**shirt** = áo sơ mi (có cổ, có cúc); **T-shirt** = áo phông.',
          en: '**shirt** has buttons and a collar; a **T-shirt** does not.',
        },
      },
      {
        id: 'l1-w-trousers',
        word: 'trousers',
        ipa: '/ˈtraʊ.zəz/',
        partOfSpeech: 'noun (plural)',
        meaningVi: 'quần dài',
        definitionEn: 'Clothing that covers your legs, from your waist to your feet.',
        examples: [
          { en: 'My trousers are grey.', vi: 'Quần dài của tôi màu xám.' },
          { en: 'He needs new trousers.', vi: 'Anh ấy cần quần dài mới.' },
        ],
        usageNote: {
          vi: 'Luôn ở số nhiều: nói "my trousers **are**", không nói "my trouser is". (Người Mỹ dùng "pants".)',
          en: 'Always plural: "my trousers **are**". Americans say "pants".',
        },
      },
      {
        id: 'l1-w-shoes',
        word: 'shoes',
        ipa: '/ʃuːz/',
        partOfSpeech: 'noun (plural)',
        meaningVi: 'giày (đôi giày)',
        definitionEn: 'Things you wear on your feet when you go outside.',
        examples: [
          { en: 'Take off your shoes, please.', vi: 'Làm ơn cởi giày ra.' },
          { en: 'These shoes are new.', vi: 'Đôi giày này mới.' },
        ],
        usageNote: {
          vi: 'Một chiếc là **shoe**, một đôi là **shoes** (hoặc a pair of shoes).',
          en: 'One is a **shoe**; two are **shoes** (a pair of shoes).',
        },
      },
      {
        id: 'l1-w-wear',
        word: 'wear',
        ipa: '/weər/',
        partOfSpeech: 'verb',
        meaningVi: 'mặc, đội, đeo, đi (quần áo, mũ, giày)',
        definitionEn: 'To have clothes, shoes or a hat on your body.',
        examples: [
          { en: 'I wear jeans at the weekend.', vi: 'Tôi mặc quần bò vào cuối tuần.' },
          { en: 'She wears glasses.', vi: 'Cô ấy đeo kính.' },
        ],
        usageNote: {
          vi: 'Tiếng Việt có nhiều từ (mặc, đội, đeo, đi), tiếng Anh chỉ cần **wear**. Ngôi thứ 3: he/she **wears**.',
          en: 'One verb for all clothes. He/She **wears**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-06-ex01',
        type: 'multiple-choice',
        question: '"Màu đỏ" in English is...',
        options: ['blue', 'green', 'red', 'yellow'],
        correctIndex: 2,
        explanation: {
          vi: '"red" = màu đỏ. "blue" = xanh dương, "green" = xanh lá, "yellow" = vàng.',
          en: '"red" is the colour of a tomato.',
        },
      },
      {
        id: 'l1-vocab-06-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ tiếng Anh với nghĩa tiếng Việt', en: 'Match the English words with their meanings' },
        pairs: [
          { left: 'red', right: 'màu đỏ' },
          { left: 'blue', right: 'màu xanh dương' },
          { left: 'black', right: 'màu đen' },
          { left: 'white', right: 'màu trắng' },
          { left: 'shoes', right: 'giày' },
          { left: 'shirt', right: 'áo sơ mi' },
        ],
      },
      {
        id: 'l1-vocab-06-ex03',
        type: 'fill-blank',
        sentence: 'I ___ a white shirt to school.',
        acceptedAnswers: ['wear'],
        hint: '(mặc)',
        explanation: {
          vi: '"wear" = mặc. Chủ ngữ "I" nên dùng "wear" (không thêm s).',
          en: 'With "I", use "wear" (no s).',
        },
      },
      {
        id: 'l1-vocab-06-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi có một cái áo sơ mi màu xanh dương.',
        correctSentence: 'I have a blue shirt.',
        extraWords: ['is', 'an'],
        explanation: {
          vi: 'Màu (blue) đứng TRƯỚC đồ vật (shirt): "a blue shirt".',
          en: 'The colour comes before the noun: "a blue shirt".',
        },
      },
      {
        id: 'l1-vocab-06-ex05',
        type: 'listen-choose',
        audioText: 'My shoes are black.',
        question: 'What colour are the shoes? (Đôi giày màu gì?)',
        options: ['Black', 'Brown', 'Blue', 'White'],
        correctIndex: 0,
        explanation: {
          vi: 'Bạn nghe: "My shoes are black." → giày màu đen.',
          en: 'You heard: "My shoes are black."',
        },
      },
      {
        id: 'l1-vocab-06-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I have a shirt red.', 'I have a red shirt.', 'I have red a shirt.', 'I have a shirt is red.'],
        correctIndex: 1,
        explanation: {
          vi: 'Thứ tự đúng: a + màu + đồ vật → "a red shirt".',
          en: 'Correct order: a + colour + noun → "a red shirt".',
        },
      },
      {
        id: 'l1-vocab-06-ex07',
        type: 'listen-type',
        audioText: 'She has a pink dress.',
        acceptedAnswers: ['She has a pink dress.'],
        explanation: {
          vi: '"She has a pink dress." = Cô ấy có một chiếc váy hồng. Chú ý "has" với she.',
          en: 'Note "has" with "she".',
        },
      },
      {
        id: 'l1-vocab-06-ex08',
        type: 'fill-blank',
        sentence: 'My trousers ___ grey.',
        acceptedAnswers: ['are'],
        hint: '(be)',
        explanation: {
          vi: '"trousers" luôn ở số nhiều nên dùng "are": "My trousers are grey."',
          en: '"Trousers" is always plural, so use "are".',
        },
      },
      {
        id: 'l1-vocab-06-ex09',
        type: 'speak-sentence',
        sentence: 'I like your green jacket.',
        translationVi: 'Tôi thích cái áo khoác xanh lá của bạn.',
      },
      {
        id: 'l1-vocab-06-ex10',
        type: 'arrange-words',
        translationVi: 'Đôi giày của tôi màu trắng.',
        correctSentence: 'My shoes are white.',
        extraWords: ['a', 'wear'],
        explanation: {
          vi: '"shoes" là số nhiều nên dùng "are".',
          en: '"Shoes" is plural, so we use "are".',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-06-test01',
        type: 'multiple-choice',
        question: 'Which one is NOT a colour?',
        options: ['brown', 'grey', 'dress', 'pink'],
        correctIndex: 2,
        explanation: {
          vi: '"dress" = váy liền (quần áo), không phải màu. brown = nâu, grey = xám, pink = hồng.',
          en: '"dress" is a piece of clothing, not a colour.',
        },
      },
      {
        id: 'l1-vocab-06-test02',
        type: 'fill-blank',
        sentence: 'What ___ is your bag? – It is blue.',
        acceptedAnswers: ['colour', 'color'],
        explanation: {
          vi: '"What colour is ...?" = ... màu gì? (Anh-Anh viết "colour", Anh-Mỹ viết "color".)',
          en: '"What colour is ...?" asks about colour. US spelling: "color".',
        },
      },
      {
        id: 'l1-vocab-06-test03',
        type: 'listen-choose',
        audioText: 'Tom is wearing a black jacket and blue jeans.',
        question: "What colour is Tom's jacket? (Áo khoác của Tom màu gì?)",
        options: ['Blue', 'White', 'Brown', 'Black'],
        correctIndex: 3,
        explanation: {
          vi: '"a black jacket" → áo khoác đen. Màu xanh (blue) là của quần bò (jeans).',
          en: 'The jacket is black; the jeans are blue.',
        },
      },
      {
        id: 'l1-vocab-06-test04',
        type: 'match-pairs',
        instruction: { vi: 'Nối tên quần áo với nghĩa', en: 'Match the clothes with their meanings' },
        pairs: [
          { left: 'shirt', right: 'áo sơ mi' },
          { left: 'trousers', right: 'quần dài' },
          { left: 'shoes', right: 'giày' },
          { left: 'dress', right: 'váy liền' },
          { left: 'hat', right: 'mũ' },
        ],
      },
      {
        id: 'l1-vocab-06-test05',
        type: 'arrange-words',
        translationVi: 'Bạn mặc gì đi học?',
        correctSentence: 'What do you wear to school?',
        extraWords: ['is', 'colour'],
        explanation: {
          vi: 'Câu hỏi: What + do + you + wear ...?',
          en: 'Question form: What + do + you + wear ...?',
        },
      },
      {
        id: 'l1-vocab-06-test06',
        type: 'multiple-choice',
        question: 'Black + white = ...',
        options: ['grey', 'green', 'pink', 'brown'],
        correctIndex: 0,
        explanation: {
          vi: 'Trộn đen và trắng được màu xám = "grey".',
          en: 'Black and white make grey.',
        },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 7 — ĐỒ ĂN & THỨC UỐNG CƠ BẢN
   * Học tên món ăn, đồ uống quen thuộc, cách nói đói/khát, thích/không thích,
   * và cách dùng "a / an" trước danh từ đếm được.
   * ======================================================================== */
  {
    id: 'l1-vocab-07',
    skill: 'vocabulary',
    title: { vi: 'Đồ ăn & thức uống', en: 'Food & drinks' },
    description: {
      vi: 'Học tên đồ ăn, đồ uống cơ bản và cách nói mình thích ăn gì.',
      en: 'Learn basic food and drink words and how to say what you like.',
    },
    teachingCards: [
      {
        title: { vi: 'Đồ ăn & đồ uống', en: 'Food & drinks' },
        body: {
          vi: 'Đồ ăn: **rice** (cơm, gạo), **bread** (bánh mì), **egg** (trứng), **chicken** (thịt gà), **fish** (cá), **fruit** (trái cây), **noodles** (mì, phở, bún)\nĐồ uống: **water** (nước), **milk** (sữa), **tea** (trà), **coffee** (cà phê), **juice** (nước ép)',
          en: 'Food: **rice**, **bread**, **egg**, **chicken**, **fish**, **fruit**, **noodles**\nDrinks: **water**, **milk**, **tea**, **coffee**, **juice**',
        },
        examples: [
          { en: 'I eat rice every day.', vi: 'Tôi ăn cơm mỗi ngày.' },
          { en: 'She drinks milk in the morning.', vi: 'Cô ấy uống sữa vào buổi sáng.' },
        ],
      },
      {
        title: { vi: '"a" hay "an"?', en: '"a" or "an"?' },
        body: {
          vi: 'Dùng **an** trước từ bắt đầu bằng **âm** nguyên âm (a, e, i, o, u): **an egg**, **an apple**, **an orange**.\nDùng **a** trước các âm còn lại: **a banana**, **a sandwich**, **a cup of tea**.\nNước, sữa, cơm... KHÔNG đếm được → không dùng a/an, dùng **some**: **some water**, **some rice**.',
          en: 'Use **an** before a vowel sound: **an egg**, **an apple**.\nUse **a** before other sounds: **a banana**, **a cup of tea**.\nWater, milk, rice... are not counted → use **some**: **some water**.',
        },
        examples: [
          { en: 'I have an egg and a banana.', vi: 'Tôi có một quả trứng và một quả chuối.' },
          { en: 'Can I have some water, please?', vi: 'Cho tôi xin ít nước được không?' },
        ],
      },
      {
        title: { vi: 'Đói, khát & thích, không thích', en: 'Hungry, thirsty & likes' },
        body: {
          vi: '**I am hungry.** = Tôi đói. **I am thirsty.** = Tôi khát.\n**I like ...** = Tôi thích ... / **I don\'t like ...** = Tôi không thích ...\nHỏi: **Do you like fish?** → **Yes, I do.** / **No, I don\'t.**',
          en: '**I am hungry.** / **I am thirsty.**\n**I like ...** / **I don\'t like ...**\nAsk: **Do you like fish?** → **Yes, I do.** / **No, I don\'t.**',
        },
        examples: [
          { en: "I'm hungry. Let's eat.", vi: 'Tôi đói rồi. Ăn thôi.' },
          { en: "I don't like coffee.", vi: 'Tôi không thích cà phê.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-rice',
        word: 'rice',
        ipa: '/raɪs/',
        partOfSpeech: 'noun',
        meaningVi: 'cơm, gạo',
        definitionEn: 'Small white or brown grains that you cook and eat.',
        examples: [
          { en: 'We eat rice for dinner.', vi: 'Chúng tôi ăn cơm vào bữa tối.' },
          { en: 'Vietnam grows a lot of rice.', vi: 'Việt Nam trồng rất nhiều lúa gạo.' },
        ],
        usageNote: {
          vi: 'Không đếm được: nói "some rice", không nói "a rice" hay "rices".',
          en: 'Uncountable: "some rice", not "a rice".',
        },
      },
      {
        id: 'l1-w-bread',
        word: 'bread',
        ipa: '/bred/',
        partOfSpeech: 'noun',
        meaningVi: 'bánh mì',
        definitionEn: 'A food made from flour, water and yeast, then baked.',
        examples: [
          { en: 'I have bread and eggs for breakfast.', vi: 'Tôi ăn bánh mì và trứng vào bữa sáng.' },
          { en: 'This bread is very soft.', vi: 'Bánh mì này rất mềm.' },
        ],
        usageNote: {
          vi: 'Không đếm được: "some bread" hoặc "a piece of bread". Đọc /bred/, không phải "bờ-rít".',
          en: 'Uncountable: "some bread", "a piece of bread".',
        },
      },
      {
        id: 'l1-w-egg',
        word: 'egg',
        ipa: '/eɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'quả trứng',
        definitionEn: 'A round food that comes from a chicken.',
        examples: [
          { en: 'I eat an egg every morning.', vi: 'Sáng nào tôi cũng ăn một quả trứng.' },
          { en: 'Mum buys ten eggs.', vi: 'Mẹ mua mười quả trứng.' },
        ],
        usageNote: { vi: 'Nói "**an** egg" vì "egg" bắt đầu bằng nguyên âm.', en: 'Say "**an** egg".' },
      },
      {
        id: 'l1-w-chicken',
        word: 'chicken',
        ipa: '/ˈtʃɪk.ɪn/',
        partOfSpeech: 'noun',
        meaningVi: 'con gà; thịt gà',
        definitionEn: 'A farm bird, or the meat from this bird.',
        examples: [
          { en: 'I like chicken and rice.', vi: 'Tôi thích cơm gà.' },
          { en: 'My grandma has five chickens.', vi: 'Bà tôi nuôi năm con gà.' },
        ],
      },
      {
        id: 'l1-w-fruit',
        word: 'fruit',
        ipa: '/fruːt/',
        partOfSpeech: 'noun',
        meaningVi: 'trái cây, hoa quả',
        definitionEn: 'Sweet food that grows on trees or plants, like apples and bananas.',
        examples: [
          { en: 'Fruit is good for you.', vi: 'Trái cây tốt cho sức khỏe.' },
          { en: 'Do you like fruit?', vi: 'Bạn có thích trái cây không?' },
        ],
        usageNote: {
          vi: 'Thường dùng không đếm được: "I eat a lot of fruit" (không cần "fruits"). Chữ "i" câm: /fruːt/.',
          en: 'Usually uncountable: "a lot of fruit". The "i" is silent.',
        },
      },
      {
        id: 'l1-w-water',
        word: 'water',
        ipa: '/ˈwɔː.tər/',
        partOfSpeech: 'noun',
        meaningVi: 'nước',
        definitionEn: 'The clear liquid that you drink and that falls as rain.',
        examples: [
          { en: 'Can I have some water, please?', vi: 'Cho tôi xin ít nước nhé?' },
          { en: 'Drink a lot of water every day.', vi: 'Hãy uống nhiều nước mỗi ngày.' },
        ],
      },
      {
        id: 'l1-w-coffee',
        word: 'coffee',
        ipa: '/ˈkɒf.i/',
        partOfSpeech: 'noun',
        meaningVi: 'cà phê',
        definitionEn: 'A hot or cold brown drink made from coffee beans.',
        examples: [
          { en: 'My dad drinks coffee every morning.', vi: 'Bố tôi uống cà phê mỗi sáng.' },
          { en: 'A coffee with milk, please.', vi: 'Cho tôi một ly cà phê sữa.' },
        ],
        usageNote: {
          vi: 'Trọng âm ở âm đầu: **COF**-fee. Khi gọi món có thể nói "a coffee" (một ly cà phê).',
          en: 'Stress the first part: **COF**-fee. In a café you can say "a coffee".',
        },
      },
      {
        id: 'l1-w-hungry',
        word: 'hungry',
        ipa: '/ˈhʌŋ.ɡri/',
        partOfSpeech: 'adjective',
        meaningVi: 'đói',
        definitionEn: 'Wanting or needing food.',
        examples: [
          { en: 'I am very hungry.', vi: 'Tôi rất đói.' },
          { en: 'Are you hungry?', vi: 'Bạn có đói không?' },
        ],
        usageNote: {
          vi: 'Nói "I **am** hungry" (có "am"), không nói "I hungry". Khát = **thirsty**.',
          en: 'Say "I **am** hungry", not "I hungry". For drinks: **thirsty**.',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-07-ex01',
        type: 'multiple-choice',
        question: '"Cơm" in English is...',
        options: ['bread', 'rice', 'egg', 'milk'],
        correctIndex: 1,
        explanation: { vi: '"rice" = cơm, gạo. "bread" = bánh mì.', en: '"rice" is the grain we cook and eat.' },
      },
      {
        id: 'l1-vocab-07-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối đồ ăn, đồ uống với nghĩa', en: 'Match the food and drinks with their meanings' },
        pairs: [
          { left: 'bread', right: 'bánh mì' },
          { left: 'egg', right: 'trứng' },
          { left: 'chicken', right: 'thịt gà' },
          { left: 'fruit', right: 'trái cây' },
          { left: 'water', right: 'nước' },
          { left: 'coffee', right: 'cà phê' },
        ],
      },
      {
        id: 'l1-vocab-07-ex03',
        type: 'fill-blank',
        sentence: 'I am ___. Can I have some food?',
        acceptedAnswers: ['hungry'],
        hint: '(đói)',
        explanation: { vi: '"hungry" = đói → muốn ăn.', en: '"hungry" means you want food.' },
      },
      {
        id: 'l1-vocab-07-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi thích cơm và gà.',
        correctSentence: 'I like rice and chicken.',
        extraWords: ['likes', 'an'],
        explanation: {
          vi: 'Với "I" dùng "like" (không có s).',
          en: 'With "I", use "like" without s.',
        },
      },
      {
        id: 'l1-vocab-07-ex05',
        type: 'listen-choose',
        audioText: 'Anna: What do you want to drink? Tom: Orange juice, please.',
        question: 'What does Tom want? (Tom muốn uống gì?)',
        options: ['Water', 'Milk', 'Coffee', 'Orange juice'],
        correctIndex: 3,
        explanation: { vi: 'Tom nói: "Orange juice, please." = Cho tôi nước cam.', en: 'Tom says, "Orange juice, please."' },
      },
      {
        id: 'l1-vocab-07-ex06',
        type: 'multiple-choice',
        question: 'Which one is a drink?',
        options: ['tea', 'bread', 'egg', 'rice'],
        correctIndex: 0,
        explanation: { vi: '"tea" (trà) là đồ uống. Các từ còn lại là đồ ăn.', en: '"tea" is a drink; the others are food.' },
      },
      {
        id: 'l1-vocab-07-ex07',
        type: 'listen-type',
        audioText: 'I eat an egg for breakfast.',
        acceptedAnswers: ['I eat an egg for breakfast.'],
        explanation: {
          vi: '"I eat an egg for breakfast." = Tôi ăn một quả trứng vào bữa sáng. Chú ý "an" trước "egg".',
          en: 'Note "an" before "egg".',
        },
      },
      {
        id: 'l1-vocab-07-ex08',
        type: 'fill-blank',
        sentence: 'I would like ___ apple, please.',
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: {
          vi: '"apple" bắt đầu bằng nguyên âm "a" → dùng "an".',
          en: '"apple" starts with a vowel sound → "an".',
        },
      },
      {
        id: 'l1-vocab-07-ex09',
        type: 'speak-sentence',
        sentence: 'I am thirsty. Can I have some water, please?',
        translationVi: 'Tôi khát. Cho tôi xin ít nước được không?',
      },
      {
        id: 'l1-vocab-07-ex10',
        type: 'arrange-words',
        translationVi: 'Bạn có thích trái cây không?',
        correctSentence: 'Do you like fruit?',
        extraWords: ['does', 'is'],
        explanation: { vi: 'Câu hỏi với "you": Do + you + like ...?', en: 'Question with "you": Do + you + like ...?' },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-07-test01',
        type: 'multiple-choice',
        question: 'You want to drink something. You are...',
        options: ['hungry', 'tired', 'thirsty', 'cold'],
        correctIndex: 2,
        explanation: { vi: '"thirsty" = khát (muốn uống). "hungry" = đói (muốn ăn).', en: '"thirsty" means you want a drink.' },
      },
      {
        id: 'l1-vocab-07-test02',
        type: 'fill-blank',
        sentence: 'I have ___ egg every morning.',
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: { vi: '"egg" bắt đầu bằng nguyên âm → "an egg".', en: 'Vowel sound → "an egg".' },
      },
      {
        id: 'l1-vocab-07-test03',
        type: 'listen-choose',
        audioText: "Mai: I don't like coffee. I like tea with milk.",
        question: 'What does Mai like? (Mai thích gì?)',
        options: ['Coffee', 'Tea with milk', 'Milk only', 'Water'],
        correctIndex: 1,
        explanation: {
          vi: 'Mai nói không thích cà phê, thích "tea with milk" (trà sữa).',
          en: 'Mai does not like coffee; she likes tea with milk.',
        },
      },
      {
        id: 'l1-vocab-07-test04',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'rice', right: 'cơm' },
          { left: 'milk', right: 'sữa' },
          { left: 'tea', right: 'trà' },
          { left: 'hungry', right: 'đói' },
          { left: 'thirsty', right: 'khát' },
        ],
      },
      {
        id: 'l1-vocab-07-test05',
        type: 'arrange-words',
        translationVi: 'Tôi không thích cà phê.',
        correctSentence: "I don't like coffee.",
        extraWords: ["doesn't", 'am'],
        explanation: { vi: 'Phủ định với "I": I + don\'t + like ...', en: 'Negative with "I": I + don\'t + like ...' },
      },
      {
        id: 'l1-vocab-07-test06',
        type: 'multiple-choice',
        question: 'Which word means "trái cây"?',
        options: ['chicken', 'water', 'rice', 'fruit'],
        correctIndex: 3,
        explanation: { vi: '"fruit" = trái cây, hoa quả.', en: '"fruit" means apples, bananas, oranges...' },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 8 — CƠ THỂ & SỨC KHỎE
   * Học các bộ phận cơ thể và cách nói mình khỏe, mệt, ốm, bị đau ở đâu.
   * ======================================================================== */
  {
    id: 'l1-vocab-08',
    skill: 'vocabulary',
    title: { vi: 'Cơ thể & sức khỏe', en: 'The body & feeling well or ill' },
    description: {
      vi: 'Học tên các bộ phận cơ thể và cách nói mình khỏe hay ốm.',
      en: 'Learn parts of the body and how to say you feel well or ill.',
    },
    teachingCards: [
      {
        title: { vi: 'Các bộ phận cơ thể', en: 'Parts of the body' },
        body: {
          vi: '**head** = đầu, **eye** = mắt, **ear** = tai, **nose** = mũi, **mouth** = miệng\n**hand** = bàn tay, **arm** = cánh tay, **leg** = chân, **foot** = bàn chân, **stomach** = bụng\nSố nhiều thêm **s**: two eyes, two hands.\nĐặc biệt: **foot → feet**, **tooth → teeth**.',
          en: '**head**, **eye**, **ear**, **nose**, **mouth**, **hand**, **arm**, **leg**, **foot**, **stomach**\nPlural: add **s** — two eyes, two hands.\nSpecial: **foot → feet**, **tooth → teeth**.',
        },
        examples: [
          { en: 'I have two eyes and two ears.', vi: 'Tôi có hai mắt và hai tai.' },
          { en: 'My feet are cold.', vi: 'Chân tôi bị lạnh.' },
        ],
      },
      {
        title: { vi: 'Bạn thấy thế nào?', en: 'How do you feel?' },
        body: {
          vi: 'Hỏi: **How are you?** / **Are you OK?**\nKhỏe: **I\'m fine.** / **I\'m well.**\nKhông khỏe: **I\'m ill.** / **I\'m sick.** (ốm) — **I\'m tired.** (mệt)\n**I don\'t feel well.** = Tôi thấy không khỏe.',
          en: 'Ask: **How are you?** / **Are you OK?**\nWell: **I\'m fine.** / **I\'m well.**\nNot well: **I\'m ill.** / **I\'m sick.** — **I\'m tired.**\n**I don\'t feel well.**',
        },
        examples: [
          { en: "Are you OK? – No, I'm ill.", vi: 'Bạn ổn không? – Không, mình bị ốm.' },
          { en: "I'm very tired today.", vi: 'Hôm nay tôi rất mệt.' },
        ],
      },
      {
        title: { vi: 'Nói chỗ bị đau', en: 'Saying where it hurts' },
        body: {
          vi: 'Cách 1: **My + bộ phận + hurts.** → **My leg hurts.** (Chân tôi đau.)\nCách 2: **I have a + bệnh.** → **I have a headache** (đau đầu), **a stomachache** (đau bụng), **a cold** (cảm lạnh).\nLời khuyên: **Go to the doctor.** (Đi khám bác sĩ đi.)',
          en: 'Way 1: **My + body part + hurts.** → **My leg hurts.**\nWay 2: **I have a ...** → **a headache**, **a stomachache**, **a cold**.\nAdvice: **Go to the doctor.**',
        },
        examples: [
          { en: 'My head hurts.', vi: 'Đầu tôi đau.' },
          { en: 'I have a cold.', vi: 'Tôi bị cảm lạnh.' },
          { en: 'You are ill. Go to the doctor.', vi: 'Bạn ốm rồi. Đi khám bác sĩ đi.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-head',
        word: 'head',
        ipa: '/hed/',
        partOfSpeech: 'noun',
        meaningVi: 'cái đầu',
        definitionEn: 'The top part of your body, with your eyes, nose and mouth.',
        examples: [
          { en: 'My head hurts.', vi: 'Đầu tôi đau.' },
          { en: 'He wears a hat on his head.', vi: 'Anh ấy đội mũ trên đầu.' },
        ],
        usageNote: { vi: 'Đau đầu = **headache** /ˈhed.eɪk/.', en: 'A pain in your head = a **headache**.' },
      },
      {
        id: 'l1-w-hand',
        word: 'hand',
        ipa: '/hænd/',
        partOfSpeech: 'noun',
        meaningVi: 'bàn tay',
        definitionEn: 'The part at the end of your arm, with five fingers.',
        examples: [
          { en: 'Wash your hands before you eat.', vi: 'Rửa tay trước khi ăn.' },
          { en: 'Put up your hand.', vi: 'Hãy giơ tay lên.' },
        ],
        usageNote: {
          vi: '**hand** = bàn tay; **arm** = cánh tay. Tiếng Việt gọi chung là "tay".',
          en: '**hand** has fingers; the **arm** is the long part.',
        },
      },
      {
        id: 'l1-w-eye',
        word: 'eye',
        ipa: '/aɪ/',
        partOfSpeech: 'noun',
        meaningVi: 'mắt',
        definitionEn: 'One of the two parts of your face that you see with.',
        examples: [
          { en: 'She has brown eyes.', vi: 'Cô ấy có đôi mắt nâu.' },
          { en: 'Close your eyes.', vi: 'Nhắm mắt lại.' },
        ],
        usageNote: { vi: 'Đọc giống chữ "I" /aɪ/.', en: 'Sounds the same as "I".' },
      },
      {
        id: 'l1-w-leg',
        word: 'leg',
        ipa: '/leɡ/',
        partOfSpeech: 'noun',
        meaningVi: 'chân (cẳng chân, cả chân)',
        definitionEn: 'One of the two long parts of your body that you walk with.',
        examples: [
          { en: 'My leg hurts after football.', vi: 'Chân tôi đau sau khi đá bóng.' },
          { en: 'A dog has four legs.', vi: 'Con chó có bốn chân.' },
        ],
        usageNote: {
          vi: '**leg** = cả chân; **foot** (số nhiều **feet**) = bàn chân.',
          en: '**leg** is the whole leg; **foot/feet** is the part you stand on.',
        },
      },
      {
        id: 'l1-w-ill',
        word: 'ill',
        ipa: '/ɪl/',
        partOfSpeech: 'adjective',
        meaningVi: 'ốm, bệnh',
        definitionEn: 'Not well; not healthy.',
        examples: [
          { en: "I'm ill today, so I can't go to school.", vi: 'Hôm nay tôi ốm nên không đi học được.' },
          { en: 'My brother is ill.', vi: 'Em trai tôi bị ốm.' },
        ],
        usageNote: {
          vi: '**ill** và **sick** đều nghĩa là ốm. Dùng sau "be": "I am ill".',
          en: '**ill** and **sick** mean the same. Use after "be": "I am ill".',
        },
      },
      {
        id: 'l1-w-tired',
        word: 'tired',
        ipa: '/taɪəd/',
        partOfSpeech: 'adjective',
        meaningVi: 'mệt',
        definitionEn: 'Feeling that you want to rest or sleep.',
        examples: [
          { en: "I'm tired. I want to sleep.", vi: 'Tôi mệt. Tôi muốn ngủ.' },
          { en: 'Mum is tired after work.', vi: 'Mẹ mệt sau giờ làm.' },
        ],
      },
      {
        id: 'l1-w-hurt',
        word: 'hurt',
        ipa: '/hɜːt/',
        partOfSpeech: 'verb',
        meaningVi: 'đau, làm đau',
        definitionEn: 'To feel pain in a part of your body.',
        examples: [
          { en: 'My eyes hurt.', vi: 'Mắt tôi đau.' },
          { en: 'Does your arm hurt?', vi: 'Tay bạn có đau không?' },
        ],
        usageNote: {
          vi: 'Một bộ phận → **hurts** (My leg hurts). Nhiều bộ phận → **hurt** (My feet hurt).',
          en: 'One part → **hurts**. Two or more → **hurt**.',
        },
      },
      {
        id: 'l1-w-doctor',
        word: 'doctor',
        ipa: '/ˈdɒk.tər/',
        partOfSpeech: 'noun',
        meaningVi: 'bác sĩ',
        definitionEn: 'A person whose job is to help ill people get better.',
        examples: [
          { en: 'You are ill. Go to the doctor.', vi: 'Bạn ốm rồi. Đi khám bác sĩ đi.' },
          { en: 'My aunt is a doctor.', vi: 'Cô tôi là bác sĩ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-08-ex01',
        type: 'multiple-choice',
        question: '"Cái đầu" in English is...',
        options: ['hand', 'leg', 'head', 'eye'],
        correctIndex: 2,
        explanation: { vi: '"head" = đầu. "hand" = bàn tay — hai từ dễ nhầm!', en: '"head" is at the top of your body.' },
      },
      {
        id: 'l1-vocab-08-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'head', right: 'đầu' },
          { left: 'hand', right: 'bàn tay' },
          { left: 'eye', right: 'mắt' },
          { left: 'leg', right: 'chân' },
          { left: 'doctor', right: 'bác sĩ' },
          { left: 'tired', right: 'mệt' },
        ],
      },
      {
        id: 'l1-vocab-08-ex03',
        type: 'fill-blank',
        sentence: "My leg ___. I can't walk.",
        acceptedAnswers: ['hurts'],
        hint: '(đau)',
        explanation: {
          vi: '"My leg" là một bộ phận → "hurts" (có s).',
          en: 'One body part → "hurts".',
        },
      },
      {
        id: 'l1-vocab-08-ex04',
        type: 'arrange-words',
        translationVi: 'Hôm nay tôi bị ốm.',
        correctSentence: 'I am ill today.',
        extraWords: ['is', 'my'],
        explanation: { vi: 'I + am + ill: không bỏ "am".', en: 'I + am + ill — don\'t forget "am".' },
      },
      {
        id: 'l1-vocab-08-ex05',
        type: 'listen-choose',
        audioText: 'Nam: I have a headache.',
        question: "What is wrong with Nam? (Nam bị sao?)",
        options: ['His head hurts.', 'His leg hurts.', 'His eyes hurt.', 'His hand hurts.'],
        correctIndex: 0,
        explanation: {
          vi: '"headache" = đau đầu → đầu của Nam bị đau.',
          en: '"headache" means a pain in your head.',
        },
      },
      {
        id: 'l1-vocab-08-ex06',
        type: 'multiple-choice',
        question: 'We see with our...',
        options: ['ears', 'eyes', 'hands', 'legs'],
        correctIndex: 1,
        explanation: { vi: 'Chúng ta nhìn bằng mắt = "eyes".', en: 'We see with our eyes.' },
      },
      {
        id: 'l1-vocab-08-ex07',
        type: 'listen-type',
        audioText: 'I am tired. I want to sleep.',
        acceptedAnswers: ['I am tired. I want to sleep.', "I'm tired. I want to sleep."],
        explanation: { vi: '"I am tired" = Tôi mệt.', en: '"tired" means you need rest.' },
      },
      {
        id: 'l1-vocab-08-ex08',
        type: 'fill-blank',
        sentence: 'You are ill. Go to the ___.',
        acceptedAnswers: ['doctor', "doctor's"],
        hint: '(bác sĩ)',
        explanation: { vi: '"Go to the doctor" = Đi khám bác sĩ.', en: '"Go to the doctor" when you are ill.' },
      },
      {
        id: 'l1-vocab-08-ex09',
        type: 'speak-sentence',
        sentence: "I don't feel well. My stomach hurts.",
        translationVi: 'Tôi thấy không khỏe. Bụng tôi đau.',
      },
      {
        id: 'l1-vocab-08-ex10',
        type: 'arrange-words',
        translationVi: 'Tay tôi bị đau.',
        correctSentence: 'My hand hurts.',
        extraWords: ['am', 'I'],
        explanation: { vi: 'Cấu trúc: My + bộ phận + hurts.', en: 'Pattern: My + body part + hurts.' },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-08-test01',
        type: 'multiple-choice',
        question: "How are you? – I'm ___. I have a cold.",
        options: ['fine', 'well', 'ill', 'happy'],
        correctIndex: 2,
        explanation: {
          vi: 'Bị cảm lạnh (a cold) → không khỏe → "ill". "fine/well" = khỏe.',
          en: 'You have a cold, so you are ill.',
        },
      },
      {
        id: 'l1-vocab-08-test02',
        type: 'fill-blank',
        sentence: 'One foot, two ___.',
        acceptedAnswers: ['feet'],
        explanation: { vi: 'Số nhiều đặc biệt: foot → feet.', en: 'Irregular plural: foot → feet.' },
      },
      {
        id: 'l1-vocab-08-test03',
        type: 'listen-choose',
        audioText: "Doctor: Hello, Lisa. What's wrong? Lisa: My eyes hurt and I am very tired.",
        question: 'What hurts? (Lisa bị đau ở đâu?)',
        options: ['Her head', 'Her legs', 'Her hands', 'Her eyes'],
        correctIndex: 3,
        explanation: { vi: 'Lisa nói: "My eyes hurt" = Mắt tôi đau.', en: 'Lisa says, "My eyes hurt."' },
      },
      {
        id: 'l1-vocab-08-test04',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'hurt', right: 'đau' },
          { left: 'ill', right: 'ốm' },
          { left: 'tired', right: 'mệt' },
          { left: 'headache', right: 'đau đầu' },
          { left: 'well', right: 'khỏe' },
        ],
      },
      {
        id: 'l1-vocab-08-test05',
        type: 'arrange-words',
        translationVi: 'Tôi bị đau đầu.',
        correctSentence: 'I have a headache.',
        extraWords: ['am', 'an'],
        explanation: { vi: 'Dùng "have a" + bệnh: I have a headache.', en: 'Use "have a": I have a headache.' },
      },
      {
        id: 'l1-vocab-08-test06',
        type: 'multiple-choice',
        question: 'Which word is a part of the body?',
        options: ['doctor', 'leg', 'tired', 'ill'],
        correctIndex: 1,
        explanation: { vi: '"leg" (chân) là bộ phận cơ thể.', en: '"leg" is a part of the body.' },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 9 — THỜI TIẾT & CÁC MÙA
   * Học hỏi – đáp về thời tiết (It's sunny / rainy...) và tên 4 mùa.
   * Điểm ngữ pháp: dùng "It" làm chủ ngữ khi nói về thời tiết; "in" + mùa.
   * ======================================================================== */
  {
    id: 'l1-vocab-09',
    skill: 'vocabulary',
    title: { vi: 'Thời tiết & các mùa', en: 'Weather & seasons' },
    description: {
      vi: 'Học cách hỏi và nói về thời tiết, tên các mùa trong năm.',
      en: 'Learn to ask and talk about the weather and the seasons.',
    },
    teachingCards: [
      {
        title: { vi: 'Hỏi về thời tiết', en: 'Asking about the weather' },
        body: {
          vi: 'Hỏi: **What\'s the weather like today?** (Hôm nay thời tiết thế nào?)\nTrả lời luôn bắt đầu bằng **It**: **It\'s sunny.** (Trời nắng.)\n**sunny** = nắng, **rainy** = mưa, **cloudy** = nhiều mây, **windy** = có gió\n**hot** = nóng, **warm** = ấm, **cool** = mát, **cold** = lạnh',
          en: 'Ask: **What\'s the weather like today?**\nAnswer with **It**: **It\'s sunny.**\n**sunny**, **rainy**, **cloudy**, **windy**\n**hot**, **warm**, **cool**, **cold**',
        },
        examples: [
          { en: "What's the weather like today?", vi: 'Hôm nay thời tiết thế nào?' },
          { en: "It's hot and sunny.", vi: 'Trời nóng và nắng.' },
        ],
      },
      {
        title: { vi: 'Mưa: "rain" và "raining"', en: 'Rain: "rain" and "raining"' },
        body: {
          vi: 'Trời đang mưa (ngay bây giờ): **It\'s raining.**\nTrời hay mưa (thói quen): **It often rains in summer.**\nĐừng nói "It is rain". Tính từ là **rainy**: **a rainy day** (một ngày mưa).',
          en: 'Right now: **It\'s raining.**\nUsually: **It often rains in summer.**\nNot "It is rain". The adjective is **rainy**: **a rainy day**.',
        },
        examples: [
          { en: "Take an umbrella. It's raining.", vi: 'Mang ô đi. Trời đang mưa.' },
          { en: 'It often rains in September.', vi: 'Tháng Chín trời hay mưa.' },
        ],
      },
      {
        title: { vi: 'Bốn mùa', en: 'The four seasons' },
        body: {
          vi: '**spring** = mùa xuân, **summer** = mùa hè, **autumn** = mùa thu, **winter** = mùa đông\nDùng **in** trước mùa: **in summer**, **in winter**.\nMiền Nam Việt Nam có 2 mùa: **the rainy season** (mùa mưa) và **the dry season** (mùa khô).',
          en: '**spring**, **summer**, **autumn**, **winter**\nUse **in**: **in summer**, **in winter**.\nSouthern Vietnam has **the rainy season** and **the dry season**.',
        },
        examples: [
          { en: 'It is cold in winter.', vi: 'Mùa đông trời lạnh.' },
          { en: 'I go to the beach in summer.', vi: 'Tôi đi biển vào mùa hè.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-weather',
        word: 'weather',
        ipa: '/ˈweð.ər/',
        partOfSpeech: 'noun',
        meaningVi: 'thời tiết',
        definitionEn: 'How hot, cold, sunny or rainy it is outside.',
        examples: [
          { en: 'The weather is nice today.', vi: 'Hôm nay thời tiết đẹp.' },
          { en: "What's the weather like in Da Lat?", vi: 'Thời tiết ở Đà Lạt thế nào?' },
        ],
        usageNote: {
          vi: 'Không đếm được: không nói "a weather". Âm "th" ở đây là /ð/ (rung).',
          en: 'Uncountable: not "a weather".',
        },
      },
      {
        id: 'l1-w-sunny',
        word: 'sunny',
        ipa: '/ˈsʌn.i/',
        partOfSpeech: 'adjective',
        meaningVi: 'có nắng',
        definitionEn: 'With a lot of light from the sun.',
        examples: [
          { en: "It's sunny today.", vi: 'Hôm nay trời nắng.' },
          { en: 'We play outside on sunny days.', vi: 'Chúng tôi chơi ngoài trời vào những ngày nắng.' },
        ],
      },
      {
        id: 'l1-w-rain',
        word: 'rain',
        ipa: '/reɪn/',
        partOfSpeech: 'noun, verb',
        meaningVi: 'mưa; trời mưa',
        definitionEn: 'Water that falls from the clouds.',
        examples: [
          { en: "It's raining now.", vi: 'Bây giờ trời đang mưa.' },
          { en: 'I like the sound of rain.', vi: 'Tôi thích tiếng mưa.' },
        ],
        usageNote: {
          vi: 'Động từ: **It rains / It\'s raining.** Tính từ: **rainy**.',
          en: 'Verb: **It rains / It\'s raining.** Adjective: **rainy**.',
        },
      },
      {
        id: 'l1-w-hot',
        word: 'hot',
        ipa: '/hɒt/',
        partOfSpeech: 'adjective',
        meaningVi: 'nóng',
        definitionEn: 'Having a high temperature.',
        examples: [
          { en: 'It is very hot in June.', vi: 'Tháng Sáu trời rất nóng.' },
          { en: 'This tea is hot.', vi: 'Trà này nóng.' },
        ],
      },
      {
        id: 'l1-w-cold',
        word: 'cold',
        ipa: '/kəʊld/',
        partOfSpeech: 'adjective',
        meaningVi: 'lạnh',
        definitionEn: 'Having a low temperature.',
        examples: [
          { en: 'It is cold in winter.', vi: 'Mùa đông trời lạnh.' },
          { en: 'I want a cold drink.', vi: 'Tôi muốn một đồ uống lạnh.' },
        ],
        usageNote: {
          vi: '"a cold" (danh từ) còn có nghĩa là bệnh cảm lạnh: "I have a cold."',
          en: '"a cold" (noun) is also a small illness: "I have a cold."',
        },
      },
      {
        id: 'l1-w-windy',
        word: 'windy',
        ipa: '/ˈwɪn.di/',
        partOfSpeech: 'adjective',
        meaningVi: 'có gió, nhiều gió',
        definitionEn: 'With a lot of wind.',
        examples: [
          { en: "It's windy at the beach.", vi: 'Ở bãi biển gió nhiều.' },
          { en: 'It is cold and windy today.', vi: 'Hôm nay trời lạnh và có gió.' },
        ],
      },
      {
        id: 'l1-w-summer',
        word: 'summer',
        ipa: '/ˈsʌm.ər/',
        partOfSpeech: 'noun',
        meaningVi: 'mùa hè',
        definitionEn: 'The hottest season of the year.',
        examples: [
          { en: 'We have a long holiday in summer.', vi: 'Chúng tôi có kỳ nghỉ dài vào mùa hè.' },
          { en: 'Summer is my favourite season.', vi: 'Mùa hè là mùa tôi thích nhất.' },
        ],
        usageNote: { vi: 'Nói "**in** summer", không nói "on summer".', en: 'Say "**in** summer".' },
      },
      {
        id: 'l1-w-winter',
        word: 'winter',
        ipa: '/ˈwɪn.tər/',
        partOfSpeech: 'noun',
        meaningVi: 'mùa đông',
        definitionEn: 'The coldest season of the year.',
        examples: [
          { en: 'It is cold in Ha Noi in winter.', vi: 'Hà Nội lạnh vào mùa đông.' },
          { en: 'I wear a coat in winter.', vi: 'Tôi mặc áo khoác vào mùa đông.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-09-ex01',
        type: 'multiple-choice',
        question: '"Trời nắng" in English is: It is ...',
        options: ['rainy', 'sunny', 'windy', 'cold'],
        correctIndex: 1,
        explanation: { vi: '"sunny" = có nắng.', en: '"sunny" means there is a lot of sun.' },
      },
      {
        id: 'l1-vocab-09-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ thời tiết với nghĩa', en: 'Match the weather words with their meanings' },
        pairs: [
          { left: 'hot', right: 'nóng' },
          { left: 'cold', right: 'lạnh' },
          { left: 'windy', right: 'có gió' },
          { left: 'sunny', right: 'có nắng' },
          { left: 'rain', right: 'mưa' },
          { left: 'cloudy', right: 'nhiều mây' },
        ],
      },
      {
        id: 'l1-vocab-09-ex03',
        type: 'fill-blank',
        sentence: "What's the ___ like today? – It's cloudy.",
        acceptedAnswers: ['weather'],
        hint: '(thời tiết)',
        explanation: {
          vi: '"What\'s the weather like?" = Thời tiết thế nào?',
          en: '"What\'s the weather like?" asks about the weather.',
        },
      },
      {
        id: 'l1-vocab-09-ex04',
        type: 'arrange-words',
        translationVi: 'Hôm nay trời lạnh.',
        correctSentence: 'It is cold today.',
        extraWords: ['are', 'weather'],
        explanation: { vi: 'Nói về thời tiết dùng "It is ...".', en: 'Use "It is ..." for weather.' },
      },
      {
        id: 'l1-vocab-09-ex05',
        type: 'listen-choose',
        audioText: 'It is very hot and sunny in Ho Chi Minh City today.',
        question: 'What is the weather like? (Thời tiết thế nào?)',
        options: ['Cold and windy', 'Rainy', 'Hot and sunny', 'Cloudy and cool'],
        correctIndex: 2,
        explanation: { vi: 'Bạn nghe "very hot and sunny" = rất nóng và nắng.', en: 'You heard "very hot and sunny".' },
      },
      {
        id: 'l1-vocab-09-ex06',
        type: 'multiple-choice',
        question: 'Which season is usually the coldest?',
        options: ['summer', 'spring', 'autumn', 'winter'],
        correctIndex: 3,
        explanation: { vi: '"winter" = mùa đông, mùa lạnh nhất.', en: 'Winter is the coldest season.' },
      },
      {
        id: 'l1-vocab-09-ex07',
        type: 'listen-type',
        audioText: 'It often rains in summer.',
        acceptedAnswers: ['It often rains in summer.'],
        explanation: {
          vi: '"It often rains in summer." = Mùa hè trời hay mưa. Chú ý "rains" có s.',
          en: 'Note "rains" with s after "It".',
        },
      },
      {
        id: 'l1-vocab-09-ex08',
        type: 'fill-blank',
        sentence: 'I like swimming ___ summer.',
        acceptedAnswers: ['in'],
        hint: '(in / on / at)',
        explanation: { vi: 'Dùng "in" trước mùa: in summer.', en: 'Use "in" with seasons.' },
      },
      {
        id: 'l1-vocab-09-ex09',
        type: 'speak-sentence',
        sentence: 'It is windy and cold today.',
        translationVi: 'Hôm nay trời có gió và lạnh.',
      },
      {
        id: 'l1-vocab-09-ex10',
        type: 'arrange-words',
        translationVi: 'Trời đang mưa.',
        correctSentence: 'It is raining.',
        extraWords: ['rain', 'are'],
        explanation: { vi: 'Đang mưa ngay lúc này: "It is raining."', en: 'Right now: "It is raining."' },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-09-test01',
        type: 'multiple-choice',
        question: 'You need an umbrella. It is ...',
        options: ['rainy', 'sunny', 'hot', 'dry'],
        correctIndex: 0,
        explanation: { vi: 'Cần ô (umbrella) vì trời mưa = "rainy".', en: 'You need an umbrella when it is rainy.' },
      },
      {
        id: 'l1-vocab-09-test02',
        type: 'fill-blank',
        sentence: 'There are four ___ in a year: spring, summer, autumn and winter.',
        acceptedAnswers: ['seasons'],
        hint: '(mùa)',
        explanation: { vi: '"season" = mùa; bốn mùa → "four seasons" (số nhiều).', en: 'Four → plural "seasons".' },
      },
      {
        id: 'l1-vocab-09-test03',
        type: 'listen-choose',
        audioText: 'Hoa: Is it cold in London in winter? Ben: Yes, it is cold and it often rains.',
        question: 'What is London like in winter? (Mùa đông ở London thế nào?)',
        options: ['Hot and dry', 'Cold and rainy', 'Sunny and warm', 'Windy and hot'],
        correctIndex: 1,
        explanation: {
          vi: 'Ben nói: "it is cold and it often rains" → lạnh và hay mưa.',
          en: 'Ben says it is cold and it often rains.',
        },
      },
      {
        id: 'l1-vocab-09-test04',
        type: 'match-pairs',
        instruction: { vi: 'Nối tên mùa với nghĩa', en: 'Match the seasons with their meanings' },
        pairs: [
          { left: 'spring', right: 'mùa xuân' },
          { left: 'summer', right: 'mùa hè' },
          { left: 'autumn', right: 'mùa thu' },
          { left: 'winter', right: 'mùa đông' },
          { left: 'the dry season', right: 'mùa khô' },
        ],
      },
      {
        id: 'l1-vocab-09-test05',
        type: 'arrange-words',
        translationVi: 'Bạn thích mùa nào?',
        correctSentence: 'Which season do you like?',
        extraWords: ['does', 'weather'],
        explanation: { vi: 'Which + season + do + you + like?', en: 'Which + season + do + you + like?' },
      },
      {
        id: 'l1-vocab-09-test06',
        type: 'multiple-choice',
        question: 'The opposite of "hot" is...',
        options: ['warm', 'sunny', 'dry', 'cold'],
        correctIndex: 3,
        explanation: { vi: 'Trái nghĩa của "hot" (nóng) là "cold" (lạnh).', en: 'Hot ↔ cold.' },
      },
    ],
  },

  /* ==========================================================================
   * BÀI 10 — SỞ THÍCH & THỜI GIAN RẢNH
   * Học động từ chỉ hoạt động giải trí, cách nói "play football / play the
   * guitar", "listen to music" và "like + V-ing".
   * ======================================================================== */
  {
    id: 'l1-vocab-10',
    skill: 'vocabulary',
    title: { vi: 'Sở thích & thời gian rảnh', en: 'Hobbies & free time' },
    description: {
      vi: 'Học các động từ chỉ sở thích và cách nói bạn làm gì lúc rảnh.',
      en: 'Learn hobby verbs and how to say what you do in your free time.',
    },
    teachingCards: [
      {
        title: { vi: 'Lúc rảnh bạn làm gì?', en: 'What do you do in your free time?' },
        body: {
          vi: 'Hỏi: **What do you do in your free time?** (Lúc rảnh bạn làm gì?)\nTrả lời: **In my free time, I ...**\n**read books** (đọc sách), **listen to music** (nghe nhạc), **swim** (bơi), **cook** (nấu ăn), **dance** (nhảy), **draw** (vẽ), **play games** (chơi game)\nChú ý: **listen TO music** — luôn có "to".',
          en: 'Ask: **What do you do in your free time?**\nAnswer: **In my free time, I ...**\n**read books**, **listen to music**, **swim**, **cook**, **dance**, **draw**, **play games**\nNote: **listen TO music**.',
        },
        examples: [
          { en: 'In my free time, I read books.', vi: 'Lúc rảnh, tôi đọc sách.' },
          { en: 'I listen to music every evening.', vi: 'Tối nào tôi cũng nghe nhạc.' },
        ],
      },
      {
        title: { vi: '"play" với thể thao và nhạc cụ', en: '"play" with sports and instruments' },
        body: {
          vi: 'Thể thao: **play + môn** (KHÔNG có "the"): **play football**, **play badminton**.\nNhạc cụ: **play + the + nhạc cụ**: **play the guitar**, **play the piano**.',
          en: 'Sports: **play + sport** (no "the"): **play football**, **play badminton**.\nInstruments: **play + the + instrument**: **play the guitar**, **play the piano**.',
        },
        examples: [
          { en: 'I play badminton with my dad.', vi: 'Tôi chơi cầu lông với bố.' },
          { en: 'She plays the piano very well.', vi: 'Cô ấy chơi piano rất giỏi.' },
        ],
      },
      {
        title: { vi: 'like + V-ing', en: 'like + -ing' },
        body: {
          vi: 'Sau **like / love / enjoy**, động từ thêm **-ing**:\n**I like reading.** (Tôi thích đọc sách.)\n**She loves dancing.** (Cô ấy rất thích nhảy.)\nChú ý chính tả: swim → **swimming**, dance → **dancing**, cook → **cooking**.',
          en: 'After **like / love / enjoy**, add **-ing** to the verb:\n**I like reading.** / **She loves dancing.**\nSpelling: swim → **swimming**, dance → **dancing**.',
        },
        examples: [
          { en: 'I like cooking with my mum.', vi: 'Tôi thích nấu ăn cùng mẹ.' },
          { en: 'My brother loves swimming.', vi: 'Anh trai tôi rất thích bơi.' },
        ],
      },
    ],
    words: [
      {
        id: 'l1-w-hobby',
        word: 'hobby',
        ipa: '/ˈhɒb.i/',
        partOfSpeech: 'noun',
        meaningVi: 'sở thích',
        definitionEn: 'Something you like doing in your free time.',
        examples: [
          { en: 'My hobby is drawing.', vi: 'Sở thích của tôi là vẽ.' },
          { en: 'What are your hobbies?', vi: 'Sở thích của bạn là gì?' },
        ],
        usageNote: { vi: 'Số nhiều: hobby → **hobbies**.', en: 'Plural: **hobbies**.' },
      },
      {
        id: 'l1-w-play',
        word: 'play',
        ipa: '/pleɪ/',
        partOfSpeech: 'verb',
        meaningVi: 'chơi (thể thao, nhạc cụ, trò chơi)',
        definitionEn: 'To do a sport or game, or make music with an instrument.',
        examples: [
          { en: 'We play football after school.', vi: 'Chúng tôi đá bóng sau giờ học.' },
          { en: 'He plays the guitar.', vi: 'Anh ấy chơi đàn ghi-ta.' },
        ],
        usageNote: {
          vi: 'play football (không "the"), nhưng play **the** guitar (có "the").',
          en: 'play football, but play **the** guitar.',
        },
      },
      {
        id: 'l1-w-read',
        word: 'read',
        ipa: '/riːd/',
        partOfSpeech: 'verb',
        meaningVi: 'đọc',
        definitionEn: 'To look at words and understand them.',
        examples: [
          { en: 'I read a book before bed.', vi: 'Tôi đọc sách trước khi ngủ.' },
          { en: 'She likes reading comics.', vi: 'Cô ấy thích đọc truyện tranh.' },
        ],
      },
      {
        id: 'l1-w-listen',
        word: 'listen',
        ipa: '/ˈlɪs.ən/',
        partOfSpeech: 'verb',
        meaningVi: 'nghe, lắng nghe',
        definitionEn: 'To pay attention to a sound.',
        examples: [
          { en: 'I listen to music on the bus.', vi: 'Tôi nghe nhạc trên xe buýt.' },
          { en: 'Listen to your teacher.', vi: 'Hãy lắng nghe thầy cô.' },
        ],
        usageNote: {
          vi: 'Luôn đi với **to** khi có tân ngữ: listen **to** music. Chữ "t" câm: /ˈlɪs.ən/.',
          en: 'Use **to**: listen **to** music. The "t" is silent.',
        },
      },
      {
        id: 'l1-w-swim',
        word: 'swim',
        ipa: '/swɪm/',
        partOfSpeech: 'verb',
        meaningVi: 'bơi',
        definitionEn: 'To move through water using your arms and legs.',
        examples: [
          { en: 'Can you swim?', vi: 'Bạn biết bơi không?' },
          { en: 'I go swimming on Saturdays.', vi: 'Tôi đi bơi vào các ngày thứ Bảy.' },
        ],
        usageNote: { vi: 'Thêm -ing nhân đôi "m": **swimming**.', en: 'Double the "m": **swimming**.' },
      },
      {
        id: 'l1-w-cook',
        word: 'cook',
        ipa: '/kʊk/',
        partOfSpeech: 'verb',
        meaningVi: 'nấu ăn',
        definitionEn: 'To make food hot and ready to eat.',
        examples: [
          { en: 'My dad cooks dinner on Sundays.', vi: 'Bố tôi nấu bữa tối vào Chủ nhật.' },
          { en: 'I like cooking noodles.', vi: 'Tôi thích nấu mì.' },
        ],
      },
      {
        id: 'l1-w-dance',
        word: 'dance',
        ipa: '/dɑːns/',
        partOfSpeech: 'verb',
        meaningVi: 'nhảy, múa',
        definitionEn: 'To move your body to music.',
        examples: [
          { en: 'She dances very well.', vi: 'Cô ấy nhảy rất đẹp.' },
          { en: 'We love dancing.', vi: 'Chúng tôi rất thích nhảy.' },
        ],
        usageNote: { vi: 'Thêm -ing bỏ "e": **dancing**.', en: 'Drop the "e": **dancing**.' },
      },
      {
        id: 'l1-w-music',
        word: 'music',
        ipa: '/ˈmjuː.zɪk/',
        partOfSpeech: 'noun',
        meaningVi: 'âm nhạc',
        definitionEn: 'Sounds that people sing or play on instruments.',
        examples: [
          { en: 'I listen to music every day.', vi: 'Tôi nghe nhạc mỗi ngày.' },
          { en: 'What music do you like?', vi: 'Bạn thích loại nhạc nào?' },
        ],
        usageNote: { vi: 'Không đếm được: không nói "musics".', en: 'Uncountable: not "musics".' },
      },
    ],
    exercises: [
      {
        id: 'l1-vocab-10-ex01',
        type: 'multiple-choice',
        question: '"Bơi" in English is...',
        options: ['cook', 'swim', 'dance', 'read'],
        correctIndex: 1,
        explanation: { vi: '"swim" = bơi.', en: '"swim" means move through water.' },
      },
      {
        id: 'l1-vocab-10-ex02',
        type: 'match-pairs',
        instruction: { vi: 'Nối động từ với nghĩa', en: 'Match the verbs with their meanings' },
        pairs: [
          { left: 'play', right: 'chơi' },
          { left: 'read', right: 'đọc' },
          { left: 'listen', right: 'nghe' },
          { left: 'cook', right: 'nấu ăn' },
          { left: 'dance', right: 'nhảy múa' },
          { left: 'music', right: 'âm nhạc' },
        ],
      },
      {
        id: 'l1-vocab-10-ex03',
        type: 'fill-blank',
        sentence: 'I listen ___ music every evening.',
        acceptedAnswers: ['to'],
        explanation: { vi: 'Luôn nói "listen to music".', en: 'Always "listen to music".' },
      },
      {
        id: 'l1-vocab-10-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi chơi bóng đá vào Chủ nhật.',
        correctSentence: 'I play football on Sunday.',
        extraWords: ['plays', 'at'],
        explanation: {
          vi: '"play football" (không có "the"); "on" + ngày trong tuần.',
          en: '"play football" with no "the"; "on" + day.',
        },
      },
      {
        id: 'l1-vocab-10-ex05',
        type: 'listen-choose',
        audioText: 'Linh: What do you do in your free time? Sam: I read books and I play the guitar.',
        question: 'What does Sam play? (Sam chơi gì?)',
        options: ['The piano', 'Football', 'Badminton', 'The guitar'],
        correctIndex: 3,
        explanation: { vi: 'Sam nói: "I play the guitar" = Tôi chơi ghi-ta.', en: 'Sam says, "I play the guitar."' },
      },
      {
        id: 'l1-vocab-10-ex06',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I like cook.', 'I likes cooking.', 'I like cooking.', 'I am like cooking.'],
        correctIndex: 2,
        explanation: { vi: 'like + V-ing: "I like cooking."', en: 'like + -ing: "I like cooking."' },
      },
      {
        id: 'l1-vocab-10-ex07',
        type: 'listen-type',
        audioText: 'My hobby is dancing.',
        acceptedAnswers: ['My hobby is dancing.'],
        explanation: { vi: '"My hobby is dancing." = Sở thích của tôi là nhảy.', en: '"dancing" = dance + ing.' },
      },
      {
        id: 'l1-vocab-10-ex08',
        type: 'fill-blank',
        sentence: 'She likes ___ in the sea.',
        acceptedAnswers: ['swimming'],
        hint: '(swim)',
        explanation: {
          vi: 'like + V-ing; swim → swimming (nhân đôi "m").',
          en: 'like + -ing; swim → swimming (double "m").',
        },
      },
      {
        id: 'l1-vocab-10-ex09',
        type: 'speak-sentence',
        sentence: 'In my free time, I listen to music.',
        translationVi: 'Lúc rảnh, tôi nghe nhạc.',
      },
      {
        id: 'l1-vocab-10-ex10',
        type: 'arrange-words',
        translationVi: 'Bạn có thích nấu ăn không?',
        correctSentence: 'Do you like cooking?',
        extraWords: ['does', 'cook'],
        explanation: { vi: 'Do + you + like + V-ing?', en: 'Do + you + like + -ing?' },
      },
    ],
    miniTest: [
      {
        id: 'l1-vocab-10-test01',
        type: 'multiple-choice',
        question: 'Which one is correct?',
        options: ['play the guitar', 'play the football', 'play guitar the', 'do the guitar'],
        correctIndex: 0,
        explanation: {
          vi: 'Nhạc cụ có "the": play the guitar. Thể thao không có "the": play football.',
          en: 'Instruments take "the"; sports don\'t.',
        },
      },
      {
        id: 'l1-vocab-10-test02',
        type: 'fill-blank',
        sentence: 'What do you do in your free ___?',
        acceptedAnswers: ['time'],
        explanation: { vi: '"free time" = thời gian rảnh.', en: '"free time" is time when you are not working or studying.' },
      },
      {
        id: 'l1-vocab-10-test03',
        type: 'listen-choose',
        audioText: "Ben: I don't like sports. I love cooking and reading.",
        question: 'What does Ben NOT like? (Ben KHÔNG thích gì?)',
        options: ['Cooking', 'Reading', 'Sports', 'Books'],
        correctIndex: 2,
        explanation: { vi: 'Ben nói: "I don\'t like sports" = Tôi không thích thể thao.', en: 'Ben says he doesn\'t like sports.' },
      },
      {
        id: 'l1-vocab-10-test04',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ với nghĩa', en: 'Match the words with their meanings' },
        pairs: [
          { left: 'hobby', right: 'sở thích' },
          { left: 'free time', right: 'thời gian rảnh' },
          { left: 'swim', right: 'bơi' },
          { left: 'dance', right: 'nhảy múa' },
          { left: 'play', right: 'chơi' },
        ],
      },
      {
        id: 'l1-vocab-10-test05',
        type: 'arrange-words',
        translationVi: 'Anh ấy thích đọc sách.',
        correctSentence: 'He likes reading books.',
        extraWords: ['like', 'read'],
        explanation: { vi: 'He + likes (có s) + V-ing.', en: 'He + likes + -ing.' },
      },
      {
        id: 'l1-vocab-10-test06',
        type: 'multiple-choice',
        question: 'Which word means "âm nhạc"?',
        options: ['hobby', 'dance', 'sport', 'music'],
        correctIndex: 3,
        explanation: { vi: '"music" = âm nhạc.', en: '"music" is what you listen to.' },
      },
    ],
  },
]
