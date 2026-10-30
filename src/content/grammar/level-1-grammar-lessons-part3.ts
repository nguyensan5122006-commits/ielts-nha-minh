/**
 * level-1-grammar-lessons-part3.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 1 (≈ A1 – A2), PHẦN 3
 * ----------------------------------------------------------------------------
 * Bài LUYỆN TẬP riêng cho các điểm ngữ pháp trước đây chỉ có bài trên lộ trình.
 *
 * Danh sách bài:
 *   gr-l1-articles       a / an / the & danh từ số nhiều
 *   gr-l1-prepositions   in / on / at (thời gian, nơi chốn)
 *   gr-l1-comparatives   So sánh hơn & so sánh nhất
 *   gr-l1-wh-questions   Câu hỏi Wh-
 *   gr-l1-linking        and, but, because, so, however
 *
 * Cấu trúc mỗi bài và quy ước id: giống level-1-grammar-lessons-part2.ts.
 * Toàn bộ câu ví dụ và bài tập do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level1GrammarLessonsPart3: Lesson[] = [
  // ==========================================================================
  // BÀI 1: a / an / the & số nhiều
  // ==========================================================================
  {
    id: 'gr-l1-articles',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: a / an / the & số nhiều', en: 'Practice: a / an / the & plurals' },
    description: {
      vi: 'Chọn a hay an theo âm đầu, dùng the cho thứ đã biết, viết đúng danh từ số nhiều.',
      en: 'Choose a or an by the first sound, use the for known things and spell plurals correctly.',
    },
    teachingCards: [
      {
        title: { vi: 'a hay an?', en: 'a or an?' },
        body: {
          vi: 'Xét **âm** đầu, không xét chữ cái:\n**a** + phụ âm: a book, a **u**niversity (đọc /juː/), a **h**ouse.\n**an** + nguyên âm: an apple, an egg, an **h**our (h câm), an **M**BA (đọc /em/).\na / an chỉ đi với danh từ **đếm được số ít**.',
          en: 'Look at the first **sound**, not the letter:\n**a** + consonant sound: a book, a **u**niversity (/juː/), a **h**ouse.\n**an** + vowel sound: an apple, an egg, an **h**our (silent h), an **M**BA (/em/).\na / an only go with **singular countable** nouns.',
        },
        examples: [
          { en: 'She is an engineer at a big company.', vi: 'Cô ấy là kỹ sư ở một công ty lớn.' },
          { en: 'I waited for an hour.', vi: 'Tôi đã đợi một tiếng.' },
        ],
      },
      {
        title: { vi: 'the và số nhiều', en: 'the and plurals' },
        body: {
          vi: '**the**: vật **đã nhắc** hoặc **ai cũng biết là cái nào**: I bought a shirt. **The** shirt is blue. Close **the** door. **the** sun.\n**Số nhiều**: thêm -s; -es sau s, sh, ch, x, o (buses, boxes, potatoes); phụ âm + y → -ies (cities).\nBất quy tắc: man → **men**, woman → **women**, child → **children**, person → **people**, tooth → **teeth**.',
          en: '**the**: something **already mentioned** or **clear which one**: I bought a shirt. **The** shirt is blue. Close **the** door. **the** sun.\n**Plurals**: add -s; -es after s, sh, ch, x, o (buses, boxes, potatoes); consonant + y → -ies (cities).\nIrregular: man → **men**, woman → **women**, child → **children**, person → **people**, tooth → **teeth**.',
        },
        examples: [
          { en: 'There are three children and two women in the room.', vi: 'Có ba đứa trẻ và hai người phụ nữ trong phòng.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-articles-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối danh từ với dạng số nhiều.', en: 'Match each noun with its plural.' },
        pairs: [
          { left: 'child', right: 'children' },
          { left: 'city', right: 'cities' },
          { left: 'box', right: 'boxes' },
          { left: 'person', right: 'people' },
          { left: 'tooth', right: 'teeth' },
        ],
        explanation: { vi: 'child, person, tooth bất quy tắc; city → cities; box → boxes.', en: 'child, person and tooth are irregular; city → cities; box → boxes.' },
      },
      {
        id: 'gr-l1-articles-ex02',
        type: 'multiple-choice',
        question: 'My cousin studies at ___ university in Hue.',
        options: ['a', 'an', 'the', '—'],
        correctIndex: 0,
        explanation: { vi: 'university đọc /juː/ (phụ âm) → a.', en: 'university starts with /juː/ (a consonant sound) → a.' },
      },
      {
        id: 'gr-l1-articles-ex03',
        type: 'fill-blank',
        sentence: 'It takes ___ hour to get to the airport.',
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: { vi: 'hour có h câm → âm đầu là nguyên âm → an.', en: 'hour has a silent h → vowel sound → an.' },
      },
      {
        id: 'gr-l1-articles-ex04',
        type: 'multiple-choice',
        question: 'I have a dog and a cat. ___ dog is very friendly.',
        options: ['A', 'An', 'The', '—'],
        correctIndex: 2,
        explanation: { vi: 'Con chó đã được nhắc → The.', en: 'The dog was already mentioned → The.' },
      },
      {
        id: 'gr-l1-articles-ex05',
        type: 'multiple-choice',
        question: 'Which is correct?',
        options: ['two womans', 'two woman', 'two women', 'two womens'],
        correctIndex: 2,
        explanation: { vi: 'woman → women (bất quy tắc).', en: 'woman → women (irregular).' },
      },
      {
        id: 'gr-l1-articles-ex06',
        type: 'fill-blank',
        sentence: 'Please turn off ___ lights when you leave.',
        acceptedAnswers: ['the'],
        hint: '(a / an / the)',
        explanation: { vi: 'Ai cũng biết là đèn nào (đèn trong phòng) → the.', en: 'Both people know which lights → the.' },
      },
      {
        id: 'gr-l1-articles-ex07',
        type: 'arrange-words',
        translationVi: 'Cô ấy ăn một quả táo mỗi ngày.',
        correctSentence: 'She eats an apple every day.',
        extraWords: ['a', 'the'],
        explanation: { vi: 'apple bắt đầu bằng nguyên âm → an.', en: 'apple starts with a vowel sound → an.' },
      },
      {
        id: 'gr-l1-articles-ex08',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['He is a honest man.', 'She has an umbrella.', 'We saw a one-way sign.', 'It is a useful book.'],
        correctIndex: 0,
        explanation: { vi: 'honest có h câm → an honest man.', en: 'honest has a silent h → an honest man.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-articles-t01',
        type: 'fill-blank',
        sentence: 'My father is ___ engineer.',
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: { vi: 'engineer bắt đầu bằng nguyên âm → an.', en: 'engineer starts with a vowel sound → an.' },
      },
      {
        id: 'gr-l1-articles-t02',
        type: 'multiple-choice',
        question: '___ moon is very bright tonight.',
        options: ['A', 'An', 'The', '—'],
        correctIndex: 2,
        explanation: { vi: 'Chỉ có một mặt trăng → The moon.', en: 'There is only one moon → The moon.' },
      },
      {
        id: 'gr-l1-articles-t03',
        type: 'fill-blank',
        sentence: 'We bought three kilos of ___ at the market.',
        acceptedAnswers: ['potatoes', 'tomatoes'],
        hint: '(potato)',
        explanation: { vi: 'potato → potatoes (-es sau o).', en: 'potato → potatoes (-es after o).' },
      },
      {
        id: 'gr-l1-articles-t04',
        type: 'multiple-choice',
        question: 'Which plural is wrong?',
        options: ['bus → buses', 'baby → babies', 'man → mans', 'key → keys'],
        correctIndex: 2,
        explanation: { vi: 'man → men.', en: 'man → men.' },
      },
      {
        id: 'gr-l1-articles-t05',
        type: 'multiple-choice',
        question: 'She wants to buy ___ new phone.',
        options: ['an', 'a', 'the', '—'],
        correctIndex: 1,
        explanation: { vi: 'Lần đầu nhắc, số ít, new bắt đầu bằng phụ âm → a.', en: 'First mention, singular, new starts with a consonant → a.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: in / on / at
  // ==========================================================================
  {
    id: 'gr-l1-prepositions',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: in / on / at', en: 'Practice: in / on / at' },
    description: {
      vi: 'Chọn đúng in, on, at cho giờ, ngày, tháng và nơi chốn.',
      en: 'Choose in, on or at correctly for times, days, months and places.',
    },
    teachingCards: [
      {
        title: { vi: 'Thời gian: từ rộng đến hẹp', en: 'Time: from big to small' },
        body: {
          vi: '**in** + khoảng dài: in July, in 2025, in the morning, in summer.\n**on** + ngày: on Monday, on 5 May, on my birthday, on Sunday morning.\n**at** + giờ / thời điểm: at 7 o\'clock, at noon, at night, at the weekend.\nKhông dùng giới từ trước: this, next, last, every → next week, every day.',
          en: '**in** + long periods: in July, in 2025, in the morning, in summer.\n**on** + days: on Monday, on 5 May, on my birthday, on Sunday morning.\n**at** + clock times / points: at 7 o\'clock, at noon, at night, at the weekend.\nNo preposition before this, next, last, every → next week, every day.',
        },
        examples: [
          { en: 'The class starts at 8 a.m. on Monday.', vi: 'Lớp học bắt đầu lúc 8 giờ sáng thứ Hai.' },
          { en: 'I was born in 2005.', vi: 'Tôi sinh năm 2005.' },
        ],
      },
      {
        title: { vi: 'Nơi chốn', en: 'Place' },
        body: {
          vi: '**in** + bên trong / thành phố / quốc gia: in the box, in Hanoi, in Vietnam.\n**on** + bề mặt / đường / tầng: on the table, on Le Loi Street, on the second floor.\n**at** + một điểm / địa chỉ cụ thể: at the bus stop, at home, at work, at 12 Tran Phu Street.',
          en: '**in** + inside / city / country: in the box, in Hanoi, in Vietnam.\n**on** + surfaces / streets / floors: on the table, on Le Loi Street, on the second floor.\n**at** + a point / exact address: at the bus stop, at home, at work, at 12 Tran Phu Street.',
        },
        examples: [
          { en: 'She lives on the fifth floor of a building in District 3.', vi: 'Cô ấy sống ở tầng năm của một tòa nhà ở Quận 3.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-prepositions-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối giới từ với cụm thời gian.', en: 'Match each preposition with a time phrase.' },
        pairs: [
          { left: 'in', right: 'December' },
          { left: 'on', right: 'Friday' },
          { left: 'at', right: '6:30' },
          { left: '(no preposition)', right: 'next week' },
        ],
        explanation: { vi: 'in + tháng; on + thứ; at + giờ; next / last / this / every không có giới từ.', en: 'in + months; on + days; at + clock times; no preposition before next / last / this / every.' },
      },
      {
        id: 'gr-l1-prepositions-ex02',
        type: 'fill-blank',
        sentence: 'The shop closes ___ 9 p.m.',
        acceptedAnswers: ['at'],
        hint: '(in / on / at)',
        explanation: { vi: 'Giờ cụ thể → at.', en: 'An exact time → at.' },
      },
      {
        id: 'gr-l1-prepositions-ex03',
        type: 'multiple-choice',
        question: 'We have a party ___ New Year\'s Eve.',
        options: ['in', 'on', 'at', '—'],
        correctIndex: 1,
        explanation: { vi: 'Một ngày cụ thể → on.', en: 'A specific day → on.' },
      },
      {
        id: 'gr-l1-prepositions-ex04',
        type: 'fill-blank',
        sentence: 'My keys are ___ the table.',
        acceptedAnswers: ['on'],
        hint: '(in / on / at)',
        explanation: { vi: 'Trên bề mặt → on.', en: 'On a surface → on.' },
      },
      {
        id: 'gr-l1-prepositions-ex05',
        type: 'multiple-choice',
        question: 'I\'ll see you ___ next Tuesday.',
        options: ['on', 'in', 'at', '— (no preposition)'],
        correctIndex: 3,
        explanation: { vi: 'Trước next / last / this / every không dùng giới từ.', en: 'No preposition before next / last / this / every.' },
      },
      {
        id: 'gr-l1-prepositions-ex06',
        type: 'fill-blank',
        sentence: 'He works ___ a hospital in Can Tho.',
        acceptedAnswers: ['at', 'in'],
        hint: '(in / on / at)',
        explanation: { vi: 'Nơi làm việc như một địa điểm → at (in cũng được nếu nhấn mạnh bên trong).', en: 'A workplace as a location → at (in is also fine if you mean inside).' },
      },
      {
        id: 'gr-l1-prepositions-ex07',
        type: 'arrange-words',
        translationVi: 'Tôi thường đọc sách vào buổi tối.',
        correctSentence: 'I usually read in the evening.',
        extraWords: ['on', 'at'],
        explanation: { vi: 'in the morning / afternoon / evening.', en: 'in the morning / afternoon / evening.' },
      },
      {
        id: 'gr-l1-prepositions-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['She lives in Nguyen Hue Street.', 'She lives on Nguyen Hue Street.', 'She lives at Nguyen Hue Street.', 'She lives Nguyen Hue Street.'],
        correctIndex: 1,
        explanation: { vi: 'Tên đường (không có số nhà) → on.', en: 'A street name (no house number) → on.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-prepositions-t01',
        type: 'fill-blank',
        sentence: 'It often rains a lot ___ September.',
        acceptedAnswers: ['in'],
        hint: '(in / on / at)',
        explanation: { vi: 'Tháng → in.', en: 'Months → in.' },
      },
      {
        id: 'gr-l1-prepositions-t02',
        type: 'multiple-choice',
        question: 'Let\'s meet ___ the bus stop.',
        options: ['in', 'on', 'at', 'to'],
        correctIndex: 2,
        explanation: { vi: 'Một điểm cụ thể → at.', en: 'A specific point → at.' },
      },
      {
        id: 'gr-l1-prepositions-t03',
        type: 'fill-blank',
        sentence: 'My birthday is ___ 14 March.',
        acceptedAnswers: ['on'],
        hint: '(in / on / at)',
        explanation: { vi: 'Ngày tháng cụ thể → on.', en: 'A date → on.' },
      },
      {
        id: 'gr-l1-prepositions-t04',
        type: 'multiple-choice',
        question: 'I can\'t sleep ___ night when it is hot.',
        options: ['in', 'on', 'at', '—'],
        correctIndex: 2,
        explanation: { vi: 'at night (nhưng in the morning / evening).', en: 'at night (but in the morning / evening).' },
      },
      {
        id: 'gr-l1-prepositions-t05',
        type: 'multiple-choice',
        question: 'Which phrase is wrong?',
        options: ['in 2010', 'on Sunday', 'at the weekend', 'in last week'],
        correctIndex: 3,
        explanation: { vi: 'last week không có giới từ.', en: 'last week takes no preposition.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: So sánh hơn & so sánh nhất
  // ==========================================================================
  {
    id: 'gr-l1-comparatives',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: so sánh hơn & so sánh nhất', en: 'Practice: comparatives & superlatives' },
    description: {
      vi: 'Chọn -er/-est hay more/most, nhớ good → better → best.',
      en: 'Choose -er/-est or more/most and remember good → better → best.',
    },
    teachingCards: [
      {
        title: { vi: 'Tính từ ngắn và dài', en: 'Short and long adjectives' },
        body: {
          vi: '**1 âm tiết** (và 2 âm tiết tận cùng -y): **-er than / the -est**: cheap → cheaper → the cheapest; big → bigger → the biggest; happy → happier → the happiest.\n**2 âm tiết trở lên**: **more … than / the most …**: expensive → more expensive → the most expensive.\nBất quy tắc: good → **better** → **the best**; bad → **worse** → **the worst**; far → **further** → **the furthest**.',
          en: '**One syllable** (and two-syllable words ending in -y): **-er than / the -est**: cheap → cheaper → the cheapest; big → bigger → the biggest; happy → happier → the happiest.\n**Two or more syllables**: **more … than / the most …**: expensive → more expensive → the most expensive.\nIrregular: good → **better** → **the best**; bad → **worse** → **the worst**; far → **further** → **the furthest**.',
        },
        examples: [
          { en: 'Hanoi is colder than Ho Chi Minh City in winter.', vi: 'Mùa đông Hà Nội lạnh hơn TP.HCM.' },
          { en: 'This is the most beautiful beach I have ever seen.', vi: 'Đây là bãi biển đẹp nhất tôi từng thấy.' },
        ],
      },
      {
        title: { vi: 'Lỗi thường gặp', en: 'Common mistakes' },
        body: {
          vi: 'Không dùng cả hai: Sai "more cheaper" → Đúng "cheaper".\nSo sánh hơn đi với **than**, so sánh nhất đi với **the**.\nso sánh bằng: **as + tính từ + as**: My bag is as heavy as yours.',
          en: 'Don\'t use both forms: Wrong "more cheaper" → Right "cheaper".\nComparatives go with **than**; superlatives go with **the**.\nEquality: **as + adjective + as**: My bag is as heavy as yours.',
        },
        examples: [
          { en: 'My test score was worse than last time.', vi: 'Điểm thi của tôi tệ hơn lần trước.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-comparatives-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với dạng so sánh hơn.', en: 'Match each adjective with its comparative.' },
        pairs: [
          { left: 'good', right: 'better' },
          { left: 'big', right: 'bigger' },
          { left: 'easy', right: 'easier' },
          { left: 'bad', right: 'worse' },
          { left: 'modern', right: 'more modern' },
        ],
        explanation: { vi: 'good/bad bất quy tắc; big gấp đôi g; easy → easier; modern 2 âm tiết → more modern.', en: 'good/bad are irregular; big doubles the g; easy → easier; modern has two syllables → more modern.' },
      },
      {
        id: 'gr-l1-comparatives-ex02',
        type: 'fill-blank',
        sentence: 'A plane is ___ than a train.',
        acceptedAnswers: ['faster', 'quicker'],
        hint: '(fast)',
        explanation: { vi: 'fast 1 âm tiết → faster than.', en: 'fast has one syllable → faster than.' },
      },
      {
        id: 'gr-l1-comparatives-ex03',
        type: 'multiple-choice',
        question: 'This is ___ restaurant in our town.',
        options: ['the better', 'the best', 'the goodest', 'best'],
        correctIndex: 1,
        explanation: { vi: 'So sánh nhất của good → the best.', en: 'The superlative of good → the best.' },
      },
      {
        id: 'gr-l1-comparatives-ex04',
        type: 'multiple-choice',
        question: 'English is ___ than I thought.',
        options: ['more easy', 'easier', 'more easier', 'easyer'],
        correctIndex: 1,
        explanation: { vi: 'easy (tận cùng -y) → easier; không dùng more.', en: 'easy (ends in -y) → easier; no more.' },
      },
      {
        id: 'gr-l1-comparatives-ex05',
        type: 'fill-blank',
        sentence: 'Gold is more ___ than silver.',
        acceptedAnswers: ['expensive', 'valuable'],
        hint: '(expensive)',
        explanation: { vi: 'expensive dài → more expensive.', en: 'expensive is long → more expensive.' },
      },
      {
        id: 'gr-l1-comparatives-ex06',
        type: 'arrange-words',
        translationVi: 'Chị tôi cao bằng tôi.',
        correctSentence: 'My sister is as tall as me.',
        extraWords: ['than', 'taller'],
        explanation: { vi: 'So sánh bằng: as + tính từ + as.', en: 'Equality: as + adjective + as.' },
      },
      {
        id: 'gr-l1-comparatives-ex07',
        type: 'multiple-choice',
        question: 'Yesterday was ___ day of the year.',
        options: ['the hotter', 'the hottest', 'hottest', 'the most hot'],
        correctIndex: 1,
        explanation: { vi: 'hot → the hottest (gấp đôi t).', en: 'hot → the hottest (double t).' },
      },
      {
        id: 'gr-l1-comparatives-ex08',
        type: 'arrange-words',
        translationVi: 'Đây là quyển sách thú vị nhất.',
        correctSentence: 'This is the most interesting book.',
        extraWords: ['more', 'than'],
        explanation: { vi: 'interesting dài → the most interesting.', en: 'interesting is long → the most interesting.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-comparatives-t01',
        type: 'fill-blank',
        sentence: 'Today is ___ than yesterday.',
        acceptedAnswers: ['colder', 'hotter', 'warmer', 'better', 'worse'],
        hint: '(cold)',
        explanation: { vi: 'cold → colder than.', en: 'cold → colder than.' },
      },
      {
        id: 'gr-l1-comparatives-t02',
        type: 'multiple-choice',
        question: 'Which is correct?',
        options: ['more cheaper', 'cheaper', 'most cheap', 'cheapper'],
        correctIndex: 1,
        explanation: { vi: 'cheap → cheaper.', en: 'cheap → cheaper.' },
      },
      {
        id: 'gr-l1-comparatives-t03',
        type: 'multiple-choice',
        question: 'That was ___ film I have ever watched.',
        options: ['the worse', 'the worst', 'the baddest', 'worst'],
        correctIndex: 1,
        explanation: { vi: 'bad → worse → the worst.', en: 'bad → worse → the worst.' },
      },
      {
        id: 'gr-l1-comparatives-t04',
        type: 'fill-blank',
        sentence: 'My phone is not as new ___ yours.',
        acceptedAnswers: ['as'],
        hint: '(as / than)',
        explanation: { vi: 'as … as.', en: 'as … as.' },
      },
      {
        id: 'gr-l1-comparatives-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: ['She is happier now.', 'This road is more dangerous.', 'He is the most tall in class.', 'It is the biggest city.'],
        correctIndex: 2,
        explanation: { vi: 'tall ngắn → the tallest.', en: 'tall is short → the tallest.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Câu hỏi Wh-
  // ==========================================================================
  {
    id: 'gr-l1-wh-questions',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: câu hỏi Wh-', en: 'Practice: Wh- questions' },
    description: {
      vi: 'Chọn đúng từ hỏi và đặt trợ động từ đúng chỗ.',
      en: 'Choose the right question word and put the auxiliary verb in the right place.',
    },
    teachingCards: [
      {
        title: { vi: 'Các từ hỏi', en: 'Question words' },
        body: {
          vi: '**What** (cái gì) · **Where** (ở đâu) · **When** (khi nào) · **Who** (ai) · **Why** (tại sao) · **How** (thế nào) · **Which** (cái nào, có lựa chọn) · **Whose** (của ai).\nHow + tính từ: **How old / How long / How far / How often / How much / How many**.',
          en: '**What** · **Where** · **When** · **Who** · **Why** · **How** · **Which** (from a choice) · **Whose** (belonging to whom).\nHow + adjective: **How old / How long / How far / How often / How much / How many**.',
        },
        examples: [
          { en: 'How often do you go swimming?', vi: 'Bạn đi bơi bao lâu một lần?' },
          { en: 'Whose bag is this?', vi: 'Đây là túi của ai?' },
        ],
      },
      {
        title: { vi: 'Trật tự câu hỏi', en: 'Question word order' },
        body: {
          vi: '**Wh- + trợ động từ + chủ ngữ + động từ?**\nVới be: Where **is** she? · Với động từ thường: Where **does** she **work**? · Quá khứ: What **did** you **eat**?\nSai: "Where she works?" → thiếu does.',
          en: '**Wh- + auxiliary + subject + verb?**\nWith be: Where **is** she? · With main verbs: Where **does** she **work**? · Past: What **did** you **eat**?\nWrong: "Where she works?" → does is missing.',
        },
        examples: [
          { en: 'Why are you late?', vi: 'Tại sao bạn đến muộn?' },
          { en: 'When did they move here?', vi: 'Họ chuyển đến đây khi nào?' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-wh-questions-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối câu hỏi với câu trả lời.', en: 'Match each question with its answer.' },
        pairs: [
          { left: 'Where do you live?', right: 'In Da Lat.' },
          { left: 'How old is she?', right: 'Twelve.' },
          { left: 'When is the meeting?', right: 'At 3 p.m.' },
          { left: 'Why are you tired?', right: 'Because I slept late.' },
        ],
        explanation: { vi: 'Where → nơi chốn; How old → tuổi; When → thời gian; Why → lý do.', en: 'Where → place; How old → age; When → time; Why → reason.' },
      },
      {
        id: 'gr-l1-wh-questions-ex02',
        type: 'multiple-choice',
        question: '___ does the film start? — At eight.',
        options: ['Where', 'What time', 'Who', 'How much'],
        correctIndex: 1,
        explanation: { vi: 'Trả lời giờ → What time.', en: 'The answer is a time → What time.' },
      },
      {
        id: 'gr-l1-wh-questions-ex03',
        type: 'fill-blank',
        sentence: 'How ___ does this T-shirt cost?',
        acceptedAnswers: ['much'],
        hint: '(much / many)',
        explanation: { vi: 'Hỏi giá → How much.', en: 'Asking about price → How much.' },
      },
      {
        id: 'gr-l1-wh-questions-ex04',
        type: 'multiple-choice',
        question: 'Which question is correct?',
        options: ['Where you work?', 'Where do you work?', 'Where you do work?', 'Where does you work?'],
        correctIndex: 1,
        explanation: { vi: 'Wh- + do + you + V.', en: 'Wh- + do + you + V.' },
      },
      {
        id: 'gr-l1-wh-questions-ex05',
        type: 'fill-blank',
        sentence: 'What ___ you do last weekend?',
        acceptedAnswers: ['did'],
        hint: '(do / did)',
        explanation: { vi: 'last weekend → quá khứ → did.', en: 'last weekend → past → did.' },
      },
      {
        id: 'gr-l1-wh-questions-ex06',
        type: 'arrange-words',
        translationVi: 'Từ nhà bạn đến trường bao xa?',
        correctSentence: 'How far is it from your house to school?',
        extraWords: ['long', 'does'],
        explanation: { vi: 'Hỏi khoảng cách → How far is it…?', en: 'Asking about distance → How far is it…?' },
      },
      {
        id: 'gr-l1-wh-questions-ex07',
        type: 'multiple-choice',
        question: '___ colour do you prefer, red or blue?',
        options: ['What', 'Which', 'Who', 'Whose'],
        correctIndex: 1,
        explanation: { vi: 'Chọn trong 2 lựa chọn → Which.', en: 'Choosing from two options → Which.' },
      },
      {
        id: 'gr-l1-wh-questions-ex08',
        type: 'arrange-words',
        translationVi: 'Anh ấy làm việc ở đâu?',
        correctSentence: 'Where does he work?',
        extraWords: ['do', 'works'],
        explanation: { vi: 'he → does + work.', en: 'he → does + work.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-wh-questions-t01',
        type: 'multiple-choice',
        question: '___ is your English teacher? — Ms Hoa.',
        options: ['What', 'Who', 'Whose', 'Which'],
        correctIndex: 1,
        explanation: { vi: 'Hỏi người → Who.', en: 'Asking about a person → Who.' },
      },
      {
        id: 'gr-l1-wh-questions-t02',
        type: 'fill-blank',
        sentence: 'How ___ brothers and sisters do you have?',
        acceptedAnswers: ['many'],
        hint: '(much / many)',
        explanation: { vi: 'Danh từ đếm được số nhiều → How many.', en: 'Plural countable noun → How many.' },
      },
      {
        id: 'gr-l1-wh-questions-t03',
        type: 'multiple-choice',
        question: 'Why ___ she crying?',
        options: ['does', 'is', 'do', 'are'],
        correctIndex: 1,
        explanation: { vi: 'crying (V-ing) → be: Why is she crying?', en: 'crying (V-ing) needs be: Why is she crying?' },
      },
      {
        id: 'gr-l1-wh-questions-t04',
        type: 'fill-blank',
        sentence: '___ often do you visit your grandparents?',
        acceptedAnswers: ['How'],
        hint: '(how / what)',
        explanation: { vi: 'Hỏi mức độ thường xuyên → How often.', en: 'Asking about frequency → How often.' },
      },
      {
        id: 'gr-l1-wh-questions-t05',
        type: 'multiple-choice',
        question: 'Which question has a mistake?',
        options: ['When did you arrive?', 'What does she want?', 'Where they live?', 'How are you?'],
        correctIndex: 2,
        explanation: { vi: 'Thiếu do: Where do they live?', en: 'do is missing: Where do they live?' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 5: and, but, because, so, however
  // ==========================================================================
  {
    id: 'gr-l1-linking',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: { vi: 'Luyện tập: and, but, because, so, however', en: 'Practice: and, but, because, so, however' },
    description: {
      vi: 'Nối hai ý cho đúng nghĩa và đúng dấu câu.',
      en: 'Join two ideas with the right meaning and punctuation.',
    },
    teachingCards: [
      {
        title: { vi: 'Năm từ nối cơ bản', en: 'Five basic linking words' },
        body: {
          vi: '**and**: thêm ý · **but**: ý trái ngược · **because**: **nguyên nhân** · **so**: **kết quả**.\nbecause và so ngược chiều nhau: I was hungry, **so** I ate. = I ate **because** I was hungry.\nĐừng dùng cả hai trong một câu: Sai "Because it rained, so we stayed home."',
          en: '**and**: adds an idea · **but**: a contrast · **because**: the **reason** · **so**: the **result**.\nbecause and so point in opposite directions: I was hungry, **so** I ate. = I ate **because** I was hungry.\nDon\'t use both in one sentence: Wrong "Because it rained, so we stayed home."',
        },
        examples: [
          { en: 'The hotel was cheap, but the rooms were clean.', vi: 'Khách sạn rẻ nhưng phòng sạch.' },
          { en: 'It was raining, so we stayed at home.', vi: 'Trời mưa nên chúng tôi ở nhà.' },
        ],
      },
      {
        title: { vi: 'However: đầu câu mới', en: 'However: starting a new sentence' },
        body: {
          vi: '**However** = but, nhưng đứng **đầu câu mới**, sau dấu chấm, và có **dấu phẩy** theo sau.\nThe test was difficult. **However,** most students passed.\nTrang trọng hơn but — hợp với bài viết IELTS.',
          en: '**However** means but, but it **starts a new sentence**, after a full stop, with a **comma** after it.\nThe test was difficult. **However,** most students passed.\nIt is more formal than but — good for IELTS writing.',
        },
        examples: [
          { en: 'Online shopping is convenient. However, it can be risky.', vi: 'Mua sắm trực tuyến tiện lợi. Tuy nhiên, nó có thể rủi ro.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-linking-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối nửa đầu với nửa sau phù hợp.', en: 'Match the sentence halves.' },
        pairs: [
          { left: 'I missed the bus,', right: 'so I was late.' },
          { left: 'I was late', right: 'because I missed the bus.' },
          { left: 'She is rich,', right: 'but she is not happy.' },
          { left: 'He plays the guitar', right: 'and sings very well.' },
        ],
        explanation: { vi: 'so → kết quả; because → nguyên nhân; but → trái ngược; and → thêm ý.', en: 'so → result; because → reason; but → contrast; and → addition.' },
      },
      {
        id: 'gr-l1-linking-ex02',
        type: 'multiple-choice',
        question: 'I want to buy a car, ___ I don\'t have enough money.',
        options: ['and', 'so', 'but', 'because'],
        correctIndex: 2,
        explanation: { vi: 'Ý trái ngược → but.', en: 'A contrast → but.' },
      },
      {
        id: 'gr-l1-linking-ex03',
        type: 'fill-blank',
        sentence: 'She stayed in bed ___ she had a fever.',
        acceptedAnswers: ['because', 'as', 'since'],
        hint: '(so / because)',
        explanation: { vi: '"she had a fever" là nguyên nhân → because.', en: '"she had a fever" is the reason → because.' },
      },
      {
        id: 'gr-l1-linking-ex04',
        type: 'multiple-choice',
        question: 'The road was flooded, ___ we took another way.',
        options: ['because', 'so', 'but', 'however'],
        correctIndex: 1,
        explanation: { vi: 'Đi đường khác là kết quả → so.', en: 'Taking another way is the result → so.' },
      },
      {
        id: 'gr-l1-linking-ex05',
        type: 'multiple-choice',
        question: 'Which sentence uses "however" correctly?',
        options: [
          'The phone is old however it works well.',
          'The phone is old. However, it works well.',
          'The phone is old, however it works well.',
          'However the phone is old, it works well.',
        ],
        correctIndex: 1,
        explanation: { vi: 'However đứng đầu câu mới, sau dấu chấm, có dấu phẩy.', en: 'However starts a new sentence, after a full stop, followed by a comma.' },
      },
      {
        id: 'gr-l1-linking-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi thích cà phê nhưng tôi không uống buổi tối.',
        correctSentence: "I like coffee but I don't drink it at night.",
        extraWords: ['so', 'because'],
        explanation: { vi: 'Ý trái ngược → but.', en: 'A contrast → but.' },
      },
      {
        id: 'gr-l1-linking-ex07',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: [
          'Because it was late, we went home.',
          'It was late, so we went home.',
          'Because it was late, so we went home.',
          'We went home because it was late.',
        ],
        correctIndex: 2,
        explanation: { vi: 'Không dùng because và so cùng một câu.', en: 'Don\'t use because and so in the same sentence.' },
      },
      {
        id: 'gr-l1-linking-ex08',
        type: 'fill-blank',
        sentence: 'My brother is tall ___ very strong.',
        acceptedAnswers: ['and'],
        hint: '(and / but)',
        explanation: { vi: 'Thêm một ý cùng chiều → and.', en: 'Adding a similar idea → and.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l1-linking-t01',
        type: 'multiple-choice',
        question: 'It was a holiday, ___ the shops were closed.',
        options: ['because', 'so', 'but', 'and'],
        correctIndex: 1,
        explanation: { vi: 'Kết quả → so.', en: 'Result → so.' },
      },
      {
        id: 'gr-l1-linking-t02',
        type: 'fill-blank',
        sentence: 'I didn\'t call you ___ my phone was broken.',
        acceptedAnswers: ['because', 'as', 'since'],
        hint: '(so / because)',
        explanation: { vi: 'Nguyên nhân → because.', en: 'Reason → because.' },
      },
      {
        id: 'gr-l1-linking-t03',
        type: 'multiple-choice',
        question: 'The flat is small. ___, it is in a great location.',
        options: ['So', 'Because', 'However', 'And'],
        correctIndex: 2,
        explanation: { vi: 'Trái ngược, đầu câu mới → However.', en: 'A contrast at the start of a new sentence → However.' },
      },
      {
        id: 'gr-l1-linking-t04',
        type: 'fill-blank',
        sentence: 'She studied hard, ___ she still failed the exam.',
        acceptedAnswers: ['but', 'yet'],
        hint: '(and / but)',
        explanation: { vi: 'Kết quả trái mong đợi → but.', en: 'An unexpected result → but.' },
      },
      {
        id: 'gr-l1-linking-t05',
        type: 'multiple-choice',
        question: 'Choose the sentence with the same meaning: "He was ill, so he stayed home."',
        options: [
          'He stayed home because he was ill.',
          'He was ill because he stayed home.',
          'He stayed home, but he was ill.',
          'He was ill. However, he stayed home.',
        ],
        correctIndex: 0,
        explanation: { vi: 'so (kết quả) ↔ because (nguyên nhân).', en: 'so (result) ↔ because (reason).' },
      },
    ],
  },
]
