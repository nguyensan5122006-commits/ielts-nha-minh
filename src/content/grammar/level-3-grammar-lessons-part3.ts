/**
 * level-3-grammar-lessons-part3.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 3 (≈ B1 – B2), PHẦN 3
 * ----------------------------------------------------------------------------
 * Bài LUYỆN TẬP riêng cho các điểm ngữ pháp trước đây chỉ có bài trên lộ trình.
 *
 * Danh sách bài:
 *   gr-l3-cohesion             although / despite / whereas / therefore / this + noun
 *   gr-l3-complex-comparisons  much / far / slightly + so sánh hơn, twice as … as, the more … the more
 *
 * Cấu trúc mỗi bài và quy ước id: giống level-1-grammar-lessons-part2.ts.
 * Câu ví dụ hướng tới IELTS Writing Task 1 + 2. Do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level3GrammarLessonsPart3: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Liên kết nâng cao
  // ==========================================================================
  {
    id: 'gr-l3-cohesion',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 10,
    title: { vi: 'Luyện tập: although, despite, whereas, therefore', en: 'Practice: although, despite, whereas, therefore' },
    description: {
      vi: 'Dùng từ nối nâng cao đúng cấu trúc phía sau — điểm cộng Coherence & Cohesion.',
      en: 'Use advanced linkers with the right structure after them — a plus for Coherence and Cohesion.',
    },
    teachingCards: [
      {
        title: { vi: 'Mệnh đề hay danh từ?', en: 'Clause or noun?' },
        body: {
          vi: '**although / even though + mệnh đề (S + V)**: Although the city is crowded, it is safe.\n**despite / in spite of + danh từ / V-ing**: Despite the traffic, it is safe. Despite **being** crowded, …\nMẹo: "despite **the fact that** + mệnh đề" khi buộc phải dùng mệnh đề.\nSai: "Despite it is crowded".',
          en: '**although / even though + clause (S + V)**: Although the city is crowded, it is safe.\n**despite / in spite of + noun / V-ing**: Despite the traffic, it is safe. Despite **being** crowded, …\nTip: use "despite **the fact that** + clause" when you need a clause.\nWrong: "Despite it is crowded".',
        },
        examples: [
          { en: 'Although prices rose, sales continued to increase.', vi: 'Dù giá tăng, doanh số vẫn tiếp tục tăng.' },
          { en: 'Despite the high cost, many families choose private schools.', vi: 'Bất chấp chi phí cao, nhiều gia đình chọn trường tư.' },
        ],
      },
      {
        title: { vi: 'Đối lập, kết quả, tham chiếu', en: 'Contrast, result, reference' },
        body: {
          vi: '**whereas / while**: so sánh hai đối tượng trong **cùng một câu** (rất hợp Task 1): Men preferred football, whereas women chose swimming.\n**Therefore, / As a result,**: kết quả, đầu câu mới, có dấu phẩy.\n**this / these + danh từ** để nhắc lại ý trước, tránh lặp: … taxes rose. **This increase** led to …',
          en: '**whereas / while**: compare two things **in one sentence** (great for Task 1): Men preferred football, whereas women chose swimming.\n**Therefore, / As a result,**: a result, starting a new sentence, followed by a comma.\n**this / these + noun** to refer back and avoid repetition: … taxes rose. **This increase** led to …',
        },
        examples: [
          { en: 'Car use fell sharply, whereas cycling doubled.', vi: 'Việc dùng ô tô giảm mạnh, trong khi đi xe đạp tăng gấp đôi.' },
          { en: 'Rents are rising. Therefore, many young people live with their parents.', vi: 'Giá thuê nhà đang tăng. Vì vậy, nhiều người trẻ sống với bố mẹ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-cohesion-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối từ nối với cấu trúc đi sau nó.', en: 'Match each linker with what follows it.' },
        pairs: [
          { left: 'although', right: '+ subject + verb' },
          { left: 'despite', right: '+ noun / V-ing' },
          { left: 'Therefore,', right: '+ result (new sentence)' },
          { left: 'whereas', right: '+ contrasting clause' },
        ],
        explanation: { vi: 'although + mệnh đề; despite + danh từ; Therefore, đầu câu; whereas nối hai mệnh đề đối lập.', en: 'although + clause; despite + noun; Therefore, starts a sentence; whereas joins two contrasting clauses.' },
      },
      {
        id: 'gr-l3-cohesion-ex02',
        type: 'multiple-choice',
        question: '___ the bad weather, the festival went ahead.',
        options: ['Although', 'Despite', 'Even though', 'Whereas'],
        correctIndex: 1,
        explanation: { vi: '"the bad weather" là cụm danh từ → Despite.', en: '"the bad weather" is a noun phrase → Despite.' },
      },
      {
        id: 'gr-l3-cohesion-ex03',
        type: 'multiple-choice',
        question: '___ he had little experience, he got the job.',
        options: ['Despite', 'In spite of', 'Although', 'Therefore'],
        correctIndex: 2,
        explanation: { vi: '"he had little experience" là mệnh đề → Although.', en: '"he had little experience" is a clause → Although.' },
      },
      {
        id: 'gr-l3-cohesion-ex04',
        type: 'fill-blank',
        sentence: 'In 2010, 40% of people used buses, ___ only 15% cycled.',
        acceptedAnswers: ['whereas', 'while'],
        hint: '(whereas / despite)',
        explanation: { vi: 'So sánh hai số liệu đối lập trong một câu → whereas.', en: 'Comparing two contrasting figures in one sentence → whereas.' },
      },
      {
        id: 'gr-l3-cohesion-ex05',
        type: 'multiple-choice',
        question: 'The factory closed. ___, hundreds of workers lost their jobs.',
        options: ['Although', 'Despite', 'As a result', 'Whereas'],
        correctIndex: 2,
        explanation: { vi: 'Kết quả, đầu câu mới → As a result,', en: 'A result at the start of a new sentence → As a result,' },
      },
      {
        id: 'gr-l3-cohesion-ex06',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Despite it was expensive, we bought it.',
          'Despite being expensive, it sold well.',
          'Although the high price, it sold well.',
          'In spite it was expensive, it sold well.',
        ],
        correctIndex: 1,
        explanation: { vi: 'despite + V-ing → Despite being expensive.', en: 'despite + V-ing → Despite being expensive.' },
      },
      {
        id: 'gr-l3-cohesion-ex07',
        type: 'fill-blank',
        sentence: 'Online learning saves time. ___ advantage makes it popular with workers.',
        acceptedAnswers: ['This'],
        hint: '(this / these)',
        explanation: { vi: '"advantage" số ít, nhắc lại ý trước → This advantage.', en: '"advantage" is singular and refers back → This advantage.' },
      },
      {
        id: 'gr-l3-cohesion-ex08',
        type: 'arrange-words',
        translationVi: 'Mặc dù có nhiều lợi ích, mạng xã hội cũng có mặt trái.',
        correctSentence: 'Despite its many benefits, social media also has drawbacks.',
        extraWords: ['Although', 'is'],
        explanation: { vi: 'Despite + cụm danh từ (its many benefits).', en: 'Despite + noun phrase (its many benefits).' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l3-cohesion-t01',
        type: 'multiple-choice',
        question: '___ the government invested heavily, unemployment remained high.',
        options: ['Despite', 'Although', 'Therefore', 'In spite of'],
        correctIndex: 1,
        explanation: { vi: 'Theo sau là mệnh đề → Although.', en: 'A clause follows → Although.' },
      },
      {
        id: 'gr-l3-cohesion-t02',
        type: 'fill-blank',
        sentence: 'In spite ___ the rain, the match continued.',
        acceptedAnswers: ['of'],
        hint: '(in spite …)',
        explanation: { vi: 'in spite of + danh từ.', en: 'in spite of + noun.' },
      },
      {
        id: 'gr-l3-cohesion-t03',
        type: 'multiple-choice',
        question: 'Exports rose by 20%, ___ imports fell slightly.',
        options: ['whereas', 'therefore', 'despite', 'because of'],
        correctIndex: 0,
        explanation: { vi: 'Hai xu hướng đối lập → whereas.', en: 'Two opposite trends → whereas.' },
      },
      {
        id: 'gr-l3-cohesion-t04',
        type: 'multiple-choice',
        question: 'Fuel prices doubled. ___, fewer people drove to work.',
        options: ['Although', 'Whereas', 'Therefore', 'Despite'],
        correctIndex: 2,
        explanation: { vi: 'Kết quả → Therefore,', en: 'A result → Therefore,' },
      },
      {
        id: 'gr-l3-cohesion-t05',
        type: 'multiple-choice',
        question: 'Which sentence has a mistake?',
        options: [
          'Even though it was late, she kept working.',
          'Despite the fact that it was late, she kept working.',
          'Despite it was late, she kept working.',
          'Despite the late hour, she kept working.',
        ],
        correctIndex: 2,
        explanation: { vi: 'despite không đi trực tiếp với mệnh đề.', en: 'despite cannot be followed directly by a clause.' },
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: So sánh nâng cao
  // ==========================================================================
  {
    id: 'gr-l3-complex-comparisons',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 9,
    title: { vi: 'Luyện tập: so sánh nâng cao', en: 'Practice: advanced comparisons' },
    description: {
      vi: 'Nói "hơn nhiều / hơn một chút / gấp đôi" chính xác như trong Writing Task 1.',
      en: 'Say "much more / slightly more / twice as much" accurately, as in Writing Task 1.',
    },
    teachingCards: [
      {
        title: { vi: 'Mức độ chênh lệch', en: 'How big the difference is' },
        body: {
          vi: '**Chênh lệch lớn**: much / far / considerably / significantly + so sánh hơn: far more expensive.\n**Chênh lệch nhỏ**: slightly / a little / marginally + so sánh hơn: slightly higher.\nKhông dùng **very** trước so sánh hơn: Sai "very cheaper".',
          en: '**Big difference**: much / far / considerably / significantly + comparative: far more expensive.\n**Small difference**: slightly / a little / marginally + comparative: slightly higher.\nDon\'t use **very** before a comparative: Wrong "very cheaper".',
        },
        examples: [
          { en: 'Rents in the capital are considerably higher than in other cities.', vi: 'Tiền thuê nhà ở thủ đô cao hơn đáng kể so với các thành phố khác.' },
        ],
      },
      {
        title: { vi: 'Gấp mấy lần & càng … càng', en: 'Multiples & the more … the more' },
        body: {
          vi: '**twice / three times / half + as … as**: Car sales were twice as high as in 2010.\nhoặc **three times + so sánh hơn + than**: three times more popular than.\n**not nearly as … as** = kém xa: Trains are not nearly as fast as planes.\n**The + so sánh hơn …, the + so sánh hơn …**: The more you practise, the more confident you become.',
          en: '**twice / three times / half + as … as**: Car sales were twice as high as in 2010.\nor **three times + comparative + than**: three times more popular than.\n**not nearly as … as** = much less: Trains are not nearly as fast as planes.\n**The + comparative …, the + comparative …**: The more you practise, the more confident you become.',
        },
        examples: [
          { en: 'The number of tourists in 2020 was half as large as in 2019.', vi: 'Số du khách năm 2020 chỉ bằng một nửa năm 2019.' },
          { en: 'The earlier you start, the easier it will be.', vi: 'Bắt đầu càng sớm thì càng dễ.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l3-complex-comparisons-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối cụm từ với nghĩa.', en: 'Match each phrase with its meaning.' },
        pairs: [
          { left: 'slightly higher', right: 'a little higher' },
          { left: 'far higher', right: 'much higher' },
          { left: 'twice as high as', right: '2 × the amount' },
          { left: 'not nearly as high as', right: 'much lower than' },
        ],
        explanation: { vi: 'slightly = một chút; far = nhiều; twice as … as = gấp đôi; not nearly as = kém xa.', en: 'slightly = a little; far = much; twice as … as = double; not nearly as = much less.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex02',
        type: 'multiple-choice',
        question: 'Coffee consumption was ___ higher in 2020 than in 2019 (55% vs 54%).',
        options: ['far', 'considerably', 'slightly', 'very'],
        correctIndex: 2,
        explanation: { vi: 'Chỉ chênh 1% → slightly.', en: 'Only a 1% difference → slightly.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex03',
        type: 'fill-blank',
        sentence: 'In 2015, the population was twice as large ___ in 1990.',
        acceptedAnswers: ['as'],
        hint: '(as / than)',
        explanation: { vi: 'twice as … as.', en: 'twice as … as.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex04',
        type: 'multiple-choice',
        question: 'Which phrase is wrong?',
        options: ['much cheaper', 'far more expensive', 'very cheaper', 'significantly lower'],
        correctIndex: 2,
        explanation: { vi: 'very không đứng trước so sánh hơn.', en: 'very cannot go before a comparative.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex05',
        type: 'fill-blank',
        sentence: 'The more you read, the ___ your vocabulary becomes.',
        acceptedAnswers: ['richer', 'bigger', 'larger', 'better', 'wider'],
        hint: '(rich)',
        explanation: { vi: 'The + so sánh hơn …, the + so sánh hơn … → richer.', en: 'The + comparative …, the + comparative … → richer.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex06',
        type: 'multiple-choice',
        question: 'Buses carried 300 passengers; trains carried 900. Trains carried ___ buses.',
        options: ['three times as many passengers as', 'three times as much passengers as', 'three times more passengers as', 'as three times passengers as'],
        correctIndex: 0,
        explanation: { vi: 'passengers đếm được → three times as many … as.', en: 'passengers is countable → three times as many … as.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex07',
        type: 'arrange-words',
        translationVi: 'Xe đạp không nhanh bằng xe máy chút nào.',
        correctSentence: 'Bicycles are not nearly as fast as motorbikes.',
        extraWords: ['than', 'faster'],
        explanation: { vi: 'not nearly as … as = kém xa.', en: 'not nearly as … as = far less.' },
      },
      {
        id: 'gr-l3-complex-comparisons-ex08',
        type: 'arrange-words',
        translationVi: 'Giá nhà cao hơn đáng kể so với năm ngoái.',
        correctSentence: 'House prices are considerably higher than last year.',
        extraWords: ['very', 'as'],
        explanation: { vi: 'considerably + so sánh hơn + than.', en: 'considerably + comparative + than.' },
      },
    ],
    miniTest: [
      {
        id: 'gr-l3-complex-comparisons-t01',
        type: 'multiple-choice',
        question: 'Sales in June (500 units) were ___ those in May (250 units).',
        options: ['twice as high as', 'twice higher as', 'two times as higher', 'double as high than'],
        correctIndex: 0,
        explanation: { vi: '500 = 2 × 250 → twice as high as.', en: '500 = 2 × 250 → twice as high as.' },
      },
      {
        id: 'gr-l3-complex-comparisons-t02',
        type: 'fill-blank',
        sentence: 'Living in the city is ___ more expensive than living in the countryside.',
        acceptedAnswers: ['much', 'far', 'considerably', 'significantly', 'a lot'],
        hint: '(a big difference)',
        explanation: { vi: 'Chênh lệch lớn → much / far.', en: 'A big difference → much / far.' },
      },
      {
        id: 'gr-l3-complex-comparisons-t03',
        type: 'multiple-choice',
        question: 'The ___ the city grew, the worse the traffic became.',
        options: ['big', 'bigger', 'biggest', 'more big'],
        correctIndex: 1,
        explanation: { vi: 'The + so sánh hơn → The bigger.', en: 'The + comparative → The bigger.' },
      },
      {
        id: 'gr-l3-complex-comparisons-t04',
        type: 'multiple-choice',
        question: 'Unemployment fell from 6.1% to 6.0%. It was ___ lower.',
        options: ['far', 'marginally', 'considerably', 'much'],
        correctIndex: 1,
        explanation: { vi: 'Giảm 0,1% → rất ít → marginally.', en: 'A 0.1% fall is tiny → marginally.' },
      },
      {
        id: 'gr-l3-complex-comparisons-t05',
        type: 'fill-blank',
        sentence: 'The new model costs half as ___ as the old one.',
        acceptedAnswers: ['much'],
        hint: '(much / many)',
        explanation: { vi: 'Nói về giá (không đếm được) → half as much as.', en: 'Price is uncountable → half as much as.' },
      },
    ],
  },
]
