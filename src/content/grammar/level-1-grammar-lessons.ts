/**
 * level-1-grammar-lessons.ts — KHU "NGỮ PHÁP" (/grammar) · NHÓM LEVEL 1 (≈ A1 – A2)
 * ----------------------------------------------------------------------------
 * Bài ngữ pháp MỚI, viết riêng cho khu Ngữ pháp (không nằm trong chặng nào trên lộ trình).
 * Mỗi bài: category 'grammar', track 'general' (tính XP cho track tổng quát).
 *
 * Danh sách bài:
 *   gr-l1-quantifiers  Đếm được / không đếm được + some, any, much, many, a few, a little
 *   gr-l1-pronouns     Đại từ & sở hữu: I / me / my / mine, 's, it / they thay cho danh từ
 *   gr-l1-adverbs      Tính từ hay trạng từ (careful / carefully), good → well, very / quite / too
 *
 * Mỗi bài gồm:
 *   - teachingCards : 3 thẻ ngắn song ngữ, có ví dụ
 *   - exercises     : 9 bài luyện (chọn, điền, sắp xếp, nối, đúng/sai, nghe, nói)
 *   - miniTest      : [] (bài v3 không có mini-test)
 *
 * Quy ước id: bài "gr-l1-<chủ đề>", bài tập "gr-l1-<chủ đề>-ex<số>".
 * Toàn bộ câu ví dụ và bài tập do nhóm tự soạn (không chép sách).
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../content-types'

export const level1GrammarLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Danh từ đếm được / không đếm được + từ chỉ số lượng
  // ==========================================================================
  {
    id: 'gr-l1-quantifiers',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: {
      vi: 'Đếm được, không đếm được & some, any, much, many',
      en: 'Countable, uncountable & some, any, much, many',
    },
    description: {
      vi: 'Nói "bao nhiêu" cho đúng: many books nhưng much water, a few eggs nhưng a little milk.',
      en: 'Say "how much" and "how many" correctly: many books but much water, a few eggs but a little milk.',
    },
    teachingCards: [
      {
        title: { vi: 'Đếm được và không đếm được', en: 'Countable and uncountable' },
        body: {
          vi: '**Đếm được**: đếm 1, 2, 3 được → có số nhiều: an apple, two **apples**.\n**Không đếm được**: chất lỏng, chất bột, ý chung chung → **không** thêm -s, không dùng a/an: **water, rice, money, information, advice, homework, furniture**.\nSai: "two rices", "an advice".',
          en: '**Countable** nouns can be counted, so they have plurals: an apple, two **apples**.\n**Uncountable** nouns (liquids, powders, general ideas) take **no** -s and no a/an: **water, rice, money, information, advice, homework, furniture**.\nWrong: "two rices", "an advice".',
        },
        examples: [
          { en: 'I bought three bananas and some rice.', vi: 'Tôi mua ba quả chuối và một ít gạo.' },
          { en: 'My teacher gave me some useful advice.', vi: 'Thầy giáo cho tôi vài lời khuyên hữu ích.' },
        ],
      },
      {
        title: { vi: 'some và any', en: 'some and any' },
        body: {
          vi: '**some**: câu **khẳng định** và lời mời/đề nghị: I have some milk. Would you like some tea?\n**any**: câu **phủ định** và câu **hỏi**: I don\'t have any milk. Do you have any questions?\nCả hai dùng được với danh từ số nhiều **và** danh từ không đếm được.',
          en: '**some**: **positive** sentences and offers: I have some milk. Would you like some tea?\n**any**: **negatives** and **questions**: I don\'t have any milk. Do you have any questions?\nBoth go with plural nouns **and** uncountable nouns.',
        },
        examples: [
          { en: 'There are some students in the library.', vi: 'Có vài sinh viên trong thư viện.' },
          { en: 'We don\'t have any bread left.', vi: 'Chúng ta không còn chút bánh mì nào.' },
          { en: 'Is there any water in the bottle?', vi: 'Trong chai còn nước không?' },
        ],
      },
      {
        title: { vi: 'many / much, a few / a little', en: 'many / much, a few / a little' },
        body: {
          vi: '**Đếm được (số nhiều)**: **many**, **a few**, How **many**…?\n**Không đếm được**: **much**, **a little**, How **much**…?\n**a lot of** dùng được cho cả hai.\nMẹo: much thường dùng trong câu phủ định và câu hỏi; câu khẳng định hay dùng a lot of.',
          en: '**Countable (plural)**: **many**, **a few**, How **many**…?\n**Uncountable**: **much**, **a little**, How **much**…?\n**a lot of** works with both.\nTip: much is common in negatives and questions; positive sentences usually use a lot of.',
        },
        examples: [
          { en: 'How many people live in your city?', vi: 'Thành phố của bạn có bao nhiêu người?' },
          { en: 'I don\'t have much free time this week.', vi: 'Tuần này tôi không có nhiều thời gian rảnh.' },
          { en: 'Add a little salt and a few onions.', vi: 'Cho một chút muối và vài củ hành.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-quantifiers-ex01',
        type: 'match-pairs',
        instruction: { vi: 'Nối mỗi danh từ với nhóm của nó.', en: 'Match each noun with the right phrase.' },
        pairs: [
          { left: 'two', right: 'books' },
          { left: 'a glass of', right: 'water' },
          { left: 'a piece of', right: 'advice' },
          { left: 'a kilo of', right: 'rice' },
        ],
        explanation: {
          vi: 'Danh từ đếm được đi với số; không đếm được cần "a glass of, a piece of…".',
          en: 'Countable nouns take numbers; uncountable nouns need "a glass of, a piece of…".',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex02',
        type: 'multiple-choice',
        question: 'How ___ students are there in your class?',
        options: ['much', 'many', 'little', 'any'],
        correctIndex: 1,
        explanation: {
          vi: '"students" đếm được, số nhiều → How many.',
          en: '"students" is a plural countable noun → How many.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex03',
        type: 'fill-blank',
        sentence: 'Sorry, I don\'t have ___ money with me today.',
        acceptedAnswers: ['any', 'much'],
        hint: '(some / any)',
        explanation: {
          vi: 'Câu phủ định (don\'t) → dùng any.',
          en: 'It is a negative sentence (don\'t) → any.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She gave me an useful information.',
          'She gave me some useful informations.',
          'She gave me some useful information.',
          'She gave me many useful information.',
        ],
        correctIndex: 2,
        explanation: {
          vi: '"information" không đếm được: không thêm -s, không dùng an/many → some information.',
          en: '"information" is uncountable: no -s, no an/many → some information.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex05',
        type: 'fill-blank',
        sentence: 'Can you put a ___ sugar in my coffee, please?',
        acceptedAnswers: ['little'],
        hint: '(few / little)',
        explanation: {
          vi: '"sugar" không đếm được → a little.',
          en: '"sugar" is uncountable → a little.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex06',
        type: 'true-false',
        statement: '"We have a lot of homework tonight." is a correct sentence.',
        answer: 'TRUE',
        allowNotGiven: false,
        explanation: {
          vi: '"a lot of" dùng được với danh từ không đếm được như homework.',
          en: '"a lot of" works with uncountable nouns like homework.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex07',
        type: 'arrange-words',
        translationVi: 'Có vài quán cà phê gần trường tôi.',
        correctSentence: 'There are a few cafés near my school.',
        extraWords: ['little'],
        explanation: {
          vi: '"cafés" đếm được, số nhiều → a few.',
          en: '"cafés" is a plural countable noun → a few.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex08',
        type: 'listen-choose',
        audioText: 'How much water do you drink every day?',
        question: 'What does the speaker ask about?',
        options: ['How many bottles you buy', 'How much water you drink', 'How often you cook', 'How many glasses you wash'],
        correctIndex: 1,
        explanation: {
          vi: 'Người nói hỏi "How much water" — water không đếm được nên dùng much.',
          en: 'The speaker says "How much water" — water is uncountable, so much.',
        },
      },
      {
        id: 'gr-l1-quantifiers-ex09',
        type: 'speak-sentence',
        sentence: 'I eat a lot of vegetables, but I don\'t eat much meat.',
        translationVi: 'Tôi ăn nhiều rau, nhưng tôi không ăn nhiều thịt.',
        explanation: {
          vi: 'Nhớ đọc rõ âm cuối /z/ trong "vegetables".',
          en: 'Say the final /z/ in "vegetables" clearly.',
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 2: Đại từ nhân xưng, tính từ sở hữu, đại từ sở hữu, 's
  // ==========================================================================
  {
    id: 'gr-l1-pronouns',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: {
      vi: 'Đại từ & sở hữu: I, me, my, mine, \'s',
      en: 'Pronouns & possessives: I, me, my, mine, \'s',
    },
    description: {
      vi: 'Không còn lẫn he / him / his, biết dùng \'s và it / they để khỏi lặp lại danh từ.',
      en: 'Stop mixing he / him / his, and use \'s and it / they so you don\'t repeat nouns.',
    },
    teachingCards: [
      {
        title: { vi: 'Đứng trước hay sau động từ?', en: 'Before or after the verb?' },
        body: {
          vi: '**Chủ ngữ** (đứng trước động từ): **I, you, he, she, it, we, they**.\n**Tân ngữ** (sau động từ hoặc giới từ): **me, you, him, her, it, us, them**.\nSai: "Me and my sister go…" → Đúng: "**My sister and I** go…".\nSai: "Call I later." → Đúng: "Call **me** later."',
          en: '**Subject** (before the verb): **I, you, he, she, it, we, they**.\n**Object** (after a verb or preposition): **me, you, him, her, it, us, them**.\nWrong: "Me and my sister go…" → Right: "**My sister and I** go…".\nWrong: "Call I later." → Right: "Call **me** later."',
        },
        examples: [
          { en: 'She helps me with my maths homework.', vi: 'Chị ấy giúp tôi làm bài tập toán.' },
          { en: 'We visit them every Sunday.', vi: 'Chúng tôi thăm họ mỗi Chủ nhật.' },
        ],
      },
      {
        title: { vi: 'my hay mine? Và \'s', en: 'my or mine? And \'s' },
        body: {
          vi: '**Tính từ sở hữu** + danh từ: **my, your, his, her, its, our, their** book.\n**Đại từ sở hữu** đứng một mình: **mine, yours, his, hers, ours, theirs**.\nThis is **my** phone. → This phone is **mine**.\nCủa một người: **Lan\'s** bike. Số nhiều có -s: my **parents\'** house.\nLưu ý: **his** cho nam, **her** cho nữ.',
          en: '**Possessive adjectives** + noun: **my, your, his, her, its, our, their** book.\n**Possessive pronouns** stand alone: **mine, yours, his, hers, ours, theirs**.\nThis is **my** phone. → This phone is **mine**.\nFor a person: **Lan\'s** bike. Plural -s: my **parents\'** house.\nNote: **his** for a man, **her** for a woman.',
        },
        examples: [
          { en: 'Is this your umbrella? — No, it isn\'t mine.', vi: 'Đây là ô của bạn à? — Không, không phải của tôi.' },
          { en: 'My mother\'s cooking is the best.', vi: 'Món mẹ tôi nấu là ngon nhất.' },
          { en: 'Nam loves his new job.', vi: 'Nam rất thích công việc mới của anh ấy.' },
        ],
      },
      {
        title: { vi: 'it / they: khỏi lặp lại danh từ', en: 'it / they: don\'t repeat the noun' },
        body: {
          vi: 'Khi đã nói một danh từ rồi, câu sau dùng **it** (số ít) hoặc **they / them** (số nhiều) thay cho nó.\nI bought a new laptop. **It** is very light.\nMy grandparents live in Hue. I miss **them**.\nĐây cũng là kỹ năng đọc IELTS: tìm xem **it / they** thay cho từ nào.',
          en: 'After you mention a noun, use **it** (singular) or **they / them** (plural) instead of repeating it.\nI bought a new laptop. **It** is very light.\nMy grandparents live in Hue. I miss **them**.\nIn IELTS Reading, you often need to find what **it / they** refers to.',
        },
        examples: [
          { en: 'The park is small, but it is very clean.', vi: 'Công viên nhỏ, nhưng nó rất sạch.' },
          { en: 'I have two cats. They sleep all day.', vi: 'Tôi có hai con mèo. Chúng ngủ cả ngày.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-pronouns-ex01',
        type: 'multiple-choice',
        question: 'My brother and ___ share a bedroom.',
        options: ['me', 'I', 'my', 'mine'],
        correctIndex: 1,
        explanation: {
          vi: 'Đây là chủ ngữ (đứng trước động từ "share") → I.',
          en: 'It is part of the subject, before the verb "share" → I.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex02',
        type: 'fill-blank',
        sentence: 'Our teacher is very kind. We all like ___.',
        acceptedAnswers: ['her', 'him'],
        hint: '(she / her)',
        explanation: {
          vi: 'Sau động từ "like" cần tân ngữ → her (hoặc him).',
          en: 'After the verb "like" we need an object pronoun → her (or him).',
        },
      },
      {
        id: 'gr-l1-pronouns-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ sở hữu với đại từ sở hữu.', en: 'Match the possessive adjective with the possessive pronoun.' },
        pairs: [
          { left: 'my', right: 'mine' },
          { left: 'your', right: 'yours' },
          { left: 'her', right: 'hers' },
          { left: 'our', right: 'ours' },
          { left: 'their', right: 'theirs' },
        ],
        explanation: {
          vi: 'Đại từ sở hữu đứng một mình, không có danh từ theo sau.',
          en: 'Possessive pronouns stand alone, with no noun after them.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex04',
        type: 'multiple-choice',
        question: 'That blue bag isn\'t ___. Mine is black.',
        options: ['my', 'me', 'mine', 'I'],
        correctIndex: 2,
        explanation: {
          vi: 'Không có danh từ theo sau → dùng đại từ sở hữu mine.',
          en: 'No noun follows → use the possessive pronoun mine.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex05',
        type: 'arrange-words',
        translationVi: 'Nhà của bố mẹ tôi gần chợ.',
        correctSentence: "My parents' house is near the market.",
        extraWords: ['parent'],
        explanation: {
          vi: '"parents" số nhiều đã có -s → chỉ thêm dấu \' : parents\' house.',
          en: '"parents" already ends in -s → just add an apostrophe: parents\' house.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex06',
        type: 'true-false',
        statement: '"Minh is a doctor. Her works in a big hospital." is correct.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: 'Minh là nam và cần chủ ngữ → "He works in a big hospital."',
          en: 'Minh is a man and we need a subject → "He works in a big hospital."',
        },
      },
      {
        id: 'gr-l1-pronouns-ex07',
        type: 'multiple-choice',
        question: 'I read two articles about plastic. ___ were very interesting.',
        options: ['It', 'They', 'Them', 'Their'],
        correctIndex: 1,
        explanation: {
          vi: '"two articles" số nhiều, làm chủ ngữ → They.',
          en: '"two articles" is plural and the subject → They.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex08',
        type: 'fill-blank',
        sentence: 'Lan and Mai are sisters. This is ___ bedroom.',
        acceptedAnswers: ['their'],
        hint: '(they)',
        explanation: {
          vi: 'Phòng của hai người (they) + danh từ bedroom → tính từ sở hữu their.',
          en: 'The room belongs to two people (they), before a noun → their.',
        },
      },
      {
        id: 'gr-l1-pronouns-ex09',
        type: 'listen-type',
        audioText: 'My friends live near me, so I see them every day.',
        acceptedAnswers: ['My friends live near me, so I see them every day.', 'My friends live near me so I see them every day'],
        explanation: {
          vi: '"me" và "them" đứng sau giới từ/động từ nên là tân ngữ.',
          en: '"me" and "them" come after a preposition/verb, so they are object pronouns.',
        },
      },
    ],
    miniTest: [],
  },

  // ==========================================================================
  // BÀI 3: Tính từ & trạng từ
  // ==========================================================================
  {
    id: 'gr-l1-adverbs',
    skill: 'writing',
    mode: 'practice',
    category: 'grammar',
    track: 'general',
    estimatedMinutes: 8,
    title: {
      vi: 'Tính từ & trạng từ: careful hay carefully?',
      en: 'Adjectives & adverbs: careful or carefully?',
    },
    description: {
      vi: 'Tính từ tả người/vật, trạng từ tả cách làm; thêm very, quite, really, too cho câu rõ nghĩa.',
      en: 'Adjectives describe people and things, adverbs describe actions; add very, quite, really, too.',
    },
    teachingCards: [
      {
        title: { vi: 'Tính từ hay trạng từ?', en: 'Adjective or adverb?' },
        body: {
          vi: '**Tính từ** tả **danh từ**, đứng trước danh từ hoặc sau be: a **careful** driver, He is **careful**.\n**Trạng từ cách thức** tả **động từ** (làm thế nào), thường đứng sau động từ/tân ngữ: He drives **carefully**.\nSai: "She speaks English good." → Đúng: "She speaks English **well**."',
          en: 'An **adjective** describes a **noun**, before the noun or after be: a **careful** driver, He is **careful**.\nAn **adverb of manner** describes a **verb** (how), usually after the verb/object: He drives **carefully**.\nWrong: "She speaks English good." → Right: "She speaks English **well**."',
        },
        examples: [
          { en: 'My grandmother is a slow walker. She walks slowly.', vi: 'Bà tôi đi chậm. Bà bước đi chậm rãi.' },
          { en: 'Please listen carefully.', vi: 'Hãy nghe cẩn thận nhé.' },
        ],
      },
      {
        title: { vi: 'Cách tạo trạng từ', en: 'How to make adverbs' },
        body: {
          vi: 'Thường thêm **-ly**: quick → quick**ly**, careful → careful**ly**.\nĐuôi **-y** → **-ily**: easy → eas**ily**, happy → happ**ily**.\nĐuôi **-le** → **-ly**: gentle → gent**ly**.\n**Bất quy tắc**: good → **well**; fast → **fast**; hard → **hard** (hardly = hầu như không!).',
          en: 'Usually add **-ly**: quick → quick**ly**, careful → careful**ly**.\n**-y** → **-ily**: easy → eas**ily**, happy → happ**ily**.\n**-le** → **-ly**: gentle → gent**ly**.\n**Irregular**: good → **well**; fast → **fast**; hard → **hard** (hardly means "almost not"!).',
        },
        examples: [
          { en: 'She passed the test easily.', vi: 'Cô ấy qua bài kiểm tra dễ dàng.' },
          { en: 'My father works hard every day.', vi: 'Bố tôi làm việc chăm chỉ mỗi ngày.' },
        ],
      },
      {
        title: { vi: 'very, quite, really, too', en: 'very, quite, really, too' },
        body: {
          vi: 'Các từ này đứng **trước** tính từ hoặc trạng từ để nói **mức độ**:\n**quite** = khá · **very / really** = rất · **too** = **quá** (thường mang ý **không tốt**).\nThe soup is **very** hot. (rất nóng)\nThe soup is **too** hot to eat. (nóng quá, không ăn được)',
          en: 'These words go **before** an adjective or adverb to show **degree**:\n**quite** = fairly · **very / really** = to a high degree · **too** = **more than is good**.\nThe soup is **very** hot.\nThe soup is **too** hot to eat. (so you can\'t eat it)',
        },
        examples: [
          { en: 'The bus was quite late this morning.', vi: 'Sáng nay xe buýt đến khá muộn.' },
          { en: 'This bag is too heavy for me.', vi: 'Cái túi này nặng quá đối với tôi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'gr-l1-adverbs-ex01',
        type: 'multiple-choice',
        question: 'Please drive ___. The road is wet.',
        options: ['careful', 'carefully', 'care', 'more careful'],
        correctIndex: 1,
        explanation: {
          vi: 'Tả cách lái (động từ drive) → trạng từ carefully.',
          en: 'It describes how you drive (a verb) → the adverb carefully.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex02',
        type: 'fill-blank',
        sentence: 'My son plays the guitar very ___.',
        acceptedAnswers: ['well'],
        hint: '(good)',
        explanation: {
          vi: 'Trạng từ của good là well (bất quy tắc).',
          en: 'The adverb of good is well (irregular).',
        },
      },
      {
        id: 'gr-l1-adverbs-ex03',
        type: 'match-pairs',
        instruction: { vi: 'Nối tính từ với trạng từ của nó.', en: 'Match each adjective with its adverb.' },
        pairs: [
          { left: 'quick', right: 'quickly' },
          { left: 'easy', right: 'easily' },
          { left: 'gentle', right: 'gently' },
          { left: 'good', right: 'well' },
          { left: 'fast', right: 'fast' },
        ],
        explanation: {
          vi: '-y → -ily, -le → -ly; good → well, fast giữ nguyên.',
          en: '-y → -ily, -le → -ly; good → well, fast stays the same.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She is a beautifully singer.',
          'She sings beautiful.',
          'She sings beautifully.',
          'She beautifully is a singer.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Tả cách hát (động từ sings) → trạng từ beautifully, đứng sau động từ.',
          en: 'It describes how she sings → the adverb beautifully, after the verb.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex05',
        type: 'fill-blank',
        sentence: 'The test was ___. Everyone passed.',
        acceptedAnswers: ['easy'],
        hint: '(easy / easily)',
        explanation: {
          vi: 'Sau "be" (was) dùng tính từ → easy.',
          en: 'After "be" (was) we use an adjective → easy.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex06',
        type: 'multiple-choice',
        question: 'This coffee is ___ sweet. I can\'t drink it.',
        options: ['quite', 'very', 'too', 'really'],
        correctIndex: 2,
        explanation: {
          vi: '"I can\'t drink it" → ngọt quá mức, không tốt → too.',
          en: '"I can\'t drink it" → more than is good → too.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex07',
        type: 'true-false',
        statement: '"My mother works hardly every day." means she works a lot.',
        answer: 'FALSE',
        allowNotGiven: false,
        explanation: {
          vi: '"hardly" = hầu như không. Làm chăm chỉ phải nói "works hard".',
          en: '"hardly" means "almost not". Working a lot is "works hard".',
        },
      },
      {
        id: 'gr-l1-adverbs-ex08',
        type: 'arrange-words',
        translationVi: 'Anh ấy nói tiếng Anh khá tốt.',
        correctSentence: 'He speaks English quite well.',
        extraWords: ['good'],
        explanation: {
          vi: 'Tả cách nói → well; quite đứng trước well.',
          en: 'It describes how he speaks → well; quite goes before well.',
        },
      },
      {
        id: 'gr-l1-adverbs-ex09',
        type: 'speak-sentence',
        sentence: 'She is a careful student, so she checks her work carefully.',
        translationVi: 'Cô ấy là học sinh cẩn thận, nên cô ấy kiểm tra bài rất cẩn thận.',
        explanation: {
          vi: 'Đọc rõ âm cuối /l/ trong "careful" và /i/ trong "carefully".',
          en: 'Say the final /l/ in "careful" and the final /i/ in "carefully".',
        },
      },
    ],
    miniTest: [],
  },
]
