/**
 * writing-lessons.ts — LEVEL 1 (Band 0 – 2.0) — KỸ NĂNG VIẾT (WRITING)
 * ----------------------------------------------------------------------------
 * File này chứa 4 bài học Viết cho người mới bắt đầu.
 * Lộ trình: viết đúng 1 câu → dùng mạo từ & số nhiều → nối ý → viết 1 đoạn văn ngắn.
 * Mỗi bài gồm:
 *   - teachingCards : thẻ lý thuyết song ngữ (ngữ pháp + quy tắc viết)
 *   - exercises     : 10 bài luyện (sắp xếp từ, điền từ, chọn câu đúng)
 *                     và đúng 1 bài "write-answer" (viết tự do, AI chấm).
 *   - miniTest      : 6 câu kiểm tra cuối bài (có 1 câu write-answer).
 *
 * Quy ước id: "l1-write-<số bài>-ex<số>" và "l1-write-<số bài>-test<số>".
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1WritingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Chữ hoa, dấu chấm và câu cơ bản S + V + O
  // ==========================================================================
  {
    id: 'l1-write-01',
    skill: 'writing',
    title: { vi: 'Chữ hoa, dấu chấm và câu S + V + O', en: 'Capital letters, full stops and S + V + O' },
    description: {
      vi: 'Viết một câu tiếng Anh đúng: viết hoa đầu câu, có dấu chấm và đúng trật tự Chủ ngữ + Động từ + Tân ngữ.',
      en: 'Write a correct English sentence: a capital letter, a full stop and Subject + Verb + Object order.',
    },
    teachingCards: [
      {
        title: { vi: 'Chữ hoa và dấu chấm', en: 'Capital letters and full stops' },
        body: {
          vi: 'Luôn **viết hoa chữ cái đầu câu** và kết thúc câu bằng **dấu chấm (.)** hoặc **dấu hỏi (?)**.\nCũng viết hoa:\n- Đại từ **I** (tôi) — ở bất cứ vị trí nào trong câu.\n- **Tên người, tên địa danh**: Lan, Hanoi, Vietnam.\n- **Ngày trong tuần, tháng, ngôn ngữ**: Monday, May, English.',
          en: 'Always **start a sentence with a capital letter** and end it with a **full stop (.)** or **question mark (?)**.\nAlso use capitals for:\n- The pronoun **I** — anywhere in a sentence.\n- **Names of people and places**: Lan, Hanoi, Vietnam.\n- **Days, months, languages**: Monday, May, English.',
        },
        examples: [
          { en: 'My friend Lan lives in Hanoi.', vi: 'Bạn tôi, Lan, sống ở Hà Nội.' },
          { en: 'On Monday, I study English.', vi: 'Vào thứ Hai, tôi học tiếng Anh.' },
        ],
      },
      {
        title: { vi: 'Trật tự câu: S + V + O', en: 'Word order: S + V + O' },
        body: {
          vi: 'Câu tiếng Anh cơ bản: **Chủ ngữ (S) + Động từ (V) + Tân ngữ (O)**.\n**S** = ai/cái gì làm: I, my mother, Nam.\n**V** = hành động: like, eat, read.\n**O** = người/vật nhận hành động: rice, books, football.\nMỗi câu **phải có động từ**. Sai: "I happy." → Đúng: "I **am** happy."',
          en: 'Basic English sentence: **Subject (S) + Verb (V) + Object (O)**.\n**S** = who/what does it: I, my mother, Nam.\n**V** = the action: like, eat, read.\n**O** = who/what receives it: rice, books, football.\nEvery sentence **needs a verb**. Wrong: "I happy." → Right: "I **am** happy."',
        },
        examples: [
          { en: 'I like football.', vi: 'Tôi thích bóng đá.' },
          { en: 'My mother cooks rice.', vi: 'Mẹ tôi nấu cơm.' },
          { en: 'Nam reads books.', vi: 'Nam đọc sách.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-01-ex01',
        type: 'multiple-choice',
        question: 'Which sentence is written correctly?',
        options: ['i like music.', 'I like music', 'I like music.', 'i like Music.'],
        correctIndex: 2,
        explanation: {
          vi: 'Viết hoa "I" và có dấu chấm ở cuối câu.',
          en: 'Capital "I" and a full stop at the end.',
        },
      },
      {
        id: 'l1-write-01-ex02',
        type: 'arrange-words',
        translationVi: 'Tôi ăn cơm.',
        correctSentence: 'I eat rice.',
        explanation: {
          vi: 'S (I) + V (eat) + O (rice).',
          en: 'S (I) + V (eat) + O (rice).',
        },
      },
      {
        id: 'l1-write-01-ex03',
        type: 'multiple-choice',
        question: 'Which word needs a capital letter? "my sister lives in danang."',
        options: ['sister', 'lives', 'danang', 'in'],
        correctIndex: 2,
        explanation: {
          vi: 'Tên địa danh phải viết hoa: Da Nang. (Chữ "my" đầu câu cũng phải viết hoa.)',
          en: 'Place names need a capital: Da Nang. ("My" at the start also needs a capital.)',
        },
      },
      {
        id: 'l1-write-01-ex04',
        type: 'fill-blank',
        sentence: 'I ___ happy today.',
        acceptedAnswers: ['am'],
        hint: '(be)',
        explanation: {
          vi: 'Câu cần động từ: I am happy.',
          en: 'The sentence needs a verb: I am happy.',
        },
      },
      {
        id: 'l1-write-01-ex05',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi uống trà.',
        correctSentence: 'My mother drinks tea.',
        extraWords: ['drink'],
        explanation: {
          vi: '"My mother" là ngôi thứ ba số ít nên dùng "drinks".',
          en: '"My mother" is third person singular, so use "drinks".',
        },
      },
      {
        id: 'l1-write-01-ex06',
        type: 'multiple-choice',
        question: 'Which sentence has the correct word order?',
        options: ['Football I like.', 'I football like.', 'Like I football.', 'I like football.'],
        correctIndex: 3,
        explanation: {
          vi: 'Trật tự đúng: S + V + O → I like football.',
          en: 'Correct order: S + V + O → I like football.',
        },
      },
      {
        id: 'l1-write-01-ex07',
        type: 'fill-blank',
        sentence: 'We study English on ___.',
        acceptedAnswers: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        hint: '(a day of the week)',
        explanation: {
          vi: 'Ngày trong tuần luôn viết hoa: Monday, Friday...',
          en: 'Days of the week always start with a capital: Monday, Friday...',
        },
      },
      {
        id: 'l1-write-01-ex08',
        type: 'arrange-words',
        translationVi: 'Nam chơi bóng đá vào thứ Bảy.',
        correctSentence: 'Nam plays football on Saturday.',
        extraWords: ['play', 'in'],
        explanation: {
          vi: 'Tên người và ngày trong tuần đều viết hoa.',
          en: 'Names and days of the week are both capitalised.',
        },
      },
      {
        id: 'l1-write-01-ex09',
        type: 'multiple-choice',
        question: 'Which sentence is a complete sentence?',
        options: ['My brother tall.', 'My brother is tall.', 'is tall my brother.', 'My brother tall is.'],
        correctIndex: 1,
        explanation: {
          vi: 'Câu cần có động từ "is" và đúng trật tự.',
          en: 'The sentence needs the verb "is" in the correct position.',
        },
      },
      {
        id: 'l1-write-01-ex10',
        type: 'write-answer',
        prompt: 'Write 3–4 sentences about things you like. Use S + V + O. Example: "I like cats."',
        tipsVi:
          'Mỗi câu: viết hoa chữ đầu, có động từ, kết thúc bằng dấu chấm. Dùng I like / I eat / I play / I read + tân ngữ.',
        minWords: 20,
        sampleAnswer:
          'I like cats very much. I eat noodles for breakfast every day. I play badminton with my friends on Sunday. I read comics in the evening.',
        explanation: {
          vi: 'Kiểm tra: mỗi câu có chữ hoa đầu câu, động từ và dấu chấm.',
          en: 'Check: each sentence has a capital letter, a verb and a full stop.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-01-test01',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['we live in vietnam.', 'We live in Vietnam.', 'We live in vietnam', 'we Live in Vietnam.'],
        correctIndex: 1,
      },
      {
        id: 'l1-write-01-test02',
        type: 'arrange-words',
        translationVi: 'Tôi đọc sách.',
        correctSentence: 'I read books.',
        extraWords: ['reads'],
      },
      {
        id: 'l1-write-01-test03',
        type: 'fill-blank',
        sentence: 'My father ___ coffee every morning.',
        acceptedAnswers: ['drinks'],
        hint: '(drink)',
        explanation: {
          vi: '"My father" = he → drinks.',
          en: '"My father" = he → drinks.',
        },
      },
      {
        id: 'l1-write-01-test04',
        type: 'multiple-choice',
        question: 'Which word must ALWAYS be written with a capital letter?',
        options: ['book', 'I', 'school', 'happy'],
        correctIndex: 1,
        explanation: {
          vi: 'Đại từ "I" luôn viết hoa ở mọi vị trí.',
          en: 'The pronoun "I" is always a capital letter.',
        },
      },
      {
        id: 'l1-write-01-test05',
        type: 'arrange-words',
        translationVi: 'Lan học tiếng Anh.',
        correctSentence: 'Lan studies English.',
        extraWords: ['study'],
      },
      {
        id: 'l1-write-01-test06',
        type: 'write-answer',
        prompt: 'Write 3 sentences about your family members and what they do. Example: "My mother cooks dinner."',
        tipsVi: 'Dùng S + V + O. Nhớ thêm -s vào động từ khi chủ ngữ là he/she/my mother/my father.',
        minWords: 20,
        sampleAnswer:
          'My mother cooks dinner every day. My father reads the newspaper in the morning. My little brother plays games on his phone.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Mạo từ a / an / the và danh từ số nhiều
  // ==========================================================================
  {
    id: 'l1-write-02',
    skill: 'writing',
    title: { vi: 'A / an / the và danh từ số nhiều', en: 'A / an / the and plural nouns' },
    description: {
      vi: 'Dùng đúng mạo từ a, an, the và viết đúng danh từ số nhiều.',
      en: 'Use a, an and the correctly and write plural nouns correctly.',
    },
    teachingCards: [
      {
        title: { vi: 'A, an hay the?', en: 'A, an or the?' },
        body: {
          vi: '**a / an** = một (lần đầu nhắc tới, chưa xác định), dùng với danh từ đếm được số ít.\n**a** + âm phụ âm: **a** cat, **a** book, **a** university (âm /j/).\n**an** + âm nguyên âm: **an** apple, **an** egg, **an** hour (h câm).\n**the** = cái đó (người nghe đã biết, hoặc chỉ có một): **the** sun, **the** cat I told you about.',
          en: '**a / an** = one (first mention, not specific), used with singular countable nouns.\n**a** + consonant sound: **a** cat, **a** book, **a** university (/j/ sound).\n**an** + vowel sound: **an** apple, **an** egg, **an** hour (silent h).\n**the** = a specific one (already known, or only one exists): **the** sun, **the** cat I told you about.',
        },
        examples: [
          { en: 'I have a dog. The dog is very small.', vi: 'Tôi có một con chó. Con chó đó rất nhỏ.' },
          { en: 'She eats an apple every day.', vi: 'Cô ấy ăn một quả táo mỗi ngày.' },
        ],
      },
      {
        title: { vi: 'Danh từ số nhiều', en: 'Plural nouns' },
        body: {
          vi: 'Hầu hết thêm **-s**: book → book**s**, cat → cat**s**.\nTận cùng **-s, -sh, -ch, -x, -o**: thêm **-es** → bus → bus**es**, box → box**es**, tomato → tomato**es**.\nPhụ âm + **-y**: đổi y → **-ies** → baby → bab**ies**, city → cit**ies**.\nBất quy tắc: man → **men**, woman → **women**, child → **children**, person → **people**.\nSố nhiều **không dùng a/an**: Sai: "a books" → Đúng: "books".',
          en: 'Most nouns add **-s**: book → book**s**, cat → cat**s**.\nEnding in **-s, -sh, -ch, -x, -o**: add **-es** → bus → bus**es**, box → box**es**, tomato → tomato**es**.\nConsonant + **-y**: change to **-ies** → baby → bab**ies**, city → cit**ies**.\nIrregular: man → **men**, woman → **women**, child → **children**, person → **people**.\nNo a/an with plurals: Wrong: "a books" → Right: "books".',
        },
        examples: [
          { en: 'There are three boxes on the table.', vi: 'Có ba cái hộp trên bàn.' },
          { en: 'Two children are playing in the park.', vi: 'Hai đứa trẻ đang chơi trong công viên.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-02-ex01',
        type: 'fill-blank',
        sentence: 'I eat ___ egg for breakfast.',
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: {
          vi: '"egg" bắt đầu bằng âm nguyên âm → an egg.',
          en: '"egg" starts with a vowel sound → an egg.',
        },
      },
      {
        id: 'l1-write-02-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct phrase.',
        options: ['a umbrella', 'an umbrella', 'an book', 'a apple'],
        correctIndex: 1,
        explanation: {
          vi: '"umbrella" bắt đầu bằng âm nguyên âm /ʌ/ → an umbrella.',
          en: '"umbrella" starts with the vowel sound /ʌ/ → an umbrella.',
        },
      },
      {
        id: 'l1-write-02-ex03',
        type: 'fill-blank',
        sentence: 'There are two ___ in my street.',
        acceptedAnswers: ['buses'],
        hint: '(bus)',
        explanation: {
          vi: 'bus tận cùng bằng -s → thêm -es: buses.',
          en: 'bus ends in -s → add -es: buses.',
        },
      },
      {
        id: 'l1-write-02-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi có một con mèo. Con mèo màu đen.',
        correctSentence: 'I have a cat. The cat is black.',
        extraWords: ['an'],
        explanation: {
          vi: 'Lần đầu nhắc dùng "a", lần sau dùng "the" vì người đọc đã biết.',
          en: 'Use "a" the first time, then "the" because the reader already knows it.',
        },
      },
      {
        id: 'l1-write-02-ex05',
        type: 'multiple-choice',
        question: 'What is the plural of "child"?',
        options: ['childs', 'childes', 'children', 'childrens'],
        correctIndex: 2,
        explanation: {
          vi: '"child" là danh từ bất quy tắc: children.',
          en: '"child" is irregular: children.',
        },
      },
      {
        id: 'l1-write-02-ex06',
        type: 'fill-blank',
        sentence: '___ sun is very hot today.',
        acceptedAnswers: ['The'],
        hint: '(a / an / the)',
        explanation: {
          vi: 'Chỉ có một mặt trời nên dùng "the". Đầu câu viết hoa: The.',
          en: 'There is only one sun, so use "the". Capitalise it at the start: The.',
        },
      },
      {
        id: 'l1-write-02-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I have a books.', 'I have two book.', 'I have two books.', 'I have an two books.'],
        correctIndex: 2,
        explanation: {
          vi: 'Số nhiều không dùng a/an, và danh từ phải thêm -s.',
          en: 'No a/an with plurals, and the noun needs -s.',
        },
      },
      {
        id: 'l1-write-02-ex08',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi là một y tá.',
        correctSentence: 'My mother is a nurse.',
        extraWords: ['an', 'the'],
        explanation: {
          vi: 'Nói nghề nghiệp dùng a/an; "nurse" bắt đầu bằng phụ âm → a.',
          en: 'Use a/an for jobs; "nurse" starts with a consonant → a.',
        },
      },
      {
        id: 'l1-write-02-ex09',
        type: 'fill-blank',
        sentence: 'Hanoi and Hue are beautiful ___.',
        acceptedAnswers: ['cities'],
        hint: '(city)',
        explanation: {
          vi: 'city: phụ âm + y → đổi thành -ies: cities.',
          en: 'city: consonant + y → change to -ies: cities.',
        },
      },
      {
        id: 'l1-write-02-ex10',
        type: 'write-answer',
        prompt:
          'Describe your bedroom in 4–5 sentences. Use a / an / the and plural nouns. Example: "There is a bed in my room. The bed is small."',
        tipsVi:
          'Dùng There is a/an + danh từ số ít, There are + danh từ số nhiều. Lần nhắc thứ hai dùng "the". Ví dụ: There are two windows.',
        minWords: 25,
        sampleAnswer:
          'My bedroom is small but nice. There is a bed and a desk in my room. The desk is near the window. There are many books and two pictures on the wall. I also have an old clock.',
        explanation: {
          vi: 'Kiểm tra a/an trước danh từ số ít, -s/-es cho danh từ số nhiều và "the" cho vật đã nhắc.',
          en: 'Check a/an before singular nouns, -s/-es for plurals and "the" for things already mentioned.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-02-test01',
        type: 'multiple-choice',
        question: 'Choose the correct phrase.',
        options: ['an hour', 'a hour', 'an car', 'a orange'],
        correctIndex: 0,
        explanation: {
          vi: '"hour" có chữ h câm, bắt đầu bằng âm nguyên âm → an hour.',
          en: '"hour" has a silent h, so it starts with a vowel sound → an hour.',
        },
      },
      {
        id: 'l1-write-02-test02',
        type: 'fill-blank',
        sentence: 'There are five ___ in the class.',
        acceptedAnswers: ['women'],
        hint: '(woman)',
      },
      {
        id: 'l1-write-02-test03',
        type: 'arrange-words',
        translationVi: 'Có ba cái hộp trên bàn.',
        correctSentence: 'There are three boxes on the table.',
        extraWords: ['boxs', 'is'],
      },
      {
        id: 'l1-write-02-test04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'I see a dog. A dog is brown.',
          'I see the dog. A dog is brown.',
          'I see a dog. The dog is brown.',
          'I see an dog. The dog is brown.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Lần đầu: a dog; lần sau: the dog.',
          en: 'First mention: a dog; second mention: the dog.',
        },
      },
      {
        id: 'l1-write-02-test05',
        type: 'fill-blank',
        sentence: 'My aunt has two ___.',
        acceptedAnswers: ['babies'],
        hint: '(baby)',
      },
      {
        id: 'l1-write-02-test06',
        type: 'write-answer',
        prompt: 'Write 3–4 sentences about what is in your school bag. Use a / an and plural nouns.',
        tipsVi: 'Ví dụ: In my bag, there is a pencil case and an eraser. There are three books... Nhớ thêm -s/-es cho danh từ số nhiều.',
        minWords: 20,
        sampleAnswer:
          'In my school bag, there is a pencil case and an eraser. There are four books and two notebooks. There is also a bottle of water. The bag is heavy.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Nối ý với and / but / because
  // ==========================================================================
  {
    id: 'l1-write-03',
    skill: 'writing',
    title: { vi: 'Nối ý với and / but / because', en: 'Joining ideas with and / but / because' },
    description: {
      vi: 'Nối hai câu ngắn thành một câu dài hơn bằng and, but, because.',
      en: 'Join two short sentences into one longer sentence with and, but, because.',
    },
    teachingCards: [
      {
        title: { vi: 'And, but, because', en: 'And, but, because' },
        body: {
          vi: '**and** (và): thêm ý **giống chiều** → I like cats **and** dogs.\n**but** (nhưng): hai ý **trái ngược** → I like cats, **but** I don\'t like dogs.\n**because** (vì): đưa ra **lý do** → I like cats **because** they are cute.\nNối câu giúp bài viết **mượt hơn** — giám khảo IELTS chấm tiêu chí "Coherence and Cohesion" (mạch lạc và liên kết).',
          en: '**and**: adds a **similar** idea → I like cats **and** dogs.\n**but**: shows a **contrast** → I like cats, **but** I don\'t like dogs.\n**because**: gives a **reason** → I like cats **because** they are cute.\nJoining sentences makes writing **smoother** — IELTS examiners score "Coherence and Cohesion".',
        },
        examples: [
          { en: 'I get up early and I go jogging.', vi: 'Tôi dậy sớm và đi chạy bộ.' },
          { en: 'The test was hard, but I passed.', vi: 'Bài kiểm tra khó, nhưng tôi đã đỗ.' },
          { en: 'I stay at home because it is raining.', vi: 'Tôi ở nhà vì trời đang mưa.' },
        ],
      },
      {
        title: { vi: 'Dấu phẩy và lỗi hay gặp', en: 'Commas and common mistakes' },
        body: {
          vi: 'Thường đặt **dấu phẩy trước "but"** khi nối hai câu: It is cheap**, but** it is good.\n**Không** đặt dấu phẩy trước "because".\n**Lỗi hay gặp:** viết "Because it is raining." đứng một mình — đây là câu chưa hoàn chỉnh. Hãy nối với câu chính: I stay at home **because** it is raining.\nKhông dùng cả "because" và "so" trong một câu.',
          en: 'Usually put a **comma before "but"** when joining two sentences: It is cheap**, but** it is good.\n**No** comma before "because".\n**Common mistake:** writing "Because it is raining." on its own — it is not a complete sentence. Join it to a main clause: I stay at home **because** it is raining.\nDo not use both "because" and "so" in one sentence.',
        },
        examples: [
          { en: 'My phone is old, but it works well.', vi: 'Điện thoại của tôi cũ, nhưng nó chạy tốt.' },
          { en: 'She is tired because she works a lot.', vi: 'Cô ấy mệt vì cô ấy làm việc nhiều.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-write-03-ex01',
        type: 'fill-blank',
        sentence: 'I like apples ___ bananas.',
        acceptedAnswers: ['and'],
        hint: '(and / but / because)',
        explanation: {
          vi: 'Hai ý giống chiều (đều thích) → and.',
          en: 'Two similar ideas (both liked) → and.',
        },
      },
      {
        id: 'l1-write-03-ex02',
        type: 'fill-blank',
        sentence: 'I want to go out, ___ it is raining.',
        acceptedAnswers: ['but'],
        hint: '(and / but / because)',
        explanation: {
          vi: 'Hai ý trái ngược (muốn đi nhưng trời mưa) → but.',
          en: 'Contrast (want to go, but it is raining) → but.',
        },
      },
      {
        id: 'l1-write-03-ex03',
        type: 'fill-blank',
        sentence: 'I am hungry ___ I did not eat breakfast.',
        acceptedAnswers: ['because'],
        hint: '(and / but / because)',
        explanation: {
          vi: 'Vế sau là lý do của vế trước → because.',
          en: 'The second part is the reason → because.',
        },
      },
      {
        id: 'l1-write-03-ex04',
        type: 'arrange-words',
        translationVi: 'Tôi học tiếng Anh vì nó hữu ích.',
        correctSentence: 'I study English because it is useful.',
        extraWords: ['but'],
        explanation: {
          vi: '"because" đưa ra lý do tại sao học tiếng Anh.',
          en: '"because" gives the reason for studying English.',
        },
      },
      {
        id: 'l1-write-03-ex05',
        type: 'multiple-choice',
        question: 'Join the sentences: "My house is small." + "It is very comfortable."',
        options: [
          'My house is small because it is very comfortable.',
          'My house is small, but it is very comfortable.',
          'My house is small and but it is very comfortable.',
          'Because my house is small. It is very comfortable.',
        ],
        correctIndex: 1,
        explanation: {
          vi: '"nhỏ" và "thoải mái" là ý trái ngược → but.',
          en: '"small" and "comfortable" contrast → but.',
        },
      },
      {
        id: 'l1-write-03-ex06',
        type: 'arrange-words',
        translationVi: 'Anh trai tôi cao, nhưng tôi thấp.',
        correctSentence: 'My brother is tall, but I am short.',
        extraWords: ['and'],
        explanation: {
          vi: 'Dấu phẩy đứng trước "but" và dính liền với từ "tall,".',
          en: 'The comma goes before "but", attached to "tall,".',
        },
      },
      {
        id: 'l1-write-03-ex07',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'Because I am tired.',
          'I go to bed early, because I am tired.',
          'I go to bed early because I am tired.',
          'I go to bed early because so I am tired.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Không đặt dấu phẩy trước "because" và "Because..." không đứng một mình.',
          en: 'No comma before "because", and "Because..." cannot stand alone.',
        },
      },
      {
        id: 'l1-write-03-ex08',
        type: 'fill-blank',
        sentence: 'My sister plays the piano ___ she sings very well.',
        acceptedAnswers: ['and'],
        hint: '(and / but / because)',
        explanation: {
          vi: 'Thêm một điểm tốt nữa → and.',
          en: 'Adding another positive point → and.',
        },
      },
      {
        id: 'l1-write-03-ex09',
        type: 'arrange-words',
        translationVi: 'Tôi thích mùa hè vì tôi có thể đi bơi.',
        correctSentence: 'I like summer because I can go swimming.',
        extraWords: ['so', 'swim'],
        explanation: {
          vi: '"because" + lý do. "go swimming" = đi bơi.',
          en: '"because" + reason. "go swimming" is a fixed phrase.',
        },
      },
      {
        id: 'l1-write-03-ex10',
        type: 'write-answer',
        prompt:
          'Write about your favourite food in 3–4 sentences. Use "and", "but" and "because" at least once each.',
        tipsVi:
          'Gợi ý: My favourite food is ... because ... I eat it with ... and ... It is ..., but ... Nhớ dấu phẩy trước "but".',
        minWords: 30,
        sampleAnswer:
          'My favourite food is pho because it is hot and delicious. I usually eat it with my father on Sunday morning. Pho is cheap and easy to find, but the best pho is my grandmother\'s pho.',
        explanation: {
          vi: 'Kiểm tra bạn đã dùng đủ cả ba từ nối với đúng nghĩa.',
          en: 'Check that you used all three linking words with the correct meaning.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-03-test01',
        type: 'fill-blank',
        sentence: 'I cannot sleep ___ it is too hot.',
        acceptedAnswers: ['because'],
        hint: '(and / but / because)',
      },
      {
        id: 'l1-write-03-test02',
        type: 'multiple-choice',
        question: 'Choose the best word: "English is difficult, ___ I love it."',
        options: ['and', 'but', 'because', 'so because'],
        correctIndex: 1,
        explanation: {
          vi: 'Khó nhưng vẫn yêu thích → ý trái ngược → but.',
          en: 'Difficult but loved → contrast → but.',
        },
      },
      {
        id: 'l1-write-03-test03',
        type: 'arrange-words',
        translationVi: 'Tôi có một con chó và một con mèo.',
        correctSentence: 'I have a dog and a cat.',
        extraWords: ['but'],
      },
      {
        id: 'l1-write-03-test04',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: [
          'She is happy because she passed the test.',
          'She is happy, because she passed the test.',
          'Because she passed the test.',
          'She is happy but because she passed the test.',
        ],
        correctIndex: 0,
      },
      {
        id: 'l1-write-03-test05',
        type: 'arrange-words',
        translationVi: 'Trời lạnh, nhưng tôi không mặc áo khoác.',
        correctSentence: 'It is cold, but I do not wear a coat.',
        extraWords: ['because'],
      },
      {
        id: 'l1-write-03-test06',
        type: 'write-answer',
        prompt: 'Write 3–4 sentences about your best friend. Use "and", "but" and "because".',
        tipsVi: 'Gợi ý: My best friend is ... She/He is ... and ... I like her/him because ... She/He is ..., but ...',
        minWords: 30,
        sampleAnswer:
          'My best friend is Mai. She is kind and very funny. I like her because she always helps me with my homework. She is good at maths, but she is not good at English.',
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Viết một đoạn văn ngắn về bản thân (40–60 từ) — bước đầu đến IELTS Writing
  // ==========================================================================
  {
    id: 'l1-write-04',
    skill: 'writing',
    title: { vi: 'Viết đoạn văn ngắn về bản thân', en: 'Writing a short paragraph about yourself' },
    description: {
      vi: 'Viết một đoạn văn 40–60 từ giới thiệu bản thân — bước đầu tiên đến IELTS Writing.',
      en: 'Write a 40–60 word paragraph about yourself — your first step toward IELTS Writing.',
    },
    teachingCards: [
      {
        title: { vi: 'Cấu trúc một đoạn văn', en: 'The structure of a paragraph' },
        body: {
          vi: 'Một đoạn văn tốt có 3 phần:\n1. **Câu mở đầu (topic sentence):** nói chủ đề chính → "Let me tell you about myself."\n2. **Các câu thân đoạn:** 3–4 câu thông tin chi tiết (tên, tuổi, quê, gia đình, sở thích).\n3. **Câu kết:** tóm lại hoặc nói mong muốn → "I want to speak English well."\nĐoạn văn viết **liền một khối**, không xuống dòng sau mỗi câu.',
          en: 'A good paragraph has 3 parts:\n1. **Topic sentence:** states the main idea → "Let me tell you about myself."\n2. **Supporting sentences:** 3–4 sentences with details (name, age, hometown, family, hobbies).\n3. **Concluding sentence:** sums up or states a wish → "I want to speak English well."\nWrite the paragraph as **one block** — do not start a new line after every sentence.',
        },
        examples: [
          {
            en: 'Let me tell you about myself. My name is Huy and I am thirteen years old. I live in Vinh with my parents. I like playing football because it is exciting. In the future, I want to be a pilot.',
            vi: 'Để mình kể về bản thân. Mình tên là Huy và mình mười ba tuổi. Mình sống ở Vinh với bố mẹ. Mình thích chơi bóng đá vì nó thú vị. Trong tương lai, mình muốn trở thành phi công.',
          },
        ],
      },
      {
        title: { vi: 'Danh sách tự kiểm tra trước khi nộp', en: 'Checklist before you submit' },
        body: {
          vi: 'Trong IELTS, bài viết được chấm theo: **nội dung**, **mạch lạc**, **từ vựng**, **ngữ pháp**. Ở cấp độ này, hãy kiểm tra:\n- Mỗi câu viết hoa chữ đầu và có dấu chấm?\n- Mỗi câu có động từ? (I **am**..., I **like**...)\n- Động từ thêm **-s** với he/she?\n- Có dùng **and / but / because** để nối ý?\n- Đủ số từ yêu cầu (40–60 từ)?',
          en: 'In IELTS, writing is scored on: **task response**, **coherence**, **vocabulary**, **grammar**. At this level, check:\n- Does every sentence start with a capital and end with a full stop?\n- Does every sentence have a verb? (I **am**..., I **like**...)\n- Do verbs add **-s** with he/she?\n- Did you use **and / but / because** to link ideas?\n- Did you write enough words (40–60)?',
        },
      },
    ],
    exercises: [
      {
        id: 'l1-write-04-ex01',
        type: 'multiple-choice',
        question: 'Which is the best topic sentence for a paragraph about yourself?',
        options: [
          'I like pizza.',
          'Let me tell you about myself.',
          'My brother is tall.',
          'Goodbye and thank you.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Câu mở đầu nên giới thiệu chủ đề chính của cả đoạn.',
          en: 'A topic sentence introduces the main idea of the whole paragraph.',
        },
      },
      {
        id: 'l1-write-04-ex02',
        type: 'arrange-words',
        translationVi: 'Tên tôi là Hà và tôi mười bốn tuổi.',
        correctSentence: 'My name is Ha and I am fourteen years old.',
        extraWords: ['have'],
        explanation: {
          vi: 'Dùng "and" nối hai thông tin; nói tuổi dùng "am".',
          en: 'Use "and" to join two facts; use "am" for age.',
        },
      },
      {
        id: 'l1-write-04-ex03',
        type: 'fill-blank',
        sentence: 'I live ___ Hai Phong with my parents.',
        acceptedAnswers: ['in'],
        hint: '(in / on / at)',
        explanation: {
          vi: 'Dùng "in" trước tên thành phố.',
          en: 'Use "in" before the name of a city.',
        },
      },
      {
        id: 'l1-write-04-ex04',
        type: 'multiple-choice',
        question: 'Which is the best concluding sentence?',
        options: [
          'In the future, I want to study abroad.',
          'My name is Ha.',
          'I have a cat.',
          'and I like music',
        ],
        correctIndex: 0,
        explanation: {
          vi: 'Câu kết thường nói mong muốn/kế hoạch hoặc tóm tắt đoạn văn.',
          en: 'A concluding sentence often states a wish or plan, or sums up the paragraph.',
        },
      },
      {
        id: 'l1-write-04-ex05',
        type: 'arrange-words',
        translationVi: 'Tôi thích vẽ vì nó giúp tôi thư giãn.',
        correctSentence: 'I like drawing because it helps me relax.',
        extraWords: ['help', 'draw'],
        explanation: {
          vi: 'like + V-ing (drawing); "it" đi với "helps".',
          en: 'like + V-ing (drawing); "it" goes with "helps".',
        },
      },
      {
        id: 'l1-write-04-ex06',
        type: 'multiple-choice',
        question: 'Find the sentence with NO mistakes.',
        options: [
          'my father is a engineer.',
          'My father is an engineer.',
          'My father an engineer.',
          'My father is an engineer',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Viết hoa đầu câu, có động từ "is", dùng "an" trước "engineer" và có dấu chấm.',
          en: 'Capital letter, the verb "is", "an" before "engineer", and a full stop.',
        },
      },
      {
        id: 'l1-write-04-ex07',
        type: 'fill-blank',
        sentence: 'In the future, I want ___ be a doctor.',
        acceptedAnswers: ['to'],
        explanation: {
          vi: 'want + to + động từ: want to be.',
          en: 'want + to + verb: want to be.',
        },
      },
      {
        id: 'l1-write-04-ex08',
        type: 'multiple-choice',
        question: 'Which sentence does NOT belong in a paragraph about yourself?',
        options: [
          'I am a student at Kim Lien School.',
          'I enjoy reading books.',
          'The Eiffel Tower is in Paris.',
          'I live with my grandparents.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Mọi câu trong đoạn phải liên quan đến chủ đề (bản thân bạn).',
          en: 'Every sentence in the paragraph must be about the topic (you).',
        },
      },
      {
        id: 'l1-write-04-ex09',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi là y tá, nhưng bố tôi là nông dân.',
        correctSentence: 'My mother is a nurse, but my father is a farmer.',
        extraWords: ['because'],
        explanation: {
          vi: 'Dùng "but" để so sánh hai nghề khác nhau.',
          en: 'Use "but" to contrast two different jobs.',
        },
      },
      {
        id: 'l1-write-04-ex10',
        type: 'write-answer',
        prompt:
          'Write a paragraph about yourself (40–60 words). Include: your name and age, where you live, your family, a hobby with a reason, and a wish for the future.',
        tipsVi:
          'Theo cấu trúc: câu mở đầu → 3–4 câu chi tiết → câu kết. Dùng and / but / because. Kiểm tra chữ hoa, dấu chấm, động từ trong mỗi câu và đuôi -s.',
        minWords: 40,
        sampleAnswer:
          'Let me tell you about myself. My name is Thao and I am fifteen years old. I live in Hanoi with my parents and my little brother. I like reading books because they teach me many new things. My English is not very good, but I study hard. In the future, I want to be a teacher.',
        explanation: {
          vi: 'Một đoạn văn tốt có câu mở đầu, các câu chi tiết, câu kết và từ nối.',
          en: 'A good paragraph has a topic sentence, supporting details, a conclusion and linking words.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-write-04-test01',
        type: 'multiple-choice',
        question: 'What are the 3 parts of a paragraph?',
        options: [
          'Title, picture, ending',
          'Topic sentence, supporting sentences, concluding sentence',
          'Question, answer, question',
          'Name, age, address',
        ],
        correctIndex: 1,
      },
      {
        id: 'l1-write-04-test02',
        type: 'arrange-words',
        translationVi: 'Tôi sống ở Huế với ông bà.',
        correctSentence: 'I live in Hue with my grandparents.',
        extraWords: ['on'],
      },
      {
        id: 'l1-write-04-test03',
        type: 'multiple-choice',
        question: 'Find the sentence with NO mistakes.',
        options: [
          'She like singing.',
          'She likes sing.',
          'She likes singing.',
          'she likes singing.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'She + likes + V-ing, và viết hoa đầu câu.',
          en: 'She + likes + V-ing, with a capital letter at the start.',
        },
      },
      {
        id: 'l1-write-04-test04',
        type: 'fill-blank',
        sentence: 'I love playing the guitar ___ it makes me happy.',
        acceptedAnswers: ['because'],
        hint: '(and / but / because)',
      },
      {
        id: 'l1-write-04-test05',
        type: 'arrange-words',
        translationVi: 'Trong tương lai, tôi muốn trở thành kỹ sư.',
        correctSentence: 'In the future, I want to be an engineer.',
        extraWords: ['a'],
      },
      {
        id: 'l1-write-04-test06',
        type: 'write-answer',
        prompt:
          'Write a short paragraph (40–60 words) about a member of your family. Say who they are, what they do, what they like, and why you love them.',
        tipsVi:
          'Mở đầu: I want to write about my ... Dùng he/she + động từ thêm -s (works, likes). Dùng because để nêu lý do. Kết thúc bằng một câu tình cảm.',
        minWords: 40,
        sampleAnswer:
          'I want to write about my mother. Her name is Hoa and she is forty years old. She is a teacher at a primary school. She likes cooking and watering her plants. She is busy, but she always has time for me. I love her because she is kind and patient.',
      },
    ],
  },
]
