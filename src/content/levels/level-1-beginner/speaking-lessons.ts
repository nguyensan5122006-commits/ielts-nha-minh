/**
 * speaking-lessons.ts — LEVEL 1 (Band 0 – 2.0) — KỸ NĂNG NÓI (SPEAKING)
 * ----------------------------------------------------------------------------
 * File này chứa 4 bài học Nói cho người mới bắt đầu.
 * Mỗi bài gồm:
 *   - teachingCards : thẻ lý thuyết (ngữ pháp + mẹo phát âm cho người Việt)
 *   - exercises     : 10 bài luyện, chủ yếu là "speak-sentence" (đọc to câu mẫu),
 *                     kèm trắc nghiệm, sắp xếp từ, điền từ, và đúng 1 bài
 *                     "speak-answer" (nói tự do, AI chấm điểm).
 *   - miniTest      : 6 câu kiểm tra cuối bài (có 1 câu speak-answer).
 *
 * Quy ước id: "l1-speak-<số bài>-ex<số>" và "l1-speak-<số bài>-test<số>".
 * Muốn thêm bài mới: copy 1 khối { ... } bài học, đổi id và nội dung.
 * ----------------------------------------------------------------------------
 */
import type { Lesson } from '../../content-types'

export const level1SpeakingLessons: Lesson[] = [
  // ==========================================================================
  // BÀI 1: Giới thiệu bản thân (tên, tuổi, quê quán) + động từ "to be"
  // ==========================================================================
  {
    id: 'l1-speak-01',
    skill: 'speaking',
    title: { vi: 'Giới thiệu bản thân', en: 'Introducing yourself' },
    description: {
      vi: 'Nói tên, tuổi, quê quán bằng động từ "to be" (am / is / are).',
      en: 'Say your name, age and hometown using the verb "to be" (am / is / are).',
    },
    teachingCards: [
      {
        title: { vi: 'Động từ "to be": am / is / are', en: 'The verb "to be": am / is / are' },
        body: {
          vi: '**I** đi với **am**: I am (I\'m).\n**He / She / It** đi với **is**: She is (She\'s).\n**You / We / They** đi với **are**: You are (You\'re).\nDùng "to be" để nói tên, tuổi, quê quán, nghề nghiệp.\n**Lưu ý:** nói tuổi dùng "I **am** 15 years old", KHÔNG nói "I have 15 years old".',
          en: '**I** goes with **am**: I am (I\'m).\n**He / She / It** goes with **is**: She is (She\'s).\n**You / We / They** go with **are**: You are (You\'re).\nUse "to be" to say your name, age, hometown and job.\n**Note:** for age, say "I **am** 15 years old", NOT "I have 15 years old".',
        },
        examples: [
          { en: "I'm Lan.", vi: 'Mình là Lan.' },
          { en: 'I am fifteen years old.', vi: 'Mình 15 tuổi.' },
          { en: "He's from Hanoi.", vi: 'Anh ấy đến từ Hà Nội.' },
        ],
      },
      {
        title: { vi: 'Câu mẫu giới thiệu bản thân', en: 'Useful sentences to introduce yourself' },
        body: {
          vi: 'Tên: **My name is ...** / **I\'m ...**\nTuổi: **I\'m ... years old.**\nQuê: **I\'m from ...** (đến từ) / **I live in ...** (đang sống ở)\nKết thúc lịch sự: **Nice to meet you.** (Rất vui được gặp bạn.)',
          en: 'Name: **My name is ...** / **I\'m ...**\nAge: **I\'m ... years old.**\nHometown: **I\'m from ...** / **I live in ...**\nPolite ending: **Nice to meet you.**',
        },
        examples: [
          { en: 'My name is Minh.', vi: 'Tên tôi là Minh.' },
          { en: "I'm from Da Nang.", vi: 'Tôi đến từ Đà Nẵng.' },
          { en: 'Nice to meet you.', vi: 'Rất vui được gặp bạn.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: âm cuối /m/ và /z/', en: 'Pronunciation tip: final sounds /m/ and /z/' },
        body: {
          vi: 'Người Việt hay **bỏ âm cuối**. Hãy ngậm môi khi nói **I\'m** /aɪm/ và **name** /neɪm/.\nChữ **is** đọc là /ɪz/ — rung cổ họng như tiếng ong "zzz", không đọc thành "ít".\nNói chậm, rõ từng âm cuối trước, sau đó mới nói nhanh.',
          en: 'Vietnamese speakers often **drop final sounds**. Close your lips at the end of **I\'m** /aɪm/ and **name** /neɪm/.\n**is** is pronounced /ɪz/ — a buzzing "zzz" sound, not "it".\nSpeak slowly and clearly first, then faster.',
        },
        examples: [
          { en: 'My name is Hoa.', vi: 'Tên tôi là Hoa.' },
          { en: 'She is my friend.', vi: 'Cô ấy là bạn tôi.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-01-ex01',
        type: 'speak-sentence',
        sentence: 'My name is Lan.',
        translationVi: 'Tên tôi là Lan.',
        explanation: {
          vi: 'Ngậm môi ở cuối từ "name" /neɪm/ và đọc "is" là /ɪz/.',
          en: 'Close your lips at the end of "name" /neɪm/ and say "is" as /ɪz/.',
        },
      },
      {
        id: 'l1-speak-01-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "I ___ a student."',
        options: ['is', 'am', 'are', 'be'],
        correctIndex: 1,
        explanation: {
          vi: '"I" luôn đi với "am": I am a student.',
          en: '"I" always goes with "am": I am a student.',
        },
      },
      {
        id: 'l1-speak-01-ex03',
        type: 'speak-sentence',
        sentence: "I'm fifteen years old.",
        translationVi: 'Tôi mười lăm tuổi.',
        explanation: {
          vi: '"fifteen" nhấn âm thứ hai: fif-TEEN. "years" có âm cuối /z/.',
          en: '"fifteen" is stressed on the second syllable: fif-TEEN. "years" ends with /z/.',
        },
      },
      {
        id: 'l1-speak-01-ex04',
        type: 'fill-blank',
        sentence: 'She ___ from Hue.',
        acceptedAnswers: ['is'],
        hint: '(be)',
        explanation: {
          vi: '"She" đi với "is".',
          en: '"She" goes with "is".',
        },
      },
      {
        id: 'l1-speak-01-ex05',
        type: 'speak-sentence',
        sentence: "I'm from Ho Chi Minh City.",
        translationVi: 'Tôi đến từ Thành phố Hồ Chí Minh.',
        explanation: {
          vi: 'Nối "I\'m from" liền nhau, nhớ ngậm môi ở âm /m/.',
          en: 'Link "I\'m from" smoothly and close your lips for /m/.',
        },
      },
      {
        id: 'l1-speak-01-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi mười hai tuổi.',
        correctSentence: 'I am twelve years old.',
        extraWords: ['have', 'is'],
        explanation: {
          vi: 'Nói tuổi dùng "am ... years old", không dùng "have".',
          en: 'Use "am ... years old" for age, not "have".',
        },
      },
      {
        id: 'l1-speak-01-ex07',
        type: 'speak-sentence',
        sentence: 'I live in Hanoi with my family.',
        translationVi: 'Tôi sống ở Hà Nội cùng gia đình.',
        explanation: {
          vi: '"with" có âm cuối /ð/: đặt đầu lưỡi giữa hai hàm răng.',
          en: '"with" ends with /ð/: put your tongue between your teeth.',
        },
      },
      {
        id: 'l1-speak-01-ex08',
        type: 'multiple-choice',
        question: 'Which sentence is correct?',
        options: ['I have 20 years old.', 'I am 20 years old.', 'I is 20 years old.', 'I 20 years old.'],
        correctIndex: 1,
        explanation: {
          vi: 'Tiếng Anh nói tuổi bằng "to be": I am 20 years old.',
          en: 'English uses "to be" for age: I am 20 years old.',
        },
      },
      {
        id: 'l1-speak-01-ex09',
        type: 'speak-sentence',
        sentence: 'Nice to meet you.',
        translationVi: 'Rất vui được gặp bạn.',
        explanation: {
          vi: 'Đọc nối "meet you" nghe như "mee-chu".',
          en: '"meet you" is often linked and sounds like "mee-chu".',
        },
      },
      {
        id: 'l1-speak-01-ex10',
        type: 'speak-answer',
        question: 'Please introduce yourself. What is your name, how old are you, and where are you from?',
        tipsVi:
          'Nói 3–4 câu: tên (My name is...), tuổi (I\'m ... years old), quê (I\'m from...), nơi sống (I live in...). Kết thúc bằng "Nice to meet you." Nhớ phát âm rõ âm cuối.',
        sampleAnswer:
          "Hello! My name is Lan. I'm fourteen years old. I'm from Nam Dinh, but now I live in Hanoi with my family. Nice to meet you.",
        recordSeconds: 30,
        explanation: {
          vi: 'Câu trả lời tốt có đủ tên, tuổi, quê và dùng đúng am / is / are.',
          en: 'A good answer includes name, age and hometown, and uses am / is / are correctly.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-01-test01',
        type: 'speak-sentence',
        sentence: "Hello, I'm Nam.",
        translationVi: 'Xin chào, mình là Nam.',
      },
      {
        id: 'l1-speak-01-test02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "They ___ from Can Tho."',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 2,
        explanation: {
          vi: '"They" đi với "are".',
          en: '"They" goes with "are".',
        },
      },
      {
        id: 'l1-speak-01-test03',
        type: 'arrange-words',
        translationVi: 'Tên tôi là Minh.',
        correctSentence: 'My name is Minh.',
        extraWords: ['am'],
      },
      {
        id: 'l1-speak-01-test04',
        type: 'speak-sentence',
        sentence: 'He is sixteen years old.',
        translationVi: 'Cậu ấy mười sáu tuổi.',
        explanation: {
          vi: '"sixteen" nhấn âm cuối: six-TEEN.',
          en: '"sixteen" is stressed at the end: six-TEEN.',
        },
      },
      {
        id: 'l1-speak-01-test05',
        type: 'multiple-choice',
        question: 'Someone says "Nice to meet you." What is a good reply?',
        options: ['Nice to meet you too.', 'I am fine.', 'Goodbye, see you.', 'Yes, I am.'],
        correctIndex: 0,
        explanation: {
          vi: 'Đáp lại lịch sự: "Nice to meet you too." (Mình cũng rất vui được gặp bạn.)',
          en: 'The polite reply is "Nice to meet you too."',
        },
      },
      {
        id: 'l1-speak-01-test06',
        type: 'speak-answer',
        question: 'Where are you from? Tell me a little about your hometown.',
        tipsVi:
          'Bắt đầu bằng "I\'m from ...". Thêm 1–2 câu đơn giản: It is big / small. It is beautiful. I love it.',
        sampleAnswer: "I'm from Hai Phong. It is a big city in the north of Vietnam. It is near the sea. I love my hometown.",
        recordSeconds: 30,
      },
    ],
  },

  // ==========================================================================
  // BÀI 2: Nói về gia đình và công việc / việc học
  // ==========================================================================
  {
    id: 'l1-speak-02',
    skill: 'speaking',
    title: { vi: 'Gia đình và công việc', en: 'Family and job / study' },
    description: {
      vi: 'Nói về các thành viên trong gia đình và bạn đang đi học hay đi làm.',
      en: 'Talk about your family members and whether you study or work.',
    },
    teachingCards: [
      {
        title: { vi: 'Nói về gia đình', en: 'Talking about your family' },
        body: {
          vi: '**There are + số + people in my family.** (Nhà tôi có ... người.)\n**I have + a / one / two + danh từ.** (Tôi có ...)\nTừ vựng: **father** (bố), **mother** (mẹ), **brother** (anh/em trai), **sister** (chị/em gái), **parents** (bố mẹ).\nSố nhiều thêm **-s**: one brother → two brother**s**.',
          en: '**There are + number + people in my family.**\n**I have + a / one / two + noun.**\nWords: **father**, **mother**, **brother**, **sister**, **parents**.\nPlural nouns add **-s**: one brother → two brother**s**.',
        },
        examples: [
          { en: 'There are four people in my family.', vi: 'Nhà tôi có bốn người.' },
          { en: 'I have one brother and two sisters.', vi: 'Tôi có một anh trai và hai chị gái.' },
        ],
      },
      {
        title: { vi: 'Đi học hay đi làm?', en: 'Do you work or study?' },
        body: {
          vi: 'Đi học: **I\'m a student.** / **I\'m in grade 9.** (Tôi học lớp 9.)\nĐi làm: **I\'m a / an + nghề.** → I\'m **a** teacher. I\'m **an** engineer.\nDùng **an** trước nghề bắt đầu bằng âm nguyên âm (a, e, i, o, u).\nNói về người khác: **My father is a doctor.**',
          en: 'Study: **I\'m a student.** / **I\'m in grade 9.**\nWork: **I\'m a / an + job.** → I\'m **a** teacher. I\'m **an** engineer.\nUse **an** before a job that starts with a vowel sound.\nAbout others: **My father is a doctor.**',
        },
        examples: [
          { en: "I'm a student at Le Loi School.", vi: 'Tôi là học sinh trường Lê Lợi.' },
          { en: 'My mother is a nurse.', vi: 'Mẹ tôi là y tá.' },
          { en: "I'm an office worker.", vi: 'Tôi là nhân viên văn phòng.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: /θ/ và /ð/', en: 'Pronunciation tip: /θ/ and /ð/' },
        body: {
          vi: 'Các từ **mother, father, brother** có âm **/ð/**: đặt đầu lưỡi giữa hai hàm răng rồi thổi hơi có rung cổ — KHÔNG đọc thành "d" hay "z".\nTừ **three, think** có âm **/θ/**: lưỡi giữa răng, thổi hơi không rung — KHÔNG đọc thành "th" kiểu tiếng Việt hay "t".',
          en: '**mother, father, brother** have the **/ð/** sound: tongue between your teeth, with voice — not "d" or "z".\n**three, think** have **/θ/**: tongue between your teeth, no voice — not "t".',
        },
        examples: [
          { en: 'My mother and my father.', vi: 'Mẹ tôi và bố tôi.' },
          { en: 'I have three brothers.', vi: 'Tôi có ba anh em trai.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-02-ex01',
        type: 'speak-sentence',
        sentence: 'There are four people in my family.',
        translationVi: 'Nhà tôi có bốn người.',
        explanation: {
          vi: '"There" bắt đầu bằng /ð/: đưa lưỡi ra giữa răng.',
          en: '"There" starts with /ð/: put your tongue between your teeth.',
        },
      },
      {
        id: 'l1-speak-02-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I have two sister.', 'I have two sisters.', 'I has two sisters.', 'I am two sisters.'],
        correctIndex: 1,
        explanation: {
          vi: 'Sau "two" danh từ phải ở số nhiều (sisters), và "I" đi với "have".',
          en: 'After "two" the noun is plural (sisters), and "I" goes with "have".',
        },
      },
      {
        id: 'l1-speak-02-ex03',
        type: 'speak-sentence',
        sentence: 'My father is a doctor.',
        translationVi: 'Bố tôi là bác sĩ.',
        explanation: {
          vi: '"father" có âm /ð/ ở giữa, đừng đọc thành "pha-dờ".',
          en: '"father" has /ð/ in the middle — do not say it with a "d".',
        },
      },
      {
        id: 'l1-speak-02-ex04',
        type: 'fill-blank',
        sentence: "I'm ___ engineer.",
        acceptedAnswers: ['an'],
        hint: '(a / an)',
        explanation: {
          vi: '"engineer" bắt đầu bằng nguyên âm nên dùng "an".',
          en: '"engineer" starts with a vowel sound, so we use "an".',
        },
      },
      {
        id: 'l1-speak-02-ex05',
        type: 'speak-sentence',
        sentence: 'I have one brother and one sister.',
        translationVi: 'Tôi có một anh/em trai và một chị/em gái.',
        explanation: {
          vi: 'Chú ý âm /ð/ trong "brother" và âm cuối /v/ trong "have".',
          en: 'Notice /ð/ in "brother" and the final /v/ in "have".',
        },
      },
      {
        id: 'l1-speak-02-ex06',
        type: 'arrange-words',
        translationVi: 'Mẹ tôi là giáo viên.',
        correctSentence: 'My mother is a teacher.',
        extraWords: ['are', 'an'],
        explanation: {
          vi: '"My mother" là một người nên dùng "is"; "teacher" bắt đầu bằng phụ âm nên dùng "a".',
          en: '"My mother" is one person, so use "is"; "teacher" starts with a consonant, so use "a".',
        },
      },
      {
        id: 'l1-speak-02-ex07',
        type: 'speak-sentence',
        sentence: "I'm a student. I'm in grade nine.",
        translationVi: 'Tôi là học sinh. Tôi học lớp chín.',
        explanation: {
          vi: '"student" có âm cuối /t/ — đừng nuốt mất.',
          en: '"student" ends with /t/ — do not drop it.',
        },
      },
      {
        id: 'l1-speak-02-ex08',
        type: 'multiple-choice',
        question: 'The examiner asks: "Do you work or are you a student?" Which answer is best?',
        options: ["Yes, I do.", "I'm a student. I study at Nguyen Du High School.", 'Student.', 'I work or student.'],
        correctIndex: 1,
        explanation: {
          vi: 'Trả lời bằng câu đầy đủ và thêm 1 chi tiết sẽ tốt hơn trả lời 1 từ.',
          en: 'A full sentence with one extra detail is better than a one-word answer.',
        },
      },
      {
        id: 'l1-speak-02-ex09',
        type: 'speak-sentence',
        sentence: 'My parents work in a big hospital.',
        translationVi: 'Bố mẹ tôi làm việc ở một bệnh viện lớn.',
        explanation: {
          vi: '"parents" kết thúc bằng /ts/ — đọc rõ cả /t/ và /s/.',
          en: '"parents" ends with /ts/ — say both /t/ and /s/.',
        },
      },
      {
        id: 'l1-speak-02-ex10',
        type: 'speak-answer',
        question: 'Tell me about your family. How many people are there, and what do they do?',
        tipsVi:
          'Nói 3–5 câu: There are ... people in my family. My father is a ... My mother is a ... I have ... I\'m a student / I\'m a ... Phát âm rõ /ð/ trong mother, father, brother.',
        sampleAnswer:
          "There are four people in my family: my father, my mother, my younger brother and me. My father is a driver and my mother is a teacher. My brother is ten years old. I'm a student in grade eight.",
        recordSeconds: 30,
        explanation: {
          vi: 'Câu trả lời tốt nêu số người, nghề nghiệp từng người và dùng đúng a / an.',
          en: 'A good answer gives the number of people, their jobs, and uses a / an correctly.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-02-test01',
        type: 'speak-sentence',
        sentence: 'There are five people in my family.',
        translationVi: 'Nhà tôi có năm người.',
      },
      {
        id: 'l1-speak-02-test02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "My sister is ___ artist."',
        options: ['a', 'an', 'the', 'two'],
        correctIndex: 1,
        explanation: {
          vi: '"artist" bắt đầu bằng nguyên âm "a" nên dùng "an".',
          en: '"artist" starts with a vowel sound, so use "an".',
        },
      },
      {
        id: 'l1-speak-02-test03',
        type: 'arrange-words',
        translationVi: 'Tôi có hai anh trai.',
        correctSentence: 'I have two brothers.',
        extraWords: ['brother', 'has'],
      },
      {
        id: 'l1-speak-02-test04',
        type: 'speak-sentence',
        sentence: 'My mother is a nurse.',
        translationVi: 'Mẹ tôi là y tá.',
      },
      {
        id: 'l1-speak-02-test05',
        type: 'arrange-words',
        translationVi: 'Tôi là học sinh.',
        correctSentence: "I'm a student.",
        extraWords: ['an'],
      },
      {
        id: 'l1-speak-02-test06',
        type: 'speak-answer',
        question: 'Do you work or are you a student?',
        tipsVi:
          'Trả lời trực tiếp (I\'m a student / I work as a ...), sau đó thêm 1–2 chi tiết: học ở đâu, lớp mấy, hoặc làm ở đâu.',
        sampleAnswer:
          "I'm a student. I'm in grade ten at Tran Phu High School. My favourite subject is English.",
        recordSeconds: 30,
      },
    ],
  },

  // ==========================================================================
  // BÀI 3: Thích và không thích — I like / I don't like + V-ing
  // ==========================================================================
  {
    id: 'l1-speak-03',
    skill: 'speaking',
    title: { vi: 'Sở thích: thích và không thích', en: 'Likes and dislikes' },
    description: {
      vi: 'Nói điều bạn thích và không thích với "I like / I don\'t like + V-ing".',
      en: 'Say what you like and dislike with "I like / I don\'t like + V-ing".',
    },
    teachingCards: [
      {
        title: { vi: 'I like / I don\'t like + V-ing', en: 'I like / I don\'t like + V-ing' },
        body: {
          vi: 'Thích một hoạt động: **I like + động từ thêm -ing**.\n→ I like **reading**. I like **playing** football.\nKhông thích: **I don\'t like + V-ing**.\n→ I don\'t like **cooking**.\nThích một vật: **I like + danh từ** → I like **music**.\nNgôi thứ ba (he/she): **She likes ... / She doesn\'t like ...**',
          en: 'Like an activity: **I like + verb-ing**.\n→ I like **reading**. I like **playing** football.\nDislike: **I don\'t like + V-ing**.\n→ I don\'t like **cooking**.\nLike a thing: **I like + noun** → I like **music**.\nThird person (he/she): **She likes ... / She doesn\'t like ...**',
        },
        examples: [
          { en: 'I like listening to music.', vi: 'Tôi thích nghe nhạc.' },
          { en: "I don't like getting up early.", vi: 'Tôi không thích dậy sớm.' },
          { en: 'My brother likes playing games.', vi: 'Em trai tôi thích chơi game.' },
        ],
      },
      {
        title: { vi: 'Cách thêm -ing', en: 'How to add -ing' },
        body: {
          vi: 'Thường: thêm **-ing** → read → reading, play → playing.\nTận cùng là **-e**: bỏ e → dance → danc**ing**, write → writ**ing**.\nMột nguyên âm + một phụ âm cuối (từ ngắn): gấp đôi phụ âm → swim → swi**mm**ing, run → ru**nn**ing.\nMuốn nói mạnh hơn: **I really like ...** / **I love ...** / **I hate ...**',
          en: 'Usually add **-ing** → read → reading, play → playing.\nEnds in **-e**: drop the e → dance → danc**ing**, write → writ**ing**.\nShort verb with one vowel + one consonant: double it → swim → swi**mm**ing, run → ru**nn**ing.\nStronger feelings: **I really like ...** / **I love ...** / **I hate ...**',
        },
        examples: [
          { en: 'I love swimming in summer.', vi: 'Tôi rất thích bơi vào mùa hè.' },
          { en: 'I hate doing homework at night.', vi: 'Tôi ghét làm bài tập vào buổi tối.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -ing và -s', en: 'Pronunciation tip: -ing and -s endings' },
        body: {
          vi: 'Đuôi **-ing** đọc là /ɪŋ/ — kết thúc bằng âm mũi "ng", không đọc thành "in".\nĐuôi **-s** trong **likes** đọc là /s/ (likes /laɪks/). Người Việt hay quên âm này — hãy đọc thật rõ!\n**Trọng âm:** nhấn vào âm đầu của từ: **READ**-ing, **SWIM**-ming, **MU**-sic.',
          en: 'The **-ing** ending is /ɪŋ/ — finish with a nasal "ng" sound, not "in".\nThe **-s** in **likes** is /s/ (likes /laɪks/). Many learners forget it — say it clearly!\n**Word stress:** stress the first syllable: **READ**-ing, **SWIM**-ming, **MU**-sic.',
        },
        examples: [
          { en: 'She likes singing.', vi: 'Cô ấy thích hát.' },
          { en: 'He likes reading comics.', vi: 'Cậu ấy thích đọc truyện tranh.' },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-03-ex01',
        type: 'speak-sentence',
        sentence: 'I like reading books.',
        translationVi: 'Tôi thích đọc sách.',
        explanation: {
          vi: 'Đọc rõ /ɪŋ/ trong "reading" và /s/ trong "books".',
          en: 'Say /ɪŋ/ in "reading" and /s/ in "books" clearly.',
        },
      },
      {
        id: 'l1-speak-03-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['I like play football.', 'I like playing football.', 'I liking play football.', 'I am like playing football.'],
        correctIndex: 1,
        explanation: {
          vi: 'Sau "like" dùng V-ing: like playing.',
          en: 'After "like" we use V-ing: like playing.',
        },
      },
      {
        id: 'l1-speak-03-ex03',
        type: 'speak-sentence',
        sentence: "I don't like cooking.",
        translationVi: 'Tôi không thích nấu ăn.',
        explanation: {
          vi: 'Đọc rõ âm /t/ trong "don\'t" và âm /k/ trong "like".',
          en: 'Pronounce the /t/ in "don\'t" and the /k/ in "like".',
        },
      },
      {
        id: 'l1-speak-03-ex04',
        type: 'fill-blank',
        sentence: 'I love ___ in the sea.',
        acceptedAnswers: ['swimming'],
        hint: '(swim)',
        explanation: {
          vi: 'swim → swimming (gấp đôi chữ m).',
          en: 'swim → swimming (double the m).',
        },
      },
      {
        id: 'l1-speak-03-ex05',
        type: 'speak-sentence',
        sentence: 'My sister likes dancing.',
        translationVi: 'Chị/em gái tôi thích nhảy.',
        explanation: {
          vi: '"likes" đọc /laɪks/ — có âm /s/ ở cuối vì chủ ngữ là "my sister".',
          en: '"likes" is /laɪks/ — it has /s/ because the subject is "my sister".',
        },
      },
      {
        id: 'l1-speak-03-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi thích nghe nhạc.',
        correctSentence: 'I like listening to music.',
        extraWords: ['listen', 'likes'],
        explanation: {
          vi: 'I like + V-ing: listening. Lưu ý "listen to" luôn đi với "to".',
          en: 'I like + V-ing: listening. Remember "listen to" always takes "to".',
        },
      },
      {
        id: 'l1-speak-03-ex07',
        type: 'speak-sentence',
        sentence: 'I really like watching movies at the weekend.',
        translationVi: 'Tôi rất thích xem phim vào cuối tuần.',
        explanation: {
          vi: '"the" có âm /ð/. "movies" kết thúc bằng /z/.',
          en: '"the" has /ð/. "movies" ends with /z/.',
        },
      },
      {
        id: 'l1-speak-03-ex08',
        type: 'multiple-choice',
        question: 'Choose the correct sentence about your friend Nam.',
        options: ["Nam don't like running.", "Nam doesn't likes running.", "Nam doesn't like running.", 'Nam not like running.'],
        correctIndex: 2,
        explanation: {
          vi: 'He/She dùng "doesn\'t like" (không thêm -s vào "like").',
          en: 'He/She uses "doesn\'t like" (no -s on "like").',
        },
      },
      {
        id: 'l1-speak-03-ex09',
        type: 'speak-sentence',
        sentence: "I hate getting up early, but I love sleeping late.",
        translationVi: 'Tôi ghét dậy sớm, nhưng tôi rất thích ngủ muộn.',
        explanation: {
          vi: 'Nhấn mạnh "hate" và "love" để thể hiện cảm xúc.',
          en: 'Stress "hate" and "love" to show your feelings.',
        },
      },
      {
        id: 'l1-speak-03-ex10',
        type: 'speak-answer',
        question: 'What do you like doing in your free time? Is there anything you don\'t like doing?',
        tipsVi:
          'Nêu 2 việc bạn thích (I like / I love + V-ing) và 1 việc bạn không thích (I don\'t like + V-ing). Thêm lý do ngắn nếu được: because it is fun / boring.',
        sampleAnswer:
          "In my free time, I like reading comics and playing badminton with my friends. I also love listening to music. But I don't like cleaning my room because it is boring.",
        recordSeconds: 30,
        explanation: {
          vi: 'Câu trả lời tốt dùng đúng V-ing sau like / love / don\'t like.',
          en: 'A good answer uses V-ing correctly after like / love / don\'t like.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-03-test01',
        type: 'speak-sentence',
        sentence: 'I like playing badminton.',
        translationVi: 'Tôi thích chơi cầu lông.',
      },
      {
        id: 'l1-speak-03-test02',
        type: 'multiple-choice',
        question: 'Choose the correct -ing form of "write".',
        options: ['writeing', 'writting', 'writing', 'wrighting'],
        correctIndex: 2,
        explanation: {
          vi: 'Động từ tận cùng bằng -e thì bỏ e rồi thêm -ing: writing.',
          en: 'Verbs ending in -e drop the e before -ing: writing.',
        },
      },
      {
        id: 'l1-speak-03-test03',
        type: 'arrange-words',
        translationVi: 'Tôi không thích nấu ăn.',
        correctSentence: "I don't like cooking.",
        extraWords: ['cook', "doesn't"],
      },
      {
        id: 'l1-speak-03-test04',
        type: 'speak-sentence',
        sentence: 'He likes watching football on TV.',
        translationVi: 'Anh ấy thích xem bóng đá trên TV.',
      },
      {
        id: 'l1-speak-03-test05',
        type: 'multiple-choice',
        question: 'Choose the correct word: "She ___ singing."',
        options: ['like', 'likes', 'liking', 'is like'],
        correctIndex: 1,
        explanation: {
          vi: 'She là ngôi thứ ba số ít nên động từ thêm -s: likes.',
          en: '"She" is third person singular, so the verb adds -s: likes.',
        },
      },
      {
        id: 'l1-speak-03-test06',
        type: 'speak-answer',
        question: 'Do you like music? What kind of music do you like?',
        tipsVi:
          'Trả lời Yes/No + câu đầy đủ: Yes, I do. I like ... Nêu loại nhạc (pop, K-pop, rock...) và khi nào bạn nghe.',
        sampleAnswer:
          "Yes, I do. I really like pop music and K-pop. I usually listen to music on my phone when I go to school.",
        recordSeconds: 30,
      },
    ],
  },

  // ==========================================================================
  // BÀI 4: Thói quen hằng ngày + thì hiện tại đơn + làm quen IELTS Speaking Part 1
  // ==========================================================================
  {
    id: 'l1-speak-04',
    skill: 'speaking',
    title: { vi: 'Thói quen hằng ngày', en: 'Your daily routine' },
    description: {
      vi: 'Kể về một ngày của bạn bằng thì hiện tại đơn và làm quen câu hỏi IELTS Speaking Part 1.',
      en: 'Describe your day with the present simple and try your first IELTS Speaking Part 1 questions.',
    },
    teachingCards: [
      {
        title: { vi: 'Thì hiện tại đơn (Present simple)', en: 'The present simple' },
        body: {
          vi: 'Dùng để nói **thói quen**, việc lặp đi lặp lại hằng ngày.\n**I / You / We / They + động từ nguyên mẫu**: I get up at 6.\n**He / She / It + động từ thêm -s/-es**: She get**s** up at 6. He watch**es** TV.\nTừ chỉ tần suất đứng **trước động từ thường**: always (luôn luôn), usually (thường), sometimes (thỉnh thoảng), never (không bao giờ).\nGiờ giấc dùng **at**: at 7 o\'clock, at night.',
          en: 'Use it for **habits** and things you do every day.\n**I / You / We / They + base verb**: I get up at 6.\n**He / She / It + verb + -s/-es**: She get**s** up at 6. He watch**es** TV.\nFrequency words go **before the main verb**: always, usually, sometimes, never.\nUse **at** for times: at 7 o\'clock, at night.',
        },
        examples: [
          { en: 'I usually get up at six o\'clock.', vi: 'Tôi thường dậy lúc sáu giờ.' },
          { en: 'My mother goes to work by motorbike.', vi: 'Mẹ tôi đi làm bằng xe máy.' },
          { en: 'We never eat breakfast late.', vi: 'Chúng tôi không bao giờ ăn sáng muộn.' },
        ],
      },
      {
        title: { vi: 'Mẹo phát âm: đuôi -s / -es', en: 'Pronunciation tip: -s / -es endings' },
        body: {
          vi: 'Đuôi -s có **3 cách đọc**:\n**/s/** sau âm /p, t, k, f/: gets, works, likes.\n**/ɪz/** sau âm /s, z, ʃ, tʃ, dʒ/: watches, washes, uses.\n**/z/** trong các trường hợp còn lại: goes, plays, does /dʌz/.\nĐừng bỏ đuôi -s — giám khảo IELTS rất chú ý lỗi này!',
          en: 'The -s ending has **3 sounds**:\n**/s/** after /p, t, k, f/: gets, works, likes.\n**/ɪz/** after /s, z, ʃ, tʃ, dʒ/: watches, washes, uses.\n**/z/** in other cases: goes, plays, does /dʌz/.\nDo not drop the -s — IELTS examiners notice this mistake!',
        },
        examples: [
          { en: 'She watches TV after dinner.', vi: 'Cô ấy xem TV sau bữa tối.' },
          { en: 'He plays football every afternoon.', vi: 'Cậu ấy chơi bóng đá mỗi buổi chiều.' },
        ],
      },
      {
        title: { vi: 'Làm quen IELTS Speaking Part 1', en: 'Meet IELTS Speaking Part 1' },
        body: {
          vi: 'Part 1 kéo dài 4–5 phút. Giám khảo hỏi các câu ngắn về bạn: học/làm, nhà, sở thích, thói quen.\n**Công thức trả lời:** Trả lời thẳng + 1 lý do / chi tiết + (1 ví dụ).\nĐừng chỉ nói "Yes." hay "No." — hãy nói 2–3 câu.\nVí dụ: "What time do you get up?" → "I usually get up at 6 a.m. because my school starts at 7."',
          en: 'Part 1 lasts 4–5 minutes. The examiner asks short questions about you: work/study, home, hobbies, routines.\n**Answer formula:** direct answer + 1 reason / detail + (1 example).\nDo not just say "Yes." or "No." — speak 2–3 sentences.\nExample: "What time do you get up?" → "I usually get up at 6 a.m. because my school starts at 7."',
        },
        examples: [
          {
            en: 'I usually get up at 6 a.m. because my school starts at 7.',
            vi: 'Tôi thường dậy lúc 6 giờ sáng vì trường tôi bắt đầu học lúc 7 giờ.',
          },
        ],
      },
    ],
    exercises: [
      {
        id: 'l1-speak-04-ex01',
        type: 'speak-sentence',
        sentence: 'I get up at six o\'clock every morning.',
        translationVi: 'Tôi dậy lúc sáu giờ mỗi sáng.',
        explanation: {
          vi: 'Đọc rõ âm /t/ trong "get" và âm /k/ trong "o\'clock".',
          en: 'Pronounce /t/ in "get" and /k/ in "o\'clock" clearly.',
        },
      },
      {
        id: 'l1-speak-04-ex02',
        type: 'multiple-choice',
        question: 'Choose the correct word: "My father ___ to work at 7 a.m."',
        options: ['go', 'goes', 'going', 'is go'],
        correctIndex: 1,
        explanation: {
          vi: '"My father" = he → động từ thêm -es: goes.',
          en: '"My father" = he → the verb adds -es: goes.',
        },
      },
      {
        id: 'l1-speak-04-ex03',
        type: 'speak-sentence',
        sentence: 'She watches TV after dinner.',
        translationVi: 'Cô ấy xem TV sau bữa tối.',
        explanation: {
          vi: '"watches" đọc /ˈwɒtʃɪz/ — có thêm âm /ɪz/ ở cuối.',
          en: '"watches" is /ˈwɒtʃɪz/ — it has an extra /ɪz/ syllable.',
        },
      },
      {
        id: 'l1-speak-04-ex04',
        type: 'fill-blank',
        sentence: 'I ___ go to bed late. (thường)',
        acceptedAnswers: ['usually'],
        hint: '(usually / never)',
        explanation: {
          vi: '"usually" = thường, đứng trước động từ thường "go".',
          en: '"usually" goes before the main verb "go".',
        },
      },
      {
        id: 'l1-speak-04-ex05',
        type: 'speak-sentence',
        sentence: 'I usually have breakfast with my family.',
        translationVi: 'Tôi thường ăn sáng cùng gia đình.',
        explanation: {
          vi: '"breakfast" nhấn âm đầu: BREAK-fast, đọc /ˈbrekfəst/.',
          en: '"breakfast" is stressed on the first syllable: BREAK-fast, /ˈbrekfəst/.',
        },
      },
      {
        id: 'l1-speak-04-ex06',
        type: 'arrange-words',
        translationVi: 'Tôi luôn luôn đi học bằng xe đạp.',
        correctSentence: 'I always go to school by bike.',
        extraWords: ['goes', 'on'],
        explanation: {
          vi: '"always" đứng trước động từ "go". "by bike" = bằng xe đạp.',
          en: '"always" comes before the verb "go". "by bike" = using a bicycle.',
        },
      },
      {
        id: 'l1-speak-04-ex07',
        type: 'speak-sentence',
        sentence: 'He plays football every afternoon.',
        translationVi: 'Cậu ấy chơi bóng đá mỗi buổi chiều.',
        explanation: {
          vi: '"plays" kết thúc bằng âm /z/: /pleɪz/.',
          en: '"plays" ends with /z/: /pleɪz/.',
        },
      },
      {
        id: 'l1-speak-04-ex08',
        type: 'multiple-choice',
        question: 'IELTS Part 1 — "What do you usually do in the evening?" Which answer is best?',
        options: [
          'Homework.',
          'Yes, I do.',
          'I usually do my homework and then I watch TV with my family.',
          'I am usually do homework.',
        ],
        correctIndex: 2,
        explanation: {
          vi: 'Câu trả lời tốt: câu đầy đủ, đúng ngữ pháp, có thêm chi tiết.',
          en: 'A good answer is a full, correct sentence with an extra detail.',
        },
      },
      {
        id: 'l1-speak-04-ex09',
        type: 'speak-sentence',
        sentence: 'I go to bed at ten thirty.',
        translationVi: 'Tôi đi ngủ lúc mười giờ ba mươi.',
        explanation: {
          vi: '"thirty" bắt đầu bằng /θ/: lưỡi giữa răng, thổi hơi, không đọc thành "t".',
          en: '"thirty" starts with /θ/: tongue between your teeth, blow air — not "t".',
        },
      },
      {
        id: 'l1-speak-04-ex10',
        type: 'speak-answer',
        question: 'IELTS Part 1: Describe your typical morning. What do you do before school or work?',
        tipsVi:
          'Dùng thì hiện tại đơn và từ nối thứ tự: First, ... Then, ... After that, ... Nêu giờ giấc với "at". Nói 3–5 câu, nhớ đọc rõ đuôi -s nếu nói về người khác.',
        sampleAnswer:
          "I usually get up at six o'clock. First, I brush my teeth and wash my face. Then I have breakfast with my family. After that, my father takes me to school at half past six.",
        recordSeconds: 30,
        explanation: {
          vi: 'Câu trả lời tốt dùng đúng thì hiện tại đơn, có giờ giấc và từ nối.',
          en: 'A good answer uses the present simple correctly, with times and linking words.',
        },
      },
    ],
    miniTest: [
      {
        id: 'l1-speak-04-test01',
        type: 'speak-sentence',
        sentence: 'My mother cooks dinner every day.',
        translationVi: 'Mẹ tôi nấu bữa tối mỗi ngày.',
        explanation: {
          vi: '"cooks" đọc /kʊks/ — âm cuối /s/.',
          en: '"cooks" is /kʊks/ — it ends with /s/.',
        },
      },
      {
        id: 'l1-speak-04-test02',
        type: 'multiple-choice',
        question: 'Choose the correct sentence.',
        options: ['She get up at 6.', 'She gets up at 6.', 'She getting up at 6.', 'She is get up at 6.'],
        correctIndex: 1,
        explanation: {
          vi: 'She + động từ thêm -s: gets.',
          en: 'She + verb with -s: gets.',
        },
      },
      {
        id: 'l1-speak-04-test03',
        type: 'arrange-words',
        translationVi: 'Tôi không bao giờ uống cà phê.',
        correctSentence: 'I never drink coffee.',
        extraWords: ['drinks', 'not'],
      },
      {
        id: 'l1-speak-04-test04',
        type: 'speak-sentence',
        sentence: 'I usually do my homework in the evening.',
        translationVi: 'Tôi thường làm bài tập vào buổi tối.',
      },
      {
        id: 'l1-speak-04-test05',
        type: 'multiple-choice',
        question: 'Where does "sometimes" go? Choose the correct sentence.',
        options: [
          'I walk sometimes always to school.',
          'I sometimes walk to school.',
          'Sometimes I walks to school.',
          'I walk sometimes to school.',
        ],
        correctIndex: 1,
        explanation: {
          vi: 'Trạng từ tần suất đứng trước động từ thường: I sometimes walk.',
          en: 'Frequency adverbs go before the main verb: I sometimes walk.',
        },
      },
      {
        id: 'l1-speak-04-test06',
        type: 'speak-answer',
        question: 'IELTS Part 1: What do you usually do at the weekend?',
        tipsVi:
          'Trả lời thẳng + lý do/chi tiết: On Saturday I usually ... On Sunday I sometimes ... because ... Dùng thì hiện tại đơn.',
        sampleAnswer:
          'At the weekend, I usually sleep late and help my mother clean the house. On Sunday afternoon, I sometimes go to the park with my friends because it is relaxing.',
        recordSeconds: 30,
      },
    ],
  },
]
